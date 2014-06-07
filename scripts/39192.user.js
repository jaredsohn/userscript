// ==UserScript==
// @name           Whirlpool quick quote for chrome
// @namespace      userscripts.org
// @version	0.2
// @description    Whirlpool quick quote for chrome
// ==/UserScript==

(function(){

	if(document.URL.match('forums.whirlpool.net.au/forum-replies.cfm')){

		function _GM_setValue(sN, sV){
			
			document.cookie = sN+'='+sV+';path=/;domain=whirlpool.net.au;expires=Fri, 17 Dec 2009 10:00:00 GMT';
			
		}
		function _GM_getValue(gV){
			
			var dc = document.cookie;
			
			gV+='=' //err yeah
			
			if(!dc.match(gV)){
			
				return undefined;
				
			}
			else{

				return dc.split(gV)[1].split(';')[0];
			}
			
		}
		
		var hideAjaxPreview = false;

		var gottaPee, qqtArea, pReply = $('.foot_reply a');

		if(pReply[0]){

			$.get(pReply[0].href, function(data){

				gottaPee = data.split('name="tinkle" value="')[1].split('">')[0];
			
			});
			
			var xDate = new Date();	

			var gF = xDate.getFullYear();
			var gM = xDate.getMonth()+1;
			//Stupid daylight savings
			var getTtex = $('.nav_item_time').text();
			var getHr = getTtex.slice(getTtex.indexOf(':')-2, getTtex.indexOf(':'));

			var dArr = [''+gM+'', ''+xDate.getDate()+'', ''+xDate.getMinutes()+'', ''+xDate.getSeconds()+''];

			for(var i=0;i<dArr.length;i++){

				if(dArr[i].length == 1){

					dArr[i] = '0'+dArr[i];

				}

			}

			var currTime = gF+"-"+dArr[0]+"-"+dArr[1]+"+"+getHr+"%3A"+dArr[2]+"%3A"+dArr[3];	

			var theLastOfTheMohicanTableRows = $('#replies>table>tbody>tr:last');
			
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
							qqtArea.css('background','#E5E5E5 none no-repeat scroll 50% 50%');

						}
						else{
						
							var dloc = document.location;
							var dloch = dloc.href;
						
							if(lastP.attr('checked') && dloch.indexOf("&p=-1#bottom")<0){

								dloc = "http://forums.whirlpool.net.au/forum-replies.cfm?t="+dloch.split('t=')[1].split('&')[0]+"&p=-1#bottom";
							
							}
							else{
						
								qqtArea.css('background','#E5E5E5 none no-repeat scroll 50% 50%').val('');
							
								var removeS = msg.slice(msg.lastIndexOf('<tr id="'));
							
								$('#previewTR').remove();	

								theLastOfTheMohicanTableRows.after(removeS.split('</tr>')[0]+'</tr>');
							
							}

						}

					},
					error: function(XMLHttpRequest, textStatus, errorThrown){

						alert('something broke!  ==>'+XMLHttpRequest+textStatus+errorThrown);		

						
					}


				});	

			}
			
		var gM_addStyle = document.createElement('style');
		gM_addStyle.type="text/css";
		gM_addStyle.innerText='#qQuote{margin-top:20px;} #qqTextArea{background:#E5E5E5 none no-repeat scroll 50% 50%;border:1px solid gray;color:black;}'+
						'#qqpost{width: 150px; font-family: Arial; font-style: normal; font-variant: normal; font-weight: normal; font-size: 16px; '+
						'line-height: normal; font-size-adjust: none; font-stretch: normal; -x-system-font: none;} '+
						'#qqpostclear{width: 150px; font-family: Arial; font-style: normal; font-variant: normal; font-weight: normal; font-size: 16px; '+
						'line-height: normal; font-size-adjust: none; font-stretch: normal; -x-system-font: none;} '+				
						'#opInputs p{float:left;margin-left:5px;}'+
						'#qqWCPreview{border:solid 1px grey;cursor:default;float:left;height:18px;margin-right:-80px;padding:2px;width:80px;} '+
						'#qqPreview{display:none;text-align:left;padding:5px;background:#EEEEEE url(http://forums.whirlpool.net.au/img/forum/reply-eeeeee.gif) '+
						'repeat-x scroll center bottom;border:2px solid grey;margin-bottom:10px;width:60%;} '+
						'#qqTooManyWords{display:none;background-color:#E8B760;height:250px;position:absolute;width:100%;font-weight:bold;z-index:6;} '+
						'#aloader{display:none;}.qqwcodeButtons{font-size:0.9em;}';
		document.getElementsByTagName('head')[0].appendChild(gM_addStyle);
		
			/*******whirlcode********/

			var whirlCode = { 	                
								qqqqwc_whirlBold :			{ encloseLeft : "[*", encloseRight  : "*]"},
								qqwc_whirlItalic :		{ encloseLeft : "[/", encloseRight  : "/]"},
								qqwc_whirlSingleQuote :	{ encloseLeft : "['", encloseRight  : "']"},
								qqwc_whirlDoubleQuote :	{ encloseLeft : "[\"", encloseRight  : "\"]"},
								qqwc_whirlQuote :			{ encloseLeft : "[+", encloseRight  : "+]"},
								qqwc_whirlSuperscript :	{ encloseLeft : "[^", encloseRight  : "^]"},
								qqwc_whirlSubscript :		{ encloseLeft : "[\\", encloseRight  : "\\]"},
								qqwc_whirlStrike :		{ encloseLeft : "[-", encloseRight  : "-]"},
								qqwc_whirlCourier :		{ encloseLeft : "[#", encloseRight  : "#]"},
								qqwc_whirlSmall :			{ encloseLeft : "[(", encloseRight  : ")]"},
								qqwc_whirlGrey :			{ encloseLeft : "[`", encloseRight  : "`]"},
								qqwc_whirlSerif :			{ encloseLeft : "[~", encloseRight  : "~]"},
								qqwc_whirlGoogle :		{ encloseLeft : "[?", encloseRight  : "?]"},
								qqwc_whirlEscape :		{ encloseLeft : "[.", encloseRight  : ".]"},
								qqwc_whirlWiki :			{ encloseLeft : "[[", encloseRight  : "]]"},
								qqwc_whirlSpoil :			{ encloseLeft : "[_", encloseRight  : "_]"}
						   }; 

			/********whirlcode buttons*********/

			var wcButtons = '<div id="qqbuttonsDiv" style="text-align:center;padding-bottom:10px;">' +
						'<button type="button" class="qqwcodeButtons" title="Bold WhirlCode" accesskey="b" id="qqqqwc_whirlBold" >Bold</button>' +
						'<button type="button" class="qqwcodeButtons" title="Italic WhirlCode" accesskey="i" id="qqwc_whirlItalic" >Italic</button>' +
						'<button type="button" class="qqwcodeButtons" title="SingleQuote WhirlCode" accesskey="t" id="qqwc_whirlSingleQuote" >\'quote\'</button>' +
						'<button type="button" class="qqwcodeButtons" title="DoubleQuote WhirlCode" accesskey="q" id="qqwc_whirlDoubleQuote" >"quote"</button>' +
						'<button type="button" class="qqwcodeButtons" title="Quote WhirlCode" accesskey="h" id="qqwc_whirlQuote" >who</button>' +
						'<button type="button" class="qqwcodeButtons" title="Superscript WhirlCode" accesskey="p" id="qqwc_whirlSuperscript" >Super</button>' +
						'<button type="button" class="qqwcodeButtons" title="Subscript WhirlCode" accesskey="\\" id="qqwc_whirlSubscript" >Sub</button>' +
						'<button type="button" class="qqwcodeButtons" title="Strike WhirlCode" accesskey="k" id="qqwc_whirlStrike" >Strike</button>' +
						'<button type="button" class="qqwcodeButtons" title="Courier WhirlCode" accesskey="c" id="qqwc_whirlCourier" >Courier</button>' +
						'<button type="button" class="qqwcodeButtons" title="Small WhirlCode" accesskey="m" id="qqwc_whirlSmall" >Small</button>' +
						'<button type="button" class="qqwcodeButtons" title="Grey WhirlCode" accesskey="r" id="qqwc_whirlGrey" >Grey</button>' +
						'<button type="button" class="qqwcodeButtons" title="Serif WhirlCode" accesskey="s" id="qqwc_whirlSerif" >Serif</button>' +
						'<button type="button" class="qqwcodeButtons" title="Google WhirlCode" accesskey="g" id="qqwc_whirlGoogle" >Google</button>' +
						'<button type="button" class="qqwcodeButtons" title="Escape WhirlCode" accesskey="e" id="qqwc_whirlEscape" >Esc</button>' +
						'<button type="button" class="qqwcodeButtons" title="Wiki WhirlCode" accesskey="w" id="qqwc_whirlWiki" >Wiki</button>' +
						'<button type="button" class="qqwcodeButtons" title="Spoiler WhirlCode" accesskey="o" id="qqwc_whirlSpoil" >Spoiler</button>' +
						'<button type="button" class="qqwcodeButtons" title="URL Link" accesskey="u" id="qqwc_whirlurl" >URL</button>' +
						'<button type="button" class="qqwcodeButtons" title="Link" accesskey="l" id="qqwc_whirllink" >Link</button>' +
						'</div>';
						
			$('#replies').append('<div id="qQuote" align="center">'+wcButtons+'<div id="qqPreview"></div><div id="qqTooManyWords">'+
									'<p style="margin:0 auto;margin-top:10px;">ZOMG! You are quoting significantly more words than you have written.<br /><br />'+
									'<img src="http://i27.tinypic.com/142zdi8.jpg" /></p><button type="button" id="wordsOK">OK</button>'+
									'</div><textarea id="qqTextArea" cols="100" rows="10"></textarea><br />'+
									'<button type="button" style="" id="qqpostclear" name="qqpost">Clear</button><button type="button" style="" id="qqpost" name="qqpost">Post Reply</button>'+
									'<img src="http://i28.tinypic.com/jzbn0n.gif" id="aloader" />'+
									'<div id="opInputs" style="height:30px;width:600px;">'+
										'<p><input type="checkbox" checked="checked" style="cursor: pointer;" value="true" wc2="w" id="modewc" name="modewc"/>'+
										'<label style="cursor: pointer;font-size:10px;" for="modewc"> Use WhirlCode</label></p>'+
										'<p><input type="checkbox" checked="checked" style="cursor: pointer;" value="true" wc2="b" id="modeht" name="modeht"/>'+
										'<label style="cursor: pointer;font-size:10px;" for="modeht"> Allow HTML</label></p>'+
										'<p><input type="checkbox" checked="checked" style="cursor: pointer;" value="true" id="modest" wc2="e" name="modest"/>'+
										'<label style="cursor: pointer;font-size:10px;" for="modest"> Auto entities </label></p>'+
										'<p><input checked="checked" type="checkbox" style="cursor: pointer;" value="true" id="modewl" wc2="a" name="modewl"/>'+
										'<label style="cursor: pointer;font-size:10px;" for="modewl"> Make links clickable</label></p>'+
										'<p><input type="checkbox" style="cursor: pointer;" id="autoPreview" name="autoPreview"/>'+
										'<label style="cursor: pointer;font-size:10px;">Auto Preview</label></p>'+		
										'<p><input type="checkbox" style="cursor: pointer;" id="lastPost" name="lastPost"/>'+
										'<label style="cursor: pointer;font-size:10px;">Go To Last Post</label></p>'+									
										'</div></div>');

			qqtArea = $('#qqTextArea');

			function getOptions(t){

				var textOptions = "&";
				var settingStr = "pfl";
				var ret;
			
				$('#opInputs input').each(function(i){
				
					var opThis = $(this);

					if(opThis.attr('checked')){

						settingStr += ''+opThis.attr('wc2');

						if(i<4){
						
							textOptions+= ''+opThis.attr('name')+'=true&';
							
						}

					}
				
				});

				(t == 'preview')? ret = settingStr: ret = textOptions;

				return ret;
			
			}
			
			var pTd;
			qqtArea.bind("focus keyup", function() {
			/***preview code by Simon Wright - http://forums.whirlpool.net.au/forum-user.cfm?id=10***/
				if(hideAjaxPreview && !qqtArea.val().length && !$('#previewTR')[0]){
				
					setUpPreview();
				
				}	
				var previewTimer;
				var previewWait = false;

					if (!previewWait) {

						previewWait = true;
						previewTimer = setTimeout(function(){
						
													pTd.html(whirlcode2(qqtArea.val(), getOptions('preview')));
													
													previewWait = false;
													
												}, 600);
					}



					
			});
			
			$('#qqpostclear').mouseup(function(){
			
				qqtArea.val('');
				
			});
			
			var autP = $('#autoPreview');
			
			function setUpPreview(){
			
				theLastOfTheMohicanTableRows.after('<tr height="100" id="previewTR"><td class="bodyuser" style="vertical-align: middle;"><p style="opacity:0.3;font:2em bold Verdana">'+
													'Preview</p></td><td class="bodytext"/><td class="bodypost" style="vertical-align: middle;"><p style="opacity:0.3;font:2em bold '+
													'Verdana">Preview</p></td></tr>');
				
				pTd = $('#previewTR td:eq(1)');
				
				autP.attr('checked', 'checked');
			
			}
			
			if(_GM_getValue('autoPreview') == 'true' && !hideAjaxPreview){
			
				setUpPreview();
				
			}
			
			autP.click(function(){
			
				if($(this).attr('checked')){
				
					_GM_setValue('autoPreview','true');

					setUpPreview();
				
				}
				else{

					_GM_setValue('autoPreview','false');

					$('#previewTR').remove();			
				
				}
				
			});

			var lastP = $('#lastPost');
			
			lastP.click(function(){
			
				var w = '';
			
				($(this).attr('checked'))? w='true':w='false';

					_GM_setValue('lastPost', w);

			});

				if(_GM_getValue('lastPost') == 'true'){
				
					lastP.attr('checked', 'checked');
				
				}


			/*******whirlcode buttons event handler********/		
					   
			$('.qqwcodeButtons').mouseup(function(){

				var qqbuttonID = $(this).attr('id');		

				qqtArea.focus();
				
				var qqcurrentValue = qqtArea.val();
				
				var qqtheSelection = qqtArea.val().substring(qqtArea[0].selectionStart, qqtArea[0].selectionEnd);

				function insertAtCursor(qqmyField, qqmyValue) {

					if (qqmyField.selectionStart || qqmyField.selectionStart == '0') {
					
						var qqstartPos = qqmyField.selectionStart;
						var qqendPos = qqmyField.selectionEnd;
						qqmyField.value = qqmyField.value.substring(0, qqstartPos)
						+ qqmyValue
						+ qqmyField.value.substring(qqendPos, qqmyField.value.length);
						
					} 
					else {
					
						qqmyField.value += qqmyValue;
						
					}
					
				}
				
				
					
				if(qqtheSelection === ""){
				
					if(((qqcurrentValue.split(whirlCode[qqbuttonID].encloseLeft).length+qqcurrentValue.split(whirlCode[qqbuttonID].encloseRight).length)  % 2) === 0){
						
						insertAtCursor(qqtArea[0], whirlCode[qqbuttonID].encloseLeft);
						
					}
					else{
						
						insertAtCursor(qqtArea[0], whirlCode[qqbuttonID].encloseRight);
							
					}
					
				}
				else if(qqbuttonID == "qqwc_whirlurl"){
				
					var uPrompt = window.prompt("Enter URL:", "http://"); 
					
					if ((uPrompt !== "http://") && (uPrompt !== "") & (uPrompt !== null)) {

						insertAtCursor(qqtArea[0], '<a href="'+uPrompt+'">'+qqtheSelection+'</a>');
					
					}
					

				}
				else if(qqbuttonID == "qqwc_whirllink"){
				
					var uPrompt = window.prompt("Enter Text:", ""); 
					
					if ((uPrompt !== "") & (uPrompt !== null)) {
					
						if(qqtheSelection.indexOf('http://')<0){
						
							qqtheSelection = 'http://'+qqtheSelection;
						
						}

						insertAtCursor(qqtArea[0], '<a href="'+qqtheSelection+'">'+uPrompt+'</a>');
					
					}
					

				}		
				else{
				
					if(qqtheSelection.indexOf('\n')>-1 || qqtheSelection.indexOf('\r')>-1){
					
						var tSel = qqtheSelection.replace(/^(.+)$/mg, whirlCode[qqbuttonID].encloseLeft+"$1"+whirlCode[qqbuttonID].encloseRight);
					
						qqtArea.val(qqtArea.val().replace(qqtheSelection, tSel));					
					
					}
					else{
					
						insertAtCursor(qqtArea[0], whirlCode[qqbuttonID].encloseLeft+qqtheSelection+whirlCode[qqbuttonID].encloseRight);
					
					}

				}		
			});


				
			$('.greylink[@href*="forum-replies-herring"]').each(function(){

				$(this).after(' <span class="bar"> | </span><a class="qqlink greylink" href="">q-quote</a>');

			});
			$('.qqlink').bind("click", function(){
			
				if(!$('#previewTR')[0]){
				
					setUpPreview();
				
				}

				var qqtrParent = $(this).parent().parent().parent();

				var qqpre = qqtrParent.attr('id').split('r')[1];
				
				var qquNam;
				
				qqtrParent.find('span').each(function(){

					if($(this).attr('class') == 'bu_name'){

						qquNam = $(this).text();

					}

				});
				var qqtSel = window.getSelection().toString().replace(/^(.+)$/mg, '["$1"]');
				
				if(qqtArea.val().length > 0){

					qqtArea.val(qqtArea.val()+'\r@'+qqpre+' '+qquNam+' writes... \n'+qqtSel+'\n\n');
				
				}
				else{
				
					qqtArea.val(qqtArea.val()+'@'+qqpre+' '+qquNam+' writes... \n'+qqtSel+'\n\n');
				
				}
				
				qqtArea.focus();
				
				return false;

			});
			
			
			function pfft(){
				
				qqtArea.css('background','#E5E5E5 url(http://i28.tinypic.com/jzbn0n.gif) no-repeat scroll 50% 50%');
				
				postPost(qqtArea.val(), getOptions('post'));	
			
			}
			
			$('#qqpost').mouseup(function(){
			
				if(!gottaPee){
				
					$.get(pReply[0].href, function(data){

						gottaPee = data.split('name="tinkle" value="')[1].split('">')[0];

					});
				
				}
			
				pfft();
				
			});
			qqtArea[0].addEventListener('keydown', function(event) {
			
				if(event.ctrlKey==1 && event.keyCode==13 ){
				
					if(!gottaPee){
					
						$.get(pReply[0].href, function(data){

							gottaPee = data.split('name="tinkle" value="')[1].split('">')[0];

						});
					
					}
			
					pfft();
					
				}
					
			}, false);	
							
		}
		
	}
})();