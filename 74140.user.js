// ==UserScript==
// @name        facebook extention
// @namespace   pjmtheman
// @include     http://www.facebook.com/*
// @include		http://facebook.com/*
// @include		http://apps.facebook.com/*
// @include		http://fb-1.farmville.com/flash.php*
// ==/UserScript==

window.addEventListener('load', functionMain, false);
window.addEventListener('load', functionCss, true);

//-----VARIABLES------
adres = window.location.pathname;
get = window.location.search;
href = window.location.href;

abbr = new Array();
abbr['fv'] = 'Farmville';
abbr['cw'] = 'Cafe World';
abbr['fiv'] = 'Fish Ville';
abbr['pv'] = 'Pet Ville';
abbr['mw'] = 'Mafia Wars';
abbr['zw'] = 'Zoo World';
abbr['wi'] = 'School of Wizardry';

app = new Array();
app['fv'] 	= '102452128776';
app['cw'] 	= '101539264719';
app['fiv'] 	= '151044809337';
app['pv'] 	= '163576248142';
app['mw'] 	= '10979261223';
app['zw'] 	= '167746316127';
app['wi'] 	= '4014809927';
for (i in app) {
	id = app[i];
	app[i] = new Array();
	app[i]['content'] = 'app_content_'+id;
	app[i]['app'] =  'app'+id;
	app[i]['aid'] = 'aid_'+id;
}

bc = new Array();
bc['cw'] 	= '217700022703'
bc['ft'] 	= '243620032269'
bc['fv'] 	= '175804218660'
bc['fiv']	= '401534655093'
bc['fw'] 	= '244393673291'
bc['ha'] 	= '281461561048'
bc['hi'] 	= '102712163103550'
bc['hp'] 	= '409950370190'
bc['mw'] 	= '198656634540'
bc['ps'] 	= '245506374012'
bc['pv'] 	= '231668863757'
bc['rc'] 	= '246544813402'
bc['sl'] 	= '452482345606'
bc['ti'] 	= '114602315217428'
bc['yv'] 	= '199273991591'
bc['zw'] 	= '286802837624'

for (i in bc) {
	id = bc[i];
	bc[i] = new Array();
	bc[i]['content'] = 'app_content_'+id;
	bc[i]['app'] =  'app'+id;
	bc[i]['aid'] = 'aid_'+id;
}


