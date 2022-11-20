import Prism from 'prismjs';
import { EOL } from 'os';

export const code = (
  text,
  {
    language = Prism.languages.javascript,
    languageName = 'javascript',
    line = 1,
  } = {
    language: Prism.languages.javascript,
    languageName: 'javascript',
  }
) => {
  return Prism.highlight(text.split(EOL)[line - 1], language, languageName);
};
