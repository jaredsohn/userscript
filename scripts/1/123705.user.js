// ==UserScript==
// @name           ETI MAL Integration
// @namespace      pendevin
// @description    Integrates MyAnimeList anime history into posts
// @include        http://endoftheinter.net/inboxthread.php*
// @include        http://boards.endoftheinter.net/postmsg.php*
// @include        http://boards.endoftheinter.net/showmessages.php*
// @include        https://endoftheinter.net/inboxthread.php*
// @include        https://boards.endoftheinter.net/postmsg.php*
// @include        https://boards.endoftheinter.net/showmessages.php*
// @require        http://code.jquery.com/jquery-2.1.0.min.js
// @version        3
// ==/UserScript==


//enter the characters you want to replace with your last watched show
//MAKE SURE THIS IS UNIQUE IN YOUR SIG
const EPISODE_REPLACER='/et';

//enter the characters you want to replace with your episode count for the day
//MAKE SURE THIS IS UNIQUE IN YOUR SIG
const COUNT_REPLACER='/ec';

//enter the url for your MyAnimeList history page
//if you only want to use anime or manga updates, add /anime or /manga to the end of the url
const HISTORY_URL='http://myanimelist.net/history/pendevin';

//ll breaks without noconflict jquery
this.$=this.jQuery=jQuery.noConflict(true);

//i got this from shoecream's userscript autoupdater at http://userscripts.org/scripts/show/45904
var XHR={
	// r.doc is the returned page
	// r.respose is the response element
	createDoc:function(response,callback,optional){
		var doc=document.implementation.createDocument('','',null);
		var html=document.createElement("html");
		html.innerHTML=response.responseText;
		doc.appendChild(html);
		var r={};
		r.response=response;
		r.doc=doc;
		callback(r,optional);
	},

	//sends the XHR request, callback is the function to call on the returned page
	get:function(url,callback,optional){
		if(optional==undefined)optional=null;
		GM_xmlhttpRequest({
			method:'GET',
			url:url,
			headers:{
				'User-Agent':navigator.userAgent,
				'Content-Type':'application/x-www-form-urlencoded',
				'Host':'myanimelist.net',
				'Accept':'image/gif, image/x-xbitmap, image/jpeg, image/pjpeg, */*',
				'Pragma':'no-cache'
			},
			onload:function(r){XHR.createDoc(r,callback,optional);}
		});
	}
};

//finds the last index of a regular expression value
//takes a string and a regex object
//kinda slow :(
function reLastIndex(string,regex){
	var index=-1;
	//we're going backwards from the end and searching for the first occurrence we find
	for(var i=string.length-1;i>0;i++){
		//once we find it, we're outta here
		if(string.substring(i).search(regex)!=-1){
			index=i;
			break;
		}
	}
	return index;
}

function reEscape(str){
	var specials=new RegExp("[.*+?|()\\[\\]{}\\\\]","g"); // .*+?|()[]{}\
	return str.replace(specials,"\\$&");
}

//parse a mal date into a javascript date thingy
//takses a string, motherfucker, and returns a Date object
function parseMalDate(time){
	var now=new Date;
	var clock;
	//some date case
	if(time.match(/\d\d-\d\d-\d\d,/)){
		clock=time.match(/(\d\d)-(\d\d)-(\d\d), (\d\d?):(\d\d) ([AP]M)/);
		//adjust for am/pm
		clock[4]=parseInt(clock[4]!=12?clock[4]:0)+(clock[6]=='PM'?12:0);
		//date object is (year (4 digits), month (0-11), date (1-31), hour (0-23), minute (0-59), second (0-59))
		return new Date(2000+parseInt(clock[3],10),parseInt(clock[1],10)-1,parseInt(clock[2],10),clock[4],parseInt(clock[5]));
	}
	//some time yesterday case
	else if(time.match(/Yesterday,/)){
		clock=time.match(/Yesterday, (\d\d?):(\d\d) ([AP]M)/);
		clock[1]=parseInt(clock[1]!=12?clock[1]:0)+(clock[3]=='PM'?12:0);
		return new Date(now.getFullYear(),now.getMonth(),now.getDate()-1,clock[1],parseInt(clock[2]));
	}
	//some time today case
	else if(time.match(/Today,/)){
		clock=time.match(/Today, (\d\d?):(\d\d) ([AP]M)/);
		clock[1]=parseInt(clock[1]!=12?clock[1]:0)+(clock[3]=='PM'?12:0);
		return new Date(now.getFullYear(),now.getMonth(),now.getDate(),clock[1],parseInt(clock[2]));
	}
	//hour(s) ago case
	else if(time.match(/hours? ago/)){
		return new Date(now.getTime()-parseInt(time.match(/\d\d?/))*3600000);
	}
	//minute(s) ago case
	else if(time.match(/minutes? ago/)){
		return new Date(now.getTime()-parseInt(time.match(/\d\d?/))*60000);
	}
	//second(s) ago case
	else if(time.match(/seconds? ago/)){
		return new Date(now.getTime()-parseInt(time.match(/\d\d?/))*1000);
	}
	return now;
}

