// ==UserScript==
// @name           upmax
// @namespace      woyo
// @description    upmax
// @include        http://photo.woyo.com/upform.php?*
// ==/UserScript==

var g_upFileAry={};	

var up_maxNum=60;



 function createUp() {	
var d = new Date();
   $('#upload').createSwf({
     src		: 'http://image.woyo.com/swf/comm/upload.swf?'+d.getTime(),
     id		: 'fm_upload',
     w		: '85',
     h		: '25',
     ver		: 9,
     vars	: {
       php_name	: 'up',
       server_name	: 'pup',
       server_id	: 1,
       auth_key	: 'sss',
       sess		: '9a76b279b6f37d87c16a0ef13993d31e',
       up_chn		: 'photo',
       up_other	: aid+"-"+uid,
       up_maxNum	: up_maxNum,
       up_max	: 5*1024,
       up_error: "up_error",
       up_javacall	: 'up_fire'
     },
     params	: {menu:'false',wmode:'transparent',allowScriptAccess:'always'}
   });
 }

createUp();
alert('60max');