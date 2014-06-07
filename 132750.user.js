// ==UserScript==
// @name           DSS Highlighter
// @namespace      tag:dssrzs.org,2009-10-28:S2TH
// @description    Highlights Urban Dead characters listed in the Rogues Gallery and Zerg Liste
// @include        http://urbandead.com/map.cgi*
// @include        http://www.urbandead.com/map.cgi*
// @include        http://urbandead.com/contacts.cgi*
// @include        http://www.urbandead.com/contacts.cgi*
// @include        http://elaine/death/*
// @exclude        http://urbandead.com/map.cgi?logout
// @exclude        http://www.urbandead.com/map.cgi?logout
// ==/UserScript==

/**
 * The DSS S2 Target Highlighter
 *
 * Documentation pending.
 *
 * The author of this code wishes to remain somewhat anonymous, but
 * you can contact her as val@dssrzs.org, or as user Hashk in the
 * Urban Dead Wiki.
 *
 * LEGAL NOTICE: I, the anonymous author, but still very much the
 * copyright holder of this work, hereby release it into the public
 * domain. This applies worldwide. In case this is not legally
 * possible, I grant anyone the right to use this work for any
 * purpose, without any conditions, unless such conditions are
 * required by law.
 *
 * In plain English: do what you please with this code. May you have
 * fun with it, and live a long and happy life.
 **/

function DSSHighlighter(doc) {
  this.version = 'BETA1';
  this.doc = doc;
  this.ui_visible = false;

  this.loadPL();
  this.buildAnchorList();

  this.makeSettingsButton();
  this.injectSettingsButton();

  this.colourise();
};

DSSHighlighter.prototype.colourise = function() {
  for(var i = 0, end = this.anchor_list.length; i < end; i++) {
    var o = this.anchor_list[i];
    var info = this.pl_names[o.name];
    if(info) {
      o.element.style.color = this.pl_groups[info.group];
      o.element.title = info.text;
    }
  }
};

DSSHighlighter.prototype.PROFILE_URL_RX = /profile\.cgi\?id=\d+$/;
DSSHighlighter.prototype.buildAnchorList = function() {
  this.anchor_list = new Array();
  var as = document.getElementsByTagName('a');
  var i, a, end = as.length;
  for(i = 0; i < end; i++) {
    a = as[i];
    if(this.PROFILE_URL_RX.test(a.getAttribute('href'))) {
      var o = new Object();
      o.name = a.textContent.replace(/&nbsp;/g, ' ').replace(/\s\s*/g, ' ');
      if(o.name == 'a zombie' || o.name == 'A zombie')
        continue;
      o.udcolour = a.getAttribute('class') ? true : false;
      o.selfchar = (a.parentNode.parentNode.getAttribute('class') == 'cp');
      o.element = a;
      this.anchor_list.push(o);
    }
  }
};

DSSHighlighter.prototype.loadPL = function() {
  var s = GM_getValue('pl-names');
  if(s)
    this.pl_names = eval(s);
  else
    this.pl_names = new Object();
  s = GM_getValue('pl-groups');
  if(s)
    this.pl_groups = eval(s);
  else
    this.pl_groups = new Object();
};

DSSHighlighter.prototype.showUI = function() {
  if(!this.ui) {
    var self = this;
    this.ui = new UI(this.doc, 'DSS Highlighter BETA1');
    this.ui.close_button_callback = function () {
      self.ui.element.parentNode.removeChild(self.ui.element);
      self.ui.close_button.disabled = false;
      self.settings_button_anchor.style.borderStyle = 'outset';
      self.ui_visible = false;
      self.loadPL();
      self.colourise();
    };
  }

  if(!this.ui_visible) {
    this.ui_visible = true;
    this.settings_button_anchor.style.borderStyle = 'inset';
    this.doc.body.appendChild(this.ui.element);
  }
};

DSSHighlighter.prototype.makeSettingsButton = function() {
  var self = this;
  var p, a;

  p = this.doc.createElement('p');

  a = this.doc.createElement('a');
  a.setAttribute('class', 'y');
  a.href="";
  a.appendChild(this.doc.createTextNode('Highlighter settings'));
  a.addEventListener(
    'click',
    function(event) {
      event.stopPropagation();
      event.preventDefault();
      self.showUI();
    },
    true);

  p.appendChild(a);
  this.settings_button = p;
  this.settings_button_anchor = a;
};

