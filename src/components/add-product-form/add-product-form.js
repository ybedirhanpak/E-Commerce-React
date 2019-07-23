import React from "react";

//Redux
import { connect } from "react-redux";
import { fetchAllCategories } from "../../redux/category/actions";
import { addProduct } from "../../redux/product/actions";

//Components
import MultiSelect from "@khanacademy/react-multi-select";

//Firebase
import * as firebase from "firebase";
import { generateLinkWithName } from "../../services/link-generator";

class AddProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMainCategory: "",
      selectedSecondCategory: "",
      selectedThirdCategory: "",
      selectedSizes: [],
      selectedCities: [],
      selectedBrand: "",
      productName: "",
      description: "",
      price: "",
      oldPrice: "",
      quantity: "",
      imgSource: ""
    };
    this.onChange = this.onChange.bind(this);
    this.selectMainCategory = this.selectMainCategory.bind(this);
    this.selectSecondCategory = this.selectSecondCategory.bind(this);
    this.selectThirdCategory = this.selectThirdCategory.bind(this);
    this.selectBrand = this.selectBrand.bind(this);
    this.addProduct = this.addProduct.bind(this);
  }

  render() {
    let mainCategories = this.props.categories.filter(c => c.parentId === null);
    mainCategories = mainCategories.map(element => (
      <option
        key={element.id}
        id={element.id}
        onClick={this.selectMainCategory}
      >
        {element.name}
      </option>
    ));

    let secondCategories = [];
    if (this.state.selectedMainCategory !== "") {
      secondCategories = this.props.categories.filter(
        c => c.parentId === this.state.selectedMainCategory
      );
    }
    secondCategories = secondCategories.map(element => (
      <option
        key={element.id}
        id={element.id}
        onClick={this.selectSecondCategory}
      >
        {element.name}
      </option>
    ));
    let thirdCategories = [];
    if (this.state.selectedSecondCategory !== "") {
      thirdCategories = this.props.categories.filter(
        c => c.parentId === this.state.selectedSecondCategory
      );
    }

    thirdCategories = thirdCategories.map(element => (
      <option
        key={element.id}
        id={element.id}
        onClick={this.selectThirdCategory}
      >
        {element.name}
      </option>
    ));

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-3" />
          <div className="col-sm-12 col-md-6">
            <label htmlFor="product">Product Image</label>
            <div className="input-group">
              <span className="input-group-addon" id="basic-addon1">
                <i className="fa fa-image" />
              </span>
              <input
                type="file"
                className="form-control"
                aria-describedby="basic-addon1"
                accept="image/png, image/jpeg"
                onChange={event => this.handleFileUpload(event, this.saveUrl)}
              />
            </div>

            {this.state.imgSource !== "" ? (
              <h5 className="alert-heading">
                {`Upload successfull.\n${this.state.imgSource}`}
              </h5>
            ) : null}

            <div className="form-group">
              <label htmlFor="product">Product Name</label>
              <input
                type="text"
                id="product"
                className="form-control"
                placeholder="Product name"
                required
                name="productName"
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                cols="20"
                rows="5"
                className="form-control"
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="string"
                id="price"
                className="form-control"
                placeholder="Product price"
                required
                name="price"
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Old Price</label>
              <input
                type="string"
                id="price"
                className="form-control"
                placeholder="Old price"
                required
                name="oldPrice"
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Quantity</label>
              <input
                type="string"
                id="price"
                className="form-control"
                placeholder="Quantity"
                required
                name="quantity"
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Size</label>
              <MultiSelect
                options={sizes}
                selected={this.state.selectedSizes}
                onSelectedChanged={selectedSizes =>
                  this.setState({ selectedSizes })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Cities</label>
              <MultiSelect
                options={cities}
                selected={this.state.selectedCities}
                onSelectedChanged={selectedCities =>
                  this.setState({ selectedCities })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="select1">Brand</label>
              <select name="category1" className="form-control" multiple>
                <option onClick={this.selectBrand} value="Mavi">
                  Mavi
                </option>
                <option onClick={this.selectBrand} value="J&J">
                  J&J
                </option>
                <option onClick={this.selectBrand} value="H&M">
                  H&M
                </option>
                <option onClick={this.selectBrand} value="LOFT">
                  LOFT
                </option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="select1">Main Category</label>
              <select name="category1" className="form-control" multiple>
                {mainCategories}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="select2">Sub Category</label>
              <select
                multiple
                name="category2"
                className="form-control"
                disabled={this.state.selectedMainCategory === ""}
              >
                {secondCategories}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="select2">Sub Category 2</label>
              <select
                multiple
                name="category3"
                className="form-control"
                disabled={this.state.selectedSecondCategory === ""}
              >
                {thirdCategories}
              </select>
            </div>

            <br />

            <button
              className="btn btn-danger btn-lg btn-block"
              onClick={this.addProduct}
            >
              Add Product
            </button>
            <br />
          </div>
        </div>
      </div>
    );
  }

  selectBrand(event) {
    this.setState({
      selectedBrand: event.target.value
    });
  }
  componentDidMount() {
    if (this.props.categories === null) {
      this.props.fetchAllCategories();
    }
  }
  selectMainCategory(event) {
    const id = event.target.id;
    this.setState({
      selectedMainCategory: id,
      selectedSecondCategory: "",
      selectedThirdCategory: ""
    });
  }

  selectSecondCategory(event) {
    const id = event.target.id;
    this.setState({
      selectedSecondCategory: id,
      selectedThirdCategory: ""
    });
  }

  selectThirdCategory(event) {
    const id = event.target.id;
    this.setState({
      selectedThirdCategory: id
    });
  }

  onChange = event => {
    //debugger;
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  saveUrl = url => {
    this.setState({ imgSource: url });
  };

  handleFileUpload = (event, saveFunc) => {
    //Get file
    const file = event.target.files[0];

    const path = "product_images/" + generateLinkWithName(file.name);
    //Create a storage ref
    var storageRef = firebase.storage().ref(path);

    //Upload file
    var task = storageRef.put(file);

    //Update progress
    task.on(
      "state_changed",
      function progress(snapshot) {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("File upload... ", percentage);
      },
      function error(err) {
        console.log("Error when uploading file", err);
      },
      function complete() {
        console.log("File upload completed on path: ");
        task.snapshot.ref.getDownloadURL().then(url => saveFunc(url));
      }
    );
  };

  addProduct = () => {
    console.log("here");
    let product = {
      name: this.state.productName,
      imgSource: this.state.imgSource,
      discount: String(
        (Number(this.state.oldPrice) - Number(this.state.price)) /
          Number(this.state.oldPrice)
      ),
      isNew: true,
      category: this.state.selectedThirdCategory,
      price: this.state.price,
      oldPrice: this.state.oldPrice,
      description: this.state.description,
      quantity: this.state.quantity,
      sizeOptions: this.state.selectedSizes,
      cityOptions: this.state.selectedCities,
      brand: this.state.selectedBrand,
      stars: 0,
      reviews: []
    };

    this.props.addProduct(product);
  };
}

const mapStateToProps = state => {
  return {
    categories: state.category.categories
  };
};

const mapDispatchToProps = {
  fetchAllCategories,
  addProduct
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProductForm);

const sizes = [
  {
    label: "XSmall",
    value: "XSmall"
  },
  {
    label: "Small",
    value: "Small"
  },
  {
    label: "Medium",
    value: "Medium"
  },
  {
    label: "Large",
    value: "Large"
  },
  {
    label: "XLarge",
    value: "XLarge"
  }
];

const cities = [
  {
    label: "Istanbul",
    value: "Istanbul"
  },
  {
    label: "Hatay",
    value: "Hatay"
  },
  {
    label: "Ankara",
    value: "Ankara"
  },
  {
    label: "Izmir",
    value: "Izmir"
  }
];
