// ==UserScript==
// @name		Whirlpool - Edit In Place
// @namespace	forums.whirlpool.net.au
// @version	2.3
// @description	Edit your posts in threads without needing to go to the edit page
// @include	http://forums.whirlpool.net.au/forum-replies.cfm*
// @include	http://whirlpool.net.au/forum-replies.cfm*
// ==/UserScript==
//0.1 Changes - Updated to fix issue with inline images and the WLR.
//0.2 Changes - Updated to fix issue with quotes.
//0.3 Changes - Updated to fix issue with smileys.
//0.4 Changes - Updated to fix issue with multiple edits. Added whilcode box. Added Ctrl+Enter shortcut. Added quick-quote to edit in place box. Added smily on/off toggle.
//0.5 Changes - Updated to fix issue with quotes.
//0.6 changes - Fixed an issue with links. Fixed draggable whircode box. Made textarea resizable
//0.7 changes - Fixed options. Fixed resize height only. Fixed quoting users with unusual characters (NFI how). Fixed edit-in-place quick quote when no wlr.
//0.8 changes - Added option to retrieve edit after error. 
//0.9 changes - Changed option to retrieve edit after error so that you can copy it to the clipbard with one click.
//1.0 changes - Summin broke. Added DedDerek's fix.
//1.1 changes - Updated for site changes.
//1.2 changes - Fixed problem with server timeout message. Removed smileys from preview.
//1.3 changes - updated for site changes - also uses the whircode2 javascript on the page for preview.
//1.4 changes - fixed the edit in place quick quote.
//1.5 changes - added integration with ajax quick quote script
//1.6 changes - fixed ctrl+enter glitch
//1.7 changes - fixed whirlcode buttons - spoiler tag and some other stuff that I can't remember now
//1.8 changes - fixed whirlcode buttons glitch/added link button
//1.9 changes - fixed http://forums.whirlpool.net.au/forum-replies.cfm?t=1007336&p=8#r146 and tweak the quote \n \r etc.
//2.0 changes - fixed ul and ol tags for editing. Fixed that div image glitch.
//2.1 changes - [' quote'] glitch
//2.2 changes - [' quote'] glitch - 2nd go
//2.3 changes - removed flash copy to clipboard on ajax error (http://www.adobe.com/devnet/flashplayer/articles/fplayer10_security_changes_02.html#head31) - replaced with showing the edit again to allow user to copy manually

$ = unsafeWindow.jQuery;

