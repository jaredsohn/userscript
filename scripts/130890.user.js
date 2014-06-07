// ==UserScript==
// @name		HF Scripts - Scammer Warning
// @namespace 		xerotic/hfscammersff
// @description 	Warns viewer of potential scammers on for HackForums.net
// @include  		*hackforums.net/showthread.php*
// @include  		*hackforums.net/member.php*
// @include  		*hackforums.net/forumdisplay.php*
// @include  		*hackforums.net/private.php*
// @include  		*hackforums.net/reputation.php*
// @include  		*hackforums.net/repsgiven.php*
// @version  		1.1.0
// ==/UserScript==

function genList(){
  var thebiglist = GM_xmlhttpRequest({
	synchronous: true,
    method: "GET",
    url: "http://dl.dropbox.com/u/71096793/scamlist.txt",
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
		var post_author = document.getElementsByClassName("post_author");
		for(z in post_author) {
			var currentVar = post_author[z].getElementsByClassName("largetext")[0];
			for(y in scamArray) {
				if(currentVar.innerHTML.indexOf('uid='+scamArray[y][0]+'"')!=-1) {
					
					newHTML = "<a href=\"javascript:void(0);\" onclick=\"if(document.getElementById('idscam" + z + "').style.display == 'none') {document.getElementById('idscam" + z + "').style.display='block'; } else { document.getElementById('idscam" + z + "').style.display='none'; }\"><b style='color:red'>Reported Scammer</b></a><div class=\"author smalltext\" id=\"idscam" + z + "\" style=\"position:absolute;display:none;padding:10px;background-color:#333333;border:5px ridge #4F3A6B;\"><span style=\"text-decoration:underline;\">Scam Reports:</span><br />";
					for(x in scamArray[y]) {
						if(x != 0) {
							newHTML = newHTML + "<a href=\"http://www.hackforums.net/showthread.php?tid=" + scamArray[y][x] + "\" target=\"_blank\">http://www.hackforums.net/showthread.php?tid=" + scamArray[y][x] + "</a><br />";
						}
					}
					newHTML = newHTML + "</div> - " + currentVar.innerHTML;
					currentVar.innerHTML = newHTML;
				}
			}
		}
	} else if(window.location.href.toString().indexOf("member.php")!=-1) {
		var z = "";
		var currentVar = document.getElementsByClassName("largetext")[0];
		for(y in scamArray) {
			if(document.body.innerHTML.indexOf('uhuid='+scamArray[y][0]+'"')!=-1) {
				newHTML = "<a href=\"javascript:void(0);\" onclick=\"if(document.getElementById('idscam" + z + "').style.display == 'none') {document.getElementById('idscam" + z + "').style.display='block'; } else { document.getElementById('idscam" + z + "').style.display='none'; }\"><b style='color:red'>Reported Scammer</b></a><div class=\"author smalltext\" id=\"idscam" + z + "\" style=\"position:absolute;display:none;padding:10px;background-color:#333333;border:5px ridge #4F3A6B;\"><span style=\"text-decoration:underline;\">Scam Reports:</span><br />";
				for(x in scamArray[y]) {
					if(x != 0) {
						newHTML = newHTML + "<a href=\"http://www.hackforums.net/showthread.php?tid=" + scamArray[y][x] + "\" target=\"_blank\">http://www.hackforums.net/showthread.php?tid=" + scamArray[y][x] + "</a><br />";
					}
				}
				newHTML = newHTML + "</div> - " + currentVar.innerHTML;
				currentVar.innerHTML = newHTML;
			}
		}
	}
	else if(window.location.href.toString().indexOf("reputation.php")!=-1 || window.location.href.toString().indexOf("repsgiven.php")!=-1) {
	var pagelinks = document.getElementsByTagName("a");
	var myLinks = new Array();
	var count = 0;
	for(z in pagelinks) {
		var current = pagelinks[z];
		if(current.href.indexOf("member.php?action=profile&uid=") != -1) {
			if(count != 0 && count != 1) {
				for(y in scamArray) {
					if(current.href.indexOf('uid='+scamArray[y][0])!=-1) {
						var newSpan = document.createElement('span');
						newHTML = " - <a href=\"javascript:void(0);\" onclick=\"if(document.getElementById('idscam" + z + "').style.display == 'none') {document.getElementById('idscam" + z + "').style.display='block'; } else { document.getElementById('idscam" + z + "').style.display='none'; }\"><b style='color:red'>Reported Scammer</b></a><div class=\"author smalltext\" id=\"idscam" + z + "\" style=\"position:absolute;display:none;padding:10px;background-color:#333333;border:5px ridge #4F3A6B;\"><span style=\"text-decoration:underline;\">Scam Reports:</span><br />";
						for(x in scamArray[y]) {
							if(x != 0) {
								newHTML = newHTML + "<a href=\"http://www.hackforums.net/showthread.php?tid=" + scamArray[y][x] + "\" target=\"_blank\">http://www.hackforums.net/showthread.php?tid=" + scamArray[y][x] + "</a><br />";
							}
						}
						newHTML = newHTML + "</div>";
						newSpan.innerHTML = newHTML;
						current.parentNode.insertBefore(newSpan, current.nextSibling);
					}
				}
			}
			count++;
		}
	}
}
else if(window.location.href.toString().indexOf("private.php?action=read")!=-1) {
	var post_author = document.getElementsByClassName("post_author");
	for(z in post_author) {
		var currentVar = post_author[z].getElementsByClassName("largetext")[0];
		for(y in scamArray) {
			if(currentVar.innerHTML.indexOf('uid='+scamArray[y][0]+'"')!=-1) {
				
				newHTML = "<a href=\"javascript:void(0);\" onclick=\"if(document.getElementById('idscam" + z + "').style.display == 'none') {document.getElementById('idscam" + z + "').style.display='block'; } else { document.getElementById('idscam" + z + "').style.display='none'; }\"><b style='color:red'>Reported Scammer</b></a><div class=\"author smalltext\" id=\"idscam" + z + "\" style=\"position:absolute;display:none;padding:10px;background-color:#333333;border:5px ridge #4F3A6B;\"><span style=\"text-decoration:underline;\">Scam Reports:</span><br />";
				for(x in scamArray[y]) {
					if(x != 0) {
						newHTML = newHTML + "<a href=\"http://www.hackforums.net/showthread.php?tid=" + scamArray[y][x] + "\" target=\"_blank\">http://www.hackforums.net/showthread.php?tid=" + scamArray[y][x] + "</a><br />";
					}
				}
				newHTML = newHTML + "</div> - " + currentVar.innerHTML;
				currentVar.innerHTML = newHTML;
			}
		}
	}
}
	else {
		var thread_creator = document.getElementsByClassName("author smalltext");
		for(x in thread_creator) {
			for(y in scamArray) {
				if(thread_creator[x].innerHTML.indexOf('uid='+scamArray[y][0]+'"')!=-1) {
					newHTML = "<a href=\"javascript:void(0);\" onclick=\"if(document.getElementById('idscam" + x + "').style.display == 'none') {document.getElementById('idscam" + x + "').style.display='block'; } else { document.getElementById('idscam" + x + "').style.display='none'; }\"><b style='color:red'>Reported Scammer</b></a><div id=\"idscam" + x + "\" style=\"position:absolute;display:none;padding:10px;background-color:#333333;border:5px ridge #4F3A6B;\"><span style=\"text-decoration:underline;\">Scam Reports:</span><br />";
					for(z in scamArray[y]) {
						if(z != 0) {
							newHTML = newHTML + "<a href=\"http://www.hackforums.net/showthread.php?tid=" + scamArray[y][z] + "\" target=\"_blank\">http://www.hackforums.net/showthread.php?tid=" + scamArray[y][z] + "</a><br />";
						}
					}
					newHTML = newHTML + "</div> - " + thread_creator[x].innerHTML;
					thread_creator[x].innerHTML = newHTML;
				}
			}
		}
	}
}