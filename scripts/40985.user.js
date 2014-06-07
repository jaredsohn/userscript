scr_meta=<><![CDATA[
// ==UserScript==
// @name           Lowest Amazon Price
// @namespace      sizzlemctwizzle
// @description    Make your prices on Amazon Marketplace the lowest by lowering them one cent below the current lowest at the click of a button 
// @version        1.0.4
// @include        https://myi-gui.amazon.com/abis/search/*&merchantID=*&tool=ezdpc-gui-inventory*
// @include        https://myi-gui.amazon.com/abis/search/*OpenListingsSummary*
// ==/UserScript==
]]></>;

// Attribution-Noncommercial-Share Alike 3.0 Unported; http://creativecommons.org/licenses/by-nc-sa/3.0/

function createCookie(name,value) {
		var date = new Date();
		date.setTime(date.getTime()+(5*365*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function insertAfter(node, after) { after.parentNode.insertBefore(node, after.nextSibling);}

function addCommas(nStr)
{
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

function lower_prices() {
  if (!document.getElementById('no_lower_price').checked) {
  var items = document.evaluate(
				   '//tr[contains(@id, "sku-")]',
				   document, 
				   null,
				   XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < items.snapshotLength; i ++) {
    item = items.snapshotItem(i);
    lowest = document.evaluate('.//a/child::text()[contains(., "$")]', item, null, 9, null).singleNodeValue;
    if (lowest) {
      lowest = parseFloat(lowest.textContent.replace('$', '').replace(',', ''));
      new_low = Math.round((lowest - .01)*100)/100;
      if (new_low < lowest) {
	new_low = addCommas(new_low);
	your_price = document.evaluate('//tr[@id="'+item.id+'"]//input[starts-with(@name, "price|")]', document, null, 9, null).singleNodeValue;
	asin_isbn = your_price.getAttribute('name').split('|')[2];
	if(!document.getElementById('no_lower_price_'+asin_isbn).checked) {
	  your_price.value = new_low;
	  unsafeWindow.markDirty(your_price);
	  unsafeWindow.touchedFields[your_price.name] = true;
	}
      }
    }
  }
  }
}

function createTd(content, td1, td2) {
td = document.createElement('td');
td.className = "data-display-header";
td.setAttribute('style', 'text-align: center;');
td.setAttribute('width', '8%');
td.innerHTML = content;
td1.setAttribute('width', '16%');
td2.setAttribute('width', '8%');
 return td;
}

function createColumn() {
  window.checkBoxes = {};
  if (readCookie('checkBoxes')) window.checkBoxes = eval(decodeURIComponent(readCookie('checkBoxes')));
trs = document.evaluate(
				   '//tr[contains(@id, "sku-")]',
				   document, 
				   null,
				   XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i=0; i < trs.snapshotLength; i ++) {
    tr = trs.snapshotItem(i);
    tds = tr.getElementsByTagName('td');
    asin_isbn = tds[2].getElementsByTagName('a')[0].textContent.replace(/ /g,'').replace(/\n/g, '');
    if (window.checkBoxes[asin_isbn]) {
      if (window.checkBoxes[asin_isbn] == 1) check = ' checked="'+window.checkBoxes[asin_isbn]+'"'; else check = "";
    } else {
      check = "";
      window.checkBoxes[asin_isbn] = 0;
      createCookie('checkBoxes', encodeURIComponent(uneval(window.checkBoxes)));
    }
    td = createTd('<input class="no_lower_price" id="no_lower_price_'+asin_isbn+'" type="checkbox"'+check+'>',tds[5], tds[6]);
    insertAfter(td, tds[5]);
  }

  noBoxes = document.evaluate(
				   '//input[@class="no_lower_price"]',
				   document, 
				   null,
				   XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (i=0; i < noBoxes.snapshotLength; i ++) {
  noBoxes.snapshotItem(i).addEventListener('click',function (e) {
      window.checkBoxes = eval(decodeURIComponent(readCookie('checkBoxes')));
      asin_isbn = e.target.id.split('no_lower_price_')[1];
      if (window.checkBoxes[asin_isbn] == 0) window.checkBoxes[asin_isbn] = 1; else window.checkBoxes[asin_isbn] = 0;
      createCookie('checkBoxes', encodeURIComponent(uneval(window.checkBoxes)));
    },false);
 }

}

reset = document.evaluate('//img[contains(@src, "inline-success-icon.gif")]', document, null, 
			       XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
lower_button = document.createElement('a');
lower_button.href = "#";
lower_button.textContent = "Lower Prices";
lower_button.addEventListener('click',function (e) {lower_prices(); e.preventDefault();},false);
tr = document.createElement('tr');
insertAfter(tr, reset.parentNode.parentNode);
td = document.createElement('td');
tr.appendChild(td);
td.appendChild(lower_button);

date_td = document.getElementById('itemSummarySubDate');
td = createTd('Do not lower price', document.getElementById('itemSummaryTitle'), date_td);
insertAfter(td, date_td);

tr = document.evaluate('//tr[@class="subToolBar"][3]', document, null, 
			       XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
tds = tr.getElementsByTagName('td');
td = createTd('<input id="no_lower_price" type="checkbox">',tds[5], tds[6]);
insertAfter(td, tds[5]);
createColumn();

aaus_38017={i:'40985',d:2,n:/\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1],v:/\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1],t:new Date().getTime()|0,ca:function(r){GM_xmlhttpRequest({method:'GET',url:'https://userscripts.org/scripts/source/'+this.i+'.meta.js',headers:{'User-agent':window.navigator.userAgent,'Accept':'application/atom+xml,application/xml,text/xml'},onload:function(x){aaus_38017.co(x,r)}})},co:function(x,r){this.xv=/\/\/\s*@version\s*(.*)\s*\n/i.exec(x.responseText)[1];this.xn=/\/\/\s*@name\s*(.*)\s*\n/i.exec(x.responseText)[1];if(this.xv!=this.v&&confirm('A new version of the '+this.xn+' user script is available. Do you want to update?')){GM_setValue('updated',this.t);GM_openInTab('http://userscripts.org/scripts/source/'+this.i+'.user.js')}else if(this.xv&&this.xv!=this.v){if(confirm('Do you want to turn off auto updating for this script?')){GM_setValue('updated','off');GM_registerMenuCommand("Auto Update "+this.n,function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca('return')});alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.')}else{GM_setValue('updated',this.t)}}else{if(r)alert('No updates available for '+this.n);GM_setValue('updated',this.t)}},ch:function(){if(GM_getValue('updated',0)==0)GM_setValue('updated',this.t);if(GM_getValue('updated',0)!='off'&&+this.t>+GM_getValue('updated',0)+86400000*this.d){this.ca()}else if(GM_getValue('updated',0)=='off'){GM_registerMenuCommand("Enable "+this.n+" updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}else{GM_registerMenuCommand("Check "+this.n+" for updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}}};if(self.location==top.location&&GM_xmlhttpRequest)aaus_38017.ch();