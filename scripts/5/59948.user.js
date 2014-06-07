// ==UserScript==
// @name           Google Groups Posting Utilities
// @version        2009-11-13 00.19
// @namespace      http://fscode.altervista.org
// @description    Strips date and signature from quotes, inserts snippets and signatures
// @include        http://groups.google.com/group/*/thread*
// @include        http://groups.google.com/group/*/post*
// @include        http://groups.google.tld/group/*/thread*
// @include        http://groups.google.tld/group/*/post*
// ==/UserScript==

var GGP_name = "Google Groups Posting Utilities";
var GGP_version = '2009-11-13 00.19';
var GGP_userscripts = 'http://userscripts.org/scripts/show/59948';

/*
  Google Groups Posting Utilities, v. 2009-11-13 00.19
  Copyright 2009 by Francesco S. Carta
  e-mail: entuland at gmail.com
  Website: http://fscode.altervista.org

  This script is inspired by:
  Gmail Bottom Posting v3, http://userscripts.org/scripts/show/35866
  ggNoSpam v. 0.4.0, http://userscripts.org/scripts/show/59377

  Disclaimer: by running this script you take all responsibilities
  about the effects of the script, no warranty given nor implied.

  Permission is granted to copy, modify and distribute this script
  as long as it is shipped with this entirely unchanged comment.
*/

/*

  FEATURES:
    a) = always (no toggle)
    t) = toggle in the panel (gets saved and recalled between runs)
    f) = flag in the script settings (hardcoded, modify and save the file)

  Quoted text:
     a) strip signature from quote
  t, f) strip date from quote

  Signatures & snippets management:
  t, f) show/hide rearrange/delete buttons
     a) create, rearrange and delete sigs and snippets at runtime
     a) import and export sigs and snippets

  Signatures:
  t, f) add first signature by default when starting a new post/reply
     a) place caret between text and signature when adding signature
  t, f) toggle signatures' bar visibility
     a) preview signatures when hovering the links
     f) signature replacement warning

  Snippets:
     a) replace selected text when inserting snippet
  t, f) toggle snippets' bar visibility
     a) preview snippets when hovering the links

  Toggles' panel:
     f) completely hide panel (won't show up at all)
     f) show panel also when not posting
     f) compact/expanded panel switch
     f) shows toggles only on hover

  Misc:
     a) multiple posting forms warning
     a) narrow down the advisory bar on the right

  Adding snippets and sigs works also when posting new topics
  (the links appear as soon as you enter the message's body)

  Currently tested on:
  - Firefox 3.5.3

  Currently NOT tested on Opera - it could work if the missing
  GM_setValue() and GM_getValue() functions get defined somehow.
  
  (I've heard of a script that defines them and saves the
  data into cookies, try installing that.
  I will include such a fallback method in some future release)
  
  ---
  
  Thank you for your interest about this script,
  hope you'll find it useful.
  
  I look forward for your comments, advices
  and, eventually, for your feature requests too.
  
  Best of luck,
  Francesco
  e-mail: entuland at gmail.com
  Website: http://fscode.altervista.org

*/

/* ============================================================================
  Settings
============================================================================ */

// set the following flags to true/false as you wish
// (do not touch the names or the commas)

var flags = {

// these flags are used only during the first installation
// from there on they get switched, saved and recalled
// using the panel toggles
      add_first_sig: true  // add first sig by default when posting or replying
,        strip_date: true  // strip date from quoted text
,        show_snips: true  // show snippets' bar
,         show_sigs: true  // show signatures' bar
,            manage: true  // show manage buttons beneath sigs and snips

// these flags are hard-coded, modify them here and save the file 
,     show_reminder: true  // show reminder below posting area
,        show_panel: true  // show toggles' panel
, always_show_panel: false  // show panel also when not posting
,     compact_panel: false  // use compact version of the panel
,  collapse_toggles: false  // collapse toggles when panel is not hovered
};

// labels under the textarea
var snippets_label   = ''; //"Insert snippet: ';
var signatures_label = ''; //'Add signature: ';

// toggles' labels
var panel_header_label  = 'GGP Utils';
var default_sig_label   = 'Auto sig';
var show_sigs_label     = 'Sigs bar';
var show_snips_label    = 'Snips bar';
var strip_date_label    = 'Strip date';
var manage_label        = 'Manage';

// compact toggles' labels
var compact_panel_header_label = 'GGP';
var compact_default_sig_label  = 'A';
var compact_show_sigs_label    = 'S';
var compact_show_snips_label   = 'X';
var compact_strip_date_label   = 'D';
var compact_manage_label       = 'M';

// toggles' titles
var default_sig_title   = 'Add first signature by default when posting';
var show_sigs_title     = 'Display signatures bar beneath posting area';
var show_snips_title    = 'Display snippets bar beneath posting area';
var strip_date_title    = 'Strip date from quoted post';
var manage_title        = 'Display buttons for managing signatures and snippets';

// set these HTML snippets as you see more fitting,
// they will be appended at the bottom of each posting form
var reminder_text =
'Replacing the signature, anything after the "-- " line ' +
'will be erased (\'Undo\' or \'Ctrl+Z\' to recover)';
var multiple_forms_message = 'There are other posting forms open.';

// self-reminder to add localization :-)
var click_for_updates = 'click_for_updates';

