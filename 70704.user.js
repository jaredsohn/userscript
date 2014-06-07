// ==UserScript==
// @name          Freekick youth analyzer and training calculation
// @description   Estimates youth player potentials in Freekick online manager game.
// @author        unbeliever
// @version 	  1.0.2.4
// @include       http://freekick.org/*
// @include       http://*.freekick.org/*
// ==/UserScript==


var isEnabled = true;
var numberOfCalculation = 100;
var localization;
var skillNumber = 0;          
var currents = new Array();         
var trainingCurrents = new Array();                              
var potentials = new Array();
var raises = new Array();
var isYouth = false;
var skillTable;
var currentNumber = 0;
var trainingTable;
var playerAge;
var ageFormat;
var predictabilityText;

//English text
localization = new Object;
localization['estimatedPotentialRaiseAbbreviation'] = "E";
localization['estimatedPotentialRaiseHeader'] = "Estimated potential";
localization['estimatedPotentialRaiseDescription'] = "Shows estimation of the potential skills when the youth player become senior. Note that it can vary each time you view the player.";
localization['estimation'] = "Estimation";
localization['estimatedAge'] = "Estimated age: ";
////Hungarian:
//localization["estimatedPotentialRaiseHeader"] = "Várható potenciál";
//localization["estimatedPotentialRaiseDescription"] = "A várható potenciál érték azt mutatja, milyen potenciálra számíthatunk, amikor a játékos eléri a 21. évét. A számítás becslésen alapul, így az eredmények különbözoek lehetnek minden oldal betöltéskor.";
//localization["estimation"] = "Várható";
////Czech
//localization["estimatedPotentialRaiseAbbreviation"] = "O";
//localization["estimatedPotentialRaiseHeader"] = "Očekávaný Potenciál";
//localization["estimatedPotentialRaiseDescription"] = "Ukazuje odhad hráčových schopností při dosažení věku 21 let. Uvědomte si, že se může při každém shlédnutí hráče lišit.";
//localization["estimation"] = "Odhad";
////Italian
//localization["estimatedPotentialRaiseAbbreviation"] = "S";
//localization["estimation"] = "Stima";
////French
//localization["estimatedPotentialRaiseAbbreviation"] = "E";
//localization["estimatedPotentialRaiseHeader"] = "Potentiel estimé";
//localization["estimatedPotentialRaiseDescription"] = "Montre une estimation des potentiels du joueur quand il deviendra sénior. Ils peuvent varier chaque fois que vous regardez le joueur.";
//localization["estimation"] = "Estimation";
////Portugues
//localization["estimatedPotentialRaiseAbbreviation"] = "E";
//localization["estimatedPotentialRaiseHeader"] = "Potencial estimado";
//localization["estimatedPotentialRaiseDescription"] = "Mostra a estimativa do potencial da habilidade do jogador jovem quando chegar a sénior. Nota que pode variar cada vez que vejas o jogador.";
//localization["estimation"] = "Estimativa";
////Serbian
//localization["estimatedPotentialRaiseAbbreviation"] = "M";
//localization["estimatedPotentialRaiseHeader"] = "Predviđeni potencijal";
//localization["estimatedPotentialRaiseDescription"] = "Pokazuje predviđanja potencijalnih vrednosti veština kada igrač postane senior. Zapamtite da ove vredosti mogu varirati pri svakom pregledu igrača.";
//localization["estimation"] = "Predviđanje";
////Romanian
//localization["estimatedPotentialRaiseAbbreviation"] = "E";
//localization["estimatedPotentialRaiseHeader"] = "Potenţial estimat";
//localization["estimatedPotentialRaiseDescription"] = "Arată estimarea potenţialelor valori ale juniorului când va deveni senior. De notat că este posibil să varieze la fiecare vizualizare a juniorului.";
//localization["estimation"] = "Estimare";
////Turkish
//localization["estimatedPotentialRaiseAbbreviation"] = "TP";
//localization["estimatedPotentialRaiseHeader"] = "Tahmini potansiyel";
//localization["estimatedPotentialRaiseDescription"] = "Oyuncunun paftan çikacagi zamanki tahmini potansiyel degerini gösterir. Oyuncuya her baktiginizda ufak bir degişiklik gösterecegini unutmayiniz.";
//localization["estimation"] = "Tahmin";

function addCSS()
{
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) 
    {
	    var node = document.createElement("style");
	    node.type = "text/css";
	    node.appendChild(document.createTextNode(""));
	    heads[0].appendChild(node);
	}
}

function getText(doc, node)
{
    if (doc.all)
    {
        return node.innerText;
    }
    else
    {
        return node.textContent;
    }
}

function setText(doc, node, value)
{
    if (doc.all)
    {
        node.innerText = value;
    }
    else
    {
        node.textContent = value;
    }
}

