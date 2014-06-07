// ==UserScript==
// @name				poketd
// @description	        add more comfort to the pokecenter
// @include				http://www.sndgames.com/games/ptd/*
// ==/UserScript==


var url=window.location.href;
var ps=document.getElementsByTagName("p");

var s='';
s+='* { margin: 0; padding 0; }'

function p_standard(p) {
	p.position='absolute';
	p.border='1px solid black';
	p.width='48%';
	p.left='25%';
	p.padding='1%';
	p.textAlign="center";
}
function p_left(p) {
	p.position='absolute';
	p.border='1px solid black';
	p.width='21%';
	p.left='1%';
	p.padding='1%';
}
function p_right(p) {
	p.position='absolute';
	p.border='1px solid black';
	p.width='21%';
	p.right='1%';
	p.padding='1%';
}
function title(p) {
	p_standard(p);
	p.fontSize='larger';
	p.top='2%';
	p.bottom='85%';
}
function subtitle(p) {
	p_standard(p);
	p.fontSize='smaller';
	p.top='16%';
	p.bottom='75%';
}
function subtitle_half(p,h) {
	p_standard(p);
	p.fontSize='smaller';
	p.top='16%';
	p.bottom='75%';
	p.width='22%';
	if(h!=1) {
		p.left='51%';
	}
}
function subsubtitle(p) {
	p_standard(p);
	p.fontSize='smaller';
	p.top='26%';
	p.bottom='65%';
}
function footnote(p) {
	p_standard(p);
	p.fontSize='smaller';
	p.bottom='2%';
}
function profile(p) {
	p_standard(p);
	p.top='26%';
	p.width='14%';
}
function third(p,w) {
	p_left(p);
	p.width='30%';
	if(w==2) {
		p.left='34%';
	}
	if(w==3 || w==0) {
//	if(w==3) {
		p.left='67%';
	}
}
function goback(p) {
	p_right(p.style);
	p.innerHTML = p.innerHTML.replace(/ - /gi, '<br>');
	p.innerHTML += '<br><a href="trading.php">Logout</a>';
	p.style.top='2%';
	p.style.textAlign='center';
}

if(url.search(/trading.php/) != -1) {
// startseite
	s+='#form1 { position: absolute; text-align: center; top: 26%; bottom: 45%; left: 30%; width: 40%; border: 1px black solid; padding-top: 1%; }';
	s+='form > p { padding: 5px; }';
	title(ps[0].style);
	subtitle(ps[2].style);
	footnote(ps[1].style);
}

if(url.search(/trading_account.php/) != -1) {
	title(ps[0].style);
	footnote(ps[1].style);
	subtitle(ps[2].style);
	ps[2].style.fontSize='medium';
	p_left(ps[3].style);
	ps[3].style.top='26%';
	profile(ps[4].style);
	ps[4].innerHTML = ps[4].innerHTML.replace(/ - /gi, '<br>');
	profile(ps[5].style);
	ps[5].innerHTML = ps[5].innerHTML.replace(/ - /gi, '<br>');
	ps[5].style.left='42%';
	profile(ps[6].style);
	ps[6].innerHTML = ps[6].innerHTML.replace(/ - /gi, '<br>');
	ps[6].style.left='59%';
}

if(url.search(/checkPokemon.php/) != -1) {
	var last_menu_entry= 10;
	title(ps[0].style);
	footnote(ps[1].style);
	goback(ps[2]);
	ps[2].style.fontSize='medium';
	var tp=26;
	for(var i=3; i < last_menu_entry; i++) {
		ps[i].innerHTML = ps[i].innerHTML.replace(/ -.*/gi, '');
		p_left(ps[i].style);
		ps[i].style.top=tp+'%';
		tp+=10;
	}
	p_standard(ps[last_menu_entry].style);
	ps[last_menu_entry].style.top='26%';
	ps[last_menu_entry].style.border='';
	tp=40;
	for(var i=10; i<ps.length; i++) {
		if(ps[i].innerHTML.search(/acceptPickup.php/) != -1) {
			p_standard(ps[i].style);
			ps[i].style.top=tp+'%';
			ps[i].style.border='';
			tp+=8;
		}
	}
}

if(url.search(/createTrade.php/) != -1) {
	title(ps[0].style);
	footnote(ps[1].style);
	goback(ps[2]);
	subtitle(ps[3].style);
	subsubtitle(ps[4].style);
	var tp=36;
	var left=1;
	for(var i=5; i < ps.length-1; i++) {
		ps[i].innerHTML = ps[i].innerHTML.replace(/ - /gi, '<br>');
		p_left(ps[i].style);
		ps[i].style.top=tp+'%';
		ps[i].style.left=left+'%';
		ps[i].style.border='';
		if(i%4==0) {
			tp+=17;
		}
		left=1+((i%4)*25);
	}
	tp+=17;
	ps[1].style.top=tp+'%';
	ps[1].style.bottom='';
}

