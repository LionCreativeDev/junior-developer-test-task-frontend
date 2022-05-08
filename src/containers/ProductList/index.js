import React, { useState, useEffect } from 'react'
import axios from 'axios';

// import Header from './components/header.js';
// import Content from './components/content.js';
// import Footer from './components/footer.js';
import Footer from '../Footer/footer';

import { useNavigate } from "react-router-dom";

// const products = [
//   {
//     id: 1,
//     sku: "JVC2001231",
//     name: "Acme DISC",
//     price: "1.00",
//     productType: "DVD",
//     productTypeValue: "700",
//   },
//   {
//     id: 2,
//     sku: "JVC2001232",
//     name: "Acme DISC",
//     price: "1.20",
//     productType: "DVD",
//     productTypeValue: "700",
//   },
//   {
//     id: 3,
//     sku: "JVC20012333",
//     name: "Acme DISC",
//     price: "1.30",
//     productType: "DVD",
//     productTypeValue: "700",
//   },
//   {
//     id: 4,
//     sku: "JVC2001234",
//     name: "Acme DISC",
//     price: "1.40",
//     productType: "DVD",
//     productTypeValue: "700",
//   },
//   {
//     id: 5,
//     sku: "GGWP00071",
//     name: "War and Peace 1",
//     price: "20.00",
//     productType: "Book",
//     productTypeValue: "2",
//   },
//   {
//     id: 6,
//     sku: "GGWP00072",
//     name: "War and Peace 2",
//     price: "21.00",
//     productType: "Book",
//     productTypeValue: "2",
//   },
//   {
//     id: 7,
//     sku: "GGWP00073",
//     name: "War and Peace 3",
//     price: "22.00",
//     productType: "Book",
//     productTypeValue: "2",
//   },
//   {
//     id: 8,
//     sku: "GGWP00074",
//     name: "War and Peace 4",
//     price: "23.00",
//     productType: "Book",
//     productTypeValue: "2",
//   },
//   {
//     id: 9,
//     sku: "TR120551",
//     name: "Chair 1",
//     price: "10.00",
//     productType: "Furniture",
//     productTypeValue: "24x45x15",
//   },
//   {
//     id: 10,
//     sku: "TR120552",
//     name: "Chair 2",
//     price: "20.00",
//     productType: "Furniture",
//     productTypeValue: "24x45x15",
//   },
//   {
//     id: 11,
//     sku: "TR120553",
//     name: "Chair 3",
//     price: "30.00",
//     productType: "Furniture",
//     productTypeValue: "24x45x15",
//   },
//   {
//     id: 12,
//     sku: "TR120554",
//     name: "Chair 4",
//     price: "40.00",
//     productType: "Furniture",
//     productTypeValue: "24x45x15",
//   }  
// ];

const solveProductTypeValue = (productType, productTypeValue) => {
  if (productType === "DVD") {
    return `Size: ${productTypeValue} MB`;
  }
  else if (productType === "Book") {
    return `Weight: ${productTypeValue} KG`;
  }
  else if (productType === "Furniture") {
    return `Dimension: ${productTypeValue}`;
  }
}

