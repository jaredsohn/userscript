// ==UserScript==
// @name           Mousehunt Improver
// @namespace      MouseHunt
// @include        http://apps.facebook.com/mousehunt/*
// ==/UserScript==

//@version 1.8b
var cVersion = "1.13b";


var JSON=JSON||{};(function(){function f(n){return n<10?'0'+n:n}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key)}if(typeof rep==='function'){value=rep.call(holder,key,value)}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null'}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null'}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' '}}else if(typeof space==='string'){indent=space}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value})}}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j}throw new SyntaxError('JSON.parse');}}}());

var myData = new Object();
try {
	if(readCookie("gm_pl_data")!=null)
	{
		myData = JSON.parse(readCookie("gm_pl_data"));
	}
	else
	{
		//if there is no cookie we initialize it
		initCookie();
	}
}catch (err)
{
	initCookie();
}

//console.log(myData);

var allLogs = myData.allLogs;

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}

	
// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

function initCookie ()
{
	myData = new Object();
	myData.allLogs = new Object();
	myData.allChese = new Object();
	
	savePersistentData();
}

var timeToHorn=0;
var lastSecond = -1;
	
// All your GM code must be inside this function
function letsJQuery() 
{
	//detect if we are not logged
	//console.log($("input[value=Login]"));
	if($("input[value=Login]").val() == "Login")
	{
		//do nothing
		return false;
	}
	//parsePageLogs();
	
	
	//<span class="emptyalert">None!</span>

	//detect if we are out of chese
	var d = $(".hudstatlist:last>ul>li:last");
	$.each(d.children(".emptyalert"),function (i,o) {
		if(($(this).html() == "None!")&&
		(myData.starredChese>0)&&
		(parseInt(myData.allChese[myData.starredChese]['amount'])>0))
		{
			//avoid infinite loop 
			if(location.href.toString().indexOf("inventory.php?bait="+myData.starredChese+"")>0)
			{
				//starred chese already selected...
			}
			else
			{
				unsafeWindow.parent.location.href = "http://apps.facebook.com/mousehunt/inventory.php?bait="+myData.starredChese+"&hash="+unsafeWindow.a10337532241_submithash+"&tab=invCheese&gm_redirect=1";
			}
		}
	});
	
	//if we have a redirect to camp and we are in inventory
	if(location.href.toString().indexOf("inventory.php")>0)
	if(location.href.toString().indexOf("gm_redirect")>0)
	{
		unsafeWindow.parent.location.href = "http://apps.facebook.com/mousehunt/index.php";
	}
	
	if(detectKingReward())
	{
		//return false;
		alert("You have a king's reward!");
	}

	
	if(location.href.toString().indexOf("inventory.php")>0)
	{
		findCheseTypes();
		findTrapsTypes();
	}
	

	if(location.href.toString().indexOf("huntersgroup.php")>0)
	{
		
		$.each($(".huntername"), function (i,o) {
			
			var id = 0;
			var childs = $(o).children("a");
			var link = $(childs[0]).attr("href");
			var name = $(childs[0]).html();
			
			id = link.substr(link.indexOf("=")+1);
			
			$(o).html($(o).html()+"<a href='#' id='gmpl_af_"+i+"' onclick='return false'>(add to links)</a>");
			_e("gmpl_af_"+i+"").addEventListener("click",function () {gmpl_addFriend(id,name)},false);
		});
	}

	var newContainer = document.createElement("div");
	newContainer.id="la1";

	//hide the news
	$(".headerwaiting>div:first").css("display","none");
	//hide facebook ads
	$(".UIStandardFrame_SidebarAds").css("display","none");
	
	$(".UIStandardFrame_Container:first").css("position","relative");
	$(".UIStandardFrame_Container:first").append(newContainer);

	newContainer.style.position = "absolute";
	newContainer.style.right = '10px';
	newContainer.style.top = '93px';
	newContainer.style.width = '186px';
	
	//build the links list
	
	$(newContainer).append("<div id='gm_pl_version_container'></div>");
	
	$(newContainer).append("<b>Your friends!</b><br>");
	var __i;
	for(__i in myData.friends)
	{
		var x = __i.toString();
		if(myData.friends[__i] != null)
		{
			$(newContainer).append("<a id='gmpl_friend_link_"+x+"' href='http://apps.facebook.com/mousehunt/hunterprofile.php?snuid="+__i+"'>"+myData.friends[__i]+"</a> <a class='gmpl_rem_btn' href='#' id='gmpl_unset_"+__i+"'>(x)</a><br> ");
		}
	}
	$(newContainer).append("<br><b>Options!</b><br>");
	$(newContainer).append("<div id='gm_pl_options_container'></div>");
	$("#gm_pl_options_container").append("Show the timer <input type='checkbox' id='gm_pl_check_show_timer'><br>");
	$("#gm_pl_options_container").append("Automaticaly sound the horn <input type='checkbox' id='gm_pl_check_sound_horn'><br>");
	$("#gm_pl_options_container").append("Play sound on kings reward <input type='checkbox' id='gm_pl_play_sound_on_reward'><br>");
	
	setOptions();
	
	$("#gm_pl_options_container input").click(function () {saveOptions()});
	
	$.each($(".gmpl_rem_btn"),function () {
		var x = this.id.split("_");
		var id = x[2];
		this.addEventListener("click",function () {gmpl_removeFriend(id)},false);
	});
	
	//get the timper
	$.each($("input[type=hidden]"),function () {
		if(!(timeToHorn>0))
		if(this.id.indexOf("hornWaitValue")>0)
		{
			timeToHorn = parseInt(this.value)+Math.floor(Math.random()*30)+6;
		}
		else
		{
			timeToHorn = false;
		}
	});
	
	$("body").append("<div id='gm_pl_timer_container' style='position:absolute;top:46px;left:10px;border:1px solid red;padding:3px;font-size:14px;font-weight:bold;background:#fff;'>Loading timer...</div>");
	setInterval(function() {refreshTimer();},300);
	
	var d = $(".hudstatlist:first>ul>li:last>div");
	var dp = $(".hudstatlist:first>ul>li:last");
	var dp = $(".hudstatlist:first>ul>li:last");
	dp.html(dp.html()+ d.attr("title"));
	
	//more link for chese
	var dp = $(".hudstatlist:last>ul>li:last");
	dp.append("<a id='gmpl_more_chese' style='color:#DCEE7D'>(more)</a>");
	
	//more link for traps
	$.each($(".hudstatlabel"),function () {
		if($(this).html()=="Base:")
		{
			$(this).parent("li").append(" <a href='#' id='gmpl_more_traps' style='color:#DCEE7D'>(more)</a>");
		}
	});
	//more link for traps
	$.each($(".hudstatlabel"),function () {
		if($(this).html()=="Weapon:")
		{
			$(this).parent("li").append(" <a href='#' id='gmpl_more_weapon' style='color:#DCEE7D'>(more)</a>");
		}
	});
	
	$("#gmpl_more_chese").click(function () {
		if($("#gmpl_more_chese_drop").css("display")=="none")
		{
			$("#gmpl_more_chese_drop").css("display","block");
			$("#gmpl_more_chese_drop").css("top",(getTop(this)+20)+"px");
			$("#gmpl_more_chese_drop").css("left",getLeft(this)+"px");
		}
		else
		{
			$("#gmpl_more_chese_drop").css("display","none");
		}
	});	
	
	$("#gmpl_more_traps").click(function () {
		if($("#gmpl_more_traps_drop").css("display")=="none")
		{
			$("#gmpl_more_traps_drop").css("display","block");
			$("#gmpl_more_traps_drop").css("top",(getTop(this)+20)+"px");
			$("#gmpl_more_traps_drop").css("left",getLeft(this)+"px");
		}
		else
		{
			$("#gmpl_more_traps_drop").css("display","none");
		}
	});

	$("#gmpl_more_weapon").click(function () {
		if($("#gmpl_more_traps_drop").css("display")=="none")
		{
			$("#gmpl_more_traps_drop").css("display","block");
			$("#gmpl_more_traps_drop").css("top",(getTop(this)+20)+"px");
			$("#gmpl_more_traps_drop").css("left",getLeft(this)+"px");
		}
		else
		{
			$("#gmpl_more_traps_drop").css("display","none");
		}
	});
	
	//chese list
	$("body").append("<div id='gmpl_more_chese_drop' style='display:none;background:transparent url(http://98.129.188.217/mousehunt/images/interface/menu_bg.gif) repeat scroll left top;position:absolute;z-index:1000;top:248px;left:485px;'>"+getCheseLinks()+"</div>");
	$("body").append("<div id='gmpl_more_traps_drop' style='display:none;background:transparent url(http://98.129.188.217/mousehunt/images/interface/menu_bg.gif) repeat scroll left top;position:absolute;z-index:1001;'>"+getTrapsLinks()+"</div>");
	$.each($(".gm_pl_starred_chese"),function (i,o) {
		$(this).click(function () {
			var cid = this.id.split("_");
			$("#gmlplchesestarred_"+myData.starredChese).html("*");
			myData.starredChese = cid[1];
			savePersistentData();
			$(this).html("(*)");
			return false;
		});
	});
	
	function gmpl_addFriend(id,name)
	{
		if(typeof myData.friends == "object")
		{
		}
		else
		{
			myData.friends = new Object();
		}
		myData.friends[id] = name;
		savePersistentData();
	}	
	
	function gmpl_removeFriend(i)
	{
		$("#gmpl_friend_link_"+i).remove();
		$("#gmpl_unset_"+i).remove();
		myData.friends[i] = null;
		savePersistentData();
	}
	
	function parsePageLogs ()
	{
		$.each($(".journalentry"), function (i,o) {
			parseEntry (o);
		});
	}
	
	function findCheseTypes ()
	{
		//the object is allways initialized to remove old types of chese
		myData.allChese = new Object();

		$.each($("#app10337532241_invCheese .armbutton"), function (i,o) {
			try {
				var t1 = $(o).children("a").attr("href");
				var t2 = t1.split("bait=");
				t1 = t2[1].split("&");
				var cheseId = t1[0];
				
				t1 = $(o).next(".itemname").text();
				t2 = t1.split("(");
				var cheseName = t2[0].trim();
				t1 = t2[1].trim().split(" ");
				var cheseQuantity = t1[0];
					
				if(!(typeof myData.allChese[cheseId] == "object"))
				{
					myData.allChese[cheseId] = new Object();
				}
				myData.allChese[cheseId]['amount'] = cheseQuantity;
				myData.allChese[cheseId]['name'] = cheseName;
			}catch (err){}
		});
		savePersistentData();
	}
	
	function findTrapsTypes()
	{
				//the object is allways initialized to remove old types of chese
		myData.allTraps = new Object();

		$.each($("#app10337532241_invTraps .inventoryrowitem .itemname"), function (i,o) {
			try {
				var name = $(this).text();
				var id = $(this).next(".compdetails").children("div:last").attr("id");
				id = id.split("_");
				
				name = name.split("(");
				name = name[0].trim();
				
				myData.allTraps[id[2]] = name;
				
			}catch (err){}
		});
		savePersistentData();
	}
	
	$("body").append("<iframe name='a_hidden_iframe' id='a_hidden_iframe' style='display:none'></iframe>");
	
	//check if a new version is availble.
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://pe-gratis.com/scriptversion/_1version.php?version='+cVersion,
		headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
		// convert string to XML object
			$("#gm_pl_version_container").html(responseDetails.responseText);
		}
		});
}

