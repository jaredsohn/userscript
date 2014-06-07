// ==UserScript==
// @name        Reverse Google Image Search Anywhere
// @namespace   matthewn4444
// @description Dragging any image allows you to do a google image search.
// @include     *
// @exclude     *www.google.*/imghp*
// @exclude     *www.google.*/search?*site=imghp&*
// @exclude     *www.google.*/search?tbs=sbi:*
// @grant       none
// @downloadURL http://userscripts.org/scripts/source/139231.user.js
// @version     1.11
// ==/UserScript==

if (!document || !document.body || top !== self) return;

/*=============*\
|*  CONSTANTS  *|
\*=============*/
var CONSTANT = {
    incorrectTimeout: 2000,      //Milliseconds
};

var EL = {
    body:       document.body,
    head:       document.getElementsByTagName('head')[0],
    zone:       null,       //Set later
    form:       null,       //Set later
    message:    null,       //Set later
};

var VAR = {
    dragImgSrc:    null,    //String
    dontHide:      false,   //Bool
    draggedOver:   false,   //Bool
};

var MESSAGE = {
    drop:       "Drop image here!",
    incorrect:  "This is not a valid image.",
    oldBrowser: "You browser is too old and cannot use FileReader HTML5 API, please uninstall this userscript",
};

var URL = {
    imageSearch:    "https://www.google.com/searchbyimage?&image_url=",
    formSearch:     "https://www.google.com/searchbyimage/upload",
};

/*=============*\
|*   CHECKS    *|
\*=============*/
if(!window.FileReader) {
    alert(MESSAGE.oldBrowser);
    return;
}

/*=============*\
|*  FUNCTIONS  *|
\*=============*/
function getId(id) {
    return document.getElementById(id);
}

function createEl(elementName, id /*optional*/, attrArr /*optional*/) {
    var el = document.createElement(elementName);
    if (id) {
        el.id = id;
    }
    if (attrArr) {
        try{
        for (var attr in attrArr) {
            el.setAttribute(attr, attrArr[attr]);
        }
        }catch(e){alert("Attributes are set wrong: "+e)}
    }
    return el;
}

function fileNameFromFileUrl (url) {
    var index = url.lastIndexOf("/");
    if (index == -1) {return url;}
    return url.substr(index + 1);
}

