// ==UserScript==
// @name          Partyfans zentrieren/nDesign
// @version       1.2.1
// @author        Samuel Essig (http://c1b1.de)
// @description   Zentriert die gesamte Partyfans Seite, Greasemonkey und Opera; Suchfunktion für Freundesliste; Dunkles Design (pre-Alpha-Version), Facebook Chatfunktion (pre-Alpha-Version)
// @namespace     c1b1.de
// @homepage      http://c1b1.de
// @copyright     2009, Samuel Essig (http://c1b1.de)
// @license       CC Attribution-Noncommercial-Share Alike 3.0 Germany; http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode
// @include       http://www.partyfans.com/*
// ==/UserScript==

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


var sw = window.opera?window:unsafeWindow;

function $(x) {
  var y = this.alert?this.document:this;
  var add = function(l) { for(var i = 0; i < l.length; i++){ l[i].$ = $; } return l;};
  var re = false;  
  if(typeof(x) != 'string') {
    if(x instanceof HTMLCollection || x.toString() == '[object XPCNativeWrapper [object HTMLCollection]]') {
      re = add(x);
      } 
    else if(x.nodeName) {
      x.$ = $;
      re = x;
      } 
	}
  else {
    var index = false; 
    if(x.indexOf('[') != -1) {
      index = parseInt(x.match(/\[(\d+)\]/)[1]);
	  x = x.replace(/\[\d+\]/,'');
      } 
	 
    if(x[0] == '#') {
      re = y.getElementById(x.substring(1));
      if(re)
        re.$ = $;
	  }
    else if(x[0] == '.') {
      re = add(y.getElementsByClassName(x.substring(1)));
      }
    else if(x[0] == '-') {
      re = add(y.getElementsByName(x.substring(1)));
      }
    else {
      re = add(y.getElementsByTagName(x));
      }
	 
	if(index !== false) {
      re = $(re[index]);
      }	  	  
    }
  return re;	
  }
function $$(x) {
  var y = this.alert?this.document:this;
  var parts = x.split(' ');
  var current = $(y);
  for(var i = 0,index; i < parts.length; i++) { 
    current = current.$(parts[i]);
    }
  return current;
  } 

  
  
  
function tag(name, parent)
  {
  if(!parent)
    return document.getElementsByTagName(name);
  return parent.getElementsByTagName(name);
  };
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
  };
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
  };
function removeChilds(obj)
  {
  while(obj.firstChild)
    obj.removeChild(obj.firstChild);
  }


var bgArray = new Array();

var dest = 0;
var dest_match = document.location.href.match(/dest=(\d+)/);
if(dest_match)
 dest = dest_match[1]?parseInt(dest_match[1]):0;





// Center page:
if($('#topFrame'))
  {
  var width = $('#topFrame').clientWidth;
  var main = n('div',{'style' : 'margin-left:auto; margin-right:auto; width:'+width+'px' })
  var center_page = n('div',{'id':'partfans_center_page_script_center_page','style' : 'position:relative; left:0px; top:0px;' });

  var elist = getChilds(tag('body')[0]);
  for(var i = 0, len = elist.length; len > i; i++)
    {
    center_page.appendChild(elist[i]);
    };

  main.appendChild(center_page);
  tag('body')[0].appendChild(main);

  function x() {
  if($('#stickyadbanner'))
    {
    $('#stickyadbanner').style.position = 'absolute';
    }; };

  var id = window.setInterval(x,700);


  // Blitzgrüße
  if(window.opera)
    {
    function handler() {
      if(this.readyState == 4 && this.status == 200) {
        if(this.responseText) {
          eval(this.responseText);
          showBGTimeline();
          }
        }
      };
    var request = XMLHttpRequest();
    request.onreadystatechange = handler;
    request.open("GET", "http://www.partyfans.com/community/getBGs.php");
    request.send();
    }
  else
    {
    GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://www.partyfans.com/community/getBGs.php',
      onload: function(response) {
        eval(response.responseText);
        showBGTimeline();
        }
      });
    }
	
	
	
	// Add Style
	addPersonalStyle();
  };


