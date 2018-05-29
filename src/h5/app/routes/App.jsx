import React, { PropTypes } from 'react';

class App extends React.Component {

    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    
    componentDidMount() {
        if (/iPhone10/.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375) && window.location.href.indexOf('/game') < 0) {
            document.body.classList.add('iPhoneX');
        }
    }
    
    render() {
        const {children} = this.props;

        return (
            <div className="content" style={{ minHeight: '100%' }}>
                {React.cloneElement(children, {
					...this.props,
                    router: this.context.router,
				})}
			</div>
        );
    }
}

App.propTypes = {
    children: React.PropTypes.node,
    history: React.PropTypes.object,
    location: React.PropTypes.object
};

export default App;
