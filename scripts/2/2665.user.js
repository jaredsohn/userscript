/*
 * Author:  Jeremy Roberts
 *          jdrobert /at/ letterboxes /dot/ org
 * Created: 2006-01-18
 * History: 1.0 Conception and testing.
 *          1.1 First release.
 *          1.2 Second release, 
 *              fixed crash on many links
 *              added intelligent html calls
 *              fixed sluggish page
 */

// ==UserScript==
// @name           Onfolio Digg
// @description    Changes onfolios digg links to contain the actual link.
// @include        *feed-newspaper*
// @version       1.2
// @GM_version    0.6.4
// ==/UserScript==

// Grab all the links and search for Digg

// Define our text and link data struct
function textLink(inText, inLink)
{
  this.text = inText;
  this.digglink = inLink;
  this.status = 0;
  // status levels
  //  0 = no action taken
  //  1 = requset sent, waiting
  //  2 = link installed on page
}

// Adds slashes to strings.
function escapeString(str)
{
  str = str.replace(/\"/g, '\\\"');
  str = str.replace(/\'/g, '\\\'');
  str = str.replace(/\?/g, '\\\?');
  str = str.replace(/\(/g, '\\\(');
  str = str.replace(/\)/g, '\\\)');
  str = str.replace(/\!/g, '\\\!');
  str = str.replace(/\$/g, '\\\$');
  str = str.replace(/\&/g, '\\\&');
  return str;
}

// Do this in a function so we can use recursion.
function makeDiggRequest()
{
  // Make sure there are still some links to fix.
  if (currentRequest >= textLinkArray.length)
    return;

  // Grab our link.
  var currRequestCopy = currentRequest++;
  var link = textLinkArray[currRequestCopy].digglink;
  
  // Set the status of the link to "sent"
  textLinkArray[currRequestCopy].status = 1;

  //alert(link);
 
  // Make the asynchronous call to the digg page and define the call back function.
  GM_xmlhttpRequest({
    method:"POST",
    url:link,
    data:"",
    onload: function(result)
    {
      // When the page comes back, seach for the link we need to add.
      for (j = 0; j < textLinkArray.length; j++)
      {
        // Only check items that are waiting
        if (textLinkArray[j].status != 1)
           continue;

        var str = "";

        // See if the current link is in the returned page.
        try
        {
          str = result.responseText.match('<a href=".*' + escapeString(textLinkArray[j].text) + '</a>')[0];
          str = str.match('".*?"')[0];
          str = str.substring(1, str.length - 1);
        }
        catch (e)
        {
          continue;
        }

        // This must be the page for the current link
        if (str != "")
        {
          textLinkArray[j].reallink = str;
          textLinkArray[j];

          // Get all the links again.
          allInputs = document.getElementsByTagName('a');

          // Seach for the one that matches our text.
          for (var i = 0; i < allInputs.length; i++)
          {
            var thisInput;
            thisInput = allInputs[i];
            //alert(thisInput.href);
            if (thisInput.text == textLinkArray[j].text)
            {
              // Add the "direct link" that points to the actual page.
              var newLink = document.createElement('a');
              thisInput.parentNode.appendChild(newLink);
              newLink.href = str;
              newLink.setAttribute("class", "newWindow");
              newLink.setAttribute("target", "_blank");
              var txtNode = document.createTextNode("article");
              newLink.appendChild(txtNode);
            }
          }

        // Set the items status to being delt with.
        textLinkArray[j].status = 2;

          // Leave the loop since we have updated the link.
          break;
        }
      }

      // Do the next request now that this one is finished.
      makeDiggRequest();
    }
  });
}

var allInputs;
var textLinkArray = new Array();
var currentRequest = 0;

// Get a list of all 'a' elements.
allInputs = document.getElementsByTagName('a');

// Fill our data structure with links and text.
for (var i = 0; i < allInputs.length; i++) {
  var thisInput;
  thisInput = allInputs[i];

  // Match only main digg links
  if (thisInput.href.search(/digg/) != -1 &&
      thisInput.attributes[0].nodeName != "class" &&
      thisInput.text != "digg")
  {
    // Add the link to our data structure.
    var nextIndice = textLinkArray.length;
    textLinkArray[nextIndice] = new textLink(thisInput.text, thisInput.href);
  }
}

// See if we can speed things up some by using many requests at the same time.
for (i = 0; i < 3; i++)
{
    makeDiggRequest();
}
