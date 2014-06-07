// ==UserScript==
// @name       Feedly Page Previewer
// @namespace  http://mikaelporttila.se/
// @version    0.5.4
// @description  Never leave Feedly to view page.
// @match      http://www.feedly.com/*
// @match      http://cloud.feedly.com/*

// @copyright  2012+, Mikael Porttila
// ==/UserScript==

(function(){
    var previewer = (function () {

        //  Key enum.
        //  No more magic numbers.
        var keyCodes = {
            leftMouse: 1,
            middleMouse: 2,
            ESC : 27
        }

        var FeedlyPreviewer = {
            frame: null,
            frameContent: null,
            Core: {
                hijackHeaderLinks: function () {
                    //	Hijack all external
                    //	Page urls.

                    document.onclick = function (e) {
                        //Handle incoming click-events.  
                        //Check if target is rss-news source target link.  

                        e = e || window.event;
                        var element = e.target || e.srcElement;
                        if (e.which != FeedlyPreviewer.Settings.loadMouseKeySetting()) {     //  Ignore if click event was 
                            return;             //  fired by middle mouse button.
                        }

                        //Make sure our target is A-tag. 
                        if (element.tagName == 'A') {
                            //Check if target contains the feedly 'title'-class.
                            //Todo: add a simple way to change this check -> settings?

                            if (FeedlyPreviewer.Helpers.hasClass(element, 'title')) {
                                if (FeedlyPreviewer.frame == null) {
                                    FeedlyPreviewer.Core.SetupPreviewer();      //Create a new frame if old one does not exist.
                                }
                                FeedlyPreviewer.Core.showPreviewFrame(element); //Display preview window.
                                return false;	                                //Indicate that click was handled.
                            }
                        }
                    };

                    //On key down check if any supported shortcuts should be executed.
                    //TODO: fix the iframe focus bug.
                    document.onkeydown = function (e) {
                        e = e || window.event;
                        var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
                        if (charCode > 0) {
                            switch (charCode) {
                                case keyCodes.ESC:
                                    FeedlyPreviewer.Core.hiddePreviewFrame();
                                    break;
                            }
                        }
                    }
                },
                hiddePreviewFrame: function () {
                    if (FeedlyPreviewer.frame) {
                        FeedlyPreviewer.frame.style.visibility = 'hidden';
                        FeedlyPreviewer.frame.style.display = 'none';
                    }

                    //Hide main view scrollbar.
                    FeedlyPreviewer.Helpers.ElementProvider.getHTMLTag().style.cssText = 'overflow:auto !Important; overflow-y: scroll !important; !important; overflow-x: auto !important; !important;';
                },
                showPreviewFrame: function (element) {


                    FeedlyPreviewer.frame.style.visibility = 'visible';
                    FeedlyPreviewer.frame.style.display = 'block';
                    if (FeedlyPreviewer.frameContent.src != element.href) {
                        FeedlyPreviewer.frameContent.src = element.href;
                    }

                    //Hide main view scrollbar.
                    FeedlyPreviewer.Helpers.ElementProvider.getHTMLTag().style.cssText = 'overflow:hidden Important; overflow-y:hidden !important; overflow-x:hidden !important;';

                },
                nextNews:function(){

                },
                openOption: function () {

                    var dialogId = "FeedlyExtensionOptionDialog";
                    var optionDialog = document.getElementById(dialogId);
                    if (!optionDialog) {
                        //Create new otion dialog.
                        optionDialog = FeedlyPreviewer.Presentation.optionDialog();
                        FeedlyPreviewer.frame.appendChild(optionDialog);
                    }

                    optionDialog.style.visibility = 'visible';
                    optionDialog.style.display = 'block';
                },
                hideOption:function(){
                    var formDialog = document.getElementById('FeedlyExtensionOptionDialog');
                    formDialog.style.visibility = 'hidden';
                    formDialog.style.display = 'none';
                },
                SetupPreviewer: function () {

                    //Add html node elements.
                    FeedlyPreviewer.frameContent = FeedlyPreviewer.Presentation.frameContent();
                    FeedlyPreviewer.frame = FeedlyPreviewer.Presentation.frame();
                    FeedlyPreviewer.frame.appendChild(FeedlyPreviewer.Presentation.optionButton(this.openOption));
                    FeedlyPreviewer.frame.appendChild(FeedlyPreviewer.Presentation.closeButton(this.hiddePreviewFrame));
                    FeedlyPreviewer.frame.appendChild(FeedlyPreviewer.Presentation.nextButton(this.nextNews));
                    FeedlyPreviewer.frame.appendChild(FeedlyPreviewer.frameContent);
                    document.body.appendChild(FeedlyPreviewer.frame);

                    window.onresize = function (event) {
                        FeedlyPreviewer.frameContent.setAttribute('width', FeedlyPreviewer.Presentation.Styles.Dynamic.previewFrameWidth());
                        FeedlyPreviewer.frameContent.setAttribute("height", FeedlyPreviewer.Presentation.Styles.Dynamic.previewFrameHeight());
                    }

                    setTimeout(function () {    //Fix for scrollbar spacing bug.
                        FeedlyPreviewer.frameContent.setAttribute('width', FeedlyPreviewer.Presentation.Styles.Dynamic.previewFrameWidth());
                    }, 100);

                }
            }, Settings: {
                openMouseKey: keyCodes.leftMouse,
                loadMouseKeySetting: function () {
                    if (!localStorage["fullscreenKey"]) {
                        localStorage["fullscreenKey"] = keyCodes.leftMouse;
                    }
                    return localStorage["fullscreenKey"];
                }
            },
            Presentation: { // Control and view namespace.
                Styles : {
                    Dynamic: {
                        previewFrameWidth: function () {
                            return (document.documentElement.clientWidth) + 'px';
                        },
                        previewFrameHeight: function () {

                            var e = window, a = 'inner';
                            if (!('innerWidth' in window)) {
                                a = 'client';
                                e = document.documentElement || document.body;
                            }
                            return ((e[a + 'Height']) - 62) + 'px';
                            //return (document.documentElement.clientHeight - 62) + 'px';
                        }
                    }
                },
                closeButton: function (handler) {

                    //Create a new close button.
                    var cb = FeedlyPreviewer.Helpers.create(
                        'div',
                        'FeedlyExtensionCloseButton',
                        undefined,
                        'feedlyExtensionButton'
                    );
                    cb.innerHTML = '<span style="position:relative;top:20px;">Close Preview (ESC)</span>';
                    cb.setAttribute('title', 'Go back to Feedly');
                    //add close button event handler and style.
                    cb.onclick = handler;
                    return cb;
                },
                frame: function () {
                    return FeedlyPreviewer.Helpers.create(
                        'div',
                        'TheFrame',
                        null,
                        null
                    );
                },
                frameContent: function () {
                    var f = FeedlyPreviewer.Helpers.create(
                        'iframe',
                        'FeedlyTargetPagePreview',
                        null,
                        null
                    );
                    f.setAttribute("frameborder", "0");
                    f.setAttribute("width", FeedlyPreviewer.Presentation.Styles.Dynamic.previewFrameWidth());
                    f.setAttribute("height", FeedlyPreviewer.Presentation.Styles.Dynamic.previewFrameHeight());
                    return f;
                },
                nextButton: function (handler) {
                    if (!handler) {
                        return null;
                    }
                    var nb = FeedlyPreviewer.Helpers.create(
                        'button',
                        'FeedlyExtensionNextButton',
                        null,
                        'feedlyExtensionButton'
                    );
                    nb.innerHTML = "Next news";
                    nb.onclick = handler;
                    return nb;
                },
                optionButton: function (handler) {
                    var ob = FeedlyPreviewer.Helpers.create(
                        'div',
                        'FeedlyExtensionOptionButton',
                        null,
                        'feedlyExtensionButton');
                    ob.onclick = handler;
                    ob.innerHTML = '<img src="http://s3.feedly.com/production/16.0/images/icon-action-customize.png" />';
                    ob.setAttribute('title', 'Extension settings');
                    return ob;
                },
                optionDialog: function () {
                    var dialog = FeedlyPreviewer.Helpers.create(
                        'div',
                        'FeedlyExtensionOptionDialog',
                        null,
                        'feedlyExtensionDialog');

                    var s   = localStorage["fullscreenKey"],
                        chk = 'checked="checked"',
                        str = FeedlyPreviewer.Helpers.supportsStorage();
                    //Create option form. 
                    dialog.innerHTML =
                    '<span>Default Preview Button:</span><br/>' +
                    '<input type="radio" name="fullpreviewselection" value="1" ' + (s == keyCodes.leftMouse ? chk : '') + ' />' +
                    '<span>Left mouse button.</span><br/>' +
                    '<input type="radio" name="fullpreviewselection" value="2" ' + (s == keyCodes.middleMouse ? chk : '') + ' />'+
                    '<span>Middle mouse button.</span>' +
                    (str ? '' : '<br/><br/><span style="color:red">!!! Does not support local storage !!!</span>');
                    
                    var closeAndSaveButton = FeedlyPreviewer.Helpers.create(
                        'span',
                        'FeedlyExensionCloseOptionButton',
                        'float:right;');
                    closeAndSaveButton.innerHTML = 'Close and Save';
                    closeAndSaveButton.onclick = function () {
                        var val = FeedlyPreviewer.Helpers.getRadioGroupValue('fullpreviewselection');
                        localStorage["fullscreenKey"] = val;
                        FeedlyPreviewer.Core.hideOption();
                    }
                    dialog.insertBefore(closeAndSaveButton, dialog.firstChild);
                    return dialog;
                }
            },
            Debug: {
                log: function (msg) {
                    if (console && msg) {
                        console.log(msg);
                    }
                }
            },
            Helpers: {
                hasClass: function (e, c) {
                    //Check if element has a specific class.
                    return (' ' + e.className + ' ').indexOf(' ' + c + ' ') > -1;
                },
                create: function (type, id, style,classes) {
                    if (!type)  {   return null;                        }
                    var e = document.createElement(type);
                    if (id)     {   e.setAttribute('id', id);           }
                    if (style)  {   e.setAttribute('style', style);     }
                    if (classes){   e.setAttribute('class', classes);   }
                    return e;
                },
                ElementProvider: {
                    cachedHead:null,
                    getHead: function () {
                        if (FeedlyPreviewer.Helpers.ElementProvider.cachedHead == null) {
                            FeedlyPreviewer.Helpers.ElementProvider.cachedHead = document.getElementsByTagName('head')[0];
                        }
                        return FeedlyPreviewer.Helpers.ElementProvider.cachedHead;
                    },
                    cacheHTML:null,
                    getHTMLTag:function(){
                        if(FeedlyPreviewer.Helpers.ElementProvider.cacheHTML == null){
                            FeedlyPreviewer.Helpers.ElementProvider.cacheHTML = document.getElementsByTagName("html")[0];
                        }
                        return FeedlyPreviewer.Helpers.ElementProvider.cacheHTML;
                    }
                },
                supportsStorage: function () {
                    try {
                        return 'localStorage' in window
                            && window['localStorage'] !== null;
                    } catch (e) {
                        return false;
                    }
                },
                getRadioGroupValue: function (n) {
                    var r = document.getElementsByName(n), i = r.length;    
                    while (i--) { if (r[i].checked) return r[i].value; }
                    return null;
                },
                applyStyle: function (css) {
                    if (GM_addStyle) {
                        GM_addStyle(css);
                    } else {
                        var h = FeedlyPreviewer.Helpers.ElementProvider.getHead(),
                            s = document.createElement('style');
                        if (!h) { return; }
                        s.type = 'text/css';
                        s.innerHTML = css;
                        h.appendChild(s);
                    }
                }
            }
        };

        /* STYLES 
        *************************************/
        function initStyle() {
            FeedlyPreviewer.Helpers.applyStyle(
            '.feedlyExtensionButton {background-color:#57A;margin-bottom:10px;height:56px;color:white;opacity:0.8;border:none;box-shadow: 0 1px 1px black;text-shadow: 1px 1px 1px black;text-align:center;top:3px;}' +
            '.feedlyExtensionButton:hover{cursor:pointer;background-color: #581;}'+
            '.feedlyExtensionDialog {z-index:999999;padding:10px;box-shadow: black 0px 1px 3px;background-color:#333;}' +
            '#FeedlyExtensionOptionButton { position:fixed;left:2px;width:60px;}' +
            '#FeedlyExtensionOptionButton img { width:48px; height:48px; padding:0; margin:0; position:relative; top:4px; }' +
            '#FeedlyExtensionOptionDialog { position:fixed; top:62px; left:2px; height:200px; width:350px; color:white; }'+
            '#FeedlyExtensionNextButton{ right:6px; text-align:center; width:100px; position:fixed; display:none; visibility:collapse; } ' +
            '#FeedlyTargetPagePreview { border-top:1px solid #ccc; position:fixed; top:62px; bottom:5px; } ' +
            '#TheFrame{ bottom: 0px; right:0px; position:fixed; z-index:99999; background-color:white; top:0px; left:0px; padding:0px; } ' +
            '#FeedlyExtensionCloseButton { position:fixed; right:2px; left:64px; min-width:200px; } ' + 
            '#FeedlyExensionCloseOptionButton{ color:white; float:right;} '+
            '#FeedlyExensionCloseOptionButton:hover{ cursor:pointer; text-decoration:underline; } '+
            '#FeedlyExensionCloseOptionButton span{position: relative;top: 20px; }');
        }

        return {    //  Public methods.
            init: function () {
                initStyle();
                FeedlyPreviewer.Core.hijackHeaderLinks();
            }
        }
    }());
    
    //On DOM content loaded init feedly extensions.
    window.addEventListener('DOMContentLoaded', function () {

        previewer.init();	//Run extension.
    });
}());