// (c) x-MoBiLe and cilaas @ www.indianfunworld.com
// by using this script you agree the terms and condition to not to change or remove the copyright
// ==UserScript==
// @name           Rapidshare Links Checker
// @description    checks rapidshare links
// @namespace      http://userscripts.org/scripts/show/9467
// @include        http://*
// @include        http://indianfunworld.com/*
// @exclude        http://rapidshare.com/*
// @exclude        http://rapidshare.de/*
// @exclude        http://*.rapidshare.com/*
// @exclude        http://*.rapidshare.de/*
// @exclude        http://www.filefactory.com/*
// @exclude        http://filefactory.com/*
// @exclude        http://www.megaupload.com/*
// @exclude        http://megaupload.com/*
// @exclude        *xml_dump.php*
// @exclude        *phpMyAdmin*
// @exclude        *deleterecord.php*

// ==/UserScript==

//test http://mulinks.com/news.php

// latest update 16 June 2008
//---------------//
// Version : 2.5 //
//---------------//
// 2.5 megaupload.com is supported
// 2.5 better no_live_links option
// 2.4 no_live_links option
// 2.3 send urls with rapidshare links to the database http://hosts.890m.com (version alfa EXPERIMENTAL)
//     filefactory new code fix 
// 2.2 rapidshare new design fixation
// 2.1 filefactory.com is supported
// 2.0 anonimized links are supported www.anonym.to de-referer.com etc
//     removing bold (<b> tags) from google only if it shows rapidshare links
// 1.8 1.9 bug correction
// 1.7 visual improvement
// 1.6 bug correction
// 1.5 major changes fixed a lot of bugs
// 1.4 added visual cue
// 1.4 corrected a lot of bugs
 
 
/*-------------*\
|     About     |
\*-------------*/

// This sript is checking the links for files hosted in rapidshare.com and filefactory.com

/*-----------------------------------------*\
|    About The Database hosts.890m.com    |
\*-----------------------------------------*/

/*
 The rapidshare database (http://hosts.890m.com) is a part of this userscript,
 the Rapidshare Links Checker userscript has the ability to sent only the urls of
 the pages when all the rapidshare links are alive, no cookies or other private
 informations are sent to the database, and you have the ability to erase the
 data you send. 
*/

//    Sent To Database Options   //
//-------------------------------//
const Send_The_Links_You_Are_Checking_In_The_Open_Database = 'no'; // yes or no
                                                                   // No personal info are transmited 
                                                                   // The database can be accessed here:
                                                                   // http://hosts.890m.com 
const username = 'aman11dhanpat@gmail.com';
const password = '6779b0e652f49b3c32905d9e8703103f';                                                        


                     
/*-------------*\
|    Options    |
\*-------------*/
show_black_backround_in_dead_links = 'no'; // yes or no
show_line_through_in_dead_links = 'yes'; // yes or no
no_live_links = 'no'; // yes or no
const Display_Page_Stats = 'no'; // yes or no Display page stats in the GM_log (error console)
//-------------//                                



if (Display_Page_Stats == 'yes'){
var today = new Date( );
//GM_log ('getTimeInMilliseconts(today) '+getTimeInMilliseconts(today));
firsttime = getTimeInMilliseconts (today);
}


