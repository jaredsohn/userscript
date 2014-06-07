// ==UserScript==
// @name          BvS Village Page Revamp
// @author        North
// @description   Improvement for the Village Page
// @include       http://*animecubed.com/billy/bvs/village.html
// @version       1.3
// @history       1.3 Moved Candyween to Areas column
// @history       1.2 A couple of changes based on feedback
// @history       1.1 Interchanged columns for the Village and the Admin tabs
// @history       1.0 Initial release
// ==/UserScript==

function addStyle(css) {
    var head = document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = css;
    head.appendChild(style);
}
function hasClass(element, className) {
    return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}
function addClass(element, className) {
    if (!hasClass(element, className)) {
        element.className += " " + className;
    }
}
function removeClass(element, className) {
    if (hasClass(element, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        element.className = element.className.replace(reg, ' ');
    }
}

function tabsPanel(tabsData) {
    var tabChangeCallbacks = [];
    var tabsContainer = document.createElement('div');
    var contentContainer = document.createElement('div');
    var container = document.createElement('div');
    container.appendChild(tabsContainer);
    container.appendChild(contentContainer);
    addClass(tabsContainer, 'tab-panel');

    var selectTab = function(tabData) {
        for (var i = 0; i < tabsData.length; i++) {
            removeClass(tabsData[i].tab, 'active-tab');
            removeClass(tabsData[i].tab, 'hover-inactive-tab');
            tabsData[i].content.style.display = 'none';
            tabsData[i].hide && tabsData[i].hide();
        }
        addClass(tabData.tab, 'active-tab');
        tabData.content.style.display = '';
        tabData.show && tabData.show();

        for (i = 0; i < tabChangeCallbacks.length; i++) {
            tabChangeCallbacks[i](tabData.index);
        }
    };
    var createTab = function(tabData) {
        var tab = document.createElement('div');
        addClass(tab, 'inactive-tab');
        tab.appendChild(document.createTextNode(tabData.text));
        tabsContainer.appendChild(tab);
        tabData.tab = tab;

        if (tabData.content) {
            contentContainer.appendChild(tabData.content);
            tabData.content.style.display = 'none';
        }
        tabData.hide && tabData.hide();

        var onTabClick = function() {
            selectTab(tabData);
        };
        var onTabMouseEnter = function() {
            if (!hasClass(tab, 'active-tab')) {
                addClass(tab, 'hover-inactive-tab');
            }
        };
        var onTabMouseLeave = function() {
            removeClass(tab, 'hover-inactive-tab');
        };
        tab.addEventListener('click', onTabClick, false);
        tab.addEventListener('mouseenter', onTabMouseEnter, false);
        tab.addEventListener('mouseleave', onTabMouseLeave, false);
    };

    for (var i = 0; i < tabsData.length; i++) {
        tabsData[i].index = i;
        createTab(tabsData[i]);
    }

    addStyle([
        ".tab-panel {height: 24px; border-bottom: 4px solid #2647a0;}",
        ".tab-panel div {float: left; font-size: 12px; cursor: pointer; position: relative; padding-left: 5px; padding-right: 5px; line-height: 22px; border-top-left-radius: 1ex; border-top-right-radius: 1ex; border: 1px solid #a3a3a3; border-bottom-width: 0; bottom: 1px;}",
        ".tab-panel .inactive-tab {background: #d8d8d8 url(data:image/gif;base64,R0lGODlhAQAoALMAAOzs7fv7++Xm5vb29+/w8Pz8/Pn5+eHi49zd3/T19fr6+vHy8ujq6v7+/v///9jY2iH5BAAAAAAALAAAAAABACgAAAQS0EnXWgnKjLQIYMKBPGRpnmgEADs=) top left repeat-x; margin-top: 2px;}",
        ".tab-panel .active-tab {background: #2647a0 url(data:image/gif;base64,R0lGODlhAQAoAMQAAEBr1CtOqyhMpjljyDlhxEBt1jBWtTtlyy5SsEBs1Tdfwj1nzj9q0TNbvEFu10Jv2SZHoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAABACgAAAUV4CM6TpEADLMcA6E0jYEEAmTfeI6HADs=) top left repeat-x; border: 1px solid #243356; border-bottom-width: 0; line-height: 24px; color: white; cursor: default;}",
        ".tab-panel .hover-inactive-tab {background: #bfdaff url(data:image/gif;base64,R0lGODlhAQAoAMQAAObx/+fx/9zs/9Xn/+fy/8ff/+Lu/+Pw/9fo/+Xw/9Hm/8vi/8/j/8Td/9/t/9rp/+Dt/7/a/+jy/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAABACgAAAUWoCRKRAAAyWFAjvAgg8IsRRPdeK7jIQA7) top left repeat-x; margin-top: 2px;}"
    ].join("\n"));

    return {
        container: container,
        selectTab: function(tabIndex) {
            if (tabsData.length > tabIndex) {
                selectTab(tabsData[tabIndex]);
            }
        },
        onTabChange: function(callback) {
            tabChangeCallbacks.push(callback);
        }
    };
}

function getBvsDate() {
    var bvsOffset = -5;
    var d = new Date();

    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * bvsOffset));
}
function getLastBvsDayrollDate() {
    var bvsDate = getBvsDate();
    var hours = bvsDate.getHours();
    var hoursOffsetToDayroll = hours < 5 ? (19 + hours) : (hours - 5);
    bvsDate.setMinutes(10);
    return new Date(bvsDate.getTime() - hoursOffsetToDayroll * 3600000);
}
function markTodayElement(element) {
    var header = element.querySelector('b');
    var result = /(\d{1,2})\/(\d{1,2}) \(\w{3} - (\d{1,2}):(\d{1,2})/.exec(header.textContent);
    if (result && result.length === 5) {
        var date = new Date();
        var month = result[1] - 1;
        var day = result[2];
        var hour = result[3];
        var minute = result[4];
        var year = date.getFullYear();
        if (date.getMonth() === 0 && month === 11) {
            year--;
        }

        date = new Date(year, month, day, hour, minute);
        var dayroll = getLastBvsDayrollDate();

        if (date > dayroll) {
            addClass(element, 'today');
        }
    }
}

var cleanClonedNode = (function() {
    var counter = 0;
    return function(node) {
        var nodesWithId = document.evaluate(".//*[@id]", node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i = 0; i < nodesWithId.snapshotLength; i++) {
            var item = nodesWithId.snapshotItem(0);
            item.id = '';
        }

        var formNodes = document.evaluate(".//form", node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var formNames = [];
        for (var i = 0; i < formNodes.snapshotLength; i++) {
            var form = formNodes.snapshotItem(i);
            formNames.push(form.name);
            form.name += counter;
        }

        var linkNodes = document.evaluate(".//a[contains(@href, 'submit()')]", node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i = 0; i < linkNodes.snapshotLength; i++) {
            var link = linkNodes.snapshotItem(i);
            for (var j = 0; j < formNames.length; j++) {
                link.href = link.href.replace('.' + formNames[j] + '.submit', '.' + formNames[j] + counter + '.submit');
            }
        }
        counter++;
    };
})();

function getClonedPageComponent(header) {
    var container = document.createElement('div');
    var title = document.createElement('b');
    title.appendChild(document.createTextNode(header));
    container.appendChild(title);

    var xpath = '//td/font/b[text()="' + header + '"]/ancestor::table[1]/following-sibling::table[1]';
    var component = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (component.snapshotLength) {
        var clonedComponent = component.snapshotItem(0).cloneNode(true);
        cleanClonedNode(clonedComponent);
        container.appendChild(clonedComponent);
    }

    return container;
}

function getSpyReportLink() {
    var container = document.createElement('div');
    var header = document.createElement('b');
    header.appendChild(document.createTextNode('Spy Report:'));

    container.appendChild(header);

    container.appendChild(document.forms['spyreportshow'].cloneNode(true));
    cleanClonedNode(container);

    return container;
}

function getActionComponent(formName) {
    var element = document.forms[formName];
    while (element && element.tagName.toLowerCase() !== 'table') {
        element = element.parentNode;
    }
    element = element.cloneNode();
    cleanClonedNode(element);
    return element;
}

function createAnnouncemntTab() {
    var container = document.createElement('div');

    var newAnnouncement = document.getElementById('annul').cloneNode(true);
    newAnnouncement.style.height = '';
    newAnnouncement.id = '';
    container.appendChild(newAnnouncement);

    var changeLink = document.querySelector('form[name=cann] p');
    if (changeLink) {
        container.appendChild(changeLink.cloneNode(true));
    }

    return container;
}

function createMessagesTab(selector) {
    var container = document.createElement('div');

    var form = document.createElement('form');
    form.style.marginBottom = '0';
    form.name = 'emess' + selector.length;
    form.action = document.forms['emess'].action;
    form.method = document.forms['emess'].method;
    form.appendChild(document.getElementsByName('player')[0].cloneNode(true));
    form.appendChild(document.getElementsByName('pwd')[0].cloneNode(true));

    var ul = document.createElement('ul');
    ul.className = 'checklist cl3';
    ul.style.height = 'auto';
    ul.style.margin = '0';
    form.appendChild(ul);

    var replaceClass = function(element, classToReplace, newClass) {
        if (hasClass(element, classToReplace)) {
            removeClass(element, classToReplace);
            addClass(element, newClass);
        }
    };
    var messages = document.querySelectorAll(selector);
    for (var i = 0; i < messages.length; i++) {
        var clonedMessage = messages[i].cloneNode(true);
        if (i % 2 === 0) {
            replaceClass(clonedMessage, 'alt', 'alt2');
            replaceClass(clonedMessage, 'alt3', 'alt4');
            replaceClass(clonedMessage, 'alt5', 'alt6');
        } else {
            replaceClass(clonedMessage, 'alt2', 'alt');
            replaceClass(clonedMessage, 'alt4', 'alt3');
            replaceClass(clonedMessage, 'alt6', 'alt5');
        }
        markTodayElement(clonedMessage);
        ul.appendChild(clonedMessage);
    }

    var cloneForm = function(name) {
        var newForm = document.forms[name];
        var formName = name + selector.length;

        newForm = newForm.cloneNode(true);
        newForm.name = formName;

        var links = newForm.querySelectorAll('a');
        for (var i = 0; i < links.length; i++) {
            links[i].href = links[i].href.replace(name, formName);
        }
        return newForm;
    };

    var table = document.createElement('table');
    var tr = document.createElement('tr');
    var tdLeft = document.createElement('td');
    var tdRight = document.createElement('td');
    table.style.width = '100%';
    tdLeft.style.textAlign = 'left';
    tdLeft.style.width = '50%';
    tdRight.style.textAlign = 'right';
    tdRight.style.verticalAlign = 'top';
    tr.appendChild(tdLeft);
    tr.appendChild(tdRight);
    table.appendChild(tr);
    container.appendChild(table);

    var eraseMessagesInput = document.getElementsByName('messageerase')[0];
    if (eraseMessagesInput) {
        form.appendChild(eraseMessagesInput.cloneNode(true));
        var eraseLink = eraseMessagesInput.nextElementSibling.querySelector('a').cloneNode(true);
        eraseLink.href = eraseLink.href.replace('emess', form.name);
        tdLeft.appendChild(eraseLink);
    }
    if (document.forms['refreshmes']) {
        tdRight.appendChild(cloneForm('refreshmes'));
    }
    if (document.forms['emessall']) {
        tdLeft.appendChild(cloneForm('emessall'));
    }
    if (document.forms['leavem']) {
        container.appendChild(cloneForm('leavem'));
    }

    container.appendChild(form);
    addStyle("li.today label > b {background-color: #9AFFF2;}");
    return container;
}

function createActionsTab() {
    var categories = [{
            title: 'Areas',
            formNames: ['kat', 'phases', 'pizzamenu', 'fieldmenu', 'robofighto', 'concenter', 'tvtime', 'eldiablo', 'zat', 'festival', 'candyween']
        }, {
            title: 'Agression',
            formNames: ['spy', 'vattack', 'bbook', 'obscure', 'irreport', 'spyreport']
        }, {
            title: 'Bonuses',
            formNames: ['lemonaid', 'dicetime', 'brotime', 'blackstones', 'pandtime', 'ramen', 'ninjabeach']
        }, {
            title: 'Actions',
            formNames: ['snowday', 'patrol', 'rescol', 'paperwork', 'zatrs', 'repcol', 'sgrs', 'ingredienthunt']
        }, {
            title: 'Admin',
            formNames: ['setperm', 'science']
        }];
    var other = [];

    var cellNumber = 0;
    var table = document.createElement('table');
    var tr;
    table.className='village-actions';

    var createTd = function(title) {
        if (cellNumber % 2 === 0) {
            tr = document.createElement('tr');
            table.appendChild(tr);
        }
        var td = document.createElement('td');
        td.style.verticalAlign = 'top';
        tr.appendChild(td);

        cellNumber++;

        td.appendChild(document.createTextNode(title));
        return td;
    };

    var actions = document.evaluate("//table[@width='255']//form/ancestor::table[1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < actions.snapshotLength; i++) {
        var action = actions.snapshotItem(i).cloneNode(true);
        var form = action.querySelector('form');

        var added = false;
        for (var j = 0; j < categories.length; j++) {
            var category = categories[j];
            for (var k = 0; k < category.formNames.length; k++) {
                if (form.name === category.formNames[k]) {
                    category.actions = category.actions || [];
                    category.actions.push(action);
                    added = true;
                }
            }
        }
        if (!added) {
            other.push(action);
        }

        cleanClonedNode(action);
    }
    for (i = 0; i < categories.length; i++) {
        category = categories[i];
        var td = createTd(category.title);
        for (j = 0; category.actions && j < category.actions.length; j++) {
            td.appendChild(category.actions[j]);
        }
    }
    if (other.length) {
        td = createTd('Other');
        for (i = 0; i < other.length; i++) {
            td.appendChild(other[i]);
        }
    }

    addStyle("table.village-actions table {margin-bottom: 3px;}");
    return table;
}

function createVillageTab() {
    var container = document.createElement('div');
    var table = document.createElement('table');
    var tr = document.createElement('tr');
    var rightTd = document.createElement('td');
    var leftTd = document.createElement('td');
    rightTd.style.verticalAlign = 'top';
    leftTd.style.verticalAlign = 'top';
    table.style.width = '100%';
    leftTd.style.width = '50%';
    tr.appendChild(leftTd);
    tr.appendChild(rightTd);
    table.appendChild(tr);
    container.appendChild(table);

    var members = getClonedPageComponent('Members:');
    var permissions = getClonedPageComponent('Permissions:');
    var resources = getClonedPageComponent('Resources:');
    var spyingOn = getClonedPageComponent('Spying On:');
    var villageContracts = getClonedPageComponent('Village Contracts:');
    var villageBank = getClonedPageComponent('Village Bank:');
    var leaveVillage = getClonedPageComponent('Leave Village:');

    rightTd.appendChild(members);
    leftTd.appendChild(resources);
    leftTd.appendChild(permissions);
    leftTd.appendChild(spyingOn);
    leftTd.appendChild(villageContracts);
    leftTd.appendChild(villageBank);
    leftTd.appendChild(leaveVillage);

    return container;
}

function createAdminTab() {
    var container = document.createElement('div');
    var table = document.createElement('table');
    var tr = document.createElement('tr');
    var rightTd = document.createElement('td');
    var leftTd = document.createElement('td');
    rightTd.style.verticalAlign = 'top';
    leftTd.style.verticalAlign = 'top';
    table.style.width = '100%';
    leftTd.style.width = '50%';
    tr.appendChild(leftTd);
    tr.appendChild(rightTd);
    table.appendChild(tr);
    container.appendChild(table);

    var villageOptions = getClonedPageComponent('Village Options:');
    var resourcePoints = getClonedPageComponent('Resource Points:');
    var upgrades = getClonedPageComponent('Upgrades:');
    var invasionDefense = getClonedPageComponent('Invasion Defense:');
    var applications = getClonedPageComponent('Applications / Members:');
    var yesterdayReport =  getClonedPageComponent("Yesterday's Report:");
    var newLeader = getClonedPageComponent('Name new Leader:');
    var spyReportLink = getSpyReportLink();

    var temp = yesterdayReport.querySelectorAll('td > div');
    for (var i = 0; i < temp.length; i++) {
        temp[i].style.height = 'auto';
    }

    rightTd.appendChild(villageOptions);
    leftTd.appendChild(spyReportLink);
    leftTd.appendChild(resourcePoints);
    leftTd.appendChild(upgrades);
    leftTd.appendChild(invasionDefense);
    leftTd.appendChild(applications);
    leftTd.appendChild(yesterdayReport);
    leftTd.appendChild(newLeader);

    return container;
}

(function() {
    var announcement = document.getElementById('annul');

    var container = document.createElement('div');
    container.style.className = 'village-tabs';
    announcement.parentNode.insertBefore(container, announcement.previousElementSibling);

    var elementsToHide = [];
    var element = announcement.previousElementSibling;
    while (element) {
        elementsToHide.push(element);
        element = element.nextElementSibling;
    }
    elementsToHide.push(document.forms['emess']);

    var playerName = document.getElementsByName('player')[0].value;
    var onTabChange = function(index) {
        localStorage.setItem('village-revamp-' + playerName, index);
    };
    var tabs = tabsPanel([{
            text: 'Chat',
            content: createMessagesTab('#messageul li.alt3, #messageul li.alt4, #messageul li.alt5, #messageul li.alt6')
        }, {
            text: 'Log',
            content: createMessagesTab('#messageul li.alt, #messageul li.alt2')
        }, {
            text: 'Actions',
            content: createActionsTab()
        }, {
            text: 'Village',
            content: createVillageTab()
        }, {
            text: 'Admin',
            content: createAdminTab()
        }, {
            text: 'Announcement',
            content: createAnnouncemntTab()
        }, {
            text: 'Old',
            content: document.createElement('div'),
            show: function() {
                for (var i = 0; i < elementsToHide.length; i++) {
                    elementsToHide[i].style.display = '';
                }
            },
            hide: function() {
                for (var i = 0; i < elementsToHide.length; i++) {
                    elementsToHide[i].style.display = 'none';
                }
            }
        }]);
    tabs.onTabChange(onTabChange);

    var tabIndex = localStorage.getItem('village-revamp-' + playerName) || 0;
    tabIndex = parseInt(tabIndex);
    tabs.selectTab(tabIndex);

    container.appendChild(tabs.container);
    addStyle([
        ".village-tabs {width: 100%; text-align: left;}"
    ].join("\n"));
})();
