// ==UserScript==
// @name           Dev_User_inf
// @namespace      Dev_User_inf
// @version        3.31
// @description    displays current status of users and if you're watched by them
// @include        http://*.deviantart.com/*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @grant          GM_registerMenuCommand
// @grant          GM_log
// ==/UserScript==

(function(){

var $=unsafeWindow.jQuery,holder,query,offset,fPage,pPage,lPage;
if(typeof $ == "undefined")return;

// var ownusername=$("td#oh-menu-deviant.oh-hasmenu a.oh-l b");
var ownusername=$("td#oh-menu-deviant span.username-with-symbol span.username");
if(ownusername.length==0){GM_log("Not logged in!");return true;}
var fremdusername=$("div#deviant.bubbleview div.catbar div.gruserbadge h1 a.u");
var watchbutton=$("div#deviant.bubbleview div.catbar div.gmbutton2town a.devwatch");
	
var imgoff="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs%2B9AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKEAY7AeG8qm4AAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAMpJREFUGNONkEsKwkAMQN%2B0MwyWCgqCgivxLO68gWtv5VK8g0fwJm7U0g46Y61xM36qG7NJAi8JeYp2yFevfgpAdtMp%2FfGY7nCIsZbBev1ikie0zXNsltHp9chGI%2FLJBLdcvq4kgGzimAKUCEqEVIQE2M9mAKIBGuDqPVfnCEWBt5b76UTjHKEsAdAANRBuN6rDAa014j3aGBrvOR%2BPb%2FAOXIC0LJG6xhcFRmuaELhUVetrWQEW6MScxgXzaKelZxUnTQQXHwrVv8IfaUNM0cocy0wAAAAASUVORK5CYII%3D";
var imgsemioff="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs%2B9AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKEAY7EfwLugoAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAN9JREFUGNONkD1PwzAQhh%2FHNm6j8lEJCSTEgPgtbOwMzP1DnTMiRnYmZv4EMxICShOIncQ%2BBotWgYVb7kPPvad7FeOQX736UwDy%2BHDOfH7C7v4R1jgOT282TPED3d%2FNcJOSaXlAWR4z2zujeVlsrhSA3FagVF5VSlBK0FooCnh%2BugAQAxAjdJ2n6xqCX%2BF3HCm%2BE4eGENYAGIC%2BhxAG6voVYwySPMZa4uD5%2BnzbgilB60F%2FrJHU49sV1hriEGjbevS1VEtwDqaTnLXOApdXmRvZUy3zxNoMXi%2B2Yuq%2Fhn8D%2B3VTT5NgdoYAAAAASUVORK5CYII%3D";
var imgon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs%2B9AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKEAY7Hxuzlw0AAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAN5JREFUGNONkE1KxEAQhb9KumkyjDMK4ogKIt7AO7hz6c61F%2FAybmYp3sEjeBMRjPkb0z2xUy6iM0Q3FhRUwffqUU8Yl%2F7a5c8A6MXzOUd7xxzsLHDWcb%2F%2FsGGSH%2BjkaUrmJsyzXRaTQ06nZ9w1txuXBND547dOQEWHThUSuH65BFADQIR27VmtG8pQ8OodRf%2FOKjZUoQLAAGgHMXyS128YYwjqscYSoif%2FyLcgPWgLVVrRaUfpC4w1hBio23r0tc6WIA4kAxxICtpDcTVwo3hmy0EqFkihvNkek%2F8G%2FgW%2BtFLworTnTAAAAABJRU5ErkJggg%3D%3D";
var imgunknown="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs%2B9AAAAAXNSR0IArs4c6QAAAAZiS0dEABgA%2FwAAF0tT0QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKEAcALe4UQ4IAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAPdJREFUGNONkDGKg0AYhb%2FJ7BSCrmRxQUi%2FZQ6QKqTODUI6U%2BQKOYu1d7BIG%2FAgKVYtRIVxlMlssUTY3Wb%2F6v3weLz3CX6e%2B%2FWLPwJwRVGwXC4JggClFFEUzZ6XpynPcz4uF7y%2BRzqHO5%2Fp%2Bx7f9x0gBOCyLCOKIuIw5G214tXz8Pd7huuVtm2J4%2Fg70VrLOI6YxQKjNWQZZrdDa40xBoAFwDRNGGPouo7345E%2BDPk8nWiahrZtmTs%2BHg%2B01kgpuW82NOs1qq6x1qK1nhNFkiQMw0DXdfi3G3VdU5YlVVWx3W55jpnxpGmKEAKlFFJKDofDjEf8F%2FgX0SVoPY%2F8D9EAAAAASUVORK5CYII%3D";
var imgwarte="data:image/gif;base64,R0lGODlhEAAQAMZgAAAAAE5gVVBiVlpsYFtsYFtsYVttYVxtYVxuYWJzZ2N0Z2N0aGh4bGd5bGh5bGh5bWl5bWl6bWl6bm19cGx%2BcGx%2BcW1%2BcW5%2Bcm5%2FcnSFd3WFeHWFeXWGeXaGeXaGeneGenaHeXiIe3iJe3iJfHmKfHqKfHmLfX6PgX%2BQgoCQgoCQg4CRgoKShIOThYSUhoWUh4WVh4WWiIaWh4aWiYeWiIiXiYeYiomYiomai4uajIqbjIubjIybjYucjYycjo%2BfkJCgkZGgkpKhk5GikpGik5Kik5Oik5OilJSilJKjk5SjlJall5aml5emmJinmJinmZqqm5yrnJysnZ2snJ2snZ6snp6tnZ6tnp6unp%2Bun6Cun6CvoKKyo6Ozo6WzpKW0pMXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwiH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhFDcmVhdGVkIHdpdGggR0lNUAAh%2BQQFCgB%2FACwAAAAAEAAQAAAHtYB%2FgoMAhYWDiIKFXVoAVVuHiQBfVk1HAEBJTlcAiABeUEUAMgAtADxIUZ2KVEI2KCQAICUrOJeKXEwAKBoWABAXHwA%2BT50AWUIvIhUJAAcLGCY0SsaFLBkMAwACCBIehn8AUj8sGg0DAQIHER8uQcZYQgAhEwkEBQoXADPUiks5JzRQYODAQgcVPVaFmzKkBoARGjYASHHDiMJwUITogFEqxg6LicIBYEIE06WLkgyhDMlyUCAAIfkEBQoAfwAsCAACAAMABAAABw2Af38ALS1%2FHAB%2FD4mBACH5BAUKAH8ALAgAAgAGAAYAAAcVgH9%2FSYKFhn8ghxCCAAAGf42MAIaBACH5BAUKAH8ALAoABQAEAAMAAAcLgH%2BCPgsYggCIAIEAIfkEBQoAfwAsCgAHAAQAAwAABwyACBIefwAAf4iFAIEAIfkEBQoAfwAsCAAHAAYABgAABxWAfwJ%2FhH8AfwcRhYeEM4aFkJGMf4EAIfkEBQoAfwAsCAAJAAMABAAABwyAAAV%2FAA6Ef4h%2FMYEAIfkEBQoAfwAsBgAJAAMABAAABwyAfwAEggx%2FfxoAh4EAIfkEBQoAfwAsAwAHAAYABgAABxaAf4J%2FAACChX8BiH8Jg4IUjpF%2FOoKBACH5BAUKAH8ALAMABwAEAAMAAAcMgACCAH9%2FGg1ChX%2BBACH5BAUKAH8ALAMABQAEAAMAAAcMgAAAf4R%2Fgn8sGQyBACH5BAEKAH8ALAMAAgAGAAYAAAcUgH%2BCAIKFhoWETIiFIhV%2FhIUDf4EAOw%3D%3D";

var ind=new Array("minute","hour","day","week","month","year");
var umr=new Array(1,60,24*60,7*24*60,30*24*60,356*24*60); //just used for friends-list as there only 
var watchlist=new Array();
var friendlist=new Array();
var lastactivelist=new Array();
var full=false;
if(GM_getValue("watcher_full")){var full=GM_getValue("watcher_full");}
if(!full&&GM_getValue("watchlist")&&GM_getValue("watchlist")!="none"){watchlist=GM_getValue("watchlist").split(" + ");}
if(!full&&GM_getValue("friendlist")&&GM_getValue("friendlist")!="none"){friendlist=GM_getValue("friendlist").split(" + ");}
var aktwat=false;
var ende=false;
var aktfriend=false;
if(typeof GM_getValue("offbut") == 'undefined'){GM_setValue("offbut","checked");}
if(typeof GM_getValue("watch_display") == 'undefined'){GM_setValue("watch_display","text");}
if(typeof GM_getValue("offakt") == 'undefined'){GM_setValue("offakt",60);}
if(typeof GM_getValue("offletzt") == 'undefined'){GM_setValue("offletzt",0);}
if(typeof GM_getValue("watchlist") == 'undefined'){GM_setValue("watchlist","none");}
if(typeof GM_getValue("friendlist") == 'undefined'){GM_setValue("friendlist","none");GM_setValue("offletzt",0);}
if(typeof GM_getValue("addwatchbut") == 'undefined'){GM_setValue("addwatchbut","");}
if(typeof GM_getValue("hidenotwatch") == 'undefined'){GM_setValue("hidenotwatch","");}

if(!GM_getValue || (GM_getValue.toString && GM_getValue.toString().indexOf("not supported")>-1)){
	var hint = document.createElement('div');
	hint.setAttribute('style',"font:10pt Verdana,Arial,Helvetica,sans-serif!important;background-color:#FFF;left:"+ ((window.innerWidth - 600)/2 - 20) +"px;top:"+ ((window.innerHeight - 150)/2 - 20) +"px;width:600px;height:150px;padding:10px;border:1px double black;position:absolute;z-index:999;");
	hint.id="devhint";
	hint.innerHTML="You are using Dev_User_inf without a proper Greasemonkey-workaround!<br /><br /> if you are using Chrome, please <b>uninstall the script</b> again and use a script handler like described here: <a href=http://dediggefedde.deviantart.com/journal/44357409/>http://dediggefedde.deviantart.com/journal/44357409/</a> !<br /> If you are using Opera, please use the GM-workaround-scripts like I described here: <a href=http://dediggefedde.deviantart.com/journal/44357409/>http://dediggefedde.deviantart.com/journal/44357409/</a><br /><p style='text-align:center' ><a style='cursor:pointer;' onclick='document.body.removeChild(document.getElementgetElementById(\"devhint\"));'>Close</a></p>";
	document.body.appendChild(hint);	
	return;
}

function optionwindow(){
	$("#devopts").remove();
	var opt = document.createElement('div');
	opt.id="devopts";
	opt.setAttribute('style',"font:10pt Verdana,Arial,Helvetica,sans-serif!important;background-color:#FFF;left:"+ ((window.innerWidth - 300)/2 - 20) +"px;top:"+ ((window.innerHeight - 250)/2 - 20) +"px;width:300px;height:350px;padding:10px;border:1px double black;position:absolute;z-index:999;");
	var ins="";var ins2="";
	if(GM_getValue("offbut")){ins=GM_getValue("offbut");}
	if(GM_getValue("watch_display")!="text"){ ins2="checked";}
	
	var checkd=new Array("","","","","","");
	if(!GM_getValue("offdur")){GM_setValue("offdur",3);}
	checkd[parseInt(GM_getValue("offdur"))]="checked";
	opt.innerHTML="<h2 align='center'>Options</h2>"+
	"<div style='width:150px;padding-bottom:10px;float:left;'>Time untill red status</div>"+
	"<div style='width:130px;padding-bottom:10px;padding-right:10px;float:right;'>"+
	"<input type='radio' name='dev_time' "+checkd[0]+" value='0'> Minutes<br />"+
	"<input type='radio' name='dev_time' "+checkd[1]+" value='1'> Hours<br />"+
	"<input type='radio' name='dev_time' "+checkd[2]+" value='2'> Days<br />"+
	"<input type='radio' name='dev_time' "+checkd[3]+" value='3'> Weeks<br />"+
	"<input type='radio' name='dev_time' "+checkd[4]+" value='4'> Months<br />"+
	"<input type='radio' name='dev_time' "+checkd[5]+" value='5'> Years<br />"+
	"</div><br style='clear:both;' />"+
	"<div style='width:150px;padding-bottom:10px;float:left;'>Duration to update Watch-List</div>"+
	"<div style='width:130px;padding-bottom:10px;padding-right:10px;float:right;'><input style='width:40px;' type='text' id='dev_offakt' value='"+GM_getValue('offakt')+"'/> Minutes</div>"+
	"</div><br style='clear:both;' />"+
	"<div style='width:150px;padding-bottom:10px;float:left;'><label for='dev_addwatchbut'>Extra watch-button!</label></div>"+
	"<div style='width:130px;padding-bottom:10px;padding-right:10px;float:right;'><input style='width:40px;' type='checkbox' id='dev_addwatchbut' "+GM_getValue('addwatchbut')+"/></div>"+
	"<br style='clear:both;' /><br />"+
	"<div style='width:150px;padding-bottom:10px;float:left;'><label for='dev_hidenotwatch'>Hide Not-Watching button!</label></div>"+
	"<div style='width:130px;padding-bottom:10px;padding-right:10px;float:right;'><input style='width:40px;' type='checkbox' id='dev_hidenotwatch' "+GM_getValue('hidenotwatch')+"/></div>"+
	"<br style='clear:both;' /><br />"+
	"<input type='button' value='Save' id='devoptsav' style='margin-left:80px;' />"+
	"<input type='button' value='Cancel' id='devoptcan' style='margin-left:30px;' />";
	document.body.appendChild(opt);	
	$("#devoptsav").click(function(){setTimeout(optsav,0);});
	$("#devoptcan").click(function(){setTimeout(optcan,0);});
}

function optcan(){
	$("#devopts").remove();
}

function optsav(){
	GM_setValue("offdur",$("input[name='dev_time']:checked").val());
	if($('#dev_offbut:checked').length!=0){GM_setValue('offbut',"checked");}else{GM_setValue('offbut',"");}
	
	GM_setValue('offakt',$('#dev_offakt').val());
	if($('#dev_offdisp:checked').length!=0){GM_setValue("watch_display","image");}else{GM_setValue("watch_display","text");}	
	
	GM_setValue('addwatchbut',$("#dev_addwatchbut:checked").length!=0?"checked=\"checked\"":"")
	GM_setValue('hidenotwatch',$("#dev_hidenotwatch:checked").length!=0?"checked=\"checked\"":"")
	
	$("#devopts").remove();
}

function act(){
	if(typeof GM_getValue("offdur") == 'undefined'){GM_setValue("offdur",3);}
	var activity=$("#super-secret-activity div.pbox strong").html();
	var img="";
	var textactivity="";
	var sum=0;
	for(var x=parseInt(GM_getValue("offdur"));x<6;x++){
		sum+=activity.indexOf(ind[x]);
	}
	if(sum!=-(x-GM_getValue("offdur"))){img=imgoff;textactivity=activity;}else{
		if(activity.indexOf("Online")!=-1&&activity.indexOf("<span")==-1){img=imgon;textactivity="online";}else{
			if(activity.indexOf("Unknown")!=-1){img=imgunknown;textactivity="invisible";}else{img=imgsemioff;textactivity=activity;}
		}
	}
	fremdusername.after("<img id='dui_act' title='"+textactivity+"' src=\""+img+"\" />");
}

function style(){
	var style = document.createElement("style");
	style.type = "text/css";
	style.innerHTML = "#dui_act {padding-bottom: 10px;}"+
	".wart{background-image:url("+imgwarte+")!important;background-position: 0px!important;background-repeat: no-repeat!important;}";
	$("head").append(style);
}

function changeprofile(name){
	if(aktfriend){setTimeout(function(){changeprofile(name)},500);return;}
	if(typeof GM_getValue("offbut") == 'undefined'){GM_setValue("offbut","checked");}
	var watch=friendlist.indexOf(name.toLowerCase())!=-1;
	var watched=watchlist.indexOf(name.toLowerCase())!=-1;
	var status=false;
	var insert="";
	
	if(watched&&watch){	
		status=addstat="Mutual Watchers";
		color="green";
	}else if(watched&&!watch){		
		status=addstat="Watch back";	
		color="green";
	}else if(!watched&&watch){		
		status="Watching";
		addstat="Not watching you";
		color="";
	}else if(!watched&&!watch){
		status="Watch";
		addstat="Not watching you";
		color="";
	};	
		
	if(full){
		watchbutton.find("i").removeClass("wart");
	}else{
		watchbutton.find("i").addClass("wart");
	}

	if(GM_getValue("addwatchbut")=="")	
		watchbutton.attr("title",status).find("span").html(status);
	else{
		$("#dev_addwbut").remove();
		if(watched||GM_getValue("hidenotwatch")=="")watchbutton.clone(true,true).attr("id","dev_addwbut").attr("class",color+" devwatch gmbutton2 gmbutton2qn2r").insertBefore(watchbutton).find("span").html(addstat);
	}
}

function getfriends(offset){
	aktfriend=true;
	if(offset==0)friendlist=new Array();
	GM_xmlhttpRequest({
        method: 'GET',
        url: "http://www.deviantart.com/global/difi.php?c[]=Friends;getFriendsMenu;0,"+offset+"&t=xml&t=json",
        // url: "http://www.deviantart.com/global/difi/?c[]=\"Friends\",\"getFriendsList\",[true,\""+offset+"\"]&t=json",
        onload: function (responseDetails) {	
			var resp=eval('(' + responseDetails.responseText + ')');
			var currow="";
			var i=0;
			// while(currow=resp.DiFi.response.calls[0].response.content.Unsorted[i]){
			while(currow=resp.DiFi.response.calls[0].response.content.friends[i]){
				friendlist.push(currow.username.toLowerCase());
				lastactivelist.push(currow.lastvisit);
				i++;
			}
			GM_setValue("friendlist",friendlist.join(" + "));
			// if(resp.DiFi.response.calls[0].response.content.Unsorted.length!=0){
			if(resp.DiFi.response.calls[0].response.content.friends.length!=0){
				getfriends(offset+1);
			}else{
				aktfriend=false;
			}
		}
	});
}
function getwatched(offset, by, who) {
	GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://'+by+".deviantart.com/friends/?offset="+offset,
        onload: function (responseDetails) {	
			var rex = /class='u' href='http:\/\/([^\.]*)\.deviantart\.com/gi;
			var iter="";
			while(iter = rex.exec(responseDetails.responseText)){
				watchlist.push(iter[1].toLowerCase());
			}
			if(!aktwat&&watchlist.indexOf(who.toLowerCase())!=-1){changeprofile(who);aktwat=true;}
			if(responseDetails.responseText.search(new RegExp('<a class="disabled">Next</a>',"i"))==-1){
				watchbutton.attr("title","analyzing watcher "+offset+"+");
				GM_setValue("watcher_offset",offset);
				GM_setValue("watchlist",watchlist.join(" + "));	
				if(!GM_getValue("watchlist")){GM_setValue("watchlist","none");}
				getwatched(offset+200, by,who);
			}else{
				full=true;				
				GM_setValue("watcher_offset",0);
				GM_setValue("watcher_full",true);
				GM_setValue("watchlist",watchlist.join(" + "));
				if(!GM_getValue("watchlist")){GM_setValue("watchlist","none");}
				if(fremdusername.length!=0){
					changeprofile(who);
				}
			}
        }
    });
}

