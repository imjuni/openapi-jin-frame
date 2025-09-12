import { object, optional, option } from '@optique/core';

export const openapiTypescriptOptions = object('openapi-typescript-options', {
  'oat-additional-properties': optional(option('-a', '--additional-properties')),
  'oat-alphabetize': optional(option('-a', '--additional-properties')),
  'oat-array-length': optional(option('-a', '--additional-properties')),
  'oat-default-non-nullable': optional(option('-a', '--additional-properties')),
  'oat-properties-required-by-default': optional(option('-a', '--additional-properties')),
  'oat-empty-objects-unknown': optional(option('-a', '--additional-properties')),
  'oat-enum': optional(option('-a', '--additional-properties')),
  'oat-enum-values': optional(option('-a', '--additional-properties')),
  'oat-dedupe-enums': optional(option('-a', '--additional-properties')),
  'oat-check': optional(option('-a', '--additional-properties')),
  'oat-exclude-deprecated': optional(option('-a', '--additional-properties')),
  'oat-export-type': optional(option('-a', '--additional-properties')),
  'oat-immutable': optional(option('-a', '--additional-properties')),
  'oat-path-params-as-types': optional(option('-a', '--additional-properties')),
  'oat-root-types': optional(option('-a', '--additional-properties')),
  'oat-root-types-no-schema-prefix': optional(option('-a', '--additional-properties')),
  'oat-make-paths-enum': optional(option('-a', '--additional-properties')),
  'oat-generate-path-params': optional(option('-a', '--additional-properties')),
});
