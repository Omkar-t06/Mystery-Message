import { NextRequest, NextResponse } from 'next/server';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const prompt = `Create a list of three open-ended and engaging questions formatted as a single string. 
    Each question should be separated by '||'. These questions are for an anonymous social messaging platform, 
    like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, 
    focusing instead on universal themes that encourage friendly interaction. 
    Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.`;

    const model = google('models/gemini-1.5-pro-latest');

    const response = streamText({
      model,
      prompt,
      maxTokens: 400,
    });
    
    // let fullResponse = '';
    // for await (const chunk of response.textStream) {
    //   fullResponse += chunk;
    // }

    // return NextResponse.json({ 'question': fullResponse }, { status: 200 });
    return response.toDataStreamResponse();
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ message :`Failed to fetch suggested message.` }, { status: 500 });
  }
} 