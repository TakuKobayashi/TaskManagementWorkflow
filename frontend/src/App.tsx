import React from 'react';

import asanalogo from './images/asana.png';
import githublogo from './images/github.png';
import googlelogo from './images/google.png';
//import './App.css';

import './css/style.css';

import { VisualPicker, VisualPickerOption } from 'react-rainbow-components';
import { SidebarCompoment } from './compoments/SidebarCompoment'

class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.onOpenAuthWindow = this.onOpenAuthWindow.bind(this);
  }

  onOpenAuthWindow(event: any){
    const screen = window.screen;
    const windowLogin = window.open("http://localhost:5000/ag2w-245905/asia-northeast1/api/google/auth", "_blank", "width=" + (screen.width / 2) + ",height=" + (screen.height / 2));
    if(!windowLogin){
      windowLogin!.focus();
    }
    event.preventDefault();
  }

  render():
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | string
    | number
    | {}
    | React.ReactNodeArray
    | React.ReactPortal
    | boolean
    | null
    | undefined {
    return (
      <div id="contents">
        <div className="kanri">
          <h3>
            管理画面（仮<span>あなたのプロジェクトをわっかりやすく管理しましょ～（仮</span>
          </h3>
        </div>
        <div className="threeCol">
          <div className="inner">
            <div className="image zoom">
              <a onClick={(e) => this.onOpenAuthWindow(e)}><img src={asanalogo} alt="ASANA" /></a>
            </div>
            <div className="center">
              <h4>ASANA</h4>
            </div>
            <p></p>
          </div>
          <div className="inner">
            <div className="image zoom">
              <img src={githublogo} alt="github" />
            </div>
            <div className="center">
              <h4>GitHub</h4>
            </div>
            <p></p>
          </div>
          <div className="inner">
            <div className="image zoom">
              <img src={googlelogo} alt="google" />
            </div>
            <div className="center">
              <h4>Google</h4>
            </div>
            <p></p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
