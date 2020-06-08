import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';
import Error from './Error';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null, eventId: null };
    this.clearState = this.clearState.bind(this);
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    // sentry setup
    if (process.env.NODE_ENV === 'production') {
      Sentry.withScope((scope) => {
        scope.setTag('Custom-Tag', 'ErrorBoundary');
        scope.setLevel('Error');
        scope.setExtras(errorInfo);
        const eventId = Sentry.captureException(error);
        this.setState({ eventId });
      });
    }
  }

  clearState() {
    this.setState({ error: null, errorInfo: null, eventId: null });
  }

  render() {
    if (this.state.error) {
      return <Error clearState={this.clearState} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
