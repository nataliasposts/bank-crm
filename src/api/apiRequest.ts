type ApiRequestArgs<T> = {
  method: string;
  endpoint: string;
  requestBody?: T;
  headers?: Record<string, string>;
};

export type ApiResponse<T> = {
  data: T;
};
const getRequestUrl = (url: string, queryObject: Record<string, string>): string => {
  const search = new URLSearchParams(queryObject).toString();
  /* eslint-disable */
  return url + (search ? '?' + search : '');
};

const apiRequest = async <T>(
  { method, endpoint, requestBody }: ApiRequestArgs<T>,
  headers = {}
): Promise<T> => {
  const baseUrl = endpoint;
  const url =
    method === 'GET' ? getRequestUrl(baseUrl, requestBody as Record<string, string>) : baseUrl;

  const responseJson: T = await fetch(url, {
    method,
    mode: 'cors',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    ...(method !== 'GET' ? { body: JSON.stringify(requestBody) } : {})
  })
    .then((response) => {
      if (response.ok && response.status === 200) {
        return response.json();
      }
      if (!response.ok) {
        return Promise.reject(response);
      }
    })
    .catch((error) => {
      console.error('Error in apiRequest');
      if (error.status === 401) {
        console.error('401');
      }
      if (error.status === 503) {
        console.error('503');
      }
      if (error.status === 404) {
        console.error('404');
      }
      throw new Error('Error in apiRequest');
    });
  return responseJson;
};

export default apiRequest;
