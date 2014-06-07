// ==UserScript==
// @name        clixten MULTICLICKER
// @namespace   CLIXTEN
// @include     *://*clixten.info/index.php?view=click&*
// @include     *://*clixten.info/gpt.php?v=entry*
// @require     http://userscripts.org/scripts/source/160102.user.js?
// @include     *://*.*cks.com/
// @include     *://*cl.my/*
// @include     *://*link.com/*
// @version     1
// ==/UserScript==
if(wparent.location.href.indexOf('index.php?view=click') != -1 || wparent.location.href.indexOf('index.php?view=account&ac=ptra') != -1 && top == self){
	var arr = [],ctr = 0;
	var div = $('<div>');
	var clickNum = ctr + 1 ;
	var loading = 0;
	
	div.css({zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:399,height:20,background:'#AFFFAF',border:'2px solid green',bottom:10,right:10})
		.text('clicking: '+clickNum+' loading : '+ loading);
	$('body').css({position:'relative'}).append(div);
	var clickSrc = ($('.ptcWrapper li center').size()) ? $('.ptcWrapper li center') : $('.ptcWrapper td');
	
	$.each(clickSrc,function(k,v){
		objj[k];
		var thisItem = $('a:last',$(v));
		
		if(thisItem.attr('href')){
			if(thisItem.attr('href').indexOf('gpt.php?v=entry') >= 0 || thisItem.attr('href').indexOf('gpt.php?v=read') >= 0 && thisItem.text().indexOf('Cheat Check') == -1){
			
				var obj = {
					href 	: thisItem.attr('href').replace('read','entry'),
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

}
if(wparent.location.href.indexOf('gpt.php?v=entry') != -1 && self == top){
	if($('frameset frame:last').attr('src').indexOf('adf.ly') >= 0){
		wparent.opener.success('fail');
	}
	var div = $('<div>');
	div.css({zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:85,height:20,background:'#AFFFAF',border:'2px solid green',top:10,left:10})
		.text('');
	$('html').css({position:'relative'}).append(div);
	
	
	if($('frame:last').attr('src').indexOf('cheat') >= 0 ){
		var cheatCheck = [8,2,5]//1;
		var iframeLoad = 50;
		var intersAds = setInterval(function(){
			iframeLoad--;
			//div.text('timeout'+iframeLoad)
			if(iframeLoad == 0){
				clearInterval(intersAds);
				wparent.opener.success('retry');
			}
		},1000)
		var inters = setInterval(function(){
			var doc1 = $( $('frame:first')[0].contentDocument );
			var doc = $( $('frame:last')[0].contentDocument );
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
			//div.text('timeout'+iframeLoad)
			if(iframeLoad == 0){
				clearInterval(intersAds);
				wparent.opener.success('fail');
			}
		},1000)
		var fulltimer
		var inters = setInterval(function(){
			var doc = $( $('frame:first')[0].contentDocument );
			var win = $('frame:first')[0].contentWindow;
			var btnKey = '';
			if(!fulltimer)
				fulltimer = (win.fulltimer) ?win.fulltimer:win.timer;
			
			div.text('lodng: '+ (fulltimer-=2))
			if($('#timer',doc).text().indexOf('Click') >= 0){
				clearInterval(inters);
				function ajaxRec(btnKey){
					$.ajax({
						url : 'gpt.php?v=verify&buttonClicked='+btnKey+'&id='+win.id+'&type='+win.type+'&pretime='+win.pretime+'&'+win.url_variables
					}).complete(function(a,b,c,d){
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
							wparent.opener.success('');
						}
					})
				}
				var primeImg = $('#timer img',doc);
				if(primeImg.size()){
					function theImage(){
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
							console.log('bg')
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
							console.log('normal')
							$.each($('#buttons ul img',doc),function(k,v){
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
						console.log(checker)
						btnKey = checker.indexOf(Math.max.apply(Math, checker)) ;
						ajaxRec(btnKey);
					}
					var imgCheck = 0
					primeImg.load(function() {
						if(imgCheck==0){
							imgCheck++;
							theImage();
						}
					}).ready(function(){
						if(imgCheck==0){
							imgCheck++;
							theImage();
						}
					}).error(function() {console.log('failimg'); wparent.opener.success('fail'); })
					
				}
				else{
					var key = $('#timer',doc).text().replace('Click ','');
					$.each($('#buttons img',doc),function(k,v){
						if($(v).attr('src').indexOf(key) >= 0){
							btnKey = k;
						}
					});
					ajaxRec(btnKey);
				}
				
				
				
			}
		},2000);
	}
}