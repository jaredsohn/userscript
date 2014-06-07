

// ==UserScript==
// @name           Facebook Video
// @namespace      sizzlemctwizzle
// @description    Adds links to download or convert videos with Zamzar.com, and provides code to embed your videos in other sites. Now even works when Flash is disabled!
// @version        2.2.6
// @require        http://sizzlemctwizzle.com/updater.php?id=9789
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==

// Copyleft Michael Medley <medleymind@gmail.com>, All Wrongs Reserved
function get_values(swfid) {
  // Get the Video url
  values = new Array();
  if (unsafeWindow[swfid].getVariable('highqual_src')) { // Get High Quality if available
    src = unsafeWindow[swfid].getVariable('highqual_src');
    unsafeWindow[swfid].addVariable("video_src", unsafeWindow[swfid].getVariable('highqual_src'));
  } else { // Default to Low Quality if unavailable
    src = unsafeWindow[swfid].getVariable('video_src');
  }
  values[0] = decodeURIComponent(src);
  values[1] = "http://www.zamzar.com/url/?u=" + src;
  return values;
}

// Smart XPath Function
function $x(x, t, r) {
    if (t && t.nodeType) 
        var h = r, r = t, t = h;    
    var d = r ? r.ownerDocument || r : r = document, p;
    switch (t) {
    case 1:
        p = 'numberValue';
        break;
    case 2:
        p = 'stringValue';
        break;
    case 3:
        p = 'booleanValue';
        break;
    case 8: case 9:
        p = 'singleNodeValue';
        break;
    default:
        return d.evaluate(x, r, null, t || 6, null);
    }
    return d.evaluate(x, r, null, t, null)[p];
}

// Element creation function by Avg and JoeSimmons
function create(A, B, C) {
	if (!B) 
		A = document.createTextNode(A);
	else {
		A = document.createElement(A);
		for (var b in B) {
			if (b.indexOf("on") == 0)
				A.addEventListener(b.substring(2), B[b], false);
			else if (b == "style")
				A.setAttribute(b, B[b]);
			else
				A[b] = B[b];
		}
		if (C) 
			for(var i = 0, len = C.length; i<len; i++)
				A.appendChild(C[i]);
	}
	return A;
}

// Optional shortcut functions I like
var $x1 = function(x, r) { return $x(x, 9, r) }, 
    $xb = function(x, r) { return $x(x, 3, r) };

// A robust and universal forEach
function forEach(lst, cb) {
    if (lst.snapshotItem) {
        var i = 0, len = lst.snapshotLength;
        while (i < len) 
            cb(lst.snapshotItem(i), i++, lst);
    }
    else if (lst.iterateNext) {
        var item;
        while (item = lst.iterateNext()) 
            cb(item, lst);
    }
    else if (lst.forEach) 
        lst.forEach(cb);
    else if (typeof lst.length != 'undefined' && typeof lst === 'object') 
        Array.forEach(lst, cb);
    else if (typeof lst === 'object')
        for (var i in lst) cb(lst[i], i, lst);
    else 
        return false;
}

function xhr(url, cb, data) {
  var res =  new XMLHttpRequest();
  res.onreadystatechange = function() { if (res.readyState==4 && res.status==200) cb(res.responseText) };
  res.open(data ? 'POST' : 'GET', url, true);
  res.setRequestHeader('User-agent', window.navigator.userAgent);
  if (data) {
    res.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    res.setRequestHeader("Connection", "close");
    res.setRequestHeader("Content-length", data.length);
  }
  res.send(data||null);
}

if (typeof GM_addStyle === 'undefined') GM_addStyle = function(css) {
    var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
    if (!head) {return}
    style.type = 'text/css';
    try {style.innerHTML = css}
    catch(x) {style.innerText = css}
    head.appendChild(style);
};

function $(element) { return document.getElementById(element); }
function insertAfter(node, after) { after.parentNode.insertBefore(node, after.nextSibling);}

// Get the actual Facebook url
function realUrl() {
    return /^#!\/.*/.test(window.location.hash) ? 
           'http://'+window.location.host+window.location.hash.split('#!')[1] : 
           window.location.href;
}

