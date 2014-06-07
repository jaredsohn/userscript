// ==UserScript==
// @name          Whirlpool Plus
// @namespace     WhirlpoolPlus
// @description   Adds suite of extra optional features to Whirlpool forums.
// @version       3.4.1
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.js
// @require       http://dev.iceburg.net/jquery/jqDnR/jqDnR.js
// @include       http://forums.whirlpool.net.au/*
// @include       http://bc.whirlpool.net.au/*
// @include       http://whirlpool.net.au/*
// @exclude       http://forums.whirlpool.net.au/whim-send*
// @exclude       http://forums.whirlpool.net.au/forum-replies.cfm*p=-2*
// @exclude       http://forums.whirlpool.net.au/forum-replies.cfm*&ux* 
// @exclude       http://forums.whirlpool.net.au/forum-replies-print.cfm*
// @exclude       http://forums.whirlpool.net.au/forum-replies-archive.cfm*
// ==/UserScript==
// Some icons from http://www.pinvoke.com/
// ==Changes==
/***************
changes - 3.0.4 - fixed bug where clicking the "i" link next to a users name multiple times opened multiple boxes. Fixed a bug with the auto update.
changes - 3.0.5 - fixed an issue with the userpage/no of days feature.
changes - 3.0.6 - fixed an issue with the userpage/no of days feature (2nd go). Fixed an issue with 'mark as read' feature. Added avatars to whims.
changes - 3.0.7 - fixed tracking issue (i think). Fixed animated avatars issue (i think). Added smileys. Fixed Rep, Mod, Print View, Thread Archive links. 
Fixed too many Your Links problem (overflow scroll). Fixed glitch when your own post is deleted. Fixed a glitch when the last post was deleted. Fixed a problem with the auto-update.
changes - 3.0.8 - Fixed problem with settings box and small resolution. Added small resolution toggle feature to user page. Added whirlcode buttons to reply page.
changes - 3.0.9 - Fixed user ignore.
changes - 3.1.0 - Full size inline images are now shown on the same page when clicked. Spinner menu positioned just to the right of the left page menu.
changes - 3.1.1 - Fixed a problem with external links.
changes - 3.1.2 - Tweaked full size inline images feature. Fixed glitch with spinner menu.
changes - 3.1.3 - Fixed spinner (2nd go).
changes - 3.1.4 - Fixed avatars in whims.
changes - 3.1.5 - Fixed problem with too many links in Your Links section (i think).
changes - 3.1.6 - Fixed spinner (3rd go).
changes - 3.1.7 - Post align option. Chatbox rules link. Mark as read fixed (i think)
changes - 3.1.8 - Fixed userpage days glitch.
changes - 3.1.9 - Update for Simon's changes http://forums.whirlpool.net.au/forum-replies.cfm?t=530906&p=37#r733.
changes - 3.2.0 - Update 2 for Simon's changes http://forums.whirlpool.net.au/forum-replies.cfm?t=530906&p=37#r733.
changes - 3.2.1 - Fixed edit in place second edit error. Made user notes text box larger and added different icon if usernote available for user. 
Added a debug mode. Added static iced whirlcode. Fixed default userdays number. Added focused thread reminder.
changes - 3.2.2 - Fixed Your Links glitch.
changes - 3.2.3 - Removed some mark as read code that was causing problems.
changes - 3.2.4 - Added an option to import user notes from older script (pre 3.0).
changes - 3.2.5 - Fixed userpage back button issue.
changes - 3.2.6 - Fixed mark as read feature.
changes - 3.2.7 - Fixed users online page glitch.
changes - 3.2.8 - Removed the shock smiley.
changes - 3.2.9 - Focused thread opacity thingo.
changes - 3.3.0 - Updated for Simon's url changes.
changes - 3.4.0 - Now maintained by Troberto, Chatbox removed
changes - 3.4.1 - Chatbox setting removed
***************/
// ==/Changes==


