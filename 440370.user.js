// ==UserScript==
// @name 	Citation helper for NCpedia staff
// @namespace 	http://joshwilson.net/gmscripts
// @include     http://collections.ncdcr.gov/dcr*
// @include     http://www.ncmarkers.com/Results.aspx*
// @include     http://www.ncmarkers.com/Markers.aspx*
// @include     http://www.flickr.com/photos/*
// @include     http://www.nchistoricsites.org/*
// @include     http://digital.ncdcr.gov/cdm/*
// @include     /^http://www2?.lib.unc.edu/mss/.*/
// @include     /^https?://archive\.org/.*/
// @include     http://books.google.com/*
// @include     http://bioguide.congress.gov/scripts/biodisplay*
// @include     http://www.loc.gov/pictures/*
// @include     http://digitalgallery.nypl.org/nypldigital/*
// @include     http://digitalcollections.nypl.org/*
// @grant       none
// @version     2.3
// ==/UserScript==

///////////////////////////////////////////////////////////////////////////////
//Helper functions

function getText(str) {
  var s = str.replace(/\<\/?a(?:\sclass="body_link_11"\shref="(?:.*?)")?\>/g, "");
  s = s.replace(/\<\/?nobr\>/g,"").trim();
  return s;
}
//Adds a period to a string if it needs one. Useful when a title may or may not 
//have a period.
function addPeriod(str) {
  if (str !== '') { //If an element ends up being blank, this just keeps it that way
    var s = str.trim();
    if ((s.charAt(s.length-1) !== '.') && (s.charAt(s.length-1) !== '!') && (s.charAt(s.length-1) !== '?')) {
      s += '.';
    }
    return s + ' ';
  }
  else {
    return '';
  }
}
//Basic access date information creator
function getAccessDate() {
  var d = new Date();
  var m = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return m[d.getMonth()] + ' ' + d.getDate() + ', ' +d.getFullYear();
}
//Basic URL element creator: for use when URL is simply location.href
function makeUrlElem() {
  var urlElem = document.createElement("a");
  urlElem.setAttribute("href", location.href);
  urlElem.appendChild(document.createTextNode(location.href));
  return urlElem;  
}
//Basic name shuffler - changes Firstname I. Lastname to Lastname, Firstname I.
//For single-words, no shuffling done. Such names are probably usernames or something
//if name is empty somehow, an empty string is returned
function theNameShuffler(name) {
  var nArray = name.split(' ');
  var shuffledName = '';
  if (nArray.length > 1) {
      shuffledName = nArray[nArray.length-1] + ', ';
      for (var i=0; i<nArray.length-1; i++) {
        shuffledName += nArray[i] + ' ';
      }
  }
  else if (nArray.length === 1) {
    shuffledName = nArray[0];
  }
  return addPeriod(shuffledName);
}

//Individual site citation functions

function collectionsNcdcrGov(citationElem, contentElem) {  
  var ti = (contentElem.childNodes[1].childNodes[5].textContent.trim()).toLowerCase();
  var tiArray = ti.split(' ');
  var newTi = '';
  for (word in tiArray) {
    if ((tiArray[word].charCodeAt(0)>96)&&(tiArray[word].charCodeAt(0)<123)) {
      newTi += String.fromCharCode(tiArray[word].charCodeAt(0) - 32);
      newTi += tiArray[word].substr(1,tiArray[word].length-1);
    }
    newTi += ' ';
  }
  newTi = newTi.trim();

  var e = contentElem.childNodes[1].childNodes[9].childNodes[1];
  var pubYear = e.childNodes[4].childNodes[3].textContent.trim();
  var agency = e.childNodes[2].childNodes[3].textContent.trim();
  var accNum = e.childNodes[0].childNodes[3].textContent.trim();

  var urlElem = document.createElement("a");
  urlElem.setAttribute("href", location.href);
  urlElem.appendChild(document.createTextNode(accNum));

  var citationStart = '"' + newTi + ", Accession #: ";
  var citationEnd = document.createTextNode('." ' + pubYear + '. North Carolina ' + agency + '.');

  //Attach formatted citation text to its content node
  var returnElem = citationElem;
  returnElem.appendChild(document.createTextNode(citationStart));
  returnElem.appendChild(urlElem);
  returnElem.appendChild(citationEnd);
  
  return returnElem;
}

