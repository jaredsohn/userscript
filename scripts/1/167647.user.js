// ==UserScript==
// @name Elite-Games Smilies Enhancer
// @namespace eg
// @description Adds extra smileys and buttons to quick reply and other places
// @include http://www.elite-games.ru/conference/*
// @version 1.0
// @grant none
// ==/UserScript==

// Concat a smiley string
function common_phai(alt, code, url, scope) {
    return '<img border="0" title="' + alt + '" alt="' + alt + '" onclick="' + scope +
        'emoticon(\'' + code + '\');" ' +
        ' src="' + url + '" style=""></img> ';
}

function image_phai(alt, url) {
    return common_phai(alt, '[img]' + url + '[/img]', url, '');
}

function image_pphai(alt, url) {
    return common_phai(alt, '[img]' + url + '[/img]', url, 'opener.');
}

function smiley_phai(alt, url) {
    return common_phai(alt, ' ' + alt + ' ', url, '');
}

unsafeWindow.onBtnClick = function(text) {
    var obj_ta = document.post.message;
    if (ss==es) get_sel_Start_End();
    if (ss!=es) {
        var start = (obj_ta.value).substring(0, ss);
        var middle = (obj_ta.value).substring(ss, es);
        var end = (obj_ta.value).substring(es, obj_ta.textLength);
        var endtext = text;
        if (text.indexOf('=') > 0) {
            endtext = text.substring(0, text.indexOf('='));
        }
        obj_ta.value = start + '[' + text + ']' + middle + '[/' + endtext + ']' + end;
        obj_ta.selectionStart=ss+text.length+2;
        obj_ta.selectionEnd=ss+text.length+2;
        document.forms['post'].message.focus();
    }
};

unsafeWindow.winCreateSmilies = function(winsm) {
    var doc = winsm.document;
    doc.write( winCreateSmiliesString );
    doc.close();
    winsm.focus();
};