// GM_addStyle if not available
if (typeof GM_addStyle === 'undefined') GM_addStyle = function(css) {
    var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
    if (!head) {return}
    style.type = 'text/css';
    try {style.innerHTML = css}
    catch(x) {style.innerText = css}
    head.appendChild(style);
};

// Get the Emebd Code
function get_code(swfid, callback) {
  if (!code[swfid]) {
    width[swfid] = unsafeWindow[swfid].getVariable('stage_width');
    height[swfid] = unsafeWindow[swfid].getVariable('stage_height');
    code[swfid] = '<object width="'+width[swfid]+'" height="'+height[swfid]+'" ><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="http://www.facebook.com/v/'+unsafeWindow[swfid].getVariable('video_id')+'" /><embed src="http://www.facebook.com/v/'+unsafeWindow[swfid].getVariable('video_id')+'" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="'+width[swfid]+'" height="'+height[swfid]+'"></embed></object>';
  }
  callback();
}

// Add elements to a video page
function add_elements(swfid, values) {
  var embed, pubdiv;

  if (embed = $x1('//a[contains(@onclick, "motion_show_embed_video_dialog")]')) 
    embed.className += " hidden_elem";

  // Public Links
  pubdiv = create('div', 
		  {id:'public_link_photo'}, 
		  [create('Show people this video by sending them this public link: '), 
		   create(realUrl())]);

  // Append Elements
  ($('main_column')) ? insertAfter(pubdiv, $('main_column').parentNode) : void(0);
  var ul = document.evaluate('//ul[@class="actionspro"]', document, null, 9, null).singleNodeValue;

  // Embed Link
  ul.appendChild(create('li', 
			{className:'actionspro_li'}, 
			[create('a', 
			       {
			       onclick:
				 function (e) {
				   show_code(swfid); 
				   e.preventDefault();
			         },
			       href:'#',
			       textContent:'Embed this Video',
			       className:'actionspro_a'})]));

  // Wizard Link
  ul.appendChild(create('li', 
			{className:'actionspro_li'}, 
			[create('a', 
			       {
			       onclick:
				 function (e) {
				   run_wizard(swfid); 
				   e.preventDefault();
			         },
			       href:'#',
			       textContent:'Customize Code',
			       className:'actionspro_a'})]));

  // Download Link
  ul.appendChild(create('li', 
			{className:'actionspro_li'}, 
			[create('a', 
			       {
			       id:"download_" + swfid,
			       href:values[0],
			       textContent:'Download Video',
			       className:'actionspro_a'})]));
  // Convert Link
  ul.appendChild(create('li', 
			{className:'actionspro_li'}, 
			[create('a', 
			       {
			       id:"convert_" + swfid,
			       href:values[1],
			       textContent:'Convert Video',
			       className:'actionspro_a'})]));
}

// Run the script if video posted on site besides a video page: feeds, walls, and messages
function posted_videos(swfid, values) {
  actions = document.getElementById("actions_"+swfid);
  actions.innerHTML = '<a href="' + values[0] + '" id="download_' + swfid + '">Download Video</a> | <a href="' + values[1] + '" id="convert_' + swfid + '">Convert Video</a>';
  actions.setAttribute('class', 'fb_vid_actions');
}

function show_code(swfid) {
  get_code(swfid, function() {
  $('independent').style.display = 'block';
  $('independent').innerHTML = '<div style="top: 125px;" class="generic_dialog_popup"><div class="pop_container_advanced"><div class="pop_content" id="pop_content"><h2 class="dialog_title"><span>Embed this video</span></h2><div class="dialog_content"><div class="dialog_body"><div class="embed_description">You can use this code to display this video on any site on the web.The video will respect Facebook privacy settings.</div><br><div>Embed code:<input size="40" class="code_block" onclick="this.focus(); this.select();" id="" name="" value=\''+code[swfid]+'\' type="text"></div></div><div class="dialog_buttons"><input class="inputsubmit" name="ok" value="Okay" onclick="document.getElementById(\'independent\').style.display = \'none\';" type="button"></div></div></div></div></div>';
    });
}

