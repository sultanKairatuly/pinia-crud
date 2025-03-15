export default defineEventHandler(async (event) => {
  const product = await readBody(event);

  const response = await fetch("http://dev.mindwave.kz/api/sandbox/crud", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",

      Connection: "keep-alive",
    },
    body: JSON.stringify(product),
  });
  console.log("response PUT: ", response);
  if (response.status === 200) {
  }

  return await response.json();
});
