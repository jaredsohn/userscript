// Copyright (c) 2011-2012, Alexander Shevchenko (alex.shevchenko@inbox.lv)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// 
// Changes from version 1.2:
//    New:
//     + Now this script also fixes the character issue in tags on anime/manga lists.
//       Bug described here: http://myanimelist.net/forum/?topicid=305051
//       This includes:
//        * Pre-encoding tags before saving, so that the website page would accept all characters, and would not break the html layout.
//        * Encoding the tags in href attributes (also in status and table header links).
//    Improvements:
//     + Added include rules, for script to not be executed at all in Firefox and Chrome if not on an animelist/mangalist page.
//       The check at the beginning still preserved for script to work in some other browsers.
//     + Added grant rule for compatibility with recent Greasemonkey releases.
//     + The script now replaces the updated tag href attributes right after the save. They are usable without a page reload.
//       (This DOES NOT include dynamically updating Available Custom Tags block, for now at least. ^_- )
//     + More optimization.
// 
// This is a cross-browser script. Do any changes at your own risk.
// 
// Enjoy!
// 
// ==UserScript==
// @name           MAL tags
// @version        2.0
// @namespace      http://myanimelist.net
// @description    Temporary (or not?) userscript for custom tags feature in MAL lists
// @include        http://myanimelist.net/animelist/*
// @include        http://myanimelist.net/mangalist/*
// @grant          none
// @updateURL      http://userscripts.org/scripts/source/150384.meta.js
// @downloadURL    https://userscripts.org/scripts/source/150384.user.js
// ==/UserScript==

