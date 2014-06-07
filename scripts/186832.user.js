// ==UserScript==
// @name           nCore Hírfolyam BBKód v3.0.3B | nCore Dark by ForWhhy
// @namespace      by ForWhhy a.k.a EliTeGaMer
// @include        https://ncore.cc/index.php*
// @include        https://ncore.cc/profile.php*
// @downloadURL   https://userscripts.org/scripts/source/186832.user.js
// @updateURL     https://userscripts.org/scripts/source/186832.meta.js
// @version		   v3.0.3 beta
// ==/UserScript==
		var hirfolyam="";
		hirfolyam += "<a title=\"Vastag betű\" href=\"javascript: AddBB('news_input', 'bold')\"><img src=\"\/styles\/dark\/hsz_bb_vastag.gif\" class=\"bb_link\"><\/a>";
		hirfolyam += "<a title=\"Dőlt betű\" href=\"javascript: AddBB('news_input', 'italic')\"><img src=\"\/styles\/dark\/hsz_bb_dolt.gif\" class=\"bb_link\"><\/a>";
		hirfolyam += "<a title=\"Aláhúzott betű\" href=\"javascript: AddBB('news_input', 'underline')\"><img src=\"\/styles\/dark\/hsz_bb_alahuzott.gif\" class=\"bb_link\"><\/a>";
		hirfolyam += "<select size=\"1\" name=\"size\" id=\"sizes\">";
		hirfolyam += "					<option value=\"8pt\">8<\/option>";
		hirfolyam += "					<option value=\"9pt\">9<\/option>";
		hirfolyam += "					<option value=\"10pt\" selected=\"selected\">10<\/option>";
		hirfolyam += "					<option value=\"12pt\">12<\/option>";
		hirfolyam += "					<option value=\"14pt\">14<\/option>";
		hirfolyam += "					<option value=\"16pt\">16<\/option>";
		hirfolyam += "					<option value=\"18pt\">18<\/option>";
		hirfolyam += "					<option value=\"20pt\">20<\/option>";
		hirfolyam += "					<option value=\"22pt\">22<\/option>";
		hirfolyam += "					<option value=\"24pt\">24<\/option>";
		hirfolyam += "					<option value=\"30pt\">30<\/option>";
		hirfolyam += "					<option value=\"36pt\">36<\/option>";
		hirfolyam += "					<option value=\"48pt\">48<\/option>";
		hirfolyam += "					<option value=\"72pt\">72<\/option>";
		hirfolyam += "				<\/select>";
		hirfolyam += "<a title=\"Betűméret\" href=\"javascript: AddBB('news_input', 'size')\"><img src=\"\/styles\/dark\/hsz_bb_meret.gif\" class=\"bb_link\"><\/a>";
		hirfolyam += "<select size=\"1\" name=\"color\" id=\"colors\">";
		hirfolyam += "					<option value=\"black\" selected=\"selected\">Fekete<\/option>";
		hirfolyam += "					<option value=\"white\">Fehér<\/option>";
		hirfolyam += "					<option value=\"green\">Zöld<\/option>";
		hirfolyam += "					<option value=\"maroon\">Gesztenyebarna<\/option>";
		hirfolyam += "					<option value=\"olive\">Olivazöld<\/option>";
		hirfolyam += "					<option value=\"navy\">Mélykék<\/option>";
		hirfolyam += "					<option value=\"purple\">Lila<\/option>";
		hirfolyam += "					<option value=\"gray\">Szürke<\/option>";
		hirfolyam += "					<option value=\"yellow\">Sárga<\/option>";
		hirfolyam += "					<option value=\"lime\">Lime<\/option>";
		hirfolyam += "					<option value=\"aqua\">Cián<\/option>";
		hirfolyam += "					<option value=\"fuchsia\">Ciklámen<\/option>";
		hirfolyam += "					<option value=\"silver\">Ezüst<\/option>";
		hirfolyam += "					<option value=\"red\">Piros<\/option>";
		hirfolyam += "					<option value=\"blue\">Kék<\/option>";
		hirfolyam += "					<option value=\"teal\">Pávakék<\/option>";
		hirfolyam += "				<\/select>";
		hirfolyam += "<a title=\"Betűszín\" href=\"javascript: AddBB('news_input', 'color')\"><img src=\"\/styles\/dark\/hsz_bb_szin.gif\" class=\"bb_link\"><\/a>";
		hirfolyam += "<a title=\"Smile beszúrása\" href=\"wiki.php?action=read&amp;id=403\" target=\"_blank\"><img src=\"\/styles\/dark\/hsz_bb_smilie.gif\" class=\"bb_link\"><\/a>";
		hirfolyam += "<a title=\"Kép beszúrása\" href=\"javascript: AddBB('news_input', 'picture')\"><img src=\"\/styles\/dark\/hsz_bb_kep.gif\" class=\"bb_link\"><\/a>";
		hirfolyam += "<a title=\"Nagyméretű kép beszúrása\" href=\"javascript: AddBB('news_input', 'imgw')\"><img src=\"\/styles\/dark\/hsz_bb_imgw.gif\" class=\"bb_link\"><\/a>";
		hirfolyam += "<a title=\"Link beszúrása\" href=\"javascript: AddBB('news_input', 'url')\"><img src=\"\/styles\/dark\/hsz_bb_link.gif\" class=\"bb_link\"><\/a>";
		hirfolyam += "<a title=\"Spoiler, rejtett szöveg beszúrása\" href=\"javascript: AddBB('news_input', 'spoiler')\"><img src=\"\/styles\/dark\/hsz_bb_spoiler.gif\" class=\"bb_link\"><\/a>";
		hirfolyam += "<a title=\"Felsorolás\" href=\"javascript: AddBB('news_input', 'list')\"><img src=\"\/styles\/dark\/hsz_bb_felsorolas.gif\" class=\"bb_link\"><\/a>";
		hirfolyam += "<a title=\"Idézet\" href=\"javascript: AddBB('news_input', 'quote')\"><img src=\"\/styles\/dark\/hsz_bb_idezet.gif\" class=\"bb_link\"><\/a>";
		hirfolyam += "<a title=\"Kérdés\" href=\"wiki.php?action=read&amp;id=393\" target=\"_blank\"><img src=\"\/styles\/dark\/hsz_bb_kerdes.gif\" class=\"bb_link\"><\/a>";
		hirfolyam += "<br / > <small>Ha a gombra kattintáskor bezáródik a szövegmező nyomj egy 'szóköz'-t a szövegmezőben, utána menni fog.<br /> Ha kérdésed van akkor keress meg <a href='/profile.php?id=335967'>[ITT]</a></small>";
		hirfolyam += " vagy <a onclick=\"profile_pm('335967', 'normal');\" href=\"javascript:void(0);\">[Üzenet]<\/a>";
		hirfolyam += "		<table>";
		hirfolyam += "		<tbody>";
		hirfolyam += "		<tr>";
		hirfolyam += "		<td><textarea class=\"beviteliMezo_news\" name=\"news_input\" id=\"news_input\" onblur=\"if (this.value=='') {document.getElementById('add_news').style.display='none'; document.getElementById('add_news_close').style.display='block';}\" onkeyup=\"autoresize(this);limitText('news_input','countdown',500);\" onkeydown=\"limitText('news_input','countdown',500);\" rows=\"2\"><\/textarea><\/td>";
		hirfolyam += "		<td><img id=\"news_input_img\" class=\"g_mehet clickable\" src=\"styles\/div_link.gif\" alt=\"Mehet\" onclick=\"send_news();\"><\/td>";
		hirfolyam += "		<\/tr>";
		hirfolyam += "		<tr>";
		hirfolyam += "		<td class=\"back_counter\" colspan=\"2\"><span class=\"comment\">Még <span id=\"countdown\">500<\/span> karakter írható.<\/span><\/td>";
		hirfolyam += "		<\/tr>";
		hirfolyam += "		<\/tbody><\/table>";
		$("#add_news table").html(hirfolyam);
		$("#news_input").html(" ");
		var news = document.getElementsByClassName("open_news_comm");
		for(var i = 0; i < news.length; i++) {
			var id = document.getElementsByClassName("open_news_comm")[i].id.replace("add_news_",""); 
			var hfbb="";
			hfbb += "<a title=\"Vastag betű\" href=\"javascript: AddBB('news_input_"+id+"', 'bold')\"><img src=\"\/styles\/dark\/hsz_bb_vastag.gif\" class=\"bb_link\"><\/a>";
			hfbb += "<a title=\"Dőlt betű\" href=\"javascript: AddBB('news_input_"+id+"', 'italic')\"><img src=\"\/styles\/dark\/hsz_bb_dolt.gif\" class=\"bb_link\"><\/a>";
			hfbb += "<a title=\"Aláhúzott betű\" href=\"javascript: AddBB('news_input_"+id+"', 'underline')\"><img src=\"\/styles\/dark\/hsz_bb_alahuzott.gif\" class=\"bb_link\"><\/a>";
			hfbb += "<a title=\"Smile beszúrása\" href=\"wiki.php?action=read&amp;id=403\" target=\"_blank\"><img src=\"\/styles\/dark\/hsz_bb_smilie.gif\" class=\"bb_link\"><\/a>";
			hfbb += "<a title=\"Kép beszúrása\" href=\"javascript: AddBB('news_input_"+id+"', 'picture')\"><img src=\"\/styles\/dark\/hsz_bb_kep.gif\" class=\"bb_link\"><\/a>";
			hfbb += "<a title=\"Nagyméretű kép beszúrása\" href=\"javascript: AddBB('news_input_"+id+"', 'imgw')\"><img src=\"\/styles\/dark\/hsz_bb_imgw.gif\" class=\"bb_link\"><\/a>";
			hfbb += "<a title=\"Link beszúrása\" href=\"javascript: AddBB('news_input_"+id+"', 'url')\"><img src=\"\/styles\/dark\/hsz_bb_link.gif\" class=\"bb_link\"><\/a>";
			hfbb += "<a title=\"Spoiler, rejtett szöveg beszúrása\" href=\"javascript: AddBB('news_input_"+id+"', 'spoiler')\"><img src=\"\/styles\/dark\/hsz_bb_spoiler.gif\" class=\"bb_link\"><\/a>";
			hfbb += "<a title=\"Felsorolás\" href=\"javascript: AddBB('news_input_"+id+"', 'list')\"><img src=\"\/styles\/dark\/hsz_bb_felsorolas.gif\" class=\"bb_link\"><\/a>";
			hfbb += "<a title=\"Idézet\" href=\"javascript: AddBB('news_input_"+id+"', 'quote')\"><img src=\"\/styles\/dark\/hsz_bb_idezet.gif\" class=\"bb_link\"><\/a>";
			hfbb += "<a title=\"Kérdés\" href=\"wiki.php?action=read&amp;id=393\" target=\"_blank\"><img src=\"\/styles\/dark\/hsz_bb_kerdes.gif\" class=\"bb_link\"><\/a>";
			hfbb += "<a title=\"Betűméret\" href=\"javascript: AddBB('news_input_"+id+"', 'size')\"><img src=\"\/styles\/dark\/hsz_bb_meret.gif\" class=\"bb_link\"><\/a>";
				hfbb += "<select size=\"1\" name=\"size\" id=\"sizes\">";
				hfbb += "					<option value=\"8pt\">8<\/option>";
				hfbb += "					<option value=\"9pt\">9<\/option>";
				hfbb += "					<option value=\"10pt\" selected=\"selected\">10<\/option>";
				hfbb += "					<option value=\"12pt\">12<\/option>";
				hfbb += "					<option value=\"14pt\">14<\/option>";
				hfbb += "					<option value=\"16pt\">16<\/option>";
				hfbb += "					<option value=\"18pt\">18<\/option>";
				hfbb += "					<option value=\"20pt\">20<\/option>";
				hfbb += "					<option value=\"22pt\">22<\/option>";
				hfbb += "					<option value=\"24pt\">24<\/option>";
				hfbb += "					<option value=\"30pt\">30<\/option>";
				hfbb += "					<option value=\"36pt\">36<\/option>";
				hfbb += "					<option value=\"48pt\">48<\/option>";
				hfbb += "					<option value=\"72pt\">72<\/option>";
				hfbb += "				<\/select>";
				hfbb += "<a title=\"Betűszín\" href=\"javascript: AddBB('news_input_"+id+"', 'color')\"><img src=\"\/styles\/dark\/hsz_bb_szin.gif\" class=\"bb_link\"><\/a>";
				hfbb += "<select size=\"1\" name=\"color\" id=\"colors\">";
				hfbb += "					<option value=\"black\" selected=\"selected\">Fekete<\/option>";
				hfbb += "					<option value=\"white\">Fehér<\/option>";
				hfbb += "					<option value=\"green\">Zöld<\/option>";
				hfbb += "					<option value=\"maroon\">Gesztenyebarna<\/option>";
				hfbb += "					<option value=\"olive\">Olivazöld<\/option>";
				hfbb += "					<option value=\"navy\">Mélykék<\/option>";
				hfbb += "					<option value=\"purple\">Lila<\/option>";
				hfbb += "					<option value=\"gray\">Szürke<\/option>";
				hfbb += "					<option value=\"yellow\">Sárga<\/option>";
				hfbb += "					<option value=\"lime\">Lime<\/option>";
				hfbb += "					<option value=\"aqua\">Cián<\/option>";
				hfbb += "					<option value=\"fuchsia\">Ciklámen<\/option>";
				hfbb += "					<option value=\"silver\">Ezüst<\/option>";
				hfbb += "					<option value=\"red\">Piros<\/option>";
				hfbb += "					<option value=\"blue\">Kék<\/option>";
				hfbb += "					<option value=\"teal\">Pávakék<\/option>";
				hfbb += "				<\/select>";
		//BBkód panel beszúrása a bevitelimező felé		
		var hf = document.getElementById('add_news_'+id);
		hf.innerHTML = hfbb + hf.innerHTML;
		$('#news_input_'+id).html(" ");
			}	