var friendslist = [];
var originalTable = false;
if(dest == 314 && $('#nametab')) // Freunde
  {
  // Add search field
  var input = document.createElement('input');
  input.type = 'text';
  input.value = 'Suchbegriff';
  input.id = 'search_friends';
  input.addEventListener('keyup',reorderFriends,false);
  input.addEventListener('click',function() { if(this.value == 'Suchbegriff') { this.value = ''; this.style.color = 'White'; }},false);
  input.setAttribute('style','margin-left:15px; background:Silver; border:none; color: #dddddd; font-weight: bold; font-family:Arial; ');
  document.getElementsByClassName('tabRight')[0].getElementsByTagName('td')[0].appendChild(input);


  if($('#bildertab').style.display != 'none')  // Details tab ist active
    {
    var span = document.createElement('span');
    span.setAttribute('style','margin-left:15px; color:Crimson; font-weight: bold; font-family:Arial; ');
    span.appendChild(document.createTextNode('Funktioniert nur auf der "Nur Namen" Seite!'));
    document.getElementsByClassName('tabRight')[0].getElementsByTagName('td')[0].appendChild(span);

    $('#oBild_link').addEventListener('click',function() { window.setTimeout(function() { document.location.href = 'http://www.partyfans.com/index.php?dest=314'; },1500); },false);

    input.disabled = true;

    }
  else     // "Nur Namen" tab is aktice
    {
    initOrderFriends();
    }
  }


function initOrderFriends()
  {
  // Collect Friends
  var table = $('#nametab');
  originalTable = table.cloneNode(true);
  var tr = table.getElementsByTagName('tr');
  for(var i = 0; i < tr.length; i++)
    {
    var td = tr[i].getElementsByTagName('td');
    if(!td)
      continue;
    for(var x = 0; x < td.length; x++)
      {
      if(td[x].width == '1%')
        continue; // Skip icons
      var name = td[x].getElementsByTagName('a')[0].firstChild.nodeValue;
      friendslist.push({name:name.toLowerCase(),element: td[x].cloneNode(true)});
      }
    }
  }


function reorderFriends(ev)
  {
  if($('#bildertab').style.display != 'none')
    {
    return;
    }

  this.value = this.value.replace('Suchbegriff','');

  if(! friendslist || ! originalTable)
    return;
  var term = this.value.toLowerCase();
  var table = $('#nametab');

  if(term == '')
    {
    table.parentNode.replaceChild(originalTable,table);
    originalTable = originalTable.cloneNode(true);
    this.value = 'Suchbegriff';
    this.style.color = '#dddddd';
    return;
    }


  // Empty Table
  removeChilds(table);


  // Create New Table

  var tr = document.createElement('tr');
  var item = 0;
  for(var i in friendslist)
    {
    if(!!~ friendslist[i].name.indexOf(term))
      {
      if(item == 4)
        {
        table.appendChild(tr);
        var tr = document.createElement('tr');
        item = 0;
        }
      tr.appendChild(friendslist[i].element);
      item++
      }
    }
  table.appendChild(tr);
  }


function getPic(ar)
  {
  var img = n('img',{'alt':'Foto von '+ar[1],'style':'max-width:70px; max-height:70px; border:2px Solid Black;'});
  if (ar[4] == "1")
    {
    img.src = "http://static.partyfans.com/com/up/tn3/"+ar[2]+".jpg";
    }
  else if (ar[4]=="2")
    {
    img.src = "http://static.partyfans.com/pics/layout/sections/kein_foto/m3.gif";
    }
  else if (ar[4]=="3")
    {
    img.src = "http://static.partyfans.com/pics/layout/sections/kein_foto/w3.gif";
    }
  else
    {
    img.src = "http://static.partyfans.com/pics/layout/sections/tn3_keinfoto.gif";
    }
  return img;
  }

