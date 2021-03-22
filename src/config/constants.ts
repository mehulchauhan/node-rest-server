export const __PROD__ = process.env.NODE_ENV === 'production';
export const __PORT__ = process.env.PORT || 3000;
export const __DB_NAME__ =
  process.env.DB_NAME || 'node-rest-server-rbac-system';
export const __DB_U_NAME__ = process.env.DB_U_NAME || 'root';
export const __DB_U_PWD__ = process.env.DB_U_PWD || 'password';
export const SECRET = process.env.SECRET || 'somesecret';
