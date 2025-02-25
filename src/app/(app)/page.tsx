'use client';
import React from 'react'

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import messages from "@/messages.json"
import Autoplay from "embla-carousel-autoplay"
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

function Home() {
  return (
    <>
    <section className='p-4 md:p-6'>
      <Button asChild>
        <Link href={'/dashboard'}>
          Go To Dashboard <ArrowRight/>
        </Link>
      </Button>
    </section>
    <main className='flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12'>
        <section className='text-center mb-8 md:mb-12'>
            <h1 className='text-3xl md:text-5xl font-bold'>
                Dive into the World of Anonymous Conversation
            </h1>
            <p className='mt-3 md:mt-4 text-base md:text-lg'>Chat with strangers from around the world. Share your thoughts, feelings, and ideas.</p>
        </section>
        <Carousel
          plugins={[Autoplay({delay: 2000})]}
          className="w-full max-w-xl h-min"
        >
          <CarouselContent>
            {messages.map((message, index) =>(
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardHeader>{message.title}</CardHeader>
                    <CardContent className="flex items-center justify-center p-6">
                      <span className="text-4xl font-semibold">{message.content}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
    </main>

    <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
    © 2025 Mystery Message. All rights reserved.
    </footer>
    </>
  )
}

export default Home