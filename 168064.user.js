// Ultibot's Trivia Master Solver
// Copyright (c) 2012, 2013, Ultimater at gmail dot com 
// You can reach me at the above email address if you have inquiries regarding this script
// Released under the GNU General Public License
// http://www.gnu.org/copyleft/gpl.html
// http://www.gnu.org/licenses/gpl.html
/*
	This script Adds the following six commands to your modern chat interface for KoL:
	/use who
	/use what
	/use when
	/use where
	/use trivia master
	/count trivia master
*/
// ==UserScript==
// @name	Ultibot's Trivia Master Solver
// @namespace	http://ultimater.net/kol/public/namespaces/triviamastersolver
// @description	Version 1.1 - uses the who, what, when, where cards back to back. Commands: /use who, /use what, /use when, /use where, /use trivia master, /count trivia master
// @version	1.1
// @author	"Ultibot"<Ultimater at gmail dot com>
// @license	GNU-GPL http://www.gnu.org/licenses/gpl.html
// @include	*kingdomofloathing.com/mchat.php
// @include	*kingdomofloathing.com/lchat.php
// ==/UserScript==


var _unsafeWindow=(typeof unsafeWindow!='undefined')?unsafeWindow:window;
var _isModernChat=/mchat.php/.test(_unsafeWindow.location.href);
var _isLoathingChat=/lchat.php/.test(_unsafeWindow.location.href);
var _pwdhash=_unsafeWindow.pwdhash;
var _Function=_unsafeWindow.Function;


// ModernChatExtender::addMessage			--	addMessage appends HTML to the GUI without bothering the server
// ModernChatExtender::submitNewMessage			--	submitNewMessage sends the message to the server via Ajax then displays the output
// ModernChatExtender::countItemThenCallMeWhenCounted	--	countItemThenCallMeWhenCounted uses Ajax to get the count for an item then sends the count to a callback funtion
function ModernChatExtender()
{
	this.pwdhash='';
}


ModernChatExtender.prototype.setPasswordHash=function(pwd)
{
	this.pwdhash=pwd;
}

ModernChatExtender.prototype.addMessage=new _Function('msg',"\
	var d = $$('.chatdisplay:visible');\
	d.append('<div class=\"msg\">'+msg+'</div>');\
	d[0].scrollTop = d[0].scrollHeight;\
	$inp = $('#graf');\
	$inp[0].focus();\
	cycle();\
");

ModernChatExtender.prototype.old_handleClientSide=_unsafeWindow.handleClientSide;


ModernChatExtender.prototype.submitNewMessage=new _Function('txt',"\
	var url = '/submitnewchat.php?playerid='+playerid+'&pwd='+this.pwdhash+'&graf='+URLEncode(txt)+'&j=1';\
	$$.get(url, function (resp) {\
		if (resp && resp.output) {\
		   	var d = $$('.chatdisplay:visible');\
			if (resp.channel && tabs['public-'+resp.channel]) {\
				d = tabs['public-'+resp.channel];\
			}\
		   	d.append('<div class=\"msg\">'+resp.output+'</div>');\
			d[0].scrollTop = d[0].scrollHeight;\
		}\
		if (resp && resp.msgs) {\
			for (var i=0; i<resp.msgs.length; i++) handleMessage(resp.msgs[i]);\
		}\
		var ev;\
		while (ev = jstest.exec(resp.output)) {\
			var cmd = ev[1];\
			if (cmd.indexOf('dojax') == -1) cmd += ';setTimeout(nextAction,3000)';\
			todo.push(cmd);\
		}\
		nextAction();\
		$inp[0].focus();\
		cycle();\
	},'json');\
");

ModernChatExtender.prototype.countItemThenCallMeWhenCounted=new _Function('txt','callback',"\
	var url = '/submitnewchat.php?playerid='+playerid+'&pwd='+this.pwdhash+'&graf='+URLEncode(txt)+'&j=1';\
	$$.get(url, function (resp) {\
		if (resp && resp.output)\
		{\
			var n=-1,m;\
			try\
			{\
		   		if(/^<[^>]+>Sorry, I can't figure out what \"[^\"]+\" means\\.\\s+Perhaps you have 0\\./.test(resp.output))\
				{\
					n=0;\
				}\
				else if(m=resp.output.match(/^<[^>]+>You have (\d+) /))\
				{\
					n=parseInt(m[1]);\
				}\
	                    else if(/^<[^>]+Too many matches found/.test(resp.output))\
               		    {\
	                        n=-1;\
	                    }\
			}\
			catch(E)\
			{\
				n=-1;\
			}\
			callback({'n':n,'msg':resp.output});\
		}\
	},'json');\
");







