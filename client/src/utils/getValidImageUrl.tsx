const getValidImageUrl = (url: string) => {
  if (url.startsWith("http")) {
    return url;
  }
  return `${process.env.NEXT_PUBLIC_BASE_URL}${url}`;
};

export default getValidImageUrl;