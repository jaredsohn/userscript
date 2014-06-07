// Brian Shaler's DiggTaggr
// version 0.1.5 Alpha
// 2007.05.02
// Copyright (c) 2007 - Brian Shaler
// Brian's Interwebs: // http://brian.shaler.name/
// brian@shaler.name // As always, feedback is appreciated!
// --------------------------------------------------------------------
// This is a Greasemonkey user script.
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// --------------------------------------------------------------------
// Version Details:
// 0.1.5 // 2007.05.02
// | Change for the Digg API (appkey). Fix javascript date issue
// View details for previous updates on the DiggTaggr download page
// --------------------------------------------------------------------
// Security Note:
// | No identifying information about the user is sent using this
// | script. Users should be warned that installing Greasemonkey 
// | user scripts can be a security risk. ALWAYS inspect the code
// | before installing it!!
// --------------------------------------------------------------------
// "Digg" is a trademark of Digg Inc.
// "DiggTaggr" is not affiliated, sponsored, or endorsed by Digg Inc.
// Brian Shaler reserves the right to deactivate this free "DiggTaggr" 
// service at any time without notice.
// --------------------------------------------------------------------
// ==UserScript==
// @name          Brian Shaler's DiggTaggr
// @namespace     http://brian.shaler.name/pages/left/diggtaggr/
// @description   Displays links to relevant Digg submissions by analyzing key words of the current digg submission.
// @include       http://digg.com/*
// @include       http://*.digg.com/*
// ==/UserScript==

