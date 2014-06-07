// ==UserScript==
// @name           Links Checker by QbU v.1.0
// @namespace      http://userscripts.org/scripts/show/66656
// @description    Universal Links Checker v7 supports
// @include        http://*
// @exclude        http://*filesonic.com*
// @exclude        http://*filesonic.pl*
// @exclude        http://*filesonic.jp*
// @exclude        http://*hotfile.com*
// @exclude        http://*fileserve.com*
// ==/UserScript==


linkify();



var filesonic_com= new Array(6)
 filesonic_com[0]='filesonic\.com\/file';
 filesonic_com[1]='File size:';
 filesonic_com[2]='<p>This file was deleted</p>';
 filesonic_com[3]='dsdlhkhsgdsgdhskjhgd';
 filesonic_com[4]="//a[contains(@href,'filesonic.com') and contains(@href,'file')]";
 filesonic_com[5]='dsdlhkhsgdsgdhskjhgd';
 
 
 var filesonic_pl= new Array(6)
 filesonic_com[0]='filesonic\.pl\/file';
 filesonic_com[1]='File size:';
 filesonic_com[2]='<p>This file was deleted</p>';
 filesonic_com[3]='dsdlhkhsgdsgdhskjhgd';
 filesonic_com[4]="//a[contains(@href,'filesonic.pl') and contains(@href,'file')]";
 filesonic_com[5]='dsdlhkhsgdsgdhskjhgd';
 
 
 var filesonic_jp= new Array(6)
 filesonic_com[0]='filesonic\.jp\/file';
 filesonic_com[1]='File size:';
 filesonic_com[2]='<p>This file was deleted</p>';
 filesonic_com[3]='dsdlhkhsgdsgdhskjhgd';
 filesonic_com[4]="//a[contains(@href,'filesonic.jp') and contains(@href,'file')]";
 filesonic_com[5]='dsdlhkhsgdsgdhskjhgd';
 
 
var hotfile_com= new Array(6)  
 hotfile_com[0]='hotfile\.com\/dl';
 hotfile_com[1]='<strong>Downloading:</strong>|<strong>Stahování:</strong>';
 hotfile_com[2]='removed due to copyright|Soubor byl odstraněn';
 hotfile_com[3]='dsdlhkhsgdsgdhskjhgd';
 hotfile_com[4]="//a[contains(@href,'hotfile.com') and contains(@href,'dl')]";
 hotfile_com[5]='dsdlhkhsgdsgdhskjhgd';
 hotfile_com[6]='<span class="size">\\| (\\d.*?)</span>';


var fileserve_com= new Array(6)
 fileserve_com[0]='fileserve\.com\/file';
 fileserve_com[1]='Uploaded on';
 fileserve_com[2]='<h1>File not available</h1>';
 fileserve_com[3]='dsdlhkhsgdsgdhskjhgd';
 fileserve_com[4]="//a[contains(@href,'fileserve.com') and contains(@href,'file')]";
 fileserve_com[5]='dsdlhkhsgdsgdhskjhgd';


var http_file_hosts=[filesonic_com,filesonic_pl,filesonic_jp,hotfile_com,fileserve_com];


