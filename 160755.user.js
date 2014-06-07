// ==UserScript==
// @name           Asian DVD Club Integration
// @namespace      local
// @include        http://*.imdb.com/*
// @include        *
// @version        1.0.3
// @author         Mikawo
// @license        GPLv3
// @grant          GM_openInTab
// @updateURL      https://userscripts.org/scripts/source/160755.meta.js
// @downloadURL    https://userscripts.org/scripts/source/160755.user.js
// ==/UserScript==

var is_main_page = (window.top == window.self);
var has_contextmenu = 'HTMLMenuElement' in window && 'HTMLMenuItemElement' in window;

var adc_heading = 'Asian DVD Club';
var adc_caption = 'Search Asian DVD Club';
var adc_icon_url = 'http://asiandvdclub.org/favicon.ico';

var adc_menu;
var adc_menu_item;
var adc_query;

if (has_contextmenu) {
  adc_menu = document.createElement('menu');
  adc_menu.id = 'adc_context_menu';
  adc_menu.type = 'context';
}

function get_adc_search_url(query) {
  return 'https://asiandvdclub.org/browse.php?search=' + query + '&descr=1&c19=1&c12=1&c15=1&c27=1&c13=1&c14=1&c20=1&c18=1&c25=1&c24=1&c23=1&c21=1&c26=1&c17=1&c22=1&c16=1';
}

function get_imdb_id(url) {
  if (!url) {
    return null;
  }

  var splitted = url.split('/');
  var category;
  var id;

  for (var i = 0; i < splitted.length; i++) {
    if (splitted[i].indexOf('.imdb.com') != -1 && i+2 < splitted.length) {
      category = splitted[i+1];

      if (category == 'title') {
        id = splitted[i+2];
      }

      break;
    }
  }

  return id;
}

function insert_after(node, insert_node) {
  node.parentNode.insertBefore(insert_node, node.nextSibling);
}

function create_link_bar(heading, caption, url, icon_url) {
  var node = document.createElement('div');

  var style_bar = 'background-color: #F2F2F1; background: -webkit-linear-gradient(top, #F2F2F1 0px, #E8E8E8 100%) repeat scroll 0 0 transparent; background: -moz-linear-gradient(top, #F2F2F1 0px, #E8E8E8 100%) repeat scroll 0 0 transparent; background: -ms-linear-gradient(top, #F2F2F1 0px, #E8E8E8 100%) repeat scroll 0 0 transparent; background: -o-linear-gradient(top, #F2F2F1 0px, #E8E8E8 100%) repeat scroll 0 0 transparent; background: linear-gradient(to bottom, #F2F2F1 0px, #E8E8E8 100%) repeat scroll 0 0 transparent; border-radius: 0 0 12px 12px;border-top: 1px solid #DDDDDD; height: 53px;';
  var style_a = 'text-decoration: none;';
  var style_a_div = 'float: left; padding: 7px 0; background-image: none; width: 644px;';
  var style_icon = 'background-image: url(\'' + icon_url + '\'); background-position: 3px 3px; background-repeat: no-repeat; float: left; margin: 0 10px 0 15px; color: #666666; font-size: 85%; padding: 0; height: 38px; width: 38px; display: inline-block; vertical-align: middle;';
  var style_header = 'color: #136CB2; font-size: 110%; font-weight: normal; margin: 0; padding: 0 0 2px;';
  var style_caption = 'color: #666666; font-size: 85%; margin: 0; padding: 0;';

  node.style.cssText = style_bar;
  node.innerHTML = '<a style="' + style_a + '" target="_blank" href="' + url + '"><div style="' + style_a_div + '"><span style="' + style_icon + '"></span><h3 style="' + style_header + '">' + heading + '</h3><p style="' + style_caption + '">' + caption + '</p></div></a>';

  return node;
}

