import fs from 'node:fs';
import { exists } from 'my-node-fp';
import axios from 'axios';
import { safeParse } from '#/modules/json/safeParse';

export async function load(filePath: string): Promise<unknown> {
  if (await exists(filePath)) {
    // load openapi spec from the file
    const buf = await fs.promises.readFile(filePath);
    return safeParse(buf.toString());
  }

  if (filePath.startsWith('http')) {
    // load openapi spec from the http
    const reply = await axios.get(filePath);
    return reply.data;
  }

  return undefined;
}
