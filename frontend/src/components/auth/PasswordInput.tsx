import { useState, type ComponentProps } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui";
import { cn } from "@/lib/utils";

const PasswordInput = ({
  className,
  ...props
}: ComponentProps<"input">) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative mt-2 mb-4">
      <Input
        {...props}
        type={visible ? "text" : "password"}
        className={cn("pr-11 [&::-ms-reveal]:hidden", className)}
      />
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        aria-label={visible ? "Ukryj hasło" : "Pokaż hasło"}
        aria-pressed={visible}
        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-black"
      >
        {visible ? (
          <EyeOff className="size-4" aria-hidden="true" />
        ) : (
          <Eye className="size-4" aria-hidden="true" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
