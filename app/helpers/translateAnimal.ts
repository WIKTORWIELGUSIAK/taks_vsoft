import { animalTranslations } from "@/constants";

export const translateAnimal = (animal: string): string => {
  return animalTranslations[animal] || animal;
};
