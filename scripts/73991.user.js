// ==UserScript==
// @name          Modified Plurk Mobile Plus
// @namespace     http://userscripts.org/scripts/show/73991
// @description   Add more features to the Plurk Mobile site 
// @version       0.2
// @date	  2010-04-10
// @author        soup (麻糬)
// @include       http://www.plurk.com/m
// @include       http://www.plurk.com/m/*
// @include       http://plurk.com/m
// @include       http://plurk.com/m/*
// @exclude	  http://www.plurk.com/m/u/*
// @exclude	  http://www.plurk.com/m/p/*
// ==/UserScript==

// Original author: Hao Chen (userscripts.org/users/44035)、Simon (blog.dg-space.com/?p=417)
/* Changelog:
Version 0.2 - combined two scripts and get more features 
*/

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

var plurkGlobal = null;
var plurkUser = null;
var Emoticons = null;
var plurkEmoticons = null;

function letsJQuery() {
	unsafeWindow.Emoticons = 
	{
		basic:
			[[/(?:(\s+|^)):-?\)\)/,"/basic/joyful.gif",":-))"],[/(?:(\s+|^)):-?\)/,"/basic/smile.gif",":-)"],[/(?:(\s+|^)):-?D/i,"/basic/grin.gif",":-D"],["(LOL)","/basic/lol.gif","(LOL)"],[/:-?P/i,"/basic/tongue.gif",":-P"],[/\(woot\)/i,"/basic/w00t.gif","(woot)"],[/;-?\)/i,"/basic/wink.gif",";-)"],[/:-?o/i,"/basic/surprised.gif",":-o"],[/X-?\(/,"/basic/angry.gif","X-("],[/:-?\(/,"/basic/sad.gif",":-("],[/:'-?\(/,"/basic/crying.gif",":'-("],[/:-?&amp;/,"/basic/sick.gif",":-&"]],
		silver:
			[[/(?:(\s+|^))\(K\)/,"/silver/kiss.gif","(K)"],["(angry)","/silver/angry.gif","(angry)"],["(annoyed)","/silver/annoyed.gif","(annoyed)"],["(bye)","/silver/bye.gif","(bye)"],[/(?:(\s+|^))B-?\)/,"/silver/cool.gif","B-)"],["(cozy)","/silver/cozy.gif","(cozy)"],["(sick)","/silver/fever.gif","(sick)"],["(:","/silver/tired.gif","(:"],["(goodluck)","/silver/fingerscrossed.gif","(goodluck)"],["(griltongue)","/silver/gril_toungue.png","(griltongue)"],[/(LOL)/,"/silver/laugh.gif","(LOL)"],[/(mmm)/,"/silver/like_food.gif","(mmm)"],["(hungry)","/silver/hungry.gif","(hungry)"],["(music)","/silver/listening_music.gif","(music)"],["(tears)","/silver/tears.gif","(tears)"],["(tongue)","/silver/tongue.gif","(tongue)"],["(unsure)","/silver/unsure.gif","(unsure)"],["(highfive)","/silver/wave.gif","(highfive)"],["(dance)","/silver/dance.gif","(dance)"]],
		gold:
			[["(doh)","/gold/doh.gif","(doh)"],["(brokenheart)","/gold/broken_heart.gif","(brokenheart)"],["(drinking)","/gold/drinking.gif","(drinking)"],["(girlkiss)","/gold/girl_kiss.gif","(girlkiss)"],["(rofl)","/gold/lol.gif","(rofl)"],["(money)","/gold/money.gif","(money)"],["(rock)","/gold/rock_n_roll.gif","(rock)"],["(nottalking)","/gold/not_talking.gif","(nottalking)"],["(party)","/gold/party.gif","(party)"],["(thinking)","/gold/thinking.gif","(thinking)"],["(bringit)","/gold/bring_it_on.gif","(bringit)"],["(worship)","/gold/worship.gif","(worship)"],["(applause)","/gold/applause.gif","(applause)"],[/8-?\)/,"/gold/nerd.gif","8-)"],[/(gym)/,"/gold/gym.gif","(gym)"],[/(devil)/,"/gold/devil.gif","(devil)"],[/(lmao)/,"/gold/lmao.gif","(lmao)"],[/(heart)/,"/gold/heart.gif","(heart)"]],
		platinum:
			[["(big_eyes)","/platinum/big_eyed.gif","(big_eyes)"],["(funkydance)","/platinum/dance_moves.gif","(funkydance)"],["(idiot)","/platinum/idiot.gif","(idiot)"],["(lonely)","/platinum/lonely.gif","(lonely)"],["(scenic)","/platinum/scenic.gif","(scenic)"],["(hassle)","/platinum/silly_couple.gif","(hassle)"],["(panic)","/platinum/startled.gif","(panic)"],["(okok)","/platinum/unsure.gif","(okok)"],["(yahoo)","/platinum/yupi.gif","(yahoo)"]],
		karma100:
			[["(muhaha)","/karma100/muhaha.gif","(muhaha)"],["(banana_ninja)","/karma100/banana_ninja.gif","(banana_ninja)"],["(beer)","/karma100/beer.gif","(beer)"],["(coffee)","/karma100/coffee.gif","(coffee)"],["(fish_hit)","/karma100/fish_hit.gif","(fish_hit)"],["(muscle)","/karma100/muscle.gif","(muscle)"],["(smileydance)","/karma100/smileydance.gif","(smileydance)"],["(taser) (rammi)","/karma100/taser.gif","(taser) (rammi)"]],
		platinum2:
			[["(evil_grin)","/platinum2/evil_grin.gif","(evil_grin)"],["(banana_rock)","/platinum2/banana_rock.gif","(banana_rock)"],["(banana_cool)","/platinum2/banana_cool.gif","(banana_cool)"],["(headspin)","/platinum2/headspin.gif","(headspin)"],["(heart_beat)","/platinum2/heart_beat.gif","(heart_beat)"],["(ninja)","/platinum2/mninja.gif","(ninja)"],["(evilsmirk)","/platinum2/evilsmirk.gif","(evilsmirk)"]],
	}

	unsafeWindow.plurkGlobal = null;
	unsafeWindow.plurkUser = null;

	unsafeWindow.setUser = function(user)
	{
		unsafeWindow.plurkUser = user;
		return user;
	}

	unsafeWindow.getCurrentUser = function()
	{
		if($('.plurkbox p').length != 0)
		{
			user = $.trim($('.plurkbox p').contents().eq(2)[0].nodeValue);
			console.log('getCurrentUser', user);
		}
		else
		{
			user = null;
		}
		return user;
	}

	unsafeWindow.getUserInfo = function(callback)
	{
		if(unsafeWindow.plurkUser != null)
		{
			url = 'http://www.plurk.com/user/' + unsafeWindow.plurkUser;
			$.ajax(
				{
					type: "GET",
					url: url, 
					success: function(data)
					{
						data = data.substring(data.indexOf('GLOBAL = ') + 9);
						data = data.substring(0, data.indexOf("}}") + 2);
						unsafeWindow.plurkGlobal = eval('unsafeWindow.plurkUser = ' + data);
						console.log('getUserInfo', unsafeWindow.plurkGlobal);
						callback();
					}
				}
			);
			return true;
		}
		else
		{
			return false;
		}
	}

	unsafeWindow.displayKarma = function()
	{
		karma = unsafeWindow.getKarma();
		if(karma !== false)
		{
			$('#plurkystuff .karma').text(karma);
			return true;
		}
		else
		{
			return false;
		}
	}
	
	unsafeWindow.getKarma = function()
	{
		if(unsafeWindow.plurkGlobal != null)
		{
			karma = unsafeWindow.plurkGlobal['session_user']['karma'];
			console.log('getKarma',karma);
			return karma;
		}
		else
		{
			return false;
		}
	}

	unsafeWindow.displayKarmaChange = function()
	{
		karmaChange = unsafeWindow.getKarmaChange();
		if(karmaChange !== false)
		{
			img = $('<img/>');
			if(karmaChange > 0)
			{
				karmaChange = "+" + karmaChange;
				img.attr('src', "/static/dashboard/karma_up.png");
				img.attr('title', "Your Karma has gone up " + karmaChange + " since last karma update.");
			}
			else if(karmaChange < 0)
			{
				img.attr('src', "/static/dashboard/karma_down.png");
				img.attr('title', "Your Karma has gone down " + karmaChange + " since last karma update.");
			}
			$('#plurkystuff .karmaChange').html(img);
			img.after(" <span style='font-size:75%'>" + karmaChange + "</span>");
			return true;
		}
		else
		{
			return false;
		}
	}
	
	unsafeWindow.getKarmaChange = function()
	{
		if(unsafeWindow.plurkGlobal != null)
		{
			karmaChange = unsafeWindow.plurkGlobal['page_user']['karma_change'];
			console.log('getKarmaChange',karmaChange);
			return karmaChange;
		}
		else
		{
			return false;
		}
	}

	unsafeWindow.addMeLink = function()
	{
		$('.tabbar a:first').after(' | <a href="/m/u/' + unsafeWindow.plurkUser + '">me</a>');
		console.log('addMeLink');
	}
	
	unsafeWindow.getRecruited = function()
	{
		if(unsafeWindow.plurkGlobal != null)
		{
			recruited = unsafeWindow.plurkGlobal['session_user']['recruited'];
			console.log('getRecruited',recruited);
			return recruited;
		}
		else
		{
			return false;
		}
	}

	unsafeWindow.insertAtCursor = function(stringa)
	{
	  campo = document.getElementById('plurkybox');
	  stringa = unescape(stringa);
	  if (document.selection) {
	    campo.focus();
	    sel = document.selection.createRange();
	    sel.text = stringa;
	  }
	  else if (campo.selectionStart || campo.selectionStart == '0') {
	    var startPos = campo.selectionStart;
	    var endPos = campo.selectionEnd;
	    campo.value = campo.value.substring(0, startPos)
	                  + stringa
	                  + campo.value.substring(endPos, campo.value.length);
	  } else {
	    campo.value += stringa;
	  }
	  console.log(stringa);
	}
	
	unsafeWindow.displayEmoticons = function()
	{
		unsafeWindow.plurkEmoticons = unsafeWindow.Emoticons.basic;
		K = unsafeWindow.getKarma();
		if(K > 25)
			unsafeWindow.plurkEmoticons = unsafeWindow.plurkEmoticons.concat(unsafeWindow.Emoticons.silver);
		if(K > 50)
			unsafeWindow.plurkEmoticons = unsafeWindow.plurkEmoticons.concat(unsafeWindow.Emoticons.gold);
		if(K > 81)
			unsafeWindow.plurkEmoticons = unsafeWindow.plurkEmoticons.concat(unsafeWindow.Emoticons.platinum2);
		if(K > 99.99)
			unsafeWindow.plurkEmoticons = unsafeWindow.plurkEmoticons.concat(unsafeWindow.Emoticons.karma100);
		if(unsafeWindow.getRecruited() > 9)
			unsafeWindow.plurkEmoticons = unsafeWindow.plurkEmoticons.concat(unsafeWindow.Emoticons.platinum);
			
		console.log(unsafeWindow.plurkEmoticons);
		
		$('.plurkbox p:first').before('<div style="position:absolute;margin-left:170px"><a href="#" onclick="this.blur();$(\'#plurkyemoticons\').toggle();" style="color:#fff"><img width="45" height="20" src="/static/emoticons/select_emoticon_big.png" border="0"/></a></div>');
		$('.plurkbox .input').attr('id','plurkybox');
		$('.plurkbox').after('<div id="plurkyemoticons" style="display:none;border:1px solid #ccc;margin-top:8px;margin-left:180px;position:absolute;background-color:#fff;padding:4px;"/>');
		$.each(unsafeWindow.plurkEmoticons, function(){
			$('#plurkyemoticons').append('<a class="emoticon" href="#" style="padding-right:15px;" onclick="this.blur();insertAtCursor(\' ' + escape(this[2]) + '\')"><img src="/static/emoticons' + this[1] + '" border="0"/></a>');
		});
	}
	
	unsafeWindow.getProfileImage = function()
	{
		//http://avatars.plurk.com/[uid]-medium.gif
		return profileimage;
	}

	$('.plurkbox').after('<div id="plurkystuff"><p>Karma: <span class="karma"/> <span class="karmaChange"/></p></div>');
	unsafeWindow.setUser(unsafeWindow.getCurrentUser());
	unsafeWindow.addMeLink();
	unsafeWindow.getUserInfo(function(){unsafeWindow.displayKarma();unsafeWindow.displayKarmaChange();unsafeWindow.displayEmoticons();});

//Add other scripts

		$('.acc-num').remove();
		$('.plurk > a:first-child').addClass('user_link');
		$('.meta > a:first-child').addClass('rep_link');
		$('.rep_link').each(function(ri){

				$(this).attr('name',ri).parent().after('<div id="resp_'+ri+'" style="display:none;"><div id="rp'+ri+'" class="response_list" style="background-color:#FFFFCC;"></div><div id="dorp'+ri+'"   class="response_form"></div></div>');

				//response form		
				$('#dorp'+ri).html('<form/>').css({'background':'#CF682F','color':'#FFF','padding':'0.3em'}).children().addClass('re_plurk').attr('action',$(this).attr('href')).attr('name',ri).html($('.plurkbox p:eq(0)').html() +'<button>Plurk!</button>');
				$('#dorp'+ri+' > form').children('.input').css('width','60%');
				$('#dorp'+ri+' > form').children('br').remove();
		});

		$('form.re_plurk').submit(function () { 
				var strD ='';
				$(this).children().each(function(i){
					if ($(this).attr('name')==''){
						return false;
					}else{
						if (i>0)	strD = strD + '&' ;	
						strD = strD + $(this).attr('name') +'='+encodeURIComponent($(this).val());
					}
				});
				reply($(this).attr('action'),strD,$(this).attr('name'));
				return false;
		});

		/*  picture */
		if( ($('.plurk').length <= 15) && ($('.plurk a').length >= 1) ){

			if($('.current').attr('href') != '/m/?mode=my'){
				$('.plurk').each(function(ig){
						$(this).prepend('<img id="ig'+ig+'" src="http://statics.plurk.com/7f5c4282d2e9accfdae99cc6abb6c9bb.gif" border="0">');
				});

				$('.plurk > a.user_link').each(function (i) {
					var h = $(this).attr('href');  //  /m/u/xxxx    
					ppic(h,i);
				});
			};
		};

		/* show response */
		$('.rep_link').click(function(){
			var link = $(this).attr('href');
			var id = $(this).attr('name');
			replurk(link,id) ;	
			$(this).parent().css('font-weight','normal');
			$('#resp_'+id).toggle();
			return false ;
		});

		/* maar */
		if ($('.current').attr('href') =='/m/?mode=unread'){
			$('body').prepend('<div id="unread" style="display:none"></div>');
			$('.current').after(' - <a href="#" id="maar">(MAAR)</a>');
			$('.rep_link').each(function(i){
					if(i!=0) $('#unread').append(',');
					$('#unread').append(cover($(this).attr('href').substring(5)) );
			});
			$('#maar').click(function(){ 	maar(); });
		}

		/* alerts  */
		$('#top').append(' | <a href="http://www.plurk.com/Notifications" id="alert" target="plurk">Alerts(0)</a>');
		getCount();

		/*other*/
		$('.plurk a').not('.rep_link').attr('target','plurk');
		$('.pictureservices').each(function(pi){
				if($(this).attr('href').indexOf('flickr.com') <= 0){
					$(this).html('<img src="'+$(this).attr('href')+'" width="40" border="0">');
				};
		});
		/* ShowBox*/
		$('<div>').attr('id','box').css({'position':'absolute','background':'transparent url(http://statics.plurk.com/577ea8acd3e7ade25d3a23345f4d70d8.png) repeat scroll 0 0','top':'1px','left':'1px','padding':'10px','display':'none','border':'1px solid #ACD2EF','padding':'6px'}).appendTo('body');

		$('.pictureservices').click(function(){
			if($(this).attr('href').indexOf('flickr.com') <= 0){
				$('#box').html('<img style="cursor:pointer" src="'+$(this).attr('href')+'">');
			}else{
				$('#box').html('<img style="cursor:pointer" src="'+$(this).children('img').attr('src').replace(/_t/,'')+'">');
			};	
			ShowBox();			
			return false;
		});
	
		$('.youtube').click(function(){
			$('#box').html('<img src="http://www.plurk.com/static/greybox/w_close1.gif" style="padding: 3px; cursor: pointer;float:right"/><br/><embed src="'+$(this).attr('href').replace(/watch\?v=/,'v/')+'&hl=zh_TW&fs=1&autoplay=1" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="425" height="344"></embed>');
			ShowBox();
			return false;
		});

		/*jump to */
		$('a[href=/m/?mode=responded]').after(' | <input type="button" id="gotm" value="快找">');
		$('#gotm').click(function(){
			to = prompt("Input date YYYY/MM/DD  EX:  2009/01/01  ");
			if(!to) return;
			to = (new Date(to+' 23:59:59')).getTime();
			var from_date = to.toString(); 
			location.href='http://www.plurk.com/m/?offset=' + from_date.substr(0,10) ;
		});
		/*delete*/
		var mylink = location.href ;
		if (mylink.indexOf('mode=my',0) > 0 ){
			$('.rep_link').each(function(){
					var plurk_id =cover($(this).attr('href').substring(5));
					$(this).after(' | <a href="#" id="'+plurk_id+'" class="delt">del</a>');
			});
		}
		$('.delt').click(function(){
			if(confirm('您確定要刪除嗎？')){
				delP($(this).attr('id'));
			}
			return false;
		});
}
function  ppic(uid,i){
	uid = uid.substring(5);
	var id ="";
	$.ajax({
		   type: "GET", url: "http://www.plurk.com/"+uid ,
			success: function(cont) {
				var pic_link = cont.match(/http\:\/\/avatars.plurk.com\/[1-9][0-9]+\-big[0-9]*\.jpg/i) ;
				//show pic
				$('.plurk > a.user_link').eq(i).before('<a href="http://www.plurk.com/'+uid+'" target="plurk"><img class="user_pic" src="'+pic_link+'" width="20px" alt="plurker" onMouseOver="this.width=60" onMouseOut="this.width=20" align="absmiddle" border="0"></a>&nbsp;');
				$('.plurk > #ig'+i).remove();
			}
	});
}   

