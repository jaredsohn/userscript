var metadata = <><![CDATA[
// ==UserScript==
// @name          Partyfans Extended
// @version       1.3.2
// @author        Samuel Essig (http://c1b1.de)
// @description   One and only Userscript für partyfans.com - "Widget"-Layout - Werbefreiheit - 2 Spalten-Layout - etc.
// @namespace     c1b1.de
// @homepage      http://c1b1.de
// @copyright     2009, Samuel Essig (http://c1b1.de)
// @license       CC Attribution-Noncommercial-Share Alike 3.0 Germany; http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode
// @include       http://*partyfans.com*
// @exclude       http://board.partyfans.com*
// @exclude       http://*.partyfans.com*board
// ==/UserScript==
]]></>;

/*


############## Distribution Information ##############

All content by c1b1.de
Do not distribute this script without this logo.

######################## Logo ########################
           ___   __       ___             __
  _____   <  /  / /_     <  /        ____/ /  ___
 / ___/   / /  / __ \    / /        / __  /  / _ \
/ /__    / /  / /_/ /   / /   _    / /_/ /  /  __/
\___/   /_/  /_.___/   /_/   (_)   \__,_/   \___/

######################################################

If you have any questions, comments,
ideas, etc, feel free to contact me
and I will do my best to respond.

         mail:info@c1b1.de

         skype:c1b1_se

         http://c1b1.de

         twitter: http://twitter.com/c1b1se

####################### License ######################

Shared under the 'CC Attribution-Noncommercial-Share Alike 3.0 Germany' License:
http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode

English Summary of that license:
http://creativecommons.org/licenses/by-nc-sa/3.0/de/deed.en

*/

//################### Description ####################

/*
Description:
------------

Screenshots:
http://bthost.de/bthost/files/24.06.2009/partyfans.noad.jpg (260 KB)



*/



//#################### Settings ######################


const reloadMessages = 30;  // Reload Messages every X seconds


//################ Common Functions ##################

function deserialize(name, def) { return eval(GM_getValue(name, (def || '({})'))); }
function serialize(name, val) { GM_setValue(name, uneval(val)); }
function $(id) { return document.getElementById(id); };
function name(name) { return document.getElementsByName(name); };
function tag(name, parent)
  {
  if(!parent)
    return document.getElementsByTagName(name);
  return parent.getElementsByTagName(name);
  }
function d(id) { document.getElementById(id).parentNode.removeChild(document.getElementById(id)); };
function n(type,attrs,evt,html,args)
  {
  var e = document.createElement(type);
  if(attrs)
    for(var attr in attrs)
      if(attr == 'style' && typeof(attrs[attr]) == 'object')
        for(var property in attrs[attr])
          e.style[property] = attrs[attr][property];
      else
        e.setAttribute(attr,attrs[attr]);
  if(evt)
    e.addEventListener(evt[0],evt[1],evt[2]);
  if(html)
    e.innerHTML = html;
  if(html === false)
    for(var i = 4; i < arguments.length; i++)
      if(!arguments[i].nodeType)
        e.appendChild(document.createTextNode(arguments[i]));
      else
        e.appendChild(arguments[i]);
  return e;
  }
function t(str) { return document.createTextNode(str); };
function test(fct,elsewise) { try { return fct(); } catch(error) {}; return typeof(elsewise) == 'undefined' ? void(0) : elsewise ; }
function getChilds(mother,tagname)
  {
  if(tagname)
    tagname = tagname.toUpperCase;
  var element = mother.firstChild;
  var childs = new Array();
  while(element)
    {
    if((tagname && element.tagName && element.tagName.toUpperCase == tagname) || (!tagname && element.tagName))
      childs.push(element);
    element = element.nextSibling;
    }
  return childs;
  }
