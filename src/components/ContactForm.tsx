// Make sure to run npm install @formspree/react
// For more help visit https://formspr.ee/react-help
import React from 'react';
import {useForm, ValidationError} from '@formspree/react';

function ContactForm() {
    const [state, handleSubmit] = useForm("xovjgyjo");
    if (state.succeeded) {
        return <p className="bg-primary text-primary-content rounded-sm p-4 text-center">
            Vielen Dank für Ihre Kontaktaufnahme! Wir melden uns in kürze bei Ihnen.
        </p>;
    }
    return (
        <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
            <input name="_language" type="hidden" value="de" />
            <input name="subject"   type="hidden" value="Kontaktformular {{ name }}" />

            <fieldset className="flex flex-col gap-1">
                <label htmlFor="name">
                    Name
                </label>
                <input className="w-full p-1 rounded border border-secondary active:border-primary"
                       autoComplete="name" placeholder="Anna Muster"
                       id="name"
                       type="text"
                       name="name"
                       required={true}
                />
                <ValidationError
                    className="text-red-600 dark:text-red-300"
                    prefix="Name"
                    field="name"
                    errors={state.errors}
                />
            </fieldset>
            <fieldset className="flex flex-col gap-1">
                <label htmlFor="email">
                    E-Mail
                </label>
                <input className="w-full p-1 rounded border border-secondary active:border-primary"
                       autoComplete="email" placeholder="anna.muster@example.de"
                       id="email"
                       type="email"
                       name="email"
                       required={true}
                />
                <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                />
            </fieldset>
            <fieldset className="flex flex-col gap-1">
                <label htmlFor="email">
                    Telefon (optional)
                </label>
                <input className="w-full p-1 rounded border border-secondary active:border-primary"
                       autoComplete="tel"
                       id="phone"
                       type="tel"
                       name="phone"
                />
                <ValidationError
                    prefix="Telefon"
                    field="phone"
                    errors={state.errors}
                />
            </fieldset>
            <fieldset className="flex flex-col gap-1">
                <label htmlFor="message">
                    Nachricht (optional)
                </label>
                <textarea className="min-h-24 w-full p-1 rounded border border-secondary active:border-primary"
                          autoComplete="off"
                          id="message"
                          name="message"
                />
                <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                />
            </fieldset>
            <button
                className="flex gap-2 justify-center py-2 px-4 rounded-xs bg-primary text-primary-content hover:bg-secondary transition-colors ease-in-out duration-200 cursor-pointer"
                type="submit" disabled={state.submitting}>
                Abschicken
            </button>
        </form>
    );
}

export default ContactForm;
