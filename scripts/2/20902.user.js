// ----------
// CraigslistTrollBlocker
// 01-12-2008 MasterSeijuro@yahoo.com
// Please consider this script released under GPL
//
// Offers a configurable list for blocking handles on forums in CL.  All
// posts for listed handles will be over-written with an innocuous message.
// This is great for blocking those annoyances from idiots.
// 
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Craigslist Troll Blocker
// @description   This is a tool which will let you filter Craigslist Forum posts somewhat.
// @include       http://*.craigslist.*/forums/?*act=DF*
// @include       http://*.craigslist.*/forums/?*act=showThread*
// ==/UserScript==
//
// ----------------------------------------------------------------------------------

/*
 * Troll List
 *
 * We are going to make the list of trolls configurable by the user.
 */

// Start with "do" functions: called directly by user actions
function doOpenTrollList() {
    // alert("doOpenTrollList");
    openTrollList();
    return false;
}

function doTrollListOKButton() {
    // alert("doTrollListOKButton");
    if (storeTrollList()) {
        closeTrollList();
        window.location.reload();
    }
    return false;
}

function doTrollListCancelButton() {
    // alert("doTrollListCancelButton");
    closeTrollList();
    return false;
}

function doTrollListApplyButton() {
    // alert("doTrollListApplyButton");
    if (storeTrollList()) {
        loadTrollList();
        window.location.reload();
    }
    return false;
}

// Now the "heavy-lifting", helper functions
function closeTrollList() {
    // alert("closeTrollList");
    loadTrollList();
    hideTrollList();
}

function openTrollList() {
    // alert("openTrollList");
    loadTrollList();
    showTrollList();
}

function showTrollList() {
  document.getElementById("trollListDiv").style.visibility = "visible";
  document.getElementById("trollListDiv").style.position = "relative";
  document.getElementById("trollListHiddenDiv").style.visibility = "hidden";
}

function hideTrollList() {
  document.getElementById("trollListHiddenDiv").style.visibility = "visible";
  document.getElementById("trollListDiv").style.position = "absolute";
  document.getElementById("trollListDiv").style.visibility = "hidden";
}

function loadTrollList() {
  /*
  alert("loadTrollList()");
  alert("Current trollBlockerEnabled: "+document.getElementById("trollBlockerEnabled").checked+
    "\nCurrent trollList: \n"+document.getElementById("trollListContent").value);
  //*/

  var trollList = getCookie("clTB.trollListContent");
  var trollBlockerEnabled = getCookie("clTB.trollBlockerEnabled");

  /*
  alert("Stored trollBlockerEnabled: "+trollBlockerEnabled+
    "\nStored trollList: \n"+trollList);
  //*/

  document.getElementById("trollListContent").value = trollList;
  document.getElementById("trollBlockerEnabled").checked = (trollBlockerEnabled != "false");

  /*
  alert("Set trollBlockerEnabled: "+document.getElementById("trollBlockerEnabled").checked+
    "\nSet trollList: \n"+document.getElementById("trollListContent").value);
  //*/
}

function storeTrollList() {
  /*
  alert("storeTrollList()");
  alert("Current trollBlockerEnabled: "+document.getElementById("trollBlockerEnabled").checked+
    "\nCurrent trollList: \n"+document.getElementById("trollListContent").value);
  //*/

  var trollList = document.getElementById("trollListContent").value;
  var trollBlockerEnabled = document.getElementById("trollBlockerEnabled").checked;

  /*
  alert("Set trollBlockerEnabled: "+trollBlockerEnabled+
    "\nSet trollList: \n"+trollList);
  //*/

  setCookie("clTB.trollBlockerEnabled", trollBlockerEnabled);
  var result = setCookie("clTB.trollListContent", trollList);

  /*
  alert("Stored trollBlockerEnabled: "+getCookie("clTB.trollBlockerEnabled")+
    "\nStored trollList: \n"+getCookie("clTB.trollListContent"));
  //*/

  // if (result) alert("Stored Troll List:\n"+trollList);
  return result;
}

/*
 * Cookies
 *
 * We are going to save the list of trolls in a cookie.
 * Here are some helper functions.
 */
function setCookie(c_name,c_value)
{
  if (!testPersistentCookie()) {
    alert ("Persistent cookies are currently disabled.  "+
            "You must enable persistent cookies to use "+
            "Craig's List Troll Blocker"); 
    return false;
  }

  writePersistentCookie (c_name, c_value, "years", 1);
  return true;
}

function getCookie(c_name)
{
  if (getCookieValue(c_name))
    return getCookieValue(c_name);

  return "";
}

