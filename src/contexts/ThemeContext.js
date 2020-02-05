import React, { Component, createContext } from 'react';

export const ThemeContext = createContext();

class ThemeContext extends Component {
	state = {
			
	}

  render() {
    return (
      <ThemeContext.Provider vaue={{...this.state}}>
					{this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export default componentName;
