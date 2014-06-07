// ==UserScript==
// @name           NG BBS Mod Type Indicator
// @namespace      http://userscripts.org/users/vitaminp
// @include        http://www.newgrounds.com/bbs/topic/*
// ==/UserScript==

if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1){
// If using chrome you need to update this manually, you can get an up to date list from http://vitaminp.newgrounds.com/news/post/525021
var GenreArray = new Array("14hourlunchbreak","archawn","auz","bahamut","Kool-Aid","commanderwalrus","ejr","el-presidente","fro","jolly","k-guare","legolass","perry","rabid-animals","reverend","rohanthebarbarian","shunshuu","thenewbies","thepigeonmaster","zachary","zrb","zuggz","tomfulp","wadefulp","stamper","johnnyutah","mindchamber","liljim","tim","bob","mike","psychogoldfish","rob","luis")
var isChrome = (navigator.userAgent.toLowerCase().indexOf('chrome') > -1)
}
if (typeof GM_deleteValue == 'undefined') {
	GM_addStyle = function(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	GM_deleteValue = function(name) {
		localStorage.removeItem(name);
	}

	GM_getValue = function(name, defaultValue) {
		var value = localStorage.getItem(name);
		if (!value)
			return defaultValue;
		var type = value[0];
		value = value.substring(1);
		switch (type) {
			case 'b':
				return value == 'true';
			case 'n':
				return Number(value);
			default:
				return value;
		}
	}

	GM_log = function(message) {
		console.log(message);
	}

	 GM_registerMenuCommand = function(name, funk) {
	//todo
	}

	GM_setValue = function(name, value) {
		value = (typeof value)[0] + value;
		localStorage.setItem(name, value);
	}
}
if (parseInt(GM_getValue('Update', '0')) + 604800000 <= (new Date().getTime())){// Updates Mod list once a week
GM_setValue('Update', new Date().getTime()+'');
if(isChrome){
load(GenreArray,isChrome)
}else{
load()
}
}else{
if(!isChrome){
mod(GM_getValue('AudioMods').split(','),GM_getValue('IconMods').split(','),GM_getValue('ForumMods').split(','),GM_getValue('ReviewMods').split(','),GM_getValue('ArtMods').split(','),GM_getValue('GenreMods').split(','))
}else{
mod(GM_getValue('AudioMods').split(','),GM_getValue('IconMods').split(','),GM_getValue('ForumMods').split(','),GM_getValue('ReviewMods').split(','),GM_getValue('ArtMods').split(','),GenreArray)
}
}
function load(GenreMods,isChrome){
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.newgrounds.com/lit/faq/',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
         var parser = new DOMParser();
        var dom = parser.parseFromString(responseDetails.responseText,"application/xml");
        var entry = dom.getElementById("sm_moderators").nextSibling.nextSibling.getElementsByTagName("p")
		var adminsArray = new Array("tomfulp","wadefulp","stamper","johnnyutah","mindchamber","liljim","tim","bob","mike","psychogoldfish","rob","luis")
		AudioLinks = entry[7].getElementsByTagName("a")
		var AudioMods = new Array()
		for(i=0;i<AudioLinks.length;i++){
		AudioMods.push(AudioLinks[i].innerHTML.toLowerCase())
		}
		AudioMods = AudioMods.concat(adminsArray)
		IconLinks = entry[8].getElementsByTagName("a")
		var IconMods = new Array()
		for(i=0;i<IconLinks.length;i++){
		IconMods.push(IconLinks[i].innerHTML.toLowerCase())
		}
		IconMods = IconMods.concat(adminsArray)
		ForumLinks = entry[9].getElementsByTagName("a")
		var ForumMods = new Array()
		for(i=0;i<ForumLinks.length;i++){
		ForumMods.push(ForumLinks[i].innerHTML.toLowerCase())
		}
		ForumMods = ForumMods.concat(adminsArray)
		ReviewLinks = entry[10].getElementsByTagName("a")
		var ReviewMods = new Array()
		for(i=0;i<ReviewLinks.length;i++){
		ReviewMods.push(ReviewLinks[i].innerHTML.toLowerCase())
		}
		ReviewMods = ReviewMods.concat(adminsArray)
		ArtLinks = entry[11].getElementsByTagName("a")
		var ArtMods = new Array()
		for(i=0;i<ArtLinks.length;i++){
		ArtMods.push(ArtLinks[i].innerHTML.toLowerCase())
		}
		ArtMods = ArtMods.concat(adminsArray)
		GM_setValue('AudioMods',AudioMods.join())
		GM_setValue('IconMods',IconMods.join())
		GM_setValue('ForumMods',ForumMods.join())
		GM_setValue('ReviewMods',ReviewMods.join())
		GM_setValue('ArtMods',ArtMods.join())
		if(!isChrome){
		loadGenre(AudioMods,IconMods,ForumMods,ReviewMods,ArtMods)
		}else{
		mod(AudioMods,IconMods,ForumMods,ReviewMods,ArtMods,GenreMods)
		}
		}
    });
	function loadGenre(AudioMods,IconMods,ForumMods,ReviewMods,ArtMods){
	GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://vitaminp.newgrounds.com/news/post/525021',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
         var parser = new DOMParser();
        var dom = parser.parseFromString(responseDetails.responseText,"application/xml");
        var entry = dom.getElementById("pod_type_1").firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.firstChild.nextSibling.lastChild.previousSibling.firstChild.nextSibling
		var adminsArray = new Array("tomfulp","wadefulp","stamper","johnnyutah","mindchamber","liljim","tim","bob","mike","psychogoldfish","rob","luis")
		var GenreMods = entry.textContent.toLowerCase().split("\n")
		GenreMods = GenreMods.concat(adminsArray)
		GM_setValue('GenreMods',GenreMods.join())
		mod(AudioMods,IconMods,ForumMods,ReviewMods,ArtMods,GenreMods)
		}
    });
	}
}

