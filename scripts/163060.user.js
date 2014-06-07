// ==UserScript==
// @name			ASB-Smiley-Script
// @description		Adds Smilies to the page - by FAK-masteR
// @include			http://www.austriansoccerboard.at/*
// @version			1.0.0
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

document.getElementById('fast_reply_controls').innerHTML+='<span id="moresmileys"><img src="http://www.y00u.eu/smileys/more.png" /></span>';
document.getElementById('fast_reply_controls').innerHTML+='<div id="spoiler1" style="display:none;">'+

'<img onmouseover="this.style.cursor=\'pointer\'" onclick="insert('[img]"http://imageshack.us/a/img823/3106/fakpudel.png[/img]\')" src="http://imageshack.us/a/img823/3106/fakpudel.png" alt="" title="smile">'+
'<img onmouseover="this.style.cursor=\'pointer\'" onclick="WysiwygInsert(\'smiley\', \'http://img6.imageshack.us/img6/7933/fakmaster1.png\', \'smile\', \'[img]"http://img6.imageshack.us/img6/7933/fakmaster1.png[/img]\');" src="http://img6.imageshack.us/img6/7933/fakmaster1.png" alt="" title="smile">'+
'</div>';

$("#moresmileys").click(function() {
  $("#spoiler1").toggle(500);
});

function insert(aTag, eTag) {
  var input = document.getElementById['cke_contents_editor_51519e7fa1cba'].elements['Post'];
  input.focus();
  /* für Internet Explorer */
  if(typeof document.selection != 'undefined') {
    /* Einfügen des Formatierungscodes */
    var range = document.selection.createRange();
    var insText = range.text;
    range.text = aTag + insText + eTag;
    /* Anpassen der Cursorposition */
    range = document.selection.createRange();
    if (insText.length == 0) {
      range.move('character', -eTag.length);
    } else {
      range.moveStart('character', aTag.length + insText.length + eTag.length);      
    }
    range.select();
  }
  /* für neuere auf Gecko basierende Browser */
  else if(typeof input.selectionStart != 'undefined')
  {
    /* Einfügen des Formatierungscodes */
    var start = input.selectionStart;
    var end = input.selectionEnd;
    var insText = input.value.substring(start, end);
    input.value = input.value.substr(0, start) + aTag + insText + eTag + input.value.substr(end);
    /* Anpassen der Cursorposition */
    var pos;
    if (insText.length == 0) {
      pos = start + aTag.length;
    } else {
      pos = start + aTag.length + insText.length + eTag.length;
    }
    input.selectionStart = pos;
    input.selectionEnd = pos;
  }
  /* für die übrigen Browser */
  else
  {
    /* Abfrage der Einfügeposition */
    var pos;
    var re = new RegExp('^[0-9]{0,3}$');
    while(!re.test(pos)) {
      pos = prompt("Einfügen an Position (0.." + input.value.length + "):", "0");
    }
    if(pos > input.value.length) {
      pos = input.value.length;
    }
    /* Einfügen des Formatierungscodes */
    var insText = prompt("Bitte geben Sie den zu formatierenden Text ein:");
    input.value = input.value.substr(0, pos) + aTag + insText + eTag + input.value.substr(pos);
  }
}