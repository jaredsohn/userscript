// ==UserScript==
// @name           FaceBook #Buffer
// @namespace      http://www.freeunloco.com
// @include        http://*.facebook.com*
// @include        http://www.facebook.com/share.php
// ==/UserScript==

//Declarations
facebookNewPlayer = "http://img29.imageshack.us/img29/8678/playerp.swf"
facebookFlashVars = "id=n0&controlbar=bottom&height=344&playlist=none&skin=http://img200.imageshack.us/img200/5576/stylish.swf&width=425&autostart=false&bufferlength=1&displayclick=play&icons=true&linktarget=_blank&mute=false&quality=true&repeat=none&resizing=true&shuffle=false&stretching=uniform&volume=100&aboutlink=http://www.longtailvideo.com/players/&file="
//return;

	//getElementById -- $(id)
	function $(str){
		return document.getElementById(str)
	}
	
	//the function gets the Embed and searches for the video link
	function getEmLink(Embed,linkAttr,ext){
			//get the link
			var vars = Embed.getAttribute('flashvars');
			var idx = vars.indexOf(linkAttr + '=http');
			var mp = vars.indexOf('.'+ext);
			var link = vars.slice(idx+10, mp + ext.length +1);
			link=link.replace(/%3A/gi,':');
			link=link.replace(/%2F/gi,'/');
			return link
	}
	
	//Mouse Out
	window.addEventListener('mouseout',function(e){
	
		if (e.target.tagName != 'EMBED' && e.target.tagName != 'IMG')return; // If It's Not An Embed Do nothing
		
		//Get All Embeds In Document
		allFLVs = document.evaluate(
					'//EMBED',
					document,
					null,
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
					null);
		
		//For Every Embed ...
		for (var i = 0; i < allFLVs.snapshotLength; i++) {
			flv = allFLVs.snapshotItem(i);    
			if(flv && flv.id!='done' && flv.id!='false' && flv.id!='so_sound_player'){
			// .. which does not have the "links" already ..
			
			// .. add the stop & download "links"
			var remdl = document.createElement('div'); // remdl :: remove/download
			remdl.setAttribute('id','remdl');
			remdl.innerHTML = "<a id='changeswf' title='change to a better player'>Change</a>&nbsp;&nbsp;<a id='stop' title='stop the buffering video'>Stop</a>&nbsp;&nbsp;<a id='down' title='use right click / save as.. to download' target='_blank'>Download</a>";
			flv.parentNode.parentNode.insertBefore(remdl,flv.parentNode.nextSibling);
			flv.id='done';	//set it done	
			//get and set the download link
			ck = document.getElementById("down")
			//get the flash vars
			var Em = ck.parentNode.previousSibling.firstChild
			ck.href = getEmLink(Em,"video_src","mp4")
			}
		}   
	},false);

	window.addEventListener('mousedown',function(e){
		if(e.button!=0){return;} //Only If Left Clicked
		ck = e.target;

		//Stop The Buffering & Hide the EMBED
		if (ck.innerHTML == 'Stop' && (ck.id == "stop" || ck.id == "false")){
			var hld = ck.parentNode.previousSibling.id;
			hld = hld.slice(0,hld.length-7);
			var Em = ck.parentNode.previousSibling.firstChild
			Em.setAttribute("source",Em.src)
			Em.src="" //hide the Embed
			ck.id = "resume"
			ck.innerHTML= "Play"
			return
		}

		//Regain The Buffering & Restore The EMBED
		if (ck.innerHTML == 'Play' && (ck.id == "resume" || ck.id == "false")){
			var Em = ck.parentNode.previousSibling.firstChild //The Embed
			Em.getAttribute("source") 
			Em.src = Em.getAttribute("source") //Get it back
			ck.id = "stop"
			ck.innerHTML= "Stop"
		}
		
		if (ck.innerHTML == 'Change' && (ck.id == "changeswf" || ck.id == "false")){
			var Em = ck.parentNode.previousSibling.firstChild //The Embed
			var lnk = getEmLink(Em,"video_src","mp4")
			var flVars = facebookFlashVars + lnk
			Em.setAttribute("flashvars",flVars)
			Em.src = facebookNewPlayer
		}
		
		if (ck.innerHTML == "All" && ck.tagName == "DIV"){
			setTimeout("for ( x in $('friends').childNodes){window.fs.click($('friends').childNodes[x])};",0) // select all friends
			//select all friends at invite ..
		}
		
	},false);

	window.addEventListener('load',function(e){
		try{
		return;
			if ($('filters')){
				var funct = "for ( x in $('friends').childNodes){fs.click($('friends').childNodes[x])}";
				var inh = '<li class="PillFilter_filter  Tabset_selected" id="_select_all"><a href="#" id="_select_all_anchor"></a><div class="tl"><div class="tr"><div class="br"><div class="bl"><a style="cursor:pointer" onclick="'+ funct + '" title="by Facebook #Buffer">Select All</a></div></div></div></div></li>'
				var ul = document.getElementsByClassName('PillFilter_pillfilter Tabset_tabset')[0]
				ul.innerHTML = inh + ul.innerHTML
			}
		}catch(ex){}
	},false);
	
	
//Extra Docs

//FlashVars
//id=n0&controlbar=bottom&height=344&playlist=none&skin=http://img200.imageshack.us/img200/5576/stylish.swf&width=425&autostart=false&bufferlength=1&displayclick=play&icons=true&linktarget=_blank&mute=false&quality=true&repeat=none&resizing=true&shuffle=false&stretching=uniform&volume=100&aboutlink=http://www.longtailvideo.com/players/&file=

//Hosted FlashPlayer
//Style : http://img200.imageshack.us/img200/5576/stylish.swf
//Player : http://img29.imageshack.us/img29/8678/playerp.swf

