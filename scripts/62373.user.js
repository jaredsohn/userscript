scr_meta=<><![CDATA[
// ==UserScript==
// @name           Facebook Video
// @description    Facebook.com uzerinde yayinlanan videolarin altina eklenecek kod ile videolari download ve convert edebilirsiniz ve ayrica web sitenizde yayinlamaniz icin embed videos kodu alabilirsiniz Zamzar ile farkli formatlara cevirmeniz  icin imkan saglamaktadir.!
// @version        1.0
// @include        http://*.facebook.com/*
// ==/UserScript==
]]></>;


function get_values(swfid) {
// Get the FLV and Embed Code
  values = new Array();
  if (unsafeWindow[swfid].getVariable('highqual_src')) { // Get High Quality if available
    src = unsafeWindow[swfid].getVariable('highqual_src');
    unsafeWindow[swfid].addVariable("video_src", unsafeWindow[swfid].getVariable('highqual_src'));
  } else { // Default to Low Quality if unavailable
    src = unsafeWindow[swfid].getVariable('video_src');
  }
  values[0] = decodeURIComponent(src);
  values[1] = "http://www.zamzar.com/url/?u=" + src;
  values[2] = unsafeWindow[swfid].getSWFHTML();
  return values;
}

function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}

function $(element) { return document.getElementById(element); }
function insertAfter(node, after) { after.parentNode.insertBefore(node, after.nextSibling);}

// Get the abosolute url of the current page
function current_url() {
  if (window.location.hash.match(/\.php/)) {
      return 'http://'+window.location.host+window.location.hash.split('#')[1];
    } else if (window.location.hash != '') {
      return window.location.hash.split('#')[0];
    } else {
      return window.location.href;
    }
}