//figure out how long ago something was, with expanding time scales
//takes a Date object!!, and tells you how long ago it was in the form ' (<time(s)> ago)''
//now returns an object with the numeral ago and the unit as attributes
function differenceEngine(then){
	var diff={
		diff:new Date().getTime()-then.getTime()
	};
	//days difference
	if(diff.diff>86400000){
		diff.numeral=(diff.diff-diff.diff%86400000)/86400000;
		diff.unit='day'+(diff.numeral>1?'s':'');
	}
	//hours difference
	else if(diff.diff>3600000){
		diff.numeral=(diff.diff-diff.diff%3600000)/3600000;
		diff.unit='hour'+(diff.numeral>1?'s':'');
	}
	//minutes difference
	else if(diff.diff>60000){
		diff.numeral=(diff.diff-diff.diff%60000)/60000;
		diff.unit='minute'+(diff.numeral>1?'s':'');
	}
	//seconds difference
	else if(diff.diff>1000){
		diff.numeral=(diff.diff-diff.diff%1000)/1000;
		diff.unit='second'+(diff.numeral>1?'s':'');
	}
	//guess it could have been less than a second ago but i can't imagine why
	else{
		diff.numeral=1;
		diff.unit='second';
	}
	return diff;
}

//when you get the history response, insert that info into the quickpost box
function malShit(r){
	var doc=$(r.doc);
	//do shit
	//make sure there's a history
	if(doc.find('#horiznav_nav').next().text()=='No history found'){
		return null;
	}
	//grab the rows and shit
	var episodes=doc.find('#horiznav_nav + div tr');
	//find most recent anime update
	var anime={
		raw:episodes.has('td.borderClass:contains(" ep. ")').first()
	};
	//parse anime update
	if(anime.raw[0]){
		anime.name=anime.raw.find('td:first-child>a').text();
		anime.link=anime.raw.find('td:first-child>a').attr('href');
		anime.episode=anime.raw.find('td:first-child>strong').text();
		anime.date=parseMalDate(anime.raw.find('td:last-child').text().substring(5));
		anime.elapsed=differenceEngine(anime.date);
		anime.type='anime';
	}
	//find most recent manga update
	var manga={
		raw:episodes.has('td.borderClass:contains(" chap. ")').first()
	};
	//parse manga update
	if(manga.raw[0]){
		manga.name=manga.raw.find('td:first-child>a').text();
		manga.link=manga.raw.find('td:first-child>a').attr('href');
		manga.episode=manga.raw.find('td:first-child>strong').text();
		manga.date=parseMalDate(manga.raw.find('td:last-child').text().substring(5));
		manga.elapsed=differenceEngine(manga.date);
		manga.type='manga';
	}
	//get today's ep count
	//make sure that it's actually today'
	var count={
		raw:episodes.find('div.normal_header:contains("Today") small'),
	};
	count.number=count.raw[0]?count.raw.text().slice(1,-1):"0";
	//which update is more recent and also really there
	//ugh this is ungainly
	var upd8=null;
	if(anime.raw[0]&&manga.raw[0]){
			if(anime.elapsed.diff<manga.elapsed.diff){
				upd8=anime;
			}
			else{
				upd8=manga;
			}
	}
	else if(anime.raw[0]){
		upd8=anime;
	}
	else if(manga.raw[0]){
		upd8=manga;
	}
	//now that we've extracted our data, check to see if it's different from what we've got
	if(upd8&&(cachedData.name!=upd8.name||cachedData.episode!=upd8.episode||count.number!=cachedData.count)){
		//if the episode changed
		if(upd8&&(cachedData.name!=upd8.name||cachedData.episode!=upd8.episode)){
			//cache our shit
			cachedData=upd8;
		}
		//i suck cocks
		cachedData.count=count.number;
		//make a display string i guess
		var display=cachedData.name+(cachedData.type=='anime'?' ep. ':' chap. ')+cachedData.episode+' ('+cachedData.elapsed.numeral+' '+cachedData.elapsed.unit+' ago)';
		//remember the quickpost box position
		var scrollPosition=quickpost.prop('scrollTop');
		var cursorStart=quickpost.prop('selectionStart');
		var cursorEnd=quickpost.prop('selectionEnd');
		//insert the shit
		//gotta do our stored shit because fucking cocks
		quickpost.val(quickpost.val().replace(rxCocks,'$1'+(quickpost.remember.replace(rxEpisode,'$1'+display+'$2').replace(rxCount,'$1'+cachedData.count+'$2'))));
		//restore the quickpost box position
		quickpost.prop('scrollTop',scrollPosition);
		quickpost.prop('selectionStart',cursorStart);
		quickpost.prop('selectionEnd',cursorEnd);
	}
	//save the data
	var gmCache={
		name:cachedData.name,
		link:cachedData.link,
		episode:cachedData.episode,
		date:cachedData.date.valueOf(),
		count:cachedData.count,
		type:cachedData.type
	}
	GM_setValue('cached',JSON.stringify(gmCache));
	return null;
}

