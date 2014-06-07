// ==UserScript==
// @name           YouTube fmt=22 with Fallback Adder
// @namespace      http://userscripts.org/users/23652
// @description    Adds &fmt=22 to the url for high quality. If HD is not available, it falls back to &fmt=18 else but not if any &fmt=x already exist. Adjustable in the source!
// @include        http://*.youtube.com/*
// @copyright      JoeSimmons - modified by lolwuut
// ==/UserScript==

// ################### SET FMT VALUES HERE ###################
// Set normal fmt-value here
var normal = '&fmt=22';
// Set fallback fmt-value here
var fallback = '&fmt=18';
// ################### SET FMT VALUES HERE ###################

/*
fmt values:
&fmt=22 equals 1280×720.
&fmt=35 equals 640×480 
&fmt=18 equals 480x360
Youtube Standard Quality equals 320x240

fmt=18
- Sound: Stereo, 44KHz
- Max Best Resolution: 480×360
- Video Output Format: FLV
- Sound Output Format: H264/AAC
- Video Download Format: MP4

fmt=22
- Sound: Stereo, 44KHz
- Max Best Resolution: 1280×720
- Video Output Format: MP4
- Sound Output Format: H264/AAC
- Video Download Format: MP4

fmt=35
- Sound: Stereo, 44KHz
- Max Best Resolution: 640×480
- Video Output Format: FLV
- Sound Output Format: H264/AAC
- Video Download Format: FLV
*/


// ################### Code starts here - Do not edit! ###################
var config = unsafeWindow.yt.config_;
function makeHQ() {
var lhr = location.href;
if(/^https?:\/\/(\w+\.)?youtube\.com\/watch\?.*v=/.test(lhr)) {
  if(!/(\&|\?)fmt=(18|17|16|34|35|22)/.test(lhr)) {
    if(/((\&|\?)fmt=$)|((\&|\?)fmt=\&)|((\&|\?)fmt=\d+)/.test(lhr)) {
      if(!config.IS_HD_AVAILABLE) location.replace(location.replace(/(\&|\?)fmt=(\d+)?/g, fallback));
      else location.replace(location.replace(/(\&|\?)fmt=(\d+)?/g, normal));
    }
    else if(!/(\&|\?)fmt=\d+/.test(lhr)) {
      if(!config.IS_HD_AVAILABLE) location.replace(location+=fallback);
      else location.replace(location+=normal);
    }
   }
  }
}

setTimeout(makeHQ, 0);