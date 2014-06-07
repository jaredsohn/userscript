
// ==UserScript==
// @name           ExploreScript
// @namespace      http://localhost
// @description    Helpful script that auto explores the city in Hobowars. This version starts in the center and loops around in a random spiral. (Facebook only)
// @author         Xyan flux
// @version        2.0.0
// @include        http://www.hobowars.com/fb/game.php*cmd=explore*
// @exclude
// ==/UserScript==

var  contents = document.getElementById('contents');

if(contents){
	if(Math.random()<.005||GM_getValue('left')==undefined){
		var h=Math.floor(Math.random()*50+100);
		var w=Math.floor(h*(Math.random()*0.32+0.34));
		h=h-w;
		var x=Math.floor((100-w)*Math.random());
		var y=Math.floor((100-h)*Math.random());

		GM_setValue('left',x+w>100?100:x+w);
		GM_setValue('right',x<1?1:x);
		GM_setValue('bottom',y<1?1:y);
		GM_setValue('top',y+h>100?100:y+h);
		GM_setValue('centerx',Math.round(Math.random()*2.8-1.4));
		GM_setValue('centery',Math.round(Math.random()*2.8-1.4));
		if(GM_getValue('centerx')==0&&GM_getValue('centery')==0){
			GM_setValue('centerx',1);
			GM_setValue('centery',1);
		}
	}	
		
	var link, linkText;
	var allLinks, thisLink;

	allLinks = document.evaluate('//a[@href]',document,null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < allLinks.snapshotLength; i++) {
		thisLink = allLinks.snapshotItem(i);
		if(thisLink.href.indexOf('#')+1){
			link =thisLink.href;
			var index1 = link.indexOf('&x=');
			var index2 = link.indexOf('&y=');
			var index3 = link.indexOf('&dir=');

			var x = parseInt(link.substring(index1+3,index2))-1;
			var y = parseInt(link.substring(index2+3,index3))-1;

			link = link.substring(0,index1);

			if(x>=GM_getValue('left',100)&&y<GM_getValue('top',100)){// go up
				link+='&x='+(x)+'&y='+(++y)+'&dir=u';
			}else if(y>=GM_getValue('top',100)&&x>GM_getValue('right',1)){//go left
				link+='&x='+(--x)+'&y='+(y)+'&dir=l';
			}else if(x<=GM_getValue('right',1)&&y>GM_getValue('bottom',1)){//go down
				link+='&x='+(x)+'&y='+(--y)+'&dir=d';
			}else if(y<=GM_getValue('bottom',1)&&x<GM_getValue('left',100)){//go right
				link+='&x='+(++x)+'&y='+(y)+'&dir=r';
			}else {//move away from center
				//link+='&x='+(++x)+'&y='+(--y)+'&dir=d';
				//link+='&x='+(x>50?++x:--x)+'&y='+(y>50?++y:--y)+(y>50?'&dir=u':'&dir=d');
				link+='&x='+(x+GM_getValue('centerx',1))+'&y='+(y+GM_getValue('centery',1))+(GM_getValue('centery',1)>0?'&dir=u':'&dir=d');

			}
			location.href = link;
			return;
		}
	}
}