// Find a suitable place in the page to inject the highlighter settings button. Our choices are:
// 1. If we find the 'cp' td, then at the end of it.
// 2. At the very end of the body.
DSSHighlighter.prototype.injectSettingsButton = function() {
  var s = this.doc.evaluate("//td[@class='cp']",
                            this.doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if(s && s.snapshotLength > 0) {
    var e = s.snapshotItem(0);
    e.appendChild(this.settings_button, e.nextSibling);
    return;
  }

  s = this.doc.evaluate("//body",
                        this.doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if(s && s.snapshotLength > 0) {
    var e = s.snapshotItem(0);
    e.appendChild(this.settings_button, e.nextSibling);
    return;
  }

  alert('Can not insert the highlighter settings button. Something is very wrong here, you probably should disable this script.');
};

// Main UI

function UI(doc, title) {

  // I. Create all elements

  var p, label;

  // UI root: the div enclosing everything
  this.element = doc.createElement('div');
  this.element.style.position = 'absolute';
  this.element.style.width = 'auto';
  this.element.style.top = '1.5em';
  this.element.style.right = '1.5em';
  this.element.style.paddingLeft = '1em';
  this.element.style.paddingRight = '1em';
  this.element.style.border = 'outset 4px #454';
  this.element.style.backgroundColor = '#565';

  //this.element.setAttribute('class', 'sms');

  // The Title. A p containing the app name and version
  p = doc.createElement('p');
  this.titletext = doc.createTextNode(title);
  p.appendChild(this.titletext);
  this.element.appendChild(p);

  // A form. Just to put fieldsets in it.
  var form = doc.createElement('form');

  // controls
  var fs = doc.createElement('fieldset');
  var legend = doc.createElement('legend');
  legend.appendChild(doc.createTextNode('Settings'));
  fs.appendChild(legend);
  var table = doc.createElement('table');
  var tr, td;

  this.addCheckboxTR(doc, table, 'rgzlcb', 'Highlight characters listed in the Rogues Gallery');
  this.addColourFieldTR(doc, table, 'rgwcf', 'Rogues Gallery', 'Wanted');
  this.addColourFieldTR(doc, table, 'rgppkcf', 'Rogues Gallery', 'Past PKers');
  //this.addCheckboxTR(doc, table, 'rgicb', "Highlight characters listed in the Rogues Gallery's Ignore List");
  this.addColourFieldTR(doc, table, 'rgicf', 'Rogues Gallery', 'Ignore List');
  //this.addCheckboxTR(doc, table, 'zlcb', "Highlight characters listed in the Zerg Liste");
  this.addColourFieldTR(doc, table, 'zlzcf', 'Zerg Liste', 'Zergs');

  this.addCheckboxTR(doc, table, 'aucb', 'Enable automatic updates');

  tr = doc.createElement('tr');
  td = doc.createElement('td');
  tr.appendChild(td);
  td = doc.createElement('td');
  td.appendChild(doc.createTextNode('Last update: 12 hours ago, added 450 names. Update now.'));
  tr.appendChild(td);
  table.appendChild(tr);

  this.addCheckboxTR(doc, table, 'occb', 'Override colours set in your Urban Dead contacts');

  fs.appendChild(table);
  form.appendChild(fs);

  fs = doc.createElement('fieldset');
  legend = doc.createElement('legend');
  legend.appendChild(doc.createTextNode('Personal list'));
  fs.appendChild(legend);
  table = doc.createElement('table');

  tr = doc.createElement('tr');
  td = doc.createElement('td');
  this.usepl_cb = doc.createElement('input');
  this.usepl_cb.type = 'checkbox';
  this.usepl_cb.id = 's2th-usepl';
  td.appendChild(this.usepl_cb);
  tr.appendChild(td);
  td = doc.createElement('td');
  label = doc.createElement('label');
  label.setAttribute('for', 's2th-usepl');
  label.appendChild(doc.createTextNode('Highlight characters in your personal list'));
  td.appendChild(label);
  tr.appendChild(td);
  table.appendChild(tr);

  tr = doc.createElement('tr');
  td = doc.createElement('td');
  tr.appendChild(td);
  td = doc.createElement('td');
  this.pl_ta = doc.createElement('textarea');
  this.pl_ta.cols = '90';
  this.pl_ta.rows = '20';
  this.pl_ta.id = 's2th-plta';
  td.appendChild(this.pl_ta);
  tr.appendChild(td);
  table.appendChild(tr);

  tr = doc.createElement('tr');
  td = doc.createElement('td');
  tr.appendChild(td);
  td = doc.createElement('td');
  td.style.fontSize = 'small';
  this.pl_msg = doc.createTextNode("Your current personal list is shown above.");
  td.appendChild(this.pl_msg);
  tr.appendChild(td);
  table.appendChild(tr);

  fs.appendChild(table);
  form.appendChild(fs);

  p = doc.createElement('p');
  p.style.textAlign = 'right';
  this.close_button = makeButton(doc, 'Close', 'y');
  p.appendChild(this.close_button);
  form.appendChild(p);

  this.element.appendChild(form);

  //this.setRGZLHighlightEnabled(false);

  this.setupRGZLHighlightCheckbox();
  this.setupColourField('rg-wanted-colour', '#AE0C00', this.rgwcf, this.rgwcfsample);
  this.setupColourField('rg-ppk-colour',  '#D73B3E', this.rgppkcf, this.rgppkcfsample);
  this.setupColourField('rg-zlzergs-colour', '#B2EC5D', this.zlzcf, this.zlzcfsample);
  this.setupAutoUpdateCheckbox();
  this.setupOverrideContactsCheckbox();
  this.setupPLPrefs();

  var self = this;
  this.close_button.addEventListener(
    'click',
    function(event) {
      self.close_button.disabled = true;
      self.close_after_parse = true;
      if(!self.pl_parse_scheduled) {
        self.pl_parse_scheduled = true;
        self.parsePL();
      }
    },
    true
  );
}

UI.prototype.addColourFieldTR = function(doc, table, id, source, name) {
  var tr = doc.createElement('tr');
  var td = doc.createElement('td');
  tr.appendChild(td);
  td = doc.createElement('td');
  var e = doc.createElement('input');
  e.type = 'text';
  e.size = '6';
  e.id = 'id';
  td.appendChild(e);
  var label = doc.createElement('label');
  label.setAttribute('for', id);
  label.appendChild(doc.createTextNode(' ' + source + ' '));
  var sample = doc.createElement('span');
  sample.appendChild(doc.createTextNode(name));
  label.appendChild(sample);
  label.appendChild(doc.createTextNode(' colour'));
  td.appendChild(label);
  tr.appendChild(td);
  table.appendChild(tr);

  this[id] = e;
  this[id + 'sample'] = sample;
};

UI.prototype.addCheckboxTR = function(doc, table, id, text) {
  var tr = doc.createElement('tr');
  var td = doc.createElement('td');
  var e = doc.createElement('input');
  e.type = 'checkbox';
  e.id = id;
  td.appendChild(e);
  tr.appendChild(td);
  td = doc.createElement('td');
  var label = doc.createElement('label');
  label.setAttribute('for', id);
  label.appendChild(doc.createTextNode(text));
  td.appendChild(label);
  tr.appendChild(td);
  table.appendChild(tr);
  this[id] = e;
};

UI.prototype.setupRGZLHighlightCheckbox = function() {
  var self = this;
  var val = GM_getValue('use-rgzl', true);
  this.rgzlcb.checked = val;
  this.setRGZLHighlightEnabled(val);
  this.rgzlcb.addEventListener(
    'click',
    function(event) {
      var ck = self.rgzlcb.checked;
      self.setRGZLHighlightEnabled(ck);
      GM_setValue('use-rgzl', ck);
    },
    false);
};

UI.prototype.setRGZLHighlightEnabled = function(enabled) {
  var v = enabled ? false : true;
  this.rgwcf.disabled = v;
  this.rgppkcf.disabled = v;
  this.zlzcf.disabled = v;
  this.aucb.disabled = v;
};

UI.prototype.setupColourField = function(cfgkey, default_value, field, sample) {
  var self = this;
  var val = GM_getValue(cfgkey, default_value);
  field.value = val;
  sample.style.color = val;

  field.validate = function() {
    var c = field.value;
    if(c.search(/^\s*#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})\s*$/) == 0) {
      sample.style.color = c;
      return field.value;
    }

    return false;
  };

  field.save = function() {
    var c = field.validate();
    if(c) {
      var sc = trim(c).toUpperCase();
      field.value = sc;
      GM_setValue(cfgkey, sc);
    }
    else {
      alert('Invalid colour ' + field.value + ', use #rgb or #rrggbb.');
      setTimeout(function() { field.focus(); }, 250);
    }

    return c;
  };

  field.addEventListener(
    'keyup',
    function(event) { field.validate(); },
    false);
  field.addEventListener(
    'blur',
    function(event) { field.save(); },
    false);

    return false;
};

UI.prototype.sanitiseColour = function(colour) {
  if(colour.search(/^\s*#([0-9A-F]{3}|[0-9A-F]{6})\s*$/) == 0)
    return trim(colour).toUpperCase();
  return null;
};

UI.prototype.setupAutoUpdateCheckbox = function() {
  var self = this;
  this.aucb.checked = GM_getValue('autoupdate', true);
  this.aucb.addEventListener(
    'click',
    function(event) { GM_setValue('autoupdate', self.aucb.checked); },
    false);
};

UI.prototype.setupOverrideContactsCheckbox = function() {
  var self = this;
  this.occb.checked = GM_getValue('override-contacts', false);
  this.occb.addEventListener(
    'click',
    function(event) { GM_setValue('override-contacts', self.occb.checked); },
    false);
};

UI.prototype.DEFAULT_PL =
  "// This is your personal list. Its format is similar to that of legacy UDtool lists:\n//\n" +
  "// * Groups are given in lines of the form:\n//\n" +
  "//     #rrggbb, Group Name\n//\n" +
  "//   where #rrggbb is a colour in hexadecimal RGB notation\n" +
  "//   (e.g. #FF6E4A for Outrageous Orange).\n//\n" +
  "// * Names are given in lines of the form:\n//\n" +
  "//     Character Name, Group Name, Comment\n//\n" +
  "// * Empty lines, and lines starting with a semicolon or two forward slashes,\n" +
  "//   are ignored.\n//\n";

UI.prototype.setupPLPrefs = function() {
  var self = this;
  var ta = this.pl_ta;
  var pl = GM_getValue('personal-list');
  if(!pl)
    pl = this.DEFAULT_PL;
  var ck = GM_getValue('enable-personal', false);
  this.usepl_cb.checked = ck;
  ta.disabled = !ck;
  ta.value = pl;
  this.pldb = new NameDatabase();

  this.pl_version = 1;
  this.pl_parsedversion = 0;

  this.pl_parse_scheduled = true;
  setTimeout(function() { self.parsePL(); }, 500);

  this.usepl_cb.addEventListener(
    'click',
    function(event) { self.handlePLEnableCheckbox(); },
    false);
  ta.addEventListener(
    'keyup',
    function(event) {
      self.pl_version++;
      if(!self.pl_parse_scheduled) {
        self.pl_parse_scheduled = true;
        setTimeout(function() { self.parsePL(); }, 500);
      }
    },
    false
  );
};

UI.prototype.parsePL = function() {
  if(this.pl_version != this.pl_parsedversion) {
    // we must restart the parser
    this.pldb.setData(this.pl_ta.value);
    this.pl_parsedversion = this.pl_version;
  }

  if(this.pldb.state != 2)
    this.pldb.parse(100);

  if(this.pldb.state == 2) {
    // parsing finished.
    GM_setValue('personal-list', this.pl_ta.value);
    GM_setValue('pl-names', uneval(this.pldb.names));
    GM_setValue('pl-groups', uneval(this.pldb.groups));

    // what to do now depends on:
    if(this.close_after_parse) {
      this.close_after_parse = false;
      if(this.close_button_callback)
        this.close_button_callback();
    }
    else {
      //GM_log('parsed version ' + this.pl_parsedversion + ' ' + uneval(this.pldb.error));
      //GM_log(uneval(this.pldb.names['julie marsh']));
      // just update the message
      var message;
      if(this.pldb.error)
        message = this.pldb.error;
      else {
        message = 'OK parsed ' + this.pldb.offset + ' lines; ' + this.pldb.nnames + ' ';
        if(this.pldb.nnames == 1)
          message += 'name';
        else
          message += 'names';
        message += ' defined in ' + this.pldb.ngroups + ' ';
        if(this.pldb.ngroups == 1)
          message += 'group';
        else
          message += 'groups';
      }
      this.pl_msg.data = message;
    }

    this.pl_parse_scheduled = false;
  }
  else {
    // we need to parse another chunk
    var self = this;
    setTimeout(function() { self.parsePL(); }, 1);
  }
};

UI.prototype.handlePLEnableCheckbox = function() {
  var ck = this.usepl_cb.checked;
  GM_setValue('enable-personal', ck);
  this.pl_ta.disabled = !ck;
};

function NameDatabase() {
 this.groups = new Object();
 this.ngroups = 0;
 this.names = new Object();
 this.nnames = 0;
 this.data = new Array();
 this.state = 0; // 0: brand new, 1: parsing, 2: ready
 this.error = null;
}

NameDatabase.prototype.setData = function(data) {
 this.data = data.split("\n");
 this.state = 1; // parsing
 this.parsed_groups = new Object(); // dictionary, key=group name, value=colour
 this.parsed_names = new Object(); // dictionary, key=group, value=name object
 this.offset = 0;
 this.error = null;
};

// This is the regular expression we use to parse lines. It's a wee bit complex:
//
// This parses a group definition:
// (#(?:[A-Za-z0-9]{3}|[A-Za-z0-9]{6}))\s*,\s*([^ \f\n\r\t\v\u00A0\u2028\u2029,][^,]*?)
// This parses a name definition:
// ([A-Za-z0-9\' ]+?)\s*,\s*([^ \f\n\r\t\v\u00A0\u2028\u2029,][^,]*?)(?:\s*,\s*(.*?))?
// This parses a comment:
// (?:\/\/|;).*?
//
// The regex below is a combination of all 3 above, which also matches empty lines

NameDatabase.prototype.LINE_RX = /^\s*(?:(#(?:[A-Za-z0-9]{3}|[A-Za-z0-9]{6}))\s*,\s*([^ \f\n\r\t\v\u00A0\u2028\u2029,][^,]*?)|([A-Za-z0-9\' ]+?)\s*,\s*([^ \f\n\r\t\v\u00A0\u2028\u2029,][^,]*?)(?:\s*,\s*(.*?))?|(?:\/\/|;).*?|)\s*$/;

// call setData(), then parse repeatedly until it returns something different than 1.
// 0 means the data was successfully parsed; names and groups are available in the member variables.
// -1 means there was an error parsing; previously parsed names and groups were not changed.
// In both latter cases, the member 'error' may be set. when a parse is successful, this is to be
// deemed as a warning.

NameDatabase.prototype.setError = function(error) {
  if(!this.error)
    this.error = error;
};

NameDatabase.prototype.parse = function(limit) {
  if(this.state != 1) {
    this.error = 'invalid state';
    return -1;
  }

  var end = this.offset + limit;
  if(end > this.data.length)
    end = this.data.length;

  var a, b, c, o, p, cl, g, i;

  for(; this.offset < end; this.offset++) {
    a = this.LINE_RX.exec(this.data[this.offset]);

    if(a) {
      if(a[1]) {
        // group definition
        this.parsed_groups[a[2]] = a[1].toUpperCase();
      }
      else if(a[3]) {
        // name definition
        o = this.makeName(a[3], a[4], a[5]);
        b = this.parsed_names[o.group];
        if(!b)
          b = this.parsed_names[o.group] = new Array();
        b.push(o);
      }
      // else it's a comment or empty line
    }
    else {
      // Syntax error
      if(!this.error)
        this.error = 'Syntax error in line ' + this.offset + ': ' + this.data[this.offset];
    }
  } // for

  if(this.offset != this.data.length)
    return 1;

  // if we're here, we're done parsing. now check that all groups used were defined
  for(g in this.parsed_names) {
    if(!this.parsed_groups[g]) {
      if(this.parsed_names[g].length == 1)
        this.setError("Warning: 1 name listed in group '" + g + "', which was not defined; this name won't be highlighted.");
      else
        this.setError('Warning: ' + this.parsed_names[g].length + " names listed in group '" + g +
                      "', which was not defined; these won't be highlighted.");
      // we only report the first error
      break;
    }
  }

  // add all names from defined groups to the final dictionary
  // note a given name may appear several times.
  var ng = 0, nn = 0;
  this.groups = this.parsed_groups;
  this.names = new Object();
  for(g in this.parsed_groups) {
    cl = this.parsed_groups[g];
    a = this.parsed_names[g];
    if(a) {
      ng++;
      for(i = 0; i < a.length; i++) {
        o = a[i]; // XXX <-- here
        p = this.names[o.name];
        if(p)
          this.mergeNames(p, o);
        else {
          this.names[o.name] = o;
          nn++;
        }
      }
    }
  }

  this.ngroups = ng;
  this.nnames = nn;
  this.parsed_groups = null;
  this.parsed_names = null;
  this.data = null;

  this.state = 2; // ready

  //GM_log(uneval(this));

  return 0;
};

NameDatabase.prototype.makeName = function(name, group, text) {
  var o = { name: name, group: group };
  if(text) {
    if(text.search(group) >= 0)
      o.text = text;
    else
      o.text = group + ': ' + text;
  }
  else
    o.text = group;
  return o;
};

NameDatabase.prototype.mergeNames = function(name, other) {
  var a = [ name.text, other.text ];
  name.text = a.join('; ');
};

function makeButton(doc, label, element_class) {
  var input = doc.createElement('input');

  if(element_class)
    input.setAttribute('class', element_class);
  input.setAttribute('type', 'button');
  if(label)
    input.setAttribute('value', label);

  return input;
};

// XXX remove this junk
/*

var UPDATE_INTERVAL = 43200;
var UPDATE_INTERVAL_AFTER_ERROR = 300;
var SERVICE_POINT = 'http://dssrzs.org/udtool.txt';

function parse_group(groups, group_array, s) {
  var a = s.split(',', 2);
  if(a.length < 2)
    return;

  var e = new Object();
  e.name = trim(a[1]);
  e.colour = trim(a[0]);
  e.index = group_array.length;
  groups[e.name] = e.index;
  group_array.push(e);
}

function parse_entry(groups, group_array, s, db) {
  var a = s.split(',');
  if(a.length < 2)
    return;
  var name = trim(a.shift());
  var group = trim(a.shift());
  var text = a.join(',');
  var g = groups[group];
  var c;
  if(g == undefined)
    c = '';
  else
    c = group_array[g].colour;

  var etext;
  if(text.length > 0)
    etext = c + ',' + group + ' - ' + text;
  else
    etext = c + ',' + group;

  db[name] = etext;
}

function parse_udtool(data) {
  var groups = new Object();
  var group_array = new Array();
  var db = new Object();

  var s;
  data = data.split("\n");
  for(var i = 0; i < data.length; i++) {
    s = trim(data[i]);
    if(s.length > 0) {
      if(s.charAt(0) == '#')
        parse_group(groups, group_array, s);
      else
        parse_entry(groups, group_array, s, db);
    }
  }

  return db;
}

function load_handler(response) {
  if(response.readyState != 4)
    return;

  if(response.status != 200) {
    if(!GM_getValue('__ERROR_NOTIFIED__')) {
      GM_setValue('__ERROR_NOTIFIED__', true);
      alert('DSS S2 Target Highlighter error: ' +
            response.status + ' ' + response.statusText);
    }
    return;
  }

  //GM_log('RECV:'+response.responseText);

  for each (var val in GM_listValues()) {
    GM_deleteValue(val);
  }

  var now = Math.floor(new Date().getTime() / 1000);
  GM_setValue('__NEXT_UPDATE__', now + UPDATE_INTERVAL);
  var db = parse_udtool(response.responseText);
  GM_setValue('__DB__', uneval(db));
}

function update(now) {
  GM_xmlhttpRequest(
    {
      method: 'GET',
      url: SERVICE_POINT,
      onload: load_handler
    }
  );
}

function highlight_anchor(node, colour, text) {
  if(colour) {
    if(!(node.getAttribute('class') ||
         node.parentNode.parentNode.getAttribute('class') == 'cp'))
      node.style.color = colour;
  }

  if(text)
    node.title = text;
}

function check_anchor(db, node) {
  var etext = db[name];

  if(etext) {
    var colour, text, a;
    a = etext.split(',');
    if(a.length > 0) {
      if(a[0].length > 0)
        colour = a.shift();
      var t = a.join(',');
      if(t.length > 0)
        text = t;
    }

    if(colour || text)
      highlight_anchor(node, colour, text);
  }
}

function highlight_targets() {

  // I. Update the local DB if needed

  var next_update = parseInt(GM_getValue('__NEXT_UPDATE__'));
  if(isNaN(next_update))
    next_update = 0;
  var now = Math.floor(new Date().getTime() / 1000);

  if(now >= next_update) {
    // this may be reset by an actual update
    GM_setValue('__NEXT_UPDATE__', now + UPDATE_INTERVAL_AFTER_ERROR);
    update(now);
  }

  // II. Highlight

  var db = eval(GM_getValue('__DB__'));
  if(!db)
    return;
  var pattern = /profile\.cgi\?id=\d+$/;
  var as = document.getElementsByTagName('a');
  var i, a, end = as.length;
  for(i = 0; i < end; i++) {
    a = as[i];
    if(pattern.test(a.getAttribute('href')))
      check_anchor(db, a);
  }
}
  */

new DSSHighlighter(document);
