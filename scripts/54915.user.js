var metadata = <><![CDATA[
// ==UserScript==
// @name          CoderZ-Treff.de Extended
// @version       1.1.1
// @author        Samuel Essig (http://c1b1.de)
// @description   Erweitert das Burning Board Lite auf CoderZ-Treff.de um einige Funktionen
// @namespace     c1b1.de
// @homepage      http://c1b1.de
// @copyright     (c) 2009, Samuel Essig (http://c1b1.de)
// @license       CC Attribution-Noncommercial-Share Alike 3.0 Germany; http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode
// @include       http://coderz-treff.de/index.php*
// ==/UserScript==
]]></>;

/*

############## Distribution Information ##############

All content by c1b1.de
Do not distribute this script without this header.

###################### Filename ######################

BurningBoardLiteQuoter.user.js

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

####################### License ######################

Shared under the 'CC Attribution-Noncommercial-Share Alike 3.0 Germany' License:
http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode

English Summary of that license:
http://creativecommons.org/licenses/by-nc-sa/3.0/de/deed.en

*/

//################### Description ####################

/*

Features:

 - markierten Text zitieren
 - Editor steht immer auf Quellcode
 - Alle Seiten eines Threads von der Boardübersicht aus erreichbar ("Seitenzahlen"-Links werden hinzugefügt)
 - Inline Edit Funktion

*/

//################# Settings #########################

const posts_per_page = 19;
const monthnames = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];

//############### Common Functions ###################

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
    e.addEventListener(evt[0],evt[1],false);
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
function trim(str) { return str.replace(/^\s+/, '').replace(/\s+$/, ''); }
function test(fct,elsewise) { try {fct();} catch(error) {}; return typeof(elsewise) == 'undefined' ? void(0) : elsewise ; }
function dragable(element,pixel)
  {
  var click_position,clone = false,active = false,current_position = new Array(rel_left(element),rel_top(element));
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
function grabText(node,maxDepth)
  {
  if(3 == node.nodeType)
    return node.nodeValue;
  else if((1 == node.nodeType) && (0 < maxDepth))
    {
    var result = '';
    for(var i = 0; i < node.childNodes.length; i++)
      result += grabText(node.childNodes[i],maxDepth - 1);
    return result;
    }
  return '';
  }
function trim(str)
  {
  return str.replace(/^\s+/, '').replace(/\s+$/, '');
  }




//############### Special Functions ##################

// void showInfo()
function showInfo()
  {
  var div = n('div',{'style':'max-width:400px; z-index:1000; padding:10px; position:absolute; top:20%; left:20%; background-color:LightSteelBlue; border:5px outset LightGrey; -moz-border-radius:20px 30px; '});

  var info_text = '\nCoderZ-Treff.de Extended\
\n\
\n(c) 2009 by c1b1.de\
\n         info@c1b1.de\
\n         http://c1b1.de\
\n\
\n   Download:\n';


  var info_p = n('p',{'style':'overflow:auto; padding:3px; border:3px Gray double; white-space:pre-wrap; '},false,false,info_text,n('a',{'href':'http://userscripts.org/scripts/show/54915/'},false,false,'Userscripts.org'));


  var meta = n('p',{'style':'white-space:pre-wrap; padding:3px; background:Silver; text-align:left;'},false,false,trim(metadata.toString()));

  var license_p = n('p',{'style':'overflow:auto; padding:3px; border:3px Gray double; margin-top:10px;'},false,false,n('a',{'href':'http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode'},false,false,'Link zur Lizenz'),n('br'),meta);

  div.appendChild(n('h4',false,false,false,'About it'));
  div.appendChild(info_p);
  div.appendChild(license_p);

  div.appendChild(n('input',{'type':'button','value':'Close'},['click',function(){this.parentNode.parentNode.removeChild(this.parentNode);},false]));

  tag('body')[0].appendChild(div);

  dragable(div,70);
  div.scrollIntoView(true);

  }

// bool addQuote(MouseEvent e)
function addQuote(e)
  {
  if($('simpleReply').style.display == 'none')
    {
    unsafeWindow.showContent('simpleReply', 'simpleReplyMinimized');
    }

  var par = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
  var username = par.getElementsByClassName('userName')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].firstChild.nodeValue;
  var href = 'index.php?' + par.getElementsByClassName('messageNumber')[0].href.split('?').pop();
  var text = window.getSelection();
  $('text').value += '[quote=' + username + ',' + href + ']' + text + '[/quote]\n\n';

  return false;
  }


