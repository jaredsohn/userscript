// ==UserScript==
// @name        adzpot
// @namespace   adzpot
// @include     *://*adzpot.com/index.php?view=ads
// @include     *://*adzpot.com/index.php?view=surfer*
// @require     http://userscripts.org/scripts/source/159982.user.js?
// @include     http://*.*cks.com/
// @include     *://*cl.my/*
// @include     *://*link.com/*
// @include     *://*cl.my/*
// @version     1
// ==/UserScript==

if(wparent.location.href.indexOf('index.php?view=ads') != -1){
	var arr = [];
	var ctr = 0;
	var div = $('<div>');
	var clickNum = ctr + 1 ;
	var loading = 0;
	
	div.css({color:'#000',zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:399,height:20,background:'#AFFFAF',border:'2px solid green',bottom:10,right:10})
		.text('clicking: '+clickNum+' loading : '+ loading);
	$('body').css({position:'relative'}).append(div);
    setTimeout(function(){
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
                if(typeof adsWind == 'undefined')
					adsWind = wparent.open(arr[ctr].href,"janbee","width=100,height=50,top=1000,left=20000");
				else	
					adsWind.location.href = arr[ctr].href;
				$(adsWind).ready(function(){adsWind.resizeTo(600,600)})	
                div.text('clicking : '+clickNum+' / '+ arr.length +' - loading : '+ loading);
            }
            else{	
                var timeReload=120000;
                setInterval(function(){timeReload-=1000;div.text("reloading :"+timeReload)},1000);
                    setTimeout(function(){
                        window.location.reload()
                },120000); adsWind.close()
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
			else if(r == 'betlog'){
				setTimeout(function(){rec(ctr);})
			}
            else{
                arr[ctr].jObj.text('done').css({background: '#000',color:'#FFF'});
				ctr++;
                clickNum = ctr + 1;		
                setTimeout(function(){rec(ctr);})
               
            }
            
        }
    },5000)
}
if(wparent.location.href.indexOf('index.php?view=surfer') != -1 || wparent.location.href.indexOf('fixedads_surfer.php?view=surfer') != -1){

	var ctr = 0;
	var div = $('<div>');
	div.css({font:'bold 10px arial',color:'#000',zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:70,height:20,background:'#AFFFAF',border:'2px solid green',top:10,left:10})
		.text('loading');
	$('html').css({position:'relative'}).append(div);
	
    $.each($('iframe'),function(){
        if($(this).attr('src')){
            if($(this).attr('src').indexOf('resence')>=0){
                wparent.opener.success('fail');
            }
        }
    })
    var key = Math.floor((Math.random()*3)+1);
    
	//wparent.stop();
	
	var timerterval = ''
	var iframeLoad = 50;
	var intersAds = setInterval(function(){
		iframeLoad--;
		div.text('tmout '+iframeLoad)
		if(iframeLoad == 0){
			clearInterval(intersAds);
			wparent.opener.success('fail');
		}
	},1000)
	$('body iframe.surfer_frame').load(function(){clearInterval(intersAds);
		var okey = false
		setTimeout(function(){
			$.each($('#vnumbers img'),function(k,v){$(v).addClass('img'+k)});
			$('#vnumbers').show()
			var canSize = $('map area').size();
			function decode(img,pos){
				var canvas = document.createElement('canvas');
				
				canvas.width = ( $('map area').width()/canSize );
				canvas.height = $('map area').height(); 
				var ctx = canvas.getContext('2d');
				//ctx.translate(canvas.width-1, canvas.height-1);
				//ctx.rotate(Math.PI); 
				// Draw image on canvas to get its pixel data
				ctx.drawImage(img, pos, 0);
				
				//$('body').prepend(canvas)
				// Get image pixels
				var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
				var pixels = imageData.data;
				return pixels;
			}
			
			var arrPos = [];
			for(i=0;i<canSize;i++){
				if(i == 0)
					arrPos.push(decode($('img[usemap=#Map]')[0],0))
				else
					arrPos.push(decode($('img[usemap=#Map]')[0],'-'+(( $('map area').width()/canSize )*i)))
			}
			
			//var img1 = decode($('.img0')[0],0);
			if($('#vnumbers img').size() == 2){
				imgUpsideDown = {
					ref: decode($('.img0')[0],0)
				}
			}
			var checker = []
			var vct
			$.each(arrPos,function(k,v){
				vct = 0;
				$.each(imgUpsideDown,function(_k,_v){
					
					for(i=0;i<_v.length;i++){
						if(_v[i] == arrPos[k][i]){
							vct++;
						}
					}
					
				})
				checker.push(vct)
			})
			
			
			var ind = checker.indexOf(Math.max.apply(Math, checker));
			console.log(checker)
			console.log(ind);
			$.ajax({
				url: wparent.location.href.match(/\/[^]+\?/)[0]+'view=surfer&',
				type: 'post',
				data: 'action=validate&t='+wparent.adtk+'&masterkey='+(ind+1)
			}).complete(function(a,b,c,d){
				console.log(a)
				console.log(b)
				console.log(c)
				console.log(d)
				if(a.responseText.indexOf('Invalid')>=0 || a.responseText.indexOf('!DOCTYPE')>=0){
					div.text('failed').css('background','red');
				}
				if(a.responseText.indexOf('ok')>=0){
					okey = true; 
				}
			}) 
		},(wparent.secs * 1000)+2000)
		timer = wparent.secs ;
		timerterval = setInterval(function(){
			$('#vnumbers').show()
			div.text('wait:'+(timer--));
			if(timer == -10	){
				if(!okey)
					wparent.opener.success('');
				else{
					wparent.opener.success('');
				}
			}
		},1000);
	})
	
}