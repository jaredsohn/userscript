// ==UserScript==
// @name          facebook.com - replace smileys FIXER
// @version       2.2
// @require       http://sizzlemctwizzle.com/updater.php?id=82375
// @description   Replace text smileys as graphics (graphics by facebook.com)
// @namespace     http://www.krakenstein.cz.cc
// @original      Kub4jz.cz <kub4jz@gmail.com> @ http://userscripts.org/scripts/show/49338
// @include       http://*.facebook.com/*
// @match         http://*.facebook.com/*
// @exclude       http://*.facebook.com/sharer*
// @exclude       http://*.facebook.com/ajax/*
// @exclude       http://*.facebook.com/plugins/*
// @exclude       http://apps.facebook.com/*
// @exclude       http://*facebook.com/apps/*
// ==/UserScript==

/**
**/

var chrome = /Chrome/.test(navigator.userAgent);
var unsafeWindow = this['unsafeWindow'] || window;

var blank_src = "http://static.ak.fbcdn.net/images/blank.gif";
var emot_src = "http://static.ak.fbcdn.net/images/emote/emote.gif";

var t,smile;

// # smileys
smiley = new Array();

smiley['pacman'] = ['(\:|;)v', 'pacman', '-304px'];// lol pacman 19
smiley['lol'] = ['(\:|;|=)[\\)]{2}', 'lol', '-304px'];

smiley['smiley'] = ['(\:|;|=)(\\-|(\­){1,2}|\\*)?\\){1}', 'smiley', '0px'];

smiley['frown'] = ['(\:|;)\-?(\\(|c)', 'frown', '-16px'];

smiley['tongue'] = ['(\:|;|=)\-?(P|p|B|b)', 'tongue', '-32px'];

smiley['wink'] = ['(\:|;)\-?[(D|d)]{1,}', 'wink', '-48px'];
//smiley['48px'] = ['(\:|;)\-?(D|d)', ':D', '-48px'];
//smiley['wink'] = ['(\:|;)\-?D', 'wink', '-48px'];

smiley['surprise'] = ['(\:|;)\-?(O|o)', 'surprise', '-64px'];

//80px

smiley['96px'] = ['8\-?\\)', '8-)', '-96px'];

smiley['112px'] = ['8\-?\\|', '8-|', '-112px'];

smiley['128px'] = ['>(\:|;)\-?\\(', '>:-(', '-128px'];

smiley['skeptical'] = ['(\:|;)\-?\\/', 'skeptical', '-144px'];//skeptical 9

smiley['crying_1'] = ['(T|t){1,2}(\\_|\\.)(T|t){1,2}', 'crying', '-160px'];//cry 10
smiley['crying_2'] = ['(\:|;)(\'|´|\\*)\\(', 'crying', '-160px'];//cry 10

smiley['evil'] = ['>(\:|;)\-?\\)', 'evil', '-176px'];//evil 11

smiley['angel'] = ['(O|o)(\:|;)\-?\\)', 'angel', '-192px'];//angel 12

smiley['kiss'] = ['(\:|;)(\\-|\­)?\\*', 'kiss', '-208px'];//kiss 13

smiley['love'] = ['(<3|♥|♡)', 'love', '-224px'];//love 14

smiley['240px'] = ['\\^\\_?\\^', 'kiss', '-240px'];//15

smiley['256px'] = ['\\-\\_\\-', 'kiss', '-256px'];//16

smiley['straight face'] = ['(\:|;)(\\-|(\­){1,2}|\')?\\|', 'straight face', '-272px'];//straight face 17

//smiley['>:-O'] = '-288px'; smiley['>:o'] = '-288px'; // 18

smiley['pig'] = [' (\:|;)3', 'pig', '-320px'];// pig 20



/**
smiley[':putnam:'] = 'putnam';
smiley['<(")'] = 'penguin';
smiley['(^^^)']  = 'shark';
smiley[':|]'] = 'robot';
smiley[':42:'] = '42';
**/
/////////////////////////////////


// # replaced elements class name
var gm_class = ' gm_smileys_replaced_fix';
var gm_yodbreak = '___gm_yodbreak___';

function g(id){if(id&&typeof id==='string'){id=document.getElementById(id);}return id||null;}
function c2(_q,_el){
  var res=[];var el,els=document.evaluate(_q,_el||document,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
  while (el=els.iterateNext()){res.push(el);}return res;
}
function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}
function insertAfter(node, after) { after.parentNode.insertBefore(node, after.nextSibling) }

