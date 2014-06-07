// ==UserScript==
// @name           GameFAQs Page Marker 2
// @author         Adam Lesinski
// @namespace      adam
// @description    Allows multiple page markers to be set, modified and deleted on a single FAQ
// @include        http://www.gamefaqs.com/*/*/file/*
// ==/UserScript==

var initYPos = 50;
var initXPos = 20;
var initWidth = 200;
var expiryTime = 7;

var deleteSource = "data:image/gif;base64,R0lGODlhDQANAPcAAAAAAIAAAACAAICAAAAAgIAAgACAgICAgMDAwP8AAAD/AP//AAAA//8A/wD/\
                                          /////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
                                          AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMwAAZgAAmQAAzAAA/wAzAAAzMwAzZgAzmQAzzAAz/wBm\
                                          AABmMwBmZgBmmQBmzABm/wCZAACZMwCZZgCZmQCZzACZ/wDMAADMMwDMZgDMmQDMzADM/wD/AAD/\
                                          MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMzADMzMzMzZjMzmTMzzDMz/zNmADNmMzNm\
                                          ZjNmmTNmzDNm/zOZADOZMzOZZjOZmTOZzDOZ/zPMADPMMzPMZjPMmTPMzDPM/zP/ADP/MzP/ZjP/\
                                          mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YzAGYzM2YzZmYzmWYzzGYz/2ZmAGZmM2ZmZmZmmWZm\
                                          zGZm/2aZAGaZM2aZZmaZmWaZzGaZ/2bMAGbMM2bMZmbMmWbMzGbM/2b/AGb/M2b/Zmb/mWb/zGb/\
                                          /5kAAJkAM5kAZpkAmZkAzJkA/5kzAJkzM5kzZpkzmZkzzJkz/5lmAJlmM5lmZplmmZlmzJlm/5mZ\
                                          AJmZM5mZZpmZmZmZzJmZ/5nMAJnMM5nMZpnMmZnMzJnM/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwA\
                                          M8wAZswAmcwAzMwA/8wzAMwzM8wzZswzmcwzzMwz/8xmAMxmM8xmZsxmmcxmzMxm/8yZAMyZM8yZ\
                                          ZsyZmcyZzMyZ/8zMAMzMM8zMZszMmczMzMzM/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8A\
                                          mf8AzP8A//8zAP8zM/8zZv8zmf8zzP8z//9mAP9mM/9mZv9mmf9mzP9m//+ZAP+ZM/+ZZv+Zmf+Z\
                                          zP+Z///MAP/MM//MZv/Mmf/MzP/M////AP//M///Zv//mf//zP///yH5BAEAABAALAAAAAANAA0A\
                                          AAg7AP+hGEiwIAqBB/8pXKiQoECGCw8ObAgx4USKGBEylLgxYcSKHh+GvPgw48WQJSeipOgQYkSJ\
                                          Bg3+CwgAOw==";

