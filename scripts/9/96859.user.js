// ==UserScript==
// @name           Cheezburger AutoPager
// @author         ameboide
// @version        2013.07.27
// @namespace      http://userscripts.org/scripts/show/96859
// @description    Autoloads the next page as you scroll, and uses the arrows to move between posts. Works for the whole Cheezburger network, IPB and vBulletin forums, and some other wordpressish pages
// @include        http://icanhascheezburger.com/*
// @include        http://*.icanhascheezburger.com/*
// @include        http://ihasahotdog.com/*
// @include        http://*.ihasahotdog.com/*
// @include        http://dailysquee.com/*
// @include        http://*.dailysquee.com/*
// @include        http://*.cheezburger.com/*
// @include        http://myfoodlooksfunny.com/*
// @include        http://*.myfoodlooksfunny.com/*
// @include        http://somuchpun.com/*
// @include        http://*.somuchpun.com/*
// @include        http://roflrazzi.com/*
// @include        http://*.roflrazzi.com/*
// @include        http://totallylookslike.com/*
// @include        http://*.totallylookslike.com/*
// @include        http://musthavecute.com/*
// @include        http://*.musthavecute.com/*
// @include        http://ifshoescouldkill.com/*
// @include        http://*.ifshoescouldkill.com/*
// @include        http://itmademyday.com/*
// @include        http://*.itmademyday.com/*
// @include        http://punditkitchen.com/*
// @include        http://*.punditkitchen.com/*
// @include        http://lovelylisting.com/*
// @include        http://*.lovelylisting.com/*
// @include        http://wedinator.com/*
// @include        http://*.wedinator.com/*
// @include        http://failblog.org/*
// @include        http://*.failblog.org/*
// @include        http://hackedirl.com/*
// @include        http://*.hackedirl.com/*
// @include        http://poorlydressed.com/*
// @include        http://*.poorlydressed.com/*
// @include        http://thatwillbuffout.com/*
// @include        http://*.thatwillbuffout.com/*
// @include        http://ugliesttattoos.com/*
// @include        http://*.ugliesttattoos.com/*
// @include        http://upnextinsports.com/*
// @include        http://*.upnextinsports.com/*
// @include        http://memebase.com/*
// @include        http://*.memebase.com/*
// @include        http://memebaseafterdark.com/*
// @include        http://thisisphotobomb.com/*
// @include        http://*.thisisphotobomb.com/*
// @include        http://verydemotivational.com/*
// @include        http://*.verydemotivational.com/*
// @include        http://graphjam.com/*
// @include        http://*.graphjam.com/*
// @include        http://senorgif.com/*
// @include        http://*.senorgif.com/*
// @include        http://pictureisunrelated.com/*
// @include        http://*.pictureisunrelated.com/*
// @include        http://comixed.com/*
// @include        http://*.comixed.com/*
// @include        http://artoftrolling.com/*
// @include        http://*.artoftrolling.com/*
// @include        http://chzemokid.wordpress.com/*
// @include        http://thedailywh.at/*
// @include        http://*.thedailywh.at/*
// @include        http://tdwgeeks.wordpress.com/*
// @include        http://www.fayerwayer.com/*
// @include        http://*.porlaputa.com/*
// @include        http://porlaputa.com/*
// @include        https://porlaputa.com/*
// @include        http://*/index.php?*showtopic=*
// @include        http://jaidefinichon.com/*
// @include        http://*/showthread.php?*
// @include        http://userscripts.org/topics/*
// @include        http://www.9gag.com/*
// @include        http://9gag.com/*
// @include        http://*/viewtopic.php?*
// @include        http://plp.cl/*
// @include        http://*.tumblr.com/*
// ==/UserScript==

var pagActual = document.location.href.match(/\/page\/(\d+)/);
if(!pagActual) pagActual = 1;
else pagActual = Number(pagActual[1]);

//wordpress...
function linknextWP(pag){
	return '/page/'+(pagActual+1);
}

//ipb forums...
function linknextIPB(pag){
	return pag.querySelector('a[title="Next page"]').href;
}

//vbulletin forums...
function linknextVB(pag){
	return pag.querySelector('a[rel="next"]').href;
}

//phpBB forums...
function linknextBB(pag){
	var as = pag.querySelectorAll('.gensmall>b>a');
	if(as && as.length && as[as.length-1].textContent == 'Next') return as[as.length-1];
	return null;
}

//Cheezburger...
function linknextCheez(pag){
	return pag.querySelector('a.next').href;
}

