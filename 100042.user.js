// ==UserScript==
// @name        	Facebook Questions Remover
// @author		Sean Davies
// @version		1.4
// @description		Remove Facebook Questions from your news feed.
// @include     	http://*.facebook.com/*
// @include             https://*.facebook.com/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
'#navItem_questions {display:none!important;}' +
'li.aid_10150110253435258 {display:none!important;}'
);

var data = document.getElementsByTagName('li');

for(i = 0; i < data.length; i++)
{
	if(data[i].innerHTML.match("question.php"))
	{
		var div = data[i];
		div.style.display = 'none';
	}
}

var data2 = document.getElementsByTagName('div');

for(j = 0; j < data2.length; j++)
{
	if (data2[j].className == "UIImageBlock_Content UIImageBlock_ICON_Content")
	{

		if(data2[j].innerHTML.match("question\_id"))
		{
			var div = data2[j];
			div = div.parentNode;
			div.style.display = 'none';
		}
	}
}

//Script update checker from http://userscripts.org/scripts/review/20145
var SUC_script_num = 100042;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
