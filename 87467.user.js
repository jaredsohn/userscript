// ==UserScript==
// @name           CSS saver
// @namespace      http://userscript.org
// @description    CSS saver
// @include        http*://*what.cd/user.php?action=edit&userid=*
// ==/UserScript==

//gm to chrome converter
function GM_setValue(cookieName, cookieValue, lifeTime ){
	if(!cookieName ){ return; }
	if(lifeTime == "delete" ){ lifeTime = -10; } else { lifeTime = 31536000; }
	document.cookie = escape(cookieName )+ "=" + escape(getRecoverableString(cookieValue ))+
		";expires=" + (new Date((new Date()).getTime()+ (1000 * lifeTime ))).toGMTString()+ ";path=/";
}

function GM_getValue(cookieName, oDefault){
	var cookieJar = document.cookie.split("; " );
	for(var x = 0; x < cookieJar.length; x++ ){
		var oneCookie = cookieJar[x].split("=" );
		if(oneCookie[0] == escape(cookieName )){
			try {
				eval('var footm = '+unescape(oneCookie[1] ));
			} catch(e){ return oDefault; }
			return footm;
		}
	}
	return oDefault;
}

function GM_deleteValue(oKey ){
	//yes, they didn't seem to provide a way to delete variables in Greasemonkey, and the user must use about:config to
	//delete them - so the stored variables will pile up forever ...
	GM_setValue(oKey, '', 'delete' );
}

function getRecoverableString(oVar,notFirst){
	var oType = typeof(oVar);
	if((oType == 'null' )|| (oType == 'object' && !oVar )){
		//most browsers say that the typeof for null is 'object', but unlike a real
		//object, it will not have any overall value
		return 'null';
	}
	if(oType == 'undefined' ){ return 'window.uDfXZ0_d'; }
	if(oType == 'object' ){
		//Safari throws errors when comparing non-objects with window/document/etc
		if(oVar == window ){ return 'window'; }
		if(oVar == document ){ return 'document'; }
		if(oVar == document.body ){ return 'document.body'; }
		if(oVar == document.documentElement ){ return 'document.documentElement'; }
	}
	if(oVar.nodeType && (oVar.childNodes || oVar.ownerElement )){ return '{error:\'DOM node\'}'; }
	if(!notFirst ){
		Object.prototype.toRecoverableString = function (oBn){
			if(this.tempLockIgnoreMe ){ return '{\'LoopBack\'}'; }
			this.tempLockIgnoreMe = true;
			var retVal = '{', sepChar = '', j;
			for(var i in this ){
				if(i == 'toRecoverableString' || i == 'tempLockIgnoreMe' || i == 'prototype' || i == 'constructor' ){ continue; }
				if(oBn && (i == 'index' || i == 'input' || i == 'length' || i == 'toRecoverableObString' )){ continue; }
				j = this[i];
				if(!i.match(basicObPropNameValStr)){
					//for some reason, you cannot use unescape when defining peoperty names inline
					for(var x = 0; x < cleanStrFromAr.length; x++ ){
						i = i.replace(cleanStrFromAr[x],cleanStrToAr[x]);
					}
					i = '\''+i+'\'';
				} else if(window.ActiveXObject && navigator.userAgent.indexOf('Mac')+ 1 && !navigator.__ice_version && window.ScriptEngine && ScriptEngine()== 'JScript' && i.match(/^\d+$/)){
					//IE mac does not allow numerical property names to be used unless they are quoted
					i = '\''+i+'\'';
				}
				retVal += sepChar+i+':'+getRecoverableString(j,true);
				sepChar = ',';
			}
			retVal += '}';
			this.tempLockIgnoreMe = false;
			return retVal;
		};
		Array.prototype.toRecoverableObString = Object.prototype.toRecoverableString;
		Array.prototype.toRecoverableString = function (){
			if(this.tempLock ){ return '[\'LoopBack\']'; }
			if(!this.length ){
				var oCountProp = 0;
				for(var i in this ){ if(i != 'toRecoverableString' && i != 'toRecoverableObString' && i != 'tempLockIgnoreMe' && i != 'prototype' && i != 'constructor' && i != 'index' && i != 'input' && i != 'length' ){ oCountProp++; } }
				if(oCountProp ){ return this.toRecoverableObString(true); }
			}
			this.tempLock = true;
			var retVal = '[';
			for(var i = 0; i < this.length; i++ ){
				retVal += (i?',':'')+getRecoverableString(this[i],true);
			}
			retVal += ']';
			delete this.tempLock;
			return retVal;
		};
		Boolean.prototype.toRecoverableString = function (){
			return ''+this+'';
		};
		Date.prototype.toRecoverableString = function (){
			return 'new Date('+this.getTime()+')';
		};
		Function.prototype.toRecoverableString = function (){
			return this.toString().replace(/^\s+|\s+$/g,'').replace(/^function\s*\w*\([^\)]*\)\s*\{\s*\[native\s+code\]\s*\}$/i,'function (){[\'native code\'];}');
		};
		Number.prototype.toRecoverableString = function (){
			if(isNaN(this)){ return 'Number.NaN'; }
			if(this == Number.POSITIVE_INFINITY ){ return 'Number.POSITIVE_INFINITY'; }
			if(this == Number.NEGATIVE_INFINITY ){ return 'Number.NEGATIVE_INFINITY'; }
			return ''+this+'';
		};
		RegExp.prototype.toRecoverableString = function (){
			return '\/'+this.source+'\/'+(this.global?'g':'')+(this.ignoreCase?'i':'');
		};
		String.prototype.toRecoverableString = function (){
			var oTmp = escape(this);
			if(oTmp == this ){ return '\''+this+'\''; }
			return 'unescape(\''+oTmp+'\')';
		};
	}
	if(!oVar.toRecoverableString ){ return '{error:\'internal object\'}'; }
	var oTmp = oVar.toRecoverableString();
	if(!notFirst ){
		//prevent it from changing for...in loops that the page may be using
		delete Object.prototype.toRecoverableString;
		delete Array.prototype.toRecoverableObString;
		delete Array.prototype.toRecoverableString;
		delete Boolean.prototype.toRecoverableString;
		delete Date.prototype.toRecoverableString;
		delete Function.prototype.toRecoverableString;
		delete Number.prototype.toRecoverableString;
		delete RegExp.prototype.toRecoverableString;
		delete String.prototype.toRecoverableString;
	}
	return oTmp;
}
//gm to chrome converter end

var boxes = "10";

function getSaves(num){
	var save = GM_getValue('css_saves'+num);
	if (save){
		if (save.length > 1){
			if (save == "undefined" || !save){ return ""; }
			else { return save; }
		}
		else {
			return "";
		}
	}
	else {
		return "";
	}
}
function cssUpdate(){
	var e = "13";
	for (var i = 0; i < boxes; i++){
		var newcss = document.getElementsByTagName("input")[e].value;
		GM_setValue('css_saves'+i, newcss);
		e++;
	}
}
function start(){
	var cssBox = document.getElementsByTagName("tr")[1];

	var add = "";
	for (var i = 0; i < boxes; i++){
		add += "<input type=\"text\"";
		add += "onclick='document.getElementsByTagName(\"input\")[12].value = this.value;' ";
		add += "class=\"addcss"+i;
		add += "\" value=\""+getSaves(i)+"\" size=\"40\" /><br />";
	}
	cssBox.getElementsByTagName("td")[1].innerHTML += "<br />"+add;

	document.addEventListener('click', function(event){
		if (event.target.type == "submit"){
			cssUpdate();
		}
	},true);
}

start();