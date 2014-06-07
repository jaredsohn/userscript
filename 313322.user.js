// ==UserScript==
// @name          Amazon King County Library System Bibliocommons Linky
// @namespace     http://userscripts.org/users/315568
// @description   Inserts a link below the book title on Amazon indicating the book's status at the King County Library System. Click the link to go directly to KCLS' online catalog information for the book.
// @source         http://userscripts.org/scripts/show/313322
// @identifier     http://userscripts.org/scripts/source/313322.user.js
// @version       20140203
// @date          2014-02-03
// @include       http://*.amazon.*
// @grant GM_xmlhttpRequest
// @grant GM_log
// ==/UserScript==

// Based on work by Carrick Mundell http://userscripts.org/scripts/show/1396
// and Fat Knowledge http://userscripts.org/scripts/show/8432
// Thanks, guys, you are awesome.
// Port to SPL/Bibliocommons by Rockmaster http://userscripts.org/scripts/show/91728
// Port to OPL/Bibliocommons by rpilkey http://userscripts.org/scripts/show/104651
// Port to KCLS/Bibliocommons by Nathan Kohagen ; forked from http://userscripts.org/scripts/show/104651 ; Using 'kcls' prefix to allow multiple Linky scripts at the same time (e.g. KCLS-King County Library System and SPL-Seattle Public Library)

