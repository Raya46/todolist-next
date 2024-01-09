"use client";

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

import React, { useEffect } from "react";

export default function Page({ params }) {
  useEffect(() => {
    console.log(params);
  }, []);

  return (
    <Container maxW="container mx-auto">
      <span>{params.todoID}</span>
    </Container>
  );
}
