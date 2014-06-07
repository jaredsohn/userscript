// Copyright (c) 2011, Alexander Shevchenko (alex.shevchenko@inbox.lv)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// 
// Changes from version 1.1:
//    New:
//     - An expandable list at the top of the page with all available
//       different custom tags in the selected status.
//       Tags are sorted alphabetically.
//       List shows up only when at least one tag is available.
//     - A link to reload the page without a tag, but preserving status and order.
//       Link shows up only when the tag parameter is present.
//     - You can style the above two novelties and each of their components individually
//       by editing the following stylesheet and using it in your MAL custom list style:
//       http://alexsh.fileave.com/devel/web/userscript/mal_tags/stylesheets/mal_tags_v1_2.css
//    Improvements:
//     - Now also works with older browser versions (Firefox 3.0+, Opera 9.52+, Chrome, Midori).
//     - A lot of optimization.
// 
// This is a cross-browser script. Do any changes at your own risk.
// 
// Enjoy!
//
// Notes from zanetu@myanimelist: 
// Two includes were added below in order for the script to function properly with Tampermonkey+Chrome.
// 
// ==UserScript==
// @name           MAL tags (Tampermonkey+Chrome)
// @version        1.2
// @namespace      http://myanimelist.net
// @description    Temporary userscript for custom tags feature in MAL lists
// @include        http://myanimelist.net/animelist/*
// @include        http://myanimelist.net/mangalist/*
// ==/UserScript==

