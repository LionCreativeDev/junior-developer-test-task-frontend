import React, { useState } from 'react'
import axios from 'axios';

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

    const handleFailure = (message) => {
        let errors = message.split("|");
        console.log(errors);

        errors.forEach(error => {
            console.log(error);

            if (error.includes('sku'))
                setInvalidFields(oldInvalidFields => [...oldInvalidFields, "sku"]);

            if (error.includes('name'))
                setInvalidFields(oldInvalidFields => [...oldInvalidFields, "name"]);

            if (error.includes('price'))
                setInvalidFields(oldInvalidFields => [...oldInvalidFields, "price"]);

            if (error.includes('productType')) {
                setInvalidFields(oldInvalidFields => [...oldInvalidFields, "productType"]);
            }
            else {

                if (productType === "Book" && error.includes('weight'))
                    setInvalidFields(oldInvalidFields => [...oldInvalidFields, "weight"]);

                if (productType === "DVD" && error.includes('size'))
                    setInvalidFields(oldInvalidFields => [...oldInvalidFields, "size"]);

                if (productType === "Furniture") {
                    if (error.includes('height'))
                        setInvalidFields(oldInvalidFields => [...oldInvalidFields, "height"]);

                    if (error.includes('width'))
                        setInvalidFields(oldInvalidFields => [...oldInvalidFields, "width"]);

                    if (error.includes('length'))
                        setInvalidFields(oldInvalidFields => [...oldInvalidFields, "length"]);
                }
            }
        })
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

            if (productType === "Book" && (weight === "" || weight === null))
                setInvalidFields(oldInvalidFields => [...oldInvalidFields, "weight"]);

            if (productType === "DVD" && (size === "" || size === null))
                setInvalidFields(oldInvalidFields => [...oldInvalidFields, "size"]);

            if (productType === "Furniture") {
                if (height === "" || height === null)
                    setInvalidFields(oldInvalidFields => [...oldInvalidFields, "height"]);

                if (width === "" || width === null)
                    setInvalidFields(oldInvalidFields => [...oldInvalidFields, "width"]);

                if (length === "" || length === null)
                    setInvalidFields(oldInvalidFields => [...oldInvalidFields, "length"]);
            }
        }

        if (invalidFields.length === 0) {
            let productTypeValue = '';
            if (productType === "Book")
                productTypeValue = weight;
            else if (productType === "DVD")
                productTypeValue = size;
            else if (productType === "Furniture")
                productTypeValue = height + "x" + width + "x" + length;

            axios.get(`${process.env.REACT_APP_API}/add?sku=${sku}&name=${name}&price=${price}&productType=${productType}&productTypeValue=${productTypeValue}`).then((response) => {
                if (response.data.success === "true") {
                    //console.log(response.data);
                    navigate('/');
                }
                else {
                    handleFailure(response.data.message);
                }
            });
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

            <div className="mt-5" style={{ flex: "1 0 auto" }}>
                <div className="col-sm-12 col-md-6">

                    {(invalidFields.length > 0 && invalidFields.includes('main')) && (
                        <div className="alert alert-danger" role="alert">
                            Please, submit required data
                        </div>
                    )}

                    {/* <form id="product_form" action="/action_page.php" onSubmit={handleSubmit} method="post"> */}
                    <form id="product_form">
                        <div className="mb-3 row">
                            <label htmlFor="sku" className="col-sm-4 col-form-label">SKU</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="sku" placeholder="Please provide product SKU" onChange={(e) => setSKU(e.target.value)} />
                                {(invalidFields.length > 0 && invalidFields.includes('sku') && sku.length === 0) && (
                                    <div id="reqSKU" className="form-text">Please provide sku</div>
                                )}
                                {(invalidFields.length > 0 && invalidFields.includes('sku') && sku.length > 0) && (
                                    <div id="reqSKU" className="form-text">Product with this sku already exists</div>
                                )}
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label htmlFor="name" className="col-sm-4 col-form-label">Name</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="name" placeholder="Please provide product name" onChange={(e) => setName(e.target.value)} />
                                {(invalidFields.length > 0 && invalidFields.includes('name')) && (
                                    <div id="reqName" className="form-text">Please provide name</div>
                                )}
                            </div>
                        </div>

                        <div className="mb-5 row">
                            <label htmlFor="price" className="col-sm-4 col-form-label">Price</label>
                            <div className="col-sm-8">
                                <input type="number" className="form-control" id="price" placeholder="Please provide product price" onChange={(e) => setPrice(e.target.value)} />
                                {(invalidFields.length > 0 && invalidFields.includes('price') && price.length === 0) && (
                                    <div id="reqPrice" className="form-text">Please provide price</div>
                                )}
                                {(invalidFields.length > 0 && invalidFields.includes('price') && price.length > 0) && (
                                    <div id="reqPrice" className="form-text">Please provide valid price</div>
                                )}
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label htmlFor="productType" className="col-sm-4 col-form-label">Type Switcher</label>
                            <div className="col-sm-8">
                                <select className="form-select" id="productType" onChange={handleSelectChange}>
                                    <option id="Default">Type Switcher</option>
                                    <option id="Book" value="Book">Book</option>
                                    <option id="DVD" value="DVD">DVD</option>
                                    <option id="Furniture" value="Furniture">Furniture</option>
                                </select>
                                {(invalidFields.length > 0 && invalidFields.includes('productType')) && (
                                    <div id="reqproductType" className="form-text">Please select product type</div>
                                )}
                            </div>
                        </div>

                        {/* {productType === "Book" && ( */}
                        <div className={`option-book ${productType === "Book" ? "show" : "hide"}`}>
                            <div className="mb-2 row">
                                <label htmlFor="weight" className="col-sm-4 col-form-label">Weight (KG)</label>
                                <div className="col-sm-8">
                                    <input type="number" className="form-control" id="weight" placeholder="Please provide book weight!" onChange={(e) => setWeight(e.target.value)} />
                                    <label className="mt-2 text-black fs-6">Please provide weight in KG</label>
                                    {(invalidFields.length > 0 && invalidFields.includes('weight') && weight.length === 0) && (
                                        <div id="reqWeight" className="form-text">Please provide weight</div>
                                    )}
                                    {(invalidFields.length > 0 && invalidFields.includes('weight') && weight.length > 0) && (
                                        <div id="reqWeight" className="form-text">Please provide valid weight</div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* )} */}

                        {/* {productType === "DVD" && ( */}
                        <div className={`option-dvd ${productType === "DVD" ? "show" : "hide"}`}>
                            <div className="mb-2 row">
                                <label htmlFor="size" className="col-sm-4 col-form-label">Size (MB)</label>
                                <div className="col-sm-8">
                                    <input type="number" className="form-control" id="size" placeholder="Please provide div size!" onChange={(e) => setSize(e.target.value)} />
                                    {(invalidFields.length > 0 && invalidFields.includes('size') && size.length === 0) && (
                                        <div id="reqSize" className="form-text">Please provide size</div>
                                    )}
                                    {(invalidFields.length > 0 && invalidFields.includes('size') && size.length > 0) && (
                                        <div id="reqSize" className="form-text">Please provide valid size</div>
                                    )}
                                    <label className="mt-2 text-black fs-6">Please provide disk space in MB</label>
                                </div>
                            </div>
                        </div>
                        {/* )} */}

                        {/* {productType === "Furniture" && ( */}
                        <div className={`option-furniture ${productType === "Furniture" ? "show" : "hide"}`}>
                            <div className="mb-2 row">
                                <label htmlFor="height" className="col-sm-4 col-form-label">Height (CM)</label>
                                <div className="col-sm-8">
                                    <input type="number" className="form-control" id="height" placeholder="Please provide furniture height" onChange={(e) => setHeight(e.target.value)} />
                                    {(invalidFields.length > 0 && invalidFields.includes('height') && height.length === 0) && (
                                        <div id="reqHeight" className="form-text">Please provide height</div>
                                    )}
                                    {(invalidFields.length > 0 && invalidFields.includes('height') && height.length > 0) && (
                                        <div id="reqHeight" className="form-text">Please provide valid height</div>
                                    )}
                                </div>
                            </div>
                            <div className="mb-2 row">
                                <label htmlFor="width" className="col-sm-4 col-form-label">Width (CM)</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" id="width" placeholder="Please provide furniture width" onChange={(e) => setWidth(e.target.value)} />
                                    {(invalidFields.length > 0 && invalidFields.includes('width') && width.length === 0) && (
                                        <div id="reqWidth" className="form-text">Please provide width</div>
                                    )}
                                    {(invalidFields.length > 0 && invalidFields.includes('width') && width.length > 0) && (
                                        <div id="reqWidth" className="form-text">Please provide valid width</div>
                                    )}
                                </div>
                            </div>
                            <div className="mb-2 row">
                                <label htmlFor="length" className="col-sm-4 col-form-label">Length (CM)</label>
                                <div className="col-sm-8">
                                    <input type="number" className="form-control" id="length" placeholder="Please provide furniture length" onChange={(e) => setLength(e.target.value)} />
                                    {(invalidFields.length > 0 && invalidFields.includes('length') && length.length === 0) && (
                                        <div id="reqLength" className="form-text">Please provide lenght</div>
                                    )}
                                    {(invalidFields.length > 0 && invalidFields.includes('length') && length.length > 0) && (
                                        <div id="reqLength" className="form-text">Please provide valid lenght</div>
                                    )}
                                </div>
                            </div>
                            <div className="mb-2 row">
                                <div className="offset-sm-4 col-sm-8">
                                    <label className="mt-2 text-black">Please, provide dimensions</label>
                                </div>
                            </div>
                        </div>
                        {/* )} */}

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