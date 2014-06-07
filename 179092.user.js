// ==UserScript==
// @name       Yet Another Reddit Images Script
// @namespace  http://use.i.E.your.homepage/
// @version    0.1.5
// @description  Simple and fast inline image loader for reddit
// @match      http://www.reddit.com/*
// @copyright  2013+, WeirdCarrotMonster
// ==/UserScript==

function getImg(url){
    return "<br/><a href='" + url + "'><img style: style='max-height: 500px; max-width: 50%' src='" + url + "'/></a>";
}

function parseUrl(url){
    var re = /jpg$|jpeg$|png$|gif$/i;
    var result = null;
    if(url.search(re) != -1){
        result = getImg(url);
	}
	else if(url.indexOf('imgur') > -1){
        url = url.replace("/gallery/","/a/");
        url = url.replace("m.","a.");
        if(url.indexOf("/a/") > -1){
            if(url.indexOf("#") > -1){
                url = url.substring(0, url.indexOf("#"));
            }
           	result = "<iframe class='imgur-album' width='50%' height='550' frameborder='0' src='" + url + "/embed'></iframe>"
        }
        else{
           result = getImg(url + ".jpg");
        }
	}
	else if(url.indexOf('quickmeme') > -1){
		code = url.split('/')[4];
        result = getImg("http://i.qkme.me/" + code + ".jpg");
	}
	else if(url.indexOf('qkme') > -1){
		code = url.split('/')[3];
		if(code.indexOf('?id') > -1){
			code = code.split('?')[0];
		}
		result = getImg("http://i.qkme.me/" + code + ".jpg");
	}
    else if(url.indexOf('youtube') > -1){
        var video_id = url.split('v=')[1];
        try {
			var ampersandPosition = video_id.indexOf('&');
			if(ampersandPosition != -1) {
	  			video_id = video_id.substring(0, ampersandPosition);
			}
            result = '<object width="560" height="315">\
				  <param name="movie" value="//www.youtube.com/v/'+video_id+'?hl=ru_RU&amp;version=3">\
				  </param><param name="allowFullScreen" value="true">\
				  </param><param name="allowscriptaccess" value="always">\
                  </param><embed src="//www.youtube.com/v/'+video_id+'?hl=ru_RU&amp;version=3"\
							     type="application/x-shockwave-flash" width="560" height="315"\
								 allowscriptaccess="always" allowfullscreen="true">\
				  </embed></object>';
        }catch(e){}
    }
    return result;
}

$("#siteTable").find(".thing").each(function(){
    var post = $(this).find(".title .loggedin")[0];
    var result = parseUrl($(post).attr("href"));
    if (result){
        $(post).parent().after(result);
    }
})
