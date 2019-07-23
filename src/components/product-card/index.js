import React from "react";
import "./style.css";

//Route
import { Link } from "react-router-dom";

//Redux
import { connect } from "react-redux";
import { actionCreators } from '../../redux/cart/actions'

//Components
import Image from "react-image-resizer";

//"./img/product01.png"

class ProductCard extends React.Component {
  
  createAverageOfStar = () => {
    let children = []
    let div = []

    for (let i = 0; i < this.props.product.stars; i++) {
      children.push(<i className="fa fa-star" />)
    }
    for (let j = this.props.product.stars; j < 5; j++) {
      children.push(<i className="fa fa-star-o" />)
    }
    div.push(<div className="product-rating">
      {children}
    </div>)
  console.log(this.props.product.stars)
    return div

  }
  
  handleAddtoChart = () => {
    this.props.addtoCART({
      id:this.props.product.id,
      img:this.props.product.imgSource,
      name:this.props.product.name,
      rawPrice: this.props.product.price,
      quantity:1,
      price:this.props.product.price ,
      oldPrice:this.props.product.oldPrice 
    });
  }

  findCategoryName = (categoryId) => {
    const category = this.props.allCategories.filter(x => x.id === categoryId)[0];
    if (category !== undefined) {
      return category.name;
    } else {
      return 'Loading...'
    }
  }

  generatePath = () => {
    const _subcategory = this.props.allCategories.filter(x => x.id === this.props.product.category)[0];

    const _subheader = (_subcategory !== undefined) ? 
      (this.props.allCategories.filter(x => x.id === _subcategory.parentId)[0]) : (undefined) ;

    const _mainCategory = (_subheader !== undefined) ? 
    (this.props.allCategories.filter(x => x.id === _subheader.parentId)[0]) : (undefined);

    if(_mainCategory !== undefined)
      return `/show/${_mainCategory.path}/${_subheader.path}/${_subcategory.path}/${this.props.product.id}`;
    else
      return '/error'
  }

  render() {
    const product = this.props.product;
    return (
      <div>
        <div className="product">
          <div className="product-img">
            <Image width={240} height={240} src={product.imgSource} alt="" />
            <div className="product-label">
              {product.discount && (
                <span className="sale">-{product.discount}</span>
              )}
              {product.new && (
                <span className="new">{product.new && "NEW"}</span>
              )}
            </div>
          </div>
          <div className="product-body">
            {/* Category */}
            <p className="product-category">{this.findCategoryName(product.category)}</p>
            {/* Name */}
            <h3 className="product-name">
              <Link
                to={{
                  pathname: this.generatePath(),
                  state: { id: product.id }
                }}
              >
                {product.name}
              </Link>
            </h3>
            {/* Price */}
            <h4 className="product-price">
              {'$'+ product.price}
              <del className="product-old-price">
                {'$'+ product.oldPrice}
              </del>
            </h4>
            {/* Rating */}
            {this.createAverageOfStar()}
            {this.props.product.stars}
            {/* Buttons */}
            <div className="product-btns">
              <button className="add-to-wishlist">
                <i className="fa fa-heart-o" />
                <span className="tooltipp">add to wishlist</span>
              </button>
              <button className="add-to-compare">
                <i className="fa fa-exchange" />
                <span className="tooltipp">add to compare</span>
              </button>
              <button className="quick-view">
                <i className="fa fa-eye" />
                <span className="tooltipp">quick view</span>
              </button>
            </div>
          </div>
          {/* Add to cart */}
          <div className="add-to-cart">
            <button className="add-to-cart-btn" onClick={this.handleAddtoChart}>
              <i className="fa fa-shopping-cart" /> add to cart
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allCategories: state.category.categories
  }
}

const mapDispatchToProps = {
  addtoCART: actionCreators.addtoCART
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCard);