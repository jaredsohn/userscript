// ==UserScript==
// @name          Patent helper
// @namespace     http://youngpup.net/userscripts
// @description	  Links from USPTO to EPO and vice versa and adds quick PDF links
// @include       http://patft.uspto.gov/netacgi/*
// @include       http://www.scopus.com/scopus/results/results.url*
// @include       http://v3.espacenet.com/*
// ==/UserScript==

// Patent helper was written by Johan Stigwall

// Release history

// 2006-03-20 First simple version with links between EPO and USPTO, and links to EPO PDFs. Also fetches USPTO titles for USPTO references and adds EPO-links for references
// 2006-03-21 Better EPO patent number retrieval (from URL instead of page), automatically hyperlinks patents in the EPO description and "also published as" on EPO.
// 2006-03-21b Hyperlinking of inventor names and applicants at EPO

GM_addStyle("a.pw_viewatepo { position: absolute; top: 7px; left: 10px; font-size: 12px; }");
GM_addStyle("a.pw_viewusptopdf { position: absolute; top: 20px; left: 10px;  font-size: 12px;}");

GM_addStyle("a.pw_epolink {font-size: 12px;}");

GM_addStyle("a.pw_viewepopdf { position: absolute; top: 20px; left: 10px; color: white; font-size: 12px;}");
GM_addStyle("a.pw_dlepopdf { position: absolute; top: 20px; left: 80px; color: white; font-size: 12px;}");
GM_addStyle("a.pw_viewatuspto { position: absolute; top: 7px; left: 10px; color: white; font-size: 12px;}");
GM_addStyle("a.pw_dlepopdfatuspto { position: absolute; top: 20px; left: 80px; font-size: 12px;}");


var thisurl = document.URL;

function getUSPTOurl(number) {   
   return "http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO1&Sect2=HITOFF&d=PALL&p=1&u=/netahtml/srchnum.htm&r=1&f=G&l=50&s1=" + number + ".WKU.&OS=PN/" + number + "&RS=PN/" + number;
}

function getEPOurl(number) {
   return "http://v3.espacenet.com/textdoc?DB=EPODOC&IDX=" + number;
}

