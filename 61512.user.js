// ==UserScript==
// @name           UpUp.us Inline Descriptions
// @description    Shows item descriptions without opening new windows
// @namespace      http://kol.upup.us/scripts/
// @include        http://*kingdomofloathing.com/*
// @exclude        http://*kingdomofloathing.com/lchat.php*
// @exclude        http://*kingdomofloathing.com/compactmenu.php*
// @exclude        http://*kingdomofloathing.com/topmenu.php*
// @exclude        http://*kingdomofloathing.com/main.html*
// @exclude        http://*kingdomofloathing.com/main_c.html*
// @exclude        http://forums.kingdomofloathing.com/*

// ==/UserScript==

var currentVersion = 0.16;
var scriptName = "Inline Descriptions";

if(!GM_getValue('lastUpdate',false)) {
	var currentTime = parseInt(new Date().getTime()/60000);
	GM_setValue('lastUpdate',currentTime);
}

var pixel = "data:image/gif;base64,R0lGODlhAQABAID%2FAMDAwAAAACH5BAEAAAAALAAAAAABAAEAQAICRAEAOw%3D%3D";
var question="data:image/gif;base64,R0lGODlhCwALAJEAAAAAAE1MTN7d3QAAACH5BAAAAAAALAAAAAALAAsAAAIajI8my6zdHphzvQZswFVc6G1M5ohgeGpJUgAAOw%3D%3D";

var cssStyle = (<r><![CDATA[
div.inlineDescription {
	top:0;
	position:absolute;
	z-index:100;
	border:2px solid blue;
	width:300px;
	background-color:white;
}
img.confirm {
	position:absolute;
	top:-1.2em;
	cursor:pointer;
}
span.confirmHolder {
	position:relative;
}
]]></r>).toString();

GM_addStyle(cssStyle);
GM_addStyle('div.inlineDescription{-moz-opacity:'+GM_getValue('divOpacity',.9)+';}')

var openEventListeners = new Array();
var openDivs = new Object();

var showTimeout;
var hideTimeout;

function hideAllDivs(e) {
	var isDiv = find("ancestor-or-self::div[@class='inlineDescription']",e.target);
	if(!isDiv) {
	//close
		for(a in openDivs) {
			openDivs[a].style.display="none";
		}
	}	
}

var hoverItems = snap(".//img[contains(@onclick,'descitem(') or contains(@onclick,'item(') or contains(@onclick,'eff(')]|.//a[contains(@href,'descitem(')]");
for(var i=0,l=hoverItems.length;i<l;i++) {
	var item=hoverItems[i];
	addEventListener(item,'mouseover',hoverItem,true);
	addEventListener(item,'mouseout',cancelHover,true);
}
addEventListener(document,'click',hideAllDivs,true);

function cancelHover(e) {
	clearTimeout(theTimeout);
	divs = e.target.parentNode.getElementsByTagName('div');
	if(e.target.className=="confirm") {
		hideTimeout=setTimeout(function() {e.target.style.display="none"},500);
	} else {
		var linkButton = find('./span[@class="confirmHolder"]/img[@class="confirm"]',e.currentTarget.parentNode);
		if(linkButton) {
			hideTimeout=setTimeout(function() {linkButton.style.display="none"},500);
		}
	}
}
function hoverItem(e) {
	var item = e.currentTarget;
	if(item.nodeName == "A") {
		var itemNum = /(?:desc)?item\((\d+)\)/.exec(item.href)[1];
	} else {
		var itemNum = /(?:desc)?item\((\d+)[),]/.exec(item.getAttribute('onclick'))[1];
	}
	theTimeout=setTimeout(function() {createConfirm(item,itemNum)},250);
}

function createConfirm(target, num) {
	if(target.parentNode.lastChild.className!="confirmHolder") {
		var confirmLink = document.createElement('img');
		confirmLink.src=question;
		confirmLink.className="confirm";
		
		var confirmHolder = document.createElement('span');
		confirmHolder.className = "confirmHolder";
		confirmHolder.appendChild(confirmLink);
		
		addEventListener(confirmLink,"mouseover",function() {showDesc(confirmHolder,num)},false);
		addEventListener(confirmLink,"mouseout",cancelHover,false);

		target.parentNode.insertBefore(confirmHolder,target.nextSibling);
	} else {
		target.parentNode.lastChild.firstChild.style.display="inline";
	}
}
function fixHeight(which) {
	var theTop = which.parentNode.offsetTop;
	var divBottom = theTop + which.offsetHeight;
	var maxBottom = document.body.scrollTop+innerHeight;
	
	if(divBottom>maxBottom) {
		if(theTop-which.offsetHeight < document.body.scrollTop) {
			which.style.top = document.body.scrollTop-theTop+5+"px";
		} else {
			which.style.top = maxBottom-divBottom-5+"px";
		}
	} else {
		which.style.top="0";
	}
}
function showDesc(target,num) {
	//cancel hiding of ? link
	clearTimeout(hideTimeout);
	
	var div=openDivs[num];
	
	if(!div) {
		div=document.createElement('div');
		div.className='inlineDescription';
		openDivs[num]=div;
		GM_get("/desc_item.php?whichitem="+num,populateDesc);
	} else {
		displayDesc();
		fixHeight(div);
	}
	function populateDesc(txt) {
		div.innerHTML=txt;
		displayDesc();
		target.appendChild(div);
		fixHeight(div);
		checkUpdates(div,false);
		//showDesc();
	}
	function displayDesc() {
		for(a in openDivs) {
			openDivs[a].style.display="none";
		}
		div.style.display="block";
	}
}

