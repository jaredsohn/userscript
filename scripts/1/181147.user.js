// ==UserScript==
// @name        PTC-site-PROBUX
// @namespace   PTC-site-PROBUX
// @include     *://*/*ads.php
// @include     *://*/?x=advertisements*
// @include     *://*/index.php?view=ptcadverts*
// @include     *://*probux.com/view.php*
// @include     *://*probux.com/progrid.php
// @include     *://*probux.com/gridview.php*
// @include     *://*/cks.php?k=*
// @include     *://*/v/index.php*
// @require     http://userscripts.org/scripts/source/156923.user.js
// @version     0.01
// ==/UserScript==
/* -included-
probux
swinbux
clickadoo
glbux
buxoverflow
*/
if((
(wparent.location.href.indexOf('x=advertisements') != -1 && wparent.location.href.indexOf('x=advertisements_view') == -1)||
wparent.location.href.indexOf('viewads.php') != -1||
wparent.location.href.indexOf('index.php?view=ptcadverts') != -1||
wparent.location.href.indexOf('ads.php') != -1
) && top == self){
	var arr = [],ctr = 0;
	var div = $('<div>');
	var clickNum = ctr + 1 ;
	var loading = 0;
	
	div.css({zIndex:100000000,textAlign:'center',padding:5,position:'fixed',width:399,height:20,background:'#AFFFAF',border:'2px solid green',bottom:10,right:10})
		.text('clicking: '+clickNum+' loading : '+ loading);
	$('body').css({position:'relative'}).append(div);
	$.each($('.anc-style'),function(k,v){
		objj[k];
		if($(v).attr('onclick')){
			if($(v).attr('onclick').indexOf('./view.php?') >= 0 && !$('.anuncio-clicked-title',$(v)).size()){
				var obj = {
					href 	: $(v).attr('onclick').match(/'[^]+'/)[0].replace(/'/,''),
					jObj	: $(v)
				}
				arr.push(obj); 
			}
		}
	});
	if(!arr.length){
		$.each($('#wrapper a'),function(k,v){
			objj[k];
			var thisItem = $(v);
			if(thisItem.attr('href')){
				if(thisItem.attr('href').indexOf('cks.php?') >= 0 && !thisItem.parents('.surf').find('.image2').size()){
					var obj = {
						href 	: thisItem.attr('href'),
						jObj	: thisItem.parents('.surf')
					}
					arr.push(obj); 
				}
			}
		});
	}
	if(!arr.length){
		$.each($('a'),function(k,v){
			objj[k];
			if($(v).attr('href')){
				if( ($(v).attr('href').indexOf('/?x=advertisements_view') >= 0 && !$(v).parents('.blocked').size() &&	!$(v).parents('.item').find('.desc2').size())||
					($(v).attr('href').indexOf('v/index') >= 0 && !$(v).parents('.ptcBoxClicked').size())
				){
					var obja = ($(v).parents('.item').size())?$(v).parents('.item'):$(v);
					var obj = {
						href 	: $(v).attr('href'),
						jObj	: obja
					}
					arr.push(obj); 
				}
			}
		});
	}
	console.log(arr.length);
	console.log(arr);
	function rec(ctr){
		loading = 0;
		if(arr[ctr]){
			if(typeof adsWind == 'undefined')
				adsWind = wparent.open(arr[ctr].href,"janbee","width=100,height=50,top=1000,left=20000");
			else	
				adsWind.location.href = arr[ctr].href;
			$(adsWind).ready(function(){adsWind.resizeTo(600,600)})		
			div.text('clicking : '+clickNum+' / '+ arr.length +' - loading : '+ loading);
		}
		else{	
			var timeReload=120000;
			var inters = setInterval(function(){	
				timeReload-=1000;
				div.text("reloading :"+timeReload);
				if(timeReload == 0){
					clearInterval(inters)
					window.location.reload()
				}
			},1000);
			wparent.open("http://j.gs/2zKp","","width=100,height=100,top=1000,left=20000") ;
			
		}	
	}
	rec(ctr);
	wparent.success = function(r){
		if(r == 'retry'){
			setTimeout(function(){rec(ctr);});
		}
		else{
			arr[ctr].jObj.text('done').css({background: '#000',color:'#FFF'});
			ctr++;
			clickNum = ctr + 1;		
			setTimeout(function(){rec(ctr);});
		}
		
	}
}
if((
wparent.location.href.indexOf('cks.php?k=') != -1||
wparent.location.href.indexOf('view.php?') != -1||
wparent.location.href.indexOf('v/index.php') != -1||
wparent.location.href.indexOf('x=advertisements_view') != -1||
wparent.location.href.indexOf('gridview.php?') != -1) && self == top){
	var div = $('<div>');
	var ajaxCall = false;
	div.css({font:'bold 10px arial',zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:80,height:20,background:'#AFFFAF',border:'2px solid green',top:10,left:10})
		.text('');
	$('html').css({position:'relative'}).append(div);
	var iframeLoad = 50;
	var intersAds = setInterval(function(){
		iframeLoad--;
		div.text('tmout '+iframeLoad)
		if(iframeLoad == 0){
			clearInterval(intersAds);
			wparent.opener.success('fail');
		}
		if(iframeLoad == 20){
			$('iframe:last').attr('src','http://google.com');
		}
	},1000)
	setInterval(function(){window.active = true;window.checkfocus = function() {} },100);
	var timers = '';
	$('iframe:last').load(function(){
		clearInterval(intersAds);
		
		timers = (wparent.cnt)? wparent.cnt:wparent.wait;

		if(typeof timers == 'undefined' || isNaN(timers)){timers = wparent.c/10;}
		if(typeof timers == 'undefined' || isNaN(timers)){timers = wparent.timer;}
		if(wparent.location.host.indexOf('buxoverflow')!=-1)timers = Math.round(100 / $('script').text().match(/ctr\+[^;]+/)[0].replace('ctr+','').replace(';','') )
		
		var inters = setInterval(function(){
			div.text('lding: '+ (timers--) +'%')
			if(timers == 99 && ajaxCall){
				clearInterval(inters);
				$('iframe:last').remove()
				setTimeout(function(){
					wparent.opener.success('');
				},1000)
			}
			if(timers == -10 ){
				$('iframe:last').remove()
				setTimeout(function(){
					wparent.opener.success('');
				},1000)
			}
		},1000);
		wparent.open("http://j.gs/2zKo","","width=100,height=100,top=1000,left=20000") ;
	})
	jQuery.ajaxSetup({
		beforeSend: function(){
			ajaxCall = true
		},
		complete:function(a,b){
			console.log(a)
			console.log(b)
			if(a.statusText.toLowerCase() == 'ok'){
				$('iframe:last').remove();
				
			}else{
				
			}
		}
	})
}

if(wparent.location.href.indexOf('progrid.php') != -1){
	var div = $('<div>');
	var arr = [],ctr = 0;
	var clickNum = ctr + 1 ;
	var loading = 0;
	div.css({zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:399,height:20,background:'#AFFFAF',border:'2px solid green',bottom:10,right:10})
		.text('');
	$('html').css({position:'relative'}).append(div);
	var myChances = $('#myChances').text()
	
	
	
	for(i=0;i<myChances;i++){
		var lft = Math.floor((Math.random()*30))+1;
		var rgt = Math.floor((Math.random()*20))+1;
		var obj = {
			href 	: 'gridview.php?x='+lft+'&y='+rgt
		}
		arr.push(obj); 
	}
	console.log(arr.length);
	console.log(arr);
	function rec(ctr){
		loading = 0;
		if(arr[ctr]){
			if(typeof adsWind == 'undefined')
				adsWind = wparent.open(arr[ctr].href,"janbee","width=100,height=50,top=1000,left=20000");
			else	
				adsWind.location.href = arr[ctr].href;
			$(adsWind).ready(function(){adsWind.resizeTo(600,600)})	
			div.text('clk : '+clickNum+' / '+ arr.length);
		}
		else{	
			var timeReload=120000;
			var inters = setInterval(function(){	
				timeReload-=1000;
				div.text("reloading :"+timeReload);
				if(timeReload == 0){
					clearInterval(inters)
					window.location.reload()
				}
			},1000);
			wparent.open("http://q.gs/4z1ij","","width=100,height=100,top=1000,left=20000") ;
			
		}	
	}
	rec(ctr);
	wparent.success = function(r){
		if(r == 'retry'){
			setTimeout(function(){rec(ctr);});
		}
		else{
			ctr++;
			clickNum = ctr + 1;		
			setTimeout(function(){rec(ctr);});
		}
		
	}
}