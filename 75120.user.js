//
//
// ==UserScript==
// @name          Dirty Vote Viewer
// @namespace     http://dirty.ru/
// @description   Dirty Vote Viewer
// @include       http://*dirty.ru/
// @include       http://*dirty.ru/my/
// @include       http://*dirty.ru/pages/*
// @include       http://*dirty.ru/users/*
// @include       http://*dirty.ru/comments/*
// ==/UserScript==


function getVotes(id,el,type,mode){

	var div = document.getElementById("ds_show_div");
	if(!div){
		document.body.appendChild(div = document.createElement('div'));
		div.id = 'ds_show_div';
		div.style.position = 'absolute';
		div.style.top = '20px';
		div.style.left = '20px';
		div.style.zIndex = '1200';
		div.innerHTML = '<table cellspacing="0" cellpadding="0" width="100%" border="0"><tr><td height="14"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-000456-a580cb01c47764e60da94074a66172b1.png);background-repeat:no-repeat;background-position:10px top"></td><td></td></tr><tr><td width="11" height="11" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-015624-5ede1534598f53f8e1a892b54c37bb47.png)"></td><td style="background-color:#d9d9d9"></td><td width="11" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-015624-5ede1534598f53f8e1a892b54c37bb47.png);background-position:right top"></td></tr><tr><td style="background-color:#d9d9d9"></td><td style="background-color:#d9d9d9;font-size:10px" id="dk_data_td"><center><div style="width:150px;height:60px;background-repeat:no-repeat;background-position:center;background-image:url(http://pit.dirty.ru/dirty/1/2010/04/23/11119-023914-a435e3f34c6e355b6bef6594195f3bd7.gif)">&nbsp;</div></center></td><td style="background-color:#d9d9d9"></td></tr><tr><td height="11" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-015624-5ede1534598f53f8e1a892b54c37bb47.png);background-position:left bottom"></td><td style="background-color:#d9d9d9"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-015624-5ede1534598f53f8e1a892b54c37bb47.png);background-position:right bottom"></td></tr></table>';

		document.addEventListener('click',function(e){div.style.display="none"},true);
	}
	var pos = getPos(el);
	var addit_pos_y = 15;
	var addit_pos_x = (mode=='comment')?-10:-7;

	document.getElementById("dk_data_td").innerHTML = '<center><div style="width:150px;height:60px;background-repeat:no-repeat;background-position:center;background-image:url(http://pit.dirty.ru/dirty/1/2010/04/23/11119-023914-a435e3f34c6e355b6bef6594195f3bd7.gif)">&nbsp;</div></center>';
	div.style.display = "block";
	div.style.top = (pos.y+el.offsetHeight+addit_pos_y)+'px';
	div.style.left = (pos.x+addit_pos_x)+'px';


	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", window.location.protocol+'//'+window.location.host+'/'+((mode=='user')?'karmactl':'votesctl'),true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.setRequestHeader('Referer', window.location.href);
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200) {
				showRes(eval('res = '+xmlhttp.responseText),el,mode);
			}
		}
	};
	var addenum = '';
	if(type==0){
		var eln = document.getElementById('navigation');
		if(eln){
			var elp = eln.getElementsByClassName('post');
			if (elp && elp.length && elp[0].id){
				addenum += '&post_id='+elp[0].id.substr(1); 				
			}
		}
	}
	xmlhttp.send(((mode=='user')?'view=':'type='+type+'&id=')+id+addenum);
}