// void addQuote()
function addQuoteLinks()
  {
  var posts = document.getElementsByClassName('message');
  for(var i = 0, len = posts.length; i < len; i++)
    {
    if(posts[i].getAttribute('id').substring(0,7) == 'postRow')
      {
      var par = posts[i].getElementsByClassName('messageHeader')[0];

      var a = n('a',{'href':'#'+posts[i].getAttribute('id').substring(7),'title':'Zitieren','style':'margin-left:25px;'},['click',addQuote],false,'Zitieren');

      par.getElementsByClassName('containerContent')[0].getElementsByTagName('p')[0].appendChild(a);
      }
    }
  }



// void addPageNumberLinks()
function addPageNumberLinks()
  {
  var elist = document.getElementsByClassName('tableList')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
  for(var i = 0, len = elist.length; i < len; i++)
    {
    var posts = parseInt(elist[i].getElementsByClassName('columnReplies')[0].firstChild.nodeValue);

    if(posts > posts_per_page)
      {
      var pages = Math.ceil(posts / posts_per_page);

      var par = elist[i].getElementsByClassName('smallPages')[0];

      var href = elist[i].getElementsByClassName('columnTopic')[0].getElementsByTagName('a')[0].href + '&pageNo=';

      var div = n('div',{'class':'pageNavigation'});
      var ul = n('ul');

      for(var x = 1; x <= pages; x++)
        {
        var li = n('li',{'class':'active'},false,false,n('a',{'href':href+x},false,false,x));
        ul.appendChild(li);
        }
      div.appendChild(ul);
      par.appendChild(div);
      }
    }
  }

// void hide_top5()
function hide_top5()
  {
  if($('top5Image').src.indexOf('minusS.png') != -1)
    {
    unsafeWindow.openList('top5', true);
    }
  }


