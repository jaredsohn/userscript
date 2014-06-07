// ==UserScript==
// @name           The Cavern Adventure
// @namespace      
// @include        http://*
// @exclude        http://*userscripts.org/*
// @exclude        *xml_dump.php*
// @exclude        *phpMyAdmin*
// @exclude        *deleterecord.php*

// ==/UserScript==
// version                     2.1 19 Jun 2009
var local_version = new Number(2.1);

////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Variables
////////////////////////////////////////////////////////////////////////////////////////////////////////
var color_red_link = "lightPink";
var color_green_link = "paleGreen";
var flag_cavern = false;
var GMHosts = "";
var hosts = [];
var imgs = [];
var numberofrslinks = 0;
var other_alive = [];
var other_dead = [];
var other_links = [];
var other_links_elements = [];
var redirs = [];

//    Regular expressions
var all_rapidshare_regex = /(http\:|^.*?http:|^.*?http%3A)\/\/rapidshare\.com\/files\/\d{4,}\/.*?\..*?/gi;
var cavern_regex = /http:\/\/www\.thecavernforum/gi;
var imgs_regex = /http:\/\/www\.thecavernforum|IMAGESHACK\.US|PHOTOBUCKET\.COM|TINYPIC\.COM|WEBSHOTS\.COM/gi;
var img_exts_regex = /.gif|.jpg|.png/gi;
var redirs_regex = /BUX\.TO|KIJM7\.9HZ\.COM|LINK-PROTECTOR\.COM|LINKBUCKS\.COM|LINKIN\.US|LIX\.IN|PROTECTLINKS\.COM|RAPIDSAFE\.NET|RAPIDSHARR\.COM|TINYURL\.COM|URLHAWK|USERCASH\.COM|WLINK\.US\.COM|http:\/\/\:UL\.TO/gi;

