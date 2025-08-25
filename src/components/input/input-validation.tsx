import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputValidationProps extends React.ComponentProps<"input"> {
	name: string;
	label?: string;
}

function InputValidation({ name, label, ...passProps }: InputValidationProps) {
	const {
		control,
		formState: { errors },
	} = useFormContext();
	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<>
					{label ? (
						<Label htmlFor={name} className="text-sm font-medium text-zinc-200">
							{label}
						</Label>
					) : null}
					<Input {...passProps} {...field} />
					{errors[name] && <p className="text-sm text-red-400">{errors[name]?.message as string}</p>}
				</>
			)}
		/>
	);
}

export { InputValidation };
