// ==UserScript==
// @name          ClistTrollCrusher
// @namespace     HWH
// @description   This is a tool which will let you filter Craigslist Forum posts.
// @include       http://forums.craigslist.org/*
// @include       https://forums.craigslist.org/*
// @version     2014.04.23
// @grant       none
// ==/UserScript==
//
// This script was modified by Handlewaeshere, from original script still availbe at:
// http://fbastage.zxq.net/cl_highlight.js 
// as of 2014.04.23
//----------
// CraiglistTrollCrusher [modified version of CraigslistFriendHighlighter (modified version of CraigslistTrollBlocker)]
// 
// Please consider this script released under GPL
//
// Offers a configurable list for highlighting <s>blocking</s> handles on forums in CL.  All
// posts for listed handles will be <s>over-written with an innocuous message</s> highlighted.
// This is great for <s>blocking</s> spotting those <s>annoyances from idiots</s> awesome peeps.
//
// Handlewaeshere update allows for completely removing posts from CRUSHed trolls
//
// --------------------------------------------------------------------
//
//
// ----------------------------------------------------------------------------------

// set up a few 'constants'
//DIVIFY is needed for the highlight function and possible future functions, but it slows the script down. disable for performance
if(typeof DIVIFY == "undefined") var DIVIFY = true;

//version info
if(typeof $ver$ == "undefined") $ver$ = "2014.02.04";
if(typeof $DEBUG == "undefined") var $DEBUG = false;

if(typeof malecolor == "undefined") var malecolor = "RoyalBlue"; // "DodgerBlue" is also nice
if(typeof femalecolor == "undefined") var femalecolor = "HotPink";
if(typeof defaultcolor == "undefined") var defaultcolor = "darkgreen";
if(typeof highlightcolor == "undefined") var highlightcolor = "palegreen";

if(typeof male == "undefined") var male = new Array("m", "male", "man", "b", "boy", "guy");
if(typeof female == "undefined") var female = new Array("f", "female", "woman", "w", "g", "girl");



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
        blockTrolls();
        //window.location.reload();
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
        blockTrolls();
        //window.location.reload();
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
  var trollListDiv       = document.getElementById("trollListDiv");
  var trollListHiddenDiv = document.getElementById("trollListHiddenDiv");

  //trollListDiv.style.position         = "fixed";
  //trollListDiv.style.scrollTop        = trollListHiddenDiv.style.scrollTop;
  trollListDiv.style.visibility       = "visible";
  trollListHiddenDiv.style.visibility = "hidden";
}

function hideTrollList() {
  var trollListDiv       = document.getElementById("trollListDiv");
  var trollListHiddenDiv = document.getElementById("trollListHiddenDiv");

  //trollListHiddenDiv.style.position   = "fixed";
  //trollListHiddenDiv.style.scrollTop  = trollListDiv.style.scrollTop;
  trollListHiddenDiv.style.visibility = "visible";
  trollListDiv.style.visibility       = "hidden";
}

function loadTrollList() {
  /*
  alert("loadTrollList()");
  alert("Current trollBlockerEnabled: "+document.getElementById("trollBlockerEnabled").checked+
    "\nCurrent trollList: \n"+document.getElementById("trollListContent").value);
  //*/

  // first try getting values from localStorage.  if that fails, check cookies.
  var trollList = "";
  var trollBlockerEnabled;
  var trollBlockerFiltered;

  if (localStorage) {
      trollList = localStorage.getItem("clTB.trollListContent");
      trollBlockerEnabled = localStorage.getItem("clTB.trollBlockerEnabled");
      trollBlockerFiltered = localStorage.getItem("clTB.trollBlockerFiltered");

  }

  if (trollList == "") {
      trollList = getCookie("clTB.trollListContent");
      trollBlockerEnabled = getCookie("clTB.trollBlockerEnabled");
      trollBlockerFiltered = getCookie("clTB.trollBlockerFiltered");

  }
  //if (! trollBlockerEnabled)  { trollBlockerEnabled = "false";  }
  if (trollList == "") {
      trollList = "Example1\r\nExample2|crush\r\nExample3|#F5F5DC\r\nExample4|block\r\nExample5|ignore";
  }
  if (! trollBlockerFiltered) { trollBlockerFiltered = "false"; }


  /*alert("Stored trollBlockerEnabled: "+trollBlockerEnabled+
    "\nStored trollList: \n"+trollList);
  //*/

  document.getElementById("trollListContent").value = trollList;
  document.getElementById("trollBlockerEnabled").checked  = (trollBlockerEnabled  != "false");
  document.getElementById("trollBlockerFiltered").checked = (trollBlockerFiltered != "false");


  /*
  alert("Set trollBlockerEnabled: "+document.getElementById("trollBlockerEnabled").checked+
    "\nSet trollList: \n"+document.getElementById("trollListContent").value);
  //*/
}

function storeTrollList() {
  //if it's in filtered mode, check for changes, but use the original list
  var filter = document.getElementById("trollListFilterText").value.toLowerCase();
  var trollList = document.getElementById("trollListContent").value.split("\n");
  var oldList = "";
  if (localStorage)
    var oldList = localStorage.getItem("clTB.trollListContent");
  else
    var oldList = getCookie("clTB.trollListContent");
  if (oldList) oldList = oldList.split("\n");


  if (filter != "") {
      //var filterList = new Array();  // list of stuffs that match the filter
       //delete any entries in filterList (we'll re-add them with the "oldList" values

      for (t in oldList) {
        if (oldList[t].toLowerCase().indexOf(filter) > -1) {
          oldList[t] = "";
        }
          //alert("oldList length is: " + oldList.length);
      }

      for (t in trollList) {
        var newtroll = trollList[t].trim();
        if (newtroll && oldList.indexOf(newtroll) < 0) {
            oldList.push(newtroll);
        }
      }

      //remove empty values from array, and move to trollList (new version)
      var trollList = new Array();
      for (k = 0; k < oldList.length; k++) { if(oldList[k]) trollList.push(oldList[k]) }
      //trollList = oldList;
      document.getElementById("trollListFilterText").value = "";
  }


  var trollArray = trollList.sort(function(x,y){
      var a = String(x).toUpperCase();
      var b = String(y).toUpperCase();
      if (a > b)
         return 1
      if (a < b)
         return -1
      return 0;
    });

  trollList = trollArray.join("\n");
  trollList = trollList.replace(/ +/g, ''); //replace space character

  var trollBlockerEnabled = document.getElementById("trollBlockerEnabled").checked;
  var trollBlockerFiltered= document.getElementById("trollBlockerFiltered").checked;

  /*
  alert("Set trollBlockerEnabled: "+trollBlockerEnabled+
    "\nSet trollList: \n"+trollList);
  //*/

  // store into localStorage.  store as cookie if localStorage fails
  var result;
  if (localStorage) {
      localStorage.setItem("clTB.trollBlockerEnabled", trollBlockerEnabled);
      localStorage.setItem("clTB.trollBlockerFiltered", trollBlockerFiltered);
      result = localStorage.setItem("clTB.trollListContent", trollList);
      result = true;
      //localStorage.getItem("clTB.trollBlockerEnabled") + "\n" + localStorage.getItem("clTB.trollBlockerFiltered") + "\n" + localStorage.getItem("clTB.trollListContent"))

  } else {
      setCookie("clTB.trollBlockerEnabled", trollBlockerEnabled);
      setCookie("clTB.trollBlockerFiltered", trollBlockerFiltered);
      result = setCookie("clTB.trollListContent", trollList);
  }
  /*
  alert("Stored trollBlockerEnabled: "+getCookie("clTB.trollBlockerEnabled")+
    "\nStored trollList: \n"+getCookie("clTB.trollListContent"));
  //*/

  // if (result) alert("Stored Troll List:\n"+trollList);
  return result;
}

