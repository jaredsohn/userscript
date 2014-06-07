// ==UserScript==
// @name        Magneto Edit Enhancer
// @namespace   http://www.thehockeyshop.com
// @description Changes Magneto elements
// @include     http://www.thehockeyshop.com/index.php/admin/catalog_product/index/*
// @include     http://www.thehockeyshop.com/index.php/enhancedgrid/catalog_product/index/*
// @version     1
// @grant       none
// ==/UserScript==

var tbl = document.getElementsByTagName("table")[3];
var cls = tbl.getElementsByTagName("td");
var xPos = 0;
var yPos = 0;

for ( var i = 0; i < cls.length; i++ ) {
  if ( cls[i].addEventListener ) {
    cls[i].addEventListener("click", alertRowCell, false);
  } else if ( cls[i].attachEvent ) {
    cls[i].attachEvent("onclick", alertRowCell);
  }
}

function alertRowCell(e){
    var cell = e.target || window.event.srcElement;
    var productIndex = 2;
    var skuIndex = 13;
    if (cell.parentNode.rowIndex >= 2 && cell.cellIndex == 13)
    {
        var productURL = cell.parentNode.getAttribute("title");
        var sku = cell.innerHTML;
        if (cell.innerHTML.indexOf("div") <= 0)
        {
            var id = makeid();
            cell.innerHTML = '<div class="field-100"><input type="text" name="sku_retailpro-edit" id="edit_' + id + '" value="' + cell.innerHTML + '" class="input-text no-changes" /></div>';
            var textInput = document.getElementById("edit_" + id);
            textInput.focus();
            textInput.select();
            cell.addEventListener("keyup", function (e) {focusKey(e,cell,productURL)}, false);
        }
        else
        {
            var sku = cell.getElementsByTagName("input")[0].value;
            cell.innerHTML = sku;
        }
        e.returnValue = false;
        e.cancelBubble = true;
        e.stopPropagation();
    }
}

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function focusKey(ev, cell, url) {
    if (ev.keyCode == 13)
    {
        var sku = ev.target.value;
        loadAndSave(cell, sku, url);
    }
}

function loadAndSave(cell, sku, url)
{
    var div = document.createElement("iframe");
    div.style.visibility="hidden";
    div.style.height="0px";
    div.setAttribute("id", "ajax-" + sku);
    document.body.appendChild(div);
    loadXMLDoc(url, sku);
    window.setTimeout(function(){getFrameContents(cell, url, sku)},1000)
}

function getFrameContents(cell, url, sku){
    var iFrame = document.getElementById("ajax-" + sku);
    var iFrameBody;
    if ( iFrame.contentDocument ) 
    { // FF
        //alert("this");
        iFrame = iFrame.contentDocument;
    }
    else if ( iFrame.contentWindow ) 
    { // IE
        //alert("that");
        iFrame = iFrame.contentWindow.document;
    }
    var skuField = iFrame.getElementsByName('product[sku_retailpro]')[0];
    skuField.value = sku;
    var buttons = iFrame.getElementsByTagName("button");
    var saveButton = buttons[5];
    BeginRequestHandler();
    saveButton.click();
    EndRequestHandler();
    var div = document.getElementById("ajax-" + sku);
    cell.innerHTML = sku;
    window.setTimeout(function(){hideFrame(sku)},15000)
}

function getByClass (className) {
  var descendants=document.getElementsByTagName('*'), i=-1, e, result=[];
  while (e=descendants[++i]) {
    ((' '+(e['class']||e.className)+' ').indexOf(' '+className+' ') > -1) && result.push(e);
  }
  return result;
}

function hideFrame(sku) {
    BeginRequestHandler();
    var div = document.getElementById("ajax-" + sku);
    div.parentNode.removeChild(div);
    EndRequestHandler();
}

function BeginRequestHandler() {
    xPos = document.scrollLeft;
    yPos = document.scrollTop;
}
function EndRequestHandler() {
    document.scrollLeft = xPos;
    document.scrollTop = yPos;
}

function loadXMLDoc(url, sku)
{
    var req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send(null);

    var page = req.responseText;
    var ifrm = document.getElementById("ajax-" + sku);
    ifrm = (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;
    ifrm.document.open();
    ifrm.document.write(page);
    ifrm.document.close();
}