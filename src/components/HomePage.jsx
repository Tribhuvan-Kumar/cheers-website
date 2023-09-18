import React, { useState, useEffect } from 'react';
import BeerItems from './BeerItems';


import '../style/homePage.css';
import { TextField } from '@mui/material';



const HomePage = () => {
    const [beerData, setBeerData] = useState([]);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBeerData, setFilteredBeerData] = useState([]);

    
    
    let perPage = 78;
    
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`
                );

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setBeerData(data);
                window.scrollTo(0, 0);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [page, perPage]);


    useEffect(() => {
        const filteredData = beerData.filter((element) => element.name.toLowerCase().includes(searchQuery.toLowerCase()));

        setFilteredBeerData(filteredData);
    }, [beerData, searchQuery]);


    let handlePreviousBtn = () => {
        setPage(page - 1);
    };
    let handleNextBtn = () => {
        setPage(page + 1);
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <>
            <div className="container my-5">
                <form className="d-flex mb-3">
                    <TextField className="form-control me-2" type="search" id="outlined-basic" label="Search" variant="outlined" onChange={handleInputChange} />
                </form>
                <div className="row" id='row-items-here'>
                    {!filteredBeerData ? beerData.map((element) => (
                        <div className="col-md-4 each-items" key={element.id}>
                            <BeerItems
                                title={element.name}
                                desc={element.description}
                                imgUrl={element.image_url ? element.image_url : 'https://images.punkapi.com/v2/keg.png'}
                            />
                        </div>
                    )) :
                        filteredBeerData.map((element) => (
                            <div className="col-md-4 each-items" key={element.id}>
                                <BeerItems
                                    title={element.name}
                                    desc={element.description}
                                    imgUrl={element.image_url ? element.image_url : 'https://images.punkapi.com/v2/keg.png'}
                                />
                            </div>
                        ))}
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-between my-5">
                    <button disabled={page <= 1} className="btn btn-primary me-md-2" type="button" onClick={handlePreviousBtn}>&larr; Previous</button>
                    <button disabled={page >= 5} className="btn btn-primary" type="button" onClick={handleNextBtn}>Next &rarr; </button>
                </div>
            </div >
        </>
    )
}

export default HomePage
