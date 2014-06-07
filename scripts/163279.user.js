// ==UserScript==
// @id             newznab-c23e42a5-96c6-42c6-80c5-2d3dde1c1a2b@scriptish
// @name           newznab-nzbget
// @version        1.2.3
// @updateURL      https://userscripts.org/scripts/source/163279.user.js
// @namespace      
// @author         Prinz
// @description    Add nzbget Download Link to newznab web sites
// @require	       http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include        /^https?://(www\.)?[^/]+\.[^/]+/books|(browse|details\/[^/]+\/[^/]+|movies(\/browse|\/[^/]+)?(\?imdb=\d*)?|music|console|search\/[^/]+(\/)?|(myshows|mymovies)\/browse(aired)?(\?ob=&.*)?|series\/\d+(#S\d+|#Posted)?)(\?(t=\d{4,5}|offset=\d+)(&.*)?)?$/
// @run-at         document-end
// ==/UserScript==

// exit script if we are not on the newznab site
if ((typeof unsafeWindow.RSSTOKEN === "undefined") || (typeof unsafeWindow.UID === "undefined") || (typeof unsafeWindow.SERVERROOT === "undefined"))
{return;}

///////////////////////////// Constants (DO NOT CHANGE) ////////////////////////////

var prio_very_high = 100;
var prio_high = 50;
var prio_normal = 0;
var prio_low = -50;
var prio_very_low = -100;

