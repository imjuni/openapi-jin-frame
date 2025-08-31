// import { convertor } from '#/modules/openapi/convertor';
// import { load } from '#/modules/openapi/load';
// import { validate } from '#/modules/openapi/validate';
import log from 'consola';
import { isError } from 'my-easy-fp';
import { install as sourceMapSupportInstall } from 'source-map-support';
import yargs from 'yargs';

sourceMapSupportInstall();

const parser = yargs(process.argv.slice(2));
parser.option('-p', { describe: 'test' });

const handler = async () => {
  // const openApiV2 = 'https://petstore.swagger.io/v2/swagger.json';
  // const openApiV3 = 'https://petstore3.swagger.io/api/v3/openapi.json';

  // console.log(openApiV2);

  // const loaded = await load(openApiV2);
  // const validated = validate(loaded);
  // const document = await convertor(validated);

  await parser.argv;
};

handler().catch((caught) => {
  const err = isError(caught, new Error('unknown error raised'));
  log.error(err.message);
  log.error(err.stack);
});
