// ==UserScript==
// @name          Custom Smilies v2 for NGI.IT Forum
// @namespace     http://gaming.ngi.it/forumdisplay.php?f=14
// @description   Adds a Link to "Quick Reply" and Custom Emotions to vBulletin
// @include       http://gaming.ngi.it*showthread.php*
// @include       http://gaming.ngi.it*misc.php*
// ==/UserScript==

// Author: Nightmare aka [NiGhTmArE] aka Nigh7mar3
// Date Created: 11-03-2007
// Last Update:  28-07-2009
// Commenti, Domande, Me la vuoi dare? la_fabio AT hotmail DOT com


/**********************************
 * Start Custom Smilies Variables *
 **********************************/

// Per aggiungere una emo Inserire "Nome|link",
var allSmilesData = [
					 "Pok|http://b.imagehost.org/0284/hjfhj.gif",
					 "Pipecheer|http://img17.imageshack.us/img17/5931/festal.gif",
					 "Pipemazza|http://img177.imageshack.us/ifs/6059/img360/1/450vq7.gif",
					 "Pipaura|http://img81.imageshack.us/img81/3103/hide.gif",
					 "Mad|http://emoticons4u.com/mad/371.gif",
					 "Asdpipe|http://img258.imageshack.us/img258/1041/asdfacevi2.gif",
					 "Asdasdpipe|http://img301.imageshack.us/img301/5281/ncasd.gif",
					 "Asdargh|http://img18.imageshack.us/img18/3682/h5h8ftawzymx7myfdgjjd1r.gif",
					 "Asdno|http://img114.imageshack.us/img114/1562/nonoasd.gif",
					 "Predic|http://www.smileyarena.com/emoticons/Emotions/Angry/angryhit.gif",
					 "Influenza|http://www.smileyarena.com/emoticons/Emotions/Sick/flu1.gif",
					 "FintoSleep|http://www.smileyarena.com/emoticons/Emotions/Sleepy/fallasleap.gif",
					 "Yawn|http://www.smileyarena.com/emoticons/Emotions/Sleepy/sleep29.gif",
					 "ahahduepuntipipe|http://www.smileyarena.com/emoticons/Emotions/Laught/laught02.gif",
					 "zasd|http://img96.imageshack.us/img96/2645/untitled32ds.gif",
					 "Dentonone 2|http://utenti.lycos.it/m4st3rf4k3/blahdent.gif",
					 "Nono|http://www.discutere.it/images/smilies/Pazienza.gif",
					 "Swear 2|http://www.calshop.biz/smiles/furiosi.gif",
					 "Look|http://img261.imageshack.us/img261/8836/omgvv9qs1kr3.gif",
					 "Goodboy|http://img134.imageshack.us/img134/845/goodboyfy0.gif",
					 "Stai Fuori|http://img129.echo.cx/img129/3821/tu6fuori3av.gif",
					 "Cool|http://emoticons4u.com/cool/018.gif",
					 "Denftone Win|http://img228.imageshack.us/img228/3118/mexerullakx7.gif",
					 "Denftone Rulez|http://img145.imageshack.us/img145/6809/avatar614231.gif",
					 "Denftone Cool|http://img145.imageshack.us/img145/6809/avatar614231.gif",
					 "Denftone Dunno|http://img200.imageshack.us/img200/3204/dentone2.gif",
					 "Distubed Saw|http://img362.imageshack.us/img362/2222/epiomicidago8.gif",
					 "Afraid Saw|http://img188.imageshack.us/img188/5589/afraidsawxd2.gif",
					 ":v|http://img261.imageshack.us/img261/9509/27515279ip5.gif",
					 ":v|http://img224.imageshack.us/img224/7667/avvwj0.gif",
					 ":v mazza|http://img411.imageshack.us/ifs/116/img360/4/vmmaduc8.gif",
					 "Snobz|http://img100.imageshack.us/img100/4634/snobbz3.gif",
					 "KKK|http://img223.imageshack.us/img223/6586/kkky.gif",
					 "Sese|http://img10.imageshack.us/img10/9276/sherlockb.gif",
					 "Mad mazza|http://img222.imageshack.us/img222/2036/mmaddj0.gif",
					 "FFFUUU-|http://img14.imageshack.us/img14/6605/79822474.gif",
					 "Pedobear|http://img509.imageshack.us/img509/3990/35a6ae1.gif",
					];

/**********************************
 *  End Custom Smilies Variables  *
 **********************************/
vbEditorType='';

if (document.location.href.indexOf('showthread.php') >= 0) {
	vbEditorType='vB_Editor_QR';
	moreSmiles();
}else if (document.location.href.indexOf('misc.php') >= 0) {
	vbEditorType='vB_Editor_001';
	AggiungiSmiles();
}

