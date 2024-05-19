/**
 * Configuration for the database connection.
 */
export interface ConfigDBData {
  type: string;
  user: string;
  pass: string;
  name: string;
  host: string;
  port: number;
  dialect: string;
  charset: string;
  collate: string;
}

// export interface ConfigRedis {
//   url: string;
//   retryAttempts: number;
//   retryDelay: number;
// }

/**
 * Configuration data for the app.
 */
export interface ConfigData {
  env: string;

  /** The port number of the http server to listen on. */
  port: number;

  /** Database connection details. */
  db?: ConfigDBData;

  /**
   * The log level to use.
   * @example 'verbose', 'info', 'warn', 'error'
   */
  logLevel: string;
  // redis?: ConfigRedis;
}
