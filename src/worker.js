export default {

    async fetch(request, env) {

        const url = new URL(request.url);

        if (url.pathname === "/api/my-ip") {

            const ip = request.headers.get("cf-connecting-ip") || "unknown";

            return new Response(
                JSON.stringify({ ip }),
                { headers: { "content-type": "application/json" } }
            );

        }

        return env.ASSETS.fetch(request);

    }

};
