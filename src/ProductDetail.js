import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Drawer,
  Button,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  CardActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import axios from "axios";
import ExampleCard from "pages/Presentation/components/ExampleCard";
import { useNavigate } from "react-router-dom";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import defineRoutes from "routes";

import {api} from "API/Api"

const baseUrl = "https://testsattwik.in/";
function ProductDetail({ childName, childImage }) {
  const { product_id } = useParams();
  const [id, name] = product_id.split('-');
  const [product, setProduct] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pincode, setPincode] = useState("");
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [isPincodeAvailable, setIsPincodeAvailable] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState(null);
  const [pincodeId, setPincodeId] = useState(null);
  const [selectedAreaId, setSelectedAreaId] = useState(null);
  const routes = defineRoutes();

  function Quantity({ selectedCardData, pincode, selectedArea }) {
    const navigate = useNavigate();
    const [quantityData, setQuantityData] = useState({
      quantity: 1,
      price: 0,
      quantitys: 0,
    });
  
    const increaseQuantity = () => {
      const newQuantity = quantityData.quantity + 1;
      const factor = quantityData.quantitys / quantityData.quantity;
      const newBagsValue = newQuantity * factor;
      setQuantityData({
        ...quantityData,
        quantity: newQuantity,
        quantitys: newBagsValue,
      });
    };
  
    const decreaseQuantity = () => {
      if (quantityData.quantity > 1) {
        const newQuantity = quantityData.quantity - 1;
        const factor = quantityData.quantitys / quantityData.quantity;
        const newBagsValue = newQuantity * factor;
        setQuantityData({
          ...quantityData,
          quantity: newQuantity,
          quantitys: newBagsValue,
        });
      }
    };

    const increaseQuantity1 = (childId) => {
    const newQuantity = quantityData.quantity + 1;
    const factor = quantityData.quantitys / quantityData.quantity;
    const newBagsValue = newQuantity * factor;

    setQuantityData({
      ...quantityData,
      quantity: newQuantity,
      quantitys: newBagsValue,
    });

    // Update quantitys for the specific child when increasing quantity
    const updatedChildData = childData.map((child) => {
      if (child.id === childId) {
        return {
          ...child,
          quantitys: child.quantitys * newQuantity,
        };
      }
      return child;
    });

    setChildData(updatedChildData);
  };

  const decreaseQuantity1 = (childId) => {
    if (quantityData.quantity > 1) {
      const newQuantity = quantityData.quantity - 1;
      const factor = quantityData.quantitys / quantityData.quantity;
      const newBagsValue = newQuantity * factor;

      setQuantityData({
        ...quantityData,
        quantity: newQuantity,
        quantitys: newBagsValue,
      });

      // Update quantitys for the specific child when decreasing quantity
      const updatedChildData = childData.map((child) => {
        if (child.id === childId) {
          return {
            ...child,
            quantitys: child.quantitys * newQuantity,
          };
        }
        return child;
      });

      setChildData(updatedChildData);
    }
  };
    const [childData, setChildData] = useState([]);
    console.log(selectedCardData)

    useEffect(() => {
      if (id === "5") {
        const childDataArray = [];
  
        selectedCardData.children.forEach((child) => {
          const apiUrlGet = `api/product/get-quantity/${pincode}/${selectedArea}/${selectedCardData.name}/${child.name}/`;
          console.log(apiUrlGet)
  
          api
            .get(apiUrlGet)
            .then((response) => {
              const data = response.data;
              const bagsFactor = data.quantity;
              const bagsValue = bagsFactor * quantityData.quantity;
  
              childDataArray.push({
                childName: child.name,
                price: data.price,
                quantitys: bagsValue,
                image: child.image,
              });
  
              if (childDataArray.length === selectedCardData.children.length) {
                setChildData(childDataArray);
              }
            })
            .catch((error) => {
              console.error("Error:", error);
              setQuantityData({ quantity: 1, price: 0, quantitys: 0 });
            });
        });
      }else {
        const apiUrlGet = `api/product/get-quantity/${pincode}/${selectedArea}/${selectedCardData.singleProduct.name}/${selectedCardData.child.name}/`;
        console.log(apiUrlGet)
        api
        .get(apiUrlGet)
        .then((response) => {
          const data = response.data;
          const bagsFactor = data.quantity; // Get the factor from the response
          const bagsValue = bagsFactor * quantityData.quantity; // Calculate "Bags" value
          setQuantityData({
            ...quantityData,
            price: data.price,
            quantitys: bagsValue,
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          setQuantityData({ quantity: 1, price: 0, quantitys: 0 });
        });
      
      }
    }, [id,selectedCardData, pincode, selectedArea]);

    
    const updatePrice1 = () => {
      const apiUrlPost = "api/product/price-detail-other/";
       
      const childDetails = childData.map((child) => {
        return {
          child: child.childName, // Use the child's name here
          quantity: quantityData.quantity,
        };
      });
      
      const postData = {
        area_id: selectedArea,
        pincode_id: pincode,
        product:selectedCardData.name,
        details: childDetails, // Assign the array of child details
      };
      console.log(postData)
      api
        .post(apiUrlPost, postData)
        .then((response) => {
          console.log("dfhfjfjf",response.data)
          navigate("/product/order", {
            state: {
              responseData:response.data,
              selectedCardDataImage: selectedCardData.image,
            },
          });
          // Optionally, update the price or handle the response
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        });
    };

    const updatePrice = () => {
      const apiUrlPost = "api/product/price-detail-other/";

      const postData = {
        area_id: selectedArea,
        pincode_id: pincode,
        product: selectedCardData.name,
        details: [
          
          {
            child: selectedCardData.child.name,
            quantity: quantityData.quantity,
          },
        
      ],
      };

      api
        .post(apiUrlPost, postData)
        .then((response) => {
          console.log("dfhfjfjf",response.data)
          navigate("/product/order", {
            state: {
              responseData:response.data,
              selectedCardDataImage: selectedCardData.image,
              
            },
          });
          // Optionally, update the price or handle the response
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        });
    };
    const baseUrl = "https://testsattwik.in/"

  
    return (
      <div>
        {id === "5" ? 
          (
            <>
              {childData.map((child) => (
                <div key={child.id}>
                  <img src={`${baseUrl}${child.image}`} alt="Product" width="200" height="150" />
                  <p> Quantity: {quantityData.quantity}</p>
                  <p>Child: {child.childName}</p>
                  <p>Quantitys: {child.quantitys}</p>
                  <button onClick={() => increaseQuantity1(child.id)}>+</button>
                  <button onClick={() => decreaseQuantity1(child.id)}>-</button>
                  <p>Price: {child.price * quantityData.quantity}</p>
                </div>
              ))}
          
              <button onClick={updatePrice1}>update</button>
            </>
          )
            : 
          <>
            <p>Quantity: {quantityData.quantity}</p>
            <p>Bags: {quantityData.quantitys}</p>
            <img src={`${baseUrl}${selectedCardData.image}`} alt="Product" width="200" height="150" />
    
            <button onClick={increaseQuantity}>+</button>
            <button onClick={decreaseQuantity}>-</button>
            <p>Price: {quantityData.price * quantityData.quantity}</p>
            <button onClick={updatePrice}>update</button>
          </>
        }
       
      </div>
    );
            }
  console.log("vbvhvh", pincode.id);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Check if product_id is undefined
        if (id === undefined) {
          // You can fetch child data here if needed
          // Example: const childData = await fetchChildData();
          // setProduct([childData]); // Set child data to product
        } else {
          // Fetch product data
          const response = await api.get(
            `api/product/api/children/${id}/`
          );
          setProduct(response.data);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const fetchPincodeList = async (pincode) => {
    try {
      // Reset areas to an empty array before making the new request
      setAreas([]);

      const response = await api.get("api/product/pincodes/", {
        params: {
          code: pincode,
        },
      });

      if (response.data.length > 0) {
        const pincodeId = response.data[0].id;
        setPincodeId(pincodeId);
        const areasResponse = await api.get(
          `api/product/pincode/${pincodeId}/areas/`
        );
        const areas = areasResponse.data;
        console.log("Available areas:", areas);
        setAreas(areas);
        setIsPincodeAvailable(true);
      } else {
        setIsPincodeAvailable(false);
        setShowErrorDialog(true);
      }
    } catch (error) {
      console.error("Error fetching pincode:", error);
      setIsPincodeAvailable(false);
      setShowErrorDialog(true);
    }
  };

  const handleCloseErrorDialog = () => {
    setShowErrorDialog(false);
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
  };

  const handleSuccessDialog = () => {
    setShowSuccessDialog(true);
  };

  const handleCardClick = (cardData) => {
    if (!pincode) {
      alert("Please enter a pincode");
    } else if (!selectedAreaId) {
      alert("Please select an area before proceeding.");
    } else if (pincode.trim() === "") {
      alert("Please enter a correct pincode");
    } else {
      setSelectedCardData(cardData);
      toggleDrawer(true);
    }
  };
  const handleCardClick1 = (child,singleProduct) => {
    if (!pincode) {
      alert("Please enter a pincode");
    } else if (!selectedAreaId) {
      alert("Please select an area before proceeding.");
    } else if (pincode.trim() === "") {
      alert("Please enter a correct pincode");
    } else {
      setSelectedCardData({child,singleProduct});
      toggleDrawer(true);
    }
  };

  const handleAreaSelection = (areaId) => {
    setSelectedAreaId(areaId);
  };

  const loadMoreItems = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
      setLoading(false);
    }, 1000);
  };

  function Vehicle({ selectedCardData, pincode, selectedArea,product_name }) {
    const [vehicles, setVehicles] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    console.log("jk", selectedCardData.image);
    const navigate = useNavigate();
    const handleNextClick = () => {
      if (vehicles.some((vehicle) => vehicle.count > 0)) {
        handleAddToCart();
        navigate("/product/order", {
          state: {
            responseData,
            selectedCardDataImage: selectedCardData.image,
            product_name
          },
        });
        console.log("hii", selectedCardData.image);
      } else {
        window.alert(
          "Add Vehicles",
          "Please add at least one vehicle before proceeding."
        );
      }
    };

    console.log("dfskjfdsj", selectedCardData, pincode, selectedArea);

    useEffect(() => {
      fetchVehiclesByProduct();
    }, []);

    const fetchVehiclesByProduct = async () => {
      try {
        const response = await api.get(
          `api/product/vehicles/${pincode}/${selectedArea}/${selectedCardData.name}/`
        );
        console.log("fdsjasdjb", response.data);
        const vehiclesWithInitialData = response.data.map((vehicle) => ({
          ...vehicle,
          count: 0,
          price: 0, // Set initial price to 0
        }));
        setVehicles(vehiclesWithInitialData);
      } catch (error) {
        console.log("Error fetching vehicle data:");
      }
    };

    const handleAddToCart = () => {
      console.log("Total Price:", totalPrice);
    };

    const [responseData, setResponseData] = useState({
      details: [], // Initialize as an empty array
      
      total_price: 0,
    });

    const handleIncrement = async (vehicleId) => {
      try {
        const updatedVehicles = vehicles.map((vehicle) => {
          if (vehicle.id === vehicleId) {
            const newCount = vehicle.count + 1;
            return {
              ...vehicle,
              count: newCount,
            };
          }
          return vehicle;
        });

        // Update local state first
        setVehicles(updatedVehicles);

        let totalDetails = [];
        let totalAmount = 0;

        // Loop through updated vehicles and make API calls
        for (const updatedVehicle of updatedVehicles) {
          if (updatedVehicle.count > 0) {
            const payload = {
              pincode_id: pincode,
              area_id: selectedArea,
              vehicles: [
                {
                  vehicle_id: updatedVehicle.id,
                  quantity: updatedVehicle.count,
                },
              ],
              product: selectedCardData.name,
            };

            const response = await api.post(
              "api/product/calculate-price/",
              payload
            );

            if (response.data && response.data.total_price) {
              totalDetails.push(response.data.details[0]); // Store the details
              totalAmount += response.data.details[0].price; // Add price to totalAmount

              // Update vehicles state with API response data
              const updatedVehicleWithPrice = response.data.details[0];
              setVehicles((prevVehicles) =>
                prevVehicles.map((vehicle) =>
                  vehicle.id === updatedVehicleWithPrice.id
                    ? { ...vehicle, price: updatedVehicleWithPrice.price }
                    : vehicle
                )
              );
            } else {
              console.log(response.data);
            }
          }
        }

        // Update responseData with the calculated details and total_price
        setResponseData({
          details: totalDetails,
          total_price: totalAmount,
        });

        // Calculate total price
        const updatedTotalPrice = updatedVehicles.reduce((acc, vehicle) => {
          return acc + vehicle.price * vehicle.count;
        }, 0);
        setTotalPrice(updatedTotalPrice);
      } catch (error) {
        console.error("Error incrementing count:", error);
      }
    };

    const handleDecrement = async (vehicleId) => {
      try {
        const updatedVehicles = vehicles.map((vehicle) => {
          if (vehicle.id === vehicleId) {
            const newCount =
              vehicle.count === 1 ? 0 : Math.max(vehicle.count - 1, 0);
            const newPrice = newCount === 0 ? 0 : vehicle.price; // Set price to 0 if count is 0
            return {
              ...vehicle,
              count: newCount,
              price: newPrice,
            };
          }
          return vehicle;
        });

        // Update local state first
        setVehicles(updatedVehicles);

        for (const updatedVehicle of updatedVehicles) {
          const payload = {
            pincode_id: pincode,
            area_id: selectedArea,
            vehicles: [
              {
                vehicle_id: updatedVehicle.id,
                quantity: updatedVehicle.count,
              },
            ],
            product: selectedCardData.name,
          };

          const response = await api.post(
            "api/product/calculate-price/",
            payload
          );
          setResponseData(response.data);

          if (response.data && response.data.total_price) {
            // Update vehicles state with API response data
            const updatedVehicleWithPrice = response.data.details[0];
            setVehicles((prevVehicles) =>
              prevVehicles.map((vehicle) =>
                vehicle.id === updatedVehicleWithPrice.id
                  ? { ...vehicle, price: updatedVehicleWithPrice.price }
                  : vehicle
              )
            );
          } else {
            console.log(response.data);
          }
        }
      } catch (error) {
        console.error("Error decrementing count:", error);
      }
    };

    return (
      <div>
        <Typography variant="h5" gutterBottom>
          Choose Vehicle:
        </Typography>
        <Grid container spacing={2}>
          {vehicles.map((vehicle) => (
            <Grid item xs={12} key={vehicle.id}>
              <Card
                variant="outlined"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div style={{ display: "flex" }}>
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    width="100"
                    height="100"
                  />
                  <div style={{ flex: 1 }}>
                    <CardContent>
                      <Typography variant="h6">
                        {vehicle.name} (10cm)
                      </Typography>
                      <Typography>Capacity: 90-100cft</Typography>
                      <Typography variant="body2">
                        Get It For: {parseFloat(vehicle.price).toFixed(2)} /-
                      </Typography>
                      <Typography color="primary">
                        Price may vary according to quantity
                      </Typography>
                    </CardContent>
                  </div>
                  <div style={{ flex: 1 }}>
                    <CardActions>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="yellow"
                          onClick={() => handleDecrement(vehicle.id)}
                        >
                          -
                        </Button>
                        <Typography
                          variant="body1"
                          style={{ margin: "0 10px" }}
                        >
                          {vehicle.count}
                        </Typography>
                        <Button
                          variant="contained"
                          color="yellow"
                          onClick={() => handleIncrement(vehicle.id)}
                        >
                          +
                        </Button>
                      </div>
                    </CardActions>
                  </div>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextClick}
          style={{ marginTop: "20px" }}
        >
          Next
        </Button>
      </div>
    );
  }

  return (
    <Container>
      {/* <DefaultNavbar
        routes={routes}
        
        sticky
        
      /> */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            label="Enter Pincode"
            variant="outlined"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
          <Button variant="contained" onClick={() => fetchPincodeList(pincode)}>
            Check Availability
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          {isPincodeAvailable && areas.length > 0 && (
            <div>
              <Typography variant="subtitle1">Select Area:</Typography>
              <Select
                value={selectedAreaId} // Use selectedAreaId here
                onChange={(e) => handleAreaSelection(e.target.value)} // Call handleAreaSelection when the user selects an area
                style={{ width: "100%" }}
              >
                {areas.map((area) => (
                  <MenuItem key={area.id} value={area.id}>
                    {" "}
                    {/* Use area.id as the value */}
                    {area.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          )}
        </Grid>
      </Grid>

      {(id === "1"|| id === "5") ? (
  <Grid container spacing={3}>
    {product.map((singleProduct) => (
      <Grid item xs={12} md={4} key={singleProduct.id}>
        <Card
          onClick={() => handleCardClick(singleProduct)}
          sx={{ cursor: "pointer" }}
        >
          <CardMedia
            component="img"
            height="180"
            image={singleProduct.image}
            alt={singleProduct.name}
          />
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {singleProduct.name}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
) : (
  <Grid container spacing={3}>
    {product.map((singleProduct) => (
      singleProduct.children && singleProduct.children.length > 0 && (
        <Grid container spacing={3} key={singleProduct.id}>
          {singleProduct.children.map((child) => (
            <Grid item xs={12} md={4} key={child.id}>
              <Card
                onClick={() => handleCardClick1(child,singleProduct)}
                sx={{ cursor: "pointer" }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  style={{ width: "100%" }}
                  image={`${baseUrl}${child.image}`}
                  alt={child.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {singleProduct.name} - {child.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ))
    )}
  </Grid>
)
          }

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        {/* Drawer content */}
        <div style={{ width: "600px" }}>
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => toggleDrawer(false)}
            aria-label="close"
            sx={{ position: "absolute", top: "8px", right: "8px" }} // Adjust position
          >
            <CloseIcon />
          </IconButton>
          {id === "1" ? (
  <>
    <Typography variant="h6" gutterBottom>
      Vehicle details
    </Typography>

    <div>
      <Vehicle
        selectedCardData={selectedCardData}
        pincode={pincodeId}
        selectedArea={selectedAreaId}
        product_name={name}
      />
    </div>
  </>
) : (
  <>
    <Typography variant="h6" gutterBottom>
      Quantity details
    </Typography>

    <div>
      <Quantity
        selectedCardData={selectedCardData}
        pincode={pincodeId}
        selectedArea={selectedAreaId}
      />
    </div>
  </>
)}

        </div>
      </Drawer>

      {/* Error Dialog */}
      <Dialog
        open={showErrorDialog}
        onClose={handleCloseErrorDialog}
        aria-labelledby="error-dialog-title"
      >
        <DialogTitle id="error-dialog-title">Pincode Not Available</DialogTitle>
        <DialogContent>
          <Typography>Sorry, the entered pincode is not available.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Dialog */}
      <Dialog
        open={showSuccessDialog}
        onClose={handleCloseSuccessDialog}
        aria-labelledby="success-dialog-title"
      >
        <DialogTitle id="success-dialog-title">Pincode Available</DialogTitle>
        <DialogContent>
          <Typography>The pincode is available.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ProductDetail;
