// ==UserScript==
// @name        Nazwy wiosek
// @namespace   http://shoxteam.net
// @description Pozwala zapisac nazwy wiosek, a nastepnie je przywrocic
// @include     *.plemiona.pl/game.php?*mode=combined*
// @grant       unsafeWindow
// @version     1.0.2
// ==/UserScript==

function GM_wait() {	

  if (typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(GM_wait, 100);
  } else {
    $ = unsafeWindow.jQuery;
    letsJQuery();
  }

}
function letsJQuery()
{
  if (typeof unsafeWindow == 'undefined') {
    unsafeWindow = window;
  }
	$(document).ready(function()
	{
		function toggleVillageNamesTextbox() {
			if($('#villagenames_txt').css("display") == "none")
				$('#villagenames_txt').css("display", "block")
			else
				$('#villagenames_txt').css("display", "none")
		}
		function readVillageNames() {
			$('#villagenames_txt').val("");
			$("#combined_table > tbody > tr.nowrap").each(function(){
				var bs   = $(this).find("td").eq(1).children().eq(1).children().eq(0).attr("id");
				var name = $(this).find("td").eq(1).children().eq(1).children().eq(0).val();
				var id = bs.substr(bs.lastIndexOf("_") + 1);
				if($('#villagenames_txt').val()=="")
					$('#villagenames_txt').val(id + "/_1337_/" + name)
				else
					$('#villagenames_txt').val($('#villagenames_txt').val() + "\n" + id + "/_1337_/" + name)
			});
		}
		function writeVillageNames() {
			if($('#villagenames_txt').val().split(/\r\n|\r|\n/).length == 1 && $('#villagenames_txt').val() != "") //pojedyncza
			{
				$("#combined_table > tbody > tr.nowrap").each(function(){
					var hidden = $(this).find("td").eq(1).children().eq(1).children();
					$(hidden).eq(0).val($('#villagenames_txt').val());
					$(hidden).eq(1).click();
				});
			}
			else if($('#villagenames_txt').val().split(/\r\n|\r|\n/).length > 1) //wiele nazw
			{
				$("#combined_table > tbody > tr.nowrap").each(function(){
					var hidden = $(this).find("td").eq(1).children().eq(1).children();
					var bs = $(hidden).eq(0).attr("id");
					var id = bs.substr(bs.lastIndexOf("_") + 1);
					var lines = $('#villagenames_txt').val().split(/\r\n|\r|\n/);
					for(var i = 0; i < lines.length; i++)
					{
						if(lines[i].indexOf(id + "/_1337_/") > -1)
						{
							$(hidden).eq(0).val(lines[i].substring(id.length + 8));
							$(hidden).eq(1).click();
							break;
						}
					}
				});
			}
			else if($('#villagenames_txt').val() == "") alert("zapomniales wpisac nazw wiosek :p");
		}
		$("#paged_view_content").parent().parent().after('<textarea id="villagenames_txt" style="float:left;width:400px;height:250px;margin-left:12px;display:none"></textarea><input type="button" value="Ustaw" id="writevillagenames_btn" style="float:right"><input type="button" value="Zczytaj" id="readvillagenames_btn" style="float:right"><span id="togglevillagenamestextbox" style="float:right;">[wyswietl pole]&nbsp;</span><span style="float:right;">Nazwy wiosek: &nbsp;&nbsp;&nbsp;</span>');
		
		$('#togglevillagenamestextbox').click(toggleVillageNamesTextbox);
		$('#readvillagenames_btn').click(readVillageNames);
		$('#writevillagenames_btn').click(writeVillageNames);
  });
}

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}


GM_wait();