// ==UserScript==
// @name          BvS Village Chat
// @author        North
// @description   Improvement for the chat on the Village Page
// @include       http://*animecubed.com/billy/bvs/village.html
// @version       1.3
// @history       1.3 Fix for Kagetools compatibility
// @history       1.2 Fixed marking messages from current dayroll
// @history       1.1 Fixed issue caused science unlesh not having date
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
    var tabs = [];
    var tabsContainer = document.createElement('div');
    addClass(tabsContainer, 'tab-panel');

    var selectTab = function(tab) {
        for (var i = 0; i < tabs.length; i++) {
            removeClass(tabs[i], 'active-tab');
            removeClass(tabs[i], 'hover-inactive-tab');
        }
        addClass(tab, 'active-tab');
    };
    var createTab = function(tabData) {
        var tab = document.createElement('div');
        addClass(tab, 'inactive-tab');
        tab.appendChild(document.createTextNode(tabData.text));
        tabs.push(tab);
        tabsContainer.appendChild(tab);

        var onTabClick = function() {
            selectTab(tab);
            tabData.callback();
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
        createTab(tabsData[i]);
    }

    addStyle([
        ".tab-panel {height: 24px; border-bottom: 4px solid #2647a0;}",
        ".tab-panel div {float: left; font-size: 12px; cursor: pointer; position: relative; padding-left: 5px; padding-right: 5px; line-height: 22px; border-top-left-radius: 1ex; border-top-right-radius: 1ex; border: 1px solid #a3a3a3; border-bottom-width: 0; bottom: 1px;}",
        ".tab-panel .inactive-tab {background: #d8d8d8 url(data:image/gif;base64,R0lGODlhAQAoALMAAOzs7fv7++Xm5vb29+/w8Pz8/Pn5+eHi49zd3/T19fr6+vHy8ujq6v7+/v///9jY2iH5BAAAAAAALAAAAAABACgAAAQS0EnXWgnKjLQIYMKBPGRpnmgEADs=) top left repeat-x; margin-top: 2px;}",
        ".tab-panel .active-tab {background: #2647a0 url(data:image/gif;base64,R0lGODlhAQAoAMQAAEBr1CtOqyhMpjljyDlhxEBt1jBWtTtlyy5SsEBs1Tdfwj1nzj9q0TNbvEFu10Jv2SZHoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAABACgAAAUV4CM6TpEADLMcA6E0jYEEAmTfeI6HADs=) top left repeat-x; border: 1px solid #243356; border-bottom-width: 0; line-height: 24px; color: white;}",
        ".tab-panel .hover-inactive-tab {background: #bfdaff url(data:image/gif;base64,R0lGODlhAQAoAMQAAObx/+fx/9zs/9Xn/+fy/8ff/+Lu/+Pw/9fo/+Xw/9Hm/8vi/8/j/8Td/9/t/9rp/+Dt/7/a/+jy/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAABACgAAAUWoCRKRAAAyWFAjvAgg8IsRRPdeK7jIQA7) top left repeat-x; margin-top: 2px;}"
    ].join("\n"));

    return {
        container: tabsContainer,
        selectTab: function(tabIndex) {
            if (tabs.length > tabIndex) {
                selectTab(tabs[tabIndex]);
            }
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

(function() {
    var hideElements = function(elements) {
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }
    };

    var showElements = function(elements) {
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = '';
        }
    };
    var replaceClass = function(element, classToReplace, newClass) {
        if (hasClass(element, classToReplace)) {
            removeClass(element, classToReplace);
            addClass(element, newClass);
        }
    };
    var markTodayElement = function (element) {
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
    };

    var messages = document.querySelectorAll('#messageul li');
    var chatMessages = [];
    var logMessages = [];

    for (var i = 0; i < messages.length; i++) {
        var message = messages[i];
        if (message.className !== 'alt' && message.className !== 'alt2') {
            chatMessages.push(message);
        } else {
            logMessages.push(message);
        }
        markTodayElement(message);
    }

    for (i = 0; i < chatMessages.length; i++) {
        message = chatMessages[i];
        if (i % 2 === 0) {
            replaceClass(message, 'alt3', 'alt4');
            replaceClass(message, 'alt5', 'alt6');
        } else {
            replaceClass(message, 'alt4', 'alt3');
            replaceClass(message, 'alt6', 'alt5');
        }
    }
    for (i = 0; i < logMessages.length; i++) {
        message = logMessages[i];
        if (i % 2 === 0) {
            replaceClass(message, 'alt', 'alt2');
        } else {
            replaceClass(message, 'alt2', 'alt');
        }
    }

    hideElements(messages);
    showElements(chatMessages);

    var ninjaChatCallback = function() {
        hideElements(messages);
        showElements(chatMessages);
    };
    var villageLogCallback = function() {
        hideElements(messages);
        showElements(logMessages);
    };

    var tabs = tabsPanel([{
            text: 'Ninja Chat',
            callback: ninjaChatCallback
        }, {
            text: 'Village Log',
            callback: villageLogCallback
        }]);
    tabs.selectTab(0);
    var messageContainer = document.getElementById('messageul');
    messageContainer.parentNode.insertBefore(tabs.container, messageContainer);

    addStyle("#messageul li.today label > b {background-color: #9AFFF2;}");
})();
