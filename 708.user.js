// ==UserScript==
// @name            CheckLastVisited
// @namespace       http://espion.just-size.jp/archives/05/136155838.html
// @description     Last Visited Checker
// @include         http://espion.just-size.jp/*
// ==/UserScript==
//
// $Id: CheckLastVisited.user.js 578 2005-05-31 04:07:29Z takayama $

(function() {

   var style_bar =
   {
      position: "fixed",
      bottom: 0,
      left: 0,
      zIndex: 100,
      color: "#000",
      padding: '2px',
      backgroundColor: "#eee",
      opacity: 0.6,
      fontSize: '12px',
   };

   var mod = false;
   var old = 0;

   function main() {
      var bar = _get();
      bar.setAttribute('id', 'CheckLastVisitedBar');
      _styles(style_bar, bar.style);

      if(mod) _set();

      if(document.body)
         document.body.appendChild(bar);
   }

   function _set() {
      var time    = (new Date()).getTime();
      var expdate = new Date;
      expdate.setTime (expdate.getTime() + (24*60*60*1000*30)); // Cookie ÃÂ¤ÃÂÃÂÃ?ÃÂ»ÃÂ½ÃÂ´ÃÂ¼ÃÂ¸ÃÂ 30ÃÂÃÂ¼

      document.cookie = "LastVisited1="+time+";expires ="+expdate.toGMTString();
      document.cookie = "LastVisited2="+old+";expires ="+expdate.toGMTString();
   }

   function _get() {
      var cookie = document.cookie;

      cookie.match(/LastVisited1=(\d+)/);
      var time1 = parseInt(RegExp.$1);

      cookie.match(/LastVisited2=(\d+)/);
      var time2 = parseInt(RegExp.$1);

      var date1 = new Date();
      var date2 = new Date();

      if(time1) {
         // 10ÃÂÃÂ¬ÃÂ·Ã?ÃÂ²ÃÂ¡ÃÂ¤ÃÂ·ÃÂ¤ÃÂ¿ÃÂ¤ÃÂ©ÃÂ¹ÃÂ¹ÃÂ¿ÃÂ·
         if(time1 + (1000*60*10) < date1.getTime()) mod = true;

         date1.setTime(time1);
      } else mod = true;

      if(time2) date2.setTime(time2);

      old = time1;

      var div = document.createElement('div');
      div.appendChild(document.createTextNode('1:'+_getTime(date1)));
      div.appendChild(document.createElement('br'));
      div.appendChild(document.createTextNode('2:'+_getTime(date2)));
      return div;
   }

   function _styles(from, to) {
      for(var i in from)
         to[i] = from[i];
   }

   function _getTime(tm) {
      var year  = tm.getYear()+1900;
      var month = tm.getMonth()+1;
      var day   = tm.getDate();
      var hour  = tm.getHours();
      var min   = tm.getMinutes();
      var sec   = tm.getSeconds();

      if(month < 10) month = '0'+month;
      if(day   < 10) day   = '0'+day;
      if(hour  < 10) hour  = '0'+hour;
      if(min   < 10) min   = '0'+min;
      if(sec   < 10) sec   = '0'+sec;

      return month+'-'+day+' '+hour+':'+min;
      //return year+'-'+month+'-'+day+' '+hour+':'+min;
   }

   main();
})();

