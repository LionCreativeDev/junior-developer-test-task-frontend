import React from 'react'

// import Header from './components/header.js';
// import Content from './components/content.js';
// import Footer from './components/footer.js';
import Footer from '../Footer/footer';

import { useNavigate } from "react-router-dom";

function ProductList() {
  let navigate = useNavigate();
  return (
    <>
      {/* <Header/>
      <Content/> */}

      <div className="container mt-5" style={{ borderBottom: "1px solid black" }}>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h3 className="muted mb-0">Product List</h3>
          </div>
          <div className="mb-1">
            <button type="button" className="btn btn-primary mx-2" onClick={() => { navigate('/addproduct') }}>ADD</button>
            <button type="button" id="delete-product-btn" className="btn btn-danger">MASS DELETE</button>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">

          <div className="col-sm-6 col-md-3">
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-2">
                  <input className="form-check-input m-4" type="checkbox" id="check1" name="option1" value="something" />
                </div>
                <div className="col-md-10">
                  <div className="card-body text-center">
                    <p className="card-text mb-0">JVC200123</p>
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
                  <input className="form-check-input m-4" type="checkbox" id="check1" name="option1" value="something" />
                </div>
                <div className="col-md-10">
                  <div className="card-body text-center">
                    <p className="card-text mb-0">JVC200123</p>
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
                  <input className="form-check-input m-4" type="checkbox" id="check1" name="option1" value="something" />
                </div>
                <div className="col-md-10">
                  <div className="card-body text-center">
                    <p className="card-text mb-0">JVC200123</p>
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
                  <input className="form-check-input m-4" type="checkbox" id="check1" name="option1" value="something" />
                </div>
                <div className="col-md-10">
                  <div className="card-body text-center">
                    <p className="card-text mb-0">JVC200123</p>
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
                  <input className="form-check-input m-4" type="checkbox" id="check1" name="option1" value="something" />
                </div>
                <div className="col-md-10">
                  <div className="card-body text-center">
                    <p className="card-text mb-0">GGWP0007</p>
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
                  <input className="form-check-input m-4" type="checkbox" id="check1" name="option1" value="something" />
                </div>
                <div className="col-md-10">
                  <div className="card-body text-center">
                    <p className="card-text mb-0">GGWP0007</p>
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
                  <input className="form-check-input m-4" type="checkbox" id="check1" name="option1" value="something" />
                </div>
                <div className="col-md-10">
                  <div className="card-body text-center">
                    <p className="card-text mb-0">GGWP0007</p>
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
                  <input className="form-check-input m-4" type="checkbox" id="check1" name="option1" value="something" />
                </div>
                <div className="col-md-10">
                  <div className="card-body text-center">
                    <p className="card-text mb-0">GGWP0007</p>
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
                  <input className="form-check-input m-4" type="checkbox" id="check1" name="option1" value="something" />
                </div>
                <div className="col-md-10">
                  <div className="card-body text-center">
                    <p className="card-text mb-0">TR120555</p>
                    <p className="card-text mb-0">Chair</p>
                    <p className="card-text mb-0">40.00 $</p>
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
                  <input className="form-check-input m-4" type="checkbox" id="check1" name="option1" value="something" />
                </div>
                <div className="col-md-10">
                  <div className="card-body text-center">
                    <p className="card-text mb-0">TR120555</p>
                    <p className="card-text mb-0">Chair</p>
                    <p className="card-text mb-0">40.00 $</p>
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
                  <input className="form-check-input m-4" type="checkbox" id="check1" name="option1" value="something" />
                </div>
                <div className="col-md-10">
                  <div className="card-body text-center">
                    <p className="card-text mb-0">TR120555</p>
                    <p className="card-text mb-0">Chair</p>
                    <p className="card-text mb-0">40.00 $</p>
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
                  <input className="form-check-input m-4" type="checkbox" id="check1" name="option1" value="something" />
                </div>
                <div className="col-md-10">
                  <div className="card-body text-center">
                    <p className="card-text mb-0">TR120555</p>
                    <p className="card-text mb-0">Chair</p>
                    <p className="card-text mb-0">40.00 $</p>
                    <p className="card-text mb-0">Dimension: 24x45x15</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  )
}

export default ProductList