// these are the class names & IDs used for the added elements
// change them if they conflict with some other script
var utils_bar_id         = 'GGP_utils_bar';
var snippets_bar_id      = 'GGP_snips_bar';
var snippet_id           = 'GGP_snippet_id_';
var signatures_bar_id    = 'GGP_sigs_bar';
var signature_id         = 'GGP_signature_id_';
var reminder_id          = 'GGP_reminder';
var multiform_id         = 'GGP_multiple_forms';
var panel_id             = 'GGP_panel';
var panel_header_id      = 'GGP_panel_header';
var panel_toggles_id     = 'GGP_panel_toggles';
var default_toggle_id    = 'GGP_default_toggle';
var signatures_toggle_id = 'GGP_sig_toggle';
var snippets_toggle_id   = 'GGP_snip_toggle';
var date_toggle_id       = 'GGP_date_toggle';

var move_signature_left_id     = 'GGP_move_sig_left_';
var move_signature_right_id    = 'GGP_move_sig_right_';
var delete_signature_id        = 'GGP_delete_sig_';
var move_snippet_left_id        = 'GGP_move_snip_left_';
var move_snippet_right_id       = 'GGP_move_snip_right_';
var delete_snippet_id           = 'GGP_delete_snip_';

var messagelog_id               = 'GGP_messagelog';

var move_signature_left_class   = 'GGP_move_sig_left';
var move_signature_right_class  = 'GGP_move_sig_right';
var delete_signature_class      = 'GGP_delete_sig';

var move_snippet_left_class  = 'GGP_move_snip_left';
var move_snippet_right_class = 'GGP_move_snip_right';
var delete_snippet_class     = 'GGP_delete_snip';

var sigsnip_wrapper_class = 'GGP_sigsnip_wrapper';

var add_sigsnip_class    = 'GGP_add_sigsnip';
var add_signature_class  = 'GGP_add_signature';
var add_snippet_class    = 'GGP_add_snippet';

var visible_class        = 'GGP_visible';
var invisible_class      = 'GGP_invisible';
var collapsible_class    = 'GGP_collapsible';

var marker_class         = 'GGP_marker';

var toggle_class         = 'GGP_toggle';
var toggle_on_class      = 'GGP_toggle_on';
var toggle_error_class   = 'GGP_toggle_error';

// edit the following CSS section as you prefer
// to format the various parts of the interface
var scriptCSS = ''.concat(
'                                                 ',
'    #',snippets_bar_id,',                        ',
'    #',signatures_bar_id,' {                     ',
'      background: #CCC;                          ',
'    }                                            ',
'                                                 ',
'    #',utils_bar_id,' * {                        ',
'  /*  line-height: 2em;  */                      ',
'    }                                            ',
'                                                 ',
'    #',utils_bar_id,' .',add_sigsnip_class,' {   ',
'      line-height: 1.1em;                        ',
'      width: 100%;                               ',
'    }                                            ',
'                                                 ',
'    #',reminder_id,' {                           ',
'      font-style: italic;                        ',
'      font-size: 85%;                            ',
'      color: #009;                               ',
'    }                                            ',
'                                                 ',
'    #',multiform_id,' {                          ',
'      font-weight: bold;                         ',
'      font-size: 85%;                            ',
'      color: #A00;                               ',
'    }                                            ',
'                                                 ',
'    #',panel_id,' {                              ',
'      font-family: sans-serif;                   ',
'      font-size: 85%;                            ',
'      text-align: center;                        ',
'      position: fixed;                           ',
'      border: 1px solid #000;                    ',
'      padding-top: 1ex;                          ',
'      bottom: 1ex;                               ',
'      right: 1ex;                                ',
'      background: #CCC;                          ',
'      z-index: 555;                              ',
'    }                                            ',
'                                                 ',
'    #',panel_id,' {                              ',
'      visibility: visible;                       ',
'    }                                            ',
'                                                 ',
'    #',panel_id,'.',invisible_class,' {          ',
'      visibility: hidden;                        ',
'    }                                            ',
'                                                 ',
'    #',panel_header_id,' {                       ',
'      font-weight: bolder;                       ',
'      color: #00A;                               ',
'    }                                            ',
'                                                 ',
'    #',panel_toggles_id,' {                      ',
'      overflow: hidden;                          ',
'      padding-top: 1ex;                          ',
'    }                                            ',
'                                                 ',
'    #',panel_id,':hover                          ',
'    .',collapsible_class,' {                     ',
'      height: auto;                              ',
'    }                                            ',
'                                                 ',
'    #',panel_id,'                                ',
'    .',collapsible_class,' {                     ',
'      height: 0;                                 ',
'    }                                            ',
'                                                 ',
'    .',toggle_class,' {                          ',
'      width: 100%;                               ',
'      line-height: 1em;                          ',
'      color: #B00;                               ',
'      display: block;                            ',
'    }                                            ',
'                                                 ',
'    .',toggle_on_class,' {                       ',
'      color: #00B;                               ',
'    }                                            ',
'                                                 ',
'    td.',sigsnip_wrapper_class,' table {         ',
'      width: 100%;                               ',
'    }                                            ',
'                                                 ',
'    td.',sigsnip_wrapper_class,' td {            ',
'      padding: 0;                                ',
'    }                                            ',
'                                                 ',
'    td.',sigsnip_wrapper_class,' td button {     ',
'      font-size: 0.6em;                          ',
'      width: 100%;                               ',
'      font-weight: bolder;                       ',
'    }                                            ',
'                                                 ',
'    td.',sigsnip_wrapper_class,' {               ',
'      padding: 4px;                              ',
'    }                                            ',
'                                                 ',
'                                                 ',
'    #',messagelog_id,' {                         ',
'      padding: 0;                                ',
'      padding: 0;                                ',
'      position: fixed;                           ',
'      left: 0;                                   ',
'      bottom: 0;                                 ',
'      width: 80%;                                ',
'      overflow: scroll;                          ',
'      height: 4em;                               ',
'      z-index: 444;                              ',
'      background: #DDD;                          ',
'    }                                            ',
'                                                 ',
'    #',messagelog_id,':hover {                   ',
'      height: 30em;                              ',
'    }                                            ',
'                                                 ',
'');

