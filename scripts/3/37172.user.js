// ==UserScript==
// @name           Bring The Old /b/ Back
// @namespace      http://www.nmbxcvnmbcxv.org
// @description    Enables :hardgay: for you. (Other users won't see it!)
// @include        http://img.4chan.org/b/*
// ==/UserScript==

//License: Do whatever you want with this script.
//It's my very first script and very gung-ho. If you know better/more effective ways to program it, please let me know.


var blockq, spans, randno, postid;
blockq = document.getElementsByTagName('blockquote');
spans = document.getElementsByTagName('span');
fortunes = new Array(11);


fortunes[0] = '<font color=#f51c6a><b>Your fortune: Reply hazy, try again</b></font><br /><br />';
fortunes[1] = '<font color=#43fd3b><b>Your fortune: Good news will come to you by mail</b></font><br /><br />';
fortunes[2] = '<font color=#d302a7><b>Your fortune: Godly Luck</b></font><br /><br />';
fortunes[3] = '<font color=#6023f8><b>Your fortune: Outlook good</b></font><br /><br />';
fortunes[4] = '<font color=#16f174><b>Your fortune: ????????(???)?????? !!!! </b></font><br /><br />';
fortunes[5] = '<font color=#fd4d32><b>Your fortune: Excellent Luck</b></font><br /><br />';
fortunes[6] = '<font color=#0893e1><b>Your fortune: You will meet a dark handsome stranger</b></font><br /><br />';
fortunes[7] = '<font color=#9d05da><b>Your fortune: Very Bad Luck</b></font><br /><br />';
fortunes[8] = '<font color=#bac200><b>Your fortune: Average Luck</b></font><br /><br />';
fortunes[9] = '<font color=#2a56fb><b>Your fortune: Better not tell you now</b></font><br /><br />';
fortunes[10] = '<font color=#7fec11><b>Your fortune: Bad Luck</b></font><br /><br />';

for (var i = 0; i < blockq.length; i++) {
    postid = blockq[i].parentNode.id;
	if (postid % 31 == 1) {
		blockq[i].innerHTML = blockq[i].innerHTML + '<br><br><b style="color:red;">(USER WAS BANNED FOR THIS POST)</b>';
	}
	
	if (postid % 7 == 3) {
		randno = postid % 11;
		blockq[i].innerHTML = fortunes[randno] + blockq[i].innerHTML;
	}
	if (blockq[i].innerHTML.indexOf(':hardgay:') >= 0) {
		blockq[i].innerHTML = blockq[i].innerHTML.replace(/:hardgay:/g, '<div style="float: left;"><img src="http://i7.photobucket.com/albums/y283/sameister3/hardgay.gif" alt="hardgay"></div> ');
    }
}

for (var i = 0; i < spans.length; i++) {
	if (spans[i].className == 'commentpostername' || spans[i].className == 'postertrip' || spans[i].className == 'postername') {
		spans[i].style.display = 'none';
	}
}
















