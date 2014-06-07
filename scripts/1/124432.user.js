// ==UserScript==
// @name           E-Hentai Image Search
// @namespace      hf
// @include        *
// @description    This script adds a box where to drag-and-drop images from any webpages (and local storages) in order for these images to be searched for in the E-Hentai galleries. Use the GM menu to show the drop box, or use the keyboard shortcut (Alt+i by default, can be changed in the options dialog).
// @icon           http://g.e-hentai.org/favicon.ico
// @version        1.3
// ==/UserScript==

/** Reset the element CSS attributes. */
function removeComputedStyle(el, recursive) {
  //GM_log(el);

  if(el.nodeType == 1) {
    // Reset most CSS attributes
    var defaultStyle = {
      border: '0px', margin: '0', padding: '0',
      outlineStyle: 'none', direction: 'ltr', letterSpacing: 'normal',
      lineHeight: 'normal', textAlign: 'left', textDecoration: 'none',
      textIndent: '0', textTransform: 'none', verticalAlign: 'baseline',
      whiteSpace: 'normal', wordSpacing: 'normal', hangingPunctuation: 'none',
      punctuationTrim: 'none', textJustify: 'auto', textOutline: 'none',
      textOverflow: 'clip', textShadow: '', textWrap: 'normal',
      wordBreak: 'normal', wordWrap: 'normal', position: 'static',
      visibility: 'visible', /*display: 'inline',*/ cursor: 'auto',
      cssFloat: 'none', clip: 'auto', clear: 'none',
      zIndex: 'auto', fontSize: 'medium', fontStyle: 'normal',
      fontStyle: 'normal', fontWeight: 'normal', fontSizeAdjust: 'none',
      fontStretch: 'normal', height: 'auto', maxHeight: 'none',
      maxWidth: 'none', minHeight: '0', width: 'auto',
    };
    // XXX: the default browser CSS should also be taken into account.
    //      See <http://www.w3.org/TR/CSS2/sample.html>.

    for(var attr in defaultStyle) {
      if(el.style[attr] == undefined) el.style[attr] = defaultStyle[attr];
    }
  }

  if(recursive) {
    for(var child = el.firstChild ; child ; child = child.nextSibling) {
      removeComputedStyle(child, true);
    }
  }
}

var g_dropbox      = null;  /* DOM element that represents the drop box. */
var g_dropbox_text = null;  /* DOM element where the status text is put. */

