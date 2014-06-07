const SUpE_META=<><![CDATA[
// ==UserScript==
// @name           Marxist's-Screenreader (former GSP-Screenreader)
// @namespace      js
// @shortname      MScR
// @released       2008/08/06 00:08:00
// @frequency      2 hours
// @releaseURL     http://userscripts.org/scripts/show/30446
// @scriptURL      http://userscripts.org/scripts/source/30446.user.js
// @include        http://www.gegenstandpunkt.com/mszarx/*
// @include        http://www.gegenstandpunkt.com/vlg/*/*
// @include        http://www.gegenstandpunkt.com/msz/*
// @include        http://www.mlwerke.de/*/*.htm
// @exclude        http://www.mlwerke.de/*/*000.htm
// @include	   http://www.ml-werke.de/*
// @include	   http://www.mlwerke.de/*
// @include        http://www.marxists.org/*
// ==/UserScript==
]]></>.toString();



//Updater Stuff

SUpE_SelfUpdater();
//Self-updater function is copyright <GasBuddyPhilly@yahoo.com>,
// located at <http://userscripts.org/scripts/show/29878>,
// and licensed under <http://gnu.org/licenses/gpl-3.0.html>,
// incorporated herein by reference.
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
 const UMAYS='.  You may select\n'+
  '"';
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
 };undefined
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


///////////////////////////////////////////////////////////////////////////////////

var columncount=GM_getValue("columncount","2"); GM_setValue("columncount",columncount);
var columnwidth=GM_getValue("columnwidth","300pt"); GM_setValue("columnwidth",columnwidth);
var screenfont=GM_getValue("screenfont","'Lucida Grande', 'Lucida Sans', 'Lucida Sans Unicode', Lucida, Verdana, Helvetica, Arial, 'Bitstream Vera Sans'");GM_setValue("screenfont",screenfont);
var printfont=GM_getValue("printfont","Georgia, Garamond,'Palatino Linotype','Times New Roman', Times, serif");GM_setValue("printfont",printfont);

GM_registerMenuCommand ('Set Column Count', function() {GM_setValue("columncount",prompt('How many Columns do you want for Printing?',GM_getValue("columncount")));});
GM_registerMenuCommand ('Set Column Width', function() {GM_setValue("columnwidth",prompt('Please enter your prefered column-width for screen reading.',GM_getValue("columnwidth")));})
GM_registerMenuCommand ('Set Screen Font', function() {GM_setValue("screenfont",prompt('Please enter your prefered screen fonts.',GM_getValue("screenfont")));})
GM_registerMenuCommand ('Set Print Font', function() {GM_setValue("printfont",prompt('Please enter your prefered Font for printing.',GM_getValue("screenfont")));})


