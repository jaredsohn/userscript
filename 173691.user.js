// ==UserScript==
// @name        Zendesk Window Title
// @namespace   http://www.software-architects.at
// @description Improves the browser window title when using zendesk agent by adding info like ticket id.
// @match       https://*.zendesk.com/agent/*
// @grant       none
// @version     1.4
// @copyright   2014 software architects gmbh
// ==/UserScript==

var currentSection = null;
var isSectionPresent = false;
var initialWindowTitle = null;

function getTitle() {
    "use strict";
    var tabs = $('#tabs');
    if (tabs.length === 1) {
        var selectedTab = tabs.children('li.selected');
        if (selectedTab.length === 1) {
            var tabText = selectedTab.find('div.tab_text');
            if (tabText.length === 1) {
                return tabText.text().trim();
            } else {
                console.debug('ZendeskWindowTitle: getTitle: tab text not found');
            }
        } else {
            console.debug('ZendeskWindowTitle: getTitle: selected tab not found');
        }
    } else {
        console.debug('ZendeskWindowTitle: getTitle: tabs not found');
    }

    return null;
}

function getTicketInformation() {
    "use strict";

    var title = null;
    var user = null;
    var org = null;

    var mainPanes = $('#main_panes');
    if (mainPanes.length === 1) {
        var div = mainPanes.children('div.ember-view.workspace').not('[style*="none"]');
        if (div.length === 1) {
            var nav = div.find('nav.ember-view.btn-group');
            if (nav.length === 1) {
                var buttons = nav.children('span.btn');
                if (buttons.length === 3) {
                    user = $(buttons[1]).text().trim();
                    if (!$(buttons[0]).hasClass('create')) {
                        org = $(buttons[0]).text().trim();
                    } else {
                        console.debug('ZendeskWindowTitle: getTicketInformation: no org');
                    }

                    title = getTitle();
                } else {
                    console.debug('ZendeskWindowTitle: getTicketInformation: buttons not found');
                }
            } else {
                console.debug('ZendeskWindowTitle: getTicketInformation: nav not found');
            }
        } else {
            console.debug('ZendeskWindowTitle: getTicketInformation: div not found');
        }
    } else {
        console.debug('ZendeskWindowTitle: getTicketInformation: main panes not found');
    }

    if (title && user) {
        if (org) {
            return title + ' - ' + user + ' - ' + org;
        } else {
            return title + ' - ' + user;
        }
    }

    return null;
}

function updateWindowTitle() {
    "use strict";
    if (!isSectionPresent) {
        if (window.document.title === 'Zendesk...') {
            console.debug('ZendeskWindowTitle: dummy window title present');
            return;
        } else if (Zd.hasOwnProperty('section')) {
            isSectionPresent = true;
            initialWindowTitle = window.document.title;
            console.debug('ZendeskWindowTitle: section present');
        } else {
            console.debug('ZendeskWindowTitle: section still missing');
            return;
        }
    }

    if (Zd.section !== currentSection) {
        if (!Zd.section) {
            currentSection = Zd.section;
            console.debug('ZendeskWindowTitle: empty section');
            window.document.title = initialWindowTitle;
        } else if (Zd.section.indexOf('#/tickets/') === 0) {
            var id = Zd.section.substring(10);
            console.debug('ZendeskWindowTitle: focused ticket: ' + id);

            var info = getTicketInformation();
            if (info) {
                currentSection = Zd.section;
                window.document.title = initialWindowTitle + ' - #' + id + ' - ' + info;
            } else {
                // something did not check out, ensure that we query again
                currentSection = null;
                window.document.title = initialWindowTitle + ' - #' + id;
            }
        } else {
            currentSection = Zd.section;
            console.debug('ZendeskWindowTitle: focused: ' + Zd.section);
            window.document.title = initialWindowTitle + ' - ' + currentSection;
        }
    }
}

window.setInterval(updateWindowTitle, 1000);