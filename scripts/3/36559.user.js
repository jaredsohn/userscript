// ==UserScript==
// @name           AutoUa_ExtendSmiles
// @namespace      AutoUa
// @description    Replaces standard smiles
// @include        http://forum.autoua.net*
// ==/UserScript==

var map = new Object();


map["http://forum.autoua.net/images/graemlins/wink.gif"] = "http://kolobok.us/smiles/standart/wink3.gif";
//     map["http://forum.autoua.net/images/graemlins/icon_idea.gif"] = "";
map["http://forum.autoua.net/images/graemlins/042.gif"] = "http://kolobok.us/smiles/standart/scare.gif";
map["http://forum.autoua.net/images/graemlins/smile.gif"] = "http://kolobok.us/smiles/standart/smile3.gif";
map["http://forum.autoua.net/images/graemlins/frown.gif"] = "http://kolobok.us/smiles/standart/sad.gif";
map["http://forum.autoua.net/images/graemlins/006.gif"] = "http://kolobok.us/smiles/artists/just_cuz/JC_cheers.gif";
map["http://forum.autoua.net/images/graemlins/s56.gif"] = "http://kolobok.us/smiles/artists/just_cuz/JC_you_rock.gif";
map["http://forum.autoua.net/images/graemlins/192.gif"] = "http://kolobok.us/smiles/artists/just_cuz/JC_run.gif";
//     map["http://forum.autoua.net/images/graemlins/167.gif"] = "";
//     map["http://forum.autoua.net/images/graemlins/123.gif"] = "";
map["http://forum.autoua.net/images/graemlins/065.gif"] = "http://kolobok.us/smiles/standart/SHABLON_padonak_06.gif";
map["http://forum.autoua.net/images/graemlins/ooo.gif"] = "http://kolobok.us/smiles/artists/just_cuz/JC_golly.gif";
map["http://forum.autoua.net/images/graemlins/mad.gif"] = "http://kolobok.us/smiles/standart/aggressive.gif";
map["http://forum.autoua.net/images/graemlins/blush.gif"] = "http://kolobok.us/smiles/standart/blush2.gif";
map["http://forum.autoua.net/images/graemlins/crazy.gif"] = "http://kolobok.us/smiles/icq/crazy.gif";
map["http://forum.autoua.net/images/graemlins/laugh.gif"] = "http://kolobok.us/smiles/standart/laugh1.gif";
map["http://forum.autoua.net/images/graemlins/shocked.gif"] = "http://kolobok.us/smiles/icq/shok.gif";
//map["http://forum.autoua.net/images/graemlins/confused.gif"] = "http://kolobok.us/smiles/standart/scratch_one-s_head.gif";
map["http://forum.autoua.net/images/graemlins/grin.gif"] = "http://kolobok.us/smiles/icq/biggrin.gif";
map["http://forum.autoua.net/images/graemlins/tongue.gif"] = "http://kolobok.us/smiles/icq/pardon.gif";
map["http://forum.autoua.net/images/graemlins/icon_idea.gif"] = "http://kolobok.us/smiles/artists/just_cuz/JC_idea.gif";
map["http://forum.autoua.net/images/graemlins/icon_surprised.gif"] = "http://kolobok.us/smiles/he_and_she/kiss3.gif";
map["http://forum.autoua.net/images/graemlins/70390-shhh.gif"] = "http://kolobok.us/smiles/artists/just_cuz/JC_shhh.gif";
map["http://forum.autoua.net/images/graemlins/idontno.gif"] = "http://kolobok.us/smiles/standart/dntknw.gif";
//map["http://forum.autoua.net/images/graemlins/70402-thinking.gif"] = "";
map["http://forum.autoua.net/images/graemlins/70409-waytogo.gif"] = "http://kolobok.us/smiles/big_standart/good2.gif";
map["http://forum.autoua.net/images/graemlins/up.gif"] = "http://kolobok.us/smiles/standart/good3.gif";
map["http://forum.autoua.net/images/graemlins/down.gif"] = "http://kolobok.us/smiles/standart/negative.gif";
map["http://forum.autoua.net/images/graemlins/rotfl.gif"] = "http://kolobok.us/smiles/standart/rofl.gif";
map["http://forum.autoua.net/images/graemlins/elkgrin.gif"] = "http://kolobok.us/smiles/artists/connie/connie_he-moose.gif";
map["http://forum.autoua.net/images/graemlins/049.gif"] = "http://kolobok.us/smiles/big_standart/hi.gif";
//map[""] = "";
//map[""] = "";
//map[""] = "";
//map[""] = "";


function replace_smiles()
{  
  for (var i = 0; i < document.images.length; i++)
  {
    var altSrc = map[document.images[i].src];
    
    if (altSrc != null)
    {
            document.images[i].src = altSrc;
    }
  }
}

replace_smiles();