var editSource = "data:image/gif;base64,R0lGODlhGwANAPcAAAAAAIAAAACAAICAAAAAgIAAgACAgICAgMDAwP8AAAD/AP//AAAA//8A/wD/\
                                        /////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
                                        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMwAAZgAAmQAAzAAA/wAzAAAzMwAzZgAzmQAzzAAz/wBm\
                                        AABmMwBmZgBmmQBmzABm/wCZAACZMwCZZgCZmQCZzACZ/wDMAADMMwDMZgDMmQDMzADM/wD/AAD/\
                                        MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMzADMzMzMzZjMzmTMzzDMz/zNmADNmMzNm\
                                        ZjNmmTNmzDNm/zOZADOZMzOZZjOZmTOZzDOZ/zPMADPMMzPMZjPMmTPMzDPM/zP/ADP/MzP/ZjP/\
                                        mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YzAGYzM2YzZmYzmWYzzGYz/2ZmAGZmM2ZmZmZmmWZm\
                                        zGZm/2aZAGaZM2aZZmaZmWaZzGaZ/2bMAGbMM2bMZmbMmWbMzGbM/2b/AGb/M2b/Zmb/mWb/zGb/\
                                        /5kAAJkAM5kAZpkAmZkAzJkA/5kzAJkzM5kzZpkzmZkzzJkz/5lmAJlmM5lmZplmmZlmzJlm/5mZ\
                                        AJmZM5mZZpmZmZmZzJmZ/5nMAJnMM5nMZpnMmZnMzJnM/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwA\
                                        M8wAZswAmcwAzMwA/8wzAMwzM8wzZswzmcwzzMwz/8xmAMxmM8xmZsxmmcxmzMxm/8yZAMyZM8yZ\
                                        ZsyZmcyZzMyZ/8zMAMzMM8zMZszMmczMzMzM/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8A\
                                        mf8AzP8A//8zAP8zM/8zZv8zmf8zzP8z//9mAP9mM/9mZv9mmf9mzP9m//+ZAP+ZM/+ZZv+Zmf+Z\
                                        zP+Z///MAP/MM//MZv/Mmf/MzP/M////AP//M///Zv//mf//zP///yH5BAEAABAALAAAAAAbAA0A\
                                        AAhXAP+hGEiwoMGDBQX+W8iwocOHDQdCnAgRxUKJDzFSvHjRYsWNDD1iJBhSoMeOIzsq5GiS5UmR\
                                        Kk2mdJlR5UuWK0+WbIkwYUiSOXWC/Nhy6FCLPZP2/BcQADs=";
                                        
var addSource = "data:image/gif;base64,R0lGODlhDQANAPcAAAAAAIAAAACAAICAAAAAgIAAgACAgICAgMDAwP8AAAD/AP//AAAA//8A/wD/\
                                      /////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
                                      AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMwAAZgAAmQAAzAAA/wAzAAAzMwAzZgAzmQAzzAAz/wBm\
                                      AABmMwBmZgBmmQBmzABm/wCZAACZMwCZZgCZmQCZzACZ/wDMAADMMwDMZgDMmQDMzADM/wD/AAD/\
                                      MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMzADMzMzMzZjMzmTMzzDMz/zNmADNmMzNm\
                                      ZjNmmTNmzDNm/zOZADOZMzOZZjOZmTOZzDOZ/zPMADPMMzPMZjPMmTPMzDPM/zP/ADP/MzP/ZjP/\
                                      mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YzAGYzM2YzZmYzmWYzzGYz/2ZmAGZmM2ZmZmZmmWZm\
                                      zGZm/2aZAGaZM2aZZmaZmWaZzGaZ/2bMAGbMM2bMZmbMmWbMzGbM/2b/AGb/M2b/Zmb/mWb/zGb/\
                                      /5kAAJkAM5kAZpkAmZkAzJkA/5kzAJkzM5kzZpkzmZkzzJkz/5lmAJlmM5lmZplmmZlmzJlm/5mZ\
                                      AJmZM5mZZpmZmZmZzJmZ/5nMAJnMM5nMZpnMmZnMzJnM/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwA\
                                      M8wAZswAmcwAzMwA/8wzAMwzM8wzZswzmcwzzMwz/8xmAMxmM8xmZsxmmcxmzMxm/8yZAMyZM8yZ\
                                      ZsyZmcyZzMyZ/8zMAMzMM8zMZszMmczMzMzM/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8A\
                                      mf8AzP8A//8zAP8zM/8zZv8zmf8zzP8z//9mAP9mM/9mZv9mmf9mzP9m//+ZAP+ZM/+ZZv+Zmf+Z\
                                      zP+Z///MAP/MM//MZv/Mmf/MzP/M////AP//M///Zv//mf//zP///yH5BAEAABAALAAAAAANAA0A\
                                      AAg1AP+hGEiwIAqB/xIqXCjwIEOGAyFCdKiQYsKICy02vGjQIcaKEyVm1EhS48OPDy827EjwX0AA\
                                      Ow==";

