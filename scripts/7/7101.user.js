// Find an NCBI GenBank full human mtDNA sequence on the complete human mitochondrial tree
// 2007-05-21
// Copyright (c) 2007, Ted Kandell ted underscore kandell at yahoo dot com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// http://www.flickr.com/photos/Archaeogenetics
// ----------------------------------------------------------------------------
//
// This is a Greasemonkey user script. To install it, 
// you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Find a Genbank mtDNA sequence on the full human mitochondrial tree", and click Uninstall.
//

// ----------------------------------------------------------------------------
// ==UserScript==
// @name          Find an NCBI GenBank mtDNA full sequence on the complete human mitochondrial tree
// @namespace     http://www.flickr.com/photos/Archaeogenetics
// @description   Create a human mitochondrial DNA phylogenetic tree from an NCBI GenBank mtDNA full sequence, with a green line from the root of the tree pointing to its position. 
// @include       http://www.ncbi.nlm.nih.gov/entrez/*db=*ucleotide*
// @include       http://www.ncbi.nlm.nih.gov/entrez/*db=*uccore*
// @include       http://www.ncbi.nlm.nih.gov/entrez/viewer.fcgi?val=*
// @include       http://www.ncbi.nlm.nih.gov/blast/treeview/blast_tree_view.cgi?request=page&rid=*&dbname=nr&*
// ==/UserScript==

// The current version to compare with the latest version of this script
var version = 0.94;
var source = "http://userscripts.org/scripts/source/7101.user.js";
// Remember, everything here runs in the Greasemonkey "sandbox"
// so these are not actually global variables, but they are private 
// and so are the functions (methods). Once Greasemonkey exits,
// nothing here is available to the window. Conversely, no external 
// scripts are available to Greasemonkey, even if a SCRIPT tag is 
// dynamically added, except if eval() is run the string containing 
// the Javascript code, retrieved by GM_xmlhttpRequest().
// You can think of this entire script as being an instance of 
// the "Greasemonkey" class, which indeed it is.

var baseUrl = "http://members.cox.net/tkandell/mtDNA/roots/";
var accession;
var entrezQuery;
var limit;
var RID;
var seconds;
var intervalID;
var treeWindow;
var callback;
var treeUrl;
var retry;
var close;
var error;

function getPre()
{
   return document.evaluate("//pre[@class='genbank']", document, null,
                            XPathResult.FIRST_ORDERED_NODE_TYPE, 
                            null).singleNodeValue;
}

function getAccession(pre)
{
   var sequence;

   if (pre != null)
   {
      sequence = pre.firstChild.nodeValue;
   }
   else
   {
      return null;
   }

   // This will include both humans and neanderthals
   if (sequence.search(/SOURCE[ ]+mitochondrion Homo sapiens/) > 0)
   {
      var matches = sequence.match(/165[5-8]\d bp/);
      if (!matches)
      {
         return null;
      }
     
      var bp = parseInt(matches[0].substr(0,5));

      if (bp < 16556 || bp > 16587)
      {
         return null;
      }
      
      var accession = sequence.match(/ACCESSION\s+\w+/);
      if (!accession)
      {
         return null;
      }

      accession = accession[0].split(/\s+/)[1];

      return accession;
   }

   return null;
}

// A hack to for HTML 4.0 that is non-valid XHTML: 
// the XMLHttpRequest.responseXML is null  so we have to create an 
// "html" HTMLElement, set the innerHTML property to the responseText,
// and then add the element to a new XML document. This allows us to parse 
// the response with an XPath query. Even if the document mime type is forced
// to be  returned as "text/xml" using XMLHttpRequest.overrideMimeType(), 
// if the HTML is not valid XML(XHTML) then the XML Document returned in 
// XMLHttpRequest.responseXML will have one node, 
// with a node name of "parsererror".

function getDocument(responseText)
{
   var html = document.createElement("html");
   html.innerHTML = responseText;

   var response = document.implementation.createDocument("", "", null);                    
   response.appendChild(html);

   return response;
}
 