function historicalMarkers(citationElem) {
  var ti = document.getElementById("txtTitle").value.toLowerCase();
  var tiArray = ti.split(' ');
  var newTi = '';
  for (word in tiArray) {
    if ((tiArray[word].charCodeAt(0)>96)&&(tiArray[word].charCodeAt(0)<123)) {
      newTi += String.fromCharCode(tiArray[word].charCodeAt(0) - 32);
      newTi += tiArray[word].substr(1,tiArray[word].length-1);
    }
    else {
      newTi += tiArray[word];
    }
    newTi += ' ';
  }
  newTi = newTi.trim();

  var hmid = document.getElementById("txtID").value;
  var url = 'http://www.ncmarkers.com/Markers.aspx?sp=Markers&k=Markers&sv=' + hmid;

  var urlElem = document.createElement("a");
  urlElem.setAttribute("href", url);
  urlElem.appendChild(document.createTextNode(url));

  var citationStart = '"' + newTi + '." N.C. Highway Historical Marker ' + hmid;
  citationStart += ', N.C. Office of Archives & History. ';
  
  var accessed = getAccessDate();
  var citationEnd = document.createTextNode(" (accessed " + accessed + ").");
  
  //Attach formatted citation text to its content node
  var returnElem = citationElem;
  returnElem.appendChild(document.createTextNode(citationStart));
  returnElem.appendChild(urlElem);
  returnElem.appendChild(citationEnd);
  
  return returnElem;
}

function flickrArchives(citationElem) {
  var desc = '';
  try {
  desc = document.getElementById("description_div").childNodes[1].textContent;
  } catch (e) {}

  var bits = desc.split(/[\.,]\s+from\s/i);
  if (bits.length === 2) {
    newDesc = bits[0] + '." From ' + bits[1].substr(0,bits[1].length-1);
  }
  else {
    newDesc = desc;
  }
  //Remove period from end of description, if necessary
  if (newDesc.substr(newDesc.length-1,1) === ".") {
    newDesc = newDesc.substr(0, newDesc.length-1);
  }

  var callNo = document.getElementById("title_div").textContent;

  var siteElem = document.createElement("em");
  siteElem.setAttribute('style', 'font-style: italic;');
  siteElem.appendChild(document.createTextNode('Flickr, '));
  
  var urlElem = makeUrlElem();
  var accessed = getAccessDate();
  
  var citation = 'State Archives of North Carolina. "' + newDesc + ' (call #: ' + callNo + '). Photograph. ';
  var citationEnd = document.createTextNode(" (accessed " + accessed + ").");

  //Attach formatted citation text to its content node
  var returnElem = citationElem;
  returnElem.appendChild(document.createTextNode(citation));
  returnElem.appendChild(siteElem);
  returnElem.appendChild(urlElem);
  returnElem.appendChild(citationEnd);
  
  return returnElem;
}

function flickrOther(citationElem) {

  //Most recent Flickr update removed 'no real name added' possibility for names
  //Also no difference between contacts and others in page structure
  var name = '';
  var spans = document.getElementsByTagName("span");
  for (e in spans) {
    if (/photo-name-line-1/.test(spans[e].className)) { //should only be true once
      name = theNameShuffler(spans[e].textContent.trim());
    }
  }
  var ti = document.getElementById("title_div").textContent;
  if ((ti.substr(ti.length-1,1) !== ".") && (ti.substr(ti.length-1,1) !== "!") && (ti.substr(ti.length-1,1) !== "?")) {
    ti += ".";
  }

  var loc = '';
  try {
    var tryLoc = document.getElementById("photoGeolocation-storylink").textContent;
    loc = ' ' + tryLoc.trim() + ', ';
  } catch (e) {}

  var accessed = getAccessDate();

  var uploadDate = document.getElementById("photo-story-story").childNodes[1].childNodes[1].textContent.trim();
  if (!(/[0-9]{4}/.test(uploadDate))) {
      uploadDate = accessed;
  }
  else if (/Taken\son/.test(uploadDate)){
    uploadDate = uploadDate.substring(9);
  }

  var urlElem = makeUrlElem();

  var citation = addPeriod(name) + '"' + ti + '" Photograph. ' + loc + ' ' + uploadDate + '. ';
  var citationEnd = document.createTextNode(" (accessed " + accessed + ").");

  var siteElem = document.createElement("em");
  siteElem.setAttribute('style', 'font-style: italic;');
  siteElem.appendChild(document.createTextNode('Flickr, '));

  //Attach formatted citation text to its content node
  var returnElem = citationElem;
  returnElem.appendChild(document.createTextNode(citation));
  returnElem.appendChild(siteElem);
  returnElem.appendChild(urlElem);
  returnElem.appendChild(citationEnd);
  
  return returnElem;
}

