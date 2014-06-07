// ==UserScript==
// @author        Nedko Ivanov http://nednet.us
// @name           Travian Resource Upgrade
// @namespace      http://userscripts.org/
// @description    this script mails you when a resource quantity is available
// @include        http://*.travian.*dorf1*
// @include        http://*.travian.*build*
// @exclude        http://*.travian.*/login.php*
// @exclude        http://*.travian.*/logout.php*
// @exclude        http://*.travian.*/chat.php*
// @exclude        http://forum.travian.*
// @exclude        http://*.travian.*/index.php*
// @exclude        http://*.travian.*/manual.php*
// ==/UserScript==

/* 
 * This script is granted to the public domain.
 */

var sentmailfor = new Object();

var mats = new Array();
mats[1] = 'jitoto';
mats[2] = 'jeliazoto';
mats[3] = 'glinata';
mats[4] = 'dyrwesinata';

function getCookie(cookiename) {
 var cookiestring=""+document.cookie;
 var index1=cookiestring.indexOf(cookiename);
 if (index1==-1 || cookiename=="") return ""; 
 var index2=cookiestring.indexOf(';',index1);
 if (index2==-1) index2=cookiestring.length; 
 return unescape(cookiestring.substring(index1+cookiename.length+1,index2));
}

function setCookie( name, value, expires, path, domain, secure ) {
	var today = new Date();
	today.setTime( today.getTime() );
	if ( expires ) {
		expires = expires * 1000 * 60 * 60 * 24;
	}
	var expires_date = new Date( today.getTime() + (expires) );
	document.cookie = name+'='+escape( value ) +
		( ( expires ) ? ';expires='+expires_date.toGMTString() : '' ) + //expires.toGMTString()
		( ( path ) ? ';path=' + path : '' ) +
		( ( domain ) ? ';domain=' + domain : '' ) +
		( ( secure ) ? ';secure' : '' );
}
 
function deleteCookie( name, path, domain ) {
	if ( getCookie( name ) ) document.cookie = name + '=' +
			( ( path ) ? ';path=' + path : '') +
			( ( domain ) ? ';domain=' + domain : '' ) +
			';expires=Thu, 01-Jan-1970 00:00:01 GMT';
}

function HourFromTime(t){return Math.floor(t ) % HoursPerDay;}
function MinFromTime(t){return Math.floor( (t*msPerHour) / msPerMinute) % MinutesPerHour;}

function _formatTime(maxtime, hours, minutes, seconds, off){ // given maxtime in secs and and offset values, returns a array of [hrs,min,sec]
     return [
      Math.floor(maxtime/3600)+hours+off, 
      (Math.floor(maxtime/60)%60)+minutes, 
      Math.round((maxtime % 60)+seconds) 
     ];
}

function _formatTimeString(time){ // time in seconds returns it in hh:mm:ss h format
     var helper=_formatTime(time, 0, 0, 0, 0);
     if(helper[1] < 10){helper[1] = "0"+helper[1];}
     if(helper[2] < 10){helper[2] = "0"+helper[2];}
     return helper[0]+':'+helper[1]+':'+helper[2]+' h';
}

function initiate_autobuild()
{
  if(!document.getElementById('autobuild').checked)
    return; //user does NOT want autobuild
    
  setCookie('autobuild','yes');
  document.location.reload();
}

