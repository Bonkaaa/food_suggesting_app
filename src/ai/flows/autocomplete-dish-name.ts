'use server';

/**
 * @fileOverview Autocomplete dish names based on user input.
 *
 * - autocompleteDishName - A function that suggests dish names based on a partial input.
 * - AutocompleteDishNameInput - The input type for the autocompleteDishName function.
 * - AutocompleteDishNameOutput - The return type for the autocompleteDishName function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutocompleteDishNameInputSchema = z.object({
  partialDishName: z.string().describe('The partial name of the dish to autocomplete.'),
});
export type AutocompleteDishNameInput = z.infer<typeof AutocompleteDishNameInputSchema>;

const AutocompleteDishNameOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('A list of suggested dish names.'),
});
export type AutocompleteDishNameOutput = z.infer<typeof AutocompleteDishNameOutputSchema>;

export async function autocompleteDishName(input: AutocompleteDishNameInput): Promise<AutocompleteDishNameOutput> {
  return autocompleteDishNameFlow(input);
}

const autocompleteDishNamePrompt = ai.definePrompt({
  name: 'autocompleteDishNamePrompt',
  input: {schema: AutocompleteDishNameInputSchema},
  output: {schema: AutocompleteDishNameOutputSchema},
  prompt: `Suggest dish names that start with or contain the following phrase:\n\n{{partialDishName}}\n\nReturn a JSON array of strings.  Return at most 5 suggestions.`,
});

const autocompleteDishNameFlow = ai.defineFlow(
  {
    name: 'autocompleteDishNameFlow',
    inputSchema: AutocompleteDishNameInputSchema,
    outputSchema: AutocompleteDishNameOutputSchema,
  },
  async input => {
    const {output} = await autocompleteDishNamePrompt(input);
    return output!;
  }
);