const ProductList = () => {
  let navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [checkedState, setCheckedState] = useState([]);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/list`).then((response) => {
      setProducts(response.data);
    });
  }, []);

  useEffect(() => {
    setCheckedState(new Array(products.length).fill(false));
  }, [products]);

  // useEffect(() => {
  //   console.log("checkedState", checkedState);
  // }, [checkedState]);

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) => index === position ? !item : item);
    setCheckedState(updatedCheckedState);
  };

  const massDelete = () => {
    //console.log(checkedState);
    const indices = checkedState.reduce(
      (out, bool, index) => bool ? out.concat(products[index].id) : out,
      []
    )
    //console.log(indices);
    //console.log(indices.reverse());    

    var temp = products;
    indices.forEach(currentindex => {
      var index = temp.findIndex(function (o) {
        return o.id === currentindex;
      })

      if (index !== -1)
        temp.splice(index, 1);
    });
    //console.log(temp);
    setProducts(temp);
    //console.log("products", products);
    forceUpdate();
    setCheckedState(new Array(products.length).fill(false));

    // indices.map((currentindex) => {
    //   //console.log("currentindex", currentindex);
    //   var index = products.findIndex(function(o){
    //     return o.id === currentindex;
    //   })

    //   if (index !== -1) 
    //     products.splice(index, 1);
    // })

    axios.get(`${process.env.REACT_APP_API}/delete?id=${indices}`).then((response) => {
      //console.log(indices);
      //console.log(indices.reverse());    

      var temp = products;
      indices.forEach(currentindex => {
        var index = temp.findIndex(function (o) {
          return o.id === currentindex;
        })

        if (index !== -1)
          temp.splice(index, 1);
      });
      //console.log(temp);
      setProducts(temp);
      //console.log("products", products);
      forceUpdate();
      setCheckedState(new Array(products.length).fill(false));

      console.log('Delete Response', response.data);
    });
  };

  return (
    <>
      {/* <Header/>
      <Content/> */}

      <div className="mt-5" style={{ borderBottom: "1px solid black", height: 45, flexShrink: 0 }}>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h3 className="muted mb-0">Product List</h3>
          </div>
          <div className="mb-1">
            <button type="button" className="btn btn-primary mx-2" onClick={() => { navigate('/addproduct') }}>ADD</button>
            <button type="button" id="delete-product-btn" className="btn btn-danger" onClick={massDelete}>MASS DELETE</button>
          </div>
        </div>
      </div>

      <div className="mt-5" style={{ flex: "1 0 auto" }}>
        <div className="row">
          {products.length > 0 ? products.map(({ id, sku, name, price, productType, productTypeValue }, index) =>
            <div className="col-sm-6 col-md-3" key={id}>
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-2">
                    <input className="form-check-input m-4 delete-checkbox" type="checkbox" id={`custom-checkbox-${index}`} value={sku} checked={checkedState[index] || false} onChange={() => handleOnChange(index)} />
                  </div>
                  <div className="col-md-10">
                    <div className="card-body text-center">
                      <p className="card-text mb-0">{sku}</p>
                      <p className="card-text mb-0">{name}</p>
                      <p className="card-text mb-0">{price} $</p>
                      <p className="card-text mb-0">{solveProductTypeValue(productType, productTypeValue)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : ''}

          {/* <div className="col-sm-6 col-md-3">
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-2">
                  <input className="form-check-input m-4 delete-checkbox" type="checkbox" value="JVC2001231" />
                </div>
                <div className="col-md-10">
                  <div className="card-body text-center">
                    <p className="card-text mb-0">JVC2001231</p>
                    <p className="card-text mb-0">Acme DISC</p>
                    <p className="card-text mb-0">1.00 $</p>
                    <p className="card-text mb-0">Size: 700 MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-md-3">
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-2">
                  <input className="form-check-input m-4 delete-checkbox" type="checkbox" value="JVC2001232" />
                </div>
                <div className="col-md-10">
                  <div className="card-body text-center">
                    <p className="card-text mb-0">JVC2001232</p>
                    <p className="card-text mb-0">Acme DISC</p>
                    <p className="card-text mb-0">1.20 $</p>
                    <p className="card-text mb-0">Size: 700 MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-md-3">
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-2">
                  <input className="form-check-input m-4 delete-checkbox" type="checkbox" value="JVC20012333" />
                </div>
                <div className="col-md-10">
                  <div className="card-body text-center">
                    <p className="card-text mb-0">JVC20012333</p>
                    <p className="card-text mb-0">Acme DISC</p>
                    <p className="card-text mb-0">1.30 $</p>
                    <p className="card-text mb-0">Size: 700 MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-md-3">
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-2">
                  <input className="form-check-input m-4 delete-checkbox" type="checkbox" value="JVC2001234" />
                </div>
                <div className="col-md-10">
                  <div className="card-body text-center">
                    <p className="card-text mb-0">JVC2001234</p>
                    <p className="card-text mb-0">Acme DISC</p>
                    <p className="card-text mb-0">1.40 $</p>
                    <p className="card-text mb-0">Size: 700 MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-md-3">
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-2">
                  <input className="form-check-input m-4 delete-checkbox" type="checkbox" value="GGWP00071" />
                </div>
                <div className="col-md-10">
                  <div className="card-body text-center">
                    <p className="card-text mb-0">GGWP00071</p>
                    <p className="card-text mb-0">War and Peace</p>
                    <p className="card-text mb-0">20.00 $</p>
                    <p className="card-text mb-0">Weight: 2KGB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-md-3">
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-2">
                  <input className="form-check-input m-4 delete-checkbox" type="checkbox" value="GGWP00072" />
                </div>
                <div className="col-md-10">
                  <div className="card-body text-center">
                    <p className="card-text mb-0">GGWP00072</p>
                    <p className="card-text mb-0">War and Peace</p>
                    <p className="card-text mb-0">22.00 $</p>
                    <p className="card-text mb-0">Weight: 2KGB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-md-3">
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-2">
                  <input className="form-check-input m-4 delete-checkbox" type="checkbox" value="GGWP00073" />
                </div>
                <div className="col-md-10">
                  <div className="card-body text-center">
                    <p className="card-text mb-0">GGWP00073</p>
                    <p className="card-text mb-0">War and Peace</p>
                    <p className="card-text mb-0">23.00 $</p>
                    <p className="card-text mb-0">Weight: 2KGB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-md-3">
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-2">
                  <input className="form-check-input m-4 delete-checkbox" type="checkbox" value="GGWP00074" />
                </div>
                <div className="col-md-10">
                  <div className="card-body text-center">
                    <p className="card-text mb-0">GGWP00074</p>
                    <p className="card-text mb-0">War and Peace</p>
                    <p className="card-text mb-0">24.00 $</p>
                    <p className="card-text mb-0">Weight: 2KGB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-md-3">
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-2">
                  <input className="form-check-input m-4 delete-checkbox" type="checkbox" value="TR120551" />
                </div>
                <div className="col-md-10">
                  <div className="card-body text-center">
                    <p className="card-text mb-0">TR120551</p>
                    <p className="card-text mb-0">Chair</p>
                    <p className="card-text mb-0">10.00 $</p>
                    <p className="card-text mb-0">Dimension: 24x45x15</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-md-3">
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-2">
                  <input className="form-check-input m-4 delete-checkbox" type="checkbox" value="TR120552" />
                </div>
                <div className="col-md-10">
                  <div className="card-body text-center">
                    <p className="card-text mb-0">TR120552</p>
                    <p className="card-text mb-0">Chair</p>
                    <p className="card-text mb-0">20.00 $</p>
                    <p className="card-text mb-0">Dimension: 24x45x15</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-md-3">
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-2">
                  <input className="form-check-input m-4 delete-checkbox" type="checkbox" value="TR120553" />
                </div>
                <div className="col-md-10">
                  <div className="card-body text-center">
                    <p className="card-text mb-0">TR120553</p>
                    <p className="card-text mb-0">Chair</p>
                    <p className="card-text mb-0">30.00 $</p>
                    <p className="card-text mb-0">Dimension: 24x45x15</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-md-3">
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-2">
                  <input className="form-check-input m-4 delete-checkbox" type="checkbox" value="TR120554" />
                </div>
                <div className="col-md-10">
                  <div className="card-body text-center">
                    <p className="card-text mb-0">TR120554</p>
                    <p className="card-text mb-0">Chair</p>
                    <p className="card-text mb-0">40.00 $</p>
                    <p className="card-text mb-0">Dimension: 24x45x15</p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

        </div>
      </div>

      <Footer />
    </>
  )
}

export default ProductList