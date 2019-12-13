export async function project1Login(username: string, password: string) {
    const credentials = {
        username,
        password
    };
    try {
        const response = await fetch('http://localhost:1101/login', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(credentials),
            headers: {
                'content-type': 'application/json'
            }
        });
    } catch (e) {
        console.log(e);
    }
}