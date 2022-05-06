import React, { useState } from 'react'

//import Header from './components/header.js';
//import Content from './components/content.js';
//import Footer from './components/footer.js';
import Footer from '../Footer/footer';

import { useNavigate } from "react-router-dom";

import './style.css';

const AddProduct = () => {
    let navigate = useNavigate();

    const [invalidFields, setInvalidFields] = useState([]);

    const [sku, setSKU] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [productType, setProductType] = useState('');
    const [weight, setWeight] = useState('');
    const [size, setSize] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [length, setLength] = useState('');

    const handleSelectChange = (event) => {
        if (event.target.value === 'Type Switcher')
            setProductType('');
        else
            setProductType(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setInvalidFields([]);
        //console.log("submit clicked");

        if ((sku === "" || sku == null) && (name === "" || name == null) && (price === "" || price == null) && (productType === "" || productType == null)) {
            setInvalidFields(oldInvalidFields => [...oldInvalidFields, "main"]);
            return;
        }

        if (sku === "" || sku == null)
            setInvalidFields(oldInvalidFields => [...oldInvalidFields, "sku"]);

        if (name === "" || name == null)
            setInvalidFields(oldInvalidFields => [...oldInvalidFields, "name"]);

        if (price === "" || price == null)
            setInvalidFields(oldInvalidFields => [...oldInvalidFields, "price"]);

        if (productType === "" || productType == null) {
            setInvalidFields(oldInvalidFields => [...oldInvalidFields, "productType"]);
        }
        else {

            if (productType === "book" && (weight === "" || weight === null))
                setInvalidFields(oldInvalidFields => [...oldInvalidFields, "weight"]);

            if (productType === "dvd" && (size === "" || size === null))
                setInvalidFields(oldInvalidFields => [...oldInvalidFields, "size"]);

            if (productType === "furniture") {
                if (height === "" || height === null)
                    setInvalidFields(oldInvalidFields => [...oldInvalidFields, "height"]);

                if (width === "" || width === null)
                    setInvalidFields(oldInvalidFields => [...oldInvalidFields, "width"]);

                if (length === "" || length === null)
                    setInvalidFields(oldInvalidFields => [...oldInvalidFields, "length"]);
            }
        }
    }

    return (
        <>
            <div className="mt-5" style={{ borderBottom: "1px solid black", height: 45, flexShrink: 0 }}>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h3 className="muted mb-0">Product Add</h3>
                    </div>
                    <div className="mb-1">
                        {/* <button type="submit" className="btn btn-success mx-2" form="product_form">Save</button> */}
                        <button type="button" className="btn btn-success mx-2" onClick={handleSubmit}>Save</button>
                        <button type="button" id="cancel-btn" className="btn btn-danger" onClick={() => { navigate(-1) }}>Cancel</button>
                    </div>
                </div>
            </div>

            <div className="mt-5" style={{flex: "1 0 auto"}}>
                <div className="col-sm-12 col-md-6">

                    {(invalidFields.length > 0 && invalidFields.includes('main')) && (
                        <div className="alert alert-danger" role="alert">
                            Please, submit required data
                        </div>
                    )}

                    {/* <form id="product_form" action="/action_page.php" onSubmit={handleSubmit} method="post"> */}
                    <form id="product_form">
                        <div className="mb-2 row">
                            <label htmlFor="sku" className="col-sm-4 col-form-label">SKU</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="sku" placeholder="Please provide product SKU" onChange={newSKU => setSKU(newSKU)} />
                                {(invalidFields.length > 0 && invalidFields.includes('sku')) && (
                                    <div id="reqSKU" className="form-text">Please provide sku</div>
                                )}
                            </div>
                        </div>

                        <div className="mb-2 row">
                            <label htmlFor="name" className="col-sm-4 col-form-label">Name</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="name" placeholder="Please provide product name" onChange={newName => setName(newName)} />
                                {(invalidFields.length > 0 && invalidFields.includes('name')) && (
                                    <div id="reqName" className="form-text">Please provide name</div>
                                )}
                            </div>
                        </div>

                        <div className="mb-2 row">
                            <label htmlFor="price" className="col-sm-4 col-form-label">Price</label>
                            <div className="col-sm-8">
                                <input type="number" className="form-control" id="price" placeholder="Please provide product price" onChange={newPrice => setPrice(newPrice)} />
                                {(invalidFields.length > 0 && invalidFields.includes('price')) && (
                                    <div id="reqPrice" className="form-text">Please provide price</div>
                                )}
                            </div>
                        </div>

                        <div className="mb-2 row">
                            <label htmlFor="productType" className="col-sm-4 col-form-label">Type Switcher</label>
                            <div className="col-sm-8">
                                <select className="form-select" id="productType" onChange={handleSelectChange}>
                                    <option id="Default">Type Switcher</option>
                                    <option id="Book" value="book">Book</option>
                                    <option id="DVD" value="dvd">DVD</option>
                                    <option id="Furniture" value="furniture">Furniture</option>
                                </select>
                                {(invalidFields.length > 0 && invalidFields.includes('productType')) && (
                                    <div id="reqproductType" className="form-text">Please select product type</div>
                                )}
                            </div>
                        </div>

                        {productType === "book" && (
                            <div className="option-book">
                                <div className="mb-2 row">
                                    <label htmlFor="weight" className="col-sm-4 col-form-label">Weight (KG)</label>
                                    <div className="col-sm-8">
                                        <input type="number" className="form-control" id="weight" placeholder="Please provide book weight!" onChange={newWeight => setWeight(newWeight)} />
                                        {(invalidFields.length > 0 && invalidFields.includes('weight')) && (
                                            <div id="reqWeight" className="form-text">Please provide weight</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {productType === "dvd" && (
                            <div className="option-dvd">
                                <div className="mb-2 row">
                                    <label htmlFor="size" className="col-sm-4 col-form-label">Size (MB)</label>
                                    <div className="col-sm-8">
                                        <input type="number" className="form-control" id="size" placeholder="Please provide div size!" onChange={newSize => setSize(newSize)} />
                                        {(invalidFields.length > 0 && invalidFields.includes('size')) && (
                                            <div id="reqSize" className="form-text">Please provide size</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {productType === "furniture" && (
                            <div className="option-furniture">
                                <div className="mb-2 row">
                                    <label htmlFor="height" className="col-sm-4 col-form-label">Height (CM)</label>
                                    <div className="col-sm-8">
                                        <input type="number" className="form-control" id="height" placeholder="Please provide furniture height" onChange={newHeight => setHeight(newHeight)} />
                                        {(invalidFields.length > 0 && invalidFields.includes('height')) && (
                                            <div id="reqHeight" className="form-text">Please provide height</div>
                                        )}
                                    </div>
                                </div>
                                <div className="mb-2 row">
                                    <label htmlFor="width" className="col-sm-4 col-form-label">Width (CM)</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="width" placeholder="Please provide furniture width" onChange={newWidth => setWidth(newWidth)} />
                                        {(invalidFields.length > 0 && invalidFields.includes('width')) && (
                                            <div id="reqWidth" className="form-text">Please provide width</div>
                                        )}
                                    </div>
                                </div>
                                <div className="mb-2 row">
                                    <label htmlFor="length" className="col-sm-4 col-form-label">Length (CM)</label>
                                    <div className="col-sm-8">
                                        <input type="number" className="form-control" id="length" placeholder="Please provide furniture length" onChange={newLength => setLength(newLength)} />
                                        {(invalidFields.length > 0 && invalidFields.includes('length')) && (
                                            <div id="reqLength" className="form-text">Please provide lenght</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                    </form>
                </div>
            </div>

            {/* <Header />
      <Content /> */}
            <Footer />
        </>
    )
}

export default AddProduct