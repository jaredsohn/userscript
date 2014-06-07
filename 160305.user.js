// ==UserScript==
// @name        probux
// @namespace   probux
// @include     *://*probux.com/viewads.php
// @include     *://*probux.com/view.php*
// @include     *://*probux.com/progrid.php
// @include     *://*probux.com/gridview.php*
// @require     http://userscripts.org/scripts/source/160296.user.js
// @version     20130224
// ==/UserScript==

if( wparent.location.href.indexOf('viewads.php') != -1 && top == self){
	var arr = [],ctr = 0;
	var div = $('<div>');
	var clickNum = ctr + 1 ;
	var loading = 0;
	
	div.css({zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:399,height:20,background:'#AFFFAF',border:'2px solid green',bottom:10,right:10})
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
			},1000);adsWind.close()
			
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
if(wparent.location.href.indexOf('view.php?') != -1||wparent.location.href.indexOf('gridview.php?') != -1){
	var div = $('<div>');
	var ajaxCall = false;
	div.css({zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:80,height:20,background:'#AFFFAF',border:'2px solid green',top:10,left:10})
		.text('');
	$('html').css({position:'relative'}).append(div);
	$('iframe:last').load(function(){
		var timers = (wparent.cnt / 10)   
		var inters = setInterval(function(){
			div.text('lding: '+ (wparent.cnt--) +'%')
			if(wparent.cnt == 99 && ajaxCall){
				clearInterval(inters);
				$('iframe:last').remove()
				setTimeout(function(){
					wparent.opener.success('');
					
				},1000)
			}
			if(wparent.cnt == -5 ){
				$('iframe:last').remove()
				setTimeout(function(){
					wparent.opener.success('');
					
				},1000)
			}
		},1000);
	})
	jQuery.ajaxSetup({
		beforeSend: function(){
			ajaxCall = true
		},
		
		complete:function(a,b){
			console.log(a)
			console.log(b)

			if(a.statusText.toLowerCase() == 'ok'){
				setTimeout(function(){
					wparent.opener.success('');
					
				},1000)
				;
			}else{
				wparent.opener.success('retry');
				
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
			},1000);adsWind.close()
			
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