function checkWindowOpen()
{
   if (!treeWindow)
   {
      window.clearInterval(intervalID);

      setActionMessage(
        "Firefox prevented this site<BR/>from opening a new window:");
      onError("Please allow popups for<BR/><U>www.ncbi.nlm.nih.gov</U>");
      document.getElementById("close").addEventListener("click", 
                               function(event)
                               {
                                  getTreeWithPathToAccession();
                               }, 
                               true); 
   }
   else if (treeWindow.document != null &&
            treeWindow.document.getElementById("imgTree") != null)
   {
      window.clearInterval(intervalID);
      enableBlast(true);
      showProgressBox(false);
      treeUrl = null;
   }
}

function getTreeUrl(target)
{
   if (treeUrl != null && treeUrl.length > 0)
   {
      return treeUrl;
   }

   // treeUrl is uninitialized
 
   var response = getDocument(target.responseText);
   
   var node;

   node = response.evaluate("//input[@name='queryID']/@value", 
                            response, null, 
                            XPathResult.FIRST_ORDERED_NODE_TYPE, 
                            null).singleNodeValue;
   var queryID = node ? node.nodeValue : "";

   node = response.evaluate('//area[starts-with(@title,"gb|' + 
                            accession + '")]/@href',
                            response, null,
                            XPathResult.FIRST_ORDERED_NODE_TYPE, 
                            null).singleNodeValue;
   var mouseHit = node ? node.nodeValue.match(/\d+/) : "";

   node = response.evaluate("//input[@name='tree_nc_id']/@value", 
                            response, null, 
                            XPathResult.FIRST_ORDERED_NODE_TYPE, 
                            null).singleNodeValue;
   var treeNetCacheID = node ? node.nodeValue : "";
   
   node = response.evaluate("//input[@name='seqaln_nc_id']/@value", 
                            response, null, 
                            XPathResult.FIRST_ORDERED_NODE_TYPE, 
                            null).singleNodeValue; 
   var alignmentNetCacheID = node ? node.nodeValue : "";

   if (!queryID || !treeNetCacheID || !alignmentNetCacheID)
   {
      return null;
   }
 
   if (!mouseHit)
   {
     mouseHit = "-2";
   }

   treeUrl = 
          "http://www.ncbi.nlm.nih.gov/blast/treeview/blast_tree_view.cgi?" +
          "request=page" + 
          "&rid=" + RID  + 
          "&dbname=nr"   + 
          "&hit_id=" + mouseHit +
          "&inpParamName=rid" +
          "&inpParamVal=" + RID + 
          "&subTreeNodeID=-2" +
          "&renderer=rectangle" +
          "&distmode=on" +
          "&labelType=Sequence+ID" +
          "&treeMethod=Fast+Minimum+Evolution" + 
          "&tree_nc_id=" + treeNetCacheID +
          "&seqaln_nc_id=" +  alignmentNetCacheID +
          "&maxPercentDif=0.75" +
          "&screenHeight=" + screen.height +
          "&screenWidth=" + screen.width +
          "&loadBioSeq=" +    
          "&seqType=Nucleotide" +
          "&queryID=" + queryID +
          "&queryAccession=" + accession +
          "&dispAlignsID=-2" +
          "&recalcLabels=" +
          "&m_recalcTree=";

   return treeUrl;
}

var attempt = 0;

function getTreeWithPathToAccession(target)
{
   treeUrl = getTreeUrl(target);

   if (treeUrl)
   {
      treeWindow = window.open(treeUrl);
      intervalID = window.setInterval(checkWindowOpen, 2500);
   }
   else
   {
      onError("Server error: incomplete page.");
   }
}

function setActionMessage(msg)
{
   document.getElementById("action").innerHTML = msg;
}

function setStatusMessage(msg)
{
   document.getElementById("status").innerHTML = msg;
}
  
function createErrorIcon()
{
   // prefetch error icon and save it globally
   error = document.createElement("img");
   error.id = "error";
   error.src = baseUrl + "error.gif";
   error.style.opacity = "1";
   error.style.position = "relative";
   error.style.left = "-302px";
   error.style.bottom = "45%";
   error.style.padding = "10px";
   error.style.visibility = "hidden";
}

