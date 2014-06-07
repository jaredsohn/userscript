// ==UserScript==
// @name           The Cavern Links Checker
// @namespace      http://userscripts.org/scripts/show/29222
// @include        http://*
// @exclude        http://*badongo.com/*
// @exclude        http://*depositfiles.com/*
// @exclude        http://*easy-share.com/*
// @exclude        http://*filefactory.com/*
// @exclude        http://*mediafire.com/*
// @exclude        http://*megashare.com/*
// @exclude        http://*megashares.com/*
// @exclude        http://*megaupload.com/*
// @exclude        http://www*.megaupload.com/*
// @exclude        http://*netload.in/*
// @exclude        http://*uploaded.to/*
// @exclude        http://*rapidshare.com/*
// @exclude        http://*rapidshare.de/*
// @exclude        http://*ziddu.com/*
// @exclude        http://*zshare.net/*
// @exclude        http://*userscripts.org/*
// @exclude        *xml_dump.php*
// @exclude        *phpMyAdmin*
// @exclude        *deleterecord.php*

// ==/UserScript==
// version                     1.43 11 Dec 2008
var local_version = new Number(1.43);

////////////////////////////////////////////////////////////////////////////////////////////////////////
//	Variables
////////////////////////////////////////////////////////////////////////////////////////////////////////
var all = [];
var color_red_link = "";
var color_green_link = "";
var hosts = [];
var imgs = [];
//var myrapidshareRegExp0 = /http\:\/\/rapidshare\.com\/files\/\d{4,}\/.*?\..*?/;
//var myrapidshareRegExp1 = /^.*?http:\/\/rapidshare\.com\/files\/\d{4,}\/.*?\..*?/;
//var myrapidshareRegExp2 = /^.*?http%3A%2F%2Frapidshare\.com%2Ffiles%2F\d{4,}%2F.*?\..*?/;
var numberofrslinks = 0;
var other_alive = [];
var other_dead = [];
var other_link_qty = 0;
var other_links = [];
var redirs = [];

