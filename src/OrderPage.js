import React,{useState,useEffect}from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import defineRoutes from "routes";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField,Grid,Box,Alert } from '@mui/material';

import axios from 'axios';

 
const baseUrl = "http://192.168.29.10:8000/"
const OrderPage = () => {
    const [token, setToken] = useState(null);
    const routes = defineRoutes();
  const location = useLocation();
  const {responseData,selectedCardDataImage,product_name}= location.state
 

  const [address, setAddress] = useState({
    block_name: "",
    flat_no: "",
    district: "",
    land_mark: "",
    pincode: responseData.details[0].pincode_id,
    area: responseData.details[0].area_id,
  });
  
  const [customerData, setCustomerData] = useState(null);
  const [authToken, setAuthToken] = useState('');
  const [userId, setUserId] = useState('');
  const [open, setOpen] = useState(false);
 
console.log("fbbn",userId,authToken)
  const api = axios.create({
    baseURL: 'http://192.168.29.10:8000/', // Replace with your backend API URL
    headers: {
      'Content-Type': 'application/json',
      // Add any other headers you need
    },
  });
 
  const handleLogOut = () => {
    // Handle the logic to log the user out, remove the token, etc.
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setToken(null);
    // You can add any additional logic here.
  };

  const getTokens = () => {
    try {
      const userId = localStorage.getItem('user_id');
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');
      return { userId, accessToken,refreshToken };
    } catch (error) {
      console.error('Failed to retrieve tokens:', error);
      return null;
    }
  };

  const fetchTokens = () => {
    const tokens = getTokens();
    if (tokens) {
      setAuthToken(tokens.accessToken);
      setUserId(tokens.userId);
    }
  };

  console.log("hlo",userId)
  console.log("token",authToken)

  
  const [loading, setLoading] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addresse, setAddresse] = useState([]);
  console.log(addresse)

  useEffect(() => {
    fetchAddresses();
    
  }, [loading]);

  
  const handleSelectAddress = (id) => {
    setSelectedAddressId(id);
  };

  const handleDeleteAddress = (id) => {
    // Handle address deletion here
  };

  const handleUpdateAddress = (id) => {
    setOpen(true);
  };
  
  const fetchAddresses = async () => {
    try {
      const response = await api.get(`api/customer/addresses/${userId}/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      if (response.data) {
        
        setAddresse(response.data); // Update the addresses state
      } else {
        alert("No addresses found");
      }
    } catch (error) {
      console.log("Error fetching addresses:", error);
    }finally {
        setLoading(false);
      }
  };

  const fetchBilling = async () => {
    try {
      const response = await api.get(`api/customer/customers/${userId}/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.data) {
        setName(response.data.name);
        setCompanyName(response.data.company_name);
        setCustomerData(response.data);
      } else {
        alert('No billing address found');
      }
    } catch (error) {
      console.error('Error fetching billing:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('user', userId);
      formData.append('name', name);
      formData.append('company_name', companyName);

      // Add other form fields to formData as needed

      if (customerData) {
        const response = await api.put(`api/customer/customers/${userId}/`, formData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        fetchBilling();
        closeModal();
        console.log('Customer updated:', response.data);
      } else {
        const response = await api.post('api/customer/customers/', formData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        closeModal();
        console.log('Customer created:', response.data);
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);

      if (error.response && error.response.status === 401) {
        console.error('User is unauthorized.');
        // Handle unauthorized error as needed
      }
    }
  };

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  console.log("dfhdfj",responseData)


  const handleAddCart = async () => {
    
      //  if (!selectedAddressId) {
      //   alert("Please select an address before adding to cart.");
      //   return;
      // }
      if(product_name=="Sand"){
        try {
        const cartData = {
          customer:selectedAddressId, // Replace with the appropriate customer ID
          product:product_name,
          price_data: {
            details: responseData.details,
            total_price: responseData.total_price,
          },
          area: responseData.details[0].area_id,
          pincode: responseData.details[0].pincode_id,
          address:selectedAddressId, // Use the selected address ID
        };
        const response = await api.post("api/order/carts/", cartData);
      console.log("Cart added:", response.data);

      // Optionally, navigate back to the CartListScreen
    //   navigation.navigate("Bookings");
    } catch (error) {
      console.log("Error adding cart:");
    }
      }else{
        try {
        const cartData = {
          customer:selectedAddressId, // Replace with the appropriate customer ID
          product:responseData.product_name,
          price_data: {
            details: responseData.details,
            total_price: responseData.total_price,
          },
          area: responseData.details[0].area_id,
          pincode: responseData.details[0].pincode_id,
          address:selectedAddressId, // Use the selected address ID
        };
        const response = await api.post("api/order/carts/", cartData);
      console.log("Cart added:", response.data);

      // Optionally, navigate back to the CartListScreen
    //   navigation.navigate("Bookings");
    } catch (error) {
      console.log("Error adding cart:");
    }
      
  }
    
  };
 

  const selectedAddres = addresse.find((address) => address.id === selectedAddressId);

const handle = () => {
    // Handle adding to cart based on the selected address status
   
      // Render the first view
      return (
        <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddCart}
        >
          ADD TO CART
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddCart}
        >
          ORDER NOW
        </Button>
      </Box>
      )
    } 


  return (
    <>
    <div style={{ position: 'sticky', top: 0, zIndex: 1 }}>
    <DefaultNavbar
        routes={routes}
        action={  
            {
              type: "internal",
              route: '/auth', // You can define a logout route
              label: "Log Out",
              color: "yellow",
              onClick: handleLogOut
            }
        }
        sticky
        
      />
    </div>
    <div style={{  padding: '16px' }}>
    {product_name==="Sand"?  
    <Typography variant="h2" gutterBottom>
        
        {product_name}{responseData.details[0].child}
        
        </Typography>  :
      <Typography variant="h2" gutterBottom>
        
      {responseData.product_name}{responseData.details[0].child}
      
      </Typography>
      }
     
      <CardMedia
        component="img"
        src={`${baseUrl}${selectedCardDataImage}`}
        alt="Selected Card Image"
        sx={{ width: 200, height: 200 }}
      />

      {responseData.details.map((item, index) => (
        <Card key={index} sx={{ display: 'flex', flexDirection: 'row', margin: '16px' }}>
          <CardMedia
            component="img"
            src={item.image}
            alt={item.name}
            sx={{ width: 200, height: 200 }}
          />
          <CardContent>
            <Typography variant="h4" component="div">
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: {item.price}
            </Typography>
          </CardContent>
        </Card>
      ))}
      <Typography variant="h2" gutterBottom>
        Total Price: {responseData.total_price}
      </Typography>
      <div>
     
        <Button variant="contained" onClick={openModal}>
          Create Address
        </Button>
    
        <Dialog open={open} onClose={closeModal}>
  <DialogTitle> Create Address</DialogTitle>
  <DialogContent>
    {/* Add other form fields here */}
    <TextField label="Flat No" value={address.flat_no} onChange={(e) => setAddress({ ...address, flat_no: e.target.value })} fullWidth />
    <TextField label="Block Name" value={address.block_name} onChange={(e) => setAddress({ ...address, block_name: e.target.value })} fullWidth />
    <TextField label="Landmark" value={address.land_mark} onChange={(e) => setAddress({ ...address, land_mark: e.target.value })} fullWidth />
    <TextField label="District" value={address.district} onChange={(e) => setAddress({ ...address, district: e.target.value })} fullWidth />
    <Typography variant="body2" color="text.secondary">
              Pincode: {address.pincode}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Area: {address.area}
            </Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={closeModal}>Cancel</Button>
    <Button onClick={handleSubmit}>Submit</Button>
  </DialogActions>
</Dialog>

    </div>
    {loading ? (
      <Typography>Loading...</Typography>
    ) : addresse.length === 0 ? (
        <Typography>No Delivery Addresses Found.</Typography>
      ) : (
        <Grid container spacing={2}>
          { addresse
        .filter((address) => parseInt(responseData.details[0].pincode_id) === parseInt(address.pincode))
            .map((address, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card variant="outlined" onClick={() => handleSelectAddress(address.id)} sx={{ cursor: 'pointer' }}>
                  <CardContent>
                    <Typography>Status: {address.status}</Typography>
                    <Typography>Customer: {address.plot_name}</Typography>
                    <Typography>Address: {address.block_name}</Typography>
                    <Typography>Flat No: {address.flat_no}</Typography>
                    <Typography>Street: {address.district}</Typography>
                    <Typography>Landmark: {address.land_mark}</Typography>
                    <Typography>Mobile: {address.pincode}</Typography>
                    <Typography>Email: {address.area}</Typography>
                  </CardContent>
                  <div>
                    
                    <Button onClick={() => handleUpdateAddress(address.id)} variant="contained" color="secondary">
                      Update
                    </Button>
                    <Button onClick={() => handleDeleteAddress(address.id)} variant="outlined" color="error">
                      Delete
                    </Button>
                  </div>
                </Card>
              </Grid>
            ))}
        </Grid>
      )}
      {handle()}
    </div>
  </>

   
  );
};

export default OrderPage;
