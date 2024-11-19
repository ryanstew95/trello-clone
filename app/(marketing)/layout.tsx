
const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-slate-100">
      <header>Navbar here</header>
      <main className="pt-40 pb-20 bg-slate-100">{children}</main>
      <footer>Marketing Footer here</footer>
    </div>
  );
};

export default MarketingLayout;
