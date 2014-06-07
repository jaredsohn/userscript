// ==UserScript==
// @id             www.flickr.com-0ba4525c-7f1a-44a1-8657-0d580e02e40b@scriptish
// @name           flickr scraper
// @version        1.5
// @namespace      meh
// @author         asd
// @description    A terrible script used only by terrible people
// @include        http://www.flickr.com/photos/*
// @include        https://www.flickr.com/photos/*
// @include        http://www.flickr.com/groups/*
// @include        https://www.flickr.com/groups/*
// @updateURL        http://userscripts.org/scripts/source/396661.user.js
// @run-at         document-end
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

var gmStoredPageURLS = GM_getValue("storedflckrPageUrls");

if(!gmStoredPageURLS){

	gmStoredPageURLS = {storedflckrPageUrls:[]};

}
else{

	gmStoredPageURLS = JSON.parse(gmStoredPageURLS);

}

GM_registerMenuCommand("Run Scrape", function(){

	var promptValue = prompt('How many image pages do you want to scrape? ('+gmStoredPageURLS.storedflckrPageUrls.length+' page URLs avaible)');
	
	if(!promptValue)
		return;
	
	GM_setValue("scrapeNumber", Number(promptValue) );
	GM_setValue("howManyPagesSoFar",0);
	GM_setValue("runScrape",true);
	window.location.href = gmStoredPageURLS.storedflckrPageUrls[0];

});

GM_registerMenuCommand("Stop Scrape", function(){

	GM_deleteValue("runScrape");

});

GM_registerMenuCommand("Show Links Now (as text)", showOrigLinksAsText);
GM_registerMenuCommand("Show Links Now (as links)", showOrigLinksAsLinks);

GM_registerMenuCommand("Remove Saved Userscript Data", function(){

	GM_deleteValue("storedflckrPageUrls");
	GM_deleteValue("gmStoredimageURLS");
	GM_deleteValue("runScrape");
	GM_deleteValue("scrapeNumber");
	GM_deleteValue("howManyPagesSoFar");
	
	gmStoredimageURLS = null;
	gmStoredPageURLS = null;
	
	

});

var pageMod = document.querySelector('#paginator-module');
var photoListHolder = document.querySelector('#photo-list-holder');
var poolPhotos = document.querySelector('#pool-photos');