function replurk(strx,id){
	var rep_link = strx.substring(2);
	$.ajax({  type: "GET", url: "http://www.plurk.com"+strx });
	$.ajax({
		   type: "GET", url: "http://www.plurk.com"+rep_link ,
			beforeSend: function(){
				$('#rp'+id).html('<img src="http://statics.plurk.com/7f5c4282d2e9accfdae99cc6abb6c9bb.gif" border="0">');},
			 error :function(){ /*alert('error')*/},
			success: function(response) {
				var rep_page = response.split('\<ul class\=\"responses\"\>');
				var dd = rep_page[1].split('\<\/ul\>');
				var cont = dd[0];
				$('#rp'+id).css({'margin':'0','padding':'10px'}).html('<ul class="resp">'+cont+'</ul>');
				$('.resp').css({'list-style':'none','padding':'0px;','margin':'0px','font-size':'12px'});
				$('.resp li').css('min-height','34px');
				$('.resp li a').attr('target','plurk');
				$('.avatar img').css({'border':'0px','width':'30px'});
				$('.message').css({'margin':'-25px 0 0 34px','padding':'0px'});
				$('.message .time').css('float','right');
				$('.r_qualifier').css({'color':'#fff','font-weight':'normal','padding':'1px'});
				$('.plurk_content').css('font-weight','normal');
				$('.pictureservices').each(function(pi){
					if($(this).attr('href').indexOf('flickr.com') <= 0){
						$(this).html('<img src="'+$(this).attr('href')+'" width="40" border="0">');
					};
				});

				$('.rep_link[name='+id+']').text($('#rp'+id+' ul li').length +' response');  //  count response	
				if ($('#rp'+id+' ul li').length > 4)  $('#rp'+id).css({'overflow':'scroll','overflow-x':'hidden','height':'130px'});
			}
	});

}

