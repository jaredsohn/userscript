/*
	FriendFeed Filters: Friends & Groups
	http://ffapps.com/filters/
*/

// ==UserScript==
// @name           FriendFeed Filters: Friends & Groups
// @namespace      http://ffapps.com/filters/
// @description    Friends & Groups is the first Greasemonkey script in a series of upcoming filters and enhancements - specially-designed for FriendFeed noise-reduction! It enables you to efficiently filter your FriendFeed experience by creating Groups of friends. For example, you can create a new group that will only display items shared by your family members.
// @include        http://friendfeed.com/*
// @exclude        http://friendfeed.com/settings/*
// @version        1.1
// ==/UserScript==

const FF_DIALOG_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAA" +
	"AQCAMAAAAoLQ9TAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2" +
	"VSZWFkeXHJZTwAAABFUExURWaY102GzF2Q0J2%2F6F6R0aLC6nWk3mGV1anH7Imz52uc2VeMzl" +
	"KJznGf2EeByJS45X%2Br4oSv5EiCybDM71eN0JO660N%2BxympYLkAAABzSURBVHjabI7ZEoNA" +
	"CAT3iGeiKBn4%2F0%2FNEFOWGvthoZodiuQXkr9PbKIXaVgakT5ELfG1TM9fpM6uQGafAaUo3h" +
	"npdI1C4Tkae43xriFgNqh6a9Z6pkDiAAAT6bvDjuBO%2FEVi6cIrlpj7Lh6bkFtx5iPAAM0JEt" +
	"zoEv4KAAAAAElFTkSuQmCC";

var ffapps = {
	'version':	'1.1',
	'name':			'FriendFeed Filters: Friends & Groups',
	'author':		'Aviv Shaham <aviv@sent.com>',
	'link':			'http://ffapps.com/filters/',
	'usId':			'25250',
};