function dragable(element,pixel,ondrop)
  {
  var click_position,clone = false,active = false,current_position = new Array(rel_left(element),rel_top(element));
  var ondrop_fct = ondrop?ondrop:function(){};
  with(element) {
    style.position = 'absolute';
    style.left = current_position[0] + 'px';
    style.top = current_position[1] + 'px';
    addEventListener('mousedown',function(e) {
      if(clone) { try {
        clone.parentNode.removeChild(clone);
        clone = false; } catch(e){} }
      current_position[0] = parseInt(this.style.left);
      current_position[1] = parseInt(this.style.top);
      click_position = new Array(e.pageX - current_position[0],e.pageY - current_position[1]);
      if(pixel === false)
        pixel = this.clientHeight;
      if(pixel?(click_position[1] > pixel):(click_position[1] > this.clientHeight / 7))
        return;
      clone = element.cloneNode(true);
      element.parentNode.insertBefore(clone,element);
      element['style']['opacity'] = 0.5;
      this.style.cursor = 'move';
      active = true;
      },false);
    addEventListener('mouseup',function() {
      ondrop_fct.apply(this);
      this.style.cursor = 'default';
      active = false;
      this.style.opacity = 1.0;
      try { clone.parentNode.removeChild(clone); clone = false; } catch(e){};
      },false);
    }
  document.addEventListener('mousemove',function(e) {
    if(active)
      with(element) {
        style.left = (e.pageX - click_position[0]) + 'px';
        style.top = (e.pageY - click_position[1]) + 'px'; }
    },false);
  }
function rel_top(e)
  {
  var y = 0;
  while(e)
    y += e.offsetTop + e.clientTop,e = e.offsetParent;
  return y;
  }

function rel_left(e)
  {
  var x = 0;
  while(e)
    x += e.offsetLeft + e.clientLeft,e = e.offsetParent;
  return x;
  }
function parseToDSTime(obj,secs)
  {
  var now = new Date();
  if(!secs)
    {
    if(now.getMonth() == obj.getMonth()  && now.getDate() == obj.getDate())
      return 'heute um '+((obj.getHours()>9?obj.getHours():'0'+obj.getHours()) + ':' + (obj.getMinutes()>9?obj.getMinutes():'0'+obj.getMinutes())) + ' Uhr';
    else if(now.getMonth() == obj.getMonth()  && (now.getDate()+1) == obj.getDate())
      return 'morgen um '+((obj.getHours()>9?obj.getHours():'0'+obj.getHours()) + ':' + (obj.getMinutes()>9?obj.getMinutes():'0'+obj.getMinutes())) + ' Uhr';
    else
      return (obj.getDate()>9?obj.getDate():'0'+obj.getDate()) + '.' + ((obj.getMonth()+1)>9?(obj.getMonth()+1):'0'+(obj.getMonth()+1)) + '.'+ (String(obj.getFullYear()).substr(2)) + ' ' + (obj.getHours()>9?obj.getHours():'0'+obj.getHours()) + ':' + (obj.getMinutes()>9?obj.getMinutes():'0'+obj.getMinutes());
    }
  else
    {
    if(now.getMonth() == obj.getMonth()  && now.getDate() == obj.getDate())
      return 'heute um '+((obj.getHours()>9?obj.getHours():'0'+obj.getHours()) + ':' + (obj.getMinutes()>9?obj.getMinutes():'0'+obj.getMinutes()) + ':' + (obj.getSeconds()>9?obj.getSeconds():'0'+obj.getSeconds())) + ' Uhr';
    else if(now.getMonth() == obj.getMonth()  && (now.getDate()+1) == obj.getDate())
      return 'morgen um '+((obj.getHours()>9?obj.getHours():'0'+obj.getHours()) + ':' + (obj.getMinutes()>9?obj.getMinutes():'0'+obj.getMinutes()) + ':' + (obj.getSeconds()>9?obj.getSeconds():'0'+obj.getSeconds())) + ' Uhr';
    else
      return (obj.getDate()>9?obj.getDate():'0'+obj.getDate()) + '.' + ((obj.getMonth()+1)>9?(obj.getMonth()+1):'0'+(obj.getMonth()+1)) + '.'+ (String(obj.getFullYear()).substr(2)) + ' ' + (obj.getHours()>9?obj.getHours():'0'+obj.getHours()) + ':' + (obj.getMinutes()>9?obj.getMinutes():'0'+obj.getMinutes()) + ':' + (obj.getSeconds()>9?obj.getSeconds():'0'+obj.getSeconds());
    }
  }


//################ Special Functions #################


