// ==UserScript==
// @name          dvp_youtube
// @namespace     http://blog.developpez.com/rsharp
// @description   les vidéos youtube sur http://chat.developpez.com/
// @include       http://chat.developpez.com/
// ==/UserScript==

function getGlobal(callback) {
	
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.textContent = "(" + callback.toString() + ")();";
	document.body.appendChild(script);
	
}

function main(){
	$("#barreOutils").append('<input id="enable_video" type="checkbox" /> autoriser les vidéos');
	
	var video_width = 448;
	var video_height = 252;
	
	function str_replace(str){
	var id;
	var embed;
	var reg=new RegExp("[?&]+", "g");
	var reg2 = new RegExp("[=]+","g");
	var reg3 = new RegExp("[/_]+","g");
			var tableau = str.split(reg);
			var tableau2 = str.split(reg3);
			var tableau3 = str.split(reg3);
			if(tableau2.length>2 && str.indexOf("://vimeo.com/")>0){
				id = tableau2[2];
				return '<iframe src="http://player.vimeo.com/video/61969130" width="'+video_width+'" height="'+video_height+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe> ';	
			}
			if(tableau2.length>3 && str.indexOf("/www.dailymotion.com")>0){
				id = tableau2[3];
				return '<iframe frameborder="0" width="'+video_width+'" height="'+video_height+'" src="http://www.dailymotion.com/embed/video/'+id+'" allowfullscreen></iframe>';
			}
			for(var i=0; i<tableau.length; i++){
				var tab = tableau[i].split(reg2);
				if(tab[0]=="v"){
					id = tab[1];
					if(str.indexOf("/www.youtube.com/watch")>0)
					return '<iframe width="'+video_width+'" height="'+video_height+'" src="http://www.youtube.com/embed/'+id+'" frameborder="0" allowfullscreen></iframe>';
				}
			}	
	return "";
	}

	var lock = 0;
	var nb_links = 0;
	

	function links_to_videos(){
		var links = document.getElementById("conversations").getElementsByTagName("a");
		for(var i=0; i<links.length; i++){
			var str = links[i].getAttribute("href").toString();
			var inner = links[i].innerHTML.toString();
			if(str.indexOf("://www.youtube.com/watch?")>0||
				str.indexOf("://www.dailymotion.com/video/")>0||
				str.indexOf("://vimeo.com/")>0){
				if(inner.indexOf("frame ")>0||inner.indexOf("img ")>0)continue;
				links[i].innerHTML = str_replace(str);
			}else{
				
			}
		}
	}

	function videos_to_links(){
		var links = document.getElementById("conversations").getElementsByTagName("a");
		for(var i=0; i<links.length; i++){
			var str = links[i].innerHTML.toString();
			if(str.indexOf("youtube")>0||str.indexOf("dailymotion")>0||str.indexOf("vimeo")>0){
				links[i].innerHTML = links[i].getAttribute("href");
			}
		}
	}
	
	function contains(id,s){
		if(document.getElementById(id).getElementsByTagName("td")[0].innerText.indexOf(s)==-1)return false;
		return true;
	}
	
	function video_action(){
		if(contains("onglet0","Développement Web")||contains("onglet0","Développement Applicatif")||
			contains("onglet0","Base de données")||contains("onglet0","Jeux B"))video_to_links();
		if($("#enable_video").is(":checked") ){links_to_videos();}
		else if(!$("#enable_video").is(":checked")){videos_to_links();}
	}
	
	$(document).ajaxComplete(function(){video_action();});
}

getGlobal(main);
