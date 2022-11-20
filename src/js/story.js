import { StoryController } from './story-controller.js';
import { getAttribute, querySelectorAll } from './utils/dom.js';
import { compose, map } from './utils/fp.js';

const getHistory = compose(
  map(getAttribute('step')),
  querySelectorAll('app-story-point')
);

export const Story = StoryController(function* ({ $el }) {
  let codePointsMap;
  try {
    const history = [...getHistory($el)];
    codePointsMap = new Map(
      [...$el.querySelectorAll('code-point')].map((el) => [
        el,
        history.map((historyPoint) => {
          const attribute = el.getAttribute(`step-${historyPoint}`);
          return attribute !== null ? 'step-' + attribute : undefined;
        }),
      ])
    );

    while (true) {
      const { activeStep } = yield;
      const currentStepIndex = history.indexOf(activeStep);
      if (currentStepIndex !== -1) {
        for (const [el, timeline] of codePointsMap.entries()) {
          const activeClass = timeline
            .slice(0, currentStepIndex + 1)
            .filter(Boolean)
            .at(-1);

          if (activeClass) {
            const classesToRemove = timeline.filter(
              (className) => className && className !== activeClass
            );
            el.classList.remove(...classesToRemove);
            el.classList.add(activeClass ?? '');
          }
        }
      }
    }
  } finally {
    codePointsMap.clear();
  }
});
