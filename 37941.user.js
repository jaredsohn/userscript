// ==UserScript==
// @name			Experts Exchange
// @namespace		smk
// @description		show answers more prominently
// @include			http://www.experts-exchange.com/*
// @require			https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.js
// @require			https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js
// @require			https://raw.github.com/jashkenas/underscore/master/underscore.js
// ==/UserScript==

let options={
	warn_noanswers: true,
	useGoogleReferrer: false,
	loadingOverlay: true,
}

let msg_answersNotFound='Warning: answers are not present on this page';

function removeLogCookies(){
	$.removeCookie('CC_0');
}

function childToCenter(node){
	node.innerHTML='<table style="width:100%; height:100%;"><tr align="center" valign="middle"><td>'+node.innerHTML+
		'</td></tr></table>';
}

/**
answer retrieval methods
*/

function getFailed(){
	if(options.warn_noanswers)
		alert(msg_answersNotFound);
	if(options.loadingOverlay) removeNode(overlay);
}

function getSuccess(){
	if(options.loadingOverlay) removeNode(overlay);
}

function getAnswers(inHttpRequest){
	let realAnswers;
	try{
		realAnswers=getClass("answers",false,1);
		let pRealAnswers=realAnswers;
		while(pRealAnswers.getAttribute('id')!='pageMain'){
			realAnswers=pRealAnswers;
			pRealAnswers=pRealAnswers.parentNode;
		}
	}catch(e){
		realAnswers=document.getElementById('bottomSolutionDiv');
	}
	if(!realAnswers){
		if(!inHttpRequest){
			if(options.loadingOverlay){
				overlay=document.createElement('div');
				overlay.id='eeOverlay';
				overlay.setAttribute('style',
					'z-index:10000;'+
					'opacity:0.5;'+
					'background-color:#000000;'+
					'position:fixed; top:0px; left:0px; width:100%; height:100%; color:#FFFFFF; text-align:center; vertical-align:middle;');
				let overlayText=document.createElement('div');
				overlayText.setAttribute('style','font-size:1.5em; width:100%; height:100%;');
				overlayText.textContent='Loading...';
				childToCenter(overlayText);
				overlay.appendChild(overlayText);
				document.body.appendChild(overlay);
			}
		}
	}
	return realAnswers;
}

function cleanupEE(inHttpRequest){
	//remove log cookies
	removeLogCookies();
	
	//add actual answers
	let question=$('#questionView');
	
	//move related solutions to col2 (see page.css, this appears to be where it's meant to go)
	let relatedSolutions=$('<div></div>').addClass('stlco frcomponent-alt-bg2').append($('#relatedContent'));
	$('#col2').append(relatedSolutions);
	
	//remove junk nodes
	removeAds();
	
	if(!question.length)
		return false;
	
	return true;
}

function removeAds(){
	//fake answers
	$('.answerOverlayContainer').remove();
	$('.viewQuestionAnswerOverlay').remove();
	//sign-up ads
	$('#messagingHero').remove();
	$('.bffr_trusted').remove();
	$('.viewQuestionBuffer').remove();
	$('.techskills').remove();
	$('.lo-cta.expert').remove();
	//duplicate business sign-up button
	$('.confirm[href*="/business.jsp?"]').remove();
}

function main(){
	cleanupEE();
}

main();