function getPDFurl(number) {
   return "http://v3.espacenet.com/pdfdocnav?DB=EPODOC&IDX=" + number;
}
function getPDFDLurl(number) {
   return "http://v3.espacenet.com/captcha?DB=EPODOC&IDX=" + number + "&F=256&QPN=" + number + "&dest=/fullpdfdoc/null.pdf";
}
function getInventorSearchURL(name) {
   return "http://v3.espacenet.com/results?sf=a&FIRST=1&CY=ep&LG=en&DB=EPODOC&TI=&AB=&PN=&AP=&PR=&PD=&PA=&IN=%22" + escape(name) + "%22&EC=&IC=&=&=&=&=&=";
}
function getApplicantSearchURL(name) {
   return "http://v3.espacenet.com/results?sf=a&FIRST=1&CY=ep&LG=en&DB=EPODOC&TI=&AB=&PN=&AP=&PR=&PD=&PA=%22" + escape(name) + "%22&IN=&EC=&IC=&=&=&=&=&=";
}
function getUSPTOtitle(element,mxnumber) {
  var myurl = getUSPTOurl(mxnumber);
  var myreq = GM_xmlhttpRequest({
    method:"GET",
    url:myurl,
    headers:{
      "User-Agent":"Mozilla 1.5",
      "Accept":"text/html,text/xml",
      },
    onload:function(details) {
       // Get title of patent
       var text = details.responseText;    

       text = text.replace(/\s+/g,' ');
       text = text.replace(/\<b\>/g,'');
       text = text.replace(/\<\/b\>/g,'');

      if (!(text.match(/Full text is not available/))) {

         var myhits = text.match(/\<font\ size\=\"\+1\"\>([^\<]+)/);
         var mytitle= myhits[1];
         element.title = mytitle; 
      }
      else {
         element.title = "Title not available.";
      }
    }
  });

}


// Get title, which is in the form "United States Patent: 1,234,567" etc
var title = document.title;

var atepo = 0;
if (/cenet/.test(title)) {
 atepo = 1;  
}

// Take patent number as a substring.
var first = title.substring(0,21);

var atuspto = 0;
if (first == "United States Patent:") {
  atuspto = 1;
  var number = title.substring(22);
  number = number.replace(/\,/g,'');
}

// Only show link if we're at a patent page...
if (atuspto || atepo) {

   // Gather patent data
   var code = document.body.innerHTML;
   code = code.replace(/\s+/g,' ');
   code = code.replace(/\<b\>/g,'');
   code = code.replace(/\<\/b\>/g,'');
 
   var nofulltext = 1;   

   if (atepo) {
   // AT EPO's site
      hits = document.URL.match(/IDX\=([A-Z0-9]+)/);
      
      if (hits) {
         number = hits[1];
      } else {
         number = "";
      }    

      pdfurl = getPDFurl(number);


      if (number.substring(0,2) == "US") {

          usnumber = number.replace(/US/g,'');

          var a1 = document.createElement("a");
          a1.setAttribute("href", getUSPTOurl(usnumber));
          a1.appendChild(document.createTextNode("   [ view at USPTO ]"));
          a1.className = "pw_viewatuspto";

          document.body.appendChild(a1); 
      }

      if (number) {
      var a2 = document.createElement("a");
      a2.setAttribute("href", pdfurl);
      a2.appendChild(document.createTextNode("   [ view PDF ]"));
      a2.className = "pw_viewepopdf";
     
      document.body.appendChild(a2); 

      var a3 = document.createElement("a");
      a3.setAttribute("href", getPDFDLurl(number));
      a3.appendChild(document.createTextNode("   [ DL ]"));
      a3.className = "pw_dlepopdf";
     
      document.body.appendChild(a3); 
 }

   } else {
   // AT USPTO's site

      nofulltext = code.match(/Full text is not available/);

      var a1 = document.createElement("a");
      a1.setAttribute("href", getEPOurl("US" + number));
      a1.appendChild(document.createTextNode("   [ view at EPO ]"));
      a1.className = "pw_viewatepo";
     
      document.body.appendChild(a1); 

      pdfurl = getPDFurl("US" + number);

      var a2 = document.createElement("a");
      a2.setAttribute("href", pdfurl);
      a2.appendChild(document.createTextNode("   [ view PDF ]"));
      a2.className = "pw_viewusptopdf";
     
      document.body.appendChild(a2); 

      var a3 = document.createElement("a");
      a3.setAttribute("href", getPDFDLurl("US" + number));
      a3.appendChild(document.createTextNode("   [ DL ]"));
      a3.className = "pw_dlepopdfatuspto";
     
      document.body.appendChild(a3); 
     
   }  

}



// Look for links with just a number in their innerHTML, this is how referred patents are displayed at USPTO


if (atuspto) {
    var as = document.getElementsByTagName('a');
    for (var i = as.length - 1; i >= 0; i--) {
        var html = as[i].innerHTML;
        var xnumber = html.replace(/[^0-9]/g,"");
        // If nothing changed, it is a patent number
        if (html == xnumber && xnumber > 0) {

            cleannumber = xnumber.replace(/\,/g,'');
            EPOurl = getEPOurl("US" + cleannumber);

            var a1 = document.createElement("a");
            a1.setAttribute("href", EPOurl);
            a1.appendChild(document.createTextNode("   [ view at EPO ]"));
            a1.className = "pw_epolink";

            getUSPTOtitle(a1,xnumber);

            as[i].parentNode.insertBefore(a1, as[i].nextSibling);        
        }
    }
}

// Search for US patent numbers in EPO description lists (some patents have long lists of references there)
// Base stolen from linkify
// Added 21/3 2006

const urlRegex = /U\.S\. Pat\. No\. ([0-9\,]+)/ig;

// tags we will scan looking for un-hyperlinked urls
var allowedParents = [
    "abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote", "body", 
    "caption", "center", "cite", "code", "dd", "del", "div", "dfn", "dt", "em", 
    "fieldset", "font", "form", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe",
    "ins", "kdb", "li", "object", "pre", "p", "q", "samp", "small", "span", "strike", 
    "s", "strong", "sub", "sup", "td", "th", "tt", "u", "var", "nobr"
    ];

var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ") and " +
            "contains(translate(., 'Pat. No.', 'pat. no.'), 'pat. no.')]";

var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);



var t0 = new Date().getTime();
for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
    if (urlRegex.test(cand.nodeValue)) {
        var span = document.createElement("span");
        var source = cand.nodeValue;


        cand.parentNode.replaceChild(span, cand);

        urlRegex.lastIndex = 0;
        for (var match = null, lastLastIndex = 0; (match = urlRegex.exec(source)); ) {
            span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));

            var a = document.createElement("a");
            var number = "US" + match[1];
            number = number.replace(/\,/g,'');

            a.setAttribute("href", getEPOurl(number));
            a.appendChild(document.createTextNode(match[0]));
            span.appendChild(a);

            lastLastIndex = urlRegex.lastIndex;
        }

        span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
        span.normalize();
    }
}

// Hyperlink EP, US, WO, CA patent numbers, as written in "also published as"
// Base stolen from linkify
// Added 21/3 2006

