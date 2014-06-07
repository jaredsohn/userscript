(function () {
// ==UserScript==
// @name           Chrome Angry Birds Unlocker
// @namespace      http://blog.krakenstein.net
// @author         daYOda (Krakenstein)
// @description    chrome.angrybirds.com Unlocker
// @version        1.1
// @include        http://chrome.angrybirds.com/
// @match          http://chrome.angrybirds.com/
// ==/UserScript==

function g(id){if(id && typeof id==='string'){id=document.getElementById(id);}return id||null;}

const yodUpdate = {
  script_id : 110340,
  script_version : '1.1',
  script_pipeId : '7015d15962d94b26823e801048aae95d',
}

function setValue(key, value) {
  localStorage.setItem(key, value);
  return false;
}

function getValue(key) {
  var val = localStorage.getItem(key);
  return val;
}

function usoUpdate(el) {
  const s_CheckUpdate = 'YodCheckUpdate' + yodUpdate['script_id'];
  var md = parseInt(new Date().getDate());
  var CheckUpdate = parseInt(getValue(s_CheckUpdate));
  var NeedCheckUpdate = false;
  if (CheckUpdate !== md) {
    setValue(s_CheckUpdate, md);
    el = el ? el : document.body;
    if (el) {
      if (!document.getElementById(s_CheckUpdate)) {
        var s_gm = document.createElement('script');
        s_gm.id = s_CheckUpdate;
        s_gm.type = 'text/javascript';
        s_gm.innerHTML = 'function go' + s_CheckUpdate + '(itm){if(itm.value.items.length){return eval(unescape(itm.value.items[0].content).replace(/&lt;/g,\'<\').replace(/&gt;/g,\'>\').replace(/&amp;/g,\'&\'));}}';
        el.appendChild(s_gm);
      }
      var s_gm = document.createElement('script');
      s_gm.type = 'text/javascript';
      var sSrc = 'http://pipes.yahoo.com/pipes/pipe.run?_id=' + yodUpdate['script_pipeId'];
      sSrc += '&_render=json&_callback=go' + s_CheckUpdate;
      sSrc += '&id=' + yodUpdate['script_id'] + '&ver=' + yodUpdate['script_version'];
      //sSrc += '&redir=yes';
      s_gm.src = sSrc;
      el.appendChild(s_gm);

      NeedCheckUpdate = true;
    }
  }
  else {
    setValue(s_CheckUpdate, md);
  }

  return NeedCheckUpdate;
}

function addStyle(css) {
  var heads = document.getElementsByTagName("head");
  if (heads.length > 0) {
    var node = document.createElement("style");
    node.type = "text/css";
    node.appendChild(document.createTextNode(css));
    heads[0].appendChild(node);
  }
}

/*
All hack code done by:
Angry Birds Chrome Hack v2 - Alle Level freischalten! Alle Sterne!
27.07.2011
Heute hat
http://0xbeaf.wordpress.com/
*/

var storageVal = {
  unlock: "OU7DN6O6ASVA3KBVN VZY6A4 FFRHTUJB3KXZ5YKL006NID7TF1203DQ72EUL6P3BQB739LCMVKGKU17MHDKZNUYT\
3RJBP6AYZG4M8VR0BQCVS3L1XKO1TOJ0RQMF213YUGFICIJT5IVSCSLVZ45RCDIMS2BXLAAK2L30BSYGMOR21U71E292973UF1\
E0Q53KPCE5OFQ8G70 M9ZVGNRSTOBOGE3RHEA6YQ2OEPWNXD5AKKLAWLM3ZRXW3D6VM9V6THDKRLXOR5F7W L3Y5CTI7WHDQWL\
DR1T1VA2HM22ZBBIUAZAD374O1HP0PZPIMVTOMCZUI33TVUFEQZCFOPU7IPA11O69V1FXR9HKJ9I90QZCSCJVVT54LAIP0RAEQ\
VFSIKMXFAJ3T NOGCCXFAVO19CQDG05Z110W84NPGYKZW6MIQSCDE6U4VBDCJ4AUM1NNJ0 C8QEIE3Y6QLEYWWDLU5EP8V1BTO\
W07JQMNDVOAEW83SUW 7AFFD1OBZ66MORSIO29F5PGKBGX3LWGHXUWNZB00GPFTA 5F6TJUKXMGMEZQ0BEC8 Z86Z 3K2AMAMX\
Q256MLR5ZJQNHUDZ2YJF7S CTALSTXV1EL4G0 7BVUOP30T5Y9P9T NBWEQED5QTPQ83T0134R 43UVHFZ8Q0UOOL4HWTJZ6D \
7D7FI901YFH9AOJA5TM1BNO8MRDSLYO4B0 GCTJZIVH2C80 P9LNC DQD K5UBLNAAEVTZFIG5V9S642VC6V ZGUIVDEP2WJNY\
6NNRP6SLV2URM0ETEG9B5K9CKSY7K1D7LAVXLQQN8I9PQ3BN OOA8OE740K7V6QVD2PG3NAB8BB97133ZIYNYE5GKETCJPG4SH\
5M Y DVIRG2406KHLM0IAB4NO3ULT0KI EIVK1MBTSTUKNJBMZQ 1KB0XHR3J1ZXGKE5I38R8ZO5QH4J9Y136F49J8T8WYRYA3\
O2US8KAJ5V9YC4AAIUPXBWSMQRMZ5CI9KDSUMRQH9660YCY9UY2SWWND0NZVYDLT2ACIMKJ1RWQHXY7MAOL0BIWIP5P43STZZL\
AK  7 V7WKI5MLMSQWWII9 11S4KNR8IM  T0KCXF0Q WY29H424RNOKS1A73X41KAD8PIG8LVB7JXEDM W4MEZP4PB YGNQWQ\
D1I2YY4BATK9V3DH2RVSW73ZHEEMJ9USR869T91EW07867ICNRHJ637MIF8ET6EGR1 UJZLV3M8LWY9L2DQXVM6WOUGKPHCIDH\
OSEERPPTVB62EGNCKO5RJKKUI37EO649GCW A6",

  unlockstars: "OU7DN6O6ASVJCTK2P V76FJD2FF Q12SE3K57E6TO00FWRMGWF1B9CMZA2E2UFYCEQBGCIULPVKPT2AGPHDT\
7W26W3RSKYFJ0ZGDVH3 3BQL30CU4XKXA1XS3RQVOBAC0UGORLRSW5I30L0UYZ4E LMRPS2K5UJJN2LC9K06JMO BA2G4E2IBI\
GCXF1N9ZECNPCNEXOZBG798VI7YGN 01XKRGEC QNJ9YQBXNY4QXDEJTTUDWLVC7 5Z3DF3VI39THMT U5RR5OG48U6Y5L1RG4\
KDQ4UM AW1VJBQVB5ZBKR2J7DD3GDXAQS0P7YRV3WOML72RC6TV2ONZ7FFOY2GRYD11XFI3AIXRIQTSIL90Z7L0LMVV1EDUJLP\
0 JNZ3ISITV5OJM3T8WXPLFXFJ3XAIFQDP9E7A40WHDWYP0KZ4FVRZVCDNF2D3EDCSDJ2V4NNS98LHTEINC6FZOEY44MU28EPH\
3AK1RW0GSZVWGVOJN4HCVUW8GJOOG1OK7FFVRRSRXBIO8PGTKP5COWGQ524W1B09PYO1D 5OF1S2NXMPVN7Z3BELH87H9Z CTB\
JVDMXZBEFVOR57SZWQXDZB6SOGV C1JU01 V1NUDP927B32XYC3T56IYI12NB4NZNM8QTYZHC1313D 8DCXVHO7HZ9XOOUDQ41\
MZ6M8GMGII99A6OQCAOSJE1V4BNXHV MVLYXDK98JCTS7R3Q5C898YIUQC MZM8T8UBUWJJNYTZORPE3CS6DB3LFY ZP2R3MHP\
24SW6FQNRYF0U35URV9N1NJ9BETILTVY7TAMGUDVXUZZWHL9PZCKW8ROAHXNGD3K73FZ3M5PGCWJKHEB9GACC7LYN6NEPTHTCS\
YPD0K5M868M3LRGBD9FTKLM9RJKDQO32U19TL ER3TAVETS12TWSEMZZ8ATK3XH CSA7 GKNERCHU8ZXEZQDM9YACFODCJ81H4\
6 0A3XB20HNAJE3I6L7AAR2Y5KZSMZ V7EFI9TM02VUQHIFF96FY926B04ZND9W736GLTBJLRVNJ1 4ZQ507MJXU9KLWIYEYDC\
VTZ7UJT827 3G4TR8MLV0Z44LI98AA0DNNRHRV88W0KL5O9Z2WYBIQDB7RNXT0AJA3XDATJMBPIPHU3KAJXNMV847ME7YDYK2Y\
GWZ4ZM4I266DKJWK93CMQBUVS4GC7QHEMSI20 B691IAN4378FGRLWUHJFCGVRI8E1FNP 4 US7U3CP8L46IUBGQX3VF4XXGKY\
QLRMKOSEERPPTVB62EGNCKO5RJKKUI37EO649GCW A6",

  reset: "",
}

function createEl(tag, attribs, ev, parent) {
  var el = document.createElement(tag);
  if (attribs) for (var x in attribs) el.setAttribute(attribs[x][0], attribs[x][1]);
  if (ev) for (var x in ev) el.addEventListener(ev[x][0], ev[x][1], false);
  if (parent) parent.appendChild(el);
  return el;
}

const mycss = "\
#yodSpace{color:white;background-color:transparent;margin-top:20px;width:100%;text-align:center;\
font-size: 11px;clear:both;}\
.butt_unlocker {cursor:pointer;padding:10px;margin:0 5px;display:inline-block;background-color: #4D90FE;\
background-image: -webkit-gradient(linear,left top,left bottom, from(#4d90fe),to(#4787ed));\
border: 1px solid #3079ED;border-radius: 5px;font-weight:bold;font-size:20px;font-family:arial;}\
.ads{display:none!important}\
#content{width:98%!important;margin:10px auto!important}\
";

function unlock() {
  //alert(this.id);
  setValue('EPRQ', storageVal[this.id.replace("butt_", "")]);
  return document.location.reload();
}

function doExec() {//
  var target = g("content");
  if (!(target /*&& g("fowl") */&& g("appcache-status-content"))) return;

  usoUpdate();

  addStyle(mycss);

  var yodNav = createEl('div', [
                  ["id", "yodSpace"],
                  ["title", "Chrome Angry Birds Unlocker"],
                ]);

  var butt = createEl('div', [
                  ["id", "butt_unlock"],
                  ["title", "Just Unlock all Levels"],
                  ["class", "butt_unlocker"],
                ], [
                  ["click", unlock],
                ]);
  butt.innerHTML = "Unlock";
  yodNav.appendChild(butt);

  butt = createEl('div', [
                  ["id", "butt_unlockstars"],
                  ["title", "Unlock all Levels with Stars"],
                  ["class", "butt_unlocker"],
                ], [
                  ["click", unlock],
                ]);
  butt.innerHTML = "Stars Unlock";
  yodNav.appendChild(butt);

  butt = createEl('div', [
                  ["id", "butt_reset"],
                  ["title", "Reset All Locked"],
                  ["class", "butt_unlocker"],
                ], [
                  ["click", unlock],
                ]);
  butt.innerHTML = "Reset";
  yodNav.appendChild(butt);
  target.appendChild(yodNav);
}

doExec();
})();