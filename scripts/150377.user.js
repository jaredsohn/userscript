// ==UserScript==
// @name            dianping
// @namespace      fuluchii.me
// @description    分享时带静态地图
// @include        http://www.dianping.com/shop/*
// ==/UserScript==

var f=function (a){
	var b=-1,
		settings={digi:16,add:10,plus:7,cha:36,center:{lat:34.957995,lng:107.050781,isDef:!0}},
		c=0,
		d="",
		e=a.length,
		f=a.charCodeAt(e-1),
		a=a.substring(0,e-1);
		e--;
		for(var j=0;j<e;j++){
			var g=parseInt(a.charAt(j),settings.cha)-settings.add;g>=settings.add&&(g-=settings.plus);
			d+=g.toString(settings.cha);g>c&&(b=j,c=g)
		}
		a=parseInt(d.substring(0,b),settings.digi);
		b=parseInt(d.substring(b+1),settings.digi);
		f=(a+b-parseInt(f))/2;b=(b-f)/1E5;return{lat:b,lng:f/1E5}
	},
	poi=f(DP.data("mapData").poi);
lat = poi.lat;
lng = poi.lng;
var link = encodeURIComponent(window.location.href);
var html = 'http://maps.googleapis.com/maps/api/staticmap?center='+lat+','+lng+'&zoom=17&size=700x600&maptype=roadmap&markers=color:blue%7Clabel:S%7C'+lat+','+lng+'&sensor=false'
var node = document.createElement('div');
node.id = 'testnode';
node.innerHTML = 
'<a class="item" '+
'href="http://v.t.sina.com.cn/share/share.php?appkey=1392673069&amp;url='+link+'&amp;'+
'title=%E9%82%80%E8%AF%B7%E4%BD%A0%E5%8E%BB'+encodeURIComponent(DP.data("shopName"))+'&amp;source=&amp;content=utf-8&amp;'+
 'pic='+encodeURIComponent(html)+'" target="_blank"><span>约饭</span></a>';
 var sina = document.getElementById('J_shop-share-btn');
sina.parentElement.appendChild(node)