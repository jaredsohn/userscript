// ==UserScript==
// @name : Code++ - DVP
// @namespace : http://userscripts.org/scripts/show/165388
// @description :
// can choose the number of spaces by tab
// quick edit (CTRL + click on a piece of code or posted on a "Voir le code xxx", in the conversation)
// full indentation management (TAB and SHIFT + TAB)
// @include http://87.98.168.209/
// @include http://chat.developpez.com/
// @author Lcf.vs lcf.vs@hotmail.com
// @grant none
// @version 1.1
// ==/UserScript==
(function(callback) {
	
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.textContent = 'setTimeout(' + callback.toString() + ');';
	document.body.appendChild(script);
	
}(function () {
    var insererCode, dialogueCodeP, dlgCodeContenu, jdlgCodeContenu, indentLabel, shift, ctrl, parse, onkey, externalOnclick, internalOnclick, viewCode, clean;
    insererCode = document.getElementById('insererCode');
    dialogueCodeP = document.querySelector('#dialogueCode > p');
    jdlgCodeContenu = document.getElementById('dlgCodeContenu');
    dlgCodeContenu = jdlgCodeContenu.cloneNode(true);
    jdlgCodeContenu.parentNode.replaceChild(dlgCodeContenu, jdlgCodeContenu);
    indentLabel = document.createElement('label');
    indentLabel.setAttribute('for', 'indentSelect');
    indentLabel.setAttribute('style', 'position:absolute;margin-top:-2px;right:15px');
    indentLabel.innerHTML = 'Espaces/tabulation : <select id="indentSelect"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4" selected="selected">4</option></select>';
    dialogueCodeP.appendChild(indentLabel);
    shift = false;
    ctrl = false;
    parse = function parse() {
        var nodes, iterator, node, str;
        nodes = document.querySelectorAll('#conversations a[href^="upload/"], #conversations pre');
        for (iterator in nodes) {
            if (nodes.hasOwnProperty(iterator)) {
                node = nodes[iterator];
                if (!node.hasOwnProperty('uploadedCode')) {
                    node.uploadedCode = null;
                    if (node.nodeName === 'A') {
                        str = node.innerHTML;
                        node.uploadedCodeOption = str.length !== '' ? '=' + str.substring(13).toLowerCase() : '';
                        node.onclick = externalOnclick;
                    } else if (node.nodeName === 'PRE') {
                        node.uploadedCodeOption = '';
                        node.style.display = 'block';
                        node.onclick = internalOnclick;
                    }
                }
            }
        }
    };
    (function () {
        var tabs, index;
        tabs = [
            {
                str: ' ',
                pattern: /^( {1})/gm
            },
            {
                str: '  ',
                pattern: /^( {1,2})/gm
            },
            {
                str: '   ',
                pattern: /^( {1,3})/gm
            },
            {
                str: '    ',
                pattern: /^( {1,4})/gm
            }
        ];
        index = 3;
        document.getElementById('indentSelect').onchange = function (event) {
            index = this.options.selectedIndex;
        };
        dlgCodeContenu.onkeydown = function (event) {
            var tab, value, userStart, userSelection, userEnd, whiteStart, whiteEnd, start, selection, end, posEnd;
            if (event.keyCode === 9) {
                tab = tabs[index];
                value = this.value;
                userStart = value.substring(0, this.selectionStart);
                userSelection = value.substring(userStart.length, this.selectionEnd);
                userEnd = value.substring(this.selectionEnd);
                if (value !== '') {
                    if (userSelection === '') {
                        whiteStart = (/^(?:.*\n)?([ \t]*)$/.exec(userStart) || [null, ''])[1];
                        start = userStart.substring(0, userStart.length - whiteStart.length);
                        whiteEnd = /^([ \t]*)/.exec(userEnd)[1];
                        selection = (whiteStart + whiteEnd).replace(/^ *(\t) */gm, ' ');
                        end = userEnd.substring(whiteEnd.length);
                    } else {
                        whiteStart = (/^(?:.*\n)?([ \t]*)$/.exec(userStart) || [null, userStart.substring(userStart.lastIndexOf('\n') + 1)])[1];
                        start = userStart.substring(0, userStart.length - whiteStart.length);
                        selection = whiteStart + userSelection;
                        if (userEnd !== '' && selection[selection.length - 1] !== '\n') {
                            whiteEnd = userEnd.substring(0, (userEnd.indexOf('\n') + 1) || undefined);
                            selection += whiteEnd;
                            end = userEnd.substring(whiteEnd.length);
                        } else {
                            end = userEnd;
                        }
                        selection = selection.replace(/^ *(\t) */gm, ' ');
                    }
                    selection = shift ?
                        selection.replace(tab.pattern, '') :
                        tab.str + selection.split('\n').join('\n' + tab.str);
                    this.value = start + selection + end;
                    posEnd = this.value.length - end.length;
                    this.focus();
                    this.setSelectionRange(userSelection === '' ? posEnd : start.length, posEnd);
                } else {
                    this.value = shift ? '' : tab.str;
                }
                event.preventDefault();
                event.returnValue = false;
                return false;
            }
        };
    }());
    onkey = function onkey(event) {
        if (event.keyCode === 16) {
            shift = event.type === 'keydown';
        } else if (event.keyCode === 17) {
            ctrl = event.type === 'keydown';
        }
    };
    externalOnclick = function externalOnclick(event) {
        var node, xhr;
        if (!shift && ctrl) {
            node = this;
            if (node.uploadedCode === null) {
                xhr = new XMLHttpRequest();
                xhr.open('GET', node.href);
                xhr.onreadystatechange = function (event) {
                    if (xhr.readyState === 4) {
                        if(xhr.status === 200) {
                            node.uploadedCode = clean(xhr.responseText);
                            viewCode(node);
                        }
                    };
                }
                xhr.send(null);
            } else {
                viewCode(node);
            }
            event.preventDefault();
            return false;
        }
    };
    internalOnclick = function internalOnclick(event) {
        var node, xhr;
        if (!shift && ctrl) {
            node = this;
            if (node.uploadedCode === null) {
                node.uploadedCode = clean(node.innerHTML);
            }
            viewCode(node);
        }
    };
    viewCode = function viewCode(node) {
        insererCode.click();
        document.querySelector('#dlgCodeColoration option[value="' + node.uploadedCodeOption +'"]').selected = 'selected';
        dlgCodeContenu.value = node.uploadedCode;
    };
    clean = function (code) {
        var pre, nodeList, lines, cleanLines, iterator;
        pre = document.createElement('pre');
        pre.innerHTML = code;
        nodeList = pre.getElementsByTagName('pre');
        if (nodeList.length !== 0) {
            pre = nodeList[1];
        }
        lines = pre.innerHTML.split(/&nbsp;<br>/);
        cleanLines = [];
        for (iterator in lines) {
            if (lines.hasOwnProperty(iterator)) {
                pre.innerHTML = lines[iterator];
                cleanLines.push(pre.textContent);
            }
        }
        return cleanLines.join('\n');
    };
    document.getElementById('conversations').addEventListener('DOMSubtreeModified', parse, false);
    window.addEventListener('keydown', onkey, true);
    window.addEventListener('keyup', onkey, true);
}));