function showRes(res,el,mode){

	var div = document.getElementById("dk_data_td");

	var buff = [];
	buff.push('<div style="margin-top:-2px;width:320px;'+((res.votes.length>20)?'overflow:auto;height:300px;':((res.votes.length>20&&mode=='user')?'overflow:auto;height:300px;':''))+'padding:4px"><div style="height:16px;padding-left:10px">'+((res.votes.length>20&&mode=='user')?'<b>Последние 20 оценок:</b></div>':''));

	var plus = '';
	var minus = '';
	var last = '';
	var plus_count = 0;
	var minus_count = 0;
	var plus_votes = 0;
	var minus_votes = 0;

	for(var i=res.votes.length-1; i>=0; i--){
		var e = res.votes[i];
		var temp = '';
		var last_temp = '';

		temp = '<span style="color:'+((e.attitude>0)?'green':'red')+'">'+e.attitude+'</span> <a style="color:'+((e.attitude>0)?'green':'red')+'" href="http://www.dirty.ru/users/'+e.uid+'">'+e.login+'</a><br />';

		if(res.votes.length>20&&mode=='user'){
			if(i>=res.votes.length-20){
				last_temp = '<a style="line-height:16px;color:'+((e.attitude>0)?'green':'red')+'" href="http://www.dirty.ru/users/'+e.uid+'">'+e.login+'</a>&nbsp;<span style="color:#555">('+e.attitude+')</span>';
			}

			if(i>res.votes.length-20) last += last_temp+', ';
			else if(i==res.votes.length-20) last += last_temp;
		}

		if(e.attitude>0){
			plus+=temp;

			if(mode=='user'){
				plus_votes++;
				plus_count = plus_count+parseInt(e.attitude);
			}
		}
		else{
			minus+=temp;

			if(mode=='user'){
				minus_votes++;
				minus_count = minus_count+parseInt(e.attitude);
			}
		}

	}

	if(mode=='user'){
		text = 'Возможно вам будет интересно узнать, что было поставлено ';
		if(plus_votes>0) text += plus_votes+' положительных оценок, которые увеличили карму на <span style="color:green">'+plus_count+'</span>';
		if(plus_votes>0&&minus_votes>0) text += ' и ';
		if(minus_votes>0) text += minus_votes+' отрицательных оценок, которые уменьшили карму на <span style="color:red">'+(-1*minus_count)+'</span>';
		text += '.';
	}

	buff.push(((res.votes.length>0)?((res.votes.length>20&&mode=='user')?'<div style="padding:15px;background:#ecebeb;border:1px solid #c8c7c7;width:271px">'+last+'</div><div style="height:16px;margin-top:10px;padding-left:10px">':'')+'<b>Все оценки ('+res.voters+'):</b></div><table cellspacing="0" cellpadding="5" border="0"><tr><td valign="top" width="136" style="line-height:16px;padding:12px 15px 10px 15px;background:#ecebeb;border:1px solid #c8c7c7">'+minus+'</td><td width="5" style="padding:0">&nbsp;</td><td width="136" valign="top" style="line-height:16px;padding:12px 15px 10px 15px;background:#ecebeb;border:1px solid #c8c7c7">'+plus+'</td></tr></table>':'</div><center><b>Нет оценок</b></center>')+((res.votes.length>20&&mode=='user')?'<div style="margin-top:5px;padding:15px;text-indent:10px;background:#ecebeb;border:1px solid #c8c7c7;width:271px;text-align:justify">'+text+'</div>':'')+'</div>');
	div.innerHTML = buff.join('');

}

function getPos(el) {
	var rv = {x:0,y:0}
	while (el) {
		rv.x += el.offsetLeft;
		rv.y += el.offsetTop;
		el = el.offsetParent;
	}
	return rv;
	
}

var allHTMLTags=document.getElementsByTagName('em');
for(var i=0;i<allHTMLTags.length;i++){
	if(allHTMLTags[i].parentNode.className=='rating'){
	
		allHTMLTags[i].style.cursor = 'pointer';

		if(allHTMLTags[i].parentNode.parentNode.parentNode.getAttribute('uid')!==null){

			allHTMLTags[i].addEventListener('click',function(e){getVotes(e.target.parentNode.parentNode.parentNode.getAttribute('uid'),e.target,0,'user')},false);
		}
		else if(allHTMLTags[i].parentNode.parentNode.parentNode.parentNode.parentNode.id!==null){

			allHTMLTags[i].addEventListener('click',function(e){var id = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;var type = 0;var mode='comment';if(id.charAt(0)=='p'){id = id.substr(1);type = 1;mode = 'post'};getVotes(id,e.target,type,mode)},false);
		}
	}
}