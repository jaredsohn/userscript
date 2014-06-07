// ==UserScript==
// @name           TwitterScript
// @namespace      http://ad1987.blogspot.com/
// @description    Send tweets right from Firefox!
// @include        *
// ==/UserScript==


function $(id){return document.getElementById(id);}//baby prototype!
function format_json(json)
	{
	if(json["created_at"]!='')
		{
		return "Status updated!";
		}
	else if (!json || json["created_at"]=='')
		{
		return "Seems like something's wrong! Please Try again";
		}
	}
function sendTwit(val)
	{
	if(GM_getValue("_username")===undefined && GM_getValue("_password")===undefined)
		{
		tmpArr = val.split(":");
		GM_setValue("_username", tmpArr[0]);
		GM_setValue("_password", tmpArr[1]);
		alert("Username and Password has been set! Now start sending tweets!");
		}
	else
		{
		$('twitStat').innerHTML="<img src='http://www.tumblr.com/images/loading.gif'/>";
		GM_xmlhttpRequest({
			method: 'POST',
			url: 'http:\/\/'+GM_getValue("_username")+':'+GM_getValue("_password")+'@twitter.com\/statuses/update.json?status='+encodeURI(val),
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(response) {
				$('twitStat').innerHTML = format_json(response.responseText);
				timeout = 0;
			}
		});
		}
	}
(function(){
	cont = document.createElement("div");
	cont.id = 'twitterscript';
	cont.setAttribute('style','background: #77EAF5; position:fixed;bottom:0px;right:-125px;padding:5px;opacity:1.0;z-index:15000;border:1px solid #00A2AF;');
	
	twitstat = document.createElement("div");
	twitstat.id='twitStat';
	twitstat.setAttribute('style','clear:both;');
	cont.appendChild(twitstat);

	input = document.createElement('input');
	input.style.border='1px solid #00A2AF';
	input.style.fontFamily="Verdana";
	input.style.background='url("data:image/gif,GIF89a%10%00%10%00%B3%00%00%00%DE%EF%18%E7%EF)%E7%F79%E7%F7R%E7%F7c%E7%F7s%EF%F7%D6%D6%CE%84%EF%F7%94%EF%F7%A5%F7%FF%BD%F7%FF%CE%F7%FF%DE%FF%FF%EF%FF%FF%FF%FF%FF!%F9%04%01%00%00%07%00%2C%00%00%00%00%10%00%10%00%00%04o%F0%9C%E7%EA%938O%D7%16s%97%86Q%CA%A24%A185I%8B%3E0%9C%3D%0D%92%20%1E%B3xh%D6%18%08%84aHD8%7C%C4%E4%B0%D0%185%0A%05%03tZ%40%A4%1E%0C%82vQ%A9%F4F%8C%81x%11%93%CD%18%01A%40Q6K(%02%00%20%80P%D8O%9A%07B%CE%E7%07%9A%23%0F%04%7D%7D%0By%0F%09%01%84%03G%87%1C%0D%90%0D%20%12%11%00%3B") center left no-repeat;';
	input.style.paddingLeft='16px';
	input.setAttribute('accesskey', 't');
	input.setAttribute('maxlength', '140');
	//input.style.clear= "both";
	input.addEventListener('focus', function(){
		$('twitterscript').style.right='0px';
		if(GM_getValue("_username")===undefined && GM_getValue("_password")===undefined)
		{
		twitstat.innerHTML="To set uname/pass, type username:password and hit tweet!";
		}
		if(!$('twitbtn'))
			{
			btn = document.createElement("button");
			btn.id='twitbtn';
			btn.align='center';
			btn.innerHTML="Tweet";
			btn.style.background= '#E6E6E6';
			btn.style.cursor='pointer';
			btn.style.border='none';
			btn.addEventListener('click', function(){sendTwit(input.value);}, true);
			close = document.createElement("a");
			close.setAttribute('style', 'background-color:#77EAF5');
			close.href='javascript:;';
			close.innerHTML="[x]";
			close.addEventListener("click", function()
				{
				cont.style.right='0px'; input.value='';
				cont.setAttribute('style','background: #77EAF5; position:fixed;bottom:0px;right:-125px;padding:5px;opacity:1.0;z-index:10000');
				$('twitStat').innerHTML='';
				cont.removeChild(btn);
				cont.removeChild(close);
				}, true);
			cont.appendChild(btn);
			cont.appendChild(close);
			}
		}, true);
	newDiv = document.createElement("div");
	newDiv.style.clear="both";
	newDiv.appendChild(input);
	cont.appendChild(newDiv);
	top.document.getElementsByTagName('body')[0].appendChild(cont);
	})();