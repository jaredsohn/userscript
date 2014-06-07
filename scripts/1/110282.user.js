// ==UserScript==
// @name           DS - AutoBuild
// @author	   Marin
// @icon	   data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA8tJREFUeNqsVEtvG1UU/u7MnYftTOw4jpPWwVFI8ygNQjQ0RSSIilIIQmKDSiWQ2LBjyQoJloDEBja8FohNxV+IgIpEEKTS0pA0ok0aB8dJmsSJn2N7xvO4M5fbSFQViF2vdKQr3XM+fff7zjmEc46HcejX7z+L/qiBtXwdIwNJEEqGt/YPv8gYRoIo8ueKosy63KkSIPQpgaZJ+HnxL9zOVaHIOhpNGxoopAdRQ84NjdI3JSZfyN+tn2nU7a8Cz/8OIG8JoLRIkf+X0T8XQpB2Xf8d5rB3+7o6YMUYyjU7WjErL3bH9XNGXJ8nFJdF3o8ivfQfIPEgiTgRhuGHtuNcpJwgEKFTCZkeAy7jqNVbqtlsvpTu1s9LKX02DPnHQtlrDwJJrhtc4kF4WQrZxf1SE0HAENUltJmPlu2iQ6PIHksi1hlFyfTodq7xanm3/Q1CcpZI5D6QPPFo/++KRAZ6DYrOaAR7VQttnyGmCwFFYqvtw/MYUokIohEFN/MHWNvYTyc6YmNcIlfbrl++J7WUOTGt25EB3K00hSMEY9kEElENhzUHpuUKZzioULJcb8N2GOy2i2SXAY0q023L/YxwfvpIo9Enz2yWd7YGi9RAmViwCzcwkOlB0ojgsG6j2nIRVShigk3LCyBTFbGofsSUBHQmQnhK9OJ78sTxWLYnMzQyPnk+4gcyyeU3URNM4DvoSegwogrCgMC0PQHsCJ3aaAhWzA+hqhoI+HEJfFLuKO/xU1PPLdnl7Vbo+RkjndUKe7ukbocwm5ZoHA993cZR0a3NEoplE6pw9J7OLAgQz46gU1NS8lBCZZpGF5Z/+r7y2LmXb/cNn2zeuj43rnIJx4afBu3OYm+3AN+qC1YMlnCy7QHFWgs6AjwxcwncZ/uUKuF2YfUPbXt1I9+o1xdGp5//oVrYsHvT/a8/88obMcusYll8i7llhJV1JDNxFA9NtE0g3tsLtVUqVg73P5FHu2RIMucs5E2vVWPrc7ONYm6lMjAxdWPs9Flr/er8eE/2JEYmX0BueRFyVz9iwsnBx5/Kp4ZGZ82l+bninbVv5bGkCj0a4b4XhpSE2Fq8rmgRpRG4/q93fpuv72xtqpMzr1lxI9H/57Vf0AY1Jau2ktClLzseGfn05vyVA+ZY5v1Zg1gnsqIimqQeiFwu5XPa6gHb6Z889UGyN03KmxtvNxx3yjJ3rxDfW7AKa2FxaaVWabVaCdG89N/DRzh4wAIEfhBIMgpiijxZluH7zkeO6w5aOxsZLZ5aZoxxtbENmRMHXBZ1D2mx/S3AAAin2HjtilRAAAAAAElFTkSuQmCC   
// @include        http://ch*.staemme.ch*screen=main*
// ==/UserScript==

var ausbau  = Array();

/*
 * namen für die gebäude:
 *
 * main       -> Houptgeböide       - max.20
 * barracks   -> Kasärne	    - max.25
 * stable     -> Stau               - max.20
 * garage     -> Wärkstatt          - max.5
 * snob       -> Adushof            - max.1
 * smith      -> Schmied            - max.20
 * place      -> Vrsammligsplatz    - max.1
 * statue     -> Statue             - max.0
 * market     -> Marktplatz         - max.20
 * wood       -> Houzäuer           - max.30
 * stone      -> Lehmgruebe         - max.30
 * iron       -> Isemine            - max.30
 * farm       -> Bauernhof          - max.30
 * storage    -> Spicher            - max.30
 * hide       -> Vrsteck            - max.6
 * wall       -> Wall               - max.20 
 *
 * AB HIER DARF GE?NDERT WERDEN
 */
 
 