function blockTrolls() {
  if (document.getElementById("trollBlockerEnabled").checked) {
    var postList = document.getElementById("trollListPostsWrapper");
    var origHTML = postList.innerHTML;
    var posts = origHTML.split("\n");
    var newPosts = new Array();
    var trolls = document.getElementById("trollListContent").value.split("\n");
    var newHTML = "";
    var blockedPosts = new Array();

    var replaceRegex = new RegExp("\<a onclick=\"cc\\(this\\);\".*&gt;");
    var replacementString = "<strong><a onclick=\"return false;\">Post blocked</a></strong> &lt; Troll Blocker &gt;";
    for (i=0; i<posts.length; i++) {
      var blockPost = false;
      for (j=0; j<trolls.length; j++) {
        var troll = trolls[j].trim();
        if (troll.length > 0 && posts[i].indexOf(troll) >= 0) {
          blockPost = true;
        }
      }
      if (blockPost) {
        blockedPosts[blockedPosts.length] = posts[i];
        newPosts[newPosts.length] = posts[i].replace( replaceRegex, replacementString );
      } else {
        newPosts[newPosts.length] = posts[i];
      }
    }
    /*
    alert("Original posts: "+posts.length+
      "\nNew posts: "+(newPosts.length-blockedPosts.length));
    alert("Sample Blocked Post: \n"+
      blockedPosts[0]+"\n"+
      blockedPosts[0].search(replaceRegex)+"\n"+
      blockedPosts[0].replace( replaceRegex, replacementString )
    );
    // */
    for (i=0; i<newPosts.length; i++) {
      newHTML += newPosts[i]+"\n";
    }
    // alert("origHTML:\n"+origHTML.substr(0,1024));
    // alert("newHTML:\n"+newHTML.substr(0,1024));
    postList.innerHTML = newHTML;
  }
}

