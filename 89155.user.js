// ==UserScript==
// @name           腾讯微博互听查询插件互听大队版for Firefox&Maxthon
// @namespace      http://userscripts.org/scripts/show/79813
// @description    腾讯微博互听查询插件互听大队版 Firefox&Maxthon
// @include			http://t.qq.com/*
// @exclude			http://t.qq.com/k/*
// @exclude			http://t.qq.com/p/*
// @exclude			http://t.qq.com/setting
// @author			http://t.qq.com/fmm152186321
// @homepage		http://www.imwls.com
// @version		    1.7.0.0
// ==/UserScript==

var GM_JQ = document.createElement('script'),
    head = document.getElementsByTagName('head');

GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
GM_JQ.type = 'text/javascript';

var $,myself,pageType,totalUnFo,isLoadingFace,$body,isQuerying,
	loadImg='<img src="http://mat1.gtimg.com/www/mb/images/loading.gif" style="border:none;width:16px;height:16px;vertical-align:middle;" />';
var sAllMyFollowers={},sAllMyFollowing={},myFollowerCount;
if (head && head.length && head[0].appendChild) {
    head[0].appendChild(GM_JQ);

    // wait for jQuery to load
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
        else { unsafeWindow.jQuery.noConflict();$ = unsafeWindow.jQuery; CommStart(); }
    }
    GM_wait();
}
function CommStart(){
	$body = document.compatMode == 'CSS1Compat' ? $('html') : $('body');
	$.ajaxSetup({global:true,cache:false}); // global disabled cache
	myself=$('.topMenu .userName a').attr('title').replace(/.+\(@(.+)\)/g,"$1");
	myFollowerCount=parseInt($('#followerNum').text());
	if(window.location.href.indexOf('http://t.qq.com/'+myself+'/following')!=-1){
		pageType=1;
		//getMutualFo();return false;
		appendNewLi();
	}else if(window.location.href.indexOf('http://t.qq.com/'+myself+'/follower')!=-1){
		pageType=2;
		appendNewLi();
	}else if(window.location.href.indexOf('http://t.qq.com/'+myself+'/')==-1)
		pageType=3;
	else if(window.location.href=='http://t.qq.com/'+myself)
		pageType=0;
	isLoadingFace=false;
	getUser();
}
function getMutualFo(){
	isQuerying=true;
	$.getJSON('http://t.qq.com/asyn/nicktips.php?user='+myself+'&type=1&num=2000',function(json){
		var tAllMyFollowing=json.info;
		for(var i=0;i<tAllMyFollowing.length;i++){
			sAllMyFollowing[tAllMyFollowing[i][0]]=tAllMyFollowing[i][1];
		}
	});	
	var pages=Math.ceil(myFollowerCount/60);
	function getfos(current){
		current=current==undefined?1:current;
		$('.citySame').html('正在加载您的第'+ current +'页听众'+(current%2==0?'...':'......'));
		$.get('/follower.php?u='+myself+'&t=1&p='+current,function(html){
			utext=html.match(/\(@([^\)]+)\)\">[^<]+/g);
			for(var e in utext){
				ea=utext[e].replace(/\(|\)|@|>/g,'').split('"');
				if(ea[0]!=myself)sAllMyFollowers[ea[0]]=ea[1];
			}
			if(current<pages) setTimeout(function(){getfos(current+1)},500);
			else{
				$('.citySame').html('请稍候...');
				for(var following in sAllMyFollowing){
					if(sAllMyFollowers[following]==undefined){
						$('.listWrapper .LC').append('<li><a style="margin-left:8px;" href="/'+following+'" ree="'+following+'" target="_blank"><b>'+sAllMyFollowing[following]+'</b></a><span class="right"><input type="button" onclick="follow(\''+following+'\',this);" value="取消收听" class="delAttention"></span></li>');
					}
				}
				$('.listWrapper .LC li:last').addClass('pageLine');
				for(var followed in sAllMyFollowers){
					if(sAllMyFollowing[followed]==undefined){
						$('.listWrapper .LC').append('<li style="background:#F5F5F5;"><a style="margin-left:8px;" href="/'+followed+'" ree="'+followed+'" target="_blank"><b>'+sAllMyFollowers[followed]+'</b></a><span class="right"><input type="button" onclick="follow(\''+followed+'\',this);" value="收听" class="addAttention"></span></li>');
					}
				}
				$('.listWrapper .LC li span').css('margin-right','8px');
				$('.citySame').html('查询完成！');isQuerying=false;
			}
		});	
	};getfos();
};
function appendNewLi(){
	$('.tabStyle2 ul').append('<li id="suppersFo"><a title="未收听我的人" href="#">未收听我的听众</a></li><li id="onekeyFo"><a title="适合急需增加听众数使用" href="#">互听大队</a></li><li id="fmm152186321"><a href="/fmm152186321" target="_blank" title="点此收听作者，关注插件最新动态，或者提交您的意见">@付苗苗</a></li>');
	$('#suppersFo').click(function(){
		if($(this).hasClass('select')) return false;	
		totalUnFo=0;	
		$('.tabStyle2 ul .select').removeClass('select');
		$('.tabStyle2 ul li').eq(0).html('<a href="http://t.qq.com/'+myself+'/following">我收听的人</a>');
		$('.tabStyle2 ul li').eq(1).html('<a href="http://t.qq.com/'+myself+'/follower">我的听众</a>');
		$('#onekeyFo').html('<a title="" href="#">一键收听</a>');
		$(this).addClass('select').html('未收听我的听众');
		$('.citySame .right,.specialFo,#pageNav,#sFoTip').remove();
		$('.listWrapper .LC').empty();
		$('.citySame .left').css('padding-top','3px').html('<span id="queryStart" style="color:red;font-weight:bold;cursor:pointer;">点此查询</span>').after('<span class="right">查询速度：<input type="text" value="500" id="eqTime" autocomplete="off" style="width:25px;" class="inputTxt">[单位：毫秒，1000毫秒=1秒，数值越大查询越慢，但是不可小于300]</span>');
		// if(myFollowerCount>100 && confirm('您收听的人数大于100，是否立即使用极速版以加快查询速度？')){
			// getMutualFo();
		// }else{
			// $('#queryStart').click(function(){
				// var eqTime=$('#eqTime').val();
				// queryEachFollower((eqTime=='' || isNaN(eqTime)) ? 500 : parseInt(eqTime));
			// });
		// }
		$('#queryStart').click(function(){
			var eqTime=$('#eqTime').val();
			queryEachFollower((eqTime=='' || isNaN(eqTime)) ? 500 : parseInt(eqTime));
		});
		return false;
	});
	$('#onekeyFo').click(function(){
		if(isQuerying)return false;
		if($(this).hasClass('select')) return false;	
		totalUnFo=0;
		$(this).attr('disabled','disabled');
		$('.tabStyle2 ul .select').removeClass('select');
		$('.tabStyle2 ul li').eq(0).html('<a href="http://t.qq.com/'+myself+'/following">我收听的人</a>');
		$('.tabStyle2 ul li').eq(1).html('<a href="http://t.qq.com/'+myself+'/follower">收听我的人</a>');
		$('#suppersFo').html('<a title="未收听我的人" href="#">未收听我的听众</a>');
		$(this).addClass('select').html('互听大队');		
		$('.citySame .right,.specialFo,#pageNav,#sFoTip').remove();
		$('.listWrapper .LC').empty();
		$('.citySame').html('<span class="left"></span><span class="right"></span>');
		$('.citySame .left').css('padding-top','3px').html('<span id="foStart" style="color:red;font-weight:bold;cursor:pointer;">点此收听</span>').after('<span class="right">点击后将会自动收听“互听大队”第一页的人，建议不要频繁使用此功能！</span>');
		$('#foStart').click(function(){
			$('.citySame').html('<span class="left">'+loadImg+' 正在加载互听大队，请稍候...</span>');
			$.get('http://t.qq.com/k/%E4%BA%92%E5%90%AC%E5%A4%A7%E9%98%9F',function(html){
				var uPr=/<div *class=\"userName\" *rel=\"\w*/gi;
				var us=html.match(uPr);
				for(var i=0;i<us.length;i++){
					us[i]=us[i].replace(/<div *class=\"userName\" *rel=\"/g,'');
				}
				$('.citySame').html('<span class="left">'+loadImg+' 正在处理，请稍候...</span>');
				$.post('/follow.php',{'r':(new Date()).valueOf(),'u':us.toString()},function(msg){
					msg=eval('('+msg+')');
					if(msg.msg=='成功'){
						for(var i=0;i<us.length;i++)
							getUserCard(0,us[i],2);
						$('.citySame').html('<span class="left">成功收听 <b>'+us.length+'</b> 人</span>');
					}
				});
			});
		});
		return false;
	});
}
function queryEachFollower(eqTime){	
	$.getJSON('http://t.qq.com/asyn/nicktips.php?user='+myself+'&type=1&num=2000',function(json){
		var followers = new Array(),n=0;
		$.each(json.info,function(i){
			followers[n++]=json.info[i][0];
		});
		var cTime = Math.ceil(followers.length/(1000/(eqTime<300?300:eqTime)));
		$('.citySame .right').remove();
		$('.citySame .left').html(loadImg+' <b>正在获取，大概需要 <b rel="time">'+
			cTime+'</b> 秒...</b> <span style="font-size:90%;">[由于微博会出现假死现象，故限制了速度！请稍候。。。]</span>');
		n=0;isQuerying=true;
		var remainTime = setInterval(function(){
			$('.citySame .left b[rel="time"]').text(--cTime);
		},1000);
		var eachQ = setInterval(function(){
			getUserCard(0,followers[n++],2);
			if(n==followers.length){
				clearInterval(eachQ);
				clearInterval(remainTime);
				isQuerying=false;
				$('#onekeyFo').removeAttr('disabled');
				$('.citySame .left').html('共有<b>'+totalUnFo+'</b>人未收听我');
				$('.main .citySame').append('<span class="right"><input title="一键取消所收听所有人，慎用！" id="btnUnFoAll" type="button" value="取消收听" class="delAttention"></span>');
				$('#btnUnFoAll').click(function(){
					if(confirm('确实要取消收听这'+totalUnFo+'个听众吗？')==true){
						var currBtn=0;
						var unfoall = setInterval(function(){
							$('.listWrapper .LC li .delAttention:first').click();
							if(++currBtn==totalUnFo) clearInterval(unfoall);
						},eqTime<300?300:eqTime);
					}
				});
			}
		},eqTime<300?300:eqTime);
	});
}
//get user and position
function getUser(){
	var user;
	if($("#LUI").size()>0){
		user=$("#LUI ul li:first a").attr("title").replace(/.+\(@(.+)\)/g,"$1");
		getUserCard(0,user,1);
	}else if($('.listWrapper .LC').size()>0){
		$(".userPic a:last-child").each(function(i){
			user = $(this).attr('rel').replace(/.+\(@(.+)\)/g,"$1");
			getUserCard(i,user,1);
		});
	}
}

//get userCard info by ajax.
function getUserCard(i,user,option){
	var url = 'http://t.qq.com/asyn/userCard.php?u=' + user;
	$.ajax( {
		type: 'GET',
		url: url,
		success: function(r) {
			var result = eval('('+r+')');
			var isFollowed = result.info.followed;
			if(option==1) appendSpan(i,isFollowed,user);
			else if(option==2) unFoList(isFollowed,user,result.info);
        }
    });
}

function unFoList(isFollowed,user,info){
	if(isFollowed=='0'){
		var html='<li><div class="userPic"><a href="/'+user+'" rel="'+info.nick+'('+user+')"><img id="face_'+user+'" src="http://mat1.gtimg.com/www/mb/images/head_50.jpg"></a></div>';
			html+='<div class="msgBox"><div class="clear"><div class="userName"><strong><a title="'+info.nick+'(@'+user+')" href="/'+user+'">'+info.nick+'</a></strong></div>';
			html+='<div class="funBox"><span class="left"><input type="button" onclick="follow(\''+user+'\',this);" value="取消收听" class="delAttention"></span></div></div>';
			html+='<div class="userNums" style="padding-left:0px;"><span><a href="/'+user+'/follower">听众<strong id="followedNum_ligaishe">'+info.num[1]+'</strong>人</a></span><span><a href="/'+user+'/following">广播<strong>'+info.num[0]+'</strong>条</a></span></div></div>';
		$('.listWrapper .LC').append(html);
		totalUnFo++;
	}
}
//append span 
function appendSpan(i,isFollowed,user){
	var strFollowed =  isFollowed == '1' ? '是' : '否';
	var html='<span style="padding-left:1em;color:#999999;">已收听我:<strong style="font-size:12px;color:#2B4A78">'+strFollowed+'</strong></span>';
	if(pageType==1){
		$('.listWrapper .LC li:eq('+i+') .msgBox .userNums').append(html);
		if(isFollowed==0) $('.listWrapper .LC li').eq(i).css('background','#FFFF00');
	}else if(pageType==3 && $('#followTxt').css('display') != 'none'){
		$('#followTxt').append(html);
	}else if(pageType==3 && $('.funBox #followTxt').css('display') == 'none'){
		$('#LUI .funBox .left:visible').after(html);
	}
}