var int_id;
function showBGTimeline()
  {
  var holder = n('div',{'id':'partfans_center_page_script_BG_holder','style':'overflow:hidden; height:700px; background:#222222; position:absolute; left:-400px; width:350px; top:10px; border:2px solid Black; color:Silver; '});
  $('#partfans_center_page_script_center_page').appendChild(holder);

  for(var i = 0; i < bgArray.length; i++)
    {
    if(!bgArray[i])
      continue;

    var img = getPic(bgArray[i]);
    var a = n('a',{'rel':bgArray[i][2],'href':'http://www.partyfans.com/community/details.php?detid='+bgArray[i][2],'style':'text-align:center; float:left; width:70px;'},['click',function(e) { e.preventDefault(); sw.openWind(this.rel); },false],false,img);

    var p = n('p',{'style':'float:left; margin-left:10px; margin-top:0px; max-width:250px; font-family:Arial; '});
    p.appendChild(n('b',false,false,false,bgArray[i][1]+' ('+bgArray[i][3]+')'));
    p.appendChild(n('br'));
    p.appendChild(document.createTextNode(bgArray[i][0]));

    var update = n('div',{'style':'margin-bottom:5px; '},false,false,a,p,n('br',{'style':'clear:left; '}));

    holder.appendChild(update);
    }

  int_id = setInterval(scrollBGTimeline,10);
  holder.addEventListener('click',function()
    {
    if(this.style.overflow == 'hidden')
      {
      var scrollTop = this.scrollTop;
      clearInterval(int_id);
      this.style.overflow = 'auto';
      this.scrollTop = scrollTop;
      }
    else
      {
      var scrollTop = this.scrollTop;
      clearInterval(int_id);
      this.style.overflow = 'hidden';
      int_id = setInterval(scrollBGTimeline,10);
      this.scrollTop = scrollTop;
      }


    } ,false);

  }

var direction = 1;
function scrollBGTimeline(x)
  {
  var element = $('#partfans_center_page_script_BG_holder');;
  element.scrollTop += 1*direction;
  if(element.scrollTop >= element.scrollHeight-element.clientHeight-2 || element.scrollTop <= 0)
    direction *= -1;
  }


  var color,radius;
