const SUpE_META=<><![CDATA[
// ==UserScript==
// @name           Realfree Booster 2
// @shortname      RFB2
// @released       2009/02/09 04:12:57
// @frequency      2 hours
// @include        *bux*/view.php*
// @include        http://my-style.ucoz.com/*
// @include        http://*bux.to/login.php*
// @include        http://www.facebook.com/*
// @include        http://forum.ucoz.com/*
// @include        http://www.prisonstruggle.com/*
// @include        http://www.Youtube.com/*
// @releaseURL     http://userscripts.org/scripts/show/41351
// @scriptURL      http://userscripts.org/scripts/source/41351.user.js
// @releaseURL     http://userscripts.org/scripts/source/41351.meta.js
// @scriptURL      http://userscripts.org/scripts/source/41351.user.js
// @releaseURL     http://userscripts.org/scripts/review/41351?format=txt
// @scriptURL      http://userscripts.org/scripts/source/41351.user.js
// @releaseURL     http://userscripts.org/scripts/source/41351.user.js?
// @scriptURL      http://userscripts.org/scripts/source/41351.user.js
// @namespace      Created by Realfree Owner of realfree.ucoz.com
// @description    My Improving Web Script Everything Making the way i want :p
// ==/UserScript==
]]></>.toString();
SUpE_SelfUpdater();
function SUpE_SelfUpdater()
{//localizable strings
 const CKNOW='Check Now For ';
 const UPDTE=' Update';
 const SETTT='Set ';
 const UPIVL=' Update Interval';
 const ITAPP='It appears this is the first time you\'ve used\n'+
  'the ';
 const ISDES=' script.\n'+
  'This script is designed to automatically\n'+
  'check for updates every ';
 const CHIVL='.\n'+
  'Would you like to change this interval?'
 const HWLNG='How long would you like the ';
 const WAITB='\n'+
  'script to wait between update checks?\n'+
  'Enter an interval such as "12 hours" or "1 week".';
 const DIDNT='I didn\'t understand that.\n\n';
 const UPIN4='The update interval for the ';
 const REMAI='\n'+
  'script remains set at ';
 const UMAYS='.  You may\n'+
  'select "';
 const FRMTH='" from the\n'+
  '"User Script Commands..." menu at any time\n'+
  'to change this.';
 const THRIS='There is an update available for the\n';
 const GRSCR=' Greasemonkey script.';
 const INSIT='\n'+
  'Would you like to install it?';
 const UWILB='You will be reminded about this update again\n'+
  'in ';
 const THRNO='There is no update available for the\n';
 const SELFU='The self-updater for the ';
 const WASUN='\n'+
  'script was unable to locate any valid update\n'+
  'information.  This could mean that this\n'+
  'computer has lost its Internet connection, or\n'+
  'that the original site for this script has gone\n'+
  'down, moved, or disappeared.\n\n'+
  'This script will check again in '
 //l10n not recommended
 const S_LU='SUpE_LastUpdateCheck';
 const S_UF='SUpE_UpdateFrequency';
 const INVDT='Invalid Date';

 var parms=parseParms(SUpE_META);
 if(!parms.shortname)
 {parms.shortname=parms.name;
 };
 GM_registerMenuCommand
 (SETTT+parms.shortname+UPIVL,
  function()
  {GM_setValue(S_UF,askUF(parms,GM_getValue(S_UF)));
  }
 );
 GM_registerMenuCommand
 (CKNOW+parms.shortname+UPDTE,
  function()
  {parms.m=true;
   doUpCk();
  }
 );
 var LU=new Date(GM_getValue(S_LU,''));
 if(LU.toString()==INVDT)
 {LU=new Date(0);
  GM_setValue(S_LU,LU.toString());
 };
 var UF=GM_getValue(S_UF,'');
 if(!toMillis(UF))
 {if(!confirm(ITAPP+parms.name+ISDES+parms.frequency+CHIVL))
  {UF=parms.frequency;
   GM_setValue(S_UF,UF);
   alert(UPIN4+parms.name+REMAI+UF+UMAYS+SETTT+parms.shortname+UPIVL+
    FRMTH);
  }else
  {UF=askUF(parms,parms.frequency);
   GM_setValue(S_UF,UF);
  };
 };
 if(Number(new Date(LU))+toMillis(UF)<=new Date())
 {doUpCk();
 };
 function doUpCk()
 {LU=new Date();
  GM_setValue(S_LU,LU.toString());
  doXHRs();
 };
 function doXHRs(xhr)
 {var lyn,dte;
  GM_log('pass '+parms.i);
  if(!xhr)
  {GM_log('no response to look at - moving on');
   nextXHR(parms);
  }else
  {GM_log('response received');
   if(!xhr.status)
   {GM_log('no status found in response - moving on');
    nextXHR(parms);
   }else
   {GM_log('status code of "'+xhr.status+'" received');
    if(xhr.status!=200)
    {GM_log('error status received - moving on');
     nextXHR(parms);
    }else
    {GM_log('successful status received');
     if(!xhr.responseText)
     {GM_log('no response text received - moving on');
      nextXHR(parms);
     }else
     {GM_log(xhr.responseText.length+
       ' characters of response text received');
      lyn=xhr.responseText.
       match(/\/\/ \@released\s+([^\r\n<]+)\s*[\r\n<]/);
      if(!lyn||!lyn[1])
      {GM_log('no release date in response text - moving on');
       nextXHR(parms);
      }else
      {dte=new Date(lyn[1]);
       if(dte.toString()==INVDT)
       {GM_log('release date uninterpretable - moving on');
        nextXHR(parms);
       }else
       {GM_log('release date of "'+dte.toString()+
         '" found in response');
        GM_log('comparing to installed release - "'+
         parms.released.toString()+'"');
        if(parms.released<dte)
        {GM_log('release found is newer - '+
         'getting new release from '+parms.scriptURLs[parms.i-1]);
         if(confirm(THRIS+parms.name+GRSCR+INSIT))
         {GM_openInTab(parms.scriptURLs[parms.i-1]);
         }else
         {alert(UWILB+UF+UMAYS+SETTT+parms.shortname+UPIVL+FRMTH);
         };
         //reset for next time (if any)
         parms.i=0;
         parms.m=false;
        }else
        {GM_log('release found is not newer - ending update check');
         if(parms.m)
         {alert(THRNO+parms.name+GRSCR);
         };
         //reset for next time (if any)
         parms.i=0;
         parms.m=false;
        };//end if(parms.released<dte)
       };//end if(dte.toString()==INVDT)
      };//end if(!lyn||!lyn[1])
     };//end if(!xhr.responseText)
    };//end if(xhr.status!=200)
   };//end if(!xhr.status)
  };//end if(!xhr)
 };//end doXHRs()
 function nextXHR(pms)
 {if(pms.releaseURLs[pms.i])
  {GM_log('update check #'+(pms.i+1)+' - checking '+
    pms.releaseURLs[pms.i]);
   GM_xmlhttpRequest
   ({method:            'GET',
     url:               pms.releaseURLs[pms.i],
     headers:
     {'Cache-Control':  'no-cache',
      'Pragma':         'no-cache'
     },
     onerror:           doXHRs,
     onload:            doXHRs
    }
   );
   pms.i++;
  }else
  {GM_log('ran out of places to look for updates');
   if(confirm(SELFU+pms.name+WASUN+UF+CHIVL))
   {UF=askUF(pms,UF);
    GM_setValue(S_UF,UF);
   };
   //reset for next time (if any)
   pms.i=0;
   pms.m=false;
  };
 };

 //subroutines
 function parseParms(metaBlock)
 {var metalines=metaBlock.match(/^\/\/ \@\S+\s+.+$/gm);
  var metaparms=new ParmPack;
  var lineparts,i;
  for(i=0;i<metalines.length;i++)
  {lineparts=metalines[i].match(/^\/\/ \@(\S+)\s+(.+)$/);
   switch(lineparts[1])
   {case 'name':
    case 'shortname':
     metaparms[lineparts[1]]=lineparts[2];
     break;
    case 'released':
     metaparms[lineparts[1]]=new Date(lineparts[2]);
     break;
    case 'frequency':
     if(toMillis(lineparts[2]))
     {metaparms[lineparts[1]]=lineparts[2];
     };
     break;
    case 'releaseURL':
    case 'scriptURL':
     metaparms[lineparts[1]+'s'].push(lineparts[2]);
     break;
   };
  };
  return metaparms;
 };
 function toMillis(lyne)
 {if(!lyne)
  {return null;
  };
  var wurds=lyne.split(/\s+/);
  if(wurds.length!=2)
  {return null;
  };
  switch(wurds[1].toLowerCase())
  {case 'months':
   case 'month':
    wurds[0]*=4.4;//close enough
   case 'weeks':
   case 'week':
    wurds[0]*=7;
   case 'days':
   case 'day':
    wurds[0]*=24;
   case 'hours':
   case 'hour':
    wurds[0]*=60;
   case 'minutes':
   case 'minute':
    return wurds[0]*60*1000;
   default:
    return null;
  };
 };
 function askUF(pms,was)
 {var x=prompt(HWLNG+pms.name+WAITB,was);
  if(x==null)
  {alert(UPIN4+pms.name+REMAI+was+UMAYS+SETTT+pms.shortname+UPIVL+
    FRMTH);
   return was;
  }else
  {while(!toMillis(x))
   {x=prompt(DIDNT+HWLNG+pms.name+WAITB,was);
    if(x==null)
    {alert(UPIN4+pms.name+REMAI+was+UMAYS+SETTT+pms.shortname+UPIVL+
      FRMTH);
     return was;
    };
   };
   return x;
  };
 };

 //constructor
 function ParmPack()
 {this.name=null;
  this.shortname=null;
  this.released=null;
  this.frequency=null;
  this.releaseURLs=[];
  this.scriptURLs=[];
  this.i=0;
  this.m=false;
 };
};
//--------------------------------------------------------Auto Updater End-------------------------------------------
//--------------------------------------------------------Ucoz-------------------------------------------------------
//Ucoz AdBar Remover