function ncHistoricSites(citationElem) {
  
  var ti = document.getElementById("titleinfo").childNodes[1].textContent;

  var citation = '"' + ti + '." N.C. Historic Sites, N.C. Office of Archives & History: ' ;
  
  var urlElem = makeUrlElem();
  var accessed = getAccessDate();
  var citationEnd = document.createTextNode(" (accessed " + accessed + ").");
  
  //Attach formatted citation text to its content node
  var returnElem = citationElem;
  returnElem.appendChild(document.createTextNode(citation));
  returnElem.appendChild(urlElem);
  returnElem.appendChild(citationEnd);
  
  return returnElem;  
}

function ncdc (citationElem) {
  var creator='', agency = '', ti = '', publisher = '', pubDate = '';
  var rows = document.getElementsByTagName("tr");
  var titleNotFound = true; //prevents false second title hit
  for (tr in rows) {
    try {
      if  (rows[tr].childNodes[1].textContent &&
          (rows[tr].childNodes[1].textContent.trim() === "Creator")){
        creator = addPeriod(rows[tr].childNodes[3].textContent);
      }
      else if  (rows[tr].childNodes[1].textContent &&
               (rows[tr].childNodes[1].textContent.trim() === "Agency-Current")){
        agency = addPeriod(rows[tr].childNodes[3].textContent);
      }
      else if  (rows[tr].childNodes[1].textContent &&
               (rows[tr].childNodes[1].textContent.trim() === "Publisher")){
        publisher = addPeriod(getText(rows[tr].childNodes[3].innerHTML).replace(/\s?:\s?/, " [N.C.]: "));
      }
      else if  (rows[tr].childNodes[1].textContent &&
               (rows[tr].childNodes[1].textContent.trim() === "Date")){
        pubDate = addPeriod(getText(rows[tr].childNodes[3].innerHTML));
      }
      else if (titleNotFound === true) {
        if  (rows[tr].childNodes[1].textContent &&
                 (rows[tr].childNodes[1].textContent.trim() === "Title")){
          ti = getText(rows[tr].childNodes[3].innerHTML);
          ti = addPeriod(ti.replace(/\.\.\.\[(\d{4})\]/, ' $1'));
          titleNotFound = false;
        }        
      }
    } catch (e){};
  }
  
  //If there's a creator, use that. Otherwise, go with the agency information
  if (creator!=='') {
    agency = creator;
  }

  //Create title element
  var tiElem = document.createElement("em");
  tiElem.appendChild(document.createTextNode(ti));

  //Clean up publisher
  if (publisher && pubDate) {
    if (/\d{4}-\d{4}\.\s/.test(publisher)) {
      publisher = publisher.replace(/\d{4}-\d{4}\.\s/, pubDate);
      pubDate = '';
    }
  }

  //Clean up URL and create element 
  var url = '';
  //Use the citationUrl() function if it's available on the page
  try {
    url = document.getElementById("cdm_objectRefUrl").value;
  } catch(e) {};
  
  var urlElem = document.createElement("a");
  urlElem.setAttribute("href", url);
  urlElem.appendChild(document.createTextNode(url));

  var accessed = getAccessDate();
  var citationEnd = document.createTextNode(" (accessed " + accessed + ").");

  //Attach formatted citation text to its content node
  var returnElem = citationElem;
  citationElem.appendChild(document.createTextNode(agency));
  citationElem.appendChild(tiElem);
  citationElem.appendChild(document.createTextNode(publisher + pubDate));
  citationElem.appendChild(urlElem);
  citationElem.appendChild(citationEnd);
 
  return returnElem;  
}

