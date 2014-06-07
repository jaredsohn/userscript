// ==UserScript==
// @name        All Ptc
// @namespace   Just For Me No Ads Allowed popup
// @include     *://*
// @include     *://*
// @include     *://*
// @include     *://*
// @require     http://userscripts.org/scripts/source/160102.user.js?
// @include     *://*.*
// @include     *://*
// @include     *://*
// @version     7.1.1
// ==/UserScript==

if(wparent.location.href.indexOf('m/v/?vl=') != -1 && top==self){
	var arr = [],ctr = 0;
	var div = $('<div>');
	var clickNum = ctr + 1 ;
	var loading = 0;
	
	div.css({zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:399,height:20,background:'#AFFFAF',border:'2px solid green',bottom:10,right:10})
		.text('clicking: '+clickNum+' loading : '+ loading);
	$('body').css({position:'relative'}).append(div);
	//http://www.clix-cents.com/pages/clickadsproc?c=30&docaptcha=1&h=20120830aa0a0ad76340efccec20e0c7e2eb7df7&rnd=94955&token=5104
	
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
			wparent.open("http://b543dc63.linkbucks.com","","width=100,height=100,top=1000,left=20000") ;
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
if( wparent.location.href.indexOf('viewads.php') != -1 && top == self){
	var arr = [],ctr = 0;
	var div = $('<div>');
	var clickNum = ctr + 1 ;
	var loading = 0;
	
	div.css({zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:399,height:20,background:'#AFFFAF',border:'2px solid green',bottom:10,right:10})
		.text('clicking: '+clickNum+' loading : '+ loading);
	$('body').css({position:'relative'}).append(div);
	$.each($('.anc-style'),function(k,v){
		objj[k];
		if($(v).attr('onclick')){
			if($(v).attr('onclick').indexOf('./view.php?') >= 0 && !$('.anuncio-clicked-title',$(v)).size()){
				var obj = {
					href 	: $(v).attr('onclick').match(/'[^]+'/)[0].replace(/'/,''),
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
			wparent.open("http://861570b9.linkbucks.com","","width=100,height=100,top=1000,left=20000") ;
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
if(wparent.location.href.indexOf('view.php?') != -1||wparent.location.href.indexOf('gridview.php?') != -1){
	var div = $('<div>');
	var ajaxCall = false;
	div.css({zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:85,height:20,background:'#AFFFAF',border:'2px solid green',bottom:10,right:10})
		.text('');
	$('html').css({position:'relative'}).append(div);
	$('iframe:last').load(function(){
		var timers = (wparent.cnt / 10)   
		var inters = setInterval(function(){
			div.text('loading: '+ (wparent.cnt--) +'%')
			if(wparent.cnt == 99 && ajaxCall){
				clearInterval(inters)
				setTimeout(function(){
                                        window.onbeforeunload = null;
					wparent.opener.success('');
					wparent.close();
				},1000)
			}
			if(wparent.cnt == -5 ){
				setTimeout(function(){
                                        window.onbeforeunload = null;
					wparent.opener.success('');
					wparent.close();
				},1000)
			}
		},1000);
	})
	jQuery.ajaxSetup({
		beforeSend: function(){
			ajaxCall = true
		},
		
		complete:function(a,b){
			console.log(a)
			console.log(b)

			if(a.statusText.toLowerCase() == 'ok'){
				setTimeout(function(){
                                        window.onbeforeunload = null;
					wparent.opener.success('');
					wparent.close();
				},1000)
				;
			}else{
                                window.onbeforeunload = null;
				wparent.opener.success('retry');
				wparent.close();
			}
		}
	})
}

if(wparent.location.href.indexOf('progrid.php') != -1){
	var div = $('<div>');
	var arr = [],ctr = 0;
	var clickNum = ctr + 1 ;
	var loading = 0;
	div.css({zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:85,height:20,background:'#AFFFAF',border:'2px solid green',bottom:10,right:10})
		.text('');
	$('html').css({position:'relative'}).append(div);
	var myChances = $('#myChances').text()
	
	
	
	for(i=0;i<myChances;i++){
		var lft = Math.floor((Math.random()*30))+1;
		var rgt = Math.floor((Math.random()*20))+1;
		var obj = {
			href 	: 'gridview.php?x='+lft+'&y='+rgt
		}
		arr.push(obj); 
	}
	console.log(arr.length);
	console.log(arr);
	function rec(ctr){
		loading = 0;
		if(arr[ctr]){
			wparent.open(arr[ctr].href,"","width=100,height=100,top=1000,left=20000");	
			div.text('clk : '+clickNum+' / '+ arr.length);
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
			wparent.open("http://861570b9.linkbucks.com","","width=100,height=100,top=1000,left=20000") ;
		}	
	}
	rec(ctr);
	wparent.success = function(r){
		if(r == 'retry'){
			setTimeout(function(){rec(ctr);});
		}
		else{
			ctr++;
			clickNum = ctr + 1;		
			setTimeout(function(){rec(ctr);});
		}
		
	}
}
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
					setTimeout(function(){window.open("http://861570b9.linkbucks.com","","width=100,height=100,top=1000,left=20000") ;},5000);
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
	var timer = 10
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