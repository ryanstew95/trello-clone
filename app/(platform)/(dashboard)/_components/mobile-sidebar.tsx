"use client";

import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sidebar } from "./sidebar";

import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetHeader } from "@/components/ui/sheet";

export const MobileSidebar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

const onOpen = useMobileSidebar((state) => state.onOpen);
const onClose = useMobileSidebar((state) => state.onClose);
const isOpen = useMobileSidebar((state) => state.isOpen);

useEffect(() => {
  setIsMounted(true);
}, []);

useEffect(() => { onClose(); }, [pathname, onClose]);

if (!isMounted) {
  return null;
};

  return (
    <>
    <Button
    onClick={onOpen}
    className="block md:hidden mr-2"
    variant="ghost"
    size="sm"
    >
<Menu className="h-4 w-4"/>
    </Button>
    <Sheet open={isOpen} onOpenChange={onClose}>
  <SheetTrigger></SheetTrigger>
  <SheetContent
  side="left"
  className="p-2 pt-10"
  >
    <SheetHeader>
      <SheetTitle>Your Title Here</SheetTitle>
      <SheetDescription>Optional description here</SheetDescription>
    </SheetHeader>
<Sidebar 
  storageKey="t-sidebar-mobile-state"
/>

  </SheetContent>
</Sheet>

    </>
  )
};