if(document.location.pathname=="/account.php") {
	//create preference title bar
	prefTitle = document.createElement('div');
	with(prefTitle) {
		appendChild(document.createTextNode('Inline Descriptions'));
		style.padding = "1px 0 1px 0";
		style.textAlignment = "center";
		style.color = "white";
		style.backgroundColor = "blue";
		style.fontWeight = "bold";
	}
	
	//create wrapper for preference content (helps with alignment)
	prefContent = document.createElement('div');
	with(prefContent) {
		style.textAlign = "left";
		style.display = "table-cell";
		style.lineHeight = "2em";
		style.padding = "5px";
	}
	
	
	//create form, and button to toggle it
	toggleUpdateForm = document.createElement('span');
	updateForm = document.createElement('form');
	with(toggleUpdateForm) {
			style.cursor = "pointer";
			appendChild(document.createTextNode('Settings and Update'));
			style.textDecoration = "underline";
			className = "preferenceButton";
			addEventListener('click',function(evt) {toggle(updateForm);evt.preventDefault();},true);
	}
	
	checkUpdatesButton = document.createElement('input');
	with(checkUpdatesButton) {
		title="Check for Updates";
		className = "button";
		style.width = "12em;"
		type="button";
		value="Check for Updates";
	}
	
	updateProgress = document.createElement('img');
	with(updateProgress) {
		style.marginLeft = "5px";
		style.verticalAlign = "middle";
		src=pixel;
		width = 18;
		height = 18;
	}
	
	changeOpacity = document.createElement('input');
	with(changeOpacity) {
		style.width = "2em";
		type="text";
		value=GM_getValue('divOpacity',.9);
		title="Changes take place immediately";
	}
	
	addEventListener(changeOpacity,'change',function(e){
		var num=e.target.value*1;
		if(num>0&&num<=1) {
			num=num+'';
			GM_setValue('divOpacity',num);
		}
		else e.target.value=GM_getValue('divOpacity',.9)},false);


	
	with(updateForm) {
		//style.marginBottom = "-1em";
		style.display = "none";
		style.lineHeight = "1em";
		appendChild(document.createElement('hr'));
		appendChild(checkUpdatesButton);
		appendChild(updateProgress);
		appendChild(document.createElement('br'));
		appendChild(document.createElement('br'));
		appendChild(document.createTextNode('Opacity (0-1): '));
		appendChild(changeOpacity);
		appendChild(document.createElement('hr'));
	}
	
	with(prefContent) {
		appendChild(toggleUpdateForm);
		appendChild(updateForm);
	}
	
	//create main wrapper form
	prefWrapper = document.createElement('div');
	with(prefWrapper) {
		style.marginBottom = "4px";
		style.width = "95%";
		style.border = "1px solid blue";
		style.position="relative";
		appendChild(prefTitle);
		appendChild(prefContent);
	}
	
	addEventListener(checkUpdatesButton,'click',function(e){e.target.disabled='disabled';checkUpdates(prefWrapper,true)},true);

	//find area to append the whole mess to
	var loc = document.getElementById('ro');
	loc.parentNode.insertBefore(prefWrapper,loc);
}







/* don't know whose code this is, sorry :/ */
function addEventListener(target, event, listener, capture) {
	openEventListeners.push( [target, event, listener, capture] );
	target.addEventListener(event, listener, capture);
}
function destroyEventListeners(event) {
	for (var i = 0, l=openEventListeners.length; i<l; i++)     {
		var rel = openEventListeners[i];
		rel[0].removeEventListener(rel[1], rel[2], rel[3]);
	}
	window.removeEventListener('unload', destroyEventListeners, false);
}
addEventListener(window, 'unload', destroyEventListeners, false);


//		/==============================\
//		|       shared functions       |
//		\==============================/