function functionCss() {
//CSS-startbalk
GM_addStyle("\
	.fbx #pageHead{width:100%;left:0}\
	#pageHead,#blueBar{position:fixed;top:0px;width:100%;height:31px;z-index:100}\
	#pageLogo a{position:relative;top:0;left:20px;z-index:10;color:#F5F5F5;background:none;line-height:31px;vertical-align:middle;font-size:26px}\
	#pageLogo a:hover, #pageLogo a:active, #pageLogo a:focus{background:none;text-decoration:none}\
	#jewelCase{left:160px}\
	.jewelToggler{top:0px}\
	#jewelCase .jewel{border:none;height:31px}\
	#jewelCase .jewelBox{top:30px}\
	.jewelCount{font-size:8px;top:1px}\
	#headNavOut{position:absolute;right:0;top:0;border:none;background:none;margin:0;padding:0;height:inherit}\
	#headNavIn{height:31px}\
	#navSearch,#pageNav{display:inline-block;position:relative}\
	#navSearch{left:0px;top:-5px}\
	#navSearch button{height:19px}\
	#navBonuschecker ul, #navApps ul {background:none repeat scroll 0 0 #FFFFFF;border-color:#333333 #333333 #2D4486;border-style:solid;border-width:1px 1px 2px;display:none;margin-right:-1px;margin-top:0px;min-width:80px;padding:10px 0 5px;position:absolute;top:100%;z-index:1;\
	#navApps ul a {color:#3A579A;display:block;font-weight:normal;height:auto;padding:4px 10px 5px;white-space:nowrap;vertical-align:middle}\
	#navAppsImg {height:4px;left:5px;position:relative;top:-2px;width:7px}\
	#navApps li {display:block;float:none;width:100%}\
	#navBonuschecker ul a {color:#3A579A;display:block;font-weight:normal;height:auto;padding:4px 10px 5px;white-space:nowrap;vertical-align:middle}\
	#navBonuscheckerImg {height:4px;left:5px;position:relative;top:-2px;width:7px}\
	#navBonuschecker li {display:block;float:none;width:100%}\
	");
	
//CSS-scherm
GM_addStyle("\
	body{background:#F5F5F5}\
	#content{margin-top:40px}\
	.UIFullPage_Container, .UIStandardFrame_Container{padding:0}\
	.UITwoColumnLayout_Content, .profile_two_columns .right_column, #right_column{width:720px}\
	.profile_sidebar_ads,.UIStandardFrame_SidebarAds,#pagelet_adbox{display:none}\
	.title_header,.UIRecentActivityStory,.UIIntentionalStory,.title_header.confirm_boxes,#contentCol,.UIIntentionalStory_CollapsedStories{background:none}\
	.hasLeftCol #mainContainer{border-right:none}\
	.uiStreamStory{background:#FFFFFF}\
");

//CSS-profielpagina
GM_addStyle("\
	#navigation_item_apps,#navigation_item_games,.divider{display:none}\
	#navigation_item_10979261223{display:block}\
	.uiSideNav .item{border-bottom:none}\
	#leftCol,#contentCol{padding-top:0px}\
");

//CSS-posts
GM_addStyle("\
	.GenericStory_Pic{height:40px;width:40px;margin-left:5px;margin-top:5px}\
");
	
//CSS-farmville
GM_addStyle("\
	#likeIframe{display:none}\
	.padding_content a,.padding_content span{font-size:12px !important}\
	.main_gift_cont li.rewardLi:first-child{display:block}\
	.navbg,.main_giftConfirm_cont{margin:auto}\
");

for (i in bc) {
	GM_addStyle("#"+bc[i]['app']+"_pub_un,#"+bc[i]['app']+"_pub_deux{display:none}");
}

}

