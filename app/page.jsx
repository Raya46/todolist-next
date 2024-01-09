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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const resultTodo = {};

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const toast = useToast();
  const [todos, settodos] = useState(
    JSON.parse(localStorage.getItem("todos") ?? [])
  );

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
  }, [todos]);

  return (
    <main className="h-full">
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
                onInput={(e) => (resultTodo.title = e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Description for your todo"
                onInput={(e) => (resultTodo.description = e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>End Time</FormLabel>
              <Input
                ref={initialRef}
                type="datetime-local"
                onInput={(e) => (resultTodo.endTime = new Date(e.target.value))}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                settodos((todos) => [...todos, resultTodo]);
                onClose();
              }}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
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
                      {todo.title}
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {todo.description}
                    </Text>
                    <Text pt="2" fontSize="sm">
                      {todo?.endTime instanceof Date
                        ? todo.endTime.toDateString()
                        : localStorage.getItem("todo")}
                    </Text>
                  </Box>

                  <Box className="flex items-center gap-2">
                    <Button colorScheme="yellow">Edit</Button>
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