//////google de-bold 
//it's removing bold (<b> tags) from the results of google if you are serching for rapidshare files directly from google 
// I couldn't find more elegant or faster way. google de-bold costs 1 second for a 100 results google page	

	var googleregex = new RegExp(/http:\/\/(?:www\.|blogsearch\.|)google\./);
	//var rapideregex = new RegExp("rapideshare");
	if (googleregex.test(location.href)){

var links = document.evaluate(
	"id('res')/div[1]|/html/body/div[6]/div[2]",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

//createTextNode(link.firstChild.nodeValue); // it's faster without a loop
//for (var i = 0; i < links.snapshotLength; i++) {
	link = links.snapshotItem(0);
	var regex = new RegExp("rapidshare");
	var regexff = new RegExp("filefactory");
	var regexmu = new RegExp("megaupload.com/?d=");
	if (regex.test(link.innerHTML) || regexff.test(link.innerHTML) || regexmu.test(link.innerHTML)) {
	//link.innerHTML = link.innerHTML.replace(/ /gi,'');
	link.innerHTML = link.innerHTML.replace(/<b>/gi,'');
	link.innerHTML = link.innerHTML.replace(/<\/b>/gi,'');
	link.innerHTML = link.innerHTML.replace(/<wbr>/gi,''); // to show better the rapidshare links
//}

 }
}
/////google de-bold end



var all = [];
var allff = [];
var allmu = [];

// find the url and make them links
//const urlRegex = /\b(?:|http\:\/\/www\.anonym\.to\/\?)(?:h\w\wp|http|hxxp|h  p|h\*\*p)\:\/\/rapidshare\.(?:com|de)\/files\/[\d]*\/.*?\..*?[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!]/ig;
// new const with filefactory
//const urlRegex = /\b(?:|http\:\/\/www\.anonym\.to\/\?)(?:h\w\wp|http|hxxp|h  p|h\*\*p)((?:\:\/\/www\.megaupload\.com\/\?d=.*?[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])|(?:\:\/\/www\.filefactory\.com\/file\/..*?[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])|(?:\:\/\/rapidshare\.com\/files\/[\d]*\/.*?\..*?[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!]))/ig;
//const urlRegex = /\b(?:|http\:\/\/www\.anonym\.to\/\?)(?:h\w\wp|http|hxxp|h  p|h\*\*p)((?:\:\/\/www\.filefactory\.com\/file\/..*?[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])|(?:\:\/\/rapidshare\.com\/files\/[\d]*\/.*?\..*?[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])|(?:\:\/\/www\.megaupload\.com\/.*?[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!]))/ig;
const urlRegex = /\b(?:|http\:\/\/www\.anonym\.to\/\?)(?:h\w\wp|http|hxxp|h  p|h\*\*p)((?:\:\/\/www\.filefactory\.com\/file\/..*?[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])|(?:\:\/\/rapidshare\.com\/files\/[\d]*\/.*?\..*?[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])|(?:\:\/\/www\.megaupload\.com\/\?d=.{8}))/ig;
var notallowedParents = ['a', 'head', 'script', 'style', 'title', 'option', 'textarea'];//tags, hvor det der stA?r inden i ikke skal vA?re links
//var notallowedParents = ['a', 'head'];//tags, 
 
// old var xpath = "//text()[not(parent::" + notallowedParents.join(" or parent::") +")]";
 var xpath = "//text()[not(ancestor::" + notallowedParents.join(" or ancestor::") +")]"; // props Garthex 
 var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
        //if (urlRegex.test(cand.nodeValue)) {
        if ((urlRegex.test(cand.nodeValue)) && (!cand.nodeValue.match(/\b(\.\.\.)\b/))	&& (!cand.nodeValue.match(/killcode/))){
       //cand.nodeValue.replace
        cand.nodeValue = cand.nodeValue.replace(/h\w\wp:\/\/|hxxp:\/\/|h  p:\/\/|h\*\*p:\/\//gi,'http://');

            var span = document.createElement("span");
            span.id = 'rslinkfy';
            var source = cand.nodeValue;
            cand.parentNode.replaceChild(span, cand);

            urlRegex.lastIndex = 0;
            for (var match = null, lastLastIndex = 0; (match = urlRegex.exec(source)); ) {
                span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));
                
                var a = document.createElement("a");
                a.setAttribute("href", match[0]);
                a.appendChild(document.createTextNode(match[0]));
                span.appendChild(a);

                lastLastIndex = urlRegex.lastIndex;
            }

            span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
            span.normalize();
        }
    }





var links = document.getElementsByTagName('a');






