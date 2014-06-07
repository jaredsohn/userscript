// ==UserScript==
// @name             CiNitter
// @namespace        http://www.tadafumisato.com
// @description      tweet your behavior on CiNii.
// @include          http://ci.nii.ac.jp/*
// @copyright        2009,tadafumi sato(http://exposed.egoism.jp/wordpress/)
// @version          1.1
// ==/UserScript==

(function(){

   var ICON_URL = 'http://s.twimg.com/images/default_profile_normal.png';
   var DEBUG = false;
   var USER_INFO = eval(GM_getValue('UserInfo'));

   if(typeof USER_INFO == 'undefined'){
     USER_INFO = setUserInfo('enable', ICON_URL);
   }else if(USER_INFO.state == 'enable'){
     var attDiv = document.createElement('div');
     attDiv.setAttribute('style',
       'height          : 18px;'+
       'width           : 125px;'+
       'font-size       : 18px;'+
       'font-weight     : bold;'+
       'background-color: #FFFFFF;'+
       'color           : #9AE4E8;'+
       'border          : solid 3px #FF1493;'+
       'position        : fixed;'+
       'left            : 3px;'+
       'top             : 3px;'+
       'z-index         : 255;'+
       'cursor          : pointer;'
     );
     var proImg = document.createElement('img');
     proImg.setAttribute('src', USER_INFO.icon_url);
     proImg.setAttribute('style',
       'height        : 16px;'+
       'width         : 16px;'+
       'vertical-align: bottom;'+
       'margin        : 0px 3px 0px 3px;'
     );
     attDiv.appendChild(proImg);
     attDiv.innerHTML += 'CiNitter ON';
     attDiv.addEventListener('click', function(){
       changeState();
       attDiv.setAttribute('style',
	 'visibility: hidden;'
       );
     }
     ,false);
     document.body.appendChild(attDiv);
   }

   var title = document.title;
   if(USER_INFO.state == 'enable'){
     tweet(title.replace(/^CiNii[\S\s]*?-\s*/, ''));
   }

   function tweet(t){
     var o = {
       method : 'POST',
       url    : 'https://twitter.com/statuses/update.json',
       headers: {'Content-type': 'application/x-www-form-urlencoded'},
       data: 'status=@CiNitter '+ t,
       onload : function(r){
	 debug('CiNitter: '+ r.responseText);
	 var res = eval('('+ r.responseText +')');
	 setUserInfo(null, res.user.profile_image_url);
       },
       onerror: function(r){
	 debug('Erorr: '+ r.responseText);
       }
     };
     GM_xmlhttpRequest(o);
   }

   function changeState(){
     var u = eval(GM_getValue('UserInfo'));
     if(u.state == 'disable'){
       setUserInfo('enable', null);
     }else{
       setUserInfo('disable', null);
     }
   }
   GM_registerMenuCommand('CiNitter - on/off', changeState);

   function setUserInfo(s, i){
     var u = eval(GM_getValue('UserInfo'));
     if(s == null){s = u.state;}
     if(i == null){i = u.icon_url;}
     u = {
       state    : s,
       icon_url : i
     };
     GM_setValue('UserInfo', u.toSource());
     return u;
   }

   function debug(message){
     if(typeof DEBUG != 'undefined' && DEBUG){
       GM_log(message);
     }
   }

})();