function toggleImageSearch() {
  if(g_dropbox == null) {
    /* Create the drop box */
    g_dropbox = document.createElement("div");
    g_dropbox.style.display = 'none';
    // XXX: TABLE elements are evil and blah bleh blah ...
    var table = document.createElement("table");
    g_dropbox_text = table.insertRow(-1).insertCell(-1);
    g_dropbox_text.innerHTML = 'Drop an image here';
    g_dropbox_opt_button = document.createElement('div');
    g_dropbox_opt_button.innerHTML = 'Options';

    g_dropbox.appendChild(table);
    g_dropbox.appendChild(g_dropbox_opt_button);
    document.body.appendChild(g_dropbox);

    // Shouldn't be called before the element has been added to the DOM tree.
    removeComputedStyle(g_dropbox, true);

    /* Set elements CSS properties */
    g_dropbox.style.border     = '1px solid #5C0D12';
    g_dropbox.style.width      = '100px';
    g_dropbox.style.height     = '100px';
    g_dropbox.style.zIndex     = '65534';
    g_dropbox.style.position   = 'fixed';
    g_dropbox.style.bottom     = '20px';
    g_dropbox.style.left       = '10px';
    g_dropbox.style.background = 'rgba(237, 235, 223, 0.9)';
    g_dropbox.style.color      = '#5c0d11';
    g_dropbox.style.font       = 'bold 16px arial,helvetica,sans-serif';
    g_dropbox.style.textAlign  = 'center';
    g_dropbox.style.margin     = '0px';

    table.style.color = 'inherit';
    table.style.font  = 'inherit';
    table.style.width  = '100%';
    table.style.height = '100%';
    //table.style.border = '1px solid black'; // DEBUG

    g_dropbox_text.style.font          = 'inherit';
    g_dropbox_text.style.verticalAlign = 'middle';
    g_dropbox_text.style.textAlign     = 'center';
    g_dropbox_text.style.paddingBottom = '15px';
    //g_dropbox_text.style.border        = '1px solid black'; // DEBUG

    g_dropbox_opt_button.style.background        = 'none';
    g_dropbox_opt_button.style.borderBottom      = '0px';
    g_dropbox_opt_button.style.borderLeft        = '0px';
    g_dropbox_opt_button.style.borderRight       = '0px';
    g_dropbox_opt_button.style.borderTop         = '1px solid';
    g_dropbox_opt_button.style.borderTopColor    = 'inherit';
    g_dropbox_opt_button.style.position          = 'absolute';
    g_dropbox_opt_button.style.bottom            = '0px';
    g_dropbox_opt_button.style.right             = '0px';
    g_dropbox_opt_button.style.left              = '0px';
    g_dropbox_opt_button.style.fontFamily        = 'inherit';
    g_dropbox_opt_button.style.fontSize          = '60%';
    g_dropbox_opt_button.style.fontWeight        = 'normal';
    g_dropbox_opt_button.style.color             = 'inherit';
    g_dropbox_opt_button.style.cursor            = 'pointer';
    g_dropbox_opt_button.style.width             = 'auto';
    g_dropbox_opt_button.style.textAlign         = 'center';

    // click -> switch element position
    g_dropbox.addEventListener("click", db_on_click, false);
    // dragenter -> decide if we can handle what is being dragged
    g_dropbox.addEventListener("dragenter", db_on_dragenter, false);
    // dragleave -> UI stuff
    g_dropbox.addEventListener("dragleave", db_on_dragleave, false);
    // dragover -> UI stuff
    g_dropbox.addEventListener("dragover", db_on_dragover, false);
    // drop -> submit the image to the search engine
    g_dropbox.addEventListener("drop", db_on_drop, false);
  }

  if(g_dropbox.style.display != 'none') g_dropbox.style.display = 'none';
  else g_dropbox.style.display = '';
}

function db_on_click(e) {
  if(e.target == g_dropbox_opt_button) {
    showOptions();
  } else if(e.target.tagName.toLowerCase() == 'a') {
    g_dropbox_text.innerHTML = "Drop an image here"; // reset
  } else {
    // Switch the box position
    if(g_dropbox.style.bottom != "") {
      g_dropbox.style.bottom = "";
      g_dropbox.style.top = "20px";
    } else {
      g_dropbox.style.top = "";
      g_dropbox.style.bottom = "20px";
    }
  }
}

/** Return true if we can handle the type of what is being dragged to our box. */
function db_filter(dt) {
//  GM_log('db_filter: ' + JSON.stringify(dt.types));

  if(dt.mozItemCount != 1) return false;

  // XXX: x-moz-file* can't be handled by non-privileged scripts.
  // From HDD
  if(dt.types.contains("application/x-moz-file")) return true;
  // From Web page
  if(dt.types.contains("application/x-moz-file-promise")) return true;

//   GM_log('db_filter: files=' + dt.files);
//   if(dt.files) {
//     GM_log('db_filter: length=' + dt.files.length);
//     if(dt.files.length == 1) {
//       GM_log('db_filter: type=' + dt.files[0].type);
//       if(dt.files[0].type.match(/^images\//)) return true;
//     }
//   }

  return false;
}

var g_accept_drop = false;  /* Can we handle what is being dragged ? */
var g_drag_target = null;   /* DOM element that received the latest 'dragenter' event. */

function db_on_dragenter(e) {
  //GM_log("db_on_dragenter(" + e.target + ")");

  g_drag_target = e.target;
  g_accept_drop = db_filter(e.dataTransfer);
  if(!g_accept_drop) return;

  // Prevent the default action which changes the mouse cursor.
  e.stopPropagation();
  e.preventDefault();

  g_dropbox.style.color       = '#EDEBDE';
  g_dropbox.style.borderColor = '#EDEBDF';
  g_dropbox.style.background  = "rgba(92, 13, 18, 0.9)";
}

