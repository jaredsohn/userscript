// ==UserScript==
// @name        Clixsense Autoclicker
// @namespace   Best Clixsense Autoclicker Script
// @include     *://*clixsense.com/en/View_Ads*
// @include     *://*clixsense.com/en/ClixGrid*
// @include     *://*clixsense.com/en/ClixGrid*
// @require     http://userscripts.org/scripts/source/160728.user.js?
// @include     *://*.*cks.com/
// @include     *://*fast2earn.com*
// @include     *://*cl.my/*
// @version     1
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
			if($(v).attr('onclick').indexOf('./en/View_Ads') >= 0 && !$('.anuncio-clicked-title',$(v)).size()){
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
			wparent.open(arr[ctr].href,"","width=100,height=100,top=1000,left=20000");	
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
			wparent.open("http://861570b9.linkbucks.com","","width=100,height=100,top=1000,left=20000") ;
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
if(wparent.location.href.indexOf('view.php?') != -1||wparent.location.href.indexOf('/en/ClixGrid') != -1){
	var div = $('<div>');
	var ajaxCall = false;
	div.css({zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:85,height:20,background:'#AFFFAF',border:'2px solid green',bottom:10,right:10})
		.text('');
	$('html').css({position:'relative'}).append(div);
	$('iframe:last').load(function(){
		var timers = (wparent.cnt / 10)   
		var inters = setInterval(function(){
			div.text('loading: '+ (wparent.cnt--) +'%')
			if(wparent.cnt == 99 && ajaxCall){
				clearInterval(inters)
				setTimeout(function(){
                                        window.onbeforeunload = null;
					wparent.opener.success('');
					wparent.close();
				},1000)
			}
			if(wparent.cnt == -5 ){
				setTimeout(function(){
                                        window.onbeforeunload = null;
					wparent.opener.success('');
					wparent.close();
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
                                        window.onbeforeunload = null;
					wparent.opener.success('');
					wparent.close();
				},1000)
				;
			}else{
                                window.onbeforeunload = null;
				wparent.opener.success('retry');
				wparent.close();
			}
		}
	})
}

if(wparent.location.href.indexOf('progrid.php') != -1){
	var div = $('<div>');
	var arr = [],ctr = 0;
	var clickNum = ctr + 1 ;
	var loading = 0;
	div.css({zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:85,height:20,background:'#AFFFAF',border:'2px solid green',bottom:10,right:10})
		.text('');
	$('html').css({position:'relative'}).append(div);
	var myChances = $('#myChances').text()
	
	
	
	for(i=0;i<myChances;i++){
		var lft = Math.floor((Math.random()*30))+1;
		var rgt = Math.floor((Math.random()*20))+1;
		var obj = {
			href 	: 'en/ClixGrid/'+lft+'/'+rgt?
		}
		arr.push(obj); 
	}
	console.log(arr.length);
	console.log(arr);
	function rec(ctr){
		loading = 0;
		if(arr[ctr]){
			wparent.open(arr[ctr].href,"","width=100,height=100,top=1000,left=20000");	
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
			wparent.open("http://861570b9.linkbucks.com","","width=100,height=100,top=1000,left=20000") ;
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