const urlRegex2 = /([A-Z][A-Z][0-9][0-9][0-9][0-9]+([A-Z]|))/g;
const urlRegex3 = /EP ([0-9\, ]+)/g;

var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ")]";

var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var t0 = new Date().getTime();
for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {


    if (urlRegex2.test(cand.nodeValue)) {
        var span = document.createElement("span");
        var source = cand.nodeValue;

        cand.parentNode.replaceChild(span, cand);

        urlRegex2.lastIndex = 0;
        for (var match = null, lastLastIndex = 0; (match = urlRegex2.exec(source)); ) {
            span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));

            var a = document.createElement("a");
            var number = match[1];
            number = number.replace(/\,/g,'');

            a.setAttribute("href", getEPOurl(number));
            a.appendChild(document.createTextNode(match[0]));
            span.appendChild(a);

            lastLastIndex = urlRegex2.lastIndex;
        }

        span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
        span.normalize();
    }


    // This one test for references of the kind "EP 123,345,543" etc...
    if (urlRegex3.test(cand.nodeValue)) {
        var span = document.createElement("span");
        
        var source = cand.nodeValue;

     
        cand.parentNode.replaceChild(span, cand);

        urlRegex3.lastIndex = 0;
        for (var match = null, lastLastIndex = 0; (match = urlRegex3.exec(source)); ) {
            span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));


            var a = document.createElement("a");
            var number = match[0];
            number = number.replace(/\,/g,'');
            number = number.replace(/\s/g,'');

            a.setAttribute("href", getEPOurl(number));
            a.appendChild(document.createTextNode(match[0]));
            span.appendChild(a);

            lastLastIndex = urlRegex3.lastIndex;
        }

        span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
        span.normalize();
    }

   // This one find the author name and adds a search for it
/*
    if (inventorRegexp.test(cand.nodeValue)) {
        var span = document.createElement("span");
        //cand = cand.nextSibling;
        cand = cand.parentNode.parentNode.parentNode.lastChild.lastChild;

        var source = cand.nodeValue;

alert('Found one inventor' + source);

        

        cand.parentNode.replaceChild(span, cand);

        inventorRegexp.lastIndex = 0;
        for (var match = null, lastLastIndex = 0; (match = inventorRegexp.exec(source)); ) {
            span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));


            var a = document.createElement("a");
            var name = match[1];

            a.setAttribute("href", getInventorSearchURL(name));
            a.appendChild(document.createTextNode(match[0]));
            span.appendChild(a);

            lastLastIndex = inventorRegexp.lastIndex;
        }

        span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
        span.normalize();
    }
*/

}


// Hyperlink inventor names to EPO search
const inventorRegexp = /([A-Z\s][A-Z\s][A-Z\s]+)/g;


if (atepo) {
    var xpath = "//text()[(parent::nobr) and " +
                "contains(translate(., 'Inventor:', 'Inventor:'), 'Inventor:')]";

    var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    if (candidates) {
        cand = candidates.snapshotItem(0)
        cand2 = cand.parentNode.parentNode.parentNode.lastChild.lastChild;
        
        if (cand2) {
        author = cand2.nodeValue;

        var span = document.createElement("span");
        var source = cand2.nodeValue;       

        cand2.parentNode.replaceChild(span, cand2);

        inventorRegexp.lastIndex = 0;
        for (var match = null, lastLastIndex = 0; (match = inventorRegexp.exec(source)); ) {
            span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));


            var a = document.createElement("a");
            var name = match[0];

            a.setAttribute("href", getInventorSearchURL(name));
            a.appendChild(document.createTextNode(name));
            span.appendChild(a);

            lastLastIndex = inventorRegexp.lastIndex;
        }

        span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
        span.normalize();
   }    
}


// Do the same for applicant
    var xpath = "//text()[(parent::nobr) and " +
                "contains(translate(., 'Applicant:', 'Applicant:'), 'Applicant:')]";

    var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    if (candidates) {
        cand = candidates.snapshotItem(0)
        cand2 = cand.parentNode.parentNode.parentNode.lastChild.lastChild;
        if (cand2) {
        author = cand2.nodeValue;

        var span = document.createElement("span");
        var source = cand2.nodeValue;       

        cand2.parentNode.replaceChild(span, cand2);

        inventorRegexp.lastIndex = 0;
        for (var match = null, lastLastIndex = 0; (match = inventorRegexp.exec(source)); ) {
            span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));


            var a = document.createElement("a");
            var name = match[0];

            a.setAttribute("href", getApplicantSearchURL(name));
            a.appendChild(document.createTextNode(name));
            span.appendChild(a);

            lastLastIndex = inventorRegexp.lastIndex;
        }

        span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
        span.normalize();
}
    }


}



