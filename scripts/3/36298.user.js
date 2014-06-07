// ==UserScript==

// @name           Ngintip Friendster - kepeto
// @namespace      Ngintip Friendster
// @description    Skrip Untuk ngintip private picture dari teman kamu di friendster. credit goes to aristia@KASKUS
// @include        http://www.friendster.com/*
// @include        http://*.friendster.com/*
// @include        http://friendster.com/*
// ==/UserScript==

// versi 			0.2a
//kalo pingin modif silahkan, tapi jangan lupa naroh KREDIT nya

var mylogo = 'http://img514.imageshack.us/img514/9733/fsmatakepetorh9.jpg';

function inject(logo)
{
	logo = '<div id="t2l-button" style="border: 2px solid rgb(0, 0, 0); padding: 5px; position: fixed; bottom: 40px; right: 10px; background-color: rgb(255, 255, 255); text-align: center;"><p style="margin: 0pt; padding: 0pt; font-family: Arial,Helvetica,sans-serif; font-style: normal; font-variant: normal; font-weight: normal; font-size: 12px; line-height: normal; font-size-adjust: none; font-stretch: normal; color: rgb(102, 97, 152); text-decoration: none;"><span id="t2l-span-1" style="color: rgb(255, 0, 0); cursor: pointer;"><div align="center"><a href="http://kepeto.profilku.com"><img src="'+logo+'"/></a><br/>&copy;kepeto</div></span></p></div>';
	
	elements = document.getElementsByTagName("body");
	for (i = 0; i < elements.length; i++){
		elements[i].innerHTML = logo+elements[0].innerHTML;
	}
}

function parse_link()
{
	var tag = document.getElementsByTagName('a');
			
	for(i=0; i<tag.length; i++)
	{
		var match = /private_m/i;
		if(match.test(tag[i].firstChild.src))
		{	
			thumbnail = tag[i].firstChild.src.replace('www.friendster.com/image-server.php','photos.friendster.com/photos');
			original = thumbnail.replace('private_m','private_l');
			tag[i].firstChild.src = thumbnail;
			tag[i].href = original;
		}
	}
	
	if(document.baseURI.match(/privatephotos/i)!=null)
		inject(mylogo);
}

// abort AJAX request
function abortXMLHttpRequest(request_id) {
    if (!XmlRequests[request_id]) {
        return true;
    }
    if (XmlRequests[request_id].readyState < 4) {
        XmlRequests[request_id].abort();
        return false;
    }
    return true;
}

parse_link();