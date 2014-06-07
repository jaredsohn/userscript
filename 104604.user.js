// ==UserScript==
// @name           E-Hentai Upload Progress
// @description    Show an upload progress bar when uploading files, and allow multiple files selection at once. WARNING: you'll have to disable that script in order to upload files bigger than 96MB on FF3.6.
// @icon           http://g.e-hentai.org/favicon.ico
// @namespace      hf
// @include        http://ul.e-hentai.org/manage.php?act=add&*
// @include        http://ul.exhentai.org/manage.php?act=add&*
// @version        1.5
// ==/UserScript==

/* Helpers */

// Shortcuts
function getel(el) {if(el) return el; return document;}
function gid(id, el) {return getel(el).getElementById(id);}
function gtag(tag, el) {return getel(el).getElementsByTagName(tag);}
function gclass(className, el) {return getel(el).getElementsByClassName(className);}
function qselall(query, el) {return getel(el).querySelectorAll(query);}
function qsel(query, el) {return getel(el).querySelector(query);}
function newel(tag, el) {return getel(el).createElement(tag);}

function insertBefore(newel, el) {
  return el.parentNode.insertBefore(newel, el);
}

function insertAfter(newel, el) {
  var next = el.nextSibling;
  if(!next) return el.parentNode.appendChild(newel);
  return el.parentNode.insertBefore(newel, next);
}

// Convert a JS String from Unicode to UTF-8
function toUtf8(str) {
  var res = '';
  for(var i = 0 ; i < str.length ; ++i) {
    var c = str.charCodeAt(i);
    if(c < 0x80) res += String.fromCharCode(c);
    else if(c < 0x0800) {
      res += String.fromCharCode(0xC0 | (c >> 6), 0x80 | (c & 0x3F));
    } else if(c < 0x10000) {
      res += String.fromCharCode(0xE0 | (c >> 12), 0x80 | ((c >> 6) & 0x3F), 0x80 | (c & 0x3F));
    }
    // The following cannot happen
    else if(c < 0x200000) {
      res += String.fromCharCode(0xF0 | (c >> 18), 0x80 | ((c >> 12) & 0x3F), 0x80 | ((c >> 6) & 0x3F), 0x80 | (c & 0x3F));
    } else if(c < 0x4000000) {
      res += String.fromCharCode(0xF8 | (c >> 24), 0x80 | ((c >> 18) & 0x3F), 0x80 | ((c >> 12) & 0x3F), 0x80 | ((c >> 6) & 0x3F), 0x80 | (c & 0x3F));
    } else /* if(c < 0x80000000) */ {
      res += String.fromCharCode(0xFC | (c >> 30), 0x80 | ((c >> 24) & 0x3F), 0x80 | ((c >> 18) & 0x3F), 0x80 | ((c >> 12) & 0x3F), 0x80 | ((c >> 6) & 0x3F), 0x80 | (c & 0x3F));
    }
  }

  return res;
}

if(window.chrome) {
  /* aeosynth implementations */
  GM_setValue = function(name, value) {
    value = (typeof value)[0] + value;
    localStorage.setItem(name, value);
  };

  GM_getValue = function(name, defaultValue) {
    var value = localStorage.getItem(name);
    if (!value) return defaultValue;
    var type = value[0];
    value = value.substring(1);
    switch (type) {
      case 'b': return value == 'true';
      case 'n': return Number(value);
      default: return value;
    }
  };
}

/* Script core */

var g_cur_idx = undefined;
var g_cur_file_idx = 0;
var g_err_msg = '';
var g_last_status = undefined;
var uploadform = gid('uploadform');
var g_autoscroll = true;
var g_upload_size = 0;    /* The whole number of bytes to upload. */
var g_upload_start = 0;   /* When the upload started in ms (since epoch). */
var g_uploaded_bytes = 0; /* The whole number of bytes uploaded so far. */
var g_upload_info = undefined;  /* A HTML element where the upload info are shown. */

