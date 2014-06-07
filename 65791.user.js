// ==UserScript==
// @name           Tube8 Video Downloader
// @description    Replaces "Download Video" link with direct link to video (.flv)
// @include       http://www.tube8.com/*
// @creator 	Originally by DeepOne; modified by rodolfo42 to fit current tube8.com layout
// ==/UserScript==

 var v_url = document.URL;
 var v_mediaSource;
 var v_vidstr;

  function tube8()
  {
    var a_embeds = document.getElementById("flvplayer").getElementsByTagName("param");
    var v_vars;
    var a_params;
    var v_pname;
	
	for(var i = 0; i < a_embeds.length; i++) {
		if (a_embeds[i].name == "flashvars") {
			v_vars = a_embeds[i].getAttribute("value");
			a_params = v_vars.split("&");
			for(var a = 0; a < a_params.length; a++)
			{
			  v_pname = a_params[a].split("=");
			  if(v_pname[0] == "videoUrl")
			  {
				v_mediaSource = v_pname[1];
				replaceLink();
				return;
			  }
			}
		}
	}
  }

  function replaceLink()
  {
    var hrefNodes = document.getElementsByClassName('btn-01 main-sprite-img relative');
    for(var a = 0; a < hrefNodes.length; a++)
    {
      if(hrefNodes[a].getAttribute('href') && (hrefNodes[a].getAttribute('href').substr(0,26) == "javascript:downloadVideo()"))
      {
        hrefNodes[a].setAttribute('href', v_mediaSource);
      }
    }
  }

 v_vidstr = v_url.match(/^http:\/\/www\.tube8\.com\/\w+\/(\S+)\/(\d+)\/$/);
 if(v_vidstr != null)
 {
   tube8();
 }
