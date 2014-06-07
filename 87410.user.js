// ==UserScript==
// @name           MZ BBCode
// @include        http://*managerzone.*
// ==/UserScript==

// Functions

function locationonsite() {

	var path = window.location.href;
	this.locationOnSite = null;

	if ((path.search(/managerzone/i) != -1) &&
	(path.search(/\/iframes\//i) == -1) &&
	(path.search(/\/ajax_com\//i) == -1) &&
	(path.search(/\/dynamic.managerzone.com\//i) == -1) &&
	(path.search(/\/static.managerzone.com\//i) == -1) &&
	(document.getElementById('logout_etc') != null))

	{

		this.locationOnSite = 'another';

		if (path.search(/sub=topics/i) != -1)
			this.locationOnSite = 'topics';
		else if (path.search(/topic_id=/i) != -1)
			this.locationOnSite = 'topic';
		else if (path.search(/p=guestbook/i) != -1)
			this.locationOnSite = 'guestbook';
		else if (path.search(/sub=board/i) != -1)
			this.locationOnSite = 'leagueboard';

	}


}

function setsport() {

	var logostyle = getComputedStyle(document.getElementById('mz_logo'), null);

	if (logostyle.backgroundImage.search(/soccer/i) == -1) {

		this.sport = 'hockey';
		this.sport_id = 2;

	} else {

		this.sport = 'soccer';
		this.sport_id = 1;

	}


}



function addimage() {

	var image;
	image = prompt('Enter image URI/link');
	var attempt;
	attempt = 0;
	var preuri = '[image url=';
	var posuri = ']';
	var output = '';

	if (image != '' || image != null) {

		img = new Image();
		img.src = image;

		if ((img.height == 0) || (img.width==0)) {

			while(!((img.height == 0) || (img.width == 0)) && attempt < 5) {

				for (k = 0; k < 100; k++) {}
				img.src = image;
			}

		}

		if ((img.height == 0) || (img.width==0)) {

			alert('The image: '+image+' doesn\'t exist.');

		} else {

			output += preuri + image + posuri;			
                        message.value = message.value + output;

		}

	}

}

// Array

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
		'10' : 'http://img99.imageshack.us/img99/3879/childish.png',
		'11' : 'http://img192.imageshack.us/img192/200/heartrd.png',
		'12' : 'http://img22.imageshack.us/img22/9094/thumbup.png',
		'13' : 'http://img197.imageshack.us/img197/5355/thumbdowni.png'

};

// Start outputting

locationonsite();
//setsport(); - Not in use

	var table;
	var newrow;
	var message;

	if (this.locationOnSite == 'topic') {

		table = document.getElementById('forumform').getElementsByTagName('table')[0];
		newrow = table.insertRow(2);
		message = document.getElementsByName('message')[0];
		toolbar = '<td valign="top">BBCode</td><td style="background-color: transparent;">';

	}

	if (this.locationOnSite == 'topics') {

		table = document.getElementsByName('forumform')[0].parentNode;
		newrow = table.insertRow(2);
		message = document.getElementsByName('message')[0];
		toolbar = '<td valign="top">BBCode</td><td style="background-color: transparent;">';

	}

	if (this.locationOnSite == 'guestbook') {

		table = document.getElementsByName('writeForm')[0].parentNode.parentNode.parentNode.parentNode;
		newrow = table.insertRow(0);
		message = document.getElementsByName('msg')[0];
		toolbar = '<td style="background-color: transparent; padding: 25px 0 0 203px;">';

	}

	if (this.locationOnSite == 'leagueboard') {

		table = document.getElementById('writeform').parentNode.parentNode.parentNode.parentNode;
		newrow = table.insertRow(0);
		message = document.getElementsByName('msg')[0];
		toolbar = '<td style="background-color: transparent; padding: 25px 0 0 103px;">';

	}

document.addEventListener("click", function(event) {
  	switch(event.target.id)
	{
		case "btnaddImagen": 
			addImagen('message');
			break;
		case "btnnegrita": 
			armaCodigo('b','message');
			break;
		case "btncursiva": 
			armaCodigo('i','message');
			break;
		case "btnsubrayado": 
			armaCodigo('u','message');
			break;
		case "btnparrafo": 
			armaCodigo('p','message');
			break;
		case "btnlista": 
			armaCodigo('li','message');
			break;
		case "btnaddImagen2": 
			addImagen('msg');
			break;
		case "btnnegrita2": 
			armaCodigo('b','msg');
			break;
		case "btncursiva2": 
			armaCodigo('i','msg');
			break;
		case "btnsubrayado2": 
			armaCodigo('u','msg');
			break;

	if (event.target.id == "smiley?"+i) {

		message.value = message.value + '[image url=' + smileys[i] + ']';

	}

}, true);

if (this.locationOnSite == 'topic') {

	var id;
	var name;
	var Name = new Array();
	var TDs = document.getElementsByTagName('TD');
	var postcell = new Array();
	var userdatacell;

	for (row = 0; row < TDs.length; row++) {

		if (TDs[row].className == 'listsecondary') {

			if (TDs[row].childNodes[1].tagName == 'TABLE') {

				postcell[row] = TDs[row].parentNode.parentNode.parentNode.rows[1].cells[0].childNodes[1].rows[1].cells[0].childNodes[0].innerHTML;
				userdatacell = TDs[row].parentNode.parentNode.parentNode.rows[1].cells[0].childNodes[1].rows[0].cells[0];
				outputcell = TDs[row].parentNode.parentNode.parentNode.rows[1].cells[0].childNodes[1].rows[0].cells[0];

				if (userdatacell.childNodes[3].tagName == "A") {

					id = userdatacell.childNodes[3].href.split("&")[1].replace("uid=", "");
					name = userdatacell.childNodes[3].text;
					Name[row] = userdatacell.childNodes[3].text;

				} else {

					id = userdatacell.childNodes[5].href.split("&")[1].replace("uid=", "");
					name = userdatacell.childNodes[5].text;
					Name[row] = userdatacell.childNodes[5].text;

				}

				outputcell.innerHTML = outputcell.innerHTML +'&nbsp;<img id="quote?'+row+'" src="http://img842.imageshack.us/img842/50/071233glossyspaceiconal.png" alt="Quote message" title="Quote message" style="border: none; position: relative; bottom: 1px; cursor: pointer; float: right;">';
				outputcell.innerHTML = outputcell.innerHTML +'<a href="/?p=guestbook&uid='+id+'"><img src="http://managerzone.com/img/hockey/reply_guestbook.gif" alt="Guestbook of '+name+'" title="Guestbook of '+name+'" style="border: none; position: relative; top: 2px; float: right;"></a>';

			}

		}

	}

}
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/botones/negrita_btn2.png' onmouseover='this.src=\"http://i915.photobucket.com/albums/ac355/ccc_vader/botones/negrita_btn.png\"' onmouseout='this.src=\"http://i915.photobucket.com/albums/ac355/ccc_vader/botones/negrita_btn2.png\"' title='Negrita' alt='Negrita' id='btnnegrita'/>&nbsp;";  
toolbar += '<a id="bbcode?b" style="cursor: pointer;"><img src="http://img14.imageshack.us/img14/5343/formattextbold.png" title="Bold"></a> ';
toolbar += '<a id="bbcode?i" style="cursor: pointer;"><img src="http://img14.imageshack.us/img14/5343/formattextbold.png" border="0"/></a>Italic ';
toolbar += '<a id="bbcode?u" style="cursor: pointer;"><img src="http://img14.imageshack.us/img14/5343/formattextbold.png">Underline<img src="http://img14.imageshack.us/img14/5343/formattextbold.png"></a><img src="http://img14.imageshack.us/img14/5343/formattextbold.png"> ';
toolbar += '<a id="bbcode?li" style="cursor: pointer;">List</a> ';
toolbar += '<a id="bbcode?p" style="cursor: pointer;">Paragraph</a> ';
toolbar += '<a id="image" style="cursor: pointer;" title="Restricted to Club Members">Add image</a><br>';
toolbar += '<img id="smiley?1" src="'+smileys[1]+'" alt=":)" style="border: none; cursor: pointer; margin-top: 4px;"> ';
toolbar += '<img id="smiley?2" src="'+smileys[2]+'" alt=";)" style="border: none; cursor: pointer;"> ';
toolbar += '<img id="smiley?3" src="'+smileys[3]+'" alt=":(" style="border: none; cursor: pointer;"> ';
toolbar += '<img id="smiley?4" src="'+smileys[4]+'" alt="^^" style="border: none; cursor: pointer;"> ';
toolbar += '<img id="smiley?5" src="'+smileys[5]+'" alt="o_0" style="border: none; cursor: pointer;"> ';
toolbar += '<img id="smiley?6" src="'+smileys[6]+'" alt="&gt;:)" style="border: none; cursor: pointer;"> ';
toolbar += '<img id="smiley?7" src="'+smileys[7]+'" alt="$)" style="border: none; cursor: pointer;"> ';
toolbar += '<img id="smiley?8" src="'+smileys[8]+'" alt="X|" style="border: none; cursor: pointer;"> ';
toolbar += '<img id="smiley?9" src="'+smileys[9]+'" alt=":/" style="border: none; cursor: pointer;"> ';
toolbar += '<img id="smiley?10" src="'+smileys[10]+'" alt=":&lt;" style="border: none; cursor: pointer;"> ';
toolbar += '<img id="smiley?11" src="'+smileys[11]+'" alt="&lt;3" style="border: none; cursor: pointer;"> ';
toolbar += '<img id="smiley?12" src="'+smileys[12]+'" alt="+" style="border: none; cursor: pointer;"> ';
toolbar += '<img id="smiley?13" src="'+smileys[13]+'" alt="-" style="border: none; cursor: pointer;">';

newrow.innerHTML = toolbar;

if (window.location.href.search('sub=topic') >= 0 && window.location.href.search('sub=topics') < 0) {

	alltds=document.getElementsByTagName('td');

	for (i = 0; i < alltds.length; i++) {

		if (alltds[i].innerHTML.search(/<.*>/) < 0 || alltds[i].innerHTML.substr(0,29)== '<div style="overflow: auto;">') {

			alltds[i].innerHTML=alltds[i].innerHTML.replace("⊂","&amp;sub");
/*			alltds[i].innerHTML=alltds[i].innerHTML.replace('/(?<=^|\s)(http:\/\/|https:\/\/|ftp:\/\/)(([-a-zA-Z0-9_]+\.)*[-a-zA-Z0-9_]+\.[-a-zA-Z0-9_]{2,8}[^\s]*)(?=\s|$)/','<a href="$&" target="_blank">$&</a>');*/
			alltds[i].innerHTML=alltds[i].innerHTML.replace("http://www.managerzone.com/?p","?p");
			alltds[i].innerHTML=alltds[i].innerHTML.replace("http://managerzone.com/?p","?p");

		}

	}

	alltds=document.getElementsByClassName('separate');

	for (i = 0; i < alltds.length; i++) {

		alltds[i].innerHTML=alltds[i].innerHTML.replace("⊂","&amp;sub");
/*		alltds[i].innerHTML=alltds[i].innerHTML.replace(/(?:^|[^"'])((ftp|http|https|file):\/\/[\S]+(\b|$))/gim,'<a href="$&" target="_blank">$&</a>');*/
		alltds[i].innerHTML=alltds[i].innerHTML.replace("http://www.managerzone.com/?p","?p");
		alltds[i].innerHTML=alltds[i].innerHTML.replace("http://managerzone.com/?p","?p");

	}

}