/* ============================================================================
  END OF SETTINGS
============================================================================ */

/* script implementation follows

/* ============================================================================
  Debugging facility
============================================================================ */

var debugging = false;

var messagelog = document.createElement('PRE');
if(debugging) {
  messagelog.id = messagelog_id;
  document.body.appendChild(messagelog);
}

function log(text) {
  if(debugging){
    messagelog.innerHTML += text + '\n';
  }
}

function clearLog() {
  if(debugging) messagelog.innerHTML = '';
}

/* ============================================================================
  Container
============================================================================ */

function Container(className, id) {
  this.e = create('DIV');
  if(id) this.e.id = id;
  if(className) this.e.className = className;
  this.append = function(child) {
    if(child) {
      if(child.e && child.e.tagName) {
        this.e.appendChild(child.e);
      } else if (child.tagName) {
        this.e.appendChild(child);
      }
    }
    return this;
  };
  this.__defineGetter__('caption', function() {
    return getTextSpan(this.e).textContent;
  });
  this.__defineSetter__('caption', function(text) {
    getTextSpan(this.e).textContent = text;
  });
  this.clear = function() {
    var temp = this.caption;
    this.e.innerHTML = '';
    this.caption = temp;
  };
}

/* ============================================================================
  Button
============================================================================ */

function Button(callback, className, id) {
  this.e = create('BUTTON');
  if(id) this.e.id = id;
  if(className) this.e.className = className;
  if(callback) {
    this.e.addEventListener(
      'click',
      function(e) { e.preventDefault(); callback(e.target); },
      false
    );
  }
  this.__defineGetter__('caption', function() {
    return this.e.textContent;
  });
  this.__defineSetter__('caption', function(text) {
    this.e.textContent = text;
  });
}

/* ============================================================================
  Toggle
============================================================================ */

function Toggle(callback, className, id) {
  this.e = create('BUTTON');
  if(id) this.e.id = id;
  if(className) this.e.className = className;
  if(callback) {
    this.e.addEventListener(
      'click',
      function(e) { e.preventDefault(); callback(e.target); },
      false
    );
  }
  this.__defineGetter__('caption', function() {
    return this.e.textContent;
  });
  this.__defineSetter__('caption', function(text) {
    this.e.textContent = text;
  });
  this.__defineGetter__('checked', function() {
    return isToggleOn(this.e);
  });
  this.__defineSetter__('checked', function(flag) {
    if(isToggleOn(this.e) != flag) {
      switchToggle(this.e);
    }
  });
}

/* ============================================================================
  Stored values getters/setters
============================================================================ */

function setValue(name, value) {
  if(GM_setValue) {
    GM_setValue(name, value);
  } else {
    Alert('GM not available');
  }
}

function getValue(name, default_value) {
  if(GM_getValue) {
    return GM_getValue(name, default_value);
  } else {
    Alert('GM not available');
    return 'GM not available';
  }
}


/* ============================================================================
  Append styling
============================================================================ */
var style = document.createElement('STYLE');
style.innerHTML = scriptCSS;
document.body.appendChild(style);

/* ============================================================================
  Script's internal stuff
============================================================================ */
var editing = false;
var signatures = [];
var snippets = [];
var signatures_store_label = "GGP_signatures";
var snippets_store_label = "GGP_snippets";
var flags_store_label = "GGP_flags";

/* ============================================================================
  U.P.Set bar creation code, this will be
  appended after the currently active posting form
============================================================================ */
var utils_bar = new Container('', utils_bar_id);
var snips_bar = new Container('', snippets_bar_id);
var sigs_bar = new Container('', signatures_bar_id);
var reminder = new Container('', reminder_id);
var multiform = new Container('', multiform_id);
utils_bar.append(snips_bar)
          .append(sigs_bar)
          .append(multiform);
reminder.caption = reminder_text;
multiform.caption = multiple_forms_message;
snips_bar.caption = snippets_label;
sigs_bar.caption = signatures_label;

