// ==UserScript==
// @id             ingatlan-com-hirdetes-elrejto
// @name           Rejtsd el a nem tetszo ingatlant (ingatlan.com)
// @version        1.00
// @author         mihi
// @description    Elrejti a listanézetbol a nem tetsző ingatlanokat
// @include        http://ingatlan.com/lista/*
// @run-at         document-end
// ==/UserScript==
function saveToCookie(id)
{
  document.cookie=id + "=" + id;
}
//from w3schools
function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}
var $ = unsafeWindow.jQuery
$('td.address > a.rowclick').each(function(idx) {
    var adverId = $(this).attr('href');
    adverId = adverId.split('/').pop().split('?').shift();
    var hide=getCookie(adverId);
    if (hide!=null && hide!="") {
      var $row = $($(this).closest('tr'));
      $row.next().hide()
      $row.hide()
    }
    else {
      var $row = $($(this).closest('td'));
      var btn = document.createElement( 'input' );
      with( btn ) {
        setAttribute( 'value', 'Nem érdekel!' );
        setAttribute( 'type', 'button' );
        setAttribute( 'id', adverId );
        setAttribute( 'class', 'buttons' );
      }
      // append
      $row.next().append(btn);
    }
})
$(".buttons").click(function() {
  saveToCookie(this.id);
  var $row = $($(this).closest('tr'));
  $row.next().hide("slide")
  $row.hide("slide")
})