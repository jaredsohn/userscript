// -*- javascript-indent-level: 2 -*-
// ==UserScript==
// @name             Skycust
// @description      A forum avatar-replacer based on a remote canonical image source.
// @include          http://skyrates.net/*
// @include          http://*.skyrates.net/*
// @require          http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require          http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js
// @require          http://h2g2v2.nsb0.net/static/aqFloater.old.skycust.js
//
// ==/UserScript==

var customisation_icon = 'data:image/png;base64,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';
var up_icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEGSURBVDjLpZM/LwRRFMXPspmEaGc1shHRaiXsJ5GIRixbCr6SikxIlqgJM5UohIiGdofovHf/PZVmYwZvTntPfjnn3txWCAFNNFE33L/ZKXYv+1dRgL3r7bu0PbucJp3e4GLjtsrXGq9wkA8SU7tPk87i/MwCzAyP5QNeytcnJl46XMuoNoGKDoVlTkQhJpAgmJqcBjnqkqPTXxN8qz9cD6vdHtQMxXOBt49y5XjzLB/3tau6kWewKiwoRu8jZFvn+U++GgCBlWFBQY4qr1ANcAQxgQaFjwH4TwYrQ5skYBOYKbzjiASOwCrNd2BBwZ4jAcowGJgkAuAZ2dEJhAUqij//wn/1BesSumImTttSAAAAAElFTkSuQmCC';
var down_icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAENSURBVDjLpZM/SwNREMTnxBRpFYmctaKCfwrBSCrRLuL3iEW6+EEUG8XvIVjYWNgJdhFjIXamv3s7u/ssrtO7hFy2fcOPmd03SYwR88xi1cPgpRdjjDB1mBquju+TMt1CFcDd0V7q4GilAwpnd2A0qCvcHRSdHUBqAYgOyaUGIBQAc4fkNSJIIGgGj4ZQx4EEAY3waPUiSC5FhLoOQkbQCJvioPQfnN2ctpuNJugKNUWYsMR/gO71yYPk8tRaboGmoCvS1RQ7/c1sq7f+OBUQcjkPGb9+xmOoF6ckCQb9pmj3rz6pKtPB5e5rmq7tmxk+hqO34e1or0yXTGrj9sXGs1Ib73efh1WaZN46/wI8JLfHaN24FwAAAABJRU5ErkJggg==';
var add_icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJvSURBVDjLpZPrS5NhGIf9W7YvBYOkhlkoqCklWChv2WyKik7blnNris72bi6dus0DLZ0TDxW1odtopDs4D8MDZuLU0kXq61CijSIIasOvv94VTUfLiB74fXngup7nvrnvJABJ/5PfLnTTdcwOj4RsdYmo5glBWP6iOtzwvIKSWstI0Wgx80SBblpKtE9KQs/We7EaWoT/8wbWP61gMmCH0lMDvokT4j25TiQU/ITFkek9Ow6+7WH2gwsmahCPdwyw75uw9HEO2gUZSkfyI9zBPCJOoJ2SMmg46N61YO/rNoa39Xi41oFuXysMfh36/Fp0b7bAfWAH6RGi0HglWNCbzYgJaFjRv6zGuy+b9It96N3SQvNKiV9HvSaDfFEIxXItnPs23BzJQd6DDEVM0OKsoVwBG/1VMzpXVWhbkUM2K4oJBDYuGmbKIJ0qxsAbHfRLzbjcnUbFBIpx/qH3vQv9b3U03IQ/HfFkERTzfFj8w8jSpR7GBE123uFEYAzaDRIqX/2JAtJbDat/COkd7CNBva2cMvq0MGxp0PRSCPF8BXjWG3FgNHc9XPT71Ojy3sMFdfJRCeKxEsVtKwFHwALZfCUk3tIfNR8XiJwc1LmL4dg141JPKtj3WUdNFJqLGFVPC4OkR4BxajTWsChY64wmCnMxsWPCHcutKBxMVp5mxA1S+aMComToaqTRUQknLTH62kHOVEE+VQnjahscNCy0cMBWsSI0TCQcZc5ALkEYckL5A5noWSBhfm2AecMAjbcRWV0pUTh0HE64TNf0mczcnnQyu/MilaFJCae1nw2fbz1DnVOxyGTlKeZft/Ff8x1BRssfACjTwQAAAABJRU5ErkJggg==';
var del_icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJdSURBVDjLpZP7S1NhGMf9W7YfogSJboSEUVCY8zJ31trcps6zTI9bLGJpjp1hmkGNxVz4Q6ildtXKXzJNbJRaRmrXoeWx8tJOTWptnrNryre5YCYuI3rh+8vL+/m8PA/PkwIg5X+y5mJWrxfOUBXm91QZM6UluUmthntHqplxUml2lciF6wrmdHriI0Wx3xw2hAediLwZRWRkCPzdDswaSvGqkGCfq8VEUsEyPF1O8Qu3O7A09RbRvjuIttsRbT6HHzebsDjcB4/JgFFlNv9MnkmsEszodIIY7Oaut2OJcSF68Qx8dgv8tmqEL1gQaaARtp5A+N4NzB0lMXxon/uxbI8gIYjB9HytGYuusfiPIQcN71kjgnW6VeFOkgh3XcHLvAwMSDPohOADdYQJdF1FtLMZPmslvhZJk2ahkgRvq4HHUoWHRDqTEDDl2mDkfheiDgt8pw340/EocuClCuFvboQzb0cwIZgki4KhzlaE6w0InipbVzBfqoK/qRH94i0rgokSFeO11iBkp8EdV8cfJo0yD75aE2ZNRvSJ0lZKcBXLaUYmQrCzDT6tDN5SyRqYlWeDLZAg0H4JQ+Jt6M3atNLE10VSwQsN4Z6r0CBwqzXesHmV+BeoyAUri8EyMfi2FowXS5dhd7doo2DVII0V5BAjigP89GEVAtda8b2ehodU4rNaAW+dGfzlFkyo89GTlcrHYCLpKD+V7yeeHNzLjkp24Uu1Ed6G8/F8qjqGRzlbl2H2dzjpMg1KdwsHxOlmJ7GTeZC/nesXbeZ6c9OYnuxUc3fmBuFft/Ff8xMd0s65SXIb/gAAAABJRU5ErkJggg==';

