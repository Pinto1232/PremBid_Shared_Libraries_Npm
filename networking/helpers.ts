export const isNetworkError = (message: unknown) => {
  if (typeof message === "string") {
    const lowerCasedMessage = message?.toLowerCase();
    return (
      lowerCasedMessage.includes("response is null") || lowerCasedMessage.includes("network request failed") || lowerCasedMessage.includes("http error") || lowerCasedMessage.includes("networkerror")
    );
  }

  return false;
};