function saveOptions ()
{
	if(!(typeof myData["options"] == "object"))
	{
		myData["options"] = new Object();
	}
	$.each($("#gm_pl_options_container input"),function () {
		if(this.checked == true)
		{
			myData["options"][this.id] = true;
		}
		else
		{
			myData["options"][this.id] = false;
		}
	});
	savePersistentData();
}

function setOptions ()
{
	if(typeof myData["options"] == "object")
	{
		for(i in myData["options"])
		{
			$("#"+i).attr("checked",myData["options"][i]);
		}
	}	
}

function refreshTimer ()
{
	var ld = new Date();
	if(_e("gm_pl_check_show_timer").checked == true)
	{
		$("#gm_pl_timer_container").css("display","block");
	}
	else
	{
		$("#gm_pl_timer_container").css("display","none");
	}
	if(timeToHorn!=false)
	{
		if(_e("gm_pl_check_sound_horn").checked == true)
		if(timeToHorn<=1)
		{
			unsafeWindow.parent.location.href = "http://apps.facebook.com/mousehunt/soundthehorn.php"
		}
		if(lastSecond!=ld.getSeconds())
		{
			$("#gm_pl_timer_container").html(parseSecondsToTime(timeToHorn));
			lastSecond = ld.getSeconds();
			timeToHorn--;
		}
		if(timeToHorn<30)
		{
			$("#gm_pl_timer_container").css("background","#f99");
		}
		else if(timeToHorn<120)
		{
			$("#gm_pl_timer_container").css("background","#FFFC59");
		}
	}
	else
	{
		$("#gm_pl_timer_container").html(parseSecondsToTime("Invalid timer!"));
	}
}

