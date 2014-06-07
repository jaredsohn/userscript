// ==UserScript==
// @name           The Cavern Links Checker
// @namespace	http://userscripts.org/scripts/show/29222
// @include		http://*
// @exclude		http://depositfiles.com/*
// @exclude		http://ezyfile.net/*
// @exclude		http://filefactory.com/*
// @exclude		http://gigabyteupload.com/*
// @exclude		http://hotfile.com/*
// @include		http://hotfile.com/dl/*
// @exclude		http://ifile.it/*
// @exclude		http://megaupload.com/*
// @exclude		http://netload.in/*
// @exclude		http://www.mediafire.com/*
// @exclude		http://www.megaftp.com/*
// @exclude		http://www.megaupload.com/*
// @exclude		http://www.netload.in/*
// @exclude		http://www.share-online.biz/*
// @exclude		http://www.teradepot.com/*
// @exclude		http://ugotfile.com/*
// @exclude		http://uploading.com/*
// @exclude		http://video.google.com/*
// @exclude		http://zshare.net/*
//
// @exclude		http://www.bitlet.org/*
// @exclude		http://www.evernote.com/*
// @exclude		https://www.evernote.com/*
// @exclude		http://www.tuenti.com/*
// @exclude		http://www.maknyos.com/*

// ==/UserScript==
// version                     3.010 16 July 2010
var local_version = new Number(3.010);


////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Variables
////////////////////////////////////////////////////////////////////////////////////////////////////////
var allHostsMatch = "";
var count = 0;
var flag_cavern = false;
var GMHosts = [];
var hosts = [];
var imgs = [];
var numberofrslinks = 0;
var other_alive = [];
var other_dead = [];
var other_maybe = [];
var other_link_qty = 0;
var other_links = [];
var redirs = [];
var rs_links = [];

if (document.URL.search(/http\:\/\/www\.thecavernforum\.com/gi) != -1){flag_cavern = true};

////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Read Preferences
////////////////////////////////////////////////////////////////////////////////////////////////////////
var pref1 = GM_getValue("tclc_p1", true);
var pref2 = GM_getValue("tclc_p2", true);
var pref3 = GM_getValue("tclc_p3", ""); if(pref3 == ""){pref3 = "paleGreen"};
var pref4 = GM_getValue("tclc_p4", ""); if(pref4 == ""){pref4 = "lightPink"};
var pref5 = GM_getValue("tclc_p5", true);
var pref6 = GM_getValue("tclc_p6", true);
var pref7 = GM_getValue("tclc_p7", ""); if(pref7 == ""){pref7 = "yellow"};
var pref8 = GM_getValue("tclc_p8", false);

////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Regular expressions
////////////////////////////////////////////////////////////////////////////////////////////////////////
var all_rapidshare_regex = /(http\:|^.*?http:|^.*?http%3A)\/\/rapidshare\.com\/files\/\d{4,}\/.*?\..*?/gi;
var cavern_regex = /http:\/\/www\.thecavernforum/gi;
var imgs_regex = /http:\/\/127.0.0.1|http:\/\/www\.thecavernforum|IMAGESHACK\.US|PHOTOBUCKET\.COM|TINYPIC\.COM|WEBSHOTS\.COM|WWW\.PAYPAL\.COM/gi;
var img_exts_regex = /.gif|.jpg|.png/gi;
var redirs_regex = /http:\/\/BUX\.TO|KIJM7\.9HZ\.COM|LINK-PROTECTOR\.COM|LINKBUCKS\.COM|\/LINKIN\.US|\/LIX\.IN|PROTECTLINKS\.COM|RAPIDSAFE\.NET|RAPIDSHARR\.COM|TINYURL\.COM|URLHAWK|USERCASH\.COM|WLINK\.US\.COM|http:\/\/UL\.TO|http:\/\/sn\.im|http:\/\/adf\.ly|www\.seriousfiles\.com|\/\/snipr\.com|thatsprime\.com\//gi;