var numberofrslinks = 0;
var numberoffflinks = 0;
var numberofmulinks = 0;

var myrapidshareRegExp0 = /http\:\/\/rapidshare\.com\/files\/\d{4,}\/.*?\..*?/;
var myrapidshareRegExp1 = /^.*?http:\/\/rapidshare\.com\/files\/\d{4,}\/.*?\..*?/;
var myrapidshareRegExp2 = /^.*?http%3A%2F%2Frapidshare\.com%2Ffiles%2F\d{4,}%2F.*?\..*?/;   ///redir.php?http%3A%2F%2Frapidshare.com%2Ffiles%2F59070119%2Fpl-sxxsf6.part2.rar

var myfilefactoryRegExp = /http\:\/\/www\.filefactory\.com\/file\/[\w]{6}(\/|)/;

var mymegauploadRegExp = /http\:\/\/www\.megaupload\.com\/\?d=.{8}(\/|)/;


	muid=0;
for (var i = links.length - 1; i >= 0; i--) {

//if (links[i].href.search(myrapidshareRegExp2) != -1) {
//GM_log (links[i].href);
if ((links[i].href.search(myrapidshareRegExp0) != -1) || (links[i].href.search(myrapidshareRegExp1) != -1) || (links[i].href.search(myrapidshareRegExp2) != -1) ) {
//if (links[i].href.indexOf("rapidshare.com/files/") != -1) {	
var urll = links[i].href;
numberofrslinks++;
//GM_log (numberofrslinks);
//urll = urll.replace(/http:\/\/.*?http:\/\/rapidshare/gi,'http://rapidshare');
urll = urll.replace(/^.*?http:\/\/rapidshare/gi,'http://rapidshare');
urll = urll.replace(/^.*?http%3A%2F%2Frapidshare/gi,'http://rapidshare');
urll = urll.replace(/\?killcode=[\d]*/gi,'');
urll = urll.replace(/%2F/gi,'/');
urll = urll.replace(/%3A/gi,':');

//GM_log (urll);
//if (i == 100 || i == 200 || i == 300 || i == 400 || i == 500 || i == 600 || i == 700 || i == 800 || i == 900 || i == 1000 || i == 1100 || i == 1200 || i == 1300 || i == 1400 || i == 1500 || i == 1600 || i == 1700 || i == 1800 || i == 1900 || i == 2000 || i == 2100 || i == 2200 || i == 2300){ // well this is about 2500 links  i don't think memory can handle more (even this is too much)
//all.push('xxxczxczxcsasdasdasdx4234');
//}

var myString = ''+numberofrslinks+'';
if (myString.search(/\d00/) != -1)
 {all.push('xxxczxczxcsasdasdasdx4234'); }
all.push(urll);
}

// filefactoty
if (links[i].href.search(myfilefactoryRegExp) != -1) {
	
var urll = links[i].href;
numberoffflinks++;

urll = urll.replace(/^.*?http:\/\/www\.filefactory/gi,'http://www.filefactory');
urll = urll.replace(/^.*?http%3A%2F%2Fwww\.filefactory/gi,'http://www.filefacory');
urll = urll.replace(/%2F/gi,'/');
urll = urll.replace(/%3A/gi,':');


var myString = ''+numberoffflinks+'';
if (myString.search(/\d00/) != -1)
 {allff.push('xxxczxczxcsasdasdasdx4234'); }
allff.push(urll);
}

// megaupload  
if (links[i].href.search(mymegauploadRegExp) != -1) {

var urll = links[i].href;
numberofmulinks++;

urll = urll.replace(/^.*?http:\/\/www\.megaupload\.com\/\?d=/gi,'id'+muid+'=');
urll = urll.replace(/^.*?http%3A%2F%2Fwww\.megaupload\.com\/\?d=/gi,'id'+muid+'=');
urll = urll.replace(/%2F/gi,'/');
urll = urll.replace(/%3A/gi,':');

	muid++;

var myString = ''+numberofmulinks+'';

//if (myString.search(/\&id99/) != -1) //mporei mexri 99 apotelesmata tin fora
// {allmu.push('xxxczxczxcsasdasdasdx4234'); 
// 	}

allmu.push(urll);
}


}


