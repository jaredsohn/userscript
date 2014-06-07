// ==UserScript==
// @name           ShowAllGroups
// @namespace      vispillo
// @grant			none
// @include        http://www.flickr.com/photos/*/*
// @include		     http://www.flickr.com/people/*
// @require http://userscripts.org/scripts/source/78952.user.js
// ==/UserScript==

function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) {
    return;
  }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}

jQuery.noConflict();
if (window.location.href.indexOf('flickr.com/people') == -1) {
  addGlobalStyle('#group-placeholder { display:none !important }');
  addGlobalStyle('li.sidebar-context-pool { display:block !important }');

  ul = document.getElementById('secondary-contexts');
  all = ul.getElementsByClassName('sidebar-context');
  sets = new Array;
  var sortedKeys = new Array;
  var pools = new Array;
  for (i in all) {
    try {
    if (all[i].getAttribute('data-context-type') != undefined) {
      if (all[i].getAttribute('data-context-type') == 'set') {
        sets.push(all[i]);
      }
    }
    } catch (e) {
    }
  }
  for (i = 0; i < sets.length; i++) {
    pools[sets[i].getElementsByClassName('context-title')[0].getAttribute('title')] = sets[i];
    sortedKeys.push(sets[i].getElementsByClassName('context-title')[0].getAttribute('title'));
  }
  sortedKeys.sort(function(x, y) {
    var a = String(x).toUpperCase();
    var b = String(y).toUpperCase();
    if (a > b) return 1
    if (a < b) return -1
    return 0;
  });
  for (i = 0; i < sortedKeys.length; i++) {
    ul.appendChild(pools[sortedKeys[i]]);
  }

  lis = ul.getElementsByClassName('sidebar-context-pool');
  var sortedKeys = new Array;
  var pools = new Array;
  for (i = 0; i < lis.length; i++) {
    pools[lis[i].getElementsByClassName('context-title')[0].getAttribute('title')] = lis[i];
    sortedKeys.push(lis[i].getElementsByClassName('context-title')[0].getAttribute('title'));
  }
  sortedKeys.sort(function(x, y) {
    var a = String(x).toUpperCase();
    var b = String(y).toUpperCase();
    if (a > b) return 1
    if (a < b) return -1
    return 0;
  });
  for (i = 0; i < sortedKeys.length; i++) {
    ul.appendChild(pools[sortedKeys[i]]);
  }
}
else {
  try {
    document.getElementById('show-groups-bottom').setAttribute('style', 'display:none');
    num = document.getElementById('show-groups-top').innerHTML;
    document.getElementById('show-groups-top').parentNode.innerHTML = '(' + num + ')';
  } catch (e) {}
  if (num == 50) {
    nsid = jQuery('img.sn-avatar-ico').attr('src').split('#')[1];
    fetchGroups(nsid)
  }
  else {
    sortProfilePage();
  }
}

function fetchGroups(nsid) {

  jQuery('#groups span.header-count').html('').append('<img style="height: 8px; width: 16px;" src="http://l.yimg.com/www.flickr.com/images/pulser2.gif" />');
  hash = unsafeWindow.global_auth_hash;
  key = unsafeWindow.global_magisterLudi;

  url = 'http://www.flickr.com/services/rest/?method=flickr.people.getPublicGroups&user_id=' + nsid + '&format=json&nojsoncallback=1&api_key=' + key + '&auth_hash=' + hash;
  var existing;
  total = 50;
  jQuery('#groups-page-1 li a').each(function(k, val) {
    existing += jQuery(val).text();
  });
  jQuery.getJSON(url, function(data) {
    if (data.stat == 'ok') {
      jQuery.each(data.groups.group, function(i, val) {
        bgcol = '#fff';
        if (val.admin) {
          // bgcol = '#ddd';
        }
        if (existing.indexOf(val.name) != -1) {
          // jQuery('li:contains("'+val.name.replace(/\)/gi,'\\\\)').replace(/\(/gi,'\\\\(')+'")').css('background-color',bgcol);
        } else {
          jQuery('<li class="" style="background-color:'+bgcol+'"><a href="/groups/' + val.nsid + '/" >' + val.name + '</a><span class="group-info"></span></li>').appendTo('#groups-page-1');
          total++;
        }
      });
      jQuery('#groups span.header-count').html('(' + total + ')')
      sortProfilePage();
    }
  });
}

function sortProfilePage() {
  lis = jQuery('#groups-page-1 li');
  var pools = new Array;
  var sortedKeys = new Array;
  lis.each(function(i, val) {
    val.setAttribute('class', '');
    pools[jQuery(val).find('a').text()] = val;
    sortedKeys.push(jQuery(val).find('a').text());
  });
  sortedKeys.sort(function(x, y) {
    var a = String(x).toLowerCase().replace(/^\ +/g, '');
    var b = String(y).toLowerCase().replace(/^\ +/g, '');
    if (a > b) return 1
    if (a < b) return -1
    return 0;
  });

  for (i = 0; i < sortedKeys.length; i++) {
    jqli = jQuery(pools[sortedKeys[i]]);
    if (jqli.find('a').length == 1) {
      jqli.append('<a title="Photos by '+document.title.replace(/^Flickr: /,'')+' in group '+jqli.find('a').text()+'" href="'+jqli.find('a').attr('href')+'pool/'+jQuery('img.sn-avatar-ico').attr('src').split('#')[1]+'/">▣</a>');
    }
    jqli.appendTo('#groups-page-1');
  }
}