////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Inline Images + GM Styles
////////////////////////////////////////////////////////////////////////////////////////////////////////
dead_png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2AMJCQkjdGXwDAAAAcpJREFUeNptkj9PFHEQhp/ZBcIhxyKHYgNCYUxogE0OpdDGxsQCY6e5ggS1Mn4Ce621u7MCYqOdX4DkSLTBqwyNiQmJBiJiDjmWP/ub1+IAMXGqmTx5M5nJY5wpwRiQHPfoL2rG8PVksDOBlKRYZWgwxcwkIQlc0o+fDe3sPu6E1dOQIGWg/yUT4zOUBiLtHYAHFBy6YvRrW+Hzl4/e/P2kAJ8iwRhJscrE+AzDwxG3Z2E/oO9bKMvhzj104aLZ1dFr9PZUWzDWASQMDaYqDZjdvAWzd2HkMlpcJKpUsMlJdHiI3i1Ffr4v9d29pEMnt7UyfOkNNjKKTU8Tl8tghq+sEGqvUZwjZA5EAiShPIetLXxhASSIY3An1Gr4xkabq70iar9OkOeoWCSqVMAM8hzMiObnIUnQ0RFyR0DkgNylzhh7cB+bmsLrdQ7n5gj1OlG5TPxoHro7kUsC4mdQUB5u0NdziW/r5q2M/PkLfG2NsLwMkRHevyVkWQib26t+FJYMIIOUvt5XdmXkunXEke/sQchRCNDdRfAQ8vXND97af1qCxqkRLUj9XKFq/cUUMMmRQHKFZquh7OBhCRr/aATQ/I97foxKZ9z7A9QA5voyr3dtAAAAAElFTkSuQmCC';
live_png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2AMJCQY36Sc4vgAAAlRJREFUeNpV0r9PE3EABfD3veu1lJYr15ZCoBHBqJBAMEbjL0hYFAkyOAmJMUYd/Q+cXF1wYPQPILppYkKIRARiMDGoaAKimBaKHMWDXnu93venE0Tf9Ib3tg/BP7m3NGgwxtKcM4vyIKSk4BBqnwux9/LGKjvckcNy9/1Akgk2ZJHMWNyw+qWUMSGZ51R2FzbdX1NSyOnZWznn6HRn8UqSCv6gLdz58GSsL2voURJIirAWhh+U1fLO4tbKztdJIvHsw/1NR7/97pJBOR9tDXc+6rMGsg4vkd3AhkMdVJgLounkdKLHdL1S13ZpdyMzbK5pnNF0I0mNn4r3Ze3AJrZvo0zL8KkPyil6rTOgipFzrRezLXVt4zWKtBbwWjIeTgyEQlHiUhepcBpNkSaYehxX20Yw2HYd3VYP6iNRYhrpAeojGfJqvs7rRIyKGpSUGOm4iYgWwX7wB72ps/hWXMZCbgaNkUYQrseUr3SNB0JQRj0DBnSlYWN/DcfNEzifuYzVvS94vf4cVeoiBB2ScY8IiBBnytk7KM5XG8qj9SRClrbnUKNVZKLNWMjPwKkWkYk146BSUbZrz0PC0ZuHzaBYLokq9S90p3pMJRnJl35gtfgZQnAko0lY4WY1+2lu63s+N0EE+agXXrkydc3czjtF7noHXccSx82mWIY0hBpgRVMIalK9WX67tfJzfZJo5EVuouAdieh4kk3KQA21J1rGmuoy/UToMSG5t+vaC5u/7Smikenc04LzHyMAaH+cNcBVGgyWClSIgHAA+2DYy00Wjuz9Bce5MucW9xnuAAAAAElFTkSuQmCC';
mayb_png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAOxJREFUeNqMkk8OwVAQxr+276kdCfuegGOIBTfgBhYsxAlIRMQJxAXEQl2EG5QLdFlSHTO0/raYZPLevPl+ne+lzwBgxEmyHsPcGW9hq5PNS8S9kPem4sKKDyIRuGvCxgU87wY0mgD3jk9wqGLg/nUBKlWg1QZ8HxgNCYc9MJ4YV5jBnOgsLigrlytNSql7LQNN8YkfUSg+9qwPzG9iudegT+h0jNdGlq3pTFOprKjb0x+9TEjuMV/o1N5Xe46Tfi5mNdMn/Bnyr8z4JXxEvUbYbVO5SKAz0+rPKVqg5N0lE8VqkCLOizjJiwADACqhr7BunfI1AAAAAElFTkSuQmCC';
redr_png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAMCAIAAACx5EmIAAAABGdBTUEAALGPC%2FxhBQAAAuNJREFUSEvVVFtIk2EY%2FldeOCTzQiqzwIWoFEFCqRUJ00Kdu%2BgijA6yqKAbO1xUlumkolBc%2B5da6cwxxSAtcTLxkBSIJ9B1QM3S7EKzYAkeMCoievrfb9%2FcdFsLusmPn5%2F39Dzv87%2Ff938yAMKyW5JoTA2hUIfSUnoMejT0UdDPmoJWi09Aby3yjf6K%2Fy3%2FtAa6GncKgZz%2BYmnai56rzf762Ki%2B9QusBVCd81fsNW%2BH5uJfAQ%2Buh7DOQ%2FQrIyl44YxHCQhM4k7HI5jN6HjrwrRVwyR99zhBnsxhahhtbGdqqzD5AZUV6Bkh1xP4vIWoWlibuQnEyCAo0NzFmaVUlRkjM9xdYBuZw4loBCT6EF3Zhd5ODL6GXMDmk1SkPwRhJRITSd8NNvvsJLLj4qFYS4bUMW8nH4Njr6I3wTKJsmNLgeJhyiYk0FvfiaGHbGMDsENDtBGSvQrxWyloHqDIAlvjOG6mIPyAD9ELJyQuFmNSzQwhT9%2FH7Cxy06iBg%2BtMLRkv73LRBSkQYnhKkcmo570DzzdQUsxEaDIZ6mAEq8m4d4TqHStrO6l3NOJsUsFRxGb5EF33Bg9yqPpWO6voIzs0DCGrEbkFkVGYnaCI1c6yY15Ea8r%2BBKx2O2NSXbIcQfuoPmMDVii5Jmsu%2FwCpEWcDHp%2BFMt%2BH6GEWP7WNYLZvfNKlbLPqtVBfAb5TKruRIgPlXkQfr2AUdkp5AnPZAbNcw8Z4pjUcgUx00X7XpC%2FshhDEJ83ZgAkbmhZdaG63R7%2FzY%2BicrCEnR0l06en0vlTPIuxMp6YiIoSMZz%2Bh3QUhjLfJKOYUlz2A1xmJSkXvzBIqy2NUe9m%2BhwiQhSFtD0UaPi5lS5NDkHtMenoUoohpZ%2FxdD8QijM6T32qCwYBWNm%2FHqi%2BGTo9fwG0Rn4HBdpRbKG4U0T3qKvMEdtURVZ3zusAP3ClBoYlDpJRBxPuv3HVn67bAyFo4l%2FMPcI%2F99%2FayFP0b9B9I5enpru8AAAAASUVORK5CYII%3D';
ok_img_png = 'data:image/png;base64,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'
bad_img_png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAAAOCAIAAAApPjzOAAAABGdBTUEAALGPC/xhBQAABCNJREFUWEftln9M1GUcx7/MbDaEln+0asmyzVuycKNW1vrBghULSPyjyMFa12kc3lEehkyYuXYtfxzxY3CDOrQQ22zgwoZoP0VHoWs2TJuFJWWNYbQif6VJ3avn89z3PL9w4MEf/sWzZ8f7+3k+v573836eEQcY0yMqA4qa6RGVAWOal/EYmKZmXG2EqdndQOFG8Sos5NszfPEeq+umLqi9zdbwM+Tl0fPr1BPGEtnXhdPJuVhcx/fZWU9ZfWg5TI1sphHOqjeZbSfxpmHcOvUiqxdZw88J44cGp54wlsj2NdL8UCyuY3wCz9CsT27p7Zc7D1PT08br2+Bvyd46gC8LY76ZILBGTiPwWSRftRvHci5ewuWkTx9T7w6cLtxuev+Qz1fTI+HyfYGyMvE82kFxHYP7KSyiuVtW7A5erolkVoVWFuOunqhW8CchWs2gdYe7XpPm/wSng+IrckpvRTjLI95dmylyS7e6WTz3SeATBfQHeWE+s9KtqpFzTtIyslKTfwszk/H7mWmQtUkc0gzx2bCBeA06z3K8TkB9A57FAi6AN8NKzaDYt/azdZmApDTyHxGgZmWF/ObpyzvbwJZN0ztS615PlFodw/CD+Jf4KckWoAyXR4iaRBvr1wtYVCor63QhZUlJEKBGi0PAWw08epsAxW/5YyY1fZeoyiVpqZUaOedkKzV3oyqr4FwXlZXkP6hT6xsXOCKeI92Cd2kF723C5zJ3ewLeeNxKzZAsbf+F7W6zP/ojeR4ymFeguxnB58M2Q5YWFqHuxqhaX8LKVIybqK2kxi+rzwVGU6NUo0b+XK7PgP/Ex6flGTr10g6q9PmVB/C9bdrPd4mlSx0pbHZwf8lVqUmBkxJT8Aqlq/DVUbOR030ROkLb6w7yprp9SkdtBPcJ+HkCalaEqTksoOkbaSLjBmzLzNbveYqL8LBB8gr4cXStA/DiAuLm4V1LaQWNjbTtG03N79pgtxGfZWb4KMQWzDDI9Apo8TNHa1bNo0oAnQI6deSeCnJ8V6XmLrPd3FoBmSpRqml5oEyA90nJeBCy402NrNPKHIiZmsBhyZM+iwVKIz0S+/6pMEfFUWrt/5ctBWFyjwhoveJpD12o0DP8vHoylGq0UhKXCBj+QPDn/7DbT9zNJlnKsvZTOCZLn5wX48ctbGq2UvNSCsYcU4FbTlChXqYE8Tj1tcmukciAfveGtPzUbKiV3z3DjGj5qLl4ubZ/Fwk3WxgQe+A4gWfDGzsooErxCikGCTkC7HeYeTLvxJgdpdaHv2m3haab/V0zfehPq8c8GIVz1MuiVA+nvycpLJD2Q2L56xhzw5ZUu5nhRm3xHuBpFXidlRpLkQk/VrnY0Ssewzsl3VexR07e81rWGtPd5P8brl4S1pGBp33y251MxLWsNaav/wG6GRXYoAbWagAAAABJRU5ErkJggg=='

