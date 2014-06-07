// ==UserScript==
// @name           DS - Aufbau
// @namespace      DerWoNetDaIst - credits to Celesteria - credits to Zaff
// @include        http://ch*.staemme.ch*screen=main*
// @version        1.0
// ==/UserScript==

var ausbau  = Array();

/*
 * namen für die gebäude:
 *
 * main       -> Hauptgeb?ude       - max.30
 * barracks   -> Kaserne            - max.25
 * stable     -> Stall              - max.20
 * garage     -> Werkstatt          - max.10
 * church     -> Kirche             - max.1
 * snob       -> Adelshof           - max.1
 * smith      -> Schmiede           - max.20
 * place      -> Versammlungsplatz  - max.1
 * statue     -> Status             - max.1
 * market     -> Marktplatz         - max.25
 * wood       -> Holzf?ller         - max.30
 * stone      -> Lehmgrube          - max.30
 * iron       -> Eisenmine          - max.30
 * farm       -> Bauernhof          - max.30
 * storage    -> Speicher           - max.30
 * hide       -> Versteck           - max.10
 * wall       -> Wall               - max.20 
 *
 * AB HIER DARF GE?NDERT WERDEN
 */
 
 
var lang	= Array();
/* buildings */
		lang['main']			= 'Hauptgebäude';
		lang['barracks']	= 'Kaserne';
		lang['stable']		= 'Stall';
		lang['garage']		= 'Werkstatt';
		lang['church']		= 'Kirche';
		lang['snob']			= 'Adelshof';
		lang['smith']			= 'Schmiede';
		lang['place']			= 'Versammlungsplatz';
		lang['statue']		= 'Statue';
		lang['market']		= 'Markplatz';
		lang['wood']			= 'Holzfäller';
		lang['stone']			= 'Lehmgrube';
		lang['iron']			= 'Eisenmine';
		lang['farm']			= 'Bauernhof';
		lang['storage']		= 'Speicher';
		lang['hide']			= 'Versteck';
		lang['wall']			= 'Wall';
/* units */
		lang['spear']    	= 'Speerträger';
		lang['sword']    	= 'Schwertkämpfer';
		lang['axe']      	= 'Axtkämpfer';
		lang['archer']      	= 'Bogenschütze';
		lang['spy']			 	= 'Späher';
		lang['light']    	= 'Leichte Kavallerie';
		lang['heavy']    	= 'Schwere Kavallerie';
		lang['marcher']    	= 'Berittener Bogenschütze';
		lang['ram']      	= 'Rammbock';
		lang['catapult'] 	= 'Katapult';
/* misc (german to lang) */
		lang['Stufe']		 	= 'Stuefe';
		lang['Abriss']	 	= 'Abriss';

debug   = true;                          // debugMode (de)aktivieren
maxBS   = 5;                           		// maximale bauschleife

ausbau[0] = Array();
ausbau[0]['name']   = 'Minen Bauen';  // eine bezeichnung f?r den button
ausbau[0]['key']    = '1';                // taste f?r den schnellzugriff
ausbau[0]['evenly'] = true;               // gleichmässige ausbauverteilung
ausbau[0]['levels'] = Array();            // liste der max. ausbauten / prio = reihenfolge
ausbau[0]['levels']['stone']    = 30;
ausbau[0]['levels']['wood']     = 30;
ausbau[0]['levels']['iron']     = 30;


ausbau[1] = Array();
ausbau[1]['name']   = 'Dorfausbau';
ausbau[1]['key']    = '2';
ausbau[1]['evenly'] = true;
ausbau[1]['levels'] = Array();
ausbau[1]['levels']['place']    = 1;
ausbau[1]['levels']['main']     = 20;
ausbau[1]['levels']['barracks'] = 25;
ausbau[1]['levels']['stable']   = 20;
ausbau[1]['levels']['garage']   = 10;
ausbau[1]['levels']['farm']     = 30;
ausbau[1]['levels']['storage']  = 30;
ausbau[1]['levels']['church']   = 1;
ausbau[1]['levels']['snob']     = 1;
ausbau[1]['levels']['smith']    = 20;
ausbau[1]['levels']['statue']   = 0;
ausbau[1]['levels']['market']   = 20;
ausbau[1]['levels']['hide']     = 10;

ausbau[2] = Array();
ausbau[2]['name']   = 'Wall';
ausbau[2]['key']    = '3';
ausbau[2]['evenly'] = false;
ausbau[2]['levels'] = Array();
ausbau[2]['levels']['wall']     = 20;

ausbau[3] = Array();
ausbau[3]['name']   = 'Kleines Dorf';
ausbau[3]['key']    = '4';      
ausbau[3]['evenly'] = true;     
ausbau[3]['levels'] = Array();  
ausbau[3]['levels']['place']    = 1;
ausbau[3]['levels']['stone']    = 22;
ausbau[3]['levels']['wood']     = 22;
ausbau[3]['levels']['iron']     = 22;
ausbau[3]['levels']['farm']     = 15;
ausbau[3]['levels']['storage']  = 18;
ausbau[3]['levels']['statue']   = 0;
ausbau[3]['levels']['wall']     = 10;
ausbau[3]['levels']['snob']     = 0;
ausbau[3]['levels']['main']     = 15;
ausbau[3]['levels']['barracks'] = 5;
ausbau[3]['levels']['stable']   = 3;
ausbau[3]['levels']['garage']   = 0;
ausbau[3]['levels']['smith']    = 5;
ausbau[3]['levels']['market']   = 5;
ausbau[3]['levels']['hide']     = 0;

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
