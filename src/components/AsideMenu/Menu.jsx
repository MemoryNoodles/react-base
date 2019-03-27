/**
 * @component  topNav
 * 页面左侧的菜单组件
 * */
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import api from "~/until/api";
import { NAV_KEY_TEXT, QUERY } from "~/constants/const";
import { breadcrumbTopText } from "~/action/breadcrumbTopText";
import { Layout, Menu, Icon, Drawer } from "antd";
import Logo from "~/layouts/image/logo.png";
import Style from "./menu.module.less";
const SubMenu = Menu.SubMenu;

class AsideMenu extends React.Component {
    constructor(props) {
        super(props);
        const breadcrumbTopTextArray = sessionStorage.getItem(
            "breadcrumbTopTextArray"
        );
        this.state = {
            collapsed: true, //菜单是否收缩：true:收缩 false:展开
            curScreen: "",
            menuList: [],
            current: breadcrumbTopTextArray
                ? JSON.parse(breadcrumbTopTextArray)[
                      JSON.parse(breadcrumbTopTextArray).length - 1
                  ]
                : "",
            openKeys: breadcrumbTopTextArray
                ? [JSON.parse(breadcrumbTopTextArray)[0]]
                : []
        };
        this.rootSubmenuKeys = [];
        const { getInstance } = props; //获取父组件的 getInstance
        if (typeof getInstance === "function") {
            getInstance(this); // 在这里把this暴露给父组件
        }
    }

    static getDerivedStateFromProps = (props, prevState) => {
        const { curScreen } = props;
        // console.log(props,"props",prevState,"prevState")

        if (curScreen !== prevState.curScreen) {
            switch (curScreen) {
                case "mobile":
                    return {
                        collapsed: true, //收缩菜单
                        curScreen
                    };
                case "sm-screen":
                    return {
                        collapsed: true, //收缩菜单
                        curScreen
                    };
                case "big-screen":
                    return {
                        collapsed: false, //收缩菜单
                        curScreen
                    };
            }
        }
    };

    componentDidMount() {
        api.queryMenu().then(res => {
            this.setState({
                menuList: res.content.menuInfo || []
            });
            sessionStorage.setItem(
                "forbiddenPath",
                JSON.stringify(res.content.forbiddenPath)
            );
        });
    }

    handleClick = e => {
        this.setState({
            current: e.key,
            openKeys: [e.keyPath[0]]
        });
        const { dispatch } = this.props;
        const { keyPath } = e;
        let breadcrumbTopTextArray = keyPath.reverse().map(item => {
            return item;
        });
        sessionStorage.setItem(
            "breadcrumbTopTextArray",
            JSON.stringify(breadcrumbTopTextArray)
        );
        dispatch(breadcrumbTopText(breadcrumbTopTextArray));
    };

    getMenuList = () => {
        // window.location.hash="/Dashboard/Workbench";
        const { menuList = [] } = this.state;
        return menuList.map(item => {
            this.rootSubmenuKeys.push(item.Level1);
            if (item.Level2.length > 0) {
                return (
                    <SubMenu
                        key={item.Level1}
                        title={
                            <span>
                                <Icon type={item.icon || "appstore"} />
                                <span>{item.Level1}</span>
                            </span>
                        }
                    >
                        {item.Level2.map(subItem => {
                            return (
                                <Menu.Item key={subItem.item}>
                                    <Link to={subItem.url}>{subItem.item}</Link>
                                </Menu.Item>
                            );
                        })}
                    </SubMenu>
                );
            } else {
                return (
                    <Menu.Item
                        onClick={() => {
                            this.props.history.push(item.url.trim());
                        }}
                        key={item.Level1}
                    >
                        <Icon type={item.icon || "appstore"} />
                        <span>{item.Level1}</span>
                    </Menu.Item>
                );
            }
        });
    };

