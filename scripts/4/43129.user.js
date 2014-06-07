// ==UserScript==
// @name           vario.ru enhancer
// @namespace      V@no
// @description    Replaces flash player with a more andvanced JW FLV Player, adds download video link under the player, adds link to the headline of the post
// @include        http://vario.ru/*
// @include        http://*.vario.ru/*
// @version        3.0
// @creator        V@no
// @date           2010-02-21
// ==/UserScript==

// history
/*
v3.0
  - added links to the headlines of the posts

v2.2
  - changed player detection, now should replace player even on non-video pages.
  - added .3gp download link
  - changed url for JW player

*/
var VA = new Array();
//------ Settings --------

//VA['player']        = "http://img504.imageshack.us/img504/475/jwflvplayerv43logoright.swf"; //JW Flash Player url 
VA['player']        = "http://img41.imageshack.us/img41/475/jwflvplayerv43logoright.swf"; //JW Flash Player url 
VA['autostart']     = true; //true or false
VA['width']         = 0; //0 = same as original
VA['height']        = 0; //0 = same as original
VA['download']      = true; //show download link(s)
VA['repeat']        = false; //repeat video when done
VA['stretching']    = false; //true=resize picture to fit into player; false=zoom in to fill in available space in player
VA['logo']          = true; //show vario.ru logo
VA['lang']          = "ru"; //ru, en

//---- End Settings ------

VA['langs'] =
{
  en: 'English',
  ru: 'Русский',
}
function Lang(l)
{
  if (typeof(l) == "undefined")
    var l = VA['lang'];

  if (!VA['langs'][l])
    l = "ru";

  switch (l)
  {
    case "en":
        VA['dltxt']         = "Download video"; //text string for download link
        VA['autostarttxt']  = "Autoplay";
        VA['repeattxt']     = "Repeat";
        VA['stretchingtxt'] = "Fit to player";
        VA['logotxt']       = "Logo";
        VA['ontxt']         = ": on";
        VA['offtxt']        = ": off";
        VA['menutxt']       = "Menu";
        VA['langtxt']       = "Language";
      break;
    case "ru":
        VA['dltxt']         = "Скачать"; //text string for download link
        VA['autostarttxt']  = "Автозапуск";
        VA['repeattxt']     = "Повтор";
        VA['stretchingtxt'] = "Растянуть";
        VA['logotxt']       = "Лого";
        VA['ontxt']         = ": вкл.";
        VA['offtxt']        = ": выкл.";
        VA['menutxt']       = "Установки";
        VA['langtxt']       = "Язык";
      break;
  }
  VA['lang'] = l;
}
VA['position'] = 0;
VA['skip'] = 0;
VA['start'] = 0;
VA['reload'] = true;
VA['screenalpha'] = 0;
VA['flashvars'] =
{
  start:        VA['start'],
  autostart:    VA['autostart'],
  stretching:   ['fill', 'uniform'],
  repeat:       ['always', 'none'],
  logo:         ['http://img22.imageshack.us/img22/7162/vario.png', ''],
  streamer:     '',
  screenalpha:  0,
//  bufferlength: 10,
};
VA['cookies'] =
{
  autostart:"bool",
  repeat:"bool",
  stretching:"bool",
  logo:"bool",
  lang:"text"
};

unsafeWindow.VA = VA;

//add link to the title
if (document.getElementById("dle-content"))
{
  var l = document.getElementById("dle-content").childNodes;
  for(var i in l)
  {
    if (l[i].tagName == "TABLE")
    {
      var t = l[i].getElementsByClassName("ntitle")[0];
      var n = document.createElement("a");
      n.href = l[i].getElementsByClassName("stext")[0].getElementsByTagName("a")[1].href;
      n.innerHTML = t.innerHTML.replace(/^: /, "");
      t.innerHTML = ": ";
      t.appendChild(n);
    }
  }
}


