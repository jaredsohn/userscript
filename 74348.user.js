// ==UserScript==
// @name        facebook
// @namespace   paul
// @include     http://www.facebook.com/*
// @include		http://facebook.com/*
// @include		http://apps.facebook.com/*
// @include		http://fb-1.farmville.com/flash.php*
// ==/UserScript==

//farmville: aid_102452128776 app_content_102452128776

window.addEventListener('load', functionTry, false);

function functionConfirm() {
	if (q=confirm("aangepast?") == true) {
		functionTry(); 
	}
}

function functionTry() {
	try {
		functionMain(); 
	}
	catch(err) {	
		alert(err.message);
	}
}

function functionMain() {
	adres = window.location.pathname;
	get = window.location.search;
	href = window.location.href;


//farmville-script

	//enlarger
	if (adres == '/flash.php') {
		setTimeout("\
			height = window.innerHeight-190;\
			document.getElementById('flashapp').width = '1020px';\
			document.getElementById('flashapp').height = height+'px';\
			document.getElementById('promoBarIframe').style.position = 'absolute';\
			document.getElementById('promoBarIframe').style.bottom = '0';\
			document.body.style.background = 'none'", 1000);
	}
	
	//als: setthankyougift || acceptgift can't return || gifterror || send egg --> goto gifts
	if (adres == '/onthefarm/sentthankyougift.php' 
			|| (adres == '/onthefarm/giftaccept.php' && get.search('senderId') != -1 && document.getElementById('send') == null)
			|| (adres == '/onthefarm/index.php' && get.search('gifterror') != -1)
			|| (adres == '/onthefarm/sendcredits.php' && get.search('fb_sig_locale') != -1)) {
		window.location = '/reqs.php';
	}

	//remove fv-adv.
	if (document.getElementById("app_content_102452128776") != null) {
	if (document.getElementById("app_content_102452128776").getElementsByTagName("div")[2] != null) {
		if (document.getElementById("app_content_102452128776").getElementsByTagName("div")[2].className == 'noticebox') {
			document.getElementById("app_content_102452128776").getElementsByTagName("div")[3].style.display = 'none'; 
		}
		else {
			if (document.getElementById("app_content_102452128776").getElementsByTagName("div")[2] == null) {
				location.reload(true); }
			else {
				document.getElementById("app_content_102452128776").getElementsByTagName("div")[2].style.display = 'none'; }
		}	
		//enlarge
		if (document.getElementById("app_content_102452128776").getElementsByTagName("iframe")[1] != null) {
			height = window.innerHeight-30+157;
			document.getElementById("app_content_102452128776").getElementsByTagName("iframe")[1].width = '1020px';
			document.getElementById("app_content_102452128776").getElementsByTagName("iframe")[1].height = height+'px';
		}
	}
	}
	
	if (document.getElementsByClassName('reward_cont')[0] != null) {
		inner = document.getElementsByClassName('reward_cont')[0].innerHTML;
		document.getElementsByClassName('reward_cont')[0].innerHTML = '<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />'+inner;		
	}
	
	
	
	//if gift isn't animal
	if (adres == "/onthefarm/reward.php") {
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
		text = tekst_original.split('</h3>')[0]+'</h3>';
		
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
		
		// haal uit het adres wat voor soort ding het is
		type = get.split('frType=')[1].replace('FriendReward', ' Reward');
		
		show = (gehaald) ? '<h1 style="color:green">Got it! - ' : '<h1 style="color:red">Missed it! - ';
		show = show+type+'</h1><br />'+text;
		
		document.body.innerHTML = show; 
		window.close();
	}
	// als het een dier is
	else if (adres == "/onthefarm/index.php" && get.search('giftCow') != -1) {
		type = get.split('giftCow=')[1].split('&')[0];
		
		check = new Array();
		//controlleren of je 'm gehaald hebt
		check[0] = type.search('not_owned');
		
		show = (check[0] == -1) ? '<h1 style="color:green">Gehaald - ' : '<h1 style="color:red">Niet - ';
		show = show+type.split('%3A')[1].replace("_", " ")+'</h1>';
		
		document.body.innerHTML = show; 
		window.close();
	}	
	
// mw-script
	if (document.getElementById("app_content_10979261223") != null) {
		document.getElementById("app_content_10979261223").getElementsByTagName("div")[2].style.display = 'none'; 
		GM_addStyle(".UIStandardFrame_Content{float:none;margin:auto}");
	}

//cafeworld-script
	if (document.getElementById("app_content_101539264719") != null) {
		document.getElementById("app101539264719_tab_container").getElementsByTagName('iframe')[0].style.display = 'none'; 
		document.getElementById("app101539264719_progress_bar").getElementsByTagName('table')[0].style.margin = 'auto'; 
		document.getElementById("app101539264719_progress_bar").getElementsByTagName('table')[1].style.margin = 'auto'; 
		GM_addStyle(".left_tabs{float:none}");
	}
	
//fishville script
	if (document.getElementById("app_content_151044809337") != null) {
		document.getElementById('app_content_151044809337').getElementsByTagName('iframe')[0].style.display = 'none';
	}
	
//petville script
	if (document.getElementById("app_content_163576248142") != null) {
		document.getElementById("app_content_163576248142").getElementsByTagName('iframe')[2].style.display = 'none'; 
	
	}

//zooworld script
	if (document.getElementById("app_content_167746316127") != null) {
		GM_addStyle(".UIStandardFrame_Content{float:none;margin:auto}");
	}

//wizard script
	if (document.getElementById("app_content_4014809927") != null) {
		GM_addStyle(".UIStandardFrame_Content{float:none;margin:auto}\
			#app4014809927_ad_bottom,#app4014809927_ad_top{display:none}");
		document.getElementById("app_content_4014809927").getElementsByTagName('table')[0].style.display = 'none';
	}

//overall-script

	
	if (document.getElementById("app_content_102452128776") != null  //farmville
			|| document.getElementById("app_content_101539264719") != null //cafeworld
			|| document.getElementById("app_content_151044809337") != null //fishville
			|| document.getElementById("app_content_175804218660") != null //fvbonuschecker
			|| document.getElementById("app_content_163576248142") != null) { //petville
		GM_addStyle(".UIStandardFrame_Container, .UIStandardFrame_Content{width:1020px;text-align:center}");
	}

	
	//CSS-startbalk
	GM_addStyle("\
		.fbx #pageHead{width:100%;left:0}\
		#pageHead,#blueBar{position:fixed;top:0px;width:100%;height:31px}\
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
		#navSearch{left:0px;top:-10px}\
		#navSearch button{height:19px}\
		#navApps ul {background:none repeat scroll 0 0 #FFFFFF;border-color:#333333 #333333 #2D4486;border-style:solid;border-width:1px 1px 2px;display:none;margin-right:-1px;margin-top:0px;min-width:80px;padding:10px 0 5px;position:absolute;right:150px;top:100%;z-index:1;\
		#navApps ul a {color:#3A579A;display:block;font-weight:normal;height:auto;padding:4px 10px 5px;white-space:nowrap;vertical-align:middle}\
		#navAppsImg {height:4px;left:5px;position:relative;top:-2px;width:7px}\
		#navApps li {display:block;float:none;width:100%}\
		");
		
	//CSS-scherm
	GM_addStyle("\
		body{background:#F5F5F5}\
		#content{margin-top:40px}\
		.UIFullPage_Container, .UIStandardFrame_Container{padding:0}\
		.UITwoColumnLayout_Content, .profile_two_columns .right_column, #right_column{width:720px}\
		.profile_sidebar_ads,.UIStandardFrame_SidebarAds,#pagelet_composer,#pagelet_adbox,#pageFooter{display:none}\
		#app175804218660_pub_deux,#app175804218660_pub_un{display:none}\
		.UIRecentActivityStory,.UIIntentionalStory,.title_header.confirm_boxes,#contentCol,.UIIntentionalStory_CollapsedStories{background:none}\
		.hasLeftCol #mainContainer{border-right:none}\
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
		.padding_content a,.padding_content span{font-size:12px !important}\
		.app_content_102452128776 .main_gift_cont li.rewardLi:first-child{display:block}\
		.navbg,.app_content_102452128776 .main_giftConfirm_cont{margin:auto}\
		.aid_102452128776{background:#FAFAD2}\
	");

	//change logo to text
	if (document.getElementById('pageLogo') != null) {
		document.getElementById('pageLogo').childNodes[0].innerHTML = "facebook"; 
	}
	
	//change nav-icons and move searchbar
	if (document.getElementById("headNavIn") != null) {		
		inner = document.getElementById("pageNav").innerHTML
		document.getElementById("pageNav").innerHTML = "\
		<li id='navApps'>\
			<a id='navAppsLink' onclick='if (this.className == \"on\") {this.className = \"off\"; document.getElementById(\"navApps\").getElementsByTagName(\"ul\")[0].style.display=\"none\"} else {this.className = \"on\"; document.getElementById(\"navApps\").getElementsByTagName(\"ul\")[0].style.display=\"block\"}'>Apps..</a>\
				<ul>\
					<li><a style='color:#3A579A' href='http://apps.facebook.com/cafeworld'>			<img src='http://photos-h.ak.fbcdn.net/photos-ak-sf2p/v43/39/101539264719/app_2_101539264719_1610.gif'> 	Café World			</a></li>\
					<li><a style='color:#3A579A' href='http://apps.facebook.com/onthefarm'>			<img src='http://photos-a.ak.fbcdn.net/photos-ak-sf2p/v43/144/102452128776/app_2_102452128776_416.gif'> 	Farmville			</a></li>\
					<li><a style='color:#3A579A' href='http://apps.facebook.com/fishville'>			<img src='http://photos-b.ak.fbcdn.net/photos-ak-sf2p/v43/9/151044809337/app_2_151044809337_7378.gif'> 		Fishville			</a></li>\
					<li><a style='color:#3A579A' href='http://apps.facebook.com/fvbonuschecker'>	<img src='http://photos-e.ak.fbcdn.net/photos-ak-sf2p/v43/84/175804218660/app_2_175804218660_8799.gif'> 	fvbonuschecker		</a></li>\
					<li><a style='color:#3A579A' href='http://apps.facebook.com/inthemafia'>		<img src='http://photos-h.ak.fbcdn.net/photos-ak-sf2p/v43/231/10979261223/app_2_10979261223_8090.gif'> 		Mafia Wars			</a></li>\
					<li><a style='color:#3A579A' href='http://apps.facebook.com/petvillegame'>		<img src='http://photos-g.ak.fbcdn.net/photos-ak-sf2p/v43/202/163576248142/app_2_163576248142_4217.gif'> 	Petville			</a></li>\
					<li><a style='color:#3A579A' href='http://apps.facebook.com/wizard_'>			<img src='http://photos-h.ak.fbcdn.net/photos-ak-sf2p/v43/107/4014809927/app_2_4014809927_2172.gif'> 		School of W.		</a></li>\
					<li><a style='color:#3A579A' href='http://apps.facebook.com/playzoo'>			<img src='http://photos-h.ak.fbcdn.net/photos-ak-sf2p/v43/159/167746316127/app_2_167746316127_6580.gif'> 	Zoo World			</a></li>\
				</ul>\
		</li>\
		<li><a href='http://www.facebook.com/reqs.php'>Requests</a></li>"+inner;
	}
	
	//edit posts
	if (document.getElementById('home_stream') != null) {
		more = document.getElementsByClassName('uiTextMetadata');
		
		inner = '';
		for (i in more) {
			if (more[i].innerHTML.search("POST") != -1) {
				inner = inner+more[i].innerHTML+'<br />';
			}
		}
				
		meer = document.getElementsByClassName('UIShowMore_ShowMore')[0].innerHTML;
		
		inner = inner+'<hr />'+meer+'<hr />';
		
		document.getElementById('rightCol').innerHTML = document.getElementById('rightCol').innerHTML+'\
				<div id="pagelet_custom">\
					<div class="hp_connet_box UIHomeBox UITitledBox">\
						<div class="UITitledBox_Top UITitle UITitle_h5">Lets make it easier</div>\
						<div class="UITitledBox_Content" id="custombox">Blablabla</div>\
					</div>\
				</div>';
		document.getElementById('custombox').innerHTML = inner;		
	}
}