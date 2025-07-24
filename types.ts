export interface GenerationOptions {
  prompt: string;
  numberOfImages: number;
  aspectRatio: '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
}
