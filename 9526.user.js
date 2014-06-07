// Copyright (C) 2007 Noel O'Boyle
//
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Add to Connotea from Journal pages
// @namespace     http://www.blueobelisk.org
// @description   Adds articles to Connotea from journal pages
// @include       http://pubs*.acs.org/*
// @include       http://www.rsc.org/*
// @include       http://www*.interscience.wiley.com/*
// @include       http://www.nature.com/*
// @include       http://www.malariajournal.com/*
// @include       http://*.oxfordjournals.org/*
// @include       http://*.plosjournals.org/*
// @include       http://www.pnas.org/*
// ==/UserScript==
//
// 12-Sep-07: Fixed bug that prevented re-use of tags
// 28-Aug-07: Removed all references to overlib


GM_registerMenuCommand("Change your Connotea username", enterusername);
// GM_registerMenuCommand("Change your Connotea username", function(e) {alert("hey");});

queue = [];
queue_index = 0;
oldqueue = [];
main();

function enterusername(ev) {
  GM_log("starting enterusername");
  var d=document,b=d.body,e=d.getElementById('stackitusername');if(e)e.parentNode.removeChild(e);e=d.createElement('div');e.id='stackitusername';var st={color:'white',backgroundColor:'green',font:'normal 14px Sans-Serif',padding:'2px',margin:'0',position:window.attachEvent?'absolute':'fixed',top:'4px',right:'4px',zindex:'100',textAlign:'left'};for(s in st)e.style[s]=st[s];b.appendChild(e);
  var poptext = "<form name='connoteaform'><table><tr><td align='center'><b>Configure 'Add to Connotea'</b></td><td align='right'><input id='stackitusernamecancel' type='button' value='Cancel'/></td></tr>";
  poptext += '<tr><td colspan="2"><input id="stackitusernamebox" type="textbox"/>Enter your Connotea username</td></tr>';
  poptext += "<td><tr><input id='stackitusernamesubmit' type='button' value='Set username'/></td><td align='right' style='font-size:70%'>Powered by <a href='http://www.connotea.org'>Connotea</a> and <a href='http://www.blueobelisk.org'>blueobelisk.org</a></td></tr></table></form>";
  e.innerHTML=poptext;
  b.appendChild(e);
  var button = document.getElementById("stackitusernamesubmit");
  button.addEventListener("click", changeusername, true);
  var cancel = document.getElementById("stackitusernamecancel");
  cancel.addEventListener("click", cancelusername, true);
}

function submit(ev) {
  var doi = ev.target.id;
  var d=document,b=d.body,e=d.getElementById('stackitpopup');if(e)e.parentNode.removeChild(e);e=d.createElement('div');e.id='stackitpopup';var st={color:'white',backgroundColor:'green',font:'normal 14px Sans-Serif',padding:'2px',margin:'0',position:window.attachEvent?'absolute':'fixed',top:'4px',right:'4px',zindex:'100',textAlign:'left'};for(s in st)e.style[s]=st[s];b.appendChild(e);
  var poptext = "<form name='connoteaform'><table><tr><td align='center'><b>doi://"+doi+"</b></td><td align='right'><input id='stackitcancel' type='button' value='Cancel'/></td></tr>";
  var tags = eval('(' + GM_getValue("tags", "[]") + ')');
  tags.sort();
  var newtags = [];
  for (var i=0; i<tags.length; i++) {
    if (tags[i]!="stackit")
      newtags.push(tags[i]);
  }
  poptext += "<tr><td style='font-size: 11px' rowspan='" + (newtags.length+3) + "'><b>Tags</b><br/>";
  var N = 15;
  poptext += "<table>";
  for (row=0; row<N; row++) {
    poptext+="<tr>";
    for (col=0; col<parseInt((newtags.length+N-1) / N); col++) {
      index = col*N + row;
      if (index < newtags.length)
        poptext += "<td><input type='checkbox' id='stackittagbox_" + index + "' name='tagboxes' value='" + newtags[index] + "'>" + newtags[index] + "</input></td>";
    }
    poptext+="</tr>";
  }
  poptext+="</table>";
  poptext += '<input id="stackitextratags" type="textbox"/><br/>e.g. "animal phylogeny" evolution';
  poptext += "</td><td rowspan='8'><textarea rows='4' cols='35' id='stackitdescription'/>Description</textarea><br/><textarea rows='4' cols='35' id='stackitcomment'/>Comment</textarea><br/><input type='checkbox' id='stackitauthor'>I am an author</input><br/><input type='checkbox' id='stackitprivate'>Keep private</input></td></tr>";
  poptext += "</table><table>";
  poptext += "<td><tr><input id='stackitsubmit' type='button' value='Add to Connotea'/></td><td align='right' style='font-size:70%'>Powered by <a href='http://www.connotea.org'>Connotea</a> and <a href='http://www.blueobelisk.org'>blueobelisk.org</a></td></tr></table></form>";
  e.innerHTML=poptext;
  b.appendChild(e);
  var button = document.getElementById("stackitsubmit");
  button.setAttribute("name", doi);
  button.addEventListener("click", addnewnote, true);
  var cancel = document.getElementById("stackitcancel");
  cancel.addEventListener("click", cancelsubmit, true);
}

