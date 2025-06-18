'use client';
import { Trash2 } from 'lucide-react';
import React, { useState, useTransition } from 'react';
import { Button } from '../ui/button';
import {
  DialogFooter,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { deleteSummaryAction } from '@/action/summary-action';
import toast from 'react-hot-toast';

interface DeleteButtonsProps {
  summaryId: string;
}

const DeleteButton = ({ summaryId }: DeleteButtonsProps) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const handleDelete = async () => {
    startTransition(async () => {
      const result = await deleteSummaryAction({ summaryId });
      if (!result) {
        toast.error('Error Occured');
      }
      setOpen(false);
    });
    // Delete Summary
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={'ghost'}
          size="icon"
          className="text-gray-400 bg-gray-50 border border-gray-200 hover:text-rose-600 hover:bg-rose-50"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Summary</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the summary? This actoin cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="ghost"
            size="sm"
            className=" bg-gray-50 border border-gray-200 hover:text-gray-600 hover:bg-gray-50"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className=" bg-gray-900 border   hover:bg-gray-600"
            onClick={() => handleDelete()}
          >
            {isPending ? 'Deleting...' : 'Deleted'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
