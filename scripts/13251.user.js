// ChemGM Chemical Informatics Grease Monkey Script
// version 0.1 BETA!
// 2007-4-20
// Copyright (c) 2007, Dazhi Jiao
// Released under the BSD license
// http://www.opensource.org/licenses/bsd-license.php
//
// ---------------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "ChemGM", and click Uninstall.
//
// ---------------------------------------------------------------------------
//
// ==UserScript==
// @name		  ChemGM
// @namespace	  http://cheminfo.informatics.indiana.edu
// @description   Highlight Chemical Terms on Web Pages
// @include		  http://*
// @include		  https://*
// ==/UserScript==


// check for update
var d = new Date();
var curr_date = d.getDate();
var date_last_checked= GM_getValue("check_updates", 0);
if (date_last_checked != curr_date)
{
  GM_setValue("check_updates", curr_date);
  // Modified the code by Seifer at http://userscripts.org/users/33118
  script_name = 'ChemGM.user.js';
  script_href = "http://blueobelisk.svn.sf.net/svnroot/blueobelisk/userscripts/trunk/ChemGM.user.js";
  script_as_text = "http://blueobelisk.svn.sourceforge.net/viewvc/*checkout*/blueobelisk/userscripts/trunk/ChemGM.user.js?content-type=text%2Fplain";
  script_version=0.1;
  script_updatetext='ADD UPDATE TEXT HERE';

  GM_xmlhttpRequest({
      method: "GET",
      url: script_as_text,
      onload: function(responseDetails) {
        var text = responseDetails.responseText;
        var update_version = text.substring(text.indexOf("script_version=")+15,text.indexOf("\n",text.indexOf("script_version="))-2);
        var update_text = text.substring(text.indexOf("script_updatetext=")+19,text.indexOf("\n",text.indexOf("script_updatetext="))-3);
      if(update_version > script_version) {
          newversion = document.createElement("div");
          newversion.setAttribute("id", "gm_update_alert");
          newversion.setAttribute("style", "background-color:yellow; width:100%; position:absolute; z-index:99; top:0px; left:0px; text-align:center; font-size:11px; font-family: Tahoma");
          newversion.innerHTML = "<a href='#' onclick='document.body.removeChild(document.getElementById(&quot;gm_update_alert&quot;))' style='color:red'>Close</a><font color='yellow'>--------</font><font color='red'>There is a new version of the &quot;"+script_name+"&quot; script. You are currently running version "+script_version+".</font><br><font color='yellow'>----------------</font>The latest version is "+update_version+". <a href='#' onclick='document.getElementById(&quot;gm_update_alert_info&quot;).setAttribute(&quot;style&quot;, &quot;display:block&quot;)' style='color:green'>Click here for more info</a> or <a style='color:green' href='" + script_href + "'><b>Click here to download the latest version</b></a><span id='gm_update_alert_info' style='display:none'><b>Here's a short description of the latest update...</b><br>"+update_text+"</span>";
          document.body.appendChild(newversion);
        }
      }
  });
}


var elmChemDiv = document.createElement("div");
elmChemDiv.style.borderBottom = "1px solid silver";
elmChemDiv.style.textAlign = "right";
highlightButton = "<input type=\"submit\" id=\"highlight\" value=\"highlight\"/>";
smartsButton = '<input type="submit" id="smartsSubmit" value="Search"/>';
elmChemDiv.innerHTML = 
  '<div id="ChemGM"><span id="cgmMessage"></span>' + 
  highlightButton + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + 
  'Search Using Smarts: <input name="smarts" id="smartsText" type="text"/>' + 
  smartsButton + '</div>';
document.body.insertBefore(elmChemDiv, document.body.firstChild);
var elmSmartsButton = document.getElementById("smartsSubmit");
elmSmartsButton.disabled = true;
var elmSmarts = document.getElementById("smartsText");
elmSmarts.disabled = true;


