export default defineEventHandler(async (event) => {
  const response = await fetch("http://dev.mindwave.kz/api/sandbox/crud");
  const data = await response.json();

  if (Array.isArray(data?.content?.rows)) {
    return data.content.rows;
  }

  return [];
});
