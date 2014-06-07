// ==UserScript==
// @name           Better Pandora
// @namespace      *
// @description    This script cleans up a lot of the layout problems left from adblock. Also makes sure that it can be made very small.
// @version        0.2
// @include        http*://*pandora.com*
// @include        http*://www.pandora.com*
// ==/UserScript==

function payload() {
	class_list = document.getElementsByClassName('adSupported-layout');
	for (var i = 0; i < class_list.length; i++) {
		class_list[i].className = 'width-p1-noAds';
	};
	
	playerBar = document.getElementById('playerBar');
	playerBar.style.minWidth = '0';
	newstation = playerBar.getElementsByClassName('leftcolumn')[0];
	nowplaying = playerBar.getElementsByClassName('rightcolumn')[0];
	
	newstation.setAttribute('id','newstation');
	newstation.style.background = 'rgba(0,0,0,.5)';
	newstation.style.borderRadius = '25px';
	newstation.style.MozBorderRadius = '25px';
	newstation.style.WebkitBorderRadius = '25px';
	newstation.style.position = 'absolute';
	newstation.style.top = '65px';
	newstation.style.left = '50%';
	newstation.style.marginLeft = '-125px';
	newstation.style.width = 'auto';
	newstation.style.padding = '10px';
	newstation.style.visibility = 'hidden';
	
	stationhelp = document.getElementById('searchPopupNavPosition');
	stationhelp.style.left = '50%';
	stationhelp.style.marginLeft = '-120px';
	stationhelp.style.top = '135px';
	
	document.getElementById('adLayout').style.width = '100%';
	document.getElementById('mainContent').style.width = '100%';
	mainContainer = document.getElementById('mainContentContainer');
	
	mainNav = mainContainer.getElementsByClassName('contentnav')[0];
	
	var showRadioLink = document.createElement('div');
	showRadioLink.setAttribute('style', 'cursor:pointer; float:right; margin-right:10px; line-height:24px; color: #D6DEEA;');
	showRadioLink.setAttribute('id', 'showRadioLink');
	showRadioLink.className = 'navFooter';
	showRadioClick = "document.getElementById('newstation').style.visibility = 'visible';";
	showRadioLink.innerHTML = '<a onclick="'+showRadioClick+'">New Station</a>';
	mainNav.appendChild(showRadioLink);
	
	searchbox = newstation.getElementsByClassName('searchBox')[0];
	searchbox.style.width = '210px';
	searchbox.style.backgroundRepeat = 'no-repeat';
	closeRadioLink = document.createElement('img');
	closeRadioLink.setAttribute('style','margin-left: 16px; margin-top: 9px; position: absolute; cursor:pointer');
	closeRadioLink.setAttribute('src','http://fc04.deviantart.net/fs70/f/2012/101/e/e/x_by_jobe_1_2-d4vtchz.png');
	closeRadioLink.setAttribute('onClick',"document.getElementById('newstation').style.visibility = 'hidden';");
	searchbox.appendChild(closeRadioLink);
	
	slideLimit = mainContainer.getElementsByClassName('slideDragLimit')[0];
	slideLimit.style.height = '500px'; /*Biggest the thumbnail is allowed being*/
	slideLimit.style.marginTop = '100px'; /*Smallest the thumbnail is allowed being*/
	
	//Looking at you, Chrome
	fixContainer = function() {
		mainContainer.style.width = '100%';
		document.getElementById('footer').style.width = '100%';
		document.getElementById('brandingBar').style.minWidth = '0';
	}
	window.setInterval("fixContainer()",3000);
	
	
	nowplaying.style.width = 'auto';
	nowplaying.getElementsByClassName('info')[0].style.width = 'auto';
	nowplaying.getElementsByClassName('cd_menu')[0].style.cssFloat = 'right';
		
	myrefresh = function() {
		Pandora.sendTunerCommand("ext_pause","");
		Pandora.sendTunerCommand("ext_play","");
	}
	
	rintv = window.setInterval("myrefresh()",3540000);
	
	mytitle = function() {
		bar = document.getElementById('playerBar');
		song = bar.getElementsByClassName('playerBarSong')[0].innerHTML;
		artist = bar.getElementsByClassName('playerBarArtist')[0].innerHTML;
		album = bar.getElementsByClassName('playerBarAlbum')[0].innerHTML;
		
		if(song != '') {
			document.title = song + ' - ' + artist + ' | Pandora';
		} else {
			document.title = 'Pandora Radio';
		}
	}
	window.setInterval("mytitle()", 5000);
}

if (document.getElementById('playerBar')) {
	payload();
} else {
	setTimeout(function() {
	  	payload();
	}, 5000);
}