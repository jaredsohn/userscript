// ==UserScript==
// @name           Lunarstorm Guestbook Personalizer
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    Replaces local ads with an image of the guestbook's owner.
// @include        http://www.lunarstorm.se/gst/gst_guestbook.aspx*
// ==/UserScript==

/*
.main,.mainraw { background:transparent !important; }
table.box { background:#FFF url("http://photo.lunarstorm.se/large/422/%7B4224B6C6-4B3D-4B20-96C3-36CBC66BE35D%7D.jpg") no-repeat right 62px;}
*/

(function()
{
  // Returns the screen coordinates in pixels from the window viewport
  function getScreenCoordinate( node )
  {
    var x = node.offsetLeft;
    var y = node.offsetTop;
    while( node = node.offsetParent )
    {
      x += node.offsetLeft;
      y += node.offsetTop;
    }
    return { x:x, y:y };
  }

  var id = unescape( /userid=([^&]*)/.exec( location.search )[1] );
  var ad = document.getElementsByTagName( 'iframe' )[0].parentNode;
  var at = getScreenCoordinate( ad );
  var tr = ad.parentNode;
  var tc = tr.previousSibling.previousSibling.getElementsByTagName( 'tr' );
  var bc = tr.nextSibling.nextSibling.getElementsByTagName( 'td' );
  var co = 'http://www.lysator.liu.se/~jhs/userscript/www.lunarstorm.se/gfx/';
  var im = { w:305, h:407, src:id.substr(1,3) + '/' + id + '.jpg' };
  var dx = Math.floor( /*at.x*/ - (im.w-199)/2 ) +'px', dy = (at.y - 2) + 'px';
  im.src = 'http://photo.lunarstorm.se/large/' + im.src;
  ad.innerHTML = '<div style="position:relative;left:-52px;"><img src="' +
    im.src +'" style="clip:rect(0, 253px, 403px, 52px);position:absolute;"/>' +
    '</div>';
  ad.style.background = 'black';
  ad.style.height = (im.h-4) + 'px';
  tc[0].style.height = '21px';
  bc[1].parentNode.parentNode.parentNode.style.background = 'black url("' +
    im.src + '") no-repeat ' + dx + ' -' + (im.h - 4) + 'px';
  bc[1].innerHTML = '<img src="'+ co +'botl.gif">';
  bc[2].innerHTML = '<img src="'+ co +'bot.gif" height=5 width=193>';
  bc[3].innerHTML = '<img src="'+ co +'botr.gif">';
  var t = 'transparent';
  bc[1].style.background = bc[2].style.background = bc[3].style.background = t;
  /*
  bc[1].style.backgroundImage = 'url("' + co + 'botl.gif")';
  bc[2].style.backgroundImage = 'url("' + co + 'bot.gif")';
  bc[3].style.backgroundImage = 'url("' + co + 'botr.gif")';
  */
  //ad.style.background = '#296B84 url("'+im.src+'") no-repeat 50% 0px';
  /*
  document.body.style.background = '#296B84 url("http://photo.lunarstorm.se/' +
    'large/'+ id.substr( 1, 3 ) +'/'+ id +'.jpg") no-repeat '+ dx +' '+ dy;
  */

  var re = /<td class="topraw">([^<]*)s G\344stbok/;
  var me = re.exec( document.body.innerHTML );
  var ru = ad.parentNode.previousSibling.previousSibling;
  if( me ) ru.innerHTML = ru.innerHTML.replace( /Lokalt i [^<]*/, me[1] );
})();
