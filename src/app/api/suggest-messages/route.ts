import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { NextResponse } from 'next/server';

interface CoreMessage {
    role: 'user' | 'system' | 'assistant'; // Update with actual expected roles
    content: string;
}
  

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    // Replace your messages with a structured input
    const messages: CoreMessage[] = [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: prompt }
    ];

    const result = streamText({
      model: openai('gpt-3.5-turbo'), 
      messages,
    });

    // Returning the streamed response
    return result.toDataStreamResponse();
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