function repb(retd){
  if(!retd) return;
  var ret = retd;
  ret.innerHTML = ret.innerHTML.replace("<br>", gm_yodbreak, 'gmi');
  var present = 0;
  var _start = '[START] ';
  var _end = ' [END]';
  var data = _start + ret.textContent.trim() + _end;

  for (smile in smiley) {
    var smile_orig = smile;
    if (data == null) {var data = _start + ret.textContent.trim() + _end;}
    var data = _start + ret.textContent.trim() + _end;
    var patt = new RegExp("(\\s|\\W|"+gm_yodbreak+")"+smiley[smile_orig][0]+"(?=\\s|\\W|"+gm_yodbreak+")","gmi");
    if (data && data.match(patt)) {
      present++;

      alt = smiley[smile_orig][1].replace(')', '&shy;)');
      alt = alt.replace('"', '&quot;');
      alt = alt.replace(':', '&#58;&shy;');
/**
      smile = smile.replace('>', '&gt;');
      smile = smile.replace('<', '&lt;');

      // smiles as penguin, shark, robot...
      if (!cek(smiley[smile_orig], 'px')) {
        ret.innerHTML = ret.innerHTML.replace(smile, ' <img class="emote_img"' +
        ' src="http://static.ak.fbcdn.net/images/emote/' + smiley[smile_orig] + '.gif"' +
        ' title="' + alt + '" alt="' + alt + '"/>', 'gmi');
        data = null; // data reset
        continue;
      }
**/
      var replace = ' <img title="' + smile_orig + '" alt="' + alt + '" class="emote_img"' +
        ' src="'+blank_src+'"' +
        ' style="position: relative; top: -1px; background: url('+emot_src+') no-repeat scroll ' + smiley[smile_orig][2] + ' top transparent;">';

      if (ret.innerHTML) {
        var patt2 = new RegExp(smiley[smile_orig][0],"gi");
        ret.innerHTML = ret.innerHTML.replace(patt2, replace);
        data = null; // data reset
      }
      continue;
    }
  }
  delete data; delete alt; delete replace; delete smile;
  //var ret = document.createElement(retd.tagName);
  ret.innerHTML = ret.innerHTML.replace(gm_yodbreak, "<br>", 'gmi');
  if(present) retd = ret;
  return present;
}

function applyTimeout(content) {
  clearTimeout( t );
  t = setTimeout(smileys, 1500);
}

function repp(el, go) {
//function repp(el) {
  //return repb(el);
  if(go<=0) return repb(el);
  var cnodes = el.childNodes;
  //if(!cnodes) cnodes = [el];
  var cnodes_l = cnodes.length;
  for(i = 0; i <= cnodes_l; i++) {
    var nodex = cnodes[i];
    if(!nodex) continue;
    if(nodex.tagName=='A') continue;
    if(nodex.innerHTML) {repb(nodex);continue;}
    if(nodex.nodeType!==3) continue;
    if(!nodex.nodeValue) continue;
    //if (!nodex.previousSibling) continue;
    var ret = document.createElement('span');
    ret.innerHTML = nodex.nodeValue;
    var present = repb(ret);
    if(present) {
      insertAfter(ret, nodex.previousSibling?nodex.previousSibling:nodex);
      nodex.nodeValue="";
    }
  }
}

function replace(elements, frc)
{
  count = elements.length - 1;
  if (count < 0) { return; }

  for(i = 0; i <= count; i++) {
    var el = elements[i];

    // is replaced?
    if (el.className.indexOf(gm_class) >= 0 ||
      el.className.indexOf('uiStreamPassive') >= 0 ||
      el.className.indexOf('GenericStory_Report') >= 0
    ) {
      continue;
    } else {
      el.className += gm_class;
      var elc = c2(".//a", el);
      repp(el, frc?-1:elc.length);
    }
    delete el;
  }

  delete el; delete elements;

  return false;
}

var htmlLength_before = 0;

function cek(str, reg)
{
  if(str) return str.match(reg);
}

