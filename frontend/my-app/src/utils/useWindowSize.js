import { useState, useEffect } from "react"

export const useWindowSize = () => {
    const [size, setSize] = useState([window.innerHeight, window.innerWidth])

    useEffect(() => {
        const updateSize = () => {
            setSize([window.innerWidth, window.innerHeight])
        }

        window.addEventListener('resize', updateSize)

        return () => window.removeEventListener('resize', updateSize)
    }, [])

    return {
        width: size[0],
        height: size[1]
    }
}