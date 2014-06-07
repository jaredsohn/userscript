// ==UserScript==
// @name          LcRules
// @namespace     http://www.isatis.nl
// @description   Add the possibility to add guides to the page for alignment
// @include *
// @version 1.1 
// @require       http://code.jquery.com/jquery-latest.js
// @require       http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js
// @grant      	  GM_getValue
// @grant      	  GM_setValue
// @grant      	  GM_deleteValue
// @grant      	  GM_listValues
// @grant      	  GM_xmlhttpRequest
// @grant      	  GM_openInTab
// ==/UserScript==

//this.$ = this.jQuery = jQuery.noConflict(true);
;(function($){
	var paddingRule,
		globalTimer,
		afstandArrHor = [],
		afstandArrVert = [],
		saveHighestIndex = 0,
		$lcStyles,
		isMac = navigator.platform.toUpperCase().indexOf('MAC')!==-1,
		startElements = ''
			+'<div id="lcHorizontal"></div><div id="lcVertical"></div>'
			+'<div id="lcAfstandenVert"></div><div id="lcAfstandenHor"></div>'
			+'<div id="lcMenu">'
			+'	<a class="lcLoad orange" href="#">load &#x25BC;</a> '
			+'	<div class="lcLoadcontent">'
			+'		<div class="lcContent">'
			+'			<div id="lcLoadList">'
			+'			</div>'
			+'		</div>'
			+'	</div>'
			+'	<a class="lcSaveAs orange" href="#">save as &#x25BC;</a>'
			+'	<div class="lcSaveAscontent">'
			+'		<div class="lcContent">'
			+'			<div class="lcSavedMsg">Your setting is saved!</div>'
			+'			<input id="lcSaveAsName" type="text"><a href="#" id="lcSaveAsInputSave">save</a>'
			+'			<div id="lcSaveAsList">'
			+'			</div>'
			+'		</div>'
			+'	</div>'
			+'	<a class="lcSelectAll orange" href="#">Select all lines</a>'
			+'	<a class="lcRemove orange" href="#">clear lines</a>'
			+'	<div class="lcHelp">'
			+'		<a class="lcIcon" href="#">?</a>'
			+'		<div class="lcHelpcontent">'
			+'			<div class="lcArrow">&#x25B2;</div><div class="lcContent">'
			+'				&bull; Drag new guides from side-areas by click+drag.<br />'
			+'				&bull; Create new guide by '+(isMac?'COMMAND':'CTRL')+'+drag on an existing guide.<br />'
			+'				&bull; Delete guides by double-clicking.<br />'
			+'				&bull; Select and deselect guides by clicking on them.<br />'
			+'				&bull; Move selected guides with arrow keys (use SHIFT for 5px move).<br />'
			+'				&bull; Select multiple guides with SHIFT+click on guides.<br />'
			+'				&bull; Use \'Select all lines\' to move all vertical or horizontal lines with the arrow keys.<br />'
			+'				&bull; Toggle visibility of all the tool\'s elements with CTRL+ALT+SHIFT+R.'
			+'			</div>'
			+'		</div>'
			+'	</div>'			
			+'</div>',
		style = '<style type="text/css">'
			+'#lcHorizontal,'
			+'#lcVertical { position: fixed; left: 0; background: #aaa; z-index:9999999; -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)"; filter: alpha(opacity=50); -moz-opacity: 0.5; -khtml-opacity: 0.5; opacity: 0.5; }'
			+'#lcHorizontal:hover,'
			+'#lcVertical:hover { -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)"; filter: alpha(opacity=80); -moz-opacity: 0.8; -khtml-opacity: 0.8; opacity: 0.8; cursor: copy; }'
			+'#lcHorizontal { top: 0; width: 100%; height: 25px; }'
			+'#lcVertical { top: 25px; width: 25px; height: 100%; }'
			
			
			+'#lcAfstandenHor,'
			+'#lcAfstandenVert { font: normal 13px/1 Arial; z-index:9999999;  }'
			+'#lcAfstandenHor { position: absolute; left: '+($(window).scrollLeft()+25)+'px; top: 25px; height: 100%; width: 30px; }'
			+'#lcAfstandenVert { position: fixed; left: '+(25-$(window).scrollLeft())+'px; top: 25px; height: 19px; width: 100%; }'
			
			+'#lcAfstandenHor div { position: absolute; top: 100px; left: 0; width: 18px; text-align: center; height: 100px; border-right: 1px dashed #aaa; }'
			+'#lcAfstandenHor div span { display: inline-block; position: absolute; top:50%; left: 0; margin-top: -8px; width: 35px; font: normal 13px/1 Arial; background: #eee; color: #777; border: 1px solid #eee; text-align: center; padding: 0px 2px; }'
			+'#lcAfstandenVert div { position: absolute; top: 0; left: 100px; width: 100px; text-align: center; height: 8px; border-bottom: 1px dashed #aaa; margin-top: 3px; }'
			+'#lcAfstandenVert div span { font: normal 13px/1 Arial; background: #eee; color: #777; border: 1px solid #eee; text-align: center; padding: 0px 2px 1px; }'
			
			
			+'#lcMenu { font: normal 13px/1.5 Arial; position: fixed; right: 0; top: 0; z-index:999999999; height: 23px; display: block; padding: 1px 20px 1px 10px; background: #ddd; }'
			+'#lcMenu a { background:none; border:none; bottom:auto; clear:none; cursor:default; float:none; font-family:Arial, Helvetica, sans-serif; font-size:medium; font-style:normal; font-weight:normal; height:auto; left:auto; letter-spacing:normal; line-height:normal; max-height:none; max-width:none; min-height:0; min-width:0; overflow:visible; position:static; right:auto; text-align:left; text-decoration:none; text-indent:0; text-transform:none; top:auto; visibility:visible; white-space:normal; width:auto; z-index:auto; }'
			+'#lcMenu div.lcSaveAscontent .lcContent #lcSaveAsInputSave,'
			+'#lcMenu div.lcSaveAscontent .lcContent #lcSaveAsList a.lcSaveAsSpecific,'
			+'#lcMenu a.lcSelectAll,'
			+'#lcMenu a.lcLoad,'
			+'#lcMenu a.lcSaveAs,'
			+'#lcMenu a.lcRemove { color: white; display: inline-block; margin: 0 5px; outline: none; cursor: pointer; text-align: center; text-decoration: none; font: 12px/100% Arial, Helvetica, sans-serif; padding: 3px 5px 4px; text-shadow: 0 1px 1px rgba(0,0,0,.3); -webkit-border-radius: .5em;  -moz-border-radius: .5em; border-radius: .5em; -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.2); -moz-box-shadow: 0 1px 2px rgba(0,0,0,.2); box-shadow: 0 1px 2px rgba(0,0,0,.2); }'
			+'#lcMenu div.lcSaveAscontent .lcContent #lcSaveAsInputSave:hover,'
			+'#lcMenu div.lcSaveAscontent .lcContent #lcSaveAsList a.lcSaveAsSpecific:hover,'
			+'#lcMenu a.lcSelectAll:hover,'
			+'#lcMenu a.lcLoad:hover,, #lcMenu a.lcLoad.lcActive'
			+'#lcMenu a.lcSaveAs:hover, #lcMenu a.lcSaveAs.lcActive'
			+'#lcMenu a.lcRemove:hover { text-decoration: none; }'
			+'#lcMenu div.lcSaveAscontent .lcContent #lcSaveAsInputSave,'
			+'#lcMenu a.lcSaveAsSpecific,'
			+'#lcMenu a.orange { color: #fef4e9; border: solid 1px #A57276; background: #B26E74; background: -webkit-gradient(linear, left top, left bottom, from(#ED6E79), to(#A05D63)); background: -moz-linear-gradient(top,  #C9848A,  #A05D63); filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#C9848A", endColorstr="#A05D63"); }'
			+'#lcMenu div.lcSaveAscontent .lcContent #lcSaveAsInputSave:hover,'
			+'#lcMenu a.lcSaveAsSpecific:hover,'
			+'#lcMenu a.orange:hover { background: #AF5F65; background: -webkit-gradient(linear, left top, left bottom, from(#C96E74), to(#AF5F65)); background: -moz-linear-gradient(top,  #C96E74,  #AF5F65); filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#C96E74", endColorstr="#AF5F65"); }'
			+'#lcMenu div.lcSaveAscontent .lcContent #lcSaveAsInputSave:active,'
			+'#lcMenu a span.lcSaveAsSpecific:active,'
			+'#lcMenu a.orange.lcActive,'
			+'#lcMenu a.orange:active { background: #AF5F65; background: -webkit-gradient(linear, left top, left bottom, from(#AF5F65), to(#C96E74)); background: -moz-linear-gradient(top,  #AF5F65,  #C96E74); filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#AF5F65", endColorstr="#C96E74"); }'
			
			+'#lcMenu .lcContent { color: #000; }'
			+'#lcMenu div.lcHelp { display: inline-block; margin-left: 15px; position: relative; }'
			+'#lcMenu div.lcHelp a { color: #4754D8; cursor: pointer; }'
			+'#lcMenu div.lcHelp a:hover { color: #5364FC; }'
			+'#lcMenu div.lcHelp .lcHelpcontent { position: absolute; top: 15px; right: -10px; width: 330px; display: none; }'
			+'#lcMenu div.lcHelp .lcArrow { font: normal 13px/1 Arial; color: #E0EAF1; text-align: right; padding-right: 7px; }'
			+'#lcMenu div.lcHelp .lcContent { background: #E0EAF1; position: relative; top: -1px;  padding: 5px 5px; }'
			+'#lcMenu div.lcSaveAscontent { display: none; position: absolute; top: 15px; left: 96px; width: 200px; }'
			+'#lcMenu div.lcSaveAscontent .lcContent { font: normal 13px/1 Arial; background: #E0EAF1; position: relative; top: 8px; left:-16px; padding: 10px 5px; }'
			+'#lcMenu div.lcSaveAscontent .lcContent input { font: normal 14px/1 Arial; color: #000; width: 130px; height: 18px; margin-right: 5px; background: white; border: auto; display: inline; float: none; position: static; padding: 3px; margin: 0 5px 0 0; }'
			+'#lcMenu div.lcSaveAscontent .lcContent #lcSaveAsInputSave { margin: 0; }'
			+'#lcMenu div.lcSaveAscontent .lcContent #lcSaveAsList { border-top: 1px dashed #aaa; margin-top: 10px; }'
			+'#lcMenu div.lcSaveAscontent .lcContent #lcSaveAsList a { font: normal 14px/1.5 Arial; color: #1122CC; cursor: pointer; }'
			+'#lcMenu div.lcSaveAscontent .lcContent #lcSaveAsList a:hover { color: #00CEF7;  }'
			+'#lcMenu div.lcSaveAscontent .lcContent #lcSaveAsList a.lcSelected { color: #000; cursor: default; }'
			+'#lcMenu div.lcSaveAscontent .lcContent #lcSaveAsList a.lcDelete { color: #aa0000; float: right; font-weight: bold; line-height: 21px; margin-right: 5px; }'
			+'#lcMenu div.lcSaveAscontent .lcContent #lcSaveAsList div.lcSetting { text-align: left; margin: 10px 0; position: relative; top: 0; left: 0; }'
			+'#lcMenu div.lcSaveAscontent .lcContent #lcSaveAsList div.saveOrCancel { display: none; position: absolute; top: 0; right: 0; }'
			+'#lcMenu div.lcSaveAscontent .lcContent .lcSavedMsg { display: none; position: absolute; top: 0; left: 0; width: 180px; height: 24px; background: #D9E8D5; padding: 10px; color: #346830; font: bold 15px/1 Arial; text-align: center; }'
			
			+'#lcMenu div.lcLoadcontent { display: none; position: absolute; top: 23px; left: 15px; width: 200px; }'
			+'#lcMenu div.lcLoadcontent .lcContent { text-align: left; font: normal 13px/1 Arial; background: #E0EAF1; position: relative; top: 0; left:0; padding: 10px 5px 1px; }'
			+'#lcMenu div.lcLoadcontent .lcContent #lcLoadList a { display: block; font: normal 14px/1 Arial; color: #1122CC; cursor: pointer; margin-bottom: 10px; }'
			+'#lcMenu div.lcLoadcontent .lcContent #lcLoadList a:hover { color: #00CEF7;  }'
			+'#lcMenu div.lcLoadcontent .lcContent #lcLoadList a span.lcDelete { color: #aa0000; float: right; font-weight: bold; line-height: 18px; margin-right: 5px; }'
			+'#lcMenu div.lcLoadcontent .lcContent #lcLoadList div { margin: 0 0 10px 0; }'
			
			
			+'.lcHorRule,'
			+'.lcVertRule { position: absolute; z-index: 999999; }'
			+'.lcHorRule.lcSelected div.lcRule,'
			+'.lcVertRule.lcSelected div.lcRule { border-color: #EF00EF; }'
			+'.lcHorRule {  width: '+$(document).width()+'px; height: 10px; cursor: row-resize; }'
			+'.lcHorRule div.lcRule { position: relative; top: 50%; left: 0; width: '+$(document).width()+'px; height: 1px; border-top: 1px solid #A200ED; }'
			+'.lcVertRule { width: 10px; height: '+$(document).height()+'px; cursor: col-resize; }'
			+'.lcVertRule div.lcRule { position: relative; top: 0; left: 50%; width: 1px; height: '+$(document).height()+'px; border-left: 1px solid #A200ED; }'
			
			+'.lcHorRule div.lcPosition,'
			+'.lcVertRule div.lcPosition { font: normal 15px/1.5 Arial; color: #000; position: relative; width: 60px; text-align: center; background: white; border: 1px dashed #ccc; display: none; }'
			+'.lcHorRule div.lcPosition { top: -13px; left: '+($(window).scrollLeft()+75)+'px; }' //pas op met aanpassen van deze regel vanwege replace regex
			+'.lcVertRule div.lcPosition { top: '+($(window).scrollTop()+50)+'px; left: -29px; width: 60px; }' //pas op met aanpassen van deze regel vanwege replace regex
			
			+'.lcHorRule div.lcArrow,'
			+'.lcVertRule div.lcArrow { font: normal 13px/1 Arial; position: absolute; color: #EF00EF; display: none; }'
			+'.lcHorRule.lcSelected div.lcArrow,'
			+'.lcVertRule.lcSelected div.lcArrow { display: block; }'
			+'.lcVertRule div.lcArrow { top: '+($(window).scrollTop()-3)+'px; left: -7px; }' //pas op met aanpassen van deze regel vanwege replace regex
			+'.lcHorRule div.lcArrow { top: -8px; left: '+($(window).scrollLeft()-1)+'px; }' //pas op met aanpassen van deze regel vanwege replace regex
			+'</style>';
	
	//Use Greasemonkey storage functions in Chrome
	if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
	    this.GM_getValue=function (key,def) {
	        return localStorage[key] || def;
	    };
	    this.GM_setValue=function (key,value) {
	        return localStorage[key]=value;
	    };
	    this.GM_deleteValue=function (key) {
	        return delete localStorage[key];
	    };
	    this.GM_listValues=function () {
	    	var localKeys = [];
	    	$.each(localStorage, function(i){
	    		localKeys.push(localStorage[i]);
	    	});
	    	return localKeys;
	    };
	}
	
	//updatescript at http://userscripts.org/scripts/review/20145
	var SUC_script_num = 154557; // Change this to the number given to the script by userscripts.org (check the address bar)
	try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0'), 10) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1],10);local_version=parseInt(GM_getValue('SUC_current_version', '-1'),10);if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
	
	//Extend array prototype to remove empty values
	Array.prototype.clean = function(deleteValue) {
	  for (var i = 0; i < this.length; i++) {
	    if (this[i] == deleteValue) {         
	      this.splice(i, 1);
	      i--;
	    }
	  }
	  return this;
	};
	
	$(document).ready(function(){
		//Voorkom laden in iFrames
		if (window.top == window.self){
			$('body').lcrules();
			updateCheck();
		}
	});
	
	$.fn.extend({
		lcrules: function(options){
			//options = $.extend({}, $.LcRules.defaults, options || {});
			return this.filter('body').each(function(i){
				if (!this.lcrules) {
					new $.LcRules(this);
					this.lcrules = true;
				}
			}).end();
		}
	});
	
	$.LcRules = function(body){
		this.body = $(body);
		this.init();
	};
	
	$.extend($.LcRules, {
		defaults: {
			
		},
		prototype: {
			constructor: 'LcRules',
			init: function(){
				var $this = this;
				
				$lcStyles = $(style).appendTo("head");
				
				//zorgt ervoor dat de positie-indicatoren van de verticale rulers ook zichtbaar zijn als je naar beneden scollt.
				$(window).scroll(function(){
					var scrollTop = $(this).scrollTop(),
						scrollLeft = $(this).scrollLeft();
						
					$lcStyles.html($lcStyles.html()
					.replace(/(.lcVertRule div.lcArrow { top: )[-]{0,1}[0-9]{1,5}/gi, '$1' + (scrollTop-3))
					.replace(/(.lcHorRule div.lcArrow { top: [-]{0,1}[0-9]{1,5}px; left: )[-]{0,1}[0-9]{1,5}/gi, '$1' + (scrollLeft-1))
					.replace(/(.lcVertRule div.lcPosition { top: )[-]{0,1}[0-9]{1,5}/gi, '$1' + (scrollTop+50))
					.replace(/(.lcHorRule div.lcPosition { top: [-]{0,1}[0-9]{1,5}px; left: )[-]{0,1}[0-9]{1,5}/gi, '$1' + (scrollLeft+75))
					.replace(/(#lcAfstandenVert { position: fixed; left: )[-]{0,1}[0-9]{1,5}/gi, '$1' + (25-scrollLeft))
					.replace(/(#lcAfstandenHor { position: absolute; left: )[-]{0,1}[0-9]{1,5}/gi, '$1' + (scrollLeft+25)));
					
				});
				
				$(startElements).appendTo(this.body);
				
				//Event-listners voor het toevoegen van rules.
				$('#lcHorizontal').mousedown(function(e){
					$this.addRule(e,'hor');
				});
				$('#lcVertical').mousedown(function(e){
					$this.addRule(e,'vert');
				});
				
				//Event-listners voor toetsenbord bediening.
				var fastspeed = 5; 
				$(document).bind('keydown', 'alt+ctrl+shift+r', $this.toggleLcRules);
				$(document).bind('keydown', 'left', function(e){ $this.moveRule(e, 'left'); });
				$(document).bind('keydown', 'shift+left', function(e){ $this.moveRule(e, 'left', fastspeed); });
				$(document).bind('keydown', 'right', function(e){ $this.moveRule(e, 'right'); });
				$(document).bind('keydown', 'shift+right', function(e){ $this.moveRule(e, 'right', fastspeed); });
				$(document).bind('keydown', 'up', function(e){ $this.moveRule(e, 'up'); });
				$(document).bind('keydown', 'shift+up', function(e){ $this.moveRule(e, 'up', fastspeed); });
				$(document).bind('keydown', 'down', function(e){ $this.moveRule(e, 'down'); });
				$(document).bind('keydown', 'shift+down', function(e){ $this.moveRule(e, 'down', fastspeed); });
				
			
				/* MENU */
				$('#lcMenu a.lcSelectAll').click(function(e){
					e.preventDefault();
					e.stopPropagation();
					
					$('div.lcHorRule, div.lcVertRule').addClass('lcSelected');
				});
				
				//LOAD
				$('#lcMenu a.lcLoad').click(function(e){ 
					e.preventDefault();
					e.stopPropagation();
					
					//hide eventueel saveas-dropdown en help
					$('#lcMenu a.lcSaveAs').removeClass('lcActive');
					$('#lcMenu .lcSaveAscontent').hide();
					$('#lcMenu .lcHelpcontent').stop(true, true).hide();
					
					if ($(this).toggleClass('lcActive').hasClass('lcActive')) {
						var lcSettingsList = $this.listSettings(),
							arr = [];
						
						for (var i=0, j=lcSettingsList.length; i < j; i++) {
							arr.push('<a href="#'+lcSettingsList[i]+'">'+lcSettingsList[i].split('|')[0]+'<span class="lcDelete" title="delete setting">x</span></a>');
						}
						if (arr.length) {
							$('#lcLoadList').html(arr.join(''));	
						} else {
							$('#lcLoadList').html('<div>There are no saved settings yet.</div>');
						}
						$('#lcMenu .lcLoadcontent').show();
					} else {
						$('#lcMenu .lcLoadcontent').hide();
					}
				});
				
				$('#lcMenu .lcLoadcontent').on('click', '#lcLoadList a', function(e){
					e.preventDefault();
					e.stopPropagation();
					$this.loadSettings($(this).attr('href').substr(1));
					$('#lcMenu a.lcLoad').removeClass('lcActive');
					$('#lcMenu .lcLoadcontent').hide();
				});
				
				$('#lcMenu .lcLoadcontent').on('click', '#lcLoadList .lcDelete', function(e){
					e.preventDefault();
					e.stopPropagation();
					$this.deleteSettings($(this).parent().attr('href').substr(1));
					$(this).parent().remove();
				});
				
				//SAVE AS				
				$('#lcMenu a.lcSaveAs').click(function(e){ 
					e.preventDefault();
					e.stopPropagation();
					
					//hide eventueel loaddropdown en help
					$('#lcMenu a.lcLoad').removeClass('lcActive');
					$('#lcMenu .lcLoadcontent').hide();
					$('#lcMenu .lcHelpcontent').stop(true, true).hide();
					
					if ($(this).toggleClass('lcActive').hasClass('lcActive')) {
						var lcSettingsList = $this.listSettings(),
							arr = [];
						for (var i=0, j=lcSettingsList.length; i < j; i++) {
							arr.push('<div class="lcSetting"><a class="settingLink" href="#'+lcSettingsList[i]+'">'+lcSettingsList[i].split('|')[0]+'</a><a class="lcDelete" title="delete setting">x</a><div class="saveOrCancel"><a class="lcSaveAsSpecific orange">save</a><a class="lcCancelSpecific" href="#">cancel</a></div></div>');
						}
						if (arr.length) {
							$('#lcSaveAsList').html(arr.join(''));	
						} else {
							$('#lcSaveAsList').html('<div class="lcSetting">There are no saved settings yet.</div>');
						}
						$('#lcMenu .lcSaveAscontent').show();
					} else {
						$('#lcMenu .lcSaveAscontent').hide();
					}
					
				});
				
				$('#lcSaveAsInputSave').click(function(e){ 
					e.preventDefault();
					e.stopPropagation();
					
					var newName = $.trim($('#lcSaveAsName').val().replace(/[^\w\s]/gi, ''));
					if (newName) {
						$this.saveSettings(newName);
						$('#lcSaveAsName').val('');
						$('#lcSaveAsList').fadeOut(100).delay(1500).fadeIn(100);
						$('#lcMenu .lcSaveAscontent .lcSavedMsg').fadeIn(100).delay(1500).fadeOut(100);
						$('#lcMenu .lcSaveAscontent').delay(1000).fadeOut(500);
						$('#lcMenu a.lcSaveAs').removeClass('lcActive');
					}
				});
				
				$('#lcSaveAsName').bind('keydown', 'return', function(e){
					e.preventDefault();
					e.stopPropagation();
					
					$('#lcSaveAsInputSave').trigger('click');
				});
				
				$('#lcMenu .lcSaveAscontent').on('click', '#lcSaveAsList .lcDelete', function(e){
					e.preventDefault();
					e.stopPropagation();
					$this.deleteSettings($(this).siblings('.settingLink').attr('href').substr(1));
					$(this).parent().remove();
				});
				
				$('#lcMenu .lcSaveAscontent').on('click', '#lcSaveAsList a.settingLink', function(e){
					e.preventDefault();
					e.stopPropagation();
					
					if (!$('#lcSaveAsList a.settingLink.lcSelected').length) {
						$(this).addClass('lcSelected').siblings('.lcDelete').hide().siblings('.saveOrCancel').show('slide', { direction: 'right'}, 300);
					}
				});
				
				$('#lcMenu .lcSaveAscontent').on('click', '#lcSaveAsList a.lcSaveAsSpecific', function(e){
					e.preventDefault();
					e.stopPropagation();
					$this.saveSettings($(this).parent().siblings('.settingLink').attr('href').substr(1));
					$('#lcSaveAsList').fadeOut(100).delay(1500).fadeIn(100);
					$('#lcMenu .lcSaveAscontent .lcSavedMsg').fadeIn(100).delay(1500).fadeOut(100);
					$('#lcMenu .lcSaveAscontent').delay(1000).fadeOut(500);
					$('#lcMenu a.lcSaveAs').removeClass('lcActive');
				});
				
				$('#lcMenu .lcSaveAscontent').on('click', '#lcSaveAsList a.lcCancelSpecific', function(e){
					e.preventDefault();
					e.stopPropagation();
					$(this).parent().siblings('.settingLink').removeClass('lcSelected').siblings('.lcDelete').delay(400).show(100);
					$(this).parent().hide('slide', {direction: 'right'}, 300);
				});
				
				//Event-listner voor verwijderen van alle rules.
				$('#lcMenu a.lcRemove').click(function(e){ 
					e.preventDefault();
					e.stopPropagation();
					
					$this.clearRules(); 
				});
				
				//Event-listner voor helpicoontje.
				$('#lcMenu .lcHelp').hover(function(e){ 
					$('#lcMenu .lcHelpcontent').stop(true, true).show();
					
					//hide eventueel saveas-dropdown
					$('#lcMenu a.lcSaveAs').removeClass('lcActive');
					$('#lcMenu .lcSaveAscontent').hide();
					
					//hide eventueel loaddropdown
					$('#lcMenu a.lcLoad').removeClass('lcActive');
					$('#lcMenu .lcLoadcontent').hide();
					
				},
				function(e){
					$('#lcMenu .lcHelpcontent').stop(true, true).delay(1000).fadeOut(500);
				}).click(function(e){ e.preventDefault(); });
				
				//Event-listner voor saven laatste setting
				$(window).bind('unload', function(e){
	                $this.saveSettings();
	            });
	            
	            //check if there are any settings at all. If not, add default settings
				this.checkDefaultSettings();
				
				this.loadSettings();
			},
			toggleLcRules: function(){
				$('#lcHorizontal, #lcVertical, div.lcHorRule, div.lcVertRule, #lcMenu').toggle();
			},
			addRule: function(e,orientation, posX, posY){
				var $this = this,
					afstandArrIndex;
					
				var rule = $('<div><div class="lcRule"><div class="lcPosition"></div><div class="lcArrow">'+(orientation === 'hor'?'&#x25B6;':'&#x25BC;')+'</div></div></div>').addClass(function(){ return (orientation === 'hor'?'lcHorRule':'lcVertRule') + (e?' lcSelected':'') })
				.appendTo(this.body).draggable(
					{ 
						axis: orientation === 'hor'?'y':'x',
						cursor: orientation === 'hor'?'n-resize':'w-resize',
						start: function(e, ui){
							ui.offset.top = Math.ceil(ui.offset.top);
							ui.offset.left = Math.ceil(ui.offset.left);
							$('div.lcHorRule.lcSelected, div.lcVertRule.lcSelected').removeClass('lcSelected');
							$(this).addClass('lcSelected').find('.lcPosition').stop(true, true).fadeIn(100);
							
							this.afstandArrIndex = $this.getAfstandArrIndex(this.orientation, ui.offset);
						},
						drag: function(e , ui){
							if (!paddingRule) { paddingRule = (orientation === 'hor')? $('.lcRule',this).position().top : $('.lcRule',this).position().left }
							ui.offset.top = Math.ceil(ui.offset.top);
							ui.offset.left = Math.ceil(ui.offset.left);
							$('.lcPosition',this).text((orientation === 'hor'?ui.offset.top+paddingRule : ui.offset.left+paddingRule)+'px');
							$this.updateRuleDistance(this.afstandArrIndex, this.orientation, this.orientation === 'hor'?ui.offset.top : ui.offset.left);
						},
						stop: function(e , ui){
							ui.offset.top = Math.ceil(ui.offset.top);
							ui.offset.left = Math.ceil(ui.offset.left);
							var arr = [];
							$('div.lcHorRule').each(function(){ arr.push($(this).offset().top) });
							
							if ((this.orientation === 'hor' && ui.offset.top > 24) || (this.orientation === 'vert' && ui.offset.left > 24)) {
								$('.lcPosition',this).stop(true, true).delay(500).fadeOut(500);
							} else {
								// gedropt binnen createzone, dus verwijderen.
								this.orientation === 'hor' ? afstandArrHor.splice($this.getAfstandArrIndex(this.orientation, ui.offset), 1): afstandArrVert.splice($this.getAfstandArrIndex(this.orientation, ui.offset), 1);
								$this.updateDistanceDisplay(this.orientation);
								$(this).remove();
							}
						} 
					})
				.offset({ top: orientation === 'hor'?posY||e.pageY:0, left: orientation === 'hor'?0:posX||e.pageX})
				.dblclick(function(e){
					this.orientation === 'hor' ? afstandArrHor.splice($this.getAfstandArrIndex(this.orientation, $(this).offset()), 1): afstandArrVert.splice($this.getAfstandArrIndex(this.orientation, $(this).offset()), 1);
					$this.updateDistanceDisplay(this.orientation);
					$(this).remove();
				})
				.click(function(e){
					if (!e.shiftKey) { $('div.lcHorRule.lcSelected, div.lcVertRule.lcSelected').not(this).removeClass('lcSelected'); }
					$(this).toggleClass('lcSelected').find('.lcPosition').stop(true, true).fadeIn(100).delay(800).fadeOut(500);
				})
				.mousedown(function(e){
					if (e.metaKey || e.ctrlKey) {
						e.preventDefault();
						e.stopPropagation();
						
						var offset = $(this).offset();
						$this.addRule(e,this.orientation, offset.left, offset.top);
					}
				});
				
				//trigger alleen als er een event was.
				e && rule.trigger(e);
				
				rule.get(0).orientation = orientation;
				
				this.AddToDistanceArr(orientation, rule.offset());
				
				//Zorg dat de positionDIV is gevuld.
				if (!e) {
					if (!paddingRule) { paddingRule = (orientation === 'hor')? $('.lcRule',rule).position().top : $('.lcRule',rule).position().left }
					$('.lcPosition',rule).text((orientation === 'hor'?parseInt(posY,10)+paddingRule : parseInt(posX,10)+paddingRule)+'px');
				}
				
				//clean up stray rules (behind createzone)
				setTimeout(function(){
					if ((orientation === 'hor' && Math.ceil(rule.offset().top) < 25) || (orientation === 'vert' && Math.ceil(rule.offset().left) < 25)) {
						// gedropt binnen createzone, dus verwijderen.
						orientation === 'hor' ? afstandArrHor.splice($this.getAfstandArrIndex(orientation, rule.offset()), 1): afstandArrVert.splice($this.getAfstandArrIndex(orientation, rule.offset()), 1);
						$this.updateDistanceDisplay(orientation);
						$(rule).remove();
					}
				}, 2000);
			},
			moveRule: function(e, direction, speed){
				var add,
				$this = this;
				
				if (!speed) { speed = 1; }
				
				clearTimeout(globalTimer);
				
				switch (direction) {
					case 'left':
						add = -1*speed;
					case 'right':
						if(!add) { add = 1*speed; } 
						var $selElements = $('div.lcVertRule.lcSelected');
							
						if ($selElements.length)
						{
							$selElements.each(function(i){
								var curOffset = $(this).offset(),
									afstandArrIndex = $this.getAfstandArrIndex('vert', curOffset),
									$elem = $(this),
									$position;
								
								e.preventDefault();
								curOffset.left = Math.ceil(curOffset.left);
								
								var $position = $elem.offset({ left: curOffset.left + add })
								.find('.lcPosition').text((curOffset.left+add+paddingRule)+'px');
								if ($selElements.length == 1) { 
									$position.not(':visible').stop(true, true).fadeIn(100);
									globalTimer = setTimeout(function(){
										$('.lcPosition',$elem).stop(true, true).fadeOut(500);
									},1000);
								}
								
								$this.updateRuleDistance(afstandArrIndex, 'vert', curOffset.left+add);	
							});
						}
						break;
					case 'up':
						add = -1*speed;
					case 'down':
						if(!add) { add = 1*speed; }
						
						var $selElements = $('div.lcHorRule.lcSelected');
							
						if ($selElements.length)
						{
							$selElements.each(function(i){
								var curOffset = $(this).offset(),
									afstandArrIndex = $this.getAfstandArrIndex('hor', curOffset),
									$elem = $(this),
									$position;
								
								e.preventDefault();
								curOffset.top = Math.ceil(curOffset.top);
								
								var $position = $elem.offset({ top: curOffset.top + add })
								.find('.lcPosition').text((curOffset.top+add+paddingRule)+'px');
								if ($selElements.length == 1) { 
									$position.not(':visible').stop(true, true).fadeIn(100);
									globalTimer = setTimeout(function(){
										$('.lcPosition',$elem).stop(true, true).fadeOut(500);
									},1000);
								}
								
								$this.updateRuleDistance(afstandArrIndex, 'hor', curOffset.top+add);	
							});
						}
					break;
				}
			},
			AddToDistanceArr: function(orientation, offset){
				location = Math.ceil(location);
				if (orientation === 'hor'){
					afstandArrHor.push(offset.top);
					if(afstandArrHor.length > 1) { $('<div><span></span></div>').appendTo('#lcAfstandenHor'); }
				} else {
					afstandArrVert.push(offset.left);
					if(afstandArrVert.length > 1) { $('<div><span></span></div>').appendTo('#lcAfstandenVert'); }
				}
				
			},
			updateRuleDistance: function(index, orientation, position){
				position = Math.ceil(position);
				if (orientation === 'hor') {
					afstandArrHor[index] = position;
				} else {
					afstandArrVert[index] = position;
				}
				this.updateDistanceDisplay(orientation);
			},
			updateDistanceDisplay: function(orientation){
				var elems,
					sortedArr,
					distanceArr = [];
				
				if (orientation === 'hor'){
					elems = $('#lcAfstandenHor div');
					sortedArr = afstandArrHor.slice(0);
				} else {
					elems = $('#lcAfstandenVert div');
					sortedArr = afstandArrVert.slice(0);
				}
				sortedArr.sort(function(a,b){ return a-b; });
				
				for (var i = 1, j = sortedArr.length; i < j; i++) {
					var difference = sortedArr[i] - sortedArr[i-1]; 
				    distanceArr[i-1] = difference;
				}
				if (elems.length !== distanceArr.length) {
					//Er zit een verschil tussen het aantal DIVs en het aantal distances
					var elemString = '';
					for (var k = 0, l = distanceArr.length; k < l; k++) {
						elemString += '<div><span></span></div>';
					}
					elems = elems.parent().html(elemString).children('div');
				}
				elems.each(function(i, elem){
						if (orientation === 'hor') { $(this).css({height: distanceArr[i], top: sortedArr[i]-20}).children('span').text(distanceArr[i]); }
						else { $(this).css({width: distanceArr[i], left: sortedArr[i]-20}).children('span').text(distanceArr[i]); }
				});
			},
			getAfstandArrIndex: function(orientation, offset){
				var index;
				if (orientation === 'hor'){
					index = afstandArrHor.indexOf(Math.ceil(offset.top));
					
					if (index == -1) {
						var closest,
							goal = Math.ceil(offset.top),
							closestIndex;
						$.each(afstandArrHor, function(i){
						  if (closest == null || Math.abs(this - goal) < Math.abs(closest - goal)) {
						    closest = this;
						    closestIndex = i;
						  }
						});
						index = closestIndex;
					}
					return index;
				} else {
					index = afstandArrVert.indexOf(Math.ceil(offset.left));
					
					if (index == -1) {
						var closest,
							goal = Math.ceil(offset.left);
						$.each(afstandArrVert, function(){
						  if (closest == null || Math.abs(this - goal) < Math.abs(closest - goal)) {
						    closest = this;
						    closestIndex = i;
						  }
						});
						index = closestIndex;
					}
					return index;
				}
			},
			clearRules: function(){
				$('div.lcHorRule, div.lcVertRule').remove();
				$('#lcAfstandenVert, #lcAfstandenHor').html('');
				afstandArrHor = [];
				afstandArrVert = [];
			},
			loadSettings: function(key){
				if (key && !key.match(/^lcrules-/gi)) { key = 'lcrules-'+key; }
				
				var $this = this,
					settings = GM_getValue(key||'lcrules-last');
					settingsHor = [],
					settingsVert = [];
				
				this.clearRules();
				this.listSettings();
				this.saveCurrentSettingName(key);
				
				if (settings && settings.match(/[0-9]/gi)) {
					settings = settings.split('|');
					settingsHor = settings[0].match(/[0-9]/gi)?settings[0].split(','):[];
					settingsVert = settings[1].match(/[0-9]/gi)?settings[1].split(','):[];
				}
				
				(function(){
					for (var i=0, j=settingsHor.length; i < j; i++) {
						$this.addRule(undefined,'hor', undefined, settingsHor[i]);
					}
				})();
				this.updateDistanceDisplay('hor');
				
				(function(){
					for (var i=0, j=settingsVert.length; i < j; i++) {
						$this.addRule(undefined,'vert', settingsVert[i], undefined);
					}	
				})();
				this.updateDistanceDisplay('vert');
			},
			saveSettings: function(key){
				if (key && !key.match(/^lcrules-/gi)) { key = 'lcrules-'+key; }
				if (key && key.indexOf('|') == -1) { key = key+'|'+(++saveHighestIndex); }
				
				GM_setValue(key||'lcrules-last',afstandArrHor.join(',')+'|'+afstandArrVert.join(','));
			},
			deleteSettings: function(key){
				if (key && !key.match(/^lcrules-/gi)) { key = 'lcrules-'+key; }
				GM_deleteValue(key||'lcrules-last');
			},
			listSettings: function(){
				var valueArr = GM_listValues(),
					returnArr = [];
				for (var i=0; i < valueArr.length; i++) {
					if (valueArr[i].match(/^lcrules-/gi) && valueArr[i] != 'lcrules-last') {
						if (valueArr[i].indexOf('|') !== -1) {
							//valid setting with saveIndex number
							var saveIndex = valueArr[i].split('|')[1];
							returnArr[saveIndex] = valueArr[i].replace(/^lcrules-/gi, '');;
							
							if (saveIndex > saveHighestIndex) { saveHighestIndex = parseInt(saveIndex, 10); }	
						}
					}
				}
				
				return returnArr.clean(undefined).reverse() || [];
				
			},
			getLastSettingName: function(){
				return GM_getValue('lcrulesSys-current');
			},
			saveCurrentSettingName: function(value){
				value && GM_setValue('lcrulesSys-current',value);
			},
			checkDefaultSettings: function(){
				/*
				 * 960grid 16 column = '|357,377,1257,437,497,477,537,597,617,657,677,737,777,837,857,897,917,977,1017,1077,1097,1137,1157,1217,317,417,557,717,797,957,1037,1197'
				 * 960grid 12 column = '|317,377,1257,397,457,477,537,557,617,637,697,717,777,797,857,877,937,957,1017,1037,1097,1117,1177,1197'
				 */
				var curSettings = this.listSettings();
				if (!curSettings.length) {
					afstandArrHor = [];
					afstandArrVert = '357,377,1257,437,497,477,537,597,617,657,677,737,777,837,857,897,917,977,1017,1077,1097,1137,1157,1217,317,417,557,717,797,957,1037,1197'.split(',');
					this.saveSettings('960grid 16column');
					
					afstandArrHor = [];
					afstandArrVert = '317,377,1257,397,457,477,537,557,617,637,697,717,777,797,857,877,937,957,1017,1037,1097,1117,1177,1197'.split(',');
					this.saveSettings('960grid 12column');
					
					afstandArrHor = [];
					afstandArrVert = [];
				}
			}
			
		}
	});
	
	
		$.hotkeys = {
		version: "0.8",
		
		specialKeys: {
		8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
		20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
		37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del",
		96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
		104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/",
		112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8",
		120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
		},
		
		shiftNums: {
		"`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&",
		"8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<",
		".": ">", "/": "?", "\\": "|"
		}
		};
		
		function keyHandler( handleObj ) {
		// Only care when a possible input has been specified
		if ( typeof handleObj.data !== "string" ) {
		return;
		}
		
		var origHandler = handleObj.handler,
		keys = handleObj.data.toLowerCase().split(" ");
		
		handleObj.handler = function( event ) {
		// Don't fire in text-accepting inputs that we didn't directly bind to
		if ( this !== event.target && (/textarea|select/i.test( event.target.nodeName ) ||
		event.target.type === "text") ) {
		return;
		}
		
		// Keypress represents characters, not special keys
		var special = event.type !== "keypress" && $.hotkeys.specialKeys[ event.which ],
		character = String.fromCharCode( event.which ).toLowerCase(),
		key, modif = "", possible = {};
		
		// check combinations (alt|ctrl|shift+anything)
		if ( event.altKey && special !== "alt" ) {
		modif += "alt+";
		}
		
		if ( event.ctrlKey && special !== "ctrl" ) {
		modif += "ctrl+";
		}
		
		// TODO: Need to make sure this works consistently across platforms
		if ( event.metaKey && !event.ctrlKey && special !== "meta" ) {
		modif += "meta+";
		}
		
		if ( event.shiftKey && special !== "shift" ) {
		modif += "shift+";
		}
		
		if ( special ) {
		possible[ modif + special ] = true;
		
		} else {
		possible[ modif + character ] = true;
		possible[ modif + $.hotkeys.shiftNums[ character ] ] = true;
		
		// "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
		if ( modif === "shift+" ) {
		possible[ $.hotkeys.shiftNums[ character ] ] = true;
		}
		}
		
		for ( var i = 0, l = keys.length; i < l; i++ ) {
		if ( possible[ keys[i] ] ) {
		return origHandler.apply( this, arguments );
		}
		}
		};
		}
		
		$.each([ "keydown", "keyup", "keypress" ], function() {
		$.event.special[ this ] = { add: keyHandler };
		});
})(jQuery);
var $ = jQuery.noConflict(true);