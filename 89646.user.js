Code:

// ==UserScript==
// @name          PunBB Ignore2
// @namespace     http://tnaboard.com/
// @description   Censors Shitposters & adds Search Reviews, Post Review & atf/tdl/rdl lists
// @include       http://*tnaboard.com/*
// ==/UserScript==

/*
* code is by iiam via http://userscripts.org/scripts/show/8537
* + only changed very slightly to work on TNA, (GGTKPDX)
* + Changed slightly by Porkmeister62 on TNA to add Review Search, rdl/dl, & view rdl/tdl/atf
*/

var startTime = new Date();

/* this is the list of userids to ignore */
var ignore_list = [];
var ignoreListKey = "sassignorelist";
var providerNameListKey = "tna_provider_name_list";
var atfListKey = "tna_atf_list";
var tdlListKey = "tna_tdl_list";
var dnlListKey = "tna_dnl_list";
var rdlListKey = "tna_rdl_list";

var posterId = -1;
var posterName = "";

var providerId = -1;
var providerName = "";

var locationId = "3";
var providerListMenu;

//##########################################################################


function match_end(str, end) {
    var sl = str.length;
    var el = end.length;
    if(-1 == (sl - el)) {
        return false;
    }
    return (str.indexOf(end) == (sl - el));
}

function divContainsPosterIdLink(div , profileid ) {
  var a = div.getElementsByTagName("A");
  var m = "profile.php?id="+profileid;
  for ( var i = 0 ; i < a.length ; i++ ) {
    if (match_end(a[i].href, m)) {
      return true;
    }
  }
  return false;
}

function getPosterName(div) {
    if (posterName == "" || posterId < 0) {
        posterId =  getPosterId(div);
        return posterName;    
    }    
}

function getPosterId(div) {
    
    var a = div.getElementsByTagName("A");
    var offset;
    var value = 0;
    var str;
    for ( var i = 0 ; i < a.length ; i++ ) {
        str = a[i].href;
        offset = str.indexOf("profile.php?id=");
        if(-1 == offset) {
            continue;
        }
        // is this even needed?
        if((str.length-offset) < 1) {
            continue;
        }
        value = str;
        value = 1 * str.slice(offset+15).valueOf();
        if(value == -1 || isNaN(value)) {
            continue;
        }
        posterName = a[i].textContent;
        posterId = value;
        return value;
    }
    return -1;
}

function unIgnorePost(event) {
  var buttonpressed = event.currentTarget;
 
  buttonpressed.parentNode.style.display = "none";
  buttonpressed.parentNode.nextSibling.style.display = null;
 
  getPosterId(buttonpressed.parentNode.parentNode);
 
  event.preventDefault();
}

function IgnorePost(event) {
  var buttonpressed = event.currentTarget;
  
  var common = buttonpressed.parentNode.parentNode.parentNode.parentNode.parentNode;
  common.previousSibling.style.display = null;
  common.style.display = "none";
 
  event.preventDefault();
}

function isPosterIgnored(div) {
  var value = getPosterId(div);
  for (var j = 0 ; j < ignore_list.length ; j++) {
    if(value == ignore_list[j]) {
GM_log("isPosterIgnored ignoring: " + value);
      return true;
    }
  }
}

function removeIgnoreId(div) {
  var value = getPosterId(div);
  for (var j = 0 ; j < ignore_list.length ; j++) {
    if(value == ignore_list[j]) {
      ignore_list.splice(j,1);
    }
  }
}

function toggleIgnore(event) {
  var buttonpressed = event.currentTarget;
  // <div id=p661487 ...><div>Show Post<div class="inbox"><div class="postleft"><dl><dd><a ...>
  var postdiv = buttonpressed.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    
  var test = isPosterIgnored(postdiv);
  var posterId = getPosterId(postdiv);
  var r;
  var changed = false;
  if(test > 0) {
    r = confirm("Are you sure you want to REMOVE this poster[" + posterId + "] from your ignore list?");
    if(true == r) {
      removeIgnoreId(postdiv);
      buttonpressed.textContent = "- Ignore";
      changed = true;
    }
  }
  else {
    r = confirm("Are you sure you want to ADD this poster[" + posterId + "] to your ignore list?");
    if(true == r) {
      ignore_list.push(posterId);
      buttonpressed.textContent = "- ***IGNORED***";
      changed = true;
    }
  }
  // Update the persistent cookie data
  if(changed) {
    GM_setValue(ignoreListKey,ignore_list.join(','));
  }

  event.preventDefault();
}

// ------------------------------------------------------------------------

function removeProviderFromBlockedList(event) {

    mclose();
    
    var link = event.target;
    var name = link.textContent;

    var list = GM_getValue(providerNameListKey,",");
    
    if( list.indexOf("," + name + ",") <= 0 ) { return; }
    
    list = list.replace(/,,/g,",");
    list = list.replace("," + name + ",",",");
    if (list.length <=0) {list = ",";}
    GM_setValue(providerNameListKey,list);
    
    // rebuild blocked provider list.
    removeProviderMenu();
    addProviderListMenuToTopMenuBar();
    hideBlockedProviderAds();
    
}

function removeProviderMenu() {
    var menubar = document.getElementById("brdmenu");
    if (menubar == null) {
        return;
    }
    var list = menubar.getElementsByTagName("ul");
    var menu = document.getElementById("sddm");
    if(menu) {    list[0].removeChild(menu); }
}

