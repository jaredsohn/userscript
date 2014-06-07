// ==UserScript==
// @name           MZ BBCode Forum v2
// @include        http://*managerzone.*
// ==/UserScript==

function addimage() {

	var image;
	image = prompt('Enter image URI/link');
	var attempt;
	attempt = 0;
	var preuri = '[image url=';
	var posuri = ']';
	var output = '';

	if(image != '') {

		img = new Image();
		img.src = image;

		if ((img.height == 0) || (img.width==0)) {

			while(!((img.height == 0) || (img.width == 0)) && attempt < 5) {

				for (j = 0; j < 100; j++) {}
				img.src = image;
			}

		}

		if ((img.height == 0) || (img.width==0)) {

			alert('The image: '+image+' doesn\'t exist.');

		} else {

			output += preuri + image + posuri;			
                        document.getElementsByName('message')[0].value = document.getElementsByName('message')[0].value + output;

		}

	}

}

var smileys = {

		'1' : 'http://img248.imageshack.us/img248/5298/smiling.png',
		'2' : 'http://img218.imageshack.us/img218/9066/winking.png',
		'3' : 'http://img686.imageshack.us/img686/7121/unhappy.png',
		'4' : 'http://img194.imageshack.us/img194/7439/happy2e.png',
		'5' : 'http://img4.imageshack.us/img4/8593/huheo.png',
		'6' : 'http://img535.imageshack.us/img535/9836/spiteful.png',
		'7' : 'http://img638.imageshack.us/img638/2920/greedy.png',
		'8' : 'http://img686.imageshack.us/img686/4018/gah.png',
		'9' : 'http://img99.imageshack.us/img99/8879/uncertain.png',
		'10' : 'http://pic.leech.it/i/a7fdc/f85c52b2wart.png',
		'11' : 'http://pic.leech.it/i/d0b38/4e673113schleimer.gif',
		'12' : 'http://pic.leech.it/i/b16ec/278975eoops.gif',
		'13' : 'http://pic.leech.it/i/f9be0/3a0732a0a1oh.gif',
		'14' : 'http://i50.tinypic.com/2cie2rt.jpg',
		'15' : 'http://i50.tinypic.com/dz6noo.jpg',
		'16' : 'http://i46.tinypic.com/2hg5ydj.jpg',
		'17' : 'http://i46.tinypic.com/23wwt3b.jpg',
		'18' : 'http://i45.tinypic.com/9rkkkj.jpg',
		'19' : 'http://i45.tinypic.com/9rkkkj.jpg',
		'20' : 'http://i49.tinypic.com/ej8rhc.jpg',
		'21' : 'http://i46.tinypic.com/a3do8z.jpg',
		'22' : 'http://i45.tinypic.com/fcu0hv.jpg',
		'23' : 'http://i45.tinypic.com/30cyk9c.jpg',
		'24' : 'http://i50.tinypic.com/sqk01s.jpg',
		'25' : 'http://i49.tinypic.com/2ch75au.jpg',
		'26' : 'http://i47.tinypic.com/2zdvs00.jpg',
		'27' : 'http://i49.tinypic.com/1zv30og.jpg',
		'28' : 'http://i50.tinypic.com/rasw91.jpg',
		'29' : 'http://pic.leech.it/i/cee82/3ab56801langweilig.png',
		'30' : 'http://i49.tinypic.com/atvpj5.jpg',
		'31' : 'http://i47.tinypic.com/2m32slt.jpg',
		'32' : 'http://pic.leech.it/i/bc2bd/a6bf162froh.gif',
		'33' : 'http://pic.leech.it/i/e5c2e/a61a82dafettgrins.gif',
		'34' : 'http://pic.leech.it/i/10228/7e759e7compi.gif',
		'35' : 'http://i48.tinypic.com/5uobbk.jpg',
		'36' : 'http://i47.tinypic.com/1z14pcl.jpg',
		'37' : 'http://pic.leech.it/i/b49a3/8c053cejjjump.gif',
		'38' : 'http://pic.leech.it/i/9a0ca/58520434love2.gif',
		'39' : 'http://pic.leech.it/i/715af/ae0f02fbhupf.gif',
		'40' : 'http://pic.leech.it/i/7e6b9/e3bbc721hoff.gif',
		'41' : 'http://pic.leech.it/i/ce185/90668abcgutenacht.gif',
		'42' : 'http://pic.leech.it/i/8969d/5bc4d94doof.gif',
		'43' : 'http://pic.leech.it/i/21e85/b407d850dafuer.gif'


};

