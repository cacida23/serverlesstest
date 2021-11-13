import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import classNames from 'classnames'
import AppRouter from '@/router'
import store from './store'
import PrimaryLayout from '_l/primary'
import styles from './app.less'
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
      }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
      });
  });
}

class App extends React.Component {
  render() {
    return (
      <Provider {...store}>
        <div class={classNames("app-container", styles.appContainer)}>
          <PrimaryLayout>
            <img class="react-logo" src={require('assets/react-logo.jpg')} />
            <hr/>
            <AppRouter />
          </PrimaryLayout>
        </div>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, window.document.getElementById('app'))