function functionMain() {
// ------GIFTS------
if (adres == '/reqs.php') {
	if (document.getElementsByClassName('UITwoColumnLayout_NarrowContent')[0] == null) {
		window.top.location.reload(true);
	} else {
		document.getElementsByClassName('UITwoColumnLayout_NarrowContent')[0].innerHTML = document.getElementsByClassName('UITwoColumnLayout_NarrowContent')[0].innerHTML+'\
			<div id="pagelet_custom">\
				<div class="hp_connet_box UIHomeBox UITitledBox">\
					<div class="UITitledBox_Top UITitle UITitle_h5">Auto-open gifts!</div>\
					<div class="UITitledBox_Content" id="custombox">Open your gifts semi-automatically: Click on the button \'open gifts!\' to open your gifts automatically in stead of clicking them all yourself. For now, it will open only <b>the first 10 gifts</b>. You have to <b>manually ignore</b> them after they opened automatically..</div>\
				<input type="button" id="giftsbutton" class="inputbutton" value="Open gifts!">\
				</div>\
			</div>';
		document.getElementById("giftsbutton").addEventListener("click", functionGifts, false);
	}
}
//-----FVSCRIPT-----

//enlarger of the flash-iframe
if (adres == '/flash.php') {
	setTimeout("\
		height = window.innerHeight-190;\
		document.getElementById('flashapp').width = '1020px';\
		document.getElementById('flashapp').height = height+'px';\
		document.getElementById('promoBarIframe').style.position = 'absolute';\
		document.getElementById('promoBarIframe').style.bottom = '0';\
		document.body.style.background = 'none'", 1000);
}

if (href == 'http://apps.facebook.com/onthefarm/index.php?ref=rewardPage') {
	window.close();
}
//returning to giftpage
if (adres == '/onthefarm/sentthankyougift.php' 
		|| (adres == '/onthefarm/giftaccept.php' && document.getElementsByClassName('thank_you_gift')[0] == null)
		|| (adres == '/onthefarm/index.php' && get.search('gifterror') != -1)
		|| (adres == '/onthefarm/sendcredits.php' && get.search('fb_sig_locale') != -1)) {
	window.location = '/reqs.php';
}

//remove fv-adv.
if (document.getElementById(app['fv']['content']) != null) {
	if (document.getElementById(app['fv']['content']).getElementsByTagName("div")[2] != null) {	
		document.getElementById(app['fv']['content']).getElementsByTagName("iframe")[1].style.display = 'none';
	
		if (document.getElementById(app['fv']['content']).getElementsByTagName("div")[2].className == 'noticebox') {
			document.getElementById(app['fv']['content']).getElementsByTagName("div")[3].style.display = 'none'; 
		} else {
			if (document.getElementById(app['fv']['content']).getElementsByTagName("div")[2] == null) {
				location.reload(true); 
			} else {
				document.getElementById(app['fv']['content']).getElementsByTagName("div")[2].style.display = 'none'; 
			}
		}
		//enlarge
		if (document.getElementById(app['fv']['content']).getElementsByTagName("iframe")[3] != null) {
			height = window.innerHeight-30+157;
			if (height < 600) { height = 600; }
			document.getElementById(app['fv']['content']).getElementsByTagName("iframe")[3].width = '1020px';
			document.getElementById(app['fv']['content']).getElementsByTagName("iframe")[3].height = height+'px';
		}
	}
}
	
//fix send-egg-screen
if (document.getElementsByClassName('reward_cont')[0] != null) {
	inner = document.getElementsByClassName('reward_cont')[0].innerHTML;
	document.getElementsByClassName('reward_cont')[0].innerHTML = '<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />'+inner;		
}
	
	
	
//if gift isn't animal
if (adres == "/onthefarm/reward.php") {
	forms = document.getElementsByTagName("form");
	
	if (document.getElementsByClassName('main_giftConfirm_cont')[0] == null) {
		location.reload(true);
	}
	
	tekst_original = document.getElementsByClassName('main_giftConfirm_cont')[0].innerHTML.toLowerCase();
	
	check = new Array();
	//controlleren of je 'm gehaald hebt
	check[0] = 	tekst_original.search('sorry');
	check[1] = 	tekst_original.search('howdy farmer! you need');
	check[2] = 	tekst_original.search('woah there partner!');
	check[3] = 	tekst_original.search('trying to help, but');
	check[4] = 	tekst_original.search('you have already claimed all of your available fuel for today!');
	check[5] = 	tekst_original.search('slow down there partner!');
	check[6] = 	tekst_original.search('only available for your friends');
	check[7] = 	tekst_original.search('whoa there partner!');
	check[8] = 	tekst_original.search('you already got');
	check[9] = 	tekst_original.search('someone already adopted');
	check[10] = tekst_original.search('you\'re already on another job');
	
	gehaald = true;
	for (i in check) {
		if (check[i] != -1)
		{	gehaald = false; }
	}
	
	//ok-knop en reclame eraf halen
	text = tekst_original.split('</form>')[0]+'</form>';
	
	//als er een plaatje is, plak deze achter de tekst
	if (text.search('giftconfirm_img') != -1) {
		plaatje_link = text.split('<img src="')[1].split('">')[0];
		text = '<h3>'+text.split('<h3>')[1]+'<br /><img style="height:50px" src="'+plaatje_link+'">';
	}
	//anders als er fuel in de tekst staat en je 'm gehaald hebt
	else if (text.search('fuel') != -1 && gehaald) {
		plaatje_link = 'http://images.karedas.net/checkers/FVfuel.png';
		text = text+'<br /><img style="height:50px" src="'+plaatje_link+'">';
	}
	//anders als er coins in de tekst staat en je m gehaald hebt
	else if (text.search('coins') != -1 && gehaald) {
		plaatje_link = 'http://images.karedas.net/checkers/coins.png';
		text = text+'<br /><img style="height:50px" src="'+plaatje_link+'">';
	}
	
	//GM_addStyle("form{float:none !important;width:100% !important;text-align:left !important}\
	//			.inputyessubmit{background-color:#3B5998;border-color:#D9DFEA #0E1F5B #0E1F5B #D9DFEA;border-style:solid;border-width:1px;color:#FFFFFF;\
	//			font-family:'lucida grande',tahoma,verdana,arial,sans-serif;font-size:15px;margin:5px 0 0;padding:2px 15px 3px;text-align:center;}");
	// haal uit het adres wat voor soort ding het is
	type = get.split('frType=')[1].replace('FriendReward', '');
	
	show = (gehaald) ? '<h1 style="color:green">Got it! - ' : '<h1 style="color:red">Missed it! - ';
	show = show+type+'</h1><br />'+text;
	
	if (!gehaald) {
	document.body.innerHTML = show;
	}
}
// als het een dier is
else if (adres == "/onthefarm/index.php" && get.search('giftCow') != -1) {
	/*type = get.split('giftCow=')[1].split('&')[0];
	
	check = new Array();
	//controlleren of je 'm gehaald hebt
	check[0] = type.search('not_owned');
	
	show = (check[0] == -1) ? '<h1 style="color:green">Got it! - ' : '<h1 style="color:red">Missed it! - ';
	show = show+type.split('%3A')[1].replace("_", " ")+'</h1>';
	
	document.body.innerHTML = show; */
}

//-----GAMESCRIPTS-----

// mw-script
if (document.getElementById(app['mw']['content']) != null) {
	document.getElementById(app['mw']['content']).getElementsByTagName("div")[2].style.display = 'none'; 
	document.getElementById(app['mw']['content']).getElementsByTagName('iframe')[0].style.display = 'none';
	GM_addStyle(".UIStandardFrame_Content{float:none;margin:auto}");
}

//cafeworld-script
if (document.getElementById(app['cw']['content']) != null) {
	document.getElementById(app['cw']['app']+"_tab_container").getElementsByTagName('iframe')[0].style.display = 'none'; 
	document.getElementById(app['cw']['app']+"_progress_bar").getElementsByTagName('table')[0].style.margin = 'auto'; 
	document.getElementById(app['cw']['app']+"_progress_bar").getElementsByTagName('table')[1].style.margin = 'auto'; 
	GM_addStyle(".left_tabs{float:none}");
}
	
//fishville script
if (document.getElementById(app['fiv']['content']) != null) {
	document.getElementById(app['fiv']['content']).getElementsByTagName('iframe')[0].style.display = 'none';
}

//petville script
if (document.getElementById(app['pv']['content']) != null) {
	document.getElementById(app['pv']['content']).getElementsByTagName('iframe')[2].style.display = 'none'; 

}

//zooworld script
if (document.getElementById(app['zw']['content']) != null) {
	GM_addStyle(".UIStandardFrame_Content{float:none;margin:auto}");
}

//wizard script
if (document.getElementById(app['wi']['content']) != null) {
	GM_addStyle(".UIStandardFrame_Content{float:none;margin:auto}\
		#"+app['wi']['app']+"_ad_bottom,#"+app['wi']['app']+"_ad_top{display:none}");
	document.getElementById(app['wi']['content']).getElementsByTagName('table')[0].style.display = 'none';
}

//overall-script

//-------CSS-------------	
	//CSS-bonuschecker
	for (i in bc) {
		//check voor enlarge
		if (document.getElementById(bc[i]['content']) != null) {
			GM_addStyle(".UIStandardFrame_Container, .UIStandardFrame_Content{width:1020px;text-align:center}");
		}
	}
	
	//CSS-apps
	for (i in app) {
		//check voor enlarge
		if (document.getElementById(app[i]['content']) != null) {
			GM_addStyle(".UIStandardFrame_Container, .UIStandardFrame_Content{width:1020px;text-align:center}");
		}
	}

//------BLUEBAR-------

	//change logo to text
	if (document.getElementById('pageLogo') != null) {
		document.getElementById('pageLogo').childNodes[0].innerHTML = "facebook"; 
	}
	
	//change nav-icons and move searchbar
	if (document.getElementById("headNavIn") != null) {
		inner = document.getElementById("pageNav").innerHTML;
		
		bcs = new Array;
		bcs['cw_link'] = 'http://apps.facebook.com/cwbonuschecker/?_fb_fromhash=f68e1d025abfa821cd80319f445fed38';
		bcs['fv_link'] = 'http://apps.facebook.com/fvbonuschecker/?_fb_fromhash=f68e1d025abfa821cd80319f445fed38';
		bcs['fiv_link'] = 'http://apps.facebook.com/fishvillechecker/?_fb_fromhash=f68e1d025abfa821cd80319f445fed38';
		bcs['mw_link'] = 'http://apps.facebook.com/mwbonuschecker/?_fb_fromhash=f68e1d025abfa821cd80319f445fed38';
		bcs['pv_link'] = 'http://apps.facebook.com/pvbonuschecker/?_fb_fromhash=f68e1d025abfa821cd80319f445fed38';
		bcs['zw_link'] = 'http://apps.facebook.com/zwbonuschecker/?_fb_fromhash=f68e1d025abfa821cd80319f445fed38';
	
		bcs['cw_img'] = 'http://photos-h.ak.fbcdn.net/photos-ak-sf2p/v43/247/217700022703/app_2_217700022703_3569.gif';
		bcs['fv_img'] = 'http://photos-e.ak.fbcdn.net/photos-ak-sf2p/v43/84/175804218660/app_2_175804218660_8799.gif';
		bcs['fiv_img'] = 'http://photos-f.ak.fbcdn.net/photos-ak-sf2p/v43/117/401534655093/app_2_401534655093_8936.gif';
		bcs['mw_img'] = 'http://photos-e.ak.fbcdn.net/photos-ak-sf2p/v43/84/198656634540/app_2_198656634540_2196.gif';
		bcs['pv_img'] = 'http://photos-f.ak.fbcdn.net/photos-ak-sf2p/v43/233/231668863757/app_2_231668863757_8627.gif';
		bcs['zw_img'] = 'http://photos-a.ak.fbcdn.net/photos-ak-sf2p/v43/128/286802837624/app_1_286802837624_3838.gif';
		
		dingen = new Array("cw", "fv", "fiv", "mw", "pv", "zw");
		inner2 = '';
		for (i in dingen) {
			inner2 = inner2+"<li><a style='color:#3A579A' href='"+bcs[dingen[i]+'_link']+"'><img style='height:16px' src='"+bcs[dingen[i]+'_img']+"'> "+abbr[dingen[i]]+" Bonus Checker</a></li><br />";
		}
		
		document.getElementById("pageNav").innerHTML = "\
		<li id='navBonuschecker'>\
			<a id='navBonuscheckerLink' onclick='if (this.className == \"on\") {this.className = \"off\"; document.getElementById(\"navBonuschecker\").getElementsByTagName(\"ul\")[0].style.display=\"none\"} else {this.className = \"on\"; document.getElementById(\"navBonuschecker\").getElementsByTagName(\"ul\")[0].style.display=\"block\"}'>Bonuscheckers..</a>\
				<ul>"+inner2+"</ul>\
		</li>\
		<li id='navApps'>\
			<a id='navAppsLink' onclick='if (this.className == \"on\") {this.className = \"off\"; document.getElementById(\"navApps\").getElementsByTagName(\"ul\")[0].style.display=\"none\"} else {this.className = \"on\"; document.getElementById(\"navApps\").getElementsByTagName(\"ul\")[0].style.display=\"block\"}'>Apps..</a>\
				<ul>\
					<li><a style='color:#3A579A' href='http://apps.facebook.com/cafeworld'>			<img src='http://photos-h.ak.fbcdn.net/photos-ak-sf2p/v43/39/101539264719/app_2_101539264719_1610.gif'> 	Café World			</a></li><br />\
					<li><a style='color:#3A579A' href='http://apps.facebook.com/onthefarm'>			<img src='http://photos-a.ak.fbcdn.net/photos-ak-sf2p/v43/144/102452128776/app_2_102452128776_416.gif'> 	Farmville			</a></li><br />\
					<li><a style='color:#3A579A' href='http://apps.facebook.com/fishville'>			<img src='http://photos-b.ak.fbcdn.net/photos-ak-sf2p/v43/9/151044809337/app_2_151044809337_7378.gif'> 		Fishville			</a></li><br />\
					<li><a style='color:#3A579A' href='http://apps.facebook.com/inthemafia'>		<img src='http://photos-h.ak.fbcdn.net/photos-ak-sf2p/v43/231/10979261223/app_2_10979261223_8090.gif'> 		Mafia Wars			</a></li><br />\
					<li><a style='color:#3A579A' href='http://apps.facebook.com/petvillegame'>		<img src='http://photos-g.ak.fbcdn.net/photos-ak-sf2p/v43/202/163576248142/app_2_163576248142_4217.gif'> 	Petville			</a></li><br />\
					<li><a style='color:#3A579A' href='http://apps.facebook.com/wizard_'>			<img src='http://photos-h.ak.fbcdn.net/photos-ak-sf2p/v43/107/4014809927/app_2_4014809927_2172.gif'> 		School of W.		</a></li><br />\
					<li><a style='color:#3A579A' href='http://apps.facebook.com/playzoo'>			<img src='http://photos-h.ak.fbcdn.net/photos-ak-sf2p/v43/159/167746316127/app_2_167746316127_6580.gif'> 	Zoo World			</a></li>\
				</ul>\
		</li>\
		<li><a href='http://www.facebook.com/reqs.php'>Requests</a></li>"+inner;
	}

//-----MAKE EASIER------------
	if (adres == '/' || adres == '/home.php') {
		if (document.getElementById('home_stream') == null && document.getElementsByClassName("WelcomePage") == null) {
			window.top.location.reload(true);
		} else {
			moreposts = document.getElementsByClassName('uiMorePager')[0];
			moreposts.getElementsByTagName("img")[0].style.display = "none";
			moreposts.getElementsByTagName("a")[1].style.display = "none";
			moreposts = moreposts.innerHTML;
			
			showposts = '<b>Toggle what you want to see on you wall:</b>';
			for (i in app) {
				showposts = showposts+'<input type="checkbox" ';
				showposts = (GM_getValue(i+'_show', true)) ? showposts+'checked="checked" ' : showposts;
				showposts = showposts+'id="'+i+'_show"> '+abbr[i]+'<br />';
			}
			showposts = showposts+'<input type="checkbox" ';
			showposts = (GM_getValue('all_show', true)) ? showposts+'checked="checked" ' : showposts;
			showposts = showposts+'id="all_show"> All the other<br />\
									<span stype="margin-top:3px"><a href="#" id="toggleoff_show">All off</a> - <a href="#" id="toggleon_show">All on</a></span>';
			
			stripposts = '<span style="font-size:115%"><a href="#" id="stripposts">strip posts</a> - <a href="#" id="unstripposts">unstrip posts</a></span>';
			
			inner = showposts+"<hr />"+stripposts+"<hr />"+moreposts;

			document.getElementById('rightCol').innerHTML = document.getElementById('rightCol').innerHTML+'\
					<div id="pagelet_custom">\
						<div class="hp_connet_box UIHomeBox UITitledBox">\
							<div class="UITitledBox_Top UITitle UITitle_h5 uiHeaderBottomBorder">Lets make it easier</div>\
							<div class="UITitledBox_Content" id="custombox">'+inner+'<div id="custominfo"></div></div>\
						</div>\
					</div>';
					
			//events
		//	document.getElementById("morepostbutton").addEventListener("click", ShowSimilar, false);
			document.getElementById("stripposts").addEventListener("click", StripPosts, false);
			document.getElementById("unstripposts").addEventListener("click", UnstripPosts, false);
			document.getElementById("toggleoff_show").addEventListener("click", ShowAllOff, false);
			document.getElementById("toggleon_show").addEventListener("click", ShowAllOn, false);
			document.getElementById('all_show').addEventListener('click', ShowPosts, false)
			for (i in app) {
				document.getElementById(i+'_show').addEventListener('click', ShowPosts, false)
			}
		}
	}
}

