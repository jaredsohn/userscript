// ==UserScript==
// @name           TV tropes Reverse Links
// @namespace      http://userscripts.org/users/Scuzzball
// @include        http://tvtropes.org/pmwiki/pmwiki.php/*
// @version        2.0
// ==/UserScript==
var link;
var results = [];
var parse;


var allLink = document.getElementsByTagName("a");


var patt =/tvtropes\.org\/pmwiki\/pmwiki\.php/;
for (var i = 0; (link = allLink[i]) != null; i++) 
{
	if (link.className = "twikilink")
	{
		if(patt.test(link.href))
		{
			results.push(link.href);
		}
	}
}

var patt=/pmwiki\/pmwiki\.php\/.*\/(.*)/g;
var currentPageName=patt.exec(document.location.pathname);

currentPageName = currentPageName[1];

//Display that shit
GM_xmlhttpRequest({
  method: "GET",
  url: "http://uf.serveftp.com/cgi-bin/display.cgi?page=" + currentPageName, 
  onload: function( response) {
	document.getElementById("wikileftpage").parentNode.innerHTML=response.responseText;
  }
});


//Do we parse?
GM_xmlhttpRequest({
  method: "GET",
  url: "http://uf.serveftp.com/cgi-bin/doParse.cgi?page=" + currentPageName,
  onload: function( response ) {
	if( response.responseText == 1)
	{
		parse();
	}
  }
});

function parse()
{
	//Better parse that shit
	for(var i = 0; (link = results[i]) != null; i++)
	{
		patt=/pmwiki\/pmwiki\.php\/.*\/(.*)/g;
		var page=patt.exec(link); //Now we need to check if currentPageName exists in database.page
		GM_xmlhttpRequest({
		  method: "GET",
		  url: "http://uf.serveftp.com/cgi-bin/parse.cgi?page=" + page + "&currentPageName=" + currentPageName + "&link=" + document.location.href, 
		  onload: function(response) {
			document.getElementById("wikileftpage").innerHTML=document.getElementById("wikileftpage").innerHTML + response.responseText;
		  }
		});
	}
}


//Update checker by Jarett.
//http://userscripts.org/scripts/show/20145
var SUC_script_num = 123036; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}