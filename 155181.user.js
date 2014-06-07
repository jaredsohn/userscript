// ==UserScript==

// @name           Ikariam Building List Israel Version + Fixs (Just for israel .)

// @namespace      http://www.dokislogeek.net

// @description    Fast Buildings info and access in city view, Ressources Level and Fast Inactive info on Island view

// @include	   http://*s7.il.ikariam.*/*

// ==/UserScript==

/* Options and Styles */
css='#reslvl {\
	margin:2px 10px;\
}\
#reslvl span {\
	float:left;\
	width:90px;\
}\
.build{\
	background-color:transparent;\
	font-weight:normal;\
}\
.build span{\
	color:black;\
}\
.build a{\
	text-decoration:none;\
}\
.build:hover {\
	background-color:#92e192;\
	font-weight:bold;\
}\
.buildup{\
	background-color:transparent;\
	font-weight:normal;\
}\
.buildup span{\
	color:red;\
}\
.buildup a{\
	text-decoration:none;\
}\
.buildup:hover {\
	background-color:#FFC2F3;\
	font-weight:bold;\
	}\
.buildmax{\
	background-color:transparent;\
	font-weight:normal;\
}\
.buildmax span{\
	color:grey;\
}\
.buildmax a{\
	text-decoration:none;\
}\
.buildmax:hover {\
	background-color:#C1FAFF;\
	font-weight:bold;\
}\
.buildname{\
	float:left;\
	width:80%;\
	}\
.inalist{\
	margin:2px 10px;\
	}\
.inalist a{\
	color:black;\
	text-decoration:none;\
	}\
.inalist a{\
	text-decoration:none;\
	}\
.inalist li:hover{\
	background-color:#92e192;\
	font-weight:bold;\
	}\
.inalist span {\
	float:left;\
	width:175px;\
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