if (RegExp("(?:myanimelist\\.net\\/)(?:animelist|mangalist|\\/list\\.php)","i").test(location.href)) {
	var getURLParameter = function(pName) {
		var pValue = RegExp("&"+pName+"=([^&#]*)").exec(location.href);
		if (pValue===null) return "";
		else return decodeURIComponent(pValue[1]);
	};
	var hasClass = function(ele,cls) {
		return RegExp("(?:\\s|^)"+cls+"(?:\\s|$)").test(ele.className);
	};
	var addClass = function(ele,cls) {
		if (!hasClass(ele,cls)) {
			if (ele.className) ele.className+=(" "+cls);
			else ele.className=cls;
		}
	};
	var testNode = document.createElement("p");
	testNode.appendChild(document.createTextNode("test"));
	if (testNode.textContent) {
		var getText = function(node) {
			if (node.textContent) return node.textContent;
			return "";
		};
		var setText = function(node,text) { node.textContent=text; };
	} else if (testNode.innerText) {
		var getText = function(node) {
			if (node.innerText) return node.innerText;
			return "";
		};
		var setText = function(node,text) { node.innerText=text; };
	} else {
		var getText = function(node) { return ""; };
		var setText = function(node,text) {};
	}
	var getNextSibling = function(ele) {
		var x = ele.nextSibling;
		while (x.nodeType!==1) x=x.nextSibling;
		return x;
	};
	var toggleElement = function(ele,val1,val2) {
		if (ele.style.display===val1) ele.style.display=val2;
		else ele.style.display=val1;
	};
	var toggleText = function(node,text1,text2) {
		if (getText(node)===text1) setText(node,text2);
		else setText(node,text1);
	};
	var toggleTitle = function(ele,title1,title2) {
		if (ele.title===title1) ele.title=title2;
		else ele.title=title1;
	};
	var malTags = function() {
		var currentTag = getURLParameter("tag");
		var currentStatus = getURLParameter("status");
		var currentOrder = getURLParameter("order");
		var listSurround = document.getElementById("list_surround");
		var i, j, k, tables = listSurround.getElementsByTagName("table"), spans = [];
		for (i=0; i<tables.length; i++) {
			spans.push(tables[i].getElementsByTagName("span"));
		}
		var tablesWithEntries = [];
		if (currentTag || currentStatus || currentOrder) {
			if (currentTag) {
				for (i=0; i<tables.length; i++) {
					for (j=0; j<spans[i].length; j++) {
						if (spans[i][j].id.search("tagLinks")===0) {
							tablesWithEntries.push([tables[i],spans[i][j].getElementsByTagName("a")]);
							break;
						}
					}
					if (tables[i].rows.length && tables[i].rows[0].cells.length &&
						hasClass(tables[i].rows[0].cells[0],"category_totals")) {
						if (tablesWithEntries.length) {
							addClass(tablesWithEntries[tablesWithEntries.length-1][0],"category_last");
						}
					}
				}
			} else {
				for (i=0; i<tables.length; i++) {
					for (j=0; j<spans[i].length; j++) {
						if (spans[i][j].id.search("tagLinks")===0) {
							tablesWithEntries.push([tables[i],spans[i][j].getElementsByTagName("a")]);
							break;
						}
					}
				}
			}
			if (currentStatus) {
				for (i=0; i<tablesWithEntries.length; i++) {
					for (j=0; j<tablesWithEntries[i][1].length; j++) {
						tablesWithEntries[i][1][j].href+=("&status="+currentStatus);
					}
				}
			}
			if (currentOrder) {
				for (i=0; i<tablesWithEntries.length; i++) {
					for (j=0; j<tablesWithEntries[i][1].length; j++) {
						tablesWithEntries[i][1][j].href+=("&order="+currentOrder);
					}
				}
			}
			if (currentTag) {
				var hasNumColumn = false;
				if (tablesWithEntries.length) {
					if (!tablesWithEntries[0][0].rows[0].cells[0].getElementsByTagName("a").length) {
						hasNumColumn=true;
					}
				}
				var l, a = 0, tagText;
				if (hasNumColumn) {
					for (i=0; i<tablesWithEntries.length; i++) {
						if (!tablesWithEntries[i][1].length) {
							tablesWithEntries[i][0].style.display="none";
						} else {
							for (j=0; j<tablesWithEntries[i][1].length; j++) {
								tagText=getText(tablesWithEntries[i][1][j]);
								if (tagText===currentTag) {
									a+=1;
									setText(tablesWithEntries[i][0].rows[0].cells[0],a);
									for (k=0; k<tablesWithEntries[i][0].rows.length; k++) {
										for (l=0; l<tablesWithEntries[i][0].rows[k].cells.length; l++) {
											tablesWithEntries[i][0].rows[k].cells[l].className="td"+(2-a%2);
										}
									}
									break;
								}
								if (j===tablesWithEntries[i][1].length-1) {
									tablesWithEntries[i][0].style.display="none";
								}
							}
						}
						if (hasClass(tablesWithEntries[i][0],"category_last")) a=0;
					}
				} else {
					for (i=0; i<tablesWithEntries.length; i++) {
						if (!tablesWithEntries[i][1].length) {
							tablesWithEntries[i][0].style.display="none";
						} else {
							for (j=0; j<tablesWithEntries[i][1].length; j++) {
								tagText=getText(tablesWithEntries[i][1][j]);
								if (tagText===currentTag) {
									a+=1;
									for (k=0; k<tablesWithEntries[i][0].rows.length; k++) {
										for (l=0; l<tablesWithEntries[i][0].rows[k].cells.length; l++) {
											tablesWithEntries[i][0].rows[k].cells[l].className="td"+(2-a%2);
										}
									}
									break;
								}
								if (j===tablesWithEntries[i][1].length-1) {
									tablesWithEntries[i][0].style.display="none";
								}
							}
						}
						if (hasClass(tablesWithEntries[i][0],"category_last")) a=0;
					}
				}
				var dropTagTable = tables[0].cloneNode(false);
				dropTagTable.id="drop_tag_table";
				dropTagTable.style.cssFloat="right";
				dropTagTable.style.width="auto";
				dropTagTable.style.margin="12px 0px 0px";
				var dropTagRow = tables[0].rows[0].cloneNode(false);
				var dropTagCell = tables[0].rows[0].cells[0].cloneNode(false);
				dropTagCell.className="td2";
				dropTagCell.style.width="auto";
				var dropTagLink = document.createElement("a");
				dropTagLink.href=encodeURI(decodeURIComponent(location.href).replace("&tag="+currentTag,""));
				dropTagLink.title="Reload the page without a tag";
				setText(dropTagLink,"drop tag");
				dropTagCell.appendChild(dropTagLink);
				dropTagRow.appendChild(dropTagCell);
				dropTagTable.appendChild(dropTagRow);
				listSurround.insertBefore(dropTagTable,getNextSibling(tables[0]));
			}
		} else {
			for (i=0; i<tables.length; i++) {
				for (j=0; j<spans[i].length; j++) {
					if (spans[i][j].id.search("tagLinks")===0) {
						tablesWithEntries.push([tables[i],spans[i][j].getElementsByTagName("a")]);
						break;
					}
				}
			}
		}
		var tagLinkText, allTagLinks = [];
		for (i=0; i<tablesWithEntries.length; i++) {
			for (j=0; j<tablesWithEntries[i][1].length; j++) {
				tagLinkText=getText(tablesWithEntries[i][1][j]);
				for (k=0; k<allTagLinks.length; k++) {
					if (getText(allTagLinks[k])===tagLinkText) break;
				}
				if (k===allTagLinks.length) {
					allTagLinks.push(tablesWithEntries[i][1][j].cloneNode(true));
				}
			}
		}
		if (allTagLinks.length) {
			allTagLinks.sort();
			var customTagsTable = tables[0].cloneNode(false);
			customTagsTable.id="custom_tags_table";
			customTagsTable.style.cssFloat="left";
			customTagsTable.style.width="70%";
			customTagsTable.style.margin="12px 0px 0px 15%";
			customTagsTable.style.borderCollapse="collapse";
			var customTagsHeader = tables[0].rows[0].cloneNode(false);
			customTagsHeader.style.cursor="pointer";
			var customTagsContent = customTagsHeader.cloneNode(false);
			customTagsContent.style.display="none";
			customTagsHeader.id="custom_tags_header";
			customTagsContent.id="custom_tags_content";
			var customTagsHeader1 = tables[0].rows[0].cells[0].cloneNode(false);
			var customTagsHeader2 = tables[0].rows[0].cells[tables[0].rows[0].cells.length-1].cloneNode(false);
			customTagsHeader1.className=customTagsHeader2.className="status_selected";
			customTagsHeader1.style.width="2em";
			customTagsHeader2.style.width="auto";
			var customTagsHeader1Link = document.createElement("a");
			customTagsHeader1Link.name=customTagsHeader1Link.id="custom_tags_toggle1";
			customTagsHeader1Link.title="Show custom tags";
			setText(customTagsHeader1Link,"+");
			var customTagsHeader2Link = document.createElement("a");
			customTagsHeader2Link.name=customTagsHeader2Link.id="custom_tags_toggle2";
			customTagsHeader2Link.title="Show custom tags";
			setText(customTagsHeader2Link,"Available Custom Tags");
			var customTagsContent1 = tables[0].rows[0].cells[0].cloneNode(false);
			customTagsContent1.className="td2";
			customTagsContent1.colSpan="2";
			customTagsContent1.style.width="auto";
			customTagsContent1.style.whiteSpace="normal";
			customTagsHeader1.appendChild(customTagsHeader1Link);
			customTagsHeader2.appendChild(customTagsHeader2Link);
			customTagsContent1.appendChild(allTagLinks[0]);
			for (i=1; i<allTagLinks.length; i++) {
				customTagsContent1.appendChild(document.createTextNode(", "));
				customTagsContent1.appendChild(allTagLinks[i]);
			}
			customTagsHeader.appendChild(customTagsHeader1);
			customTagsHeader.appendChild(customTagsHeader2);
			customTagsContent.appendChild(customTagsContent1);
			customTagsTable.appendChild(customTagsHeader);
			customTagsTable.appendChild(customTagsContent);
			listSurround.insertBefore(customTagsTable,getNextSibling(tables[0]));
			if (customTagsHeader.addEventListener) {
				customTagsHeader.addEventListener('click',
					function() {
						toggleElement(customTagsContent,"none","table-row");
						toggleText(customTagsHeader1Link,"+","-");
						toggleTitle(customTagsHeader1Link,"Show custom tags","Hide custom tags");
						toggleTitle(customTagsHeader2Link,"Show custom tags","Hide custom tags");
					},false);
			} else if (customTagsHeader.attachEvent) {
				customTagsHeader.attachEvent("onclick",
					function() {
						toggleElement(customTagsContent,"none","table-row");
						toggleText(customTagsHeader1Link,"+","-");
						toggleTitle(customTagsHeader1Link,"Show custom tags","Hide custom tags");
						toggleTitle(customTagsHeader2Link,"Show custom tags","Hide custom tags");
					});
			}
		}
	};
	if (document.readyState==="loading") {
		if (window.addEventListener) window.addEventListener("DOMContentLoaded",malTags,false);
		else if (window.attachEvent) window.attachEvent("onload",malTags);
	} else if (document.readyState==="complete") {
		malTags();
	} else {
		if (window.addEventListener) window.addEventListener("load",malTags,false);
		else if (window.attachEvent) window.attachEvent("onload",malTags);
	}
}