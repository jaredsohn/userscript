// ==UserScript==
// @name           SexyAsianCams helper
// @namespace      http://userscripts.org/users/nulliplex
// @description    Provides useful aids to SexyAsianCams (& others) users
// @include        http://www.asiancamzone.com/*
// @include        http://asiancamzone.com/*
// @include        http://www.cumcams.com/*
// @include        http://cumcams.com/*
// @include        http://www.wowcams.com/*
// @include        http://wowcams.com/*
// @include        http://www.sexyasiancams.com/*
// @include        http://sexyasiancams.com/*
// @include        http://test.sexyasiancams.com/*
// ==/UserScript==

/*
 * Copyright (c) 2009 nulliplex
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so.
 */

/**** UTILITY FUNCTIONS */

function xpath_snapshot(xpath, parent)
{
  if(!parent) parent = document;
  return document.evaluate(xpath, parent, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function xpath_single_node(xpath, parent)
{
  if(!parent) parent = document;
  return document.evaluate(xpath, parent, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function xpath_text(xpath, regexp, parent)
{
  if(!parent) parent = document;

  var elem = document.evaluate(xpath, parent, null, XPathResult.STRING_TYPE, null);
  if(!elem) return null;

  var match = elem.stringValue.match(regexp);
  if(!match) return null;

  return match[match.length-1];
}

function rm_element(el)
{
  el.parentNode.removeChild(el);
}

if(window.chrome && localStorage)
{
  function GM_setValue(key, val)
  {
    return localStorage.setItem('helper_'+key, val);
  }
  function GM_getValue(key)
  {
    return localStorage.getItem('helper_'+key);
  }
}

/**** INDEX PAGE */

function parse_single_model(model, cur_category)
{
  model._name = xpath_text('./div[@class="thumbUsername"]', /^\s*(.+?)\s*$/, model);
  if(! model._name) return null;

  model._status = status_to_nr(xpath_text('./div[@class="thumbTextArea"][1]', /[a-zA-Z]+/, model));
  if(model._status == 4) return null;

  model._category = cur_category;

  if(xpath_single_node('./div[@class="thumbPhoto"]//div[@class="java_icon"]', model))
    model._flash = false;
  else
    model._flash = true;

  if(xpath_single_node('./div/a[@title="Remove from Hot List"]', model))
    model._hotlist = true;
  else
    model._hotlist = false;

  model._price = parseFloat(xpath_text('./div[@class="thumbTextArea"][2]', /([0-9]+.[0-9]+)/, model));

  model._id = parseInt(model.id.match(/[0-9]+$/)[0]);

  //GM_log("model id=" + model._id + " status=" + model._status + " category=" + model._category + " flash=" + model._flash + " price=" + model._price + " name='" + model._name + "'");

  if(model._status < 3 && model._hotlist)
    model.style.backgroundColor = "darkred";

  model._hovermenu = null;
  model.addEventListener('mouseover', function(evt) { model_mouseover(evt, model); }, false);

  return model;
}

function parse_models()
{
  g_models = new Array();
  g_categories = new Array();
  g_category_filter = new Array();

  var table_cells = xpath_snapshot('tbody/tr/td', g_models_table);
  var cur_category = null;
  var cell;
  var catname;
  var models;
  var model;
  var i, j;

  for(i = 0; cell = table_cells.snapshotItem(i); i++)
  {
    if(cell.className == 'categoryHeader')
    {
      catname = cell.textContent.match(/^\s*(.+?)\s*$/)[1];
      cur_category = g_categories.length;
      g_categories.push(catname);
      GM_log("Found category: " + catname);

      if(catname.match(/Top Models/i))
        g_category_filter.push(false);
      else
        g_category_filter.push(true);
    }
    else
    {
      models = xpath_snapshot('./div[@class="performerThumb"]', cell);
      if(! models)
        GM_log('cannot find models or WTF');

      for(j = 0; model = models.snapshotItem(j); j++)
      {
        model = parse_single_model(model, cur_category);
        if(model)
          g_models.push(model);
      }
    }
  }

  GM_log("processed models: " + g_models.length + ", categories: " + g_categories.length);
}

function create_hovermenu(model)
{
  var menu = document.createElement('div');

  menu.setAttribute('style', "position: relative; visibility: hidden");

  var style = "";

  var show_guestchat = model._flash && model._status == 0;

  menu.innerHTML = '<div style="position: absolute; background-color: black; border: 1px solid yellow">'
    + '<a href="/exec/chat/' + model._id + '/0">Chat</a><br/>'
    + (show_guestchat ? '<a href="/exec/chat/' + model._id + '/0#guestchat">Guest</a><br/>' : '<s>Guest</s><br/>')
    + '<a href="/exec/gallery/public/' + model._id + '/0">Pics</a><br/>'
    + '<a href="/exec/performerprofile/' + model._id + '/0">Profile</a>'
    + '</div>';

  model.insertBefore(menu, model.firstChild);
  menu.style.left = model.clientWidth;
  menu.style.top = -1;

  return menu;
}

function model_mouseover(event, model)
{
  if(! model._hovermenu)
    model._hovermenu = create_hovermenu(model);

  var menu = model._hovermenu;

  if(g_visible_menu !== menu)
  {
    if(g_visible_menu)
      g_visible_menu.style.visibility = 'hidden';

    menu.style.visibility = 'visible';

    g_visible_menu = menu;
  }
}

function update_auto_enable()
{
  var value = document.getElementById('helper_auto_enable').checked;
  GM_log("auto_enable=" + value);
  GM_setValue("auto_enable", value);
}

function create_search_form()
{
  var div = document.createElement('div');
  div.innerHTML = '<div style="margin: 5px auto; padding: 5px; width: 300px; background-color: #2b012b; border: 1px solid #660066; color: #cccccc; font-size: 12px">'
    + '<a href="javascript:" id="helper_enable_search" style="text-align: center; color: white">Enable helper</a>'
    + '<form id="helper_search_form" action="#" onsubmit="return false;">'
    + '<input id="helper_auto_enable" name="auto_enable" type="checkbox" />'
    + '<label for="helper_auto_enable">Always enable helper</label><br />'
    + 'Search name: <input id="helper_screen_name" name="screen_name" type="text" size="20" /><br />'
    + '</form></div>';

  g_search_box = div;
  g_models_table.parentNode.insertBefore(div, g_models_table);

  var link = document.getElementById('helper_enable_search');
  link.addEventListener('click', enable_search, true);

  var form = document.getElementById('helper_search_form');
  form.addEventListener('submit', function() { return false; }, true);

  var input = document.getElementById('helper_auto_enable');
  if(GM_getValue('auto_enable'))
    input.checked = true;
  else
    form.style.display = 'none';

  input.addEventListener('change', update_auto_enable, false);

  input = document.getElementById('helper_screen_name');
  input.addEventListener('change', run_search, false);
  input.addEventListener('keyup', run_search, false);
}

function run_search(event)
{
  if(! g_search_results)
    populate_search_results();

  var model;
  var display;
  var name = document.getElementById('helper_screen_name').value;
  name = name.toLowerCase();

  GM_log("searching: name=" + name + " catfilter=" + g_category_filter);

  for(i = 0; i < g_models.length; i++)
  {
    model = g_models[i];
    display = true;

    if(model._name && model._name.toLowerCase().indexOf(name) == -1)
      display = false;
    else if(model._category !== null && !g_category_filter[model._category])
      display = false;

    if(display && model.style.display == 'none')
      model.style.display = 'block';
    else if(!display && model.style.display != 'none')
      model.style.display = 'none';
  }
}

function status_to_nr(status)
{
  if(status == "FREE")
    return 0;
  else if(status == "Nude")
    return 1;
  else if(status == "Busy")
    return 2;
  else if(status == "OFFLINE")
    return 3;

  GM_log("Unknown model status: " + status);
  return 4;
}

function sort_compare_function(a, b)
{
  if(a._hotlist != b._hotlist)
  {
    if(b._hotlist) return 1;
    else           return -1;
  }
  if(a._status != b._status)
    return a._status - b._status;
  if(a._price != b._price)
    return a._price - b._price

  return 0;
}

function sort_models(event)
{
  g_models.sort(sort_compare_function);
}

function fix_privates_box()
{
  if(! document.getElementById('prvtListBox'))
    return;

  var div = document.createElement('div');
  div.setAttribute('style', 'padding: 0px 59px; float: left');

  var elem = xpath_single_node('//div[@class="categoryHeader"]');
  if(elem)
    div.appendChild(elem);

  elem = document.getElementById('prvtListBox');
  if(elem)
    div.appendChild(elem);

  g_models_table.parentNode.insertBefore(div, g_search_box);
}

function populate_search_results()
{
  if(! g_models)
    return GM_log("No models found");

  var model;
  var div = document.createElement('div');
  div.align = g_models_table.align;

  g_search_results = div;

  fix_privates_box();

  g_models_table.style.display = 'none';

  for(i = 0; i < g_models.length; i++)
  {
    model = g_models[i];
    model.style.margin = g_models_table.cellSpacing + 'px';

    g_search_results.appendChild(model);
  }

  g_models_table.parentNode.insertBefore(g_search_results, g_models_table);
}

function category_change(event)
{
  var catno = parseInt(event.target.id.match(/[0-9]+/)[0]);
  g_category_filter[catno] = event.target.checked;
  //GM_log('checkbox ' + event.target.id + ' category ' + catno + ' changed to ' + event.target.checked);

  run_search();
}

function populate_search_form()
{
  var link = document.getElementById('helper_enable_search');
  link.style.display = "none";
  var form = document.getElementById('helper_search_form');
  form.style.display = null;

  for(i = 0; i < g_categories.length; i++)
  {
    var catname = g_categories[i];

    var input = document.createElement('input');
    input.id = 'helper_cat_' + i;
    input.name = 'cat_' + i;
    input.type = 'checkbox';
    input.checked = g_category_filter[i];

    input.addEventListener('change', category_change, false);
    var label = document.createElement('label');
    label.setAttribute('for', input.id);
    label.textContent = catname;

    form.appendChild(input);
    form.appendChild(label);
    form.appendChild(document.createElement('br'));
  }
}

function enable_search()
{
  if(g_search_results)
    return;

  sort_models();
  populate_search_form();
  populate_search_results();
  run_search();
}

function handle_index()
{
  g_models = null;
  g_visible_menu = null;
  g_categories = null;
  g_models_table = null;
  g_search_box = null;
  g_search_results = null;
  g_category_filter = null;

  g_models_table = xpath_single_node('//table[@cellspacing=2]');

  if(! g_models_table)
    return GM_log("Error: cannot find models table");

  create_search_form();
  parse_models();

  if(GM_getValue('auto_enable'))
    enable_search();
}

/**** FAVORITES PAGE */

function handle_favorites()
{
  handle_index();
}

/**** PROFILE PAGE */

function profile_refresh_img(img, src)
{
  img.src = src + '?_=' + parseInt(new Date().getTime()/(300*1000)); // bypass cache
  GM_log("img src=" + img.src);

  setTimeout(function() { profile_refresh_img(img, src); }, 310*1000);
}

function handle_profile()
{
  var img = xpath_single_node('//td[@valign="middle"][@align="center"]//img');
  if(! img)
    return GM_log("Error: Cannot find profile page image");

  img.width = 320;
  img.height = 240;

  var src = img.src;

  var match = src.match(/^(.*\/(-1|[0-9]+))_[x0-9]+.jpg$/);
  if(match)
    src = match[1] + '_320x240.jpg';

  if((match && match[2] == "-1") || src.match(/\/live\//))
    profile_refresh_img(img, src);
  else
    img.src = src;
}

/**** CHAT PAGE */

function x_get_cookie(key)
{
  var match = document.cookie.match(key + '=([^;]+)');
  if(match)
    return match[1];
  return null;
}

function rename_cookie(oldkey, newkey)
{
  value = x_get_cookie(oldkey);
  if(value)
  {
    document.cookie = newkey + '=' + value + '; Path=/';
    document.cookie = oldkey + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

function restore_backup_cookie()
{
  rename_cookie('JSESSIONID_tmp', 'JSESSIONID');
}

function get_guest_cookie(callback)
{
  var url = document.location.protocol + '//' + document.location.hostname + '/exec/_sessioninfo.jsp?callback=json';
  rename_cookie('JSESSIONID', 'JSESSIONID_tmp');
  var xhr = new XMLHttpRequest();

  // Temporary hack for Google Chrome workaround
  xhr._handled = false;

  setTimeout(function() {
      if(xhr.readyState != 4)
      {
        xhr.abort();
        restore_backup_cookie();
        GM_log("reached get_guest_cookie timeout!");
      }
    }, 5000);

  function statechange() {
    if(xhr.readyState == 4 && !xhr._handled)
    {
      xhr._handled = true;
      var guest_cookie = x_get_cookie('JSESSIONID');
      restore_backup_cookie();
      if(guest_cookie)
        callback(guest_cookie);
    }
  }

  xhr.open('GET', url);

  if(! window.chrome)
  {
    xhr.onreadystatechange = statechange;
  }
  else
  {
    xhr.onreadystatechange = statechange;
    // Google Chrome does not support XHR onreadystatechange in user scripts
    //xhr.open('GET', url, true); // doesn't support sync XHR either (?!)
    setTimeout(statechange, 500);
    setTimeout(statechange, 3000);
  }

  xhr.send();
}

// callback from XMLHttpRequest
function guestchat_got_cookie(guest_cookie)
{
  GM_log('guest_cookie=' + guest_cookie);

  var flashvars = g_chat_embed.getAttribute('flashvars')
  flashvars = flashvars.replace(/(custom[0-9]+=identity)=[0-9a-fA-F]+/, '$1=' + guest_cookie);
  g_chat_embed.setAttribute('flashvars', flashvars);

  g_chat_embed._oldparent.insertBefore(g_chat_embed, g_chat_embed._oldprev);
}

function do_guestchat(embed)
{
  // remove Flash embed
  g_chat_embed._oldparent = g_chat_embed.parentNode;
  g_chat_embed._oldprev = g_chat_embed.previousSibling;
  rm_element(g_chat_embed);

  get_guest_cookie(guestchat_got_cookie);
}

function handle_flash_chat()
{
  if(window.location.hash.match(/guestchat/))
    do_guestchat(g_chat_embed);
}

function handle_chat()
{
  g_chat_embed = document.getElementById('customer');
  g_chat_applet = xpath_single_node('//applet[@name="previewApplet"]');

  if(g_chat_embed)
    handle_flash_chat();
}

/**** MISC PAGES */

function remove_banners()
{
  var el = xpath_single_node('//img[contains(@src, "/passagift_banner.gif")]');
  if(el) rm_element(el);
  el = xpath_single_node('//object[contains(param/@value, "/rotate_banner.swf")]');
  if(el) rm_element(el);
}

function handle_gallery()
{
}

function run_handler()
{
  remove_banners();

  g_path = document.location.pathname.split(/\/+/).slice(2);
  var page = g_path[0];

  if(page === undefined || page == '' || page == 'index' || page == 'models')
    handle_index();
  else if(page == 'performerprofile')
    handle_profile();
  else if(page == 'gallery')
    handle_gallery();
  else if(page == 'chat')
    handle_chat();
  else if(page == 'favorites')
    handle_favorites();
}

run_handler();

