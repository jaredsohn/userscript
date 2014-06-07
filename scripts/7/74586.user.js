scr_meta=<><![CDATA[                                                                      // ********** REMOVE THIS LINE FOR THE FIREFOX ADDON **********
// ==UserScript==
// @name          USPTO Links
// @uso:script    
// @namespace     
// @description	  Provides helpful links for Issued Patents and Patent Applications at the United States Patent Office ( USPTO ).
// @author        
// @copyright     
// @include       http://patft*.uspto.gov/netacgi/*
// @include       http://appft*.uspto.gov/netacgi/*
// ==/UserScript==              
]]></>;                                                                                    // ********** REMOVE THIS LINE FOR THE FIREFOX ADDON **********
 

// Style for displaying the links

GM_addStyle("a.pw_pat2pdf    { position: absolute;  top:  17px;  left: 8px;  font-size: 14px; }");
GM_addStyle("a.pw_freepats   { position: absolute;  top:  35px;  left: 8px;  font-size: 14px; }");
GM_addStyle("a.pw_PatStorm   { position: absolute;  top:  53px;  left: 8px;  font-size: 14px; }");
GM_addStyle("a.pw_GooglePat    { position: absolute;  top:  71px;  left: 8px;  font-size: 14px; }");

// Note space for each link

GM_addStyle("a.pw_pat2pdfnote     { position: absolute;  top:  19px;  left: 150px;  font-size: 10px;  color: RED }");
GM_addStyle("a.pw_freepatsnote    { position: absolute;  top:  37px;  left: 150px;  font-size: 10px;  color: RED }");
GM_addStyle("a.pw_PatStormnote    { position: absolute;  top:  55px;  left: 150px;  font-size: 10px;  color: RED }");
GM_addStyle("a.pw_GooglePatnote     { position: absolute;  top:  73px;  left: 150px;  font-size: 10px;  color: RED }");

// Adding a styles for cited art Links

GM_addStyle("a.pw_citedlink {font-size: 12px;}");

// Check Title to make sure it's a patent application or an issued patent Which will start with "United States Patent"

   var title = document.title;

// Check to make sure it is a patent, not a search, etc.

   if (title.substring(0,20) == "United States Patent") { // START THE IMPORTANT PART OF THE SCRIPT

// Check to see if a US Issued Patent is diplayed

   var issuedpat = 0;
   if (title.substring(0,21) == "United States Patent:") {                               

// START US ISSUED PATENTS LOOP

   issuedpat = 1;

// Creating links based on the U.S. Patent number

function getpat2pdf(patno)    { return "http://www.pat2pdf.org/pat2pdf/foo.pl?number=" + patno;}
function getfreepats(patno)   { return "http://www.freepatentsonline.com/" + patno + ".pdf";}
function getPatStorm(patno)   { return "http://www.patentstorm.us/patents/pdfs/patent_id/" + patno + ".html";}
function getGooglePat(patno)    { return "http://www.google.com/patents/about?id=6oiIAAAAEBAJ&dq=" + patno;}

// Get U.S. Patent Number:
// Page Name is in the form of  "United States Patent: #######" 
// Take patent number ####### from the title as a substring.
   
   var patno = title.substring(22);

// Adding Similar Links to the Cited Prior Art

    var as = document.getElementsByTagName('a');
    for (var i = as.length - 1; i >= 0; i--) {
        var html = as[i].innerHTML;
        var xnum = html.replace(/[^0-9]/g,"");                                           // If they match it is a "good" patent number
        if (html == xnum && xnum > 0) {

            citedpatno = xnum.replace(/\,/g,'');

            var a20 = document.createElement("a");
            a20.appendChild(document.createTextNode(" "));                               // Create a whitespace
            a20.className = "pw_citedlink";

            var a21 = document.createElement("a");                                       // Create link to Pat2Pdf
            a21.setAttribute("href", getpat2pdf(citedpatno));
            a21.appendChild(document.createTextNode("[ Pat2Pdf ]"));
            a21.className = "pw_citedlink";

            var a22 = document.createElement("a");
            a22.appendChild(document.createTextNode(" "));                               // Create a whitespace
            a22.className = "pw_citedlink";

            var a23 = document.createElement("a");                                       // Create link to GooglePatents
            a23.setAttribute("href", getGooglePat(citedpatno));
            a23.appendChild(document.createTextNode("[ Google Patents ]"));
            a23.className = "pw_citedlink";

            as[i].parentNode.insertBefore(a23, as[i].nextSibling);                       // Note: there should be a more elegant way to do this
            as[i].parentNode.insertBefore(a22, as[i].nextSibling);  
            as[i].parentNode.insertBefore(a21, as[i].nextSibling);
            as[i].parentNode.insertBefore(a20, as[i].nextSibling);  
            
        }
    }

} // END US ISSUED PATENTS LOOP

// Check to see if a US Published Application is displayed

      var pubapp = 0;
      if(title.substring(0,34) == "United States Patent Application: "){

// START PUBLISHED PATENT APPLICATION LOOP
      var pubapp = 1;

// Take patent application number ####### from the title as a substring and add the missing leading "2"
      var patno = 2 + title.substring(34);

// Google needs year separator for US Published Applications
      var frontgooglenum = patno.substring(0,4)
      var endgooglenum = patno.substring(4,11)
      var appnum = frontgooglenum + "/" + endgooglenum

// Creating links based on variables

function getpat2pdf(patno)    { return "http://www.pat2pdf.org/pat2pdf/foo.pl?number=" + patno;}
function getfreepats(patno)   { return "http://www.freepatentsonline.com/" + patno + ".pdf";}
function getPatStorm(patno)   { return "http://www.patentstorm.us/applications/pdfs/applicationId/" + patno + ".html"}
function getGooglePat(patno)    { return "http://www.google.com/patents/about?id=6oiIAAAAEBAJ&dq=" + appnum;}

} // END PUBLISHED PATENT APPLICATION LOOP

// Add the links
      var string = document.body.innerHTML;
      string = string.replace(/\s+/g,' ');
      string = string.replace(/\<b\>/g,'');
      string = string.replace(/\<\/b\>/g,'');

// PAT2PDF link
      var a1 = document.createElement("a");
      a1.setAttribute("href", getpat2pdf(patno));
      a1.appendChild(document.createTextNode(" [ PAT2PDF ]"));
      a1.className = "pw_pat2pdf";
      document.body.appendChild(a1);

// Free Patents Online Link
      var a2 = document.createElement("a");
      a2.setAttribute("href", getfreepats(patno));
      a2.appendChild(document.createTextNode(" [ FreePatentsOnline ]"));
      a2.className = "pw_freepats";    
      document.body.appendChild(a2);

// PatentStorm url Link
      var a3 = document.createElement("a");
      a3.setAttribute("href", getPatStorm(patno));
      a3.appendChild(document.createTextNode(" [ Patent Storm ]"));
      a3.className = "pw_PatStorm";     
      document.body.appendChild(a3);

// Google Patents Link
      var a4 = document.createElement("a");
      a4.setAttribute("href", getGooglePat(patno));
      a4.appendChild(document.createTextNode(" [ Google Patents ]"));
      a4.className = "pw_GooglePat";    
      document.body.appendChild(a4);

} // END IMPORTANT PART OF THE SCRIPT 