var lang	= Array();	/* please send me a copy if you translate this to foreign language */
/* buildings */
		lang['main']			= 'Houptgeböide';
		lang['barracks']	= 'Kasärne';
		lang['stable']		= 'Stau';
		lang['garage']		= 'Wärkstatt';
		lang['snob']			= 'Adushof';
		lang['smith']			= 'Schmied';
		lang['place']			= 'Vrsammligsplatz';
		lang['statue']		= 'Statue';
		lang['market']		= 'Markplatz';
		lang['wood']			= 'Houzfäuer';
		lang['stone']			= 'Lehmgruebe';
		lang['iron']			= 'Isemine';
		lang['farm']			= 'Burehof';
		lang['storage']		= 'Spicher';
		lang['hide']			= 'Vrsteck';
		lang['wall']			= 'Wall';
/* units */
		lang['spear']    	= 'Speerträger';
		lang['sword']    	= 'Schwärtkämpfer';
		lang['axe']      	= 'Axtkämpfer';
		lang['spy']			 	= 'Späher';
		lang['light']    	= 'Liechti Kavallerie';
		lang['heavy']    	= 'Schwäri Kavallerie';
		lang['ram']      	= 'Rammbock';
		lang['catapult'] 	= 'Katapult';
/* misc (german to lang) */
		lang['Stufe']		 	= 'Stuefe';
		lang['Abriss']	 	= 'Abriss';

debug   = true;                          // debugMode (de)aktivieren
maxBS   = 15;                           		// maximale bauschleife

ausbau[0] = Array();
ausbau[0]['name']   = 'Grundversorgung';  // eine bezeichnung f?r den button
ausbau[0]['key']    = '1';                // taste f?r den schnellzugriff
ausbau[0]['evenly'] = true;               // gleichmässige ausbauverteilung
ausbau[0]['levels'] = Array();            // liste der max. ausbauten / prio = reihenfolge
ausbau[0]['levels']['stone']    = 30;
ausbau[0]['levels']['wood']     = 30;
ausbau[0]['levels']['iron']     = 30;
ausbau[0]['levels']['farm']     = 30;
ausbau[0]['levels']['storage']  = 30;

ausbau[1] = Array();
ausbau[1]['name']   = 'Dorfausbau';
ausbau[1]['key']    = '2';
ausbau[1]['evenly'] = true;
ausbau[1]['levels'] = Array();
ausbau[1]['levels']['main']     = 20;
ausbau[1]['levels']['barracks'] = 25;
ausbau[1]['levels']['stable']   = 20;
ausbau[1]['levels']['garage']   = 5;
ausbau[1]['levels']['snob']     = 1;
ausbau[1]['levels']['smith']    = 20;
ausbau[1]['levels']['place']    = 1;
ausbau[1]['levels']['statue']   = 0;
ausbau[1]['levels']['market']   = 20;
ausbau[1]['levels']['hide']     = 6;

ausbau[2] = Array();
ausbau[2]['name']   = 'Wall';
ausbau[2]['key']    = '3';
ausbau[2]['evenly'] = false;
ausbau[2]['levels'] = Array();
ausbau[2]['levels']['wall']     = 20;

ausbau[3] = Array();
ausbau[3]['name']   = 'UV-Dorf';
ausbau[3]['key']    = '4';      
ausbau[3]['evenly'] = true;     
ausbau[3]['levels'] = Array();  
ausbau[3]['levels']['place']    = 1;
ausbau[3]['levels']['stone']    = 30;
ausbau[3]['levels']['wood']     = 30;
ausbau[3]['levels']['iron']     = 30;
ausbau[3]['levels']['farm']     = 30;
ausbau[3]['levels']['storage']  = 30;
ausbau[3]['levels']['statue']   = 0;
ausbau[3]['levels']['wall']     = 20;
ausbau[3]['levels']['snob']     = 1;
ausbau[3]['levels']['main']     = 20;
ausbau[3]['levels']['barracks'] = 25;
ausbau[3]['levels']['stable']   = 20;
ausbau[3]['levels']['garage']   = 5;
ausbau[1]['levels']['smith']    = 20;
ausbau[3]['levels']['market']   = 20;
ausbau[3]['levels']['hide']     = 6;

/*
 * AB HIER NICHTS AENDERN...
 */

function translate( what, reverse ) {
	if( reverse==true ) {
		for( var i in lang )
			if( lang[i]==what ) return i;
	} else {
		if( lang[what] ) return lang[what];
	}
	return what;
}

