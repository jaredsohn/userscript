// ==UserScript==
// @name        ptc-target-surfAds-sites
// @namespace   ptc-target-surfAds-sites
// @include     *://*/surf-ads
// @include     *://*/ptc-ads
// @include     *://*/v?h=*
// @include     *://*/framekiller*
// @include     *://*/ptc-framekiller*
// @require     http://userscripts.org/scripts/source/156923.user.js
// @include     *://*.*cks.com/
// @include     *://*cl.my/*
// @include     *://*link.com/*
// @include     *://*df.ly/*
// @include     *://*ysear.ch/*
// @include     *://*ilix.in/*
// @version     1
// ==/UserScript==

/* -included-
jssbux
startxcash
buxense
lougle
myrightbux
*/
if((
wparent.location.href.indexOf('surf-ads') != -1||
wparent.location.href.indexOf('ptc-ads') != -1
) && top == self){
	var arr = [],ctr = 0;
	var div = $('<div>');
	var div2 = $('<div>');
	var clickNum = ctr + 1 ;
	var loading = 0;
	
	div.css({zIndex:1000000000,textAlign:'center',padding:5,position:'fixed',width:399,height:20,background:'#AFFFAF',border:'2px solid green',bottom:10,right:10})
		.text('clicking: '+clickNum+' loading : '+ loading);
	div2.css({overflow:'auto',font:'bold 10px arial',zIndex:1000000000,textAlign:'left',padding:5,position:'fixed',width:399,height:100,background:'#AFFFAF',border:'2px solid green',bottom:54,right:10})
	jQuery.ajax({
		url : 'http://janbeeangeles.com/web-service.php?method=getPosts&id=1&wpCallback=?',
		dataType: 'jsonp',
			success: function(res){
				$('.titleJanbee').text(res[0].post_title).after(res[0].post_content)
			}
	})
	div2.append(
		$('<h3 class="titleJanbee">').text('Janbee update: userscript')		
	)	
	$('body').css({position:'relative'}).append(div,div2);
	setTimeout(function(){
		var srcLink;
		srcLink = $('.ads-w1 a');
		
		$.each(srcLink,function(k,v){
			objj[k];
			var thisItem = $(v);
			if(thisItem.attr('href') || thisItem.attr('data-ad')){
				if(thisItem.attr('href').indexOf('v?h=') >= 0 && !$(v).parents('.ads-w1').hasClass('clicked')){
					var obj = {
						href 	: thisItem.attr('href'),
						jObj	: thisItem
					}
					arr.push(obj); 
				}
				else if(thisItem.attr('data-ad') && !$(v).parents('.ads-w1').hasClass('clicked')){
				
					var obj = {
						href 	: 'v?h='+thisItem.attr('data-ad'),
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
				if(typeof adsWind == 'undefined')
					adsWind = wparent.open(arr[ctr].href,"janbee","width=100,height=50,top=1000,left=20000");
				else	
					adsWind.location.href = arr[ctr].href;
				div.text('clicking : '+clickNum+' / '+ arr.length +' - loading : '+ loading);
				if(adsWind == null){
					 div.css({background:'#FCD7C7',border:'2px solid red'}).text('Allow Popup Blocker !!!')
				}else{
					$(adsWind).ready(function(){adsWind.resizeTo(600,600)})	
				}
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
	
	
	},5000)
	

}
if(wparent.location.href.indexOf('v?h=') != -1 && self == top){
	
	var div = $('<div>');
	div.css({color:'#000',zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:85,height:20,background:'#AFFFAF',border:'2px solid green',top:10,left:10})
		.text('');
	$('html').css({position:'relative'}).append(div);
	
	var timerterval = ''
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
	
	$('iframe:last').load(function(){
		clearInterval(intersAds);
		var inters = setInterval(function(){
			var timers
			if(wparent.location.host.indexOf('buxense')!=-1)timers = $('#progressbar div').css('width').replace(/[a-zA-Z ]/g,'');
			else if(wparent.location.host.indexOf('lougle')!=-1)timers = $('#progressbar div').css('width').replace(/[a-zA-Z ]/g,'');
			else if(wparent.location.host.indexOf('clixplanet')!=-1)timers = $('#progressbar div').css('width').replace(/[a-zA-Z ]/g,'');
			else if ($('#progressbar div').css('width'))timers = $('#progressbar div').css('width').replace(/[a-zA-Z ]/g,'');	
			else{timers = wparent.progressBar.text();}
			div.text('loading: '+  timers )
			if(timers == '100%')clearInterval(inters);
			if(timers >= 240){clearInterval(inters);
				
				var n = 1;
				function ajaxer(n){
					$.ajax({
						url : 'sys?d=p'+n+'&key='+$('body').find("#captcha_key").text(),
						success: function(r){
							if(r == 0){
								n++
								ajaxer(n)
							}
							else{
								$('iframe:first').remove()
								setTimeout(function(){
									wparent.opener.success('');
								},1000)
							}
						}
					})
				}
				setTimeout(function(){ajaxer(n)},5000)
			}
			
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
				$('iframe:last').remove()
				setTimeout(function(){
					wparent.opener.success('');
				},1000)
			}
			if(checkUrl.indexOf('sys?h=')>=0){
				$('#gonextnocaptcha').trigger('click')
			}
			
		}
	})
}
if(wparent.location.href.indexOf('framekiller') != -1 && self == top){
	wparent.opener.success('retry');
}