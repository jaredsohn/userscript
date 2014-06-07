// ==UserScript==
// @name        buxp
// @namespace   buxp Auto Clicker
// @include     *://*buxp.org/ads.php
// @include     *://*buxp.org/view.php*
// @require     http://userscripts.org/scripts/source/177849.user.js?
// @include     *://*.*cks.com/
// @include     *://*cl.my/*
// @include     *://*link.com/*
// @include     *://*oc.us/*
// @include     *://*df.ly/*
// @include     *://*ad7.biz/*
// @include     *://*link.fr/*
// @version     4
// ==/UserScript==

if(wparent.location.href.indexOf('ads.php') != -1 ){
	var winder;
	var xhr = $.ajaxSetup({
		complete: function(a,b,c,d){
			if(winder){winder.close()}
			var arr = [],ctr = 0;
			var div = $('<div>');
			var clickNum = ctr + 1 ;
			var loading = 0;
			console.log(a)
			console.log(b)
			console.log(c)
			console.log(d)
			div.css({zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:399,height:20,background:'#AFFFAF',border:'2px solid green',bottom:10,right:10})
				.text('clicking: '+clickNum+' loading : '+ loading);
			$('body').css({position:'relative'}).append(div);
			$.each($('.mtitle'),function(k,v){
				if($(v).text().indexOf('CHEAT DETECTOR') >=0){
					$(v).parents('#menu').remove()
				}
				if($(v).text().indexOf('EXPIRED ADVERTISEMENTS') >=0){
					$(v).parents('#menu').remove()
				}
			})
			$.each($('.visitext'),function(k,v){
				objj[k];
				if($(v).parent().attr('href')){
					if($(v).parent().attr('href').indexOf('view.php')>=0 ){
						var href = $(v).parent().attr('href')
						var obj = {
							href 	: href,
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
					winder = wparent.open(arr[ctr].href,"","width=100,height=100,top=1000,left=20000");	
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
					setTimeout(function(){window.open("http://adfoc.us/17874034265308","","width=100,height=100,top=1000,left=20000") ;},5000);
				}	
			}
			rec(ctr);
			wparent.success = function(r){
				if(r == 'retry'){
					setTimeout(function(){rec(ctr);});
				}
				else if(r == 'fail'){
					arr[ctr].jObj.text('fail').css({background: 'red',color:'#FFF'});
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
	});
	var inters = setInterval(function(){
		if($('#adsavailable').text().indexOf('loading') == -1){
			clearInterval(inters)
			xhr.complete();
		}
	},1500)
	
}
if(wparent.location.href.indexOf('view.php') != -1){
	var datas = ''//$('body script:first').text().match(/getaddon[^]+/)[0].split(',')[1].replace(/'/g,'').replace('+c','');
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
				window.onbeforeunload = null;
				wparent.opener.success('');
				wparent.close();
			}
			else if(a.statusText == 'error'){
				window.onbeforeunload = null;
				wparent.opener.success('fail');
				wparent.close();
			}
			else{
				div.text('src:'+ num)
				num++;
				ajaxRec(num);
			}
		})
	}
	var timer = 39
	var inters = setInterval(function(){
		timer--
		if(timer == 0){
			clearInterval(inters);
			
			ajaxUrl = $('form[name=frm] > script').text().match(/success.location.href="[^]+=1";/)[0].replace('success.location.href="','').replace(/"/g,'').replace(';','')
			console.log(ajaxUrl)
			$.ajax({
				url		: ajaxUrl,
				type	: 'get'
			}).complete(function(a,b,c,d){
				console.log(a)
				console.log(b)
				console.log(c)
				console.log(d)
				if(a.responseText.indexOf('credited')>=0){
					window.onbeforeunload = null;
					wparent.opener.success('');
					wparent.close();
				}
				else if(a.statusText == 'error'){
					window.onbeforeunload = null;
					wparent.opener.success('fail');
					wparent.close();
				}
			})
		}
		div.text('wait'+timer);
		
	},1300);
}