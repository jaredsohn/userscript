// ==UserScript==
// @name           BF Test
// @namespace      Test
// @description    Le numéro va en descendant (Si vous entrez 1999, ça fait 1999, 1998, 1997 etc.)
// @include        https://cmaisonneuve.omnivox.ca/*
// ==/UserScript==

if (readCookie('bobtest')) {
	//	window.alert(readCookie('bobtest'));
	if (document.URL == 'https://cmaisonneuve.omnivox.ca/estd/default.aspx') {	
		if (readCookie('bobtest') > 0) {
  			document.forms[0].elements[1].value = readCookie('agetest');
  			document.forms[0].elements[2].value = readCookie('bobtest');
		
	  		document.forms[0].submit();
		};
	} else {
		if (String(document.URL).substring(0,45) == 'https://cmaisonneuve.omnivox.ca/estd/Menu.ovx'){
			window.alert('Code: '+readCookie('bobtest'));
		}else{
			var answer = true;
			//confirm('Back?'+readCookie('bobtest'));
			
			if (answer == true){
				var val1 = readCookie('bobtest') - 1;
				eraseCookie('bobtest');
				createCookie('bobtest', val1);
				window.location = 'https://cmaisonneuve.omnivox.ca/estd/default.aspx';
			};
			
		};
	};
}else{
	var answerAge = prompt ("Code?","0600000");
	var answerBob = prompt ("Numéro de départ?","1999");

	if (answerAge.length==7){
		window.alert('Creation du cookie.');
		createCookie('bobtest', answerBob);
		createCookie('agetest', answerAge);
		window.location = 'https://cmaisonneuve.omnivox.ca/estd/default.aspx';
	};
};

function createCookie(name,value) {
	var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}