function updateStatusScroll() {
  if(!g_autoscroll) return;

  var status_div = gid('status_div');
  status_div.scrollTop = status_div.scrollHeight;
}

function uploadNextFile() {
  // Find the next file to upload
  var el = uploadform.elements[g_cur_idx];
  if(!(el.files && ++g_cur_file_idx < el.files.length)) {
    g_cur_file_idx = 0;
    do {
      ++g_cur_idx;

      if(g_cur_idx >= uploadform.elements.length) {
//       if(g_err_msg != '') alert(g_err_msg);
        // We're done uploading all the files
        var url, label;
        if(gid('ulact').value == 'ulmore') {
          url = document.location.href;
          label = 'Add More';
        } else {
          url = document.location.href.replace(/act=add/, 'act=preview');
          label = 'Continue';
        }

        if(g_last_status) {
          var button = newel('input');
          button.type = 'button';
          button.value = label;
          button.className = 'stdbtn';
          button.style.width = '150px';
          button.addEventListener('click', function() {
            document.location.href = url;
          }, true);
          insertAfter(button, g_last_status.parentNode);
        } else {
          document.location.href = url;
        }

        return;
      }

      el = uploadform.elements[g_cur_idx];

//     GM_log("Debug: uploadNextFile(" + el.name + ")");

      if(!el.type.match(/^file$/i)) continue;
      if(el.files.length != 0) break;
    } while(true);
  }

  setProgress('ulp' + g_cur_idx, g_cur_file_idx / el.files.length);

  var file = el.files[g_cur_file_idx];
  var xhr = new XMLHttpRequest();

  xhr.upload.addEventListener("progress", function(e) {
    if(e.lengthComputable) {
      setProgress('ulp' + g_cur_idx, (g_cur_file_idx + e.loaded / e.total) / el.files.length);
      setUploadInfo(g_uploaded_bytes + e.loaded);
    }
  }, false);

  xhr.upload.addEventListener("load", function(e){
    // XXX: 'load' is sent when the server answers, not when the upload completes on FF :(
    setProgress('ulp' + g_cur_idx, (g_cur_file_idx + 1) / el.files.length);
    g_last_status.innerHTML = g_last_status.innerHTML.replace(/^\S+/, 'Processing');
    updateStatusScroll();
  }, false);

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if ((xhr.status >= 200 && xhr.status <= 200) || xhr.status == 304) {
        //GM_log(xhr.responseText);
        var html = xhr.responseText;

        // Check for error or processing messages
        var matches;
        matches = html.match(/<div class="ui">(.+)\r?\n/);
        if(matches) {
          // Add the message to the status log
          g_last_status.innerHTML = matches[1];
          var last_child = g_last_status.lastChild

          while(g_last_status.firstChild) {
            var child = g_last_status.removeChild(g_last_status.lastChild);
            insertAfter(child, g_last_status);
          }

          if(last_child) {
            g_last_status.parentNode.removeChild(g_last_status);
            g_last_status = last_child;
          }

          updateStatusScroll();
        } else {
          g_last_status.innerHTML += ' <span style="color: green"><b>OK</b></span>';
        }

//         var re = /<p style="color:red; font-weight:bold; text-align:center">([^<]+)<\/p>/gi;
//         while(matches = re.exec(html)) {
//           g_err_msg += matches[1] + "\n";
//           GM_log("Error: " + matches[1]);
//         }

        g_uploaded_bytes += file.size ? file.size : file.fileSize;

        uploadNextFile();
      } else {
        alert("Error while uploading the file.");
      }
    }
  };

  var status = newel('p');
  status.style.textAlign = "center";
  status.innerHTML = 'Preparing <b>' +
                     (file.fileName ? file.fileName : file.name) + '</b> ...';

  if(g_last_status == undefined) {
    var div = newel('div');
    div.addEventListener('scroll', function(e) {
      g_autoscroll = (e.target.scrollTop + 100) >= e.target.scrollHeight;
    }, true);
    div.style.maxHeight = '100px';
    div.style.overflow = 'auto';
    div.id = 'status_div';

    insertBefore(div, qsel('div.ui').firstChild);
    div.appendChild(status);
  } else {
    insertAfter(status, g_last_status);
  }
  updateStatusScroll();
  g_last_status = status;

  xhr.open("POST", uploadform.action, true);

  if(typeof(FormData) != "undefined") {  /* Need FF4+ or Chrome7+ */
    // Create a custom form and post it.
    var formData = new FormData();
    formData.append(el.name, file);
    // XXX: sending the form fields before the file doesn't always work.
    for(var i = 0 ; i < uploadform.elements.length ; ++i) {
      var field = uploadform.elements[i];

      if(field.type.match(/^(file|submit|button)$/i)) continue;
      formData.append(field.name, (field.name == 'ulact' ? 'uldone' : field.value));
    }

    g_last_status.innerHTML = g_last_status.innerHTML.replace(/^\S+/, 'Uploading');
    xhr.send(formData);
  } else  {
    // Build the HTTP request body, and send it.
    // XXX: the whole file content is stored in memory.
    var boundary = "ehtuplprgs" + Math.round(Math.random() * 1000);

    xhr.overrideMimeType("multipart/form-data, boundary=" + boundary);
    xhr.setRequestHeader("Content-Type", "multipart/form-data, boundary=" + boundary);

    var fields = '';
    for(var i = 0 ; i < uploadform.elements.length ; ++i) {
      var field = uploadform.elements[i];

      if(field.type.match(/^(file|submit|button)$/i)) continue;

      fields += "--" + boundary + "\r\n";
      fields += 'Content-Disposition: form-data; name="' + field.name + '"\r\n\r\n';
      fields += (field.name == 'ulact' ? 'uldone' : field.value) + "\r\n";
    }

    var reader = new FileReader();
    reader.onload = function(evt) {
      var ctype = file.type;
      if(ctype == "") ctype = "application/octet-stream";

      try {
        var body = "--" + boundary + "\r\n";
        var fileName = '';

        // NOTE: the file name should be converted to UTF-8 for xhr.sendAsBinary() to work.
        body += 'Content-Disposition: form-data; name="' + el.name + '"; filename="' + toUtf8(file.name) + '"\r\n';
        body += "Content-Type: " + ctype + "\r\n\r\n";
        body += evt.target.result + "\r\n";
        // XXX: sending the form fields before the file doesn't always work.
        body += fields;
        body += "--" + boundary + "--\r\n";
      } catch(e) {
        // We might reach the memory limit when adding the fields.
        GM_log(e);
        reader.onerror(evt);
        return;
      }

      g_last_status.innerHTML = g_last_status.innerHTML.replace(/^\S+/, 'Uploading');

      xhr.sendAsBinary(body);
    };
    reader.onerror = function(e) {
      // There seems to exist a 96MB limit to the JS string size.
      g_last_status.innerHTML =
        '<b>Error while preparing ' + file.name + '.</b> Loaded '
        + e.loaded + ' bytes on ' + e.total + '.';
      g_last_status.style.color = 'red';
      GM_log("Error while preparing " + file.name + ".\n\nLoaded " + e.loaded + " bytes on " + e.total + ".");

      uploadNextFile();
    }
    reader.readAsBinaryString(file);
  }
}

