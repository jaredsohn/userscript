// ==UserScript==
// @name        twickerz
// @namespace   twickerz
// @include     *://*twickerz.com/index.php?view=ads
// @include     *://*twickerz.com/index.php?view=surfer*
// @include     *://*twickerz.com/fixedads_surfer.php?view=surfer*
// @require     http://userscripts.org/scripts/source/156923.user.js
// @include     http://*.*cks.com/
// @version     1
// ==/UserScript==

if(wparent.location.href.indexOf('index.php?view=ads') != -1){
	var arr = [],ctr = 0;
	var div = $('<div>');
	var clickNum = ctr + 1 ;
	var loading = 0;
	
	div.css({color:'#000',zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:399,height:20,background:'#AFFFAF',border:'2px solid green',bottom:10,right:10})
		.text('clicking: '+clickNum+' loading : '+ loading);
	$('body').css({position:'relative'}).append(div);
	setTimeout(function(){
		$.each($('.widget-main-title2'),function(){
			if($(this).text().indexOf('Expired')>=0){
				$(this).nextAll().remove()
			}
		})
        $.each($('.ad-block'),function(k,v){
            objj[k];
            if($(v).attr('class')){
                if($(v).attr('class').indexOf('disabled') == -1){
                    
                    var obj = {
                        href 	: $(v).find('span.pointer').attr('onclick').split(',')[0].match(/'[^]+'/)[0].replace(/'/g,''),
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
                setInterval(function(){timeReload-=1000;div.text("reloading :"+timeReload)},1000);
                    /* var test=window.open(null,"","width=100,height=100");try{test.close()}catch(e){alert("Pop-ups blocked. to remove this alert enable popup blocker or edit this code")} */;
                    
                    setTimeout(function(){
                        window.location.reload()
                },120000); 
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
    
    
    },5000)
	
}
if(wparent.location.href.indexOf('index.php?view=surfer') != -1 || wparent.location.href.indexOf('fixedads_surfer.php?view=surfer') != -1){
	$.each($('iframe'),function(){
        if($(this).attr('src')){
            if($(this).attr('src').indexOf('cashnhits')>=0){
                wparent.opener.success('fail');
				wparent.close(); 
            }
        }
    })
	var key = Math.floor((Math.random()*3)+1);
	$('iframe:last').load(function(){
		var div = $('<div>');
		var timerterval = ''
		setTimeout(function(){
			$.each($('img'),function(k,v){$(v).addClass('img'+k)});
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
			
			var ind = checker.indexOf(Math.max.apply(Math, checker)) + 1;
			
			$.ajax({
				url: wparent.location.href.match(/\/[^]+\?/)[0]+'view=surfer&',
				type: 'post',
				data: 'action=validate&t='+wparent.adtk+'&masterkey='+ind
			}).complete(function(a,b,c,d){
				console.log(a)
				console.log(b)
				console.log(c)
				console.log(d)
				if(a.responseText.indexOf('Invalid')>=0 || a.responseText.indexOf('!DOCTYPE')>=0){
					div.text('failed').css('background','red');
					clearInterval(timerterval)
					wparent.location.reload()
				}
				if(a.responseText.indexOf('ok')>=0){
				
					wparent.opener.success('');
					wparent.close();
				}
			})
		},(wparent.secs * 1000))
		timer = wparent.secs 
		timerterval = setInterval(function(){
			
			div.css({color:'#000',zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:70,height:20,background:'#AFFFAF',border:'2px solid green',bottom:10,right:10})
			.text('click wait:'+(timer--));
			$('body').css({position:'relative'}).append(div);
			if(timer == -20){
				wparent.opener.success('fail');
				wparent.close();
			}
		},1000) 
	})
}
else if(wparent.location.href.indexOf('ucks.com') != -1){

	var wind = $(window)[0];
	var wparent = (wind.wrappedJSObject) ? wind.wrappedJSObject : wind;
	$(function($){
		var secs = 9;
		
		var div = $('<div>');
		div.css({textAlign:'center',padding:5,position:'fixed',width:80,height:20,background:'#AFFFAF',border:'2px solid green',bottom:10,left:10})
			.text('counter : '+secs);
			$('body').css({position:'relative'}).append(div);
			
		$('#framebar').css({opacity:0})
		setInterval(function(){
			secs--;
			if(secs == 0){
				wparent.close();
			}
			div.text('counter : '+secs);
		},1000);
	});
}
