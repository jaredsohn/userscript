// ==UserScript==
// @name          Wrzuta.pl - Bitrate information
// @namespace     http://nerdblog.pl/
// @description   changes useless filesize to song's approximated bitrate (only in search)
// @include       http://*.wrzuta.pl/szukaj/*
// @include       http://wrzuta.pl/szukaj/*
// @copyright     Michał "D4rky" Matyas, http://nerdblog.pl ; BSD License
// ==/UserScript==

   var audlist = document.getElementById('user_aud_list');
   var info = audlist.getElementsByClassName('more');

   for(i=0,l=info.length; i<l; i++)
   {
      var time = info[i].childNodes[0].textContent;
      var s = time.split(':');
      if(s.length == 3)
         var seconds = parseFloat(s[0])*3600 + parseFloat(s[1])*60 + parseFloat(s[2])
      else
         var seconds = parseFloat(s[0])*60 + parseFloat(s[1]);

      var size = info[i].childNodes[2].textContent;
      var kilobits = parseInt(parseFloat(size.replace(',','.')) * 8);

      if(size.match('MB'))
         kilobits = kilobits * 1024;

      var kbps = kilobits/seconds;

      var types = [32,64,96,128,192,256,320,640];
      var roundedkbps = null;
      for(n=1, m=types.length; n<m; n++)
      {
         if( ((types[n-1] + types[n])/2 < kbps) && ((types[n] + types[n+1])/2 > kbps) )
            roundedkbps = types[n];
      }
      if(roundedkbps === null)
          roundedkbps = 'FLAC';
      else
          roundedkbps = roundedkbps + " kbps";
   
      info[i].childNodes[2].innerHTML = roundedkbps + " <div style='color:#888;font-size:85%'>(" + size + ")</div>";
   }