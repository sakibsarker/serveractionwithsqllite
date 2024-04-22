"use client";
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import * as actions from "@/actions";
import { useFormState } from "react-dom";

export default function TopicCreateForm() {
  const [formState, action] = useFormState(actions.CreateTopic, {
    errors: {},
  });
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Topic</h3>
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="Enter name"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(",")}
            />

            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Enter description"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(",")}
            />
            <Button type="submit" color="primary">
              Save
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
