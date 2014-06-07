// ==UserScript==
// @name	Flickr Comment Replayer
// @description  Adds "Reply" link to comments that inserts buddyicon to comment box.
// @version        1.4
// @date           2009-09-14
// @creator        Dominik Sarnowski (titter85@gmail.com)
// @include http://*flickr.com/photos/*/*
// @include http://*flickr.com/photos/*/*#preview
// @include http://*flickr.com/groups/*/discuss/*
// @exclude http://*flickr.com/photos/organize*
// ==/UserScript==

// --------------------------------------------------------------------
// Copyright (C) 2009 Dominik Sarnowski
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

	//update information
	var SCRIPT = {
		name: "Flickr Comment Replyer",
		description: "reply to comments with buddyicon",
		version: "1.4",								// version
		date: (new Date(2009, 09, 14))		// update date
		.valueOf()
	};
	
	function methodCall(object, method, messageBox, img, href, n, group) {
		return function() {
			return object[method](messageBox, img, href, n, group);
		}
	}
	
	function methodCall_comment(object, method, className, obj) {
		return function() {
			return object[method](className, obj);
		}
	}
	
	var FlickrCommentReplayer = function() {this.init();}
	
	var comments = document.getElementById("DiscussPhoto");
	var messageBox = document.getElementById('message');
	var classElements = new Array();
	var elements = new Array();
	
	FlickrCommentReplayer.prototype = {
			
		M8_log: function(msg) {
		  if(unsafeWindow.console && unsafeWindow.console.log) {
			unsafeWindow.console.log(msg);
		  } else
		  alert(msg);
		},

		init: function() {
			
			if (comments != null){
				var replay = null;
				var commentIdx = 0;
				var lastIdx = 0;
				var last = false;
				
				classElements=comments.getElementsByTagName('div');
				
				for (var i=0; i<classElements.length; i++){
					
					if (classElements[i].className.indexOf('comment-block')>=0){

						classElements[i].setAttribute('id','#'+i);

						elements.push(i);
						var divs = document.getElementById('#'+i).getElementsByTagName('div');
						divs[0].setAttribute('id','img#'+i);
						divs[1].setAttribute('id','com#'+i);
						var imgSrc = document.getElementById('img#'+i).getElementsByTagName('img')[0];
						var commenter = document.getElementById('com#'+i).getElementsByTagName('a')[0];

						commentIdx++;
						if (commenter.firstChild.nodeValue == unsafeWindow.global_name){
							lastIdx = commentIdx;
						}
					}
				}
				
				for (var i=lastIdx; i<elements.length; i++){
					var comment = document.getElementById('#'+elements[i]);
					
					var div = document.createElement('div');
					div.setAttribute('class','comment-owner');
					div.setAttribute('id','comRep#'+elements[i]);
					div.style.left = '410px';
					div.style.paddingLeft = '20px';
					div.style.borderLeft = '2px solid black';

					var link = document.createElement('a');
					link.style.color = '#3886E6';
					link.style.cursor = 'pointer';
					link.style.textDecoration = 'none';
					
					link.innerHTML = "reply";
					
					div.appendChild(link);
					comment.appendChild(div);
					
					link.addEventListener('click', 
						methodCall(
							this,
							'insertBuddy',
							messageBox, 
							document.getElementById('img#'+elements[i]).getElementsByTagName('img')[0].getAttribute('src'), 
							document.getElementById('com#'+elements[i]).getElementsByTagName('a')[0].getAttribute('href'),
							-elements[i],
							0
						),
					true);	
				
				}
				
				if (lastIdx!=elements.length){
					var tabG = document.getElementById("tbl_comment_stuff");
					var div = document.createElement('div');
					div.style.width = (22*21+10)+"px";
					div.style.height = (25*(elements.length/20))+"px";
					div.style.borderTop = "1px solid black";
					div.valign = "middle";
					
					var noIdx = 0;
					var brElem = document.createElement('br');
					
					for (var i=lastIdx; i<elements.length; i++){
						if (noIdx>=20){noIdx=0; div.appendChild(brElem);}
						var img = document.createElement('img');
						img.setAttribute('id','imgRep#'+elements[i]);
						var space = document.createElement('span');
						space.innerHTML = " ";
						img.src = document.getElementById('img#'+elements[i]).getElementsByTagName('img')[0].getAttribute('src');
						img.width = "20";
						img.height = "20";
						img.style.cursor = "pointer";
						div.appendChild(img);
						div.appendChild(space);
						img.addEventListener('click', 
							methodCall(
								this,
								'insertBuddy',
								messageBox, 
								document.getElementById('img#'+elements[i]).getElementsByTagName('img')[0].getAttribute('src'), 
								document.getElementById('com#'+elements[i]).getElementsByTagName('a')[0].getAttribute('href'),
								-elements[i],
								1
							),
						true);	
						noIdx++;
					}
					
					var comDiv = comments.getElementsByTagName('div')[0];
					comDiv.appendChild(div);
				}

			}else{
				var dissComm = document.getElementById("DiscussTopic");
				var tabela = dissComm.getElementsByTagName("table");
				var dissMBox = tabela[1].getElementsByTagName("textarea")[0];
			
				for (var i=0; i<tabela[1].rows.length-1; i++){
					
					if (tabela[1].rows[i].cells[1].getElementsByTagName("a")[0].firstChild.nodeValue == unsafeWindow.global_name ||  
							tabela[1].rows[i].cells[1].getElementsByTagName("a")[0].firstChild.nodeValue == null){
						lastIdx = i;
						last = true; 
					}
				}
				
				if (!last) lastIdx=-1;
				
				
				
				for (var i=lastIdx+1; i<tabela[1].rows.length; i++){
					var t = "";
					var p = tabela[1].rows[i].cells[1].getElementsByTagName("p")[0];
					p.setAttribute('id','comm#'+i);
					
					replay = tabela[1].rows[i].insertCell(2);
					var small = document.createElement('small');
					var link = document.createElement('a');
					link.setAttribute('class','Plain');
					link.innerHTML = "Reply"; 
					small.appendChild(link);
					replay.appendChild(small); 
					
					link.addEventListener('click', 
					 					methodCall(
					 						this,
					 						'insertBuddy',
					 						dissMBox, 
											tabela[1].rows[i].cells[0].childNodes[0].childNodes[0].attributes[3].nodeValue,
											tabela[1].rows[i].cells[0].childNodes[0].attributes[1].nodeValue,
											i,
											0
					 					),
					 				true);
				}
			}
		},
		
		insertBuddy: function(messageBox, img, href, n, group){		
			var t = "";
			var gr = "";
			
			if (n>0){
				var ans = window.confirm("Do you want to quote?");
				
				if(ans){
					t+="\n<blockquote>'";
					var tempt = "";
					var p = document.getElementById("comm#"+n);
					for (var pidx=0; pidx<p.childNodes.length; pidx++){
						if (p.childNodes[pidx].tagName == 'small'){
							break;
						}else{
							tempt+=p.childNodes[pidx].nodeValue;
						}
					}
					tempt=tempt.substr(0,tempt.length-40).replace(/^\s+/, "").replace(/\s+$/, "").replace(/null/ig,"</br>");
					t+=tempt+"'</blockquote>";
				}
			}
			
			if (group==0){
				gr = ": \n\n";
			}
			
			var message = messageBox.value.split('--');
			
			if (messageBox.value != ''){
				if (messageBox.value.indexOf('--')<0){
					messageBox.value+="<a href='"+href+"'><img src='"+img+"' width='24' height='24'/></a>"+t+gr+" ";
				}else{
					if (message[0] == '\n\n'){
						messageBox.value="<a href='"+href+"'><img src='"+img+"' width='24' height='24'/></a>"+t+gr+" \n\n--"+message[1];
					}else{
						if (group==1){
							message[0] = message[0].replace(/\s+$/, "")+" ";
						}
						messageBox.value=message[0]+"<a href='"+href+"'><img src='"+img+"' width='24' height='24'/></a>"+t+gr+" \n\n--"+message[1];
					}
				}
			}else{
				messageBox.value+="<a href='"+href+"'><img src='"+img+"' width='24' height='24'/></a>"+t+gr+" ";
			}
			var elem2clear = document.getElementById('comRep#'+(-n));
			elem2clear.style.display="none";
			elem2clear = document.getElementById('imgRep#'+(-n));
			elem2clear.style.display="none";
			messageBox.focus();
		},

		getElementsByClassName: function( strClassName, obj ) {
		    if ( obj.className == strClassName ) {
		        classElements[classElements.length] = obj;
		    }
		    for ( var i = 0; i < obj.childNodes.length; i++ )
		        methodCall_comment(this,'getElementsByClassName', strClassName, obj.childNodes[i] );
		}
	}
	
	try {
			window.addEventListener("load", function () {
				try {
					win.UserScriptUpdates.requestAutomaticUpdates(SCRIPT);
				} catch (ex) {}

				var flickrcr = new FlickrCommentReplayer();
			}, false);
		} catch (ex) {}

})();