///////////////////////////// Settings ////////////////////////////

		var nzbgetHost = 'localhost';   // NZBGet's IP address
		var nzbgetPort  = '6789';       // NZBGet's Port
		var nzbgetPass = 'tegbzn6789';  // NZBGet's Password
		
		var cat_prios = [
							// Here you can set a NZBGet Category and Priority for each Newznab Category
							// [DON'T CHANGE, NZBGet_Category, NZBGet_Priority]
							// NZBGet_Category = A Category defined in NZBGet's Settings or Empty String for No Category
							// NZBGet_Priority = prio_very_low, prio_low, prio_normal, prio_high, prio_very_high
							['1000','',prio_normal], // 	Console
							['1010','',prio_normal], // 	Console/NDS
							['1020','',prio_normal], // 	Console/PSP
							['1030','',prio_normal], // 	Console/Wii
							['1040','',prio_normal], // 	Console/XBox
							['1050','',prio_normal], // 	Console/XBox 360
							['1060','',prio_normal], // 	Console/Wiiware
							['1070','',prio_normal], // 	Console/XBox 360 DLC
							['2000','Movies',prio_low], // 	Movies
							['2010','Movies',prio_low], // 	Movies/Foreign
							['2020','Movies',prio_low], // 	Movies/Other
							['2030','Movies',prio_low], // 	Movies/SD
							['2040','Movies',prio_low], // 	Movies/HD
							['2050','Movies',prio_low], // 	Movies/BluRay
							['2060','Movies',prio_low], // 	Movies/3D
							['3000','Music',prio_normal], // 	Audio
							['3010','Music',prio_normal], // 	Audio/MP3
							['3020','Music',prio_normal], // 	Audio/Video
							['3030','Music',prio_normal], // 	Audio/Audiobook
							['3040','Music',prio_normal], // 	Audio/Lossless
							['4000','Software',prio_normal], // 	PC
							['4010','Software',prio_normal], // 	PC/0day
							['4020','Software',prio_normal], // 	PC/ISO
							['4030','Software',prio_normal], // 	PC/Mac
							['4040','Software',prio_normal], // 	PC/Mobile-Other
							['4050','Software',prio_normal], // 	PC/Games
							['4060','Software',prio_normal], // 	PC/Mobile-iOS
							['4070','Software',prio_normal], // 	PC/Mobile-Android
							['5000','Series',prio_high], // 	TV
							['5020','Series',prio_high], // 	TV/Foreign
							['5030','Series',prio_high], // 	TV/SD
							['5040','Series',prio_very_high], // 	TV/HD
							['5050','Series',prio_high], // 	TV/Other
							['5060','Series',prio_high], // 	TV/Sport
							['6000','XXX',prio_very_low], // 	XXX
							['6010','XXX',prio_very_low], // 	XXX/DVD
							['6020','XXX',prio_very_low], // 	XXX/WMV
							['6030','XXX',prio_very_low], // 	XXX/XviD
							['6040','XXX',prio_very_low], // 	XXX/x264
							['7000','',prio_very_low], // 	Other
							['7010','',prio_very_low], // 	Misc
							['7020','',prio_very_low], // 	EBook
							['7030','',prio_very_low]  // 	Comics
		];

		// non default categories for specific sites
		// this has priority over the default category list
		var custom_cat_prios = [
									// Here you can set a NZBGet Category and Priority for each Newznab Category
									// [newznab_url, newznab_category_number, NZBGet_Category, NZBGet_Priority]
									// newznab_url = url for newznab site that has the non default category (lower case)
									// newznab_category_number = the custom category number of the site
									// NZBGet_Category = A Category defined in NZBGet's Settings or Empty String for No Category
									// NZBGet_Priority = prio_very_low, prio_low, prio_normal, prio_high, prio_very_high
									// newztown.co.za custom categories
									['newztown.co.za','1080','PS3',prio_normal], // Console/PS3
									['newztown.co.za','5070','Anime',prio_normal], // TV/Anime
									['newztown.co.za','5080','Docu',prio_normal], // TV/Documentary
									['newztown.co.za','7010','Mags',prio_normal], // Books/Mags
									['newztown.co.za','8010','',prio_normal], // Misc
									// nzbs.org custom categories
									['nzbs.org','1080','PS3',prio_normal], // Console/PS3
									['nzbs.org','2070','Movies',prio_normal], // Movies/3D
									['nzbs.org','2010','Movies',prio_normal], // Movies/DVD
									['nzbs.org','2060','Movies',prio_normal], // Movies/Foreign
									['nzbs.org','2050','Movies',prio_normal], // Movies/Other
									['nzbs.org','2020','Movies',prio_normal], // Movies/WMV-HD
									['nzbs.org','2030','Movies',prio_normal], // Movies/XVid
									['nzbs.org','2040','Movies',prio_normal], // Movies/x264
									['nzbs.org','5090','Series',prio_normal], // TV/BoxHD
									['nzbs.org','5070','Series',prio_normal], // TV/BoxSD
									['nzbs.org','5010','Series',prio_normal], // TV/DVD
									['nzbs.org','5080','Series',prio_normal], // TV/Foreign
									['nzbs.org','5060','Series',prio_normal], // TV/Other
									['nzbs.org','6020','XXX',prio_normal], // XXX/Clip
									['nzbs.org','6060','XXX-IMGSET',prio_normal], // XXX/IMGSET
									['nzbs.org','6050','XXX',prio_normal] // XXX/Pack
								];

///////////////////////////////////////////////////////////////////

cur_m = document.URL.match(/\?t=(\d+)/);

if (cur_m)
{cur_cat = cur_m[1];}
else
{
t_m = document.URL.match(/\/(my)?movies(\/browse)?/);
t_mu = document.URL.match(/\/music/);
t_c = document.URL.match(/\/console/);
t_s = document.URL.match(/\/(myshows|series)/);
t_b = document.URL.match(/\/books/);
if (t_m)
{cur_cat = 2000}
else if (t_mu)
{cur_cat = 3000}
else if (t_c)
{cur_cat = 1000}
else if (t_s)
{cur_cat = 5000}
else if (t_b)
{cur_cat = 7020}
else
{cur_cat = 0}
}

jQuery.fn.outerHTML = function() {
    return $('<div>').append( this.eq(0).clone() ).html();
};

var server_url = unsafeWindow.SERVERROOT.match(/http(s)?:\/\/(www\.)?([^/]*)(\/)?$/)[3].toLowerCase()