function widgetize(id,heading,nodes,x,y,option)
  {
  if(!option)
    option = {};

  // Try to get saved config:
  var old = GM_getValue('widgets','{}');
  old = JSON.parse(old);

  if(old[id])
    {
    var config = old[id];
    if(config.x)
      x = config.x;
    if(config.y)
      y = config.y;
    }


  this.widget = n('div', {'id':id,'style' : {'position':'absolute', 'padding' : '5px', 'left':'10px', 'top':'25px' } } );

  if(option.border !== false)
    {
    this.widget.style.border = '1em groove Silver';
    this.widget.style.MozBorderRadius = '15px';
    }

  if(option.background !== false)
    {
    this.widget.style.background= 'Silver';
    }

  if(option.heading !== false)
    {
    var bar = n('div',{'style':{'paddingLeft':'20px','height':'20px','color':'DarkBlue','fontSize':'19px','fontFamily':'Monospace','fontWeight':'800','border':'0px solid DarkBlue','borderBottomWidth':'3px','margin':'-5px','marginBottom':'15px'}},false,false,heading);
    this.widget.appendChild(bar);
    }

  for(var i in nodes)
    {
    if(nodes[i])
      {
      nodes[i].style.position = 'relative';
      nodes[i].style.left = '0px';
      nodes[i].style.top = '0px';
      this.widget.appendChild(nodes[i]);
      }
    }

  this.widget.style.left = x+'px';
  this.widget.style.top = y+'px';

  this.appendTo = function(node)
    {
    node.appendChild(this.widget);

    if(option.dragable !== false)
      dragable(this.widget,option.dragable?option.dragable:60,function() {
        if(!this.id)
          return;
        var x = parseInt(this.style.left);
        var y = parseInt(this.style.top);
        var old = GM_getValue('widgets','{}');
        old = JSON.parse(old);
        old[this.id] = {'x':x,'y':y};
        old = JSON.stringify(old);
        GM_setValue('widgets',old);
        });

    return this.widget;
    }
  }



// void setStatusOnline()
function setStatusOnline()
  {
  try {
    unsafeWindow.setOnline();
    unsafeWindow.keepOnline();
    }
  catch(e)
    {
    try
      {
      unsafeWindow.keepOnline();
      }
    catch(e)
      { }
    }
  }

// void show_characteristics_frame(MouseEvent e)
function show_characteristics_frame(e)
  {
  var user_id = this.getAttribute('title').match(/((\d+))/)[0];

  var mouseposition = new Array(e.pageX-50,e.pageY-50);

  var frame_style = 'background-color:#dddddd; z-index:20; opacity:0.95; display:block; position:fixed; height:400; width:650; left:50px; top:50px; padding:5px; ';

  if(!name('characteristics_frame')[0])
    {
    var frame = n('iframe');
    with(frame)
      {
      setAttribute('style',frame_style);
      setAttribute('src','http://www.partyfans.com/community/details.php?detid='+user_id);
      setAttribute('name','characteristics_frame');
      setAttribute('id','characteristics_frame_u'+user_id);
      style.border = '3px solid Silver';
      style.MozBorderRadius = '15px';
      addEventListener('mouseout',function(){this.style.display = 'none'; },false);
      }
    tag('body')[0].appendChild(frame);
    }
  else
    {
    var frame = name('characteristics_frame')[0];
    with(frame)
      {
      setAttribute('src','http://www.partyfans.com/community/details.php?detid='+user_id);
      setAttribute('style',frame_style);
      style.border = '3px solid Silver';
      style.MozBorderRadius = '15px';
      }
    }

  }


