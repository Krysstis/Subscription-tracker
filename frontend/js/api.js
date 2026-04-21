const API_URL = 'https://localhost:3000/api';

async function request(method, endpoint, body = null) {
    const token = localStorage.getItem('token');

    const options = {
        method,
        headers: { 'Content-Type': 'application/json' }
    };

    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    if (body) {
        options.body = JSON.stringify(body);
    }

    const res = await fetch(API_URL + endpoint, options);
    const data = await res.json();

    if (!res.ok) {
        throw { status: res.status, data };
    }

    return data;
}

const api = {
    post: (endpoint, body) => request('POST', endpoint, body),
    get: (endpoint) => request('GET', endpoint),
    put: (endpoint, body) => request('PUT', endpoint, body),
    patch: (endpoint, body) => request('PATCH', endpoint, body),
    delete: (endpoint) => request('DELETE', endpoint)
};
