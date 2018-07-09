//现有组件调用DEMO
import './index.style.scss';
import React, {Component} from 'react';
import {Link} from 'react-router';
// import Toast from 'wbpay-repoch/toast';
// import Popup from 'wbpay-repoch/popup';
// import UploadPic from 'wbpay-repoch/upload';
// import Alert from 'wbpay-repoch/alert';
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



    componentDidMount = () => {
        console.log(scheme('http://www.baidu.com'))
    }

    handleClickTitleNav = (index) => {
        this.setState({ navCurrentTitle : index });
    }

	render() {
		return (
			<div className="v-share-root">
 
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