function addJS()
{
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) 
    {
	    var node = document.createElement("script");
	    node.type = "text/javascript";
	    var script = "function fk_collapse(id, force) { if (NEW_DEAL_DESIGN) { var el = $(id); $(el.id+'-content').toggleClassName('hidden');  if (!force)   el.toggleClassName('button-collapsed').toggleClassName('button-expanded').blur();    else      el.removeClassName('button-collapsed').addClassName('button-expanded').blur();      } else {    var table = $('collapse-table-' + id), icon;    if (table){      icon = $('collapse-icon-' + id);      if ((!force && table.hasClassName('collapsed')) || (force && force == 'expand')) {        table.removeClassName('collapsed').addClassName('expanded');        icon.removeClassName('expand').addClassName('collapse');      } else {        table.removeClassName('expanded').addClassName('collapsed');        icon.removeClassName('collapse').addClassName('expand');      }      icon.blur();    }  }} ";                
        
        script += "function change(i, increase) { ";
	    script += "var currents = new Array(); ";
	    script += "var estimatedPots = new Array(); ";
	    script += "var trainingCurrents = new Array(); ";
	    for (i = 0; i < currentNumber; ++i)
	    {
	       	script += "trainingCurrents["+ i +"] = " + trainingCurrents[i] + "; ";
	       	script += "currents["+ i +"] = " + currents[i] + "; ";
	       	var estPot = potentials[i] + raises[i];
	       	script += "estimatedPots["+ i +"] = " + estPot + "; ";
	    }
	    script += "var pred = document.getElementById('estimated-predictability'); var spanRaise = document.getElementById('skill-raise-' + i); var raise; var ageSpan = document.getElementById('estimated-age'); var ageArray; var ageFormat; var playerAge; var isYouth; var isOld = false; raise = getRaise(i); ageArray = getText(ageSpan).split(','); if (ageArray[1] != undefined) { var y = parseInt(ageArray[0]); var m = parseInt(ageArray[1]); var d = parseInt(ageArray[2]); ageFormat = ageArray[0].replace(y + '', '{0}') + ',' + ageArray[1].replace(m + '', '{1}') + ',' + ageArray[2].replace(d + '', '{2}'); playerAge = new Date(y, m, d); isYouth = (y < 21); isOld = false; } else { ageArray = getText(ageSpan).split(' '); if (ageArray[1] != undefined) { var y = parseInt(ageArray[0]); var m = parseInt(ageArray[1]); var d = parseInt(ageArray[2].substring(1)); ageFormat = ageArray[0].replace(y + '', '{0}') + ' ' + ageArray[1].replace(m + '', '{1}') + ' ' + ageArray[2].replace(d + '', '{2}'); playerAge = new Date(y, m, d); isYouth = (y < 21); isOld = false; } } if (increase == 1 && trainingCurrents[i - 1] + raise < 100) { if (isOld) return; trainingCurrents[i - 1] = trainingCurrents[i - 1] + raise + 1; } else if (increase == 0 && trainingCurrents[i - 1] + raise > currents[i - 1]) { trainingCurrents[i - 1] = trainingCurrents[i - 1] + raise - 1; } else { return; } if (pred && (i == 1 || i == 2 || i == 3 || i == 5)) { var sc = i == 1 ? trainingCurrents[0] : trainingCurrents[0] + getRaise(1); var op = i == 2 ? trainingCurrents[1] : trainingCurrents[1] + getRaise(2); var bc = i == 3 ? trainingCurrents[2] : trainingCurrents[2] + getRaise(3); var ae = i == 5 ? trainingCurrents[4] : trainingCurrents[4] + getRaise(5); calcPred(sc, op, bc, ae); } var span = document.getElementById('skill-' + i); setText(span, trainingCurrents[i - 1]); var classType = 'awesome'; if (trainingCurrents[i - 1] < 15) { classType = 'awful'; } else if (trainingCurrents[i - 1] < 30) { classType = 'poor'; } else if (trainingCurrents[i - 1] < 40) { classType = 'weak'; } else if (trainingCurrents[i - 1] < 50) { classType = 'decent'; } else if (trainingCurrents[i - 1] < 60) { classType = 'good'; } else if (trainingCurrents[i - 1] < 70) { classType = 'excellent'; } else if (trainingCurrents[i - 1] < 80) { classType = 'superb'; } else if (trainingCurrents[i - 1] < 90) { classType = 'brilliant'; } span.className = classType; var diff = trainingCurrents[i - 1] - currents[i - 1]; if (diff > 0) { setText(spanRaise, '+' + diff); if (trainingCurrents[i - 1] > estimatedPots[i - 1]) { spanRaise.style.color = 'red'; } else { spanRaise.style.color = ''; } } else { setText(spanRaise, ' '); } var dayDiff; var seniorNormal = 24; var seniorOver = 94; var youthNormal = 30; var youthOver = 118; if (increase == 1) { if (isYouth) { if (trainingCurrents[i - 1] > estimatedPots[i - 1]) { playerAge.setDate(playerAge.getDate() + youthOver); } else { playerAge.setDate(playerAge.getDate() + youthNormal); } } else { if (trainingCurrents[i - 1] > estimatedPots[i - 1]) { playerAge.setDate(playerAge.getDate() + seniorOver); } else { playerAge.setDate(playerAge.getDate() + seniorNormal); } } } else { var isNormalTraining = (trainingCurrents[i - 1] < estimatedPots[i - 1]); var tempAge = new Date(playerAge.getTime()); if (isNormalTraining) { tempAge.setDate(playerAge.getDate() - youthNormal); if (isYouth || tempAge.getFullYear() < 1921) { playerAge.setDate(playerAge.getDate() - youthNormal); } else { playerAge.setDate(playerAge.getDate() - seniorNormal); } } else { tempAge.setDate(playerAge.getDate() - youthOver); if (isYouth || tempAge.getFullYear() < 1921) { playerAge.setDate(playerAge.getDate() - youthOver); } else { playerAge.setDate(playerAge.getDate() - seniorOver); } } } setText(ageSpan, ageFormat.replace('{0}', (playerAge.getFullYear() + '').substr(2)).replace('{1}', playerAge.getMonth() + '').replace('{2}', playerAge.getDate() + '')); if (playerAge.getFullYear() < 1921) { ageSpan.className = 'age-youth'; } else if (playerAge.getFullYear() < 1927) { ageSpan.className = 'age-senior'; } else if (playerAge.getFullYear() < 1930) { ageSpan.className = 'age-old'; } else { ageSpan.className = 'age-retired'; } } function calcPred(sc, op, bc, ae) { var avg = (sc + op + bc + ae) / 4; var sc_diff_avg = sc - avg; var op_diff_avg = op - avg; var bc_diff_avg = bc - avg; var ae_diff_avg = ae - avg; var pred = 0; var sc_pred = 0; var op_pred = 0; var bc_pred = 0; var ae_pred = 0; var pred_under_0 = 0; var pred_over_100 = 0; if (sc_diff_avg < 0) { sc_pred = 5.33 * Math.abs(sc_diff_avg) - 60.33; } if (op_diff_avg < 0) { op_pred = 5.33 * Math.abs(op_diff_avg) - 60.33; } else { op_pred = 5.33 * op_diff_avg - 80.66; } if (bc_diff_avg < 0) { bc_pred = 5.33 * Math.abs(bc_diff_avg) - 60.33; } else { bc_pred = 5.33 * bc_diff_avg - 80.66; } ae_pred = 5.33 * Math.abs(ae_diff_avg) - 80.66; if (sc_pred != 0) { pred = Math.round(Math.max(sc_pred, op_pred, bc_pred, ae_pred)); } else { pred = Math.round(Math.max(op_pred, bc_pred, ae_pred)); } if (pred < 0) { pred_under_0 = pred; pred = 0; } if (pred > 100) { pred_over_100 = pred - 100; pred = 100; } var ageSpan = document.getElementById('estimated-predictability'); setText(ageSpan, pred); } function getText(e) { if (document.all) { return e.innerText } else { return e.textContent } } function setText(node, value) { if (document.all) { node.innerText = value } else { node.textContent = value } } function getRaise(i) { var raise = parseInt(getText(document.getElementById('skill-raise-' + i)).substr(1)); if (isNaN(raise)) raise = 0; return raise; } var _interval = -1; var _running = -1; var _timeStart = 0; var _skillIndex = 0; function run() { if (_running == -1) return; var elapsed = new Date().getTime() - _timeStart; if (elapsed > 1500) { for (i = 0; i < 5; ++i) change(_skillIndex, _running); } else if (elapsed > 400) { change(_skillIndex, _running); } } function stopTimer() { _running = -1; if (_interval != -1) { clearInterval(_interval); _interval = -1; } } function startTimer(skillIndex, increase) { if (_running != -1) stopTimer(); _skillIndex = skillIndex; _running = increase; change(_skillIndex, _running); _timeStart = new Date().getTime(); _interval = setInterval(run, 100); }";
        setText(document, node, script);
	    heads[0].appendChild(node);
	}
}