function southernHistoricalCollection(citationElem) {
    
  //ti[1] will be the title
  //ti[0] will be Collections Number info.
  var titleArray=document.getElementById("top").childNodes[1].textContent.split("Collection Title: ");

  var ti = titleArray[1].trim();
  if (ti.charAt(ti.length-1) == '.') {
    ti = ti.substr(0,ti.length-1);
  }
  var collNum = titleArray[0].replace("Collection Number:", "collection no.").trim();  

  var citation = ti + ' (' + collNum + '). The Southern Historical Collection. Louis Round Wilson Special Collections Library. University of North Carolina at Chapel Hill. ';
  
  var urlElem = makeUrlElem();
  var accessed = getAccessDate();
  var citationEnd = document.createTextNode(" (accessed " + accessed + ").");
 
  //Attach formatted citation text to its content node
  var returnElem = citationElem;
  returnElem.appendChild(document.createTextNode(citation));
  returnElem.appendChild(urlElem);
  returnElem.appendChild(citationEnd);
  
  return returnElem;  
}

function archiveDotOrg(citationElem) {
    
  var au = '', publisher = '', ti = '', pubDate = '';
    
  //title & pubdate
  var boxtop = document.getElementById("midcol").childNodes[0].childNodes[0].textContent;
  var endTitle = boxtop.search(/\(\d{4}\)/);
  ti = boxtop.substr(0, endTitle - 1);
  if (ti.charAt(ti.length-1) == ';') {
    ti = ti.substr(0, ti.length-1);
  }
  pubDate = addPeriod(boxtop.substr(endTitle + 1, 4)); 
  
  //author & publisher
  var rows = document.getElementsByTagName("span");
  for (tr in rows) {
    if (rows[tr].className=="key") {
      try {
        if  (rows[tr].textContent === "Author:"){
          au = rows[tr].nextElementSibling.textContent;
          //Sometimes years after the author name
          var authorDates = au.search(/,\s\d{4}/);
          if (authorDates > 0) {
            au = au.substr(0, authorDates);
          }
        }
        else if  (rows[tr].textContent === "Publisher:"){
          publisher = addPeriod(rows[tr].nextElementSibling.textContent);
        }
      }
      catch (e){};      
    }
  }

  //Create title element
  var tiElem = document.createElement("em");
  tiElem.appendChild(document.createTextNode(addPeriod(ti)));

  var urlElem = makeUrlElem();  
  var accessed = getAccessDate();
  var citationEnd = document.createTextNode(" (accessed " + accessed + ").");
 
  //Attach formatted citation text to its content node
  var returnElem = citationElem;
  returnElem.appendChild(document.createTextNode(addPeriod(au)));
  returnElem.appendChild(tiElem);
  returnElem.appendChild(document.createTextNode(publisher + pubDate));
  returnElem.appendChild(urlElem);
  returnElem.appendChild(citationEnd);  
  return returnElem;  
}

function googleBooks(citationElem) {
    
  var ti = '', au = '', publisher = '';
  var infoElem = document.getElementById("bookinfo");
  
  //Google does a weird thing where some fiels are split into multiple elements, for styling
  //I guess, though it's not really clear. I'm skeptical these pieces will be around consistently.
  //Hence, wrapping everything in a big try/catch
  
  var metadataElem = document.getElementsByTagName("tr");
  for (var i=0; i<metadataElem.length; i++) {
    if (metadataElem[i].className === "metadata_row") {
      try {
        if ((metadataElem[i].childNodes[0].textContent) &&
            (metadataElem[i].childNodes[0].textContent === "Title")) {
          ti = metadataElem[i].childNodes[1].childNodes[0].textContent;
        }
        else if ((metadataElem[i].childNodes[0].textContent) &&
            (metadataElem[i].childNodes[0].textContent === "Author")) {
          au = theNameShuffler(metadataElem[i].childNodes[1].childNodes[0].textContent);
        }
        else if ((metadataElem[i].childNodes[0].textContent) &&
            (metadataElem[i].childNodes[0].textContent === "Publisher")) {
          publisher = metadataElem[i].childNodes[1].childNodes[0].textContent;
        }
      } catch (e){};
    }
  } 

  //Create title element
  var tiElem = document.createElement("em");
  tiElem.appendChild(document.createTextNode(addPeriod(ti)));
  
  var url = location.href + '&printsec=frontcover#v=onepage&q&f=false';
  var urlElem = document.createElement("a");
  urlElem.setAttribute("href", url);
  urlElem.appendChild(document.createTextNode(url));
  
  var accessed = getAccessDate();
  var citationEnd = document.createTextNode(" (accessed " + accessed + ").");
 
  //Attach formatted citation text to its content node
  var returnElem = citationElem;
  returnElem.appendChild(document.createTextNode(au));
  returnElem.appendChild(tiElem);
  returnElem.appendChild(document.createTextNode(addPeriod(publisher)));
  returnElem.appendChild(urlElem);
  returnElem.appendChild(citationEnd);  
  return returnElem;  
}