function initTrollBlocker () {
  var trollListTableRow;
  var trollListTableData;

  // This layer is displayed when the Troll List is "closed"
  var trollListHiddenDiv = document.createElement("div");
  trollListHiddenDiv.id="trollListHiddenDiv";
  trollListHiddenDiv.name="trollListHiddenDiv";
  trollListHiddenDiv.align="right";
  trollListHiddenDiv.style.width = document.body.clientWidth+"px"; // "100%";

  trollListTable = document.createElement("table");
  trollListTable.border=1;
  trollListTable.width=25;
  trollListTable.addEventListener("click", doOpenTrollList, false);
  trollListHiddenDiv.appendChild(trollListTable);

  trollListHiddenDiv.style.visibility = "visible";
  // trollListHiddenDiv.style.top = 100; // document.body.scrollTop + 5;
  // trollListHiddenDiv.style.left = 100; // document.body.scrollLeft + document.body.clientWidth - 25 - trollListTable.width;

  trollListTableRow = document.createElement("tr");
  trollListTableData = document.createElement("td");
  trollListTableData.align="center";
  trollListTable.appendChild(trollListTableRow);
  trollListTableRow.appendChild(trollListTableData);

  var trollListOpenLink = document.createElement("a");
  trollListOpenLink.id="trollListOpenLink";
  trollListOpenLink.name="trollListOpenLink";
  trollListOpenLink.href="#";
  trollListOpenLink.onclick="return false;";
  trollListTableData.appendChild(trollListOpenLink);

  trollListOpenLink.appendChild(trollListOpenLink = document.createElement("em"));
  trollListOpenLink.appendChild(trollListOpenLink = document.createElement("font"));
  trollListOpenLink.size=1;
  trollListOpenLink.appendChild(document.createTextNode("Troll Blocker"));

  // This layer is displayed when the Troll List is "open"
  var trollListBR;
  var trollListDiv = document.createElement("div");
  trollListDiv.id="trollListDiv";
  trollListDiv.name="trollListDiv";

  trollListDiv.style.visibility = "hidden";
  trollListDiv.style.position = "absolute";
  trollListDiv.align="right";
  trollListDiv.style.width = document.body.clientWidth+"px"; // "100%";
  trollListDiv.style.top = 5; // document.body.scrollTop + 5;
  trollListDiv.style.left = 5; // document.body.scrollLeft + document.body.clientWidth - 25 - trollListTable.width;

  var trollListTableRow;
  var trollListTableData;

  trollListTable = document.createElement("table");
  trollListTable.border=1;
  trollListTable.width=180;
  trollListDiv.appendChild(trollListTable);

  trollListTableRow = document.createElement("tr");
  trollListTableData = document.createElement("td");
  trollListTable.appendChild(trollListTableRow);
  trollListTableRow.appendChild(trollListTableData);

  trollListTable = document.createElement("table");
  trollListTable.border=0;
  trollListTable.width=180;
  trollListTableData.appendChild(trollListTable);


  var trollListHeader = document.createElement("em");
  trollListHeader.id="trollListHeader";
  trollListHeader.name="trollListHeader";

  trollListTableRow = document.createElement("tr");
  trollListTableData = document.createElement("td");
  trollListTable.appendChild(trollListTableRow);
  trollListTableRow.appendChild(trollListTableData);
  trollListTableData.appendChild(trollListHeader);

  var trollListHeaderContent = document.createTextNode("Troll List");
  trollListHeader.appendChild(trollListHeaderContent);

  var trollListInfo = document.createElement("font");
  trollListInfo.size=1;
  var trollListInfoContent = document.createTextNode("Posts from handles listed here will be hidden.");
  trollListBR = document.createElement("br");
  trollListTableData.appendChild(trollListBR);
  trollListTableData.appendChild(trollListInfo);
  trollListInfo.appendChild(trollListInfoContent);


  var trollListContent = document.createElement("textarea");
  trollListContent.id="trollListContent";
  trollListContent.name="trollListContent";
  trollListContent.rows=10;

  trollListTableRow = document.createElement("tr");
  trollListTableData = document.createElement("td");
  trollListTable.appendChild(trollListTableRow);
  trollListTableRow.appendChild(trollListTableData);
  trollListTableData.appendChild(trollListContent);


  var trollBlockerEnabled = document.createElement("input");
  trollBlockerEnabled.id="trollBlockerEnabled";
  trollBlockerEnabled.name="trollBlockerEnabled";
  trollBlockerEnabled.type="checkbox";

  var trollBlockerEnabledLabel = document.createElement("label");
  trollBlockerEnabledLabel.appendChild(trollBlockerEnabled);
  trollListTableRow = document.createElement("tr");
  trollListTableData = document.createElement("td");
  trollListTable.appendChild(trollListTableRow);
  trollListTableRow.appendChild(trollListTableData);
  trollListTableData.appendChild(trollBlockerEnabledLabel);

  trollBlockerEnabledLabel.appendChild(trollBlockerEnabledLabel = document.createElement("font"));
  trollBlockerEnabledLabel.size=2;
  trollBlockerEnabledLabel.appendChild(document.createTextNode(" enable Troll Blocker"));


  trollListTableRow = document.createElement("tr");
  trollListTableData = document.createElement("td");
  trollListTableData.align="right";
  trollListTable.appendChild(trollListTableRow);
  trollListTableRow.appendChild(trollListTableData);

  var trollListButtonRow = document.createElement("span");
  trollListTableData.appendChild(trollListButtonRow);

  var trollListOKButton = document.createElement("input");
  trollListOKButton.id="trollListOKButton";
  trollListOKButton.name="trollListOKButton";
  trollListOKButton.value="OK";
  trollListOKButton.type="button";
  trollListOKButton.style.fontSize="7pt";
  trollListOKButton.addEventListener("click", doTrollListOKButton, false);
  trollListButtonRow.appendChild(trollListOKButton);

  var trollListCancelButton = document.createElement("input");
  trollListCancelButton.id="trollListCancelButton";
  trollListCancelButton.name="trollListCancelButton";
  trollListCancelButton.value="Cancel";
  trollListCancelButton.type="button";
  trollListCancelButton.style.fontSize="7pt";
  trollListCancelButton.addEventListener("click", doTrollListCancelButton, false);
  trollListButtonRow.appendChild(document.createTextNode(" "));
  trollListButtonRow.appendChild(trollListCancelButton);

  /*
  var trollListApplyButton = document.createElement("input");
  trollListApplyButton.id="trollListApplyButton";
  trollListApplyButton.name="trollListApplyButton";
  trollListApplyButton.value="Apply";
  trollListApplyButton.type="button";
  trollListApplyButton.style.fontSize="7pt";
  trollListApplyButton.addEventListener("click", doTrollListApplyButton, false);

  trollListButtonRow.appendChild(document.createTextNode(" "));
  trollListButtonRow.appendChild(trollListApplyButton);
  */

  var blankLine = document.getElementsByTagName("br")[0];
  if (blankLine) {
    blankLine.parentNode.insertBefore(trollListHiddenDiv,blankLine);
    //*
    trollListHiddenDiv.style.position = "absolute";

    var trollListPostsWrapper = document.createElement("div");
    trollListPostsWrapper.id="trollListPostsWrapper";

    while (trollListHiddenDiv.nextSibling != null)
      trollListPostsWrapper.appendChild(trollListHiddenDiv.nextSibling);

    trollListHiddenDiv.parentNode.appendChild(trollListPostsWrapper);
    //*/ blankLine.parentNode.removeChild(blankLine);
  } else {
    document.body.insertBefore(trollListHiddenDiv,document.body.firstChild);
  }

  var postsList = document.getElementsByTagName("table")[2];
  if (postsList) {
    postsList.parentNode.insertBefore(trollListDiv,postsList);
  } else {
    document.body.insertBefore(trollListDiv,document.body.firstChild);
  }

  closeTrollList();
}


