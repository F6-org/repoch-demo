//现有组件调用DEMO
import './index.style.scss';
import Popup from 'wbpay-repoch/popup';
import React, {Component} from 'react';
import Mask from 'wbpay-repoch/mask';
import {Link} from 'react-router';
import NewSlider from 'wbpay-repoch/slider-n';
import TopNav from 'wbpay-repoch/topNav';

// import DatePicker from 'wbpay-repoch/date-picker';

class Building extends Component {

    state = {
        navCurrentTitle: 0,
        showPop: true,
        showAlert: true,
        currentId: '',
        currentIndex: 0
    }


    handleClickTitleNav = (index) => {
        this.setState({ navCurrentTitle : index });
    }
	render() {
		return (
			<div className="v-building-root">
                12312                
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
                withDotted={ true }
            >
                <img src="https://wx3.sinaimg.cn/crop.0.0.711.400/90eb2137ly1fqhs9xozoqj20jr0b4ab7.jpg"></img>
                <img src="https://wx3.sinaimg.cn/crop.0.0.711.400/90eb2137ly1fqhs9xozoqj20jr0b4ab7.jpg"></img>
                <img src="https://wx3.sinaimg.cn/crop.0.0.711.400/90eb2137ly1fqhs9xozoqj20jr0b4ab7.jpg"></img>
                <img src="https://wx3.sinaimg.cn/crop.0.0.711.400/90eb2137ly1fqhs9xozoqj20jr0b4ab7.jpg"></img>
            </NewSlider>
            {
                <Mask show={true}/>    
            }            
            </div>
		)
	}
}

export default (Building);
