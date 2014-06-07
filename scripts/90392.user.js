// ==UserScript==
// @name           TWO_friendsHelper
// @namespace      domi
// @include        http://tigerwoodsonline.ea.com/mygallery/friends*
// @include        http://tigerwoodsonline.ea.com/groups/profile_members*
// @include        http://tigerwoodsonline.ea.com/mygallery/watchlist*
// ==/UserScript==

{function tag(obj,tagName) { 	return obj.getElementsByTagName(tagName); }
function cl(obj,clName) { 	return obj.getElementsByClassName(clName); }
function gid(idName) { 	return document.getElementById(idName); }
function fireEvent(obj,evt){   var fireOnThis = obj;   if( document.createEvent )   {     var evObj = document.createEvent('MouseEvents');     evObj.initEvent( evt, true, false );     fireOnThis.dispatchEvent(evObj);   } else if( document.createEventObject )   {     fireOnThis.fireEvent('on' + evt);   } }
function wlh(href){ 	warten = setTimeout(function() { 		window.location.href = href; 	}, 1058 + 556 * Math.random()); }
var p = parseInt;
Array.prototype.sortAsc = function(intCol){
  if(intCol >= this.length) return;

  for(var i=0; i<this.length-1; i++){
    for(var j=(i+1); j<this.length; j++){
      // Falls das aktuelle Element grösser ist -> tauschen
      if(this[j][intCol] < this[i][intCol]){
        var arrHelp = this[i];
        this[i] = this[j];
        this[j] = arrHelp;
      }
    }
  }
}
// Storage-Klasse
// Autor: Hypix
// Zur freien Verwendung
function Storage(prefix,forceGM)
{
  var gm = typeof(unsafeWindow) != "undefined" && navigator.userAgent.indexOf("Firefox")>-1
  var win = gm ? unsafeWindow : window;
  var ls = false;
  var intGetValue;
  var intSetValue;
  var prefix = prefix;
  try {ls = typeof(win.localStorage) != "undefined";} catch(e) {}
  if( !ls && !gm )
    throw("Keine geeignete Speichermöglichgkeit gefunden");
  if( forceGM && gm || !ls)
  {
    if( gm )
    {
      prefix = prefix + "_" + document.location.host.split('.')[0];
      intSetValue = function(key,value) 
      {
        GM_setValue(prefix+"_"+key,value);
      };
      intGetValue = function(key,defaultValue)
      {
        return GM_getValue(prefix+"_" + key, defaultValue);
      }
      this.deleteValue = function(key)
      {
        GM_deleteValue(prefix+"_"+key);
      }
      this.listValues = function(re)
      {
        var allkeys = GM_listValues();
        var serverKeys = [];
        var rePrefix = new RegExp("^"+prefix+"_(.*)$");
        if( typeof(re) != "undefined" )
          var reKey = new RegExp(re);
        for( var i = 0; i < allkeys.length; i++ )
        {
          var res = allkeys[i].match(rePrefix);
          if( res )
          {
            if( reKey ) 
            {
              res = res[1].match(reKey);
              if( res )
                serverKeys.push(res);
            }
            else
              serverKeys.push(res[1]);
          }
        }
        return serverKeys;
      }
    }
  }
  else if( ls )
  {
    intSetValue = function(key,value) 
    {
      localStorage.setItem(prefix+"_"+key, value );
    };    
    intGetValue = function(key,defaultValue)
    {
      var value = localStorage.getItem(prefix+"_"+key);
      if( value )
        return value;
      else
        return defaultValue;
    };
    this.deleteValue = function(key)
    {
      localStorage.removeItem(prefix+"_"+key);
    }
    this.listValues = function(re)
    {
      var keys = [];
      var rePrefix = new RegExp("^"+prefix+"_(.*)$");
      if( typeof(re) != "undefined")
        var reKey = new RegExp(re);
      for( var i = 0; i < win.localStorage.length; i++ )
      {
        var res = localStorage.key(i).match(rePrefix);
        if( res )
        {
          if( reKey ) 
          {
            res = res[1].match(reKey);
            if( res )
              keys.push(res);
          }
          else
            keys.push(res[1]);
        }
      }
      return keys;
    }
  }
  this.clear = function(re)
  {
    var keys = this.listValues(re);
    for( var i = 0; i < keys.length; i++ )
      this.deleteValue(keys[i]);
  }
  this.setValue = function(key,value)
  {
    switch( typeof(value) )
    {
      case "object":
      case "function":
        intSetValue(key,"j"+JSON.stringify(value));
        break;
      case "number":
        intSetValue(key,"n"+value);
        break;
      case "boolean":
        intSetValue(key,"b" + (value ? 1 : 0));
        break;
      case "string":
        intSetValue(key,"s" + value );
        break;
      case "undefined":
        intSetValue(key,"u");
        break;
    }
  }  
  this.getValue = function(key,defaultValue)
  {
    var str = intGetValue(key);
    if( typeof(str) != "undefined" )
    {
      switch( str[0] )
      {
        case "j":
          return JSON.parse(str.substring(1));
        case "n":
          return parseFloat(str.substring(1));
        case "b":
          return str[1] == "1";
        case "s":
          return str.substring(1);
        default:
          this.deleteValue(key);
      }
    }
    return defaultValue;
  }
  this.getString = function(key)
  {
    return intGetValue(key);
  }
  this.setString = function(key,value)
  {
    intSetValue(key,value);
  }
}
var storage = new Storage('TWO',true);
var friends = [];
var watchlist = [];
}