// void showInfo()
function showInfo()
  {

  var div = n('div',{'style':'width:800px; max-width:1000px;  z-index:10; padding:10px; position:absolute; top:10%; left:1%; background-color:LightSteelBlue; border:5px outset LightGrey; -moz-border-radius:20px 30px; '});

  var info_text = 'The One And Only Userscript for partyfans.com\n\
  - keine Werbung                                               \n\
  - zwei Spalten Layout                                         \n\
  - Reload Daten                                                \n\
  - Nie Abwesend                                                \n\
                                                                \n\
Empfohlene Auflösung: 1680x1050px                               \n\
                                                                \n\
Updates unter:                                                  \n\
                                                                \n\
<a href="http://userscripts.org/scripts/show/44689">http://userscripts.org/scripts/show/44689</a>                       \n\
                                                                \n\
<a href="http://www.partyfans.com/community/details_freund.php?detid=144668">Mich als Freund hinzufügen</a>                                                                \n\
                                                                \n\
                                                                \n\
                                                                \n\
All content by <a href="http://www.c1b1.de">c1b1.de</a>                                          \n\
Do not distribute this script without this logo.                \n\
                                                                \n\
######################## Logo ########################          \n\
<a href="http://www.c1b1.de">                                   \n\
           ___   __       ___             __                    \n\
  _____   <  /  / /_     <  /        ____/ /  ___               \n\
 / ___/   / /  / __ \    / /        / __  /  / _ \              \n\
/ /__    / /  / /_/ /   / /   _    / /_/ /  /  __/              \n\
\___/   /_/  /_.___/   /_/   (_)   \__,_/   \___/               </a>\n\
                                                                \n\
######################################################          \n\
                                                                \n\
If you have any questions, comments,                            \n\
ideas, etc, feel free to contact me                             \n\
and I will do my best to respond.                               \n\
         <a href="http://www.partyfans.com/community/details.php?detid=144668">partyfans.com: C1B1</a>                                    \n\
                                                                \n\
         <a href="mail:info@c1b1.de">mail:info@c1b1.de</a>                                      \n\
                                                                \n\
         <a href="skype:c1b1_se">skype:c1b1_se</a>                                          \n\
                                                                \n\
         <a href="http://www.c1b1.de">http://c1b1.de</a>                                         \n\
                                                                \n\
         <a href="http://twitter.com/c1b1se">twitter: http://twitter.com/c1b1se</a>                     \n\
                                                                \n\
####################### License ######################          \n\
                                                                \n\
Shared under the                                                \n\
\'CC Attribution-Noncommercial-Share Alike 3.0 Germany\'        \n\
License:                                                        \n\
<a href="http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode">http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode</a>   \n\
                                                                \n\
English Summary of that license:                                \n\
<a href="http://creativecommons.org/licenses/by-nc-sa/3.0/de/deed.en">http://creativecommons.org/licenses/by-nc-sa/3.0/de/deed.en</a>     \n\
                                                                \n';

  var info_p = n('p',{'style':'overflow:auto; padding:3px; border:3px Gray double; white-space:pre-wrap; max-height:400px; '},false,info_text);

  div.appendChild(n('h4',false,false,false,'About it'));
  div.appendChild(info_p);

  div.appendChild(n('input',{'type':'button','value':'Close'},['click',function(){this.parentNode.parentNode.removeChild(this.parentNode);},false]));

  tag('body')[0].appendChild(div);

  dragable(div,70);
  }

