"use client";

import { useEffect, useState } from "react";

import { StoreModal } from "@/components/modals/store-modal";

//this to avoid hydration error when using this provider  with server component
export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    //this can happen only in a client component
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; //when in server component return null

  return (
    <>
      <StoreModal />
    </>
  );
};
