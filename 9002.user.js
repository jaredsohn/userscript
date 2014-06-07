// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Quotes for Molecules
// @namespace     http://wiki.cubic.uni-koeln.de/cb/inchi
// @description   Adds Chemical Blogspace and PostGenomic content to InChIs
// @include       *
// ==/UserScript==

// Load overlib
var p = unsafeWindow;
function waitForOverlib() {
    if (typeof p.olMain=='undefined')
  // set to check every 100 milliseconds if the libary has loaded
        window.setTimeout(waitForOverlib, 100);
    else
        main();
}
function loadOverlib() {
  // dynamically creates a script tag
        var overlib = document.createElement('script');
        overlib.type = 'text/javascript';
        overlib.src = 'http://www.redbrick.dcu.ie/~noel/Tools/overlib_bubble/all_overlib.js';
        document.getElementsByTagName('head')[0].appendChild(overlib);
        waitForOverlib();
}
window.addEventListener('load', loadOverlib(), false);
// Finished loading overlib

function main() {
  var d = new Date();
  var curr_date = d.getDate();
  var INCHI_list="";
  var cb_stored_date= GM_getValue("chemical_blogspace_data_date", 0);
  // Check for new DOIs only once per day
  if (cb_stored_date != curr_date)
  {
    get_INCHI_list("http://wiki.cubic.uni-koeln.de/cb/api_inchi.php?type=inchi&ids_only=1", "chemical_blogspace_ID_list");
    GM_setValue("chemical_blogspace_data_date", curr_date);
  }
  var cb_id_list = eval('(' + GM_getValue("chemical_blogspace_ID_list","{InChI:{}}") + ')'); // check this line

  //GM_log("eval:" + GM_getValue("chemical_blogspace_ID_list","{InChI:{}}"));

  // PubChem support
  GM_log("pubchem support");
  allAelems = document.getElementsByTagName('a');
  for (var i = 0; i < allAelems.length; i++) {
//     GM_log("a href:" + allAelems[i].href);

    var reg = /\%22(InChI=1\/.*)\%22\[InChI\]/i;
    var ar = reg.exec(allAelems[i].href);
    var inchi_found = RegExp.$1;
    if (ar && inchi_found) {
      if (allAelems[i].firstChild && 
          allAelems[i].firstChild.nodeName == "SUP") {
        GM_log("Sechemtic created link detected... ");
      } else {
        GM_log("InChI: " + inchi_found);
        //when a DOI is found, check if it is listed in chemical blogspace
        if (cb_id_list.InChI[inchi_found])
            get_citations_cb(cb_id_list.InChI[inchi_found], allAelems[i]);
      }
    }
  }

  // Sechemtic support (microformat: <span class="inchi"/> or RDFa: <span class="chem:inchi"/>)
  GM_log("sechemtic support");
  allSpanelems = document.getElementsByTagName('span');
  for (var i = 0; i < allSpanelems.length; i++) {
    // GM_log("span class:" + allSpanelems[i].className);
    if (allSpanelems[i].className == "chem:inchi" || allSpanelems[i].className == "inchi") {
      thisSpan = allSpanelems[i];
      if (!thisSpan.firstChild) {continue;}
      for (var k =0;k< thisSpan.childNodes.length;k++) {
//         inchi_found = allSpanelems[i].nodeValue;
        var reg = /(InChI=1\/[^\s]+)/i;
        var ar = reg.exec(thisSpan.childNodes[k].nodeValue);
        var inchi_found=RegExp.$1;
        if (ar && inchi_found){
          GM_log("InChI found: " + inchi_found);
          //when a DOI is found, check if it is listed in chemical blogspace
          if (cb_id_list.InChI[inchi_found])
            get_citations_cb(cb_id_list.InChI[inchi_found], thisSpan);
        }
      }
    }
  }

/*  var allTextareas, thisTextarea;
  allTextareas = document.getElementsByTagName('*');
  //For every node in the document
  for (var i = 0; i < allTextareas.length; i++) {
    thisTextarea = allTextareas[i];
    if (!thisTextarea.firstChild){continue;}
    //For every child of this node check for the presence of a DOI
    for (var k =0;k< thisTextarea.childNodes.length;k++ )
    {
      var reg = /(InChI=1\/[^\s]+)/i;
      var ar = reg.exec(thisTextarea.childNodes[k].nodeValue);
      var doi_found=RegExp.$1;
      if (ar && doi_found){
        GM_log(thisTextarea.childNodes[k].nodeValue+": "+doi_found);
        //when a DOI is found, check if it is listed in chemical blogspace
        if (cb_id_list.InChI[doi_found])
            get_citations_cb(cb_id_list.InChI[doi_found], thisTextarea);
      }
    }
  }*/
}
 
