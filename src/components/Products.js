 import  { useEffect, useState } from 'react';

 
 function Products ()  {

    const [data, setData] = useState([]);

    useEffect(() => {

        const apiURL = 'https://fakestoreapi.com/products';

        fetch(apiURL)
        .then (res=>res.json())
        .then (data => {
            setData(data);
            console.log(data)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
        }, []);


    return (
        <>

        <table>
            <thead>

                <tr><th>Id</th><th>Title</th><th>Photo</th><th>Price</th><th>Rating</th></tr>
            </thead>
            <tbody>

                {

                data.map(product => (
                    
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.title}</td>
                        <td>
                                <img
                                    src={product.image}
                                    alt='Product'
                                    width="100"
                                    height="100"
                                />
                        </td>
                        <td>Image</td>
                        <td>{product.price}</td>
                        <td>{product.rating.rate}</td>
                    </tr>)
                    
                )}

            </tbody>
        </table>
        </>
    )
 }

 export default Products;