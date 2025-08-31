import { getParameterDecorator } from '#/modules/generators/parameters/getParameterDecorator';
import { describe, expect, it } from 'vitest';

describe('getParameterDecorator', () => {
  it("should return Query when pass in: 'query'", () => {
    const result = getParameterDecorator('query');
    expect(result).toEqual('Query');
  });

  it("should return Param when pass in: 'path'", () => {
    const result = getParameterDecorator('path');
    expect(result).toEqual('Param');
  });

  it("should return Header when pass in: 'header'", () => {
    const result = getParameterDecorator('header');
    expect(result).toEqual('Header');
  });

  it("should return undefined when pass in: 'body'", () => {
    const result = getParameterDecorator('body');
    expect(result).toBeUndefined();
  });
});