// void showStartScreen()
function showStartScreen()
  {
  var div = n('div',{'style':'position:fixed; top:0px; left:0px; right:0px; bottom:0px; background:black url("http://bthost.de/bthost/files/12.07.2009/bg.jpg") center center; z-index:3; opacity:0.9;' });
  tag('body')[0].appendChild(div);

  var enter = n('div',{'style':'cursor:pointer; margin-left:-36px; margin-top:-25px; padding:20px; position:fixed; top:50%; left:50%; z-index:4; opacity:1.0; background:black; border:ridge 5px rgb(240,166,55); -moz-border-radius:13px; color:white; font-family:sans-serif; font-size:20px' },['click',function(){document.location.href='http://www.partyfans.com/?dest=30';},false],false,'Enter');
  enter.addEventListener('mouseover',function(){ this.style.borderColor = 'green'; this.style.fontSize = '26px'; this.style.padding = '16px 13px'; this.style.color = 'Gold'; },false);
  enter.addEventListener('mouseout',function(){ this.style.borderColor = 'rgb(240,166,55)'; this.style.fontSize = '20px'; this.style.padding = '20px 20px'; this.style.color = 'White'; },false);
  div.appendChild(enter);


  var status_field = n('div',{'style':'margin-left:-36px; margin-top:-25px; padding:20px; position:fixed; top:5%; left:5%; z-index:4; opacity:1.0; background:black; border:ridge 5px rgb(240,166,55); -moz-border-radius:13px; color:white; font-family:sans-serif; font-size:12px' });

  if(own_user_name)
    {
    div.appendChild(n('h2',false,false,false,'Status'));
    status_field.appendChild(t('Du bist eingeloggt mit dem Nickname '+own_user_name));
    status_field.appendChild(n('br'));
    status_field.appendChild(n('span',{'style':{'color':'Blue'}},['click',function() {unsafeWindow.changeStatus(0);},false],false,'Ausloggen'));
    status_field.appendChild(n('br'));
    if(own_status == 2)
      {
      status_field.appendChild(n('span',{'style':{'color':'Blue'}},['click',function() {unsafeWindow.changeStatus(1);},false],false,'Abwesend beenden'));
      }
    else
      {
      status_field.appendChild(n('span',{'style':{'color':'Blue'}},['click',function() {unsafeWindow.changeStatus(2);},false],false,'Abwesend setzen'));
      }

    var messages_field = n('div',{'id':'PartyfansExtended_startScreen_messages','style':'margin-left:-36px; margin-top:-25px; padding:20px; position:fixed; top:5%; right:5%; z-index:4; opacity:1.0; background:black; border:ridge 5px rgb(240,166,55); -moz-border-radius:13px; color:white; font-family:sans-serif; font-size:11px' });

    div.appendChild(messages_field);

    getNewMessages();

    }
  else
    {
    status_field.appendChild(n('h2',false,false,false,'Einloggen:'));
    status_field.appendChild(document.getElementsByTagName('form')[1].cloneNode(true));
    var table = status_field.getElementsByTagName('table')[0];
    table.setAttribute('class','');
    table.setAttribute('style','color:White; ');
    try {
      var x = table.parentNode.getElementsByTagName('div')[0];
      x.getElementsByTagName('input')[0].setAttribute('checked','checked');
      x.g.getElementsByTagName('input')[0].setAttribute('style','visibility:hidden; ');
      x.getElementsByTagName('input')[1].setAttribute('value','1');
      x.getElementsByTagName('input')[3].setAttribute('class','');
      } catch(e) {}
    }

  div.appendChild(status_field);
  }


// void getNewMessages()
function getNewMessages()
  {
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.partyfans.com/community/loadCommbar.php?data=2&PHPSESSID='+unsafeWindow.sId,
    headers: { 'User-Agent': 'Mozilla/5.0' },
    onload: function(response)
      {
      var text = response.responseText;
      var ar = text.split('\n');
      var arr = new Array();
      for(var i = 0; i < ar.length; i++)
        {
        if(ar[i])
          arr.push( ar[i].split('\t') );
        }
      showNewMessages(arr);
      }
    });
  }

// void showNewMessages(Array ar)
function showNewMessages(ar)
  {
  var div = $('PartyfansExtended_startScreen_messages');

  div.innerHTML = '';

  div.appendChild(n('h2',false,false,false,'Nachrichten'));

  var table = n('table');

  for(var i = 0; i < ar.length; i++)
    {
    // ar[i] = [ MessageID , Subject , Sender , SenderID , timestamp  ]

    ar[i][4] *= 1000;


    var tr = n('tr');

    var subject = n('td',{'title' : 'Nachricht lesen','style':'color:White; cursor:pointer; ','rel':ar[i][0]},['click',function() {unsafeWindow.openMessage(this.getAttribute('rel')); return false;},false],false,ar[i][1]);

    var sender = n('td',{'title' : 'Steckbrief von '+ar[i][2]+' öffnen','style':'color:White; cursor:pointer; ','rel':ar[i][3]},['click',function() {unsafeWindow.openWind(this.getAttribute('rel')); return false;},false],false,ar[i][2]);

    var time = n('td',{'style':'color:White; font-size:9px; '},false,false,parseToDSTime(new Date(ar[i][4])));

    tr.appendChild(subject);
    tr.appendChild(sender);
    tr.appendChild(time);

    table.appendChild(tr);
    }

  div.appendChild(table);
  }

// void gotTo_homepage()
function gotTo_homepage()
  {
  document.location.href = 'http://www.partyfans.com/';
  }

