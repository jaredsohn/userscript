// ==UserScript==
// @name        adzpot
// @namespace   adzpot
// @include     *://*adzpot.com/index.php?view=ads
// @include     *://*adzpot.com/index.php?view=surfer*
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

if(wparent.location.href.indexOf('index.php?view=ads') != -1 && top == self){
	var arr = [],ctr = 0;
	var div = $('<div>');
	var clickNum = ctr + 1 ;
	var loading = 0;
	
	div.css({zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:399,height:20,background:'#AFFFAF',border:'2px solid green',bottom:10,right:10})
		.text('clicking: '+clickNum+' loading : '+ loading);
	$('body').css({position:'relative'}).append(div);
	
	
	if($('#admin_advertisement:visible').size()){
		if($('div',$('#admin_advertisement')).attr('onclick')){
			var obj = {
					href 	: $('div',$('#admin_advertisement')).attr('onclick').toString().split(',')[0].match(/'[^]+'/)[0].replace(/'/g,''),
					jObj	: $('#admin_advertisement')
				}
			arr.push(obj); 
		}
	}
	$.each($('.ad-block span'),function(k,v){
		objj[k];
		
		if($(v).attr('onclick') && !$(v).parents('.ad-block').hasClass('disabled')){
			
			if($(v).attr('onclick').toString().indexOf('view=surfer') >= 0 ){
				
				var obj = {
					href 	: $(v).attr('onclick').toString().split(',')[0].match(/'[^]+'/)[0].replace(/'/g,''),
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
		}	
	}
	rec(ctr);
	wparent.success = function(r){
            if(r == 'fail'){
                arr[ctr].jObj.css({border:'5px solid red'})
                ctr++;
                clickNum = ctr + 1;		
                setTimeout(function(){rec(ctr);})
            }
            else{
                arr[ctr].jObj.text('done').css({background: '#000',color:'#FFF'});
                ctr++;
                clickNum = ctr + 1;		
                setTimeout(function(){rec(ctr);})
            }
            
        }
	
}
if(wparent.location.href.indexOf('index.php?view=surfer') != -1 && self == top){
	var key = Math.floor((Math.random()*3)+1);
	var div = $('<div>');
	div.css({color:'#000',zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:70,height:20,background:'#AFFFAF',border:'2px solid green',top:10,left:10})
			.text('loading');
	$('html').css({position:'relative'}).append(div);
	$.each($('iframe'),function(){
        if($(this).attr('src')){
            if($(this).attr('src').indexOf('cashnhits')>=0){
                wparent.opener.success('fail');
				wparent.close(); 
            }
        }
    });
	var iframeLoad = 50;
	var intersAds = setInterval(function(){
		iframeLoad--;
		div.text('timeout'+iframeLoad)
		if(iframeLoad == 0){
			clearInterval(intersAds);
			wparent.opener.success('fail');
			wparent.close(); 
		}
	},1000)
	var ind;
	$('body a iframe.surfer_frame').load(function(){clearInterval(intersAds)
		var timerterval = ''
		setTimeout(function(){
			var imgKey = 0;
			$.each($('img'),function(k,v){
				if($(v).attr('src').indexOf('modules.php')>=0){
					$(v).addClass('img'+(imgKey++))
				}
			});
			$('#vnumbers').show()
			function decode(img,pos){
				var canvas = document.createElement('canvas');
				canvas.width = $('.img0').width();
				canvas.height = $('.img0').height(); 
				var ctx = canvas.getContext('2d');

				// Draw image on canvas to get its pixel data
				ctx.drawImage(img, pos, 0);

				// Get image pixels
				var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
				var pixels = imageData.data;
				return pixels;
			}
			var canSize = $('map area').size();
			var arrPos = [];
			for(i=0;i<canSize;i++){
				if(i == 0)
					arrPos.push(decode($('.img1')[0],0))
				else
					arrPos.push(decode($('.img1')[0],'-'+($('.img0').width()*i)))
			}
			
			var img1 = decode($('.img0')[0],0);
			var checker = []
			$.each(arrPos,function(k,v){
				var v = 0;
				for(i=0;i<img1.length;i++){
					if(img1[i] == arrPos[k][i]){
						v++;
					}    
				}
				checker.push(v)
			})
			
			ind = checker.indexOf(Math.max.apply(Math, checker)) + 1;
			
			$.ajax({
				url: 'index.php?view=surfer&',
				type: 'post',
				data: 'action=validate&t='+wparent.adtk+'&masterkey='+ind
			}).complete(function(a,b,c,d){
				console.log(a)
				console.log(b)
				console.log(c)
				console.log(d)
				
				if(a.responseText.indexOf('ok')>=0){
				
					wparent.opener.success('');
					wparent.close();
				}
			})
		},(wparent.secs * 1000))
		timer = wparent.secs 
		timerterval = setInterval(function(){
			
			div.text('wait:'+(timer--));
			if(timer == -5){
				wparent.opener.success('');
				wparent.close();
			}
		},1000)
	})
	
}