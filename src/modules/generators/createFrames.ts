import $RefParser from '@apidevtools/json-schema-ref-parser';
import type { THttpMethod } from '#/https/method';
import type { OpenAPIV3 } from 'openapi-types';
import { createFrame } from '#/modules/generators/createFrame';
import { Project } from 'ts-morph';

export async function createFrames(_document: OpenAPIV3.Document): Promise<
  {
    method: THttpMethod;
    pathKey: string;
    frame: ReturnType<typeof createFrame>;
  }[]
> {
  const document = await $RefParser.dereference<OpenAPIV3.Document>(_document);
  const paths = document.paths ?? {};
  const project = new Project();
  const methods: THttpMethod[] = ['get', 'post', 'put', 'delete', 'patch', 'head', 'options'];

  const frames = Object.keys(paths)
    .map((pathKey) => {
      const apiPath = paths[pathKey];

      const operations = methods
        .map((method) => {
          const operation = apiPath?.[method];
          const frame =
            operation == null
              ? undefined
              : createFrame(project, {
                  typeFilePath: '',
                  host: '',
                  pathKey,
                  method,
                  operation,
                });
          return { method, pathKey, frame };
        })
        .filter(
          (
            operation,
          ): operation is {
            method: THttpMethod;
            pathKey: string;
            frame: ReturnType<typeof createFrame>;
          } => operation.frame != null,
        );

      return operations;
    })
    .flat();

  return frames;
}
