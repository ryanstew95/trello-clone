import React from 'react';
import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return <SignIn path="/sign-in" routing="path" />;
}