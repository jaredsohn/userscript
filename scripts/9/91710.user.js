// ==UserScript==
// @name           Better Entensity
// @namespace      *
// @include        http://entensity.net/*
// @version        1.11

// @history        1.11 Added domains to links
// @history        1.11 Added color to links and [SFW] and [NSFW]
// @history        1.11 Added Youtube embedding
// @history        1.11 Changed from hiding to opacity
// @history        1.11 Added more filter definitions
// @history        1.1  Got rid of the damn popup by automatically defining the cookie
// @history        1.1  fixed small bug where myCell was undefined
// @history        1.0  initial version
// ==/UserScript==

myCells = document.getElementsByTagName('td');
myCell = '';
for(i=0;i<myCells.length;i++) {
	if (myCells[i].width=='500') {
		myCell=myCells[i];
	}
}

if (myCell!='') {
	myVars = myCell.getElementsByTagName("a");
	block = new Array();
	color = "#F00";
	myCell.style.lineHeight = "1.1em";
	myCell.innerHTML = myCell.innerHTML.replace(/\[NSFW\] -/g,'<span style="display: inline-block; width: 3em; background-color: #FDD; border: 1px solid #F77 !important; padding: 0 4px;"><acronym title="Adult content: Not Safe For Work">NSFW</acronym></span>');
	myCell.innerHTML = myCell.innerHTML.replace(/\[ SFW \] -/g,'<span style="display: inline-block; width: 3em; background-color: #DDF; border: 1px solid #77F !important; padding: 0 4px;"><acronym title="Adult content: Safe For Work">SFW</acronym></span>');
	
	for(i=0;i<myVars.length;i++) {
		if (!(myVars[i].alt)) {
			myVars[i].alt = myVars[i].href;
			/****************
			SHOW THE DOMAIN
			*************/
			if ((!(myVars[i].href.match(/image\.php\?pic\=/))) && (!(myVars[i].href.match(/flash\.php\?media\=/i)))) {
				if (myDomain = myVars[i].href.split(/\/+/g)[1]) {
					if (myVars[i].getElementsByTagName('img').length > 0) {
						myVars[i].innerHTML += '<span style="color: #666; font-size: .8em;"><br/> [' + myDomain.replace('www.','') + ']<span>';
					} else {
						myVars[i].innerHTML += '<span style="color: #666; font-size: .8em;">&nbsp; [' + myDomain.replace('www.','') + ']<span>';
					}
				}
			}
		
			/****************
			ATTEMPT TO REMOVE ADVERT THUMB LINKS
			*************/
			if (myVars[i].href.match(/(\.org\/$|\.com\/$|\.net\/$)/)) {
				myVars[i].style.color = color;
				myVars[i].style.opacity = '.2';
			}
			
			block[0] = '/direct';
			block[1] = '/track/';
			block[2] = 'affiliate';
			block[3] = /categor/i;
			block[4] = 'p3entensity';
			block[5] = 'referer.us';
			block[6] = 'stileproject.com/best/month';
			block[7] = /facebook {0,1}of {0,1}sex/;
			block[8] = /\?c=/;
			block[9] = 'utm_campaign';
			block[10] = 'matt,entensity';
			block[11] = 'fleshlight.com';
			block[12] = 'id=ryanwill';
			
			for(i2=0;i2<block.length;i2++) {
				if (myVars[i].href.match(block[i2])) {
					myVars[i].style.opacity = '.2';
					myVars[i].style.color = color;
				}
				
				if (myVars[i].href.match('youtube.com')) {
					if (!(myVars[i].title)) {
						myVars[i].title = myVars[i].innerHTML;
						myVars[i].style.color = '#0D0';
						myVars[i].innerHTML += '<br/><br/><center><object width="480" height="390"><param name="movie" value="'+myVars[i].href.replace('watch?v=','v/')+'?fs=1&amp;hl=en_US"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="'+myVars[i].href.replace('watch?v=','v/')+'?fs=1&amp;hl=en_US" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="480" height="390"></embed></object></center>';
					}
				}
			}
			
			
			/****************
			MAKE IMAGES BIGGER
			*************/
			if (myVars[i].href.match(/image\.php\?pic\=/)) {
				myVars[i].href = myVars[i].href.replace('image.php?pic=','');
				myVars[i].childNodes[1].src=myVars[i].href;
				myVars[i].childNodes[1].style.maxWidth = '500px';
			}
			
			/****************
			EMBED FLASH
			*************/
			if (myVars[i].href.match(/flash\.php\?media\=/i)) {
				myVars[i].childNodes[1].style.display='none';
				
				myFile  = '<embed width="510" height="400" type="application/x-shockwave-flash" style="" id="mpl" name="mpl" quality="high" allowscriptaccess="always" menu="false" allowfullscreen="true" flashvars="overstretch=true&amp;height=400&amp;width=510&amp;autostart=false&amp;searchbar=false&amp;file=';
				myFile += myVars[i].href.match(/media=.*/)[0].replace('media=','');
				myFile +='&amp;image=';
				myFile += myVars[i].childNodes[1].src;
				myFile +='" src="';
				myFile += myVars[i].href.match(/.*?\/flash/i)[0].replace('flash','');
				myFile +='player.swf">';
				
				myVars[i].innerHTML += myFile;
				myVars[i].href='javascript:';
			}
		}
	}
}

//Let's get rid of the damn popup
var expires = new Date();
expires.setTime( expires.getTime() + 365*24*60*60*1000 );
document.cookie = "popundr=1; path=/; expires=" + expires.toGMTString() + "; path=/";