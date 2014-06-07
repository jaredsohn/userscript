// ==UserScript==
// @name           Facebook Email Search Links
// @namespace      troynt+fb-email-search@gmail.com
// @description    Appends FB links after email addresses for FB search.
// @include *
// @exclude *facebook.com*
// ==/UserScript==

// Last updated Aug 9th, 2011 

/*	=OPTIONS
--------------------------------------*/
var DOMAINS = 'com|se|fi|no|de|nu|nl|fr|be|au|pl|dk|ru|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum';
//var DOMAINS = 'edu' // uncomment for school domains only!
var SHOW_IMAGES = 1;
//END OF OPTIONS

if(unsafeWindow.console) var GM_log = unsafeWindow.console.log;

var email_regexp = new RegExp('mailto:(.*@.*\.('+DOMAINS+'))', "i");
function insertAfter(newElm,elm){
	var clone = elm.cloneNode(true);
	elm.parentNode.insertBefore(clone,elm);
	elm.parentNode.replaceChild(newElm,elm);
}

var emails = document.evaluate(
  "//a[starts-with(@href,'mailto:')]",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

var fb_search_url = 'http://www.facebook.com/search.php?type=users&q=';
var fb_img = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0E%00%00%00%0E%08%02%00%00%00%90*%BA%86%00%00%00%2CtEXtCreation%20Time%00Fri%2018%20Jul%202008%2016%3A31%3A09%20-0500%9E!%1E%04%00%00%00%07tIME%07%D8%07%12%14!%228Y(M%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD~%FC%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%7BIDATx%DAcL%AC%5Cs%EB%C1%1B%06B%40MA%84%99%5B%D6%89%A0%3A%20x%FB%E1%1B%0B.9Uy%E1%EE2O%11An%20%DB%26j%26%90d%C2%A5%14%AE%0E%0Ep%9A%8Al%1E%04%E04%15%130ZG%CE%40%13%3A%B2%2C%1DM%04b6%16%07%BCy%FF%15%EE%00%08%1B%A7%A9%C8f%93%E9V%12%94%B2pq%B2i(%89%E1%926%D2%96%810n%DC%7BEJ%60%11%9F%5C%00%08%3B%23%FE%CC%2B%BA%C8%00%00%00%00IEND%AEB%60%82";

var emails_done = {};

function add_fb_link(email,img)
{
	var fb_link = document.createElement('a');
	fb_link.href = fb_search_url + email;
	fb_link.title = 'Search for '+ email + ' on Facebook';
	fb_link.target = '_blank';
	fb_link.appendChild(document.createTextNode('FB'));
	fb_link.innerHTML = '<img style="vertical-align:middle;border:0; margin-left:.5em;" src="'+fb_img+'" alt="FB" />';

	if( img && SHOW_IMAGES )
		fb_link.innerHTML += '<img src="'+ img +'" />'

	var emails = document.evaluate(
	  "//a[starts-with(@href,'mailto:"+email+"')]",
	  document,
	  null,
	  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	  null);

	for (var i = 0; i < emails.snapshotLength; i++) {
		var a = emails.snapshotItem(i);
		insertAfter(fb_link,a);
	}
}

for (var i = 0; i < emails.snapshotLength; i++) {
	var a = emails.snapshotItem(i);
	var email = a.href.split('?')[0].split(',')[0].match(email_regexp);
	
	if( a && email )
	{
		email = email[1];
		var link_url = fb_search_url + encodeURIComponent(email);
		
		if( !emails_done[email] )
		{
			emails_done[email] = 1;
			
			GM_xmlhttpRequest({
				method: 'GET',
				url: link_url,
				headers: {
					'User-agent': window.navigator.userAgent
				},
				onload: function(resp,email)
				{
					//console.log('sending ajax request');
					if( resp.status == 200 && resp.responseText.match('UIImageBlock_Content') )
					{
						var foundmail = resp.finalUrl.match(/q=(.*)/)[1];
						//console.log('found '+decodeURIComponent(foundmail));
						var txt = resp.responseText;
						var matches = txt.match('http:\/\/profile.ak.fbcdn.net\/(.*).jpg');
						var img = null;
						if( matches && matches.length == 2 )
						{
							img = matches[0];
						}
						add_fb_link(decodeURIComponent(foundmail),img);
					}else{
						//console.log('no match for '+email);
					}
				}
			});
		}
	}
}