// void newPageLayout()
function newPageLayout()
  {
  var x1 = tag('body')[0].clientWidth / 2;
  var x2 = 767 / 2;
  var x = x1 - x2;

  x+=250;

  var center_page = n('div',{'id': 'PartyfansExtended_centering_page', 'style' : 'position:absolute; left:'+x+'px ' });

  var elist = getChilds(tag('body')[0]);
  for(var i = 0, len = elist.length; len > i; i++)
    {
    center_page.appendChild(elist[i]);
    }

  tag('body')[0].appendChild(center_page);

  _showAboutMe();
  _showMessageIFrame();
  _formatMenu();
  _showReloadButton();
  }

// void _showAboutMe()
function _showAboutMe()
  {
  var info_img = n('img',{'title': 'About me','alt': 'About me', 'src':'http://bthost.de/bthost/files/18.10.2009/c1b1.png' , 'style' : 'position:absolute; bottom:5px; right:5px; opacity:0.3; ' },['click',showInfo,false]);
  tag('body')[0].appendChild(info_img);
  }

// void _showMessageIFrame()
function _showMessageIFrame()
  {
  var message_frame_holder = n('div',{'id': 'PartyfansExtended_message_frame_holder', 'style' : {'position':'absolute', 'padding' : '1px', 'background-color' : '#dddddd', 'left':'10px', 'top':'25px', 'border' : '3px solid Silver', 'MozBorderRadius' : '15px' } });
  var message_frame = n('iframe',{'id': 'PartyfansExtended_message_frame', 'src' : 'http://www.partyfans.com/community/messenger/messages.php','height' : '740', 'width' : '520', 'frameborder' : '0' });

  message_frame_holder.appendChild(n('input',{'id':'PartyfansExtended_message_frame_urlbar','type':'text','value':'http://www.partyfans.com/community/messenger/messages.php','style':'width:95%; margin-left:0 auto 3px auto; display:block; font-size:xx-small; opacity:0.7; border:1px solid white; -moz-border-radius:3px; '},['change',function(){ if($('PartyfansExtended_message_frame').src == this.value)$('PartyfansExtended_message_frame').contentDocument.location.reload(true); else if(this.value != '') $('PartyfansExtended_message_frame').src = this.value; else $('PartyfansExtended_message_frame').src = 'http://www.partyfans.com/community/messenger/messages.php'; },false]));

  message_frame_holder.appendChild(message_frame);

  tag('body')[0].appendChild(message_frame_holder);

  // Timout:
  var loop_reload_message_frame = window.setInterval(
  function()
    {
    if($('PartyfansExtended_message_frame'))
      {
      test(function()
        {
        var frame_url = $('PartyfansExtended_message_frame').contentDocument.location.href;
        var index = frame_url.indexOf('messages.php');
        if(index == -1)
          return;
        var rest = frame_url.substring(index);
        if(rest.length == 12 || rest.indexOf('typ=0') != -1) //   rest.length == 12 == messages.php  && rest.indexOf('typ=0') != -1 ==  messages.php?typ=0
          $('PartyfansExtended_message_frame').contentDocument.location.reload(true);
        });
      }
    }
  , reloadMessages*1000);
  }

// void _showReloadButton()
function _showReloadButton()
  {
  var reloadButton = tag('body')[0].appendChild
    (
    n('img',
      {
      'src':'http://bthost.de/bthost/files/24.06.2009/pf_reload.png',
      'alt':'Reload()',
      'id' : 'PartyfansExtended_reloadButton',
      'style':'padding-top:50px; -moz-border-radius:50px; padding:15px; border:1px solid #0a1a57; background:#405192 url(http://bthost.de/bthost/files/24.06.2009/Reload_page.png) no-repeat center center; opacity:0.5; top:150px; left:'+(parseInt($('PartyfansExtended_centering_page').style.left)-120)+'px; position:absolute; '
      }
      ,[
      'dblclick',
      function()
        {
        document.location.reload();
        },
      false]
      )
    );
  }


