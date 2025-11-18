import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  imageUrl: string;
  imageHint: string;
};

export const placeholderImages: ImagePlaceholder[] = data.placeholderImages;

export function getPlaceholderImage(id: string): string {
  const image = placeholderImages.find((img) => img.id === id);
  return image ? image.imageUrl : 'https://picsum.photos/seed/placeholder/600/400';
}
