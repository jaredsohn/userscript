// Modified annyz-chan (www.annyz-kawaii.blogspot.com)
// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Annyz Blog
// @namespace      www.annyz-kawaii.blogspot.com
// @description    You can use emoticons in Blogger by www.annyz-kawaii.blogspot.com
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";


buttons += emoticonButton(":a:", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/hate.gif");
buttons += emoticonButton(":b:", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/e7ae49ab0105a72a502726a2c1c59898.gif");
buttons += emoticonButton(":c:", "http://d54.decoo.jp/data/emoji/2c5afeebba9b68c95d46b8aa463d7f98.gif");
buttons += emoticonButton(":d:", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/annyz_signitos21.gif");
buttons += emoticonButton(":e:", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/annyz_signitos145.gif");
buttons += emoticonButton(":f:", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/annyz_signitos138.gif");
buttons += emoticonButton(":g:", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/annyz_signitos56.gif");
buttons += emoticonButton(":h:", "http://3.bp.blogspot.com/-2MME1JFxbrw/Tim_bk518_I/AAAAAAAABWs/X05BxFbG1YQ/s1600/signos+by+annyz+blog+%252833%2529.gif");e  
buttons += emoticonButton(":i:", "http://2.bp.blogspot.com/-yL9vUV-WamU/Tim_gv_YFPI/AAAAAAAABXk/kyekmP3Ijp0/s1600/signos+by+annyz+blog+%252847%2529.gif");
buttons += emoticonButton(":j:", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/bikkuri.gif");
buttons += emoticonButton(":k:", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/annyz_signitos17.gif");
buttons += emoticonButton(":l:", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/annyz_signitos67.gif");
buttons += emoticonButton(":m:", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/annyz_signitos65.gif");
buttons += emoticonButton(":n:", "http://4.bp.blogspot.com/-PZOfkfX-uy0/Tim_JLtNqZI/AAAAAAAABU8/W_okImgT9m0/s1600/signos+by+annyz+blog+%25285%2529.gif");
buttons += emoticonButton(":o:", "http://3.bp.blogspot.com/-0K6p2eVQLDU/Tim_JdwGn7I/AAAAAAAABVA/x7_DZ_IUfnY/s1600/signos+by+annyz+blog+%25286%2529.gif");
buttons += emoticonButton(":p:", "http://i1143.photobucket.com/albums/n639/annyz-chaan/annyz-blog/kawaiinumeros1.gif");
buttons += emoticonButton(":q:", "http://i1143.photobucket.com/albums/n639/annyz-chaan/annyz-blog/kawaiinumeros81.gif");
buttons += emoticonButton(":r:", "http://i1143.photobucket.com/albums/n639/annyz-chaan/annyz-blog/kawaiinumeros35.gif");
buttons += emoticonButton(":s:", "http://i1143.photobucket.com/albums/n639/annyz-chaan/annyz-blog/kawaiinumeros98.gif");
buttons += emoticonButton(":t:", "http://i1143.photobucket.com/albums/n639/annyz-chaan/annyz-blog/kawaiinumeros97.gif");
buttons += emoticonButton(":u:", "http://i1143.photobucket.com/albums/n639/annyz-chaan/annyz-blog/kawaiinumeros96.gif");
buttons += emoticonButton(":v:", "http://www.blogger.com/%20http://i1143.photobucket.com/albums/n639/annyz-chaan/annyz-blog/kawaiinumeros95.gif");
buttons += emoticonButton(":w:", "http://i1143.photobucket.com/albums/n639/annyz-chaan/annyz-blog/kawaiinumeros55.gif");
buttons += emoticonButton(":x:", "http://i1143.photobucket.com/albums/n639/annyz-chaan/annyz-blog/kawaiinumeros54.gif");
buttons += emoticonButton(":y:", "http://i1143.photobucket.com/albums/n639/annyz-chaan/annyz-blog/kawaiinumeros53.gif");
buttons += emoticonButton(":z:", 
"http://i1221.photobucket.com/albums/dd461/kawaii_annyz/x1pNWjjkHJ3o_yCiRrSz5SK9WYXEw_WgRxsMCTtSFoHKTTa6WcTQs6fTYAe4jjcf_vixO07WFeFRoVvInRcUX4S8LRpbXqaYoLZz6AH5l5BkzAgodA59cZLPq7KS7GAQZ1I.gif");
buttons += emoticonButton(":a1:", 
"http://i1221.photobucket.com/albums/dd461/kawaii_annyz/x1pNWjjkHJ3o_yCiRrSz5SK9WgmL6EKzpDDSTUSYO8k9umEGtnw--rSQ5weTB0uLXaJ9K15Cs59pl0JYRM1Uz-nSD5yiyMjY95Mb_pOZueLhJSnd5Fkn3lxQ_aiAdp0tC39.gif");
buttons += emoticonButton(":a2:", 
"http://i1221.photobucket.com/albums/dd461/kawaii_annyz/annyz_signitos72.gif");
buttons += emoticonButton(":a3:", 
"http://i1221.photobucket.com/albums/dd461/kawaii_annyz/cute_word4.gif");
buttons += emoticonButton(":a4:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog296.gif");
buttons += emoticonButton(":a5:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog299.gif");
buttons += emoticonButton(":a6:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog271.gif");
buttons += emoticonButton(":a7:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog289.gif");
buttons += emoticonButton(":a8:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog214.gif");
buttons += emoticonButton(":a9:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog253.gif");
buttons += emoticonButton(":b1:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog115.gif");
buttons += emoticonButton(":b2:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog100.gif");
buttons += emoticonButton(":b3:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog208.gif");
buttons += emoticonButton(":b4:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog211.gif");
buttons += emoticonButton(":b5:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog72.gif");
buttons += emoticonButton(":b6:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog176.gif");
buttons += emoticonButton(":b7:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog185.gif");
buttons += emoticonButton(":b8:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog189.gif");
buttons += emoticonButton(":b9:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog110.gif");
buttons += emoticonButton(":c1:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog39.gif");
buttons += emoticonButton(":c2:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog132.gif");
buttons += emoticonButton(":c3:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog157.gif");
buttons += emoticonButton(":c4:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog168.gif");
buttons += emoticonButton(":c5:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog1.gif");
buttons += emoticonButton(":c6:", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/minigifs_annyzblog153.gif");
buttons += emoticonButton(":c7:", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/minigifs_annyzblog143.gif");
buttons += emoticonButton(":c8:", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/minigifs_annyzblog169.gif");
buttons += emoticonButton(":c9:", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/minigifs_annyzblog88.gif");
buttons += emoticonButton(":d1:", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/minigifs_annyzblog163.gif");
buttons += emoticonButton(":d2:", 
"http://i1221.photobucket.com/albums/dd461/kawaii_annyz/minigifs_annyzblog117.gif");
buttons += emoticonButton(":d3:", 
"http://i1221.photobucket.com/albums/dd461/kawaii_annyz/minigifs_annyzblog142.gif");
buttons += emoticonButton(":d4:", 
"http://i1221.photobucket.com/albums/dd461/kawaii_annyz/minigifs_annyzblog158.gif");
buttons += emoticonButton(":d5:", 
"http://i1221.photobucket.com/albums/dd461/kawaii_annyz/minigifs_annyzblog147.gif");
buttons += emoticonButton(":d6:", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/minigifs_annyzblog120.gif");
buttons += emoticonButton(":d7:", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/minigifs_annyzblog77.gif");
buttons += emoticonButton(":d8:", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/minigifs_annyzblog83.gif");
buttons += emoticonButton(":d9:", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/minigifs_annyzblog94.gif");
buttons += emoticonButton(":e1:", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/minigifs_annyzblog85.gif");
buttons += emoticonButton(":e2:", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/minigifs_annyzblog34.gif");
buttons += emoticonButton(":e3:", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/minigifs_annyzblog86.gif");
buttons += emoticonButton(":e4:", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/minigifs_annyzblog52.gif");
buttons += emoticonButton(":e5:", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/minigifs_annyzblog102.gif");
buttons += emoticonButton(":e6:", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/minigifs_annyzblog14.gif");
buttons += emoticonButton(":e7:", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/minigifs_annyzblog26.gif");
buttons += emoticonButton(":e8:", "http://2.bp.blogspot.com/-xo492lXtMH8/TinNnCeUS7I/AAAAAAAABew/itaxBTKRqLM/s1600/mini+gifs+by+annyz+blog+%25281%2529.gif");
buttons += emoticonButton(":e9:", "http://3.bp.blogspot.com/-v4veljfU9i0/TinNwyGT1pI/AAAAAAAABgk/zjfp6FxiOIs/s1600/mini+gifs+by+annyz+blog+%252830%2529.gif");
buttons += emoticonButton(":f1:", "http://1.bp.blogspot.com/-mSkqEF5P6bA/TinNoUuhZuI/AAAAAAAABfE/Dk23iIFDBw0/s1600/mini+gifs+by+annyz+blog+%25286%2529.gif");
buttons += emoticonButton(":f2:", "http://4.bp.blogspot.com/-8h-7IFsB1og/TinNwAPAIsI/AAAAAAAABgg/z1f7K5t33TY/s1600/mini+gifs+by+annyz+blog+%252829%2529.gif");
buttons += emoticonButton(":f3:", "http://1.bp.blogspot.com/-xTts-gLZtdk/TinNnkykFvI/AAAAAAAABe4/1q3RcXCFb10/s1600/mini+gifs+by+annyz+blog+%25283%2529.gif");
buttons += emoticonButton(":f4:", "http://2.bp.blogspot.com/-_ybv_vWZeIo/TincvUrH21I/AAAAAAAACAE/WMj3oWv0qO4/s1600/cute+mini+gif+by+annyz+blog+%252863%2529.gif");
buttons += emoticonButton(":f5:", "http://1.bp.blogspot.com/-F37C4Aq1xms/TincyqWQNqI/AAAAAAAACAg/MdJnGlfLizA/s1600/cute+mini+gif+by+annyz+blog+%252870%2529.gif");
buttons += emoticonButton(":f6:", "http://1.bp.blogspot.com/-JmoIxVcUB3Q/TincxlxAJ2I/AAAAAAAACAU/K4aRqNyUnAo/s1600/cute+mini+gif+by+annyz+blog+%252867%2529.gif");
buttons += emoticonButton(":f7:", "http://4.bp.blogspot.com/-KoQ-GGGiztM/Tinavt8kerI/AAAAAAAAB8c/baTW5p2ipM0/s1600/cute+mini+gif+by+annyz+blog+%25285%2529.gif");
buttons += emoticonButton(":f8:", "http://2.bp.blogspot.com/-krU4VKvUCqs/Tinc2BRuluI/AAAAAAAACBI/l2DyTg-2gW4/s1600/cute+mini+gif+by+annyz+blog+%252880%2529.gif");
buttons += emoticonButton(":f9:", "http://2.bp.blogspot.com/-a_uL8uTPMMU/TinayQ9WPjI/AAAAAAAAB9M/G8rUfRyy27k/s1600/cute+mini+gif+by+annyz+blog+%252817%2529.gif");
buttons += emoticonButton(":g1:", "http://3.bp.blogspot.com/-qwJTO3l1Zz0/TinaxVi5wyI/AAAAAAAAB84/VuyDfJW1K3Q/s1600/cute+mini+gif+by+annyz+blog+%252812%2529.gif");
buttons += emoticonButton(":g2:", "http://4.bp.blogspot.com/-npC06SlYjes/TinazKh2X_I/AAAAAAAAB9U/OB9sHXWIWXk/s1600/cute+mini+gif+by+annyz+blog+%252819%2529.gif");
buttons += emoticonButton(":g3:", "http://3.bp.blogspot.com/-oHCXhgoU6Mg/Tinc50pltHI/AAAAAAAACBY/P9FaCBv92hk/s1600/cute+mini+gif+by+annyz+blog+%252884%2529.gif");
buttons += emoticonButton(":g4:", "http://4.bp.blogspot.com/-2vtJPR7Giio/TinaxkHIP5I/AAAAAAAAB88/zWBkXgp5Pqs/s1600/cute+mini+gif+by+annyz+blog+%252813%2529.gif");
buttons += emoticonButton(":g5:", "http://4.bp.blogspot.com/-W_M-zeM0hJQ/Tina9IFcy5I/AAAAAAAAB_A/sSuir-ELZQs/s1600/cute+mini+gif+by+annyz+blog+%252846%2529.gif");
buttons += emoticonButton(":g6:", "http://2.bp.blogspot.com/-le_-3BQJo9E/TincstC07wI/AAAAAAAAB_k/fToGdsTm1a8/s1600/cute+mini+gif+by+annyz+blog+%252855%2529.gif");
buttons += emoticonButton(":g7:", "http://4.bp.blogspot.com/-WbME5hm0ULM/Tina7-j3CiI/AAAAAAAAB-4/rzYps3XMk-g/s1600/cute+mini+gif+by+annyz+blog+%252844%2529.gif");
buttons += emoticonButton(":g8:", "http://2.bp.blogspot.com/-sx9p7xPLcak/Tina7afRC5I/AAAAAAAAB-0/WRjdzgbpLp0/s1600/cute+mini+gif+by+annyz+blog+%252843%2529.gif");
buttons += emoticonButton(":g9:", "http://2.bp.blogspot.com/-kbh32HSjh-g/TinazdQMa_I/AAAAAAAAB9Y/3ZgLXMlNGKo/s1600/cute+mini+gif+by+annyz+blog+%252820%2529.gif");





	
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);