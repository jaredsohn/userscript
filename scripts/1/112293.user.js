// ==UserScript==
// @name           smile
// @namespace      smile
// @include        http://scuolaebasta.forumcommunity.net/*
// @include        *
// ==/UserScript==
	
	
/********** QUESTA E' LA PARTE DA MODIFICARE PER AGGIUNGERE LE FACCINE******/
var controllo = '<div style="overflow: auto; background-color: transparent; margin-bottom: 12px; height: 190px;"  >  ' +
'<img onclick=scrivi("http://img261.imageshack.us/img261/6572/rincoht4qh7ud9.gif") src="http://img261.imageshack.us/img261/6572/rincoht4qh7ud9.gif"> '+
' <img onclick=scrivi("http://img90.imageshack.us/img90/726/emomgpi7.png") src="http://img90.imageshack.us/img90/726/emomgpi7.png"> '+
' <img onclick=scrivi("http://img105.imageshack.us/img105/6456/fiomgda5.gif") src="http://img105.imageshack.us/img105/6456/fiomgda5.gif"> '+
' <img onclick=scrivi("http://img354.imageshack.us/img354/6813/segavl0kr8.gif") src="http://img354.imageshack.us/img354/6813/segavl0kr8.gif"> '+
' <img onclick=scrivi("http://img166.imageshack.us/img166/1323/omgstoppi1.gif") src="http://img166.imageshack.us/img166/1323/omgstoppi1.gif"> '+
' <img onclick=scrivi("http://img339.imageshack.us/img339/909/chaomgdd7th5.gif") src="http://img339.imageshack.us/img339/909/chaomgdd7th5.gif"> '+
' <img onclick=scrivi("http://img248.imageshack.us/img248/4720/assaej0.gif") src="http://img248.imageshack.us/img248/4720/assaej0.gif"> '+
' <img onclick=scrivi("http://img168.imageshack.us/img168/1083/clapomgmq8.gif") src="http://img168.imageshack.us/img168/1083/clapomgmq8.gif"> '+
' <img onclick=scrivi("http://img171.imageshack.us/img171/1954/omghy6.gif") src="http://img171.imageshack.us/img171/1954/omghy6.gif"> '+
' <img onclick=scrivi("http://img134.imageshack.us/img134/3600/specchiomobileem8gn4.gif") src="http://img134.imageshack.us/img134/3600/specchiomobileem8gn4.gif"> '+
' <img onclick=scrivi("http://img171.imageshack.us/img171/60/litebo2.gif") src="http://img171.imageshack.us/img171/60/litebo2.gif"> '+
' <img onclick=scrivi("http://img67.imageshack.us/img67/8642/mattofr4.gif") src="http://img67.imageshack.us/img67/8642/mattofr4.gif"> '+
' <img onclick=scrivi("http://forum.gamesnet.it/images/smilies/caffe.gif") src="http://forum.gamesnet.it/images/smilies/caffe.gif"> '+
' <img onclick=scrivi("http://i33.tinypic.com/2i77rip.gif") src="http://i33.tinypic.com/2i77rip.gif"> '+
' <img onclick=scrivi("http://i117.photobucket.com/albums/o41/svioloni/oMg.png") src="http://i117.photobucket.com/albums/o41/svioloni/oMg.png"> '+
' <img onclick=scrivi("http://i39.tinypic.com/25z2gdg.gif") src="http://i39.tinypic.com/25z2gdg.gif">'+
' <img onclick=scrivi("http://img379.imageshack.us/img379/2669/pattruleggnu0.gif") src="http://img379.imageshack.us/img379/2669/pattruleggnu0.gif"> '+
' <img onclick=scrivi("http://img113.imageshack.us/img113/2307/omgkk6.png") src="http://img113.imageshack.us/img113/2307/omgkk6.png"> '+
' <img onclick=scrivi("http://image.forumfree.it/2/2/2/4/0/3/6/1213141093.gif") src="http://image.forumfree.it/2/2/2/4/0/3/6/1213141093.gif"> '+
' <img onclick=scrivi("http://img181.imageshack.us/img181/2644/11r3yu8yw2.gif") src="http://img181.imageshack.us/img181/2644/11r3yu8yw2.gif"> '+
' <img onclick=scrivi("http://img54.imageshack.us/img54/6661/eyeda2dn1.gif") src="http://img54.imageshack.us/img54/6661/eyeda2dn1.gif"> '+
' <img onclick=scrivi("http://i38.tinypic.com/13ztqq.jpg") src="http://i38.tinypic.com/13ztqq.jpg"> '+
' <img onclick=scrivi("http://img131.imageshack.us/img131/9958/fermosiset2117454613imadn3.gif") src="http://img131.imageshack.us/img131/9958/fermosiset2117454613imadn3.gif"> '+
' <img onclick=scrivi("http://img410.imageshack.us/img410/4074/27zxavmmm1.gif") src="http://img410.imageshack.us/img410/4074/27zxavmmm1.gif"> '+
' <img onclick=scrivi("http://img210.imageshack.us/img210/2175/wa7xvuj0.gif") src="http://img210.imageshack.us/img210/2175/wa7xvuj0.gif"> '+
' <img onclick=scrivi("http://img514.imageshack.us/img514/3428/ferloveod4.gif") src="http://img514.imageshack.us/img514/3428/ferloveod4.gif"> '+
' <img onclick=scrivi("http://img524.imageshack.us/img524/4827/telefonomggz2.gif") src="http://img524.imageshack.us/img524/4827/telefonomggz2.gif"> '+
' <img onclick=scrivi("http://img210.imageshack.us/img210/1356/6ffz5ledu0.gif") src="http://img210.imageshack.us/img210/1356/6ffz5ledu0.gif"> '+
' <img onclick=scrivi("http://img169.imageshack.us/img169/6396/1197500911qm9.gif") src="http://img169.imageshack.us/img169/6396/1197500911qm9.gif"> '+
' <img onclick=scrivi("http://img170.imageshack.us/img170/354/fermosiset2117454613imapa6.gif") src="http://img170.imageshack.us/img170/354/fermosiset2117454613imapa6.gif"> '+
' <img onclick=scrivi("http://oi53.tinypic.com/t62umb.jpg") src="http://oi53.tinypic.com/t62umb.jpg"> '+
' <img onclick=scrivi("http://i41.tinypic.com/2e1hh0o.gif") src="http://i41.tinypic.com/2e1hh0o.gif"> '+
' <img onclick=scrivi("http://img170.imageshack.us/img170/807/fermosiset2117454613imakc7.gif") src="http://img170.imageshack.us/img170/807/fermosiset2117454613imakc7.gif"> '+
' <img onclick=scrivi("http://emoticonforum.altervista.org/_altervista_ht/faccine/modificate/216.gif") src="http://emoticonforum.altervista.org/_altervista_ht/faccine/modificate/216.gif"> '+
' <img onclick=scrivi("http://i42.tinypic.com/mkejko.gif") src="http://i42.tinypic.com/mkejko.gif"> '+
' <img onclick=scrivi("http://img166.imageshack.us/img166/5254/moonwalkomgjj4.gif") src="http://img166.imageshack.us/img166/5254/moonwalkomgjj4.gif"> '+
' <img onclick=scrivi("http://i271.photobucket.com/albums/jj149/KellyKelly92_2008/Emoticons/dddzf0.gif") src="http://i271.photobucket.com/albums/jj149/KellyKelly92_2008/Emoticons/dddzf0.gif"> '+
'  </div>';

