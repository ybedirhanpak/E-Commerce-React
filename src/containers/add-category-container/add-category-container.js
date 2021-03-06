import React, { Component } from "react";
import './add-category-container.css';

//Components
import AddCategoryRight from "../../components/add-category-right/add-category-right";
import AddCategoryTop from "../../components/add-category-top/add-category-top";
import AddCategoryLeft from "../../components/add-category-left/add-category-left";

//Redux
import { connect } from "react-redux";

class AddCategoryContainer extends Component {
  constructor() {
    super();
    this.state = {
      parentId1: "",
      parentId2: ""
    };
    this.setSubCategories = this.setSubCategories.bind(this);
    this.clearParents = this.clearParents.bind(this);
  }

  setSubCategories(subType, parentId) {
    if (subType === 1) {
      this.setState({
        parentId1: parentId,
        parentId2: ""
      });
    } else {
      this.setState({
        parentId2: parentId
      });
    }
  }
  clearParents(type) {
    if (type === "both") {
      this.setState({
        parentId1: "",
        parentId2: ""
      });
    } else {
      this.setState({
        parentId2: ""
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 add-category-top">
            <h1>Main Categories</h1>
            <AddCategoryTop
              setSub={this.setSubCategories}
              categoryList={this.props.categories}
              clearParents={this.clearParents}
            />
          </div>
          <div className="col-md-2"></div>
        </div>
        <div className="row">
          <div className="col-md-6 add-category-left">
            <h1>Sub Categories-1</h1>
            <AddCategoryLeft
              setSub={this.setSubCategories}
              allCategories={this.props.categories}
              parentId={this.state.parentId1}
              clearParents={this.clearParents}
            />
          </div>
          <div className="col-md-6 add-category-right">
            <h1>Sub Categories-2</h1>
            <AddCategoryRight
              parentId={this.state.parentId2}
              allCategories={this.props.categories}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.category.categories
  };
};

export default connect(
  mapStateToProps,
  null
)(AddCategoryContainer);