function createCloseBox()
{
   // prefetch close box and save it globally
   close = document.createElement("img");
   close.id = "close";
   close.src = baseUrl + "close.gif";
   close.style.position = "relative";
   close.style.right = "-209px";
   close.style.top   = "-20px";
   close.style.opacity = "1";
}

function showProgressBox(b)
{
   var progress = document.getElementById("progressBox");

   if (!b)
   {
      progress.style.visibility = "hidden";
      var error = document.getElementById("error");
      var close = document.getElementById("close");

      if (error)
      {
         error.style.visibility = "hidden";
      }

      if (close)
      {
         close.style.visibility = "hidden";
      }
   }
   else
   {
      progress.style.visibility = "visible";
   }
}

function showCloseBox(b)
{
   if (b)
   {
      document.getElementById("close").style.visibility = "visible"; 
   }
   else
   {
      document.getElementById("close").style.visibility = "hidden"; 
   }
   
}

function showErrorIcon(b)
{
   if (b)
   {
      document.getElementById("error").style.visibility = "visible";
   }
   else
   {
      document.getElementById("error").style.visibility = "hidden";
   } 
}

function onError(target)
{
   if (!error || !close)
   {
      removeProgressBox();
      createErrorIcon();
      createCloseBox();
      createProgressBox();
   }

   document.getElementById("progressBar").style.visibility = "hidden"; 
   document.getElementById("progressBar").alt = ""; 

   showProgressBox(true);

   if (typeof target == "string" ||
       target instanceof String)
   {
      setStatusMessage(target);

      // more than one line
      if (target.match(/<BR\\>/i))
      {
         document.getElementById("error").style.bottom = "50%";
         document.getElementById("progressBox").style.height = "180px";
      }
   }
   else if (typeof target.status != "undefined" ||
            typeof target.target != "undefined")
   {
      // we get an event from the XMLHttpRequest.onerror callback 
      // with the XMLHttpRequest as the target attribute
      if (typeof target.target != "undefined")
      {
         target = target.target;
      }

      document.getElementById("progressBox").style.height = "140px";
      setStatusMessage("Error: " + target.status + " - " + target.statusText);
      document.getElementById("error").style.bottom = "45%";
   }    
   
   document.getElementById("error").style.visibility = "visible";
   document.getElementById("close").style.visibility = "visible"; 
   showProgressBox(true);
}   
 
function createProgressBox()
{
   if (document.getElementById("progressBox") instanceof Element)
   {
      return;
   }

   var body = document.getElementsByTagName('body')[0];

   var div = document.createElement('div');
   div.id = "progressBox";
   div.classname = "progressBox";
   div.style.position = "absolute";
   div.style.top='50%';
   div.style.left='50%';

   // prefetched and stored globally or not
   if (error)
   {
      div.style.width='400px';
      div.style.height='140px';
   }
   else
   {
      div.style.width = '300px';
      div.style.height = '90px';
   }
   div.style.margin = "-50px 0 0 -170px";
   div.style.border = "3px double black";
   div.style.padding = "20px";
   div.style.opacity = "0.85";
   div.style.zIndex='30';
   div.style.textAlign = "center";
   div.style.backgroundColor ='yellow';  
   div.border = 10;
   div.style.visibility = "hidden";

   // Directly setting the onclick property to a function doesnt work in 
   // the Greasemonkey sandbox because the context no longer exists when the 
   // callback executes. The proper way to do this is to call:
   // element.addEventListener("click", function_name, true);

   // prefetched and stored globally or not
   if (close)
   {
      close.addEventListener("click", function() 
                                      {
                                         showProgressBox(false);
                                         enableBlast(true);
                                      }, false);
      close.style.visibility = "visible";
      div.appendChild(close);
   }


   var msg = document.createElement("div");
   msg.style.top = "-10px";   
   msg.style.right = "-20px";

   var gap = document.createElement("div");
   gap.id = "gap";
   gap.style.height = "10px";
   msg.appendChild(gap);

   var action = document.createElement("span");
   action.id  = "action";
   action.innerHTML = "&nbsp;";
   msg.appendChild(action);
 
   msg.appendChild(document.createElement("br"));
   
   var status = document.createElement("span");
   status.id  = "status";
   status.innerHTML = "&nbsp;";
   msg.appendChild(status);
 
   div.appendChild(msg);
   
   var progressBar = document.createElement("img");
   progressBar.id = "progressBar";
   progressBar.style.opacity = "1";
   progressBar.style.position = "relative";

   if (error)
   {
      progressBar.style.right = "-33px";
      progressBar.style.top = "-37px";
   }
   else
   {
      div.appendChild(gap);
   }

   div.appendChild(progressBar);
   progressBar.alt = "Error: No network connection.";
   progressBar.src = baseUrl + "progress.gif";
   
   if (error)
   {
      error.style.visibility = "hidden";
      div.appendChild(error);
   }

   body.appendChild(div);
}