//    Inline Images + GM Styles
alive_link_png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2AMJCQY36Sc4vgAAAlRJREFUeNpV0r9PE3EABfD3veu1lJYr15ZCoBHBqJBAMEbjL0hYFAkyOAmJMUYd/Q+cXF1wYPQPILppYkKIRARiMDGoaAKimBaKHMWDXnu93venE0Tf9Ib3tg/BP7m3NGgwxtKcM4vyIKSk4BBqnwux9/LGKjvckcNy9/1Akgk2ZJHMWNyw+qWUMSGZ51R2FzbdX1NSyOnZWznn6HRn8UqSCv6gLdz58GSsL2voURJIirAWhh+U1fLO4tbKztdJIvHsw/1NR7/97pJBOR9tDXc+6rMGsg4vkd3AhkMdVJgLounkdKLHdL1S13ZpdyMzbK5pnNF0I0mNn4r3Ze3AJrZvo0zL8KkPyil6rTOgipFzrRezLXVt4zWKtBbwWjIeTgyEQlHiUhepcBpNkSaYehxX20Yw2HYd3VYP6iNRYhrpAeojGfJqvs7rRIyKGpSUGOm4iYgWwX7wB72ps/hWXMZCbgaNkUYQrseUr3SNB0JQRj0DBnSlYWN/DcfNEzifuYzVvS94vf4cVeoiBB2ScY8IiBBnytk7KM5XG8qj9SRClrbnUKNVZKLNWMjPwKkWkYk146BSUbZrz0PC0ZuHzaBYLokq9S90p3pMJRnJl35gtfgZQnAko0lY4WY1+2lu63s+N0EE+agXXrkydc3czjtF7noHXccSx82mWIY0hBpgRVMIalK9WX67tfJzfZJo5EVuouAdieh4kk3KQA21J1rGmuoy/UToMSG5t+vaC5u/7Smikenc04LzHyMAaH+cNcBVGgyWClSIgHAA+2DYy00Wjuz9Bce5MucW9xnuAAAAAElFTkSuQmCC';
adead_link_png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2AMJCQkjdGXwDAAAAcpJREFUeNptkj9PFHEQhp/ZBcIhxyKHYgNCYUxogE0OpdDGxsQCY6e5ggS1Mn4Ce621u7MCYqOdX4DkSLTBqwyNiQmJBiJiDjmWP/ub1+IAMXGqmTx5M5nJY5wpwRiQHPfoL2rG8PVksDOBlKRYZWgwxcwkIQlc0o+fDe3sPu6E1dOQIGWg/yUT4zOUBiLtHYAHFBy6YvRrW+Hzl4/e/P2kAJ8iwRhJscrE+AzDwxG3Z2E/oO9bKMvhzj104aLZ1dFr9PZUWzDWASQMDaYqDZjdvAWzd2HkMlpcJKpUsMlJdHiI3i1Ffr4v9d29pEMnt7UyfOkNNjKKTU8Tl8tghq+sEGqvUZwjZA5EAiShPIetLXxhASSIY3An1Gr4xkabq70iar9OkOeoWCSqVMAM8hzMiObnIUnQ0RFyR0DkgNylzhh7cB+bmsLrdQ7n5gj1OlG5TPxoHro7kUsC4mdQUB5u0NdziW/r5q2M/PkLfG2NsLwMkRHevyVkWQib26t+FJYMIIOUvt5XdmXkunXEke/sQchRCNDdRfAQ8vXND97af1qCxqkRLUj9XKFq/cUUMMmRQHKFZquh7OBhCRr/aATQ/I97foxKZ9z7A9QA5voyr3dtAAAAAElFTkSuQmCC';
redir_link_png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAMCAIAAACx5EmIAAAABGdBTUEAALGPC%2FxhBQAAAuNJREFUSEvVVFtIk2EY%2FldeOCTzQiqzwIWoFEFCqRUJ00Kdu%2BgijA6yqKAbO1xUlumkolBc%2B5da6cwxxSAtcTLxkBSIJ9B1QM3S7EKzYAkeMCoievrfb9%2FcdFsLusmPn5%2F39Dzv87%2Ff938yAMKyW5JoTA2hUIfSUnoMejT0UdDPmoJWi09Aby3yjf6K%2Fy3%2FtAa6GncKgZz%2BYmnai56rzf762Ki%2B9QusBVCd81fsNW%2BH5uJfAQ%2Buh7DOQ%2FQrIyl44YxHCQhM4k7HI5jN6HjrwrRVwyR99zhBnsxhahhtbGdqqzD5AZUV6Bkh1xP4vIWoWlibuQnEyCAo0NzFmaVUlRkjM9xdYBuZw4loBCT6EF3Zhd5ODL6GXMDmk1SkPwRhJRITSd8NNvvsJLLj4qFYS4bUMW8nH4Njr6I3wTKJsmNLgeJhyiYk0FvfiaGHbGMDsENDtBGSvQrxWyloHqDIAlvjOG6mIPyAD9ELJyQuFmNSzQwhT9%2FH7Cxy06iBg%2BtMLRkv73LRBSkQYnhKkcmo570DzzdQUsxEaDIZ6mAEq8m4d4TqHStrO6l3NOJsUsFRxGb5EF33Bg9yqPpWO6voIzs0DCGrEbkFkVGYnaCI1c6yY15Ea8r%2BBKx2O2NSXbIcQfuoPmMDVii5Jmsu%2FwCpEWcDHp%2BFMt%2BH6GEWP7WNYLZvfNKlbLPqtVBfAb5TKruRIgPlXkQfr2AUdkp5AnPZAbNcw8Z4pjUcgUx00X7XpC%2FshhDEJ83ZgAkbmhZdaG63R7%2FzY%2BicrCEnR0l06en0vlTPIuxMp6YiIoSMZz%2Bh3QUhjLfJKOYUlz2A1xmJSkXvzBIqy2NUe9m%2BhwiQhSFtD0UaPi5lS5NDkHtMenoUoohpZ%2FxdD8QijM6T32qCwYBWNm%2FHqi%2BGTo9fwG0Rn4HBdpRbKG4U0T3qKvMEdtURVZ3zusAP3ClBoYlDpJRBxPuv3HVn67bAyFo4l%2FMPcI%2F99%2FayFP0b9B9I5enpru8AAAAASUVORK5CYII%3D';
ok_image_link_png = 'data:image/png;base64,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'
bad_image_link_png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAAAOCAIAAAApPjzOAAAABGdBTUEAALGPC/xhBQAABCNJREFUWEftln9M1GUcx7/MbDaEln+0asmyzVuycKNW1vrBghULSPyjyMFa12kc3lEehkyYuXYtfxzxY3CDOrQQ22zgwoZoP0VHoWs2TJuFJWWNYbQif6VJ3avn89z3PL9w4MEf/sWzZ8f7+3k+v573836eEQcY0yMqA4qa6RGVAWOal/EYmKZmXG2EqdndQOFG8Sos5NszfPEeq+umLqi9zdbwM+Tl0fPr1BPGEtnXhdPJuVhcx/fZWU9ZfWg5TI1sphHOqjeZbSfxpmHcOvUiqxdZw88J44cGp54wlsj2NdL8UCyuY3wCz9CsT27p7Zc7D1PT08br2+Bvyd46gC8LY76ZILBGTiPwWSRftRvHci5ewuWkTx9T7w6cLtxuev+Qz1fTI+HyfYGyMvE82kFxHYP7KSyiuVtW7A5erolkVoVWFuOunqhW8CchWs2gdYe7XpPm/wSng+IrckpvRTjLI95dmylyS7e6WTz3SeATBfQHeWE+s9KtqpFzTtIyslKTfwszk/H7mWmQtUkc0gzx2bCBeA06z3K8TkB9A57FAi6AN8NKzaDYt/azdZmApDTyHxGgZmWF/ObpyzvbwJZN0ztS615PlFodw/CD+Jf4KckWoAyXR4iaRBvr1wtYVCor63QhZUlJEKBGi0PAWw08epsAxW/5YyY1fZeoyiVpqZUaOedkKzV3oyqr4FwXlZXkP6hT6xsXOCKeI92Cd2kF723C5zJ3ewLeeNxKzZAsbf+F7W6zP/ojeR4ymFeguxnB58M2Q5YWFqHuxqhaX8LKVIybqK2kxi+rzwVGU6NUo0b+XK7PgP/Ex6flGTr10g6q9PmVB/C9bdrPd4mlSx0pbHZwf8lVqUmBkxJT8Aqlq/DVUbOR030ROkLb6w7yprp9SkdtBPcJ+HkCalaEqTksoOkbaSLjBmzLzNbveYqL8LBB8gr4cXStA/DiAuLm4V1LaQWNjbTtG03N79pgtxGfZWb4KMQWzDDI9Apo8TNHa1bNo0oAnQI6deSeCnJ8V6XmLrPd3FoBmSpRqml5oEyA90nJeBCy402NrNPKHIiZmsBhyZM+iwVKIz0S+/6pMEfFUWrt/5ctBWFyjwhoveJpD12o0DP8vHoylGq0UhKXCBj+QPDn/7DbT9zNJlnKsvZTOCZLn5wX48ctbGq2UvNSCsYcU4FbTlChXqYE8Tj1tcmukciAfveGtPzUbKiV3z3DjGj5qLl4ubZ/Fwk3WxgQe+A4gWfDGzsooErxCikGCTkC7HeYeTLvxJgdpdaHv2m3haab/V0zfehPq8c8GIVz1MuiVA+nvycpLJD2Q2L56xhzw5ZUu5nhRm3xHuBpFXidlRpLkQk/VrnY0Ssewzsl3VexR07e81rWGtPd5P8brl4S1pGBp33y251MxLWsNaav/wG6GRXYoAbWagAAAABJRU5ErkJggg=='