// show only a filtered version of the trolllist, based on text in trollListFilterText
function filterTrollList() {
    filter = this.value;

    if (filter.indexOf(' ') > -1) {
        filter = this.value.replace(/ +/g, '').trim();
        this.value = filter;
        return;
    }
    filter = filter.toLowerCase().trim();

    if (localStorage)
        trollList = localStorage.getItem("clTB.trollListContent");

    if (trollList == "")
        trollList = getCookie("clTB.trollListContent");

    //if (! trollBlockerEnabled)  { trollBlockerEnabled = "false";  }
    if (trollList == "") {
        trollList = "Example1\r\nExample2|red\r\nExample3|#F5F5DC\r\nExample4|block\r\nExample5|ignore";
        document.getElementById("trollListContent").value = trollList;
        return;
    }

    //create new list
    trollarray = trollList.split("\n")
    newtrollarray = new Array();
    for (t in trollarray) {
        if (trollarray[t].toLowerCase().indexOf(filter) > -1)
            newtrollarray.push(trollarray[t]);
    }
    trollList = newtrollarray.join("\r\n");
    document.getElementById("trollListContent").value = trollList;

}

//block space character
function nospaces() {

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
            "Craig's List TrollCrusher");
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
  var starttime = new Date().getTime();  //used for debug only

  if (!document.getElementById("trollBlockerEnabled").checked) return;
    //var trolls = document.getElementById("trollListContent").value.split("\n");
    if (localStorage)
        var trolls = localStorage.getItem("clTB.trollListContent").split("\n");
    if (trolls == "")
        var trolls = getCookie("clTB.trollListContent").split("\n");


    // put friends/trolls into associative array
    
    var fcolor;
    var troll;
    var trolltuple;
    var trollhash = new Array();
    for (j=0; j<trolls.length; j++) {
        fcolor = defaultcolor;    //default color for handles

        troll = trolls[j].trim().toLowerCase();
        trolltuple = troll.split('|');
        troll = trolltuple[0].trim();
        //if (post.search("class=\"hnd own") > -1) { fcolor = "red"; }
        if (trolltuple.length > 1) {
            fcolor = trolltuple[1].trim();

            if (male.indexOf(fcolor) > -1) fcolor = malecolor;
            else if (female.indexOf(fcolor) > -1) fcolor = femalecolor;

        }

        if (troll.length > 0) {
            trollhash[troll] = fcolor;
        }
    }


    //var blockedPosts = new Array();
    var replaceRegex = new RegExp("<a .*&gt;");
    var replacementString = "<a style='color:darkgrey; text-decoration: line-through;' oonclick='return false;'>Post and Handle <b>IGNORE</b>d &lt; Troll Blocker &gt; </a>";
    //var replaceRegex2 = new RegExp("<a .*&lt;");
    //var replacementString2 = "<a style='color:darkgrey; text-decoration: line-through;' oonclick='return false;'>Post <b>BLOCK</b>ed</a> &lt;";
    var replaceRegex2 = new RegExp("<a href=");
    var replacementString2 = "<a style='color:darkgrey; text-decoration: line-through;' href=";
    var replaceRegex3 = new RegExp('target="R"><b>.*</b></a> &lt;');
    var replacementString3 = 'target="R">Post <b>BLOCK</b>ed</a> &lt;';
 
 

    var reHandle = new RegExp("&lt; .*>([A-Za-z0-9?!$^:()_-]+)<.* &gt;");
    var handle;
  
  
    var postList = document.getElementById("div_threads");
    if (! postList) { postList = document.body; d('could not find div_threads'); }
    var origHTML = postList.innerHTML;

    //var posts = postList.getElementsByTagName('div'); //
    var posts = origHTML.split("\n");
    var newPosts = new Array();
    var lastPostThisLevelCrushed = new Array();
    var levelThisPost = 0;

    
    lastPostThisLevelCrushed[0] = 0;
    

    // POST LOOP STARTS HERE    
    
    for (i=0; i<posts.length; i++) {
    post = posts[i]; // .innerHTML;


      if (post.length < 15 && document.getElementById("trollBlockerFiltered").checked) { continue; }
        // some posts have extra <span> in them when there's a capital I...
        // note:  the code below won't catch all, because if multiple I's are used
        // they will be in the same span definition.  (i.e <span>II</span)
        // and there may be more than one <span>I</span> in a handle.
        // (i.e <span>I</span>_am_<span>I</span>).   just not worth the
        // computational time to compile a regular expression and execute it
        // since these cases are rare
      post = post.replace(/<span class="S">I<\/span>/g, 'i');
      post = post.replace(/<span class="S">I<\/span>/g, 'i');
      post = post.replace(/<span class="S">II<\/span>/g, 'ii');
      post = post.replace(/<span class="S">III<\/span>/g, 'iii');
      post = post.replace(/<span class="S">IIII<\/span>/g, 'iiii');
      post = post.replace(/<span class="S">IIIII<\/span>/g, 'iiiii');
      //post = post.replace(/rn/g, 'RN');   //some people like to use rn to imp someone with an M in the name
      post = post.replace('color="#009900"><b>', 'color="#00FFFF"><b style="background-color:black; font-size: 150%">');
      post = post.replace('<em>', '<em style="background-color:black; font-size: 150%">');



      // catch some 'clever' invisible titles
      post = post.replace('<b>' + String.fromCharCode(9), '<b style="color:brown;text-decoration: blink;">#');
      post = post.replace('<b>' + String.fromCharCode(11), '<b style="color:brown;text-decoration: blink;">#');
      post = post.replace('<b>' + String.fromCharCode(12), '<b style="color:brown;text-decoration: blink;">#');
      post = post.replace('<b></b>', '<b style="color:brown;text-decoration: blink;">#</b>');


      if(post.indexOf(String.fromCharCode(8201)) < 0) post = post.replace('</b>', '&#8201;</b>'); //thin space

      // note if CR or LF are used, we need to concat the next line
      if (post.indexOf("<b>") + 3 == post.length) {
        //posts[i+1] = post + "<span style='color:brown;text-decoration: blink;'>#</span>" + posts[i+1];
       // posts[i+1].innerHTML = post + posts[i+1].innerHTML;
     posts[i+1] = post + posts[i+1];

        post = "";
      }

      

        // handle is innerHTML between &lt; and &gt;   skip this line if no handle found
      if (post.search(reHandle) < 0) { posts[i] = post; continue; }

      handle = post.match(reHandle)[1].toLowerCase();



       //Gets heirarchy level of post
              
        var cnt = 0;
        var offset = 0;
        var length = post.indexOf("<a");
        var searchstring =  ": . ."; 
        var posttofindlevel = post;
        
        
        searchstring += '';   
        posttofindlevel += '';
  
        offset--;

        while ((offset = posttofindlevel.indexOf(searchstring, offset + 1)) != -1) {
           if (length > 0 && (offset + searchstring.length) > length) {
            cnt=0;
          }
          cnt++;
        }

        levelThisPost = cnt;
         
        /// End Gets Heirarchy
        
        
        if (lastPostThisLevelCrushed[levelThisPost - 1] == 1) {
           post = post.replace( ": . .", "c. .");    
            
        }
      
        lastPostThisLevelCrushed[levelThisPost] = 0; 

        
        if (trollhash[handle] != undefined )   {

        fcolor = trollhash[handle];
        if (post.search("class=\"hnd own") > -1) { fcolor = "red"; }

        if (fcolor=="ignore" && post.search(replacementString) < 0) {
           //blockPost = true;
           post = post.replace( replaceRegex, replacementString );
           post = post.replace( "class=\"hnd hnd",  "class=\"hnd hnd\" style=\"ccolor:darkgrey; background: bblack; text-decoration: line-through; font-size:small;");
           post = post.replace( "class=\"hnd anon", "class=\"hnd anon\" style=\"ccolor:darkgrey; background: bdarkgrey; text-decoration: line-through; font-size:small;");

        }
        else if (fcolor=="block" && post.search(replacementString2) < 0) {
           //blockPost = true;
           post = post.replace( replaceRegex2, replacementString2 );
           post = post.replace( replaceRegex3, replacementString3 );
           post = post.replace( "class=\"hnd hnd",  "class=\"hnd hnd\" style=\"color:darkgrey; background: bblack; text-decoration: line-through; font-size:small;");
           post = post.replace( "class=\"hnd anon", "class=\"hnd anon\" style=\"color:darkgrey; background: bdarkgrey;text-decoration: line-through; font-size:small;");

	    }
	    else if (fcolor=="crush") {
           //blockPost = true;
           
           post = "";
            
           lastPostThisLevelCrushed[levelThisPost] = 1;

           
        }
        else if(post.search(replacementString) < 0 && post.search(replacementString2) < 0) {

          post = post.replace( "class=\"hnd", "class=\"hnd anon"  );
          post = post.replace( "class=\"hnd hnd",  "class=\"hnd hnd\" style=\"color: " + fcolor + "; background: Moccasin; font-weight: bold");
          post = post.replace( "class=\"hnd anon", "class=\"hnd anon\" style=\"color: " + fcolor + "; background: powderblue;     font-weight: bold");
          post = post.replace( "class=\"hnd own",  "class=\"hnd own\" style=\"color: " + fcolor + "; background: Moccasin;    font-weight: bold");

          
        }
      }  // end for(j) loop
        
      if (document.getElementById("trollBlockerFiltered").checked) {
         if (trollhash[handle] != undefined) {
            var replaceRegex3 = new RegExp("<b>.*<\/b><\/a>");
            //post = post.replace( replaceRegex3  , "<b>&hearts;____</b></a>" );

            //replaceRegex3 = new RegExp("(: \. \. )+");
            //post = post.replace( / : \. \. /g  , ".");
            posts[i] = post; //posts[i].innerHTML = post;
     }
      }
      else { posts[i] = post; } //posts[i].innerHTML = post; }

    }  // end for(i) loop
    //d(posts[lasti].innerHTML);
  postList.innerHTML = posts.join('\n');

  endtime = new Date().getTime();
  difftime = endtime - starttime;
  //d("time to block trolls: " + Math.round(difftime / 10) / 100 + " seconds");
}



