export type LoggingConfig = {
  enableNetworkErrorLogging: boolean;
  enableNetworkRequestLogging?: boolean;
  enableNetworkResponseLogging?: boolean;
};

export default function configureLogging(loggingConfig: LoggingConfig) {
  const originalConsole: any = console;

  if (loggingConfig.enableNetworkErrorLogging) {
    originalConsole.networkLogError = (...args: any[]) => {
      originalConsole.error("NetworkError=> ", ...args);
    };
  }

  if (loggingConfig.enableNetworkRequestLogging) {
    originalConsole.networkLogRequest = (...args: any[]) => {
      originalConsole.log("Request=> ", ...args);
    };
  }

  if (loggingConfig.enableNetworkResponseLogging) {
    originalConsole.networkLogResponse = (...args: any[]) => {
      originalConsole.log("Response=> ", ...args);
    };
  }
}
