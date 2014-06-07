// ==UserScript==
// @name			Display My IP Address
// @namespace		DisplayMyIP
// @include			*
// @include			about:blank
// @datecreated		2012-04-12
// @lastupdated		2014-03-03
// @version			1.3
// @author			Volkan K.
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description		This userscript will display your IP address.
// @run-at 			document-start
// ==/UserScript==

GM_registerMenuCommand("What's My IP Address?", function(){

GM_xmlhttpRequest({
	method: "GET",
	url: "http://tools.ip2location.com/ib2",
	onerror: function(oEvent){ alert("Error " + oEvent.target.status + " occurred while receiving the document."); },
	onload: function(response){
		if (response.readyState !== 4 || response.status !== 200) return;
		// we can parse now
		var myregexp = /<a[^>]*>([\s\S]*?(?:Your IP Address)[\s\S]*?)<\/a>/i;
		var match = myregexp.exec(response.responseText);
		if (match != null) {
			// got match
			subject = match[1];
			// format first line
			subject_2 = subject.replace(/<br><b>/mg, " ");
			// remove html
			subject_3 = subject_2.replace(/<\/?[a-z][a-z0-9]*[^<>]*>|<!--[\s\S]*?-->/ig, "");
			// now remove whitespaces
			result = subject_3.replace(/^[ \s]*/mg, "");
		} else {
			// no match, error
			result = "I couldn't find your IP Address :(";
		}
		alert(result);
	}
});

});

(function(){
	//dummy function :P
})();