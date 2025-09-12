export interface ICliArugments {
  /**
   * OpenAPI Spec path. http or file path
   */
  specPath: string;

  /**
   * Host of the OpenAPI Spec
   */
  host: string;

  /**
   * Output path. If not provided, the output path will be the same as the openapi-typescript output path.
   */
  outputPath?: string;

  /**
   * Use code fence
   */
  useCodeFence: boolean;

  'oat-output': string;
  'oat-additional-properties': boolean;
  'oat-alphabetize': boolean;
  'oat-array-length': boolean;
  'oat-default-non-nullable': boolean;
  'oat-properties-required-by-default': boolean;
  'oat-empty-objects-unknown': boolean;
  'oat-enum': boolean;
  'oat-enum-values': boolean;
  'oat-dedupe-enums': boolean;
  'oat-check': boolean;
  'oat-exclude-deprecated': boolean;
  'oat-export-type': boolean;
  'oat-immutable': boolean;
  'oat-path-params-as-types': boolean;
  'oat-root-types': boolean;
  'oat-root-types-no-schema-prefix': boolean;
  'oat-make-paths-enum': boolean;
  'oat-generate-path-params': boolean;
}