function rebuildSigsBar() {
  sigs_bar.clear();
  var sig_count = signatures.length;
  var outertable = create('TABLE');
  var outerrow = create('TR');
  var wrapper = null;
  sigs_bar.append(outertable);
  outertable.appendChild(outerrow);
  for(var i = 0; i < sig_count; ++i) {
    var cursig = new Button(
      addSignature,
      add_signature_class + ' ' + add_sigsnip_class,
      signature_id + i
    );
    with(cursig) {
      caption = signatures[i][0];
      e.title = signatures[i][1];
    }
    wrapper = create('TD');
    wrapper.className = sigsnip_wrapper_class;
    outerrow.appendChild(wrapper);
    wrapper.appendChild(cursig.e);
    if(flags.manage) {
      var move_signature_left = new Button( 
        moveSignatureLeft,
        move_signature_left_class,
        move_signature_left_id + i
      );
      move_signature_left.caption = "<";
      move_signature_left.e.title = "Move signature to the left";
      var delete_signature = new Button( 
        deleteSignature,
        delete_signature_class,
        delete_signature_id + i
      );
      delete_signature.caption = "X";
      delete_signature.e.title = "Delete this signature";
      var move_signature_right = new Button( 
        moveSignatureRight,
        move_signature_right_class,
        move_signature_right_id + i
      );
      move_signature_right.caption = ">";
      move_signature_right.e.title = "Move signature to the right";
      var td1 = create('TD');
      var td2 = create('TD');
      var td3 = create('TD');
      var tr = create('TR');
      var table = create('TABLE');
      table.setAttribute("cellspacing", "0");
      wrapper.appendChild(table);
      table.appendChild(tr);
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      td1.appendChild(move_signature_left.e);
      td2.appendChild(delete_signature.e);
      td3.appendChild(move_signature_right.e);
    }
  }
  wrapper = create('TD');
  wrapper.className = sigsnip_wrapper_class;
  outerrow.appendChild(wrapper);
  var newsig = new Button(newSignature, add_sigsnip_class);
  newsig.caption = 'New sig...';
  newsig.e.title = 'Create new signature from selected text';
  wrapper.appendChild(newsig.e);
  if(flags.manage) {
    var export_sigs = new Button(exportSignatures);
    export_sigs.caption = "EXPORT";
    export_sigs.e.title = "Export signatures array in string format";
    var import_sigs = new Button(importSignatures);
    import_sigs.caption = "IMPORT";
    import_sigs.e.title = "Import signatures array from string format";
    td1 = create('TD');
    td2 = create('TD');
    tr = create('TR');
    table = create('TABLE');
    table.setAttribute("cellspacing", "0");
    wrapper.appendChild(table);
    table.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    td1.appendChild(export_sigs.e);
    td2.appendChild(import_sigs.e);
  }
  sigs_bar.append(reminder);
}

function rebuildSnipsBar() {
  snips_bar.clear();
  var snips_count = snippets.length
  var wrapper = null;
  var outertable = create('TABLE');
  var outerrow = create('TR');
  snips_bar.append(outertable);
  outertable.appendChild(outerrow);
  for(var i = 0; i < snips_count; ++i) {
    cursnip = new Button(
      addSnippet,
      add_snippet_class + ' ' + add_sigsnip_class,
      snippet_id + i
    );
    with(cursnip) {
      caption = snippets[i][0];
      e.title = snippets[i][1];
    }
    wrapper = create('TD');
    wrapper.className = sigsnip_wrapper_class;
    outerrow.appendChild(wrapper);
    wrapper.appendChild(cursnip.e);
    if(flags.manage) {
      var move_snippet_left = new Button( 
        moveSnippetLeft,
        move_snippet_left_class,
        move_snippet_left_id + i
      );
      move_snippet_left.caption = "<";
      move_snippet_left.e.title = "Move snippet to the left";
      var delete_snippet = new Button( 
        deleteSnippet,
        delete_snippet_class,
        delete_snippet_id + i
      );
      delete_snippet.caption = "X";
      delete_snippet.e.title = "Delete this snippet";
      var move_snippet_right = new Button( 
        moveSnippetRight,
        move_snippet_right_class,
        move_snippet_right_id + i
      );
      move_snippet_right.caption = ">";
      move_snippet_right.e.title = "Move snippet to the right";
      var td1 = create('TD');
      var td2 = create('TD');
      var td3 = create('TD');
      var tr = create('TR');
      var table = create('TABLE');
      table.setAttribute("cellspacing", "0");
      wrapper.appendChild(table);
      table.appendChild(tr);
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      td1.appendChild(move_snippet_left.e);
      td2.appendChild(delete_snippet.e);
      td3.appendChild(move_snippet_right.e);
    }
  }
  wrapper = create('TD');
  wrapper.className = sigsnip_wrapper_class;
  outerrow.appendChild(wrapper);
  var newsnip = new Button(newSnippet, add_sigsnip_class);
  newsnip.caption = 'New snip...';
  newsnip.e.title = 'Create new snippet from selected text';
  wrapper.appendChild(newsnip.e);
  if(flags.manage) {
    var export_snips = new Button(exportSnippets);
    export_snips.caption = "EXPORT";
    export_snips.e.title = "Export snippets array in string format";
    var import_snips = new Button(importSnippets);
    import_snips.caption = "IMPORT";
    import_snips.e.title = "Import snippets array from string format";
    td1 = create('TD');
    td2 = create('TD');
    tr = create('TR');
    table = create('TABLE');
    table.setAttribute("cellspacing", "0");
    wrapper.appendChild(table);
    table.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    td1.appendChild(export_snips.e);
    td2.appendChild(import_snips.e);
  }
}

/* ============================================================================
  Import and Export Signatures and Snippets
============================================================================ */

function importSignatures() {
  var textarea = findTextArea();
  if(textarea) {
    var sel_start = textarea.selectionStart;
    var sel_end = textarea.selectionEnd;
    var toimport = textarea.value.slice(sel_start, sel_end);
    if(toimport == '') {
      Alert("Paste the previously exported text into the textarea\n"
              + "select it and click this button again");
    } else {
      toimport = fixEOL(toimport);
      try {
        var new_array = arrayFromText(toimport);
        if(new_array && arrayIsValid(new_array)) {
          signatures = new_array;
          saveSignatures();
          rebuildSigsBar();
        } else {
          Alert("Unable to extract a valid array from selected text");
        }
      } catch (e) {
        if(e instanceof ParseError) {
          Alert("Error trying to import from text:\n" 
                  + e.message + '\n' 
                  + "At char:"
                  + (toimport.length - e.charsleft));
        } else {
          Alert("Error trying to import from text:\n" + e);
        }         
      }
    }
  }
}

