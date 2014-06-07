// ==UserScript==
// @name           Spam DN Scam Sites
// @namespace      Kyomo
// @version        2.0
// @include        http://topupmycc.weebly.com/*
// @include        http://dnfreegoldccanditem.yolasite.com/*
// @run-at         document-end
// ==/UserScript==

function timedRefresh(timeoutPeriod)
{
    if (window.location.href.indexOf('topupmycc.weebly.com') > -1)
		setTimeout("location.reload(true);",timeoutPeriod);
    else if (window.location.href.indexOf('dnfreegoldccanditem.yolasite.com/?form') > -1)
        window.location.assign('http://dnfreegoldccanditem.yolasite.com/');
}
timedRefresh(5000);


function makeemail()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.";
    for( var i = 0; i < Math.floor(Math.random() * 3) + 7; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i = 0; i < Math.floor(Math.random() * 3) + 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
function make2ndpwd()
{
    var text = "";
    var possible = "0123456789";
    for( var i = 0; i < 4; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

if (window.location.href.indexOf('topupmycc.weebly.com') > -1)
{
    var radiobuttonsHTML = new Array();
    for (i=0; i<document.getElementsByTagName('input').length; i++) 
	{
    	if(document.getElementsByTagName('input')[i].type == 'radio')
    	{
			radiobuttonsHTML.push(document.getElementsByTagName('input')[i]);
    	}
	}
	radiobuttonsHTML[Math.floor(Math.random() * radiobuttonsHTML.length)].checked = true;
	document.getElementById('input-435359681860371745').value = makeemail() + '@gmail.com';
	document.getElementById('input-212231666671036781').value = makeid();
	document.getElementById('input-688480161964750626').value = makeid();
	document.getElementById('input-536271691875134963').value = make2ndpwd();
	document.getElementById('form-974227474139998457').submit();
}
else if (window.location.href.indexOf('dnfreegoldccanditem.yolasite.com') > -1)
{
	document.getElementById('yola_form_widget_I19_0').value = makeid();
    document.getElementById('yola_form_widget_I19_1').value = makeid();
    document.getElementById('yola_form_widget_I19_2').value = makeemail() + '@gmail.com';
    document.getElementById('yola_form_widget_I19_3').value = make2ndpwd();
    document.getElementById('yola_form_widget_I19_4_2').checked = true;
    document.getElementById('yola_form_widget_I19_5_2').checked = true;
    document.getElementById('yola_form_widget_I19_6').options[2].selected = true;
    document.getElementsByClassName('submit')[0].click();
}