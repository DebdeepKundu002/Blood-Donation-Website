import { useState, useEffect } from "react"
// import Showdataintable from "./Showdataintable"
// import { Navigate, useNavigate } from 'react-router-dom';
import './App.css'

function Usersearch() {

    const [alldonors, setAlldonors] = useState([])
    const [address, setAddress] = useState([])
    const [bloodgroup, setBloodgroup] = useState([])

    // const navigate = useNavigate();

    const getData = async () => {
        const response = await fetch('http://localhost:5000/user/getAllUser');
        const data = await response.json();
        setAlldonors(data)
    }

    //ei part ta korchilam
    


    //searchbybloodgroup
    const searchbybloodgrouporaddress = async (value) => {
        setAddress(value)

        if (value === null || value === "" || value==="a") {
            getData()
        }

        else {

            const byaddressandblood = {
                "bloodgrouporaddress": value
            }

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(byaddressandblood)
            };

            const response = await fetch('http://localhost:5000/user/searchbybloodgrouporaddress', requestOptions)
            const data1 = await response.json();

            // Filter results to match the exact blood group if necessary
            // const exactMatches = data1.filter(donor => donor.bloodgroup === value || donor.address.includes(value));
            const filteredDonors = data1.filter(donor => {
                const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
                if (bloodGroups.includes(value)) {
                    // Exact match for blood group
                    return donor.bloodgroup === value;
                } else {
                    // Case-insensitive match for address
                    return donor.address.toLowerCase().includes(value.toLowerCase());
                }
            });
            setAlldonors(filteredDonors)
        }
    }



    //ei part ta korchilam
    // for blood group
    // const searchbybloodgroup = async (value) => {
    //     if (value === null || value === "" || value ==="a") {
    //         getData()
    //     }

    //     else {

    //         const response = await fetch(`http://localhost:5000/user/searchbybloodgrouporaddress/${value}`);
    //         const data1 = await response.json();
    //         setAlldonors(data1)
    //         console.log(data1);
    //     }
    // }
    //for location
    // const searchbylocation = async(value) =>{
    //     if(value === null || value === "")
    //     {
    //       getData()
    //     }
    //     else
    //     {
    //       const response =await   fetch(`http://localhost:5000/user/searchbyaddress/${value}`);
    //       const data1 = await response.json()
    //       setAlldonors(data1)
    //       console.log(data1);
    //     }
    //   }


    useEffect(() => {
        getData()
    }, [])


    return (
        <>

            <h2 className="h1search"><b>Online Blood Donation</b></h2>

            <table className="tablesearch">

                <tr>
                    <th className="tableheadsearch">Search User</th>
                </tr>

                <tr>
                    <td style={{ color: 'blue' }} ><b>Select Blood Group</b></td> <td> <select onChange={(e) => searchbybloodgrouporaddress(e.target.value)} name="" id="" title="Blood Group" className="bloodgroup">

                        <option value="a">Select your bloodgroup</option>
                        <option >A-</option>
                        <option >A+</option>
                        <option >B+</option>
                        <option >B-</option>
                        <option >o+</option>
                        <option >o-</option>

                    </select>

                    </td>
                </tr>
                <br></br>
                <tr>
                    <td style={{ color: 'blue' }}><b>Enter Your Location</b>  </td> <td> <input onKeyUp={(e) => searchbybloodgrouporaddress(e.target.value)} type="search" placeholder="Enter Location" className="" />
                        {/* <td>Enter Your blood group:  <input onChange={(e) => search(e.target.value)} type="search" placeholder="Enter blood group" /> */}
                    </td>
                </tr>
                <br></br>

                {/* <button className="btnone" onClick={(e) => search()}> Search </button> */}

                {/* <form >
                    <input type="search" placeholder="Search" aria-label="Search" onChange={(e) => Search(e.target.value)} />

                </form> */}


            </table>

            <br></br>

            {/* <h1 className="donorslistname" >Donor's List</h1> */}
            <h2><b>User's List</b></h2>


            <table class="table" style={{ marginLeft: '0px', marginTop: '-2px', marginBottom: '25%' }}>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Password</th>
                        <th scope="col">Address</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Bloodgroup</th>
                        {/* <th scope="col">Action</th> */}
                    </tr>
                </thead>
                <tbody >
                    {
                        alldonors.map((data, index) =>

                            <tr >

                                <th scope="row" class="table-secondary">{index + 1}</th>

                                <td class="table-primary" >{data.name}</td>

                                <td class="table-warning" >{data.email}</td>

                                <td class="table-success">{data.password}</td>

                                <td class="table-danger">{data.address}</td>

                                <td class="table-warning">{data.contact}</td>

                                <td class="table-info">{data.bloodgroup}</td>

                            </tr>

                        )
                    }

                </tbody>

            </table>


        </>
    )
}

export default Usersearch;
