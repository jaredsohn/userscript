// ==UserScript==
// @name           PonyChan Number One Assistant
// @description	   Find all replies to a post in the same ponychan thread
// @namespace      PonyChan_Number_One_Assistant_Greasemonkey_Script_ThatShouldSuffice
// @include        http://www.ponychan.net/chan/*
// @version        8
// ==/UserScript==

// Copyright WayMoreThanRare (waymorethanrare@hush.ai) 2011. Distributed under the GNU General Public License (http://www.gnu.org/copyleft/gpl.html)
// 

// docCookies adapted from https://developer.mozilla.org/En/Document.cookie
// findPos() copied from http://clifgriffin.com/2008/10/14/using-javascript-to-scroll-to-a-specific-elementobject/
docCookies = {
  getItem: function (sKey) {
    if (!sKey || !this.hasItem(sKey)) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
  },
  /**
  * docCookies.setItem(sKey, sValue, vEnd, sPath, sDomain, bSecure)
  *
  * @argument sKey (String): the name of the cookie;
  * @argument sValue (String): the value of the cookie;
  * @optional argument vEnd (Number, String, Date Object or null): the max-age in seconds (e.g., 31536e3 for a year) or the
  *  expires date in GMTString format or in Date Object format; if not specified it will expire at the end of session; 
  * @optional argument sPath (String or null): e.g., "/", "/mydir"; if not specified, defaults to the current path of the current document location;
  * @optional argument sDomain (String or null): e.g., "example.com", ".example.com" (includes all subdomains) or "subdomain.example.com"; if not
  * specified, defaults to the host portion of the current document location;
  * @optional argument bSecure (Boolean or null): cookie will be transmitted only over secure protocol as https;
  * @return undefined;
  **/
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/.test(sKey)) { return; }
    var sExpires = "";
    if (vEnd) {
      switch (typeof vEnd) {
        case "number": sExpires = "; max-age=" + vEnd; break;
        case "string": sExpires = "; expires=" + vEnd; break;
        case "object": if (vEnd.hasOwnProperty("toGMTString")) { sExpires = "; expires=" + vEnd.toGMTString(); } break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
  },
  removeItem: function (sKey) {
    if (!sKey || !this.hasItem(sKey)) { return; }
    var oExpDate = new Date();
    oExpDate.setDate(oExpDate.getDate() - 1);
    document.cookie = encodeURIComponent(sKey) + "=; expires=" + oExpDate.toGMTString() + "; path=/";
  },
  hasItem: function (sKey) { return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie); }
};

function Hash() {
   this.keys=new Array();
   this.values=new Array();
}

Hash.prototype.keys='Keys';
Hash.prototype.values='Values';
Hash.prototype.insert= function(key,value) // note that you can add the same key more than once, but you will only find the first reference
{
  var index=this.keys.length;
  this.keys[index]=key;
  this.values[index]=value;
  return index;
}
Hash.prototype.contains= function(key)
{
  for(var x=0; x<this.keys.length; x++) if(this.keys[x]==key) return true;
  return false;
}
Hash.prototype.value= function(key)
{
  for(var x=0; x<this.keys.length; x++) if(this.keys[x]==key) return this.values[x];
  return null;
}
Hash.prototype.remove=function(key)
{
  for(var x=0; x<this.keys.length; x++) if(this.keys[x]==key) keys[x]=null; // simplistic, but it should suffice
}

   num2ele=new Hash();
   var rootList=new Array();
   var childList=new Hash();
   var OPnum;
   var OPpost;
   var posterList=new Hash();
   var tripList=new Hash();
   
   // cookies
   var searchTypeCookie="searchType";
   var searchTypeCookiePoster="poster";
   var searchTypeCookieTrip="trip";
   
   var searchSelectionCookie="searchSelection";