function db_on_dragover(e) {
  //GM_log("db_on_dragover()");

  if(!g_accept_drop) return;

  // Prevent the default action which changes the mouse cursor.
  e.stopPropagation();
  e.preventDefault();
}

function db_on_dragleave(e) {
  //GM_log("db_on_dragleave(" + e.target + ")");
  if(g_drag_target == e.target) reset_db_style();
}

function reset_db_style() {
  g_dropbox.style.color       = '#5C0D11';
  g_dropbox.style.borderColor = '#5C0D12';
  g_dropbox.style.background  = "rgba(237, 235, 223, 0.9)";
}

function db_on_drop(e) {
//   var str = 'e.dataTransfer = {';
//   for(var key in e.dataTransfer) {
//     str += '  ' + key + ': ' + JSON.stringify(e.dataTransfer[key]) + ',\n';
//   }
//   str += '}';
//   GM_log('db_on_drop(' + str + ')');

//   var str = '{';
//   for(var key in e) {
//     str += key + ': "' + e[key] + ', ';
//   }
//   GM_log('db_on_drop(' + str + '})');

  // XXX: dragleave isn't always sent on time because of a bug in FF.
  g_drag_target = null;
  reset_db_style();

  // Prevent the default action which open what has been dropped in the current window.
  e.stopPropagation();
  e.preventDefault();

  if(!g_accept_drop) return;
  g_accept_drop = false;  // reset

  var files = e.dataTransfer.files;
  if(files.length == 0) {
    // Image from a website.

    //unsafeWindow.netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
    //window.netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
    // XXX: that gives the privilege to the whole webpage :(

//     GM_log("mozItemCount = " + e.dataTransfer.mozItemCount);
//     for(var i = 0 ; i < e.dataTransfer.types.length ; ++i) {
//       var type = e.dataTransfer.types[i];

//       try {
//         GM_log(type + ' = ' + e.dataTransfer.getData(type).length);
//         var data = e.dataTransfer.mozGetDataAt(type, 0);
//         GM_log(type + ' = ' + data);
//       } catch(e) {
//         GM_log(type + ' => ' + e);
//       }
//     }

    var url = e.dataTransfer.mozGetDataAt("application/x-moz-file-promise-url", 0);
    var file_name = e.dataTransfer.mozGetDataAt('application/x-moz-file-promise-dest-filename', 0);
    //GM_log('url = ' + url);

    g_dropbox_text.innerHTML = "Loading image ...";

    getImageData(url, function(data) {
      if(data) {
//         GM_log('data = ' + data.length + ' bytes');
        sendSearchRequest(data, file_name);
      } else GM_log('data = null');
    });
  } else if(files.length == 1 && files[0].type.match(/^image\//)) {
    // Local image file.
    var file = files[0];
    //GM_log('db_on_drop: ' + JSON.stringify(file.name));

/* The file search form looks like that:
<form action="http://ul.e-hentai.org/image_lookup.php" method="post" enctype="multipart/form-data">
  <input type="file" name="sfile" size="40" style="font-size:8pt" />
  <input type="submit" name="f_sfile" value="File Search" style="font-size:8pt" />
  <input id="fs_similar" type="checkbox" name="fs_similar" checked="checked" />
  <input id="fs_covers" type="checkbox" name="fs_covers" />
  <input id="fs_exp" type="checkbox" name="fs_exp" />
</form>
*/
    var reader = new FileReader();
    reader.onloadend = function() {
      sendSearchRequest(file.getAsBinary(), file.name);
    };

    g_dropbox_text.innerHTML = "Loading image ...";

    reader.readAsBinaryString(file);
  } else {
    if(files.length >= 1) alert("Error: invalid image format (" + files[0].type + ").");
    else alert("Error: invalid image format.");
  }
}

function getImageData(url, callback) {
  var xhr = GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function(resp) {
      //GM_log('onload(' + resp.readyState + ', ' + resp.status + ')');
      if(resp.readyState == 4) {
        if((resp.status >= 200 && resp.status <= 200) || resp.status == 304) {
          var data = '';

          // Remove the MSB (=0xF7) of bytes between [0x80 ; 0xFF].
          for(var i = 0 ; i < resp.responseText.length ; ++i) {
            data += String.fromCharCode(resp.responseText.charCodeAt(i) & 0xFF);
          }

          callback(data);
        } else {
          callback(null);
        }
      }
    },
    // The following line allows us to retrieve the response as a binary data.
    overrideMimeType: "text/plain; charset=x-user-defined",
  });
}

