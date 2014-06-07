// ==UserScript==
// @name           AndroidLinks for CPC
// @namespace      ELK
// @description    Ajoute un bouton pour transformer une URL en qrcode clickable sur CPC.
// @include        http://forum.canardpc.com/newreply.php?do=postreply&*
// ==/UserScript==

var prev = document.getElementById('vB_Editor_001_cmd_redo');
var ta = document.getElementById('vB_Editor_001_textarea');
if(prev && ta)
{
  var img = document.createElement('IMG');
  img.src = 'data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%14%08%02%00%00%00%02%EB%8AZ%00%00%00zIDAT8%CB%8D%94%3B%0E%C00%08Cs%FFK%93!%0B%01%FB%01C%A5F%FE%08%3B%ED9j%22%02%5E%2B4%8F%23wX%15%CE%B8%2C-a39%1Fn%C9%DD%D3%92%E5%CE%FDP%EC%EC%D2v%F9%D9%A8%BBp%F8%A9*c%B1%82%069K%C3%AA%CE%25%C9%D8%08-i%1F%12%C2%80z%A9-%99%B9%CE%8C%3D%9D%F3%F6n%D3l%02%B3%97%84%3F%0C%99%FC%EAg0%F4%CC%8B8%E7%F7%BC%12%89%3A%E2I%A5%91%D6%00%00%00%00IEND%AEB%60%82';
  img.onclick= function()
  {
    var url = (ta.selectionStart < ta.selectionEnd)?ta.value.substring(ta.selectionStart,ta.selectionEnd):prompt('URL','http://');
    if(url)
    {
      var t ='[URL="'+url+'"][IMG]https://chart.googleapis.com/chart?cht=qr&chs=256x256&chl='+url+'[/IMG][/URL]';
      ta.value=ta.value.substr(0,ta.selectionStart)+t+ta.value.substr(ta.selectionEnd);
    }
  };
  img.className = 'imagebutton';
  var nb = document.createElement('LI');
  nb.appendChild(img);
  prev.parentNode.parentNode.insertBefore(nb,prev.parentNode.nextSibling);
}

