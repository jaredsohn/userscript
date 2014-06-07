// ==UserScript==
// @name		[CandrabeQx] Top 10 Facebook Best Friends
// @namespace		CandrabeQx-Facebook-Best-Friends
// @description		Shows your top 10 friends on Facebook that are mostly interacting with you. It'll display on your homepage, below the "FAVOURITE" on the left side.
// @include		/^https?:\/\/(www\.)?facebook\.com\/.+/
// @author		CandrabeQx
// @version		1.2.2
// @downloadURL		http://userscripts.org/scripts/source/153532.user.js
// @updateURL		http://userscripts.org/scripts/source/153532.meta.js
// @icon		http://candrabeqx.net/img/128-32bit.png
// ==/UserScript==
var $c=[],$d=document,_id='bestFriendNav',$dftr_sblmnya=[],$t=0,el,
ajaxHandler=function(i,a){
	var e,f;
	if(i===undefined){
		i=-1;
	}
	if(i>-1)
		el.appendChild(bikinLi(JSON.parse(a)));
	if(i>=9)
		return;
	i++;
	if($c[i]==undefined)
		return;
	getAjax('http://graph.facebook.com/'+$c[i],function(a){ajaxHandler(i,a);},function(){ajaxHandler(i,'{"id":$c[i],"name":"Failed to load data"}')});
},
bikinLi=function(obj){
	var 	a=$d.createElement('a'),
		li=$d.createElement('li'),
		div=$d.createElement('div'),
		span=$d.createElement('span'),
		img=$d.createElement('img'),
		div2=$d.createElement('div');

	div2.className='linkWrap';
	div2.textContent=obj.name;

	img.className='img';
	img.src='http://graph.facebook.com/'+obj.id+'/picture';
	img.style.width='16px';
	img.style.height='16px';

	span.className='imgWrap';
	span.appendChild(img);

	div.appendChild(span);
	div.appendChild(div2);

	a.className='item clearfix sortableItem';
	a.href='/profile.php?id='+obj.id;
	a.appendChild(kasihPanah(parseInt(obj.id)));
	a.appendChild(div);

	li.className='sideNavItem stat_elem';
	li.appendChild(a);

	return li;
},
bikinSideNav=function(e){
	var 	h4=$d.createElement('h4'),
		ul=$d.createElement('ul'),
		div=$d.createElement('div');

	h4.className='navHeader';
	h4.textContent='TOP 10 BEST FRIENDS';
	ul.className='uiSideNav mts mbm nonDroppableNav';
	div.className='homeSideNav';
	div.id=_id;
	div.appendChild(h4);
	div.appendChild(ul);
	e.insertBefore(div,e.firstChild);
	el=ul;
},
kasihPanah=function(ids){
	var nul=$d.createTextNode('');

	if(!$dftr_sblmnya)
		return nul;

	var xf,pos=$dftr_sblmnya.indexOf(ids);
	if(pos==-1)
		pos=11;

	xf=pos-$c.indexOf(ids+'');
	if(xf==0)
		return nul;

	var 	div=$d.createElement('div'),
		img=$d.createElement('img');

	img.src='/images/insights/'+(xf<0?'red-down':'green-up')+'.gif';
	img.setAttribute('title',xf<0?'down':'up');
	img.style.verticalAlign='bottom';

	div.className='rfloat';
	div.appendChild(img);
	return div;
},
getAjax=function(href,onload,onerror,method,params){
	var ajax=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
	if(onload===undefined)
		return;
	if(onerror===undefined)
		onerror=function(){return;};
	if(ajax){
		ajax.onreadystatechange=function(){
			if(this.readyState==4){
				if(this.status==200)
					onload(this.responseText);
				else 	onerror();
			}
		};
		ajax.open('GET',href,true);
		ajax.send();
	}else 	onerror();
},
setCookie=function(v,d){
	if(d){
		var date=new Date();
		date.setTime(date.getTime()+d*24*60*60*1000);
		var e="; expires="+date.toUTCString();
	}else 	var e="";
	document.cookie=v+e+"; path=/";
},
getCookie=function(a){
	var c=document.cookie.split(';'),n,v;
	for(var i in c){
		c[i]=c[i].replace(/^\s+|\s+$/g,"");
		n=c[i].indexOf('=');
		if(a==c[i].substr(0,n))
			return c[i].substr(n+1);
	}
	return null;
},
checker=function(ev){
	if($d.getElementById(_id))
		return;
	var dc=ev.target;
	if(!dc)
		return;
	if(!dc.getElementsByClassName)
		return;
	if(dc.getElementsByClassName('homeSideNav').length<1)
		return;
	checkIt();
},
checkIt=function(asd){
	var s,c,d,e,f,co='_candrabeqx-bestfriendlist',t=(new Date()).getTime();

	e=$d.getElementById('pagelet_bookmark_nav');
	if(!e)
		return;

	if($t==0)
		eval(unescape(getCookie(co)));
	bikinSideNav(e.firstChild);

	s=$d.getElementsByTagName('script');
	for(var i in s){
		c=s[i].innerHTML;
		d=c.indexOf('InitialChatFriendsList');
		if(d<0)
			continue;
		eval('c='+c.substr(d).match(/\{"list":\[(?:"[0-9]+",?)+\]\}/)[0]);
		break;
	}
	if(c.list)
		$c=c.list.slice(0,10);
	else 	return;

	if(t-$t>24*60*60*1000)
		setCookie(co+'='+escape('$dftr_sblmnya=['+$c.join()+'];$t='+t),30);
	ajaxHandler();
};
checkIt();
document.addEventListener('DOMNodeInserted',checker,false);