function LoathingChatExtender()
{
	this.pwdhash='';
}


LoathingChatExtender.prototype.setPasswordHash=function(pwd)
{
	this.pwdhash=pwd;
}

LoathingChatExtender.prototype.old_submitchat=_unsafeWindow.submitchat;


LoathingChatExtender.prototype.addMessage=new _Function('msg',"\
	var e=document.createElement('span');\
	e.innerHTML=msg;\
	e.appendChild(document.createElement('br'));\
	document.getElementById('ChatWindow').appendChild(e);\
");


LoathingChatExtender.prototype.submitNewMessage=new _Function('txt',"\
	submitchat(txt);\
");
LoathingChatExtender.prototype.scrollDown=new _Function("\
	setTimeout(function(){document.getElementById(\"ChatWindow\").scrollTop+=400;},100);\
");


LoathingChatExtender.prototype.getChatText=new _Function('msg',"\
	return document.chatform.graf.value;\
");


LoathingChatExtender.prototype.clearTextbox=new _Function("\
	document.chatform.graf.value=\"\";\
");

LoathingChatExtender.prototype.focusTextbox=new _Function("\
	document.chatform.graf.focus();\
");

LoathingChatExtender.prototype.appendMessageToHistory=new _Function('msg',"\
	chistory.unshift(msg);\
	if (chistory.length > CHMAX) { chistory.pop(); }\
	chpointer = -1;\
	chcurrent = null;\
");

LoathingChatExtender.prototype.getHistoryClone=new _Function("\
	return chistory.slice(0);\
");

LoathingChatExtender.prototype.setHistory=new _Function('hist',"\
	chistory=hist;\
");


LoathingChatExtender.prototype.countItemThenCallMeWhenCounted=new _Function('txt','callback',"\
var $$=(typeof $$!='undefined')?$$:$;\
var url = '/submitnewchat.php?playerid='+playerid+'&pwd='+this.pwdhash+'&graf='+URLEncode(txt)+'&j=1';\
	$$.get(url, function (resp) {\
		if (resp && resp.output)\
		{\
			var n=-1,m;\
			try\
			{\
		   		if(/^<[^>]+>Sorry, I can't figure out what \"[^\"]+\" means\\.\\s+Perhaps you have 0\\./.test(resp.output))\
				{\
					n=0;\
				}\
				else if(m=resp.output.match(/^<[^>]+>You have (\d+) /))\
				{\
					n=parseInt(m[1]);\
				}\
	                    else if(/^<[^>]+Too many matches found/.test(resp.output))\
               		    {\
	                        n=-1;\
	                    }\
			}\
			catch(E)\
			{\
				n=-1;\
			}\
			callback({'n':n,'msg':resp.output});\
		}\
	},'json');\
");



function TriviaMasterSolver()
{
	this.mode='';//unknown
	this.lchat=null;
	this.mchat=null;
	this.pwdhash="";
	this.waiting=false;
}

TriviaMasterSolver.prototype.setPasswordHash=function(pwd)
{
	this.pwdhash=pwd;
}

TriviaMasterSolver.prototype.addHTMLTextToMainPane=function(s)
{
	//console.log('inserting: \n\n'+s+'\n\n');
	var els=_unsafeWindow.top.document.getElementsByTagName("frame");
	for(var i=0;i<els.length;i++)
	{
		if(els[i].getAttribute('name')=='mainpane')
		{
			with(els[i].contentDocument)
			{
				var b=body;
				var d=createElement('div');
				d.innerHTML=s;
				body.insertBefore(d,body.firstChild);
			}
			console.log('inserted');
		}
	}
}
TriviaMasterSolver.prototype.setMode=function(m)
{
	this.mode=m;
}

//Used for interacting with the main panel so the user doesn't have to click turn card over
/*
TriviaMasterSolver.prototype.addHTMLTextToMainPane=new _Function('s',"\
	with(window.top.frames['mainpane']){\
	var b=document.body;\
	var d=document.createElement('div');\
	d.innerHTML=s;\
	b.insertBefore(d,b.firstChild);\
	}\
");
*/