function addPersonalStyle() {

  color = {
    body : 'Black',
    links : '#F5993D',
	navi_bg : '#222222',
	navi_secede : 'Black',
	friends_bg : '#222222',
    friends_border : '#3d2509',
	inputs : '#F5993D',
	inputs_border : 'midnightblue',
	bar_bg : '#222222',
	bar_font : '#F5993D',
	bar_font_inv : 'Black',
	chat_font : 'White',
	chat_bg0 : '#222',
	chat_bg1 : '#444'
    };
  radius = {
    friends : 10,
    mainmenu : 7,
	body : 15,
	headers : 5,
	input : 5,
	mainmenubox : 15


   };   

 
  GM_addStyle('#mainbody {background: '+color.body+' url(http://bthost.de/bthost/files/05.10.2010/body_bg.jpg) no-repeat;} \
  div.bottomDiv {background:Black; -moz-border-radius:'+radius.body+'px;}\
  div.bottomDiv table.textgr td {color:Black;} \
  #mainDiv { background: Black; color:white; -moz-border-radius:'+radius.body+'px; }\
  .titel,.textgr,#friendsTable { color:White; }\
  a:active { color:'+color.links+'; } a:link { color:'+color.links+'; } a { color:'+color.links+'; text-decoration:none;}\
  .commMenue.text ul {border-color:'+color.navi_secede+';}\
  input.form,select.form { background:'+color.inputs+'; border:2px '+color.inputs_border+' solid; padding:2px; -moz-border-radius:'+radius.input+'px; }\
  #partfans_center_page_script_BG_holder {-moz-border-radius:'+radius.body+'px;}\
  .infoTabC {-moz-border-radius-topright:'+radius.headers+'px;-moz-border-radius-topleft:'+radius.headers+'px; }\
  .hauptMenButtons { -moz-border-radius:'+radius.mainmenu+'px; }\
  a.hauptMen {color:Black; -moz-border-radius:'+radius.mainmenu+'px; }\
  div.hauptmenue.textgr {-moz-border-radius-bottomright:'+radius.mainmenubox+'px;-moz-border-radius-bottomleft:'+radius.mainmenubox+'px;-moz-border-radius-topright:'+(radius.mainmenubox+10)+'px;}\
  a.abw:link {color:silver;}\
  #friendlist { bottom:25px; position:fixed; right:0px; font-family:sans-serif; border:1px solid '+color.bar_font+'; } \
  #friendlist .friend { font-size:smaller; padding: 0px 5px; display:block; cursor:pointer; text-align:left; width:201px; height:25px; font-weight:bold; background:'+color.bar_bg+'; } \
  #friendlist .friend:hover {background:'+color.bar_font+'; color: '+color.bar_font_inv+'}\
  #chatbox { bottom:25px; position:fixed; left:0px; font-family:sans-serif; background:'+color.chat_bg0+'; width:235px; max-height:'+(document.body.clientHeight/2)+'px; overflow:auto; border:1px solid '+color.chat_font+'; } \
  #chatbox .message { margin:0px; font-size:smaller; padding: 0px 5px; display:block; text-align:left; width:201px; font-weight:bold; background:'+color.chat_bg0+'; color:White; }');
  document.getElementsByClassName('text infoTabC')[0].parentNode.style.background = color.navi_bg;
  if($('#friendsTable')) {
    $('#friendsTable').previousSibling.previousSibling.setAttribute('style','border:outset 3px '+color.friends_border+'; border-bottom:0; background:'+color.friends_bg+'; -moz-border-radius-topleft:'+radius.friends+'px; -moz-border-radius-topright:'+radius.friends+'px;');   
    $('#friendsTable').setAttribute('style','-moz-border-radius-bottomright:'+radius.headers+'px;-moz-border-radius-bottomleft:'+radius.headers+'px; border:outset 3px '+color.friends_border+'; border-top:0; background:'+color.friends_bg+'; -moz-border-radius-bottomleft:'+radius.friends+'px; -moz-border-radius-bottomright:'+radius.friends+'px;');  
  }
  if($('#users'))
    $('#users').parentNode.style.background = color.navi_bg;
  $('#topFrame').style.background = 'url(http://bthost.de/bthost/files/05.10.2010/logo.png)'; 
  $('#topFrame').style.background = '';   

  $('#topFrame').style.marginBottom = '35px';   
  
  
  $('#statChanger').setAttribute('style','background:'+color.inputs+'; border:2px '+color.inputs_border+' solid; padding:2px; -moz-border-radius:'+radius.input+'px;');  
  
  
  // Menu
  $('#topFrame').getElementsByTagName('div')[1].innerHTML = ''; 
  
  var menu = document.getElementsByClassName('hauptMenButtons');
  appendChilds(document.getElementById('topFrame').getElementsByTagName('div')[1],menu);
  
  var submenu = document.getElementsByClassName('hauptmenue textgr');
  appendChilds(document.getElementById('topFrame').getElementsByTagName('div')[1],submenu); 
  
  setStyle(menu,{position:'relative',display:'block',left:'0px',top:'0px'}); 
  setStyle(submenu,{left:'127px'});  
  
  
  // Away message
  GM_addStyle('#awayMessage {background: Black ! important;} #awayMessage div {background: #F5993D ! important;} ');
  
  
  // Ad
  $('#mainDiv').appendChild(document.getElementById('leaderboard'));
  $('#mainDiv').style.paddingTop = '0px';
  $('#mainDiv').style.marginTop = '-30px';  

  $('#leaderboard').style.position = 'relative';
  
  
  if($('#friendsTable')) {
  // Bar
  var div = document.createElement('div');
  div.setAttribute('id','fb_bar');
  div.setAttribute('style','height:25px; bottom:0px; left:0px; position:fixed; right:0px; font-family:sans-serif; color:'+color.bar_font+'; ');
  document.body.appendChild(div);
  
  // Online Friends
  var friendsbutton = document.createElement('div');
  friendsbutton.setAttribute('style','cursor:pointer; text-align:center; width:201px; height:100%; float:right; position:relative; font-weight:bold; background:'+color.bar_bg+'; border:1px solid White;'); 
  friendsbutton.appendChild(document.createTextNode('Freunde'));
  friendsbutton.addEventListener('click',toggleFriendlist,false);
  div.appendChild(friendsbutton);
  
  var friendslist = document.createElement('div');
  friendslist.setAttribute('id','friendlist');   
  document.body.appendChild(friendslist);
  
  var a = $('#friendsTable').$('a');
  for(var i = 0; i <  a.length; i++) {
    if(a[i].getAttribute('class') == '' || a[i].getAttribute('class') == 'abw') {
	   friendslist.appendChild(createFriendEntry(a[i]));
	  } 
    } 
	
  // Chat: Received Items
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200)
      loadSentItems(this.responseText);
    };
  req.open('get','/community/messenger/messages.php'); 
  req.send(null);
  
  }
  
  // Blitzgrüße etc.
  $('#blitzGr').parentNode.removeChild($('#blitzGr'));
  $('.menue')[0].parentNode.style.top = '2px';
  $('.hauptMenButtons')[3].parentNode.removeChild($('.hauptMenButtons')[3]);
  	
  }
  
 function createFriendEntry(friend_a) {
   var friend_a = friend_a.cloneNode(true);
   friend_a.setAttribute('class','friend'+ (friend_a.className!=''?' '+friend_a.className:'')); 
   
   return friend_a;
  } 
  
