'use strict';

import dotenv from 'dotenv';
dotenv.config();

import { Configuration, OpenAIApi } from 'openai';

class ChatController {
    constructor({ database }) {
        this.database = database;
        this.configuration = new Configuration({
            organization: process.env.OPEN_AI_ORG,
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async firstConversation(req, res) {
        const openai = new OpenAIApi(this.configuration);
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                // { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: req.body.question },
                // { role: 'assistant', content: 'The Los Angeles Dodgers won the World Series in 2020.' },
                // { role: 'user', content: 'Where was it played?' }
            ]
        });

        console.log('response', response.data.choices[0].message);

        res.json({
            answer: response.data.choices[0].message.content
        });
    }
}

export default ChatController;
