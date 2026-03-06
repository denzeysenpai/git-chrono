import { browser } from '$app/environment';

function CreateCache() {
    function Add(key: string, value: string) {
        if (!browser) return;

        try {
            localStorage.setItem(key, value);
        } catch (err) {
            console.error('Cache add failed:', err);
        }
    }

    function Fetch(id: string) {
        if (!browser) return null;

        try {
            return localStorage.getItem(id);
        } catch (err) {
            console.error('Cache fetch failed:', err);
            return null;
        }
    }

    return {
        Add,
        Fetch
    };
}


export const __Cache__ = CreateCache();
