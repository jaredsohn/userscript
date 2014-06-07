// ==UserScript==
// @name          LibraryLookup
// @namespace     http://weblog.infoworld.com/udell/2006/01/30.html
// @description   Check availability in Greater Victoria Public Libraries
// @include       http://*.amazon.*
// ==/UserScript==

(
function()
{
var libraryQuery = 'http://catalogue.gvpl.ca/search/i='
var libraryName = 'GVPL';
var libraryAvailability = /AVAILABLE/;
var libraryDueBack = /DUE (\d{2}\-\d{2}\-\d{2})/;

var xisbnQuery = 'http://labs.oclc.org/xisbn/'

var isbnREplain = /(\d{7,9}[\d|X])/ig;
var isbnREdelimited = /\/(\d{7,9}[\d|X])\//;

//-- from sam stephenson's http://prototype.conio.net/ --
function $() 
  {
  var elements = new Array();
  for (var i = 0; i < arguments.length; i++) 
    {
    var element = arguments[i];
    if (typeof element == 'string')
      element = document.getElementById(element);
    if (arguments.length == 1) 
      return element;
    elements.push(element);
    }
  return elements;
  }
//-- thanks, sam! --

var libraryLookup = 
  {
  changeHandler: function(e)
    {
    var node = e.target;
    if ( node.getAttribute('id') != 'LibraryLookup')
      { return }
    var isbns = node.getAttribute('isbns');
    isbns = isbns.split(' ');
    for ( i = 0; i < isbns.length; i++ )
      {
      libraryLookup.doLookup(isbns[i]);
      if ( $('LibraryLookup').getAttribute('done') == 'true' )
        { return }
      }
    },

  createHiddenDiv: function()
    {
	if ( document.getElementById('LibraryLookup') != null )
		{
		return;
        }
    var div = document.createElement('div');
    div.setAttribute('id','LibraryLookup');
    div.setAttribute('isbns','');
    div.setAttribute('done','false' ); 
    document.body.insertBefore(div, document.body.firstChild);
    },  

  insertLink: function(isbn, hrefTitle, aLabel, due)
    {
    var div = origTitle.parentNode;
    var title = origTitle.firstChild.nodeValue;
    var newTitle = document.createElement('b');
    newTitle.setAttribute('class','sans');
    var titleText = document.createTextNode(title);
    newTitle.appendChild(titleText);
    var sp = document.createTextNode(' ');
    var link = document.createElement('a');
    link.setAttribute ( 'title', link );
    link.setAttribute('href', libraryQuery + isbn);
    var label = document.createTextNode( aLabel );
    link.appendChild(label);
    div.insertBefore(newTitle, origTitle);
    div.insertBefore(sp, origTitle);
    div.insertBefore(link, origTitle);
    div.removeChild(origTitle);
    },
            
  xisbn: function(isbn)
    {
    GM_xmlhttpRequest
      (
        {
        method:  'GET',
        url:     xisbnQuery + isbn,
        onload:  function(results)
          {
          page = results.responseText;
          xisbnDone = true;
          var isbns = page.match(isbnREplain);
          var isbnList = '';
          if ( isbns.length > 1)
            {
            isbnList = isbns.join(' ');
            }
          else
            {
            isbnList = isbn;
            }
          $('LibraryLookup').setAttribute('isbns',isbnList);
          }
        }
      );
    },

  doLookup: function(isbn)
    {
    GM_xmlhttpRequest
      (
        {
        method:  'GET',
        url:     libraryQuery + isbn,
        onload:  function(results)
          {
          page = results.responseText;
          if ( libraryAvailability.test(page) )
            {
            $('LibraryLookup').setAttribute('done','true');
            libraryLookup.insertLink
              (
              isbn,
              "On the shelf now!",
              "Hey! It's available in the " + libraryName + " Library!"
              );
            }
          if ( libraryDueBack.test(page) )
            {
            $('LibraryLookup').setAttribute('done','true');
            var due = page.match(libraryDueBack)[1]
            libraryLookup.insertLink
              (
              isbn,
              "Due back " + due,
              "Due back at the " + libraryName + " Library on " + due
              );
            }
          }
        }
      )
    }
  }

try 
  {
  var isbn = location.href.match(isbnREdelimited)[1];
  }
catch (e)
  { return; }

var origTitle = document.evaluate("//b[@class='sans']", document,
  null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;

if ( ! origTitle )
  { return; }

try
  {
  document.addEventListener("DOMAttrModified", 
    libraryLookup.changeHandler, false);
  }
catch (e) { alert (e) }

try
  {  libraryLookup.createHiddenDiv() }
catch (e)
  { alert(e) }

libraryLookup.doLookup(isbn);

if ( $('LibraryLookup').getAttribute('done') == 'false' )
  {
  libraryLookup.xisbn(isbn);
  }

}
)();



