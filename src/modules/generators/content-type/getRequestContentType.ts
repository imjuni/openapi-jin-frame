import { getFirstContentType } from '#/modules/generators/content-type/getFirstContentType';
import { preferredContentTypes } from '#/modules/generators/content-type/preferredContentTypes';
import type { OpenAPIV3 } from 'openapi-types';

export function getRequestContentType(
  operation: Pick<OpenAPIV3.OperationObject, 'requestBody'>,
): string | undefined {
  const content = (operation?.requestBody as OpenAPIV3.RequestBodyObject | undefined)?.content;

  if (content == null) {
    return undefined;
  }

  const firstContentType = getFirstContentType(preferredContentTypes, content);
  return firstContentType?.mediaType;
}
