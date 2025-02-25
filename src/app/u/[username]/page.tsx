'use client';

import { useParams } from 'next/navigation';
import React, { use, useState } from 'react'
import { useCompletion } from '@ai-sdk/react'
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { messageSchema } from '@/schemas/messageSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useToast } from '@/hooks/use-toast';
import { ApiResponse } from '@/types/ApiResponse';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const specialChar = "||";

const parseStringMessages = (message: string): string[] => message.split(specialChar);

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

function SendMessage() {
    const { username } = useParams<{ username: string }>();

    // const {
    //     complete,
    //     completion,
    //     isLoading: isSuggestingMessages,
    //     error,
    // } = useCompletion({
    //     api: '/api/suggest-messages',
    //     initialCompletion: initialMessageString,
    // });

    // console.log(completion)
    // console.log(error)

    const form = useForm<z.infer<typeof messageSchema>>({
        resolver: zodResolver(messageSchema),
    });

    const messageContent = form.watch('content');

    const handleMessageClick = (message: string) => form.setValue("content", message);

    const [isLoading, setIsLoading] = useState(false);
    const [isSuggestingMessages, setIsSuggestingMessage] = useState(false);
    const [suggestingMessageError, setSuggestingMessageError] = useState<Error | null>(null);
    const [messageString, setMessageString] = useState(initialMessageString);

    const { toast } = useToast();

    const onSubmit = async (data: z.infer<typeof messageSchema>) => {
        setIsLoading(true);
        try {
            const res = await axios.post('/api/send-message', {
                ...data,
                username,
            })
            toast({
                title: res.data.message,
                variant: 'default',
            })
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
                title: "Error.",
                description: axiosError.response?.data.message || "Something went wrong. Failed to send message.",
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false);
        }
    }

    const fetchSuggestedMessages = async () => {
        setIsSuggestingMessage(true);
        try {
            const res = await axios.post('/api/suggest-messages');
            if(!res.data.question){
                throw Error("Invalid API response.")
            }            
            setMessageString(res.data.question)
        } catch (error) {
            console.log(error);
            setSuggestingMessageError(error as Error)
        } finally {
            setIsSuggestingMessage(false)
        }
    }
     
    return (
        <div className='container mx-auto my-8 p-6 bg-white rounded max-w-4xl'>
            <h1 className="text-4xl font-bold mb-6 text-center">
                Public Profile Link
            </h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                    <FormField
                        control={form.control}
                        name='content'
                        render={({ field }) => (
                            <FormItem className='flex flex-col'>
                                <FormLabel>Send Anonymous Message to @{username}</FormLabel>
                                <FormControl>
                                    <textarea 
                                        {...field}
                                        placeholder="Write your anonymous message here" 
                                        className="resize-none"
                                        aria-label="Anonymous message input"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className='flex justify-end'>
                        {isLoading ? (
                            <Button disabled>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                                Please Wait...
                            </Button>
                        ) : (
                            <Button type='submit' disabled={isLoading || !messageContent?.trim()}>
                                Send Message
                            </Button>
                        )}
                    </div>
                </form>
            </Form>
            
            <div className='space-y-4 my-8'>
                <div className='space-y-2'>
                    <Button
                        onClick= {fetchSuggestedMessages}
                        className='my-4'
                        disabled = {isSuggestingMessages}
                    >
                        Suggest Messages
                    </Button>
                    <p>Click on any message to select it.</p>
                </div>
                <Card>
                    <CardHeader>
                        <h3 className='text-xl font-bold'>Messages</h3>
                    </CardHeader>
                    <CardContent className='flex flex-col space-y-4'>
                        {
                            suggestingMessageError ? (
                                <p className='bg-red-400 rounded p-2 '>
                                    {suggestingMessageError.message}
                                </p>
                            ) : (
                                parseStringMessages(messageString).map((message, index) => (
                                    <Button
                                        key={index}
                                        variant={'outline'}
                                        className='mb-2'
                                        onClick={() => handleMessageClick(message)}
                                    >
                                        {message}
                                    </Button>
                                ))
                            )
                        }
                    </CardContent>
                </Card>
            </div>

            <Separator className='my-6'/>
            <div className="text-center">
                <div className="mb-4">Get Your Message Board</div>
                <Link href={'/sign-up'}>
                    <Button>Create Your Account</Button>
                </Link>
            </div>
        </div>
    )
}

export default SendMessage