// ==UserScript==
// @namespace scilog.ru
// @name SciLog customizer
// @description Makes forum more to your liking :)
// @include http://scilog.ru/*
// @include http://www.scilog.ru/*
// @version 1.4
// ==/UserScript==

// Google Chrome: need to install Tampermonkey
// https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo
// Opera: need to install Greasemonkey Emulation helper script
// http://userscripts.org/scripts/show/88932

// Comma-separated list of user IDs to hide:
//    string
//    about:config => "greasemonkey.scriptvals.scilog.ru/SciLog customizer.hide_user_IDs"

// Replace yellow marked text with italic:
//    bool, default = false
//    about:config => "greasemonkey.scriptvals.scilog.ru/SciLog customizer.yellow_to_italic"

// Optimize in-page links (replace with in-page anchors)
//    bool, default = true
//    about:config => "greasemonkey.scriptvals.scilog.ru/SciLog customizer.optimize_in-page_links"

(function()
{
  function loadHiddenIDs()
  {
  // You can provide the default list:
  //return GM_getValue('hide_user_IDs','70,1155').split(',').filter(function(e){return e>0});
    return GM_getValue('hide_user_IDs','').split(',').filter(function(e){return e>0});
  }

  function saveHiddenIDs( hiddenIDs )
  {
    hiddenIDs = hiddenIDs.sort(function(a,b){return a-b});
    GM_setValue( 'hide_user_IDs', hiddenIDs.join(',') );
  }

  function createFromString( str )
  {
    var div = document.createElement('div');
    div.innerHTML = str;
    return div.childNodes;
  }

  function appendAll( dst, nodes )
  {
    for( var i = nodes.length; i; --i )
      dst.appendChild( nodes[0] );
  }


  function reLink( url )
  {
    if( !GM_getValue('optimize_in-page_links',true) ) return;
    var m = url.match(/(.+\/viewtopic\.php\?pid=)(\d+)(#p(\d+))?/);
    if(!m) return;
    var pageBase = m[1];
    var pageID = m[2];

    // make list of posts
    var posts = document.getElementsByClassName('blockpost');
    var inPagePosts = [];
    for( var i = posts.length; i--; )
      inPagePosts[ posts[i].id.slice(1) ] = posts[i];

    var re = [];
    for( var i=0; i < posts.length; ++i )
    {
      var links = posts[i].getElementsByTagName('a');
      var name = '';
      for( var j=0; j < links.length; ++j )
      {
        var m = links[j].href.match(/\/profile\.php\?id=\d+/);
        if(m) { name = links[j].text; continue; }
        m = links[j].href.match(/\/viewtopic\.php\?pid=(\d+)(#p(\d+))?/);
        if(!m) continue;
        var id = m[3] ? m[3] : m[1];
        if( inPagePosts[id] )
        {
          var thisID = posts[i].id.slice(1);
          if( id >= thisID ) continue;
          if( re[id] && re[id][thisID] ) continue;
          re[id] = []; re[id][thisID] = true;
          var d = inPagePosts[id].getElementsByClassName('postright');
          var a = createFromString( '<br/><a href="viewtopic.php?pid=' + pageID + '#' + posts[i].id + '">► Re: ' + name + '</a>' );
          appendAll( d[0], a );
        }
      }
    }

    var links = document.getElementsByTagName('a');
    for( var i = links.length; i--; )
    {
      var m = links[i].href.match(/\/viewtopic\.php\?pid=(\d+)(#p(\d+))?/);
      if(!m) continue;
      var id = m[3] ? m[3] : m[1];
      if( inPagePosts[id] )
        links[i].href = pageBase + pageID + '#p' + id;
    }
  }

  function deYellowPosts()
  {
    if( !GM_getValue('yellow_to_italic',false) ) return;
    var s = document.getElementsByTagName('span');
    for( var i = s.length; i--; )
    {
      if( s[i].style.backgroundColor )
      {
        s[i].style.backgroundColor = '';
        s[i].style.fontStyle = 'italic';
      }
    }    
  }

  function hidePosts()
  {
    var hiddenIDs = loadHiddenIDs();
    if( !hiddenIDs.length ) return;
    var d = document.getElementsByTagName('div');
    for( var i = d.length; i--; )
    {
      var name = d[i].className;
      if( !name || !name.match(/blockpost( .+)?/) ) continue;
      var postDIV = d[i];
      var links = postDIV.getElementsByTagName('a');
      var m = links[1].href.match(/scilog\.ru\/profile\.php\?id=(\d+)/);
      if(!m) continue;
      var posterID = m[1];
      if( -1 == hiddenIDs.indexOf(posterID) ) continue;
      var postID = postDIV.getAttribute('id');
      var postTIME = links[0].textContent;
      var postUSER = links[1].textContent;
      var nd = createFromString( '<div style="CURSOR: pointer" id="' + postID + '" class=quotetop onclick="OpenSpoiler(\'' + postID + '_\')">'
                                + postTIME + ' » ' + postUSER + '</div>' )[0];
      postDIV.parentNode.insertBefore( nd, postDIV );
      postDIV.id = postID + '_';
      postDIV.setAttribute( 'style', 'DISPLAY: none' );
    }
  }

  function toggleSwitch_Hidden( e )
  {
    var id = window.location.href.match(/id=(\d+)/)[1];
    var hiddenIDs = loadHiddenIDs();
    var hidden = -1 != hiddenIDs.indexOf(id);
    var checked = e.target.checked;
    if( hidden == checked ) return;
    if( checked ) hiddenIDs.push(id);
    else hiddenIDs = hiddenIDs.filter(function(e){return e!=id});
    saveHiddenIDs( hiddenIDs );
  }

  function addSwitch_Hidden( url )
  {
    var id = url.match(/id=(\d+)/)[1];
    var sp = document.getElementById('viewprofile') ? ' ' : '';
    var hiddenIDs = loadHiddenIDs();
    var hidden = -1 != hiddenIDs.indexOf(id);
    var nd = createFromString( '('+sp+'<input id="switch_hidden" name="hidden" type="checkbox">'+sp+'свернуть)' );
    nd[1].addEventListener( 'click', toggleSwitch_Hidden, false );
    var links = document.getElementsByTagName('a');
    for(var i in links)
      if( links[i].href.match(/&action=shield/) )
      {
        appendAll( links[i].parentNode, nd );
        return;
      }
  }

  function toggleSwitch_DeYellow( e )
  {
    var deYellow = GM_getValue('yellow_to_italic',false);
    var checked = e.target.checked;
    if( deYellow == checked ) return;
    GM_setValue( 'yellow_to_italic', checked );
  }

  function toggleSwitch_InPageLinks( e )
  {
    var inPageLinks = GM_getValue('optimize_in-page_links',true);
    var checked = e.target.checked;
    if( inPageLinks == checked ) return;
    GM_setValue( 'optimize_in-page_links', checked );
  }

  function addPreferenceSwitches( url )
  {
    var id = url.match(/id=(\d+)/)[1];
    var me = document.getElementById('navprofile').firstChild.href.match(/id=(\d+)/)[1];
    if( id != me ) return;

    var nd = createFromString( '<label><input type="checkbox">Преобразовывать желтушный текст в наклонный.</label>' );
    var checkbox = nd[0].firstChild;
    checkbox.checked = GM_getValue('yellow_to_italic',false);
    checkbox.addEventListener( 'click', toggleSwitch_DeYellow, false );
    appendAll( document.getElementsByClassName('rbox')[0], nd );

    nd = createFromString( '<label><input type="checkbox">Оптимизировать ссылки на посты в пределах странцы.</label>' );
    checkbox = nd[0].firstChild;
    checkbox.checked = GM_getValue('optimize_in-page_links',true);
    checkbox.addEventListener( 'click', toggleSwitch_InPageLinks, false );
    appendAll( document.getElementsByClassName('rbox')[0], nd );
  }


  function submitForm_FindUser() { document.getElementById('find_user').submit(); }

  function addProfileAdminExtras( url )
  {
    var m = url.match(/\/profile.php\?(section=essentials&)?id=(\d+)/);
    if(!m) return;
    var id = m[2];

    var links = document.getElementsByTagName('a');
    for( var i = links.length; i--; )
    {
      if( !links[i].href.match(/viewposts.php\?id=/) ) continue;
      var nd = createFromString( ' » <a href="admin_users.php?ip_stats=' + id + '">Статистика IP</a>' );
      appendAll( links[i].parentNode, nd );
      break;
    }

    if( document.getElementById('viewprofile') )
    {
      var dl = document.getElementsByTagName('dl');
      var dd = dl[0].getElementsByTagName('dd')[0];
      var text_name = dd.firstChild;
      var name = text_name.data;

      var nd = createFromString( '<form action="admin_users.php?action=find_user" method="post" id="find_user">'
                                +'<input value="Pubsisennybus" name="username" type="hidden">'
                                +'<input value="username" name="order_by" type="hidden">'
                                +'<input value="ASC" name="direction" type="hidden">'
                                +'<input value="all" name="user_group" type="hidden">'
                                +'<input value="Submit search" name="find_user" type="hidden">'
                                +'<a href="javascript:void(1);">'
                                + name + '</a></form>' )[0];
      nd.childNodes[5].addEventListener( 'click', submitForm_FindUser, false );
      dd.replaceChild( nd, text_name );

      var nd = createFromString( '<form action="profile.php?section=admin&id=' + id + '&action=foo" method="post" id="profile7">'
                                +'<input value="1" name="form_sent" type="hidden">'
                                +'<input value="Забанить пользователя" name="ban" type="submit"></form>' );
      appendAll( dd, nd );
    }
  }


  function viewtopicMod( url )
  {
    reLink(url);
    hidePosts();
    deYellowPosts();

    var m = url.match(/\/viewtopic\.php\?pid=(\d+)(#p(\d+))?/);
    if(!m) return;
    if(!m[2]) url += '#p' + m[1];
    window.location = url;
  }

  function profileMod( url )
  {
    if( url.match(/\/profile\.php\?(section=essentials&)?id=\d+/) )
      addSwitch_Hidden(url);
    if( url.match(/\/profile\.php\?section=display&id=\d+/) )
      addPreferenceSwitches(url);

    if( !document.getElementById('navadmin') ) return;
    addProfileAdminExtras(url);
  }


  if( typeof(unsafeWindow) == 'undefined' ) unsafeWindow = window;
  var myLocalStorage = unsafeWindow.localStorage;

  var url = window.location.href;
  if(!url.match(/https?:\/\/(www\.)?scilog.ru\//)) return;

  if( url.match(/\/viewtopic\.php\?/) ) return viewtopicMod(url);
  if( url.match(/\/profile\.php\?/) ) return profileMod(url);
})();
