// ==UserScript==
// @name OGame Redesign : Check debris fields
// @namespace http://userscripts.org/users/36331
// @description OGame : Check debris fields
// @date 2010-04-17
// @creator Black Cat
// @include http://*.ogame.*/game/index.php?page=galaxy*
// @exclude
// ==/UserScript==

(function(){
	
	var str1 = ", debris fields at positions: ";
	var str2 = "Check debris fields";
	
	var hostname = window.location.hostname;

	var isActive = true;
	var ex_debris = "-";
	
	function reload() {
		isActive = true;
		setTimeout("canLoadContent(galaxy, system, time)",0);
	}
	
	function popup() {
		var win = window.open('',hostname+".check_debris",'location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=no,height=100,width=600');
		return win;
	}

	var $;
	try { $ = unsafeWindow.$; }
	catch(e) { $ = window.$; }
	$("#galaxyContent").ajaxSuccess(function(e,xhr,settings){
		if (settings.url.indexOf("page=galaxyContent") == -1) return;

		var table = document.getElementById("galaxyContent").getElementsByTagName("table")[0];
		if (isActive) {
			isActive = false;
			var debris = "";
			var rows = table.getElementsByTagName("tr");
			for (var i = 0; i < rows.length; i++) {
				if (rows[i].className == "row") {
					var cells = rows[i].getElementsByTagName("td");
					for (var j = 0; j < cells.length; j++) {
						if (cells[j].className == "debris") {
							var spans = cells[j].getElementsByTagName("span");
							var pos;
							var k = 0;
							do {
								pos = spans[k];
								k++;
							}while(pos && pos.id != "pos-debris");
							var lis = cells[j].getElementsByTagName("li");
							var li;
							k = 0;
							do {
								li = lis[k];
								k++;
							}while(li && li.className != "debris-recyclers");
							if (pos && li) {
								var nb_rec = li.innerHTML.replace(/\D/g, "");
								debris += (debris==""?"":"; ") + pos.innerHTML + " (" + nb_rec + ")";
							}
						}
					}
				}
			}
			
			if (debris != ex_debris) {
				var time = document.getElementById("OGameClock").innerHTML;
				var win = popup();
				win.document.write(time + str1 + debris + '<br />');
				ex_debris = debris;
			}
			
			setTimeout(reload, (2+3*Math.random())*1000);
			
		} else {

			var cell = document.getElementById("galaxyheadbg2").getElementsByTagName("th")[3];
			cell.title = str2;
			cell.style.cursor = "pointer";
			cell.addEventListener("click",reload,false);
			cell.addEventListener("click",popup,false);
		}
	});
})();