function smileys()
{
  var c;
  if (c = g('content')||g('contentArea')) {
    htmlLength = c.innerHTML.length;
    delete c;

    if (htmlLength == htmlLength_before) {
      applyTimeout();
      return false;
    }

    htmlLength_before = htmlLength;
  }

  // get location
  var loc = document.location.toString();
  if (loc.length == 0 || !cek(loc, /sk=|ref=|php/g)) {
    loc = location.pathname.replace(new RegExp('^[/]+', 'g'), '');

    if (loc.length == 0) loc = location.search;
  }

  if (loc == '') { loc = 'home.php'; }

  var hehe2 = document.getElementsByClassName('UIStory_Message').length;
  var yodhome = g('pagelet_composer');

  if (yodhome) {
    replace(c2(".//*[contains(@class,'uiAttachmentDesc')]"));
    replace(c2(".//*[contains(@class,'commentContent')]"));
    replace(c2(".//*[contains(@class,'uiStreamMessage')]"), "uiStreamMessage");
  }

  // home statuses
  if (UIHome_Status = g('UIHome_Status')) {
    replace(c2(".//span", UIHome_Status));
  }

  //else
  //{
    // comments
    if (!hehe2 && cek(loc, /album.php|photo.php|video.php|video\/|note.php|notes.php|notes\/|posted.php/i)) {
      replace(c2(".//*[contains(@class,'commentContent')]"));
      replace(c2(".//span[contains(@class,'text_exposed_show')]"));
      // photo album
      if (cek(loc, /album.php/i)) {
        replace(c2(".//*[contains(@class,'uiHeaderTitle')]"));
        replace(c2(".//*[contains(@id,'albumDesc')]"));
        replace(c2(".//*[contains(@id,'fbPhotoCaption')]"));
      }
      // photo
      if (cek(loc, /photo.php/i)) {
        replace(c2(".//*[contains(@class,'photocaption_text')]"));
      }
      // video
      if (cek(loc, /video.php|video\//i)) {
        replace(c2(".//*[contains(@class,'title_h')]"));
        replace(c2(".//*[contains(@class,'video_title')]"));
      }
      // notes
      if (cek(loc, /note.php|notes.php|notes\//i)) {
        replace(c2(".//*[contains(@class,'note_content')]"));
        replace(c2(".//*[contains(@class,'commentContent')]"));
        replace(c2(".//span[contains(@class,'text_exposed_show')]"));
      }
    }

    // profile, groups wall, pages wall
    if (hehe2 || cek(loc, /story_fbid=|profile.php|group.php|event.php|pages\//i)) {//alert('SSS');
      var upstat = g('profile_status');
      if(upstat) upstat.innerHTML = upstat.innerHTML.replace(/<small>/, " <small>");
      replace(c2(".//*[contains(@id,'profile_status')]"));
      replace(c2(".//*[contains(@class,'UIStory_Message')]"));
      replace(c2(".//*[contains(@class,'commentContent')]"));
      replace(c2(".//span[contains(@class,'text_exposed_show')]"));
      //replace(c2(".//*[contains(@id,'status_text')]", g('profile_status')));
      replace(c2(".//*[contains(@class,'UIStoryAttachment_Copy')]"));
      replace(c2(".//*[contains(@class,'uiStreamMessage')]"));
    }

    if (cek(loc, /photo_comments.php/i)) {
      replace(c2(".//*[contains(@class,'walltext')]"));
    }

    // messages
    if (cek(loc, /sk=messages|sk=updates/i)) {
      replace(c2(".//*[contains(@class,'uiHeaderTitle')]"));
      replace(c2(".//*[contains(@class,'GBThreadMessageRow_Body_Content')]"));
      replace(c2(".//*[contains(@class,'preview')]"));
    }

    // topic messages
    if (cek(loc, /topic.php/i)) {
      replace(c2(".//*[contains(@class,'UIImageBlock_Content')]"));
    }
  //}
  applyTimeout();
  return false;
}

function starter()
{
  var home_stream = g('content') ? g('content') : g('contentArea');
  if (home_stream) {
    smileys();
    setTimeout( function () {
      //var dom = "DOMNodeInserted";
      var dom = "DOMSubtreeModified";
      home_stream.addEventListener(dom, function () { clearTimeout( t ); t = setTimeout( smileys, 80 ) }, false);
    }, 500);
  }
  delete home_stream;
}

unsafeWindow.addEventListener("load", function() { starter(); }, false);