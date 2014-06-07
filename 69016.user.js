// ==UserScript==
// @name           GaiaOnline - Dead Thread Alert
// @namespace      http://userscripts.org/users/126924
// @description    Notifies you if the current thread might be dead or zombified
// @include        http://www.gaiaonline.com/*/t.*
// @include        http://gaiaonline.com/*/t.*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var my_id = "deadThreadAlertBox";
var zombiecolor = "#81897a"; // per east sea gastrodon's suggestion
var deadcolor = "red";
var this_id; // the id of the thread

var ignoredThreads = [];

var jmi = "#"+my_id;

function createDiv(text,color){
	$("body").append("<div id=\""+my_id+"\"><span>"+text+"</span> <a>[Close alert]</a> <a>[Disable alerts for this thread]</a></div>");
	$(jmi).css({
		zIndex: "950",
		position: "fixed",
		height: "20px",
		border: "3px double black",
		background: color,
		textAlign: "center",
		top: "0px",
		right: "10%",
		left: "10%",
		color: "white",
		fontFamily: "Arial, sans-serif",
		fontVariant: "small-caps",
		fontSize: "15px",
		display: "none"
	});
	$(jmi+" a").css({fontSize: "12px"});
	$(jmi+" a:first").click(closeAlert);
	$(jmi+" a:last").click(ignoreThread);
	$(jmi).slideDown();
}

function closeAlert(){
	$(jmi).slideUp(function(){
		$(jmi).remove();
	});
}

function ignoreThread(){
	ignoredThreads.push(this_id);
	GM_setValue("ignored thread list",JSON.stringify(ignoredThreads));
	closeAlert();
}

// if the current page is not the last page of the thread, then fetch it instead.
function getLatestPage(){
	current_page = $(".page_current:first").text();
	if( current_page.length == 0 ) return; // somehow this is running on a non-thread page I suppose.
	last_page_link = $(".forum_detail_pagination a:not(.page_jump):last");
	
	if( current_page != $(last_page_link).text() ){
		// this means I must fetch the last page.
		$.get($(last_page_link).attr("href"),function(data){
			processContext(data);
		});
	}else{
		processContext($("body"));
	}
}

function processContext(context){
	firstTime = new Date($("span.date:first",context).text().substring(8));
	lastTime = new Date($("span.date:last",context).text().substring(8));
	nowTime = new Date();
	zTime = nowTime-firstTime;
	dTime = nowTime-lastTime;
	if( dTime >= GM_getValue("deathtime",10*60*1000) ){
		createDiv("This thread might be dead.",deadcolor);
	}else if( zTime >= GM_getValue("zombietime",24*60*60*1000) ){
		createDiv("This thread might be a zombie.",zombiecolor);
	}
}

function updateDeathTime(){
	var deathtime;
	do{
		deathtime = prompt("Please enter the time necessary to consider a thread dead.\nThe format should be a number followed by a unit (e.g. 10m).\nUnits allowed:\n\t(y)ear\n\t(w)eek\n\t(d)ay\n\t(h)our\n\t(m)inute");
	} while( deathtime != null && !/^[0-9]+(y|w|d|h|m)$/i.test(deathtime) );
	if(deathtime==null) return;
	parsed = /^([0-9]+)(y|w|d|h|m)$/i.exec(deathtime);
	deathtime = parsed[1];
	switch(parsed[2]){
		case 'y':
			deathtime *= 52;
		case 'w':
			deathtime *= 7;
		case 'd':
			deathtime *= 24;
		case 'h':
			deathtime *= 60;
		default:
			deathtime *= 60 * 1000;
	}
	GM_setValue("deathtime",deathtime);
}

function updateZombieTime(){
	var deathtime;
	do{
		deathtime = prompt("Please enter the time necessary to consider a thread zombied.\nThe format should be a number followed by a unit (e.g. 10m).\nUnits allowed:\n\t(y)ear\n\t(w)eek\n\t(d)ay\n\t(h)our\n\t(m)inute");
	} while( deathtime != null && !/^[0-9]+(y|w|d|h|m)$/i.test(deathtime) );
	if( deathtime == null ) return;
	parsed = /^([0-9]+)(y|w|d|h|m)$/i.exec(deathtime);
	deathtime = parsed[1];
	switch(parsed[2]){
		case 'y':
			deathtime *= 52;
		case 'w':
			deathtime *= 7;
		case 'd':
			deathtime *= 24;
		case 'h':
			deathtime *= 60;
		default:
			deathtime *= 60 * 1000;
	}
	GM_setValue("zombietime",deathtime);
}

temp = GM_getValue("ignored thread list");
if( temp != undefined ){
	ignoredThreads = JSON.parse(temp);
}

this_id = document.URL.match(/\/t\.([0-9]+)(_.*?)?\//)[1];

$(window).load(function(){
	if( ignoredThreads.indexOf( this_id ) == -1 ){
		getLatestPage();
	}
});

GM_registerMenuCommand("Change Death Time",updateDeathTime);
GM_registerMenuCommand("Change Zombie Time",updateZombieTime);