function AggiungiSmiles() {
	// Crea tutti gli oggetti immagine per gli smiles
	var allSmiles = new Array();
	var allSmilesDesc = new Array();
	for (var i=0; i < allSmilesData.length; i++) {
		allSmilesTitle	=allSmilesData[i].split("|")[0];
		allSmilesLink	=allSmilesData[i].split("|")[1];
		// Make new Image
		img = document.createElement('img');
		img.setAttribute('src', allSmilesLink);
		img.setAttribute('border', 0);
		img.setAttribute('title', allSmilesTitle);
		img.setAttribute('alt', '[IMG]'+allSmilesLink+'[/IMG]');
		img.setAttribute('id', 'smilie_'+999+i);

		allSmilesDesc.push(allSmilesTitle);
		allSmiles.push(img);
	}

	i=1;
	table=document.getElementById('smilietable');
	riga=document.getElementById('smilietable').insertRow(1);//table.rows.length-1
	cella=riga.insertCell(0);
	cella.setAttribute('class', 'thead');
	cella.setAttribute('align', 'center');
	cella.setAttribute('colspan', '4');
	cella.style.backgroundColor = '#ff0000';
	cella.innerHTML='<a href="http://gaming.ngi.it/forum/member.php?u=6415" title="Nightmare Pwna :sisi:">Nightmare</a> Userjs Custom Smiles <img src="http://gaming.ngi.it/forum/images/ngismiles/metal.gif"/>';

	for (var j=0; j < allSmiles.length; j++) {
		riga=document.getElementById('smilietable').insertRow(1+i);//table.rows.length-1

		cella1=riga.insertCell(0);
		cella2=riga.insertCell(1);
		cella3=riga.insertCell(2);
		cella4=riga.insertCell(3);

		if(i%2==1){
			class='alt1';
		}else{
			class='alt2';
		}
		i++;

		cella1.setAttribute('class', class);
		cella2.setAttribute('class', class);
		cella3.setAttribute('class', class);
		cella4.setAttribute('class', class);

		cella1.appendChild(allSmiles[j]);
		cella2.innerHTML=allSmilesDesc[j];
		j++;
		if(allSmiles[j]!=null){
			cella3.appendChild(allSmiles[j]);
			cella4.innerHTML=allSmilesDesc[j];
		}
	}

	riga=document.getElementById('smilietable').insertRow(i+1);//table.rows.length-1
	cella=riga.insertCell(0);
	cella.setAttribute('class', 'thead');
	cella.setAttribute('align', 'center');
	cella.setAttribute('colspan', '4');
	cella.style.backgroundColor = '#ff0000';

	randomnum = Math.floor(Math.random()*5);
	var sponsor_array=new Array(5);
	sponsor_array[0]='<a href="http://userbarmaker.com/" title="Sponsored by userbarmaker.com - Crea la tua Userbar!" target="_blank">Userbarmaker.com</a> - Giochi Flash';
	sponsor_array[1]='<a href="http://www.coinhop.com/" title="Sponsored by Coinhop.com - Giochi Flash Scimmia!" target="_blank">Coinhop.com</a> - Giochi Flash';
	sponsor_array[2]='<a href="http://musinvi.com/" title="Sponsored by Musinvi.com - Video Musicali Scimmia!" target="_blank">Musinvi.com</a> - Video Musicali';
	sponsor_array[3]='<a href="http://www.coinhop.com/" title="Sponsored by Coinhop.com - Giochi Flash Scimmia!" target="_blank">Coinhop.com</a> - Giochi Flash';
	sponsor_array[4]='<a href="http://musinvi.com/" title="Sponsored by Musinvi.com - Video Musicali Scimmia!" target="_blank">Musinvi.com</a> - Video Musicali';
	sponsor = sponsor_array[randomnum];

	cella.innerHTML='Sponsored by '+sponsor+' <img src="http://gaming.ngi.it/forum/images/ngismiles/monkey.gif"/>';
}

function moreSmiles() {
	// Add popup for smileys
	moreSmilesDiv = document.createElement('div');
	moreSmilesDiv.id = "smiles";
	moreSmilesDiv.style.clear = "both";
	moreSmilesDiv.align = "right";

	a = document.createElement('a');
	a.setAttribute('href', '#');
	a.onclick = "vB_Editor['"+vbEditorType+"'].open_smilie_window(500, 500); return false;";
	a.setAttribute('title', 'Add Smiles');
	a.appendChild(document.createTextNode('Add Smiles'));

	moreSmilesDiv.appendChild(a);

	txtArea = getElementsByClassName(document.body, 'controlbar')[0];
	txtArea.parentNode.appendChild(moreSmilesDiv);
}

/*********************
 * General Functions *
 *********************/

function getElementsByClassName(node, classname) {
     var a = [];
     var re = new RegExp('\\b' + classname + '\\b');
     var els = node.getElementsByTagName("*");
     for(var i=0,j=els.length; i<j; i++)
         if(re.test(els[i].className))a.push(els[i]);
     return a;
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


/*******
 * CSS *
 *******/

//addGlobalStyle('#id {border: none; margin: 2px;}');

/****************************
 * Add Event On New Smilies *
 ****************************/
if (document.location.href.indexOf('vB_Editor_QR') >= 0) {
	vbEditorType='vB_Editor_QR';
}else if(document.location.href.indexOf('vB_Editor_QR') >= 0){
	vbEditorType='vB_Editor_001';
}
window.opener.vB_Editor[vbEditorType].init_smilies(fetch_object('smilietable'));