document.addEventListener("click", function(event) {

	if (event.target.id == "image") {

		addimage();

	}

	var i = event.target.id.split("?")[1];

	if (event.target.id == "bbcode?"+i) {

		obj = document.getElementsByName('message')[0];
		var start = obj.selectionStart;
		var end = obj.selectionEnd;
		obj.value = obj.value.substr(0, start) + '['+i+']' + obj.value.substr(start, end - start) + '[/'+i+']' + obj.value.substr(end, obj.value.length);

	}

	if (event.target.id == "smiley?"+i) {

		document.getElementsByName('message')[0].value = document.getElementsByName('message')[0].value + '[image url=' + smileys[i] + ']';
	}

  	switch(event.target.id)
	{
		case "mzh": 
			window.location="?p=forum&sub=topics&forum_id=65&sport=soccer";
			break;
		case "da": 
			window.location="?p=forum&sub=topics&forum_id=60&sport=soccer";
			break;
		case "pyr": 
			window.location="?p=forum&sub=topics&forum_id=63&sport=soccer";
			break;
                case "fed": 
			window.location="?p=forum&sub=topics&forum_id=62&sport=soccer";
			break;
		case "rep": 
			window.location="?p=training_report";
			break;
		case "jug": 
			window.location="?p=match&sub=played";
			break;

	}

}, true);

// ==Accesos==
var amzh = document.createElement('img');
amzh.setAttribute('src', 'http://pic.leech.it/i/73abc/1cdda39ftalk.png');
amzh.setAttribute('title', 'Vorbe despre MZ');
amzh.setAttribute('id', 'mzh');
document.getElementById('logout_etc').appendChild(amzh);

var apyr = document.createElement('img');
apyr.setAttribute('src', 'http://pic.leech.it/i/c9adb/86774001fragen.png');
apyr.setAttribute('title', 'Intrebari si Raspunsuri');
apyr.setAttribute('id', 'pyr');
document.getElementById('logout_etc').appendChild(apyr);

var ada = document.createElement('img');
ada.setAttribute('src', 'http://pic.leech.it/i/5c00c/ea53343free.png');
ada.setAttribute('title', 'Discutie Libera');
ada.setAttribute('id', 'da');
document.getElementById('logout_etc').appendChild(ada);

var afed = document.createElement('img');
afed.setAttribute('src', 'http://pic.leech.it/i/3e96e/f22b46e9vorschlag.png');
afed.setAttribute('title', 'Imbunatatiri');
afed.setAttribute('id', 'fed');
document.getElementById('logout_etc').appendChild(afed);

var arep = document.createElement('img');
arep.setAttribute('src', 'http://i49.tinypic.com/4sz8rb.jpg');
arep.setAttribute('title', 'Training Report');
arep.setAttribute('id', 'rep');
document.getElementById('logout_etc').appendChild(arep);

var ajug = document.createElement('img');
ajug.setAttribute('src', 'http://i46.tinypic.com/bdwgab.jpg');
ajug.setAttribute('title', 'played matches');
ajug.setAttribute('id', 'jug');
document.getElementById('logout_etc').appendChild(ajug);

if (window.location.href.search('sub=topic') >= 0 && window.location.href.search('sub=topics') < 0) {

	var table = document.getElementsByName('confirmvalue')[0].parentNode;

} else {

	var table = document.getElementsByName('forumform')[0].parentNode;

}