function insert_link_bar(bar) {
  var node = document.getElementById('title-overview-widget');

  while (node != null) {
    if ('innerHTML' in node && node.innerHTML.indexOf('csm_WatchBarWidget_started') != -1) {
      node = node.nextSibling;
      break;
    }

    node = node.nextSibling;
  }

  while (node != null) {
    if ('innerHTML' in node && node.innerHTML.indexOf('csm_WatchBarWidget_finished') != -1) {
      break;
    }

    if ('style' in node) {
      node.style.borderRadius = '0px 0px 0px 0px';
    }

    node = node.nextSibling;
  }

  if (node) {
    node.parentNode.insertBefore(bar, node);
    console.debug('Link bar added to overview');
  }
}

function create_action_button(caption, url) {
  var node = document.createElement('a');

  node.className = 'linkasbutton-secondary';
  node.target = '_blank';
  node.href = url;
  node.innerHTML = caption;

  return node;
}

function insert_action_button(button) {
  var node = document.getElementById('action-box');

  if (node) {
    var nodes = node.children;
    node = null;

    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].className.indexOf('linkasbutton-secondary') != -1) {
        node = nodes[i];
        break;
      }
    }

    if (node) {
      insert_after(node, button);
      console.debug('Button added to action box');
    }
  }
}

function create_menu_item(caption, icon_url, on_click) {
  var item;

  item = document.createElement('menuitem');
  item.label = caption;
  item.icon = icon_url;
  item.addEventListener('click', on_click);

  return item;
}

function on_context_menu(event) {
  console.debug('Context menu opened');

  var node = event.target;
  var id;
  var query;

  while (node != null) {
    if ('href' in node) {
      id = get_imdb_id(node.href);
      break;
    }

    node = node.parentNode;
  }

  console.debug('IMDb ID: ' + (id ? id : 'none'));

  if (id) {
    query = id;
  } else {
    query = encodeURI(window.getSelection().toString().split(/\r\n|\r|\n/g)[0].replace(/^\s+|\s+$/g, ''));

    console.debug('Selected text: ' + (query ? '"' + query + '"' : 'none'));
  }

  var menu;
  var menu_id = document.body.getAttribute('contextmenu');
  if (menu_id) {
    menu = document.getElementById(menu_id);
  }

  if (query) {
    console.debug('Showing context menu item');

    if (!menu) {
      document.body.appendChild(adc_menu);
      document.body.setAttribute('contextmenu', adc_menu.id);
      menu = adc_menu;
    }

    if (!menu.contains(adc_menu_item)) {
      menu.appendChild(adc_menu_item);
    }

    adc_query = query;
  } else {
    console.debug('Hiding context menu item');

    if (menu) {
      if (menu.contains(adc_menu_item)) {
        menu.removeChild(adc_menu_item);
        adc_query = null;
      }

      if (menu == adc_menu) {
        document.body.removeChild(adc_menu);
        document.body.removeAttribute('contextmenu');
      }
    }
  }
}

function on_adc_menu_item_clicked(event) {
  console.debug('Context menu item clicked');

  if (adc_query) {
    url = get_adc_search_url(adc_query);
    GM_openInTab(url);
    console.debug('Launched: ' + url);
  }
}

function main() {
  console.debug('Script started');

  if (has_contextmenu) {
    console.debug('HTML context menu supported: Yes');
    adc_menu_item = create_menu_item(adc_caption, adc_icon_url, on_adc_menu_item_clicked);
    document.body.addEventListener('contextmenu', on_context_menu, false);
  } else {
    console.debug('HTML context menu supported: No');
  }

  var id = get_imdb_id(window.location.href);
  if (id && is_main_page) {
    console.debug('Modifying page');

    var search_url = get_adc_search_url(id);
    var node;

    node = create_link_bar(adc_heading, adc_caption, search_url, adc_icon_url);
    if (node) {
      insert_link_bar(node);
    }

    node = create_action_button(adc_caption, search_url);
    if (node) {
      insert_action_button(node);
    }
  }
}

main();