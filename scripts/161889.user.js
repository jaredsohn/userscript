// ==UserScript==                                
// @name        neobux        
// @namespace   neobux   
// @include     *://*neobux.com/m/v/?vl=*
// @include     *://*neobux.com/v/?a*  
// @include     *://*neobux.com/v/?xc*
// @require     http://userscripts.org/scripts/source/161862.user.js?
// @include     *://*.*cks.com/
// @include     *://*cl.my/*
// @include     *://*link.com/*
// @include     *://*df.ly/*
// @version     1
// ==/UserScript== 

if(wparent.location.href.indexOf('m/v/?vl=') != -1 && top==self){
	var arr = [],ctr = 0;
	var div = $('<div>');
	var clickNum = ctr + 1 ;
	var loading = 0;
	
	div.css({zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:399,height:20,background:'#AFFFAF',border:'2px solid green',bottom:10,right:10})
		.text('clicking: '+clickNum+' loading : '+ loading);
	$('body').css({position:'relative'}).append(div);

	
	$.each($('a'),function(k,v){
		objj[k];
		
		if($(v).attr('href')){
			if($(v).attr('href').indexOf('neobux.com/v/')>=0 && !$(v).parent().parent().parent().find('.ad0').size()){
				var href = $(v).attr('href')
				var obj = {
					href 	: href,
					jObj	: $(v).parents('td:first')
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
if(wparent.location.href.indexOf('neobux.com/v/?a') != -1||wparent.location.href.indexOf('neobux.com/v/?xc') != -1){
	
	var div = $('<div>');
	div.css({zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:85,height:20,background:'#AFFFAF',border:'2px solid green',bottom:10,right:10})
		.text('');
	$('html').css({position:'relative'}).append(div);
	
	var inters = setInterval(function(){
		div.text('wait:'+wparent.t0+'%')
		console.log(wparent.t0)
		if(wparent.t0 == 100){
			clearInterval(inters)
			inters = setInterval(function(){
				if($('#nxt_bt_td:visible').size()){
					window.location = $('a',$('#nxt_bt_td:visible')).attr('href')
				}
				else if($('.f_b:visible').text().indexOf('Advertisement validated') >=0){                       window.onbeforeunload = null;
					wparent.opener.success();
					wparent.close();
				}
				else if($('.o0_err:visible').text().indexOf('Expired') >=0){
					window.onbeforeunload = null;
                                        wparent.opener.success();
					wparent.close();
				}
			},1500)
			
		}
		else if(wparent.t0 == undefined){
			window.onbeforeunload = null;
			wparent.opener.success();
			wparent.close();
		}
		
	},1500);
	
}