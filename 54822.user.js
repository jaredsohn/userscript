// ==UserScript==
// @name          yana pixels for Blogger by Yana
// @namespace      http://ladolceynalicious.blogspot.com
// @description    You can use emoticons in Blogger.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname)
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
buttons += emoticonButton("pening", "http://picto0.jugem.jp/c/o/c/cocoa321/c1ca7ae1b8f85112b2a09a46be42de48.gif");
buttons += emoticonButton("ngantuk", "http://picto0.jugem.jp/c/o/c/cocoa321/2e1b26befde0ee1314d289d45e1af519.gif");
buttons += emoticonButton("hepi", "http://picto0.jugem.jp/c/o/c/cocoa321/83264c3d176e0405797bdf3f42f77ae8.gif");
buttons += emoticonButton("in luv", "http://picto0.jugem.jp/c/o/c/cocoa321/fb418ac31761b2602edc65c341eebf49.gif");
buttons += emoticonButton("starlg", "http://picto0.jugem.jp/c/o/c/cocoa321/890487f7b88eaccafc9bdbe2fe0bc4e0.gif");
buttons += emoticonButton("sorok", "http://picto0.jugem.jp/c/o/c/cocoa321/890487f7b88eaccafc9bdbe2fe0bc4e0.gif");
buttons += emoticonButton("wterside", "http://picto0.jugem.jp/c/o/c/cocoa321/f7e14677a093b707ff80ba03daecd09c.gif");
buttons += emoticonButton("wterdown", "http://picto0.jugem.jp/c/o/c/cocoa321/729a756456b3593b0c1447c031411cf9.gif");
buttons += emoticonButton("luvstar", "http://picto0.jugem.jp/c/o/c/cocoa321/bc715e7c4275addee8a42e782b4bb3da.gif");
buttons += emoticonButton("kapelluv", "http://picto0.jugem.jp/c/o/c/cocoa321/e83f68e45eb541a47a6bab1908bb195a.gif");
buttons += emoticonButton("erm", "http://picto0.jugem.jp/c/o/c/cocoa321/cd99e896835920a3175f09c08a6ce9d4.gif");
buttons += emoticonButton("erm1", "http://picto0.jugem.jp/c/o/c/cocoa321/1fcc6dddb14ec2250b1bfb416aba1980.gif");
buttons += emoticonButton("ouch", "http://picto0.jugem.jp/c/o/c/cocoa321/dff247f29188e48472e4b53a45038a38.gif");
buttons += emoticonButton("ouch2", "http://picto0.jugem.jp/c/o/c/cocoa321/f8a08d6d346670942a7ad1d859b61209.gif");
buttons += emoticonButton("loving", "http://picto0.jugem.jp/c/o/c/cocoa321/eaa4d79027bd1ddec44f316fb8ef91cc.gif");
buttons += emoticonButton("miss", "http://picto0.jugem.jp/c/o/c/cocoa321/9fb8a69587ffd825d524e9a563b94812.gif");
buttons += emoticonButton("cry", "http://picto0.jugem.jp/c/o/c/cocoa321/b2759a622247c5a4d022f88e42ddc088.gif");
buttons += emoticonButton("benci", "http://picto0.jugem.jp/c/o/c/cocoa321/6f1d0fa2fec19c593ba44396f271001a.gif");
buttons += emoticonButton("yeke", "http://picto0.jugem.jp/c/o/c/cocoa321/92bd119d0182dc674eb3d67c354ed9e3.gif");
buttons += emoticonButton("ouch3", "http://picto0.jugem.jp/c/o/c/cocoa321/51b6e18355e3a592aa04bf3ec87bc6f6.gif");
buttons += emoticonButton("ouch4", "http://picto0.jugem.jp/c/o/c/cocoa321/258008337a863322396bdb2ec67c9687.gif");
buttons += emoticonButton("uwaa", "http://picto0.jugem.jp/c/o/c/cocoa321/6ef0760d1d9b5ecbe096b710bc24e83a.gif");
buttons += emoticonButton("tido", "http://picto0.jugem.jp/c/o/c/cocoa321/2e150442fb45cd86ce6ec8b03cde8ded.gif");
buttons += emoticonButton("bye", "http://picto0.jugem.jp/c/o/c/cocoa321/4ef57a649236e1ec4febeb9c8b1a77d2.gif");
buttons += emoticonButton("sokata", "http://picto0.jugem.jp/c/o/c/cocoa321/8c44485fa05743a0669b9ad4f25d1dda.gif");
buttons += emoticonButton("feewit", "http://picto0.jugem.jp/c/o/c/cocoa321/cf4137633398ecb3a5027d1bee1ebbe8.gif");
buttons += emoticonButton("shy", "http://picto0.jugem.jp/c/o/c/cocoa321/8b1d4a7aa67a14af66d92264752fd9c6.gif");
buttons += emoticonButton("hepi1", "http://picto0.jugem.jp/c/o/c/cocoa321/744e3569a883645352db9930167dc5ca.gif");
buttons += emoticonButton("hepi2", "http://picto0.jugem.jp/c/o/c/cocoa321/5242e9bee765760789ad75838457f818.gif");
buttons += emoticonButton("hepi3", "http://picto0.jugem.jp/c/o/c/cocoa321/233bd2d62e4d441b5e73cc8adabfe95c.gif");
buttons += emoticonButton("hepi4", "http://picto0.jugem.jp/c/o/c/cocoa321/fa5540ab799f815518711562467b1369.gif");
buttons += emoticonButton("sad", "http://picto0.jugem.jp/c/o/c/cocoa321/344503b6dafe4be6faaf7dd026871622.gif");
buttons += emoticonButton("hepi5", "http://picto0.jugem.jp/c/o/c/cocoa321/d335437c79629a79929805c2f31db28e.gif");
buttons += emoticonButton("sad1", "http://picto0.jugem.jp/c/o/c/cocoa321/4e2f03e1ba65e44f138fbb5af66ae3ca.gif");
buttons += emoticonButton("hepi6", "http://picto0.jugem.jp/c/o/c/cocoa321/d968d64c75600e5544e531ac22df6e9d.gif");
buttons += emoticonButton("sad3", "http://picto0.jugem.jp/c/o/c/cocoa321/f638dec2e6917c376d30c824ff1e80d0.gif");
buttons += emoticonButton("pning2", "http://picto0.jugem.jp/c/o/c/cocoa321/255b8c4bde99e6ca7069c1496dfa4e7e.gif");
buttons += emoticonButton("pning3", "http://picto0.jugem.jp/c/o/c/cocoa321/4dc0d5307bb5222d1ac9592bc6f22958.gif");
buttons += emoticonButton("sad4", "http://picto0.jugem.jp/c/o/c/cocoa321/e252a6b283e7ef76d501b6b0c562ffa4.gif");
buttons += emoticonButton("cool", "http://picto0.jugem.jp/c/o/c/cocoa321/5d63ef72d7c3bf8ba65bda09146c32e8.gif");
buttons += emoticonButton("think", "http://picto0.jugem.jp/c/o/c/cocoa321/0e26d618141c4be48c83e066d49001a6.gif");
buttons += emoticonButton("sad5", "http://picto0.jugem.jp/c/o/c/cocoa321/aaf930b7744ec32d04d6fc7163c2341d.gif");
buttons += emoticonButton("hepi7", "http://picto0.jugem.jp/c/o/c/cocoa321/24ac2a697adf66a48204323d2639ddba.gif");
buttons += emoticonButton("hepi8", "http://picto0.jugem.jp/c/o/c/cocoa321/e9daf1fb1f630b65ab6fbba787b2aec0.gif");
buttons += emoticonButton("hepi9", "http://picto0.jugem.jp/c/o/c/cocoa321/bc421365bf5340dff2a15775ee624f93.gif");
buttons += emoticonButton("hepi10", "http://picto0.jugem.jp/c/o/c/cocoa321/632e3869728939d9906aae3981d6d312.gif");
buttons += emoticonButton("hepi11", "http://picto0.jugem.jp/c/o/c/cocoa321/87d04c579b1cffdbca597e79e56e1648.gif");
buttons += emoticonButton("hepi12", "http://picto0.jugem.jp/c/o/c/cocoa321/d5ee949999f61f5d5c1db510d59e56b2.gif");
buttons += emoticonButton("hepi13", "http://picto0.jugem.jp/c/o/c/cocoa321/f2e94f357f926761ad8a30524a84a4b6.gif");
buttons += emoticonButton("sad6", "http://picto0.jugem.jp/c/o/c/cocoa321/9e682b693c171b19e1c718e89e32fac7.gif");
buttons += emoticonButton("sad7", "http://picto0.jugem.jp/c/o/c/cocoa321/3d64abd02ae9e8201339d6cf96abe864.gif");
buttons += emoticonButton("sad8", "http://picto0.jugem.jp/c/o/c/cocoa321/2849bc3a628e4e507d05a31839c72300.gif");
buttons += emoticonButton("sad9", "http://picto0.jugem.jp/c/o/c/cocoa321/5a0f395841ede5aac0dfc25b27454b6e.gif");
buttons += emoticonButton("sad10", "http://picto0.jugem.jp/c/o/c/cocoa321/0a34e25bbd0caca58c35a3de0477e973.gif");
buttons += emoticonButton("sad11", "http://picto0.jugem.jp/c/o/c/cocoa321/05d59fbfeb038111eb6aee5a03184a5a.gif");
buttons += emoticonButton("hepi13", "http://picto0.jugem.jp/c/o/c/cocoa321/48208dc4ede08c2d3f4fc099641109f8.gif");
buttons += emoticonButton("hepi14", "http://picto0.jugem.jp/c/o/c/cocoa321/7ceabbcf8202bbe510834ada94abcbef.gif");
buttons += emoticonButton("hepi15", "http://picto0.jugem.jp/c/o/c/cocoa321/71b29e175ce374e7edc9ae0e34de8cbe.gif");
buttons += emoticonButton("hepi16", "http://picto0.jugem.jp/c/o/c/cocoa321/80f26e2045a40165df512f14933d0ea8.gif");
buttons += emoticonButton("hepi17", "http://picto0.jugem.jp/c/o/c/cocoa321/f2683d8e4771d2dce0cea53dafb6010f.gif");
buttons += emoticonButton("hepi18", "http://picto0.jugem.jp/c/o/c/cocoa321/167fa34c86defadb1050687129d3bc2c.gif");
buttons += emoticonButton("cupcake", "http://www.emirin.com/main06/sozai/sozai/icon_eat/swe/cak13_05.gif");
buttons += emoticonButton("bigcke", "http://www.emirin.com/main06/sozai/sozai/icon_eat/swe/cak15_01.gif");
buttons += emoticonButton("donut", "http://www.emirin.com/main06/sozai/sozai/icon_eat/swe/don02_01.gif");
buttons += emoticonButton("pudding", "http://www.emirin.com/main06/sozai/sozai/icon_eat/swe/pri02_01.gif");
buttons += emoticonButton("ribbon", "http://www.emirin.com/main06/sozai/sozai/icon_ribon/rib01/06_06.gif");
buttons += emoticonButton("ribbon2", "http://www.emirin.com/main06/sozai/sozai/icon_ribon/rib01/06_01.gif");
buttons += emoticonButton("crown1", "http://www.emirin.com/main06/sozai/sozai/icon_hime/tea_b05.gif");
buttons += emoticonButton("crown2", "http://www.emirin.com/main06/sozai/sozai/icon_hime/tea_c05.gif");
buttons += emoticonButton("crown3", "http://www.emirin.com/main06/sozai/sozai/icon_hime/tea_d05.gif");
buttons += emoticonButton("ceri", "http://www.emirin.com/main06/sozai/sozai/icon_eat/fru/06_03.gif");
buttons += emoticonButton("ribbon3", "http://www.emirin.com/main06/sozai/sozai/back_car/ribon/03_05.gif");
buttons += emoticonButton("ribbon4", "http://www.emirin.com/main06/sozai/sozai/back_car/ribon/06_06.gif");
buttons += emoticonButton("cake1", "http://www.emirin.com/main06/sozai/sozai/icon_eat/swe/cak03_03.gif");
buttons += emoticonButton("cake2", "http://www.emirin.com/main06/sozai/sozai/icon_eat/swe/cak10_02.gif");
buttons += emoticonButton("bigcrown", "http://www.emirin.com/main06/sozai/sozai/icon_hime/tea_a03.gif");
buttons += emoticonButton("mangga", "http://www.emirin.com/main06/sozai/sozai/icon_hime/key_c05.gif");
buttons += emoticonButton("key", "http://www.emirin.com/main06/sozai/sozai/icon_hime/key_d05.gif");
buttons += emoticonButton("castle", "http://www.emirin.com/main06/sozai/sozai/icon_hime/shiro_c01.gif");
buttons += emoticonButton("keynmga", "http://www.emirin.com/main06/sozai/sozai/icon_hime/key_b01.gif");
buttons += emoticonButton("butterfly", "http://www.emirin.com/main06/sozai/sozai/icon_mushi/cyo_g03.gif");
buttons += emoticonButton("divider1", "http://www.emirin.com/main06/sozai/sozai/line/rib/10_01.gif");
buttons += emoticonButton("divider2", "http://www.emirin.com/main06/sozai/sozai/line/rib/08_02.gif");
buttons += emoticonButton("divider3", "http://www.emirin.com/main06/sozai/sozai/line/rib/07_05.gif");
buttons += emoticonButton("divider", "http://www.emirin.com/main06/sozai/sozai/line/flo/16_05.gif");
       
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"50\\\" height=\\\"50\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img width=\"25\" height=\"25\" src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);