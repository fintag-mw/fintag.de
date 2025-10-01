import type {RenderFunctionInput} from "astro-opengraph-images";

const {twj} = await import("tw-to-css");

// Remember to import these modules
import path from "path";
import * as fs from "node:fs";

const filePath = path.join(
    process.cwd(),
    "static",
    "img",
    "logo_portrait.png",
);
const imageBase64 = `data:image/png;base64,${fs.readFileSync(filePath).toString("base64")}`;

// from https://fullstackheroes.com/resources/vercel-og-templates/simple/
export async function opengraphFintagRenderer({title, description}: RenderFunctionInput): Promise<React.ReactNode> {
    return Promise.resolve(
        <div style={twj("h-full w-full flex flex-col justify-start border border-[#00378b] border-[6px] bg-[#FDFDFD] p-[36px]")}>
            <img
                style={twj("h-[140px] object-contain object-top-left")}
                src={imageBase64}
                alt={""}
            />
            <div style={twj("flex-1 w-full h-full mt-12 flex flex-col justify-end font-black")}>
                <h1 style={twj("text-[80px] leading-snug mb-6")}>{title}</h1>
                <div style={twj("text-3xl leading-snug font-bold")}>{description}</div>
            </div>
        </div>,
    );
}