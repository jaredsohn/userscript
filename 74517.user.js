{\rtf1\ansi\ansicpg1254\deff0\deflang1055{\fonttbl{\f0\fswiss\fcharset162{\*\fname Arial;}Arial TUR;}}
{\*\generator Msftedit 5.41.15.1507;}\viewkind4\uc1\pard\f0\fs20 Share / Save\par
E-mail\par
Bookmark\par
FacebookBlogger PostDeliciousGoogle BookmarksYahoo BuzzStumbleUponBeboWordPressOrkutNetvibes ShareStrandsDailyMeTechNetArtoSmakNewsAIMIdenti.caBox.netNetlogShoutwireJumptagsHemidemiInstapaperXerpiWinkBibSonomyBlogMarksStartAidKhabbrYoolinkTechnotizieMultiplyPlaxo PulseSquidooBlinklistYiGGSegnaloYouMobFarkJamespotTwiddlaMindBodyGreenHuggNowPublicTumblrCurrentSpurlOneviewSimpyBuddyMarksViadeoWistsBackflipSiteJotHealth RankerCare2 NewsSphereGabbrTagzaFolkdNewsTrustPrintFriendly\par
Yahoo MailAOL Mail\par
\tab\par
TwitterMySpaceDiggGoogle BuzzRedditWindows Live FavoritesYahoo BookmarksMister-WongGoogle ReaderEvernoteStumpediaPosterousMSDNExpressionTipdPlurkYahoo MessengerMozillacaTypePad PostMixxTechnorati FavoritesCiteULikeWindows Live SpacesFunPPhoneFavsNetvouzDiigoTagglyTailrankKledyMeneameBookmarks.frNewsVineFriendFeedPingProtopage BookmarksFavesWebnewsPushaSlashdotAllvoicesImera BrazilLinkaGoGounalogDiglogPropellerLiveJournalHelloTxtYampleLinkatopiaLinkedInAsk.com MyStuffMapleConnoteaMyLinkVaultSphinnDZoneHyvesBitty BrowserSymbaloo FeedsFoxiewireVodPodAmazon Wish ListRead It Later\par
Google GmailHotmail\par
Send from any other e-mail address or e-mail program:\par
Any e-mail\par
Powered by AddToAny\par
Userscripts.org\par
Search all scripts\par
\par
    * Signup\par
    * Login\par
\par
    * Scripts\par
    * Tags\par
    * Forums\par
    * People\par
    * Blog\par
    * Books\par
\par
Facebook Video\par
By sizzlemctwizzle \emdash  Last update Apr 10, 2010 \emdash  Installed 193,756 times. Daily Installs: 327, 349, 362, 273, 334, 340, 364, 324, 397, 442, 385, 351, 378, 395, 425, 379, 387, 377, 368, 313, 325, 393, 404, 433, 374, 389, 1094, 1123, 788, 648, 553\par
\par
    * About\par
    * Source Code\par
    * Reviews 1\par
    * Discussions 149\par
    * Fans 54\par
    * Issues\par
    * Share\par
\par
There are 29 previous versions of this script.\par
\par
// ==UserScript==\par
// @name           Facebook Video\par
// @namespace      sizzlemctwizzle\par
// @description    Adds links to download or convert videos with Zamzar.com, and provides code to embed your videos in other sites. Now even works when Flash is disabled!\par
// @version        2.2.6\par
// @require        http://sizzlemctwizzle.com/updater.php?id=9789\par
// @include        http://*.facebook.com/*\par
// @include        https://*.facebook.com/*\par
// ==/UserScript==\par
\par
// Copyleft Michael Medley <medleymind@gmail.com>, All Wrongs Reserved\par
function get_values(swfid) \{\par
  // Get the Video url\par
  values = new Array();\par
  if (unsafeWindow[swfid].getVariable('highqual_src')) \{ // Get High Quality if available\par
    src = unsafeWindow[swfid].getVariable('highqual_src');\par
    unsafeWindow[swfid].addVariable("video_src", unsafeWindow[swfid].getVariable('highqual_src'));\par
  \} else \{ // Default to Low Quality if unavailable\par
    src = unsafeWindow[swfid].getVariable('video_src');\par
  \}\par
  values[0] = decodeURIComponent(src);\par
  values[1] = "http://www.zamzar.com/url/?u=" + src;\par
  return values;\par
\}\par
\par
// Smart XPath Function\par
function $x(x, t, r) \{\par
    if (t && t.nodeType) \par
        var h = r, r = t, t = h;    \par
    var d = r ? r.ownerDocument || r : r = document, p;\par
    switch (t) \{\par
    case 1:\par
        p = 'numberValue';\par
        break;\par
    case 2:\par
        p = 'stringValue';\par
        break;\par
    case 3:\par
        p = 'booleanValue';\par
        break;\par
    case 8: case 9:\par
        p = 'singleNodeValue';\par
        break;\par
    default:\par
        return d.evaluate(x, r, null, t || 6, null);\par
    \}\par
    return d.evaluate(x, r, null, t, null)[p];\par
\}\par
\par
// Element creation function by Avg and JoeSimmons\par
function create(A, B, C) \{\par
\tab if (!B) \par
\tab\tab A = document.createTextNode(A);\par
\tab else \{\par
\tab\tab A = document.createElement(A);\par
\tab\tab for (var b in B) \{\par
\tab\tab\tab if (b.indexOf("on") == 0)\par
\tab\tab\tab\tab A.addEventListener(b.substring(2), B[b], false);\par
\tab\tab\tab else if (b == "style")\par
\tab\tab\tab\tab A.setAttribute(b, B[b]);\par
\tab\tab\tab else\par
\tab\tab\tab\tab A[b] = B[b];\par
\tab\tab\}\par
\tab\tab if (C) \par
\tab\tab\tab for(var i = 0, len = C.length; i<len; i++)\par
\tab\tab\tab\tab A.appendChild(C[i]);\par
\tab\}\par
\tab return A;\par
\}\par
\par
// Optional shortcut functions I like\par
var $x1 = function(x, r) \{ return $x(x, 9, r) \}, \par
    $xb = function(x, r) \{ return $x(x, 3, r) \};\par
\par
// A robust and universal forEach\par
function forEach(lst, cb) \{\par
    if (lst.snapshotItem) \{\par
        var i = 0, len = lst.snapshotLength;\par
        while (i < len) \par
            cb(lst.snapshotItem(i), i++, lst);\par
    \}\par
    else if (lst.iterateNext) \{\par
        var item;\par
        while (item = lst.iterateNext()) \par
            cb(item, lst);\par
    \}\par
    else if (lst.forEach) \par
        lst.forEach(cb);\par
    else if (typeof lst.length != 'undefined' && typeof lst === 'object') \par
        Array.forEach(lst, cb);\par
    else if (typeof lst === 'object')\par
        for (var i in lst) cb(lst[i], i, lst);\par
    else \par
        return false;\par
\}\par
\par
function xhr(url, cb, data) \{\par
  var res =  new XMLHttpRequest();\par
  res.onreadystatechange = function() \{ if (res.readyState==4 && res.status==200) cb(res.responseText) \};\par
  res.open(data ? 'POST' : 'GET', url, true);\par
  res.setRequestHeader('User-agent', window.navigator.userAgent);\par
  if (data) \{\par
    res.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');\par
    res.setRequestHeader("Connection", "close");\par
    res.setRequestHeader("Content-length", data.length);\par
  \}\par
  res.send(data||null);\par
\}\par
\par
if (typeof GM_addStyle === 'undefined') GM_addStyle = function(css) \{\par
    var head = document.getElementsByTagName('head')[0], style = document.createElement('style');\par
    if (!head) \{return\}\par
    style.type = 'text/css';\par
    try \{style.innerHTML = css\}\par
    catch(x) \{style.innerText = css\}\par
    head.appendChild(style);\par
\};\par
\par
function $(element) \{ return document.getElementById(element); \}\par
function insertAfter(node, after) \{ after.parentNode.insertBefore(node, after.nextSibling);\}\par
\par
// Get the actual Facebook url\par
function realUrl() \{\par
    return /^#!\\/.*/.test(window.location.hash) ? \par
           'http://'+window.location.host+window.location.hash.split('#!')[1] : \par
           window.location.href;\par
\}\par
\par
// GM_addStyle if not available\par
if (typeof GM_addStyle === 'undefined') GM_addStyle = function(css) \{\par
    var head = document.getElementsByTagName('head')[0], style = document.createElement('style');\par
    if (!head) \{return\}\par
    style.type = 'text/css';\par
    try \{style.innerHTML = css\}\par
    catch(x) \{style.innerText = css\}\par
    head.appendChild(style);\par
\};\par
\par
// Get the Emebd Code\par
function get_code(swfid, callback) \{\par
  if (!code[swfid]) \{\par
    width[swfid] = unsafeWindow[swfid].getVariable('stage_width');\par
    height[swfid] = unsafeWindow[swfid].getVariable('stage_height');\par
    code[swfid] = '<object width="'+width[swfid]+'" height="'+height[swfid]+'" ><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="http://www.facebook.com!/video/video.php?v='+unsafeWindow[swfid].getVariable('video_id')+'" /><embed src="http://www.facebook.com/v/'+unsafeWindow[swfid].getVariable('video_id')+'" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="'+width[swfid]+'" height="'+height[swfid]+'"></embed></object>';\par
  \}\par
  callback();\par
\}\par
\par
// Add elements to a video page\par
function add_elements(swfid, values) \{\par
  var embed, pubdiv;\par
\par
  if (embed = $x1('//a[contains(@onclick, "motion_show_embed_video_dialog")]')) \par
    embed.className += " hidden_elem";\par
\par
  // Public Links\par
  pubdiv = create('div', \par
\tab\tab   \{id:'public_link_photo'\}, \par
\tab\tab   [create('Show people this video by sending them this public link: '), \par
\tab\tab    create(realUrl())]);\par
\par
  // Append Elements\par
  ($('main_column')) ? insertAfter(pubdiv, $('main_column').parentNode) : void(0);\par
  var ul = document.evaluate('//ul[@class="actionspro"]', document, null, 9, null).singleNodeValue;\par
\par
  // Embed Link\par
  ul.appendChild(create('li', \par
\tab\tab\tab\{className:'actionspro_li'\}, \par
\tab\tab\tab [create('a', \par
\tab\tab\tab        \{\par
\tab\tab\tab        onclick:\par
\tab\tab\tab\tab  function (e) \{\par
\tab\tab\tab\tab    show_code(swfid); \par
\tab\tab\tab\tab    e.preventDefault();\par
\tab\tab\tab          \},\par
\tab\tab\tab        href:'#',\par
\tab\tab\tab        textContent:'Embed this Video',\par
\tab\tab\tab        className:'actionspro_a'\})]));\par
\par
  // Wizard Link\par
  ul.appendChild(create('li', \par
\tab\tab\tab\{className:'actionspro_li'\}, \par
\tab\tab\tab [create('a', \par
\tab\tab\tab        \{\par
\tab\tab\tab        onclick:\par
\tab\tab\tab\tab  function (e) \{\par
\tab\tab\tab\tab    run_wizard(swfid); \par
\tab\tab\tab\tab    e.preventDefault();\par
\tab\tab\tab          \},\par
\tab\tab\tab        href:'#',\par
\tab\tab\tab        textContent:'Customize Code',\par
\tab\tab\tab        className:'actionspro_a'\})]));\par
\par
  // Download Link\par
  ul.appendChild(create('li', \par
\tab\tab\tab\{className:'actionspro_li'\}, \par
\tab\tab\tab [create('a', \par
\tab\tab\tab        \{\par
\tab\tab\tab        id:"download_" + swfid,\par
\tab\tab\tab        href:values[0],\par
\tab\tab\tab        textContent:'Download Video',\par
\tab\tab\tab        className:'actionspro_a'\})]));\par
  // Convert Link\par
  ul.appendChild(create('li', \par
\tab\tab\tab\{className:'actionspro_li'\}, \par
\tab\tab\tab [create('a', \par
\tab\tab\tab        \{\par
\tab\tab\tab        id:"convert_" + swfid,\par
\tab\tab\tab        href:values[1],\par
\tab\tab\tab        textContent:'Convert Video',\par
\tab\tab\tab        className:'actionspro_a'\})]));\par
\}\par
\par
// Run the script if video posted on site besides a video page: feeds, walls, and messages\par
function posted_videos(swfid, values) \{\par
  actions = document.getElementById("actions_"+swfid);\par
  actions.innerHTML = '<a href="' + values[0] + '" id="download_' + swfid + '">Download Video</a> | <a href="' + values[1] + '" id="convert_' + swfid + '">Convert Video</a>';\par
  actions.setAttribute('class', 'fb_vid_actions');\par
\}\par
\par
function show_code(swfid) \{\par
  get_code(swfid, function() \{\par
  $('independent').style.display = 'block';\par
  $('independent').innerHTML = '<div style="top: 125px;" class="generic_dialog_popup"><div class="pop_container_advanced"><div class="pop_content" id="pop_content"><h2 class="dialog_title"><span>Embed this video</span></h2><div class="dialog_content"><div class="dialog_body"><div class="embed_description">You can use this code to display this video on any site on the web.The video will respect Facebook privacy settings.</div><br><div>Embed code:<input size="40" class="code_block" onclick="this.focus(); this.select();" id="" name="" value=\\''+code[swfid]+'\\' type="text"></div></div><div class="dialog_buttons"><input class="inputsubmit" name="ok" value="Okay" onclick="document.getElementById(\\'independent\\').style.display = \\'none\\';" type="button"></div></div></div></div></div>';\par
    \});\par
\}\par
\par
function run_wizard(swfid) \{\par
  get_code(swfid, function() \{\par
  // Embed Wizard\par
  $('independent').style.display = 'block';\par
  wizard_html = '<div style="top: 125px;" class="generic_dialog_popup"><div class="pop_container_advanced"><div class="pop_content" id="pop_content"><h2 class="dialog_title"><span>Customize Embed Code</span></h2><div class="dialog_content"><div class="dialog_body"><div id="embed_options" style="padding:20px;"><p>'+\par
'<form id="custom_'+swfid+'"><table><tr><td><label>Width</lable></td><td><input type="text" id="width_'+swfid+'" class="code_block" size="15" value="'+width[swfid]+'" /></td></tr>'+\par
    '<tr><td><label>Height</lable></td><td><input type="text" id="height_'+swfid+'" class="code_block" size="15" value="'+height[swfid]+'" /></td></tr></table></form></p></div></div>\\n'+\par
  '<div class="dialog_buttons clearfix"><input class="inputsubmit" value="Update" id="update_'+swfid+'" type="button" onclick="document.getElementById(\\'independent\\').style.display = \\'none\\';" /></div></div></div></div></div>';\par
  $('independent').innerHTML = wizard_html;\par
\par
 $("width_"+swfid).addEventListener('blur',function () \{\par
    $("height_"+swfid).value = Math.round(($("width_"+swfid).value/width[swfid])*height[swfid]);\par
   \},false);\par
\par
  $("height_"+swfid).addEventListener('blur',function () \{\par
    $("width_"+swfid).value = Math.round(($("height_"+swfid).value/height[swfid])*width[swfid]);\par
    \},false);\par
\par
  $("update_"+swfid).addEventListener('click',function () \{\par
      update_video(swfid);\par
    \},false);\par
   \});\par
\}\par
\par
// Show the effect of the video customizer in the page\par
function update_video(swfid) \{\par
  new_width = $("width_"+swfid).value;\par
  new_height = $("height_"+swfid).value;\par
  code[swfid] = code[swfid].replace(new RegExp('width="'+width[swfid]+'"', 'g'), 'width="'+new_width+'"').replace(new RegExp('height="'+height[swfid]+'"', 'g'), 'height="'+new_height+'"');\par
  width[swfid] = new_width;\par
  height[swfid] = new_height;\par
  $(swfid+"_holder").innerHTML = code[swfid];\par
\}\par
\par
// Locate Videos\par
function find_videos() \{\par
  document.body.removeEventListener('DOMNodeInserted', find_videos, false);\par
  forEach($x('//div[@class="mvp_holder" and starts-with(@id, "holder_for_mvp_swf_")] | //div[@class="mvp_player player_left"] | //a[@class = "uiVideoThumb"]'), \par
\tab   function (video) \{\par
\tab     if (!video.getAttribute('mod')) \{\par
\tab       // Is it a holder or an embed object?\par
\tab       if (realUrl().match('video.php') == null) \{ // Posted Video, loaded via Ajax\par
                xhr('http://' + window.location.hostname + video.getAttribute('ajaxify') + '&__a=1', function(text) \{\par
                    var video_src, values = [];\par
                    if ( video_src = /\\(\\\\"video_src\\\\"\\,\\s*\\\\"(.*?)\\\\"\\)/.exec(text) ) \{\par
                      values[0] = decodeURIComponent(video_src[1]);\par
                      values[1] = "http://www.zamzar.com/url/?u=" + video_src[1];\par
                      swfid = video.id;\par
                      div = document.createElement('div');\par
                      div.setAttribute('id', "actions_"+swfid);\par
                      insertAfter(div, video.parentNode);\par
                      posted_videos(swfid, values);\par
                    \}\par
                \});\par
\tab       \} else if ($("video_actions")) \{ // Video Page\par
                swfid = 'swf_' + video.id;\par
\tab\tab video.setAttribute('id', swfid+"_holder");\par
\tab\tab $("video_actions").setAttribute('id', "actions_"+swfid);\par
\tab\tab if (unsafeWindow[swfid]) \par
                  add_elements(swfid, get_values(swfid));\par
\tab       \}\par
\tab       video.setAttribute('mod', "done");\par
\tab     \} // Modifications have already been made\par
\tab   \});\par
\}\par
\par
// Style I stole from Facebook\par
style = '\\n.code_block \{\\n'+\par
'font-size:12px;\\n' +\par
'background:#f7f7f7;\\n' +\par
'width: 190px;\\n' +\par
'border:1px solid #ccc;\\n' +\par
'color:#555;\\n' +\par
'\}\\n\\n' +\par
'#public_link_photo \{\\n' +\par
'clear: both;\\n' +\par
'color: #333;\\n' +\par
'font-size: 9px;\\n' +\par
'padding: 5px 5px;\\n' +\par
'text-align: center;\\n' +\par
'margin: 10px 0px 0px 0px;\\n' +\par
'background: #f7f7f7;\\n' +\par
'border-top: 1px solid #D8DFEA;\\n' +\par
'\}\\n\\n' +\par
'#public_link_photo span \{\\n' +\par
'color: black;\\n' +\par
'display: block;\\n' +\par
'font-size: 11px;\\n' +\par
'\}\\n' +\par
'.fb_vid_actions \{ background-color: rgb(236, 239, 245);\\n' +\par
'padding: 5px;\\n' +\par
'text-align: center;\\n' +\par
'display:block;\\n' +\par
'float:none;\\n' +\par
'margin-top: 10px;\\n' +\par
'\}\\n' +\par
'#independent \{ display:none;\\n' +\par
'z-index:10000;\\n' +\par
'position: fixed;\\n' +\par
'\}\\n\\n';\par
\par
// This is triggered by Facebook whenever the page changes\par
function watchforchange() \{\par
  $('content').removeEventListener('DOMNodeInserted', watchforchange, false);\par
  setTimeout(function () \{\par
      if ($xb('//div[@mod]')) \{\par
\tab $('independent').style.display = 'none';\par
      \}\par
      find_videos(); \par
       $('content').addEventListener('DOMNodeInserted', watchforchange, false); \par
    \}, 500);\par
\}\par
\par
// Wait for the body element to exist\par
var checker=setInterval(function()\{\par
    if($('content')) \{\par
      clearInterval(checker);\par
      var ourpopup = document.createElement('div');\par
      ourpopup.id = 'independent';\par
      ourpopup.className = 'generic_dialog pop_dialog video_embed_dialog';\par
      GM_addStyle(style);\par
      if(typeof unsafeWindow==='undefined') unsafeWindow = window;\par
      document.body.appendChild(ourpopup);\par
      code = \{\};\par
      width = \{\};\par
      height = \{\};\par
      watchforchange();\par
    \}\par
  \},200);\par
\par
Because it's your web\par
\par
Powered by overstimulate with the help of many friends\par
\par
Policy & Guidelines: DMCA Privacy Policy\par
}
