//现有组件调用DEMO
import './index.style.scss';
import React, {Component} from 'react';
import {Link} from 'react-router';
// import Toast from 'wbpay-repoch/toast';
import TopNav from 'wbpay-repoch/topNav';
// import Popup from 'wbpay-repoch/popup';
// import UploadPic from 'wbpay-repoch/upload';
// import Alert from 'wbpay-repoch/alert';
import Mask from 'wbpay-repoch/mask';
import NewSlider from 'wbpay-repoch/slider-n';
import {scheme, schemekk} from 'wbpay-repoch/navigation'

// import DatePicker from 'wbpay-repoch/date-picker';

class Building extends Component {

    state = {
        navCurrentTitle: 0,
        showPop: true,
        showAlert: true,
        currentId: '',
        currentIndex: 0
    }

    getPopupOptions = () => {
        let res = {};
        res.content = '确认取消该众筹？';
        res.data = [{ val: 'submit', text: '确认' }];
        res.onChoose = this.handlePopChoose;
        res.onHide = () => {
            this.setState({
                showPop: false,
                currentId: '',
                currentIndex: 0
            });
        };
        return res;
    }

    componentDidMount = () => {
        console.log(scheme('http://www.baidu.com'))
    }

    handleClickTitleNav = (index) => {
        this.setState({ navCurrentTitle : index });
    }

	render() {
        let popOption = this.getPopupOptions();
		return (
			<div className="v-building-root">
                <TopNav 
                    menuList={ [{name:"123"}, {name:"222"}, {name:"444"}, {name: "4444"}, {name:"222"}, {name:"444"}, {name: "4444"}, {name:"222"}, {name:"444"}, {name: "4444"}, {name:"222"}, {name:"444"}, {name: "4444"}, {name:"222"}, {name:"444"}, {name: "4444"}] } 
                    selected_index={ this.state.navCurrentTitle }
                    onChangeNav={ this.handleClickTitleNav }
                />
                <NewSlider
                    continuous={ true }
                    speed={ 300 }
                    isInSlider={ this.compatSlider }
                    auto = { 6000 }
                    startSlide={ 0 }
                    slideStyles = { "lala" }
                    withDotted={ true }>
                    <img src="https://wx3.sinaimg.cn/crop.0.0.711.400/90eb2137ly1fqhs9xozoqj20jr0b4ab7.jpg"></img>
                    <img src="https://wx3.sinaimg.cn/crop.0.0.711.400/90eb2137ly1fqhs9xozoqj20jr0b4ab7.jpg"></img>
                    <img src="https://wx3.sinaimg.cn/crop.0.0.711.400/90eb2137ly1fqhs9xozoqj20jr0b4ab7.jpg"></img>
                    <img src="https://wx3.sinaimg.cn/crop.0.0.711.400/90eb2137ly1fqhs9xozoqj20jr0b4ab7.jpg"></img>
                </NewSlider>
     
           
            </div>
		)
	}
}

export default (Building);
