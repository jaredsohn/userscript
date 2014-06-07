// ==UserScript==
// @name           autoaccept
// @namespace      Facebook Auto Accept
// @description    Are you bored clicking hundreds of "Accept" button? Try this, Facebook Auto Accept. http://userscripts.org/scripts/admin/59198
// @include        http://www.facebook.com/reqs.php*
// @version        20
// ==/UserScript==

// Configurations and Settings
var AA_Meta = {
	version : 20,
	beta : 0,
	meta : 'http://userscripts.org/scripts/source/59198.meta.js',
	src : 'http://userscripts.org/scripts/source/59198.user.js'
};

var AA_KnownApp = {
	'FRIEND' : {
		label: 'span[id=friend_connect_label]:contains("friend request")',
		title: 'Friend request',
		accept: 'Accept all',
		success: /Accept More Pending Gifts/,
		limit: 0,
		remote: false
	},
	'MWGIFT' : {
		label: 'span[id^=app_10979261223_][id$=_label]:contains("mafia wars gift request")',
		title: 'Mafia wars gift request',
		accept: 'Accept all',
		success: /Accept More Pending Gifts/,
		limit: 0,
		remote: true
	},
	'MWGIFT2' : { // same as MWGIFT but different title
		label: 'span[id^=app_10979261223_][id$=_label]:contains("gift and mafia wars request")',
		title: 'Mafia wars gift request*',
		accept: 'Accept all',
		success: /Accept More Pending Gifts/,
		limit: 0,
		remote: true
	},
	'FVGIFT' : {
		label: 'span[id^=app_102452128776_][id$=_label]:contains("farmville gift request")',
		title: 'Farmville gift request',
		accept: 'Accept at most 30 of these',
		success: /You just accepted this/,
		limit: 30,
		remote: true
	},
	'FVGIFT2' : {
		label: 'span[id^=app_102452128776_][id$=_label]:contains("farmville gift/invit request")',
		title: 'Farmville gift request*',
		accept: 'Accept at most 30 of these',
		success: /You just accepted this/,
		limit: 30,
		remote: true
	},
	'CWFRIEND' : {
		label: 'span[id^=app_101539264719_][id$=_label]:contains("world neighbor request")',
		title: 'Café world neighbor request',
		accept: 'Accept all',
		success: /is now your neighbor/,
		limit: 0,
		remote: true
	},
	'CWGIFT' : {
		label: 'span[id^=app_101539264719_][id$=_label]:contains("café gift request")',
		title: 'Café world gift request',
		accept: 'Accept all',
		success: /You just accepted this/,
		limit: 0,
		remote: true
	},
	'CWGIFT2' : {
		label: 'span[id^=app_101539264719_][id$=_label]:contains("café world gift request")',
		title: 'Café world gift request*',
		accept: 'Accept all',
		success: /You just accepted this/,
		limit: 0,
		remote: true
	},
	'CWGIFT3' : {
		label: 'span[id^=app_101539264719_][id$=_label]:contains("café gift/invite request")',
		title: 'Café world gift request*',
		accept: 'Accept all',
		success: /You just accepted this/,
		limit: 0,
		remote: true
	},
	'BBGIFT' : {
		label: 'span[id^=app_60884004973_][id$=_label]:contains("barn buddy gift request")',
		title: 'Barn Buddy gift request',
		accept: 'Accept all',
		success: /You have received/,
		limit: 0,
		remote: true
	},
	'PSGIFT' : {
		label: 'span[id^=app_11609831134_][id$=_label]:contains("pet society gift request")',
		title: 'Pet Society gift request',
		accept: 'Accept all',
		success: /You have accepted a sticker/,
		limit: 0,
		remote: true
	},
	'RCGIFT' : {
		label: 'span[id^=app_43016202276_][id$=_label]:contains("restaurant city gift request")',
		title: 'Restaurant City gift request',
		accept: 'Accept all',
		success: /You have accepted/,
		limit: 0,
		remote: true
	},
	'ROLGIFT' : {
		label: 'span[id^=app_89771452035_][id$=_label]:contains("rollercoaster gift request")',
		title: 'Roller Coaster Kingdom gift request',
		accept: 'Accept all',
		success: /You just accepted this/,
		limit: 0,
		remote: true
	},
	'VWGIFT' : {
		label: 'span[id^=app_25287267406_][id$=_label]:contains("vampire wars gift request")',
		title: 'Vampire wars gift request',
		accept: 'Accept all',
		success: /You just accepted/,
		limit: 0,
		remote: true
	},

	// contributor: Jacobonthefarm
	'FHGIFT' : {
		label: 'span[id^=app_151044809337_][id$=_label]:contains("fishville gift request")',  
		title: 'Fishville gift request',  
		accept: 'Accept all',  
		success: /You just accepted this/,  
		limit: 0,  
		remote: true  
	},  
	// contributor: Shpilkus
	'FHFRIEND' : {  
		label: 'span[id^=app_151044809337_][id$=_label]:contains("fishville neighbor request")',  
		title: 'Fishville neighbor request',  
		accept: 'Accept all',  
		success: /You just became a neighbor with/,  
		limit: 0,  
		remote: true  
	},  
	// contributor: Shpilkus
	'CAGIFT1' : {  
		label: 'span[id^=app_46755028429_][id$=_label]:contains("mystery relic gift request")',  
		title: 'Castle Age Mystery Relic Gift',  
		accept: 'Accept all',  
		success: /You have accepted the gift/,  
		limit: 0,  
		remote: true  
	},
	// contributor: Shpilkus
	'CAGIFT2' : {  
		label: 'span[id^=app_46755028429_][id$=_label]:contains("dragon egg gift request")',  
		title: 'Castle Age Dragon Egg Gift',  
		accept: 'Accept all',  
		success: /You have accepted the gift/,  
		limit: 0,  
		remote: true  
	},
	// contributor: Shpilkus
	'CAGIFT3' : {  
		label: 'span[id^=app_46755028429_][id$=_label]:contains("mystery scroll gift request")',  
		title: 'Castle Age Mystery Scroll gift',  
		accept: 'Accept all',  
		success: /You have accepted the gift/,  
		limit: 0,  
		remote: true  
	},
	// contributor: Shpilkus
	'CAGIFT4' : {  
		label: 'span[id^=app_46755028429_][id$=_label]:contains("mystery artifact gift request")',  
		title: 'Castle Age Mystery Artifact gift',  
		accept: 'Accept all',  
		success: /You have accepted the gift/,  
		limit: 0,  
		remote: true  
	},
	// contributor: Shpilkus
	'FARMPALS' : {  
		label: 'span[id^=app_5168672988_][id$=_label]:contains("farm pals gift request")',  
		title: 'Farm Pals gift request',  
		accept: 'Accept all',  
		success: /You accepted some/,  
		limit: 0,  
		remote: true  
	},
	// contributor: Shpilkus
	'FTGIFT' : {  
		label: 'span[id^=app_56748925791_][id$=_label]:contains("farm town gift request")',  
		title: 'Farm town gift request',  
		accept: 'Accept all',  
		success: /You just accepted this/,  
		limit: 0,  
		remote: true  
	},
	/*,
	'FTGIFT' : { // contributor: mfgann
		label: 'span[id^=app_56748925791_][id$=_label]:contains("farm town gift request")',
		title: 'Farm town gift request',
		accept: 'Accept at most 30 of these',
		success: /You just accepted this/,
		limit: 30,
		remote: true
	}*/
	// contributor: Shpilkus
	'PIRATESFRIEND' : {  
		label: 'span[id^=app_16421175101_][id$=_label]:contains("pirates request")',  
		title: 'Pirates: Rule the Caribbean! crew request',  
		accept: 'Accept all',  
		success: /You have just accepted an invitation from/,  
		limit: 0,  
		remote: true  
	},
	// contributor: Shpilkus
	'BBFRIEND' : {
		label: 'span[id^=app_60884004973_][id$=_label]:contains("barn buddy neighbor request")',
		title: 'Barn Buddy neighbor request',
		accept: 'Accept all',     
		success: /is now your neighbor/,  
		limit: 0,  
		remote: true

	},  
	// contributor: Shpilkus
	'SWFRIEND' : {
		label: 'span[id^=app_36842288331_][id$=_label]:contains("captains request")',
		title: 'Space Wars captains request',
		accept: 'Accept all',     
		success: /You have just accepted an invitation from/,  
		limit: 0,  
		remote: true
	},
	// contributor: Shpilkus
	'YVGIFT' : {  
		label: 'span[id^=app_21526880407_][id$=_label]:contains("yoville gift/invite request")',  
		title: 'Yoville gift request',  
		accept: 'Accept all',  
		success: /You just accepted this/,  
		limit: 0,  
		remote: true  
	},
	// contributor: Shpilkus
	'YVFRIEND' : {  
		label: 'span[id^=app_21526880407_][id$=_label]:contains("yoville neighbor request")',  
		title: 'Yoville neighbor request',  
		accept: 'Accept all',  
		success: /You accepted the/,  
		limit: 0,  
		remote: true  
	}

};

