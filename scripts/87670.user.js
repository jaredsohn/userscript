// ==UserScript==
// @name           Better messages
// @namespace      dw.js.gm
// @include        http://annihilation.pl/mal.php?a=msg*
// @include        http://s2.annihilation.pl/?a=msg*
// @require        http://code.jquery.com/jquery-1.3.2.min.js
// ==/UserScript==
$(document).ready(function(){

    $.fn.textNodes = function() {
        return $(this).contents().filter(function(){
            return this.nodeType == 3 || this.nodeName == "BR" ;
        });
    }

    var a = $('a[href^="?a=msg&opt=newmsg&nick="]');
    if (a != null) {
        var main = $('div.main_gd');
        main.append('<div class="odpisz_form"></div>')
        a.click(function(){
            showForm();
            return false;
        });
    }


    function showForm() {
        var div = $('div.profile');
        var temat = $('span:contains("Temat:")',div).parent().textNodes().get(0).nodeValue;
        var re_temat = '';
        if (temat.indexOf("Re:") == 0) {
            re_temat = temat;
        } else {
            re_temat = "Re: " + temat;
        }

        if (re_temat.length > 30) {
            re_temat = re_temat.substr(0,30);
        }

        var from = $('div a',div).text();

        var script = '<script type="text/javascript"> \n var odmowa1 = \'Temat wiadomo\u015Bci jest zbyt kr\u00F3tki.\';\nvar odmowa2 = \'Tre\u015B\u0107 wiadomo\u015Bci jest zbyt kr\00F3tka.\';\nvar keyLimit = 1000;\nfunction sprawdz() {\nif (document.getElementById(\'temat\').value.length < 2) {\nalert(odmowa1);\nreturn false;\n}\n\nif (document.getElementById(\'tresc\').value.length < 2) {\nalert(odmowa2);\nreturn false;\n}\n\nreturn true;\n}\n\nfunction count_keys(){\nvar tr = document.getElementById(\'tresc\');\nvar ilosc = tr.value.length;\nif (ilosc > keyLimit){\ntr.value = tr.value.substring(0, keyLimit);\n} else {\ndocument.getElementById(\'licznik\').innerHTML = keyLimit - tr.value.length;\n}\n}\n</script>';
        var form = '<form onsubmit="return sprawdz()" method="post" action="?a=msg&opt=newmsg">\n<table style="text-align: left; margin-top: 30px; margin-left: auto; margin-right: auto;">\n<tbody><tr>\n<td style="width: 100px; text-align: left;">Do kogo: </td>\n<td style="width: 150px;"><input type="textbox" value="'+from+'" maxlength="15" style="width: 100%;" name="odbiorca" class="textbox"></td>\n<td style="width: 80px; text-align: left;">Temat: </td>\n<td style="width: 150px;"><input type="textbox" value="'+re_temat+'" style="width: 100%;" maxlength="30" id="temat" name="temat" class="textbox"></td>\n</tr>\n<tr> \n<td style="width: 100px; text-align: left;">Tre\u015B\u0107: </td>\n<td colspan="3" style="width: 380px;"><textarea onkeyup="count_keys();" onkeydown="count_keys();" name="tresc" id="tresc" style="width: 100%; height: 100px;" class="textarea"></textarea></td>\n</tr>\n<tr style="height: 20px;"></tr>\n<tr>\n<td style="width: 100px; text-align: left;">Zapisz kopi\u0119: <input type="checkbox" value="1" name="savecopy"></td>\n<td colspan="2" style="width: 230px; text-align: right;">Pozosta\u0142o znak\u00F3w:</td>\n<td style="width: 150px; text-align: center;"><b id="licznik">1000</b></td>\n</tr>\n<tr style="height: 20px;"></tr>\n<tr> <td style="text-align: center;" colspan="4"><input type="submit" name="submit" value="Wy\u015Blij Wiadomo\u015B\u0107" onmouseout="this.className=\'submit\'" onmouseover="this.className=\'highlight\'" class="submit"></td> </tr>\n</tbody></table>\n</form>'
        var main = $('div.odpisz_form');
        main.html(script + form);
    }
});