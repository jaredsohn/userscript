// ==UserScript==
// @name           Sukkiri! Google
// @namespace      net.soralabo.gm_script
// @description    
// @include        http://www.google.co.jp/
// ==/UserScript==
hide_buttons = true;//検索・I'm feeling lucky, 日本語・すべてのウェブサイトを（ry　を隠す
resize_logo = false;//ロゴを小さくする(20%に)
hide_menuetc = true;//上部メニュー「その他」を隠す
hide_menuimage = true;//上部メニュー「画像」を隠す
hide_menuvideo = true;//上部メニュー「動画」を隠す
hide_menumap = false;//上部メニュー「地図」を隠す
hide_menunews = true;//上部メニュー「ニュース」を隠す
hide_menugroup = true;//上部メニュー「グループ」を隠す
hide_menugmail = false;//上部メニュー「Gmail」を隠す
show_menuldr = true;//上部メニューに「LDR」を作る
function xp(query) {//Thanks gigi-net
    var results = document.evaluate(query, document, null, 7, null);
    var nodes = new Array();
    for(var i=0; i<results.snapshotLength; i++){
        nodes.push(results.snapshotItem(i));
    }
    return nodes;
}
var n = xp("/html/body/center/div")
n[0].style.display = "none";
n[1].style.display = "none";
n[2].style.display = "none";
xp("/html/body/center/font")[0].style.display = "none";
xp("/html/body/center/p")[0].style.display = "none";
xp("/html/body/center/form/table/tbody/tr/td[3]")[0].innerHTML = "";
xp("/html/body/center/form/table/tbody/tr/td[2]")[0].innerHTML += '<input id="all" name="lr" value="" checked="checked" type="radio"><label for="all">a</label> <input id="il" name="lr" value="lang_ja" type="radio"><label for="il"> j</label>';
xp("/html/body/center/form/table/tbody/tr/td[2]/input[4]")[0].value = "f";
xp("/html/body/center/form/table/tbody/tr/td[2]/input[3]")[0].value = "s";
xp("/html/body/center/form/table/tbody/tr[2]/td")[0].style.display = "none";
if(resize_logo){xp('//*[@id="logo"]')[0].width= 55;xp('//*[@id="logo"]')[0].height= 22;}
if(hide_buttons){xp('/html/body/center/form/table/tbody/tr/td[2]')[0].innerHTML = '<input value="" title="Google 検索" size="55" name="q" maxlength="2048" autocomplete="off"/>';}
var navbar = xp('/html/body/div/nobr/a');
if(hide_menuetc){navbar[6].style.display = "none";}
if(hide_menuimage){navbar[0].style.display = "none";}
if(hide_menuvideo){navbar[1].style.display = "none";}
if(hide_menumap){navbar[2].style.display = "none";}
if(hide_menunews){navbar[3].style.display = "none";}
if(hide_menugroup){navbar[4].style.display = "none";}
if(hide_menugmail){navbar[5].style.display = "none";}
if(show_menuldr){xp('/html/body/div/nobr')[0].innerHTML+='<a class="gb1" href="http://reader.livedoor.com/reader/">LDR</a>'}