   1.
      // ==UserScript==
   2.
      // @name           AlertBucks Test
   3.
      // @include        http://www.alertbucks.com/index.php?option=surf
   4.
      // ==/UserScript==
   5.
      var processed=false;
   6.
      var i=0;
   7.
      function work()
   8.
      {
   9.
              while(link=document.links[i++])
  10.
              {
  11.
                      if(id=link.href.match(new RegExp('view.php\\?ad=(.*)')))
  12.
                      {
  13.
                              processed=true;
  14.
                              GM_xmlhttpRequest({
  15.
                                      method:'GET',
  16.
                                      url:link.href,
  17.
                                      id:id[1],
  18.
                                      onload:function(xhr)
  19.
                                      {
  20.
                                              if(code=xhr.responseText.match(new RegExp('var code = "(.*)";')))
  21.
                                              {
  22.
                                                      GM_xmlhttpRequest({
  23.
                                                              method:'GET',
  24.
                                                              url:'http://www.alertbucks.com/success.php?ad='+this.id+'&code='+code[1]+'&verify=1',
  25.
                                                              onload:function(xhr)
  26.
                                                              {
  27.
                                                                      work();
  28.
                                                                      return;
  29.
                                                              }
  30.
                                                      });
  31.
                                              }
  32.
                                              return;
  33.
                                      }
  34.
                              });
  35.
                              break;
  36.
                      }
  37.
              }
  38.
              if(i>document.links.length&&processed)location.href=location.href;
  39.
              return;
  40.
      };
  41.
      work();