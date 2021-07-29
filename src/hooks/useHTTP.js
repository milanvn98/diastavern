import { useState, useCallback } from "react";
import axios from "axios";
import qs from "qs";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (requestConfig, callback) => {
      setIsLoading(true);
      setError(false);

      try {
        const response = await axios({
          url: "https://diastavern.herokuapp.com/" + requestConfig.url + "?timestamp=" + new Date().getTime(),
          method: requestConfig.method ? requestConfig.method : "GET",
          data: qs.stringify(requestConfig.body),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        try {
         callback(response.data, response);
        } catch {
          throw new Error("Could not update all components. Please Refresh page.");
        }
      } catch (error) {
        let message = "Network Error Occured";
        error.message && (message = error.message);
        try {
          error.response.data.error && (message = error.response.data.error);
        } catch {}
        setError(message);
      }

      setIsLoading(false);
    },
    []
  );

  return {
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest,
  };
};

export default useHttp;
