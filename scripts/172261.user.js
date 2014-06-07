// ==UserScript==
// @name        1500
// @namespace   1500
// @include     */pages/clickads
// @include     */pages/clickadsproc*
// @require     http://userscripts.org/scripts/source/160102.user.js
// @include     *://*.*cks.com/
// @include     *://*fast2earn.com/*
// @version     1
// ==/UserScript==

if(wparent.location.href.indexOf('pages/clickads') != -1 && wparent.location.href.indexOf('pages/clickadsproc') == -1){
	var arr = [],ctr = 0;
	var div = $('<div>');
	var clickNum = ctr + 1 ;
	var loading = 0;
	
	div.css({zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:399,height:20,background:'#AFFFAF',border:'2px solid green',bottom:10,right:10})
		.text('clicking: '+clickNum+' loading : '+ loading);
	$('body').css({position:'relative'}).append(div);
	//http://www.clix-cents.com/pages/clickadsproc?c=30&docaptcha=1&h=20120830aa0a0ad76340efccec20e0c7e2eb7df7&rnd=94955&token=5104
	
	$.each($('.clickads_wrapper1 div'),function(k,v){
		objj[k];
		if($(v).attr('onclick')){
			if($(v).attr('onclick').indexOf('openad') >= 0){
				var obj = {
					href 	: 'clickadsproc?h='+$(v).attr('onclick').split(',')[1].match('"[^]+"')[0].replace(/"/g,''),
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
			setTimeout(function(){window.open("http://fast2earn.com/-120033.htm","","width=100,height=100,top=1000,left=20000") ;},5000000000000);
		}	
	}
	rec(ctr);
	wparent.success = function(){
		arr[ctr].jObj.text('done').css({background: '#000',color:'#FFF'});
		ctr++;
		clickNum = ctr + 1;		
		setTimeout(function(){rec(ctr);})
		
	}
}
if(wparent.location.href.indexOf('pages/clickadsproc') != -1){
	var datas = $('body script:first').text().match(/getaddon[^]+/)[0].split(',')[1].replace(/'/g,'').replace('+c','');
	var num = 0;
	var div = $('<div>');
	div.css({zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:85,height:20,background:'#AFFFAF',border:'2px solid green',bottom:10,right:10})
		.text('');
	$('html').css({position:'relative'}).append(div);
	function ajaxRec(num){
		$.ajax({
			url		: 'clickadsproc',
			data	: datas+num,
			type	: 'POST'
		}).complete(function(a,b,c,d){
			console.log(a)
			console.log(b)
			console.log(c)
			console.log(d)
			if(a.responseText.indexOf('has been credited')>=0){
				wparent.opener.success();
				wparent.close();
			}
			else{
				div.text('src:'+ num)
				num++;
				ajaxRec(num);
			}
		})
	}
	var timers = wparent.numbercounter;
	var inters = setInterval(function(){
		timers--;
		div.text('wait:'+ timers)
		if(timers == 0){
			clearInterval(inters);
			ajaxRec(num);
		}
	},1500);
}