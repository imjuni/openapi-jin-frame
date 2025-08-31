/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createFrames } from '#/modules/generators/createFrames';
import { describe, it } from 'vitest';

describe('createFrames', async () => {
  // @ts-expect-error
  const document = await import('../../../samples/v3.json');

  it('should return variety frame when pass v3 document', async () => {
    const frames = await createFrames(document);
    console.log(frames);
  });
});
