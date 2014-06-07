// Version: 0.0.2d
// ==UserScript==
// @name          WebSwissKnifeToolBar
// @namespace     http://blog.wsktoolbar.com
// @description	  Multi tool for everything on the web, the web's swissknife.		  
// @version	  0.0.2d
// @include       *
// Wordpress rich editor uses editable frames that include WSKTB on every post
// @exclude       */wp-admin/*
// ==/UserScript==


(function(){var DEBUG=false;const version="0.0.2d";if(unsafeWindow==null)unsafeWindow=window;unsafeWindow.swissKnifeMenuAccesKey=swissKnifeMenu;var accessKeyFunction=function(){topCord=3;leftCord=3;unsafeWindow.swissKnifeMenuAccesKey(true)}
GM_registerMenuCommand("Show WSKTB",accessKeyFunction,"w","alt");var dummyButton=document.createElement("button");dummyButton.addEventListener("click",unsafeWindow.swissKnifeMenuAccesKey,true);dummyButton.accessKey="w";dummyButton.appendChild(document.createTextNode("dummyButton"));with(dummyButton.style)
{position="absolute";top="0px";left="-500px";}
unsafeWindow.document.body.appendChild(dummyButton);var Images={close:"data:image/png;base64,"
+"iVBORw0KGgoAAAANSUhEUgAAABEAAAAPCAYAAAACsSQRAAAABmJLR0QA/wD/AP+gvaeTAAAACXBI"
+"WXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gsNDQAaeLPWdwAAAHhJREFUOMut0ksOwCAIBNCZxl1P"
+"xcnam+mlurYrDRr8tMpODC+CELiwGg4AYrzjX4AkXTqEED4DqebAhjAREYGITOdNxHufizSg74ZI"
+"DfWA4Ux0UQsYIlY7VTxdRLdgzWjqd1rtVNCZN7Y3i5n8lmVbWvsCIcmVl7wD+jFyVkjF9gAAAABJ"
+"RU5ErkJggg==",minimize:"data:image/gif;base64,"
+"R0lGODlhCwALAKECAAAAAMzMzP///////yH+FUNyZWF0ZWQgd2l0aCBUaGUgR0lNUAAh+QQBCgAD"
+"ACwAAAAACwALAAACGpyPJsus3d4CcTCAnRW4L9WFggSNW2miX8IWADs=",maximize:"data:image/gif;base64,"
+"R0lGODlhCwALAKEBAAAAAP///////////yH5BAEKAAIALAAAAAALAAsAAAIalI8Wy6zdFJgUhFft"
+"FYw63kUgtDzkdpbJWgAAOw==",sticky:"data:image/gif;base64,"
+"R0lGODlhDAAMAPcAAAAAAEJCQu/v3v//////////////////////////////////////////////"
+"////////////////////////////////////////////////////////////////////////////"
+"////////////////////////////////////////////////////////////////////////////"
+"////////////////////////////////////////////////////////////////////////////"
+"////////////////////////////////////////////////////////////////////////////"
+"////////////////////////////////////////////////////////////////////////////"
+"////////////////////////////////////////////////////////////////////////////"
+"////////////////////////////////////////////////////////////////////////////"
+"////////////////////////////////////////////////////////////////////////////"
+"////////////////////////////////////////////////////////////////////////////"
+"////////////////////////////////////////////////////////////////////////////"
+"////////////////////////////////////////////////////////////////////////////"
+"////////////////////////////////////////////////////////////////////////////"
+"/////////////////////////////////////////////////////yH5BAEAAAIALAAAAAAMAAwA"
+"AAgrAAUIHEiwIICDBwsKBCAwAEOFDx0qFBDxocGGFgci3DiRYkeNHxeGHPkxIAA7",help:"data:image/png;base64,"
+"R0lGODlhEAAQAOesAPX19e7u7vT09PPz89HR0fHx8fLy8s3NzTBZgtTU1PDw8Onp6eLi4tvb28PD"
+"w9jY2MnJycDAwMvLy9vr8CxVfsLo9MXFxZeqvefn59/f38rKytnZ2avi9S9YgdLq8lTG7HSrvnG3"
+"z+jo6NXV1XjF39ru9SWhy+P1++7z9Ofv8SlRelO+4NTv+T5kirTW4uft8IC90Vh4mXSsv6rf8F15"
+"lHWrvtPT097v9N/w9kafvXC0y8HJy3zO6i5XgKPf9H3R7bXZ5aSttUuqytvy+rnm9oXE2TBZgfD0"
+"9nG1zCSex7Ti8jFZgjlfhbe9v5u3v8/U2YLV8eTk5F2rxqG+x+zs7ImftYids5Ta8rrh7sbO0D1j"
+"iY/S6MbGxu34/COYv8zU3M/Pz93d3ezy9O3z9dDp8p6suqC8xbPV4CKWvcHBweHz+szMzLrCxKXg"
+"9OXt8KzL1XnS8HW/2J7d88rs93rJ43bS8Xu0yEaw03TQ7u75/GS82s7OzmzN7dfX15fY7dvi5Z+t"
+"uuvr6+Xl5Y7S6MbNz9fe4dzc3MLCwi1Wf9ra2kKkxjthh7PBzr7m9H7U8pjd9LrAwtHX3GOBn7fm"
+"9obE2cLj7UCgwLjAwo3X8ePj48fHxytUfUKlx7zk8n2Qo1K73bLk9cjIyELB7FHG7X6Xr1h2lHGz"
+"ynevwkVojHK50UeiwO/v7///////////////////////////////////////////////////////"
+"////////////////////////////////////////////////////////////////////////////"
+"////////////////////////////////////////////////////////////////////////////"
+"////////////////////////////////////////////////////////////////////////////"
+"/////////////////////////////////////////////////////yH5BAEAAP8ALAAAAAAQABAA"
+"AAiwAP8JHEiwoEGBY8QcJHgEAAABAwwUeHHQ4cOIBRSsClAQhQABjGK00FJl44I/BAcM+LIEgSQE"
+"RqyIyJSBoAEDpBBc0NhhEQNDGwamKJDxwsZIPVA16GMji0A3q6IGCPQEEQVAIwgc2DEwAJUFGKIw"
+"oVAmARgJEAhiEMQgQ4NNpbRq0GSBYKEwiR4kILBHQigLDiAV1KtVBQ0uDtJEOEhoDQRPQQ5FaLJw"
+"IJtLlTMTDAgAOw==",config:"data:image/gif;base64,"
+"R0lGODlhFAAUAOe9AAADAA4AAAAFDggAFxEAABUAAAALABYAAAAGHhgAABgABhsABwADQhsAChMG"
+"ACAAAAsCLxsDABIIACMABAMNFwoOAB8BGyMFAAMISAUXBxMIMzICABgQAAwXCSQJGhgUAEQAABoS"
+"HRIeABEdCRIbIg0hFhIWUxMeMj8OLlYPAEsUDx0wAComJTgaTDkbTTYsAFgbACAkayklYComWF4c"
+"ADYxAF4dADowAGIcADAqTiMpdycsblIkJDUvOyY1SlMmIDkzJyM3TyU1VnkbAkE4AFElSTA2TjE7"
+"My41YU0sP4kcAGgnIzI7WDU6ZDI+ZDY+YjlBbz1OKjpIb0ZNPVNWCVxSC5ozFIE7L05ZMVldAExY"
+"TldOaZ05ImBbF1VhH2FQWl9jBV9gJExWkaw7HVRiSHRYM2xmCH1PWotUG1pwDlpkW21tAGdlTF9u"
+"N8xBBmJsSnNwCaFPQWBqYlxraG9uLopiJW52IXdyHmp5Hmt2MdBHG59dLWFwc8dPG81LKXhmlnB7"
+"P8hRM252eW95e4V9Knx2doWCIX+ARKZpZHSJTrdrUXaMdXeOlJ6TU4qLzpeYbJ6eSLCKlaGbZ6au"
+"Yam1dce4WbKyzrPAirPBjsq4lLvGeq3CubzClP+0ZNDKcvSwnf+4c/++hv/Ap97YjN7M4v/RnN/o"
+"i8zi7//ZquHvsuXur9vt4fLwnejj//rwkf/stvLzyeT3//T/qev0///9m+n3//X/wf//qP//q+/4"
+"//L5///+1vL/////////////////////////////////////////////////////////////////"
+"////////////////////////////////////////////////////////////////////////////"
+"////////////////////////////////////////////////////////////////////////////"
+"/////////////////////////////////////////////////////yH5BAEKAP8ALAAAAAAUABQA"
+"AAj7AP8JHEiwoMGDCBMqXMjQIBQkAnOJ0aFrFq9YQg5KmaPFyJNaThy1siRo06mDfDBRwjJiFQUI"
+"f0gVysDIIBMymkxNAmRgypckkQp0EGDwiAgquLLYSfWozAZED1j4KLjlTR5WZuCAUSWpzh4QSxyc"
+"iEEwxCVZnm5JuFMhAJpXouIQGISBYI82eGpUcjUKViYbpQINiSCHAcEcUVYYonWjC6ddOFD5sXJA"
+"jQmCMkokgkSkCh1bjVKE0qPkAokdBYMsOsThRZg0a2h0cjMmQZODCAB8AMLGCyEYoPpwWbBwhoYB"
+"DVR8UnRlQkOBRc784IHi+T8XFhR4aGFdYUAAOw==",feedBack:"data:image/gif;base64,"
+"R0lGODlhEwARAMIEAAAAAMDAwO7u7v//AP///////////////yH5BAEAAAEALAAAAAATABEAAAM3"
+"GLrczmDIAZ6Lk1oFcNbW91XP5Jmh1FHos56ge0bdxlEYaQdsvK8+W0cg0P2GRmGntuMsm1BFAgA7"};function debugMsg(msg)
{if(DEBUG)GM_log(msg);}
debugMsg('BOF');var tmpAccessKey="";function bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction,accessKey,arrayMenuId){tmpAccessKey=accessKey?accessKey:"";debugMsg('bmk: 1');var item=document.createElement("div");if(imgSRC)
{var imgItem=document.createElement("img");with(imgItem)
{src=imgSRC;witdh="20";height="17";align="absmiddle";style.marginRight="4px";}
item.appendChild(imgItem);}
debugMsg('bmk: 2');if(buttonINNERHTML&&buttonFunction)
{var buttonFunctionRightClick=function(ev){if(isRightClick(ev))
{if(configFunction)
{menuFeet.innerHTML="";menuFeet.appendChild(configFunction());ev.stopPropagation();}
else
{menuFeet.innerHTML="WebSwissKnifeToolbar version: "+version;ev.stopPropagation();}}}
var button=document.createElement("button");with(button)
{innerHTML=buttonINNERHTML;style.margin="1px 1px 1px 1px";style.textAlign="center";style.backgroundColor="#eee";style.border="1px solid #ccc";style.color="#5454dc";title=buttonTitle;if(tmpAccessKey)
{accessKey=tmpAccessKey;}
addEventListener('click',function(){if(typeof(arrayMenuId)!="undefined")
GM_setValue("lastScript",arrayMenuId);buttonFunction();lastScriptFunction=buttonFunction;var recentButton=this.parentNode.cloneNode(true);recentButton.getElementsByTagName('button')[0].addEventListener("click",buttonFunction,true);_divSwissKnifeMenuContent.replaceChild(recentButton,_divSwissKnifeMenuContent.childNodes[3]);},false);addEventListener('mousedown',buttonFunctionRightClick,false);}
item.appendChild(button);}
else
{item=null}
debugMsg('bmk: 2a');if(initFunction)initFunction();debugMsg('bmk: 3');return item;debugMsg('bmk: 4');}
function isRightClick(e){var rightclick;if(!e)var e=window.event;if(e.which)rightclick=(e.which==3);else if(e.button)rightclick=(e.button==2);return rightclick;}
function HTTPRequest(url,handler){GM_xmlhttpRequest({method:"GET",url:url,onload:function(details)
{if(details.readyState==4){if(details.status!=200){return;}
if(handler!=null){handler(details.responseText);}}}});}
function _gt(e){return document.getElementsByTagName(e);}
function _gi(e){return document.getElementById(e);}
function _ce(e){return document.createElement(e);}
function _ct(e){return document.createTextNode(e);}
function selfWindowBox(url){var windowBox=_ce('div');with(windowBox)
{id='windowBox';style.position='absolute';style.zIndex=2500001;style.top='55px';style.background='#ffffff';style.height='80%';style.left='50px';var w=document.body.clientWidth-100;var h=document.body.clientHeight-150;addEventListener("mousedown",function(e)
{beginDrag(windowBox,e)},true);innerHTML='<div style="color:#1393c0;width:'+w+'px;overflow:hidden;text-align:right;padding:4px 0px 4px 0px;background:#ddd;font-size:12px"><a href="javascript: void(history.back())">[Back]</a> | <a href="javascript: void(history.forward())">[Forward]</a></div>';innerHTML+='<iframe src="'+url+'" width="'+w+'" height="100%" frameborder="0"></iframe>';innerHTML+='<br /><div style="text-align:right;padding:4px;background:#ddd;font-size:12px"><span style="float:left"><a href="'+url+'" target="_blank"><b>Open in new window</b></a> | <a href="'+url+'"><b>Open in current window</b></a></span><a href="javascript: void(document.getElementById(\'windowBox\').style.display = \'none\')">Hide Window</a></div>';}
document.body.appendChild(windowBox);}
function askForInput()
{if(!selection)
{selection=prompt("Selection:");if(!selection)
return false;textareaSelection.value=inputSelection.value=selection}
return true;}
function buttonSearchBookmarklet(GMVarName,urlpre,urlsuf)
{if(GM_getValue(GMVarName)==null)
GM_setValue(GMVarName,"tab");if(!askForInput())return;var url=urlpre+selection+urlsuf;switch(GM_getValue(GMVarName))
{case"tab":GM_openInTab(url);break;case"newWindow":unsafeWindow.open(url,'','');break;case"selfWindow":unsafeWindow.open(url,'_self','');break;case"selfWindowBox":selfWindowBox(url);break;}}
function runRemoteScript(url){GM_xmlhttpRequest({method:"GET",url:url,onload:function(details)
{if(details.readyState==4)
{if(details.status!=200){return;}
try{eval(details.responseText);}
catch(e){alert("Error on script:"+e);}}}});}
function configBookmarletSelect(GMVarName,text)
{var container=document.createElement("div");var objSelect=document.createElement("select");objSelect.addEventListener("change",function(){if(this.value!="")
GM_setValue(GMVarName,this.value);},true);var objOption=document.createElement("option");objOption.innerHTML=text;objOption.value="";objSelect.appendChild(objOption);var objOption=document.createElement("option");objOption.innerHTML="Tab";objOption.value="tab";if(GM_getValue(GMVarName)=="tab")
objOption.selected=true;objSelect.appendChild(objOption);var objOption=document.createElement("option");objOption.innerHTML="New window";objOption.value="newWindow";if(GM_getValue(GMVarName)=="newWindow")
objOption.selected=true;objSelect.appendChild(objOption);var objOption=document.createElement("option");objOption.innerHTML="Self Window";objOption.value="selfWindow";if(GM_getValue(GMVarName)=="selfWindow")
objOption.selected=true;objSelect.appendChild(objOption);var objOption=document.createElement("option");objOption.innerHTML="Self Window Box";objOption.value="selfWindowBox";if(GM_getValue(GMVarName)=="selfWindowBox")
objOption.selected=true;objSelect.appendChild(objOption);container.appendChild(objSelect);return container;}
function configBookmarletCheckbox(GMVarName,text)
{var container=document.createElement("div");var OpenInATabCheckBox=document.createElement("input");OpenInATabCheckBox.type="checkbox";if(GM_getValue(GMVarName)==true)
OpenInATabCheckBox.checked=true;OpenInATabCheckBox.addEventListener("click",function(){if(this.checked==false)
{GM_setValue(GMVarName,false);}
else
{GM_setValue(GMVarName,true);}},true);var description=document.createElement("b");description.innerHTML=text;container.appendChild(OpenInATabCheckBox);container.appendChild(description);return container;}
debugMsg('1');var arrayMenu=new Array({id:-4,name:"FEEDS READER",sourcecode:function()
{var imgSRC="data:image/png;base64,"
+"/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIf"
+"IiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7"
+"Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAgACADASIA"
+"AhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAABgQDBf/EACoQAAEDAwIDCAMAAAAAAAAAAAECAwQA"
+"BRESQQYhMRMVUWFxgaGxIjLx/8QAGAEAAwEBAAAAAAAAAAAAAAAAAgQGAAP/xAAhEQACAgIBBAMA"
+"AAAAAAAAAAABAgADETFBEyGB0RJxwf/aAAwDAQACEQMRAD8ATFc3iS8FrtgjUCUBWdKQNq1f4auU"
+"VJUWkvJHUtnPx1rCzQ3ZdwS0y+phZSSFp6jlSIm92gdo44JscftnqB9/dT6Ktil7Ad7HqUFjmtgl"
+"ZGtH3DCWhukZ8xVMWa5bX0vMKKcHKkjosbgiu/NiR71CM2CMSEjmndR8D5+dD3HSVY9qXet6XBB7"
+"cGda3W9SCPsS+3Q3Zkhtlk6VqGdWcYGKQR5Uq0T2oM50PNPckLJzjbeuK83JsssDm2ts/g5jkoeI"
+"9tqhnXGVMkB95zWtONJGABijrbo57EMD4xAevr8j4485iQHubipDKOUecnknYH+/dHuJ44h8RLSk"
+"YQ9hwD16/INTzbzc5cliQ6QpyOrU2QgDBz89K1YauvE91ackjJQNJWEYCU53x60wzpYpRBzkTV1N"
+"URY5GsH8n//Z";var buttonINNERHTML="Feeds reader";var buttonFunction=function(ev){function readFeed(url)
{if(!url)return;var win=new wsktbWindow();win.init();win.showNearTheMenu();win.setHtmlContent("working...");HTTPRequest(url,function(response){var parser=new DOMParser();var dom=parser.parseFromString(response,"application/xml");var rootNode=dom.documentElement;var r=rootNode.getElementsByTagName("channel");var entrys=r[0].getElementsByTagName("item");var entrysNum=entrys.length;var entryTitle='';var entryDesc='';var entryLink='';var entryDate='';var content='';for(var i=0;i<entrysNum;i++){entryTitle=entrys[i].getElementsByTagName("title")[0].firstChild.nodeValue;entryDesc=entrys[i].getElementsByTagName("description")[0].firstChild.nodeValue;entryLink=entrys[i].getElementsByTagName("guid")[0].firstChild.nodeValue;if(!entryLink||entryLink=="")
entryLink=entrys[i].getElementsByTagName("link")[0].firstChild.nodeValue;entryDate=entrys[i].getElementsByTagName("pubDate")[0].firstChild.nodeValue;content+='<h3><a href="'+entryLink+'" target="_blank">'+entryTitle+'</a><h5>'+entryDate+'</h5>'+entryDesc+'<br /><br/>';}
win.resizeWindow(500,400);GM_log(content);win.setHtmlContent(content);});}
var GMVarName="feedsList"
if(GM_getValue(GMVarName)==null)
GM_setValue(GMVarName,"http://www.digg.com/rss/index.xml\nhttp://www.microsiervos.com/index.xml\n");var win=new wsktbWindow();win.init();win.showNearTheMenu();var feedsUl=document.createElement("ul");var feedsList=GM_getValue(GMVarName).split("\n");for(feed in feedsList){var feedLi=document.createElement("li");var feedErase=document.createElement("a");with(feedErase){href="#";setAttribute("feedHref",feedsList[feed]);innerHTML="[x] ";addEventListener("click",function(){var newFeeds=GM_getValue(GMVarName).replace(this.getAttribute("feedHref")+"\n","");GM_setValue(GMVarName,newFeeds);alert("Feed removed");return false;},true);}
var feedLink=document.createElement("a");with(feedLink){href="#";setAttribute("feedHref",feedsList[feed]);innerHTML=feedsList[feed];addEventListener("click",function(){readFeed(this.getAttribute("feedHref"));return false;},true);}
feedLi.appendChild(feedErase);feedLi.appendChild(feedLink);feedsUl.appendChild(feedLi);}
win.addObjectContent(document.createTextNode("Your feeds"));var inputFeed=document.createElement("input");var buttonAddFeed=document.createElement("button");with(buttonAddFeed){innerHTML="Add Feed";addEventListener("click",function(){if(GM_getValue(GMVarName).search(inputFeed.value)>-1)
{inputFeed.value="This rss is already on the list";return false;}
GM_setValue(GMVarName,GM_getValue(GMVarName)+"\n"+inputFeed.value);inputFeed.value="";var feedLi=document.createElement("li");var feedLink=document.createElement("a");with(feedLink){href="#";setAttribute("feedHref",inputFeed.value);innerHTML=inputFeed.value;addEventListener("click",function(){readFeed(this.getAttribute("feedHref"));return false;},true);}
feedLi.appendChild(feedLink);feedsUl.appendChild(feedLi);},true);}
win.addObjectContent(inputFeed);win.addObjectContent(buttonAddFeed);win.addObjectContent(feedsUl);}
var buttonTitle="Show feeds.";var initFunction=null
var configFunction=null
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction,null,this.id);}},{id:-3,name:"LOCAL WEATHER",sourcecode:function()
{var imgSRC="data:image/gif;base64,"
+"R0lGODlhIwAjAMQAAOViNOrskGxsa+rNLs7O0O/sUQ8ODeOhj+fsz4eHiK+xsejJwOqlLuWIaubp"
+"5/j491RSSo1+UePr8PLx7Nzj65qbnT42GcXDuDMzNPvn4JZ9F9bY2eLc2fPuHv///+Pt9yH/C05F"
+"VFNDQVBFMi4wAwEAAAAh/h1CdWlsdCB3aXRoIEdJRiBNb3ZpZSBHZWFyIDIuNgAh+QQEGQAAACwA"
+"AAAAIwAjAAAF/uAnjmQpImaqrstZjJy0zqfINdSHdOiHnz0aqYC6HT6BTkCyALhkwiHxAwBwkoVF"
+"41d4RTkxXYdYbRQ6nQOgwTkvP4vcyihCFxpVdKd85kkOBy0zTQ0LfQMADHoMAAN2WgBHKQhBeI16"
+"A45oA4qbZVAmCAEFAQhNeYuZDJ1oVQBxo1MkCH0FiACbDIEeGQcNmokDtUElfZucCw8XEcwCBAsM"
+"mnqyJmDGHQwLCBEWAhUVAgYVHKxjRWEfN2tbjhoWEBcaGBce9Q8JGAoH0R0DlluCRKhxJU+AAAsG"
+"FNizFw6DBQsRXEVCB0ONPAIPHihQuLAehwQKNlTAAKFBoFCj/vpZ4Nix5cILGCKQKkXJwSFuGDa4"
+"dABmA4WW4SJomkIpAAYM3jIunKDgqNMEDl5COHqB2AcBOe1N2OoBgYV8DiZwqGBAgFJ7G6aWoIAh"
+"gb0FCFdO5dCRLMiNdD1sMABqwQELbj1cKFshgYGELsMZwLC4wgMOBtjAwDfOQGC99HZWIMATgjis"
+"EuSIoID1ncvTHcMJuBDqgufLqE87MABPtI6G82LrVgzBwQi7uoPXI6Cg7AiSwpN7IHvcrPLge0dM"
+"Pfv8dPERgzEQ2GCwer0KIYsLINH0MOPx9RwYxKg3AQTHDA8fhrChxIaNBMgixWoewlTatBX22kYh"
+"0UAAVkgpEZAfBN5ccMFITikQBQ1WCRECACH5BAQZAAAALAAAAAAjACMAAAX+4CeOZGmeaDoG47Gq"
+"cNk5IjDOceqKXfEtgMWngPvscq0Gr4M4AA6IDq5xhLFEQKW00AA0iLOuUHRNda4Ar7STBqy7Nkeg"
+"mJoXEPD1ADBYpxsIRGUqYAVpax19fgCFNCgHB0JRawx9AwyYlgyICD+QJhRwX4gMDQsZHhkLDZtr"
+"XH8UKHBuUgwLDxcRugIEC61sfzBwmwwZCBEWAhUVAgYVGcTBJnOIUhoWEBcaGBce3g8JGAoHGr+I"
+"g2DWGAICFgYK39/NGBgWEYo9jiSBHdsEDw8UwIvnjUMCBRsqYIBQ4M6JBQe6WBhIsGK8CxgiUBkj"
+"wkmaCAYwbLDogINJChXmm0VoU4UAPWUA401QQK9mAgcXIdC7YEKAyG8TgnpAYEGcgwkcKhgQEPPb"
+"Bp0mLCT4tsDdRJ0cCCo9KDCrhw0G9M2R6u3C0goJDLyz2CxkyAoPOBg4QyJcBblTvRHoRrICgZIQ"
+"nPkE5RObxcMEmwngWYLCAXd5ESN2YCBbLBLzuEne3BaCvq2bQ+tVsHTEQtGoPSg1zTR1aLAjdDZ1"
+"fZj0CLMYCGxgR9tbBYSkBZCgqRZDaW8O2P37mgACXHlq1ULYUGKDQAJK1/ksDkFn5cpoA3NFCIOA"
+"z3UKsENQdiGAwpoKkMjPEQIAOw=="
var buttonINNERHTML="Weather";var buttonFunction=function(ev){var win=new wsktbWindow();win.init();win.showNearTheMenu();win.setHtmlContent("working...");HTTPRequest("http://www.netvibes.com/modules/weather/location.php",function(response)
{var location=eval('('+response+')');HTTPRequest("http://www.rssweather.com/rss.php?config=&forecast=zandh&place="+location.city+"&state=&zipcode=&country="+location.countryCode+"&county=&zone=legt&alt=rss20a",function(response){GM_log(response);var parser=new DOMParser();var dom=parser.parseFromString(response,"application/xml");var rootNode=dom.documentElement;var r=rootNode.getElementsByTagName("channel");var entrys=r[0].getElementsByTagName("item");var entrysNum=entrys.length;var entryTitle='';var entryDesc='';var entryLink='';var entryDate='';var entryContent='';var content='';for(var i=0;i<entrysNum;i++){entryTitle=entrys[i].getElementsByTagName("title")[0].firstChild.nodeValue;entryDesc=entrys[i].getElementsByTagName("description")[0].firstChild.nodeValue;entryLink=entrys[i].getElementsByTagName("link")[0].firstChild.nodeValue;entryDate=entrys[i].getElementsByTagName("pubDate")[0].firstChild.nodeValue;content+='<h3><a href="'+entryLink+'" target="_blank">'+entryTitle+'</a><h5>'+entryDate+'</h5>';}
win.setHtmlContent(content);});});}
var buttonTitle="Show local weather.";var initFunction=null
var configFunction=null
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction,null,this.id);}},{id:-2,name:"MYTEMPDIR",sourcecode:function()
{var imgSRC="data:image/png;base64,"
+"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";var buttonINNERHTML="Mytempdir upload";var buttonFunction=function(ev){var win=new wsktbWindow();win.init();win.showNearTheMenu();var form=document.createElement("form");with(form){method="post";action="http://www.mytempdir.com/upload.php";enctype="multipart/form-data";target="_blank";}
var inputfile=document.createElement("input");with(inputfile){type="file";name="ufile";size="15";}
var inputfield=document.createElement("input");with(inputfield){type="hidden";name="upload";value="Host it";}
var inputsubmit=document.createElement("input");with(inputsubmit){type="button";value="Host it";}
inputsubmit.addEventListener("click",function(){if(inputfile.value=="")
{alert("select a file first...");}
else
form.submit();},true);form.appendChild(document.createTextNode("Upload form:"));form.appendChild(inputfile);form.appendChild(inputfield);form.appendChild(inputsubmit);win.addObjectContent(form);}
var buttonTitle="Upload any file directly to mytempdir free file hosting service.";var initFunction=null
var configFunction=null
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction,null,this.id);}},{id:-2,name:"IMAGESHACK",sourcecode:function()
{var imgSRC="data:image/gif;base64,"
+"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";var buttonINNERHTML="Imageshack upload";var buttonFunction=function(ev){var win=new wsktbWindow();win.init();win.showNearTheMenu();var form=document.createElement("form");with(form){method="post";action="http://www.imageshack.us/index.php";enctype="multipart/form-data";target="_blank";}
var inputfile=document.createElement("input");with(inputfile){type="file";name="fileupload";size="15";}
var inputsubmit=document.createElement("input");with(inputsubmit){type="button";value="host it!";}
inputsubmit.addEventListener("click",function(){if(inputfile.value=="")
{alert("select a image first...");}
else
form.submit();},true);form.appendChild(document.createTextNode("Upload form:"));form.appendChild(inputfile);form.appendChild(inputsubmit);win.addObjectContent(form);}
var buttonTitle="Upload image directly to imageshack free image hosting service.";var initFunction=null
var configFunction=null
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction,null,this.id);}},{id:-1,name:"CURRENT WEB SCRIPTS",sourcecode:function()
{var imgSRC=""
var swInit=false;var buttonINNERHTML="Current web scripts";var buttonFunction=function(ev){var win=new wsktbWindow();win.init();if(!swInit)win.showNearTheMenu();win.setHtmlContent("working...");var domain;if(!selection)
domain=location.host;else
domain=location.host;HTTPRequest("http://userscripts.wsktoolbar.com/script_seeker.php?host="+domain,function(response){win.setHtmlContent("");var lines=response.split('\n');var scriptList=document.createElement("ul");for(var line in lines)
{if(lines[line].match(".*<li>(.*)<br>(.*)<br>(.*)<\/li>.*"))
{var script=document.createElement("li");var installLink=document.createElement("a");installLink.href="http://userscripts.org/scripts/source/"+RegExp.$1+".user.js"
installLink.innerHTML="[Install] "+RegExp.$2;var descriptionText=document.createElement("font");descriptionText.size="-2";descriptionText.innerHTML=RegExp.$3;var executeButton=document.createElement("button");executeButton.id=RegExp.$1;executeButton.innerHTML="Execute script";executeButton.addEventListener("click",function(){HTTPRequest("http://userscripts.org/scripts/source/"+this.id+".user.js",function(response){try{eval(response);alert("Script executed");}
catch(e){alert("Error on script: "+e);}});},true);script.appendChild(installLink);script.appendChild(document.createElement("br"));script.appendChild(executeButton);script.appendChild(descriptionText);scriptList.appendChild(script);}}
if(!response.match(/no script found/i)){win.addObjectContent(scriptList);if(swInit)
win.showNearTheMenu();}
else
win.setHtmlContent(response);swInit=false;});}
var buttonTitle="[ALT + w + q] Displays a list with scripts for the current web.";var GMVarName="CurrentWebScripts";var initFunction=function(){if(GM_getValue(GMVarName)==null)
GM_setValue(GMVarName,false);if(GM_getValue(GMVarName))
{swInit=true;buttonFunction();}}
var configFunction=function()
{return configBookmarletCheckbox(GMVarName,"Check: autoExecute. Uncheck: dont");}
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction,"q",this.id);}},{id:0,name:"SEARCH MASH BUTTON",sourcecode:function()
{var imgSRC="data:image/gif;base64,"
+"R0lGODlhIQAQAKEBAAAAAP///2Zmmf///yH+FUNyZWF0ZWQgd2l0aCBUaGUgR0lNUAAh+QQBAAAD"
+"ACwAAAAAIQAQAAACSISPCSPtD4Wah8XbKLU46sl1DzKU5mk+pRqS6Buujpx9SYyPNsn2zs6b5X5A"
+"w7BBE8BQQeRRuTQ1ob5a8ZksGqtU4pWb1WJDBQA7";var GMVarName="SearchMash";var buttonINNERHTML="SearchMash";var buttonFunction=function(ev){buttonSearchBookmarklet(GMVarName,'http://www.searchmash.com/search/','');}
var buttonTitle="Search with SearchMash. Experimental interface of Google.";var initFunction=null
var configFunction=function()
{return configBookmarletSelect(GMVarName,"-- SearchMash options --");}
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction,null,this.id);}},{id:0,name:"GOOGLE SEARCH BUTTON",sourcecode:function()
{var imgSRC="data:image/png;base64,"+"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAFXRFWHRDcmVhdGlvbiBUaW1lAAfU"+"BgUSKwBBNpgMAAAAB3RJTUUH1AYFETsmDr5SiQAAAAlwSFlzAAAK8AAACvABQqw0mAAAApRJREFU"+"eNqNUUtoE1EUvfPLzGTapE0btZp+rBS12CpKbUH8IOhGbQXRhe3KIgiiC+1WUNGdC9FuulIQEcGN"+"ulCkgh8sGEw/aelHa0u0pk2m+XVmMvNmmrm+yV7wLB7vPs55595zGbF/pefMhTXIiWbE9eWLghJy"+"UpYrAV+dg7VajphMpeAUEpwQdHmg2N07W7RVRHQM08XfKUQLcamIicVVDTGft2iJBqJtYYF8a2/m"+"k0wDK8gEoOiXUlrk2Yv0fHQkGmeLVjjNq22t4qGTnaf3Mh1bOcXVWGsBwv1jLloZLH408PhAtGbf"+"u58qUh8Ken6dwUjXvZ17BrJZRA0nqkRo6ovSTqjvxbuz2zqG0gRpabs5LPdGEZvXovEpndKJFt8R"+"hPpLy4aDt4YWNx54ODlHTI+XzKNpYcIjGejYnozeS5iKtQLP5xmWhyzjF0rNuyI+BDpOQCSSLjZ4"+"maBREhQODA5slmxw0wHW52RNgNdT49C87vrTlMMQBUpQAVBBtYxP9HT0oQQsCfE8mwkotOYzIcgh"+"6wSZgouioftpaoAiQb/rqUCRAcFNEKmeFUt5ASBSU7U0lyTMOgRlsqbQ76kmDe7IvBpX7YkkxKZk"+"V6wqcBOsyEoMqF37HeC23xmczILJBIAOooDxfUy60jd64sjLs91vhocXqI/C1EHjORoMLhNsav8S"+"DD0ankETnXIuGW/9No7/wXDjzSfPYzTu0do61paXEIxq368Pbzvrald7Dj99cH9hxYaS4suDrgmw"+"mHFUfVqsNOiokqIz4cvxucE2uRxFxoTrN95/fjVJxGoQWriAbakVwU2pY0eN29dObZHleFMDdPZO"+"0/1QO/wHjHKD3tp1/UfLZl44f/XgJ/hPPDaSfwEp3572qK81oAAAAABJRU5ErkJggg==";var GMVarName="GoogleSearch";var buttonINNERHTML="Google";var buttonFunction=function(ev){buttonSearchBookmarklet(GMVarName,'http://www.google.com/search?client=googlet&q=','');}
var buttonTitle="[ALT+w+s] Search with Google";var initFunction=null
var configFunction=function()
{return configBookmarletSelect(GMVarName,"-- Google options --");}
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction,"s",this.id);}},{id:1,name:"DOGPILE MULTISEARCH",sourcecode:function()
{var imgSRC="data:image/gif;base64,"
+"/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIf"
+"IiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7"
+"Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAQABADASIA"
+"AhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQQH/8QAIhAAAgIBBAIDAQAAAAAAAAAAAQIDBAUA"
+"ERIxIUEGE2Ek/8QAFAEBAAAAAAAAAAAAAAAAAAAABP/EABsRAAEEAwAAAAAAAAAAAAAAAAIAERLw"
+"ARNR/9oADAMBAAIRAxEAPwDRs5k7de7DVhhkR3cGFgy8Z9huyt7VQPJP5o7BXimRpVCf5yrGB4S6"
+"o4ccxyV/J6bY+Oxq/wCWYyzaWpeqRmWSm7c4l23kjYcWA397dHRmFxtifPwSn7Wq1E5fdJAYSz8Q"
+"qoF36VR37Jb800MBqevbw5Smv//Z";var buttonINNERHTML="DogPile MultiSearch";var buttonTitle="[ALT+w+x] Search on Google, MSN, Yahoo Ask.com and more. Just one click.";var GMVarName="DogPileMultiSearch";var buttonFunction=function(ev){buttonSearchBookmarklet(GMVarName,'http://www.dogpile.com/info.dogpl/search/web/','/1/-/1/-/-/-/1/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/417/top/-/-/-/0')}
var initFunction=null
var configFunction=function()
{return configBookmarletSelect(GMVarName,"-- DogPile options --");}
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction,"x",this.id);}},{id:2,name:"DELICIOUS BOOKMARKS",sourcecode:function()
{var imgSRC="data:image/gif;base64,"
+"R0lGODlhCgAKAPcAAAAAAAAA/93d3f///wAAgIAAgACAgICAgMDAwP8AAAD/AP//AAAA//8A/wD/"
+"/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
+"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMwAAZgAAmQAAzAAA/wAzAAAzMwAzZgAzmQAzzAAz/wBm"
+"AABmMwBmZgBmmQBmzABm/wCZAACZMwCZZgCZmQCZzACZ/wDMAADMMwDMZgDMmQDMzADM/wD/AAD/"
+"MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMzADMzMzMzZjMzmTMzzDMz/zNmADNmMzNm"
+"ZjNmmTNmzDNm/zOZADOZMzOZZjOZmTOZzDOZ/zPMADPMMzPMZjPMmTPMzDPM/zP/ADP/MzP/ZjP/"
+"mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YzAGYzM2YzZmYzmWYzzGYz/2ZmAGZmM2ZmZmZmmWZm"
+"zGZm/2aZAGaZM2aZZmaZmWaZzGaZ/2bMAGbMM2bMZmbMmWbMzGbM/2b/AGb/M2b/Zmb/mWb/zGb/"
+"/5kAAJkAM5kAZpkAmZkAzJkA/5kzAJkzM5kzZpkzmZkzzJkz/5lmAJlmM5lmZplmmZlmzJlm/5mZ"
+"AJmZM5mZZpmZmZmZzJmZ/5nMAJnMM5nMZpnMmZnMzJnM/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwA"
+"M8wAZswAmcwAzMwA/8wzAMwzM8wzZswzmcwzzMwz/8xmAMxmM8xmZsxmmcxmzMxm/8yZAMyZM8yZ"
+"ZsyZmcyZzMyZ/8zMAMzMM8zMZszMmczMzMzM/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8A"
+"mf8AzP8A//8zAP8zM/8zZv8zmf8zzP8z//9mAP9mM/9mZv9mmf9mzP9m//+ZAP+ZM/+ZZv+Zmf+Z"
+"zP+Z///MAP/MM//MZv/Mmf/MzP/M////AP//M///Zv//mf//zAAAACH5BAEAABAALAAAAAAKAAoA"
+"AAgrAAcIFBigYMGBBA0GQDhA4UKEDhk6BECRooCLFytaxChAIwCOHTWC9AgyIAA7";var GMVarName="WSKTBdelicious";var buttonINNERHTML="Delicious Similar webs";var buttonFunction=function(ev){var win=new wsktbWindow();win.init();win.showNearTheMenu();win.setHtmlContent("working...");HTTPRequest("http://www.stumbleupon.com/url/"+location.host,function(response){win.setHtmlContent("");var tagsLine=response.match(/Top Tags:<\/span> (<a href=\"\/tag\/.*\/\">.+<\/a>)+/i);var tags=tagsLine[1].split(', ')
var tag=new Array()
for(tagIndex in tags)
{var tempTag=tags[tagIndex].match(/.*<a href=\"\/tag\/.*\/\">(.*)<\/a>.*/i)[1];if(tempTag)
tag.push(tempTag)}
var tagsjoined;if(tag.length<2)
{var tagsLine="";try{var tagsLine=document.getElementsByTagName('head')[0].innerHTML.match(/<META NAME=(?:'|\")Keywords(?:'|\") CONTENT=(?:'|\")(.*)(?:'|\")>/i)[1];}catch(e){}
if(tagsLine)
{var tagKeyword=tagsLine.replace(' ','').split(',');debugMsg(tagKeyword);if(tagKeyword.length&&tag.length)
{var tagsjoined=tag[0]+"+"+tagKeyword[0];}
if(!tag.length&&tagKeyword.length)
{tagsjoined=tagKeyword[0]
try{if(tag[1])
tagsjoined+="+"+tagKeyword[1];}catch(e){}}}
else{if(!tag.length&&!tagKeyword.length)
{win.addHtmlContent("No tags, so we stop...<br>\n");return;}
tagsjoined=tag[0]}}
else
{tagsjoined=tag[0]+"+"+tag[1];}
debugMsg('tagsjoined: '+tagsjoined);var tag1=tagsjoined.split('+')[0]
try
{var tag2=(tag.length>1||tagKeyword.length)?tagsjoined.split('+')[1]:''}catch(e){var tag2=""}
win.addHtmlContent("tags for "+location.host+": "+"<a href='http://del.icio.us/tag/"+tag1+"'>"+tag1+"</a> "+" <a href='http://del.icio.us/tag/"+tag2+"'>"+tag2+"</a> "+"<a href='http://del.icio.us/tag/"+tag[1]+"'>"+((tag.length>2)?tag[1]:'')+"</a> "+"<a href='http://del.icio.us/tag/"+tag[2]+"'>"+((tag.length>3)?tag[2]:'')+"</a><br>\n");HTTPRequest("http://del.icio.us/rss/tag/"+tagsjoined,function(response){var parser=new DOMParser();var dom=parser.parseFromString(response,"application/xml");var itemList=dom.getElementsByTagName('item');win.addHtmlContent("Nº de links: "+itemList.length+"<br>");win.addHtmlContent("<ul>");for(var item=0;item<itemList.length;item++)
{var bookmark=itemList[item];var title=bookmark.getElementsByTagName("title")[0].firstChild.nodeValue;var link=bookmark.getElementsByTagName("link")[0].firstChild.nodeValue;try{var description=bookmark.getElementsByTagName("description")[0].firstChild.nodeValue;}catch(e){var description=""}
win.addHtmlContent("<li><a href='"+link+"' title='"+description+"'>"+title+"</a></li>");}
win.addHtmlContent("</ul>");});});}
var buttonTitle="[ALT+w+d] Show you a list of webs tagged similar as the current site";var initFunction=null
var configFunction=null
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction,"d",this.id);}},{id:3,name:"EMAIL A NOTE",sourcecode:function()
{var imgSRC="data:image/gif;base64,"
+"/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0a"
+"HBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIy"
+"MjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAPABQDASIA"
+"AhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAQGBQf/xAAoEAABAwMEAQIHAAAAAAAAAAABAgME"
+"BREhABITMQYUQSJRUnGBobH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAA"
+"AAAAAP/aAAwDAQACEQMRAD8A6bTIMGjUWBJfhxV0xyM0pxa2kkxlFIuokjKCe/p+3WxPbpUThaap"
+"sN6XIuGGQ2kb7dqJthIxc/0kAz1FrtLqFMpzk2XthsMNhqPxqPIoJA3rxbBGE/k5tZ9UrxbiUlmQ"
+"WXLgtuoQ5uaIvbYSDtAufhGMkWsToJvyjx2A3UWfVRYz76mApa+IJF9ysJHsB0P3c50aS8o8xpya"
+"k03NkDnQyElbTStqxuVZQBFxf5exv33o0H//2Q==";var GMVarName="emailAnote";var buttonINNERHTML="Email a note";var buttonFunction=function(ev){var win=new wsktbWindow();win.init();win.showNearTheMenu();var form=document.createElement("div");var inputMyEmail=document.createElement("input");inputMyEmail.type="text";inputMyEmail.name="my_email";inputMyEmail.value="";var textareaNote=document.createElement("textarea");textareaNote.name="ENOTE_FOR_YOU";textareaNote.cols="25";textareaNote.rows="5";textareaNote.value=selection?unescape(selection):location.href;function submit(){var params='my_email='+escape(inputMyEmail.value)+'&ENOTE_FOR_YOU='+escape(textareaNote.value)+'&subject=Enote for you...';GM_xmlhttpRequest({method:"POST",url:"http://www.powweb.com/scripts/formemail.bml?",headers:{'Content-type':'application/x-www-form-urlencoded','referer':'http://blog.wsktoolbar.com/index.php',},data:params,onload:function(details)
{if(details.readyState==4){if(details.status!=200){return;}
if(details.responseText.match(/The form has been submitted successfully/i))
win.addHtmlContent("Note sended correctly");else
win.addHtmlContent("Error sending the note, look at empty fields.");}}});}
var buttonSubmit=document.createElement("button");buttonSubmit.innerHTML="Submit Now";buttonSubmit.addEventListener("click",submit,true);with(form){appendChild(document.createTextNode('Destiny email: '))
appendChild(inputMyEmail);appendChild(document.createElement('br'));appendChild(document.createTextNode('Note: '))
appendChild(document.createElement('br'));appendChild(textareaNote);appendChild(document.createElement('br'));appendChild(buttonSubmit);}
win.addObjectContent(form);}
var buttonTitle="Email a note easily to you or someone";var initFunction=null
var configFunction=null
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction,null,this.id);}},{id:4,name:"STICKY NOTES",sourcecode:function()
{var imgSRC="data:image/jpg;base64,"
+"/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIf"
+"IiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7"
+"Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAVABwDASIA"
+"AhEBAxEB/8QAGQAAAwADAAAAAAAAAAAAAAAAAAUGAgME/8QALBAAAQMCBAQEBwAAAAAAAAAAAgED"
+"BAAFERITUiIyQmIGFDGCFSMkQWFxkv/EABcBAAMBAAAAAAAAAAAAAAAAAAABAgP/xAAcEQACAgID"
+"AAAAAAAAAAAAAAAAAREhAgMSMUH/2gAMAwEAAhEDEQA/ALy9XC4wZ8v64mmQji9HabjiROdJDmLu"
+"y/1TJ6Hcm2DJm5ynnm+IRJtsRLt5azvUJ56OEqIIrMiFqsYpzbh9w8NcF3voM2Bu4xAceWSQiCA3"
+"mcH27h27qTqx1ECrxTc5t4YiW2wqOrKLiIundmTaPV3ZasLfG8nAZjK849pDl1HOY/ytStmjP2c/"
+"ictvN5ocrgjxFDHpTu7u6q4HBdbFxpRMCTFCRfWo18njOXY2/EbakbxNOwTWyjCJt3Jw0Jo04QcH"
+"HE0w3fdKKK0JGh2XWaI7lLcmIOPycNNpP0A+vuUqaAIsALQCiCCYIlFFAH//2Q=="
var GMVarName="WSKTBnotes";var GMVarNumber="WSKTBnotesLength";var wins=new Array();var textareaNote=new Array();var notesLength=0;var buttonINNERHTML="Create Note";var buttonFunction=function(ev){var noteNumber=0;var x;var sw=false;for(x=0;x<notesLength;x++)
{if(GM_getValue(GMVarName+x)=="")
{sw=true;break}}
noteNumber=x;wins[x]=new wsktbWindow();wins[x].init();var textareaNote=document.createElement("textarea");with(textareaNote)
{id="textareaNote";cols="10";rows="10";style.width="210px";style.border="1px solid";innerHTML="Enter here your note..";}
GM_setValue(GMVarNumber,(noteNumber+1));textareaNote.addEventListener('keyup',function(){GM_setValue(GMVarName+noteNumber,this.value);},false);wins[x].addObjectContent(textareaNote);wins[x].addObjectContent(document.createTextNode("It has autosave"));wins[x].showNearTheMenu();}
var buttonTitle="Set and save notes on posits";var createNotes=function(){if(notesLength)
{for(var x=0;x<notesLength;x++){var note=GM_getValue(GMVarName+x);if(!note)
continue;wins[x]=new wsktbWindow();wins[x].init();textareaNote[x]=document.createElement("textarea");with(textareaNote[x])
{id=GMVarName+x;cols="10";rows="10";style.width="210px";style.border="1px solid";innerHTML=unescape(note);addEventListener('keyup',function(){GM_setValue(this.id,this.value);},false);}
wins[x].addObjectContent(textareaNote[x]);wins[x].addObjectContent(document.createTextNode("It has autosave"));}}}
var initFunction=function(){notesLength=GM_getValue(GMVarNumber);if(!notesLength){notesLength=0;GM_setValue(GMVarNumber,0);}
createNotes();if(GM_getValue("WSKTBPositsShow"))
{for(i in wins){if(wins[i]!=null)
wins[i].showNearTheMenu();}}
else
GM_setValue("WSKTBPositsShow",false)}
var configFunction=function()
{return configBookmarletCheckbox("WSKTBPositsShow","UNChecked: Autohide - Checked: Autoshow");}
var temp=bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction);var anotherbutton=document.createElement("button");with(anotherbutton)
{innerHTML="Show/Hide";style.margin="1px 1px 1px 1px";style.textAlign="center";style.backgroundColor="#eee";style.border="1px solid #ccc";style.color="#5454dc";title="Show/Hide the notes";swVisible=false;addEventListener('mouseup',function(){if(!this.swVisible)
{this.swVisible=true;for(temp in wins){if(wins[temp]!=null)
wins[temp].show();}}
else
{this.swVisible=false;for(temp in wins){if(wins[temp]!=null)
wins[temp].hide();}}},false);}
temp.appendChild(anotherbutton);return temp;}},{id:5,name:"ACCESS BAR PRO",sourcecode:function()
{var imgSRC="data:image/gif;base64,"
+"/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIf"
+"IiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7"
+"Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAUABQDASIA"
+"AhEBAxEB/8QAGQABAAIDAAAAAAAAAAAAAAAAAAQGAgMF/8QAKRAAAQMDAwIFBQAAAAAAAAAAAQID"
+"BAAFEQYSITFBEyJRYYEjMlJxof/EABYBAQEBAAAAAAAAAAAAAAAAAAMFB//EACARAAEEAgEFAAAA"
+"AAAAAAAAAAEAAhEhAxIxBEGx4fD/2gAMAwEAAhEDEQA/AImhGLbKulxN0hqmpYhreQyMknBGcDuc"
+"Hiq5Kjyo6ytyLJjtKUdgdSocdhk9TirXZLsdLaZZu8SE3IckzXWpK1EgpAT5E5H25yT8V0Y8867g"
+"vR5Vq8FAy3FkqluObJBSSkYUcchJB/Y9a0A58mLM/KWyyhM8RRr6VI0DmBs2qGwtWw+Y9fWlTHbJ"
+"dLftbmwXmHFp3hK0846Z/hpVDdjrBCDUjsttsvEyyLeRHLbrD5w7HfQHG3MdMpPf3rOfqG43FTH1"
+"ExG4q97DMRAaQ2r8gB396UoTjYeokgcevCTY6cqIC5JUp19911xR5WtZUT8mlKUxqgjX/9k=";var GMVarName="";var buttonINNERHTML="Access Bar Pro";var buttonFunction=function(ev){runRemoteScript("http://wsktoolbar.com/wsktb_integrated_accessbarpro.user.js");}
var buttonTitle="Displays all the accesskeys of the current website. Mark Pilgrim script.";var initFunction=null
var configFunction=null
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction);}},{id:5,name:"BOOK BURRO",sourcecode:function()
{var imgSRC="data:image/gif;base64,"
+"/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIf"
+"IiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7"
+"Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAgACADASIA"
+"AhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAABQYHBAH/xAAnEAACAQQBBAICAwEAAAAAAAABAgME"
+"BRESEwAGFCEiMTJBByRCcf/EABYBAQEBAAAAAAAAAAAAAAAAAAABA//EABgRAQADAQAAAAAAAAAA"
+"AAAAAAABAhES/9oADAMBAAIRAxEAPwBt707zS33ilsEcviwznFbcOZYxACjMsYbOVdtRk+iqspHt"
+"lIV6C9wWXuIXa3WinUePLBI1XOYZagu8bcjEI7N+H+/lljkAj2D7wuFfW9yXaroYjETXSQmSYjSH"
+"jXhZwfX2sWSx+s6jPyJ6trSmn38T+8gDaXikZ1cE5+UUq+lYqRsgBGDg+iOrrSL5TnDhau9O8L++"
+"lkjt1cM4aYUEiwRn1+Uhnx6yCQuzYOQp6otF5Xgwedw+XxLz8GePfHy1z71znGfeOp5U/wAgdw1F"
+"TDDQU1sp5ZzxxQyCScM2CxJkzHqMAkjUn4nGSQvR6092TvwPWzUNbR1Mixx11CCoV2YIqlCz5BY6"
+"7B85YAqAC3UZpZFdKK+Vd3WP50s9fU8b+xyo8jMDg4K5D/8AetFQj1PcM18r6iJqueBYXZU05NQB"
+"uwyRsQqg6hV9fj76WbLahb6CCS8QSWxqxDPRVbnTmjJAIGRg4wDg/pwQMEE7ahLV40pN1hrXVS0c"
+"M1RGEZx7XOuuRn9E46BpsMQuN/jlSYLHbm3/AAJ5XZHUqDnA1BDH7zsPr9krxcIDQXGzxRLTTVsc"
+"lNRo44zVTSlkOoIAxuwy2f8AWxwpVmYqHsLtqps9BU2WSooleliC1dKFR6mMLlWkVkKljtksVDfr"
+"IGR0Vs/aFvtFUtYZqmuqkyI5qpweMEY+KqFQHGRtrthiM4OOg//Z";var GMVarName="BookBurro";var buttonINNERHTML="Book Burro";var buttonFunction=function(ev){runRemoteScript("http://wsktoolbar.com/wsktb_integrated_bookburro.user.js");}
var buttonTitle="Compare book prices with an isbn and BOOK BURRO";var initFunction=null
var configFunction=null
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction,null,this.id);}},{id:6,name:"BABEL MOUSISH",sourcecode:function()
{var imgSRC="data:image/gif;base64,"
+"/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIf"
+"IiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7"
+"Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAOABUDASIA"
+"AhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAYCAwT/xAAhEAACAQQCAwEBAAAAAAAAAAABAgME"
+"BRESAAYTIiMxIf/EABUBAQEAAAAAAAAAAAAAAAAAAAUG/8QAIBEAAQMCBwAAAAAAAAAAAAAAIQAB"
+"MRITAgMEERTw8f/aAAwDAQACEQMRAD8AZadrjf6WRLtcpZI4p5Yp6aICOMyqxR1yoBeH1IVHByGO"
+"+381nStD1NWudB8LfpG1ZSLEqQiMsdpl1UfRVySBklUVSuWRhTe7bVdGsT3hrpLW0tJLiWFo1BaJ"
+"2wHJ/XmMjKWcsoILHUH919XgPcrbDeJ3VLPUF9KHx+82rFT5WzjUsGygHsAMnDMnJ2xruZVUJYw2"
+"8OCPUg+LKs9lPPDhw5RI9f/Z";var buttonINNERHTML="Babel Mousish";var buttonTitle="Multilenguage translator. By cigno5.5";var buttonFunction=function(){if(!askForInput())return;selection=unescape(selection);runRemoteScript("http://wsktoolbar.com/wsktb_integrated_babelmousish.user.js");}
var initFunction=null;var configFunction=null;return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction,null,this.id);}},{id:6,name:"WORDREFERENCE DICTIONARY",sourcecode:function()
{var imgSRC="data:image/png;base64,"+"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAALHRFWHRDcmVhdGlvbiBUaW1lAFNh"+"dCAyNyBNYXIgMjAwNCAxNjo0NTowNCAtMDAwMPpag1gAAAAHdElNRQfUAxsQLwscKxxCAAAACXBI"+"WXMAAA7DAAAOwwHHb6hkAAAABGdBTUEAALGPC/xhBQAAAShJREFUeNpjDPK+zEAKYCJJNVSDpBRb"+"YKiInDw7REhUjBXIBSIgAyIClAJygcqgGmTl2GPiJdKypcTFQSokJNmAXCACMiAaFJU5gVygMqiG"+"q5e/7tj6VlOLm5ePBdMNMrLsYVFiQAVAZVANX7/+e/PmN0RaUJClsk5+1453QARkALkcHEwSEmxA"+"BUBlCE+/fvn7/bvfKmqczCyM7OxMf//8ByIgA8gFCgKlgApQQunIoY8Xz39JzZRiZ2dEdg+QCxQE"+"SgEVkBmsCF+uX/NGVZ0ru0Dm3t3v2za/BYqoa4K4OCPuyeOf3779Vdfg+vL577Onv4AIyABy79/7"+"Pm/WcxJi+s+f/5DwQXcSEJw7/fnp45+PH/2EcIF+fff298sXv5DVMNIl8ZEEAKgDf/ldYdQ8AAAA"+"AElFTkSuQmCC";var buttonINNERHTML="Wordreference";var buttonTitle="Dictionary english<->spanish";var buttonFunction=function(){if(!askForInput())return;var win=new wsktbWindow();win.init();win.showNearTheMenu();win.setHtmlContent("working...");HTTPRequest("http://www.wordreference.com/es/translation.asp?tranword="+selection+"&dict=enes&B=Buscar",function(response){var text_arr=response.split("\n");var reg_exp=/.*<span onclick=\'dr4sdgryt2\(event\)\'.*>(.*)<\/span>.*/i;for(var i=0;i<text_arr.length;i++){var arr=reg_exp.exec(text_arr[i]);if(arr){var meaning=arr[0].replace("\/images\/speaker5.png","http:\/\/www.wordreference.com\/images\speaker5.png");win.setHtmlContent(meaning)
break;}}
if(!meaning)
win.setHtmlContent("<b>Word not found!!</b>")});}
var initFunction=null;var configFunction=null;return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction,null,this.id);}},{id:7,name:"RAE DICTIONARY",sourcecode:function()
{var imgSRC="data:image/png;base64,"+"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABGdBTUEAALGPC/xhBQAAACR0RVh0"+"U29mdHdhcmUAQnkgRW1iZWxsaXNoLCBmcm9tIERhZGF3YXJlm4oXrgAAAxtJREFUeJwBEAPv/AGD"+"eGwACCaEhbdiYmUoBpj2Bx8UDQrl/g8zLivP0b4SEygVA/Td6dd/hQz/APn/AewBDQwm8/Q5GxkI"+"GxS8cWlG1tr5JC81AwMJLS4s+fj+ERMTrKmOHRsSJhoAUWHhfn0nBHt7X/X2FoeEmnFKDh8vWSAv"+"BQcJCdLQ0enp8vr487y8vvHx90dGS4R5WAQCRWpp2wECAHgCA8hyTwZed3Xh6e0B9wP9CQnj4Nwr"+"LSHU1OA6OywDAhT7+vYLAOmrmJKEpAUBAABKBAEb06Ia8CI3BgURtbWqCgkVHyEm1dXS/+3hDxIS"+"8AEPVlFF8/YEFvW8Ol22AoaDQQEF0ZmboNHR4/b3/hobKiMeCbmwu0dHSuPy/gQTHUtJTPj7CAkH"+"CdG6y+zqIwQvMAJHOxdMdGETFjLv8vUpKyyDcl/9DCICBPy1qqrw4+Q1NTrt7e8aGQrW6+RPSiQD"+"JSVAAfgB8vfmEhYdEhL8A/4N9v329ukGkKCYQjU3cn5/CgwMCAgI/PvxLCL0vswqA8jFCg/+6hwj"+"E/PByg0gL/8EBMejq0BbVfzZ3egB809DTff9+/vt6+DT2NvMvfQJCQLV12nP4wgQBfNcTkH4qpYH"+"BQb0BAO1oq3J39MA2uDr+vK4rJ3PV24iOBT2Avfz9S4CPTxw+fjI9vjc6RPxJQ0YJuLO4dbf/wPj"+"7O345Pz0wm+IMfz8+C4Dy8npWGxW/PzPA52aaKauFD47+unw/+K+t6qvsXRfSAjt3w3a6CQaEiEB"+"+AT6yuHzIytQI77CsDAvSAJDIUYkEt+8uODx9v7m7vIO8Q7Bqb5bgDo/Gikt2QVEbDMY2hXdCPv/"+"0sS3jQzKytMBAQFGwL9sQ0KuYzvIQxMd47LH9wYPIBoF9w/k6RAuwdTlFvL/Yo9X4fbz7/4QzM8C"+"AwMBKZ+g+nFvG8DW3woqGbzk5RAV/c76EvUCBOv5BPACDzpnT+D05oSG2dTE4j9EHgHb2qoqK44G"+"BOn6+zKEdyUB/+8V+AICAPX4ASDx+vH2ERIGAt/y9iLt7uinpbQeIA6NH3i0z91H3QAAAABJRU5E"+"rkJggg==";var buttonINNERHTML="Diccionario RAE";var buttonTitle="Diccionario de la Real Academia de la Lengua Española";var buttonFunction=function()
{if(!askForInput())return;var win=new wsktbWindow();win.init();win.showNearTheMenu();win.setHtmlContent("working...");HTTPRequest("http://buscon.rae.es/dpdI/SrvltGUIBusDPD?sourceid=Mozilla- search&clave="+selection+"&TIPO_BUS=3",function(response)
{if(response)
{win.setHtmlContent(response)}});}
var initFunction=null;var configFunction=null;return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction,null,this.id);}},{id:8,name:"WIKIPEDIA SPANISH",sourcecode:function()
{var imgSRC="data:image/png;base64,"+"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAAXNSR0IArs4c6QAAAARnQU1BAACx"+"jwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAADBQTFRF"+"AwMDGBgYKCgoOzs7R0dHWFhYampqe3t7g4ODmJiYqKiourq6x8fH2dnZ6Ojo/f39+KUYDwAAAHNJ"+"REFUGNNj+A8FDJiMrd6/3O+X3k1l+KH93+le579Mhr9i7yeuyf+Xz/A/8PwVjfW/1zP839j/k/X/"+"i/0M/7/4/jX5fx2o/QfXX6P9M0HmqL5Kzu8DMZqrrmv2gxiLtH4rnQcxvvj+TwLb9fv8/9tIlgIA"+"kqFlEUTMtR4AAAAASUVORK5CYII=";var buttonINNERHTML="Wikipedia spanish";var buttonTitle="Search on Wikipedia encyclopedia";var GMVarName="WikipediaEs";var buttonFunction=function()
{buttonSearchBookmarklet(GMVarName,'http://es.wikipedia.org/wiki/Especial:Search?search=','&go=Ir')}
var initFunction=null;var configFunction=function()
{return configBookmarletSelect(GMVarName,"-- Wikipedia spanish --");}
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction,null,this.id);}},{id:9,name:"WIKIPEDIA ENGLISH",sourcecode:function()
{var imgSRC="data:image/png;base64,"+"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAAXNSR0IArs4c6QAAAARnQU1BAACx"+"jwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAADBQTFRF"+"AwMDGBgYKCgoOzs7R0dHWFhYampqe3t7g4ODmJiYqKiourq6x8fH2dnZ6Ojo/f39+KUYDwAAAHNJ"+"REFUGNNj+A8FDJiMrd6/3O+X3k1l+KH93+le579Mhr9i7yeuyf+Xz/A/8PwVjfW/1zP839j/k/X/"+"i/0M/7/4/jX5fx2o/QfXX6P9M0HmqL5Kzu8DMZqrrmv2gxiLtH4rnQcxvvj+TwLb9fv8/9tIlgIA"+"kqFlEUTMtR4AAAAASUVORK5CYII=";var buttonINNERHTML="Wikipedia english";var buttonTitle="Search on Wikipedia encyclopedia";var GMVarName="WikipediaEn";var buttonFunction=function()
{buttonSearchBookmarklet(GMVarName,'http://en.wikipedia.org/wiki/Especial:Search?search=','&fulltext=Search')}
var initFunction=null;var configFunction=function()
{return configBookmarletSelect(GMVarName,"-- Wikipedia english --");}
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction,null,this.id);}},{id:10,name:"YOUTUBE",sourcecode:function()
{var imgSRC="data:image/png;base64,"+"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABgFBMVEUAAAAREREiIiIzMzNVVVV3"+"d3f/AAD/AgL/BQX/Cgr/Cwv/Dw//EBD/EhL/EhP/Fhb/GRn/HR3/Hh7/Hx7/IB7/IiL/Jib/Jyf/"+"KCj/Kyv/LCz/Li7/Ly//MTH/MzP/NDT/NTX/Njb/Nzf/ODj/PDz/PT3/QUH/RET/Skr/TU3/UVH/"+"Vlb/V1f/WVn/Wlr/W1v/XV3/YWH/Y2P/ZGT/ZWX/aWn/bm7/cHD/cnL/dnb/eXn/fHyIiIi7u7v/"+"goL/g4P/hYX/iIb/np7/oKD/oaH/oqL/paX/pqb/qan/qqr/rKz/rq7/r6//sLD/srL/s7P/t7f/"+"ubnMzMzd3d3/wsL/xsb/ycn/y8v/0dH/1NT/2Nj/2tr/3d3/3t7/39/u7u7/4OD/4uL/5ub/7+//"+"8vL/9vb/+/v////MzMwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADInFhEAAAAAWJLR0R/SL9x5QAAAAlwSFlzAAAASAAA"+"AEgARslrPgAAAMtJREFUGNNjSE9nAEIEYEgPZrBhCEYWSGdlYIlnYmBKZwhihAjEMwSlM8Uz2sIF"+"0mECNggBsBZmBgaoAApgSPcR4xORU1QWltZxDInwBAoIRKWni/OwpciwiQl5WAIF5DjSNTQ0FWL9"+"lHjdJVWBAvLsqeJJToEuyYHOiXHsIBVcaXKhDq5e+l4B0THcIAHOdPlwCzdfI/8wHStRoIAKZ7pc"+"ZLpbYLq3dXoCP1DAQEpNQlldWlZLmttEUA/kMHtTM0NdPT1tY3Mju/R0AINnQc0lHh9oAAAAAElF"+"TkSuQmCC";var buttonINNERHTML="Youtube videos";var buttonTitle="Search on Youtube videos";var GMVarName="YoutubeSearch";var buttonFunction=function()
{buttonSearchBookmarklet(GMVarName,'http://www.youtube.com/results?search_query=','&search=Search')}
var initFunction=null;var configFunction=function()
{return configBookmarletSelect(GMVarName,"-- YouTube --");}
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction,null,this.id);}},{id:11,name:"IMDB",sourcecode:function()
{var imgSRC="data:image/png;base64,"
+"/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIf"
+"IiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7"
+"Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAXACMDASIA"
+"AhEBAxEB/8QAGwABAAICAwAAAAAAAAAAAAAAAAUHAgYDBAj/xAArEAACAQMDAgUDBQAAAAAAAAAB"
+"AgMEBREABiESMRMjMkFRFHGRFSJhsdH/xAAYAQADAQEAAAAAAAAAAAAAAAABAgMEBf/EAB8RAAIC"
+"AgEFAAAAAAAAAAAAAAABAhEDIRMSMUFRYf/aAAwDAQACEQMRAD8Ak7pcqSCsu9Vd73VwX6Nqk0ME"
+"cxjSBYlzGqp1ASdYdTz6iDxwdbvbtxCa30j1qwQVcyqHhE44kK5Kj3z3476zvf6c81OZ0p5ahcvG"
+"GUM+B3K+4HPf+dVruXa16r62vnpKWQ+JXipp5EkTB6aUhTgnsXAXkf3rDPI+RwTqvOiqWrLOTcFH"
+"IUCTQMZDhAs6nq5xx88gj7g6PfYkMfl9SOcF1bIABwfbnHxqo4dnXSjqaCBLY7RUx6Enynlha7r6"
+"iS3HljPA5/OpXaFquNqkrfq6SamhkXpCSOApk8aViyoCcDpKDPHfUsk8kYuUcl18QUk3TRbUciyx"
+"rIhyrgMPsdNda1zRVFqpZYJUljaJcOjBgePkaa6S2iJ5rlqdrWvdVrmsd1vIt8XM87BBLESSD0cY"
+"7d+PzqXfeNvG6UiXct7NjMWWmMMXjB8Hj04xnHt/ummkeOMu6DbRlbd421tyVkdx3Lels6Lmkkji"
+"j8Rzxw/7Tj37D8a4Lbuu11qXOm3BuK/LTszLS/SxRAyR8+vg4J44GB35000OKHoPUzTYainjiCGe"
+"sGM8IwA7/GmmmqUKf//Z"
var GMVarName="IMDBSearch";var buttonINNERHTML="IMDB";var buttonFunction=function(ev){buttonSearchBookmarklet(GMVarName,'http://www.imdb.com/find?s=all&q=','')}
var buttonTitle="[ALT + w + i] Internet Movie Data Base";var initFunction=null
var configFunction=function()
{return configBookmarletSelect(GMVarName,"-- IMDB --");}
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction,"i");}},{id:12,name:"ACRONYMFINDER",sourcecode:function()
{var imgSRC="data:image/png;base64,"+"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABmJLR0QA/wD/AP+gvaeTAAAACXBI"+"WXMAAAsSAAALEgHS3X78AAAAB3RJTUUH0wYFDyMv/sTMtgAAAkxJREFUeJxFkk1vVGUYhq/7Pe+c"+"mQOtwBQCik0ssqCxkVKlsVMWGhddycKFO/0BuvBnuBASSNjAjpUhAdMNSetnKC1oE1JigrFdmIBi"+"cQZs/Wo7dM57szgQNk+ezZM7z31dyqaWhAAMejafbTYBLGNZBseTD+f2dx8JGYzAgv+zop03hzZ/"+"9/NrC7XzJjeax8qYp5inRr2s11OspVi72zd46aWpslYrG0UqdqRGkRpFWc9vDByLEsZJ6PKV7fur"+"tU8+DshOEsnmu2+0pxlCADYunC8vfh+r0LR3n95+x3+vdz7N95c9Icy2Qnbo1YWrVzsry0J9t27t"+"sKMAYGx063E37m5uHR5KyyvIwcYOQetXLg/MfiWxz/pn9+ux+satyeVrc3sPDnqy5V9WAEsGrJdj"+"PFqrZaCyt4iDkLFbk2sL81s/3qxPTGzLVV8BEn7t3LmwtNQ9c6ZnZKKhVxQaHa1d+qK/8+fOqY/+"+"IwOMKyTXpqcf3fm5ce/eu8giGnN0VH1946c+D4QQs/XBF9V+XPUv6M3ODM1+3W8KIacgoDX+6+Li"+"Z0eGTw8P/9tu+83jVFQNcIBwHI1IDWRlAeS3Jjrz1z94sPrh6h/dH27G1okeRgE5WdhBBhIIh14I"+"nc3uw5mZQ2QHyTa+nG4rbajyRL/Nz22s/SWjp4JI1wfGyvWfchiXA+Eu3HY6XBxYfmHkvfa3C9CP"+"xwgVrsVdI3r/jbPN7prl3DZKOMFWtrOT73ll874xOBAqvO28qTh1+6nRleEYYaSqVWEMFUUsngBv"+"fhJObc2fFgAAAABJRU5ErkJggg==";var buttonINNERHTML="AcronymFinder";var buttonTitle="Search any acronym";var GMVarName="AcronymFinder";var buttonFunction=function()
{buttonSearchBookmarklet(GMVarName,'http://www.acronymfinder.com/af-query.asp?Acronym=','&Find=find&string=exact')}
var initFunction=null;var configFunction=function()
{return configBookmarletSelect(GMVarName,"-- AcronymFinder --");}
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction);}},{id:13,name:"ASTALAVISTA",sourcecode:function()
{var imgSRC="data:image/png;base64,"+"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBI"+"WXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QUdAiovI4oCEQAAAHFJREFUOMulk1EOwCAIQwvZ/a/M"+"foYZBEiJfBn01dKomJnhKxEBAPxabflZzY28nuAjUN3cieT+ceDwZL8SVYd8s8uhcxQcbOEg4OAE"+"V+Mpm3aXjd7AAPAwadMZMI9oFNjCYQR25vIlsnA5wg1c/oVtvcC/Nzie31LnAAAAAElFTkSuQmCC";var buttonINNERHTML="Astalavista";var buttonTitle="Serials and Cracks Searcher";var GMVarName="Astalavista";var buttonFunction=function()
{buttonSearchBookmarklet(GMVarName,'http://astalavista.box.sk/cgi-bin/robot?srch=','&submit=+search+')}
var initFunction=null;var configFunction=function()
{return configBookmarletSelect(GMVarName,"-- Astalavista --");}
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction);}},{id:14,name:"URBANDICTIONARY",sourcecode:function()
{var imgSRC="data:image/png;base64,"+"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAARnQU1BAACx"+"jwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAMZJREFU"+"OE+VUTESgjAQjE+h9Am2lpR+wyfY+gRKvmBJSUtJSYnllaHTTjfszCWeBIabm0wu2d3sXQ711Wm8"+"xU0SquO58NMzXqQ7EDTvJ8esLvEwBQR13ClCCbjAOdMSDIhkqjCzBEJ1zdkLAkYyfWTBEglcjepi"+"6xFEu/+W1npQAjdj34bsapSPWyFD48c+OiFIJwM/nzmAI+HlBeXP1EwPhsAy+6NQ3X7B9LebQNNY"+"0UBblWuW+AOYD0FeBpI3eoAw5kicxhfmaTq3c61fugAAAABJRU5ErkJggg==";var buttonINNERHTML="Urban Dictionary";var buttonTitle="Search slang words from any lenguage";var buttonFunction=function()
{GM_openInTab(+selection)}
var GMVarName="UrbanDictionary";var buttonFunction=function()
{buttonSearchBookmarklet(GMVarName,'http://www.urbandictionary.com/define.php?term=','')}
var initFunction=null;var configFunction=function()
{return configBookmarletSelect(GMVarName,"-- Urban Dictionary --");}
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction,null,this.id);}},{id:15,name:"TINYURL",sourcecode:function()
{var imgSRC="data:image/png;base64,"+"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAALHRFWHRDcmVhdGlvbiBUaW1lAFNh"+"dCAyNCBKYW4gMjAwNCAxODoyNTozMyAtMDAwMJyaTRoAAAAHdElNRQfUARgSGi/p6BLFAAAACXBI"+"WXMAAA7DAAAOwwHHb6hkAAAABGdBTUEAALGPC/xhBQAAAF9JREFUeNpjZGCYyUAKYAFiLS2BvXt9"+"CCp1dt5y7doHkAYWFiYJCS7CZrMwAUkmktwDBIyYfrhwIVhfXxjIuHjxrYHBWjRZkm0Y1TBENbBg"+"CmVkHOblZQUyPn/+jSkLAEtQEjj01iLvAAAAAElFTkSuQmCC";var buttonINNERHTML="TinyURL";var buttonTitle="Creates a tinyURL from a long one. If selection is empty use the current url";var buttonFunction=function(){if(!askForInput())return;var win=new wsktbWindow();win.init();win.showNearTheMenu();win.setHtmlContent("working...");HTTPRequest('http://tinyurl.com/create.php?url='+(selection?selection:location.href),function(response){var tinyUrl=response.match(/<blockquote><b>(http:\/\/tinyurl.com\/.*)<\/b><p>/i)[1];win.setHtmlContent('<i>"'+selection+'"</i> now is the same as: <br><b>'+tinyUrl+'</b>')});}
var initFunction=null;var configFunction=null;return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction,null,this.id);}},{id:16,name:"ONLINE MP3 PLAYER",sourcecode:function()
{var imgSRC="data:image/png;base64,"
+"/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIf"
+"IiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7"
+"Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAQABADASIA"
+"AhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAwQFB//EACEQAAICAgEFAQEAAAAAAAAAAAECAxEE"
+"BSEABhIiMTJB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAM"
+"AwEAAhEDEQA/ANK7szJMDVLPG7qVdj6uVuo3arHNWB1A7nh2ui1TZb7mSXz80URmWMqRG7A2ZGv8"
+"/K6V3WR3Fv5m1o1uYjyyMiK+OVgg4Klmlr2FE8gm/wCD4OgbLQd5b/LfEzoGijnlYPlHKVseFaI8"
+"o4g1n1sCwDzyRZPQf//Z";var GMVarName="Online MP3 player";var buttonINNERHTML="Online mp3Player";var buttonFunction=function(ev){var page_links=document.links;var sw=true;for(var i=0;i<page_links.length;i++){if(page_links[i].href.match(/\.mp3$/i)){var url="http://musicplayer.sourceforge.net/xspf_player_slim.swf?&song_url="+escape(page_links[i].href)+"&song_title="+escape(page_links[i].innerHTML);var mp3Player=document.createElement("objet");with(mp3Player)
{type="application/x-shockwave-flash";codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0";data=url;width="400px";height="15px";classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000";style.display="inline";style.position="relative";}
var param1=document.createElement("param");param1.name="movie";param1.value=url;var param2=document.createElement("param");param2.name="wmode";param2.value="transparent";var param3=document.createElement("param");param3.name="quality";param3.value="high";var param4=document.createElement("param");param4.name="bgcolor";param4.value="#e6e6e6";var embed=document.createElement("embed");with(embed){src=url;quality="hight";bgcolor="#e6e6e6";width="400px";height="15px";name="xspf_player";align="middle";type="application/x-shockwave-flash"
pluginspace="http://www.macromedia.com/go/getflashplayer"}
mp3Player.appendChild(param1);mp3Player.appendChild(param2);mp3Player.appendChild(param3);mp3Player.appendChild(param4);mp3Player.appendChild(embed);page_links[i].parentNode.insertBefore(mp3Player,page_links[i].nextSibling)
sw=false;}}
if(sw){selection=prompt('Enter a song or artis to look for...');if(selection){GM_openInTab("http://www.google.com/search?hl=en&lr=&q=intitle%3Aindex.of+%22mp3%22+%2B%22"+selection+"%22+-htm+-html+-php+-asp+%22Last+Modified%22&btnG=Search")}}}
var buttonTitle="Search on the current site for mp3 links, and add an online player";var initFunction=null
var configFunction=null
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction);}},{id:17,name:"URL",sourcecode:function()
{var imgSRC="data:image/png;base64,"+"/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAsHCAkIBwsJCQkMCwsNEBoREA8PECAXGBMaJiIoKCYi"+"JSQqMD0zKi05LiQlNUg1OT9BREVEKTNLUEpCTz1DREH/2wBDAQsMDBAOEB8RER9BLCUsQUFBQUFB"+"QUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUH/wAARCAAiACIDASIA"+"AhEBAxEB/8QAGwAAAwEAAwEAAAAAAAAAAAAAAAUGBwECAwT/xAAwEAABAwMCBQEFCQAAAAAAAAAB"+"AgMEAAUREjEGEyFRYUGBkaHB0QciIzJCUmJxsf/EABkBAAIDAQAAAAAAAAAAAAAAAAQFAQIDBv/E"+"ACURAAEDAwQCAgMAAAAAAAAAAAEAAgMEETEFE0FREjIhgSMkcf/aAAwDAQACEQMRAD8AveIeK2LK"+"XWkxX5clKU6GmU5KlH0PYbHPmohzijiWa6l2Y6qA2telLDf4avP8unc16XqUZt2kyQgtqUvSB64H"+"Qf5S6c2lLJlrdWVNp0hLZGckjfOw9hoOl1H84jLb3OeUdWaZ+qZA+xA+r/0fK+08U3SBI1tTZDrQ"+"xkuK1p9uoH5VoNnvbM+K06pbZ14AcbOUKPjqce81i9wuxbGhSAQfU7HvT7gB1Rdmpjq0sIQlRQPy"+"lXU5/v7vxprqzdmPfYfXI7ukGkue87Ugzg3Wv0Ukav7SWkJWlWsJAVtvRQInjPKbbL+lnU5taZky"+"K4SHG3lpPfc4+BFKLjDgxuW9IUpgbc0AEHx4NX32gcMyn3heLWnU+kYeaH6wNiPNQCr4tCVMyIgU"+"dloX09hFKyyWmm848Loo9qug8CATyEhvcuDKcZj2xMhx3VpJXghedsY61pPAdrVarDzJgDaipQcP"+"rj0+fvpDYnLXzxIEViOR+1Iz7/pV7aoz17caWpos29nqARjmH6VtU1MlaBTNBtyTlLDSNoyXusD0"+"MfS7IsbslCX1ZSXBrI7Z60VWAADAHQUUeI2AWAS7zd2ipLi+BDcVrciMLV3U2CaKKs7CmL3CWcOW"+"+EJKSIccHO/LT9Kv0JCUAJAAA2FFFQzCtP7lc0UUVdYr/9k=";var buttonINNERHTML="Open URL";var buttonTitle="Open the selection on the browser";var GMVarName="OPENUrl";var buttonFunction=function(){selection=unescape(selection);if(selection.match(/^(http(s)?:\/\/)?([a-z/d]*:[a-z/d]*@)?(.+\.)?[a-z/d-]*\.[a-z]{2,4}(\/.*)*$/i))
{if(GM_getValue(GMVarName)==null)
GM_setValue(GMVarName,false);if(GM_getValue(GMVarName)==false)
GM_openInTab(selection)
else
unsafeWindow.open(selection,'','');}
else
alert("This is not an URL: "+selection);}
var initFunction=null;var configFunction=function()
{return configBookmarletCheckbox(GMVarName,"UNChecked: Tab -- Checked: New Window");}
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction);}},{id:18,name:"MAILINATOR",sourcecode:function()
{var imgSRC="";var buttonINNERHTML="Mailinator";var buttonTitle="Return a mailinator email account";var buttonFunction=function(){var win=new wsktbWindow();win.init();win.showNearTheMenu();win.setHtmlContent("working...");HTTPRequest("http://www.mailinator.com/mailinator/index.jsp",function(response){var reg_exp=/.*([a-z]{10}@mailinator\.com).*<\/a><br>/gi
var result=reg_exp.exec(response);win.setHtmlContent("<input type='text' size='25' value='"+result[1]+"'><br>\n<br>This is a one use email without password, for resgitering on sites that could send you spam or just stay anonymous.<br><br>You can see the inbox <a href='http://mailinator.com/mailinator/maildir.jsp?email="+result[1].substr(0,10)+"' target='_blank'>here</a>");});}
var initFunction=null;var configFunction=null;return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction);}},{id:19,name:"BYPASS PROXY BAN",sourcecode:function()
{var imgSRC="";var GMVarName="BypassProxy";var buttonINNERHTML="Bypass banned web";var buttonFunction=function(ev){buttonSearchBookmarklet(GMVarName,'http://www.myspaceproxyy.com/index.php?q=','&hl=1111100001')}
var buttonTitle="Let you see a website that is banned by your isp or someone";var initFunction=null
var configFunction=function()
{return configBookmarletSelect(GMVarName,"-- Bypass options --");}
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction);}},{id:20,name:"SHOWMYIP",sourcecode:function()
{var imgSRC=""
var buttonINNERHTML="ShowMyIp";var buttonFunction=function(ev){var win=new wsktbWindow();win.init();win.showNearTheMenu();win.setHtmlContent("working...");var linkList=document.createElement("ul");HTTPRequest("http://xml.showmyip.com",function(response){win.setHtmlContent("");var parser=new DOMParser();var dom=parser.parseFromString(response,"application/xml");var ip_address=dom.getElementsByTagName('ip_address')[0];var ip=ip_address.getElementsByTagName('ip')[0].firstChild.nodeValue
var countryCode=ip_address.getElementsByTagName('country')[0].firstChild.nodeValue
var countryFlag=ip_address.getElementsByTagName('country_flag')[0].firstChild.nodeValue
var browser=ip_address.getElementsByTagName('browser')[0].firstChild.nodeValue
var flag=document.createElement("img");flag.src=countryFlag;flag.border="0";flag.align="absmiddle";var boldIp=document.createElement("b");boldIp.innerHTML=ip;win.addObjectContent(flag);win.addObjectContent(document.createTextNode(" "+countryCode+" "));win.addObjectContent(boldIp);});}
var buttonTitle="Shows your current ip.";var initFunction=null
var configFunction=null
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction);}},{id:21,name:"DOMAINS ON THIS IP",sourcecode:function()
{var imgSRC=""
var buttonINNERHTML="Domains on this ip";var buttonFunction=function(ev){var win=new wsktbWindow();win.init();win.showNearTheMenu();win.setHtmlContent("working...");var domain;if(!selection)
domain=location.host;else
domain=location.host;HTTPRequest("http://www.seologs.com/ip-domains.html?domainname="+domain,function(response){win.setHtmlContent("Domains:<br>");lineResponse=response.split('\n');for(lineItem in lineResponse)
{var domains;try{domains=lineResponse[lineItem].match(/.*(\d+\) .*<br>)/i)[1];}catch(e){domains=false}
if(domains)
win.addHtmlContent(domains)}});}
var buttonTitle="Displays domains hosted on the same ip you input";var initFunction=null
var configFunction=null
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction);}},{id:22,name:"WHOIS",sourcecode:function()
{var imgSRC=""
var GMVarName="WhoisDomain";var buttonINNERHTML="Whois domain";var buttonFunction=function(ev){buttonSearchBookmarklet(GMVarName,'http://www.who.is/whois-org/ip-address/','/')}
var buttonTitle="Displays domains hosted on the same ip you input";var initFunction=null
var configFunction=function()
{return configBookmarletSelect(GMVarName,"-- Whois domain --");}
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction);}},{id:23,name:"CALCULATOR",sourcecode:function()
{var imgSRC=null;var buttonINNERHTML="Calculator";var buttonTitle="ostermiller.org Calculator";var buttonFunction=function()
{var calcWindow=window.open('http://ostermiller.org/calc/calculator.html?','calculator'+new Date().getTime(),'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,copyhistory=no,width=450,height=300');}
var initFunction=null;var configFunction=null;return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction);}},{id:24,name:"TEXT TO CLICKABLE LINKS",sourcecode:function()
{var imgSRC=null;var buttonINNERHTML="Make text links clickable";var buttonTitle="Linkify Plus. Search text links and make them clickable";var buttonFunction=function()
{(function(){try{var notInTags=['a','head','noscript','option','script','style','title','textarea'];var res=document.evaluate("//text()[not(ancestor::"+notInTags.join(') and not(ancestor::')+")]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);var i,el,l,m,p,span,txt,urlRE=/((?:https?|ftp):\/\/[^\s'"'<>()]*|[-\w.+]+@(?:[-\w]+\.)+[\w]{2,6})/gi;for(i=0;el=res.snapshotItem(i);i++){txt=el.textContent;span=null;p=0;while(m=urlRE.exec(txt)){if(null==span){span=document.createElement('span');}
l=m[0].replace(/\.*$/,'');span.appendChild(document.createTextNode(txt.substring(p,m.index)));a=document.createElement('a');a.className='linkifyplus';a.appendChild(document.createTextNode(l));if(-1==l.indexOf('://'))l='mailto:'+l;a.setAttribute('href',l);span.appendChild(a);p=m.index+m[0].length;}
if(span){span.appendChild(document.createTextNode(txt.substring(p,txt.length)));el.parentNode.replaceChild(span,el);}}}catch(e){dump('Linkify Plus Error ('+e.lineNumber+'): '+e+'\n');}})();}
var GMVarName="TextToClickableLinks";var initFunction=function(){if(GM_getValue(GMVarName)==null)
GM_setValue(GMVarName,false);if(GM_getValue(GMVarName))
buttonFunction();}
var configFunction=function()
{return configBookmarletCheckbox(GMVarName,"Check: autoExecute. Uncheck: dont");}
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction);}},{id:25,name:"RELOAD WEB WITH INTERVAL",sourcecode:function()
{var imgSRC=null;var buttonINNERHTML="Reload Interval";var buttonTitle="Reload the website with an interval you enter";var buttonFunction=function()
{var V=prompt('#Secs. between reloads?','60');if(V&&!isNaN(V))
{with(unsafeWindow.document)
{write('<html><frameset rows=\'0,*\' framespacing=0 border=0 frameborder=0><frame noresize><frame></frameset></html>');close();}
unsafeWindow.frames[1].location.href=unsafeWindow.document.location.href;with(unsafeWindow.frames[0].document)
{write('<script>setInterval(\'R()\','+V*1000+');function R(){parent.frames[1].location.reload();}</script>');close();}}}
var GMVarName="ReloadWebWithInterval";var initFunction=function(){if(GM_getValue(GMVarName)==null)
GM_setValue(GMVarName,false);if(GM_getValue(GMVarName))
buttonFunction();}
var configFunction=function()
{return configBookmarletCheckbox(GMVarName,"Check: autoExecute. Uncheck: dont");}
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction);}},{id:26,name:"RELOAD IMAGES",sourcecode:function()
{var imgSRC=null;var buttonINNERHTML="Reload Images";var buttonTitle="Reload the Images that are not properly loaded.";var buttonFunction=function()
{function reloadImages(w)
{if(w==null)
{var w=unsafeWindow;}
try
{for(var j=0;IMG=w.document.images[j];++j)
{if(IMG.readyState!='complete')
IMG.src=IMG.src;}
for(var i=0;F=w.frames[i];i++)
{reloadImages(F);}}catch(e){}}
reloadImages(null)}
var GMVarName="ReloadImages";var initFunction=function(){if(GM_getValue(GMVarName)==null)
GM_setValue(GMVarName,false);if(GM_getValue(GMVarName))
buttonFunction();}
var configFunction=function()
{return configBookmarletCheckbox(GMVarName,"Check: autoExecute. Uncheck: dont");}
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction);}},{id:27,name:"CLEAR CURRENT SITE COOKIES",sourcecode:function(){var imgSRC=null;var buttonINNERHTML="Clear cookies";var buttonTitle="Clear the cookies of the CURRENT website.";var buttonFunction=function(){var a,b,c,e,f;f=0;a=unsafeWindow.document.cookie.split("; ");for(e=0;e<a.length&&a[e];e++){f++;for(b="."+location.host;b;b=b.replace(/^(?:\.|[^\.]+)/,""))
{for(c=location.pathname;c;c=c.replace(/.$/,""))
{unsafeWindow.document.cookie=(a[e]+"; domain="+b+"; path="+c+"; expires="+new Date((new Date()).getTime()-1e11).toGMTString());}}}
alert("Expired "+f+" cookies");}
var GMVarName="ClearCookies";var initFunction=function(){if(GM_getValue(GMVarName)==null)
GM_setValue(GMVarName,false);if(GM_getValue(GMVarName))
buttonFunction();}
var configFunction=function()
{return configBookmarletCheckbox(GMVarName,"Check: autoExecute. Uncheck: dont");}
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction);}},{id:28,name:"VIEW CURRENT SITE COOKIES",sourcecode:function(){var imgSRC=null;buttonINNERHTML="View cookies";buttonTitle="Shows the cookies of the current web";var buttonFunction=function(){var win=new wsktbWindow();win.init();win.showNearTheMenu();debugMsg('VSP: 1');var a,b;b="<"+"html>\n<body>Cookies in this page:<p>\n";b+=document.cookie.replace(/; /g,'<br>\n')
b+="</body>\n</html>\n";win.setHtmlContent(b);}
var initFunction=null;var configFunction=null;return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction);}},{id:29,name:"CHANGE CURRENT SITE COOKIES",sourcecode:function(){var imgSRC=null;buttonINNERHTML="Change cookies";buttonTitle="Change the cookies of the current web";var buttonFunction=function(){function CreateCookie(name,value,days)
{if(days)
{var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));var expires="; expires="+date.toGMTString();}
else var expires="";document.cookie=name+"="+value+expires+"; path=/";}
var name=prompt("Name of the cookie to change");if(!name)return;var value=prompt("Value of the cookie to change");if(!value)return;var expire=prompt("Number of days to expire");if(!expire)return;CreateCookie(name,value,expire);}
var initFunction=null;var configFunction=null;return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction);}},{id:30,name:"VIEW STORED PASSWORDS",sourcecode:function(){var imgSRC=null;var buttonINNERHTML="View web passwords";var buttonTitle="Shows the passwords saved with the autocomplete";var buttonFunction=function(){var win=new wsktbWindow();win.init();win.showNearTheMenu();var a,b;b="<"+"html>\n<body>Passwords in this page:<p>\n";(function(c){var d,e,f,g,h;for(d=0;d<c.length;d++)
{try
{arguments.callee(c.frames[d]);}catch(i){}}
e=c.document.forms;for(f=0;f<e.length;f++)
{g=e[f];for(h=0;h<g.length;h++)
{if(g[h].type.toLowerCase()=="password")b+=g[h].value+"<br>\n";}}})(unsafeWindow);b+="</body>\n</html>\n";win.setHtmlContent(b);}
var initFunction=null;var configFunction=null;return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction);}},{id:31,name:"ZOOM IMAGES",sourcecode:function()
{var imgSRC=null;var buttonINNERHTML="ZOOM IMAGES";var buttonTitle="Zoom the images of the current site";var buttonFunction=function()
{function zoomImage(image,amt){if(image.initialHeight==null)
{image.initialHeight=image.height;image.initialWidth=image.width;image.scalingFactor=1;}
image.scalingFactor*=amt;image.width=image.scalingFactor*image.initialWidth;image.height=image.scalingFactor*image.initialHeight;}
var i,L=document.images.length;for(i=0;i<L;++i)
zoomImage(unsafeWindow.document.images[i],1.5);if(!L)alert("This page contains no images.");}
var initFunction=null;var configFunction=null;return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction);}},{id:32,name:"UNZOOM IMAGES",sourcecode:function()
{var imgSRC=null;var buttonINNERHTML="UNZOOM IMAGES";var buttonTitle="UNZoom the images of the current site";var buttonFunction=function()
{function zoomImage(image,amt){if(image.initialHeight==null)
{image.initialHeight=image.height;image.initialWidth=image.width;image.scalingFactor=1;}
image.scalingFactor*=amt;image.width=image.scalingFactor*image.initialWidth;image.height=image.scalingFactor*image.initialHeight;}
var i,L=document.images.length;for(i=0;i<L;++i)
zoomImage(unsafeWindow.document.images[i],0.75);if(!L)alert("This page contains no images.");}
var initFunction=null;var configFunction=null;return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction);}},{id:33,name:"PAGE RECOLORIZATION",sourcecode:function()
{var imgSRC=null;var buttonINNERHTML="Page Recolorization";var buttonTitle="Makes the web more easy to read. By George Saunders";var buttonFunction=function()
{var newSS;var styles='* { background: white ! important; color: black !important } :link, :link * { color: #0000EE !important } :visited, :visited * { color: #551A8B !important }';newSS=window.document.createElement('link');newSS.rel='stylesheet';newSS.href='data:text/css,'+escape(styles);unsafeWindow.document.getElementsByTagName("head")[0].appendChild(newSS);}
var GMVarName="PageRecolorization";var initFunction=function(){if(GM_getValue(GMVarName)==null)
GM_setValue(GMVarName,false);if(GM_getValue(GMVarName))
buttonFunction();}
var configFunction=function()
{return configBookmarletCheckbox(GMVarName,"Check: autoExecute. Uncheck: dont");}
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction);}},{id:34,name:"REMOVE ALL IMAGES",sourcecode:function()
{var imgSRC=null;var buttonINNERHTML="Remove all images";var buttonTitle="Removes all the images of the current website";var buttonFunction=function()
{var img,alt;for(var i=document.images.length-1;i>=0;i--)
{img=document.images[i];alt=document.createTextNode(img.alt);img.parentNode.replaceChild(alt,img)}
document.body.background="";}
var GMVarName="RemoveImages";var initFunction=function(){if(GM_getValue(GMVarName)==null)
GM_setValue(GMVarName,false);if(GM_getValue(GMVarName))
buttonFunction();}
var configFunction=function()
{return configBookmarletCheckbox(GMVarName,"Check: autoExecute. Uncheck: dont");}
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction);}},{id:35,name:"EDIT WEB CONTENT",sourcecode:function()
{var imgSRC=null;var buttonINNERHTML="EDIT WEB";var buttonTitle="Let you change the text of the curren web site";var buttonFunction=function()
{if(document.designMode=='on')
document.designMode='off';else
document.designMode='on';};var initFunction=null;var configFunction=null;return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction);}},{id:36,name:"CLEAR REDIRECT LINKS",sourcecode:function()
{var imgSRC=null;var buttonINNERHTML="REDIRECT LINKS";var buttonTitle="Change links that redirect to another to the end link";var buttonFunction=function()
{var k,x,t,i,j,p;var goon=true;for(k=0;goon;k++)
{goon=(x=unsafeWindow.document.links[k])
try{t=x.href.replace(/[%]3A/ig,':').replace(/[%]2f/ig,'/');}catch(e){return}
i=t.lastIndexOf('http');if(i>0){t=t.substring(i);j=t.indexOf('&');if(j>0)t=t.substring(0,j);p=/https?\:\/\/[^\s]*[^.,;'">\s\)\]]/.exec(unescape(t));if(p)x.href=p[0];}
else if(x.onmouseover&&x.onmouseout)
{x.onmouseover();if(window.status&&window.status.indexOf('://')!=-1)
x.href=window.status;x.onmouseout();}
x.onmouseover=null;x.onmouseout=null;}}
var GMVarName="ChangeRedirectLinks";var initFunction=function(){if(GM_getValue(GMVarName)==null)
GM_setValue(GMVarName,false);if(GM_getValue(GMVarName))
buttonFunction();}
var configFunction=function()
{return configBookmarletCheckbox(GMVarName,"Check: autoExecute. Uncheck: dont");}
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction);}},{id:37,name:"SCRIPT RUNNER",sourcecode:function()
{var imgSRC=""
var buttonINNERHTML="ScriptRunner";var buttonFunction=function(ev){var page_links=document.links;for(var i=0;i<page_links.length;i++){if(page_links[i].href.match(/\.user.js$/i))
{var executeButton=document.createElement("button");executeButton.innerHTML="Run script";executeButton.href=page_links[i].href;with(executeButton.style)
{border="1px solid black";fontSize="-1";}
executeButton.addEventListener("click",function(){GM_xmlhttpRequest({method:"GET",url:executeButton.href,onload:function(details)
{if(details.readyState==4)
{if(details.status!=200){return;}
try{eval(details.responseText);alert("Script executed");}
catch(e){alert("Error on script:"+e);}}}});},true);page_links[i].parentNode.insertBefore(executeButton,page_links[i].nextSibling)}}}
var buttonTitle="Find user script on the current web, and a button wich let you run it without installing";var GMVarName="ScriptRunner";var initFunction=function(){if(GM_getValue(GMVarName)==null)
GM_setValue(GMVarName,true);if(GM_getValue(GMVarName))
buttonFunction();}
var configFunction=function()
{return configBookmarletCheckbox(GMVarName,"Check: autoExecute. Uncheck: dont");}
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction);}},{id:38,name:"AUTOCLICK",sourcecode:function()
{var imgSRC=null;var buttonINNERHTML="AutoClick";var buttonTitle="hover over links for 1.5 seconds to open in a new tab. By Mark Pilgrim";var buttonFunction=function()
{function mouseover(event){document._clickTarget=event.currentTarget;document._autoclickTimeoutID=window.setTimeout(autoclick,1500);}
function mouseout(event){document._clickTarget=null;if(document._autoclickTimeoutID){window.clearTimeout(document._autoclickTimeoutID);}}
function clear(elmLink){if(!elmLink){return;}
elmLink.removeEventListener('mouseover',mouseover,true);elmLink.removeEventListener('mouseout',mouseout,true);elmLink.removeEventListener('click',click,true);}
function click(event){var elmLink=event.currentTarget;if(!elmLink){return false;}
clear(elmLink);mouseout(event);return true;}
function autoclick(){if(!document._clickTarget){return;}
GM_openInTab(document._clickTarget.href);clear(document._clickTarget);}
if(typeof(GM_openInTab)!='undefined'){for(var i=document.links.length-1;i>=0;i--){var elmLink=document.links[i];if(elmLink.href&&elmLink.href.indexOf('javascript:')==-1){elmLink.addEventListener('mouseover',mouseover,true);elmLink.addEventListener('mouseout',mouseout,true);elmLink.addEventListener('click',click,true);}}}}
var GMVarName="AutoClick";var initFunction=function(){if(GM_getValue(GMVarName)==null)
GM_setValue(GMVarName,false);if(GM_getValue(GMVarName))
buttonFunction();}
var configFunction=function()
{return configBookmarletCheckbox(GMVarName,"Check: autoExecute. Uncheck: dont");}
return bookmarklet(imgSRC,buttonINNERHTML,buttonTitle,buttonFunction,configFunction,initFunction);}});debugMsg('2');function swissKnifeMenu(swCtrl){debugMsg('SwisKnifeMenu()');selection=unsafeWindow.getSelection();selection=escape(selection);if(selection!=''||swCtrl){if((selection.length>12&&selection.match(/.+\b.+/))||selection.match(/.*\n.*/))
{debugMsg('display textarea');textareaSelection.style.display="block"
inputSelection.style.display="none"}
else
{debugMsg('display input');textareaSelection.style.display="none"
inputSelection.style.display="block"}
debugMsg('Selection: '+unescape(selection));textareaSelection.value=inputSelection.value=unescape(selection);_divSwissKnifeMenu.style.display="block";_divSwissKnifeMenuContent.style.display="block";menuFeet.style.display="block";if(_divSwissKnifeMenu.style.position=="fixed")
return;var halfMenuWidth=parseInt(_divSwissKnifeMenu.style.width)/2;var MenuHeight=parseInt(_divSwissKnifeMenu.style.height);debugMsg('swknfmenu: 2');var windowWidth=unsafeWindow.innerWidth;var expectedPosition=leftCord;expectedPosition+=halfMenuWidth;if(windowWidth>expectedPosition)
{var leftPosition=leftCord;leftPosition-=halfMenuWidth;if(leftPosition<0)leftPosition=5;_divSwissKnifeMenu.style.left=leftPosition+"px";}
else
{_divSwissKnifeMenu.style.right="0px";}
debugMsg('swknfmenu: 3');_divSwissKnifeMenu.style.top=(topCord+15)+"px";debugMsg('swknfmenu: 4');}}
debugMsg('3');var leftCord=0;var topCord=0;var whereIsTheMouse=function(e)
{var posx=0;var posy=0;if(!e)var e=window.event;if(e.pageX||e.pageY){posx=e.pageX;posy=e.pageY;}
else if(e.clientX||e.clientY)
{posx=e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;posy=e.clientY+document.body.scrollTop+document.documentElement.scrollTop;}
leftCord=posx;topCord=posy;dummyButton.style.top=posy+"px";}
unsafeWindow.document.addEventListener("dblclick",function(){swissKnifeMenu(false)},false);unsafeWindow.document.addEventListener("click",function(e)
{if(e.ctrlKey)
{swissKnifeMenu(true)}},true);unsafeWindow.document.addEventListener('keydown',function(e)
{var code;if(e.keyCode)code=e.keyCode;else if(e.which)code=e.which;debugMsg('ctrl menu: '+code);if(code==18)
{swissKnifeMenu(false);}},true);unsafeWindow.document.addEventListener("mouseover",function(e){whereIsTheMouse(e)},true);debugMsg('5');function enterPressed(e)
{var code;if(e.keyCode)code=e.keyCode;else if(e.which)code=e.which;if(code==13)
{lastScriptFunction();}}
var lastScriptFunction=function(){};var selection="";var inputSelection=document.createElement("input");with(inputSelection)
{id="inputSelection";size="25";width="195px";style.textAlign="center";style.border="1px solid #ccc";color="#5454dc";addEventListener("change",function(){selection=this.value;textareaSelection.value=selection;},true)
addEventListener("keyup",function(e){enterPressed(e)},true)}
var textareaSelection=document.createElement("textarea");with(textareaSelection)
{id="textareaSelection";cols="10";rows="4";color="#5454dc";style.width="195px";style.border="1px solid #ccc";style.display="none";addEventListener("change",function(){selection=textareaSelection.value;inputSelection.value=selection;},true)}
debugMsg('6');var _divSwissKnifeMenu=document.createElement('div');with(_divSwissKnifeMenu.style)
{position="absolute";display="none";zIndex="999";background="#FAFAFA";width="235px";overflowY="none";color="#5454dc";}
debugMsg('7');var buttonClose=document.createElement("img");with(buttonClose)
{src=Images.close;width="19";height="18";border="0";align="left";title="Hides the menu";addEventListener("click",function()
{_divSwissKnifeMenu.style.display="none";},true);addEventListener("mouseover",function(){this.style.cursor="pointer";},true);}
var buttonMax=document.createElement("img");with(buttonMax)
{src=Images.maximize;width="19";height="18";border="0";align="left";title="Deploy menu";addEventListener("mouseover",function(){this.style.cursor="pointer";_divSwissKnifeMenuContent.style.display="block";menuFeet.style.display="block";},true);}
var buttonMin=document.createElement("img");with(buttonMin)
{src=Images.minimize;width="19";height="18";border="0";align="left";title="Undeploy the menu";addEventListener("click",function()
{_divSwissKnifeMenuContent.style.display="none";menuFeet.style.display="none";},true);addEventListener("mouseover",function(){this.style.cursor="pointer";},true);}
var buttonFixed=document.createElement("img");with(buttonFixed)
{src=Images.sticky;width="19";height="18";border="0";align="left";title="Click to mantain the bar always in the same position";addEventListener("click",function(e)
{with(_divSwissKnifeMenu.style)
{if(position!="fixed")
{position="fixed";left=e.clientX+"px";top=e.clientY+"px";}
else
{position="absolute";left=leftCord+"px";top=topCord+"px";}}},true);addEventListener("mouseover",function(){this.style.cursor="pointer";},true);}
var autoShowCheckbox=document.createElement("input");with(autoShowCheckbox)
{type="checkbox";title="Check it to show automatically the bar when any web loads. [ALT-w to show the bar]";style.float="left";addEventListener("click",function()
{if(this.checked==true)
{GM_setValue("autoShow",true);}
else
{GM_setValue("autoShow",false);}},true);addEventListener("mouseover",function(){this.style.cursor="pointer";},true);}
var buttonHelp=document.createElement("img");with(buttonHelp)
{src=Images.help;width="19";height="18";border="0";align="left";title="Opens a windows with a little manual of JPSwissKnife";addEventListener("click",function()
{var win=new wsktbWindow();win.init();win.setHtmlContent("<ul>"
+"<li>If the bar is hidden you can display it by pressing [ALT+w]</li>"
+"<li>Put the mouse over an element to see contextual help of it.</li>"
+"<li>Right click a button script to configure it.</li>"
+"<li>You can acces WSKTB by doubleclicking a word, by clicking a text while you press CTRL key or by selecting a text and pressing ALT key</li>"
+"<li>Visit the <a href='http://forum.wsktoolbar.com' target='_blank'>forum</a>  or the <a href='http://blog.wsktoolbar.com' target='_blank'>blog</a> for help</li>"
+"</ul>"
+"Some bookmarklets are based on other that I've seen over internet, if some owner wants to be refered, just mail me to admin@wsktoolbar.com")
win.showNearTheMenu();},true);addEventListener("mouseover",function(){this.style.cursor="pointer";},true);}
var buttonFeedBack=document.createElement("img");with(buttonFeedBack)
{src=Images.feedBack;width="19";height="18";border="0";align="left";title="Any idea or bug you have seen. Say it!!";addEventListener("click",function()
{var win=new wsktbWindow();win.init();win.addObjectContent(document.createTextNode("Feedback form:"));var form=document.createElement("div");var inputMyEmail=document.createElement("input");inputMyEmail.type="text";inputMyEmail.name="my_email";inputMyEmail.value="admin@wsktoolbar.com";var textareaNote=document.createElement("textarea");textareaNote.name="ENOTE_FOR_YOU";textareaNote.cols="25";textareaNote.rows="5";function submit(){var params='my_email='+escape(inputMyEmail.value)+'&ENOTE_FOR_YOU='+escape(textareaNote.value)+'&subject=Feedback wsktb';GM_xmlhttpRequest({method:"POST",url:"http://www.powweb.com/scripts/formemail.bml?",headers:{'Content-type':'application/x-www-form-urlencoded','referer':'http://blog.wsktoolbar.com/index.php',},data:params,onload:function(details)
{if(details.readyState==4){if(details.status!=200){return;}
if(details.responseText.match(/The form has been submitted successfully/i))
win.addHtmlContent("Note sended correctly");else
win.addHtmlContent("Error sending the note, look at empty fields.");}}});}
var buttonSubmit=document.createElement("button");buttonSubmit.innerHTML="Submit Now";buttonSubmit.addEventListener("click",submit,true);with(form){appendChild(document.createElement('br'));appendChild(document.createTextNode('Any idea, any bug, any change...'))
appendChild(document.createElement('br'));appendChild(document.createTextNode('Message: '))
appendChild(document.createElement('br'));appendChild(textareaNote);appendChild(document.createElement('br'));appendChild(buttonSubmit);}
win.addObjectContent(form);win.showNearTheMenu();},true);addEventListener("mouseover",function(){this.style.cursor="pointer";},true);}
var buttonConfig=document.createElement("img");with(buttonConfig)
{src=Images.config;width="19";height="18";border="0";align="left";title="Shows configuration window.";addEventListener("click",function()
{var win=new wsktbWindow();win.init();var scriptSelect=document.createElement("select");scriptSelect.size=9;scriptSelect.width="170px";for(var script in arrayMenu)
{var option=document.createElement("option");option.innerHTML=arrayMenu[script].name.substr(0,20)
option.value=arrayMenu[script].name;scriptSelect.appendChild(option)}
function move(to){var list=scriptSelect;var index=list.selectedIndex;var total=list.options.length-1;if(index==-1)return false;if(to==+1&&index==total)return false;if(to==-1&&index==0)return false;var items=new Array;var values=new Array;for(i=total;i>=0;i--){items[i]=list.options[i].text;values[i]=list.options[i].value;}
for(i=total;i>=0;i--){if(index==i){list.options[i+to]=new Option(items[i],values[i+to],0,1);list.options[i]=new Option(items[i+to],values[i]);i--;}
else{list.options[i]=new Option(items[i],values[i]);}}
list.focus();}
var moveUp=document.createElement("button");moveUp.innerHTML="Move UP";moveUp.addEventListener("click",function(){move(-1)},true)
var moveDown=document.createElement("button");moveDown.innerHTML="Move DOWN";moveDown.addEventListener("click",function(){move(+1)},true)
var save=document.createElement("button");save.innerHTML="Save changes";save.addEventListener("click",function(){for(var i=0;i<scriptSelect.options.length;i++)
{var name=scriptSelect.options[i].value;var GMVar="List order: "+name;debugMsg(GMVar+i);GM_setValue(GMVar,i);}},true)
win.addObjectContent(document.createTextNode("Scripts order:"));win.addObjectContent(scriptSelect);win.addObjectContent(moveUp);win.addObjectContent(moveDown);win.addObjectContent(save);win.showNearTheMenu();},true);addEventListener("mouseover",function(){this.style.cursor="pointer";},true);}
debugMsg('9');var menuHeader=document.createElement("div");with(menuHeader)
{appendChild(buttonClose);appendChild(buttonHelp);appendChild(buttonMin);appendChild(buttonMax);appendChild(buttonFixed);appendChild(buttonConfig);appendChild(buttonFeedBack);appendChild(autoShowCheckbox);appendChild(document.createElement("br"));align="left";style.backgroundColor="#EEE";style.height="18px";style.border="1px solid #CCC"
addEventListener("mouseover",function(){this.style.cursor="move"},true);addEventListener("mousedown",function(e)
{beginDrag(_divSwissKnifeMenu,e)},true);}
debugMsg('10');var menuFeet=document.createElement("div");with(menuFeet)
{align="center";style.backgroundColor="#FFF";style.fontSize="9px";style.border="1px solid #CCC";style.display="none";innerHTML="<a href='http://blog.wsktoolbar.com' target='_blank' title='News and staff about WSKTB'>WebSwissKnifeToolbar</a> version: <a href='http://wsktoolbar.com/webswissknifetoolbar.user.js' title='Opens the last version script'>"+version+"</a>";}
var _divSwissKnifeMenuContent=document.createElement("div");with(_divSwissKnifeMenuContent)
{with(style)
{zIndex="999";background="#FAFAFA";padding="6px";overflowY="scroll";height="220px";width="223px";align="left";}
addEventListener('contextmenu',function(e){e.stopPropagation();return false;},true);}
var inputSelectionText=document.createElement("b");with(inputSelectionText)
{innerHTML="Selection";style.fontFamily="Century Gothic, verdana,helvetica;";style.color="#5454dc";style.fontSize="10pt";title="Rightclick to clear selection. Clickme to change to multiline/line input field";var changeInputTextarea=function(){debugMsg('labelSelectionClicked');if(textareaSelection.style.display=="none")
{debugMsg('display textarea');textareaSelection.style.display="block"
inputSelection.style.display="none"}
else
{debugMsg('display input');textareaSelection.style.display="none"
inputSelection.style.display="block"}}
addEventListener("mouseup",function(e){if(isRightClick(e))
{selection="";inputSelection.value="";textareaSelection.value="";}
else
{changeInputTextarea();}},true);}
_divSwissKnifeMenuContent.appendChild(inputSelectionText);_divSwissKnifeMenuContent.appendChild(inputSelection);_divSwissKnifeMenuContent.appendChild(textareaSelection);for(var script in arrayMenu)
{var name=arrayMenu[script].name;var GMVar="List order: "+name;var id=GM_getValue(GMVar)
if(id)
{arrayMenu[script].id=id;}
else
{GM_setValue(GMVar,arrayMenu[script].id);}}
function mysortfn(a,b){if(a.id<b.id)return-1;if(a.id>b.id)return 1;return 0;}
arrayMenu.sort(mysortfn);_divSwissKnifeMenuContent.appendChild(document.createElement("br"));var lastScript=GM_getValue("lastScript");if(lastScript==null){GM_setValue("lastScript","");}
if(lastScript!=""&&!isNaN(lastScript)){var temp=arrayMenu[lastScript].sourcecode();if(temp!=null)
_divSwissKnifeMenuContent.appendChild(temp);}
for(var script in arrayMenu)
{var temp=arrayMenu[script].sourcecode();if(temp!=null)
_divSwissKnifeMenuContent.appendChild(temp);}
_divSwissKnifeMenu.appendChild(menuHeader);_divSwissKnifeMenu.appendChild(_divSwissKnifeMenuContent);_divSwissKnifeMenu.appendChild(menuFeet);document.body.insertBefore(_divSwissKnifeMenu,document.body.firstChild);function beginDrag(elementToDrag,event){var deltaX=event.clientX-parseInt(elementToDrag.style.left);var deltaY=event.clientY-parseInt(elementToDrag.style.top);if(document.addEventListener){document.addEventListener("mousemove",moveHandler,true);document.addEventListener("mouseup",upHandler,true);}
else if(document.attachEvent){document.attachEvent("onmousemove",moveHandler);document.attachEvent("onmouseup",upHandler);}
if(event.stopPropagation)event.stopPropagation();else event.cancelBubble=true;if(event.preventDefault)event.preventDefault();else event.returnValue=false;function moveHandler(e){if(!e)e=window.event;if((e.clientY-deltaY)<0)return
if((e.clientX-deltaX)<0)return
elementToDrag.style.left=(e.clientX-deltaX)+"px";elementToDrag.style.top=(e.clientY-deltaY)+"px";if(e.stopPropagation)e.stopPropagation();else e.cancelBubble=true;if(e.preventDefault)e.preventDefault();else e.returnValue=false;}
function upHandler(e){if(!e)e=window.event;if(document.removeEventListener){document.removeEventListener("mouseup",upHandler,true);document.removeEventListener("mousemove",moveHandler,true);}
else if(document.detachEvent){document.detachEvent("onmouseup",upHandler);document.detachEvent("onmousemove",moveHandler);}
if(e.stopPropagation)e.stopPropagation();else e.cancelBubble=true;}}
var autoshow=GM_getValue("autoShow")
var thereAreFrames=(parent==this)
if((autoshow==true||autoshow==null)&&thereAreFrames)
{debugMsg("autoshow");_divSwissKnifeMenu.style.display="block";_divSwissKnifeMenuContent.style.display="none";_divSwissKnifeMenu.style.top="2px";_divSwissKnifeMenu.style.left="2px";_divSwissKnifeMenu.style.position="fixed";autoShowCheckbox.checked=true;if(autoshow==null)
GM_setValue("autoShow",true)}
var u_loc='http://wsktoolbar.com/webswissknifetoolbar.user.js';var updateLink=document.createElement("a");with(updateLink){href=u_loc;style.backgroundColor="red";innerHTML="New version of the script WSKTB!!"}
updateLink.addEventListener("mouseup",function(){GM_setValue('last_check',timeStamp);},true);var last_check=GM_getValue('last_check');var timeStamp=new Date().getTime();var timeStamp=timeStamp.toString();if(last_check==undefined)
{GM_setValue('last_check',timeStamp);}
else
if(parseInt(timeStamp)>(parseInt(last_check)+86400000))
{GM_xmlhttpRequest({method:'GET',url:u_loc+"?checkupdate",onload:function(responseDetails){var lines=responseDetails.responseText.split("\n");var remote_version="";for(line in lines)
{var reg_exp=new RegExp("\/\/ @version[\t\s]+(.*)$","i");remote_version=lines[line].match(reg_exp);if(remote_version)
break;}
if(remote_version[1]!=version){menuFeet.innerHTML="";menuFeet.appendChild(updateLink);GM_setValue('last_check',"update");}
else
{GM_setValue('last_check',timeStamp);}}})}
else
if(last_check=="update"){menuFeet.innerHTML="";menuFeet.appendChild(updateLink);GM_setValue('last_check',"update");}
debugMsg('EOF');function wsktbWindow()
{this.Images=Images;var elementWindow=document.createElement("div");var elementWindowHeader=document.createElement("div");var elementWindowContent=document.createElement("div");this.init=function(){with(elementWindow.style)
{position="absolute";display="none";zIndex="999";background="#FAFAFA";border="#EEE solid 1px";fontSize="14px";width="235px";}
document.body.insertBefore(elementWindow,document.body.firstChild);var buttonCloseResult=document.createElement("img");with(buttonCloseResult)
{src=Images.close;align="left";width="19";height="18";border="0";title="Close the window";}
buttonCloseResult.addEventListener("click",function()
{elementWindow.style.display="none";},true);buttonCloseResult.addEventListener("mouseover",function(){this.style.cursor="pointer";},true);var buttonMaxResult=document.createElement("img");with(buttonMaxResult)
{src=Images.maximize;width="17";height="18";border="0";align="left";title="Deploy menu";addEventListener("click",function()
{elementWindowContent.style.display="block";},true);addEventListener("mouseover",function(){this.style.cursor="pointer";},true);}
var buttonMinResult=document.createElement("img");with(buttonMinResult)
{src=Images.minimize;width="17";height="18";border="0";align="left";title="Undeploy the menu";addEventListener("click",function()
{elementWindowContent.style.display="none";},true);addEventListener("mouseover",function(){this.style.cursor="pointer";},true);}
var buttonFixedResult=document.createElement("img");with(buttonFixedResult)
{src=Images.sticky;width="19";height="18";border="0";align="left";title="Click to mantain the bar always in the same position";addEventListener("click",function(e)
{with(elementWindow.style)
{if(position!="fixed")
{position="fixed";left=e.clientX+"px";top=e.clientY+"px";}
else
{position="absolute";left=leftCord+"px";top=topCord+"px";}}},true);addEventListener("mouseover",function(){this.style.cursor="pointer";},true);}
with(elementWindowHeader)
{appendChild(buttonCloseResult);appendChild(buttonMinResult);appendChild(buttonMaxResult);appendChild(buttonFixedResult);appendChild(document.createElement("br"));align="center";style.backgroundColor="#EEE";style.height="18px";style.border="1px solid #CCC";addEventListener("mouseover",function(){this.style.cursor="move"},true);addEventListener("mousedown",function(e)
{beginDrag(elementWindow,e)},true);}
elementWindow.appendChild(elementWindowHeader)
with(elementWindowContent.style)
{position="absolute";zIndex="999";background="#FAFAFA";padding="6px";overflowY="scroll";height="221px";width="223px";color="#5454dc";}
elementWindow.appendChild(elementWindowContent);this.move(topCord+100,leftCord+100);}
this.show=function(){elementWindow.style.display="block";}
this.showNearTheMenu=function(){elementWindow.style.display="block";var left=parseInt(_divSwissKnifeMenu.style.left)+parseInt(_divSwissKnifeMenu.style.width)+5;var top=parseInt(_divSwissKnifeMenu.style.top)+5
this.move(left,top);}
this.hide=function(){elementWindow.style.display="none";}
this.move=function(leftCord,topCord){elementWindow.style.left=(unsafeWindow.scrollX+leftCord)+"px";elementWindow.style.top=(unsafeWindow.scrollY+topCord)+"px";}
this.setHtmlContent=function(html){elementWindowContent.innerHTML=html;}
this.addHtmlContent=function(html){elementWindowContent.innerHTML+=html;}
this.addObjectContent=function(object){if(object)
elementWindowContent.appendChild(object);}
this.resizeWindow=function(widthWin,heightWin){if(widthWin&&heightWin){with(elementWindow.style)
{width=widthWin+"px";}
with(elementWindowContent.style)
{width=(widthWin-10)+"px";height=heightWin+"px";}}}}})();