function functionGifts() {
	button = document.getElementsByClassName("inputbutton");
	
	name = new Array();
	//inner = '';
	for (i in button) {
		if (button[i].name.search('reject') == -1) {
			name.push(button[i].name.replace('actions[', '').replace(']', ''));
		}
	}
	
	if (name.length == 0) {
		alert('No gifts for now!');
	}
	
	i = 0;
	onclick = '';
	for (i in name) {
		if (i < 10) {
			//onclick = onclick+'window.open("'+name[i]+'","_blank"); '
			window.open(name[i], '_blank');
		}
		i++;
	}
}

function ShowPosts() {
	
	aan = document.getElementById("all_show").checked;
	if (aan == false) {
	GM_addStyle(".uiStreamStory{display:none}");
	GM_setValue('all_show', false);
	} else {
	GM_addStyle(".uiStreamStory{display:block}");	
	GM_setValue('all_show', true);
	}
	for (i in app) {
		aan = document.getElementById(i+'_show').checked;		
		
		if (aan == true) {
		GM_addStyle("."+app[i]['aid']+"{display:block !important}");
		GM_setValue(i+'_show', true);
		} else {
		GM_addStyle("."+app[i]['aid']+"{display:none !important}");
		GM_setValue(i+'_show', false);
		}
	}
}