var menuBox = document.createElement("div");
menuBox.style.width = initWidth + "px";
menuBox.style.position = "fixed";
menuBox.style.right = initXPos + "px";
menuBox.style.top = initYPos + "px";
menuBox.style.borderStyle = "dashed";
menuBox.style.borderWidth = "2px";
menuBox.style.borderColor = "black";

var menuTitle = document.createElement("div");
menuTitle.innerHTML = "GAMEFAQS PAGE MARKER 2.0";
menuTitle.style.textAlign = "center";
menuTitle.style.fontFamily = "courier new";
menuTitle.style.color = "black";
menuTitle.style.paddingTop = "16px";
menuTitle.style.paddingBottom = "16px";
menuTitle.style.borderStyle = "dashed";
menuTitle.style.borderBottomWidth = "2px";
menuTitle.style.borderTopWidth = "0px";
menuTitle.style.borderLeftWidth = "0px";
menuTitle.style.borderRightWidth = "0px";
menuTitle.style.borderColor = "black";

var form = document.createElement("form");
form.addEventListener("submit", setPageMarker, false);

var labelInput = document.createElement("input");
labelInput.type = "text";
labelInput.addEventListener("blur", setPageMarker, false);
form.appendChild(labelInput);

var addButton = document.createElement("img");
addButton.src = addSource;
addButton.style.marginTop = "3px";
addButton.style.marginLeft = "3px";
addButton.style.cursor = "pointer";
addButton.addEventListener("click", createPageMarker, false);
                            
var pageMarkers = null;
var pageMarkersMenu = new Array();
var untitledNumber = 1;
var editing = false;
var editNumber = 0;

function setPageMarker()
{
  if(!editing)
    return;
  var label;
  pageMarkersMenu[editNumber].text.removeChild(form);
  if(labelInput.value == "")
  {
    label = "Untitled " + untitledNumber;
    untitledNumber++;
  }
  else
  {
    label = labelInput.value;
  }
  var position = pageMarkersMenu[editNumber].text.getAttribute("scrollPosition");
  pageMarkersMenu[editNumber].text.innerHTML = label;
  pageMarkersMenu[editNumber].text.addEventListener("click", gotoPageMarker, false);
  pageMarkersMenu[editNumber].item.insertBefore(pageMarkersMenu[editNumber].delete, pageMarkersMenu[editNumber].clear);
  pageMarkersMenu[editNumber].item.insertBefore(pageMarkersMenu[editNumber].edit, pageMarkersMenu[editNumber].clear);
  pageMarkers[editNumber] = new Array(label, position);
  editing = false;
  menuBox.appendChild(addButton);
  updatePageMarkers();
}

//Creates an input box to type in the label of the page marker
function createPageMarker()
{
  if(editing)
    return;
  var menu = createEmptyPageMarkerMenuItem();
  labelInput.value = "";
  editNumber = pageMarkers.length;
  menu.text.setAttribute("scrollPosition", window.pageYOffset);
  menu.delete.setAttribute("index", editNumber);
  menu.edit.setAttribute("index", editNumber);
  menu.text.appendChild(form);
  pageMarkersMenu[editNumber] = menu;
  editing = true;
  menuBox.removeChild(addButton);
  menuBox.appendChild(menu.item);
  labelInput.focus();
}

function createEmptyPageMarkerMenuItem()
{
  var menu = new Object();
  menu.item = document.createElement("div");
  menu.item.style.paddingLeft = "5px";
  menu.item.style.paddingRight = "5px";
  menu.item.style.paddingTop = "2px";
  menu.item.style.paddingBottom = "2px";
  menu.item.style.cursor = "pointer";
  
  menu.text = document.createElement("div");
  menu.text.style.cssFloat = "left";
  menu.text.style.width = "140px";
  
  menu.delete = document.createElement("img");
  menu.delete.style.marginTop = "3px";
  menu.delete.style.marginRight = "3px";
  menu.delete.style.cssFloat = "right";
  menu.delete.src = deleteSource;
  menu.delete.style.cursor = "pointer";
  menu.delete.addEventListener("click", removePageMarker, false);
  
  menu.edit = document.createElement("img");
  menu.edit.style.marginTop = "3px";
  menu.edit.style.marginRight = "3px";
  menu.edit.style.cssFloat = "right";
  menu.edit.src = editSource;
  menu.edit.addEventListener("click", editPageMarker, false);
  
  menu.clear = document.createElement("div");
  menu.clear.style.clear = "both";
  
  menu.item.appendChild(menu.text);
  menu.item.appendChild(menu.clear);
  return menu;
}

