// ==UserScript==
// @name Last Fm Artist with user Compatibility
// @namespace tag:URI
// @Description	Check what is your average compatibility with an artist's listeners
// @include http://www.last.fm/music/*
// @include www.last.fm/music/*
// @include last.fm/music/*
// @include http://www.lastfm.*/music/*
// @include www.lastfm.*/music/*
// @include lastfm.*/music/*
// @exclude http://www.lastfm.*/music/*/+*
// @exclude www.lastfm.*/music/*/+*
// @exclude lastfm.*/music/*/+*
// @exclude http://www.last.fm/music/*/+*
// @exclude www.last.fm/music/*/+*
// @exclude last.fm/music/*/+*
// ==/UserScript==

//Compare all users --> (including those that are currently listening)
const compare_all = true, isArtist;
var users=document.evaluate("//ul[@class='usersSmall clearit']//a[starts-with(@href,'/user/')]",document,null,6,null),
user_count = 0,
curUser,
comp_total = 0,
delay = 4000, //set this to a higher value if you have a slow internet connetions or lastfm is working slow.
compatibility_bar;


if(document.body.getAttribute("class") == 'r-artist a-overview') //check whether this page is an artist's page.
	isArtist = true;
	
GM_addStyle('#compatibility a {cursor:pointer;font-weight:bold;} #compatibility span.bar {  display: block ;    position: relative ;   margin: 5px 0 ;    width: 100% ;    height: 8px ;    overflow: hidden ;    -moz-border-radius: 3px ;    -webkit-border-radius: 3px ;    background: #ccc ;} #compatibility span.bar span {    display: block ;    height: 8px ;    -moz-border-radius: 3px ;    -webkit-border-radius: 3px ;}');
GM_addStyle('#compatibility span.verylow span {background: #9a9a9a;} #compatibility span.low span {    background: #453e45;} #compatibility span.medium span {    background: #5336bd;} #compatibility span.high span {    background: #05bd4c;} #compatibility span.veryhigh span {    background: #e9c102;} #compatibility span.super span {    background: #ff0101;}');

createButton();


function createButton(){
	var element, newElement, innerElement;
	element = document.getElementById('similarArtists');
	innerElement = document.createElement('a');
	if (element) {
	    newElement = document.createElement('div');
		newElement.innerHTML = '<div id="compatibility"><h2 class="heading"><span class="h2Wrapper">Compatibility</span></h2><p id="check_compat">Compare with: <select id="users_select" name="users"><option value="5" selected>5</option><option value="10">10</option><option value="15">15</option><option value="20">20</option></select> users.</p></div>';
		innerElement.addEventListener("click", getUsers, true);
		innerElement.innerHTML = 'CHECK NOW';
		newElement.firstChild.appendChild(innerElement)
		element.parentNode.insertBefore(newElement, element);
	}
	else{
		var tracklist=xpath("//h2[@class='heading']");
		newElement = document.createElement('div');
		newElement.innerHTML = '<div id="compatibility"><h2 class="heading"><span class="h2Wrapper">Compatibility</span></h2><p id="check_compat"></p></div>';
		innerElement.addEventListener("click", getUsers, true);
		innerElement.innerHTML = 'Check Compatibility';
		newElement.firstChild.appendChild(innerElement)
		tracklist.parentNode.insertBefore(newElement, tracklist);
	}	
}

function getUsers(){
	if(isArtist) //set the number of users to query for compatibility (artist page only, for now)
		user_count = document.getElementById("users_select").value;
	
	//Replace the "Check Compatibility" link with a "Checking..: text...
	var curUser=document.evaluate("//a[@id='idBadgerUser']/span/text()",document,null,2,null).stringValue;
	var element = document.getElementById('compatibility');
	if (element) {
	    newElement = document.createElement('div');
		newElement.innerHTML = '<div id="compatibility"><h2 class="heading"><span class="h2Wrapper">Compatibility</span></h2><p style="color: red;"><strong>Checking.....</strong><img src="http://cdn.last.fm/tageditor/progress_active.gif" /></p></div>';
	    element.parentNode.replaceChild(newElement, element);
	}
	if(isArtist) //for an artist page
		getArtistFans(document.URL.substr(document.URL.lastIndexOf('/')+1));
	else{
		for(i=0;i<users.snapshotLength;i++) {
			var user=users.snapshotItem(i).text;
			if (user !==curUser) {
				if(compare_all){
					getUserCompat(user);
					user_count++;
				}
				else if(users.snapshotItem(i).parentNode.parentNode.childNodes[3].innerHTML=="Top Listener"){ //Parse top listeners only
					getUserCompat(user);
					user_count++;
				}
			}
		}
	}
	setTimeout(create_compat_bar,delay);
}

function getUserCompat(user){
    GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.last.fm/user/'+user+'/tasteomatic',
    headers: {
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(r) {
		comp_total+=parseCompat(r.responseText) //for each user	
    }
});
}

function getArtistFans(artist){
    GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://ws.audioscrobbler.com/1.0/artist/'+artist+'/fans.xml',
    headers: {
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(r) {
		parseUsers(r.responseText);
    }
});
}

//Parse users from the artist fan xml page
function parseUsers(text){
	var user_stop = 0;
	var user_tag = '/user/'; //string to search for when looking for users 
	for(i=0;i<user_count;i++) {
		var user_start = text.indexOf(user_tag, user_stop);//find position of next user (or first) starting from the end position of last user (or the beginning)
		//if(user_start == -1) //no more users found
		//break;
		var user_stop = text.indexOf("</url>", user_start); 
		var user = text.substring(user_start + user_tag.length, user_stop);
		if(user == curUser)
			continue;
		else
			getUserCompat(user); 
	}
}

//Parse user's compatibility (percentage) from ajax request
function parseCompat(text){
   	return eval(/-{0,1}\d+\.{0,1}\d{0,}(?=%)/.exec(text)[0]);
}

function create_compat_bar(){
	var element, newElement, avg_val;
	avg_val = comp_total / user_count;
	element = document.getElementById('compatibility');
	var percentage = Math.round(avg_val*100)/100;
	if (element) {
	    newElement = document.createElement('div');
		newElement.innerHTML = '<div id="compatibility"><h2 class="heading"><span class="h2Wrapper">Compatibility</span></h2><p>Your compatibility with '+document.title.substring(0,document.title.indexOf('–')-1)+'\'s listeners is <strong>'+calcCompat(avg_val)+'</strong> ('+percentage+'%)</p><span class="'+compatibility_bar+'"><span style="width: '+percentage+'%;"/></span></div>';
	    element.parentNode.replaceChild(newElement, element);
	}
}


function calcCompat(avg_val){
	
	if(avg_val < 16.66){
		compatibility_bar = 'bar verylow';
		return 'Very LOW';
	}
	else if(avg_val < 33.33){
		compatibility_bar = 'bar low';
		return 'LOW';
	}
	else if(avg_val < 50){
		compatibility_bar = 'bar medium';
		return 'MEDIUM';
	}
	else if(avg_val < 66.66){
		compatibility_bar = 'bar high';
		return 'HIGH';
	}
	else if(avg_val < 83.33){
		compatibility_bar = 'bar veryhigh';
		return 'Very HIGH';
	}
	else{
		compatibility_bar = 'bar super';
		return 'SUPER';
	}
}

function xpath(query) {
	return document.evaluate(query, document, null,9, null).singleNodeValue
}