function initTrollBlocker () {
  var docHTML = document.body.innerHTML;
  var strHTML = docHTML.substring(0, 300);
  //alert(strHTML);
  //if (docHTML == "Unable to process request, please try again. ") { return 0; }
  //badness ="&lt;html&gt;&lt;body&gt;&lt;pre&gt;Unable to process request, please try again. &lt;/pre&gt;";
  var foundUTPR = strHTML.search("Unable to process request") ;
  if (strHTML == "") foundUTPR = 1;
  if (foundUTPR > -1) { return 0; alert("|" + strHTML + "|"); }
  //if (docHTML.length() < 100) { alert("docHTML.length() == " + docHTML.length()); return; }

  // move document's tables inside divs
  tables = new Array();
  
  // make a copy of tables array
  for (i = 0; i < document.getElementsByTagName('table').length ; i++) {
    tables[i] = document.getElementsByTagName('table')[i];
  }
  // cache initial window height
  var upperdivheight = 0;
  starttime = new Date().getTime();

  // set up search reg exp to convert search link into a search form
  var replacestr = '<form method="GET" action="?" target="_blank" name="frm"><input size="15" name="SQ" value=""><input type="hidden" name="act" value="RSR"><input type="hidden" name="searchAID" value=""><input type="hidden" name="forumID" value="_forumid_"><input type="submit" value="search"></form>';
  var searchstr = '<a href="\\?fsid=(\\d+)" target="_top">search[^<]+</a>';
  searchstr = new RegExp(searchstr);
  var found = false;
      
  for (i = 0; i < tables.length ; i++) {
    t = tables[i];  
    div = document.createElement('div');
    
    if (t.className == "fbod threads") {
      div.id = "div_threads";
      found = true;
      
      var new_t = t.cloneNode(true);          
      new_t.id = "fbodthreads";
      // remove the first break line
      var inner = new_t.getElementsByTagName('td')[0].innerHTML;
      new_t.getElementsByTagName('td')[0].innerHTML = inner.replace("<br>", "");
      
            if (DIVIFY) {
                var inner = new_t.getElementsByTagName('td')[0].innerHTML;
                inner = inner.split("<br>");
                for (j in inner) {        
                    // locate post ID
                    var regex = new RegExp("act=Q&amp;ID=(\\d+)");  
                    if (inner[j].match(regex)) {
                        id = RegExp.$1;   
                        inner[j] = "<div id='"+id+"'>" + inner[j] + "</div>";         
                    }
                }

                new_t.getElementsByTagName('td')[0].innerHTML = inner.join("\n\n");
            }
      
      div.appendChild(new_t); 
      
      div.style.overflow = "auto";      
      div.style.border = "solid #bbb 1px";      
      div.style.width = "97%";
      div.style.position = "absolute";
      div.style.top = 10 + upperdivheight + "px";
            //div.style.height = "90%";
            var height = Math.round(100*(window.innerHeight - 15 - upperdivheight) / window.innerHeight);
            
            div.style.height = height + "%";
      document.body.appendChild(div); 

      //t.parentNode.removeChild(t);
    } else if (!found) {
      
      
      var targetstr = t.innerHTML;
      if (targetstr.match(searchstr)) {
        replacestr = replacestr.replace("_forumid_", RegExp.$1)
        t.innerHTML = targetstr.replace(searchstr, replacestr);
      }     
      
      upperdivheight += t.offsetHeight;
      div.appendChild(t.cloneNode(true));
      document.body.appendChild(div);
    }
  
    t.parentNode.removeChild(t);
  
  }

  //else { alert(docHTML.substring(0, 300)); }
  endtime = new Date().getTime();
  difftime = endtime - starttime;
  //d("Time to set up tables " + Math.round(difftime / 10) / 100 + " seconds");

  var stylesheet = document.createElement("style");
  stylesheet.innerHTML  = ".hnd:hover{ text-transform:lowercase_; text-decoration: underline;}";
  if (document.styleSheets[1].href.indexOf('day') > -1) {
    stylesheet.innerHTML += ".topLinks{background-color: #f4f4f4 ; border : solid #bbb 1px;  }";
  } else {
    stylesheet.innerHTML += ".topLinks{background-color: #000 ; border : solid #bbb 1px;  }";
  }
  stylesheet.innerHTML += ".topLinks{ opacity: 0.85; -moz-opacity: 0.85;  }";
  stylesheet.innerHTML += ".topLinks:hover { opacity: 1; -moz-opacity: 1;  } ";
  stylesheet.innerHTML += "a[target=R]:hover b { background-color:  #BFEFF8; color: black;  } ";
  stylesheet.innerHTML += "a[target=R]:visited:hover b { background-color: #FFCFFF; color: black; } ";
  document.body.insertBefore(stylesheet,document.body.firstChild);


  var trollListTableRow;
  var trollListTableData;

  // This layer is displayed when the Troll List is "closed"
  var trollListHiddenDiv ;
  trollListHiddenDiv = document.createElement("div");
  trollListHiddenDiv.id="trollListHiddenDiv";
  trollListHiddenDiv.name="trollListHiddenDiv";
  trollListHiddenDiv.align="right";
  //trollListHiddenDiv.style.width = document.body.clientWidth + "px"; // "100%";
  //trollListHiddenDiv.style.zIndex = -1;
  trollListHiddenDiv.style.position = "fixed";

  trollListTable = document.createElement("table");
  trollListTable.bgColor= "#e0e0e0";
  trollListTable.border=1;
  trollListTable.width=25;
  trollListTable.addEventListener("click", doOpenTrollList, false);
  trollListHiddenDiv.appendChild(trollListTable);

  trollListHiddenDiv.style.visibility = "visible";
  //trollListHiddenDiv.style.top  = 100; // document.body.scrollTop + 5;
  //trollListHiddenDiv.style.left = document.body.clientWidth - 100 + "px"; //600px // document.body.scrollLeft + document.body.clientWidth - 25 - trollListTable.width;
  trollListHiddenDiv.style.zIndex = 10;
  trollListHiddenDiv.style.right = 40 + "px";

  trollListTableRow = document.createElement("tr");
  trollListTableData = document.createElement("td");
  //trollListTableData.bgColor = "Silver";
  trollListTableData.align="center";
  trollListTable.appendChild(trollListTableRow);
  trollListTableRow.appendChild(trollListTableData);

  var trollListOpenLink = document.createElement("a");
  trollListOpenLink.id="trollListOpenLink";
  trollListOpenLink.name="trollListOpenLink";
  //trollListOpenLink.href="#";
  trollListOpenLink.onclick="return false;";
  trollListTableData.appendChild(trollListOpenLink);

  //trollListOpenLink.appendChild(trollListOpenLink = document.createElement("em"));
  trollListOpenLink.appendChild(trollListOpenLink = document.createElement("font"));
  trollListOpenLink.size=1;
  trollListOpenLink.color="red";
  //trollListOpenLink.style.fontWeight="bold";
  trollListOpenLink.appendChild(document.createTextNode("User List"));
  
  // This layer is displayed when the Troll List is "open"
  var trollListBR;
  var trollListDiv = document.createElement("div");
  trollListDiv.id="trollListDiv";
  trollListDiv.name="trollListDiv";

  trollListDiv.style.visibility = "hidden";
  trollListDiv.style.position =  "fixed"; //
  trollListDiv.align="right";
  trollListDiv.style.zIndex = 10;
  //trollListDiv.style.width = document.body.clientWidth+"px";
  //trollListDiv.style.top  = 5; // document.body.scrollTop + 5;
  //trollListDiv.style.left = document.body.clientWidth - 240 + "px"; // document.body.scrollLeft + document.body.clientWidth - 25 - trollListTable.width;
  trollListDiv.style.right = 40 + "px";

  
  // an X button to close the div
  var xbtn = document.createElement('button');
  xbtn.type = "button";
  xbtn.id = "xbutton";
  xbtn.innerHTML = "x";
  xbtn.style.position = "relative";
  xbtn.style.top = "30px";
  xbtn.style.right = "5px";
  //xbtn.style.height = "10px";
  //xbtn.style.width = "10px";
  //xbtn.style.float = "right";
  xbtn.addEventListener("click", doTrollListCancelButton, false);
  trollListDiv.appendChild(xbtn);


  var trollListTableRow;
  var trollListTableData;

  trollListTable = document.createElement("table");
  trollListTable.border=1;
  trollListTable.width=180;
  trollListTable.bgColor="Silver";  // "#f4f4f4";
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

  var trollListHeaderContent = document.createTextNode("TrollCrusher User List");
  trollListHeader.appendChild(trollListHeaderContent);

  var trollListInfo = document.createElement("font");
  trollListInfo.size=1;
  var trollListInfoContent = document.createTextNode("handle|crush handle|block handle|ignore handle|'color' handle|female or handle|male");
  trollListBR = document.createElement("br");
  trollListTableData.appendChild(trollListBR);
  trollListTableData.appendChild(trollListInfo);
  trollListInfo.appendChild(trollListInfoContent);

  // add a row with a label that says "filter:" and a textbox for a filter
  trollListTableRow = document.createElement("tr");
  trollListTableData = document.createElement("td");
  trollListTable.appendChild(trollListTableRow);
  trollListTableRow.appendChild(trollListTableData);

  var trollListFilterFont = document.createElement("font");
  trollListFilterFont.size=1;
  var trollListFilterLabel = document.createTextNode("filter:");
  trollListHeader.appendChild(trollListHeaderContent);
  var trollListFilterText = document.createElement("input");
  trollListFilterText.type = "text";
  trollListFilterText.id = "trollListFilterText";
  trollListFilterText.addEventListener("keydown", nospaces, false);
  trollListFilterText.addEventListener("keyup", filterTrollList, false);
  trollListTableData.appendChild(trollListFilterFont);
  trollListFilterFont.appendChild(trollListFilterLabel);
  trollListTableData.appendChild(trollListFilterText);

  // next row contains list of trollios
  var trollListContent = document.createElement("textarea");
  trollListContent.id="trollListContent";
  trollListContent.name="trollListContent";
  //trollListContents.style.margin-left="0px";
  trollListContent.cols=24;
  trollListContent.rows=10;
  trollListContent.className = "color";

  trollListTableRow = document.createElement("tr");
  trollListTableData = document.createElement("td");
  trollListTable.appendChild(trollListTableRow);
  trollListTableRow.appendChild(trollListTableData);
  trollListTableData.appendChild(trollListContent);


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
  trollBlockerEnabledLabel.appendChild(document.createTextNode(" enable Troll Crusher"));

  var trollBlockerFilter = document.createElement("input");
  trollBlockerFilter.id="trollBlockerFiltered";
  trollBlockerFilter.name="trollBlockerFiltered";
  trollBlockerFilter.type="checkbox";
  trollBlockerFilter.disabled = "1";
  trollBlockerFilter.style.visibility = "hidden";

  var trollBlockerFilterLabel = document.createElement("label");
  trollBlockerFilterLabel.appendChild(trollBlockerFilter);
  trollListTableRow = document.createElement("tr");
  trollListTableData = document.createElement("td");
  trollListTable.appendChild(trollListTableRow);
  trollListTableRow.appendChild(trollListTableData);
  trollListTableData.appendChild(trollBlockerFilterLabel);

  trollBlockerFilterLabel.appendChild(trollBlockerFilterLabel = document.createElement("font"));
  trollBlockerFilterLabel.size=2;
  trollBlockerFilterLabel.appendChild(document.createTextNode("version: " + $ver$)); //(" Filter out all except"));


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

 
  dt = document.getElementById('div_threads');
  if (false) {
  //alert(trollListDiv + " " +  trollListHiddenDiv);
  dt.insertBefore(trollListDiv      , dt.firstChild);
  dt.insertBefore(trollListHiddenDiv, dt.firstChild);
  //alert("dt: " + dt + "\nadded " + topLinksHiddenDiv);
  } else {
  //alert(":( new_t not found");
    document.body.insertBefore(trollListDiv,       document.body.firstChild);
    document.body.insertBefore(trollListHiddenDiv, document.body.firstChild);
  }

  var postsList = document.getElementById("topLinksTable"); //document.getElementsByTagName("table")[2];
  if (postsList) {
    postsList.parentNode.insertBefore(trollListDiv,postsList);
  } else {
    document.body.insertBefore(trollListDiv,document.body.firstChild);
  }

  closeTrollList();
}