newrow = table.insertRow(2);
botones = '<td valign="top">BBCode</td><td style="background-color: transparent;">';
botones += '<a id="bbcode?b" style="cursor: pointer;">Fett</a> ';
botones += "<a id='bbcode?i' style=\"cursor: pointer;\">Kursiv</a> ";
botones += "<a id='bbcode?u' style=\"cursor: pointer;\">Unterstreichen</a> ";
botones += "<a id='bbcode?li' style=\"cursor: pointer;\">Auflisten</a> ";
botones += "<a id='bbcode?p' style=\"cursor: pointer;\">Absatz</a> ";
botones += "<a id='image' style=\"cursor: pointer;\" title='Nur fuer Klub Mitglieder'>Bild einfuegen</a><br>";
botones += "<img id='smiley?1' src='http://img248.imageshack.us/img248/5298/smiling.png' alt=':)' style='border: none; cursor: pointer; margin-top: 4px;' title=':)'> ";
botones += "<img id='smiley?2' src='http://img218.imageshack.us/img218/9066/winking.png' alt=';)' style='border: none; cursor: pointer;' title=';)'> ";
botones += "<img id='smiley?3' src='http://img686.imageshack.us/img686/7121/unhappy.png' alt=':(' style='border: none; cursor: pointer;' title=':('> ";
botones += "<img id='smiley?4' src='http://img194.imageshack.us/img194/7439/happy2e.png' alt='^^' style='border: none; cursor: pointer;' title='^^'> ";
botones += "<img id='smiley?5' src='http://img4.imageshack.us/img4/8593/huheo.png' alt='o_0' style='border: none; cursor: pointer;' title='o_0'> ";
botones += "<img id='smiley?6' src='http://img535.imageshack.us/img535/9836/spiteful.png' alt='&gt;:)' style='border: none; cursor: pointer;' title='&gt;:)'> ";
botones += "<img id='smiley?7' src='http://img638.imageshack.us/img638/2920/greedy.png' alt='$)' style='border: none; cursor: pointer;' title='$)'> ";
botones += "<img id='smiley?8' src='http://img686.imageshack.us/img686/4018/gah.png' alt='X|' style='border: none; cursor: pointer;' title='X|'> ";
botones += "<img id='smiley?9' src='http://img99.imageshack.us/img99/8879/uncertain.png' alt=':/' style='border: none; cursor: pointer;' title=':/'> ";
botones += "<img id='smiley?10' src='http://pic.leech.it/i/a7fdc/f85c52b2wart.png' alt=':&lt;' style='border: none; cursor: pointer;' title=':&lt;'> ";
botones += "<img id='smiley?11' src='http://pic.leech.it/i/d0b38/4e673113schleimer.gif' alt='&lt;3' style='border: none; cursor: pointer;' title='&lt;3'> ";
botones += "<img id='smiley?12' src='http://pic.leech.it/i/b16ec/278975eoops.gif' alt='+' style='border: none; cursor: pointer;' title='+'> ";
botones += "<img id='smiley?13' src='http://pic.leech.it/i/f9be0/3a0732a0a1oh.gif' alt='-' style='border: none; cursor: pointer;' title='-'>";
botones += "<img id='smiley?14' src='http://i50.tinypic.com/2cie2rt.jpg' alt='+' style='border: none; cursor: pointer;' title='+'> ";
botones += "<img id='smiley?15' src='http://i50.tinypic.com/dz6noo.jpg' alt='+' style='border: none; cursor: pointer;' title='+'> ";
botones += "<img id='smiley?16' src='http://i46.tinypic.com/2hg5ydj.jpg' alt='+' style='border: none; cursor: pointer;' title='+'> ";
botones += "<img id='smiley?17' src='http://i46.tinypic.com/23wwt3b.jpg' alt='+' style='border: none; cursor: pointer;' title='+'> ";
botones += "<img id='smiley?18' src='http://i45.tinypic.com/9rkkkj.jpg' alt='+' style='border: none; cursor: pointer;' title='+'> ";
botones += "<img id='smiley?19' src='http://i50.tinypic.com/2h728f4.jpg' alt='+' style='border: none; cursor: pointer;' title='+'> ";
botones += "<img id='smiley?20' src='http://i49.tinypic.com/ej8rhc.jpg' alt='+' style='border: none; cursor: pointer;' title='+'> ";
botones += "<img id='smiley?21' src='http://i46.tinypic.com/a3do8z.jpg' alt='+' style='border: none; cursor: pointer;' title='+'> ";
botones += "<img id='smiley?22' src='http://i45.tinypic.com/fcu0hv.jpg' alt='+' style='border: none; cursor: pointer;' title='+'> ";
botones += "<img id='smiley?23' src='http://i45.tinypic.com/30cyk9c.jpg' alt='+' style='border: none; cursor: pointer;' title='+'> ";
botones += "<img id='smiley?24' src='http://i50.tinypic.com/sqk01s.jpg' alt='+' style='border: none; cursor: pointer;' title='+'> ";
botones += "<img id='smiley?25' src='http://i49.tinypic.com/2ch75au.jpg' alt='+' style='border: none; cursor: pointer;' title='+'> ";
botones += "<img id='smiley?26' src='http://i47.tinypic.com/2zdvs00.jpg' alt='+' style='border: none; cursor: pointer;' title='+'> ";
botones += "<img id='smiley?27' src='http://i49.tinypic.com/1zv30og.jpg' alt='+' style='border: none; cursor: pointer;' title='+'> ";
botones += "<img id='smiley?28' src='http://i50.tinypic.com/rasw91.jpg' alt='+' style='border: none; cursor: pointer;' title='+'> ";
botones += "<img id='smiley?29' src='http://pic.leech.it/i/cee82/3ab56801langweilig.png' alt='+' style='border: none; cursor: pointer;' title='+'> ";
botones += "<img id='smiley?30' src='http://i49.tinypic.com/atvpj5.jpg' alt='+' style='border: none; cursor: pointer;' title='+'> ";
botones += "<img id='smiley?31' src='http://i47.tinypic.com/2m32slt.jpg' alt='+' style='border: none; cursor: pointer;' title='+'> ";
botones += "<img id='smiley?32' src='http://pic.leech.it/i/bc2bd/a6bf162froh.gif' alt='+' style='border: none; cursor: pointer;' title='+'> ";
botones += "<img id='smiley?33' src='http://pic.leech.it/i/e5c2e/a61a82dafettgrins.gif' alt='+' style='border: none; cursor: pointer;' title='+'> ";
botones += "<img id='smiley?34' src='http://pic.leech.it/i/10228/7e759e7compi.gif' alt='+' style='border: none; cursor: pointer;' title='+'> ";
botones += "<img id='smiley?35' src='http://i48.tinypic.com/5uobbk.jpg' alt='+' style='border: none; cursor: pointer;' title='+'> ";
botones += "<img id='smiley?36' src='http://i47.tinypic.com/1z14pcl.jpg' alt='+' style='border: none; cursor: pointer;' title='+'> ";
botones += "<img id='smiley?37' src='http://pic.leech.it/i/b49a3/8c053cejjjump.gif' alt='+' style='border: none; cursor: pointer;' title='+'> ";
botones += "<img id='smiley?38' src='http://pic.leech.it/i/9a0ca/58520434love2.gif' alt='+' style='border: none; cursor: pointer;' title='+'> ";
botones += "<img id='smiley?39' src='http://pic.leech.it/i/715af/ae0f02fbhupf.gif' alt='+' style='border: none; cursor: pointer;' title='+'> ";
botones += "<img id='smiley?40' src='http://pic.leech.it/i/7e6b9/e3bbc721hoff.gif' alt='+' style='border: none; cursor: pointer;' title='+'> ";
botones += "<img id='smiley?41' src='http://pic.leech.it/i/ce185/90668abcgutenacht.gif' alt='+' style='border: none; cursor: pointer;' title='+'> ";
botones += "<img id='smiley?42' src='http://pic.leech.it/i/8969d/5bc4d94doof.gif' alt='+' style='border: none; cursor: pointer;' title='+'> ";
botones += "<img id='smiley?43' src='http://pic.leech.it/i/21e85/b407d850dafuer.gif' alt='+' style='border: none; cursor: pointer;' title='+'> ";