var elmHighlightButton = document.getElementById("highlight");
elmHighlightButton.addEventListener("click", function (event) {
    var elmMessageDiv = document.getElementById("cgmMessage");
    elmMessageDiv.innerHTML = "Analyzing Text. This might take up to one minute. Please wait ...";
    event.target.disabled=true;
    GM_xmlhttpRequest({
        method: "GET", 
        url: "http://cheminfo.informatics.indiana.edu:8080/ChemGM/list?url=" + escape(location.href),
        //url: "http://localhost:8080/ChemGM/list?url=" + escape(location.href), 
        headers: {
            "User-agent":"Mozilla/4.0 (compatible) Greasemonkey", 
            "Accept":"application/atom+xml,application/xml,text/xml", 
        }, 
        onload: function (responseDetails) {
          var elmMessageDiv = document.getElementById("cgmMessage");
          elmMessageDiv.innerHTML = "";
        
          if (responseDetails.status != 200) {
            alert("Request from service failed. Can't parse the HTML right now. ");
            return;
          }          
          var parser=new DOMParser();
          var doc=parser.parseFromString(responseDetails.responseText,"application/xml");
          terms = doc.getElementsByTagName("term");
          
          var searchTerms = new Array();
          var allsmiles = '';
          for (var i = 0; i < terms.length; i++) {
            if (terms[i].textContent.length > 2) {
              searchTerms[searchTerms.length] = terms[i].textContent;
              if (terms[i].getAttribute('smiles') != "") {
                GM_setValue(terms[i].textContent, terms[i].getAttribute('smiles'));
                allsmiles += '| '  + terms[i].getAttribute('smiles') + ' ' + terms[i].textContent ;
              }
            }
          }
          GM_setValue("allsmiles", allsmiles);
          if (searchTerms.length > 0) {
            alert("There are " + searchTerms.length + " chemistry terms found in this webpage.\n " +
            "It might take a while to highlight all terms.");
            highlightSearchTermsArray(searchTerms, false);
            
            var elmSmartsButton = document.getElementById("smartsSubmit");
            elmSmartsButton.disabled = false;
            var elmSmarts = document.getElementById("smartsText");
            elmSmarts.disabled = false;            

          var elmSmartsButton = document.getElementById("smartsSubmit");
          elmSmartsButton.disabled = false;
          var elmSmarts = document.getElementById("smartsText");
          elmSmarts.disabled = false;
          
          elmSmartsButton.addEventListener("click", function (event) {
              var smarts = document.getElementById("smartsText").value;
              if (smarts == undefined) {
                elmMessageDiv.innerHTML = "Please enter smarts in the text box first. ";
                return;
              }
              var elmMessageDiv = document.getElementById("cgmMessage");
              elmMessageDiv.innerHTML = "Searching... Please wait";
              
              GM_xmlhttpRequest({
                method: "GET",
                //url: "http://localhost:8080/ChemGM/match?smarts=" + smarts + "&smiles=" + escape(GM_getValue("allsmiles")),
                url: "http://cheminfo.informatics.indiana.edu:8080/ChemGM/match?smarts=" + smarts + "&smiles=" + escape(GM_getValue("allsmiles")),
                headers: {
                    "User-agent":"Mozilla/4.0 (compatible) Greasemonkey", 
                    "Accept":"application/atom+xml,application/xml,text/xml", 
                }, 
                onload: function(responseDetails) {
                  var elmMessageDiv = document.getElementById("cgmMessage");
                  elmMessageDiv.innerHTML = "";
                  var doc=parser.parseFromString(responseDetails.responseText,"application/xml");
                  terms = doc.getElementsByTagName("term");
                  
                  var smartsArray = new Array();
                  for (var i = 0; i < terms.length; i++) {
                    if (terms[i].textContent.length > 2) {
                      smartsArray[smartsArray.length] = terms[i].textContent;
                    }
                  }      
                  if (smartsArray.length > 0) {
                    alert("There are " + smartsArray.length + " chemistry terms found in this webpage matching your smarts.\n " +
                    "It might take a while to highlight all terms. " + 
                    "They will be highlighted in GREEN.");
                    highlightSearchTermsArray(smartsArray, false, "smarts");
                  } else {
                    alert("No compound found matching smarts");
                  }   
                      
                }
              });
            }, true);

          } else {
            alert("No chemistry term found in this webpage. ");
          }
                            
        }
    });
}, true);

/*
 * This is the function that actually highlights a text string by
 * adding HTML tags before and after all occurrences of the search
 * term. You can pass your own tags if you'd like, or if the
 * highlightStartTag or highlightEndTag parameters are omitted or
 * are empty strings then the default <font> tags will be used.
 */
