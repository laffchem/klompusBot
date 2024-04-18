import { chooseTopic, chooseLinkedInism, klompusTalk } from '../src/logic.js';
import { linkedInisms, topics } from '../src/klompuses.js';
const topic = chooseTopic(topics);
const linkedInism = chooseLinkedInism(linkedInisms);
klompusTalk(topic, linkedInism);
