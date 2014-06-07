// ==UserScript==
// @name           Un-facebook gaia
// @description    Puts the facebook-like footer's parts in the header and hides the footer.(FOOTER MUST BE ENABLED)
// @include        http://www.gaiaonline.com/*
// @include        http://avatarsave.gaiaonline.com/*
// @require        http://userscripts.org/scripts/source/57622.user.js
// @version        2.9.7
// @updateURL      https://userscripts.org/scripts/source/57383.meta.js
// @downloadURL    https://userscripts.org/scripts/source/57383.user.js
// ==/UserScript==
function getId(id){
	return document.getElementById(id);
}
function editLinks(){
	clickEle(getId('get-quick-link').getElementsByClassName('icon')[0]);
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
function getQuickLinks(){
	if(unsafeWindow.YAHOO.QL===false){
		unsafeWindow.YAHOO.QL=true;
		var ele=getId('linksHolder');
		if(!ele){
			var ele=getId('quick_links').getElementsByTagName('ul')[0];
		}
		GM_xmlhttpRequest({
			method: "GET",
			url: 'http://www.gaiaonline.com/gapi/rest/gfooter/?method=getquicklinks',
			onload: function(r){
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
			}
		});
	}
}
function clickEle(ele){
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent("click", true, true);
	ele.dispatchEvent(evt);
}
function mouseEle(ele){
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent("mousedown", true, true);
	ele.dispatchEvent(evt);
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent("mouseup", true, true);
	ele.dispatchEvent(evt);
}
function insertAjaxList(toEle,fromEle){
	toEle.innerHTML=fromEle.innerHTML;
}
function genFriends(){//Very messy code nested event listeners in an event litser
	var friends=document.getElementsByClassName('online-friends')[0].getElementsByTagName('dd')[0];	
	createDivPopup('<dd>'+friends.innerHTML.replace('id="friend-list-container"','id="friend-list-container2"')+'<li class="last"></li></dd>','#GM_divPopupContentHolder dd {width:242px;margin:auto;}#GM_divPopupContentHolder h4{color:black;background-color:#8CB6D6;text-align:center;-moz-border-radius-topleft:10px;-moz-border-radius-topright:10px;}#GM_divPopupContentHolder .subhead{background-color:lightblue;text-align:center;}#GM_divPopupContentHolder h4 a{text-decoration:none;color:black}#GM_divPopupContentHolder li {list-style: none;padding:4px 8px;border-top:1px solid;background-color:#D9F0FF;border-left}#GM_divPopupContentHolder dd img{margin-top:2px;float:left;height:24px;width:24px;border:1px black solid;margin-right:10px}#GM_divPopupContentHolder li.last{-moz-border-radius-bottomleft:10px;-moz-border-radius-bottomright:10px;}');
	var ele=getId('GM_divPopupContentHolder').getElementsByTagName('span')[0];
	ele.innerHTML='<a href="http://www.gaiaonline.com/profile/friendlist.php?list=friend&status=online">'+ele.innerHTML+'</a>';
	var img=getId('GM_divPopupContentHolder').getElementsByTagName('img');
	for (var i=0;i<img.length;i++){
		img[i].style.cursor='pointer';
		img[i].id=img[i].title;
		img[i].title="Click for Links";
		img[i].addEventListener('click',function(e){
			clickEle(getId('GM_closeDivPopup'));
			createDivPopup('<div id="GM_friendLinks"><h4>'+this.alt+'</h4><div class="subhead"><a id="GM_divNavBack" href="#back">Go back to friends list</a></div><li><a href="/profiles/'+this.id+'/">Profile</a><br/><a href="/profiles/?mode=comments&u='+this.id+'">Comments</a><br/><a href="/forum/myposts/'+this.id+'">Forum Posts</a><br/><a href="/forum/mytopics/'+this.id+'">Forum Topics</a><br/><a href="/journal/journal.php?mode=view&u='+this.id+'">Journal</a><br/><a href="/profiles/?mode=friends&u='+this.id+'">View Friends</a><br/><br/><a target="_blank" href="/launch/towns?&house_location='+this.id+'">Visit House</a><br/><a target="_blank" href="/images/Gaia_Flash/auto/carsig.swf?gsiUrl=www&userid='+this.id+'">View Car</a><br/><a target="_blank" href="'+this.src.replace('48x48.gif','flip.png')+'">View Avatar</a><br/><a target="_blank" href="/landing/flashaquarium/?userid='+this.id+'">View Aquarium</a><br/><br/><a href="/profile/privmsg.php?mode=post&u='+this.id+'">Send PM</a><br/><a href="/profiles/?mode=addcomment&u='+this.id+'">Send Comment</a><br/><a href="/textmessage?recipient_id='+this.id+'">Send Text</a><br/><a href="javascript:YAHOO.gaia.widgets.getIM('+this.id+');">Send IM</a><br/><br/><a href="/gaia/bank.php?mode=trade&uid='+this.id+'">Trade</a><br/><a id="buyGift" title="Buy a gift for '+this.alt+'" href="javascript:YAHOO.gaia.app.CashShop.SenderApplication.show({store: 18, origin: \'pulldown\', target: { user_id: '+this.id+', username: \''+this.alt+'\'} });">Buy a Gift</a><br/><a href="/marketplace/userstore/'+this.id+'">View Store</a><br/><a title="View '+this.alt+'\'s Item" href="javascript:YAHOO.gaia.apps.ei.getItemList('+this.id+');">View Equipped List</a><br/><br/><a href="/profile/friendlist.php?hook='+this.id+'">Ignore</a></li><li class="last"></li></div>','#GM_divPopupContentHolder h4{background-color:#8CB6D6;-moz-border-radius-topleft:10px;-moz-border-radius-topright:10px;padding-left: 10px; padding-right: 10px;text-align:center;}#GM_divPopupContentHolder .subhead{background-color:lightblue;padding-left: 10px; padding-right: 10px;text-align:center}#GM_divPopupContentHolder li a{padding-left: 10px; padding-right: 10px;}#GM_divPopupContentHolder li {list-style: none;background-color:#D9F0FF;}#GM_divPopupContentHolder li.last{-moz-border-radius-bottomleft:10px;-moz-border-radius-bottomright:10px;height:10px;}');
			getId('GM_divNavBack').addEventListener('click',function(e){
				setTimeout(genFriends,0);
				clickEle(getId('GM_closeDivPopup'));
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
						clickEle(getId('GM_closeDivPopup'));
					}
				},false);
			}
		},false);
	}
}
var FF=getId('footer');
if(FF){
	//footer icons to header icons
	var FC=document.getElementsByClassName('online-friends')[0].getElementsByClassName('count')[0].textContent;
	var MC=document.getElementsByClassName('messages')[0].getElementsByClassName('count')[0].textContent;
	var AC=document.getElementsByClassName('accountCurrency')[0].getElementsByTagName('ul')[0]
	AC.setAttribute('style','position: relative; z-index: 2;');
	var newStuff=document.createElement('ul')
	newStuff.setAttribute('style','position: absolute; top: 28px; right: 0px; z-index: 1;');
	newStuff.innerHTML='<li class="currency_edge"></li><li id="GM_innerContent1" class="GM_innerContent">'+
	'<a onclick="return false" href="#more_friendly_info"><div id="divHeaderFriends"><div id="headerFriends" class="icon"></div><div class="count">'+FC+'</div></div></a>'+
	'<a href="/profile/privmsg.php"><div id="divHeaderMail"><div id="headerMail" class="icon"></div><div class="count">'+MC+'</div></div></a>'+
	'<a href="/gim" target="_blank"><div id="divHeaderGim"><div id="headerGim" class="icon"></div><div class="count">(0)</div></div></a>'+
	'</li><li class="ending_edge"></li>';
	AC.parentNode.appendChild(newStuff);
	if(getId('globaloutfits_tab')){
		var newStuff=document.createElement('ul')
		newStuff.setAttribute('style','position: absolute; top: 55px; right: 0px; z-index: 0;');
		newStuff.innerHTML='<li class="currency_edge"></li><li id="GM_innerContent2" class="GM_innerContent">'+
		'<a onclick="YAHOO.gaia.app.outfits.toggleDisplay();return false;" href="#Change_Outfit"><div id="divHeaderOutfits"><div id="headerOutfits" class="icon"></div><div class="count">Outfits</div></div></a>'+
		'</li><li class="ending_edge"></li>';
		AC.parentNode.appendChild(newStuff);
		getId('divHeaderOutfits').parentNode.addEventListener('click',function(){
			clickEle(getId('globaloutfits_tab'));
		},false);
	}
	GM_addStyle('#add-quick-link-header,#edit-quick-links-header{margin:0px!important}');
	var newEle=document.createElement('li');
	newEle.className='standard_ext';
	newEle.id='quick_links';
	var nav=getId('nav');
	if(getId('home_menu').getAttribute('class').indexOf('standard')==-1){
		newEle.setAttribute('onmouseover',"this.className='megamenu-standard-menu panel-open'");
		newEle.setAttribute('onmouseout',"this.className='megamenu-standard-menu'");
		newEle.style.width='7em';
		newEle.className='megamenu-standard-menu';
		newEle.innerHTML=''+
			'<a href="http://userscripts.org/scripts/show/57383" class="megamenu-section-trigger">'+
				'<span class="lt_selector"></span>Quick Links<span class="rt_selector"></span>'+
			'</a>'+
			'<div class="main_panel_container">'+
			   '<div class="main_panel">'+
				'<div class="panel-left"><div class="panel-title">Quick Links</div></div>'+
				'<div class="panel-right"><div class="panel-title"></div></div>'+
				'<div style="font-size:13px;line-height:18px;padding-left:10px;">'+
					'<a onclick="return false" href="#edit_links" id="editCustomMenu" title="Open/Close Menu Editor">Customize</a>'+
					'<span id="linksHolder" class="panel_links"></span>'+
				'</div>'+
			   '</div>'+
		   '<div class="panel_bottom"></div>'+
		'</div>';
		var ms=getId('menu_search');
		nav.insertBefore(newEle,ms);
		var newEle=document.createElement('li');
		newEle.className='megamenu-divider';
		nav.insertBefore(newEle,ms);
	}
	else{
		newEle.innerHTML='<a href="http://userscripts.org/scripts/show/57383" class="header">Quick Links</a><ul><li class="first"><a onclick="return false" href="#edit_links" id="editCustomMenu" title="Open/Close Menu Editor">Customize</a></li></ul>';
		if(!getId('gm_search')){
			nav.appendChild(newEle);
		}
		else{
			nav.insertBefore(newEle,getId('gm_search'));
			if(GM_getValue('ftime',true)===true){
				alert('You appear to also be using the Gaia Menu fix (or you are using the search bar/tab thing)\nYou may be interested in trying \'GaiaOnline: Ultimate Navigation Fix\'\nIt is all previously mentioned scripts combined into one convenient script.\nCheck your tab bar after you click \'OK\'.');
				GM_openInTab('http://userscripts.org/scripts/show/79306');
				GM_setValue('ftime',false);
			}
		}
	}
	FF.className='footer collapse-action floating-footer';
	GM_addStyle('#footer dd.quick-links-content{left: '+(document.body.offsetWidth/2-121)+'px; position: fixed; border-bottom: 1px solid black;z-index:9002;}#footer{z-index:9002}.footer dt,#footer-collapse-trigger,#footer .quick-links .close,#footer #plus {display:none!important}');
	getId('editCustomMenu').addEventListener('click',editLinks,false);
	getId('quick_links').addEventListener('mouseover',getQuickLinks,false);
	unsafeWindow.YAHOO.QL=false;
	getId('divHeaderFriends').parentNode.addEventListener('click',genFriends,false)
	getId('friend-list-container').addEventListener('DOMSubtreeModified',function(e){
		if(getId('friend-list-container2')){
			insertAjaxList(getId('friend-list-container2'),getId('friend-list-container'));
			var img=getId('GM_divPopupContentHolder').getElementsByTagName('img');
			for (var i=0;i<img.length;i++){
				img[i].style.cursor='pointer';
				img[i].id=img[i].title;
				img[i].title="Click for Links";
				img[i].addEventListener('click',function(e){
					clickEle(getId('GM_closeDivPopup'));
					createDivPopup('<div id="GM_friendLinks"><h4>'+this.alt+'</h4><div class="subhead"><a id="GM_divNavBack" href="#back">Go back to friends list</a></div><li><a href="/profiles/'+this.id+'/">Profile</a><br/><a href="/profiles/?mode=comments&u='+this.id+'">Comments</a><br/><a href="/forum/myposts/'+this.id+'">Forum Posts</a><br/><a href="/forum/mytopics/'+this.id+'">Forum Topics</a><br/><a href="/journal/journal.php?mode=view&u='+this.id+'">Journal</a><br/><a href="/profiles/?mode=friends&u='+this.id+'">View Friends</a><br/><br/><a target="_blank" href="/launch/towns?&house_location='+this.id+'">Visit House</a><br/><a target="_blank" href="/images/Gaia_Flash/auto/carsig.swf?gsiUrl=www&userid='+this.id+'">View Car</a><br/><a target="_blank" href="'+this.src.replace('48x48.gif','flip.png')+'">View Avatar</a><br/><a target="_blank" href="/landing/flashaquarium/?userid='+this.id+'">View Aquarium</a><br/><br/><a href="/profile/privmsg.php?mode=post&u='+this.id+'">Send PM</a><br/><a href="/profiles/?mode=addcomment&u='+this.id+'">Send Comment</a><br/><a href="/textmessage?recipient_id='+this.id+'">Send Text</a><br/><a href="javascript:YAHOO.gaia.widgets.getIM('+this.id+');">Send IM</a><br/><br/><a href="/gaia/bank.php?mode=trade&uid='+this.id+'">Trade</a><br/><a id="buyGift" title="Buy a gift for '+this.alt+'" href="javascript:YAHOO.gaia.app.CashShop.SenderApplication.show({store: 18, origin: \'pulldown\', target: { user_id: '+this.id+', username: \''+this.alt+'\'} });">Buy a Gift</a><br/><a href="/marketplace/userstore/'+this.id+'">View Store</a><br/><a title="View '+this.alt+'\'s Item" href="javascript:YAHOO.gaia.apps.ei.getItemList('+this.id+');">View Equipped List</a><br/><br/><a href="/profile/friendlist.php?hook='+this.id+'">Ignore</a></li><li class="last"></li></div>','#GM_divPopupContentHolder h4{background-color:#8CB6D6;-moz-border-radius-topleft:10px;-moz-border-radius-topright:10px;padding-left: 10px; padding-right: 10px;text-align:center;}#GM_divPopupContentHolder .subhead{background-color:lightblue;padding-left: 10px; padding-right: 10px;text-align:center}#GM_divPopupContentHolder li a{padding-left: 10px; padding-right: 10px;}#GM_divPopupContentHolder li {list-style: none;background-color:#D9F0FF;}#GM_divPopupContentHolder li.last{-moz-border-radius-bottomleft:10px;-moz-border-radius-bottomright:10px;height:10px;}');
					getId('GM_divNavBack').addEventListener('click',function(e){setTimeout(genFriends,0);clickEle(getId('GM_closeDivPopup'));},false)
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
								clickEle(getId('GM_closeDivPopup'));
							}
						},false);
					}
				},false);
			}
		}
	},false);
	var dhf=getId('divHeaderFriends')
	dhf.addEventListener('mouseover',function(e){
		if(document.getElementsByClassName('online-friends')[0].getElementsByTagName('a')[0].parentNode.parentNode.className=='inactive'){
			clickEle(document.getElementsByClassName('online-friends')[0].getElementsByTagName('a')[0]);
		}
	},false);
	dhf.addEventListener('click',function(e){
		if(document.getElementsByClassName('online-friends')[0].getElementsByTagName('a')[0].parentNode.parentNode.className=='inactive'){
			clickEle(document.getElementsByClassName('online-friends')[0].getElementsByTagName('a')[0]);
		}
	},false);
	//css code
	GM_addStyle(<><![CDATA[
		.GM_innerContent{
			background-image:url('http://s.cdn.gaiaonline.com/images/gaia_global/gaia_header/new_header/header_vitals_PNG24.png');
			background-position:-125px -20px;
			height:32px;
		}
		.red .GM_innerContent{
			background-image:url('http://s.cdn.gaiaonline.com/images/gaia_global/gaia_header/new_header/header_vitals_red_PNG24.png');
			background-position:-125px -20px;
			height:32px;
		}
		.green .GM_innerContent{
			background-image:url('http://s.cdn.gaiaonline.com/images/gaia_global/gaia_header/new_header/header_vitals_green_PNG24.png');
			background-position:-125px -20px;
			height:32px;
		}
		.pink .GM_innerContent{
			background-image:url('http://s.cdn.gaiaonline.com/images/gaia_global/gaia_header/new_header/header_vitals_pink_PNG24.png');
			background-position:-125px -20px;
			height:32px;
		}
		.grey .GM_innerContent{
			background-image:url('http://s.cdn.gaiaonline.com/images/gaia_global/gaia_header/new_header/header_vitals_grey_PNG24.png');
			background-position:-125px -20px;
			height:32px;
		}
		.yellow .GM_innerContent{
			background-image:url('http://s.cdn.gaiaonline.com/images/gaia_global/gaia_header/new_header/header_vitals_yellow_PNG24.png');
			background-position:-125px -20px;
			height:32px;
		}
		.purple .GM_innerContent{
			background-image:url('http://s.cdn.gaiaonline.com/images/gaia_global/gaia_header/new_header/header_vitals_purple_PNG24.png');
			background-position:-125px -20px;
			height:32px;
		}
		div#linksHolder *:hover {
			background-color: #E7dfde !important;
		}
		.GM_innerContent a{
			text-decoration:none;
		}
		#GM_innerContent1{
			width:180px;
			max-width:180px !important;
		}
		#GM_innerContent2{
			width:90px;
		}
		#GM_innerContent2 .count{
			left: -47px;
		}
		#GM_innerContent2 a{
			text-decoration: none;
		}
		#GM_innerContent2 a{
			float:right;
		}
		.GM_innerContent .icon{
			background-image:url('data:image/png;base64,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');
			width:30px;
			height:30px;
			top:-1px;
			position:relative;
			float:none;
		}
		.GM_innerContent #headerOutfits.icon{
			background-image:url('data:image/png;base64,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');
			width:20px;
			height:30px;
			top:0px;
			position:relative;
			background-position:0px 0px;
		}
		.GM_innerContent .count{
			width:32px;
			position:relative;
			top:-25px;
			left:30px;
			color:white;
		}
		#headerFriends{
			background-position:-28px -1px;
		}
		#headerMail{
			background-position:-88px -5px;
		}
		#headerGim{
			background-position:-260px -2px;
		}
		#divHeaderFriends{
			position:absolute;
			width:62px;
			height:30px;
		}
		#divHeaderMail{
			position:absolute;
			width:62px;
			right:65px;
			height:30px;
		}
		#divHeaderGim{
			position:absolute;
			width:62px;
			right:4px;
			height:30px;
		}
		#gaia_header .header_content .accountCurrency .bgAlpha .refill,#gaia_header .header_content .accountCurrency .bgAlpha .needMoreCash{
			min-width: 94px;
		}
		#gaia_header .header_content .userName{
			z-index:1;
		}
		#gaia_header .header_content #dailyReward{
			left:665px;
		}
		#gaia_header .header_content #treasureChest{
			left:850px;
		}
		div#footer.footer{
			z-index:9002;
			display:none;
		}
		ul#friend-list-container2.friends-list{
			margin:0px;
		}
	]]></>);
}
else if(getId('newmenu')){
	var div=document.createElement('div');
	div.setAttribute('style','position: fixed; bottom: 0px; left: 0px; width: 320px; height: 25px;color:white;background-color:black;-moz-border-radius-topright:5px;padding-top:3px');
	div.innerHTML='The footer must be enabled to un-facebook gaia.<a style="float:right;border:1px solid white;margin-right:3px;-moz-border-radius:5px" onclick="this.parentNode.parentNode.removeChild(this.parentNode);return false">Close</a>';
	document.body.appendChild(div);
}