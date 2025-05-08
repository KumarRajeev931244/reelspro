'use client'

import { useRouter } from "next/navigation"
import React, { useState } from "react"

export default function Page(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] =  useState('')
    const [error, setError] = useState<string | null>('')

    const router = useRouter()
    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setError("your password does not match")
        }
        try {
            const response = await fetch('/api/auth/register', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password})
            })
            const data = response.json()
            if(!response.ok){
                setError("registratin failed")
            }
            router.push('/login')
        } catch (error) {
            
        }
    }
    return (
        <div>register page</div>
    )
}