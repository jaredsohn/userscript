// ==UserScript==
// @name            YouTube - Mute songs
// @author          Richard Gilbert
// @namespace       http://youtube.com/ricard0dude
// @description     Mute particular songs or artists on all videos with recognised music info. (Mute links added below the music info)
// @license         Creative Commons Attribution License
// @version	        1.0
// @include         http://youtube.com/watch?v=*
// @include         http://www.youtube.com/watch?v=*
// @released        2011-11-02
// ==/UserScript==

//create script element
var script = document.createElement('script');

function add(source) {
	//add to script
	script.textContent = script.textContent+source;
}

function addrun(source) {
	//add main code
	script.textContent = script.textContent+'('+source+')();';
	//set attributes
	script.setAttribute("type", "application/javascript");
	script.setAttribute("id", "muteScript");
	//append to page
	document.body.appendChild(script);
}

if(document.getElementById("watch-description-extra-info").innerHTML.indexOf('Artist: <span class="link-like">')!=-1){
	//if page has music info, run code
	
	//add variables
	add('var artist, song, aindex, sindex, artistlink, songlink, alist, slist;');
	
	//add functions
	add(
		function mute(){
			//keep trying to mute every 0.1s
			try{
				document.getElementById('movie_player').mute();
			}catch(err){
				var t =setTimeout("mute()",100);
			}
		} 
	);

	add(
		function muteArtist(){
			//add artist to list
			alist.push(artist);
			aindex=alist.length-1;
			//update artists cookie
			setCookie("alist",alist,1000);
			//update links
			artistlink.href="javascript:unmuteArtist()";
			artistlink.innerHTML=artistlink.innerHTML.replace("Mute","Unmute");
			//mute
			document.getElementById('movie_player').mute();
		}
	);

	add(
		function unmuteArtist(){
			//remove artist from list
			alist.splice(aindex,1);
			//update artists cookie
			setCookie("alist",alist,1000);
			//update links
			artistlink.href="javascript:muteArtist()";
			artistlink.innerHTML=artistlink.innerHTML.replace("Unmute","Mute");
			//unmute
			document.getElementById('movie_player').unMute();
		}
	);

	add(
		function muteSong(){
			//add song to list
			slist.push(song+"--"+artist);
			sindex=slist.length-1;
			//update songs cookie
			setCookie("slist",slist,1000);
			//update links
			songlink.href="javascript:unmuteSong()";
			songlink.innerHTML=songlink.innerHTML.replace("Mute","Unmute");
			//mute
			document.getElementById('movie_player').mute();
		}
	);

	add(
		function unmuteSong(){
			//remove song from list
			slist.splice(sindex,1);
			//update songs cookie
			setCookie("slist",slist,1000);
			//update links
			songlink.href="javascript:muteSong()";
			songlink.innerHTML=songlink.innerHTML.replace("Unmute","Mute");
			//unmute
			document.getElementById('movie_player').unMute();
		}
	);

	add(
		function getCookie(c_name){
			var i,x,y,ARRcookies=document.cookie.split(";");
			for (i=0;i<ARRcookies.length;i++)
			  {
			  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			  x=x.replace(/^\s+|\s+$/g,"");
			  if (x==c_name)
				{
				return unescape(y);
				}
			  }
		}
	);

	add(
		function setCookie(c_name,value,exdays){
			var exdate=new Date();
			exdate.setDate(exdate.getDate() + exdays);
			var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
			document.cookie=c_name + "=" + c_value;
		}
	);

	//add and run the following function
	addrun(
		function() {
			//get "extra info" element
			var extra = document.getElementById("watch-description-extra-info");
			var html = extra.innerHTML;

			//artist blacklist
			alist = getCookie("alist");
			if(alist!=null){
				alist = alist.split(',');
			}else{
				alist = new Array();
				alist[0]="null";
			}

			//song blacklist
			slist = getCookie("slist");
			if(slist!=null){
				slist = slist.split(',');
			}else{
				slist = new Array(1);
				slist[0]="null--null";
			}

			//get artist name
			var aFrom = html.indexOf('Artist: <span class="link-like">')+32;
			var aTo = html.indexOf('</span>',aFrom);
			artist = html.substring(aFrom,aTo);

			//get song name
			var sFrom = html.indexOf('Buy "')+5;
			var sTo = html.indexOf('" on:',sFrom);
			song = html.substring(sFrom,sTo);

			var afound = false;
			var sfound = false;
			
			//check if artist blocked
			for(i=0;i<alist.length;i++){
				if(alist[i]==artist){
					mute();
					afound = true;
					aindex = i;
				}
			}
			
			//check if song blocked
			for(i=0;i<slist.length;i++){
				if(slist[i].split("--")[0]==song&&slist[i].split("--")[1]==artist){
					mute();
					sfound = true;
					sindex = i;
				}
			}
			
			//add artist link
			if(afound){
				html=html+'<li class="full-link"><a id="muteartist" href="javascript:unmuteArtist()"><span class="link-like">Unmute artist: "'+artist+'"</span></a></li>';
			}else{
				html=html+'<li class="full-link"><a id="muteartist" href="javascript:muteArtist()"><span class="link-like">Mute artist: "'+artist+'"</span></a></li>';
			}
				
			//add song link
			if(sfound){
				extra.innerHTML=html+'<li class="full-link"><a id="mutesong" href="javascript:unmuteSong();"><span class="link-like">Unmute song: "'+song+'"</span></a></li>';
			}else{
				extra.innerHTML=html+'<li class="full-link"><a id="mutesong" href="javascript:muteSong();"><span class="link-like">Mute song: "'+song+'"</span></a></li>';
			}

			//get link elements
			artistlink = document.getElementById("muteartist");
			songlink = document.getElementById("mutesong");
		}
	);
}

