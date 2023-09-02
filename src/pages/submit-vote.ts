import { kv } from '@vercel/kv';
import type { APIRoute } from 'astro';
import { topics } from "../lib";

export const POST: APIRoute = async ({ request }) => {
    const formData = await request.formData()
    const title = formData.get('title') as string;
    if (!topics.includes(title)) {
        throw new Error('Invalid title');
    }

    const numVotes = await kv.incr(`topic:${title}`);

    return new Response(
        JSON.stringify({ numVotes, title }), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    }
    );
}