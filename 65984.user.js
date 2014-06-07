// ==UserScript==
// @name           vBulletin Editor Mod
// @namespace      tag:Manko10@php.de,2008-03-09:MankoEdMod
// @description    Customize the vBulletin default editor on php.de (and maybe any other vBulletin 3.x powered website)
// @include        http://www.php.de/*
// @license        MIT License
// @version        3.2.1
// ==/UserScript==


/*
    -----------------------------------------------------------------------------
    Copyright (C) 2008-2011 by Janek Bevendorff

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
    -----------------------------------------------------------------------------
*/


/**
 * Set correct window.Node
 */
window.Node = {
    ELEMENT_NODE                : 1,
    ATTRIBUTE_NODE              : 2,
    TEXT_NODE                   : 3,
    CDATA_SECTION_NODE          : 4,
    ENTITY_REFERENCE_NODE       : 5,
    ENTITY_NODE                 : 6,
    PROCESSING_INSTRUCTION_NODE : 7,
    COMMENT_NODE                : 8,
    DOCUMENT_NODE               : 9,
    DOCUMENT_TYPE_NODE          : 10,
    DOCUMENT_FRAGMENT_NODE      : 11,
    NOTATION_NODE               : 12 
};


/**
 * Ensure the script also works well in non-GM environments.
 */ 
if (typeof unsafeWindow == 'undefined') {
    unsafeWindow = window;
}

// if in non-Greasemonkey environment
if (typeof GM_getValue == 'undefined' && typeof GM_getValue('a', 'b') == 'undefined') {
    var __isChrome           = (typeof chrome != 'undefined' && typeof chrome.extension != 'undefined');
    var __chromeLocalStorage = null;
    
    // quick and very dirty workaround for simulating synchronous fetch
    function __updateChromeLocalStorage() {
        chrome.extension.sendRequest({'action' : 'getLocalStorage'}, function(response) {
            if (typeof chrome.extension.lastError == 'undefined') {
                __chromeLocalStorage = response;
            } else {
                GM_log('EditorMod Warning: Could not access background page, falling back to unsafe localStorage. Deletion of browsing data will wipe your configuration!');
            }
        });
    }
    
    if (__isChrome) {
        __updateChromeLocalStorage();
    } else {
        GM_log('EditorMod Warning: Not a Chrome extension, falling back to unsafe localStorage. Deletion of browsing data will wipe your configuration!');
    }
    
    // redefine GM_* functions
    function GM_getValue(name, defaultValue) {
        // use unsafe localStorage if necessary
        if (null === __chromeLocalStorage || !__isChrome) {
            var data = localStorage.getItem(name);
        } else {
            var data = __chromeLocalStorage[name];
        }
        return data == null ? defaultValue : data;
    };
    
    function GM_setValue(name, value) {
        if (null === __chromeLocalStorage || !__isChrome) {
            localStorage.setItem(name, value);
        } else {
            __chromeLocalStorage[name] = value;
            chrome.extension.sendRequest({
                'action' : 'setLocalStorage',
                'data'   : __chromeLocalStorage
            });
        }
    };
    
    function GM_log(msg) {
        if (unsafeWindow['console'] && unsafeWindow.console['info']) {
            unsafeWindow.console.info(msg);
        } else if (unsafeWindow['console'] && unsafeWindow.console['log']) {
            unsafeWindow.console.log(msg);
        } else if (opera && opera['postError']) {
            opera.postError(msg);
        }
    };
    
    function GM_registerMenuCommand(caption, commandFunc) {
        var menu     = document.getElementById('usercptools_menu');
        var menuBody = menu.getElementsByTagName('tbody')[0];
        
        if (!document.getElementById('vbmod-menucommands')) {
            var header       = document.createElement('td');
            header.innerHTML = 'vBulletin EditorMod';
            header.className = 'thead';
            header.setAttribute('id', 'vbmod-menucommands');
            
            var row = document.createElement('tr');
            row.appendChild(header);
            menuBody.appendChild(row);
        }
        
        var entry       = document.createElement('td');
        entry.className = 'vbmenu_option vbmenu_option_alink';
        entry.addEventListener('mouseover', function() { this.className = 'vbmenu_hilite vbmenu_hilite _alink'; });
        entry.addEventListener('mouseout', function() { this.className = 'vbmenu_option vbmenu_option_alink'; });
        var triggerLink = document.createElement('a');
        
        triggerLink.setAttribute('rel', 'nofollow');
        triggerLink.setAttribute('href', '#');
        triggerLink.addEventListener('click', function(e) {
            commandFunc();
            e.preventDefault();
        });
        triggerLink.innerHTML = caption;
        
        entry.appendChild(triggerLink);
        var row = document.createElement('tr');
        row.appendChild(entry);
        menuBody.appendChild(row);
    };
    
}