var names = {};
var name_checkers = {};

if (!Array.prototype.map)
{
  Array.prototype.map = function(fun)
  {
    var len = this.length >>> 0;
    if (typeof fun != "function")
      throw new TypeError();

    var res = new Array(len);
    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in this)
        res[i] = fun.call(thisp, this[i], i, this);
    }

    return res;
  };
}

String.prototype.getHostname = function() {
  var re = new RegExp('^(?:f|ht)tp(?:s)?\://([^/]+)', 'im');
  return this.match(re)[1].toString();
}

String.prototype.strip = function() {
  return (this.replace(/^\W+/,'')).replace(/\W+$/,'');
}

var blacklist = GM_getValue('blacklist');
if (blacklist) { blacklist = JSON.parse(blacklist); } else { blacklist = {}; }
function save_blacklist() {
  GM_setValue('blacklist', JSON.stringify(blacklist));
}

function check_existence_of(uri, successfn, failurefn) {
  if (blacklist[uri]) {
	failurefn();
  } else {
    GM_xmlhttpRequest({ url: uri,
                        method: "GET",
                        onload: function(response) { if (response.status < 400) { successfn(); } else { failurefn(); } },
                        onerror: failurefn });
  }
}

function spreadsheet(key) {
  var avatars;
  return function(name,success,failure) {
    var check_avatars = function () {
      var link = avatars[name];
      if (link) {
        check_existence_of(link, function() { success(link); }, failure);
      } else {
        failure();
      }
    };
    if (!avatars) {
      GM_xmlhttpRequest({
        url: 'http://spreadsheets.google.com/feeds/list/' + key + '/1/public/values?alt=json',
        method: 'GET',
        onload: function(response) { response = JSON.parse(response.responseText);
                                     avatars = {};
                                     $.each(response.feed.entry, function(i, entry) {
                                       avatars[entry.gsx$name.$t] = entry.gsx$avatar.$t;
                                     });
                                     check_avatars();
                                   },
        onerror: function(response) { failure(); }});
    } else { check_avatars(); }
  };
}

