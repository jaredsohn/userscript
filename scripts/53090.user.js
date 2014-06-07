// ==UserScript==
// @name          Gaia Menu Fix
// @description   Returns old menus back to gaia
// @include       http://www.gaiaonline.com/*
// @include       http://avatarsave.gaiaonline.com/*
// @version       111
// @updateURL     https://userscripts.org/scripts/source/53090.meta.js
// @downloadURL   https://userscripts.org/scripts/source/53090.user.js
// ==/UserScript==
// If using BetterGaia user version 0.2.2.3 or higher (if better gaia required version) you must have it set to classic navigation options → styles → other → use classic navigation. (This will add a few links) BTW read the comments.
//var now=new Date();
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
	if(!type||type=='users'||type=='interest'||type=='forums'||type=='guilds'||type=='all '){
		GM_openInTab("http://www.gaiaonline.com/gsearch/?query="+text+"&category="+type);
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
		var menus="mygaia_menu,shopping_menu,community_menu,world_menu,games_menu,tektek_menu".split(',');
		json.push({name:'Home',link:'http://'+document.domain+'/'});
		for(var x=0;x<menus.length;x++){
			var links=getId(menus[x]);
			if(x<6){
				json.push({name:links.childNodes[0].textContent,link:links.childNodes[0].href});
			}
			links=links.childNodes[1].getElementsByTagName('a');
			for(var i=0;i<links.length;i++){
				if(links[i].href){
					if(links[i].href.substr(-1)!="#"){
						if(!json[links[i].textContent]){
							json.push({name:links[i].parentNode.parentNode.parentNode.childNodes[0].textContent+' → '+links[i].textContent,link:links[i].href});
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
function getForums(){
	try{
		var test=unsafeWindow.YAHOO.GF;
	}
	catch(e){
		var test=GF;
	}
	if(!test){
		unsafeWindow.YAHOO.GF=true;
		GM_xmlhttpRequest({
			method: "GET",
			url: 'http://awesomolocity.org/gtools/background/gaiaForums.php',
			onload: function(r){
				getId('GM_Forums').innerHTML=r.responseText;
			},
			onerror: function(){
				try{
					unsafeWindow.YAHOO.GF=false;
				}
				catch(e){
					GF=false;
				}
				getId('GM_Forums').innerHTML="Loading Error";
			}
		});
	}
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
				ele.innerHTML='';
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
						var fId=json['data'][i]["url"].split('/')[5];
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
function popupJS(w,h){
	return 'onclick="if(!this.parentNode.id){window.open(this.href,\'status=yes,scrollbars=no,menubar=no,location=no\',\'width='+(w==0?740:w)+',height='+(h==0?580:h)+'\');}return false;"';
}
function changeColor(ele){// Wonder how many people would lol if I called this changeRace
	document.evaluate('.//li[@id="color_menu"]/ul/li/a[@data-color="'+getId('gaia_header').getAttribute('data-lastcolor')+'"]',document,null,9,null).singleNodeValue.className=(typeof ele=='string'?'color_option selected':'color_option');
	if(typeof ele=='object'){
		(new YAHOO.gaia.widgets.MegaMenu()).handleMouseClick('click');
		GM_log('hello world')
		ele.className='color_option selected';
	}
	return false;
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
		var usrid=document.getElementsByClassName('panel_mygaia_profile')[0].getElementsByTagName('a')[0].href.split('/');
		usrid=usrid[usrid.length-2];
		if(isNaN(usrid)){
			makeError();
		}
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
			var usrid=getId('gmSelectLogin').className;
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
	GM_addStyle("\n.goldMessage,div#qr_container,div#variations div.variation_containers,body > div.yui-tt.autoTooltip,#floating_outfits{\n\tz-index:452!important;\n}\nbody:not(#fake_id) > div.mask{\n\tz-index:453!important;\n}\ndiv.yui-panel-container,#outfits_modal_c{\n\tz-index:454!important;\n}\n#home_content>div.yui-panel-container{\n\tz-index:450!important;\n}\n#nav > li > div{\n\tdisplay:none;\n}\n#newmenu{\n\tposition:absolute;\n\tz-index:451;\n\ttop:151px;\n}\n#newmenu #nav,#newmenu #nav ul{\n\tfont-size:12px;\n\tlist-style:none;\n\tline-height:1;\n}\n#newmenu ul#nav a{\n\tdisplay:block;\n\twidth:auto;\n\ttext-decoration:none;\n\tpadding:4px;\n\tcolor:black;\n}\n#newmenu ul#nav li:not(.navHeading){\n\t-moz-transition-property:background-color;\n\t-moz-transition-duration:0.8s;\n\t-o-transition-property:background-color;\n\t-o-transition-duration:0.8s;\n\t-webkit-transition-property:background-color;\n\t-webkit-transition-duration:0.8s;\n}\n#newmenu #nav a.extended{\n\tbackground-image:url('http://"+imgServer+"/src/yui/menu/assets/menuitem_submenuindicator.png');\n\tbackground-position:right center;\n\tbackground-repeat:no-repeat;\n\tpadding-right:16px;\n}\n#newmenu #nav li:hover a.header{\n\tbackground-color:#e7dfde;\n\tcolor:black;\n}\n#gaia_header:not(.colorswitcher-color-classic) #newmenu #nav li:hover a.header{\n\tcolor:white;\n}\n#newmenu #nav li{\n\tfloat:left;\n\twidth:12em;\n\tborder-width:0 1px 1px;\n\tborder-color:#9c969c;\n\tborder-style:solid;\n\tbackground-color:white;\n\tlist-style:none;\n}\n#newmenu #nav > li,#newmenu #nav > li:hover{\n\tborder:none;\n\tbackground-color:transparent;\n}\n#newmenu #nav li:hover,#newmenu #nav a:hover{\n\tbackground-color:#E7dfde;\n}\n.colorswitcher-color-default #newmenu #nav li:hover,.colorswitcher-color-default #newmenu #nav a:hover{\n\tbackground-color:lightblue;\n}\n.colorswitcher-color-red #newmenu #nav li:hover,.colorswitcher-color-red #newmenu #nav a:hover{\n\tbackground-color:#FF7D7D;\n}\n.colorswitcher-color-green #newmenu #nav li:hover,.colorswitcher-color-green #newmenu #nav a:hover{\n\tbackground-color:#AAFFAA;\n}\n.colorswitcher-color-yellow #newmenu #nav li:hover,.colorswitcher-color-yellow #newmenu #nav a:hover{\n\tbackground-color:#F0E68C;\n}\n.colorswitcher-color-pink #newmenu #nav li:hover,.colorswitcher-color-pink #newmenu #nav a:hover{\n\tbackground-color:#FFAAFF;\n}\n.colorswitcher-color-purple #newmenu #nav li:hover,.colorswitcher-color-purple #newmenu #nav a:hover{\n\tbackground-color:#D0AAF3;\n}\n.colorswitcher-color-grey #newmenu #nav li:hover,.colorswitcher-color-grey #newmenu #nav a:hover{\n\tbackground-color:darkgray;\n}\n#newmenu #nav li.selected{\n\tborder-right:solid #9c969c 1px;\n\tbackground-color:#856c97;\n}\n#gaia_menu_bar #newmenu #nav li.standard{\n\twidth:5em;\n}\n#gaia_menu_bar #newmenu #nav li.standard_ext{\n\twidth:8em;\n}\n#gaia_menu_bar #newmenu #nav > li{\n\tborder-right:solid #9c969c 1px;\n}\n#gaia_header:not(.colorswitcher-color-classic) #gaia_menu_bar #newmenu #nav > li{\n\tborder-right:solid black 1px;\n}\n#newmenu #nav li.first{\n\tborder-top:1px solid #9c969c;\n}\n#newmenu #nav li a.header{\n\ttext-align:center;\n\tcolor:white;\n\tfont-weight:bold;\n}\n#newmenu #nav li ul ul{\n\tmargin:-1.72em 0 0 12em;\n}\n#newmenu #nav li ul ul ul{\n\tmargin:-1.8em 0 0 12em;\n}\n#newmenu #nav li ul ul ul ul{\n\tmargin:-2.6em 0 0 12em;\n}\n#newmenu #nav li ul ul ul ul ul{\n\tmargin:-3.4em 0 0 12em;\n}\n#newmenu #nav li ul{\n\tposition:absolute;\n\twidth:12em;\n}\n#newmenu #nav li ul,#newmenu #nav li:hover ul ul,#newmenu #nav li:hover ul ul ul,#newmenu #nav li:hover ul ul ul ul,#newmenu #nav li:hover ul ul ul ul ul,#newmenu #nav li:hover ul ul ul ul ul ul{\n\tleft:-999em;\n\topacity:0;\n\t-moz-transition-property:opacity,-moz-box-shadow,box-shadow;\n\t-moz-transition-duration:0.8s;\n\t-o-transition-property:opacity,-o-box-shadow,box-shadow;\n\t-o-transition-duration:0.8s;\n\t-webkit-transition-property:opacity,-webkit-box-shadow,box-shadow;\n\t-webkit-transition-duration:0.8s;\n\t-moz-box-shadow: 6px 5px 5px rgba(0,0,0,0);\n\t-webkit-box-shadow: 6px 5px 5px rgba(0,0,0,0);\n\tbox-shadow: 6px 5px 5px rgba(0,0,0,0);\n}\n#newmenu #nav li:hover ul,#newmenu #nav li li:hover ul,#newmenu #nav li li li:hover ul,#newmenu #nav li li li li:hover ul,#newmenu #nav li li li li li:hover ul,#newmenu #nav li li li li li li:hover ul{\n\tleft:auto;\n\topacity:1;\n\t-moz-box-shadow: 6px 5px 5px rgba(0,0,0,0.3);\n\t-webkit-box-shadow: 6px 5px 5px rgba(0,0,0,0.3);\n\tbox-shadow: 6px 5px 5px rgba(0,0,0,0.3);\n}\n#newmenu #nav li li li li:hover ul,#newmenu #nav li li li li li:hover ul,#newmenu #nav li li li li li li:hover ul{\n\tmargin-top:-21px;\n}\n#newmenu #nav li.oversized_ext:hover>ul{\n\tmargin-top:-33px;\n}\n#gaia_header #gaia_menu_bar{\n\theight:20px;\n\tbackground-image:none;\n\tbackground-color:#5a5163;\n\tborder-top:1px solid black;\n\tborder-bottom:1px solid black;\n}\nbody #gaia_header:not(.colorswitcher-color-classic) #gaia_menu_bar{\n\theight:22px;\n\tborder-top:none;\n\tborder-bottom:none;\n}\n#gaia_header #gaia_menu_bar > #newmenu > #nav > #color_menu.standard > a.header{\n\tpadding-top:3px;\n\theight:13px!important;\n}\n#gaia_menu_bar .home_icon,#gaia_header:not(.colorswitcher-color-classic) #gaia_menu_bar .home_icon{\n\tpadding:0 9px;\n\tdisplay:inline;\n\tbackground-repeat:no-repeat;\n\tbackground-position:center;\n\tbackground-image:url('data:image/gif;base64,R0lGODlhDQAKAMQTAP////39/eXh6ZiIquTg6aaYtebj66OVs9jU3bmuxb+2ysvD1Pn4+r2zyPLx9JaGqNPM27Glvvb1+OTe2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABMALAAAAAANAAoAAAUv4CSOyGiOjQQYxTkNUADMTmIexKwDwfJMCsZuKIiIhjuTbrRkzpwA5fM4pUatohAAOw==');\n}\n#gaia_menu_bar a:hover .home_icon{\n\tbackground-image:url('data:image/gif;base64,R0lGODlhDQAKAKIEAAAAAJmZmWZmZjMzM+Te2AAAAAAAAAAAACH5BAEAAAQALAAAAAANAAoAAAMhSKoDs5AEQGmIomqxst7SJ16EWEGnkqrUspYtC6AxPBMJADs=')\n}\n#gaia_header:not(.colorswitcher-color-classic) #gaia_menu_bar #newmenu #nav li.selected,#gaia_header:not(.colorswitcher-color-classic) #gaia_menu_bar #newmenu #nav li:hover a.header{\n\tbackground-repeat:repeat-x;\n\tbackground-position:0 -1101px;\n}\n.colorswitcher-color-default #gaia_menu_bar #newmenu #nav li.selected,.colorswitcher-color-default #gaia_menu_bar #newmenu #nav li:hover a.header{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24.png');\n}\n.colorswitcher-color-red #gaia_menu_bar #newmenu #nav li.selected,.colorswitcher-color-red #gaia_menu_bar #newmenu #nav li:hover a.header{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_red.png');\n}\n.colorswitcher-color-green #gaia_menu_bar #newmenu #nav li.selected,.colorswitcher-color-green #gaia_menu_bar #newmenu #nav li:hover a.header{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_green.png');\n}\n.colorswitcher-color-yellow #gaia_menu_bar #newmenu #nav li.selected,.colorswitcher-color-yellow #gaia_menu_bar #newmenu #nav li:hover a.header{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_yellow.png');\n}\n.colorswitcher-color-pink #gaia_menu_bar #newmenu #nav li.selected,.colorswitcher-color-pink #gaia_menu_bar #newmenu #nav li:hover a.header{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_pink.png');\n}\n.colorswitcher-color-purple #gaia_menu_bar #newmenu #nav li.selected,.colorswitcher-color-purple #gaia_menu_bar #newmenu #nav li:hover a.header{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_purple.png');\n}\n.colorswitcher-color-grey #gaia_menu_bar #newmenu #nav li.selected,.colorswitcher-color-grey #gaia_menu_bar #newmenu #nav li:hover a.header{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_grey.png');\n}\nbody #gaia_header:not(.colorswitcher-color-classic) #gaia_menu_bar{\n\tbackground-position:0 -100px;\n}\n#gaia_header.colorswitcher-color-default #gaia_menu_bar,.colorswitcher-color-default #gaia_menu_bar #newmenu #nav li:hover a.header{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24.png');\n}\n#gaia_header.colorswitcher-color-pink #gaia_menu_bar,.colorswitcher-color-pink #gaia_menu_bar #newmenu #nav li:hover a.header{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_pink.png');\n}\n#gaia_header.colorswitcher-color-green #gaia_menu_bar,.colorswitcher-color-green #gaia_menu_bar #newmenu #nav li:hover a.header{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_green.png');\n}\n#gaia_header.colorswitcher-color-red #gaia_menu_bar,.colorswitcher-color-red #gaia_menu_bar #newmenu #nav li:hover a.header{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_red.png');\n}\n#gaia_header.colorswitcher-color-yellow #gaia_menu_bar,.colorswitcher-color-yellow #gaia_menu_bar #newmenu #nav li:hover a.header{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_yellow.png');\n}\n#gaia_header.colorswitcher-color-purple #gaia_menu_bar,.colorswitcher-color-purple #gaia_menu_bar #newmenu #nav li:hover a.header{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_purple.png');\n}\n#gaia_header.colorswitcher-color-grey #gaia_menu_bar,.colorswitcher-color-grey #gaia_menu_bar #newmenu #nav li:hover a.header{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_grey.png');\n}\n#gaia_header #gaia_menu_bar #newmenu #nav #color_menu a.header{\n\tmargin-top:0px;\n\tmargin-bottom:0px;\n}\n#color_menu .panel_img{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/colors.png');\n\tpadding-left:16px;\n\tmargin-right:1px;\n}\n#gaia_menu_bar #newmenu #nav #color_menu{\n\twidth:2em;\n}\n.colorswitcher-color-classic #newmenu #nav #color_menu{\n\tbackground-image:none;\n}\n#color_menu .selected .panel_img{\n\tpadding-top:1px;\n\tpadding-bottom:1px;\n}\n#color_menu #green .panel_img{\n\tbackground-position:0 0;\n}\n#color_menu #green.selected .panel_img{\n\tbackground-position:0 -39px;\n}\n#color_menu #pink .panel_img{\n\tbackground-position:-18px 0;\n}\n#color_menu #pink.selected .panel_img{\n\tbackground-position:-18px -39px;\n}\n#color_menu #yellow .panel_img{\n\tbackground-position:-36px 0;\n}\n#color_menu #yellow.selected .panel_img{\n\tbackground-position:-36px -39px;\n}\n#color_menu #red .panel_img{\n\tbackground-position:-54px 0;\n}\n#color_menu #red.selected .panel_img{\n\tbackground-position:-54px -39px;\n}\n#color_menu #default .panel_img{\n\tbackground-position:-72px 0;\n}\n#color_menu #default.selected .panel_img{\n\tbackground-position:-72px -39px;\n}\n#color_menu #purple .panel_img{\n\tbackground-position:-90px 0;\n}\n#color_menu #purple.selected .panel_img{\n\tbackground-position:-90px -39px;\n}\n#color_menu #grey .panel_img{\n\tbackground-position:-108px 0;\n}\n#color_menu #grey.selected .panel_img{\n\tbackground-position:-108px -39px;\n}\n#color_menu #classic .panel_img{\n\tbackground-position:-90px 0;\n}\n#color_menu #classic.selected .panel_img{\n\tbackground-position:-90px -39px;\n}\n#gm_search ul,#gm_search li{\n\twidth:338px !important;\n}\n#GM_Search_Form,#linkFinderForm{\n\tpadding:5px;\n\tmargin:0\n;}\n#GM_Search_Type{\n\tfont-size:13px !important;\n\theight:20px;\n\twidth:105px;\n\tpadding:0px;\n}\n#GM_Search_Type .two {\n\tpadding-left:16px;\n}\n#GM_Search_Type .three {\n\tpadding-left:32px;\n}\n#GM_Search_Text{\n\tmargin-top:1px;\n\tdisplay:inline;\n\tfont-size:12px;\n\tpadding:0px;\n\theight:16px;\n\twidth:145px;\n\tposition:relative;\n\ttop:-1px;\n}\n#GM_Search_Gbtn{\n\tbackground-image:url('http://"+imgServer+"/images/common/bn/bn_search.gif');\n\tbackground-color:transparent;\n\tborder:none;\n\tcursor:pointer;\n\theight:21px;\n\toverflow:hidden;\n\ttext-align:left;\n\ttext-indent:-5000em;\n\twidth:66px;\n}#GM_Search_Gbtn:hover{\n\tbackground-attachment:scroll;\n\tbackground-position:left -21px;\n}\n#newmenu #nav #gm_search.locked > ul > li{\n\tbackground-image:url('http://"+imgServer+"/images/gaia_global/body/icons/ic_soulbound_30x30.gif');\n\tbackground-position:bottom left;\n\tbackground-repeat:no-repeat;\n}\n#newmenu #nav #gm_search.locked a{\n\tbackground:none;\n}\n#gm_search #GM_linkFinder{\n\twidth:85%;\n}\n#gm_search #GM_linksSearch{\n\twidth:100%;\n}\n#gm_search #GM_SearchGo{\n\tbackground-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAVCAYAAAAuJkyQAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oHAhUQKXXFatQAAALzSURBVEjHzVZLSFRhGD3/ODrNMNk4M1qaWY7Zw3LRc4Kyl7kxyrCFBG0iCmohiYsISwShFkZFQRCSSrSpaFMRrQopeichUpSvEHMGx7GZpus8rvOfFvc6s5qpVc0HZ/HzHb5zuP/3f99FwDcGAMwEBHxjMNryS7j94C30dFTBZnPgf4THM4ETrW9hyy+hAMCRkVE4nU49bfiHViQAwGjMhtfrgctVCgGAMzMRZEJYLPNg1BxmIVMiMw0JITLG0F92sArPsys4Xr0a+TkCQggISyEqa47iwsMRhKnTOIOv91pQv34xLEJACCPsK3bh2LUX8M3+vSlKyTSIcaS7jva5eWF1cWPVdrpX5mnnysscipFShjlwcRtNOs/i2kB35cLEjCk+8oBelWm1dC4Yj8uUUL33ud+qFXXUd/OLEtdzKv0fbvJU4x2OxSTV77e5x6Txypt76Vcl4/EIh7v2cj5AoJiNr5W0WglDqhpPienHB2gBCKzj1cFoSp7/0T6aAQKbeeNbLJkLPufRAs3o8tZ+Kmm0ANAAAFIyBSSUSS9mAMC8BK68LChvGrEkOwvZc1jVhoGwhOLzIQwA5kIUWw3JGllOlOkLIDAeQCylFpNNLaVMASLHng8zAIRH8WkyBpFbgd3VVVi/ONGCkJIw2Z06bwJjwdlkjagPo36NaSvKhSGllkw2taJEUyI0eps187RPnlfXyY9TESpKiH3nyrU7LzvL99NRhoZ7uCtHv5qmp5wIRakov/i5s5ZWgEART/YG0moleigUiqRBkH0dO/U+AmFeynVVu+kuMWhnVwvfTkUYCv3gm3Y3s+deWekGblq7kEI/Lzp0l0OBSFqthKGfP8N/wA8O3G1jw5ZS5hp0Y5YirtnRwKbrrzge0HnBKb7ramZtZYH+/AXnL9vKw+efcNAf/qMOAG3bT/l/ZcSUdjqs2upQVTWzdpnH64fDvuC/GvFPB5OGTrW/xKUzFbDbHZA0/XMzPt8kTnf068Mqw/6pfwMBQ4MZ3TgCUQAAAABJRU5ErkJggg==');\n\tbackground-color:transparent;\n\tbackground-repeat:no-repeat;\n\tborder:medium none;\n\tcursor:pointer;\n\theight:21px;\n\toverflow:hidden;\n\ttext-align:left;\n\ttext-indent:-5000em;\n\twidth:38px;\n}\n#gm_search #GM_SearchGo:hover{\n\tbackground-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAVCAYAAAAuJkyQAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oHAhUMJgMNKhgAAAMHSURBVEjHzZZNbBNHFMd/492147UdO45xPkTkRK3DR4JQDlBVoigSiIKCkkNBXGnFgUt7AokDEgc+DogLVVvl0ktvRRSJQlVxqJTQKkICypcAJUWBBPMR7CQOcey117vDYWOCgDiWerCfNNKs5q95v3lv3psV6eQk/QeHJDVgvw/2CrH1q1/krt4O9vStoTFUVxWQ6bTB+T9G+XPoMSrA/r3d+HR31SLTFPGxf2/3ElCw3lv1dJUYVABVVagVq00gIURtAa1sklfPk5z9N8mVlwazNqBqdDYF6e9u5uuYB6c+bR6Pv+D07WmupkwMBMGgn51drRxa7yfsqhBIyvIwibFxBobTzAFoHjZENVy5HHeepTiT89K3Okqby+bRvf/ov5ahAHgDOhs1kzsz8/w6Mspw6lMubg3SKCoCWp7INtKcGHFgQh0xzvc2ElMc0NfTM/ww5kJDYmVnOX7dgWnf0Mlvm/3UC+cwu6/O8XJsgp/WdXF0VfkwuQBsWy47FpIz/GMCePluUwNtorQG/oYwRz4LsUpKMslZbloAOge6dPzS0bS2N9FXB2AyNJknX8bX2wiVPj5m2ZyJAaC4adMg++opOy6nSJYE9c1cGmimIVdc1Gk0K+/uqdBWBxgwv1DEtCXKyhGylx2aW8EDYOV5lLUQqofPW3x06aUrJt/TmTzPv7NH0SRhONKAVyDK+KooZXWhEJsUAIPBm7MkvGFObuvgVNzz9tI7uiA9LoAsPz/MMGc5oIknU1w2ADS2tGgo/zdluAMc7vFx48YCc5MJdj+bYn3Eg5bJL9WhLcET4PBGnX23skzcH2fbhJe4anIvXUQCkY4WvmkQ5X1VUmUAsXiMC3qKHx+mGU4VeDBlgqoSb/KxpT1AVEikFHyyNsY5b5LvH6QZSee4C/j8OtvjUb7t9NGIXKHFLAIVTGvFhhWJhjkWDX98sWhRWJyubo1wujXyocayKFgVNkbTNGvr6ZieyRLwu6sKMp8pLAFd+mucL79ooT6gVwXm9XyWK3+/AEDU2j/1GxF4s/gz/yI/AAAAAElFTkSuQmCC');\n}\n#newmenu #nav > li.locked > ul{\n\tleft:auto;\n\tz-index:1;\n\topacity:1;\n\t-moz-box-shadow: 6px 5px 5px rgba(0,0,0,0.3);\n\t-webkit-box-shadow: 6px 5px 5px rgba(0,0,0,0.3);\n\tbox-shadow: 6px 5px 5px rgba(0,0,0,0.3);\n}\n#newmenu #nav li>img.ajax_loading{\n\tmargin-left:4.7em;\n}\n#newmenu #nav > li:not(.locked) > ul{\n\tz-index:2;\n}\n#gm_search li{\n\tpadding-bottom:15px;\n}\n");
	try{
		var selectedTab=document.getElementsByClassName('selected')[0].id;
	}
	catch(e){}
	var Color='';
	var Home='<li id="home_menu" class="standard navHeading"><a class="header" href="/"><span class="home_icon" style="top:5px;left:4px"></span>Home</a></li>';
	var MyGaia='<li id="mygaia_menu" class="standard navHeading"><a class="header" href="/mygaia">My Gaia</a><ul><li class="first"><a class="extended" href="/avatar/">Avatar</a><ul><li class="first"><a href="/avatar/view/hats">Hats</a></li><li><a href="/avatar/view/tops">Tops</a></li><li><a href="/avatar/view/bottoms">Bottoms</a></li><li><a href="/avatar/view/shoes">Shoes</a></li><li><a href="/avatar/view/accessories">Accessories</a></li><li><a href="/avatar/view/items">Items</a></li><li><a href="/avatar/view/animated">Animated</a></li></ul></li><li><a class="extended" href="/homes/">House</a><ul><li class="first"><a href="/gaia/shopping.php?key=hsozifjktvkcqqxc&sort=price">Buy Furniture</a></li><li><a href="/homes/edit/">Design My Home</a></li><li><a '+popupJS(740,580)+' href="/launch/towns?house_location='+usrid+'" target="_blank">Go Home</a></li></ul></li><li><a href="/auto/">Car</a></li><li><a href="/aquarium/">Aquarium</a></li><li><a href="/inventory/" class="extended">Inventory</a><ul><li class="first"><a href="/inventory/view/all">All</a></li><li><a href="/inventory/view/equip">Equip</a></li><li><a href="/inventory/view/game">Game</a></li><li><a href="/inventory/view/special">Special</a></li><li><a href="/inventory/view/house">House</a></li><li><a href="/inventory/view/formula#formula">Formula</a></li><li><a href="/inventory/view/zomg">zOMG!</a></li><li><a href="/inventory/view/aquarium">Aquarium</a></li><li><a href="/inventory/view/animated">Animated</a></li><li><a href="/profile/arranger.php">Arrange Items</a></li></ul></li><li><a href="/profile/privmsg.php" class="extended">Mail</a><ul><li class="first"><a href="/profile/privmsg.php?mode=post">Write Mail</a></li><li><a href="/textmessage/">Send Text Message</a></li><li><a href="/profile/privmsg.php">Inbox</a></li><li><a href="/profile/privmsg.php?folder=outbox">Outbox</a></li><li><a href="/profile/privmsg.php?folder=sentbox">Sent</a></li><li><a href="/profile/privmsg.php?folder=savebox">Saved</a></li></ul></li><li><a href="/profile/friendlist.php" class="extended">Friends</a><ul><li class="first"><a class="extended" href="/profile/friendlist.php">Friends List</a><ul id="GM_Friends"><li class="first"><img class="ajax_loading" src="http://'+imgServer+'/images/template/dropdown/ajax-loader.gif"/></li></ul></li><li><a href="/findfriends/" class="extended">Find Friends</a><ul><li class="first"><a class="extended" onclick="return false" href="#">Suggested Friends</a><ul id="GM_suggFrnd"><li class="first"><img class="ajax_loading" src="http://'+imgServer+'/images/template/dropdown/ajax-loader.gif"/></li></ul></li></ul></li><li><a href="/profile/friendlist.php?list=approval">Requests to You</a></li><li><a href="/profile/friendlist.php?list=pending">Requests from You</a></li><li><a href="/findfriends/history/">Invite History</a></li><li><a href="/profile/friendlist.php?list=ignored">Ignored List</a></li></ul></li><li><a href="/journal/journal.php?mode=view&amp;u=65153" class="extended">Journal</a><ul><li class="first"><a href="/journal/all/list/">All Recent Entries</a></li><li><a href="/journal/journal.php?mode=entry&amp;action=load-add">New Entry</a></li><li><a href="/journal/journal.php?mode=entry">Archive</a></li><li><a href="/journal/journal.php?mode=preferences">Preferences</a></li><li><a href="/journal/journal.php?mode=landing">Subscriptions</a></li><li><a href="/journal/list/friendslist/">Friends Journals</a></li></ul></li><li><a href="/quest/" class="extended">Quests</a><ul><li class="first"><a href="/quest/">Active</a></li><li><a href="/quest/history/">Completed</a></li><li><a href="/quest/badge/">Badges</a></li></ul></li><li><a href="/account/" class="extended">Account Settings</a><ul><li class="first"><a href="/account/preferences/">Preferences</a></li><li><a href="/account/alerts/">Alerts</a></li><li><a href="/account/notifications/">Notifications</a></li><li><a href="/account/details/">Details</a></li><li><a href="/account/interests/">Interests</a></li><li><a href="/account/signature/">Signature</a></li><li><a href="/account/datafeeds/">Feeds</a></li><li><a href="/account/wishlist/">Wishlist</a></li></ul></li><li><a class="extended" href="/profiles/">Profile</a><ul><li class="first"><a href="/profiles/'+usrid+'">Profile</a></li><li><a href="/profiles/?mode=comments">Comments</a></li><li><a title="For Current Profile" href="/profiles/?mode=edit&u='+usrid+'">Edit Profile</a></li><li><a href="/account/about/">About Me</a></li><li><a href="/account/profileprefs/">Profile Preferences</a></li></ul></li><li><a href="/mygaia/settings/">Notifications</a></li><li><a href="/achievements/">Achievements</a></li></ul></li>';
	var Shop='<li id="shopping_menu" class="standard navHeading"><a class="header" href="/market">Shop</a><ul><li class="first"><a href="/collectibles">Monthly Collectibles</a></li><li id="gaia_menuitem_cashshop"><a href="/market/?cashshop=true">Cash Shop</a></li><li><a href="/info/gold/gcash/" class="extended">Get Gaia Cash</a><ul><li class="first"><a href="/shop/?from=gpass">Purchase Online</a></li><li><a href="/autocash/">Auto Cash</a></li><li><a href="/redeem/pin#module2">Locate Store</a></li><li><a href="/redeem/">Redeem a Pin</a></li><li><a href="/offers">Sponsored Offers</a></li><li><a href="/order/history/">Order History</a></li></ul></li><li><a href="/gaia/shopping.php" class="extended">Shops</a><ul><li class="first"><a href="/gaia/shopping.php?key=suobdlxpawwzvmcs">Barton Boutique</a></li><li><a class="extended" href="/gaia/shopping.php/?key=uhxrdnkgimmkhslj">Back Alley Bargains</a><ul><li class="first"><a href="/gaia/exchange.php?store=uhxrdnkgimmkhslj">Make Recipes</a></li></ul></li><li><a class="extended" href="/gaia/shopping.php/?key=ngabwpnnhvmyhins">Durem Depot</a><ul><li class="first"><a href="/gaia/exchange.php?store=ngabwpnnhvmyhins">Exchange Bugs</a></li></ul></li><li><a href="/gaia/shopping.php/?key=tctmkgjtjekkblii">Gambino Outfitters</a></li><li><a href="/gaia/shopping.php/?key=jqztgkvbtpraewh">Global Imports</a></li><li><a class="extended" href="/gaia/shopping.php/?key=ggcmjiwqlqkpvbos">H &amp; R Wesley</a><ul><li class="first"><a href="/gaia/exchange.php?store=ggcmjiwqlqkpvbos">Exchange Credits</a></li></ul></li><li><a href="/gaia/shopping.php/?key=alpltfbdnxgowsfn">The Ole Fishing Hole</a></li><li><a href="/gaia/shopping.php/?key=aqyvrienpejsqhlq">The Jock Strap</a></li><li><a href="/gaia/shopping.php/?key=jeusorituensldjz">Junk in the Trunk</a></li><li><a onclick="if(event.which==1){YAHOO.gaia.app.CashShop.SenderApplication.show({store:18,self:true,origin:\'stores\'});return false;}else{return true;}" href="/market/?cashshop=true">Mintaka & Rigel</a></a></li><!--<li><a href="/gaia/shopping.php?key=ffwawfdfghlkghvu">Macy\'s MStyleLab</a></li>--><li><a class="extended" href="/gaia/shopping.php/?key=uxzehjwiwxtrueit">Ruby\'s Rack</a><ul><li class="first"><a href="/gaia/exchange.php?store=uxzehjwiwxtrueit">Exchange Trash</a></li></ul></li><li><a href="/gaia/shopping.php/?key=wdwoprgbzbtbjimf">Salon Durem</a></li><li><a href="/gaia/shopping.php/?key=peoikjdnhbalvieu">Phin Phang</a></li><li><a href="/gaia/shopping.php/?key=eazdhzyfhsu3hek8">Sunset Couture</a></li><li><a href="/gaia/shopping.php/?key=gxqxrbzixwydqakn">Sams Body &amp; Parts</a></li><li><a href="/gaia/shopping.php/?key=essxqbkkcfqhuyrn">Barton Jewelers</a></li><li><a class="extended" href="/gaia/shopping.php/?key=bvnsukowrbkthaiq">Skin Tyte</a><ul><li class="first"><a href="/gaia/exchange.php?store=bvnsukowrbkthaiq">Buy Tattoos</a></li></ul></li><li><a href="/gaia/shopping.php/?key=hsozifjktvkcqqxc">The Faktori</a></li><li><a href="/gaia/shopping.php?key=eimzlapgnduengad">Dernier Cri</a></li><li><a href="/gaia/shopping.php/?key=bpzhydftrxmiydnf">Buttercup Cafe</a></li><li><a href="/gaia/shopping.php/?key=ndroctlqvprghqqy">Prize &amp; Joy</a></li><li><a href="/gaia/shopping.php?key=quoyxevolpizoreo"/>The Treehouse</a></li><li><a href="/gaia/shopping.php?key=awerynsdfnicvbia">The Bifrost</a></li><li><a href="/gaia/shopping.php?key=rtfmugcdrknghhh">Crosstitch</a></li></ul></li><li><a class="extended" href="/bidblast/">Bid Blast</a><ul><li class="first"><a href="/bidblast/">Bid Blast</a></li><li><a href="/bidblast/help">Bid Blast Help</a></li><li><a href="/bidblast/help/faq">Bid Blast FAQ</a></li></ul></li></li><li><a href="/alchemy/">Alchemy</a></li><li><a href="/museum/">Evolving Item Museum</a></li><li><a href="/marketplace/" class="extended">Marketplace</a><ul><li class="first"><a href="/marketplace/itemsearch/">Item Search</a></li><li><a href="/marketplace/outfits/">Buy Outfits</a></li><li><a class="extended" href="/marketplace/vendsearch/">All Listings</a><ul><li class="first"><a href="/marketplace/vendsearch/?sortBy=90">Old Listings</a></li><li><a href="/marketplace/vendsearch/?sortBy=91">New Listings</a></li></ul></li><li><a class="extended" href="/marketplace/mystore/">My Store</a><ul><li class="first"><a href="/marketplace/vendlog/'+usrid+'/listed/">Listed Items</a></li><li><a href="/marketplace/vendlog/'+usrid+'/bought/">Bought Items</a></li><li><a href="/marketplace/editstore">Edit Store</a></li></ul></li><li><a class="extended" href="/marketplace/mystore/showinventory/">Sell an Item</a><ul><li class="first"><a href="/marketplace/mystore/showinventory/">All</a></li><li><a href="/marketplace/mystore/showinventory/view/equip ">Equip</a></li><li><a href="/marketplace/mystore/showinventory/view/game ">Game</a></li><li><a href="/marketplace/mystore/showinventory/view/special ">Special</a></li><li><a href="/marketplace/mystore/showinventory/iew/house">House</a></li><li><a title="I wish." href="/forum/t.52433563">Formula</a></li></li><li><a href="/marketplace/mystore/showinventory/view/zomg ">zOMG!</a></li><li><a title="I wish." href="/forum/t.52433563">Aquarium</a></li></ul></li><li><a href="/marketplace/watchlist/">My Watchlist</a></li><li><a href="/account/wishlist/">My Wishlist</a></li></ul></li><li><a href="/gaia/bank.php">Trade</a></li><li><a href="http://www.gaiastore.com/servlet/StoreFront" class="extended">Merchandise</a><ul><li class="first"><a href="http://www.gaiastore.com/servlet/the-what%27s-new/Categories">What\'s New</a></li><li><a href="http://www.gaiastore.com/servlet/the-clothing/Categories">Clothing</a></li><li><a href="http://www.gaiastore.com/servlet/the-accessories/Categories">Accessories</a></li><li><a href="http://www.gaiastore.com/servlet/the-gaia-gear/Categories">Gaia Gear</a></li><li><a href="http://www.gaiastore.com/servlet/the-plushies-%26-toys/Categories">Plushies &amp; Toys</a></li><li><a href="http://www.gaiastore.com/servlet/the-stationery/Categories">Stationery</a></li><li><a href="http://www.gaiastore.com/servlet/the-great-deals/Categories">Great Deals</a></li><li><a href="http://www.gaiastore.com/servlet/the-Downloads/Categories">Downloads</a></li><li><a href="http://www.gaiastore.com/servlet/the-Gaia-Cash-Cards/Categories">Gaia Cash Cards</a></li><li><a href="http://www.gaiastore.com/servlet/the-zOMG%21/Categories">zOMG!</a></li><li><a href="/store/custommerchandise/">Customizable Stuff</a></li></ul></li><li><a href="/mobile">Mobile Downloads</a></li><li><a href="#" class="extended">Payment History</a><ul><li class="first"><a href="/redeem/history/">Gaia Cash Purchases</a></li><li><a href="/order/history/">Order History</a></li></ul></li></li></ul>';
	var Community='<li id="community_menu" class="standard_ext navHeading"><a class="header" href="/community">Community</a><ul><li class="first"><a href="/forum/" class="extended">Forums</a><ul><li class="first"><a href="/forum/myposts/">My Posts</a></li><li><a href="/forum/mytopics/">My Latest Topics</a></li><li><a href="/forum/subscription/">My Thread Subscriptions</a></li><li><a class="extended" href="/forum/">Forum Index</a><ul id="GM_Forums"><li class="first"><img class="ajax_loading" src="http://'+imgServer+'/images/template/dropdown/ajax-loader.gif"/></li></ul></li><li><a href="/info/index.php?mode=safety">Safety Tips</a></li></ul></li><li><a href="/guilds/" class="extended">Guilds</a><ul><li class="first"><a class="extended" href="/guilds/?gmode=myguilds">My Guilds</a><ul id="GM_Guilds"><li class="first"><img class="ajax_loading" src="http://'+imgServer+'/images/template/dropdown/ajax-loader.gif"/></li></ul></li><li><a href="/guilds/?gmode=create">Create</a></li><li><a href="/forum/registered-guilds/gaia-guilds-rules-faq/t.47199021/">FAQ</a></li></ul></li><li><a href="/clans" class="extended">Clans</a><ul><li class="first"><a href="/clans/my/">My Clan</a></li></ul></li><li><a href="/arena/" class="extended">Arenas</a><ul><li class="first"><a href="/arena/art/" class="extended">Art</a><ul><li class="first"><a href="/arena/art/painting-and-drawing/vote/">Painting &amp; Drawing</a></li><li><a href="/arena/art/photography/vote/">Photography</a></li><li><a href="/arena/art/comics/vote/">Comics</a></li></ul></li><li><a href="/arena/writing/" class="extended">Writing</a><ul><li class="first"><a href="/arena/writing/fiction/vote/">Fiction</a></li><li><a href="/arena/writing/non-fiction/vote/">Non-Fiction</a></li><li><a href="/arena/writing/poetry-and-lyrics/vote/">Poetry and Lyrics</a></li></ul></li><li><a href="/arena/gaia/homes/">Homes</a></li><li><a class="extended" href="/arena/gaia/avatar">Avatar</a><ul><li class="first"><a href="/arena/gaia/original-avatar/vote/">Original Avatar</a></li><li><a href="/arena/gaia/cosplay-avatar/vote/">Cosplay Avatar</a></li></ul></li><li><a href="/arena/contest/">Contests</a></li><li><a class="extended" href="/arena/entries/gaia/avatar/">Submit Entry</a><ul><li class="first"><a href="/arena/entries/art/">Art</a></li><li><a href="/arena/entries/writing/">Writing</a></li><li><a href="/arena/entries/gaia/avatar/">Avatar</a></li><li><a href="/arena/entries/gaia/homes/">Home</a></li></ul><li><a href="/arena/mystuff/">My Stuff</a></li></li></ul></li><li><a href="/news-and-events/">News &amp; Events</a></li><li><a href="/gsearch">Search</a></li><li><a href="/conventions">Conventions</a></li></ul></li>';
	var World='<li id="world_menu" class="standard navHeading"><a class="header" href="/world">World</a><ul><li class="first"><a href="/animeplayer/">Anime Player</a></li><li><a href="#" class="extended">Storyline</a><ul><li class="first"><a href="/newsroom/?type=manga">Manga</a></li><li><a href="/newsroom/?type=weekly">Mini Comics</a></li><li><a href="/newsroom/">News Room</a></li></ul></li><li id="gaia_menuitem_towns"><a '+popupJS(740,580)+' href="/launch/towns" class="extended">Towns</a><ul><li class="first"><a href="/homes/">My Home</a></li></ul></li><li><a href="#" class="extended">Sponsored Worlds</a><ul><li class="first"><a id="gaia_menuitem_mtv" target="_blank" '+popupJS(740,580)+' href="/launch/hollywood/">Virtual Hollywood</a></li><li id="gaia_menuitem_foreststage"><a target="_blank" '+popupJS(740,660)+' href="/launch/foreststage">Earth Day Forest Stage</a></li></ul></li><li><a href="/downloads">Downloads</a></li><li><a class="extended" href="/labs">Gaia Labs</a><ul><li class="first"><a href="http://userscripts.org/users/62850/scripts">Greasemonkey Scripts</a></li><li><a href="http://absols-web-apps.info/apps/randomImage">Random Image Generator</a></li><li><a href="http://absols-web-apps.info/apps/randomLink">Random Link Generator</a></li><li><a href="http://absols-web-apps.info/apps/passgen">Password Generator</a></li></ul></li><li><a href="/blog">Gaia Blog</a></li><li><a href="/conventions">Conventions</a></li><li><a href="/friendchats/">Friend Chats</a></li><li><a href="/internal/lnk_t.php?l=6760">Kalamari Kastle</a></li><li><a href="/worldmap/" class="extended">Gaia Map</a><ul><li class="first"><a href="/worldmap/?m=1">Barton Town</a></li><li><a href="/worldmap/?m=2">Barton West Field</a></li><li><a href="/worldmap/?m=3">Bass\'ken Lake</a></li><li><a href="/worldmap/?m=4">Port of Gambino</a></li><li><a href="/worldmap/?m=5">Isle De Gambino</a></li><li><a href="/worldmap/?m=6">Durem Reclamation Facility</a></li><li><a href="/worldmap/?m=7">Durem</a></li><li><a href="/worldmap/?m=8">Barton East</a></li><li><a href="/worldmap/?m=9">Aekea West</a></li><li><a href="/worldmap/?m=10">Aekea</a></li><li><a href="/worldmap/?m=15">Barton Coast</a></li><li><a href="/worldmap/?m=16">Great Wall of Gambino</a></li><li><a href="/worldmap/?m=17">Durem Reclamation Hub</a></li><li><a href="/worldmap/?m=18">Durem Caves North</a></li><li><a href="/worldmap/?m=19">Barton Cliffs</a></li><li><a href="/worldmap/?m=20">Barton South</a></li><li><a href="/worldmap/?m=21">Barton Trench</a></li><li><a href="/worldmap/?m=22">Durem Graveyard</a></li><li><a href="/worldmap/?m=23">Von Helson Manor</a></li><li><a href="/worldmap/?m=24">Halloweentown</a></li><li><a href="/worldmap/?m=25">G-Corp</a></li></ul></li></ul>';
	var Games='<li id="games_menu" class="standard navHeading"><a class="header" href="/games">Games</a><ul><li id="gaia_menuitem_monstergalaxy" class="first"><a '+popupJS(777,730)+' target="_blank" href="/monstergalaxy/launch">Monster Galexy</a></li><li><a href="/viximo?v_selected=mahjongg">Mahjongg Dimensions</a></li><li><a href="/viximo?v_selected=backyardmonsters">Backyard Monsters</a></li><li><a href="/viximo?v_selected=resortworld">Resort World</a></li><li id="gaia_menuitem_zomg"><a '+popupJS(1000,555)+' target="_blank" href="/launch/zomg" class="extended">zOMG!</a><ul><li class="first"><a target="_blank" href="/games/zomg/">zOMG! Microsite</a></li><li><a href="/gaia/shopping.php/?key=uhxrdnkgimmkhslj">Buy Power-Ups &amp; Gear!</a></li></ul></li><li id="gaia_menuitem_rally"><a target="_blank" '+popupJS(740,580)+' href="/launch/rally" class="extended">Rally</a><ul><li class="first"><a href="/gaia/shopping.php/?key=gxqxrbzixwydqakn">Buy Car Parts</a></li><li><a href="/auto/">Build a Car</a></li></ul></li><li id="gaia_menuitem_jigsaw"><a target="_blank" '+popupJS(770,585)+' href="/launch/gameshell?game=jigsaw">Jigsaw</a></li><li id="gaia_menuitem_fishing"><a '+popupJS(640,580)+' target="_blank" href="/launch/fishing" class="extended">Fishing</a><ul><li class="first"><a href="#" onclick="return false;" class="extended">Select a Lake</a><ul><li id="gaia_menuitem_fishing_bassken" class="first"><a '+popupJS(640,580)+' target="_blank" href="/launch/fishing?l=bassken">Bass\'ken Lake</a></li><li id="gaia_menuitem_fishing_gambino"><a '+popupJS(640,580)+' target="_blank" href="/launch/fishing?l=gambino">Port of Gambino</a></li><li id="gaia_menuitem_fishing_durem"><a '+popupJS(640,580)+' target="_blank" href="/launch/fishing?l=durem">Durem Reclamation Facility</a></li></ul></li><li><a href="/gaia/shopping.php/?key=alpltfbdnxgowsfn">Buy Bait &amp; Sell Fish</a></li></ul></li><li id="gaia_menuitem_slots"><a '+popupJS(640,580)+' target="_blank" href="/launch/slots" class="extended">Slots</a><ul><li class="first"><a href="/gaia/store.php?id=14f247">Buy Tokens</a></li><li><a href="/gaia/shopping.php/?key=ndroctlqvprghqqy">Cash-in Winnings</a></li></ul></li><li id="gaia_menuitem_blackjack"><a target="_blank" '+popupJS(640,580)+' href="/launch/blackjack" class="extended">Cards</a><ul><li class="first"><a href="/gaia/store.php?id=14f247">Buy Tokens</a></li><li><a href="/gaia/shopping.php/?key=ndroctlqvprghqqy">Cash-in Winnings</a></li></ul></li><li id="gaia_menuitem_wordbump"><a target="_blank" '+popupJS(640,480)+' href="/launch/wordbump">Wordbump</a></li><li id="gaia_menuitem_gameshell"><a target="_blank" '+popupJS(770,585)+' href="/launch/gameshell?game=gPinball">Pinball</a></li><li id="gaia_menuitem_elf"><a target="_blank" '+popupJS(770,585)+' href="/launch/gameshell?game=electricLoveFaktori">Electric Love Faktori</a></li><li id="gaia_menuitem_tiles"><a target="_blank" '+popupJS(770,585)+' href="/launch/gameshell?game=tiles">Tiles</a></li><li><a class="extended" href="/omgpop">OMGPOP</a><ul><li class="first"><a target="_blank" '+popupJS(800,600)+' href="/omgpop/launch?game=pool">Pool</a></li><li><a onclick="'+popupJS(800,600)+'" href="/omgpop/launch?game=hoverkart">Hover Kart</a></li><li><a onclick="'+popupJS(800,600)+'" href="/omgpop/launch?game=drawmything">Draw My Thing</a></li><li><a onclick="'+popupJS(800,600)+'" href="/omgpop/launch?game=balloono">Balloono</a></li><li><a onclick="'+popupJS(800,600)+'" href="/omgpop/launch?game=skypigs">Sky Pigs</a></li></ul></li><li><a class="extended" title="Aquarium Forum" href="/forum/f.393">Booty Grab</a><ul><li class="first"><a href="/forum/t.47289201">Lagginess Tips</a></li><li><a target="_blank" href="http://absols-web-apps.info/gtools/glowTime.php">Aquarium Analyzer</a></li><li><a href="http://absols-web-apps.info/gtools/fishSig.php?genSigCode=1">Aquarium Analyzer<br/>(Make a Signature)</a></li><li><a href="http://absols-web-apps.info/gtools/imgAnalyzer.php">Aquarium Analyzer<br/>(For Recycled Threads)</a></li><li><a href="http://absols-web-apps.info/gtools/glowHistory.php">Look Up A Past Glow</a></li><li><a href="http://absols-web-apps.info/gtools/fishreview.php?stats=true">Fish Stats</a></li><li><a href="http://absols-web-apps.info/gtools/tanklist.html">Aquarium List</a></li><li><a href="http://absols-web-apps.info/gtools/ttycity.html">Tanks to invite</a></li></ul><li><a href="/event/frontierskies">Frontier Skies</a></li><li><a href="/dumpsterdive">Dumpster Dive</a></li><li><a href="/lotto">Gold Lotto</a></li></li></ul></li>';
	var Tektek='<li id="tektek_menu" class="standard navHeading"><a class="header" href="http://www.tektek.org">Tektek</a><ul><li class="first"><a class="extended" href="http://www.tektek.org/gaia/items.php">Gaia Items</a><ul><li class="first"><a class="extended" href="http://www.tektek.org/gaia/rare_items/">Rare Items</a><ul><li class="first"><a href="http://www.tektek.org/gaia/rare_items/ancient">Ancient Chest</a></li><li><a href="http://www.tektek.org/gaia/rare_items/animalquackers">Animal Quackers</a></li><li><a href="http://www.tektek.org/gaia/rare_items/aquarium">Aquarium Overseer</a></li><li><a href="http://www.tektek.org/gaia/rare_items/azrael">Azrael\'s Trickbox</a></li><li><a href="http://www.tektek.org/gaia/rare_items/bitterfrost">Bitter Frost</a></li><li><a href="http://www.tektek.org/gaia/rare_items/bestfriendforever">Best Friend Forever</a></li><li><a href="http://www.tektek.org/gaia/rare_items/brown">Brown Giftbox</a></li><li><a href="http://www.tektek.org/gaia/rare_items/blue">Blue Giftbox</a></li><li><a href="http://www.tektek.org/gaia/rare_items/codealpha">Code Alpha</a></li><li><a href="http://www.tektek.org/gaia/rare_items/darkreflection">Dark Reflection</a></li><li><a href="http://www.tektek.org/gaia/rare_items/emeraldseed">Emerald Seed</a></li><li><a href="http://www.tektek.org/gaia/rare_items/famestar2000">FAMESTAR 2000</a></li><li><a href="http://www.tektek.org/gaia/rare_items/famestarhero">Famestar Hero</a></li><li><a href="http://www.tektek.org/gaia/rare_items/fishdrops">Fish Drops</a></li><li><a href="http://www.tektek.org/gaia/rare_items/fluff">Fluff Box</a></li><li><a href="http://www.tektek.org/gaia/rare_items/fortuneegg">Fortune Egg</a></li><li><a href="http://www.tektek.org/gaia/rare_items/geeboiturbo">Gee Boi Turbo</a></li><li><a href="http://www.tektek.org/gaia/rare_items/lexbox">LeXbox</a></li><li><a href="http://www.tektek.org/gaia/rare_items/lonelystar">Lonely Star</a></li><li><a href="http://www.tektek.org/gaia/rare_items/lovecharm">Love Charm</a></li><li><a href="http://www.tektek.org/gaia/rare_items/lunasincense">Luna\'s Incense</a></li><li><a href="http://www.tektek.org/gaia/rare_items/midsummerswirl">Midsummer Swirl</a></li><li><a href="http://www.tektek.org/gaia/rare_items/mysterymood">Mystery Mood</a></li><li><a href="http://www.tektek.org/gaia/rare_items/nightmare">Nightmare Box</a></li><li><a href="http://www.tektek.org/gaia/rare_items/perfecttragedy">Perfect Tragedy</a></li><li><a href="http://www.tektek.org/gaia/rare_items/pink">Pink Giftbox</a></li><li><a href="http://www.tektek.org/gaia/rare_items/poseidonslegacy">Poseidon\'s Legacy</a></li><li><a href="http://www.tektek.org/gaia/rare_items/repolamp">Repo Lamp</a></li><li><a href="http://www.tektek.org/gaia/rare_items/snowapple">Snow Apple</a></li><li><a href="http://www.tektek.org/gaia/rare_items/suspiciouspackage">Supicious Package</a></li><li><a href="http://www.tektek.org/gaia/rare_items/toxicdrop">Toxic Drop</a></li><li><a href="http://www.tektek.org/gaia/rare_items/wrathofgaia">Wrath of Gaia</a></li></ul></li><li><a href="http://www.tektek.org/gaia/list_active.php?show=rising">Rising</a></li><li><a href="http://www.tektek.org/gaia/list_active.php?show=falling">Falling</a></li><li><a class="extended" href="http://www.tektek.org/gaia/evolution">Evolving Items</a><ul><li class="first"><a href="http://www.tektek.org/gaia/evolution/show/all">All</a></li><li><a href="http://www.tektek.org/gaia/evolution/show/active">Active</li><li><a href="http://www.tektek.org/gaia/evolution/show/evolving_soon">May Evolve Soon</a></li><li><a href="http://www.tektek.org/gaia/evolution/show/finished">Finished</a></li></ul></li><li><a href="http://www.tektek.org/gaia/item_search.php?search=cash_shop">Cash Shop Items</a></li><li><a class="extended" href="http://www.tektek.org/gaia/aquarium/">Aquarium Items</a><ul><li class="first"><a href="http://www.tektek.org/gaia/aquarium/new">New</a></li><li><a href="http://www.tektek.org/gaia/aquarium/backgrounds">Backgrounds</a></li><li><a href="http://www.tektek.org/gaia/aquarium/decorations">Decorations</a></li><li><a href="http://www.tektek.org/gaia/aquarium/fish">Fish</a></li></ul><li><a class="extended" href="http://www.tektek.org/gaia/zomg/items/">zOMG Items</a><ul><li class="first"><a href="http://www.tektek.org/gaia/zomg/items/crafted_items">Crafted Items</a></li><li><a href="http://www.tektek.org/gaia/zomg/items/recipes">Recipes</a></li><li><a href="http://www.tektek.org/gaia/zomg/items/rings">Rings</a></li><li><a href="http://www.tektek.org/gaia/zomg/items/raw_materials">Raw Materials</a></li></ul></li><li class="oversized_ext"><a class="extended" href="http://www.tektek.org/gaia/collectables">Monthly Collectible Items</a><ul><li class="first"><a href="http://www.tektek.org/gaia/collectables/2003">2003</a></li><li><a href="http://www.tektek.org/gaia/collectables/2004">2004</a></li><li><a href="http://www.tektek.org/gaia/collectables/2005">2005</a></li><li><a href="http://www.tektek.org/gaia/collectables/2006">2006</a></li><li><a href="http://www.tektek.org/gaia/collectables/2007">2007</a></li><li><a href="http://www.tektek.org/gaia/collectables/2008">2008</a></li><li><a href="http://www.tektek.org/gaia/collectables/2009">2009</a></li><li><a href="http://www.tektek.org/gaia/collectables/2010">2010</a></li></ul></li><li><a href="/forum/t.9103857">GaiaOnline Thread</a></li></ul></li><li><a class="extended" href="http://www.tektek.org/dream/">Dream Avatar</a><ul><li class="first"><a href="http://www.tektek.org/dream/dream.php">Start</a></li><li><a href="http://www.tektek.org/dream/dream_free.php?avatar=1668351">Dream Free</a></li><li><a href="http://www.tektek.org/gaia/worth.php?environment">Inventory tektek</a></li><li><a href="http://www.tektek.org/avatars">Search Avatars</a></li><li><a href="http://www.tektek.org/contest/">Avatar Contest</a></li><li><a href="/forum/t.9671288/">GaiaOnline Thread</a></li></ul></li><li><a class="extended" href="http://www.tektek.org/profiles/">Gaia Profiles</a><ul><li class="first"><a class="extended" href="http://www.tektek.org/profiles/oldschool">Classic / Old School</a><ul><li class="first"><a href="http://www.tektek.org/profiles/oldschool/new">Newest</a></li><li><a href="http://www.tektek.org/profiles/oldschool/top">Top Rated</a></li><li><a href="http://www.tektek.org/profiles/oldschool/category">Categories</a></li><li><a href="http://www.tektek.org/profiles/oldschool/upcoming">Upcomming</a></li><li><a href="http://www.tektek.org/profiles/oldschool/pending">Pending</a></li></ul><li><a class="extended" href="http://www.tektek.org/profiles/newschool">Current / New Version</a><ul><li class="first"><a href="http://www.tektek.org/profiles/newschool/new">Newest</a></li><li><a href="http://www.tektek.org/profiles/newschool/top">Top Rated</a></li><li><a href="http://www.tektek.org/profiles/newschool/category">Categories</a></li><li><a href="http://www.tektek.org/profiles/newschool/upcoming">Upcomming</a></li><li><a href="http://www.tektek.org/profiles/newschool/pending">Pending</a></li></ul></li><li><a href="http://www.tektek.org/profiles/multimedia">YouTube Video</a></li></li></ul></li><li><a class="extended" href="http://www.tektek.org/gaia_toolbar/">Gaia Toolbar</a><ul><li class="first"><a href="/forum/t.8092647/">GaiaOnline Thread</a></li><li><a href="http://www.tektek.org/gaia_toolbar/changelog">View All Changes</a></li></ul></li><li><a class="extended" href="http://www.tektek.org/auto/">AutoTek</a><ul><li class="first"><a href="http://www.tektek.org/gaia/list_auto.php">Auto Parts List</a></li><li><a href="/forum/t.28621813">GaiaOnline Thread</a></li></ul></li><li><a href="http://www.tektek.org/questbar/">Questbar</a></li><li><a href="http://www.tektek.org/color/">Gradient Text</a></li><li><a href="http://www.tektek.org/gaia/worth.php">Calculate Account Worth</a></li><li><a href="http://www.tektek.org/gaia/price/compare/">Compare Item Values</a></li><li><a href="http://www.tektek.org/account/signup.vex">Random Signature</a></li></ul></li>';
	if(getId('color_menu')){
		js="return false;"
		Color='<li id="color_menu" class="standard navHeading"><a class="header" onclick="return false" href="#"><img src="http://'+imgServer+'/images/gaia_global/body/arrows/ic_hyperlink_arrow_15x15_down.png"/></a><ul><li class="first"><a href="#" onclick="'+js+'" id="green" class="color_option" data-color="green"><span class="panel_img"></span>Green</a></li><li><a onclick="'+js+'" href="#" id="pink" class="color_option" data-color="pink"><span class="panel_img"></span>Pink</a></li><li><a href="#" '+js+' id="yellow" class="color_option" data-color="yellow"><span class="panel_img"></span>Yellow</a></li><li><a href="#" onclick="'+js+'" id="red" class="color_option" data-color="red"><span class="panel_img"></span>Red</a></li><li><a href="#" onclick="'+js+'" id="default" class="color_option" data-color="default"><span class="panel_img"></span>Blue</a></li><li><a href="#" onclick="'+js+'" id="purple" class="color_option" data-color="purple"><span class="panel_img"></span>Purple</a></li><li><a href="#" onclick="'+js+'" id="grey" class="color_option" data-color="grey"><span class="panel_img"></span>Gray</a></li><li><a href="#" onclick="'+js+'" id="classic" class="color_option" data-color="classic"><span class="panel_img"></span>Classic</a></li></ul></li>';
	}
	var QuickLinks='<li id="quick_links" class="standard_ext navHeading"><a href="#" onclick="return false;" class="header">Quick Links</a><ul><li class="quickLink"><img class="ajax_loading" src="http://'+imgServer+'/images/template/dropdown/ajax-loader.gif"/></li></ul></li>';
	var Search='<li id="gm_search" class="standard navHeading"><a class="header" title="Click to lock open" onclick="this.blur();if(this.parentNode.className.indexOf(\'locked\')!=-1){this.parentNode.className=this.parentNode.className.replace(\' locked\',\'\');this.title=\'Click to lock open\';}else{this.parentNode.className+=\' locked\';this.title=\'Click to unlock\';}return false;" href="#">Search</a><ul><li class="first"><form id="GM_Search_Form" onsubmit="return false"><select name="type" id="GM_Search_Type" onfocus="this.parentNode.parentNode.style.height=\'370px\';" onblur="this.parentNode.parentNode.style.height=\'\';"><option class="one" value="undefined">Search...</option><option class="one" value="friend">For Friends</option><!--<option class="one" value="all">Entire Site</option>--><optgroup label="Community"><option class="two" value="all ">Entire Community</option><option class="two" value="users">Users by Username</option><option class="two" value="interest">Users by Interest</option><option class="two" value="forums">Forums</option><option class="three" value="topics.user">Topics by User</option><option class="three" value="posts.user">Post by User</option><option class="two" value="guilds">Guilds</option></optgroup><optgroup label="Marketplace"><option class="two" value="market">Using the Marketplace</option><option class="two" value="tektek">Using TekTek.org</option></optgroup><optgroup label="Arenas"><option class="two" value="user">Submissions by user</option><option class="two" value="username">Entries by username</option><option class="two" value="all">All Categories</option><option class="two" value="8">Homes</option><option class="two" value="avatar">Avatar</option><option class="three" value="7">Original</option><option class="three" value="27">Cosplay</option><option class="two" value="picture">Art</option><option class="three" value="1">Comics</option><option class="three" value="2">Painting and Drawing</option><option class="three" value="3">Photography</option><option class="two" value="text">Writing</option><option class="three" value="4">Fiction</option><option class="three" value="5">Non-Fiction</option><option class="three" value="6">Poetry and Lyrics</option><option class="three" value="32">High School Flashback</option></optgroup></select><input name="text" id="GM_Search_Text" value="Gaia Search" type="text" name="val" onfocus="if(this.value==\'Gaia Search\'){this.value=\'\';}" onblur="if(this.value==\'\'){this.value=\'Gaia Search\';}"/><input id="GM_Search_Gbtn" type="submit"/></form><div style="text-align:left;width:45%;float:left;padding:4px;">Can\'t find a link? Try this &darr;</div><div style="text-align:right;width:45%;float:right;"><a href="/gsearch">Altnerative Search Page</a></div><form id="linkFinderForm" action="javascript:var LS=document.getElementById(\'GM_linksSearch\');if(LS.value){if(LS.value.indexOf(\'/launch/\')==-1){void(document.location.href=LS.value);}else{void(window.open(LS.value));}}else{var LF=document.getElementById(\'GM_linkFinder\');LF.value=\'Type link name here\';LF.select();}"><input type="text" id="GM_linkFinder" value="Type link name here" onfocus="if(this.value==\'Type link name here\'){this.value=\'\'}" onblur="if(this.value==\'\'){this.value=\'Type link name here\'}"/><input id="GM_SearchGo" value="GO" type="submit"/><br/><select id="GM_linksSearch" ondblclick="this.parentNode.submit();" size="15"></select><input onclick="this.select();" id="GM_searchMenuStatusBar" style="border:none;background:none;width:100%;" readonly="readonly"/></form></li></ul></li>';
	//var halp='<li id="panic" class="standard navHeading"><a class="header" href="http://absols-web-apps.info/donate.html">HALP</a><ul><li class="first" style="width:350px;font-size:14px;padding:5px;">Sorry to bother you with this but this script uses my web site for storing the forums list (Community &rarr; Forums &rarr; Forum Index) this improves the performance of the script and also prevents you from being spammed with updates cause gaia changed the hot topics. The person who was paying the bill for the hosting is getting a house and can not afford the bill this year, so if a few users can spare a dollar or two in a <a href="http://absols-web-apps.info/donate.html" style="text-decoration:underline;color:blue;display:inline;background-color:transparent;padding:0;font-size:14px;" target="_blank">donation</a> it would help.<br/> Since I know most people do not give a crap here is a <a onclick="this.parentNode.parentNode.parentNode.style.display=\'none\'" href="javascript:void(\'I do not donate\')" id="I-DONT-Donate-EVER" style="text-decoration:underline;color:blue;display:inline;background-color:transparent;padding:0;font-size:14px;">never show this again link</a>. <small>(May reappear next year if needed)</small><br/><br/>BTW, this message was not the only update a few broken links were fixed and if you did not notice the search 404 issue was fixed a few versions back which was long over due</li></ul></li>';	var Home='<li id="home_menu" class="standard navHeading"><a class="header" href="/"><span class="home_icon" style="top:5px;left:4px"></span>Home</a></li>';
	ele.innerHTML=Home+MyGaia+Shop+Community+World+Games+Tektek+Color+QuickLinks+Search/*+(GM_getValue('stingy',false)?'':halp)*/;
	if(selectedTab){
		getId(selectedTab).className+=' selected';
	}
	if(Color){
		changeColor('string');
	}
	try{
		unsafeWindow.YAHOO.QL=false;
		unsafeWindow.YAHOO.SF=false;
		unsafeWindow.YAHOO.FG=false;
		unsafeWindow.YAHOO.GF=false;
	}
	catch(e){
		var QL=false;
		var SF=false;
		var FG=false;
		var GF=false;
		var MenuJSONlinks='';
	}
	getId('GM_Forums').parentNode.childNodes[0].addEventListener('mouseover',getForums,false);
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
		getForums();
		getMyFriendsAndGuilds();
		getQuickLinks();
		getSuggFrnd();
	},false);
	/*if(!GM_getValue('stingy',false)){
		getId('I-DONT-Donate-EVER').addEventListener('click',function(){GM_setValue('stingy',true)},false);
	}*/
}
else if(getId('gaia_menu_bar')){
	getId('gaia_menu_bar').setAttribute('style','background-color:#5A5163;border-top:1px solid black;border-bottom:1px solid black;background-image:none;');
}
//GM_log(new Date()-now);
/* Tease people who want the main RIG item *//*
var ele=getId('lost_chapter');
if(ele&&Math.random()>0.5){
	GM_addStyle('#neon_link{-moz-transition-property:top,left;-moz-transition-duration:1.5s;-moz-transition-delay:'+(Math.random()*2.5+2.5)+'s;}');
	ele.title='Nevermore the Raven: I know you want me.';
	ele.href='/marketplace/itemdetail/66159';
	ele.setAttribute('style','top:-4px;left:200px;');
}
*/