function toggleListEntry(tag, listKey, listName) {

    var providerName = tag.name;
    var list = GM_getValue(listKey,","); 
    
    if (list.indexOf("," + providerName + ",") < 0) {
        // add to list
        //if (confirm("Add '" + providerName + "' to your '" + listName + "' List?")) {
            list += providerName + ",";
            tag.textContent = tag.textContent.replace(/\+\sAdd/,"- Remove");
        //}
    } 
    else {
        // remove from list
        //if (confirm("Remove '" + providerName + "' from your '" + listName + "' List?")) {
            list = list.replace(providerName + ",", "");
            tag.textContent = tag.textContent.replace(/\-\sRemove/,"+ Add");
        //}
    }
     GM_setValue(listKey,list); 

}


function addProviderToBlockedList(event) {

    var link = event.currentTarget;

    if (link.name) {
    
        toggleListEntry(link, providerNameListKey, "Blocked Providers Advertisements");

        removeProviderMenu();
        addProviderListMenuToTopMenuBar();
        hideBlockedProviderAds();
    }
    
}

function clearBlockedProviderMenu(event) {
    GM_setValue(providerNameListKey,",");        
    removeProviderMenu();
    addProviderListMenuToTopMenuBar();
    hideBlockedProviderAds();
}

function blockProviderAds(event) {

    var tag = event.target;
    while (tag.tagName != 'A' && tag.tagName != "BODY") {tag = tag.parentNode;}

    toggleListEntry(tag, providerNameListKey, "Blocked Providers Advertisements");

    removeProviderMenu();
    addProviderListMenuToTopMenuBar();
    hideBlockedProviderAds();

    IgnorePost(event);
    
     event.preventDefault();

}


function toggleProviderInATFList(event) {
    toggleListEntry(event.target,atfListKey,"All Time Favorites");    
}

function toggleProviderInTDList(event) {
    toggleListEntry(event.target,tdlListKey,"To Do");    
}

function toggleProviderInDNList(event) {
    toggleListEntry(event.target,dnlListKey,"Done");    
}
function toggleProviderInRDList(event) {
    toggleListEntry(event.target,rdlListKey,"ReDo");    
}

function addProviderManagementLinks(optionslocation) {
    
    providerId = posterId;
    providerName = posterName;
    
    // ---------------------- add Search Reviews ---------
    var searchReview = document.createElement("a");
    searchReview.title = "search for reviews of provider";
    searchReview.href = "//www.tnaboard.com/search.php?fid=" + (1+locationId) + "&provider=" + providerName.replace(/\s+/g,"\%20");
    searchReview.textContent = "Search for provider reviews";
    var ee = document.createElement("ee");
    ee.appendChild(searchReview);
    optionslocation.appendChild(ee);

    // ---------------------------------------------------
    var postReview = document.createElement("a");
    postReview.title = "post a review for provider " + providerId;
    postReview.href = "/review_post.php?fid=" + (1+locationId) + "&provider=" + providerName.replace(/\s+/g,"\%20");
    postReview.textContent = "Post A Review";
    
    var dd = document.createElement("dd");
    dd.appendChild(postReview);
    optionslocation.appendChild(dd);
    
    
    // ---------- ATF -----------------------------------------
    var atfList = GM_getValue(atfListKey,","); 
    
    var addToATF = document.createElement("a");
    
    if (atfList.indexOf("," + providerName + ",") < 0) {
        addToATF.textContent = "+ Add to ATF";
        addToATF.title = "Click to add " + providerName + "to your 'All Time Favorites' list";
    } else {
        addToATF.textContent = "- Remove from ATF";    
        addToATF.title = "Click to remove " + providerName + "from your 'All Time Favorites' list";
    }
    addToATF.name = providerName;
    
    addToATF.addEventListener("click",toggleProviderInATFList,true);          

    dd = document.createElement("dd");
    dd.appendChild(addToATF);
    optionslocation.appendChild(dd);    
    
    // --------- TDL ------------------------------------------
    var tdlList = GM_getValue(tdlListKey,","); 
    
    var addToTDL = document.createElement("a");
    
    if (tdlList.indexOf("," + providerName + ",") < 0) {
        addToTDL.textContent = "+ Add to TDL";
        addToTDL.title = "Click to add " + providerName + " to your 'To Do list'";
    } else {
        addToTDL.textContent = "- Remove from TDL";    
        addToTDL.title = "Click to remove " + providerName + " from your 'To Do List'";
    }
    addToTDL.name = providerName;
    
    addToTDL.addEventListener("click",toggleProviderInTDList,true);          

    dd = document.createElement("dd");
    dd.appendChild(addToTDL);
    optionslocation.appendChild(dd);
    
    dd = document.createElement("dd");
//    dd.appendChild(document.createElement("br"));
    optionslocation.appendChild(dd);

    // --------- Done List ------------------------------------------
    var dnlList = GM_getValue(dnlListKey,","); 
    
    var addToDNL = document.createElement("a");
   
    if (dnlList.indexOf("," + providerName + ",") < 0) {
        addToDNL.textContent = "+ Add to Done List";
        addToDNL.title = "Click to add " + providerName + " to your 'Done List'";
    } else {
        addToDNL.textContent = "- Remove from Done List";    
        addToDNL.title = "Click to remove " + providerName + " from your 'Done List'";
    }
    addToDNL.name = providerName;
    
    addToDNL.addEventListener("click",toggleProviderInDNList,true);          

    dd = document.createElement("dd");
    dd.appendChild(addToDNL);
    optionslocation.appendChild(dd);
    
    dd = document.createElement("dd");
 //   dd.appendChild(document.createElement("br"));
    optionslocation.appendChild(dd);

    // ---------- Redo List -----------------------------------------
    var rdlList = GM_getValue(rdlListKey,","); 
    
    var addToRDL = document.createElement("a");
    
    if (rdlList.indexOf("," + providerName + ",") < 0) {
        addToRDL.textContent = "+ Add to Redo List";
        addToRDL.title = "Click to add " + providerName + "to your 'Redo List'";
    } else {
        addToRDL.textContent = "- Remove from Redo List";    
        addToRDL.title = "Click to remove " + providerName + "from your 'Redo List'";
    }
    addToRDL.name = providerName;
    
    addToRDL.addEventListener("click",toggleProviderInRDList,true);          

    dd = document.createElement("dd");
    dd.appendChild(addToRDL);
    optionslocation.appendChild(dd);
    
    dd = document.createElement("dd");
    dd.appendChild(document.createElement("br"));
    optionslocation.appendChild(dd);

    // ---------------------------------------------------
    var blockAd = document.createElement("a");
    blockAd.title = "Click to block all Ads from " + providerName;
    blockAd.name = posterName;
    blockAd.textContent = "- Block All Ads from ";

    var boldName = document.createElement("b");
    boldName.textContent = providerName;                
    blockAd.appendChild(boldName);
    
    blockAd.addEventListener("click",blockProviderAds,true);          

    dd = document.createElement("dd");
    dd.appendChild(blockAd);
    optionslocation.appendChild(dd);

}