function fixDataUrl(dataURL) {
    return dataURL.substr(dataURL.indexOf(",") + 1)
                  .replace(/\//gm, "_").replace(/\+/gm, "-");
}


/*=============*\
|*    HTML     *|
\*=============*/
function addDropZone() {
    EL.zone = createEl("div", "userscripts-dropzone");
    EL.body.appendChild(EL.zone);
    
    EL.message = createEl("div", "userscripts-dropzone-message");
    EL.zone.appendChild(EL.message);
    attachDragEvents(false);
}

/*=============*\
|*     CSS     *|
\*=============*/
(function(){
    var CSS = {
            "#userscripts-dropzone" : {
                "margin" : "0",
                "height" : "100px",
                "width" : "100%",
                "-webkit-user-select" : "none",
                "-moz-user-select" : "none",
                "user-select" : "none",
                "position" : "fixed",
                "top" : "-140px",
                "left" : "0px",
                "background" : "#f0f0f0",
                "box-shadow" : "0 0px 10px rgba(0,0,0,0.8)",
                "box-sizing" : "border-box",
                "-webkit-box-sizing" : "border-box",
                "-moz-box-sizing" : "border-box",
                "z-index" : "10000000",
                "-moz-transition-property" : "top",
                "-moz-transition-duration" : "0.2s",
                "-moz-transition-timing-function" : "ease-out",
                "-webkit-transition-property" : "top",
                "-webkit-transition-duration" : "0.2s",
                "-webkit-transition-timing-function" : "ease-out",
                "transition-property" : "top",
                "transition-duration" : "0.2s",
                "transition-timing-function" : "ease-out",
            },
            "#userscripts-dropzone.show" : {
                "top"     : "0px",
            },
            "#userscripts-dropzone-message": {
                "text-align" : "center",
                "font-size" : "20px !important",
                "font-weight" : "bold !important",
                "font-family" : "Arial, san-serif !important",
                "color" : "black !important",
                "padding" : "35px",
            },
        },
        cssString = "",
        propString = "",
        eachSelector = "",
        style = createEl("style");
    for(var selector in CSS) {
        eachSelector = CSS[selector];
        propString = "";
        for(var property in eachSelector) {
            propString += property + ":" + eachSelector[property] + ";";
        }
        cssString += selector + "{" + propString + "}";
    }
    style.appendChild(document.createTextNode(cssString));
    EL.head.appendChild(style);
})();

/*=============*\
|*  FUNCTIONS  *|
\*=============*/

function openSearchUrl(url) {
    var fileName = fileNameFromFileUrl(url);
    
    // Check if real file
    if (fileName.indexOf(".") === -1) {
        displayIncorrectFile();
        return;
    }
    var tehUrl = URL.imageSearch + escape(url);
    window.open(tehUrl, "_blank");
    hide();
}

function displayIncorrectFile() {
    VAR.dontHide = true;
    EL.message.innerHTML = MESSAGE.incorrect;
    setTimeout(function(){
        VAR.dontHide = false;
        hide();
    }, CONSTANT.incorrectTimeout);
}

function processDrop(event) {
try{
    var dt = event.dataTransfer,
        link = dt.getData("Text"),
        imgUrl = VAR.dragImgSrc,
        files = dt.files,
        file = null,
        i = 0;
        
    if (imgUrl != null) {
        clearImageSource();
        openSearchUrl(imgUrl);
    } else if (link != "") {
        console.log(link)
        openSearchUrl(link);
    } else if (files.length > 0) {
        for (; i < files.length; i++) {
            file = files[i];
            var reader = new FileReader();
            reader.file = file;
            reader.addEventListener("loadend", processFile, false);
            try {
                reader.readAsDataURL(file);
            }catch(error) {
                displayIncorrectFile();
                if (console && console.log) {
                    console.log(error);
                }
            }
        }
    } else {
        displayIncorrectFile();
        if (console && console.log) {
            console.log("Not an image",event);
        }
    }
    stopBrowser(event);
}catch(e){alert(e)}
}

function processFile(event) {
    event.currentTarget.removeEventListener('loadend', processFile, false);
    if (this.result == "") {    
        displayIncorrectFile();
        return;
    }
    var dataUrl = fixDataUrl(this.result),
        fileName = this.file.name;
        
    setImageForm(dataUrl, fileName);
    EL.form.submit();
    hide();
    this.file = null;
    setImageForm("", "");
    
    // Fixes Chrome's form searching
    var counter = parseInt(EL.form.getAttribute('counter')) + 1;
    EL.form.setAttribute('counter', counter);
    EL.form.action = EL.form.getAttribute('origAction') + counter;
}

function setImageForm(dataUrl, fileName) {
    if (EL.form) {
        getId('userscripts-form-data-url').setAttribute('value', dataUrl);
        getId('userscripts-form-filename').setAttribute('value', fileName);
        return;
    }
    EL.form = createEl("form", "userscripts-form-image-search", {
                    enctype:    'multipart/form-data',
                    method:     'POST',
                    target:     '_blank',
                    action:     (URL.formSearch + '?d=0'),
                    origAction: (URL.formSearch + '?d'),
                    counter:    0,
                });
    var field1 = createEl("input", 'userscripts-form-data-url', {
                    type:       'hidden',
                    name:       'image_content',
                    value:      dataUrl
                }),
        field2 = createEl("input", null, {
                    type:       'hidden',
                    name:       'btnG',
                    value:      'Search'
                }),
        field3 = createEl("input", 'userscripts-form-filename', {
                    type:       'hidden',
                    name:       'filename',
                    value:      fileName
                }),
        field4 = createEl("input", null, {
                    type:       'hidden',
                    name:       'hl',
                    value:      'en'
                });
    EL.form.appendChild(field1);
    EL.form.appendChild(field2);
    EL.form.appendChild(field3);
    EL.form.appendChild(field4);
    EL.zone.appendChild(EL.form);
}

/*=============*\
|*   EVENTS    *|
\*=============*/

function detachDragEvents() {
    document.removeEventListener("dragstart", processDragStart, false);
    document.removeEventListener("dragenter", processDragEnter, false);
    
    document.addEventListener("dragend", clearImageSource, false);
    document.addEventListener("mouseover", mouseMove, false);
    EL.zone.addEventListener("dragover", dragOverZone, false);
    EL.zone.addEventListener("dragleave", dragOutZone, false);
    EL.zone.addEventListener("drop", processDrop, false);
}

function attachDragEvents(shouldRemoveEvents) {
    document.addEventListener("dragenter", processDragEnter, false);
    document.addEventListener("dragstart", processDragStart, false);
    
    if (!shouldRemoveEvents) {
        document.removeEventListener("dragend", clearImageSource, false);
        document.removeEventListener("mouseover", mouseMove, false);
        EL.zone.removeEventListener("dragover", dragOverZone, false);
        EL.zone.removeEventListener("dragleave", dragOutZone, false);
        EL.zone.removeEventListener("drop", processDrop, false);
    }
}
function stopBrowser(evt) {
    evt.stopPropagation();
    evt.preventDefault();
}

function dragOverZone(event){
    VAR.draggedOver = true;
    stopBrowser(event);
}

function dragOutZone(event){    
    VAR.draggedOver = false;
    stopBrowser(event);
}

function mouseMove(e) {
    if (VAR.draggedOver) {
        return;
    }
    if (EL.zone.className === "show") {
        hide();
    } else {
        attachDragEvents();
    }
}

function processDragStart(event) {
    var el = event.target;
    if (el.tagName === "IMG") {
        VAR.dragImgSrc = el.src;
    } else {
        var imgs = el.getElementsByTagName('img');
        if (imgs.length > 0) {
            VAR.dragImgSrc = imgs[0].src;
        } else {
            if (el.tagName !== "A" || el.getAttribute("href") == "") {
                detachDragEvents();
                return;
            }
        }
    }
    show();
}

function processDragEnter(event) {
    if (VAR.dragImgSrc != null || event.dataTransfer.getData('Text') == "") {
        show();
    } else {    
        detachDragEvents();
    }
}

/*=============*\
|*     MISC    *|
\*=============*/
function clearImageSource(event) {
    VAR.dragImgSrc = null;
    hide();
}

function show() {
    if (EL.zone.className === "show") {
        return;
    }
    EL.message.innerHTML = MESSAGE.drop;
    detachDragEvents();
    EL.zone.className = "show";
}

function hide() {
    if (EL.zone.className === "") {
        return;
    }
    attachDragEvents();
    if (VAR.dontHide) {
        return;
    }
    VAR.draggedOver = false;
    EL.zone.className = "";
}

/*=============*\
|*    START    *|
\*=============*/
addDropZone();