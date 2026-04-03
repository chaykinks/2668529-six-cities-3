const TOKEN_KEY = 'six-cities-token';

export const getToken = (): string => {
  return localStorage.getItem(TOKEN_KEY) ?? '';
};

export const saveToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

