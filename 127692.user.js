// ==UserScript==
// @name          SUDS redesigned 2
// @description	  to co dawno powinno byc zrobione
// @include       http://www.public.phitherek.cba.pl/is3_suds/*
// @exclude       http://www.public.phitherek.cba.pl/is3_suds/suds_mod.php*
// ==/UserScript==

var files = new Array();
var cats = new Array();
var cat = '';
var filei = 0;
var cati = -1;


function gup(name) {
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
 	var results = regex.exec( window.location.href );
	if( results == null )
		return "";
	else
		return results[1];
}

function szukaj(v) {
	var links = document.getElementsByClassName('link2');
	for (i in links) {
		if (links[i].firstChild.firstChild.innerHTML.toLowerCase().search(this.value.toLowerCase()) != -1) {
			//alert(links[i].firstChild.firstChild.innerHTML);
			links[i].style.display = 'table-row';

		} else {
			links[i].style.display = 'none';
		}
	}
}


function refr(cat) {
//alert(cat);
sem = gup('sem');
sem = sem ? sem : 2;
//alert(sem);
document.write('<style>\
* { padding: 0px; margin: 0px; border: 0px; font: 9pt trebuchet ms }\
html { overflow: scroll; }\
a { color: #555 }\
#main a:visited { color: #808 }\
body { color: #333 }\
#container { margin: 16px auto; width: 700px; background: #eee }\
#container { border: 1px solid #888; -moz-box-shadow: 0px 0px 15px #888; -webkit-box-shadow: 0px 0px 15px #888; box-shadow: 0px 0px 15px #888; }\
#main td { padding: 5px; }\
#main td { border-top: 1px dotted #888 }\
.category { border-top: 1px dotted black; background: #ddd; font-size: 10pt; width: 700px }\
.filename { width: 550px }\
.date { width: 150px; text-align: right; color: #888 }\
#semestry { width: 700px; margin-top: 10px }\
.sem a { text-decoration: none; display: block; padding: 8px; }\
.sem { border: 1px solid #888; border-right: 0px; background: white }\
.before, .after { border-bottom: 1px solid #888; width: 16px }\
.after { border-left: 1px solid #888; width: 100%; text-align: right; color: #888; padding-right: 5px; padding-bottom: 5px; }\
.after input { border: 1px solid #888; padding: 5px; }\
.sel { background: #ddd; margin-top: -20px; border-bottom: 0px }\
#categories { width: 700px; background: #ddd; border-bottom: 1px solid #888; padding-bottom: 10px }\
#categories td { padding: 10px; padding-bottom: 0px; font-size: 8pt }\
</style>');
	
	document.write('<div id="container">');
	document.write('<table id="semestry" cellspacing="0" cellpadding="0" border="0">');
	document.write('<tr>');
	document.write('<td class="before">&nbsp;&nbsp;&nbsp;</td>');
	document.write('<td class="sem'+(sem==1 ? ' sel' : '')+'"><a href="suds.php?sem=1">Semestr&nbsp;1</a></td>');
	document.write('<td class="sem'+(sem==2 ? ' sel' : '')+'"><a href="suds.php?sem=2">2</a></td>');
	document.write('<td class="sem'+(sem==3 ? ' sel' : '')+'"><a href="suds.php?sem=3">3</a></td>');
	document.write('<td class="sem'+(sem==4 ? ' sel' : '')+'"><a href="suds.php?sem=4">4</a></td>');
	document.write('<td class="sem'+(sem==5 ? ' sel' : '')+'"><a href="suds.php?sem=5">5</a></td>');
	document.write('<td class="sem'+(sem==6 ? ' sel' : '')+'"><a href="suds.php?sem=6">6</a></td>');
	document.write('<td class="sem'+(sem==7 ? ' sel' : '')+'"><a href="suds.php?sem=7">7</a></td>');
	document.write('<td class="sem'+(sem=='Wszystkie' ? ' sel' : '')+'"><a href="suds.php?sem=Wszystkie">Wszystkie</a></td>');
	document.write('<td class="after">szukaj: <input type="text" id="szukaj"  /></td>');
	document.getElementById('szukaj').onkeyup = szukaj;
	document.getElementById('szukaj').onblur = szukaj;
	document.getElementById('szukaj').onchange = szukaj;
	document.write('</tr>');
	document.write('</table>');
	document.write('<table id="categories" cellspacing="0" cellpadding="0" border="0">');
	document.write('<tr>');
	for (i in cats) {
		document.write('<td>&middot; <a href="suds.php?sem='+sem+'&cat='+i+'">'+cats[i]+'</a></td>');
		if (i % 3 == 2) {
			document.write('</tr><tr>');
		}
	}
	document.write('</tr>');
	document.write('</table>');
	document.write('<table id="main" cellspacing="0" cellpadding="0" border="0">');
	document.write('<tr><td>');
	document.write('</td></tr>');
	for (i in cats) {
	if (cat == -1 || cat == i) {
		document.write('<tr><td class="category" colspan="2">'+cats[i]+'</td></tr>');
		for (j in files[i]) {
			document.write('<tr class="link2"><td class="filename"><a href="'+files[i][j][1]+'">'+files[i][j][0]+'</a></td><td class="date">'+files[i][j][2]+'</td></tr>');
		}
	}
	}
	document.write('</table>');
	document.write('</div');
}


function redesign() {
	var tags = document.body.getElementsByTagName('*');
	
	for (i in tags) {
		if (tags[i].className == 'suds_category') {
			//document.write(tags[i].innerHTML+'<br/>');
			cat = tags[i].innerHTML.substr(11).replace(/semestr:\ /i, 'semestr:&nbsp;');
			cati++;
			filei = 0;
			files.push(new Array());
			cats.push(cat);
		}
		else if (tags[i].className == 'suds_link_ok') {
			//document.write(tags[i].innerHTML+'<br/>');
			files[cati].push([tags[i].innerHTML, tags[i].href, '']);
		}
		else if (tags[i].className == 'suds_date') {
			//document.write(tags[i].innerHTML+'<br/>');
			files[cati][filei][2] = tags[i].innerHTML.substr(27);
			filei++;
		}
		//alert(tags[i]);
		//document.write(tags[i].tagName);
	}
	cat = gup('cat')
	cat = cat ? cat : -1;
	refr(cat);

}

var domLoaded = function (callback) {
    /* Internet Explorer */
    /*@cc_on
    @if (@_win32 || @_win64)
        document.write('<script id="ieScriptLoad" defer src="//:"><\/script>');
        document.getElementById('ieScriptLoad').onreadystatechange = function() {
            if (this.readyState == 'complete') {
                callback();
            }
        };
    @end @*/
    /* Mozilla, Chrome, Opera */
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', callback, false);
    }
    /* Safari, iCab, Konqueror */
    if (/KHTML|WebKit|iCab/i.test(navigator.userAgent)) {
        var DOMLoadTimer = setInterval(function () {
            if (/loaded|complete/i.test(document.readyState)) {
                callback();
                clearInterval(DOMLoadTimer);
            }
        }, 10);
    }
    /* Other web browsers */
    window.onload = callback;
};


domLoaded(redesign);