// only run this if you're on a story detail page
if (document.getElementsByName("storyid").length > 0)
{
  taggrStyle = document.createElement("style");
  taggrStyle.type = "text/css";
  taggrStyle.innerHTML = ".diggtaggrDiggs:link, .diggtaggrDiggs:active, .diggtaggrDiggs:visited { " +
    "background: url('http://brian.shaler.name/images/digg/taggrDiggsBg.gif') no-repeat; display:block; float:left; width: 60px; height: 18px; font-size:10px; color: #666666; padding: 2px 0px 0px 0px; text-decoration: none; text-align: center; } \n" +
    ".diggtaggrDiggs:hover { color: #000000; } \n" +
    ".diggtaggrTitle { float: left; margin: 1px 0px; border-bottom: 1px solid rgb(117, 171, 234); font-size: 13px; line-height: 16px; text-decoration: none; } \n" +
    ".diggtaggrTitle:hover { border-bottom: 1px solid #666666; } \n" +
    ".diggtaggrExpand { float: left; margin: 2px 8px; } \n" +
    ".diggtaggrSummary { float: left; width: 90%; margin: 0px 8px 4px 88px; display: none; } \n" +
    ".diggtaggrItem { margin-bottom: 6px; } \n" +
    ".dateTooltip { position:absolute; visibility: hidden; left: 0px; top: 1.3em; white-space: nowrap; padding: 3px 7px; background-color: #fffef7; border: solid 1px #fdf0bb; }";
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(taggrStyle);

// this will grab the "news-body".. luckily, it's the only element on the page with that class
function getElementsByClass (className)
{
  var all = document.all ? document.all : document.getElementsByTagName('*');
  var elements = new Array();
  for (var i = 0; i < all.length; i++)
  {
    if (all[i].className == className)
    {
      elements[elements.length] = all[i];
    }
  }
  return elements;
}


// "news-body" is the class assigned to the div that holds the title, description, and other 'stuff'
  newsBody = getElementsByClass("news-body"); // selects the news-body element
  paragraph = newsBody[0].getElementsByTagName("p");
  paragraph[0].style.paddingBottom = "0px";

  newsDetails = getElementsByClass("news-details");
  dl = newsDetails[0].getElementsByTagName('dl')[0];
  elements = dl.getElementsByTagName("*");
  curChild = elements[0];
  output = 0;
  startDiv = "<div style='float: left;'>";
  outputString = "<div style='margin-top: -18px; height: 12px;'>"// + startDiv;
  endDiv = "</div>";
  while (curChild.nextSibling != undefined)
  {
    if (curChild.tagName)
    {
      if (Math.floor(output/2)==output/2 && output!=0)
      {
        if (output == 4)
        {
          outputString += "</div> <br clear='left' /> <div style='width: 100%; float: none;'>";
        } else
        {
          outputString += startDiv + " &nbsp;|&nbsp; &nbsp; " + endDiv;
        }
      }
      if (output == 1)
      {
        outputString += "<div style='float: left;' id='taggrTimestamp" + document.getElementsByName("storyid")[0].value + "'>" + curChild.innerHTML + "&nbsp; " + endDiv;
      } else
      {
        outputString += startDiv + curChild.innerHTML + "&nbsp; " + endDiv;
      }
      output++;
    }
    curChild = curChild.nextSibling;
  }
  //outputString += endDiv;

  newNewsDetails = document.createElement("div");
  newNewsDetails.style.color = "#666666";
  newNewsDetails.style.fontSize = "10px";
  newNewsDetails.style.padding = "0px";
  newNewsDetails.innerHTML = outputString;
  dl.parentNode.insertBefore(newNewsDetails, dl);

  dl.style.display = "none";
  dl.remove;

// creating a floating holder for the relevant links
  taggrContainer = document.createElement("div");
  taggrContainer.style.cssFloat = "left";
  taggrContainer.style.width = "90%";

// this places the relevant link holder immediately after the "news-body" div
  newsBody[0].parentNode.insertBefore(taggrContainer, newsBody[0].nextSibling);

// insert header
  header4 = document.createElement("h4");
  header4.style.marginTop = "8px";
  header4.style.marginBottom = "8px";
  header4.style.color = "#666666";
  header4.innerHTML = "DiggTaggr - Relevant Stories <a href=\"http://brian.shaler.name/diggtaggr/\" style=\"font-size: 9px; color: rgb(170, 170, 170);\">powered by: Brian Shaler</a>";
  taggrContainer.insertBefore(header4, null);

// insert loading text
  loadText = document.createElement("div");
  loadText.innerHTML = "<br>Loading..<br><br>";
  taggrContainer.insertBefore(loadText, null);

// grabs xml of relevant stories using the storyid var in the query string
GM_xmlhttpRequest({ method: 'GET', url: 'http://brian.shaler.name/diggtaggr/taggrxml.php?v=0.1.5&storyid='+document.getElementsByName("storyid")[0].value, headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 'Accept': 'application/xml,text/xml' },

// xml is loaded, let's go
  onload: function(responseDetails)
  {
    var parser = new DOMParser();
    var dom = parser.parseFromString(responseDetails.responseText, "application/xml");

// iterates through the xml document and puts the returned data into new sub-divs
    items = dom.getElementsByTagName('taggr');
    storyArray = new Array();
    for (var i = 0; i < items.length; i++)
    {
      thisStoryId = items[i].getElementsByTagName('storyid')[0].textContent;
      storyArray[storyArray.length] = thisStoryId;
      thisStoryUrl = items[i].getElementsByTagName('url')[0].textContent;
      thisStoryTitle = items[i].getElementsByTagName('title')[0].textContent;
      thisItem = document.createElement("div");
      thisItem.style.marginBottom = "2px";
      thisItem.innerHTML = "<div class=\"diggtaggrItem\">" + 
        "<a class=\"diggtaggrDiggs\" href=\"" + thisStoryUrl + "\" id=\"taggrLink" + thisStoryId + "\">Loading</a> " +
        "<a class=\"diggtaggrExpand\" href=\"javascript: taggrExpand(" + thisStoryId + ");\" title=\"Show Story Description\"><img src=\"http://brian.shaler.name/images/digg/button_plus.gif\" id=\"taggrExpand" + thisStoryId + "\"></a>" + 
        "<a class=\"diggtaggrTitle\" href=\"" + thisStoryUrl + "\">" + thisStoryTitle + "</a>" +
        "<div class=\"diggtaggrSummary\" id=\"taggrSummary" + thisStoryId + "\">Loading...</div>" +
        "<br clear=\"all\"></div>";
      taggrContainer.insertBefore(thisItem, null);
    }

// error handling
    myError = dom.getElementsByTagName('error');
    if (myError.length > 0)
    {
      errorText = myError[0].getElementsByTagName('info')[0].textContent;
      errorDiv = document.createElement("div");
      errorDiv.style.color = "#990000";
      errorDiv.style.fontSize = "10px";
      errorDiv.innerHTML = errorText;
      taggrContainer.insertBefore(errorDiv, null);
    }
    loadText.style.display = "none";

    storyIds = "";
    for (i=0;i<storyArray.length;i++)
    {
      if (i!=0)
      {
        storyIds += ",";
      }
      storyIds += storyArray[i];
    }
    myUrl = 'http://services.digg.com/stories/'+storyIds+','+document.getElementsByName("storyid")[0].value + '?appkey=http%3A%2F%2Fbrian%2Eshaler%2Ename%2Fdiggtaggr%2F';

// embeds javascript functions for the Expanding/Collapsing buttons
  taggrScript = document.createElement("script");
  taggrScript.innerHTML = "stories = new Array (" + storyIds + ");\n" +
    "taggrExpand = function (storyId) { " + 
      "stories = new Array("+storyIds+"); " +
      "for (i=0;i<stories.length;i++) {" +
        "if (eval(storyId)!=eval(stories[i])) {" +
          "taggrCollapse (stories[i]);" +
        "}" +
      "}" +
      "expandButton = document.getElementById(\"taggrExpand\"+storyId); " +
      "expandButton.src = \"http://brian.shaler.name/images/digg/button_minus.gif\"; " +
      "expandButton.parentNode.href = ('javascript: taggrCollapse(' + storyId + ');'); " + 
      "summaryBlock = document.getElementById(\"taggrSummary\"+storyId); " +
      "summaryBlock.style.display = 'block'; " + 
    "}\n" +
    "taggrCollapse = function (storyId) { " +
      "expandButton = document.getElementById(\"taggrExpand\"+storyId); " + 
      "expandButton.src = \"http://brian.shaler.name/images/digg/button_plus.gif\"; " +
      "expandButton.parentNode.href = ('javascript: taggrExpand(' + storyId + ');'); " +
      "summaryBlock = document.getElementById(\"taggrSummary\"+storyId); " +
      "summaryBlock.style.display = 'none'; " + 
    "}\n" +
    "epochToDate = function (e) { " +
      "d = new Date(); e = parseInt(e); if(e<10000000000) { e *= 1000; } " + 
      "d.setTime(e); h = d.getHours(); ampm = h > 12 ? 'pm' : 'am'; " + 
      "h = h > 12 ? h - 12 : h; m = d.getMinutes(); m = m < 10 ? '0' + m : m; " + 
      "returnString = ' ' + (d.getMonth()+1) + '/' + d.getDate() + '/' + d.getFullYear() + ' ' + h + ':' + m + ' ' + ampm + ' '; " +
      "return returnString; " +
    "}\n" +
    "showTooltip = function (targ, t) { " + 
      "x = document.getElementById(targ);" + 
      "x.style.visibility = 'visible';" + 
      "x.innerHTML = epochToDate(t);" + 
    "}\n" +
    "hideTooltip = function (targ) { " + 
      "x = document.getElementById(targ); " + 
      "x.style.visibility = 'hidden'; " + 
    "}";
  head.appendChild(taggrScript);

// grabs xml from Digg for summary text and current Digg/Comment count on the relevant stories

//'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 'Accept': 'application/xml,text/xml'
  GM_xmlhttpRequest({ method: 'GET', url: myUrl, cookies: document.cookie, headers: { 'Host': 'services.digg.com',
'User-Agent': navigator.userAgent,
'Accept': 'text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5',
'Accept-Language': 'en-us,en;q=0.5',
'Accept-Encoding': 'gzip,deflate',
'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
'Keep-Alive': '300' },

// xml is loaded, let's go
    onload: function(responseDetails)
    {
      var parser = new DOMParser();
      var dom = parser.parseFromString(responseDetails.responseText, "application/xml");

// iterates through the xml document and populates the Digg count, Comment count, and Summary text
      items = dom.getElementsByTagName('story');
      storyArray = new Array();
      for (var i = 0; i < items.length; i++)
      {
        thisStoryId = items[i].getAttribute('id');
        if (thisStoryId != document.getElementsByName("storyid")[0].value)
        {
          thisStoryDiggs = items[i].getAttribute('diggs');
          thisStorySummary = items[i].getElementsByTagName('description')[0].textContent;
          thisStorySummary += "<br><div style='font-size: 10px; margin-top: 4px; color: #666666;'>Submitted: <span id='taggrTimestamp" + thisStoryId + "'>x</span>";
          thisStorySummary += " &nbsp; | &nbsp; Submitter: " + items[i].getElementsByTagName('user')[0].getAttribute('name') + "</div>";
          document.getElementById("taggrLink"+thisStoryId).innerHTML = thisStoryDiggs+" diggs";
          document.getElementById("taggrSummary"+thisStoryId).innerHTML = thisStorySummary;
          timeScript = document.createElement("script");
          timeScript.innerHTML = "showTooltip('taggrTimestamp" + thisStoryId + "', " + items[i].getAttribute('submit_date') + ")";
          head.appendChild(timeScript);
        } else
        {
          thisName = "taggrTimestamp" + thisStoryId;
          targ = document.getElementById(thisName);
          tstamp = items[i].getAttribute('submit_date');
          currDate = targ.innerHTML;
          newHTML = "<span onmouseover=\"javascript: showTooltip('x"+thisName+"', "+tstamp+");\" onmouseout=\"javascript: hideTooltip('x"+thisName;
          newHTML += "');\"><span style='position: absolute;'><div class='dateTooltip' id='x"+thisName+"'></div></span>" + currDate + "</span>";
          targ.innerHTML = newHTML;
        }
      }
    }
  });
  }
});
}