function sendSearchRequest(img_data, img_name) {
  //GM_log(JSON.stringify(img_data));

  const boundary_chars = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f",
    "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v",
    "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
    "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "'", "(",
    ")", "+", "_", ",", "-", ".", "/", ":", "=", "?"/*, " "*/
  ];
  /* The space character is a valid boundary character, but it must not be the last character
   * of the boundary.
   */

  /* Generate a random boundary. */
  var boundary = "";
  for(var i = Math.max(Math.round(Math.random() * 70), 10) ; i > 0 ; --i) {
    boundary += boundary_chars[Math.round(Math.random() * (boundary_chars.length - 1))];
  }

  var uri = "http://ul.e-hentai.org/image_lookup.php";

  //GM_log("Forging request body ...");
  var body = '';
  var fields = {
    f_sfile:    'File Search',
    fs_similar: (GM_getValue('fs_similar', true) ? '1' : '0'),
    fs_covers:  (GM_getValue('fs_covers', false) ? '1' : '0'),
    fs_exp:     (GM_getValue('fs_exp', true) ? '1' : '0'),
  };
  /* Add the form fields to the request body. */
  for(var name in fields) {
    body += "--" + boundary + "\r\n";;
    body += "Content-Disposition: form-data; name='" + name + "'\r\n\r\n";
    body += fields[name] + "\r\n";
  }

  /* Add the image file content to the request body. */
  body += "--" + boundary + "\r\n";
  body += "Content-Disposition: form-data; name='sfile'; filename='" + img_name + "'\r\n";
  body += "Content-Type: application/octet-stream\r\n\r\n";
  body += img_data + "\r\n";

  /* Mark the end of the body. */
  body += "--" + boundary + "--";

  g_dropbox_text.innerHTML = "Sending request ...";
  var xhr = GM_xmlhttpRequest({
    method: "POST",
    url: uri,
    onload: function(resp) {
      // GM_log('onload(' + resp.readyState + ', ' + resp.status + ')');
      if(resp.readyState == 4) {
        if(resp.status == 200 || resp.status == 304) {
          var resultUrl = resp.finalUrl;

          g_dropbox_text.innerHTML =
            'Loading <a href="' + resultUrl + '" target="_top" ' +
            'onclick="return false;" title="NoScript users, click here" style="text-decoration: none; color: inherit">' +
            'results</a> ...';

          g_dropbox_text.innerHTML = "Drop an image here"; // reset

          switch(GM_getValue('show', 'cur')) {
            case 'win':
              // XXX: the popup blocker won't like that ...
              window.open(resultUrl);
              break;
            case 'tab':
              GM_openInTab(resultUrl);
              break;
            case 'cur':
            default:
              window.location.href = resultUrl;
              break;
          }
        } else {
          GM_log('onload(' + JSON.stringify(resp) + ')');
          g_dropbox_text.innerHTML = 'Error<br /><span style="font-size: x-small">(check console)</span>';
        }
      }
    },
    onerror: function(resp) {
      GM_log('onerror(' + JSON.stringify(resp) + ')');
      g_dropbox_text.innerHTML = 'Error<br /><span style="font-size: x-small">(check console)</span>';
    },
    headers: {
      "Content-Type": 'multipart/form-data, boundary="' + boundary + '"',
    },
    data: body,
    binary: true,
  });
}

var g_options_pane = null;
var g_op_document  = null;
var g_op_form      = null;
var g_top_doc      = null;