function exportSignatures() {
  var textarea = findTextArea();
  if(textarea) {
    textarea.value += "\n\nGGP Utils Signatures Export,\n"
                      + "cut between the dashed lines\n-------\n"
                      + textFromArray(signatures)
                      + "\n-------\ncut between the dashed lines\n";
  }
}

function importSnippets() {
  var textarea = findTextArea();
  if(textarea) {
    var sel_start = textarea.selectionStart;
    var sel_end = textarea.selectionEnd;
    var toimport = textarea.value.slice(sel_start, sel_end);
    if(toimport == '') {
      Alert("Paste the previously exported text into the textarea\n"
              + "select it and click this button again");
    } else {
      toimport = fixEOL(toimport);
      try {
        var new_array = arrayFromText(toimport);
        if(new_array && arrayIsValid(new_array)) {
          snippets = new_array;
          saveSnippets();
          rebuildSnipsBar();
        } else {
          Alert("Unable to extract a valid array from selected text");
        }
      } catch (e) {
        if(e instanceof ParseError) {
          Alert("Error trying to import from text:\n" 
                  + e.message + '\n' 
                  + "At char:"
                  + (toimport.length - e.charsleft));
        } else {
          Alert("Error trying to import from text:\n" + e);
        }         
      }
    }
  }
}

function exportSnippets() {
  var textarea = findTextArea();
  if(textarea) {
    textarea.value += "\n\nGGP Utils Snippets Export,\n"
                      + "cut between the dashed lines\n-------\n"
                      + textFromArray(snippets)
                      + "\n-------\ncut between the dashed lines\n";
  }
}
/* ============================================================================
  TextFromArray and ArrayFromText conversion functions
============================================================================ */

function arrayIsValid(array) {
  if(!(array instanceof Array) || !array.length) {
     return false;
  }
  for(var i = 0; i < array.length; ++i) {
    if(!(array[i] instanceof Array) || array[i].length != 2) {
      return false;
    }
  }
  return true;   
}

function ParseError(message, charsleft) {
  this.message = message;
  this.charsleft = charsleft;
}

function textFromArray(v) {
  var result = '';
  if(v instanceof Array) {
    result += 'A' + v.length + ' ';
    for(var i = 0; i < v.length; ++i) {
      result += textFromArray(v[i]);
    }
  } else {
    s = new String(v);
    result += 'S' + s.length + ' ' + s + ' ';
  }
  return result;
}

function arrayFromText(t) {
  function parseData(text) {
    var result = [[], []];
    const gettype = 0;
    const getstring = 1;
    const getarray = 2;
    var next = gettype;
    var slen = '';
    var len = 0;
    for(var i = 0; i < text.length; ++i) {
      var ch = text.charAt(i);
      switch(next) {
        case gettype:
          if(ch == 'S') {
            next = getstring;
            slen = '';
            continue;
          } else if(ch == 'A') {
            next = getarray;
            slen = '';
            continue;
          } else {
            throw new ParseError("Unexpected char: '" + ch
                                  + "', expecting 'A' or 'S' as type marker.",
                                  text.slice(i));
          }
        case getstring:
          if(/\d/.test(ch)) {
            slen += ch;
            continue;
          } else if(ch == ' ') {
            len = +slen;
            var after_string = i + len + 1;
            if(text.charAt(after_string) != ' ') {
              throw new ParseError('Missing space after string data.',
                                    text.slice(after_string));
            }
            result[0] = text.slice(i + 1, i + len + 1);
            result[1] = text.slice(i + len + 2);
            return result 
          } else {
            throw new ParseError("Unexpected char: '" + ch
                                  + "', expecting ' '(space) or digit, "
                                  + 'reading string length.',
                                  text.slice(i));
          }
        case getarray:
          if(/\d/.test(ch)) {
            slen += ch;
            continue;
          } else if(ch == ' ') {
            len = +slen;
            var remainder = text.slice(i + 1);
            if(len) {
              for(var j = 0; j < len; ++j) {
                var inner = parseData(remainder);
                result[0][j] = inner[0];
                remainder = inner[1];
              }
              result[1] = remainder;
              return result; 
            } else {
              return [[], remainder];
            }
          } else {
            throw new ParseError("Unexpected char: '" + ch
                                  + "', expecting ' '(space) or digit, "
                                  + 'reading array length.',
                                  text.slice(i));            
          }
      } // end switch
    } // end for
  } // end parseData function
  var result = parseData(t);
  if(result.length) {
    return result[0];
  } else {
    return null;
  }
} // end arrayFromText function

/* ============================================================================
  Signature and snippets management
============================================================================ */

function appendSignature(signame, sigtext) {
  var i = signatures.length;
  signatures[i] = [signame, sigtext];
  saveSignatures();
}

function appendSnippet(snipname, sniptext) {
  var i = snippets.length;
  snippets[i] = [snipname, sniptext];
  saveSnippets();
}

function newSignature() {
  var textarea = findTextArea();
  if(textarea) {
    var sel_start = textarea.selectionStart;
    var sel_end = textarea.selectionEnd;
    var sig = textarea.value.slice(sel_start, sel_end);
    if(sig == '') {
      Alert('Type the new signature in the textarea,\n'
              + 'select it and click this button again.\n'
              + 'Do not include the signature delimiter');  
      return;
    }
    sig = fixEOL(sig);
    if(sig.replace(/.*/g, '').length > 8) {
      Alert('Signature cannot be longer than 8 lines');
      return;
    }
    var name = Prompt('New signature text:\n"'
                      + sig + '"\n\n'
                      + 'Enter a name for this signature or cancel',
                      'Signature ' + (signatures.length + 1));
    if(!name || name == '') {
      return;
    }
    appendSignature(fixEOL(name), fixEOL(sig));
    rebuildSigsBar();
  }
}