function congressionalBioguide(citationElem) {
  
  //title needs to be fished out of the HTML and cleaned up some
  var titleBits = document.getElementsByTagName("td");
  var badlyCasedTitle = titleBits[3].innerHTML.replace(/(<([^>]+)>)/ig,"");
  var names = badlyCasedTitle.split(',');
  var ti = names[0].substr(0,1) + names[0].substr(1,names[0].length-1).toLowerCase();
  for (var i=1; i<names.length; i++) {
     ti += ', ' + names[i];
  }
  ti = ti.replace('&nbsp;',' ');
  
  var citation = '"' + ti + '." ';
  
  var tiElem = document.createElement("em");
  tiElem.appendChild(document.createTextNode("Biographical Directory of the United States Congress."));

  var citationMiddle = " Washington, D.C.: The Congress. ";

  var urlElem = makeUrlElem();
  var accessed = getAccessDate();
  var citationEnd = document.createTextNode(" (accessed " + accessed + ").");
 
  //Attach formatted citation text to its content node
  var returnElem = citationElem;
  returnElem.appendChild(document.createTextNode(citation));
  returnElem.appendChild(tiElem);
  returnElem.appendChild(document.createTextNode(citationMiddle));
  returnElem.appendChild(urlElem);
  returnElem.appendChild(citationEnd);
  
  return returnElem;  
}

function locPictures(citationElem) {
    
  var bib=document.getElementById("bib").children[0].children;
  var tempTextContent;
  var ti="",au="",date="",medium="",reprodNum="",rightsAdv="",callNo="";

  for (var i = 0; i < bib.length; i++) {
    tempTextContent = bib[i].textContent.replace(/\s{3,}/g," ").trim();
    if (/Title:/.test(tempTextContent)) {
      ti = tempTextContent.substring(tempTextContent.indexOf(":")+2);
      if (ti.charAt(0) !== "[") {
        ti = '"' + ti + '"';
      }
    }
    else if (/Creator/.test(tempTextContent)) {
      au = tempTextContent.substring(tempTextContent.indexOf(":")+2);
      if (au.indexOf(", creator") > 0) {
        au = au.substring(0,au.indexOf(", creator"));
      }
      if (au.indexOf(", photographer") > 0) {
        au = au.substring(0,au.indexOf(", photographer"));
      }
    }
    else if (/Date/.test(tempTextContent)) {
      date = tempTextContent.substring(tempTextContent.indexOf(":")+2);
    }
    else if (/Medium/.test(tempTextContent)) {
      medium = tempTextContent.substring(tempTextContent.indexOf(":")+2);
    }
    else if (/Reproduction\sNumber/.test(tempTextContent)) {
      reprodNum = tempTextContent.substring(tempTextContent.indexOf(":")+2);
    }
    else if (/Rights\sAdvisory/.test(tempTextContent)) {
      rightsAdv = tempTextContent.substring(tempTextContent.indexOf(":")+2);
    }
    //Only include call number info if it's part of a named collection
    else if ((/Call\sNumber/.test(tempTextContent)) && (/Collection/.test(tempTextContent))) {
      callNo = tempTextContent.substring(tempTextContent.indexOf(":")+2);
      callNo = callNo.replace(/\s\[.*\]/g,"").trim();
      callNo = callNo.replace(/\s\<.*\>/g,"").trim();
    }
  }
  
  var citation = addPeriod(au) + addPeriod(ti) + "Photograph. " + addPeriod(date);
  citation += addPeriod(callNo) + "Prints and Photographs Division, Library of Congress. ";
  
  var urlElem = makeUrlElem();
  var accessed = getAccessDate();
  var citationEnd = document.createTextNode(" (accessed " + accessed + ").");
 
  //Attach formatted citation text to its content node
  var returnElem = citationElem;
  returnElem.appendChild(document.createTextNode(citation));
  returnElem.appendChild(urlElem);
  returnElem.appendChild(citationEnd);
  
  return returnElem;  
}

