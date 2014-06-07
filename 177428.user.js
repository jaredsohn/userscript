// ==UserScript==
// @name       Smotri.com anti-spam
// @namespace  http://gist.github.com/
// @version    0.41
// @description  Helps filter noise SPAM messages
// @match      http://smotri.com/live/*
// @copyright  2013+, vgimly
// @run-at document-body
// ==/UserScript==

var abuse={"virtick_anzhella": "Paid skype spam"};

function filter_messages(data)
{
    if (!("ulist" in window))
    {
    	debugger;
        window.ulist={put: function(l,r){
            var line='<div class="ChatLine">'+l.nick+'</div>';
            
            //abuse[l.login]=l.text;
            //console.log("got spammer: "+l.login);
            
        	console.log((reason?reason:"[PASS]")+" ["+l.nick+"] <"+l.login+"> "+l.text);
            if ("div" in ulist) ulist["div"].innerHTML+=line;
        }};
        
		var div=document.getElementById("main_chat").rows[0].insertCell(-1);
        div.rowSpan=2;
        div.innerHTML="<div style='overflow-x: hidden;overflow-y: scroll;' id='UserList'></div>";
		ulist["div"]=document.getElementById("UserList");
    }
        
    //debugger;
	for (i in data.lines)
	{
		var reason;
        var l=data.lines[i];
        if (l.login in abuse) reason="[abuse]";
        else {
        var txt=l.text.replace(/[^A-Za-z0-9]*/g,'');
        if (l.text.match(/([^A-Za-z0-9])\1{2,}/)) reason='[rSPAM]';
// noise messages (without non-ascii chars) regexp
		else if (txt.match(/CUBQIPRU|NUKAMKIRU|QPSRU|mexxx2828|yandexvip|AVTOVISORRU|kiissa82|ANJELLA07111|ygodnik25/i))
        {
			reason='[vSPAM]';
        }
// noise users regexp
        else if (l.login.match(/(.)\1{3,}/) ||  // 18654110-vk
                 l.nick.match(/(.)\1{3,}/)) reason='[Noise]';
		}
        
        if (ulist) ulist.put(l,reason);
        
		if (reason)
        {
            //if (!(line.login in abuse))
            data.lines[i].text=reason;
        }
	}
	return update_messages_old(data);
}

// inject upper function into DOM
var div = document.createElement('script');
div.innerHTML="var abuse="+JSON.stringify(abuse)+";\n"+String(filter_messages);
document.body.appendChild(div);

// make changes in runtime
document.body.addEventListener('load',function(o){
    update_messages_old=update_messages;
    update_messages=filter_messages;
this.removeEventListener(o.type,arguments.callee,!0);},!0);