function newSnippet() {
  var textarea = findTextArea();
  if(textarea) {
    var sel_start = textarea.selectionStart;
    var sel_end = textarea.selectionEnd;
    var snip = textarea.value.slice(sel_start, sel_end);
    if(snip == '') {
      Alert('Type or paste the snippet in the textarea,\n'
              + 'select it and click this button again.');  
      return;
    }
    snip = fixEOL(snip);
    var snip_lines = snip.split('\n');
    var howmany = snip_lines.length - 10;
    if(howmany > 0) {
      snip_lines.splice(5, howmany, "\n..." + howmany + " other lines...\n");
    }
    var name = Prompt('New snippet text:\n\n"'
                      + snip_lines.join('\n') + '"\n\n'
                      + 'Enter a name for this snippet or cancel',
                      'Snippet ' + (snippets.length + 1));
    if(!name || name == '') {
      return;
    }
    appendSnippet(fixEOL(name), fixEOL(snip));
    rebuildSnipsBar();
  }
}

function saveSnippets() {
  var snips_string = textFromArray(snippets);
  setValue(snippets_store_label, snips_string);
}

function saveSignatures() {
  var sigs_string = textFromArray(signatures);
  setValue(signatures_store_label, sigs_string);
}

function loadSnippets() {
  try {
    var snips_string = getValue(snippets_store_label, "A0 ");
    snippets = arrayFromText(snips_string);
  } catch(e) {
    if(e instanceof ParseError) {
      Alert(e.message + '\n' 
              + "At char:"
              + (snips_string.length - e.charsleft));
    } else {
      Alert(e);
    }
  }
}

function loadSignatures() {
  try {
    var sigs_string = getValue(signatures_store_label, "A0 ");
    signatures = arrayFromText(sigs_string);
  } catch(e) {
    if(e instanceof ParseError) {
      Alert(e.message + '\n' 
              + "At char:"
              + (snips_string.length - e.charsleft));
    } else {
      Alert(e);
    }
  }
}

function swapSnippets(index, swapindex) {
  if(index != swapindex) {
    var temp = snippets[index];
    snippets[index] = snippets[swapindex];
    snippets[swapindex] = temp;
    saveSnippets();
    rebuildSnipsBar();
  }
}

function moveSnippetLeft(button) {
  if(button && button.id) {
    var index = +button.id.slice(move_snippet_left_id.length);
    if(index > 0) {
      swapSnippets(index, index-1);
    } else {
      swapSnippets(index, snippets.length - 1);
    }
  }  
}

function deleteSnippet(button) {
  if(button && button.id) {
    var index = +button.id.slice(delete_snippet_id.length);
    if(Confirm('Confirm deletion of snippet "' + snippets[index][0] + '"?')) {
      snippets.splice(index, 1);
      saveSnippets();
      rebuildSnipsBar();
    }
  }  
}

function moveSnippetRight(button) {
  if(button && button.id) {
    var index = +button.id.slice(move_snippet_right_id.length);
    if(index < snippets.length - 1) {
      swapSnippets(index, index+1);
    } else {
      swapSnippets(index, 0);
    }
  }  
}


function swapSignatures(index, swapindex) {
  if(index != swapindex) {
    var temp = signatures[index];
    signatures[index] = signatures[swapindex];
    signatures[swapindex] = temp;
    saveSignatures();
    rebuildSigsBar();
  }
}

function moveSignatureLeft(button) {
  if(button && button.id) {
    var index = +button.id.slice(move_signature_left_id.length);
    if(index > 0) {
      swapSignatures(index, index-1);
    } else {
      swapSignatures(index, signatures.length-1);
    }
  }  
}

function deleteSignature(button) {
  if(button && button.id) {
    var index = +button.id.slice(delete_signature_id.length);
    if(Confirm('Confirm deletion of signature "' + signatures[index][0] + '"?')) {
      signatures.splice(index, 1);
      saveSignatures();
      rebuildSigsBar();
    }
  }  
}

function moveSignatureRight(button) {
  if(button && button.id) {
    var index = +button.id.slice(move_signature_right_id.length);
    if(index < signatures.length - 1) {
      swapSignatures(index, index+1);
    } else {
      swapSignatures(index, 0);
    }
  }  
}
/* ============================================================================
  Run the above loadSnippets and loadSignatures once at startup
============================================================================ */
loadSnippets();
loadSignatures();
/* ============================================================================
  Functions for storing and retrieving flags
============================================================================ */

function saveFlags() {
  var array = [
    ["add_first_sig",     flags.add_first_sig],
    ["strip_date",        flags.strip_date],
    ["show_snips",        flags.show_snips],
    ["show_sigs",         flags.show_sigs],
    ["manage",            flags.manage],
  ];
  var text = textFromArray(array);
  setValue(flags_store_label, text);
}

function loadFlags() {
  var text = getValue(flags_store_label, '');
  if(text != '') {
    var array = arrayFromText(text);
    try {
      if(arrayIsValid(array)) {
        for(var i = 0; i < array.length; ++i) {
          var curflag = (array[i][1] == 'true');
          switch(array[i][0]) {
            case "add_first_sig":
              flags.add_first_sig = curflag;
              break;
            case "strip_date":
              flags.strip_date = curflag;
              break;
            case "show_snips":
              flags.show_snips = curflag;
              break;
            case "show_sigs":
              flags.show_sigs = curflag;
              break;
            case "manage":
              flags.manage = curflag;
              break;
          }
        }
      }
    } catch(e) {
      Alert(e);
    }
  }
}
// run it once at startup
loadFlags();

