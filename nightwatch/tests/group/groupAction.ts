import { NightwatchBrowser } from 'nightwatch';
import { CONSTANTS } from '../../shared/CONSTANTS';
import { CommonFunction } from '../../shared/commonFunction';

const groupNameForDuplicate = Math.random() + CONSTANTS.GROUP.INPUT + Math.random();

module.exports = {
    'Group : create group : without Permission': async (browser: NightwatchBrowser) => {
        await CommonFunction.loginByDev(browser);
        const groupName = groupNameForDuplicate;

        browser
            // after login go to group create page direct
            .url(CONSTANTS.GROUP.CREATE)
            .waitForElementVisible('body', CONSTANTS.WAIT_FOR_ELEMENT_VISIBLE_TIMEOUT)
            // name input
            .assert.visible('input[id=id_name]')
            .setValue('input[id=id_name]', groupName)

            // submit button
            .assert.visible('#form-object-group .modal-footer button[type=submit]')
            .click('#form-object-group .modal-footer button[type=submit]')

            // verify it created or not
            .url(CONSTANTS.GROUP.BASE_URL + "?q=" + groupName)
            .waitForElementVisible('#modal-body-ajax', CONSTANTS.WAIT_FOR_ELEMENT_VISIBLE_TIMEOUT)
            .pause(CONSTANTS.PAUSE_TIMEOUT)
            .assert.containsText('#render-table > div > div > div > table > tbody > tr:last-child > td:nth-child(2) > a', groupName, "Testing if group list contains new added group")

            .end();
    },

    'Group : Not create same name group': async (browser: NightwatchBrowser) => {
        await CommonFunction.loginByDev(browser);
        const groupName = groupNameForDuplicate;

        browser
            // after login go to group create page direct
            .url(CONSTANTS.GROUP.CREATE)
            .waitForElementVisible('body', CONSTANTS.WAIT_FOR_ELEMENT_VISIBLE_TIMEOUT)
            // name input
            .assert.visible('input[id=id_name]')
            .setValue('input[id=id_name]', groupName)

            // submit button
            .assert.visible('#form-object-group .modal-footer button[type=submit]')
            .click('#form-object-group .modal-footer button[type=submit]')

            // verify error message
            .pause(CONSTANTS.PAUSE_TIMEOUT)
            .assert.containsText('#id_name_container > div > small', 'Group with this Name already exists.')

            .url(CONSTANTS.GROUP.BASE_URL + "?q=" + groupName)
            // get id and delete that one
            .getText('#render-table > div > div > div > table > tbody > tr > td:nth-child(1)', async (tdContentId) => {
                const groupId = tdContentId.value;
                browser
                    .getText('#render-table > div > div > div > table > tbody > tr > td:nth-child(2)', async (tdContentName) => {
                        await CommonFunction.deleteByGrpId(browser, tdContentId.value, tdContentName.value);
                    })
            })
            .end();
    },

    'Group : create group : with Permission': async (browser: NightwatchBrowser) => {
        await CommonFunction.loginByDev(browser);
        const groupName = Math.random() + CONSTANTS.GROUP.INPUT2 + Math.random();

        browser
            // after login go to group create page direct
            .url(CONSTANTS.GROUP.CREATE)
            .waitForElementVisible('body', CONSTANTS.WAIT_FOR_ELEMENT_VISIBLE_TIMEOUT)
            // name input
            .assert.visible('input[id=id_name]')
            .setValue('input[id=id_name]', groupName)

            .pause(CONSTANTS.PAUSE_TIMEOUT)

            // submit button
            .assert.visible('#form-object-group .modal-footer button[type=submit]')
            .click('#form-object-group .modal-footer button[type=submit]')

            // verify it created or not
            .url(CONSTANTS.GROUP.BASE_URL + "?q=" + groupName)
            .waitForElementVisible('#modal-body-ajax', CONSTANTS.WAIT_FOR_ELEMENT_VISIBLE_TIMEOUT)
            .pause(CONSTANTS.PAUSE_TIMEOUT)
            .assert.containsText('#render-table > div > div > div > table > tbody > tr:last-child > td:nth-child(2) > a', groupName, "Testing if group list contains new added group")

            // get id and delete that one
            .getText('#render-table > div > div > div > table > tbody > tr > td:nth-child(1)', async (tdContentId) => {
                const groupId = tdContentId.value;
                browser
                    .getText('#render-table > div > div > div > table > tbody > tr > td:nth-child(2)', async (tdContentName) => {
                        await CommonFunction.deleteByGrpId(browser, tdContentId.value, tdContentName.value);
                    })
            })
            .end();
    },

    'Group : create group by popup': async (browser: NightwatchBrowser) => {
        await CommonFunction.loginByDev(browser);
        const groupName = Math.random() + CONSTANTS.GROUP.INPUT2 + Math.random();

        browser
            // after login go to group create page direct
            .url(CONSTANTS.GROUP.BASE_URL)
            .waitForElementVisible('body', CONSTANTS.WAIT_FOR_ELEMENT_VISIBLE_TIMEOUT)

            .assert.visible('body > div.fixed-actions > a[href="/group/create?_next=/group"]')
            .click('body > div.fixed-actions > a[href="/group/create?_next=/group"]', () => {
                browser
                    .waitForElementVisible('#modal', CONSTANTS.WAIT_FOR_ELEMENT_VISIBLE_TIMEOUT)
                    .pause(CONSTANTS.PAUSE_TIMEOUT)
                    .expect.element('#modal').to.have.css('display').which.equal('block');
                browser
                    .assert.containsText('#modal', 'Group: create', "Testing if heading is Group: create")
                    // name input
                    .assert.visible('input[id=id_name]')
                    .setValue('input[id=id_name]', groupName)

                    .pause(CONSTANTS.PAUSE_TIMEOUT)

                    // submit button
                    .assert.visible('#modal #form-object-group > div.modal-footer > button[type=submit]')
                    .click('#modal #form-object-group > div.modal-footer > button[type=submit]', () => {
                        // verify it created or not
                        browser
                            .url(CONSTANTS.GROUP.BASE_URL + "?q=" + groupName)
                            .waitForElementVisible('#modal-body-ajax', CONSTANTS.WAIT_FOR_ELEMENT_VISIBLE_TIMEOUT)
                            .pause(CONSTANTS.PAUSE_TIMEOUT)
                            .assert.containsText('#render-table > div > div > div > table > tbody > tr:last-child > td:nth-child(2) > a', groupName, "Testing if group list contains new added group")
                    })
            })
            .end();
    },

    'Group : Detail group': async (browser: NightwatchBrowser) => {
        await CommonFunction.loginByDev(browser);
        browser
            .url(CONSTANTS.GROUP.BASE_URL)
            .waitForElementVisible('#modal-body-ajax', CONSTANTS.WAIT_FOR_ELEMENT_VISIBLE_TIMEOUT)
            .pause(CONSTANTS.PAUSE_TIMEOUT)

            .getText('#render-table > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(2) > a', (tdContentName) => {
                const contentName = tdContentName.value;
                browser
                    .getText('#render-table > div > div > div > table > tbody > tr > td:nth-child(1)', (tdContentID) => {
                        const contentId = tdContentID.value;
                        browser
                            .click('a[data-target="row-actions-' + contentId + '"]', () => {
                                // open menu
                                browser.expect.element('#row-actions-' + contentId).to.have.css('display').which.equal('block')
                            })

                            // click on edit
                            .assert.visible('#row-actions-' + contentId + ' > li:nth-child(3) > a')
                            .click('#row-actions-' + contentId + ' > li:nth-child(3) > a', () => {
                                browser
                                    .assert.urlEquals(CONSTANTS.GROUP.BASE_URL + '/' + contentId + '?_next=/group', 'Group Detail url is the correct')
                                    .waitForElementVisible('#modal-body-ajax', CONSTANTS.WAIT_FOR_ELEMENT_VISIBLE_TIMEOUT)
                                    // check get data Id is correct 
                                    .assert.visible('#modal-body-ajax > div.modal-content > div > table > thead > tr:nth-child(1) > td')
                                    .assert.containsText('#modal-body-ajax > div.modal-content > div > table > thead > tr:nth-child(1) > td', contentId, 'Group Id matched')
                                    .assert.visible('#modal-body-ajax > div.modal-content > div > table > thead > tr:nth-child(2) > td')
                                    .assert.containsText('#modal-body-ajax > div.modal-content > div > table > thead > tr:nth-child(2) > td', contentName, 'Group Name matched')
                            })
                    })
            })
            .pause(CONSTANTS.PAUSE_TIMEOUT)
            .end();
    },

    'Group : Edit group': async (browser: NightwatchBrowser) => {
        await CommonFunction.loginByDev(browser);
        const groupName = Math.random() + CONSTANTS.GROUP.EDIT_INPUT + Math.random();
        let contentId;
        browser
            .url(CONSTANTS.GROUP.BASE_URL)
            .waitForElementVisible('body', CONSTANTS.WAIT_FOR_ELEMENT_VISIBLE_TIMEOUT)
            .pause(CONSTANTS.PAUSE_TIMEOUT)

            .getText('#render-table > div > div > div > table > tbody > tr > td:nth-child(1)', (tdContentID) => {
                contentId = tdContentID.value;
                browser
                    .click('a[data-target="row-actions-' + contentId + '"]', () => {
                        // open menu
                        browser.expect.element('#row-actions-' + contentId).to.have.css('display').which.equal('block')
                    })

                    // click on edit
                    .assert.visible('#row-actions-' + contentId + ' > li:nth-child(2) > a')

                    .click('#row-actions-' + contentId + ' > li:nth-child(2) > a', () => {
                        // popup opened
                        browser
                            .pause(CONSTANTS.PAUSE_TIMEOUT)
                            // name input
                            .assert.visible('input[id=id_name]')
                            .clearValue('input[id=id_name]')
                            .setValue('input[id=id_name]', groupName)

                            .click('#form-object-group > div.modal-footer > button[type="submit"]', () => {
                                console.log("update button clicked");
                                browser
                                    .pause(CONSTANTS.PAUSE_TIMEOUT)
                                    .url(CONSTANTS.GROUP.BASE_URL + "?q=" + groupName)
                                    .waitForElementVisible('body', CONSTANTS.WAIT_FOR_ELEMENT_VISIBLE_TIMEOUT)
                                    .pause(CONSTANTS.PAUSE_TIMEOUT)
                                    .assert.containsText('#render-table > div > div > div > table > tbody > tr:last-child > td:nth-child(2) > a', groupName, "Testing if group list contains updated group")
                            })
                    })
            })
            .pause(CONSTANTS.PAUSE_TIMEOUT)
            .end();
    },

    'Group : Delete group': async (browser: NightwatchBrowser) => {
        await CommonFunction.loginByDev(browser);
        let contentId;
        browser
            .url(CONSTANTS.GROUP.BASE_URL)
            .waitForElementVisible('body', CONSTANTS.WAIT_FOR_ELEMENT_VISIBLE_TIMEOUT)
            .pause(CONSTANTS.PAUSE_TIMEOUT)

            // get id and delete that one
            .getText('#render-table > div > div > div > table > tbody > tr > td:nth-child(1)', async (tdContentId) => {
                const groupId = tdContentId.value;
                browser
                    .getText('#render-table > div > div > div > table > tbody > tr > td:nth-child(2)', async (tdContentName) => {
                        await CommonFunction.deleteByGrpId(browser, tdContentId.value, tdContentName.value);
                    })
            })
            .pause(CONSTANTS.PAUSE_TIMEOUT)
            .end();
    }
};
