import React,{useState, useEffect} from 'react';
const axios = require('axios');
const dates = ['2019-11-06', '2019-11-04', '2019-11-03', '2019-11-02'];

function Apod() {

    const [data,setData] = useState([])

    useEffect(() => {
        dates.forEach(async (date) => {
            const res = await axios.get('https://api.nasa.gov/planetary/apod', {
                params: {
                    api_key: 'gxNKrjjBqctpiFHKR155b8Nim43I1VDRcG2ytPcS',
                    date,
                    hd: true
                }
            });
            setData(prev => ([...prev,{
                title:res.data.title,
                url:res.data.hdurl,
                copyright:res.data.copyright,
                explanation:res.data.explanation
            }]));
        })
    }, [])
    return(
        <section>
        {
            data.map(item =>{
                const style = {
                    backgroundImage:`url('${item.url}')`
                }
                return (
                    <div key={item.title} className="Entry" style={style}>
                        <h1>{item.title}</h1>
                        <p>{item.explanation}</p>
                        <p>{item.copyright}</p>
                    </div>
                )
            })
        } 
        </section>
    );
}
export default Apod;