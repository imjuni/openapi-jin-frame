// import { convertor } from '#/modules/openapi/convertor';
// import { load } from '#/modules/openapi/load';
// import { validate } from '#/modules/openapi/validate';
import log from 'consola';
import { isError } from 'my-easy-fp';
import { install as sourceMapSupportInstall } from 'source-map-support';
import { or, command, constant, object, string, optional, option } from '@optique/core';
import { run } from '@optique/run';
import { createCommand } from '#/cli/commands/createCommand';
import { create } from '#/cli/handler/create';

sourceMapSupportInstall();

const frameCommand = command(
  'frame',
  object({
    action: constant('frame'),
    path: optional(option('-p', '--path', string({ metavar: '/a/b/c' }))),
    sampe: optional(option('-s', '--sample', string({ metavar: 'hello' }))),
  }),
);

const handler = async () => {
  const parser = or(createCommand, frameCommand);
  const result = run(parser);

  switch (result.action) {
    case 'create':
      await (async () => {
        create(result);
      })();
      break;
    case 'frame':
      await (async () => {
        console.log('frame', result.path, result.sampe);
      })();
      break;
    default:
      await (async () => {
        console.log('unknown action', result.path, result.sampe);
      })();
      break;
  }

  // const openApiV2 = 'https://petstore.swagger.io/v2/swagger.json';
  // const openApiV3 = 'https://petstore3.swagger.io/api/v3/openapi.json';
  // console.log(openApiV2);
  // const loaded = await load(openApiV2);
  // const validated = validate(loaded);
  // const document = await convertor(validated);
};

handler().catch((caught) => {
  const err = isError(caught, new Error('unknown error raised'));

  log.error(err.message);
  log.error(err.stack);
});
