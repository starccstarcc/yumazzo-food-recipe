import useSWR from "swr";

const API_URL =
  "https://master-7rqtwti-yj2le3kr2yhmu.uk-1.platformsh.site/yumazoo/";

export const fetcher = async (url: string, payload?: any, type?: string) => {
  const fullURL = API_URL + url;

  let options: any = {
    method: type ? type : payload ? "POST" : "GET",
    mode: "cors",
    ...(payload ? { body: payload } : {}),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  return fetch(fullURL, options).then(async (r) => {
    return r.json().then((data) => {
      if (r.status >= 300) {
        return Promise.reject(
          data?.detail[0].loc[1] + ": " + data?.detail[0].msg
        );
      }
      return data;
    });
  });
};

export const fetchData = (url: string) => {
  const { data, isValidating, mutate, error, isLoading } = useSWR(
    [url],
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  const resData = data?.message;

  return { data: resData, isValidating, mutate, error, isLoading };
};

export const postData = async (url: string, payload: any, type?: string) => {
  try {
    const response = await fetcher(url, JSON.stringify(payload), type);
    return {
      status: "success",
      message: response.message,
      data: response.data,
    };
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const getRecipes = () => fetchData("recipes");

export const getRecipe = (index: number) => fetchData(`recipes/${index}`);

export const getRecipeNumber = () => fetchData("recipes/number");
