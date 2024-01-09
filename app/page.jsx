"use client";

import React from "react";
import {
  Card,
  Container,
  CardBody,
  Heading,
  Text,
  Button,
  Input,
  Stack,
  Box,
  StackDivider,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const toast = useToast();
  const [editIsOpen, seteditIsOpen] = useState(false);
  const [currentTodo, setcurrentTodo] = useState({});
  const [todos, settodos] = useState(
    JSON.parse(localStorage.getItem("todos") || "[]")
  );

  const handleEditTodo = (index) => {
    seteditIsOpen(index);
    setcurrentTodo(todos[index]);
  };

  const randomId = () => {
    return Math.round(Math.random() * 10_000_000);
  };

  const handleDeleteTodo = (index) => {
    const resultTodos = Array.from(todos);
    resultTodos[index] = null;
    console.log(index);
    const result = resultTodos.filter((todo) => todo !== null);
    settodos(result);
    localStorage.removeItem(result);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log(todos);
  }, [todos]);

  return (
    <main className="h-full">
      {/* modal create */}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Title"
                onInput={(e) => {
                  setcurrentTodo((todo) => ({
                    ...todo,
                    title: e.target.value,
                  }));
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Description for your todo"
                onInput={(e) => {
                  setcurrentTodo((todo) => ({
                    ...todo,
                    description: e.target.value,
                  }));
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel>End Time</FormLabel>
              <Input
                ref={initialRef}
                type="datetime-local"
                onInput={(e) => {
                  setcurrentTodo((todo) => ({
                    ...todo,
                    endTime: new Date(e.target.value).getTime(),
                  }));
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                settodos((todos) => [
                  ...todos,
                  {
                    id: randomId(),
                    ...currentTodo,
                  },
                ]);
                onClose();
                setcurrentTodo({});
              }}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* modal edit */}
      <Modal isOpen={editIsOpen !== false} onClose={() => seteditIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                defaultValue={currentTodo?.title}
                placeholder="Title"
                onInput={(e) => {
                  setcurrentTodo((todo) => ({
                    ...todo,
                    title: e.target.value,
                  }));
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                defaultValue={currentTodo?.description}
                placeholder="Description for your todo"
                onInput={(e) => {
                  setcurrentTodo((todo) => ({
                    ...todo,
                    description: e.target.value,
                  }));
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>End Time</FormLabel>
              <Input
                defaultValue={currentTodo?.endTime}
                type="datetime-local"
                onInput={(e) => {
                  setcurrentTodo((todo) => ({
                    ...todo,
                    endTime: new Date(e.target.value).getTime(),
                  }));
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                const newTodos = Array.from(todos);
                newTodos[editIsOpen] = currentTodo;
                settodos(newTodos);
                seteditIsOpen(false);
              }}
            >
              Save
            </Button>
            <Button onClick={() => seteditIsOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Container maxW="container mx-auto">
        <Card className="p-6">
          <Box className="flex items-center justify-between">
            <h2 className="font-bold text-xl">Create your daily here!</h2>
            <Button colorScheme="teal" onClick={onOpen}>
              Create
            </Button>
          </Box>
        </Card>

        <Card className="mt-4">
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              {todos.map((todo, index) => (
                <Box key={index} className="flex justify-between">
                  <Box className="flex flex-col">
                    <Heading size="xs" textTransform="uppercase">
                      <Link href={`/todo/${todo.id}`}>{todo.title}</Link>
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {todo.description}
                    </Text>
                    <Text pt="2" fontSize="sm">
                      Deadline: {new Date(todo?.endTime)?.toDateString?.()}
                    </Text>
                  </Box>

                  <Box className="flex items-center gap-2">
                    <Button
                      colorScheme="yellow"
                      onClick={() => handleEditTodo(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDeleteTodo(index)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              ))}
            </Stack>
          </CardBody>
        </Card>
      </Container>
    </main>
  );
}
