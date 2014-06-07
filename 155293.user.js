// ==UserScript==
// @name           OP_Dev_User_inf
// @namespace      Dev_User_inf
// @version        2.4
// @description    displays current status of users and if you're watched by them
// @include        http://*.deviantart.com/
// ==/UserScript==

(function(){
var $;
function start(){
var imgoff="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs%2B9AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKEAY7AeG8qm4AAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAMpJREFUGNONkEsKwkAMQN%2B0MwyWCgqCgivxLO68gWtv5VK8g0fwJm7U0g46Y61xM36qG7NJAi8JeYp2yFevfgpAdtMp%2FfGY7nCIsZbBev1ikie0zXNsltHp9chGI%2FLJBLdcvq4kgGzimAKUCEqEVIQE2M9mAKIBGuDqPVfnCEWBt5b76UTjHKEsAdAANRBuN6rDAa014j3aGBrvOR%2BPb%2FAOXIC0LJG6xhcFRmuaELhUVetrWQEW6MScxgXzaKelZxUnTQQXHwrVv8IfaUNM0cocy0wAAAAASUVORK5CYII%3D";
var imgsemioff="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs%2B9AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKEAY7EfwLugoAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAN9JREFUGNONkD1PwzAQhh%2FHNm6j8lEJCSTEgPgtbOwMzP1DnTMiRnYmZv4EMxICShOIncQ%2BBotWgYVb7kPPvad7FeOQX736UwDy%2BHDOfH7C7v4R1jgOT282TPED3d%2FNcJOSaXlAWR4z2zujeVlsrhSA3FagVF5VSlBK0FooCnh%2BugAQAxAjdJ2n6xqCX%2BF3HCm%2BE4eGENYAGIC%2BhxAG6voVYwySPMZa4uD5%2BnzbgilB60F%2FrJHU49sV1hriEGjbevS1VEtwDqaTnLXOApdXmRvZUy3zxNoMXi%2B2Yuq%2Fhn8D%2B3VTT5NgdoYAAAAASUVORK5CYII%3D";
var imgon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs%2B9AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKEAY7Hxuzlw0AAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAN5JREFUGNONkE1KxEAQhb9KumkyjDMK4ogKIt7AO7hz6c61F%2FAybmYp3sEjeBMRjPkb0z2xUy6iM0Q3FhRUwffqUU8Yl%2F7a5c8A6MXzOUd7xxzsLHDWcb%2F%2FsGGSH%2BjkaUrmJsyzXRaTQ06nZ9w1txuXBND547dOQEWHThUSuH65BFADQIR27VmtG8pQ8OodRf%2FOKjZUoQLAAGgHMXyS128YYwjqscYSoif%2FyLcgPWgLVVrRaUfpC4w1hBio23r0tc6WIA4kAxxICtpDcTVwo3hmy0EqFkihvNkek%2F8G%2FgW%2BtFLworTnTAAAAABJRU5ErkJggg%3D%3D";
var imgunknown="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs%2B9AAAAAXNSR0IArs4c6QAAAAZiS0dEABgA%2FwAAF0tT0QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKEAcALe4UQ4IAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAPdJREFUGNONkDGKg0AYhb%2FJ7BSCrmRxQUi%2FZQ6QKqTODUI6U%2BQKOYu1d7BIG%2FAgKVYtRIVxlMlssUTY3Wb%2F6v3weLz3CX6e%2B%2FWLPwJwRVGwXC4JggClFFEUzZ6XpynPcz4uF7y%2BRzqHO5%2Fp%2Bx7f9x0gBOCyLCOKIuIw5G214tXz8Pd7huuVtm2J4%2Fg70VrLOI6YxQKjNWQZZrdDa40xBoAFwDRNGGPouo7345E%2BDPk8nWiahrZtmTs%2BHg%2B01kgpuW82NOs1qq6x1qK1nhNFkiQMw0DXdfi3G3VdU5YlVVWx3W55jpnxpGmKEAKlFFJKDofDjEf8F%2FgX0SVoPY%2F8D9EAAAAASUVORK5CYII%3D";
var imgwarte="data:image/gif;base64,R0lGODlhEAAQAMZgAAAAAE5gVVBiVlpsYFtsYFtsYVttYVxtYVxuYWJzZ2N0Z2N0aGh4bGd5bGh5bGh5bWl5bWl6bWl6bm19cGx%2BcGx%2BcW1%2BcW5%2Bcm5%2FcnSFd3WFeHWFeXWGeXaGeXaGeneGenaHeXiIe3iJe3iJfHmKfHqKfHmLfX6PgX%2BQgoCQgoCQg4CRgoKShIOThYSUhoWUh4WVh4WWiIaWh4aWiYeWiIiXiYeYiomYiomai4uajIqbjIubjIybjYucjYycjo%2BfkJCgkZGgkpKhk5GikpGik5Kik5Oik5OilJSilJKjk5SjlJall5aml5emmJinmJinmZqqm5yrnJysnZ2snJ2snZ6snp6tnZ6tnp6unp%2Bun6Cun6CvoKKyo6Ozo6WzpKW0pMXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwsXTwiH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhFDcmVhdGVkIHdpdGggR0lNUAAh%2BQQFCgB%2FACwAAAAAEAAQAAAHtYB%2FgoMAhYWDiIKFXVoAVVuHiQBfVk1HAEBJTlcAiABeUEUAMgAtADxIUZ2KVEI2KCQAICUrOJeKXEwAKBoWABAXHwA%2BT50AWUIvIhUJAAcLGCY0SsaFLBkMAwACCBIehn8AUj8sGg0DAQIHER8uQcZYQgAhEwkEBQoXADPUiks5JzRQYODAQgcVPVaFmzKkBoARGjYASHHDiMJwUITogFEqxg6LicIBYEIE06WLkgyhDMlyUCAAIfkEBQoAfwAsCAACAAMABAAABw2Af38ALS1%2FHAB%2FD4mBACH5BAUKAH8ALAgAAgAGAAYAAAcVgH9%2FSYKFhn8ghxCCAAAGf42MAIaBACH5BAUKAH8ALAoABQAEAAMAAAcLgH%2BCPgsYggCIAIEAIfkEBQoAfwAsCgAHAAQAAwAABwyACBIefwAAf4iFAIEAIfkEBQoAfwAsCAAHAAYABgAABxWAfwJ%2FhH8AfwcRhYeEM4aFkJGMf4EAIfkEBQoAfwAsCAAJAAMABAAABwyAAAV%2FAA6Ef4h%2FMYEAIfkEBQoAfwAsBgAJAAMABAAABwyAfwAEggx%2FfxoAh4EAIfkEBQoAfwAsAwAHAAYABgAABxaAf4J%2FAACChX8BiH8Jg4IUjpF%2FOoKBACH5BAUKAH8ALAMABwAEAAMAAAcMgACCAH9%2FGg1ChX%2BBACH5BAUKAH8ALAMABQAEAAMAAAcMgAAAf4R%2Fgn8sGQyBACH5BAEKAH8ALAMAAgAGAAYAAAcUgH%2BCAIKFhoWETIiFIhV%2FhIUDf4EAOw%3D%3D";

function eventmod(obj, event, callback){
	var bef="obj.";
	if(window.opera){
		bef+="on"+event+"=callback";
	}else{
		if(document.addEventListener){
			bef+="addEventListener('"+event+"',callback)";
		}else{	
			bef+="attachEvent('on"+event+"',callback)";
		}
	}
	eval(bef);
}

var ev = new XPathEvaluator();
var ind=new Array("minute","hour","day","week","month","year");
var watchlist="";
var full=false;
if(GM_getValue("watcher_full")){var full=GM_getValue("watcher_full");}
if(!full&&GM_getValue("watchlist")&&GM_getValue("watchlist")!="none"){watchlist=GM_getValue("watchlist");}
var aktwat=false;
var ende=false;
if(typeof GM_getValue("offbut") == 'undefined'){GM_setValue("offbut","checked");}
if(typeof GM_getValue("watch_display") == 'undefined'){GM_setValue("watch_display","text");}
if(typeof GM_getValue("offakt") == 'undefined'){GM_setValue("offakt",60);}
if(typeof GM_getValue("offletzt") == 'undefined'){GM_setValue("offletzt",0);}
if(typeof GM_getValue("watchlist") == 'undefined'){GM_setValue("watchlist","none");}

var availability= ev.evaluate("/html/body/div[2]/div/div/div[2]/div/div/div/div[4]/div/div/div/strong", document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);

if(!availability.singleNodeValue){setTimeout(start,1000);return;}

if(!GM_getValue || (GM_getValue.toString && GM_getValue.toString().indexOf("not supported")>-1)){
	var hint = document.createElement('div');
	hint.setAttribute('style',"font:10pt Verdana,Arial,Helvetica,sans-serif!important;background-color:#FFF;left:"+ ((window.innerWidth - 600)/2 - 20) +"px;top:"+ ((window.innerHeight - 150)/2 - 20) +"px;width:600px;height:150px;padding:10px;border:1px double black;position:absolute;z-index:999;");
	hint.id="devhint";
	hint.innerHTML="You are using Dev_User_inf without a proper Greasemonkey-workaround!<br /><br /> if you are using Chrome, please <b>uninstall the script</b> again and use a script handler like described here: <a href=http://dediggefedde.deviantart.com/journal/44357409/>http://dediggefedde.deviantart.com/journal/44357409/</a> !<br /> If you are using Opera, please use the GM-workaround-scripts like I described here: <a href=http://dediggefedde.deviantart.com/journal/44357409/>http://dediggefedde.deviantart.com/journal/44357409/</a><br /><p style='text-align:center' ><a style='cursor:pointer;' onclick='document.body.removeChild(document.getElementById(\"devhint\"));'>Close</a></p>";
	document.body.appendChild(hint);	
	return;
}

function optionwindow(){
	var opt = document.createElement('div');
	opt.id="devopts";
	opt.setAttribute('style',"font:10pt Verdana,Arial,Helvetica,sans-serif!important;background-color:#FFF;left:"+ ((window.innerWidth - 300)/2 - 20) +"px;top:"+ ((window.innerHeight - 350)/2 - 20) +"px;width:300px;height:350px;padding:10px;border:1px double black;position:absolute;z-index:999;");
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
	"<div style='width:150px;padding-bottom:10px;float:left;'>Show Not-Watching-Button</div>"+
	"<div style='width:130px;padding-bottom:10px;padding-right:10px;float:right;'><input id='dev_offbut' type='checkbox' "+ ins +" />"+
	"</div><br style='clear:both;' />"+
	"<div style='width:150px;padding-bottom:10px;float:left;'>Shorted watching-button</div>"+
	"<div style='width:130px;padding-bottom:10px;padding-right:10px;float:right;'><input id='dev_offdisp' type='checkbox' "+ ins2 +" />"+
	"</div><br style='clear:both;' />"+
	"<div style='width:150px;padding-bottom:10px;float:left;'>Duration to update Watch-List</div>"+
	"<div style='width:130px;padding-bottom:10px;padding-right:10px;float:right;'><input style='width:40px;' type='text' id='dev_offakt' value='"+GM_getValue('offakt')+"'/> Minutes</div>"+
	"<br style='clear:both;' /><br />"+
	"<input type='button' value='Save' id='devoptsav' style='margin-left:30px;' />"+
	"<input type='button' value='Cancel' id='devoptcan' style='margin-left:30px;' />";
	document.body.appendChild(opt);	
	// document.getElementById('devoptsav').addEventListener('click', optsav, false);
	eventmod(document.getElementById('devoptsav'),'click', optsav);
	// document.getElementById('devoptcan').addEventListener('click', optcan, false);
	eventmod(document.getElementById('devoptcan'),'click', optcan);
}

function optcan(){
	document.body.removeChild(document.getElementById("devopts"));
}

function optsav(){
	var time= ev.evaluate("//input[@name='dev_time']", document.documentElement, null,XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);	
	var timeset;
	timeset=time.iterateNext();
	while(timeset){
		if(timeset.checked){GM_setValue("offdur",timeset.value);}
		timeset=time.iterateNext();
	}	
	if(document.getElementById('dev_offbut').checked){GM_setValue('offbut',"checked");}else{GM_setValue('offbut',"");}
	
	GM_setValue('offakt',document.getElementById('dev_offakt').value);
	if(document.getElementById('dev_offdisp').checked){GM_setValue("watch_display","image");}else{GM_setValue("watch_display","text");}	
	
	document.body.removeChild(document.getElementById("devopts"));
}

function act(){
	if(typeof GM_getValue("offdur") == 'undefined'){GM_setValue("offdur",3);}
	var username= ev.evaluate("/html/body/div[2]/div/div/div/div[2]/h1", document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	username=username.singleNodeValue;
	var activity= ev.evaluate("/html/body/div[2]/div/div/div[2]/div/div/div/div[4]/div/div/div/strong", document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	activity=activity.singleNodeValue.innerHTML;
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
	username.innerHTML+="<img id='dui_act' title='"+textactivity+"' src=\""+img+"\" />";
}

function style(){
	var style = document.createElement("style");
	style.type = "text/css";
	style.innerHTML = "#dui_act {padding-bottom: 10px;}"+
	".wart{background-image:url("+imgwarte+")!important;background-position: 0px!important;background-repeat: no-repeat!important;}";
	document.getElementsByTagName("head")[0].appendChild(style);
}

function watch(watched){
	if(typeof GM_getValue("offbut") == 'undefined'){GM_setValue("offbut","checked");}
	var status="";
	var color="";
	var insert="";
	if(watched){
	status="Watching you";color="green"
	if(GM_getValue("watch_display")=="text"){insert=status;}else{insert="<i class='icon i18'></i>";}
	}else{
	status="Not watching you";
	if(GM_getValue("watch_display")=="text"){insert=status;}else{insert="No <i class='icon i18'></i>";}
	};	
	if(full){
	document.getElementById("dui_watch").innerHTML='<i class="icon i52"></i><em></em><span>'+insert+'</span><b></b>';
	}else{
	document.getElementById("dui_watch").innerHTML='<i class="icon i52 wart"></i><em></em><span>'+insert+'</span><b></b>';}
	
	document.getElementById("dui_watch").setAttribute("class","gmbutton2 gmbutton2qn2r "+color);
	document.getElementById("dui_watch").setAttribute("title",status);
	if(status=="Not watching you"&&GM_getValue("offbut")!="checked"){
		document.getElementById("dui_watch").parentNode.removeChild(document.getElementById("dui_watch"));
	}
}
function getwatched(offset, by, who) {
	$=window.jQuery;
	$.get('http://'+by+".deviantart.com/friends/?offset="+offset, function(data) {
		setTimeout(function(){
			var rex = /class='u' href='http:\/\/([^\.]*)\.deviantart\.com/gi;
			var iter="";
			while(iter = rex.exec(data)){
				watchlist+=iter[1] + " - ";
			}
			if(!aktwat&&watchlist.indexOf(who.toLowerCase())!=-1){watch(true);aktwat=true;}
			if(data.search(new RegExp('<a class="disabled">Next</a>',"i"))==-1){
				document.getElementById("dui_watch").getElementsByTagName('i')[0].setAttribute("title","analyzing watcher "+offset+"+");
				GM_setValue("watcher_offset",offset);
				GM_setValue("watchlist",watchlist);	
				if(!GM_getValue("watchlist")){GM_setValue("watchlist","none");}			
				getwatched(offset+200, by,who);
			}else{
				full=true;				
				GM_setValue("watcher_offset",0);
				GM_setValue("watcher_full",true);
				GM_setValue("watchlist",watchlist);
				if(!GM_getValue("watchlist")){GM_setValue("watchlist","none");}
				watch(watchlist.indexOf(who.toLowerCase())!=-1);
				// document.getElementById("dui_watch").getElementsByTagName('i')[0].setAttribute("class","icon i52");}
			}
		},0);
	});
}

var uswho= ev.evaluate("/html/body/div[2]/div/div/div/div[2]/h1/a", document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
var usby= ev.evaluate("/html/body/div/table/tbody/tr/td[4]/a/b", document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
var $;
if(uswho.singleNodeValue&&usby.singleNodeValue){
	$=window.jQuery;
	style();
	act();

	var buttonbar= ev.evaluate("//div[@class='gmbutton2town moarbuttons']", document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	buttonbar.singleNodeValue.innerHTML='<a id="dui_watch" class="gmbutton2 gmbutton2qn2r" title="Status:loading" style="cursor:pointer;"><i class="icon i52 wart"></i><em></em><span>Loading...</span><b></b></a>'+
	buttonbar.singleNodeValue.innerHTML;

	// document.getElementById('dui_watch').addEventListener('click', optionwindow, false);
	eventmod(document.getElementById('dui_watch'),'click', optionwindow);
	
	if(!full || (parseInt(GM_getValue("offletzt"))+parseInt(GM_getValue("offakt")))<=Math.round(new Date().getTime()/1000/60)){	
		$.ajax({url:"http://"+usby.singleNodeValue.innerHTML+".deviantart.com",headers:{Range:0-1}}).done(function(){
			setTimeout(function(){
				var offs=0;
				if(GM_getValue("watcher_offset")){offs=GM_getValue("watcher_offset");}
				full=false;
				GM_setValue("watcher_full",false);
				getwatched(offs,usby.singleNodeValue.innerHTML,uswho.singleNodeValue.innerHTML);
				// getwatched(offs,"migi47",uswho.singleNodeValue.innerHTML);
				GM_setValue("offletzt",Math.round(new Date().getTime()/1000/60));
			},0);
		}).fail(function(){
			setTimeout(function(){
			if(GM_getValue("watchlist")&&GM_getValue("watchlist")!="none"){watchlist=GM_getValue("watchlist");}else{
				alert("You will need to get/update the list from your profile-page as in the new Opera cross-site-requests are not allowed with the current dA-version.\n\nPlease visit your profile-page and wait until the list is loaded completly\nAfter that the script will work/display on other profiles again!");
				return;
			}
			watch(watchlist.indexOf(uswho.singleNodeValue.innerHTML.toLowerCase())!=-1);
			},0);
		});
	}else{
		if(GM_getValue("watchlist")&&GM_getValue("watchlist")!="none"){watchlist=GM_getValue("watchlist");}
		watch(watchlist.indexOf(uswho.singleNodeValue.innerHTML.toLowerCase())!=-1);
	}
	GM_registerMenuCommand("Dev_User_inf Options", optionwindow,"N","","D");
}else{
	setTimeout(start,1000);
}
}
function GM_wait() {
    if (window.opera) {
    var unsafeWindow=window;
    }
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; start(); }
    }
GM_wait();
})();