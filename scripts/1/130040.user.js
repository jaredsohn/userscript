// ==UserScript==
// @name           GooglePiratePlus+
// @namespace      Google==>Go
// @description    Make Google Home Page Shows Selection Of Specific Search type..
// @version	   1.2.2
// @include        *google*
// @exclude        *images.google*
// @exclude        *video.google*
// ==/UserScript==


//~~~~~~~~~~~~~ Début Script Auto-Update ~~~~~~~~~~

var SUC_script_num = 82583; // Change this to the number given to the script by userscripts.org (check the address bar)

try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1)
						{
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version)
							{
								if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?'))
								{
									GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
									GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (forced)
								alert('No update is available for "'+script_name+'."');
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err)
			{
				if (forced)
					alert('An error occurred while checking for updates:\n'+err);
			}
		}
	}
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function()
	{
		updateCheck(true);
	});
	updateCheck(false);
}
catch(err)
{}

//~~~~~~~~~~~~~~ Fin Script Auto-Update ~~~~~~~~~~
//~~~~~~~~~~~~~~ Début Script Principal ~~~~~~~~~~

(function () {
    var css =  '#fctr,#ghead,#pmocntr,#sbl,#tba,#tbe,.fade,.gbh { opacity: 1 !important; filter:alpha(opacity=100) !important; }';
    if (typeof GM_addStyle != 'undefined') {
      GM_addStyle(css);
	  } else if (typeof PRO_addStyle != 'undefined') {
      PRO_addStyle(css);
	  } else {
      var style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = css;
      document.getElementsByTagName('head')[0].appendChild(style);
    }
})();

if((document.title==='Google') || (document.title==='Mozilla Firefox Start Page')){
document.getElementsByName('q')[0].focus();
function newradio(nametext, dorkvalue){
var search = document.getElementsByName('f')[0];
var sometext = document.createTextNode(nametext);
var someradio = document.createElement('input');
var breakup = document.createElement('br');
someradio.setAttribute('type', 'radio');
someradio.setAttribute('name', 'q');
someradio.setAttribute('value', dorkvalue);
search.appendChild(breakup);
search.appendChild(someradio);
search.appendChild(sometext);
}
newradio('Web', '');
newradio('Music', 'intitle:"music" (mp3|aac|flac|wav) "Parent Directory" -htm -html -asp -php -listen77 -idmusic -airmp3 -shexy -vmp3');
newradio('Movies/TV', '(avi|mpg|wmv|mpeg|divx) "Parent Directory" -"Trailer" -cdkey -asp -torrent -html -web-shelf -zoozle -jsp -htm -listen77 -idmovies -shexy -eucontest -0x7');
newradio('Anime', 'intitle:"anime" (avi|mpg|wmv|mpeg|mkv|ogm) +ddl -animefield.is-there.net -torrent -torrents');
newradio('FTP Folder', '"Parent Directory" intitle:"index.of" "Name" "Last modified" "Size" "Description" -inurl:htm -inurl:html -inurl:php -xxx -shtml -opendivx -md5 -md5sums -asp');
newradio('EBooks/Comics', '(chm|pdf|cbr|nfo) -torrents -torrent -md5 -md5sums -idpdf');
newradio('RAR/Zip Archives', '(rar|zip|tar|7zip|iso|cso|gz) -torrent +intitle:"index.of"');
newradio('Youtube', 'site:youtube.com');
newradio('Mediafire', 'site:mediafire.com');
}else{
function newselect(nametext, dork){
var newoption = document.createElement('option');
newoption.setAttribute('value', dork);
newoption.innerHTML=nametext;
s.appendChild(newoption);
}

var s = document.createElement('select');
s.setAttribute('name', 'q');
s.setAttribute('onchange', 'window.location.href=window.location.href.split("&q=")[0]+"&q="+window.location.href.split("&q=")[1].split("&")[0]+"&q="+this.value');
document.getElementById('prs').appendChild(s);
newselect('Web', '');
newselect('Music', 'intitle:"music" (mp3|aac|flac|wav) "Parent Directory" -htm -html -asp -php -listen77 -idmusic -airmp3 -shexy -vmp3');
newselect('Movies/TV', '(avi|mpg|wmv|mpeg|divx) "Parent Directory" -"Trailer" -torrent -serial -cdkey -web-shelf -asp -html -zoozle -jsp -htm -listen77 -idmovies -shexy -eucontest -0x7');
newselect('Anime', 'intitle:"anime" (avi|mpg|wmv|mpeg|mkv|ogm) +ddl -animefield.is-there.net -torrent -torrents');
newselect('FTP Folder', '"Parent Directory" intitle:"index.of" "Name" "Last modified" "Size" "Description" -inurl:htm -inurl:html -inurl:php -idftp -xxx -shtml -opendivx -md5 -md5sums -asp');
newselect('EBooks/Comics', '(chm|pdf|cbr|nfo) -torrents -torrent -md5 -md5sums -idpdf');
newselect('RAR/Zip Archives', '(rar|zip|tar|7zip|iso|cso|gz) -torrent +intitle:"index.of"');
newselect('Youtube', 'site:youtube.com');
newselect('Mediafire', 'site:mediafire.com');
if(window.location.href.search('idmusic')>0){s.options[1].defaultSelected='true';}
if(window.location.href.search('idmovies')>0){s.options[2].defaultSelected='true';}
if(window.location.href.search('idftp')>0){s.options[3].defaultSelected='true';}
if(window.location.href.search('torrent')>0){s.options[4].defaultSelected='true';}
if(window.location.href.search('idpdf')>0){s.options[5].defaultSelected='true';}
var i = 1;
while (i<s.options.length){
if(s.options[i].defaultSelected===true){
document.evaluate( '//input[contains(@title, "Search")]' , document, null, 0, null ).iterateNext().value = window.location.href.split("&q=")[1].split("&")[0];}
i++;}
var p = 0;
var qs = document.evaluate( '//input[contains(@title, "Search")]' , document, null, 0, null ).iterateNext();
var newqs = '';
while(p<qs.value.split('+').length){
if(p==qs.value.split('+').length-1){
newqs = newqs+qs.value.split('+')[p];
}else{
newqs = newqs+qs.value.split('+')[p]+' ';
}p++;}
qs.value = newqs;
var ni = document.createElement('input');
ni.setAttribute('type', 'hidden');
ni.setAttribute('name', 'q');
ni.setAttribute('value', s.value);
document.forms[0].appendChild(ni);
}inurl:youtube

//~~~~~~~~~~~~~~ Fin Script Principal ~~~~~~~~~~