//when the quickpost box opens, send off a request to mal for the history
function onFocus(e){
	//don't do this too often pls
	quickpost.off('focus.mal');
	//why the fuck doesn't this always work
	//maybe it has to do with gm hating event calls but not timeouts, which is whack
	if(!GM_getValue('test',true)){
		window.setTimeout(onFocus,500);
		return null;
	}
	//get a new elapsed time since now is different
	cachedData.elapsed=differenceEngine(new Date(cachedData.date));
	//make a display string i guess
	var display=cachedData.name!=''?
		cachedData.name+(cachedData.type=='anime'?' ep. ':' chap. ')+cachedData.episode+' ('+cachedData.elapsed.numeral+' '+cachedData.elapsed.unit+' ago)':
		HISTORY_URL
	;
	//save the position of the cursor and scrollbar
	var scrollPosition=quickpost.prop('scrollTop');
	var cursorStart=quickpost.prop('selectionStart');
	var cursorEnd=quickpost.prop('selectionEnd');
	//remember quickpost value because cocks
	quickpost.remember=quickpost.val().match(rxCocks)[2];
	//insert our data
	quickpost.val(quickpost.val().replace(rxEpisode,'$1'+display+'$2').replace(rxCount,'$1'+cachedData.count+'$2'));
	//restore the position of the cursor and scrollbar
	quickpost.prop('scrollTop',scrollPosition);
	quickpost.prop('selectionStart',cursorStart);
	quickpost.prop('selectionEnd',cursorEnd);
	//send off our get request to mal
	XHR.get(HISTORY_URL,malShit);
	return null;
}

//find the quickpost box and listen for it to open
//this gets the quickpost box and also the message box on postmsg.php
var quickpost=$('.quickpost textarea[name="message"], textarea#message');
//null data
var cachedData=JSON.parse(GM_getValue('cached','{"name":"","episode":"","date":0,"count":"0"}'));
//make a regexps
var rxEpisode=new RegExp('(---[\\w\\W]+)'+reEscape(EPISODE_REPLACER)+'([\\w\\W]*)');
var rxCount=new RegExp('(---[\\w\\W]+)'+reEscape(COUNT_REPLACER)+'([\\w\\W]*)');
var rxCocks=new RegExp('([\\w\\W]*)(---[\\w\\W]+)');
//listen for shit
quickpost.on('focus.mal',onFocus);
//reinitialize after posting
$('form.quickpost input[name="post"]').on('click.mal',function(){
	quickpost.on('focus.mal',onFocus);
});