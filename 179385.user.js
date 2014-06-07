// ==UserScript==
// @name        cnc
// @namespace   cnc
// @include     *://*/index.php?view=click*
// @include     *://*/index.php?view=account&ac=click*
// @include     *://*/index.php?view=account&ac=ptra*
// @include     *://*/gpt.php?v=entry*
// @include     *://*/gpt.php?v=read*
// @include     *://*/view.php?id=*
// @require     http://userscripts.org/scripts/source/156923.user.js
// @updateURL   http://userscripts.org/scripts/source/160349.user.js
// @include     *://*.*cks.com/
// @include     *://*cl.my/*
// @include     *://*link.com/*
// @include     *://*ysear.ch/*
// @include     *://*ilix.in/*
// @version     1000
// ==/UserScript==
//

/* -included-
justearnptc
fire-ptc
buxfury
dasherreindeerptc
xmoney
scarlet-clicks
myptcindia
clickersptc
crazy-cat-ptc
ebuxer
earningnation
adsclickers
wizardlyptc
successbux
clixtiply
hpbux
cashtravel
cash-clicks
fjptc
clixten
juicybux
lovemyclicks
camelfamilyptc
holiday-clicks
unicornsummerptc
flutterybyclicks
crasbux
successbux
happyclix
penguins-n-hedgehogs
fast2earn
hangarads
clickandcash
tulipptc
empireclix
clickswithme
ptcforbux
*/