// Daily Code
if(url.search(/dailyCode.php/) != -1) {
	title(ps[0].style);
	footnote(ps[1].style);
	goback(ps[2]);
	p_standard(ps[3].style);
	ps[3].style.top='26%';
	ps[3].style.border='';
	p_standard(ps[4].style);
	ps[4].style.top='50%';
	ps[4].style.border='';
	var tp=35
	for(var i=4; i < 7; i++) {
		if(ps[i].innerHTML.search(/Buy/) != -1) {
			p_standard(ps[i].style);
			ps[i].style.top=(tp+(i-4)*10)+'%';
		}
	}
}

if(url.search(/dailyCode_Prizes.php/) != -1) {
	var uls=document.getElementsByTagName("ul");
	title(ps[0].style);
	footnote(ps[1].style);
	goback(ps[2]);
	for(var i=0; i < 3; i++) {
		third(ps[i+3].style,i+1);
		ps[i+3].style.top='25%';
		third(uls[i].style,i+1);
		uls[i].style.top='34%';
		uls[i].style.border='';
		uls[i].style.fontSize='smaller';
		uls[i].style.paddingLeft='2%';
	}
}

if(url.search(/inventory.php/) != -1) {
	title(ps[0].style);
	footnote(ps[1].style);
	goback(ps[2]);
	p_standard(ps[3].style);
	ps[3].style.top='26%';
	p_standard(ps[4].style);
	ps[4].style.top='36%';
}

if(url.search(/inventory_avatar.php/) != -1) {
	title(ps[0].style);
	footnote(ps[1].style);
	goback(ps[2]);
	subtitle(ps[3].style);
	var tp=26;
	for(var i=4; i<ps.length; i++) {
		if(ps[i].innerHTML.search(/inventory_avatarChange.php/) != -1) {
			p_standard(ps[i].style);
			ps[i].style.top=tp+'%';
			ps[i].style.border='';
			tp+=8;
		}
	}
}

if(url.search(/tradeMeSetup.php/) != -1) {
	s+="body { color: white; }"
	s+="body * { color: black; }"
	title(ps[0].style);
	footnote(ps[1].style);
	//ps[2].innerHTML = ps[2].innerHTML.replace(/ - /gi, '<br>');
	subtitle(ps[2].style);
	ps[2].style.fontSize='medium';
	ps[2].style.width='35%';
	subtitle(ps[27].style);
	ps[27].style.fontSize='medium';
	ps[27].style.width='10%';
	ps[27].style.left='63%';
	//var backlink=url.replace(/tradeMeSetup.php/,'checkPokemon.php')
	//var backlink=backlink.replace(/&pokeID=[0-9]*/,'')
	//ps[27].innerHTML+='<a href="'+backlink+'"><button>Cancel</button></a>';

	var tp= 26;
	var t= 1;
	var left= 0;
	for(var i=3; i<27; i++) {
		left=(((t-1)%3)+1)*21;
		third(ps[i].style,t%3);
//		third(ps[i].style,((t-1)%3)+1);
		ps[i].style.top=tp+'%';
		ps[i].style.border='';
		ps[i].style.left=left+'%';
		tp+=6;
		if((i-2)%4==0) {
			t+=1;
			tp=25;
			if(t>3) {
				tp=55;
			}
		}
	}
}

if(url.search(/yourTrades.php/) != -1) {
	title(ps[0].style);
	footnote(ps[1].style);
	goback(ps[2]);
	subtitle_half(ps[3].style,1);
	var tp=26;
	var count=4;
	for(var i=4; i<ps.length; i++) {
		if(ps[i].innerHTML.search(/viewRequest.php/) != -1) {
			ps[i].innerHTML = ps[i].innerHTML.replace(/ - /gi, '<br>');
			subtitle_half(ps[i].style,1);
			ps[i].style.top=tp+'%';
			ps[i].style.border='';
			ps[i].style.fontSize='medium';
			tp+=18;
			count+=1;
		}
	}
	subtitle_half(ps[count].style);
}

if(url.search(/viewRequest.php/) != -1) {
	title(ps[0].style);
	footnote(ps[1].style);
	goback(ps[2]);
	subtitle(ps[3].style);
	ps[3].style.fontSize='medium';
	var tp= 26;
	for(var i=4; i<ps.length; i++) {
		p_standard(ps[i].style);
		ps[i].style.top=tp+'%';
		ps[i].style.border='';
		tp+=10;
	}
}

GM_addStyle(s);


