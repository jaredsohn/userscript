// ==UserScript==
// @name        WKW NewStyle
// @namespace   WKW NewStyle
// @description Verbreitert die Seitenansicht auf 100% und ändert diverse andere Styles ab. ADBLOCK PLUS ist zwingend erforderlich für eine korrekte Darstellung !
// @include     http://www.wer-kennt-wen.de*
// @version     1
// @grant       none
// ==/UserScript==
var	url = document.URL;

container = document.getElementById('container');
container.style = "padding-right: 0rem";

/////////////////////////////////////////////////////////////
if (url.indexOf('message') > - 1 ) {
    tile_inner = document.getElementsByClassName('tile-inner');
    writeMessage = document.getElementById('writeMessage');
    //fieldset = document.getElementByTagName('fieldset');
    if (container) {
        //container.style = "padding-right: 0rem";
        if (writeMessage) {
            writeMessage.style = "height: 2.8rem;";
            writeMessage.addEventListener("click",textareaOpen,false);
            textareaBTN();
        }

        for (var i = 0; i < tile_inner.length; i++) {
            thisTile_inner = tile_inner[i];
            thisTile_inner.style = "margin-right: 1rem; margin-left: 1rem";
        }
    }
}
/////////////////////////////////////////////////////////////
if (url.indexOf('club')>-1) {
    splitContent = document.getElementById('splitContent');
    splitSidebar = document.getElementById('splitSidebar')
    //container.style = "padding-right: 0rem";
    if (splitContent&&splitSidebar) {
        splitContent.style = "min-width: 50%";
        splitSidebar.style = "min-width: 50%";
    }
}
/////////////////////////////////////////////////////////////

if (url.indexOf('forum')>-1) {
    timestamp = document.getElementsByClassName('created-timestamp');
    metainfos = document.getElementsByClassName('meta-infos');
    charcount = document.getElementsByClassName('charcount');
    fieldset = document.getElementsByTagName('fieldset');

    tilecontent = document.getElementsByClassName('tile-content');
    h5 = document.getElementsByTagName('h5');
    //container.style = "padding-right: 0rem";

    if (writeMessage) {
        writeMessage.style = "height: 2.8rem;";
        writeMessage.addEventListener("click",textareaOpen,false);
        textareaBTN();
    }

    for (var x = 0; x < timestamp.length; x++) {
        var thisTimestamp;
        var Text;
        thisTimestamp = timestamp[x];
        thisH5 = h5[x].lastChild;
        tilecontent[x].style = "min-height: 2rem";
        //Text = document.createTextNode(thisTimestamp.title+' Uhr');
        Text = document.createTextNode(' - '+thisTimestamp.title+' Uhr');
        thisH5.parentNode.insertBefore(Text, thisH5.nextSibling);
        //thisTimestamp.parentNode.insertBefore(Text, thisTimestamp.nextSibling);
        foo =timestamp.length;
    }

    for (var i = 0; i < foo; i++) {
        timestamp[0].parentNode.removeChild(timestamp[0]);
        metainfos[0].parentNode.removeChild(metainfos[0]);
    }
}
/////////////////////////////////////////////////////////////


function textareaOpen(){
    writeMessage = document.getElementById('writeMessage');
    var styleNBR = parseInt(writeMessage.getAttribute("style").substring(8,11));
    if (styleNBR <= 2.8){
        writeMessage.style = "height: 13rem;";
    }
}
function textareaClose(){
    writeMessage = document.getElementById('writeMessage');
    writeMessage.style = "height: 2.8rem;";
}
function textareaPlus(){
    writeMessage = document.getElementById('writeMessage');
    var styleNBR = parseInt(writeMessage.getAttribute("style").substring(8,11));
    styleNBR +=4
    writeMessage.style = 'height: '+styleNBR+'rem;';
}


desktopFooter = document.getElementById('desktopFooter');
desktopFooter.parentNode.style = "padding: 0rem 2rem;";
footer = document.getElementById('footer');
textClose = document.createTextNode("Footer schließen");
textOpen = document.createTextNode("Footer öffnen");
footer.insertBefore(textClose, footer.firstChild);

function footerOpen(){
    desktopFooter.removeAttribute("style");
    textOpen.parentNode.removeChild(textOpen);
    window.scrollTo(0, document.body.scrollHeight);
    footer.insertBefore(textClose, footer.firstChild);
    footer.removeEventListener("click",footerOpen,false);
    footer.addEventListener("click",footerClose,false);
}

function footerClose(){
    desktopFooter.style = "display:none";
    textClose.parentNode.removeChild(textClose);
    footer.insertBefore(textOpen, footer.firstChild);
    footer.addEventListener("click",footerOpen,false);
}

footerClose();


function textareaBTN(){
var div = document.createElement("div");
div.style="float: right; padding-right: 1rem;";
var allBTN = document.getElementsByTagName('button');
    for (var x = 0; x < allBTN.length; x++) {
        div.innerHTML = '<i id="textareaOpen_'+x+'" titel="Textfeld vergrößern" style="cursor:pointer;" class="ui-icon-wkw-circle-plus indicator-is-open aria-hidden="true"></i><i id="textareaClose_'+x+'" titel="Textfeld verkleinern" style="cursor:pointer;" class="ui-icon-wkw-circle-minus indicator-is-open" aria-hidden="true"></i>';
        if(allBTN[x].firstChild.data=="Senden"){
            var thisBTN = allBTN[x];
            thisBTN.parentNode.insertBefore(div, thisBTN.nextSibling);          
        }
    }
    for (var x = 0; x < allBTN.length; x++) {
        var areaOpen = document.getElementById('textareaOpen_'+x);
        var areaClose = document.getElementById('textareaClose_'+x);
        if (areaOpen!=null){
            areaOpen.addEventListener("click",textareaPlus,false);
        }
        if (areaClose!=null){
             areaClose.addEventListener("click",textareaClose,false);   
        }
    }
}