// -------------------------------------------------

// call this from viewtopic page
function setupIgnores() {

    if (document.location.href.indexOf("/viewtopic.php?id=") < 0) { return;}
    
    var savedlist = GM_getValue(ignoreListKey,""); 
    ignore_list = savedlist.split(',');
    
    var divs = document.getElementsByTagName("DIV");
    var d;
    var j = 0;
    for (var i = 0 ; i < divs.length ; i++ ) {
        if (divs[i].className.match(/blockpost/)) {

            var divPostContent = divs[i];
            var divPostBody = divPostContent.getElementsByTagName("div")[0];
            
            posterId = getPosterId(divPostContent);
            var isIgnored = isPosterIgnored(divPostContent);
    
                            
            var optionslocation = divPostContent.getElementsByTagName("dl")[0];
            
            var dd = document.createElement("dd");
            dd.appendChild(document.createElement("br"));
            optionslocation.appendChild(dd);

            if (divs[i].className.match(/firstpost/)) {
                addProviderManagementLinks(optionslocation);
                
                dd = document.createElement("dd");
                dd.appendChild(document.createElement("br"));
                optionslocation.appendChild(dd);

            } 
            
            //
            var hidebutton = document.createElement("a");
            hidebutton.title = "click to hide this post from '" + posterName + "'. id=" + divPostContent.id;//will be needed later i think
            //hidebutton.href = "#";
            hidebutton.addEventListener("click",IgnorePost,true);
            hidebutton.textContent = "- Hide post";
            
            dd = document.createElement("dd");
            dd.appendChild(hidebutton);
            optionslocation.appendChild(dd);
            
            //
            var ignoredStatusString = "- Ignore ";
            if(isIgnored) {
                ignoredStatusString = "- *** IGNORED***";
            }

            var toggleIgnorebutton = document.createElement("a");
            toggleIgnorebutton.title = "click to ignore all posts from '" + posterName + "'. poster id=" + divPostContent.id;//will be needed later i think
            toggleIgnorebutton.addEventListener("click",toggleIgnore,true);          

            toggleIgnorebutton.textContent = ignoredStatusString;
            var boldName = document.createElement("b");
            boldName.textContent = posterName;
            toggleIgnorebutton.appendChild(boldName);
            
            dd = document.createElement("dd");
            dd.appendChild(toggleIgnorebutton);
            optionslocation.appendChild(dd);
                
            /////
            
            var showbutton = document.createElement("a");
            showbutton.title = "Click to show this post from '" + posterName + "': id=" + divPostContent.id; //will be needed later i think
            showbutton.href = "#";
            showbutton.addEventListener("click",unIgnorePost,true);         
            showbutton.textContent = "- Show post from ";
            
            boldName = document.createElement("b");
            boldName.textContent = posterName;
            showbutton.appendChild(boldName);
            
            var showbuttonarea = document.createElement("div");
            showbuttonarea.appendChild(showbutton);
            
            divPostContent.insertBefore(showbuttonarea,divPostBody);
            
            /////
            
            // Toggle these... (when one is on, turn the other off).
            if(isIgnored) {
                divPostBody.style.display = "none";
                //showbutton.parentNode.style.display = "none";
            }
            else {
                //divPostBody.style.display = "none";
                //showbuttonarea = "none";
                showbutton.parentNode.style.display = "none";
            }
            
        }
        
    }
}


//##########################################################################

function trim(stringToTrim) {
    return stringToTrim.replace(/^\s+|\s+$/g,"");
}
function ltrim(stringToTrim) {
    return stringToTrim.replace(/^\s+/,"");
}
function rtrim(stringToTrim) {
    return stringToTrim.replace(/\s+$/,"");
}

// CALL AT STARTUP
function getLocationId() {
    // get previous page url, grab the id
    // should be in the following format.
    // http://tnaboard.com/viewforum.php?id=3
    var searchString = "/viewforum.php?id=";
    
    var url = document.referrer;
    
    var pos = url.indexOf(searchString) + searchString.length;
    if (pos <= searchString.length) {
	return;
    }
    
    var id = url.substring(pos);
    
    locationId = 1 * id.valueOf();
}



// ------------------------------------------------------------------------

// CALL ON PAGE LOAD
// Added by Porkmeister62 Nov 2010

