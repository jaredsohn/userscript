// ==UserScript==
// @name           Newgrounds BBS Auras
// @namespace      ngauras@snakehole.net
// @description    Colours user posts to the same colour as their aura.
// @include        http://*newgrounds.com/bbs/topic/*
// @include        http://*newgrounds.com/bbs/search/author/*
// ==/UserScript==

function shader(){
var posts = document.getElementsByClassName('post');
colorFade = function(h1, h2, p) { return ((h1>>16)+((h2>>16)-(h1>>16))*p)<<16|(h1>>8&0xFF)+((h2>>8&0xFF)-(h1>>8&0xFF))*p<<8|(h1&0xFF)+((h2&0xFF)-(h1&0xFF))*p; }
var postRoof = 7000;
var postCount;
// Modify quotes to suit any aura colour, form a light gradient when nested via opacity and to be generaly easier to read. In the case of staf the gradient darkens with more nested quotes
// addGlobalStyle('.post blockquote {background-color:rgba(37,39,45,0.3);border-bottom:1px solid rgba(102,109,122,0.2);}');
 // loop through posts, find aura colour and change post colour.
if(location.pathname.match(/author/) == null){
for (i=0; i<posts.length; i++)
{
		postCount = posts[i].childNodes[3].childNodes[1].childNodes[1].childNodes[3].childNodes[9].childNodes[2].innerHTML.replace(',','');
	if (posts[i].childNodes[3].childNodes[1].childNodes[1].childNodes[3].innerHTML.match(/(<a href="\/lit\/faq#upa_aura" class="right">)(EVIL)(<\/a>)/)){
		posts[i].childNodes[3].childNodes[1].childNodes[1].style.backgroundColor='rgb(50,0,0)';
		if (postCount <= postRoof ){
		posts[i].childNodes[3].childNodes[1].childNodes[1].style.backgroundColor='#'+colorFade('0x25272D','0x320000',postCount/postRoof).toString(16)+'';
		}
	}else if (posts[i].childNodes[3].childNodes[1].childNodes[1].childNodes[3].innerHTML.match(/(<a href="\/lit\/faq#upa_aura" class="right">)(LIGHT)(<\/a>)/)){
		posts[i].childNodes[3].childNodes[1].childNodes[1].style.backgroundColor='rgb(0,0,50)';
		if (postCount <= postRoof ){
		posts[i].childNodes[3].childNodes[1].childNodes[1].style.backgroundColor='#'+colorFade('0x25272D','0x000032',postCount/postRoof).toString(16)+'';
		}
	}else if (posts[i].childNodes[3].childNodes[1].childNodes[1].childNodes[3].innerHTML.match(/(<a href="\/lit\/faq#upa_aura" class="right">)(NEUTRAL)(<\/a>)/)){
		posts[i].childNodes[3].childNodes[1].childNodes[1].style.backgroundColor='rgb(0,50,0)';
		if (postCount <= postRoof ){
		posts[i].childNodes[3].childNodes[1].childNodes[1].style.backgroundColor='#'+colorFade('0x25272D','0x003200',postCount/postRoof).toString(16)+'';
		}
	}else if (posts[i].childNodes[3].childNodes[1].childNodes[1].childNodes[3].innerHTML.match(/(<a href="\/lit\/faq#upa_aura" class="right">)(FAB)(<\/a>)/)){
		posts[i].childNodes[3].childNodes[1].childNodes[1].style.backgroundColor='rgb(50,0,50)';
		if (postCount <= postRoof ){
		posts[i].childNodes[3].childNodes[1].childNodes[1].style.backgroundColor='#'+colorFade('0x25272D','0x320032',postCount/postRoof).toString(16)+'';
		}
	}else if (posts[i].childNodes[3].childNodes[1].childNodes[1].childNodes[3].innerHTML.match(/(<a href="\/lit\/faq#upa_aura" class="right">)(DARK)(<\/a>)/)){
		posts[i].childNodes[3].childNodes[1].childNodes[1].style.backgroundColor='rgb(10,10,15)';
		if (postCount <= postRoof ){
		posts[i].childNodes[3].childNodes[1].childNodes[1].style.backgroundColor='#'+colorFade('0x25272D','0x0a0a0f',postCount/postRoof).toString(16)+'';
		}
	}
	if (posts[i].childNodes[3].childNodes[1].childNodes[1].childNodes[3].innerHTML.match(/(\/staff\/)/)){
		
		posts[i].childNodes[3].childNodes[1].childNodes[1].style.backgroundColor='rgb(75,75,75)';
		//alert(posts[i].parentNode.parentNode.parentNode.getAttribute('id'));
		//addGlobalStyle('#' + posts[i].parentNode.parentNode.parentNode.getAttribute('id') + ' .userstats .gray {color:#fff !important;} ' + '#' + posts[i].parentNode.parentNode.parentNode.getAttribute('id') + ' blockquote {background-color:rgba(0,0,0,0.3) !important;');
		cssText += '#' + posts[i].parentNode.parentNode.parentNode.getAttribute('id') + ' .userstats .gray {color:#fff !important;} ' + '#' + posts[i].parentNode.parentNode.parentNode.getAttribute('id') + ' blockquote {background-color:rgba(0,0,0,0.3) !important; color: rgb(152, 159, 172) !important;}';
	}
}
}

}
var cssText = '.post blockquote {background-color:rgba(37,39,45,0.3);border-bottom:1px solid rgba(102,109,122,0.2);}';
function addGlobalStyle(css)
{
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle(cssText);
shader();
	//alert(colorFade('0xFF0000','0xFF00FF',1).toString(16)+'');
	//alert(colorFade('0xFF0000','0xFF00FF',1).toString(16)+'');