function getTree()
{
   // we may have re-entered, so only set the callback in case of status 500
   callback = null;
   setActionMessage("Calculating distance tree:");
   showCloseBox(false);
   var request = new XMLHttpRequest();

   request.open('GET', "http://www.ncbi.nlm.nih.gov/blast/treeview/blast_tree_view.cgi?request=page&dbname=nr&distmode=on&labelType=Sequence+ID&rid=" + RID);

   request.setRequestHeader('User-agent', 
                            'Mozilla/5.0 (compatible) Greasemonkey');

   request.onreadystatechange = 
           function()
           {
              if (!request)
              {
                 window.clearInterval(intervalID);
                 onError("Error: Lost network connection.");
              }

              if (request.readyState == 4)
              {
                  switch (request.status) 
                  {
                  case 200:
                     window.clearInterval(intervalID);
                     retry = 0;

                     // Somehow, an plain text page listing an Error 500 
                     // has a status of 200 and has content-type "text/html"
                     
                     var errorMessage = request.responseText.match(/ERROR:.*/i);        
                     if (errorMessage && errorMessage.length > 0)
                     {
                        onError(errorMessage[0]);
                     }
                     else
                     {
                        callback = null;
                        window.setTimeout(
                        function()
                        {
                           getTreeWithPathToAccession(request);
                        }, 0);
                     }
                     break;
                  case 500:
                     window.clearInterval(intervalID);
                     setStatusMessage("(Resending request)");

                     if (!retry)
                     {
                        retry = 5;
                        seconds = retry;
                     }
                     else if (retry < 60)
                     {
                        retry += 1;
                        seconds = retry;
                     }

                     callback = getTree;
                     intervalID = window.setInterval(countdown, 1000);
                     break;
                  default:
                     window.clearInterval(intervalID);
                     onError(request);
                  }
              }
           };

   if (!callback)
   {
      seconds = 180;
   }
   intervalID = window.setInterval(countdown, 1000);
   request.send(null);
}

function countdown()
{
   seconds--;

   if (seconds > 0)
   {  
      var secs = "0" + (seconds % 60);

      setStatusMessage("(This will take about " + 
                       (Math.floor(seconds / 60)) + ":" + 
                        secs.substring(secs.length -2) + 
                       " to complete)");
   }
   else
   {
      window.clearInterval(intervalID);

      setStatusMessage("(Please wait a few more seconds)");

      if (callback != null)
      {
         callback();
      }
   }
}

function getRID(target)
{
   var response = getDocument(target.responseText);

   RID = response.evaluate("//input[@name='RID']/@value", 
                           response, null, 
                           XPathResult.FIRST_ORDERED_NODE_TYPE, 
                           null).singleNodeValue.nodeValue;

   var estimatedReady = target.responseText.match(/ready in [0-9]+/);
   seconds = parseInt(estimatedReady.toString().substring(9));

   seconds += 12;

   retry = 0;
   callback = getTree;
   intervalID = window.setInterval(countdown, 1000);      
}