if((wparent.location.href.indexOf('index.php?view=click') != -1 || 
wparent.location.href.indexOf('index.php?view=account&ac=click') != -1 || 
wparent.location.href.indexOf('index.php?view=account&ac=ptra') != -1) && 
top == self){
	
	var arr = [],ctr = 0;
	var div = $('<div>');
    var div2 = $('<div>');
	var clickNum = ctr + 1 ;
	var loading = 0;
	
	div.css({color:'#000',zIndex:1000000000,textAlign:'center',padding:5,position:'fixed',width:399,height:20,background:'#AFFFAF',border:'2px solid green',bottom:10,right:10})
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
		// bot detector deleter 
		$.each($('table tr img'),function(){
			if($(this).attr('src')){			
				if($(this).attr('src').indexOf('/hidesite') != -1){
					$(this).parents('tr:first').remove();
					return false;
				}
			}
		});
		$.each($('a'),function(k,v){
			if($(v).text().toLowerCase().indexOf('  ') >= 0 ){
				$(v).parent().parent().remove()
			}
			else if($(v).text().toLowerCase().indexOf('surf these links') >= 0 ){
				$(v).remove()
			}
		})
		if($('.texttitle').size()){
			if($('.texttitle').text().indexOf('D O , N O T , C L I C K')>=0){
				$('.texttitle').parents('.ptclink:last').remove()
			}
		}
		var clickSrc = ($('.ptcWrapper li center').size()) ? $('.ptcWrapper li center') : $('.ptcWrapper td');
		if(!clickSrc.size())clickSrc = $('td',$('.section-line').nextAll('table'));
		if(!clickSrc.size())clickSrc = $('.ads h3');
		if(!clickSrc.size())clickSrc = $('div .text');
		if($('.ptclink > a').size()){clickSrc=$('.ptclink')}
		
		$.each(clickSrc,function(k,v){
			objj[k];
			var thisItem = $('> a:last',$(v));
			
			if(thisItem.attr('href')){
				if( ( thisItem.attr('href').indexOf('gpt.php?v=entry&type=ptc') >= 0 || thisItem.attr('href').indexOf('gpt.php?v=read') >= 0 ) && thisItem.text().indexOf('Cheat Check') == -1){
					var obj = {
						href 	: thisItem.attr('href'),
						jObj	: thisItem
					}
					arr.push(obj); 
				}
				
			}
		});
		if($('.ptclink > a').size()){
			
		}
		if(!arr.length){
			$.each($('a,div'),function(k,v){
				objj[k];
				var thisItem = $(v);
				$
				if(thisItem.attr('href')){
					if( (thisItem.attr('href').indexOf('gpt.php?v=entry&type=ptc') >= 0 || thisItem.attr('href').indexOf('gpt.php?v=read') >= 0 ) && thisItem.text().indexOf('Cheat Check') == -1){
						var obj = {
							href 	: thisItem.attr('href'),
							jObj	: thisItem
						}
						arr.push(obj); 
					}
					
				}
				else if (thisItem.attr('onclick')){
					if( (thisItem.attr('onclick').toString().indexOf('entry&type=ptc') >= 0  ) && thisItem.text().indexOf('Cheat Check') == -1){
						var obj = {
							href 	: 'gpt.php?v='+thisItem.attr('onclick').toString().split(',')[1].match(/'[^]+'/)[0].replace(/'/g,''),
							jObj	: thisItem
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
				},1000);
				adsWind.close()
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
if(wparent.location.href.indexOf('gpt.php?v=read') != -1 && self == top){
	var div = $('<div>');
	div.css({font:'bold 10px arial',zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:85,height:20,background:'#AFFFAF',border:'2px solid green',top:10,left:10})
		.text('');
	$('html').css({position:'relative'}).append(div);
	
	var inters = setInterval(function(){
		div.text($('#countbutton').val())
		
		if(!$('#countbutton').is(':disabled')){
			clearInterval(inters);
			var read = window.location.href.replace('read','entry');
			window.location.href = read;
		}
	},1000)
}
if(wparent.location.href.indexOf('gpt.php?v=entry') != -1 && 
self == top){
	if($('frameset frame:nth(1)').size()){
		if($('frameset frame:nth(1)').attr('src').indexOf('adf.ly') >= 0){
			wparent.opener.success('fail');
		}
	}

	var div = $('<div>');
	div.css({font:'bold 10px arial',zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:85,height:20,background:'#AFFFAF',border:'2px solid green',top:10,left:10})
		.text('');
	$('html').css({position:'relative'}).append(div);
	var thisFrame = ($('frameset frame:first').size()) ? $('frameset frame:first') : $('iframe:first')
	thisFrame.error(function(){wparent.opener.success('fail');})
	if($('frame:nth(1)').attr('src').indexOf('cheat') >= 0 ){
		var cheatCheck = []//1;
		
		if(wparent.location.host.indexOf('fire-ptc')!=-1)cheatCheck = [1];
		if(wparent.location.host.indexOf('buxfury')!=-1)cheatCheck = [8,2,5];
		if(wparent.location.host.indexOf('storybux')!=-1)cheatCheck = [1,5,12,16,18,10];
		if(wparent.location.host.indexOf('clickersptc')!=-1)cheatCheck = [3,7];
		if(wparent.location.host.indexOf('crazy-cat-ptc')!=-1)cheatCheck = [3];
		if(wparent.location.host.indexOf('moderob')!=-1)cheatCheck = [13,9];
		if(wparent.location.host.indexOf('votre-part-degains-ptc')!=-1)cheatCheck = [4];
		if(wparent.location.host.indexOf('wizardlyptc')!=-1)cheatCheck = [1];
		if(wparent.location.host.indexOf('hpbux')!=-1)cheatCheck = [11,1,4,7];
		if(wparent.location.host.indexOf('cash-clicks')!=-1)cheatCheck=[37,15,33,30,5];;
		if(wparent.location.host.indexOf('cashcamel')!=-1)cheatCheck = [58,22,23,27,75,8,39,46,49,65,71,60,32,35];
		if(wparent.location.host.indexOf('megatronptc')!=-1)cheatCheck = [59,53];
		if(wparent.location.host.indexOf('idw-silverclix')!=-1)cheatCheck = [8,14,3,15];
		if(wparent.location.host.indexOf('paidtoclickad')!=-1)cheatCheck=[1,5,3,9,7,17,21,15,12];
		if(wparent.location.host.indexOf('lovemyclicks')!=-1)cheatCheck=[1,6];
		if(wparent.location.host.indexOf('arrowptc')!=-1)cheatCheck=[10,7,4];
		if(wparent.location.host.indexOf('holiday-clicks')!=-1)cheatCheck=[5,4];
		if(wparent.location.host.indexOf('unicornsummerptc')!=-1)cheatCheck=[26,20,16];
		if(wparent.location.host.indexOf('flutterybyclicks')!=-1)cheatCheck=[11,7,1];
		if(wparent.location.host.indexOf('crasbux')!=-1)cheatCheck=[1,6];
		if(wparent.location.host.indexOf('javaklix')!=-1)cheatCheck=[35,38,42];
		if(wparent.location.host.indexOf('happyclix')!=-1)cheatCheck=[1];
		if(wparent.location.host.indexOf('penguins-n-hedgehogs')!=-1)cheatCheck=[4,6];
		if(wparent.location.host.indexOf('fast2earn')!=-1)cheatCheck=[4];
		if(wparent.location.host.indexOf('hangarads')!=-1)cheatCheck=[3,17,8,13];
		if(wparent.location.host.indexOf('ceoclix')!=-1)cheatCheck=[11,18,23,15,3,20,26];
		if(wparent.location.host.indexOf('clickandcash')!=-1)cheatCheck=[];
		if(wparent.location.host.indexOf('tulipptc')!=-1)cheatCheck=[1,11,8];
		if(wparent.location.host.indexOf('clickswithme')!=-1)cheatCheck=[];
		if(wparent.location.host.indexOf('empireclix')!=-1)cheatCheck=[6,1];
		if(wparent.location.host.indexOf('cashtravel')!=-1)cheatCheck=[22];
		if(wparent.location.host.indexOf('thedailyclix')!=-1)cheatCheck=[9,6,1];
		if(wparent.location.host.indexOf('7starptc')!=-1)cheatCheck=[1,6];
		if(wparent.location.host.indexOf('clickspay')!=-1)cheatCheck=[4,11,7,16];
		if(wparent.location.host.indexOf('kyclix')!=-1)cheatCheck=[15,19,16];
		if(wparent.location.host.indexOf('office-ptc')!=-1)cheatCheck=[9,11];
		if(wparent.location.host.indexOf('ptcforbux')!=-1)cheatCheck=[];
		if(wparent.location.host.indexOf('posbux')!=-1)cheatCheck=[3,10,15,19];
		if(wparent.location.host.indexOf('robinhoodptc')!=-1)cheatCheck=[6];
		if(wparent.location.host.indexOf('ptcadz')!=-1)cheatCheck=[6];
		if(wparent.location.host.indexOf('cashonbux')!=-1)cheatCheck=[2];
		if(wparent.location.host.indexOf('cashclix')!=-1)cheatCheck=[3];
		if(wparent.location.host.indexOf('clixpalace')!=-1)cheatCheck=[19,22,24,33,28,27];
		if(wparent.location.host.indexOf('grandptc')!=-1)cheatCheck=[37,31,1,21,18];
		if(wparent.location.host.indexOf('x-click')!=-1)cheatCheck=[73,119,64,69,55,126,123,134,85,125,56];
		
		
		var inters = setInterval(function(){
			var doc1 = $( $('frame:first')[0].contentDocument );
			var doc = $( $('frame:nth(1)')[0].contentDocument );
			if($('input[type=radio]',doc).size()){
				clearInterval(inters);
				div.text($('#timer',doc1).text())
				$.each(cheatCheck,function(k,v){
					if($('input[value='+v+']',doc).size()){
						$('input[value='+v+']',doc).attr('checked',true);
						$('input[value=Answer]',doc).trigger('click');
						setTimeout(function(){
							wparent.opener.success('retry');
						},200);
					}
				});
			}
		},2000);
	}
	else{
		var iframeLoad = 50;
		var intersAds = setInterval(function(){
			iframeLoad--;
			
			if(iframeLoad == 0){
				clearInterval(intersAds);
				wparent.opener.success('fail');
			}
			if(iframeLoad == 20){
				$('frame:nth(1)').attr('src','http://google.com');
			}
		},1000)
		var fulltimer;
		
		var inters = setInterval(function(){
			var doc = $( $('frame:first')[0].contentDocument );
			var win = $('frame:first')[0].contentWindow;
			var btnKey = '';
			if(!fulltimer)
				fulltimer = (win.fulltimer)?win.fulltimer:win.timer ;
			$('#buttons',doc).show();
			div.text('wait: '+ (fulltimer--)+ ' - timeout: '+ iframeLoad);
			
			
			
			if($('#timer',doc).text().indexOf('Click') >= 0 || $('#timer img:visible',doc).size() || fulltimer==-1){
				clearInterval(intersAds);
				
				function ajaxRec(btnKey){
					clearInterval(inters);
					$.ajax({
						url : 'gpt.php?v=verify&buttonClicked='+btnKey+'&id='+win.id+'&type='+win.type+'&pretime='+win.pretime+'&'+win.url_variables
					}).complete(function(a,b){
						console.log(a)
						console.log(b)
						if(a.responseText.indexOf('You clicked the wrong number')>=0){
							btnKey++;
							ajaxRec(btnKey)
						}
						else if(wparent.location.href.indexOf('type=ce') != -1){
							wparent.location.reload()
						}
						else{
							$('frame:nth(1)').remove();
							var inters = setInterval(function(){
								div.text('wait: '+ (fulltimer--)+ ' - timeout: '+ iframeLoad);
								if(fulltimer <= -10 ){
									clearInterval(inters)
									$('frame:nth(1)').remove();
									setTimeout(function(){
										wparent.opener.success('');
									},1000);
								}
							},1000);
														
						}
					})
				}
				var primeImg = $('#timer img',doc);
				if(primeImg.size()){
					function gameClick(){
						function decode(img,pos){
							var canvas = document.createElement('canvas');
							canvas.width = primeImg.width();
							canvas.height = primeImg.height(); 
							var ctx = canvas.getContext('2d');

							// Draw image on canvas to get its pixel data
							ctx.drawImage(img, pos, 0);

							// Get image pixels
							var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
							var pixels = imageData.data;
							return pixels;
						}
						var arrPos = [];
						if($('#buttons > img',doc).size()){
							var imgsrc = ($('#buttons > div',doc).attr('style').match(/url\([^]+\)/)[0].replace('url(','').replace(')',''))
							var imgobj = $('<img>').attr({src:imgsrc})
							
							$.each($('#buttons .highlight',doc),function(k,v){
								if(k == 0)
									arrPos.push(decode(imgobj[0],0))
								else
									arrPos.push(decode(imgobj[0],'-'+(primeImg.width()*k)))
							})
						}
						else{
							$.each($('#buttons img',doc),function(k,v){
								arrPos.push(decode(v,0))
							});
						}
						var img1 = decode(primeImg[0],0);
						var checker = [];
					
						$.each(arrPos,function(k,v){
							var v = 0;
							for(i=0;i<img1.length;i++){
								if(img1[i] == arrPos[k][i]){
									v++;
								}    
							}
							checker.push(v)
						});
						
						btnKey = checker.indexOf(Math.max.apply(Math, checker)) ;
						console.log(checker)
						console.log(btnKey)
						ajaxRec(btnKey);
					}
					primeImg.load(function(){gameClick();}).ready(function(){gameClick();}).error(function(){wparent.opener.success('fail');});
					
				}
				else{
					
					var key = $('#timer',doc).text().replace('Click ','');
					$.each($('#buttons img',doc),function(k,v){
						if($(v).attr('src').indexOf(key) >= 0){
							btnKey = k;
						}
					});
					if(wparent.location.host.indexOf('clixten')!=-1)btnKey=1
					ajaxRec(btnKey);
				}
			}
		},1000);
	}
}