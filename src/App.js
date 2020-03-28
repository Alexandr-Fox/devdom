import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			fetchedUser: null,
			popout:'ScreenSpinner'
		};
	}
	componentDidMount() {
		bridge.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data, popout:null });
				default:
					console.log(e.detail.type);
					console.log(e.detail.data);
                    console.log(this.state);
			}
		});
		bridge.send('VKWebAppGetUserInfo', {});
	}

	go = (e) => {
		this.setState({activePanel:e.currentTarget.dataset.to});
	}

	render() {
		return (
            <View activePanel={this.state.activePanel} popout={this.state.popout}>
                <Home id='home' fetchedUser={this.state.fetchedUser} go={this.go} />
                <Persik id='persik' go={this.go} />
            </View>
	    );
	}
}

export default App;

