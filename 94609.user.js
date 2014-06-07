// ==UserScript==
// @name           YouTube HTML5 forever
// @namespace      ythtml5
// @description    Enables YouTube HTML5 permanently
// @include        http://*youtube.com/*
// ==/UserScript==


//Use embed inside youtube - workaround for HTML5
if(window.location.href.indexOf('/watch') > -1){
	//Video page
	video = document.getElementById('watch-player');
	id = window.location.href.split('v=')[1].split('&')[0].split('#')[0];
	video.innerHTML = '<iframe src="http://www.youtube.com/embed/'+id+'" style="width:100%;height:100%;overflow:auto;"></iframe>';
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