function toggleFriendlist(ev) {
  if($('#friendlist').style.display == 'none')
    $('#friendlist').style.display = ''
  else
    $('#friendlist').style.display = 'none'
}  
  
function toggleFriendChat(ev) {
  var ownname = $$('#commBar li[1] b[0]').firstChild.data;
  var messid = parseInt(this.getAttribute('data-messid'));
  var direction = parseInt(this.getAttribute('data-direction'))?true:false; 
  var username = this.getAttribute('data-username'); 
  var userid = this.getAttribute('data-userid'); 
  
  var chatbox = $('#chatbox');
  if(parseInt(chatbox.getAttribute('rel')) == messid && chatbox.style.display == 'none') {
    chatbox.style.display = '';
	return;  
  }
  else if(parseInt(chatbox.getAttribute('rel')) == messid) {
    chatbox.style.display = 'none';
	return;  
  }
  
  chatbox.style.display = '';
  chatbox.setAttribute('rel',messid);
  chatbox.style.left = this.offsetLeft+'px';
  chatbox.innerHTML = '';

  // Get Chat Log
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200)
      showFriendChat(this.responseText,messid,direction,ownname,username,userid);
    };
  req.open('get','/community/messenger/messages.php?open=1&from=us&messID='+messid); 
  req.send(null);

}  

function showFriendChat(responseText,messid,direction,ownname,username,userid) {
  var div = $('#chatbox');
  responseText = responseText.split('<table width="100%" cellpadding="10" style="border:1px solid #F5993D;" bgcolor="#f5f5f5" class="textgr">',2)[1].split('</table>',2)[0];
  
  var tmp = document.createElement('div');
  tmp.setAttribute('id','tmp_div');
  tmp.setAttribute('style','display:none;');
  tmp.innerHTML = '<table>'+responseText+'</table>';
  div.appendChild(tmp);

  // Extract Messages
  var p = tmp.getElementsByTagName('p');
  for(var i = 0; p[0]; i++) {  
	p[0].setAttribute('style','margin:0px;');
	p[0].setAttribute('class','message'); 
	if((direction && i%2==0)  || (!direction && (i+1)%2==0) ) {
	  p[0].style.background = color.chat_bg1;
	  var label = n('a',{class: 'username', style:'font-family:monospace',href:'#'},false,false,ownname+': ');
	  }
	else {
	  var label = n('a',{class: 'username', style:'font-family:monospace',href:'/community/details.php?detid='+userid},false,false,username+': ');
      label.addEventListener('click',function(e) { e.preventDefault(); window.open(this.href,'','scrollbars=yes,width=640,height=450'); },false);	  
	  }
    p[0].insertBefore(label,p[0].firstChild);  
    var last = {el: p[0], username};	
    div.appendChild(p[0]);
   }
   
   
   alert(last.innerHTML);

   
   
  
}  
  