function parseSecondsToTime (seconds)
{
	var sec = seconds%60;
	var min = (seconds-sec)/60;
	
	return min+" min, "+sec+" seconds";
}

function savePersistentData ()
{
	createCookie("gm_pl_data",JSON.stringify(myData),1000000);
}

function _e (name)
{
	return document.getElementById(name);
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}


function parseEntry (o)
{
	if(!(typeof allLogs == "object"))
	{
		allLogs = new Object();
	}
	$o = $(o);
	//get the date
	eventHour = $o.children(".journalbody").children(".journaldate").html();
	if($o.hasClass("catch"))
	{
		
	}
	
	myData.allLogs = allLogs;
	savePersistentData();
	
	this.parseDate = function (date)
	{
		var mData = date.split(" ");
		if(mData.length == 1)
		{
			
		}
	}
	
	this.parseCatch = function (reffJQ,date)
	{
		if(typeof allLogs[date] == "object")
		{
			
		}
	}
}

function embedVideo ()
{
	var videoUrl = "http://www.youtube.com/v/fWNyggzfxhw";
	$("body").append('<div style=""><object width="320" height="240"><param name="movie" value="'+videoUrl+'&loop=1&autoplay=1&hl=en&fs=1&rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="'+videoUrl+'&loop=1&autoplay=1&hl=en&fs=1&rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="320" height="240"></embed></object></div>');
}

