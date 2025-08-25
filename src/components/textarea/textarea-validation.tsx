import { Controller, useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface TextareaValidationProps extends React.ComponentProps<"textarea"> {
	name: string;
	label?: string;
}

function TextareaValidation({ name, label, ...passProps }: TextareaValidationProps) {
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

					<Textarea {...passProps} {...field} />

					{errors[name] && <p className="text-sm text-red-400">{errors[name]?.message as string}</p>}
				</>
			)}
		/>
	);
}

export { TextareaValidation };
