// ==UserScript==
// @name       Czarnolisto do czata surmy
// @version    0.1
// @match      http://tylkomirko.pl/wykopfm
// @match      http://www.tylkomirko.pl/wykopfm
// @copyright  2014+, Michal Krawczak
// ==/UserScript==

function czy_nick_na_czarnolisto(nick)
{
	if(("czarnolisto_" + nick) in localStorage)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function czarnolistuj(nick)
{
	localStorage["czarnolisto_" + nick] = "true";
}

function odczarnolistuj(nick)
{
	delete localStorage["czarnolisto_" + nick];
}

function czarno_init()
{
    var names = document.getElementById("online_list").getElementsByTagName("a");
	for (i in names)
	{
		var user_name = names[i];
		if(typeof user_name == "object")
		{
			user_name.oncontextmenu = function()
			{
				var nick = this.innerHTML.replace(/^\+/, "");
			    if(czy_nick_na_czarnolisto(nick))
			    {
					this.style.color = this.style.defaultColor;
					this.style.textDecoration = "";
					odczarnolistuj(nick);
			    } 
			    else
			    {
					this.style.defaultColor = this.style.color;
					this.style.color = "gray";
					this.style.textDecoration = "line-through";
					czarnolistuj(nick);
			    } 
			    return false; 
			};
			var nick = user_name.innerHTML.replace(/^\+/, "");
			if(czy_nick_na_czarnolisto(nick))
			{
				user_name.style.defaultColor = user_name.style.color;
			    user_name.style.color = "gray";
				user_name.style.textDecoration = "line-through";
			}
		}
	}
}

function podmien_websocket()
{
	websocket.onmessage = function (evt) 
	{ 
		var msg = JSON.parse(evt.data);

		if(msg.action == "msg") 
		{
			//console.log(msg.data);
			var nick = null;
			var text_msg = msg.data.match(/onclick="mention\('@(.*?)'\)"/i);
			if(text_msg && text_msg[1]) nick = text_msg[1];
			var me_msg = msg.data.match(/<b>(.*?)<\/b>/)
			if(me_msg && me_msg[1]) nick = me_msg[1];
			console.log(nick);
			if((nick && czy_nick_na_czarnolisto(nick)) || msg.data.match(/^-\d+\]$/))
			{
				console.log(msg.data);
			}
			else
			{
				log(msg.data);
			}
		} else if(msg.action == "online_list") 
		{
			document.getElementById('online_list').innerHTML = msg.data;
			czarno_init();
		} 
		else 
		if(msg.action == "sound")
		{
			if(sound_enable)
			{
				document.getElementById("sound").innerHTML='<object type="application/x-shockwave-flash" data="http://tylkomirko.pl/application/views/media/player_mp3_mini.swf" width="1" height="1"><param name="bgcolor" value="#000000" /><param name="FlashVars" value="mp3=http%3A//tylkomirko.pl/application/views/media/message_new.mp3&amp;autoplay=1" /></object>';
			}
		}
	} 
}

setTimeout(function(){ czarno_init(); podmien_websocket(); }, 1500);
