import webdriver from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome.js';
import 'chromedriver';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { username, password, apiKey } from './config.js';
import { linkedInisms } from './klompuses.js';
import { sleep } from './utils.js';

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// Launch logic
export const launch = async () => {
	const chromeOptions = new Options();
	chromeOptions.addArguments('--start-maximized', '--incognito');

	const driver = await new webdriver.Builder()
		.forBrowser(webdriver.Browser.CHROME)
		.setChromeOptions(chromeOptions)
		.build();

	await driver.manage().setTimeouts({ implicit: 60000 });

	return driver;
};

// Login Logic
export const login = async (driver) => {
	await driver.get('https://www.linkedin.com');
	const userInput = await driver.findElement(
		webdriver.By.css('input#session_key')
	);
	const pwInput = await driver.findElement(
		webdriver.By.css('input#session_password')
	);
	await userInput.sendKeys(username);
	await pwInput.sendKeys(password);
	await driver.findElement(webdriver.By.css('button.btn-primary')).click();
};

// Post Logic
export const createPost = async (driver, post) => {
	await driver
		.findElement(
			webdriver.By.xpath(
				'/html/body/div[5]/div[3]/div/div/div[2]/div/div/main/div[1]/div[2]/div[2]/button'
			)
		)
		.click();

	await driver
		.findElement(
			webdriver.By.xpath(
				'/html/body/div[3]/div/div/div/div[2]/div/div[2]/div[1]/div/div/div/div/div/div/div[1]/p'
			)
		)
		.sendKeys(post);

	sleep(5000);
	await driver
		.findElement(
			webdriver.By.xpath(
				'/html/body/div[3]/div/div/div/div[2]/div/div[2]/div[2]/div[2]/div/div[2]/button'
			)
		)
		.click();
	sleep(3000);
	console.log('Closing browser...');
	await driver.quit();
};

// Follow random people logic

// Google AI
export const chooseTopic = (topics) => {
	const index = Math.ceil(Math.random() * topics.length);
	console.log(topics[index]);
	return topics[index];
};

export const chooseLinkedInism = (linkedInsms) => {
	const index = Math.ceil(Math.random() * linkedInsms.length);
	console.log(linkedInisms[index]);
	return linkedInsms[index];
};
export const klompusTalk = async (topic, linkedInIsm) => {
	const prompt = `Write a motivational linkedin post as Jack Klompus from Seinfeld as if he was a real person. 
	The post topic is: ${topic} and the linkedin descriptive word is: ${linkedInIsm}. 
	When referring to people ensure you call them something like professionals.
	Don't create a title for the post.  
	Also, ensure you always use hashtags to help drive engagement.`;
	const result = await model.generateContent(prompt);
	const response = await result.response;
	const text = response.text();
	console.log(text);
	return text;
};

export const generatePost = async (topics, linkedInisms) => {
	const topic = chooseTopic(topics);
	const linkedInIsm = chooseLinkedInism(linkedInisms);
	const post = await klompusTalk(topic, linkedInIsm);
	return post;
};