function setSearchSubject() {

    var url = document.location.href;
    if (url.indexOf("/search.php\?fid=") <= 0) { 
	return;
    }
    
    var form = null;
    var forms = document.forms;  
    for(var i = 0; i < forms.length && form == null; i++) {
        if (forms[i].id == "search") { 
		form = forms[i];
	}
    }
    if (form == null) {
        alert("search:document.post not found");
        return;
    }

    var name = url.substring(url.indexOf("&provider=")+10);
    name = name.replace(/%20/g," ");

    var input = form.getElementsByTagName("input");
    for( i = 0; i < input.length; i++) {
        if (input[i].name == "keywords" || input[i].id == "keywords") {
            input[i].value=name;
        }
    }
    input = form.getElementsByTagName("OPTION");
    for( i = 0; i < input.length; i++) {
        if (input[i].value == 4) {
            input[i].selected=true;
        }
    }
    
}


// ------------------------------------------------------------------------
// CALL ON PAGE LOAD

function setReviewSubject() {
    var url = document.location.href;
    if (url.indexOf("/review_post.php") <= 0) { 
	return;
    }
    
    var form = null;
    var forms = document.forms;
    for(var i = 0; i < forms.length && form == null; i++) {
        if (forms[i].id == "post") { 
		form = forms[i];
	}
    }

    if (form == null) {
        alert("review:document.post not found");
        return;
    }

    var name = url.substring(url.indexOf("&provider=")+10);

    name = name.replace(/%20/g," ");

    var input = form.getElementsByTagName("input");
    for( i = 0; i < input.length; i++) {

        if (input[i].name == "req_subject" || input[i].id == "req_subject") {
            input[i].value="REV: " + name;
            return;
        }
    }
    
}


// ------------------------------------------------------------------------

function toggleDisplayProviderAd(adRow,providerName) {

    var providerList = GM_getValue(providerNameListKey,",");
    if (providerList.indexOf("," + providerName + ",") < 0) {
        adRow.style.display = "";
    } else {
        adRow.style.display = "none";
    }
}

function hideBlockedProviderAds() {
    var tableRows = document.getElementsByTagName("TR");
    if (tableRows.length <= 0) { return; }
    
    var adIndex = 0;
    for(adIndex = 0; adIndex< tableRows.length; adIndex++) {
        
        var adRow = tableRows[adIndex];
        var providerName = getProviderName(adRow);
        
        if (providerName == "") { continue; }

        toggleDisplayProviderAd(adRow,providerName);
        
    }
}

function getProviderName(adListingRow) {

    var userSpanList = adListingRow.getElementsByTagName("SPAN");
    var isProviderAd = false;
    var spanTag;
    for (var i = 0; isProviderAd == false && i < userSpanList.length; i++) {
        spanTag = userSpanList[i];
        if(spanTag.className.match(/byuser/)) {
            isProviderAd = true;
            break;
        } 
    }
    if (!isProviderAd){
        return providerName="";
    }
    
    var name = spanTag.textContent;
    name = name.replace(/&nbsp;/ig," ");
    name = name.replace(/^\s+|\s+$/g,"");
    name = name.replace(/^by\s/i,"");
    name = name.replace(/,/g,".");
        
    return providerName = name;

}

function getDivForAdListingIcon(adListingRow) {
    var divList = adListingRow.getElementsByTagName("div");
    for (var x = 0; x < divList.length; x++) {
        var div = divList[x];
        if (div.className.match(/icon/)) {
            return div;
        }
    }
    return null;
}

function isMemberOfList(list, name) {
    return list.indexOf("," + name + ",") >= 0;
}

// call this on the ad listing page
function setupIgnoredProviderLinks() {

    var url = document.location.href;
    if (url.indexOf("/viewforum.php?id=") <= 0) { return; }

    var atfList = GM_getValue(atfListKey,",");
    var tdlList = GM_getValue(tdlListKey,",");
    var dnlList = GM_getValue(dnlListKey,",");
    var rdlList = GM_getValue(rdlListKey,",");
 
    var tableRows = document.getElementsByTagName("TR");
    
    if (tableRows.length <= 0) { return; }
    
    for(var adIndex = 0; adIndex < tableRows.length; adIndex++) {
         
        var adRow = tableRows[adIndex];
        var providerName = getProviderName(adRow);
        
        if (providerName.length <= 0) { continue; }
    
        var iconTitle = "";
        if (isMemberOfList(tdlList,providerName)) {
            iconTitle += providerName + " is on your TDL;\n";
            var td = adRow.getElementsByTagName("td");
            for(var i = 0; i < td.length; i++) {
                td[i].style.background = "LightGreen";
            }
        }
        else if (isMemberOfList(rdlList,providerName)) {
            iconTitle += providerName + " is on your RDL;\n";
            var td = adRow.getElementsByTagName("td");
            for(var i = 0; i < td.length; i++) {
                td[i].style.background = "LightBlue";
            }
        } 
        else if (isMemberOfList(dnlList,providerName)) {
            iconTitle += providerName + " is on your Done List;\n";
            var td = adRow.getElementsByTagName("td");
            for(var i = 0; i < td.length; i++) {
                td[i].style.background = "LightGrey";
            }
        } 
        else if (isMemberOfList(atfList,providerName)) {
            iconTitle += providerName + " is on your ATF;\n";
            var td = adRow.getElementsByTagName("td");
            for(var i = 0; i < td.length; i++) {
                td[i].style.background = "Gold";
            }
        } 
        

        var toggleAdLink = document.createElement("a");
        toggleAdLink.name = providerName;
        
        if (iconTitle.length <= 0) {
            iconTitle += "Click to hide all ads from " + providerName;
            toggleAdLink.addEventListener("click",addProviderToBlockedList, false);
        } else {
            iconTitle += "   Please remove " + providerName + " from your list before banning her posts.";
        }
        toggleAdLink.title = iconTitle;
        
        // get the icon div and put it inside an anchor link with a toggle event.
        var icon = getDivForAdListingIcon(adRow);

        if("undefined" == typeof icon || icon == null) { 
            alert("no icon div found for " + adRow);
            continue;
        }
        
        var iconParent = icon.parentNode;
        iconParent.insertBefore(toggleAdLink,icon);
        toggleAdLink.appendChild(icon);    

        toggleDisplayProviderAd(adRow,providerName);
    }
}


