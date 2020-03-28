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
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data, popout:null });
				default:
					console.log(e.detail.type);
					console.log(e.detail.data);
                    console.log(this.state);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
	}

	go = (e) => {
		setActivePanel(e.currentTarget.dataset.to);
	}

	render() {
		return (
            <View activePanel={activePanel} popout={popout}>
                <Home id='home' fetchedUser={fetchedUser} go={go} />
                <Persik id='persik' go={go} />
            </View>
	    );
	}
}

export default App;