// Add elements to a video page
function add_elements(swfid, values) {

  // Remove Facebook's Pathetic Embed link
  div = document.getElementById("actions_"+swfid);
  if (div.textContent.indexOf('Video Kodu') != -1) {
    lis = div.getElementsByTagName('li');
    for (i=0; i < lis.length; i++) {
      if (lis[i].textContent == 'Video Kodu') lis[i].parentNode.removeChild(lis[i]);
    }
  }
  
  // Embed Code
  link = document.createElement('a');
  link.href = "#";
  link.appendChild(document.createTextNode("Video Kodu"));
  link.addEventListener('click',function (e) {show_code(swfid); e.preventDefault();},false);
  code[swfid] = values[2];
  li = document.createElement('li');
  li.appendChild(link);

  // Wizard link
  link = document.createElement('a');
  link.href = "#";
  link.appendChild(document.createTextNode("Customize Code"));
  li2 = document.createElement('li');
  li2.appendChild(link);
  link.addEventListener('click',function (e) {run_wizard(swfid);e.preventDefault();},false);

  // Download Flv Link
  link = document.createElement('a');
  link.href = values[0];
  link.id = "download_" + swfid;
  link.appendChild(document.createTextNode("Videoyu indir"));
  li3 = document.createElement('li');
  li3.appendChild(link);

  // Convert Link
  link = document.createElement('a');
  link.href = values[1];
  link.id = "convert_" + swfid;
  link.appendChild(document.createTextNode("Convert Video"));
  li4 = document.createElement('li');
  li4.appendChild(link);

  // Public Links
 pubdiv = document.createElement('div');
 pubdiv.id = "public_link_photo";
 pubdiv.appendChild(document.createTextNode("Show people this video by sending them this public link: "));
 pubdiv.appendChild(document.createElement('span').appendChild(document.createTextNode(current_url())));

 // Append Elements
 ($('main_column')) ? insertAfter(pubdiv, $('main_column').parentNode) : void(0);
 var ul = document.evaluate('//ul[@class="actionspro"]', document, null, 
			    XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
 ul.appendChild(li);
 ul.appendChild(li2);
 ul.appendChild(li3);
 ul.appendChild(li4);
}

// Run the script if video posted on site besides a video page: feeds, walls, and messages
function posted_videos(swfid, values) {
  actions = document.getElementById("actions_"+swfid);
  actions.innerHTML = '<a href="' + values[0] + '" id="download_' + swfid + '">Videoyu indir</a> | <a href="' + values[1] + '" id="convert_' + swfid + '">çevir Videoyu</a> | <a href="#" id="embed_' + swfid + '">Video Kodu</a> | <a href="#" id="wizard_' + swfid +'">Video ayarla  | <a href="http://www.akderekoyu.com"> TURAN İNCELER </a>';
  actions.setAttribute('class', 'fb_vid_actions');
  // Embed Code
  $('embed_'+swfid).addEventListener('click',function (e) {show_code(swfid); e.preventDefault();},false);
  code[swfid] = values[2];
  // Wizard link
  $('wizard_'+swfid).addEventListener('click',function (e) {run_wizard(swfid); e.preventDefault();},false);
  // Add thumbnail to videos that don't have it
  unsafeWindow[swfid].addVariable("thumb_url", encodeURIComponent($(swfid+"_holder").getElementsByTagName("img")[0].getAttribute('src')));
}

// Respect Aspect Ratio
function fix_height(before, now, height, swfid) {
  percent = now/before;
  document.getElementById("width_"+swfid).addEventListener('blur',function () {
      now = document.getElementById("width_"+swfid).value;
      before = unsafeWindow[swfid].getVariable('stage_width');
      height = unsafeWindow[swfid].getVariable('stage_height');
      document.getElementById("height_"+swfid).value = fix_height(before, now, height, swfid);
    },false)
    return Math.round(percent*height);
}

function fix_width(before, now, width, swfid) {
  percent = now/before;
  document.getElementById("height_"+swfid).addEventListener('blur',function () {
      now = document.getElementById("height_"+swfid).value;
      before = unsafeWindow[swfid].getVariable('stage_height');
      width = unsafeWindow[swfid].getVariable('stage_width');
      document.getElementById("width_"+swfid).value = fix_width(before, now, width, swfid);
    },false)
    return Math.round(percent*width);
}

function show_code(swfid) {
  $('independent').style.display = 'block';
  $('independent').innerHTML = '<div style="top: 125px;" class="generic_dialog_popup"><table style="width: 487px;" id="pop_dialog_table" class="pop_dialog_table"><tbody><tr><td class="pop_topleft"></td><td class="pop_border pop_top"></td><td class="pop_topright"></td></tr><tr><td class="pop_border pop_side"></td><td class="pop_content" id="pop_content"><h2 class="dialog_title"><span>Embed video kodu</span></h2><div class="dialog_content"><div class="dialog_body"><div class="embed_description">Size herhangi bir web sitesinde video görüntü için bu kodu kullanabilirsiniz..</div><br><div>Embed code:<input size="40" class="code_block" onclick="this.focus(); this.select();" id="" name="" value=\''+code[swfid]+'\' type="text"></div></div><div class="dialog_buttons"><input class="inputsubmit" name="ok" value="Tamam" onclick="document.getElementById(\'independent\').style.display = \'none\';" type="button"></div></div></td><td class="pop_border pop_side"></td></tr><tr><td class="pop_bottomleft"></td><td class="pop_border pop_bottom"></td><td class="pop_bottomright"></td></tr></tbody></table></div>';
}

function run_wizard(swfid) {
  // Embed Wizard
  $('independent').style.display = 'block';
  wizard_html = '<div style="top: 125px;" class="generic_dialog_popup"><table style="width: 487px;" id="pop_dialog_table" class="pop_dialog_table"><tbody><tr><td class="pop_topleft"></td><td class="pop_border pop_top"></td><td class="pop_topright"></td></tr><tr><td class="pop_border pop_side"></td><td class="pop_content" id="pop_content"><h2 class="dialog_title"><span>Customize Embed Code</span></h2><div id="embed_options" style="padding:20px;"><p>'+
'<form id="custom_'+swfid+'"><table><tr><td><label>Video URL</label></td>'+
    '<td><input type="text" id="file_'+swfid+'" class="code_block" size="40" value="'+decodeURIComponent(unsafeWindow[swfid].getVariable('video_src'))+'" /></td></tr>'+
    '<tr><td><label>Thumb URL</label></td><td><input type="text" id="thumb_'+swfid+'" class="code_block" size="40" value="'+decodeURIComponent(unsafeWindow[swfid].getVariable('thumb_url'))+'" /></td></tr>'+
    '<tr><td><label>Width</lable></td><td><input type="text" id="width_'+swfid+'" class="code_block" size="15" value="'+unsafeWindow[swfid].getVariable('stage_width')+'" /></td></tr>'+
    '<tr><td><label>Height</lable></td><td><input type="text" id="height_'+swfid+'" class="code_block" size="15" value="'+unsafeWindow[swfid].getVariable('stage_height')+'" /></td></tr>'+
    '<tr><td><label>Auto-Play</label></td><td><input type="checkbox" id="autoplay_'+swfid+'" /></td></tr>';
  if (unsafeWindow[swfid].getVariable('highqual_src')) {
    wizard_html += '<tr><td><label>High Quality</label></td><td><input type="checkbox" name="quality" value="high" checked="checked" id="high_'+swfid+'"/></td>';
  }
  wizard_html += '</table></form></p></div>\n'+
  '<div class="dialog_buttons"><input class="inputsubmit" value="Update" id="update_'+swfid+'" type="button" onclick="document.getElementById(\'independent\').style.display = \'none\';" /></div></td><td class="pop_border pop_side"></td></tr><tr><td class="pop_bottomleft"></td><td class="pop_border pop_bottom"></td><td class="pop_bottomright"></td></tr></tbody></table></div>';
  $('independent').innerHTML = wizard_html;

  if ( (unsafeWindow[swfid].getVariable('video_autoplay')) && ((unsafeWindow[swfid].getVariable('video_autoplay')) == 1) ) {
    $("autoplay_"+swfid).checked = true;
  } else {
    $("autoplay_"+swfid).checked = false;
  }

 $("width_"+swfid).addEventListener('blur',function () {
    now = $("width_"+swfid).value;
    before = unsafeWindow[swfid].getVariable('stage_width');
    height = unsafeWindow[swfid].getVariable('stage_height');
    $("height_"+swfid).value = fix_height(before, now, height, swfid);
   },false)
  $("height_"+swfid).addEventListener('blur',function () {
    now = $("height_"+swfid).value;
    before = unsafeWindow[swfid].getVariable('stage_height');
    width = unsafeWindow[swfid].getVariable('stage_width');
    $("width_"+swfid).value = fix_width(before, now, width, swfid);
    },false)

  $("update_"+swfid).addEventListener('click',function () {
      update_video(swfid);
    },false)

   }

// Show the effect of the video customizer in the page
function update_video(swfid) {
  file = encodeURIComponent($("file_"+swfid).value);
  if (($('high_'+swfid)) && ($('high_'+swfid).checked)) { 
    file = unsafeWindow[swfid].getVariable('highqual_src');
    high_on = 1;
    $('download_'+swfid).href = decodeURIComponent(unsafeWindow[swfid].getVariable('highqual_src'));
    $('convert_'+swfid).href = "http://www.zamzar.com/url/?u=" + unsafeWindow[swfid].getVariable('highqual_src');
  } else if (unsafeWindow[swfid].getVariable('lowqual_src')) {
    file = unsafeWindow[swfid].getVariable('lowqual_src');
    high_on = '';
    $('download_'+swfid).href = decodeURIComponent(unsafeWindow[swfid].getVariable('lowqual_src'));
    $('convert_'+swfid).href = "http://www.zamzar.com/url/?u=" + unsafeWindow[swfid].getVariable('lowqual_src');
  }
  width = $("width_"+swfid).value;
  height = $("height_"+swfid).value;
  thumb = encodeURIComponent(document.getElementById("thumb_"+swfid).value);
  if ($("autoplay_"+swfid).checked) {
    autoplay = 1;
  } else {
    autoplay = "";
  }
  hscale = height/unsafeWindow[swfid].getVariable('stage_height');
  vidheight = Math.round(unsafeWindow[swfid].getVariable('video_height')*hscale);
  if ((vidheight/height) <= .7) {
    vidheight = Math.round(unsafeWindow[swfid].getVariable('stage_height')*.7);
    wscale = vidheight/unsafeWindow[swfid].getVariable('video_height');
    vidwidth = Math.round(unsafeWindow[swfid].getVariable('video_width')*wscale);
  } else {
    wscale = width/unsafeWindow[swfid].getVariable('stage_width');
    vidwidth = Math.round(unsafeWindow[swfid].getVariable('video_width')*wscale);
  }
  type = unsafeWindow[swfid].getVariable('video_player_type');
  if (unsafeWindow[swfid].getVariable('highqual_src')) {
    highqual = unsafeWindow[swfid].getVariable('highqual_src');
    lowqual = unsafeWindow[swfid].getVariable('lowqual_src');
    fbt_lowqual = unsafeWindow[swfid].getVariable('fbt_lowqual');
    fbt_highqual = unsafeWindow[swfid].getVariable('fbt_highqual');
  }
  unsafeWindow[swfid].setAttribute('width', width);
  unsafeWindow[swfid].setAttribute('height', height);;
  unsafeWindow[swfid].addVariable("video_src", file);
  unsafeWindow[swfid].addVariable("stage_width", width);
  unsafeWindow[swfid].addVariable("stage_height", height);
  unsafeWindow[swfid].addVariable("video_width", vidwidth);
  unsafeWindow[swfid].addVariable("video_height", vidheight);
  unsafeWindow[swfid].addVariable("thumb_url", thumb);
  unsafeWindow[swfid].addVariable("video_autoplay", autoplay);
  if (unsafeWindow[swfid].getVariable('highqual_src')) {
    unsafeWindow[swfid].addVariable("highqual_src", highqual);
    unsafeWindow[swfid].addVariable("lowqual_src", lowqual);
    unsafeWindow[swfid].addVariable("highqual_is_on", high_on);
    unsafeWindow[swfid].addVariable('fbt_lowqual', fbt_lowqual);
    unsafeWindow[swfid].addVariable('fbt_highqual', fbt_highqual);
  }
  code[swfid] = unsafeWindow[swfid].getSWFHTML();
  $(swfid+"_holder").innerHTML = unsafeWindow[swfid].getSWFHTML();
}

// Locate Videos
function find_videos() {
  document.body.removeEventListener('DOMNodeInserted', find_videos, false);
  var dev = document.evaluate(
			      '//div[@class="fb_video_holder"] | //div[@class="mvp_holder"]', 
			      document, 
			      null, 
			      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

  for (var i = 0; i < dev.snapshotLength; i ++) {
    if (!dev.snapshotItem(i).getAttribute('mod')) {
      // Is it a holder or an embed object?
      if (dev.snapshotItem(i).className == "fb_video_holder") {
	swfid = dev.snapshotItem(i).getAttribute('id').split('_holder')[0];
      } else if (dev.snapshotItem(i).getElementsByTagName('embed')[0]) {
	swfid = dev.snapshotItem(i).getElementsByTagName('embed')[0].getAttribute('id');
	dev.snapshotItem(i).setAttribute('id', swfid+"_holder");
      }
      if (document.location.href.match('/video/') == null) { // Posted Video
	div = document.createElement('div');
        div.setAttribute('id', "actions_"+swfid);
	dev.snapshotItem(i).parentNode.parentNode.insertBefore(div, dev.snapshotItem(i).parentNode.nextSibling);
	if (unsafeWindow[swfid]) posted_videos(swfid, get_values(swfid));
      } else if (document.getElementById("video_actions")) { // Video Page
	document.getElementById("video_actions").setAttribute('id', "actions_"+swfid);
	if (unsafeWindow[swfid]) add_elements(swfid, get_values(swfid));
      }
      dev.snapshotItem(i).setAttribute('mod', "done");
    } // Modifications have already been made
  }
}

// Style I stole from Facebook
style = '\n.code_block {\n'+
'font-size:12px;\n' +
'background:#f7f7f7;\n' +
'width: 190px;\n' +
'border:1px solid #ccc;\n' +
'color:#555;\n' +
'}\n\n' +
'#public_link_photo {\n' +
'clear: both;\n' +
'color: #333;\n' +
'font-size: 9px;\n' +
'padding: 5px 5px;\n' +
'text-align: center;\n' +
'margin: 10px 0px 0px 0px;\n' +
'background: #f7f7f7;\n' +
'border-top: 1px solid #D8DFEA;\n' +
'}\n\n' +
'#public_link_photo span {\n' +
'color: black;\n' +
'display: block;\n' +
'font-size: 11px;\n' +
'}\n' +
'.fb_vid_actions { background-color: rgb(236, 239, 245);\n' +
'padding: 5px;\n' +
'text-align: center;\n' +
'display:block;\n' +
'float:none;\n' +
'margin-top: 10px;\n' +
'}\n' +
'#independent { display:none;\n' +
'z-index:10000;\n' +
'position: fixed;\n' +
'}\n\n';

// This is triggered by Facebook whenever the page changes
function watchforchange() {
  document.body.removeEventListener('DOMNodeInserted', watchforchange, false);
  setTimeout(function () {
      if ( document.evaluate('//div[@mod]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength < 1) {
	$('independent').style.display = 'none';
      }
      find_videos(); 
      document.body.addEventListener('DOMNodeInserted', watchforchange, false); 
    }, 500);
}

// This can take awhile sometimes but it's needed
window.addEventListener("load", function(e) {
    var ourpopup = document.createElement('div');
    ourpopup.id = 'independent';
    ourpopup.className = 'generic_dialog video_embed_dialog pop_dialog';
    addGlobalStyle(style);
    document.body.appendChild(ourpopup);
    code = new Array();
    watchforchange();
  }, false);