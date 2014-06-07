// ==UserScript==
// @name           YouTube HTML5 forever (improved)
// @namespace      ythtml5
// @description    Enables YouTube HTML5 permanently
// @include        http://*youtube.com/*
// @include        https://*youtube.com/*
// @version        1.1.2
// ==/UserScript==
//Use embed inside youtube - workaround for HTML5

//Config
//Video quality
//////////////////////////
//videoquality = "hd1080";
videoquality = "large";
//////////////////////
/////////////////////
////////////////////


if(window.location.href.indexOf('/watch') > -1 && document.querySelectorAll(".html5-video-container").length == 0){
	//Video page
	video = document.getElementById('watch7-player');
	id = window.location.href.split('v=')[1].split('&')[0].split('#')[0];
	video.innerHTML = '<iframe src="http://www.youtube.com/embed/'+id+'?vq='+videoquality+'&rel=0" style="width:100%;height:100%;overflow:auto;" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
}
//Check if HTML5 is on
GM_xmlhttpRequest({
  method: "GET",
  url: "http://www.youtube.com/html5",
  onload: function(response) {
	//if it's disabled, we enable it
	if(response.responseText.indexOf("disable_html5") == -1)
	{
		//get the security token
        token = response.responseText.split("XSRF_TOKEN': '")[1].split("'")[0];
        
        //enable html5
        GM_xmlhttpRequest({
          method: "POST",
          url: "http://www.youtube.com/html5",
          data: 'enable_html5=true&session_token='+token,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          onload: function(response) {
			  unsafeWindow.location.reload();
		  }
        });
    }
  }
});