function run_wizard(swfid) {
  get_code(swfid, function() {
  // Embed Wizard
  $('independent').style.display = 'block';
  wizard_html = '<div style="top: 125px;" class="generic_dialog_popup"><div class="pop_container_advanced"><div class="pop_content" id="pop_content"><h2 class="dialog_title"><span>Customize Embed Code</span></h2><div class="dialog_content"><div class="dialog_body"><div id="embed_options" style="padding:20px;"><p>'+
'<form id="custom_'+swfid+'"><table><tr><td><label>Width</lable></td><td><input type="text" id="width_'+swfid+'" class="code_block" size="15" value="'+width[swfid]+'" /></td></tr>'+
    '<tr><td><label>Height</lable></td><td><input type="text" id="height_'+swfid+'" class="code_block" size="15" value="'+height[swfid]+'" /></td></tr></table></form></p></div></div>\n'+
  '<div class="dialog_buttons clearfix"><input class="inputsubmit" value="Update" id="update_'+swfid+'" type="button" onclick="document.getElementById(\'independent\').style.display = \'none\';" /></div></div></div></div></div>';
  $('independent').innerHTML = wizard_html;

 $("width_"+swfid).addEventListener('blur',function () {
    $("height_"+swfid).value = Math.round(($("width_"+swfid).value/width[swfid])*height[swfid]);
   },false);

  $("height_"+swfid).addEventListener('blur',function () {
    $("width_"+swfid).value = Math.round(($("height_"+swfid).value/height[swfid])*width[swfid]);
    },false);

  $("update_"+swfid).addEventListener('click',function () {
      update_video(swfid);
    },false);
   });
}

// Show the effect of the video customizer in the page
function update_video(swfid) {
  new_width = $("width_"+swfid).value;
  new_height = $("height_"+swfid).value;
  code[swfid] = code[swfid].replace(new RegExp('width="'+width[swfid]+'"', 'g'), 'width="'+new_width+'"').replace(new RegExp('height="'+height[swfid]+'"', 'g'), 'height="'+new_height+'"');
  width[swfid] = new_width;
  height[swfid] = new_height;
  $(swfid+"_holder").innerHTML = code[swfid];
}

// Locate Videos
function find_videos() {
  document.body.removeEventListener('DOMNodeInserted', find_videos, false);
  forEach($x('//div[@class="mvp_holder" and starts-with(@id, "holder_for_mvp_swf_")] | //div[@class="mvp_player player_left"] | //a[@class = "uiVideoThumb"]'), 
	  function (video) {
	    if (!video.getAttribute('mod')) {
	      // Is it a holder or an embed object?
	      if (realUrl().match('video.php') == null) { // Posted Video, loaded via Ajax
                xhr('http://' + window.location.hostname + video.getAttribute('ajaxify') + '&__a=1', function(text) {
                    var video_src, values = [];
                    if ( video_src = /\(\\"video_src\\"\,\s*\\"(.*?)\\"\)/.exec(text) ) {
                      values[0] = decodeURIComponent(video_src[1]);
                      values[1] = "http://www.zamzar.com/url/?u=" + video_src[1];
                      swfid = video.id;
                      div = document.createElement('div');
                      div.setAttribute('id', "actions_"+swfid);
                      insertAfter(div, video.parentNode);
                      posted_videos(swfid, values);
                    }
                });
	      } else if ($("video_actions")) { // Video Page
                swfid = 'swf_' + video.id;
		video.setAttribute('id', swfid+"_holder");
		$("video_actions").setAttribute('id', "actions_"+swfid);
		if (unsafeWindow[swfid]) 
                  add_elements(swfid, get_values(swfid));
	      }
	      video.setAttribute('mod', "done");
	    } // Modifications have already been made
	  });
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
  $('content').removeEventListener('DOMNodeInserted', watchforchange, false);
  setTimeout(function () {
      if ($xb('//div[@mod]')) {
	$('independent').style.display = 'none';
      }
      find_videos(); 
       $('content').addEventListener('DOMNodeInserted', watchforchange, false); 
    }, 500);
}

// Wait for the body element to exist
var checker=setInterval(function(){
    if($('content')) {
      clearInterval(checker);
      var ourpopup = document.createElement('div');
      ourpopup.id = 'independent';
      ourpopup.className = 'generic_dialog pop_dialog video_embed_dialog';
      GM_addStyle(style);
      if(typeof unsafeWindow==='undefined') unsafeWindow = window;
      document.body.appendChild(ourpopup);
      code = {};
      width = {};
      height = {};
      watchforchange();
    }
  },200);