function get_cat_def(cat) {
// search custom categories first
for (var i=0; i<custom_cat_prios.length; i++) {
    if (server_url != custom_cat_prios[i][0]) {
		continue;
	}
	if (custom_cat_prios[i][1] == cat) {
		return [custom_cat_prios[i][2],custom_cat_prios[i][3]];
	}
}
// search default categories
for (var i=0; i<cat_prios.length; i++) {
    if (cat_prios[i][0] == cat) {
		return [cat_prios[i][1],cat_prios[i][2]];
	}
}
return ['',prio_normal];
}

function send_to_nzbget(ele) {
var oh = $(ele).attr("ohref");
var ma = oh.match(/getnzb\/([^/]*)(\/)?([^/]*)?/);
if (!ma)
{return;}
var nu = '';
var nn = '';
if (ma[2] == '/')
{
var nu = unsafeWindow.SERVERROOT + "getnzb/" + ma[1] + ".nzb&i=" + unsafeWindow.UID + "&r=" + unsafeWindow.RSSTOKEN;
var nn = decodeURIComponent(ma[3]) + ".nzb";
}
else
{
var nu = unsafeWindow.SERVERROOT + "getnzb/" + ma[1] + ".nzb&i=" + unsafeWindow.UID + "&r=" + unsafeWindow.RSSTOKEN;
if (document.URL.search(/^https?:\/\/(www\.)?[^/]+\.[^/]+\/details\//) != -1)
{var nn = $('#wrapper').find('H1').text() + ".nzb";}
else
{var nn = $(ele).parents('tr').find('a[class="title"]').text() + ".nzb";}
}


if (document.URL.search(/^https?:\/\/(www\.)?[^/]+\.[^/]+\/details\//) != -1)
{
var ca_e = $('#wrapper').find('a[href^="/browse?t="]').first();
}
else
{var ca_e = $(ele).parents('tr').find('a[href^="/browse?t="]').first();}

if ((ca_e) && (ca_e.length == 1))
{
var ca = ca_e.attr('href');
var ca_m = ca.match(/\?t=(\d+)/);
if (ca_m)
{cur_cat = ca_m[1];}
}


var url = 'http://'+nzbgetHost+':'+nzbgetPort +'/jsonrpc';

var request = {};
request.method = "appendurl";
cat_def = get_cat_def(cur_cat);
request.params = [nn, cat_def[0], cat_def[1], false, nu];

function make_base_auth(user, password) {
  var tok = user + ':' + password;
  var hash = btoa(tok);
  return "Basic " + hash;
}

var auth = make_base_auth('nzbget',nzbgetPass);

var aObj = $(ele);
$.ajax({type: 'POST',url: url,beforeSend : function(req) {req.setRequestHeader('Authorization', auth);}, data: JSON.stringify(request),success: function () {$(aObj).text('OK').replaceWith(function(){ return $(this).text() }).unbind('click');},error: function () {$(aObj).text('ERROR')},dataType: "json",xhrFields: {withCredentials: true},crossDomain: true});

}
if (document.URL.search(/^https?:\/\/(www\.)?[^/]+\.[^/]+\/details\//) != -1)
{dp = true;}
else
{dp = false;}

if (document.URL.search(/^https?:\/\/(www\.)?usenet\-crawler\.com.*/) != -1)
{uc = true;}
else
{uc = false;}

sv1 = $('a[href^="/getnzb/"]');
sv2 = $('a[href^="getnzb/"]');

if (sv1.length>0)
{se = sv1;}
else if (sv2.length>0)
{se = sv2;}
else
{return;}

se.each(function(){
  var ne = $(this).before($(this).outerHTML());
  if (!dp)
  {ne.wrap('<div />');}
  ne.attr("ohref",this.href).attr("href","#").attr('title','Sent to NZBGet').text(' NZBGet').click(function(){send_to_nzbget($(this));return false;});
  if (uc)
  {ne.parent().css('margin-top','5px');}
});