//if on the pool or user album page
if(pageMod || photoListHolder || poolPhotos){
	
	var newDiv = document.createElement('div');
	newDiv.setAttribute('style','text-align:center');
	
	var newButton = document.createElement('button');
	newButton.innerHTML = 'Store Page Image URLs';
	
	newButton.addEventListener('click', function(event){
	
		saveflckrURLS();
	
	},false);
	
	newDiv.appendChild(newButton);
	
	document.querySelector('body').insertBefore(newDiv, document.querySelector('#foot'));
	
	
	function saveflckrURLS(){

		var selector = '#pool-photos>.row .pool-photo>div>span>a:first-child';
		
		if(window.location.href.indexOf(window.location.protocol+'//www.flickr.com/photos/') === 0){ //if its a user album and not a pool
		
			selector = '#photo-display-container .photo-display-item .thumb>.photo_container>a';
		
		}
		
		[].forEach.call(document.querySelectorAll(selector),function(elem,index,arr){
		
			gmStoredPageURLS.storedflckrPageUrls.push(elem.href);
			
		});
		
		GM_setValue("storedflckrPageUrls", JSON.stringify(gmStoredPageURLS));

		mylog.log(gmStoredPageURLS.storedflckrPageUrls);
		mylog.log(gmStoredPageURLS.storedflckrPageUrls.length);
		mylog.log(gmStoredPageURLS);
		
		mylog.log(gmStoredPageURLS.toString().indexOf(',,')>-1);
		mylog.log(gmStoredPageURLS.toString().indexOf('/'+window.location.protocol)>-1);

		var howManyDiv1 = document.createElement('div');
		howManyDiv1.setAttribute('style','position:fixed;top:0;left:0;width:300px;height:150px;background-color: #FFFFFF; z-index: 4999;padding:10px;border: 2px solid green;font-size:1em;font-weight:bold;');
		howManyDiv1.innerHTML = gmStoredPageURLS.storedflckrPageUrls.length+' image pages added in total. You can either run the scraper now or go to the next page and add more links.'+
								'(more options available via the greasemonkey/scriptish icon menu) ';
								
		var scButt1 = document.createElement('button');
		scButt1.innerHTML = 'Run Scrape';
		scButt1.setAttribute('style','margin-top:10px;');
		
		scButt1.addEventListener('click', function(event){
		
			var promptValue = prompt('How many image pages do you want to scrape? ('+gmStoredPageURLS.storedflckrPageUrls.length+' page URLs avaible)');
			
			if(!promptValue)
				return;
			
			GM_setValue("scrapeNumber", Number(promptValue) );
			GM_setValue("howManyPagesSoFar",0);
			GM_setValue("runScrape",true);
			window.location.href = gmStoredPageURLS.storedflckrPageUrls[0];
		
		},false);
			
		howManyDiv1.appendChild(scButt1);	


		var scButt3 = document.createElement('button');
		scButt3.setAttribute('style','margin-top:10px;');
		scButt3.innerHTML = 'Remove Saved Userscript Data';
		
		scButt3.addEventListener('click', function(event){
		
			GM_deleteValue("storedflckrPageUrls");
			GM_deleteValue("gmStoredimageURLS");
			GM_deleteValue("runScrape");
			GM_deleteValue("scrapeNumber");
			GM_deleteValue("howManyPagesSoFar");
		
		},false);
			
		howManyDiv1.appendChild(scButt3);		
								
		document.body.appendChild(howManyDiv1);
		
	}
	
}
else if(GM_getValue("runScrape")){//else an individual image page	

	mylog.log(GM_getValue("runScrape"));

	var howManyDiv = document.createElement('div');
	howManyDiv.setAttribute('style','position:fixed;top:0;left:0;width:300px;height:100px;background-color: #FFFFFF; z-index: 4999;padding:10px;border: 2px solid blue;font-size:1em;font-weight:bold;');
	
	var hmP = document.createElement('p');
	hmP.innerHTML = 'You may have to click twice quickly';
	
	howManyDiv.appendChild(hmP);
	
	var scButt = document.createElement('button');
	scButt.setAttribute('style','margin-top:10px;');
	scButt.innerHTML = 'Stop Scrape (you may have to click twice quickly)';
	
	scButt.addEventListener('click', function(event){
	
		GM_deleteValue("runScrape");
		alert('you can show the links you have saved so far via the greasemonkey/scriptish menu');
	
	},false);
		
	howManyDiv.appendChild(scButt);
	
	/*var scButt2 = document.createElement('button');
	scButt2.setAttribute('style','margin-top:10px;');
	scButt2.innerHTML = 'Show Links';
	
	scButt2.addEventListener('click', function(event){
	
		showOrigLinksAsText();
	
	},false);
		
	howManyDiv.appendChild(scButt2);	
	
	var scButt3 = document.createElement('button');
	scButt3.setAttribute('style','margin-top:10px;');
	scButt3.innerHTML = 'Remove Saved Userscript Data';
	
	scButt3.addEventListener('click', function(event){
	
		GM_deleteValue("storedflckrPageUrls");
		GM_deleteValue("gmStoredimageURLS");
		GM_deleteValue("runScrape");
		GM_deleteValue("scrapeNumber");
		GM_deleteValue("howManyPagesSoFar");
	
	},false);
		
	howManyDiv.appendChild(scButt3);	*/

	document.body.appendChild(howManyDiv);
	
	[].forEach.call(document.querySelectorAll('script'), function(item, index, arr){
		
		if(item.textContent.indexOf('Y.ClientApp.init(')>-1){

		//var initialSplit = item.textContent.split('Y.ClientApp.init(')[1].split('.then(')[0];
		//var thenSlice = initialSplit.slice(0,initialSplit.lastIndexOf(")"));

		var initialSplit = item.textContent.split('"photo-models":')[1].split('"photo-engagement-models":')[0];
		
		mylog.log(initialSplit);
		
		var thenSlice = initialSplit.slice(initialSplit.indexOf("[")+1,initialSplit.lastIndexOf("]"));
		
		mylog.log(thenSlice);
		
		var tcJSON = JSON.parse(thenSlice);
		var obK = Object.keys(tcJSON.sizes);
		var obL = obK.length;
		var theEndURL = window.location.protocol+tcJSON.sizes[obK[obL-1]].url;

		mylog.log('original image : '+theEndURL);
			
			gmStoredimageURLS.storedimageURLS.push(theEndURL);
			
			var howManyPagesSoFar = GM_getValue("howManyPagesSoFar");
			howManyPagesSoFar = howManyPagesSoFar+1;
			
			mylog.log('howManyPagesSoFar : '+howManyPagesSoFar);
			
			var scrapeNo = GM_getValue("scrapeNumber");
			
			mylog.log('scrapeNo : '+scrapeNo);
			
			GM_setValue("howManyPagesSoFar", howManyPagesSoFar);
			
			mylog.log('after scrapeNo : GM_setValue("howManyPagesSoFar"');
			
			GM_setValue("gmStoredimageURLS", JSON.stringify(gmStoredimageURLS));
			
			mylog.log('after scrapeNo : GM_setValue("gmStoredimageURLS"');
			
			gmStoredPageURLS.storedflckrPageUrls.shift();
			
			mylog.log('How many left to scrape: '+(scrapeNo-howManyPagesSoFar));
			
			hmP.innerHTML = 'How many left to scrape: '+(scrapeNo-howManyPagesSoFar);
			
			if(gmStoredPageURLS.storedflckrPageUrls === 0 || howManyPagesSoFar >= scrapeNo ){
			
				GM_deleteValue("storedflckrPageUrls");
				GM_deleteValue("gmStoredimageURLS");
				GM_deleteValue("runScrape");
				GM_deleteValue("scrapeNumber");
				GM_deleteValue("howManyPagesSoFar");			
			
				showOrigLinksAsText();
			
			}
			else{

				GM_setValue("storedflckrPageUrls", JSON.stringify(gmStoredPageURLS));
				window.location.href = gmStoredPageURLS.storedflckrPageUrls[0];
				
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

}	
function showOrigLinksAsLinks(){

	mylog.log('showOrigLinksAsLinks ');

	var containerDiv = document.createElement('div');
	containerDiv.setAttribute('id','userscript_containerDiv');
	containerDiv.setAttribute('style','position:relative;top:0;left:0;width:600px;height:600px;background-color: #FFFFFF; z-index: 5000;');

	gmStoredimageURLS.storedimageURLS.forEach(function(item,index,arr){
	
		containerDiv.innerHTML += ('<p><a href="'+item+'">'+item+'</a></p>');	
	
	});
	
	document.body.appendChild(containerDiv);

}
