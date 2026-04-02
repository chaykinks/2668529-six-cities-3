const TOKEN_KEY = 'six-cities-token';

function getToken(): string {
  return localStorage.getItem(TOKEN_KEY) ?? '';
}

export { getToken };