//Inserisco la parte che visualizzerà l'url completo di tag IMG	
	var versione = "<input style=\" width: 100%; border: 0px solid black; padding: 8px; \" type=\"text\" id=\"copiaggio\" value=\"Grazie per aver scelto FaccinaTort4, ASD\">";

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



//Aumento lo spazio a destra dell'editor
a = getElementsByClass('editor_textbox editor_textbox_smilie');
for(i=0;i<a.length;i++){
a[i].style.marginRight="285px";
}

//Creo lo spazio per il faccinatort
a = getElementsByClass('editor_smiliebox');
for(i=0;i<a.length;i++){
a[i].style.border ="0px dotted green";
a[i].style.marginTop ="-385px";
a[i].style.width="265px";
a[i].style.height="365px";
a[i].innerHTML= versione + "<br>" +  a[i].innerHTML;
}


//Creo uno Script che andrà ad aggiungersi all'head
    var scriptCode = new Array();  
    scriptCode.push('function scrivi(argomento){'        );
    scriptCode.push('  document.getElementById("copiaggio").value="[IMG]" + argomento + "[/IMG]";    '  );
	scriptCode.push('  document.getElementById("copiaggio").select();    '  );
    scriptCode.push('   }   '  );															

//Aggiunto all'head
    var script = document.createElement('script');    
    script.innerHTML = scriptCode.join('\n');         
    scriptCode.length = 0;                              
    document.getElementsByTagName('head')[0].appendChild(script); 

//Inserisco le varie faccine
 var  newDiv = document.createElement("div");
newDiv.innerHTML = controllo;
var  my_div = document.getElementById("vB_Editor_001_smiliebox");
  my_div.parentNode.insertBefore(newDiv, my_div);
  

//Nel caso qualcuno volesse un valore di default..
//document.getElementsByTagName("textarea")[0].value="Pingu nabbo :D";