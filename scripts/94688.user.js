// ==UserScript==
// @name           FWZ: Incit Script
// @namespace      WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
// @include        http://forumwarz.com/incit
// @include        http://*.forumwarz.com/incit
// ==/UserScript==

$ = unsafeWindow.$;

function alarm() {
	if ($("voting")) {
		//alert("Voting");
		vote();
		setTimeout(alarm, 60000);
	}
	else {
		setTimeout(alarm, 1000);
		if(document.getElementById("mot_title").innerHTML == "Title"){
			document.getElementById("incit_title").value = get_title();
			document.getElementById("incit_motivational_text").value = get_caption();
			document.getElementById("submit_it").click();
		}
	}
}

setTimeout(alarm, 1000);

function random_part(lol){
	while((word=lol[Math.round(Math.random() * lol.length)])===undefined){}
	return word;
}

function get_title(){
	return random_crap(20);
}

function get_caption(){
	return random_crap(50);
}

function vote(){
	votes = document.getElementsByTagName("body")[0].innerHTML.match(/<a.*?onclick="(.*?)".*?Vote for this Submission!<\/a>/);
	if(votes!=null){
		document.getElementById('mot_title').innerHTML = '<button onclick="'+votes[1]+'" id="fukken_gay">INCIT</button>';
		document.getElementById("fukken_gay").click();
	}
}

function random_char(){
	a="abcdefghijklmnopqrstuvwxyz ";
	return a[Math.round(Math.random() * a.length)];
}

function random_word(n){
	string = '';
	for(i=0;i<n;i++){
		string += random_char();
	}
	return string;
}

function random_crap(n){
	return random_word(Math.round(Math.random() * n));
}