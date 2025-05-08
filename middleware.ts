import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(

  function middleware() {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // nextUrl exract the url
        const {pathname} = req.nextUrl;

        // allow auth related routes
        if(
            pathname.startsWith('/api/auth') ||
            pathname === '/login' ||
            pathname === '/register'
        ){
            return true
        }

        // public
        if(pathname === '/' || pathname.startsWith('/api/videos')){
            return true
        }

        //!! it will return in true or false 
        return !!token
      } 
    },
  },
)

export const config = { 
    matcher: [
        "/",
        "/register",
        "/login"
    ] 
}