try{

	/***********
	Error Reporting
	***********/
	var runErrorReport = GM_getValue('errorReport');
	if(runErrorReport == 'true'){
		var erDiv = document.createElement('div');
		erDiv.setAttribute('style','width:540px;height:100px;border:orange 3px solid;overflow:none;'+
									'background-color:grey;position:fixed;z-index:4000;top:0;left:0;');
		erDiv.setAttribute('id','errorReport');

		var erB = document.createElement('button');
		erB.setAttribute('style','height: 100px; float: right; width: 55px;');
		erB.textContent='List All Stored Script Values';
		
		var erTa = document.createElement('textarea');
		erTa.setAttribute('style','height:100px;width:485px;border:none;');
		erTa.setAttribute('id','errorReportTa');
		//erTa.setAttribute('readonly','readonly');
		
		erDiv.appendChild(erB);
		erDiv.appendChild(erTa);
		document.body.appendChild(erDiv);

		onerror=function(er){
			erTa.value=er.toString()+'\r\n';
		}
		function importUserNotes(){
			try{
				var userPasteSpl = erTa.value.split('$UserNote$ : ');
				var uNassArr = {};
				for(var u in userPasteSpl){
					var uns = userPasteSpl[u].split(' : ');
					uNassArr[uns[0]]=uns[1];
					
				}
				var currentUn = eval('('+GM_getValue("userNotesArr")+')');
				for(var k in uNassArr){

					if(currentUn[k]){
						currentUn[k]+='\n'+uNassArr[k];
					}
					else{
						currentUn[k]=uNassArr[k];
					}

				}
				GM_setValue('userNotesArr', currentUn.toSource().toString());
				erTa.value='Finished Import';
			}
			catch(e){
				GM_log(e);
			}
		}	

		$(erB).mouseup(function(e){
			if(e.button == 2){
				importUserNotes();
			}
			else{
				var gmVals = GM_listValues();
				for(var gmKey in gmVals){
					erTa.value+=gmKey+' : '+gmVals[gmKey]+' : '+GM_getValue(gmVals[gmKey])+'\r\n';
				}
			};
			return false;
		});
		
	}

	var gmDefaults, docs={
			d:document,
			dUrl:document.URL,
			dTitle:document.title,
			win:window,
			bt:null,
			saveOriginalHTML:null,
			lmtr:null,
			pTd3:null,
			q:null,
			eh:null,
			menuForum:$('#menu_forum ul'),
			uinfo:$('#left .userinfo'),
			checkIfSignedIn:$('#left #sign_in')[0],
			futer:$('#footer'),
			threadNumber:null,
			avatarCSS:false
		};
		
	function setGM(){

			gmDefaults = {	'errorReport':'false',
					'autoUpdateWPplus':'86400000',
					'installedScriptVersion':'3.4.0',
					'lastScriptVersionCheck':'1232062510821',
					'dynamicMenuSystem':'rightClick',
					'quickReplybox':'true',
					'quickReplyboxCols':'100',
					'quickReplyboxRows':'10',
					'autoPreview':'true',
					'threadArchiveView':'true',
					'threadPrintView':'true',
					'moderatorPostView':'true',
					'representativePostView':'true',
					'autoSubscribe':'false',
					'staticAvatars':'true',
					'animatedAvatars':'false',
					'sigs':'false',
					'editInPlace':'true',
					'whirlcodeinWikiWhimNewThread':'true',
					'noGluteusMaximus':'false',
					'recentActivityDays':'7',
					'whIMMessageTextAreaCols':'45',
					'whIMMessageTextAreaRows':'10',
					'smilies':'true',
					'inlineImages':'true',
					'inlineVideos':'true',
					'ignoreUser':'true',
					'customWPTheme':'default',
					'whirlpoolPlusLogo':'true',
					'whirlpoolBreadcrumbFont':'default font',
					'whirlpoolSidemenuFont':'default font',
					'showWhirlpoolFooterLinks':'true',
					'enableWideWhirlpool':'false',
					'penaltyBoxBackground':'false',
					'userNotes':'true',
					'hiddenUsersArr':'',
					'userNotesArr':'{}',
					'hideDRThreads':'false',
					'hideMVThreads':'false',
					'textareraSave':'',
					'lastReadTracker':'true',
					'numThreads2Track':'1000',
					'trackerPostBackgroundColour':'#CFCBBC',
					'disableTrackerPostBackgroundColour':'false',
					'newPostBackgroundColour':'#95b0cb',
					'disableNewPostBackgroundColour':'false',
					'noNewPostBackgroundColour':'#cbc095',
					'disableNoNewPostBackgroundColour':'false',
					'onlyEndSquare':'false',
					'styleFlip':'false',
					'dontTrackStickyThreads':'false',
					'noColourEndSquare':'false',
					'wlrSettingsScrollTo':'false',
					'lastPost':'false',
					'CSStextBox':' ',
					'yourLinks':'false',
					'externalSerial':'false',
					'WLRfirstRun':'true',
					'prettifyCode':'false',
					'whimAlertNotice':'false',
					'userpageInfoToggle':'false',
					'postAlign':'middle'
					};
		
		for(var k in gmDefaults){
		
			if(!GM_getValue(k)){
			
				GM_setValue(k, gmDefaults[k]);
				docs[k]=gmDefaults[k];

			}
			else{
			
				docs[k]=GM_getValue(k);
			
			}
		
		}

	}
	function time(){

		var xDate = new Date();	
		var gF = xDate.getFullYear();
		var gM = xDate.getMonth()+1;
		var dArr = [''+gM+'', ''+xDate.getDate()+'', ''+xDate.getHours()+'', ''+xDate.getMinutes()+'', ''+xDate.getSeconds()+''];

		for(var i=0;i<dArr.length;i++){

			if(dArr[i].length == 1){

				dArr[i] = '0'+dArr[i];

			}

		}
		
		return escape(gF+"-"+dArr[0]+"-"+dArr[1]+"+"+dArr[2]+":"+dArr[3]+":"+dArr[4]);			

	}
	var wcPrev={
		
		showPreview:function(){
		
			if(docs.lmtr && !docs.pTd3){

				$(docs.lmtr).after('<tr height="100" id="previewTR"><td class="bodyuser" style="vertical-align: middle;"><p style="opacity:0.3;font:2em bold Verdana">'+
													'Preview</p></td><td class="bodytext"/><td class="bodypost" style="vertical-align: middle;"><p style="opacity:0.3;font:2em bold '+
													'Verdana">Preview</p></td></tr>');
				docs.pTd3 = $('#previewTR td:eq(1)');
			
			}

			/***preview code by Simon Wright - http://forums.whirlpool.net.au/forum-user.cfm?id=10***/
	
			var previewTimer;
			var previewWait = false;

			if (!previewWait) {

				previewWait = true;
				previewTimer = setTimeout(function(){
				
					docs.pTd3.html(unsafeWindow.whirlcode2(docs.q.val(), docs.eh));
					
					previewWait = false;
					
				}, 600);
			}
			
		}
	}	
	var whirlC={

		generalStyle:function(){
	
			GM_addStyle('#qQuote{margin-top:20px;} #qqTextArea{background:#E5E5E5 none no-repeat scroll 50% 50%;border:1px solid gray;color:black;}'+
						'#qqpost{width: 150px; font-family: Arial; font-style: normal; font-variant: normal; font-weight: normal; font-size: 16px; '+
						'line-height: normal; font-size-adjust: none; font-stretch: normal; -x-system-font: none;} '+
						'#qqpostclear{width: 150px; font-family: Arial; font-style: normal; font-variant: normal; font-weight: normal; font-size: 16px; '+
						'line-height: normal; font-size-adjust: none; font-stretch: normal; -x-system-font: none;} '+				
						'#opInputs p{float:left;margin-left:5px;}'+
						'#qqWCPreview{border:solid 1px grey;cursor:default;float:left;height:18px;margin-right:-80px;padding:2px;width:80px;} '+
						'#qqPreview{display:none;text-align:left;padding:5px;background:#EEEEEE url(http://forums.whirlpool.net.au/img/forum/reply-eeeeee.gif) '+
						'repeat-x scroll center bottom;border:2px solid grey;margin-bottom:10px;width:60%;} '+
						'#qqTooManyWords{display:none;background-color:#E8B760;height:250px;position:absolute;width:100%;font-weight:bold;z-index:6;} '+
						'#aloader{display:none;}.qqwcodeButtons{font-size:0.9em;}');

		},
		code:function(){
		
				return {
						wc_whirlBold :			{ encloseLeft : "[*", encloseRight  : "*]"},
						wc_whirlItalic :		{ encloseLeft : "[/", encloseRight  : "/]"},
						wc_whirlSingleQuote :	{ encloseLeft : "['", encloseRight  : "']"},
						wc_whirlDoubleQuote :	{ encloseLeft : "[\"", encloseRight  : "\"]"},
						wc_whirlQuote :			{ encloseLeft : "[+", encloseRight  : "+]"},
						wc_whirlSuperscript :	{ encloseLeft : "[^", encloseRight  : "^]"},
						wc_whirlSubscript :		{ encloseLeft : "[\\", encloseRight  : "\\]"},
						wc_whirlStrike :		{ encloseLeft : "[-", encloseRight  : "-]"},
						wc_whirlCourier :		{ encloseLeft : "[#", encloseRight  : "#]"},
						wc_whirlSmall :			{ encloseLeft : "[(", encloseRight  : ")]"},
						wc_whirlGrey :			{ encloseLeft : "[`", encloseRight  : "`]"},
						wc_whirlSerif :			{ encloseLeft : "[~", encloseRight  : "~]"},
						wc_whirlGoogle :		{ encloseLeft : "[?", encloseRight  : "?]"},
						wc_whirlEscape :		{ encloseLeft : "[.", encloseRight  : ".]"},
						wc_whirlWiki :			{ encloseLeft : "[[", encloseRight  : "]]"},
						wc_whirlSpoil :			{ encloseLeft : "[_", encloseRight  : "_]"}						
					}
		},
		buttons:function(id, w, c){
		
			return '<div id="'+id+'" style="text-align:center;padding-bottom:10px;width:'+w+'">'+
						'<button type="button" class="'+c+'" title="Bold WhirlCode" accesskey="b" id="wc_whirlBold" >Bold</button>' +
						'<button type="button" class="'+c+'" title="Italic WhirlCode" accesskey="i" id="wc_whirlItalic" >Italic</button>' +
						'<button type="button" class="'+c+'" title="SingleQuote WhirlCode" accesskey="t" id="wc_whirlSingleQuote" >\'quote\'</button>' +
						'<button type="button" class="'+c+'" title="DoubleQuote WhirlCode" accesskey="q" id="wc_whirlDoubleQuote" >"quote"</button>' +
						'<button type="button" class="'+c+'" title="Quote WhirlCode" accesskey="h" id="wc_whirlQuote" >who</button>' +
						'<button type="button" class="'+c+'" title="Superscript WhirlCode" accesskey="p" id="wc_whirlSuperscript" >Super</button>' +
						'<button type="button" class="'+c+'" title="Subscript WhirlCode" accesskey="\\" id="wc_whirlSubscript" >Sub</button>' +
						'<button type="button" class="'+c+'" title="Strike WhirlCode" accesskey="k" id="wc_whirlStrike" >Strike</button>' +
						'<button type="button" class="'+c+'" title="Courier WhirlCode" accesskey="c" id="wc_whirlCourier" >Courier</button>' +
						'<button type="button" class="'+c+'" title="Small WhirlCode" accesskey="m" id="wc_whirlSmall" >Small</button>' +
						'<button type="button" class="'+c+'" title="Grey WhirlCode" accesskey="r" id="wc_whirlGrey" >Grey</button>' +
						'<button type="button" class="'+c+'" title="Serif WhirlCode" accesskey="s" id="wc_whirlSerif" >Serif</button>' +
						'<button type="button" class="'+c+'" title="Google WhirlCode" accesskey="g" id="wc_whirlGoogle" >Google</button>' +
						'<button type="button" class="'+c+'" title="Escape WhirlCode" accesskey="e" id="wc_whirlEscape" >Esc</button>' +
						'<button type="button" class="'+c+'" title="Wiki WhirlCode" accesskey="w" id="wc_whirlWiki" >Wiki</button>' +
						'<button type="button" class="'+c+'" title="Spoiler WhirlCode" accesskey="o" id="wc_whirlSpoil" >Spoiler</button>' +
						'<button type="button" class="'+c+'" title="URL Link" accesskey="u" id="wc_whirlurl" >URL</button>' +
						'<button type="button" class="'+c+'" title="Link" accesskey="l" id="wc_whirllink" >Link</button>' +
						'</div>';

		},									
		buttonEvents:function(c, tAr, whirlCode){		

			$('.'+c).bind('mouseup', function(evt){

				var qqbuttonID = $(this).attr('id');		
				tAr.focus(function(){}); //I don't understand it either, but tAr.focus(); without an anonymous function produces a weird error.
				var qqcurrentValue = tAr.val();
				var qqtheSelection = tAr.val().substring(tAr[0].selectionStart, tAr[0].selectionEnd);

				function insertAtCursor(qqmyField, qqmyValue) {

					if (qqmyField.selectionStart || qqmyField.selectionStart == '0') {
					
						var qqstartPos = qqmyField.selectionStart;
						var qqendPos = qqmyField.selectionEnd;
						qqmyField.value = qqmyField.value.substring(0, qqstartPos)+qqmyValue+qqmyField.value.substring(qqendPos, qqmyField.value.length);
						
					} 
					else {
					
						qqmyField.value += qqmyValue;
						
					}

				}

				if(qqtheSelection === ""){
				
					if(((qqcurrentValue.split(whirlCode[qqbuttonID].encloseLeft).length+qqcurrentValue.split(whirlCode[qqbuttonID].encloseRight).length)  % 2) === 0){
						
						insertAtCursor(tAr[0], whirlCode[qqbuttonID].encloseLeft);
						
					}
					else{
						
						insertAtCursor(tAr[0], whirlCode[qqbuttonID].encloseRight);
							
					}
	
				}
				/*else if(qqbuttonID == "wc_Sink"){
				
					var kImg = "data:image/gif;base64,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";

					if($('#ks')[0]){
					
						$('#ks').remove();
					
					}
					else{

						var ey = evt.pageY+30;
						var eX = evt.pageX-200;

						$('body').prepend('<img id="ks" style="position:absolute;top:'+ey+'px;left:'+eX+'px;z-index:5;"src="'+kImg+'" />');
						
					}

				}	*/			
				else if(qqbuttonID == "wc_whirlurl"){
				
					var uPrompt = window.prompt("Enter URL:", "http://"); 
					
					if ((uPrompt !== "http://") && (uPrompt !== "") & (uPrompt !== null)) {

						insertAtCursor(tAr[0], '<a href="'+uPrompt+'">'+qqtheSelection+'</a>');
					
					}

				}
				else if(qqbuttonID == "wc_whirllink"){
				
					var uPrompt = window.prompt("Enter Text:", ""); 
					
					if ((uPrompt !== "") & (uPrompt !== null)) {
					
						if(qqtheSelection.indexOf('http://')<0){
						
							qqtheSelection = 'http://'+qqtheSelection;
						
						}

						insertAtCursor(tAr[0], '<a href="'+qqtheSelection+'">'+uPrompt+'</a>');
					
					}
					
				}		
				else{
				
					if(qqtheSelection.indexOf('\n')>-1 || qqtheSelection.indexOf('\r')>-1){
					
						var tSel = qqtheSelection.replace(/^(.+)$/mg, whirlCode[qqbuttonID].encloseLeft+"$1"+whirlCode[qqbuttonID].encloseRight);
					
						tAr.val(tAr.val().replace(qqtheSelection, tSel));					
					
					}
					else{
					
						insertAtCursor(tAr[0], whirlCode[qqbuttonID].encloseLeft+qqtheSelection+whirlCode[qqbuttonID].encloseRight);
					
					}

				}	
				
				if(docs.pTd3){
				
					wcPrev.showPreview();
				
				}
				
			});			
		
			
		
		}

	}
	var wlrSettings ={
	
		yourLinks:function(){

			if(docs.externalSerial !=='false'){
				var bullet = docs.uinfo.next();
				bullet.removeClass('bulletproof');
				bullet.html('<dt>Your Links</dt>');
				
				$.ajax({
					type: "GET",
					url: "http://"+docs.d.domain+"/external/rss-links.cfm?serial="+docs.externalSerial,
					success: function(x){
						try{
							var parser = new DOMParser();
							var doc = parser.parseFromString(x, "text/xml");
							var getItems = doc.getElementsByTagName('item');
							for(var i in getItems){
								bullet.append('<dd><a href="'+getItems[i].childNodes[3].textContent+'">'+getItems[i].childNodes[1].textContent+'</a></dd>');
							}
							if(bullet.height()>200){
								var newHeight = $('#left').height()+bullet.height();
								$('#root').css('height',newHeight);
							}
						}
						catch(e){
						
						}
					}
				});	
			}			
		},	
		set:function (){
		
			var l = $('<li>');
			var la = $('<a id="wPPSettingsLink" href="#">WP+ Settings</a>');
			l.append(la);
			if(docs.menuForum.hasClass('selected')){
				docs.menuForum.append(l);
			}
			else{
				$('#menu .selected ul').append(l);
			}

			if(docs.futer.text().match('The Pool Room')){
				var uinfoName=docs.uinfo.children('dt:first').text();
				var newDDforA = $('<DD>');	
				var aforDD = $('<a href="http://widget.mibbit.com/?settings=6c09163b5ce1890c08a31a91cb300b34&server=au.austnet.org&channel=%23tpr&nick='+uinfoName+'" target="_blank">TPR IRC Chat <span style="font-size:0.7em;">(opens in new tab)</span></a>');
				newDDforA.append(aforDD);
				/*aforDD.click(function(){
					GM_openInTab(""+uinfoName+"");
					return false;
				});*/

				docs.uinfo.append(newDDforA);
			}
		
			if(docs.CSStextBox !==' '){
				GM_addStyle(decodeURIComponent(docs.CSStextBox));
			}

			var updateGearsCheck = 'block';
			
			if(window.google){
				updateGearsCheck = 'none';
			}
			
			var infoIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABIAAAASABGyWs+AAADEUlEQVQ4y1WTTWhcVRiGn3PunTszNz83mWaKnTqS6YxpKdVG0xIQWyokrYwiQheuLNa1GxdCRVxbQQioC0HdCRIkLsQuRJKmTlO1IKQm6Y+apknbqTOZyUwm83v/josbEz3wbt7zve/3fofzCaUU/z3lzVZ0/nb5+N2HrVO2z5CUQsP3Vh+PR3PHDseuPjbQtSmE2KkX/xp4vs+vC4Vncr9X3rFisdM9lhXTjZBwXEGr46raZr1er5R/PpaJfDQ2mpgOG7q/Y+D7iqnp5RfnV/1P0gdTmYodQgLZI1DvwPeL4HpgSI/C2sPS0X2t985l01+EDd2XAHPz+aOzS52P46l05s5GiPsVQEKyH1J7QEqotqHY1AjtTQ5cXjY++HZm5SUAsbnVMi58tvh57+Dhc21p4nggRCA6tBdcBXeK4Pngb8N1XBorC3Mfvpk6K+fm8yN/1cwzJddkywZbQUcBGqTjkLDAIeDsbbiaTkUbGPkut5aVV357dAKzP/5gC/L1oLCtwDLhRApOHoBoOOB34IPW0xe5drM6pq8UmpmmFZZ2O7iwRSBWIhhFl6Dr4Anw2IYCL2Twd9VNS99ztKarcAQIHaoOlDqg5O5bxLqhJwpK2x3D8X2EUEL2Gc17ultTmh50Mgzo6woEAJqAfjPg9BC0FDQ8aLRa9OidNfnsk9ZcPX+3EjFA6hAOw55uGOgCKUCTEO8OTKJhcEWQxC0/sJ9OajNy/PmD183qnzmzVaTXBE2HiAFmeDuBhLgJvVEwQtAVgX7ZQOVvLb36QvqSzBxI1l8fS0zcuvzjo7jWJGGB0KBmQ6kO1SY4KvhYfSYkTIc/clcb2SPGxMhTg2sSBOdfO/XT+BOVd2e+nirWCutYEYWvwcwqXC9AWwTJSuUtpr/5oXFILF98+/zJSU3Xd5dpY2NDXvx0avyrK+UL4czw6NDwUHQwaRE1BOvrdZZu3HOKCzcWXxmOTLz/1suT+/fvs/+3jQC23WFm9pf4l5O5M9duVsfLbS0jpCatkHv/+JA1+8bZ0UvZ08+tRqPmjuYfGUlYh5mncS4AAAAielRYdFNvZnR3YXJlAAB42isvL9fLzMsuTk4sSNXLL0oHADbYBlgQU8pcAAAAAElFTkSuQmCC';
			var arrowDown = 'data:image/gif;base64,R0lGODlhEAAQAJECAP///6uopv///wAAACH5BAEAAAIALAAAAAAQABAAAAIcVI6Zpu0PIwRAImoPzjvSX01gKHYemaVqxFhCAQA7';
			var arrowUp = 'data:image/gif;base64,R0lGODlhEAAQAJECAP///6uopv///wAAACH5BAEAAAIALAAAAAAQABAAAAIbVI6Zpu0PIwRAHkolxnFnXVnBZ5GgiKYiYwkFADs%3D';
			
			GM_addStyle('#wlrSettingsDiv {'+
				'background-color:#D3DAED;'+
				'height:400px;'+
				'left:50px;'+
				'overflow-x:scroll;'+
				'overflow-y:scroll;'+
				'position:absolute;'+
				'top:20px;'+
				'width:500px;'+
				'z-index:50;'+
			'}'+
			'#autoUpdateWPplus{'+
			'	display:'+updateGearsCheck+';'+
			'}'		+
			'#wlrSettingsDiv ul#wlrtabmenu li{'+
				'border:3px solid #777;'+
				'border-width:3px 3px 1px;'+
				'float:left;'+
				'height:20px;'+
				'margin-right:10px;'+
				'padding:5px;'+
				'width:140px;'+
				'text-align:center;'+
				'	color:white;'+
			'}'+
			'#wlrSettingsDiv #wlrtabmenu li.active{'+
			'	background-color:orange;'+
			'	border:3px solid #555;'+
			'	border-width:3px 3px 1px;'+
			'}'+
			'#wlrSettingsDiv #wlrtabmenu li:hover{'+
				'cursor:pointer;'+
				'border:3px solid #555;'+
				'border-width:3px 3px 1px;'+
			'}'+	
			'#wlrSettingsDiv .wlrsetbutDown{'+
				'background:transparent url("'+arrowDown+'") no-repeat;'+
				'height:21px;'+
				'padding:0;'+
				'width:21px;	'+		
				'position:relative;'+
				'top:-5px;'+
				'left:4px;'+
			'}'+				
			'#wlrSettingsDiv .wlrsetbutUp{'+
				'background:transparent url("'+arrowUp+'") no-repeat;'+
				'height:21px;'+
				'padding:0;'+
				'width:21px;	'+		
				'position:relative;'+
				'top:-5px;'+
				'left:4px;'+				
			'}'+				
			'#wlrSettingsDiv p{'+
			'	border-bottom:1px dashed grey;'+
			'	margin-left:15px;'+
			'	padding-bottom:15px;'+
			'}'+
			'#prevContainer>*{'+	//just chucking these here so can save an extra GM_addStyle()
				'margin-left:10px;'+
				'margin-right:12px;}'+
			'.maximumWidthImage{'+
				'max-width:999999999999px !important;'+
			'}'+
			'TD.bodytext {'+
				'vertical-align: '+docs.postAlign+' !important;'+
			'}');

					//smiling
			docs.smlHappy = "data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%8D%B3%D8%3Ff%B3%003%99%B7%D0%E7u%A3%D1%FF%FF%FFe%8F%C6-V%A9%A8%BC%DC%CF%E0%EF%94%A7%CD%96%B9%DC%BC%D3%E8%11%40%9F%84%A4%D0f%99%CC%AC%C8%E3%CF%D6%E2%93%B6%D9u%9B%CB%D6%E3%F0%AC%C0%DE%84%AD%D6%2F%5C%AD%8C%A5%D6Jm%B3%7D%A8%D4%94%B8%DB%C5%D9%EA%D0%D6%E3%9C%BE%DE%A6%C4%E1%AF%CA%E4%DD%E9%F3%AD%C5%DE%91%AD%D42_%AEDl%B5f%99%CC%7B%9E%CD%C3%D8%EB(W%AB%9A%B4%D8%ED%ED%ED%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%05%14%00%2C%00%2C%00%00%00%00%0F%00%0F%00%00%06%96%40%96%90%B5%D08%06%0E%CDb8%F4%20%04%16E%87%40%12%20%24C%89%23!%EA4B%60%D0%C3%81e!%B8%00%40%24%02J%7FP%08%A2%A6KX%83%3Ex%7C%A9%18mD%00w%1F%00%1C%84(F%15)%60%00x%1C%00%01%8F%01G%0Au%20w%84%01%17%99%17H%1D!%80%1F%0C%0C%98%17%00%1B%1BI%2B%9Ei%AB%AB%05%07J%26l%00%06%B4%B4%00%05%05*K%08%0Fw%AC%B7%AEq%2C%1E%0E%0Fx%13%98%1B%AE%0E%1EM%08%18%0F%C8%17%14%25%08%CDLrGIKCA%00%3B";
			
			var wlrSettingsDivTop;
			(window.innerHeight>560)?wlrSettingsDivTop='6%':wlrSettingsDivTop='0';
			
			var settingsHTML = '<div id="wlrSettingsDiv" style="background-color:#999999;border:1px solid black;color:#333333;display:none;'+
									'left:50%;margin-left:-400px;padding:0 12px;position:fixed;top:'+wlrSettingsDivTop+';width:800px;overflow:hidden;height:540px;'+
									'display:block;z-index:3000;">'+
									//'<h2 style="margin:5px 0 -25px 0;">Whirlpool Plus Settings</h2>'+
									'<ul id="wlrtabmenu" style="list-style:none;float:left;margin:14px 0px 0px 32px">'+
										'<li class="active wlrtabmenuTabs">General Settings</li>'+
										'<li class="wlrtabmenuTabs">Custom CSS</li>'+
										'<li class="wlrtabmenuTabs">Hidden Users</li>'+
										'<li class="wlrtabmenuTabs">Colour Picker</li>'+
									'</ul>		'+							
									'<div id="setContainer" class="wlrtabmenuDivs" style="float:left;border:3px solid #555;background-color:#EEEEEE;height:440px;margin-bottom:5px;overflow-x:hidden;overflow-y:scroll;">'+
									  '<button id="resetWLR" style="margin: 10px 10px 5px 250px;">Reset All Settings To Default Values</button>'+ 
									  '<div style="margin: 10px 10px 5px 290px;opacity:0.4;">Installed Script Version: '+docs.installedScriptVersion+'</div>'+
									  '<hr />'+
									  '<span style="float:right;margin-right:10px;opacity:0.4;font-size:12px;">Scroll Down For More Settings</span>'+									  
									  '<p id="errorReport">'+
										'<input type="checkbox" name="enabledebugmode">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Enable Debug Mode</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>    '+										  
									  '<p id="autoUpdateWPplus">'+
										'<select name="wpaupdate">'+
										  '<option value="disable">disable updates</option>'+								  
										  '<option value="3600000">1 hour</option>'+
										  '<option value="21600000">6 hours</option>'+
										  '<option value="43200000">12 hours</option>'+
										  '<option value="86400000">24 hours</option>'+
										'</select>     '+
										'<button type="button" id="forceUpdate">Force Update</button> '+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Automatically updates to the latest version</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>'+
									  '<p id="externalSerial">'+
										'<input type="text" name="externalSerialNum" value="'+docs.externalSerial+'">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">External Serial Number (needed for "Your Links" feature)</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>    '+										  
									  '<p id="yourLinks">'+
										'<input type="checkbox" name="enableyourLinks">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Enable "Your Links"</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>    '+									  
									  '<p id="dynamicMenuSystem">'+
										'<select name="dynamicMen">'+
										  '<option value="none">none</option>'+
										  '<option value="rightClick">right click</option>'+
										  '<option value="spinner">spinner</option>'+
										'</select>     '+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Dynamic Menu System</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>    '+
									  '<p id="quickReplybox">'+
										'<input type="checkbox" name="quickRepb">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Enable a Quick Reply Box at the bottom of threads and Quick Quote links next to posts.</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>     '+
									  '<p id="quickReplyboxCols">'+
										'<input type="text" readonly="readonly" name="quickReplyboxC">'+
										'<button class="wlrsetbutDown" type="button"></button> '+
										'<button class="wlrsetbutUp" type="button"></button> '+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Change the number of cols(width) of the Quick Reply Box.</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>     '+
									  '<p id="quickReplyboxRows">'+
										'<input type="text" readonly="readonly" name="quickReplyboxR">'+
										'<button class="wlrsetbutDown" type="button"></button> '+
										'<button class="wlrsetbutUp" type="button"></button> '+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Change the number of rows(height) of the Quick Reply Box.</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p> '+
									   '<p id="autoPreview">'+
										'<input type="checkbox" name="autoPr">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Show a preview of what you are typing in the quick quote box</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>     '+
										'<p id="threadArchiveView">'+
										'<input type="checkbox" name="threadArchiveV">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Show all Posts in Thread Archive View Link at top of thread.</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p> '+
									  '</p>     '+
										'<p id="threadPrintView">'+
										'<input type="checkbox" name="threadPrintV">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Show all Posts in Thread Print View Link at top of thread.</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>       '+
									   '</p>     '+
										'<p id="moderatorPostView">'+
										'<input type="checkbox" name="moderatorPostV">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Show a link to view only moderator posts.</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p> '+
									   '</p>  '+   
										'<p id="representativePostView">'+
										'<input type="checkbox" name="representativePostV">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Show a link to view only representative posts.</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>       '+
									   '</p>     '+
										'<p id="autoSubscribe">'+
										'<input type="checkbox" name="autoSubs">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Automatically subscribe to a thread when you make a post.</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>'+
										'</p>     '+
										'<p id="staticAvatars">'+
										'<input type="checkbox" name="staticAv">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Display static avatars (non-animatied).</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>     '+
										'</p>     '+
										'<p id="animatedAvatars">'+
										'<input type="checkbox" name="animatedAv">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Display animated avatars.</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p> '+
										'<p id="sigs">'+
										'<input type="checkbox" name="sgs">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Display user sigs. (feature not implemented yet)</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p> '+									  
										'<p id="editInPlace">'+
										'<input type="checkbox" name="editInP">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Turn on ability to edit post in thread using Ajax.</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>       '+
										'<p id="whirlcodeinWikiWhimNewThread">'+
										'<input type="checkbox" name="whirlcodeinWikiWhimNewT">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Turn this on to use Whirlcode in Wiki and New Page Thread.</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p> '+
									  '</p>       '+
										'<p id="noGluteusMaximus">'+
										'<input type="checkbox" name="noGluteusM">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Removes the &p=-1#bottom from thread links on the main index page on Whirlpool</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p> '+
									  '</p>       '+
										'<p id="prettifyCode">'+
										'<input type="checkbox" name="pretCode">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Make code (pre tags) look goodera.</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p> '+									  
									  '</p>       '+
										'<p id="recentActivityDays">'+
										'<select name="recentActivityD">'+
										  '<option value="1">1</option>'+								  
										  '<option value="3">3</option>'+
										  '<option value="7">7</option>'+
										  '<option value="14">14</option>'+
										  '<option value="30">30</option>'+
										  '<option value="60">60</option>'+
										  '<option value="120">120</option>'+										  
										'</select>     '+										
										'&nbsp;&nbsp;<span class="wrlSetDescription">Set your default Recent Activity Days on your user page. Default is 7 - set it to 7 to disable this custom function.</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p> '+
									  '</p>       '+
									  '<p id="whIMMessageTextAreaCols">'+
										'<input type="text" readonly="readonly" name="whIMMessageTextAreaC">'+
										'<button class="wlrsetbutDown" type="button"></button> '+
										'<button class="wlrsetbutUp" type="button"></button> '+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Increase/Decrease the number of columns (width) of the WhIM Message Area.</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p> '+
									  '<p id="whIMMessageTextAreaRows">'+
										'<input type="text" readonly="readonly" name="whIMMessageTextAreaR">'+
										'<button class="wlrsetbutDown" type="button"></button> '+
										'<button class="wlrsetbutUp" type="button"></button> '+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Increase/Decrease the number of rows (height) of the WhIM Message Area.</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p> '+
									  '</p>       '+
										'<p id="smilies">'+
										'<input type="checkbox" name="smile">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">With smilies on, script will automatically change: :) into: <img src="'+docs.smlHappy+'" /></span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>       '+
										'<p id="inlineImages">'+
										'<input type="checkbox" name="inlineI">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Turns image links into images.</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>             '+
										'<p id="inlineVideos">'+
										'<input type="checkbox" name="inlineV">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Turn on ability to change YouTube and google video links to embedded videos with title.</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>  '+
									  '</p>             '+
										'<p id="ignoreUser">'+
										'<input type="checkbox" name="ignoreUserB">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Adds a button next to each user\'s aura vote smilies, which when activated will prevent you from '+
										'seeing that user. WARNING: Ignoring a user will cause ALL of their posts not to appear for you any more. If you want to remove someone from'+
										'being ignored, click on the "Hidden Users" tab above.</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p> '+
									  '</p>             '+
										'<p id="userNotes">'+
										'<input type="checkbox" name="ignoreUserB">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">userNotes.</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p> '+								  
									  '<p id="customWPTheme">'+
										'<select name="s_customtheme">'+
										  '<option value="">Default</option>'+
										  '<option value="@import url(http://members.optusnet.com.au/whirlpoolian/classic/css/core.css);">WP Classic</option>'+
										  '<option value="@import url(http://members.optusnet.com.au/foonly/wpblue/1/css/core.css);">WP Blue</option>'+
										  '<option value="@import url(http://members.optusnet.com.au/whirlpoolian/greyscale/css/core.css);" selected="selected">WP Grey</option>'+
										  '<option value="@import url(http://members.optusnet.com.au/whirlpoolian/steelyellow/css/core.css);">WP Steel Yellow</option>'+
										  '<option value="@import url(http://www.members.optusnet.com.au/kev.nat/Whirlpool%20Noir/1/WP%20BLACK.css);">WP Black</option>'+
										'</select>     '+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Choose a WP Theme to Use</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p> '+
										'<p id="whirlpoolPlusLogo">'+
										'<input type="checkbox" name="whirlpoolPlusL">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Turn on or off the Whirlpool Plus logo.</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>'+
										'<p id="whirlpoolBreadcrumbFont">'+
										'<select name="whirlpoolBreadcrumbF">'+
										  '<option value="default font">default font</option>'+								  
										  '<option value="Verdana">Verdana</option>'+
										  '<option value="Arial">Arial</option>'+
										  '<option value="Georgia">Georgia</option>'+
										  '<option value="Tahoma">Tahoma</option>'+
										  '<option value="Trebuchet MS">Trebuchet MS</option>'+
										'</select>     '+										
										'&nbsp;&nbsp;<span class="wrlSetDescription">Change the Breadcrumb Font.</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>'+
										'<p id="whirlpoolSidemenuFont">'+
										'<select name="whirlpoolSidemenuF">'+
										  '<option value="default font">default font</option>'+								  
										  '<option value="Verdana">Verdana</option>'+
										  '<option value="Arial">Arial</option>'+
										  '<option value="Georgia">Georgia</option>'+
										  '<option value="Tahoma">Tahoma</option>'+
										  '<option value="Trebuchet MS">Trebuchet MS</option>'+
										'</select>     '+											
										'&nbsp;&nbsp;<span class="wrlSetDescription">Change the Sidemenu Font.</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>'+
										'<p id="showWhirlpoolFooterLinks">'+
										'<input type="checkbox" name="showWhirlpoolFooterL">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Show Whirlpool Footer Links.</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>      '+
									  '</p>'+
										'<p id="enableWideWhirlpool">'+
										'<input type="checkbox" name="enableWideWh">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Make Whirlpool Forums Wide to fit widescreen.</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>             '+
									  '</p>'+
										'<p id="penaltyBoxBackground">'+
										'<input type="checkbox" name="penaltyBoxB">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Highlight when a user is in the penalty box.</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p> '+
									  '</p>'+
										'<p id="whimAlertNotice">'+
										'<input type="checkbox" name="wAlertNotice">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Show an alert notice at the top of the page when you have received a new WHIM</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p> '+	
									  '</p>'+
										'<p id="userpageInfoToggle">'+
										'<input type="checkbox" name="upageInfoToggle">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Hide/Toggle user info on user pages.</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p> '+											  
										'<p id="hideDRThreads">'+
										'<input type="checkbox" name="hideDRT">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Hide Deleted/Removed Threads in forum view</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>     '+
										'<p id="hideMVThreads">'+
										'<input type="checkbox" name="hideMVT">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Hide Moved Threads in forum view</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>     '+
									  '<p id="postAlign">'+
										'<select name="postAl">'+
										  '<option value="middle">middle</option>'+								  
										  '<option value="top">top</option>'+
										'</select>     '+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Aligns the text in a post to the top or middle.</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>'+									  
										'<p id="lastReadTracker">'+
										'<input type="checkbox" name="lastReadT">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Turns WLR Last Read Tracker on or off.</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>       '+
									  '<p id="numThreads2Track">'+
										'<select name="s_numThreads2Track">'+
										  '<option value="300">300</option>'+
										  '<option value="500">500</option>'+
										  '<option value="1000">1000</option>'+
										  '<option value="2000">2000</option>'+
										  '<option value="5000">5000</option>'+
										'</select>     '+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Number Of Threads To Track:</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>     '+
									  '<p id="trackerPostBackgroundColour" class="needCpicker">'+
										'<input type="text" name="trackerPostBackgroundC">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Highlighted Posts Colour:</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
										//'<canvas height="35" width="113" style="margin:5px 10px;" class="colourPicker">'+
									//	'<img src="'+colourPickerImage+'" width="113" height="35" alt=""/>'+
										//'</canvas>'+
									  '</p>     '+
									  '<p id="disableTrackerPostBackgroundColour">'+
										'<input type="checkbox" name="disableTrackerPostBackgroundC">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">disable Highlighted Posts colouring</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>     '+
									  '<p id="newPostBackgroundColour" class="needCpicker">'+
										'<input type="text" name="newPostBackgroundC">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">New Posts Thread Colour: </span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
										//'<canvas height="35" width="113" style="margin:5px 10px;" class="colourPicker">'+
										//'<img src="'+colourPickerImage+'" width="113" height="35" alt=""/>'+
										//'</canvas>'+									  '</p>     '+
									  '<p id="disableNewPostBackgroundColour">'+
										'<input type="checkbox" name="disableNewPostBackgroundC">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">disable New Posts Thread colouring</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p> '+
									  '<p id="noNewPostBackgroundColour" class="needCpicker">'+
										'<input type="text" name="noNewPostBackgroundC">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">No New Posts Thread Colour: </span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
										//'<canvas height="35" width="113" style="margin:5px 10px;" class="colourPicker">'+
										//'<img src="'+colourPickerImage+'" width="113" height="35" alt=""/>'+
										//'</canvas>'+									  '</p>       '+
									  '<p id="disableNoNewPostBackgroundColour">'+
										'<input type="checkbox" name="disableNoNewPostBackgroundC">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription"> disable No New Posts Thread colouring</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>      '+ 
									  '<p id="onlyEndSquare">'+
										'<input type="checkbox" name="onlyEndSq">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">only colour end square </span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p> '+
									  '<p id="styleFlip">'+
										'<input type="checkbox" name="styleFl">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription"> style flip   (Colours unread posts in threads rather than read posts)</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>       '+
									  '<p id="dontTrackStickyThreads">'+
										'<input type="checkbox" name="dontTrackStickyT">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription"> don\'t track sticky threads</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>       '+
									  '<p id="noColourEndSquare">'+
										'<input type="checkbox" name="noColourEndSq">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription"> don\'t colour end square</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p> '+
									  '<p id="wlrSettingsScrollTo">'+
										'<input type="checkbox" name="wlrSettingsScroll2">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription"> scroll to anchor after page load</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>   '+    
									  '<p id="lastPost">'+
										'<input type="checkbox" name="lastPos">'+
										'&nbsp;&nbsp;<span class="wrlSetDescription">Go to the last post in the thread after posting</span>'+
										'&nbsp;&nbsp;<a href="#" class="wlrInfo"><img src="'+infoIcon+'" style="border:none;"/></a>'+
									  '</p>   '+ 									  
									'<br/>'+
									'</div>'+
									'<div id="customCSSTab" style="display:none;float:left;border:3px solid #333;background-color:#EEEEEE;height:440px;width:795px;margin-bottom:5px;overflow:hidden;" class="wlrtabmenuDivs">'+
									  '<p id="customCSS" style="width:100%;height:100%;float:left;overflow-x:hidden;overflow-y:scroll;">'+
											'<textarea id="cusCSS" style="width:760px;height:408px;float:left;"></textarea>'+
									  '</p>   '+ 	
									'</div>'+
									'<div id="hiddenUsersTab" style="display:none;float:left;border:3px solid #333;background-color:#EEEEEE;height:440px;width:795px;margin-bottom:5px;overflow-x:hidden;overflow-y:scroll;" class="wlrtabmenuDivs">'+
									'</div>'+
									'<div id="cPickerTab" style="display:none;float:left;border:3px solid #333;background-color:#EEEEEE;height:440px;width:795px;margin-bottom:5px;overflow:hidden;" class="wlrtabmenuDivs">'+
										'<iframe src="http://www.colorpicker.com" width=100% height=100% style="overflow:hidden;" />'+
									'</div>'+		
									'<button id="saveWLR" style="float:right;margin-top:6px;">Save</button>'+    
								  '<button href="#" id="closeWlrSettingsModal" style="float:right;margin-top:6px;" title="close">Cancel</button>'+									
								 // '<span style="color: green; margin-left: 20px; display: none;" id="changesSaved">Changes Saved</span>'+  
								   '<br />'+
								'</div>';
		
			la.click(function(){
		
				$('body').append('<div id="wlrsettingsoverlay" style="height: 100%; width: 100%; position: fixed; left: 0pt; top: 0pt; z-index: 2999; opacity: 0.5; background-color:#000000;"/>')
						.append(settingsHTML);
				
				var custCSS = $('#cusCSS');
				var newP = $('<p id="hiddenUsersArr">');
				var newUl = $('<ul>');
				newP.append(newUl);
				$('#hiddenUsersTab').append(newP);

				$('#wlrWikiLink').mouseup(function(){
					GM_openInTab('http://whirlpool.net.au/wiki/?tag=whirlpool_plus');
				});
				
				var wmT = $('.wlrtabmenuTabs');
				var wmD = $('.wlrtabmenuDivs');
				wmT.click(function(){
				
					wmT.removeClass('active');
					$(this).addClass('active');
					wmD.hide();
					wmD.eq(wmT.index(this)).show();
					return false;
				
				});

				$('#closeWlrSettingsModal').mouseup(function(){
					$('#wlrSettingsDiv, #wlrsettingsoverlay').remove();
				});
				$('.wlrInfo').click(function(){ //info ...
					return false;
				});
				function iterOverSettings(getOrSet){
				
					$('#wlrSettingsDiv p').each(function(i){
					
						var spaThis = $(this);
						
						var inp = spaThis.children().eq(0);
						var spID = spaThis.attr('id');
						var getG = GM_getValue(spID);
	
						if(inp[0].nodeName === "INPUT"){
						
							if(inp[0].type === "checkbox"){
							
								if(getOrSet==='get'){
									if(getG ==='true'){
									
										inp.attr('checked','checked');
									
									}
								}
								else{
								
									if(inp.attr('checked')){
										docs[spID] ='true';
									}	
									else{
										docs[spID] ='false';
									}
									GM_setValue(spID, docs[spID]);	
								
								}
							
							}
							else if(inp[0].type === "text"){
							
								if(getOrSet==='get'){
									inp.val(decodeURIComponent(getG));
								}
								else{
								
									docs[spID]=encodeURIComponent(inp.val());
									GM_setValue(spID, docs[spID]);								
								}
							
							}
						
						}
						else if(inp[0].nodeName === "SELECT"){
							inp.children('option').each(function(){
								var optThis = $(this);

								if(getOrSet==='get'){	
									if(getG===optThis.attr('value')){
									
										optThis.attr('selected','selected');
									}
									else if(optThis.attr('selected')){
										optThis.removeAttr( 'selected' );
									}								
								}
								else{
									if(optThis.attr('selected')){
										docs[spID]=optThis.attr('value');
										GM_setValue(spID, docs[spID]);	
									}
								}
							});
						
						}
						else if(inp[0].nodeName === "UL"){
							
							if(docs.hiddenUsersArr.length){
								var hiddUsersArr1 = docs.hiddenUsersArr.split('#');
								hiddUsersArr1.shift();   
								if(getOrSet==='get'){
									$(hiddUsersArr1).each(function(){
											inp.append('<li>User: <a href="http://forums.whirlpool.net.au/forum-user.cfm?id='+this+'">#'+this+'</a>\'s posts are currently hidden.&nbsp;&nbsp;<input type="checkbox" '+
																	'uNumNoHide="'+this+'" name="noHide" class="noHide" value="noHide">&nbsp;&nbsp; - '+
																	'Unhide User</li>');
									
									});                                                                
								}
								else{
								
									inp.find("input:checked").each(function(){
										var toReplace = '#'+$(this).attr('uNumNoHide');
										docs.hiddenUsersArr=docs.hiddenUsersArr.replace(toReplace,'');
										GM_setValue('hiddenUsersArr', docs.hiddenUsersArr);
									
									});
								
								}                                                   
							}
						}
					
					});
					if(getOrSet==='get'){
						custCSS.val(decodeURIComponent(docs.CSStextBox));
					}
					else{
						docs.CSStextBox=encodeURIComponent(custCSS.val());
						GM_setValue('CSStextBox', docs.CSStextBox);
						$('#wlrSettingsDiv, #wlrsettingsoverlay').remove();
					}
				}
				iterOverSettings('get');
				$('#forceUpdate').mouseup(function(){
					autoUpdate.xhrCheck('force');
				});
				$('.wlrsetbutUp').mouseup(function(){
					var tBox1 = $(this).prev().prev();
					tBox1.val((Number(tBox1.val())+1).toString());
				});	
				$('.wlrsetbutDown').mouseup(function(){
					var tBox2 = $(this).prev();
					var currentVal = Number(tBox2.val());
					if(currentVal>0){
						tBox2.val((currentVal-1).toString());
					}
				});					  
				$('#resetWLR').mouseup(function(){
				
					for(var l in gmDefaults){
						
						GM_setValue(l, gmDefaults[l]);
						docs[l]=gmDefaults[l];

					
					}	
					iterOverSettings('get');

				});	
				
				$('#saveWLR').mouseup(function(){
					iterOverSettings('set');
				});					
				return false;
			
			});

		},
		firstRun:function(){
		
			var ohHaiHTML = '<div id="ohHaiDiv" style="background-color:#EEEEEE;border:1px solid black;color:#333333;display:none;'+
									'left:50%;margin-left:-300px;padding:12px;position:fixed;top:17%;width:600px;overflow:hidden;height:430px;'+
									'display:block;z-index:3000;">'+
									'<a href="#" id="closeohHaiModal" style="float:right;font-weight:bold;font-size:2em;clear:both;color:black;">X</a><br /><br/>'+
									'<img src="data:image/jpeg;base64,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" alt="default.aspx2.jpg" />'+
								'</div>';	
			$('body').append('<div id="ohHaioverlay" style="height: 100%; width: 100%; position: fixed; left: 0pt; top: 0pt; z-index: 2999; opacity: 0.5; background-color:#000000;"/>')
						.append(ohHaiHTML);								

			docs.WLRfirstRun='false';
			GM_setValue('WLRfirstRun', 'false');	
			
			$('#closeohHaiModal').click(function(){
			
				$('#ohHaiDiv, #ohHaioverlay').remove(); 
				return false;
				
			});
		}
	}
	var scriptIdUrl = '50796'; //First change by Troberto :)
	
	var autoUpdate={

		aUpRegular:function(rdt, currentVersion, getChanges){

			if(Number(currentVersion.replace('.','')) < Number(rdt.replace('.',''))){

				var upDate = confirm ('The latest version of Whirlpool Plus is version '+rdt+' - you have version '+currentVersion+' installed. '+
										'\r\n\r\n changes - '+getChanges+
										'\r\n\r\n Do you want to update now?');
				if (upDate) {
					GM_setValue('installedScriptVersion', rdt);
					window.location.href="http://userscripts.org/scripts/source/" + scriptIdUrl + ".user.js";
				}
				else {
					var tym = '~';
					if(docs.autoUpdateWPplus==="3600000"){
						tym='1 hour';
					}
					else if(docs.autoUpdateWPplus==="21600000"){
						tym='6 hours';
					}
					else if(docs.autoUpdateWPplus==="43200000"){
						tym='12 hours';
					}
					else if(docs.autoUpdateWPplus==="86400000"){
						tym='24 hours';
					}					
					alert("You will not received this notification again until "+tym+" later.");
				}	
				
			}
				
					
		},
		aUpForce:function(rdt, currentVersion, getChanges){
			
				var upDate = confirm ('The latest version of Whirlpool Plus is version '+rdt+' - you have version '+currentVersion+' installed. '+
										'\r\n\r\n changes - '+getChanges+
										'\r\n\r\n Do you want to update now?');
			if (upDate) {
				GM_setValue('installedScriptVersion', rdt);
				window.location.href="http://userscripts.org/scripts/source/" + scriptIdUrl + ".user.js";
			}
		
		},
		xhrCheck:function(regOrForce){

				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://userscripts.org/scripts/review/' + scriptIdUrl,
					headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain'},
					onload: function(responseDetails){
						var getSNum = $.trim(responseDetails.responseText.split('==UserScript==')[1].split('// @require')[0].split('@version')[1].split('//')[0]);
						var spliterrific = responseDetails.responseText.split('==Changes==')[1].split('// ==/Changes==')[0].split('changes - ');
						var getChanges = spliterrific[spliterrific.length-1];
						var currentVersion = GM_getValue('installedScriptVersion');
						if(regOrForce==='force'){
							autoUpdate.aUpForce(getSNum, currentVersion, getChanges);
						}
						else{
							autoUpdate.aUpRegular(getSNum, currentVersion, getChanges);
						}
						
					}
				})		
		},	
		regularUpdateCheck:function(){

			var lastCheck = Number(GM_getValue('lastScriptVersionCheck'));
			var currentTime = Date.now();	

			if (currentTime > (lastCheck + Number(docs.autoUpdateWPplus))) {
				GM_setValue('lastScriptVersionCheck', ''+currentTime+'');
				autoUpdate.xhrCheck('regular');
			}	
		}

	}
		
	var tracker={
		
		checkIfPrev:function(tn){

			var ofTheMac, checkForAmp;
			var cLR = GM_getValue('lastRead0');

			if(cLR){

				if(cLR.match(tn) ){

					var clrThis = cLR.split(',');
					clrThis.pop();

					for(var u=0;u<clrThis.length;u++){

						checkForAmp = clrThis[u].split('t=')[1].split('&')[0].split('#')[0];

						if( checkForAmp == tn ){

							ofTheMac = clrThis[u];
							break;

						}	

					}

				}
				else{
				
					ofTheMac = 'newThread';
				
				}
						
			}
			else{
			
				ofTheMac = 'newCookie';
			
			}

			return ofTheMac;

		},
		threadsAndUserPage:function(durM){

			var stupidimages, stupidAtags, lazyFuckers = 'newread', lazyFuckers2 = "nonewread";
			//var durM = docs.dUrl.match('user');
			var userLink = $('#left .userinfo dt a span').text();
			
			if(	docs.disableNewPostBackgroundColour == 'true'){
				lazyFuckers = 'lazyFuckers';
			}
			if(docs.disableNoNewPostBackgroundColour == 'true'){
				lazyFuckers2 = 'lazyFuckers';
			}			
			if(durM==='user'){
				stupidimages = $("#threads a[href$='#bottom']");
			}
			else{
				stupidimages = $("a[title='Jump to last post']"); 
			}
			var ttttntd = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAABkCAYAAAC7OXGqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACOSURBVHja7JbBDoAwCEP3pv//y/PiRYMTkDmXSbJbU0oTOiilpFrldFNDANjfZa0CgDMgWxlSKAMqBncL1AyTA0SjkBiWUA1xLejI4JvCLBILA6YWaEU20BBjFBoG1ZiE+cBjwGE3f8AMANXivLVZcSEWmzB0CpDGGtxJ65/C919Ubzk+4MNQV5AdsAkwACrrBZgQssxvAAAAAElFTkSuQmCC';
			
			GM_addStyle("#threads table tbody tr.newread td{background:"+decodeURIComponent(docs.newPostBackgroundColour)+" url("+ttttntd+") !important}"+
						"#threads table tbody tr.nonewread td{background:"+decodeURIComponent(docs.noNewPostBackgroundColour)+" url("+ttttntd+") !important}"+
						".stopTrack{"+
							"border-bottom-color:grey;"+
							"border-bottom-style:dashed;"+
							"border-bottom-width:1px;"+
							"float:left;"+
							"margin-top:-5px;"+
							"margin-left:-14px;"+
							"opacity:0.3;"+			
						"}			"+	
						".markRead{"+
							"float:right;"+
							"opacity:0.3;"+
							"border-bottom-color:grey;"+
							"border-bottom-style:dashed;"+
							"border-bottom-width:1px;"+	
							"margin-top:-5px;"+					
						"}"+
						".wlrx{"+
						"	position:absolute;"+
						"	font-size:9px !important;"+
						"	width:95px;		"+		
						"}");

			for(var z=0;z<stupidimages.length;z++){
			
				var jThis = $(stupidimages[z]);
				var checkClass = jThis.parent().parent()[0].className.match('sticky');
				
				if(docs.dontTrackStickyThreads == 'true' && checkClass){

					continue;
				
				}
				else{

					var jumpThreadNum = stupidimages[z].href.split('t=')[1].split('&')[0].split('#')[0];
					var tCheck = tracker.checkIfPrev(jumpThreadNum);
					var lastPoster, postedInColour;
					var postedin = false, jThisParent = jThis.parent();
				
					if(tCheck != 'newCookie' && tCheck != 'newThread'){
					
						var cookArrThreadNum = tCheck.split('t=')[1].split('&')[0].split('#')[0];
						
						if(durM==='user'){
						
							stupidAtags = Number(jThis.parent().prev().prev().text());
							lastPoster = jThis.parent().prev().find('b').text();
							
							if(jThisParent[0].style.backgroundColor == "rgb(226, 208, 187)"){
							
								postedin = true;
								postedInColour = "background-image: url(http://forums.whirlpool.net.au/img/forum/grad-morange.gif) !important; background-color: #E2C6A8 !important;";
							
							}					

						}
						else{
						
							stupidAtags = Number(jThis.parent().prev().prev().prev().prev().text()); 
							lastPoster = jThis.parent().prev().find('a').text();
							
							if(jThisParent[0].style.backgroundColor == "rgb(192, 180, 167)"){
							
								postedin = true;
								postedInColour = "background-color: #C2B7AA !important;";
							
							}					
						
						}

						if( jumpThreadNum == cookArrThreadNum ){
						
							var tholdpare = jThisParent.parent();
							var tCSp = tCheck.split('#r');
							var tCheckSpl = tCSp[1];

							if( (tCheckSpl < (stupidAtags+1)) && (stupidAtags !==0) && (lastPoster != userLink)){ //stupidAtags+1 cause the OP is not counted as a reply
							
								if( docs.onlyEndSquare == 'true' && docs.disableNewPostBackgroundColour == 'false' ){
								
									lazyFuckers = 'lazyFuckers';
									jThisParent.attr("style", "background:"+decodeURIComponent(docs.newPostBackgroundColour)+" url("+ttttntd+") !important");
									
								}
								
								var newpostsTitle = stupidAtags - tCheckSpl+' new posts';
								jThis.attr('href', '/forum-replies.cfm?'+tCSp[0]+'#r'+(Number(tCheckSpl)+1)).attr('title', 'Jump to last read post');
								//jThis.attr('href', '/forum-replies.cfm?'+tCheck).attr('title', 'Jump to last read post');
								var sPrep = $('<span>');
								var attC = jumpThreadNum+','+tCheck+','+stupidAtags;
								sPrep.attr('attcheat',attC);
								sPrep.attr('class','small wlrx');
								sPrep.html('<a href="#" title="Stop Tracking Thread" class="stopTrack">S</a>');
								sPrep.append('<a href="#" title="Mark All Posts As Read" class="markRead">M</a>');	
																	
								tholdpare.attr("class", lazyFuckers).children('td.reps:first').attr('title', newpostsTitle).prepend(sPrep);
							
							}
							else{
								if(!tholdpare.hasClass("pointer") ){
								
									if( docs.onlyEndSquare == 'true' && docs.disableNoNewPostBackgroundColour == 'false' ){
									
										lazyFuckers2 = 'lazyFuckers2';
										jThisParent.attr("style", "background:"+decodeURIComponent(docs.noNewPostBackgroundColour)+" url("+ttttntd+") !important");
										
									}					
								
									tholdpare.attr("class", lazyFuckers2).children('td.reps:first').prepend('<span attcheat="'+jumpThreadNum+','+stupidAtags+'" class="small wlrx">'+
									'<a href="#" title="Stop Tracking Thread" class="stopTrack">S</a>'+	
										'</span>');
								
								}
								
							}
							if(docs.onlyEndSquare == 'false' && docs.noColourEndSquare == 'true' && postedin){
							
								jThisParent.attr('style', postedInColour+' !important;');
								
							}					
						
						}
					
					}
				
				}

			}
			
			/***stop tracking thread***/
			
			var awhof = $('.stopTrack, .markRead');
			
			for(var d=0;d<awhof.length;d++){	
			
				awhof[d].addEventListener('click', function(e){
				
					e.preventDefault();
			
					var mehThis = $(this);
					var mehThisParent = mehThis.parent();
					var aSP = mehThisParent.attr('attcheat').split(',');
					var stRem = GM_getValue("lastRead0");
					var wholeThreadNum = stRem.slice( stRem.indexOf(aSP[0]), stRem.indexOf( ',', stRem.indexOf(aSP[0])) );
					var getLastTD = mehThisParent.parent().parent().children('td:last');
					var wholeReplace, setReadAll;		
					var mehParent = mehThisParent.parent();
					var pppA = mehParent.parent().find('a:last');
					pppA.attr('href','/forum-replies.cfm?t='+aSP[0]+'&p=-1#bottom').attr('title','Jump to last post');

					if(mehThis.hasClass("stopTrack")){
					
						wholeReplace = stRem.replace("t="+wholeThreadNum+",","");
						GM_setValue("lastRead0", wholeReplace);	
						getLastTD.removeAttr("style");
						mehThisParent.parent().parent().removeClass("newread nonewread");
						var grabMark = mehThis.next();
						if(grabMark[0]){
							grabMark.remove();
						}
					
					}
					else{
					
						var pageNo = '&p=1';
						var getLastPage = mehParent.prev().prev().children('span.small').children('a:last');
						//unsafeWindow.console.log('getLastPage[0]   '+getLastPage[0]);
						if(getLastPage[0]){
						//unsafeWindow.console.log('if(getLastPage[0])   ');
							pageNo = '&p='+getLastPage[0].href.split('&p=')[1]; 
						}
						//unsafeWindow.console.log('pageNo   '+pageNo);
						setReadAll = wholeThreadNum.split('&')[0].split('#r')[0]+pageNo+'#r'+((Number(aSP[2])+1).toString());	//+1 cause the OP is not counted as a reply (loose type FTL!)
						//unsafeWindow.console.log('setReadAll   '+setReadAll);
						wholeReplace = stRem.replace(wholeThreadNum, setReadAll);
						//unsafeWindow.console.log('wholeReplace   '+wholeReplace);
						GM_setValue("lastRead0", wholeReplace);	
						getLastTD.attr("style", "background:"+decodeURIComponent(docs.noNewPostBackgroundColour)+" url("+ttttntd+") !important");
						mehThisParent.parent().parent().removeClass("newread").attr("class", lazyFuckers2);

					}

					mehThis.remove();

					return false;

				}, false);
			
			}
			
			
		},
		forumReplies:function(){

			var lastReadLink;
			var yOff = (docs.win.pageYOffset+docs.win.innerHeight);
			var threadNumber = docs.threadNumber;
			var nam = document.evaluate( '//td[@class = "bodyuser"]/a[contains(@name, "r")][1][last()]' ,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

			var anchorSP= 0;
			//var nextpage = document.evaluate( '//ul[@class= "pagination"]//li[@class="current"]/following-sibling::li[not(@class="last")]/a' ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;			
			if(docs.dUrl.indexOf('#r')>-1 && docs.dUrl.indexOf('r=')<0){
				anchorSP=docs.dUrl.split('#r')[1].split('&')[0];
			}
			/*if(Number(anchorSP)>Number(nam.snapshotItem(nam.snapshotLength-1).name.split('r')[1]) && nextpage){  //because of mark as read on user page - can't tell if a new page has been made
				window.location = nextpage.href+'#r'+anchorSP;
			}*/

			var pagLiLast =  $('#top_pagination li.last').prev().prev().attr('class');
					
			if(Number(anchorSP)>Number(nam.snapshotItem(nam.snapshotLength-1).name.split('r')[1]) && pagLiLast == 'current'){  //because of mark as read on user page - can't tell if a new page has been made
				window.location = nextpage.href+'#r'+anchorSP;
			}

			function hazRead(rN, eType){

				if(Number(docs.repliesA[docs.repliesA.length-1].href.split('#r')[1]) <= Number(rN) && (eType != 'new') && (docs.disableTrackerPostBackgroundColour == 'false')&&(docs.styleFlip == 'false')){ //if the last link on the page is lower than what already read up to

					GM_addStyle(".bodypost{background:"+decodeURIComponent(docs.trackerPostBackgroundColour)+" !important}");
					return 'noNew';
				
				}
				else{
		
					docs.repliesA.each(function(i){	
					
						var t = $(this);
						var h = t.attr('href');
						var curtop = t.offset().top;
						
						if(i === 0){ 

							/*if( (docs.disableTrackerPostBackgroundColour =='false') && (docs.styleFlip == 'false') ){//always colour and grab the first link just in case first thread post is bigger than viewable area
							
								$(this).parent().parent().css('background', docs.trackerPostBackgroundColour+' !important');
								
							}*/
							lastReadLink = h;

						}
						if( (docs.styleFlip == 'false') && ((Number(h.slice(h.lastIndexOf('#r')+2))) < Number(rN)) && (eType == 'load') && (docs.disableTrackerPostBackgroundColour == 'false')){

							$(this).parent().parent().css('background', decodeURIComponent(docs.trackerPostBackgroundColour));

						}		
						else if( (docs.styleFlip == 'true') && ((Number(h.slice(h.lastIndexOf('#r')+2))) > Number(rN)) && (eType == 'load') && (docs.disableTrackerPostBackgroundColour == 'false')){

							$(this).parent().parent().css('background', decodeURIComponent(docs.trackerPostBackgroundColour));
						
						}				
						if( curtop < yOff ){

							lastReadLink = h;
							
							if(docs.repliesA.index(t[0])==(docs.repliesA.length-1)){  //check if the last post is a deleted one
							
								var containerTR = t.parent().parent().parent();
								var rSplitArr = h.split('#r');
								var currentAnchor = Number(rSplitArr[1]);
								while(containerTR.next()[0] && !containerTR.next().attr('id') && !$('#top_pagination a[href*="&p="]')[0]){
									currentAnchor++;
									containerTR=containerTR.next();
								}

								lastReadLink = rSplitArr[0]+'#r'+(currentAnchor.toString());
						
							}
							
						}

					});

					return 't='+lastReadLink.split('t=')[1];
				
				}

			}
			
			docs.win.addEventListener('scroll', function() {

				if((docs.win.pageYOffset+docs.win.innerHeight) > yOff){

					yOff = (docs.win.pageYOffset+docs.win.innerHeight);

				}

			}, false);	
			
			docs.win.addEventListener('load', function(){

				var loadCheck = tracker.checkIfPrev(threadNumber);

				if(loadCheck != 'newThread' && loadCheck != 'newCookie'){

					hazRead(loadCheck.slice(loadCheck.lastIndexOf('#r')+2), 'load');
				
				}

			}, false);	
			
			
			docs.win.addEventListener('beforeunload', function(){

					var cP = tracker.checkIfPrev(threadNumber);
					var returnedLink;
					
					if( cP == 'newThread') {
					
						returnedLink = hazRead(0, 'beforeunload');
						var getLR2splitCheck = GM_getValue("lastRead0").split(',');
					
						if(getLR2splitCheck.length < Number(docs.numThreads2Track)) {
						
							GM_setValue("lastRead0", GM_getValue('lastRead0')+returnedLink+",");
						
						}
						else{
						
							var sliceFirstTrack = GM_getValue("lastRead0");
							var sliceFirstTrack2 = sliceFirstTrack.substr(sliceFirstTrack.indexOf(',')+1)+returnedLink+",";
							GM_setValue("lastRead0", sliceFirstTrack2);				
						
						}

					}			
					else if(cP == 'newCookie'){
					
							returnedLink = hazRead(0, 'beforeunload');
							GM_setValue("lastRead0", returnedLink+",");
					
					}
					else{
					
						var checkSplit = cP.slice(cP.lastIndexOf('#r')+2);
						returnedLink = hazRead(checkSplit, 'beforeunload');

						if( (returnedLink !='noNew')&& ( Number(returnedLink.slice(returnedLink.lastIndexOf('#r')+2)) > Number(checkSplit) ) ){

							var repREturned = GM_getValue("lastRead0").replace(cP,returnedLink);
							GM_setValue("lastRead0", repREturned);

						}

					}
					
			}, false);

			if(docs.dUrl.indexOf('#')>-1 && docs.wlrSettingsScrollTo == 'true' && !docs.dUrl.match('bottom')){
				
				docs.win.setTimeout(function(){

					var an = '#'+docs.dUrl.split('#')[1];
					var a = $('a[href$='+an+']');
					var avatarCheck = a.parent().parent().prev().prev().find('a:first').height();

					if(avatarCheck>30){

						$.scrollTo(a, 500, {offset:-150});
						
					}
					else{
					
						$.scrollTo(a, 500);
					
					}

				}, 1000);

			}
			
		}
				
			
	}

	function quickQuote(){
	
		var gottaPee, backImg, pReply = $('.foot_reply a');

		whirlC.generalStyle();

		if(pReply[0]){
			$.get(pReply[0].href, function(data){

				gottaPee = data.split('name="tinkle" value="')[1].split('">')[0];
			
			});
			if(document.title.match(' - Focused - The Pool Room - Whirlpool Broadband Forums')){

				backImg = 'data:image/png;base64,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';
				GM_addStyle('#qqTextArea{background-image:url('+backImg+');}');				
			
			}
		}
		else{
			backImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAp4AAACMCAMAAADiKVkYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADBQTFRFrKyr2dnY09LSubi48vLy+fn5pqWl5ublv7++xsXF7OzszMzL39/fs7KxoJ+e////RAPhAgAAABB0Uk5T////////////////////AOAjXRkAAArKSURBVHja7J3XlqQwDESNwZjM///tzuzONMlBMjLhbNVrAw3FxUhyQM0Q9FgpWAABTwgCnhDwhCDgCUHAEwKeEAQ8IeAJQcATgoAnBDwhCHhCwBOCgCcEAU8IeEIQ8ISAJwQBTwgCnhDwhCDgCQFPCAKeEAQ8IeAJQcATAp4QBDwhCHhCwBOCgCcEPCEIeEIQ8ISAJwRdiqfRupx+VGqtJU9n0P3PkUetB8IO3WeHqaHtEdLX1SzH+xy1evQdtPqf1iddnrfCq3aqr7NQsdlU00F7L343KZhGt/sDlxH2dX3YY/+fjtPdS0U3bllXYieeyK4Vvxe58cB32FEb9y3nOHIE4OvnEPoyFqbhWbW+C9Kn8bSj88C98cPp3KEe5PH8vkDzNjy/261OHM/vv2sS8ORZmIRnH7ii4RyepplI5K8eldKzfW1y4Pn1oLwPz69GSxrPv3ubJDwZFibg2Y2BP67PtZ5d6KpKV+RSefdo5jx4Tsq+D89JdaJ42lCLIWchH8+w6ede7pEbWlsGndOQC8/gbXkqnlPdSeL5L7obU/GkWsjGswj/a3UGz/j9PPA50tpxYTxd78qn4zkpI4en+dmgS8aTZiEXz2GbUNtPjak5GsbFs9ukm8PvkTdZeefNilr9U1/pnZefhGfzqYQMuypJ8z489+d8Bk8dDSJlLGTiuSao34WCQ7O3lIfn6j1dbii0q3Sp3vxpteBcbYqg9aGhZZ2Le+NNwYv18B9PmP3nZDzViodd9c9KlP02+6qLLKThWS0t2eho17vyTN2z8USN31e12Dw6Swjl4Q6WszieX9ffpAZP1+FZ+kvCpRSe1h9t5bGQhmfJa5lZBmhvDP/9ji+d11R7wqqz5+LfePDGGQ/Fc1MG7ITwbOMtoKyFikUQsV3mGGDq8DmXjnJm521us+E5dzWhKPgoPFfZrJbB0/iKy9kspGy4vNrLWRzPNtLiG3V8NLQ7Sc+K5yr81i/Bc/G2kcFznYUVl1ioOAQpI45nFSW/OxavWkakIYbnKgoxL8GzEuo0ceX85SUWKoa10zCL49k6C6fuGErvkyl9KZ5LDqdfgudSHTYSeFp/pTuXhYpBUDOL4/mJPFvCNvU+Hr0Yz2piBBWPwLN3sZSMZ0vp/pG1MI6nmeINXDISRbRQsbZluBfP44k8HU/tsjcVz18QmmB6I2thHE/Nr6bSDShdVU1v9NnfGnuuTqR5CZ6FJJ76t+sk2KLIWhjHc+TX+8gGGFooonZvhFsy97UX9dtaz04AT/W7Wx1qrmQtVGRjx1kez4GGfr/bjBQS5MCzTy3N3x17CqRG9pNz96HsW9bCKJ46IV0lG9DTHqVhV2zrGHVYUTyH1Nz9JjwbwcJS+3kp29ABZC2M4tkkNBhkA0ZaIGL2waeiX6MoniY1+LwJz1quLG9WKU0daBxkLVTUO8YJt6gGGOog/3p3CzS9+0EUz88G4yvwHAQ7NfUKgz5QypG1UFEJajLg2U3EDctdX221Gj1orsSzTMyN7sHTWZVPxFOtGhIbaBtkLYzhaVOiLaoB5BSn3d/dljw9QBbP1nnDH4qnpySYNo92c6dqfwMoa6GiEjRkwFNTC/6HDc26+7fWhHMJDFNnnLhmd1Hw8YyLOaBuO5Sb58gOKrVFrJszW6ioYHQZ8OwJN81zFt12fpG+Gk/7dDxXA+b1fBpPsz3U4M8ZZC2M4dmmNBdUPFsqno4owBLn+MviWTwXT/Vx4DMDzJ01pOCpd81D7Y0fZS1UUgSl4NlQR6e6LqmrSeuJ/Dd4UidqJuGpdsFm6w35rsWzzIlnycZzfcTjwiIuQP93PFU1n8fzkKoP3nrOPXiq5+H5ZdLB6QJ47jY1swCe7SHZrn3pN/B0JwCeMuh/k7mT1+Tg42mObaV3RPi1mfsleNZkPI9PXDGGX2aydc8r8BRbhqHW5szdOf7Fao/B1/dzLZ5NSjfJFZn7yqkyxGemsvz8fDwbiY6K9R7rIUqfKQxdVgtvzdzJHQiR6qvdADpmxDPpaZ0vWiVkvxjvIISndXU+NZ7Sp6yFMTz7lF488V6jPrbhZu3aPh+e4wuGhNjIxFo2ns4q0uChTNbCW3uN0vvcA8c6M/EruvErBtS14YFgXDyNE8TP233IaeGtfe7koamUGQDV6FzLRBTPjjoC8FY8IwuvcPH0rErXhNe/k7EwhmeXc8RSlTre0/2Uj65ZqqJ46tSpmteOWCqCE3C4eCo364U77JO18Nbxnh/sRuLNDU8WXYYxDZnwTJk6cAOeS1+fPo+n9ZQWPdMYZS2M1jNTJieyJ3NEEi9qEFA4WmNRPOuXzNSsPGPpUvBsfd43SZUSnoX0uUY2A549raUnz+5Tx1sliad9zTx3HThTHp7GWzQpnL/IWkifqdlnwHOgHZw836k/voiyrBJSPB1PZ5yThGd8bXDWTCamhYr89NQZ8PzkmIqUnjVk3LPguSznY56O5+KEMufw5K5EL2shY5WQQh5PWujQk6sHVVY8dfK7/Ya5Ro33xcRyhPQZB5vNQsYaSyoDngXhdJcyniFTUGXAk7+Q5J14Vt7iJ8uRloJnm81Czgp1Wh7PBb0q/nw0dApMBjwb/nN6I56LbeMJPA1pgN96rIishZz1PetKHM/lxe1lb2kG4rWDnLGnnpITo3smEo+RqXCUy9AkPNeHkrWQtTqyv3puUg2ophh8nCeuP56oFJ52OtF43oJnF5lIXDAMacP3psxlIWtteW/9p1PJ61DEFq5nPXHq2BQL4bmaeGdfgqfvzcRwxEauWXNi/RQLeV/m8ISflUpfZMqEP/thJ8ZqdDpbp+YwTQn135vx9BQ/E1b+r2Ohqc5kIfO7Rs4j/30sdGpuGPxokvdTTa0N1EfJoTqRENNOhADncXgudRGVtr5nfIm28fC2lrWQ+1U4x8fV9QEfXuF39E8rbH2Tur5ud7MvmNjate15PI0Ozst9MJ7LfeuTHIkv6HHcQtZC4jc1lXc2eaFOpiPr2KHe7LGenNA4wqpSOyOt1LZiHbt+3oaD3kwUqbv5TXhWrncP3ZF4Z/JxLJmshdQvEm+msfx+MLvbfAq5P1wWsZ920zOhi59Dt4GlLj4Ba/nzfe3NiTi/IEnqlIttnNh23oans/hJdsQSYsVxH0/JWkhN8S2HOCaem4kYpGsq6HO7JfEszfwyPF3rSJMdaQkDxfS+riJrIbkCdVjSaK9hTsYzxudo/LFwbOUBQTyLeX4dnvY4AYvqiKFUKQ/L/MtaSK8xV2OQoGo+gecqraFM2O4YBojh2Zv5hXguTWDJdYQ2lHI/olzWQk4XiBZ8oe4LqJW3QVTH0QN+mJWds+BZ6zNw3onnUlcumI4o0iDw/XAyWQtZPXRVS2MtAU/Xel7/LorzpOhA8JWOZ63tfFL34bkETrVhOWJpPZDdLvmStZDZgWwOa25NTZGChIu64bAiYusfd6UPzW2pg7lBEp6t1sUsoBvxXAL1luVISxyothu4J2thwviGZe3dUZ9vV3Y34FNPIhx7WJZt6WUogh4mBQsg4AlBwBMCnhAEPCEIeELAE4KAJwQ8IQh4QhDwhIAnBAFPCHhCEPCEIOAJAU8IAp4Q8IQg4AlBwBMCnhAEPCHgCUHAE4KAJwQ8IQh4QsATgoAnBAFPCHhCEPCEgCcEAU8IAp4Q8IQg4AkBTwgCnhD0oz8CDABvHOtmjyAxDgAAAABJRU5ErkJggg==';
			GM_addStyle('#opInputs, #qqpost{display:none !important;} #qqTextArea{background-image:url('+backImg+');}');
		}
		
		var currTime = time();
		docs.lmtr = docs.repliesTR.eq(docs.repliesTR.length-1);

		function postPost(textArtex, textOptions){

			$.ajax({
				type: "POST",
				url: pReply[0].href,
				data: "version=2&post2=post&form=too+right&tinkle="+gottaPee+"&"+ 		
				"poll_enabled=false&poll_choice_size=0&pasteheader=true&timestart=%7Bts+%27"+currTime+"%27%7D&"+
				"body="+encodeURIComponent(textArtex)+"&"+textOptions+
				"cliptemp=Paste+external+quotes+here",
				success: function(msg){
			

					if( (msg.indexOf('<th><a name="preview"></a>ERROR</th>') > -1) && (msg.indexOf('You are quoting significantly more words than you have written.') > -1)){

						$('#qqTooManyWords').css('display','block');
						
						$('#wordsOK').mouseup(function(){

							$('#qqTooManyWords').css('display','none');						
						
						});
						docs.q.css('background','#E5E5E5 none no-repeat scroll 50% 50%');

					}
					else{
					
						if($('#lastPost').attr('checked') && docs.dUrl.indexOf("&p=-1#bottom")<0){
						
							docs.d.location = "http://forums.whirlpool.net.au/forum-replies.cfm?t="+docs.dUrl.split('t=')[1].split('&')[0]+"&p=-1#bottom";
						
						}
						else{
					
							docs.q.css('background','#E5E5E5 none no-repeat scroll 50% 50%').val('');
							var removeS = msg.slice(msg.lastIndexOf('<tr id="'));
							$('#previewTR').remove();	
							var newTR = $(removeS.split('</tr>')[0]+'</tr>');
							$('#replies tr[id^="r"]:last').after(newTR);
							if(docs.editInPlace=== 'true'){
								newTR.children('.bodypost:first').children('div').eq(1).after('<div style="margin: 5px;"><a class="eip" href="#">(edit in place)</a></div>');
							}
						}
						GM_setValue('textareraSave', '');
					}

				},
				error: function(XMLHttpRequest, textStatus, errorThrown){

					alert('something broke!  ==>'+XMLHttpRequest+textStatus+errorThrown);		
					docs.q.val(GM_getValue('textareraSave'));	
					
				}


			});	

		}
		
		var wcButtons = whirlC.buttons("qqbuttonsDiv", "auto;", "qqwcodeButtons");
					
		$('#replies').append('<div id="qQuote" align="center">'+wcButtons+'<div id="qqPreview"></div><div id="qqTooManyWords">'+
						'<p style="margin:0 auto;margin-top:10px;">ZOMG! You are quoting significantly more words than you have written.<br /><br />'+
						'<img src="http://i27.tinypic.com/142zdi8.jpg" /></p><button type="button" id="wordsOK">OK</button>'+
						'</div><textarea id="qqTextArea" cols="'+docs.quickReplyboxCols+'" rows="'+docs.quickReplyboxRows+'"></textarea><br />'+
						'<button type="button" style="" id="qqpostclear" name="qqpost">Clear</button><button type="button" style="" id="qqpost" name="qqpost">Post Reply</button>'+
						'<img src="http://i28.tinypic.com/jzbn0n.gif" id="aloader" />'+
						'<div id="opInputs" style="height:30px;width:650px;">'+
						'<p><input type="checkbox" checked="checked" style="cursor: pointer;" value="true" wc2="w" id="modewc" name="modewc"/>'+
						'<label style="cursor: pointer;font-size:10px;" for="modewc"> Use WhirlCode</label></p>'+
						'<p><input type="checkbox" checked="checked" style="cursor: pointer;" value="true" wc2="b" id="modeht" name="modeht"/>'+
						'<label style="cursor: pointer;font-size:10px;" for="modeht"> Allow HTML</label></p>'+
						'<p><input type="checkbox" checked="checked" style="cursor: pointer;" value="true" id="modest" wc2="e" name="modest"/>'+
						'<label style="cursor: pointer;font-size:10px;" for="modest"> Auto entities </label></p>'+
						'<p><input checked="checked" type="checkbox" style="cursor: pointer;" value="true" id="modewl" wc2="a" name="modewl"/>'+
						'<label style="cursor: pointer;font-size:10px;" for="modewl"> Make links clickable</label></p>'+
						'<p>'+
						'	<input type="checkbox" name="modesu" id="autoSubscribe" wc2="t" value="true" style="cursor: pointer;"/>'+
						'	<label for="modesu" style="cursor: pointer; font-size: 10px;"> Watch</label>'+
						'</p>		'+					
						'<p><input type="checkbox" style="cursor: pointer;" id="autoPreview" name="autoPreview"/>'+
						'<label style="cursor: pointer;font-size:10px;">Auto Preview</label></p>'+		
						'<p><input type="checkbox" style="cursor: pointer;" id="lastPost" name="lastPost"/>'+
						'<label style="cursor: pointer;font-size:10px;">Go To Last Post</label></p>'+									
						'</div></div>');
							
		docs.q = $('#qqTextArea');
		whirlC.buttonEvents("qqwcodeButtons", docs.q, whirlC.code());
		var oInpArr = $('#opInputs input');				
		
		function getOptions(t){

			var textOptions = "&";
			var settingStr = "pfl";
			var ret;
		
			oInpArr.each(function(i){
			
				var opThis = $(this);

				if(opThis.attr('checked')){

					settingStr += ''+opThis.attr('wc2');

					if(opThis.attr('name').match('mode')){
					
						textOptions+= ''+opThis.attr('name')+'=true&';
						
					}

				}
			
			});

			(t == 'preview')? ret = settingStr: ret = textOptions;

			return ret;
		
		}
	
		docs.q.bind("focus keyup", function() {
		
			if(docs.autoPreview==='true'){

				wcPrev.showPreview();
		
			}
			GM_setValue('textareraSave', $(this).val());
		});
		
		$('#qqpostclear').mouseup(function(){
		
			docs.q.val('');

			GM_setValue('textareraSave', '');

			if(docs.autoPreview==='true'){
			
				wcPrev.showPreview();
		
			}
		

		});

		docs.eh=getOptions('preview');
		if(docs.autoPreview==='true'){
		
			$('#autoPreview').attr('checked', 'checked');
		
		}
		if(docs.lastPost==='true'){
		
			$('#lastPost').attr('checked', 'checked');
		
		}	
		if(docs.autoSubscribe==='true'){
		
			$('#autoSubscribe').attr('checked', 'checked');
		
		}				
		oInpArr.click(function(){
		
			var oIthis = $(this);
			docs.eh=getOptions('preview');
			var w, oIid=oIthis.attr("id");
			
			if(oIid==='autoPreview'){
			
				if(oIthis.attr('checked')){

					GM_setValue('autoPreview','true');
					docs.autoPreview='true';
					wcPrev.showPreview();
				
				}
				else{

					GM_setValue('autoPreview','false');
					docs.autoPreview='false';
					$('#previewTR').remove();			
					docs.pTd3=null;
					
				}
			
			}
			else if(oIid==='lastPost'||oIid==='autoSubscribe'){
			
				($(this).attr('checked'))? w='true':w='false';

				GM_setValue(oIid, w);		
				docs[oIid]=w;
			
			}
			
		});
		
		docs.repliesA.each(function(i){
		
			var tParent = this.parentNode;
			
			var spanBar = document.createElement('span');
			spanBar.className='bar';
			spanBar.textContent=' | ';
			
			var noJQqqLink = document.createElement('a');
			noJQqqLink.setAttribute('class','qqlink greylink');
			noJQqqLink.textContent='q-quote';
			noJQqqLink.href='#';
			
			tParent.insertBefore( spanBar, this );
			tParent.insertBefore( noJQqqLink, spanBar );
		
			$(noJQqqLink).bind("click", function(){
		
				docs.q=$('#qqTextArea'); /***gotta fix this***/
		
				if(docs.autoPreview==='true'){

					wcPrev.showPreview();

				}
				
				var qqtrParent = docs.repliesTR.eq(i);
				var qqpre = qqtrParent.attr('id').split('r')[1];
				var qquNam;
				
				qqtrParent.find('span').each(function(){

					if($(this).attr('class') == 'bu_name'){

						qquNam = $(this).text();

					}

				});
				var qqtSel = window.getSelection().toString().replace(/^(.+)$/mg, '["$1"]');

				if(docs.q.val().length > 0){

					docs.q.val(docs.q.val()+'\r@'+qqpre+' '+qquNam+' writes... \n'+qqtSel+'\n\n');
				
				}
				else{
				
					docs.q.val(docs.q.val()+'@'+qqpre+' '+qquNam+' writes... \n'+qqtSel+'\n\n');
				
				}
			
				docs.q[0].focus();

				GM_setValue('textareraSave', docs.q.val());
			
				return false;

			});

		});

		function pfft(){
		
			GM_setValue('textareraSave', docs.q.val());
			
			if(docs.checkIfSignedIn){
			
				alert('You Are Not Currently Signed Into Whirlpool');
			
			}
			else{
			
				docs.q.css('background','#E5E5E5 url(http://i28.tinypic.com/jzbn0n.gif) no-repeat scroll 50% 50%');
				
				postPost(docs.q.val(), getOptions('post'));		
				
			}
		
		}
		
		$('#qqpost').mouseup(function(){
		
			if(!gottaPee){
			
				$.get(pReply[0].href, function(data){

					gottaPee = data.split('name="tinkle" value="')[1].split('">')[0];

				});
			
			}
		
			pfft();
			
		});
		$(docs.d).keydown(function(event) {
		
			if(event.ctrlKey==1 && event.keyCode==13 ){
			
				if(!gottaPee){
				
					$.get(pReply[0].href, function(data){

						gottaPee = data.split('name="tinkle" value="')[1].split('">')[0];

					});
				
				}
		
				pfft();
				
			}
				
		});	

		if(docs.q.val()===''){
		
			docs.q.val(GM_getValue('textareraSave'));
			
		}	
		

	}
	var wcWikiWhimNewThread={

		wwcButtons: whirlC.buttons("qqbuttonsDiv", "auto;", "qqwcodeButtons"),
	
		sendShitToPreview:function(){
		
			docs.q=$('#body');
			docs.q.parent().before(wcWikiWhimNewThread.wwcButtons);
			$('#wc_whirlurl, #wc_whirllink, #wc_siSearch').attr('disabled','disabled');
			whirlC.buttonEvents("qqwcodeButtons", docs.q, whirlC.code());
			docs.eh='pflwae';
			docs.q.bind("focus keyup", function() {

				wcPrev.showPreview();

			});				
			if(docs.dUrl.indexOf('rt=')>-1){
			
				var whimQuoteLink = document.createElement('a');
				whimQuoteLink.innerHTML='Quote Whim';
				whimQuoteLink.setAttribute('style','float:right;');
				whimQuoteLink.href="#";

				$('td[bgcolor="#c3c9de"]').prepend(whimQuoteLink);
				$(whimQuoteLink).click(function(){
				
					var qqtSel = window.getSelection().toString().replace(/^(.+)$/mg, '["$1"]');
					docs.q.val(docs.q.val()+qqtSel);
					wcPrev.showPreview();
					return false;
					
				});				
			
			}
		},
		whimReply:function(){

			docs.pTd3 = $('blockquote~div');
			docs.pTd3.attr('style', 'background:#EEEEEE url(/img/forum/reply-eeeeee.gif) repeat-x scroll center bottom;'+
			'border-bottom:1px solid #BBBBBB;'+
			'border-top:2px solid #F2F2F2;'+
			'padding:8px 12px 10px;'+
			'vertical-align:middle;');
			wcWikiWhimNewThread.sendShitToPreview();

		},
		uPageWhim:function(){

			var containerTable = document.evaluate('/html/body/div/div[3]/div/div[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			var prevContainer = document.createElement('div');
			prevContainer.id='prevContainer';
			prevContainer.setAttribute('style', 'background:#EEEEEE url(/img/forum/reply-eeeeee.gif) repeat-x scroll center bottom;'+
			'border-bottom:1px solid #BBBBBB;'+
			'border-top:2px solid #F2F2F2;'+
			'padding:8px 0px;'+
			'float: left; width: 100%;'+
			'vertical-align:middle;');	
			containerTable.appendChild(prevContainer);
			docs.pTd3 = $(prevContainer);
			
			wcWikiWhimNewThread.sendShitToPreview();
		},
		wikiNewThread:function(b){
			docs.q=$(b);
			docs.q.before(wcWikiWhimNewThread.wwcButtons);
			whirlC.buttonEvents("qqwcodeButtons", docs.q, whirlC.code());	
		}		

	}
	var wlrMenu={
	
		generateMenu:function(){

			var lForLeft = $('#left');
			var whereMenu = lForLeft.offset().left+lForLeft.width()-4+"px";

			if(docs.enableWideWhirlpool==='true'){
				window.setTimeout(function(){	//need to wait for the css/theme to load
					whereMenu = lForLeft.offset().left+lForLeft.width()-4+"px";
					$('#pmenu')[0].style.left=whereMenu;
				}, 500);
			}

			GM_addStyle("#pmenu {padding:0;list-style-type: none; position:fixed;z-index:50;height:19px;overflow:hidden;width:18px;left:"+whereMenu+";}"+
						"#pmenu img{margin;0;padding:0;border:none;background:transparent;width:16px;}"+
						"#pmenu:hover {height:auto;overflow:visible;}"+
						"#pmenu ul {padding:0; margin:0; list-style-type: none; width:101px;}"+
						"#pmenu li {position:relative;z-index:51;}"+
						"#pmenu a{display:block;width:110px;font-weight:bold;font-size:12px; color:#FFFFFF; height:26px; line-height:26px; "+
							"text-decoration:none; text-indent:5px; background:#616CA3; border:1px solid orange;white-space: nowrap; }"+
						"#pmenu>li>ul>li>a{background:#EDEDED;color:#000;}"+
						"#pmenu li:hover > a {background:#dfd7ca; color:#c00;}"+
						"#pmenu li ul {display: none;} "+
						"#pmenu li:hover > ul {display:block; position:absolute; top:0; z-index:52;margin-left:111px;}");			
				
				

			var spinner="data:image/png;base64,"+
				"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"+
				"RK5CYII=";

			var gfx = 'http://forums.whirlpool.net.au/skin/web/img/favicon.gif';	
			var uNumber = docs.uinfo.find('a')[0].href.split('/user/')[1];		
			var newUL2, unLi = $('<ul id="pmenu">');

			unLi.html('<img id="menuSpinner" src="'+spinner+'" />'+
				'<li><a href="#">WP User</a>'+
					'<ul> ' +
						'<li><a href="http://forums.whirlpool.net.au/forum-user.cfm?id='+uNumber+'">Your Posts</a></li> ' +
						'<li><a href="http://forums.whirlpool.net.au/forum-user-online.cfm">People Online</a></li> ' +
						'<li><a href="http://forums.whirlpool.net.au/whim/?action=inbox">Inbox</a></li> ' +
						'<li><a href="http://forums.whirlpool.net.au/whim/?action=outbox">Outbox</a></li> ' +
						'<li><a href="http://forums.whirlpool.net.au/whim-contacts.cfm">Contacts</a></li> ' +
						'<li><a href="http://forums.whirlpool.net.au/forum-subs.cfm">Subscriptions</a></li> ' +
						'<li><a href="http://forums.whirlpool.net.au/forum-search.cfm">Thread Search</a></li> ' +
						'<li><a href="http://forums.whirlpool.net.au/profile/">Your Settings</a></li> ' +
						'<li><a href="http://forums.whirlpool.net.au/profile/index.cfm?a=logout&logout='+uNumber+'">Log out</a></li> ' +
					'</ul> ' +
				'</li> ');
			
			$('.forumlist').each(function(){

			  $(this).children().each(function(){
			
					if(this.tagName=='DT'){
						var newLI1 = $('<li>');
						var newA1 = $('<a href="#">');
						newUL2 = $('<ul>');
						newA1.text($(this).text());
						newLI1.append(newA1);
						newLI1.append(newUL2);
						unLi.append(newLI1);
					}
					else{
						var newLI2 = $('<li>');
						newLI2.html($(this).html());
						newUL2.append(newLI2);
					}
					
				});
			});		
			unLi.find('*').addClass('notarget');
			wlrMenu.unLi=unLi;
		
		},	
		rightClickMen:function(){
			
			wlrMenu.generateMenu();
				
			document.addEventListener('mouseup', function(e) {

				if(e.which==3 && e.target.tagName != 'A' && e.target.tagName != 'TEXTAREA'){
				
					wlrMenu.unLi.remove();
					$('body').prepend(wlrMenu.unLi);
					$('#menuSpinner').remove();
					wlrMenu.unLi[0].style.position = 'absolute';
					wlrMenu.unLi[0].style.left = ''+e.pageX-250+'px';
					wlrMenu.unLi[0].style.top = ''+e.pageY+'px';
					wlrMenu.unLi[0].style.overflow='visible';

				}
				if(e.which==1 && $('#pmenu')[0] && e.target.className != 'notarget'){
				
					wlrMenu.unLi.remove();
				
				}

						
			}, false);
		},
		spinnerMen:function(){
		
			wlrMenu.generateMenu();				
				
			$('body').prepend(wlrMenu.unLi);
			wlrMenu.unLi.css('margin', '25px 0 50px 5px');

		}
						
	}
	function noBottom(){
		
		$('.threads a').each( function(){

				this.href = this.href.replace("&p=-1#bottom", "");

		});				
		
	}
	var imVidImg = {

		imVidImgGrabAs: null,
		inlineVideos:function(tH, jThis, tableRow){
		
			var vidnum;	
			if(tH.indexOf("youtube.com/watch")>-1){
			
				vidnum = tH.split('v=')[1].split('&')[0];
				jThis.after('<embed src="http://www.youtube.com/v/'+vidnum+'&hl=en&fs=1" type="application/x-shockwave-flash" allowscriptaccess="always" '+
								'allowfullscreen="true" width="425" height="344"></embed>');

			}
			else if(tH.indexOf("google.com/videoplay")>-1){
			
				vidnum = tH.split('docid=')[1].split('&')[0];
				jThis.after('<embed id="VideoPlayback" src="http://video.google.com/googleplayer.swf?docid='+vidnum+'&hl=en&fs=true" '+
								'style="width:400px;height:326px" allowFullScreen="true" allowScriptAccess="always" type="application/x-shockwave-flash"> </embed>');

			}

		},
		openImageOnPage:function(t){
			t.click(function(){
				$(this).children('img:first').toggleClass('maximumWidthImage');
				return false;				
			});		
		},
		inlineImages:function(tH, jThis, tableRow){

			var tHlc=tH.toLowerCase();
			var extensions=".jpeg.jpg.gif.png.bmp";
			var dot=tHlc.lastIndexOf(".");
			if(dot >= 0 && extensions.indexOf(tHlc.substr(dot)) >-1 && tHlc.indexOf('?')<0) {
			
				var closestP = tableRow.width()-40;
				var jHtml = jThis.html();
				jThis.html(jHtml+'<img src="'+tH+'" style="max-width:'+closestP+'px;display:block !important;border:none;cursor: move;" />');
				imVidImg.openImageOnPage(jThis);
				
			}
			else if(tH.indexOf('flickr.com/photos/')>-1 && !window.google){

				GM_xmlhttpRequest({
					method: 'GET',
					url: encodeURI(tH),
					headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain'},
					onload: function(responseDetails){

							try{
								var splitFTW = responseDetails.responseText.split('class="photoImgDiv">')[1].split('<img src="')[1].split('""')[0].split('?')[0];  //cause I suck at regex
								var closestP = jThis.closest("p").width();
								var jHtml = jThis.html();
								jThis.html(jHtml+'<img src="'+splitFTW+'" style="max-width:'+closestP+'px;display:block !important;border:none;cursor: move;" />');								
							}
							catch(e){
							
								GM_log(e);
							
							}
						}
				});			
				imVidImg.openImageOnPage(jThis);
			}
			else if(tH.indexOf('redbubble.com')>-1){
				
				var hrs = tH.split('/');  
				var lasthr = hrs[hrs.length-1];					
				if(!lasthr.length){
					lasthr=hrs[hrs.length-2];
				}
				var closestP = tableRow.width()-40;
				var jHtml = jThis.html();
				jThis.html(jHtml+'<img src="http://images-0.redbubble.net/img/art/size:xlarge/view:main/'+lasthr+'.jpg" '+
				'style="max-width:'+closestP+'px;display:block !important;border:none;cursor: move;" />');					
				imVidImg.openImageOnPage(jThis);
			}
						
		}
	
	}
	function avatar(dreThis){

		var bfirst = dreThis.children('td:first');
		var cDiv = bfirst.children('div');
		var uNumClass = cDiv.eq(1).children('a:first').attr('href').split('/user/')[1];
		var uClassClass = cDiv.eq(2).text().replace(/ /g,'_');
		dreThis.addClass("wlr_"+uNumClass+" "+uClassClass);
		bfirst.prepend('<div><a href="/forum-user.cfm?id='+uNumClass+'"/></div>');

		if(!docs.avatarCSS){
			var b=[
				"data:image/png;base64,",
				"iVBORw0KGgoAAAANSUhEUgAAABQAAAABCAYAAADeko4lAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9gE",
				"FgoSD1eXcvUAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAO0lEQVQI1wXBsQGAIAwAsBSXwn3+fwZ0kZoE3gjV7YSo1mcYdd3iOXy1rNr2sda0",
				"dyIxGcnNCLNbCvMHhQEYTyMYKXEAAAAASUVORK5CYII="
			].join('');
			//GM_addStyle('@import "http://ideatriage.com/files/wlrtheme/rank/small/themex2.css";');
			//GM_addStyle('@import "http://ideatriage.com/wlr/avatar/avatar.css";');
			GM_addStyle('td.bodyuser > div:first-child > a:first-child { margin:0 auto; } #replies tr .bodyuser div div:last-child:before { padding:5px 0 0; }');
			GM_addStyle('@import "http://goodbyepolar.com/wpavatars/avatar.css";');
			if(docs.penaltyBoxBackground==='true'){
				GM_addStyle('tr.In_the_penalty_box > td.bodyuser {background-image:url('+b+')!important;background-repeat:repeat !important;');
			}
			if(docs.animatedAvatars==='true'){
				GM_addStyle('@import "http://goodbyepolar.com/wpavatars/animatedavatar.css";');
			}
			/*if(docs.sigs==='true'){
				GM_addStyle('@import "http://goodbyepolar.com/wpavatars/sigs.css";');
			}*/		
			docs.avatarCSS=true;
		}
	
	}
	function userNotes(trParent, i){
	
		var firstDiv = trParent.children('td:first').children('a:last').next();
		var uNum = firstDiv.text().split('User ')[1].split(' ')[0];
		var usrNtsPic = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI+SURBVHjajFLfS5NRGH7O3LLEuUXBJgsagZVKKzcish/MoruthJCgi64qpeimiPoTgiCjGmY33Y22RQheBBFMxVRkc1BKYNDcNJRcKyVta9+3t/N+8xsqZT7wfOe873mfh/O+3xHdMYoC8GIt+iRbsBl0jaq0Hl8Wi7SSx0aUNTCoqooiAb3xWbQ/i2urvVrAt1cgMFIgPvsXWVs2SOa2I3DZI3jl2G6WJvsr8GQoR/81UGXgdlTg8eAS8cqxqpkY4Ks3aXk9t4ZSa1QUpS/9XfG6HSYwGWoRmOsR2t7eSvA1VOJR/wKd/2YVeo4htTDIT8vLsQWkswVNyJyOCNhPBjVqe7MR/sYqhCwZKhRQrtMN0HFih4jEs0hlf0ORB/l8qccq2xE4TgWRDArYakzwHzAjbJ0jrlF0g4K0VGRxh9cmwqNfpUketRcIE68uYnHyKaq3LcN57DYmn0sTyxb4D1rR+WaGWMNa7Qb6la6d3iXCI7NIZXLYfYkw1nsfPz4GUGOIYZ+7CRNdsh1LJc427UTn6ykqt6AbMK+fcYrw8Iw0+YW6K4Thtwlkk1FYTQm4XEDioUCtdSvOeWzcApUM1v2e5vE6EXqXkibLaLxBGBgAMhk5l5X5aHVySKw16g9pNXjSRz/Ui5A6Tm3NThy6RYjeK/3Ww3cJ6fklRIamOBR/NfDcKSU8suBBz3tqO76nnEvN/0Rk8DNutrr4rPQSNwIXvuj/hGkpZPKec9qDk1pxtTuGTUK/p1id/CPAAEz9m+ewRMxsAAAAAElFTkSuQmCC';
		var uNJa=eval('('+docs.userNotesArr+')');
		if(uNJa!=='{}' && uNJa[uNum]){
			usrNtsPic = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI6SURBVHjajFJdSJNRGH7O5tdM2nRM2BcWdBUty5iSd9UkvAi2CpJuiq76kQqCoNugq7oTSgm76Xab3YkEBU3JTGwLvZCMmrZpDDI2lm775vdzOu/Jb6iU+cLznfc87/s8nHO+lw0meQJACJtjVKALO4mnUybfGt9/WXydx3YQPXCYpgmLA8OpHG48S8lV3cMQPsgwMKlzqv0LpK0ZLGheDFztYLTSXnULk0NO9E9o/L8Gpti0tzjxZLzEaaW9KU0cCAcUydvcJghtnWEYo9mCEWpvUUCgMC2g4Xa3zNX+1wgfduHxWJHfi/Uw4sqCoxBaOMSn68XHIrJ5XQoJyrWT4MGgBOWquw6R1gY8vBDlerVa67MN0HvCx4ZSeWTyazBEoVqpwLIsMJ8Pjs5OsCvH4fcoiBx149HFIU49hm2g6zoMcZ/ekJ/Fp34Ikyoqzz8gPzICfXYWTtHkCgRg9ATgb9yFyLEm9L1a4qQhrTyBfaSbp/ex+GQOmZ8azNgn5BIJaDMzUAoFuFUVlTP7oTa6cDbYjL6X33jtCrYB4Vb3ARZ/vyRMKnAOLyIzPY3y/DzqV1bQ7PGgeMqLvU31ONfhpyvwPwZbfs/lB0dY7F1GmJSx+00BX9NprJZK8l3ofWSfGAR5AnuQNoJe+tL9AIuNLyC7XIJnQsPnuTkJyomjmtCyvxp4k1ziTqSVRd+mkVlerXGUE0e12iRuF3fPt7Ho2BcsCiGBcuLkwAktuz6YxA6Dr69sI/lbgAEAnwbBEooM1B8AAAAASUVORK5CYII=';		
		}

		
		$('<img src="'+usrNtsPic+'"/>').attr({uNum: uNum,title:'User Note',parentNum: 'parentNum'+trParent.attr('id')})
			.css({'padding':'0 5px','cursor':'pointer'}).appendTo(firstDiv[0]).bind('mouseup',function(e){

			if(!docs.d.getElementById("uS"+uNum.split('#')[1])){
				var modalBackground = $('<div id="wlrsettingsoverlay" style="height: 100%; width: 100%; position: fixed; left: 0pt; top: 0pt; z-index: 2999; opacity: 0.5; background-color:#000000;"/>');
				$('body').append(modalBackground);
				var key, uNJ, ithis = $(this),unThis = ithis.attr("uNum"),uN = GM_getValue('userNotesArr');
				
				if(uN!=='{}'){

					uNJ=eval('('+uN+')');
					key = uNJ[unThis];

				}
				else{
				
					uNJ={};
				
				}

				var closer = docs.d.createElement('a');
				closer.setAttribute('style','left:230px;position:relative;color:grey;font-weight:bold;font-size:1.5em;text-decoration:none;');
				closer.href="#";
				closer.innerHTML=' X ';
				
				var diag = docs.d.createElement('div');
				diag.setAttribute("clickerID",ithis.attr('parentNum'));
				diag.setAttribute('title','User Note');
				diag.setAttribute('style','background-color:#FFD27D;position:absolute;top:'+e.pageY+'px;left:'+e.pageX+'px;width: 250px; height: 150px;z-index: 3000;');
				
				var diagBR = docs.d.createElement('br');
				var diagTa = docs.d.createElement('textarea');
				diagTa.setAttribute('style','border: none ; margin: 0pt 0pt 0pt 5px; height: 120px; width: 240px;');
				if(key && key!==''){
				
					diagTa.value=key;
				
				}
				
				diag.appendChild(closer);
				diag.appendChild(diagBR);
				diag.appendChild(diagTa);
				docs.d.body.appendChild(diag);


				$(closer).bind('click', function(){

					var texValar=diagTa.value;

					if(key && texValar===''){
					
						delete uNJ[unThis];
						GM_setValue('userNotesArr', uNJ.toSource().toString());
						$('').attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA'+
											'BGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI'+
											'+SURBVHjajFLfS5NRGH7O3LLEuUXBJgsagZVKKzcish/MoruthJCgi64qpeimiPoTgiCjGmY'+
											'33Y22RQheBBFMxVRkc1BKYNDcNJRcKyVta9+3t/N+8xsqZT7wfOe873mfh/O+3xHdMYoC8GIt+i'+
											'RbsBl0jaq0Hl8Wi7SSx0aUNTCoqooiAb3xWbQ/i2urvVrAt1cgMFIgPvsXWVs2SOa2I3DZI3jl2G'+
											'6WJvsr8GQoR/81UGXgdlTg8eAS8cqxqpkY4Ks3aXk9t4ZSa1QUpS/9XfG6HSYwGWoRmOsR2t7e'+
											'SvA1VOJR/wKd/2YVeo4htTDIT8vLsQWkswVNyJyOCNhPBjVqe7MR/sYqhCwZKhRQrtMN0HFih4jE'+
											's0hlf0ORB/l8qccq2xE4TgWRDArYakzwHzAjbJ0jrlF0g4K0VGRxh9cmwqNfpUketRcIE68uYnHy'+
											'Kaq3LcN57DYmn0sTyxb4D1rR+WaGWMNa7Qb6la6d3iXCI7NIZXLYfYkw1nsfPz4GUGOIYZ+7CRNd'+
											'sh1LJc427UTn6ykqt6AbMK+fcYrw8Iw0+YW6K4Thtwlkk1FYTQm4XEDioUCtdSvOeWzcApUM1v2e5v'+
											'E6EXqXkibLaLxBGBgAMhk5l5X5aHVySKw16g9pNXjSRz/Ui5A6Tm3NThy6RYjeK/3Ww3cJ6fklRIamO'+
											'BR/NfDcKSU8suBBz3tqO76nnEvN/0Rk8DNutrr4rPQSNwIXvuj/hGkpZPKec9qDk1pxtTuGTUK/p1id/'+
											'CPAAEz9m+ewRMxsAAAAAElFTkSuQmCC');
						
						
					}
					else if(texValar!==''){

						uNJ[unThis]=texValar;
						GM_setValue('userNotesArr', uNJ.toSource().toString());
						$('').attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/'+
											'9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWF'+
											'keXHJZTwAAAI6SURBVHjajFJdSJNRGH7O5tdM2nRM2BcWdBUty5iSd9UkvAi2CpJuiq7'+
											'6kQqCoNugq7oTSgm76Xab3YkEBU3JTGwLvZCMmrZpDDI2lm775vdzOu/Jb6iU+cLznfc87'+
											'/s8nHO+lw0meQJACJtjVKALO4mnUybfGt9/WXydx3YQPXCYpgmLA8OpHG48S8lV3cMQPsg'+
											'wMKlzqv0LpK0ZLGheDFztYLTSXnULk0NO9E9o/L8Gpti0tzjxZLzEaaW9KU0cCAcUydvcJ'+
											'ghtnWEYo9mCEWpvUUCgMC2g4Xa3zNX+1wgfduHxWJHfi/Uw4sqCoxBaOMSn68XHIrJ5XQoJy'+
											'rWT4MGgBOWquw6R1gY8vBDlerVa67MN0HvCx4ZSeWTyazBEoVqpwLIsMJ8Pjs5OsCvH4fcoi'+
											'Bx149HFIU49hm2g6zoMcZ/ekJ/Fp34Ikyoqzz8gPzICfXYWTtHkCgRg9ATgb9yFyLEm9L1a4q'+
											'QhrTyBfaSbp/ex+GQOmZ8azNgn5BIJaDMzUAoFuFUVlTP7oTa6cDbYjL6X33jtCrYB4Vb3ARZ/'+
											'vyRMKnAOLyIzPY3y/DzqV1bQ7PGgeMqLvU31ONfhpyvwPwZbfs/lB0dY7F1GmJSx+00BX9NprJ'+
											'ZK8l3ofWSfGAR5AnuQNoJe+tL9AIuNLyC7XIJnQsPnuTkJyomjmtCyvxp4k1ziTqSVRd+mkVler'+
											'XGUE0e12iRuF3fPt7Ho2BcsCiGBcuLkwAktuz6YxA6Dr69sI/lbgAEAnwbBEooM1B8AAAAASUVORK5CYII=');
				
					}
					
					docs.d.body.removeChild(diag);
					$('#wlrsettingsoverlay').remove();
					return false;
				
				});
				
				
			}
			return false;
		}); 		

	}	
	function userIgnore(trParent, i){

		if(i==0){
			GM_addStyle('.wlr_userIgnore{display:none !important;}');	
		}
		var tdFirst = trParent.children('td:first');
		var firstDiv = tdFirst.children('a:last').next();
		var uNum = firstDiv.text().split('User ')[1].split(' ')[0];
		
		if(docs.hiddenUsersArr.length){
			var hiddUsersArr = docs.hiddenUsersArr.split('#');
			hiddUsersArr.shift();
			for(var i=0;i<hiddUsersArr.length;i++){
			
				var uNumWithoutHash = uNum.split('#')[1];
				var numwithHash = '#'+hiddUsersArr[i];
			
				if(numwithHash==uNum){
				
					trParent.addClass('wlr_userIgnore');
				
				}
			}
		}
			
		var lastDiv = tdFirst.children('div:last');
		var hideU = $('<span title="hide user" style="margin-right:5px;" class="voteitem"> X </span>');
	
		if(lastDiv.attr('class')){

			lastDiv.prepend(hideU);
		
		}
		else{
			var itnX = $('<div class="voteblock">')
			itnX.append(hideU);
			lastDiv.after(itnX);
		
		}
		
		hideU.click(function(){
		
			var uNum2 = firstDiv.text().split('User ')[1].split(' ')[0];
			var uNumWithoutHash2 = uNum2.split('#')[1];
			if(!docs.hiddenUsersArr.match(uNum2)){
			
				GM_setValue('hiddenUsersArr', GM_getValue('hiddenUsersArr')+uNum2);
				docs.hiddenUsersArr+=uNum2;
				
				docs.repliesTR.each(function(){
					var repParent = $(this);
					
					if(repParent.children('td:first').find('a[href$="forum-user.cfm?id='+uNumWithoutHash2+'"]')[0]){

						repParent.hide();
					
					}
				
				});
				
			}
			
			return false;
			
		});

	}
	function smileys(){

		//Smilies - define swaps much further down below
		//The angry, confused, ninja and glaring smilies were created and are copyrighted by Tromac (1/3/2008)
		//confused
		docs.smlConfused = "data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%FF%FF%FF%D0%D6%E3%003%99%11%40%9F-V%A9%3Ff%B3Jm%B3%94%A7%CD(W%AB%2F%5C%AD2_%AEDl%B5%A8%BC%DC%CF%D6%E2%AC%C0%DEe%8F%C6%7B%9E%CD%84%A4%D0%88%A7%D2%91%AD%D4%9A%B4%D8u%9B%CBv%A4%D1%7D%A8%D4%7F%AA%D4%84%AD%D6%8D%B3%D8%94%B8%DB%93%B6%D9%97%BA%DC%D6%E3%F0%9C%BE%DE%A6%C4%E1%AC%C8%E3%AF%CA%E4%B7%D0%E7%BC%D3%E8%C3%D8%EB%CF%E0%EF%C5%D9%EA%DD%E9%F3%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00*%00%2C%00%00%00%00%0F%00%0F%00%00%06%98%40%95P%858%10%06%84%03b8%14%14%0C%8F%13%8AD1%14%1CC%07%A1%91B%95F%E0%90%84%80U%15%B8%00%80H%14J%83%22%05%E2!%05%20%ADC%A0%3C%00%B4(FKwy%1E%83%1D%11F%1F%26%60%7B%20%1C%00%1B%8F%1BG'vm%8C%8D%1A%98%1AH(a%20%1E%1D%1B%98%19%A3I%15%23!m%8E%1B%19%00%17%17%10J%0Cl%00%1E%1B%00%1A%18%AD%17%09K%05%13m%9F%B6%AD%16%10q*%02%04%12%9E%A0%B8%AF%04%02M%05%0A%12%CC%16%0B%05%D0LrGIKCA%00%3B";
		//ninja
		docs.smlNinja = "data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%FF%FF%FF%18%18%1F%18%18%1D%18%18%1C%18%18%1A%18%19'%18%1A%2C%18%1A%2B%18%1B0%18%1B%2F%18%1C2%18%1D4%1A%1F6%19%1D2%1C%22%3A%19%1F6%1D%24%3D%19!%3A%19%207%1A%23%3D%1B%26A%1D)D%D0%D6%E3%1D*E%94%A7%CD%20%2FJ%221J%CF%D6%E2%AC%C0%DE%267N.%3FW%7B%9E%CDv%A4%D1%7F%AA%D4%84%AD%D6%3CM_%8D%B3%D8%94%B8%DB%93%B6%D9%97%BA%DC%D6%E3%F0%9C%BE%DE%A6%C4%E1%AC%C8%E3%AF%CA%E4%CF%E0%EF%C5%D9%EA%DD%E9%F3%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%001%00%2C%00%00%00%00%0F%00%0F%00%00%06%95%C0%980%96%11%14%8E%82%CCpx!%08%22%1F%8F%C6!%20p%86%9C%C2%83%E4%D9%60%BE%15E%E1%1A%23l%A5%16K%85%C2%3E%10%88%02%18%60%CEZ%A9%E6%00%D5%A0%D8%01%A4%FEy~%80%20F)~%87w%86%86%25G.%82%86%26%8F%00%23G%2F-x('%25x%22%22%05%02%0D-%2Bv(%25%25%22!%A9%06I%02j%14%12%10%10%0C%0B%09%B5%04J%04%09k%12%13%B2%B4%08%06o1%17%05%0A%AF%BD%B3%09%06%05%17L%04%03%0A%C8%08%03%04%CDKpG%9FJCA%00%3B";
		//glare
		docs.smlGlare = "data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%FF%FF%FF%D0%D6%E3%003%99%11%40%9F-V%A9%3Ff%B3Jm%B3%94%A7%CD(W%AB%2F%5C%AD2_%AEDl%B5%A8%BC%DC%CF%D6%E2%AC%C0%DEe%8F%C6%7B%9E%CD%84%A4%D0%88%A7%D2%91%AD%D4%9A%B4%D8u%9B%CBv%A4%D1%7D%A8%D4%7F%AA%D4%84%AD%D6%8D%B3%D8%94%B8%DB%93%B6%D9%97%BA%DC%D6%E3%F0%9C%BE%DE%A6%C4%E1%AC%C8%E3%AF%CA%E4%B7%D0%E7%BC%D3%E8%C3%D8%EB%CF%E0%EF%C5%D9%EA%DD%E9%F3%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00*%00%2C%00%00%00%00%0F%00%0F%00%00%06%92%40%95P%858%10%06%84%03b8%14%14%0C%8F%13%8AD1%14%1CC%07%A1%91B%95F%E0%90%84%80U%15%B8S%91(%14%02%81%22%05%E2%A1KR%B7%DD%EEE1%0A%E8%03%40~%00%1D%11F%1F%26%00%23w%00%1C%1B%8D%1BG'uw%1C%8C%1A%96%1AH(a%20%1E%1D%8D%1A%19%A1I%15%89m%1E%8D%19%17%AA%10J%0Ck%9C%7D%1A%18%AA%17%09K%05%13%A6%9E%B2%17%16%10q*%02%04%12%9C%BB%B3%10%04%02M%05%0A%12%BB%16%0B%05%CALrGIKCA%00%3B";
		//angry
		docs.smlAngry = "data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%FF%FF%FF%D0%D6%E3%003%99%11%40%9F-V%A9%3Ff%B3Jm%B3%94%A7%CD(W%AB%2F%5C%AD2_%AEDl%B5%A8%BC%DC%CF%D6%E2%AC%C0%DEe%8F%C6%7B%9E%CD%84%A4%D0%88%A7%D2%91%AD%D4%9A%B4%D8u%9B%CBv%A4%D1%7D%A8%D4%7F%AA%D4%84%AD%D6%8D%B3%D8%94%B8%DB%93%B6%D9%97%BA%DC%D6%E3%F0%9C%BE%DE%A6%C4%E1%AC%C8%E3%AF%CA%E4%B7%D0%E7%BC%D3%E8%C3%D8%EB%CF%E0%EF%C5%D9%EA%DD%E9%F3%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00*%00%2C%00%00%00%00%0F%00%0F%00%00%06%99%40%95P%858%10%06%84%03b8%14%14%0C%8F%13%8AD1%14%1CC%07%A1%01%40%95F%60%80%84%80U%15%1A%A9%13%40%24%0A%01%40%A0H%81xHME%007%1C%BE(FKl!p%1E%84%1D%11F%1F%26ap%1C%00%1B%8F%1BG'%24mo%1C%8D%1A%99%1AH(%60%82%1E%1D%1B%99%19%A4I%15%23!%82%1C%8F%A4%17%17%10J%0Cm%20%00%B5%B5%AE%17%09K%05%13n%A0%A2%18%00%16%10s*%02%04%12%20%BF%1A%18%AF%04%02M%05%0A%12%A1%1A%16%0B%05%D0LtGIKCA%00%3B";
		// frowning
		docs.smlFrown = "data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%94%B8%DBe%8F%C6-V%A9%003%99%AF%CA%E4%94%A7%CD%CF%D6%E2%7D%A8%D4%A8%BC%DC%3Ff%B3f%99%CC%8D%B3%D8%CF%E0%EF%11%40%9F%7B%9E%CD%BC%D3%E8%9C%BE%DE%AC%C0%DE%84%AD%D6%D6%E3%F0u%9B%CB%AC%C8%E3%93%B6%D9%2F%5C%AD%88%A7%D2Jm%B3%97%BA%DC%C5%D9%EA%84%A4%D0%D0%D6%E3%A6%C4%E1%DD%E9%F3%B7%D0%E7%AD%C5%DE%91%AD%D42_%AE%7F%AA%D4v%A4%D1Dl%B5f%99%CC%C3%D8%EB(W%AB%9A%B4%D8%ED%ED%ED%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%05%14%00%2C%00%2C%00%00%00%00%0F%00%0F%00%00%06%95%40%96%90e%D08%08%0E%8Da8%F4%0C%14%92%06'4R%0C%0E%C3%83%23%01%E2%40%0A%E0O%C7%81e%0D%B8%80%90%C5%F2%01%00%22%8F%01Q%D3%0D%01%3E%9F%88%5EO*F!ky%11%1B%84%17%0FF%14)%60o%11%01%00%0C%90%0CG%0Djm%8D%8E%13%99%13H%1Ca%83%17%0C%99%25%A3I%2B%05x%8D%90%A3%26%26%02J'l%11n%B3%AC%26*K%03%19m%1B%A0%13%08%00%15%02r%2C%1E%0E%1D%9F%A1%08%AD%0E%1EM%03%18%1D%BD%15%24%03%CDLsGIKCA%00%3B";
		// sticking tongue out
		docs.smlRazz = "data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%7D%A8%D4-V%A9%FF%00%00%003%99f%99%CC%AC%C0%DE%BC%D3%E8%96%B9%DC%3Ff%B3%94%A7%CDe%8F%C6%8D%B3%D8%CF%E0%EF%11%40%9F%7B%9E%CD%A8%BC%DC%AF%CA%E4%CF%D6%E2%93%B6%D9%88%A7%D2%D6%E3%F0u%9B%CB%AC%C8%E3%2F%5C%AD%84%AD%D6Jm%B3%94%B8%DB%C5%D9%EA%84%A4%D0%D0%D6%E3%9C%BE%DE%A6%C4%E1%DD%E9%F3%B7%D0%E7%AD%C5%DE%91%AD%D42_%AEu%A3%D1f%99%CCDl%B5%C3%D8%EB(W%AB%9A%B4%D8%ED%ED%ED%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%05%14%00%2C%00%2C%00%00%00%00%0F%00%0F%00%00%06%96%40%96%90%A5%D08%08%0E%8Db8%F4%08%12%86%06GDJ%08%24C%89%03%12%E2%1C%22%60P%C7%81e%09%B8%00%C0%E5%02J%7F%1E%02%A2%A6%2BZ%83%3Ex%7C%A9%18%3D%5C%00w%1F%00%1B%84%0FF%15)%60%00x%1B%00%0C%8F%0CG%0Du%20w%84%0C%19%99%19H%1C%11%80%1F%08%08%98%19%00%01%01I%2B%9Ei%AB%AB%26%0BJ(l%00%03%B4%B4%00%26%26*K%02%14w%B3%B6%B8%0Bq%2C%1E%0E%1Dx%B3%A5%AE%0E%1EM%02%18%1D%13%98%16%25%02%CDLrGIKCA%00%3B";
		// big grin
		docs.smlGrin ="data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%94%B8%DB%3Ff%B3%003%99%CF%D6%E2u%A3%D1%FF%FF%FFe%8F%C6-V%A9%AC%C8%E3%94%A7%CD%A8%BC%DC%84%AD%D6%BC%D3%E8%CF%E0%EF%11%40%9Ff%99%CC%84%A4%D0%91%AD%D4%9A%BC%DDu%9B%CB%D6%E3%F0%AC%C0%DE%AF%CA%E4%8D%B3%D8%2F%5C%AD%C5%D9%EBJm%B3%A6%C4%E1%D0%D6%E3%7C%A8%D3%94%BD%DE%8C%A5%D6%DD%E9%F3%9A%B4%D8%AD%C5%DE%B7%D0%E72_%AE%C5%D9%EADl%B5f%99%CC%7B%9E%CD(W%AB%93%B6%D9%C8%DB%EC%ED%ED%ED%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%05%14%00-%00%2C%00%00%00%00%0F%00%0F%00%00%06%8F%C0%96%B0%A5%D8%3C%06%8F%8Db8%EC%20%04%16%87%86%24%11%20%08C%C2c%11b5.%60N%E4%81m!%B8%2CR%22%C1isR%08%E2%A6K%02%B8%01%93%7C%A9%18m%24%ECy%00%01%83)F%15%00ay%83%18%18%00%18G%0E%00%92%93%94%00%0CH%26%00%06%9B%9C%9C%00%1EI%22%17%9A%9D%9B%00%05%07J'l%A4%9E%05%05*K%08%11%1C%13%95%AF%07q-%1D%0F%11y%2B%18%0C%1E%A8%0F%1DM%08%19%11%C0%0C%14%25%08%C6LrGIKCA%00%3B";
		// neutral, straight mouth
		docs.smlNtl ="data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%94%B8%DBe%8F%C6%003%99%AC%C0%DE-V%A9%BC%D3%E8%94%A7%CD%7D%A8%D4%3Ff%B3%9C%BE%DEf%99%CC%CF%E0%EF%8D%B3%D8%11%40%9F%7B%9E%CD%AF%CA%E4%A8%BC%DC%CF%D6%E2%84%AD%D6%D6%E3%F0u%9B%CB%AC%C8%E3%93%B6%D9%2F%5C%AD%88%A7%D2Jm%B3%C5%D9%EA%84%A4%D0%97%BA%DC%D0%D6%E3%A6%C4%E1%DD%E9%F3%B7%D0%E7%AD%C5%DE%91%AD%D42_%AE%7F%AA%D4u%A3%D1Dl%B5f%99%CC%C3%D8%EB(W%AB%9A%B4%D8%ED%ED%ED%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%05%14%00%2C%00%2C%00%00%00%00%0F%00%0F%00%00%06%95%40%96%90u%D08%06%0E%CDa8%F4%14%12%04%C6%264J%14%24C%89%23%02%DA%18%20%E0%0F%C7%81e%15%B8%80%90%C5%F2%01%00%14%8F%02Q%03J%AF%3F%8A%7C%9ET%8C%1A%2C%00x%0A%00%01%85%0FF%14)%60o%0A%01%00%0D%90%0DG%0Cj%1Fx%85%0D%13%9A%13H%1Ba%0A%1D%17%99%13%25%A5I%2B%10%96%8D%90%A5%26%26%02J'ln%B4n%AE*K%05%19x%A1%99%08%AE%02r%2C%1E%0E%1C%A0%A2%13%BF%02%0E%1EM%05%18%1C%C8%15%24%05%CDLsGIKCA%00%3B";
		// wink
		docs.smlWink ="data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%94%B8%DBe%8F%C6-V%A9%003%99%AC%C0%DE%BC%D3%E8%94%A7%CD%7D%A8%D4%3Ff%B3%A8%BC%DCf%99%CC%CF%E0%EF%8D%B3%D8%11%40%9F%7B%9E%CD%AF%CA%E4%9C%BE%DE%CF%D6%E2%84%AD%D6%D6%E3%F0u%9B%CB%AC%C8%E3%93%B6%D9%2F%5C%AD%88%A7%D2Jm%B3%C5%D9%EA%84%A4%D0%A6%C4%E1%94%BD%DE%D0%D6%E3%DD%E9%F3%B7%D0%E7%AD%C5%DE%91%AD%D42_%AE%7F%AA%D4u%A3%D1Dl%B5f%99%CC%C3%D8%EB(W%AB%9A%B4%D8%ED%ED%ED%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%05%14%00%2C%00%2C%00%00%00%00%0F%00%0F%00%00%06%97%40%96%90u%D08%08%0E%CDa8%FC%0C%12%05%C6%264J%0C%24C%89C%01%DA%18%20%E0%0E%C7%81e%0D%B8%80%90%C5%D2iw%1E%03%A2%06%94%5Ew%22x%3C%A9%185X%00w%11%00%00%17%17%0FF%14)%60%00x%01%01%0D%90%0DG%0Cjm%11%8E%0D%13%9A%13H%1Ba%97%8F%13%00%25%A4I%2B%10%96%8F%0D%25%00%26%26%02J'l%00%1E%17%99%AD%AE*K%03%19w%83%83%08%AE%02q%2C%1F%0E%1Cx%B6%13%C1%02%0E%1FM%03%18%1C%CA%15%24%03%CFLrGIKCA%00%3B";

		docs.smlRoll ="data:image/gif,GIF89a%0F%00%0F%00%E6%00%00%FF%FF%FF%ED%ED%ED%DD%E9%F3%D9%E7%F2%D6%E3%F0%CF%E0%EF%CE%DF%ED%CA%DC%ED%C5%D9%EB%D0%D6%E3%CF%D6%E2%C5%D9%EA%C3%D8%EB%BD%D4%E8%BC%D3%E8%BB%D2%E8%B9%D1%E7%B7%D0%E7%B9%CF%E6%B1%CB%E5%B0%CA%E4%AE%C9%E4%AD%C9%E3%AC%C8%E3%AA%C6%E2%A9%C6%E2%A8%C5%E2%A7%C5%E1%A6%C4%E1%AE%C1%DF%A5%C3%E1%A4%C2%E0%A3%C2%E0%AC%C0%DE%A0%C0%DF%A8%BC%DC%9F%BF%DF%9E%BF%DE%9D%BE%DE%9C%BE%DE%9A%BC%DD%99%BB%DD%98%BA%DC%98%BB%DC%97%BA%DC%96%B9%DC%94%B8%DB%92%B7%DA%93%B6%D9%9A%B4%D8%92%B6%DA%91%B6%DA%90%B5%DA%8D%B3%D9%8D%B3%D8%8B%B2%D8%8A%B1%D8%87%AF%D6%87%AF%D7%91%AD%D4%85%AE%D6%86%AE%D6%84%AD%D6%83%AD%D6%95%A8%CE%96%A8%CE%81%AB%D5%94%A7%CD%80%AA%D4%88%A7%D2%7F%AA%D4~%A9%D4%7D%A8%D4%7C%A8%D3%84%A4%D0%82%A3%D0%82%A2%D0x%A5%D2v%A4%D1u%A3%D1~%9F%CEs%A1%D0%7B%9E%CDo%9F%CFu%9B%CBk%93%C8e%8F%C6_%8B%C4Lo%B4Io%B6Kn%B4Jm%B3Dl%B5%40i%B3%3Ff%B32_%AE2%5E%AE%2F%5C%AD.W%A9(W%AB-V%A9%12A%9F%11%40%9F%10%3F%9F%035%9A%024%9A%014%99%00%00%00%ED%ED%ED%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%05%0A%00l%00%2C%00%00%00%00%0F%00%0F%00%00%07%B9%80l%82lC%5Bfif%5B%40%83%83%09d%5E%1D%06%08%12%3B%5Db%0A%83%0Af%23%03%07%0E%14%17%18%1AJg%98lb%9Ckk%16%19%1C%AA%22PblAY%02k%00%00k%1F%B7%B9%2B_%40X!%BC%B8%C3%B9R%5Be%04%B7%AA%B9%B9%CB6gh%05%0D%AA%AF%D5k7%3Eje%0B%13%19%AA-47%AAFHDgX1%15%1B%22(.5%3ABIMNUZA%5C%17%1C%24%2B2%D9GM%A2L%19%B3HL%11%0F%25%AE%ADy2%E5%8A%2C6%09%CC0)%A1b%06%8E%1FI%9CX9%93%A0%91%980K%60%DC%C8A%05%8C%98%8E%8C%D8%00%D1b%06%8D%99%7B%8C%02%01%00!%F9%04%05%0A%00l%00%2C%04%00%05%00%08%00%07%00%00%07%18%80lk%83l%82%84%87%82%00%85%85%8A%8B%8E%8F%90%91l%2C%8Ekl%81%00!%F9%04%05%0A%00l%00%2C%04%00%04%00%07%00%09%00%00%07%16%80lkl%84%82%85%87%00%88%84%89%85%8C%87%8F%90%91%8F%83%87%81%00!%F9%04%052%00l%00%2C%04%00%04%00%08%00%07%00%00%07%17%80kl%83lk%86%86%00%83%88%00%8C%84%8D%84%90%91%92%93%91k%81%00!%F9%04%05%0A%00l%00%2C%04%00%04%00%07%00%09%00%00%07%1A%80%00%00l%84%82%83%84%85k%8Al%8Ak%8C%88%8E%88%92%93%94%95%92*%93%81%00!%F9%04%05%0A%00l%00%2C%02%00%03%00%0B%00%09%00%00%075%80l%82%11%82l%20%85l%07%11%17%1Al%22%26()l%05k%95k%25%96k2%88%00l%9D%88l%96.%96%88%20'%85%3DB%A0%AB%AC%88Q%88%99kO%82%81%00!%F9%04%05%0A%00l%00%2C%02%00%04%00%0B%00%07%00%00%07%2B%80lkl%84%85%82%84%0F%16%1A%20l(%2C.%2Fl%0C%83%82)%94k7l%17%1C%22(l47%3A%3C%86%A4%A5%A6%85%94%A5%81%00!%F9%04%09%0A%00l%00%2C%00%00%00%00%0F%00%0F%00%00%07%2B%80l%82%83%84%85%86%87%88%89%8A%88%07%87)%86k%91kl%92%93%84k%00%82%00%98%9A%96%83%95%94%92%8B%A3%A4%A5%A6%A7%A8%8A%81%00%3B";

		docs.smlShock ="data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%94%B8%DBe%8F%C6%003%99%BC%D3%E8-V%A9%FF%FF%FF%88%A7%D2%A6%C4%E1%84%A4%D0%3Ff%B3%CF%E0%EFu%A3%D1%8D%B3%D8%AC%C8%E3%11%40%9F%9D%BE%DEf%99%CC%CF%D6%E2%A8%BC%DCu%9B%CB%D6%E3%F0%AF%CA%E4%91%AD%D4%7D%A8%D4%84%AD%D6%2F%5C%ADJm%B3%AE%C1%DF%C5%D9%EA%D0%D6%E3%94%A7%CD%94%BD%DE%DD%E9%F3%9A%B4%D8%B7%D0%E7%AC%C0%DE2_%AE%7F%AA%D4Dl%B5f%99%CC%7B%9E%CD%C3%D8%EB(W%AB%93%B6%D9%ED%ED%ED%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%05%14%00-%00%2C%00%00%00%00%0F%00%0F%00%00%06%92%C0%96%B0%F5%D9%3C%06%8F%CDg8%F4%14%14%9CEgtQ%14%24C%C9c%12%EA%10%2C%60D%E2%81m%15%B8%00%80%C3%81HCR%05%E2%A6%3BZ%23%20x%7C%A9HZ%10%1C%00w%10%00%01%85)F%15*%60%00x%01%00%0D%90%0DG%0Bu%08w%85%0D%19%9A%19H%1Dai%A0%26%A2%26I%22%16m%06%A9%A9%00%0C%0C%02J'l%00%AA%AB%AD%2BK%05%07w%B3%B5%AEq-%1E%0F%09x%A0%18%AE%0F%1EM%05%1A%09%2C%99%14%25%05%C9LrGIKCA%00%3B\" align = baseline alt \"rolls eyes\" border=\"none\" >";

		docs.smlEvil ="data:image/gif,GIF89a%0F%00%0F%00%E6%00%00%00%00%00f%99%CC%A3%A3%A3JJJ%FF%00%00%BF%C7%CE333k%81%97%FFf%00%FF%FF%FF%96%B9%DC%C8%DB%ED%FF%3C%00%8C%AC%CDAAAY%5B%5C%B6%CF%E6w%92%AB%A5%C3%E1%FF%99%00%FF%1E%00%8F%B5%DA%7C%A8%D3%D7%E1%EB%FF%99%00%9B%B7%D1%8B%98%A5%A7%B4%BE%AD%C8%E3%CC%CC%CC%81%81%81%BE%D4%E9UUU%5E__%3C%3C%3C%DC%E8%F3%8C%9F%B2DGJ%83%AD%D6%C7%D5%E3%FFv%00%FFJ%00%AD%C5%DE%BC%CF%E1%CC%DA%E7%8F%B4%D7NUZ%9C%BD%DEu%A3%D1%AE%CA%E4p%85%99%A3%B3%C4%93%B7%DBfff%7B%AD%D6Y%5D%60%D8%E6%F2%C3%D7%EB%CE%DF%EF%8C%AD%D6%7C%94%AC%FF'%00%8F%9B%A7PTX%E5%E5%E5%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%05%14%00%40%00%2C%00%00%00%00%0F%00%0F%00%00%07%B5%80%03%20%1D%40%025%0E%06%0E5%02%40%17%1E!%06%04%3D!%0F%05%2C9%2B37%03%0C%14%25%22)(%178%0B%1F1%A7%12*%08)%22%22%13%13%00%0B%10%1C%1C%12%B6%00%13(%AD%23%23%0B%00%B4%B6%2F%00%0A%C4%BB%3A%1F%00%00%12%2F%C2%004%CF%06%2289%00%04%C9%0A%C9%D6%3B%3B%06%06%3A%10%D5%04%2F%CF%04%D6%26%26%89'%A7%D7%15%15%C9%16%16%0D%8A%1B1%00%1F%E34%E7%16%000%11%8B%0F%1C%92%09%1C%08%C3%05%23%10%3E%24%00H%C0%90!%BF%03%20%80%00%E9%E0%40C3%810d8%20%24%B1%03%88%1F%242%B4%D8%C1%A3%C4%20%89(%0B%1DJ%B4(e%20%00%3B";

		docs.imgStar ="data:image/gif,GIF89a%15%00%14%00%B3%02%00%F6%DDd%DF%D6%B1%FF%FF%FE%C8%B7d%EB%CBB%D4%B65%F6%E6%A5%B9%B0%7C%CF%C7%A9%EC%EC%E2%F1%EE%E8%F4%F2%EC%E3%DF%BF%C3%ABF%D6%C7%82%E5%E1%D1!%F9%04%01%00%00%02%00%2C%00%00%00%00%15%00%14%00%00%04yP%C8I%11%BD%F8%9E%CC%AF%0B%5D%F7%18N%C89%00ab%0F%90%82%EB%14%B8D%99%3D%01%A3%3F8%9A%129%9En%E7(%B8%0C%06%17M%89L%0D%1E%12D%81%A0TR%8F%84%82m%F2%18L%09WZ%B6%01%C3%14%BF%E0l%E1%19r%A4%D1%83%95%5B%8D%5E%81%0Bx4%23%14%B87%06%0D_%5B%19n%05d%02%0F%07_!%04%0D%1B%15%81%7B%19%01%0D%16%2C%03%83%15P%1D%96%12%11%00%3B";

		smileys = {
		  ">:)"      	: docs.smlEvil,
		  "]:)"         : docs.smlEvil,
		  ":-S"  		: docs.smlConfused,
		  ":S"  		: docs.smlConfused,	
		  "\\*ninja\\*" 	: docs.smlNinja,
		  "\\*glare\\*"		: docs.smlGlare,
		  "\\*angry\\*"		: docs.smlAngry,
		  ">:("  		: docs.smlAngry,		  
		  ":)"          : docs.smlHappy,
		  ":-)"         : docs.smlHappy,
		  ":("          : docs.smlFrown,
		  ":-("         : docs.smlFrown,
		  ":D"          : docs.smlGrin,
		  ":-D"         : docs.smlGrin,			  
		  ":|"          : docs.smlNtl,
		  ":P"          : docs.smlRazz,
		  ";)"          : docs.smlWink,
		  ";-)"         : docs.smlWink,
		  "rolls eyes"  : docs.smlRoll,
		  //":o"          : docs.smlShock,
		  "\\*gold star\\*" : docs.imgStar,
		  "gold star" 	: docs.imgStar		  
		};
		var regex = {};
		var endLine = {};
		var startLine='<img src ="';
		for (key in smileys) {
		  var regkey=key;
		  regkey = regkey.replace(/</g, "&lt;");
		  regkey = regkey.replace(/>/g, "&gt;");
		  regkey = regkey.replace(/\(/g, "\\(");
		  regkey = regkey.replace(/\)/g, "\\)");
		  regkey = regkey.replace(/\[/g, "\\[");
		  regkey = regkey.replace(/\]/g, "\\]");
		  regkey = regkey.replace(/\|/g, "\\|");
		  var fixkey=key.replace(/\\/g, '');
		  regex[key] = new RegExp(regkey, 'g');
		  endLine[key]='" align="baseline" alt="'+fixkey+'" title="'+fixkey+'" border="none"/>';
		  }
		textnodes = document.evaluate("//td[@class = 'bodytext']//text()",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i = 0; i < textnodes.snapshotLength; i++) {
		  node = textnodes.snapshotItem(i);
		  var o=node.nodeValue;
		  o = o.replace(/</g, "&lt;");
		  o = o.replace(/>/g, "&gt;");
		  var s=o;
		  for (key in smileys)s = s.replace(regex[key], startLine+smileys[key]+endLine[key]);
		  if(s.length>1 && s!=o) {
			var span = document.createElement("span");
			span.innerHTML=s;
			node.parentNode.replaceChild(span, node); 
		  }
		}

							
	}
	var hideDelMov={
			delRem:function(){
				GM_addStyle('.threadP0, .threadP1, .threadP2, .threadP3, .deleted{display:none;}');
			},
			mv:function(){
				GM_addStyle('.threadP0, .threadP1, .threadP2, .threadP3, .pointer{display:none;}');
			}				
	
	}

	function editInPlace(){

		if(docs.dUrl.match('forum-replies')){

			var ajaxloaderimgsrc = "data:image/gif;base64,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%3D%3D";

			var editLink = $(".bodypost a[href^='/forum-reply.cfm?e']");
			
			editLink.each(function(){
			
				if($(this).parent().next().text() != '(edit in place)'){
				
					$(this).parent().after('<div style="margin: 5px;"><a class="eip" href="#">(edit in place)</a></div>');
				
				}
				
			});
			
			$('.eip').live("click", function(){

				var clicker = $(this);

				if(clicker.text() == '(cancel edit)'){
				
					clicker.text('(edit in place)');
					
					$('#opInputs, #options, #savEdit, #eipTexta, #buttonsDiv').remove();
					
					docs.bt.html(docs.saveOriginalHTML);
					
					$('.meh, .mehbar').remove();

				}
				else{
					
					var btextHtml;
					docs.bt = clicker.parent().parent().prev();
					docs.saveOriginalHTML = docs.bt.html();
					clicker.text('(cancel edit)');

					var bth = docs.bt.height()-8;
					var btw = docs.bt.width()-25;		
					
					var loaderHeight = bth+5;
					var loaderWidth = btw+5;		
					
					var olt = '';
					var ult = '';
					docs.bt.children('*').each(function(){

						//should change this to regex some day
						
						var iGottaP = $(this);
						var tagN = iGottaP.attr('tagName');

						if(tagN == "HR"){
							iGottaP.remove();			
							(btextHtml)? btextHtml += '-----\n\n': btextHtml = '-----\n\n';
						
						}
						else if(tagN == "PRE"){
							var tPreRep = iGottaP.html().replace(RegExp('<br>', 'gim'), '</icanhazbreak>')
											.replace(RegExp('</?span>', 'gim'), '');	//WLR compatibility

							(btextHtml)? btextHtml += '$ '+tPreRep: btextHtml = '$ '+tPreRep;
						}		
						else if(tagN == "UL"){
							function ulLI(ut){
							
								ult += '*';
								var addspaceu = ult+' ';		
								ut.find('br').each(function(){
								
									$(this).after('<icanhazbreak>');
									$(this).remove();
					
								});						
								ut.children('li').each(function(){
								
									$(this).after(addspaceu+$(this).html());
									$(this).remove();
								
								});
								//$(this).after($(this).html());
								$(this).remove();

								//ut.after('<icanhazbreak>');
								//ut.remove();
								
							}
							ulLI(iGottaP);
							iGottaP.find('ul').each(function(){
							
								ulLI($(this));
							
							});
							var ulht = iGottaP.html().replace(RegExp('</?ul>', 'gi'), '');	

							(btextHtml)? btextHtml += ulht: btextHtml = ulht;
							//(btextHtml)? btextHtml += iGottaP.html(): btextHtml = iGottaP.html();				

						}	
						else if(tagN == "OL"){
							function olLI(ot){
							
								olt += '#';
								var addspaceo = olt+' ';		
								/*ot.find('br').each(function(){
								
									$(this).after('<icanhazbreak>');
									$(this).remove();
					
								});		*/				
								ot.children('li').each(function(){

									$(this).after(addspaceo+$(this).html());
									$(this).remove();
								
								});
								//ot.after('</icanhazbreak>');
								//ot.remove();
								
							}
							olLI(iGottaP);
							iGottaP.find('ol').each(function(){

								olLI($(this));
							
							});
							var olht = iGottaP.html().replace(RegExp('</?ol>', 'gim'), '');	

							(btextHtml)? btextHtml += olht: btextHtml = olht;			
							
						}					
						else if(tagN == "P"){
							iGottaP.find('embed').remove();
							iGottaP.find('br').each(function(){
							
								$(this).after('<icanhazbreak>');
								$(this).remove();
				
							});
							iGottaP.find('img').each(function(){
								var iThis = $(this);
								if(this.hasAttribute('title')){
									iThis.after(iThis.attr('title').replace("\\", ""));
								}
								var imgParent = iThis.parent();
								iThis.remove();
								if(imgParent.attr('tagName') == 'DIV'){
									imgParent.after(imgParent.html());
									imgParent.remove();
								}
							
							});
							if(iGottaP.attr('class') == 'reference'){

								var refF = iGottaP[0].getElementsByTagName('a')[0];
								var referenceNum = refF.getAttribute('onclick').split('(')[1].split(')')[0];
								iGottaP[0].innerHTML = '@'+referenceNum+' '+refF.textContent;

							}		
							if(iGottaP.attr('class') == 'wcauth'){
									var oldOne = iGottaP.children('a:first');
									var replyNum = oldOne.attr('onclick').split('(')[1].split(')')[0];
									oldOne.after('<wcauth>'+replyNum+oldOne.text()+'</wcauth>');
									oldOne.remove();
							   
							}					

							iGottaP.find('span').each(function(){
							
								var sThis = $(this);
							
								var spanClass = sThis.attr('class');
								
								if(!spanClass){  //WLR compatibility

									sThis.children( 'img' ).each(function(){
									
										$(this).after($(this).attr( 'alt' ).replace(/\\/gm,  ''));
										
										$(this).remove( );
										
									});

									sThis.after($(this).text());						
								}					
								else{
								
									sThis.after('<'+spanClass+'>'+sThis.text()+'</'+spanClass+'>');
									
								}
							
								sThis.remove();
							
							});
							iGottaP.find('a').each(function(){
							
								var aThis = $(this);

								var hr = aThis.attr('href');
								var tx = aThis.text();
								var aClass = aThis.attr('class');

								if(aClass == 'wiki'){

									aThis.after('[['+tx+']]');
									
								}
								else if( (aThis.attr('class') == 'internal') || (aThis.text().indexOf('http://')>-1)){

									aThis.after(hr);
									
								}
								else{
								
									aThis.after('<a href="'+hr+'">'+tx+'</a>');
								
								}

								aThis.remove();	

							});

							if(iGottaP.attr('class') != 'reference'){
							
								/*if(iGottaP.prev().attr('class') == 'reference'){
								
									iGottaP.append('<endparagraph>');													
								}
								else{*/
								
									iGottaP.prepend('<endparagraph>').append('<endparagraph>');							
								
								//}
							
							}
							
							(btextHtml)? btextHtml += iGottaP.html(): btextHtml = iGottaP.html();				
							
						}

						iGottaP.remove();
						

					});
					
					/*var myRe = /<br\/?>/gim;
					var str = btextHtml;
					var myArray;
					var breakIndexes = [];
					while ((myArray = myRe.exec(str)) != null){
					   
					   breakIndexes.push(Number(myRe.lastIndex-5));
					  
					}
					
					$(breakIndexes).each(function(){
					
						var breakMinusOneChar = btextHtml.slice(Number($(this)[0]), 5)
						btextHtml = btextHtml.replace(breakMinusOneChar, "\n\r")
					
					});*/
					
					//urge to kill rising
					btextHtml = btextHtml.replace(RegExp('</wcrep2>', 'gim'), "']")
					.replace(RegExp('<wcrep2>', 'gim'), "['")	
					.replace(RegExp('</wcrep1>', 'gim'), '"]')
					.replace(RegExp('<wcrep1>', 'gim'), '["')
					//.replace(RegExp('<hr/?>', 'gim'), '-----')
					.replace(RegExp('<endparagraph>', 'gim'), "")	
					.replace(RegExp('</endparagraph>', 'gim'), "\n")
					.replace(RegExp('<wbr/?>', 'gim'), '')
					.replace(RegExp('</wcauth>', 'gim'), "+]\n")
					.replace(RegExp('<wcauth>', 'gim'), "[+")	
					.replace(RegExp('<icanhazbreak>', 'gim'), "")		
					.replace(RegExp('</icanhazbreak>', 'gim'), "\n")
					//.replace(RegExp('</reference>', 'gim'), "")
					//.replace(RegExp('<reference>', 'gim'), "\n")
					.replace(RegExp('</wcsml>', 'gim'), ")]")
					.replace(RegExp('<wcsml>', 'gim'), "[(")
					.replace(RegExp('</wcspoil>', 'gim'), "_]")
					.replace(RegExp('<wcspoil>', 'gim'), "[_")			
					.replace(RegExp('</wcgrey>', 'gim'), "`]")
					.replace(RegExp('<wcgrey>', 'gim'), "[`")
					.replace(RegExp('</wcserif>', 'gim'), "~]")
					.replace(RegExp('<wcserif>', 'gim'), "[~")
					.replace(RegExp("<a class=\"wiki\" href=\"http://.*(whirlpool.*?wiki)", "gim"), '[[')
					.replace(RegExp("<a class=\"wiki\" href=\"http://.*(whirlpool.*?wiki) ", "gim"), ']]')		
					//.replace(RegExp("<br>", "gim"), "\r")
					//.replace(RegExp("<br/>", "gim"), "\r")
					.replace(RegExp("<tt>", "gim"), "[#")
					.replace(RegExp("</tt>", "gim"), "#]")
					.replace(RegExp("<b>", "gim"), "[*")
					.replace(RegExp("</b>", "gim"), "*]")
					.replace(RegExp("<i>", "gim"), "[/")
					.replace(RegExp("</i>", "gim"), "/]")
					.replace(RegExp("<sup>", "gim"), "[^")
					.replace(RegExp("</sup>", "gim"), "^]")
					.replace(RegExp("<sub>", "gim"), "[\\")
					.replace(RegExp("</sub>", "gim"), "\\]")
					.replace(RegExp("<strong>", "gim"), "[*")
					.replace(RegExp("</strong>", "gim"), "*]")		
					.replace(RegExp("<strike>", "gim"), "[-")
					.replace(RegExp("</strike>", "gim"), "-]");
					
					docs.bt.children().hide();

					docs.bt.append('<textarea id="eipTexta" class="ui-widget-content ui-resizable" style="background:#EEEEEE url(/img/forum/reply-eeeeee.gif) repeat-x scroll center bottom;'+
							'border:1px solid #BBBBBB;width:'+btw+'px;height:'+bth+'px;">'+btextHtml+'</textarea>'+
							'<div id="tresize" style="height:10px;width:10px;background-color:orange;float:right;cursor:se-resize;"></div>');
					
					var tArea = $('#eipTexta');
					var tRes = $('#tresize');


					var wcButtons = whirlC.buttons("buttonsDiv", tArea.width()+"px;background-color: #666666;position:absolute;z-index:6;", "wcodeButtons");
					docs.bt.prepend(wcButtons);
					var buttonDiv = $("#buttonsDiv");
					whirlC.buttonEvents("wcodeButtons", tArea, whirlC.code());
					GM_addStyle('.wcodeButtons{font-size:0.8em;}');		
					var dragger = $('<div style="background:#444 none repeat scroll 0%; height:20px; margin-bottom:10px;cursor:move;text-align:'+
								'center;font-size:13px;color:grey;line-height:18px;" class="jqHandle jqDrag">=== Drag Here ===</div>')
					buttonDiv.prepend(dragger);
					var butTop = Math.ceil(docs.bt.offset().top-(buttonDiv.height()*2)-20);

					buttonDiv[0].style.top = butTop+"px";					
					buttonDiv.jqDrag(dragger);
					tArea.jqResize(tRes);
					tArea.focus(function(){});
					clicker.parent().after('<div id="eipopInputs" style="position: absolute; display:none; margin:-163px 0 0 -125px;text-align: left; width: 150px; '+
											'background-color: orange; height: 180px;border:2px solid">'+
											'<p><input type="checkbox" checked="checked" style="cursor: pointer;" value="true" wc2="w" id="modewc" name="modewc"/>'+
											'<label style="cursor: pointer;font-size:10px;" for="modewc"> Use WhirlCode</label></p>'+
											'<p><input type="checkbox" checked="checked" style="cursor: pointer;" value="true" wc2="b" id="modeht" name="modeht"/>'+
											'<label style="cursor: pointer;font-size:10px;" for="modeht"> Allow HTML</label></p>'+
											'<p><input type="checkbox" checked="checked" style="cursor: pointer;" value="true" id="modest" wc2="e" name="modest"/>'+
											'<label style="cursor: pointer;font-size:10px;" for="modest"> Auto entities </label></p>'+
											'<p><input checked="checked" type="checkbox" style="cursor: pointer;" value="true" id="modewl" wc2="a" name="modewl"/>'+
											'<label style="cursor: pointer;font-size:10px;" for="modewl"> Make links clickable</label></p>'+
											'</div>'+
											'<button id="options" type="button">Options</button>'+
											'<input type="submit" value="Save Edit" style="" id="savEdit" name="post"/>');	

					$('#options').bind("mouseup", function() { 
					
						$('#eipopInputs').toggle();
					
					});

					function mUp(){
					
						if(!$('#loader')[0]){
					
							var textOptions = "&";
							var settingStr = "pfl";
						
							$('#eipopInputs :checkbox').each(function(i){

								var opThis = $(this);
							
								if($(this).attr('checked')){
								
									settingStr += ''+opThis.attr('wc2');

									textOptions+= ''+opThis.attr('name')+'=true&';
								
								}

							});		

							var textArtex = $('#eipTexta').val();	
							var saveBTH = docs.bt.html();					
							var forPostSuccess = textArtex;
							tArea.remove();
							tRes.remove();
							buttonDiv.remove();

							var previewStr = unsafeWindow.whirlcode2(forPostSuccess, settingStr);				
							
							if($('#loader')[0]){
					
									$('#loader').html('<img src="'+ajaxloaderimgsrc+'" style="relative: absolute; z-index: 5; top: 40%; left: 45%;"/>');
								
								}
							else{

									docs.bt.prepend('<div id="loader" style="position: relative; z-index: 5; background:#EEEEEE url(/img/forum/reply-eeeeee.gif) repeat-x scroll center bottom; height: '+
									loaderHeight+'px; width: '+loaderWidth+'px;"><img src="'+ajaxloaderimgsrc+'" style="position: absolute; z-index: 5; top: 40%; left: 45%;"/></div>');

								}
								
							}

							var currTime = time();
							$.ajax({
								type: "POST",
								url: clicker.parent().prev().children('a:last')[0].href,
								data: "version=2&post2=post&form=too+right&"+ 		
								"timestart=%7Bts+%27"+currTime+"%27%7D&"+
								"body="+encodeURIComponent(textArtex)+textOptions+
								"cliptemp=Paste+external+quotes+here",
								/*{version:'2',
										post2:'2',
										form:'too+right',
										timestart:'%7Bts+%27"+currTime+"%27%7D&',
										body:''+encodeURIComponent(textArtex)+textOptions+'',
										cliptemp:'Paste+external+quotes+here'								
								},		*/						
								/*beforeSend: function(){
									unsafeWindow.console.log("clicker.parent().prev().children('a:last')[0].href "+clicker.parent().prev().children('a:last')[0].href);
									unsafeWindow.console.log("version=2&post2=post&form=too+right&timestart=%7Bts+%27"+currTime+"%27%7D&body="+encodeURIComponent(textArtex)+textOptions+"cliptemp=Paste+external+quotes+here");
								},*/
								cache: false,
								success: function(msg){
									
									if( (msg.indexOf('Post edited.') > -1) || (msg.indexOf('You pressed submit more than once') > -1)){
										
										$('#savEdit, #options, #eipopInputs').remove();
										
										$('#loader').remove();
										
										docs.bt.children().show();
										
										clicker.text('(edit in place)');
				
										docs.bt.append(previewStr);
										
										$('.meh, .mehbar').remove();

									}
									else{
									
										$('#loader').html('<p>Server Timeout. Click the "Save Edit" button to try again.</p>');
									
									}
									
								},
								error: function(XMLHttpRequest, textStatus, errorThrown){

									clicker.remove();
									$('.meh, .mehbar, #loader, #savEdit, #options, #eipopInputs').remove();
									var runSrc = "data:image/gif;base64,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";
								
									docs.bt.html('<p><img src="'+runSrc+'" alt="runaway.gif" /></p><p>Something Broke!</p><p id="broked">'+
									'You should try editing your post again from the regular edit page. Click on the button below to show your edit.'+
									'<br /><br /><button id="copPost">Show Edit</button></p>');
									
									$('#copPost').one('mouseup', function(){

										docs.bt.html(saveBTH);
										$('#buttonsDiv').remove();
										$('#eipTexta').val(textArtex);

									});	
									
								}
							
							
						 });	
					
						return false; 

					}		
					
					tArea.live("keydown", function(event){
					
						if(event.ctrlKey==1 && event.keyCode==13 ){
						
							mUp();
							
						}
							
					});


					
					$('#savEdit').mouseup(function() { 
						
						mUp();
					
					});
					
					//quick-quote to inline edit
					if($('#eipTexta')[0]){

						$('.bodypost').each(function(){
						
							$(this).children('div:first').after('<a class="meh greylink" href="">eip-quote</a>');

						});

						$('.meh').bind("click", function(){
						
							var trParent = $(this).parent().parent();
						
							var pre = trParent.attr('id').split('r')[1];
							
							var uNam;
							
							$(trParent[0].getElementsByTagName('span')).each(function(){

								if($(this).attr('class') == 'bu_name'){

									uNam = $(this).text();

								}

							});
							var tSel = window.getSelection().toString().replace(/^(.+)$/mg, '["$1"]');
							
							if(tArea.val().length > 0){
							
								tArea.val(tArea.val()+'\n\n@'+pre+' '+uNam+' writes... \n'+tSel);
							
							}
							else{
							
								tArea.val(tArea.val()+'@'+pre+' '+uNam+' writes... \n'+tSel);
							
							}

							tArea[0].focus();		
							
							return false;

						});

					}		
						
				}

				return false; 
				
			});
		
		}
	}
	var googlePretty={
	
		gCode:function(){
	
			/******
				http://code.google.com/p/google-code-prettify/
			******/
		
			var j=null,n=true;window.PR_SHOULD_USE_CONTINUATION=n;window.PR_TAB_WIDTH=8;window.PR_normalizedHtml=window.PR=window.prettyPrintOne=window.prettyPrint=void 0;window._pr_isIE6=function(){var K=navigator&&navigator.userAgent&&/\bMSIE 6\./.test(navigator.userAgent);window._pr_isIE6=function(){return K};return K};
			var ba="a",ca="z",da="A",ea="Z",fa="!",ga="!=",ha="!==",ia="#",ja="%",ka="%=",x="&",la="&&",ma="&&=",na="&=",oa="(",pa="*",qa="*=",ra="+=",sa=",",ta="-=",ua="->",va="/",Da="/=",Ea=":",Fa="::",Ga=";",z="<",Ha="<<",Ia="<<=",Ja="<=",Ka="=",La="==",Ma="===",B=">",Na=">=",Oa=">>",Pa=">>=",Qa=">>>",Ra=">>>=",Sa="?",Ta="@",Ua="[",Va="^",Wa="^=",Xa="^^",Ya="^^=",Za="{",$a="|",ab="|=",bb="||",cb="||=",db="~",eb="break",fb="case",gb="continue",hb="delete",ib="do",jb="else",kb="finally",lb="instanceof",mb="return",
			nb="throw",ob="try",pb="typeof",qb="(?:(?:(?:^|[^0-9.])\\.{1,3})|(?:(?:^|[^\\+])\\+)|(?:(?:^|[^\\-])-)",rb="|\\b",sb="\\$1",tb="|^)\\s*$",ub="&amp;",vb="&lt;",wb="&gt;",xb="&quot;",yb="&#",zb="x",Ab="'",C='"',Bb=" ",Cb="XMP",Db="</",Eb='="',D="PRE",Fb='<!DOCTYPE foo PUBLIC "foo bar">\n<foo />',H="",Gb="\t",Hb="\n",Ib="nocode",Jb=' $1="$2$3$4"',I="pln",L="lang-",M="src",N="default-markup",O="default-code",P="com",Kb="dec",S="pun",Lb="lang-js",Mb="lang-css",T="tag",U="atv",Nb="<>/=",V="atn",Ob=" \t\r\n",
			W="str",Pb="'\"",Qb="'\"`",Rb="\"'",Sb=" \r\n",X="lit",Tb="123456789",Ub=".",Vb="kwd",Wb="typ",Xb="break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try alignof align_union asm axiom bool concept concept_map const_cast constexpr decltype dynamic_cast explicit export friend inline late_check mutable namespace nullptr reinterpret_cast static_assert static_cast template typeid typename typeof using virtual wchar_t where break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try boolean byte extends final finally implements import instanceof null native package strictfp super synchronized throws transient as base by checked decimal delegate descending event fixed foreach from group implicit in interface internal into is lock object out override orderby params readonly ref sbyte sealed stackalloc string select uint ulong unchecked unsafe ushort var break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try debugger eval export function get null set undefined var with Infinity NaN caller delete die do dump elsif eval exit foreach for goto if import last local my next no our print package redo require sub undef unless until use wantarray while BEGIN END break continue do else for if return while and as assert class def del elif except exec finally from global import in is lambda nonlocal not or pass print raise try with yield False True None break continue do else for if return while alias and begin case class def defined elsif end ensure false in module next nil not or redo rescue retry self super then true undef unless until when yield BEGIN END break continue do else for if return while case done elif esac eval fi function in local set then until ",
			Y="</span>",Yb='<span class="',Zb='">',$b="$1&nbsp;",ac="<br />",bc="console",cc="cannot override language handler %s",dc="htm",ec="html",fc="mxml",gc="xhtml",hc="xml",ic="xsl",jc="break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try alignof align_union asm axiom bool concept concept_map const_cast constexpr decltype dynamic_cast explicit export friend inline late_check mutable namespace nullptr reinterpret_cast static_assert static_cast template typeid typename typeof using virtual wchar_t where ",
			kc="c",lc="cc",mc="cpp",nc="cxx",oc="cyc",pc="m",qc="break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try boolean byte extends final finally implements import instanceof null native package strictfp super synchronized throws transient as base by checked decimal delegate descending event fixed foreach from group implicit in interface internal into is lock object out override orderby params readonly ref sbyte sealed stackalloc string select uint ulong unchecked unsafe ushort var ",
			rc="cs",sc="break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try boolean byte extends final finally implements import instanceof null native package strictfp super synchronized throws transient ",tc="java",uc="break continue do else for if return while case done elif esac eval fi function in local set then until ",
			vc="bsh",wc="csh",xc="sh",yc="break continue do else for if return while and as assert class def del elif except exec finally from global import in is lambda nonlocal not or pass print raise try with yield False True None ",zc="cv",Ac="py",Bc="caller delete die do dump elsif eval exit foreach for goto if import last local my next no our print package redo require sub undef unless until use wantarray while BEGIN END ",Cc="perl",Dc="pl",Ec="pm",Fc="break continue do else for if return while alias and begin case class def defined elsif end ensure false in module next nil not or redo rescue retry self super then true undef unless until when yield BEGIN END ",
			Gc="rb",Hc="break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try debugger eval export function get null set undefined var with Infinity NaN ",Ic="js",Jc="pre",Kc="code",Lc="xmp",Mc="prettyprint",Nc="class",Oc="br",Pc="\r\n";
			(function(){function K(b){b=b.split(/ /g);var a={};for(var d=b.length;--d>=0;){var c=b[d];if(c)a[c]=j}return a}function Qc(b){return b>=ba&&b<=ca||b>=da&&b<=ea}function Q(b,a,d,c){b.unshift(d,c||0);try{a.splice.apply(a,b)}finally{b.splice(0,2)}}var Rc=(function(){var b=[fa,ga,ha,ia,ja,ka,x,la,ma,na,oa,pa,qa,ra,sa,ta,ua,va,Da,Ea,Fa,Ga,z,Ha,Ia,Ja,Ka,La,Ma,B,Na,Oa,Pa,Qa,Ra,Sa,Ta,Ua,Va,Wa,Xa,Ya,Za,$a,ab,bb,cb,db,eb,fb,gb,hb,ib,jb,kb,lb,mb,nb,ob,pb],a=qb;for(var d=0;d<b.length;++d){var c=b[d];a+=Qc(c.charAt(0))?
			rb+c:$a+c.replace(/([^=<>:&])/g,sb)}a+=tb;return new RegExp(a)})(),wa=/&/g,xa=/</g,ya=/>/g,Sc=/\"/g;function Tc(b){return b.replace(wa,ub).replace(xa,vb).replace(ya,wb).replace(Sc,xb)}function Z(b){return b.replace(wa,ub).replace(xa,vb).replace(ya,wb)}var Uc=/&lt;/g,Vc=/&gt;/g,Wc=/&apos;/g,Xc=/&quot;/g,Yc=/&amp;/g,Zc=/&nbsp;/g;function $c(b){var a=b.indexOf(x);if(a<0)return b;for(--a;(a=b.indexOf(yb,a+1))>=0;){var d=b.indexOf(Ga,a);if(d>=0){var c=b.substring(a+3,d),g=10;if(c&&c.charAt(0)===zb){c=
			c.substring(1);g=16}var e=parseInt(c,g);isNaN(e)||(b=b.substring(0,a)+String.fromCharCode(e)+b.substring(d+1))}}return b.replace(Uc,z).replace(Vc,B).replace(Wc,Ab).replace(Xc,C).replace(Yc,x).replace(Zc,Bb)}function za(b){return Cb===b.tagName}function R(b,a){switch(b.nodeType){case 1:var d=b.tagName.toLowerCase();a.push(z,d);for(var c=0;c<b.attributes.length;++c){var g=b.attributes[c];if(!!g.specified){a.push(Bb);R(g,a)}}a.push(B);for(var e=b.firstChild;e;e=e.nextSibling)R(e,a);if(b.firstChild||
			!/^(?:br|link|img)$/.test(d))a.push(Db,d,B);break;case 2:a.push(b.name.toLowerCase(),Eb,Tc(b.value),C);break;case 3:case 4:a.push(Z(b.nodeValue));break}}var $=j;function ad(b){if(j===$){var a=document.createElement(D);a.appendChild(document.createTextNode(Fb));$=!/</.test(a.innerHTML)}if($){var d=b.innerHTML;if(za(b))d=Z(d);return d}var c=[];for(var g=b.firstChild;g;g=g.nextSibling)R(g,c);return c.join(H)}function bd(b){var a=0;return function(d){var c=j,g=0;for(var e=0,k=d.length;e<k;++e){var f=
			d.charAt(e);switch(f){case Gb:c||(c=[]);c.push(d.substring(g,e));var h=b-a%b;a+=h;for(;h>=0;h-="                ".length)c.push("                ".substring(0,h));g=e+1;break;case Hb:a=0;break;default:++a}}if(!c)return d;c.push(d.substring(g));return c.join(H)}}var cd=/(?:[^<]+|<!--[\s\S]*?--\>|<!\[CDATA\[([\s\S]*?)\]\]>|<\/?[a-zA-Z][^>]*>|<)/g,dd=/^<!--/,ed=/^<\[CDATA\[/,fd=/^<br\b/i,Aa=/^<(\/?)([a-zA-Z]+)/;function gd(b){var a=b.match(cd),d=[],c=0,g=[];if(a)for(var e=0,k=a.length;e<k;++e){var f=
			a[e];if(f.length>1&&f.charAt(0)===z){if(!dd.test(f))if(ed.test(f)){d.push(f.substring(9,f.length-3));c+=f.length-12}else if(fd.test(f)){d.push(Hb);++c}else if(f.indexOf(Ib)>=0&&hd(f)){var h=f.match(Aa)[2],q=1,i;a:for(i=e+1;i<k;++i){var o=a[i].match(Aa);if(o&&o[2]===h)if(o[1]===va){if(--q===0)break a}else++q}if(i<k){g.push(c,a.slice(e,i+1).join(H));e=i}else g.push(c,f)}else g.push(c,f)}else{var r=$c(f);d.push(r);c+=r.length}}return{source:d.join(H),tags:g}}function hd(b){return!!b.replace(/\s(\w+)\s*=\s*(?:\"([^\"]*)\"|'([^\']*)'|(\S+))/g,
			Jb).match(/[cC][lL][aA][sS][sS]=\"[^\"]*\bnocode\b/)}function aa(b,a,d,c){if(!!a){var g=d.call({},a);if(b)for(var e=g.length;(e-=2)>=0;)g[e]+=b;c.push.apply(c,g)}}function J(b,a){var d={};(function(){var k=b.concat(a);for(var f=k.length;--f>=0;){var h=k[f],q=h[3];if(q)for(var i=q.length;--i>=0;)d[q.charAt(i)]=h}})();var c=a.length,g=/\S/,e=function(k,f){f=f||0;var h=[f,I],q=H,i=0,o=k;while(o.length){var r,l=j,m,p=d[o.charAt(0)];if(p){m=o.match(p[1]);l=m[0];r=p[0]}else{for(var s=0;s<c;++s){p=a[s];
			var u=p[2];if(!(u&&!u.test(q))){if(m=o.match(p[1])){l=m[0];r=p[0];break}}}if(!l){r=I;l=o.substring(0,1)}}var t=L===r.substring(0,5);if(t&&!(m&&m[1])){t=false;r=M}if(t){var A=m[1],v=l.indexOf(A),E=v+A.length,F=r.substring(5);G.hasOwnProperty(F)||(F=/^\s*</.test(A)?N:O);aa(f+i,l.substring(0,v),e,h);aa(f+i+v,l.substring(v,E),G[F],h);aa(f+i+E,l.substring(E),e,h)}else h.push(f+i,r);i+=l.length;o=o.substring(l.length);if(r!==P&&g.test(l))q=l}return h};return e}var id=J([],[[I,/^[^<?]+/,j],[Kb,/^<!\w[^>]*(?:>|$)/,
			j],[P,/^<!--[\s\S]*?(?:--\>|$)/,j],[L,/^<\?([\s\S]+?)(?:\?>|$)/,j],[L,/^<%([\s\S]+?)(?:%>|$)/,j],[S,/^(?:<[%?]|[%?]>)/,j],[L,/^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i,j],[Lb,/^<script\b[^>]*>([\s\S]+?)<\/script\b[^>]*>/i,j],[Mb,/^<style\b[^>]*>([\s\S]+?)<\/style\b[^>]*>/i,j],[T,/^<\/?\w[^<>]*>/,j]]),jd=/^(<[^>]*>)([\s\S]*)(<\/[^>]*>)$/;function kd(b){var a=id(b);for(var d=0;d<a.length;d+=2)if(a[d+1]===M){var c,g;c=a[d];g=d+2<a.length?a[d+2]:b.length;var e=b.substring(c,g),k=e.match(jd);if(k)a.splice(d,
			2,c,T,c+k[1].length,M,c+k[1].length+(k[2]||H).length,T)}return a}var ld=J([[U,/^\'[^\']*(?:\'|$)/,j,Ab],[U,/^\"[^\"]*(?:\"|$)/,j,C],[S,/^[<>\/=]+/,j,Nb]],[[T,/^[\w:\-]+/,/^</],[U,/^[\w\-]+/,/^=/],[V,/^[\w:\-]+/,j],[I,/^\s+/,j,Ob]]);function md(b,a){for(var d=0;d<a.length;d+=2){var c=a[d+1];if(c===T){var g,e;g=a[d];e=d+2<a.length?a[d+2]:b.length;var k=b.substring(g,e),f=ld(k,g);Q(f,a,d,2);d+=f.length-2}}return a}function y(b){var a=[],d=[];if(b.tripleQuotedStrings)a.push([W,/^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/,
			j,Pb]);else b.multiLineStrings?a.push([W,/^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/,j,Qb]):a.push([W,/^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/,j,Rb]);d.push([I,/^(?:[^\'\"\`\/\#]+)/,j,Sb]);b.hashComments&&a.push([P,/^#[^\r\n]*/,j,ia]);if(b.cStyleComments){d.push([P,/^\/\/[^\r\n]*/,j]);d.push([P,/^\/\*[\s\S]*?(?:\*\/|$)/,j])}b.regexLiterals&&d.push([W,/^\/(?=[^\/*])(?:[^\/\x5B\x5C]|\x5C[\s\S]|\x5B(?:[^\x5C\x5D]|\x5C[\s\S])*(?:\x5D|$))+(?:\/|$)/,
			Rc]);var c=K(b.keywords),g=J(a,d),e=J([],[[I,/^\s+/,j,Sb],[I,/^[a-z_$@][a-z_$@0-9]*/i,j],[X,/^0x[a-f0-9]+[a-z]/i,j],[X,/^(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d+)(?:e[+\-]?\d+)?[a-z]*/i,j,Tb],[S,/^[^\s\w\.$@]+/,j]]);function k(f,h){for(var q=0;q<h.length;q+=2){var i=h[q+1];if(i===I){var o,r,l,m;o=h[q];r=q+2<h.length?h[q+2]:f.length;l=f.substring(o,r);m=e(l,o);for(var p=0,s=m.length;p<s;p+=2){var u=m[p+1];if(u===I){var t=m[p],A=p+2<s?m[p+2]:l.length,v=f.substring(t,A);if(v===Ub)m[p+1]=S;else if(v in c)m[p+
			1]=Vb;else if(/^@?[A-Z][A-Z$]*[a-z][A-Za-z$]*$/.test(v))m[p+1]=v.charAt(0)===Ta?X:Wb}}Q(m,h,q,2);q+=m.length-2}}return h}return function(f){var h=g(f);return h=k(f,h)}}var Ba=y({keywords:Xb,hashComments:n,cStyleComments:n,multiLineStrings:n,regexLiterals:n});function nd(b,a){var d=false;for(var c=0;c<a.length;c+=2){var g=a[c+1],e,k;if(g===V){e=a[c];k=c+2<a.length?a[c+2]:b.length;d=/^on|^style$/i.test(b.substring(e,k))}else if(g===U){if(d){e=a[c];k=c+2<a.length?a[c+2]:b.length;var f=b.substring(e,
			k),h=f.length,q=h>=2&&/^[\"\']/.test(f)&&f.charAt(0)===f.charAt(h-1),i,o,r;if(q){o=e+1;r=k-1;i=f}else{o=e+1;r=k-1;i=f.substring(1,f.length-1)}var l=Ba(i);for(var m=0,p=l.length;m<p;m+=2)l[m]+=o;if(q){l.push(r,U);Q(l,a,c+2,0)}else Q(l,a,c,2)}d=false}}return a}function od(b){var a=kd(b);a=md(b,a);return a=nd(b,a)}function pd(b,a,d){var c=[],g=0,e=j,k=j,f=0,h=0,q=bd(window.PR_TAB_WIDTH),i=/([\r\n ]) /g,o=/(^| ) /gm,r=/\r\n?|\n/g,l=/[ \r\n]$/,m=n;function p(u){if(u>g){if(e&&e!==k){c.push(Y);e=j}if(!e&&
			k){e=k;c.push(Yb,e,Zb)}var t=Z(q(b.substring(g,u))).replace(m?o:i,$b);m=l.test(t);c.push(t.replace(r,ac));g=u}}while(n){var s;if(s=f<a.length?h<d.length?a[f]<=d[h]:n:false){p(a[f]);if(e){c.push(Y);e=j}c.push(a[f+1]);f+=2}else if(h<d.length){p(d[h]);k=d[h+1];h+=2}else break}p(b.length);e&&c.push(Y);return c.join(H)}var G={};function w(b,a){for(var d=a.length;--d>=0;){var c=a[d];if(G.hasOwnProperty(c))bc in window&&console.log(cc,c);else G[c]=b}}w(Ba,[O]);w(od,[N,dc,ec,fc,gc,hc,ic]);w(y({keywords:jc,
			hashComments:n,cStyleComments:n}),[kc,lc,mc,nc,oc,pc]);w(y({keywords:qc,hashComments:n,cStyleComments:n}),[rc]);w(y({keywords:sc,cStyleComments:n}),[tc]);w(y({keywords:uc,hashComments:n,multiLineStrings:n}),[vc,wc,xc]);w(y({keywords:yc,hashComments:n,multiLineStrings:n,tripleQuotedStrings:n}),[zc,Ac]);w(y({keywords:Bc,hashComments:n,multiLineStrings:n,regexLiterals:n}),[Cc,Dc,Ec]);w(y({keywords:Fc,hashComments:n,multiLineStrings:n,regexLiterals:n}),[Gc]);w(y({keywords:Hc,cStyleComments:n,regexLiterals:n}),
			[Ic]);function Ca(b,a){try{var d=gd(b),c=d.source,g=d.tags;G.hasOwnProperty(a)||(a=/^\s*</.test(c)?N:O);var e=G[a].call({},c);return pd(c,g,e)}catch(k){if(bc in window){console.log(k);console.a()}return b}}function qd(b){var a=window._pr_isIE6(),d=[document.getElementsByTagName(Jc),document.getElementsByTagName(Kc),document.getElementsByTagName(Lc)],c=[];for(var g=0;g<d.length;++g)for(var e=0,k=d[g].length;e<k;++e)c.push(d[g][e]);var f=0;function h(){var q=window.PR_SHOULD_USE_CONTINUATION?(new Date).getTime()+
			250:Infinity;for(;f<c.length&&(new Date).getTime()<q;f++){var i=c[f];if(i.className&&i.className.indexOf(Mc)>=0){var o=i.className.match(/\blang-(\w+)\b/);if(o)o=o[1];var r=false;for(var l=i.parentNode;l;l=l.parentNode)if((l.tagName===Jc||l.tagName===Kc||l.tagName===Lc)&&l.className&&l.className.indexOf(Mc)>=0){r=n;break}if(!r){var m=ad(i);m=m.replace(/(?:\r\n?|\n)$/,H);var p=Ca(m,o);if(za(i)){var s=document.createElement(D);for(var u=0;u<i.attributes.length;++u){var t=i.attributes[u];if(t.specified){var A=
			t.name.toLowerCase();if(A===Nc)s.className=t.value;else s.setAttribute(t.name,t.value)}}s.innerHTML=p;i.parentNode.replaceChild(s,i);i=s}else i.innerHTML=p;if(a&&i.tagName===D){var v=i.getElementsByTagName(Oc);for(var E=v.length;--E>=0;){var F=v[E];F.parentNode.replaceChild(document.createTextNode(Pc),F)}}}}}if(f<c.length)setTimeout(h,250);else b&&b()}h()}window.PR_normalizedHtml=R;window.prettyPrintOne=Ca;window.prettyPrint=qd;window.PR={createSimpleLexer:J,registerLangHandler:w,sourceDecorator:y,
			PR_ATTRIB_NAME:V,PR_ATTRIB_VALUE:U,PR_COMMENT:P,PR_DECLARATION:Kb,PR_KEYWORD:Vb,PR_LITERAL:X,PR_NOCODE:Ib,PR_PLAIN:I,PR_PUNCTUATION:S,PR_SOURCE:M,PR_STRING:W,PR_TAG:T,PR_TYPE:Wb}})();
	
			GM_addStyle('.str { color: #080; }.kwd { color: #008; }.com { color: #800; }.typ { color: #606; }.lit { color: #066; }.pun { color: #660; }.pln { color: #000; }.tag { color: #008; }.atn { color: #606; }.atv { color: #080; }.dec { color: #606; }pre.prettyprint { padding: 2px; border: 1px solid #888; }');
			prettyPrint();
		},
		addPrett:function(gThis){
			if(!gThis.find('a[href*="/forum-reply.cfm?e="]')[0]){ //make sure don't prettify possible edit-in-place posts
				gThis.find('pre').addClass("prettyprint");
			}
		}

	}

	function extraThreadLinks(){
	
		var wBP = $('#watch_button').parent();
		var futSub = $('.foot_subs:first');
		var repl = $('#replies');
		if(docs.threadArchiveView=='true'){
			wBP.append('<a class="bwatch" href="http://forums.whirlpool.net.au/forum-replies-archive.cfm/'+docs.threadNumber+'.html">Thread Archive</a>');
			futSub.append('&nbsp;&nbsp;<a href="http://forums.whirlpool.net.au/forum-replies-archive.cfm/'+docs.threadNumber+'.html">Thread Archive</a>');
			if(repl[0].style.marginTop!=='10px'){
				repl.attr('style','margin-Top:10px');
			}
			
		}
		if(docs.threadPrintView=='true'){
			wBP.append('<a class="bwatch" href="http://forums.whirlpool.net.au/forum-replies-print.cfm?t='+docs.threadNumber+'">Print View</a>');
			futSub.append('&nbsp;&nbsp;<a href="http://forums.whirlpool.net.au/forum-replies-print.cfm?t='+docs.threadNumber+'">Print View</a>');
			if(repl[0].style.marginTop!=='10px'){
				repl.attr('style','margin-Top:10px');
			}						
		}		
		if(docs.moderatorPostView=='true'){
			wBP.append('<a class="bwatch" href="http://forums.whirlpool.net.au/forum-replies.cfm?um=1&amp;t='+docs.threadNumber+'">Mod Posts</a>');
			futSub.append('&nbsp;&nbsp;<a href="http://forums.whirlpool.net.au/forum-replies.cfm?um=1&amp;t='+docs.threadNumber+'">View moderator posts</a>');
			if(repl[0].style.marginTop!=='10px'){
				repl.attr('style','margin-Top:10px');
			}						
		}		
		if(docs.representativePostView=='true'){
			wBP.append('<a class="bwatch" href="http://forums.whirlpool.net.au/forum-replies.cfm?ur=1&amp;t='+docs.threadNumber+'">Rep Posts</a>');
			futSub.append('&nbsp;&nbsp;<a href="http://forums.whirlpool.net.au/forum-replies.cfm?ur=1&amp;t='+docs.threadNumber+'">View representative posts</a>');
			if(repl[0].style.marginTop!=='10px'){
				repl.attr('style','margin-Top:10px');
			}						
		}		
	
	}
	function whimSize(){
	
		if(!docs.q){
			docs.q=$('#body');
		}
		docs.q.css('width','auto').attr('rows', docs.whIMMessageTextAreaRows).attr('cols', docs.whIMMessageTextAreaCols);
	
	}
	function loadTheme(){
		if(docs.customWPTheme!=='default'){
			GM_addStyle(docs.customWPTheme);
		}
	}
	function plusLogo(){
  		
		var logPl='data:image/png;base64,'+
			'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';
		GM_addStyle('#logo H1 A {background:transparent url("'+logPl+'") no-repeat bottom right;}'+
		'#footer DL.copyright DT.whirlpool A:before {position:absolute;display:block;height:150px;content:url('+logPl+');padding:110px 0 0 110px;}');
			
	}
	function whimAlertNotice(){
	
		if($('#menu_whim')[0]){
			$('body').prepend('<div id="whimA"><a href="//whirlpool.net.au/whim/"><span>New messages</span></a></div>');
			GM_addStyle('#whimA {'+
				'z-index:50;'+
				'width:100%;'+
				'height:40px;'+
				'position:fixed;'+
				'color:white;'+
				'text-align:center;'+
				'background-color:orange;'+
				'font-family:Georgia,Cambria,Charter,serif;'+
				'font-size:1.63em;'+
				'font-size-adjust:none;'+
				'font-style:normal;'+
				'font-variant:normal;'+
				'font-weight:normal;'+
				'letter-spacing:-0.01em;'+
				'line-height:normal;'+
				'text-decoration:none;}'+
				'#whimA a{color:white;'+
				'}');
		}		
	
	}
	function openwatchedThreadsInTabs(){

		$('a[href="/forum/?action=watched&showall=1"]').before('<a href="#" id="openInTabs">open in tabs</a>&nbsp;&nbsp;|&nbsp;&nbsp;');
		$('#openInTabs').click(function(){
			var readAs = $('.reads a');
			if(readAs.length){
				readAs.each(function(){

					GM_openInTab(this.href);

				});	
			}
			return false;
		});
	
	}
	function deletedThreadsCacheLink(){
	
		var h = document.createElement('h2');
		var gCache = document.createElement('a');
		gCache.textContent='Try Google Cache';
		var deletedThreadNumber = docs.dUrl.split('t=')[1].split('&')[0];
		gCache.href='http://209.85.173.132/search?q=cache:forums.whirlpool.net.au/forum-replies-archive.cfm/'+deletedThreadNumber+'.html';
		h.appendChild(gCache);
		var before = document.getElementsByTagName('h2')[1];
		before.parentNode.insertBefore(h, before)

	}

	function userpageInfoToggle(){
	
		var h2s = $('#userprofile h2:lt(2)');
		h2s.css('cursor','pointer').next().toggle();
		h2s.click(function(){
			$(this).next().toggle();
		});		
	
	}

	function userpageDays(){

		if(!docs.dUrl.match('days') && !docs.dUrl.match('online') && (!unsafeWindow.sessionStorage.userpageDaysRedirectedWindowHistoryLength 
										|| window.history.length != unsafeWindow.sessionStorage.userpageDaysRedirectedWindowHistoryLength) ){
		
			var userNumber = docs.dUrl.split('/user/')[1].split('?')[0];
			docs.d.location='http://forums.whirlpool.net.au/forum-user.cfm?id='+userNumber+'&days='+docs.recentActivityDays;	

		}
		else if(docs.dUrl.indexOf('?days='+docs.recentActivityDays)>-1){
			unsafeWindow.sessionStorage.userpageDaysRedirectedWindowHistoryLength = window.history.length;
	
		}
	
	}	
	/********
		stuff that runs on every page ('cept for the first if() - no point running everything below on an alert page )
	********/		
	setGM();
	if(docs.dUrl.indexOf('forum-alert.cfm?a=priv-deleted')>-1){
		deletedThreadsCacheLink();
	}
	else{
		wlrSettings.set();	
		loadTheme();
		if(docs.WLRfirstRun==='true'){
			wlrSettings.firstRun();
		}	
		if(docs.yourLinks==='true'){
			wlrSettings.yourLinks();
		}
		if(docs.autoUpdateWPplus!=='disable' && !window.google){
			autoUpdate.regularUpdateCheck();
		}	
		if(docs.whirlpoolPlusLogo==='true'){
			plusLogo();
		}
		if(docs.whirlpoolSidemenuFont!=="default font"){
			$('#menu').css('font-family', docs.whirlpoolSidemenuFont+' !important');
		}
		if(docs.whirlpoolBreadcrumbFont!=="default font"){
			$('#breadcrumb').css('font-family', docs.whirlpoolBreadcrumbFont+' !important');
		}
		if(docs.dynamicMenuSystem=='spinner'){
			wlrMenu.spinnerMen();
		}
		else if(docs.dynamicMenuSystem=='rightClick'){
			wlrMenu.rightClickMen();
		}
		if(docs.showWhirlpoolFooterLinks==="false"){
			$('#footer').hide();
		}	
		if(docs.enableWideWhirlpool==="true"){
			GM_addStyle('#root, #footer {width: 100% !important;max-width: none !important;}'
				+'#content > span.shim2 {display: none !important;}'); 
		}	
		if(docs.penaltyBoxBackground==="true"){
			var b=[
				"data:image/png;base64,",
				"iVBORw0KGgoAAAANSUhEUgAAABQAAAABCAYAAADeko4lAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9gE",
				"FgoSD1eXcvUAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAO0lEQVQI1wXBsQGAIAwAsBSXwn3+fwZ0kZoE3gjV7YSo1mcYdd3iOXy1rNr2sda0",
				"dyIxGcnNCLNbCvMHhQEYTyMYKXEAAAAASUVORK5CYII="
			].join('');	
			GM_addStyle('tr.In_the_penalty_box > td.bodyuser {background-image:url('+b+')!important;background-repeat:repeat !important;');
		}
		if(docs.whimAlertNotice==="true"){
			whimAlertNotice();
		}

	}
	
	/********
		stuff that runs on certain pages
	********/	
	var fSecText = docs.dUrl.match('whirlpool.net.au/forum/');

	if(docs.noGluteusMaximus==='true' && (docs.dUrl=='http://forums.whirlpool.net.au/' || 
					      docs.dUrl=='http://forums.whirlpool.net.au/index.cfm' || docs.dUrl=='http://forums.whirlpool.net.au/forum/')){

		noBottom();
	}		
	if(docs.dUrl.match('forum-replies')){
	
		docs.repliesTR=$('#replies tr[id^="r"]:not([id^="review"])');
		docs.repliesA=docs.repliesTR.find('a[title="a link to this specific post"]');	
		if(docs.dUrl.match('t=')){
			docs.threadNumber= docs.dUrl.split('t=')[1].split('&')[0].split('#')[0];
		}
		else{
			docs.threadNumber= docs.repliesA[0].href.split('t=')[1].split('&')[0].split('#')[0];
		}		

		if(docs.lastReadTracker==='true'){
			tracker.forumReplies();
		}
		if(docs.quickReplybox=== 'true'){
			quickQuote();
		}
		if(docs.smilies=== 'true'){
			smileys();
		}
		if(docs.editInPlace=== 'true'){
			editInPlace();
		}
		/********
			all use the same loop
		********/		
		docs.repliesTR.each(function(i){

			var tdThis = $(this).children('td:eq(1)');
		
			if(docs.inlineVideos==='true'){
			
				imVidImg.imVidImgGrabAs=tdThis.find('a');
				imVidImg.imVidImgGrabAs.each(function(){
				
					imVidImg.inlineVideos(this.href, $(this));

				});
			
			}
			if(docs.inlineImages==='true'){
			
				if(!imVidImg.imVidImgGrabAs){
					imVidImg.imVidImgGrabAs=tdThis.find('a');
				}
				imVidImg.imVidImgGrabAs.each(function(){

					imVidImg.inlineImages(this.href, $(this), tdThis);	
				
				});				
			
			}
			imVidImg.imVidImgGrabAs=null;
			if(docs.staticAvatars=== 'true'){
				avatar($(this));
			}		
			if(docs.ignoreUser=== 'true'){
				userIgnore($(this), i);
			}		
			if(docs.userNotes=== 'true'){
				userNotes($(this), i);
			}
			if(docs.prettifyCode=== 'true'){
				googlePretty.addPrett($(this));
				if(i==(docs.repliesTR.length-1)){
					googlePretty.gCode();
				}
			}
		
		});		
		/********
			put the setting checks for extraThreadLinks in the function cause it's more efficient 
		********/		
		extraThreadLinks();
	
	}
	else if(fSecText && docs.dUrl.split(fSecText[0])[1].length){
		if(docs.lastReadTracker==='true'){
			tracker.threadsAndUserPage('threads');
		}	
		if (docs.hideDRThreads=== 'true') {
			hideDelMov.delRem();
		}
		if (docs.hideMVThreads=== 'true') {
			hideDelMov.mv();
		}
	}	
	else if(docs.dUrl.indexOf('/user/')>-1){	
		if(docs.recentActivityDays!='7'){
			userpageDays();
		}
		if(docs.lastReadTracker==='true'){
			tracker.threadsAndUserPage('user');
		}	
		if(docs.whirlcodeinWikiWhimNewThread==='true'){
			wcWikiWhimNewThread.uPageWhim();	
		}
		whimSize();
		if(docs.userpageInfoToggle==='true'){
			userpageInfoToggle();
		}
		
	}
	if(docs.dUrl.indexOf('whirlpool.net.au/whim/?action=read')>-1){
		if(docs.staticAvatars=== 'true'){
			avatar($('tr:first'));
		}	
	}

	/********
		switched it around for the rest of docs.whirlcodeinWikiWhimNewThread check cause it's more 
		efficient than re-checking if(docs.whirlcodeinWikiWhimNewThread==='true') for each new url
	********/
	if(docs.whirlcodeinWikiWhimNewThread==='true'){ 
		if(docs.dUrl.indexOf('whirlpool.net.au/whim/?action=write')>-1){
			wcWikiWhimNewThread.whimReply();
		}
		else if(docs.dUrl.indexOf('whirlpool.net.au/wiki/?action=edit&tag=')>-1){	
			wcWikiWhimNewThread.wikiNewThread('#f_body');
		}
		else if(docs.dUrl.indexOf('forum-reply.cfm?f=')>-1){
			wcWikiWhimNewThread.wikiNewThread('#body');
		}	
		else if(docs.dUrl.indexOf('forum-reply.cfm?r=')>-1){
			wcWikiWhimNewThread.wikiNewThread('#body');
		}	
		else if(docs.dUrl.indexOf('forum-reply.cfm?e=')>-1){
			wcWikiWhimNewThread.wikiNewThread('#body');
		}		
	}
	if(docs.dUrl==='http://forums.whirlpool.net.au/forum/?action=watched'){
		openwatchedThreadsInTabs();
	}

}
catch(er){
	/*unsafeWindow.console.log(er.name+' : '+
	er.message+'\r'+
	er.fileName+'\r'+
	er.constructor+'\r'+
	er.toSource()+'\r'+
	er.toString()+'\r'+
	er.valueOf()+'\r'+
	+'er.stack ===>  '+er.stack+'\r\n'
	);*/
	var em = '\n'+er.name+' : '+er.message+'\r\n';
	//var em = er.stack;
	//unsafeWindow.console.log(erTa);	
	if(runErrorReport == 'true'){
		erTa.value=em.toString();  //dunno why but it didn't work without forcing it to a string even though it sould already be a string. Loose-type FTL!
	}
}