export const getThumbnail = (thumbnail) => {
  return thumbnail.path + "." + thumbnail.extension;
}

export const randomizeNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}