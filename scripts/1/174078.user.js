// ==UserScript==
// @name       Guzik
// @namespace  http://mongla.net
// @version    1.2
// @include    http://www.ufs.pt/forum/showthread.php*
// @require   http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// ==/UserScript==

(function() {
  var css = "\n.wheatButton { vertical-align: top; display: inline-block; padding: 5px 6px 4px; background-color: #FFA502; color: black!important; text-decoration: none!important; border-radius: 4px; font-weight: bold; cursor: pointer; }\n}";
  if (typeof GM_addStyle != "undefined") {
    GM_addStyle(css);
  } else if (typeof PRO_addStyle != "undefined") {
    PRO_addStyle(css);
  } else if (typeof addStyle != "undefined") {
    addStyle(css);
  } else {
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
      var node = document.createElement("style");
      node.type = "text/css";
      node.appendChild(document.createTextNode(css));
      heads[0].appendChild(node); 
    }
  }
})();


$(document).ready(function ()
{
  $("<a>",
  {
    "class": "wheatButton",
    text: "Edytuj Pierwszy",
    "id": "PostTwo",
    value: "up",
    type: "button",
    style: "position: fixed; top: 10px; right: 85px;"
  }).appendTo("body"); 
  $("<a>",
  {
    "class": "wheatButton",
    text: "Sprawdzam",
    "id": "sprawdzam",
    value: "up",
    type: "button",
    style: "position: fixed; top: 40px; right: 85px;"
  }).appendTo("body"); 
  $("<a>",
  {
    "class": "wheatButton",
    text: "Zatwierdź",
    "id": "zatwierdz",
    value: "up",
    type: "button",
    style: "position: fixed; top: 70px; right: 85px;"
  }).appendTo("body"); 
  $("<a>",
  {
    "class": "wheatButton",
    text: "Niezatwierdzony",
    "id": "niet",
    value: "up",
    type: "button",
    style: "position: fixed; top: 100px; right: 85px;"
  }).appendTo("body"); 
  $("<a>",
  {
    "class": "wheatButton",
    text: "Usuń 2 Post",
    "id": "stamp",
    value: "up",
    type: "button",
    style: "position: fixed; top: 130px; right: 85px;"
  }).appendTo("body"); 
  $("<a>",
  {
    "class": "wheatButton",
    text: "Przenieś",
    "id": "teleport",
    value: "up",
    type: "button",
    style: "position: fixed; top: 160px; right: 85px;"
  }).appendTo("body"); 
  $("<a>",
  {
    "class": "wheatButton",
    text: "Dodaj Hide",
    "id": "addHide",
    value: "up",
    type: "button",
    style: "position: fixed; top: 190px; right: 85px;"
  }).appendTo("body"); 

  $('#PostTwo').click(function() {
    testy();
  });
  $('#sprawdzam').click(function() {
    sprawdzam();
  });     $('#zatwierdz').click(function() {
    zatwierdz();
  });     $('#niet').click(function() {
    niet();
  });   $('#stamp').click(function() {
    stamp();
  });
  $('#teleport').click(function() {
    teleport();
  });
  $('#czer').click(function() {
    czer();
  });
  $('#addHide').click(function() {
    addHide();
  });
  function testy() {
    postie = $(".editpost").first().attr("href");
    window.location.href = postie;
  }
  function sprawdzam(){
    $('.cke_enable_context_menu').last().val('Sprawdzam/Moje ' + (new Date).getTime())
    $('#qr_submit').click()
  }
  function addHide(){
    $(".editpost").first().click()
    setTimeout(
      function() 
      {
        $('.cke_enable_context_menu').first().val(
          function(i,val){
            return '[hide] ' + val;
          });
        $('.cke_enable_context_menu').first().val(
          function(i,val){
            return val + '[/hide]';
          });
      $("input[value='Zapisz']").first().click()
      }, 2000);
}
function czer(){
    $('.cke_enable_context_menu').last().val('[center][img]http://www.ufs.pt/grafika/niezatwierdzone.png[/img][/center]')
    $('#qr_submit').click()
  }
  function zatwierdz(){
    $(".editpost").last().click()
    setTimeout(
      function() 
      {
        $('.cke_enable_context_menu').first().val('[center][img]http://www.ufs.pt/grafika/zatwierdzone.png[/img][/center]')
        $("input[value='Zapisz']").first().click()
      }, 2000);
  }
  function niet(){
    $(".editpost").last().click()
    setTimeout(
      function() 
      {
        $('.cke_enable_context_menu').first().val('[center][img]http://www.ufs.pt/grafika/niezatwierdzone.png[/img][/center]')
        $("input[value='Zapisz']").first().click()
      }, 2000);
  }
  function stamp(){
   $(".editpost:eq(1)").last().click()
   setTimeout(
    function() 
    {
     $("input[value='Usuń']").first().click()
     $("input[name='deletepost']").first().click()
     $("input[value='Usuń posta']").first().click()
   }, 2000);
 }
 function teleport(){
  $("a[class='popupctrl']").first().click()
  $("input[value='movethread']").first().click()
  $("input[value='Dalej']").first().click()
}

})