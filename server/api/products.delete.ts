export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  const response = await fetch(
    `http://dev.mindwave.kz/api/sandbox/crud/${id}`,
    {
      method: "DELETE",
    }
  );

  return response;
});