function onUpload(e) {
//   GM_log("Debug: onUpload(" + e + ")");

  if(g_cur_idx == undefined) {
    for(var i = 0 ; i < uploadform.elements.length ; ++i) {
      uploadform.elements[i].disabled = true;
    }

    if(!gid('ulp_check').checked) {
      // XXX: onUpload() can't be called anymore if ulp is disabled.
      GM_log("Legacy upload.");
      uploadform.removeEventListener('submit', onUpload, true);
      //document.location.href = 'javascript:document.getElementById("uploadform").submit();';
      //uploadform.submit();
      return true;
    }

    g_cur_idx = 0;
    g_cur_file_idx = -1;

    /* Compute the whole upload size. */
    g_upload_size = 0;
    for(var i = uploadform.elements.length  - 1 ; i >= 0 ; --i) {
      var el = uploadform.elements[i];
      if(!el.files) continue;

      for(var j = el.files.length - 1 ; j >= 0 ; --j) {
        var file = el.files[j];
        if(file.fileSize) g_upload_size += el.files[j].fileSize; // obsolete
        else g_upload_size += el.files[j].size;
      }
    }
    g_upload_start = Date.now();
    setUploadInfo(0);

    uploadNextFile();
  }

  if(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  return false;
}

function setProgress(base, val) {
  var border = gid(base + '_border');
  var label = gid(base + '_label');
  var progress = gid(base + '_progress');

  border.style.visibility = 'visible';

  val = Math.floor(val * 100);
  label.textContent = val + '%';
  progress.style.width = val + '%';
}

function setUploadInfo(size) {
  if(size <= 0) {
    // Init
//    g_upload_info.innerHTML = 'Upload speed: n/a (0/'
//      + g_upload_size + ') | ETA: n/a';
    g_upload_info.innerHTML = 'Upload speed: n/a | ETA: n/a';
    return;
  }

  var now = Date.now();
  if(now <= g_upload_start + 5000) return;

  var rate = size * 1000 / (now - g_upload_start);  // Bps
  var eta = (g_upload_size - size) / rate;

  var rate_unit = 'Bps';
  if(rate >= 1024*1024*1024) {
    rate_unit = 'GBps';
    rate /= 1024*1024*1024;
  } else if(rate >= 1024*1024) {
    rate_unit = 'MBps';
    rate /= 1024*1024;
  } else if(rate >= 1024) {
    rate_unit = 'KBps';
    rate /= 1024;
  }
  rate = new String(Math.round(rate * 10) / 10);
  if(rate.indexOf('.') < 0) rate += '.0';

  var eta_str = '';
  if(eta >= 3600) {
    var h = Math.floor(eta / 3600);
    eta = eta - (h * 3600);
    if(h < 10) eta_str += '0';
    eta_str += h + 'h';
  }
  if(eta >= 60) {
    var m = Math.floor(eta / 60);
    eta = eta - (m * 60);
    if(m < 10) eta_str += '0';
    eta_str += m + 'min';
  }
  eta = Math.round(eta);
  if(eta < 10) eta_str += '0';
  eta_str += eta + 's';

//  g_upload_info.innerHTML = 'Upload speed: ' + rate + rate_unit + ' ('
//    + size + '/' + g_upload_size + ') | ETA: ' + eta_str;
  g_upload_info.innerHTML = 'Upload speed: ' + rate + rate_unit
    + ' | ETA: ' + eta_str;
}

function onPreUpload(e) {
  /* This function does the same things as unsafeWindow.submit_upload(),
   * but doesn't submit the form.
   */
  gid("ulmore").disabled = "disabled";
  gid("ulmore").value = "Uploading...";
  gid("uldone").disabled = "disabled";
  gid("uldone").value = "Uploading...";
  gid("ulact").value = e.target.name;

  return onUpload(e);
}

function setSubmitHook(enabled) {
  /* NOTE: even if the "click" event is canceled, the "onclick" code is still
   *       executed in Chrome ...
   */
  /* NOTE: submiting the uploadform from the user script doesn't seem to work
   *       properly with Chrome, that's why we play with the onclick value here.
   */
  if(enabled) {
    gid('ulmore').addEventListener('click', onPreUpload, true);
    gid('uldone').addEventListener('click', onPreUpload, true);

    gid('ulmore').setAttribute('onclick',  'return false;' + gid('ulmore').getAttribute('onclick'));
    gid('uldone').setAttribute('onclick',  'return false;' + gid('uldone').getAttribute('onclick'));
  } else {
    gid('ulmore').removeEventListener('click', onPreUpload, true);
    gid('uldone').removeEventListener('click', onPreUpload, true);

    gid('ulmore').setAttribute('onclick',  gid('ulmore').getAttribute('onclick').replace(/^return false;/, ''));
    gid('uldone').setAttribute('onclick',  gid('uldone').getAttribute('onclick').replace(/^return false;/, ''));
  }
}

function init() {
  if(!uploadform) {
    GM_log("Error: cannot find the upload form.");
    return;
  }

  var input_div = undefined;

  // Create the upload progress elements
  for(var i = 0 ; i < uploadform.elements.length ; ++i) {
    var el = uploadform.elements[i];
    if(!el.type || !el.type.match(/^file$/i)) continue;

    el.multiple = GM_getValue('enabled', true);

    var border = newel('div');
    border.id = 'ulp' + i + '_border';
    border.style.height = '14px';
    border.style.padding = '0px';
    border.style.margin = '0px';
    border.style.marginRight = '5px';
    border.style.display = 'inline-block';
    border.style.border = '1px solid #5C0D12';
    border.style.visibility = 'hidden';
    insertBefore(border, el.parentNode.firstChild);
    // Adapt the progress bar width to the page layout
    border.style.width = (border.offsetLeft - 2) + 'px';

    var label = newel('span');
    label.id = 'ulp' + i + '_label';
    label.textContent = '0%';
    label.style.height = '100%';
    label.style.width = '100%';
    label.style.textAlign = 'center';
    label.style.cssFloat = 'right'; // the text isn't centered without that ...
    border.appendChild(label);

    var progress = newel('div');
    progress.id = 'ulp' + i + '_progress';
    progress.style.height = '100%';
    progress.style.width = '0%';
    progress.style.background = '#A3A091';
    progress.style.position = 'relative';
    progress.style.zIndex = '-1';
    border.appendChild(progress);

//     setProgress('ulp' + i, Math.random()); // DEBUG

    if(!input_div) {
      /* Find the DIV that contains the file inputs. */
      for(input_div = el.parentNode ;
          input_div && input_div.tagName.toLowerCase() != 'div' ;
          input_div = input_div.parentNode);
    }
  }

  var ulpcheck = newel('input');
  ulpcheck.id = 'ulp_check';
  ulpcheck.type = 'checkbox';
  ulpcheck.checked = GM_getValue('enabled', true);
  ulpcheck.style.marginLeft = '10px';
  insertAfter(ulpcheck, gid('uldone'));

  var label = newel('label');
  label.htmlFor = 'ulp_check';
  label.innerHTML = 'Use Upload Progress Bars';
  insertAfter(label, ulpcheck);

  ulpcheck.addEventListener('change', function(e) {
    GM_setValue('enabled', ulpcheck.checked);
    setSubmitHook(ulpcheck.checked);

    for(var i = 0 ; i < uploadform.elements.length ; ++i) {
      var el = uploadform.elements[i];
      if(!el.type || !el.type.match(/^file$/i)) continue;

      if((el.multiple = ulpcheck.checked) == false && el.files.length > 1) {
        // Reset
        el.value = '';
      }
    }
  }, true);

  setSubmitHook(ulpcheck.checked);

  if(input_div) {
    g_upload_info = document.createElement('div');
    //g_upload_info.innerHTML = 'Upload speed: XXX.XXBps | ETA: XXhXXminXXs';
    g_upload_info.style.position = 'absolute';
    g_upload_info.style.top = '0';
    g_upload_info.style.left = '0';
    g_upload_info.style.backgroundColor = 'rgb(237, 235, 223)';
    g_upload_info.style.paddingRight = '5px';
    insertBefore(g_upload_info, input_div.firstChild);
  }
}

init();