// void _formatMenu()
function _formatMenu()
  {
  test(function()
    {
    document.getElementsByClassName('hauptMenButtons')[0].parentNode.removeChild(document.getElementsByClassName('hauptMenButtons')[0]);
    document.getElementsByClassName('hauptMenButtons')[0].parentNode.removeChild(document.getElementsByClassName('hauptMenButtons')[0]);
    document.getElementsByClassName('hauptMenButtons')[0].parentNode.removeChild(document.getElementsByClassName('hauptMenButtons')[1]);

    document.getElementsByClassName('hauptMenButtons')[0].style.left = '19px';
    $('men3').style.left = '8px';
    });
  }

// void formatMessageFrameContent()
function formatMessageFrameContent()
  {
  test(function()
    {
    parent.window.document.getElementById('PartyfansExtended_message_frame_urlbar').value = document.location.href

    var table = document.getElementsByClassName('textgr')[0];

    var td = table.getElementsByTagName('td')[0].cloneNode(true);

    table.innerHTML = '';
    table.appendChild(td);

    document.getElementsByClassName('menue')[0].parentNode.removeChild(document.getElementsByClassName('menue')[0]);
    document.getElementsByClassName('text')[1].parentNode.removeChild( document.getElementsByClassName('text')[1] );

    document.getElementsByClassName('text')[2].style.marginTop = '-18px';

    document.getElementsByTagName('div')[2].setAttribute('id','PartyfansExtended_headerMenu');

    tag('body')[0].setAttribute('onClick','');
    });
  }

// void removeAdware()
function removeAdware()
  {
  test(function()
    {
    // Other adware ( object elements )
    while( tag('object')[0] )
      tag('object')[0].parentNode.removeChild(tag('object')[0]);

    // Ad below menu line:
    if( $('leaderboard') )
      {
      $('leaderboard').parentNode.getElementsByClassName('text')[0].style.marginTop = '-90px';
      d('leaderboard');
      }

    // Right Ad:
    if( $('stickyadbanner') )
      d('stickyadbanner');

    });
  }

// intervalID neverByAway()
// #Utilizes: global x
function neverBeAway()
  {
  x = window.setInterval(setStatusOnline, 15000);
  return x;
  }


// void addEvents_showCharacteristicsOnClickOnName()
function addEvents_showCharacteristicsOnClickOnName()
  {
  // Show characteristics on mouse over name
  var table = $('friendsTable').getElementsByTagName('tbody')[0];
  var elist = table.getElementsByTagName('td');
  for(var i = 0, len = elist.length; len > i; i++)
    {
    test(function()
      {
      var a = elist[i].getElementsByTagName('a')[2];
      a.setAttribute('title',a.getAttribute('onclick'));
      a.removeAttribute('onclick');
      a.addEventListener('dblclick',function() { eval(this.title); },false);
      a.addEventListener('click',show_characteristics_frame,false);
      });
    }
  }

// intervalID checkForNewMessages()
// #Utilizes: global musicplayer
function checkForNewMessages()
  {
  return window.setInterval(
    function()
      {
      if($('messCount'))
        {
        var n = parseInt($('messCount').innerHTML);
        if(n > 0)
          {
          if(!musicplayer.playing)
            musicplayer.play();
          }
        else
          {
          if(musicplayer.playing)
            musicplayer.stop();
          }
        }
      }
    , 5000);
  }

// SoundPlayer SoundPlayer()
function SoundPlayer()
  {
  this.playing = false;
  this.sound = document.createElement('embed');
  with(this.sound)
    {
    id = 'PartyfansExtended_newMessageSoundElement';
    name = 'PartyfansExtended_newMessageSoundElement';
    src = 'http://www.step5.de/Luftschutzsirene-de/LuftalarmFunk.mp3';
    width = '300';
    height = '20';
    autostart = 'true';
    loop = 'true';
    repeat = 'true';
    style.visibility = 'hidden';
    allowscriptaccess = 'always';
    enablejavascript = 'true';
    }

  this.play = function(url)
    {
    this.sound.src = url?url:'http://www.step5.de/Luftschutzsirene-de/LuftalarmFunk.mp3';
    this.sound.style.visibility = 'visible';
    document.body.appendChild(this.sound);
    this.playing = true;
    }

  this.stop = function()
    {
    this.sound.parentNode.removeChild(this.sound);
    this.playing = false;
    }


  }



//################# Procedural Code ##################


