// ==UserScript==
// @name           Mark Read, Mark Unread
// @namespace      http://userscripts.org/users/139986
// @description    adds mark addon read and unread text links to Mozilla Addons
// @include        https://addons.mozilla.org/*/*/extensions/*
// @copyright      Delirium tremens
// @version        0.3
// ==/UserScript==

function main() {
  addbuttons();
  Strategy.setType('read');
  Strategy.ifmark();
  Strategy.setType('unread');
  Strategy.ifmark();
}

var Strategy = {
	setType : function(type) {
		if (type == 'read') {
			Strategy.myaddon = 'read';
		  Strategy.mycolor = 'yellow';
		  Strategy.myidsvar = readids;
		  Strategy.myidstext = 'readids';
	  } else if (type == 'unread') {
			Strategy.myaddon = 'unread';
		  Strategy.mycolor = '#05E';
		  Strategy.myidsvar = unreadids;
		  Strategy.myidstext = 'unreadids';
		}
  },
  setInverseType : function() {
		if (Strategy.myaddon == 'read') {
			Strategy.myaddon = 'unread';
		  Strategy.mycolor = '#05E';
		  Strategy.myidsvar = unreadids;
		  Strategy.myidstext = 'unreadids';
	  } else if (Strategy.myaddon == 'unread') {
			Strategy.myaddon = 'read';
		  Strategy.mycolor = 'yellow';
		  Strategy.myidsvar = readids;
		  Strategy.myidstext = 'readids';
		}
	},
	ifmark : function () {
		var i, j, link, id;
		myidsvar = Strategy.myidsvar;
		mycolor = Strategy.mycolor;
		
		for (i = 0; i < links.length; i++) {
			link = links[i];
			if (link.href.indexOf('#reviews') == -1) {
				for (j = 0; j < myidsvar.length; j++) {
					id = myidsvar[j];
					id = '/addon/' + id;
					if (link.href.indexOf(id) != -1) {
						link.style.color = mycolor;
					}
				}
			}
		}
	},
  markfunc : function (parentNode) {
		var currenttable, currenta, currentid;
		mycolor = Strategy.mycolor;
		
		currenttable = parentNode;
		currenta = currenttable.getElementsByTagName('a')[0];
		currenta.style.color = mycolor;
		currentid = currenta.href.match(/addon\/([^\/]+)/)[1];
		
		Strategy.setInverseType();
		Strategy.removeID(currentid);
		Strategy.setInverseType();
		Strategy.addID(currentid);
  },
  addID : function (id) {
		myidstext = Strategy.myidstext;
		
    var gmids = GM_getValue(myidstext, '');
		if (gmids.indexOf(id) == -1) {
			GM_setValue(myidstext, (gmids == '') ? id : gmids + ',' + id);
		}
	},
	removeID : function (id) {
		myidstext = Strategy.myidstext;
		
		var gmids = GM_getValue(myidstext, '');
		if (gmids.indexOf(id) != -1) {
			gmids = gmids.replace(new RegExp('('+id+',)|(,'+id+'|'+id+')', 'i'),'');
			GM_setValue(myidstext, gmids);
		}
	}
}

var links = $x("//a[contains(@href, '/addon/')]");
var divs = $x("//div[@class = 'item addon']");

function $x(p, context) {
  if (!context) context = document;
  var i, arr = [],
  xpr = document.evaluate(p, context, null, 6, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) {
    arr.push(item);
  }
  return arr;
}

var readids = GM_getValue('readids', '');
var readids = (readids == '') ? '' : readids.split(',');
var unreadids = GM_getValue('unreadids', '');
var unreadids = (unreadids == '') ? '' : unreadids.split(',');

function addbuttons() {
  var i, div, abr, markread, textread, markunread, textunread, firstdetails, firsth4, firsth3;
  for (i = 0; i < divs.length; i++) {
    div = divs[i];
    markread = document.createElement('span');
    markread.setAttribute('style', 'cursor: pointer');
    markunread = document.createElement('span');
    markunread.setAttribute('style', 'cursor: pointer');
    separator = document.createTextNode('|');
    firsth3 = div.getElementsByTagName('h3')[0];
    firsth3.appendChild(markread);
    firsth3.appendChild(separator);
    firsth3.appendChild(markunread);
    textread = document.createTextNode('mark read');
    textunread = document.createTextNode('mark unread');
    markread.appendChild(textread);
    markunread.appendChild(textunread);
    markread.addEventListener("click", function() {
			Strategy.setType('read');
			parentNode = this.parentNode;
			Strategy.markfunc(parentNode);
		}, false);
    markunread.addEventListener("click", function() {
			Strategy.setType('unread');
			parentNode = this.parentNode;
			Strategy.markfunc(parentNode);
		}, false);
  }
}

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function reset() {
  GM_setValue('readids', '');
  GM_setValue('unreadids', '');
  if (confirm('Reset all marks?')) {
    window.location.reload();
  }
}

GM_registerMenuCommand('Reset All Marks', reset);
main();
