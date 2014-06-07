// ==UserScript==
// @name           Google Madoka Magica
// @description    adds image madoka magica 
// @namespace      http://userscripts.org/users/424650
// @author         JonnyRobbie
// @include        http://www.google.com/
// @include        https://www.google.com/
// @version        1.3.2
// ==/UserScript==
window.setTimeout(mmagica, 200);
function mmagica()
{
m_image = document.createElement('div');
m_image.id = 'madoka';
m_image.name = 'madoka';
m_image.style.position = 'absolute';
m_image.style.top = '29px';
m_image.style.left = '0px';
m_image.style.width = '100%'
m_image.style.zIndex = '-1';

m_image.innerHTML = '<img src="http://i.imgur.com/sgycH9N.jpg" style="display:block;margin-left:auto;margin-right:auto;">';

body = document.getElementsByTagName('body')[0];
body.appendChild(m_image);

var down = document.getElementById('tsf');
down.style.width = '311px';
//down.style.marginRight = '60px';

document.getElementById('gs_id0').style.height = '47px';

var down = document.getElementById('footer');
down.style.visibility = 'hidden';

var glogo = document.getElementById('lga');
glogo.style.visibility = 'hidden';

/*var promo = document.getElementById('prm');
promo.style.visibility = 'hidden';*/

var down9 = document.getElementById('lst-ib');
down9.style.font = '30px "arial", sans-serif';

var searchform = document.getElementById('searchform');
searchform.style.top = '719px';
searchform.style.marginLeft = '-30px';

/*var searchform = document.getElementById('body');
searchform.style.marginLeft = '-30px';*/

var box1 = document.getElementsByClassName('jhp');
for (i=0;i<box1.length;++i)
{
	box1[i].style.paddingLeft='0px';
	box1[i].style.paddingRight='0px';
}

var box2 = document.getElementsByClassName('tsf-p');
for (i=0;i<box2.length;++i)
{
	box2[i].style.paddingLeft='0px';
	box2[i].style.paddingRight='0px';
}

var box3 = document.getElementsByClassName('lst-d');
for (i=0;i<box3.length;++i)
{
	box3[i].style.height='46px';
}

var search = document.getElementsByName('btnK');
for (i=0;i<search.length;++i)
{
	search[i].style.position='absolute';
	search[i].style.top='-11px';
	search[i].style.left='305px';
	search[i].style.height='49px';
	search[i].style.width='95px';
	search[i].value='\u691c\u7d22';
	search[i].style.fontSize='30px';
}

var tryluck = document.getElementsByName('btnI');
for (i=0;i<tryluck.length;++i)
{
	tryluck[i].style.visibility='hidden';
}
}