GM_addStyle("#alive_link {background:" + color_green_link + " url("+alive_link_png+") no-repeat scroll 100% 50%;padding-right:17px;}");
GM_addStyle("#adead_link {background:" + color_red_link + " url("+adead_link_png+") no-repeat scroll 100% 50%;padding-right:17px;}");
GM_addStyle("#redir_link {background:" + color_red_link + " url("+redir_link_png+") no-repeat scroll 100% 50%;padding-right:65px;}");
GM_addStyle("#ok_image_link {background:" + color_green_link + " url("+ok_image_link_png+") no-repeat scroll 100% 50%;padding-right:120px;}");
GM_addStyle("#bad_image_link {background:" + color_red_link + " url("+bad_image_link_png+") no-repeat scroll 100% 50%;padding-right:95px;}");
//Should probably be able to include background color here to save a few lines down below

if (document.URL.search(/http\:\/\/www\.thecavernforum\.com/gi) != -1){
    flag_cavern = true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Check to see if there are any updates
//		All checks only done once per day automatically. However, there will be a button in prefs to do so manually.
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
    //GM_log("Need to check_for_new_version");
    GM_setValue("checked_for_new_version", ys);
    GM_xmlhttpRequest({
        method: "GET",
        url: 'https://docs.google.com/Doc?docid=dc2m5vn2_6fg4mzbcb&hl',
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
        }
    });
} else {
    //GM_log("No Need to check_for_new_version");
}

