// ==UserScript==
// @name           Faccinator 5
// @namespace      Faccinator 5
// @include        http://forum.travian.*
// ==/UserScript==


var colore_sfondo = "#bee3ff";
var distanza_alto = "+200px";
var immagine_sfondo = "url(http://i54.tinypic.com/23t5yki.png)";
var abilita_sfondo = "si"; //scegli si o no

var immagini = new Array ();
immagini[0] = '<img onclick=scrivi(this.src) src="http://img261.imageshack.us/img261/6572/rincoht4qh7ud9.gif">';
immagini[1] = '<img onclick=scrivi(this.src) src="http://img90.imageshack.us/img90/726/emomgpi7.png">';
immagini[2] = '<img onclick=scrivi(this.src) src="http://img105.imageshack.us/img105/6456/fiomgda5.gif">';
immagini[3] = '<img onclick=scrivi(this.src) src="http://img354.imageshack.us/img354/6813/segavl0kr8.gif">';
immagini[4] = '<img onclick=scrivi(this.src) src="http://img166.imageshack.us/img166/1323/omgstoppi1.gif">';
immagini[5] = '<img onclick=scrivi(this.src) src="http://img339.imageshack.us/img339/909/chaomgdd7th5.gif">';
immagini[6] = '<img onclick=scrivi(this.src) src="ttp://img248.imageshack.us/img248/4720/assaej0.gif">';
immagini[7] = '<img onclick=scrivi(this.src) src="http://img168.imageshack.us/img168/1083/clapomgmq8.gif">';
immagini[8] = '<img onclick=scrivi(this.src) src="http://img171.imageshack.us/img171/1954/omghy6.gif">';
immagini[9] = '<img onclick=scrivi(this.src) src="http://img134.imageshack.us/img134/3600/specchiomobileem8gn4.gif">';
immagini[10] = '<img onclick=scrivi(this.src) src="http://img171.imageshack.us/img171/60/litebo2.gif">';
immagini[11] = '<img onclick=scrivi(this.src) src="http://img67.imageshack.us/img67/8642/mattofr4.gif">';
immagini[12] = '<img onclick=scrivi(this.src) src="http://forum.gamesnet.it/images/smilies/caffe.gif">';
immagini[13] = '<img onclick=scrivi(this.src) src="http://i33.tinypic.com/2i77rip.gif">';
immagini[14] = '<img onclick=scrivi(this.src) src="http://209.85.12.234/15190/89/emo/omg.png">';
immagini[15] = '<img onclick=scrivi(this.src) src="http://i39.tinypic.com/25z2gdg.gif">';
immagini[16] = '<img onclick=scrivi(this.src) src="http://img379.imageshack.us/img379/2669/pattruleggnu0.gif">';
immagini[17] = '<img onclick=scrivi(this.src) src="http://img113.imageshack.us/img113/2307/omgkk6.png">';
immagini[18] = '<img onclick=scrivi(this.src) src="http://image.forumfree.it/2/2/2/4/0/3/6/1213141093.gif">';
immagini[19] = '<img onclick=scrivi(this.src) src="http://img181.imageshack.us/img181/2644/11r3yu8yw2.gif">';
immagini[20] = '<img onclick=scrivi(this.src) src="http://img54.imageshack.us/img54/6661/eyeda2dn1.gif">';
immagini[21] = '<img onclick=scrivi(this.src) src="http://i38.tinypic.com/13ztqq.jpg">';
immagini[22] = '<img onclick=scrivi(this.src) src="http://img131.imageshack.us/img131/9958/fermosiset2117454613imadn3.gif">';
immagini[23] = '<img onclick=scrivi(this.src) src="http://img410.imageshack.us/img410/4074/27zxavmmm1.gif">';
immagini[24] = '<img onclick=scrivi(this.src) src="http://img210.imageshack.us/img210/2175/wa7xvuj0.gif">';
immagini[25] = '<img onclick=scrivi(this.src) src="http://img514.imageshack.us/img514/3428/ferloveod4.gif">';
immagini[26] = '<img onclick=scrivi(this.src) src="http://img524.imageshack.us/img524/4827/telefonomggz2.gif">';
immagini[27] = '<img onclick=scrivi(this.src) src="http://img210.imageshack.us/img210/1356/6ffz5ledu0.gif">';
immagini[28] = '<img onclick=scrivi(this.src) src="http://img169.imageshack.us/img169/6396/1197500911qm9.gif">';
immagini[29] = '<img onclick=scrivi(this.src) src="http://img170.imageshack.us/img170/354/fermosiset2117454613imapa6.gif">';
immagini[30] = 'canc';
immagini[31] = '<img onclick=scrivi(this.src) src="http://img170.imageshack.us/img170/807/fermosiset2117454613imakc7.gif">';
immagini[32] = '<img onclick=scrivi(this.src) src="http://emoticonforum.altervista.org/_altervista_ht/faccine/modificate/216.gif">';
immagini[33] = '<img onclick=scrivi(this.src) src="http://i42.tinypic.com/mkejko.gif") src="http://i42.tinypic.com/mkejko.gif">';
immagini[34] = '<img onclick=scrivi(this.src) src="http://img166.imageshack.us/img166/5254/moonwalkomgjj4.gif">';
immagini[35] = '<img onclick=scrivi(this.src) src="http://i271.photobucket.com/albums/jj149/KellyKelly92_2008/Emoticons/dddzf0.gif">';
//Se vuoi aggiungere altre immagini, continua aggiungendo i numeri in successione e presta attezione all': onclick=scrivi(this.src)
//Se vuoi cancellare una immagine, fai così:
// immagini[16] = 'canc';

