// ==UserScript==
// @name           lolcat the web
// @namespace      lolcats
// @description    replaces all images with lolcats and changes div content into lolspeak. 
// @include        http://*
// ==/UserScript==

// update - chooses from random icanhascheezburger source page 
// update - added more lolspeak replacements 


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}





//function to add a new div to show loading state...
function showLoader(){
	var load = document.createElement("div");
	load.id="lolcatloader"; 
	load.innerHTML="Oh hai, <br/><br/> Now I is Loading... "; 
	document.body.insertBefore(load, document.body.firstChild);
	var paws = document.createElement("img");  
	paws.src = ("http://www.lolcats.com/images/logo2.gif"); //pawsdata;  
	document.getElementById('lolcatloader').appendChild(paws); 
	addGlobalStyle('#lolcatloader { width:100%; color:#555; text-align:center; font-size: 39pt; display:block; font-family:impact; padding:0px 0px 100px 0px; background:#000; color:#fff; border:dashed 2px #999999; position:absolute; z-index:199; }');

	addGlobalStyle(' body {background-image: url(http://www.radiohead.com/Archive/Site9/images/b...); background-attachment: fixed;} ')
}









var randomnumber=Math.floor(Math.random()*101) ; //how many pages of lolcats are there now? 


//comment this out if you don't want the loading screen. 
showLoader(); 



var lolcats = new Array(); 
//find images of lolcats to use... 
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.icanhascheezburger.com/page/'+randomnumber,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/html',
    },
    onload: function(responseDetails) {

	//find lolcat pictures on frontpage of icanhascheezburger.com....
	regex = /(http:\/\/icanhascheezburger.files.wordpress.com\/[^\"]+.jpg)/gmi; 
	matches = responseDetails.responseText.match(regex);

	//throw them in a lolcat array for safekeeping... 
	for(x=0;x<matches.length;x++){
		lolcats[x] = matches[x]; 
	}

	//find all images in the page...
	images = document.getElementsByTagName("img"); 
	var j=0; 
	for(i=0;i<images.length;i++){
		//remember the width/height details of the original image...
		w=images[i].width;
		h=images[i].height;

		if(w>20 && h>20){
			images[i].src=lolcats[j];
			//make the lolcat have the same dimensions as the orig...
			images[i].width=w; 
			images[i].height=h; 
			if(j<lolcats.length-1){
				j++; 
			}else{
				j=0; 
			}
		}
	}

	//now start messing with the text to turn all div content into lolspeak....
	divs = document.getElementsByTagName('div'); 

	for(x=0;x<divs.length;x++){

		//divs[x].innerHTML = divs[x].innerHTML.replace('( [^fF][a-z]+)tion', '\\1ti0nz'); 
		divs[x].innerHTML = divs[x].innerHTML.replace(' the ', ' teh '); 
		divs[x].innerHTML = divs[x].innerHTML.replace('would', ' wud '); 
		divs[x].innerHTML = divs[x].innerHTML.replace('could', ' cud '); 
		divs[x].innerHTML = divs[x].innerHTML.replace('should', ' shud '); 
		divs[x].innerHTML = divs[x].innerHTML.replace(' each ', ' eech '); 
		divs[x].innerHTML = divs[x].innerHTML.replace('ies ', 'ees '); 
		divs[x].innerHTML = divs[x].innerHTML.replace(' as ', ' az '); 
		divs[x].innerHTML = divs[x].innerHTML.replace(' kn', ' n'); 
		divs[x].innerHTML = divs[x].innerHTML.replace('thank', 'tnx'); 
		divs[x].innerHTML = divs[x].innerHTML.replace(' your ', ' ur '); 
		divs[x].innerHTML = divs[x].innerHTML.replace(' you\'re ', ' ur '); 
		divs[x].innerHTML = divs[x].innerHTML.replace(' you ', ' u '); 
		divs[x].innerHTML = divs[x].innerHTML.replace(' me ', ' meh '); 
		divs[x].innerHTML = divs[x].innerHTML.replace(' my ', ' mah '); 
		divs[x].innerHTML = divs[x].innerHTML.replace(' have ', ' has '); 
		divs[x].innerHTML = divs[x].innerHTML.replace(' this ', ' dis '); 
		divs[x].innerHTML = divs[x].innerHTML.replace(' is ', ' iz '); 
		divs[x].innerHTML = divs[x].innerHTML.replace(' was ', ' w0z '); 
		divs[x].innerHTML = divs[x].innerHTML.replace('ies ', 'iez '); 
		divs[x].innerHTML = divs[x].innerHTML.replace('sion ', 'shun '); 
		divs[x].innerHTML = divs[x].innerHTML.replace(' an ', ' a '); 
		divs[x].innerHTML = divs[x].innerHTML.replace('help', 'halp'); 
		divs[x].innerHTML = divs[x].innerHTML.replace(' no ', ' noes '); 
		divs[x].innerHTML = divs[x].innerHTML.replace(' know ', ' knoes '); 
		divs[x].innerHTML = divs[x].innerHTML.replace('er ', 'rr '); 
		divs[x].innerHTML = divs[x].innerHTML.replace(' that ', ' dat '); 
		divs[x].innerHTML = divs[x].innerHTML.replace('ph', 'f'); 
		divs[x].innerHTML = divs[x].innerHTML.replace(' and ', ' n '); 
		divs[x].innerHTML = divs[x].innerHTML.replace(' to ', ' 2 '); 
		divs[x].innerHTML = divs[x].innerHTML.replace('one', '1'); 
		divs[x].innerHTML = divs[x].innerHTML.replace('my ', 'meh '); 
	}

	//remove the loader...
	lcl = document.getElementById('lolcatloader'); 
	lcl.parentNode.removeChild(lcl); 

    }

});






