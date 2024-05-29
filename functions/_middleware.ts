interface Env {
  BUCKET: R2Bucket;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request } = context;
  const { url } = request;
  let { pathname } = new URL(url);

  if (pathname.endsWith("/")) {
    pathname += "index.html";
  }

  if (pathname.startsWith("/")) {
    pathname = pathname.slice(1);
  }

  const obj = await context.env.BUCKET.get(pathname);
  if (obj === null) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(obj.body);
};
