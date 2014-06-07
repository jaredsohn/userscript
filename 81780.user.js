// ==UserScript==
// @name           OGame : Omega Attaque Calculator
// @namespace      Affiche la valeur total des points d'attaques
// @description    Affiche la valeur total des points d'attaques
// @creator        Omega
// @version        2.65
// @require        http://sizzlemctwizzle.com/updater.php?id=81780&days=1
// @include        http://*.ogame.*/game/index.php?page=defense*
// @include        http://*.ogame.*/game/index.php?page=fleet1*
// @include        http://*.ogame.*/game/index.php?page=research*
// ==/UserScript==

function format(valeur,decimal,separateur) {
// formate un chiffre avec 'decimal' chiffres après la virgule et un separateur
	var deci=Math.round( Math.pow(10,decimal)*(Math.abs(valeur)-Math.floor(Math.abs(valeur)))) ;
	var val=Math.floor(Math.abs(valeur));
	if ((decimal==0)||(deci==Math.pow(10,decimal))) {val=Math.floor(Math.abs(valeur)); deci=0;}
	var val_format=val+"";
	var nb=val_format.length;
	for (var i=1;i<4;i++) {
		if (val>=Math.pow(10,(3*i))) {
			val_format=val_format.substring(0,nb-(3*i))+separateur+val_format.substring(nb-(3*i));
		}
	}
	if (decimal>0) {
		var decim="";
		for (var j=0;j<(decimal-deci.toString().length);j++) {decim+="0";}
		deci=decim+deci.toString();
		val_format=val_format+"."+deci;
	}
	if (parseFloat(valeur)<0) {val_format="-"+val_format;}
	return val_format;
}

