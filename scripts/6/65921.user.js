// ==UserScript==
// @name           Improved Gaia
// @namespace      ..
// @description    Made by Isandir
// @include        http://www.gaiaonline.com/*
// ==/UserScript==
// Set these to disabled if you dont want to use them.
var mpTekTekLink = 'enabled';
var mpCalc = 'enabled';
var mpHistory = 'enabled';
var mpsearchbar = 	'enabled';

if(mpsearchbar != 'disabled') {
  function check_value() {
    if(newSearchInput.value == "Search MP") {
      newSearchInput.value = "";
    }
  }
  var newSearchLi = document.createElement('li');
  var newSearchForm = document.createElement('form');
  var newSearchInput = document.createElement('input');
  newSearchLi.setAttribute('id', 'market_search');
  newSearchForm.setAttribute('id', 'market_search_form');
  newSearchForm.setAttribute('action', '/marketplace/itemsearch/');
  newSearchForm.setAttribute('method', 'get');
  newSearchInput.setAttribute('type', 'text');
  newSearchInput.setAttribute('style', 'width: 100px; height: 13px; margin-top: 4px; margin-left: 15px;');
  newSearchInput.setAttribute('value', 'Search MP');
  newSearchInput.setAttribute('name', 'search');
  newSearchInput.setAttribute('tabindex', '2');
  newSearchInput.setAttribute('id', 'mp_search_value');
  newSearchInput.setAttribute('title', 'Enter a term then press enter.');
  newSearchForm.appendChild(newSearchInput);
  newSearchLi.appendChild(newSearchForm);
  var searchContainer = document.getElementById('nav');
  searchContainer.appendChild(newSearchLi);
  newSearchInput.addEventListener('click', check_value, true);
}

if(window.location.href.indexOf('/marketplace') != -1 && window.location.href.indexOf('mystore') == -1 && window.location.href.indexOf('noinsert') == -1 && mpHistory != 'disabled') {
// We are on the MP Search or view pages
  //Function to get parameters from the URI
  function getParam(name, URI) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( URI );
    if( results == null ) {
      return "";
    } else {
      return results[1];
    }
  }
  // We can get the User's ID from the logout link
  var logoutContainer = document.getElementsByTagName('li');
  for(i=0; i < logoutContainer.length; i++) {
    if(logoutContainer[i].className == 'status') {
      var logoutLink = logoutContainer[i].getElementsByTagName('a');
      if(logoutLink[0].firstChild.nodeValue == ' Logout ') {
        var userId = getParam('userid', logoutLink[0].href);
      }
    }
  }
  // We have searched for an item
  if(window.location.href.indexOf('?search=') != -1) {
    var tempitemName = getParam('search', window.location.href);
    if(tempitemName != '') {
      var searchTerm = tempitemName;
    }
  }
  // We are looking at an item
  if(document.title.indexOf('Gaia Marketplace: Item Detail') != -1) {
    var thisItem = document.getElementById('listing_count').firstChild.nodeValue;
    // Remove all text other than the items name.
    thisItem = thisItem.replace(/(\d+) Listings for /,"");
    // Get the item ID from the URL
    var itemId = window.location.href.split("/");
    //Get the item ID from the URI
    var URIElements = itemId.length-1;
    if(itemId[URIElements] == '') {
      // Just incase someone has a trailing / on the URI
      URIElements = itemId.length-2;
    }
    var itemId = itemId[URIElements];
  }
  
  // If we ARE NOT on the home page, send the search data
  if(window.location.href != 'http://www.gaiaonline.com/marketplace/' && window.location.href.indexOf('userstore') == -1 && window.location.href.indexOf('graph') == -1) {
  GM_xmlhttpRequest({
    method: "POST",
    url: "http://www.elvenblade.com/gaia/gaiainc.php",
    data: "method=ins&userid=" + userId + "&searchterm=" + searchTerm + "&itemname=" + thisItem + "&itemid=" + itemId,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    onload: function(response) {
    }
  });
  }
  
  // If we ARE on the MP Home page, show the search list
  if(window.location.href == 'http://www.gaiaonline.com/marketplace/' || window.location.href == 'http://www.gaiaonline.com/marketplace') {
  GM_xmlhttpRequest({
    method: "POST",
    url: "http://www.elvenblade.com/gaia/gaiainc.php",
    data: "method=get&userid=" + userId,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    onload: function(response) {
    var newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'moduleRight');
    newDiv.setAttribute('id', 'searchHistory');
    var newDivFooter = document.createElement('div');
    newDivFooter.setAttribute('class', 'moduleFooter moduleRightFooter');
    var divTitleC = document.createElement('h3');
    divTitleC.setAttribute('class', 'moduleHeader moduleHeaderGenericRight');
    var divTitle = document.createElement('a');
    divTitle.setAttribute('id', 'arrow_searchHistory');
    divTitle.setAttribute('class', '');
    divTitle.setAttribute('href', '');
    var titleText = document.createTextNode('Search History');
    var divContent = document.createElement('div');
    divContent.setAttribute('class', 'moduleContainer expanded');
    divContent.innerHTML = response.responseText;
    divTitle.appendChild(titleText);
    divTitleC.appendChild(divTitle);
    newDiv.appendChild(divTitleC);
    newDiv.appendChild(divContent);
    newDiv.appendChild(newDivFooter);
    var oldDiv = document.getElementById('moduleRightColumn');
    var previousFirst = oldDiv.getElementsByTagName('div')[1];
    oldDiv.insertBefore(newDiv,previousFirst);
    }
  });

  }
}