newrow.innerHTML = botones;

if (window.location.href.search('sub=topic') >= 0 && window.location.href.search('sub=topics') < 0) {

	alltds=document.getElementsByTagName('td');

	for (i = 0; i < alltds.length; i++) {

		if (alltds[i].innerHTML.search(/<.*>/) < 0 || alltds[i].innerHTML.substr(0,29)== '<div style="overflow: auto;">') {

			alltds[i].innerHTML=alltds[i].innerHTML.replace("⊂","&amp;sub");
			/*alltds[i].innerHTML=alltds[i].innerHTML.replace(/(?:^|[^"'])((ftp|http|https|file):\/\/[\S]+(\b|$))/gim,'<a href="$&" target="_blank">$&</a>');*/
			alltds[i].innerHTML=alltds[i].innerHTML.replace("http://www.managerzone.com/?p","?p");
			alltds[i].innerHTML=alltds[i].innerHTML.replace("http://managerzone.com/?p","?p");

		}

	}

	alltds=document.getElementsByClassName('separate');

	for (i = 0; i < alltds.length; i++) {

		alltds[i].innerHTML=alltds[i].innerHTML.replace("⊂","&amp;sub");
		/*alltds[i].innerHTML=alltds[i].innerHTML.replace(/(?:^|[^"'])((ftp|http|https|file):\/\/[\S]+(\b|$))/gim,'<a href="$&" target="_blank">$&</a>');*/
		alltds[i].innerHTML=alltds[i].innerHTML.replace("http://www.managerzone.com/?p","?p");
		alltds[i].innerHTML=alltds[i].innerHTML.replace("http://managerzone.com/?p","?p");

	}

}