//
var upd = 1.01;		//GM_getValue("tclc_host_version", 0);

var temp = 1;
if (temp == 0){
	//It's not that complicated: Either read the hosts from the internet host file, or from setValue.
	
//if(ys > upd){
    //alert("Need to check_for_new_hosts");
    //GM_setValue("checked_for_new_hosts", ys);
    GM_xmlhttpRequest({
        method: "GET",
        url: 'http://docs.google.com/Doc?docid=dc2m5vn2_4dj4f39gg&hl=en',
        headers:{'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey', 'Content-type':'text/plain'},
        data:'',
        onload:function(result) {
            var server_version = new Number(0);
            server_version = parse_file(result.responseText, "[version]", "[/version]");
            //var script_version = new Number(0);
            //var hosts_version = new Number(0);
            //var redirectors_version = new Number(0);
            

            //if (server_version > upd){
            	GM_log("Read from internet file");
	            var hosts_read = parse_file(result.responseText, "[hosts_allowed]", "[/hosts_allowed]");
	            hosts_read = hosts_read.replace(/\\74br\\76|\<br\>/gi,'\n');
	            GM_setValue("tclc_hosts", hosts_read);
	            all_startup();
	            // *** Would be nice to be able to trigger a page reload here
	            
			//} else {
				//Load hosts from GM_tclc_hosts
			//}
        }
    });
} else {
	GM_log("Just read from setValue");
	var hosts_read = GM_getValue("tclc_hosts","");
    var hostLines = hosts_read.split('\n');
    for (var i = 0; i < hostLines.length -1; i=i+5){
    	var reg1 = new RegExp(hostLines[i+2],"gi");
    	var reg2 = new RegExp(hostLines[i+3],"gi");
    	var reg3 = new RegExp(hostLines[i+4],"gi");
    	hosts.push([hostLines[i+1],reg1,reg2,reg3]);
    	GM_log("Pushed host: " + hostLines[i+1]);
    }
    all_startup();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////
function all_startup(){
	prefs_setup();
	check_images();
	linkify();
	process_links();
}

function check_images(){
	if (flag_cavern == true){
		var found = 0;
		var imgs = document.getElementsByTagName('img');
		for (var i = 0; i < imgs.length; i++) {
			var img = imgs[i].src;
			//GM_log("Testing image: " + img);
			if (img.search(imgs_regex) == -1) {
			  //GM_log("Image Bad: " + img);
			  found = 1;
			  var p = document.createElement('p');
			  p.innerHTML = "<div><img src='" + imgs[i].src + "' height=50px width=50px> " + imgs[i].src + ' <b><font size=+1>= Unapproved Image Host</font></b></div>';
			  //p.style.backgroundColor = color_red_link;
			  imgs[i].parentNode.insertBefore(p, imgs[i].nextSibling);
			  imgs[i].parentNode.removeChild(imgs[i]);
			}
		}
	}
}

function check_other_link(urlNum, URL, file_is_alive, file_is_dead){
	GM_log("Checking other link: " + URL);
	
    GM_xmlhttpRequest({
        method: 'GET',
        url: URL,
        headers: { 'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)', },
        onload: function(responseDetails) {
            if (responseDetails.responseText.search(file_is_dead) != -1 && file_is_dead != ""){
            	other_links_elements[urlNum].id = 'adead_link';      	
            } else {
                if (responseDetails.responseText.search(file_is_alive) == -1) {
            		other_links_elements[urlNum].id = 'adead_link';		
                } else {
    	        	other_links_elements[urlNum].id = 'alive_link';
                }
            }
        }
    });
}

function check_rs_links(all){
	if (GMHosts.indexOf("rapidshare.com|") != -1){
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
	                    for (var ii = notfound.length - 1; ii >= 0; ii--) {
	                          var string=notfound[ii];
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
	                    for (var ii = livelink.length - 1; ii >= 0; ii--) {
	                          var string=livelink[ii];
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
	    var all = null;
	}
}

//The following two routines can be merged into the above routine at worst. At best, the extra document.evaluate routine might be able to be dropped.
function DiplayTheDeletedLinks(fotfoundlinks){
    var xpathoffotfoundlinks = "//a[contains(@href,\'" + fotfoundlinks.join('\') or contains(@href,\'') +"\')]";
    var allLinks, thisLink;
    allLinks = document.evaluate( xpathoffotfoundlinks, document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var i = 0; i < allLinks.snapshotLength; i++) {
        var thisLink = allLinks.snapshotItem(i);
        thisLink.id = 'adead_link';  
      }
}

function DiplayTheLiveLinks(livelinklinks){
    var xpathoflivelinklinks = "//a[contains(@href,\'" + livelinklinks.join('\') or contains(@href,\'') +"\')]";
    var allliveLinks, thisLink;
    allliveLinks = document.evaluate( xpathoflivelinklinks,    document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var i = 0; i < allliveLinks.snapshotLength; i++) {
        var thisLink = allliveLinks.snapshotItem(i);
    	thisLink.id = 'alive_link';
     }
}

function linkify(){
    try{
        var regex = /((?:https?|ftp):\/\/[^\s'"'<>()]*|[-\w.+]+@(?:[-\w]+\.)+[\w]{2,6})/gi;
        var regex_exclude_html_trunc = /http:\/\/uploading\.com|http:\/\/letitbit.net|http:\/\/www.gshare\.com/gi;
        var regex_ends = /\.rar\.html\b/gi;
        var mail_addr = /\@/;
        var altText, tekst, muligtLink;
		var count = 0;
        //var ikkeTilladteTags = ['a', 'head', 'script', 'style', 'textarea', 'title', 'option', 'pre', 'code'];  //Removed to show links in code,pre,textarea blocks
        var ikkeTilladteTags = ['a', 'head', 'script', 'style', 'title', 'option', 'textarea'];
        var path = "//text()[not(parent::" + ikkeTilladteTags.join(" or parent::") +")]";
        altText = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for(var i=0;i<altText.snapshotLength;i++){
            tekst = altText.snapshotItem(i);
            muligtLink = tekst.nodeValue;

			//Way too many are being tested here. Try to limit this in the future

            if(regex.test(muligtLink)){
                var span = document.createElement('span');
                var lastLastIndex = 0;
                regex.lastIndex = 0;
                for(myArray = null; myArray = regex.exec(muligtLink); ){
                	count = count + 1;
                    var link = myArray[0];
                    if (mail_addr.test(link)){
                        //GM_log("Skipping a mail address: " + link);
                    } else {
                        span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex, myArray.index)));
                        var href = link;
                        var prefix = '';
                        if(href.length > 7){
                            prefix = href.substring(0,7);
                            if(prefix.toLowerCase() != 'http://' && prefix.toLowerCase() != 'https:/'){
                                //GM_log("Prefix: " + prefix);
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
                        a.appendChild(document.createTextNode(href));
                        span.appendChild(a);
                        lastLastIndex = regex.lastIndex;
                    }
                }
                span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex)));
                tekst.parentNode.replaceChild(span, tekst);
            }
        }
    } catch(e){alert(e);}
}