function ladewatchlist(){
	if(!full || (parseInt(GM_getValue("offletzt"))+parseInt(GM_getValue("offakt")))<=Math.round(new Date().getTime()/1000/60)){	
		var offs=0;
		if(GM_getValue("watcher_offset")){offs=GM_getValue("watcher_offset");}
		full=false;
		getfriends(0);
		GM_setValue("watcher_full",false);
		getwatched(offs,ownusername.html(),fremdusername.html());
		// getwatched(offs,"ginkgografix",fremdusername.html());
		GM_setValue("offletzt",Math.round(new Date().getTime()/1000/60));
	}else{
		var tempwatch=GM_getValue("watchlist");
		if(typeof tempwatch!="undefined"&&tempwatch!="none"){watchlist=tempwatch.split(" + ");}
		var tempwatch=GM_getValue("friendlist");
		if(typeof tempwatch!="undefined"&&tempwatch!="none"){friendlist=tempwatch.split(" + ");}
		changeprofile(fremdusername.html());
	}
}
function pInt(val){
	if(typeof val=="undefined")return 0;
	return parseInt(val);
}
function highlightlist(){
	if(aktfriend)return;
		$("table#deviantlist.zebra tr.friend td.l span.a a.username:not([dev_user_inf])").each(function(){
		var el=$(this);
		setTimeout(function(){
			var offdur=3;
			if(typeof GM_getValue("offdur") == 'undefined'){GM_setValue("offdur",3);}else{offdur=GM_getValue("offdur");}
			
			var friendid=friendlist.indexOf(el.html().toLowerCase());		
			var activity=lastactivelist[friendid];
			if(friendid==-1){
				// GM_log('http://'+el.html().toLowerCase()+".deviantart.com");
				// setTimeout(function(){
				// $.get( 'http://'+el.html().toLowerCase()+".deviantart.com",function(data){GM_log(data);});
					GM_xmlhttpRequest({
						method: 'GET',
						url: 'http://'+el.html().toLowerCase()+".deviantart.com",
						onload: function (responseDetails) {	
							var resptext=$(responseDetails.responseText).find("#super-secret-activity div.pbox strong").html();
							friendlist.push(el.html().toLowerCase());
							if(resptext.indexOf("Online")!=-1)lastactivelist.push("Online");else
							if(resptext.indexOf("Unknown")!=-1)lastactivelist.push("Invisible");else
							if(resptext.indexOf("week")!=-1)lastactivelist.push(resptext.match(/\d+/)+"w");else
							if(resptext.indexOf("day")!=-1)lastactivelist.push(resptext.match(/\d+/)+"d");else
							if(resptext.indexOf("minute")!=-1)lastactivelist.push(resptext.match(/\d+/)+"m");else
							if(resptext.indexOf("hour")!=-1)lastactivelist.push(resptext.match(/\d+/)+"h");else
							if(resptext.indexOf("second")!=-1)lastactivelist.push(resptext.match(/\d+/)+"s");else
							if(resptext.indexOf("month")!=-1)lastactivelist.push(resptext.match(/\d+/)*7+"w");
							// GM_log(responseDetails.responseText);
							// GM_log(lastactivelist);
						}
					});
				// },0);
				return;
			}
			el.attr("dev_user_inf",true);
			var img="";
			var textactivity="";
			var sum=0;
			var rex=/^(?:(\d+)w)? ?(?:(\d+)d)? ?(?:(\d+)h)? ?(?:(\d+)m)? ?(?:(\d+)s)?$/;
			var ex=rex.exec(activity);
			if(!ex){
				if(activity=="Invisible"){
					img=imgunknown;textactivity="Invisible";
				}else if(activity=="Online"||activity=="Idle"){
					img=imgon;textactivity="Online";				
				}else{
					img=imgoff;textactivity=activity;
				}
			}else{
				var time=new Date();
				time.setDate(time.getDate()-pInt(ex[1])*7-pInt(ex[2]));
				time.setHours(time.getHours()-pInt(ex[3]));
				time.setMinutes(time.getMinutes()-pInt(ex[4]));
				time.setSeconds(time.getSeconds()-pInt(ex[5]));
				var gtime=new Date();
				// var ind=new Array("minute","hour","day","week","month","year");				
				if(offdur==5)gtime.setMonth(gtime.getMonth()-12);else
				if(offdur==4)gtime.setMonth(gtime.getMonth()-1);else
				if(offdur==3)gtime.setDate(gtime.getDate()-7);else
				if(offdur==2)gtime.setDate(gtime.getDate()-1);else
				if(offdur==1)gtime.setHours(gtime.getHours()-1);else
				if(offdur==0)gtime.setMinutes(gtime.getMinutes()-1);
				textactivity=activity;	
				if(gtime<=time){
					img=imgsemioff;			
				}else{
					img=imgoff;			
				}				
			}
			el.append("<img id='dui_act' title='"+textactivity+"' src=\""+img+"\" />");
		},0);
		})
}
	if(window.location.href.search("/deviants/")!=-1){
		setTimeout(function(){getfriends(0);},0)
		highlightlist();
		setInterval(highlightlist,1000);
	}
	
	if(fremdusername.length!=0){
		watchbutton.find("i").addClass("wart");
		act();
		style();
		ladewatchlist();
		if(fremdusername.html()==ownusername.html()){
			var buttonbar=$("div.gmbutton2town.moarbuttons");
			buttonbar.prepend('<a id="dui_watch" class="gmbutton2 gmbutton2qn2r" style="cursor:pointer;" title="dev_user_inf settings"><i class="icon i52"></i><em></em><span>Settings</span><b></b></a>');

			$("#dui_watch").click(function(){setTimeout(optionwindow,0);});
			GM_registerMenuCommand("Dev_User_inf Options", optionwindow,"N","","D");
		}
	}
	
})();