var lianks = document.evaluate(filesonic_com[4]+'|'+filesonic_pl[4]+'|'+filesonic_jp[4]+'|'+hotfile_com[4]+'|'+fileserve_com[4], document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// GM_log(lianks.snapshotLength);
if (lianks.snapshotLength > 0){
	addstyle();
	 if ( lianks.snapshotLength > 500 ){ checktill = "500";}else{checktill = lianks.snapshotLength;}
	//}
for (var y = 0; y < checktill; y++) {

	var link = lianks.snapshotItem(y);

	for (var i=0; i<http_file_hosts.length; i++) {
//		GM_log(http_file_hosts[i][0]+' +++ '+link.href);
		if (link.href.match(http_file_hosts[i][0])) {
// 			GM_log(http_file_hosts[i][0]+' +++ '+link.href);
			var URL                                          = link.href;
			var name                                         = http_file_hosts[i][0];
			var file_is_alive                                = http_file_hosts[i][1];
			var file_is_dead                                 = http_file_hosts[i][2];
			var no_dd_slots_temp_unavail_servererror         = http_file_hosts[i][3];
			var whattoreplace                                = http_file_hosts[i][4];
			var tos_violation                                = http_file_hosts[i][5];

			geturl(URL , name , file_is_alive , file_is_dead , no_dd_slots_temp_unavail_servererror , whattoreplace , tos_violation);
		}
	}
}
}
function geturl(URL,name,file_is_alive,file_is_dead,no_dd_slots_temp_unavail_servererror,whattoreplace,tos_violation){

//headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', },

GM_xmlhttpRequest({
method: 'GET',
url: URL,
headers: { 'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)', },
onload: function(responseDetails) {
//	GM_log(URL);
//	GM_log(responseDetails.responseText);
//	alert(OK);
	if (responseDetails.status == 403 || responseDetails.status == 404 ){
		DiplayTheNDSTUSERROR(URL);
	}
// 	GM_log(responseDetails.status);
	var alivelink = responseDetails.responseText.match(file_is_alive);
	var deadylink = responseDetails.responseText.match(file_is_dead);
	var tosviolat = responseDetails.responseText.match(tos_violation);
	var noddslotstempunavailservererror = responseDetails.responseText.match(no_dd_slots_temp_unavail_servererror);
	if (deadylink && (deadylink != null)){
		DiplayTheDeletedLinks(URL);
	}
	if (alivelink && (alivelink != null)){
		DiplayTheLiveLinks(URL);
	}
	if (tosviolat && (tosviolat != null)){
		DiplayTheDeletedLinks(URL);
	}
	if (noddslotstempunavailservererror && (noddslotstempunavailservererror != null)){
		DiplayTheNDSTUSERROR(URL);
	}
}
});
}

function DiplayTheLiveLinks(URL){
//var xpathoflivelinklinks = "//a[starts-with(@href,\'" + livelinklinks.join('\') or starts-with(@href,\'') +"\')]";
//var xpathoflivelinklinks = "//a[contains(@href,\'" + livelinklinks.join('\') or contains(@href,\'') +"\')]";
var xpathoflivelinklinks = "//a[contains(@href,\'"+URL+"\')]";
//GM_log (xpathoflivelinklinks);

var allliveLinks, thisLink;

allliveLinks = document.evaluate( xpathoflivelinklinks,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i = 0; i < allliveLinks.snapshotLength; i++) {
//	GM_log('i ='+i);
    var thisLink = allliveLinks.snapshotItem(i);
    thisLink.id = 'alive_link';

 }

}

function DiplayTheDeletedLinks(URL){

//GM_log ("//a[starts-with(@href,\'" + fotfoundlinks.join('\') or starts-with(@href,\'') +"\')]");
//var xpathoffotfoundlinks = "//a[starts-with(@href,\'" + fotfoundlinks.join('\') or starts-with(@href,\'') +"\')]";
//var xpathoffotfoundlinks = "//a[contains(@href,\'" + fotfoundlinks.join('\') or contains(@href,\'') +"\')]";
var xpathoffotfoundlinks = "//a[contains(@href,\'"+URL+"\')]";
var allLinks, thisLink;

allLinks = document.evaluate( xpathoffotfoundlinks,
document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    var thisLink = allLinks.snapshotItem(i);
//    GM_log(allLinks.snapshotItem(i).id);
    thisLink.id = 'adead_link';
}
}

function DiplayTheNDSTUSERROR(URL){
var xpathoffotfoundlinks = "//a[contains(@href,\'"+URL+"\')]";
var allLinks, thisLink;

allLinks = document.evaluate( xpathoffotfoundlinks,
document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    var thisLink = allLinks.snapshotItem(i);
    thisLink.id = 'NDSTUSERROR';
}
	}



function addstyle(){
alive_link_png = 'data:image/png;base64,'+       // http://i28.tinypic.com/dq5emx.png http://hosts1.atspace.com/accept.png
'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAAL'+
'EwEAmpwYAAAAB3RJTUUH2AMJCQY36Sc4vgAAAlRJREFUeNpV0r9PE3EABfD3veu1lJYr15ZCoBHBqJBAMEbjL0hY'+
'FAkyOAmJMUYd/Q+cXF1wYPQPILppYkKIRARiMDGoaAKimBaKHMWDXnu93venE0Tf9Ib3tg/BP7m3NGgwxtKcM4vy'+
'IKSk4BBqnwux9/LGKjvckcNy9/1Akgk2ZJHMWNyw+qWUMSGZ51R2FzbdX1NSyOnZWznn6HRn8UqSCv6gLdz58GSs'+
'L2voURJIirAWhh+U1fLO4tbKztdJIvHsw/1NR7/97pJBOR9tDXc+6rMGsg4vkd3AhkMdVJgLounkdKLHdL1S13Zp'+
'dyMzbK5pnNF0I0mNn4r3Ze3AJrZvo0zL8KkPyil6rTOgipFzrRezLXVt4zWKtBbwWjIeTgyEQlHiUhepcBpNkSaY'+
'ehxX20Yw2HYd3VYP6iNRYhrpAeojGfJqvs7rRIyKGpSUGOm4iYgWwX7wB72ps/hWXMZCbgaNkUYQrseUr3SNB0JQ'+
'Rj0DBnSlYWN/DcfNEzifuYzVvS94vf4cVeoiBB2ScY8IiBBnytk7KM5XG8qj9SRClrbnUKNVZKLNWMjPwKkWkYk1'+
'46BSUbZrz0PC0ZuHzaBYLokq9S90p3pMJRnJl35gtfgZQnAko0lY4WY1+2lu63s+N0EE+agXXrkydc3czjtF7noH'+
'XccSx82mWIY0hBpgRVMIalK9WX67tfJzfZJo5EVuouAdieh4kk3KQA21J1rGmuoy/UToMSG5t+vaC5u/7Smikenc'+
'04LzHyMAaH+cNcBVGgyWClSIgHAA+2DYy00Wjuz9Bce5MucW9xnuAAAAAElFTkSuQmCC';

adead_link_png = 'data:image/png;base64,'+       //http://i27.tinypic.com/t96wq8.png http://hosts1.atspace.com/dead.png
'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAAL'+
'EwEAmpwYAAAAB3RJTUUH2AMJCQkjdGXwDAAAAcpJREFUeNptkj9PFHEQhp/ZBcIhxyKHYgNCYUxogE0OpdDGxsQC'+
'Y6e5ggS1Mn4Ce621u7MCYqOdX4DkSLTBqwyNiQmJBiJiDjmWP/ub1+IAMXGqmTx5M5nJY5wpwRiQHPfoL2rG8PVk'+
'sDOBlKRYZWgwxcwkIQlc0o+fDe3sPu6E1dOQIGWg/yUT4zOUBiLtHYAHFBy6YvRrW+Hzl4/e/P2kAJ8iwRhJscrE'+
'+AzDwxG3Z2E/oO9bKMvhzj104aLZ1dFr9PZUWzDWASQMDaYqDZjdvAWzd2HkMlpcJKpUsMlJdHiI3i1Ffr4v9d29'+
'pEMnt7UyfOkNNjKKTU8Tl8tghq+sEGqvUZwjZA5EAiShPIetLXxhASSIY3An1Gr4xkabq70iar9OkOeoWCSqVMAM'+
'8hzMiObnIUnQ0RFyR0DkgNylzhh7cB+bmsLrdQ7n5gj1OlG5TPxoHro7kUsC4mdQUB5u0NdziW/r5q2M/PkLfG2N'+
'sLwMkRHevyVkWQib26t+FJYMIIOUvt5XdmXkunXEke/sQchRCNDdRfAQ8vXND97af1qCxqkRLUj9XKFq/cUUMMmR'+
'QHKFZquh7OBhCRr/aATQ/I97foxKZ9z7A9QA5voyr3dtAAAAAElFTkSuQmCC';

NDSTUSERROR_png = 'data:image/png;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAAL'+
'EwEAmpwYAAAAB3RJTUUH2AQJDBgxYO68rwAAAZNJREFUeNptkr9LW1EcxT/3GhOTKIG8QTpm8B8IIoJTFkFwsXVy'+
'UaxFJHYoFzJYUVFHn4sKtoidCoKtIigWOtQOhRKowaFzJwcF0VeJ+fFe7nUwP57R7/S9nO+595z7PQJfGUgAsWqP'+
'aUBOC/yrHQI+QjKTXc7GQq4EhP+uKzdUcbtnelvhDzXQQHL2bCkbxhOA5GmZ24LUC73zPWE4lQYSmexynaCmjh5N'+
'q9FdANER1uL9j7nfeUhIIFaVJNXEPrguKvPzgfD2G0iBGt8DkPG4CGiIyapZAWBvDUEoBOfnqPQxaANxC3v7Ze1h'+
'oQFpmsTbGwMQicLNNeTz2HaKYuO/4DnTauwLeC6i8wW4ZdSbA9rw/GtB6kaPmjyESATKZVZWUxAMQqnI9MTXOqdG'+
'cvRFoSw8o+0Pg1DxsD+PcFcJYH8aphSNsr71CkAH/17danAEQAGSa98zv7x4W9AIpGkRzap18cKU3vUv9lmQq6N5'+
'SH7cSZ8Uuqx205SI1rPL/6/HN1MW5GiKC84z2at6dixf9u4B/PqUtJuX27QAAAAASUVORK5CYII=';

GM_addStyle("#alive_link {background:transparent url("+alive_link_png+") no-repeat scroll 100% 50%;padding-right:17px;}");
GM_addStyle("#adead_link {background:transparent url("+adead_link_png+") no-repeat scroll 100% 50%;padding-right:17px;}");
GM_addStyle("#NDSTUSERROR {background:transparent url("+NDSTUSERROR_png+") no-repeat scroll 100% 50%;padding-right:17px;}");

}

function linkify(){ // code from http://userscripts.org/scripts/review/2254  Linkify ting
try{
//dk|com|net|org|se|no|nl|us|uk|de|it|nu|edu|info
//var regex = /\b(?:|http\:\/\/www\.anonym\.to\/\?)(?:h\w\wp|http|hxxp|h  p|h\*\*p)((?:\:\/\/www\.megaupload\.com\/\?d=.*?[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])|(?:\:\/\/rapidshare\.de\/files\/[\d]*\/.*?\..*?[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!]))/ig;
//var regex = /http:\/\/(netload\.in\/date|w\d\d\.easy-share\.com|depositfiles|(www\.|)yourfilehost\.com|vip-file\.com|rapidshare\.de|(www\.|)sendspace\.com|(www\.|)megaupload\.com|(www\.|)mediafire\.com|(www\.|d\d\d\.|)megashares\.com)[\w\-.+$!*\/(),~%?:@#&=\\]*/gi;
var regex = /http:\/\/((www\.)?netload\.in\/date|(www\.|w\d\d\.)easy-share\.com|depositfiles|(www\.|)yourfilehost\.com|vip-file\.com|(www\.|)sendspace\.com|(www\.|)mediafire\.com|(www\.|d\d\d\.|)megashares\.com|(www\.|)uloz\.to|(www\.|)ulozto\.(cz|sk|net)|czshare\.com|(www\.|download\.(cz|sk|en)\.)hellshare\.com|(www\.|download\.)hellshare\.(com|sk|cz|en)|uploaded\.to|(www\.|)ul\.to|(www|muj|data\d+)\.edisk\.(cz|sk)\/|(www\.|)quickshare\.cz|(www\.|)share-rapid\.(com|cz|sk|net|info|biz|eu|org)|(www\.|)sharerapid\.(com|cz|sk|net|info|biz|eu|org)|(www\.)?letitbit\.net|(www\.|)filesonic\.com|(www\.|)hotfile\.com|(www\.|)x7\.to|(www\.|)uploading\.com|(www\.|)dataport\.cz|(www\.|)multishare\.cz|(www\.|)fileserve\.com|(www.|)extabit\.com)[\w\-.+$!*\/(),~%?:@#&=\\]*/gi;
//] /

var altText, tekst, muligtLink;
var ikkeTilladteTags = ['a', 'head', 'script', 'style', 'textarea', 'title', 'option'];//tags, hvor det der stAΞ’Β¥r inden i ikke skal vAΞ’Β¦re links

//var ikkeTilladteTags = ['a', 'head', 'script', 'style', 'textarea', 'title', 'option', 'pre', 'code'];//tags, hvor det der stAΞ’Β¥r inden i ikke skal vAΞ’Β¦re links
var path = "//text()[not(parent::" + ikkeTilladteTags.join(" or parent::") +")]";

altText = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(var i=0;i<altText.snapshotLength;i++){
	tekst = altText.snapshotItem(i);
	muligtLink = tekst.nodeValue;

	if(regex.test(muligtLink)){

		//til at holde det nye link, og teksten omkring det
		var span = document.createElement('span');
		//tekst.parentNode.replaceChild(span, tekst);
		//alert("parent:" + span.parentNode);

		var lastLastIndex = 0;
		regex.lastIndex = 0;
		for(myArray = null; myArray = regex.exec(muligtLink); ){
			//vores match gemmes
			var link = myArray[0];

			//alert("har fundet dette link: " + link);

			span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex, myArray.index))); //inds?t det der kommer for dette hit

			var href = link;

			//s?tter http:// foran href, hvis der ikke er det
			var prefix = '';
			if(href.length > 7){
				prefix = href.substring(0,7);
			}
			if(prefix.toLowerCase() != 'http://'){
				href = 'http://' + href;
			}

			//skab vores link:
			var a = document.createElement('a');
			a.setAttribute('href', href); //giv det en href
			a.appendChild(document.createTextNode(link)); //linkteksten
			span.appendChild(a); //s?tter ind i span

			lastLastIndex = regex.lastIndex;

		}

		span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex))); //ins?t det der kommer efter sidste hit
		tekst.parentNode.replaceChild(span, tekst);

	}

}
} catch(e){alert(e);}

	}