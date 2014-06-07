// ==UserScript==
// @name           BBBS
// @namespace      http://dribbble.com/*
// @description    Removes crap comments.
// ==/UserScript==

comments = document.getElementById('comments').getElementsByTagName('li');
for(var i = 0; i < comments.length; i++) {
	text = comments[i].getElementsByTagName('p')[0].innerHTML
	BS = text.match(/sweet|sharp|awesome|loving|gorgeous|brilliant|sick|!!|win|drooling|amazing|wow|awesome|good|love|great|beautiful|quality|Dribbble|resigning|terrific|lovely|fan|nice/gi);
	words = text.split(/\s/g);
	if(BS != null && words != null) {
		console.log('hide');
		if((BS.length / words.length) * 100 > 10) {
			comments[i].style.opacity = '.25';
			comments[i].style.paddingBottom = '10px';
			comments[i].style.fontSize = "10px";
			comments[i].getElementsByTagName('p')[1].style.display = "none";
			comments[i].getElementsByTagName('img')[0].style.display = "none";
			comments[i].getElementsByTagName('h2')[0].style.display = 'inline-block';
			comments[i].getElementsByTagName('h2')[0].style.width = 'auto';
			comments[i].getElementsByTagName('h2')[0].style.paddingRight = '15px';
			comments[i].getElementsByTagName('div')[0].style.display = 'inline-block';
			comments[i].getElementsByTagName('div')[0].style.width = 'auto';
			comments[i].getElementsByTagName('div')[0].style.margin = '0px';
			comments[i].getElementsByTagName('div')[0].style.verticalAlign = 'middle';
			comments[i].getElementsByTagName('div')[0].getElementsByTagName('p')[0].style.margin = '0px';
		}	
	}
}