function check_all()
{
  if(getCookie('autobuild')=='yes')
  {
    var node = document.evaluate('//div[@id="lmid2"]/a',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
    if(node && node.singleNodeValue)
    {
      var buildpage = node.singleNodeValue.attributes['href'].textContent;
      document.location.href = buildpage;
      return;
    }
    else
    {
      document.getElementById('nolink').innerHTML = 'nothing to build: buildlink not found';
      //alert('build link not found');
    }
  }

  if(check_(4) || check_(3) || check_(2) || check_(1))
    initiate_autobuild();
    
}

function check_(what)
{
    recalcEst(what)
    var l3 = document.getElementById('l'+what);
    am=l3.innerHTML.split("/");
    R=parseInt(am[0]); //tekushto
    K=parseInt(am[1]); //tawan
    var wanted = parseInt(document.getElementById('ed'+what).value);
   if(wanted>0 && wanted<=K)
   {
      //imame zadadeno chislo
      if(R==wanted)
      {
        //alert('reached');
         if(!sentmailfor[what] || sentmailfor[what].amt!=wanted || !sentmailfor[what].sent )
         {
            sentmailfor[what] = new Object();
            sentmailfor[what].amt = wanted;
            sentmailfor[what].sent = true;
            
            var mailto=document.getElementById('mailaddr').value;
            //alert(to.length);
            if(mailto.length>1)
            {
               mailto = escape(mailto);
               var mailtext = escape('Travian: '+mats[what]+' stana '+R);
               window.open('http://nednet.us/mail.php?to='+mailto+'&mail='+mailtext,'travnotif');
            }
            
            return true;
         }
      }
   }
   else
      document.getElementById('est'+what).innerHTML = 'NaN';
      
  return false;
}

var HoursPerDay = 24
var MinutesPerHour = 60
var SecondsPerMinute = 60
var msPerSecond = 1000
var msPerMinute = 60000
var msPerHour = 3600000

function recalcEst(what)
{
   var l3 = document.getElementById('l'+what);
    am=l3.innerHTML.split("/");
    R=parseInt(am[0]); //tekushto
    K=parseInt(am[1]); //tawan
   perh = parseInt(l3.title); //na chas
   
   var wanted = parseInt(document.getElementById('ed'+what).value);
   if(wanted>0 && wanted<=K && wanted>R)
   {
      var from = (wanted-R-1) / perh
      var to = (wanted-R) / perh;
      document.getElementById('est'+what).innerHTML = 
         _formatTimeString(to*MinutesPerHour*SecondsPerMinute);
   }
   else
      document.getElementById('est'+what).innerHTML = '';
}

function onturn()
{
   var p = document.getElementById('panel');
   if(p.style.height>=140)
      p.style.height = 10;
   else
      p.style.height = 140;
}


window.addEventListener('load',function(e) {
  if( location.href.match('travian.+[build|dorf1]') ) {

    
      var keepalive = function ()
      {
         if(!T_Load)
            document.getElementById('nolink').innerHTML = 'no T_Load: no keepalive';
         else
            T_Load(document.location.href, null);
      }
      
   window.setInterval(keepalive, 1000*60*20); //20 min
  
    var cntnr = document.createElement('div');
    var topnode = document.getElementById('ce');
    topnode.appendChild(cntnr);
    //topnode.parentNode.insertBefore(cntnr, null);
    mailaddr = getCookie('mailnotifaddr');
    
    var autobuild = location.href.match('build.php') 
      ? "<input id='autobuild' type='checkbox'> Когато ресурсът достигне зададената стойност - презареди страницата и построй обекта! <span id='remntime' style='color:red'></span>" 
      : "";


    
    cntnr.innerHTML = 
      "<style>td input.small {border: 1px solid gray; width:50px;}</style>"+
      "<div id='panel' style='margin:10px;width: 400px; background:silver; padding:8px; overflow:hidden;'>"+
      
      "<table width='400px'><tr><td><img class='res' src='img/un/r/1.gif' title='Дървесина'> <span style='width:200px;'>Дървесина</span> </td><td><input id='ed4' type='edit' class='small' /> "+
      "<span id='est4'></span>"+
      "</td></tr>"+
      
      "<tr><td><img class='res' src='img/un/r/2.gif' title='Глина'> <span style='width:200px;'>Глина</span> </td><td><input id='ed3' type='edit' class='small' /> <span id='est3'></span>  </td></tr>"+
      "<tr><td><img class='res' src='img/un/r/3.gif' title='Желязо'> <span style='width:200px;'>Желязо</span> </td><td><input id='ed2' type='edit' class='small' /> <span id='est2'></span> </td></tr>"+
      "<tr><td><img class='res' src='img/un/r/4.gif' title='Жито'> <span style='width:200px;'>Жито</span> </td><td><input id='ed1' type='edit' class='small' /> <span id='est1'></span> </td></tr>"+
      "<tr><td>mail address to be notified: </td><td><input id='mailaddr' type='edit' value='"+mailaddr+"' onchange='setCookie(\"mailnotifaddr\", document.getElementById(\"mailaddr\").value);'> </td></tr>"+
      "</table>"+
      autobuild+
      "<div id='nolink' style='color:red;'></div>"+
      "</div>";

   if(getCookie('autbildnexttimeclear')=='yes')
   {
      deleteCookie('autobuild');
      deleteCookie('autbildnexttimeclear');
   }
   else
      if(getCookie('autobuild')=='yes')
         setCookie('autbildnexttimeclear', 'yes');
    
    window.setInterval(check_all, 3000); //3 sec
    
   }
},false);