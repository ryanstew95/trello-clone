"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";

import { NavItem, Organization } from "./nav-item";

interface SidebarProps {
  storageKey?: string;
};

export const Sidebar = (
  { storageKey = "t-sidebar-state",  }: SidebarProps
) => {

  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {});
  const { organization: activeOrganization,
    isLoaded: isLoadedOrg
   } = useOrganization();
   const {
    userMemberships,
    isLoaded: isLoadedOrgList
   } = useOrganizationList({
    userMemberships: {
      infinite: true,
    }
   });

const defaultAccordingValue: string[] = Object.keys(expanded).reduce((acc: string[], key: string) => {
  if (expanded[key]) {
    acc.push(key);
  }
  return acc;
}, []);

const onExpand = (id: string) => {
setExpanded((curr) => ({
  ...curr,
  [id]: !expanded[id],
}));
};

if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {

return (
  <>
    <Skeleton />
  </>
);
}
return (
  <>
    <div className="font-medium text-xs flex items-center mb-1">
      <span className="pl-4">Workspaces</span>
      <Button
        asChild
        type="button"
        size="icon"
        variant="ghost"
        className="ml-auto"
      >
        <Link href="/select-org">
          <Plus className="h-4 w-4" />
        </Link>
      </Button>
    </div>
    <Accordion
      type="multiple"
      defaultValue={defaultAccordingValue}
      className="space-y-1"
    >
  {userMemberships.data.map((membership) => {
  const organization: Organization = {
    id: membership.organization.id, // Access id from organization object
    // slug: membership.organization.slug, // Access slug from organization object
    name: membership.organization.name, // Access name from organization object
    imageUrl: membership.organization.imageUrl, // Access imageUrl from organization object
  };
  // !find out where slug is 
        console.log("DATA:", userMemberships.data);

        return (
          <NavItem
            key={organization.id}
            isActive={activeOrganization?.id === organization.id}
            isExpanded={expanded[organization.id] || false}
            organization={organization}
            onExpand={onExpand}
          />
        );
      })}
    </Accordion>
  </>
);
    }
    