name_checkers.spreadsheet = function(key) {
  return function(cont) {
    window.setTimeout(function () { // for some reason this is necessary...
      GM_xmlhttpRequest({
		url: 'http://spreadsheets.google.com/feeds/worksheets/' + key + '/public/basic?alt=json',
		method: 'GET',
		onload: function(response) {
		  response = JSON.parse(response.responseText);
		  cont(response.feed.title.$t);
		}
      });
    }, 0);
  };
};

function simple(url_base) {
  return function(name, success, failure) {
    var link = url_base + name;
    check_existence_of(link,
      function (response) { success(link); },
      function (req, stat, err) { failure(); });
  };
}
name_checkers.simple = function(addr) { return function(cont) { cont(addr.getHostname()); }; };

// list of functions of form (name to check, success (link), failure())
var servers_text = GM_getValue('server_list');
if (servers_text) {
  servers_text = JSON.parse(servers_text);
} else {
  servers_text = [ 'spreadsheet("txW-R89lun35ZOhZGM8N50g")', 'spreadsheet("tSOPONq3I1v4-Amk0INakgg")' ]; // default of Skyrates Style, then Alternate Style (tSotW)
}

var servers = servers_text.map(function(val, ind, thing) { return eval(val); });
function save_servers() {
  GM_setValue('server_list', JSON.stringify(servers_text));
  servers = servers_text.map(function(val, ind, thing) { return eval(val); });
}

var local = GM_getValue('override_local');
if (local) { local = JSON.parse(local); } else { local = {}; }
function save_local() {
  GM_setValue('override_local', JSON.stringify(local));
}

function get_method(str) {
  return str.split('(')[0];
}

function get_name(str, cont) {
  if (names[str]) { cont(names[str]); return; }
  var method = get_method(str);
  var actual_cont = function(name) { names[str] = name; cont(name); };
  if (name_checkers[method]) {
    eval('name_checkers.' + str)(actual_cont);
  } else {
    actual_cont(str);
  }
}

function set_avatar_link(img, link, where) {
  var alt = "Click to override this custom avatar";
  if (where) { alt = alt + " (recommended by " + where + ")"; }
  img.attr({ src: link, title: alt });
}

function add_override_link(img, name) {
  var original = img.attr("src");
  var colour = 'white'; //img.parent().parent().css("background-color"); nice, but doesn't work generally.

  var overrider = $('<div class="overrider"></div>');
  var set_and_save = function(new_local) {
    local[name] = new_local;
    save_local();
    find_and_set_avatar(img, name);
    overrider.hide();
  };

  var sas_blacklist = function(new_blacklist) {
	uri = img.attr("src");
	blacklist[uri] = new_blacklist;
	save_blacklist();
	set_avatar_link(img, original);
	find_and_set_avatar(img, name);
	overrider.hide();
  };

  var default_link = $('<a>Override to original skyrates art</a>');
  default_link.click(function () { set_and_save(original); });
  var custom_textbox = $('<input type="text"></input>');
  custom_textbox.css({ width: 100 });
  var custom_link = $('<a>Override to this custom URL</a>');
  custom_link.click(function () { set_and_save(custom_textbox.val()); });
  var clear_link = $('<a>Clear this override</a>');
  clear_link.click(function () { set_and_save(undefined); });
  var blacklist_link = $('<a>Add this image to blacklist</a>');
  blacklist_link.click(function () { sas_blacklist(true); });

  overrider
    .append(default_link).append("<br><br>")
    .append(custom_textbox).append("<br>")
    .append(custom_link).append("<br><br>")
    .append(clear_link).append("<br><br>")
    .append(blacklist_link);
  overrider.appendTo($("body"));
  overrider.css({ 'width': 150,
		  'display': "inline-block",
		  'background-color': colour,
		  'border': '2px inset black',
		  'position': "absolute" });
  overrider.hide();

  img.attr({ title: "Click to override this with a custom avatar" });
  img.click( function(e) {
    overrider.toggle();
    overrider.css({ left: e.pageX + 5, top: e.pageY + 5 });
  });
}