function kitAndKaboodle(){

	var docloc = document.location.host;

	var ajaxloaderimgsrc = "data:image/gif;base64,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%3D%3D";

	var editLink = $(".bodypost a[@href^='/forum-reply.cfm?e']");
	
	editLink.each(function(){
	
		if($(this).parent().next().text() != '(edit in place)'){
		
		
			$(this).parent().after('<div style="margin: 5px;"><a class="eip" href="#">(edit in place)</a></div>');
		
		
		}
		
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

	var bt, saveOriginalHTML;

	$('.eip').unbind('click').bind("click", function(){

		var clicker = $(this);

		if(clicker.text() == '(cancel edit)'){
		
			clicker.text('(edit in place)');
			
			$('#opInputs, #options, #savEdit, #eipTexta, #buttonsDiv').remove();
			
			bt.html(saveOriginalHTML);
			
			$('.meh, .mehbar').remove();

		}
		else{
			
			var btextHtml;
			bt = clicker.parent().parent().prev();
			saveOriginalHTML = bt.html();
			clicker.text('(cancel edit)');

			var bth = bt.height()-8;
			var btw = bt.width()-25;		
			
			var loaderHeight = bth+5;
			var loaderWidth = btw+5;		
			
			var olt = '';
			var ult = '';
			
			bt.children('*').each(function(){

				//it's easier to change them to unique tags rather than have to deal with nested closing div tags with regex
				
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
						   
							var refF = iGottaP.children('a:first');
							
							var referenceNum = refF.attr('onclick').split('(')[1].split(')')[0];
												
							refF.after('@'+referenceNum+' '+refF.text());

							refF.remove();
						   
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
			
			bt.children().hide();

			bt.append('<textarea id="eipTexta" style="background:#EEEEEE url(/img/forum/reply-eeeeee.gif) repeat-x scroll center bottom;'+
					'border:1px solid #BBBBBB;width:'+btw+'px;height:'+bth+'px;">'+btextHtml+'</textarea>'+
					'<div id="tresize" style="height:10px;width:10px;background-color:orange;float:right;cursor:se-resize;"></div>');
			
			var tArea = $('#eipTexta');
			var tRes = $('#tresize');
			
			//kitchen sink
			/*******whirlcode********/

			var whirlCode = { 	                
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
						   }; 

			/********whirlcode buttons*********/

			var wcButtons = '<div id="buttonsDiv" style="background-color: #666666;text-align:center;position:absolute;width:'+tArea.width()+'px;padding-bottom:10px;">' +
						'<div style="background:#444 none repeat scroll 0%; height:15px; margin-bottom:10px;cursor:move;text-align:center;font-size:11px;color:#666" class="jqHandle jqDrag">Drag Here</div>'+
						'<button type="button" class="wcodeButtons" title="Bold WhirlCode" accesskey="b" id="wc_whirlBold" >Bold</button>' +
						'<button type="button" class="wcodeButtons" title="Italic WhirlCode" accesskey="i" id="wc_whirlItalic" >Italic</button>' +
						'<button type="button" class="wcodeButtons" title="SingleQuote WhirlCode" accesskey="t" id="wc_whirlSingleQuote" >\'quote\'</button>' +
						'<button type="button" class="wcodeButtons" title="DoubleQuote WhirlCode" accesskey="q" id="wc_whirlDoubleQuote" >"quote"</button>' +
						'<button type="button" class="wcodeButtons" title="Quote WhirlCode" accesskey="h" id="wc_whirlQuote" >who</button>' +
						'<button type="button" class="wcodeButtons" title="Superscript WhirlCode" accesskey="p" id="wc_whirlSuperscript" >Super</button>' +
						'<button type="button" class="wcodeButtons" title="Subscript WhirlCode" accesskey="\\" id="wc_whirlSubscript" >Sub</button>' +
						'<button type="button" class="wcodeButtons" title="Strike WhirlCode" accesskey="k" id="wc_whirlStrike" >Strike</button>' +
						'<button type="button" class="wcodeButtons" title="Courier WhirlCode" accesskey="c" id="wc_whirlCourier" >Courier</button>' +
						'<button type="button" class="wcodeButtons" title="Small WhirlCode" accesskey="m" id="wc_whirlSmall" >Small</button>' +
						'<button type="button" class="wcodeButtons" title="Grey WhirlCode" accesskey="r" id="wc_whirlGrey" >Grey</button>' +
						'<button type="button" class="wcodeButtons" title="Serif WhirlCode" accesskey="s" id="wc_whirlSerif" >Serif</button>' +
						'<button type="button" class="wcodeButtons" title="Google WhirlCode" accesskey="g" id="wc_whirlGoogle" >Google</button>' +
						'<button type="button" class="wcodeButtons" title="Escape WhirlCode" accesskey="e" id="wc_whirlEscape" >Esc</button>' +
						'<button type="button" class="wcodeButtons" title="Wiki WhirlCode" accesskey="w" id="wc_whirlWiki" >Wiki</button>' +
						'<button type="button" class="wcodeButtons" title="Spoiler WhirlCode" accesskey="o" id="wc_whirlSpoil" >Spoiler</button>' +
						'<button type="button" class="wcodeButtons" title="URL Link" accesskey="u" id="wc_whirlurl" >URL</button>' +
						'<button type="button" class="wcodeButtons" title="Link" accesskey="l" id="wc_whirllink" >Link</button>' +
						'<button type="button" class="wcodeButtons" title="Sink" accesskey="meh" id="wc_Sink" >Sink</button>' +

						'</div>';
			
			bt.prepend(wcButtons);
			
			var butMarg = $("#buttonsDiv").height()+25;

			$('#buttonsDiv')[0].style.marginTop = "-"+butMarg+"px";
			GM_addStyle('.wcodeButtons{font-size:0.8em;}');			
			
			var kImg = "data:image/gif;base64,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";
			
			$('#wc_Sink').unbind('mouseup').mouseup(function(evt){
			
				if($('#ks')[0]){
				
					$('#ks').remove();
				
				}
				else{

					var ey = evt.pageY+30;
					var eX = evt.pageX-200;

					$('body').prepend('<img id="ks" style="position:absolute;top:'+ey+'px;left:'+eX+'px;z-index:5;"src="'+kImg+'" />');
					
				}
			
			});
			
			//make buttons div draggable
			/*
			 * jqDnR - Minimalistic Drag'n'Resize for jQuery.
			 *
			 * Copyright (c) 2007 Brice Burgess <bhb@iceburg.net>, http://www.iceburg.net
			 * Licensed under the MIT License:
			 * http://www.opensource.org/licenses/mit-license.php
			 * 
			 * $Version: 2007.08.19 +r2
			 */
			 
			$.fn.jqDrag=function(h){return i(this,h,'d');};
			$.fn.jqResize=function(h){return i(this,h,'r');};
			$.jqDnR={dnr:{},e:0,
			drag:function(v){
			 if(M.k == 'd')E.css({left:M.X+v.pageX-M.pX,top:M.Y+v.pageY-M.pY});
			 else E.css({width:btw,height:Math.max(v.pageY-M.pY+M.H,0)});
			  return false;},
			stop:function(){E.css('opacity',M.o);$().unbind('mousemove',J.drag).unbind('mouseup',J.stop);}
			};
			var J=$.jqDnR,M=J.dnr,E=J.e,
			i=function(e,h,k){return e.each(function(){h=(h)?$(h,e):e;
			 h.bind('mousedown',{e:e,k:k},function(v){var d=v.data,p={};E=d.e;
			 // attempt utilization of dimensions plugin to fix IE issues
			 if(E.css('position') != 'relative'){try{E.position(p);}catch(e){}}
			 M={X:p.left||f('left')||0,Y:p.top||f('top')||0,W:f('width')||E[0].scrollWidth||0,H:f('height')||E[0].scrollHeight||0,pX:v.pageX,pY:v.pageY,k:d.k,o:E.css('opacity')};
			 E.css({opacity:0.8});
			 $().mousemove($.jqDnR.drag).mouseup($.jqDnR.stop);
			 return false;
			 });
			});},
			f=function(k){return parseInt(E.css(k))||false;};
				
			
			$('#buttonsDiv').jqDrag('.jqDrag');
			
			//make textarea resizable
			tArea.jqResize(tRes[0]);
				
			/*******whirlcode buttons event handler********/		
					   
			$('.wcodeButtons').unbind('mouseup').mouseup(function(){
			
				var buttonID = $(this).attr('id');		

				tArea[0].focus();
				
				var currentValue = tArea[0].value;
				
				var theSelection = tArea[0].value.substring(tArea[0].selectionStart, tArea[0].selectionEnd);

				function insertAtCursor(myField, myValue) {

					if (myField.selectionStart || myField.selectionStart == '0') {
					
						var startPos = myField.selectionStart;
						var endPos = myField.selectionEnd;
						myField.value = myField.value.substring(0, startPos)
						+ myValue
						+ myField.value.substring(endPos, myField.value.length);
						
					} 
					else {
					
						myField.value += myValue;
						
					}
					
				}

				if(theSelection === ""){
					
					if(((currentValue.split(whirlCode[buttonID].encloseLeft).length+currentValue.split(whirlCode[buttonID].encloseRight).length)  % 2) === 0){
						
						insertAtCursor(tArea[0], whirlCode[buttonID].encloseLeft);
						
					}
					else{
						
						insertAtCursor(tArea[0], whirlCode[buttonID].encloseRight);
							
					}
					
				}
				else if(buttonID == "wc_whirlurl"){ 

					var uPrompt = window.prompt("Enter URL:", "http://"); 
					
					if ((uPrompt !== "http://") && (uPrompt !== "") & (uPrompt !== null)) {

						insertAtCursor(tArea[0], '<a href="'+uPrompt+'">'+theSelection+'</a>');
					
					}
						
				}		
				else if(buttonID == "wc_whirllink"){
				
					var uPrompt = window.prompt("Enter Text:", ""); 
					
					if ((uPrompt !== "") & (uPrompt !== null)) {
					
						if(theSelection.indexOf('http://')<0){
						
							theSelection = 'http://'+theSelection;
						
						}

						insertAtCursor(tArea[0], '<a href="'+theSelection+'">'+uPrompt+'</a>');
					
					}
					

				}					
				else{
				
					if(theSelection.indexOf('\n')>-1 || theSelection.indexOf('\r')>-1){
					
						var tSel = theSelection.replace(/^(.+)$/mg, whirlCode[buttonID].encloseLeft+"$1"+whirlCode[buttonID].encloseRight);
					
						tArea.val(tArea.val().replace(theSelection, tSel));						
					
					}
					else{
					
						insertAtCursor(tArea[0], whirlCode[buttonID].encloseLeft+theSelection+whirlCode[buttonID].encloseRight);
					
					}
					
				}	
				
				
				tArea.focus();

			
			});		
			
			tArea.focus();
			
			clicker.parent().after('<div id="opInputs" style="position: absolute; display:none; margin:-163px 0 0 -125px;text-align: left; width: 150px; '+
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

			$('#options').unbind('mouseup').bind("mouseup", function() { 
			
				($('#opInputs').css('display') == 'none')? $('#opInputs').css('display', 'block'): $('#opInputs').css('display', 'none');
			
			});
			
			function mUp(){
			
				if(!$('#loader')[0]){
			
					var textOptions = "&";
					
					var settingStr = "pfl";
				
					$('#opInputs :checkbox').each(function(i){
					
						var opThis = $(this);
					
						if($(this).attr('checked')){
						
							settingStr += ''+opThis.attr('wc2');

							textOptions+= ''+opThis.attr('name')+'=true&';
						
						}

					});		

					var textArtex = $('#eipTexta').val();	
					var saveBTH = bt.html();					
					var forPostSuccess = textArtex;
					
					tArea.remove();
					tRes.remove();
					$('#buttonsDiv').remove();

					var previewStr = unsafeWindow.whirlcode2(forPostSuccess, settingStr);				
					
					if($('#loader')[0]){
			
							$('#loader').html('<img src="'+ajaxloaderimgsrc+'" style="relative: absolute; z-index: 5; top: 40%; left: 45%;"/>');
						
						}
					else{

							bt.prepend('<div id="loader" style="position: relative; z-index: 5; background:#EEEEEE url(/img/forum/reply-eeeeee.gif) repeat-x scroll center bottom; height: '+
							loaderHeight+'px; width: '+loaderWidth+'px;"><img src="'+ajaxloaderimgsrc+'" style="position: absolute; z-index: 5; top: 40%; left: 45%;"/></div>');

						}
						
					}
					
					$.ajax({
						type: "POST",
						url: clicker.parent().prev().children('a:last')[0].href,
						data: "version=2&post2=post&form=too+right&"+ 		
						"timestart=%7Bts+%27"+currTime+"%27%7D&"+
						"body="+encodeURIComponent(textArtex)+textOptions+
						"cliptemp=Paste+external+quotes+here",
						success: function(msg){
					
							if( (msg.indexOf('Post edited.') > -1) || (msg.indexOf('You pressed submit more than once') > -1)){
								
								$('#savEdit, #options, #opInputs').hide();
								
								$('#loader').remove();
								
								bt.children().show();
								
								clicker.text('(edit in place)');
		
								bt.append(previewStr);
								
								$('.meh, .mehbar').remove();

							}
							else{
							
								$('#loader').html('<p>Server Timeout. Click the "Save Edit" button to try again.</p>');
							
							}
							
						},
						error: function(XMLHttpRequest, textStatus, errorThrown){

							clicker.remove();
							
							$('.meh, .mehbar, #loader, #savEdit, #options, #opInputs').remove();
						
							var runSrc = "data:image/gif;base64,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";
						
							bt.html('<p><img src="'+runSrc+'" alt="runaway.gif" /></p><p>Something Broke!</p><p id="broked">'+
							'You should try editing your post again from the regular edit page. Click on the button below to show your edit.'+
							'<br /><br /><button id="copPost">Show Edit</button></p>');
							
							$('#copPost').one('mouseup', function(){

								bt.html(saveBTH);
								$('#buttonsDiv').remove();
								$('#eipTexta').val(textArtex);

							});	
							
						}
					
					
				 });	
			
				return false; 

			}		
			
			tArea[0].addEventListener('keydown', function(event) {
			
				if(event.ctrlKey==1 && event.keyCode==13 ){
				
					mUp();
					
				}
					
			}, false);


			
			$('#savEdit').unbind('mouseup').bind("mouseup", function() { 
				
				mUp();
			
			});
			
			//quick-quote to inline edit
			if($('#eipTexta')[0]){
				
				$('.bodypost').each(function(){
				
					$(this).children('div:first').after('<a class="meh greylink" href="">eip-quote</a>');

				});
				$('.meh').unbind('click').bind("click", function(){
				
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

kitAndKaboodle();

$("#replies").ajaxComplete(function(ev, xhr, s) {
	
	if(s.type == 'POST' && s.url.indexOf('forum-reply.cfm?e')<0){
	
		kitAndKaboodle();
	
	}
	
});

