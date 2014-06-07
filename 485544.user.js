// ==UserScript==
// @id             smg.photobucket.com-d7208c0c-ebe5-48d7-ac29-658c56e45a9c@meh
// @name           photobucket scraper
// @version        1.0
// @namespace      PhotoBGM
// @author         asd
// @description    A terrible script used only by terrible people
// @include        http://smg.photobucket.com/user/*/library/*
// @include        https://smg.photobucket.com/user/*/library/*
// @updateURL        http://userscripts.org/scripts/source/485544.user.js
// @run-at         document-idle
// ==/UserScript==

var mylog = {

		log: function(string){
		
			//console.log(string);
			return;
		
		}

};

var gmStoredimageURLS = GM_getValue("gmStoredimageURLS");

if(!gmStoredimageURLS){

	gmStoredimageURLS = {storedimageURLS:[]};

}
else{

	gmStoredimageURLS = JSON.parse(gmStoredimageURLS);

}

GM_registerMenuCommand("Run Scrape", function(){

	GM_setValue("runScrape",true);
	window.location.href = gmStoredPageURLS.storedPhotoBuckPageUrls[0];

});

GM_registerMenuCommand("Stop Scrape", function(){

	GM_deleteValue("runScrape");

});

GM_registerMenuCommand("Remove Saved Userscript Data", function(){

	GM_deleteValue("gmStoredimageURLS");
	GM_deleteValue("runScrape");
	
	gmStoredimageURLS = null;

});

var nextButton = document.querySelector('#nextButton');

//if the scrape is not currently running, show the button
if(!GM_getValue("runScrape")){
	
	var newA = document.createElement('a');
	newA.innerHTML = 'Scrape';
	newA.setAttribute('class','responsive btn btn-small btn-secondary');
	newA.setAttribute('style','float:left;');

	newA.addEventListener('click', function(event){
	
		GM_setValue("runScrape",true);
		savePhotoBURLS();
	
	},false);
	
	var getIinsertParent = document.querySelector('.libraryButtons>.libraryActions');

	getIinsertParent.insertBefore(newA, getIinsertParent.firstChild);

}
else{

	savePhotoBURLS();

}

function savePhotoBURLS(){

	[].forEach.call(document.querySelectorAll('#mediaThumbnailWrapper .thumbnailLink[href*="/media/"]'), function(item, index, arr){

		var userURL = item.href.split('/user/')[1].split('/media/')[0];
		var conatURL = 'http://smg.photobucket.com/download-albums/v215/'+userURL+'/'+item.href.split('.html')[0].split('http://smg.photobucket.com/user/'+userURL+'/media/')[1];

		gmStoredimageURLS.storedimageURLS.push(conatURL);

		if(index === arr.length-1){

			GM_setValue("gmStoredimageURLS", JSON.stringify(gmStoredimageURLS));

			if(nextButton){

				window.location.href = nextButton.href;

			}
			else{
				
				showOrigLinksAsText();

			}

		}

	});	

}

function showOrigLinksAsText(){

	mylog.log('showOrigLinksAsText ');

	var containerDiv = document.createElement('div');
	containerDiv.setAttribute('id','userscript_containerDiv');
	containerDiv.setAttribute('style','position:absolute;top:0;left:0;width:600px;height:600px;background-color: #FFFFFF; z-index: 5000;');
	
	var textA = document.createElement('textarea');
	textA.setAttribute('id','userscript_textA');
	textA.setAttribute('style','overflow:scroll;width:100%;height:100%;padding:10px;border: 2px solid #FF0000;');
	
	containerDiv.appendChild(textA);
	
	/*var newP = document.createElement('p');
	newP.setAttribute('id','userscript_newP');

	containerDiv.appendChild(newP);*/

	gmStoredimageURLS.storedimageURLS.forEach(function(item,index,arr){
	
		textA.value += (item+'\n');	
	
	});
	
	document.body.appendChild(containerDiv);

	GM_deleteValue("gmStoredimageURLS");
	GM_deleteValue("runScrape");
	
	gmStoredimageURLS = null;	

}	
