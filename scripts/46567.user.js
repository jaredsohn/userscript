// ==UserScript==
// @name           Newgrounds Aura Wars
// @namespace      ngbbswars@snakehole.net
// @description    See how much of the page your Allies and Enemies control
// @include        http://*newgrounds.com/bbs/topic/*
// ==/UserScript==

function calc2(a, b) {
c = a/b;
d = c*100 + '%';
//alert(d);
return d;
}

function calc(){
var posts = document.getElementsByClassName('post');
var fab = 0,light = 0,neutral = 0,evil = 0,dark = 0,mod = 0,staff = 0;

for (i=0; i<posts.length; i++)
{
	if (posts[i].childNodes[3].childNodes[1].childNodes[1].childNodes[3].innerHTML.match(/(G.gif\")/)){
		mod += 1;
	}else
	if (posts[i].childNodes[3].childNodes[1].childNodes[1].childNodes[3].innerHTML.match(/(\/staff\/)/)){
		staff += 1;
	}else
	if (posts[i].childNodes[3].childNodes[1].childNodes[1].childNodes[3].innerHTML.match(/(<a href="\/lit\/faq#upa_aura" class="right">)(EVIL)(<\/a>)/)){
		evil += 1;
	}else
	if (posts[i].childNodes[3].childNodes[1].childNodes[1].childNodes[3].innerHTML.match(/(<a href="\/lit\/faq#upa_aura" class="right">)(LIGHT)(<\/a>)/)){
		light += 1;
	}else
	if (posts[i].childNodes[3].childNodes[1].childNodes[1].childNodes[3].innerHTML.match(/(<a href="\/lit\/faq#upa_aura" class="right">)(NEUTRAL)(<\/a>)/)){
		neutral += 1;
	}else
	if (posts[i].childNodes[3].childNodes[1].childNodes[1].childNodes[3].innerHTML.match(/(<a href="\/lit\/faq#upa_aura" class="right">)(FAB)(<\/a>)/)){
		fab += 1;
	}else
	if (posts[i].childNodes[3].childNodes[1].childNodes[1].childNodes[3].innerHTML.match(/(<a href="\/lit\/faq#upa_aura" class="right">)(DARK)(<\/a>)/)){
		dark += 1;
	}
}

var auraWars = '';
	auraWars += '<!-- /////////////////////////////////////////////////////////////////////////////////////////////////////////// -->';
	auraWars += '<div class="box title">';
	auraWars += '<div class="boxtop"><div></div></div>';
	auraWars += '<div class="boxl">';
	auraWars += '<div class="boxr">';
	auraWars += '<div class="boxm">';
	auraWars += '<div class="headsizer">';
	auraWars += '<div class="heading">';
	auraWars += '<h2 class="i-bbs">Aura Wars<strong class="gray">:</strong> <span id="ngAuraOutcome">Status Report</span></h2>';
	auraWars += '</div></div>';
	auraWars += '<div style="height:16px;line-height:16px;">';
	auraWars += '<span id="ngAuraStaff" style="display:block; overflow: hidden; width:0%; float:left; text-align:center; background-color:rgb(75,75,75);">&nbsp;</span>'; // Staff
	auraWars += '<span id="ngAuraFab" style="display:block; overflow: hidden; width:0%; float:left; text-align:center; background-color:rgb(50,0,50)">&nbsp;</span>';	// Fab
	auraWars += '<span id="ngAuraLight" style="display:block; overflow: hidden; width:0%; float:left; text-align:center; background-color:rgb(0,0,50)">&nbsp;</span>'; // Light
	auraWars += '<span id="ngAuraNeutral" style="display:block; overflow: hidden; width:0%; float:left; text-align:center; background-color:rgb(0,50,0)">&nbsp;</span>'; // Neutral
	auraWars += '<span id="ngAuraEvil" style="display:block; overflow: hidden; width:0%; float:left; text-align:center; background-color:rgb(50,0,0)">&nbsp;</span>'; // Evil
	auraWars += '<span id="ngAuraDark" style="display:block; overflow: hidden; width:0%; float:left; text-align:center; background-color:rgb(10,10,15)">&nbsp;</span>'; // Dark
	auraWars += '<span id="ngAuraMod" style="display:block; overflow: hidden; width:0%; float:left; text-align:center; background-color:rgb(240,190,0);color:#000">&nbsp;</span>'; // Mod

	auraWars += '</div>';
	auraWars += '</div>';
	auraWars += '</div>';
	auraWars += '</div>';
	auraWars += '<div class="boxbot"><div></div></div>';
	auraWars += '</div>';
	auraWars += '<!-- /////////////////////////////////////////////////////////////////////////////////////////////////////////// -->';

var logo = document.createElement("div");
logo.innerHTML = auraWars;
var firstPost=posts[0].parentNode.parentNode.parentNode;
//alert(posts[0].parentNode.parentNode.parentNode.getAttribute('id'));
firstPost.insertBefore(logo, firstPost.firstChild);

document.getElementById('ngAuraFab').style.width = calc2(fab, fab + light + neutral + evil + dark + mod + staff);
document.getElementById('ngAuraFab').innerHTML = fab;
document.getElementById('ngAuraLight').style.width = calc2(light, fab + light + neutral + evil + dark + mod + staff);
document.getElementById('ngAuraLight').innerHTML = light;
document.getElementById('ngAuraNeutral').style.width = calc2(neutral, fab + light + neutral + evil + dark + mod + staff);
document.getElementById('ngAuraNeutral').innerHTML = neutral;
document.getElementById('ngAuraEvil').style.width = calc2(evil, fab + light + neutral + evil + dark + mod + staff);
document.getElementById('ngAuraEvil').innerHTML = evil;
document.getElementById('ngAuraDark').style.width = calc2(dark, fab + light + neutral + evil + dark + mod + staff);
document.getElementById('ngAuraDark').innerHTML = dark;
document.getElementById('ngAuraMod').style.width = calc2(mod, fab + light + neutral + evil + dark + mod + staff);
document.getElementById('ngAuraMod').innerHTML = mod;
document.getElementById('ngAuraStaff').style.width = calc2(staff, fab + light + neutral + evil + dark + mod + staff);
document.getElementById('ngAuraStaff').innerHTML = staff;
//  alert(posts[0].childNodes[3].childNodes[1].childNodes[1].childNodes[3].innerHTML);
}

calc();


// alert(posts[i].childNodes[3].childNodes[1].childNodes[1].childNodes[3].childNodes[1].innerHTML); // IMG tag
// alert(posts[i].childNodes[3].childNodes[1].childNodes[1].childNodes[3].childNodes[3].innerHTML); // AURA

//  posts[i].childNodes[3].childNodes[1].childNodes[1].childNodes[3].innerHTML.match('EVIL')  //oldline