// ==UserScript==
// @name		Ipernity Smiles
// @namespace	http://www.sallati.com/scripts/ipernity/
// @description	Adds the smilies to the comments box
// @version		0.5 BETA
// @identifier	http://www.sallati.com/scripts/ipernity/ipernity.smiles.user.js
// @date        2007-10-31
// @creator     Motaz Abuthiab (moty66 * gmail * com)
// @include http://*ipernity.com/doc/*/*
// @include http://*ipernity.com/blog/*/*
// @include http://*ipernity.com/group/*/*
// @exclude http://*ipernity.com/doc/*/organize
// ==/UserScript==

// --------------------------------------------------------------------
// CHANGE LOG
// ver 0.5
// * fix the cursor position after inserting url, bold, italic or smile
// * fix does not prompt for a lable when you select a string to link it 
//   to an URL
// * fix the arrows position, also if you are using ipernity Easy Photo Post
//
// ver 0.4
// * added Bold and Italic button
// * added Link button
// * added arrows to change the textarea size
// 

// --------------------------------------------------------------------
// TODO
// * move the position of the arrows when the user click preview


// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
// Copyright (C) 2007 Motaz Abuthiab
// 
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// The GNU General Public License is available by visiting
//   http://www.gnu.org/copyleft/gpl.html
// or by writing to
//   Free Software Foundation, Inc.
//   51 Franklin Street, Fifth Floor
//   Boston, MA  02110-1301
//   USA


