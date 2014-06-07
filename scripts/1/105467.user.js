// ==UserScript==
// @name           fs-e-famous
// @namespace      http://userscripts.org/users/133663
// @include        http://www.formspring.me/*
// ==/UserScript==

var initial = GM_getValue("initial", false);
if (!initial) {
	loadAssets(); // If the avatars are not set, load them once
}

if (/follow\/stream/.test(window.location.href))
{
	var a = new Array(); // namae wa
	a[0] = "jonessama";
	a[1] = "HALOOWNMASTER";
	a[2] = "ADETKOWN86E";
	a[3] = "eksopl";
	a[4] = "HashBunbunmaru";
	a[5] = "colombianon";
	a[6] = "Suigin";
	a[7] = "BOOFYKINS";
	a[8] = "hiddenfirefly";
	a[9] = "DurgaTheHutina";
	a[10] = "clocktown";
	a[11] = "Moekou";
	var b = new Array(); // honto ni namae wa
	b[0] = "Anonymous Jones-sama";
	b[1] = "Kira \"The Red Comet\" Yamato";
	b[2] = "Tony \"T-BOY\" Stark";
	b[3] = "Eksopl?";
	b[4] = "Bunbunmaru";
	b[5] = "AoC";
	b[6] = "Suigin";
	b[7] = "BOOF";
	b[8] = "Mas";
	b[9] = "Myonmyonmyon";
	b[10] = "White Ren";
	b[11] = "Fujiwara no Mokou";
	var c = new Array(); // avatar rinku
	
	for (i=0; i<12; i++){
		c[i] = GM_getValue("av"+i); // Populate the array from the webStorage
	}
	
	var d = new Array(); // ore wa nippon
	d[0] = "This is my subtitle. There are many like it but this one is mine.";
	d[1] = "journeying with tboy sterk";
	d[2] = "Big Trouble, PRC";
	d[3] = "it is a mystery";
	d[4] = "Rizon";
	d[5] = "CO";
	d[6] = "dicktower";
	d[7] = "Hideyhole, USA";
	d[8] = "Russia";
	d[9] = "";
	d[10] = "Through the Looking Glass";
	d[11] = "Mt. Fuji";
	var r = Math.floor(Math.random()*a.length);
	checkAvatar(r); // check if the avatar is copacetic

}
else if (/(jonessama|HALOOWNMASTER|ADETKOWN86E|eksopl|HashBunbunmaru|colombianon|Suigin|BOOFYKINS|hiddenfirefly|DurgaTheHutina|clocktown|Moekou)/.test(window.location.href))
{
	var a = document.getElementsByClassName('module bio')[0];
	var b = document.createElement('div');
	b.setAttribute('class', 'module profile_verified');
	b.innerHTML = '<h4>Verified account</h4>';
	a.parentNode.insertBefore(b, a);
}

function loadAssets(){ // Runs only once
	GM_setValue("initial", true);
	GM_setValue("av0", "20110703/n4e10ae86df49a_large.png");
	GM_setValue("av1", "20110704/n4e11785e3589f_large.png");
	GM_setValue("av2", "20110703/n4e10b3b88e949_large.jpg");
	GM_setValue("av3", "20110331/n4d9443e0600e0_large.png");
	GM_setValue("av4", "20100403/n4d956dc57164e_large.png");
	GM_setValue("av5", "20110610/n4df2af7aadaf2_large.png");
	GM_setValue("av6", "20110702/n4e0f683ff120a_large.png");
	GM_setValue("av7", "20110503/n4dc0c9135baa2_large.jpg");
	GM_setValue("av8", "20110703/n4e106a7a8cd7a_large.png");
	GM_setValue("av9", "20110703/n4e10658dcccf0_large.png");
	GM_setValue("av10", "20110619/n4dfe919131e72_large.jpg");
	GM_setValue("av11", "20101114/4ce07ea7cfc9c_thumb.jpg");
}

function checkAvatar(pos){ // Does nothing if avatar is there
	var statusCode;
	GM_xmlhttpRequest({
		method: "HEAD",
		url: 'http://files-cdn.formspring.me/profile/'+c[pos],
		onload: function(response) {
			statusCode = response.status;
			if (statusCode == 200){
				replaceButton(pos);
			} else {
				GM_log(statusCode);
				correctAvatar(pos);
			}
		}
	});
}

function correctAvatar(p) { // Scrape and save the new avatar
	GM_xmlhttpRequest({
		method: "GET",
		url: 'http://www.formspring.me/'+a[p],
		onload: function(response) {
			var res = /profile\/(\d+\/\w+large\.\w+)"/.exec(response.responseText);			
			var newAvatar = res[1];
			GM_log('Replacing '+c[p]+' with '+newAvatar);
			GM_setValue("av"+p,newAvatar);
			c[p] = newAvatar;
			replaceButton(p);
		}
	});
}

function replaceButton(e) {
	var f = document.getElementsByClassName('module showcase verified')[0];
	f.innerHTML = '<h4>Formspring Favorites</h4><a href="http://www.formspring.me/'+a[e]+'" onclick="fspring.trackEvent(\'Home\', \'ShowcaseClickthrough\', \''+a[e]+'\');" class="fleft"><img src="http://files-cdn.formspring.me/profile/'+c[e]+'" alt="'+a[e]+'" width="70" /></a><h5><a href="http://www.formspring.me/'+a[e]+'" onclick="fspring.trackEvent(\'Home\', \'ShowcaseClickthrough\', \''+a[e]+'\');">'+b[e]+'</a></h5><p>'+d[e]+'</p><a class="follow button_green_sm" id="follow-'+a[e]+'" href="javascript://" onclick="fspring.follow(\''+a[e]+'\', this, \'Showcase\');">+ follow</a>';
}