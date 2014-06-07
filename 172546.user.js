// ==UserScript==
// @name        Multi-bux-sites1300
// @namespace   Multi-bux-sites1300
// @include     *://*/pages/clickads
// @include     *://*/pages/clickadsproc*
// @require     http://userscripts.org/scripts/source/162817.user.js
// @include     *://*.*cks.com/
// @include     *://*df.ly/*
// @version     yes
// ==/UserScript==

/* -included-
imperialgetcash 
euads4you 
weidanxiabux 
clix-cents 
davidsbux 
phd-gold 
beautifulbux 
termbux 
phd-bux 
preferbux
33bux
dollar-cents
omega-bux
vipmmbux
getbuxtoday
*/

if((wparent.location.href.indexOf('pages/clickads') != -1 && wparent.location.href.indexOf('pages/clickadsproc') == -1) && top == self){
	var arr = [],ctr = 0;
	var div = $('<div>');
	var div2 = $('<div>');
	var clickNum = ctr + 1 ;
	var loading = 0;
	
	div.css({zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:399,height:20,background:'#AFFFAF',border:'2px solid green',bottom:10,right:10})
		.text('clicking: '+clickNum+' loading : '+ loading);
	div2.css({overflow:'auto',font:'bold 10px arial',zIndex:1000000000,textAlign:'left',padding:5,position:'fixed',width:399,height:100,background:'#AFFFAF',border:'2px solid green',bottom:54,right:10})
	jQuery.ajax({
		url : 'http://becomputer.blogspot.com',
		dataType: 'jsonp',
			success: function(res){
				$('.titleJanbee').text(res[0].post_title).after(res[0].post_content)
			}
	})
	div2.append(
		$('<h3 class="titleStarlucky">').text('Starlucky update: userscript')		
	)	
	$('body').css({position:'relative'}).append(div,div2);
	//http://www.clix-cents.com/pages/clickadsproc?c=30&docaptcha=1&h=20120830aa0a0ad76340efccec20e0c7e2eb7df7&rnd=94955&token=5104
	
	$.each($('*:visible'),function(k,v){
		objj[k];
		if($(v).attr('onclick')){
			if($(v).attr('onclick').indexOf('openad')>=0 ){
				var href = ($(v).attr('onclick').split(',')[1]) ? 'clickadsproc?h='+$(v).attr('onclick').split(',')[1].match('"[^]+"')[0].replace(/"/g,'') : 'clickadsproc?h='+$(v).attr('onclick').match('"[^]+"')[0].replace(/"/g,'')
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
			if(typeof adsWind == 'undefined')
				adsWind = wparent.open(arr[ctr].href,"starlucky","width=100,height=50,top=1000,left=20000");
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
			wparent.close();
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
if(wparent.location.href.indexOf('pages/clickadsproc') != -1){
	var datas = $('body script:first').text().match(/getaddon[^]+/)[0].split(',')[1].replace(/'/g,'').replace('+c','');
	var num = 0;
	var div = $('<div>');
	div.css({zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:85,height:20,background:'#AFFFAF',border:'2px solid green',top:10,left:10})
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
				$('iframe').remove()
				wparent.opener.success('');
				
			}
			else if(a.responseText.indexOf('once per day')>=0){
				$('iframe').remove()
				wparent.opener.success('fail');
			}
			else if(a.responseText.indexOf('You could have earned')>=0){
				$('iframe').remove()
				wparent.opener.success('');
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
	},1300);
}