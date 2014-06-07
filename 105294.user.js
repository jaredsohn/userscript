// ==UserScript==
// @name           Show Unread For Gmail
// @namespace      yttest
// @description    Adds a button to do the "is:unread" search in gmail
// @include        https://mail.google.com/mail/*
// @include        http://mail.google.com/mail/*
// @match        https://mail.google.com/mail/*
// @match        http://mail.google.com/mail/*
// ==/UserScript==


var canvas_frame = document.getElementById('canvas_frame');
if(canvas_frame){
	var subdoc=canvas_frame.contentDocument;
	var si = window.setInterval(function(){ //gotta wait for some of the DOM to load
		var topButtons=subdoc.querySelector('.nH .CDVyRd>.RdSZF>div>div');
		if(topButtons){
			window.clearInterval(si);

			var newDiv1=document.createElement('div');
			newDiv1.setAttribute('class','J-J5-Ji');
			newDiv1.setAttribute('id','showUnreadOuterDiv');


			var newDiv2=document.createElement('div');

			newDiv2.innerHTML='Show Unread';
			newDiv2.setAttribute('role','button');
			newDiv2.setAttribute('act','20');
			newDiv2.setAttribute('aria-pressed','false');
			newDiv2.setAttribute('class','J-Zh-I J-J5-Ji L3');
			newDiv2.setAttribute('id','showUnreadInnerDiv');

			newDiv1.appendChild(newDiv2);

			topButtons.appendChild(newDiv1);


			//4 event listeners :(

			newDiv1.addEventListener('mouseover',function(){
				newDiv2.classList.add('J-Zh-I-JW');
			},false);
			newDiv1.addEventListener('mouseout',function(){
				newDiv2.classList.remove('J-Zh-I-JW');
			},false);
			newDiv1.addEventListener('mousedown',function(){
				newDiv2.classList.add('J-Zh-I-Je');
			},false);
			newDiv1.addEventListener('mouseup',function(){
				newDiv2.classList.remove('J-Zh-I-Je');
				location.hash="#search/is%3Aunread";
			},false);
						
		}
	},500);	
}