function parse_file(allText, startTag, endTag){
            var start_pos = allText.indexOf(startTag);
            var end_pos = allText.indexOf(endTag, start_pos);            
			return allText.substr(start_pos + startTag.length, (end_pos - start_pos - startTag.length));
}

function prefs_hide(){
	div_prefs.innerHTML = '';
}

function prefs_host_enable(){
	var host = document.getElementById('list_available').options[document.getElementById('list_available').selectedIndex].text;
	var key = GM_getValue("tclc_hosts_enabled", "");
	if (key == ""){
		GM_setValue("tclc_hosts_enabled", host + "|");
	} else {
		GM_setValue("tclc_hosts_enabled", key + host + "|");
	}
	show_prefs()
	}
function prefs_host_disable(){
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
	show_prefs()
	}

function prefs_setup(){
	GM_registerMenuCommand("TCLC Preferences", prefs_show);
	var div_prefs = document.createElement('div_prefs');
	document.body.insertBefore(div_prefs, document.body.lastChild);
	
	// Read all prefs from setValues
	GMHosts = GM_getValue("tclc_hosts_enabled");
	//GM_setValue("tclc_hosts_enabled", "");
    if (GMHosts == ""){
		for (var ii = 0; ii < hosts.length; ii++){
 			var host = hosts[ii][0];
 			GMHosts = GMHosts + host + "|";
		}
		GM_setValue("tclc_hosts_enabled", GMHosts);
	}
}

