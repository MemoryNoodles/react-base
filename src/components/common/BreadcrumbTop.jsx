
import React from "react";
import { Breadcrumb } from "antd";
import { connect } from "react-redux";
import "./breadcrumb.less"

class BreadcrumbTop extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { breadcrumbTopTextArray } = this.props;
    return (
      <div style={{...this.props.style}}>
        {breadcrumbTopTextArray && breadcrumbTopTextArray.length > 0 ? (
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>位置：</Breadcrumb.Item>
            {breadcrumbTopTextArray.map(item => {
              return <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>;
            })}
          </Breadcrumb>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { breadcrumbTopTextArray } = state;
  return { breadcrumbTopTextArray };
};

export default connect(mapStateToProps)(BreadcrumbTop);