function insertaddtoconnotea(doi, textarea) {
  space = document.createElement("span");
  space.innerHTML = "&nbsp;";
  numstacks = document.createElement("span");
  numstacks.setAttribute("style", "font-weight:bold; font-size: 14; font-family: Arial;");
  // numstacks.setAttribute("href", "http://www.connotea.org/uri/" + doi);
  img = document.createElement("img");
  img.setAttribute("alt","Connotea");
  img.setAttribute("src","http://www.connotea.org/connotea_icon.png");
  img.setAttribute("style", "position:relative; bottom: -4px");
  img.setAttribute("border","0");
  img.setAttribute("id",doi); // This is 'passed' to the submit callback
  img.addEventListener("click", submit, true);

  //insert the created nodes before the next sibling of the DOI containing node
  textarea.parentNode.insertBefore(numstacks, textarea.nextSibling);
  textarea.parentNode.insertBefore(img, textarea.nextSibling);
  textarea.parentNode.insertBefore(space, textarea.nextSibling);
  return numstacks;
} 

function message(text) {
  var d=document,b=d.body,e=d.getElementById('stackitmessage');if(e)e.parentNode.removeChild(e);e=d.createElement('div');e.id='stackitmessage';var st={color:'white',backgroundColor:'red',font:'normal 14px Sans-Serif',padding:'2px',margin:'0',position:window.attachEvent?'absolute':'fixed',top:'4px',right:'4px',zindex:'100',textAlign:'left'};for(s in st)e.style[s]=st[s];b.appendChild(e);
  e.innerHTML = text;
  window.setTimeout(deletemessage, 3000); 
}

function deletemessage() {
  var d=document,b=d.body,e=d.getElementById('stackitmessage');if(e)e.parentNode.removeChild(e);
}

function addnewnote(ev) {
  //GM_log("Starting addnewnote");
  popup = document.getElementById("stackitpopup");

  tags = eval('(' + GM_getValue("tags", "[]") + ')');
  chosentags = [];
  for (i=0; i<tags.length; i++) {
    c = document.getElementById("stackittagbox_" + i);
    if (c && c.checked)
      chosentags.push('"' + c.value + '"');
  }
  extratags = document.getElementById("stackitextratags");
  if (extratags.value) chosentags.push(extratags.value);
  chosentags.push('"stackit"');
  description = document.getElementById("stackitdescription").value;
  if (description=="Description") description="";
  comment = document.getElementById("stackitcomment").value;
  author = document.getElementById("stackitauthor").checked;
  if (author) author=1;
  else author = 0;
  keepprivate = document.getElementById("stackitprivate").checked;
  if (keepprivate) keepprivate=1;
  else keepprivate = 0;
  if (comment=="Comment") comment="";
  if (popup) popup.parentNode.removeChild(popup);
  doi = "http://dx.doi.org/" + ev.target.name;
  datastring = encodeURI('uri=' + doi + '&tags=' + chosentags.join(" ") + '&comment=' + comment + '&description=' + description + '&mywork=' + author + '&private=' + keepprivate);
  //GM_log("Data string: " + datastring);
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
        message("Added to Connotea!");
        //GM_log("Adding new note: response ok");
        response_text=responseDetails.responseText;
        //GM_log("Response text is " + response_text);
        //GM_log("Location text is " + responseDetails.Location);
        //insert_citations_cb( eval('(' + response_text + ')'), doi, textarea );
      }
      else {
        message("Didn't work! (" + response_status+")");       
        //GM_log("Response not ok!: "+ response_status);
      }
    }
  });
  ev.stopPropagation();
  ev.preventDefault();
  //GM_log("Finishing addnewnote");
}

function cancelsubmit(ev) {
  var popup = document.getElementById("stackitpopup");
  if (popup) popup.parentNode.removeChild(popup);
  ev.stopPropagation();
  ev.preventDefault();
}
function cancelusername(ev) {
  var popup = document.getElementById("stackitusername");
  if (popup) popup.parentNode.removeChild(popup);
  ev.stopPropagation();
  ev.preventDefault();
}
function changeusername(ev) {
  var box = document.getElementById("stackitusernamebox");
  if (box.value) {
    GM_setValue("username", box.value);
    message("Connotea username set to '" + box.value + "'");
    }
  popup = document.getElementById("stackitusername");
  if (popup) popup.parentNode.removeChild(popup);
  ev.stopPropagation();
  ev.preventDefault();
}

