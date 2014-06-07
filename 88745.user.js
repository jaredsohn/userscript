// ==UserScript==
// @name           NicoRankPlayer
// @namespace      http://www12.atpages.jp/~lottz/pukiwikiplus
// @include        http://www.nicovideo.jp/ranking/fav/daily/*
// @author    lottz
// @version   0.0.2
// ==/UserScript==


(function() {

// User settings.

const DELAY_MILLI_SEC = 7000;


// System settings.

const ID_NICORANKPLAYER_CURRENT_POS = "ID_NICORANKPLAYER_CURRENT_POS";
const ID_NICORANKPLAYER_VIDEO_TITLE = "ID_NICORANKPLAYER_VIDEO_TITLE";
const ID_NICORANKPLAYER_VIDEO_LEN = "ID_NICORANKPLAYER_VIDEO_LEN";
const ID_NICORANKPLAYER_REVEERSE_CHECK = "ID_NICORANKPLAYER_REVERSE_CHECK";
const ID_NICORANKPLAYER_STATE = "ID_NICORANKPLAYER_STATE";
const ID_NICORANKPLAYER_SKIP_TITLE = "ID_NICORANKPLAYER_SKIP_TITLE";

const ID_NICORANKPLAYER_SKIP_TITLE_NODE = "ID_NICORANKPLAYER_SKIP_TITLE_NODE";

const VIDEO_POS_INDEX = 6;
const VIDEO_TITLE_INDEX = 14;
const VIDEO_LEN_INDEX = 13;
const REVERSE_CHECK_INDEX = 7;

// The ID for store the skip title to the browser registory.
const NICORANK_PLAYER_SKIP_TITLE_STORE_ID = "NICORANK_PLAYER_STORE_ID";


const SKIP_TITLE_LABEL = "スキップするタイトル(部分一致。「;」区切り)";

var currentPageRank = 0;
// Store the ranking data. The structure of element is the following.
// {href:"http://....",title:"title A"}
var nicoRankItems = [];
var nicoRankSkipTitles = "";
var nicoRankSkipTitlesArr = [];
var timer;
var bForceNextVideo = false;
var _ifr;

   // Save the visibility state before toggle the toolbar.
   var toolbarVisibleState = "play";

// Functions.

function showNicoRankPlayerToolbar(){
  var elems = document.getElementsByClassName("watch");
  var cnt = 0;
  for each(var elem in elems){
      nicoRankItems.push({href:elem.href,title:elem.text});
  }
  makeToolbar();
  loadVars();
}

// Load the skip titles from the browser registory.
function loadVars(){
  var titleStr = GM_getValue(NICORANK_PLAYER_SKIP_TITLE_STORE_ID);
  if(titleStr){
    nicoRankSkipTitles = titleStr;
    nicoRankSkipTitlesArr = titleStr.split(/[;,]/);
    // Set the restored skip titles to the skip toolbar.
    var skip_input = document.getElementById(ID_NICORANKPLAYER_SKIP_TITLE);
    skip_input.value = nicoRankSkipTitles;
  }
}

function makeToolbar(){

  var div = document.createElement('div');
  div.setAttribute("id", "nicoRankPlayer");

// Set font color.
  div.style.color="#898F8F";
  div.style.display="block";


//div.setAttribute("setStatus",function (msg){
////document.getNicoStateNode().textContent = msg;
//document.getElementById("nicoRankPlayerTd").childNodes[0].textContent = msg;
//});

  var tbl = document.createElement('table');
  tbl.setAttribute("width", "100%");
  tbl.setAttribute("frame", "box");
  tbl.setAttribute("border", "2");
  div.appendChild(tbl);
  var tr = document.createElement('tr');
  tbl.appendChild(tr);

  var td = document.createElement('td');
  td.setAttribute("id", "nicoRankPlayerTd");
  tr.appendChild(td);

// idx 0. Area for display state.
  var txt = document.createTextNode('NicoRankPlayer | ');
  // txt.setAttribute("id", ID_NICORANKPLAYER_STATE);
  td.appendChild(txt);
// idx 1
  var btn = document.createElement('input');
  btn.setAttribute("type", "button");
  btn.setAttribute("value", "play!");
  btn.addEventListener('click',function(e){startMusicFn();},false);
  td.appendChild(btn);

// 2
  btn = document.createElement('input');
  btn.setAttribute("type", "button");
  btn.setAttribute("value", "prev");
  btn.addEventListener('click',function(e){alert('prev');},false);
  td.appendChild(btn);

// 3
  btn = document.createElement('input');
  btn.setAttribute("type", "button");
  btn.setAttribute("value", "next");
  btn.addEventListener('click',function(e){nextClickHandler();},false);
  td.appendChild(btn);

// 4
  btn = document.createElement('input');
  btn.setAttribute("type", "button");
  btn.setAttribute("value", "stop");
  btn.addEventListener('click',function(e){stopClickHandler();},false);
  td.appendChild(btn);


// 5
  var currentLabel = document.createTextNode('|current track:');
  td.appendChild(currentLabel);

// 6
  var currentPosInput = document.createElement('input');
  currentPosInput.setAttribute("id", ID_NICORANKPLAYER_CURRENT_POS);
  currentPosInput.setAttribute("type", "text");
  currentPosInput.setAttribute("value", "1");
  currentPosInput.setAttribute("size", "10");
  currentPosInput.setAttribute("maxlength", "3");
  td.appendChild(currentPosInput);

// 7

  var cb = document.createElement('input');
  cb.setAttribute("id", ID_NICORANKPLAYER_REVEERSE_CHECK);
  cb.setAttribute("type", "checkbox");
  td.appendChild(cb);

// 8
  txt = document.createTextNode('rev|');
  td.appendChild(txt);

// 9
  btn = document.createElement('input');
  btn.setAttribute("type", "button");
  btn.setAttribute("value", "show");
  btn.addEventListener('click',function(e){document.getElementById("showPageIFrame").height=500;},false);
  td.appendChild(btn);

// 10
  btn = document.createElement('input');
  btn.setAttribute("type", "button");
  btn.setAttribute("value", "hide");
  btn.addEventListener('click',function(e){document.getElementById("showPageIFrame").height=0;},false);
  td.appendChild(btn);

// 11
  txt = document.createTextNode(' ');
  td.appendChild(txt);

// 12
  txt = document.createTextNode(':len:');
  td.appendChild(txt);
// 13 video len
  txt = document.createTextNode(' ');
  // txt.setAttribute("custom_id", ID_NICORANKPLAYER_VIDEO_LEN);
  var text_span = document.createElement('span');
  text_span.setAttribute("id", ID_NICORANKPLAYER_VIDEO_LEN);
  text_span.appendChild(txt);
  td.appendChild(text_span);
  // td.appendChild(txt);

// 14
// For display the current video title.
  txt = document.createTextNode(' ');
  // txt.setAttribute("id", ID_NICORANKPLAYER_VIDEO_TITLE);
  text_span = document.createElement('span');
  text_span.setAttribute("id", ID_NICORANKPLAYER_VIDEO_TITLE);
  text_span.appendChild(txt);
  td.appendChild(text_span);

  document.getElementsByClassName("bg_headmenu")[0].insertBefore(div,document.getElementsByClassName('bg_headmenu')[0].lastChild);

  div = document.createElement('table');
  div.setAttribute("style","float:left;");
  div.setAttribute("class","headmenu");
  div.setAttribute("cellpadding","0");
  div.setAttribute("cellspacing","4");
  div.setAttribute("height","24");

  div.innerHTML = '<tr><td nowrap onmouseover="document.getElementById(\'nicoRankMenu\').style.display = \'block\';" onmouseout="document.getElementById(\'nicoRankMenu\').style.display = \'none\'; return false;"><span style="color:#C9CFCF; text-decoration:underline;">NicoRankPlayer▼</span>'
                  + '<div id="nicoRankMenu" style="display: none;position: relative;" onmouseover="document.getElementById(\'nicoRankMenu\').style.display = \'block\';" onmouseout="document.getElementById(\'nicoRankMenu\').style.display = \'none\';return false;"'
                  + '<div class="headmenu_g" >'
                  + '<a href="javascript:void(0)" onclick="'
// Dispatch the command to toggle the toolbar.
                  + 'var ev = document.createEvent(\'CommandEvent\');'
                  + 'ev.initCommandEvent(\'NicoRankPlayerEvent\', true, false,\'toggle\');'
                  + 'document.dispatchEvent(ev);'
                  + 'return false;">switch visible/invisible</a>'
                  + '<a href="javascript:void(0)" onclick="'
                  + '(' + nicorank_dispathEvent_skip.toString().replace(/"/g,"\'") + ')();'
                  + 'return false;">set skip word</a>'
                  + '<a href="javascript:void(0)" onclick="'
                  + '(' + nicorank_dispathEvent_play.toString().replace(/"/g,"\'") + ')();'
                  + 'return false;">show play area</a>'
                  + '</div>'
                  + '</div>'
                  + '</tr></td>';

  document.getElementsByClassName("headmenu_width")[0].insertBefore(div,document.getElementsByClassName('headmenu_width')[0].firstChild);

// Make skip toolbar.
  div = document.createElement('div');
  div.setAttribute("id", ID_NICORANKPLAYER_SKIP_TITLE_NODE);
  div.setAttribute("title", SKIP_TITLE_LABEL);
  div.style.display="none";
  div.style.color="#898F8F";

  txt = document.createTextNode('Title to skip');
  div.appendChild(txt);

  btn = document.createElement('input');
  btn.setAttribute("type", "button");
  btn.setAttribute("value", "save");
  btn.setAttribute("title", SKIP_TITLE_LABEL);
  btn.addEventListener('click',function(e){nicorank_save_skip_title();},false);
  div.appendChild(btn);

  var skipTitleInput = document.createElement('input');
  skipTitleInput.setAttribute("id", ID_NICORANKPLAYER_SKIP_TITLE);
  skipTitleInput.setAttribute("type", "text");
  skipTitleInput.setAttribute("size", "150");
  skipTitleInput.setAttribute("title", SKIP_TITLE_LABEL);
  div.appendChild(skipTitleInput);

  document.getElementsByClassName("bg_headmenu")[0].insertBefore(div,document.getElementsByClassName('bg_headmenu')[0].lastChild);

}//eof:makeToolbar()

function nicorank_save_skip_title(){

  var titleStr = document.getElementById(ID_NICORANKPLAYER_SKIP_TITLE).value;
  GM_setValue(NICORANK_PLAYER_SKIP_TITLE_STORE_ID, titleStr);
  nicoRankSkipTitles = titleStr;
  nicoRankSkipTitlesArr = titleStr.split(/[;,]/);
}

// Toggle the visibility of the NicoRankPlayer Toolbar.
function nicorank_toggle_display_toolbar(){

  var bVisible = false;
  var div = document.getElementById('nicoRankPlayer');
  var skip_div = document.getElementById(ID_NICORANKPLAYER_SKIP_TITLE_NODE);

  if(div.getAttribute('style').match('display\\s*:\\s*block')||
     skip_div.getAttribute('style').match('display\\s*:\\s*block')){
    bVisible = true;
  }

  // Make unvisible
  if(bVisible){
    div.setAttribute("style", div.getAttribute('style').replace(/display\s*:\s*block/,  'display: none'));    
    skip_div.setAttribute("style", div.getAttribute('style').replace(/display\s*:\s*block/,  'display: none'));
    // Make visible
  }else{
    if(toolbarVisibleState == "skip"){
      div.setAttribute("style", div.getAttribute('style').replace(/display\s*:\s*block/,  'display: none'));
      skip_div.setAttribute("style", div.getAttribute('style').replace(/display\s*:\s*none/,  'display: block'));    
    }else if(toolbarVisibleState == "play"){
      div.setAttribute("style", div.getAttribute('style').replace(/display\s*:\s*none/,  'display: block'));
      skip_div.setAttribute("style", div.getAttribute('style').replace(/display\s*:\s*block/,  'display: none'));
    }
  }
}


function nicorank_show_play_toolbar(){

  // Save status.
  toolbarVisibleState = "play";

  // Make SkipToolbar invisible.
  var div = document.getElementById(ID_NICORANKPLAYER_SKIP_TITLE_NODE);
  if(div.getAttribute('style').match('display\\s*:\\s*block')){
    div.setAttribute("style", div.getAttribute('style').replace(/display\s*:\s*block/,  'display: none'));
  }

  // Make PlayToolbar visible.
 div = document.getElementById('nicoRankPlayer');
  if(div.getAttribute('style').match('display\\s*:\\s*none')){
    div.setAttribute("style", div.getAttribute('style').replace(/display\s*:\s*none/,  'display: block'));
  }


}

// Display the SkipTitle toolbar.
function nicorank_show_skip_toolbar(){

  // Save status.
  toolbarVisibleState = "skip";

  var div = document.getElementById('nicoRankPlayer');
  // Make the RankPlayer invisible.
  if(div.getAttribute('style').match('display\\s*:\\s*block')){
    div.setAttribute("style", div.getAttribute('style').replace(/display\s*:\s*block/,  'display: none'));
  }

  // Make the TitleSkip Toolbar visible.

  div = document.getElementById(ID_NICORANKPLAYER_SKIP_TITLE_NODE);
  if(div.getAttribute('style').match('display\\s*:\\s*none')){
    div.setAttribute("style", div.getAttribute('style').replace(/display\s*:\s*none/,  'display: block'));
  }

}

// Dispatch the stop event to the frame contents.
function nicorank_dispathEvent_stop(){
  var ev = document.createEvent('CommandEvent');
  ev.initCommandEvent('NicoRankPlayerEvent', true, false,'stop');

  var ifr = document.getElementById("showPageIFrame");
  ifr.contentDocument.dispatchEvent(ev);
}//eof


function nicorank_dispathEvent_skip(stateMsg){
  var ev = document.createEvent('CommandEvent');
  ev.initCommandEvent('NicoRankPlayerEvent', true, false,'skip');
  document.dispatchEvent(ev);
}//eof

function nicorank_dispathEvent_play(stateMsg){
  var ev = document.createEvent('CommandEvent');
  ev.initCommandEvent('NicoRankPlayerEvent', true, false,'play');
  document.dispatchEvent(ev);
}//eof

// The handler function for next button.
function nextClickHandler(){
  loadNextVideoPage(true, 1);
}

function stopClickHandler(){
  if(! _ifr)return;
  // If the video is loading and this player is trying to start the video, then make this player stop tring to start loop.
  nicorank_dispathEvent_stop();

  try{
    var flvplayer = _ifr.contentDocument.getElementById('flvplayer');
    flvplayer.wrappedJSObject.ext_play(0);
    // NOTE: If we stop the timer, we can't restart the current video. This is the limitation of the current version.
    if (timer){
      clearTimeout(timer);
      timer = null;
    }
  } catch (x) {
    console.log(x);
    console.log("[ERROR]Failed to accesss the player.");
  }
}

var videoLenSec;

function startMusicFn(){
  var ifr = document.getElementById("showPageIFrame");
  if (! ifr){
    ifr = document.createElement('iframe');
    ifr.setAttribute("name", "showPageIFrame");
    ifr.setAttribute("id", "showPageIFrame");
    ifr.setAttribute("width", "80%");
    ifr.setAttribute("height", "0");
    ifr.setAttribute("align", "center");//not work
    ifr.src="";
    // Start auto play process, when IFrame src contents is chaned and load completed.
    ifr.addEventListener('load',function(e){embedAutoPlay();},false);

    document.getElementsByClassName("bg_headmenu")[0].insertBefore(ifr,document.getElementsByClassName('bg_headmenu')[0].lastChild.nextSibling);


  ifr.addEventListener(
    'load',function(e){
      var flvplayer = ifr.contentDocument.getElementById('flvplayer_container');
      // When displayed login page.
      if (! flvplayer){
             // alert("flvplayer not found");
        if(timer){
          clearTimeout(timer);
          timer = null;
        }
        return;      
      }

// Update player state.
      ifr.contentDocument.addEventListener(
        "NicoRankPlayEvent", 
        function(e) { 
          getNicoStateNode().textContent = e.wrappedJSObject.command;
        }, false, true);

    GM_xmlhttpRequest({
      method: 'GET',
      url: "http://ext.nicovideo.jp/api/getthumbinfo/" + getVideoName(nicoRankItems[getNicoRevCheckNode().checked ? currentPageRank +1 : currentPageRank -1].href),
      headers: {
          'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          'Accept': 'application/atom+xml,application/xml,text/xml,application/x-httpd-php'
      },
      onload: function(responseDetails) {
        if(responseDetails.status != 200){
          alert('unexpected response code:' + responseDetails.status + ' ' + responseDetails.statusText);
          return;
        }
        var err = isResponseError(responseDetails.responseText);
        if(err){
          alert(err + ":" + getVideoName(nicoRankItems[getNicoRevCheckNode().checked ? currentPageRank +1 : currentPageRank -1].href));
          alert("currentPageRank:" + currentPageRank + "\nurl: " + "http://ext.nicovideo.jp/api/getthumbinfo/" + getVideoName(nicoRankItems[getNicoRevCheckNode().checked ? currentPageRank +1 : currentPageRank -1].href));
          return;
        }
        videoLenSec = getVideoLengthFromGMResponse(responseDetails.responseText);
//        alert("[DEBUG]len:" + videoLenSec);
        if(videoLenSec == 0){
          alert("[ERROR]:video len is 0!!!!!");
        }
        GM_log("[TRACE]videoLenSec:" + videoLenSec);
        // var tmpLenNode = getNicoCurrentVideoLenNode();
        // GM_log("lennode elm:" + tmpLenNode);
        getNicoCurrentVideoTitleNode().textContent=getVideoTitleFromGMResponse(responseDetails.responseText);
        GM_log("[TRACE]before set lensec.");
        getNicoCurrentVideoLenNode().textContent=videoLenSec;
        GM_log("[TRACE]timer existance check.");
        if(timer){
          clearTimeout(timer);
          alert("[WARN]now playing and the timer for next video is already set.");
        }
        GM_log("[TRACE]timer set before.");
        timer = setTimeout(loadNextVideoPage, (videoLenSec * 1000) + DELAY_MILLI_SEC, false);
        GM_log("[TRACE]timer set end.");
      },
      onerror: function(e){
        alert("fail to get information about:" + getVideoName(nicoRankItems[getNicoRevCheckNode().checked ? currentPageRank +1 : currentPageRank -1].href));
      }
    });
  },false);

  }//if end
  _ifr = ifr;
  loadNextVideoPage(true);
}//eof:sstartMusicFn()


// @param isUserInput If called from user Input and passed true, else false.
function loadNextVideoPage(isUserInput, step){
GM_log("[TRACE]userInput?:" + isUserInput);

  var ifr = document.getElementById("showPageIFrame");

// Get the video number to start from text input on the toolbar. User can edit this number.
  var videoRankNumber;

  if(isUserInput){
    // When user push play, next or previous button, force timer stop.
    if(timer){
      clearTimeout(timer);
      timer = null;
GM_log("[TRACE]user input clear timer.");
    }

    if(getNicoCurrentVideoPosNode().value.length != 0){
      videoRankNumber = parseInt(getNicoCurrentVideoPosNode().value,10);
      if(! isNaN(videoRankNumber)){
        if(videoRankNumber <= 0){
          videoRankNumber = 1;
        }else if(videoRankNumber > 100 ){
          videoRankNumber = 100;
        }else if( step !== undefined){
          videoRankNumber += step;
        }
        currentPageRank = videoRankNumber -1;
      }
    }// if video num
  }else{
    // timer is executed, so init timer variable.
    if(timer){
      clearTimeout(timer);
      timer = null;
      GM_log("[TRACE]timer handler clear timer.");
    }
    // Use incremented(or decremented) currentPageRank.


    // When timeout and force to move to the next video. Else parhaps advertisement is played.
//    if(!bForceNextVideo){
//      var flvplayer = ifr.contentDocument.getElementById('flvplayer');
//      if (flvplayer.wrappedJSObject.ext_getStatus() == 'playing') {
//        setTimeout(loadNextVideoPage, 5000, false);
//        return;
//      }
//    }// if force
  }
  var step_count = getNicoRevCheckNode().checked ? -1 : 1;
  while(1){
  GM_log("[trace]here:" + nicoRankSkipTitles + ":" + nicoRankItems[currentPageRank].title);
    // if(nicoRankSkipTitles.match(nicoRankItems[videoRankNumber].title)){

    if(nicoRankItems[currentPageRank].title.match( new RegExp("(" + nicoRankSkipTitlesArr.join("|") + ")"))){

  GM_log("[trace]match and increment" );
      currentPageRank += step_count;
      if((step_count < 0 && currentPageRank <= 0) || (step_count > 0 && currentPageRank >= 100)){
        break;
      }
      continue;
    }
    break;
  }
  GM_log("[trace]while end;" );
   videoRankNumber= currentPageRank +1;


  ifr.src = nicoRankItems[currentPageRank].href;
  getNicoCurrentVideoPosNode().value=currentPageRank+1;
  if(getNicoRevCheckNode().checked){
    --currentPageRank;
  }else{
    ++currentPageRank;
  }

  GM_log("[TRACE]next will:" + currentPageRank);
}//eof


function embedAutoPlay(){
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.innerHTML = '(' + videoPageMain.toString() + ')()';
    var ifr = document.getElementById("showPageIFrame");
    ifr.contentDocument.body.appendChild(script);

  // Add the message handler to stop the video that is loading to start.
  script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  // Add the flag to stop the loop for auto play.
  script.innerHTML = "var nicorankstopflag = false;document.addEventListener('NicoRankPlayerEvent', function(e) {nicorankstopflag=true;var command = e.command;if(command == 'stop'){nicorankstopflag=true;}},false);";
    ifr.contentDocument.body.appendChild(script);

}


// - Util.
// Wrapper function to get current playing video rank TextNode.
function getNicoCurrentVideoPosNode(){
    return document.getElementById(ID_NICORANKPLAYER_CURRENT_POS);
}


// - Util
function getNicoCurrentVideoTitleNode(){
    return document.getElementById(ID_NICORANKPLAYER_VIDEO_TITLE).childNodes[0];
}

// - Util
function getNicoCurrentVideoLenNode(){
    return document.getElementById(ID_NICORANKPLAYER_VIDEO_LEN).childNodes[0];
}

// - Util
function getNicoRevCheckNode(){
    return document.getElementById(ID_NICORANKPLAYER_REVEERSE_CHECK);
}

// - Util
function getNicoStateNode(){
    return document.getElementById("nicoRankPlayerTd").childNodes[0];
}


// - Util.
// Get the video name like smXXXX from the passed URL.
function getVideoName(path){
  var result = path.match('/((?:[a-zA-Z]{2})[0-9]+)$');
  if(result && result.length == 2){
    return result[1];
  }
alert("[ERROR][getVideoName]path is invalid:" + path);
// TODO: Should output some trace log.
  return null;
}


function isResponseError(txt){
  var parser = new DOMParser();
  var dom = parser.parseFromString(txt, "application/xml");
  var err_arr = dom.getElementsByTagName('error');
  if(err_arr && err_arr.length > 0){
    return err_arr[0].getElementsByTagName('code')[0].textContent;//err_arr[0].getElementsByTagName('description')[0].textContent
  }else{
    return null;
  }
}


// - Util.
function getVideoLengthFromGMResponse(txt){
  var parser = new DOMParser();
  var dom = parser.parseFromString(txt, "application/xml");
  var mm_ss_str = dom.getElementsByTagName('length')[0].textContent;
  var parsed_mm_ss = mm_ss_str.match("(\\d.*)\\:(\\d.*)");
  return eval(parsed_mm_ss[1])* 60 + eval(parsed_mm_ss[2]);
}

// - Util
function getVideoLengthRawFromGMResponse(txt){
  var parser = new DOMParser();
  var dom = parser.parseFromString(txt, "application/xml");
  return dom.getElementsByTagName('length')[0].textContent;
}

// - Util
function getVideoTitleFromGMResponse(txt){
  var parser = new DOMParser();
  var dom = parser.parseFromString(txt, "application/xml");
  return dom.getElementsByTagName('title')[0].textContent;
}


// Embed auto play loop to the video page.
function videoPageMain(){

// - Util. But not used.
function sendLog(str){

    GM_xmlhttpRequest({
      method: 'POST',
      url: "http://localhost:3000/log",
      headers: {
          'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          'Accept': 'application/atom+xml,application/xml,text/xml,application/x-httpd-php'
      },
      data:str});
}

window.addEventListener('load',function(e){
//GM_log("[TRACE]load for play:");
//sendLog("[TRACE]load for play:");
  play();
  },false);

    function play() {
      createAndDispatchRankEvent("tring to playing");
      var flvplayer = document.getElementById('flvplayer');
      if (!flvplayer && !nicorankstopflag){
// alert('flag:' + nicorankstopflag);
        setTimeout(play,1000);
      }else{
        waitAndPlay();  
      }
    }

var retryCount=0;
function waitAndPlay(){

  var flvplayer = document.getElementById('flvplayer');
  try{
    if (flvplayer.ext_getStatus() != 'playing' && !nicorankstopflag) {//or stopped,paused
      createAndDispatchRankEvent("trying to play...");
      flvplayer.ext_play(1);
// alert('flag:' + nicorankstopflag);
      setTimeout(waitAndPlay,1500);
    }else{
      createAndDispatchRankEvent("playing");
//      console.log("[TRACE]waitAlayPlay()playing!");
      retryCount++;
      if(retryCount < 3){
        setTimeout(waitAndPlay,3000);
      }else{
        retryCount = 0;
      }
    }
  } catch (e) {
    createAndDispatchRankEvent("trying to play.");
//    console.log("[TRACE]waitAlayPlay()error catch and retry");
    setTimeout(waitAndPlay,1500);
  }

}//eof

// Create and dispatch the custom event to pass the state message to the parent window.
function createAndDispatchRankEvent(stateMsg){
  var ev = document.createEvent('CommandEvent');
  ev.initCommandEvent("NicoRankPlayEvent", true, false,stateMsg);
  document.dispatchEvent(ev);
//eval("(" + parent.document.getElementById("nicoRankPlayer").getAttribute("setStatus") + ")(\"" + stateMsg + "\");");
}//eof

play();
}//eof:videoPageMain()


// Main process.
if(document.URL.indexOf("http://www.nicovideo.jp/ranking/fav/daily/") == 0){
  setCommandHandler();
  showNicoRankPlayerToolbar();
}

// Set the handler to listen command events which is thrown by the embeded javascripts.
function setCommandHandler(){
document.addEventListener(
  "NicoRankPlayerEvent", 
  function(e) { 
    var command = e.wrappedJSObject.command;
    if(command == 'toggle'){
      nicorank_toggle_display_toolbar();
    }else if(command == 'skip'){
      // Show skip toolbar.
      // alert('skip word callback');
      nicorank_show_skip_toolbar();
    }else if(command == 'play'){
      nicorank_show_play_toolbar();
    }else{
      alert('[ERROR]unexpected command:' + command);
    }
  }, false, true);
}// eof



})();

