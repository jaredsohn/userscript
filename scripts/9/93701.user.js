// ==UserScript==
// @name           OGame Redesign: Cargo
// @namespace      userscripts.org
// @description    Set transport value from spy report on fleet1 page 
// @version        0.6.2
// @include        http://*.ogame.*/game/index.php?page=fleet1*
// @include        http://*.ogame.*/game/index.php?page=showmessage*
// @include        http://*.ogame.*/game/index.php?page=messages*
// ==/UserScript==

(function() 
{
	var icon_angriff   = 'data:image/gif;base64,R0lGODlhEQARAPf/AMNRPb1RP/5uVqJHN5hCNJdAMs9YRMpUP8lVQbdOO3c1JplCM7hUQXQxJemCb/3//8dXQshWQshWQcdVQZlBM7hPPblUQZlBMvri3v7///qgkL5WQdGAcaVHNvPPx/qVf/tmS79TP/6FbvHk4PfW1PppUdBZRfxpUIU0JqtDMv7a09VeSshoVYg8LfdqTIs2J/yEb89iUKhENP7k4chXQapGM79NOXgzKKtEMqZIOPiqm8ZaRphBM5M/MNhjTvbk3+pwWsxYQMNTQW4mG/7t68JTP+m8tMt0ZZI4KNxoU/339/mYhd6Je82Jfp1NPe1uVuOEddFbSMVUQcdWQvlsUeWLe7BGMuakl8ZYRb9mVfz+/sFRPapMO/yKcu7a1uzb2PyEbc5dTLZFMdV8bv/9+qtFNPuXgZpCM7VHM+VWPvzSyfzSy7xPO8NUQMZPO300KKlFMvnx761LOqdLOcdSPnQrHfrx79FsWatKN55ENZI9MftnSthiTXgzJb5SP/HIwsxSPqlHOeaBbv1pTchbR7tKOf2Whvnp5OV4ZeJ9af2BaLZTQcx3a/3Vz+Kso8xUQeuqoI09MM55bbhTQPSDbqxEL93Hwd3KyOfTz+7Uz/qSf9RqVvyQe/Xt6tFYQ+/h3dFeR7d/d/pkR/349cpXQ9FdSP3g29y5tKRIN3MxJnUwI8ZsXNRjTuZZRM5VPut4ZuzOyeemnMVaRs2xrcZYR71rWe29tOfFvPz///XPx/r3969HN/2GcadXSpVDNb1JNd5cSMBQRPubhr1PPctbSPza0chOOK5gU7RNPNl7bf39+6lxZ6lHNtNgS/qUgf3EuplPQc5bRbREMtixquFVPuSNfflmSoY2KvXY1II4LIU5LYs1KMNWQ91qUcZMOahTRf3NxPHQytFbR/jY0/nw7rtQPbVPOu+AbJVBMs1jUMZRPLhUQnApHf7//ppCNP38/NJrWvvx76pIN/ZoUp1GNbVRPcdbR9JkULtRP7pQPrlOPNVdScFpV3oyJv///wAAACH5BAEAAP8ALAAAAAARABEAAAj/AP9BQBABAo0JB0gdQCAhwpQpE/4FM5cvwBZvxGIESRfGGAA/AfAJkYCsiDpPVzqNa5UrDqQVgNqUM2EgAYBoHvytcbaHEzh/2HzQGbZPXAI3ttotAQFDAJgTmsj8ccWGTyk0Yx7osFZsxiAVpqhoyMDkVxJQYoyMmvcMlzBRZt6pcUEknI1uG5glc1DiQxdFjXiJMCSAEpQKzdb1O5ZFSiIgr36ce+IgCota2WRZGDKr065bugSlQUQuU6FPl1QRYsBumb8mtA5hoEYi3j0O/kLVscegwTVLSo6YqAasCit4djDp6bNjUgMU0L74c3Tn0aZYykb02qYAy6JU2l44TJmmxYs0WA9OfUPS4ga3egooDJBRiZ8kfYxWWamRI0+2EFy8wcMAHcgDRwpy4FAGHoGgQk8kc/zjCw8LVEjBGQu4s8AFBaDTAwH/BAQAOw==';

	function CalcPlunder(container) {
		var oTab = document.getElementById(container).getElementsByClassName("material spy");
		for (var i=0; i<oTab.length; i++) {
            var resources = oTab[i].getElementsByClassName("item");
            var metal = parseInt(resources[0].nextElementSibling.textContent.replace(/\D/g, ''),10);
            var crystal = parseInt(resources[1].nextElementSibling.textContent.replace(/\D/g, ''),10);
            var deuterium = parseInt(resources[2].nextElementSibling.textContent.replace(/\D/g, ''),10);
            plunder_metal =  Math.ceil(metal / 2);
            plunder_crystal = Math.ceil(crystal / 2);
            plunder_deuterium = Math.ceil(deuterium / 2);
            var total = metal + crystal + deuterium;

            var capacity_needed =
                Math.max(	plunder_metal + plunder_crystal + plunder_deuterium,
                            Math.min(	(2 * plunder_metal + plunder_crystal + plunder_deuterium) * 3 / 4,
                                        (2 * plunder_metal + plunder_deuterium)
                                    )
                        );
            var small_cargos = Math.ceil(capacity_needed/5000);
            var large_cargos = Math.ceil(capacity_needed/25000);
            oTab[i].parentNode.getElementsByClassName("defense textCenter textBeefy")[0].innerHTML += " Capacity needed : "+Math.ceil(capacity_needed).toString();
            oTab[i].parentNode.getElementsByClassName("buttonSave")[0].href += '&sc='+small_cargos+'&lc='+large_cargos+'&c_n='+Math.ceil(capacity_needed).toString();
        }
    }

    try {
        if (document.location.href.indexOf('page=showmessage') > -1) 
        {
            CalcPlunder("messagebox");
        }
        if ( document.location.href.indexOf('page=messages') > -1 ) 
        {
            var $;
            try { $ = unsafeWindow.$; }
            catch(e) { $ = window.$; }
            $(".mailWrapper").ajaxSuccess(function(e,xhr,settings){
                if (settings.url.indexOf("page=messages") == -1) return;
                if (settings.data.indexOf("displayPage") == -1) return;
                CalcPlunder("messageContent");
            });
        }

        if (document.location.href.indexOf('page=fleet1') > -1) 
        {
            var sc = document.location.href.match(/&sc=\d+/).toString();
            var lc = document.location.href.match(/&lc=\d+/).toString();
            var cn = document.location.href.match(/&c_n=\d+/).toString().match(/\d+/);
            var cargos = [sc.match(/\d+/), lc.match(/\d+/)];
            var nameMT = document.getElementById('button202').getElementsByClassName('textlabel')[0].textContent;
            var nameBT = document.getElementById('button203').getElementsByClassName('textlabel')[0].textContent;
            var eckeMT = parseInt(document.getElementById('button202').getElementsByClassName('textlabel')[0].nextSibling.textContent.replace(/\D/g, ''),10);
            var eckeBT = parseInt(document.getElementById('button203').getElementsByClassName('textlabel')[0].nextSibling.textContent.replace(/\D/g, ''),10);
            var sMT = "cursor:pointer;";
            var sBT = "cursor:pointer;";
            if(parseInt(cargos[0].toString(),10) <= eckeMT) sMT += "border:  thin solid red;";
            if(parseInt(cargos[1].toString(),10) <= eckeBT) sBT += "border:  thin solid red;";
            var atackfleet = document.createElement('div');
            atackfleet.id = 'atackfleet';
            atackfleet.innerHTML =  '<table cellspacing="5px" style="position: relative; left: 12px; top: 0px"><tr align="right">'+
                                    '<td><img src="'+icon_angriff+'" id="sendatack"></td>'+
                                    '<td><BUTTON TYPE="SUBMIT" ONCLICK="alert(0); return false;"  id="cbut" style="'+sMT+'">'+nameMT+":"+cargos[0].toString()+'</BUTTON></td>'+
                                    '<td><BUTTON TYPE="SUBMIT" ONCLICK="alert(0); return false;"  id="cbut1" style="'+sBT+'">'+nameBT+":"+cargos[1].toString()+'</BUTTON></td>'+
                                    '<td> ( '+cn+' )</td></tr></table>';
            var p = document.getElementById('buttonz');
            var b = document.getElementById('allornone');
            p.insertBefore(atackfleet,b);
            var expscript = document.createElement('script');
            expscript.innerHTML = '\n'+
                "document.getElementById('cbut').onclick=function(){\n"+
                    "document.getElementById('ship_202').value ="+cargos[0]+";\n"+
                    "document.getElementById('ship_202').onchange();};\n";
            document.getElementById('cbut').appendChild(expscript);
            var expscript = document.createElement('script');
            expscript.innerHTML = '\n'+
                "document.getElementById('cbut1').onclick=function(){\n"+
                    "document.getElementById('ship_203').value ="+cargos[1]+";\n"+
                    "document.getElementById('ship_203').onchange();};\n";
            document.getElementById('cbut1').appendChild(expscript);
        }
	}
	catch (e) {}
    
}) ()

