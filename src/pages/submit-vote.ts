import { kv } from '@vercel/kv';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
    const formData = await request.formData()
    const title = formData.get('title');

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