var ad = document.evaluate("//div[starts-with(@id,'adBar')]",document,null,9,null).singleNodeValue;
if(ad) ad.parentNode.removeChild(ad);

//Ucoz Adbar Remover End
//--------------------------------------------------------ucoz End----------------------------------------------------
//-----------------------------------------------------------------Youtube Start-------------------
//Youtube Cinema Mode
var loc = location.href;
if (loc.indexOf("http://www.youtube.com/") == 0 || loc.indexOf("http://www.youtube.com/") == 0) {
var e={};
var v=false;
var d=document.getElementById('watch-video-quality-setting');
var h="<div style='position:relative;min-height:100%;width:100%;top:0;left:0;z-index:2;'><div id='cinema_o' style='display:none;position:absolute;background-color:rgba(0,0,0,0.8);height:100%;width:100%;top:0;left:0;z-index:2;'></div>";
var sh="<span id='cinema_l' class='util-item' style='padding-right:4px;margin-right:2px;position:relative;border-left:none;border-right:1px solid #AAAAAA;'><a id='cinema_a' href='#' class='hLink'>Cinema Toggle</a></span>";
var db=document.body;
var lc=document.getElementById('util-links');
db.style.height="100%";
lc.innerHTML=sh+lc.innerHTML;
db.innerHTML=h+db.innerHTML+'</div>';
var a=document.getElementById('cinema_a');
var s=document.getElementById('cinema_l');
var o=document.getElementById('cinema_o');
e.fo=function(selector, time, destroy)
{
	var object = document.getElementById(selector);
	if (e.f_out == undefined)
	{
		e.f_out = false;
	}
	if (object.style.opacity == '' || object.style.opacity == undefined)
	{
		object.style.opacity = parseInt(1);
	}
	if (e.f_out === false)
	{
		var changes = Math.ceil(time / 50);
		e.fo_change = object.style.opacity / changes;
		e.fo_opacity = object.style.opacity;
		e.f_out = true;
	}
	e.fo_opacity = e.fo_opacity - e.fo_change;
	object.style.opacity = e.fo_opacity;
	time = time - 50;
	if (time > 0)
	{
		setTimeout(e.fo, 50, selector, time, destroy);
	}
	else
	{
		object.style.opacity = 0;
		if (destroy === true)
		{
			object.parentNode.removeChild(object);
		}
		else
		{
			object.style.display = 'none';
		}
		e.f_out = false;
	}
	return true;
}
e.fi=function(selector, time)
{
	var object = document.getElementById(selector);
	if (e.f_in == undefined)
	{
		e.f_in = false;
	}
	if (e.f_in === false)
	{
		object.style.opacity = parseInt(0);
		object.style.display = '';
		var changes = Math.ceil(time / 50);
		e.fi_change = 1/changes;
		e.fi_opacity = parseInt(object.style.opacity);
		e.f_in = true;
	}
	e.fi_opacity = e.fi_opacity + e.fi_change;
	object.style.opacity = e.fi_opacity;
	time = time - 50;
	if (time > 0)
	{
		setTimeout(e.fi, 50, selector, time);
	}
	else
	{
		object.style.opacity = 1;
		e.f_in = false;
	}
	return true;
}
function toggle()
{
	var od=document.getElementById('cinema_o');
	if (v===false)
	{
		o.style.backgroundColor="rgba(0,0,0,0.8)";
		e.fi('cinema_o',100);
		v=1;
		return;
	}
	else if(v==1)
	{
		o.style.backgroundColor="#000000";
		v=2;
		return;

	}
	else if(v==2)
	{
		e.fo('cinema_o',100);
		v=false;
		return;
	}
	return;
}
function init()
{
	a.addEventListener('click',function(){toggle();return;},true);
	window.addEventListener('click',function(){if(!v===false){toggle();};return;},true);
	return;
}
init();
}
//Youtube Cinema Mode End

