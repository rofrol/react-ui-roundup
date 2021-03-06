import { ascend, indexBy, pipe, prop, sort, sortBy, toLower } from 'ramda';

import { Framework, FrameworkFeatureInfo, FrameworkInfoByFeatureId, FrameworksById } from '../entities';
import {
  checkmark as markdownCheckmark,
  designKits as markdownDesignKits,
  themer as markdownThemer,
} from '../markdown/utils';
import {
  checkmark as jsxCheckmark,
  designKits as jsxDesignKits,
  themer as jsxThemer,
} from '../website/utils';
import { antDesign } from './antDesign';
import { atlaskit } from './atlaskit';
import { blueprint } from './blueprint';
import { carbonDesign } from './carbonDesign';
import { chakra } from './chakraUI';
import { elasticUI } from './elasticUI';
import { element } from './element';
import { elementalUI } from './elementalUI';
import { evergreen } from './evergreen';
import { gestalt } from './gestalt';
import { grommet } from './grommet';
import { materialUI } from './materialUI';
import { onsenUI } from './onsenUI';
import { orbit } from './orbit';
import { primeReact } from './primeReact';
import { quasar } from './quasar';
import { reactBootstrap } from './reactBootstrap';
import { reactMD } from './reactMD';
import { reactToolbox } from './reactToolbox';
import { ringUI } from './ringUI';
import { semanticUI } from './semanticUI';
import { smoothUI } from './smoothUI';
import { uiFabric } from './uiFabric';
import { zendesk } from './zendesk';

export const frameworks: Framework[] = sort(ascend(pipe(prop('frameworkName'), toLower)), [
  antDesign,
  atlaskit,
  blueprint,
  carbonDesign,
  chakra,
  elasticUI,
  element,
  elementalUI,
  evergreen,
  gestalt,
  grommet,
  materialUI,
  onsenUI,
  orbit,
  primeReact,
  quasar,
  reactBootstrap,
  reactMD,
  reactToolbox,
  ringUI,
  semanticUI,
  smoothUI,
  uiFabric,
  zendesk,
]);

export const frameworksById: FrameworksById = indexBy(prop('frameworkId'), frameworks);

export const frameworkInfo: FrameworkFeatureInfo[] = sortBy(prop('featureId'), [
  {
    criteria: 'The project is made with dark-mode styling in mind.  An out-of-the-box dark mode is either used on the docs site itself or well documented and easy to configure.',
    featureId: 'darkMode',
    name: 'Native Dark Mode',
    toJsx: jsxCheckmark,
    toMarkdown: markdownCheckmark,
  },
  {
    criteria: 'Ready-made resources exist for designers such as Sketch or Figma download packs.',
    featureId: 'designKits',
    name: 'Design Kits',
    toJsx: jsxDesignKits,
    toMarkdown: markdownDesignKits,
  },
  {
    criteria: 'Explicit right-to-Left support for use in apps with languages like Arabic, Hebrew, or Persian.',
    featureId: 'rtlSupport',
    name: 'RTL Support',
    toJsx: jsxCheckmark,
    toMarkdown: markdownCheckmark,
  },
  {
    criteria: 'A user-interactable theming area where designers and developers can play around with look and feel without needing to do any programming.',
    featureId: 'themer',
    name: 'Themer',
    toJsx: jsxThemer,
    toMarkdown: markdownThemer,
  },
  {
    criteria: 'Is either written in TypeScript (ideally) or has TypeScript definitions directly in the project.  DefinitelyTyped does not qualify.',
    featureId: 'typeScript',
    name: 'Native TypeScript',
    toJsx: jsxCheckmark,
    toMarkdown: markdownCheckmark,
  },
]);

export const frameworkInfoByFeatureId: FrameworkInfoByFeatureId = indexBy(prop('featureId'), frameworkInfo);