(function() {

var pregQuote, encodeURIComponentRFC, decodeURIComponentRFC, getURLParameter, hasClass, addClass, getElementsByClass, tagHref, statusHref, orderHref, replaceTagLinkCallback, testNode, getText, setText, getNextSibling, toggleElement, toggleText, toggleTitle, loadScript, malTags;

if (!RegExp('myanimelist\\.net\/(?:animelist|mangalist)\/','i').test(location.href)) return;

pregQuote = function(str,delim) {
	return (str+'').replace(RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\'+(delim||'')+'-]','g'),'\\$&');
};
encodeURIComponentRFC = function(uric) {
	uric=encodeURIComponent(uric);
	uric=uric.replace('!','%21');
	uric=uric.replace("'",'%27');
	uric=uric.replace('(','%28');
	uric=uric.replace(')','%29');
	uric=uric.replace('*','%2A');
	return uric;
};
decodeURIComponentRFC = function (uric) {
	uric=uric.replace('%21','!');
	uric=uric.replace('%27',"'");
	uric=uric.replace('%28','(');
	uric=uric.replace('%29',')');
	uric=uric.replace('%2A','*');
	return decodeURIComponent(uric);
};
getURLParameter = function(pName) {
	var pValue=RegExp('&'+pregQuote(pName)+'=([^&#]*)','i').exec(location.href);
	if (pValue===null) return '';
	else return decodeURIComponentRFC(pValue[1]).replace(/%2f/gi,'\/').replace(/%25((?:25)*2f)/gi,'%$1');
};
hasClass = function(ele,cls) {
	return RegExp('(?:^|\\s)'+pregQuote(cls)+'(?:$|\\s)').test(ele.className);
};
addClass = function(ele,cls) {
	if (!hasClass(ele,cls)) {
		if (ele.className) ele.className+=' '+cls;
		else ele.className=cls;
	}
	return ele.className;
};
getElementsByClass = function(cls,node) {
	var i, all, els=[];
	if (!node || node.nodeType!==1) node=window.document.body;
	all=node.getElementsByTagName('*');
	for (i=0;i<all.length;i++) if (hasClass(all[i],cls)) els.push(all[i]);
	return els;
};
replaceTagLinkCallback = function(a,b,c,d,e) {
	return statusHref+orderHref+b+encodeURIComponentRFC(c.replace(/%((?:25)*2f)/gi,'%25$1').replace(RegExp('\/','g'),'%2F'));
};
testNode=window.document.createElement('p');
testNode.appendChild(window.document.createTextNode('test'));
if (testNode.textContent) {
	getText = function(node) {
		if (node.textContent) return node.textContent;
		return '';
	};
	setText = function(node,text) { node.textContent=text; };
} else if (testNode.innerText) {
	getText = function(node) {
		if (node.innerText) return node.innerText;
		return '';
	};
	setText = function(node,text) { node.innerText=text; };
} else {
	getText = function(node) { return ''; };
	setText = function(node,text) {};
}
getNextSibling = function(ele) {
	do { ele=ele.nextSibling; } while (ele!==null && ele.nodeType!==1);
	return ele;
};
toggleElement = function(ele,val1,val2) {
	if (ele.style.display===val1) ele.style.display=val2;
	else ele.style.display=val1;
};
toggleText = function(node,text1,text2) {
	if (getText(node)===text1) setText(node,text2);
	else setText(node,text1);
};
toggleTitle = function(ele,title1,title2) {
	if (ele.title===title1) ele.title=title2;
	else ele.title=title1;
};
loadScript = function(doc,js,id) {
	var scr=doc.createElement('script');
	if (typeof(id)==='string') scr.setAttribute('id',id);
	scr.setAttribute('type','text\/javascript');
	scr.text=js;
	doc.getElementsByTagName('head')[0].appendChild(scr);
};
malTags = function() {
	var currentStatus=getURLParameter('status'), currentOrder=getURLParameter('order'), currentTag, listSurround, tables, i, j, k, l, spans, tablesWithEntries, statusLinks, tableHeaderLinks, hasNumColumn, a, tagText, dropTagTable, dropTagRow, dropTagCell, dropTagLink, tagLinkText, allTagLinks, ctTable, ctHeader, ctContent, ctHeader1, ctHeader2, ctHeader1Link, ctHeader2Link, ctContent1;
	orderHref=statusHref=tagHref='';
	if (currentStatus) statusHref='&status='+currentStatus;
	if (currentOrder) orderHref='&order='+currentOrder;
	loadScript(window.document,
		'function encodeTags(textarea) {\r\n'+
			"\ttextarea.value=textarea.value.replace(\/%\/g,'%25').replace(\/#\/g,'%23').replace(\/&\/g,'%26').replace(\/\\+\/g,'%2B').replace(\/\"\/g,\"''\").replace(\/<\/g,'≺').replace(\/>\/g,'≻');\r\n"+
		'}\r\n'+
		"var statusHref='"+statusHref+"', orderHref='"+orderHref+"';\r\n"+
		'var encodeURIComponentRFC = '+encodeURIComponentRFC+';\r\n'+
		'var replaceTagLinkCallback = '+replaceTagLinkCallback+';\r\n'+
		'function replaceTagLinks(linkblock) {\r\n'+
			"\tvar i;\r\n"+
			"\tif (linkblock.innerHTML==='Saving...') {\r\n"+
				"\t\tsetTimeout(function(){replaceTagLinks(linkblock);},100);\r\n"+
				"\t\treturn;\r\n"+
			"\t}\r\n"+
			"\tlinkblock=linkblock.getElementsByTagName('a');\r\n"+
			"\tfor (i=0; i<linkblock.length; i++) linkblock[i].setAttribute('href',linkblock[i].getAttribute('href').replace(\/(&tag=)(.*)\/i,replaceTagLinkCallback));\r\n"+
		'}\r\n'+
		'function decodeTags(tagrow) {\r\n'+
			"\ttagrow.innerHTML=tagrow.innerHTML.replace(\/%23\/g,'#').replace(\/%26\/g,'&').replace(\/%2b\/gi,'+').replace(\/%25\/g,'%');\r\n"+
		'}\r\n'+
		'function fixTagEdit(edit) {\r\n'+
			"\tvar aid=edit.parentNode.id.substr(12), textarea=window.document.getElementById('tagInfo'+aid), save=window.document.getElementById('tagRowEdit'+aid).getElementsByTagName('input')[0];\r\n"+
			"\ttextarea.setAttribute('onkeydown',\"if((typeof(event.keyCode)!=='undefined')&&(event.keyCode===13)){encodeTags(this);}\"+textarea.getAttribute('onkeydown')+\"if((typeof(event.keyCode)!=='undefined')&&(event.keyCode===13)){replaceTagLinks(document.getElementById('tagLinks\"+aid+\"'));decodeTags(document.getElementById('tagRow\"+aid+\"'));}\");\r\n"+
			"\tsave.setAttribute('onclick',\"encodeTags(document.getElementById('tagInfo\"+aid+\"'));\"+save.getAttribute('onclick')+\";replaceTagLinks(document.getElementById('tagLinks\"+aid+\"'));decodeTags(document.getElementById('tagRow\"+aid+\"'));\");\r\n"+
		'}'
	);
	listSurround=window.document.getElementById('list_surround');
	tables=listSurround.getElementsByTagName('table');
	spans=[];
	for (i=0; i<tables.length; i++) spans.push(tables[i].getElementsByTagName('span'));
	currentTag=getURLParameter('tag');
	tablesWithEntries=[];
	if (currentTag) {
		for (i=0; i<tables.length; i++) {
			for (j=0; j<spans[i].length; j++) {
				if (typeof(spans[i][j].id)==='string' && spans[i][j].id.search('tagLinks')===0) {
					tablesWithEntries.push([tables[i],spans[i][j].getElementsByTagName('a')]);
					break;
				}
			}
			if (tables[i].rows.length && tables[i].rows[0].cells.length &&
				hasClass(tables[i].rows[0].cells[0],'category_totals')) {
				if (tablesWithEntries.length) addClass(tablesWithEntries[tablesWithEntries.length-1][0],'category_last');
			}
		}
		tagHref='&tag='+encodeURIComponentRFC(currentTag.replace(/%((?:25)*2f)/gi,'%25$1').replace(RegExp('\/','g'),'%2F'));
	} else {
		for (i=0; i<tables.length; i++) {
			for (j=0; j<spans[i].length; j++) {
				if (typeof(spans[i][j].id)==='string' && spans[i][j].id.search('tagLinks')===0) {
					tablesWithEntries.push([tables[i],spans[i][j].getElementsByTagName('a')]);
					break;
				}
			}
		}
	}
	statusLinks=tables[0].getElementsByTagName('a');
	for (i=0; i<statusLinks.length; i++) statusLinks[i].setAttribute('href',statusLinks[i].getAttribute('href').replace(RegExp('^([^&]+&status=[^&]+).*','i'),'$1'+orderHref+tagHref));
	tableHeaderLinks=getElementsByClass('table_headerLink', listSurround);
	for (i=0; i<tableHeaderLinks.length; i++) {
		if (tableHeaderLinks[i].tagName.toLowerCase()==='a') {
			j=tableHeaderLinks[i].getAttribute('href');
			tableHeaderLinks[i].setAttribute('href',j.replace(RegExp('^([^&]+).*'),'$1'+statusHref+'&order='+j.split('').reverse().join('').split('=',1)[0].split('').reverse().join('')+tagHref));
		}
	}
	for (i=0; i<tablesWithEntries.length; i++) for (j=0; j<tablesWithEntries[i][1].length; j++) tablesWithEntries[i][1][j].setAttribute('href',tablesWithEntries[i][1][j].getAttribute('href').replace(/(&tag=)(.*)/i,replaceTagLinkCallback));
	if (currentTag) {
		hasNumColumn=false;
		if (tablesWithEntries.length && !tablesWithEntries[0][0].rows[0].cells[0].getElementsByTagName('a').length) hasNumColumn=true;
		a=0;
		if (hasNumColumn) {
			for (i=0; i<tablesWithEntries.length; i++) {
				if (!tablesWithEntries[i][1].length) tablesWithEntries[i][0].style.display='none';
				else {
					for (j=0; j<tablesWithEntries[i][1].length; j++) {
						tagText=getText(tablesWithEntries[i][1][j]);
						if (tagText===currentTag) {
							a+=1;
							setText(tablesWithEntries[i][0].rows[0].cells[0],a);
							for (k=0; k<tablesWithEntries[i][0].rows.length; k++) for (l=0; l<tablesWithEntries[i][0].rows[k].cells.length; l++) tablesWithEntries[i][0].rows[k].cells[l].className='td'+(2-a%2);
							break;
						}
						if (j===tablesWithEntries[i][1].length-1) tablesWithEntries[i][0].style.display='none';
					}
				}
				if (hasClass(tablesWithEntries[i][0],'category_last')) a=0;
			}
		} else {
			for (i=0; i<tablesWithEntries.length; i++) {
				if (!tablesWithEntries[i][1].length) tablesWithEntries[i][0].style.display='none';
				else {
					for (j=0; j<tablesWithEntries[i][1].length; j++) {
						tagText=getText(tablesWithEntries[i][1][j]);
						if (tagText===currentTag) {
							a+=1;
							for (k=0; k<tablesWithEntries[i][0].rows.length; k++) for (l=0; l<tablesWithEntries[i][0].rows[k].cells.length; l++) tablesWithEntries[i][0].rows[k].cells[l].className='td'+(2-a%2);
							break;
						}
						if (j===tablesWithEntries[i][1].length-1) tablesWithEntries[i][0].style.display='none';
					}
				}
				if (hasClass(tablesWithEntries[i][0],'category_last')) a=0;
			}
		}
		dropTagTable=tables[0].cloneNode(false);
		dropTagTable.id='drop_tag_table';
		dropTagTable.style.cssFloat='right';
		dropTagTable.style.width='auto';
		dropTagTable.style.margin='12px 0px 0px';
		dropTagRow=tables[0].rows[0].cloneNode(false);
		dropTagCell=tables[0].rows[0].cells[0].cloneNode(false);
		dropTagCell.className='td2';
		dropTagCell.style.width='auto';
		dropTagLink=window.document.createElement('a');
		dropTagLink.href=encodeURI(location.href.replace(RegExp('&tag=[^&#]*','gi'),''));
		dropTagLink.title='Reload the page without a tag';
		setText(dropTagLink,'drop tag');
		dropTagCell.appendChild(dropTagLink);
		dropTagRow.appendChild(dropTagCell);
		dropTagTable.appendChild(dropTagRow);
		listSurround.insertBefore(dropTagTable,getNextSibling(tables[0]));
	}
	allTagLinks=[];
	for (i=0; i<tablesWithEntries.length; i++) {
		for (j=0; j<tablesWithEntries[i][1].length; j++) {
			tagLinkText=getText(tablesWithEntries[i][1][j]);
			for (k=0; k<allTagLinks.length; k++) if (getText(allTagLinks[k])===tagLinkText) break;
			if (k===allTagLinks.length) allTagLinks.push(tablesWithEntries[i][1][j].cloneNode(true));
		}
	}
	if (allTagLinks.length) {
		allTagLinks.sort();
		ctTable=tables[0].cloneNode(false);
		ctTable.id='custom_tags_table';
		ctTable.style.cssFloat='left';
		ctTable.style.width='70%';
		ctTable.style.margin='12px 0px 0px 15%';
		ctTable.style.borderCollapse='collapse';
		ctHeader=tables[0].rows[0].cloneNode(false);
		ctHeader.style.cursor='pointer';
		ctContent=ctHeader.cloneNode(false);
		ctContent.style.display='none';
		ctHeader.id='custom_tags_header';
		ctContent.id='custom_tags_content';
		ctHeader1=tables[0].rows[0].cells[0].cloneNode(false);
		ctHeader2=tables[0].rows[0].cells[tables[0].rows[0].cells.length-1].cloneNode(false);
		ctHeader1.className=ctHeader2.className='status_selected';
		ctHeader1.style.width='2em';
		ctHeader2.style.width='auto';
		ctHeader1Link=window.document.createElement('a');
		ctHeader1Link.name=ctHeader1Link.id='custom_tags_toggle1';
		ctHeader1Link.title='Show custom tags';
		setText(ctHeader1Link,'+');
		ctHeader2Link=window.document.createElement('a');
		ctHeader2Link.name=ctHeader2Link.id='custom_tags_toggle2';
		ctHeader2Link.title='Show custom tags';
		setText(ctHeader2Link,'Available Custom Tags');
		ctContent1=tables[0].rows[0].cells[0].cloneNode(false);
		ctContent1.className='td2';
		ctContent1.colSpan='2';
		ctContent1.style.width='auto';
		ctContent1.style.whiteSpace='normal';
		ctHeader1.appendChild(ctHeader1Link);
		ctHeader2.appendChild(ctHeader2Link);
		ctContent1.appendChild(allTagLinks[0]);
		for (i=1; i<allTagLinks.length; i++) {
			ctContent1.appendChild(window.document.createTextNode(', '));
			ctContent1.appendChild(allTagLinks[i]);
		}
		ctHeader.appendChild(ctHeader1);
		ctHeader.appendChild(ctHeader2);
		ctContent.appendChild(ctContent1);
		ctTable.appendChild(ctHeader);
		ctTable.appendChild(ctContent);
		listSurround.insertBefore(ctTable,getNextSibling(tables[0]));
		if (ctHeader.addEventListener) {
			ctHeader.addEventListener('click',
				function() {
					toggleElement(ctContent,'none','table-row');
					toggleText(ctHeader1Link,'+','-');
					toggleTitle(ctHeader1Link,'Show custom tags','Hide custom tags');
					toggleTitle(ctHeader2Link,'Show custom tags','Hide custom tags');
				},false);
		} else if (ctHeader.attachEvent) {
			ctHeader.attachEvent('onclick',
				function() {
					toggleElement(ctContent,'none','table-row');
					toggleText(ctHeader1Link,'+','-');
					toggleTitle(ctHeader1Link,'Show custom tags','Hide custom tags');
					toggleTitle(ctHeader2Link,'Show custom tags','Hide custom tags');
				});
		}
	}
	k=window.document.getElementsByTagName('div');
	for (i=0; i<k.length; i++) {
		if (typeof(k[i].id)==='string' && k[i].id.search('tagChangeRow')===0) {
			j=k[i].getElementsByTagName('a');
			if (j.length>0) j[0].setAttribute('onclick',j[0].getAttribute('onclick')+'fixTagEdit(this);');
		}
	}
};
if (window.document.readyState==='loading') {
	if (window.addEventListener) window.addEventListener('DOMContentLoaded',malTags,false);
	else if (window.attachEvent) window.attachEvent('onload',malTags);
} else if (window.document.readyState==='complete') {
	malTags();
} else {
	if (window.addEventListener) window.addEventListener('load',malTags,false);
	else if (window.attachEvent) window.attachEvent('onload',malTags);
}

})();