function maar(strx){
	$.ajax({
		   type: "POST", url: "http://www.plurk.com/Responses/markAllRead" ,
		   data:'ids=['+$('#unread').text()+']',
			beforeSend: function(){
				$('#maar').html('<img src="http://statics.plurk.com/7f5c4282d2e9accfdae99cc6abb6c9bb.gif" border="0">');},
			 error :function(){ /*alert('error')*/},
			success: function(response) {
				$('#maar').html('(MAAR)');
				location.reload();
		}
	});
}

function cover(strx)
{
	var str = "123456789abcdefghijklmnopqrstuvwxyz";
	var sum = 0 ;
	var tmpW = '';
	var tmpIndex = 0;
	for(i=0 ; i< strx.length ;i++)
	{
		tmpW = strx.charAt(i) ;
		tmpIndex = str.indexOf(tmpW,0)+1;
		sum = sum + (tmpIndex * Math.pow(36,strx.length-i-1) )
	}
		return sum;
//	$('#unread').append(sum);
}

function reply_form(url,id){
	$('#dorp'+id).html('<form/>').css({'background':'#CF682F','color':'#FFF','padding':'0.3em'}).children().addClass('re_plurk').attr('action',url).attr('name',id).html($('.plurkbox p:eq(0)').html() +'<button>Plurk!</button>');
	$('#dorp'+id+' > form').children('.input').css('width','60%');
	$('#dorp'+id+' > form').children('br').remove();
}

