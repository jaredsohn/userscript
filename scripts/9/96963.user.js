// ==UserScript==
// @name        Mediafire Video Player
// @namespace   RedAnime
// @version			1.1
// @date			14/02/2011
// @author			JNeutron
// @description Mediafire Video Player
// @include     *.mediafire.*/?*
// @exclude      *.mediafire.*/?sharekey*
// ==/UserScript==
(function(){
    var url = window.location.href;
    if(url.indexOf('#!RA_video') > 0){
        document.title = "Procesando video... - Red Anime";
        var mask = document.getElementById('catfish_div');
        var diag = document.getElementById('sharing_popup');
        // MASK
        mask.innerHTML = '';
        mask.style.top = 0;
        mask.style.left = 0;
        mask.style.position = 'fixed';
        mask.style.backgroundColor = '#111';
        mask.style.opacity = '0.6';
        mask.style.height = document.height + 'px';
        mask.style.width = document.width + 'px';
        // DIALOG
        diag.style.width = '300px';
        diag.style.display = 'block';
        diag.style.border = '3px solid #B5AF9F';
        diag.style.textAlign = 'center';
        diag.style.zIndex = '1000001';
        diag.style.backgroundColor = '#F4F1E9';
        diag.style.position = 'fixed';
        diag.style.padding = '25px';
        diag.style.fontWeight = 'bold';
        diag.innerHTML = '<img src="http://static.ak.fbcdn.net/rsrc.php/yb/r/GsNJNwuI-UM.gif"/> Cargando video...';
        var x = (document.width / 2) - 150;
        var y = (document.height / 2) - 50;
        diag.style.left = x + 'px';
        diag.style.top = y + 'px';
        //
        window.addEventListener(
        	'load',
        	function(){
        		var allElement = document.getElementsByTagName('div');
        		for (var i=0;i< allElement.length;i++){
        			thisElement = allElement[i];
        			if (thisElement.getAttribute("style")=="display: block;"){
        				var aElm = thisElement.getElementsByTagName('a');
        				var video_path = (aElm[0].getAttribute("href"));
        				window.location.href = 'http://www.japon.in/hentai/video.php?v=' + encodeURIComponent(video_path);
        			}
        		}
        	},
        	true
        )   
    }
})();