all = all.join();     
all = all.replace(/,/gi,'\n');
var all=all.split("xxxczxczxcsasdasdasdx4234");
//GM_log('all = '+all);
allff = allff.join();     
allff = allff.replace(/,/gi,'\n');
var allff=allff.split("xxxczxczxcsasdasdasdx4234");

allmu = allmu.join();     
allmu = allmu.replace(/,/gi,'&');
var allmu=allmu.split("xxxczxczxcsasdasdasdx4234");
//GM_log('allmu = '+allmu);

if ((numberofrslinks > 0) || (numberoffflinks > 0) || (numberofmulinks > 0)){

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

NDSTUSEROR_png = 'data:image/png;base64,'+ // or temporary anavailable
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
GM_addStyle("#unava_link {background:transparent url("+NDSTUSEROR_png+") no-repeat scroll 100% 50%;padding-right:17px;}");


}
if (numberofrslinks > 0){
	getlinkschecked(all);
	}
if (numberoffflinks > 0){
	getfflinkschecked(allff);
	}
if (numberofmulinks > 0){
	getmulinkschecked(allmu);
	}
			
function getlinkschecked(all){

for (var i = all.length - 1; i >= 0; i--) {
  GM_xmlhttpRequest({
    method: "POST",
    url: 'http://rapidshare.com/cgi-bin/checkfiles.cgi',
    headers:{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
             'Content-type':'application/x-www-form-urlencoded'},
    data:'urls='+encodeURIComponent(all[i]),  // or all.join('\n') is good also
    onload:function(result) {
res=result.responseText;
//GM_log('rapidshare res '+res);
notfound = res.match(/inexistent<\/td><\/tr><\/table>    \n<div class="downloadlink">http:\/\/rapidshare\.com\/files\/(\d*)\/.*<\/div>/g);
livelink = res.match(/load<\/a><\/td><\/tr><\/table>    \n<div class="downloadlink">http:\/\/rapidshare\.com\/files\/(\d*)\/.*<\/div>/g);
if (notfound){
  var fotfoundlinks = new Array();   
	  for (var i = notfound.length - 1; i >= 0; i--) {
          var string=notfound[i];
          var regex = /inexistent<\/td><\/tr><\/table>    \n<div class="downloadlink">http:\/\/rapidshare\.com\/files\/(\d*)\/.*<\/div>/;
          matchArray=string.match(regex);
          fotfoundlinks.push(matchArray[1]);
     }
       if (fotfoundlinks){
       	DiplayTheDeletedLinks(fotfoundlinks);
           }
          }

if (livelink){
  var livelinklinks = new Array();   
	  for (var i = livelink.length - 1; i >= 0; i--) {
          var string=livelink[i];
          var regex2 = /load<\/a><\/td><\/tr><\/table>    \n<div class="downloadlink">http:\/\/rapidshare\.com\/files\/(\d*)\/.*<\/div>/;
          matchArraylive=string.match(regex2);
          livelinklinks.push(matchArraylive[1]);
     }
      if (livelinklinks){
      	DiplayTheLiveLinks(livelinklinks);
      	
          }
         }

// senting links to database
if ((!fotfoundlinks) && (livelinklinks) && (Send_The_Links_You_Are_Checking_In_The_Open_Database == 'yes' )){ // if on the page are only alinve links 

if (document.title == ''){documentotitle = 'no title';	}else{ documentotitle = document.title.replace(/rapidshare/,''); } // fixing an empty title

//urldb = 'http://localhost/rapidsharedb.com/database.php?title='+document.title+'&original_URL='+encodeURIComponent(document.URL)+'&address='+encodeURIComponent(all)+'&info='+document.lastModified+'&submit=Enter+information';
//urldb = 'http://hosts.890m.com/database.php?title='+documentotitle+'&original_URL='+encodeURIComponent(document.URL)+'&address='+encodeURIComponent(all)+'&info='+document.lastModified+'&submit=Enter+information';



address = encodeURIComponent(all);

address = address.replace(/http%3A%2F%2Frapidshare.com%2Ffiles%2F/g, "f6kg4w"); 
// f6kg4w doesn't exist in google so is very rare word this is a kind of encoding so the message transfered will be smaller
//address = 'http%3A%2F%2Frapare.com%2Ffiles%2F87161790%2FMMTET_www.softarchive.net.rar%0Ahttp%3A%2F%2Frare.com%2Ffiles%2F87171651%2FTart_04_www.softarchive.net.rar';

//data = 'title='+documentotitle+'&original_URL='+encodeURIComponent(document.URL)+'&address='+address+'&password='+password+'&username='+username+'&info='+document.lastModified+'&submit=Enter+information';
data = 'title='+documentotitle+'&original_URL='+encodeURIComponent(document.URL)+'&password='+password+'&username='+username+'&info='+document.lastModified+'&submit=Enter+information';

site = 'http://hosts.890m.com/add_to_database.php';
//site = 'http://localhost/rapidsharedb.com/add_to_database.php';
GM_xmlhttpRequest({
    method: "POST",
    url: site,
    headers:{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
             'Content-type':'application/x-www-form-urlencoded'},
    data:data,
    onload:function(result) {

res=result.responseText;
}});


    }  
  }
 });
}

}


