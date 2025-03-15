export default defineEventHandler(async (event) => {
  const product = await readBody(event);

  const response = await fetch(
    `http://dev.mindwave.kz/api/sandbox/crud/${product.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",

        Connection: "keep-alive",
      },
      body: JSON.stringify(product),
    }
  );
  console.log(JSON.stringify(response, null, 4));
  return await response.json();
});
