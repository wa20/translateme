import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isTranslateRoute = createRouteMatcher(['/translate(.*)']);
const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware((auth, req) => {
  // Restrict admin route to users with specific role
//   if (isAdminRoute(req)) auth().protect({ role: 'org:admin' });

  // Restrict dashboard routes to signed in users
  if (isTranslateRoute(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}; 


// another way is to add the page directly:
// export const config = {
//     matcher: ['/((?!.*\\..*|_next).*)', '/', '/translate', '/(api|trpc)(.*)'],
//   }; 