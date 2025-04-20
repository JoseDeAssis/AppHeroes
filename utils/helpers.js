export const getThumbnail = (character) => {
  return character.thumbnail.path + "." + character.thumbnail.extension;
}