function main() {
	try {
	  buildings = Array();
	  isBuild   = 0;
	  villConst = null;
	  villId    = null
	  uvLink    = null;
	  level			= null;
	  isBreak		= (document.location.href.search( /mode=destroy/ )!=-1 );
	  allLinks  = document.getElementsByTagName('a');
	  for(var i=allLinks.length-1; i>0; i--) {
	    var link 		= allLinks[i].getAttribute('href');
	    var action	= link.match( /action=([a-z]+)/ );
	    		action	= action==null ? '' : action[1];
	    if( action=="destroy" || action=="build" ) {
	    	if( isBreak ) {
			    var type	= link.match( /building_id=([a-z]+)/ );
			    		type	= type==null ? '' : type[1];
			    var level = allLinks[i].parentNode.parentNode.childNodes[1].innerHTML.match( /(\w+) ([0-9]+)/ );
			    if( level!=null && level[1]==translate('Stufe') )
		    		buildings[type] = level==null ? 0 : parseInt(level[2]);
		  	} else {
			    var type	= link.match( /id=([a-z]+)/ );
			    		type	= type==null ? '' : type[1];
			    var level = allLinks[i].innerHTML.match( /(\w+) ([0-9]+)/ );
			    if( level!=null && level[1]==translate('Stufe') )
	    			buildings[type] = level==null ? 0 : parseInt(level[2])-1;
		  	}
        if( villConst==null ) {
          var tmp = link.match( /h=([0-9a-z]+)/ );    villConst = tmp[1].substr(0,4);
          var tmp = link.match( /village=([0-9]+)/ ); villId    = parseInt(tmp[1]);
	        var tmp	= link.match( /t=([0-9]+)/ );				uvLink 		= tmp==null ? '' : tmp[0]+"&";
        }
		  }
		  if( action=="cancel" ) {
		    var type	= allLinks[i].parentNode.parentNode.childNodes[1].innerHTML.match( /(\w+) (\w+)/ );
		  	if( isBreak ) {
			    if( type!=null && type[1]==translate('Abriss') ) {
			    	buildings[translate(type[2])]--;
			    	isBuild++
			    }
			  } else {
			    if( type[1]==translate('Stufe') ) isBuild++;
			  }
		  }
	  }
	  var row   = document.createElement('tr');
	  var cell  = document.createElement('td');
    cell.setAttribute( 'id', '_autobuildtable_' );
	  cell.setAttribute( 'colspan', 7 );
	  for( var i=0; i<ausbau.length; i++ ) {
	    var butt  = document.createElement('button');
	    butt.setAttribute('type','button');
	    butt.setAttribute('style','font-size:8pt;');
	    butt.appendChild( document.createTextNode((ausbau[i]['key']?ausbau[i]['key']+' - ':'')+ausbau[i]['name']));
	    butt.disabled = true;
	    if( isBreak || isBuild<=maxBS ) {
	      for( var j in ausbau[i]['levels'] ) {
	      	if( isBreak && buildings[j]>ausbau[i]['levels'][j] && isBuild<5 ) {
	          butt.innerHTML += ':  <img src="/graphic/overview/down.png" height=11><img src="/graphic/buildings/'+j+'.png" height=11>';
	          butt.setAttribute('onclick','location.replace("game.php?'+uvLink+'village='+villId+'&screen=main&action=destroy&building_id='+j+'&'+(isBuild>2?'force&':'')+'h='+villConst+'");');
	          butt.setAttribute('accesskey',ausbau[i]['key']);
	          butt.disabled = false;
	          break;
	      	} else if( !isBreak && buildings[j]<ausbau[i]['levels'][j] ) {
	          butt.innerHTML += ':  <img src="/graphic/buildings/'+j+'.png" height=11>';
	          butt.setAttribute('onclick','location.replace("game.php?'+uvLink+'village='+villId+'&screen=main&action=build&id='+j+'&'+(isBuild>2?'force&':'')+'h='+villConst+'");');
	          butt.setAttribute('accesskey',ausbau[i]['key']);
	          butt.disabled = false;
	          break;
	        }
	      }
	    }
	    cell.appendChild( butt );
	  }
	  row.appendChild( cell );
	  var tables = document.getElementsByTagName('table');
	  for( var t=tables.length-1; t>=0; t-- ) {
	    if( tables[t].className!='main') continue;
	    tables[t+1].appendChild(row);
	    break;
	  }
	} catch( evt) {
	    if( debug ) alert('autobuild\n\n'+evt);
	    return false;
	}
}

function _keyPressed(evt) {
  try {
    var theKey = String.fromCharCode(evt.keyCode);
    var butt		= document.getElementsByTagName( 'button' );
    for( var i=0; i<butt.length; i++)
      if( theKey==butt[i].getAttribute('accesskey') ) {
        try {
          butt[i].click();
          break;
        } catch( evt ) {}
      }
  } catch( evt) {
      if( debug ) alert('autobuild\n\n'+evt);
      return false;
  }
}

document.addEventListener('keyup', _keyPressed, false);
window.addEventListener( 'load', main, true );