function prefs_show(){
    var t = new Array();
    var divL = (innerWidth - 370).toString();
    var divT = (innerHeight - 600).toString();

    t.push('<div style = "position: fixed; top:' + divT + 'px; left:' + divL + 'px; width:350px; background-color: #EEEEEE;" >');
    t.push('	<table border=2 cellspacing=0 width=350px><tr><td><center><b>The Cavern Links Checker Preferences<b></center></td><td valign=top><center><button id="tclc_close_prefs" type="button" onClick="prefs_hide()"><font size=-2><b>X</b></font></button></center></td></tr></table>');
    t.push('	<table border=2 cellspacing=0>');
    t.push('		<tr>');
    t.push('			<td width=175px>');
    t.push('				<center><b>Enabled Hosts</b><br>');
    t.push('				<select id="list_enabled" name="list_enabled" size=21>');
										for (var ii = 0; ii < hosts.length; ii++){
 											var host = hosts[ii][0];
 											if (GMHosts.indexOf(host + "|") != -1){
	t.push('									<option value="' + host + '">' + host + '</option>');
		    								}
										}
    t.push('				</select><br>');
    t.push('				<button id="tclc_host_disable" type="button" onClick="prefs_host_disable()">Disable Host</button></center>');
   	t.push('			</td><td width=175px>');
    t.push('				<center><b>Available Hosts</b><br>');
    t.push('				<select id="list_available" name="list_available" size=21>');
 										for (var ii = 0; ii < hosts.length; ii++){
 											var host = hosts[ii][0];
 											if (GMHosts.indexOf(host + "|") == -1){
	t.push('									<option value="' + host + '">' + host + '</option>');
											} else {
											}
 										}
    t.push('				</select><br>');
    t.push('				<button id="tclc_host_enable" type="button" onClick="prefs_host_enable()">Enable Host</button></center>');
   	t.push('			</td>');
   	t.push('		</tr>');
    t.push('	</table>');
    t.push('</div>');

    div_prefs.innerHTML = t.join('\n');
    var btn_close = document.getElementById("tclc_close_prefs");
    btn_close.addEventListener("click", prefs_hide, false);

    var btn_host_enable = document.getElementById("tclc_host_enable");
    btn_host_enable.addEventListener("click", prefs_host_enable, false);

    var btn_host_disable = document.getElementById("tclc_host_disable");
    btn_host_disable.addEventListener("click", prefs_host_disable, false);
}