// find table cell with smilies in QuickReply and similar
hrefs = document.getElementsByName("attach_sig");
if( hrefs.length == 1 ) {
    var td = hrefs[0].parentNode;
    td.innerHTML = td.innerHTML +
        '<br />' +
        smiley_phai(":tease2:", "images/smiles/tease2.gif") +
        smiley_phai(":old:", "images/smiles/old.gif") +
        smiley_phai(":bayan:", "images/smiles/bayan.gif") +
        image_phai("bayan1", "http://www.imho.ws/images/smilies/bayan.gif") +
        image_phai("facepalm", "http://forum.huskermax.com/vbbs/images/smilies/facepalm.gif") +
        image_phai("facepalm1", "http://hfboards.hockeysfuture.com/images/smilies/facepalm.gif") +
        image_phai("ku!", "http://encode.ru/images/smilies/os_patsak.gif") +
        image_phai("ganjafly", "http://foolstown.com/sm/fly2.gif") +
        image_phai("bushido", "http://foolstown.com/sm/budo.gif") +
        image_phai("knight", "http://foolstown.com/sm/kngt.gif") +
        image_phai("uzhosnah", "http://yoursmileys.ru/hsmile/mouse/h0915.gif") +
        '<br />'+
        '<input type="button" onclick="onBtnClick(\'img\')" value="Img"></input>&nbsp;' +
        '<input class="blue" type="button" onclick="onBtnClick(\'spoiler\')" value="Spoiler"></input>&nbsp;' +
        '<input type="button" onclick="onBtnClick(\'url\')" value="URL"></input>&nbsp;' +
        '<input class="blue" type="button" onclick="onBtnClick(\'off\')" value="Offtop"></input>&nbsp;' +
        '<input type="button" onclick="onBtnClick(\'s\')" value="S"></input>&nbsp;' +
        '<input class="blue" type="button" onclick="onBtnClick(\'color=red\')" value="RED"></input>&nbsp;' +
        '<a target="_phpbbsmilies" onclick="mor_sm=window.open(\'posting.php?mode=smilies\', \'_phpbbsmilies\', ' +
        '\'HEIGHT=600,resizable=yes,scrollbars=yes,WIDTH=450\');mor_sm.focus();return false;" href="posting.php?mode=smilies">Smilies</a>' +
        ' - <a target="_phpbbsmilies" onclick="mor_sm=window.open(\'\', \'_phpbbsmilies\', ' +
        '\'HEIGHT=600,resizable=yes,scrollbars=yes,WIDTH=450\');winCreateSmilies(mor_sm);return false;" href="#">Super Smilies</a>' +
        '<br />';
    unsafeWindow.winCreateSmiliesString = '<html><head><title>Super Smileys</title></head><body>' +
        image_pphai("I'm OK!", "http://www.millan.net/minimations/smileys/imoksmiley.gif") +
        image_pphai("shovel", "http://l-smiles.net/image/smileys/I-dunno-LOL.gif") +
        image_pphai("hooligan", "http://foolstown.com/sm/hul.gif") +
        image_pphai("communist orator", "http://foolstown.com/sm/ora.gif") +
        image_pphai("crazy conveyor", "http://yoursmileys.ru/tsmile/crazy/t3761.gif") +
        image_pphai("crazy professor", "http://yoursmileys.ru/tsmile/crazy/t3782.gif") +
        '<hr/ >'+
        image_pphai("alco", "http://foolstown.com/sm/pya.gif") +
        image_pphai("vodka", "http://l-smiles.net/image/smileys/wino.gif") +
        image_pphai("drinkers", "http://l-smiles.net/image/smileys/smiley_drinkers.gif") +
        image_pphai("martini", "http://www.millan.net/minimations/smileys/martinismiley.gif") +
        image_pphai("hangover", "http://yoursmileys.ru/tsmile/drink/t0321.gif") +
        '<hr/ >'+
        image_pphai("choir", "http://www.millan.net/minimations/smileys/choir.gif") +
        image_pphai("birthday", "http://www.millan.net/minimations/smileys/bdayparty.gif") +
        image_pphai("balloons", "http://www.millan.net/minimations/smileys/balloons.gif") +
        image_pphai("cheerleader", "http://www.millan.net/minimations/smileys/cheerleader.gif") +
        image_pphai("cheerleader2", "http://www.millan.net/minimations/smileys/cheerleader2.gif") +
        image_pphai("cheerleaders line", "http://yoursmileys.ru/hsmile/dance/h0706.gif") +
        image_pphai("alien band", "http://www.millan.net/minimations/smileys/cantinabandf.gif") +
        image_pphai("New Year Tree", "http://foolstown.com/sm/newy.gif") +
        image_pphai("Snowgirl", "http://yoursmileys.ru/tsmile/sex/t15128.gif") +
        image_pphai("guitar player", "http://foolstown.com/sm/git.gif") +
        image_pphai("teddy party", "http://yoursmileys.ru/hsmile/teddy/h1820.gif") +
        image_pphai("red bayan", "http://yoursmileys.ru/msmile/music/m0833.gif") +
        '<hr/ >'+
        image_pphai("bee", "http://foolstown.com/sm/bee.gif") +
        image_pphai("spider", "http://foolstown.com/sm/pauk.gif") +
        image_pphai("pink elephant", "http://www.clicksmilies.com/s1106/tiere/animal-smiley-040.gif") +
        image_pphai("monkey ass", "http://www.clicksmilies.com/s1106/tiere/animal-smiley-084.gif") +
        image_pphai("cancer", "http://www.millan.net/minimations/smileys/cancers.gif") +
        image_pphai("eagle2heads", "http://yoursmileys.ru/msmile/animal/m1894.gif") +
        image_pphai("eyestalk alien", "http://yoursmileys.ru/hsmile/alien/h01115.gif") +
        image_pphai("cricket", "http://yoursmileys.ru/msmile/animal/m1817.gif") +
        image_pphai("pig", "http://yoursmileys.ru/msmile/animal/m181.gif") +
        '<hr/ >'+
        image_pphai("skull and bones", "http://yoursmileys.ru/msmile/misc/m0733.gif") +
        image_pphai("empire trooper", "http://www.clicksmilies.com/s1106/starwars/star-wars-smiley-010.gif") +
        image_pphai("Yoda speaking", "http://www.millan.net/minimations/smileys/yoda1.gif") +
        image_pphai("Yoda blinking", "http://www.millan.net/minimations/smileys/yoda2.gif") +
        image_pphai("Jesus", "http://www.clicksmilies.com/s1106/verkleidung/costumed-smiley-036.gif") +
        image_pphai("Einstein", "http://www.millan.net/minimations/smileys/einstein3.gif") +
        image_pphai("afro", "http://www.clicksmilies.com/s1106/verkleidung/costumed-smiley-026.gif") +
        image_pphai("negro", "http://www.clicksmilies.com/s1106/verkleidung/costumed-smiley-090.gif") +
        image_pphai("tamtam", "http://yoursmileys.ru/msmile/music/m0871.gif") +
        image_pphai("chinaman", "http://www.clicksmilies.com/s1106/verkleidung/costumed-smiley-067.gif") +
        image_pphai("frenchman", "http://www.clicksmilies.com/s1106/verkleidung/costumed-smiley-087.gif") +
        image_pphai("caucasian seller", "http://yoursmileys.ru/hsmile/nation/h0329.gif") +
        image_pphai("indian", "http://yoursmileys.ru/hsmile/nation/h0317.gif") +
        image_pphai("jew", "http://yoursmileys.ru/hsmile/nation/h0343.gif") +
        image_pphai("ukrainian", "http://yoursmileys.ru/hsmile/nation/h0344.gif") +
        image_pphai("clown", "http://www.clicksmilies.com/s1106/verkleidung/costumed-smiley-034.gif") +
        image_pphai("crazy clown", "http://yoursmileys.ru/tsmile/crazy/t3780.gif") +
        image_pphai("viking ass", "http://yoursmileys.ru/tsmile/sex/t15103.gif") +
        image_pphai("typical Russian", "http://yoursmileys.ru/hsmile/nation/h0309.gif") +
        image_pphai("Russian military", "http://yoursmileys.ru/psmile/military/p0217.gif") +
        '<hr/ >'+
        image_pphai("dogs", "http://foolstown.com/sm/dog.gif") +
        image_pphai("sex", "http://foolstown.com/sm/sex.gif") +
        image_pphai("flash tits", "http://yoursmileys.ru/tsmile/sex/t1535.gif") +
        image_pphai("old tits flasher", "http://yoursmileys.ru/tsmile/sex/t15107.gif") +
        image_pphai("old exhibitionist", "http://yoursmileys.ru/tsmile/sex/t15184.gif") +
        image_pphai("shy pioneer", "http://yoursmileys.ru/msmile/misc/m0765.gif") +
        image_pphai("cupid", "http://www.millan.net/minimations/smileys/cupidsmiley.gif") +
        image_pphai("double kiss", "http://www.clicksmilies.com/s1106/liebe/love-smiley-013.gif") +
        image_pphai("spermatozoid", "http://www.clicksmilies.com/s1106/liebe/love-smiley-039.gif") +
        image_pphai("eyetits", "http://www.clicksmilies.com/s1106/liebe/love-smiley-085.gif") +
        image_pphai("coitus", "http://www.clicksmilies.com/s1106/liebe/love-smiley-076.gif") +
        image_pphai("dickhead", "http://www.clicksmilies.com/s1106/verkleidung/costumed-smiley-073.gif") +
        image_pphai("condom", "http://yoursmileys.ru/tsmile/sex/t1504.gif") +
        image_pphai("ideal woman", "http://yoursmileys.ru/tsmile/sex/t1568.gif") +
        image_pphai("naked boy", "http://yoursmileys.ru/tsmile/sex/t1578.gif") +
        image_pphai("naked girl", "http://yoursmileys.ru/tsmile/sex/t15213.gif") +
        image_pphai("girl", "http://yoursmileys.ru/tsmile/sex/t1587.gif") +
        image_pphai("you wanking?", "http://yoursmileys.ru/tsmile/sex/t1581.gif") +
        image_pphai("girl thongs", "http://yoursmileys.ru/tsmile/sex/t1593.gif") +
        image_pphai("pubic hair", "http://yoursmileys.ru/tsmile/sex/t15100.gif") +
        '</body></html>';
}