var gm_pl_kr_count = 0;
function detectKingReward ()
{
	gm_pl_kr_count = 0;
	$.each($("#app10337532241_puzzleimage"),function (i,o) {
		gm_pl_kr_count++;
	});
	
	if(gm_pl_kr_count>0)
	if(myData["options"]['gm_pl_play_sound_on_reward'] == true)
	{
		embedVideo();
		return true;
	}
	
	return false;
}

function getCheseLinks ()
{
	var str = "";
	for(i in myData.allChese)
	{
		str += "<a target='a_hidden_iframe' href='inventory.php?bait="+i+"&hash="+unsafeWindow.a10337532241_submithash+"&tab=invCheese&gm_redirect=1' style='color:#000;display:block;margin:2px;'>"+myData.allChese[i]['name']+" ("+myData.allChese[i]['amount']+") <span class='gm_pl_starred_chese' id='gmlplchesestarred_"+i+"'>"+(i==myData.starredChese?"(*)":"*")+"</span></a>";
	}
	
	return str;
}

function getTrapsLinks ()
{
	var str = "";
	for(i in myData.allTraps)
	{
		str += "<a target='a_hidden_iframe' href='inventory.php?equip="+i+"&hash="+unsafeWindow.a10337532241_submithash+"&tab=invCheese&gm_redirect=1' style='color:#000;display:block;margin:2px;'>"+myData.allTraps[i]+"</span></a>";
	}
	
	return str;
}

function getTop(elem)
{
	if (elem.offsetParent) 
	{
		return elem.offsetTop + getTop(elem.offsetParent);
	}
	else 
	{
		return elem.offsetTop;
	}
}

function getLeft(elem)
{
	if (elem.offsetParent) 
	{
		return elem.offsetLeft + getLeft(elem.offsetParent);
	}
	else 
	{
		return elem.offsetLeft;
	}
}