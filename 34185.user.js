// ==UserScript==
// @name Warez-BB Auto-Topic-Pager BETA 3
// @namespace http://www.warez-bb.org
// @description Automatically load the next page of posts when you scroll down
// @author WolfWolf
// @include http://www.warez-bb.org/viewforum*
// @include http://warez-bb.org/viewforum*
// ==/UserScript==
var nextURL=null
var mainTable=null
window.addEventListener("load",init,false)
setInterval(testScrollPosition,50)
function getXPathNode(_xPath){return document.evaluate(_xPath,document,null,9,null).singleNodeValue}
function toggleHidden(_node){if(_node.style.display!='none')_node.style.display='none'
else _node.style.display=''}var toHide=getXPathNode("/html/body/table/tbody/tr/td/table[3]/tbody/tr/td/table/tbody/tr[66]")
toggleHidden(toHide)
var lastRow=lastRowOf(toHide)
lastRow.parentNode.removeChild(lastRow)
function init(){mainTable=findMainTable(document)
var nextLinkNode=findNextLink(document)
setNextURL(document)}function testScrollPosition(){if((nextURL!=null)&&(document.body.offsetHeight-document.body.scrollTop<4*window.innerHeight)){pullMore()}}
function pullMore(){var iframe=document.createElement("iframe")
iframe.addEventListener("load",whee,false)
iframe.width=1
iframe.height=1
iframe.style.display="none"
iframe.src=nextURL
document.body.appendChild(iframe)
nextURL=null
function whee(){var iframeDoc=iframe.contentDocument
setNextURL(iframeDoc)
siphon(findMainTable(iframeDoc),mainTable)
setTimeout(function(){iframe.parentNode.removeChild(iframe);},1500)}}
function findMainTable(doc){for(var table,i=0;table=doc.getElementsByTagName("table")[i];++i)
if(table.className=="forumline"&&table.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.tagName=="TABLE")return table}
function findNextLink(doc){for(var link,i=0;link=doc.links[i];++i)if(link.innerHTML=="Next"&&link.getAttribute("href").substr(0,10)=="viewforum.")return link}
function setNextURL(doc){var nextLink=findNextLink(doc)
if(nextLink)nextURL=nextLink.href}function lastRowOf(table){return table.tBodies[0].rows[table.tBodies[0].rows.length-1]}
function siphon(sourceTable,destTable){var row
while((row=sourceTable.rows[0]))destTable.tBodies[0].appendChild(row)}