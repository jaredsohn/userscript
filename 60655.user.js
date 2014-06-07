// ==UserScript==
// @name			Facebook Autologin
// @namespace		autologin
// @description		Login to facebook with default FF email and password or you set email and password 
// @require			http://code.jquery.com/jquery-latest.js
// @include			http://www.facebook.com/*
// @version			0.0.1
// ==/UserScript==
var _appVersion = '0.0.1';
var _appID = '60655';

var _imgSettings = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADeklEQVR4nGJgoBAAAAAA//9ihDHU1NS4vb29A8XExGw/ffr0YseOHTPOnz//HF0DJxODnBArA9+znwzf/zMwPAEAAAD//2KBSfDy8mpoaWlVe3l5aXBwcDCIi4tLP378OOfNmzc/YGpYGBkUW+05S61VuRTmn/lybs75n7MBAAAA//+Cm8zMzMyvoKAQ3tjYeOrHjx//371799fBwSEAyXLZLmOG+f8Xqvz9P0Hh/41krpv8rAwmAAAAAP//AEEAvv8CDQ0NBTY2NicXFxco4ODgtcXFxcbt7e0AERERAigoKEEAAAAAAgEAHYgzAIJ1YhVgACsPAgDu9ADU4fb1+/8A/wAAAP//AEEAvv8E+Pj4AhYWFjuYmJidsLCwshUVFTLp6ekA9fX0ADU5OzmenZ01gSz7ZHdhFF4ANx4AA"+
"LbnALDM79tqxQCc9vwA2wAAAP//AEEAvv8BAAAAAAoKCiyLi4uoODg4KwUFBQDQ0NAA3+PjAA0IC/n3onTbeWIPKAE7IAQAtucAscnp3V+6/Y7x+wCrAAAA7AAAAP//gsUCOycnp72Li0tpWFiYy+kzZ278YmQTUL20TCLP9zMDi60qA8O25wxrjz2/lrb//7R3PxmWMzAwvGNgYGAAAAAA//9CRmxCQkI+Pj4+p9nY2UOZmFjSsmx1Xn1OY/j/v1Xi/yZ35v+KPOw9DAyMPMiaAAAAAP//QkEsLCwiHBwchgwMDKKmJiaF/////98c7ft9lR3L/036Bv8L+IQeRcnKBiHrAQAAAP//wobYbGxsMv////8/PSNjGwMDQ6stM+eDTfoG/2/6+//vExT8lC8nVyLBycnMwMDAAAAAAP//QkFcXFzC9vb2Wf////+fmZm5hYGBwY6BgUFYkJExvEhA4MYFW9v/N/39/0/k5/9fJi09WYKdnRMAAAD//4LpZZKQkHD6DwWZmZnbGBgYvBgYGNhgZvMyMgbVi4ndP6yr+z+Nl/dMg4DA92BhYS8AAAAA//+CJ8ScnJwFMANERERSGBgY+NFcyCnMyBhZLSZ2Z6qs7Id0AYHzUiwsxgAAAAD//4K73sHBYdrkyZOviouLNzEwMCjhCB9eEWbmUCtOzulCTEy+DAwMXAAAAAD//3TSqREAIAwAsEiePdh/I3wXAMNdVSULRKUedCxMBDbeBxlouDgJAAD//wMAC+oGlxCRfiwAAAAASUVORK5CYII%3D";
var _imgClose = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAxMC8yMi8wOXtixLEAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzQGstOgAAAA9ElEQVQYlXWQvarCQBSEv82KG4NFIGJhETdB0uUR9v1fwMZCjCnsFgKB/QkEb3W9Sq7TDXycmTnCGPM8Ho9kWcY3ee+53W6s6romhMD5fCbGuACVUmitOZ1OJEop+r7/F5RSEmPkfr+zXq9JAKZpQkpJ27avOlprtNYAhBAAWP1emeeZx+NB0zR475FScrlcPpKSd2OtxVrLdrtlGAbmef4OF0VBURR0Xcd+v+dwOHzAq3ez2+24Xq+M44j3njzPARBC/MFKKWKMHx2dczjnAF"+
"6jkxgjVVWRpunidUIIsiyjLEumaUIYY55aazabzQJ+T+m6jh86CmFbC+aRtAAAAABJRU5ErkJggg%3D%3D";
var _imgLoadingRed = "data:application/octet-stream;base64,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";