if(window.location.href.indexOf('/marketplace/mystore/sell') != -1 && document.getElementById('sellform') != null) {
//First, lets add a nice link to the item list
  //We need to get the itemID from the URL
  function getId(name) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null ) {
      return "";
    } else {
      return results[1];
    }
  }
  // Because there is no getElementByClass, I have to do this myself Dx
  var pageText = document.getElementsByTagName("h1");
  for(i=0; i < pageText.length; i++) {
    if(pageText[i].className.indexOf("itemNameMain") != -1) {
      textToRemove = pageText[i].childNodes[0];
      pageText[i].removeChild(textToRemove);
      var itemId = '0';
      var itemLink = document.createElement('a');
      itemLink.setAttribute('href', 'http://www.gaiaonline.com/marketplace/itemdetail/' + getId('item_id'));
      itemLink.setAttribute('target', '_blank');
      var linkText = document.createTextNode(textToRemove.nodeValue);
      itemLink.appendChild(linkText);
      pageText[i].appendChild(itemLink);
    }
  }

  // Add commas to the value.
  function comma(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  }

  // Maybe someone will not want this...
  if(mpCalc != 'disabled') {
    var sellPrice = document.getElementsByName('buy_now_price')[0];
    sellPrice.addEventListener('keyup', function() {document.getElementById('afterTax').value=comma(Math.round(this.value/100*98))+" gold";},false);
    var newRow = document.createElement('tr');
    var newRowText = document.createElement('th');
    newRowText.setAttribute('style', 'align: right;');
    var newRT = document.createTextNode('Profit (after 2% tax)');
    newRowText.appendChild(newRT);
    newRow.appendChild(newRowText);
    var newCell = document.createElement('td');
    var newCField = document.createElement('input');
    newCField.setAttribute('id', 'afterTax');
    newCField.setAttribute('type', 'text');
    newCField.setAttribute('value', '0 gold');
    newCField.setAttribute('disabled', '1');
    newCField.setAttribute('style', 'width: 120px;');
    newCell.appendChild(newCField);
    newRow.appendChild(newCell);
    var parentElement2 = sellPrice.parentNode;
    var parentElement1 = parentElement2.parentNode;
    var parentElement = parentElement1.parentNode;
    var insertPlace = parentElement.getElementsByTagName('tr')[3];
    parentElement.insertBefore(newRow, insertPlace);
  }
} else if(window.location.href.indexOf('/avatar') != -1) {
// We are on the Equip page
  newDiv = document.createElement('div');
  newImg = document.createElement('img');
  newImg.setAttribute('src', 'http://www.qhcards.co.uk/images/reload.gif');
  newImg.setAttribute('alt','Reload Invo');
  newDiv.appendChild(newImg);
  var newLink = document.createElement('a');
  newLink.setAttribute('href', 'javascript:null(YAHOO.gaia.app.inventoryTabs.reloadTab())');
  newLink.appendChild(newImg);
  var NewLText = document.createTextNode('Reload my Invo');
  newLink.appendChild(NewLText);
  var oldDiv = document.getElementById('center');
  var previousFirst = oldDiv.getElementsByTagName('div')[0];
  oldDiv.insertBefore(newLink,previousFirst);

} else if(window.location.href.indexOf('/marketplace/itemsearch') != -1 && mpTekTekLink != 'disabled') {
// We are on the MP Search page
  // Because there is no getElementByClass, I have to do this myself Dx
  var pageTables = document.getElementsByTagName("td");
  for(i=0; i < pageTables.length; i++) {
    if(pageTables[i].className.indexOf("item_rows_item_field first") != -1) {
      var thisRow = pageTables[i];
      var thisItem = thisRow.getElementsByTagName('a')[1].firstChild.nodeValue;
      var thisItem = thisItem.replace(/^\s+|\s+$/g, '');
      var thisItemSan = thisItem.replace(/ /g, "+");
      var newLinkContainer = document.createElement('span');
      newLinkContainer.setAttribute('style', 'float: right;');
      var newLink = document.createElement('a');
      newLink.setAttribute('href', 'http://www.tektek.org/gaia/item_search.php?s=' + thisItemSan);
      newLink.setAttribute('target', '_blank');
      var newLText    = document.createTextNode('Find on TekTek.org');
      newLink.appendChild(newLText);
      newLinkContainer.appendChild(newLink);
      thisRow.appendChild(newLinkContainer);
    }
  }
} else if(window.location.href.indexOf('/marketplace/vendsearch') != -1 && mpTekTekLink != 'disabled') {
// We are on the MP Search page
  // Because there is no getElementByClass, I have to do this myself Dx
  var pageTables = document.getElementsByTagName("td");
  for(i=0; i < pageTables.length; i++) {
    if(pageTables[i].className.indexOf("vend_rows_ex_item_field first") != -1) {
      // All this does is add a link to the result list for TekTek.. cannot be bothered to comment every line
      var thisRow = pageTables[i];
      var thisItem = thisRow.getElementsByTagName('a')[1].firstChild.nodeValue;
      var thisItem = thisItem.replace(/^\s+|\s+$/g, '');
      var thisItemSan = thisItem.replace(/ /g, "+");
      var newLinkContainer = document.createElement('span');
      newLinkContainer.setAttribute('style', 'float: right;');
      var newLink = document.createElement('a');
      newLink.setAttribute('href', 'http://www.tektek.org/gaia/item_search.php?s=' + thisItemSan);
      newLink.setAttribute('target', '_blank');
      var newLText = document.createTextNode('Find on TekTek.org');
      newLink.appendChild(newLText);
      newLinkContainer.appendChild(newLink);
      thisRow.appendChild(newLinkContainer);
    }
  }
} else if(window.location.href.indexOf('/marketplace/itemdetail') != -1 && mpTekTekLink != 'disabled') {
// We are viewing an item on the Marketplace.
  // Get the element Gaia use to display the number of listings for the item.
  var thisItem = document.getElementById('listing_count').firstChild.nodeValue;

  // Remove all text other than the items name.
  thisItem = thisItem.replace(/(\d+) Listings for /,"");

  // The add + instead of spaces for URL to TekTek.
  var thisItemSan = thisItem.replace(/ /g, "+");

  // Now for the fun part...
  // Make a new P element (All of the data for the item is in P's.
  var newP = document.createElement('p');

  // Then create a link, add the href, and some text to display.
  var newPLink = document.createElement('a');
  newPLink.setAttribute('href', 'http://www.tektek.org/gaia/item_search.php?s=' + thisItemSan);
  newPLink.setAttribute('target', '_blank');
  newLText = document.createTextNode('Find ' + thisItem + ' on TekTek.org');

  // Now add the href and text to the A we created.
  newPLink.appendChild(newLText);
  newP.appendChild(newPLink);

  // Finally, get the P Gaia use to display the item data and insert our one at the top.
  var oldP = document.getElementById('item_basicdata');
  var previousFirst = oldP.getElementsByTagName('p')[1];

  oldP.insertBefore(newP,previousFirst);
}