function StripPosts() {
		GM_addStyle("\
			.UIImageBlock_Content .uiButton,.uiStreamAttachments .uiTextSubtitle,.uiTextSubtitle,.comment_box{display:none}\
			.uiStreamAttachments .UIImageBlock_Image img{height:50px;width:50px}\
			.UIActionLinks a{font-size:130%;color:red;float:right}\
			.uiStreamAttachments .UIImageBlock_Image {float:right}\
			.uiStreamSource img, .uiStreamSource i{float:right}\
			.uiStream .uiStreamMessage{}\
			.UIActionLinks .comment_link,.UIActionLinks .like_link{display:none}");
}

function UnstripPosts() {
		GM_addStyle("\
			.UIImageBlock_Content .uiButton,.UIActionLinks .comment_link, .UIActionLinks .like_link{display:inline-block}\
			.comment_box{display:block}\
			.uiStreamAttachments .uiTextSubtitle,.uiTextSubtitle{display:inline}\
			.uiStreamAttachments .UIImageBlock_Image img{height:90px;width:90px}\
			.UIActionLinks a{font-size:100%;color:#3B5998;float:none}\
			.uiStreamAttachments .UIImageBlock_Image {float:left}\
			.uiStreamSource img, .uiStreamSource i{float:left}");
}

function ShowAllOff() {
	for (i in app) {
		document.getElementById(i+"_show").checked = false;
	}
	document.getElementById("all_show").checked = false;
	
	ShowPosts();
}

function ShowAllOn() {
	for (i in app) {
		document.getElementById(i+"_show").checked = true;
	}
	document.getElementById("all_show").checked = true;
	
	ShowPosts();
}

function ShowSimilar() {
	more = document.getElementsByClassName('uiTextMetadata');
	
	inner = '';
	for (i in more) {
		if (more[i].innerHTML.search("POST") != -1) {
			inner = inner+more[i].innerHTML+'<br />';
		}
	}

	document.getElementById("custombox").innerHTML = document.getElementById("custombox").innerHTML+inner;
}

window.addEventListener('load', ShowPosts, false);