TriviaMasterSolver.prototype.old_submitchat=function()
{
	return this.lchat.old_submitchat.apply(_unsafeWindow,arguments);
}



TriviaMasterSolver.prototype.old_handleClientSide=function()
{
	return this.mchat.old_handleClientSide.apply(_unsafeWindow,arguments);
}


TriviaMasterSolver.prototype.useCard=function(card)
{
		var whichitem;
		var itemName;
		var t=this;
		var o={};
		var thenCallBack=new Function();
		o.then=function(fn){console.log('then set');thenCallBack=fn;};
		if(card=='who'){whichitem='5513';itemName='Trivial Avocations Card: Who?';}
		else if(card=='what'){whichitem='5511';itemName='Trivial Avocations Card: What?';}
		else if(card=='when'){whichitem='5512';itemName='Trivial Avocations Card: When?';}
		else if(card=='where'){whichitem='5514';itemName='Trivial Avocations Card: Where?';}
		else{return;}
		var itemCountName=itemName.substring(0,itemName.length-1);
		this.addMessageToChat('<font color="green">Using 1 '+itemName+'.</font>');
		var x=new XMLHttpRequest();
		x.open('POST','inv_use.php',true);
		//x.setRequestHeader('Cookie', document.cookie);
		//x.setRequestHeader('Cookie', document.cookie);
		//x.setRequestHeader('referer', 'http://www.kingdomofloathing.com/inventory.php?which=4&action=message');
		x.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		x.onreadystatechange=function()
		{
			if(x.readyState!=4)return;
			t.parseResponseAndAddToMainPane(x.responseText);
			console.log('calling then callback '+thenCallBack);
			thenCallBack();
			_unsafeWindow.top.frames['charpane'].location.reload(true);
		}
		var fields=['pwd='+this.pwdhash, 'whichitem='+whichitem, 'answerplz=1'];
		x.send(fields.join('&'));
		return o;
}

