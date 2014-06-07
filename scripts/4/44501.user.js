// ==UserScript==
// @name           Twitter Colorize
// @namespace      http://ellab.org/
// @version        2
// @author         angusdev
// @description    Assign color for different friends
// @include        http://twitter.com/*
// ==/UserScript==

/*
Author: Angus http://angusdev.mysinablog.com/
              http://angusdev.blogspot.com/
Date:   2009-03-24

Version history:
2    24-Mar-2009    Improve compatibility with other addons or user scripts
                    Fine tune the color selection
1    19-Mar-2009    First release to userscripts.org
*/

(function() {

var colorSetting = new Array();

function setStyle(username, color) {
  if (color) {
    GM_addStyle('.u-' + username + ' .status-body {background-color:' + color + ';}');
  }
  else {
    GM_addStyle('.u-' + username + ' .status-body {background:transparent;}');
  }
}

function updateColorSetting(username, color) {
  var updated = false;

  for (var i=0;i<colorSetting.length;i++) {
    if (colorSetting[i].username == username) {
      colorSetting[i].color = color;
      updated = true;
      break;
    }
  }
  if (!updated) {
    colorSetting.push({username:username, color:color});
  }

  writeColorSetting();
}

function writeColorSetting() {
  var str = '';
  for (var i=0;i<colorSetting.length;i++) {
    if (colorSetting[i].color) {
      str = str + (str?'|':'') + colorSetting[i].username + ';' + colorSetting[i].color;
    }
  }
  GM_setValue('colorsetting', str);
  if (window.sessionStorage) {
    window.sessionStorage.setItem('colorsetting', str)
  }
}

function calcOffsetTop(e) {
  var top = 0;
  do {
    if (!isNaN(e.offsetTop)) top += e.offsetTop;
  } while (e = e.offsetParent);

  return top;
}

function calcOffsetLeft(e) {
  var left = 0;
  do {
    if (!isNaN(e.offsetLeft)) left += e.offsetLeft;
  } while (e = e.offsetParent);

  return left;
}

function showColorPicker(e) {
  var picker = document.getElementById('twitter-colorize-colorpicker');
  picker.setAttribute('twitter-colorize-target', e.target.parentNode.parentNode.parentNode.getAttribute('id'));
  picker.style.display = '';

  var offsetTop = calcOffsetTop(e.target);
  var scrollBottom = document.documentElement.scrollTop + document.documentElement.clientHeight;
  var top = offsetTop + e.target.clientHeight + 5;
  if (top + picker.clientHeight + 10 > scrollBottom) {
    top = Math.max(offsetTop - picker.clientHeight - 5, document.documentElement.scrollTop + 10);
  }
  picker.style.top = top + 'px';

  var left = Math.max(calcOffsetLeft(e.target) - picker.clientWidth - 5, document.documentElement.scrollLeft + 10);
  picker.style.left = left + 'px';
}

function onPaletteMouseOut(e, picker, close) {
  var pickerTarget = picker.getAttribute('twitter-colorize-target');
  pickerTarget = pickerTarget?document.getElementById(pickerTarget):pickerTarget;
  if (pickerTarget) {
    pickerTarget.getElementsByClassName('status-body')[0].style.backgroundColor = '';
  }

  if (close) {
    picker.setAttribute('twitter-colorize-target', '');
    picker.style.display = 'none';
  }
}

function onPaletteMouseClick(e, picker, color) {
  var pickerTarget = picker.getAttribute('twitter-colorize-target');
  pickerTarget = pickerTarget?document.getElementById(pickerTarget):pickerTarget;
  if (pickerTarget) {
    var username = pickerTarget.className.match(/\su\-([a-zA-Z0-9_\-]+)$/);
    if (!username) {
      // for some addons or user scripts they may modify append other class name, so check for space after instead of eol
      username = pickerTarget.className.match(/\su\-([a-zA-Z0-9_\-]+)\s+/);
    }
    username = username?username[1]:username;

    if (username) {
      setStyle(username, color);
      updateColorSetting(username, color);
      pickerTarget.style.backgroundColor = '';
    }
  }

  picker.setAttribute('twitter-colorize-target', '');
  picker.style.display = 'none';
}

function createColorPicker(e) {
  var colorcode = 'fedca8';
  var picker = document.createElement('div');
  picker.setAttribute('id', 'twitter-colorize-colorpicker');
  picker.setAttribute('style', 'position:absolute; padding:10px;' +
                               'border:1px solid #c33;-moz-border-radius:5px;' +
                               'background-color:#ddf;' +
                               'display:none;');

  var html = ''
  var count = 0;
  for (var b=0;b<6;b++) {
    for (var g=0;g<6;g++) {
      for (var r=0;r<6;r++) {
        var color = '#' + colorcode[r] + colorcode[g] + colorcode[b];
        if (count++ % 18 == 0) {
          html = html + (html?'</tr>':'') + '<tr>';
        }
        html = html + '<td style="background-color:' + color + '"></td>';
      }
    }
  }
  html = '<table width="253" height="157" border="0" cellspacing="1" cellpadding="0">' + html + '</tr></table>';
  picker.innerHTML = html;

  // click to set the css
  picker.addEventListener('click', function(evt) {
    if (evt.target.tagName.toUpperCase() == 'TD') {
      onPaletteMouseClick(evt, picker, evt.target.style.backgroundColor);
    }
  }, false);

  // mouse over change the preview background color
  picker.addEventListener('mouseover', function(evt) {
    var pickerTarget = picker.getAttribute('twitter-colorize-target');
    pickerTarget = pickerTarget?document.getElementById(pickerTarget):pickerTarget;
    if (pickerTarget) {
      if (evt.target.tagName.toUpperCase() == 'TD') {
        var color = evt.target.style.backgroundColor;
        pickerTarget.getElementsByClassName('status-body')[0].style.backgroundColor = color;
      }
    }
  }, false);

  // mouse out reset the preview background color
  picker.addEventListener('mouseout', function(e) { onPaletteMouseOut(e, picker, false); }, false);

  var closeButton = document.createElement('input');
  closeButton.type = 'button';
  closeButton.value = 'Close';
  closeButton.setAttribute('style', 'margin:8px 5px 0px 5px;');
  closeButton.addEventListener('click', function(e) { onPaletteMouseOut(e, picker, true); }, false);

  var clearButton = document.createElement('input');
  clearButton.type = 'button';
  clearButton.value = 'Clear';
  clearButton.setAttribute('style', 'margin:8px 5px 0px 5px;');
  clearButton.addEventListener('click', function(e) { onPaletteMouseClick(e, picker, null); }, false);

  picker.appendChild(clearButton);
  picker.appendChild(closeButton);

  document.body.appendChild(picker);
}

function init() {
  createColorPicker();
  GM_addStyle('span.status-body {padding:5px;-moz-border-radius:5px;margin-right:3px;}');

  GM_registerMenuCommand('Remove all settings', function() {
    if (GM_deleteValue) {
      GM_deleteValue('colorsetting');
      if (window.sessionStorage) {
        window.sessionStorage.removeItem('colorsetting');
      }
      document.location.reload();
    }
  });

  // parse color setting
  var colorSettingStr = window.sessionStorage?window.sessionStorage.getItem('colorsetting'):null;
  colorSettingStr = colorSettingStr?colorSettingStr.value:GM_getValue('colorsetting');
  if (colorSettingStr) {
    var splitted = colorSettingStr.split('|');
    for (var i=0;i<splitted.length;i++) {
      var splitted2 = splitted[i].split(';');
      if (splitted2.length == 2) {
        colorSetting.push({username:splitted2[0], color:splitted2[1]});
        setStyle(splitted2[0], splitted2[1]);
      }
    }
  }

  var res = document.evaluate("//ol[@id='timeline']/li//span[@class='actions']/div", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i=0;i<res.snapshotLength;i++) {
    var item = res.snapshotItem(i);
    var a = document.createElement('a');
    a.href = 'javascript:void(0)';
    a.setAttribute('style', 'color:#aaa; font-size:9px;cursor:pointer;text-align:center;margin-bottom:2px;');
    a.innerHTML = 'CZ';
    a.title = 'Twitter Colorize';
    a.addEventListener('click', function(e) {
      showColorPicker(e);
    }, false);
    item.appendChild(a);
  }
}

init();

})();