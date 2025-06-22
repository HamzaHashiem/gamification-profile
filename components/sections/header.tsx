import { ModeToggle } from "../mode-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold pr-4">
            My Game Profile
          </h3>
          <div className="flex-shrink-0">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}