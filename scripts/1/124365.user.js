// ==UserScript==
// @name           nCore Hírfolyam BBKód
// @namespace      EliteGaMer
// @include        http://*.ncore.cc/*
// @include        http://*.ncore.nu/*
// @include        http://ncore.cc/*
// @include        http://ncore.nu/*
// @include        https://*.ncore.cc/*
// @include        https://*.ncore.nu/*
// @include        https://ncore.cc/*
// @include        https://ncore.nu/*
// ==/UserScript==


var tartalom="";
tartalom += "<a title=\"Vastag betű\" href=\"javascript: AddBB('news_input', 'bold')\"><img src=\"\/styles\/dark\/hsz_bb_vastag.gif\" class=\"bb_link\"><\/a>";
tartalom += "<a title=\"Dőlt betű\" href=\"javascript: AddBB('news_input', 'italic')\"><img src=\"\/styles\/dark\/hsz_bb_dolt.gif\" class=\"bb_link\"><\/a>";
tartalom += "<a title=\"Aláhúzott betű\" href=\"javascript: AddBB('news_input', 'underline')\"><img src=\"\/styles\/dark\/hsz_bb_alahuzott.gif\" class=\"bb_link\"><\/a>";
tartalom += "<select size=\"1\" name=\"size\" id=\"sizes\">";
tartalom += "					<option value=\"8pt\">8<\/option>";
tartalom += "					<option value=\"9pt\">9<\/option>";
tartalom += "					<option value=\"10pt\" selected=\"selected\">10<\/option>";
tartalom += "					<option value=\"12pt\">12<\/option>";
tartalom += "					<option value=\"14pt\">14<\/option>";
tartalom += "					<option value=\"16pt\">16<\/option>";
tartalom += "					<option value=\"18pt\">18<\/option>";
tartalom += "					<option value=\"20pt\">20<\/option>";
tartalom += "					<option value=\"22pt\">22<\/option>";
tartalom += "					<option value=\"24pt\">24<\/option>";
tartalom += "					<option value=\"30pt\">30<\/option>";
tartalom += "					<option value=\"36pt\">36<\/option>";
tartalom += "					<option value=\"48pt\">48<\/option>";
tartalom += "					<option value=\"72pt\">72<\/option>";
tartalom += "				<\/select>";
tartalom += "<a title=\"Betűméret\" href=\"javascript: AddBB('news_input', 'size')\"><img src=\"\/styles\/dark\/hsz_bb_meret.gif\" class=\"bb_link\"><\/a>";
tartalom += "<select size=\"1\" name=\"color\" id=\"colors\">";
tartalom += "					<option value=\"black\" selected=\"selected\">Fekete<\/option>";
tartalom += "					<option value=\"white\">Fehér<\/option>";
tartalom += "					<option value=\"green\">Zöld<\/option>";
tartalom += "					<option value=\"maroon\">Gesztenyebarna<\/option>";
tartalom += "					<option value=\"olive\">Olivazöld<\/option>";
tartalom += "					<option value=\"navy\">Mélykék<\/option>";
tartalom += "					<option value=\"purple\">Lila<\/option>";
tartalom += "					<option value=\"gray\">Szürke<\/option>";
tartalom += "					<option value=\"yellow\">Sárga<\/option>";
tartalom += "					<option value=\"lime\">Lime<\/option>";
tartalom += "					<option value=\"aqua\">Cián<\/option>";
tartalom += "					<option value=\"fuchsia\">Ciklámen<\/option>";
tartalom += "					<option value=\"silver\">Ezüst<\/option>";
tartalom += "					<option value=\"red\">Piros<\/option>";
tartalom += "					<option value=\"blue\">Kék<\/option>";
tartalom += "					<option value=\"teal\">Pávakék<\/option>";
tartalom += "				<\/select>";
tartalom += "<a title=\"Betűszín\" href=\"javascript: AddBB('news_input', 'color')\"><img src=\"\/styles\/dark\/hsz_bb_szin.gif\" class=\"bb_link\"><\/a>";
tartalom += "<a title=\"Smile beszúrása\" href=\"wiki.php?action=read&amp;id=403\" target=\"_blank\"><img src=\"\/styles\/dark\/hsz_bb_smilie.gif\" class=\"bb_link\"><\/a>";
tartalom += "<a title=\"Kép beszúrása\" href=\"javascript: AddBB('news_input', 'picture')\"><img src=\"\/styles\/dark\/hsz_bb_kep.gif\" class=\"bb_link\"><\/a>";
tartalom += "<a title=\"Nagyméretű kép beszúrása\" href=\"javascript: AddBB('news_input', 'imgw')\"><img src=\"\/styles\/dark\/hsz_bb_imgw.gif\" class=\"bb_link\"><\/a>";
tartalom += "<a title=\"Link beszúrása\" href=\"javascript: AddBB('news_input', 'url')\"><img src=\"\/styles\/dark\/hsz_bb_link.gif\" class=\"bb_link\"><\/a>";
tartalom += "<a title=\"Spoiler, rejtett szöveg beszúrása\" href=\"javascript: AddBB('news_input', 'spoiler')\"><img src=\"\/styles\/dark\/hsz_bb_spoiler.gif\" class=\"bb_link\"><\/a>";
tartalom += "<a title=\"Felsorolás\" href=\"javascript: AddBB('news_input', 'list')\"><img src=\"\/styles\/dark\/hsz_bb_felsorolas.gif\" class=\"bb_link\"><\/a>";
tartalom += "<a title=\"Idézet\" href=\"javascript: AddBB('news_input', 'quote')\"><img src=\"\/styles\/dark\/hsz_bb_idezet.gif\" class=\"bb_link\"><\/a>";
tartalom += "<a title=\"Kérdés\" href=\"wiki.php?action=read&amp;id=393\" target=\"_blank\"><img src=\"\/styles\/dark\/hsz_bb_kerdes.gif\" class=\"bb_link\"><\/a>";
tartalom += "<br / > <small>Ha a gombra kattintáskor bezáródik a szövegmező nyomj egy 'space'-t a szövegmezőben, utána menni fog.<br /> Ha kérdésed van akkor keress meg <a href='/profile.php?id=335967'>[ITT]</a></small>";
tartalom += " vagy <a onclick=\"profile_pm('335967', 'normal');\" href=\"javascript:void(0);\">[Üzenet küldés]<\/a>.";
tartalom += "		<table>";
tartalom += "		<tbody>";
tartalom += "		<tr>";
tartalom += "		<td><textarea class=\"beviteliMezo_news\" name=\"news_input\" id=\"news_input\" onblur=\"if (this.value=='') {document.getElementById('add_news').style.display='none'; document.getElementById('add_news_close').style.display='block';}\" onkeyup=\"autoresize(this);limitText('news_input','countdown',500);\" onkeydown=\"limitText('news_input','countdown',500);\" rows=\"2\"><\/textarea><\/td>";
tartalom += "		<td><img id=\"news_input_img\" class=\"g_mehet clickable\" src=\"styles\/div_link.gif\" alt=\"Mehet\" onclick=\"send_news();\"><\/td>";
tartalom += "		<\/tr>";
tartalom += "		<tr>";
tartalom += "		<td class=\"back_counter\" colspan=\"2\"><span class=\"comment\">Még <span id=\"countdown\">500<\/span> karakter írható.<\/span><\/td>";
tartalom += "		<\/tr>";
tartalom += "		<\/tbody><\/table>";

	$("#add_news table").html(tartalom);
	$("#news_input").html(" ");
	
})();