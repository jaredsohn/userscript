// ==UserScript==
// @name           Smileys must die
// @version        0.2.1
// @namespace      http://glesik.ru/
// @description    Replaces those bloody smileys with text using rules table
// @include        http://velopiter.spb.ru/forum/*
// @include        http://spb-projects.ru/forum/*
// ==/UserScript==

// Only first matched rule is applied. If second string (substitution text) is empty, it will be replaced with smiley filename in brackets. No wildcards support yet.

// 21.02.12 Unrecognized smileys now link to original images
// 04.02.12 Initial version

var Rules = [
            ['Smileys/default/smiley.gif', ':)'],
            ['Smileys/default/', ''],
            ['images/smiles/icon_biggrin.gif', ':D'],
            ['images/smiles/icon_smile.gif', ':)'],
            ['images/smiles/icon_sad.gif', ':('],
            ['images/smiles/icon_surprised.gif', ':o'],
            ['images/smiles/icon_eek.gif', '8o'],
            ['images/smiles/icon_confused.gif', ':?'],
            ['images/smiles/icon_cool.gif', '8)'],
            ['images/smiles/icon_lol.gif', '=D'],
            ['images/smiles/icon_redface.gif', ':blush:'],
            ['images/smiles/icon_rolleyes.gif', ':roll:'],
            ['images/smiles/', ''],
            ['images/smilies/', ''],           
            ['smilies/kolob/', ''],
            ['Smileys/ArmSmile/111.gif', '=D'],
            ['Smileys/ArmSmile/', ''],
            ['yoursmileys.ru/tsmile', ''],
            ['yoursmileys.ru/psmile', ''],
            ['nunahren.ru/images/stories/sm/', ''],
            ['forum.littleone.ru/images/smail/', ''],
            ['kolobok.us/smiles/', ''],
            ['smiles2k.net/aiwan_smiles/', ''],
            ['images/smiley_icons/icon_razz.gif', ':p'],
            ['images/smiley_icons/icon_surprised.gif', ':o'],
            ['images/smiley_icons/icon_eek.gif', '8o'],
            ['images/smiley_icons/icon_cool.gif', '8)'],
            ['images/smiley_icons/icon_redface.gif', ':blush:'],
            ['images/smiley_icons/icon_mad.gif', '>:E'],
            ['images/smiley_icons/icon_confused.gif', ':?'],
            ['images/smiley_icons/icon_lol.gif', ':D'],
            ['images/smiley_icons/icon_smile.gif', ':)'],
            ['images/smiley_icons/icon_wink.gif', ';)'],
            ['images/smiley_icons/icon_sad.gif', ':('],
            ['images/smiley_icons/', '']
            ];

for(var i = 0; i<document.images.length;i++) {
  image = document.images[i];
  var Src = image.getAttribute('src');
  for (var j = 0; j < Rules.length; j++) {
    if (Src.indexOf(Rules[j][0]) != -1) {
      if (Rules[j][1] != '') {
        image.parentNode.replaceChild( document.createTextNode(Rules[j][1]), image);
        }
      else {
        var File = '[' + Src.substring(Src.lastIndexOf('/')+1) + ']';
        newlink = document.createElement('a');
        newlink.setAttribute('href', Src);
        newtext = document.createTextNode(File);
        newlink.appendChild(newtext);
        image.parentNode.replaceChild(newlink, image);
        }
      i--;
      break;
      }
    }
  }
