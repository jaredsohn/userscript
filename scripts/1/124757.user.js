//-----------------------------------------------------------------------//

// Visit my blog at www.annyz-kawaii.blogspot.com

//-----------------------------------------------------------------------//

//Credits to original author : www.annyz-kawaii.blogspot.com

// ==UserScript==
// @name           Annyz Blog (2)
// ==/UserScript==

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

window.addEventListener("load", function(e) {

function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";

buttons += emoticonButton(":01:", "http://1.bp.blogspot.com/-F37C4Aq1xms/TincyqWQNqI/AAAAAAAACAg/MdJnGlfLizA/s1600/cute+mini+gif+by+annyz+blog+%252870%2529.gif");
	buttons += emoticonButton(":02:", "http://1.bp.blogspot.com/-JmoIxVcUB3Q/TincxlxAJ2I/AAAAAAAACAU/K4aRqNyUnAo/s1600/cute+mini+gif+by+annyz+blog+%252867%2529.gif");
        buttons += emoticonButton(":03:", "http://4.bp.blogspot.com/-KoQ-GGGiztM/Tinavt8kerI/AAAAAAAAB8c/baTW5p2ipM0/s1600/cute+mini+gif+by+annyz+blog+%25285%2529.gif");
        buttons += emoticonButton(":04:", "http://2.bp.blogspot.com/-krU4VKvUCqs/Tinc2BRuluI/AAAAAAAACBI/l2DyTg-2gW4/s1600/cute+mini+gif+by+annyz+blog+%252880%2529.gif");
        buttons += emoticonButton(":05:", "http://2.bp.blogspot.com/-a_uL8uTPMMU/TinayQ9WPjI/AAAAAAAAB9M/G8rUfRyy27k/s1600/cute+mini+gif+by+annyz+blog+%252817%2529.gif");
        buttons += emoticonButton(":06:", "http://3.bp.blogspot.com/-qwJTO3l1Zz0/TinaxVi5wyI/AAAAAAAAB84/VuyDfJW1K3Q/s1600/cute+mini+gif+by+annyz+blog+%252812%2529.gif");
        buttons += emoticonButton(":07:", "http://4.bp.blogspot.com/-npC06SlYjes/TinazKh2X_I/AAAAAAAAB9U/OB9sHXWIWXk/s1600/cute+mini+gif+by+annyz+blog+%252819%2529.gif");
        buttons += emoticonButton(":08:", "http://3.bp.blogspot.com/-oHCXhgoU6Mg/Tinc50pltHI/AAAAAAAACBY/P9FaCBv92hk/s1600/cute+mini+gif+by+annyz+blog+%252884%2529.gif");
        buttons += emoticonButton(":09:", "http://4.bp.blogspot.com/-2vtJPR7Giio/TinaxkHIP5I/AAAAAAAAB88/zWBkXgp5Pqs/s1600/cute+mini+gif+by+annyz+blog+%252813%2529.gif");
        buttons += emoticonButton(":10:", "http://4.bp.blogspot.com/-W_M-zeM0hJQ/Tina9IFcy5I/AAAAAAAAB_A/sSuir-ELZQs/s1600/cute+mini+gif+by+annyz+blog+%252846%2529.gif");
        buttons += emoticonButton(":11:", "http://2.bp.blogspot.com/-le_-3BQJo9E/TincstC07wI/AAAAAAAAB_k/fToGdsTm1a8/s1600/cute+mini+gif+by+annyz+blog+%252855%2529.gif");
        buttons += emoticonButton(":12:", "http://4.bp.blogspot.com/-WbME5hm0ULM/Tina7-j3CiI/AAAAAAAAB-4/rzYps3XMk-g/s1600/cute+mini+gif+by+annyz+blog+%252844%2529.gif");
        buttons += emoticonButton(":13:", "http://2.bp.blogspot.com/-sx9p7xPLcak/Tina7afRC5I/AAAAAAAAB-0/WRjdzgbpLp0/s1600/cute+mini+gif+by+annyz+blog+%252843%2529.gif");
        buttons += emoticonButton(":14:", "http://2.bp.blogspot.com/-kbh32HSjh-g/TinazdQMa_I/AAAAAAAAB9Y/3ZgLXMlNGKo/s1600/cute+mini+gif+by+annyz+blog+%252820%2529.gif");
        buttons += emoticonButton(":15:", "http://3.bp.blogspot.com/-3T_JwE55_mg/Tinctos5nAI/AAAAAAAAB_w/OUry5igD6F0/s1600/cute+mini+gif+by+annyz+blog+%252858%2529.gif");
        buttons += emoticonButton(":16:", "http://2.bp.blogspot.com/-BHTrKIkwnZc/Tina4okwjaI/AAAAAAAAB-Y/iThlfUBrxio/s1600/cute+mini+gif+by+annyz+blog+%252836%2529.gif");
        buttons += emoticonButton(":17:", "http://4.bp.blogspot.com/-1f4Mi1zhLik/Tinaw65_cwI/AAAAAAAAB8w/ypBTrysZERQ/s1600/cute+mini+gif+by+annyz+blog+%252810%2529.gif");
        buttons += emoticonButton(":18:", "http://3.bp.blogspot.com/-GVFdGzmt2Ws/TincycER2OI/AAAAAAAACAc/ZtSJDLOi39s/s1600/cute+mini+gif+by+annyz+blog+%252869%2529.gif");
        buttons += emoticonButton(":19:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog258.gif");
        buttons += emoticonButton(":20:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog260.gif");
        buttons += emoticonButton(":21:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog186.gif");
        buttons += emoticonButton(":22:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog197.gif");
        buttons += emoticonButton(":23:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog4.gif");
        buttons += emoticonButton(":24:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog46.gif");
        buttons += emoticonButton(":25:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog83.gif");
        buttons += emoticonButton(":26:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog181.gif");
        buttons += emoticonButton(":27:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog27.gif");
        buttons += emoticonButton(":28:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog32.gif");
        buttons += emoticonButton(":29:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog161.gif");
        buttons += emoticonButton(":30:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog3.gif");
        buttons += emoticonButton(":31:", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog49.gif");
        
	
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);

    