(function () {

	var win = unsafeWindow || window.wrappedJSObject || window;
	



	//update information
	var SCRIPT = {
		name: "Ipernity Smiles",
		namespace: "http://www.sallati.com/scripts/ipernity/",
		description: "Adds the smilies to the comments box",
		identifier: "http://www.sallati.com/scripts/ipernity/ipernity.smiles.user.js",
		version: "0.5 BETA",				// version
		date: (new Date(2007, 10, 31))		// update date
		.valueOf()
	};
	
	
	function $x( xpath, root )
		{
			var doc = root ? root.evaluate?root:root.ownerDocument : document;
			var got = doc.evaluate( xpath, root||doc, null, 0, null ), next;
			var result = [];
			while( next = got.iterateNext() )
				result.push( next );
			return result;
		}
	
	
	var IpernitySmiles = function() {this.init();}
	
	IpernitySmiles.prototype = {
	
	
			init: function() {
				
			
				
				// The main form for comments
				// this works only on reply or on 
				// commenting a posts
				// but does not work on NEW TOPIC in groups
				var form = document.getElementById('comment');
				var TextArea;
				

				
				if (form) {
				// There is the form for leaving a comments
					
					// Get the list of smiles
					var list_of_smiles = this.iniSmiles();
					
					// The textarea
					var TextArea = document.evaluate(
											 "//textarea[@id='comment_content']",
											 document,
											 null,
											 XPathResult.FIRST_ORDERED_NODE_TYPE, null
											 ).singleNodeValue;
					
					// the same size for all textareas
					TextArea.setAttribute("style","width:" + 450 + "px; height:" + 80 + "px;");
					

					

					
					
					
					// Insert the html for the smiles box if there is the text area					
					if(TextArea)
						form.innerHTML = '<div style="margin-bottom:3px; cursor:pointer;" id="smiles_box"></div>' + form.innerHTML;
					else
					// In case you are not able to comment (like if the comments are closed or you are not a memeber on a group)
						return false;
					
					// Get the smiles box
					var smiles_box = document.getElementById('smiles_box');
					// call the function addArrows to resize the textarea
					this.addArrows(smiles_box,TextArea);
					
					
					// Loop to insert the smiles
					for(var i=0; i<list_of_smiles.length; i++) {
						smile_url = list_of_smiles[i][1];
						smile_alt = list_of_smiles[i][0];
						
						var image = smiles_box.appendChild(document.createElement('img'));	
						
						image.src = smile_url;
						image.setAttribute("style","margin-left:3px;  padding:2px; border:1px solid #eee; height:16px;");
						image.alt = list_of_smiles[i][0];
						image.id = "imageSmile"+i;	
						
						image.addEventListener('click',function(evt) {
									
							mesg = '<img src="'+ this.src +'" alt="'+ this.alt +'" /> ';
							
							
							// get all textAreas
							allTextAreas = $x('//textarea[@id="comment_content"]',	document);
							
							for (var j = 0; j < allTextAreas.length; j++) {
									
									
									thisTextArea = allTextAreas[j];
									var position = thisTextArea.selectionEnd;
									try{
										thisTextArea.value = thisTextArea.value.substr(0,thisTextArea.selectionStart) 
														   + mesg
														   + thisTextArea.value.substr(thisTextArea.selectionStart);
									} 
									catch(e) {
										 thisTextArea.value +=  mesg;
									}
														
							// se the cursor position
							position = mesg.length + position;
							
							if (thisTextArea.setSelectionRange) {
								thisTextArea.focus();
								thisTextArea.setSelectionRange(position, position);
								}
							else
								thisTextArea.focus();
									
									
									
							// end for allTextAreas
							}	
							
						// end add Event	
						},true);
					
					// end for loop
					}
					
					// add bold button to the toolbar
					this.addBoldBtn(smiles_box);
					
					// add italic button to the toolbar
					this.addItalicBtn(smiles_box);
					
					// add bold button to the toolbar
					this.addLinkBtn(smiles_box);
					
					// add the about to the smiles
					this.showAbout(smiles_box);

				// end if from	
				} 
				
				else 
				{
					// there is not form in this page and we do nothing 
					// for debug
					// alert('nothing to');
				
				}	
			// end ini function
			},
			

			iniSmiles: function() {
				/*
				Array of smiles, you can add as much as you want	
				I got these icons from Ipernity Website directly
				Just to be always availavle...
				*/
				
				// FCK icons are here http://www.ipernity.com/T/E/FCK/skin/fck_strip.gif
				var smiles = new Array();
				smiles[0]		= new Array('smile','/T/UIcons/smileys/fun/smile.gif');
				smiles[1] 		= new Array('laught','/T/UIcons/smileys/fun/apophys.gif');
				smiles[2] 		= new Array('cty','/T/UIcons/smileys/fun/pleure.gif');
				smiles[3] 		= new Array('love','/T/UIcons/smileys/fun/love.gif');
				smiles[4] 		= new Array('shy','/T/UIcons/smileys/fun/blush.gif');
				smiles[5] 		= new Array('sad','/T/UIcons/smileys/fun/sad.gif');
				return smiles;
			// end iniSmiles function
			},
			
			showAbout: function(object) {
				
				var about = object.appendChild(document.createElement('img'));	
				
				about.src = 'http://www.sallati.com/scripts/ipernity/imgs/about.png';
				about.setAttribute("style","margin-left:30px;  padding:2px; border:1px solid #eee; height:16px;");
				about.alt = 'About Ipernity Smiles';
				
				about.id  = 'AboutIpernitySmiles';	
				about.addEventListener('click',function(evt) { 
				
				location.href = 'http://www.sallati.com/scripts/ipernity';
					
				},true);
				
				

			
			// end showAbout function
			},
			
			
			addArrows: function(object,textArea) {
				
				
				// The icons for changeing the height of the textarea
				var downIcon= "/T/1/L/rubix/album_close.png";
				var upIcon	= "/T/1/L/rubix/album_open.png";		
				// set the ini hight and width of the textarea
				var iniH	= 80;
				var iniW	= 450;
				
				
				// this is so importat, just to make al textareas's style the same
				textArea.setAttribute("style","width:" + iniW + "px; height:" + iniH + "px;");
				
				// the main div of the textarea
				var container = document.getElementById('comment_form');	
				// get the absolute position of the main div
				// I didn't find the way to to get the absolure
				// position of the textarea, but it was possibile
				// to find the it for the main div
				var absLeft = container.offsetLeft;
				var absTop	= container.offsetTop;
				// space between the textarea and the arrows
				var space = 20;// pixel
				// the space to add/sub every time you click the buttons
				var additionl_hight = 80; // pixel
							
				// creat the first child for down arrow
				var up = container.appendChild(document.createElement('img'));	
				// the the srouce and the alt to the image
				up.src = upIcon;
				up.alt = 'Make the textarea box bigger';
				// add the style to the down arrow 
				up.setAttribute("style","position: absolute; cursor:pointer; top:" 
																+ (absTop+iniH+15) + "px; left: "
																+ (absLeft+iniW+space) + "px;");				
				
				// create the second child for the up arrow
				var down = container.appendChild(document.createElement('img'));	
				// the the srouce and the alt to the image
				down.src = downIcon;
				down.alt = 'Make the textarea box smaller';
				// add the style to the down arrow 
				down.setAttribute("style","position:absolute; cursor:pointer; top:" 
								  								
																+ (absTop+24) + "px; left: " 
																+ (absLeft+iniW+space) + "px;");
				
				up.addEventListener('click',function(evt) { 			
					// get the textarea
					textArea = document.evaluate(
											 "//textarea[@id='comment_content']",
											 document,
											 null,
											 XPathResult.FIRST_ORDERED_NODE_TYPE, null
											 ).singleNodeValue;
					// add 80px to the hight when click
					iniH += additionl_hight;
					// refresh the style of the textarea
					textArea.setAttribute("style",'height:' + iniH + 'px; width:' + iniW +'px;' );
					// refresh the style of the button
					up.setAttribute("style","position: absolute; cursor:pointer; top:" 
																+ (absTop+iniH+15) + "px; left: "
																+ (absLeft+iniW+space) + "px;");
				},true);
				
				down.addEventListener('click',function(evt) { 			
					
					if(iniH == additionl_hight)
						return false;
					// get the textarea	
					textArea = document.evaluate(
											 "//textarea[@id='comment_content']",
											 document,
											 null,
											 XPathResult.FIRST_ORDERED_NODE_TYPE, null
											 ).singleNodeValue;
					// sub 80 pixels from the textarea
					iniH -= additionl_hight;
					// refresh the style of the textarea
					textArea.setAttribute("style",'height:' + iniH + 'px; width:'+iniW+'px;' );
					// refresh the style of the button
					up.setAttribute("style","position: absolute; cursor:pointer; top:" 
																+ (absTop+iniH+15) + "px; left: "
																+ (absLeft+iniW+space) + "px;");
					
				},true);
			// end addArrows function
			},
			
			addBoldBtn : function(object) {
				
				var boldBtn = object.appendChild(document.createElement('input'));	
				boldBtn.type = 'button';
				boldBtn.name = 'boldBtn';
				boldBtn.className = 'reset';
				boldBtn.value = 'B';
				boldBtn.setAttribute("style","width: 20px; height: 20px; padding:0; margin:-16px 0px 0px 3px;");
				boldBtn.addEventListener('click',function(evt) { 	
													   
					textArea = document.evaluate(
										 "//textarea[@id='comment_content']",
										 document,
										 null,
										 XPathResult.FIRST_ORDERED_NODE_TYPE, null
										 ).singleNodeValue;
					
					
					// check if the selection is empty !
					if(textArea.selectionStart == textArea.selectionEnd)
						return false;

					// get the cursor position
					var position = textArea.selectionEnd; 
					// get the text before the selection
					var selStart = textArea.value.substr(0, textArea.selectionStart);
					// get the text after the selection
					var selEnd = textArea.value.substr(textArea.selectionEnd, textArea.value.length);
					// get the selected text
					var curSelection = textArea.value.replace(selStart, '').replace(selEnd, '');
					// rewrite the text with the tag in the textarea
					textArea.value = selStart + '<b>' + curSelection + '</b>' + selEnd;
					
					
					// se the cursor position
					if (textArea.setSelectionRange) {
						textArea.focus();
						textArea.setSelectionRange(position+7, position+7);
						}
					else
						textArea.focus();
			
					
					
							
					
				},true);									   
			// end add bold function	
			},
			
			addItalicBtn : function(object) {
				
				var italicBtn = object.appendChild(document.createElement('input'));	
				italicBtn.type = 'button';
				italicBtn.name = 'italicBtn';
				italicBtn.className = 'reset';
				italicBtn.value = 'I';
				italicBtn.setAttribute("style","width: 20px; height: 20px; font-style:italic; font-family:times; padding:0; margin:-16px 0px 0px 3px;");
				italicBtn.addEventListener('click',function(evt) { 	
													   
					textArea = document.evaluate(
										 "//textarea[@id='comment_content']",
										 document,
										 null,
										 XPathResult.FIRST_ORDERED_NODE_TYPE, null
										 ).singleNodeValue;
					
					
					// check if the selection is empty !
					if(textArea.selectionStart == textArea.selectionEnd)
						return false;
					
					// get the cursor position
					var position = textArea.selectionEnd; 
					// get the text before the selection
					var selStart = textArea.value.substr(0, textArea.selectionStart);
					// get the text after the selection
					var selEnd = textArea.value.substr(textArea.selectionEnd, textArea.value.length);
					// get the selected text
					var curSelection = textArea.value.replace(selStart, '').replace(selEnd, '');
					// rewrite the text with the tag in the textarea
					textArea.value = selStart + '<em>' + curSelection + '</em>' + selEnd;
					// se the cursor position
					if (textArea.setSelectionRange) {
						textArea.focus();
						textArea.setSelectionRange(position+9, position+9);
						}
					else
						textArea.focus();
							
					
				},true);									   
			// end add bold function	
			},

			addLinkBtn : function(object) {
				
				var urlBtn = object.appendChild(document.createElement('input'));	
				urlBtn.type = 'button';
				urlBtn.name = 'boldBtn';
				urlBtn.className = 'reset';
				urlBtn.value = 'URL';
				urlBtn.setAttribute("style","width: 30px; height: 20px; padding:0; margin:-16px 0px 0px 3px;");
				urlBtn.addEventListener('click',function(evt) { 	
													   
					textArea = document.evaluate(
										 "//textarea[@id='comment_content']",
										 document,
										 null,
										 XPathResult.FIRST_ORDERED_NODE_TYPE, null
										 ).singleNodeValue;
										
					var selStart = textArea.value.substr(0, textArea.selectionStart);
					// get the text after the selection
					var selEnd = textArea.value.substr(textArea.selectionEnd, textArea.value.length);
					// get the selected text
					var curSelection = textArea.value.replace(selStart, '').replace(selEnd, '');
					// get the cursor position
					var position = textArea.selectionEnd; 
					
					var lable;
					// read the url an the lable 
					var url = prompt("Enter a Link example http://www.ipernity.com/","");
					if(curSelection == '')
						lable = prompt("Enter a Lable","");				
					else  {
						lable = curSelection;
						position -= lable.length;
					}
					if(url == '')
						return false;
					// check if the url has the prtocol if not add http://
					if(url.indexOf('http://') < 0 && url.indexOf('https://') < 0 && url.indexOf('ftp://') < 0 )
					{
						url = 'http://' + url;
					}

					// check the lable if empty, if yes, it will be the same as the url but without the protocol
					if(lable == '')
						lable = url.replace('http://', '');
					// generat the html code 
					var mesg = '<a href="'+url+'">'+lable+'</a>';
					// get the cursor position
					
					// insert in where the curos is located
					try{
						textArea.value = textArea.value.substr(0,textArea.selectionStart) 
											+ mesg
											+ textArea.value.substr(textArea.selectionStart).replace(curSelection,'');
									} 
						catch(e) {
								 textArea.value +=  mesg;
						}
										// se the cursor position
					if (textArea.setSelectionRange) {
						textArea.focus();
						textArea.setSelectionRange(position+15+url.length + lable.length, position+15+url.length + lable.length);
						}
					else
						textArea.focus();
							
					
				},true);									   
			// end add bold function	
			},
	}
	
	// AUTO UPDATE
	try { 
			window.addEventListener("load", function () {
				try {
					win.UserScriptUpdates.requestAutomaticUpdates(SCRIPT);
					} catch (ex) {} 
									
	
		}, false);
	} catch (ex) {}
	
	
	
	var ipernitygp = new IpernitySmiles();

})();