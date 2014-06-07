// ==UserScript==
// @name           FA Gallery Conglomerator
// @namespace      http://lulz.net/
// @description    Gathers every submission in a FurAffinity gallery and displays them as a list of links in a new window. Also works on scraps.
// @include        http://www.furaffinity.net/gallery/*
// @include        http://www.furaffinity.net/scraps/*
// ==/UserScript==

// Set FAGC_retriesPerPage equal to the number of retries the Conglomerator should make on a failed page download.
var FAGC_retriesPerPage = 5, FAGC_curRetries;

//12/18/07 changed FAGC_itemsPerPage to 48
// to match new FA gallery items per page
var FAGC_httpRequest, FAGC_curPage, FAGC_itemsPerPage = 48;
var FAGC_galleryBase = window.location.href.replace(/\/[0-9]+\/?$/, "");
if (FAGC_galleryBase.lastIndexOf("/") != (FAGC_galleryBase.length - 1))
{
  FAGC_galleryBase += "/";
}
// name of the div which will hold the list of links.
var FAGC_listWinLinkDiv = "FAGC_linkDiv";

function FAGC_rGetLinks()
{
  var listDiv = this.listWin.document.getElementById(FAGC_listWinLinkDiv);
  var newLinks = document.createElement("div");
  newLinks.innerHTML = "<br><b>Page " + FAGC_curPage + ":</b><br>";
  listDiv.appendChild(newLinks);

  // We only want to process the page if it has properly loaded.
  if (this.readyState == 4 && this.status == 200)
  {
    var pageText = this.responseText;
    var urls = "";

    // Find thumbnails on the page. If there are none, pageText = null.
    // If there are any, pageText will be an array of matched values.
    pageText = pageText.match(/<img[^>]*src=["'][^"']*\/art\/[^>]*>/ig);

    if (pageText == null)
    {
      newLinks.innerHTML += "<b>No thumbnails - end of gallery reached.</b>";
    }

    else
    {
      // Get each thumbnail URL and turn it into a fullsize image URL
      for (var i = 0; i < pageText.length; i++)
      {
        var urlStart = pageText[i].indexOf("src=") + 5;
        var quoteChar = pageText[i].charAt(urlStart - 1);
        var url = pageText[i].substring(urlStart, pageText[i].indexOf(quoteChar, urlStart));
        // We only care about the part of the URL after /art/,
        // since the server for fullsize images is always data.furaffinity.net
        url = url.split("/art/")[1];
        // Remove "thumbnail." or "half." if they are present
        url = url.replace(/(thumbnail|half)\./i, "");
        // Get the artist name from the thumbnail URL (we'll need it later)
        var an = url.substring(0, url.indexOf('/'));
        // Get the image filename
        var imn = url.substring(url.lastIndexOf('/'), url.length);
        // convert the filename and artist name to lowercase, because the next comparison must be case insensitive.
        imn = imn.toLowerCase();
        an = an.toLowerCase();
        // If the image name doesn't have the artist's name in it, insert the artist name in the middle
        // between the timestamp and the title.
        if (imn.indexOf(an) == -1)
        {
          // Added a check to fix image names that looked like [timestamp].[artist]. and had no extension.
          // turns out sometimes I need to add the artist name to the URL, and sometimes I don't
          // THANKS FOR YOUR STRAIGHTFORWARD NAMING CONVENTIONS, FURAFFINITY :)
          if (url.split('.')[1] != "")
          {
            url = url.split('.');
            url[1] = an + '.' + url[1];
            url = url.join('.');
          }
        }
        // Add the beginning of the full view URL
        //9/28/08 changed server name
        url = "http://d.furaffinity.net/art/" + url;
        // Remove anything that looks like a double extension.
        // (This breaks some URLs, but they should be rare, and pretty obvious when they do occur.)
        url = url.replace(/(\....)\..../, "$1");
        
        pageText[i] = url;
      }
      
      // Add each link to the list.
      for (var i = 0; i < pageText.length; i++)
      {
        newLinks.innerHTML += "<b>" + ((FAGC_curPage - 1) * FAGC_itemsPerPage + i + 1) + ":</b> ";
        newLinks.innerHTML += "<a href=\"" + pageText[i] + "\" target=\"_blank\">" + pageText[i].substring(pageText[i].lastIndexOf("/") + 1, pageText[i].length) + "</a><br>";
      }

      // Continue to the next gallery page
      FAGC_curRetries = 0;
      FAGC_getNextPage(this.listWin);
    }
  }

  else if (FAGC_curRetries < FAGC_retriesPerPage)
  {
    FAGC_curPage--;
    FAGC_curRetries++;
    newLinks.innerHTML += "Error loading page! Retrying (" + FAGC_curRetries + " of " + FAGC_retriesPerPage + ")...";
    FAGC_getNextPage(this.listWin);
  }

  else
  {
    newLinks.innerHTML += "Error loading page and maximum retries reached. Terminating.";
  }
}



function FAGC_getLinks()
{
  FAGC_curPage = 0;
  FAGC_curRetries = 0;

  var listWin = window.open();
  if (listWin == null)
  {
    alert("FA Gallery Conglomerator couldn't open a new window!");
    return;
  }

  // 12/21/07 changed the 'find artist name' code to be slightly more comprehensible
  // and to identify whether we're viewing normal gallery or scraps.
  var galAndArtist = FAGC_galleryBase.replace(/.+?\/(gallery|scraps)\/([^\/]+).*/i, "$1/$2");
  galAndArtist = galAndArtist.split("/");
  var galleryType = galAndArtist[0];
  var theArtist = galAndArtist[1];
  listWin.document.write("<b>List of images in " + theArtist + "'s " + galleryType + ":</b><br><div id=\"" + FAGC_listWinLinkDiv + "\"></div>");

  FAGC_getNextPage(listWin);
}



//12/18/07 changed FAGC_getNextPage to increment before it builds the URL, instead of after,
// so it would not duplicate the first gallery page when fetching links.
function FAGC_getNextPage(listWin)
{
  FAGC_curPage++;


  FAGC_httpRequest = new XMLHttpRequest();
  FAGC_httpRequest.listWin = listWin;
  FAGC_httpRequest.onload = FAGC_rGetLinks;
  FAGC_httpRequest.open("POST", FAGC_galleryBase + FAGC_curPage + "/", true);
  FAGC_httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  FAGC_httpRequest.send("limit=" + FAGC_itemsPerPage);
}




// Add the getLinks function to the document by creating a script element.
var sdScript = document.createElement("script");
sdScript.type = "text/javascript";
sdScript.text = "var FAGC_httpRequest, FAGC_curPage, FAGC_itemsPerPage = " + FAGC_itemsPerPage + ";";
sdScript.text += "var FAGC_galleryBase = \"" + FAGC_galleryBase + "\";";
sdScript.text += "var FAGC_listWinLinkDiv = \"" + FAGC_listWinLinkDiv + "\";";
sdScript.text += "var FAGC_retriesPerPage = " + FAGC_retriesPerPage + ", FAGC_curRetries;";
sdScript.text += FAGC_getNextPage + FAGC_getLinks + FAGC_rGetLinks;
document.body.appendChild(sdScript);



// Make a button that calls getLinks and put it in the FA nav bar
var browsebar = document.getElementsByName("replyform")[0].parentNode;
browsebar.innerHTML = "<input type=\"button\" value=\"Conglomerate Gallery\" onclick=\"FAGC_getLinks();\">" + browsebar.innerHTML;