// ==UserScript==
// @name        Basecamp Keyword Highlighter
// @description Highlights predefined list of keywords in the Basecamp task list at the beginning of task description
// @include     https://*.basecamphq.com/projects/*/todo_lists
// @grant       none
// @version     0.2.2
// ==/UserScript==

// Here you can add your own keywords:
var taskKeywords = {
    error: {
        color: '#bf0303'
    },
    bug: {
        color: '#bf0303'
    },
    todo: {
        color: '#008c00'
    },
	feature: {
		color: '#008c00'
	},
	postponed: {
		color: '#5a00b3'
	}
};

function getType(obj) {
    return Object.prototype.toString.call(obj).replace('[object ', '').replace(']', '').toLowerCase();
}

function findElements(tagName, param) {
    var result = [],
        elements = document.getElementsByTagName(tagName),
        paramType = getType(param);

    for (var i = 0; i < elements.length; i++) {
        if (paramType == 'string' && elements[i].id.indexOf(param) == 0) {
            result.push(elements[i]);
        } else if (paramType == 'regexp' && param.test(elements[i].id)) {
            result.push(elements[i]);
        }
    }

    return result;
}

var todoItemsRegexp = /^item_wrap_(\d+)$/;

function createKeywordStyles() {
    var style = document.createElement('style'),
        innerHtml = '';

    style.type = 'text/css';

    var i = 0;
    for (var j in taskKeywords) {
        var className = 'Keyword' + i;

        innerHtml += '.' + className + ' { ' +
            'color: #fff; ' +
            'border-radius: 2px; ' +
            'padding: 2px; ' +
            'background-color: ' + taskKeywords[j].color + '; ' +
            '}\n';
        taskKeywords[j].className = className;

        i++;
    }

    style.innerHTML = innerHtml;

    document.getElementsByTagName('head')[0].appendChild(style);
}

function formatTask(element, regexp, keyword, capturedWord) {
    var span = document.createElement('span');

    span.className = taskKeywords[keyword].className;
    span.textContent = capturedWord.toUpperCase();

    element.textContent = element.textContent.replace(regexp, ' ');

    element.insertBefore(span, element.firstChild);
}

function processTodoLists(elementId) {
    var tasksContent = typeof elementId != 'undefined' ? [document.getElementById(elementId)] : findElements('span', todoItemsRegexp);

    for (var i = 0; i < tasksContent.length; i++) {
        if (tasksContent[i].childElementCount > 0) {
            continue;
        }

        var text = tasksContent[i].textContent;

        for (var j in taskKeywords) {
            if (typeof taskKeywords[j].regexp == 'undefined') {
                taskKeywords[j].regexp = new RegExp('^(' + j + '[A-Z/+-]*)[\\s:]{1}', 'i');
            }

            var regexp = taskKeywords[j].regexp;

            if (regexp.test(text)) {
                var capturedWord = regexp.exec(text)[1];

                formatTask(tasksContent[i], regexp, j, capturedWord);
                break;
            }
        }
    }
}

function setOnItemHighlightListener() {
    Effect.Highlight.prototype._initialize = Effect.Highlight.prototype.initialize;

    Effect.Highlight.prototype.initialize = function() {
        if (arguments[0] && typeof arguments[0].id == 'string' && todoItemsRegexp.test(arguments[0].id)) {
            processTodoLists(arguments[0].id);
        }

        Effect.Highlight.prototype._initialize.apply(this, arguments);
    }
}

if (document.location.pathname.endsWith('todo_lists')) {
    createKeywordStyles();
    processTodoLists();
    setOnItemHighlightListener();
}