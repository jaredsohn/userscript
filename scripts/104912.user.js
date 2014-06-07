// Modified by Karya IT (http://karyait.blogspot.com/) (http://www.karyait.co.cc), emoticon by http://www.cute-factor.com/. 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// Onion Head 
// modify the script to insert the emoticon directly after the cursor
// ==UserScript==
// @name           Onion emoticon for Blogger
// @namespace      http://karyait.blogspot.com/
// @description    Emoticons for Blogger 
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
    buttons += emoticonButton("::1::", "http://www.cute-factor.com/images/smilies/onion/047.gif");
    buttons += emoticonButton("::2::", "http://www.cute-factor.com/images/smilies/onion/th_107_.gif");
    buttons += emoticonButton("::3::", "http://www.cute-factor.com/images/smilies/onion/th_095_.gif");
    buttons += emoticonButton("::4::", "http://www.cute-factor.com/images/smilies/onion/th_087_.gif");
    buttons += emoticonButton("::5::", "http://www.cute-factor.com/images/smilies/onion/afd371da.gif");
    buttons += emoticonButton("::6::", "http://www.cute-factor.com/images/smilies/onion/th_109_.gif");
    buttons += emoticonButton("::7::", "http://www.cute-factor.com/images/smilies/onion/cd08785a.gif");
    buttons += emoticonButton("::8::", "http://www.cute-factor.com/images/smilies/onion/9bbc76d5.gif");
    buttons += emoticonButton("::9::", "http://www.cute-factor.com/images/smilies/onion/th_083_v2.gif");
    buttons += emoticonButton("::10::", "http://www.cute-factor.com/images/smilies/onion/040.gif");
    buttons += emoticonButton("::11::", "http://www.cute-factor.com/images/smilies/onion/8dcf9699.gif");
    buttons += emoticonButton("::12::", "http://www.cute-factor.com/images/smilies/onion/5a6157d0.gif");
    buttons += emoticonButton("::13::", "http://www.cute-factor.com/images/smilies/onion/87a4e689.gif");
    buttons += emoticonButton("::14::", "http://www.cute-factor.com/images/smilies/onion/026.gif");
    buttons += emoticonButton("::15::", "http://www.cute-factor.com/images/smilies/onion/1b38f9e2.gif");
    buttons += emoticonButton("::16::", "http://www.cute-factor.com/images/smilies/onion/059.gif");
    buttons += emoticonButton("::17::", "http://www.cute-factor.com/images/smilies/onion/875328cc.gif");
    buttons += emoticonButton("::18::", "http://www.cute-factor.com/images/smilies/onion/th_089_02.gif");
    buttons += emoticonButton("::19::", "http://www.cute-factor.com/images/smilies/onion/bikep2.gif");
    buttons += emoticonButton("::20::", "http://www.cute-factor.com/images/smilies/onion/th_057_.gif");
    buttons += emoticonButton("::21::", "http://www.cute-factor.com/images/smilies/onion/52b44be5.gif");
    buttons += emoticonButton("::22::", "http://www.cute-factor.com/images/smilies/onion/th_096_K.gif");
    buttons += emoticonButton("::23::", "http://www.cute-factor.com/images/smilies/onion/5fc0f220.gif");
    buttons += emoticonButton("::24::", "http://www.cute-factor.com/images/smilies/onion/070.gif");
    buttons += emoticonButton("::25::", "http://www.cute-factor.com/images/smilies/onion/088.gif");
    buttons += emoticonButton("::26::", "http://www.cute-factor.com/images/smilies/onion/th_090_.gif");
    buttons += emoticonButton("::27::", "http://www.cute-factor.com/images/smilies/onion/th_113_.gif");
    buttons += emoticonButton("::28::", "http://www.cute-factor.com/images/smilies/onion/064.gif");
    buttons += emoticonButton("::29::", "http://www.cute-factor.com/images/smilies/onion/th_102_.gif");
    buttons += emoticonButton("::30::", "http://www.cute-factor.com/images/smilies/onion/th_093.gif");
    buttons += emoticonButton("::31::", "http://www.cute-factor.com/images/smilies/onion/6f428754.gif");
    buttons += emoticonButton("::32::", "http://www.cute-factor.com/images/smilies/onion/f529a952.gif");
    buttons += emoticonButton("::33::", "http://www.cute-factor.com/images/smilies/onion/967339c1.gif");
    buttons += emoticonButton("::34::", "http://www.cute-factor.com/images/smilies/onion/048.gif");
    buttons += emoticonButton("::35::", "http://www.cute-factor.com/images/smilies/onion/sillyp1.gif");
    buttons += emoticonButton("::36::", "http://www.cute-factor.com/images/smilies/onion/063.gif");
    buttons += emoticonButton("::37::", "http://www.cute-factor.com/images/smilies/onion/df13952b.gif");
    buttons += emoticonButton("::38::", "http://www.cute-factor.com/images/smilies/onion/th_085_.gif");
    buttons += emoticonButton("::39::", "http://www.cute-factor.com/images/smilies/onion/014.gif");
    buttons += emoticonButton("::40::", "http://www.cute-factor.com/images/smilies/onion/087.gif");
    buttons += emoticonButton("::41::", "http://www.cute-factor.com/images/smilies/onion/f6eb47d3.gif");
    buttons += emoticonButton("::42::", "http://www.cute-factor.com/images/smilies/onion/th_117_.gif");
    buttons += emoticonButton("::43::", "http://www.cute-factor.com/images/smilies/onion/th_092_.gif");
    buttons += emoticonButton("::44::", "http://www.cute-factor.com/images/smilies/onion/d33561e9.gif");
    buttons += emoticonButton("::45::", "http://www.cute-factor.com/images/smilies/onion/th_116_.gif");
    buttons += emoticonButton("::46::", "http://www.cute-factor.com/images/smilies/onion/c6a3ddb3.gif");
    buttons += emoticonButton("::47::", "http://www.cute-factor.com/images/smilies/onion/th_082_.gif");
    buttons += emoticonButton("::48::", "http://www.cute-factor.com/images/smilies/onion/7f5341cc.gif");
    buttons += emoticonButton("::49::", "http://www.cute-factor.com/images/smilies/onion/d79df121.gif");
    buttons += emoticonButton("::50::", "http://www.cute-factor.com/images/smilies/onion/punchp1.gif");
    buttons += emoticonButton("::51::", "http://www.cute-factor.com/images/smilies/onion/th_091_-1.gif");
    buttons += emoticonButton("::52::", "http://www.cute-factor.com/images/smilies/onion/th_100_.gif");
    buttons += emoticonButton("::53::", "http://www.cute-factor.com/images/smilies/onion/4e5dd44a.gif");
    buttons += emoticonButton("::54::", "http://www.cute-factor.com/images/smilies/onion/f5f49335.gif");
    buttons += emoticonButton("::55::", "http://www.cute-factor.com/images/smilies/onion/8c460310.gif");
    buttons += emoticonButton("::56::", "http://www.cute-factor.com/images/smilies/onion/d16c4689.gif");
    buttons += emoticonButton("::57::", "http://www.cute-factor.com/images/smilies/onion/63d4808b.gif");
    buttons += emoticonButton("::58::", "http://www.cute-factor.com/images/smilies/onion/th_084_.gif");
    buttons += emoticonButton("::59::", "http://www.cute-factor.com/images/smilies/onion/075.gif");
    buttons += emoticonButton("::60::", "http://www.cute-factor.com/images/smilies/onion/shake.gif");
    buttons += emoticonButton("::61::", "http://www.cute-factor.com/images/smilies/onion/af48944b.gif");
    buttons += emoticonButton("::62::", "http://www.cute-factor.com/images/smilies/onion/215ad82f.gif");
    buttons += emoticonButton("::63::", "http://www.cute-factor.com/images/smilies/onion/sillyp2.gif");
    buttons += emoticonButton("::64::", "http://www.cute-factor.com/images/smilies/onion/20f27c58.gif");
    buttons += emoticonButton("::65::", "http://www.cute-factor.com/images/smilies/onion/b6b25dc6.gif");
    buttons += emoticonButton("::66::", "http://www.cute-factor.com/images/smilies/onion/037.gif");
    buttons += emoticonButton("::67::", "http://www.cute-factor.com/images/smilies/onion/th_059_.gif");
    buttons += emoticonButton("::68::", "http://www.cute-factor.com/images/smilies/onion/4412144b.gif");
    buttons += emoticonButton("::69::", "http://www.cute-factor.com/images/smilies/onion/17f0f3b0.gif");
    buttons += emoticonButton("::70::", "http://www.cute-factor.com/images/smilies/onion/ac0d5cff.gif");
    buttons += emoticonButton("::71::", "http://www.cute-factor.com/images/smilies/onion/e111de78.gif");
    buttons += emoticonButton("::72::", "http://www.cute-factor.com/images/smilies/onion/th_094_01.gif");
    buttons += emoticonButton("::73::", "http://www.cute-factor.com/images/smilies/onion/073.gif");
    buttons += emoticonButton("::74::", "http://www.cute-factor.com/images/smilies/onion/th_001_-v2.gif");
    buttons += emoticonButton("::75::", "http://www.cute-factor.com/images/smilies/onion/56c0fba3.gif");
    buttons += emoticonButton("::76::", "http://www.cute-factor.com/images/smilies/onion/4fd9f2d3.gif");
    buttons += emoticonButton("::77::", "http://www.cute-factor.com/images/smilies/onion/098eb4a5.gif");
    buttons += emoticonButton("::78::", "http://www.cute-factor.com/images/smilies/onion/154218d4.gif");
    buttons += emoticonButton("::79::", "http://www.cute-factor.com/images/smilies/onion/0fbbf481.gif");
    buttons += emoticonButton("::80::", "http://www.cute-factor.com/images/smilies/onion/485c3a61.gif");
    buttons += emoticonButton("::81::", "http://www.cute-factor.com/images/smilies/onion/069.gif");
    buttons += emoticonButton("::82::", "http://www.cute-factor.com/images/smilies/onion/4d6161fd.gif");
    buttons += emoticonButton("::83::", "http://www.cute-factor.com/images/smilies/onion/th_118_.gif");
    buttons += emoticonButton("::84::", "http://www.cute-factor.com/images/smilies/onion/072.gif");
    buttons += emoticonButton("::85::", "http://www.cute-factor.com/images/smilies/onion/0eeeff42.gif");
    buttons += emoticonButton("::86::", "http://www.cute-factor.com/images/smilies/onion/077.gif");
    buttons += emoticonButton("::87::", "http://www.cute-factor.com/images/smilies/onion/th_099_.gif");
    buttons += emoticonButton("::88::", "http://www.cute-factor.com/images/smilies/onion/beautifu2.gif");
    buttons += emoticonButton("::89::", "http://www.cute-factor.com/images/smilies/onion/b210e58c.gif");
    buttons += emoticonButton("::90::", "http://www.cute-factor.com/images/smilies/onion/c8908497.gif");
    buttons += emoticonButton("::91::", "http://www.cute-factor.com/images/smilies/onion/e0765523.gif");
    buttons += emoticonButton("::92::", "http://www.cute-factor.com/images/smilies/onion/3c68bb64.gif");
    buttons += emoticonButton("::93::", "http://www.cute-factor.com/images/smilies/onion/33c4b951.gif");
    buttons += emoticonButton("::94::", "http://www.cute-factor.com/images/smilies/onion/th_114_.gif");
    buttons += emoticonButton("::95::", "http://www.cute-factor.com/images/smilies/onion/efb50fe2.gif");
    buttons += emoticonButton("::96::", "http://www.cute-factor.com/images/smilies/onion/047352f3.gif");
    buttons += emoticonButton("::97::", "http://www.cute-factor.com/images/smilies/onion/th_091_-2.gif");
    buttons += emoticonButton("::98::", "http://www.cute-factor.com/images/smilies/onion/th_091_.gif");
    buttons += emoticonButton("::99::", "http://www.cute-factor.com/images/smilies/onion/th_108_.gif");
    buttons += emoticonButton("::100::", "http://www.cute-factor.com/images/smilies/onion/th_053_XD.gif");
    buttons += emoticonButton("::101::", "http://www.cute-factor.com/images/smilies/onion/91eea40f.gif");
    buttons += emoticonButton("::102::", "http://www.cute-factor.com/images/smilies/onion/07baa27a.gif");
    buttons += emoticonButton("::103::", "http://www.cute-factor.com/images/smilies/onion/bikep1.gif");
    buttons += emoticonButton("::104::", "http://www.cute-factor.com/images/smilies/onion/3eb4e7b3.gif");
    buttons += emoticonButton("::105::", "http://www.cute-factor.com/images/smilies/onion/071.gif");
    buttons += emoticonButton("::106::", "http://www.cute-factor.com/images/smilies/onion/70bff581.gif");
    buttons += emoticonButton("::107::", "http://www.cute-factor.com/images/smilies/onion/th_110_.gif");
    buttons += emoticonButton("::108::", "http://www.cute-factor.com/images/smilies/onion/th_104_.gif");
    buttons += emoticonButton("::109::", "http://www.cute-factor.com/images/smilies/onion/016.gif");
    buttons += emoticonButton("::110::", "http://www.cute-factor.com/images/smilies/onion/5c745924.gif");
    buttons += emoticonButton("::111::", "http://www.cute-factor.com/images/smilies/onion/th_091_-3.gif");
    buttons += emoticonButton("::112::", "http://www.cute-factor.com/images/smilies/onion/044.gif");
    buttons += emoticonButton("::113::", "http://www.cute-factor.com/images/smilies/onion/baa60776.gif");
    buttons += emoticonButton("::114::", "http://www.cute-factor.com/images/smilies/onion/th_115_.gif");
    buttons += emoticonButton("::115::", "http://www.cute-factor.com/images/smilies/onion/860e2a45.gif");
    buttons += emoticonButton("::116::", "http://www.cute-factor.com/images/smilies/onion/189bbdde.gif");
    buttons += emoticonButton("::117::", "http://www.cute-factor.com/images/smilies/onion/cfed93e2.gif");
    buttons += emoticonButton("::118::", "http://www.cute-factor.com/images/smilies/onion/4519626a.gif");
    buttons += emoticonButton("::119::", "http://www.cute-factor.com/images/smilies/onion/053.gif");
    buttons += emoticonButton("::120::", "http://www.cute-factor.com/images/smilies/onion/th_103_.gif");
    buttons += emoticonButton("::121::", "http://www.cute-factor.com/images/smilies/onion/042.gif");
    buttons += emoticonButton("::122::", "http://www.cute-factor.com/images/smilies/onion/th_009_v2.gif");
    buttons += emoticonButton("::123::", "http://www.cute-factor.com/images/smilies/onion/th_098_.gif");
    buttons += emoticonButton("::124::", "http://www.cute-factor.com/images/smilies/onion/d5f02ecd.gif");
    buttons += emoticonButton("::125::", "http://www.cute-factor.com/images/smilies/onion/punchp2.gif");
    buttons += emoticonButton("::126::", "http://www.cute-factor.com/images/smilies/onion/th_106_.gif");
    buttons += emoticonButton("::127::", "http://www.cute-factor.com/images/smilies/onion/punch.gif");
    buttons += emoticonButton("::128::", "http://www.cute-factor.com/images/smilies/onion/kiddy.gif");
    buttons += emoticonButton("::129::", "http://www.cute-factor.com/images/smilies/onion/d582d79f.gif");
    buttons += emoticonButton("::130::", "http://www.cute-factor.com/images/smilies/onion/04a97f13.gif");
    buttons += emoticonButton("::131::", "http://www.cute-factor.com/images/smilies/onion/one.gif");
    buttons += emoticonButton("::132::", "http://www.cute-factor.com/images/smilies/onion/th_101_.gif");
    buttons += emoticonButton("::133::", "http://www.cute-factor.com/images/smilies/onion/th_015_orz-v2.gif");
    buttons += emoticonButton("::134::", "http://www.cute-factor.com/images/smilies/onion/023.gif");
    buttons += emoticonButton("::135::", "http://www.cute-factor.com/images/smilies/onion/5e565bcb.gif");
    buttons += emoticonButton("::136::", "http://www.cute-factor.com/images/smilies/onion/th_111_.gif");
    buttons += emoticonButton("::137::", "http://www.cute-factor.com/images/smilies/onion/3070242c.gif");
    buttons += emoticonButton("::138::", "http://www.cute-factor.com/images/smilies/onion/th_105_.gif");
    buttons += emoticonButton("::139::", "http://www.cute-factor.com/images/smilies/onion/th_091_QQ.gif");
    buttons += emoticonButton("::140::", "http://www.cute-factor.com/images/smilies/onion/th_081_.gif");
    buttons += emoticonButton("::141::", "http://www.cute-factor.com/images/smilies/onion/64caf316.gif");
    buttons += emoticonButton("::142::", "http://www.cute-factor.com/images/smilies/onion/8f337f1c.gif");
    buttons += emoticonButton("::143::", "http://www.cute-factor.com/images/smilies/onion/233cd70a.gif");
    buttons += emoticonButton("::144::", "http://www.cute-factor.com/images/smilies/onion/d1eef220.gif");
    buttons += emoticonButton("::145::", "http://www.cute-factor.com/images/smilies/onion/015.gif");
    buttons += emoticonButton("::146::", "http://www.cute-factor.com/images/smilies/onion/074.gif");
   
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