function analyzeThread(start_number)
{
   //window.alert("analyzeThread");
   //rootList=new Array();
   //childList=new Object();
   //posterList=new Object();
   //tripList=new Object();
   // get the thread
   var threadEles=document.getElementsByClassName("thread");
   if(threadEles.length<1) return;
   var thread=threadEles.item(0);
   
   var replies=thread.getElementsByClassName("reply");
   var curEle=thread;
   var refExp=new RegExp(">>(\\d+)");
   for(var x=-1; x<replies.length;)
   {
      // get post number, populate num2ele & OPnum
      var num=getPostNumber(curEle);
      //window.alert(num);
      if(num==-1  || num<start_number) continue;
      num2ele.insert(num,curEle);
      if(x==-1) 
      {
        OPnum=num;
        OPpost=curEle;
      }

      // populate childList
      var texts=curEle.getElementsByTagName("blockquote");

      if(texts.length<1) continue;
      var text=texts.item(0);
      var threadRefs=0;
      for(var y=0; y<text.childNodes.length; y++)
      {
          var subtext=text.childNodes.item(y).textContent;
          if(subtext.length>0)
          {

             var refs=refExp.exec(subtext);
		 //window.alert(subtext);
		 if(refs)
             {
                //window.alert("REF!");
                for(var z=1; z<refs.length; z++)
                {
			 //window.alert(refs[z]);
                   if(num2ele.contains(refs[z]) && refs[z]<num)
                   {
                      threadRefs++;
                      if(childList.contains(refs[z]))
                      {
                        var refChilds=childList.value(refs[z]);
                        if(!arrayContains(refChilds,num)) refChilds[refChilds.length]=num;
                          //childList[refs[z]][childList[refs[z]].length]=num;
                      }
                      else childList.insert(refs[z],new Array(num));
                   }  
                }
             }
          }
      }
      if(threadRefs==0) rootList[rootList.length]=num; // if post doesn't go to childList, add it to rootList
      // populate PosterList and TripList, because big threads don't load slow enough as it is!
      var posters=curEle.getElementsByClassName("postername");
      if(posters.length>0)
      {
        var poster=posters[0].textContent;
        if(posterList.contains(poster)) posterList.value(poster).push(num);
        else posterList.insert(poster,new Array(num));
      }
      var trips=curEle.getElementsByClassName("postertrip");
      if(trips.length>0)
      {
        var trip=trips[0].textContent;
        if(tripList.contains(trip)) tripList.value(trip).push(num);
        else tripList.insert(trip,new Array(num));
      }
      if(++x<replies.length) curEle=replies.item(x); // wrap up winter
   }
   //window.alert(Object.getOwnPropertyNames(posterList));
   //window.alert(Object.getOwnPropertyNames(childList).length.toLocaleString());
}


function arrayContains(a, v)
{
   for(var x=0; x<a.length; x++)
   {
      if(a[x]==v) return true;
   }
   return false;
}

function collapseReplies(parentCounter, pLevel, pEle, thread)
{
	var level=pLevel+1;
	while(true)
	{
    var nextChild;
    if(pEle) nextChild=pEle.nextSibling;
    else
    {
      var tables=thread.getElementsByTagName("table");
      if(tables.length==0) break;
      nextChild=tables.item(0);
    }
    if(!nextChild) 
    {
      //window.alert("no child");
      break;
    }
    if(nextChild.localName!="table") break;
    if(!nextChild.hasAttribute("n1a_level")) 
    {
      //window.alert("no attribute");
      break;
    }

    if(nextChild.getAttribute("n1a_level")<level) 
    {
      //window.alert(nextChild.getAttribute("n1a_level").toString().concat(" ",level.toString()));
      break;
    }
    thread.removeChild(nextChild);

	}
  setCounterExpanded(parentCounter,false);
}

function ele2table(ele)
{
  if(!ele) return null;
  if(ele.parentNode) 
  {
  ele=ele.parentNode;
  }
  else 
  {
  var e=ele;
  ele=document.createElement("tr"); 
  ele.appendChild(e);
  }
  if(ele.parentNode) ele=ele.parentNode;
  else 
  {
  var e=ele;
  ele=document.createElement("tbody");
  ele.appendChild(e);
  }
  if(ele.parentNode) ele=ele.parentNode;
  else 
  {
  var e=ele;
  ele=document.createElement("table"); 
  ele.appendChild(e);
  }
  return ele;
  
  //window.alert("testtest");
}

