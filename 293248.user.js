// ==UserScript==
// @name        DripTidoudoux
// @namespace   DripTidoudoux
// @include     https://dripstat.com/game/
// @version     1.03
// @grant       none
// ==/UserScript==
function Start_DripTidoudoux(){
        if($("#DripTidoudoux_bar").length!=0)
        {
                alert("Drip Tidoudoux "+version+"\n\nDrip Tidoudoux est déjà chargé!");
                return false
        }
        else
        {
                $("body").append('<div id="DripTidoudoux_bar" style="z-index:1000; position:absolute; bottom:0px; left:20px; width:95%; height:70px; border-top:1px solid black; cursor:default;'+"text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;"+"background: rgb(69,72,77); /* Old browsers */"+"background: -moz-linear-gradient(top,  rgba(69,72,77,1) 0%, rgba(0,0,0,1) 100%); /* FF3.6+ */"+"background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(69,72,77,1)), color-stop(100%,rgba(0,0,0,1))); /* Chrome,Safari4+ */"+"background: -webkit-linear-gradient(top,  rgba(69,72,77,1) 0%,rgba(0,0,0,1) 100%); /* Chrome10+,Safari5.1+ */"+"background: -o-linear-gradient(top,  rgba(69,72,77,1) 0%,rgba(0,0,0,1) 100%); /* Opera 11.10+ */"+"background: -ms-linear-gradient(top,  rgba(69,72,77,1) 0%,rgba(0,0,0,1) 100%); /* IE10+ */"+"background: linear-gradient(to bottom,  rgba(69,72,77,1) 0%,rgba(0,0,0,1) 100%); /* W3C */"+"filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#45484d', endColorstr='#000000',GradientType=0 ); /* IE6-9 */"+'"></div>');
                $("body").append('<div id="DripTidoudoux_bouton" style="z-index:999; position:absolute; bottom:0px; left:0px; width:100%; height:70px; border-top:1px solid black; cursor:default;color:#FFFFAA; line-height: 17px;'+"text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;"+"background: rgb(69,72,77); /* Old browsers */"+"background: -moz-linear-gradient(top,  rgba(69,72,77,1) 0%, rgba(0,0,0,1) 100%); /* FF3.6+ */"+"background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(69,72,77,1)), color-stop(100%,rgba(0,0,0,1))); /* Chrome,Safari4+ */"+"background: -webkit-linear-gradient(top,  rgba(69,72,77,1) 0%,rgba(0,0,0,1) 100%); /* Chrome10+,Safari5.1+ */"+"background: -o-linear-gradient(top,  rgba(69,72,77,1) 0%,rgba(0,0,0,1) 100%); /* Opera 11.10+ */"+"background: -ms-linear-gradient(top,  rgba(69,72,77,1) 0%,rgba(0,0,0,1) 100%); /* IE10+ */"+"background: linear-gradient(to bottom,  rgba(69,72,77,1) 0%,rgba(0,0,0,1) 100%); /* W3C */"+"filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#45484d', endColorstr='#000000',GradientType=0 ); /* IE6-9 */"+'" onclick="autoClic()">A<br>u<br>t<br>o</div>');
        }
        Make_Table();
        Tid_Loop();
}

