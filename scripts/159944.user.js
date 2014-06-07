// ==UserScript==
// @name        swinbux
// @namespace   swinbux
// @include     *://*swinbux.com/ads.php
// @include     *://*swinbux.com/cks.php?k=*
// @require     http://userscripts.org/scripts/source/159898.user.js
// @include     *://*.*cks.com/
// @include     *://*cl.my/*
// @include     *://*link.com/*
// @include     *://*oc.us/*
// @include     *://*df.ly/*
// @include     *://*ad7.biz/*
// @include     *://*link.fr/*
// @version     1
// ==/UserScript==
if(wparent.location.href.indexOf('ads.php') != -1 && top == self){
	var arr = [],ctr = 0;
	var div = $('<div>');
	var clickNum = ctr + 1 ;
	var loading = 0;
	
	div.css({zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:399,height:20,background:'#AFFFAF',border:'2px solid green',bottom:10,right:10})
		.text('clicking: '+clickNum+' loading : '+ loading);
	$('body').css({position:'relative'}).append(div);
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
	
	console.log(arr.length);
	console.log(arr);
	function rec(ctr){
		loading = 0;
		if(arr[ctr]){
			var thewind = wparent.open(arr[ctr].href,"janbee","width=100,height=100,top=1000,left=20000");	
			$(thewind).ready(function(){thewind.resizeTo(600,600)})
			div.text('clicking : '+clickNum+' / '+ arr.length +' - loading : '+ loading);
		}
		else{	
			var timeReload=180000;
			var inters = setInterval(function(){	
				timeReload-=1000;
				div.text("reloading :"+timeReload);
				if(timeReload == 0){
					clearInterval(inters)
					window.location.reload()
				}
			},1000);
		}	
	}
	rec(ctr);
	wparent.success = function(r){
		if(r == 'retry'){
			setTimeout(function(){rec(ctr);});
		}
		else if(r == 'fail'){
			arr[ctr].jObj.css({border: '2px solid red'})
			ctr++;
			clickNum = ctr + 1;		
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
if(wparent.location.href.indexOf('cks.php?') != -1 && self == top){
	
	var div = $('<div>');
	div.css({zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:85,height:20,background:'#AFFFAF',border:'2px solid green',top:10,left:10})
		.text('loading...');
	$('html').css({position:'relative'}).append(div);
	$('body > iframe').load(function(){
		setInterval(function(){window.active = true
			window.checkfocus = function() {
				
			} 
		},100)
		setInterval(function(){
			console.log($('#progress'))
			var wat = $('#progress').text()
			div.text(wat);
			if($('#completedAd:visible').size()){
				wparent.opener.success('');
				wparent.close();
			}
		},2000)
	})
}