// void show_NewThreads()
function show_NewThreads()
  {
  this.topics = new Array();
  this.toString = function() { return '[object show_NewThreads]'; };

  this.backlog = 0;

  this._sort = function()
    {
    var elist = $('newThreads_tbody').getElementsByTagName('tr');
    var last = false;
    for(var i = 0, len = elist.length; i < len; i++)
      {
      if(!elist[i].getElementsByClassName('columnLastPost')[0])
        continue;

      var timeString = trim(grabText(elist[i].getElementsByClassName('columnLastPost')[0].getElementsByClassName('smallFont light')[0],2));

      var time = timeString.match(/(\d+):(\d+)/);
      var hours = time[1];
      var minutes = time[2];

      var today = timeString.indexOf('Heute') != -1;
      var yesterday = timeString.indexOf('Gestern') != -1;
      if(today)
        {
        var obj = new Date();
        obj.setHours(hours);
        obj.setMinutes(minutes);
        var s = obj.getTime();
        }
      else if(yesterday)
        {
        var obj = new Date();
        obj.setHours(hours);
        obj.setMinutes(minutes);
        var s = obj.getTime() - 1000*60*60*24;
        }
      else
        {
        var date = timeString.match(/(\d+)\. (\D+) (\d+),/);
        var day = date[1];
        var month_name = date[2];
        var year = date[3];
        var month = 0;
        for(var key in monthnames)
          {
          if(month_name == monthnames[key])
            {
            month = key;
            break;
            }
          }
        var obj = new Date(year, month, day, hours, minutes, 0);
        var s = obj.getTime();
        }

      if(last!== false)
        {
        if(last > s)
          {
          elist[i].parentNode.insertBefore(elist[--i]);
          }
        }
      last = s;
      }

    };

  this._createBox = function()
    {
    var shoutboxDiv = document.getElementsByClassName('mainHeadline')[0].nextSibling.nextSibling;
    var newDiv = shoutboxDiv.cloneNode(true);

    var img = newDiv.getElementsByClassName('containerHead')[0].getElementsByTagName('img')[1];
    img.src = 'icon/threadNewL.png';
    img.style.height = '16px';
    img.style.width = '16px';

    img.parentNode.replaceChild(t('Neue Beiträge'),img.nextSibling);


    newDiv.getElementsByClassName('containerIcon')[0].getElementsByTagName('a')[0].setAttribute('onclick','');
    newDiv.getElementsByClassName('containerIcon')[0].getElementsByTagName('a')[0].addEventListener('click',function () { unsafeWindow.openList('newThreads',true); },false);

    newThreads = newDiv.getElementsByClassName('containerHead')[0].nextSibling.nextSibling;
    newThreads.setAttribute('id','newThreads');
    newThreads.innerHTML = '';

    var table = n('ul',{'class':'tableList'});

    var thead = n('thead');
    var trhead = n('tr',{'class':'tableHead'});
    var th1 = n('th',{'class':'columnTopic','colspan':'2'},false,false,n('div',false,false,false,' Thema'));
    var th2 = n('th',{'class':'columnReplies'},false,false,n('div',false,false,false,' Antworten'));
    var th3 = n('th',{'class':'columnViews'},false,false,n('div',false,false,false,' Zugriffe'));
    var th4 = n('th',{'class':'columnLastPost active'},false,false,n('div',false,false,false,' Letzte Antwort'));
    trhead.appendChild(th1);
    trhead.appendChild(th2);
    trhead.appendChild(th3);
    trhead.appendChild(th4);
    thead.appendChild(trhead);
    table.appendChild(thead);
    var tbody = n('tbody',{'id':'newThreads_tbody'});
    var tr = n('tr',{'class':'noNewThreads'},false,false,n('td',{'colspan':'5','style':'text-align:center; font-size:0.85em; font-family:"Trebuchet MS",Arial,sans-serif; '},false,false,'Keine neuen Beiträge'));
    tbody.appendChild(tr);
    marquee = n('marquee',{'behavior':'alternate','scrolldelay':'5','scrollamount':'5','style':'height:19px;width:100px; border:solid 3px rgb(109,143,168);padding:0px;-moz-border-radius:100%;background:url(wcf/images/gamersdevice_blau-container_hintergrund.png) 5px 25px;'},['bounce',function(){this.firstChild.style.borderColor = randomColour();}],false,n('div',{'style':'margin:0px;width:15px; height:15px; border:solid deepskyblue 2px; -moz-border-radius:100%;'}));
    var tr = n('tr',{'class':'loadingNewThreads'},false,false,n('td',{'colspan':'5','style':'text-align:center; '},false,false,marquee));
    tbody.appendChild(tr);
    table.appendChild(tbody);

    newThreads.appendChild(table);

    shoutboxDiv.parentNode.insertBefore(newDiv,shoutboxDiv);

    };


  this._handleResponse = function(xml,url)
    {
    var elist = xml.getElementsByClassName('topic new');
    for(var i = 0, len = elist.length; i < len; i++)
      {
      var tr = elist[i].parentNode.parentNode;
      $('newThreads_tbody').insertBefore(tr,$('newThreads_tbody').firstChild);

      this.backlog--;


      if($('newThreads_tbody').getElementsByClassName('noNewThreads')[0])
        {
        $('newThreads_tbody').getElementsByClassName('noNewThreads')[0].parentNode.removeChild($('newThreads_tbody').getElementsByClassName('noNewThreads')[0]);
        }

      if(this.backlog == 0)
        {
        $('newThreads_tbody').getElementsByClassName('loadingNewThreads')[0].parentNode.removeChild($('newThreads_tbody').getElementsByClassName('loadingNewThreads')[0]);
        }

      }
    this._sort();
    };

  this._getThreads = function(url)
    {
    var url = 'http://' + document.location.host + '/' + url;
    GM_xmlhttpRequest(
      {
      'method': 'GET',
      'url': url,
      'headers': {
        'User-Agent': navigator.userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;'
        },
      'par': this,
      'onload': function(response)
        {
        if (!response.responseXML)
          response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
        this.par._handleResponse(response.responseXML,response.finalUrl);
        }
      });
    };

  // Constructor
  this._createBox();

  var elist = $('boardlist').getElementsByTagName('div');
  for(var i = 0, len = elist.length; i < len; i++)
    {
    if(elist[i].getAttribute('class').indexOf('boardlistInner') != -1 && elist[i].getElementsByTagName('a')[0].getElementsByTagName('span')[0])
      {
      var href = elist[i].getElementsByTagName('a')[0].getAttribute('href');
      this.backlog++;
      this._getThreads(href);
      }
    }
  if(this.backlog == 0)
    {
    setTimeout(function(){$('newThreads_tbody').getElementsByClassName('loadingNewThreads')[0].parentNode.removeChild($('newThreads_tbody').getElementsByClassName('loadingNewThreads')[0])},1500);
    }
  }