GM_addStyle(
'.line {margin-bottom:3px}'+
'.close { cursor:pointer; width:11px; height:11px; position:absolute;  top:5px; right:5px; background:url("'+_imgClose+'") }'+
'.button {background:#000; border:#666 1px solid; color:#666; cursor:pointer; -moz-border-radius: 6px; -webkit-border-radius: 6px; }'+
'.button:hover {color:#FFF; border-color:#FFF;}'+
'.settingsAL {position:absolute; width:260px; display:none; background:#333; left:50px; top:50px; -moz-border-radius: 6px; -webkit-border-radius: 6px;}' +
'.settingsHeaderAL {color:#59CC0D; position:relative; font-size:12px; padding:3px 5px;}'+
'.settingsBodyAL { color:#FFF; padding:5px; background:#191919; margin:5px; border:#666 1px solid; -moz-border-radius: 6px; -webkit-border-radius: 6px;}'+
'.settingsALinput { font-size:11px; background:#333; border:#666 1px solid; color:#FFF; padding:0 2px; -moz-border-radius: 6px; -webkit-border-radius: 6px; }'
);
function getSettings(){
	if (GM_getValue("ALOnOff") == 1) {
		$('#ALOoOff').attr('checked',true);
		if (GM_getValue("ALtype") == 2) {
			$("input[name='radiologin']").eq(1).attr('checked',true);
			$('#loginName').val(GM_getValue("ALName"));
			$('#loginPass').val(GM_getValue("ALPass"));			
			$('#hiddInputMy').css('display','block');
		}
		else {
			$("input[name='radiologin']").eq(0).attr('checked',true) 
			$('#hiddInputMy').css('display','none');
		}
	}
	if (GM_getValue("ALredirect") == "1"){
		$('#ALredirect').attr('checked','checked');
		$('#ALlink').val(GM_getValue("ALredirectLink"));
	}
	else{
		$('#ALlink').css('display','none');
	}
}