// ------------------------------------------------------------------------




/*
// to pass a callback function into an object or other function.
myFunction(myCallBack1);

// to pass callback function that requires arguments
myFunction(function(){myCallBack1(param1, param2);});
*/



function testMenuObject() {
    alert("test new menu object!!1");
}

// When user clicks show rdl, display all items in the rdl list
function rdlMenuObject() {
    GM_log("start of rdl menu object!!") ;
    var rdlMsg = "\tRDL List \n\n" ;
    var rdlList = GM_getValue(rdlListKey,",") ;
    var providerNames = rdlList.split(",") ;
    var rdlProviderName = "";
    for(var i = 0; i < providerNames.length-1; i++) {
        rdlProviderName = providerNames[i] ;
        if (rdlProviderName.length <= 0) {
             continue ;
        }

	rdlMsg = rdlMsg + rdlProviderName + "\n" ;
    }
    alert(rdlMsg);

}

// When user clicks show dnl, display all items in the dnl list
function dnlMenuObject() {
    GM_log("start of dnl menu object!!") ;
    var dnlMsg = "\tDone List \n\n" ;
    var dnlList = GM_getValue(dnlListKey,",") ;
    var providerNames = dnlList.split(",") ;
    var tdlProviderName = "";
    for(var i = 0; i < providerNames.length-1; i++) {
        dnlProviderName = providerNames[i] ;
        if (dnlProviderName.length <= 0) {
             continue ;
        }

	dnlMsg = dnlMsg + dnlProviderName + "\n" ;
    }
    alert(dnlMsg);

}

// When user clicks show tdl, display all items in the tdl list
function tdlMenuObject() {
    GM_log("start of tdl menu object!!") ;
    var tdlMsg = "\tTDL List \n\n" ;
    var tdlList = GM_getValue(tdlListKey,",") ;
    var providerNames = tdlList.split(",") ;
    var tdlProviderName = "";
    for(var i = 0; i < providerNames.length-1; i++) {
        tdlProviderName = providerNames[i] ;
        if (tdlProviderName.length <= 0) {
             continue ;
        }

	tdlMsg = tdlMsg + tdlProviderName + "\n" ;
    }
    alert(tdlMsg);

}

// When user clicks show atf, display all items in the tdl list
function atfMenuObject() {
    GM_log("start of atf menu object!!") ;
    var atfMsg = "\tATF List \n\n" ;
    var atfList = GM_getValue(atfListKey,",") ;
    var providerNames = atfList.split(",") ;
    var atfProviderName = "";
    for(var i = 0; i < providerNames.length-1; i++) {
        atfProviderName = providerNames[i] ;
        if (atfProviderName.length <= 0) {
             continue ;
        }

	atfMsg = atfMsg + atfProviderName + "\n" ;
    }
    alert(atfMsg);

}

//##########################################################################

var timeout         = 500;
var closetimer        = 0;
var ddmenuitem      = 0;

// open hidden layer
function mopen(event)
{    
    // cancel close timer
    mcancelclosetime();

    // close old layer
    if(ddmenuitem) {
        ddmenuitem.style.visibility = 'hidden';
        ddmenuitem.style.display = 'none';
    }
    
    var anchor = event.target;
    var divList = anchor.parentNode.getElementsByTagName("div");
    if (divList.length != 1) {
        alert("invalid menu anchor. ParentNode contains more than one div!");
    }

    // get new layer and show it
    ddmenuitem = divList[0];
    ddmenuitem.style.visibility = 'visible';
    ddmenuitem.style.display = '';
}

// close showed layer
function mclose()
{
    if(ddmenuitem) {
        ddmenuitem.style.visibility = 'hidden';
        ddmenuitem.style.display = 'none';
    }
}

// go close timer
function mclosetime()
{
    closetimer = window.setTimeout(mclose, timeout);
}

// cancel close timer
function mcancelclosetime()
{
    if(closetimer)
    {
        window.clearTimeout(closetimer);
        closetimer = null;
    }
}

//==========================================================================

function hiliteMenu(event) {
    link = event.target;
    link.style.background = "#49A3FF";
    link.style.color="white";
}
function unhiliteMenu(event) {
    link = event.target;
    link.style.background = "";
    link.style.color = "#2875DE";
}

function createProviderMenuLink(providerName, alt, click) {

    var menuLink = document.createElement("a");
    menuLink.href="#";
    menuLink.textContent = providerName;
    menuLink.title = alt;
    
    menuLink.style.position = "relative";
    menuLink.style.display = "block";
    menuLink.style.margin = "0";
    menuLink.style.paddingTop = "5px";
    menuLink.style.paddingBottom = "5px";
    menuLink.style.paddingRight = "10px";
    menuLink.style.paddingLeft = "10px";
    menuLink.style.width = "auto";
    menuLink.style.whiteSpace = "nowrap";
    menuLink.style.textAlign = "left";
    menuLink.style.textDecoration = "none";
    menuLink.style.background = "#EAEBD8";
    menuLink.style.color = "#2875DE";
    menuLink.style.fontSize = "11px";
    menuLink.style.fontFace = "arial";
    
    menuLink.addEventListener("click", click, false);
    menuLink.addEventListener("mouseover",hiliteMenu,false);
    menuLink.addEventListener("mouseout",unhiliteMenu,false);
    
    return menuLink;
        
}