function showOptions() {
  if(g_options_pane != null) return; // BUG

  // Create the option box. We use an IFRAME so that the box doesn't inherit the CSS properties from the website.
  // TODO: try to get ride of the iframe taking advantage of the removeComputedStyle() method.
  g_options_pane = g_top_doc.createElement("iframe");

  // NOTE: the 'm2e_' prefix makes sure our elements ID is unique.
  g_options_pane.src = "data:text/html;charset=utf-8," + escape(
    '<html><head><title></title></head><body style="text-align: center">'
      + '<div style="display: inline-block; margin: auto; padding: 5px; padding-left: 15px; padding-right: 15px; margin-top: 200px; border: 1px solid #5c0d12;'
      + ' background-color: #edebdf; font-family: arial,helvetica,sans-serif; font-size: 8pt; text-align: center; color: #5c0d11; width: auto">'
        + '<div style="font-size: 10pt; font-weight: bold; margin-bottom: 15px">- Image Search Options -</div>'
        + '<form id="m2e_form" name="m2e_form" action="javascript:void(0)" method="GET">'
          + 'Display Search Results In: <input type="radio" name="show" id="m2e_show_cur" value="cur" /><label for="m2e_show_cur">Current Window</label> '
            + '<input type="radio" name="show" id="m2e_show_win" value="win" /><label for="m2e_show_win">New Window</label> '
            + '<input type="radio" name="show" id="m2e_show_tab" value="tab" /><label for="m2e_show_tab">New Tab</label><br /><br />'

          + '<input type="checkbox" name="fs_similar" id="m2e_fs_similar" /><label for="m2e_fs_similar">Similarity Scan</label>'
          + '&nbsp;&nbsp;<input type="checkbox" name="fs_covers" id="m2e_fs_covers" /><label for="m2e_fs_covers">Only Search Covers</label>'
          + '&nbsp;&nbsp;<input type="checkbox" name="fs_exp" id="m2e_fs_exp" /><label for="m2e_fs_exp">Show Expunged</label><br /><br />'

          + '<input type="checkbox" name="hotkey" id="m2e_hotkey" /><label for="m2e_hotkey">Access Key = Alt +</label> '
          + '<input type="text" name="key" id="m2e_key" style="width: 2em" ></input><br /><br />'

          + 'Input Type: <input type="radio" name="input" id="m2e_input_dnd" value="dnd" /><label for="m2e_input_dnd">Drag&Drop</label> '
            + '<input type="radio" name="input" id="m2e_input_click" value="click" disabled="disabled" /><label for="m2e_input_click">Image Click</label><br /><br />'

          + '<input type="button" name="apply" id="m2e_apply" value="Apply" style="background-color: #edeada; color: #5c0d11; border-color: #5c0d11; font-size: 8pt" />&nbsp;&nbsp;'
            + '<input type="button" name="cancel" id="m2e_cancel" value="Cancel" style="background-color: #edeada; color: #5c0d11; border-color: #5c0d11; font-size: 8pt" />'
      + '</form></div>'
    + '</body></html>');

  g_options_pane.style.position  = 'fixed';
  g_options_pane.style.top       = '0';
  g_options_pane.style.bottom    = '0';
  g_options_pane.style.right     = '0';
  g_options_pane.style.left      = '0';
  g_options_pane.style.zIndex    = 65535;
  g_options_pane.style.display   = 'none';
  g_options_pane.style.width     = '100%';
  g_options_pane.style.height    = '100%';
  g_options_pane.style.border    = 'none';
  g_options_pane.style.backgroundColor   = 'rgba(227, 224, 209, 0.75)'; // #e3e0d1

  g_top_doc.body.appendChild(g_options_pane);

  // We have to wait for the IFRAME to be loaded in order to access the DOM elements.
  g_options_pane.addEventListener("load",
    function() {
      g_op_document = g_options_pane.contentDocument;
      g_op_form = g_op_document.getElementById('m2e_form');

      g_op_document.getElementById('m2e_show_' + GM_getValue('show', 'cur')).checked = true;
      g_op_document.getElementById('m2e_fs_similar').checked = GM_getValue('fs_similar', true);
      g_op_document.getElementById('m2e_fs_covers').checked = GM_getValue('fs_covers', false);
      g_op_document.getElementById('m2e_fs_exp').checked = GM_getValue('fs_exp', true);
      g_op_document.getElementById('m2e_input_dnd').checked = true;

      g_op_document.getElementById('m2e_hotkey').addEventListener('change', function() {
        var disabled = !g_op_document.getElementById('m2e_hotkey').checked;
        g_op_document.getElementById('m2e_key').disabled = disabled;
      }, true);

      g_op_document.getElementById('m2e_key').value = GM_getValue('hotkey', 'i');
      g_op_document.getElementById('m2e_key').disabled = !(g_op_document.getElementById('m2e_hotkey').checked = GM_getValue('use_hotkey', true));

      g_op_document.getElementById('m2e_cancel').addEventListener('click', hideOptions, true);
      g_op_document.getElementById('m2e_apply').addEventListener('click', applyOptions, true);

      g_options_pane.style.display = '';
    }, false
  );
}

