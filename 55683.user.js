// version 1.0.0 
// 15/01/2009
// ==UserScript==
// @name          Ausi/Ausbauscript
// @description	  n paar Kleinigkeiten ;)
// @author        Mozzicone[ITA]+UnDeaD[GER]
// @include       http://s*.vendetta*.*/*
// @include       https://s*.vendetta*.*/*
// ==/UserScript==
// ************************************************
// ** Grazie a mitm [ITA] per stimoli e consigli **
// ************************************************


(function() {
	
	var serverID = document.location.href;
	var tmp1 = serverID.indexOf("http://")+7;
	var tmp2 = serverID.indexOf("/vendetta/", tmp1);
	serverID = serverID.substring(tmp1,tmp2);
	NumServer = serverID.substring(1,2);
	var livelli = new Array(8);
	
	
	if ((location.pathname.search('forschung.php') != -1 ) || (location.pathname.search('konst.php') != -1 )) {
		
		
		var req = new XMLHttpRequest();
		var content=document.location.href;
        var tmp1=content.indexOf("?q=",0)+3;
        var id=content.substring(tmp1);
		var url = "http://s" + NumServer + ".vendetta.de/vendetta/res.php?q="+id;
		req.open("GET",url, false); 
		req.send(null);
 		tmp = req.responseText.indexOf('kapazit');
		tmp2 = req.responseText.indexOf('davon sicher');
		tmp3 = req.responseText.substring(tmp+31,tmp2-24);
		tmp4 = tmp3.split("<th>");
		tmp5 = req.responseText.indexOf('<td class=c>=</td>');
		tmp6 = req.responseText.substring(tmp5,tmp);
		tmp7 = tmp6.split("<th>");
		statusAlcol = "Vuoto";
		prodAlcol = tmp7[3];
		prodAlcol = prodAlcol.substring(prodAlcol.indexOf("positive")+10,prodAlcol.indexOf("</font>"));
		prodAlcol = parseInt(prodAlcol.replace(/\./g, ""));
		if (prodAlcol == 0) 
		{
			statusAlcol = "negative";
		}
		if (tmp7[3].search("positive") != -1) 
		{
			statusAlcol = "positive";
		}
		if (tmp7[3].search("negative") != -1) 
		{
			statusAlcol = "negative";
		}
		

		prodArmi = tmp7[1];
		prodArmi = prodArmi.substring(prodArmi.indexOf("positive")+10,prodArmi.indexOf("</font>"));
		prodArmi = parseInt(prodArmi.replace(/\./g, ""));
		prodMuni = tmp7[2];
		prodMuni = prodMuni.substring(prodMuni.indexOf("positive")+10,prodMuni.indexOf("</font>"));
		prodMuni = parseInt(prodMuni.replace(/\./g, ""));
		prodDoll = tmp7[4];
		prodDoll = prodDoll.substring(prodDoll.indexOf("positive")+10,prodDoll.indexOf("</font>"));
		prodDoll = parseInt(prodDoll.replace(/\./g, ""));
		
		
		for ( var j = 0; j < 4 ; j++) {
			tmp4[j] = tmp4[j].substring(0,tmp4[j].length-5);
			tmp4[j] = tmp4[j].replace(/\./g, "");
		}
			MagazzinoArmi = parseInt(tmp4[0]);
			MagazzinoMuni = parseInt(tmp4[1]);
			Cassaforte = parseInt(tmp4[3]);
			

		
			
		var anchorTags = document.getElementsByTagName("th");
		
		
		for (var bb = 0; bb < anchorTags.length ; bb = bb + 1) {
			if ( anchorTags[bb].innerHTML.search("In diesem Büro sitzt der Chef") != -1 ) { 
				inizio = bb;
				break;
			}
		}
		
		if (location.pathname.search('forschung.php') != -1 ) { inizio = 0};
		
		livelli = [0,0,0,0,0,0,0,0];
		
		for (var i = inizio; i < anchorTags.length ; i = i + 4)
		{
			if (anchorTags[i].innerHTML.search("Brauerei") != -1 && statusAlcol == "negative" ) 
			{
				posStatus = anchorTags[i].innerHTML.indexOf("</a>");
				htmlStatus = anchorTags[i].innerHTML.substring(0,posStatus) + "<font color=red> Negative Produtkion </font>" + anchorTags[i].innerHTML.substring(posStatus);
				anchorTags[i].innerHTML = htmlStatus;
			}
			

			//ARMI			
			th = anchorTags[i].innerHTML;
			Pos = th.indexOf("W:");
			PosImm = th.indexOf("vendetta/img/R1K.gif");
			Diff =  parseInt(PosImm) - parseInt(Pos);
			Capacita = MagazzinoArmi;
			tipo = 1;
			
			Calcolo_Ris(Pos, Diff, th, anchorTags, Capacita, tipo, i );
				
			
			//MUNIZIONI			
			th = anchorTags[i].innerHTML;
			Pos = th.indexOf("M:");
			PosImm = th.indexOf("vendetta/img/R2K.gif");
			Diff =  parseInt(PosImm) - parseInt(Pos);
			Capacita = MagazzinoMuni;
			tipo = 2;
			
			Calcolo_Ris(Pos, Diff, th, anchorTags, Capacita, tipo, i );
						
			
			//DOLLARI			
			th = anchorTags[i].innerHTML;
			Pos = th.indexOf("D:");
			PosImm = th.indexOf("vendetta/img/R4K.gif");
			Diff =  parseInt(PosImm) - parseInt(Pos);
			Capacita = Cassaforte;
			tipo = 4;
			
			Calcolo_Ris(Pos, Diff, th, anchorTags, Capacita, tipo, i );
			
			th = anchorTags[i].innerHTML;
			inizioLivello = th.indexOf("c=")+9;
			fineLivello = th.indexOf("</a>");
			
			titolo = th.substring(inizioLivello,fineLivello);
			
			if ( titolo.search("Informationsbeschaffung") != -1) { Informationsbeschaffung=titolo.replace(/\D/g, '');Informationsbeschaffung=parseInt(Informationsbeschaffung);}
			if ( titolo.search("Objektbewachung") != -1) { Objektbewachung=titolo.replace(/\D/g, '');Objektbewachung=parseInt(Objektbewachung);}
			if ( titolo.search("Gruppenschutz") != -1) { Gruppenschutz=titolo.replace(/\D/g, '');Gruppenschutz=parseInt(Gruppenschutz);}
			if ( titolo.search("Nahkamp") != -1) { Nahkamp=titolo.replace(/\D/g, '');Nahkamp=parseInt(Nahkamp);}
			if ( titolo.search("Kurzwaffenkampf") != -1) { Kurzwaffenkampf=titolo.replace(/\D/g, '');Kurzwaffenkampf=parseInt(Kurzwaffenkampf);}
			if ( titolo.search("Schusstraining") != -1) { Schusstraining=titolo.replace(/\D/g, '');Schusstraining=parseInt(Schusstraining);}
			if ( titolo.search("Guerillaausbildung") != -1) { Guerillaausbildung=titolo.replace(/\D/g, '');Guerillaausbildung=parseInt(Guerillaausbildung);}
			if ( titolo.search("Psychisches") != -1) { Psychisches=titolo.replace(/\D/g, '');Psychisches=parseInt(Psychisches);}
			
			
			
			
		}
		livelli = [Informationsbeschaffung,Objektbewachung,Gruppenschutz,Nahkamp,Kurzwaffenkampf,Schusstraining,Guerillaausbildung,Psychisches];
		newDiv = document.createElement("span");
		var valore = GM_getValue(serverID + 'ext_view')?'checked':'';
		newDiv.innerHTML = '<input name="ext_view" value="yes" ' + valore + ' type="checkbox"> Ausbildungszuwachs Anzeigen';
		anchorTags[0].parentNode.parentNode.appendChild(newDiv);
		var checkboxf = document.getElementsByTagName('input');
		checkboxf = checkboxf[checkboxf.length-1];
		checkboxf.addEventListener("click", function () {
			salva(this.name, this.checked?'checked':'');
			}, false);
		
	}
	 //Funzione Incremento
	 
	if (location.pathname.search('forschung.php') != -1 && GM_getValue(serverID + 'ext_view')== "checked") { 
		
		var anchorTags = document.getElementsByTagName("th");
		
		Difesa = Math.floor(Indice(livelli,1200));
		Attacco = Math.floor(Indice(livelli,1000));
		
		for (var i = 0; i < anchorTags.length ; i = i + 4) {
			
			th = anchorTags[i].innerHTML;
			inizioLivello = th.indexOf("c=")+9;
			fineLivello = th.indexOf("</a>");
			
			titolo = th.substring(inizioLivello,fineLivello);
			
			if ( titolo.search("Informationsbeschaffung") != -1) { 
				livelli[0]=livelli[0]+1;
				DifesaFut = Math.floor(Indice(livelli,1200));
				AttaccoFut = Math.floor(Indice(livelli,1000));
				difesaInc = DifesaFut - Difesa;
				attaccoInc = AttaccoFut - Attacco;
				html = "<font color=blue > Deff: + " +difesaInc+ " / Att: +" +attaccoInc+" </font>";
				tmp1 = th.substring(0,inizioLivello);
				tmp2 = th.substring(fineLivello);
				anchorTags[i].innerHTML = tmp1 + titolo + html + tmp2;
				livelli[0]=livelli[0]-1;
			}
			
			if ( titolo.search("Objektbewachung") != -1) { 
				livelli[1]=livelli[1]+1;
				DifesaFut = Math.floor(Indice(livelli,1200));
				AttaccoFut = Math.floor(Indice(livelli,1000));
				difesaInc = DifesaFut - Difesa;
				attaccoInc = AttaccoFut - Attacco;
				html = "<font color=blue > Deff: + " +difesaInc+ " / Att: +" +attaccoInc+" </font>";
				tmp1 = th.substring(0,inizioLivello);
				tmp2 = th.substring(fineLivello);
				anchorTags[i].innerHTML = tmp1 + titolo + html + tmp2;
				livelli[1]=livelli[1]-1;
			}
			if ( titolo.search("Gruppenschutz") != -1) { 
				livelli[2]=livelli[2]+1;
				DifesaFut = Math.floor(Indice(livelli,1200));
				AttaccoFut = Math.floor(Indice(livelli,1000));
				difesaInc = DifesaFut - Difesa;
				attaccoInc = AttaccoFut - Attacco;
				html = "<font color=blue > Deff: + " +difesaInc+ " / Att: +" +attaccoInc+" </font>";
				tmp1 = th.substring(0,inizioLivello);
				tmp2 = th.substring(fineLivello);
				anchorTags[i].innerHTML = tmp1 + titolo + html + tmp2;
				livelli[2]=livelli[2]-1;
			}
			if ( titolo.search("Nahkamp") != -1) { 
				livelli[3]=livelli[3]+1;
				DifesaFut = Math.floor(Indice(livelli,1200));
				AttaccoFut = Math.floor(Indice(livelli,1000));
				difesaInc = DifesaFut - Difesa;
				attaccoInc = AttaccoFut - Attacco;
				html = "<font color=blue > Deff: + " +difesaInc+ " / Att: +" +attaccoInc+" </font>";
				tmp1 = th.substring(0,inizioLivello);
				tmp2 = th.substring(fineLivello);
				anchorTags[i].innerHTML = tmp1 + titolo + html + tmp2;
				livelli[3]=livelli[3]-1;			
			}
			if ( titolo.search("Kurzwaffenkampf") != -1) { 
				livelli[4]=livelli[4]+1;
				DifesaFut = Math.floor(Indice(livelli,1200));
				AttaccoFut = Math.floor(Indice(livelli,1000));
				difesaInc = DifesaFut - Difesa;
				attaccoInc = AttaccoFut - Attacco;
				html = "<font color=blue > Deff: + " +difesaInc+ " / Att: +" +attaccoInc+" </font>";
				tmp1 = th.substring(0,inizioLivello);
				tmp2 = th.substring(fineLivello);
				anchorTags[i].innerHTML = tmp1 + titolo + html + tmp2;
				livelli[4]=livelli[4]-1;
			}
			if ( titolo.search("Schusstraining") != -1) { 
				livelli[5]=livelli[5]+1;
				DifesaFut = Math.floor(Indice(livelli,1200));
				AttaccoFut = Math.floor(Indice(livelli,1000));
				difesaInc = DifesaFut - Difesa;
				attaccoInc = AttaccoFut - Attacco;
				html = "<font color=blue > Deff: + " +difesaInc+ " / Att: +" +attaccoInc+" </font>";
				tmp1 = th.substring(0,inizioLivello);
				tmp2 = th.substring(fineLivello);
				anchorTags[i].innerHTML = tmp1 + titolo + html + tmp2;
				livelli[5]=livelli[5]-1;
			}
			if ( titolo.search("Guerillaausbildung") != -1) { 
				livelli[6]=livelli[6]+1;
				DifesaFut = Math.floor(Indice(livelli,1200));
				AttaccoFut = Math.floor(Indice(livelli,1000));
				difesaInc = DifesaFut - Difesa;
				attaccoInc = AttaccoFut - Attacco;
				html = "<font color=blue > Deff: + " +difesaInc+ " / Att: +" +attaccoInc+" </font>";
				tmp1 = th.substring(0,inizioLivello);
				tmp2 = th.substring(fineLivello);
				anchorTags[i].innerHTML = tmp1 + titolo + html + tmp2;
				livelli[6]=livelli[6]-1;
			}
			if ( titolo.search("Psychisches") != -1) {
				livelli[7]=livelli[7]+1;
				DifesaFut = Math.floor(Indice(livelli,1200));
				AttaccoFut = Math.floor(Indice(livelli,1000));
				difesaInc = DifesaFut - Difesa;
				attaccoInc = AttaccoFut - Attacco;
				html = "<font color=blue > Deff: + " +difesaInc+ " / Att: +" +attaccoInc+" </font>";
				tmp1 = th.substring(0,inizioLivello);
				tmp2 = th.substring(fineLivello);
				anchorTags[i].innerHTML = tmp1 + titolo + html + tmp2;
				livelli[7]=livelli[7]-1;			
			}
			
		}
		
		
	} //Fine Funzione Incremento

	
	function stampared(Risorsa, text, Capacita, anchorTags, tmp1, tmp2, i) {
		livelli = Math.ceil((text - Capacita) / 150000);
		tmp3 = tmp1 + "<font color = red> " + Risorsa + " (" + livelli + ")" + " </font>" + tmp2;
		anchorTags[i].innerHTML = tmp3;
	}
	
	function stampagreen(Risorsa, text, tipo, anchorTags, tmp1, tmp2, i) {
		possesso = document.getElementsByClassName("th");
		attuale = possesso[tipo-1].innerHTML;
		tmp3 = attuale.indexOf("<img");
		attuale = attuale.substring(0,tmp3-1);
		attuale = attuale.replace(/\./g, "");
		attuale = parseInt(attuale);
		var differenza = attuale - text;
		
		if (differenza >= 0) 
		{	
			tmp3 = tmp1 + "<font color = black> " + Risorsa + " </font>" + tmp2;
			anchorTags[i].innerHTML = tmp3;			
		}
		else 
		{
			differenza = String(differenza);
			var format = number_format (differenza, 0, ",", ".");
			tmp3 = tmp1 + "<font color = black> " + Risorsa + " </font>" + "<font color = green>[<i>" + format + "</i>]</font>" + tmp2;
			anchorTags[i].innerHTML = tmp3;			
		}
	}
	
	
	function number_format( number, decimals, dec_point, thousands_sep ) 
	{
		var n = number, c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
		var d = dec_point == undefined ? "." : dec_point;
		var t = thousands_sep == undefined ? "," : thousands_sep, s = n < 0 ? "-" : "";
		var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    
		return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	}
	
	function Calcolo_Ris(Pos, Diff, th, anchorTags, Capacita, tipo, i )
	{
		if ( Pos  != -1) {	
			Risorsa = th.substring(Pos+7,Pos+Diff-11);
			tmp1 = anchorTags[i].innerHTML.substring(0,Pos+7);
			tmp2 = anchorTags[i].innerHTML.substring(Pos+Diff+22);
			text = Risorsa.replace(/\./g, "");
			text = parseInt(text);
				if ( text > Capacita) {	
					stampared(Risorsa, text, Capacita, anchorTags, tmp1, tmp2, i);
				}
				else {
					stampagreen(Risorsa, text, tipo, anchorTags, tmp1, tmp2, i);
					}
		}
			
	}
	
	function Bonus(NumLivello) 
	{
		var bonus;
		bonus = (Math.sqrt(NumLivello))/10;
		return bonus;
	}
	
	function Indice(livelli,base) 
	{
		
		var indice;
		indice = base;
		for (var j=0; j < 8; j++)
		{
			bonus = Bonus(livelli[j]);
			indice = indice * ( 1 + bonus);
		}
		return indice;		
	}

        function salva(nome, valore) {
		GM_setValue(serverID + nome, valore)
	}
	
	
})();