function createPageMarkerMenuItem(text, position, index)
{
  var menu = createEmptyPageMarkerMenuItem();
  menu.text.innerHTML = text;
  menu.delete.setAttribute("index", index);
  menu.edit.setAttribute("index", index);
  menu.text.setAttribute("scrollPosition", position);
  menu.item.insertBefore(menu.delete, menu.clear);
  menu.item.insertBefore(menu.edit, menu.clear);
  menu.text.addEventListener("click", gotoPageMarker, false);
  return menu;
}

function removePageMarker(e)
{
  var index = e.target.getAttribute("index");
  menuBox.removeChild(pageMarkersMenu[index].item);
  pageMarkers.splice(index, 1);
  pageMarkersMenu.splice(index, 1);
  
  for(var i = index; i < pageMarkers.length; i++)
  {
    pageMarkersMenu[i].delete.setAttribute("index", i);
    pageMarkersMenu[i].edit.setAttribute("index", i);
  }
  updatePageMarkers();
}

function editPageMarker(e)
{
  editNumber = e.target.getAttribute("index");
  editing = true;
  var oldLabel = pageMarkersMenu[editNumber].text.innerHTML;
  pageMarkersMenu[editNumber].text.innerHTML = "";
  labelInput.value = oldLabel;
  pageMarkersMenu[editNumber].text.appendChild(form);
  menuBox.removeChild(addButton);
  pageMarkersMenu[editNumber].text.removeEventListener("click", gotoPageMarker, false);
  pageMarkersMenu[editNumber].item.removeChild(pageMarkersMenu[editNumber].delete);
  pageMarkersMenu[editNumber].item.removeChild(pageMarkersMenu[editNumber].edit);
  labelInput.focus();
}

function gotoPageMarker(e)
{
  var position = e.target.getAttribute("scrollPosition");
  if(position != null)
  {
    window.scrollTo(0, position);
  }
}

function updatePageMarkers()
{
  GM_setValue("data: " + window.location.href, uneval(pageMarkers));
}

function init()
{
  pageMarkers = eval(GM_getValue("data: " + window.location.href));
  if(pageMarkers)
  {
    for(var i = 0; i < pageMarkers.length; i++)
    {
      var menu = createPageMarkerMenuItem(pageMarkers[i][0], pageMarkers[i][1], i);
      menuBox.appendChild(menu.item);
      pageMarkersMenu[i] = menu;
    }
   
    //Update this page marker's "expiry date"
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + expiryTime);
    GM_setValue("date: " + window.location.href, expireDate.toDateString());
    
  }
  else
  {
    pageMarkers = new Array();
  }
  
  menuBox.appendChild(addButton);
  
  //Prune out old page markers from other FAQs
  var currentDate = new Date();
  var currentMilliseconds = Date.parse(currentDate.toDateString());
  var previousValues = GM_listValues();
  for(var i = 0; i < previousValues.length; i++)
  {
    if(previousValues[i].substring(0, 6) == "date: ")
    {
      if(currentMilliseconds > Date.parse(GM_getValue(previousValues[i])))
      {
        GM_deleteValue(previousValues[i]);
        GM_deleteValue("data: " + previousValues[i].substring(6));
      }
    }
  }
}


document.body.appendChild(menuBox);
menuBox.appendChild(menuTitle);
init();