function reply(url,qr,id){
	$.ajax({
		   type: "POST", url: "http://www.plurk.com"+url ,
		   data:qr,
			beforeSend: function(){},
			 error :function(){ alert('error')},
			success: function(response) {
				replurk(url,id) ;
			//	reply_form(url,id);
			$('input[name=content]').val('');
		}
	});
}

function getCount(){
	$.ajax({
		   type: "GET", url: "http://www.plurk.com/Notifications/getCount",
			beforeSend: function(){},
			 error :function(){ /*alert('error')*/},
			success: function(response) {
				$('#alert').html('Alerts(<b>'+response+'</b>)');
			}
	});
}

function delP(id){
	$.ajax({
		   type: "POST", url: "http://www.plurk.com/TimeLine/deletePlurk",
		   data: "plurk_id=" +id,
			beforeSend: function(){},
			 error :function(){alert('not delete !'); },
			success: function(response) {
				//alert(response);
				$('#'+id).parent('.meta').parent('.plurk').hide("slow");
			}
	});

}

function ShowBox(url){

			if(window.innerHeight){
	                windowHeight=window.innerHeight;
		    }else if(document.documentElement&&document.documentElement.clientHeight){
			        windowHeight=document.documentElement.clientHeight;
	        }else if(document.body){
		            windowHeight=document.body.clientHeight;
			}
			var boxTop = windowHeight/2 - $('#box').innerHeight()/2 + $(window).scrollTop(); ;
			var boxLeft =  $(window).width()/2 - $('#box').innerWidth()/2 + $(window).scrollLeft() ;
			$('#box').css({'top':boxTop,'left':boxLeft}).show();
			$('#box img').click(function(){
				 $('#box').hide();
			});	
}

