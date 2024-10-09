'use client';
import { useFormState } from 'react-dom';
import { authenticate } from '@app/lib/actions';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';

export function LoginForm() {
    const [errorMessage, formAction, isPending] = useFormState(authenticate, undefined);

    return (
        <form action={formAction} className="flex max-w-md flex-col gap-4">
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email" value="Your email" />
                </div>
                <TextInput
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@flowbite.com"
                    required
                    shadow
                    defaultValue="cecelia_franey12@hotmail.com"
                />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password" value="Your password" />
                </div>
                <TextInput id="password" name="password" type="password" required shadow defaultValue="Super@123" />
            </div>
            <div className="flex items-center gap-2">
                <Checkbox id="rememberMe" />
                <Label htmlFor="rememberMe" className="flex">
                    Remember me.
                </Label>
            </div>
            {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
            <Button type="submit" aria-disabled={isPending}>
                Login
            </Button>
        </form>
    );
}

export default LoginForm;
