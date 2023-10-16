import React, { useState, useEffect, memo } from 'react';
import { Container,component,Typography, Card, CardContent, CardActions, Button, Grid} from '@mui/material';
import axios from 'axios';
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import defineRoutes from "routes";


const api = axios.create({
    baseURL: 'http://192.168.29.10:8000/', // Replace with your backend API URL
    headers: {
      'Content-Type': 'application/json',
      // Add any other headers you need
    },
  });
  

const Cart = memo(() => {
  const [authToken, setAuthToken] = useState('');
  const [userId, setUserId] = useState('');
  const [customerData, setCustomerData] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const routes = defineRoutes();
  const [token, setToken] = useState(null);
  

  const handleLogOut = () => {
    // Handle the logic to log the user out, remove the token, etc.
    localStorage.removeItem('userToken_access');
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


  const fetchTokens = async () => {
    const tokens = await getTokens();
    if (tokens) {
      setAuthToken(tokens.accessToken);
      setUserId(tokens.userId);
    }
  };

  const fetchCartData = async () => {
    try {
      if (userId) {
        const response = await api.get(`api/order/carts/${userId}/`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        console.log(response.data)
        setCart(response.data);
      }
    } catch (error) {
      console.log('Error fetching customer cart:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  useEffect(() => {
    fetchCartData();
  }, [loading, userId]);





  const renderItem = ({ item }) => {
    return <AddressItem item={item} />;
  };

  return (
    <Container>
         <DefaultNavbar
        routes={routes}
        action={  
            {
              type: "internal",
              route: '/auth', // You can define a logout route
              label: "Log Out",
              color: "yellow",
            }
        }
        sticky
        onClick ={handleLogOut}
      />
      {userId ?
          <Grid container spacing={2}>
            {cart.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                <AddressItem item={item} />
              </Grid>
            ))}
          </Grid>
          :           <Typography>No Cart Items </Typography>

}
        
    </Container>
  );
});


const AddressItem = ({ item }) => {
    const [addressData, setAddressData] = useState([]);
    const [vehicleData, setVehicleData] = useState([]);
  
    const fetchVehicleData = async () => {
      try {
        const response = await api.get(`/api/product/vehicles/${item.id}/`);
        setVehicleData(response.data);
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
      }
    };
  
    useEffect(() => {
      fetchVehicleData();
    }, []);
  
    const fetchAddressData = async () => {
      try {
        const response = await api.get(`api/customer/addresses/${item.address}/`);
        setAddressData(response.data);
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    };
  
    useEffect(() => {
      fetchAddressData();
    }, []);
  
    return (
      <Card>
        <CardContent>
          <Typography variant="h6">Brand Name: {item.product}</Typography>
          <Typography>Medium</Typography>
          <Typography>Quantity: 90cft</Typography>
          <Typography>Total Price: {item.price_data.details[0].price} /-</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Place Order
          </Button>
        </CardActions>
        <CardContent>
          <Typography variant="h6">Estimated Arrival Time</Typography>
          <Grid container alignItems="center">
            <Grid item>
              {/* Add your timer icon here */}
            </Grid>
            <Grid item>
              <Typography>01 hr 40min</Typography>
            </Grid>
          </Grid>
          <Typography>Show more details...</Typography>
          <Typography>
            <Typography variant="h6">Delivery Address:</Typography>
            {addressData.flat_no}, {addressData.address_name}, {addressData.street}, {addressData.state} 751007
          </Typography>
        </CardContent>
      </Card>
    );
  };

export default Cart;