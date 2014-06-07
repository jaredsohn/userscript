// ==UserScript==
// @name          Monkey Match
// @namespace     http://www.geocities.com/narayansriram
// @description   2 player memory game using greasemonkey and amazon services
// @include       http://bagheera.50webs.com/match.html
// ==/UserScript==
var fixedUrl = 'http://webservices.amazon.com/onca/xml?Service=AWSECommerceService&SubscriptionId=1PKXRTEQQV19XXDW3ZG2&';

var loadStuff = function(event) {
	event.stopPropagation();
	event.preventDefault();
	startMonkeyMatch();
	document.removeEventListener('dblclick', loadStuff, true);
};

document.addEventListener('dblclick', loadStuff, true);

var imageCount = 0;

function randOrd(a, b){
	return (Math.round(Math.random())-0.5); 
}

function startMonkeyMatch(){
    document.getElementById('playerALabel').innerHTML = document.getElementById('playerAName').value;
    document.getElementById('playerBLabel').innerHTML = document.getElementById('playerBName').value;
	
	if (!GM_xmlhttpRequest) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
	}
	var keyword = document.getElementById("keywd").value;
	var amazonurl = fixedUrl+'&Operation=ItemSearch&Keywords='+keyword+'&SearchIndex=Books&ResponseGroup=Images';
	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: amazonurl,
		headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
		'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var resultxml = responseDetails.responseText.replace(
			/<\?xml version="1.0" encoding="UTF-8"\?>/ ,'');
			
			GM_log('got result xml');
			try{
			var resultdom = new XML(resultxml);
			}catch(ex){
				GM_log(ex.toString());
			}
			GM_log('got result dom'+resultdom.length());
			var amzns = new Namespace('http://webservices.amazon.com/AWSECommerceService/2005-10-05');
			var imagenodes = resultdom..amzns::Item.amzns::MediumImage.amzns::URL.text();
			GM_log('got images'+imagenodes.length());
			var images = new Array();
			imageCount = imagenodes.length();
			for(var i=0; i< imageCount; i++){
				images.push(imagenodes[i]);
				images.push(imagenodes[i]);
			}
			images.sort(randOrd);
			for(var i=0; i<images.length; i++){
				addImage(images[i]);
			}
		}
	});
}
var count = 0;
var coverImgUrl = "http://images.amazon.com/images/P/1576834573.01._SCMZZZZZZZ_.jpg";
var coverImage = null;
var gameImages = new Array();
var oneOpen = false;
var openedImg = null;
var openedSlot = null;
var openedCover = null;
var p1score = document.getElementById('span_p1');
var p2score = document.getElementById('span_p2');
var scorebrdFocus = p1score;

var pnum = 0;
function playit(event){
	var targetid = event.target.getAttribute('id').replace('img_','');
	var targetspan = document.getElementById('span_'+targetid);
	targetspan.replaceChild(gameImages[targetid], event.target);
	event.stopPropagation();
	event.preventDefault();
	if(oneOpen){
		oneOpen = false;
		if(openedImg.src != gameImages[targetid].src){
			if(scorebrdFocus == p1score){
				scorebrdFocus = p2score;
				pnum = document.getElementById('playerBName').value;
				document.getElementById('playerBLabel').setAttribute('class','bighilite');
				document.getElementById('playerALabel').setAttribute('class','big');
			}else{
				scorebrdFocus = p1score;
				pnum = document.getElementById('playerAName').value;
				document.getElementById('playerALabel').setAttribute('class','bighilite');
				document.getElementById('playerBLabel').setAttribute('class','big');
			}
			alert('oh oh. '+pnum+'\'s turn next');
			targetspan.replaceChild(event.target, gameImages[targetid]);
			openedSlot.replaceChild(openedCover, openedImg);
		}else{
			var currentScore = scorebrdFocus.innerHTML;
			scorebrdFocus.innerHTML = ++currentScore;
			if(currentScore > imageCount/2){
				alert(pnum+' has won!');
				var garea = document.getElementById('div_gamearea')	;
				window.location.reload(true);
			}
		}
		
	}else{
		oneOpen = true;
		openedImg = gameImages[targetid];
		openedSlot = targetspan;
		openedCover = event.target;
	}
}	

function addImage(iurl){

	var spanElement = document.createElement('span');
	document.getElementById('div_gamearea').appendChild(spanElement);
	imageElement = document.createElement('img');
	imageElement.src = iurl;
	imageElement.width = 140;
	imageElement.height = 200;
	spanElement.setAttribute('id', 'span_'+count);
	imageElement.setAttribute('id', 'img_'+count);
	gameImages[count] = imageElement;

	var coverElement = document.createElement('img');
	coverElement.src = coverImgUrl;
	coverElement.width = 140;
	coverElement.height = 200;
	coverElement.setAttribute('id', 'img_'+count++);
	coverElement.addEventListener('click', playit, true);

	spanElement.appendChild(coverElement);
}