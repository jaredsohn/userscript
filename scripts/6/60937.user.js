// JavaScript Document
// ==UserScript==
// @name           Ikariam CT Manager
// @autor          holyschmidt (http://userscripts.org/users/holyschmidt)
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://userscripts.org/scripts/show/54984
// @description    Easily determine which alliance members you have cultural treaties with.
// @include        http://s*.ikariam.*/*view=museum*
// @include        http://s*.ikariam.*/*view=diplomacyAdvisorAlly*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/AutoUpdater.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamHostDetection.js
// @version        1.0.2
// @exclude        http://board.ikariam.*/*
// @exclude        http://support*.ikariam.*/*
// ==/UserScript==

// Version 1.0.2 - Implementation: Column added in diplomacy member view.  Icon changed to use 'X' to signify CT needed.
// Version 1.0.1 - Implementation: More Framework laid.  Initial implementation working.
// Version 1.0.0 - Implementation: Initial Framework
 

const cache_key       = getServerDomain() + '.' + getServerWorld();
const cache_variables = {
	ACTIVE:     'ikctm.ACTIVE.'  + cache_key,
	PENDING:    'ikctm.PENDING.' + cache_key
};
const ct_image        = "data:image/gif;base64,R0lGODlhSwBLALMAAOXMrt+3m+/nxsp0YqMEBJgVE8+QfMsWE6I2MLRLQLhANrIEBNBOQqcEBKcRD+7mwiH5BAEAAA8ALAAAAABLAEsAAAT/8MlJq7046827/2AojmRpnmiqrmzrvnAsz3Rt33iu7zwmAIEAQAASBAwGIZH3MwwGSo/xyUgOd80BQwG9bqbaAyPovWUZh4XCuvQFqGkHNGo7pxuNNd0CRi/wcmRtMnZ/DQR5bHxvYYaIgXswhXgEiImRfXeWj3NlLpOblnpemY6VlJCeK6Chomylh5SVlqmDKaytp6OMfoe5p7WrAE69vqfGs2tOjbKzzZXBKLi/x2vM1MfQnbYi09inDL3f2QSpJ1Pi4+Sz7M7I7ZUDqt1vd77P8O75+fiVBQECuBUZpkBdu3771s0qYCCgwCI/ChqEhzDhKYYOH35wCKBgRYsT/9lhdHgrIIAEIfm92zcy4CqTKD+CVNdSIwmOElPuw1fzBU52Mmdu6ikJpkKhKonG4IjyKFKRDUnSYAp0JVKlU4EYcKAz34CMZnhx7dougZB5knhpcop0lE0VsNg+JeCWkNo/+ubmq+vzbrOgQi+hPee3ql5+iPjCLZz3MNBqim4xbuz4lDvFJWCtBDwTmeC3HApzBvmu3xoAgz28KWa4sjOKxhQABK2hninKla3KQjCEdgYgA8Z2LYCALAEEs337CBh8eJKmuPMhB5vZ4daUI0+m5E39XMDrBmtqN8hdakkB4L/VNOnR6qzp5uF+F/6r58+K5V1+mk9NKdV+8OnnE1V/VWH1AFUH5afcTQRSYqAECFKiYA3WCffgBD8hEuCC3qHH1YUUULVhDg4NAGIFHEHRHQ4crfhFRvGRCGMIMHK4n4A95Kjjjjz26OOPQAYp5JBEDhkBADs%3D";


/* Check for a later version of the script */
new IkariamUserScriptUpdater( 54984, "Ikariam CT Manager" );

/* What page are we on? */
var bodyid = $("body").attr("id");
if (bodyid == "museum")
{
	var pending = "";

	var active = "";
	$('a.writeMsg').each(function() {
		var curr = $(this).attr('href').substr($(this).attr('href').indexOf('receiverId=') + 11);
		active += (active == "") ? curr : ',' + curr;
	});

	UpdateCTs(active, pending);
}
else
if (bodyid == "diplomacyAdvisorAlly")
{
	/* Load current list of active/pending players */
	var IK_CT_ACTIVE  = GM_getValue(cache_variables.ACTIVE, "");
	var IK_CT_PENDING = GM_getValue(cache_variables.PENDING, "");

	/* Add Column Header */
	$('#memberList thead tr').append('<th><img src="skin/museum/icon32_culturalgood.gif" width="14" height="14" /></th>');

	/* Add indicators next to players which you already have CT's with */
	$('a.message').each(function() {
		if ($(this).attr("href").indexOf('receiverId') != -1)
		{
			var id =  $(this).attr("href").substr( $(this).attr("href").indexOf('receiverId=') + 11);
			if (HasCT(id, IK_CT_ACTIVE))
			{
				$(this).closest('tr').append('<td width="15">&nbsp;</td>');
			}
			else
			{
				$(this).closest('tr').append('<td width="15"><img src="' + ct_image + '" width="15" height="15" /></td>');
			}
		}
	});
}

function HasCT(needle, haystack)
{
	return haystack.indexOf(',' + needle) != -1;
}

function UpdateCTs(active, pending)
{
	GM_setValue(cache_variables.ACTIVE,  active);	
	GM_setValue(cache_variables.PENDING, pending);	
}