    changeCollapse = () => {
        this.setState(prev => {
            return { collapsed: !prev.collapsed };
        });
    };

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(
            key => this.state.openKeys.indexOf(key) === -1
        );
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : []
            });
        }
    };

    render() {
        const { systemTitleName = "管理系统" } = sessionStorage.getItem(
            "loginAllocation"
        )
            ? JSON.parse(sessionStorage.getItem("loginAllocation"))
            : {};
        const breadcrumbTopTextArray = sessionStorage.getItem(
            "breadcrumbTopTextArray"
        );
        const hash = window.location.hash;
        let current = this.state.current
            ? this.state.current
            : breadcrumbTopTextArray
            ? JSON.parse(breadcrumbTopTextArray)[
                  JSON.parse(breadcrumbTopTextArray).length - 1
              ]
            : "";
        let openKeys =
            this.state.openKeys.length > 0
                ? this.state.openKeys
                : breadcrumbTopTextArray
                ? [JSON.parse(breadcrumbTopTextArray)[0]]
                : [];
        const { menuList = [] } = this.state;
        menuList.map(item => {
            if (item.Level2 && item.Level2.length > 0) {
                item.Level2.map(subItem => {
                    if (hash.indexOf(subItem.url) > -1) {
                        current = subItem.item;
                        openKeys = [item.Level1];
                        sessionStorage.setItem(
                            "breadcrumbTopTextArray",
                            JSON.stringify([item.Level1, subItem.item])
                        );
                    } else if (hash.indexOf("/Dashboard/Workbench") > -1) {
                        current = "首页";
                        sessionStorage.setItem(
                            "breadcrumbTopTextArray",
                            JSON.stringify(["首页"])
                        );
                    }
                });
            } else {
                if (hash.indexOf(item.url) > -1) {
                    current = item.Level1;
                }
            }
        });
        const { collapsed, curScreen } = this.state;

        return (
            <Layout.Sider
                className={
                    curScreen === "mobile" ? Style.mobileSlider : "sliderBox"
                }
                collapsible={ curScreen !== "mobile" }
                collapsed={collapsed}
                onCollapse={this.changeCollapse}
                width={curScreen === "mobile" ? 120 : 140}
            >
                {curScreen === "mobile" ? (
                    <Drawer
                        title={null}
                        placement={"left"}
                        closable={false} //是否显示右上角的关闭按钮
                        visible={!collapsed}
                        onClose={() => {
                            this.changeCollapse(true);
                        }} //点击遮罩层或右上角叉或取消按钮的回调
                        className={Style.menuDrawer}
                        bodyStyle={{padding: 0 }}
                    >
                        <div className={Style.logo}>
                            <img src={Logo} alt="" />
                        </div>
                        <Menu
                            onClick={this.handleClick}
                            defaultSelectedKeys={[current]}
                            // defaultOpenKeys={[...openKeys]}
                            // onOpenChange={this.onOpenChange}
                            mode="inline"
                            style={{
                                height: "calc( 100% - 80px)",
                                overflowY: "auto",
                                fontSize: "12px"
                            }}
                        >
                            {this.getMenuList()}
                        </Menu>
                    </Drawer>
                ) : (
                    <div>
                        <div className={Style.logo}>
                            <img src={Logo} alt="" />
                        </div>
                        <Menu
                            theme="dark"
                            onClick={this.handleClick}
                            defaultSelectedKeys={[current]}
                            defaultOpenKeys={curScreen === "big-screen"?[...openKeys]:[]}
                            onOpenChange={this.onOpenChange}
                            mode="inline"
                            style={{
                                height: "calc( 100% - 80px)",
                                overflowY: "auto",
                                fontSize: "12px"
                            }}
                        >
                            {this.getMenuList()}
                        </Menu>
                    </div>
                )}
            </Layout.Sider>
        );
    }
}
const mapStateToProps = state => {
    const { loginReducer, loginAllocation, curScreen } = state;
    return { loginReducer, loginAllocation, curScreen };
};
export default connect(mapStateToProps)(AsideMenu);