function removeProgressBox()
{
   var progressBox = document.getElementById('progressBox');
   var error = document.getElementById("error");
   var close = document.getElementById("close");
   
   if (error && error.parentNode)
   {
      error.parentNode.removeChild(error);
   }
      
   if (close && close.ParentNode)
   {
      close.parentNode.removeChild(close);
   }

   if (progressBox && progressBox.parentNode)
   {
      progressBox.parentNode.removeChild(progressBox);
   }
}

function submitBlastQuery(ancestralSequence)
{
// This query contains the hypothetical common ancestral human mitochondrial 
// full sequence. This was derived by retrieving sequences from GenBank from 
// the most basal mtDNA haplogroups, L0d, L0k, L0f, L0a, L1b, L5, and L3e, 
// selecting sequences which were least distant from the root, then aligning 
// them with the existing partial Neanderthal control-region sequences, and 
// the two common chimpanzee (Pan troglodytes) and two bonobo (Pan paniscus) 
// full sequences in GenBank. A consensus was derived by seeing which sites 
// among these basal human haplotypes were the same as *any* among the 
// chimpanzees and bonobos.
// This sequence of course is an approximation, but it is good enough to serve 
// as the query to generate a *balanced* human mtDNA tree.

var query=
"ALIGNMENTS=0&ALIGNMENT_VIEW=FlatQueryAnchored&AUTO_FORMAT=Off&CLIENT=web&CMD=Put&DATABASE=nr&EXPECT=0.01&FORMAT_BLOCK_ON_RESPAGE=None&FORMAT_ENTREZ_QUERY=All+organisms&FORMAT_OBJECT=Alignment&FORMAT_TYPE=Text&LAYOUT=OneWindow&MASK_CHAR=2&MASK_COLOR=1&MEGABLAST=on&NUM_OVERVIEW=0&PAGE=MegaBlast&PERC_IDENT=None%2C+1%2C-2&PROGRAM=blastn&FILTER=&REPEATS=repeat_9606&SERVICE=plain&SET_DEFAULTS=no&SHOW_LINKOUT=&USER_TYPE=2&WORD_SIZE=64&DBTYPE=hc&DESCRIPTIONS=0"
+ "&ENTREZ_QUERY=" + entrezQuery
+ "&HITLIST_SIZE=" + limit
+ "&QUERY=%3EHomo+sapiens+ancestral+mitochondrion%2C+complete+genome%0A";

   // Native Javascript XMMHttpRequest version to send the request.
   // Unlike GM_xmlhttpRequest() XMLHttpRequest is limited to the same domain 
   // as the current page.
   // The single callback function takes no parameters, but must get the status and response
   // out of the request object stored in a global variable.

   var request = new XMLHttpRequest();
   request.onreadystatechange = 
           function()
           {
              if (request.readyState == 4)
              {
                 if (request && request.status == 200) 
                 {
                    // Check if this is an error page
                     
                    var errorMessage = request.responseText.match(/ERROR:.*/i);        
                    if (errorMessage && errorMessage.length > 0)
                    {
                       onError(errorMessage[0]);
                    }
                    else
                    { 
                       getRID(request);
                    }
                 }
                 else 
                 {
                    onError(request);
                 }
              }
           };
   request.open('POST', 'http://www.ncbi.nlm.nih.gov/blast/Blast.cgi');
   request.setRequestHeader('Content-type', 
                            'application/x-www-form-urlencoded');
   request.setRequestHeader('User-agent', 
                            'Mozilla/5.0 (compatible) Greasemonkey');
   request.setRequestHeader("Content-length", query.length + 
                                              ancestralSequence.length);
   request.setRequestHeader("Connection", "close");
   setActionMessage("Submitting BLAST query:");
   setStatusMessage("(Waiting for response)");

   request.send(query + ancestralSequence);
}