/* function to set some language related options according to domain extension */

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
	else if ( ext == 'com' ){
		opts['lvl'] = ' Level';	
		opts['inactives'] = 'Inactives';
	}
	else if ( ext == 'es' ){
		opts['lvl'] = ' Nivel';
		opts['inactives'] = 'Inactives';
	}
	else if ( ext == 'gr' ){
		opts['lvl'] = 'επίπεδο';
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
/* showBuilding add a border around selected building*/
function showBuilding(obj) { 
	var pos = obj.href.split('position=');
	var pos1 = 'position'+pos[1];
	document.getElementById(pos1).style.border = '4px solid red';  
}
embedFunction(showBuilding);
/* hideBuilding remove the border around selected building*/
function hideBuilding(obj) {
	var pos=obj.href.split('position=');
	var pos1='position'+pos[1]; 
	document.getElementById(pos1).style.border = ''; 	
}
embedFunction(hideBuilding);
/* showCity add a border around selected city */
function showCity(obj) { 
	document.getElementById(obj).style.border = '4px solid red';  
}
embedFunction(showCity);
/* showCity remove the border around selected city */
function hideCity(obj) {
	document.getElementById(obj).style.border = ''; 	
}
embedFunction(hideCity);

/* Island View */


if( document.getElementById('island') ){
	addGlobalStyle(css);

	/* Ressources level */	
	ifeatures = document.getElementById('islandfeatures').getElementsByTagName('li');

	w = ifeatures[0].className.split(' ');

	woodlevel = w[w.length - 1].replace('level','');

	wn = ifeatures[0].getElementsByTagName('span');

	woodname = wn[0].innerHTML; 

	r = ifeatures[1].className.split(' ');

	ressourcelevel = r[r.length - 1].replace('level','');

	rn = ifeatures[1].getElementsByTagName('span');

	ressourcename = rn[0].innerHTML;

	var leftbox, newElement;

	leftbox = document.getElementById('actioncontainer');

	if (leftbox) {

		var rdiv = document.createElement("div");

		rdiv.innerHTML = '<div class="dynamic"> \
				<h3 class="header">Ressources</h3> \
				<div class="content"> \
					<ul id="reslvl"> \
						<li> \
							<span>'+ woodname + ': </span>' + woodlevel + '</li> \
						<li> \
							<span>' + ressourcename + ': </span>' + ressourcelevel +'</li> \
					</ul> \
				</div> \
				<div class="footer"></div> \
				</div>';  

		leftbox.parentNode.insertBefore(rdiv, leftbox.nextSibling);

	}
	/* end of Ressources level */
	/* Show Inactive Cities */
	cities = document.getElementById('cities');
	citiesspan = cities.getElementsByTagName('span');
	inactives = new Array();
	var u = 0; 
	for ( i = 0; i < citiesspan.length; i++ ){
		if ( citiesspan[i].className == 'inactivity' ){
			inactives[u] = new Array();		
			liparent = citiesspan[i].parentNode.parentNode.parentNode;
			ownerinfo = liparent.getElementsByTagName('ul')[0].getElementsByTagName('li')[2];			
			inactives[u]['city'] = citiesspan[i].innerHTML.replace(' (i)','');
			inactives[u]['citypos'] = liparent.id;
			inactives[u]['citylvl']	= liparent.className.split('level')[1];		
			inactives[u]['owner'] = ownerinfo.innerHTML.split('</span>')[1].split(' ')[0];
			inactives[u]['onclick'] = liparent.innerHTML.split('onclick="')[1].split('"')[0].replace('this', 'getElementById(\'' + citiesspan[i].parentNode.parentNode.id +'\')');	
			u++;
		}	
	}
	var leftbox, newElement;

	leftbox = document.getElementById('actioncontainer');

	if (leftbox) {
		var idiv = document.createElement("div");

		var idivcontent = '<div class="dynamic"> \
				<h3 class="header">' + opts['inactives'] + '</h3> \
				<div class="content"> \
				<ul class="inalist">';
		
		for ( i = 0; i < inactives.length; i++ ){
			idivcontent += '<li><a href="#" onclick="' + inactives[i]['onclick'] + '" onmouseover="showCity(\'' + inactives[i]['citypos'] + '\');" onmouseout="hideCity(\'' + inactives[i]['citypos'] + '\');"><span>' + inactives[i]['city'] + '&nbsp;(' + inactives[i]['owner'] + '):</span> ' + inactives[i]['citylvl'] +'</a></li>';
		}

		idivcontent	+= '</ul> \
				</div> \
				<div class="footer"></div> \
				</div>';  
		idiv.innerHTML = idivcontent;

		leftbox.parentNode.insertBefore(idiv, leftbox.nextSibling);

	}	
	/* end Show Inactive Cities */

}


/* City View */


if( document.getElementById('city') ){
	addGlobalStyle(css);

	table = document.getElementById('mainview').getElementsByTagName('a');

	var table1 = new Array();

	var torder = new Array();
	var tclass = new Array();
	var lmax   = new Array(); /* array with buildings max level, according to Ikarariam Help*/
	lmax['academy'] = 16;
	lmax['embassy'] = 16;
	lmax['workshop-army'] = 24;
	lmax['safehouse'] = 20;
	lmax['barracks'] = 24;
	lmax['shipyard'] = 16;	
	lmax['branchOffice'] = 16;		
	lmax['warehouse'] = 16;
	lmax['townHall'] = 24;
	lmax['wall'] = 24;
	lmax['museum'] = 8;
	lmax['port'] = 16;
	lmax['palaceColony'] = 4;
	lmax['tavern'] = 16;
	lmax['palace'] = 4;

	for(i = 0; i < table.length; i++){

   		t=table[i].title;



    		if( !isNaN(t.charAt(t.length - 1)) ){	

			table1[table[i].title] = table[i].href;

			torder.push(table[i].title);
			tclass[table[i].title] = table[i].parentNode.className;
    		}

	}

	torder.sort();



	titles = '<br/><ul class="cityinfo"><div id="buildlist">';



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
					<a href="' + burl + '" onmouseover="showBuilding(this);" onmouseout="hideBuilding(this);"> \
						<span class="buildname">' + b[0] + '</span> \
						<span style="color:grey;">' +b[1]+'</span> \
					</a> \
				</li>';

		}
		/* If building is upgrading */

		else if (u && u[0].className == 'constructionSite'){

			titles += '<li class="buildup" >\
					<a href="' + burl + '" onmouseover="showBuilding(this);" onmouseout="hideBuilding(this);">\
						<span class="buildname" > ^ ' + b[0] + '</span>\
						<span>' +b[1]+' ^</span>\
					</a>\
				</li>';

		}
		/* else ^^ */

		else {

			titles += '<li class="build">\
					<a href="' + burl + '" onmouseover="showBuilding(this);" onmouseout="hideBuilding(this);">\
						<span class="buildname">' + b[0] + '</span>\
						<span>' +b[1]+'</span>\
					</a>\
				</li>';

		}

	}

	titles = titles + '</ul>';

	e=document.getElementById('information').getElementsByTagName('div');

	e[0].innerHTML = e[0].innerHTML + titles;

}