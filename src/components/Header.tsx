type HeaderProps = {
  title?: string;
};

function Header({title = "Welk vak heeft de kleur:"}: HeaderProps) {
  return (
   <header className="bg-[#060606] text-white">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-3 items-center h-16">
      <div className="flex items-center">
        <a className="block" href="#">
          <span className="sr-only">Home</span>
          <img src="src/assets/logo.png" alt="Logo" className="h-8" />
        </a>
      </div>

      <div className="flex justify-center">
        <h1 className="text-lg md:text-2xl font-semibold tracking-tight text-white">
          {title}
        </h1>
      </div>
    </div>
  </div>
</header>
  );
}


export default Header;