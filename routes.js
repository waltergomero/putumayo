/**
 * An Array of routes that are accessible to the public
 * these routes are not protected by the auth middleware
 * @type {Array}
 */
export const publicRoutes = ["/", "/about", "/contact",];

/**
 * An Array of routes that are used for authentication
 * these routes will redirect logged in users to the dashboard
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * The prefix for API authenticated routes
 * Routest that with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The  default route to redirect to after a successful login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/admin";