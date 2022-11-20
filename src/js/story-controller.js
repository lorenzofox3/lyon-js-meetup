import { getAttribute } from './utils/dom.js';
import { compose, filter, first, trace } from './utils/fp.js';

const getStepAttribute = getAttribute('step');
const getIntersectingEntry = compose(
  first,
  filter(({ isIntersecting }) => isIntersecting)
  // trace('entries')
);

export const StoryController = (gen) =>
  function* ({ $el, ...rest }) {
    const render = (entries = []) => {
      const entry = getIntersectingEntry(entries);
      if (entry) {
        $el.render({
          activeStep: getStepAttribute(entry.target),
        });
      }
    };
    const observer = new IntersectionObserver(render, {
      threshold: 0.4,
      root: $el,
    });
    const storyPoints = $el.querySelectorAll('app-story-point');
    try {
      storyPoints.forEach(observer.observe.bind(observer));
      yield* gen({
        $el,
        ...rest,
      });
    } finally {
      observer.disconnect();
    }
  };