if (document.location.href.indexOf("page=research") != -1)
{
	var attlvl;
	var get_attlvl = document.getElementById('details109').getElementsByClassName('level')[0].innerHTML;
	attlvl = get_attlvl.replace( /[^0-9-]/g, "");
	attlvl = parseInt(attlvl);
	GM_setValue('attaquelvl', attlvl);
}
if (document.location.href.indexOf("page=defense") != -1)
{
	var lm;
	var get_lm = document.getElementById('details401').getElementsByClassName('ecke')[0].innerHTML;
	lm = get_lm.replace( /[^0-9-]/g, "");
	lm = parseInt(lm);

	var lle;
	var get_lle = document.getElementById('details402').getElementsByClassName('ecke')[0].innerHTML;
	lle = get_lle.replace( /[^0-9-]/g, "");
	lle = parseInt(lle);

	var llo;
	var get_llo = document.getElementById('details403').getElementsByClassName('ecke')[0].innerHTML;
	llo = get_llo.replace( /[^0-9-]/g, "");
	llo = parseInt(llo);

	var gauss;
	var get_gauss = document.getElementById('details404').getElementsByClassName('ecke')[0].innerHTML;
	gauss = get_gauss.replace( /[^0-9-]/g, "");
	gauss = parseInt(gauss);

	var ion;
	var get_ion = document.getElementById('details405').getElementsByClassName('ecke')[0].innerHTML;
	ion = get_ion.replace( /[^0-9-]/g, "");
	ion = parseInt(ion);

	var plasma;
	var get_plasma = document.getElementById('details406').getElementsByClassName('ecke')[0].innerHTML;
	plasma = get_plasma.replace( /[^0-9-]/g, "");
	plasma = parseInt(plasma);
	
	var val_dlvl   = GM_getValue('attaquelvl', '0');
	var val_lm     = 80+(80)/10*val_dlvl;
	var val_lle    = 100+(100)/10*val_dlvl;
	var val_llo    = 250+(250)/10*val_dlvl;
	var val_gauss  = 1100+(1100)/10*val_dlvl;
	var val_ion    = 150+(150)/10*val_dlvl;
	var val_plasma = 3000+(3000)/10*val_dlvl;
	
	var pts_lm     = val_lm*lm;
	var pts_lle    = val_lle*lle;
	var pts_llo    = val_llo*llo;
	var pts_gauss  = val_gauss*gauss;
	var pts_ion    = val_ion*ion;
	var pts_plasma = val_plasma*plasma;
	var pts_total  = pts_lm + pts_lle + pts_llo + pts_gauss + pts_ion + pts_plasma;
	
	var prc_lm     = Math.round((pts_lm*100/pts_total)*100)/100
	var prc_lle    = Math.round((pts_lle*100/pts_total)*100)/100
	var prc_llo    = Math.round((pts_llo*100/pts_total)*100)/100
	var prc_gauss  = Math.round((pts_gauss*100/pts_total)*100)/100
	var prc_ion    = Math.round((pts_ion*100/pts_total)*100)/100
	var prc_plasma = Math.round((pts_plasma*100/pts_total)*100)/100
	
	if (pts_lm >= 1000000)
	{
		var col_lm = 'rgb(255, 0, 0)';
	}
	else if (pts_lm < 1000000 && pts_lm > 500000)
	{
		var col_lm = 'rgb(255, 255, 0)';
	}
	else if (pts_lm <= 500000)
	{
		var col_lm = 'rgb(0, 255, 0)';
	}
	
	if (pts_lle >= 1000000)
	{
		var col_lle = 'rgb(255, 0, 0)';
	}
	else if (pts_lle < 1000000 && pts_lle > 500000)
	{
		var col_lle = 'rgb(255, 255, 0)';
	}
	else if (pts_lle <= 500000)
	{
		var col_lle = 'rgb(0, 255, 0)';
	}
	
	if (pts_llo >= 1000000)
	{
		var col_llo = 'rgb(255, 0, 0)';
	}
	else if (pts_llo < 1000000 && pts_llo > 500000)
	{
		var col_llo = 'rgb(255, 255, 0)';
	}
	else if (pts_llo <= 500000)
	{
		var col_llo = 'rgb(0, 255, 0)';
	}
	
	if (pts_gauss >= 1000000)
	{
		var col_gauss = 'rgb(255, 0, 0)';
	}
	else if (pts_gauss < 1000000 && pts_gauss > 500000)
	{
		var col_gauss = 'rgb(255, 255, 0)';
	}
	else if (pts_gauss <= 500000)
	{
		var col_gauss = 'rgb(0, 255, 0)';
	}
	
	if (pts_ion >= 1000000)
	{
		var col_ion = 'rgb(255, 0, 0)';
	}
	else if (pts_ion < 1000000 && pts_ion > 500000)
	{
		var col_ion = 'rgb(255, 255, 0)';
	}
	else if (pts_ion <= 500000)
	{
		var col_ion = 'rgb(0, 255, 0)';
	}
	
	if (pts_plasma >= 1000000)
	{
		var col_plasma = 'rgb(255, 0, 0)';
	}
	else if (pts_plasma < 1000000 && pts_plasma > 500000)
	{
		var col_plasma = 'rgb(255, 255, 0)';
	}
	else if (pts_plasma <= 500000)
	{
		var col_plasma = 'rgb(0, 255, 0)';
	}
	
	if (pts_total >= 10000000)
	{
		var col_total = 'rgb(255, 0, 0)';
	}
	else if (pts_total < 10000000 && pts_total > 5000000)
	{
		var col_total = 'rgb(255, 255, 0)';
	}
	else if (pts_total <= 5000000)
	{
		var col_total = 'rgb(0, 255, 0)';
	}
	
	document.getElementById('buttonz').getElementsByTagName('h2')[0].innerHTML = "Unités de défense (Valeur d'attaque total : <a style=\"color: " + col_total + "\">" + format(pts_total, 0, ".") + "</a>)";
	document.getElementById('buttonz').getElementsByTagName('h2')[0].className = "tipsTitle";
	document.getElementById('buttonz').getElementsByTagName('h2')[0].title = "Valeurs d'attaques|Lanceur de missiles (" + lm + ") |Valeur d'attaque total : |<a style=\"color: " + col_lm + "\">" + pts_lm + " [" + prc_lm + "%]</a>|-----|Artillerie laser légère (" + lle + ") |Valeur d'attaque total : |<a style=\"color: " + col_lle + "\">" + pts_lle + " [" + prc_lle + "%]</a>|-----|Artillerie laser lourde (" + llo + ") |Valeur d'attaque total : |<a style=\"color: " + col_llo + "\">" + pts_llo + " [" + prc_llo + "%]</a>|-----|Canon de Gauss (" + gauss + ") |Valeur d'attaque total : |<a style=\"color: " + col_gauss + "\">" + pts_gauss + " [" + prc_gauss + "%]</a>|-----|Artillerie à ions (" + ion + ") |Valeur d'attaque total : |<a style=\"color: " + col_ion + "\">" + pts_ion + " [" + prc_ion + "%]</a>|-----|Lanceur de plasma (" + plasma + ") |Valeur d'attaque total : |<a style=\"color: " + col_plasma + "\">" + pts_plasma + " [" + prc_plasma + "%]</a>";
	document.getElementById('details401').title = "|Lanceur de missiles (" + lm + ") |-----|Valeur d'attaque à l'unité : |<a style=\"color: rgb(0, 255, 0)\">" + val_lm + "</a>|-----|Valeur d'attaque total : |<a style=\"color: " + col_lm + "\">" + pts_lm + " [" + prc_lm + "%]</a>";
	document.getElementById('details402').title = "|Artillerie laser légère (" + lle + ") |-----|Valeur d'attaque à l'unité : |<a style=\"color: rgb(0, 255, 0)\">" + val_lle + "</a>|-----|Valeur d'attaque total : |<a style=\"color: " + col_lle + "\">" + pts_lle + " [" + prc_lle + "%]</a>";
	document.getElementById('details403').title = "|Artillerie laser lourde (" + llo + ") |-----|Valeur d'attaque à l'unité : |<a style=\"color: rgb(0, 255, 0)\">" + val_llo + "</a>|-----|Valeur d'attaque total : |<a style=\"color: " + col_llo + "\">" + pts_llo + " [" + prc_llo + "%]</a>";
	document.getElementById('details404').title = "|Canon de Gauss (" + gauss + ") |-----|Valeur d'attaque à l'unité : |<a style=\"color: rgb(0, 255, 0)\">" + val_gauss + "</a>|-----|Valeur d'attaque total : |<a style=\"color: " + col_gauss + "\">" + pts_gauss + " [" + prc_gauss + "%]</a>";
	document.getElementById('details405').title = "|Artillerie à ions (" + ion + ") |-----|Valeur d'attaque à l'unité : |<a style=\"color: rgb(0, 255, 0)\">" + val_ion + "</a>|-----|Valeur d'attaque total : |<a style=\"color: " + col_ion + "\">" + pts_ion + " [" + prc_ion + "%]</a>";
	document.getElementById('details406').title = "|Lanceur de plasma (" + plasma + ") |-----|Valeur d'attaque à l'unité : |<a style=\"color: rgb(0, 255, 0)\">" + val_plasma + "</a>|-----|Valeur d'attaque total : |<a style=\"color: " + col_plasma + "\">" + pts_plasma + " [" + prc_plasma + "%]</a>";
}
else if (document.location.href.indexOf("page=fleet1") != -1)
{
	var get_cle = document.getElementById('button204').getElementsByClassName('buildingimg')[0].getElementsByClassName('tipsStandard')[0].getElementsByClassName('ecke')[0].innerHTML;
	cle = get_cle.replace( /[^0-9-]/g, "");
	cle = parseInt(cle);

	var clo;
	var get_clo = document.getElementById('button205').getElementsByClassName('buildingimg')[0].getElementsByClassName('tipsStandard')[0].getElementsByClassName('ecke')[0].innerHTML;
	clo = get_clo.replace( /[^0-9-]/g, "");
	clo = parseInt(clo);

	var cro;
	var get_cro = document.getElementById('button206').getElementsByClassName('buildingimg')[0].getElementsByClassName('tipsStandard')[0].getElementsByClassName('ecke')[0].innerHTML;
	cro = get_cro.replace( /[^0-9-]/g, "");
	cro = parseInt(cro);

	var vb;
	var get_vb = document.getElementById('button207').getElementsByClassName('buildingimg')[0].getElementsByClassName('tipsStandard')[0].getElementsByClassName('ecke')[0].innerHTML;
	vb = get_vb.replace( /[^0-9-]/g, "");
	vb = parseInt(vb);

	var tra;
	var get_tra = document.getElementById('button215').getElementsByClassName('buildingimg')[0].getElementsByClassName('tipsStandard')[0].getElementsByClassName('ecke')[0].innerHTML;
	tra = get_tra.replace( /[^0-9-]/g, "");
	tra = parseInt(tra);

	var bomb;
	var get_bomb = document.getElementById('button211').getElementsByClassName('buildingimg')[0].getElementsByClassName('tipsStandard')[0].getElementsByClassName('ecke')[0].innerHTML;
	bomb = get_bomb.replace( /[^0-9-]/g, "");
	bomb = parseInt(bomb);

	var dest;
	var get_dest = document.getElementById('button213').getElementsByClassName('buildingimg')[0].getElementsByClassName('tipsStandard')[0].getElementsByClassName('ecke')[0].innerHTML;
	dest = get_dest.replace( /[^0-9-]/g, "");
	dest = parseInt(dest);

	var edlm;
	var get_edlm = document.getElementById('button214').getElementsByClassName('buildingimg')[0].getElementsByClassName('tipsStandard')[0].getElementsByClassName('ecke')[0].innerHTML;
	edlm = get_edlm.replace( /[^0-9-]/g, "");
	edlm = parseInt(edlm);

	var val_flvl   = GM_getValue('attaquelvl', '0');
	var val_cle    = 50+(50)/10*val_flvl;
	var val_clo    = 150+(150)/10*val_flvl;
	var val_cro    = 400+(400)/10*val_flvl;
	var val_vb     = 1000+(1000)/10*val_flvl;
	var val_tra    = 700+(700)/10*val_flvl;
	var val_bomb   = 1000+(1000)/10*val_flvl;
	var val_dest   = 2000+(2000)/10*val_flvl;
	var val_edlm   = 200000+(200000)/10*val_flvl;
	
	var pts_cle    = val_cle*cle;
	var pts_clo    = val_clo*clo;
	var pts_cro    = val_cro*cro;
	var pts_vb     = val_vb*vb;
	var pts_tra    = val_tra*tra;
	var pts_bomb   = val_bomb*bomb;
	var pts_dest   = val_dest*dest;
	var pts_edlm   = val_edlm*edlm;
	var pts_total  = pts_cle + pts_clo + pts_cro + pts_vb + pts_tra + pts_bomb + pts_dest + pts_edlm;
	
	if (pts_cle >= 1000000)
	{
		var col_cle = 'rgb(255, 0, 0)';
	}
	else if (pts_cle < 1000000 && pts_cle > 500000)
	{
		var col_cle = 'rgb(255, 255, 0)';
	}
	else if (pts_cle <= 500000)
	{
		var col_cle = 'rgb(0, 255, 0)';
	}
	
	if (pts_clo >= 1000000)
	{
		var col_clo = 'rgb(255, 0, 0)';
	}
	else if (pts_clo < 1000000 && pts_clo > 500000)
	{
		var col_clo = 'rgb(255, 255, 0)';
	}
	else if (pts_clo <= 500000)
	{
		var col_clo = 'rgb(0, 255, 0)';
	}
	
	if (pts_cro >= 1000000)
	{
		var col_cro = 'rgb(255, 0, 0)';
	}
	else if (pts_cro < 1000000 && pts_cro > 500000)
	{
		var col_cro = 'rgb(255, 255, 0)';
	}
	else if (pts_cro <= 500000)
	{
		var col_cro = 'rgb(0, 255, 0)';
	}
	
	if (pts_vb >= 1000000)
	{
		var col_vb = 'rgb(255, 0, 0)';
	}
	else if (pts_vb < 1000000 && pts_vb > 500000)
	{
		var col_vb = 'rgb(255, 255, 0)';
	}
	else if (pts_vb <= 500000)
	{
		var col_vb = 'rgb(0, 255, 0)';
	}
	
	if (pts_tra >= 1000000)
	{
		var col_tra = 'rgb(255, 0, 0)';
	}
	else if (pts_tra < 1000000 && pts_tra > 500000)
	{
		var col_tra = 'rgb(255, 255, 0)';
	}
	else if (pts_tra <= 500000)
	{
		var col_tra = 'rgb(0, 255, 0)';
	}
	
	if (pts_bomb >= 1000000)
	{
		var col_bomb = 'rgb(255, 0, 0)';
	}
	else if (pts_bomb < 1000000 && pts_bomb > 500000)
	{
		var col_bomb = 'rgb(255, 255, 0)';
	}
	else if (pts_bomb <= 500000)
	{
		var col_bomb = 'rgb(0, 255, 0)';
	}
	
	if (pts_dest >= 1000000)
	{
		var col_dest = 'rgb(255, 0, 0)';
	}
	else if (pts_dest < 1000000 && pts_dest > 500000)
	{
		var col_dest = 'rgb(255, 255, 0)';
	}
	else if (pts_dest <= 500000)
	{
		var col_dest = 'rgb(0, 255, 0)';
	}
	
	if (pts_edlm >= 5000000)
	{
		var col_edlm = 'rgb(255, 0, 0)';
	}
	else if (pts_edlm < 5000000 && pts_edlm > 2500000)
	{
		var col_edlm = 'rgb(255, 255, 0)';
	}
	else if (pts_edlm <= 2500000)
	{
		var col_edlm = 'rgb(0, 255, 0)';
	}
	
	if (pts_total >= 15000000)
	{
		var col_total = 'rgb(255, 0, 0)';
	}
	else if (pts_total < 15000000 && pts_total > 7500000)
	{
		var col_total = 'rgb(255, 255, 0)';
	}
	else if (pts_total <= 7500000)
	{
		var col_total = 'rgb(0, 255, 0)';
	}
	
	document.getElementById('battleships').getElementsByTagName('h3')[0].innerHTML = "Vaisseaux de combat (VA total : <a style=\"color: " + col_total + "\">" + format(pts_total, 0, ".") + "</a>)";
	document.getElementById('battleships').getElementsByTagName('h3')[0].className = "tipsTitle";
	document.getElementById('battleships').getElementsByTagName('h3')[0].title = "Valeurs d'attaques|Chasseur léger (" + cle + ") |Valeur d'attaque total : |<a style=\"color: " + col_cle + "\">" + pts_cle + "</a>|-----|Chasseur lourd (" + clo + ") |Valeur d'attaque total : |<a style=\"color: " + col_clo + "\">" + pts_clo + "</a>|-----|Croiseur (" + cro + ") |Valeur d'attaque total : |<a style=\"color: " + col_cro + "\">" + pts_cro + "</a>|-----|Vaisseau de bataille (" + vb + ") |Valeur d'attaque total : |<a style=\"color: " + col_vb + "\">" + pts_vb + "</a>|-----|Traqueur (" + tra + ") |Valeur d'attaque total : |<a style=\"color: " + col_tra + "\">" + pts_tra + "</a>|-----|Bombardier (" + bomb + ") |Valeur d'attaque total : |<a style=\"color: " + col_bomb + "\">" + pts_bomb + "</a>|-----|Destructeur (" + dest + ") |Valeur d'attaque total : |<a style=\"color: " + col_dest + "\">" + pts_dest + "</a>|-----|Etoile de la mort (" + edlm + ") |Valeur d'attaque total : |<a style=\"color: " + col_edlm + "\">" + pts_edlm + "</a>";
	document.getElementById('button204').getElementsByClassName('buildingimg')[0].getElementsByClassName('tipsStandard')[0].title = "|Chasseur léger (" + cle + ") |-----|Valeur d'attaque à l'unité : |<a style=\"color: rgb(0, 255, 0)\">" + val_cle + "</a>|-----|Valeur d'attaque total : |<a style=\"color: " + col_cle + "\">" + pts_cle + "</a>";
	document.getElementById('button205').getElementsByClassName('buildingimg')[0].getElementsByClassName('tipsStandard')[0].title = "|Chasseur lourd (" + clo + ") |-----|Valeur d'attaque à l'unité : |<a style=\"color: rgb(0, 255, 0)\">" + val_clo + "</a>|-----|Valeur d'attaque total : |<a style=\"color: " + col_clo + "\">" + pts_clo + "</a>";
	document.getElementById('button206').getElementsByClassName('buildingimg')[0].getElementsByClassName('tipsStandard')[0].title = "|Croiseur (" + cro + ") |-----|Valeur d'attaque à l'unité : |<a style=\"color: rgb(0, 255, 0)\">" + val_cro + "</a>|-----|Valeur d'attaque total : |<a style=\"color: " + col_cro + "\">" + pts_cro + "</a>";
	document.getElementById('button207').getElementsByClassName('buildingimg')[0].getElementsByClassName('tipsStandard')[0].title = "|Vaisseau de bataille (" + vb + ") |-----|Valeur d'attaque à l'unité : |<a style=\"color: rgb(0, 255, 0)\">" + val_vb + "</a>|-----|Valeur d'attaque total : |<a style=\"color: " + col_vb + "\">" + pts_vb + "</a>";
	document.getElementById('button215').getElementsByClassName('buildingimg')[0].getElementsByClassName('tipsStandard')[0].title = "|Traqueur (" + tra + ") |-----|Valeur d'attaque à l'unité : |<a style=\"color: rgb(0, 255, 0)\">" + val_tra + "</a>|-----|Valeur d'attaque total : |<a style=\"color: " + col_tra + "\">" + pts_tra + "</a>";
	document.getElementById('button211').getElementsByClassName('buildingimg')[0].getElementsByClassName('tipsStandard')[0].title = "|Bombardier (" + bomb + ") |-----|Valeur d'attaque à l'unité : |<a style=\"color: rgb(0, 255, 0)\">" + val_bomb + "</a>|-----|Valeur d'attaque total : |<a style=\"color: " + col_bomb + "\">" + pts_bomb + "</a>";
	document.getElementById('button213').getElementsByClassName('buildingimg')[0].getElementsByClassName('tipsStandard')[0].title = "|Destructeur (" + dest + ") |-----|Valeur d'attaque à l'unité : |<a style=\"color: rgb(0, 255, 0)\">" + val_dest + "</a>|-----|Valeur d'attaque total : |<a style=\"color: " + col_dest + "\">" + pts_dest + "</a>";
	document.getElementById('button214').getElementsByClassName('buildingimg')[0].getElementsByClassName('tipsStandard')[0].title = "|Etoile de la mort (" + edlm + ") |-----|Valeur d'attaque à l'unité : |<a style=\"color: rgb(0, 255, 0)\">" + val_edlm + "</a>|-----|Valeur d'attaque total : |<a style=\"color: " + col_edlm + "\">" + pts_edlm + "</a>";
}