function getAncestralSequence()
{
   setActionMessage("Getting ancestral human mtDNA haplotype:");
   setStatusMessage("(Sending request)");
   
   GM_xmlhttpRequest({
       method: 'GET',
       url: baseUrl + "mtMRCA.fas",
       headers: {
           'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'
       },
       onerror: onError,
       onload: function(response)
               {
                  if (response.readyState == 4)
                  {
                     if (response && response.status == 200) 
                     {
                        var ancestralSequence = 
                        response.responseText.replace(/^.*$/m, "");
                        ancestralSequence = 
                        ancestralSequence.replace(/$/mg, "");
                        ancestralSequence = 
                        ancestralSequence.replace(/[\s\-]+/g, "");
                                               
                        submitBlastQuery(ancestralSequence);
                                         
                     }
                     else 
                     {
                        onError(response);
                     }
                  }
               }
   });
}

function getLimit()
{
   setActionMessage("Getting maximum number of sequences:");
   setStatusMessage("(Sending request)");
   showCloseBox(true);

   GM_xmlhttpRequest({
      method: 'GET',
      url: baseUrl + "limit.txt",
      headers: {
           'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'
      },
      onerror: onError,
      onload: function(response)
              {
                 if (response.readyState == 4)
                 {
                    if (response && response.status == 200) 
                    {
                       limit = escape(response.responseText); 
                       getAncestralSequence();
                    }
                    else 
                    {
                       onError(response);
                    }
                 }
              }
   });
}

function getEntrezQuery()
{
   setActionMessage("Getting query for all sequences:");
   setStatusMessage("(Sending request)");
   showCloseBox(true);

   GM_xmlhttpRequest({
      method: 'GET',
      url: baseUrl + "query.txt",
      headers: {
           'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'
      },
      onerror: onError,
      onload: function(response)
              {
                 if (response.readyState == 4)
                 {
                    if (response && response.status == 200) 
                    {
                       entrezQuery = escape(response.responseText); 
                       getLimit();
                    }
                    else 
                    {
                       onError(response);
                    }
                 }
              }
   });
}

function reinstallScript()
{
   try
   {
      window.location = source;
   }
   catch (e) {};
   enableBlast(false);
   document.getElementById("close").addEventListener("click", 
                                    function(event)
                                    {
                                       window.location.reload();
                                    }, false);
}

function updateScript()
{
   setActionMessage("A new version of this script was found:");
   onError("Please update this script<BR/>&nbsp;&nbsp;&nbsp;by selecting install in the popup.");
   window.setTimeout(reinstallScript, 3000);
}

function getVersion(sourceText)
{
   return sourceText.
          match(/version[ ]*=[ ]*\d*\.?\d*/i)[0].match(/\d*\.\d*/);
}

function checkVersion()
{
   removeProgressBox();
   createProgressBox();

   document.getElementById("close").addEventListener("click", 
            function() 
            {
               showProgressBox(false);
            }, false);

   setActionMessage("Checking for script update:");
   setStatusMessage("(version " + version.toFixed(2) + ")");
   enableBlast(false);
   showProgressBox(true);

   GM_xmlhttpRequest({
      method: 'GET',
      url: source,
      headers: {
           'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'
      },
      onerror: onError,
      onload: function(response)
              {
                 if (response.readyState == 4)
                 {
                    if (response && response.status == 200) 
                    {
                       var latestVersion = getVersion(response.responseText);

                       if (parseFloat(latestVersion) > version)
                       {
                          updateScript(source);         
                       }
                       else
                       {
                          getEntrezQuery();
                       }
                    }
                    else 
                    {
                       // http://userscripts.org being down 
                       // doesnt stop execution
                       onError(response);
                       setTimeout(
                          function()
                          {                                    
                             showErrorIcon(false);
                             setStatusMessage("(check failed - continuing)");
                             window.setTimeout(getEntrezQuery, 1000);
                          }, 1000);
                    }
                 }
              }
   });
}

function enableBlast(flag)
{
   if (flag)
   {
      document.getElementById("blast").addEventListener("click", 
                                                        checkVersion, false);
   }
   else
   {
      document.getElementById("blast").removeEventListener("click", 
                                                           checkVersion, false);
   }
}