if (pref2 != true){pref3 = pref4 = pref7 = ""};

GM_addStyle("#live_link {background:" + pref3 + " url("+live_png+") no-repeat scroll 100% 50%;padding-right:17px;}");
GM_addStyle("#dead_link {background:" + pref4 + " url("+dead_png+") no-repeat scroll 100% 50%;padding-right:17px;}");
GM_addStyle("#mayb_link {background:" + pref7 + " url("+mayb_png+") no-repeat scroll 100% 50%;padding-right:17px;}");
GM_addStyle("#redr_link {background:" + pref4 + " url("+redr_png+") no-repeat scroll 100% 50%;padding-right:65px;}");
GM_addStyle("#ok_img_link {background:" + pref3 + " url("+ok_img_png+") no-repeat scroll 100% 50%;padding-right:120px;}");
GM_addStyle("#bad_img_link {background:" + pref4 + " url("+bad_img_png+") no-repeat scroll 100% 50%;padding-right:95px;}");

////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Check to see if a new version exists
////////////////////////////////////////////////////////////////////////////////////////////////////////
//GM_setValue("checked_for_new_version", 20090101);
var d = new Date();
var dy = d.getFullYear();
var dm = d.getMonth() + 1;
var dd = d.getDate();
var ys = new String(dy);
var ms = new String(dm);
var ds = new String(dd);
if ( ms.length == 1 ) ms = "0" + ms;
if ( ds.length == 1 ) ds = "0" + ds;
ys = parseFloat(ys + ms + ds);