/* ============================================================================
  GGP Utils panel creation code, this will be
  shown at the bottom-right corner of the viewport
============================================================================ */
var panel = new Container('', panel_id);
if(!flags.always_show_panel) {
  addClass(panel.e, invisible_class);
}
var toggles = new Container('', panel_toggles_id);
if(flags.collapse_toggles) {
  toggles.e.className = collapsible_class;
}
var header = create('A');
with(header) {
  id = panel_header_id;
  title = 'Ver. ' + GGP_version;
  title += ', ' + click_for_updates;
  if(flags.compact_panel) {
    title = GGP_name + ", " + title;
    innerHTML = compact_panel_header_label;
  } else {
    innerHTML = panel_header_label;
  }
  href = GGP_userscripts;
}
panel.append(header);
panel.append(toggles);
var workarea = create('TEXTAREA');
workarea.style.display = 'none';
panel.append(workarea);
document.body.appendChild(panel.e);

function newToggle(labeltext, flag, callback, title) {
  var t = new Toggle(callback, toggle_class);
  t.caption = labeltext;
  t.e.title = title;
  t.e.style.display = 'block';
  t.checked = flag;
  toggles.append(t);
  return t;
}
var default_toggle = newToggle(
  (flags.compact_panel ? 
    compact_default_sig_label :
    default_sig_label
  ),
  flags.add_first_sig,
  toggle_default,
  default_sig_title
);
var sigs_toggle = newToggle(
  (flags.compact_panel ? 
    compact_show_sigs_label :
    show_sigs_label
  ),
  flags.show_sigs,
  toggle_sigs,
  show_sigs_title
);
var snips_toggle = newToggle(
  (flags.compact_panel ? 
    compact_show_snips_label :
    show_snips_label
  ),
  flags.show_snips,
  toggle_snips,
  show_snips_title
);
var date_toggle = newToggle(
  (flags.compact_panel ? 
    compact_strip_date_label :
    strip_date_label
  ),
  flags.strip_date,
  toggle_date,
  strip_date_title
);
var manage_toggle = newToggle(
  (flags.compact_panel ? 
    compact_manage_label :
    manage_label
  ),
  flags.manage,
  toggle_manage,
  manage_title
);

function toggle_default() {
  switchToggle(default_toggle.e);
  flags.add_first_sig = default_toggle.checked;
  saveFlags();
}

function toggle_sigs() {
  switchToggle(sigs_toggle.e);
  flags.show_sigs = sigs_toggle.checked;
  updateUtilsBar();
  saveFlags();
}

function toggle_snips() {
  switchToggle(snips_toggle.e);
  flags.show_snips = snips_toggle.checked;
  updateUtilsBar();
  saveFlags();
}

function toggle_date() {
  switchToggle(date_toggle.e);
  flags.strip_date = date_toggle.checked;
  saveFlags();
}

function toggle_manage() {
  switchToggle(manage_toggle.e);
  flags.manage = manage_toggle.checked;
  rebuildSnipsBar();
  rebuildSigsBar();
  saveFlags();
}
/* ============================================================================
  Update functions
============================================================================ */

function updateUtilsBar() {
  if(sigs_toggle.checked) {
    sigs_bar.e.style.display = 'block';
  } else {
    sigs_bar.e.style.display = 'none';  
  }
  if(snips_toggle.checked) {
    snips_bar.e.style.display = 'block';
  } else {
    snips_bar.e.style.display = 'none';  
  }
  if(markersCount() > 1) {
    multiform.e.style.display = 'block';
  } else {
    multiform.e.style.display = 'none';
  }
}
rebuildSigsBar();
rebuildSnipsBar();
updateUtilsBar();

/* ============================================================================
  Textarea formatting function
============================================================================ */
var current_textarea = null;
function format(textarea) {
  current_textarea = textarea;
  if(editing) return;
  textarea.parentNode.appendChild(utils_bar.e);
  editing = true;
  if(addMarker(textarea)) {
    var temp = fixEOL(textarea.value);
    if(flags.strip_date) {
    	temp = temp.replace(/^.*,.*, /, '');
    }
    temp = temp.replace(/\n> ?-- ?(\n>.*)*/, '');
    temp = addTrailingSpace(temp);
    textarea.value = temp;
    if(flags.add_first_sig) {
      addThisSignature(0);
    } else {
      textarea.scrollTop = textarea.scrollHeight;
      var size = textarea.value.length;
      setTimeout(
        function(){
          textarea.setSelectionRange(size, size);
        }
      ,1);
    }
  }
  editing = false;
  updateUtilsBar();
}

/* ============================================================================
  Functions for adding signatures and snippets
============================================================================ */

function addThisSignature(index) {
  editing = true;
  var textarea = findTextArea();
  if(textarea && -1 < index && index < signatures.length) {
    var temp = fixEOL(textarea.value);
    temp = temp.replace(/\n-- (\n.*)*/, '');
    temp = addTrailingSpace(temp);
    workarea.value = temp;
    var size = workarea.value.length;
    workarea.value += '\n-- \n' + signatures[index][1];
    textarea.value = workarea.value;
    workarea.value = '';
    textarea.scrollTop = textarea.scrollHeight;
    textarea.focus();
    setTimeout(
      function(){
        textarea.setSelectionRange(size,size);
      }
    ,1);
  }
  editing = false;
}

function addSignature(button) {
  var index = +button.id.slice(signature_id.length);
  addThisSignature(index);
}