function ALevent(){

	$('#ALSettingsimg').click(function(){
		$('.settingsAL').css('display','block');
		getSettings();
	});
	
	$('.closeSettings').click(function(){
		$('.settingsAL').css('display','none');
	});	
	
	$('#save').click(function(){
		if ($('#ALOoOff').attr('checked')){
			GM_setValue("ALOnOff","1");
			if ($("input[name='radiologin']:checked").val() === "ff")  {
				GM_setValue("ALtype","1");
				GM_deleteValue("ALName");
				GM_deleteValue("ALPass");				
			}
			if ($("input[name='radiologin']:checked").val() === "my") {
				GM_setValue("ALtype","2");
				if ($('#loginName').val() == '' || $('#loginPass').val() == ''){
					alert('Insert e-mail and password!');
					return false;
				}
				var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
				if (emailReg.test($('#loginName').val())){
					GM_setValue("ALName",$('#loginName').val());
					GM_setValue("ALPass",$('#loginPass').val());
				}
				else {
					alert('Please insert valid email. (example: xxx@xxx.xxx)');
					return false;
				}
			}
		}
		else{
			GM_setValue("ALOnOff","0");
			GM_deleteValue("ALtype");
			GM_deleteValue("ALName");
			GM_deleteValue("ALPass");
		}
		if ($('#ALredirect').attr('checked')){
			if($('#ALlink').val() != ''){
				regLink = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
				if(regLink.test($('#ALlink').val())){
					GM_setValue("ALredirect","1");
					GM_setValue("ALredirectLink",$('#ALlink').val());
				}
				else{
					alert('Please insert valid url.(example: http://www.facebook.com/reqs.php)');
					return false;
				}
			}
			else {
				alert("Enter redirect link!");
				return false;
			}
		}
		else{
			GM_deleteValue("ALredirect");
			GM_deleteValue("ALredirectLink");
		}
		
		$('.settingsAL').css('display','none');
	});
		
	$('#update').click(function(){
		if($("#updating").html() == null) $('<div id="updating" class="line">Checkin for update..<img src="' + _imgLoadingRed + '"><div>').insertBefore($(this));
		else $("#updating").html('<div id="updating">Checkin for update..<img src="' + _imgLoadingRed + '"><div>');
		GM_xmlhttpRequest({ url:"http://userscripts.org/scripts/review/"+_appID, method:'get',
			onload: function(resp){
				var _version = /@version([^&#]*)/.exec(resp.responseText.toString());
				_aaa = _version[1].replace(/	/g,"");
				$('#upLoading').remove();
				if(_appVersion != _aaa){
					$('#updating').html('New version (' + _aaa + ') is available click <a href="http://userscripts.org/scripts/source/'+_appID+'.user.js">here</a> to upgrade.');
				}
				else{
					$('#updating').html('You have latest version.');
				}
			}
		});
	});
	
	$("input[name='radiologin']").click(function(){
		if ($("input[name='radiologin']:checked").val() === "my") $('#hiddInputMy').css('display','block');
		else $('#hiddInputMy').css('display','none');
	});
	
	$('#ALredirect').click(function(){
		if ($('#ALredirect').attr('checked')){
			$('#ALlink').css('display','block');
		}
		else {
			$('#ALlink').css('display','none');
			$('#ALlink').val('');
		}
	});	
		
}

function ALLogin(){
	if(GM_getValue("ALredirect") == "1") GM_setValue("ALloginDone","1");
	$('#login_form').submit();
}

$(document).ready(function(){
	var _link = document.location.href;
	if(_link.indexOf("/login.php") != -1 || _link == "http://www.facebook.com/"){
		if(!$('#error').html()){
			if (GM_getValue("ALOnOff") == 1) {
				if (GM_getValue("ALtype") == 2) {
					$('#email').val(GM_getValue("ALName"));
					$('#pass').val(GM_getValue("ALPass"));
					setTimeout(ALLogin,1000);
				}
				else{
					if($('#email').val() != "" && $('#pass').val() != "") {
						setTimeout(ALLogin,1000);
					}
					else{
						alert('Default username and/or password not set!');
					}
				}
			}
		}
		else {
			GM_setValue("ALloginDone","0");
			return false;
		}
	}
	else{
	
		if ($('#icon_garden').val() != undefined) {
			var _html = '<div class="settingsAL"><div class="settingsHeaderAL">Auto login settings<div class="close closeSettings"></div></div>';
			_html += '<hr><div class="settingsBodyAL"><div class="version" align="right">version: '+_appVersion+'</div>';
			_html += '<div class="line"><input type="checkbox" id="ALOoOff">Auto login on/off</div>';
			_html += '<div class="line"><input type="radio" id="radiologin" name="radiologin" value="ff">Use FF saved</div>';
			_html += '<div class="line"><input type="radio" id="radiologin" name="radiologin" value="my">Use my</div>';
			_html += '<div id="hiddInputMy" style="display:none;"><div class="line">e-mail: <input class="settingsALinput" type="text" id="loginName"></div>';
			_html += '<div class="line"> Password:<input class="settingsALinput" type="password" id="loginPass"></div></div>';
			_html += '<div class="line"><input type="checkbox" id="ALredirect"> Redirect to:</div>';
			_html += '<div class="line"><input type="text" size="43" class="settingsALinput" rows="3" cols="30" type="text" id="ALlink"></div>';
			_html += '<div align="center" class="line"><input type="button" id="update" class="button" value="Check for update"/></div > <div class="line" align="center"><input type="button" class="button" id="save" class="button" value="Save"/></div></div>';
			$('#menubar_container').append(_html);
	
			$('#application_icon_garden_root').append('<img id="ALSettingsimg" style="cursor:pointer;display:block; padding-top:2px; margin-top:2px;" src="'+_imgSettings+'" title="Autoligin settings" >');
			ALevent();
		}
	}
	if(GM_getValue("ALloginDone") == 1){
		GM_setValue("ALloginDone","0");
//
		document.location.href = GM_getValue("ALredirectLink");
	}
});
