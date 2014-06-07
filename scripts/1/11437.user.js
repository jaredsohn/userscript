// ==UserScript==
// @namespace     http://lulz.net
// @name          DA Download Sniffer
// @description   Scans submissions on a DeviantArt gallery page and reports all the download links it finds in a new window.
// @include       http://*.deviantart.com/gallery/*
// ==/UserScript==

// Name of the table into which addDownloadLink will insert its links.
var DADS_listWinLinkTable = "DADS_linkTable";


// Sends the next HTTP request
// I had to make DADS_addDownloadLink() call this (instead of sending the request immediately)
// to cut down on the number of concurrent HTTP requests DA Download Sniffer was making
function DADS_sendNextRequest()
{
  DADS_httpRequests[DADS_curRequest].send(null);
  DADS_curRequest++;
}


function DADS_addDownloadLink()
{
  var newRow = document.createElement("tr");
  var nameCell = document.createElement("td");
  var linkCell = document.createElement("td");
  var numCell = document.createElement("td");
  numCell.innerHTML = ++DADS_linksInserted;
  var listTable = this.listWin.document.getElementById(DADS_listWinLinkTable);

  // We only want to process the page if it has properly loaded
  if (this.readyState == 4 && this.status == 200)
  {
    var pageHTML = this.responseText;
    
    // Get the page's title (minus "by [artist]") and add it to the list
    var pageName = pageHTML.match(/<title>.*<\/title>/);
    if (pageName != null)
    {
      pageName = pageName.toString();
      pageName = pageName.substring(7, pageName.indexOf(" by "));
    }
    nameCell.innerHTML = pageName;
     
    // Get the download link (if it has one) and add it to the list. If it doesn't have a download link, add a notification.
    var downLink = pageHTML.match(/<a href=".*">Download<\/a>/);
    if (downLink != null)
    {
      downLink = downLink.toString();
      downLink = downLink.substring(downLink.indexOf("href=\"") + 6, downLink.lastIndexOf("\""));
      linkCell.innerHTML = "<a href=\"" + downLink + "\" target=\"_blank\">" + downLink.substring(downLink.lastIndexOf("/") + 1, downLink.length) + "</a>";
    }
    else
    {
      linkCell.innerHTML = "No download link found!";
    }
  }
  else
  {
    nameCell.innerHTML = this.requestedURL;
    linkCell.innerHTML = this.status + " " + this.statusText;
  }

  newRow.appendChild(numCell);
  newRow.appendChild(nameCell);
  newRow.appendChild(linkCell);
  listTable.appendChild(newRow);

  DADS_sendNextRequest();
}




// Iterates over the submission pages linked from here, and displays all "download" links in the window specified by listWin.
// Removed "status update" functionality in favor of adding links to listWin as soon as they are found.
function DADS_sniffDownloads()
{
  listWin = window.open();
  if (listWin == null)
  {
    alert("Download Sniffer could not open a new window!");
    return;
  }
  var downLink, pageName, links = document.links;
  DADS_linksInserted = 0;
  // I'll be using this as a counter in the loop, then I'll reset it to send the first request.
  DADS_curRequest = 0;

  listWin.document.write("<table cellpadding=\"3\" border=\"2\" align=\"center\"><tbody id=\"" + DADS_listWinLinkTable + "\"><tr><td colspan=\"2\"><b>DA Download Sniffer: download links from current gallery page</b></td></tr><tr><td><b>#</b></td><td><b>Page Title</b></td><td><b>URL of \"Download\" Link</b></td></tr></tbody></table>");

  for (var i = 0; i < links.length; i++)
  {

    // If the link isn't a link to a view-submission page, we don't want it
    if (links[i].href.indexOf("/art/") == -1)
    {
      continue;
    }
    
    // Otherwise, get the HTML from the page...
    // The download link will be added to listWin as soon as the page loads
    /*
    httpRequest = new XMLHttpRequest();
    httpRequest.listWin = listWin;
    httpRequest.onload = DADS_addDownloadLink;
    httpRequest.open('GET', links[i].href, true);
    httpRequest.send(null);
    */
    // I had to use a global array because I was encountering some strange problems with requests never being sent/processed.
    // (Probably due to local XMLHttpRequest objects being destroyed when the function exited, before they were finished working.)
    DADS_httpRequests[DADS_curRequest] = new XMLHttpRequest();
    DADS_httpRequests[DADS_curRequest].listWin = listWin;
    DADS_httpRequests[DADS_curRequest].requestedURL = links[i].href;
    DADS_httpRequests[DADS_curRequest].onload = DADS_addDownloadLink;
    DADS_httpRequests[DADS_curRequest].open('GET', links[i].href, true);

    // The way DA pages are formatted causes multiple links to the same page. My quick-and-dirty solution is to increment i again at the end of a full pass, since
    // the duplicate links always appear two-in-a-row.
    i++;
    DADS_curRequest++;
  }

  DADS_curRequest = 0;
  DADS_sendNextRequest();
}

// Add the sniffDownloads function to the document by creating a script element.
var sdScript = document.createElement("script");
sdScript.type = "text/javascript";
sdScript.text = "var DADS_listWinLinkTable = \"" + DADS_listWinLinkTable + "\", DADS_httpRequests = new Array(), DADS_linksInserted, DADS_curRequest;" + DADS_sendNextRequest + DADS_sniffDownloads + DADS_addDownloadLink;
document.body.appendChild(sdScript);

// Make a button that calls sniffDownloads() and put it in the DA browsebar
var browsebar = document.getElementById("browsebar1");
browsebar.innerHTML = "<b><a href=\"#\" onclick=\"DADS_sniffDownloads();\">Sniff Download Links</a></b>" + browsebar.innerHTML;