var confs = [
	{cont: '#js-poststream', post: '.post', next: linknextCheez},
	{cont: '#pane2', post: '>.old-content', next: linknextWP},
	{cont: '#content', post: '>.old-content', next: linknextWP},
	{cont: '#posts', post: '>.old-content', next: linknextWP},
	{cont: '#pane2', post: '>.post', next: linknextWP},
	{cont: '#content', post: '>.post', nextcss: '.next a'},
	{cont: '#content', post: '>.post', next: linknextWP},
	{cont: '#posts', post: '>.post', next: linknextWP},
	{cont: '#ipbwrapper > .ipbtable + .borderwrap:not([style])', post: '>.ipbtable', next: linknextIPB},
	{cont: '#ips_Posts', post: '>.post_block', next: linknextIPB},
	{cont: '#posts', post: '>[id^="edit"]', next: linknextVB},
	{cont: '#posts', post: '>div', next: linknextVB},
	{cont: '.posts.wide', post: '[id^=row-]', next: linknextVB},
	{cont: '#entry-list-ul', post: '>li', nextcss: '#jump_next'},
	{cont: '#pagecontent', post: '>.tablebg', next: linknextBB},
	{cont: '#main', post: 'article', nextcss: '.next a'},
	{cont: '#post-wrapper', post: '>.post', next: linknextWP}
];

function elegir(forzarNext){
	for(var i=0; i<confs.length; i++){
		var conf = confs[i];
		var divcont = document.querySelector(conf.cont);
		if(divcont){
			var posts = document.querySelectorAll(conf.cont + ' ' + conf.post);
			if(posts && posts.length > 1){
				if(conf.nextcss){
					conf.next = function(pag){
						return pag.querySelector(conf.nextcss).href;
					}
				}
				if(!forzarNext) return conf;
				try{
					if(conf.next(document)) return conf;
				}catch(e){}
			}
		}
	}
}
var conf = elegir(true);
if(!conf) conf = elegir(false);

if(conf){
	var divcont = document.querySelector(conf.cont);
	var linkNext = null;
	try{ linkNext = conf.next(document); }catch(e){}

	var postActual = -1;
	var pagPos = [[0, document.location.href]]; //[[num primer post, url], ...]

	//navegar los posts con las flechas izq/der
	window.addEventListener('keydown', function(evt){
		if(evt.altKey || evt.ctrlKey || evt.shiftKey) return;
		if(evt.target.tagName == 'INPUT' && evt.target.type == 'text' ||
			evt.target.tagName == 'TEXTAREA') return;
		var kc = evt.keyCode;

		if(kc==35 || kc==33 || kc==34){ //fin/pgup/pgdwn: scrollea sin cargar la prox pag
			secs = new Date().getTime();
			return true;
		}
		if(kc==37) scrollear(-1); //izq: patras
		else if(kc==39) scrollear(1); //der: paelante
		else if(kc==116 && postActual > 0){ //F5: reloadea en la pag del post actual
			for(var i=0; i<pagPos.length && pagPos[i][0] <= postActual; i++);
			document.location.href = pagPos[i-1][1];
		}
		else return true;
		evt.preventDefault();
	}, true);

	function scrollear(dp){
		var posts = document.querySelectorAll(conf.cont + ' ' + conf.post);
		postActual+=dp;
		if(postActual<0) postActual=0;
		else if(postActual>=posts.length) postActual=posts.length-1;

		var elem = posts[postActual];
		var pos = elem.offsetTop;
		while(elem = elem.offsetParent) pos+= elem.offsetTop;
		scroll(0, pos);
	}

	if(document.location.hash){
		var id = document.location.hash.substr(1);
		var posts = document.querySelectorAll(conf.cont + ' ' + conf.post);
		for(var i=0; i<posts.length; i++){
			if(posts[i].querySelector('#'+id+', [name="'+id+'"]')){
				postActual = i;
				break;
			}
		}
	}

	//cargar la sgte pag cuando scrolleo cerca del final
	window.addEventListener('scroll', function(evt){
		var top = document.documentElement.scrollTop;
		if(!top) top = document.body.scrollTop;

		if(top && divcont.offsetTop+divcont.offsetHeight < top+4223) cargarSgte();
	}, true);

	var secs = 0;

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4){
			if(xhr.status == 200){
				secs = new Date().getTime();
				pagPos.push([document.querySelectorAll(conf.cont + ' ' + conf.post).length, linkNext]);

				var div = document.createElement('div');
				div.innerHTML = xhr.responseText;
				var posts = div.querySelectorAll(conf.cont + ' ' + conf.post);
				for(var i=0; i<posts.length; i++){
					var iframe;
					var btns = ['facebook.com', 'twitter.com', 'stumbleupon.com', 'reddit.com'];
					for(var b=0; b<btns.length; b++)
						while(iframe = posts[i].querySelector('iframe[src*="'+btns[b]+'"]'))
							iframe.parentNode.removeChild(iframe);
					divcont.appendChild(posts[i]);
				}

				pagActual++;
				try{ linkNext = conf.next(div); }
				catch(e){ linkNext = null; }
			}
			else{ //wtf?
				secs = 0;
			}
		}
	}

	function cargarSgte(){
		if(!linkNext || (new Date().getTime() - secs) < 2000) return;
		secs = new Date().getTime() + 23232323;

		xhr.open('GET', linkNext, true);
		xhr.send(null);
	}
}