//Stylesheet
var css = 'p,a,a:visited,a:active,td,li,div,body, p font, td {'+
		'font-family: '+screenfont+'!important;'+
		'}'+
	'h1 {font-size:28pt;}'+
	'h2 {font-size:22pt;}'+
	'h3 {font-size:18pt;}'+
	'h4 {font-size:17pt;}'+
	'h5 {font-size:15pt;}'+
	'h6 {font-size:13pt;}'+
	'h1, h2, h3, h4, h5, h6, h1 span, h2 span, h3 span, h4 span, h5 span, h6 span {'+
		'font-family: '+screenfont+' !important;'+
		'font-weight:normal;'+
		'page-break-after: avoid !important;'+
		'page-break-inside: avoid !important;'+
		'text-align:left;'+
		'}'+
	'cite, .zit{'+
		'text-align:left;'+
		'margin: 0.5cm 0.5cm 0.5cm 0.5cm !important'+
		'}'+
	'cite:after, .zit:after {margin-top:0.5cm;}'+
	'body{'+
		'text-align:justify;'+
		'font-size:12pt;'+
		'}'+
	'font[size="-1"], .zit, cite{font-size: 10pt !important;}'+
	'p, p font, td{'+
		'font-size:12pt !important;'+
		'text-decoration:none !important;'+
		'color:black !important;'+
		'}'+
	'a,a:visited,a:active {'+
		'color:#000066 !important;'+
		'text-decoration: none;'+
		'}'+
	'a:hover{'+
		'background:lavender !important;'+
		'}'+
	'table { float:left;}'+
	'table,tr, input, select,td,img {width:auto !important;max-width:100% !important;height:auto !important;max-height:100% !important;overflow:auto;}'+
	'li {'+
		'text-align:left;'+
		'font-size:12pt;'+
		'}'+
	'hr {'+
		'height:1pt;'+
		'background:black;'+
		'border:1pt black solid;'+
		'}'+
	'@media print{'+
		'p,a,a:visited,a:active,td,li,div,body, p span, td{'+
			'font-family:'+printfont+' !important;'+
			'}'+
		'body {'+	
			'-moz-column-count:'+columncount+';'+
			'-khtml-column-count:'+columncount+';'+
			'-webkit-column-count:'+columncount+';'+
			'column-count:'+columncount+';'+
			'margin:0;'+
	                'font-size:80%;'+
			'}'+
		'* { color:black !important;}'+
		'cite, .zit, div .zit{'+
			'text-align:left;'+
			'margin: 0.5cm 0.5cm 0.5cm 0.5cm !important'+
			'}'+	
	  'p {'+
	    'margin: 0 0 1em 0;'+
	    '}'+
	  'p+p {'+
	    'margin-top: -1em;'+
	    'text-indent: 2em;'+
	    '}'+
	  'a:link:after, a:link:visited:after {'+
	    'content: " (Link auf <" attr(href) ">) ";'+
	    'font-size: 76%;'+
	    'color: #999;'+
	    'background: transparent;'+
	    'display:none;'+
	    '}'+
	  '.references a:link:after, .references a:link:visited:after {'+
	    'display:none;'+
	    '}'+
	'}'+
	'@media screen, handheld {'+
		'html { height: 100%;}'+
		'body { '+
			'height:97% !important;'+
			'-moz-column-width:'+columnwidth+';'+
			'-khtml-column-width:'+columnwidth+';'+
			'-webkit-column-width:'+columnwidth+';'+
			'column-width:'+columnwidth+';'+
			'margin:4pt;'+
	                'background:#fffff0;'+
			'}'+
		'}'
//Load Stuff
var scripts = [
	'http://hyphenator.googlecode.com/svn/trunk/Hyphenator.js?bm=true'
//	'http://jqueryjs.googlecode.com/files/jquery-1.2.6.pack.js'
	];

function loadScripts() {
	for (i in scripts) {
	    var script = document.createElement('script');
	    script.src = scripts[i];
	    document.getElementsByTagName('head')[0].appendChild(script);
	}
	
	window.addEventListener('load', function(event) {	
		GM_addStyle(css);		
	}, 'false');
}


function setLanguage(language) {
	var head=document.getElementsByTagName('head').item(0);
	lang=document.createElement('meta');
	lang.name='Content-language';
	lang.content=language;
	head.appendChild(lang);
	lang2=document.createElement('meta');
	lang2.name='language';
	lang2.content=language;
	head.appendChild(lang2);
}

//Wrap Mousewheel to Horizontal scroll

function wheel(event)
{

  var delta = 0;

  if (!event)
  {
    event = window.event;
  }

  if (event.wheelDelta)
  {
    delta = event.wheelDelta/120;
    if (window.opera)
    {
      delta = -delta;
    }
  }

  else if (event.detail)
  {
    delta = -event.detail/3;
  }

  if (delta)
  {
    if (delta < 0)
    {
      window.scrollBy(sdr,0);
    }
    else
    {
      window.scrollBy(-sdr,0);
    }
  }
}


if (window.addEventListener) { window.addEventListener('DOMMouseScroll', wheel, false); }

window.onmousewheel = document.onmousewheel = wheel;


sdr = document.documentElement.clientHeight*0.15;

function setsdr()
{
  sdr = document.documentElement.clientHeight*0.15;
  // alert('debug');
}


//window.onresize = setsdr;

window.addEventListener("resize", function () {history.go(0);setsdr; GM_addStyle(css);},false);

setsdr;
setLanguage('de');
loadScripts();



