// ==UserScript==
// @name			MPGH Scripts - Blacklist User Warning - Firefox
// @namespace 		xerotic/MPGHscammersff
// @description 	Warns viewer of potential scammers on for mpgh.net/forum - Firefox
// @include  		*mpgh.net/forum/showthread.php*
// @include  		*mpgh.net/forum/member.php*
// @include  		*mpgh.net/forum/forumdisplay.php*
// @version  		1.0.0
// ==/UserScript==

scamList = 0;
check = false;

function genList(){
  var thebiglist = GM_xmlhttpRequest({
	synchronous: true,
    method: "GET",
    url: "http://dl.dropbox.com/u/64258819/mpghblacklist.txt",
    onload: function(response) {
      processTheRest(response);
    }
  });

}

genList();

function processTheRest(response) {
	scamList = response.responseText;
	scamList = scamList.toString();

	var scamArray = scamList.split(/\r\n/gim);

	for(var i = 0; i < scamArray.length; i++) {
		tempScam = scamArray[i].split(/\|/);
		tempTID = tempScam[1].split(/\:/);
		for(var y = 0; y < tempTID.length; y++) {
			tempScam[y + 1] = tempTID[y];
		}
		scamArray[i] = tempScam;
	}

	if(window.location.href.toString().indexOf("showthread.php")!=-1) {
		var userinfo = document.getElementsByClassName("userinfo");
		for(z in userinfo) {
			var morespecific = userinfo[z].getElementsByClassName("largetext")[0];
			for(y in scamArray) {
				if(morespecific.innerHTML.indexOf('?'+scamArray[y][0]+'"')!=-1) {
					
					newHTML = "<a href=\"javascript:void(0);\" onclick=\"if(document.getElementById('idscam" + z + "').style.display == 'none') {document.getElementById('idscam" + z + "').style.display='block'; } else { document.getElementById('idscam" + z + "').style.display='none'; }\"><b style='color:red'>[Marketplace] Blacklist User</b></a><div class=\"author smalltext\" id=\"idscam" + z + "\" style=\"position:absolute;display:none;padding:10px;background-color:#333333;border:5px ridge #4F3A6B;\"><span style=\"text-decoration:underline;\">Blacklist Database:</span><br />";
					for(x in scamArray[y]) {
						if(x != 0) {
							newHTML = newHTML + "<a href=\"http://www.mpgh.net/forum/showthread.php?" + scamArray[y][x] + "\" target=\"_blank\">http://www.mpgh.net/forum/showthread.php?" + scamArray[y][x] + "</a><br />";
						}
					}
					newHTML = newHTML + "</div> - " + morespecific.innerHTML;
					morespecific.innerHTML = newHTML;
				}
			}
		}
	} else if(window.location.href.toString().indexOf("member.php")!=-1) {
		var z = "";
		var morespecific = document.getElementsByClassName("largetext")[0];
		for(y in scamArray) {
			if(document.body.innerHTML.indexOf('?'+scamArray[y][0]+'"')!=-1) {
				newHTML = "<a href=\"javascript:void(0);\" onclick=\"if(document.getElementById('idscam" + z + "').style.display == 'none') {document.getElementById('idscam" + z + "').style.display='block'; } else { document.getElementById('idscam" + z + "').style.display='none'; }\"><b style='color:red'>[Marketplace] Blacklist User</b></a><div class=\"author smalltext\" id=\"idscam" + z + "\" style=\"position:absolute;display:none;padding:10px;background-color:#333333;border:5px ridge #4F3A6B;\"><span style=\"text-decoration:underline;\">Blacklist Database:</span><br />";
				for(x in scamArray[y]) {
					if(x != 0) {
						newHTML = newHTML + "<a href=\"http://www.mpgh.net/forum/showthread.php?" + scamArray[y][x] + "\" target=\"_blank\">http://www.mpgh.net/forum/showthread.php?" + scamArray[y][x] + "</a><br />";
					}
				}
				newHTML = newHTML + "</div> - " + morespecific.innerHTML;
				morespecific.innerHTML = newHTML;
			}
		}
	}
	else {
		var thread_creator = document.getElementsByClassName("author smalltext");
		for(x in thread_creator) {
			for(y in scamArray) {
				if(thread_creator[x].innerHTML.indexOf('?'+scamArray[y][0]+'"')!=-1) {
					newHTML = "<a href=\"javascript:void(0);\" onclick=\"if(document.getElementById('idscam" + x + "').style.display == 'none') {document.getElementById('idscam" + x + "').style.display='block'; } else { document.getElementById('idscam" + x + "').style.display='none'; }\"><b style='color:red'>[Marketplace] Blacklist User</b></a><div id=\"idscam" + x + "\" style=\"position:absolute;display:none;padding:10px;background-color:#333333;border:5px ridge #4F3A6B;\"><span style=\"text-decoration:underline;\">Blacklist Database:</span><br />";
					for(z in scamArray[y]) {
						if(z != 0) {
							newHTML = newHTML + "<a href=\"http://www.mpgh.net/forum/showthread.php?" + scamArray[y][z] + "\" target=\"_blank\">http://www.mpgh.net/forum/showthread.php?" + scamArray[y][z] + "</a><br />";
						}
					}
					newHTML = newHTML + "</div> - " + thread_creator[x].innerHTML;
					thread_creator[x].innerHTML = newHTML;
				}
			}
		}
	}
}