function read_watchlist() {
	var tab = gid('friends_listing');
	var li = tab.childNodes;
	for(var i = 1; i < li.length; i++) {
		var status = cl(li[i], 'UserActions addToFriend easw_invite_already')[0];
		if(status.style.display == 'block')
			watchlist.push(tag(li[i], 'h3')[0].textContent);
	}
	var page = cl(cl(document, 'page_buttons')[0], 'text')[0].textContent.split(' ');
	if(p(page[1]) < p(page[3])) {
		var page_next = cl(cl(document, 'page_buttons')[0], 'page_next')[0];
		fireEvent(page_next, 'click');
		setTimeout(read_watchlist, 2000);
	}
	else {
		alert(watchlist.length + ' Anfragen stehen noch offen!');
		storage.setValue('request_send', watchlist);
	}
	
}
function read_friends() {
	var tab = gid('friends_listing');
	var li = tab.childNodes;
	for(var i = 1; i < li.length; i++) {
		friends.push(tag(li[i], 'h3')[0].textContent);
	}
	var page = cl(cl(document, 'page_buttons')[0], 'text')[0].textContent.split(' ');
	if(p(page[1]) < p(page[3])) {
		var page_next = cl(cl(document, 'page_buttons')[0], 'page_next')[0];
		fireEvent(page_next, 'click');
		setTimeout(read_friends, 2000);
	}
	else {
		alert(friends.length + ' Freunde wurden eingelesen!');
	}
	storage.setValue('my_friends', friends);
}
function read_friends_button() {
	var tab = gid('sideNavigation');
	var li = document.createElement('li');
	var a = document.createElement('a');
	a.innerHTML = 'Freunde einlesen';
	a.addEventListener('click', read_friends, false);
	tab.appendChild(li);
	li.appendChild(a);
}
function read_watchlist_button() {
	var tab = gid('sideNavigation');
	var li = document.createElement('li');
	var a = document.createElement('a');
	a.innerHTML = 'Freundschaftseinladungen einlesen';
	a.addEventListener('click', read_watchlist, false);
	tab.appendChild(li);
	li.appendChild(a);
}
function time_show_friends() {
	setTimeout(show_friends, 1000);
}
function show_friends() {
	var tab = gid('memberGroupListings');
	var friends = storage.getString('my_friends', '');
	var watchlist = storage.getString('request_send', '');
	for(var i = 0; i < 5; i++) {
		var friend = tab.getElementsByTagName('li')[i].getElementsByTagName('h3')[0].getElementsByTagName('a')[0].innerHTML;
		if(friends.match(friend)) {
			tab.getElementsByTagName('li')[i].getElementsByTagName('h3')[0].getElementsByTagName('a')[0].innerHTML = friend + ' Freund';
			tab.getElementsByTagName('li')[i].getElementsByTagName('h3')[0].getElementsByTagName('a')[0].style.color = '#191970';
		}
		else if(watchlist.match(friend)) {
			tab.getElementsByTagName('li')[i].getElementsByTagName('h3')[0].getElementsByTagName('a')[0].innerHTML = friend + ' Anfrage gesendet';
			tab.getElementsByTagName('li')[i].getElementsByTagName('h3')[0].getElementsByTagName('a')[0].style.color = '#000000';
		}
	}
	var page = cl(document, 'page_buttons');
	for(var i = 0; i < page.length; i++) {
		page[i].addEventListener('click', time_show_friends, false);
	}
}

if(location.href.match('mygallery/watchlist')){
	setTimeout(read_watchlist_button,1000);
}
if(location.href.match('mygallery/friends')){
	setTimeout(read_friends_button,1000);
}
if(location.href.match('groups/profile_members')){
	setTimeout(show_friends,3000);
}