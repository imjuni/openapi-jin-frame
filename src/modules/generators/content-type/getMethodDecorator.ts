import { applicationJsonContentType } from '#/modules/generators/content-type/preferredContentTypes';
import type { DecoratorStructure } from 'ts-morph';
import { StructureKind } from 'ts-morph';

interface IProps {
  method: string;
  contentType?: string;
  host: string;
  path: string;
}

export function getMethodDecorator(params: IProps): DecoratorStructure {
  const decoratorArguments =
    params.contentType != null && params.contentType !== applicationJsonContentType
      ? `{ host: '${params.host}', path: '${params.path}', contentType: '${params.contentType}' }`
      : `{ host: '${params.host}', path: '${params.path}' }`;

  return {
    name: params.method,
    kind: StructureKind.Decorator,
    arguments: [decoratorArguments],
  };
}
