// ==UserScript==
// @name           Plaza
// @namespace      Doorbellscript
// @description    Allows easy access to all stores without equipment switching
// @include        *kingdomofloathing.com/main_c.html*
// @include        *kingdomofloathing.com/main.html*
// @include        *127.0.0.1:*/main_c.html*
// @include        *127.0.0.1:*/main.html*
// @include        *kingdomofloathing.com/topmenu.php*
// @include        *kingdomofloathing.com/compactmenu.php*
// @include        *127.0.0.1:*/topmenu.php*
// @include        *127.0.0.1:*/compactmenu.php*
// @include        *kingdomofloathing.com/game.php*
// @include        *127.0.0.1:*/game.php*


// ==/UserScript==

var aiQuantities = [1, 3, 5, 10, 30];

var AllStores;
var sCharSheetHtml = "";
var sCharacterName = "";
var sEquipmentHtml = "";
var sBackupOutfitId = "";
var iCharacterLevel = 0;
var sClassAbbreviation = ""; // "AT", "DB", "SC", "TT", "S" or "P"
var sClassTitle = "";
var maindoc = null;
var eMainOverlay = null;
var eMessageDiv = null;
var eTopMessageDiv = null;
var eAutoBuyCheckbox = null;
var eReloadCharPaneAfterBuyCheckbox = null;
var bDebug = false;
var bDeleteSavedValues = GM_getValue("Reset Everything", false);
//bDeleteSavedValues = true;
var iStoreWidth = 280;
var bShopScrapingComplete = false;
var bUseItemAfterPurchase = false;
var sPasswordHash = "";
var sPlayerId = "";

// This is because there is some official KOL script throws the error "t is null" when a shopkeep picture is drawn.
// While this doesn't eliminate the error, it cuts them down significantly.
t = "";

if(window.location.href.indexOf("compactmenu.php") > 0 || window.location.href.indexOf("topmenu.php") > 0)
{
  if(bDeleteSavedValues)
  {
    var a = GM_listValues();
    for(var i=0; i<a.length; ++i)
      GM_deleteValue(a[i]);
  }
    
  // if we are loading the top pane, create a link in the top menu and load data
  Log("Getting Store Data");
  GetAllStores();
  Log("Store Data Loaded");

  var eTopDoc = window.top.document.getElementsByName('menupane')[0].contentDocument;
  
  Log("Looking for existing shopping cart link...");
  if(eTopDoc.getElementById("MenuLink") == null)
  {
    Log("Shopping cart link not found, creating...");
    var eMenuLink = document.createElement("a");
    eMenuLink.id = "MenuLink";
    eMenuLink.href = "javascript:";
    eMenuLink.innerHTML = "<img border='0' src='data:image/gif;base64,"+
    "R0lGODlhEAAQAOYAAN/f35aWln19fXd3d8XFxZKSkurq6tra2pWVlZOTk7Gxsdzc3GZmZqOjo7i4"+
    "uL+/v4GBgXt7e/j4+ExMTFpaWmpqaq6urqCgoJ6enrS0tNDQ0KamptfX19jY2JqamoyMjMTExEhI"+
    "SG9vb21tbV5eXldXV7q6ulxcXGdnZ3Nzc93d3TQ0NMfHx8LCwouLi3l5eVZWVpiYmERERBsbG4iI"+
    "iJeXl97e3nV1defn56urqyYmJpycnGFhYT8/PxwcHFFRUdbW1mxsbG5ubrW1tXx8fK+vr3Z2djw8"+
    "PJ+fn8rKyoeHh2VlZUFBQcDAwKGhocHBwaysrE9PT1hYWMvLy9PT0+Dg4I6OjgoKCre3tz4+PtnZ"+
    "2UJCQlVVVaKiokNDQ3JyckpKSl9fX+np6dHR0aSkpIaGhh8fHy4uLoKCguTk5BgYGM7OzsbGxnBw"+
    "cMPDw5SUlLKysuzs7OLi4mlpaVtbW5mZmf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5"+
    "BAAAAAAALAAAAAAQABAAAAfagHaCg4SDSF8ThYp2cAoyIUBDDRsOGWQNWCZ1FwUYInZlGFICFREj"+
    "Qmg3KQMCAwF2CUVdEm8DaQYJCBIdDUqCAjkEWk0IHBxQGwAHASiCHlY8PzEiXBR1AksfCCOCLEYQ"+
    "bHUvUyA1HwdEEQqCOAxOBg51BA47BSAWA4Q0QVElE14USDA4AqbCIkUWwhBa8ABGDwJuMjxpcWIL"+
    "HUIFQmgIUILBCRJmktTxQSgOkzltzggCkAWCixVVBhkIMEOHhwsPTCi4oiaBBioHBNnoMAbAAjkq"+
    "1ohZAADAoEAAOw==' />";
    eMenuLink.style.margin = "3px";
    eMenuLink.style.position = "absolute";
    eMenuLink.style.top = '1px';
    eMenuLink.style.left = '5px';
    eMenuLink.style.padding = "1px";
    eMenuLink.style.display = "none";
    eMenuLink.style.backgroundColor= '#DDDDDD';
    eMenuLink.addEventListener("click", TogglePlaza, true);
    eTopDoc.documentElement.appendChild(eMenuLink);
    Log("shopping cart link created");
    
    var eFavoritesTable = document.createElement("table");
    var eBuyRow = eFavoritesTable.insertRow(-1);
    eBuyRow.style.height="1";
    var eUseRow = eFavoritesTable.insertRow(-1);
    
    var eFirstBuyCell = eBuyRow.insertCell(-1);
    var eFirstUseCell = eUseRow.insertCell(-1);
    eFirstBuyCell.rowSpan = 2;
    
    var eFavoritesDdl = document.createElement("select");
    eFavoritesDdl.id = "FavoritesDdl";
    eFavoritesDdl.addEventListener("change", CreateTopBuyLinks, true);
    eFirstBuyCell.appendChild(eFavoritesDdl);
    
    
        
    var aeAllCells = document.getElementsByTagName("td");
    var eAfterGrimaceCell = null;
    for(var i=0; i<aeAllCells.length; ++i)
    {
      if(aeAllCells[i].innerHTML != null && aeAllCells[i].innerHTML.indexOf("Grimace") > 0)
        eAfterGrimaceCell = aeAllCells[i+1];
    }
    if(eAfterGrimaceCell == null)
    {
      for(var i=0; i<aeAllCells.length; ++i)
        if(aeAllCells[i].innerHTML != null && aeAllCells[i].innerHTML.indexOf("http://asymmetric.net") > 0)
          eAfterGrimaceCell = aeAllCells[i];
    }
    eAfterGrimaceCell.innerHTML="";
    
    eAfterGrimaceCell.style.width="250px";

    
    var eTopBusyImage = document.createElement("img");
    eTopBusyImage.src = "data:image/gif;base64,"+
    "R0lGODlhKAAKAJECAAAAAP39/f///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJAAACACwAAAAAKAAKAAACMIR+hqLY"
    + "uVh8SwVYp84Ru/1xYUeVoIdK6piaIuaya7vF9Dvnsp3z+9kD/jiXIA5QAAAh+QQJAAACACwAAAAAKAAKAAACNJRhcb"
    + "nWjpyI8NkpsaQ3RqWBnFZtmXem5lq2qkt27xzX453BOCuvu07b/Roihs2I4h2VvwIAIfkEBQAAAgAsAAAAACgACgAA"
    + "AjWUYXHGyOLag9PFJRR9d0uOfWJIepijdWrFghOWtqNJz6trv+Wd46e8A9IsQlTQFRsWE0dRAQA7";
    eTopBusyImage.id = "TopBusyImage";
    //eTopBusyImage.style.position = "relative";
    eTopBusyImage.style.marginLeft = "0px";
    eTopBusyImage.style.display = "none";
    eTopBusyImage.style.width = "100px";
    eTopBusyImage.style.height= "10px";
    
    eTopMessageDiv = document.createElement("div");
    eTopMessageDiv.id = "TopMessageDiv";
    eTopMessageDiv.style.paddingLeft = "2px";
    eTopMessageDiv.style.paddingRight = "2px";
    eTopMessageDiv.style.display = "none";
    //eTopMessageDiv.style.position = "absolute";
    //eTopMessageDiv.style.marginLeft = "auto";
    //eTopMessageDiv.style.marginRight = "1px";
    //eTopMessageDiv.style.textAlign = "Right";
    //eTopMessageDiv.style.marginLeft = "280px";
    eTopMessageDiv.style.textAlign = "center";
    eTopMessageDiv.style.fontSize = "8pt";
    eTopMessageDiv.style.backgroundColor = "#FF4444";
    eTopMessageDiv.zIndex = "99";
    eTopMessageDiv.style.clear = "none";

    
    //eTopDoc.documentElement.appendChild(eTopBusyImage);


    eFavoritesTable.style.marginTop = "-20px";
    eFavoritesTable.style.marginLeft = "-1px";
    //eFavoritesTable.style.position = "absolute";
    eFavoritesTable.style.top = '0px';
    eFavoritesTable.style.left = '100px';
    eFavoritesTable.style.padding = "0px";
    eFavoritesTable.style.spacing = "0px";
    eFavoritesTable.style.display = "none";
    eFavoritesTable.style.fontFamily = "arial";
    eFavoritesTable.style.fontSize = "8pt";
    eFavoritesTable.style.height="10";

    eFavoritesTable.id = "FavoritesTable";

    eAfterGrimaceCell.appendChild(eFavoritesTable);
    //eTopDoc.documentElement.appendChild(eFavoritesTable);
    
    //eAfterGrimaceCell.appendChild(eTopBusyImage);
    //eAfterGrimaceCell.appendChild(eTopMessageDiv);
    Log("favorites DDL created");
    
  }
  else
    Log("Existing shopping cart link found");
}
else // we are in the main window (the frameset page, no body tag or elements available)
{
}



/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////



ScrapeHtml(); // this will set eMenuLink.style.display to "block" when its done



/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function CreateTopBuyLinks()
{
  Log("Creating top buy links");
  var eFavoritesTable = eTopDoc.getElementById("FavoritesTable");
  if(eFavoritesTable == null)
    return;

  eFavoritesTable.style.display="none";
  
  var eFavoritesDdl = eTopDoc.getElementById("FavoritesDdl");
  if(eFavoritesDdl == null)
    return;
  
  var eBuyRow = eFavoritesTable.rows[0];
  var eUseRow = eFavoritesTable.rows[1];
  
  while(eBuyRow.cells.length > 1)
    eBuyRow.deleteCell(1);

  while(eUseRow.cells.length > 0)
    eUseRow.deleteCell(0);

  var sChosenItem = eFavoritesDdl.options[eFavoritesDdl.selectedIndex].value;
  var asItemParts = sChosenItem.split(",");
  var oStore = GetStoreFromUniqueName(asItemParts[0]);
  var oItem = GetItemFromStore(oStore, asItemParts[1]);
  
  eBuyRow.insertCell(-1).appendChild(document.createTextNode("Buy:"));
  eUseRow.insertCell(-1).appendChild(document.createTextNode("Use:"));
  for(var i=0; i<aiQuantities.length; ++i)
  {

    var eCell = eBuyRow.insertCell(-1);
    var eNewBuyLink = CreateBuyLink(oItem, oStore, aiQuantities[i]);
    eNewBuyLink.style.fontFamily = "arial";
    eNewBuyLink.style.fontSize = "8pt"
    eCell.appendChild(eNewBuyLink);
    
    eCell = eUseRow.insertCell(-1);
    var eNewUseLink = CreateUseLink(oItem, oStore, aiQuantities[i]);
    eNewUseLink.style.fontFamily = "arial";
    eNewUseLink.style.fontSize = "8pt"
    eCell.appendChild(eNewUseLink);
  }
  
  var eMessageCell = eBuyRow.insertCell(-1);
  eMessageCell.rowSpan = 2;
  eMessageCell.appendChild(eTopMessageDiv);
  eMessageCell.appendChild(eTopBusyImage);
  
  
  eFavoritesTable.style.display="block";
  eTopBusyImage.style.display="none";
  eTopMessageDiv.style.display="none";
}


/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

var bControlBarIsDragging = false;
var oDraggingStore = null;
var iMouseXOffset = 0;
var iMouseYOffset = 0;

