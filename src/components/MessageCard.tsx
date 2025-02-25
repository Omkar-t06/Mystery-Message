'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import dayjs from 'dayjs';
import { Message } from "@/model/user.model";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import axios, { AxiosError } from "axios";
import { X } from "lucide-react";

type MessageCardProps = {
    message: Message;
    onMessageDelete: (messageId: string) => void;
}

function MessageCard({message, onMessageDelete}: MessageCardProps) {
    const {toast} = useToast();

    const handleDelete = async () => {
        try {
          const res = await axios.delete(`/api/delete-message/${message._id}`);

          toast({
            title: res.data.message,
          });

          onMessageDelete(message._id as string);
        } catch (error) {
          const axiosError = error as AxiosError;
          toast({
            title: 'Error',
            description: (axiosError.response?.data as { message: string }).message || 'Failed to delete message',
            variant: 'destructive'
          })
        }
    }

    return (
      <Card className="card-bordered">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{message.content}</CardTitle>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant='destructive'>
                  <X className="w-5 h-5"/>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="text-sm">
            {dayjs(message.createdAt).format('MMM D, YYYY h:mm A')}
          </div>
        </CardHeader>
      </Card>
    );
}

export default MessageCard
  