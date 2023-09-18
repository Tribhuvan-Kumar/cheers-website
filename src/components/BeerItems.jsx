import React from 'react'

const BeerItems = ({ imgUrl, title, desc }) => {
    return (
        <>
            <div className="card my-3" style={{height: '45rem'}}>
                <img src={imgUrl} className="card-img-top my-3" alt="..." style={imgUrl === 'https://images.punkapi.com/v2/keg.png' ? { width: '100%', height: '280px' } : { width: '20%', height: '280px', marginInline: 'auto' }} />
                <div className="card-body my-3">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{desc}</p>
                </div>
            </div>
        </>
    )
}

export default BeerItems