function addSnippet(button) {
  var index = +button.id.slice(snippet_id.length);
  editing = true;
  var textarea = findTextArea();
  if(textarea && -1 < index && index < snippets.length) {
    var sel_start = textarea.selectionStart;
    var sel_end = textarea.selectionEnd;
    var before = textarea.value.slice(0, sel_start);
    var after = textarea.value.slice(sel_end);
    workarea.value = before + snippets[index][1];
    sel_end = workarea.value.length;
    workarea.value += after;
    textarea.value = workarea.value;
    workarea.value = '';
    textarea.scrollTop = textarea.scrollHeight;
    textarea.focus();
    setTimeout(
      function(){
        textarea.setSelectionRange(sel_end, sel_end);
      }
    ,1);
  }
  editing = false;
}

/* ============================================================================
  Intercept discard button to remove posting markers
============================================================================ */
document.addEventListener(
  'click',
  function(event) {
    if(event.target.nodeName == 'BUTTON'
       && /^dc/.test(event.target.id)) {
       deleteMarker(event.target);
    }
  },
  true
);

/* ============================================================================
  Intercept the focus on the textarea of a posting form,
  to call format() to strip date and signature from quoted post
  and to move the utils bar beneath the current textarea
============================================================================ */
document.addEventListener(
  'focus',
  function(event) {
  	if (event.target.tagName == 'TEXTAREA'
        && findForm(event.target)) {
      format(event.target);
    }
  },
  true
);

/* ============================================================================
  Element creation function
============================================================================ */

function create(tag) {
  return document.createElement(tag);
}

/* ============================================================================
  Class check/addition/removal functions
============================================================================ */

function hasClass(element, classname) {
  var filter = new RegExp(classname);
  return filter.test(element.className);
}

function addClass(element, classname) {
  if(!hasClass(element, classname)) {
    element.className += ' ' + classname; 
  }
}

function removeClass(element, classname) {
  var filter = new RegExp(classname);
  element.className = element.className.replace(filter, '');
  element.className = element.className.replace(/  /g, ' ');     
}

/* ============================================================================
  Toggling functions
============================================================================ */

function isToggleOn(element) {
  return hasClass(element, toggle_on_class);
}

function switchToggle(element) {
  if(isToggleOn(element)) {
    removeClass(element, toggle_on_class);
  } else {
    addClass(element, toggle_on_class);
  }
}

/* ============================================================================
  Textspan helper, used by Container
============================================================================ */

function getTextSpan(parent) {
  var textspan_class = 'GGP_textspan';
  var child = create('SPAN');
  addClass(child, textspan_class);
  if(parent.childNodes) {
    var children = parent.childNodes;
    if(children.length) {
      for(var i = 0; i < children.length; ++i) {
        if(hasClass(children[i], textspan_class)) {
          return children[i];
        }
      }
      parent.insertBefore(child, parent.firstChild);
      return child;
    }
  }
  parent.appendChild(child);
  return child;
}

/* ============================================================================
  Element finding functions
============================================================================ */

function findParentByNodeName(element, parent_nodename) {
  if(element.parentNode) {
    if(element.parentNode.nodeName == parent_nodename) {
      return element.parentNode;
    } else {
      return findParentByNodeName(element.parentNode, parent_nodename);
    }
  }
  return null;
}

function findForm(element) {
  return findParentByNodeName(element, 'FORM');
}

function findTextArea() {
  return current_textarea;
}

/* ============================================================================
  Varios functions used to manage posting markers,
  used to track the number of open posting forms
============================================================================ */

function markersCount() {
  return document.getElementsByClassName(marker_class).length;
}

function getMarker(element) {
  var form = findForm(element);
  if(form) {
    var markers = form.getElementsByClassName(marker_class);
    if(markers.length) {
      return markers[0];
    }
  }
  return null;
}

function addMarker(element) {
  var marker = document.createElement('SPAN');
  marker.className = marker_class;
  if(getMarker(element)) {
    return false;
  }
  var form = findForm(element);
  if(form) {
    form.appendChild(marker);
    if(markersCount() == 1) {
      var panel = document.getElementById(panel_id);
      if(panel) {
        removeClass(panel, invisible_class);
      }
    }
    return true;
  }
  return false;
}

function deleteMarker(element) {
  var marker = getMarker(element);
  if(marker){
    findForm(element).removeChild(marker);
  }
  if(markersCount() == 0) {
      var panel = document.getElementById(panel_id);
      if(panel && !flags.always_show_panel) {
        addClass(panel.e, invisible_class);
      }
  }
}

/* ============================================================================
  Text mangling functions
============================================================================ */

function fixEOL(text) {
  var rat = text.indexOf('\r');
  var nat = text.indexOf('\n');
  if(rat == -1) {
    return text;
  }
  if(nat == -1) {
    return text.replace(/\r/g, '\n');
  }
  if(rat < nat) {
    return text.replace(/\r\n/g, '\n');
  }
  return text.replace(/\n\r/g, '\n');
}

function addTrailingSpace(text) {
  var temp = fixEOL(text)
  if(/\n\n$/.test(temp)){
    return temp;
  }
  if(/\n$/.test(temp)){
    return temp + '\n';
  }
  return temp + '\n\n';
}

/* ============================================================================
  Customized 'alert', 'prompt' and 'confirm' functions
============================================================================ */

function Alert(text) {
  alert(GGP_name + '\n\n' + text);
}

function Prompt(text, default_text) {
  return prompt(GGP_name + '\n\n' + text, default_text);
}

function Confirm(text) {
  return confirm(GGP_name + '\n\n' + text);
}

// END OF SCRIPT