import React, { useEffect } from 'react'
import "./Home.css";
import Product from './Product';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import { useStateValue } from './StateProvider';
import NotFound from "./NotFound";
import axios from "./axios";
import Snackbar from './Snackbar';
import "./components/SearchBox.css"
function Home() {
    const [productInfo, setProductInfo] = useState([]); 
    const [search, setSearch] = useState('');
    const [{category,messages},dispatch] = useStateValue();
    let blocks;
           useEffect(() => {
                async function fetchData() {
                    const req = await axios.get('/products');
                    setProductInfo(req.data)
                }
                fetchData();  
            },[]);
        
            const filteredProducts = productInfo.filter(product => {
                if (category) {
                    return product.category.toLowerCase().includes(category.toLocaleLowerCase())
                } else if (search) {
                    return  product.title.toLowerCase().includes(search.toLocaleLowerCase())
                } else if (!category) {
                    return product
                } else { return product }   
                
            });
          if (!filteredProducts.length) {
              blocks = <NotFound/>
          }
    
    return (
        <div className="home">          
                <div class="search-bar">
                        <div class="container">
                            <div class="sw shadow">
                                <form>
                                    <input type="search" class="search" placeholder="Search..." onChange={e=> setSearch(e.target.value)} /> 
                                </form>
                            </div>
                        </div>
                </div>   
                <div className="home__products">    
                    {blocks} 
                    { 
                    filteredProducts.map(product=>(
                        <Product key={product} title={product.title} price={product.price} image={product.img} rating={product.rating} />           
                       ))
                    }
                </div>
                    {
                        messages.map(item => {
                            return (<Snackbar message={item.msg} open="true" type={item.type} />)
                        })
                    }
        </div>
    )
}

export default Home
