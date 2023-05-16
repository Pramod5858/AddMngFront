import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
//import Table from 'react-bootstrap/Table';

const DetailsList = () => {
    const [details, setDetails] = React.useState([]);

    useEffect(() => {
        getDetails();
    }, [])

    const getDetails = async () => {
        let result = await fetch('https://addmngbackend.onrender.com/showdetails', {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setDetails(result);
    }

    const deleteDetail = async (id) => {
        let result = await fetch(`https://addmngbackend.onrender.com/details/${id}`, {
            method: "delete",
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json()
        if (result) {

            window.alert("Do you want to delete record");
            getDetails();
        }
    }


    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result1 = await fetch(`https://addmngbackend.onrender.com/search/${key}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result1 = await result1.json();


            if (result1) {
                setDetails(result1);
            }
        } else{
            getDetails();
        }
    }

    return (

        <div >
            <h1>Welcome to Address Management Project</h1>
            <input type="text" className="search-product-box" placeholder='Search for any details' onChange={searchHandle} ></input>

            <ul className='list-group list-group-horizontal table table-bordered border-primary'>
                <li className="list-group-item">Sr. No.</li>
                <li className="list-group-item">Name</li>
                <li className="list-group-item">Address</li>
                <li className="list-group-item">City</li>
                <li className="list-group-item">State</li>
                <li className="list-group-item">Pin</li>
                <li className="list-group-item">Operations</li>

            </ul>
            {
               details.length>0 ? details.map((item, index) =>


                    <ul className='list-group list-group-horizontal' key={item._id}>
                        <li className="list-group-item"> {index + 1}</li>
                        <li className="list-group-item"> {item.name}</li>
                        <li className="list-group-item"> {item.address}</li>
                        <li className="list-group-item"> {item.city}</li>
                        <li className="list-group-item"> {item.state}</li>
                        <li className="list-group-item"> {item.pin}</li>

                        <li className="list-group-item"> <button onClick={() => deleteDetail(item._id)}>Delete</button>
                            <Link to={"/update/" + item._id} >Update</Link></li>
                    </ul>





                )
                 : <div><h1>No Result found</h1></div>
            }


        </div >
    )

}

export default DetailsList;