/**
 * This is for the old version of the site, developed before I realized there was a new
 * version in beta release (9/25/13). May as well leave this here while the old version
 * is accessible. But keep an eye out, it can probably be deleted sooner or later. 
 * 
 * @param {type} citationElem
 * @returns {nyplDigital.returnElem}
 *  
 */
function nyplDigitalOld(citationElem) {

  var bib=document.getElementById("keepmeta").children[0].children;
  var elemName="", elemTextContent="";
  var ti="",au="",date="",itemLocation=""; //'location' as variable name has a conflict
  for (var i = 0; i < bib.length; i++) {
    elemName = bib[i].textContent.trim();
    if (elemName !== "") { //lots of empty elements--proceed only if there's content
      elemTextContent = bib[i].nextSibling.textContent.replace(/\s{3,}/g," ").trim().substring(2);

      //If there are multiple creators, they appear in consecutive BR elements
      //In this case, append each to the textContent
      var sibCounter = i;
      while(bib[sibCounter].nextElementSibling.nodeName === "BR") {
          elemTextContent += "; " + bib[sibCounter+1].nextSibling.textContent.replace(/\s{3,}/g," ").trim();
          sibCounter++;
      }
      console.log(elemName);
      if (/Image\sTitle/.test(elemName)) {
        ti = elemTextContent;
      }
      else if (/Creator/.test(elemName)) {
        au = elemTextContent.replace(/(?:,\s[0-9]{4}\-[0-9]{4})?\s\-\-\s[A-Z][a-z]+/g,"");
      }
      else if (/Created\sDate/.test(elemName)) {
        date = elemTextContent;
      }
      else if (/Location/.test(elemName)) {
        location = elemTextContent;
      }
    }
  }

  var citation = addPeriod(au) + addPeriod(ti) + "Photograph. " + addPeriod(date);
  citation += addPeriod(location) + "New York Public Library Digital Gallery. ";
  
  //Permalink is not same as location.href, but it's available in a form field
  var inputs=document.getElementsByTagName("input");
  var url="";
  for (var i=0; i<inputs.length; i++) {
    if (/^http/.test(inputs[i].value)) {
      url = inputs[i].value;
      break;
    }
  }
  var urlElem = document.createElement("a");
  urlElem.setAttribute("href", url);
  urlElem.appendChild(document.createTextNode(url));
  
  var accessed = getAccessDate();
  var citationEnd = document.createTextNode(" (accessed " + accessed + ").");
 
  //Attach formatted citation text to its content node
  var returnElem = citationElem;
  returnElem.appendChild(document.createTextNode(citation));
  returnElem.appendChild(urlElem);
  returnElem.appendChild(citationEnd);
  
  return returnElem;  
}

function nyplDigital(citationElem) {

  var ti = document.getElementById("item-wrapper").children[0].textContent;

  var elemName="";
  var au="", date="", itemLocation="";

  var bib=document.getElementById("item-metadata").children[1].children[1].children;

  for (var i = 0; i < bib.length; i++) {

    if (bib[i].nodeName === "DT") {
      elemName = bib[i].children[0].textContent;

      if (/Names/.test(elemName)) {
        au = bib[i+1].textContent.replace(/\(.*\)/g,"").trim();
        var sibCounter = i+1;
        while(bib[sibCounter].nextElementSibling.nodeName === "DD") {
            au += "; " + bib[sibCounter+1].textContent.replace(/\(.*\)/g,"").trim();
            sibCounter++;
        }
      }
      else if (/Dates/.test(elemName)) {
        date = bib[i+2].textContent.replace(/Date\sCreated:\s/g,"").trim();
      }
      else if (/locations/.test(elemName)) {
        itemLocation = bib[i+1].textContent.trim();      
      }

    }
  }

  var citation = addPeriod(au) + addPeriod(ti) + "Photograph. " + addPeriod(date);
  citation += addPeriod(itemLocation) + "New York Public Library Digital Gallery. ";
 
  var urlElem = makeUrlElem();
  var accessed = getAccessDate();
  var citationEnd = document.createTextNode(" (accessed " + accessed + ").");
 
  //Attach formatted citation text to its content node
  var returnElem = citationElem;
  returnElem.appendChild(document.createTextNode(citation));
  returnElem.appendChild(urlElem);
  returnElem.appendChild(citationEnd);
  
  return returnElem;  
}

