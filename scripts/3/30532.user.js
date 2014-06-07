// ==UserScript==
// @name           Friendfeed Refresh Feeds Button
// @namespace      http://userscripts.org/users/44035
// @description    Adds a simple, easy Refresh Feeds button for manually refreshing your feeds.
// @include        http://friendfeed.com/*
// @exclude        http://friendfeed.com/settings/*
// @exclude        http://friendfeed.com/account/*
// @exclude        http://friendfeed.com/rooms/*
// @exclude        http://friendfeed.com/public/*
// @version        0.2
// ==/UserScript==
var gmScript_url = "http://userscripts.org/scripts/source/30532.user.js";
var gmScript_name = "Friendfeed Refresh Feeds Button";
var gmScript_version = 0.2;

autoUpdateFromUserscriptsDotOrg(
	{
		name: gmScript_name,
		url: gmScript_url,
		version: gmScript_version,
	}
);

function GM_wait() 
{
	if(typeof unsafeWindow.jQuery == 'undefined') 
	{ 
		window.setTimeout(GM_wait,100); 
	}
	else 
	{ 
		$ = unsafeWindow.jQuery; letsJQuery(); 
	}
}
GM_wait();

function getUID()
{
	return $('.body a:contains("me")').attr('href').substr(22).toLowerCase();
}

function isSelf()
{
	if(unsafeWindow.gPath)
	{
		return(unsafeWindow.gPath.substr(1).toLowerCase() == getUID());
	}
	else
	{
		return false;
	}
}

function getAt()
{
	at = new RegExp(/name="at" value="([\S\s]*?)"/).exec(unsafeWindow.gShareMainForm);
	return at[1];
}

var refreshServices = [];

unsafeWindow.getServices = function(obj)
{
	if(refreshServices.length == 0)
	{
		obj = $(obj).after('<img src="/static/images/loading.gif?v=2"/>'); 
		obj.blur();
		obj.disabled = 1;
		unsafeWindow.refreshCount = 0;
		unsafeWindow.refreshAt = getAt();
		$.ajax({
			type: "POST",
			dataType: "json",
			data: "at=" + unsafeWindow.refreshAt + "&streamid=",
			url: "http://friendfeed.com/share/dialog/services",
			success:
				function(results)
				{
					$.each($(results.rhs_html).find('.service'), function(x,y){
						z = $(y);
						refreshServices.push(
						{
							serviceid: z.attr('id').replace('service-',''),
							service: z.attr('servicename'),
							username: z.find('a:eq(0)').text()
						});
					});
					unsafeWindow.refreshServices();
				}
		});
	}
}

unsafeWindow.refreshServices = function()
{
	$.each(refreshServices, function(x,y){
			$.ajax({
				type: "POST",
				dataType: "json",
				data: "at=" + unsafeWindow.refreshAt + "&delete_entries=0&service=" + y.service + "&serviceid=" + y.serviceid + "&streamid=&username=" + y.username,
				url: "http://friendfeed.com/settings/configureservice?refresh=1",
				complete:
					function()
					{
						if(++unsafeWindow.refreshCount == refreshServices.length)
						{
							window.setTimeout(function(){location.reload(true);},1000);
						}
					}	
			});
	});
}

function letsJQuery() 
{
	if(isSelf())
	{
		$('.l_shareservices:eq(0)').after(' <span style="color:#bbbbbb">|</span> <a href="#" onclick="getServices(this);return false;">Refresh feeds</a>');
	}
}

function autoUpdateFromUserscriptsDotOrg(SCRIPT) {
  try {
    if (!GM_getValue) return; // Older version of Greasemonkey. Can't run.
    // avoid a flood of dialogs e.g. when opening a browser with multiple tabs set to homepage
    // and a script with * includes or opening a tabgrop
    var DoS_PREVENTION_TIME = 2 * 60 * 1000;
    var isSomeoneChecking = GM_getValue('CHECKING', null);
    var now = new Date().getTime();
    GM_setValue('CHECKING', now.toString());

    if (isSomeoneChecking && (now - isSomeoneChecking) < DoS_PREVENTION_TIME) return;

    // check daily
    var ONE_DAY = 24 * 60 * 60 * 1000;
    var ONE_WEEK = 7 * ONE_DAY;
    var TWO_WEEKS = 2 * ONE_WEEK;
    var lastChecked = GM_getValue('LAST_CHECKED', null);
    if (lastChecked && (now - lastChecked) < TWO_WEEKS) return;

    GM_xmlhttpRequest({
      method: 'GET',
	  url: SCRIPT.url + '?source', // don't increase the 'installed' count just for update checks
	  onload: function(result) {
	  if (!result.responseText.match(/@version\s+([\d.]+)/)) return;     // did not find a suitable version header

	  var theOtherVersion = parseFloat(RegExp.$1);
	  if (theOtherVersion <= parseFloat(SCRIPT.version)) return;      // no updates or older version on userscripts.orge site

	  if (window.confirm('A new version ' + theOtherVersion + ' of greasemonkey script "' + SCRIPT.name + '" is available.\nYour installed version is ' + SCRIPT.version + ' .\n\nUpdate now?\n')) {
	    GM_openInTab(SCRIPT.url);   // better than location.replace as doing so might lose unsaved data
	  }
	}
      });
    GM_setValue('LAST_CHECKED', now.toString());
  } catch (ex) {
  }
}