function loadSentItems(responseText1) {
  // Chat: Sent Items
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200)
      initChatBar(responseText1,this.responseText);
    };
  req.open('get','/community/messenger/messages.php?typ=1'); 
  req.send(null);
} 
  
function initChatBar(responseText1,responseText2) {  

  // responseText1:  Posteingang
  var div = $('#fb_bar');
  responseText1 = responseText1.split('<div id="messageList">',2)[1].split('</div>',2)[0];
  
  var tmp = document.createElement('div');
  tmp.setAttribute('id','tmp_div');
  tmp.setAttribute('style','display:none;');
  tmp.innerHTML = responseText1;
  div.appendChild(tmp);

  
  var table = tmp.getElementsByTagName('table')[0];
  
  // Extract People
  var tr = table.getElementsByTagName('tr');
  var people = {};
  for(var i = 0; i < tr.length; i++) {
    if(!tr[i].getElementsByTagName('a')[0] || !tr[i].getElementsByTagName('a')[0].href.match(/messID=(\d+)/))
	  continue;
    var messid = parseInt(tr[i].getElementsByTagName('a')[0].href.match(/messID=(\d+)/)[1]);
    var username = tr[i].getElementsByTagName('a')[2].firstChild.data; 
    var userid = parseInt(tr[i].getElementsByTagName('a')[2].href.match(/detid=(\d+)/)[1]); 	
	if(people[username]) {
	  people[username].messid = messid>people[username].messid?messid:people[username].messid;
      }
    else {
	  people[username] = {messid : messid, name : username, own : false, userid : userid};  
	  } 
	}
	
  // responseText2:  Postausgang
  responseText2 = responseText2.split('<div id="messageList">',2)[1].split('</div>',2)[0];
  
  tmp.innerHTML = responseText2;
  
  var table = tmp.getElementsByTagName('table')[0];
  
  // Extract People
  var tr = table.getElementsByTagName('tr');
  for(var i = 0; i < tr.length; i++) {
    if(!tr[i].getElementsByTagName('a')[0] || !tr[i].getElementsByTagName('a')[0].href.match(/messID=(\d+)/))
	  continue;
    var messid = parseInt(tr[i].getElementsByTagName('a')[0].href.match(/messID=(\d+)/)[1]);
    var username = tr[i].getElementsByTagName('a')[1].firstChild.data; // [1]  nicht [2] da das Pfeil-Icon fehlt
	if(people[username]) {
	  people[username].messid = messid>people[username].messid?messid:people[username].messid;  
      }
    else {
	  people[username] = {messid : messid, name : username, own : true };  
	  } 
	}
	
	
	
	for(var username in people) {
	  var friendsbutton = document.createElement('div');
      friendsbutton.setAttribute('style','cursor:pointer; text-align:center; width:auto; padding: 0 15px; margin-right:-1px; height:100%; float:right; position:relative; font-weight:bold; background:'+color.bar_bg+'; border:1px solid White;'); 
      friendsbutton.appendChild(document.createTextNode(username));
      friendsbutton.addEventListener('click',toggleFriendChat,false);
      friendsbutton.setAttribute('data-messid',people[username].messid);	  
      friendsbutton.setAttribute('data-direction',people[username].own?'1':'0');
      friendsbutton.setAttribute('data-username',username);	 
      friendsbutton.setAttribute('data-userid',people[username].userid);	 	  
      div.appendChild(friendsbutton);
	}
	
	
	// Create Chat box
	var chatbox = document.createElement('div');
    chatbox .setAttribute('id','chatbox');   
    document.body.appendChild(chatbox );	
}  
  
  
  
  
  
  
function appendChilds(to,arr) {
  for(var i = 0; i< arr.length; i++) {
    to.appendChild(arr[i]);
  }
}
  
function setStyle(arr,styles) {
  for(var i = 0; i< arr.length; i++) {
    for(var attr in styles) {
	  arr[i].style[attr] = styles[attr];
	}	
  }
}  

  
  
  
  
  
  
  