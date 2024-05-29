interface Env {
  BUCKET: R2Bucket;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request } = context;
  const { url } = request;
  const { pathname } = new URL(url);
  const obj = await context.env.BUCKET.get(pathname);

  return new Response(obj.body);
};