function MoveMouse(event)
{
  if(bControlBarIsDragging && oDraggingStore != null)
  {
    oDraggingStore.TableElement.style.top = (event.clientY - iMouseYOffset) + "px";
    oDraggingStore.TableElement.style.left = (event.clientX - iMouseXOffset) + "px";
  }
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function StartDrag(event)
{
  // Where did they click? The title bar's is what's sent as event.target, and its innerHTML could be
  // just title, or the title plus some appended html. Find out by looking for an open tag (<) and
  // getting everything UP to that. If there's no < character, just get the whole thing for the unique name.
  var iStopHere = event.target.innerHTML.indexOf("<");
  if(iStopHere >= 0)
    oDraggingStore = GetStoreFromUniqueName(event.target.innerHTML.substring(0, iStopHere));
  else
    oDraggingStore = GetStoreFromUniqueName(event.target.innerHTML);

  // oDraggingStore is global so the whole script knows what is being dragged.
  if(oDraggingStore == null)
    return;
    
  bControlBarIsDragging = true;
  
  // we are dragging, so don't show us selecting a bunch of text...
  maindoc.body.style.MozUserSelect = "none";
  iMouseXOffset = event.clientX - parseInt(oDraggingStore.TableElement.style.left);
  iMouseYOffset = event.clientY - parseInt(oDraggingStore.TableElement.style.top);
  
  // make sure the store is on top of other stores
  oDraggingStore.TableElement.style.zIndex = '9999';
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function StopDrag(e)
{
  if(bControlBarIsDragging)
  {
    // since the dragged store is now on top, re-sort the AllStores array so the script maintains the correct order
    AllStores.sort(function(a,b){ return parseInt(a.TableElement.style.zIndex) - parseInt(b.TableElement.style.zIndex); });
    
    // reset all the z orders so the next time we start dragging, the 9999 z-index will work again. Also, save the order
    for(var i=0; i<AllStores.length; ++i)
    {
      AllStores[i].TableElement.style.zIndex = i;
      GM_setValue(sCharacterName + "::" + AllStores[i].UniqueName + "::Position", AllStores[i].TableElement.style.left + "," + AllStores[i].TableElement.style.top + "," + AllStores[i].TableElement.style.zIndex);
    }
  }

  // stop dragging, clear out the "currently dragged store" and re-enable text selection
  oDraggingStore = null;
  bControlBarIsDragging = false;
  maindoc.body.style.MozUserSelect = "text";
}


/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function TogglePlaza()
{
  mainframe = window.top.document.getElementsByName('mainpane')[0];
  maindoc = mainframe.contentDocument;
  
  maindoc.addEventListener("mousemove", MoveMouse, false);
  maindoc.addEventListener("mouseup", StopDrag, false);

  // the main overlay is the whole set of shop windows and the background. save it here for the whole script to use.
  eMainOverlay = maindoc.getElementById('overlay');

  if(eMainOverlay == null)
  {
    if(maindoc.body.innerHTML.indexOf("You're fighting") >= 0 && maindoc.body.innerHTML.indexOf("Adventure Again") < 0)
    {
      alert("You're fighting. Maybe you shouldn't be mid-brawl when you go shopping. Just a thought...");
      return;
    }

    eMainOverlay = document.createElement("div");
    eMainOverlay.style.display = "block";
    eMainOverlay.id = "overlay";
    eMainOverlay.name = "overlay";
    eMainOverlay.style.display = "block";
    eMainOverlay.style.position = "absolute";
    eMainOverlay.style.top = "0px";
    eMainOverlay.style.left = "0px";
    eMainOverlay.style.zIndex = "90";
    eMainOverlay.style.width = "100%";
    eMainOverlay.style.height = maindoc.body.scrollHeight + "px";
    eMainOverlay.style.backgroundColor= "#FFFFFF";
    eMainOverlay.style.border = "1px solid black";
    maindoc.documentElement.appendChild(eMainOverlay);

    var iCurrentX = 20;
    var iCurrentY = 20;
    var iCurrentRowHeight = 0;

    for(var i=0; i<AllStores.length; ++i)
    {
      CreateStoreFrontTable(AllStores[i]);
      // if the table element is null, the store is hidden.
      if(AllStores[i].TableElement == null)
        continue;

      if(AllStores[i].Visibility == null)
        AllStores[i].Visibility = GM_getValue(sCharacterName + "::" + AllStores[i].UniqueName + " Visibility", "");

      SetStoreVisibility(AllStores[i]);
      
      // if the store is white, at least put a border around it
      if(AllStores[i].TableElement.style.backgroundColor == eMainOverlay.style.backgroundColor)
        AllStores[i].TableElement.style.border = "1px solid black";
        
      // clientWidth and clientHeight only become available AFTER the element is inserted into the DOM
      eMainOverlay.appendChild(AllStores[i].TableElement);
      
      iCurrentX += iStoreWidth;

      if(AllStores[i].TableElement.clientHeight > iCurrentRowHeight)
        iCurrentRowHeight = AllStores[i].TableElement.clientHeight;
      if(iCurrentX > mainframe.scrollWidth - iStoreWidth)
      {
        iCurrentX = 20;
        iCurrentY += iCurrentRowHeight + 20;
        iCurrentRowHeight = 0;
      }
    }
  
    var eCloseLink = document.createElement("a");
    eCloseLink.href = "javascript:";
    eCloseLink.id = "CloseLink";
    eCloseLink.title = "Click to close";
    
    // thanks http://www.kawa.net/works/js/data-scheme/base64-e.html
    var sRedXImage = "data:image/gif;base64,"+
    "R0lGODlhEAAQALMAAM+vr+LPz4xAQMWfn7OAgIMwMOzf37yPj6lwcHkgIHAQENm/v/Xv76BgYP//"+
    "/2YAACH5BAAAAAAALAAAAAAQABAAAARg0MlJHXqqMftKW1TzjA/iEOQDSEeqBA6jkApjzOQwoSQh"+
    "pKYJI5FKCSqORXFUQzpERZAzUDw6n0tpRblMbCjD5ahRuZAQhdRKwh0lHAHcwyshkqSDlM4BsAcl"+
    "AA0CDTARADs=";
    eCloseLink.innerHTML = "<img src='" + sRedXImage + "' style='position:absolute; left: 1px; top: 1px;'/>" ;
    
    eCloseLink.style.position = "absolute";
    eCloseLink.style.top = "0px";
    eCloseLink.style.left = "0px";
    eCloseLink.style.display = "block";
    eCloseLink.style.width = "22px";
    eCloseLink.style.height = "22px";
    eCloseLink.zIndex = "99";
    eCloseLink.style.cursor = "pointer";
    eCloseLink.addEventListener("click", TogglePlaza, true);
    eMainOverlay.appendChild(eCloseLink);
    
    eMessageDiv = document.createElement("div");
    eMessageDiv.id = "MessageDiv";
    eMessageDiv.style.paddingLeft = "4px";
    eMessageDiv.style.paddingRight = "4px";
    eMessageDiv.style.display = "none";
    eMessageDiv.style.position = "absolute";
    eMessageDiv.style.top = "0px";
    eMessageDiv.style.left = "532px";
    eMessageDiv.style.fontSize = "10pt";
    eMessageDiv.style.backgroundColor = "#FF4444";
    eMessageDiv.style.MozBorderRadiusBottomright = "0.2em";
    eMessageDiv.style.MozBorderRadiusBottomleft = "0.2em";
    eMessageDiv.zIndex = "99";
    eMainOverlay.appendChild(eMessageDiv);
    
    var eBusyImage = document.createElement("img");
    eBusyImage.src = "data:image/gif;base64,"+
    "R0lGODlhCgAKAJEDAMzMzP9mZv8AAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAADACwAAAAA"+
    "CgAKAAACF5wncgaAGgJzJ647cWua4sOBFEd62VEAACH5BAUAAAMALAEAAAAIAAMAAAIKnBM2IoMD"+
    "AFMQFAAh+QQFAAADACwAAAAABgAGAAACDJwHMBGofKIRItJYAAAh+QQFAAADACwAAAEAAwAIAAAC"+
    "ChxgOBPBvpYQYxYAIfkEBQAAAwAsAAAEAAYABgAAAgoEhmPJHOGgEGwWACH5BAUAAAMALAEABwAI"+
    "AAMAAAIKBIYjYhOhRHqpAAAh+QQFAAADACwEAAQABgAGAAACDJwncqi7EQYAA0p6CgAh+QQJAAAD"+
    "ACwHAAEAAwAIAAACCpRmoxoxvQAYchQAOw==";
    eBusyImage.id = "BusyImage";
    eBusyImage.style.position = "absolute";
    eBusyImage.style.top = "3px";
    eBusyImage.style.left = "516px";
    eBusyImage.style.display = "none";
    eBusyImage.zIndex = "99";
    
    eMainOverlay.appendChild(eBusyImage);
    
    var eHideShopKeepsDiv = document.createElement("div");
    eHideShopKeepsDiv.id = "HideShopKeepsDiv";
    eHideShopKeepsDiv.style.position = "absolute";
    eHideShopKeepsDiv.style.top = "0px";
    eHideShopKeepsDiv.title = "Click to toggle shopkeep image visibility";
    eHideShopKeepsDiv.style.left = "200px";
    eHideShopKeepsDiv.style.height = "17px";
    eHideShopKeepsDiv.style.width = "78px";
    eHideShopKeepsDiv.style.cursor = "pointer";
    eHideShopKeepsDiv.style.fontSize = "10pt";
    eHideShopKeepsDiv.style.backgroundColor = "#DDDDDD";
    eHideShopKeepsDiv.style.MozBorderRadiusBottomright = "0.2em";
    eHideShopKeepsDiv.style.MozBorderRadiusBottomleft = "0.2em";
    if(GM_getValue(sCharacterName + "::ShowShopKeep", "1") == "1")
      eHideShopKeepsDiv.innerHTML = "<b style='position:absolute;top:0px;left:6px;'>Hide Images</b>";
    else
      eHideShopKeepsDiv.innerHTML = "<b style='position:absolute;top:0px;left:4px;'>Show Images</b>";
    eHideShopKeepsDiv.addEventListener("click", ToggleShopkeepImages, true);
    eMainOverlay.appendChild(eHideShopKeepsDiv);

    var eAutoBuyDiv = document.createElement("div");
    eAutoBuyDiv.id = "AutoBuyDiv";
    eAutoBuyDiv.style.position = "absolute";
    eAutoBuyDiv.style.top = "0px";
    eAutoBuyDiv.title = "Click to toggle automatically buying items you use if you don't have enough";
    eAutoBuyDiv.style.left = "123px";
    eAutoBuyDiv.style.height = "17px";
    eAutoBuyDiv.style.width = "74px";
    eAutoBuyDiv.style.fontSize = "10pt";
    eAutoBuyDiv.style.cursor = "pointer";
    eAutoBuyDiv.zIndex = "98";
    eAutoBuyDiv.style.backgroundColor = "#DDDDDD";
    eAutoBuyDiv.style.MozBorderRadiusBottomright = "0.2em";
    eAutoBuyDiv.style.MozBorderRadiusBottomleft = "0.2em";
    eAutoBuyDiv.innerHTML = "<b style='position:absolute;top:0px;left:20px;'>Auto Buy</b>";
    eAutoBuyDiv.addEventListener("click", function(){maindoc.getElementById("AutoBuyCheckbox").checked = !maindoc.getElementById("AutoBuyCheckbox").checked; ToggleAutoBuy();}, true);
    
    eAutoBuyCheckbox = document.createElement("input");
    eAutoBuyCheckbox.type = "checkbox";
    eAutoBuyCheckbox.id = "AutoBuyCheckbox";
    eAutoBuyCheckbox.style.cursor = "pointer";
    eAutoBuyCheckbox.checked = GM_getValue(sCharacterName + "::PlazaAutoBuy", false);
    eAutoBuyCheckbox.zIndex = "99";
    eAutoBuyCheckbox.style.marginTop = "2px";
    eAutoBuyCheckbox.addEventListener("click", function(){maindoc.getElementById("AutoBuyCheckbox").checked = !maindoc.getElementById("AutoBuyCheckbox").checked; ToggleAutoBuy();}, false);
    eAutoBuyDiv.appendChild(eAutoBuyCheckbox);
    
    eMainOverlay.appendChild(eAutoBuyDiv);
    
    var eShowHiddenStoresDiv = document.createElement("div");
    eShowHiddenStoresDiv.style.position = "absolute";
    eShowHiddenStoresDiv.id = "ShowHiddenStoresDiv";
    eShowHiddenStoresDiv.style.top = "0px";
    eShowHiddenStoresDiv.title = "Click to reveal all inaccessible and hidden stores";
    eShowHiddenStoresDiv.style.left = "40px";
    eShowHiddenStoresDiv.style.height = "17px";
    eShowHiddenStoresDiv.style.MozBorderRadiusBottomright = "0.2em";
    eShowHiddenStoresDiv.style.MozBorderRadiusBottomleft = "0.2em";
    eShowHiddenStoresDiv.style.width = "80px";
    eShowHiddenStoresDiv.style.fontSize = "10pt";
    eShowHiddenStoresDiv.style.cursor = "pointer";
    eShowHiddenStoresDiv.style.backgroundColor = "#DDDDDD";
    eShowHiddenStoresDiv.innerHTML = "<b style='position:absolute;top:0px;left:20px;'>All Stores</b>";
    eShowHiddenStoresDiv.addEventListener("click", function(){maindoc.getElementById("ShowHiddenStoresCheckbox").checked = !maindoc.getElementById("ShowHiddenStoresCheckbox").checked; ToggleShowHiddenStores();}, true);

    var eShowHiddenStoresCheckbox = document.createElement("input");
    eShowHiddenStoresCheckbox.type = "checkbox";
    eShowHiddenStoresCheckbox.id = "ShowHiddenStoresCheckbox";
    eShowHiddenStoresCheckbox.name = "ShowHiddenStoresCheckbox";
    eShowHiddenStoresCheckbox.checked = false;
    eShowHiddenStoresCheckbox.style.cursor = "pointer";
    eShowHiddenStoresCheckbox.zIndex = "99";
    eShowHiddenStoresCheckbox.style.marginTop = "2px";
    eShowHiddenStoresCheckbox.addEventListener("click", function(){maindoc.getElementById("ShowHiddenStoresCheckbox").checked = !maindoc.getElementById("ShowHiddenStoresCheckbox").checked; ToggleShowHiddenStores();}, false);
    eShowHiddenStoresDiv.appendChild(eShowHiddenStoresCheckbox);

    eMainOverlay.appendChild(eShowHiddenStoresDiv);

    var eRescrapeDiv = document.createElement("div");
    eRescrapeDiv.style.position = "absolute";
    eRescrapeDiv.style.top = "0px";
    eRescrapeDiv.id = "RescrapeDiv";
    eRescrapeDiv.title = "Click to re-evaluate which stores are hidden";
    eRescrapeDiv.style.left = "281px";
    eRescrapeDiv.style.height = "17px";
    eRescrapeDiv.style.width = "90px";
    eRescrapeDiv.style.cursor = "pointer";
    eRescrapeDiv.style.fontSize = "10pt";
    eRescrapeDiv.style.backgroundColor = "#DDDDDD";
    eRescrapeDiv.style.MozBorderRadiusBottomright = "0.2em";
    eRescrapeDiv.style.MozBorderRadiusBottomleft = "0.2em";
    eRescrapeDiv.innerHTML = "<b style='position:absolute;top:0px;left:3px;'>Refresh Access</b>";
    eRescrapeDiv.addEventListener("click", function() {ScrapeHtml();}, true);
    
    eMainOverlay.appendChild(eRescrapeDiv);
    
    var eReloadCharPaneAfterBuyDiv = document.createElement("div");
    eReloadCharPaneAfterBuyDiv.style.position = "absolute";
    eReloadCharPaneAfterBuyDiv.id = "ReloadCharPaneAfterBuyDiv";
    eReloadCharPaneAfterBuyDiv.style.top = "0px";
    eReloadCharPaneAfterBuyDiv.title = "Click to automatically reload character pane after all purchases (not just uses)";
    eReloadCharPaneAfterBuyDiv.style.left = "375px";
    eReloadCharPaneAfterBuyDiv.style.height = "17px";
    eReloadCharPaneAfterBuyDiv.style.MozBorderRadiusBottomright = "0.2em";
    eReloadCharPaneAfterBuyDiv.style.MozBorderRadiusBottomleft = "0.2em";
    eReloadCharPaneAfterBuyDiv.style.width = "133px";
    eReloadCharPaneAfterBuyDiv.style.fontSize = "10pt";
    eReloadCharPaneAfterBuyDiv.style.cursor = "pointer";
    eReloadCharPaneAfterBuyDiv.style.backgroundColor = "#DDDDDD";
    eReloadCharPaneAfterBuyDiv.innerHTML = "<b style='position:absolute;top:0px;left:20px;'>Always Reload Char</b>";
    eReloadCharPaneAfterBuyDiv.addEventListener("click", function(){maindoc.getElementById("ReloadCharPaneAfterBuyCheckbox").checked = !maindoc.getElementById("ReloadCharPaneAfterBuyCheckbox").checked; ToggleAutoCharPaneRefresh();}, true);

    eReloadCharPaneAfterBuyCheckbox = document.createElement("input");
    eReloadCharPaneAfterBuyCheckbox.type = "checkbox";
    eReloadCharPaneAfterBuyCheckbox.id = "ReloadCharPaneAfterBuyCheckbox";
    eReloadCharPaneAfterBuyCheckbox.name = "ReloadCharPaneAfterBuyCheckbox";
    eReloadCharPaneAfterBuyCheckbox.checked = GM_getValue(sCharacterName + "::PlazaAutoCharPaneRefresh", false);
    eReloadCharPaneAfterBuyCheckbox.style.cursor = "pointer";
    eReloadCharPaneAfterBuyCheckbox.zIndex = "99";
    eReloadCharPaneAfterBuyCheckbox.style.marginTop = "2px";
    eReloadCharPaneAfterBuyCheckbox.addEventListener("click", function(){maindoc.getElementById("ReloadCharPaneAfterBuyCheckbox").checked = !maindoc.getElementById("ReloadCharPaneAfterBuyCheckbox").checked; ToggleAutoCharPaneRefresh();}, false);
    eReloadCharPaneAfterBuyDiv.appendChild(eReloadCharPaneAfterBuyCheckbox);

    eMainOverlay.appendChild(eReloadCharPaneAfterBuyDiv);

    AlignStores();
  }
  else if(eMainOverlay.style.display != "none")
  {
    eMainOverlay.style.display = "none";
  }
  else
  {
    eMainOverlay.style.display = "block";
  }

  // hack because I can't get scrollTop, YOffset or scrollTo() to work from another frame
  maindoc.getElementById("ShowHiddenStoresCheckbox").focus();
  return false;
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function ScrapeHtml()
{
  if(AllStores == null)
  {
    Log("ScrapeHtml() cannot continue because store data has not been loaded. Calling from " + window.location);
    return;
  }
    
  for(var i=0; i<AllStores.length; ++i)
    GM_deleteValue(AllStores[i].UniqueName + " Visibility");

  ShowProgress("Scraping Html");
  Log("Sending Scrape Requests to Equipment and Char Sheet pages");
  
  sEquipHtml = null;
  sCharSheetHtml = null;
  
  GM_xmlhttpRequest
  ({
    method:"GET",
    url:"http://" + window.location.host + "/inventory.php?which=2",
    onload: LoadEquipmentHtml
  });
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function LoadEquipmentHtml(response)
{
  if(response.readyState != 4)
    return;

  Log("Recieved Equip page, sending request for CharSheet");
  ShowProgress("Got equip page, getting CharSheet");
  sEquipmentHtml = response.responseText;

  GM_xmlhttpRequest
  ({
    method:"GET",
    url:"http://" + window.location.host + "/charsheet.php",
    onload: LoadCharSheetHtml
  });

}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function LoadCharSheetHtml(response)
{
  if(response.readyState != 4)
    return;

  ShowProgress("Recieved CharSheet");
  Log("Recieved Char Sheet");

  sCharSheetHtml = response.responseText;
  sCharacterName = StringBetween(sCharSheetHtml, "bgcolor=blue><b>", "</b>");
  FilterStoresByOtherPages();
  var eShoppingCartLink = eTopDoc.getElementById("MenuLink");
  if(eShoppingCartLink != null)
    eShoppingCartLink.style.display="block";
    
  sPlayerId = StringBetween(sCharSheetHtml, "(#", ")");
  sPasswordHash = GetPassword();

  CreateTopPaneFavoritesDdl();
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function CreateTopPaneFavoritesDdl()
{
  var eFavoritesTable = eTopDoc.getElementById("FavoritesTable");
  if(eFavoritesTable == null)
    return;

  eFavoritesTable.style.display="none";
  
  var eFavoritesDdl = eTopDoc.getElementById("FavoritesDdl");
  if(eFavoritesDdl == null)
    return;

  var sFavorites = GM_getValue(sCharacterName + "::Favorite Items", "");
  if(sFavorites == "")
    return;
    
  var asFavoritesItems = sFavorites.split("~");
  if(asFavoritesItems.length <= 0)
    return;

  eFavoritesDdl.options.length = 0;
  for(var i=0; i < asFavoritesItems.length; ++i)
  {
    var asCurrentItemParts = asFavoritesItems[i].split(",");
    var oStore = GetStoreFromUniqueName(asCurrentItemParts[0]);
    var oItem = GetItemFromStore(oStore, asCurrentItemParts[1]);
    
    eFavoritesDdl.options[eFavoritesDdl.options.length] = new Option(oItem.Name, asFavoritesItems[i]);
  }

  eFavoritesTable.style.display="block";
  
  if(asFavoritesItems.length > 0)
    CreateTopBuyLinks();
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function FilterStoresByOtherPages()
{
  Log("Filtering Stores");
  
  var sPlayerSign = StringBetween(sCharSheetHtml, "Sign:</td><td><b>", "</b>");

  for(var i=0; i<AllStores.length; ++i)
  {
    if(AllStores[i].Visibility != null && AllStores[i].Visibility.indexOf("Override") >= 0)
      break;
      
    AllStores[i].Visibility = "";
    if(AllStores[i].RequiredOutfits != null && AllStores[i].RequiredOutfits.length > 0)
    {
      AllStores[i].Visibility = "Hidden - No Outfit";
      for(var j=0; j<AllStores[i].RequiredOutfits.length; ++j)
      {
        if(sEquipmentHtml.indexOf(AllStores[i].RequiredOutfits[j]) > 0)
        {
          Log(AllStores[i].UniqueName + " shown because you have outfit " + AllStores[i].RequiredOutfits[j]);
          AllStores[i].Visibility = "";
          break;
        }
        else
          Log(AllStores[i].UniqueName + " not yet shown because you don't have outfit " + AllStores[i].RequiredOutfits[j]);
      }
    }

    if(AllStores[i].Classes != null && AllStores[i].Classes.length > 0 && AllStores[i].Visibility.indexOf("Hidden") < 0)
    {
      AllStores[i].Visibility = "Hidden - Wrong Class";
      for(var j=0; j<AllStores[i].Classes.length; ++j)
      {
        if(AllStores[i].Classes[j] == GetCharacterClass())
        {
          //Log(AllStores[i].UniqueName + " shown because you are " + AllStores[i].Classes[j]);
          AllStores[i].Visibility = "";
          break;
        }
      }
    }

    if(AllStores[i].Level != null && AllStores[i].Level > 1 && AllStores[i].Visibility.indexOf("Hidden") < 0)
    {
      if(GetCharacterLevel() < AllStores[i].Level)
        AllStores[i].Visibility = "Hidden - Level Requirement";
    }
    
    if(AllStores[i].Signs != null && AllStores[i].Signs.length > 0 && AllStores[i].Visibility.indexOf("Hidden") < 0)
    {
      var aAllSigns = AllStores[i].Signs.split(",");
      AllStores[i].Visibility = "Hidden - Wrong Sign";
      for(var j=0; j<aAllSigns.length; ++j)
      {
        if(aAllSigns[j] == sPlayerSign)
        {
          //Log(AllStores[i].UniqueName + " shown because you are sign " + sPlayerSign);
          AllStores[i].Visibility = "";
          break;
        }
      }
    }
    
  }

  for(var i=0; i<AllStores.length; ++i)
    SetStoreVisibility(AllStores[i]);
  ShowSuccess("Scrape Successful");
  Log("Filtering Stores Successful");
  
  document.getElementById("MenuLink").style.display = "block";
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function SetStoreVisibility(oStore)
{
  if(sCharacterName != null && sCharacterName.length > 0)
    GM_setValue(sCharacterName + "::" + oStore.UniqueName + " Visibility", oStore.Visibility);

  if(oStore.TableElement == null || maindoc == null)
    return;

  if(oStore.Visibility.indexOf("Hidden") >= 0)
  {
    oStore.TableElement.title = oStore.Visibility;
    var eCheckbox = maindoc.getElementById("ShowHiddenStoresCheckbox");
    if(eCheckbox != null && eCheckbox.checked)
    {
      oStore.TableElement.style.display = 'block';
      oStore.TableElement.style.backgroundColor = "#FF0000";
    }
    else
    {
      oStore.TableElement.style.display = 'none';
      oStore.TableElement.style.backgroundColor = oStore.Color;
    }
  }
  else
  {
    oStore.TableElement.style.display = 'block';
    oStore.TableElement.style.backgroundColor = oStore.Color;
  }
}


/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function GetCharacterLevel()
{
  if(iCharacterLevel < 1)
    iCharacterLevel = parseInt(StringBetween(sCharSheetHtml, "Level ", "<"));
  
  return iCharacterLevel;
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function GetCharacterClass()
{
  if(sClassAbbreviation == null || sClassAbbreviation == "")
  {
    var asPmClasses = ["Dough Acolyte", "Yeast Scholar", "Noodle Neophyte", "Starch Savant", "Carbohydrate Cognoscenti", "Spaghetti Sage", "Macaroni Magician", "Vermicelli Enchanter", "Linguini Thaumaturge", "Ravioli Sorcerer", "Manicotti Magus", "Spaghetti Spellbinder", "Cannelloni Conjurer", "Angel-Hair Archmage", "Pastamancer"];
    var asSaClasses = ["Allspice Acolyte", "Cilantro Seer", "Parsley Enchanter", "Sage Sage", "Rosemary Diviner", "Thyme Wizard", "Tarragon Thaumaturge", "Oreganoccultist", "Basillusionist", "Coriander Conjurer", "Bay Leaf Brujo", "Sesame Soothsayer", "Marinara Mage", "Alfredo Archmage", "Sauceror"];
    var asScClasses = ["Lemming Trampler", "Tern Slapper", "Puffin Intimidator", "Ermine Thumper", "Penguin Frightener", "Malamute Basher", "Narwhal Pummeler", "Otter Crusher", "Caribou Smacker", "Moose Harasser", "Reindeer Threatener", "Ox Wrestler", "Walrus Bludgeoner", "Whale Boxer", "Seal Clubber"];
    var asTtClasses = ["Toad Coach", "Skink Trainer", "Frog Director", "Gecko Supervisor", "Newt Herder", "Frog Boss", "Iguana Driver", "Salamander Subduer", "Bullfrog Overseer", "Rattlesnake Chief", "Crocodile Lord", "Cobra Commander", "Alligator Subjugator", "Asp Master", "Turtle Tamer"];
    var asAtClasses = ["Polka Criminal", "Mariachi Larcenist", "Zydeco Rogue", "Chord Horker", "Chromatic Crook", "Squeezebox Scoundrel", "Concertina Con Artist", "Button Box Burglar", "Hurdy-Gurdy Hooligan", "Sub-Sub-Apprentice Accordion Thief", "Sub-Apprentice Accordion Thief", "Pseudo-Apprentice Accordion Thief", "Hemi-Apprentice Accordion Thief", "Apprentice Accordion Thief", "Accordion Thief"];
    var asDbClasses = ["Funk Footpad", "Rhythm Rogue", "Chill Crook", "Jiggy Grifter", "Beat Snatcher", "Sample Swindler", "Move Buster", "Jam Horker", "Groove Filcher", "Vibe Robber", "Boogie Brigand", "Flow Purloiner", "Jive Pillager", "Rhymer And Stealer", "Disco Bandit"];
    for(var i=0; i<asPmClasses.length; ++i)
    {
      if(sCharSheetHtml.indexOf(asPmClasses[i]) > 0)
      {
        sClassAbbreviation = "P";
        break;
      }
      if(sCharSheetHtml.indexOf(asSaClasses[i]) > 0)
      {
        sClassAbbreviation = "S";
        break;
      }
      if(sCharSheetHtml.indexOf(asScClasses[i]) > 0)
      {
        sClassAbbreviation = "SC";
        break;
      }
      if(sCharSheetHtml.indexOf(asTtClasses[i]) > 0)
      {
        sClassAbbreviation = "TT";
        break;
      }
      if(sCharSheetHtml.indexOf(asAtClasses[i]) > 0)
      {
        sClassAbbreviation = "AT";
        break;
      }
      if(sCharSheetHtml.indexOf(asDbClasses[i]) > 0)
      {
        sClassAbbreviation = "DB";
        break;
      }
    }
  }
  
  return sClassAbbreviation;
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function ToggleShowHiddenStores()
{
  for(var i=0; i<AllStores.length; ++i)
    SetStoreVisibility(AllStores[i]);
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function ToggleAutoBuy()
{
  GM_setValue(sCharacterName + "::PlazaAutoBuy", eAutoBuyCheckbox.checked);
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function ToggleShopkeepImages()
{
  if(GM_getValue(sCharacterName + "::ShowShopKeep", "1") == "1")
    GM_setValue(sCharacterName + "::ShowShopKeep", "0");
  else
    GM_setValue(sCharacterName + "::ShowShopKeep", "1");

  KillPlaza();
  GetAllStores();
  TogglePlaza();
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function ToggleAutoCharPaneRefresh()
{
  GM_setValue(sCharacterName + "::PlazaAutoCharPaneRefresh", eReloadCharPaneAfterBuyCheckbox.checked);
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function CreateStoreFrontTable(oStore)
{
  //Log("Creating StoreFront " + oStore.UniqueName);
  var eTable = document.createElement("table");
  eTable.id = oStore.UniqueName + "Table";
  eTable.style.fontFamily = "arial";
  eTable.style.MozBorderRadiusTopleft = "1em";
  eTable.style.MozBorderRadiusTopright = "1em";
  eTable.style.fontSize = "8pt"
  eTable.style.position = "absolute";
  eTable.style.backgroundColor = oStore.Color;
  if(oStore.FontColor != null)
    eTable.style.color = oStore.FontColor;
  
  // if the AddRow function exists (is overridden), it will do the work.
  // This allows Favorites, Recent Purchases and other special "shops" to do their special thing
  if(oStore.AddRow != null)
  {
    while(oStore.AddRow(eTable) != null)
    {
      // do nothing, the AddRow() function does all the work
    }
    
    // if there was nothing to add, the store could implement a special message like "click a star to add a favorite"
    if(eTable.rows.length < 1)
    {
      var row = eTable.insertRow(0);
      var cell = row.insertCell(0);
      cell.innerHTML = "&nbsp;&nbsp;" + oStore.EmptyMessage;
    }
  }
  else // default AddRow() implementation
  {
    for(var i=0; i<oStore.Items.length; ++i)
    {
      var eRow = eTable.insertRow(i);

      var eDescriptionCell = eRow.insertCell(0);
      
      // add the star on the left so the user can favorite the item
      var eFavoriteLink = CreateFavoriteLink(oStore, oStore.Items[i]);
      eDescriptionCell.appendChild(eFavoriteLink);
      
      // then add the name of the item, with the appropriate tooltip (usually the item effect)
      eDescriptionCell.appendChild(document.createTextNode(" " + oStore.Items[i].Name));
      eDescriptionCell.title = oStore.Items[i].Tooltip;

      // then the cost of one item
      var eCostCell = eRow.insertCell(1);
      eCostCell.innerHTML = oStore.Items[i].Cost

      // and finally the purchace links.
      var eOptionsCell = eRow.insertCell(2);
      for(var q=0; q<aiQuantities.length; ++q)
      {
        var eBuyLink = CreateBuyLink(oStore.Items[i], oStore, aiQuantities[q]);
        if(oStore.FontColor != null)
          eBuyLink.style.color = oStore.FontColor;
        eOptionsCell.appendChild(eBuyLink);
      }
    }
  }

  // should we show the shop keep dudes' pictures?
  if(GM_getValue(sCharacterName + "::ShowShopKeep", "1") == "1")
  {
    var eShopKeepCell = eTable.rows[0].insertCell(0);
    eShopKeepCell.rowSpan = eTable.rows.length;
    
    var sShopKeepUrl = oStore.ShopUrl;
    if(sShopKeepUrl == null && oStore.ShopCode != null)
      sShopKeepUrl = "store.php?whichstore=" + oStore.ShopCode;
      
    var sShopKeepImageTag = "<img border='0' ";
    if(oStore.ImageHeight != null)
      sShopKeepImageTag += " height='" + oStore.ImageHeight + "' ";
    if(oStore.ImageWidth != null)
      sShopKeepImageTag += " width='" + oStore.ImageWidth + "' ";
    sShopKeepImageTag += " src='" + oStore.ShopKeepImageLocation + "' />";

    // not all stores are visitable, so only make visitable stores (i.e., not favorites or purchases) clickable
    if(sShopKeepUrl != null)
    {
      var eShopkeepLink = document.createElement("a");
      eShopkeepLink.href = "javascript:/*~" + oStore.UniqueName + "~*/";
      eShopkeepLink.innerHTML = sShopKeepImageTag;
      eShopkeepLink.addEventListener("click", VisitShop, true);
      eShopKeepCell.title = "Click the picture to visit the " + oStore.UniqueName;
      eShopKeepCell.appendChild(eShopkeepLink);
    }
    else
    {
      eShopKeepCell.innerHTML = sShopKeepImageTag;
    }

    eShopKeepCell.style.backgroundColor = "#FFFFFF";
  }

  // The control bar is the title bar of the shop. It has the shop name and the options link
  var eControlBarRow = eTable.insertRow(0);
  eControlBarRow.style.backgroundColor = "#0000BB";
  eControlBarRow.style.color = "#FFFFFF";
  eControlBarRow.style.MozBorderRadiusTopright = "2em";
  eControlBarRow.style.MozBorderRadiusTopleft  = "2em";
  eControlBarRow.style.MozUserSelect = "none";
  var eControlBarCell = eControlBarRow.insertCell(0);
  if(eTable.rows.length > 1)
    eControlBarCell.colSpan = eTable.rows[1].cells.length;
  eControlBarCell.style.textAlign = "center";
  eControlBarCell.style.MozUserSelect = "none";
  eControlBarCell.style.MozBorderRadiusTopright = "2em";
  eControlBarCell.style.MozBorderRadiusTopleft  = "2em";
  eControlBarCell.style.cursor = "move";

  eControlBarCell.appendChild(document.createTextNode(oStore.UniqueName));
  
  /*
  
  var eOptionsButton = document.createElement("div");
  eOptionsButton.style.backgroundColor = "#00DD00";
  eOptionsButton.style.position = "absolute";
  eOptionsButton.style.left = "195px";
  eOptionsButton.style.top = "5px";
  eOptionsButton.style.width = "8px";
  eOptionsButton.style.height = "8px";
  eOptionsButton.style.cursor = "pointer";
  eOptionsButton.addEventListener("click", function(e){ ShowStoreOptions(e, oStore);}, true);
  eControlBarCell.appendChild(eOptionsButton);
  */
  
  eControlBarCell.addEventListener("mousedown", StartDrag, false);
  

  // if we saved a position before, load it now
  var sLastPosition = GM_getValue(sCharacterName + "::" + oStore.UniqueName + "::Position", "-1px,-1px,0");
  try
  {
    //Log("Setting store " + oStore.UniqueName + " position to " + sLastPosition);
    eTable.style.left = sLastPosition.split(",")[0];
    eTable.style.top = sLastPosition.split(",")[1];
    eTable.style.zIndex = sLastPosition.split(",")[2];
  }
  catch(e)
  {
    Log("Error Setting Last position! " + e);
    eTable.style.top = "-1px";
    eTable.style.left = "-1px";
    eTable.style.zIndex = "0";
  }

  oStore.TableElement = eTable;
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function ShowStoreOptions(e, oStore)
{

  var eOptionsDiv = maindoc.getElementById("StoreOptionsDiv");
  if(eOptionsDiv != null)
  {
    HideStoreOptions();
    return;
  }
  eOptionsDiv = document.createElement("div");
  eOptionsDiv.id = "StoreOptionsDiv";
  eOptionsDiv.style.position = "absolute";
  eOptionsDiv.style.left = e.clientX + "px";
  eOptionsDiv.style.top = e.clientY + "px";
  eOptionsDiv.style.width ="300px";
  eOptionsDiv.style.height ="300px";
  eOptionsDiv.style.zIndex = "9999";
  eOptionsDiv.style.backgroundColor = "#CCCCCC";

  var eTitleBar = document.createElement("div");
  eTitleBar.style.poition = "absolute";
  eTitleBar.style.left = "1px";
  eTitleBar.style.top = "1px";
  eTitleBar.style.width = "100%";
  eTitleBar.style.height = "100%";
  eTitleBar.style.fontWeight = "bold";
  eTitleBar.innerHTML = "&nbsp;&nbsp;&nbsp;" + oStore.UniqueName + " Options";
  eOptionsDiv.appendChild(eTitleBar);
  
  //eOptionsDiv.addEventListener("click", HideStoreOptions, true);
  eMainOverlay.appendChild(eOptionsDiv);

  var eColorInput = document.createElement("input");
  eColorInput.id = "ColorInput";
  eColorInput.type = "text";
  eColorInput.style.position = "absolute";
  eColorInput.style.left = "50px";
  eColorInput.style.top = "30px";
  eColorInput.style.width = "100px";
  eColorInput.value = oStore.Color;
  /*
  eColorInput.addEventListener
  (
    "keyup",
    function()
    {
      MakeSureTextboxContains8BitNumber(this);
      return true;
    },
    false
  );
  */
  
  eOptionsDiv.appendChild(eColorInput);

  var eColorLabel = document.createElement("div");
  eColorLabel.innerHTML = "Color";
  eColorLabel.style.position = "absolute";
  eColorLabel.style.left = "10px";
  eColorLabel.style.top = "30px";
  eOptionsDiv.appendChild(eColorLabel);
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function MakeSureTextboxContains8BitNumber(eTextBox)
{
  var iValue;
  try
  {
    while(this.value.length > 1 && this.value[0] == "0")
      this.value = this.value.substring(1);

    iValue = parseInt(this.value);
    if(iValue < 0 || iValue == Number.NaN)
    {
      this.value = "0";
      iValue = 0;
    }
    if(iValue > 255)
    {
      this.value = "255";
      iValue = 255;
    }
    for(var i=0; i<this.value.length; ++i)
    {
      if("1234567890".indexOf(this.value[i]) < 0)
      {
        this.value = "0";
        iValue = 0;
        break;
      }
    }
  }
  catch(ex)
  {
    this.value = "0";
    iValue = 0;
  }
  return iValue;
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function HideStoreOptions()
{
  var eOptionsDiv = maindoc.getElementById("StoreOptionsDiv");
  
  // Can't be letting multiple store options to be open
  while(eOptionsDiv != null)
  {
    eOptionsDiv.parentNode.removeChild(eOptionsDiv);
    eOptionsDiv = maindoc.getElementById("StoreOptionsDiv");
  }
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function KillPlaza()
{
  for(var i=0; i<eMainOverlay.childNodes.length; ++i)
    eMainOverlay.removeChild(eMainOverlay.childNodes[i]);
  eMainOverlay.parentNode.removeChild(eMainOverlay);
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

var sBuyingItemId;
var sBuyingQuantity;
var oBuyingFromStore;

function BuyItem()
{
  var asParts = this.href.split("~");
  oBuyingFromStore = GetStoreFromUniqueName(asParts[1]);
  sBuyingItemId = asParts[2];
  sBuyingQuantity = asParts[3];
  
  
  // if the store has a custom Buy() method, let it handle its own purchases
  if(oBuyingFromStore.Buy != null)
  {
    oBuyingFromStore.Buy(sBuyingQuantity, sBuyingItemId, sPasswordHash);
  }
  else if(oBuyingFromStore.Outfit == "0")
  {
    // if no special outfit is required, just buy the item and skip to the end
    GM_xmlhttpRequest
    ({
      method:"POST",
      url:"http://" + window.location.host + "/store.php",
      headers:{"Content-type":"application/x-www-form-urlencoded"},
      onload: PurchaseComplete,
      data:encodeURI("phash=" + sPasswordHash + "&whichstore=" + oBuyingFromStore.ShopCode + "&buying=Yep.&whichitem=" + sBuyingItemId + "&howmany=" + sBuyingQuantity)
    });
  }
  else
  {
    ShowProgress("Creating Backup Outfit");
    GM_xmlhttpRequest({method:"GET", url:"http://" + window.location.host + "/inv_equip.php?action=customoutfit&outfitname=BackupPlaza&ajax=1", onload:GetNewBackupOutfitId});
  }
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function GetNewBackupOutfitId(response)
{
  if(response.readyState != 4)
    return;

  ShowProgress("Reticulating Splines");

  GM_xmlhttpRequest
  ({
    method:"GET",
    url:"http://" + window.location.host + "/inventory.php?which=2&ajax=1",
    onload: EquipStoreOutfit
  });
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function VisitShop()
{
  var asParts = this.href.split("~");
  oBuyingFromStore = GetStoreFromUniqueName(asParts[1]);
  if(oBuyingFromStore.Outfit != null && oBuyingFromStore.Outfit != "0")
  {
    Log("Visiting Shop " + asParts[1] + ", equpping outfit " + oBuyingFromStore.Outfit);
    SendOutfitChange(oBuyingFromStore.Outfit, VisitShop2);
    
    //GM_xmlhttpRequest({method:"GET", url:"http://" + window.location.host + "/inv_equip.php?action=outfit&whichoutfit=" + oBuyingFromStore.Outfit, onload:function(response){if(response.readyState != 4) return; VisitShop2();}});
  }
  else
    VisitShop2(null);
}

function VisitShop2(response)
{
  if(response != null && response.readyState != 4)
    return;
    
  var sShopKeepUrl = oBuyingFromStore.ShopUrl;
  if(sShopKeepUrl == null && oBuyingFromStore.ShopCode != null)
    sShopKeepUrl = "store.php?whichstore=" + oBuyingFromStore.ShopCode;

  if(sShopKeepUrl != null)
    maindoc.location.href = sShopKeepUrl;
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function EquipStoreOutfit(response)
{
  if(response.readyState != 4)
    return;
  
  ShowProgress("Dressing up");
  SendOutfitChange(oBuyingFromStore.Outfit, SendPurchaseItem);
  //GM_xmlhttpRequest({method:"GET", url:"http://" + window.location.host + "/inv_equip.php?action=outfit&whichoutfit=" + oBuyingFromStore.Outfit, onload:SendPurchaseItem });
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function SendPurchaseItem(response)
{
  if(response != null && response.readyState != 4)
    return;

  ShowProgress("Buying your items");
  
  GM_xmlhttpRequest
  ({
    method:"POST",
    url:"http://" + window.location.host + "/store.php",
    headers:{"Content-type":"application/x-www-form-urlencoded"},
    onload:RestoreOutfit,
    data:encodeURI("phash=" + sPasswordHash + "&whichstore=" + oBuyingFromStore.ShopCode + "&buying=Yep.&whichitem=" + sBuyingItemId + "&howmany=" + sBuyingQuantity)
  });
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function RestoreOutfit(response)
{
  if(response.readyState != 4)
    return;
  
  //Log("Restoring Outfit for using http://" + window.location.host + "/inv_equip.php?action=outfit&which=2&whichoutfit=" + sBackupOutfitId + "&ajax=1");

  GM_xmlhttpRequest
  (
    {
      method:"GET",
      url:"http://" + window.location.host + "/inventory.php?which=2",
      onload: RestoreOutfit2
    }
  );
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function RestoreOutfit2(response)
{
  if(response.readyState != 4)
    return;
  
  var sImportantBit = response.responseText.substr(response.responseText.indexOf("BackupPlaza") - 10, 10)
  sBackupOutfitId = StringBetween(sImportantBit, "=", ">");
  
  //alert("BackupPlaza outfit " + sBackupOutfitId);
  if(sBackupOutfitId == null || sBackupOutfitId == "")
  {
    alert("Error finding the BackupPlaza outfit ID. Please go into your inventory and equip the \"BackupPlaza\" outfit manually");
    /*
    if(response.statusText.toUpperCase() == "FOUND")
    {
      alert("OH GOD FOUND!");
      GetResponseHeader(response, "Location");
      GM_xmlhttpRequest
      (
        {
          method:"GET",
          url:"http://" + window.location.host + "/" + GetResponseHeader(response, "Location"),
          onload: RestoreOutfit2
        }
      );
    }
    alert("Bit:" + sImportantBit + "\r\n" + response.responseText.substring(9999));
    */
    ShowError("Purchase successfull, outfit not restored.");
    return;
  }

  if(response.responseText.indexOf("can't afford") >= 0)
  {
    ShowError("You're poor.");
    alert("You can't afford " + sBuyingQuantity + " x " + GetItemFromStore(oBuyingFromStore, sBuyingItemId).Name + ". You're so poor :(");
    SendOutfitChange(sBackupOutfitId, null);
  }
  else if(response.responseText.indexOf("don't belong") >= 0)
  {
    ShowError("You can't go there.");
    alert("You aren't allowed in " + oBuyingFromStore.UniqueName + ". :(");
    SendOutfitChange(sBackupOutfitId, null);
  }
  else
    ShowProgress("Put your clothes on!");

  //Log("Restoring Outfit: http://" + window.location.host + "/inv_equip.php?action=outfit&which=2&whichoutfit=" + sBackupOutfitId + "&ajax=1");
  //SubmitChatRequest("/outfit last", PurchaseComplete);
  SendOutfitChange(sBackupOutfitId, PurchaseComplete);
  /*
  GM_xmlhttpRequest
  (
    {
      method:"GET",
      url:"http://" + window.location.host + "/inv_equip.php?action=outfit&which=2&whichoutfit=" + sBackupOutfitId + "&ajax=1",
      onload: PurchaseComplete
    }
  );
  */
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function SendOutfitChange(sOutfitId, fCallback)
{
  Log("Submitting outfit change " + sOutfitId);
  GM_xmlhttpRequest({method:"GET", url:"http://" + window.location.host + "/inv_equip.php?action=outfit&whichoutfit=" + sOutfitId, onload:fCallback });
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function GetResponseHeader(response, sHeader)
{
  if(response.responseHeaders == null)
    return null;
  alert(response.responseHeaders);
  return "";
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function SubmitChatRequest(sCommand, fCallback)
{
  Log("Submitting new chat request: " + sCommand);
  GM_xmlhttpRequest({method:"GET", url:"http://" + window.location.host + "/submitnewchat.php?playerid=" + sPlayerId + "&pwd=" + sPasswordHash + "&graf=" + encodeURIComponent(sCommand), onload:fCallback });

}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function PurchaseComplete(response)
{
  if(response.readyState != 4)
    return;
  
  if(response.responseText.indexOf("can't afford") >= 0)
  {
    ShowError("You're poor.");
    alert("You can't afford " + sBuyingQuantity + " x " + GetItemFromStore(oBuyingFromStore, sBuyingItemId).Name + ". You're so poor :(");
    return;
  }
  else if(response.responseText.indexOf("don't belong") >= 0)
  {
    ShowError("You can't go there.");
    alert("You aren't allowed in " + oBuyingFromStore.UniqueName + ". :(");
    return;
  }

  SavePurchaseToHistory(oBuyingFromStore, sBuyingItemId, sBuyingQuantity);
  
  if(bUseItemAfterPurchase == true)
  {
    bUseItemAfterPurchase = false;
    ShowProgress("Using newly-bought items");
    UseItem(oBuyingFromStore, GetItemFromStore(oBuyingFromStore, sBuyingItemId), sBuyingQuantity);
  }
  else
  {
    ShowSuccess("Purchase Complete");
    
    var bReloadCharPane = GM_getValue(sCharacterName + "::PlazaAutoCharPaneRefresh", false);
    if(eReloadCharPaneAfterBuyCheckbox != null)
      bReloadCharPane = eReloadCharPaneAfterBuyCheckbox.checked;
    if(bReloadCharPane)
      window.top.document.getElementsByName('charpane')[0].contentDocument.location.reload();
  }
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

var tFadeMessageTimer = null;

function ShowProgress(sMessage)
{
  if(tFadeMessageTimer != null)
    clearTimeout(tFadeMessageTimer);
  
  var doc = maindoc;
  if(doc == null)
    doc = document;
    
  var eBusyImage = doc.getElementById("BusyImage");
  if(eBusyImage == null)
    eBusyImage = doc.getElementById("TopBusyImage");
  
  if(eBusyImage != null)
    eBusyImage.style.display = "block";
   
  var msg = GetMessageDiv();
  if(msg != null)
  {
    msg.innerHTML = sMessage;
    msg.style.opacity = 1.0;
    msg.style.display = 'block';
    msg.style.fontWeight = "normal";
    msg.style.backgroundColor = "#DDDDDD";
  }
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function ShowError(sMessage)
{
  if(tFadeMessageTimer != null)
    clearTimeout(tFadeMessageTimer);

  var doc = maindoc;
  if(doc == null)
    doc = document;
    
  var eBusyImage = doc.getElementById("BusyImage");
  if(eBusyImage == null)
    eBusyImage = doc.getElementById("TopBusyImage");

  if(eBusyImage != null)
    eBusyImage.style.display = "none";

  var msg = GetMessageDiv();
  if(msg != null)
  {
    msg.innerHTML = sMessage;
    msg.style.opacity = 1.0;
    msg.style.display = 'block';
    msg.style.fontWeight = "bold";
    msg.style.backgroundColor = "#FF0000";

    // show the message for 3 seconds, then fade it out over the course of 1.8 more seconds
    tFadeMessageTimer = setTimeout(function(){FadeMessageDiv(20, 20, 90);}, 3000);
  }
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function ShowSuccess(sMessage)
{
  if(tFadeMessageTimer != null)
    clearTimeout(tFadeMessageTimer);
  var doc = maindoc;
  if(doc == null)
    doc = document;
    
  var eBusyImage = doc.getElementById("BusyImage");
  if(eBusyImage == null)
    eBusyImage = doc.getElementById("TopBusyImage");
    
  if(eBusyImage != null)
    eBusyImage.style.display = "none";

  var msg = GetMessageDiv();
  if(msg != null)
  {
    msg.innerHTML = sMessage;
    msg.style.opacity = 1.0;
    msg.style.display = 'block';
    msg.style.fontWeight = "bold";
    msg.style.backgroundColor = "#00FF88";
    
    // show the message for 1.5 seconds, then fade it out over the course of 1.8 more seconds
    tFadeMessageTimer = setTimeout(function(){FadeMessageDiv(20, 20, 90);}, 1500);
  }
  
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function FadeMessageDiv(iSteps, iMaxSteps, iDelay)
{
  if(iSteps < 1)
  {
    GetMessageDiv().style.display = 'none';
    return;
  }
  GetMessageDiv().style.opacity = iSteps / iMaxSteps;
  tFadeMessageTimer = setTimeout(function(){FadeMessageDiv(iSteps - 1, iMaxSteps, iDelay);}, iDelay);
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function GetMessageDiv()
{
  if(eMainOverlay == null || eMainOverlay.style.display != "block" || eMessageDiv == null)
    return eTopMessageDiv;
  return eMessageDiv;
}


/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function GetStoreFromUniqueName(sStoreName)
{
  for(var i=0; i<AllStores.length; ++i)
  {
    if(AllStores[i].UniqueName == sStoreName.replace(/%20/g, " "))
      return AllStores[i];
  }
  
  return null;
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function GetItemFromStore(oStore, sItemId)
{
  for(var i=0; i<oStore.Items.length; ++i)
  {
    if(oStore.Items == null)
      continue;

    if(oStore.Items[i].Id == sItemId)
    {
      return oStore.Items[i];
    }
  }
  
  alert("Could not find item " + sItemId + " from store " + oStore.UniqueName);
  return null;
}

var sQuantity;
var oStore;
var oItem;
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function UseItemFromLink()
{
  var asParts = this.href.split("~");
  oStore = GetStoreFromUniqueName(asParts[1]);
  oItem = GetItemFromStore(oStore, asParts[2]);
  sQuantity = asParts[3];
  UseItem(oStore, oItem, sQuantity);
}

function UseItem(oBoughtFromStore, oUseThisItem, sUseQuantity)
{
  oStore = oBoughtFromStore;
  oItem = oUseThisItem;
  sQuantity = sUseQuantity;

  if(oItem.ConfirmUse != null)
  {
    if(oItem.ConfirmUse() == false)
    {
      ShowError("Item use cancelled. By you.");
      return;
    }
  }
  
  ShowProgress("Using " + sQuantity + " " + oItem.Name);
  GM_xmlhttpRequest
  ({
    method:"POST",
    url:"http://" + window.location.host + "/multiuse.php",
    headers:{"Content-type":"application/x-www-form-urlencoded"},
    onload:ItemHasBeenUsed,
    data:encodeURI("action=useitem&pwd=" + sPasswordHash + "&quantity=" + sQuantity + "&whichitem=" + oItem.Id)
  });
}


/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function ItemHasBeenUsed(response)
{
  if(response.readyState != 4)
    return;
  if(response.responseText.indexOf("You don't have") >= 0)
  {
    if((eAutoBuyCheckbox == null && GM_getValue(sCharacterName + "::PlazaAutoBuy", false) == true) || eAutoBuyCheckbox.checked)
    {
      ShowProgress("Don't have enough " + oItem.Name + "...buying them");
      BuyItemThenUseIt();
    }
    else
      ShowError("You don't have enough " + oItem.Name);
  }
  else
  {
    var sNewItem = StringBetween(response.responseText, "You acquire an item: <b>", "</b>");
    if(sNewItem == null || sNewItem == "")
      ShowSuccess("You have used " + sQuantity + "x" + oItem.Name);
    else
      ShowSuccess("You got a " + sNewItem);
    window.top.document.getElementsByName('charpane')[0].contentDocument.location.reload();
  }
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function BuyItemThenUseIt()
{
  bUseItemAfterPurchase = true;
  sBuyingItemId = oItem.Id;
  sBuyingQuantity = sQuantity;
  oBuyingFromStore = oStore;

  // if the store has a custom Buy() method, let it handle its own purchases
  if(oStore.Buy != null)
  {
    oStore.Buy(sQuantity, sBuyingItemId, sPasswordHash);
  }
  else if(oBuyingFromStore.Outfit == "0")
  {
    // if no special outfit is required, just buy the item and skip to the end
    GM_xmlhttpRequest
    ({
      method:"POST",
      url:"http://" + window.location.host + "/store.php",
      headers:{"Content-type":"application/x-www-form-urlencoded"},
      onload: PurchaseComplete,
      data:encodeURI("phash=" + sPasswordHash + "&whichstore=" + oBuyingFromStore.ShopCode + "&buying=Yep.&whichitem=" + sBuyingItemId + "&howmany=" + sBuyingQuantity)
    });
  }
  else
  {
    ShowProgress("Creating Backup Outfit");
    GM_xmlhttpRequest({method:"GET", url:"http://" + window.location.host + "/inv_equip.php?action=customoutfit&outfitname=BackupPlaza&ajax=1", onload:GetNewBackupOutfitId});
  }
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function SavePurchaseToHistory(oStore, sItemId, iQuantity)
{
  var asPurchaseHistoryItems = GM_getValue(sCharacterName + "::Plaza Purchase History", "").split("~");
  
  var sNewPurchaseHistory = oStore.UniqueName + "," + sItemId + "," + iQuantity;

  var iTotalHistoryItems = 0;  
  for(var i=0; i<asPurchaseHistoryItems.length; ++i)
  {
    // no blank entries allowed
    if(asPurchaseHistoryItems[i] == "" || asPurchaseHistoryItems[i] == null)
      continue;
    // no duplicate items allowed
    if(asPurchaseHistoryItems[i].indexOf(oStore.UniqueName + "," + sItemId) >= 0)
      continue;
      
    sNewPurchaseHistory += "~" + asPurchaseHistoryItems[i];

    // max of 7 history items    
    iTotalHistoryItems++;
    if(iTotalHistoryItems >= 7)
      break;
  }
  
  GM_setValue(sCharacterName + "::Plaza Purchase History", sNewPurchaseHistory);
  
  var ePlayerHistory = GetStoreFromUniqueName("Recent Purchases");
  if(ePlayerHistory == null || ePlayerHistory.TableElement == null)
    return;
  
  var x = ePlayerHistory.TableElement.style.left;
  var y = ePlayerHistory.TableElement.style.top;
  eMainOverlay.removeChild(ePlayerHistory.TableElement);
  CreateStoreFrontTable(ePlayerHistory);
  ePlayerHistory.TableElement.style.left = x;
  ePlayerHistory.TableElement.style.top = y;
  eMainOverlay.appendChild(ePlayerHistory.TableElement);
}


/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function CreateBuyLink(oItem, oStore, iQuantity)
{
  var eBuyLink = document.createElement("a");
  eBuyLink.href = "javascript:/*~" + oStore.UniqueName + "~" + oItem.Id + "~" + iQuantity + "~*/";
  eBuyLink.innerHTML = " [" + iQuantity + "] ";
  eBuyLink.addEventListener("click", BuyItem, true);
  eBuyLink.title = "Total cost: " + (oItem.Cost * iQuantity) + " meat";
  return eBuyLink;
}


/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function CreateUseLink(oItem, oStore, iQuantity)
{
  var eUseLink = document.createElement("a");
  eUseLink.href = "javascript:/*~" + oStore.UniqueName + "~" + oItem.Id + "~" + iQuantity + "~*/";
  eUseLink.innerHTML = " [" + iQuantity + "] ";
  eUseLink.addEventListener("click", UseItemFromLink, true);
  if(iQuantity == 1)
    eUseLink.title = "Click this to use " + iQuantity + " " + oItem.Name;
  else
    eUseLink.title = "Click this to use " + iQuantity + " " + oItem.Name + "s";
  return eUseLink;
}



/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function ConfirmMpOveruse()
{
  var eCharPaneBody = window.top.document.getElementsByName('charpane')[0].contentDocument.body;
  
  var sMpString = "";
  switch(GetCharacterClass())
  {
    case "P":  case "S":  sMpString = "Mana Points"; break;
    case "TT": case "SC": sMpString = "Muscularity Points"; break;
    case "AT": case "DB": sMpString = "Mojo Points"; break;
  }
  
  var sMpReading = StringBetween(eCharPaneBody.innerHTML, sMpString + "\"><br><span class=black>", "</span>");
  if(sMpReading == null || sMpReading == "")
    sMpReading = StringBetween(eCharPaneBody.innerHTML, sMpString + "\"><br><span class=\"black\">", "</span>");

  /*    
  var iStart = eCharPaneBody.innerHTML.indexOf(sMpString);
  var sSub = eCharPaneBody.innerHTML.substr(iStart, 110);
  sSub = sSub.replace("\"", "");
  sSub = sSub.replace("'", "");
  Log("initial mp reading is " + sMpReading + " initial starting index is " + iStart + ", sub is " + sSub);
  */
  
  var asMpParts;
  if(sMpReading == null || sMpReading == "")
  {
    sMpReading = StringBetween(eCharPaneBody.innerHTML, "MP:</td><td align=\"left\"><b>", "</b>");
    asMpParts = sMpReading.split("/");
  }
  else
    asMpParts = sMpReading.split("&nbsp;/&nbsp;");
  
  if(asMpParts[0] == asMpParts[1] && asMpParts[0] != null)
    return confirm("Do you want to use this item even though your MP is already full? (" + asMpParts[0] + "/" + asMpParts[1] + ")");
  
  return true;
}


/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function ConfirmHpOveruse()
{
  var eCharPaneBody = window.top.document.getElementsByName('charpane')[0].contentDocument.body;
  var sHpReading = StringBetween(eCharPaneBody.innerHTML, "\"hp\");'><br><span class=\"black\">", "</span>");
  
  var asMpasHpPartsarts;
  if(sHpReading == null || sHpReading == "")
  {
    sHpReading = StringBetween(eCharPaneBody.innerHTML, "HP:</td><td align=\"left\"><b><font color=\"black\">", "</b>");
    asHpParts = sHpReading.split("/");
  }
  else
    asHpParts = sHpReading.split("&nbsp;/&nbsp;");
  
  if(asHpParts[0] == asHpParts[1] && asHpParts[0] != null)
    return confirm("Do you want to use this item even though your HP is already full? (" + asHpParts[0] + "/" + asHpParts[1] + ")");
  
  return true;
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function GetAllStores()
{
  var DemonMarket =
  {
    ShopKeepImageLocation:"http://images.kingdomofloathing.com/otherimages/marketdemon.gif",
    ShopCode: "m",
    UniqueName: "Demon Market",
    Outfit: "0",
    Color: "#FFFF44",
    Items:
    [
      {Name: "Ben-Gal Balm", Id:"2595", Cost: "24", Tooltip: "Grants 3 turns of 'Go Get Em, Tiger!', which grants +15% Muscle"},
      {Name: "Glittery Mascara", Id:"3485", Cost: "24", Tooltip: "Grants 3 turns of 'Glittering Eyelashes', which grants +15% Myst"},
      {Name: "Hair Spray", Id:"744", Cost: "24", Tooltip: "Grants 3 turns of 'Butt-Rock Hair', which grants +15% Moxie. This item is also combat usable. When used in combat, causes 3-4 hot damage. Also, this item is required to defeat the Ice Cube in the Sorceress' Tower"},
      {Name: "Chewing Gum", Id:"23", Cost: "30", sTooltip: "Needed in order to spend adventures fishing items out of The Sewer"},
      {Name: "Fortune Cookie", Id:"61", Cost: "40", Tooltip: "Food. 1 Fullness, 1 Adventure. Eating this item will give you a fortune (that may or may not give you an in-game hint) and will give you 3 'lucky numbers'. One of the 3 lucky numbers is the number of adventures before your next scheduled semi-rare adventure."},
      {Name: "Ferment Powder", Id:"247", Cost: "70", Tooltip: "Fermenting Powder. Cocktailcrafting this item together with other items produced booze."},
      {Name: "Soda Water", Id:"1003", Cost: "70", Tooltip: "Restores 3-5 MP. Can also be used in cocktailcrafting to make mysticality-based booze.", ConfirmUse: ConfirmMpOveruse},
      {Name: "Casino Pass", Id:"40", Cost: "100", UseItemUrls: ["<a href='casino.php' title='Click here to visit the casino'>[casino]</a>"], Tooltip: "Allows entrance to The Casino. Is not lost by gambling in the casino."},
      {Name: "Hermit Permit", Id:"42", Cost: "100", UseItemUrls: ["<a href='hermit.php' title='Click here to visit the hermit'>[hermit]</a>"], Tooltip: "Allows you access to The Hermitage, but is lost once you make a trade."},
      {Name: "Magic-in-a-Can", Id:"16", Cost: "200", Tooltip: "Grants 1-3 Myst substats and 1 Spleen"},
      {Name: "Moxie Weed", Id:"14", Cost: "200", Tooltip: "Grants 1-3 Moxie substats and 1 Spleen"},
      {Name: "Strongness Elixir", Id:"15", Cost: "200", Tooltip: "Grants 1-3 Muscle substats and 1 Spleen"},
      {Name: "Cocktail Kit", Id:"236", Cost: "1000", UseItemUrls: ["<a href='craft.php?mode=cocktail' title='Click here to mix drinks'>[mix]</a>"], Tooltip: "Allows you to mix drinks at the cost of 1 adventure. Can also be pasted into a bartender-in-the-box which will remove the 1 adventure cost from mixing."},
      {Name: "E-Z Cook Oven", Id:"157", Cost: "1000", UseItemUrls: ["<a href='craft.php?mode=cook' title='Click here to cook food'>[cook]</a>"], Tooltip: "Allows you to cook food at the cost of 1 adventure. Can also be pasted into a chef-in-the-box which will remove the 1 adventure cost from cooking."}
    ]
  };

  var Lab = 
  {
    ShopKeepImageLocation:"http://images.kingdomofloathing.com/otherimages/shopgoblin.gif",
    ShopCode: "g",
    UniqueName: "Knob Goblin Laboratory",
    RequiredOutfits: ["Knob Goblin Elite Guard Uniform"],
    Outfit: "5",
    Color: "#BBBBFF",
    Items:
    [
      {Name: "Seltzer", Id:"344", Cost: "80", Tooltip: "Restores 8-12 MP", ConfirmUse: ConfirmMpOveruse},
      {Name: "Stink Bomb", Id:"342", Cost: "130", Tooltip: "Combat usable item. Delevels opponent by 3, stuns half the time."},
      {Name: "Nasal Spray", Id:"1515", Cost: "150", Tooltip: "Grants 10 turns of 'Wasabi Sinuses', which grants +30% Meat, -10% Items and -1 Substats per battle"},
      {Name: "Love Potion", Id:"341", Cost: "170", Tooltip: "Grants 5 turns of 'Knob Goblin Lust Frenzy', which grants +2 Moxie. NOTE: Using this item will cause you to lose 11-19 Muscle Substats"},
      {Name: "Eyedrops", Id:"1514", Cost: "200", Tooltip: "Grants 10 turns of 'Peeled Eyeballs', which grants +15% Items, -20% Items and -1 Substats per battle"},
      {Name: "Sharpening Spray", Id:"343", Cost: "230", Tooltip: "Grants 5 turns of 'Sharp Weapon', which grants +3-5 Weapon Damage"},
      {Name: "Pet-buffing Spray", Id:"1512", Cost: "250", Tooltip: "Grants 10 turns of 'Heavy Petting', which grants +5 Familiar Weight and -10% to all Attributes"},
      {Name: "Steroids", Id:"340", Cost: "250", Tooltip: "Grants 5 turns of 'Steroid Boost', which grants +2 Muscle. NOTE: Using this item will cause you to lose 15 Moxie Substats"},
      {Name: "Learning Pill", Id:"1513", Cost: "300", Tooltip: "Grants 10 turns of 'Big Veiny Brain', which grants +2 Substats per battle, -20% Meat and -10% Items"},
    ]
  };

  var FruitStand = 
  {
    ShopKeepImageLocation:"http://images.kingdomofloathing.com/otherimages/storehippy.gif",
    ShopCode: "h",
    UniqueName: "Hippy Fruit Stand",
    RequiredOutfits: ["Filthy Hippy Disguise", "Frat Warrior Fatigues", "War Hippy Fatigues"],
    Outfit: "2",
    Color: "#77FF99",
    Items:
    [
      {Name: "Herbs", Id:"203", Cost: "64", UseItemUrls: ["<a href='craft.php?mode=cook' title='Click here to cook food'>[cook]</a>"], Tooltip: "Cooking Ingredient. Used to make Hippy Herbal Tea, Secret Blend of Herbs and Spices, Herb Brownies and Delicious Noodles."},
      {Name: "Grapefruit", Id:"243", Cost: "70", UseItemUrls: ["<a href='craft.php?mode=cocktail' title='Click here to mix drinks'>[mix]</a>", "<a href='craft.php?mode=cook' title='Click here to cook food'>[cook]</a>"], Tooltip: "Food, Cooking Ingredient and Cocktail Ingredient."},
      {Name: "Grapes", Id:"244", Cost: "70", UseItemUrls: ["<a href='craft.php?mode=cocktail' title='Click here to mix drinks'>[mix]</a>", "<a href='craft.php?mode=cook' title='Click here to cook food'>[cook]</a>"], Tooltip: "Food, Cooking Ingredient and Cocktail Ingredient."},
      {Name: "Lemon", Id:"332", Cost: "70", UseItemUrls: ["<a href='craft.php?mode=cocktail' title='Click here to mix drinks'>[mix]</a>", "<a href='craft.php?mode=cook' title='Click here to cook food'>[cook]</a>"], Tooltip: "Food, Cooking Ingredient and Cocktail Ingredient."},
      {Name: "Olive", Id:"245", Cost: "70", UseItemUrls: ["<a href='craft.php?mode=cocktail' title='Click here to mix drinks'>[mix]</a>", "<a href='craft.php?mode=cook' title='Click here to cook food'>[cook]</a>"], Tooltip: "Food, Cooking Ingredient and Cocktail Ingredient."},
      {Name: "Orange", Id:"242", Cost: "70", UseItemUrls: ["<a href='craft.php?mode=cocktail' title='Click here to mix drinks'>[mix]</a>", "<a href='craft.php?mode=cook' title='Click here to cook food'>[cook]</a>"], Tooltip: "Food, Cooking Ingredient and Cocktail Ingredient."},
      {Name: "Strawberry", Id:"786", Cost: "70", UseItemUrls: ["<a href='craft.php?mode=cocktail' title='Click here to mix drinks'>[mix]</a>", "<a href='craft.php?mode=cook' title='Click here to cook food'>[cook]</a>"], Tooltip: "Food, Cooking Ingredient and Cocktail Ingredient."},
      {Name: "Tomato", Id:"246", Cost: "70", UseItemUrls: ["<a href='craft.php?mode=cocktail' title='Click here to mix drinks'>[mix]</a>", "<a href='craft.php?mode=cook' title='Click here to cook food'>[cook]</a>"], Tooltip: "Food, Cooking Ingredient and Cocktail Ingredient."}
    ]
  };

  var BlackMarket = 
  {
    ShopKeepImageLocation:"http://images.kingdomofloathing.com/otherimages/suspicious2.gif",
    ShopCode: "l",
    UniqueName: "Black Market",
    Outfit: "0",
    Level: 11,
    Color: "#000000",
    FontColor: "#FFFFFF",
    Items:
    [
      {Name: "Black Cherry Soda", Id:"2639", Cost: "80", Tooltip: "Restores 9-11 MP", ConfirmUse: ConfirmMpOveruse},
      {Name: "Body Spray", Id:"2713", Cost: "300", Tooltip: "Grants 10 turns of 'Radiating Black Body', which grants +10% Moxie, 2x Critical Chance and +3MP to use skills"},
      {Name: "Facepaint", Id:"2711", Cost: "300", Tooltip: "Grants 10 turns of 'Black Face', which grants +10% Muscle, +15 Weapon Damage and -40% Combat Initiative"},
      {Name: "Sheepskin Diploma", Id:"2712", Cost: "300", Tooltip: "Grants 10 turns of 'Erudite', which grants +10% Myst, +15 Spell Damage and -10 Damage Reduction. Your DR cannot go below 0."},
      {Name: "Can of Black Paint", Id:"2327", Cost: "1000", Tooltip: "Grants 10 turns of 'Red Door Syndrome', which grants So-So Resistance to All Elements."}
    ]
  };

  var WhiteCitadel = 
  {
    ShopKeepImageLocation:"http://images.kingdomofloathing.com/otherimages/burgerguy.gif",
    ShopCode: "w",
    UniqueName: "White Citadel",
    Outfit: "0",
    Color: "#FFFFFF",
    Items:
    [
      {Name: "Burger", Id:"261", Cost: "100", Tooltip: "Food. 2 Fullness. 2-3 Adventures (if you've never had one before), but the upper bound of the adventures gained rises as you eat more of these. The maximum adventure range from a burger is 2-8, after eating approximately 50 bugers."},
      {Name: "Fries", Id:"260", Cost: "80", Tooltip: "Food. 2 Fullness, 2-5 Adventures"},
      {Name: "Onions", Id:"1657", Cost: "80", Tooltip: "Onion Shurikens. Combat usable item. When used in combat, inflicts 10-15 Sleaze damage."},
      {Name: "Regular Cola", Id:"1660", Cost: "80", Tooltip: "Restores 7-9 MP", ConfirmUse: ConfirmMpOveruse},
      {Name: "Diet Cola", Id:"1659", Cost: "80", Tooltip: "Restores 7-9 MP", ConfirmUse: ConfirmMpOveruse},
      {Name: "Cherry Cola", Id:"1658", Cost: "80", Tooltip: "Restores 7-9 MP", ConfirmUse: ConfirmMpOveruse}
    ]
  };
  
  var GnoMart = 
  {
    ShopKeepImageLocation:"http://images.kingdomofloathing.com/otherimages/gnomes/fragnk.gif",
    ShopCode: "n",
    UniqueName: "Gno-Mart",
    Outfit: "0",
    Color: "#BBBBFF",
    Signs: "The Wombat,The Blender,The Packrat",
    Items:
    [
      {Name: "Jabañero Gum", Id:"300", Cost: "200", Tooltip: "Jabañero-flavored chewing gum. Gives 5 turns of 'Spicy Mouth', which grants +5 Myst and -5 Moxie. This effect can sometimes be required to pass one of the 3 gates in the Sorceress' Lair."},
      {Name: "Lime Chile Gum", Id:"298", Cost: "200", Tooltip: "Lime-and-chile-flavored chewing gum. Gives 5 turns of 'Spicy Limeness', which grants +5 Moxie and -5 Muscle. This effect can sometimes be required to pass one of the 3 gates in the Sorceress' Lair."},
      {Name: "Pickle Gum", Id:"299", Cost: "200", Tooltip: "Pickle-flavored chewing gum. Gives 5 turns of 'Mystic Pickleness', which grants +5 Myst and -5 Muscle. This effect can sometimes be required to pass one of the 3 gates in the Sorceress' Lair."},
      {Name: "Tamarind Gum", Id:"297", Cost: "200", Tooltip: "Tamarind-flavored chewing gum. Gives 5 turns of 'Tamarind Torment', which grants +5 Muscle and -5 Moxie. This effect can sometimes be required to pass one of the 3 gates in the Sorceress' Lair."},
      {Name: "Handsom Potion", Id:"1162", Cost: "300", Tooltip: "Handsomness Potion. Gives 5 turns of 'Mysteriously Handsome', which grants +5% Moxie and +X Monster Level (where X=3 for male character and X=6 for female characters). This effect can sometimes be required to pass one of the 3 gates in the Sorceress' Lair."},
      {Name: "Marzipan Skull", Id:"1163", Cost: "300", Tooltip: "Gives 5 turns of 'Hombre Muerto Caminando' (+20% Combat Initiative, Slight Spooky Resistance, +20 Max MP), 5 turns of 'Hardly Poisoned at All' (-3 to All Attributes, -10% to All Attributes) and 5 turns of 'Sugar Rush' (+20% Combat Initiative, +5% Muscle, +5% Moxie, -10% Myst). The effect 'Sugar Rush' can sometimes be required to pass one of the 3 gates in the Sorceress' Lair."},
      {Name: "Meleegra Pills", Id:"1158", Cost: "300", Tooltip: "Gives 5 turns of 'Engorged Weapon', which grants +10 Weapon Damage."},
      {Name: "Gnomochloric Vial", Id:"2801", Cost: "500", Tooltip: "Allows you to create a Vial of Baconstone Juice, a Vial of Hamethyst Juice or a Vial of Porquoise Juice. These vials grant you significant buffs, but only for 5 turns."},
      {Name: "Gnomochloric Flask", Id:"2802", Cost: "1000", Tooltip: "Allows you to create a Flask of Baconstone Juice, a Flask of Hamethyst Juice or a Flask of Porquoise Juice. These Flasks grant you significant buffs for 10 turns."},
      {Name: "Gnomochloric Jug", Id:"2803", Cost: "5000", Tooltip: "Allows you to create a Jug of Baconstone Juice, a Jug of Hamethyst Juice or a Jug of Porquoise Juice. These Jugs grant you significant buffs for 50 turns."}
    ]
  };

  var KnollBakery = 
  {
    ShopKeepImageLocation:"http://images.kingdomofloathing.com/otherimages/knoll/bakery.gif",
    ShopCode: "4",
    UniqueName: "Degrassi Bakery",
    Outfit: "0",
    Color: "#BBBBFF",
    Signs: "The Vole,The Wallaby,The Mongoose",
    Items:
    [
      {Name: "Pie Tin", Id:"158", Cost: "30", UseItemUrls: ["<a href='craft.php?mode=cook' title='Click here to cook food'>[cook]</a>"], Tooltip: "Gnollish Pie Tin. Used to cook a pie crust, or meatsmith a tamborine (tamborine bells come from the Hippy Camp)"},
      {Name: "Wad ofDough", Id:"159", Cost: "50", UseItemUrls: ["<a href='craft.php?mode=cook' title='Click here to cook food'>[cook]</a>"], Tooltip: "Used to cook carob chunk cookies, pie crusts, plain pizzas and white chocolate chip cookies. Can also be turned into flat dough, which can be cooked into burritos or a spicy mushroom quesadilla"},
      {Name: "Skewer", Id:"165", Cost: "80", UseItemUrls: ["<a href='craft.php?mode=cook' title='Click here to cook food'>[cook]</a>"], Tooltip: "Used to cook kabobs or to create a ghost pickle on a stick"},
      {Name: "Taco Shell", Id:"173", Cost: "80", UseItemUrls: ["<a href='craft.php?mode=cook' title='Click here to cook food'>[cook]</a>"], Tooltip: "Strangely enough, this item is used to cook tacos."},
      {Name: "Casserole Dish", Id:"174", Cost: "150", UseItemUrls: ["<a href='craft.php?mode=cook' title='Click here to cook food'>[cook]</a>"], Tooltip: "Used to cook casseroles."}
    ]
  };

  KnollGeneralStore =
  {
    ShopKeepImageLocation:"http://images.kingdomofloathing.com/otherimages/knoll/generalstore.gif",
    ShopCode: "5",
    UniqueName: "Degrassi General Store",
    Outfit: "0",
    Color: "#BBBBFF",
    Signs: "The Vole,The Wallaby,The Mongoose",
    Items:
    [
      {Name: "Cog", Id:"120", Cost: "20", UseItemUrls: ["<a href='craft.php?mode=combine' title='Click here to paste stuff together'>[paste]</a>"], Tooltip: "Meat pasting component. Used to make a Cog and Sproket Assembly and several clockwork items."},
      {Name: "Empty Meat Tank", Id:"124", Cost: "20", UseItemUrls: ["<a href='craft.php?mode=combine' title='Click here to paste stuff together'>[paste]</a>"], Tooltip: "Meat pasting component. Used to make a Full Meat Tank (just add one meat stack)"},
      {Name: "Spring", Id:"118", Cost: "20", UseItemUrls: ["<a href='craft.php?mode=combine' title='Click here to paste stuff together'>[paste]</a>"], Tooltip: "Meat pasting component. Used to make a Sproket Assembly, a Nothing-in-the-box and several clockwork items."},
      {Name: "Sprocket", Id:"119", Cost: "20", UseItemUrls: ["<a href='craft.php?mode=combine' title='Click here to paste stuff together'>[paste]</a>"], Tooltip: "Meat pasting component. Used to make a Sproket Assembly, and several clockwork items."},
      {Name: "Tires", Id:"136", Cost: "28", UseItemUrls: ["<a href='craft.php?mode=combine' title='Click here to paste stuff together'>[paste]</a>"], Tooltip: "Meat pasting component. Used to make Dop Wheels."},
      {Name: "Bugbear Beanie", Id:"169", Cost: "70", UseItemUrls: ["<a href='inventory.php?which=2' title='Click here to go to your equpiment'>[equip]</a>"], Tooltip: "Hat (not enchanted). Wearing both this and the Bugbear Bunguard grants you access to the Bugbear Bakery, but since you're looking at this store, you have access to Degrassi Bakery anyway, which sells everything the Bugbear Bakery does."},
      {Name: "Bugbear Bunguard", Id:"79", Cost: "70", UseItemUrls: ["<a href='inventory.php?which=2' title='Click here to go to your equpiment'>[equip]</a>"], Tooltip: "Hat (not enchanted). Wearing both this and the Bugbear Beanie grants you access to the Bugbear Bakery, but since you're looking at this store, you have access to Degrassi Bakery anyway, which sells everything the Bugbear Bakery does."},
      {Name: "Frilly Skirt", Id:"131", Cost: "80", UseItemUrls: ["<a href='inventory.php?which=2' title='Click here to go to your equpiment'>[equip]</a>", "<a href='craft.php?mode=combine' title='Click here to paste stuff together'>[paste]</a>"], Tooltip: "Pants. This item can be pasted together with a Meat Engine to create a Meat Maid Body. It can also be worn as part of the quest to get your pirate fledges."},
      {Name: "Gnollish Flyswatter", Id:"123", Cost: "80", UseItemUrls: ["<a href='inventory.php?which=2' title='Click here to go to your equpiment'>[equip]</a>"], Tooltip: "One handed weapon. Woot."},
      {Name: "Gnollish Plunger", Id:"117", Cost: "80", UseItemUrls: ["<a href='inventory.php?which=2' title='Click here to go to your equpiment'>[equip]</a>"], Tooltip: "One handed weapon. Also can be pasted together with a Meat Engine to become a Gnollish Autoplunger."},
      {Name: "Maiden Wig", Id:"998", Cost: "80", UseItemUrls: ["<a href='inventory.php?which=2' title='Click here to go to your equpiment'>[equip]</a>", "<a href='craft.php?mode=combine' title='Click here to paste stuff together'>[paste]</a>"], Tooltip: "Hat. Also can be pasted together with a Brainy Skull to become a Maid Head, or pasted together with a Clockwork Sphere to become a Clockwork Maid Head."}
    ]
  };

  var Nervewreckers =
  {
    ShopKeepImageLocation:"http://images.kingdomofloathing.com/otherimages/marketdemon.gif",
    ShopCode: "z",
    UniqueName: "Nervewrecker's Store",
    Outfit: "0",
    Signs: "Bad Moon",
    Color: "#BBBBFF",
    Items:
    [
      {Name: "Cocktail Kit", Id:"236", Cost: "500", UseItemUrls: ["<a href='craft.php?mode=cocktail' title='Click here to mix drinks'>[mix]</a>"], Tooltip: "Allows you to mix drinks at the cost of 1 adventure. Can also be pasted into a bartender-in-the-box which will remove the 1 adventure cost from mixing."},
      {Name: "E-Z Cook Oven", Id:"157", Cost: "500", UseItemUrls: ["<a href='craft.php?mode=cook' title='Click here to cook food'>[cook]</a>"], Tooltip: "Allows you to cook food at the cost of 1 adventure. Can also be pasted into a chef-in-the-box which will remove the 1 adventure cost from cooking."},
      {Name: "T. Hammer", Id:"338", Cost: "500", UseItemUrls: ["<a href='craft.php?mode=smith' title='Click here to meatsmith items'>[smith]</a>"], Tooltip: "Tenderizing Hammer. Required for all meatsmithing recipes (unless you have access to Innabox). Also required to Pulverize equipment."}
    ]
  };


  var CanadiaJewelers = 
  {
    ShopKeepImageLocation:"http://images.kingdomofloathing.com/otherimages/canadia/shopcanadian.gif",
    ShopCode: "j",
    UniqueName: "Canadia Jewlers",
    Outfit: "0",
    Color: "#BBBBFF",
    Signs: "The Platypus,The Opossum,The Marmot",
    Items:
    [
      {Name: "Piercing Post", Id:"206", Cost: "64", UseItemUrls: ["<a href='craft.php?mode=combine' title='Click here to paste stuff together'>[paste]</a>"], Tooltip: "Jewelrymaking component."},
      {Name: "Necklace Chain", Id:"219", Cost: "70", UseItemUrls: ["<a href='craft.php?mode=combine' title='Click here to paste stuff together'>[paste]</a>"], Tooltip: "Jewelrymaking component."},
      {Name: "Ring Setting", Id:"708", Cost: "200", UseItemUrls: ["<a href='craft.php?mode=combine' title='Click here to paste stuff together'>[paste]</a>"], Tooltip: "Jewelrymaking component."},
      {Name: "E.F. Ring Setting", Id:"2503", Cost: "1000", UseItemUrls: ["<a href='craft.php?mode=combine' title='Click here to paste stuff together'>[paste]</a>"], Tooltip: "Extra-Fancy Ring Setting. Jewelrymaking component."},
      {Name: "H. Necklace Chain", Id:"2505", Cost: "1000", UseItemUrls: ["<a href='craft.php?mode=combine' title='Click here to paste stuff together'>[paste]</a>"], Tooltip: "Heavy Necklace Chain. Jewelrymaking component."},
      {Name: "P. Piercing Post", Id:"25045", Cost: "1000", UseItemUrls: ["<a href='craft.php?mode=combine' title='Click here to paste stuff together'>[paste]</a>"], Tooltip: "Precious Piercing Post. Jewelrymaking component."},
      {Name: "Jewelry Pliers", Id:"709", Cost: "1000", UseItemUrls: ["<a href='craft.php?mode=combine' title='Click here to paste stuff together'>[paste]</a>"], Tooltip: "Jewelry-making Pliers. Jewelrymaking component."}
    ]
  };

  var BugbearBakery = 
  {
    ShopKeepImageLocation:"http://images.kingdomofloathing.com/otherimages/bugbear.gif",
    ShopCode: "B",
    UniqueName: "Bugbear Bakery",
    RequiredOutfits: ["Bugbear Costume"],
    Outfit: "1",
    Color: "#DDDD88",
    Sign: "Muscle",
    Items:
    [
      {Name: "Pie Tin", Id:"158", Cost: "30", UseItemUrls: ["<a href='craft.php?mode=cook' title='Click here to cook food'>[cook]</a>"], Tooltip: "Gnollish Pie Tin. Used to cook a pie crust, or meatsmith a tamborine (tamborine bells come from the Hippy Camp)"},
      {Name: "Wad ofDough", Id:"159", Cost: "50", UseItemUrls: ["<a href='craft.php?mode=cook' title='Click here to cook food'>[cook]</a>"], Tooltip: "Used to cook carob chunk cookies, pie crusts, plain pizzas and white chocolate chip cookies. Can also be turned into flat dough, which can be cooked into burritos or a spicy mushroom quesadilla"},
      {Name: "Skewer", Id:"165", Cost: "80", UseItemUrls: ["<a href='craft.php?mode=cook' title='Click here to cook food'>[cook]</a>"], Tooltip: "Used to cook kabobs or to create a ghost pickle on a stick"},
      {Name: "Taco Shell", Id:"173", Cost: "80", UseItemUrls: ["<a href='craft.php?mode=cook' title='Click here to cook food'>[cook]</a>"], Tooltip: "Strangely enough, this item is used to cook tacos."},
      {Name: "Casserole Dish", Id:"174", Cost: "150", UseItemUrls: ["<a href='craft.php?mode=cook' title='Click here to cook food'>[cook]</a>"], Tooltip: "Used to cook casseroles."}
    ]
  };

  var ShadowyStore =
  {
    ShopKeepImageLocation:"http://images.kingdomofloathing.com/otherimages/recordsguy.gif",
    ShopCode: "1",
    UniqueName: "Shadowy Store",
    Outfit: "0",
    Color: "#08DFDF",
    Classes: ["DB","AT"],
    Items:
    [
      {Name: "Golde Frontes", Id:"457", Cost: "1500", UseItemUrls: ["<a href='inventory.php?which=2' title='Click here to go to your equpiment'>[equip]</a>"], Tooltip: "Ye Olde Golde Frontes. Accessory. When wielded by a Disco Bandit, grants +15 Muscle."},
      {Name: "Accordion Strap", Id:"517", Cost: "2000", UseItemUrls: ["<a href='inventory.php?which=2' title='Click here to go to your equpiment'>[equip]</a>"], Tooltip: "Bejeweled Accordion Strap. Accessory. When wielded by an Accordian Theif, grants +25 Max HP and +25 Max MP."},
      {Name: "Moxie Magnet", Id:"519", Cost: "3000", UseItemUrls: ["<a href='inventory.php?which=2' title='Click here to go to your equpiment'>[equip]</a>"], Tooltip: "Offhand Item. Causes MP to be calculated based on Moxie (instead of Myst)"}
    ]
  };

  var Goudas =
  {
    ShopKeepImageLocation:"http://images.kingdomofloathing.com/otherimages/recordsguy.gif",
    ShopCode: "2",
    UniqueName: "Gouda's Grocery",
    Outfit: "0",
    Color: "#08DFDF",
    Classes: ["S","P"],
    Items:
    [
      {Name: "MMJ", Id:"518", Cost: "100", Tooltip: "Restores (1.5 * level) + (4 to 6) HP", ConfirmUse: ConfirmMpOveruse},
      {Name: "Delectable Catalyst", Id:"1605", Cost: "1000", Tooltip: "Turns a scrumptious reagent into a scrumdiddlyumptious solution, which can be used to make Fine Potions and Hi Meins"},
      {Name: "MSG", Id:"1549", Cost: "1000", Tooltip: "Used in creating Hi Meins, Chow Meins, Lasagnas and Wontons"},
      {Name: "Big Stirring Stick", Id:"3435", Cost: "1500", Tooltip: "2-handed staff that grants +5 Myst and +5 Spell Damage when wielded. Also used to create the Staff of the Teapot Tempest."},
      {Name: "Ladle of Mystery", Id:"532", Cost: "1500", Tooltip: "Accessory. When worn by a Saucerer, grants +20 Max HP and +20 Max MP."},
      {Name: "Sauce Glove", Id:"531", Cost: "2500", UseItemUrls: ["<a href='inventory.php?which=2' title='Click here to go to your equpiment'>[equip]</a>"], Tooltip: "Accessory. When worn by a Sauceror, allows you to equip Chef Staves."},
      {Name: "Kickback Cookbook", Id:"521", Cost: "2000", UseItemUrls: ["<a href='inventory.php?which=2' title='Click here to go to your equpiment'>[equip]</a>"], Tooltip: "Offhand item. Grants +20 Spell Damage."},
      {Name: "Codex Capsaicin", Id:"1547", Cost: "2000", UseItemUrls: ["<a href='inventory.php?which=2' title='Click here to go to your equpiment'>[equip]</a>"], Tooltip: "Offhand item. Grants +10 Spell Damage and turns all spells hot (except Fearful Fettucini)"},
      {Name: "Glacial Grimoire", Id:"1548", Cost: "2000", UseItemUrls: ["<a href='inventory.php?which=2' title='Click here to go to your equpiment'>[equip]</a>"], Tooltip: "Offhand item. Grants +10 Spell Damage and turns all spells cold (except Fearful Fettucini)"}
    ]
  };

  var GoudasBackdoor =
  {
    ShopKeepImageLocation:"http://images.kingdomofloathing.com/otherimages/recordsguy.gif",
    ShopCode: "2",
    UniqueName: "Gouda's Backdoor",
    Outfit: "0",
    Color: "#08DFDF",
    Classes: ["AT"],
    Level: 9,
    Items:
    [
      {Name: "MMJ", Id:"518", Cost: "100", Tooltip: "Restores (1.5 * level) + (4 to 6) HP", ConfirmUse: ConfirmMpOveruse},
      {Name: "Delectable Catalyst", Id:"1605", Cost: "1000", Tooltip: "Turns a scrumptious reagent into a scrumdiddlyumptious solution, which can be used to make Fine Potions and Hi Meins"},
      {Name: "MSG", Id:"1549", Cost: "1000", Tooltip: "Used in creating Hi Meins, Chow Meins, Lasagnas and Wontons"},
      {Name: "Big Stirring Stick", Id:"3435", Cost: "1500", Tooltip: "2-handed staff that grants +5 Myst and +5 Spell Damage when wielded. Also used to create the Staff of the Teapot Tempest."},
      {Name: "Ladle of Mystery", Id:"532", Cost: "1500", Tooltip: "Accessory. When worn by a Saucerer, grants +20 Max HP and +20 Max MP."},
      {Name: "Sauce Glove", Id:"531", Cost: "2500", UseItemUrls: ["<a href='inventory.php?which=2' title='Click here to go to your equpiment'>[equip]</a>"], Tooltip: "Accessory. When worn by a Sauceror, allows you to equip Chef Staves."},
      {Name: "Kickback Cookbook", Id:"521", Cost: "2000", UseItemUrls: ["<a href='inventory.php?which=2' title='Click here to go to your equpiment'>[equip]</a>"], Tooltip: "Offhand item. Grants +20 Spell Damage."},
      {Name: "Codex Capsaicin", Id:"1547", Cost: "2000", UseItemUrls: ["<a href='inventory.php?which=2' title='Click here to go to your equpiment'>[equip]</a>"], Tooltip: "Offhand item. Grants +10 Spell Damage and turns all spells hot (except Fearful Fettucini)"},
      {Name: "Glacial Grimoire", Id:"1548", Cost: "2000", UseItemUrls: ["<a href='inventory.php?which=2' title='Click here to go to your equpiment'>[equip]</a>"], Tooltip: "Offhand item. Grants +10 Spell Damage and turns all spells cold (except Fearful Fettucini)"}
    ]
  };

  var Smacketeria =
  {
    ShopKeepImageLocation:"http://images.kingdomofloathing.com/otherimages/recordsguy.gif",
    ShopCode: "3",
    UniqueName: "Smacketeria",
    Outfit: "0",
    Color: "#08DFDF",
    Classes: ["SC","TT"],
    Items:
    [
      {Name: "Turtle Pheromones", Id:"2236", Cost: "50", Tooltip: "Grants 10 turns of 'Eau de Tortue', which allows you to find turtles while adventuring. NOTE: This affect does not stack!"},
      {Name: "Medicinal Herbs", Id:"1274", Cost: "50", Tooltip: "Restores ALL of your HP. Costs 1 spleen.", ConfirmUse: ConfirmHpOveruse},
      {Name: "Wind-up Clock", Id:"1290", Cost: "100", Tooltip: "Grants 10 turns of 'Ticking Clock', which grants +30% Combat Initiative"},
      {Name: "Wereseal Blood", Id:"687", Cost: "500", Tooltip: "Grants 10 turns of 'Temporary Lycanthropy', which grants 10% - 67% Muscle (depending on moons...brighter moons = higher %)"},
      {Name: "Brass Knuckles", Id:"686", Cost: "1000", UseItemUrls: ["<a href='inventory.php?which=2' title='Click here to go to your equpiment'>[equip]</a>"], Tooltip: "Enchanted Brass Knuckles. Off-hand only item which grants 2x Critical Hit Chance."}
    ]
  };

  var SmacketeriaBackdoor =
  {
    ShopKeepImageLocation:"http://images.kingdomofloathing.com/otherimages/recordsguy.gif",
    ShopCode: "3",
    UniqueName: "Smacketeria Backdoor",
    Outfit: "0",
    Color: "#08DFDF",
    Classes: ["AT"],
    Level: 9,
    Items:
    [
      {Name: "Turtle Pheromones", Id:"2236", Cost: "50", Tooltip: "Grants 10 turns of 'Eau de Tortue', which allows you to find turtles while adventuring. NOTE: This affect does not stack!"},
      {Name: "Medicinal Herbs", Id:"1274", Cost: "50", Tooltip: "Restores ALL of your HP. Costs 1 spleen.", ConfirmUse: ConfirmHpOveruse},
      {Name: "Wind-up Clock", Id:"1290", Cost: "100", Tooltip: "Grants 10 turns of 'Ticking Clock', which grants +30% Combat Initiative"},
      {Name: "Wereseal Blood", Id:"687", Cost: "500", Tooltip: "Grants 10 turns of 'Temporary Lycanthropy', which grants 10% - 67% Muscle (depending on moons...brighter moons = higher %)"},
      {Name: "Brass Knuckles", Id:"686", Cost: "1000", UseItemUrls: ["<a href='inventory.php?which=2' title='Click here to go to your equpiment'>[equip]</a>"], Tooltip: "Enchanted Brass Knuckles. Off-hand only item which grants 2x Critical Hit Chance."}
    ]
  };

  var Meatsmith =
  {
    ShopKeepImageLocation:"http://images.kingdomofloathing.com/otherimages/meatsmithguy.gif",
    ShopCode: "s",
    UniqueName: "Meatsmith",
    Outfit: "0",
    Color: "#FFAA55",
    Items:
    [
      {Name: "T. Hammer", Id:"338", Cost: "1000", UseItemUrls: ["<a href='craft.php?mode=smith' title='Click here to meatsmith items'>[smith]</a>"], Tooltip: "Tenderizing Hammer. Required for all meatsmithing recipes (unless you have access to Innabox). Also required to Pulverize equipment."},
      {Name: "Buckler buckle", Id:"1028", Cost: "100", UseItemUrls: ["<a href='craft.php?mode=smith' title='Click here to meatsmith items'>[smith]</a>"], Tooltip: "Requires Armorcraftiness. Becomes a buckler when used with a skin."},
      {Name: "Helmet Recipe", Id:"90", Cost: "100", UseItemUrls: ["<a href='craft.php?mode=smith' title='Click here to meatsmith items'>[smith]</a>"], Tooltip: "Requires Armorcraftiness. Becomes a hat or helmet when used with a skin."},
      {Name: "Pants Kit", Id:"91", Cost: "100", UseItemUrls: ["<a href='craft.php?mode=smith' title='Click here to meatsmith items'>[smith]</a>"], Tooltip: "Requires Armorcraftiness. Becomes pants when used with a skin."},
      {Name: "Shirt Kit", Id:"2491", Cost: "100", UseItemUrls: ["<a href='craft.php?mode=smith' title='Click here to meatsmith items'>[smith]</a>"], Tooltip: "Only available if you have torso awaregness. skirt or kilt (depending on your gender) when used with a skin."},
      {Name: "Big Stick", Id:"108", Cost: "100", UseItemUrls: ["<a href='craft.php?mode=smith' title='Click here to meatsmith items'>[smith]</a>"], Tooltip: "Meatsmithing component. Becomes a basic meat staff (which can be further improved) or a bow staff."},
      {Name: "Crossbow String", Id:"109", Cost: "100", UseItemUrls: ["<a href='craft.php?mode=smith' title='Click here to meatsmith items'>[smith]</a>"], Tooltip: "Meatsmithing component. Becomes a basic meat crossbow (which can be further improved)."},
      {Name: "Sword Hilt", Id:"89", Cost: "100", UseItemUrls: ["<a href='craft.php?mode=smith' title='Click here to meatsmith items'>[smith]</a>"], Tooltip: "Meatsmithing component. Becomes several different swords, including a basic meat sword (which can be further improved)."},
      {Name: "Whip Kit", Id:"1027", Cost: "100", UseItemUrls: ["<a href='craft.php?mode=smith' title='Click here to meatsmith items'>[smith]</a>"], Tooltip: "Requires Super Advanced Meatsmithing. Becomes a whip when used with a skin."},
      {Name: "Bigger Stick", Id:"1725", Cost: "1000", UseItemUrls: ["<a href='craft.php?mode=smith' title='Click here to meatsmith items'>[smith]</a>"], Tooltip: "Meatsmithing component. Can become many different staves, several of which can be further improved."},
      {Name: "S. Xbow String", Id:"1726", Cost: "1000", UseItemUrls: ["<a href='craft.php?mode=smith' title='Click here to meatsmith items'>[smith]</a>"], Tooltip: "Sinewy Crossbow String. Meatsmithing component. Can become many different crossbows, several of which can be further improved."},
      {Name: "Sturdy Sword Hilt", Id:"1727", Cost: "1000", UseItemUrls: ["<a href='craft.php?mode=smith' title='Click here to meatsmith items'>[smith]</a>"], Tooltip: "Meatsmithing component. Can become many different swords, several of which can be further improved."}
    ]
  };
  
  var Docs =
  {
    ShopKeepImageLocation:"http://images.kingdomofloathing.com/otherimages/doc.gif",
    ShopCode: "DG",
    ShopUrl: "http://" + window.location.host + "/galaktik.php",
    UniqueName: "Doc Galaktik's",
    Outfit: "0",
    Color: "#DD44DD",
    Items:
    [
      {Name: "Anti-Anti-Antidote", Id:"829", Cost: "30", Tooltip: "Cures all levels of 'Poisoned' as well as 'Toad in the Hole'"},
      {Name: "Pungent Unguent", Id:"231", Cost: "30", Tooltip: "Restores 3-5 HP", ConfirmUse: ConfirmHpOveruse},
      {Name: "Ailment Ointment", Id:"232", Cost: "60", Tooltip: "Restores 8-10 HP", ConfirmUse: ConfirmHpOveruse},
      {Name: "Restorative Balm", Id:"233", Cost: "120", Tooltip: "Restores 13-15 HP", ConfirmUse: ConfirmHpOveruse},
      {Name: "Homeopathic Elixir", Id:"234", Cost: "240", Tooltip: "Restores 18-20 HP", ConfirmUse: ConfirmHpOveruse}
    ],

    Buy: function (iQuantity, sItemId, sPwd)
    {
      GM_xmlhttpRequest
      ({
        method:"POST",
        url:"http://" + window.location.host + "/galaktik.php",
        headers:{"Content-type":"application/x-www-form-urlencoded"},
        onload: PurchaseComplete,
        data:encodeURI("action=buyitem&pwd=" + sPwd + "&whichitem=" + sItemId + "&howmany=" + iQuantity)
      });

      // post to galaktik.php
      // action=curemp
      // action=curemp&pwd=sPasswordHash&pwd=sPasswordHash&action=curemp&quantity=1
      // cost = 17 per
    }
  };
  
  var PlayerData =
  {
    ShopKeepImageLocation:"http://images.kingdomofloathing.com/otherimages/leftswordguy.gif",
    ImageHeight: "75px",
    ImageWidth: "60px",
    UniqueName: "Recent Purchases",
    Outfit: "0",
    Color: "#EEEEEE",
    EmptyMessage: "No purchases in history",
    Items:[],
    AddRow: function(eTable)
    {
      var sPurchaseHistory = GM_getValue(sCharacterName + "::Plaza Purchase History", "");
      if(sPurchaseHistory == "")
        return null;

      var iHowManyRows = eTable.rows.length;
      var asPurchasedItems = sPurchaseHistory.split("~");

      if(asPurchasedItems.length <= iHowManyRows)
        return null;
      var asCurrentItemParts = asPurchasedItems[iHowManyRows].split(",");
      var oStore = GetStoreFromUniqueName(asCurrentItemParts[0]);

      var oItem = GetItemFromStore(oStore, asCurrentItemParts[1]);
      var sQuantity = asCurrentItemParts[2];
      
      var eRow = eTable.insertRow(iHowManyRows);
      var eDescriptionCell = eRow.insertCell(0);
      if(oItem.UseItemUrls != null && oItem.UseItemUrls.length > 0)
      {
        eDescriptionCell.innerHTML = oItem.UseItemUrls[0].replace(StringBetween(oItem.UseItemUrls[0], ">", "<"), oItem.Name);
      }
      else
      {
        var eNameLink = CreateUseLink(oItem, oStore, 1);
        eNameLink.innerHTML = eNameLink.innerHTML.replace("[1]", oItem.Name);
        eDescriptionCell.appendChild(eNameLink);
      }
  
      var eOptionsCell = eRow.insertCell(1);
      eOptionsCell.appendChild(document.createTextNode("Buy:"));
      for(var q=0; q<aiQuantities.length; ++q)
        eOptionsCell.appendChild(CreateBuyLink(oItem, oStore, aiQuantities[q]));

      var eBuyLabel = document.createElement("span");
      eBuyLabel.innerHTML = "<br>Use:";
      eOptionsCell.appendChild(eBuyLabel);
      
      if(oItem.UseItemUrls != null)
      {
        for(var i=0; i<oItem.UseItemUrls.length; ++i)
        {
          var eUseLink = document.createElement("a");
          eUseLink.innerHTML = "&nbsp;" + oItem.UseItemUrls[i];
          eOptionsCell.appendChild(eUseLink);
        }
      }
      else
      {
        for(var q=0; q<aiQuantities.length; ++q)
          eOptionsCell.appendChild(CreateUseLink(oItem, oStore, aiQuantities[q]));
      }

      for(var i=0; i<eRow.cells.length; ++i)
        eRow.cells[i].style.padding = "2px";
      eTable.style.borderSpacing = "0px";
      if(iHowManyRows %2 == 1)
        eRow.style.backgroundColor = "#D8D8D8";
      return eRow;
    }
  };

  var Favorites =
  {
    ShopKeepImageLocation:"http://images.kingdomofloathing.com/itemimages/cupcake.gif",
    UniqueName: "Favorites",
    EmptyMessage: "Click a star to add a favorite",
    Outfit: "0",
    Color: "#FFAACC",
    Items:[],
    AddRow: function(eTable)
    {
      var sFavorites = GM_getValue(sCharacterName + "::Favorite Items", "");
      if(sFavorites == "")
        return null;

      var iHowManyRows = eTable.rows.length;
      var asFavoritesItems = sFavorites.split("~");

      if(asFavoritesItems.length <= iHowManyRows)
        return null;

      var asCurrentItemParts = asFavoritesItems[iHowManyRows].split(",");
      var oStore = GetStoreFromUniqueName(asCurrentItemParts[0]);

      var oItem = GetItemFromStore(oStore, asCurrentItemParts[1]);
      
      var eRow = eTable.insertRow(iHowManyRows);
      var eDescriptionCell = eRow.insertCell(0);

/*      
      if(oItem.UseItemUrls != null && oItem.UseItemUrls.length > 0)
      {
        // this line makes this:
        //   "[1] [2] [5] [10]"
        // look like this:
        //   "Item Name"
        // and retains the same link as the first option in the list.
        eDescriptionCell.innerHTML = oItem.UseItemUrls[0].replace(StringBetween(oItem.UseItemUrls[0], ">", "<"), oItem.Name);
      }
      else
      {
        var eNameLink = CreateUseLink(oItem, oStore, 1);
        eNameLink.innerHTML = eNameLink.innerHTML.replace("[1]", oItem.Name);
        eDescriptionCell.appendChild(eNameLink);
      }
*/  

      var eFavoriteLink = CreateFavoriteLink(oStore, oItem);
      eDescriptionCell.appendChild(eFavoriteLink);
      eDescriptionCell.appendChild(document.createTextNode(" " + oItem.Name));

      eDescriptionCell.title = oItem.Tooltip;
    
      var eOptionsCell = eRow.insertCell(1);
      eOptionsCell.appendChild(document.createTextNode("Buy:"));
      for(var q=0; q<aiQuantities.length; ++q)
        eOptionsCell.appendChild(CreateBuyLink(oItem, oStore, aiQuantities[q]));

      var eBuyLabel = document.createElement("span");
      eBuyLabel.innerHTML = "<br>Use:";
      eOptionsCell.appendChild(eBuyLabel);
      
      if(oItem.UseItemUrls != null)
      {
        for(var i=0; i<oItem.UseItemUrls.length; ++i)
        {
          var eUseLink = document.createElement("a");
          eUseLink.innerHTML = "&nbsp;" + oItem.UseItemUrls[i];
          eOptionsCell.appendChild(eUseLink);
        }
      }
      else
      {
        for(var q=0; q<aiQuantities.length; ++q)
          eOptionsCell.appendChild(CreateUseLink(oItem, oStore, aiQuantities[q]));
      }

      for(var i=0; i<eRow.cells.length; ++i)
        eRow.cells[i].style.padding = "2px";
      eTable.style.borderSpacing = "0px";
      if(iHowManyRows %2 == 1)
        eRow.style.backgroundColor = "#88FF88";
      return eRow;
    }
  };

// TODO: Docs hp/mp restoring service

  AllStores = [Favorites, PlayerData, DemonMarket, Meatsmith, KnollGeneralStore, Lab, FruitStand, BlackMarket, WhiteCitadel, KnollBakery, BugbearBakery, GoudasBackdoor, SmacketeriaBackdoor, ShadowyStore, Docs, Goudas, Smacketeria, GnoMart, CanadiaJewelers, Nervewreckers];
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

//function SortStoresBasedOnVisibility()
function AlignStores()
{
  var iCurrentX = 20;
  var iCurrentY = 20;
  var iCurrentRowHeight = 0;
      
  for(var i=0; i<AllStores.length; ++i)
  {
    if(AllStores[i].TableElement == null)
      continue;

    if(AllStores[i].TableElement.style.left != "-1px" || AllStores[i].TableElement.style.top != "-1px")
    {
      //Log("NOT auto-aligning " + AllStores[i].UniqueName + " because there is a valid saved position: " + AllStores[i].TableElement.style.left + ", " + AllStores[i].TableElement.style.top);
      continue;
    }
      
    //Log("Auto-aligning " + AllStores[i].UniqueName + " because the saved data suggested it was in its default position");
        
    AllStores[i].TableElement.style.top = iCurrentY;
    AllStores[i].TableElement.style.left = iCurrentX;

    if(AllStores[i].TableElement.style.backgroundColor == eMainOverlay.style.backgroundColor)
      AllStores[i].TableElement.style.border = "1px solid black";

    eMainOverlay.appendChild(AllStores[i].TableElement);

    // clientWidth and clientHeight only become available AFTER the element is inserted into the DOM

   if(AllStores[i].TableElement.clientWidth < iStoreWidth)
      AllStores[i].TableElement.style.left = iCurrentX + ((iStoreWidth - AllStores[i].TableElement.clientWidth) / 2);

    iCurrentX += iStoreWidth;

    if(AllStores[i].TableElement.clientHeight > iCurrentRowHeight)
      iCurrentRowHeight = AllStores[i].TableElement.clientHeight;
    if(iCurrentX > mainframe.scrollWidth - iStoreWidth)
    {
      iCurrentX = 20;
      iCurrentY += iCurrentRowHeight + 20;
      iCurrentRowHeight = 0;
    }
    
    GM_setValue(sCharacterName + "::" + AllStores[i].UniqueName + "::Position", AllStores[i].TableElement.style.left + "," + AllStores[i].TableElement.style.top + "," + AllStores[i].TableElement.style.zIndex);
  }
}




// This function attempts to get the "PWDHASH" from the charpane, which is useful for chat functions and other stuff.
// Note that this function CANNOT BE CALLED during page initialization because the charpane isn't loaded at that point. The best you can do is setTimeout(GetPassword, 500)
// or use sPassword which is loaded during ScrapeHtml() when the character pane is always loaded
function GetPassword()
{
  var html = window.top.document.getElementsByName('charpane')[0].contentDocument.documentElement.innerHTML;
  return StringBetween(html.substr(html.indexOf("pwdhash"), 100), "\"", "\"");
}


// This function returns the string between 2 given sub strings.
// The first param, sInput, is the string to search
// The second param, sStart, is the start of the string you want. This string will NOT be included in the result
// The third param, sEnd, is the end of the string you want. This string will also NOT be included in the result
// Note: The function will only look for the first occurence of sStart, but will start at the END of that string to find sEnd.
// Example: StringBetween("ABC(2) DEF(3) GHI(4)", "DEF(", ")"); will return "3"
function StringBetween(sInput, sStart, sEnd)
{
  if(sInput == null)
    return null;
    
  var iStart = sInput.indexOf(sStart);
  if(iStart < 0)
    return null;
  
  iStart += sStart.length;

  if(sEnd != null)
  {
    var iEnd = sInput.indexOf(sEnd, iStart);
    if(iEnd < 0)
      return null;
    
    return sInput.substring(iStart, iEnd);
  }
  else
    return sInput.substring(iStart);
}

function Log(sMessage)
{
  if(bDebug)
    GM_log(sMessage);
}


/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////


// put a star next to the item so users can add it to their favorites
function CreateFavoriteLink(oStore, oItem)
{
  var eFavoriteLink = document.createElement("a");
  eFavoriteLink.href = "javascript:/*~" + oStore.UniqueName + "~" + oItem.Id + "~*/";
  if(IsFavorite(oStore, oItem))
  {
    eFavoriteLink.innerHTML = " <img border='0' src='data:image/png;base64,"+
    "iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACx"+
    "jwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0"+
    "U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAMhJREFUKFNjYMACqivS/4MwNjkMMZDCTy/u"+
    "gDFRmkCKvr5cD8Y4NcCcAKJ/vpnw//+nbjAGsZHlwM6BCfz/v///v099////b/r/6oYbGIPYELH9"+
    "cI1wDR+eTv3/+33l/48PPP7//+AKxiA2SAwkhxIQMM7be+n/P95zApoYBMYgNkgMa6iBBB9fz/7/"+
    "9pbv/6fnDMAYxAaJYfU8SPD57c7/t05E/X9wKgiMQWyQGE4N189MQQkVkEKYGNYIQ3crRpAi68KV"+
    "HNDFAcc095W59irzAAAAAElFTkSuQmCC'; />";
  }
  else
  {
    eFavoriteLink.innerHTML = " <img border='0' src='data:image/png;base64,"+
    "iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACx"+
    "jwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0"+
    "U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAGZJREFUKFNjYMACqivS/4MwNjkMMZDCc+fO"+
    "gTFRmojSAHMCsmJkW1CcCOPAFIDoPXv2gDGyGFwTPg3ImnDaAjMd3RaMAIC5H5sGrKGFzcN4gxem"+
    "ATnEkMWwRhh6DCNrxqkBXQLdEACkFPurmiiKwgAAAABJRU5ErkJggg==' />";
  }
  eFavoriteLink.addEventListener("click", ToggleItemFavorite, true);
  eFavoriteLink.title = "Click here to add " + oItem.Name + " to your list of favorite items (7 favorites max)";
  return eFavoriteLink;
}


/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function IsFavorite(oStore, oItem)
{
  var sFavorites = GM_getValue(sCharacterName + "::Favorite Items", "");
  var asFavoriteItems = sFavorites.split("~");

  for(var i=0; i<asFavoriteItems.length; ++i)
  {
    var asCurrentItemParts = asFavoriteItems[i].split(",");
    if(asCurrentItemParts[0] == oStore.UniqueName && asCurrentItemParts[1] == oItem.Id)
      return true;
  }
  return false;
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////


function ToggleItemFavorite()
{
  var asParts = this.href.split("~");
  var sStoreName = asParts[1].replace(/%20/g, " ");
  var sItemId = asParts[2];
  var sFavorites = GM_getValue(sCharacterName + "::Favorite Items", "");
  var asFavoriteItems = sFavorites.split("~");
  var bWasExistingFavorite = false;
  var sNewFavorites = sStoreName + "," + sItemId ;
  
  if(sFavorites.indexOf(sNewFavorites) >= 0)
  {
    Log("Removing item from favorites. Before=" + sFavorites + "...item to remove is " + sNewFavorites);
    sNewFavorites = sFavorites.replace(sNewFavorites, "").replace(/~~/g, "~");
    
    if(sNewFavorites[0] == "~")
      sNewFavorites = sNewFavorites.substring(1);
    if(sNewFavorites[sNewFavorites.length - 1] == "~")
      sNewFavorites = sNewFavorites.substring(0, sNewFavorites.length - 1);
      
    Log("Removing item from favorites. After=" + sNewFavorites);
  }
  else
  {
    Log("Adding item from favorites. Before=" + sFavorites);
    var iTotalFavorites = 0;  
    for(var i=0; i<asFavoriteItems.length; ++i)
    {
      // no blank entries allowed
      if(asFavoriteItems[i] == "" || asFavoriteItems[i] == null)
        continue;

      sNewFavorites += "~" + asFavoriteItems[i];

      // max of 7 favorites items    
      iTotalFavorites++;
      if(iTotalFavorites >= 7)
        break;
    }
    Log("Adding item from favorites. After=" + sNewFavorites);
  }

  GM_setValue(sCharacterName + "::Favorite Items", sNewFavorites);
  
  RedrawStore("Favorites");
  RedrawStore(sStoreName);
  if(asFavoriteItems.length > 7)
  {
    var sStoreThatLostTheFavorite = asFavoriteItems[asFavoriteItems.length - 1].split(",")[0];
    if(sStoreThatLostTheFavorite != sStoreName)
      RedrawStore(sStoreThatLostTheFavorite);
  }
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function RedrawStore(sStoreName)
{
  Log("Redrawing store: " + sStoreName);
  var oStore = GetStoreFromUniqueName(sStoreName);
  var x = oStore.TableElement.style.left;
  var y = oStore.TableElement.style.top;
  eMainOverlay.removeChild(oStore.TableElement);
  CreateStoreFrontTable(oStore);
  oStore.TableElement.style.left = x;
  oStore.TableElement.style.top = y;
  eMainOverlay.appendChild(oStore.TableElement);
  Log("Redraw of store " + sStoreName + " complete.");
}