// void editEditButton()
function editEditButton()
  {
  var elist = document.getElementsByClassName('extraButton');
  for(var i = 0, len = elist.length; i < len; i++)
    {
    if(elist[i].nextSibling.nextSibling && elist[i].parentNode.parentNode.parentNode.parentNode.getElementsByClassName('messageNumber')[0])
      {

      var li = elist[i].nextSibling.nextSibling;

      var a = li.getElementsByTagName('a')[0];
      a.title = String(a.href);
      var new_href = li.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('messageNumber')[0].hash;
      a.href = new_href;
      a.addEventListener('click',createEditBox,false);

      }
    }
  }

// void createEditBox()
function createEditBox()
  {
  var main = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

  var content_area = main.getElementsByClassName('messageBody')[0];
  content_area.innerHTML = '';

  GM_xmlhttpRequest(
    {
    'method': 'GET',
    'url': this.title,
    'headers': {
      'User-Agent': navigator.userAgent,
      'Accept': 'text/html,application/xhtml+xml,application/xml;'
      },
    'par': this,
    'onload': function(response)
      {
      if (!response.responseXML)
        response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
      importEditEditor.apply(this.par,[response.responseXML]);
      }
    });

  }


// void importEditEditor()
function importEditEditor(xml)
  {
  var main = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

  var content_area = main.getElementsByClassName('messageBody')[0];

  var form = xml.getElementsByTagName('form')[1];

  var editor = form.getElementsByTagName('fieldset')[1].getElementsByTagName('div')[0].cloneNode(true);
  var submit = form.getElementsByClassName('formSubmit')[0].cloneNode(true);

  form.innerHTML = '';

  var checkboxSmilies = n('input',{'type':'checkbox','name':'enableSmilies','value':'1','checked':'checked','style':'visibility:hidden; '});
  var checkboxBBCodes = n('input',{'type':'checkbox','name':'enableBBCodes','value':'1','checked':'checked','style':'visibility:hidden; '});



  submit.getElementsByTagName('input')[2].parentNode.replaceChild(n('input',{'type':'button','value':'Abbrechen'},['click',function () { document.location.reload(true); }]), submit.getElementsByTagName('input')[2]);

  submit.appendChild(checkboxSmilies);
  submit.appendChild(checkboxBBCodes);


  form.appendChild(editor);
  form.appendChild(submit);



  content_area.appendChild(form);
  }

// void addOverviewLink()
function addOverviewLink()
  {
  var a = $('userNote').insertBefore(n('a',{'href':'index.php','title':'Gehe zur Startseite'},false,false,'Startseite'),$('userNote').firstChild);
  $('userNote').insertBefore(n('span',{'style':'margin-left:70px;'}),a.nextSibling);

  $('userMenu').getElementsByTagName('li')[0].parentNode.insertBefore($('userMenu').getElementsByTagName('li')[1],$('userMenu').getElementsByTagName('li')[0]);
  }

// String randomColour()
function randomColour()
  {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return 'rgb('+r+','+g+','+b+')';
  }


//################ Procedural Code ###################


var init = function()
  {
  GM_registerMenuCommand('Burning Board Lite Quoter: About Me', showInfo);

  if($('userNote'))
    {
    addOverviewLink();
    }

  if(document.location.href.indexOf('form=PostAdd') != -1 || document.location.href.indexOf('form=PostEdit') != -1)
    {
    try
      {
      unsafeWindow.tinyMCE.execInstanceCommand('mce_editor_0', 'mceCodeView', false);
      }
    catch(e) {}
    }
  else if(document.location.href.indexOf('page=Board&boardID=') != -1)
    {
    addPageNumberLinks();
    }
  else if(document.location.href.indexOf('page=Thread') != -1)
    {
    editEditButton();
    }

  if($('top5Image'))
    {
    hide_top5();
    var newThreads = new show_NewThreads();
    }

  if($('simpleReplyMinimized'))
    {
    addQuoteLinks();
    }

  }

init();