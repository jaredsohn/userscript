// ==UserScript==
// @name        carbot starcraft
// @namespace   http://us.battle.net/sc2/en/
// @description change sc2 portraits
// @include        http://*.battle.net/sc2/*
// @match          http://*.battle.net/sc2/*
// ==/UserScript==
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}

var gifs = ['0-26','0-34','3-32','2-4','3-24','2-6','3-25','3-29','3-26','2-5'];
var jpgs = ['0-0','0-26','0-34','2-4','2-5','2-14','3-6','3-14','3-24','3-25','3-26','3-28','3-30','3-32','3-33'];

var portraits, ext;

	function GetFilename(url)
	{
	   if (url)
	   {
	      var m = url.toString().match(/.*\/(.+?)\./);
	      if (m && m.length > 1)
	      {
	         return m[1];
	      }
	   }
	   return "";
	}


function changeImg(option){
	switch(option){
		case 0:portraits = jpgs, ext = 'jpg';
		break;
		case 1:portraits = gifs, ext = 'gif';
		break;
		default:
	}
	var divs = document.getElementsByClassName('avatar-interior');

	for (var i=0;i<divs.length;i++) {
		var im = divs[i].getElementsByTagName('a')[0].getElementsByTagName('img')[0];
		var name = GetFilename(im.src);
		if(portraits.indexOf(name)>-1){
			im.src = 'http://dl.dropboxusercontent.com/u/181454639/'+name+'.'+ext;
		}
	}
}

var c=document.createElement("select");
var option = document.createElement('option');
option.value = '0';
option.appendChild(document.createTextNode('JPG'));
c.appendChild(option);

option = document.createElement('option');
option.value = '1';
option.appendChild(document.createTextNode('GIF'));
c.appendChild(option);
c.selectedIndex = GM_getValue('imgtype', 0);

c.style.opacity="0.7";
c.style.filter="alpha(opacity=70)";
c.style.position="fixed";
c.style.zIndex="9000";
c.style.top="15px";
c.style.right="20px";
c.style.background="#000";
c.style.styleFloat="right";
c.style.padding="7px%2010px";
c.style.color="#fff";
c.style.border="solid%202px%20#fff";
c.style.textDecoration="none";
c.style.textAlign="left";
c.style.font="12px Lucida Grande,Helvetica,Tahoma";
c.style.MozBorderRadius="5px";
c.style.WebkitBorderRadius="5px";
document.body.appendChild(c);
//c.onclick=function(){document.body.removeChild(c)};
c.onchange = function(){
	GM_setValue('imgtype', c.selectedIndex);
	changeImg(c.selectedIndex);
};

c.onchange();

/*var gifs = {'0_26':'sl535w385','0_34':'5xptzqno5','3_32':'pd9skbvpx','2_4':'rzg49s85x','3_24':'3qq6pk7rp',
	'2_6':'k9iiw4klx','3_25':'k88l2pis5','3_29':'7w5op7uxh','3_26':'jb25tu79x'};
var jpgs = {'0_0':'uxd33hftd','0_26':'u948kjh3l','0_34':'dze2hn6fl','2_4':'gltkykxn5','2_5':'t34tzhi6p',
	'2_14':'bed37v6fl','3_6':'3znrfhkk1','3_14':'kop7beh5d','3_24':'cbjigqhxt','3_25':'5l7ml1k5t',
	'3_26':'lkloquqtt','3_28':'llvmk9snl','3_30':'hhz95im35','3_32':'d2gu099ox','3_33':'l5f0bkua9'};
*/