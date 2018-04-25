import { NightwatchBrowser } from 'nightwatch';

module.exports = {
  'Login : submit with wrong credentials': (browser: NightwatchBrowser) => {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('body', 1000)

      .assert.visible('input[id=id_username]')
      .setValue('input[id=id_username]', 'dev11')

      .assert.visible('input[id=id_password]')
      .setValue('input[id=id_password]', 'dev11')

      .assert.visible('button[type=submit]')
      .click('button[type=submit]')
      .pause(1000)

      // after login
      .assert.containsText('small[class=error]', 'Please enter a correct username and password. Note that both fields may be case-sensitive.')
      .end();
  },

  'Login : submit with correct credentials': (browser: NightwatchBrowser) => {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('body', 1000)

      .assert.visible('input[id=id_username]')
      .setValue('input[id=id_username]', 'dev')

      .assert.visible('input[id=id_password]')
      .setValue('input[id=id_password]', 'dev')

      .assert.visible('button[type=submit]')
      .click('button[type=submit]')
     
      // after login
      .waitForElementVisible('.container .orange-text', 1000)
      .assert.title('Home - CRUDLFA+ demo !')
      .assert.visible('a[class=waves-effect]')
      .end();
  }
};