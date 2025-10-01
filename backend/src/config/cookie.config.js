const cookieOptions = {
            httpOnly: false,
            secure : false,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production" ? true : false,
            maxAge: 1000 * 60 * 60 * 5
        } 

export default cookieOptions