if(window.location.href.indexOf('/profile/privmsg.php') != -1) {
  function selectMP() {
    var pageTables = document.getElementsByTagName("a");
    for(i=0; i < pageTables.length; i++){
      if(pageTables[i].className.indexOf("topictitle") != -1){
        if(pageTables[i].getAttribute('title').indexOf("Marketplace Notice") != -1){
          var container = pageTables[i].parentNode.parentNode.parentNode.getElementsByTagName('td');
          var thisItem = container[0].firstChild;
          if(thisItem.checked == 1) {
            thisItem.checked = 0;
          } else {
            thisItem.checked = 1;
          }
        }
      }
    }
  }
  buttonDiv = document.getElementsByTagName('input');
    for(i=0; i < buttonDiv.length; i++) {
      if(buttonDiv[i].getAttribute('name') == "check_all") {
          var newCheck = document.createElement('input');
          var newLine = document.createElement('br');
          var text1 = document.createTextNode(' All');
          var text2 = document.createTextNode(' MP');
          newCheck.setAttribute('type', 'checkbox');
          newCheck.setAttribute('id', 'button_mp_sel');
          buttonDiv[i].parentNode.appendChild(text1);
          buttonDiv[i].parentNode.appendChild(newLine);
          buttonDiv[i].parentNode.appendChild(newCheck);
          buttonDiv[i].parentNode.appendChild(text2);
          buttonDiv[i].parentNode.removeAttribute('align');
        }
      }
  
  var clicker_mp = document.getElementById('button_mp_sel');
  clicker_mp.addEventListener('click', selectMP, true);
}