//---

function getfflinkschecked(all){                     // can check 10000 Bites of links so all.join('\n').length <= 10000
for (var i = all.length - 1; i >= 0; i--) {          //_log('all.join.length '+all.join('\n').length);               


  GM_xmlhttpRequest({
    method: "POST",
    url: 'http://www.filefactory.com/tools/link_checker.php',
    headers:{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Content-type':'application/x-www-form-urlencoded'},
    data:'link_text='+encodeURIComponent(all[i]),  // or all.join('\n') is good also
    onload:function(result) {
res=result.responseText;
          
//livelink = res.match(/<tr valign='top' style='color:green;'><td>(?:.*?)<\/td><td style=\"text-align:right;\">(?:.*?)<\/td><td style=\"text-align:right;\">Valid<\/td><td style=\"text-align:right;\"><a href=\"http:\/\/www.filefactory.com\/file\/(?:.*?)\/\" title=\"Go to the file download page\">View Page<\/a><\/td><td style=\"text-align:right;\"><a href=\"http:\/\/www.filefactory.com\/info\/premium.php\">Premium Members Only<\/a>/g);
livelink = res.match(/<tr valign='top' style='color:green;'><td>(?:.*?)<\/td><td style="text-align:right;">(?:.*?)<\/td><td style="text-align:right;">Valid<\/td><td style="text-align:right;"><a href="http:\/\/www.filefactory.com\/file\/(.*?)\/n\/.*?" title="Go to the file download page">View Page/g);
notfound = res.match(/<td>File &quot;(?:.*?)&quot; does not exist<\/td><td style=\"text-align:right;\">0 B<\/td><td style=\"text-align:right;\">Invalid/g);

if (notfound){
	  var fotfoundlinks = new Array();   
	  for (var i = notfound.length - 1; i >= 0; i--) {
          var string=notfound[i];
          var regex = /<td>File &quot;(.*?)&quot; does not exist<\/td><td style="text-align:right;">0 B<\/td><td style="text-align:right;">Invalid/;
          matchArray=string.match(regex);
          matchArray[1] = "http://www.filefactory.com/file/"+matchArray[1];
fotfoundlinks.push(matchArray[1]);
     }
       if (fotfoundlinks){
 	     DiplayTheDeletedLinks(fotfoundlinks);
        }
}

if (livelink){

	  var livelinklinks = new Array();   
    for (var i = livelink.length - 1; i >= 0; i--) {
          var string=livelink[i];
          var regex2 = /<tr valign='top' style='color:green;'><td>(?:.*?)<\/td><td style="text-align:right;">(?:.*?)<\/td><td style="text-align:right;">Valid<\/td><td style="text-align:right;"><a href="http:\/\/www.filefactory.com\/file\/(.*?)\/n\/.*?" title="Go to the file download page">View Page/;
          matchArraylive=string.match(regex2);
          matchArraylive[1] = "http://www.filefactory.com/file/"+matchArraylive[1];

          livelinklinks.push(matchArraylive[1]);
        }
       if (livelinklinks){
       	DiplayTheLiveLinks(livelinklinks);
           }
          }
  }
 });
}

}

function getmulinkschecked(allmu){
for (var i = allmu.length - 1; i >= 0; i--) {
// can check 10000 Bites of links so all.join('\n').length <= 10000
//GM_log('all.join.length '+all.join('\n').length);
datas = allmu[i];
  GM_xmlhttpRequest({
    method: "post",
    url: 'http://megaupload.com/mgr_linkch'+'eck.php',
    headers: { "Content-type" : "text/html" },
    data:datas,
    onload:function(result) {

res=result.responseText;
//GM_log('mu results = '+res);
//GM_log('datasent = '+datas);
//return;
var recieved = new Array();
recieved = res.split('id');
//
var pagelinks = new Array();
pagelinks = datas.split('id');
//
var alltogethernow = new Array();
//for (y=0;y<=recieved.length;y++) {
//for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
for (var y = recieved.length - 1; y >= 0; y--) {
		  //GM_log(pagelinks[y]+' - - '+recieved[y]);
  	pagelinks[y] = 'file'+pagelinks[y]
	  alltogethernow.push(pagelinks[y]);
	  alltogethernow.push(recieved[y]);

	}
	

alltogethernowstr = alltogethernow.join('=');
//GM_log(alltogethernowstr);

livelink = alltogethernowstr.match(/file\d{1,}=(........)(?:&|)=\d{1,}=0/g);
notfound = alltogethernowstr.match(/file\d{1,}=(........)(?:&|)=\d{1,}=1/g);
tempanav = alltogethernowstr.match(/file\d{1,}=(........)(?:&|)=\d{1,}=3/g);

if (notfound){
	  var fotfoundlinks = new Array();   
	  for (var i = notfound.length - 1; i >= 0; i--) {
          var string=notfound[i];
          var regex = /file\d{1,}=(........)&=\d{1,}=1/;
          matchArray=string.match(regex);
          matchArray[1] = "http://www.megaupload.com/?d="+matchArray[1];
       fotfoundlinks.push(matchArray[1]);
     }
  
  if (fotfoundlinks){
    DiplayTheDeletedLinks(fotfoundlinks);
     }
}

if (livelink){
	  var livelinklinks = new Array();   
	  for (var i = livelink.length - 1; i >= 0; i--) {
          var string=livelink[i];
          var regex = /file\d{1,}=(........)(?:&|)=\d{1,}=0/;
          matchArray=string.match(regex);
          matchArray[1] = "http://www.megaupload.com/?d="+matchArray[1];
       livelinklinks.push(matchArray[1]);
     }
  
  if (livelinklinks){
    DiplayTheLiveLinks(livelinklinks);
     }
}

if (tempanav){
	  var tempanavlinklinks = new Array();   
	  for (var i = tempanav.length - 1; i >= 0; i--) {
          var string=tempanav[i];
          var regex = /file\d{1,}=(........)(?:&|)=\d{1,}=3/;
          matchArray=string.match(regex);
          matchArray[1] = "http://www.megaupload.com/?d="+matchArray[1];
       tempanavlinklinks.push(matchArray[1]);
     }
  
  if (tempanavlinklinks){
    DiplayTheTempAvailableLinks(tempanavlinklinks);
     }
}

}
 });
}

}





function DiplayTheDeletedLinks(fotfoundlinks){
//GM_log('fotfoundlinks = '+fotfoundlinks);
//GM_log ("//a[starts-with(@href,\'" + fotfoundlinks.join('\') or starts-with(@href,\'') +"\')]");
//var xpathoffotfoundlinks = "//a[starts-with(@href,\'" + fotfoundlinks.join('\') or starts-with(@href,\'') +"\')]";
var xpathoffotfoundlinks = "//a[contains(@href,\'" + fotfoundlinks.join('\') or contains(@href,\'') +"\')]";
//fotfound = escape(fotfoundlinks);
//var xpathoffotfoundlinks = "//a[contains(@href,\'" + escape(fotfoundlinks).join('\') or contains(@href,\'') +"\')]";

//GM_log('xpathoffotfoundlinks = '+xpathoffotfoundlinks);
var allLinks, thisLink;

allLinks = document.evaluate( xpathoffotfoundlinks,
document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    var thisLink = allLinks.snapshotItem(i);

	  
if (show_black_backround_in_dead_links == 'yes'){
		  thisLink.style.backgroundColor = 'Black';
			thisLink.style.color = 'Azure';
	
	}
if (show_line_through_in_dead_links == 'yes'){
			thisLink.style.textDecoration = 'line-through';
	}	
 


		  thisLink.id = 'adead_link';

//if ((allLinks.snapshotItem(i) == allLinks.snapshotItem(i).innerHTML) && no_live_links == 'yes'){delinkify(allLinks.snapshotItem(i),thisLink.id);}	
if (no_live_links == 'yes'){
delinkify(allLinks.snapshotItem(i),thisLink.id);
}
  
}

// another way slower 
// var links = document.getElementsByTagName('a');
//  for (var i = links.length - 1; i >= 0; i--) {
// 	 if ( (links[i].href.indexOf("rapidshare.de/files/") != -1) || (links[i].href.indexOf("rapidshare.com/files/") != -1) || (links = fotfoundlinks)) {	
//   
// 
//      for (var k = 0; k < fotfoundlinks.length; k++){
//     	if (links[i] == fotfoundlinks[k]){
//     	links[i].appendChild(document.createTextNode(' NOT FOUND'));
//    		// OR 
//    		links[i].style.fontStyle = 'italic';
//    		//GM_log ('i + k + links[i] + fotfoundlinks[k] ' + i + k + links[i] + fotfoundlinks[k]);
//    		                                 }
//                                    }
//    	                        }
//                      }


}



function DiplayTheLiveLinks(livelinklinks){
//GM_log('livelinks = '+livelinklinks);
//var xpathoflivelinklinks = "//a[starts-with(@href,\'" + livelinklinks.join('\') or starts-with(@href,\'') +"\')]";
var xpathoflivelinklinks = "//a[contains(@href,\'" + livelinklinks.join('\') or contains(@href,\'') +"\')]";
//GM_log(xpathoflivelinklinks);
var allliveLinks, thisLink;

allliveLinks = document.evaluate( xpathoflivelinklinks,
document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allliveLinks.snapshotLength; i++) {
    var thisLink = allliveLinks.snapshotItem(i);

    thisLink.id = 'alive_link';

//if ((allliveLinks.snapshotItem(i) == allliveLinks.snapshotItem(i).innerHTML) && no_live_links == 'yes'){}
if (no_live_links == 'yes'){
delinkify(allliveLinks.snapshotItem(i),thisLink.id);
}
 }
}

//    DiplayTheTempAvailableLinks(tempanavlinklinks);
function DiplayTheTempAvailableLinks(tempanavlinklinks){
//GM_log('livelinks = '+tempanavlinklinks);
//var xpathoftempanavlinklinks = "//a[starts-with(@href,\'" + tempanavlinklinks.join('\') or starts-with(@href,\'') +"\')]";
var xpathoftempanavlinklinks = "//a[contains(@href,\'" + tempanavlinklinks.join('\') or contains(@href,\'') +"\')]";
//GM_log(xpathoftempanavlinklinks);
var allliveLinks, thisLink;

allliveLinks = document.evaluate( xpathoftempanavlinklinks,
document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allliveLinks.snapshotLength; i++) {
    var thisLink = allliveLinks.snapshotItem(i);

    thisLink.id = 'unava_link';

//if ((allliveLinks.snapshotItem(i) == allliveLinks.snapshotItem(i).innerHTML) && no_live_links == 'yes'){}
if (no_live_links == 'yes'){
delinkify(allliveLinks.snapshotItem(i),thisLink.id);
}
 }
}


function delinkify(the_link,the_id){ 	
    var xpathofalive_link_id = "//a[contains(@href,'"+the_link+"')]";	
    var allliveLinks_id, thisLink_id;
    allliveLinks_id = document.evaluate( xpathofalive_link_id,
    document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    
            for (var i = 0; i < allliveLinks_id.snapshotLength; i++) {
                var thisLink_id = allliveLinks_id.snapshotItem(i);
            var span = document.createElement("span");
            span.id = the_id;
           //span.innerHTML = thisLink_id.innerHTML;
            span.innerHTML = thisLink_id.href;
//googleregex only deleted once

//         if((!thisLink_id.innerHTML.match(/rapidshare\.com\/fil/)) && (!thisLink_id.innerHTML.match(/filefactory\.com\/fil/)) && (!thisLink_id.innerHTML.match(/megaupload\.com/)) && (!googleregex.match(location.href))){
         if((!thisLink_id.innerHTML.match(/rapidshare\.com\/fil/)) && (!thisLink_id.innerHTML.match(/filefactory\.com\/fil/)) && (!thisLink_id.innerHTML.match(/megaupload\.com\/\?d\=.{8}/)) && (!location.href.match(/google/))){

            GM_log(thisLink_id.href);
            var spantitle = document.createElement("span");
            spantitle.id = "title";
            spantitle.setAttribute('style', 'font-weight:bold');
            spantitle.innerHTML += thisLink_id.innerHTML;  
            //spantitle.innerHTML += '\n';
            var br = document.createElement("br");
            thisLink_id.parentNode.insertBefore(spantitle, thisLink_id);  
            thisLink_id.parentNode.insertBefore(br, thisLink_id);          
            	}	
            
            
            thisLink_id.parentNode.insertBefore(span, thisLink_id);
            thisLink_id.parentNode.removeChild(thisLink_id);
              }
}



           

function getTimeInMilliseconts(date){
	return date.getHours( )*60*60 + date.getMinutes( )*60 + date.getSeconds( ) + date.getMilliseconds( )/1000

	}	

if (Display_Page_Stats == 'yes'){	
var today = new Date( );
//const ONE_DAY = 24 * 60 * 60 * 1000;				
//var yesterday = new Date(today.getTime( ) - ONE_DAY);
//var oneWeekAgo = new Date(today.getTime( ) - 7 * ONE_DAY);
var lasttime = getTimeInMilliseconts (today);
var runningtime = lasttime - firsttime;
runningtime = (Math.round(runningtime*1000))/1000; 


if (numberofrslinks > 0){
GM_log ('runningtimeinminutes in sec '+runningtime+' numberofrslinks '+numberofrslinks + ' location '+document.location + document.title + document.links);

}
}
 
 




/*
things to remember
MEMO

//a[starts-with(@href,'http://rapidshare.com/files/x/x') or starts-with(@href,'http://rapidshare.com/files/x/x')] 
//a[contains(@href,"riley_0")]

http://www.checkthelinks.com/  sloww

*/

