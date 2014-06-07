// ==UserScript==
// @name           Write for ten - GWAM 
// @namespace      ronaldtroyer.com
// @include        http://writeforten.com/users/*
// @include        http://writeforten.com/posts/*
// ==/UserScript==

myLoc = window.location.href;
window.wordCount = function (testText) {
	//Strip any HTML
	testText = testText.replace(/<.*?>/g, ' ');
	//Change line breaks to spaces
	testText = testText.replace(/\s/g, ' ');	
	testText = testText.replace(/[^A-Za-z ]/g, '');	
	//Remove all double spaces, as they will screw up the word count
	while (testText.match('  ')) {testText = testText.replace('  ',' ');}
	//Create array of words
	num = testText.split(' ');
	return(num.length);
}
if ((myLoc.match('http://writeforten.com/posts/new'))||(myLoc.match(/http:\/\/writeforten.com\/posts\/.*?\/edit/))){
	myString = '<div style="margin-top: -60px; right: 0px; float: right; position: relative; text-align: right;" id="greaseContainer"><span style="font-weight: bold;" id="greaseGwam"></span><br/><span style="font-size: .8em;" id="greaseWords"></span></div>';
	document.getElementsByClassName('span-16')[0].innerHTML = myString + document.getElementsByClassName('span-16')[0].innerHTML;
	
	myGwam = function () {
		myTime = document.getElementById('post_formatted_duration').value;
		myMinutes = parseFloat(myTime.match(/.*?:/)[0]);
		mySeconds = parseFloat(myTime.match(/:.*/)[0].replace(':',''));
		myDiv = myMinutes + (mySeconds/60);
		
		parseWords = parseFloat(document.getElementById('greaseWords').innerHTML);
		if (!(isNaN(parseWords))) {
			gwamfloat = (parseWords/myDiv).toFixed(1);
		} else {
			gwamfloat = 0;
		}
		document.getElementById('greaseGwam').innerHTML = gwamfloat + ' gwam';
		setTimeout(function () {myGwam()},1000);
	}
	myGwam();	
	
	document.getElementById('post_body').addEventListener("keyup", function () {
		document.getElementById('greaseWords').innerHTML = window.wordCount(document.getElementById('post_body').value) + ' words';
	},false);
	
	document.getElementById('greaseWords').innerHTML = window.wordCount(document.getElementById('post_body').value) + ' words';
} else {
	//Get posts
	posts = document.getElementsByClassName('_body');
	subsc = document.getElementsByClassName('_info');
	for (i=0; i<posts.length; i++) {
		wCountFloat = window.wordCount(posts[i].innerHTML) - 1;
		
		/********** SET COUNT *****************/
		//Getting GWAM 
		numMin = parseFloat(subsc[i].innerHTML.match(/[\d].*? minute/)[0]);
		GWAM = (wCountFloat/numMin).toFixed(1);
		
		subsc[i].innerHTML = wCountFloat + ' words ' + subsc[i].innerHTML;
		subsc[i].innerHTML = subsc[i].innerHTML.replace('Written','written');

		if (subsc[i].innerHTML.match(/</)) {
			subsc[i].innerHTML = subsc[i].innerHTML.replace(/</,'(' + GWAM + ' GWAM)<br/><');
		} else {
			subsc[i].innerHTML = '<small>' + subsc[i].innerHTML + '(' + GWAM + ' GWAM)</small>';
		}
	}
}