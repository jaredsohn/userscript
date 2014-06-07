// ==UserScript==
// @name          Austin Public Library System
// @namespace     http://userscripts.org/people/17200
// @description   Search the Austin Public Library Catalogs from Amazon book listings.
// @include       http://*.amazon.*
// @creator       Lorin Rivers
// @source        http://userscripts.org/scripts/show/
// @identifier    http://userscripts.org/scripts/source/
// ==/UserScript==
// Shows title not found message as well
// Adapted by Lorin Rivers from
// Matthew Thompson (http://www.theoreticalchemist.com)
// Christina Schulman (http://www.epiphyte.net)
// and Christoher Holdredge from
// Ed Vielmetti's Ann Arbor library script (http://www.superpatron.com)
// Originally based on LibraryLookup by Jon Udell.
// Amazon Prime fix by Pat Markland (pmarkland@yahoo.com)
// Title node fixes based on the UW Madison linky script by "Rebs"
// and Hennepin County linky script by Glenn Peterson.
(

function() {

  var libraryUrlPattern = 'http://www.ci.austin.tx.us/uhtbin/cgisirsi/x/0/0/5/?srchfield1=020^ISBN^GENERAL^Phrase%20Processing^ISBN&library=ALL&user_id=GUEST&password=1111&searchdata1='

  var libraryName = 'Austin Public Library';

  var libraryAvailability = /(\d{2}) copies available/;
  var libraryNotAvail = /No copies currently/;
  var libraryDueBack = /(\d{2}\/\d{2}\/\d{4})/;
  var libraryOrdered = /On order/;
  var notFound = /found no matches/;

  var titleNodeClass = 'sans';
  var titleNodeId = 'btAsinTitle';

  // Find the node containing the book title
  function getTitleNode() {
    var nodes = document.evaluate("//span[@id='" + titleNodeId + "']", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
    if (!nodes) {
      return null;
    }

    var thisNode = nodes.iterateNext();
    var titleNode;
    // Get the last node
    while (thisNode) {

      //GM_log( thisNode.textContent );
      titleNode = thisNode;
      thisNode = nodes.iterateNext();
    }

    //was (titleValue == null)
    if (titleNode == null) {
      GM_log("can't find title node");
      return null;
    } else {
      GM_log("Found title node: " + titleNode.textContent);
    }
    return titleNode;
  }

  var libraryLookup = {
    insertLink: function(isbnUrl, hrefTitle, aLabel, color) {
      var bookdiv = titleNode.parentNode;
      var title = titleNode.firstChild.nodeValue;

      var newTitle = document.createElement('b');
      newTitle.setAttribute('class', titleNodeClass);

      var titleText = document.createTextNode(title);
      newTitle.appendChild(titleText);

      var br = document.createElement('br');

      var link = document.createElement('a');
      link.setAttribute('title', hrefTitle);
      link.setAttribute('href', isbnUrl);
      link.setAttribute('style', 'font-size: .67em; font-weight: bold; display: block; padding: .5em 0; color: ' + color);

      var label = document.createTextNode(aLabel);

      link.appendChild(label);

      // cms: If bookdiv is null, re-evaluate the titleNode node
      //    to pick up its parent node again.  Another linky
      //    script running on the same page may have caused
      //    the node to change.
      if (bookdiv == null) {
        titleNode = getTitleNode();
        if (titleNode != null) {
          bookdiv = titleNode.parentNode;
        }
      }
      if (bookdiv != null) {
        bookdiv.insertBefore(link, titleNode.nextSibling);
        bookdiv.insertBefore(br, titleNode.nextSibling);
      }
    },

    doLookup: function(isbn) {
      GM_xmlhttpRequest({
        method: 'GET',
        url: libraryUrlPattern + isbn,
        onload: function(results) {
          page = results.responseText;
          //alert(page);
          var isbnUrl = libraryUrlPattern + isbn;
          if ( libraryOrdered.test(page) )
              {
              libraryLookup.insertLink (
                isbnUrl,
                "Copy on order!",
                "Copy is on order at the " + libraryName + " Library.",
                "#B03060" // maroon-y
                 );
              }
          else if ( libraryNotAvail.test(page) )
              {
              libraryLookup.insertLink (
                isbnUrl,
                "Not available!",
                "Sorry.  Not available at the " + libraryName + " Library at this time.",
                "#AA7700" // dark yellow
                 );
              }
          else if ( libraryAvailability.test(page) )
              {
              var numavail = page.match(libraryAvailability)[1]
              libraryLookup.insertLink (
                isbnUrl,
                "On the shelf now!",
                numavail + " copies available at the " + libraryName + " Library!",
                "green"
                 );
          }
          else if ( notFound.test(page) )
              {
              libraryLookup.insertLink (
                isbnUrl,
                "Not found!",
                "Sorry.  Not found at the " + libraryName + " Library at this time.",
                "#555" // dk. gray
                 );
              }
        }
      });
    }

  }

  try {
    var isbn = window.content.location.href.match(/\/(\d{7,9}[\d|X])\//)[1];
    GM_log('isbn == ' + isbn);
  } catch(e) {
    GM_log('LibraryLookup-Austin.user.js: Caught exception: ' + e.toString());
    return;
  }

  var titleNode = getTitleNode();

  if (titleNode == null) {
    return;
  }

  libraryLookup.doLookup(isbn);

})();