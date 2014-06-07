// ==UserScript==
// @name           Ninova Fix
// @namespace      ninova.itu.edu.tr
// @include        http://*.ninova.itu.edu.tr/kampus*
// @include        http://ninova.itu.edu.tr/kampus*
// @include        http://*.ninova.itu.edu.tr/Kampus*
// @include        http://ninova.itu.edu.tr/Kampus*
// @include        http://ninova.itu.edu.tr/tr/
// @include        http://ninova.itu.edu.tr/Sinif/*
// @include        http://*.ninova.itu.edu.tr/Sinif/*
// @include        http://ninova.itu.edu.tr/sinif/*
// @include        http://*.ninova.itu.edu.tr/sinif/*
// ==/UserScript==
if(document.URL=="http://ninova.itu.edu.tr/tr/")
{
	window.location="http://ninova.itu.edu.tr/kampus";

}
else {
    // hide top panel
    document.getElementsByClassName('tepe').item(0).style.display = 'none';
   
    if (document.URL.indexOf('ampus') > -1) {
        for (i = 0; i < document.getElementsByTagName("script").length; i++) {
            var x = document.getElementsByTagName("script").item(i).innerHTML;

            if (x.indexOf("<span style=\"font-weight:bold;\">", 0) > 9 && x.indexOf("strong", 0) == -1) {
                var basneedle = "<span style=\"font-weight:bold;\">";
                var baslangic = x.indexOf(basneedle, 0) + basneedle.length;
                var bitis = x.indexOf("</", 0);
                var dersIsmi = x.substring(baslangic, bitis);

                var basneedle2 = "getElementById('";
                var baslangic2 = x.indexOf(basneedle2, 0) + basneedle2.length;
                var bitis2 = x.indexOf("');", 0);
                var spanId = x.substring(baslangic2, bitis2);

                if (dersIsmi.length > 24)
                    dersIsmi = dersIsmi.substr(0, 24) + "..";

                document.getElementById(spanId).innerHTML = "<strong>" + dersIsmi + "</strong>";

            }
        }
    }

    var y=document.getElementsByTagName("div");
	for(i=0;i<y.length;i++)
	{
	

		if(y.item(i).className=="orta")
			y.item(i).style.width="80%";
	
			
		if(y.item(i).className=="sag")
			y.item(i).style.display="none";

		if(y.item(i).className=="yol")
		    y.item(i).innerHTML += " <span style=\"float:right;padding:10px;padding-right:20px;padding-bottom:5px;margin-top:-9px\">Fixed by <a href=\"http://userscripts.org/scripts/show/66149\">Ninova Fix</a> | <a href='/Cikis' class='oturumAc'>Oturumu Kapat</a></span>";
	}

	document.getElementById("ctl00_pnlHeader").innerHTML="";

}