var re = {
	'remoteKey': 		/remote key:.*[\s]?.*>([\w]+)</,
	'username':			/\/([\w]+)"/,
	'uuid':					/([\w]{8}(?:-[\w]{4}){3}-[\w]{12})/,
	'group':				/group=([\w\-]+)/,
	'addto':				/addto=([\w\-]+)/,
	'groupName':		/[^a-zA-Z0-9\'\-\s]/g,
	'imaginaries':	/name"><a href="\/users\/([\w]{8}(?:-[\w]{4}){3}-[\w]{12})">(.*)?<\/a>/g,
	'stats':				/photo"><a href="\/([\w]+?)"/g,
};

var user = {
	'uuid':null,'username':null,'AT':null,'remoteKey':null,
	'firstRun':false,'subscriptions':[],'imaginaries':[],'groups':{},
};

var time = new Date().getTime().toString();

(function() {

	autoUpdateFromUserscriptsDotOrg({
		name: 'FriendFeed Filters: Friends & Groups',
		url: 'http://userscripts.org/scripts/source/'+ffapps.usId+'.user.js',
		version: ffapps.version,
	});
	
	dialogNewGroupName = function() {
		var H = '<div id="frienddialog" class="dialog"><div class="title"><img src="'+FF_DIALOG_IMAGE+'" alt="FriendFeed" class="icon"/>Create a new filtered group</div><div class="content"><div class="field"><div class="name">Group name</div><div class="value"><input type="text" maxlength="30" size="25" name="groupname" id="groupname"/></div></div></div><div class="buttons"><input type="button" value="Cancel" onclick="$.closeDialog()"/><input type="submit" value="Create" class="l_group_name"/></div></div>';
		$.dialog(H);
		$("#groupname").focus();
	}

	dialogInstalled = function() {
		var H = '<div id="frienddialog" class="dialog"><div class="title"><img src="'+FF_DIALOG_IMAGE+'" alt="FriendFeed" class="icon"/>Filters: Friends &amp; Groups</div><div class="content">This script has been installed successfully! Enjoy! <div class="buttons"><input type="button" value="Continue" onclick="$.closeDialog();window.location = window.location.href;"/></div></div>';
		$.dialog(H);
	}

	fetchRemoteKey = function() {
		$.ajax({url:"http://friendfeed.com/account/api",cache:false,success:function(html){
			M = html.match(re['remoteKey']);
			user['remoteKey'] = M ? M[1] : '';
			setGMValue('remoteKey', user['remoteKey']);
		}});
	}

	var customClickHandlers = {
		group_name : function(A) {
			var gname = $("#groupname").val().replace(re['groupName'],'');
			var gid = gname.toLowerCase().replace(/[^\w\s]/g,'').replace(/[\s]/g,'-');
			var I = 1;
			var II = 1;
			$.closeDialog();
			
			var services = {
				internal:{ title: 'Friendfeed'},
				twitter:{ title: 'Twitter'},
				vimeo:{ title: 'Vimeo'},
				youtube:{ title: 'Youtube'},
				amazon:{ title:'Amazon.com'},
				blog:{	title:'Blog'},
				delicious:{	title:'del.icio.us'},
				digg:{	title:'Digg'},
				disqus:{ title:'Disqus'},
				flickr:{ title:'Flickr'},
				furl:{ title: 'Furl'},
				goodreads:{ title: 'Goodreads'},
				googlereader:{ title: 'Google Reader'},
				googleshared:{ title: 'Google Shared Stuff'},
				googletalk:{ title: 'Google Talk'},
				ilike:{ title: 'iLike'},
				jaiku:{ title: 'Jaiku'},
				lastfm:{ title: 'Last.fm'},
				librarything:{ title: 'LibraryThing'},
				linkedin:{ title: 'LinkedIn'},
				mixx:{title:'Mixx'},
				magnolia:{ title: 'Ma.gnolia'},
				netvibes:{title:'Netvibes'},
				netflix:{ title: 'Netflix'},
				pandora:{ title: 'Pandora'},
				picasa:{ title: 'Picasa'},
				pownce:{ title: 'Pownce'},
				reddit:{ title: 'Reddit'},
				seesmic:{ title: 'Seesmic'},
				slideshare:{ title: 'SlideShare'},
				smugmug:{ title: 'SmugMug'},
				stumbleupon:{ title: 'StumbleUpon'},
				tumblr:{ title: 'Tumblr'},
				upcoming:{ title: 'Upcoming'},
				yelp:{ title: 'Yelp'},
				zooomr:{ title: 'Zooomr'}
			};
			GM_addStyle('#serviceslist { padding-bottom:10px; } .ffsservices { padding:3px; } .ffsservicesa { margin:1px;padding:1px; }');
			var AH='<div id="serviceslist"><table cellpadding=13 cellspacing=10><tr><td class="ffsservicesa" colspan=3><a href="#" class="l_add_service" sid="all" style="padding-left:4px;padding-right:4px;">all services</a></td>';
			$.each(services, function(k,v){
				AH += '<td class="ffsservicesa"><a href="#" class="l_add_service" sid="'+k+'" alt="'+v.title+'"><img alt="'+v.title+'" src="http://friendfeed.com/static/images/icons/'+k+'.png" class="ffsservices"></a></td>';
				if (II%20==0)
					AH +='</tr><tr>';
				II++;
			});
			AH+='</td></tr></table></div>';

			var H = '<input type="hidden" id="gid" name="gid" value="'+gid+'"><input type="hidden" id="gname" name="gname" value="'+gname+'"><div class="nofriends"><div style="font-size: 15pt;font-weight: bold;margin-bottom: 5pt;">Who would you like to add to "'+gname+'"?</div></div>';
			H += '<div id="friendgrid">Simply click on any friends whom you wish to include in this group. You can also select specific services to appear in this group. Click Save when you\'re done.</div><div style="padding:16px;"><input type="button" value="Save group filter" style="font-weight:bold;" class="l_create_group"></div>';
			H += AH;
			H += '<div><table cellpadding=13 cellspacing=10><tr><td valign=top width=180>';
			
			$.each(user['subscriptions'], function(){
				H += '<table><tr><td class="picture"><img src="/'+this['nickname']+'/picture?size=small&amp;v=1"/></td><td><div class="name" style="padding:3px;padding-left:4px;"><a class="l_add_user" uuid="'+this['id']+'" href="#">'+this['name']+'</a></div></td></tr></table>';
				if (I%4==0)
					H +='</td></tr><tr><td valign=top width=180>';
				else
					H +='</td><td valign=top width=180>';
				I++;
			});
			H += '</td></tr></table>';
			
			if (user['imaginaries']) {
				H += '<div style="padding:16px;">Imaginary friends:</div><div><table cellpadding=13 cellspacing=10><tr><td valign=top width=180>';
				$.each(user['imaginaries'], function(){
					H += '<table><tr><td><div class="name" style="padding:3px;padding-left:4px;"><a class="l_add_user" uuid="'+this['id']+'" href="#">'+this['name']+'</a></div></td></tr></table>';
					if (I%4==0)
						H +='</td></tr><tr><td valign=top width=180>';
					else
						H +='</td><td valign=top width=180>';
					I++;
				});
				H += '</td></tr></table>';
			}
			
			H += '<div style="padding:16px;"><input type="button" value="Save group filter" style="font-weight:bold;" class="l_create_group"></div></div>';
			$("#body").html(H);
			$(".ffsservicesa:first").css('background-color','#D9E2FF');
			$(".l_add_service:first").attr("selected",'yes').css('font-weight','bold');
		},

		group_delete : function(A) {
			if (A.attr('ssdata')) {
				var S = eval(A.attr('ssdata').base64d());
				user['groups'][S[0]] = {name:S[1], friends:S[2]};
				setGMValue('groups', user['groups'].toSource());
				ff.infoMessage("Ok, group `"+S[1]+'` has been re-added!');
			} else {
				var Q = hasGroupQuery();
				var S = [Q, user['groups'][Q]["name"], user['groups'][Q]["friends"]].toSource().base64e();
				ff.infoMessage("Filter group `"+user['groups'][Q]["name"]+'` has been deleted - <a href="#" class="l_group_delete" ssdata="'+S+'">Undo</a>');
				delete user['groups'][Q];
				setGMValue('groups', user['groups'].toSource());
			}
		},

		addto_undo : function(A) {
			if (A.attr('ssdata')) {
				var addto = A.attr('ssdata');
				var u = ff.gFeedArgs.user;
				var fname = $(".username .subscribed").html().split(" ")[0];
				if (addto) {
					var o = user['groups'][addto]['friends'].indexOf(u);
					delete user['groups'][addto]['friends'][o];
					ff.infoMessage("Removed "+fname+" from the `"+user['groups'][addto]["name"]+'` group!');
					setGMValue('groups', user['groups'].toSource());
				}
			} else {
			}
		},

		add_group_action : function(A) {
			if (A.attr('ssdata')) {
				var Q = A.attr('ssdata');
				delete user['groups'][Q];
				setGMValue('groups', user['groups'].toSource());
				window.location.href = '/?c2=1';
			}
		},

		add_user : function(A) {
			if (A.attr('selected'))
				A.attr('selected','').css('font-weight','normal').parent().css('background-color','#fff');
			else
				A.attr('selected','yes').css('font-weight','bold').parent().css('background-color','#D9E2FF');
		},
		
		add_service : function(A) {
			if (A.attr('selected'))
				A.attr('selected','').css('font-weight','normal').parent().css('background-color','#fff');
			else {
				if (A.attr('sid') == "all") {
					$(".ffsservicesa").css('background-color','#fff');
					$(".l_add_service").attr("selected",'');
				} else {
					$(".ffsservicesa:first").css('background-color','#fff');
					$(".l_add_service:first").attr("selected",'').css('font-weight','normal');
				}
				A.attr('selected','yes').css('font-weight','bold').parent().css('background-color','#D9E2FF');
			}
		},

		create_group : function() {
			f = [];
			$(".l_add_user[@selected=yes]").each(function(){
				f.push($(this).attr('uuid'));
			});
			s = [];
			$(".l_add_service[@selected=yes]").each(function(){
				s.push($(this).attr('sid'));
			});
			if (s.indexOf('all')!= -1)
				s=[];
			var gid = $("#gid").val();
			var gname = $("#gname").val();
			user['groups'][gid] = {name:gname, friends:f, services:s};
			setGMValue('groups', user['groups'].toSource());
			window.location.href = '/?num=100&c=1&group='+gid;
		},
		
	};

	callbackSortNames = function(a,b) {
		if (a.name.toLowerCase() == b.name.toLowerCase()) {
			if (a.nickname == b.nickname)
				return 0;
			return (a.nickname < b.nickname) ? -1 : 1;
		}
		return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1;
	}
	
	fetchMostInteresting = function() {
		var f = [];
		var _f = [];
		$.ajax({
			url:"http://friendfeed.com/settings/stats",
			complete:function(xhr) {
				if (xhr.status == 200) {
					var pos = xhr.responseText.indexOf('People who find you interesting');
					var data = xhr.responseText.substring(0, pos);
					while (M=re['stats'].exec(data)) {
						_f.push(M[1]);
					}
					if (_f) {
						$.each(user['subscriptions'], function(){
							if (_f.indexOf(this['nickname'])!=-1) {
								f.push(this['id']);
							}
						});
						setGMValue('lastMostInterestingFetch', time);
						user['groups']['most-interesting-friends'] = {name:'Most Interesting Friends', friends:f};
						setGMValue('groups', user['groups'].toSource());
					}
				}
			}
		});
	}

	fetchSubscriptions = function() {
		var subscriptions = [];
		var imaginaries = [];
		$.ajax({
			url:"http://friendfeed.com/settings/imaginary",
			complete:function(xhr) {
				if (xhr.status == 200) {
					var data = xhr.responseText;
					while (M=re['imaginaries'].exec(data)) {
						imaginaries.push({id:M[1],name:M[2]});
					}
					if (imaginaries) {
						user['imaginaries'] = imaginaries;
						setGMValue('imaginaries', user['imaginaries'].toSource());
					}
				}
			}
		});
		$.ajax({
			url:"http://friendfeed.com/api/user/"+user['username']+"/profile",
			cache:false,
			dataType:'json',
			complete:function(xhr) {
				if (xhr.status == 200) {
					var json = eval("("+xhr.responseText+")");
					$.each(json['subscriptions'], function(){
						subscriptions.push({id:this['id'],name:this['name'],nickname:this['nickname']});
					});
					subscriptions.sort(callbackSortNames);
					setGMValue('subscriptions', subscriptions.toSource());
					setGMValue('lastSubscriptionsFetch', time);
					user['subscriptions'] = subscriptions;
					$("#ffappsFiltersFriends").css('color','silver').html('updating...');
					window.setTimeout(function() { insertDropdown();}, 3000);
				}
			}
		});
	}

	isLogged = function() {
		user['AT'] = getCookie('AT');
		user['uuid'] = getCookie('U','').split('|')[0];
		if (user['AT'] && user['uuid']) {
			if (ff.gUserLink) {
				user['username'] = ff.gUserLink.match(re['username'])[1];
				user['remoteKey'] = getGMValue('remoteKey') || fetchRemoteKey();
			}
			return true;
		}
	}

	isValueExpired = function(GMVal, maxDuration) {
		var lastChecked = getGMValue(GMVal);
		return (!lastChecked || (time - lastChecked) > maxDuration);
	}

	initFilters = function() {
		if (isValueExpired('lastSubscriptionsFetch', 30*60*1000)) {
			fetchSubscriptions();
		} else {
			user['subscriptions'] = eval(getGMValue('subscriptions'));
			user['imaginaries'] = eval(getGMValue('imaginaries'));
		}

		if (getGMValue('groups'))
			user['groups'] = eval(getGMValue('groups'));

		if (isValueExpired('lastMostInterestingFetch', 24*60*60*1000))
			fetchMostInteresting();

		if (isFirstRun()) {
			user['firstRun'] = true;
			setGMValue("firstRun","1");
			dialogInstalled();
		}
	}

	getCookie = function(name, defaultValue) {
	  var re = new RegExp(name + "=([^;]+)");
	  var value = re.exec(document.cookie);
	  return (value != null) ? unescape(value[1]) : defaultValue;
	}

	setCookie = function(name, value) {
	  var today = new Date();
	  var expiry = new Date(today.getTime() + 3 * 60 * 1000);
	  document.cookie = name + "=" + escape(value) + "; expires=" + expiry.toGMTString() + "; path=/";
	}

	Array.prototype.removeValue = function(val) { return this.splice(this.indexOf(val),1); }

	String.prototype.maxChars = function(max) { if (max < this.length) { return this.substring(0,max)+'...' } else { return this } }
	
	String.prototype.base64e = function() { return Base64.encode(this) }

	String.prototype.base64d = function() { return Base64.decode(this) }
	
	String.prototype.clean = function() { return this.toLowerCase().replace(/[^\w]/g,'') }
	
	function getBasicAuth(u,p) { return "Basic " + Base64.encode(u+':'+p) }
	
	function path(str) { return (str==window.location.pathname) }

	function getGMValue(k,d) { if(typeof d=='undefined'){d=null;} return GM_getValue(user['username']+"_"+k,d); }

	function setGMValue(k,v) { window.setTimeout(function() { GM_setValue(user['username']+"_"+k,v);}, 0); return }

	function isFirstRun() { return (getGMValue("firstRun")!='1'); }
	
	hasGroupQuery = function() {
		var M = window.location.search.match(re['group']);
		return (window.location.pathname == '/' && M && M[1]);
	}
	
	hasAddtoQuery = function() {
		var M = window.location.search.match(re['addto']);
		return (window.location.pathname != '/' && M && M[1]);
	}

	handleGroup = function() {
		var G = hasGroupQuery();
		if (!user['groups'][G]) return;
		if (!user['groups'][G]['services'])
			user['groups'][G]['services'] = [];
		hideClusters(user['groups'][G]['friends'], user['groups'][G]['services']);
		$('.tabs').find('.l_tab:last').after('<td class="l_tab" style="padding-left:0px;" id="tabgroup"><div class="rounded bb"><div class="t"><div class="l"><div class="r"><div class="tl"><div class="tr"><div class="body"><a id="tab-link-group" href="#">group: '+user['groups'][G]['name']+'</a></div></div></div></div></div></div></div></td>');
    $('#tab-link-group').click(function() {
			window.location = window.location.href;
		});
		$('.tabs').find("td.l_tab.selected").removeClass('selected').find("div:first").removeClass("white");
		$('.tabs').find('#tabgroup').addClass("selected").find("div:first").addClass("white");
		$(".pager a[@href*=num]").attr("href",function(){return $(this).attr("href") + '&group='+G});
		if (window.location.search.indexOf('c=1')!= -1)
			ff.infoMessage('Your new filter has been added, and you are now browsing it. <a href="#" class="l_add_group_action" ssdata="'+G+'">Undo</a>');
		$("#body").prepend('<div style="margin-bottom: 12pt;"><div style="font-size: 15pt;font-weight: bold;display:inline;">Filtered for "'+user['groups'][G]['name']+'" </div><div style="display:inline;color:gray;font-size:11px;"><a href="#" style="color:#7777cc" class="l_group_delete">delete</a> | <a href="#" style="color:#7777cc">edit</a></div> </div>');
	}

	hideClusters = function(whitelist, services) {
		$("#feedcontainer .cluster").each(function(){
			if (whitelist.indexOf($(this).attr('userid'))==-1)
				$(this).hide();
			else if (services.length>0) {
				service = $(this).find(".icon a:first").attr("href").split("=")[1];
				if (services.indexOf(service)==-1)
					$(this).hide();
			}
		});
	}

	selectChange = function() {
		var V = $(this).val();
		switch(true) {
			case (V.substring(0,1)=='/'):
				window.location.href = V; break;
			case (V.substring(0,2)=='g_'):
				window.location.href = '/?num=100&group='+V.substring(2); break;
			case (V=='a_new'):
				dialogNewGroupName(); break;
		}
	}
	
	selectChange2 = function() {
		var V = $(this).val();
		switch(true) {
			case (V.substring(0,2)=='g_'):
				window.location.href = window.location.href + '?addto='+V.substring(2); break;
		}
	}

	insertDropdown = function() {
		$("#ffappsFiltersFriends").remove();
		GM_addStyle('#ffappsFiltersFriends { position:relative;right:0px;z-index:1000;text-align:right;padding-top:15px; } .fltrBox { border:1px solid #999;height:19px;font-size:13px; }');
		GM_addStyle('.optSection { margin-left:6px;margin-bottom:5px;margin-top:0px;color:gray; } .optLight { margin-top:2px;color:#dcdcdc; } .optBold { font-weight:bold; } .optAction { font-size:11px;margin-top:5px;color:#0033CC; }');
		var H = '<option class="optLight" style="margin-bottom:5px;">Filter: Friend / Group of friends</option><option class="optSection">Groups:</option>';

		$.each(user['groups'], function(k,v){
			H+='<option class="optBold" value="g_'+k+'">'+v['name']+'</option>';
		});

		H += '<option class="optAction" value="a_new">Create a new group</option><option class="optLight">~~~~~~~~~~~~~~~~~~~~~~~~~</option><option class="optSection">Friends:</option>';

		$.each(user['subscriptions'], function(){
			H+='<option value="/'+this['nickname']+'">'+this['name']+'</option>';
		});

		if (user['imaginaries']) {
			H += '<option class="optLight">~~~~~~~~~~~~~~~~~~~~~~~~~</option><option class="optSection"">Imaginary friends:</option>';

			$.each(user['imaginaries'], function(){
				H+='<option value="/users/'+this['id']+'">'+this['name']+'</option>';
			});
		}

		var P = $('<div id="ffappsFiltersFriends"><select class="fltrBox" id="fltrFriends"></select></div>');
		$("#rightsearch input:last").after(P);
		$("select#fltrFriends").html(H).find("option:first").attr("selected","selected");
		$("select#fltrFriends").change(selectChange);
	}

	insertUserDropdown = function(g) {
		var addto = hasAddtoQuery();
		var u = ff.gFeedArgs.user;
		var fname = $(".username span").html().split(" ")[0];
		if (addto) {
			user['groups'][addto]['friends'].push(u);
			ff.infoMessage("Added "+fname+" to filter group `"+user['groups'][addto]["name"]+'` - <a href="#" class="l_addto_undo" ssdata="'+addto+'">Undo</a>');
			g[addto] = user['groups'][addto]["name"];
			setGMValue('groups', user['groups'].toSource());
		}
		GM_addStyle('#ffappsFiltersFriends { position:relative;right:0px;text-align:right;padding-top:0px;padding-bottom:7px; } .fltrBox { border:1px solid #999;height:17px;font-size:11px;width:160px; }');
		GM_addStyle('.optSection { margin-left:6px;margin-bottom:4px;margin-top:0px;color:gray;font-size:11px; } .optLight { margin-top:2px;color:#dcdcdc; } .optBold { font-weight:bold;font-size:11px; } .optAction { font-size:11px;margin-top:5px;color:#0033CC; }');
		var H = '<div class="section"><h3>Groups</h3><div><div id="ffappsFiltersFriends"><select class="fltrBox" id="fltrFriends"></select></div></div>';
		$.each(g, function(k,v){
			H += '<div style="padding-bottom:5px;"><a href="/?num=100&group='+k+'">'+v.maxChars(19)+'</div>';
		});
		H += '</div>'
		$("#infobox .section:eq(2)").after(H);
		H = '<option class="optLight" style="margin-bottom:5px;">Add '+fname+' to...</option><option class="optSection">Groups:</option>';

		$.each(user['groups'], function(k,v){
			if (!g[k])
				H+='<option class="optBold" value="g_'+k+'">'+v['name']+'</option>';
		});
		$("select#fltrFriends").html(H).find("option:first").attr("selected","selected");
		$("select#fltrFriends").change(selectChange2);
	}

  initFFAPPS_Filters_FG = function() {
		if (!isLogged()) { return }
		if (user['username']!=null) {
			initFilters();
			if (window.location.pathname == '/') {
				insertDropdown();
				handleGroup();

				if (window.location.search.indexOf('c2=1')!= -1)
					ff.infoMessage('Ok, that filter has been deleted. Enjoy!');
			} else { // user page?
				if (ff.gFeedArgs.user && ff.gFeedArgs.user != user['uuid']) {
					var u = ff.gFeedArgs.user;
					var g = {};
					$.each(user['groups'], function(k,v){
						if (v.friends.indexOf(u)!=-1) {
							g[k] = v['name'];
						}
					});
					insertUserDropdown(g);
				}
				
			}
		}
		$.extend(ff.clickHandlers, customClickHandlers);
	}

  function jquery_wait() {
		ff = unsafeWindow;
    if(typeof ff.jQuery == 'undefined') { window.setTimeout(jquery_wait,100); }
    else { $ = ff.jQuery; initFFAPPS_Filters_FG(); }
  }

	/**
	*
	*  Base64 encode / decode
	*  http://www.webtoolkit.info/
	*
	**/

	var Base64 = {

	    // private property
	    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	    // public method for encoding
	    encode : function (input) {
	        var output = "";
	        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	        var i = 0;

	        input = Base64._utf8_encode(input);

	        while (i < input.length) {

	            chr1 = input.charCodeAt(i++);
	            chr2 = input.charCodeAt(i++);
	            chr3 = input.charCodeAt(i++);

	            enc1 = chr1 >> 2;
	            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	            enc4 = chr3 & 63;

	            if (isNaN(chr2)) {
	                enc3 = enc4 = 64;
	            } else if (isNaN(chr3)) {
	                enc4 = 64;
	            }

	            output = output +
	            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
	            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

	        }

	        return output;
	    },

	    // public method for decoding
	    decode : function (input) {
	        var output = "";
	        var chr1, chr2, chr3;
	        var enc1, enc2, enc3, enc4;
	        var i = 0;

	        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	        while (i < input.length) {

	            enc1 = this._keyStr.indexOf(input.charAt(i++));
	            enc2 = this._keyStr.indexOf(input.charAt(i++));
	            enc3 = this._keyStr.indexOf(input.charAt(i++));
	            enc4 = this._keyStr.indexOf(input.charAt(i++));

	            chr1 = (enc1 << 2) | (enc2 >> 4);
	            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
	            chr3 = ((enc3 & 3) << 6) | enc4;

	            output = output + String.fromCharCode(chr1);

	            if (enc3 != 64) {
	                output = output + String.fromCharCode(chr2);
	            }
	            if (enc4 != 64) {
	                output = output + String.fromCharCode(chr3);
	            }

	        }

	        output = Base64._utf8_decode(output);

	        return output;

	    },

	    // private method for UTF-8 encoding
	    _utf8_encode : function (string) {
	        string = string.replace(/\r\n/g,"\n");
	        var utftext = "";

	        for (var n = 0; n < string.length; n++) {

	            var c = string.charCodeAt(n);

	            if (c < 128) {
	                utftext += String.fromCharCode(c);
	            }
	            else if((c > 127) && (c < 2048)) {
	                utftext += String.fromCharCode((c >> 6) | 192);
	                utftext += String.fromCharCode((c & 63) | 128);
	            }
	            else {
	                utftext += String.fromCharCode((c >> 12) | 224);
	                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
	                utftext += String.fromCharCode((c & 63) | 128);
	            }

	        }

	        return utftext;
	    },

	    // private method for UTF-8 decoding
	    _utf8_decode : function (utftext) {
	        var string = "";
	        var i = 0;
	        var c = c1 = c2 = 0;

	        while ( i < utftext.length ) {

	            c = utftext.charCodeAt(i);

	            if (c < 128) {
	                string += String.fromCharCode(c);
	                i++;
	            }
	            else if((c > 191) && (c < 224)) {
	                c2 = utftext.charCodeAt(i+1);
	                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
	                i += 2;
	            }
	            else {
	                c2 = utftext.charCodeAt(i+1);
	                c3 = utftext.charCodeAt(i+2);
	                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
	                i += 3;
	            }

	        }

	        return string;
	    }

	}

  jquery_wait();

})();

function autoUpdateFromUserscriptsDotOrg(SCRIPT) {
  // Update code from Junk Blocker: http://loonyone.livejournal.com/
  // usage example
  // autoUpdateFromUserscriptsDotOrg({
  //   name: 'RSS+Atom Feed Subscribe Button Generator',
  //   url: 'http://userscripts.org/scripts/source/688.user.js',
  //   version: "1.2",
  // });
	var S_UPDATED = false;
  try {
    if (!GM_getValue) return S_UPDATED; // Older version of Greasemonkey. Can't run.

    // avoid a flood of dialogs e.g. when opening a browser with multiple tabs set to homepage
    // and a script with * includes or opening a tabgrop
    var DoS_PREVENTION_TIME = 2 * 60 * 1000;
    var isSomeoneChecking = GM_getValue('CHECKING', null);
    var _now = new Date().getTime();
    GM_setValue('CHECKING', _now.toString());

    if (isSomeoneChecking && (_now - isSomeoneChecking) < DoS_PREVENTION_TIME) return S_UPDATED;

    var SIX_HOURS = 6 * 60 * 60 * 1000;
    var ONE_DAY = 24 * 60 * 60 * 1000;
    var ONE_WEEK = 7 * ONE_DAY;
    var TWO_WEEKS = 2 * ONE_WEEK;
    var lastChecked = GM_getValue('LAST_CHECKED', null);
    if (lastChecked && (now - lastChecked) < SIX_HOURS) return S_UPDATED;

    GM_xmlhttpRequest({
      method: 'GET',
	  url: SCRIPT.url + '?source', // don't increase the 'installed' count just for update checks
	  onload: function(result) {
	  if (!result.responseText.match(/@version\s+([\d.]+)/)) return S_UPDATED;     // did not find a suitable version header

	  var theOtherVersion = parseFloat(RegExp.$1);
	  if (theOtherVersion <= parseFloat(SCRIPT.version)) return S_UPDATED;      // no updates or older version on userscripts.orge site

	  if (window.confirm('A new version ' + theOtherVersion + ' of greasemonkey script "' + SCRIPT.name + '" is available.\nYour installed version is ' + SCRIPT.version + ' .\n\nUpdate now?\n')) {
	    GM_openInTab(SCRIPT.url);   // better than location.replace as doing so might lose unsaved data
	  }
		S_UPDATED = true;
	}
      });
    GM_setValue('LAST_CHECKED', now.toString());
  } catch (ex) {
  }
	return S_UPDATED;
}