var AA_ProcessCall = new Array();
var AA_ProcessSuccess = new Array();
var AA_ProcessFailed = new Array();
var AA_AppId = new Array();

var AA_AllApp = {
	label: 'span[id^=app_][id$=_label]',
	title: 'Other requests'
}


// Utilities
function AA_LoadScript(src)
{
	var AA_script = document.createElement('script');
	AA_script.type = 'text/javascript';
	AA_script.src = src;
	document.getElementsByTagName('head')[0].appendChild(AA_script);
}

function AA_Set(key, val)
{
	window.setTimeout(function(){GM_setValue(key, val);}, 0);
}

function AA_Get(key, deflt)
{
	rtn = GM_getValue(key);
	if (((typeof rtn) == 'undefined') && ((typeof deflt) != 'undefined'))
		return deflt;
	return rtn;
}

function AA_Del(key)
{
	GM_deleteValue(key);
}

function AA_LoadJQuery()
{
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(AA_LoadJQuery,100); }
	else { jQuery = unsafeWindow.jQuery; $jQ = jQuery.noConflict(true); AA_StartUp(); }
}

function AA_CreateAppBox()
{
	html = '<div id="aa_app">'
		 + '<h4 class="confirmcount">autoaccept (release ' + AA_Meta['version'] + (AA_Meta['beta']>0?(' beta ' + AA_Meta['beta']):'') + ') is enabled.</h4>'
		 + '<span id="AA_Access"><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=8704955" target="_blank"><b>Donate</b></a> '
		 + '| <a href="#" onclick="javascript:location.reload();return false;">Reload</a> '
		 + '| <a href="http://userscripts.org/scripts/show/59198" target="_blank">Visit autoaccept</a> '
		 + '| <span id="aa_upgrade"></span> <a href="#" id="aa_autoupdate">Check for newer version.</a><a href="#" id="aa_upgrade" style="display:none">Click to upgrade.</a><span id="aa_notify"></span><br><br></span>'
		 + '<div id="aa_list" style="padding:10px;border:1px solid #c0c0c0;background-color:#ffffe0;"></div><br></div>';
	$jQ(html).insertBefore("div[class=UITwoColumnLayout_Content] > *");
}