//compressione contenuto
var contenuto = "";
for (var i = 0; i < immagini.length; i++)
{
if(immagini[i].length > 10)
	contenuto+= immagini[i];
}





/********** QUESTA E' LA PARTE DA MODIFICARE PER AGGIUNGERE LE FACCINE******/
var controllo = '<div id="controllobox" style="overflow: auto; background-color: #e6f3fc; margin: 20px; height: 190px; border: 2px dashed white; "  >  ' +
contenuto +
'  </div><div style="margin-top: -15px; margin-left: 170px; font-size: x-small;" id="spam"><a style="color: black;" href="http://www.sviluppotravian.altervista.org" target="_blank">iosviluppotravian.tk</a></div>';



var meno = "http://www.san-gabriele.it/images/legenda/meno.png";
var piu = "http://www.san-gabriele.it/images/legenda/piu.png";

//Implemento una funzione
	function getElementsByClass( searchClass, domNode, tagNames) {
	if (domNode == null) domNode = document;
	if (tagNames == null) tagNames = '*';
	var el = new Array();
	var tags = domNode.getElementsByTagName(tagNames);
	var tcl = " "+searchClass+" ";
	for(i=0,j=0; i<tags.length; i++) {
		var test = " " + tags[i].className + " ";
		if (test.indexOf(tcl) != -1)
			el[j++] = tags[i];
	}
	return el;
}




//Creo uno Script che andrà ad aggiungersi all'head
    var scriptCode = new Array();  
	 scriptCode.push('var meno = "http://www.san-gabriele.it/images/legenda/meno.png";'        );
	 scriptCode.push('var piu = "http://www.san-gabriele.it/images/legenda/piu.png";'        );
    scriptCode.push('function scrivi(argomento){'        );
    scriptCode.push('  document.getElementById("copiaggio").value="[IMG]" + argomento + "[/IMG]";    '  );
	scriptCode.push('  document.getElementById("copiaggio").select();    '  );
    scriptCode.push('   }   '  );	

    scriptCode.push('function chiudi(){'        );
    scriptCode.push('  if(  document.getElementById("faccinator5").style.width== "300px" )   '  );	
	    scriptCode.push('   {   '  );	
    scriptCode.push('  document.getElementById("faccinator5").style.width="30px";    '  );
    scriptCode.push('  document.getElementById("button").src = piu;    '  );
	scriptCode.push('  document.getElementById("controllobox").style.display = "none";    '  );	
	    scriptCode.push('   }   '  );	
	scriptCode.push('  else   '  );	
		    scriptCode.push('   {   '  );	
    scriptCode.push('  document.getElementById("faccinator5").style.width="300px";    '  );
	scriptCode.push('  document.getElementById("controllobox").style.display = "block";    '  );	
    scriptCode.push('  document.getElementById("button").src = meno;    '  );
		    scriptCode.push('   }   '  );
    scriptCode.push('   }   '  );	

//Aggiunto all'head
    var script = document.createElement('script');    
    script.innerHTML = scriptCode.join('\n');         
    scriptCode.length = 0;                              
    document.getElementsByTagName('head')[0].appendChild(script); 
	

//Inserisco la parte che visualizzerà l'url completo di tag IMG	
	var versione = "<img id=\"button\" style=\"margin: 5px;\"  onclick=\"chiudi();\" src ='##'></img><input style=\" margin-left: 26px; width: 190px; border: 0px solid black; padding: 8px; background: transparent; border-bottom: 1px solid white; font-weight: bold; text-align: center; color: #333;\" type=\"text\" id=\"copiaggio\" value=\".: Faccinator 5 :.\">";


body = document.body;
	div = document.createElement("div");
	div.style.position = "fixed";
	div.id="faccinator5";
	div.style.top = distanza_alto;
	div.style.right = "+0px";
		if(abilita_sfondo ==  "si")
			div.style.background = immagine_sfondo;
	div.style.backgroundColor = colore_sfondo;
	div.style.borderLeft = "2px solid white";
	div.style.borderTop = "2px solid white";
	div.style.borderBottom = "2px solid white";	
	div.style.marginRight = "-4px";			
	div.style.height = "275px";
	div.style.width = "300px";
	div.style.padding = "0px";
	div.style.display = "block";
        //div.innerHTML = "<div   onmouseover=\"document.getElementById('sette').style.opacity = '0.6';\" onmouseout=\"document.getElementById('sette').style.opacity = '1.0';\" onclick='sei();' style='width: 128px; height: 128px; border: 0px solid red;' > </div>";
	div.innerHTML = versione+controllo;
	body.appendChild(div);
	
	
//Provo a capire se stiamo rispondendo a un messaggio o modificandolo
var stringamadre = location.href;
var da_cercare= "newreply";
var count = 0;
for (var i = 0; i <= stringamadre.length - da_cercare.length; i++)
{
    if (stringamadre.substring(i, i + da_cercare.length) == da_cercare)
    {
        count++;
    }
}

var da_cercare= "editpost";
for (var i = 0; i <= stringamadre.length - da_cercare.length; i++)
{
    if (stringamadre.substring(i, i + da_cercare.length) == da_cercare)
    {
        count++;
    }
}
if(count > 0)
{
document.getElementById("faccinator5").style.width="300px";
document.getElementById("button").src= meno;
document.getElementById("controllobox").style.display = "block";
}
else
{
document.getElementById("faccinator5").style.width="30px";
document.getElementById("button").src= piu;
document.getElementById("controllobox").style.display = "none";
}