function process_links(){
	var all = [];
	var links = document.getElementsByTagName('a');
	var bad_images = [];
	var good_images = [];
	var redirectors = [];
	var links_elements_aArray = [];
	var rs_links_elements = [];
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
	            		links[i].id = 'ok_image_link';
	                } else {
	            		links[i].id = 'bad_image_link';
	                }
	            }
	        } else if (links[i].href.toUpperCase().search(redirs_regex) != -1){
	            links[i].id = 'redir_link';
	        } else {
			    //Build an Associative Array of all links - links_elements
			    //	The key here is that we need to have a single key storing possibly multiple values delimited by a '|'
			    if(links_elements_aArray[urll]){
			    	links_elements_aArray[urll] = links_elements_aArray[urll] + "|" + links[i].id;
				} else {
					links_elements_aArray[urll] = links[i].id;
				}
			        	
	            if (links[i].href.search(all_rapidshare_regex) != -1){
					//Rapidshare links
	                var urll = links[i].href;
	                rs_links_elements.push(links[i]);
	                numberofrslinks++;
	                urll = urll.replace(/^.*?http:\/\/rapidshare/gi,'http://rapidshare');
	                urll = urll.replace(/^.*?http%3A%2F%2Frapidshare/gi,'http://rapidshare');
	                urll = urll.replace(/\?killcode=[\d]*/gi,'');
	                urll = urll.replace(/%2F/gi,'/');
	                urll = urll.replace(/%3A/gi,':');
	                var myString = ''+numberofrslinks+'';
	                if (myString.search(/\d00/) != -1){
	                    all.push('xxxczxczxcsasdasdasdx4234');		//*** Shorten this separator string
	                }
	                all.push(urll);
	            } else {
	            	//Other Host Links
	    			GM_log("Processing link: " + links[i].href);
	                for (var ii = 0; ii < hosts.length; ii++){
	                	GM_log("Trying to match links[i].href: " + links[i].href + " and hosts[ii][1]: " + hosts[ii][1]);
	                    //*** Could save Some Time here by creating a regex string of all hosts to search or an array of enabled hosts. Only Process
	                    //	     ones that are enabled. Leave others out. Don't do more searches than necessary. Also could create associative arrays
	                    //		 of other_alive, other_dead strings to avoid the search.
	                    if (links[i].href.search(hosts[ii][1]) != -1) {
	                    	GM_log("Match!: " + links[i].href + "string: " + hosts[ii][1]);
	                    	if (GMHosts.indexOf(hosts[ii][0] + "|") != -1){
	                            other_links_elements.push(links[i]);
	                            other_alive.push(hosts[ii][2]);
	                            other_dead.push(hosts[ii][3]);
	                    	}
	                    }
	                }
	            }
	        }
	    }
	}
	
	all = all.join();
	all = all.replace(/,/gi,'\n');
	var all=all.split("xxxczxczxcsasdasdasdx4234");		//*** Shorten this separator string
	if (numberofrslinks > 0){
	    check_rs_links(all);
	}
	
	//Check all Other Links
	for (var i = 0; i < other_links_elements.length; i++){
	    var file_is_alive = other_alive[i];
	    var file_is_dead = other_dead[i];
	    var URL = other_links_elements[i].href;
	    var ret = check_other_link(i, URL, file_is_alive, file_is_dead);
	}
}
