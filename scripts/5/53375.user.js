// ==UserScript==
// @name           which page am I on?
// @namespace      -
// @description		 Find out instantly on which page of google's search your website appears, directly from the search results page.
// @include        http*://*google.*/search?*
// @include        http*://*google.*/webhp?*q=*
// ==/UserScript==

var lastPage = 30;
var sDomainName = '';
var bDomainNameChanged = false;
var TRange = null;

function wpSetup() {
	var btnG = document.evaluate("//td[@id='sff']/table/tbody/tr/td[@nowrap='']/input[@type='submit' and @name='btnG']", 
		document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
	).singleNodeValue;

	var wpDomainTD = document.createElement('td');
	wpDomainTD.setAttribute('width', '50%');
	wpDomainTD.setAttribute('align', 'right');

	var wpDomainPageNo = document.createElement('span');
	wpDomainPageNo.setAttribute('id', 'wpDomainPageNo');
	wpDomainPageNo.setAttribute('class', 'cur');
	wpDomainPageNo.style.margin = '0px 5px';
	wpDomainPageNo.setAttribute('title', 'page number');

	wpDomainTD.appendChild(wpDomainPageNo);

	var wpDomainInput = document.createElement('input');
	wpDomainInput.setAttribute('id', 'wpDomain');
	wpDomainInput.setAttribute('type', 'text');
	wpDomainInput.setAttribute('name', 'wpDomain');
	wpDomainInput.setAttribute('title', 'domain name');
	wpDomainInput.addEventListener('blur', function (e) {
			bDomainNameChanged = (sDomainName != this.value) && (sDomainName.length);
			sDomainName = this.value;
		},
		false
	);

	wpDomainTD.appendChild(wpDomainInput);

	var wpDomainSubmit = document.createElement('button');
	wpDomainSubmit.setAttribute('id', 'wpDomainSubmit');
	wpDomainSubmit.setAttribute('value', 'Go');
	wpDomainSubmit.style.height = '1.85em';
	wpDomainSubmit.style.fontSize = '15px';
	wpDomainSubmit.innerHTML = 'Go';

	wpDomainSubmit.addEventListener('click', function (e) {
			e.stopPropagation();
			e.preventDefault();

			if (wpDomainInput.value.length < 3)
				return false;
				
			var r = findString(wpDomainInput.value);
			if (!r) {
				var tdClassCur = document.evaluate("//td[@class='cur']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				var aNextPage = tdClassCur.nextSibling.firstChild;

				aNextPage.href = aNextPage.href + '&wpDomain=' + wpDomainInput.value;

				if (bDomainNameChanged) {
					aNextPage.href = aNextPage.href.replace(/start=([0-9])*/g, 'start=0');
				}

				window.location = aNextPage.href;
			}

			return false;
		}, 
		false
	);

	wpDomainTD.appendChild(wpDomainSubmit);

	btnG.parentNode.parentNode.appendChild(wpDomainTD);

	var aGetParams = window.location.href.split('&');

	var bWpPageNoSet = false;
	for (var k=0; k < aGetParams.length; k++)
	if (aGetParams[k].indexOf('pDomain=') != -1) {
			sDomainName = aGetParams[k].split('=')[1];
			wpDomainInput.value = sDomainName;

			if (!sDomainName.length)
				continue;
			
			var start = 0;
			for (var i=0; i < aGetParams.length; i++)
				if (aGetParams[i].indexOf('start=') == 0)
					start = aGetParams[i].split('=')[1];

			var rpp = getRpp();

			wpDomainPageNo.innerHTML = (start / rpp + 1);

			if (start < (lastPage - 1) * rpp)
				wpDomainSubmit.click();
			bWpPageNoSet = true;
		}
	else
		if (aGetParams[k].indexOf('start=') != -1) {
			start = aGetParams[k].split('=')[1];
			var rpp = getRpp();
			wpDomainPageNo.innerHTML = (start / rpp + 1);
			bWpPageNoSet = true;
		}

	if (!bWpPageNoSet)
		wpDomainPageNo.innerHTML = '1';
}

function findString (str) {
 if (parseInt(navigator.appVersion) < 4) return;
 var strFound;
 if (window.find) {

  // CODE FOR BROWSERS THAT SUPPORT window.find

  strFound=self.find(str);
  if (strFound && self.getSelection && !self.getSelection().anchorNode) {
   strFound=self.find(str)
  }

	if ( strFound && self.getSelection && self.getSelection().anchorNode
		&& self.getSelection().anchorNode.parentNode.tagName != 'CITE') {
		findString (str);
	}
	
 }

 return strFound;
}

function getRpp() {
	var rpp = 10;
	var cookieParams = document.cookie.split(':');
	for (var i=0; i < cookieParams.length; i++)
		if (cookieParams[i].indexOf('NR=') == 0)
			rpp = cookieParams[i].split('=')[1];
	return rpp;
}

window.setTimeout(wpSetup, 500);