function AA_AcceptAll()
{
	section_guid = $jQ(this).attr('sectionguid');
	app_guid = /(\d+)_\d+/.exec(section_guid);
	AA_AcceptLog(section_guid, 'Please wait...');
	AA_ProcessSuccess[section_guid] = 0;
	AA_ProcessFailed[section_guid] = 0;
	AA_ProcessCall[section_guid] = 0;
	AA_Invoke(section_guid);
	return false;
}

function AA_Invoke(section_guid)
{
	AA_ProcessCall[section_guid]++;
	if (AA_KnownApp[AA_AppId[section_guid]].remote)
		req = $jQ('div[id^=app_' + section_guid + '_][class=confirm]:first');
	else
		req = $jQ('div[id^=' + section_guid + '_][class=confirm]:first');
	if (req.length > 0)
	{
		eval(req.attr('confirm_handler'));
	}
}

function AA_DecodeURL(url)
{
	url = url.replace(/&amp;/g, '&');
	return url;
}

function AA_CheckSuccess(html, preg)
{
	return (preg.exec(html) !== null);
}

function AA_AcceptLog(section_guid, msg)
{
	app_key = AA_AppId[section_guid];
	$jQ('span#aa_log_' + app_key).html(msg);
}

function AA_Remote(url, callback, additional_headers)
{
	var hd = {
				'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9.1.3) Gecko/20090824 Firefox/3.5.3',
				'Accept': 'text/html'
			 };
	$jQ.extend(hd, additional_headers);
	url = AA_DecodeURL(url);
	window.setTimeout(function(){
		GM_xmlhttpRequest(
		{
			method:"GET", 
			url: url, 
			headers : hd, 
			onload : function(responseDetails)
			{
				redir = /location\.replace\(\"([^\"]+)\"\)/.exec(responseDetails.responseText);
				if (redir) // follow link
				{
					mheader = {'Referer': url};
					AA_Remote(redir[1].replace(/\\/g,''), callback, mheader);
				}
				else
				{
					redir = /location\.href\s*=\s*\"([^\"]+)\";/.exec(responseDetails.responseText);
					if (redir) // follow link
					{
						mheader = {'Referer': url};
						AA_Remote(redir[1].replace(/\\/g,''), callback, mheader);
					}
					else
					{
						if(typeof callback == 'function')
							callback(responseDetails.responseText);
					}
				}
			}
		});
	}, 0);
}

function AA_handle_request_click(obj_type,obj_id,action)
{
	var params=unsafeWindow.get_additional_request_params(obj_type,obj_id,action);
	unsafeWindow.update_request_status_msg(obj_type,obj_id,unsafeWindow._tx('Loading...'));
	unsafeWindow.hide_metadata_on_request_action(obj_type,obj_id);
	new unsafeWindow.AsyncRequest().setURI('\/ajax\/reqs.php').setData(
		{
			'type':obj_type,
			'id':obj_id,
			'action':action,
			params:params
		}).setHandler(
			function(response){
				unsafeWindow.handle_async_response(obj_type,obj_id,response.getPayload());
				if (response.getError() == 0)
				{
					AA_ProcessSuccess[section_guid]++;
					track = '(' + AA_ProcessSuccess[section_guid] + '/' + AA_ProcessCall[section_guid] + ')';
					AA_AcceptLog(section_guid, 'Success...' + track);
				}
				else
				{
					AA_ProcessFailed[section_guid]++;
					track = '(' + AA_ProcessSuccess[section_guid] + '/' + AA_ProcessCall[section_guid] + ')';
					AA_AcceptLog(section_guid, 'Failed...' + track);
				}
				$jQ('span#req_count_' + section_guid).html(parseInt($jQ('span#req_count_' + section_guid).text()) - 1);

				if ((parseInt($jQ('span#req_count_' + section_guid).text()) <= 0)
					|| ((AA_KnownApp[AA_AppId[section_guid]].limit > 0)
						&& (AA_ProcessCall[section_guid] >= AA_KnownApp[AA_AppId[section_guid]].limit)))
				{	// nothing to be done || limit reach
					track = '(' + AA_ProcessSuccess[section_guid] + '/' + AA_ProcessCall[section_guid] + ')';
					AA_AcceptLog(section_guid, 'All Done.' + track);
					$jQ('input[name=aa_acceptall][sectionguid=' + section_guid + ']').hide();
					return;
				}

				AA_Invoke(AA_KnownApp[AA_AppId[section_guid]].section_guid);

			}
		).send();
}

function AA_click_add_platform_app(req_id,app_id,type_index,from_id,is_invite,req_type,url)
{
	var obj_type='app_'+app_id+'_'+type_index;
	unsafeWindow.update_request_status_msg(obj_type,req_id,unsafeWindow._tx("Loading..."));
	new unsafeWindow.AsyncRequest().setURI('/ajax/reqs.php').setData(
		{
			'type':'platform_request',
			'id':req_id,
			'action':(url?'accept':'reject'),
			'params':
				{
					'from_id':from_id,
					'req_type':req_type,
					'app_id':app_id,
					'is_invite':is_invite
				}
		}).setHandler(
			function(response){
				if(url)
				{	// interrupt goes here
					section_guid = app_id + '_' + type_index;
					track = '(' + AA_ProcessSuccess[section_guid] + '/' + AA_ProcessCall[section_guid] + ')';
					AA_AcceptLog(section_guid, 'Accepting request...' + track);
					AA_Remote(url, function(msg){
						AA_AcceptLog(section_guid, 'Checking response...' + track);
						rtn = AA_CheckSuccess(msg, AA_KnownApp[AA_AppId[section_guid]].success);
						if (rtn)
						{
							AA_ProcessSuccess[section_guid]++;
							track = '(' + AA_ProcessSuccess[section_guid] + '/' + AA_ProcessCall[section_guid] + ')';
							AA_AcceptLog(section_guid, 'Success...' + track);
							unsafeWindow.update_request_status_msg(obj_type,req_id,'autoaccept &gt; Success.',true);
						}
						else
						{
							AA_ProcessFailed[section_guid]++;
							track = '(' + AA_ProcessSuccess[section_guid] + '/' + AA_ProcessCall[section_guid] + ')';
							AA_AcceptLog(section_guid, 'Failed...' + track);
						}
						$jQ('span#req_count_' + section_guid).html(parseInt($jQ('span#req_count_' + section_guid).text()) - 1);

						if ((parseInt($jQ('span#req_count_' + section_guid).text()) <= 0)
							|| ((AA_KnownApp[AA_AppId[section_guid]].limit > 0)
								&& (AA_ProcessCall[section_guid] >= AA_KnownApp[AA_AppId[section_guid]].limit)))
						{	// nothing to be done || limit reach
							track = '(' + AA_ProcessSuccess[section_guid] + '/' + AA_ProcessCall[section_guid] + ')';
							AA_AcceptLog(section_guid, 'All Done.' + track);
							$jQ('input[name=aa_acceptall][sectionguid=' + section_guid + ']').hide();
							return;
						}

						AA_Invoke(AA_KnownApp[AA_AppId[section_guid]].section_guid);
					});
				}
				else
				{	// go nowhere
					unsafeWindow.handle_async_response(obj_type,req_id,response.getPayload());
				}
			}
		).send();
}

function AA_AutoUpdate(c)
{
	if (c == 0)
	{
		$jQ('a[id=aa_autoupdate]').hide();
		$jQ('a[id=aa_upgrade]').hide();
		$jQ('span[id=aa_upgrade]').html('Checking for newer version...');
		$jQ('span[id=aa_notify]').html('');
		AA_xmlhttpRequest(
			{
				method:'get', 
				url: AA_Meta.meta, 
				onload:function(r)
					{
						s = r.responseText;
						if( m = /@version\s+(\S+)/.exec(s))
						{
							rV = parseInt(m[1]);
							if (rV <= AA_Meta.version)
							{
								$jQ('span[id=aa_upgrade]').html('You have the latest version.');
								$jQ('a[id=aa_autoupdate]').html('Recheck for newer version.').show();
							}
							else
							{
								$jQ('span[id=aa_upgrade]').html('New version (release ' + rV + ') is available.');
								$jQ('a[id=aa_autoupdate]').hide();
								$jQ('a[id=aa_upgrade]').show();
								$jQ('span[id=aa_notify]').html('<br><span style="color:red">* Refresh this page to reload the script once the installation has been done. *</span>');
							}
						}
					}
			});
	}
	else
	{
		window.location.href = AA_Meta.src;
	}
	return false;
}

function AA_xmlhttpRequest(options)
{
	window.setTimeout(function(){GM_xmlhttpRequest(options);}, 0);
}


// Load whatever you want
AA_LoadScript('http://code.jquery.com/jquery-latest.min.js');
AA_LoadJQuery();


// The show begins
function AA_StartUp()
{
	AA_CreateAppBox();
	$jQ('a[id=aa_autoupdate]').click(function(){AA_AutoUpdate(0);});
	$jQ('a[id=aa_upgrade]').click(function(){AA_AutoUpdate(1);});

	// Retrieve all apps count
	AA_AllApp['req_count'] = $jQ('div[class=confirm]').length;

	// Retrieve all known apps
	for (kapp in AA_KnownApp)
	{
		aa_label = $jQ(AA_KnownApp[kapp].label);
		aa_remote = AA_KnownApp[kapp].remote;
		if (aa_label.length > 0)
		{
			if (aa_remote)
			{
				section_guid = /app_(\d+_\d+)_label/.exec(aa_label.attr("id"));
				app_guid = /(\d+)_\d+/.exec(section_guid[1]);
				AA_AppId[section_guid[1]] = kapp;
				req = $jQ('div[id^=app_' + section_guid[1] + '_][class=confirm]');
				AA_KnownApp[kapp]['req_count'] = req.length;
				AA_KnownApp[kapp]['section_guid'] = section_guid[1];
				AA_KnownApp[kapp]['app_id'] = app_guid;
				req.each(function(){
					on_click = /onclick=\"(return click_add_platform_app[^\"]+)\"/.exec($jQ(this).html());
					new_on_click = on_click[1].replace('return click_add_platform_app', 'AA_click_add_platform_app');
					$jQ(this).attr('confirm_handler', new_on_click);
				});
			}
			else
			{
				//
				section_guid = /^(.+)_label/.exec(aa_label.attr('id'));
				app_guid = section_guid[1];
				AA_AppId[section_guid[1]] = kapp;
				req = $jQ('div[id^=' + section_guid[1] + '_][class=confirm]');
				AA_KnownApp[kapp]['req_count'] = req.length;
				AA_KnownApp[kapp]['section_guid'] = section_guid[1];
				AA_KnownApp[kapp]['app_id'] = app_guid;
				req.each(function(){
					on_click = /onclick=\'(handle_request_click[^\']+)\'/.exec($jQ(this).html());
					new_on_click = on_click[1].replace('handle_request_click', 'AA_handle_request_click');
					$jQ(this).attr('confirm_handler', new_on_click);
				});
			}
		}
		else
		{
			AA_KnownApp[kapp]['req_count'] = 0;
		}
	}

	// Display request information
	html_frag = '';
	kreq_count = 0;
	for (kapp in AA_KnownApp)
	{
		if (AA_KnownApp[kapp].req_count > 0)
		{
			html_frag += '<tr><td><a href="#confirm_' + AA_KnownApp[kapp].section_guid + '">' + AA_KnownApp[kapp].title + '</a> <b>(<span id="req_count_' + AA_KnownApp[kapp].section_guid + '">' + AA_KnownApp[kapp].req_count + '</span>)</b> <input type="button" class="inputbutton" value="' + AA_KnownApp[kapp].accept + '" name="aa_acceptall" sectionguid="' + AA_KnownApp[kapp].section_guid + '"> <span id="aa_log_' + kapp + '"></span></td></tr>';
			kreq_count += AA_KnownApp[kapp].req_count;
		}
	}
	html_frag += '<tr><td>' + AA_AllApp.title + ' <b>(' + (AA_AllApp.req_count - kreq_count) + ')</b></td></tr>';
	html_frag = '<table cellspacing="2">' + html_frag + '</table>';
	$jQ('div#aa_list').html(html_frag);
	$jQ('input[name=aa_acceptall]').click(AA_AcceptAll);
}