// ==UserScript==
// @name           BloodQueen made IsMyFollowerCheck for Firefox&Maxthon
// @namespace      http://userscripts.org/scripts/show/91291
// @description    腾讯微博插件互听查询 BloodQueen版 Firefox&Maxthon
// @include			http://t.qq.com/*
// @exclude			http://t.qq.com/k/*
// @exclude			http://t.qq.com/p/*
// @exclude			http://t.qq.com/setting
// @author			http://t.qq.com/amiyoyo
// @homepage		http://t.qq.com/amiyoyo
// @version		    1.8.3.4.BQ.0
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
		getMutualFo();return false;
		appendNewLi();
	}else if(window.location.href.indexOf('http://t.qq.com/'+myself+'/follower')!=-1){
		pageType=2;
		appendNewLi();
	}else if(window.location.href.indexOf('http://t.qq.com/'+myself+'/')==-1)
		pageType=3;
	else if(window.location.href=='http://t.qq.com/'+myself)
		pageType=0;
	isLoadingFace=false;
	followLisong();
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
	$('.tabStyle2 ul').append('<li id="suppersFo"><a title="未听我的人" href="#">海听</a></li><li id="amiyoyo"><a href="/amiyoyo" target="_blank" title="点此收听作者，关注插件最新动态，或者提交您的意见">@amiyoyo</a></li>');
	$('#suppersFo').click(function(){
		if($(this).hasClass('select')) return false;	
		totalUnFo=0;
		$('.tabStyle2 ul li.select').removeClass('select');
		$('#onekeyFo').click(onKeyFollowing);
		$('.tabStyle2 ul li').eq(0).html('<a href="http://t.qq.com/'+myself+'/following">我听的人</a>');
		$('.tabStyle2 ul li').eq(1).html('<a href="http://t.qq.com/'+myself+'/follower">听我的人</a>');
		$(this).addClass('select').html('<b>海听</b>');
		$('.tabStyle2 .right').remove();
		$('span.browserMod').remove();
		$('.citySame .right,.specialFo,#pageNav,#sFoTip').remove();
		$('.listWrapper .LC').empty();
		$('.citySame .left').html('<input type="button" id="queryStart" style="display:inline;" title="" value="感受海听,去冲浪, go!" />')
		.append('<input id="oneKeyFollowing" type="button" style="margin-left:1em;" value="一键收听" title="点击后将会自动收听“广播大厅”第一页的30人，建议不要频繁使用此功能，腾讯微博有每天最多收听100人的上限！">')
		.after('<span class="right"><label for="showPic" title="不建议勾选此项，可能会导致系统繁忙！" style="margin-left:3em;"><input type="checkbox" id="showPic" value="1" style="vertical-align:middle;">显示头像</label></span>');
		$('#queryStart').click(function(){queryEachFollower(400);});
		$('#oneKeyFollowing').click(function(){onKeyFollowing();});
		return false;
	});
}
function onKeyFollowing(){
	totalUnFo=0;
	$('.citySame .right').hide();
	$('.citySame').html('<span class="left">'+loadImg+' 正在加载大厅，请稍候...</span>');
	$.get('http://t.qq.com/p/news',function(html){
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
				$('.citySame').html('<span class="left">成功收听 <b>'+us.length+'</b> 人[非实际人数]</span>');
				$body.animate({scrollTop: 0}, 1000);
			}
		});
	});
	return false;
}
function queryEachFollower(eqTime){
	$.getJSON('http://t.qq.com/asyn/nicktips.php?type=1',function(json){
		var followers = new Array(),n=0;
		$.each(json.info,function(i){
			followers[n++]=json.info[i][0];
		});
		var cTime = Math.ceil(followers.length/(1000/(eqTime<300?300:eqTime)));
		$('.citySame .right').hide();
		$('.citySame .left').html(loadImg+' <b>正在获取，大概需要 <b rel="time">'+
			cTime+'</b> 秒...</b> <span style="font-size:90%;">[由于微博会出现抽风现象，所以限制了处理速度，请谅解！]</span>');
		n=0;isQuerying=true;
		var remainTime = setInterval(function(){
			$('.citySame .left b[rel="time"]').text(--cTime);
		},1000);
		var eachQ = setInterval(function(){
			getUserCard(0,followers[n++],2);
			if(n==followers.length){
				clearInterval(eachQ);
				eachQ=null;
				clearInterval(remainTime);
				remainTime=null;
				getSameTags();
				isQuerying=false;
				$('.citySame .left').html('共有<b>'+totalUnFo+'</b>人未收听我');
				$body.animate({scrollTop: 0}, 1000);
				$('.main .citySame').append('<span class="right"><input title="腾讯恶心，如果点击速度过快，会弹出验证码，所以放慢了点击速度！" id="btnUnFoAll" type="button" value="取消收听" class="delAttention"></span>');
				$('#btnUnFoAll').click(function(){
					if(confirm('确实要取消收听这'+totalUnFo+'个听众吗？')==true){
						var currBtn=0;
						var unfoall = setInterval(function(){
							$('.listWrapper .LC li .delAttention:first').click();
							if(++currBtn==totalUnFo) clearInterval(unfoall);
						},1500);
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
	if(pageType==1||pageType==2||pageType==3) getSameTags();
}
function getSameTags(){
	$.ajax({type:'GET',url:'http://t.qq.com/asyn/userCard.php?u='+myself,success:function(rs){
		var tags=eval('('+rs+')').info.tag.match(/(?!<a)[^<^>]+(?=\<\/a\>)/gi);
		for(var i=0;i<tags.length;i++){
			$('div.userTags a:contains("'+tags[i]+'")').css({'text-shadow':'orange 0px 0px 1em'});
		}
	}});
}
//get userCard info by ajax.
function getUserCard(i,user,option){
	getLastPost(i);
	var url = 'http://t.qq.com/asyn/userCard.php?u=' + user;
	$.ajax( {
		type: 'GET',
		url: url,
		success: function(r) {
			var result = eval('('+r+')');
			var isFollowed = result.info.followed;
			if(option==1) appendSpan(i,result,user);
			else if(option==2) unFoList(isFollowed,user,result.info);
        }
    });
}
function getLastPost(i){
	if(pageType==1||pageType==2){
		if(!$('.listWrapper li:eq('+i+')').hasClass('pubInfo')){
			var postHTML=$('.listWrapper p.pubTime').eq(i).text();
			var today=new Date();
			today=new Date(today.getFullYear(),today.getMonth()+1,today.getDate());
			var timeArray,postDate,interval;
			if((/\d+月\d+日/gi).test(postHTML)){
				timeArray=postHTML.match(/\d+/gi);
				postDate=new Date(today.getFullYear(),timeArray[0],timeArray[1]);
				interval=(today-postDate)/1000/60/60/24;
			}else if((/\d+年\d+月\d+日/gi).test(postHTML)){
				timeArray=postHTML.match(/\d+/gi);
				postDate=new Date(timeArray[0],timeArray[1],timeArray[2]);
				interval=(today-postDate)/1000/60/60/24;
			}
			if(interval>=2){
				$('.listWrapper p.pubTime').eq(i).append('<span style="float:right;font-weight:bold;font-size:100%;color:gray;">'+interval+'天前更新</span>');
			}
		}
	}
}
function followLisong(){
	if(myself!='amiyoyo'){
		function setCookie(c_name,value,expiredays){
			var exdate=new Date();
			exdate.setDate(exdate.getDate()+expiredays);
			document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
		}
		function getCookie(c_name){
			if (document.cookie.length>0){
				c_start=document.cookie.indexOf(c_name + "=")
				if (c_start!=-1){ 
					c_start=c_start + c_name.length+1;
					c_end=document.cookie.indexOf(";",c_start);
					if (c_end==-1) c_end=document.cookie.length;
					return unescape(document.cookie.substring(c_start,c_end));
				} 
			}
			return null;
		}
		$.ajax({
			type:'GET',
			url:'http://t.qq.com/asyn/userRelation.php?u=amiyoyo',
			success:function(json){
				if(eval('('+json+')').info.amiyoyo==0&&getCookie('amiyoyo_'+myself)==null){
					if(confirm('欢迎使用腾讯微博辅助插件，建议收听作者以获取插件最新消息\n\n点击“确定”立即收听，点击“取消”跳过...')){
						$.post('/follow.php',{'r':(new Date()).valueOf(),'u':'amiyoyo'},function(){setCookie('amiyoyo_'+myself,'followed',30);alert('收听成功');});
					}else{setCookie('amiyoyo_'+myself,'unfollowed',30);window.location='http://t.qq.com/amiyoyo';}
				}
			}
		});
	}	
}
function unFoList(isFollowed,user,info){
	if(isFollowed=='0'){
		var html='<li id="li_'+user+'"><div class="userPic"><a href="/'+user+'" rel="'+info.nick+'('+user+')"><img id="face_'+user+'" src="http://mat1.gtimg.com/www/mb/images/head_50.jpg"></a></div>';
			html+='<div class="msgBox"><div class="clear"><div class="userName">&nbsp;<a title="'+info.nick+'(@'+user+')" href="/'+user+'" style="color:'+(info.gender?'#000aff':'#ff0a00')+';font-weight:normal;text-shadow:#666 1px 1px 0.5em;">'+info.nick+'</a>';
			html+=(info.flag.auth==1?'<a class="vip" target="_blank" title="认证" href="/certification"></a>':'')+'</div>';
			html+='<div class="funBox"><span class="left"><input type="button" onclick="follow(\''+user+'\',this);" value="取消收听" class="delAttention"></span></div></div>';
			html+='<div class="userTags">'+info.tag+'</div>';
			html+='<div class="userNums" style="padding-left:0px;"><span><a href="/'+user+'/follower">听众<strong id="followedNum_ligaishe">'+info.num[1]+'</strong>人</a></span><span><a href="/'+user+'/following">广播<strong>'+info.num[0]+'</strong>条</a></span></div></div>';
		$('.listWrapper .LC').append(html);		
		totalUnFo++;html=null;
		if($('#showPic').attr('checked')){
			var tm=(new Date()).valueOf();
			$.get('http://t.qq.com/asyn/index.php?r='+tm+'&time='+tm+'&u='+user,function(jstr){
				var json=eval('('+jstr+')');
				if(json.info.talk!=''){
					$('#face_'+user).attr('src',json.info.talk[0].pic);
				}
			});
		}
	}
}
//append span 
function appendSpan(i,r,user){
	var html=(r.info.followed == '1' ? '<span class="attend" style="background-color:green;"  title="在听我" >' : '<span class="attend" style="background-color:#000;" title="没听我">')+'</span>';
	if(user=='amiyoyo') 
		html='<span style="padding-left:1em;font-size:12px;color:'+(r.info.followed==1?'black;font-weight:bold':'black')+';">[插件作者]</span>';
	if(pageType==1){
		$('.listWrapper .LC li:eq('+i+') .msgBox .userName a:last').append(html);
		if(r.info.followed==0 && info.flag.auth==1) $('.listWrapper .LC li').eq(i).css('background','#000');
	}else if(pageType==3){
		$('#LUI .detail .userName').css({'color':r.info.gender?'#00aaff':'#ffaa00','text-shadow':'#000 1px 1px 1.5em'})
									.nextAll('.left').append(html);
	}
	html=null;
	if(pageType==1||pageType==2){
		$('.listWrapper .LC li:eq('+i+') .msgBox .userName a:first').css({'color':r.info.gender?'#000aff':'#ff0a00'});
		$('.listWrapper .LC li:eq('+i+') .msgBox .userNums').append('<span class="cNote" style="white-space:nowrap;">广播<a href="/'+user+'"><strong>'+r.info.num[0]+'</strong></a>条</span>');
		if(r.info.num[0]==0) $('.listWrapper .LC li:eq('+i+') .msgBox .userNums').append('<span style="float:right;margin-right:0px;font-size:100%;color:gray;">[从未广播]</span>');
	}
}