function d(str) {
  if ($DEBUG) alert(str); 
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

  document.cookie = escape(CookieName ) + "=" + escape(CookieValue) + "; expires=" + expireDate.toGMTString() + "; domain=.craigslist.org; path=/";
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

/**
 * jscolor, JavaScript Color Picker
 *
 * @version 1.3.1
 * @license GNU Lesser General Public License, http://www.gnu.org/copyleft/lesser.html
 * @author  Jan Odvarko, http://odvarko.cz
 * @created 2008-06-15
 * @updated 2010-01-23
 * @link    http://jscolor.com
 */


var jscolor = {


    dir : '', // location of jscolor directory (leave empty to autodetect)
    bindClass : 'color', // class name
    binding : true, // automatic binding via <input class="...">
    preloading : false, // use image preloading?


    install : function() {
        jscolor.addEvent(window, 'load', jscolor.init);
    },


    init : function() {
    //d('init');
        if(jscolor.binding) {
            jscolor.bind();
        }
        if(jscolor.preloading) {
            jscolor.preload();
        }
    },


    getDir : function() {
    //d('getDir');
        return "";
        if(!jscolor.dir) {
            var detected = jscolor.detectDir();
            jscolor.dir = detected!==false ? detected : 'jscolor/';
        }
        return jscolor.dir;
    },


    detectDir : function() {
    //d('detectDir');
        var base = location.href;

        var e = document.getElementsByTagName('base');
        for(var i=0; i<e.length; i+=1) {
            if(e[i].href) { base = e[i].href; }
        }

        var e = document.getElementsByTagName('script');
        for(var i=0; i<e.length; i+=1) {
            if(e[i].src && /(^|\/)jscolor\.js([?#].*)?$/i.test(e[i].src)) {
                var src = new jscolor.URI(e[i].src);
                var srcAbs = src.toAbsolute(base);
                srcAbs.path = srcAbs.path.replace(/[^\/]+$/, ''); // remove filename
                srcAbs.query = null;
                srcAbs.fragment = null;
                return srcAbs.toString();
            }
        }
        return false;
    },


    bind : function() {
    //d('bind');
        var matchClass = new RegExp('(^|\\s)('+jscolor.bindClass+')\\s*(\\{[^}]*\\})?', 'i');
        var e = document.getElementsByTagName('textarea');
        for(var i=0; i<e.length; i+=1) {
            var m;
            if(!e[i].color && e[i].className && (m = e[i].className.match(matchClass))) {
                var prop = {};
                if(m[3]) {
                    try {
                        eval('prop='+m[3]);
                    } catch(eInvalidProp) {}
                }
                e[i].color = new jscolor.color(e[i], prop);
            }
        }
    },


    preload : function() {
    //d('preload');
        for(var fn in jscolor.imgRequire) {
            if(jscolor.imgRequire.hasOwnProperty(fn)) {
                jscolor.loadImage(fn);
            }
        }
    },


    images : {
        pad : [ 181, 101 ],
        sld : [ 16, 101 ],
        cross : [ 15, 15 ],
        arrow : [ 7, 11 ]
    },


    imgRequire : {},
    imgLoaded : {},


    requireImage : function(filename) {
        jscolor.imgRequire[filename] = true;
    },


    loadImage : function(filename) {
        if(!jscolor.imgLoaded[filename]) {
            jscolor.imgLoaded[filename] = new Image();
            jscolor.imgLoaded[filename].src = jscolor.getDir()+filename;
        }
    },


    fetchElement : function(mixed) {
        return typeof mixed === 'string' ? document.getElementById(mixed) : mixed;
    },


    addEvent : function(el, evnt, func) {
        if(el.addEventListener) {
            el.addEventListener(evnt, func, false);
        } else if(el.attachEvent) {
            el.attachEvent('on'+evnt, func);
        }
    },


    fireEvent : function(el, evnt) {
        if(!el) {
            return;
        }
        if(document.createEventObject) {
            var ev = document.createEventObject();
            el.fireEvent('on'+evnt, ev);
        } else if(document.createEvent) {
            var ev = document.createEvent('HTMLEvents');
            ev.initEvent(evnt, true, true);
            el.dispatchEvent(ev);
        } else if(el['on'+evnt]) { // alternatively use the traditional event model (IE5)
            el['on'+evnt]();
        }
    },


    getElementPos : function(e) {
        var e1=e, e2=e;
        var x=0, y=0;
        if(e1.offsetParent) {
            do {
                x += e1.offsetLeft;
                y += e1.offsetTop;
            } while(e1 = e1.offsetParent);
        }
        while((e2 = e2.parentNode) && e2.nodeName.toUpperCase() !== 'BODY') {
            x -= e2.scrollLeft;
            y -= e2.scrollTop;
        }
        return [x, y];
    },


    getElementSize : function(e) {
        return [e.offsetWidth, e.offsetHeight];
    },


    getMousePos : function(e) {
        if(!e) { e = window.event; }
        if(typeof e.pageX === 'number') {
            return [e.pageX, e.pageY];
        } else if(typeof e.clientX === 'number') {
            return [
                e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
                e.clientY + document.body.scrollTop + document.documentElement.scrollTop
            ];
        }
    },


    getViewPos : function() {
        if(typeof window.pageYOffset === 'number') {
            return [window.pageXOffset, window.pageYOffset];
        } else if(document.body && (document.body.scrollLeft || document.body.scrollTop)) {
            return [document.body.scrollLeft, document.body.scrollTop];
        } else if(document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
            return [document.documentElement.scrollLeft, document.documentElement.scrollTop];
        } else {
            return [0, 0];
        }
    },


    getViewSize : function() {
        if(typeof window.innerWidth === 'number') {
            return [window.innerWidth, window.innerHeight];
        } else if(document.body && (document.body.clientWidth || document.body.clientHeight)) {
            return [document.body.clientWidth, document.body.clientHeight];
        } else if(document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            return [document.documentElement.clientWidth, document.documentElement.clientHeight];
        } else {
            return [0, 0];
        }
    },


    URI : function(uri) { // See RFC3986

        this.scheme = null;
        this.authority = null;
        this.path = '';
        this.query = null;
        this.fragment = null;

        this.parse = function(uri) {
            var m = uri.match(/^(([A-Za-z][0-9A-Za-z+.-]*)(:))?((\/\/)([^\/?#]*))?([^?#]*)((\?)([^#]*))?((#)(.*))?/);
            this.scheme = m[3] ? m[2] : null;
            this.authority = m[5] ? m[6] : null;
            this.path = m[7];
            this.query = m[9] ? m[10] : null;
            this.fragment = m[12] ? m[13] : null;
            return this;
        };

        this.toString = function() {
            var result = '';
            if(this.scheme !== null) { result = result + this.scheme + ':'; }
            if(this.authority !== null) { result = result + '//' + this.authority; }
            if(this.path !== null) { result = result + this.path; }
            if(this.query !== null) { result = result + '?' + this.query; }
            if(this.fragment !== null) { result = result + '#' + this.fragment; }
            return result;
        };

        this.toAbsolute = function(base) {
            var base = new jscolor.URI(base);
            var r = this;
            var t = new jscolor.URI;

            if(base.scheme === null) { return false; }

            if(r.scheme !== null && r.scheme.toLowerCase() === base.scheme.toLowerCase()) {
                r.scheme = null;
            }

            if(r.scheme !== null) {
                t.scheme = r.scheme;
                t.authority = r.authority;
                t.path = removeDotSegments(r.path);
                t.query = r.query;
            } else {
                if(r.authority !== null) {
                    t.authority = r.authority;
                    t.path = removeDotSegments(r.path);
                    t.query = r.query;
                } else {
                    if(r.path === '') { // TODO: == or === ?
                        t.path = base.path;
                        if(r.query !== null) {
                            t.query = r.query;
                        } else {
                            t.query = base.query;
                        }
                    } else {
                        if(r.path.substr(0,1) === '/') {
                            t.path = removeDotSegments(r.path);
                        } else {
                            if(base.authority !== null && base.path === '') { // TODO: == or === ?
                                t.path = '/'+r.path;
                            } else {
                                t.path = base.path.replace(/[^\/]+$/,'')+r.path;
                            }
                            t.path = removeDotSegments(t.path);
                        }
                        t.query = r.query;
                    }
                    t.authority = base.authority;
                }
                t.scheme = base.scheme;
            }
            t.fragment = r.fragment;

            return t;
        };

        function removeDotSegments(path) {
            var out = '';
            while(path) {
                if(path.substr(0,3)==='../' || path.substr(0,2)==='./') {
                    path = path.replace(/^\.+/,'').substr(1);
                } else if(path.substr(0,3)==='/./' || path==='/.') {
                    path = '/'+path.substr(3);
                } else if(path.substr(0,4)==='/../' || path==='/..') {
                    path = '/'+path.substr(4);
                    out = out.replace(/\/?[^\/]*$/, '');
                } else if(path==='.' || path==='..') {
                    path = '';
                } else {
                    var rm = path.match(/^\/?[^\/]*/)[0];
                    path = path.substr(rm.length);
                    out = out + rm;
                }
            }
            return out;
        }

        if(uri) {
            this.parse(uri);
        }

    },


    /*
     * Usage example:
     * var myColor = new jscolor.color(myInputElement)
     */

    color : function(target, prop) {


        this.required = true; // refuse empty values?
        this.adjust = true; // adjust value to uniform notation?
        this.hash = true; // prefix color with # symbol?
        this.caps = false; // uppercase?
        this.valueElement = target; // value holder
        this.styleElement = target; // where to reflect current color
        this.hsv = [0, 0, 1]; // read-only  0-6, 0-1, 0-1
        this.rgb = [1, 1, 1]; // read-only  0-1, 0-1, 0-1

        this.pickerOnfocus = true; // display picker on focus?
        this.pickerMode = 'HSV'; // HSV | HVS
        this.pickerPosition = 'bottom'; // left | right | top | bottom
        this.pickerFace = 10; // px
        this.pickerFaceColor = 'ThreeDFace'; // CSS color
        this.pickerBorder = 1; // px
        this.pickerBorderColor = 'ThreeDHighlight ThreeDShadow ThreeDShadow ThreeDHighlight'; // CSS color
        this.pickerInset = 1; // px
        this.pickerInsetColor = 'ThreeDShadow ThreeDHighlight ThreeDHighlight ThreeDShadow'; // CSS color
        this.pickerZIndex = 10000;


        for(var p in prop) {
            if(prop.hasOwnProperty(p)) {
                this[p] = prop[p];
            }
        }


        this.hidePicker = function() {
            if(isPickerOwner()) {
                removePicker();
            }
        };


        this.showPicker = function() {
            if(!isPickerOwner()) {
                var tp = jscolor.getElementPos(target); // target pos
                var ts = jscolor.getElementSize(target); // target size
                var vp = jscolor.getViewPos(); // view pos
                var vs = jscolor.getViewSize(); // view size
                var ps = [ // picker size
                    2*this.pickerBorder + 4*this.pickerInset + 2*this.pickerFace + jscolor.images.pad[0] + 2*jscolor.images.arrow[0] + jscolor.images.sld[0],
                    2*this.pickerBorder + 2*this.pickerInset + 2*this.pickerFace + jscolor.images.pad[1]
                ];
                var a, b, c;
                switch(this.pickerPosition.toLowerCase()) {
                    case 'left': a=1; b=0; c=-1; break;
                    case 'right':a=1; b=0; c=1; break;
                    case 'top':  a=0; b=1; c=-1; break;
                    default:     a=0; b=1; c=1; break;
                }
                var l = (ts[b]+ps[b])/2;
                var pp = [ // picker pos
                    -vp[a]+tp[a]+ps[a] > vs[a] ?
                        (-vp[a]+tp[a]+ts[a]/2 > vs[a]/2 && tp[a]+ts[a]-ps[a] >= 0 ? tp[a]+ts[a]-ps[a] : tp[a]) :
                        tp[a],
                    -vp[b]+tp[b]+ts[b]+ps[b]-l+l*c > vs[b] ?
                        (-vp[b]+tp[b]+ts[b]/2 > vs[b]/2 && tp[b]+ts[b]-l-l*c >= 0 ? tp[b]+ts[b]-l-l*c : tp[b]+ts[b]-l+l*c) :
                        (tp[b]+ts[b]-l+l*c >= 0 ? tp[b]+ts[b]-l+l*c : tp[b]+ts[b]-l-l*c)
                ];
                /*var pp = [ // picker pos
                    document.getElementById('trollListDiv').style.right - 
                    THIS.pickerBorder+THIS.pickerFace+THIS.pickerInset,
                    document.getElementById('trollListDiv').style.top + 
                    document.getElementById('trollListDiv').innerHeight

                ];*/
                drawPicker(pp[a]-10, pp[b]+80);
            }
        };


        this.importColor = function() {
        d('importColor');
            if(!valueElement) {
                this.exportColor();
            } else {
                if(!this.adjust) {
                    if(!this.fromString(valueElement.value, leaveValue)) {
                        //styleElement.style.backgroundColor = styleElement.jscStyle.backgroundColor;
                        //styleElement.style.color = styleElement.jscStyle.color;
                        this.exportColor(leaveValue | leaveStyle);
                    }
                } else if(!this.required && /^\s*$/.test(valueElement.value)) {
                    //valueElement.value = '';
                    //styleElement.style.backgroundColor = styleElement.jscStyle.backgroundColor;
                    //styleElement.style.color = styleElement.jscStyle.color;
                    var start = valueElement.selectionStart;
                    var end = start + styleElement.jscStyle.color.length;
                    valueElement.value = replaceByIndex(valueElement.value, valueElement.selectionStart, valueElement.selectionEnd, styleElement.jscStyle.color);

                    valueElement.selectionStart = end;
                    valueElement.selectionEnd   = end;

                    this.exportColor(leaveValue | leaveStyle);

                } else if(this.fromString(valueElement.value)) {
                    // OK
                } else {
                    this.exportColor();
                }
            }
        };


        this.exportColor = function(flags) {
        d('exportColor');
            if(!(flags & leaveValue) && valueElement) {
                var value = this.toString();
                if(this.caps) { value = value.toUpperCase(); }
                if(this.hash) { value = '|#'+value; }
                //valueElement.value = value;
                var start = valueElement.selectionStart;
                var end = start + value.length;
                valueElement.value = replaceByIndex(valueElement.value, valueElement.selectionStart, valueElement.selectionEnd, value);

                valueElement.selectionStart = start;
                valueElement.selectionEnd   = end;
                
            }
            /*if(!(flags & leaveStyle) && styleElement) {
                styleElement.style.backgroundColor =
                    '#'+this.toString();
                styleElement.style.color =
                    0.213 * this.rgb[0] +
                    0.715 * this.rgb[1] +
                    0.072 * this.rgb[2]
                    < 0.5 ? '#FFF' : '#000';
            }*/
            if(!(flags & leavePad) && isPickerOwner()) {
                redrawPad();
            }
            if(!(flags & leaveSld) && isPickerOwner()) {
                redrawSld();
            }
        };


        this.fromHSV = function(h, s, v, flags) { // null = don't change
            h<0 && (h=0) || h>6 && (h=6);
            s<0 && (s=0) || s>1 && (s=1);
            v<0 && (v=0) || v>1 && (v=1);
            this.rgb = HSV_RGB(
                h===null ? this.hsv[0] : (this.hsv[0]=h),
                s===null ? this.hsv[1] : (this.hsv[1]=s),
                v===null ? this.hsv[2] : (this.hsv[2]=v)
            );
            this.exportColor(flags);
        };


        this.fromRGB = function(r, g, b, flags) { // null = don't change
            r<0 && (r=0) || r>1 && (r=1);
            g<0 && (g=0) || g>1 && (g=1);
            b<0 && (b=0) || b>1 && (b=1);
            var hsv = RGB_HSV(
                r===null ? this.rgb[0] : (this.rgb[0]=r),
                g===null ? this.rgb[1] : (this.rgb[1]=g),
                b===null ? this.rgb[2] : (this.rgb[2]=b)
            );
            if(hsv[0] !== null) {
                this.hsv[0] = hsv[0];
            }
            if(hsv[2] !== 0) {
                this.hsv[1] = hsv[1];
            }
            this.hsv[2] = hsv[2];
            this.exportColor(flags);
        };


        this.fromString = function(hex, flags) {
            var m = hex.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i);
            if(!m) {
                return false;
            } else {
                if(m[1].length === 6) { // 6-char notation
                    this.fromRGB(
                        parseInt(m[1].substr(0,2),16) / 255,
                        parseInt(m[1].substr(2,2),16) / 255,
                        parseInt(m[1].substr(4,2),16) / 255,
                        flags
                    );
                } else { // 3-char notation
                    this.fromRGB(
                        parseInt(m[1].charAt(0)+m[1].charAt(0),16) / 255,
                        parseInt(m[1].charAt(1)+m[1].charAt(1),16) / 255,
                        parseInt(m[1].charAt(2)+m[1].charAt(2),16) / 255,
                        flags
                    );
                }
                return true;
            }
        };


        this.toString = function() {
            return (
                (0x100 | Math.round(255*this.rgb[0])).toString(16).substr(1) +
                (0x100 | Math.round(255*this.rgb[1])).toString(16).substr(1) +
                (0x100 | Math.round(255*this.rgb[2])).toString(16).substr(1)
            );
        };


        function RGB_HSV(r, g, b) {
            var n = Math.min(Math.min(r,g),b);
            var v = Math.max(Math.max(r,g),b);
            var m = v - n;
            if(m === 0) { return [ null, 0, v ]; }
            var h = r===n ? 3+(b-g)/m : (g===n ? 5+(r-b)/m : 1+(g-r)/m);
            return [ h===6?0:h, m/v, v ];
        }


        function HSV_RGB(h, s, v) {
            if(h === null) { return [ v, v, v ]; }
            var i = Math.floor(h);
            var f = i%2 ? h-i : 1-(h-i);
            var m = v * (1 - s);
            var n = v * (1 - s*f);
            switch(i) {
                case 6:
                case 0: return [v,n,m];
                case 1: return [n,v,m];
                case 2: return [m,v,n];
                case 3: return [m,n,v];
                case 4: return [n,m,v];
                case 5: return [v,m,n];
            }
        }


        function removePicker() {
            delete jscolor.picker.owner;
            document.getElementsByTagName('body')[0].removeChild(jscolor.picker.boxB);
        }


        function drawPicker(x, y) {
        //d('drawPicker');
            if(!jscolor.picker) {                
                jscolor.picker = {                
                    box  : document.createElement('div'),
                    boxB : document.createElement('div'),
                    pad  : document.createElement('div'),
                    pad2 : document.createElement('div'),
                    padB : document.createElement('div'),
                    padM : document.createElement('div'),
                    sld  : document.createElement('div'),
                    sldB : document.createElement('div'),
                    sldM : document.createElement('div')
                };
                for(var i=0,segSize=4; i<jscolor.images.sld[1]; i+=segSize) {
                    var seg = document.createElement('div');
                    seg.style.height = segSize+'px';
                    seg.style.fontSize = '1px';
                    seg.style.lineHeight = '0';
                    jscolor.picker.sld.appendChild(seg);
                }
                jscolor.picker.sldB.appendChild(jscolor.picker.sld);
                jscolor.picker.box.appendChild(jscolor.picker.sldB);
                jscolor.picker.box.appendChild(jscolor.picker.sldM);
                jscolor.picker.padB.appendChild(jscolor.picker.pad);
                jscolor.picker.padB.appendChild(jscolor.picker.pad2);
                jscolor.picker.box.appendChild(jscolor.picker.padB);
                jscolor.picker.box.appendChild(jscolor.picker.padM);
                jscolor.picker.boxB.appendChild(jscolor.picker.box);
            }

            var p = jscolor.picker;
            d(p.box);

            // recompute controls positions
            posPad = [
                x+THIS.pickerBorder+THIS.pickerFace+THIS.pickerInset,
                y+THIS.pickerBorder+THIS.pickerFace+THIS.pickerInset ];
            posSld = [
                null,
                y+THIS.pickerBorder+THIS.pickerFace+THIS.pickerInset ];

            // controls interaction
            p.box.addEventListener('mouseup',   function() { holdPad=false; target.focus(); }, false);
            p.box.addEventListener('mouseout',  function() { holdPad=false; target.focus(); }, false);
            p.box.addEventListener('mousedown', function() { abortBlur=true; }, false);
            p.box.addEventListener('mousemove', function(e) { holdPad && setPad(e); holdSld && setSld(e); }, false);
            p.padM.addEventListener('onmouseup', function()  { if(holdPad) { holdPad=false; jscolor.fireEvent(valueElement,'change'); } }, false);
            p.padM.addEventListener('mouseout',  function()  { if(holdPad) { holdPad=false; jscolor.fireEvent(valueElement,'change'); } }, false);
            p.padM.addEventListener('mousedown', function(e) { holdPad=true; setPad(e); }, false);
            p.sldM.addEventListener('mouseup',   function()  { if(holdSld) { holdSld=false; jscolor.fireEvent(valueElement,'change'); } }, false);
            p.sldM.addEventListener('mouseout',  function()  { if(holdSld) { holdSld=false; jscolor.fireEvent(valueElement,'change'); } }, false);
            p.sldM.addEventListener('mousedown', function(e) { holdSld=true; setSld(e); }, false);

            // picker
            p.box.style.width = 4*THIS.pickerInset + 2*THIS.pickerFace + jscolor.images.pad[0] + 2*jscolor.images.arrow[0] + jscolor.images.sld[0] + 'px';
            p.box.style.height = 2*THIS.pickerInset + 2*THIS.pickerFace + jscolor.images.pad[1] + 'px';

            // picker border
            p.boxB.style.position = 'absolute';
            p.boxB.style.clear = 'both';
            p.boxB.style.left = x+'px';
            p.boxB.style.top = y+'px';
            p.boxB.style.zIndex = THIS.pickerZIndex;
            p.boxB.style.border = THIS.pickerBorder+'px solid';
            p.boxB.style.borderColor = THIS.pickerBorderColor;
            p.boxB.style.background = THIS.pickerFaceColor;

            // pad image
            p.pad.style.width = jscolor.images.pad[0]+'px';
            p.pad.style.height = jscolor.images.pad[1]+'px';
            p.pad2.style.width  = p.pad.style.width;
            p.pad2.style.height = p.pad.style.height;
            p.pad2.style.position = 'absolute';
            p.pad2.style.left   = '0px';
            p.pad2.style.top    = '0px';
            p.pad2.style.zIndex = '-1';

            // pad border
            p.padB.style.position = 'absolute';
            p.padB.style.left = THIS.pickerFace+'px';
            p.padB.style.top = THIS.pickerFace+'px';
            p.padB.style.border = THIS.pickerInset+'px solid';
            p.padB.style.borderColor = THIS.pickerInsetColor;

            // pad mouse area
            p.padM.style.position = 'absolute';
            p.padM.style.left = '0';
            p.padM.style.top = '0';
            p.padM.style.width = THIS.pickerFace + 2*THIS.pickerInset + jscolor.images.pad[0] + jscolor.images.arrow[0] + 'px';
            p.padM.style.height = p.box.style.height;
            p.padM.style.cursor = 'crosshair';

            // slider image
            p.sld.style.overflow = 'hidden';
            p.sld.style.width = jscolor.images.sld[0]+'px';
            p.sld.style.height = jscolor.images.sld[1]+'px';

            // slider border
            p.sldB.style.position = 'absolute';
            p.sldB.style.right = THIS.pickerFace+'px';
            p.sldB.style.top = THIS.pickerFace+'px';
            p.sldB.style.border = THIS.pickerInset+'px solid';
            p.sldB.style.borderColor = THIS.pickerInsetColor;

            // slider mouse area
            p.sldM.style.position = 'absolute';
            p.sldM.style.right = '0';
            p.sldM.style.top = '0';
            p.sldM.style.width = jscolor.images.sld[0] + jscolor.images.arrow[0] + THIS.pickerFace + 2*THIS.pickerInset + 'px';
            p.sldM.style.height = p.box.style.height;
            try {
                p.sldM.style.cursor = 'pointer';
            } catch(eOldIE) {
                p.sldM.style.cursor = 'hand';
            }

            // load images in optimal order
            switch(modeID) {
                case 0: var padImg = 'http://i.imgur.com/zgH4H.png'; break;
                case 1: var padImg = 'http://i.imgur.com/DH3SP.png'; break;
            }
            p.padM.style.background = "url('http://i.imgur.com/kjtPZ.gif') no-repeat";
            p.sldM.style.background = "url('http://i.imgur.com/rjAAz.gif') no-repeat";
            p.pad.style.background  = "url('http://i.imgur.com/zgH4H.png') 0 0 no-repeat"; //http://i.imgur.com/DH3SP.png
            p.pad2.style.background = "url('http://i.imgur.com/DH3SP.png') 0 0 no-repeat"; //http://i.imgur.com/DH3SP.png

            // place pointers
            redrawPad();
            redrawSld();

            jscolor.picker.owner = THIS;
            document.getElementsByTagName('body')[0].appendChild(p.boxB);
        }


        function redrawPad() {
        //d('redrawPad');
            // redraw the pad pointer
            switch(modeID) {
                case 0: var yComponent = 1; break;
                case 1: var yComponent = 2; break;
            }
            var x = Math.round((THIS.hsv[0]/6) * (jscolor.images.pad[0]-1));
            var y = Math.round((1-THIS.hsv[yComponent]) * (jscolor.images.pad[1]-1));
            jscolor.picker.padM.style.backgroundPosition =
                (THIS.pickerFace+THIS.pickerInset+x - Math.floor(jscolor.images.cross[0]/2)) + 'px ' +
                (THIS.pickerFace+THIS.pickerInset+y - Math.floor(jscolor.images.cross[1]/2)) + 'px';

            // redraw the slider image
            var seg = jscolor.picker.sld.childNodes;

            switch(modeID) {
                case 0:
                    var rgb = HSV_RGB(THIS.hsv[0], THIS.hsv[1], 1);
                    for(var i=0; i<seg.length; i+=1) {
                        seg[i].style.backgroundColor = 'rgb('+
                            (rgb[0]*(1-i/seg.length)*100)+'%,'+
                            (rgb[1]*(1-i/seg.length)*100)+'%,'+
                            (rgb[2]*(1-i/seg.length)*100)+'%)';
                    }
                    break;
                case 1:
                    var rgb, s, c = [ THIS.hsv[2], 0, 0 ];
                    var i = Math.floor(THIS.hsv[0]);
                    var f = i%2 ? THIS.hsv[0]-i : 1-(THIS.hsv[0]-i);
                    switch(i) {
                        case 6:
                        case 0: rgb=[0,1,2]; break;
                        case 1: rgb=[1,0,2]; break;
                        case 2: rgb=[2,0,1]; break;
                        case 3: rgb=[2,1,0]; break;
                        case 4: rgb=[1,2,0]; break;
                        case 5: rgb=[0,2,1]; break;
                    }
                    for(var i=0; i<seg.length; i+=1) {
                        s = 1 - 1/(seg.length-1)*i;
                        c[1] = c[0] * (1 - s*f);
                        c[2] = c[0] * (1 - s);
                        seg[i].style.backgroundColor = 'rgb('+
                            (c[rgb[0]]*100)+'%,'+
                            (c[rgb[1]]*100)+'%,'+
                            (c[rgb[2]]*100)+'%)';
                    }
                    break;
            }
        }


        function redrawSld() {
            // redraw the slider pointer
            switch(modeID) {
                case 0: var yComponent = 2; break;
                case 1: var yComponent = 1; break;
            }
            var y = Math.round((1-THIS.hsv[yComponent]) * (jscolor.images.sld[1]-1));
            jscolor.picker.sldM.style.backgroundPosition =
                '0 ' + (THIS.pickerFace+THIS.pickerInset+y - Math.floor(jscolor.images.arrow[1]/2)) + 'px';
            var opacity = (100 - y) / 100;
            jscolor.picker.pad.style.opacity = opacity;

        }


        function isPickerOwner() {
            return jscolor.picker && jscolor.picker.owner === THIS;
        }


        function blurTarget() {
        d('blurTarget');
            if(valueElement === target) {
                //THIS.importColor();
            }
            if(THIS.pickerOnfocus) {
                THIS.hidePicker();
            }
        }


        function blurValue() {
            if(valueElement !== target) {
                //THIS.importColor();
            }
        }


        function setPad(e) {
            var posM = jscolor.getMousePos(e);
            var x = posM[0]-posPad[0];
            var y = posM[1]-posPad[1];
            switch(modeID) {
                case 0: THIS.fromHSV(x*(6/(jscolor.images.pad[0]-1)), 1 - y/(jscolor.images.pad[1]-1), null, leaveSld); break;
                case 1: THIS.fromHSV(x*(6/(jscolor.images.pad[0]-1)), null, 1 - y/(jscolor.images.pad[1]-1), leaveSld); break;
            }
        }


        function setSld(e) {
            var posM = jscolor.getMousePos(e);
            var y = posM[1]-posPad[1];
            switch(modeID) {
                case 0: THIS.fromHSV(null, null, 1 - y/(jscolor.images.sld[1]-1), leavePad); break;
                case 1: THIS.fromHSV(null, 1 - y/(jscolor.images.sld[1]-1), null, leavePad); break;
            }
        }


        var THIS = this;
        var modeID = this.pickerMode.toLowerCase()==='hvs' ? 1 : 0;
        var abortBlur = false;
        var
            valueElement = jscolor.fetchElement(this.valueElement),
            styleElement = jscolor.fetchElement(this.styleElement);
        var
            holdPad = false,
            holdSld = false;
        var
            posPad,
            posSld;
        var
            leaveValue = 1<<0,
            leaveStyle = 1<<1,
            leavePad = 1<<2,
            leaveSld = 1<<3;

        // target
        jscolor.addEvent(target, 'focus', function() {
            if(THIS.pickerOnfocus) { THIS.showPicker(); }
        });
        jscolor.addEvent(target, 'blur', function() {
            if(!abortBlur) {
                window.setTimeout(function(){ abortBlur || blurTarget(); abortBlur=false; }, 0);
            } else {
                abortBlur = false;
            }
        });

        // valueElement
        if(valueElement) {
            var updateField = function() {
                THIS.fromString(valueElement.value, leaveValue);
            };
            jscolor.addEvent(valueElement, 'keyup', updateField);
            jscolor.addEvent(valueElement, 'input', updateField);
            jscolor.addEvent(valueElement, 'blur', blurValue);
            valueElement.setAttribute('autocomplete', 'off');
        }

        // styleElement
        if(styleElement) {
            styleElement.jscStyle = {
                backgroundColor : styleElement.style.backgroundColor,
                color : styleElement.style.color
            };
        }

        // require images
        switch(modeID) {
            case 0: jscolor.requireImage('http://i.imgur.com/zgH4H.png'); break;
            case 1: jscolor.requireImage('http://i.imgur.com/DH3SP.png'); break;
        }
        jscolor.requireImage('http://i.imgur.com/kjtPZ.gif');
        jscolor.requireImage('http://i.imgur.com/rjAAz.gif');

        //this.importColor();
    }

};

function replaceByIndex(string, startIndex, endIndex, substring) {
    return string.substr(0, startIndex) + substring + string.substr(endIndex);
}


// get info from an array, put into a multi-line string
function arr(el) {
    var output = "";
  //alert(el.tagName);
  //return output;
  
    for(i in el){
    if (i == "textContent") continue;
    if (i == "innerHTML") continue;
  if (typeof el[i] == "function") continue;
    if (typeof el[i] == "number") continue;
    if (typeof el[i] == "undefined") continue;
    if (typeof el[i] == null) continue;
   
    output += "."+i+": "+el[i]+"\n";
    }
    return output;
}

document.addEventListener(
  "dblclick",  
  paint, 
  true);


function paint(e) {
    if (e.button > 0) return;  //only accept left mouse button click
  elem = e.target;
  //alert(elem.tagName + " " + elem.id + " " + isNaN(elem.id));
  if (elem.tagName == "DIV" && !isNaN(elem.id)) {
    var paintings = localStorage.getItem("paintings");  
  
    if (paintings) paintings = paintings.split(',');
    else paintings = new Array();
          
    if (paintings.indexOf(elem.id) > -1)
      paintings.splice(paintings.indexOf(elem.id), 1);

    if (elem.style.background) {
      elem.style.background = "";     
    }
    else {
      elem.style.background = highlightcolor;
      paintings.push(elem.id);
    }
    
    localStorage.setItem("paintings", paintings.join(','));

  }
}

function init_paintings() {
  var paintings = localStorage.getItem("paintings");
  if (!paintings) return;
  
  paintings = paintings.split(',');
  paintings.sort();
  
  // trim the paintings to 1024 items max
  while (paintings.length > 1024) 
    paintings.shift();
    
  // paint all items in the list
  for (id in paintings) {
    elem = document.getElementById(paintings[id]);
    //alert("paintings." + id + " " + paintings[id] + "\n" + elem);
    if (elem) elem.style.background = highlightcolor;
  }
  
  localStorage.setItem("paintings", paintings.join(','));

}






initTrollBlocker();
jscolor.install();
blockTrolls();
init_paintings();