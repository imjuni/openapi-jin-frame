import { getParameterJsDoc } from '#/modules/generators/parameters/getParameterJsDoc';
import type { OpenAPIV3 } from 'openapi-types';
import { StructureKind, Scope, type PropertyDeclarationStructure } from 'ts-morph';

interface IProps {
  method: string;
  pathKey: string;
  contentType?: string;
  requestBody?: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject;
}

export function getObjectBodyParameter(params: IProps): PropertyDeclarationStructure | undefined {
  const { requestBody } = params;

  if (requestBody == null || '$ref' in requestBody || params.contentType == null) {
    return undefined;
  }

  const decorators: PropertyDeclarationStructure['decorators'] = [
    {
      name: 'ObjectBody',
      arguments: [],
    },
  ];

  const description = getParameterJsDoc({
    description: requestBody.description,
    example: requestBody[params.contentType]?.example,
    examples: requestBody[params.contentType]?.examples,
  });

  const property: PropertyDeclarationStructure = {
    decorators,
    docs: description,
    name: 'body',
    type: `paths['${params.pathKey}']['${params.method}']['requestBody']['content']['${params.contentType}']`,
    hasDeclareKeyword: true,
    isReadonly: true,
    hasQuestionToken: requestBody.required ?? false,
    scope: Scope.Public,
    kind: StructureKind.Property,
  };

  return property;
}
