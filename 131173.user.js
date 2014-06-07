// ==UserScript==
// @name           klavogonki: Minor chat improvements
// @version        0.03
// @namespace      klavogonki
// @author         Silly_Sergio
// @description    1. Make chat text same colour as its sender. 2. Make chat text bold, if it contains logged in user name. 3. Removed dirty language filter.
// @include        http://klavogonki.ru/g/*
// @include        http://klavogonki.ru/gamelist/
// @grant          none
// @updateURL      http://userscripts.org/scripts/source/131173.meta.js
// @downloadURL    http://userscripts.org/scripts/source/131173.user.js
// ==/UserScript==
function embed() {

function addZero(i)
{
if (i < 10) 
  {
      i = "0" + i;
  }
return i;
}

Chat.prototype.addMsgInList = function(args)
{
	if(args.user_id.length > 7)
		return;
	
	var user = this.user_data[args.user_id].user;
	
    var time = args.time.getHours() + ':' + addZero(args.time.getMinutes()) + ':' + addZero(args.time.getSeconds());
	
	var room_html = '';
	if(args.type == 'game')
		room_html = '<span class=room>[заезд]</span>';
	if(args.type == 'private')
	{
		if(args.to)
			room_html = '<a href="javascript:chat.insertPrivate('+args.to_id+');" class="room private">[шепчет '+args.to+']</a>';
		else
			room_html = '<a href="javascript:chat.insertPrivate('+args.user_id+');" class="room private">[шепчет вам]</a>';
	}
	
	var cont_outer = $('chat-'+args.room).select('.messages > div').last();
	var cont = $('chat-'+args.room).select('.messages > div > div').last(); 
	
	var needScroll = (cont_outer.scrollTop+cont_outer.getHeight()) >= cont_outer.scrollHeight;
	
	args.text = args.text.replace(/</g, '&lt;');
	args.text = args.text.replace(/>/g, '&gt;');
	
	// game link parse
	args.text = args.text.replace(/http:\/\/(?:www\.)?klavogonki\.ru\/g\/\?gmid=(\d+)\&?/g, '[<a class="gamelink-not-resolved gamelink-$1" href="/g/?gmid=$1">Заезд #$1</a>]');
	args.text = args.text.replace(/http:\/\/([^ ]*)/g, '<a target=_blank href="http://$1">http://$1</a>');
	
	// длинные строки
	while(/([^\/ ­]{40,})([^\/ ­]{40,})/.test(args.text))
	{
		args.text = args.text.replace(/([^\/ ­]{40,})([^\/ ­]{40,})/, '$1­$2');
	}
	args.text = args.text.replace(/­/, '<wbr/>');
	
	// смайлы
	var smilies = {
		smile: /(:-\)|:\)|:smile:)/g,
		biggrin: /(:-D|:D|:biggrin:)/g,
		angry: /(>:\(|:angry:)/g,
		blink: /(oO|Oo|o_O|O_o|оО|Оо|о_О|О_о|:blink:)/g,
		blush: /:blush:/g,
		cool: /(8\)|:cool:)/g,
		dry: /:dry:/g,
		excl: /:excl:/g,
		happy: /(\^\^|\^_\^|:happy:)/g,
		huh: /:huh:/g,
		laugh: /:laugh:/g,
		mellow: /:mellow:/g,
		ohmy: /:ohmy:/g,
		ph34r: /:ph34r:/g,
		rolleyes: /:rolleyes:/g,
		sad: /(:\(|:-\(|:sad:)/g,
		sleep: /:sleep:/g,
		tongue: /(:P|:-P|:Р|:-Р|:tongue:)/g,
		unsure: /:unsure:/g,
		wacko: /(\%\)|:wacko:)/g,
		wink: /(;\)|;-\)|:wink:)/g,
		wub: /:wub:/g,
		first: /:first:/g,
		second: /:second:/g,
		third: /:third:/g,
		power: /:power:/g,
		badcomp: /:badcomp:/g,
		complaugh: /:complaugh:/g,
		girlnotebook: /:girlnotebook:/g,
		crazy: /:crazy:/g,
		boredom: /:boredom:/g,
		cry: /:cry:/g,
		bye: /:bye:/g,
		dance: /:dance:/g,
		gamer: /:gamer:/g,
		rofl: /:rofl:/g,
		beer: /:beer:/g,
		kidtruck: /:kidtruck:/g,
		angry2: /:angry2:/g,
		spiteful: /:spiteful:/g,
		sorry: /:sorry:/g,
		boykiss: /:boykiss:/g,
		girlkiss: /(:girlkiss:|:\*|:-\*)/g,
		kissed: /:kissed:/g,
		yes: /:yes:/g,		
		no: /:no:/g,
		hi: /:hi:/g,
		ok: /:ok:/g		
	};

	for(var name in smilies)
	{			
		args.text = args.text.replace(smilies[name], '<img class=smile src="/img/smilies/'+name+'.gif" alt=":'+name+':" title=":'+name+':">');
	}
	
	args.text = args.text.replace(/script/g, 'sсript');
	
    if (__user__ !== undefined && chat !== undefined && chat.user_data !== undefined && chat.user_data[__user__] !== undefined && chat.user_data[__user__].user !== undefined && chat.user_data[__user__].user.login !== undefined) {
            var loggedInUserLogin = chat.user_data[__user__].user.login;

            if (args.text.indexOf(loggedInUserLogin) >= 0) {
                args.text = '<b>' + args.text + '</b>';
            }
    }	
	
	if(args.type == 'system')
		cont.insert('<p><span class=time>['+time+']</span><span class=system-message>Пользователь '+user.login+' '+args.text+'</span></p>');
	else if(args.type == 'private')
		cont.insert('<p style="color:' + user.background + '"><span class=time>[' + time + ']</span><span class=username>&lt;<span onclick="chat.insertPrefix(' + args.user_id + ');">' + user.login + '</span>&gt;</span>' + room_html + '<span class=private>' + args.text + '</span></p>');
	else
		cont.insert('<p style="color:' + user.background + '"><span class=time>[' + time + ']</span><span class=username>&lt;<span onclick="chat.insertPrefix(' + args.user_id + ');">' + user.login + '</span>&gt;</span>' + room_html + args.text + '</p>');
	
	// ссылки на игры
	var links = cont.select('.gamelink-not-resolved');
	for(var i=0;i<links.length;i++)
	{
		var m = links[i].className.match(/gamelink-(\d+)/);
		var els = $$('.gamelink-not-resolved.gamelink-'+m[1]);
		for(var j=0;j<els.length;j++)
			els[j].removeClassName('gamelink-not-resolved');
		new Ajax.Request( '/ajax/fetchgameinfo', {
			method: 'get',
			parameters: {
				game: m[1] },
			onSuccess: function(transport)
			{
				eval('var json='+transport.responseText+';');
				var text = '';
				if(json.type == 'practice')
					return;
				if(json.type == 'private')
					text = 'Игра с друзьями ';
				if(json.type == 'normal')
					text = 'Открытая игра ';
				if(json.competition)
				{
					text = 'Соревнование '
					if(json.regular_competition)
						text += '(x'+json.regular_competition+') ';
				}
				text += json.gametype_html;
				var els = $$('.gamelink-'+json.game_id);
				for(var j=0;j<els.length;j++)
					els[j].update(text);
			}});
	}
	
	
	
	if(needScroll)
		cont_outer.scrollTop = cont_outer.scrollHeight;
	
	// мигаем уведомлением
	if( args.room != 'general' && 
		(this.active_room == 'general' || $('chat-wrapper').hasClassName('hidden')) && 
		this.blink_new_ingame == null)
		this.blink_new_ingame = setInterval(function()
		{
			$$('#chat-title .game.c span').last().toggleClassName('new');
		}, 500);
}    
}

var inject = document.createElement("script");

inject.setAttribute("type", "text/javascript");
inject.appendChild(document.createTextNode("(" + embed + ")()"));

document.body.appendChild(inject);
embed();