//========XPATH========
function find(xp,location) {
	if(!location)location = document;
	var temp = document.evaluate(xp, location, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	return temp.singleNodeValue;
}
function snap(xp,location) {
	if(!location)location=document;
	var result = document.evaluate(xp, location, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	v=new Array();
	for ( var i=0 ; i < result.snapshotLength; i++ )
	{
		v.push(result.snapshotItem(i));
	}
	return v;
}



//========STRING FUNCTIONS========
function tryInt(item) {
	if(item!=='') {
		var tempitem = item*1;
		if(!isNaN(tempitem)) {
			return tempitem;
		}
	}
	return item;
}

//========DISPLAY FUNCTIONS========
function toggle(item){
  if (!item)return;
  item.style.display = (item.style.display == "none") ? "block" : "none";
}



//========HTTP REQUESTS========
function GM_get( dest, callback, external) {
	var theHost = (external)?"":document.location.host;
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://'+ theHost + dest,
		onload:function(details) {
			if( typeof callback=='function' ){
				callback(details.responseText);
			}
		}
	});
}

//========AUTO UPDATING========

function checkUpdates(target,force) {
	var updateGraphic = "data:image/gif;base64,R0lGODlhPgA%2BAMQQACIi%2F%2B7u%2F93d%2F0RE%2F3d3%2F6qq%2F%2F%2F%2F%2F7u7%2FxER%2FzMz%2F8zM%2F5mZ%2F4iI%2F2Zm%2F1VV%2FwAA%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABAALAAAAAA%2BAD4AAAX%2F4COOZGmSUKqubOu%2B6SnPD2zfL62jeI%2FvQJ8QBtwNj6yiDsmEKEWDUxOpJBiipukRaCXMtENddwn2zRYG72iALZXNpkQgAFgHFLJ37zQICOp9fwB1WXo3fH4Nd4MCf1KGNogGBQ8AjX6EbpBEJgOUlld9eI%2BbLjIDjQd%2FfZSkpUkmBYKNAAcGDWqar7AlhJYBaQWTrrsxM5YEwratusXGMgjCXmOFzs%2B9BwG5BAcIxMUnVgckDLnV1uHDD1aUCXnW1yPs7A%2Bs7%2FDhBQyUournzjT6BEBgZcE9dOECFFC4Ls1BgCUQCOCnEMCcTM0gksgkMEAUd992HRPgcV3JkK9Om1hyJGJhm4zgsGG0SOdhzBmBVGHkge8UJksLQP67SSKQL3soS5kgwLLeHX8wRUa0M7CgTalLFU5saG4EPBUmJBpwYInSgppRiYr4NaAsAqE8vzrpRbKtArhx5ZpgS0MurxG1dqbt%2BcRviyc1DP81onhx38aOrzYOAvkwmcqR82KON7jyl82mkm4WPbozaNOnvYI%2BJGL1j8SuI4UAADs%3D";
	if(GM_getValue('newestVersion',0)*1 > currentVersion) {
		showNeedUpdate();
	} else {
		var currentTime = parseInt(new Date().getTime()/60000);
		var lastUpdate=GM_getValue('lastUpdate',0);
		if(currentTime-lastUpdate > 2400||force) {
			GM_get("kol.upup.us/scripts/version.php?script="+escape(scriptName),parseUpdate,true);
		}
	}
	
	function parseUpdate(txt) {
		if(txt) {
			var string=txt.split("\t");
			if(string[0] && string[1]) {
				var newestVersion = string[0];
				var scriptLocation = string[1];
				if(newestVersion==tryInt(newestVersion)) {
					GM_setValue('lastUpdate',currentTime);
					GM_setValue('newestVersion',newestVersion);
					GM_setValue('scriptLocation',scriptLocation);
					if(newestVersion>currentVersion)showNeedUpdate();
				}
			}
		}
	}
	function showNeedUpdate() {
		updateLink=document.createElement('a');
		updateLink.href="http://kol.upup.us/"+GM_getValue('scriptLocation','scripts/InlineDescriptions.user.js');
		updateLink.target ="_blank";
		
		updateImage = document.createElement('img');
		updateImage.src = updateGraphic;
		updateImage.border="0";
		updateImage.style.height="62px";
		updateImage.style.width="62px";
		updateLink.addEventListener('click',hideUpdateImage,false);
		
		with(updateLink.style) {
			position = "absolute";
			right="0";
			if(target.className=="inlineDescription") {
			top="0";
			} else {
				top="1em";
			}
			margin="0px";
			padding="0px";
		}

		updateLink.appendChild(updateImage)
		target.appendChild(updateLink);
	}
	function hideUpdateImage(e) {
		e.target.parentNode.removeChild(e.target);
	}
}