function check_asynchronously(img, name, which_server) {
  var fn = servers[which_server];
  if (fn) { fn(name,
	       function(link) { get_name(servers_text[which_server], function(name) { set_avatar_link(img, link, name); }); },
	       function() { check_asynchronously(img, name, which_server+1); }); }
}

function find_and_set_avatar(img, name) {
  var link = local[name];
  if (link) { set_avatar_link(img,link,"your local override"); return; }

  check_asynchronously(img, name, 0);
}

$("head").append(
  '<style type="text/css">' +
    '.sortable { list-style-type: none; margin: 0; padding: 0; }' +
    '.sortable li { padding: 0.4em; font-size: 0.8em; }' +
    'a { cursor: pointer; }' +
    'button { display:block;' +
    'padding: 0px;' +
    'float:left;' +
    'margin:0 7px 0 0;' +
    'background-color:#f5f5f5;' +
    'border:1px solid #dedede;' +
    'border-top:1px solid #eee;' +
    'border-left:1px solid #eee;' +
    'font-family:"Lucida Grande", Tahoma, Arial, Verdana, sans-serif;' +
    'font-size:100%;' +
    'line-height:130%;' +
    'text-decoration:none;' +
    'font-weight:bold;' +
    'color:#565656;' +
    'cursor:pointer;' +
    'width:24px;' +
    'overflow:visible;' +
    'button img {' +
    'margin:0 3px -3px 0 !important;' +
    'padding:0;' +
    'border:none;' +
    'width:16px;' +
    'height:16px; }' +
  '</style>'
);

function update_with_text(op, itext) {
  op.attr({ value: itext });
  op.text(itext);
  get_name(itext, function(name) { op.text(name); });
}

function add_to_list(list, itext, selected) {
  var op = $('<option></option>');
  update_with_text(op, itext);
  list.append(op);
  if (selected) { op.attr('selected', 'selected'); }
}

