'use client'
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

export default  function Header(){
    const {data: session} = useSession()
    const handleSignOut = async() => {
        try {
            await signOut()
        } catch (error) {
            console.log("failed to signout", error)
        }
    }
    return(
        <div>
            <button onClick={handleSignOut}>signOut</button>
            {session ? (
                <div>welcome</div>
            ) : (
                <div>
                    <Link href='/login'>Login</Link>
                    <Link href='/register'>Register</Link>
                </div>
            )}
        </div>
    )
}