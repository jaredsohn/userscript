// ==UserScript==
// @name          DS #Posts
// @version       1.8
// @author        Samuel Essig (http://c1b1.de)
// @description   Zählt die Posts eines Members im Internen Forum
// @namespace     c1b1.de
// @homepage      http://c1b1.de
// @copyright     2009-2013, Samuel Essig (http://c1b1.de)
// @license       CC Attribution-Noncommercial-Share Alike 3.0 Germany; http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode
// @include       http://*.die-staemme.de/*
// @exclude       http://forum.die-staemme.de/*
// @icon          http://www.die-staemme.de/favicon.ico
// @uso:script    52212
// ==/UserScript==

const version = '1.8';

/*
ds.countPosts.user.js


DS #Posts

(c) 2009-2013 by C1B1SE
         info@c1b1.de
         http://c1b1.de


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



####################### About it ######################

Uploaded @ http://userscripts.org/scripts/show/52212

Zählt die Posts eines Members im Forum.
Jeder Post wird mit md5 gehasht und in den Firefox Einstellungen abgelegt.


*/

function DS_Posts() {

var api = typeof unsafeWindow != 'undefined' ? unsafeWindow.ScriptAPI : window.ScriptAPI;
api?api.register('DS #Posts', [8.16, 8.17], 'Samuel Essig', 'scripts@online.de'):0;


if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {
var gm_value_prefix = 'ds_posts';

  GM_addStyle = function(css) {
    var style = document.createElement('style');
    style.textContent = css;
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  GM_deleteValue = function(name) {
    localStorage.removeItem(gm_value_prefix+name);
  }

  GM_getValue = function(name, defaultValue) {
    var value = localStorage.getItem(gm_value_prefix+name);
    if (!value)
      return defaultValue;
    var type = value[0];
    value = value.substring(1);
    switch (type) {
      case 'b':
        return value == 'true';
      case 'n':
        return Number(value);
      default:
        return value;
    }
  }
  
    GM_listValues = function()
    {
    var keys = [];
    for(var key in localStorage) {
      if(key.substring(0,gm_value_prefix.length) == gm_value_prefix) {
        keys.push(key.substring(gm_value_prefix.length));
      }
    }
        return keys;
    }

  GM_log = function(message) {
    console.log(message);
  }

   GM_registerMenuCommand = function(name, funk) {
  //todo
  }

  GM_setValue = function(name, value) {
    value = (typeof value)[0] + value;
    localStorage.setItem(gm_value_prefix+name, value);
  }
  
  if(typeof(unsafeWindow)=='undefined') { unsafeWindow=window; }

}





const debug = false;

const text = {
  'de' : {
    '_name' : 'DS #Posts ',
    '_author' : 'C1B1SE',
    '_contact' : 'mail:info@c1b1.de',
    '_support' : 'http://forum.die-staemme.de/showthread.php?135175',
    'showData_button' : 'Daten anzeigen',
    'clearData_button' : 'Daten löschen',
    'compressData_button': 'Daten komprimieren',
    'finished_alert' : 'Fertig',
    'stillalpha_alert' : 'Noch nicht implementiert!',
    'confirm_alert' : 'Wirklich?',
    'playername' : 'Name' ,
    'playerposts' : 'Posts' ,
    'since' : 'Seit',
    'countedPosts_heading' : 'Gezählte Posts'
    }
  };

const world = document.location.href.split('.').shift().split('de').pop();
const lang = document.location.href.split('.')[0].split(/\/\/(\D+)\d+/)[1];

GM_log = debug?GM_log:function(){};
Array.prototype.indexOf = function(el)
  {
  for(var i = 0; i < this.length; i++)
    if(el == this[i])
      return i;
  return -1;
  };


// Duke assistant?
var duke = $('#dukeassistantBar_anchor')||$('#dukeassistantBar')?true:false;
if(  GM_url('http://*.die-staemme.de/game.php(screen=forum&screenmode=view_thread)')
  || GM_url('http://*.die-staemme.de/forum.php*screen=view_thread*')
)
  {

  // Bar
  var a1 = n('a',{'href':'#'},['click',showData,false],false,text[lang].showData_button);
  var a2 = n('a',{'href':'#'},['click',clearData,false],false,text[lang].clearData_button);
  var a3 = n('a',{'href':'#'},['click',compressData_fct,false],false,text[lang].compressData_button);
  bar(a1,a2,a3);

  // Get compressed data
  var gm = GM_getValue(lang+world+'#compressed');
  var oldData = gm?JSON.parse(gm):{ids:[],players:{},from:-1,to:-1};
  var to = oldData.to;


  // Walk through posts
  var posts = $('.post');
  for(var i = 1; i < posts.length; i++)
    {
  var player_name = $('.postheader_left',posts[i])[0];
  if(player_name.innerHTML.indexOf('(gelöscht)') != -1) // Jump deleted player
    continue;
  if(duke) {
    player_name = trim($('.normal_link',player_name)[0].firstChild.data);
    }
  else {
    player_name = trim($('a',player_name)[0].firstChild.data);  
    }
    var post_id = posts[i].innerHTML.match(/quote_id=(\d+)&/); // this is a unique post id
  if(!post_id) {
    var post_id = posts[i].innerHTML.match(/<a name="(\d+)"><\/a>/);
  } else {
    post_id = post_id[1];
  }
  
    var time_string = grabText($('.postheader_left',posts[i])[0],1);

    var post_time = parseFromDSTime(time_string).getTime();
  
    if(oldData.ids.indexOf(post_id) != -1)
      {
      GM_log(post_id+' in archive');
      }
    else
      {
      var value_name = lang+world + '_' + post_time + '_' + player_name + '_' + post_id;

      if(GM_getValue(value_name) !== true)
        {
        GM_setValue(value_name,true);
        GM_log(post_id+' saved to db')
        }
      else
        {
        GM_log(post_id+' alread in db')
        }
      }
    }
  }
  
else if(GM_url('http://*.die-staemme.de/game.php(mode=members&screen=ally)'))   // Memberlist
  {
  complementMemberlist();
  }



function complementMemberlist()
  {
  compressData();

  // Get the data
  var gm = GM_getValue(lang+world+'#compressed');
  var data = gm?JSON.parse(gm):{ids:[],players:{},from:-1,to:-1};


  var table = $('#ally_content').$('table')[0];
  var members = $('tr',table);

  for(var i = 1; i < members.length; i++)
    {
    if(!$('a',members[i]))
      continue;
  if(duke) {
      var name = trim($('.normal_link',members[i])[0].firstChild.nodeValue);
  }
  else {
      var name = trim($('a',members[i])[0].firstChild.nodeValue);  
  }

    var td = n('td',{'style':{textAlign:'right'}},false,data.players[name]?data.players[name]:'0');
    members[i].appendChild(td);
    }

    var th = n('th',{'class':'int','style':'cursor:pointer; ','title':'Sortieren nach Posts'},['click',startSortingMemberlist,false],false,text[lang].playerposts)
    members[0].appendChild(th);
  }

function showData()
  {
  compressData();

  // Get the data
  var gm = GM_getValue(lang+world+'#compressed');
  var oldData = gm?JSON.parse(gm):{ids:[],players:{},from:-1,to:-1};

  var oldestPost = new Date();
  oldestPost.setTime(oldData.from);

  // Write
  var main = $('.main',$('#forum_box')?$('#forum_box'):document)[0];

  main.innerHTML = '';
  var h2 = n('h2',{'id':'h2_counted_posts'},false,false,text[lang].countedPosts_heading+' ('+text[lang].since+' '+parseToDSTime(oldestPost)+')');
  var tr = n('tr',false,false,false,n('th',{'class':'string','style':'cursor:pointer; ','title':'Sortieren nach Name'},['click',startSorting,false],false,text[lang].playername),n('th',{'class':'int','style':'cursor:pointer; ','title':'Sortieren nach Posts'},['click',startSorting,false],false,text[lang].playerposts));
  var table = n('table',{'border':'0','class':'vis','style':{'border':'#804000 2px solid'}},false,false,tr);

  for (p in oldData.players)
    table.appendChild( n('tr',false,false,false,n('td',false,false,false,p),n('td',false,false,false,oldData.players[p])) );
  main.appendChild(h2);
  main.appendChild(table);
  if($('.forum selected')[0])
    $('.forum selected')[0].setAttribute('class','forum');
  else if($('.shared_forum shared_selected')[0])
    $('.shared_forum shared_selected')[0].setAttribute('class','shared_forum');
  }

function startSorting(e)
  {
  if($('#sorting_table_loader'))
    d('sorting_table_loader');

  var div = n('div');
  div.setAttribute('style','background:url(http://www.c1b1.de/smile/loader.gif) no-repeat; height:16px; padding-left:20px; color:Black; ');
  div.setAttribute('id','sorting_table_loader');
  div.appendChild(t('Sortiere Tabelle . . . '));
  $('#h2_counted_posts').parentNode.insertBefore(div,$('#h2_counted_posts').nextSibling);

  var y = this;

  var x = function() {
    sortTable.apply(y,[e]);
    };

  setTimeout(x,300); // Loading Gif can show up
  }

function startSortingMemberlist(e)
  {
  if($('#sorting_table_loader'))
    d('sorting_table_loader');

  var div = n('div');
  div.setAttribute('style','background:url(http://www.c1b1.de/smile/loader.gif) no-repeat; height:16px; padding-left:20px; color:Black; ');
  div.setAttribute('id','sorting_table_loader');
  div.appendChild(t('Sortiere Tabelle . . . '));
  $('#ally_content').parentNode.insertBefore(div,$('#ally_content').nextSibling);

  var y = this;

  var x = function() {
    sortTable.apply(y,[e]);
    };

  setTimeout(x,300); // Loading Gif can show up
  }

function sortTable(ev)
  {
  var index = 0;
  var e = this.previousSibling;
  while(e) { index++; e = e.previousElementSibling; }
  if(document.location.href.indexOf('mode=members') != -1)
    index--;
  var table = this.parentNode.parentNode.parentNode;
  var elist = $('tr',table);
  var last = tmp = 0;
  var i = 1;
  if(this.className.indexOf('int') != -1)
    {
    while(i < elist.length)
      {
      tmp = parseInt($('td',elist[i])[index].firstChild.nodeValue);
      if( tmp > last )
        {
        elist[i].parentNode.insertBefore(elist[i],elist[i-1<1?1:i-1]);
        i = 1;
        }
      last = tmp;
      i++;
      }
    }
  else if(this.className.indexOf('string') != -1)
    {
    while(i < elist.length)
      {
      tmp = $('td',elist[i])[index].firstChild.nodeValue.toLowerCase().charCodeAt(0);
      if( tmp < last )
        {
        elist[i].parentNode.insertBefore(elist[i],elist[i-1<1?1:i-1]);
        i = 1;
        }
      last = tmp;
      i++;
      }
    }


  if($('#sorting_table_loader'))
    d('sorting_table_loader');
  }


function clearData()
  {
  if(!confirm(text[lang].confirm_alert))
    return;
  var arr = GM_listValues();
  var w_len = (lang+world).length;
  // Delete Data
  for(var i = 0; i < arr.length; i++)
    {
    //if(arr[i].substr(0,w_len) == (lang+world) && arr[i].indexOf('#compressed') == -1)
    if(arr[i].substr(0,w_len) == (lang+world))
      {
      GM_deleteValue(arr[i]);
      }
    }

  alert(text[lang].finished_alert);
  window.location.reload();
  }

function compressData_fct(ev)
  {
  compressData();
  alert(text[lang].finished_alert);
  window.location.reload();
  }

function compressData()
  {
  // Get the old data
  var gm = GM_getValue(lang+world+'#compressed');
  var oldData = gm?JSON.parse(gm):{ids:[],players:{},from:-1,to:-1};

  var arr = GM_listValues();

  var w_len = (lang+world).length;
  var oldest = -1;
  var recent = -1;
  // Count Posts
  for(var i = 0; i < arr.length; i++)
    {
    if(arr[i].substr(0,w_len) == (lang+world))
      {
      if(GM_getValue(arr[i]) === true)
        {
        var a = arr[i].split('_');

        if(!a[1])
          continue;

        // Extract id
        var id = parseInt(a.pop());

        // Extract timestamp
        var p_timestamp = parseInt(a[1]);

        // Extract name
        delete(a[0]);
        delete(a[1]);
        var p_name = ext_join(a,'_');

        // Add 1
        oldData.players[p_name]?oldData.players[p_name]++:oldData.players[p_name]=1;

        // oldest & recent timestamps
        oldest = oldest==-1?p_timestamp:(p_timestamp<oldest?p_timestamp:oldest);
        recent = recent==-1?p_timestamp:(p_timestamp>recent?p_timestamp:recent);

        // Block ID
        oldData.ids.push(id);

        GM_deleteValue(arr[i]);
        }
      }
    }

  oldData.to = recent;
  oldData.from = oldData.from==-1?oldest:oldData.from;

  GM_setValue(lang+world+'#compressed',JSON.stringify(oldData));
  }



// Common functions
function ext_join(arr,d)
  {
  var x = 0;
  while(arr[x] == undefined)
    x++;
  var re = arr[x++];
  for(; x < arr.length; x++)
    if(arr[x] != undefined)
      re += d+arr[x];
  return re;
  }
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
      else if(typeof(attrs[attr]) != typeof(new Function()))
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
function test(fct,elsewise) { try {fct();} catch(error) {}; return typeof(elsewise) == 'undefined' ? void(0) : elsewise ; }
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
      return (obj.getDate()>9?obj.getDate():'0'+obj.getDate()) + '.' + ((obj.getMonth()+1)>9?(obj.getMonth()+1):'0'+(obj.getMonth()+1)) + '.'+ (String(obj.getFullYear()).substr(2)) + ' ' + (obj.getHours()>9?obj.getHours():'0'+obj.getHours()) + ':' + (obj.getMinutes()>9?obj.getMinutes():'0'+obj.getMinutes()) + ':' + (obj.getSeconds()>9?obj.getSeconds():'0'+obj.getSeconds());
    }
  else
    {
    if(now.getMonth() == obj.getMonth()  && now.getDate() == obj.getDate())
      return 'heute um '+((obj.getHours()>9?obj.getHours():'0'+obj.getHours()) + ':' + (obj.getMinutes()>9?obj.getMinutes():'0'+obj.getMinutes()) + ':' + (obj.getSeconds()>9?obj.getSeconds():'0'+obj.getSeconds())) + ' Uhr';
    else if(now.getMonth() == obj.getMonth()  && (now.getDate()+1) == obj.getDate())
      return 'morgen um '+((obj.getHours()>9?obj.getHours():'0'+obj.getHours()) + ':' + (obj.getMinutes()>9?obj.getMinutes():'0'+obj.getMinutes()) + ':' + (obj.getSeconds()>9?obj.getSeconds():'0'+obj.getSeconds())) + ' Uhr';
    else
      return (obj.getDate()>9?obj.getDate():'0'+obj.getDate()) + '.' + ((obj.getMonth()+1)>9?(obj.getMonth()+1):'0'+(obj.getMonth()+1)) + '.'+ (String(obj.getFullYear()).substr(2)) + ' ' + (obj.getHours()>9?obj.getHours():'0'+obj.getHours()) + ':' + (obj.getMinutes()>9?obj.getMinutes():'0'+obj.getMinutes()) + ':' + (obj.getSeconds()>9?obj.getSeconds():'0'+obj.getSeconds() + ':' + (obj.getSeconds()>9?obj.getSeconds():'0'+obj.getSeconds()));
    }
  }