function createProviderListMenu() {

    var menuDiv = document.createElement("div");
    menuDiv.id="menuDiv";
    menuDiv.addEventListener("mouseover",mcancelclosetime,false);
    menuDiv.addEventListener("mouseout",mclosetime,false);

    menuDiv.style.position = "absolute"; 
    menuDiv.style.display = "none";
    menuDiv.style.margin = "0";
    menuDiv.style.padding = "0";
    menuDiv.style.background = "#EAEBD8";
    menuDiv.style.borderWidth = "1px";
    menuDiv.style.borderStyle = "solid";
    menuDiv.style.borderColor = "#5970B2";
    menuDiv.style.zIndex = "30";

//alert("add CLEAR MENU");
    var menuLink = createProviderMenuLink("CLEAR MENU","Click to clear entire menu.",clearBlockedProviderMenu);
    menuDiv.appendChild(menuLink);

//Add Show ATF menu    
        menuLink = createProviderMenuLink("Show ATF","Click to show ATF List",atfMenuObject);
    menuDiv.appendChild(menuLink);

//Add Show TDL menu    
        menuLink = createProviderMenuLink("Show TDL","Click to show TDL List",tdlMenuObject);
    menuDiv.appendChild(menuLink);

//Add Show DNL menu    
        menuLink = createProviderMenuLink("Show Done List","Click to show Done List",dnlMenuObject);
    menuDiv.appendChild(menuLink);

//Add Show RDL menu    
        menuLink = createProviderMenuLink("Show RDL","Click to show RDL List",rdlMenuObject);
    menuDiv.appendChild(menuLink);

    menuLink = createProviderMenuLink("Test Menu Object","Click to test new object",testMenuObject);
    menuDiv.appendChild(menuLink);

    var line = document.createElement("hr");
    menuDiv.appendChild(line);
    
    var providerList = GM_getValue(providerNameListKey,",");
    var providerNames = providerList.split(",");


    for(var i = 0; i < providerNames.length; i++) {
    
        var providerName = providerNames[i];
        if (providerName.length <= 1) {
            continue;
        }

        menuLink = createProviderMenuLink(providerName, "Click to enable ads from this provider." ,removeProviderFromBlockedList);
        menuDiv.appendChild(menuLink);
    }

    var menuAnchor = document.createElement("a");
    menuAnchor.textContent = "TNA Preview";
    menuAnchor.href="#";
    menuAnchor.addEventListener("mouseover",mopen,false);
    //menuAnchor.addEventListener("mouseover",toggleMenu,false);
    //menuAnchor.addEventListener("mouseover",mcancelclosetime,false);
    menuAnchor.addEventListener("mouseout",mclosetime,false);
    menuAnchor.style.marginTop = "0 ";
    menuAnchor.style.marginRight = "1px";
    menuAnchor.style.marginBottom = "0";
    menuAnchor.style.marginLeft = "0";

    menuAnchor.style.paddingTop = "4px";
    menuAnchor.style.paddingBottom = "4px";
    menuAnchor.style.paddingRight = "10px";
    menuAnchor.style.paddingLeft = "10px";

    menuAnchor.style.width = "auto";
    menuAnchor.style.color = "#FFF";
    menuAnchor.style.textAlign = "center";
    menuAnchor.style.textDecoration = "none";

    var menu = document.createElement("li");
    menu.id = "sddm";
    
    menu.style.margin = "0";
    menu.style.padding = "0";
    menu.style.position = "absolute";
    menu.style.listStyle = "none";
    menu.style.float = "left";
    menu.style.fontWeight = "bold";
    menu.style.fontSize = "11px";
    menu.style.fontFace = "arial";

    menu.appendChild(menuAnchor);
    menu.appendChild(menuDiv);

return menu;

}

// CALL AT STARTUP
function addProviderListMenuToTopMenuBar() {

    var menubar = document.getElementById("brdmenu");

    if (menubar == null) {
        //alert("Could not find top menu bar");
        return;
    }

    var menu = createProviderListMenu();

    var list = menubar.getElementsByTagName("ul");
    list[0].appendChild(menu);
    
}





// ------------------------------------------------------------------------

function toggleDisplayProviderAd(adRow,providerName) {

    var providerList = GM_getValue(providerNameListKey,",");
    if (providerList.indexOf("," + providerName + ",") < 0) {
        adRow.style.display = "";
    } else {
        adRow.style.display = "none";
    }
}

function hideBlockedProviderAds() {
    var tableRows = document.getElementsByTagName("TR");
    if (tableRows.length <= 0) { return; }
    
    var adIndex = 0;
    for(adIndex = 0; adIndex< tableRows.length; adIndex++) {
        
        var adRow = tableRows[adIndex];
        var providerName = getProviderName(adRow);
        
        if (providerName == "") { continue; }

        toggleDisplayProviderAd(adRow,providerName);
        
    }
}

