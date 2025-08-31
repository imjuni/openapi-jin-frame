import type { validate } from '#/modules/openapi/validate';
import swagger2openapi from 'swagger2openapi';

export async function convertor(
  document: ReturnType<typeof validate>,
): Promise<ReturnType<typeof validate>> {
  if (document.valid && document.version === 2) {
    const converted = await swagger2openapi.convert(document.document, {});
    return { ...document, version: 3, document: converted.openapi };
  }

  return document;
}