function mod(AudioMods,IconMods,ForumMods,ReviewMods,ArtMods,GenreMods){
var AudioIcon = document.createElement('img');
AudioIcon.setAttribute('alt', 'AudioIcon');
AudioIcon.setAttribute('name', 'AudioIcon');
AudioIcon.style.height = '15px'
AudioIcon.style.width = '15px'
AudioIcon.style.opacity = '0.2'
AudioIcon.style.padding = '2px'
AudioIcon.setAttribute('src', "http://img.ngfiles.com/hicons/i18.gif");
var IconIcon = document.createElement('img');
IconIcon.setAttribute('alt', 'IconIcon');
IconIcon.setAttribute('name', 'IconIcon');
IconIcon.style.height = '15px'
IconIcon.style.width = '15px'
IconIcon.style.opacity = '0.2'
IconIcon.style.padding = '2px'
IconIcon.setAttribute('src', "http://img.ngfiles.com/hicons/i65.gif");
var ForumIcon = document.createElement('img');
ForumIcon.setAttribute('alt', 'ForumIcon');
ForumIcon.setAttribute('name', 'ForumIcon');
ForumIcon.style.height = '15px'
ForumIcon.style.width = '15px'
ForumIcon.style.opacity = '0.2'
ForumIcon.style.padding = '2px'
ForumIcon.setAttribute('src', "http://img.ngfiles.com/hicons/i40.gif");
var ArtIcon = document.createElement('img');
ArtIcon.setAttribute('alt', 'ArtIcon');
ArtIcon.setAttribute('name', 'ArtIcon');
ArtIcon.style.height = '15px'
ArtIcon.style.width = '15px'
ArtIcon.style.opacity = '0.2'
ArtIcon.style.padding = '2px'
ArtIcon.setAttribute('src', "http://img.ngfiles.com/hicons/i20.gif");
var ReviewIcon = document.createElement('img');
ReviewIcon.setAttribute('alt', 'ReviewIcon');
ReviewIcon.setAttribute('name', 'ReviewIcon');
ReviewIcon.style.height = '15px'
ReviewIcon.style.width = '15px'
ReviewIcon.style.opacity = '0.2'
ReviewIcon.style.padding = '2px'
ReviewIcon.setAttribute('src', "http://img.ngfiles.com/hicons/i38.gif");
var GenreIcon = document.createElement('img');
GenreIcon.setAttribute('alt', 'GenreIcon');
GenreIcon.setAttribute('name', 'GenreIcon');
GenreIcon.style.height = '15px'
GenreIcon.style.width = '15px'
GenreIcon.style.opacity = '0.2'
GenreIcon.style.padding = '2px'
GenreIcon.setAttribute('src', "http://img.ngfiles.com/hicons/i6.gif");
var IconList = document.createElement("div")
IconList.style.marginLeft = '-7px'
IconList.style.width = '114px'
IconList.setAttribute('class', 'IconList');
IconList.appendChild(AudioIcon)
IconList.appendChild(ArtIcon)
IconList.appendChild(ForumIcon)
IconList.appendChild(ReviewIcon)
IconList.appendChild(IconIcon)
IconList.appendChild(GenreIcon)

var posts = document.getElementsByClassName('userstats');
for (i = 0; i < posts.length; i++){
		var username = posts[i].parentNode.getElementsByTagName('h3')[0].textContent;
		IconList=IconList.cloneNode(true)
		posts[i].insertBefore(IconList,posts[i].childNodes[2])
		var btns = posts[i].getElementsByClassName('IconList');
		if (btns.length > 1) continue; // Fix for Chrome (adding an extra button for each click)
		if(AudioMod(username)){
		posts[i].getElementsByTagName("img")[1].style.opacity = "1";
		}else{
		posts[i].getElementsByTagName("img")[1].style.opacity = "0.2";
		}
		if(ArtMod(username)){
		posts[i].getElementsByTagName("img")[2].style.opacity = "1";
		}else{
		posts[i].getElementsByTagName("img")[2].style.opacity = "0.2";
		}
		if(ForumMod(username)){
		posts[i].getElementsByTagName("img")[3].style.opacity = "1";
		}else{
		posts[i].getElementsByTagName("img")[3].style.opacity = "0.2";
		}
		if(ReviewMod(username)){
		posts[i].getElementsByTagName("img")[4].style.opacity = "1";
		}else{
		posts[i].getElementsByTagName("img")[4].style.opacity = "0.2";
		}
		if(IconMod(username)){
		posts[i].getElementsByTagName("img")[5].style.opacity = "1";
		}else{
		posts[i].getElementsByTagName("img")[5].style.opacity = "0.2";
		}
		if(GenreMod(username)){
		posts[i].getElementsByTagName("img")[6].style.opacity = "1";
		}else{
		posts[i].getElementsByTagName("img")[6].style.opacity = "0.2";
		}
}
function AudioMod(n) {
	for(h=0; h<AudioMods.length; h++){
		if(n.toLowerCase() == AudioMods[h]){
		return true;
		}
	}
	return false;
}
function ArtMod(n) {
	for(h=0; h<ArtMods.length; h++){
		if(n.toLowerCase() == ArtMods[h]){
		return true;
		}
	}
	return false;
}
function ForumMod(n) {
	for(h=0; h<ForumMods.length; h++){
		if(n.toLowerCase() == ForumMods[h]){
		return true;
		}
	}
	return false;
}
function ReviewMod(n) {
	for(h=0; h<ReviewMods.length; h++){
		if(n.toLowerCase() == ReviewMods[h]){
		return true;
		}
	}
	return false;
}
function IconMod(n) {
	for(h=0; h<IconMods.length; h++){
		if(n.toLowerCase() == IconMods[h]){
		return true;
		}
	}
	return false;
}
function GenreMod(n) {
	for(h=0; h<GenreMods.length; h++){
		if(n.toLowerCase() == GenreMods[h]){
		return true;
		}
	}
	return false;
}
}



