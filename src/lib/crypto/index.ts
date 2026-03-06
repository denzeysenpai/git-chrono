import { PUBLIC_CACHE_SECRET } from '$env/static/public';

export function CreateCrypto() {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    async function getKey() {
        const rawKey = await crypto.subtle.digest(
            'SHA-256',
            encoder.encode(PUBLIC_CACHE_SECRET)
        );

        return crypto.subtle.importKey(
            'raw',
            rawKey,
            { name: 'AES-GCM' },
            false,
            ['encrypt', 'decrypt']
        );
    }

    async function Encrypt(text: string) {
        const key = await getKey();
        const iv = crypto.getRandomValues(new Uint8Array(12));

        const encrypted = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            key,
            encoder.encode(text)
        );

        const result = new Uint8Array(iv.length + encrypted.byteLength);
        result.set(iv);
        result.set(new Uint8Array(encrypted), iv.length);

        return btoa(String.fromCharCode(...result));
    }

    async function Decrypt(cipher: string) {
        const key = await getKey();

        const bytes = Uint8Array.from(atob(cipher), c => c.charCodeAt(0));

        const iv = bytes.slice(0, 12);
        const data = bytes.slice(12);

        const decrypted = await crypto.subtle.decrypt(
            { name: 'AES-GCM', iv },
            key,
            data
        );

        return decoder.decode(decrypted);
    }

    return {
        Encrypt,
        Decrypt
    };
}


export const __Crypto__ = CreateCrypto();