import { getFirstContentType } from '#/modules/generators/content-type/getFirstContentType';
import { preferredContentTypes } from '#/modules/generators/content-type/preferredContentTypes';
import type { OpenAPIV3 } from 'openapi-types';

export function getResponseContentType(
  responses?: OpenAPIV3.ResponsesObject,
): { statusCode: string; mediaType: string } | undefined {
  if (responses == null) {
    return undefined;
  }

  const statusCodes = Object.keys(responses).filter((statusCode) => statusCode !== '200');

  const successContentCode = getFirstContentType(
    preferredContentTypes,
    (responses['200'] as OpenAPIV3.ResponseObject | undefined)?.content,
  );

  if (successContentCode != null) {
    return { statusCode: '200', mediaType: successContentCode.mediaType };
  }

  const otherContentTypes = statusCodes
    .map((statusCode) => {
      const first = getFirstContentType(
        preferredContentTypes,
        (responses[statusCode] as OpenAPIV3.ResponseObject | undefined)?.content,
      );

      if (first != null) {
        return {
          statusCode,
          mediaType: first.mediaType,
        };
      }

      return undefined;
    })
    .filter((contentType) => contentType != null);

  const firstContentType = otherContentTypes.at(0);
  return firstContentType;
}
