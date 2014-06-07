// ==UserScript==
// @name           Playstation Share
// @namespace      http://share.blog.us.playstation.com/
// @description    Adds functionality to the playstation share site
// @version        1.1
// @include        http://share.blog.us.playstation.com/*
// ==/UserScript==

//Add CSS
(function() {
	var css  = '.buttons {\rbackground-image: url("http://fc08.deviantart.net/fs71/f/2010/081/1/3/Share_by_user002.png");\r}';
	
	if			(typeof GM_addStyle != "undefined")		{GM_addStyle(css);}
	else if		(typeof PRO_addStyle != "undefined")	{PRO_addStyle(css);}
	else if		(typeof addStyle != "undefined")		{addStyle(css);}
	else		{
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node); 
		}
	}
})();


myClick = function (el,val) {
	el.parentNode.parentNode.parentNode.style.backgroundColor = '#ffb';
	if (val == true) {mySearch = 'greasePositive';} else {mySearch = 'greaseNegative';}
	el.parentNode.parentNode.parentNode.getElementsByClassName(mySearch)[0].innerHTML = parseFloat(el.parentNode.parentNode.parentNode.getElementsByClassName(mySearch)[0].innerHTML) + 1;
}

myvoted		= document.getElementsByClassName('buttons');
numvotes	= document.getElementsByClassName('vote-box');

//figure scheme
for(i=0;i<myvoted[0].childNodes.length;i++) {if(myvoted[0].childNodes[i].className == 'post-ratings') {firsti = i;}}
if(firsti) {for(i=0;i<myvoted[0].childNodes[firsti].childNodes.length;i++) {if((myvoted[0].childNodes[firsti].childNodes[i].className=='arrows')||(myvoted[0].childNodes[firsti].childNodes[i].className=='arrows voted')) {secondi = i;}}}
for(i=0;i<myvoted.length;i++) {
	if (myvoted[i].childNodes[firsti].childNodes[secondi].childNodes[1]) {
		if (myvoted[i].childNodes[firsti].childNodes[secondi].childNodes[1].title != 'Vote This Post Down') {
			myvoted[i].style.backgroundColor = '#ffb';
		} else {
			myvoted[i].childNodes[firsti].childNodes[secondi].childNodes[1].addEventListener('click',function() {
				myClick(this,false);
			},false);
			myvoted[i].childNodes[firsti].childNodes[secondi].childNodes[0].addEventListener('click',function() {
				myClick(this,true);
			},false);
		}
	
		numvotes[i].innerHTML = numvotes[i].innerHTML.replace(",",'');
		
		tempVotes = parseFloat(numvotes[i].innerHTML.match(/[\d]+/)[0]);
		tempScore = parseFloat(numvotes[i].parentNode.childNodes[1].innerHTML.match(/(-\d+|\d+)/)[0]);
		
		numPos = (tempVotes/2) + (tempScore/2);
		numNeg = tempVotes - numPos;
		
		percentString = '';
		numPer = ((100*numPos)/tempVotes).toFixed(1);
		if (numPos != numNeg) {
			percentString += numPer + '%';
		} else {
			percentString += '- %';
		}
		
		myDiv = document.createElement('div');
		myDiv.className = 'greaseVotes';
		myDiv.style.cssFloat = 'left';
		myDiv.style.padding = '5px';
		myDiv.style.width = '132px';
		myDiv.style.borderTop = '1px solid #ccc';
		myDiv.style.backgroundColor = '#fff';
		
		myString  = '<center>';
		myString += percentString;
		myString += '<span style="font-size: .8em">';
		myString += '<img style="height: 8px; margin-left: 10px;" src="http://upload.wikimedia.org/wikipedia/commons/b/b5/Green_up.png"> <span class="greasePositive">' + numPos + '</span>';
		myString += '<img style="height: 8px; margin-left: 5px;"  src="http://upload.wikimedia.org/wikipedia/commons/9/99/Red_down.png"> <span class="greaseNegative">' + numNeg + '</span>';
		myString += '</span>';
		myString += '</center>';
		
		myDiv.innerHTML = myString;
		
		myvoted[i].childNodes[firsti].insertBefore(myDiv,myvoted[i].childNodes[firsti].childNodes[myvoted[i].childNodes[firsti].childNodes.length]);
	}
}

myPosters = document.getElementsByClassName('posted-by');
for (i=0; i<myPosters.length; i++) {
	//for comment pages
	myId = myPosters[i].textContent.match(/[a-zA-Z\d-_]+/i)[0];
	if (myId != 'Posted') {
		if (myPosters[i].childNodes[1]) {
			myPosters[i].childNodes[1].href = 'http://share.blog.us.playstation.com/author/' + myId + '/';
		}
	}
	//For paginated results
	myId = myPosters[i].textContent.match(/by [a-zA-Z\d-_]+/i);
	if (myId) {myId = myId[0].replace('by ','');}
	
	myAv = myPosters[i].parentNode.innerHTML.match(/\<img.*?\>/i);
	if (myAv) {myAv = myAv[0];}
	
	if ((myAv) && (myId)) {
		myPosters[i].parentNode.innerHTML = myPosters[i].parentNode.innerHTML.replace(myAv,'<a target="_blank" href="http://us.playstation.com/publictrophy/index.htm?onlinename=' + myId + '">' + myAv + '</a>');
	}
}