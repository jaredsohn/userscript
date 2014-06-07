// ==UserScript==
// @name           Share.gogo.mn only
// @version        20090429
// @exclude	   http://*share.gogo.mn/*

// ==/UserScript==

/* ************************ /*

About this script
 Automatically checks links from the page that you are visiting
 Supports :  share.gogo.mn 

 Автоматаар link үүдийг шалгаж устсан эсэхийг хэрэглэгчидэд мэдээлэх болно.

Version History
 version 0.1 beta 29 april 2009 added more hosts, script corrections
 

/ ************************* */


linkify();

var share_gogo_mn= new Array(6) 		   		 //http://share.gogo.mn/67577161239064727
 share_gogo_mn[0]="share.gogo.mn"                  		 //name and search string in link to get description 
 share_gogo_mn[1]='dwait';                         		 // file_is_alive
 share_gogo_mn[2]='File not found';        	    		 // file_is_dead
 share_gogo_mn[3]='dsdlhkhsgdsgdhskjhgd';           		 // no download slots or temporarily unavailable or servererror
 share_gogo_mn[4]="//a[contains(@href,'share.gogo.mn/')]"; 
 share_gogo_mn[5]='file is deleted';                             //tos violation

    
var http_file_hosts=[share_gogo_mn];

/*is this faster ?  var lianks = document.getElementsByTagName('a'); for (var i = links.length - 1; i >= 0; i--) { }  var lianks = document.getElementsByTagName('a');*/

var lianks = document.evaluate(share_gogo_mn[4] ,  document,	null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,	null);

if (lianks.snapshotLength > 0){
	addstyle();
	 if ( lianks.snapshotLength > 200 ){ checktill = "200";}else{checktill = lianks.snapshotLength;}

for (var y = 0; y < checktill; y++) {

	var link = lianks.snapshotItem(y);	

	     for (var i=0; i<http_file_hosts.length; i++) {
	     	//GM_log(http_file_hosts[i][0]+' +++ '+link.href);
    if ( (link.href.match(http_file_hosts[i][0])) && (!(link.href.match(/google\./))) && (!(link.href.match(/cache:/))) ){
//http://userscripts.org/scripts/show/24953/Universal Links Checker: http://74.125.77.132/search?q=cache:2NdfxMpTIvUJ:depositfiles.com/en/files/282791/FIFA.07-RELOADED.part02.rar.html+depositfiles.com/en/files+300&hl=el&ct=clnk&cd=3&gl=gr&client=firefox-a
    	//GM_log(http_file_hosts[i][0]+' +++ '+link.href);
           var URL                                          = link.href.replace(/http:\/\/anonym\.to\/\?http:\/\//,'http://');    	
           //var URL                                          = link.href;
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




GM_xmlhttpRequest({
method: 'GET',
url: URL,
headers: { 'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)', }, //headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', },
onload: function(responseDetails) {

//GM_log(URL);	
//GM_log(responseDetails.responseText);	

if (responseDetails.status == 403 || responseDetails.status == 404 ){
	DiplayTheNDSTUSERROR(URL);
	}
//GM_log(responseDetails.status);	
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

	
	

/* possible link checking sites

http://www.rooseveltrp.com/filecheck/  -- slowww
http://www.mtworld.info/filec/ -- slowww
http://rapidzone.ws/linxtool/ -- fast
http://irapid.co.uk/LinkChecker/ 
http://lc.technospace.info/ -timeout 180 links
http://linkchecker.daily-warez.org/  -timeout  180 links
http://www.warezlounge.com/link_checker.php slow errors in the code

http://hajebi.ir/ fast  but checks only 20 at a time 

20 links test
http://linkchecker.daily-warez.org/  -timeout  20 links
http://hajebi.ir/ fast
http://irapid.co.uk/LinkChecker/ OK
http://lc.technospace.info/ timeout
http://www.rapid-hook.com/index.php not bad
http://rapidshoot.com/ rapidshare only
http://rapidzone.ws/linxtool/ -- very fast


*/

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
//var regex = /http:\/\/(netload\.in\/date|w\d\d\.easy-share\.com|depositfiles|(www\.|)yourfilehost\.com|vip-file\.com|rapidshare\.de|(www\.|)sendspace\.com|(www\.|)mediafire\.com|(www\.|d\d\d\.|)megashares\.com)[\w\-.+$!*\/(),~%?:@#&=\\]*/gi;
//var regex = /http:\/\/(netload\.in\/date|w\d\d\.easy-share\.com|share\.gogo\.mn|filebase\.to\/files|link-protector\.com\/|depositfiles\.com\/files\/|bitroad\.net\/download\/|vip-file\.com\/download\/|www.filenavi\.com\/direct\/|(www\.|)yourfilehost\.com|vip-file\.com|rapidshare\.de|(www\.|)sendspace\.com|uploadbox\.com\/files\/|www\.zshare\.net\/|(www\.|)mediafire\.com|(www\.|d\d\d\.|)megashares\.com)[\w\-.+$!*\/(),~%?:@#&=\\]*/gi;


var altText, tekst, muligtLink;
var ikkeTilladteTags = ['a', 'head', 'script', 'style', 'title', 'option'];//tags, hvor det der stAΞ’Β¥r inden i ikke skal vAΞ’Β¦re links

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



