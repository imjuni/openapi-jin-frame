import { createFrame } from '#/modules/generators/createFrame';
import type { OpenAPIV3 } from 'openapi-types';
import { Project } from 'ts-morph';
import { describe, expect, it } from 'vitest';

describe('createFrame', () => {
  const project = new Project();
  const operationRequestBody = {
    required: ['name', 'photoUrls'],
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        format: 'int64',
        example: 10,
      },
      name: {
        type: 'string',
        example: 'doggie',
      },
      category: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
            example: 1,
          },
          name: {
            type: 'string',
            example: 'Dogs',
          },
        },
        xml: {
          name: 'category',
        },
      },
      photoUrls: {
        type: 'array',
        xml: {
          wrapped: true,
        },
        items: {
          type: 'string',
          xml: {
            name: 'photoUrl',
          },
        },
      },
      tags: {
        type: 'array',
        xml: {
          wrapped: true,
        },
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
            },
            name: {
              type: 'string',
            },
          },
          xml: {
            name: 'tag',
          },
        },
      },
      status: {
        type: 'string',
        description: 'pet status in the store',
        enum: ['available', 'pending', 'sold'],
      },
    },
    xml: {
      name: 'pet',
    },
  };

  it('should return full frame when pass param with requestBody', () => {
    const frame = createFrame(project, {
      typeFilePath: 'petstore.d.ts',
      host: 'https://pokeapi.co',
      pathKey: '/pet/findByStatus/{status}',
      method: 'GET',
      operation: {
        description:
          'Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.',
        summary: 'Finds Pets by tags.',
        requestBody: {
          description: 'Update an existent pet in the store',
          content: {
            'application/json': operationRequestBody,
            'application/xml': operationRequestBody,
            'application/x-www-form-urlencoded': operationRequestBody,
          },
          required: true,
        },
        parameters: [
          {
            name: 'status',
            in: 'query',
            description: 'Status values that need to be considered for filter',
            required: true,
            explode: true,
            example: 'ironman',
            schema: {
              type: 'string',
              default: 'available',
              enum: ['available', 'pending', 'sold'],
            },
          },
          {
            name: 'name',
            in: 'query',
            description: 'Name of pet that needs to be updated',
            schema: {
              type: 'string',
            },
          },
        ],
        tags: ['pet', 'cat'],
        responses: {
          '200': {
            description: 'successful operation',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Order',
                },
              },
            },
          },
          '400': {
            description: 'Invalid input',
          },
        },
      } as OpenAPIV3.OperationObject,
    });

    expect(frame).toMatchObject({
      filePath: 'GetPetFindByStatusStatusFrame.ts',
      tag: 'pet',
      source:
        'import { Get, Query, ObjectBody, JinFrame } from "jin-frame";\n' +
        '/**\n' +
        ' * Finds Pets by tags.\n' +
        ' * Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.\n' +
        ' *\n' +
        ' * @see GET /pet/findByStatus/{status}\n' +
        ' * @tag pet, cat\n' +
        ' */\n' +
        "@Get({ host: 'https://pokeapi.co', path: '/pet/findByStatus/:status' })\n" +
        "export class GetPetFindByStatusStatusFrame extends JinFrame<paths['/pet/findByStatus/{status}']['get']['responses']['200']['content']['application/json']> {\n" +
        '    /**\n' +
        '     * Status values that need to be considered for filter\n' +
        '     *\n' +
        '     * @example ironman\n' +
        '     */\n' +
        '    @Query({ comma: true })\n' +
        "    declare public readonly status?: paths['/pet/findByStatus/{status}']['get']['parameters']['query']['status'];\n" +
        '    /** Name of pet that needs to be updated */\n' +
        '    @Query()\n' +
        "    declare public readonly name: paths['/pet/findByStatus/{status}']['get']['parameters']['query']['name'];\n" +
        '    /** Update an existent pet in the store */\n' +
        '    @ObjectBody()\n' +
        "    declare public readonly body?: paths['/pet/findByStatus/{status}']['get']['requestBody']['content']['application/json'];\n" +
        '}\n',
    });
  });
});
