import { useTheme } from "@/hooks/use-theme";
import { cn, resolveTheme } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = resolveTheme(theme) === "dark";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={"/"} aria-label="Cloudly main page">
          <img
            src={isDark ? "/logo-dark.svg" : "/logo-light.svg"}
            alt="Cloudly"
            className="h-16"
          />
        </Link>
        <div>
          {/* search */}
          {/* theme toggle */}
          <div
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={cn(
              "flex items-center cursor-pointer transition-transform duration-500",
              isDark ? "rotate-180" : "rotate-0",
            )}
          >
            {isDark ? (
              <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all" />
            ) : (
              <Moon className="h-6 w-6 text-blue-500 rotate-0 transition-all" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
