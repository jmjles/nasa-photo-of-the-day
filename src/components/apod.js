import React,{useState, useEffect} from 'react';
import Font from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

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
                date: res.data.date,
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
                    background:`url('${item.url}') no-repeat center center fixed`
                }

                const paperStyle = {
                    background:'rgba(0, 0, 0, 0.25)'
                }
                
                return (
                    <div key={item.title} className="Entry">
                        <img src={item.url} className="imgBackground"/>
                        <Paper style={paperStyle}>
                            <Font variant="h1">{item.title}</Font>
                            <Font variant="subtitle1">{item.date}</Font>
                            <Font variant="body1">{item.explanation}</Font>
                            <Font variant="body1">{item.copyright}</Font>
                        </Paper>
                    </div>
                )
            })
        } 
        </section>
    );
}
export default Apod;