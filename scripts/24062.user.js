// ==UserScript==
// @name          DS-Spoo-Report
// @description   Die Staemme Report by Spoo
// @version       1.73 
// @namespace     http://none
// @include       http://d*.die-staemme.de/game.php?village=*&screen=report&mode=*&view=*
// @include       http://d*.die-staemme.de/game.php?t=*&village=*&screen=report&mode=*&view=*
// @include       http://ch*.ds.ignames.net/game.php?village=*&screen=report&mode=*&view=*
// @include       http://ch*.ds.ignames.net/game.php?t=*&village=*&screen=report&mode=*&view=*
// ==/UserScript==
// Date 21:58 06.02.2008
//__________________________________________________________________________________________________________________//
// Get world
var tmp = location.href + "";
tmp = tmp.replace(/http:\/\//, "");
tmp = tmp.split(".");
var world = tmp[0];
var world1 = tmp[0].substring(2,4);

var DSPREMIUM = 0;
if(world1==6||world1==15){
	if(document.evaluate('/HTML[1]/BODY[1]/TABLE[2]/TBODY[1]/TR[1]/TD[1]/A[1]',document,null,XPathResult.STRING_TYPE,null).stringValue == "Hauptgebäude")var DSPREMIUM = 1;
}else{
	if(document.evaluate("//ul[@class='menu nowrap quickbar']",document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue)var DSPREMIUM = 1;
}

var STSRver = "1.73";
var baseURL = getParam('GETURL');	//  Aktuelle URL
var twGlobalInfo = new Array();	// Array mit den globalen Daten des ausgewählten Stammes
var twLinks = new Array();				// Array mit allen Verbindungen von Staemme.
var vID = 0;											// Identifikation des Stammes
var twUrlScreen = "";							// Stamme screan URL
var Attacking = "";
var Army = new Array();					// Enthält die Truppen jedes Stammes
var presentURL = ""	;							// Aktuelle Url
var twLanguage = new Array();		
var twImgsPath = "http://diestaemme.de/graphic/"; 										//  Orginal Grafiken

if(world1==6||world1==15){
var twUnitsNamesArray = new Array("spear", "sword", "axe", "spy", "light", "heavy", "ram", "catapult", "snob");
var twCostsByUnit = new Array( new Array(50,30,10), new Array(30,30,70), new Array(60,30,40), new Array(50,50,20), new Array(125,100,250), new Array(200,150,600), new Array(300,200,200), new Array(320,400,100), new Array(28000,30000,25000) );
}else{
var twUnitsNamesArray = new Array("spear", "sword", "axe", "archer", "spy", "light", "marcher", "heavy", "ram", "catapult", "knight", "snob");
var twCostsByUnit = new Array( new Array(50,30,10), new Array(30,30,70), new Array(60,30,40), new Array(100,30,60), new Array(50,50,20), new Array(125,100,250), new Array(250,100,150), new Array(200,150,600), new Array(300,200,200), new Array(320,400,100), new Array(20,20,40), new Array(40000,50000,50000) );
}
var twBuildingsNamesArray = new Array("main", "barracks", "stable", "garage", "snob", "smith", "place", "market", "wood", "stone", "iron", "farm", "storage", "hide", "wall","statue");
var twOtherNamesArray = new Array("holz", "lehm", "eisen", "res","rabe_grau","klee");
// =================================================================================================================//
// Method: addGlobalStyle
// Summary: Es erlaubt, die CSS herauszugeben / zu verändern
// Params: css
// Returns: nothing
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
// =================================================================================================================//
// Method: remove_it
// Summary: Zeichen ausblenden
// Params: name
// Returns: null oder array als strings

function remove_it(doc, node) {
  if (doc == null || node == null) return;
  if (!node.parentNode) return;
  node.style.display = "none";
  doc.last_removed_node = node;
};
// =================================================================================================================//
// Method: getParam
// Summary: Er sucht und gibt die Url zurück, in dem sich der richtige String (@name) befinden.
// Params: name
// Returns: null oder array als strings
function getParam(name) {
  if (name == 'GETURL') {
    var regexS = "(.*)/(.*)";
    var regex = new RegExp( regexS );
    var tmpURL = window.location.href;
    var results = regex.exec( tmpURL );
  } else {
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var tmpURL = window.location.href;
    var results = regex.exec( tmpURL );
  }
  if( results == null )
    return "";
  else
    return results[1];
};
// =================================================================================================================//
// Method: DSInitNewCSS
// Summary: Css Style
// Params: nothing
// Returns: 
function DSInitNewCSS(){
	var newCSS = "";

  newCSS += '#reportEffect {margin:0;padding:0;width:667px;background-color:#F8F4E8;margin-bottom:0px;opacity:0.90;z-index:1000;}';
	newCSS += '#reportEffect h2 {font-size:14pt;}';
	newCSS += '#reportEffect dt {background-color:#DED3B9;padding:2px;}';
	newCSS += '#reportEffect dd {background-color:#F8F4E8;border-left:0px solid #DED3B9;padding:4px;}';
	addGlobalStyle(newCSS);
}

// =================================================================================================================//
function DSInitialize()
{

	twUrlScreen = baseURL+'/game.php?';
	twLanguage = new Array();	
	if(world1==6||world1==15){
	twLanguage["units"] = new Array("Speertr&auml;ger", "Schwertk&auml;mpfer", "Axtk&auml;mpfer", "Sp&auml;her", "Leichte Kavallerie", "Schwere Kavallerie","Rammbock", "Katapult","Adelsgeschlecht");
	}else{
	twLanguage["units"] = new Array("Speertr&auml;ger", "Schwertk&auml;mpfer", "Axtk&auml;mpfer", "Bogensch&uuml;tze", "Sp&auml;her", "Leichte Kavallerie", "Berittener Bogensch&uuml;tze", "Schwere Kavallerie","Rammbock", "Katapult", "Paladin","Adelsgeschlecht");
}
	
	twLanguage["buildings"] = new Array("Hauptgebäude", "Kaserne", "Stall", "Werkstatt", "Adelshof", "Schmiede", "Versammlungsplatz", "Marktplatz", "Holzfäller", "Lehmgrube", "Eisenmine", "Bauernhof", "Speicher", "Versteck", "Wall","Statue");
	twLanguage["reportKeys"] = new Array("Erspähte Rohstoffe", "Gebäude", "Einheiten außerhalb","Beute", "Schaden durch Rammböcke", "Schaden durch Katapultbeschuss", "Veränderung der Zustimmung" );

	twLinks["twUnitsImg"] = new Array();
	for(var i=0; i<twUnitsNamesArray.length;i++)
		twLinks["twUnitsImg"][i] = twImgsPath+"unit/unit_"+twUnitsNamesArray[i]+".png";

	twLinks["twOtherImg"] = new Array();
	for(var i=0; i<twOtherNamesArray.length;i++)
		twLinks["twOtherImg"][i] = twImgsPath+twOtherNamesArray[i]+".png";
}

// =================================================================================================================//
// Method: DSReportData
// Summary: Es sammelt die Daten des Reports, den später wir verbinden.
// Params: nothing
// Returns: reportInfo[]
function DSReportData()
{
		var i = 2;
		var init = 3;
		if(document.evaluate('/html/body/table[3+'+DSPREMIUM+']/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr[4]/td',document,null,XPathResult.STRING_TYPE,null).stringValue == "Weitergeleitet von:")
			init = 5;
		// 
		var reportInfo = new Array();
		reportInfo['date'] = document.evaluate('/html/body/table[3+'+DSPREMIUM+']/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr[2]/td[2]',document,null,XPathResult.STRING_TYPE,null).stringValue;
		reportInfo['luck'] = document.evaluate('/html/body/table[3+'+DSPREMIUM+']/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table/tbody/tr/td/b',document,null,XPathResult.STRING_TYPE,null).stringValue;
		reportInfo['morale'] = document.evaluate('/html/body/table[3+'+DSPREMIUM+']/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table/tbody/tr/td/h4',document,null,XPathResult.STRING_TYPE,null).stringValue;
		reportInfo['morale'] = reportInfo['morale'].replace("Moral:","");
			
		// Informationen über den Angreifer
		reportInfo['attacker'] = new Array();
		reportInfo['attacker']['player'] = document.evaluate('/html/body/table[3+'+DSPREMIUM+']/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table[3]/tbody/tr/th[2]/a',document,null,XPathResult.STRING_TYPE,null).stringValue;
		reportInfo['attacker']['village'] = new Array();
		var str = document.evaluate('/html/body/table[3+'+DSPREMIUM+']/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table[3]/tbody/tr[2]/td[2]/a',document,null,XPathResult.STRING_TYPE,null).stringValue;
		reportInfo['attacker']['village']['name'] = str.substring(0, (str.lastIndexOf('(')-1));
		reportInfo['attacker']['village']['x'] = str.substring((str.lastIndexOf('(')+1), str.lastIndexOf('|'));
		reportInfo['attacker']['village']['y'] = str.substring((str.lastIndexOf('|')+1), str.lastIndexOf(')'));
			
		reportInfo['attacker']['army'] = new Array();
		for(var i=0;i<twLanguage['units'].length;i++){
			reportInfo['attacker']['army'][twUnitsNamesArray[i]] = new Array();
			reportInfo['attacker']['army'][twUnitsNamesArray[i]]['total'] = document.evaluate('/html/body/table[3+'+DSPREMIUM+']/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table[3]/tbody/tr[3]/td/table/tbody/tr[2]/td['+(i+2)+']',document,null,XPathResult.STRING_TYPE,null).stringValue;
			reportInfo['attacker']['army'][twUnitsNamesArray[i]]['losses'] = document.evaluate('/html/body/table[3+'+DSPREMIUM+']/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table[3]/tbody/tr[3]/td/table/tbody/tr[3]/td['+(i+2)+']',document,null,XPathResult.STRING_TYPE,null).stringValue;
		}
		// 
		reportInfo['attacker']['lossesResources'] = new Array();
		reportInfo['attacker']['lossesResources']['wood'] = 0;
		reportInfo['attacker']['lossesResources']['stone'] = 0;
		reportInfo['attacker']['lossesResources']['iron'] = 0;
		for(i=0;i<twLanguage['units'].length;i++)
			reportInfo['attacker']['lossesResources']['wood'] = parseInt(reportInfo['attacker']['lossesResources']['wood']) +  parseInt(reportInfo['attacker']['army'][twUnitsNamesArray[i]]['losses'])*twCostsByUnit[i][0];
		for(i=0;i<twLanguage['units'].length;i++)
			reportInfo['attacker']['lossesResources']['stone'] = parseInt(reportInfo['attacker']['lossesResources']['stone']) + parseInt(reportInfo['attacker']['army'][twUnitsNamesArray[i]]['losses'])*twCostsByUnit[i][1];
		for(i=0;i<twLanguage['units'].length;i++)
			reportInfo['attacker']['lossesResources']['iron'] = parseInt(reportInfo['attacker']['lossesResources']['iron']) + parseInt(reportInfo['attacker']['army'][twUnitsNamesArray[i]]['losses'])*twCostsByUnit[i][2];

		// Informationen über den Verteidiger
		reportInfo['defender'] = new Array();
		reportInfo['defender']['player'] = document.evaluate('/html/body/table[3+'+DSPREMIUM+']/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table[4]/tbody/tr/th[2]/a',document,null,XPathResult.STRING_TYPE,null).stringValue;
		if(reportInfo['defender']['player'] == "") reportInfo['defender']['player'] = "Verteidiger";
		reportInfo['defender']['village'] = new Array();
		str = document.evaluate('/html/body/table[3+'+DSPREMIUM+']/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table[4]/tbody/tr[2]/td[2]/a',document,null,XPathResult.STRING_TYPE,null).stringValue;
		reportInfo['defender']['village']['name'] = str.substring(0, (str.lastIndexOf('(')-1));
		reportInfo['defender']['village']['x'] = str.substring((str.lastIndexOf('(')+1), str.lastIndexOf('|'));
		reportInfo['defender']['village']['y'] = str.substring((str.lastIndexOf('|')+1), str.lastIndexOf(')'));
			
		reportInfo['defender']['army'] = new Array();
		for(var i=0;i<twLanguage['units'].length;i++){
			reportInfo['defender']['army'][twUnitsNamesArray[i]] = new Array();
			reportInfo['defender']['army'][twUnitsNamesArray[i]]['total'] = document.evaluate('/html/body/table[3+'+DSPREMIUM+']/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table[4]/tbody/tr[3]/td/table/tbody/tr[2]/td['+(i+2)+']',document,null,XPathResult.STRING_TYPE,null).stringValue;
			if(reportInfo['defender']['army'][twUnitsNamesArray[i]]['total'] == "")
				reportInfo['defender']['army'][twUnitsNamesArray[i]]['total'] = 0;
			reportInfo['defender']['army'][twUnitsNamesArray[i]]['losses'] = document.evaluate('/html/body/table[3+'+DSPREMIUM+']/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table[4]/tbody/tr[3]/td/table/tbody/tr[3]/td['+(i+2)+']',document,null,XPathResult.STRING_TYPE,null).stringValue;
			if(reportInfo['defender']['army'][twUnitsNamesArray[i]]['losses'] == "")
				reportInfo['defender']['army'][twUnitsNamesArray[i]]['losses'] = 0;
		}
		// 
		reportInfo['defender']['lossesResources'] = new Array();
		reportInfo['defender']['lossesResources']['wood'] = 0;
		reportInfo['defender']['lossesResources']['stone']  = 0;
		reportInfo['defender']['lossesResources']['iron'] = 0;
		for(i=0;i<twLanguage['units'].length;i++)
			reportInfo['defender']['lossesResources']['wood'] = parseInt(reportInfo['defender']['lossesResources']['wood']) + parseInt(reportInfo['defender']['army'][twUnitsNamesArray[i]]['losses'])*twCostsByUnit[i][0];
		for(i=0;i<twLanguage['units'].length;i++)
			reportInfo['defender']['lossesResources']['stone'] = parseInt(reportInfo['defender']['lossesResources']['stone']) + parseInt(reportInfo['defender']['army'][twUnitsNamesArray[i]]['losses'])*twCostsByUnit[i][1];
		for(i=0;i<twLanguage['units'].length;i++)
			reportInfo['defender']['lossesResources']['iron'] = parseInt(reportInfo['defender']['lossesResources']['iron']) + parseInt(reportInfo['defender']['army'][twUnitsNamesArray[i]]['losses'])*twCostsByUnit[i][2];
		
		// 
		var k = 0;
		reportInfo['damage'] = new Array();
		for(var tb=5;tb<7;tb++){
          
          var i = 1;
          var j = 0;
          
          str = document.evaluate('/html/body/table[3+'+DSPREMIUM+']/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table['+tb+']/tbody/tr/th',document,null,XPathResult.STRING_TYPE,null).stringValue;

          while(str != ""){
          
            while(j < twLanguage["reportKeys"].length){
              
              if(str.search(twLanguage["reportKeys"][j]) != -1){
                  reportInfo['damage'][k] = j;k++;
           
                    if(twLanguage["reportKeys"][j] == twLanguage["reportKeys"][2]){
                    var TRaus = new Array();
                        for(var ll=0;ll<12;ll++){
                          TRaus[ll] = document.evaluate('/html/body/table[3+'+DSPREMIUM+']/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table['+tb+']/tbody/tr['+i+'+1]/td/table/tbody/tr[2]/td['+ll+'+1]',document,null,XPathResult.STRING_TYPE,null).stringValue; 					                  
                        }
                    reportInfo['damage'][k] = TRaus
                    }else{                
                      reportInfo['damage'][k] = document.evaluate('/html/body/table[3+'+DSPREMIUM+']/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table['+tb+']/tbody/tr['+i+']/td',document,null,XPathResult.STRING_TYPE,null).stringValue; 					
                    } 

                k++;
              }
              j++;
            }
            i++;
            j = 0;
            str = document.evaluate('/html/body/table[3+'+DSPREMIUM+']/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table['+tb+']/tbody/tr['+i+']/th',document,null,XPathResult.STRING_TYPE,null).stringValue;
          };
}		

		return reportInfo;
}
//__________________________________________________________________________________________________________________//

// Method: DSReportGenerator
// Summary: 
// Params: reportInfo[]
// Returns: newReport[]
function DSReportGenerator(reportInfo)
{
		// 
		var str = "";
		var newReport = new Array();
		var DSrepab = new Array("","_____","____","___","__","_","[color=white]","[/color]");
		var i = 0;

		var init = 3;
		if(document.evaluate('/html/body/table[3+'+DSPREMIUM+']/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr[4]/td',document,null,XPathResult.STRING_TYPE,null).stringValue == "Weitergeleitet von:")
			init = 5;

		// Angreifer
		var attackerTotalUnits = 0;
		var attackerLossesUnits = 0;
		for(i=0;i<twLanguage['units'].length;i++){
			attackerTotalUnits = parseInt(attackerTotalUnits) + parseInt(reportInfo['attacker']['army'][twUnitsNamesArray[i]]['total'])
			attackerLossesUnits = parseInt(attackerLossesUnits) + parseInt(reportInfo['attacker']['army'][twUnitsNamesArray[i]]['losses'])
		}
		

			// Verteidiger
			defenderTotalUnits = 0;
			defenderLossesUnits = 0;
			for(i=0;i<twLanguage['units'].length;i++){
				defenderTotalUnits = parseInt(defenderTotalUnits) + parseInt(reportInfo['defender']['army'][twUnitsNamesArray[i]]['total'])
				defenderLossesUnits = parseInt(defenderLossesUnits) + parseInt(reportInfo['defender']['army'][twUnitsNamesArray[i]]['losses'])
			}

		// Schlacht Informationen
		newReport[0] = '[quote][b]Schlacht des Tages '+reportInfo['date'].substring(0,8)+' um '+reportInfo['date'].substring(14,8)+'[/b]\n';
		// 
		if(attackerLossesUnits == attackerTotalUnits)
			newReport[0] +='[size=11]Der Verteidiger hat gewonnen ([player]'+reportInfo['defender']['player']+'[/player]).[/size]';
		else
			newReport[0] +='[size=11]Der Angreifer hat gewonnen ([player]'+reportInfo['attacker']['player']+'[/player]).[/size]';

		if (reportInfo['luck'].substring(0,1) == "-"){
		newReport[1] = '\n\n[i][b]Glück:[color=red] '+reportInfo['luck']+' [/color][/b][/i] [img]'+twLinks["twOtherImg"][4]+'[/img]\n';
		}else{
		newReport[1] = '\n\n[i][b]Glück:[color=green] '+reportInfo['luck']+' [/color][/b][/i] [img]'+twLinks["twOtherImg"][5]+'[/img]\n';
		}
		
		newReport[2] = '[i][b]Moral: '+reportInfo['morale']+' [/b][/i]\n\n';
		newReport[3] = '[size=11][b]Angreifer: [player]'+reportInfo['attacker']['player']+' [/player][/b]\n'; 
		newReport[4] = '[b]Dorf: [village]'+reportInfo['attacker']['village']['x']+'|'+reportInfo['attacker']['village']['y']+'[/village][/b][/size]\n\n';
		
				// Truppen des Angreifers
		newReport[5] = '[color=white]_____________[/color]';
		for(i=0;i<twLanguage['units'].length;i++){
					if(reportInfo['attacker']['army'][twUnitsNamesArray[i]]['total'] > 0	)
          newReport[5] += '[img]'+twLinks["twUnitsImg"][i]+'[/img][color=white]......[/color]'
		}
		newReport[5] += '\n[b]Tuppen:[/b][color=white]__[/color]';
		for(i=0;i<twLanguage['units'].length;i++){
		  var DSattT = reportInfo['attacker']['army'][twUnitsNamesArray[i]]['total'].length
					if(reportInfo['attacker']['army'][twUnitsNamesArray[i]]['total'] > 0	)
					newReport[5] += '[color=white]'+DSrepab[DSattT]+'[/color]'+reportInfo['attacker']['army'][twUnitsNamesArray[i]]['total'];
		}	
		newReport[5] += '\n[b]Verloren:[/b][color=white]_[/color]';
		for(i=0;i<twLanguage['units'].length;i++){
		  var DSattT = reportInfo['attacker']['army'][twUnitsNamesArray[i]]['losses'].length
					if(reportInfo['attacker']['army'][twUnitsNamesArray[i]]['total'] > 0	)
					newReport[5] += '[color=white]'+DSrepab[DSattT]+'[/color]'+reportInfo['attacker']['army'][twUnitsNamesArray[i]]['losses'];
		}	
		
		newReport[5] += '\n[color=white]__________[/color]';
		for(i=0;i<twLanguage['units'].length;i++){
      if(reportInfo['attacker']['army'][twUnitsNamesArray[i]]['total'] > 0	)
      newReport[5] += '______';
		}
		newReport[5] += '\n[b]Rest:[/b][color=white]_____[/color]';
		for(i=0;i<twLanguage['units'].length;i++){
		  var DSattT = ((reportInfo['attacker']['army'][twUnitsNamesArray[i]]['total'])-(reportInfo['attacker']['army'][twUnitsNamesArray[i]]['losses'])+"").length
			
					if(reportInfo['attacker']['army'][twUnitsNamesArray[i]]['total'] > 0	)
					newReport[5] += '[color=white]'+DSrepab[DSattT]+'[/color]'+parseInt( parseInt(reportInfo['attacker']['army'][twUnitsNamesArray[i]]['total'])-parseInt(reportInfo['attacker']['army'][twUnitsNamesArray[i]]['losses']));
		}			
		
		newReport[5] += '\n'
		newReport[5] += '\n[i][b]Verluste des Angreifers:[/b][/i]'; 
		newReport[5] += '\n[img]'+twImgsPath+'buildings/barracks.png[/img] [b]'+attackerTotalUnits+' / [color=darkred]'+attackerLossesUnits+'[/color][/b] ([color=green]'+(attackerTotalUnits-attackerLossesUnits)+'[/color]) Einheit(en) ([b]'+(Math.round((attackerLossesUnits*100/attackerTotalUnits)*10)/10)+'%[/b]) Einheit(en)'
		newReport[5] += '\n[img]'+twLinks["twOtherImg"][0]+'[/img]'+reportInfo['attacker']['lossesResources']['wood']+'[img]'+twLinks["twOtherImg"][1]+'[/img]'+reportInfo['attacker']['lossesResources']['stone']+'[img]'+twLinks["twOtherImg"][2]+'[/img]'+reportInfo['attacker']['lossesResources']['iron'];
		newReport[5] += '&nbsp;(Total: [img]'+twLinks["twOtherImg"][3]+'[/img][b]'+(parseInt(reportInfo['attacker']['lossesResources']['wood'])+parseInt(reportInfo['attacker']['lossesResources']['stone'])+parseInt(reportInfo['attacker']['lossesResources']['iron']))+'[/b] Rohstoffe)\n';
		
		newReport[5] += '__________________________________________________________________________\n'
		newReport[6] = '\n[size=11][b]Verteidiger: [player]'+reportInfo['defender']['player']+' [/player][/b]\n'; 
		newReport[7] = '[b]Dorf: [village]'+reportInfo['defender']['village']['x']+'|'+reportInfo['defender']['village']['y']+'[/village][/b][/size]\n\n';

		if(parseInt(defenderTotalUnits) != 0)
		{
			// Truppen des Verteidigers
		newReport[8] = '[color=white]_____________[/color]';
		for(i=0;i<twLanguage['units'].length;i++){
					if(reportInfo['defender']['army'][twUnitsNamesArray[i]]['total'] > 0	)
          newReport[8] += '[img]'+twLinks["twUnitsImg"][i]+'[/img][color=white]......[/color]'
		}
		newReport[8] += '\n[b]Tuppen:[/b][color=white]__[/color]';
		for(i=0;i<twLanguage['units'].length;i++){
		  var DSattT = reportInfo['defender']['army'][twUnitsNamesArray[i]]['total'].length
					if(reportInfo['defender']['army'][twUnitsNamesArray[i]]['total'] > 0	)
					newReport[8] += '[color=white]'+DSrepab[DSattT]+'[/color]'+reportInfo['defender']['army'][twUnitsNamesArray[i]]['total'];
		}	
		newReport[8] += '\n[b]Verloren:[/b][color=white]_[/color]';
		for(i=0;i<twLanguage['units'].length;i++){
		  var DSattT = reportInfo['defender']['army'][twUnitsNamesArray[i]]['losses'].length
					if(reportInfo['defender']['army'][twUnitsNamesArray[i]]['total'] > 0	)
					newReport[8] += '[color=white]'+DSrepab[DSattT]+'[/color]'+reportInfo['defender']['army'][twUnitsNamesArray[i]]['losses'];
		}	
				newReport[8] += '\n[color=white]__________[/color]';
		for(i=0;i<twLanguage['units'].length;i++){
      if(reportInfo['defender']['army'][twUnitsNamesArray[i]]['total'] > 0	)
      newReport[8] += '______';
		}

		newReport[8] += '\n[b]Rest:[/b][color=white]_____[/color]';
		for(i=0;i<twLanguage['units'].length;i++){
		  var DSattT = ((reportInfo['defender']['army'][twUnitsNamesArray[i]]['total'])-(reportInfo['defender']['army'][twUnitsNamesArray[i]]['losses'])+"").length
			
					if(reportInfo['defender']['army'][twUnitsNamesArray[i]]['total'] > 0	)
					newReport[8] += '[color=white]'+DSrepab[DSattT]+'[/color]'+parseInt( parseInt(reportInfo['defender']['army'][twUnitsNamesArray[i]]['total'])-parseInt(reportInfo['defender']['army'][twUnitsNamesArray[i]]['losses']));
		}	
			newReport[8] += '\n\n'
			newReport[8] += '\n[i][b]Verluste des Verteidigers:[/b][/i]';
			newReport[8] += '\n[img]'+twImgsPath+'buildings/barracks.png[/img] [b]'+defenderTotalUnits+' / [color=darkred]'+defenderLossesUnits+'[/color][/b] ([color=green]'+(defenderTotalUnits-defenderLossesUnits)+'[/color]) Einheit(en) ([b]'+(Math.round((defenderLossesUnits*100/defenderTotalUnits)*10)/10)+'%[/b]) Einheit(en)';
			newReport[8] += '\n[img]'+twLinks["twOtherImg"][0]+'[/img]'+reportInfo['defender']['lossesResources']['wood']+'[img]'+twLinks["twOtherImg"][1]+'[/img]'+reportInfo['defender']['lossesResources']['stone']+'[img]'+twLinks["twOtherImg"][2]+'[/img]'+reportInfo['defender']['lossesResources']['iron'];
			newReport[8] += '&nbsp;(Total: [img]'+twLinks["twOtherImg"][3]+'[/img][b]'+(parseInt(reportInfo['defender']['lossesResources']['wood'])+parseInt(reportInfo['defender']['lossesResources']['stone'])+parseInt(reportInfo['defender']['lossesResources']['iron']))+'[/b] Rohstoffe)\n';
		}
		else
		{
			if(attackerTotalUnits == attackerLossesUnits)
			{
				newReport[8] = '[i]Keiner deiner Kämpfer ist lebend zurückgekehrt.[/i]';
				newReport[8] +='\n[i]Es konnten keine Informationen über die Truppenstärke des Gegners erlangt werden.[/i]';
				newReport[8] +='\n[i][b]Verluste des Verteidigers:[/b][/i]';
				newReport[8] +='\n[img]'+twImgsPath+'buildings/barracks.png[/img] [b]???? / [color=darkred]???[/color] ([color=green]???[/color])[/b] Einheit(en) ([b]??%[/b]) Einheit(en)\n';
			}
			else
			{
				newReport[8] = '[i]Ohne Truppen. Das Dorf ist leer[/i]';
				newReport[8] +='\n[i][b]Verluste des Verteidigers:[/b][/i]';
				newReport[8] +='\n [b]0 / [color=darkred]0[/color][/b] ([color=green]0[/color]) Einheit(en) ([b]100%[/b]). Einheit(en)\n';
			}
		}
		newReport[9] = '';

		newReport[10] = '__________________________________________________________________________\n';

		for(var i=0;i<reportInfo['damage'].length;i++){
		
		
		// Spionage
		// Erspähte Rohstoffe:
		if (reportInfo['damage'][i] == 0){
      var Rohstoff = reportInfo['damage'][i+1].split(" ");
      if (Rohstoff[0] == "keine") Rohstoff[0]="0";
      Rohstoff.push("0");
      Rohstoff.push("0");
      newReport[10] += '[b][i]Spionage:[/i][/b] ';
      newReport[10] += '\n[b]' + twLanguage["reportKeys"][0]+':[/b] ';
      newReport[10] += '[img]'+twLinks["twOtherImg"][0]+'[/img] '+ Rohstoff[0].replace(".", "");
      newReport[10] += '[img]'+twLinks["twOtherImg"][1]+'[/img] '+ Rohstoff[1].replace(".", "");
      newReport[10] += '[img]'+twLinks["twOtherImg"][2]+'[/img] '+ Rohstoff[2].replace(".", "");
      newReport[10] += ' (Total: [img]'+twLinks["twOtherImg"][3]+'[/img][b]'+(parseInt(Rohstoff[0].replace(".", ""))+parseInt(Rohstoff[1].replace(".", ""))+parseInt(Rohstoff[2].replace(".", "")))+'[/b] Rohstoffe)\n';
      i=i+2
		}
		
		//Gebäude: 
    if (reportInfo['damage'][i] == 1){
      var gebaude = reportInfo['damage'][i+1].replace(/\(Stufe/g, "[b](Stufe");
      gebaude = gebaude.replace(/\)/g, ")[/b]");
      for(var k = 0;k<twLanguage["buildings"].length;k++){     
      gebaude = gebaude.replace(twLanguage["buildings"][k],"[img]"+twImgsPath+"buildings/"+twBuildingsNamesArray[k]+".png[/img] "+twLanguage["buildings"][k])
      }
      newReport[10] += '\n[b]' + twLanguage["reportKeys"][1]+':[/b] ';
      newReport[10] += gebaude;
      i=i+2
    }
    
    //alert(reportInfo['damage'])
    
    // Einheiten auser Haus
		if (reportInfo['damage'][i] == 2){
		var ll = 0
		for(kk=0;kk<twLanguage['units'].length;kk++){
		ll = ll + reportInfo['damage'][i+1][kk]
		}

      if (ll != "0000000000000"){
        newReport[10] += '\n[b]' + twLanguage["reportKeys"][2]+':[/b]\n ';

        newReport[10] += '[color=white]____[/color]';
          for(kk=0;kk<twLanguage['units'].length;kk++){
          if(reportInfo['damage'][i+1][kk] > 0)
          newReport[10] += '[img]'+twLinks["twUnitsImg"][kk]+'[/img][color=white]......[/color]'
          }

             newReport[10] += '\n';
                for(kk=0;kk<twLanguage['units'].length;kk++){
                var DSattT = reportInfo['damage'][i+1][kk].length
                if(reportInfo['damage'][i+1][kk] > 0)                   
                newReport[10] += '[color=white]'+DSrepab[DSattT]+'[/color]'+reportInfo['damage'][i+1][kk];
                }	
      newReport[10] += '\n'
      }
     i=i+2 
    		
		}
    // Beute:
		if (reportInfo['damage'][i] == 3){
      var Rohstoff = reportInfo['damage'][i+1].split(" ");
      if (Rohstoff[0] == "") Rohstoff[0]="0";
      Rohstoff.push("0");
      Rohstoff.push("0");
      console.log(Rohstoff);
      newReport[10] += '\n[b]' + twLanguage["reportKeys"][3]+':[/b] ';
      newReport[10] += '[img]'+twLinks["twOtherImg"][0]+'[/img] '+ Rohstoff[0].replace(".", "");
      newReport[10] += '[img]'+twLinks["twOtherImg"][1]+'[/img] '+ Rohstoff[1].replace(".", "");
      newReport[10] += '[img]'+twLinks["twOtherImg"][2]+'[/img] '+ Rohstoff[2].replace(".", "");
      newReport[10] += ' (Total: [img]'+twLinks["twOtherImg"][3]+'[/img][b]'+(parseInt(Rohstoff[0].replace(".", ""))+parseInt(Rohstoff[1].replace(".", ""))+parseInt(Rohstoff[2].replace(".", "")))+'[/b] Rohstoffe)\n';
      i=i+2
		}

		if (reportInfo['damage'][i] == 4){
      newReport[10] += '\n[b]' + twLanguage["reportKeys"][4]+':[/b] ';
      var gebaude = reportInfo['damage'][i+1].replace(/Level/g, "Level[b]");
      gebaude = gebaude.replace("auf", "[/b]auf");
      
      newReport[10] += gebaude+'[/b]';
      i=i+2
		}
			if (reportInfo['damage'][i] == 5){
      newReport[10] += '\n[b]' + twLanguage["reportKeys"][5]+':[/b] ';
      var gebaude = reportInfo['damage'][i+1].replace(/Level/g, "Level[b]");
      gebaude = gebaude.replace("auf", "[/b]auf");
      
      newReport[10] += gebaude+'[/b]';
      i=i+2
		}	
		
		
		if (reportInfo['damage'][i] == 6){
      newReport[10] += '\n[b]' + twLanguage["reportKeys"][6]+':[/b] ';
      var gebaude = reportInfo['damage'][i+1].replace("von", "von[b]");
      gebaude = gebaude.replace("auf", "[/b]auf[b]");
      
      newReport[10] += gebaude+'[/b]';
      i=i+2
		}

		}
		newReport[10] += '\n__________________________________________________________________________\n';
		newReport[10] +='[i][b]Verluste: von Angreifer und Verteidiger in Rohstoffen[/b][/i]\n';
    newReport[10] += '[img]'+twLinks["twOtherImg"][0]+'[/img] '+ (parseInt(reportInfo['attacker']['lossesResources']['wood']) +	parseInt(reportInfo['defender']['lossesResources']['wood']));
    newReport[10] += '[img]'+twLinks["twOtherImg"][1]+'[/img] '+ (parseInt(reportInfo['attacker']['lossesResources']['stone'])+	parseInt(reportInfo['defender']['lossesResources']['stone']));
    newReport[10] += '[img]'+twLinks["twOtherImg"][2]+'[/img] '+ (parseInt(reportInfo['attacker']['lossesResources']['iron']) +	parseInt(reportInfo['defender']['lossesResources']['iron']));
    newReport[10] += ' (Total: [img]'+twLinks["twOtherImg"][3]+'[/img][b]'+(parseInt(reportInfo['attacker']['lossesResources']['wood'])+parseInt(reportInfo['defender']['lossesResources']['wood'])+parseInt(reportInfo['attacker']['lossesResources']['stone'])+parseInt(reportInfo['defender']['lossesResources']['stone'])+parseInt(reportInfo['attacker']['lossesResources']['iron'])+parseInt(reportInfo['defender']['lossesResources']['iron']))+'[/b] Rohstoffe)';
		
		newReport[10] +='[/quote]';
		return newReport;
};
//__________________________________________________________________________________________________________________//

// Method: DSPreviewReportGenerator
// Summary: 
// Params: report[]
// Returns: reportPreview[]
function DSPreviewReportGenerator(reportWithForumTags)
{

	var reportTmp = reportWithForumTags;
	var reportPreview = "";
	var ForumTags = new Array('[quote]','[/quote]','[village]','[/village]','[player]','[/player]','[b]', '[/b]', '[i]', '[/i]', '[u]', '[/u]', '\n','[color=white]', '[color=darkred]', '[color=sienna]','[color=purple]','[color=navy]', '[color=green]', '[color=red]', '[color=blue]', '[/color]', '[size=11]', '[size=15]', '[/size]');
      var aa = ForumTags.length+1

      for(var i=0;i<twBuildingsNamesArray.length;i++){
      ForumTags[aa+i] = "[img]"+twImgsPath+"buildings/"+twBuildingsNamesArray[i]+".png[/img]"
      }
      aa = ForumTags.length+1

      for(var i=0;i<twOtherNamesArray.length;i++){
      ForumTags[aa+i] = "[img]"+twImgsPath+twOtherNamesArray[i]+".png[/img]"
      }
      aa = ForumTags.length+1

      for(var i=0;i<twUnitsNamesArray.length;i++){
      ForumTags[aa+i] = "[img]"+twImgsPath+"unit/unit_"+twUnitsNamesArray[i]+".png[/img]"
      }
	var HtmlTags = new Array('','','<b><span style="color: navy;">','</span></b>','<b><span style="color: purple;">','</span></b>','<b>', '</b>', '<i>', '</i>','<u>', '</u>', '<br>', '<span style="color: white;">','<span style="color:#C40000;">', '<span style="color: sienna;">','<span style="color: purple;">','<span style="color: navy;">','<span style="color: green;">', '<span style="color: red;">', '<span style="color: blue;">', '</span>', '<span style="font-size: 13px;">','<span style="font-size: 15px;">', '</span>');

var aa = HtmlTags.length+1
for(var i=0;i<twBuildingsNamesArray.length;i++){
HtmlTags[aa+i] = "<img border='0' class='resizeImage' alt='' src='"+twImgsPath+"buildings/"+twBuildingsNamesArray[i]+".png'/>"
}	
aa = HtmlTags.length+1
for(var i=0;i<twOtherNamesArray.length;i++){
HtmlTags[aa+i] = "<img border='0' class='resizeImage' alt='' src='"+twImgsPath+twOtherNamesArray[i]+".png'/>"
}
aa = HtmlTags.length+1
for(var i=0;i<twUnitsNamesArray.length;i++){
HtmlTags[aa+i] = "<img border='0' class='resizeImage' alt='' src='"+twImgsPath+"unit/unit_"+twUnitsNamesArray[i]+".png'/>"
}

	var j = 0;
	
	for(var k = 0;k<reportTmp.length;k++){
		for(var i=0;i<ForumTags.length;i++) {
			while(reportTmp[k].indexOf(ForumTags[i], 0) != -1)
				reportTmp[k] = reportTmp[k].replace(ForumTags[i], HtmlTags[i]);
		}
		reportPreview += reportTmp[k];
	}
	return reportPreview;
};
//__________________________________________________________________________________________________________________//

// Method: DSReportInterface()
// Summary: 
// Params: nothing
// Returns: nothing
function DSReportInterface()
{
    remove_it(window.document,document.getElementById('twLinkReporter'),null,null,null);
		var data = DSReportData();
		var report = DSReportGenerator(data);
		var reportWithForumTags = "";
		for(var i=0;i < report.length;i++)
			reportWithForumTags += report[i]
		var reportWithoutForumTags = DSPreviewReportGenerator(report)
		var newHTML = '';
		
		newHTML += '<dl id="reportEffect"><dl>'
			newHTML += "<h2><b>Bericht formatierer</b></h2>"
			newHTML += '<dt><a href="javascript:void(0)">BB CODE<span style="color:#000000;font-size:6pt;"><b> v.'+STSRver+' by Dr_Spoo</b></span></dt>';
			newHTML += '<tr><textarea id="twReport"  name="twReport" cols=80 rows=15>'+reportWithForumTags+'</textarea></tr>';
			//newHTML += '<dt id="twReportPreview"><a href="javascript:void(0)">Auflistung</a></dt>';
			//newHTML += '<dd>'+ reportWithoutForumTags +'</dd>';

					
		newHTML += '</dl></dl>'
		
		var elem = document.evaluate('/html/body/table[3+'+DSPREMIUM+']/tbody/tr/td/table/tbody/tr/td[2]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
		elem.singleNodeValue.textContent = '';
		elem.singleNodeValue.innerHTML = newHTML;

};
//__________________________________________________________________________________________________________________//
// Method: DSSetReport
// Summary: 
// Params: nothing
// Returns: nothing
function DSSetReport()
{

		var url = "";
		var data = DSReportData();
		var QtyUnits = 0
		
		data["morale"] = data["morale"].replace(' ', '');
		url += "&moral="+data["morale"].replace('%', '');
		
		for(var i=0;i<twUnitsNamesArray.length;i++){
			QtyUnits = (parseInt(data['attacker']['army'][twUnitsNamesArray[i]]['total']) - parseInt(data['attacker']['army'][twUnitsNamesArray[i]]['losses']));
			if(QtyUnits > 0) url += "&att_"+twUnitsNamesArray[i]+"="+QtyUnits; 
		}
		for(var i=0;i<twUnitsNamesArray.length;i++){
			QtyUnits = (parseInt(data['defender']['army'][twUnitsNamesArray[i]]['total']) - parseInt(data['defender']['army'][twUnitsNamesArray[i]]['losses']));
			if(QtyUnits > 0) url += "&def_"+twUnitsNamesArray[i]+"="+QtyUnits;
		}
		
		var init = 3;

		if(document.evaluate('/html/body/table[3+'+DSPREMIUM+']/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr[4]/td',document,null,XPathResult.STRING_TYPE,null).stringValue == "Weitergeleitet von:")
			init = 5;
			
		var DSrep = document.evaluate('/HTML[1]/BODY[1]/TABLE[3+'+DSPREMIUM+']/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR['+init+']/TD[1]/H3[1]', document,null,XPathResult.STRING_TYPE,null).stringValue
		if (DSrep){
		
		var newHTML = '';
		newHTML += '<table class="vis" style="width:100px;margin-top:10px;">';
		newHTML += '	<tr>';
		newHTML += '		<th>Optionen</th>';
		newHTML += '	</tr>';
		newHTML += '	<tr>';
		newHTML += '		<td><a id="twLinkReporter" href="javascript:void(0);" >&raquo; DS Report</a></td>';
		newHTML += '	</tr>';
		newHTML += '	<tr>';
		newHTML += '	</tr>';
		newHTML += '</table>'
		var twReporterOptions = document.evaluate('/html/body/table[3+'+DSPREMIUM+']/tbody/tr/td/table/tbody/tr/td',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
		twReporterOptions.singleNodeValue.innerHTML += newHTML;
    document.getElementById("twLinkReporter").addEventListener("click",DSReportInterface,true);

}}

// =================================================================================================================//
// INIT!!
// =================================================================================================================//
DSInitNewCSS()
		    DSInitialize(); 
        DSSetReport();