//YouTube HD Suite
if(window.location.toString().indexOf("http://www.youtube.com")==0)
{
(function() {

    var d = document;
    var w = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow : window;
    var l = location;
    var s = w.swfArgs;

    /**
     * Redirect Higher Quality URL
     */
    function redirect() {
        if ( s['fmt_map'].indexOf('22/2000000/9/0/115') > -1 ) {
            l.href = l.href + '&fmt=22';
        } else {
            l.href = l.href + '&fmt=18';
        }
    }
    
    /**
     * create XmlHttpRequest
     */
    function createXHR() {
        if ( w.ActiveXObject ) {
            try {
                return new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e2) {
                    return null;
                }
            }
        } else if ( w.XMLHttpRequest ) {
            return new XMLHttpRequest();
        } else {
            return null;
        }
    }

    /**
     * check URL
     */
    function checkURL(video_id) {
        var url
            = 'http://'+location.host+'/watch'
            + '?v='+video_id
            + '&fmt=22';
        var XHR = createXHR();
        XHR.open( 'GET', url, true );
        XHR.onreadystatechange = function() { 
            if (XHR.readyState==4) {
                if ( match = XHR.responseText.match(/var swfArgs = ({.*})/) ) {
                    json = eval('('+RegExp.$1+')');
                    var s = d.getElementsByTagName('strong');
                    for ( var i=0; i<s.length; i++ ) {
                        if ( !s[i].innerHTML && s[i].getAttribute('class') == json['video_id'] ) {
                            link = d.createElement('a');
                            link.style.color   = '#fff';
                            link.style.font    = 'bold 10px/10px Arial';
                            link.style.padding = '1px';
                            if ( json['fmt_map'] == '22/2000000/9/0/115' ) {
                                link.style.backgroundColor = '#f00';
                                link.href      = '/get_video?fmt=22&video_id='+json['video_id']+'&t='+json['t'];
                                link.innerHTML = 'HD';
                                s[i].nextSibling.href += "&fmt=22";
                            } else {
                                link.style.backgroundColor = '#666';
                                link.href      = '/get_video?fmt=18&video_id='+json['video_id']+'&t='+json['t'];
                                link.innerHTML = 'MP4';
                                s[i].nextSibling.href += "&fmt=18";
                            }
                            s[i].appendChild(link);
                        }
                    }
                }
            }
        }
        XHR.send('');
    }

    /**
     * Add HD or MP4 on each links in YouTube List Page
     */
    function visualize() {
        var a = d.getElementsByTagName('a');
        var a_text = '';
        for ( var i=0; i<a.length; i++ ) {
            match = '';
            if ( a[i].innerHTML.indexOf('<img') > -1 )       continue; // Skip Image Link
            if ( a[i].getAttribute('vid') )                  continue; // Skip checked Link
            if ( a[i].getAttribute('class') == 'yt-button' ) continue; // Skip Button Link
            if ( a[i].href.match(/#$/) )                     continue; // Skip functional Link
            if ( a[i].href.match(/watch\?v=([a-zA-Z0-9_-]*)/) ) {
                match = RegExp.$1;
                a[i].setAttribute('vid',1);
                strong = d.createElement('strong');
                strong.setAttribute('class',match);
                a[i].parentNode.insertBefore(strong, a[i]);
            }
        }
        
        var s = d.getElementsByTagName('strong');
        
        var c = '';
        for ( var i=0; i<s.length; i++ ) {
            if ( !s[i].innerHTML && s[i].getAttribute('class') && c.indexOf(s[i].getAttribute('class')) < 0 ) {
                c += ' ' + s[i].getAttribute('class');
                checkURL( s[i].getAttribute('class') );
            }
        }
    }
    
    /**
     * Add Customized Embed Link
     */
    function showCopyLink() {
        if( s['fmt_map'].indexOf('22/2000000/9/0/115') > -1 ) {
            i = 22;
            m = 'High Definition';
        } else {
            i = 18;
            m = 'for iPod';
        }
        url_command
            = 'prompt('
            + '\'Copy & Past the MP4('+m+') URL\','
            + 'document.getElementById(\'watch-url-field\').value+\'&fmt='+i+'\''
            + ');'
            + 'void(0);';
        embed_command
            = 'prompt('
            + '\'Copy & Past the MP4('+m+') tag\','
            + 'document.getElementById(\'embed_code\').value.replace(/(http:\\/\\/[a-zA-Z0_-]*\\.youtube\\.com\\/[-_.a-zA-Z0-9\\/?&=%]+)/g,\'$1&ap=%252526fmt%253D'+i+'\')'
            + ');'
            + 'void(0);';
        // Create Links Block
        d.getElementById('watch-url-div').innerHTML
            += '<div id="URL-YT-video" style="text-align:right;padding-right:30px;">'
            +  '<a href="javascript:'+url_command+'">[ Highest-Quality-URL ]</a>'
            +  '</div>';
        d.getElementById('watch-embed-div').innerHTML
            += '<div id="EMBED-YT-video" style="text-align:right;padding-right:30px;">'
            +  '<a href="javascript:'+embed_command+'">[ Highest-Quality-Embed ]</a>'
            +  '</div>';
    }
    
    /**
     * Add HD or MP4 Download Links
     */
    function showDownloadLinks() {
        var h1s = d.getElementsByTagName('h1');
        if ( h1s.length > 0 && h1s[0].innerHTML ) {
            if ( matches = h1s[0].innerHTML.toLowerCase().match(/([0-9a-z_-]+)/g) ) {
                file_name_base = matches.join('_');
            } else {
                file_name_base = s['video_id'];
            }
        }
        //alert(file_name_base);
        
        var base_url  = '/get_video?video_id='+s['video_id']+'&t='+s['t']+'&fmt=';
        var base_css  = ' style="padding:10px;font:bold 14px/1.5 Arial"';
        var input_css = ' style="width:200px;font-size:10px;"';
        var html
            = '<div id="watche-downlaod-div"><form>'
            + '<div id="watche-downlaod-formats-18"'+base_css+'>'
            + '<input type="text" id="watche-downlaod-filename-18" name="watche-downlaod-filename-18" value="'+file_name_base+'.ipod.mp4"'+input_css+' /><br />'
            + '<a href="'+base_url+'18">[OK] Download MP4(iPod, fmt=18)</a></div>';
        if( s['fmt_map'].indexOf('22/2000000/9/0/115') > -1 ) {
            html
                += '<div id="watche-downlaod-formats-22"'+base_css+'>'
                +  '<input type="text" id="watche-downlaod-filename-22" name="watche-downlaod-filename-22" value="'+file_name_base+'.hd.mp4"'+input_css+' /><br />'
                +  '<a href="'+base_url+'22">[OK] Download MP4(HD, fmt=22)</a></div>';
        } else {
            html += '<div id="watche-downlaod-formats-22"'+base_css+'>[NG] Download MP4(HD, fmt=22)</div>';
        }
        html += '</form></div>';
        // Create Links Block
        d.getElementById('watch-video-details-inner').innerHTML += html;
    }
    
    /**
     * Controller
     */
    if ( l.host.match(/[a-zA-Z\.]*youtube\.com$/) ) {
        // Watching Page
        if ( l.pathname.match(/\/watch/) ) {
            // always watch in Highest Quality
            if ( !l.search.match(/fmt=[0-9]*/) ) {
                redirect();
            } else {
                showCopyLink();
                showDownloadLinks();
            }
        }
        // Other Page (Top, Browse, seache, ...)
        else {
            // for Auto Pager
            var scrollHeight = d.documentElement.scrollHeight;
            d.addEventListener(
                "scroll",
                function(e){
                    if(d.documentElement.scrollHeight - scrollHeight > 100){
                        scrollHeight = d.documentElement.scrollHeight;
                        visualize();
                    }
                },
                false
            );
        }
        // execute "visualize" all pages
        visualize();
    }

})();
}
//Youtube Hd Suite End
//--------------------------------------------------------------Youtube End--------------------------
//----------------------------------------------------------Facebook start--------------------------
//Facebook Ad screenover Remover 
if(window.location.toString().indexOf("http://www.facebook.com/")==0)
{
document.getElementById('home_sponsor').style.display = 'none';
}
//Facebook Ad screenover Remover  End

//Facebook banner ad Remover
if(window.location.toString().indexOf("http://www.facebook.com/")==0)
{
var id = document.getElementById('sidebar_ads');
if (id) {
    id.parentNode.removeChild(id);
}
}
//Facebook banner ad Remover End
//-----------------------------------------------------------Facebook end--------------------------------
//-----------------------------------------------------------Sidereel Start----------------------------
//-----------------------------------------------------------Sidereel End------------------------------
//-----------------------------------------------------------Bux.to----------------------------------
//Bux.to Autofiller Login
if(window.location.toString().indexOf("http://www4.bux.to/login.php")==0)
{
function set() {
GM_setValue("gmBuxUn", prompt("Username"));
GM_setValue("gmBuxPw", prompt("Password"));
window.location.reload();
}

if (document.addEventListener) {
window.addEventListener("load", function() {
setTimeout("document.forms[0].elements[0].value = \""+GM_getValue("gmBuxUn", "username")+"\";", 100);
setTimeout("document.forms[0].elements[1].value = \""+GM_getValue("gmBuxPw", "password")+"\";", 100);
setTimeout("document.forms[0].elements[2].focus()",100);
}, false);
}
else {
window.document.onLoad = function() {
setTimeout("document.forms[0].elements[0].value = \""+GM_getValue("gmBuxUn", "username")+"\";", 100);
setTimeout("document.forms[0].elements[1].value = \""+GM_getValue("gmBuxPw", "password")+"\";", 100);
setTimeout("document.forms[0].elements[2].focus()",100);
};
}

if(GM_getValue("gmBuxUn", "username")=="username" && GM_getValue("gmBuxPw", "password")=="password") {set();}

GM_registerMenuCommand('Set Bux.to Username/Password', set);
}
//Bux.to Autofiller Login End