///////////////////////////////////////////////////////////////////////////////
//Don't need to edit the lines below, they are always the same
///////////////////////////////////////////////////////////////////////////////

//Create citation div and help text
var citationDivWrapper = document.createElement("div");
citationDivWrapper.appendChild(document.createTextNode("Copy and paste me:"));
var citationDiv = document.createElement("p");
var contentElem;

///////////////////////////////////////////////////////////////////////////////
//For new sites, add a check for for the URL
//--Set any styling attributes needed for the citation text
//--Establish location for citation text
///////////////////////////////////////////////////////////////////////////////

if (/collections\.ncdcr\.gov\/dcr/.test(location.href)) {
  citationDivWrapper.setAttribute("style", "color:black;");
  contentElem = document.getElementById("normalcontent");
  citationDiv = collectionsNcdcrGov(citationDiv, contentElem);
}
else if (/ncmarkers\.com\/(?:Results|Markers)/.test(location.href)) {
  citationDivWrapper.setAttribute("style", "color:white;");
  contentElem = document.getElementById("Form1");
  citationDiv = historicalMarkers(citationDiv);
}
else if (/flickr\.com\/photos\/north\-carolina\-state\-archives/.test(location.href)) {
  citationDivWrapper.setAttribute("style", "color:black;");
  contentElem = document.getElementById("photo-details");
  citationDiv = flickrArchives(citationDiv);
}
else if (/flickr\.com\/photos/.test(location.href)) {
  citationDivWrapper.setAttribute("style", "color:black;");
  contentElem = document.getElementById("photo-details");
  citationDiv = flickrOther(citationDiv);
}
else if (/nchistoricsites\.org/.test(location.href)) {
  citationDivWrapper.setAttribute("style", "color:black; font-size:1.5em;");
  contentElem = document.getElementById("contentarea");
  citationDiv = ncHistoricSites(citationDiv);
}
else if (/digital\.ncdcr\.gov\/cdm/.test(location.href)) {
  citationDivWrapper.setAttribute("style", "text-align: left;");
  contentElem = document.getElementById("top_content");
  citationDiv = ncdc(citationDiv);
}
else if (/lib\.unc\.edu\/mss/.test(location.href)) {
  citationDivWrapper.setAttribute("style", "color:black; text-align: left;");
  contentElem = document.getElementById("eadcontent");
  citationDiv = southernHistoricalCollection(citationDiv);
}
else if (/archive\.org/.test(location.href)) {
  citationDivWrapper.setAttribute("style", "color:black; text-align: left;");
  contentElem = document.getElementById("begPgSpcr");
  citationDiv = archiveDotOrg(citationDiv);
}
else if (/books\.google\.com/.test(location.href)) {
  citationDivWrapper.setAttribute("style", "color:black; text-align: left;");
  contentElem = document.getElementById("viewport_table");
  citationDiv = googleBooks(citationDiv);
}
else if (/bioguide\.congress\.gov/.test(location.href)) {
  citationDivWrapper.setAttribute("style", "color:black; text-align: left;");
  var tables = document.getElementsByTagName("table");
  contentElem = tables[0];
  citationDiv = congressionalBioguide(citationDiv);
}
else if (/loc\.gov\/pictures/.test(location.href)) {
  citationDivWrapper.setAttribute("style", "color:black; text-align: left;");
  contentElem = document.getElementById("item");
  citationDiv = locPictures(citationDiv);
}
else if (/digitalgallery\.nypl\.org\/nypldigital/.test(location.href)) {
  citationDivWrapper.setAttribute("style", "color:black; text-align: left;");
  contentElem = document.getElementById("frame");
  citationDiv = nyplDigitalOld(citationDiv);
}
else if (/digitalcollections\.nypl\.org/.test(location.href)) {
  citationDivWrapper.setAttribute("style", "color:black; text-align: left;");
  contentElem = document.getElementById("actions-wrapper");
  citationDiv = nyplDigital(citationDiv);
}

///////////////////////////////////////////////////////////////////////////////

//Assemble citation div
citationDivWrapper.appendChild(citationDiv); 

//Stick citation div into page in an obvious place
contentElem.parentNode.insertBefore(citationDivWrapper, contentElem);