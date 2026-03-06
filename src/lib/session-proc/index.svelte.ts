
import { PUBLIC_CACHE_PREFIX, PUBLIC_CACHE_SECRET, PUBLIC_SESSION_KEY } from '$env/static/public';
import { __Cache__ } from '$lib/cache';
import { __Crypto__ } from '$lib/crypto';




const CreateController = () => {
    const front_end_session_key: string = `${PUBLIC_SESSION_KEY}-${PUBLIC_CACHE_PREFIX}-${PUBLIC_CACHE_SECRET}`;
    let session_id: string | undefined = $state();

    return {
        Fetch: async () => {
            if (session_id) return session_id;
            else {
                const c = await __Crypto__.Encrypt(front_end_session_key);
                return __Cache__.Fetch(c);
            }
        },
        New: async (session: string) => {
            const c = await __Crypto__.Encrypt(front_end_session_key);
            __Cache__.Add(c, session);
            session_id = session
        }
    };
}



export const __Session__ = CreateController();