(function(){
  //console.log('Amazon KCLS Bibliocommons Linky'); 

  var libraryName = 'King County Library System';
  var libraryIsbnUrlPattern = 'http://kcls.bibliocommons.com/search?custom_query=Identifier%3A';
  var libraryTitleUrlPattern = 'http://kcls.bibliocommons.com/search?t=title&search_category=title&q=';

//library statuses, text may need to be changed for other libraries
//check that the text on the result page of your library matches the text below
//other changes in getBookStatus() might be needed as well (for example to handle states not listed below)
  var libraryNotFound = /No direct matches were found/;
  var libraryCheckedIn = /Available/;
  var libraryOnOrder = /On order/;
  //var libraryHolds = /No copies currently available/;
  var libraryHolds = /All copies in use/;
  var libraryElectronic = /electronic item/;

  // get (possibly) several ISBNS from the Amazon page
  var Amazonisbns = getIsbn(top);
  for (var i = 0; i < Amazonisbns.length; i++){
    //console.log('Amazonisbns['+i+']:'+Amazonisbns[i]);  
  }
  
  var OCLCisbns = [];
  var OCLCisbnsIndex = -1;
  var foundCount = 0;

  if (Amazonisbns.length!==0){
    createStatusAndLibraryHTML();
    updateStatusHTML('Searching ' + libraryName + '...');

    getStatusAllISBNs(Amazonisbns);
  }
  return;


//get all ISBNs for this book using all isbns from the amazon page and write to global var OCLCisbns
//then call getBookStatuses
function getStatusAllISBNs(Amazonisbns){
  //console.log('Amazonisbns.length:'+Amazonisbns.length);  
  for (var i = 0; i < Amazonisbns.length; i++){
    isbn = Amazonisbns[i];
    if (isbn !== undefined){
      //console.log('trying isbn on OCLC:'+isbn); 
      var wbUrl = 'http://labs.oclc.org/xisbn/' + isbn;
      GM_xmlhttpRequest({
        method: 'GET',
        url: wbUrl,
        headers: {
          'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
          'Accept': 'application/atom+xml,application/xml,text/xml'
        },
        onload: function(responseDetails){
          //console.log(responseDetails.responseText);  
          var parser = new DOMParser();
          var dom = parser.parseFromString(responseDetails.responseText,"application/xml");

          var isbnsDom = dom.getElementsByTagName('isbn');
          for (var i = 0; i < isbnsDom.length; i++){
            OCLCisbns[i] = isbnsDom[i].textContent;
          }
          getBookStatuses();  
        }
      }); 
    }
  }
}

//loop through all the OCLCisbns
//this gets called back after each search to do next isbn
function getBookStatuses(){
  OCLCisbnsIndex++;
  //console.log("getBookStatuses"+OCLCisbnsIndex+ " " + OCLCisbns.length);

  if (OCLCisbnsIndex < OCLCisbns.length){
    updateStatusHTML("Searching for ISBN "+ OCLCisbns[OCLCisbnsIndex] + " in " + libraryName + '...');
    getBookStatus(libraryIsbnUrlPattern, OCLCisbns[OCLCisbnsIndex]);
  //when done going through isbns, update the status
  } else {
    if (foundCount===0){
      setStatusNoneFound();
    } else if (foundCount==1){
      removeStatus();
    } else {
      setStatusColor("black");
      updateStatusHTML(foundCount+ ' versions found:');
    }
  }
}


//connect to library server to get book status for isbn and then insert result under the book title
//call getBookStatuses when done
function getBookStatus(libraryUrlPattern, isbn){
  //console.log('Searching: '+libraryUrlPattern + isbn);

  GM_xmlhttpRequest({
    method:'GET',
    url: libraryUrlPattern + isbn,
    onload:function(results) {
      page = results.responseText;
      if ( libraryNotFound.test(page) ){
        getBookStatuses();
      }
      //if there are holds
      else if ( libraryHolds.test(page) ){
        //hold info no longer available on first results page

        setLibraryHTML(libraryUrlPattern, isbn, "On hold.", "No copies currently available at " + libraryName, "#3399FF");
        foundCount++;
        getBookStatuses();
      }
      else if ( libraryCheckedIn.test(page) ){
        setLibraryHTML(libraryUrlPattern, isbn, "On the shelf now!", "Available now in " + libraryName, "green");
        foundCount++;
        getBookStatuses();
      }
      else if ( libraryOnOrder.test(page) ){
        setLibraryHTML(libraryUrlPattern, isbn, "On order!", "On order at " + libraryName, "#AA7700");
        foundCount++;
        getBookStatuses();
      }                    
      else if ( libraryElectronic.test(page) ){
        setLibraryHTML(libraryUrlPattern, isbn,"On the e-shelf now!", "Digital version available now at "+ libraryName, "green");
        foundCount++;
        getBookStatuses();
      }
      else{
        setLibraryHTML(libraryUrlPattern, isbn, "Error", "Error checking at "+ libraryName, "orange" );
        foundCount++;
        getBookStatuses();
      }
    }
  });
}


//Using 'kcls' prefix to allow multiple Linky scripts at the same time (e.g. KCLS-King County Library System and SPL-Seattle Public Library)
function createStatusAndLibraryHTML(){
  var title_node = getTitleNode();
  var h1_node = title_node.parentNode;
  var br = document.createElement('br');

  //the div for library status when found
  var kclsLinkyDiv = document.createElement('div');
  kclsLinkyDiv.id = 'kclsLinkyLibraryHTML';
  //resize to 60% to get out of the enlarged h1 size and return back to normal
  kclsLinkyDiv.style.fontSize = '60%';
  kclsLinkyDiv.style.color = 'black';

  //How lame is this javascript DOM syntax?  Instead of having an insertAfter function, you have an insertBefore
  //and then pass in the .nextSibling attribute of the element.  Really inuitive guys.
  h1_node.insertBefore(kclsLinkyDiv, title_node.nextSibling);
  h1_node.insertBefore(br, title_node.nextSibling);

  //the div for status as checks are occuring
  var kclsStatusDiv = document.createElement('div');
  kclsStatusDiv.id = 'kclsLinkyStatusHTML';
  //resize to 60% to get out of the enlarged h1 size and return back to normal
  kclsStatusDiv.style.fontSize = '60%';
  kclsStatusDiv.style.color = 'brown';

  h1_node.insertBefore(kclsStatusDiv, kclsLinkyDiv);
//  h1_node.insertBefore(br, title_node.nextSibling);

}


function updateStatusHTML(text){
  var kclsStatusDiv = document.getElementById('kclsLinkyStatusHTML');
  if (kclsStatusDiv === null) { return; }

  if (kclsStatusDiv.firstChild){
    kclsStatusDiv.removeChild(kclsStatusDiv.firstChild);
  }
  kclsStatusDiv.appendChild(document.createTextNode(text));
}

//add status of book below previous ones
function setLibraryHTML(libraryUrlPattern, isbn, title, linktext, color){
  var kclsLinkyDiv = document.getElementById('kclsLinkyLibraryHTML');
  if (kclsLinkyDiv === null) { return; }

  var link = document.createElement('a');
  link.setAttribute('title', title );
  link.setAttribute('href', libraryUrlPattern+isbn);
  link.setAttribute('target', "_blank");
  link.style.color = color;

  var label = document.createTextNode( linktext );
  link.appendChild(label);

  //append to existing content
  kclsLinkyDiv.appendChild(link);
  kclsLinkyDiv.appendChild(document.createElement('br'));
}

//none found
//add link to search by title
function setStatusNoneFound(){
  var title = getTitle();

  var kclsStatusDiv = document.getElementById('kclsLinkyStatusHTML');
  if (kclsStatusDiv === null) { return; }

  var link = document.createElement('a');
  link.setAttribute('title', title );
  link.setAttribute('href', libraryTitleUrlPattern +encodeURIComponent(title));
  link.setAttribute('target', "_blank");
  link.style.color = "red";

  var label = document.createTextNode('Not found. Search by title in ' + libraryName + '...' );
  link.appendChild(label);

  //remove existing content
  kclsStatusDiv.removeChild(kclsStatusDiv.firstChild);
  kclsStatusDiv.appendChild(link);
}

function setStatusColor(color){
  var kclsStatusDiv = document.getElementById('kclsLinkyStatusHTML');
  if (kclsStatusDiv === null) { return; }

  kclsStatusDiv.style.color = color;
}

function removeStatus(){
  var kclsStatusDiv = document.getElementById('kclsLinkyStatusHTML');
  kclsStatusDiv.removeChild(kclsStatusDiv.firstChild);
}


//check if there is a ISBN in the URL
//URL looks like http://www.amazon.com/Liseys-Story-Stephen-King/dp/0743289412/ref=xarw/002-5799652-4968811
function getIsbn(wcontent){
  var url = wcontent.location.href;
  var ISBNArray = new Array(2);

  try { 
    //match if there is a / followed by a 7-9 digit number followed by either another number or an x 
    //followed by a / or end of url 
    ISBNArray[0] = url.match(/\/(\d{7,9}[\d|X])(\/|$)/)[1]; 
  } 
  catch (e) { //don't fail 
  }

  //try another way, OPL sometimes uses isbn-13, which is on the text of the page
  //<li><b>ISBN-10:</b> 1439134324</li>
  //<li><b>ISBN-13:</b> 978-1439134320</li>
  try {
    ISBNArray[1] = wcontent.document.body.innerHTML.match(/<li><b>ISBN-10:<\/b> (\d{10})/)[1]; 
  } 
  catch (e) {//don't fail
  }
  try {
    ISBNArray[2] = wcontent.document.body.innerHTML.match(/<li><b>ISBN-13:<\/b> (\d{3}-\d{10})/)[1]; 
  } 
  catch (e) {//don't fail
  }
  
  return ISBNArray;
}

function getTitle(){
  var title = getTitleNode();
  if (title===null) { return null; }
  //remove words in parentheses and subtitles (anything after a colon)
  var retval = title.textContent.replace(/\(.+\)/, '').replace(/:.*/, '');
    
  retval = retval.replace(/\[Hardcover\]/, '');
  retval = retval.replace(/Hardcover/, '');
  retval = retval.replace(/Mass Market Paperback/, '');
  retval = retval.replace(/Perfect Paperback/, '');
  retval = retval.replace(/\[Paperback\]/, '');
  retval = retval.replace(/Paperback/, '');
  //newlines?
  retval = retval.replace(/(\n)+/g, ' ');
  //squash spaces
  retval = retval.replace(/( )+/g, ' ');
  return retval;
}

// Find the node containing the book title
function getTitleNode(){
  var titleNodeTag = 'h1';
  var titleNodeId = 'title';

  var nodes = document.evaluate("//" + titleNodeTag + "[@id='" + titleNodeId + "']", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
  if(!nodes){
    return null;
  }

  var thisNode = nodes.iterateNext(); 

    //try again with the btAsinTitle span
  if(!thisNode){
      titleNodeTag = 'span';
      titleNodeId = 'btAsinTitle';
      nodes = document.evaluate("//" + titleNodeTag + "[@id='" + titleNodeId + "']", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
      thisNode = nodes.iterateNext(); 
  }

  var titleNode;
  // Get the last node
  while(thisNode){
    //console.log(titleNodeId + ": " + thisNode.textContent );
    titleNode = thisNode;
    thisNode = nodes.iterateNext();
  }

  if (titleNode === null) {
    //console.log("can't find title node");
    return null;
  } else {
    //console.log("Found title node: " + titleNode.textContent);
  }
  return titleNode;
}


}
)();
