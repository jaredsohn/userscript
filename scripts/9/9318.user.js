// This script is available under the GPL v2
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Stack it
// @namespace     http://www.blueobelisk.org
// @description   Adds to connetea
// @include       http://pubs*.acs.org/*
// @include       http://www.rsc.org/*
// @include       http://www*.interscience.wiley.com/*
// @include       http://www.nature.com/*
// @include       http://*.oxfordjournals.org/*
// @include       http://*.plosjournals.org/*
// @include       http://www.pnas.org/*
// ==/UserScript==
//
//
// 18May07 Improved the layout of the Stack It logo and counter
//


main();

function main() {

  var allTextareas, thisTextarea;
  allTextareas = document.getElementsByTagName('*');
  //For every node in the document
  for (var i = 0; i < allTextareas.length; i++) {
    thisTextarea = allTextareas[i];
    if (!thisTextarea.firstChild){continue;}
    //For every child of this node check for the presence of a DOI
    for (var k =0;k< thisTextarea.childNodes.length;k++ )
    {
      var reg = /(10\.[0-9]+\/[a-z0-9\.\-\+\/]+)/i;
      var ar = reg.exec(thisTextarea.childNodes[k].nodeValue);
      var doi_found=RegExp.$1;
      if (ar && doi_found){
        getnumstacks(doi_found, thisTextarea);
      }
    }
  }
}
 
function insertemptystack(stacks, doi, textarea) {
  space = document.createElement("span");
  space.innerHTML = "&nbsp;";
  numstacks = document.createElement("span");
  numstacks.setAttribute("style", "font-weight:bold; font-size: 20px; font-family: Arial");
  numstacks.innerHTML = "&nbsp;" + stacks + "&nbsp;&nbsp;";
  anchor = document.createElement("a");
  anchor.setAttribute("href","http://dx.doi.org/"+doi);
  anchor.addEventListener("click", addnewnote, true);
  img = document.createElement("img");
  img.setAttribute("alt","Stack It!");
  img.setAttribute("src","http://www.redbrick.dcu.ie/~noel/icons/stackit.png");
  img.setAttribute("style", "position:relative; bottom: -4px");
  img.setAttribute("border","0");
  anchor.appendChild(img);

  //insert the created nodes before the next sibling of the DOI containing node
  textarea.parentNode.insertBefore(numstacks, textarea.nextSibling);
  textarea.parentNode.insertBefore(anchor, textarea.nextSibling);
  textarea.parentNode.insertBefore(space, textarea.nextSibling);
}

function addnewnote(event) {
  GM_log("Starting addnewnote");
  doi = event.target.parentNode.href; // the target is the IMG, the parent is the A
  datastring = "uri=" + myescape(doi) + "&tags=stackit";
  GM_log("Data string: " + datastring);
  GM_xmlhttpRequest({
    method: 'POST',
    url: "http://www.connotea.org/data/add",
    headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Accept': 'application/xml,text/html',
      'Content-type': 'application/x-www-form-urlencoded',
    },
    data: datastring,
    onload: function(responseDetails) {
      var response_status=responseDetails.status;
      var response_text=null;
      if (response_status==201){
        GM_log("Adding new note: response ok");
        response_text=responseDetails.responseText;
        GM_log("Response text is " + response_text);
        GM_log("Location text is " + responseDetails.Location);
        //insert_citations_cb( eval('(' + response_text + ')'), doi, textarea );
      }
      else GM_log("Response not ok!: "+ response_status);
    }
  });
  event.stopPropagation();
  event.preventDefault();
  GM_log("Finishing addnewnote");
}

function getnumstacks(doi, textarea) {
  GM_log("Starting getnumstacks");
  GM_xmlhttpRequest({
    method: 'GET',
    url: "http://www.connotea.org/data/uri/http://dx.doi.org/"+doi,
    headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Accept': 'application/xml,text/html',
    },
    onload: function(responseDetails) {
      var response_status=responseDetails.status;
      var response_text=null;
      if (response_status==200){
        GM_log("Looking up DOI on Connotea: response ok");
        response_text=responseDetails.responseText;
        GM_log("Response text is " + response_text);
        xmlresponse = (new DOMParser()).parseFromString(response_text, "text/xml");
        numstacks = xmlresponse.getElementsByTagName("Post").length;
        insertemptystack(numstacks, doi, textarea)
        //insert_citations_cb( eval('(' + response_text + ')'), doi, textarea );
      }
      else GM_log("Looking up DOI on Connotea: Response not ok! - " + response_status);
    }
  });
  GM_log("Finished getnumstacks");
}

function myescape(text) {
  var ans = escape(text).replace(/\//g, "%2F"); // Also may need to do with +
  return ans;
}
