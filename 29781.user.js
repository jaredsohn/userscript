
// ==UserScript==
// @name          Edit Swalif
// @description	  EditSwalif V 0.7Alpha
// @By			  Ibrahim Bidi
// @namespace     http://www.wino.ws
// @namespace     javascript@hotmail.co.uk
// @include       http://www.swalif.net/softs/*
// ==/UserScript==
(function() {
	
//var src1 = 'clientscript/vbulletin_editor.js';
//var src2 = 'clientscript/vbulletin_stdedit.js';
/*
var scr=document.createElement("script");
    scr.src = src1;   
  document.body.appendChild(scr)
var scr1=document.createElement("script");
    scr1.src = src2;   
  document.body.appendChild(scr1)
*/
if(document.location.href.indexOf("showthread.php?") != -1){
	var s = '<div id="controlbar"><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td><input class="bginput" value=" List " onclick="return dolist()" title="ÅäÔÇÁ ÞÇÆãÉ" type="button"><input title="ÅáÊÝÇÝ ÃÞæÇÓ [CODE]" onclick="return vbcode(\'CODE\', \'\')" value=" CODE " class="bginput" type="button"><input title="ÅáÊÝÇÝ ÃÞæÇÓ [HTML]" onclick="return vbcode(\'HTML\', \'\')" value=" HTML " class="bginput" type="button"><input title="ÅáÊÝÇÝ ÃÞæÇÓ [PHP]" onclick="return vbcode(\'PHP\', \'\')" value=" PHP " class="bginput" type="button"><input title="ÅáÊÝÇÝ ÃÞæÇÓ [QUOTE]" onclick="return vbcode(\'QUOTE\', \'\')" value="Quote" class="bginput" type="button"><BR><input title="ÛÇãÞ" accesskey="b" onclick="return vbcode(\'B\', \'\')" value=" B " class="bginput" type="button"><input title="ãÇÆá" accesskey="i" onclick="return vbcode(\'I\', \'\')" value=" I " class="bginput" type="button"><input title="ÊÍÊå ÎØ" accesskey="u" onclick="return vbcode(\'U\', \'\')" value=" U " class="bginput" type="button"><input class="bginput" value=" IMG " onclick="return vbcode(\'IMG\', \'http://\')" title="ÅÖÇÝÉ ÕæÑÉ" type="button"><input class="bginput" value=" http:// " onclick="namedlink(\'URL\')" title="ÅÖÇÝÉ Hyperlink" type="button"><BR><input class="bginput" value=" EMAIL " onclick="namedlink(\'EMAIL\')" title="Insert Email Link" type="button"><input class="bginput" value=" Left " onclick="return vbcode(\'LEFT\', \'\')" title="ÊäÓíÞ ááíÓÇÑ" type="button"><input class="bginput" value=" Center " onclick="return vbcode(\'CENTER\', \'\')" title="ÊæÓíØ" type="button"><input class="bginput" value=" Right " onclick="return vbcode(\'RIGHT\', \'\')" title="ÊäÓíÞ ááíãíä" type="button"><input class="bginput" value=" Ident " onclick="return vbcode(\'INDENT\', \'\')" title="Ident" type="button"><BR></td></tr></tbody></table></div><div class="controlbar"><textarea name="message" id="qr_message" class="bginput" style="width: 600px; height: 200px;" cols="60" rows="8" tabindex="1"></textarea></div>';
	if(document.getElementById("vBulletin_editor"))
		document.getElementById("vBulletin_editor").innerHTML = s
}
})();
