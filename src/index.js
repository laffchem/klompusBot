import {
	launch,
	login,
	createPost,
	chooseTopic,
	chooseLinkedInism,
	klompusTalk,
	generatePost,
} from './logic.js';

import { topics, linkedInisms } from './klompuses.js';

const post = generatePost(topics, linkedInisms);

// const post = await generatePost(topics, linkedInisms);
const driver = await launch();
await login(driver);
await createPost(driver, post);