TriviaMasterSolver.prototype.parseResponseAndAddToMainPane=function(r)
{
	var m=r.match(/(<div\s+id=["']?effdiv["']?[^>]*>.*?<\/div>)/i);
	if(m)
	{
		var d=document.createElement('div');
		d.innerHTML=m[1];
		var els=d.getElementsByTagName('div');
		if(els.length>0)this.addHTMLTextToMainPane(els[0].innerHTML);
		else{
		this.addHTMLTextToMainPane('<div>Failed to parse responseText for item-usage resulting HTML. Jick and Co probably revamped the HTML structure.</div>');
		}
		/*if(!d.getElementsByTagName('img').length)
		{
			console.log('Failed to find IMG on: \n'+r);
		}*/
	}else{
		this.addHTMLTextToMainPane('<div>failed to parse responseText</div>');
		//console.log('failed on: '+r);
	}
}


TriviaMasterSolver.prototype.countItemThenCallMeWhenCounted=function(txt,callback)
{
	if(this.mode=='mchat')
	{
		this.mchat.countItemThenCallMeWhenCounted(txt,callback);
	}
	else if(this.mode=='lchat')
	{
		this.lchat.countItemThenCallMeWhenCounted(txt,callback);
	}
	else
	{
		console.log('countItemThenCallMeWhenCounted failed due to unsupported chat mode.');
	}
}

TriviaMasterSolver.prototype.addMessageToChat=function(msg)
{
		if(this.mode=='mchat')
		{
			try{
				this.mchat.addMessage(msg);
			}catch(E){}
		}
		else if(this.mode=='lchat')
		{
			try{
				this.lchat.scrollDown();
				this.lchat.addMessage(msg);
			}catch(E){}
		}else{
			console.log('addMessageToChat failed due to unsupported chat mode.');
		}
}

TriviaMasterSolver.prototype.passToDefaultKoLChat=function(msg)
{
	if(this.mode=='mchat')
	{
		return this.mchat.submitNewMessage(msg);
	}
	else if(this.mode=='lchat')
	{
		return this.lchat.submitNewMessage(msg);
	}else{
		console.log('passToDefaultKoLChat failed due to unsupported chat mode.');		
	}
}

TriviaMasterSolver.prototype.run=function()
{
	if(this.mode=='mchat')
	{
		this.mchat=new ModernChatExtender();
		this.mchat.setPasswordHash(this.pwdhash);
		//var old_handleClientSide=_unsafeWindow.handleClientSide;
		_unsafeWindow.handleClientSide=this.handleUserInput.bind(this);
		this.addMessageToChat("<font color=\"green\">Welcome to Ultibot's Trivia Master Solver.</font>");
	}
	else if(this.mode=='lchat')
	{
		this.lchat=new LoathingChatExtender();
		this.lchat.setPasswordHash(this.pwdhash);
		//var old_submitchat=_unsafeWindow.submitchat;
		_unsafeWindow.submitchat=this.handleUserInput.bind(this);
		this.addMessageToChat("<font color=\"green\">Welcome to Ultibot's Trivia Master Solver.</font>");
	}else{
		console.log('Ultibot\'s Trivia Master Solver aborted because it failed to detect either mchat or lchat.');
		return;//unsupported
	}

}


TriviaMasterSolver.prototype.handleInputOfInterest=function(msg)
{
	var t=this;
	if(this.mode=='lchat')
	{
		this.lchat.appendMessageToHistory(msg);
		this.lchat.clearTextbox();
		this.lchat.focusTextbox();
	}

	if(msg.match(/^\/use who$/))
	{
		this.useCard('who');
	}
	else if(msg.match(/^\/use what$/))
	{
		this.useCard('what');
	}
	else if(msg.match(/^\/use when$/))
	{
		this.useCard('when');
	}
	else if(msg.match(/^\/use where$/))
	{
		this.useCard('where');
	}
	else if(msg.match(/^\/count trivia master$/))
	{
		if(this.mode=='lchat'){var hist=this.lchat.getHistoryClone();}
		t.addMessageToChat("<font color=\"green\">Counting your trivia master cards...</font>");
		this.passToDefaultKoLChat('/count Trivial Avocations Card: Who');
		this.passToDefaultKoLChat('/count Trivial Avocations Card: What');
		this.passToDefaultKoLChat('/count Trivial Avocations Card: When');
		this.passToDefaultKoLChat('/count Trivial Avocations Card: Where');
		if(this.mode=='lchat'){this.lchat.setHistory(hist);}
	}
	else if(msg.match(/^\/use trivia master$/))
	{
		if(!t.isWaiting())
		{
			t.setWaiting(true);
			t.addMessageToChat("<font color=\"green\">Using all four trivia master cards...</font>");
			var stack=new RequestStack();
			stack.addRequest(function(){ return t.useCard('who'); });
			stack.addRequest(function(){ return t.useCard('what'); });
			stack.addRequest(function(){ return t.useCard('when'); });
			stack.addRequest(function(){ return t.useCard('where'); });
			stack.addRequest(function(){ t.setWaiting(false);return {then:new Function()}; });
			stack.execute();
		}else{
			t.addMessageToChat("<font color=\"green\">Please wait a moment for the previous /use trivia master to finish. If this message persists due to a failed HTTP Request, type /reset trivia master</font>");
		}
	}
	else if(msg.match(/^\/reset trivia master$/))
	{
		t.setWaiting(false);	
		t.addMessageToChat("<font color=\"green\">Ultibot's Trivia Master Solver was reset sucessfully.</font>");
	}

	return true;	
}

TriviaMasterSolver.prototype.isWaiting=function()
{
	return this.waiting;
};

TriviaMasterSolver.prototype.setWaiting=function(w)
{
	this.waiting=w;
};


function RequestStack()
{
	this.stack=[];
}
RequestStack.prototype.addRequest=function(fn)
{
	this.stack.push(fn);
}

RequestStack.prototype.execute=function()
{
	var fn,r,t=this;
	console.log('stack length: '+this.stack.length);
	if(this.stack.length)
	{
		fn=this.stack.shift();
		r=fn();
		r.then(function(){t.execute();});
	}
}

TriviaMasterSolver.prototype.handleUserInput=function(msg)
{
	if(this.mode=='lchat' && !msg){msg=this.lchat.getChatText();}
	if( !msg.match(/^\/use (who|what|when|where|trivia master)$/) && !msg.match(/^\/(count|reset) trivia master$/) )
	{
		if(this.mode=='mchat')
		{
			return this.old_handleClientSide(msg);
		}
		else if(this.mode=='lchat')
		{
			return this.old_submitchat(msg);
		}
	}else{
		return this.handleInputOfInterest(msg);
	}
};


var x=new TriviaMasterSolver();
if(_isModernChat)x.setMode('mchat');
else if(_isLoathingChat)x.setMode('lchat');
else x.setMode('unknown');
x.setPasswordHash(_pwdhash);
x.run();