function attach_customisation_window() {
  var server_div = $('<div id="server_editor"></div>');

  var outer_div = $('<div></div>');
  outer_div.css({ height: '100%', width: '60%', float: 'left'});
  var list_div = $('<div></div>');
  list_div.css({ height: '100%', width: '85%', float: 'left' });
  var list = $('<select size=12></select>');
  list.css({ height: '100%', width: '95%' });
  for (i in servers_text) { add_to_list(list,servers_text[i], false); }
  var button_div = $('<div></div>');
  button_div.css({ width: '10%', height: '100%', float: 'left' });
  var up_but = $('<button type="button"><img src="' + up_icon + '" /></button>');
  var down_but = $('<button type="button"><img src="' + down_icon + '" /></button>');
  var add_but = $('<button type="button"><img src="' + add_icon + '" /></button>');
  var del_but = $('<button type="button"><img src="' + del_icon + '" /></button>');

  list_div.append(list);

  button_div
    .append(up_but)
    .append(down_but)
    .append(add_but)
    .append(del_but);

  outer_div
    .append(list_div)
    .append(button_div);

  var add_div = $('<div></div>');
  add_div.css({ height: '90%', width: '40%', float: 'left'});
  var simple_label = $('<label>Simple:</label>');
  var sheet_label = $('<label>Spreadsheet key:</label>');
  var custom_label = $('<label>Custom:</label>');
  var simple_box = $('<input type="text">');
  var sheet_box = $('<input type="text">');
  var custom_area = $('<textarea rows="5"></textarea>');
  simple_label.append(simple_box);
  sheet_label.append(sheet_box);
  custom_label.append(custom_area);
  add_div
    .append(simple_label).append("<br>")
    .append(sheet_label).append("<br><br>")
    .append(custom_label);

  var wrap_with = function(out, arg) { return out + '("' + arg + '")'; }
  var current_selection = function() {
	s = $("option:selected", list);
	if (s.length == 0) { add_to_list(list, "new value", true); s = $("option:selected", list); }
	return $(s[0]);
  }

  simple_box.change(function(e) { update_with_text(current_selection(), wrap_with("simple", $(this).val())); list.trigger('change'); list.effect("highlight", {}, 1000); });
  sheet_box.change(function(e) { update_with_text(current_selection(), wrap_with("spreadsheet", $(this).val())); list.trigger('change'); list.effect("highlight", {}, 1000); });
  custom_area.change(function(e) { update_with_text(current_selection(), $(this).val()); list.effect("highlight", {}, 1000); });

  list.change(function(e) { simple_box.val(''); sheet_box.val(''); custom_area.val($(this).attr('value')); custom_area.effect("highlight", {}, 1000); });

  up_but.click(function() {
    var curr = current_selection();
    if (curr.prev().length > 0) {
      var tmp = curr.clone().insertBefore(curr.prev());
      curr.remove();
      tmp.attr('selected', 'selected');
    }
  });
  down_but.click(function() {
    var curr = current_selection();
    if (curr.next().length > 0) {
      var tmp = curr.clone().insertAfter(curr.next());
      curr.remove();
      tmp.attr('selected', 'selected');
    }
  });
  add_but.click(function() { add_to_list(list, "new value", true); });
  del_but.click(function() { current_selection().remove(); });

  var button_div = $('<div></div>');
  button_div.css({ height: '8%', width: '100%' });
  var button = $('<button type="button">Save</button>');
  button.css({ width: 'auto' });
  button.click(function() {
    servers_text = [];
    list.children().each(function (i, op) { servers_text[i] = $(op).attr('value'); });
    save_servers();
    server_div.hide();
  });
  button_div.append(button);

  server_div.append(outer_div).append(add_div).append(button_div);
  server_div.css({ 'background-color': 'white', 'border': '1px solid black', 'position': 'absolute', width: '34%', padding: '1em' });
  server_div.appendTo($("body"));
  server_div.hide();

  var img_div = $('<div></div>');
  var custom_clicker = $('<img width="32px" height="32px" src="' + customisation_icon + '" />');
  custom_clicker.click(
    function(e) {
      server_div.css({ left: e.pageX + 5, top: e.pageY + 5 });
      server_div.toggle();
    });
  img_div.append(custom_clicker);
  img_div.css({ 'position': 'absolute', 'left': 0, 'top': 0 });
  img_div.appendTo($("body"));
  img_div.aqFloater({ attach: 'nw', duration: 1000 });
}

var attach = false;
var images = [];

var cap = $('#cap');
if (cap.find('#avClip').length > 0) {
  var avClip = cap.find('#avClip');
  avClip.attr_old = avClip.attr;
  avClip.attr = function(thing) {
    if (thing.src) {
      $(this).css('background-image', 'url(' + thing.src + ')'); thing.src = undefined;
    } else if (thing == "src") {
      return $(this).css('background-image').slice(4,-1);
    }
    return this.attr_old(thing);
  } // this is such a beautiful ugly hack. I am proud and ashamed simultaneously.
  images.push({ name: cap.find('p.name').text().strip(), img: avClip });
};

$('tbody:has(td.profile)').each(function () {
  var sthis = $(this);
  images.push({ name: sthis.find('.postauthor').text().strip(), img: $(sthis.find('img')[1]) });
});

$('td.character').each(function () {
  var sthis = $(this);
  images.push({ name: sthis.find('td.name').text().strip(), img: sthis.find('img') });
});

for (i in images) {
  var av = images[i];
  if (!attach) {
    attach = true;
    attach_customisation_window();
  }
  add_override_link(av.img, av.name);
  find_and_set_avatar(av.img, av.name);
};
