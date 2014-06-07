// ==UserScript==
// @name	    	Youtube Downloader 1.5
// @description 	Downloade audio or video from youtube.
// @include	    	http://*youtube.com/watch*
// @version	    	1.5
// @author	    	Gorenc01 (Jan Oblak)
// ==/UserScript==

function $(i) {
	return document.getElementById(i);
}

var Downloader = {
 	fmt_list : [
		{ name : "FLV", fmtv : 5  }, 
		{ name : "MP4", fmtv : 18 },
		{ name : "3GP", fmtv : 17 }
	],
	
	vid_attr : { 
		base : function() {
			var scripts = document.getElementsByTagName("SCRIPT");
			var found = "no";
			
			for (var s in scripts) {
				if (scripts[s].innerHTML.indexOf("'VIDEO_ID': '") > -1 && found == "no") {
					found = scripts[s];
				}
			}
			
			return found;
		},
		
		id : function() {			
			var j = this.base().innerHTML.indexOf("'VIDEO_ID': '") + "'VIDEO_ID': '".length;
			var k = this.base().innerHTML.indexOf("'", j+1);
			
			return this.base().innerHTML.substring(j, k);	
		}, 
		
		t : function() {
			var m = this.base().innerHTML.indexOf('"t": "') + '"t": "'.length;
			var n = this.base().innerHTML.indexOf('"', m + 1);
			
			return this.base().innerHTML.substring(m, n);			
		},
		
		hd : function() {
			var o = this.base().innerHTML.indexOf("'IS_HD_AVAILABLE': ") + "'IS_HD_AVAILABLE': ".length;
			var p = this.base().innerHTML.indexOf(",", o);
			
			return new String(this.base().innerHTML.substring(o, p));			
		}
	 },

	_createHolder : function(attr, content) {
		h = document.createElement("div");
		h . innerHTML = typeof content == "function" ? content() : content;
		
		for (var t in attr) {
			if (attr[t])
				h.setAttribute(t, attr[t]);
		}	

		$("watch-this-vid-info").insertBefore(h, $("watch-this-vid-info").firstChild);	
	},
	
	_convertAudio : function(a) {
	 	
		$("download_holder").innerHTML += ("&nbsp; &bull; &nbsp;");
		$("download_holder").innerHTML += ("<span id='audio_rip'>Ripping Audio...</span>");
		
		this.timers._Load('Ripping Audio');  
		
		var RIP_START = (new Date).getTime();
		var STG_DELAY = 4200;
		
		GM_xmlhttpRequest({
			method : 'GET',
			url    : 'http://www.abcyoutube.com/watch?v=' + Downloader.vid_attr.id(),
			onload : function (response) {
				var RIP_DELAY = (new Date).getTime() - RIP_START;
					RIP_DELAY = RIP_DELAY < STG_DELAY ? STG_DELAY - RIP_DELAY : 0;	
				
				setTimeout(function(){					 
					$("audio_rip").innerHTML = "Converting Audio to MP3...";
					Downloader.timers._Load('Converting Audio to MP3'); 
					
					var a = response.responseText.indexOf("download.php");
					var b = response.responseText.indexOf("download.php", a + 1);
					var c = response.responseText.indexOf("site=youtube", b);
					var d = response.responseText.substring(b, c);
						d = d + "site=youtube";
					
					var CON_START = (new Date).getTime();
					
					GM_xmlhttpRequest({
						method : 'GET',
						url    : 'http://www.abcyoutube.com/' + d,
						onload : function (r) {
							var CON_DELAY = (new Date).getTime() - CON_START;
								CON_DELAY = CON_DELAY < STG_DELAY ? STG_DELAY - CON_DELAY : 0; 
													
							setTimeout(function(){
								Downloader.timers._Kill('rip');
								$("audio_rip").innerHTML = Downloader._debugAudio(r.responseText);
							}, CON_DELAY);
						}
					});	
				}, RIP_DELAY);
			}
		});
	}, 
	
	_debugAudio : function(s) {
		var a = s.indexOf("../c") + 3;
		var b = s.indexOf(".mp3");
		var c = s.substring(a, b); //     converted{n}/${17}
		var d = "<a href='http://www.abcyoutube.com/"+ c +".mp3'>Download MP3</a>";
		var	e = function(t) {
			return "<a href='' style='color:red;' onclick=\"alert('"+ t +"');return false;\">ERROR: Download MP3</a>";			
		}

		if (s.indexOf("The File is very") > -1) {		
			return e("ERROR: The video size is too large to convert!");
		}
		
		if (s.indexOf("Sorry, the URL") > -1) {
			return e("ERROR: Failed to connect to the conversion server!");
		}
		
		if (s.indexOf("memory") > -1) {
			return e("ERROR: Unknown error, \"Out of Memory (byte allocation failure)\"");
		}
		
		if (s.indexOf("Fatal ") > -1) {
			return e("ERROR: Unknown error. Terminating Conversion.");
		}	

		return d;
	}, 
	
	timers : {
		_Load : function(t) {
			var h = $("audio_rip").innerHTML;
			var p = [
				[t + "&nbsp;&nbsp;&nbsp;", t + ".&nbsp;&nbsp;"],
				[t + ".&nbsp;&nbsp;", t + "..&nbsp;"],
				[t + "..&nbsp;", t + "..."],
				[t + "...", t + "&nbsp;&nbsp;&nbsp;"]
			];
			
			switch (h) {
				case p[0][0]: $("audio_rip").innerHTML = p[0][1]; break;
				case p[1][0]: $("audio_rip").innerHTML = p[1][1]; break;
				case p[2][0]: $("audio_rip").innerHTML = p[2][1]; break;
				case p[3][0]: $("audio_rip").innerHTML = p[3][1]; break;
			}
		
			Downloader.timers['rip'] = setTimeout(function(){ Downloader.timers._Load(t) }, 400);
		},
		
		_Kill : function(n) {
			clearTimeout(this[n]);
		}
	}
};

// Initialise //

Downloader._createHolder({
	id    : "download_holder",
	style : "border:1px solid #e8e8e8;font-weight:bold;padding:4.5px;margin-top:5px;text-align:center;"
}, function() {	
 	if (Downloader.vid_attr.hd() == "true") {
		Downloader.fmt_list.push({ name : "MP4 HD", fmtv : 22 });
	}
	
	
	var r = "";
	
	for (var v in Downloader.fmt_list) {
		r += (v > 0) ? "&nbsp; &bull; &nbsp;" : "";
		r += "<a href='/get_video?video_id="+ Downloader.vid_attr.id() +"&t="+ Downloader.vid_attr.t() +"&fmt="+ Downloader.fmt_list[v].fmtv +"'>";
		r += "Download "+ Downloader.fmt_list[v].name +"</a>";
	}
	
	return r;
});

// Audio Setup //

Downloader._convertAudio();