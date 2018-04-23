import Autocomplete from 'react-toolbox/lib/autocomplete'
import React from 'react'

const source = {
  'ES-es': 'Spain',
  'TH-th': 'Thailand',
  'EN-gb': 'England',
  'EN-en': 'USA'
}

class AutocompleteTest extends React.Component {
  constructor() {
    super()
    this.state = {
      countries: ['ES-es', 'TH-th']
    }

    this.handleChange = (value) => {
      this.setState({countries: value})
    }
  }

  render () {
    return (
      <Autocomplete
        direction="down"
        selectedPosition="above"
        label="Choose countries"
        onChange={this.handleChange}
        source={source}
        value={this.state.countries}
      />
    )
  }
}

export default AutocompleteTest
