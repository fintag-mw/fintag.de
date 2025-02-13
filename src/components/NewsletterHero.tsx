import {useState, useEffect} from "react";

type Newsletter = {
    title: string,
    contentPreview: string,
    browserUrl: string,
    publishDate: string,
    author: {
        name: string,
        profilePictureUrl: string,
        profileUrl: string,
    },
    categories: [{
        name: string,
        role: string,
    }]
}

function Article(newsletter: Newsletter) {
    return <div className="rounded bg-white dark:bg-base-200 text-text border-l-4 border-primary w-full max-w-5xl">
        <div className="p-4">
            <h2 className="mt-0">{newsletter.title}</h2>
            <p className="flex gap-1 my-1 flex-wrap">
                {newsletter.categories.map(category => {
                    let classNames = "px-2 rounded-sm";
                    if (category.role === "primary") {
                        classNames += " bg-primary text-primary-content";
                    } else if (category.role === "secondary") {
                        classNames += " bg-secondary text-white";
                    } else {
                        classNames += " border border-base-300";
                    }
                    return <small className={classNames} data-wave-role={category.role}>
                        {category.name}
                    </small>
                })}
            </p>
            <p className="flex flex-col lg:flex-row gap-x-1">
                <small>
                    vom <time dateTime={newsletter.publishDate}>
                    {new Date(newsletter.publishDate).toLocaleDateString("de-DE", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                    })}
                </time>
                </small>
                <small>
                    von <a className="hover:text-primary" href={newsletter.author.profileUrl}
                           target="_blank">
                    {newsletter.author.name}
                </a>
                </small>
            </p>
            <p className="my-3 leading-snug text-start lg:text-justify line-clamp-3">
                {newsletter.contentPreview}
            </p>
            <div className="flex">
                <a className="py-2 px-4 w-32 text-center bg-primary text-primary-content rounded-sm hover:bg-secondary transition-colors ease-in-out duration-200 cursor-pointer"
                   href={newsletter.browserUrl}>
                    Weiterlesen...
                </a>
            </div>
        </div>
    </div>
}

function Empty() {
    return <div className="rounded bg-white dark:bg-base-200 text-text border-l-4 border-primary w-full max-w-5xl">
        <div className="p-4">
            <h2 className="mt-0">Kein Newsletter gefunden</h2>
            <small>von fintag Mitarbeiter</small>
            <div className="my-3 animate-pulse flex flex-col gap-y-2">
                <div className="h-3 bg-slate-200 dark:bg-slate-400 rounded"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-400 rounded"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-400 rounded"></div>
            </div>
            <div className="flex">
                <a className="py-2 px-4 w-32 text-center bg-primary text-primary-content rounded-sm hover:bg-secondary transition-colors ease-in-out duration-200 cursor-pointer"
                   href="https://newsletter.fintag.de">
                    Weiterlesen...
                </a>
            </div>
        </div>
    </div>
}

export default function NewsletterHero() {
    const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
    const [busy, setBusy] = useState<boolean>(true);

    useEffect(() => {
        fetch("https://newsletter.fintag.de/api/article/featured?size=150", {
            method: "GET",
            headers: new Headers({
                "Accept": "application/json"
            })
        }).then(result => {
            return result.json();
        }).then(data => {
            setNewsletter(data);
            setBusy(false);
        }).catch(error => {
            console.log("Error loading Newsletter: " + error);
            setBusy(false);
        })
    }, [setNewsletter]);

    const loading = <>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
             stroke="currentColor" className="size-12 animate-spin">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/>
        </svg>
    </>;

    return <section className="p-4 mb-12 bg-base-200">
        <h2 className="mt-0 text-center">Der fintag Newsletter</h2>
        <div className="grid place-items-center min-h-40">
            {newsletter && Article(newsletter)}
            {busy && loading}
            {(!busy && !newsletter) && Empty()}
        </div>
    </section>
}