function get_INCHI_list(myurl, variablename){
  GM_log("GETTING InChI LIST");
  GM_xmlhttpRequest({
    method: 'GET',
    url: myurl,
    headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Accept': 'application/xml,text/html',
    },
    onload: function(responseDetails) {
      var response_status=responseDetails.status;
      var response_text=null;
      if (response_status==200){
        GM_log("Get InChI List: response ok");
        response_text=responseDetails.responseText;
        //GM_setValue("chemical_blogspace_ID_list", response_text);
        GM_setValue(variablename, response_text);
      }
      else GM_log("Response not ok!");
    },
  });
}

function get_citations_cb(doi, textarea) {
  //GM_log("param: " + doi);
  url = "http://wiki.cubic.uni-koeln.de/cb/api.php?type=post&citing_cbid="+doi+"&format=json";
  GM_log("Starting get_citations: " + url);
  GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Accept': 'application/xml,text/html',
    },
    onload: function(responseDetails) {
      var response_status=responseDetails.status;
      var response_text=null;
      if (response_status==200){
        response_text=responseDetails.responseText;
        GM_log("Get InChI List: response ok: " + response_text);
        insert_citations_cb( eval('(' + response_text + ')'), doi, textarea );
      }
      else GM_log("Response not ok!");
    }
  });
  GM_log("Finished get citations");
}

function insert_citations_cb(obj, doi, textarea) {
  var bubbletext = "";
  for (var i=0; i<obj.length; i++) {
    post = obj[i];
    bubbletext += "<br /><a href='" + post.url + "'><b>" + post.title + "</b></a> <i>" + post.blog_name + "</i> " + post.summary + "... ";
  }
  newanchor = document.createElement("a");
  newanchor.setAttribute("href","http://wiki.cubic.uni-koeln.de/cb/inchi.php?id="+doi);
  newanchor.setAttribute("onmouseover", "return overlib('" + myescape(bubbletext) + "', STICKY, MOUSEOFF, WIDTH, 400, VAUTO, CAPTION, 'Powered by Chemical Blogspace');")
  newanchor.setAttribute("onmouseout", "return nd();")
  img = document.createElement("img");
  img.setAttribute("alt","Comments at Chemical Blogspace");
  img.setAttribute("src","http://www.redbrick.dcu.ie/~noel/Tools/overlib_bubble/logo.gif");
  img.setAttribute("border","0");
  newanchor.appendChild(img);
  //insert the created node before the next sibling of the DOI containing node
  textarea.parentNode.insertBefore(newanchor, textarea.nextSibling);
}

function hashtableToString(hashtable) { // Useful for debugging purposes
  var result = "";
  for (var i in hashtable) {
    if (hashtable[i] != null)
      result += "{" + i + "},{" + hashtable[i] + "}\n";  
  }
  return result;
}          

function myescape(text) {
  var ans = text.replace(/'/g, "\\'");
  // May have to also replace ( and ) with \( and \)
  // May have to also replace " with &whatever;
  // (see the overLIB FAQ)
  return ans;
}
