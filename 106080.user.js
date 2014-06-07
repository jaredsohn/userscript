// ==UserScript==
// @name           Ikariam Building List
// @author         Raymon
// @description    Adds a building list in the left sidebar on the current city page.
// @version        1.1.1
// @include        http://s*.*.ikariam.*/*
// @exclude        http://board.*.ikariam.*/*   
// ==/UserScript==

/* Options and Styles */
css='#reslvl {\
	margin:2px 2px;\
}\
#reslvl span {\
	float:left;\
	width:100px;\
}\
.build{\
	background-color:transparent;\
	font-weight:normal;\
}\
.build span{\
	color:#542C0F;\
}\
.build a{\
	text-decoration:none;\
}\
.build:hover {\
	font-weight:bold;\
}\
.buildup{\
	background-color:transparent;\
	font-weight:normal;\
}\
.buildup span{\
	color:#2447B2;\
}\
.buildup a{\
	text-decoration:none;\
}\
.buildup:hover {\
	font-weight:bold;\
	}\
.buildmax{\
	background-color:transparent;\
	font-weight:normal;\
}\
.buildmax span{\
	color:#D11919;\
}\
.buildmax a{\
	text-decoration:none;\
}\
.buildmax:hover {\
	font-weight:bold;\
}\
.buildname{\
	float:left;\
	width:60%;\
	}\
hr {\
	color: #542C0F;\
	background-color: #542C0F;\
	height: 1px;\
	margin-left: 3px;\
	margin-right: 3px;\
	}\
';


/* End of Options and Styles */

/* function to add style */

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


function setDomainOpts(){
	var split1 = location.href.split('ikariam.');
	var split2 = split1[1].split('/');
	var ext = split2[0];
	var opts = new Array();
	opts['ext'] = ext;
	if ( ext == 'fr' ){
		opts['lvl'] = ' Niveau';
		opts['inactives'] = 'Inactifs';	
	}
	else if ( ext == 'de' ){
		opts['lvl'] = ' Stufe';
		opts['inactives'] = 'Inactives';	
	}
	else if ( ext == 'nl' ){
		opts['lvl'] = ' Level';
		opts['inactives'] = 'Inactives';	
	}
	else if ( ext == 'com' ){
		opts['lvl'] = ' Level';	
		opts['inactives'] = 'Inactieven';
	}
	else if ( ext == 'es' ){
		opts['lvl'] = ' Nivel';
		opts['inactives'] = 'Inactives';
	}
	else if ( ext == 'gr' ){
		opts['lvl'] = 'ÎµÏ€Î¯Ï€ÎµÎ´Î¿';
		opts['inactives'] = 'Inactives';
	}
	else {
		opts['lvl'] = ' Level';	
		opts['inactives'] = 'Inactives';	
	}		
	return opts;
}

opts = setDomainOpts();

/* Embedded functions  http://wiki.greasespot.net/Code_snippets#Embed_a_function_in_the_current_page*/

function embedFunction(s) {
	document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

if( document.getElementById('city') ){
	addGlobalStyle(css);

	table = document.getElementById('mainview').getElementsByTagName('a');

	var table1 = new Array();

	var torder = new Array();
	var tclass = new Array();
	var lmax   = new Array(); /* array with buildings max level, according to Ikariam Help*/
	lmax['academy'] = 32;
	lmax['embassy'] = 32;
	lmax['workshop-army'] = 32;
	lmax['safehouse'] = 32;
	lmax['barracks'] = 50;
	lmax['shipyard'] = 32;	
	lmax['branchOffice'] = 32;		
	lmax['warehouse'] = 40;
	lmax['townHall'] = 48;
	lmax['wall'] = 48;
	lmax['museum'] = 30;
	lmax['port'] = 48;
	lmax['palaceColony'] = 11;
	lmax['tavern'] = 50;
	lmax['palace'] = 11;
	lmax['carpentering'] = 32;
	lmax['dump'] = 40;
	lmax['forester'] = 32;
	lmax['temple'] = 32;
	lmax['alchemist'] = 32;
	lmax['fireworker'] = 32;
	lmax['glassblowing'] = 32;
	lmax['stonemason'] = 32;
	lmax['winegrower'] = 32;
	lmax['optician'] = 32;
	lmax['vineyard'] = 32;
	lmax['architect'] = 32;

	for(i = 0; i < table.length; i++){

   		t=table[i].title;



    		if( !isNaN(t.charAt(t.length - 1)) ){	

			table1[table[i].title] = table[i].href;

			torder.push(table[i].title);
			tclass[table[i].title] = table[i].parentNode.className;
    		}

	}

	torder.sort();



	titles = '<hr noshade size="1" /><center><strong>Building list</strong></center>';



	for ( i = 0; i < torder.length; i++){
		
		var up = '';

		var pos = table1[torder[i]].split('position=');
		if ( document.getElementById('position'+pos[1]) ){

			var u = document.getElementById('position'+pos[1]).getElementsByTagName('div');
		}

		var burl = table1[torder[i]];

		var building = torder[i].replace(opts['lvl'],':')

		var b = building.split(':');

		var bl = parseInt(b[1]);
		/* If building is level max*/
		if (bl >= lmax[tclass[torder[i]]]) {

			titles += '<li class="buildmax"> \
					<a href="' + burl + '" "> \
						<span class="buildname">' + b[0] + '</span> \
						<span style="color:#D11919;">&raquo; Level: ' +b[1]+' &lowast;</span> \
					</a> \
				</li>';

		}
		/* If building is upgrading */

		else if (u && u[0].className == 'constructionSite'){

			titles += '<li class="buildup">\
					<a href="' + burl + '" ">\
						<span class="buildname" >' + b[0] + '</span>\
						<span>&raquo; Level: ' +b[1]+' &uArr;</span>\
					</a>\
				</li>';

		}
		/* else ^^ */

		else {

			titles += '<li class="build">\
					<a href="' + burl + '" ">\
						<span class="buildname">' + b[0] + '</span>\
						<span>&raquo; Level: ' +b[1]+' <a href="' + burl + '"></span>\
					</a>\
				</li>';

		}

	}

	titles = titles + '</ul>';
	

	e=document.getElementById('information').getElementsByTagName('div');

	e[0].innerHTML = e[0].innerHTML + titles;

}