function insertButton(pre)
{
   var label = document.createElement("div");
   label.id = "blastQuery";
   label.setAttribute("style", "font-size:16pt;background-color:CCFFFF;");
   label.innerHTML = "Create a distance tree of all complete human mitochondrial sequences and display the position of this sequence on the tree:<BR/>";

   var blast = document.createElement("input");
   blast.id = "blast";
   blast.type   = "image";
   blast.src    = "http://www.ncbi.nlm.nih.gov/blast/html/blast_but.gif";
   blast.alt    = "Generate a tree of all complete human mitochondrial sequences and show the position of this haplotype on the tree.";
   blast.style.borderColor = "#CCFFFF";
   blast.style.borderStyle = "solid";
   blast.style.borderWidth = "5";
   blast.style.verticalAlign = "bottom";
   blast.addEventListener("click", checkVersion, false);
   label.appendChild(blast);

   node = pre.parentNode.parentNode;
   node.parentNode.insertBefore(label, node);

   // prefetch these images in case the network connection goes down
   createErrorIcon();
   createCloseBox();
}

function createQuery()
{
   var pre = getPre();
   accession = getAccession(pre);

   if (!accession)
   {
      return;
   }

   insertButton(pre);
}

function alterPage()
{
   document.title = "mtDNA Tree View";

   // remove everything we dont want to see

   var colorMap = document.getElementById("divBlastColorMap");

   if (colorMap)
   {
      colorMap.style.display = "none";
   }
   
   var hideColorMap = document.getElementById("hideColorMap");
   
   if (hideColorMap)
   {
      hideColorMap.style.display = "none";
   }

   document.getElementsByTagName("h1")[0].style.display = "none";

   var disclaimer = document.evaluate("//div[@class='disclaimer']",
                                      document, null,
                                      XPathResult.FIRST_ORDERED_NODE_TYPE, 
                                      null).singleNodeValue;

   disclaimer.style.display = "none";

   var mainsection = document.evaluate("//table[@class='mainsection']",
                                       document, null,
                                       XPathResult.FIRST_ORDERED_NODE_TYPE, 
                                       null).singleNodeValue;

   mainsection.style.display = "none";

   document.getElementById("treeHelp").style.display = "none";

   var distMode = document.getElementById("distMode");
   distMode.childNodes[1].style.visibility = "hidden";
   distMode.childNodes[3].firstChild.nodeValue = 
   "Branch lengths are proportional to the genetic distance.";

   document.getElementsByTagName("hr")[0].style.display = "none";

   // create the new layout:
   // this is a table which allows the haplotype data table on the right
   // to resize horizontally but not vertically

   var forceScreenWidth = document.createElement("table");
   forceScreenWidth.rules = "none";
   forceScreenWidth.style.align = "left";
   forceScreenWidth.style.borderWidth = "0";
   forceScreenWidth.style.marginWidth = "0";
   forceScreenWidth.style.cellPadding = "0";
   forceScreenWidth.style.cellSpacing = "0";
   forceScreenWidth.style.height = "" + ((screen.height * 0.65) - 3) + "px";
   forceScreenWidth.style.maxHeight = "" + ((screen.height * 0.65) - 3) + "px";
   forceScreenWidth.style.width = "1024px";
   forceScreenWidth.style.display = "none";

   var imageArea = document.getElementById("imageArea");
   imageArea.parentNode.style.width = "auto";

   var row;
   var cell;

   row = forceScreenWidth.insertRow(-1);

   var heading = row.insertCell(-1);
   heading.colSpan = 2;
   var queryID = document.evaluate("//input[@name='queryAccession']/@value", 
                                   document, null, 
                                   XPathResult.FIRST_ORDERED_NODE_TYPE, 
                                   null).singleNodeValue.nodeValue;

   heading.innerHTML = "Tree view for <span style='color: yellow'>" +
                      queryID + "</span>";

   heading.className = "header";
   heading.style.color = "white";
   heading.style.backgroundColor = "#336699";
   heading.style.textAlign = "center";
   heading.style.borderWidth = "0px";
   heading.style.padding = "0.25em";
   heading.style.margin = "0";
   heading.style.fontFamily = "Verdana,Helvetia,Sans-Serif";
   heading.style.fontWeight = "bold";
   heading.style.fontSize = "100%";

   cell = row.insertCell(-1);
   cell.style.width = "auto";

   row = forceScreenWidth.insertRow(-1);

   var help = row.insertCell(-1);
   help.colSpan = 2;
   help.style.borderWidth = "3";
   help.style.borderColor = "black";
   help.style.borderStyle = "groove";
   help.style.backgroundColor = "FFFFCC";
   help.style.textAlign = "center";
   help.style.paddingLeft = "5px";
   help.style.paddingRight = "5px";

   var explanation = 
"Follow the green line to the haplotype, or click on any branching point using the cross-hairs to zoom in on a particular part of the tree. Mouse over the end of a branch to see the haplotype details and compare it with others.";
   help.appendChild(document.createTextNode(explanation));

   cell = row.insertCell(-1);

   row = forceScreenWidth.insertRow(-1);
   cell = row.insertCell(-1);
   cell.colSpan = 2;
   cell.style.verticalAlign = "top";
   cell.appendChild(document.createElement("hr"));

   row = forceScreenWidth.insertRow(-1);
   row.style.width = "auto";
   cell = row.insertCell(-1);
   cell.style.verticalAlign = "top";
   cell.appendChild(document.getElementById("divTabButtons"));

   cell = row.insertCell(-1);
   var statusMessage = document.createElement("span");
   statusMessage.id = "statusMessage";
   statusMessage.className = "hlp";
   statusMessage.style.paddingLeft = "7px";
   statusMessage.style.paddingRight = "7px";
   statusMessage.style.textAlign = "left";
   statusMessage.appendChild(document.createTextNode(""));
   cell.appendChild(statusMessage);
   
   row = forceScreenWidth.insertRow(-1);
   row.style.height = "" + ((screen.height * 0.65) - 3) + "px";
   row.style.maxHeight = "" + ((screen.height * 0.65) - 3) + "px";
   row.style.width = "auto";
   cell = row.insertCell(-1);

   var dataTable = 
       document.getElementById("imageArea").parentNode.
                                            parentNode.parentNode.parentNode;
   cell.style.verticalAlign = "top";
   cell.appendChild(dataTable);

   // this is the element in which snps.js places the haplotype table
   cell = row.insertCell(-1);
   cell.id = "data";

   var body = document.getElementsByTagName("body")[0];
   body.insertBefore(forceScreenWidth, body.firstChild);
   body.style.width = "auto";

   forceScreenWidth.style.display = "table";

   var haplotypeCount = 
       document.evaluate("count(//area[@title])", 
                         document, null, 
                         XPathResult.NUMBER_TYPE, null).numberValue;

   statusMessage.firstChild.nodeValue = "" + haplotypeCount + " haplotypes"; 
}

