// ==UserScript==
// @name           Gladiatus-ShopExport
// @namespace      http://www.puli.sk
// @include        http://*.gladiatus.org/game/index.php?mod=inventory*
// ==/UserScript==
var alltds = document.getElementsByTagName("div");
for (var i=0; i<alltds.length; i++) {
	if (alltds[i].id == "submenufooter") {
		var mytd = alltds[i];
		/* if you want more than one button, copy the code from here */
		var button = document.createElement("a");
			button.setAttribute("href", "#");
			button.setAttribute("class", "submenuitem");
			button.innerHTML = "Exportuj obchod";
			button.addEventListener("click", function () {
var variable = unsafeWindow.aElts;
var win = window.open(null, "_blank");
firstTime = true;
for(i in variable) {
   tooltipContent = variable[i].tooltip;
   if(tooltipContent == null || tooltipContent.indexOf("alt='Rubíny'") >= 0)continue;
   if(firstTime) {
      shopPrefix = variable[i].id.substring(0, variable[i].id.indexOf('_'));
      firstTime = false;
      }
   if(shopPrefix != variable[i].id.substring(0, variable[i].id.indexOf('_')))continue;
   startPos = tooltipContent.indexOf("nowrap='nowrap'>");
   descStart = true;
   if(startPos ==- 1)continue;
   while(startPos >= 0) {
      startPos += 16;
      tooltipContent = tooltipContent.substring(startPos);
      if(tooltipContent.indexOf('Rada:') == 0)break;
      if(tooltipContent.indexOf('Úrove') == 0) {
         descStart = false;
         startPos = tooltipContent.indexOf("nowrap='nowrap'>");
         continue;
         };
      endPos = tooltipContent.indexOf('<');
      if(descStart)win.document.write(tooltipContent.substring(0, endPos));
      else win.document.write(';' + tooltipContent.substring(0, endPos));
      descStart = false;
      startPos = tooltipContent.indexOf("nowrap='nowrap'>");
      }
   win.document.write(',<br>');
   }
win.document.close();
}
    , false);
		mytd.parentNode.insertBefore(button,mytd);
	}
}