// Enhance String a bit.
String.prototype.trimLeft = function() {
  return this.replace(/^\s+/,'');
}
String.prototype.trimRight = function() {
  return this.replace(/\s+$/,'');
}
String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g,'');
} 

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// COOKIE HELPERS /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/*==============================================================================
    Routines written by John Gardner - 2003 - 2005
    See www.braemoor.co.uk/software for information about more freeware
    available.
================================================================================
*/
/*==============================================================================
Routine to get the current value of a cookie
    Parameters:
        cookieName        Cookie name
    
    Return value:
        false             Failed - no such cookie
        value             Value of the retrieved cookie
   e.g. if (!getCookieValue("pans") then  {
           cookieValue = getCoookieValue ("pans2);
        }
*/
function getCookieValue (cookieName) {
  var exp = new RegExp (escape(cookieName) + "=([^;]+)");
  if (exp.test (document.cookie + ";")) {
    exp.exec (document.cookie + ";");
    return unescape(RegExp.$1);
  }
  else return false;
}
/*==============================================================================
Routine to see of persistent cookies are allowed:
    Parameters:
        None
    
    Return value:
        true              Session cookies are enabled
        false             Session cookies are not enabled
   e.g. if (testPersistentCookie()) then
           alert ("Persistent coookies are enabled");
        else
           alert ("Persistent coookies are not enabled");
*/
function testPersistentCookie () {
  writePersistentCookie ("testPersistentCookie", "Enabled", "minutes", 1);
  if (getCookieValue ("testPersistentCookie")=="Enabled")
    return true  
  else 
    return false;
}
/*==============================================================================
Routine to write a persistent cookie
    Parameters:
        CookieName        Cookie name
        CookieValue       Cookie Value
        periodType        "years","months","days","hours", "minutes"
        offset            Number of units specified in periodType
    
    Return value:
        true              Persistent cookie written successfullly
        false             Failed - persistent cookies are not enabled
    
    e.g. writePersistentCookie ("Session", id, "years", 1);
*/       
function writePersistentCookie (CookieName, CookieValue, periodType, offset) {
  var expireDate = new Date ();
  offset = offset / 1;
  
  var myPeriodType = periodType;
  switch (myPeriodType.toLowerCase()) {
    case "years": 
     var year = expireDate.getYear();     
     // Note some browsers give only the years since 1900, and some since 0.
     if (year < 1000) year = year + 1900;     
     expireDate.setYear(year + offset);
     break;
    case "months":
      expireDate.setMonth(expireDate.getMonth() + offset);
      break;
    case "days":
      expireDate.setDate(expireDate.getDate() + offset);
      break;
    case "hours":
      expireDate.setHours(expireDate.getHours() + offset);
      break;
    case "minutes":
      expireDate.setMinutes(expireDate.getMinutes() + offset);
      break;
    default:
      alert ("Invalid periodType parameter for writePersistentCookie()");
      break;
  } 
  
  document.cookie = escape(CookieName ) + "=" + escape(CookieValue) + "; expires=" + expireDate.toGMTString() + "; path=/";
}  
/*==============================================================================
Routine to delete a persistent cookie
    Parameters:
        CookieName        Cookie name
    
    Return value:
        true              Persistent cookie marked for deletion
    
    e.g. deleteCookie ("Session");
*/    
function deleteCookie (cookieName) {
  if (getCookieValue (cookieName)) writePersistentCookie (cookieName,"Pending delete","years", -1);  
  return true;     
}
////////////////////////////////////////////////////////////////////////////////
/////////////////////////// END COOKIE HELPERS /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

initTrollBlocker();
blockTrolls();

// alert("Starting Troll Blocker: "+window.location);
// alert(document.getElementById("trollListHiddenDiv").innerHTML);
// alert(document.getElementById("trollListDiv").innerHTML);