function getProviderName(adListingRow) {

    var userSpanList = adListingRow.getElementsByTagName("SPAN");
    var isProviderAd = false;
    var spanTag;
    for (var i = 0; isProviderAd == false && i < userSpanList.length; i++) {
        spanTag = userSpanList[i];
        if(spanTag.className.match(/byuser/)) {
            isProviderAd = true;
            break;
        } 
    }
    if (!isProviderAd){
        return providerName="";
    }
    
    var name = spanTag.textContent;
    name = name.replace(/&nbsp;/ig," ");
    name = name.replace(/^\s+|\s+$/g,"");
    name = name.replace(/^by\s/i,"");
    name = name.replace(/,/g,".");
        
    return providerName = name;

}

function getDivForAdListingIcon(adListingRow) {
    var divList = adListingRow.getElementsByTagName("div");
    for (var x = 0; x < divList.length; x++) {
        var div = divList[x];
        if (div.className.match(/icon/)) {
            return div;
        }
    }
    return null;
}

function isMemberOfList(list, name) {
    return list.indexOf("," + name + ",") >= 0;
}

// call this on the ad listing page
function setupIgnoredProviderLinks() {

    var url = document.location.href;
    if ((url.indexOf("/viewforum.php?id=") <= 0) && (url.indexOf("/search.php?") <=0)) { return; }

    var atfList = GM_getValue(atfListKey,",");
    var tdlList = GM_getValue(tdlListKey,",");
    var dnlList = GM_getValue(dnlListKey,",");
    var rdlList = GM_getValue(rdlListKey,",");
 
    var tableRows = document.getElementsByTagName("TR");
    
    if (tableRows.length <= 0) { return; }
    
    for(var adIndex = 0; adIndex < tableRows.length; adIndex++) {
         
        var adRow = tableRows[adIndex];
        var providerName = getProviderName(adRow);
        
        if (providerName.length <= 0) { continue; }

//GM_log("Provider: " + providerName);
    
        var iconTitle = "";
        if (isMemberOfList(tdlList,providerName)) {
            iconTitle += providerName + " is on your TDL;\n";
//GM_log("TDL: " + providerName);
            var td = adRow.getElementsByTagName("td");
            for(var i = 0; i < td.length; i++) {
                td[i].style.background = "LightGreen";
            }
        } 
        else if (isMemberOfList(rdlList,providerName)) {
            iconTitle += providerName + " is on your RDL;\n";
GM_log("RDL: " + providerName);
            var td = adRow.getElementsByTagName("td");
            for(var i = 0; i < td.length; i++) {
                td[i].style.background = "LightBlue";
            }
        } 
        else if (isMemberOfList(dnlList,providerName)) {
            iconTitle += providerName + " is on your Done List;\n";
GM_log("DNL: " + providerName);
            var td = adRow.getElementsByTagName("td");
            for(var i = 0; i < td.length; i++) {
                td[i].style.background = "LightGrey";
            }
        } 
        else if (isMemberOfList(atfList,providerName)) {
            iconTitle += providerName + " is on your ATF;\n";
//GM_log("ATF: " + providerName);	
            var td = adRow.getElementsByTagName("td");
            for(var i = 0; i < td.length; i++) {
                td[i].style.background = "Gold";
            }
        } 
         

        var toggleAdLink = document.createElement("a");
        toggleAdLink.name = providerName;
        
        if (iconTitle.length <= 0) {
            iconTitle += "Click to hide all ads from " + providerName;
            toggleAdLink.addEventListener("click",addProviderToBlockedList, false);
        } else {
            iconTitle += "   Please remove " + providerName + " from your list before banning her posts.";
        }
        toggleAdLink.title = iconTitle;
        
        // get the icon div and put it inside an anchor link with a toggle event.
        var icon = getDivForAdListingIcon(adRow);

        if("undefined" == typeof icon || icon == null) { 
            alert("no icon div found for " + adRow);
            continue;
        }
        
        var iconParent = icon.parentNode;
        iconParent.insertBefore(toggleAdLink,icon);
        toggleAdLink.appendChild(icon);    

        toggleDisplayProviderAd(adRow,providerName);
    }
}


// ------------------------------------------------------------------------




/*
// to pass a callback function into an object or other function.
myFunction(myCallBack1);

// to pass callback function that requires arguments
myFunction(function(){myCallBack1(param1, param2);});
*/



/*function testMenuObject() {
    alert("test new menu object!!2");
}
*/
//##########################################################################

var timeout         = 500;
var closetimer        = 0;
var ddmenuitem      = 0;

// open hidden layer
function mopen(event)
{    
    // cancel close timer
    mcancelclosetime();

    // close old layer
    if(ddmenuitem) {
        ddmenuitem.style.visibility = 'hidden';
        ddmenuitem.style.display = 'none';
    }
    
    var anchor = event.target;
    var divList = anchor.parentNode.getElementsByTagName("div");
    if (divList.length != 1) {
        alert("invalid menu anchor. ParentNode contains more than one div!");
    }

    // get new layer and show it
    ddmenuitem = divList[0];
    ddmenuitem.style.visibility = 'visible';
    ddmenuitem.style.display = '';
}

// close showed layer
function mclose()
{
    if(ddmenuitem) {
        ddmenuitem.style.visibility = 'hidden';
        ddmenuitem.style.display = 'none';
    }
}

// go close timer
function mclosetime()
{
    closetimer = window.setTimeout(mclose, timeout);
}

// cancel close timer
function mcancelclosetime()
{
    if(closetimer)
    {
        window.clearTimeout(closetimer);
        closetimer = null;
    }
}

//==========================================================================

function hiliteMenu(event) {
    link = event.target;
    link.style.background = "#49A3FF";
    link.style.color="white";
}
function unhiliteMenu(event) {
    link = event.target;
    link.style.background = "";
    link.style.color = "#2875DE";
}