var version="v.1.02";
var autoAchat = false;
Start_DripTidoudoux();
function Make_Table()
{
	var e='<th align=left width=130 style="font-size:10px;color:#FFFF00;"> '+version+"</th>";
	var t="";
	var n="";
	var r="";
	var i="";
	localStats.powerUps.forEach(function(t,s)
	{
		e+='<td align=middle id="DripTidoudoux_item_'+s+'" style="font-weight:bold;font-size:10px;color:#FFFFAA">' + t.name + '</td>';
		n+='<td align=middle id="DripTidoudoux_gain_'+s+'" style="font-size:10px;color:#FFFFAA"></td>';
		r+='<td align=middle id="DripTidoudoux_cpb_'+s+'" style="font-size:10px"></td>';
		i+='<td align=middle id="DripTidoudoux_tr_'+s+'" style="font-size:10px;color:#FFFFAA"></td>'
	});
	e+='<td align=middle id="DripTidoudoux_item_best" style="font-weight:bold;font-size:10px;color:#FFFFAA">' + t.name + '</td>';
	n+='<td align=middle id="DripTidoudoux_gain_best" style="font-size:10px;color:#FFFFAA"></td>';
	r+='<td align=middle id="DripTidoudoux_cpb_best" style="font-size:10px"></td>';
	i+='<td align=middle id="DripTidoudoux_tr_best" style="font-size:10px;color:#FFFFAA"></td>';
	$("#DripTidoudoux_bar").html(""+'<table style="width:100%; table-layout:fixed; margin-top:2px;">'+"<tr>"+e+"</tr>"+'<tr><th align=right style="font-size:10px;color:#4bb8f0;">Gain</th>'+n+"</tr>"+'<tr><th align=right style="font-size:10px;color:#4bb8f0;">Coût par Bit</th>'+r+"</tr>"+'<tr><th align=right style="font-size:10px;color:#4bb8f0;">Temps restant</th>'+i+"</tr>"+"</table>")
}
function Update_Table()
{
    var cpbMax = -1;
    var cpbMin = -1;
	localStats.powerUps.forEach(function(t,s)
    {
        var cpb = t.curPrice / t.currentBps;
        if (cpbMax == -1)
            cpbMax = cpb;
        else
            cpbMax = Math.max(cpbMax,cpb);
        if (cpbMin == -1)
            cpbMin = cpb;
        else
            cpbMin = Math.min(cpbMin,cpb);
    });
	localStats.powerUps.forEach(function(t,s)
    {
		var curBps = t.currentBps;
        var temps = "Jamais";
		if(s==0)
		{
			curBps = t.baseBps;
			t.purchasedUpgrades.forEach(function(t,s)
			{
				curBps = curBps * 1.1;
			});
			curBps = Math.round(curBps*100)/100;
		}
		// on teste les upgrades disponibles
		t.upgrades.forEach(function(obj,num)
		{
			if(obj.available)
				if((obj.price/(t.count * 0.1 * curBps)) < cpbMin)
				{
					$("#DripTidoudoux_item_best").html(obj.name);
					$("#DripTidoudoux_gain_best").html(Math.round(t.count * 0.1 * curBps * 100) / 100);
					$("#DripTidoudoux_cpb_best").html('<span style="color:#00FF00;">' + Math.round(obj.price/(t.count * 0.1 * curBps)) + '</span>');
					if(localStats.memoryCapacity > obj.price)
					{
						if(localStats.byteCount > obj.price)
							temps = "Pret";
						else
							if(localStats.bps > 0)
							{
								var nbSecondes = (obj.price - localStats.byteCount) / localStats.bps;
								temps = formatTime(nbSecondes);
							}
							else
								temps ="Jamais";
						
					}
					$("#DripTidoudoux_tr_best").html(temps);
					cpbMin = obj.price/(t.count * 0.1 * curBps);
				}
		});
		var cpb = t.curPrice / curBps;
        if(localStats.memoryCapacity > t.curPrice)
        {
            if(localStats.byteCount > t.curPrice)
                temps = "Pret";
            else
                if(localStats.bps > 0)
                {
                    var nbSecondes = (t.curPrice - localStats.byteCount) / localStats.bps;
                    temps = formatTime(nbSecondes);
                }
                else
                    temps ="Jamais";
            
        }
        $("#DripTidoudoux_item_"+s).html(t.name);
		$("#DripTidoudoux_gain_"+s).html(curBps);
        if (cpb == cpbMin)
		{
			// On est dans l'item le moins cher. On doit mettre à jour l'objet le moins cher.
			$("#DripTidoudoux_item_best").html(t.name);
			$("#DripTidoudoux_gain_best").html(curBps);
			$("#DripTidoudoux_cpb_best").html('<span style="color:#00FF00;">' + Math.round(cpb) + '</span>');
			$("#DripTidoudoux_tr_best").html(temps);
            $("#DripTidoudoux_cpb_"+s).html('<span style="color:#00FF00;">' + Math.round(cpb) + '</span>');
		}
        else if (cpb == cpbMax)
            $("#DripTidoudoux_cpb_"+s).html('<span style="color:#FF0000;">' + Math.round(cpb) + '</span>');
        else
            $("#DripTidoudoux_cpb_"+s).html('<span style="color:#FFFF00;">' + Math.round(cpb) + '</span>');
        $("#DripTidoudoux_tr_"+s).html(temps);
    });
}
function Tid_Loop()
{
	//autoClic();
    Update_Table();
    setTimeout(function(){
		Tid_Loop()},1000)

}
function formatTime(e,t)
{
	e=Math.round(e);
	if(e==Infinity)
	{
		return"Jamais"
	}
	if(e==0)
	{
		return"Pret"
	}
	if(e/86400>1e3)
	{
		return"> 1,000 Jours"
	}
	var n=parseInt(e/86400)%999;
	var r=parseInt(e/3600)%24;
	var i=parseInt(e/60)%60;
	var s=e%60;
	var o=new Array(" jours, "," heures, "," minutes, "," secondes");
	if(t!="min")
	{
		if(n==1)
		{
			o[0]=" jour, "
		}
		if(r==1)
		{
			o[1]=" heure, "
		}
		if(i==1)
		{
			o[2]=" minute, "
		}
		if(s==1)
		{
			o[3]=" seconde"
		}
	}
	else
	{
		o=new Array("j, ","h, ","m, ","s")
	}
	var u="";
	if(n>0)
	{
		u=u+n+o[0]
	}
	if(n>0||r>0)
	{
		u=u+r+o[1]
	}
	if(n>0||r>0||i>0)
	{
		u=u+i+o[2]
	}
	if(n>0||r>0||i>0||s>0)
	{
		u=u+s+o[3]
	}
	return u
}

function autoClic()
{	
	autoAchat = !autoAchat;
	if(autoAchat)
		$("#DripTidoudoux_bouton").html('<span style="color:#00FF00;">A<br>u<br>t<br>o</span>');
	else
		$("#DripTidoudoux_bouton").html('<span style="color:#FFFFAA;">A<br>u<br>t<br>o</span>');
}

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 65) { // A
		autoClic();
	}
/*     else if(event.keyCode == 66) { // B
		obj.buy();
	}
    else if(event.keyCode == 67) { // c
		Game.ClickCookie();
	}
    else if(event.keyCode == 80) { // P
		preserve_golden = !preserve_golden;
	}
    else if(event.keyCode == 71) { // G
		autogolden = !autogolden;
	}
    else if(event.keyCode == 87) { // W
		autowrinkler = !autowrinkler;
	}
    else if(event.keyCode == 88) { // W
		autoseason = !autoseason;
	}
 */});