function parseFromDSTime(string)
  {
  // Create Date Object
  var now = new Date();

  // Extract Time
  var time = string.match(/(\d+):(\d+) Uhr/);

  // Hours
  if(time[1][0] == '0')
    var hours = parseInt(time[1][1]);
  else
    var hours = parseInt(time[1]);

  // Minutes
  if(time[2][0] == '0')
    var minutes = parseInt(time[2][1]);
  else
    var minutes = parseInt(time[2]);

  // Today
  if(string.indexOf('heute') != -1)
    {
    var days = now.getDate();
    var months = now.getMonth();
    }

  // Tomorrow
  else if(string.indexOf('morgen') != -1)
    {
    var days = now.getDate()+1;
    var months = now.getMonth();
    }
  // Other day
  else
    {
    // Extract Date e.g. "09.06."
    var date = string.match(/(\d+)\.(\d+)\./);

    // Day
    if(date[1][0] == '0')
      var days = parseInt(date[1][1]);
    else
      var days = parseInt(date[1]);

    // Month
    if(date[2][0] == '0')
      var months = parseInt(date[2][1]) -1;
    else
      var months = parseInt(date[2]) -1;
    }

  // Return Date Object
  return new Date(now.getFullYear(), months, days, hours, minutes, 0);
  }
function bar()
    {

    if($('#dscountposts_bar'))
      return false;

    var div = n('div');
    div.setAttribute('id','dscountposts_bar');
    div.style.background = 'url("http://cdn2.tribalwars.net/graphic/index/main_bg.jpg?1b7f4") repeat scroll left top transparent';
    div.style.border = '1px solid #8C5F0D';
    div.style.margin = 'auto';
    div.style.marginTop = '15px';
    div.style.padding = '0px';
    div.style.width = '98%';

    var leftfont = n('span');
    leftfont.setAttribute('style','float:left; margin-left:10px; ');

    for(var i = 0, len = arguments.length; len > i; i++)
      {
      leftfont.appendChild(arguments[i]);
      if(len - 1 != i)
        {
        var delimiter = n('span');
        delimiter.setAttribute('style','margin-left:5px; margin-right:5px; width:1px; border:1px #804000 solid; ')
        leftfont.appendChild(delimiter);
        }
      }

    div.appendChild(leftfont);

    var rightfont = n('span');
    rightfont.setAttribute('style','float:right; font-size:smaller; opacity:0.7; margin-right:15px; ');
    rightfont.appendChild(t( text[lang]._name +  '(' + version+')'));
    div.appendChild(rightfont);

    var clearfont = n('div');
    clearfont.setAttribute('style','clear:both; ');
    div.appendChild(clearfont);

    if($('#ally_content')) {
      return $('#ally_content').appendChild(div);
    }

    return $('#ds_body').appendChild(div);
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

function GM_url(pattern)
  {
  // Logical Comparison
  var url = document.location.href;
  if(pattern == url)
    return true;

  // No brackets, only replace stars
  if(pattern.indexOf('(') == -1)
    {
    var reo = new RegExp(pattern.replace(/\*/gim,'(.*)'),'gim');
    return reo.test(url);
    }

  // Test with placeholder, no brackets
  var withoutbrackets = pattern;
  withoutbrackets = withoutbrackets.replace(/\((.+)\)/gim,'(.+)');  // Replace Brackets
  withoutbrackets = withoutbrackets.replace(/\*/gim,'(.*)')         // Replace Stars
  var occs = withoutbrackets.match(/(\(.+\))?(\(.*\))/);
  var reo = new RegExp(withoutbrackets);
  if(!reo.test(url))
    {
    return false;
    }

  // Extract the bracket content:
  var matches = pattern.match(/\((.+)\)/)[1];

  // Extract the match that should contain the bracket's content
  var i = 0, str = withoutbrackets.split('(.+)').shift();
  while(str.indexOf('(.*)') != -1)
    {
    str = str.substring(str.indexOf('(.*)')+4);
    i++;
    }
  var match = url.match(reo)[i+1];

  // Compare match to pattern
  var parts = matches.split('&');
  for(var i = 0; i < parts.length; i++)
    {
    if(match.indexOf(parts[i]) == -1)
      return false;
    }
  return true;
  }
function $(x,parent) {
  var y = parent?parent:( this.document?this.document:this );
  var add = function(l) { for(var i = 0; i < l.length; i++){ l[i].$ = $;} return l;};
  if(x[0] == '#') {
    var r = y.getElementById(x.substring(1));
    if(r)
      r.$ = $;
    return r;
    }
  else if(x[0] == '.') {
    var r = y.getElementsByClassName(x.substring(1))
    return add(r);
    }
  else if(x[0] == '-') {
    var r = y.getElementsByName(x.substring(1))
    return add(r);
    }
  else {
    var r = y.getElementsByTagName(x)
    return add(r);
    }
  }



}

DS_Posts();