function createProviderMenuLink(providerName, alt, click) {

    var menuLink = document.createElement("a");
    menuLink.href="#";
    menuLink.textContent = providerName;
    menuLink.title = alt;
    
    menuLink.style.position = "relative";
    menuLink.style.display = "block";
    menuLink.style.margin = "0";
    menuLink.style.paddingTop = "5px";
    menuLink.style.paddingBottom = "5px";
    menuLink.style.paddingRight = "10px";
    menuLink.style.paddingLeft = "10px";
    menuLink.style.width = "auto";
    menuLink.style.whiteSpace = "nowrap";
    menuLink.style.textAlign = "left";
    menuLink.style.textDecoration = "none";
    menuLink.style.background = "#EAEBD8";
    menuLink.style.color = "#2875DE";
    menuLink.style.fontSize = "11px";
    menuLink.style.fontFace = "arial";
    
    menuLink.addEventListener("click", click, false);
    menuLink.addEventListener("mouseover",hiliteMenu,false);
    menuLink.addEventListener("mouseout",unhiliteMenu,false);
    
    return menuLink;
        
}

function createProviderListMenu() {

    var menuDiv = document.createElement("div");
    menuDiv.id="menuDiv";
    menuDiv.addEventListener("mouseover",mcancelclosetime,false);
    menuDiv.addEventListener("mouseout",mclosetime,false);

    menuDiv.style.position = "absolute"; 
    menuDiv.style.display = "none";
    menuDiv.style.margin = "0";
    menuDiv.style.padding = "0";
    menuDiv.style.background = "#EAEBD8";
    menuDiv.style.borderWidth = "1px";
    menuDiv.style.borderStyle = "solid";
    menuDiv.style.borderColor = "#5970B2";
    menuDiv.style.zIndex = "30";

//alert("add CLEAR MENU");
    var menuLink = createProviderMenuLink("CLEAR MENU","Click to clear entire menu.",clearBlockedProviderMenu);
    menuDiv.appendChild(menuLink);
    
    menuLink = createProviderMenuLink("Show TDL","Click to show TDL",tdlMenuObject);
    menuDiv.appendChild(menuLink);

    menuLink = createProviderMenuLink("Show ATF","Click to show ATF",atfMenuObject);
    menuDiv.appendChild(menuLink);

    menuLink = createProviderMenuLink("Show Done List","Click to show Done List",dnlMenuObject);
    menuDiv.appendChild(menuLink);

    menuLink = createProviderMenuLink("Show RDL","Click to show RDL",rdlMenuObject);
    menuDiv.appendChild(menuLink);

    menuLink = createProviderMenuLink("Test Menu Object","Click to test new object",testMenuObject);
    menuDiv.appendChild(menuLink);

    var line = document.createElement("hr");
    menuDiv.appendChild(line);
    
    var providerList = GM_getValue(providerNameListKey,",");
    var providerNames = providerList.split(",");


    for(var i = 0; i < providerNames.length; i++) {
    
        var providerName = providerNames[i];
        if (providerName.length <= 1) {
            continue;
        }

        menuLink = createProviderMenuLink(providerName, "Click to enable ads from this provider." ,removeProviderFromBlockedList);
        menuDiv.appendChild(menuLink);
    }

    var menuAnchor = document.createElement("a");
    menuAnchor.textContent = "TNA Preview";
    menuAnchor.href="#";
    menuAnchor.addEventListener("mouseover",mopen,false);
    //menuAnchor.addEventListener("mouseover",toggleMenu,false);
    //menuAnchor.addEventListener("mouseover",mcancelclosetime,false);
    menuAnchor.addEventListener("mouseout",mclosetime,false);
    menuAnchor.style.marginTop = "0 ";
    menuAnchor.style.marginRight = "1px";
    menuAnchor.style.marginBottom = "0";
    menuAnchor.style.marginLeft = "0";

    menuAnchor.style.paddingTop = "4px";
    menuAnchor.style.paddingBottom = "4px";
    menuAnchor.style.paddingRight = "10px";
    menuAnchor.style.paddingLeft = "10px";

    menuAnchor.style.width = "auto";
    menuAnchor.style.color = "#FFF";
    menuAnchor.style.textAlign = "center";
    menuAnchor.style.textDecoration = "none";

    var menu = document.createElement("li");
    menu.id = "sddm";
    
    menu.style.margin = "0";
    menu.style.padding = "0";
    menu.style.position = "absolute";
    menu.style.listStyle = "none";
    menu.style.float = "left";
    menu.style.fontWeight = "bold";
    menu.style.fontSize = "11px";
    menu.style.fontFace = "arial";

    menu.appendChild(menuAnchor);
    menu.appendChild(menuDiv);

return menu;

}

// CALL AT STARTUP
function addProviderListMenuToTopMenuBar() {

    var menubar = document.getElementById("brdmenu");

    if (menubar == null) {
        //alert("Could not find top menu bar");
        return;
    }

    var menu = createProviderListMenu();

    var list = menubar.getElementsByTagName("ul");
    list[0].appendChild(menu);
    
}
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// *****  Run at load *****
getLocationId();     //parses id from referring page
setReviewSubject();  //populate subject for posting review if a review page
setSearchSubject();  //Porkmeister62: populate subject for searching reviews

setupIgnores();

setupIgnoredProviderLinks();

addProviderListMenuToTopMenuBar();

var endTime = new Date();
var seconds =  (endTime.getTime() - startTime.getTime()) / 1000;
GM_log("script run time = " + seconds + " sec");