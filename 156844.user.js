// ==UserScript==
// @name			Display Huawei Home Gateway Status
// @namespace		DisplayHGStatus
// @include			*
// @include			about:blank
// @datecreated		2013-01-17
// @lastupdated		2013-02-06
// @version			1.2
// @author			Volkan KIRIK
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description		This userscript will display your Huawei Home Gateway's WAN status.
// @run-at 			document-start
// ==/UserScript==

GM_registerMenuCommand("Huawei Gateway Status?", function(){
function get_access_type(domain)
{
domain = domain;
var list = domain.split('.');
if (list[2] == 1)
{
accesstype = 'DSL';
}
else if (list[2] == 2)
{
accesstype = 'Ethernet';
}
else if (list[2] == 3)
{
accesstype = 'UMTS';
}
else
{
accesstype = '';
}
return accesstype;
}

function get_human_readable_uptime(totalSeconds)
{
// Converts seconds to HH:MM:SS
hours = parseInt(totalSeconds / 3600);
totalSeconds %= 3600;
minutes = parseInt(totalSeconds / 60);
seconds = totalSeconds % 60;
result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
return result;
}

GM_xmlhttpRequest({
	method: "GET",
	url: "http://192.168.1.1/html/status/internetstatus.asp",
	onerror: function(oEvent){ alert("Error " + oEvent.target.status + " occurred while receiving the document."); },
	onload: function(response){
		if (response.readyState !== 4 || response.status !== 200) return;
		//alert('DEBUG MESSAGE:'+"\n\n"+response.responseText); return;
		// we can parse now
		var myregexp = /new stWanPPP\(([^)]*?)\),null/i;
		var match = myregexp.exec(response.responseText);
		if (match != null) {
			// got match
			subject = match[1];
			//alert('DEBUG MESSAGE:'+"\n\n"+subject+"\n"); return;
			// format text
			var mypppregexp = /"([^"]*?)",?/i;
			var wan_ppp_match = subject.split(",\"");
			for (var i = 0; i<wan_ppp_match.length; i++) {
				wan_ppp_match[i] = wan_ppp_match[i].replace(/^"/,"");
				wan_ppp_match[i] = wan_ppp_match[i].replace(/"$/,"");
			}
			if (wan_ppp_match.length > 6) {
				// got WanPPP match
				result = 'Huawei Gateway - WAN PPP Status:'+"\r\n\r\n"
				+'Connection Name: '+wan_ppp_match[1]+"\r\n"
				+'Status: '+wan_ppp_match[2]+"\r\n"
				+'IP Address: '+wan_ppp_match[3]+"\r\n"
				+'DNS: '+wan_ppp_match[4]+"\r\n"
				+'Default Gateway: '+wan_ppp_match[5]+"\r\n"
				+'Uptime: '+get_human_readable_uptime(wan_ppp_match[6])+"\r\n"
				+'Connection Type: '+wan_ppp_match[7]+"\r\n"
				+'Access Type: '+get_access_type(wan_ppp_match[0])
				;
			} else {
				// couldn't parse
				result = "I couldn't parse your WAN status :(";
			}
		} else {
			// no match, error
			result = "I couldn't find your WAN status :(";
		}
		alert(result);
	}
});

});

(function(){
	//dummy function :P
})();

// new stWanPPP\(([^)]*?)\),null
// 
// Options: case insensitive
// 
// Match the characters “new stWanPPP” literally «new stWanPPP»
// Match the character “(” literally «\(»
// Match the regular expression below and capture its match into backreference number 1 «([^)]*?)»
//    Match any character that is NOT a “)” «[^)]*?»
//       Between zero and unlimited times, as few times as possible, expanding as needed (lazy) «*?»
// Match the character “)” literally «\)»
// Match the characters “,null” literally «,null»

