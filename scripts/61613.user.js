// ==UserScript==
// @name           Inline reference adder
// @namespace      en.wikipedia.org/wiki/WP:Ref++
// @include        http://*wikipedia.org/w/index.php?*action=edit*
// @include        http://*wikipedia.org/w/index.php?*action=submit*
// @version        beta0.1:  Support PMID search & direct DOI insertion
// ==/UserScript==

// Define some URLs
baseUrlP = "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&tool=refplusplus&usehistory=y&term=";
baseUrlPsum = "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&tool=refplusplus&retmax=8";
baseUrlCrossRef = "http://www.crossref.org/openurl/?noredirect=true&pid=refplusplus@geological-supplies.com&format=unixref&id=doi:";

function onType(e) {
  var replacement = null;
  oThis = this;
  matchSeq = /\[\[(p|\[)(.*?)\]\]\]/i;
  switch (e.keyCode) {
    case 221: //Square bracket pressed.  Check for [[[ .... ] trigger sequence.
    if (this.value.match(matchSeq)) {
      var input = matchSeq.exec(this.value);
      oResults = document.getElementById("refplusplus_results");
      
      // If we have a DOI, look it up directly in CrossRef using OpenURL
      if (/10\.\d{4}\/.+/.test(input[2])) {
        var doi = input[2].match(/10\.\d{4}\/.+/);
        oResults.innerHTML = "Resolving DOI...";
        GM_xmlhttpRequest({
          method:"GET",
          url:baseUrlCrossRef + escape(doi[0]),
          headers:{
            "User-Agent":"monkeyagent",
            "Accept":"text/monkey,text/xml",
            },
          onload:function(details) {
            response = details.responseText;
            if (/not found in CrossRef/.test(response)) {
              oResults.innerHTML = "DOI <a href='http://dx.doi.org/" + doi[0] + "'>" + doi[0] + "</a> not found in CrossRef.";
              oThis.value = oThis.value.replace(input[0], "[[doi:" + doi[0] + "]]");
            } else if (/Malformed DOI/.test(response)) {
              oResults.innerHTML = "Malformed DOI: " + doi[0];
              oThis.value = oThis.value.replace(input[0], "[[doi:" + doi[0] + "]]");
            } else {
              var year = /<year>(\d+)<\/year>/.exec(response);
              var surname = /<surname>(.+)<\/surname>/.exec(response);
              oThis.value = oThis.value.replace(input[0], "<ref name=\"" + surname[1].match(/^\w+/) + year[1] + "\">{{cite doi|" + doi[0] + "}}</ref>");
              
              //Reset results
              oResults.innerHTML = helpMessage;
            }
          }
        });
        replacement = false;
      } else if (false){
        alert("SIGG: http://crossref.org/sigg/sigg/FindWorks?version=1&access=refplusplus@geological-supplies.com&format=unixref&op=OR&expression=allen+renear");
      } else {
        oResults.innerHTML = "Fetching results from PubMed...";
        // Perform PubMed search & retrieve a query key
        GM_xmlhttpRequest({
          method:"GET",
          url:baseUrlP + input[2],
          headers:{
            "User-Agent":"monkeyagent",
            "Accept":"text/monkey,text/xml",
            },
          onload:function(details) {
            response = details.responseText;
            // TODO: Parse the response as an XML string for better performance
            count = /<Count>(\d+)<\/Count>/.exec(response);
            oResults.innerHTML = "Found " + count[1] + " results...";
            queryKey=/<QueryKey>(.*)<\/QueryKey>/.exec(response);
            webEnv = /<WebEnv>(.*)<\/WebEnv>/.exec(response);
              var list = "";
              // Look up details of our PubMed search hits using the query key  we have just obtained            
              GM_xmlhttpRequest({
                method:"GET",
                url:baseUrlPsum + "&WebEnv=" + escape(webEnv[1]) + "&query_key=" + escape(queryKey[1]),// + "&retstart=" + retStart,
                //TODO: Allow user customisation of retStart by adding 'next page' options.
                headers:{
                  "User-Agent":"monkeyagent",
                  "Accept":"text/monkey,text/xml",
                  },
                onload:function(details2) {
                  response2 = details2.responseText;        

                  parser=new DOMParser();
                  stringer = new XMLSerializer();
                  docs = parser.parseFromString(response2,"text/xml");                
                  oDoc = docs.getElementsByTagName("DocSum");
                  for (i = 1; i <= oDoc.length; i++) {
                    author[i] = "";                  
                    var oNodes = oDoc[i - 1].childNodes;
                    for (j = 1; j < oNodes.length; j++) {
                      if (oNodes[j].tagName == "Id") {
                        pmid[i] = stringer.serializeToString(oNodes[j]).match(/\d+/);
                      } else {
                        var item = stringer.serializeToString(oNodes[j]);
                        if (item.match(/<Item Name="PubDate" Type="Date">(\d{4}).*<\/Item>/)) {
                          var parts = /<Item Name="PubDate" Type="Date">(\d{4}).*<\/Item>/.exec(item);
                          year[i] = parts[1];
                        } else if (item.match(/<Item Name="(\w+)" Type="String">(.*)<\/Item>/)) {
                          var parts = /<Item Name="(\w+)" Type="String">(.*)<\/Item>/.exec(item);
                          switch (parts[1]) {
                            case "Title":
                              title[i] = parts[2];
                            break;
                            case "Author":
                              if (author[i] == "") {
                                // only use first author
                                author[i] = parts[2];
                              }
                              else if (/et al\./.test(author[i]) == false) {
                                // TODO: + et al if >1 auth
                                author[i] += " et al.";
                              }
                            break;
                            case "Year":
                              title[i] = parts[2];
                              list += title[i];
                            break;
                          }
                        } 
                      }
                    }
                    list += "<li style='list-style-image:inherit'>" + author[i] + " (" + year[i] + ") <span style='font-size:smaller'>" + title[i] + "</span></li>";
                  }
                  // TODO: Parse the response as an XML string for better performance
                  /*
                  docRX = /<DocSum>[\s\S]<\/DocSum>/u;
                  for (i = 0, response2.find(docRX), i++) {
                    docSum = response2.match(docRX);
                    response2 = response2.replace(docRX, "");
                    
                  }
                  */        
                  
                  
                  /*
                  ids = response2.split("<Id>");
                  countIds = ids.length;
                  var list = "";
                  for (i = 1; i < countIds; i++) {
                    oId = ids[i].match(/^\d+/)
                    
                    list += "<li>" + oId + "</li>"; 
                  };*/
                  oResults.innerHTML += "<ol style='margin-left:1.6em; line-height:0.8em;'>" + list + "</ol> Type the number of the result to enter it.";
                }
              });
          }
        });
      }
      
      
      
          /*
          parser=new DOMParser();
          response=parser.parseFromString(details.responseText,"text/xml");
          matches = response.getElementsByTagName("Count")[0].length;
          oResults.innerHTML = matches + " results.";
          idList = response.getElementsByTagName("IdList")[0];
          //oResults.innerHTML = idList.firstChild().nodeValue + details.responseText.replace(/</g, "&lt;");*/
      
      /*
      GM_xmlhttpRequest({
        method:"GET",
        url:baseUrlP + input[2],
        headers:{
          "User-Agent":"monkeyagent",
          "Accept":"text/monkey,text/xml",
          }
        onload:function(details) {
          oResults.innerHTML = details.responseText;
        }
      });*/
      results.style.display = "visible";
    }
    replacement = false;
    break;
  }
 }