function hideOptions() {
  if(g_options_pane == null) return;  // BUG

  g_op_document.getElementById('m2e_cancel').removeEventListener('click', hideOptions, true);

  g_top_doc.body.removeChild(g_options_pane);
  g_options_pane = null;
}

function applyOptions() {
  if(g_options_pane == null) return;  // BUG

  for(var i in g_op_form.elements['show']) {
    if(g_op_form.elements['show'][i].checked) {
      GM_setValue('show', '' + g_op_form.elements['show'][i].value);
      break;
    }
  }

  /* Save the new options values. */
  GM_setValue('fs_similar', g_op_document.getElementById('m2e_fs_similar').checked ? true : false);
  GM_setValue('fs_covers', g_op_document.getElementById('m2e_fs_covers').checked ? true : false);
  GM_setValue('fs_exp', g_op_document.getElementById('m2e_fs_exp').checked ? true : false);
  GM_setValue('hotkey', ('' + g_op_document.getElementById('m2e_key').value).toLowerCase());
  GM_setValue('use_hotkey', g_op_document.getElementById('m2e_hotkey').checked ? true : false);

  hideOptions();
}

function toggleOptions() {
  if(g_options_pane == null) showOptions();
  else hideOptions();
}

function install_hotkey(wnd) {
  /* XXX: when an iframe or a window unloads, the focus is not always given back to the window
   *      that is shown, so our handler won't be called :(
   */
  wnd.addEventListener('keydown', function(e) {
    if(GM_getValue('use_hotkey', true) && e.altKey
       && String.fromCharCode(e.which).toLowerCase() == GM_getValue('hotkey', 'i')) {
      e.preventDefault();
      e.stopPropagation();

      if(window == window.top) toggleImageSearch();
      else {
        // Send a similar event to the top window
        var evt = document.createEvent("KeyboardEvent");
        evt.initKeyEvent(
          "keydown",       //  typeArg,
          true,            //  canBubbleArg,
          true,            //  cancelableArg,
          window.top,      //  viewArg,  /* Specifies UIEvent.view. */
          false,           //  ctrlKeyArg,
          true,            //  altKeyArg,
          false,           //  shiftKeyArg,
          false,           //  metaKeyArg,
          GM_getValue('hotkey', 'i').charCodeAt(0), //  keyCodeArg,
          0                //  charCodeArg
        );
        window.top.dispatchEvent(evt);
      }
    }
  }, true);
}

function init() {
  try {
    g_top_doc = window.top.document;
  } catch(e) {
    /* If the (i)frame is from another website, it can't access
     * the top window document, so we won't be able to forward
     * the hotkey to the top window.
     */
    return;
  }

  // Install only on the top window
  if(window == window.top) {
    GM_registerMenuCommand("Toggle image search", toggleImageSearch);
    GM_registerMenuCommand("Toggle image search options", toggleOptions);

//     toggleImageSearch();  // DEBUG
  }

  install_hotkey(window);
}

init();