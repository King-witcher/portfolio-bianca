import { useEffect, useRef } from 'react'
import Experience from './Experience'
import { Diver } from './styles'
import './styles.css'

const Root = () => {

    const rootRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!rootRef.current)
            return

        const experience = new Experience(rootRef.current, 'models/colar.glb', 0.3)
        experience.start()
    }, [])

    return (<>
        <Diver ref={rootRef} />
    </>)
}
 
export default Root