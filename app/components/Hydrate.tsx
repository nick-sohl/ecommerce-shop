// React Hydrate ist dafür da, SSR-Generierte Seiten, welche keine Interaktivität beinhalten, mit interaktiven Komponenten im Hintergrund auszustatten (zu hydratisiren) damit diese zum Leben erweckt werden.
// Der User erhält eine statische HTML Seite. vorhandenen HTML-Inhalte auf der Seite und fügt die erforderlichen JavaScript-Funktionalitäten hinzu, um die React-Komponenten zum Leben zu erwecken. Es stellt sicher, dass die anfängliche statische Darstellung der Komponenten durch die dynamische, interaktive Funktionalität ersetzt wird.
// Durch die Verwendung von React Hydrate kannst du also SSR-generierte Komponenten mit Interaktivität ausstatten. Die initial geladene Seite enthält die statischen Inhalte, während React im Hintergrund arbeitet und die Hydration durchführt, um die Interaktivität zu ermöglichen.

// FUTURE
// RESUMABILITY

'use client'

import React, { ReactNode, useEffect, useState } from "react"

// React Node Object ist ein Container, in welchen du Daten einfügen kannst.
// Zum Beipsiel einen Text, Zahl, Boolean etc. Dieses Objekt kannst du dann irgnedwo auf deiner Seite einbauen.
// Hier sagen wir einfach nur, dass Children ein React Node Object ist, sodass es keinen TS-Error gibt.
export default function Hydrate( {children}: {children: ReactNode} ) {

    const [isHydrated, setIsHydrated] = useState(false)

    // wait till Nextjs rehydration completes
    useEffect( () => {
        setIsHydrated(true)
    }, [] )

    return (
        // isHydrated = true > render die Seite. false > zeig Loading...
        <>
            {isHydrated ? <>{children}</> : <div>Loading...</div> }
        </>
    )
}