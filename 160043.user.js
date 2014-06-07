// ==UserScript==
// @name        dasherreindeerptc
// @namespace   dasherreindeerptc
// @include     *://*dasherreindeerptc.info/index.php?view=click*
// @include     *://*dasherreindeerptc.info/gpt.php?v=entry*
// @require     http://userscripts.org/scripts/source/159898.user.js?
// @include     *://*.*cks.com/
// @include     *://*cl.my/*
// @include     *://*link.com/*
// @include     *://*oc.us/*
// @include     *://*df.ly/*
// @include     *://*ad7.biz/*
// @include     *://*link.fr/*
// @version     1
// ==/UserScript==

if(wparent.location.href.indexOf('index.php?view=click') != -1 && top == self){
	var arr = [],ctr = 0;
	var div = $('<div>');
	var clickNum = ctr + 1 ;
	var loading = 0;
	
	div.css({zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:399,height:20,background:'#AFFFAF',border:'2px solid green',bottom:10,right:10})
		.text('clicking: '+clickNum+' loading : '+ loading);
	$('body').css({position:'relative'}).append(div);
	$.each($('.ptcWrapper td'),function(k,v){
		objj[k];
		var thisItem = $('a:last',$(v));
		if(thisItem.attr('href')){
				
			
			if(thisItem.attr('href').indexOf('gpt.php?v=entry') >= 0 && thisItem.text().indexOf('Cheat Check') == -1){
			
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
			var adsWind = wparent.open(arr[ctr].href,"","width=100,height=50,top=1000,left=20000");	
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
		wparent.close();
	}
	var div = $('<div>');
	div.css({zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:85,height:20,background:'#AFFFAF',border:'2px solid green',top:10,left:10})
		.text('');
	$('html').css({position:'relative'}).append(div);
	
	if($('frame:last').attr('src').indexOf('ashnhits') >= 0 && wparent.name == 'janbee'){
		wparent.opener.success('fail');
		wparent.close();
	}
	if($('frame:last').attr('src').indexOf('cheat') >= 0 ){
		var cheatCheck = []//1;
		
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
							wparent.close();
						},200);
					}
				});
			}
		},2000);
	}
	else{
		var inters = setInterval(function(){
			var doc = $( $('frame:first')[0].contentDocument );
			var win = $('frame:first')[0].contentWindow;
			var btnKey = '';
			div.text($('#timer',doc).text())
			if($('#timer',doc).text().indexOf('Click') >= 0){
				clearInterval(inters);
				var primeImg = $('#timer img',doc);
				if(primeImg.size()){
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
					if(!$('#buttons img',doc).size()){
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
					console.log(checker)
					btnKey = checker.indexOf(Math.max.apply(Math, checker)) ;
				}
				else{
					var key = $('#timer',doc).text().replace('Click ','');
					$.each($('#buttons img',doc),function(k,v){
						if($(v).attr('src').indexOf(key) >= 0){
							btnKey = k;
						}
					});
				}
				//console.log('gpt.php?v=verify&buttonClicked='+btnKey+'&id='+win.id+'&type='+win.type+'&pretime='+win.pretime+'&'+win.url_variables)
				//return false
				function ajaxRec(btnKey){
					$.ajax({
						url : 'gpt.php?v=verify&buttonClicked='+btnKey+'&id='+win.id+'&type='+win.type+'&pretime='+win.pretime+'&'+win.url_variables
					}).complete(function(a,b,c,d){
						console.log(a)
						console.log(b)
						console.log(c)
						console.log(d)
						if(a.responseText.indexOf('You clicked the wrong number')>=0){
							btnKey++;
							ajaxRec(btnKey)
						}
						else if(wparent.location.href.indexOf('type=ce') != -1){
							wparent.location.reload()
						}
						else{
							wparent.opener.success('');
							wparent.close();
						}
					})
				}
				ajaxRec(btnKey);
			}
		},2000);
	}
}