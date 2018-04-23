import { Controller } from 'stimulus'
import React from 'react'
import ReactDOM from 'react-dom'
import AutocompleteTest from '../components/autocomplete.js'

export default class extends Controller {
  connect() {
    ReactDOM.render(
      <AutocompleteTest class="autocomplete" />
      ,
      this.element
    )
  }
}
