import { Logo } from '@/components/logo';

export const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <div className="flex items-center">
         
          <Logo />
        </div>
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <a href="/login" className="mr-4">Login</a>
          <a href="/sign-up" className="btn btn-primary">Register</a>
        </div>
      </div>
    </nav>
  );
}