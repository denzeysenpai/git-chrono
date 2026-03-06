



export const handle = async ({ event, resolve }) => {
    const session = event.cookies.get('session');

    if (session) {
        // validate token or lookup session in DB


    }

    return resolve(event);
};