// Shit:
const url = document.location.href;
const own_user_name = test( function() {
  var name = $('commBar').getElementsByTagName('li')[1].getElementsByTagName('b')[0].firstChild.nodeValue;
  return name=='mitmachen'?false:name; } , false);

const own_status = test( function() {
  return $('statChanger').options[$('statChanger').selectedIndex].value; } , 0);

const home = url=='http://www.partyfans.com/';
const index = home?false:url.match(/\.php/) == null;
const messages_php = url.indexOf('community/messenger/messages.php') != -1;
const dest = index?parseInt((url.match(/dest=(\d+)/)?url.match(/dest=(\d+)/)[1]:0)):false;



// Names
const anchor = window.location.hash;
var x,musicplayer = new SoundPlayer();

// Run on every page:
removeAdware();
neverBeAway();

// Special anchors
switch(anchor)
  {
  case '':
    break;

  default:
    document.location.href = url.split(anchor).shift();  // Remove anchor from url

  }

// Special pages:
switch(url)
  {
  case 'http://www.partyfans.com/':
  case 'http://www.partyfans.com':
  case 'http://www.partyfans.com/index.php':
  case 'http://www.partyfans.com/?dest=0':
  case 'http://www.partyfans.com/index.php?dest=0':
    // Startseite
    //showStartScreen();
    break;

  case 'http://www.partyfans.com/index.php?dest=30':
  case 'http://www.partyfans.com/?dest=30':
    // Userseite
    newPageLayout();
    addEvents_showCharacteristicsOnClickOnName();
    checkForNewMessages();
    break;

  case 'http://www.partyfans.com/index.php?dest=302':
  case 'http://www.partyfans.com/?dest=302':
    // Usergalerie
    newPageLayout();
    break;

  case 'http://www.partyfans.com/index.php?dest=320':
  case 'http://www.partyfans.com/?dest=320':
    // Partyblog
    newPageLayout();
    break;

  case 'http://www.partyfans.com/index.php?dest=319':
  case 'http://www.partyfans.com/?dest=319':
    // Fotoalbum
    newPageLayout();
    break;

  case 'http://www.partyfans.com/index.php?dest=310':
  case 'http://www.partyfans.com/?dest=310':
    // Steckbrief bearbeiten
    newPageLayout();
    break;

  case 'http://www.partyfans.com/index.php?dest=313':
  case 'http://www.partyfans.com/?dest=313':
    // Einstellungen
    newPageLayout();
    break;

  case 'http://www.partyfans.com/index.php?dest=314':
  case 'http://www.partyfans.com/?dest=314':
    // Freundeliste
    newPageLayout();
    break;

  case 'http://www.partyfans.com/index.php?dest=318':
  case 'http://www.partyfans.com/?dest=318':
    // Ignorierte User
    newPageLayout();
    break;

  case 'http://www.partyfans.com/community/messenger/messages.php':
  case 'http://www.partyfans.com/community/messenger/messages.php?typ=0':
    formatMessageFrameContent();
    break;

  case 'http://www.partyfans.com/community/messenger/messages.php?typ=1':
    formatMessageFrameContent();
    break;

  case 'http://board.partyfans.com/index.php':
  case 'http://board.partyfans.com/':
    // Forum
    break;


  default:
    if(url.indexOf('userLogin.php') != -1)
      {
      // User logged in at the moment
      gotTo_homepage();
      }

  }


// Widgetize
if($('PartyfansExtended_centering_page') && $('PartyfansExtended_message_frame_holder'))
  {
  var mainpage = new widgetize('PartyfansExtended_widget_mainpage','Partyfans.com',[$('PartyfansExtended_centering_page')],720,5);
  var frameholder = new widgetize('PartyfansExtended_widget_frameholder','Nachrichten',[$('PartyfansExtended_message_frame_holder')],5,5,{border:false,dragable:30});
  var reloadbutton = new widgetize('PartyfansExtended_widget_reloadbutton','Reload',[$('PartyfansExtended_reloadButton')],620,150,{border:false,background:false,heading:false,dragable:150});

  mainpage.appendTo(document.getElementsByTagName('body')[0]);
  frameholder.appendTo(document.getElementsByTagName('body')[0]);
  reloadbutton.appendTo(document.getElementsByTagName('body')[0]);
  }