////////////////////////////////////////////////////////////////////////////////////////////////////////
//	Check to see if a new version exists
////////////////////////////////////////////////////////////////////////////////////////////////////////
GM_xmlhttpRequest({
	method: "GET",
	url: 'http://userscripts.org/scripts/show/29222',
	headers:{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Content-type':'application/x-www-form-urlencoded'},
	data:'',
	onload:function(result) {
		var res = result.responseText;
		//GM_log(res);
		var start_pos = res.indexOf("*Version");
		var stop_pos = res.indexOf("*", start_pos + 1);
		var server_version = new Number(0);
		server_version = res.substr(start_pos + 8, (stop_pos - start_pos - 8 ));
		if (server_version > local_version){
			alert("There is a new version of The Cavern Links Checker. Redirecting to the install page");
			location.replace("http://userscripts.org/scripts/source/29222.user.js");
		}
	}
});

////////////////////////////////////////////////////////////////////////////////////////////////////////
//	Hosts
//   [0] name to categorize links
//   [1] search string to hit on
//   [2] file_is_alive search string
//	 [3] file_is_dead search string -- Sometimes it's easier to match on these
////////////////////////////////////////////////////////////////////////////////////////////////////////

hosts.push (["badongo.com",
			 "BADONGO\.COM\/FILE\/\\d+",
			 /publisher\'s virtual Drive/gi,
			 ""
			 ]);
hosts.push (["depositfiles.com",
			 "DEPOSITFILES\.COM\/(?:\\w\\w\/|)FILES\/\\w+",
			 /all downloading slots for your country|download the File|Free downloading mode|depositfiles\.com\/images\/speed_small\.gif/gi,
			 ""
			 ]);
hosts.push (["easy-share.com",
			 "EASY-SHARE\.COM",
			 /FREE DOWNLOAD MODE/,
			 ""
			 ]);				 
hosts.push (["filefactory.com",
			 "HTTP:\/\/WWW\.FILEFACTORY\.COM",
			 /Here are your download options/,
			 ""
			 ]);				 
hosts.push (["mediafire.com",
			 "MEDIAFIRE\.COM",
			 /Click here to start download|you requested/gi,
			 ""
			 ]);				 
hosts.push (["megashare.com",
			 "MEGASHARE\.COM\/\\d+",
			 /Select your download/,
			 ""
			 ]);
hosts.push (["megashares.com",
			 "MEGASHARES\.COM",
			 /Your Download Passport is/gi,
			 ""
			 ]);
hosts.push (["megaupload.com",
			 /HTTP:\/\/MEGAUPLOAD\.COM|HTTP:\/\/WWW\.MEGAUPLOAD\.COM/gi,
			 /\/gui\/c_dnl\.gif|gui\/c_dnl\.swf/gi,
			 ""
			 ]);
hosts.push (["netload.in",
			 "HTTP:\/\/NETLOAD\.IN",
			 /header_login_background.gif/gi,
			 ""
			 ]);
hosts.push (["rapidshare.com",
			 "HTTP\:\/\/RAPIDSHARE\.COM\/FILES",
			 "",
			 ""
			 ]);
hosts.push (["rapidshare.de",
			 "HTTP\:\/\/RAPIDSHARE\.DE\/FILES",
			 /Choose download-type/,
			 ""
			 ]);
hosts.push (["uploaded.to",
			 "HTTP:\/\/UPLOADED\.TO",
			 "",
			 /File doesn\'t exist/gi
			 ]);			 
hosts.push (["ziddu.com",
			 "WWW\.ZIDDU\.COM\/DOWNLOAD",			 
			/\/images\/download-download-img\.gif/gi,
			 "",
			 ]);
hosts.push (["zshare.net",
			 "ZSHARE\.NET\/DOWNLOAD",
			 /last download/gi,
			 ""
			 ]);			 

////////////////////////////////////////////////////////////////////////////////////////////////////////
//	Regular expressions
////////////////////////////////////////////////////////////////////////////////////////////////////////
var all_rapidshare_regex = /(http\:|^.*?http:|^.*?http%3A)\/\/rapidshare\.com\/files\/\d{4,}\/.*?\..*?/gi;
var cavern_regex = /http:\/\/www\.thecavernforum/gi;
var imgs_regex = /IMAGESHACK\.US|PHOTOBUCKET\.COM|TINYPIC\.COM|WEBSHOTS\.COM/gi;
var img_exts_regex = /.gif|.jpg|.png/gi;
var redirs_regex = /BUX\.TO|KIJM7\.9HZ\.COM|LINK-PROTECTOR\.COM|LINKBUCKS\.COM|LINKIN\.US|LIX\.IN|PROTECTLINKS\.COM|RAPIDSAFE\.NET|RAPIDSHARR\.COM|TINYURL\.COM|URLHAWK|USERCASH\.COM|WLINK.US\.COM/gi;

////////////////////////////////////////////////////////////////////////////////////////////////////////
//	Inline Images + GM Styles
////////////////////////////////////////////////////////////////////////////////////////////////////////
alive_link_png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2AMJCQY36Sc4vgAAAlRJREFUeNpV0r9PE3EABfD3veu1lJYr15ZCoBHBqJBAMEbjL0hYFAkyOAmJMUYd/Q+cXF1wYPQPILppYkKIRARiMDGoaAKimBaKHMWDXnu93venE0Tf9Ib3tg/BP7m3NGgwxtKcM4vyIKSk4BBqnwux9/LGKjvckcNy9/1Akgk2ZJHMWNyw+qWUMSGZ51R2FzbdX1NSyOnZWznn6HRn8UqSCv6gLdz58GSsL2voURJIirAWhh+U1fLO4tbKztdJIvHsw/1NR7/97pJBOR9tDXc+6rMGsg4vkd3AhkMdVJgLounkdKLHdL1S13ZpdyMzbK5pnNF0I0mNn4r3Ze3AJrZvo0zL8KkPyil6rTOgipFzrRezLXVt4zWKtBbwWjIeTgyEQlHiUhepcBpNkSaYehxX20Yw2HYd3VYP6iNRYhrpAeojGfJqvs7rRIyKGpSUGOm4iYgWwX7wB72ps/hWXMZCbgaNkUYQrseUr3SNB0JQRj0DBnSlYWN/DcfNEzifuYzVvS94vf4cVeoiBB2ScY8IiBBnytk7KM5XG8qj9SRClrbnUKNVZKLNWMjPwKkWkYk146BSUbZrz0PC0ZuHzaBYLokq9S90p3pMJRnJl35gtfgZQnAko0lY4WY1+2lu63s+N0EE+agXXrkydc3czjtF7noHXccSx82mWIY0hBpgRVMIalK9WX67tfJzfZJo5EVuouAdieh4kk3KQA21J1rGmuoy/UToMSG5t+vaC5u/7Smikenc04LzHyMAaH+cNcBVGgyWClSIgHAA+2DYy00Wjuz9Bce5MucW9xnuAAAAAElFTkSuQmCC';
adead_link_png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2AMJCQkjdGXwDAAAAcpJREFUeNptkj9PFHEQhp/ZBcIhxyKHYgNCYUxogE0OpdDGxsQCY6e5ggS1Mn4Ce621u7MCYqOdX4DkSLTBqwyNiQmJBiJiDjmWP/ub1+IAMXGqmTx5M5nJY5wpwRiQHPfoL2rG8PVksDOBlKRYZWgwxcwkIQlc0o+fDe3sPu6E1dOQIGWg/yUT4zOUBiLtHYAHFBy6YvRrW+Hzl4/e/P2kAJ8iwRhJscrE+AzDwxG3Z2E/oO9bKMvhzj104aLZ1dFr9PZUWzDWASQMDaYqDZjdvAWzd2HkMlpcJKpUsMlJdHiI3i1Ffr4v9d29pEMnt7UyfOkNNjKKTU8Tl8tghq+sEGqvUZwjZA5EAiShPIetLXxhASSIY3An1Gr4xkabq70iar9OkOeoWCSqVMAM8hzMiObnIUnQ0RFyR0DkgNylzhh7cB+bmsLrdQ7n5gj1OlG5TPxoHro7kUsC4mdQUB5u0NdziW/r5q2M/PkLfG2NsLwMkRHevyVkWQib26t+FJYMIIOUvt5XdmXkunXEke/sQchRCNDdRfAQ8vXND97af1qCxqkRLUj9XKFq/cUUMMmRQHKFZquh7OBhCRr/aATQ/I97foxKZ9z7A9QA5voyr3dtAAAAAElFTkSuQmCC';
redir_link_png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAMCAIAAACx5EmIAAAABGdBTUEAALGPC%2FxhBQAAAuNJREFUSEvVVFtIk2EY%2FldeOCTzQiqzwIWoFEFCqRUJ00Kdu%2BgijA6yqKAbO1xUlumkolBc%2B5da6cwxxSAtcTLxkBSIJ9B1QM3S7EKzYAkeMCoievrfb9%2FcdFsLusmPn5%2F39Dzv87%2Ff938yAMKyW5JoTA2hUIfSUnoMejT0UdDPmoJWi09Aby3yjf6K%2Fy3%2FtAa6GncKgZz%2BYmnai56rzf762Ki%2B9QusBVCd81fsNW%2BH5uJfAQ%2Buh7DOQ%2FQrIyl44YxHCQhM4k7HI5jN6HjrwrRVwyR99zhBnsxhahhtbGdqqzD5AZUV6Bkh1xP4vIWoWlibuQnEyCAo0NzFmaVUlRkjM9xdYBuZw4loBCT6EF3Zhd5ODL6GXMDmk1SkPwRhJRITSd8NNvvsJLLj4qFYS4bUMW8nH4Njr6I3wTKJsmNLgeJhyiYk0FvfiaGHbGMDsENDtBGSvQrxWyloHqDIAlvjOG6mIPyAD9ELJyQuFmNSzQwhT9%2FH7Cxy06iBg%2BtMLRkv73LRBSkQYnhKkcmo570DzzdQUsxEaDIZ6mAEq8m4d4TqHStrO6l3NOJsUsFRxGb5EF33Bg9yqPpWO6voIzs0DCGrEbkFkVGYnaCI1c6yY15Ea8r%2BBKx2O2NSXbIcQfuoPmMDVii5Jmsu%2FwCpEWcDHp%2BFMt%2BH6GEWP7WNYLZvfNKlbLPqtVBfAb5TKruRIgPlXkQfr2AUdkp5AnPZAbNcw8Z4pjUcgUx00X7XpC%2FshhDEJ83ZgAkbmhZdaG63R7%2FzY%2BicrCEnR0l06en0vlTPIuxMp6YiIoSMZz%2Bh3QUhjLfJKOYUlz2A1xmJSkXvzBIqy2NUe9m%2BhwiQhSFtD0UaPi5lS5NDkHtMenoUoohpZ%2FxdD8QijM6T32qCwYBWNm%2FHqi%2BGTo9fwG0Rn4HBdpRbKG4U0T3qKvMEdtURVZ3zusAP3ClBoYlDpJRBxPuv3HVn67bAyFo4l%2FMPcI%2F99%2FayFP0b9B9I5enpru8AAAAASUVORK5CYII%3D';
ok_image_link_png = 'data:image/png;base64,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'
bad_image_link_png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAAAOCAIAAAApPjzOAAAABGdBTUEAALGPC/xhBQAABCNJREFUWEftln9M1GUcx7/MbDaEln+0asmyzVuycKNW1vrBghULSPyjyMFa12kc3lEehkyYuXYtfxzxY3CDOrQQ22zgwoZoP0VHoWs2TJuFJWWNYbQif6VJ3avn89z3PL9w4MEf/sWzZ8f7+3k+v573836eEQcY0yMqA4qa6RGVAWOal/EYmKZmXG2EqdndQOFG8Sos5NszfPEeq+umLqi9zdbwM+Tl0fPr1BPGEtnXhdPJuVhcx/fZWU9ZfWg5TI1sphHOqjeZbSfxpmHcOvUiqxdZw88J44cGp54wlsj2NdL8UCyuY3wCz9CsT27p7Zc7D1PT08br2+Bvyd46gC8LY76ZILBGTiPwWSRftRvHci5ewuWkTx9T7w6cLtxuev+Qz1fTI+HyfYGyMvE82kFxHYP7KSyiuVtW7A5erolkVoVWFuOunqhW8CchWs2gdYe7XpPm/wSng+IrckpvRTjLI95dmylyS7e6WTz3SeATBfQHeWE+s9KtqpFzTtIyslKTfwszk/H7mWmQtUkc0gzx2bCBeA06z3K8TkB9A57FAi6AN8NKzaDYt/azdZmApDTyHxGgZmWF/ObpyzvbwJZN0ztS615PlFodw/CD+Jf4KckWoAyXR4iaRBvr1wtYVCor63QhZUlJEKBGi0PAWw08epsAxW/5YyY1fZeoyiVpqZUaOedkKzV3oyqr4FwXlZXkP6hT6xsXOCKeI92Cd2kF723C5zJ3ewLeeNxKzZAsbf+F7W6zP/ojeR4ymFeguxnB58M2Q5YWFqHuxqhaX8LKVIybqK2kxi+rzwVGU6NUo0b+XK7PgP/Ex6flGTr10g6q9PmVB/C9bdrPd4mlSx0pbHZwf8lVqUmBkxJT8Aqlq/DVUbOR030ROkLb6w7yprp9SkdtBPcJ+HkCalaEqTksoOkbaSLjBmzLzNbveYqL8LBB8gr4cXStA/DiAuLm4V1LaQWNjbTtG03N79pgtxGfZWb4KMQWzDDI9Apo8TNHa1bNo0oAnQI6deSeCnJ8V6XmLrPd3FoBmSpRqml5oEyA90nJeBCy402NrNPKHIiZmsBhyZM+iwVKIz0S+/6pMEfFUWrt/5ctBWFyjwhoveJpD12o0DP8vHoylGq0UhKXCBj+QPDn/7DbT9zNJlnKsvZTOCZLn5wX48ctbGq2UvNSCsYcU4FbTlChXqYE8Tj1tcmukciAfveGtPzUbKiV3z3DjGj5qLl4ubZ/Fwk3WxgQe+A4gWfDGzsooErxCikGCTkC7HeYeTLvxJgdpdaHv2m3haab/V0zfehPq8c8GIVz1MuiVA+nvycpLJD2Q2L56xhzw5ZUu5nhRm3xHuBpFXidlRpLkQk/VrnY0Ssewzsl3VexR07e81rWGtPd5P8brl4S1pGBp33y251MxLWsNaav/wG6GRXYoAbWagAAAABJRU5ErkJggg=='

GM_addStyle("#alive_link {background:transparent url("+alive_link_png+") no-repeat scroll 100% 50%;padding-right:17px;}");
GM_addStyle("#adead_link {background:transparent url("+adead_link_png+") no-repeat scroll 100% 50%;padding-right:17px;}");
GM_addStyle("#redir_link {background:transparent url("+redir_link_png+") no-repeat scroll 100% 50%;padding-right:65px;}");
GM_addStyle("#ok_image_link {background:transparent url("+ok_image_link_png+") no-repeat scroll 100% 50%;padding-right:120px;}");
GM_addStyle("#bad_image_link {background:transparent url("+bad_image_link_png+") no-repeat scroll 100% 50%;padding-right:95px;}");

////////////////////////////////////////////////////////////////////////////////////////////////////////
//	Process links
////////////////////////////////////////////////////////////////////////////////////////////////////////
linkify();
var links = document.getElementsByTagName('a');
var bad_images = [];
var good_images = [];
var redirectors = [];
for (var i = 0; i < links.length; i++){
	var urll = links[i].href;
	// New Link identifier and categorizer
	urll = urll.replace(/%2F/gi,'/');
	urll = urll.replace(/%3A/gi,':');
	urll = urll.replace(/\?killcode=[\d]*/gi,'');
	if (urll.search(/HTTP:\/\/WWW\.THECAVERNFORUM\.COM|Javascript\:|www\.invision(board|power)\.com|^$/gi) == -1) {
			//Check for a valid image link
			if (urll.toUpperCase().substr(-4).search(img_exts_regex) != -1){
				//Image links
				if (document.URL.search(cavern_regex) != -1){
					if (links[i].href.toUpperCase().search(imgs_regex) != -1) {
						display_flag(urll, "OK");
					} else {
						display_flag(urll, "BAD");
					}
				}
			} else if (links[i].href.toUpperCase().search(redirs_regex) != -1){    //Check to see if it is a redirector link
				display_flag(urll, "REDIR");
			} else {
				//Host file links
				if (links[i].href.search(all_rapidshare_regex) != -1){
					var urll = links[i].href;
					numberofrslinks++;
					urll = urll.replace(/^.*?http:\/\/rapidshare/gi,'http://rapidshare');
					urll = urll.replace(/^.*?http%3A%2F%2Frapidshare/gi,'http://rapidshare');
					urll = urll.replace(/\?killcode=[\d]*/gi,'');
					urll = urll.replace(/%2F/gi,'/');
					urll = urll.replace(/%3A/gi,':');
					var myString = ''+numberofrslinks+'';
					if (myString.search(/\d00/) != -1){
						all.push('xxxczxczxcsasdasdasdx4234');
					}
						all.push(urll);
				} else {
					for (var ii = 0; ii < hosts.length; ii++){
						if (links[i].href.toUpperCase().search(hosts[ii][1]) != -1) {
							other_links.push(urll);
							other_link_qty = other_link_qty + 1;
							other_alive.push(hosts[ii][2]);
							other_dead.push(hosts[ii][3]);
						}
					}
				}
			}

	}
}
all = all.join();
all = all.replace(/,/gi,'\n');
var all=all.split("xxxczxczxcsasdasdasdx4234");
if (numberofrslinks > 0){
	get_rs_links_checked(all);
}

other_link_check(other_links);

////////////////////////////////////////////////////////////////////////////////////////////////////////
//	LB Routine
////////////////////////////////////////////////////////////////////////////////////////////////////////
if (document.URL == "http://www.thecavernforum.org/forums/linkbot/linkbot.php"){
	var allDivs, thisDiv
	var allLinks, thisLink;
	var ih, divTitle;

	allDivs = document.evaluate( "//div[@class='gm_hide']",
		document, 
		null, 
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
		null); 

	for (var i = 0; i < allDivs.snapshotLength; i++) {
		thisDiv = allDivs.snapshotItem(i);
		GM_log("-----------------------------------------------------------------------------------------------------------------");
		divTitle = thisDiv.title;
		ih = thisDiv.innerHTML;
		//Process all links in the Div
		allLinks = document.evaluate( './/a',
			thisDiv, 
			null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
			null);
		var bad = 0;
		var good = 0;
		var linkHref = "";
		var other = 0;
		var totalLinks = 0;
		for (var ii = 0; ii < allLinks.snapshotLength; ii++) {
			thisLink = allLinks.snapshotItem(ii);
			linkHref = thisLink.href
			linkID = thisLink.id
			//GM_log("First thisLink.id: " + thisLink.id);
			switch (linkID){
				case "adead_link":
					bad = bad + 1;
					break;
				case "alive_link":
					good = good + 1;
					break;
				case "bad_image_link":
					bad = bad + 1
					break;
				case "ok_image_link":
					good = good + 1;
					break;
				case "redir_link":
					bad = bad + 1;
					break;
				default:
					other = other + 1;
			}
		}
		if (bad == 0){
			ih = "Good post: " + divTitle;
			thisDiv.innerHTML = ih;
		} else {
			thisDiv.innerHTML = thisDiv.innerHTML + "<br>Good = " + good + ", Bad = " + bad + ", Other = " + other + "<br>";
		}
	}
	alert("Done...");
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
//	Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////
function get_rs_links_checked(all){
	for (var i = all.length - 1; i >= 0; i--) {
	  	GM_xmlhttpRequest({
	    	method: "POST",
	    	url: 'http://rapidshare.com/cgi-bin/checkfiles.cgi',
	    	headers:{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Content-type':'application/x-www-form-urlencoded'},
	    	data:'urls='+encodeURIComponent(all[i]),
	    	onload:function(result) {
				res=result.responseText;
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
	  		}
	 	});
	}
}
function DiplayTheDeletedLinks(fotfoundlinks){
	var xpathoffotfoundlinks = "//a[contains(@href,\'" + fotfoundlinks.join('\') or contains(@href,\'') +"\')]";
	var allLinks, thisLink;
	allLinks = document.evaluate( xpathoffotfoundlinks, document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < allLinks.snapshotLength; i++) {
    	var thisLink = allLinks.snapshotItem(i);
    	display_flag(thisLink.href,"DEL");
  	}
}

function DiplayTheLiveLinks(livelinklinks){
	var xpathoflivelinklinks = "//a[contains(@href,\'" + livelinklinks.join('\') or contains(@href,\'') +"\')]";
	var allliveLinks, thisLink;
	allliveLinks = document.evaluate( xpathoflivelinklinks,	document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < allliveLinks.snapshotLength; i++) {
    	var thisLink = allliveLinks.snapshotItem(i);
    	display_flag(thisLink.href,"LIVE");
 	}
}

function other_link_check(other_links){
	for (var i = 0; i < other_links.length; i++){
		var file_is_alive = other_alive[i];
		var file_is_dead = other_dead[i];
		var URL = other_links[i];
		var ret = other_get_url(URL, file_is_alive, file_is_dead);
	}
}

function other_get_url(URL, file_is_alive, file_is_dead){
	GM_xmlhttpRequest({
		method: 'GET',
		url: URL,
		headers: { 'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)', }, 
		onload: function(responseDetails) {
			var ind = responseDetails.responseText.indexOf(file_is_alive);
			if (file_is_alive != ""){
				if (responseDetails.responseText.search(file_is_alive) == -1) {
					display_flag(URL, "DEL");
				} else {
					display_flag(URL, "LIVE");
				}
			} else {
				if (responseDetails.responseText.search(file_is_dead) != -1) {
					display_flag(URL, "DEL");
				} else {
					display_flag(URL, "LIVE");
				}
			}
		}
	});
}

function display_flag(URL, uType){
	var bgc = "";
	var lnk = "";
	var dec = "";
	switch(uType){
		case "DEL":
			bgc = color_red_link;
			lnk = 'adead_link';
			dec = '';
			break;
		case "BAD":
			bgc = color_red_link;
			lnk = 'bad_image_link';
			dec = '';
			break;
		case "OK":
			bgc = color_green_link;
			dec = "";
			lnk = 'ok_image_link';
			break;
		case "LIVE":
			bgc = color_green_link;
			dec = "";
			lnk = 'alive_link';
			break;
		case "REDIR":
			bgc = color_red_link;
			lnk = 'redir_link';
			dec = '';
			break;
		default:
			break;
	}
	var xpathotherlinks = "//a[contains(@href,\'"+URL+"\')]";
	var allLinks, thisLink;
	allLinks = document.evaluate( xpathotherlinks,	document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < allLinks.snapshotLength; i++) {
		var thisLink = allLinks.snapshotItem(i);
		thisLink.id = lnk;
		thisLink.style.backgroundColor = bgc;
		thisLink.style.textDecoration = dec;
	}
}

function linkify(){
	try{
		var regex = /((?:https?|ftp):\/\/[^\s'"'<>()]*|[-\w.+]+@(?:[-\w]+\.)+[\w]{2,6})/gi;
		var regex_ends = /\.rar\.html\b/gi;
		var altText, tekst, muligtLink;
		var ikkeTilladteTags = ['a', 'head', 'script', 'style', 'textarea', 'title', 'option', 'pre', 'code'];
		var path = "//text()[not(parent::" + ikkeTilladteTags.join(" or parent::") +")]";
		altText = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for(var i=0;i<altText.snapshotLength;i++){
			tekst = altText.snapshotItem(i);
			muligtLink = tekst.nodeValue;
			if(regex.test(muligtLink)){
				var span = document.createElement('span');
				var lastLastIndex = 0;
				regex.lastIndex = 0;
				for(myArray = null; myArray = regex.exec(muligtLink); ){
					var link = myArray[0];
					span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex, myArray.index)));
					var href = link;
					var prefix = '';
					if(href.length > 7){
						prefix = href.substring(0,7);
					}
					if(prefix.toLowerCase() != 'http://'){
						href = 'http://' + href;
					}
					
					//Fix links that end in .rar.html
					if (href.search(regex_ends) != -1){
						href = href.substr(0, href.length - 5);
					}
					var a = document.createElement('a');
					a.setAttribute('href', href);
					a.appendChild(document.createTextNode(href));
					span.appendChild(a);
					lastLastIndex = regex.lastIndex;
				}				
				span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex)));
				tekst.parentNode.replaceChild(span, tekst);
			}
		}
	} catch(e){alert(e);}
}
