// ==UserScript==
// @name		kg_antifreeze
// @author		un4given (u.menya.vse@zzzae.biz)
// @version		1.3
// @description	prevents chat freeze 
// @include		http://klavogonki.ru/gamelist/*
// @include		http://www.klavogonki.ru/gamelist/*
// @include		http://klavogonki.ru/g/*
// @include		http://www.klavogonki.ru/g/*
// ==/UserScript==

//----

x = function (node)
{
	try {
		if( node.firstChild.nodeType == 3 )	// TEXT_NODE
			return node.textContent || node.text;
	} catch (e) {return;}

	var result = {};
	for(var i=0;i<node.childNodes.length;i++)
	{
		result[node.childNodes[i].tagName] = xml2array(node.childNodes[i]);
	}
	return result;
}

m=function (msg) 
{
	var _this = this;
	
    var to = msg.getAttribute('to');
    var from = msg.getAttribute('from');
    var elems = msg.getElementsByTagName('body');
    
    var room;
    
    
    if (elems.length > 0) {
		var body = elems[0];	
		
		var user_id, type;
		if(msg.getAttribute('type') == 'chat')
		{
			type = 'private';
			user_id = Strophe.getNodeFromJid(from);
			room = this.active_room;
		}
		else
		{
			type = 'normal';
			user_id = Strophe.getResourceFromJid(from);
			room = Strophe.getNodeFromJid(from);
		}

		var x = getElementByAttribute(msg, 'x', 'xmlns', 'klavogonki:userdata');
		if(x)
		{
			var data = xml2array(x);					
			if(data.user) {
				data.user = this.filterUserData(data.user);					
				this.user_data[user_id] = data;
			}
		}
		
		if((user_id.length>10) || (!this.user_data[user_id]))
			return true;		
		
		var time = new Date();
		
		var x;
		if( x = getElementByAttribute(msg, 'x', 'xmlns', 'jabber:x:delay') )
		{
			var m = x.getAttribute('stamp').match(/(\d{4})(\d{2})(\d{2})T(\d{2}):(\d{2}):(\d{2})/);
			time = new Date( Date.UTC(m[1],m[2],m[3],m[4],m[5],m[6]) );
		}
		
		this.addMsgInList({
			room: room,
			text: Strophe.getText(body), 
			user_id: user_id, 
			time: time, 
			type: type });
    }

    return true;
}


fu=function(user) {
	if (typeof user.login != 'string') user.login = '___';
    if (typeof user.avatar != 'string') user.avatar = '';
    if (typeof user.background != 'string') user.background = '';
	user.login = user.login.replace(/[^a-zA-Z0-9_\-а-яА-ЯёЁ ]*/g, '');
	user.login = user.login.substr(0,16);
	if(!/^http:\/\/img.klavogonki.ru\/avatars\/\d+\.gif$/.test(user.avatar))
		user.avatar = '';
	if(!/^\#[A-Fa-f\d]+$/.test(user.background))
		user.background = '';
	return user;
}

//inject script
var s = document.createElement('script');

s.innerHTML = 'setTimeout(function(){\
	xml2array='+x+';\
	chat.onMessage='+m+';\
	chat.filterUserData='+fu+';}, 0);';

document.body.appendChild(s);