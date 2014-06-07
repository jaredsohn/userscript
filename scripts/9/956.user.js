// ==UserScript==
// @name		OTRS Select All
// @namespace		http://www.hoolehan.com/greasemonkey
// @description		Selects all tickets for bulk change OTRS queueview
// @include		http://www.your-otrs-address.com/otrs/*
// @include		
// @include 		
// @include		

// ==/UserScript==

(function() {


    var i=document.getElementsByTagName('a');
    for (var j=i.length-1; j>1; j--) {
        if (i[j].getAttribute("href"))  {
           var linkdata =  i[j].getAttribute("href");
           if (linkdata.match("AgentClose") ) {
               var selectalllink = document.createElement("a");
               selectalllink.href="javascript: BulkChangeAll()";
               selectalllink.appendChild(document.createTextNode("Select All"));
               i[j].parentNode.insertBefore( selectalllink ,i[j].nextSibling);
               i[j].parentNode.insertBefore( document.createTextNode(" - "),i[j].nextSibling);
               }
           }
        }



function BulkChangeAll() {
    var i =0;
    for (i=0; i < document.forms.length; i++) { 
        if (document.forms[i].elements["Selected"]) { 
            if (!document.forms[i].elements["Selected"].checked) {
                document.forms[i].elements["Selected"].click();
            }
        }
    } 
}

window.BulkChangeAll = BulkChangeAll;

})();
