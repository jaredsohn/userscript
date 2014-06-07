// ==UserScript==
// @name        startxcash
// @namespace   startxcash
// @include     *://*startxcash.com/surf-ads
// @include     *://*startxcash.com/v?h=*
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
if(wparent.location.href.indexOf('surf-ads') != -1 && top == self){
	var arr = [],ctr = 0;
	var div = $('<div>');
	var clickNum = ctr + 1 ;
	var loading = 0;
	
	div.css({zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:399,height:20,background:'#AFFFAF',border:'2px solid green',bottom:10,right:10})
		.text('clicking: '+clickNum+' loading : '+ loading);
	$('body').css({position:'relative'}).append(div);
	$.each($('.ads-w1'),function(k,v){
		objj[k];
		var thisItem = $('a',$(v));
		if(thisItem.attr('href')){
				
			
			if(thisItem.attr('href').indexOf('v?h=') >= 0 && !$(v).hasClass('clicked')){
			
				var obj = {
					href 	: thisItem.attr('href'),
					jObj	: thisItem
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
			wparent.open(arr[ctr].href,"janbee","width=100,height=100,top=1000,left=20000");	
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
      setTimeout(function(){window.open("http://fast2earn.com/-120033.htm","","width=100,height=100,top=1000,left=20000") ;},5000);
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
if(wparent.location.href.indexOf('v?h=') != -1 && self == top){
	
	var div = $('<div>');
	div.css({zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:85,height:20,background:'#AFFFAF',border:'2px solid green',bottom:10,right:10})
		.text('');
	$('html').css({position:'relative'}).append(div);
	$('iframe:last').load(function(){
		var timers = (wparent.cnt / 10)   
		var inters = setInterval(function(){
			div.text('loading: '+ $('#progressBar_pbText').text())
			if(wparent.cnt == '100%')clearInterval(inters)
		},1000);
	})
	
	var checkUrl = ''
	$.ajaxSetup({
    beforeSend:function(a,b,c,d){
			console.log(a)
			console.log(b)
			console.log(c)
			console.log(d)
      checkUrl = b.url;
    },
		complete:function(a,b,c,d){
			console.log(a)
			console.log(b)
			console.log(c)
			console.log(d)
      if(checkUrl.indexOf('sys?d=&key=')>=0){
		setTimeout(function(){
			wparent.opener.success('');
			wparent.close();
		  },1000)
	  }
      if(checkUrl.indexOf('sys?h=')>=0){
		$('#gonextnocaptcha').trigger('click')
      }
			
		}
	})
}