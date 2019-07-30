import React, { Component } from "react";

//Components
import Store from "../../components/store/store";
import SlideProduct from "../../components/slide-product/slide";
import StoreTopFilter from "../../components/store-top-filter/store-top-filter";
import ProductSlide from "../../components/product-slide/product-slide";

//Redux
import { connect } from "react-redux";
import { getProductList } from "../../redux/product/actions";

class HomeContainer extends Component {
  componentDidMount() {
    this.props.getProductList();
  }

  render() {
    console.log("home container props", this.props);
    const currentDate = new Date();
    const year =
      currentDate.getMonth() === 11 && currentDate.getDate() > 23
        ? currentDate.getFullYear() + 1
        : currentDate.getFullYear();
    return (
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <ProductSlide products={this.props.apiProducts} />
            </div>
          </div>
        </div>
        <SlideProduct date={`${year}-07-26T18:00:00`} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    apiProducts: state.product.productList,
    filters: state.product.filters,
    fetchInProgress: state.product.fetchInProgress,
    allCategories: state.category.categories
  };
};

const mapDispatchToProps = {
  getProductList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