//-------- Page Code ------------
var js = <r><![CDATA[

function playerReady(obj)
{
  player = document.getElementById(obj.id);
  addListeners();
};
function addListeners()
{
  if(player)
  { 
    VA['position'] = 0;
    if (VA['reload'])
    {
      VA['reload'] = false;
    }
    player.addModelListener('STATE', 'vidbg');
    player.addModelListener('TIME', 'vidposit');
  }
  else
  {
    setTimeout("addListeners()", 100);
  }
};
function vidposit(obj)
{
  if (VA['reload'])
    return;
  VA['position'] = parseFloat(obj.position);
  if (VA['skip'] > 0)
  {
    if (VA['position'] < VA['skip'])
    {
      player.sendEvent('SEEK', VA['skip']);
    }
    else
    {
      VA['skip'] = 0;
    }
  }
}
function vidbg(obj)
{
  VA['state'] = obj.newstate;
  if (VA['state'] == "IDLE" || VA['state'] == "COMPLETED")
  {
    document.getElementById("thumb").style.display="";
    VA['position'] = 0;
    if (VA['skip'])
    {
      VA['skip'] = 0;
      b = VA['autostart'];
      VA['autostart'] = false;
      VA['reload'] = true;
      document.getElementById("jwp").innerHTML = jwp();
      VA['autostart'] = b;
    }
 }
  else
  {
    document.getElementById("thumb").style.display="none";
  }
}
function togle(name, obj, r, c)
{
  if (!player || VA['reload'])
    return;
  var val;
  switch(VA['cookies'][name])
  {
    case "text":
        val = VA[name];
      break;

    default:
        VA[name] = VA[name] ? false : true;
        val = (VA[name] ? 1 : 0);
      break;
  }
  createCookie("vae"+name, val);
  if (typeof(c) == "undefined" || !c)
  {
    obj.className = "jwp"+(VA[name] ? 1 : 2);
    obj.getElementsByTagName("SPAN")[0].innerHTML = VA[name] ? VA['ontxt'] : VA['offtxt'];
  }
  else if (typeof(c) == "function")
  {
    if (!c(name, obj, r))
    {
      return false;
    }
  }
  if (r == 1)
    location.reload(true);
  else
  {
    if (typeof(r) == "undefined" || !r)
    {
      var p = document.getElementById("jwp");
      if (p)
      {
        VA['skip'] = VA['position'];
        VA['reload'] = true;
        var b = VA['autostart'];
        if (VA['state'] == "IDLE" || VA['state'] == "COMPLETED")
        {
          VA['autostart'] = false;
        }
        else
        {
          VA['autostart'] = true;
        }
        p.innerHTML = jwp();
        VA['autostart'] = b;
      }
    }
    else
    {
    }
  }

  return false;
}
]]></r>;
//-------End Page Code ----------

