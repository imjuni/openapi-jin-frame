import type { THttpMethod } from '#/https/method';
import type { Project } from 'ts-morph';
import { pascalCase } from 'change-case';
import { getFrameName } from '#/modules/generators/getFrameName';
import { getClassJsDoc } from '#/modules/generators/getClassJsDoc';
import { swaggerPathToPathToRegexp } from '#/modules/generators/swaggerPathToPathToRegexp';
import type { OpenAPIV3 } from 'openapi-types';
import { getParameter } from '#/modules/generators/parameters/getParameter';
import { getRequestContentType } from '#/modules/generators/content-type/getRequestContentType';
import { getResponseContentType } from '#/modules/generators/content-type/getResponseContentType';
import { getObjectBodyParameter } from '#/modules/generators/parameters/getObjectBodyParameter';
import { randomUUID } from 'node:crypto';
import { getMethodDecorator } from '#/modules/generators/content-type/getMethodDecorator';

interface IProps {
  typeFilePath: string;
  host: string;
  pathKey: string;
  operation: OpenAPIV3.OperationObject;
  method: THttpMethod;
}

interface IResult {
  filePath: string;
  tag?: string;
  aliasFilePath: string;
  source: string;
}

export function createFrame(project: Project, params: IProps): IResult {
  const aliasFilePath = `${randomUUID()}-${randomUUID()}.ts`;
  const name = getFrameName(params);
  const filePath = `${name}.ts`;
  const sourceFile = project.createSourceFile(aliasFilePath);
  const originMethod = params.method.toLowerCase();
  const method = pascalCase(originMethod.toLowerCase());
  const description = getClassJsDoc(params);
  const pathToRegex = swaggerPathToPathToRegexp(params.pathKey);
  const requestContentType = getRequestContentType(params.operation);
  const responseContentType = getResponseContentType(params.operation);
  const methodDecorator = getMethodDecorator({
    host: params.host,
    path: pathToRegex,
    method,
    contentType: requestContentType,
  });
  const firstTag = params.operation.tags?.at(0);

  const parameters =
    params.operation.parameters
      ?.map((parameter) =>
        getParameter({
          method: originMethod,
          pathKey: params.pathKey,
          parameter: parameter as OpenAPIV3.ParameterObject,
        }),
      )
      .filter((parameter) => parameter != null) ?? [];
  const properties = parameters?.map((parameter) => parameter.property);

  const objectBody = getObjectBodyParameter({
    method: originMethod,
    pathKey: params.pathKey,
    contentType: requestContentType,
    requestBody: params.operation.requestBody,
  });

  if (objectBody != null) {
    properties.push(objectBody);
  }

  const paramDecorators = [
    ...parameters.map((parameter) => parameter.decorator),
    objectBody == null ? undefined : 'ObjectBody',
  ]
    .filter((decorator) => decorator != null)
    .flat();

  sourceFile.addImportDeclaration({
    moduleSpecifier: 'jin-frame',
    namedImports: [method, ...Array.from(new Set<string>(paramDecorators)), 'JinFrame'],
  });

  sourceFile.addClass({
    name,
    docs: [{ description }],
    decorators: [methodDecorator],
    properties,
    isExported: true,
    extends: `JinFrame<paths['${params.pathKey}']['${originMethod}']['responses']['${responseContentType?.statusCode}']['content']['${responseContentType?.mediaType}']>`,
  });

  return {
    filePath,
    tag: firstTag,
    aliasFilePath,
    source: sourceFile.print(),
  };
}
