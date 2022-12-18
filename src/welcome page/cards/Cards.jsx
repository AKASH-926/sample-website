import React from 'react'
import "../cards/cards.css"
export default function
    (props) {
    return (
        <div id="card-box">
            <h3>{props.head}</h3>
            <p>{props.para}</p>
        </div>
    )
}