// ==Ir a última página==
var pathArray = window.location.href.split('&');
if(pathArray[1] == "sub=topics")
{
	var htmlCountPost = document.evaluate('/html/body/div[3]/div/div[4]/div[2]/div/div[2]/table/tbody', document, null, XPathResult.ANY_TYPE, null);
    var tablaDePost = htmlCountPost.iterateNext();
    
	for(post = 2; post < tablaDePost.rows.length; post++)
	{
		link = tablaDePost.rows[post].cells[0].childNodes[0].href;
		celda = tablaDePost.rows[post].cells[1].innerHTML;
		datosPost = celda.split(" / ");
		cantidadDePaginas = Math.floor(parseInt(datosPost[1])/50);
		nuevo = "";
		if(cantidadDePaginas > 0)
			nuevo += "<a title='Ir a la página 2' href='" + link + "&offset=50'>2</a>&#160;"
		if(cantidadDePaginas > 1)
			nuevo += "<a title='Ir a la página 3' href='" + link + "&offset=100'>3</a>&#160;"
		if(cantidadDePaginas > 2)
			nuevo += "<a title='Ir a la página 4' href='" + link + "&offset=150'>4</a>&#160;"
		if(cantidadDePaginas > 3)
			nuevo += "<a title='Ir a la última página' href='" + link + "&offset=" + (cantidadDePaginas*50) + "'>&#187;</a>"
		if(cantidadDePaginas > 0)
			nuevo = "&#160;(" + nuevo + ")";
		tablaDePost.rows[post].cells[1].innerHTML = celda + nuevo;
	}
}


// ==Acceso a GB==
var pathArray = window.location.href.split('&');
if(pathArray[1] == "sub=topic")
{
	var id;
	var nombre;
	var TDs = document.getElementsByTagName('TD');
	for(fila = 0; fila < TDs.length; fila++)
	{
		if(TDs[fila].className == 'listsecondary')
		{
			if(TDs[fila].childNodes[1].tagName == 'TABLE')
			{
				celdaSacarId = TDs[fila].parentNode.parentNode.parentNode.rows[1].cells[0].childNodes[1].rows[0].cells[0];
				if(celdaSacarId.childNodes[3].tagName == "A")
				{
					id = celdaSacarId.childNodes[3].href.split("&")[1].replace("uid=", "");
					nombre = celdaSacarId.childNodes[3].text;
				}
				else
				{
					nombre = celdaSacarId.childNodes[5].text;
					id = celdaSacarId.childNodes[5].href.split("&")[1].replace("uid=", "");
				
				}

				celdaSacarId.innerHTML = celdaSacarId.innerHTML + " <a title='GB de "+ nombre +"' href='/?p=guestbook&uid=" + id + "' style='color:black;text-decoration:none;border:1px solid;'><b>&nbsp;GB&nbsp;</b></a> ";

			}
		}
	}
}