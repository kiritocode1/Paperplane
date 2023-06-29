import { ButtonHTMLAttributes, FC } from "react";
import { cva , VariantProps} from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const ButtonVariants = cva(
	"active:scale-95 inline-flex items-center justify-center rounded-md  text-sm font-medium transition-color focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
	{
		variants: {
			variant: {
				default: "bg-slate-900 hover:bg-slate-800 text-white",
				ghost: "bg-transparent hover:bg-slate-200 hover:text-slate-900",
			},
			size: {
				default: "px-4 py-2 h-10",
				sm: "h-9 px-2",
				lg: "h-11 px-8",
			},
    },
    defaultVariants: {
      variant: "default",
      size: "default", 
    }
	},
);

export interface ButtonProps extends VariantProps<typeof ButtonVariants>, ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean, 

 }; 


const Button: FC<ButtonProps> = ({className, isLoading , children ,variant , size ,  ...props}) => {
  return <button className={cn(ButtonVariants({variant, size , className}))} disabled={isLoading} {...props} >{isLoading?<Loader2  className="mr-2 h-4 w-4 animate-spin animate-pulse"/>:null }{ children}</button>;
};

export default Button;