//-------- Eval Code ------------
var jse = <r><![CDATA[
function createCookie(name,value,days) {
	if (days != -1) {
		var date = new Date();
		date.setTime(date.getTime()+((days ? days : 999)*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(";");
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==" ") c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function flashvars()
{
  var r = "";
  var n = "";
  for(i in VA['flashvars'])
  {
    if (typeof(VA['flashvars'][i]) == "object")
    {
      n = VA['flashvars'][i][(VA[i] ? 0 : 1)];
    }
    else
    {
      n = VA['flashvars'][i];
    }
    r = r + i + "=" + n + "&";
  }
  return r;
}
function jwp()
{
  player = null;
  var r = '<embed style="position:relative; top:1px;" type="application/x-shockwave-flash" src="'+VA['player']+'?file='+VA['file']+'" style="" id="jwplayer" name="jwplayer" quality="high" allowfullscreen="true" allowscriptaccess="always" wmode="transparent" bgcolor="000000" flashvars="'+flashvars()+'"  width="100%" height="100%" />';
  return r;
}

function LangTxt(name, obj, r)
{
  Menu(1);
  return true;
}
function LangLinks()
{
  var n = "";
  var r = "";
  for(var i in VA['langs'])
  {
    if (i != VA['lang'])
      n = '<a href="#" onclick="Lang(\''+i+'\');return togle(\'lang\', this, 0, LangTxt);" class="jwp2">'+VA['langs'][i]+'</a>';
    else
      n = '<span class="jwp1">'+VA['langs'][i]+'</span>';
    r = r + (r ? '/' : '') + n;
  }
  return r;
}
function Menu(i)
{
  var d = '<div style="margin-bottom: 5px;white-space:nowrap;">'+
          '<table width="100%"><td>'+
          '<a href="#" onclick="var s=document.getElementById(\'settings\').style; if (s.display == \'\'){s.display=\'none\';this.className=\'jwp\';}else{s.display=\'\';this.className=\'jwp0\';} return false;" class="jwp">'+VA['menutxt']+'</a>'+
          '</td><td style="float:right;">'+
          (VA['download'] ? '<span class="jwp">'+VA['dltxt']+':</span> <a href="'+VA['file']+'" class="jwpn">flv</a>'+(VA['thumb'] ? ' <a href="'+VA['file'].replace(/\.flv$/i, '.3gp')+'" class="jwpn">3gp</a>' : '') : '')+
          '</table>'+
          '<div style="'+(i ? '' : 'display:none;')+' margin-bottom: 5px;" align="left" id="settings">'+
          '<a href="#" onclick="return togle(\'autostart\', this, 0);" class="jwp'+(VA['autostart'] ? 1 : 2)+'">'+VA['autostarttxt']+'<span>'+(VA['autostart'] ? VA['ontxt'] : VA['offtxt'])+'</span></a>'+
          ' | '+
          '<a href="#" onclick="return togle(\'repeat\', this);" class="jwp'+(VA['repeat'] ? 1 : 2)+'">'+VA['repeattxt']+'<span>'+(VA['repeat'] ? VA['ontxt'] : VA['offtxt'])+'</span></a>'+
          ' | '+
          '<a href="#" onclick="return togle(\'stretching\', this);" class="jwp'+(VA['stretching'] ? 1 : 2)+'">'+VA['stretchingtxt']+'<span>'+(VA['stretching'] ? VA['ontxt'] : VA['offtxt'])+'</span></a>'+
          ' | '+
          '<a href="#" onclick="return togle(\'logo\', this);" class="jwp'+(VA['logo'] ? 1 : 2)+'">'+VA['logotxt']+'<span>'+(VA['logo'] ? VA['ontxt'] : VA['offtxt'])+'</span></a>'+
          ' | '+
          '<span class="jwpn">'+VA['langtxt']+':</span> <span>'+LangLinks()+'</span>'+
          '</div>'+
          '';
  if (i)
  {
    document.getElementById('vamenu').innerHTML = d;
  }
  return d;
}

var player = null;
]]></r>
//------ End Eval Code ----------

function appendHead(obj)
{
  document.getElementsByTagName("HEAD")[0].appendChild(document.createElement("script")).innerHTML="" + obj + "";
}
function addGlobalStyle(css)
{
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}
addGlobalStyle('.jwp,.jwpn,.jwp0,.jwp1,.jwp2{ color: #0268F4;font-size:10px; font-weight:bold; background:url(http://vario.ru/templates/nftheme/css/img/star.gif) 0 3px no-repeat;padding-left:9px;outline: none;}.jwp0{color:grey;} .jwp1{color:green;background:none;padding-left:inherit;} .jwp2{color:red;background:none;padding-left:inherit;} .jwpn, a.jwpn{background:none;padding-left:inherit;}');

/*
window.addEventListener('load', function(e) {
  var a = document.getElementsByTagName("a");
  for(var i in a)
  {
    if (a[i] && a[i].className == "flv" && a[i].href)
    {
      GM_xmlhttpRequest({
        method: "GET",
        url: a[i].href
      });
    }
  }
}, false);
*/
var o = document.getElementsByTagName("object");
var p = false;
for(var i in o)
{
  if (VA['file'] = o[i].data.match(/flvplayer\.swf\?file=([^"]+)/)[1])
  {
    VA['flashvars']['streamer'] = VA['file'];
    var obj = o[i];
    var p = o[i].parentNode;
    break;
  }
}
if (p && VA['file'])
{
  if (document.getElementById('dle-content') && document.getElementById('dle-content').getElementsByTagName('DIV')[6] && document.getElementById('dle-content').getElementsByTagName('DIV')[6].getElementsByTagName('INPUT')[2])
  {
    VA['thumb'] = document.getElementById('dle-content').getElementsByTagName('DIV')[6].getElementsByTagName('INPUT')[2].value.match(/src="([^"]+)/)[1];
  }
  VA['w'] = parseInt((VA['width']) ? VA['width'] : obj.getAttribute("width"));
  VA['h'] = parseInt((VA['height']) ? VA['height'] : obj.getAttribute("height"));
  eval(jse.toString())
  var c;
  for (var i in VA['cookies'])
  {
    c = readCookie("vae"+i);
    if (c !== null)
    {
      switch(VA['cookies'][i])
      {
        case "text":
            VA[i] = c;
          break;

        case "int":
            VA[i] = parseInt(c);
          break;

        default:
            VA[i] = parseInt(c) ? true : false;
          break;
      }
    }
  }
  Lang();
  unsafeWindow.VA = VA;
  appendHead(js);
  appendHead(jse+Lang.toString());
  var n = document.createElement("div");
  n.style.width = VA['w']+'px';
  n.setAttribute("id", "test");
  p.removeChild(obj);
  p.appendChild(n).innerHTML = '<div style="width:'+VA['w']+'px; height:'+VA['h']+'px; background-color:black;">'+
    '<div style="width:'+VA['w']+'px; height:'+VA['h']+'px; position:absolute;"><img src="'+VA['thumb']+'" style="width:'+VA['w']+'px; height:'+VA['h']+'px;" id="thumb"></div>'+
    '<span id="jwp">'+jwp()+'</span>'+
    (VA['logo'] ? '<div align="right" style="position: relative; top:-66px; left: -12px; float: right;"><a href="/" style="outline: none;"><div style="width:150px; height:33px;"></div></a></div>' : '')+
    '</div>'+
    '<span id="vamenu">'+
    Menu()+
    '</span>'+
    '</div>'+
    '';
//  document.getElementById('vamenu').innerHTML = "";
}