var upd = GM_getValue("checked_for_new_version", 0);
if(ys > upd){
    //alert("Need to check_for_new_version");
    GM_setValue("checked_for_new_version", ys);
    GM_xmlhttpRequest({
        method: "GET",
        url: 'http://docs.google.com/Doc?id=dgh8sg4s_23g4kqmnfv',
        headers:{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Content-type':'application/x-www-form-urlencoded'},
        data:'',
        onload:function(result) {
            var res = result.responseText;
            var start_pos = res.indexOf("*Version");
            var stop_pos = res.indexOf("*", start_pos + 1);
            var server_version = new Number(0);
            server_version = res.substr(start_pos + 8, (stop_pos - start_pos - 8 ));
            if (server_version > local_version){
                alert("There is a new version of The Cavern Links Checker. Redirecting to the install page");
                location.replace("http://userscripts.org/scripts/source/29222.user.js");
            }
            get_hosts();
        }
    });
} else {
    get_hosts();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Setup menu for TCLC preferences
////////////////////////////////////////////////////////////////////////////////////////////////////////
GM_registerMenuCommand("TCLC Preferences", show_prefs);
var div_prefs = document.createElement('div_prefs');
document.body.appendChild(div_prefs);
div_prefs.id = "div_prefs";

//Functions
function chk(ck){
	return (ck == true)?("checked"):("");
}

function update_prefs(){
	GM_setValue("tclc_p1", document.getElementById('p1').checked);
	GM_setValue("tclc_p2", document.getElementById('p2').checked);
	GM_setValue("tclc_p3", document.getElementById('p3').value);
	GM_setValue("tclc_p4", document.getElementById('p4').value);
	GM_setValue("tclc_p5", document.getElementById('p5').checked);
	GM_setValue("tclc_p6", document.getElementById('p6').checked);
	GM_setValue("tclc_p7", document.getElementById('p7').value);
	GM_setValue("tclc_p8", document.getElementById('p8').checked);
	window.location.reload();
	}
	
function all_hosts_enable(){
	var new_hosts = "";
	for (var i = 0; i < hosts.length; i++){
    	new_hosts = new_hosts + hosts[i][0] + "|";
	}
	GM_setValue("tclc_hosts_enabled", new_hosts);
	GMHosts = new_hosts;
	show_prefs()
}
function all_hosts_disable(){
	var new_hosts = "|";
	GM_setValue("tclc_hosts_enabled", new_hosts);
	GMHosts = "";
	show_prefs()
}

function filehosts_update(){
	GM_setValue("date_filehosts_loaded", 0);
	get_hosts();	
	alert("This may take a few seconds. You must re-open preferences to see updates.");
	window.location.reload();
}

function host_enable(){
	var host = document.getElementById('list_available').options[document.getElementById('list_available').selectedIndex].text;
	var key = GM_getValue("tclc_hosts_enabled", "");
	if (key == ""){
		GM_setValue("tclc_hosts_enabled", host + "|");
		GMHosts = GMHosts + host + "|";
	} else {
		GM_setValue("tclc_hosts_enabled", key + host + "|");
		GMHosts = key + host + "|";
	}
	show_prefs()
	}
function host_disable(){
	var old_hosts = GM_getValue("tclc_hosts_enabled", "");
	var selHost = document.getElementById('list_enabled').options[document.getElementById('list_enabled').selectedIndex].text;
	var new_hosts = "";
	var hostArray = old_hosts.split('|');
	for (var key in hostArray) {
		var aHost = hostArray[key];
	    if (aHost != selHost){
	    	new_hosts = new_hosts + aHost + "|";
	    }
	}
	GM_setValue("tclc_hosts_enabled", new_hosts);
	GMHosts = new_hosts;
	show_prefs()
	}
function show_prefs(){
    var t = new Array();
    var divL = (innerWidth - 720).toString();
    var divT = (innerHeight - 600).toString();
    
	var pref3 = GM_getValue("tclc_p3", ""); if(pref3 == ""){pref3 = "paleGreen"};
	var pref4 = GM_getValue("tclc_p4", ""); if(pref4 == ""){pref4 = "lightPink"};
	var pref7 = GM_getValue("tclc_p7", ""); if(pref7 == ""){pref7 = "yellow"};

    t.push('<div id="prefs_html" style = "position: fixed; top:' + divT + 'px; left:' + divL + 'px; width:700px; background-color: #EEEEEE;" >');
    t.push('	<table border=2 cellspacing=0 width=700px><tr><td><center><b>The Cavern Links Checker Preferences<b></center></td><td valign=top><center><button id="tclc_close_prefs" type="button" onClick="update_prefs()"><font size=-2><b>X</b></font></button></center></td></tr></table>');
    t.push('	<table border=2 cellspacing=0>');
    t.push('		<tr>');
    t.push('			<td width=175px>');
    t.push('				<center><b>Enabled Hosts</b><br>');
    t.push('				<select id="list_enabled" name="list_enabled" size=15>');
										for (var ii = 0; ii < hosts.length; ii++){
 											var host = hosts[ii][0];
 											if (GMHosts.indexOf(host + "|") != -1){
	t.push('									<option value="' + host + '">' + host + '</option>');
		    								}
										}
    t.push('				</select><br>');
    t.push('				<button id="tclc_host_disable" type="button" onClick="host_disable()">Disable Host</button>');
    t.push('				<button id="tclc_all_hosts_disable" type="button" onClick="all_hosts_disable()">All</button></center>');
   	t.push('			</td><td width=175px>');
    t.push('				<center><b>Available Hosts</b><br>');
    t.push('				<select id="list_available" name="list_available" size=15>');
 										for (var ii = 0; ii < hosts.length; ii++){
 											var host = hosts[ii][0];
 											if (GMHosts.indexOf(host + "|") == -1){
	t.push('									<option value="' + host + '">' + host + '</option>');
											} else {
											}
 										}
    t.push('				</select><br>');
    t.push('				<button id="tclc_host_enable" type="button" onClick="host_enable()">Enable Host</button>');
    t.push('				<button id="tclc_all_hosts_enable" type="button" onClick="all_hosts_enable()">All</button></center>');
	t.push('			</td><td width=350px>');
   	t.push('				<table border=0 cellpadding=0 cellspacing=0 >');
	t.push('					<tr align=left><td><font size=1><b>&nbsp;Enable Linkify</td><td><input type="checkbox" name="p1" id="p1" ' + chk(pref1) + '></b></font></td>');
	t.push('					<tr align=left><td><font size=1><b>&nbsp;Highlight Full Link</td><td><input type="checkbox" name="p2" id="p2" ' + chk(pref2) + '></b></font></td>');
	t.push('					<tr align=left><td><font size=1><b>&nbsp;Good Link Color</td><td><input type="text" name="p3" id="p3" value=' + pref3 + '></b></font></td>');
	t.push('					<tr align=left><td><font size=1><b>&nbsp;Bad Link Color</td><td><input type="text" name="p4" id="p4" value=' + pref4 + '></b></font></td>');
	t.push('					<tr align=left><td><font size=1><b>&nbsp;Maybe Link Color</td><td><input type="text" name="p7" id="p7" value=' + pref7 + '></b></font></td>');
	t.push('					<tr align=left><td><font size=1><b>&nbsp;Check bad image hosts</td><td><input type="checkbox" name="p5" id="p5" ' + chk(pref5) + '></b></font></td>');
	t.push('					<tr align=left><td><font size=1><b>&nbsp;Check for Redirectors</td><td><input type="checkbox" name="p6" id="p6" ' + chk(pref6) + '></b></font></td>');
	t.push('					<tr align=left><td><font size=1><b>&nbsp;MouseOver Mode</td><td><input type="checkbox" name="p8" id="p8" ' + chk(pref8) + '></b></font></td>');
	t.push('					<tr>&nbsp;</td>');
	t.push('					<tr>&nbsp;</td>');
	t.push('					<tr align=left><td><button id="tclc_filehosts_update" type="button" onClick="filehosts_update()">Update Filehosts now</button></td>');	
	t.push('					<tr></tr>');
	t.push('				</table>');
	t.push('			</td>');
   	t.push('		</tr>');
    t.push('	</table>');
    t.push('	<table border=2 cellspacing=0 width=700px><tr><td><center><b>The Cavern Links Checker Preferences<b></center></td><td valign=top><center><button id="tclc_close_prefs1" type="button" onClick="update_prefs()"><font size=-2><b>X</b></font></button></center></td></tr></table>');
    t.push('</div>');
	div_prefs.innerHTML = t.join('\n');

    var btn_close = document.getElementById("tclc_close_prefs");
    btn_close.addEventListener("click", update_prefs, false);

    var btn_close1 = document.getElementById("tclc_close_prefs1");
    btn_close1.addEventListener("click", update_prefs, false);

    var btn_host_enable = document.getElementById("tclc_host_enable");
    btn_host_enable.addEventListener("click", host_enable, false);
    
    var btn_host_disable = document.getElementById("tclc_host_disable");
    btn_host_disable.addEventListener("click", host_disable, false);
    
    var btn_all_hosts_enable = document.getElementById("tclc_all_hosts_enable");
    btn_all_hosts_enable.addEventListener("click", all_hosts_enable, false);
    
    var btn_all_hosts_disable = document.getElementById("tclc_all_hosts_disable");
    btn_all_hosts_disable.addEventListener("click", all_hosts_disable, false);
    
    var btn_filehosts_update = document.getElementById("tclc_filehosts_update");
    btn_filehosts_update.addEventListener("click", filehosts_update, false);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////

function get_hosts(){
	//GM_setValue("date_filehosts_loaded", 20090101);
	var d = new Date();
	var dy = d.getFullYear();
	var dm = d.getMonth() + 1;
	var dd = d.getDate();
	var ys = new String(dy);
	var ms = new String(dm);
	var ds = new String(dd);
	if ( ms.length == 1 ) ms = "0" + ms;
	if ( ds.length == 1 ) ds = "0" + ds;
	ys = parseFloat(ys + ms + ds);

	var upd = GM_getValue("date_filehosts_loaded", 0);
	if(ys > upd){
		//GM_log("Loading filehosts.");
	    GM_xmlhttpRequest({
	        method: "GET",
	        url: 'http://docs.google.com/View?id=dc2m5vn2_12fzsxn2p3',
	        headers:{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Content-type':'application/x-www-form-urlencoded'},
	        data:'',
	        onload:function(result) {
	            var res = result.responseText;
	            var res = res.split("===== Hosts =====");
	            var hosts_data = res[1];
	            GM_setValue("filehosts", hosts_data);		//Store the filehost info
	            GM_setValue("date_filehosts_loaded", ys);	//Update filehost load date
	            get_hosts_process();
				process_links();
	        }
	    });
	} else {
		//GM_log("No need to load filehosts.");
		get_hosts_process();
		process_links();
	}
}

function MouseOver(){
	other_alive = [];
	other_dead = [];
	other_maybe = [];
	other_link_qty = 0;
	other_links = [];
	rs_links = [];
	
	if (this.href.search(all_rapidshare_regex) != -1){
        rs_links.push(this.href);
	} else {
	    for (var ii = 0; ii < hosts.length; ii++){							//Slightly inefficient. Should only address enabled hosts.
	        if (this.href.search(hosts[ii][1]) != -1) {						//	Could join hosts array but then not sure how to get index
	        	if (GMHosts.indexOf(hosts[ii][0] + "|") != -1){				//	for alive/dead/maybe regexs.???
	        		other_links.push(this);
	                other_link_qty = other_link_qty + 1;
	                other_alive.push(hosts[ii][2]);
	                other_dead.push(hosts[ii][3]);
	                other_maybe.push(hosts[ii][4]);
	        	}
	        }
	    }
	}
	if (rs_links.length > 0){rs_link_check(rs_links)};
    if (other_links.length > 0){other_link_check(other_links)};
}

function get_hosts_process(){
	var hosts_data = GM_getValue("filehosts", 0).split("<br><br>");

	for (var i = 1; i < hosts_data.length - 1; i++){
		var host_dets = hosts_data[i].split("<br>");
		
		allHostsMatch = allHostsMatch + host_dets[1]
		if (i < hosts_data.length - 2){allHostsMatch = allHostsMatch + "|";}
		
		
		var hostStr = new RegExp(host_dets[1], "gi");
		var alive = new RegExp(host_dets[2], "gi");
		var dead = new RegExp(host_dets[3], "gi");
		var maybe = new RegExp(host_dets[4], "gi");
		hosts.push ([host_dets[0], hostStr, alive, dead, maybe]);
	}
	
	
	
	GMHosts = GM_getValue("tclc_hosts_enabled","");
	if (GMHosts == ""){
		for (var ii = 0; ii < hosts.length; ii++){
			var host = hosts[ii][0];
			GMHosts = GMHosts + host + "|";
		}
		GM_setValue("tclc_hosts_enabled", GMHosts);
	}	
}

function process_links(){
	if (pref1 == true)(linkify());
	var GMHosts = GM_getValue("tclc_hosts_enabled");
	var links = document.getElementsByTagName('a');
	var rs_links = [];
	
	for (var i = 0; i < links.length; i++){
	    var urll = links[i].href;
	    count = count + 1;
	    urll = urll.replace(/%2F/gi,'/');
	    urll = urll.replace(/%3A/gi,':');
	    //urll = urll.replace(/\?killcode=[\d]*/gi,'');
	    
	    //GM_log("urll: " + urll);
	    //GM_log("	match: " + urll.search(/(http:\/\/)*hotfile\.com/gi));
	
	    //Check for a valid image link
	    if (urll.substr(-4).search(img_exts_regex) != -1){ 					//Image links
	        if (pref5 == true && document.URL.search(cavern_regex) != -1){
	            if (links[i].href.search(imgs_regex) != -1) {
	                links[i].id = 'ok_img_link';
	            } else {
	                links[i].id = 'bad_img_link';
	            }
	        }
	    } else if (links[i].href.search(redirs_regex) != -1){    			//Redirector links
	        if (pref6 == true){links[i].id = "redr_link"};
	    } else {
	        if (pref8){links[i].addEventListener("mouseover", MouseOver, false)};
	        //Rapidshare file links
	        if (links[i].href.search(all_rapidshare_regex) != -1){
	        	links[i].id = "a" + count;
	            var urll = links[i].href;
	            numberofrslinks++;
	            var myString = ''+numberofrslinks+'';
	            if (myString.search(/\d00/) != -1){
	            	rs_links.push('>>split<<');
	            }
	           	rs_links.push(urll);
	        } else {
	        	//Other File Links
	        	//GM_log(allHostsMatch);
	        	//var aht_regex = new RegExp(allHostsMatch, "gi");
	        	//GM_log(aht_regex);
	        	//GM_log("Other Link: " + urll);
	        	//GM_log("Match: " + urll.search(aht_regex));
	        	
	        	//if (urll.search(aht_regex) > -1){GM_log("Match: " + urll.search(aht_regex));}



	            for (var ii = 0; ii < hosts.length - 1; ii++){							//Slightly inefficient. Should only address enabled hosts.
            		//GM_log(urll + "  -  " + (hosts[ii][1]) + "   ii: " + ii + "   hosts.length: " + hosts.length);
	            	if (urll.search(hosts[ii][1]) != -1) {					//	Could join hosts array but then not sure how to get index
	                
	                	//GM_log("Match: " + hosts[ii][1] + "   " + urll);
	                	if (GMHosts.indexOf(hosts[ii][0] + "|") != -1){				//	for alive/dead/maybe regexs.???
							links[i].id = "a" + count;
	                		other_links.push(links[i]);
	                        other_link_qty = other_link_qty + 1;
	                        other_alive.push(hosts[ii][2]);
	                        other_dead.push(hosts[ii][3]);
	                        other_maybe.push(hosts[ii][4]);
	                	}
	                }		                
	            }
			}
	    }
	}
	
	//GM_log("Done with process_links() part 1");
	
	if (pref8){
		//Do Nothing
	} else {
		rs_links = rs_links.join();
		rs_links = rs_links.replace(/,/gi,'\n');
		var rs_links = rs_links.split(">>split<<");
		if (rs_links.length > 0){rs_link_check(rs_links)};
		if (other_links.length > 0){other_link_check(other_links)};
	}
	
}

function rs_link_check(rs_links){
	if (GMHosts.indexOf("rapidshare.com|") != -1){
	    for (var i = rs_links.length - 1; i >= 0; i--) {
	          GM_xmlhttpRequest({
	            method: "POST",
	            url: 'http://rapidshare.com/cgi-bin/checkfiles.cgi',
	            headers:{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Content-type':'application/x-www-form-urlencoded'},
	            data:'urls='+encodeURIComponent(rs_links[i]),
	            onload:function(result) {
	                var res = result.responseText;
	                var notfound = res.match(/inexistent<\/td><\/tr><\/table>    \n<div class="downloadlink">http:\/\/rapidshare\.com\/files\/(\d*)\/.*<\/div>/g);
	                var livelink = res.match(/load<\/a><\/td><\/tr><\/table>    \n<div class="downloadlink">http:\/\/rapidshare\.com\/files\/(\d*)\/.*<\/div>/g);
	                if (notfound){
	                      var notfoundlinks = new Array();  
	                      for (var i = notfound.length - 1; i >= 0; i--) {
	                          var string=notfound[i];
	                          var regex = /inexistent<\/td><\/tr><\/table>    \n<div class="downloadlink">http:\/\/rapidshare\.com\/files\/(\d*)\/.*<\/div>/;
	                          matchArray=string.match(regex);
	                          notfoundlinks.push(matchArray[1]);
	                     }
	                       if (notfoundlinks){
	                           DiplayTheDeletedLinks(notfoundlinks);
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
	    rs_links = null;
	}
}
function DiplayTheDeletedLinks(notfoundlinks){
    var xpathofnotfoundlinks = "//a[contains(@href,\'" + notfoundlinks.join('\') or contains(@href,\'') +"\')]";
    var allLinks, thisLink;
    allLinks = document.evaluate( xpathofnotfoundlinks, document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var i = 0; i < allLinks.snapshotLength; i++) {
        var thisLink = allLinks.snapshotItem(i);
		thisLink.id = 'dead_link';
      }
}

function DiplayTheLiveLinks(livelinklinks){
    var xpathoflivelinklinks = "//a[contains(@href,\'" + livelinklinks.join('\') or contains(@href,\'') +"\')]";
    var allliveLinks, thisLink;
    allliveLinks = document.evaluate( xpathoflivelinklinks,    document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var i = 0; i < allliveLinks.snapshotLength; i++) {
        var thisLink = allliveLinks.snapshotItem(i);
		thisLink.id = 'live_link';
     }
}

function other_link_check(other_links){
    for (var i = 0; i < other_links.length; i++){
        var file_is_alive = other_alive[i];
        var file_is_dead = other_dead[i];
        var file_is_maybe = other_maybe[i];
        var URL = other_links[i].href;
        var URLid = other_links[i].id;
        
        //GM_log("	Other URL: " + URL);
        //GM_log("	Other file_is_alive: " + file_is_alive);
        //GM_log("	Other file_is_dead: " + file_is_dead);
        //GM_log("	Other file_is_maybe: " + file_is_maybe);
        
        var ret = other_get_url(URL, URLid, file_is_alive, file_is_dead, file_is_maybe);
    }
    other_links = null;
}

function other_get_url(URL, URLid, file_is_alive, file_is_dead, file_is_maybe){
	//When method was POST, some checks were invalid. They seemed to come back blank.
    GM_xmlhttpRequest({
        method: 'GET',
        url: URL,
        headers: { 'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)', },
        onload: function(responseDetails) {
            if (responseDetails.responseText.search(file_is_dead) > 0){
                document.getElementById(URLid).id = 'dead_link';
            } else if (responseDetails.responseText.search(file_is_alive) > 0){
                document.getElementById(URLid).id = 'live_link';
            } else if (responseDetails.responseText.search(file_is_maybe) > 0){
            	document.getElementById(URLid).id = 'mayb_link';
            } else {	//Unknown link
            	document.getElementById(URLid).id = 'dead_link';
            }
        }
    });
}

function linkify(){
    try{
        var regex = /((?:https?|ftp):\/\/[^\s'"'<>()]*|[-\w.+]+@(?:[-\w]+\.)+[\w]{2,6})/gi;
        var regex_exclude_html_trunc = /http:\/\/uploading\.com|http:\/\/letitbit.net|http:\/\/www\.gshare\.com|http:\/\/netload\.in/gi;
        var regex_ends = /\.rar\.html\b/gi;
        var mail_addr = /\@/;
        var altText, txt, muligtLink;
        //var OKTags = ['a', 'head', 'script', 'style', 'textarea', 'title', 'option', 'pre', 'code'];  //Removed to show links in code,pre,textarea blocks
        var OKTags = ['a', 'head', 'script', 'style', 'title', 'option', 'textarea'];
        var path = "//text()[not(parent::" + OKTags.join(" or parent::") +")]";
        altText = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for(var i=0;i<altText.snapshotLength;i++){
            txt = altText.snapshotItem(i);
            muligtLink = txt.nodeValue;
            if(regex.test(muligtLink)){            	
                var span = document.createElement('span');
                var lastLastIndex = 0;
                regex.lastIndex = 0;
                for(myArray = null; myArray = regex.exec(muligtLink); ){
                    var link = myArray[0];
                    if (mail_addr.test(link)){0
						//Do Nothing
                    } else {
                        span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex, myArray.index)));
                        var href = link;
                        var prefix = '';
                        if(href.length > 7){
                            prefix = href.substring(0,7);
                            if(prefix.toLowerCase() != 'http://' && prefix.toLowerCase() != 'https:/'){
                                href = 'http://' + href;
                            }
                        }
                        //Fix links that end in .rar.html
                        if (href.search(regex_exclude_html_trunc) == -1){
                            if (href.search(regex_ends) != -1){
                                href = href.substr(0, href.length - 5);
                            }
                        }
                        var a = document.createElement('a');
                        a.setAttribute('href', href);
                        var orig_href = href;
                        a.appendChild(document.createTextNode(href));
                        span.appendChild(a);
                        lastLastIndex = regex.lastIndex;
                    }
                }
                span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex)));
                txt.parentNode.replaceChild(span, txt);
            }
        }
    } catch(e){alert(e);}
}