function lookupDOI(ev) {
  if (queue_index==0) {
    oldqueue = queue;
    queue = [];
  }
  GM_log("queue_index = " + queue_index + " queue length is " + oldqueue.length);
  if (oldqueue.length > 0) { // Otherwise it's finished
    var doi = oldqueue[queue_index][0];
    var numstackselem = oldqueue[queue_index][1];
    var numattempts = oldqueue[queue_index][2];
    getnumstacks(doi, numstackselem, numattempts);
    queue_index += 1;
    if (queue_index==oldqueue.length)
      queue_index = 0;
    window.setTimeout(lookupDOI, 2000);
  }
}

function gotoconnotea(ev) {
  doi = ev.target.id;
  window.open("http://www.connotea.org/uri/http://dx.doi.org/" + doi);
  ev.stopPropagation();
  ev.preventDefault();
}

function getnumstacks(doi, numstackselem, numattempts) {
  GM_log("Attempting " + doi + ": " + numattempts);
  
  GM_xmlhttpRequest({
    method: 'GET',
    url: "http://www.connotea.org/data/uri/http://dx.doi.org/"+doi,
    headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Accept': 'application/xml,text/html',
      "If-Modified-Since": "Sat, 1 Jan 2005 00:00:00 GMT",
    },
    onload: function(responseDetails) {
      var response_status=responseDetails.status;
      var response_text=null;
      if (response_status==200){
        //GM_log("Looking up DOI on Connotea: response ok");
        response_text=responseDetails.responseText;
        GM_log("Response text is " + response_text);
        xmlresponse = (new DOMParser()).parseFromString(response_text, "text/xml");
        numstacks = xmlresponse.getElementsByTagName("Post").length;
        numstackselem.innerHTML = "&nbsp;" + numstacks + "&nbsp;&nbsp;";
        if (numstacks > 0) {
          numstackselem.setAttribute("id", doi);
          // GM_log("Setting name to " + doi);
          numstackselem.addEventListener("click", gotoconnotea, true);
         }
      }
      else {
        // GM_log("Looking up DOI on Connotea: Response not ok! - " + response_status + " " + responseDetails.responseText);
        if (numattempts < 10) {
          queue.push( [doi, numstackselem, numattempts + 1] );
          // GM_log("Pushing " + doi+ " back onto the queue");
        }
      }
    }
  });
  //GM_log("Finished getnumstacks");
}

function getmytags(username) {
  //GM_log("Starting getmytags:" + username);
  GM_xmlhttpRequest({
    method: 'GET',
    url: "http://www.connotea.org/data/tags/user/" + username,
    headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Accept': 'application/xml,text/html',
      "If-Modified-Since": "Sat, 1 Jan 2005 00:00:00 GMT",
    },
    onload: function(responseDetails) {
      var response_status=responseDetails.status;
      var response_text=null;
      if (response_status==200){
        //GM_log("Looking up DOI on Connotea: response ok");
        response_text=responseDetails.responseText;
        //GM_log("Response text is " + response_text);
        xmlresponse = (new DOMParser()).parseFromString(response_text, "text/xml");
        tags = xmlresponse.getElementsByTagName("Tag");
        tagvalues = new Array(tags.length);
        for (i=0; i<tags.length; i++) {
          tagvalues[i] = tags[i].getElementsByTagName("value")[0].textContent;
        }
        //GM_log("Tag value " + arraytostring(tagvalues));
        GM_setValue("tags", arraytostring(tagvalues));
        //insertemptystack(mytags, doi, textarea)
        //insert_citations_cb( eval('(' + response_text + ')'), doi, textarea );
      }
      else {
        //GM_log("Looking up tags on Connotea...failed! - " + response_status);
        }
    }
  });
  //GM_log("Finished getmytags");
}

function escapeURL(text) {
  var ans = escape(text).replace(/\//g, "%2F"); // Also may need to do with +
  return ans;
}
function arraytostring(arr) {
  ans = '[ ';
  for (i=0; i<arr.length; i++) {
    if (i>0) ans += ',';
    ans += '"' + arr[i] + '"';
  }
  return ans + ' ]';
}
function myescape(text) {
  var ans = text.replace(/'/g, "\\'");
  // May have to also replace ( and ) with \( and \)
  // May have to also replace " with &whatever;
  // (see the overLIB FAQ)
  return ans;
}
function testnoop() {
  GM_xmlhttpRequest({
    method: 'GET',
    url: "http://www.connotea.org/data/noop",
    headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Accept': 'application/xml,text/html',
    },
    onload: function(responseDetails) {
      var response_status=responseDetails.status;
      if (response_status==200)
        bigmain();
      else 
        GM_log("Noop failed!");
    }
  });
}

function main() {
  testnoop();
  }


function bigmain() {
  GM_log("Starting main!");
  empty = "NONE SET!";
  username = GM_getValue("username", empty);
  if (username==empty) {
    enterusername("");
  }
  else {
    getmytags(username);

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
          //getnumstacks(doi_found, thisTextarea);
          numstacks = insertaddtoconnotea(doi_found, thisTextarea);
          queue.push( [doi_found, numstacks, 0] );
        }
      }
    }
  lookupDOI();
  }
}
