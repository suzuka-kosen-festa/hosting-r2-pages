interface Env {
  KV: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const endpoint = await context.env.KV.get("endpoint");

  const { request } = context;
  const { url } = request;
  const { pathname } = new URL(url);
  const newUrl = `${endpoint}${pathname}`;
  const newRequest = new Request(newUrl, {
    body: request.body,
    headers: request.headers,
    method: request.method,
    redirect: request.redirect,
  });

  return fetch(newRequest);
};
