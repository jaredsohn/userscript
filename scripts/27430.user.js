// ==UserScript==
// @name           YouTube 2
// @namespace      None
// @description    Improves YouTube
// @include        http://*youtube.*/*
// ==/UserScript==

function Hide(_id)
{
	var tmp = document.getElementById(_id);
	if ( tmp != null )
		tmp.style.display = 'none';
}

Hide('watch-embed-div');
Hide('watch-active-sharing');
Hide('watch-active-sharing');
Hide('watch-comments-stats');
Hide('watch-promoted-container');
Hide('footer');

document.getElementById('watch-channel-vids-top').innerHTML = "<center style='padding-top:5px'><b>" + document.getElementById('watch-view-count').innerHTML + " views</center></b>";

Hide('watch-ratings-views');
Hide('copyright');

HideExtraElements();
var url = GetDownloadPath();

document.getElementById('watch-actions-area').innerHTML = GetLink( "Toggle comments" , "document.getElementById('watch-comments-stats').style.display=(document.getElementById('watch-comments-stats').style.display == 'none')?'block':'none'" );
document.getElementById('watch-actions-area').innerHTML += " | "
document.getElementById('watch-actions-area').innerHTML += GetLink( "Download" , "document.location.href = '" + url + "'" );

document.getElementById('masthead').innerHTML = '<center><form action="/results" method="get" name="searchForm" onsubmit="return submitRegularSearchRequest()"><input id="search-term" name="q" type="text" tabindex="1" "goog.i18n.bidi.setDirAttribute(event,this)"  value="" maxlength="128" /><input id="search-button" type="submit" value="Search" style="display:none;" />';

//document.getElementById('masthead').class = 'bar'; //search-

function GetLink( title , target )
{
	return '<span style="cursor:pointer;color:blue;" onclick="' + target + '">' + title + '</span>';
}


function in2html(txt) {
 if (!txt) {
  return ''
 }
 var txthtml = txt.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
 return (txthtml);
}



function GetDownloadPath()
{
   scriptmedia = document.getElementsByTagName('script');
   for (i=0;i<scriptmedia.length;++i) {
		if (scriptmedia[i].text.match(/video_id=\S+&.+&t=.+&/i) !== null)
		{
			 source = scriptmedia[i].text.match(/video_id=\S+&.+&t=.+&/i);
			 source = in2html(String(source).replace(/(video_id=\S+)&.+(&t=.+)&/i,'http:\/\/www.youtube.com\/get_video?$1$2'));
			 return source;
		}
   }
   return "";
}

function HideExtraElements()
{
   scriptmedia = document.getElementsByTagName('span');
   for (i=0;i<scriptmedia.length;++i) {
		if (scriptmedia[i].innerHTML == 'Promoted Videos')
		{
			 scriptmedia[i].innerHTML = '';
			 return;
		}
   }
}