function expandReplies(parentCounter,environment)
{
	//window.alert("expandReplies()");
	var parent=parentCounter.getAttribute("postnumber");
	var children=childList.value(parent);

	//var pEle=parent!=OPnum?parentCounter.parentNode.parentNode.parentNode.parentNode.parentNode:null;
  var pEle=parent!=OPnum?ele2table(parentCounter.parentNode.parentNode):null;
	//if(pEle) window.alert(pEle.localName);
	var thread;
	if(environment=="thread") thread=OPpost;
	else if(environment=="peoplesearch") thread=document.getElementsByClassName("n1assistant_peoplesearchresultarea")[0];
	else 
	{
    window.alert("expandReplies(): false environment!");
    return;
  }
	if(!children) return;
	//var exp=parentCounter.getAttribute("n1a_expanded");
  var plevel=0;
	if(pEle)
	{
      if(pEle.hasAttribute("n1a_level")) plevel=Number(pEle.getAttribute("n1a_level"));
	}
	if(parentCounter.getAttribute("n1a_expanded")=="true") 
	{
		collapseReplies(parentCounter, plevel, pEle, thread);
		return;
	}
	else 	/*parentCounter.setAttribute("n1a_expanded","true");*/ setCounterExpanded(parentCounter,true);
	for(var x=0; x<children.length; x++)
	{
		var ctable=prepareExpandedElement(children[x], plevel, parent);
		if(pEle) 
		{
		  //thread.appendChild(pEle.nextSibling);

			thread.insertBefore(ctable,pEle.nextSibling);
		}
		else 
		{
      var tables=thread.getElementsByTagName("table");
      var titem=tables.length>0?tables.item(0):null;
      thread.insertBefore(ctable,titem);
    }

		pEle=ctable;
	}
}

