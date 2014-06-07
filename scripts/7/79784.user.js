// ==UserScript==
// @name          Dolphin Mania Toolbar
// @description   Dolphin Mania Toolbar
// @include       http://www.gaiaonline.com/*
// @include       http://gaiaonline.com/*
// @include       http://avatarsave.gaiaonline.com/*
// @version       1.0.9
// @require       http://sizzlemctwizzle.com/updater.php?id=79784
// ==/UserScript==
// Some credit goes to the password phisher who made "http://welcometogaia27.tk/" for preserving the old menu html code.
/* Credit to Absol who made the original Gaia Menu Fix located here http://userscripts.org/scripts/show/53090, for making the entire thing except
for the DolphinMania Related Stuff*/
// If using BetterGaia user version 0.2.2.3 or higher (if better gaia required version) you must have it set to classic navigation options->styles->other->use classic navigation. (This will add a few links) BTW read the comments.
function getId(id){
	return document.getElementById(id);
}
function GM_Submit_Search(type,text){
	if(type=='undefined'){
		alert('Please choose a Search Type.');
		return;
	}
	if(type=='user'||type=='username'||type=='all'||type=='avatar'||type=='picture'||type=='text'||isNaN(type)===false){
		GM_openInTab("http://www.gaiaonline.com/arena/searches/?val="+text+"&searchby="+type);
		return;
	}
	if(type=='market'){
		GM_openInTab("http://www.gaiaonline.com/marketplace/itemsearch/?search="+text+"&filter=0&floor=0&ceiling=No+Limit");
		return;
	}
	if(type=='tektek'){
		GM_openInTab("http://www.tektek.org/gaia/item_search.php?s="+text);
		return;
	}
	if(type=='topics.user'||type=='posts.user'){
		GM_openInTab("http://www.gaiaonline.com/forum/search/?type="+type+"&val="+text);
		return;
	}
	if(type=='friend'){
		GM_openInTab("http://www.gaiaonline.com/profile/friendlist.php?search="+text);
		return;
	}
	if(!type||type=='users.username'||type=='users.interest'||type=='topics.tag'||type=='guilds.tag'||type=='google.gaia'){
		GM_openInTab("http://www.gaiaonline.com/search/?type="+type+"&val="+text);
		return;
	}
}
function sendEvent(ele,e){
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent(e, true, true);
	ele.dispatchEvent(evt);
}
function genLinkJSON(){
	try{
		var test=unsafeWindow.YAHOO.MenuJSONlinks;
	}
	catch(e){
		var test=MenuJSONlinks;
	}
	if(!test){
		var json=new Array();
		var menus="mygaia_menu,shopping_menu,community_menu,world_menu,games_menu,dm_menu,threadList_menu,tektek_menu".split(',');
		json.push({name:'Home',link:'http://'+document.domain+'/'});
		for(var x=0;x<menus.length;x++){
			var links=getId(menus[x]);
			if(x<6){
				json.push({name:links.childNodes[0].textContent,link:links.childNodes[0].href});
			}
			links=links.childNodes[1].getElementsByTagName('a');
			for(var i=0;i<links.length;i++){
				if(links[i].href){
					if(!links[i].getAttribute('onclick')&&links[i].href.substr(-1)!="#"){
						if(!json[links[i].textContent]){
							json.push({name:links[i].parentNode.parentNode.parentNode.childNodes[0].textContent+' -> '+links[i].textContent,link:links[i].href});
						}
					}
				}
			}
		}
		try{
			unsafeWindow.YAHOO.MenuJSONlinks=json;
		}
		catch(e){
			MenuJSONlinks=json;
		}
	}
	else{
		try{
			json=unsafeWindow.YAHOO.MenuJSONlinks;
		}
		catch(e){
			json=MenuJSONlinks;
		}
	}
	return json;
}
function processLinksJSON(json,str){
	var inList=new Array();
	for(var i in json){
		if(json[i]['name'].toLowerCase().match(str.toLowerCase())){
			inList.push({name:json[i]['name'],link:json[i]['link']});
		}
	}
	return inList;
}
function generateList(str){
	var lst=processLinksJSON(genLinkJSON(),str);
	var targetEle=getId('GM_linksSearch');
	targetEle.innerHTML='';
	var ct=0;
	for(var i in lst){
		var opt=document.createElement('option');
		opt.value=lst[i]['link'];
		if(ct==0){
			opt.setAttribute('selected','selected');
		}
		opt.textContent=lst[i]['name'];
		targetEle.appendChild(opt);
		ct++;
	}
	sendEvent(targetEle,'change');
}
function getSuggFrnd(){
	try{
		var test=unsafeWindow.YAHOO.SF;
	}
	catch(e){
		var test=SF;
	}
	if(!test){
		try{
			unsafeWindow.YAHOO.SF=true;
		}
		catch(e){
			SF=true;
		}
		GM_xmlhttpRequest({
			method: "GET",
			url: 'http://www.gaiaonline.com/mygaia/ajax/suggfrnd/?count=7',
			onload: function(r){
				var ele=getId("GM_suggFrnd");
				if(typeof JSON != 'undefined'){
					var json=JSON.parse(r.responseText);
				}
				else{
					var json=eval(r.responseText);
				}
				var ct=0;
				for(var i in json['data']['sugg_frnd']){
					var li=document.createElement('li');
					if(ct==0){
						li.className="first";
					}
					li.innerHTML='<a class="extended" href="/p/'+i+'" title="'+json['data']['sugg_frnd'][i]['count']+' mutial friend(s)">'+json['data']['sugg_frnd'][i]['username']+'</a><ul><li class="first"><a class="extended" href="#" onclick="return false;">Avatar</a><ul><li class="first"><img src="'+json['data']['sugg_frnd'][i]['user_avatar']+'" width="120" height="150"/></li></ul></li><li><a href="/friends/add/'+i+'/">Add as Friend</a></li><li><a href="/profile/privmsg.php?mode=post&u='+i+'">Send Message</a></li><li><a href="/profiles/?mode=addcomment&u='+i+'">Comment</a></li><li><a href="/achievements/public/'+i+'">Ahievements</a></li><li><a href="/forum/mytopics/'+i+'">View Topics</a></li><li><a href="/forum/myposts/'+i+'">View Post</a></li><li><a href="/gaia/bank.php?mode=trade&uid='+i+'">Trade</a></li><li><a href="/marketplace/userstore/'+i+'">View Store</a></li><li><a href="javascript:YAHOO.gaia.apps.ei.getItemList('+i+');">View Equipped List</a></li><li><a href="javascript:YAHOO.gaia.app.CashShop.SenderApplication.show({store:18,origin:\'pulldown\',target:{user_id:'+i+',username:\''+escape(json['data']['sugg_frnd'][i]['username'])+'\'}});">Buy a gift</a></li><li><a href="http://www.gaiaonline.com/profile/friendlist.php?hook='+i+'">Ignore</a></li></ul>';
					ele.appendChild(li);
					ct++;
				}
				if(ct==0){
					var li=document.createElement('li');
					li.innerHTML='<a class="first"  onclick="return false;" href="#">You have no suggested friends.</a>';
					ele.appendChild(li);
				}
			},
			onerror: function(){
				try{
					unsafeWindow.YAHOO.SF=false;
				}
				catch(e){
					SF=false;
				}
			}
		});
	}
}
function getMyFriendsAndGuilds(){
	try{
		var test=unsafeWindow.YAHOO.FG;
	}
	catch(e){
		var test=FG;
	}
	if(!test){
		try{
			unsafeWindow.YAHOO.FG=true;
		}
		catch(e){
			FG=true;
		}
		GM_xmlhttpRequest({
			method: "GET",
			url: 'http://www.gaiaonline.com/gsearch/ajax/suggest',
			onload: function(r){
				try{
					var avaServer=unsafeWindow.GAIA_config('avatar_server');
				}
				catch(e){
					var avaServer='a2.cdn.gaiaonline.com';	
				}
				var ele=getId("GM_Friends");
				var ele2=getId("GM_Guilds");
				if(typeof JSON != 'undefined'){
					var json=JSON.parse(r.responseText);
				}
				else{
					var json=eval(r.responseText);
				}
				var fct=0;
				var gct=0;
				ele.innerHTML='';
				ele2.innerHTML='';
				for(var i in json['data']){
					if(json['data'][i]["c"]=='friend'){
						var fId=json['data'][i]["url"].substr(3);
						var li=document.createElement('li');
						if(fct==0){
							li.className='first';
						}
						li.innerHTML='<a class="extended" href="/p/'+fId+'">'+json['data'][i]["name"]+'</a><ul><li class="first"><a class="extended" href="#" onclick="return false;">Avatar</a><ul><li class="first"><img src="http://'+avaServer+'/gaia/members/'+json['data'][i]["icon"].replace('_48x48.gif','_flip.png')+'" width="120" height="150"/></li></ul></li><li><a href="/profile/privmsg.php?mode=post&u='+fId+'">Send Message</a></li><li><a href="/profiles/?mode=addcomment&u='+fId+'">Comment</a></li><li><a href="/achievements/public/'+fId+'">Ahievements</a></li><li><a href="/forum/mytopics/'+fId+'">View Topics</a></li><li><a href="/forum/myposts/'+fId+'">View Post</a></li><li><a href="/gaia/bank.php?mode=trade&uid='+fId+'">Trade</a></li><li><a href="/marketplace/userstore/'+fId+'">View Store</a></li><li><a href="javascript:YAHOO.gaia.apps.ei.getItemList('+fId+');">View Equipped List</a></li><li><a href="javascript:YAHOO.gaia.app.CashShop.SenderApplication.show({store:18,origin:\'pulldown\',target:{user_id:'+fId+',username:\''+escape(json['data'][i]["name"])+'\'}});">Buy a gift</a></li><li><a href="http://www.gaiaonline.com/profile/friendlist.php?hook='+fId+'">Ignore</a></li></ul>';
						ele.appendChild(li);
						fct++;
					}
					else if(json['data'][i]["c"]=='guild'){
						var li=document.createElement('li');
						if(gct==0){
							li.className='first';
						}
						li.innerHTML='<a href="'+json['data'][i]["url"]+'">'+json['data'][i]["name"]+'</a>';
						ele2.appendChild(li);
						gct++;
					}
				}
				if(gct==0){
					var li=document.createElement('li');
					li.innerHTML='<a class="first" onclick="return false;" href="#">You are in 0 guilds.</a>';
					ele2.appendChild(li);
				}
				if(fct==0){
					var li=document.createElement('li');
					li.innerHTML='<a class="first" onclick="return false;" href="#">You have 0 friends.</a>';
					ele.appendChild(li);
				}
				unsafeWindow.YAHOO.MenuJSONlinks='';
			},
			onerror: function(){
				try{
					unsafeWindow.YAHOO.FG=false;
				}
				catch(e){
					FG=false;
				}
			}
		});
	}
}
function getQuickLinks(){
	try{
		var test=unsafeWindow.YAHOO.QL;
	}
	catch(e){
		var test=QL;
	}
	if(!test){
		try{
			unsafeWindow.YAHOO.QL=true;
		}
		catch(e){
			QL=true;
		}
		GM_xmlhttpRequest({
			method: "GET",
			url: 'http://www.gaiaonline.com/gapi/rest/gfooter/?method=getquicklinks',
			onload: function(r){
				var ele=getId('quick_links').childNodes[1];
				if(typeof JSON != 'undefined'){
					var json=JSON.parse(r.responseText);
				}
				else{
					var json=eval(r.responseText);
				}
				var li=ele.getElementsByClassName('quickLink');
				for(var x=li.length-1;x>-1;x--){
					li[x].parentNode.removeChild(li[x]);
				}
				var ct=0;
				for(var i in json['quicklinks']){
					var li=document.createElement('li');
					li.className="quickLink"+((ct==0)?' first':'');
					li.innerHTML='<a href="'+json['quicklinks'][i]['url']+'">'+json['quicklinks'][i]['title']+'</a>';
					ele.appendChild(li);
					ct++;
				}
				if(ct==0){
					var li=document.createElement('li');
					li.className="quickLink first";
					li.innerHTML='<a onclick="alert(\'You have no quick links\\nMake some using the floating footer.\')" href="#">You have no links</a>';
					ele.appendChild(li);
					ct++;
				}
			},
			onerror: function(){
				try{
					unsafeWindow.YAHOO.QL=false;
				}
				catch(e){
					QL=false;
				}
			}
		});
	}
}
var ele=getId('nav');
if(ele){
	try{
		var imgServer=unsafeWindow.GAIA_config('graphics_server');
	}
	catch(e){
		try{//for Google Chrome
			var imgServer=GAIA_config('graphics_server');
		}
		catch(e){}
	}
	try{
		var usrid=document.getElementsByClassName('panel_mygaia_profile')[0].getElementsByTagName('a')[0].href;
		usrid=usrid.slice(usrid.indexOf('/profiles/')+10);
	}
	catch(e){
		try{
			var usrid=document.evaluate('.//a[@title="Logout from your Gaia account"]',document,null,9,null).singleNodeValue.href;
			usrid=usrid.substr(usrid.indexOf('userid=')+7);
			if(usrid.indexOf('&')!=-1){
				usrid=usrid.substr(0,usrid.indexOf('&'));
			}
		}
		catch(e){
			var usrid=getId('username').ClassName;
			if(usrid!=Number(usrid)){
				usrid='';
			}
		}
	}
	if(!imgServer){
		var imgServer='s.cdn.gaiaonline.com';		
	}
	if(usrid){
		while(usrid!=Number(usrid)){
			usrid=usrid.substr(-1);
		}
	}
	GM_addStyle("\n.goldMessage,div#qr_container,div#variations div.variation_containers,body > div.yui-tt.autoTooltip,#floating_outfits{\n\tz-index:452!important;\n}\nbody:not(#fake_id) > div.mask{\n\tz-index:453!important;\n}\ndiv.yui-panel-container,#outfits_modal_c{\n\tz-index:454!important;\n}\n#home_content>div.yui-panel-container{\n\tz-index:450!important;\n}\n#nav > li > div{\n\tdisplay:none;\n}\n#newmenu{\n\tposition:absolute;\n\tz-index:451;\n\ttop:151px;\n}\n#newmenu #nav,#newmenu #nav ul{\n\tfont-size:12px;\n\tlist-style:none;\n\tline-height:1;\n}\n#newmenu ul#nav a{\n\tdisplay:block;\n\twidth:auto;\n\ttext-decoration:none;\n\tpadding:4px;\n}\n#newmenu #nav a.extended{\n\tbackground-image:url('http://"+imgServer+"/src/yui/menu/assets/menuitem_submenuindicator.png');\n\tbackground-position:right center;\n\tbackground-repeat:no-repeat;\n\tpadding-right:16px;\n}\n#newmenu #nav li:hover a.header{\n\tbackground-color:#e7dfde;\n\tcolor:black;\n}\n#color_switcher_wrap:not(.classic) #newmenu #nav li:hover a.header{\n\tcolor:white;\n}\n#newmenu #nav li{\n\tfloat:left;\n\twidth:12em;\n\tborder-width:0 1px 1px;\n\tborder-color:#9c969c;\n\tborder-style:solid;\n\tbackground-color:white;\n\tlist-style:none;\n}\n#newmenu #nav > li{\n\tborder:none;\n\tbackground-color:transparent;\n}\n#newmenu #nav li:hover,#newmenu #nav a:hover{\n\tbackground-color:#E7dfde;\n}\n.blue #newmenu #nav li:hover,.blue #newmenu #nav a:hover{\n\tbackground-color:lightblue;\n}\n.red #newmenu #nav li:hover,.red #newmenu #nav a:hover{\n\tbackground-color:#FF7D7D;\n}\n.green #newmenu #nav li:hover,.green #newmenu #nav a:hover{\n\tbackground-color:#AAFFAA;\n}\n.yellow #newmenu #nav li:hover,.yellow #newmenu #nav a:hover{\n\tbackground-color:#F0E68C;\n}\n.pink #newmenu #nav li:hover,.pink #newmenu #nav a:hover{\n\tbackground-color:#FFAAFF;\n}\n.purple #newmenu #nav li:hover,.purple #newmenu #nav a:hover{\n\tbackground-color:#D0AAF3;\n}\n.grey #newmenu #nav li:hover,.grey #newmenu #nav a:hover{\n\tbackground-color:darkgray;\n}\n#newmenu #nav li.selected{\n\tborder-right:solid #9c969c 1px;\n\tbackground-color:#856c97;\n}\n#gaia_menu_bar #newmenu #nav li.standard{\n\twidth:5em;\n}\n#gaia_menu_bar #newmenu #nav li.standard_ext{\n\twidth:8em;\n}\n#gaia_menu_bar #newmenu #nav > li{\n\tborder-right:solid #9c969c 1px;\n}\n#color_switcher_wrap:not(.classic) #gaia_menu_bar #newmenu #nav > li{\n\tborder-right:solid black 1px;\n}\n#newmenu #nav li.first{\n\tborder-top:1px solid #9c969c;\n}\n#newmenu #nav li a.header{\n\ttext-align:center;\n\tcolor:white;\n\tfont-weight:bold;\n}\n#newmenu #nav li ul ul{\n\tmargin:-1.72em 0 0 12em;\n}\n#newmenu #nav li ul ul ul{\n\tmargin:-1.8em 0 0 12em;\n}\n#newmenu #nav li ul ul ul ul{\n\tmargin:-2.6em 0 0 12em;\n}\n#newmenu #nav li ul ul ul ul ul{\n\tmargin:-3.4em 0 0 12em;\n}\n#newmenu #nav li ul{\n\tposition:absolute;\n\twidth:10em;\n\tleft:-999em;\n}\n#newmenu #nav li:hover ul ul,#newmenu #nav li:hover ul ul ul,#newmenu #nav li:hover ul ul ul ul,#newmenu #nav li:hover ul ul ul ul ul,#newmenu #nav li:hover ul ul ul ul ul ul{\n\tleft:-999em;\n}\n#newmenu #nav li:hover ul,#newmenu #nav li li:hover ul,#newmenu #nav li li li:hover ul,#newmenu #nav li li li li:hover ul,#newmenu #nav li li li li li:hover ul,#newmenu #nav li li li li li li:hover ul{\n\tleft:auto;\n}\n#newmenu #nav li li li li:hover ul,#newmenu #nav li li li li li:hover ul,#newmenu #nav li li li li li li:hover ul{\n\tmargin-top:-21px;\n}\n#newmenu #nav li.oversized_ext:hover>ul{\n\tmargin-top:-33px;\n}\n#gaia_header #gaia_menu_bar{\n\theight:20px;\n\tbackground-image:none;\n\tbackground-color:#5a5163;\n\tborder-top:1px solid black;\n\tborder-bottom:1px solid black;\n}\n#gaia_header #color_switcher_wrap:not(.classic) #gaia_menu_bar{\n\theight:22px;\n\tborder-top:none;\n\tborder-bottom:none;\n}\n#gaia_header #gaia_menu_bar > #newmenu > #nav > #color_menu.standard > a.header{\n\tpadding-top:3px;\n\theight:13px!important;\n}\n#gaia_menu_bar .home_icon,#color_switcher_wrap:not(.classic) #gaia_menu_bar .home_icon{\n\tpadding:0 9px;\n\tdisplay:inline;\n\tbackground-repeat:no-repeat;\n\tbackground-position:center;\n\tbackground-image:url('data:image/gif;base64,R0lGODlhDQAKAMQTAP////39/eXh6ZiIquTg6aaYtebj66OVs9jU3bmuxb+2ysvD1Pn4+r2zyPLx9JaGqNPM27Glvvb1+OTe2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABMALAAAAAANAAoAAAUv4CSOyGiOjQQYxTkNUADMTmIexKwDwfJMCsZuKIiIhjuTbrRkzpwA5fM4pUatohAAOw==');\n}\n#gaia_menu_bar a:hover .home_icon{\n\tbackground-image:url('data:image/gif;base64,R0lGODlhDQAKAKIEAAAAAJmZmWZmZjMzM+Te2AAAAAAAAAAAACH5BAEAAAQALAAAAAANAAoAAAMhSKoDs5AEQGmIomqxst7SJ16EWEGnkqrUspYtC6AxPBMJADs=')\n}\n#color_switcher_wrap:not(.classic) #gaia_menu_bar #newmenu #nav li.selected,#color_switcher_wrap:not(.classic) #gaia_menu_bar #newmenu #nav li:hover a.header{\n\tbackground-repeat:repeat-x;\n\tbackground-position:0 -1101px;\n}\n.blue #gaia_menu_bar #newmenu #nav li.selected,.blue #gaia_menu_bar #newmenu #nav li:hover a.header{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24.png');\n}\n.red #gaia_menu_bar #newmenu #nav li.selected,.red #gaia_menu_bar #newmenu #nav li:hover a.header{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_red.png');\n}\n.green #gaia_menu_bar #newmenu #nav li.selected,.green #gaia_menu_bar #newmenu #nav li:hover a.header{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_green.png');\n}\n.yellow #gaia_menu_bar #newmenu #nav li.selected,.yellow #gaia_menu_bar #newmenu #nav li:hover a.header{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_yellow.png');\n}\n.pink #gaia_menu_bar #newmenu #nav li.selected,.pink #gaia_menu_bar #newmenu #nav li:hover a.header{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_pink.png');\n}\n.purple #gaia_menu_bar #newmenu #nav li.selected,.purple #gaia_menu_bar #newmenu #nav li:hover a.header{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_purple.png');\n}\n.grey #gaia_menu_bar #newmenu #nav li.selected,.grey #gaia_menu_bar #newmenu #nav li:hover a.header{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_grey.png');\n}\n#gaia_header #color_switcher_wrap:not(.classic) #gaia_menu_bar{\n\tbackground-position:0 -100px;\n}\n#gaia_header .blue #gaia_menu_bar,.blue #gaia_menu_bar #newmenu #nav li:hover a.header{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24.png');\n}\n#gaia_header .pink #gaia_menu_bar,.pink #gaia_menu_bar #newmenu #nav li:hover a.header{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_pink.png');\n}\n#gaia_header .green #gaia_menu_bar,.green #gaia_menu_bar #newmenu #nav li:hover a.header{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_green.png');\n}\n#gaia_header .red #gaia_menu_bar,.red #gaia_menu_bar #newmenu #nav li:hover a.header{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_red.png');\n}\n#gaia_header .yellow #gaia_menu_bar,.yellow #gaia_menu_bar #newmenu #nav li:hover a.header{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_yellow.png');\n}\n#gaia_header .purple #gaia_menu_bar,.purple #gaia_menu_bar #newmenu #nav li:hover a.header{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_purple.png');\n}\n#gaia_header .grey #gaia_menu_bar,.grey #gaia_menu_bar #newmenu #nav li:hover a.header{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_grey.png');\n}\n#gaia_header #gaia_menu_bar #newmenu #nav #color_menu a.header{\n\tmargin-top:0px;\n\tmargin-bottom:0px;\n}\n#color_menu .panel_img{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/colors.png');\n\tpadding-left:16px;\n\tmargin-right:1px;\n}\n#gaia_menu_bar #newmenu #nav #color_menu{\n\twidth:2em;\n}\n.classic #newmenu #nav #color_menu{\n\tbackground-image:none;\n}\n#color_menu .selected .panel_img{\n\tpadding-top:1px;\n\tpadding-bottom:1px;\n}\n#color_menu #green .panel_img{\n\tbackground-position:0 0;\n}\n#color_menu #green.selected .panel_img{\n\tbackground-position:0 -39px;\n}\n#color_menu #pink .panel_img{\n\tbackground-position:-18px 0;\n}\n#color_menu #pink.selected .panel_img{\n\tbackground-position:-18px -39px;\n}\n#color_menu #yellow .panel_img{\n\tbackground-position:-36px 0;\n}\n#color_menu #yellow.selected .panel_img{\n\tbackground-position:-36px -39px;\n}\n#color_menu #red .panel_img{\n\tbackground-position:-54px 0;\n}\n#color_menu #red.selected .panel_img{\n\tbackground-position:-54px -39px;\n}\n#color_menu #blue .panel_img{\n\tbackground-position:-72px 0;\n}\n#color_menu #blue.selected .panel_img{\n\tbackground-position:-72px -39px;\n}\n#color_menu #purple .panel_img{\n\tbackground-position:-90px 0;\n}\n#color_menu #purple.selected .panel_img{\n\tbackground-position:-90px -39px;\n}\n#color_menu #grey .panel_img{\n\tbackground-position:-108px 0;\n}\n#color_menu #grey.selected .panel_img{\n\tbackground-position:-108px -39px;\n}\n#color_menu #classic .panel_img{\n\tbackground-position:-90px 0;\n}\n#color_menu #classic.selected .panel_img{\n\tbackground-position:-90px -39px;\n}\n#gm_search ul,#gm_search li{\n\twidth:338px !important;\n}\n#GM_Search_Form,#linkFinderForm{\n\tpadding:5px;\n\tmargin:0\n;}\n#GM_Search_Type{\n\tfont-size:13px !important;\n\theight:20px;\n\twidth:105px;\n\tpadding:0px;\n}\n#GM_Search_Type .two {\n\tpadding-left:16px;\n}\n#GM_Search_Type .three {\n\tpadding-left:32px;\n}\n#GM_Search_Text{\n\tmargin-top:1px;\n\tdisplay:inline;\n\tfont-size:12px;\n\tpadding:0px;\n\theight:16px;\n\twidth:145px;\n\tposition:relative;\n\ttop:-1px;\n}\n#GM_Search_Gbtn{\n\tbackground-image:url('http://"+imgServer+"/images/common/bn/bn_search.gif');\n\tbackground-color:transparent;\n\tborder:none;\n\tcursor:pointer;\n\theight:21px;\n\toverflow:hidden;\n\ttext-align:left;\n\ttext-indent:-5000em;\n\twidth:66px;\n}#GM_Search_Gbtn:hover{\n\tbackground-attachment:scroll;\n\tbackground-position:left -21px;\n}\n#newmenu #nav #gm_search.locked > ul > li{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/body/icons/ic_soulbound_30x30.gif');\n\tbackground-position:bottom left;\n\tbackground-repeat:no-repeat;\n}\n#newmenu #nav #gm_search.locked a{\n\tbackground:none;\n}\n#gm_search #GM_linkFinder{\n\twidth:85%;\n}\n#gm_search #GM_linksSearch{\n\twidth:100%;\n}\n#gm_search #GM_SearchGo{\n\tbackground-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAVCAYAAAAuJkyQAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oHAhUQKXXFatQAAALzSURBVEjHzVZLSFRhGD3/ODrNMNk4M1qaWY7Zw3LRc4Kyl7kxyrCFBG0iCmohiYsISwShFkZFQRCSSrSpaFMRrQopeichUpSvEHMGx7GZpus8rvOfFvc6s5qpVc0HZ/HzHb5zuP/3f99FwDcGAMwEBHxjMNryS7j94C30dFTBZnPgf4THM4ETrW9hyy+hAMCRkVE4nU49bfiHViQAwGjMhtfrgctVCgGAMzMRZEJYLPNg1BxmIVMiMw0JITLG0F92sArPsys4Xr0a+TkCQggISyEqa47iwsMRhKnTOIOv91pQv34xLEJACCPsK3bh2LUX8M3+vSlKyTSIcaS7jva5eWF1cWPVdrpX5mnnysscipFShjlwcRtNOs/i2kB35cLEjCk+8oBelWm1dC4Yj8uUUL33ud+qFXXUd/OLEtdzKv0fbvJU4x2OxSTV77e5x6Txypt76Vcl4/EIh7v2cj5AoJiNr5W0WglDqhpPienHB2gBCKzj1cFoSp7/0T6aAQKbeeNbLJkLPufRAs3o8tZ+Kmm0ANAAAFIyBSSUSS9mAMC8BK68LChvGrEkOwvZc1jVhoGwhOLzIQwA5kIUWw3JGllOlOkLIDAeQCylFpNNLaVMASLHng8zAIRH8WkyBpFbgd3VVVi/ONGCkJIw2Z06bwJjwdlkjagPo36NaSvKhSGllkw2taJEUyI0eps187RPnlfXyY9TESpKiH3nyrU7LzvL99NRhoZ7uCtHv5qmp5wIRakov/i5s5ZWgEART/YG0moleigUiqRBkH0dO/U+AmFeynVVu+kuMWhnVwvfTkUYCv3gm3Y3s+deWekGblq7kEI/Lzp0l0OBSFqthKGfP8N/wA8O3G1jw5ZS5hp0Y5YirtnRwKbrrzge0HnBKb7ramZtZYH+/AXnL9vKw+efcNAf/qMOAG3bT/l/ZcSUdjqs2upQVTWzdpnH64fDvuC/GvFPB5OGTrW/xKUzFbDbHZA0/XMzPt8kTnf068Mqw/6pfwMBQ4MZ3TgCUQAAAABJRU5ErkJggg==');\n\tbackground-color:transparent;\n\tbackground-repeat:no-repeat;\n\tborder:medium none;\n\tcursor:pointer;\n\theight:21px;\n\toverflow:hidden;\n\ttext-align:left;\n\ttext-indent:-5000em;\n\twidth:38px;\n}\n#gm_search #GM_SearchGo:hover{\n\tbackground-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAVCAYAAAAuJkyQAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oHAhUMJgMNKhgAAAMHSURBVEjHzZZNbBNHFMd/492147UdO45xPkTkRK3DR4JQDlBVoigSiIKCkkNBXGnFgUt7AokDEgc+DogLVVvl0ktvRRSJQlVxqJTQKkICypcAJUWBBPMR7CQOcey117vDYWOCgDiWerCfNNKs5q95v3lv3psV6eQk/QeHJDVgvw/2CrH1q1/krt4O9vStoTFUVxWQ6bTB+T9G+XPoMSrA/r3d+HR31SLTFPGxf2/3ElCw3lv1dJUYVABVVagVq00gIURtAa1sklfPk5z9N8mVlwazNqBqdDYF6e9u5uuYB6c+bR6Pv+D07WmupkwMBMGgn51drRxa7yfsqhBIyvIwibFxBobTzAFoHjZENVy5HHeepTiT89K3Okqby+bRvf/ov5ahAHgDOhs1kzsz8/w6Mspw6lMubg3SKCoCWp7INtKcGHFgQh0xzvc2ElMc0NfTM/ww5kJDYmVnOX7dgWnf0Mlvm/3UC+cwu6/O8XJsgp/WdXF0VfkwuQBsWy47FpIz/GMCePluUwNtorQG/oYwRz4LsUpKMslZbloAOge6dPzS0bS2N9FXB2AyNJknX8bX2wiVPj5m2ZyJAaC4adMg++opOy6nSJYE9c1cGmimIVdc1Gk0K+/uqdBWBxgwv1DEtCXKyhGylx2aW8EDYOV5lLUQqofPW3x06aUrJt/TmTzPv7NH0SRhONKAVyDK+KooZXWhEJsUAIPBm7MkvGFObuvgVNzz9tI7uiA9LoAsPz/MMGc5oIknU1w2ADS2tGgo/zdluAMc7vFx48YCc5MJdj+bYn3Eg5bJL9WhLcET4PBGnX23skzcH2fbhJe4anIvXUQCkY4WvmkQ5X1VUmUAsXiMC3qKHx+mGU4VeDBlgqoSb/KxpT1AVEikFHyyNsY5b5LvH6QZSee4C/j8OtvjUb7t9NGIXKHFLAIVTGvFhhWJhjkWDX98sWhRWJyubo1wujXyocayKFgVNkbTNGvr6ZieyRLwu6sKMp8pLAFd+mucL79ooT6gVwXm9XyWK3+/AEDU2j/1GxF4s/gz/yI/AAAAAElFTkSuQmCC');\n}\n#newmenu #nav > li.locked > ul{\n\tleft:auto;\n\tz-index:1;\n}\n#newmenu #nav li>img.ajax_loading{\n\tmargin-left:4.7em;\n}\n#newmenu #nav > li:not(.locked) > ul{\n\tz-index:2;\n}\n");
	try{
		var selectedTab=document.getElementsByClassName('selected')[0].id;
	}
	catch(e){}
	var Color='';
	var Home='<li id="home_menu" class="standard"><a class="header" href="/"><span class="home_icon" style="top:5px;left:4px"></span>Home</a></li>';
	var MyGaia='<li id="mygaia_menu" class="standard"><a class="header" href="/mygaia">My Gaia</a><ul><li class="first"><a href="/avatar/">Avatar</a></li><li><a href="/homes/">House</a></li><li><a href="/auto/">Car</a></li><li><a href="/aquarium/">Aquarium</a></li><li><a href="/inventory/" class="extended">Inventory</a><ul><li class="first"><a href="/inventory/view/all">All</a></li><li><a href="/inventory/view/equip">Equip</a></li><li><a href="/inventory/view/game">Game</a></li><li><a href="/inventory/view/special">Special</a></li><li><a href="/inventory/view/house">House</a></li><li><a href="/inventory/view/zomg">zOMG!</a></li><li><a href="/inventory/view/aquarium">Aquarium</a></li><li><a href="/inventory/view/animated">Animated</a></li><li><a href="/profile/arranger.php">Arrange Items</a></li></ul></li><li><a href="/profile/privmsg.php" class="extended">Mail</a><ul><li class="first"><a href="/profile/privmsg.php?mode=post">Write Mail</a></li><li><a href="/textmessage/">Send Text Message</a></li><li><a href="/profile/privmsg.php">Inbox</a></li><li><a href="/profile/privmsg.php?folder=outbox">Outbox</a></li><li><a href="/profile/privmsg.php?folder=sentbox">Sent</a></li><li><a href="/profile/privmsg.php?folder=savebox">Saved</a></li></ul></li><li><a href="/profile/friendlist.php" class="extended">Friends</a><ul><li class="first"><a class="extended" onclick="return false" href="#">Suggested Friends</a><ul id="GM_suggFrnd"><li class="first"><img class="ajax_loading" src="http://'+imgServer+'/images/template/dropdown/ajax-loader.gif"/></li></ul></li><li><a class="extended" href="/profile/friendlist.php">Friends List</a><ul id="GM_Friends"><li class="first"><img class="ajax_loading" src="http://'+imgServer+'/images/template/dropdown/ajax-loader.gif"/></li></ul></li><li><a href="/findfriends/">Find Friends</a></li><li><a href="/profile/friendlist.php?list=approval">Requests to You</a></li><li><a href="/profile/friendlist.php?list=pending">Requests from You</a></li><li><a href="/findfriends/history/">Invite History</a></li><li><a href="/profile/friendlist.php?list=ignored">Ignored List</a></li></ul></li><li><a href="/journal/journal.php?mode=view&amp;u=65153" class="extended">Journal</a><ul><li class="first"><a href="/journal/journal.php?mode=entry&amp;action=load-add">New Entry</a></li><li><a href="/journal/journal.php?mode=entry">Archive</a></li><li><a href="/journal/journal.php?mode=preferences">Preferences</a></li><li><a href="/journal/journal.php?mode=landing">Subscriptions</a></li></ul></li><li><a href="/quest/" class="extended">Quests</a><ul><li class="first"><a href="/quest/">Active</a></li><li><a href="/quest/history/">Completed</a></li><li><a href="/quest/badge/">Badges</a></li></ul></li><li><a href="/account/" class="extended">Account Settings</a><ul><li class="first"><a href="/account/preferences/">Preferences</a></li><li><a href="/account/alerts/">Alerts</a></li><li><a href="/account/notifications/">Notifications</a></li><li><a href="/account/about/">About Me</a></li><li><a href="/account/details/">Details</a></li><li><a href="/account/interests/">Interests</a></li><li><a href="/account/signature/">Signature</a></li><li><a href="/account/profileprefs/">Profile Options</a></li><li><a href="/account/datafeeds/">Feeds</a></li><li><a href="/account/wishlist/">Wishlist</a></li></ul></li><li><a class="extended" href="/profiles/">Profile</a><ul><li class="first"><a href="/profiles/'+usrid+'">Profile</a></li><li><a href="/profiles/?mode=comments">Comments</a></li><li><a title="For Current Profile" href="/profiles/?mode=edit&u='+usrid+'">Edit Profile</a></li></ul></li><li><a href="/mygaia/settings/">Notifications</a></li><li><a href="/achievements/">Achievements</a></li></ul></li>';
	var Shop='<li id="shopping_menu" class="standard"><a class="header" href="/market">Shop</a><ul><li class="first"><a href="/collectibles">Monthly Collectibles</a></li><li id="gaia_menuitem_cashshop"><a href="/market/?cashshop=true">Cash Shop</a></li><li><a href="/info/gold/gcash/" class="extended">Get Gaia Cash</a><ul><li class="first"><a href="/shop/?from=gpass">Purchase Online</a></li><li><a href="/info/gold/gcash/#store_hd">Locate Store</a></li><li><a href="http://www.gaiastore.com/servlet/the-Gaia-Cash-Cards/Categories">Send a Gift Card</a></li><li><a href="/redeem/">Redeem a Pin</a></li></ul></li><li><a href="/gaia/shopping.php" class="extended">Shops</a><ul><li class="first"><a href="/gaia/shopping.php?key=suobdlxpawwzvmcs">Barton Boutique</a></li><li><a class="extended" href="/gaia/shopping.php/?key=uhxrdnkgimmkhslj">Back Alley Bargains</a><ul><li class="first"><a href="/gaia/exchange.php?store=uhxrdnkgimmkhslj">Make Recipes</a></li></ul></li><li><a class="extended" href="/gaia/shopping.php/?key=ngabwpnnhvmyhins">Durem Depot</a><ul><li class="first"><a href="/gaia/exchange.php?store=ngabwpnnhvmyhins">Exchange Bugs</a></li></ul></li><li><a href="/gaia/shopping.php/?key=tctmkgjtjekkblii">Gambino Outfitters</a></li><li><a href="/gaia/shopping.php/?key=jqztgkvbtpraewh">Global Imports</a></li><li><a class="extended" href="/gaia/shopping.php/?key=ggcmjiwqlqkpvbos">H &amp; R Wesley</a><ul><li class="first"><a href="/gaia/exchange.php?store=ggcmjiwqlqkpvbos">Exchange Credits</a></li></ul></li><li><a href="/gaia/shopping.php/?key=alpltfbdnxgowsfn">The Ole Fishing Hole</a></li><li><a href="/gaia/shopping.php/?key=aqyvrienpejsqhlq">The Jock Strap</a></li><li><a href="/gaia/shopping.php/?key=jeusorituensldjz">Junk in the Trunk</a></li><li><a href="javascript:YAHOO.gaia.app.CashShop.SenderApplication.show({store:18,self:true,origin:\'stores\'});">Mintaka & Rigel</a></a></li><li><a class="extended" href="/gaia/shopping.php/?key=uxzehjwiwxtrueit">Ruby\'s Rack</a><ul><li class="first"><a href="/gaia/exchange.php?store=uxzehjwiwxtrueit">Exchange Trash</a></li></ul></li><li><a href="/gaia/shopping.php/?key=wdwoprgbzbtbjimf">Salon Durem</a></li><li><a href="/gaia/shopping.php/?key=peoikjdnhbalvieu">Phin Phang</a></li><li><a href="/gaia/shopping.php/?key=eazdhzyfhsu3hek8">Sunset Couture</a></li><li><a href="/gaia/shopping.php/?key=gxqxrbzixwydqakn">Sams Body &amp; Parts</a></li><li><a href="/gaia/shopping.php/?key=essxqbkkcfqhuyrn">Barton Jewelers</a></li><li><a class="extended" href="/gaia/shopping.php/?key=bvnsukowrbkthaiq">Skin Tyte</a><ul><li class="first"><a href="/gaia/exchange.php?store=bvnsukowrbkthaiq">Buy Tattoos</a></li></ul></li><li><a href="/gaia/shopping.php/?key=hsozifjktvkcqqxc">The Faktori</a></li><li><a href="/gaia/shopping.php?key=eimzlapgnduengad">Dernier Cri</a></li><li><a href="/gaia/shopping.php/?key=bpzhydftrxmiydnf">Barton Flowershoppe</a></li><li><a href="/gaia/shopping.php/?key=ndroctlqvprghqqy">Prize &amp; Joy</a></li></ul></li><li><a href="/museum/">Evolving Item Museum</a></li><li><a href="/marketplace/" class="extended">Marketplace</a><ul><li class="first"><a href="/marketplace/itemsearch/">Item Search</a></li><li><a class="extended" href="/marketplace/vendsearch/">All Listings</a><ul><li class="first"><a href="/marketplace/vendsearch/?sortBy=90">Old Listings</a></li><li><a href="/marketplace/vendsearch/?sortBy=91">New Listings</a></li></ul></li><li><a class="extended" href="/marketplace/mystore/">My Store</a><ul><li class="first"><a href="/marketplace/vendlog/'+usrid+'/listed/">Listed Items</a></li><li><a href="/marketplace/vendlog/'+usrid+'/bought/">Bought Items</a></li><li><a href="/marketplace/editstore">Edit Store</a></li></ul></li><li><a class="extended" href="/marketplace/mystore/showinventory/">Sell an Item</a><ul><li class="first"><a href="/marketplace/mystore/showinventory/">All</a></li><li><a href="/marketplace/mystore/showinventory/?tab=equip">Equip</a></li><li><a href="/marketplace/mystore/showinventory/?tab=game">Game</a></li><li><a href="/marketplace/mystore/showinventory/?tab=special">Special</a></li><li><a href="/marketplace/mystore/showinventory/?tab=housing">House</a></li></li><li><a href="/marketplace/mystore/showinventory/?tab=zomg">zOMG!</a></li><li><a title="I wish." href="/forum/t.52433563/">Aquarium</a></li></ul></li><li><a href="/marketplace/watchlist/">My Watchlist</a></li></ul></li><li><a href="/gaia/bank.php">Trade</a></li><li><a href="http://www.gaiastore.com/servlet/StoreFront" class="extended">Merchandise</a><ul><li class="first"><a href="http://www.gaiastore.com/servlet/the-what%27s-new/Categories">What\'s New</a></li><li><a href="http://www.gaiastore.com/servlet/the-clothing/Categories">Clothing</a></li><li><a href="http://www.gaiastore.com/servlet/the-accessories/Categories">Accessories</a></li><li><a href="http://www.gaiastore.com/servlet/the-gaia-gear/Categories">Gaia Gear</a></li><li><a href="http://www.gaiastore.com/servlet/the-plushies-%26-toys/Categories">Plushies &amp; Toys</a></li><li><a href="http://www.gaiastore.com/servlet/the-stationery/Categories">Stationery</a></li><li><a href="http://www.gaiastore.com/servlet/the-great-deals/Categories">Great Deals</a></li><li><a href="http://www.gaiastore.com/servlet/the-Downloads/Categories">Downloads</a></li><li><a href="http://www.gaiastore.com/servlet/the-Gaia-Cash-Cards/Categories">Gaia Cash Cards</a></li><li><a href="http://www.gaiastore.com/servlet/the-zOMG%21/Categories">zOMG!</a></li><li><a href="/store/custommerchandise/">Customizable Stuff</a></li></ul></li><li><a href="/mobile">Mobile Downloads</a></li><li><a href="#" class="extended">Payment History</a><ul><li class="first"><a href="/redeem/history/">Gaia Cash Purchases</a></li><li><a href="/order/history/">Order History</a></li></ul></li></li></ul>';
	var Forums='<li><a class="extended" href="/forum/">Forum Index</a><ul><li class="first"><a class="extended" href="/forum/gaia-online/c.3/">Gaia Online</a><ul><li class="first"><a class="extended" href="/forum/announcements/f.339/">Announcements</a><ul><li class="first"><a href="/forum/featured-announcements/f.10/">Featured Announcements</a></li><li><a href="/forum/community-announcements/f.493/">Community Announcements</a></li><li><a href="/forum/gaia-newsletters/f.185/">Gaia Newsletters</a></li></ul></li><li class="oversized_ext"><a class="extended" href="/forum/questions-assistance/f.5/">Questions &amp; Assistance</a><ul><li class="first"><a href="/forum/avatar-system-3-0-q-f/f.113/">Avatar System 3.0 Q&amp;F</a></li><li><a href="/forum/gaia-guides-and-resources/f.92/">Gaia Guides and Resources</a></li></ul></li><li><a class="extended" href="/forum/site-feedback/f.137/">Site Feedback</a><ul><li class="first"><a href="/forum/petitions/f.138/">Petitions</a></li></ul></li><li><a class="extended" href="/forum/gaia-news-updates/f.485/">Gaia News &amp; Updates</a><ul><li class="first"><a href="/forum/ask-the-admin-archives/f.277/">Ask the Admin Archives</a></li><li><a href="/forum/dev-notices/f.487/">Dev Notices</a></li><li><a href="/forum/gaia-action-9-newsletters/f.495/">Gaia Action 9 Newsletters</a></li><li><a href="/forum/gaia-news-updates-archives/f.527/">Gaia News &amp; Updates Archives</a></li><li><a href="/forum/gaiainsider/f.529/">GaiaInsider </a></li><li><a href="/forum/gaia-labs/f.581/">Gaia Labs</a></li></ul></li><li><a class="extended" href="/forum/welcome-to-gaia/f.57/">Welcome to Gaia</a><ul><li class="first"><a href="/forum/gaia-guides-and-resources/f.92/">Gaia Guides and Resources</a></li><li><a href="/forum/friends-chat/f.151/">Friends Chat</a></li></ul></li><li class="oversized_ext"><a class="extended" href="/forum/bug-reports-technical-support/f.47/">Bug Reports &amp; Technical Support</a><ul><li class="first"><a href="/forum/games-bugs/f.355/">Games Bugs</a></li></ul></li><li><a href="/forum/gaia-convention-tour/f.249/">Gaia Meet Ups/Convention Tour</a></li><li><a class="extended" href="/forum/spring-cleaning/f.629/">Spring Cleaning</a><ul><li class="first"><a href="/forum/spring-cleaning-proposals/f.631/">Spring Cleaning Proposals</a></li></ul></li></ul></li><li><a class="extended" href="/forum/gaia-community/c.26/">Gaia Community</a><ul><li class="first"><a class="extended" href="/forum/general-discussion/f.2/">General Discussion</a><ul><li class="first"><a href="/forum/word-games-and-others/f.45/">Word Games and others</a></li></ul></li><li><a class="extended" href="/forum/lifestyle-discussion/f.289/">Lifestyle Discussion</a><ul><li class="first"><a href="/forum/supernatural/f.573/">Supernatural</a></li><li class="oversized_ext"><a href="/forum/real-life-fashion-style/f.239/" class="extended">Real Life Fashion &amp; Style</a><ul><li class="first"><a href="/forum/gaia-merchandise/f.257/">Gaia Merchandise</a></li></ul></li><li><a href="/forum/food-drink/f.241/">Food &amp; Drink</a></li><li><a href="/forum/scion/f.291/">Scion</a></li><li><a href="/forum/life-issues/f.97/">Life Issues</a></li></ul></li><li class="oversized_ext"><a class="extended" href="/forum/gaia-community-discussion/f.139/">Gaia Community Discussion</a><ul><li class="first"><a href="/forum/avatar-talk/f.50/" class="extended">Avatar Talk</a><ul><li class="first"><a href="/forum/the-dressing-room/f.383/">The Dressing Room</a></li></ul></li><li><a href="/forum/homes-arena-discussion/f.399/">Homes Arena Discussion</a></li><li><a href="/forum/avatar-arena/f.154/">Avatar Arena</a></li><li><a href="/forum/gaia-towns/f.153/" class="extended">Gaia Towns</a><ul><li class="first"><a href="/forum/gaia-homes/f.141/">Gaia Homes</a></li><li><a href="/forum/game-item-exchange/f.125/">Game Item Exchange</a></li></ul></li><li><a href="/forum/profile-discussion/f.170/">Profile Discussion</a></li><li><a href="/forum/gaia-community-projects/f.187/">Gaia Community Projects</a></li></ul></li><li><a class="extended" href="/forum/barton-town/f.9/">Barton Town</a><ul><li class="first"><a href="/forum/university-school-roleplay/f.68/">University/School RolePlay</a></li><li><a href="/forum/the-gaian-neighborhood/f.90/">The Gaian Neighborhood</a></li><li><a href="/forum/series-related-miscellaneous-role-play/f.66/">Series-related/Miscellaneous Role Play</a></li><li><a href="/forum/gaia-commerce/f.21/">Gaia Commerce</a></li><li><a href="/forum/invitation-only-rp/f.49/">Invitation-only RP</a></li><li><a href="/forum/organization-military-based-guilds/f.53/">Organization/Military-Based Guilds</a></li><li><a href="/forum/organizations-at-war/f.110/">Organizations At War</a></li><li><a href="/forum/barton-ooc/f.150/">Barton OOC</a></li></ul></li><li><a href="/forum/gaia-aquarium/f.393/">Gaia Aquarium</a></li><li><a class="extended" href="/forum/chatterbox/f.23/">Chatterbox</a><ul><li class="first"><a href="/forum/recycle-bin/f.77/">Recycle Bin</a></li><li><a href="/forum/friends-chat/f.151/">Friends Chat</a></li></ul></li><li><a href="/forum/gaia-international/f.391/">Gaia International</a></li><li><a class="extended" href="/forum/extended-discussion/f.26/">Extended Discussion</a><ul><li class="first"><a href="/forum/politics/f.58/">Politics</a></li><li><a href="/forum/science-and-technology/f.59/">Science and Technology</a></li><li><a href="/forum/morality-and-religion/f.60/">Morality and Religion</a></li><li><a href="/forum/sociology-and-psychology/f.61/">Sociology and Psychology</a></li></ul></li><li><a class="extended" href="/forum/gaia-guilds/f.17/">Gaia Guilds</a><ul><li class="first"><a href="/forum/the-crew-lounge/f.579/">The Crew Lounge</a></li><li><a href="/forum/guilds-charter-and-barter/f.156/">Guilds Charter and Barter</a></li></ul></li></ul></li><li><a class="extended" href="/forum/gaia-gaming/c.12/">Gaia Gaming</a><ul><li class="first"><a class="extended" href="/forum/zomg-gaia-s-mmo/f.259/">zOMG! (Gaia\'s MMO)</a><ul><li class="first"><a href="/forum/clans-of-battle/f.261/">Clans of Battle</a></li><li><a href="/forum/zomg-forum-archives/f.599/">zOMG! Forum Archives</a></li><li><a href="/forum/recrewting/f.473/">Recrewting</a></li></ul></li><li><a class="extended" href="/forum/the-gaia-exchange/f.22/">The Gaia Exchange</a><ul><li class="first"><a href="/forum/lotto-money-games/f.27/">Lotto/Money Games</a></li><li><a href="/forum/charity-quests/f.28/">Charity/Quests</a></li><li><a href="/forum/wanted/f.63/">Wanted</a></li><li><a href="/forum/gaia-marketplace-discussion/f.89/">Gaia Marketplace Discussion</a></li><li><a href="/forum/game-item-exchange/f.125/">Game Item Exchange</a></li></ul></li><li class="oversized_ext"><a class="extended" href="/forum/gaia-gaming-discussion/f.140/">Gaia Gaming Discussion</a><ul><li class="first"><a class="extended" href="/forum/gaia-fishing/f.124/">Gaia Fishing!</a><ul><li class="first"><a href="/forum/game-item-exchange/f.125/">Game Item Exchange</a></li></ul></li></ul></li><li><a class="extended" href="/forum/mini-shops/f.79/">Mini Shops</a><ul><li class="first"><a href="/forum/art-shops-and-requests/f.82/">Art Shops and Requests</a><ul><li class="first"><a href="/forum/art-auctions/f.157/">Art Auctions</a></li><li><a href="/forum/art-contests/f.46/">Art Contests</a></li></ul></li><li><a href="/forum/breedable-changing-pets/f.81/">Breedable/Changing Pets</a><ul><li class="first"><a href="/forum/breedable-changing-pets-roleplay/f.80/">Breedable/Changing Pets Roleplay</a></li></ul></li><li><a href="/forum/art-freebies/f.108/">Art Freebies</a></li><li><a href="/forum/pricing-assistance-and-suggestions/f.109/">Pricing, Assistance, and Suggestions</a></li><li><a href="/forum/personalized-graphics/f.168/">Personalized Graphics</a></li><li><a href="/forum/services/f.169/">Services</a></li></ul></li><li><a href="/forum/ocean-party/f.603/">Ocean Party</a></li></ul></li><li><a class="extended" href="/forum/entertainment/c.4/">Entertainment</a><ul><li class="first oversized_ext"><a class="extended" href="/forum/entertainment-discussion/f.11/">Entertainment Discussion</a><ul><li class="first"><a class="extended" href="/forum/mtv/f.281/">MTV</a><ul><li class="first"><a href="/forum/mtv-the-hills/f.353/">MTV: The Hills</a></li></ul></li><li><a href="/forum/alice-in-wonderland/f.607/">Alice in Wonderland</a></li><li><a href="/forum/glee/f.615/">Glee</a></li><li><a href="/forum/twilight-saga/f.587/">Twilight Saga</a></li><li><a href="/forum/supernatural/f.573/">Supernatural</a></li><li><a href="/forum/toys-collectibles/f.42/">Toys &amp; Collectibles</a></li><li><a href="/forum/books/f.85/">Books</a></li><li><a href="/forum/celebrities/f.86/">Celebrities</a></li><li><a href="/forum/independent-obscure-movies-television/f.87/">Independent/Obscure Movies &amp; Television</a></li><li><a href="/forum/lord-of-the-rings/f.94/">Lord of the Rings</a></li><li><a href="/forum/harry-potter/f.93/">Harry Potter</a></li><li><a href="/forum/animation-cartoons/f.99/">Animation/Cartoons</a></li></ul></li><li><a class="extended" href="/forum/gaming-discussion/f.4/">Gameing Discussion</a><ul><li class="first"><a href="/forum/ragnarok-online/f.1/">RAGNAROK Online</a></li><li><a href="/forum/final-fantasy/f.36/">Final Fantasy</a></li><li><a href="/forum/fighting-games/f.41/">Fighting Games</a></li><li><a href="/forum/table-top-gaming/f.106/">Table-Top Gaming</a></li></ul></li><li class="oversized_ext"><a class="extended" href="/forum/computers-technology/f.43/">Computers &amp; Technology</a><ul><li class="first"><a href="/forum/c-t-tech-talk/f.91/">C&amp;T Tech-Talk</a></li></ul></li><li><a class="extended" href="/forum/anime-manga-comics/f.3/">Anime/Manga/Comics</a><ul><li class="first"><a href="/forum/anime-series-movies/f.31/">Anime Series &amp; Movies </a></li><li><a href="/forum/naruto/f.619/">Naruto</a></li><li><a href="/forum/tv-anime/f.48/">TV Anime</a></li><li><a href="/forum/manga/f.30/">Manga</a></li><li><a href="/forum/comics-discussion/f.19/">Comics Discussion</a></li><li><a href="/forum/cosplay/f.29/">Cosplay</a></li><li><a href="/forum/animation-cartoons/f.99/">Animation/Cartoons</a></li></ul></li><li><a class="extended" href="/forum/music/f.55/">Music</a><ul><li class="first"><a href="/forum/soundtracks-musicals/f.76/">Soundtracks &amp; Musicals</a></li><li><a href="/forum/lady-gaga/f.609/">Lady Gaga</a></li><li><a href="/forum/metal/f.69/">Metal</a></li><li><a href="/forum/classical-jazz-blues/f.70/">Classical/Jazz/Blues</a></li><li><a href="/forum/rap-hiphop-r-b/f.71/">Rap/Hiphop/R&amp;B</a></li><li><a href="/forum/international/f.72/">International</a></li><li><a href="/forum/electronic-music/f.73/">Electronic Music</a></li><li><a href="/forum/lady-gaga/f.609/">Lady Gaga</a></li><li><a href="/forum/independent-music/f.74/">Independent Music</a></li><li><a href="/forum/country-bluegrass-folk/f.84/">Country/Bluegrass/Folk</a></li><li><a href="/forum/musician-s-forum/f.32/">Musician\'s Forum</a></li></ul></li><li><a class="extended" href="/forum/sports/f.62/">Sports</a><ul><li class="first"><a href="/forum/professional-wrestling/f.98/">Professional Wrestling</a></li><li><a href="/forum/entertainment-sports/f.323/">Entertainment Sports</a></li><li><a href="/forum/2010-fifa-world-cup/f.627/">2010 FIFA Would Cup</a></li></ul></li></ul></li><li><a class="extended" href="/forum/artist-s-corner/c.6/">Artist\'s Corner</a><ul><li class="first"><a class="extended" href="/forum/art-discussion/f.6/">Art Discussion</a><ul><li class="first"><a href="/forum/gaia-art-walk/f.575/">Gaia Art Walk</a></li><li><a href="/forum/art-arena-discussion/f.315/">Art Arena Discussion</a></li><li><a href="/forum/promotions/f.52/">Promotions</a></li><li><a class="extended" href="/forum/textiles-and-crafts/f.103/">Textiles and Crafts</a><ul><li class="first"><a href="/forum/cosplay/f.29/">Cosplay</a></li></ul></li><li><a href="/forum/musician-s-forum/f.32/">Musician\'s Forum</a></li><li><a href="/forum/comic-creators/f.105/">Comic Creators</a></li><li><a href="/forum/performing-arts/f.107/">Performing Arts</a></li></ul></li><li><a class="extended" href="/forum/writers/f.15/">Writers</a><ul><li class="first"><a href="/forum/books/f.85/">Books</a></li><li><a href="/forum/promotions/f.52/">Promotions</a></li><li><a href="/forum/writing-arena-discussion/f.397/">Writing Arena Discussion</a></li><li><a href="/forum/original-poetry-lyrics/f.34/">Original Poetry/Lyrics</a></li><li><a href="/forum/original-stories-prose/f.35/">Original Stories/Prose</a></li><li><a href="/forum/fanfiction/f.95/">Fanfiction</a></li><li><a href="/forum/collaborative-works/f.38/">Collaborative works</a></li><li><a href="/forum/writing-contests/f.75/">Writing Contests</a></li></ul></li><li><a class="extended" href="/forum/picture-post/f.7/">Picture Post</a><ul><li class="first"><a href="/forum/works-in-progress/f.33/">Works in Progress</a></li><li><a href="/forum/art-contests/f.46/">Art Contests</a></li></ul></li></ul></li><li><a class="extended" href="/forum/hot-topics/c.27/">Hot Topics</a><ul><li class="first"><a href="/forum/twilight-saga/f.587/">Twilight Saga</a></li><li><a href="/forum/cosplay/f.29/">Cosplay</a></li><li><a href="/forum/summer-blockbusters/f.635/">Summer Blockbusters</a></li><li><a href="/forum/what-i-m-doing-this-summer/f.639/">What I\'m Doing This Summer</a></li></ul></li><li><a class="extended" href="/forum/misc-forums/c.7/">Misc</a><ul><li class="first"><a href="/forum/test-forum/f.8/">Test Forum</a></li><li><a href="/forum/gaia-polls/f.96/">Gaia Polls</a></li><li><a class="extended" href="/forum/memorable-threads/f.20/">Memorable Threads</a><ul><li class="first"><a href="/forum/5th-annual-ball/f.251/">5th Annual Ball</a></li><li><a href="/forum/wwe-summerslam/f.279/">WWE SummerSlam</a></li><li><a href="/forum/easter-egg-hunt/f.88/">Easter Egg Hunt</a></li><li><a href="/forum/annual-gaia-ball/f.65/">Annual Gaia Ball</a></li><li><a href="/forum/halloween-party/f.51/">Halloween Party</a></li><li><a href="/forum/6th-annual-ball/f.389/">6th Annual Ball</a></li><li><a href="/forum/7th-annual-ball/f.541/">7th Annual Ball</a></li></ul></li><li><a class="extended" href="/forum/hot-topics-archive/f.597/">Hot Topics Archive</a><ul><li class="first"><a href="/forum/lost-season-6/f.589/">Lost - Season 6</a></li><li><a href="/forum/michael-jackson-tribute/f.633/">Michael Jackson Tribute</a></li><li><a href="/forum/haiti-quake/f.583/">Haiti Quake</a></li><li><a href="/forum/spring-break-stories/f.617/">Spring Break Stories</a></li><li><a href="/forum/american-idol-season-9/f.593/">American Idol - Season 9</a></li><li><a href="/forum/2010-winter-olympics/f.591/">2010 Winter Olympics</a></li><li><a href="/forum/2010-fifa-world-cup/f.627/">2010 FIFA World Cup</a></li><li><a href="/forum/april-fool-s-jokes/f.613/">April Fool\'s Jokes</a></li><li><a href="/forum/justin-bieber/f.595/">Justin Bieber</a></li><li><a href="/forum/healthcare-reform/f.611/">Healthcare Reform</a></li><li><a href="/forum/organizations-at-war/f.110/">Organizations At War</a></li><li><a href="/forum/frank-frazetta-tribute/f.623/">Frank Frazetta Tribute</a></li><li><a href="/forum/graduation-beyond/f.625/">Graduation & Beyond</a></li><li><a href="/forum/glee/f.615/">Glee</a></li></ul></ul></li></ul></li>';
	var Community='<li id="community_menu" class="standard_ext"><a class="header" href="/community">Community</a><ul><li class="first"><a href="/forum/" class="extended">Forums</a><ul><li class="first"><a href="/forum/myposts/">My Posts</a></li><li><a href="/forum/mytopics/">My Latest Topics</a></li><li><a href="/forum/subscription/">My Thread Subscriptions</a></li>'+Forums+'<li><a href="/info/index.php?mode=safety">Safety Tips</a></li></ul></li><li><a href="/guilds/" class="extended">Guilds</a><ul><li class="first"><a class="extended" href="/guilds/?gmode=myguilds">My Guilds</a><ul id="GM_Guilds"><li class="first"><img class="ajax_loading" src="http://'+imgServer+'/images/template/dropdown/ajax-loader.gif"/></li></ul></li><li><a href="/guilds/?gmode=create">Create</a></li><li><a href="/forum/registered-guilds/gaia-guilds-rules-faq/t.47199021/">FAQ</a></li></ul></li><li><a href="/clans" class="extended">Clans</a><ul><li class="first"><a href="/clans/my/">My Clan</a></li></ul></li><li><a href="/arena/" class="extended">Arenas</a><ul><li class="first"><a href="/arena/art/" class="extended">Art</a><ul><li class="first"><a href="/arena/art/painting-and-drawing/vote/">Painting &amp; Drawing</a></li><li><a href="/arena/art/photography/vote/">Photography</a></li><li><a href="/arena/art/comics/vote/">Comics</a></li></ul></li><li><a href="/arena/writing/" class="extended">Writing</a><ul><li class="first"><a href="/arena/writing/fiction/vote/">Fiction</a></li><li><a href="/arena/writing/non-fiction/vote/">Non-Fiction</a></li><li><a href="/arena/writing/poetry-and-lyrics/vote/">Poetry and Lyrics</a></li></ul></li><li><a href="/arena/gaia/homes/">Homes</a></li><li><a class="extended" href="/arena/gaia/avatar">Avatar</a><ul><li class="first"><a href="/arena/gaia/original-avatar/vote/">Original Avatar</a></li><li><a href="/arena/gaia/cosplay-avatar/vote/">Cosplay Avatar</a></li></ul></li><li><a href="/arena/contest/">Contests</a></li><li><a class="extended" href="/arena/entries/gaia/avatar/">Submit Entry</a><ul><li class="first"><a href="/arena/entries/art/">Art</a></li><li><a href="/arena/entries/writing/">Writing</a></li><li><a href="/arena/entries/gaia/avatar/">Avatar</a></li><li><a href="/arena/entries/gaia/homes/">Home</a></li></ul></li></ul></li><li><a href="/news-and-events/">News &amp; Events</a></li><li><a href="/search/">Old Search</a></li><li><a href="/gsearch">New Search</a></li><li><a href="/conventions">Conventions</a></li><li><a href="/mischiefmakers/">Mischief Makers</a></li></ul></li>';
	var World='<li id="world_menu" class="standard"><a class="header" href="/world">World</a><ul><li class="first"><a href="#" class="extended">Storyline</a><ul><li class="first"><a href="/newsroom/?type=manga">Manga</a></li><li><a href="/newsroom/?type=weekly">Mini Comics</a></li><li><a href="/newsroom/">News Room</a></li></ul></li><li id="gaia_menuitem_towns"><a onclick="window.open(this.href,\'status=yes,scrollbars=no,menubar=no,location=no\',\'width=740,height=580\');return false;" href="/launch/towns" class="extended">Towns</a><ul><li class="first"><a href="/homes/">My Home</a></li></ul></li><li><a href="/cinema/movies/">Cinemas</a></li><li><a href="/cinema/vj/">Video Lounge</a></li><li><a href="#" class="extended">Sponsored Worlds</a><ul><li class="first"><a id="gaia_menuitem_mtv" target="_blank" onclick="window.open(this.href,\'status=yes,scrollbars=no,menubar=no,location=no\',\'width=740,height=580\');return false;" href="/launch/mtv">Virtual Hollywood</a></li><li><a target="_blank" onclick="window.open(this.href,\'status=yes,scrollbars=no,menubar=no,location=no\',\'width=740,height=580\');return false;" href="/launch/foreststage">Earth Day Forest Stage</a></li><li><a target="_blank" onclick="window.open(this.href,\'status=yes,scrollbars=no,menubar=no,location=no\',\'width=740,height=580\');return false;" href="/launch/coke">Coke 2010</a></li></ul></li><li><a href="/downloads">Downloads</a></li><li><a class="extended" href="/labs">Gaia Labs</a><ul><li class="first"><a href="http://userscripts.org/users/62850/scripts">Gresemonkey Scripts</a></li></ul></li><li><a href="/conventions">Conventions</a></li></ul>';
	var Games='<li id="games_menu" class="standard"><a class="header" href="/games">Games</a><ul><li id="gaia_menuitem_zomg" class="first"><a target="_blank" href="/launch/zomg" class="extended">zOMG!</a><ul><li class="first"><a target="_blank" href="/games/zomg/">zOMG! Microsite</a></li><li><a href="/gaia/shopping.php/?key=uhxrdnkgimmkhslj">Buy Power-Ups &amp; Gear!</a></li></ul></li><li id="gaia_menuitem_rally"><a target="_blank" onclick="window.open(this.href,\'status=yes,scrollbars=no,menubar=no,location=no\',\'width=740,height=580\');return false;" href="/launch/rally" class="extended">Rally</a><ul><li class="first"><a href="/gaia/shopping.php/?key=gxqxrbzixwydqakn">Buy Car Parts</a></li><li><a href="/auto/">Build a Car</a></li></ul></li><li id="gaia_menuitem_jigsaw"><a target="_blank" onclick="window.open(this.href,\'status=yes,scrollbars=no,menubar=no,location=no\',\'width=770,height=585\');return false;" href="/launch/gameshell?game=jigsaw">Jigsaw</a></li><li id="gaia_menuitem_fishing"><a target="_blank" href="/launch/fishing" class="extended">Fishing</a><ul><li class="first"><a href="#" onclick="return false;" class="extended">Select a Lake</a><ul><li id="gaia_menuitem_fishing_bassken" class="first"><a target="_blank" href="/launch/fishing?l=bassken">Bass\'ken Lake</a></li><li id="gaia_menuitem_fishing_gambino"><a target="_blank" href="/launch/fishing?l=gambino">Port of Gambino</a></li><li id="gaia_menuitem_fishing_durem"><a target="_blank" href="/launch/fishing?l=durem">Durem Reclamation Facility</a></li></ul></li><li><a href="/gaia/shopping.php/?key=alpltfbdnxgowsfn">Buy Bait &amp; Sell Fish</a></li></ul></li><li id="gaia_menuitem_slots"><a target="_blank" href="/launch/slots" class="extended">Slots</a><ul><li class="first"><a href="/gaia/store.php?id=14f247">Buy Tokens</a></li><li><a href="/gaia/shopping.php/?key=ndroctlqvprghqqy">Cash-in Winnings</a></li></ul></li><li id="gaia_menuitem_blackjack"><a target="_blank" onclick="window.open(this.href,\'status=yes,scrollbars=no,menubar=no,location=no\',\'width=640,height=580\');return false;"  href="/launch/blackjack" class="extended">Cards</a><ul><li class="first"><a href="/gaia/store.php?id=14f247">Buy Tokens</a></li><li><a href="/gaia/shopping.php/?key=ndroctlqvprghqqy">Cash-in Winnings</a></li></ul></li><li id="gaia_menuitem_wordbump"><a target="_blank" onclick="window.open(this.href,\'status=yes,scrollbars=no,menubar=no,location=no\',\'width=640,height=480\');return false;" href="/launch/wordbump">Wordbump</a></li><li id="gaia_menuitem_gameshell"><a target="_blank" onclick="window.open(this.href,\'status=yes,scrollbars=no,menubar=no,location=no\',\'width=770,height=585\');return false;" href="/launch/gameshell?game=gPinball">Pinball</a></li><li id="gaia_menuitem_elf"><a target="_blank" href="/launch/gameshell?game=electricLoveFaktori">Electric Love Faktori</a></li><li><a class="extended" title="Aquarium Forum" href="/forum/f.393">Booty Grab</a><ul><li class="first"><a href="/forum/t.47289201">Lagginess Tips</a></li><li><a target="_blank" href="http://absol.site88.net/gtools/glowTime.php">Aquarium Analyzer</a></li><li><a href="http://absol.site88.net/gtools/fishreview.php?stats=true">Fish Stats</a></li><li><a href="http://absol.site88.net/gtools/tanklist.php">Aquarium List</a></li></ul><li><a href="/lotto">Gold Lotto</a></li></li></ul></li>';
	var tektek='<li id="tektek_menu" class="standard"><a class="header" href="http://www.tektek.org">Tektek</a><ul><li class="first"><a class="extended" href="http://www.tektek.org/gaia/items.php">Gaia Items</a><ul><li class="first"><a class="extended" href="http://www.tektek.org/gaia/rare_items/">Rare Items</a><ul><li class="first"><a href="http://www.tektek.org/gaia/rare_items/ancient">Ancient Chest</a></li><li><a href="http://www.tektek.org/gaia/rare_items/animalquackers">Animal Quackers</a></li><li><a href="http://www.tektek.org/gaia/rare_items/aquarium">Aquarium Overseer</a></li><li><a href="http://www.tektek.org/gaia/rare_items/azrael">Azrael\'s Trickbox</a></li><li><a href="http://www.tektek.org/gaia/rare_items/brown">Brown Giftbox</a></li><li><a href="http://www.tektek.org/gaia/rare_items/blue">Blue Giftbox</a></li><li><a href="http://www.tektek.org/gaia/rare_items/codealpha">Code Alpha</a></li><li><a href="http://www.tektek.org/gaia/rare_items/darkreflection">Dark Reflection</a></li><li><a href="http://www.tektek.org/gaia/rare_items/emeraldseed">Emerald Seed</a></li><li><a href="http://www.tektek.org/gaia/rare_items/famestar2000">FAMESTAR 2000</a></li><li><a href="http://www.tektek.org/gaia/rare_items/famestarhero">Famestar Hero</a></li><li><a href="http://www.tektek.org/gaia/rare_items/fishdrops">Fish Drops</a></li><li><a href="http://www.tektek.org/gaia/rare_items/fluff">Fluff Box</a></li><li><a href="http://www.tektek.org/gaia/rare_items/fortuneegg">Fortune Egg</a></li><li><a href="http://www.tektek.org/gaia/rare_items/geeboiturbo">Gee Boi Turbo</a></li><li><a href="http://www.tektek.org/gaia/rare_items/lexbox">LeXbox</a></li><li><a href="http://www.tektek.org/gaia/rare_items/lonelystar">Lonely Star</a></li><li><a href="http://www.tektek.org/gaia/rare_items/lovecharm">Love Charm</a></li><li><a href="http://www.tektek.org/gaia/rare_items/lunasincense">Luna\'s Incense</a></li><li><a href="http://www.tektek.org/gaia/rare_items/midsummerswirl">Midsummer Swirl</a></li><li><a href="http://www.tektek.org/gaia/rare_items/mysterymood">Mystery Mood</a></li><li><a href="http://www.tektek.org/gaia/rare_items/nightmare">Nightmare Box</a></li><li><a href="http://www.tektek.org/gaia/rare_items/perfecttragedy">Perfect Tragedy</a></li><li><a href="http://www.tektek.org/gaia/rare_items/pink">Pink Giftbox</a></li><li><a href="http://www.tektek.org/gaia/rare_items/poseidonslegacy">Poseidon\'s Legacy</a></li><li><a href="http://www.tektek.org/gaia/rare_items/repolamp">Repo Lamp</a></li><li><a href="http://www.tektek.org/gaia/rare_items/snowapple">Snow Apple</a></li><li><a href="http://www.tektek.org/gaia/rare_items/suspiciouspackage">Supicious Package</a></li><li><a href="http://www.tektek.org/gaia/rare_items/toxicdrop">Toxic Drop</a></li></ul></li><li><a href="http://www.tektek.org/gaia/list_active.php?show=rising">Rising</a></li><li><a href="http://www.tektek.org/gaia/list_active.php?show=falling">Falling</a></li><li><a href="http://www.tektek.org/gaia/evolution">Evolving Items</a></li><li><a href="http://www.tektek.org/gaia/item_search.php?search=cash_shop">Cash Shop Items</a></li><li><a class="extended" href="http://www.tektek.org/gaia/aquarium/">Aquarium Items</a><ul><li class="first"><a href="http://www.tektek.org/gaia/aquarium/new">New</a></li><li><a href="http://www.tektek.org/gaia/aquarium/backgrounds">Backgrounds</a></li><li><a href="http://www.tektek.org/gaia/aquarium/decorations">Decorations</a></li><li><a href="http://www.tektek.org/gaia/aquarium/fish">Fish</a></li></ul><li><a class="extended" href="http://www.tektek.org/gaia/zomg/items/">zOMG Items</a><ul><li class="first"><a href="http://www.tektek.org/gaia/zomg/items/crafted_items">Crafted Items</a></li><li><a href="http://www.tektek.org/gaia/zomg/items/recipes">Recipes</a></li><li><a href="http://www.tektek.org/gaia/zomg/items/rings">Rings</a></li><li><a href="http://www.tektek.org/gaia/zomg/items/raw_materials">Raw Materials</a></li></ul></li><li class="oversized_ext"><a class="extended" href="http://www.tektek.org/gaia/collectables">Monthly Collectible Items</a><ul><li class="first"><a href="http://www.tektek.org/gaia/rare_items/2003">2003</a></li><li><a href="http://www.tektek.org/gaia/rare_items/2004">2004</a></li><li><a href="http://www.tektek.org/gaia/rare_items/2005">2005</a></li><li><a href="http://www.tektek.org/gaia/rare_items/2006">2006</a></li><li><a href="http://www.tektek.org/gaia/rare_items/2007">2007</a></li><li><a href="http://www.tektek.org/gaia/rare_items/2008">2008</a></li><li><a href="http://www.tektek.org/gaia/rare_items/2009">2009</a></li><li><a href="http://www.tektek.org/gaia/rare_items/2010">2010</a></li></ul></li><li><a href="/forum/t.9103857">GaiaOnline Thread</a></li></ul></li><li><a class="extended" href="http://www.tektek.org/dream/">Dream Avatar</a><ul><li class="first"><a href="http://www.tektek.org/dream/dream.php">Start</a></li><li><a href="http://www.tektek.org/dream/dream_free.php?avatar=1668351">Dream Free</a></li><li><a href="http://www.tektek.org/gaia/worth.php?environment">Inventory tektek</a></li><li><a href="http://www.tektek.org/avatars">Search Avatars</a></li><li><a href="http://www.tektek.org/contest/">Avatar Contest</a></li><li><a href="/forum/t.9671288/">GaiaOnline Thread</a></li></ul></li><li><a class="extended" href="http://www.tektek.org/profiles/">Gaia Profiles</a><ul><li class="first"><a class="extended" href="http://www.tektek.org/profiles/oldschool">Classic / Old School</a><ul><li class="first"><a href="http://www.tektek.org/profiles/oldschool/new">Newest</a></li><li><a href="http://www.tektek.org/profiles/oldschool/top">Top Rated</a></li><li><a href="http://www.tektek.org/profiles/oldschool/category">Categories</a></li><li><a href="http://www.tektek.org/profiles/oldschool/upcoming">Upcomming</a></li><li><a href="http://www.tektek.org/profiles/oldschool/pending">Pending</a></li></ul><li><a class="extended" href="http://www.tektek.org/profiles/newschool">Current / New Version</a><ul><li class="first"><a href="http://www.tektek.org/profiles/newschool/new">Newest</a></li><li><a href="http://www.tektek.org/profiles/newschool/top">Top Rated</a></li><li><a href="http://www.tektek.org/profiles/newschool/category">Categories</a></li><li><a href="http://www.tektek.org/profiles/newschool/upcoming">Upcomming</a></li><li><a href="http://www.tektek.org/profiles/newschool/pending">Pending</a></li></ul></li><li><a href="http://www.tektek.org/profiles/multimedia">YouTube Video</a></li></li></ul></li><li><a class="extended" href="http://www.tektek.org/gaia_toolbar/">Gaia Toolbar</a><ul><li class="first"><a href="/forum/t.8092647/">GaiaOnline Thread</a></li><li><a href="http://www.tektek.org/gaia_toolbar/changelog">View All Changes</a></li></ul></li><li><a class="extended" href="http://www.tektek.org/auto/">AutoTek</a><ul><li class="first"><a href="http://www.tektek.org/gaia/list_auto.php">Auto Parts List</a></li><li><a href="/forum/t.28621813">GaiaOnline Thread</a></li></ul></li><li><a href="http://www.tektek.org/questbar/">Questbar</a></li><li><a href="http://www.tektek.org/color/">Gradient Text</a></li><li><a href="http://www.tektek.org/gaia/worth.php">Calculate Account Worth</a></li><li><a href="http://www.tektek.org/gaia/price/compare/">Compare Item Values</a></li><li><a href="http://www.tektek.org/account/signup.vex">Random Signature</a></li></ul></li>';
	var GuildThreads='<li class="extended"><a href="http://www.gaiaonline.com/guilds/viewforum.php?f=861743">Guild Threads</a><ul><li class="first"><a href="http://www.gaiaonline.com/guilds/viewtopic.php?t=19410179">Dolphin</a></li><li><a href="http://www.gaiaonline.com/guilds/viewforum.php?f=861743">Monster</a></li><li><a href="http://www.gaiaonline.com/guilds/viewtopic.php?t=19409469">Mixed</a></li><li><a href="http://www.gaiaonline.com/guilds/viewtopic.php?t=19409005">Momo</a></li><li><a href="http://www.gaiaonline.com/guilds/viewtopic.php?t=19409021">Gwee</a></li><li><a href="http://www.gaiaonline.com/guilds/viewtopic.php?t=19416999">Meat</a></li><li><a href="http://www.gaiaonline.com/guilds/viewtopic.php?t=19409017">Mermaid</a></li><li><a href="http://www.gaiaonline.com/guilds/viewtopic.php?t=19409631">Now Glowing</a></li></ul></li>';
	var DM='<li id="dm_menu" class="standard_ext"><a class="header" href="http://www.gaiaonline.com/guilds/?guild_id=245893">DolphinMania</a><ul><li class="first"><a href="http://www.gaiaonline.com/guilds/?guild_id=245893">Guild</a><ul><li class="first"><a href="http://www.gaiaonline.com/guilds/?guild_id=245893">Home</a></li><li><a href="http://www.gaiaonline.com/guilds/viewforum.php?f=693715">Forums</a><ul><li class="first"><a href="http://www.gaiaonline.com/guilds/viewforum.php?f=694511">Announcements And Stickies</a><ul><li class="first"><a href="http://www.gaiaonline.com/guilds/viewtopic.php?t=18050877">Site Feedback</a></li><li><a href="http://www.gaiaonline.com/guilds/viewtopic.php?t=18050733">Site Comments</a></li><li><a href="http://www.gaiaonline.com/guilds/viewtopic.php?t=18997527">Custom Pages</a></li><li><a href="http://www.gaiaonline.com/guilds/viewtopic.php?t=18032695">About DMv2</a></li><li><a href="http://www.gaiaonline.com/guilds/viewtopic.php?t=18590981">Birthdays</a></li><li><a href="http://www.gaiaonline.com/guilds/viewtopic.php?t=18209479">Tank Stalker</a></li><li><a href="http://www.gaiaonline.com/guilds/viewtopic.php?t=18050979">Stories</a></li><li><a href="http://www.gaiaonline.com/guilds/viewtopic.php?t=18824811">Remove BG Comments</a></li><li><a href="http://www.gaiaonline.com/guilds/viewtopic.php?t=18213191">Less Lag</a></li><li><a href="http://www.gaiaonline.com/guilds/viewtopic.php?t=18203251">Guild Suggestions</a></li><li><a href="http://www.gaiaonline.com/guilds/viewtopic.php?t=18361557">DM Persona</a></li><li><a href="http://www.gaiaonline.com/guilds/viewtopic.php?t=18364763">Another BG Way</a></li><li><a href="http://www.gaiaonline.com/guilds/viewtopic.php?t=18092535">DM Toolbar</a></li></ul></li><li><a href="http://www.gaiaonline.com/guilds/viewforum.php?f=694681">Quest</a></li><li><a href="http://www.gaiaonline.com/guilds/viewforum.php?f=696317">Guides/Help</a></li><li><a href="http://www.gaiaonline.com/guilds/viewforum.php?f=705003">Contest</a></li><li><a href="http://www.gaiaonline.com/guilds/viewforum.php?f=708315:>Recycle Bin</a></li><li><a href="http://www.gaiaonline.com/guilds/viewforum.php?f=728267">Crew</a></li><li><a href="http://www.gaiaonline.com/guilds/viewforum.php?f=728267">Affiliates</a></li>'+GuildThreads+'<li><a href="http://www.gaiaonline.com/guilds/viewforum.php?f=930525">Memorable Threads</a></li></ul></li><li><a href="http://www.gaiaonline.com/guilds/?gmode=memberlist&guild_id=245893">Members</a></li><li><a href="http://www.gaiaonline.com/guilds/admin/id.245893/">Mod Panel</a></li><li><a href="http://www.gaiaonline.com/spotlight?action=recommend&type=guild&target_id=2&n=1383421805.1277178541.1074006355">Recommend</a></li><li><a href="http://www.gaiaonline.com/guilds/?guild_id=245893&gmode=requestjoin">Join</a></li></ul></li><li><a href="http://www.gaiaonline.com/forum/t.56237483/">Thread</a></li><li><a href="http://pandaandpenguin.com/forum/">P&P Forums</a></li><li><a onclick="javascript: alert(\'Dolphin Mania was unfortunatly shut down. D:\'); alert(\'The farewell video link is:http://www.youtube.com/watch?v=O-z-ulJpwOk\');" href="#">Dolphin Mania</a></li>'+GuildThreads+'</ul></li>';
	var TL='<li id="threadList_menu" class="standard_ext"><a class="header" href="http://www.threadlist.comuf.com/" target="_blank">Thread List</a><ul><li><a href="http://www.threadlist.comuf.com/">Home</a></li><li><a target="_blank" href="http://www.threadlist.comuf.com/mythreads">Awesome\'s Threads</a></li><li><a href="http://www.threadlist.comuf.com/dolphins/" target="_blank">Dolphin</a></li><li><a target="_blank" href="http://www.threadlist.comuf.com/momos/">Momo</a></li><li><a target="_blank" href="http://www.threadlist.comuf.com/gwees/">Gwee</a></li><li><a target="_blank" href="http://www.threadlist.comuf.com/minimonsters/">Mini-Monster</a></li><li><a target="_blank" href="http://www.threadlist.comuf.com/watermeats/">Watermeat</a></li><li><a target="_blank" href="http://www.threadlist.comuf.com/starfish/">Starfish</a></li><li><a target="_blank" href="http://www.threadlist.comuf.com/mixed/">Mixed</a></li><li><a target="_blank" href="http://www.threadlist.comuf.com/mermaids/">Mermaid</a></li><li><a target="_blank" href="http://www.threadlist.comuf.com/report/">Report Thread</a></li><li><a target="_blank" href="http://www.threadlist.comuf.com/add/">Add A Thread</a></li></ul></li>';
	if(getId('color_menu')){
		var js="document.getElementById(document.getElementById('color_switcher_wrap').className).removeAttribute('class');(new YAHOO.gaia.widgets.MegaMenu()).handleMouseClick('click',this);this.className='selected';return false;";
		Color='<li id="color_menu" class="standard"><a class="header" onclick="return false;" href="#"><img src="http://'+imgServer+'/images/gaia_global/body/arrows/ic_hyperlink_arrow_15x15_down.png"/></a><ul><li class="first"><a href="#" onclick="'+js+'" id="green"><span class="panel_img"></span>Green</a></li><li><a onclick="'+js+'" href="#" id="pink"><span class="panel_img"></span>Pink</a></li><li><a href="#" onclick="'+js+'" id="yellow"><span class="panel_img"></span>Yellow</a></li><li><a href="#" onclick="'+js+'" id="red"><span class="panel_img"></span>Red</a></li><li><a href="#" onclick="'+js+'" id="blue"><span class="panel_img"></span>Blue</a></li><li><a href="#" onclick="'+js+'" id="purple"><span class="panel_img"></span>Purple</a></li><li><a href="#" onclick="'+js+'" id="grey"><span class="panel_img"></span>Gray</a></li><li><a href="#" onclick="'+js+'" id="classic"><span class="panel_img"></span>Classic</a></li></ul></li>';
	}
	var QuickLinks='<li id="quick_links" class="standard_ext"><a href="#" onclick="return false;" class="header">Quick Links</a><ul></ul></li>';
	var Search='<li id="gm_search" class="standard"><a class="header" title="Click to lock open" onclick="this.blur();if(this.parentNode.className.indexOf(\'locked\')!=-1){this.parentNode.className=this.parentNode.className.replace(\' locked\',\'\');this.title=\'Click to lock open\';}else{this.parentNode.className+=\' locked\';this.title=\'Click to unlock\';}return false;" href="#">Search</a><ul><li class="first"><form id="GM_Search_Form" action="#" onsubmit="return false"><select name="type" id="GM_Search_Type" onfocus="this.parentNode.parentNode.style.height=\'370px\';" onblur="this.parentNode.parentNode.style.height=\'\';"><option class="one" value="undefined">Search...</option><option class="one" value="friend">For Friends</option><option class="one" value="google.gaia">Entire Site</option><optgroup label="Community"><option class="two" value="">Entire Community</option><option class="two" value="users.username">Users by Username</option><option class="two" value="users.interest">Users by Interest</option><option class="two" value="topics.tag">Forums</option><option class="three" value="topics.user">Topics by User</option><option class="three" value="posts.user">Post by User</option><option class="two" value="guilds.tag">Guilds</option></optgroup><optgroup label="Marketplace"><option class="two" value="market">Using the Marketplace</option><option class="two" value="tektek">Using TekTek.org</option></optgroup><optgroup label="Arenas"><option class="two" value="user">Submissions by user</option><option class="two" value="username">Entries by username</option><option class="two" value="all">All Categories</option><option class="two" value="8">Homes</option><option class="two" value="avatar">Avatar</option><option class="three" value="7">Original</option><option class="three" value="27">Cosplay</option><option class="two" value="picture">Art</option><option class="three" value="1">Comics</option><option class="three" value="2">Painting and Drawing</option><option class="three" value="3">Photography</option><option class="two" value="text">Writing</option><option class="three" value="4">Fiction</option><option class="three" value="5">Non-Fiction</option><option class="three" value="6">Poetry and Lyrics</option><option class="three" value="32">High School Flashback</option></optgroup></select><input name="text" id="GM_Search_Text" value="Gaia Search" type="text" name="val" onfocus="if(this.value==\'Gaia Search\'){this.value=\'\';}" onblur="if(this.value==\'\'){this.value=\'Gaia Search\';}"/><input id="GM_Search_Gbtn" type="submit"/></form><div style="text-align:left;width:45%;float:left;padding:4px;">Can\'t find a link? Try this &darr;</div><div style="text-align:right;width:45%;float:right;"><a href="/gsearch">Altnerative Search Page</a></div><form id="linkFinderForm" action="javascript:var LS=document.getElementById(\'GM_linksSearch\');if(LS.value){void(document.location.href=LS.value);}else{var LF=document.getElementById(\'GM_linkFinder\');LF.value=\'Type link name here\';LF.select();}"><input type="text" id="GM_linkFinder" value="Type link name here" onfocus="if(this.value==\'Type link name here\'){this.value=\'\'}" onblur="if(this.value==\'\'){this.value=\'Type link name here\'}"/><input id="GM_SearchGo" value="GO" type="submit"/><br/><select id="GM_linksSearch" ondblclick="this.parentNode.submit();" size="15"></select><input onclick="this.select();" id="GM_searchMenuStatusBar" style="border:none;background:none;width:100%;" readonly="readonly"/></form></li></ul></li>';
	ele.innerHTML=Home+MyGaia+Shop+Community+World+Games+DM+TL+tektek+Color/*+QuickLinks*/+Search;
	if(selectedTab){
		getId(selectedTab).className+=' selected';
	}
	if(Color){
		getId(getId('color_switcher_wrap').className).className='selected';
	}
	try{
		unsafeWindow.YAHOO.QL=false;
		unsafeWindow.YAHOO.SF=false;
		unsafeWindow.YAHOO.FG=false;
	}
	catch(e){
		var QL=false;
		var SF=false;
		var FG=false;
		var MenuJSONlinks='';
	}
	getId('quick_links').addEventListener('mouseover',getQuickLinks,false);
	getId('GM_Guilds').parentNode.childNodes[0].addEventListener('mouseover',getMyFriendsAndGuilds,false);
	getId('GM_Friends').parentNode.childNodes[0].addEventListener('mouseover',getMyFriendsAndGuilds,false);
	getId('GM_suggFrnd').parentNode.childNodes[0].addEventListener('mouseover',getSuggFrnd,false);
	getId('GM_Search_Form').addEventListener('submit', function (){
		GM_Submit_Search(getId('GM_Search_Type').value,getId('GM_Search_Text').value);
	}, false);
	getId('GM_linkFinder').addEventListener('keyup',function(){
		generateList(this.value);
	},false);
	getId('GM_linksSearch').addEventListener('change',function(){
		if(this.value.indexOf('javascript:')==-1){
			getId('GM_searchMenuStatusBar').value=this.value;
		}
		else{
			getId('GM_searchMenuStatusBar').value=document.location.href+'#';
		}
	},false);
	getId('linkFinderForm').addEventListener('mouseover',function(){
		getMyFriendsAndGuilds();
		getQuickLinks();
		getSuggFrnd();
	},false);
}
else if(getId('gaia_menu_bar')){
	getId('gaia_menu_bar').setAttribute('style','background-color:#5A5163;border-top:1px solid black;border-bottom:1px solid black;background-image:none;');
}