function doHighlight(bodyText, searchTerm, issmarts) {
  // the highlightStartTag and highlightEndTag parameters are optional
    if (issmarts == undefined) {
        highlightStartTag = "<span name='chemterm' style='background-color:rgb(255,255,0);'>";
        highlightEndTag = "</span>";
    } else {
        highlightStartTag = "<span name='chemterm' style='background-color: rgb(0,255,0);'>";
        highlightEndTag = "</span>";    
    }
  
  // find all occurences of the search term in the given text,
  // and add some "highlight" tags to them (we're not using a
  // regular expression search, because we want to filter out
  // matches that occur within HTML tags and script blocks, so
  // we have to do a little extra validation)
    var newText = "";
    var i = -1;
    var lcSearchTerm = searchTerm.toLowerCase();
    var lcBodyText = bodyText.toLowerCase();
    if (issmarts == undefined) {
      while (bodyText.length > 0) {
        i = lcBodyText.indexOf(lcSearchTerm, i+1);
        if (i < 0) {
          newText += bodyText;
          bodyText = "";
        } else {
                // skip anything inside an HTML tag
          if (bodyText.lastIndexOf(">", i) >= bodyText.lastIndexOf("<", i)) {
            // skip anything inside a <script> block
            if (lcBodyText.lastIndexOf("/script>", i) >= lcBodyText.lastIndexOf("<script", i)) {
              newText += bodyText.substring(0, i) + highlightStartTag +
                bodyText.substr(i, searchTerm.length) + highlightEndTag;

              newText += '[<a target="_new" href="http://www.ncbi.nlm.nih.gov/entrez/query.fcgi?CMD=search&DB=pccompound&term=%22' 
                + escape(searchTerm) + '%22">PubChem</a>]';
              if (GM_getValue(searchTerm) != "" && GM_getValue(searchTerm) != undefined) {
                var smiles = GM_getValue(searchTerm);
                newText += '[<a target="_new" href="http://cheminfo.informatics.indiana.edu/~djiao/573/phpsdg.php?width=300&height=300&scale=0.9&smiles=' 
                  + smiles + '">2D</a>]';
              }
                        
              bodyText = bodyText.substr(i + searchTerm.length);
              lcBodyText = bodyText.toLowerCase();
              i = -1;
            }
          }
        }
      }
      return newText;
    } else {
      highlights = document.getElementsByName("chemterm");
      for (var i = 0; i < highlights.length; i++) {
        if (highlights[i].firstChild.data.toLowerCase() != searchTerm.toLowerCase()) {
          highlights[i].style.backgroundColor = "rgb(255,255,0)";
        } else {
          highlights[i].style.backgroundColor = "rgb(0,255,0)";
        }
      }
      return "";
    }
}

/*
 * This is sort of a wrapper function to the doHighlight function.
 * It takes the searchText that you pass, optionally splits it into
 * separate words, and transforms the text on the current web page.
 * Only the "searchText" parameter is required; all other parameters
 * are optional and can be omitted.
 */
function highlightSearchTermsArray(searchArray, warnOnFailure, issmarts) {
  // if the treatAsPhrase parameter is true, then we should search for
  // the entire phrase that was entered; otherwise, we will split the
  // search string so that each word is searched for and highlighted
  // individually
    if (!document.body || typeof (document.body.innerHTML) == "undefined") {
        if (warnOnFailure) {
            alert("Sorry, for some reason the text of this page is unavailable. Searching will not work.");
        }
        return false;
    }
    var bodyText = document.body.innerHTML;
    for (var i = 0; i < searchArray.length; i++) {
        bodyText = doHighlight(bodyText, searchArray[i], issmarts);
    }
    if (issmarts == undefined) {
        document.body.innerHTML = bodyText;
    }
    return true;
}

/*
 * This is sort of a wrapper function to the doHighlight function.
 * It takes the searchText that you pass, optionally splits it into
 * separate words, and transforms the text on the current web page.
 * Only the "searchText" parameter is required; all other parameters
 * are optional and can be omitted.
 */
function highlightSearchTerms(searchText, treatAsPhrase, warnOnFailure) {
  // if the treatAsPhrase parameter is true, then we should search for
  // the entire phrase that was entered; otherwise, we will split the
  // search string so that each word is searched for and highlighted
  // individually
    if (treatAsPhrase) {
        searchArray = [searchText];
    } else {
        searchArray = searchText.split(" ");
    }
    if (!document.body || typeof (document.body.innerHTML) == "undefined") {
        if (warnOnFailure) {
            alert("Sorry, for some reason the text of this page is unavailable. Searching will not work.");
        }
        return false;
    }
    var bodyText = document.body.innerHTML;
    for (var i = 0; i < searchArray.length; i++) {
        bodyText = doHighlight(bodyText, searchArray[i]);
    }
    document.body.innerHTML = bodyText;
    return true;
}