/* 
 * If the results window is open, insert the appropriate result, and cancel the action of the keyPRESS that called the function.
 */
function insertResult(e) {
  if (pmid[1]) {
    switch (e.which) {
      case 49: case 97: case 13: case 1: replacement = 1; break;
      case 50: case 98:  replacement = 2; break;
      case 51: case 99:  replacement = 3; break;
      case 52: case 100: replacement = 4; break;
      case 53: case 101: replacement = 5; break;
      case 54: case 102: replacement = 6; break;
      case 55: case 103: replacement = 7; break;
      case 56: case 104: replacement = 8; break;
      case 48: case 96: case 27: 
      //Hide results
      oResults.innerHTML = helpMessage;
      pmid = Array();
      if (this.value.match(matchSeq)) {
        var input = matchSeq.exec(this.value);
        this.value = this.value.replace(input[0], "[[" + input[2] + "]]");
      }
      break;
      default: replacement = null;
    }
    
    if (replacement) {
      if (this.value.match(matchSeq)) {
        var input = matchSeq.exec(this.value);
        this.value = this.value.replace(input[0], "<ref name=\"" + author[replacement].match(/^\w+/) + year[replacement] + "\">{{cite pmid|" + pmid[replacement] + "}}</ref>");
        
        //Reset results
        pmid = Array();
        oResults.innerHTML = helpMessage;
        
        // Don't let the key appear
        e.preventDefault();
        return false;
      }
    }
  }
}

var retStart = 1; // Starting position of search results.  TODO: allow user to modify.
            var pmid = new Array();
            var title = new Array();
            var journal = new Array();
            var volume = new Array();
            var issue = new Array();
            var pages = new Array();
            var doi = new Array();
            var year = new Array();
            var author = new Array();
            var helpMessage = "Type [[[Search term]]] into the article to search..."
var searchBox = document.getElementById("p-interaction");
if (document.getElementById("mw_portlets")) {
  var portlets = document.getElementById("mw_portlets");
} else if (document.getElementById("column-one")) {
  var portlets = document.getElementById("column-one");
}
var results = document.createElement("div");
results.className = "generated-sidebar portlet";
results.innerHTML = "<h5>Ref++ search BETA</h5><div id='refplusplus_results' class=pBody>" + helpMessage + "</div>";
portlets.insertBefore(results, searchBox);
document.getElementById("wpTextbox1").addEventListener ("keyup",onType,false);
document.getElementById("wpTextbox1").addEventListener ("keypress",insertResult,false);