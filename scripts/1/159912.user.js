// ==UserScript==
// @name        buxoverflow
// @namespace   buxoverflow
// @include     *://*buxoverflow.com/index.php?view=ptcadverts*
// @include     *://*buxoverflow.com/v/index.php*
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

if(wparent.location.href.indexOf('index.php?view=ptcadverts') != -1 && top == self){
	var arr = [],ctr = 0;
	var div = $('<div>');
	var clickNum = ctr + 1 ;
	var loading = 0;
	
	div.css({zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:399,height:20,background:'#AFFFAF',border:'2px solid green',bottom:10,right:10})
		.text('clicking: '+clickNum+' loading : '+ loading);
	$('body').css({position:'relative'}).append(div);
	$('img.tip[tipsy-gravity=n]').parent().remove()
	$.each($('.ptcbox:not(.ptcBoxClicked) a'),function(k,v){
		objj[k];
		if($(v).attr('href')){
			if($(v).attr('href').indexOf('v/index') >= 0 ){
				var obj = {
					href 	: $(v).attr('href'),
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
		else{
			arr[ctr].jObj.text('done').css({background: '#000',color:'#FFF'});
			ctr++;
			clickNum = ctr + 1;		
			setTimeout(function(){rec(ctr);});
		}
		
	}

}
if(wparent.location.href.indexOf('v/index.php') != -1 && self == top){
	var div = $('<div>');
	div.css({zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:85,height:20,background:'#AFFFAF',border:'2px solid green',bottom:10,right:10})
		.text('');
	$('html').css({position:'relative'}).append(div);
	
	var inters = setInterval(function(){
		div.text('src: '+$.trim($('#timerblock').text()));
	},2000);
	$.ajaxSetup({
		complete:function(a,b,c,d){
			console.log(a)
			console.log(b)
			console.log(c)
			console.log(d)
			if(a.responseText == '0'){
				
				setTimeout(function(){
					wparent.opener.success('');
					wparent.close();
				},10000)
				
			}else{
				setTimeout(function(){
					wparent.opener.success('retry');
					wparent.close();
				},10000)
			}
		}
	})
}