String.prototype.format = function()
{
    var pattern = /\{\d+\}/g;
    var args = arguments;
    return this.replace(pattern, function(capture){ return args[capture.match(/\d+/)]; });
}

function dateToString(date)
{
    return ageFormat.format((date.getFullYear()+'').substr(2), date.getMonth()+'', date.getDate()+'');
}

var freekickyouthanalyzer = {

    // load the preferences at start
    loadPrefs: function() {

        return true;
    },

    isFreekick: function(href) {
        if (href.match(/^http:\/\/www.freekick.org/)) return true;
        if (href.match(/^http:\/\/freekick.org/)) return true;
        return (false);
    },

    isFreekickPlayer: function(href) {
        if (freekickyouthanalyzer.isFreekick(href)) {
            if (href.match(/loc=player./)) {
                return (true);
            }
        }
        if (href.match(/testplayer.htm/)) {
            return (true);
        }
        return (false);
    },

    // get player age
    getPlayerAge: function(doc, div) {       
      
        var ageSpan = div.childNodes[1].childNodes[1].childNodes[3];        
        var ageArray = getText(doc, ageSpan).split(",");
        
        if (ageArray[1] != undefined) // y, m, d
        {
 
            var y = parseInt(ageArray[0]);
            var m = parseInt(ageArray[1]);
            var d = parseInt(ageArray[2]);
            
            ageFormat = ageArray[0].replace(y+'', '{0}') + ',' + ageArray[1].replace(m+'', '{1}')+ ',' + ageArray[2].replace(d+'', '{2}');
            
            playerAge = new Date(y, m, d);	               
            
            isYouth = (y < 21);            
        }
        // in chinese there's no comma
        else
        {
        	ageArray = ageSpan.innerHTML.split(' ');
        	if (ageArray[1] != undefined) // y, m, d
	        {
	            var y = parseInt(ageArray[0]);
	            var m = parseInt(ageArray[1]);
	            // in chinese the number in between
	            var d = parseInt(ageArray[2].substring(1));
	            
	            ageFormat = ageArray[0].replace(y+'', '{0}') + ' ' + ageArray[1].replace(m+'', '{1}')+ ' ' + ageArray[2].replace(d+'', '{2}');
	            
                playerAge = new Date(y, m, d);	                        
                
	            isYouth = (y < 21);
	        }
        }        
    },

    // get player potentials
    getPlayerPotentials: function(doc, div) {
        
        var child = div;        
  
        skillTable = child.childNodes[3].childNodes[1].childNodes[1];          
        trainingTable = div.childNodes[3].childNodes[1].cloneNode(true);
                                     
        child = skillTable.firstChild;
                  
        while (child) {
                   
            tag = child.tagName;     
            if (tag && tag.toLowerCase() == "tr") {
            
                var curChild = child.childNodes[3];
                var cur;
                
                cur = parseInt(getText(doc, curChild));
                if (cur) {
                    currents[currentNumber] = cur;      
                    currentNumber = currentNumber + 1;                                                                    
                }
                        
                var innerChild = child.childNodes[7];
                
                var pot = parseInt(getText(doc, innerChild));
                if (pot) {                
                    potentials[skillNumber] = pot;
                    raises[skillNumber] = 0;
                    skillNumber = skillNumber + 1;                                                          
                }
            }
            child = child.nextSibling;
        }
    },
    
     // get predictability
    getPredictability: function(doc, div) {    
//        var child = div.childNodes[3].childNodes[1].childNodes[7];
//        if (child != null)
//        {
//            var text = getText(doc, child);
//            var i = 1;
//            while (text.substr(text.lastIndexOf('%')-i, 1) != ' ')
//            {
//                i++;
//            }
//        
//            predictabilityText = text.substr(0, text.lastIndexOf(' ')-i);
//        }
        predictabilityText = "Predictability";
    },

    // get player data
    getPlayer: function(doc) {        
        var data = doc.getElementById("main-content");        
        var child = data.childNodes[3].childNodes[1].childNodes[1].childNodes[1];        
        
        freekickyouthanalyzer.getPlayerAge(doc, child);
        freekickyouthanalyzer.getPlayerPotentials(doc, child);
        
        if (skillNumber == 8)
        {
             freekickyouthanalyzer.getPredictability(doc, child.childNodes[1]);
        }
    },

    estimatePotentialRaises: function() {
        var avgRaises = new Array();
        var totalDays = 6 * 365;
        var diff = playerAge - new Date(15, 0, 0);
        var playerDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        var percent = 1 - (playerDays / totalDays);
        var potRaises = ((skillNumber == 5 ? 60 : 80) + (Math.random() - 0.5) * 20) * percent;
        var numberOfRaises = Math.round(potRaises / 3);
        var sumPotsSquare = 0;
        var i, j, x;
        for (i = 0; i < skillNumber; i++) {
            sumPotsSquare += potentials[i] * potentials[i];
        }

        // get order of the skills, starting with the biggest 
        var potOrder = new Array();
        var potOrdered = potentials.slice();
        potOrdered.sort(function(a, b) { return b - a });

        for (i = 0; i < skillNumber; i++) {
            for (j = 0; j < skillNumber; j++) {
                if (potentials[j] == potOrdered[i]) {
                   	var alreadyAdded = false;
                    if (i > 0 && potOrdered[i] == potOrdered[i - 1]) {
                    	var k = i - 1;
                    	while (k >= 0 && potOrdered[k] == potOrdered[i])
                    	{
                    		if (potOrder[k] == j)
                    		{
                    			alreadyAdded = true;
                    			break;
                    		}
                    		k--;
                    	}
                    }
                    if (!alreadyAdded)
                    {
                    	potOrder[i] = j;
                    	break;
                    }
                }
            }
        }

        for (x = 0; x < numberOfCalculation; x++) {
            var sumPotsSquareCurrent = sumPotsSquare;
            var potRaisesCurrent = potRaises;
            // calculate raises
            var estNumberOfRaises = 0;
            var pos = 0;
            for (i = 0; i < skillNumber; i++) {
                // we calculate raises for the biggest pontential first 
                pos = potOrder[i];
                raises[pos] = potentials[pos] * potentials[pos] / sumPotsSquareCurrent * potRaisesCurrent + (Math.random() - 0.5) * 4;
                raises[pos] = raises[pos] < 0 ? 0 : raises[pos];
                if (raises[pos] > 0) {
                    estNumberOfRaises++;
                    // cannot be more than 100
                    if (potentials[pos] + raises[pos] > 100) {
                        raises[pos] = 100 - potentials[pos];
                        if (raises[pos] == 0) estNumberOfRaises--;
                        sumPotsSquareCurrent -= potentials[pos] * potentials[pos]; // calculate the others without it
                        potRaisesCurrent -= raises[pos]; // calculate the others without it
                    }
                }
            }


            for (i = 0; i < skillNumber; i++) {
                pos = potOrder[i];
                // reduces raises to number of raises
                if (numberOfRaises < estNumberOfRaises && numberOfRaises < i) {
                    raises[pos] = 0;
                }
                if (x > 0) {
                    avgRaises[pos] = (avgRaises[pos] * x + raises[pos]) / (x + 1);
                    raises[pos] = 0;
                }
            }

            if (x == 0) {
                avgRaises = raises.slice();
            }
        }

        for (i = 0; i < skillNumber; i++) {
            raises[i] = Math.round(avgRaises[i]);
        }
    },


    createHeader: function(doc, skillIndex) {
        var newNode = doc.createElement("th");
        var newText = doc.createTextNode(localization["estimatedPotentialRaiseAbbreviation"]);
        newNode.style.width = 50;
        newNode.setAttribute("class", "algnC");
        newNode.setAttribute("onmouseout", "UnTip();");
        newNode.setAttribute("onmouseover", "Tip('" +
        localization["estimatedPotentialRaiseDescription"] +
        "', BGCOLOR, '#FFFFCC', BORDERCOLOR, '#000000', FONTCOLOR, '#000000', DELAY, 500, TITLE, '" +
        localization["estimatedPotentialRaiseHeader"] +
        "', WIDTH, -350, OFFSETX, -125);");
        newNode.appendChild(newText);
        return newNode;
    },

    // create a row an estimated potential skill value
    createSkillRow: function(doc, skillIndex) {
        var estValue = potentials[skillIndex] + raises[skillIndex];
        var newNode = doc.createElement("td");
        var newText = doc.createTextNode(estValue);
        var classType = "minimal  algnR noPaddedR awesome";
        if (estValue < 15) {
            classType = "minimal  algnR noPaddedR awful";
        }
        else if (estValue < 30) {
            classType = "minimal  algnR noPaddedR poor";
        }
        else if (estValue < 40) {
            classType = "minimal  algnR noPaddedR weak";
        }
        else if (estValue < 50) {
            classType = "minimal  algnR noPaddedR decent";
        }
        else if (estValue < 60) {
            classType = "minimal  algnR noPaddedR good";
        }
        else if (estValue < 70) {
            classType = "minimal  algnR noPaddedR excellent";
        }
        else if (estValue < 80) {
            classType = "minimal  algnR noPaddedR superb";
        }
        else if (estValue < 90) {
            classType = "minimal  algnR noPaddedR brilliant";
        }
        newNode.setAttribute("class", classType);
        newNode.setAttribute("onmouseover", "Tip('+" +
        raises[skillIndex] +
        "', BGCOLOR, '#FFFFCC', BORDERCOLOR, '#000000', FONTCOLOR, '#000000', DELAY, 500, TITLE, '" +
        localization["estimation"] +
        "', WIDTH, 0, OFFSETX, 0);");
        newNode.setAttribute("onmouseout", "UnTip();");
        newNode.setAttribute("style", "font-weight:normal");
        newNode.appendChild(newText);
        return newNode;
    },

    showResult: function(doc) {    

        if (skillTable) {
            var child = skillTable.childNodes[0];
                  
            var rowAdded = 0;
            while (child) {
                tag = child.tagName;
                                                 
                if (tag && tag.toLowerCase() == "tr") {
                    if (rowAdded == 0) {
                        // change the text of some long "Skills" translations
                        var skillsNode = child.childNodes[1];                        
                        switch (skillsNode.innerHTML) {
                            case "Aptitudes":
                                skillsNode.innerHTML = "Apt.";
                                skillsNode.setAttribute("onmouseover", "Tip('Aptitudes', BGCOLOR, 'FFFFCC', BORDERCOLOR, '000000', FONTCOLOR, '000000', DELAY, 500, TITLE, '', WIDTH, 0, OFFSETX, 0);");
                                skillsNode.setAttribute("onmouseout", "UnTip();");
                                break;
                        }
                        //blank col
                        //var newNode = doc.createElement("th");
                        //child.insertBefore(newNode, null);

                        newNode = freekickyouthanalyzer.createHeader(doc);                        
                        child.insertBefore(newNode, null);                        
                    }
                    else {
                        //blank col
                        //var newNode = doc.createElement("td");
                        //child.insertBefore(newNode, null);

                        newNode = freekickyouthanalyzer.createSkillRow(doc, rowAdded - 1);
                        child.insertBefore(newNode, null);
                    }
                    rowAdded++;                    
                }
                child = child.nextSibling;
            }
        }
    },
    
    addTrainingCalculationHeader: function(doc, parent)
    {
        var divHeadOuter = doc.createElement("div");
        var divHeadInner = doc.createElement("div");
        var divRight = doc.createElement("div");
        var aCollapse = doc.createElement("a");
        var h3Title = doc.createElement("h3");
        var spanTitle = doc.createElement("span");
        var spanSubTitle = doc.createElement("span");    
        divHeadOuter.className = "header-outer";   
        divHeadInner.className = "header-inner";
        divRight.className = "right buttons";
        aCollapse.title = "Toggle";
        aCollapse.className = "button-sprite button-collapsed";
        aCollapse.id = "collapse-9";
        aCollapse.setAttribute("onclick", "fk_collapse(this);return false;");
        aCollapse.setAttribute("href", "#");
        setText(doc, aCollapse, "Toggle");
        h3Title.className = "clear";
        spanTitle.id = "header-9";
        spanTitle.className = "header-title left";
        spanSubTitle.className = "header-sub-title left";
        setText(doc, spanTitle, "Training calculation");
        divRight.appendChild(aCollapse);
        divHeadInner.appendChild(divRight);
        h3Title.appendChild(spanTitle);
        h3Title.appendChild(spanSubTitle);
        divHeadInner.appendChild(h3Title);
        divHeadOuter.appendChild(divHeadInner);
        parent.insertBefore(divHeadOuter, parent.firstChild);         
           
        return divHeadOuter;
    },
    
    calcPred: function() {
     
        var sc = currents[0];
        var op = currents[1];
        var bc = currents[2];
        var ae = currents[4];
        var avg = (sc + op + bc + ae) / 4;

        var sc_diff_avg = sc - avg;
        var op_diff_avg = op - avg;
        var bc_diff_avg = bc - avg;
        var ae_diff_avg = ae - avg;

        var pred = 0;
        var sc_pred = 0;
        var op_pred = 0;
        var bc_pred = 0;
        var ae_pred = 0;
        var pred_under_0 = 0;
        var pred_over_100 = 0;
        if (sc_diff_avg < 0) {
            sc_pred = 5.33 * Math.abs(sc_diff_avg) - 60.33;
        }
        if (op_diff_avg < 0) {
            op_pred = 5.33 * Math.abs(op_diff_avg) - 60.33;
        } else {
            op_pred = 5.33 * op_diff_avg - 80.66;
        }
        if (bc_diff_avg < 0) {
            bc_pred = 5.33 * Math.abs(bc_diff_avg) - 60.33;
        } else {
            bc_pred = 5.33 * bc_diff_avg - 80.66;
        }
        ae_pred = 5.33 * Math.abs(ae_diff_avg) - 80.66;

        if (sc_pred != 0) {
            pred = Math.round(Math.max(sc_pred, op_pred, bc_pred, ae_pred));
        } else {
            pred = Math.round(Math.max(op_pred, bc_pred, ae_pred));
        }

        if (pred < 0) {
            pred_under_0 = pred;
            pred = 0;
        }
        if (pred > 100) {
            pred_over_100 = pred - 100;
            pred = 100;
        }
          
        return pred;
    },
    
    createTrainingCalculationTable: function(doc, header, parent)
    {
    
        var rowCount = 0;
        var divContentMain = doc.createElement("div");     
        var divContent = doc.createElement("div");       
        var divTable = doc.createElement("div");     
        var child = trainingTable.childNodes[1].firstChild;
         
        divContentMain.className = "expanded hidden";
        divContentMain.id = "collapse-9-content";

        divContent.className = "alternate";

        while (child) {         

            var tag = child.tagName;
            if (tag) 
            {
                if (tag.toLowerCase() == "tr")
                {
                
                    var delChild = child.childNodes[10];
                    while (delChild)
                    {
                        child.removeChild(delChild);
                        delChild = child.childNodes[10];
                    }

                    if (rowCount == 0)
                    {
                        // skills
                        child.childNodes[1].width = 30;
                        // spacers                        
                        child.childNodes[5].width = 25;
                        child.childNodes[9].width = 25;
                        
                        if (skillNumber > 0)
                        {
                            // pots -> est. pots
                            var thPot = child.childNodes[7];
                            setText(doc, thPot, localization["estimatedPotentialRaiseAbbreviation"]);
                            thPot.setAttribute("class", "algnC");
                            thPot.setAttribute("onmouseout", "UnTip();");
                            thPot.setAttribute("onmouseover", "Tip('" +
                            localization["estimatedPotentialRaiseDescription"] +
                            "', BGCOLOR, '#FFFFCC', BORDERCOLOR, '#000000', FONTCOLOR, '#000000', DELAY, 500, TITLE, '" +
                            localization["estimatedPotentialRaiseHeader"] +
                            "', WIDTH, -350, OFFSETX, -125);");
                            //trainingTable.childNodes[1].replaceChild(thPot, child.childNodes[7]);
                            isFirst = false;
                        }
                    }
                    else
                    {
                        //child.style.verticalAlign = "middle";

                        // currents 
                        var curChild = child.childNodes[3];
                        var plus = doc.createElement("img");
                        var spacer = doc.createTextNode(" ");
                        var minus = doc.createElement("img");
                                             
                        plus.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAABKSURBVChTYzhz9cx/gnjVmf8MIEWEwMxVMzEVGofO/A/CyIA8hTCTkGkGqMkoJmJTCHMCeVbDHE+0Z7AFFcRqIAFi4MNpDTP/AwDSB0pW/yzwgAAAAABJRU5ErkJggg==");
                        plus.style.cursor = "pointer";
                        plus.style.verticalAlign = "middle";
                        plus.setAttribute("name","plus" + rowCount);
                        plus.setAttribute("onmouseout","javascript:document.plus"+rowCount+".src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAABKSURBVChTYzhz9cx/gnjVmf8MIEWEwMxVMzEVGofO/A/CyIA8hTCTkGkGqMkoJmJTCHMCeVbDHE+0Z7AFFcRqIAFi4MNpDTP/AwDSB0pW/yzwgAAAAABJRU5ErkJggg==';stopTimer()")
                        plus.setAttribute("onmouseover","document.plus"+rowCount+".src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAABnSURBVChTYzxz9cx/BkLgKgMDI0ihsawJXqWzdsxkYEJXYZI8kwGE0QGGQlxGs8Ak0E0B8c8CJf/PTQcrwWuiMZLxcBPPQHXCTIbxYWqJdiOGQpBJ6KaBTGU8s2rmf5Cj8YGz1xgYAIQEH+N//gz8AAAAAElFTkSuQmCC'")
                        plus.setAttribute("onmousedown","javascript:document.plus"+rowCount+".src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAABgSURBVChTY5y5auZ/BgLAmMGYgQGkkBB49PzRfyZ0w0zCZjGAMDrAUIjLFSwwCXRTQPyzQMn/q9LASvCaCPQCHMBNPAPVCTMZxoepJNqNRAcP4xlgOIrZeuINclmxrwwAMhNha/ZPvK4AAAAASUVORK5CYII=';startTimer("+rowCount+", 1)")
                        plus.setAttribute("onmouseup","javascript:document.plus"+rowCount+".src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAABnSURBVChTYzxz9cx/BkLgKgMDI0ihsawJXqWzdsxkYEJXYZI8kwGE0QGGQlxGs8Ak0E0B8c8CJf/PTQcrwWuiMZLxcBPPQHXCTIbxYWqJdiOGQpBJ6KaBTGU8s2rmf5Cj8YGz1xgYAIQEH+N//gz8AAAAAElFTkSuQmCC';stopTimer()")

                        minus.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAABJSURBVChTYzxz9cx/BkLgKlABSCEhMHPVzP9MhAyDyROtkAWmwyRsFobhZ4Ei/1elgcXxmmiMrHXgPMN4BhhGIEfjA2evMTAAAEv1WlHHDnQ5AAAAAElFTkSuQmCC");
                        minus.style.cursor = "pointer";
                        minus.style.verticalAlign = "middle";
                        minus.setAttribute("name","minus" + rowCount);
                        minus.setAttribute("onmouseout","javascript:document.minus"+rowCount+".src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAABJSURBVChTYzxz9cx/BkLgKlABSCEhMHPVzP9MhAyDyROtkAWmwyRsFobhZ4Ei/1elgcXxmmiMrHXgPMN4BhhGIEfjA2evMTAAAEv1WlHHDnQ5AAAAAElFTkSuQmCC';stopTimer()")
                        minus.setAttribute("onmouseover","document.minus"+rowCount+".src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAABOSURBVChTYzxz9cx/BkLgKgMDI0ihsawJXqWzdsxkYCJkGEyeaIUsMB0myTMxDD8LFPk/Nx0sjtdEYyStA+gZxjOrZv4HORofOHuNgQEAbTgZu1XguwQAAAAASUVORK5CYII='")
                        minus.setAttribute("onmousedown","javascript:document.minus"+rowCount+".src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAABNSURBVChTY5y5auZ/BgLAmMGYgQGkkBB49PzRfyZCpsHkiVbIAtNhEjYLw/CzQJH/q9LA4nhNBHoBAQbOM4xngOEoZuuJN5Rkxb4yAAD+kFkhUh3DIQAAAABJRU5ErkJggg==';startTimer("+rowCount+", 0)")
                        minus.setAttribute("onmouseup","javascript:document.minus"+rowCount+".src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAABOSURBVChTYzxz9cx/BkLgKgMDI0ihsawJXqWzdsxkYCJkGEyeaIUsMB0myTMxDD8LFPk/Nx0sjtdEYyStA+gZxjOrZv4HORofOHuNgQEAbTgZu1XguwQAAAAASUVORK5CYII=';stopTimer()")                        
                        
                        curChild.appendChild(plus);
                        curChild.appendChild(spacer);
                        curChild.appendChild(minus);      
                        curChild.className = "algnC";
                        curChild.firstChild.id = ("skill-" + rowCount);
                        trainingCurrents[rowCount-1] = currents[rowCount-1];
                        
                        var curRaise = doc.createElement("span");
                        curRaise.id = "skill-raise-" + rowCount;
                        setText(doc, curRaise, " ");     
                        curRaise.style.textAlign = "left";
                        child.childNodes[5].className = "";
                        child.childNodes[5].style.paddingLeft = 0;
                        child.childNodes[5].style.textAlign = "left";
                        child.childNodes[5].appendChild(curRaise);
                                                                   
                        // pots -> est. pots
                        if (skillNumber > 0 && raises[rowCount-1] > 0)
                        {
                            var estValue = potentials[rowCount-1] + raises[rowCount-1];
                            setText(doc, child.childNodes[7], estValue);     
                            setText(doc, child.childNodes[9], "+" + raises[rowCount-1]);  
                            child.childNodes[9].className = "";
                            child.childNodes[9].style.paddingLeft = 0;
                            child.childNodes[9].style.textAlign = "right";
                            var classType = "minimal  algnR noPaddedR awesome";
                            if (estValue < 15) {
                                classType = "minimal  algnR noPaddedR awful";
                            }
                            else if (estValue < 30) {
                                classType = "minimal  algnR noPaddedR poor";
                            }
                            else if (estValue < 40) {
                                classType = "minimal  algnR noPaddedR weak";
                            }
                            else if (estValue < 50) {
                                classType = "minimal  algnR noPaddedR decent";
                            }
                            else if (estValue < 60) {
                                classType = "minimal  algnR noPaddedR good";
                            }
                            else if (estValue < 70) {
                                classType = "minimal  algnR noPaddedR excellent";
                            }
                            else if (estValue < 80) {
                                classType = "minimal  algnR noPaddedR superb";
                            }
                            else if (estValue < 90) {
                                classType = "minimal  algnR noPaddedR brilliant";
                            }
                            child.childNodes[7].setAttribute("class", classType);
                        }
                    }
                    rowCount++;
                }
            }
            child = child.nextSibling;
        }
                
        var divAge = doc.createElement("div");
        var spanAge = doc.createElement("span");
        var spanNote = doc.createElement("span");
        spanAge.id = "estimated-age";
        if (isYouth)
        {
            spanAge.className = "age-youth";
        }
        else if (playerAge.getFullYear() < 1927)
        {
            spanAge.className = "age-senior";
        }
        else
        {
            spanAge.className = 'age-old';
        }
        
        setText(doc, spanAge, dateToString(playerAge));
        setText(doc, spanNote, 'Note: Training calculation is inaccurate by default. When calculating players at or above 27, it gets more unpredictable because of skilldrops. Above 30 it is worthless.');

        divAge.appendChild(spanAge);
        
        if (skillNumber == 8)
        {
            var divPred = doc.createElement("div");
            var spanPred = doc.createElement("span");
            spanPred.id = "estimated-predictability";
            
            setText(doc, spanPred, freekickyouthanalyzer.calcPred());
            
            divPred.appendChild(doc.createTextNode(predictabilityText + " "));
            divPred.appendChild(spanPred);
            divPred.appendChild(doc.createTextNode("%"));
        }
        
        divContent.appendChild(divAge);
        if (skillNumber == 8)
        {
            divContent.appendChild(divPred);
        }
        divTable.appendChild(trainingTable);
        divContent.appendChild(trainingTable);
        divContent.appendChild(spanNote);
        divContentMain.appendChild(divContent);

        parent.insertBefore(divContentMain, header.nextSibling);               
    },

    // main - called when every page load
    freekickAddYouthAnalyzer: function() {
        if (!isEnabled) return;

        freekickyouthanalyzer.loadPrefs();

        try {
            var href = window.location.href;

            // check if the page is a Freekick match report
            if (freekickyouthanalyzer.isFreekickPlayer(href)) {

                skillNumber = 0;
                currentNumber = 0;
                potentials = new Array();
                raises = new Array();

                // get player data           
                freekickyouthanalyzer.getPlayer(document);
                
                if (skillNumber == 5 || skillNumber == 8) 
                {
                    if (isYouth)
                    {
                        // calculate the possible raises
                        freekickyouthanalyzer.estimatePotentialRaises();
                     
                        // show the analyzation
                        freekickyouthanalyzer.showResult(document);
                    }
                }
                
                if (skillNumber == 5 || skillNumber == 8) 
                {
                    var rightDiv = document.getElementById("main-content").childNodes[3].childNodes[3];                    
                    var divHeader = freekickyouthanalyzer.addTrainingCalculationHeader(document, rightDiv);
                        
                    freekickyouthanalyzer.createTrainingCalculationTable(document, divHeader, rightDiv);
                }
                
            }
        } catch (e) {

        }
    },
};

freekickyouthanalyzer.freekickAddYouthAnalyzer();
addJS();