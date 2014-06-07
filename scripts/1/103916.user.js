// ==UserScript==
// @name           Redo the entire GOnline navigation bar
// @description    A great little navigation bar that is better than the one G currently has. ;D
// @include        http://www.gonline.com/*
// @include        https://www.gonline.com/*
// @include        http://gonline.com/*
// @include        https://gonline.com/*
// @require        http://userscripts.org/scripts/source/57622.user.js
// @require        http://sizzlemctwizzle.com/updater.php?id=79306
// @namespace      V5 @ GOnline
// @version        1.1.1
// ==/UserScript==
}
str+='</ul>';
alert(str);
*/
//var now=new Date();
function getId(id){
	return document.getElementById(id);
}
function GM_Submit_Search(type,text){
	GM_setValue('searchCatigory',type.selectedIndex);
	type=type.value;
	if(type=='undefined'){
		alert('Please choose a Search Type.');
		return;
}
function genLinkJSON(){
	if(!unsafeWindow.YAHOO.MenuJSONlinks){
		var json=new Array();
		var menus="mygaia_menu,shopping_menu,community_menu,world_menu,games_menu,tektek_menu,quick_links".split(',');
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
		unsafeWindow.YAHOO.MenuJSONlinks=json;
	}
	else{
		json=unsafeWindow.YAHOO.MenuJSONlinks;
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
function editLinks(){
	sendEvent(getId('get-quick-link').getElementsByClassName('icon')[0],'click');
	unsafeWindow.YAHOO.QL=false;
	var footer=getId('footer');
	createDivPopup();
	footer.style.display='block';
	getId('plus').style.visibility='visible';
	getId('footer-collapse-trigger').nextSibling.nextSibling.childNodes[1].className='active';
	var ele=document.getElementsByClassName('quick-links-content')[0];
	ele.setAttribute('style','bottom: '+(document.documentElement.clientHeight/2-ele.offsetHeight/2)+'px;');
	getId('GM_closeDivPopup').addEventListener('click',function(e){
		footer.style.display='';
		getId('footer-collapse-trigger').nextSibling.nextSibling.childNodes[1].className='inactive';
	},false);
}
function getForums(){
	if(unsafeWindow.YAHOO.GF===false){
		unsafeWindow.YAHOO.GF=true;
		GM_xmlhttpRequest({
			method: "GET",
			url: 'http://absols-web-apps.info/gtools/background/gaiaForums.php',
			onload: function(r){
				getId('GM_Forums').innerHTML=r.responseText;
			},
			onerror: function(){
				unsafeWindow.YAHOO.GF=false;
				getId('GM_Forums').innerHTML="Loading Error";
			}
		});
	}
}
function getSuggFrnd(){
	if(unsafeWindow.YAHOO.SF===false){
		unsafeWindow.YAHOO.SF=true;
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
				ele.innerHTML='';
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
					li.className='first';
					li.innerHTML='<a onclick="return false;" href="#">You have no suggested friends.</a>';
					ele.appendChild(li);
				}
				unsafeWindow.YAHOO.MenuJSONlinks='';
			},
			onerror: function(){
				unsafeWindow.YAHOO.SF=false;
			}
		});
	}
}
function getMyFriendsAndGuilds(){
	if(unsafeWindow.YAHOO.FG===false){
		unsafeWindow.YAHOO.FG=true;
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
						/*var a=document.createElement('a');
						a.href=json['data'][i]["url"];
						a.textContent=json['data'][i]["name"];
						li.appendChild(a);*/
						ele2.appendChild(li);
						gct++;
					}
				}
				if(gct==0){
					var li=document.createElement('li');
					li.className='first';
					li.innerHTML='<a onclick="return false;" href="#">You are in 0 guilds.</a>';
					ele2.appendChild(li);
				}
				if(fct==0){
					var li=document.createElement('li');
					li.className='first';
					li.innerHTML='<a onclick="return false;" href="#">You have 0 friends.</a>';
					ele.appendChild(li);
				}
				unsafeWindow.YAHOO.MenuJSONlinks='';
			},
			onerror: function(){
				unsafeWindow.YAHOO.FG=false;
			}
		});
	}
}
function getQuickLinks(){
	if(unsafeWindow.YAHOO.QL===false){
		unsafeWindow.YAHOO.QL=true;
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
				for(var i in json['quicklinks']){
					var li=document.createElement('li');
					li.className="quickLink";
					li.innerHTML='<a href="'+json['quicklinks'][i]['url']+'">'+json['quicklinks'][i]['title']+'</a>';
					ele.appendChild(li);
				}
				unsafeWindow.YAHOO.MenuJSONlinks='';
			},
			onerror: function(){
				unsafeWindow.YAHOO.QL=false;
			}
		});
	}
}
function sendEvent(ele,e){
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent(e, true, true);
	ele.dispatchEvent(evt);
}
function genFriends(){
	if(!unsafeWindow.YAHOO.clickHappy){
		unsafeWindow.YAHOO.clickHappy=true;
		GM_xmlhttpRequest({
			method: "GET",
			url: 'http://www.gaiaonline.com/gapi/rest/gfooter/?method=getfriendlist',
			onload: function(r){
				if(typeof JSON != 'undefined'){
					var json=JSON.parse(r.responseText);
				}
				else{
					var json=eval(r.responseText);
				}
				try{
					var avaServer=unsafeWindow.GAIA_config('avatar_server');
				}
				catch(e){
					var avaServer='a2.cdn.gaiaonline.com';	
				}
				var html='<dd><div class="dd-liner"><h4><span class="friend-header"><a href="/profile/friendlist.php?list=friend&amp;status=online">Online Friends ('+json['totalOnline']+')</a></span></h4><div class="subhead"><a href="/profile/friendlist.php">See all Friends</a> <span class="pipe"> | </span> <a href="/findfriends">Find Friends</a></div><ul id="friend-list-container2" class="friends-list">';
				var arr=new Array();
				for(var i in json['friendList']){
					arr.push(json['friendList'][i]['uid']);
					html+='<li><div class="dropBox"><img alt="'+json['friendList'][i]['un']+'" class="avatarImage gfooter" title="Click for Links" src="http://'+avaServer+'/gaia/members/'+json['friendList'][i]['hs']+'" style="cursor: pointer;" id="'+json['friendList'][i]['uid']+'"/></div><h5>'+json['friendList'][i]['un']+'</h5>'+((json['friendList'][i]['ltitle'])?'<a href="'+json['friendList'][i]['lurl']+'">'+json['friendList'][i]['ltitle']+'</a>':'Idle')+'</li>';
				}
				if(arr.length==0){
					html+='<li><h5 style="text-align:center">You have no friends</h5></li>';
				}
				html+='</ul></div><li class="last"></li></dd>';
				createDivPopup(html,'#GM_divPopupContentHolder dd{width:242px;margin:auto;}#GM_divPopupContentHolder h4{color:black;background-color:#8CB6D6;text-align:center;-moz-border-radius-topleft:10px;-moz-border-radius-topright:10px;}#GM_divPopupContentHolder .subhead{background-color:lightblue;text-align:center;}#GM_divPopupContentHolder h4 a{text-decoration:none;color:black}#GM_divPopupContentHolder li{list-style:none;padding:4px 8px;border-top:1px solid;background-color:#D9F0FF;border-left}#GM_divPopupContentHolder dd img{margin-top:2px;float:left;height:24px;width:24px;border:1px black solid;margin-right:10px}#GM_divPopupContentHolder li.last{-moz-border-radius-bottomleft:10px;-moz-border-radius-bottomright:10px;}');
				for(var i=0;i<arr.length;i++){
					getId(arr[i]).addEventListener('click',function(e){
						sendEvent(getId('GM_closeDivPopup'),'click');
						createDivPopup('<div id="GM_friendLinks"><h4>'+this.alt+'</h4><div class="subhead"><a id="GM_divNavBack" href="#back">Go back to friends list</a></div><li><a href="/profiles/'+this.id+'/">Profile</a><br/><a href="/profiles/?mode=comments&u='+this.id+'">Comments</a><br/><a href="/forum/myposts/'+this.id+'">Forum Posts</a><br/><a href="/forum/mytopics/'+this.id+'">Forum Topics</a><br/><a href="/journal/journal.php?mode=view&u='+this.id+'">Journal</a><br/><a href="/profiles/?mode=friends&u='+this.id+'">View Friends</a><br/><br/><a target="_blank" href="/launch/towns?&house_location='+this.id+'">Visit House</a><br/><a target="_blank" href="/images/Gaia_Flash/auto/carsig.swf?gsiUrl=www&userid='+this.id+'">View Car</a><br/><a target="_blank" href="'+this.src.replace('48x48.gif','flip.png')+'">View Avatar</a><br/><a target="_blank" href="/landing/flashaquarium/?userid='+this.id+'">View Aquarium</a><br/><br/><a href="/profile/privmsg.php?mode=post&u='+this.id+'">Send PM</a><br/><a href="/profiles/?mode=addcomment&u='+this.id+'">Send Comment</a><br/><a href="/textmessage?recipient_id='+this.id+'">Send Text</a><br/><a href="javascript:YAHOO.gaia.widgets.getIM('+this.id+');">Send IM</a><br/><br/><a href="/gaia/bank.php?mode=trade&uid='+this.id+'">Trade</a><br/><a id="buyGift" title="Buy a gift for '+this.alt+'" href="javascript:YAHOO.gaia.app.CashShop.SenderApplication.show({store:18,origin:\'pulldown\',target:{user_id:'+this.id+',username:\''+this.alt+'\'}});">Buy a Gift</a><br/><a href="/marketplace/userstore/'+this.id+'">View Store</a><br/><a title="View '+this.alt+'\'s Item" href="javascript:YAHOO.gaia.apps.ei.getItemList('+this.id+');">View Equipped List</a><br/><a href="/achievements/public/'+this.id+'">View Achievements</a><br/><br/><a href="/profile/friendlist.php?hook='+this.id+'">Ignore</a></li><li class="last"></li></div>','#GM_divPopupContentHolder h4{background-color:#8CB6D6;-moz-border-radius-topleft:10px;-moz-border-radius-topright:10px;padding-left: 10px; padding-right: 10px;text-align:center;}#GM_divPopupContentHolder .subhead{background-color:lightblue;padding-left: 10px; padding-right: 10px;text-align:center}#GM_divPopupContentHolder li a{padding-left: 10px; padding-right: 10px;}#GM_divPopupContentHolder li {list-style: none;background-color:#D9F0FF;}#GM_divPopupContentHolder li.last{-moz-border-radius-bottomleft:10px;-moz-border-radius-bottomright:10px;height:10px;}');
						getId('GM_divNavBack').addEventListener('click',function(e){
							setTimeout(genFriends,0);
							sendEvent(getId('GM_closeDivPopup'),'click');
						},false);
						var as=getId('GM_friendLinks').getElementsByTagName('a');
						for(var i=0;i<as.length;i++){
							if(as[i].href.slice(0,4)=='http'){
								as[i].setAttribute('onclick','return false;');
							}
							as[i].addEventListener('click',function(e){
								if(this.target=='_blank'){
									window.open(this.href);
								}
								else if(this.href.slice(0,4)=='http'){
									document.location.href=this.href;
								}
								else{
									document.location.href=this.href;
									sendEvent(getId('GM_closeDivPopup'),'click');
								}
							},false);
						}
					},false);
				}
				unsafeWindow.YAHOO.clickHappy=false;
			},
			onerror: function(){
				unsafeWindow.YAHOO.clickHappy=false;
				alert('There was a loading error.');
			}
		});
	}
	else{
		alert('Looks like someone is click happy.\n\t\tGive it a second.')
	}
}
try{
	var imgServer=unsafeWindow.GAIA_config('graphics_server');
}
catch(e){
	var imgServer='s.cdn.gaiaonline.com';	
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
		try{
			var usrid=getId('gmSelectLogin').className;
			if(usrid!=Number(usrid)){
				usrid='';
			}
		}
		catch(e){
			usrid='';
		}
	}
}
var nav=getId('nav');
var FF=getId('footer');
if(nav||FF){
	GM_addStyle("\n"+
		".goldMessage,div#qr_container,div#variations div.variation_containers,body > div.yui-tt.autoTooltip,#floating_outfits{\n"+
		"	z-index:452!important;\n"+
		"}\n"+
		"body:not(#fake_id) > div.mask{\n"+
		"	z-index:453!important;\n"+
		"}\n"+
		"div.yui-panel-container,#outfits_modal_c{\n"+
		"	z-index:454!important;\n"+
		"}\n"+
		"#home_content>div.yui-panel-container{\n"+
		"	z-index:450!important;\n"+
		"}\n"+
		"#nav > li > div{\n"+
		"	display:none;\n"+
		"}\n"+
		"#newmenu{\n"+
		"	position:absolute;\n"+
		"	z-index:451;\n"+
		"	top:151px;\n"+
		"}\n"+
		"#newmenu #nav,#newmenu #nav ul{\n"+
		"	font-size:12px;\n"+
		"	list-style:none;\n"+
		"	line-height:1;\n"+
		"}\n"+
		"#newmenu ul#nav a{\n"+
		"	display:block;\n"+
		"	width:auto;\n"+
		"	text-decoration:none;\n"+
		"	padding:4px;\n"+
		"	color:black;\n"+
		"}\n"+
		"#newmenu ul#nav li:not(.navHeading){\n"+
		"	-moz-transition-property:background-color;\n"+/* here for anmiation */
		"	-moz-transition-duration:0.8s;\n"+/* here for anmiation */
		"	-o-transition-property:background-color;\n"+/* here for anmiation */
		"	-o-transition-duration:0.8s;\n"+/* here for anmiation */
		"	-webkit-transition-property:background-color;\n"+/* here for anmiation */
		"	-webkit-transition-duration:0.8s;\n"+/* here for anmiation */
		"}\n"+
		"#newmenu #nav a.extended{\n"+
		"	background-image:url('http://"+imgServer+"/src/yui/menu/assets/menuitem_submenuindicator.png');\n"+
		"	background-position:right center;\n"+
		"	background-repeat:no-repeat;\n"+
		"	padding-right:16px;\n"+
		"}\n"+
		"#newmenu #nav li:hover a.header{\n"+
		"	background-color:#e7dfde;\n"+
		"	color:black;\n"+
		"}\n"+
		"#color_switcher_wrap:not(.classic) #newmenu #nav li:hover a.header{\n"+
		"	color:white;\n"+
		"}\n"+
		"#newmenu #nav li{\n"+
		"	float:left;\n"+
		"	width:12em;\n"+
		"	border-width:0 1px 1px;\n"+
		"	border-color:#9c969c;\n"+
		"	border-style:solid;\n"+
		"	background-color:white;\n"+
		"	list-style:none;\n"+
		"}\n"+
		"#newmenu #nav > li,#newmenu #nav > li:hover{\n"+
		"	border:none;\n"+
		"	background-color:transparent;\n"+
		"}\n"+
		"#newmenu #nav li:hover,#newmenu #nav a:hover{\n"+
		"	background-color:#E7dfde;\n"+
		"}\n"+
		".blue #newmenu #nav li:hover,.blue #newmenu #nav a:hover{\n"+
		"	background-color:lightblue;\n"+
		"}\n"+
		".red #newmenu #nav li:hover,.red #newmenu #nav a:hover{\n"+
		"	background-color:#FF7D7D;\n"+
		"}\n"+
		".green #newmenu #nav li:hover,.green #newmenu #nav a:hover{\n"+
		"	background-color:#AAFFAA;\n"+
		"}\n"+
		".yellow #newmenu #nav li:hover,.yellow #newmenu #nav a:hover{\n"+
		"	background-color:#F0E68C;\n"+
		"}\n"+
		".pink #newmenu #nav li:hover,.pink #newmenu #nav a:hover{\n"+
		"	background-color:#FFAAFF;\n"+
		"}\n"+
		".purple #newmenu #nav li:hover,.purple #newmenu #nav a:hover{\n"+
		"	background-color:#D0AAF3;\n"+
		"}\n"+
		".grey #newmenu #nav li:hover,.grey #newmenu #nav a:hover{\n"+
		"	background-color:darkgray;\n"+
		"}\n"+
		"#newmenu #nav li.selected{\n"+
		"	border-right:solid #9c969c 1px;\n"+
		"	background-color:#856c97;\n"+
		"}\n"+
		"#gaia_menu_bar #newmenu #nav li.standard{\n"+
		"	width:5em;\n"+
		"}\n"+
		"#gaia_menu_bar #newmenu #nav li.standard_ext{\n"+
		"	width:8em;\n"+
		"}\n"+
		"#gaia_menu_bar #newmenu #nav > li{\n"+
		"	border-right:solid #9c969c 1px;\n"+
		"}\n"+
		"#color_switcher_wrap:not(.classic) #gaia_menu_bar #newmenu #nav > li{\n"+
		"	border-right:solid black 1px;\n"+
		"}\n"+
		"#newmenu #nav li.first{\n"+
		"	border-top:1px solid #9c969c;\n"+
		"}\n"+
		"#newmenu #nav li a.header{\n"+
		"	text-align:center;\n"+
		"	color:white;\n"+
		"	font-weight:bold;\n"+
		"}\n"+
		"#newmenu #nav li ul ul{\n"+
		"	margin:-1.72em 0 0 12em;\n"+
		"}\n"+
		"#newmenu #nav li ul ul ul{\n"+
		"	margin:-1.8em 0 0 12em;\n"+
		"}\n"+
		"#newmenu #nav li ul ul ul ul{\n"+
		"	margin:-2.6em 0 0 12em;\n"+
		"}\n"+
		"#newmenu #nav li ul ul ul ul ul{\n"+
		"	margin:-3.4em 0 0 12em;\n"+
		"}\n"+
		"#newmenu #nav li ul{\n"+
		"	position:absolute;\n"+
		"	width:12em;\n"+
		"}\n"+
		"#newmenu #nav li ul,#newmenu #nav li:hover ul ul,#newmenu #nav li:hover ul ul ul,#newmenu #nav li:hover ul ul ul ul,#newmenu #nav li:hover ul ul ul ul ul,#newmenu #nav li:hover ul ul ul ul ul ul{\n"+
		"	left:-999em;\n"+
		"	opacity:0;\n"+/* here for anmiation */
		"	-moz-transition-property:opacity,-moz-box-shadow,box-shadow;\n"+/* here for anmiation */
		"	-moz-transition-duration:0.8s;\n"+/* here for anmiation */
		"	-o-transition-property:opacity,-o-box-shadow,box-shadow;\n"+/* here for anmiation */
		"	-o-transition-duration:0.8s;\n"+/* here for anmiation */
		"	-webkit-transition-property:opacity,-webkit-box-shadow,box-shadow;\n"+/* here for anmiation */
		"	-webkit-transition-duration:0.8s;\n"+/* here for anmiation */
		"	-moz-box-shadow: 6px 5px 5px rgba(0,0,0,0);\n"+
		"	-webkit-box-shadow: 6px 5px 5px rgba(0,0,0,0);\n"+
		"	box-shadow: 6px 5px 5px rgba(0,0,0,0);\n"+
		"}\n"+
		"#newmenu #nav li:hover ul,#newmenu #nav li li:hover ul,#newmenu #nav li li li:hover ul,#newmenu #nav li li li li:hover ul,#newmenu #nav li li li li li:hover ul,#newmenu #nav li li li li li li:hover ul{\n"+
		"	left:auto;\n"+
		"	opacity:1;\n"+/* here for anmiation */
		"	-moz-box-shadow: 6px 5px 5px rgba(0,0,0,0.3);\n"+
		"	-webkit-box-shadow: 6px 5px 5px rgba(0,0,0,0.3);\n"+
		"	box-shadow: 6px 5px 5px rgba(0,0,0,0.3);\n"+
		"}\n"+
		"#newmenu #nav li li li li:hover ul,#newmenu #nav li li li li li:hover ul,#newmenu #nav li li li li li li:hover ul{\n"+
		"	margin-top:-21px;\n"+
		"}\n"+
		"#newmenu #nav li.oversized_ext:hover>ul{\n"+
		"	margin-top:-33px;\n"+
		"}\n"+
		"#gaia_header #gaia_menu_bar{\n"+
		"	height:20px;\n"+
		"	background-image:none;\n"+
		"	background-color:#5a5163;\n"+
		"	border-top:1px solid black;\n"+
		"	border-bottom:1px solid black;\n"+
		"}\n"+
		"#gaia_header #color_switcher_wrap:not(.classic) #gaia_menu_bar{\n"+
		"	height:22px;\n"+
		"	border-top:none;\n"+
		"	border-bottom:none;\n"+
		"}\n"+
		"#gaia_header #gaia_menu_bar > #newmenu > #nav > #color_menu.standard > a.header{\n"+
		"	padding-top:3px;\n"+
		"	height:13px!important;\n"+
		"}\n"+
		"#gaia_menu_bar .home_icon,#color_switcher_wrap:not(.classic) #gaia_menu_bar .home_icon{\n"+
		"	padding:0 9px;\n"+
		"	display:inline;\n"+
		"	background-repeat:no-repeat;\n"+
		"	background-position:center;\n"+
		"	background-image:url('data:image/gif;base64,R0lGODlhDQAKAMQTAP////39/eXh6ZiIquTg6aaYtebj66OVs9jU3bmuxb+2ysvD1Pn4+r2zyPLx9JaGqNPM27Glvvb1+OTe2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABMALAAAAAANAAoAAAUv4CSOyGiOjQQYxTkNUADMTmIexKwDwfJMCsZuKIiIhjuTbrRkzpwA5fM4pUatohAAOw==');\n"+
		"}\n"+
		"#gaia_menu_bar a:hover .home_icon{\n"+
		"	background-image:url('data:image/gif;base64,R0lGODlhDQAKAKIEAAAAAJmZmWZmZjMzM+Te2AAAAAAAAAAAACH5BAEAAAQALAAAAAANAAoAAAMhSKoDs5AEQGmIomqxst7SJ16EWEGnkqrUspYtC6AxPBMJADs=')\n"+
		"}\n"+
		"#color_switcher_wrap:not(.classic) #gaia_menu_bar #newmenu #nav li.selected,#color_switcher_wrap:not(.classic) #gaia_menu_bar #newmenu #nav li:hover a.header{\n"+
		"	background-repeat:repeat-x;\n"+
		"	background-position:0 -1101px;\n"+
		"}\n"+
		".blue #gaia_menu_bar #newmenu #nav li.selected,.blue #gaia_menu_bar #newmenu #nav li:hover a.header{\n"+
		"	background-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24.png');\n"+
		"}\n"+
		".red #gaia_menu_bar #newmenu #nav li.selected,.red #gaia_menu_bar #newmenu #nav li:hover a.header{\n"+
		"	background-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_red.png');\n"+
		"}\n"+
		".green #gaia_menu_bar #newmenu #nav li.selected,.green #gaia_menu_bar #newmenu #nav li:hover a.header{\n"+
		"	background-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_green.png');\n"+
		"}\n"+
		".yellow #gaia_menu_bar #newmenu #nav li.selected,.yellow #gaia_menu_bar #newmenu #nav li:hover a.header{\n"+
		"	background-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_yellow.png');\n"+
		"}\n"+
		".pink #gaia_menu_bar #newmenu #nav li.selected,.pink #gaia_menu_bar #newmenu #nav li:hover a.header{\n"+
		"	background-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_pink.png');\n"+
		"}\n"+
		".purple #gaia_menu_bar #newmenu #nav li.selected,.purple #gaia_menu_bar #newmenu #nav li:hover a.header{\n"+
		"	background-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_purple.png');\n"+
		"}\n"+
		".grey #gaia_menu_bar #newmenu #nav li.selected,.grey #gaia_menu_bar #newmenu #nav li:hover a.header{\n"+
		"	background-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_grey.png');\n"+
		"}\n"+
		"#gaia_header #color_switcher_wrap:not(.classic) #gaia_menu_bar{\n"+
		"	background-position:0 -100px;\n"+
		"}\n"+
		"#gaia_header .blue #gaia_menu_bar,.blue #gaia_menu_bar #newmenu #nav li:hover a.header{\n"+
		"	background-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24.png');\n"+
		"}\n"+
		"#gaia_header .pink #gaia_menu_bar,.pink #gaia_menu_bar #newmenu #nav li:hover a.header{\n"+
		"	background-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_pink.png');\n"+
		"}\n"+
		"#gaia_header .green #gaia_menu_bar,.green #gaia_menu_bar #newmenu #nav li:hover a.header{\n"+
		"	background-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_green.png');\n"+
		"}\n"+
		"#gaia_header .red #gaia_menu_bar,.red #gaia_menu_bar #newmenu #nav li:hover a.header{\n"+
		"	background-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_red.png');\n"+
		"}\n"+
		"#gaia_header .yellow #gaia_menu_bar,.yellow #gaia_menu_bar #newmenu #nav li:hover a.header{\n"+
		"	background-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_yellow.png');\n"+
		"}\n"+
		"#gaia_header .purple #gaia_menu_bar,.purple #gaia_menu_bar #newmenu #nav li:hover a.header{\n"+
		"	background-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_purple.png');\n"+
		"}\n"+
		"#gaia_header .grey #gaia_menu_bar,.grey #gaia_menu_bar #newmenu #nav li:hover a.header{\n"+
		"	background-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/navsprite_01_PNG24_grey.png');\n"+
		"}\n"+
		"#gaia_header #gaia_menu_bar #newmenu #nav #color_menu a.header{\n"+
		"	margin-top:0px;\n"+
		"	margin-bottom:0px;\n"+
		"}\n"+
		"#color_menu .panel_img{\n"+
		"	background-image:url('http://"+imgServer+"/images/gaia_global/gaia_panelnav/colors.png');\n"+
		"	padding-left:16px;\n"+
		"	margin-right:1px;\n"+
		"}\n"+
		"#gaia_menu_bar #newmenu #nav #color_menu{\n"+
		"	width:2em;\n"+
		"}\n"+
		".classic #newmenu #nav #color_menu{\n"+
		"	background-image:none;\n"+
		"}\n"+
		"#color_menu .selected .panel_img{\n"+
		"	padding-top:1px;\n"+
		"	padding-bottom:1px;\n"+
		"}\n"+
		"#color_menu #green .panel_img{\n"+
		"	background-position:0 0;\n"+
		"}\n"+
		"#color_menu #green.selected .panel_img{\n"+
		"	background-position:0 -39px;\n"+
		"}\n"+
		"#color_menu #pink .panel_img{\n"+
		"	background-position:-18px 0;\n"+
		"}\n"+
		"#color_menu #pink.selected .panel_img{\n"+
		"	background-position:-18px -39px;\n"+
		"}\n"+
		"#color_menu #yellow .panel_img{\n"+
		"	background-position:-36px 0;\n"+
		"}\n"+
		"#color_menu #yellow.selected .panel_img{\n"+
		"	background-position:-36px -39px;\n"+
		"}\n"+
		"#color_menu #red .panel_img{\n"+
		"	background-position:-54px 0;\n"+
		"}\n"+
		"#color_menu #red.selected .panel_img{\n"+
		"	background-position:-54px -39px;\n"+
		"}\n"+
		"#color_menu #blue .panel_img{\n"+
		"	background-position:-72px 0;\n"+
		"}\n"+
		"#color_menu #blue.selected .panel_img{\n"+
		"	background-position:-72px -39px;\n"+
		"}\n"+
		"#color_menu #purple .panel_img{\n"+
		"	background-position:-90px 0;\n"+
		"}\n"+
		"#color_menu #purple.selected .panel_img{\n"+
		"	background-position:-90px -39px;\n"+
		"}\n"+
		"#color_menu #grey .panel_img{\n"+
		"	background-position:-108px 0;\n"+
		"}\n"+
		"#color_menu #grey.selected .panel_img{\n"+
		"	background-position:-108px -39px;\n"+
		"}\n"+
		"#color_menu #classic .panel_img{\n"+
		"	background-position:-90px 0;\n"+
		"}\n"+
		"#color_menu #classic.selected .panel_img{\n"+
		"	background-position:-90px -39px;\n"+
		"}\n"+
		"#gm_search ul,#gm_search li{\n"+
		"	width:338px !important;\n"+
		"}\n"+
		"#GM_Search_Form,#linkFinderForm{\n"+
		"	padding:5px;\n"+
		"	margin:0\n;"+
		"}\n"+
		"#GM_Search_Type{\n"+
		"	font-size:13px !important;\n"+
		"	height:20px;\n"+
		"	width:105px;\n"+
		"	padding:0px;\n"+
		"}\n"+
		"#GM_Search_Type .two {\n"+
		"	padding-left:16px;\n"+
		"}\n"+
		"#GM_Search_Type .three {\n"+
		"	padding-left:32px;\n"+
		"}\n"+
		"#GM_Search_Text{\n"+
		"	margin-top:1px;\n"+
		"	display:inline;\n"+
		"	font-size:12px;\n"+
		"	padding:0px;\n"+
		"	height:16px;\n"+
		"	width:145px;\n"+
		"	position:relative;\n"+
		"	top:-1px;\n"+
		"}\n"+
		"#GM_Search_Gbtn{\n"+
		"	background-image:url('http://"+imgServer+"/images/common/bn/bn_search.gif');\n"+
		"	background-color:transparent;\n"+
		"	border:none;\n"+
		"	cursor:pointer;\n"+
		"	height:21px;\n"+
		"	overflow:hidden;\n"+
		"	text-align:left;\n"+
		"	text-indent:-5000em;\n"+
		"	width:66px;\n"+
		"}"+
		"#GM_Search_Gbtn:hover{\n"+
		"	background-attachment:scroll;\n"+
		"	background-position:left -21px;\n"+
		"}\n"+
		"#newmenu #nav #gm_search.locked > ul > li{\n"+
		"	background-image:url('http://"+imgServer+"/images/gaia_global/body/icons/ic_soulbound_30x30.gif');\n"+
		"	background-position:bottom left;\n"+
		"	background-repeat:no-repeat;\n"+
		"}\n"+
		"#newmenu #nav #gm_search.locked a{\n"+
		"	background:none;\n"+
		"}\n"+
		"#gm_search #GM_linkFinder{\n"+
		"	width:85%;\n"+
		"}\n"+
		"#gm_search #GM_linksSearch{\n"+
		"	width:100%;\n"+
		"}\n"+
		"#gm_search #GM_SearchGo{\n"+
		"	background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAVCAYAAAAuJkyQAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oHAhUQKXXFatQAAALzSURBVEjHzVZLSFRhGD3/ODrNMNk4M1qaWY7Zw3LRc4Kyl7kxyrCFBG0iCmohiYsISwShFkZFQRCSSrSpaFMRrQopeichUpSvEHMGx7GZpus8rvOfFvc6s5qpVc0HZ/HzHb5zuP/3f99FwDcGAMwEBHxjMNryS7j94C30dFTBZnPgf4THM4ETrW9hyy+hAMCRkVE4nU49bfiHViQAwGjMhtfrgctVCgGAMzMRZEJYLPNg1BxmIVMiMw0JITLG0F92sArPsys4Xr0a+TkCQggISyEqa47iwsMRhKnTOIOv91pQv34xLEJACCPsK3bh2LUX8M3+vSlKyTSIcaS7jva5eWF1cWPVdrpX5mnnysscipFShjlwcRtNOs/i2kB35cLEjCk+8oBelWm1dC4Yj8uUUL33ud+qFXXUd/OLEtdzKv0fbvJU4x2OxSTV77e5x6Txypt76Vcl4/EIh7v2cj5AoJiNr5W0WglDqhpPienHB2gBCKzj1cFoSp7/0T6aAQKbeeNbLJkLPufRAs3o8tZ+Kmm0ANAAAFIyBSSUSS9mAMC8BK68LChvGrEkOwvZc1jVhoGwhOLzIQwA5kIUWw3JGllOlOkLIDAeQCylFpNNLaVMASLHng8zAIRH8WkyBpFbgd3VVVi/ONGCkJIw2Z06bwJjwdlkjagPo36NaSvKhSGllkw2taJEUyI0eps187RPnlfXyY9TESpKiH3nyrU7LzvL99NRhoZ7uCtHv5qmp5wIRakov/i5s5ZWgEART/YG0moleigUiqRBkH0dO/U+AmFeynVVu+kuMWhnVwvfTkUYCv3gm3Y3s+deWekGblq7kEI/Lzp0l0OBSFqthKGfP8N/wA8O3G1jw5ZS5hp0Y5YirtnRwKbrrzge0HnBKb7ramZtZYH+/AXnL9vKw+efcNAf/qMOAG3bT/l/ZcSUdjqs2upQVTWzdpnH64fDvuC/GvFPB5OGTrW/xKUzFbDbHZA0/XMzPt8kTnf068Mqw/6pfwMBQ4MZ3TgCUQAAAABJRU5ErkJggg==');\n"+
		"	background-color:transparent;\n"+
		"	background-repeat:no-repeat;\n"+
		"	border:medium none;\n"+
		"	cursor:pointer;\n"+
		"	height:21px;\n"+
		"	overflow:hidden;\n"+
		"	text-align:left;\n"+
		"	text-indent:-5000em;\n"+
		"	width:38px;\n"+
		"}\n"+
		"#gm_search #GM_SearchGo:hover{\n"+
		"	background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAVCAYAAAAuJkyQAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oHAhUMJgMNKhgAAAMHSURBVEjHzZZNbBNHFMd/492147UdO45xPkTkRK3DR4JQDlBVoigSiIKCkkNBXGnFgUt7AokDEgc+DogLVVvl0ktvRRSJQlVxqJTQKkICypcAJUWBBPMR7CQOcey117vDYWOCgDiWerCfNNKs5q95v3lv3psV6eQk/QeHJDVgvw/2CrH1q1/krt4O9vStoTFUVxWQ6bTB+T9G+XPoMSrA/r3d+HR31SLTFPGxf2/3ElCw3lv1dJUYVABVVagVq00gIURtAa1sklfPk5z9N8mVlwazNqBqdDYF6e9u5uuYB6c+bR6Pv+D07WmupkwMBMGgn51drRxa7yfsqhBIyvIwibFxBobTzAFoHjZENVy5HHeepTiT89K3Okqby+bRvf/ov5ahAHgDOhs1kzsz8/w6Mspw6lMubg3SKCoCWp7INtKcGHFgQh0xzvc2ElMc0NfTM/ww5kJDYmVnOX7dgWnf0Mlvm/3UC+cwu6/O8XJsgp/WdXF0VfkwuQBsWy47FpIz/GMCePluUwNtorQG/oYwRz4LsUpKMslZbloAOge6dPzS0bS2N9FXB2AyNJknX8bX2wiVPj5m2ZyJAaC4adMg++opOy6nSJYE9c1cGmimIVdc1Gk0K+/uqdBWBxgwv1DEtCXKyhGylx2aW8EDYOV5lLUQqofPW3x06aUrJt/TmTzPv7NH0SRhONKAVyDK+KooZXWhEJsUAIPBm7MkvGFObuvgVNzz9tI7uiA9LoAsPz/MMGc5oIknU1w2ADS2tGgo/zdluAMc7vFx48YCc5MJdj+bYn3Eg5bJL9WhLcET4PBGnX23skzcH2fbhJe4anIvXUQCkY4WvmkQ5X1VUmUAsXiMC3qKHx+mGU4VeDBlgqoSb/KxpT1AVEikFHyyNsY5b5LvH6QZSee4C/j8OtvjUb7t9NGIXKHFLAIVTGvFhhWJhjkWDX98sWhRWJyubo1wujXyocayKFgVNkbTNGvr6ZieyRLwu6sKMp8pLAFd+mucL79ooT6gVwXm9XyWK3+/AEDU2j/1GxF4s/gz/yI/AAAAAElFTkSuQmCC');\n"+
		"}\n"+
		"#newmenu #nav > li.locked > ul{\n"+
		"	left:auto;\n"+
		"	z-index:1;\n"+
		"	opacity:1;\n"+/* here for anmiation */
		"	-moz-box-shadow: 6px 5px 5px rgba(0,0,0,0.3);\n"+
		"	-webkit-box-shadow: 6px 5px 5px rgba(0,0,0,0.3);\n"+
		"	box-shadow: 6px 5px 5px rgba(0,0,0,0.3);\n"+
		"}\n"+
		"#newmenu #nav li>img.ajax_loading{\n"+
		"	margin-left:4.7em;\n"+
		"}\n"+
		"#newmenu #nav > li:not(.locked) > ul{\n"+
		"	z-index:2;\n"+
		"}\n"+
		"#gm_search li{\n"+
		"	padding-bottom:15px;\n"+
		"}"+
		".GM_innerContent{\n"+ /* unfacebook */
		"	background-image:url('http://"+imgServer+"/images/gaia_global/gaia_header/new_header/header_vitals_PNG24.png');\n"+
		"	background-position:-125px -20px;\n"+
		"	height:32px;\n"+
		"}\n"+
		"#color_switcher_wrap:not(.classic).GM_innerContent{\n"+
		"	background-position:-125px -20px;\n"+
		"	height:32px;\n"+
		"}\n"+
		".red .GM_innerContent{\n"+
		"	background-image:url('http://"+imgServer+"/images/gaia_global/gaia_header/new_header/header_vitals_red_PNG24.png');\n"+
		"}\n"+
		".green .GM_innerContent{\n"+
		"	background-image:url('http://"+imgServer+"/images/gaia_global/gaia_header/new_header/header_vitals_green_PNG24.png');\n"+
		"}\n"+
		".pink .GM_innerContent{\n"+
		"	background-image:url('http://"+imgServer+"/images/gaia_global/gaia_header/new_header/header_vitals_pink_PNG24.png');\n"+
		"}\n"+
		".grey .GM_innerContent{\n"+
		"	background-image:url('http://"+imgServer+"/images/gaia_global/gaia_header/new_header/header_vitals_grey_PNG24.png');\n"+
		"}\n"+
		".yellow .GM_innerContent{\n"+
		"	background-image:url('http://"+imgServer+"/images/gaia_global/gaia_header/new_header/header_vitals_yellow_PNG24.png');\n"+
		"}\n"+
		".purple .GM_innerContent{\n"+
		"	background-image:url('http://"+imgServer+"/images/gaia_global/gaia_header/new_header/header_vitals_purple_PNG24.png');\n"+
		"}\n"+
		"div#linksHolder *:hover {\n"+
		"	background-color:#E7dfde!important;\n"+
		"}\n"+
		"#GM_innerContent1{\n"+
		"	width:150px;\n"+
		"}\n"+
		"#GM_innerContent2{\n"+
		"	width:90px;\n"+
		"}\n"+
		"#gaia_header .GM_innerContent .hud-item:not(.hud-group-spacer){\n"+
		"	background-image:url('data:image/png;base64,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');\n"+
		"	background-repeat:no-repeat;\n"+
		"	height:30px;\n"+
		"	top:-1px;\n"+
		"	position:relative;\n"+
		"}\n"+
		"#gaia_header .GM_innerContent #divHeaderOutfits.hud-item{\n"+
		"	background-image:url('http://"+imgServer+"/images/gaia_global/gaia_footer/dresser.png');\n"+
		"	width:73px;\n"+
		"	height:30px;\n"+
		"	top:1px;\n"+
		"	position:relative;\n"+
		"	background-position:0px 0px;\n"+
		"}\n"+
		".GM_innerContent a{\n"+
		"	color:white;\n"+
		"	background-image:none!important;\n"+
		"}\n"+
		".GM_innerContent #divHeaderFriends{\n"+
		"	background-position:-3px 0px;\n"+
		"	padding-left:6px;\n"+
		"	width:50px;\n"+
		"}\n"+
		".GM_innerContent #divHeaderMail{\n"+
		"	background-position:0px -34px;\n"+
		"	width:60px;\n"+
		"}\n"+
		".GM_innerContent #headerMail{\n"+
		"	margin-left:10px;\n"+
		"}\n"+
		"#gaia_header .header_content .accountCurrency .bgAlpha .refill,#gaia_header .header_content .accountCurrency .bgAlpha .needMoreCash{\n"+
		"	min-width: 94px;\n"+
		"}\n"+
		"#gaia_header .header_content .userName{\n"+
		"	z-index:1;\n"+
		"}\n"+
		"#gaia_header .header_content #dailyReward{\n"+
		"	left:665px;\n"+
		"}\n"+
		"#gaia_header .header_content #treasureChest{\n"+
		"	left:850px;\n"+
		"}\n"+
		"div#footer.footer{\n"+
		"	z-index:9002;\n"+
		"	display:none;\n"+
		"}\n"+
		"ul#friend-list-container2.friends-list{\n"+
		"	margin:0px;\n"+
		"}\n"+
		"#gaia_header .header_content div#treasureChest{\n"+
		"	left:780px;\n"+
		"}\n"+
		"#add-quick-link-header,#edit-quick-links-header{\n"+
		"	margin:0px!important;\n"+
		"}\n"+
		"#footer dd.quick-links-content{\n"+
		"	left: "+(document.body.offsetWidth/2-121)+"px;\n"+
		"	position: fixed;\n"+
		"	border-bottom: 1px solid black;\n"+
		"	z-index:9002;\n"+
		"}\n"+
		"#footer{\n"+
		"	z-index:9002\n"+
		"}\n"+
		".footer dt,#footer-collapse-trigger,#footer .quick-links .close,#footer #plus {\n"+
		"	display:none!important\n"+
		"}\n"+
	"\n");
}
if(nav){
	try{
		var selectedTab=document.getElementsByClassName('selected')[0].id;
	}
	catch(e){}
	var Color='';
	var js='onclick="window.open(this.href,\'status=yes,scrollbars=no,menubar=no,location=no\',\'width=740,height=580\');return false;"';
	var Home='<li id="home_menu" class="standard navHeading"><a class="header" href="/"><span class="home_icon" style="top:5px;left:4px"></span>Home</a></li>';
	var MyGaia='<li id="mygaia_menu" class="standard navHeading"><a class="header" href="/mygaia">My Gaia</a><ul><li class="first"><a href="/avatar/">Avatar</a></li><li><a href="/homes/">House</a></li><li><a href="/auto/">Car</a></li><li><a href="/aquarium/">Aquarium</a></li><li><a href="/inventory/" class="extended">Inventory</a><ul><li class="first"><a href="/inventory/view/all">All</a></li><li><a href="/inventory/view/equip">Equip</a></li><li><a href="/inventory/view/game">Game</a></li><li><a href="/inventory/view/special">Special</a></li><li><a href="/inventory/view/house">House</a></li><li><a href="/inventory/view/zomg">zOMG!</a></li><li><a href="/inventory/view/aquarium">Aquarium</a></li><li><a href="/inventory/view/animated">Animated</a></li><li><a href="/profile/arranger.php">Arrange Items</a></li></ul></li><li><a href="/profile/privmsg.php" class="extended">Mail</a><ul><li class="first"><a href="/profile/privmsg.php?mode=post">Write Mail</a></li><li><a href="/textmessage/">Send Text Message</a></li><li><a href="/profile/privmsg.php">Inbox</a></li><li><a href="/profile/privmsg.php?folder=outbox">Outbox</a></li><li><a href="/profile/privmsg.php?folder=sentbox">Sent</a></li><li><a href="/profile/privmsg.php?folder=savebox">Saved</a></li></ul></li><li><a href="/profile/friendlist.php" class="extended">Friends</a><ul><li class="first"><a class="extended" href="/profile/friendlist.php">Friends List</a><ul id="GM_Friends"><li class="first"><img class="ajax_loading" src="http://'+imgServer+'/images/template/dropdown/ajax-loader.gif"/></li></ul></li><li><a href="/findfriends/" class="extended">Find Friends</a><ul><li class="first"><a class="extended" onclick="return false" href="#">Suggested Friends</a><ul id="GM_suggFrnd"><li class="first"><img class="ajax_loading" src="http://'+imgServer+'/images/template/dropdown/ajax-loader.gif"/></li></ul></li></ul></li><li><a href="/profile/friendlist.php?list=approval">Requests to You</a></li><li><a href="/profile/friendlist.php?list=pending">Requests from You</a></li><li><a href="/findfriends/history/">Invite History</a></li><li><a href="/profile/friendlist.php?list=ignored">Ignored List</a></li></ul></li><li><a href="/journal/journal.php?mode=view&amp;u=65153" class="extended">Journal</a><ul><li class="first"><a href="/journal/journal.php?mode=entry&amp;action=load-add">New Entry</a></li><li><a href="/journal/journal.php?mode=entry">Archive</a></li><li><a href="/journal/journal.php?mode=preferences">Preferences</a></li><li><a href="/journal/journal.php?mode=landing">Subscriptions</a></li></ul></li><li><a href="/quest/" class="extended">Quests</a><ul><li class="first"><a href="/quest/">Active</a></li><li><a href="/quest/history/">Completed</a></li><li><a href="/quest/badge/">Badges</a></li></ul></li><li><a href="/account/" class="extended">Account Settings</a><ul><li class="first"><a href="/account/preferences/">Preferences</a></li><li><a href="/account/alerts/">Alerts</a></li><li><a href="/account/notifications/">Notifications</a></li><li><a href="/account/details/">Details</a></li><li><a href="/account/interests/">Interests</a></li><li><a href="/account/signature/">Signature</a></li><li><a href="/account/datafeeds/">Feeds</a></li><li><a href="/account/wishlist/">Wishlist</a></li></ul></li><li><a class="extended" href="/profiles/">Profile</a><ul><li class="first"><a href="/profiles/'+usrid+'">Profile</a></li><li><a href="/profiles/?mode=comments">Comments</a></li><li><a title="For Current Profile" href="/profiles/?mode=edit&u='+usrid+'">Edit Profile</a></li><li><a href="/account/about/">About Me</a></li><li><a href="/account/profileprefs/">Profile Preferences</a></li></ul></li><li><a href="/mygaia/settings/">Notifications</a></li><li><a href="/achievements/">Achievements</a></li></ul></li>';
	var Shop='<li id="shopping_menu" class="standard navHeading"><a class="header" href="/market">Shop</a><ul><li class="first"><a href="/collectibles">Monthly Collectibles</a></li><li id="gaia_menuitem_cashshop"><a href="/market/?cashshop=true">Cash Shop</a></li><li><a href="/info/gold/gcash/" class="extended">Get Gaia Cash</a><ul><li class="first"><a href="/shop/?from=gpass">Purchase Online</a></li><li><a href="/info/gold/gcash/#store_hd">Locate Store</a></li><li><a href="http://www.gaiastore.com/servlet/the-Gaia-Cash-Cards/Categories">Send a Gift Card</a></li><li><a href="/redeem/">Redeem a Pin</a></li><li><a href="/offers">Sponsored Offers</a></li></ul></li><li><a href="/gaia/shopping.php" class="extended">Shops</a><ul><li class="first"><a href="/gaia/shopping.php?key=suobdlxpawwzvmcs">Barton Boutique</a></li><li><a class="extended" href="/gaia/shopping.php/?key=uhxrdnkgimmkhslj">Back Alley Bargains</a><ul><li class="first"><a href="/gaia/exchange.php?store=uhxrdnkgimmkhslj">Make Recipes</a></li></ul></li><li><a class="extended" href="/gaia/shopping.php/?key=ngabwpnnhvmyhins">Durem Depot</a><ul><li class="first"><a href="/gaia/exchange.php?store=ngabwpnnhvmyhins">Exchange Bugs</a></li></ul></li><li><a href="/gaia/shopping.php/?key=tctmkgjtjekkblii">Gambino Outfitters</a></li><li><a href="/gaia/shopping.php/?key=jqztgkvbtpraewh">Global Imports</a></li><li><a class="extended" href="/gaia/shopping.php/?key=ggcmjiwqlqkpvbos">H &amp; R Wesley</a><ul><li class="first"><a href="/gaia/exchange.php?store=ggcmjiwqlqkpvbos">Exchange Credits</a></li></ul></li><li><a href="/gaia/shopping.php/?key=alpltfbdnxgowsfn">The Ole Fishing Hole</a></li><li><a href="/gaia/shopping.php/?key=aqyvrienpejsqhlq">The Jock Strap</a></li><li><a href="/gaia/shopping.php/?key=jeusorituensldjz">Junk in the Trunk</a></li><li><a onclick="if(event.which==1){YAHOO.gaia.app.CashShop.SenderApplication.show({store:18,self:true,origin:\'stores\'});return false;}else{return true;}" href="/market/?cashshop=true">Mintaka & Rigel</a></a></li><li><a href="/gaia/shopping.php?key=ffwawfdfghlkghvu">Macy\'s MStyleLab</a></li><li><a class="extended" href="/gaia/shopping.php/?key=uxzehjwiwxtrueit">Ruby\'s Rack</a><ul><li class="first"><a href="/gaia/exchange.php?store=uxzehjwiwxtrueit">Exchange Trash</a></li></ul></li><li><a href="/gaia/shopping.php/?key=wdwoprgbzbtbjimf">Salon Durem</a></li><li><a href="/gaia/shopping.php/?key=peoikjdnhbalvieu">Phin Phang</a></li><li><a href="/gaia/shopping.php/?key=eazdhzyfhsu3hek8">Sunset Couture</a></li><li><a href="/gaia/shopping.php/?key=gxqxrbzixwydqakn">Sams Body &amp; Parts</a></li><li><a href="/gaia/shopping.php/?key=essxqbkkcfqhuyrn">Barton Jewelers</a></li><li><a class="extended" href="/gaia/shopping.php/?key=bvnsukowrbkthaiq">Skin Tyte</a><ul><li class="first"><a href="/gaia/exchange.php?store=bvnsukowrbkthaiq">Buy Tattoos</a></li></ul></li><li><a href="/gaia/shopping.php/?key=hsozifjktvkcqqxc">The Faktori</a></li><li><a href="/gaia/shopping.php?key=eimzlapgnduengad">Dernier Cri</a></li><li><a href="/gaia/shopping.php/?key=bpzhydftrxmiydnf">Buttercup Cafe</a></li><li><a href="/gaia/shopping.php/?key=ndroctlqvprghqqy">Prize &amp; Joy</a></li><li><a href="/gaia/shopping.php?key=quoyxevolpizoreo"/>The Treehouse</a></li></ul></li><li><a href="/museum/">Evolving Item Museum</a></li><li><a href="/marketplace/" class="extended">Marketplace</a><ul><li class="first"><a href="/marketplace/itemsearch/">Item Search</a></li><li><a class="extended" href="/marketplace/vendsearch/">All Listings</a><ul><li class="first"><a href="/marketplace/vendsearch/?sortBy=90">Old Listings</a></li><li><a href="/marketplace/vendsearch/?sortBy=91">New Listings</a></li></ul></li><li><a class="extended" href="/marketplace/mystore/">My Store</a><ul><li class="first"><a href="/marketplace/vendlog/'+usrid+'/listed/">Listed Items</a></li><li><a href="/marketplace/vendlog/'+usrid+'/bought/">Bought Items</a></li><li><a href="http://www.gaiaonline.com/marketplace/editstore">Edit Store</a></li></ul></li><li><a class="extended" href="/marketplace/mystore/showinventory/">Sell an Item</a><ul><li class="first"><a href="/marketplace/mystore/showinventory/">All</a></li><li><a href="/marketplace/mystore/showinventory/?tab=equip">Equip</a></li><li><a href="/marketplace/mystore/showinventory/?tab=game">Game</a></li><li><a href="/marketplace/mystore/showinventory/?tab=special">Special</a></li><li><a href="/marketplace/mystore/showinventory/?tab=housing">House</a></li></li><li><a href="/marketplace/mystore/showinventory/?tab=zomg">zOMG!</a></li><li><a title="I wish." href="/forum/t.52433563/">Aquarium</a></li></ul></li><li><a href="/marketplace/watchlist/">My Watchlist</a></li><li><a href="/account/wishlist/">My Wishlist</a></li></ul></li><li><a href="/gaia/bank.php">Trade</a></li><li><a href="http://www.gaiastore.com/servlet/StoreFront" class="extended">Merchandise</a><ul><li class="first"><a href="http://www.gaiastore.com/servlet/the-what%27s-new/Categories">What\'s New</a></li><li><a href="http://www.gaiastore.com/servlet/the-clothing/Categories">Clothing</a></li><li><a href="http://www.gaiastore.com/servlet/the-accessories/Categories">Accessories</a></li><li><a href="http://www.gaiastore.com/servlet/the-gaia-gear/Categories">Gaia Gear</a></li><li><a href="http://www.gaiastore.com/servlet/the-plushies-%26-toys/Categories">Plushies &amp; Toys</a></li><li><a href="http://www.gaiastore.com/servlet/the-stationery/Categories">Stationery</a></li><li><a href="http://www.gaiastore.com/servlet/the-great-deals/Categories">Great Deals</a></li><li><a href="http://www.gaiastore.com/servlet/the-Downloads/Categories">Downloads</a></li><li><a href="http://www.gaiastore.com/servlet/the-Gaia-Cash-Cards/Categories">Gaia Cash Cards</a></li><li><a href="http://www.gaiastore.com/servlet/the-zOMG%21/Categories">zOMG!</a></li><li><a href="/store/custommerchandise/">Customizable Stuff</a></li></ul></li><li><a href="/mobile">Mobile Downloads</a></li><li><a href="#" class="extended">Payment History</a><ul><li class="first"><a href="/redeem/history/">Gaia Cash Purchases</a></li><li><a href="/order/history/">Order History</a></li></ul></li></li></ul>';
	var Community='<li id="community_menu" class="standard_ext navHeading"><a class="header" href="/community">Community</a><ul><li class="first"><a href="/forum/" class="extended">Forums</a><ul><li class="first"><a href="/forum/myposts/">My Posts</a></li><li><a href="/forum/mytopics/">My Latest Topics</a></li><li><a href="/forum/subscription/">My Thread Subscriptions</a></li><li><a class="extended" href="/forum/">Forum Index</a><ul id="GM_Forums"><li class="first"><img class="ajax_loading" src="http://'+imgServer+'/images/template/dropdown/ajax-loader.gif"/></li></ul></li><li><a href="/info/index.php?mode=safety">Safety Tips</a></li></ul></li><li><a href="/guilds/" class="extended">Guilds</a><ul><li class="first"><a class="extended" href="/guilds/?gmode=myguilds">My Guilds</a><ul id="GM_Guilds"><li class="first"><img class="ajax_loading" src="http://'+imgServer+'/images/template/dropdown/ajax-loader.gif"/></li></ul></li><li><a href="/guilds/?gmode=create">Create</a></li><li><a href="/forum/registered-guilds/gaia-guilds-rules-faq/t.47199021/">FAQ</a></li></ul></li><li><a href="/clans" class="extended">Clans</a><ul><li class="first"><a href="/clans/my/">My Clan</a></li></ul></li><li><a href="/arena/" class="extended">Arenas</a><ul><li class="first"><a href="/arena/art/" class="extended">Art</a><ul><li class="first"><a href="/arena/art/painting-and-drawing/vote/">Painting &amp; Drawing</a></li><li><a href="/arena/art/photography/vote/">Photography</a></li><li><a href="/arena/art/comics/vote/">Comics</a></li></ul></li><li><a href="/arena/writing/" class="extended">Writing</a><ul><li class="first"><a href="/arena/writing/fiction/vote/">Fiction</a></li><li><a href="/arena/writing/non-fiction/vote/">Non-Fiction</a></li><li><a href="/arena/writing/poetry-and-lyrics/vote/">Poetry and Lyrics</a></li></ul></li><li><a href="/arena/gaia/homes/">Homes</a></li><li><a class="extended" href="/arena/gaia/avatar">Avatar</a><ul><li class="first"><a href="/arena/gaia/original-avatar/vote/">Original Avatar</a></li><li><a href="/arena/gaia/cosplay-avatar/vote/">Cosplay Avatar</a></li></ul></li><li><a href="/arena/contest/">Contests</a></li><li><a class="extended" href="/arena/entries/gaia/avatar/">Submit Entry</a><ul><li class="first"><a href="/arena/entries/art/">Art</a></li><li><a href="/arena/entries/writing/">Writing</a></li><li><a href="/arena/entries/gaia/avatar/">Avatar</a></li><li><a href="/arena/entries/gaia/homes/">Home</a></li></ul></li></ul></li><li><a href="/news-and-events/">News &amp; Events</a></li><li><a href="/gsearch">New Search</a></li><li><a href="/search/">Old Search</a></li><li><a href="/conventions">Conventions</a></li></ul></li>';
	var World='<li id="world_menu" class="standard navHeading"><a class="header" href="/world">World</a><ul><li class="first"><a href="#" class="extended">Storyline</a><ul><li class="first"><a href="/newsroom/?type=manga">Manga</a></li><li><a href="/newsroom/?type=weekly">Mini Comics</a></li><li><a href="/newsroom/">News Room</a></li></ul></li><li id="gaia_menuitem_towns"><a '+'+js+'+' href="/launch/towns" class="extended">Towns</a><ul><li class="first"><a href="/homes/">My Home</a></li></ul></li><li><a href="/cinema/movies/">Cinemas</a></li><li><a href="/cinema/vj/">Video Lounge</a></li><li><a href="#" class="extended">Sponsored Worlds</a><ul><li class="first"><a id="gaia_menuitem_mtv" target="_blank" '+'+js+'+' href="/launch/hollywood/">Virtual Hollywood</a></li><li><a target="_blank" '+'+js+'+' href="/launch/foreststage">Earth Day Forest Stage</a></li><li><a target="_blank" '+'+js+'+' href="/launch/secretschool/">Secret School</a></li><li><a target="_blank" '+'+js+'+' href="/launch/coke/">Polar Paradise</a></li></ul></li><li><a href="/downloads">Downloads</a></li><li><a class="extended" href="/labs">Gaia Labs</a><ul><li class="first"><a href="http://userscripts.org/users/62850/scripts">Greasemonkey Scripts</a></li><li><a href="http://absols-web-apps.info/apps/randomImage">Random Image Generator</a></li><li><a href="http://absols-web-apps.info/apps/randomLink">Random Link Generator</a></li><li><a href="http://absols-web-apps.info/apps/passgen">Password Generator</a></li></ul></li><li><a href="/blog">Gaia Blog</a></li><li><a href="/conventions">Conventions</a></li></ul>';
	var Games='<li id="games_menu" class="standard navHeading"><a class="header" href="/games">Games</a><ul><li id="gaia_menuitem_zomg" class="first"><a target="_blank" href="/launch/zomg" class="extended">zOMG!</a><ul><li class="first"><a target="_blank" href="/games/zomg/">zOMG! Microsite</a></li><li><a href="/gaia/shopping.php/?key=uhxrdnkgimmkhslj">Buy Power-Ups &amp; Gear!</a></li></ul></li><li id="gaia_menuitem_rally"><a target="_blank" '+'+js+'+' href="/launch/rally" class="extended">Rally</a><ul><li class="first"><a href="/gaia/shopping.php/?key=gxqxrbzixwydqakn">Buy Car Parts</a></li><li><a href="/auto/">Build a Car</a></li></ul></li><li id="gaia_menuitem_jigsaw"><a target="_blank" onclick="window.open(this.href,\'status=yes,scrollbars=no,menubar=no,location=no\',\'width=770,height=585\');return false;" href="/launch/gameshell?game=jigsaw">Jigsaw</a></li><li id="gaia_menuitem_fishing"><a target="_blank" href="/launch/fishing" class="extended">Fishing</a><ul><li class="first"><a href="#" onclick="return false;" class="extended">Select a Lake</a><ul><li id="gaia_menuitem_fishing_bassken" class="first"><a target="_blank" href="/launch/fishing?l=bassken">Bass\'ken Lake</a></li><li id="gaia_menuitem_fishing_gambino"><a target="_blank" href="/launch/fishing?l=gambino">Port of Gambino</a></li><li id="gaia_menuitem_fishing_durem"><a target="_blank" href="/launch/fishing?l=durem">Durem Reclamation Facility</a></li></ul></li><li><a href="/gaia/shopping.php/?key=alpltfbdnxgowsfn">Buy Bait &amp; Sell Fish</a></li></ul></li><li id="gaia_menuitem_slots"><a target="_blank" href="/launch/slots" class="extended">Slots</a><ul><li class="first"><a href="/gaia/store.php?id=14f247">Buy Tokens</a></li><li><a href="/gaia/shopping.php/?key=ndroctlqvprghqqy">Cash-in Winnings</a></li></ul></li><li id="gaia_menuitem_blackjack"><a target="_blank" onclick="window.open(this.href,\'status=yes,scrollbars=no,menubar=no,location=no\',\'width=640,height=580\');return false;"  href="/launch/blackjack" class="extended">Cards</a><ul><li class="first"><a href="/gaia/store.php?id=14f247">Buy Tokens</a></li><li><a href="/gaia/shopping.php/?key=ndroctlqvprghqqy">Cash-in Winnings</a></li></ul></li><li id="gaia_menuitem_wordbump"><a target="_blank" onclick="window.open(this.href,\'status=yes,scrollbars=no,menubar=no,location=no\',\'width=640,height=480\');return false;" href="/launch/wordbump">Wordbump</a></li><li id="gaia_menuitem_gameshell"><a target="_blank" onclick="window.open(this.href,\'status=yes,scrollbars=no,menubar=no,location=no\',\'width=770,height=585\');return false;" href="/launch/gameshell?game=gPinball">Pinball</a></li><li id="gaia_menuitem_elf"><a target="_blank"  onclick="window.open(this.href,\'status=yes,scrollbars=no,menubar=no,location=no\',\'width=770,height=585\');return false;" href="/launch/gameshell?game=electricLoveFaktori">Electric Love Faktori</a></li><li><a target="_blank" onclick="window.open(this.href,\'status=yes,scrollbars=no,menubar=no,location=no\',\'width=770,height=585\');return false;" href="/launch/gameshell?game=tiles">Tiles</a></li><li><a class="extended" href="/omgpop">OMGPOP</a><ul><li class="first"><a href="/omgpop/launch?game=pool">Pool</a></li><li><a href="/omgpop/launch?game=hoverkart">Hover Kart</a></li><li><a href="/omgpop/launch?game=drawmything">Draw My Thing</a></li><li><a href="/omgpop/launch?game=balloono">Balloono</a></li></ul></li><li><a class="extended" title="Aquarium Forum" href="/forum/f.393">Booty Grab</a><ul><li class="first"><a href="/forum/t.47289201">Lagginess Tips</a></li><li><a target="_blank" href="http://absols-web-apps.info/gtools/glowTime.php">Aquarium Analyzer</a></li><li><a href="http://absols-web-apps.info/gtools/fishSig.php?genSigCode=1">Aquarium Analyzer<br/>(Make a Signature)</a></li><li><a href="http://absols-web-apps.info/gtools/imgAnalyzer.php">Aquarium Analyzer<br/>(For Recycled Threads)</a></li><li><a href="http://absols-web-apps.info/gtools/glowHistory.php">Look Up A Past Glow</a></li><li><a href="http://absols-web-apps.info/gtools/fishreview.php?stats=true">Fish Stats</a></li><li><a href="http://absols-web-apps.info/gtools/tanklist.html">Aquarium List</a></li><li><a href="http://absols-web-apps.info/gtools/ttycity.html">Tanks to invite</a></li></ul><li><a href="/dumpsterdive">Dumpster Dive</a></li><li><a href="/lotto">Gold Lotto</a></li></li></ul></li>';
	var Tektek='<li id="tektek_menu" class="standard navHeading"><a class="header" href="http://www.tektek.org">Tektek</a><ul><li class="first"><a class="extended" href="http://www.tektek.org/gaia/items.php">Gaia Items</a><ul><li class="first"><a class="extended" href="http://www.tektek.org/gaia/rare_items/">Rare Items</a><ul><li class="first"><a href="http://www.tektek.org/gaia/rare_items/ancient">Ancient Chest</a></li><li><a href="http://www.tektek.org/gaia/rare_items/animalquackers">Animal Quackers</a></li><li><a href="http://www.tektek.org/gaia/rare_items/aquarium">Aquarium Overseer</a></li><li><a href="http://www.tektek.org/gaia/rare_items/azrael">Azrael\'s Trickbox</a></li><li><a href="http://www.tektek.org/gaia/rare_items/bitterfrost">Bitter Frost</a></li><li><a href="http://www.tektek.org/gaia/rare_items/bestfriendforever">Best Friend Forever</a></li><li><a href="http://www.tektek.org/gaia/rare_items/brown">Brown Giftbox</a></li><li><a href="http://www.tektek.org/gaia/rare_items/blue">Blue Giftbox</a></li><li><a href="http://www.tektek.org/gaia/rare_items/codealpha">Code Alpha</a></li><li><a href="http://www.tektek.org/gaia/rare_items/darkreflection">Dark Reflection</a></li><li><a href="http://www.tektek.org/gaia/rare_items/emeraldseed">Emerald Seed</a></li><li><a href="http://www.tektek.org/gaia/rare_items/famestar2000">FAMESTAR 2000</a></li><li><a href="http://www.tektek.org/gaia/rare_items/famestarhero">Famestar Hero</a></li><li><a href="http://www.tektek.org/gaia/rare_items/fishdrops">Fish Drops</a></li><li><a href="http://www.tektek.org/gaia/rare_items/fluff">Fluff Box</a></li><li><a href="http://www.tektek.org/gaia/rare_items/fortuneegg">Fortune Egg</a></li><li><a href="http://www.tektek.org/gaia/rare_items/geeboiturbo">Gee Boi Turbo</a></li><li><a href="http://www.tektek.org/gaia/rare_items/lexbox">LeXbox</a></li><li><a href="http://www.tektek.org/gaia/rare_items/lonelystar">Lonely Star</a></li><li><a href="http://www.tektek.org/gaia/rare_items/lovecharm">Love Charm</a></li><li><a href="http://www.tektek.org/gaia/rare_items/lunasincense">Luna\'s Incense</a></li><li><a href="http://www.tektek.org/gaia/rare_items/midsummerswirl">Midsummer Swirl</a></li><li><a href="http://www.tektek.org/gaia/rare_items/mysterymood">Mystery Mood</a></li><li><a href="http://www.tektek.org/gaia/rare_items/nightmare">Nightmare Box</a></li><li><a href="http://www.tektek.org/gaia/rare_items/perfecttragedy">Perfect Tragedy</a></li><li><a href="http://www.tektek.org/gaia/rare_items/pink">Pink Giftbox</a></li><li><a href="http://www.tektek.org/gaia/rare_items/poseidonslegacy">Poseidon\'s Legacy</a></li><li><a href="http://www.tektek.org/gaia/rare_items/repolamp">Repo Lamp</a></li><li><a href="http://www.tektek.org/gaia/rare_items/snowapple">Snow Apple</a></li><li><a href="http://www.tektek.org/gaia/rare_items/suspiciouspackage">Supicious Package</a></li><li><a href="http://www.tektek.org/gaia/rare_items/toxicdrop">Toxic Drop</a></li><li><a href="http://www.tektek.org/gaia/rare_items/wrathofgaia">Wrath of Gaia</a></li></ul></li><li><a href="http://www.tektek.org/gaia/list_active.php?show=rising">Rising</a></li><li><a href="http://www.tektek.org/gaia/list_active.php?show=falling">Falling</a></li><li><a class="extended" href="http://www.tektek.org/gaia/evolution">Evolving Items</a><ul><li class="first"><a href="http://www.tektek.org/gaia/evolution/show/all">All</a></li><li><a href="http://www.tektek.org/gaia/evolution/show/active">Active</li><li><a href="http://www.tektek.org/gaia/evolution/show/evolving_soon">May Evolve Soon</a></li><li><a href="http://www.tektek.org/gaia/evolution/show/finished">Finished</a></li></ul></li><li><a href="http://www.tektek.org/gaia/item_search.php?search=cash_shop">Cash Shop Items</a></li><li><a class="extended" href="http://www.tektek.org/gaia/aquarium/">Aquarium Items</a><ul><li class="first"><a href="http://www.tektek.org/gaia/aquarium/new">New</a></li><li><a href="http://www.tektek.org/gaia/aquarium/backgrounds">Backgrounds</a></li><li><a href="http://www.tektek.org/gaia/aquarium/decorations">Decorations</a></li><li><a href="http://www.tektek.org/gaia/aquarium/fish">Fish</a></li></ul><li><a class="extended" href="http://www.tektek.org/gaia/zomg/items/">zOMG Items</a><ul><li class="first"><a href="http://www.tektek.org/gaia/zomg/items/crafted_items">Crafted Items</a></li><li><a href="http://www.tektek.org/gaia/zomg/items/recipes">Recipes</a></li><li><a href="http://www.tektek.org/gaia/zomg/items/rings">Rings</a></li><li><a href="http://www.tektek.org/gaia/zomg/items/raw_materials">Raw Materials</a></li></ul></li><li class="oversized_ext"><a class="extended" href="http://www.tektek.org/gaia/collectables">Monthly Collectible Items</a><ul><li class="first"><a href="http://www.tektek.org/gaia/collectables/2003">2003</a></li><li><a href="http://www.tektek.org/gaia/collectables/2004">2004</a></li><li><a href="http://www.tektek.org/gaia/collectables/2005">2005</a></li><li><a href="http://www.tektek.org/gaia/collectables/2006">2006</a></li><li><a href="http://www.tektek.org/gaia/collectables/2007">2007</a></li><li><a href="http://www.tektek.org/gaia/collectables/2008">2008</a></li><li><a href="http://www.tektek.org/gaia/collectables/2009">2009</a></li><li><a href="http://www.tektek.org/gaia/collectables/2010">2010</a></li></ul></li><li><a href="/forum/t.9103857">GaiaOnline Thread</a></li></ul></li><li><a class="extended" href="http://www.tektek.org/dream/">Dream Avatar</a><ul><li class="first"><a href="http://www.tektek.org/dream/dream.php">Start</a></li><li><a href="http://www.tektek.org/dream/dream_free.php?avatar=1668351">Dream Free</a></li><li><a href="http://www.tektek.org/gaia/worth.php?environment">Inventory tektek</a></li><li><a href="http://www.tektek.org/avatars">Search Avatars</a></li><li><a href="http://www.tektek.org/contest/">Avatar Contest</a></li><li><a href="/forum/t.9671288/">GaiaOnline Thread</a></li></ul></li><li><a class="extended" href="http://www.tektek.org/profiles/">Gaia Profiles</a><ul><li class="first"><a class="extended" href="http://www.tektek.org/profiles/oldschool">Classic / Old School</a><ul><li class="first"><a href="http://www.tektek.org/profiles/oldschool/new">Newest</a></li><li><a href="http://www.tektek.org/profiles/oldschool/top">Top Rated</a></li><li><a href="http://www.tektek.org/profiles/oldschool/category">Categories</a></li><li><a href="http://www.tektek.org/profiles/oldschool/upcoming">Upcomming</a></li><li><a href="http://www.tektek.org/profiles/oldschool/pending">Pending</a></li></ul><li><a class="extended" href="http://www.tektek.org/profiles/newschool">Current / New Version</a><ul><li class="first"><a href="http://www.tektek.org/profiles/newschool/new">Newest</a></li><li><a href="http://www.tektek.org/profiles/newschool/top">Top Rated</a></li><li><a href="http://www.tektek.org/profiles/newschool/category">Categories</a></li><li><a href="http://www.tektek.org/profiles/newschool/upcoming">Upcomming</a></li><li><a href="http://www.tektek.org/profiles/newschool/pending">Pending</a></li></ul></li><li><a href="http://www.tektek.org/profiles/multimedia">YouTube Video</a></li></li></ul></li><li><a class="extended" href="http://www.tektek.org/gaia_toolbar/">Gaia Toolbar</a><ul><li class="first"><a href="/forum/t.8092647/">GaiaOnline Thread</a></li><li><a href="http://www.tektek.org/gaia_toolbar/changelog">View All Changes</a></li></ul></li><li><a class="extended" href="http://www.tektek.org/auto/">AutoTek</a><ul><li class="first"><a href="http://www.tektek.org/gaia/list_auto.php">Auto Parts List</a></li><li><a href="/forum/t.28621813">GaiaOnline Thread</a></li></ul></li><li><a href="http://www.tektek.org/questbar/">Questbar</a></li><li><a href="http://www.tektek.org/color/">Gradient Text</a></li><li><a href="http://www.tektek.org/gaia/worth.php">Calculate Account Worth</a></li><li><a href="http://www.tektek.org/gaia/price/compare/">Compare Item Values</a></li><li><a href="http://www.tektek.org/account/signup.vex">Random Signature</a></li></ul></li>';
	if(getId('color_menu')){
		js="document.getElementById(document.getElementById('color_switcher_wrap').className).removeAttribute('class');(new YAHOO.gaia.widgets.MegaMenu()).handleMouseClick('click',this);this.className='selected';return false;";
		Color='<li id="color_menu" class="standard navHeading"><a class="header" onclick="return false" href="#"><img src="http://'+imgServer+'/images/gaia_global/body/arrows/ic_hyperlink_arrow_15x15_down.png"/></a><ul><li class="first"><a href="#" onclick="'+js+'" id="green"><span class="panel_img"></span>Green</a></li><li><a onclick="'+js+'" href="#" id="pink"><span class="panel_img"></span>Pink</a></li><li><a href="#" onclick="'+js+'" id="yellow"><span class="panel_img"></span>Yellow</a></li><li><a href="#" onclick="'+js+'" id="red"><span class="panel_img"></span>Red</a></li><li><a href="#" onclick="'+js+'" id="blue"><span class="panel_img"></span>Blue</a></li><li><a href="#" onclick="'+js+'" id="purple"><span class="panel_img"></span>Purple</a></li><li><a href="#" onclick="'+js+'" id="grey"><span class="panel_img"></span>Gray</a></li><li><a href="#" onclick="'+js+'" id="classic"><span class="panel_img"></span>Classic</a></li></ul></li>';
	}
	var QuickLinks='<li id="quick_links" class="standard_ext navHeading"><a href="#" onclick="return false;" class="header">Quick Links</a><ul><li class="first"><a onclick="return false" href="#edit_links" id="editCustomMenu" title="Open/Close Menu Editor">Customize</a></li><li class="quickLink"><img class="ajax_loading" src="http://'+imgServer+'/images/template/dropdown/ajax-loader.gif"/></li></ul></li>';
	var Search='<li id="gm_search" class="standard navHeading"><a class="header" title="Click to lock open" onclick="this.blur();if(this.parentNode.className.indexOf(\'locked\')!=-1){this.parentNode.className=this.parentNode.className.replace(\' locked\',\'\');this.title=\'Click to lock open\';}else{this.parentNode.className+=\' locked\';this.title=\'Click to unlock\';}return false;" href="#">Search</a><ul><li class="first"><form id="GM_Search_Form" onsubmit="return false"><select name="type" id="GM_Search_Type" onfocus="this.parentNode.parentNode.style.height=\'370px\';" onblur="this.parentNode.parentNode.style.height=\'\';"><option class="one" value="undefined">Search...</option><option class="one" value="friend">For Friends</option><option class="one" value="google.gaia">Entire Site</option><optgroup label="Community"><option class="two" value="">Entire Community</option><option class="two" value="users.username">Users by Username</option><option class="two" value="users.interest">Users by Interest</option><option class="two" value="topics.tag">Forums</option><option class="three" value="topics.user">Topics by User</option><option class="three" value="posts.user">Post by User</option><option class="two" value="guilds.tag">Guilds</option></optgroup><optgroup label="Marketplace"><option class="two" value="market">Using the Marketplace</option><option class="two" value="tektek">Using TekTek.org</option></optgroup><optgroup label="Arenas"><option class="two" value="user">Submissions by user</option><option class="two" value="username">Entries by username</option><option class="two" value="all">All Categories</option><option class="two" value="8">Homes</option><option class="two" value="avatar">Avatar</option><option class="three" value="7">Original</option><option class="three" value="27">Cosplay</option><option class="two" value="picture">Art</option><option class="three" value="1">Comics</option><option class="three" value="2">Painting and Drawing</option><option class="three" value="3">Photography</option><option class="two" value="text">Writing</option><option class="three" value="4">Fiction</option><option class="three" value="5">Non-Fiction</option><option class="three" value="6">Poetry and Lyrics</option><option class="three" value="32">High School Flashback</option></optgroup></select><input name="text" id="GM_Search_Text" value="Gaia Search" type="text" name="val" onfocus="if(this.value==\'Gaia Search\'){this.value=\'\';}" onblur="if(this.value==\'\'){this.value=\'Gaia Search\';}"/><input id="GM_Search_Gbtn" type="submit"/></form><div style="text-align:left;width:45%;float:left;padding:4px;">Can\'t find a link? Try this &darr;</div><div style="text-align:right;width:45%;float:right;"><a href="/gsearch">Altnerative Search Page</a></div><form id="linkFinderForm" action="javascript:var LS=document.getElementById(\'GM_linksSearch\');if(LS.value){void(document.location.href=LS.value);}else{var LF=document.getElementById(\'GM_linkFinder\');LF.value=\'Type link name here\';LF.select();}"><input type="text" id="GM_linkFinder" value="Type link name here" onfocus="if(this.value==\'Type link name here\'){this.value=\'\'}" onblur="if(this.value==\'\'){this.value=\'Type link name here\'}"/><input id="GM_SearchGo" value="GO" type="submit"/><br/><select id="GM_linksSearch" ondblclick="this.parentNode.submit();" size="15"></select><input onclick="this.select();" id="GM_searchMenuStatusBar" style="border:none;background:none;width:100%;" readonly="readonly"/></form></li></ul></li>';
	nav.innerHTML=Home+MyGaia+Shop+Community+World+Games+Tektek+Color+QuickLinks+Search;// please feel free to reorder these (do not delete qucklinks)
	if(selectedTab){
		getId(selectedTab).className+=' selected';
	}
	if(Color){
		getId(getId('color_switcher_wrap').className).className='selected';
	}
	unsafeWindow.YAHOO.QL=false;
	unsafeWindow.YAHOO.GF=false;
	unsafeWindow.YAHOO.FG=false;
	unsafeWindow.YAHOO.SF=false;
	getId('quick_links').addEventListener('mouseover',getQuickLinks,false);
	getId('GM_Forums').parentNode.childNodes[0].addEventListener('mouseover',getForums,false);
	getId('GM_Guilds').parentNode.childNodes[0].addEventListener('mouseover',getMyFriendsAndGuilds,false);
	getId('GM_Friends').parentNode.childNodes[0].addEventListener('mouseover',getMyFriendsAndGuilds,false);
	getId('GM_suggFrnd').parentNode.childNodes[0].addEventListener('mouseover',getSuggFrnd,false);
	getId('GM_Search_Form').addEventListener('submit', function (e) {
		GM_Submit_Search(getId('GM_Search_Type'),getId('GM_Search_Text').value);
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
	getId('GM_Search_Type').selectedIndex=GM_getValue('searchCatigory',0);
}
else if(getId('gaia_menu_bar')){
	getId('gaia_menu_bar').setAttribute('style','background-color:#5A5163;border-top:1px solid black;border-bottom:1px solid black;background-image:none;');
}
if(FF){
	try{
		var FC=document.getElementsByClassName('online-friends')[0].getElementsByClassName('count')[0].textContent;
		var MC=document.getElementsByClassName('messages')[0].getElementsByClassName('count')[0].textContent;
		var AC=document.getElementsByClassName('goldMessage')[0];
		var newStuff=document.createElement('div');
		newStuff.className="hud-stats hud hud-sprite GM_innerContent";
		newStuff.setAttribute('style','position: absolute; top: 46px; right: 0px; z-index: 1;');
		newStuff.id="GM_innerContent1";
		newStuff.innerHTML='<ul class="hud-item-list">'+
			'<li class="hud-item" id="divHeaderFriends"><a id="headerFriends" href="#" onclick="this.blur();return false" class="hud-sprite padded-icon friend-icon">'+FC+'</a></li>'+
			'<li class="hud-item hud-spacer hud-group-spacer">&nbsp;</li>'+
			'<li class="hud-item" id="divHeaderMail"><a id="headerMail" href="/profile/privmsg.php" class="hud-sprite padded-icon mail-icon">'+MC+'</a></li>'+
		'</ul><div class="end-cap">&nbsp;</div>';
		AC.parentNode.insertBefore(newStuff,AC);
		getId('divHeaderFriends').addEventListener('click',genFriends,false);
		if(getId('globaloutfits_tab')){
			newStuff=document.createElement('div');
			newStuff.setAttribute('style','position:absolute;top:74px;right:0px;z-index:0;');
			newStuff.id="GM_innerContent2";
			newStuff.className="hud-stats hud hud-sprite GM_innerContent";
			newStuff.innerHTML='<ul class="hud-item-list">'+
				'<li class="hud-item" id="divHeaderOutfits"><a id="headerOutfits" onclick="this.blur();YAHOO.gaia.app.outfits.toggleDisplay();return false;" href="#Change_Outfit" class="hud-sprite padded-icon outfit-icon">Outfits</a></li>'+
			'</ul><div class="end-cap">&nbsp;</div>';
			AC.parentNode.insertBefore(newStuff,AC);
			getId('divHeaderOutfits').addEventListener('click',function(){
				sendEvent(getId('globaloutfits_tab'),'click');
			},false);
		}
		FF.className='footer collapse-action floating-footer';
		try{
			getId('editCustomMenu').addEventListener('click',editLinks,false);
		}
		catch(e){}
		if(GM_getValue('STFU',false)===true){
			GM_deleteValue('STFU');
		}
	}
	catch(e){}
}
else if(getId('newmenu')){
	getId('editCustomMenu').setAttribute('onclick',"alert('Footer Must be enabled for this to work');return false;");
	if(GM_getValue('STFU',false)===false){
		var div=document.createElement('div');
		div.setAttribute('style','z-index:452;position:fixed;bottom:0px;left:0px;width:475px;height:25px;color:white;background-color:black;-moz-border-radius-topright:5px;padding-top:3px;');
		div.innerHTML='The footer must be <a href="/account/preferences#preferences-footershow-yes">enabled</a> to This script\'s full power.<span style="float:right;"><a id="GM-footer-notice" style="border:1px solid white;margin-right:3px;-moz-border-radius:5px" onclick="this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);return false">Close</a><a id="The_STFU_link" style="border:1px solid white;margin-right:3px;-moz-border-radius:5px" href="#" onclick="return false;">Close Perminatally</a></span>';
		document.body.appendChild(div);
		getId('The_STFU_link').addEventListener('click',function(){
			if(confirm('Are you sure you do not want to see this message in the future?')===true){
				GM_setValue('STFU',true);
				sendEvent(getId('GM-footer-notice'),'click');
				alert('If you enable the footer the message will start appearing again.\nIf you did not know everything in the footer is moved into the header and the footer is removed.');
			}
		},false);
	}
}
/* Tease people who want the main RIG item */
var ele=getId('lost_chapter');
if(ele&&Math.random()>0.5){
	GM_addStyle('#neon_link{-moz-transition-property:top,left;-moz-transition-duration:1.5s;-moz-transition-delay:'+(Math.random()*2.5+2.5)+'s;}');
	ele.title='Nevermore the Raven: I know you want me.';
	ele.href='/marketplace/itemdetail/66159';
	ele.setAttribute('style','top:-4px;left:200px;');
}