function findPos(obj)
{
	var curtop = 0;
	if (obj.offsetParent) {
		do {
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	return [curtop];
	}
}

function getPostNumber(ele)
{
   var reflinks=ele.getElementsByClassName("reflink");
   if(reflinks.length<1) return -1;
   var reflink=reflinks.item(0);
   if(reflink.childNodes.length<3) return -1;
   var linkEle=reflink.childNodes.item(2);
   if(linkEle.localName!="a") return -1;
   return linkEle.textContent;
}

function init()
{
   if(isThreadURL()!=-1) 
	{
		analyzeThread(0);
		initReplyCounter();
		initRootViewer();
		initTopPeopleSearch();
		document.addEventListener("click",function(event) {scrollToReplySlot(event)},false);
		scrollToReplyLoad();
	}
}

function initTopPeopleSearch()
{
  var postarea=document.getElementsByClassName("postarea")[0];
  var parent=postarea.parentNode;
  var searcharea=document.createElement("div");
  searcharea.setAttribute("class","n1assistant_peoplesearch");
  //searcharea.addEventListener("click", 
  //  function(event) {
  //    if(event.target.getAttribute("class")=="n1assistant_peoplesearchoption") peopleSearch(event);
  //  }, false);
  searcharea.addEventListener("click",
	function(event) 
	{ 
		if(event.target.getAttribute("class")=="n1assistant_replycounter")
			{ expandReplies(event.target,"peoplesearch"); } 
	}, false);
  var toptable=searcharea.appendChild(document.createElement("table"));
  var toptablebody=toptable.appendChild(document.createElement("tbody"));
  var toptablerow=toptablebody.appendChild(document.createElement("tr"));
  var toptablelabelcell=toptablerow.appendChild(document.createElement("td"));
  var toptableselectcell=toptablerow.appendChild(document.createElement("td"));
  toptablelabelcell.textContent="Search for user: ";
  var searchform=toptableselectcell.appendChild(document.createElement("form"));
  var searchselect=searchform.appendChild(document.createElement("select"));
  searchselect.addEventListener("change",function(event) {peopleSearch(event)},false);
  var searchresultarea=searcharea.appendChild(document.createElement("div"));
  searchresultarea.setAttribute("class","n1assistant_peoplesearchresultarea");
  searcharea.appendChild(document.createElement("hr"));
  
  // population searchselect
    var searchnone=searchselect.appendChild(document.createElement("option"));
  searchnone.textContent="---";
  searchnone.setAttribute("type","none");
  searchnone.setAttribute("class","n1assistant_peoplesearchoption");
  var searchname=searchselect.appendChild(document.createElement("optgroup"));
  searchname.setAttribute("label","Name");
  var nameArray=posterList.keys.concat(); // well, it gets the job done
  nameArray.sort(stringSort);
  // cookie cutting stuff
  var cookieSearchType=docCookies.getItem(searchTypeCookie);
  var cookieSearchSelection=docCookies.getItem(searchSelectionCookie);
  for(var x=0; x<nameArray.length; x++) 
  {
    var curName=searchname.appendChild(document.createElement("option"));
    curName.textContent=nameArray[x];
    curName.setAttribute("type","name");
    curName.setAttribute("class","n1assistant_peoplesearchoption");
    if(cookieSearchType==searchTypeCookiePoster && cookieSearchSelection==nameArray[x]) 
    {
      searchselect.selectedIndex=searchselect.length-1;
      peopleSearchName(curName,searchresultarea);
    }
    //curName.addEventListener("click",function(event) { window.alert(event.target.textContent); }, false);
  }
  var searchtrip=searchselect.appendChild(document.createElement("optgroup"));
  searchtrip.setAttribute("label","trip");
  var tripArray=tripList.keys.concat();
  //window.alert(tripList.keys);
  tripArray.sort(stringSort);
  //window.alert(tripList.keys);
  for(var x=0; x<tripArray.length; x++) 
  {
    var curTrip=searchtrip.appendChild(document.createElement("option"));
    curTrip.textContent=tripArray[x];
    curTrip.setAttribute("type","trip");
    curTrip.setAttribute("class","n1assistant_peoplesearchoption");
    if(cookieSearchType==searchTypeCookieTrip && cookieSearchSelection==tripArray[x])
    {
      searchselect.selectedIndex=searchselect.length-1;
      peopleSearchTrip(curTrip,searchresultarea);
    }
  }
  // add to document
  parent.insertBefore(searcharea,postarea.nextSibling);
}

function stringSort(a,b)
{
  var al=a.toLowerCase();
  var bl=b.toLowerCase();
  if(al<bl) return -1;
  if(al>bl) return 1;
  return 0;
}

function peopleSearch(event)
{ 
  var resultArea=document.getElementsByClassName("n1assistant_peoplesearchresultarea")[0];
  //window.alert(event.target.textContent);
  peopleSearchClear(resultArea);
  var item=event.target.options[event.target.selectedIndex];
  if(item.getAttribute("type")=="name") peopleSearchName(item, resultArea);
  else if(item.getAttribute("type")=="trip") peopleSearchTrip(item, resultArea);
}

function peopleSearchClear(resultArea)
{
  var children=resultArea.childNodes;
  while(children.length>0) resultArea.removeChild(children.item(0));
}

function peopleSearchName(item,resultArea)
{
  var posts=posterList.value(item.textContent);
  for(var x=0; x<posts.length; x++)
    if(posts[x]!=OPnum)resultArea.appendChild(prepareExpandedElement(posts[x],-1,-1));
  //document.cookie=searchTypeCookie.concat(searchTypeCookiePoster);
  //document.cookie=searchSelectionCookie.concat(encodeURIComponent(item.textContent));
  docCookies.setItem(searchTypeCookie,searchTypeCookiePoster);
  docCookies.setItem(searchSelectionCookie,item.textContent);
}

function peopleSearchTrip(item,resultArea)
{
  var posts=tripList.value(item.textContent);
  for(var x=0; x<posts.length; x++)
    if(posts[x]!=OPnum)resultArea.appendChild(prepareExpandedElement(posts[x],-1,-1));
  docCookies.setItem(searchTypeCookie,searchTypeCookieTrip);
  docCookies.setItem(searchSelectionCookie,item.textContent);
}

function initReplyCounter()
{
   //window.alert("initReplyCounter()");
   var nums=num2ele.keys;
   var thread=OPpost;
   thread.addEventListener("click",
	function(event) 
	{ 
		if(event.target.getAttribute("class")=="n1assistant_replycounter")
			{ expandReplies(event.target,"thread"); } 
	}, false);
   for(var x=0; x<nums.length; x++)
  {
	var num=nums[x];
	var curEle=num2ele.value(num);
	//var debugnum=getPostNumber(curEle);
	//window.alert(num.toLocaleString().concat(" -> ", debugnum.toLocaleString()));
	var extrabtnss=curEle.getElementsByClassName("extrabtns");
	if(extrabtnss.length==0) continue;
	var extrabtns=extrabtnss.item(0);
  if(childList.contains(num))
    {
		var replycount=childList.value(num).length;
		var ReplyCounter=document.createElement("a");
            ReplyCounter.setAttribute("class", "n1assistant_replycounter");
		ReplyCounter.setAttribute("title", "Expand");
		//ReplyCounter.setAttribute("n1a_expanded", "false");
		setCounterExpanded(ReplyCounter,false);

		ReplyCounter.setAttribute("postnumber", num.toLocaleString());
		ReplyCounter.textContent=replycount.toLocaleString().concat(replycount==1?String(" reply"):String(" replies"));
		extrabtns.appendChild(ReplyCounter);
    }
  }
}

function initRootViewer() // this was rather suspiciously named before. 
{

  //window.alert("initRootReplyViewer");
  
  var thread=OPpost;
  var extrabtns=thread.getElementsByClassName("extrabtns").item(0);
    //window.alert("done");
  var rootViewer=document.createElement("a");
  rootViewer.textContent=" Root posts";
  rootViewer.addEventListener("click", viewRootPosts,false);
  extrabtns.appendChild(rootViewer);
  //window.alert("done");
}

function isThreadURL()
{
   var loc=String(window.location);
   var reg=RegExp("^http://www.ponychan.net/chan/\\w+/res/"); // that oughta suffice for now
   var retval=loc.search(reg);
   return retval;
}

function prepareExpandedElement(child, pLevel, postnumber)
{
	//window.alert("prepareExpandedElement "+pLevel.toLocaleString());
	var table=ele2table(num2ele.value(child));
	var ctable=table.cloneNode(true); // getting up to table. That will fail if the child is the op
	// bumping to the right
	var ctablerows=ctable.getElementsByTagName("tr");
	var ctablerow=ctablerows.item(0);
	var tablebump=document.createElement("td");
	tablebump.setAttribute("width","40");
	tablebump.setAttribute("class","n1a_bump");
  var level=pLevel+1;
  //var debug="";
	//for(var z=0; z<ctable.childNodes.length; z++) debug=debug.concat(ctable.childNodes.item(z).localName," ");
	//window.alert(debug);
	for(var y=0; y<level; ++y) 
    ctablerow.insertBefore(tablebump.cloneNode(false),ctablerow.childNodes.item(0));
	ctable.setAttribute("n1a_level",level.toString());
	// highlighting reference
	var cblockquote=ctable.getElementsByTagName("blockquote").item(0);
	var links=cblockquote.getElementsByTagName("a");
	if(links && postnumber!=-1)
	{
		var reftext=">>".concat(postnumber.toLocaleString());
		var refexp=new RegExp("^".concat(reftext,"$"));

		for(var y=0; y<links.length; y++)
		{
			var link=links.item(y);
			if(link.textContent.search(refexp)!=-1) 
			{
				link.textContent="";
				var bigRef=document.createElement("big");
				bigRef.textContent=reftext;
				link.appendChild(bigRef);  
			}
		}
	}
	//window.alert("prepareExpandedElement done");
	return ctable;
}

function scrollToReply(num)
{
  var thread=OPpost;
  var alist=OPpost.getElementsByTagName("a");
  for(var x=0; x<alist.length; x++)
  {
    if(!alist.item(x).hasAttribute("name")) continue;
    if(alist.item(x).getAttribute("name")==num)
    {
      window.scrollTo(0,findPos(alist.item(x)));
      break;
    }
  }
}

function scrollToReplySlot(event)
{
  if(event.target.tagName.toLowerCase()=="a" && event.target.hasAttribute("class"))
  {
    var r=new RegExp("^ref");
    if(!r.test(event.target.getAttribute("class"))) return;
  }
  else return;
  scrollToReply(event.target.textContent.substring(2));
}

function scrollToReplyLoad()
{
  var loc=new String(window.location);
  var n=loc.lastIndexOf("#");
  if(n==-1) return;
  var num=loc.substring(n+1);
  scrollToReply(num);
}

function setCounterExpanded(ReplyCounter, bval)
{
  ReplyCounter.setAttribute("n1a_expanded",bval?String("true"):String("false"));
  ReplyCounter.setAttribute("title",bval?String("Collapse"):String("Expand"));
}

function table2ele(table) // untested
{
  var children=table.getElementsByClassName("reply");
  if(!children) return null;
//  window.alert(children.length.toString());
  if(children.length==0) return null;
  return children.item(0);
}

function viewRootPosts()
{
  var thread=OPpost;
  //window.alert(thread);
  var replies=thread.getElementsByClassName("reply");
  //window.alert(replies.length.toString());
  for(var x=0; x<replies.length;)
  {
    var item=replies.item(x);
    var num=getPostNumber(item);
    //window.alert(num.toString());
    if(!arrayContains(rootList,num)) thread.removeChild(ele2table(item));
    else ++x;
  }
  //window.alert(replies.length.toString());
}

init();