function addScripts()
{
   var head = document.getElementsByTagName("head")[0];
   var script;
  
   script = document.createElement("script");
   script.type = "text/javascript";
   script.src = baseUrl + "snps.js";
   head.appendChild(script);

   script = document.createElement("script");
   script.type = "text/javascript";
   script.src = baseUrl + "crs.js";
   head.appendChild(script);

   script = document.createElement("script");
   script.type = "text/javascript";
   script.src = baseUrl + "haplotypes.js";
   head.appendChild(script);
}

function addStylesheet()
{
   var stylesheet = document.createElement("link");
   stylesheet.rel = "stylesheet";
   stylesheet.type = "text/css";
   stylesheet.href = baseUrl + "snps.css";
   document.getElementsByTagName('head')[0].appendChild(stylesheet);
}

function getWindowType()
{
   if (window.location.pathname.match(/\/blast\/treeview/))
   {
      var imgTree = document.getElementById("imgTree");
    
      // test to see if this is an actual Blast TreeView page
      // or a server error page or an incomplete page
      // and if the haplotypes are labelled by sequence ID

      if (imgTree && 
          document.forms[0].elements.namedItem('labelType').value == 
                                                           "Sequence ID")
      { 
         window.setTimeout(function()
                          {
                             addScripts();
                             addStylesheet();
                             alterPage();
                          }, 0);
      }
   }
   else
   {
      createQuery();
   }
}

window.addEventListener("load", getWindowType, false);