/**
 * Main script
 */
(function() {
    
    /**
     * Internationalization
     */
    var i18n =  {
        phrases : {
            'en-US' : {
                'ok'                  : 'OK',
                'cancel'              : 'Cancel',
                'confMenuEntry'       : 'Add/Remove Buttons',
                'defaultConf'         : '<?xml version="1.0" encoding="utf-8"?>\n<!DOCTYPE editorOverlay SYSTEM "http://www.openwebboard.org/editor-mod/editor-mod-3.dtd">\n<editorOverlay xmlns="http://www.openwebboard.org/editor-mod">\n    <menustrip>\n        <section type="fieldset" legend="I am legend ;-)">\n            <!-- Your buttons here -->\n        </section>\n    </menustrip>\n</editorOverlay>',
                'cancelConfirmation'  : 'The document has been modified.\nAre you sure you want to cancel? You\'ll loose all changes!',
                'XMLCompilationError' : 'Failed the test of well-formedness.\nSee the error message below:\n\n',
                'noDOMAvailable'      : 'Sorry, but I couldn\'t process anything since there\'s no DOM available.',
                'XMLNotValid'         : 'Sorry, but your XML is not valid!',
                'saveMsg'             : 'You must reload the page for the changes to take effect.'
            },
            'de-DE' : {
                'ok'                  : 'OK',
                'confMenuEntry'       : 'Buttons hinzufügen/entfernen',
                'cancel'              : 'Abbrechen',
                'defaultConf'         : '<?xml version="1.0" encoding="utf-8"?>\n<!DOCTYPE editorOverlay SYSTEM "http://www.openwebboard.org/editor-mod/editor-mod-3.dtd">\n<editorOverlay xmlns="http://www.openwebboard.org/editor-mod">\n    <menustrip>\n        <section type="fieldset" legend="I am legend ;-)">\n            <!-- Hier kommen deine Buttons hin -->\n        </section>\n    </menustrip>\n</editorOverlay>',
                'cancelConfirmation'  : 'Das Dokument wurde geändert.\nBist du sicher, dass du abbrechen willst? Alle Änderungen gehen dabei verloren!',
                'XMLCompilationError' : 'Test auf Wohlgeformtheit fehlgeschlagen.\nSiehe die folgende Fehlermeldung:\n\n',
                'noDOMAvailable'      : 'Entschuldigung, aber es war mir nicht möglich, etwas zu verarbeiten, weil schlicht kein DOM da ist.',
                'XMLNotValid'         : 'Entschuldige bitte, aber dein XML ist nicht valide!',
                'saveMsg'             : 'Du musst die Seite neu laden, damit die Änderungen sichtbar werden.'
            }
        },
        
        /**
         * Default locale (fallback, make sure all phrases exists!)
         */
        defaultLocale: 'en-US',
        
        /**
         * Currently set locale.
         */
        curLocale : 'en-US',
        
        /**
         * Change the current locale.
         * 
         * @param string locale
         */
        setLocale : function(locale) {
            if (this.phrases[locale]) {
                this.curLocale = locale;
            };
        },
        
        /**
         * Get all phrases from current locale.
         * 
         * @return object
         */
        get : function() {
            if (this.phrases[this.curLocale]) {
                return this.phrases[this.curLocale];
            };
            
            return new Object();
        },
        
        /**
         * Get phrase from current locale.
         * Returns null if phrase does not exist.
         * 
         * @param string key
         * @return string
         */
        getPhrase : function(key) {
            if (this.phrases[this.curLocale][key]) {
                return this.phrases[this.curLocale][key];
            } else if (this.phrases[this.defaultLocale][key]) {
                return this.phrases[this.defaultLocale][key];
            };
            
            return null;
        }
    };
    
    
    /**
     * User configuration
     */
    var Cfg = {
        oldConfigText : null,
        
        /**
         * Create a configuration input dialog box.
         */
        showConfigLightBox : function() {
            // cache old config text
            this.oldConfigText = GM_getValue('xmlConfig', i18n.get().defaultConf);
            
            var layer = document.createElement('div');
            layer.appendChild(document.createElement('div'));
            Helpers.assignStyles(layer.lastChild, {
                'backgroundColor' : '#000',
                'opacity'         : .6,
                'position'        : 'absolute',
                'height'          : '100%',
                'width'           : '100%',
                'top'             : document.getElementsByTagName('html')[0].scrollTop  + 'px',
                'left'            : document.getElementsByTagName('html')[0].scrollLeft + 'px',
                'z-index'         : 10000
            });
            Helpers.assignStyles(document.body, {
                'overflow' : 'hidden'
            });
            
            // create wrapped textarea
            var txtareaWrapper  = document.createElement('div');
            Helpers.assignStyles(txtareaWrapper, {
                'width'      : '70%',
                'height'     : '80%',
                'position'   : 'absolute',
                'top'        : '10%',
                'left'       : '15%',
                'marginTop'  : document.getElementsByTagName('html')[0].scrollTop  + 'px',
                'marginLeft' : document.getElementsByTagName('html')[0].scrollLeft + 'px',
                'z-index'    : 10001
            });
            layer.appendChild(txtareaWrapper);
            
            var txtarea = document.createElement('textarea');
            with (txtarea) {
                cols = 120;
                rows = 30;
                setAttribute ('wrap' , 'off' , false);
                appendChild(document.createTextNode(this.oldConfigText));
            };
            
            Helpers.assignStyles(txtarea, {
                'border'     : '3px double #333',
                'width'      : '100%'           ,
                'height'     : '100%'           ,
                'fontFamily' : 'monospace'      ,
                'padding'    : '.4em'           ,
                'whiteSpace' : 'pre'            ,
                'overflow'   : 'scroll'         ,
                'overflowX'  : 'scroll'
            });
            txtareaWrapper.appendChild(txtarea);
            
            txtareaWrapper.appendChild(document.createElement('div'));
            Helpers.assignStyles(txtareaWrapper.lastChild, {
                'margin'    : '5px',
                'textAlign' : 'center'
            });
            
            // create buttons
            var cmdOK = document.createElement('button');
            cmdOK.appendChild(document.createTextNode(i18n.get().ok));
            txtareaWrapper.lastChild.appendChild(cmdOK);
            Helpers.assignStyles(cmdOK, {
                'marginRight' : '3px',
                'width'       : '80px'
            });
            var cmdCancel = document.createElement('button');
            cmdCancel.appendChild(document.createTextNode(i18n.get().cancel));
            txtareaWrapper.lastChild.appendChild(cmdCancel);
            Helpers.assignStyles(cmdCancel, {
                'marginLeft' : '3px',
                'width'      : '80px'
            });
            
            
            // add event listeners to layer and buttons
            layer.addEventListener('click', function(e) {
                if (e.target == txtarea) {
                    return;
                };
                
                Cfg.hideConfigLightBox(layer);
                e.stopPropagation();
            }, false);
            
            cmdCancel.addEventListener('click', function(e) {
                Cfg.hideConfigLightBox(layer);
                e.stopPropagation();
            }, true);
            
            cmdOK.addEventListener('click', function(e) {
                Cfg.hideConfigLightBox(layer, true);
                e.stopPropagation();
            }, true);
            
            
            // attach layer to body
            document.body.appendChild(layer);
            txtarea.focus();
        },
        
        
        /**
         * Hide the configuration input dialog and save contents if needed.
         * 
         * @param node lightbox
         * @param bool doSave
         * @return bool
         */
        hideConfigLightBox : function(lightbox, doSave) {
            var newConfigText = lightbox.getElementsByTagName('textarea')[0].value;
            
            if (!doSave && this.oldConfigText != newConfigText) {
                if (!confirm(i18n.get().cancelConfirmation)) {
                    return false;
                };
            } else if (doSave) {
                if (!this.saveConfigFromLightBox(newConfigText)) {
                    return false;
                };
            };
            
            document.body.removeChild(lightbox);
            Helpers.assignStyles(document.body, {
                'overflow' : 'visible'
            });
            this.oldConfigText = null;
            return true;
        },
        
        /**
         * Save configuration.
         * 
         * @param string newConfigText
         * @return bool
         */
        saveConfigFromLightBox : function(newConfigText) {
            // check for well-formedness
            if (Helpers.checkXMLWellFormedness(newConfigText)) {
                // save to about:config
                GM_setValue('xmlConfig', newConfigText);
                return true;
            };
            return false;
        },
        
        /**
         * Set User Script Command menu entry.
         */
        setMenuEntry : function() {
            GM_registerMenuCommand(
                i18n.get().confMenuEntry,
                function() {
                    Cfg.showConfigLightBox();
                }
            );
        }
    };
    
    
    /**
     * Controls processor
     */
    function ControlSet() {
        var that           = this;
        var srcDOM         = null;
        var srcText        = GM_getValue('xmlConfig');
        var controlHandler = null;
        var editorElement  = {
            element        : null,
            insertPosition : null,
            mode           : null
        };
        this.nothingToProcess = false;
        
        
        if (!Helpers.checkXMLWellFormedness(srcText, true)) {
            GM_log(i18n.get().XMLNotValid);
            this.nothingToProcess = true;
            return;
        };
        srcDOM = new DOMParser().parseFromString(srcText, 'text/xml');
        
        if (null === srcDOM) {
            GM_log(i18n.get().noDOMAvailable);
            this.nothingToProcess = true;
            return;
        };
        
        if (!findEditor()) {
            this.nothingToProcess = true;
            return;
        };
        
        
        /**
         * Find the editor element to work on.
         * Returns false if found none.
         * 
         * @return bool
         */
        function findEditor() {
            // check if quick editor
            if (document.getElementById('vB_Editor_QE_' + ControlSet.editCounter + '_editor')) {
                editorElement.element        = document.getElementById('vB_Editor_QE_' + ControlSet.editCounter + '_editor');
                editorElement.insertPosition = document.getElementById('vB_Editor_QE_' + ControlSet.editCounter + '_controls');
                editorElement.mode = 'editmode';
                return true;
            } else {
                if (document.getElementById('vB_Editor_QR')) {
                    editorElement.element        = document.getElementById('vB_Editor_QR');
                    editorElement.insertPosition = document.getElementById('vB_Editor_QR_controls');
                    editorElement.mode = 'quickmode';
                    return true;
                } else if (document.getElementById('vB_Editor_001')) {
                    editorElement.element        = document.getElementById('vB_Editor_001');
                    editorElement.insertPosition = document.getElementById('vB_Editor_001_controls');
                    editorElement.mode = 'fullmode';
                    return true;
                };
            };
            
            return false;
        };
        
        
        /**
         * Return the current editor element
         * 
         * @return node
         */
        this.getEditor = function() {
            return editorElement;
        };
        
        /**
         * Only call this method, all the others are called automatically.
         * This method does not cache the DOM once it's generated due to the cloneNode() problem
         * with DOM events. It would be more complicated to fix that than to parse
         * the code again.
         * 
         * @param CtrlHandlers handler
         */
        this.processButtons = function(handler) {
            if (!editorElement.element || !srcDOM) {
                return;
            };
            
            if (!handler) {
                handler = new CtrlHandlers();
            };
            controlHandler = handler;
            
            // get source DOM (ignore leading whitespace)
            var XMLRoot = (Node.DOCUMENT_TYPE_NODE == srcDOM.firstChild.nodeType) ? srcDOM.childNodes[1] : srcDOM.firstChild;
            
            // begin processing the DOM recursively
            var resultDOM = that.traverseSourceDOM(XMLRoot);
            if (null === resultDOM) {
                GM_log('Could not process controls.');
                return;
            };
            
            
            // insert resultDOM into document
            // be careful not to use resultDOM.childNodes.length directly in the
            // loop since it will decrease when you move the elements!
            var len = resultDOM.childNodes.length;
            for (var i = 0; i < len; ++i) {
                editorElement.insertPosition.appendChild(resultDOM.firstChild);
            };
        };
        
        /**
         * This method will return false when DOMNode is not an element node or if no
         * handler could be found for that element, otherwise the processed
         * element is returned.
         * Returns null on failure.
         * 
         * @param node DOMNode
         * @return CtrlHandlers
         */
        this.traverseSourceDOM = function(DOMNode) {
            try {
                // ignore non-element nodes
                if (Node.ELEMENT_NODE !== DOMNode.nodeType || !controlHandler) {
                    return null;
                };
                
                // if this element is just for a specific mode and we are not in this mode or vice versa
                if (DOMNode.hasAttribute('display')) {
                    var show = false;
                    var displayIn = DOMNode.getAttribute('display').split(' ');
                    for(var i in displayIn) {
                         if (displayIn[i] == editorElement.mode) {
                            show = true;
                            break;
                        };
                    };
                    if (!show) {
                        return null;
                    };
                };
                if (DOMNode.hasAttribute('displaynot')) {
                    var show = true;
                    var displayNotIn = DOMNode.getAttribute('displaynot').split(' ');
                    for(var i in displayNotIn) {
                         if (displayNotIn[i] == editorElement.mode) {
                            show = false;
                            break;
                        };
                    };
                    if (!show) {
                        return null;
                    };
                };
                
                // if no handler for current element available, continue
                if (typeof controlHandler[DOMNode.nodeName.toLowerCase()] == 'undefined') {
                    GM_log('Could not find handler for element "' + DOMNode.nodeName.toLowerCase() + '", ignoring it.');
                    return null;
                };
                
                return controlHandler[DOMNode.nodeName.toLowerCase()](DOMNode, that);
            } catch (ex) {
                GM_log('Error processing DOM! Message: ' + ex);
                return null;
            };
        };
    };
    
    /**
     * Number of performed edits (important for the quick editor)
     */
    ControlSet.editCounter = 1;
    
    
    
    /**
     * Control handlers for processing the control types like menustrip, section, button, select etc.
     * All Control handlers have the the lowercase name of the element they shall process.
     * 
     * NOTE: it is each control handler's responsibility to check for child nodes and to append them.
     * This will give you the oppurtunity to control the processing of child nodes!
     * The return value must always be the resulting DOM.
     */
    function CtrlHandlers() {
        
    };
    
    /**
     * Control Handler: Root node
     * DON'T MODIFY THIS CONTROL HANDLER (unless you know what you're doing)!
     * 
     * @param node element
     * @param ControlSet cset
     */
    CtrlHandlers.prototype.editoroverlay = function(element, cset) {
        // it's irrelevant which (block level) element it is, it's just a root
        // container to which all other elements will be appended:
        var resultDOM = document.createElement('div');
        for (var i in element.childNodes) {
            var processed = cset.traverseSourceDOM(element.childNodes[i]);
            if (null !== processed) {
                resultDOM.appendChild(processed);
            };
        };
        
        return resultDOM;
    };
    
    /**
     * Control Handler: Menustrip
     * 
     * @param node element
     * @param ControlSet cset
     */
    CtrlHandlers.prototype.menustrip = function(element, cset) {
        var resultDOM = Helpers.createTableStructure();
        for (var i in element.childNodes) {
            var td        = document.createElement('td');
            var processed = cset.traverseSourceDOM(element.childNodes[i]);
            if (null !== processed) {
                td.appendChild(processed);
                resultDOM.getElementsByTagName('tr')[0].appendChild(td);
            };
        };
        return resultDOM;
    };
    
    /**
     * Control Handler: Section
     * 
     * @param node element
     * @param ControlSet cset
     */
    CtrlHandlers.prototype.section = function(element, cset) {
        var resultDOM   = null;
        var sectionType = element.getAttribute('type');
        
        // be generic to make it easy to implement other section types in future
        switch (sectionType) {
            case 'fieldset':
                resultDOM = document.createElement(sectionType);
                resultDOM.setAttribute('class', 'fieldseteditor');
                if (element.getAttribute('legend')) {
                    var legend = document.createElement('legend')
                    legend.appendChild(document.createTextNode(element.getAttribute('legend')));
                    resultDOM.appendChild(legend);
                };
                break;
            
            default:
                resultDOM = document.createElement('div');
        };
        
        
        resultDOM.appendChild(Helpers.createTableStructure());
        
        for (var i in element.childNodes) {
            var td        = document.createElement('td');
            var processed = cset.traverseSourceDOM(element.childNodes[i]);
            if (null !== processed) {
                td.appendChild(processed);
                resultDOM.getElementsByTagName('tr')[0].appendChild(td);
            };
        };
        return resultDOM;
    };
    
    /**
     * Control Handler: Button
     * 
     * @param node element
     * @param ControlSet cset
     */
    CtrlHandlers.prototype.button = function(element, cset) {
        var resultDOM = document.createElement('div');
        
        // parse parameters
        var paramNodes = element.getElementsByTagName('param');
        var params     = {
            'url'          : null,
            'text'         : null,
            'height'       : null,
            'width'        : null,
            'insertbefore' : '',
            'insertafter'  : ''
        };
        for (var paramCnt in paramNodes) {
            params[paramNodes.item(paramCnt).getAttribute('name').toLowerCase()] = paramNodes.item(paramCnt).getAttribute('value');
        };
        
        if (typeof params['text'] == 'undefined') {
            GM_log('Could not process button since no parameter "text" was specified');
            return;
        };
        
        if (params.url !== null) {
            // image button
            resultDOM.setAttribute('class', 'imagebutton');
            var img = document.createElement('img');
            
            if (params.height !== null) {
                img.setAttribute('height', parseInt(params.height));
            };
            if (params.width !== null) {
                img.setAttribute('width', parseInt(params.width));
            };
            
            img.setAttribute('src',   params.url);
            img.setAttribute('alt',   params.text);
            img.setAttribute('title', params.text);
            resultDOM.appendChild(img);
        } else {
            // text button
            resultDOM.appendChild(document.createTextNode(params.text));
        };
        
        resultDOM.setAttribute('vbmod-insertBefore', params.insertbefore);
        resultDOM.setAttribute('vbmod-insertAfter', params.insertafter);
        
        // set script if specified
        var scriptNodes = element.getElementsByTagName('script');
        if (typeof scriptNodes[0] != 'undefined') {
            resultDOM.setAttribute('vbmod-script', scriptNodes[0].firstChild.nodeValue);
        };
        
        Helpers.assignStyles(resultDOM, {
            'border'                        : 'medium none',
            'cursor'                        : 'default',
            'padding'                       : '1px',
            'background'                    : 'rgb(225, 225, 226) none repeat scroll 0% 0%',
            'MozBackgroundClip'             : 'border',
            'MozBackgroundOrigin'           : 'paddingm',
            'Moz-BackgroundInlinePolicy'    : 'continuous',
            'color'                         : 'rgb(0, 0, 0)'
        });
        
        // hover events
        resultDOM.addEventListener('mouseover', function() {
            Helpers.assignStyles(this, {
                'border'                   : '1px solid rgb(49, 106, 197)',
                'padding'                  : '0px',
                'background'               : 'rgb(193, 210, 238) none repeat scroll 0% 0%',
                'MozBackgroundClip'        : '-moz-initial',
                'MozBackgroundOrigin'      : '-moz-initial',
                'MozBackgroundInlinePolicy': '-moz-initial',
                'color'                    : 'rgb(0, 0, 0)'
            });
        }, true);
        resultDOM.addEventListener('mouseout', function() {
            Helpers.assignStyles(this, {
                'border'                   : 'medium none',
                'padding'                  : '1px',
                'background'               : 'rgb(225, 225, 226) none repeat scroll 0% 0%',
                'MozBackgroundClip'        : '-moz-initial',
                'MozBackgroundOrigin'      : '-moz-initial',
                'MozBackgroundInlinePolicy': '-moz-initial',
                'color'                    : 'rgb(0, 0, 0)'
            });
        }, true);
        
        // set editor information to make more than one editor at once working
        resultDOM.setAttribute('vbmod-editorId', cset.getEditor().element.getAttribute('id'));
        
        // click event
        Helpers.registerActionEvent('click', resultDOM);
        
        return resultDOM;
    };
    
    /**
     * Control Handler: Select field
     * 
     * @param node element
     * @param ControlSet cset
     */
    CtrlHandlers.prototype.select = function(element, cset) {
        // firstly read paramters
        var selectParams = {
            'text' : null
        };
        for (var i = 0; i < element.childNodes.length; ++i) {
            if ('param' == element.childNodes[i].nodeName) {
                selectParams[element.childNodes[i].getAttribute('name').toLowerCase()] = element.childNodes[i].getAttribute('value');
            };
        };
        
        if (null === selectParams['text']) {
            GM_log('Could not process select menu since no parameter "text" was specified');
            return document.createTextNode('');
        };
        
        var resultDOM = document.createElement('select');
        
        // create first element from select description text (acts as a pseudo label and
        // has no further functionality except to ensure that the onchange works properly)
        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode(selectParams['text']));
        resultDOM.appendChild(opt);
        
        var options = element.getElementsByTagName('option');
        for (var i = 0; i < options.length; ++i) {
            var opt = document.createElement('option');
            var optParams = {
                'text'         : '',
                'insertbefore' : '',
                'insertafter'  : ''
            };
            
            // process paramters
            var paramNodes = options[i].getElementsByTagName('param');
            for (var paramCnt in paramNodes) {
                optParams[paramNodes.item(paramCnt).getAttribute('name').toLowerCase()] = paramNodes.item(paramCnt).getAttribute('value');
            };
            if (typeof optParams['text'] == 'undefined') {
                GM_log('Could not process option since no parameter "text" was specified');
                continue;
            };
            
            opt.setAttribute('vbmod-insertbefore', optParams.insertbefore);
            opt.setAttribute('vbmod-insertafter', optParams.insertafter);
            
            var scriptNodes = options[i].getElementsByTagName('script');
            if (typeof scriptNodes[0] != 'undefined') {
                opt.setAttribute('vbmod-script', scriptNodes[0].firstChild.nodeValue);
            };
            
            opt.appendChild(document.createTextNode(optParams.text));
            resultDOM.appendChild(opt);
        };
        
        // set editor information to make more than one editor at once working
        resultDOM.setAttribute('vbmod-editorId', cset.getEditor().element.getAttribute('id'));
        
        // change event
        Helpers.registerActionEvent('change', resultDOM);
        
        return resultDOM;
    };
    
    
    
    /**
     * Helper methods
     */
    var Helpers = {
        /**
         * Assign styles to a specified element. These styles must have JavaScript syntax
         * (use camelCase instead of dashes).
         * 
         * @param node el
         * @param object styles
         */
        assignStyles : function(el, styles) {
            for (var msCnt in styles) {
                el.style[msCnt] = styles[msCnt];
            };
        },
        
        /**
         * Check an XML string for well-formedness. If you don't set the second parameter to false an alert with
         * an error message will be shown in case of compilation errors.
         * 
         * @param string xmlString
         * @param bool suppressAlert
         * @return bool
         */
        checkXMLWellFormedness : function(xmlString, suppressAlert) {
            var DOM = new DOMParser().parseFromString(xmlString, 'text/xml');
            with (DOM.documentElement) {
                if (tagName == 'parseerror' || namespaceURI == 'http://www.mozilla.org/newlayout/xml/parsererror.xml') {
                    if (!suppressAlert) {
                        alert(i18n.get().XMLCompilationError + firstChild.nodeValue);
                    } else {
                        GM_log(i18n.get().XMLCompilationError + firstChild.nodeValue);
                    };
                    return false;
                };
            };
            
            return true;
        },
        
        /**
         * Create a table structure which vBulletin loves. Yes, there're all the
         * same stupid tables over and over...
         * 
         * @return node
         */
        createTableStructure : function() {
            var table = document.createElement('table');
            
            // I'm sorry, but these bad attributes are preset by the original tables:
            with (table) {
                setAttribute('cellpadding', 0);
                setAttribute('cellspacing', 0);
                setAttribute('border',      0);
                appendChild(document.createElement('tbody'));
                lastChild.appendChild(document.createElement('tr'));
            };
            
            return table;        
        },
        
        /**
         * Replace variables with a replacement string.
         * 
         * @param string variableName
         * @param string variableValue
         * @param string originalString
         */
        replaceVariables : function(variableName, variableValue, originalString) {
            var pos = 0, prevPos = 0, newString = originalString;
            
            while ((pos = newString.indexOf('$' + variableName, prevPos)) > -1) {
                if (!/[^\w_]/.test(newString.charAt(pos + variableName.length + 1)) && pos + variableName.length + 1 < newString.length) {
                    prevPos = pos + variableName.length + 1;
                    continue;
                };
                
                var escPos = pos;
                while (-1 < escPos && '\\' == newString.charAt(escPos - 1)) {
                    --escPos;
                };
                
                var before  = newString.slice(0, escPos);
                var after   = newString.slice(pos + 1 + variableName.length);
                var escPart = newString.slice(escPos, pos);
                var varPart = (escPart.length & 1) ? '$' + variableName : variableValue;
                escPart     = escPart.substr(0, Math.floor(escPart.length / 2));
                
                newString = before  + escPart + varPart + after;
                prevPos   = (before + escPart + varPart).length;
            };
            
            if (!prevPos) {
                return originalString;
            };
            return newString;
        },
        
        /**
         * Add click event listener to perform the defined action for given control element.
         * 
         * @param string event
         * @param node element
         */
        registerActionEvent : function(event, element) {
            element.addEventListener(event, function() {
                var script = null;
                
                // if select element
                if (event == 'change') {
                    var insBefore = this.options[this.selectedIndex].getAttribute('vbmod-insertbefore').replace(/\\n/g, '\n');
                    var insAfter  = this.options[this.selectedIndex].getAttribute('vbmod-insertafter').replace(/\\n/g, '\n');
                    if (this.options[this.selectedIndex].hasAttribute('vbmod-script')) {
                        script = this.options[this.selectedIndex].getAttribute('vbmod-script');
                    };
                    // reset select element to first index otherwise onchange wont't
                    // work for this index anymore until another one is selected
                    this.selectedIndex = 0;
                } else {
                    var insBefore = this.getAttribute('vbmod-insertbefore').replace(/\\n/g, '\n');
                    var insAfter  = this.getAttribute('vbmod-insertafter').replace(/\\n/g, '\n');
                    if (this.hasAttribute('vbmod-script')) {
                        script = this.getAttribute('vbmod-script');
                    };
                };
                
                var editorId = this.getAttribute('vbmod-editorId');
                
                if (script !== null) {
                    var returnValues = Helpers.secureEval(script, {
                        'editorId' : editorId
                    });
                    
                    if (typeof returnValues != 'object') {
                        returnValues = [returnValues];
                    };
                    
                    for (var i in returnValues) {
                        insBefore = Helpers.replaceVariables(i, returnValues[i], insBefore);
                        insAfter  = Helpers.replaceVariables(i, returnValues[i], insAfter);
                    };
                };
                
                Helpers.insertText(insBefore, insAfter, editorId);
            }, true);
        },
        
        /**
         * Insert text into specified editor.
         * 
         * @param string startTag
         * @param string endTag
         * @param string editorId
         */
        insertText : function(startTag, endTag, editorId) {
            if (!editorId) {
                return;
            };
            var textareaElement = document.getElementById(editorId).getElementsByTagName('textarea')[0];
            textareaElement.focus();
            
            // save current scrolling position
            var scrollTop  = textareaElement.scrollTop;
            var scrollLeft = textareaElement.scrollLeft;
            
            var start      = textareaElement.selectionStart;
            var end        = textareaElement.selectionEnd;
            var insText    = textareaElement.value.substring(start, end);
            textareaElement.value = textareaElement.value.substr(0, start) + startTag + insText + endTag + textareaElement.value.substr(end);
            
            var pos;
            if (insText.length == 0) {
                pos = start + startTag.length;
            } else {
                pos = start + startTag.length + insText.length + endTag.length;
            };
            textareaElement.selectionStart = pos;
            textareaElement.selectionEnd   = pos;
            
            // reset scrolling
            textareaElement.scrollTop  = scrollTop;
            textareaElement.scrollLeft = scrollLeft;
        },
        
        /**
         * Add event to insert control set into quick editors.
         * 
         * @param object controlHandler
         */
        listenForQuickEditors : function(controlHandler) {
            if (!controlHandler) {
                controlHandler = CtrlHandlers;
            };
            
            var quickEditEventHandler = function() {
                if (document.getElementById('vB_Editor_QE_' + ControlSet.editCounter + '_controls')) {
                    new ControlSet().processButtons(new controlHandler());
                    // increase counter for next quick editor
                    ++ControlSet.editCounter;
                };
            };
            
            document.addEventListener('DOMSubtreeModified', function() {
                // Workaround for GreaseMonkey bug
                setTimeout(quickEditEventHandler, 0);
            }, true);
        },
        
        /**
         * Use this function to securely execute script content inside the unprivileged user scope.
         * You can also pass a key:value object of closure variables which shall be available in
         * the eval context.
         * 
         * @param string source
         * @param object closures
         * @return mixed
         */
        secureEval : function(source, closures) {
            var closureString = '';
            if (closures) {
                for (var i in closures) {
                    closureString += 'var ' + i + ' = atob("' + btoa(closures[i]) + '");';
                };
            };
            
            source = '(function() {' +
                closureString +
                'document.getElementsByTagName("script")[document.getElementsByTagName("script").length -1].setAttribute(' +
                    '"vbmod-scriptreturn", JSON.stringify((function() { ' + source + ';})())' +
                ');' +
            '})();';
            
            // create script node
            var script = document.createElement('script');
            script.setAttribute('type', 'application/javascript');
            script.setAttribute('vbmod-scriptreturn', '');
            script.textContent = source;
            
            try {
                // insert script
                var scriptElement = document.body.appendChild(script);
                
                // get return object
                try {
                    var returnObj = JSON.parse(scriptElement.getAttribute('vbmod-scriptreturn'));
                } catch (e) {
                    GM_log('No parseable return value, skipping… ');
                };
                
                // remove script element
                document.body.removeChild(script);
                
                return returnObj;
            } catch (ex) {
                GM_log('User script error: ' + ex);
                return new Object();
            };
        },
    };    
    
    
    /**
     * Add your custom Control Handlers below this line.
     */
     
    
    /**
     * Initialization
     */
    function __init() {
        i18n.setLocale('en-US');
        Cfg.setMenuEntry();
        Helpers.listenForQuickEditors(CtrlHandlers);
        
        var cset = new ControlSet();
        if (true !== cset.nothingToProcess) {
            cset.processButtons(new CtrlHandlers());
        };
    }
    
    // very ugly but necessary hack for synchronous localStorage fetching in Chrome
    if (typeof __isChrome != 'undefined' && __isChrome) {
        setTimeout(__init, 500);
    } else {
        __init();
    }
})();