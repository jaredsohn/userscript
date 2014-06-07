// ==UserScript==
// @name       BuzzerBeater : Evaluations
// @namespace  http://buzzer-manager.com/
// @version    0.1
// @description Add evaluation of player on buzzerbeater
// @include     http://*.buzzerbeater.*/players.aspx
// @include     http://*.buzzerbeater.*/player/*/overview.aspx
// @include     http://*.buzzerbeater.*/manage/transferlist.aspx
// @require		http://www.buzzer-manager.com/js/jquery.js
// @copyright  	2012+, sailor_man
// ==/UserScript==

(function(d) {
    
    function isValidValue(value) {
        value = parseFloat(value);
        return !isNaN(value) && value >= 0 && value <= 20;
    }
    
    function addSpace(nStr) {
        nStr += '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(nStr)) {
            nStr = nStr.replace(rgx, '$1' + ' ' + '$2');
        }
        return nStr;
    }
    
    String.prototype.splice = function( idx, rem, s ) {
        return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
    };
    
    function isSalaryComputable(node) {
        return isValidValue(getSkillValue(node, "JumpShot"));
    }
    
    function getSkillValue(node, skill) {
        for (var i = 0; i < node.childNodes.length; i++) {
            var child = node.childNodes[i];
            
            if(skill == 'potential')
                skill = '(potential|SkillDenominations1)'
                
                var rgx = new RegExp('ctl00_cphContent(\\w+)' + skill + '_linkDen');
            if(rgx.test(child.id)) {
                return child.title;
            }
            
            var value = getSkillValue(child, skill);
            if(isValidValue(value) == true) return value;
        }
        
        return false;
    }
    
    function insertEstimatedSalary(node, salary) {    
        for (var i = 0; i < node.childNodes.length; i++) {
            var child = node.childNodes[i];        
            
            var rgx = new RegExp('ctl00_cphContent(\\w*)_linkDen');
            if(rgx.test(child.id)) {
                var playerDescription = child.parentNode.innerHTML;
                var dollarPos = playerDescription.lastIndexOf("$");
                var brPos = playerDescription.indexOf("<br>",dollarPos);
                
                playerDescription = playerDescription.splice( brPos, 0, ' <span style="background-color: rgb(151, 232, 147)";>($ ' + addSpace(salary) + ')</span>');
                child.parentNode.innerHTML = playerDescription;
                
                return true;
            }
            
            if(insertEstimatedSalary(child, salary)) return true;
        }
        
        return false;
    }
    
    function insertPotentialLimits(node, potentialLimLow, potentialLimHigh) {
        for (var i = 0; i < node.childNodes.length; i++) {
            var child = node.childNodes[i];        
            
            var rgx = new RegExp('ctl00_cphContent(\\w*)_linkDen');
            if(rgx.test(child.id)) {               
                var text = (potentialLimLow == potentialLimHigh) ? potentialLimLow + '%' : potentialLimLow + '% - ' + potentialLimHigh + '%';
                
                var space = document.createTextNode(' ');
                var potentialSpan = document.createElement('span');
                potentialSpan.innerHTML = '[' + text + ']';
                potentialSpan.style. backgroundColor = '#F69C9E';
                
                child.parentNode.insertBefore(potentialSpan, child.nextSibling);
                child.parentNode.insertBefore(space, child.nextSibling);
                
                return true;
            }
            
            if(insertPotentialLimits(child,  potentialLimLow, potentialLimHigh)) return true;
        }
        
        return false;
    }
    
    function printEvaluation(position, evaluation, largest) {
        if(evaluation === largest) {
            return '<b>' + position + ': ' + evaluation.toFixed(2) + '</b>';
        }
        else {
            return position + ': ' + evaluation.toFixed(2);
        }
    }
    
    function insertEvaluation(node, evaluations) {
      
        
        for (var i = 0; i < node.childNodes.length; i++) {
            var child = node.childNodes[i];
            if(child.nodeType != 3) {
                var tables = child.getElementsByTagName("table");
                if(tables.length >= 2) {
                    var evaluationTable = document.createElement('table');
                    var tableContent = '<thead><tr><th>Evaluations BuzzerManager</th></tr></thead><tbody><tr><td>';
                
                    var evaluationsArray = [evaluations.m, evaluations.ar, evaluations.as, evaluations.af, evaluations.p];
                    var largest = Math.max.apply(Math, evaluationsArray);
                    
                    tableContent += printEvaluation('M', evaluations.m, largest) + ' | ';
                    tableContent += printEvaluation('AR', evaluations.ar, largest) + ' | ';
                    tableContent += printEvaluation('AS', evaluations.as, largest) + ' | ';
                    tableContent += printEvaluation('AF', evaluations.af, largest) + ' | ';
                    tableContent += printEvaluation('P', evaluations.p, largest);
                    
                    tableContent += '</td></tr></tbody>';
                    
                    evaluationTable.innerHTML = tableContent;
                    
                    tables[2].parentNode.appendChild(evaluationTable);
                    
                	return true;
                }
            }
 
            if(insertEvaluation(child,  evaluations)) return true;
        }
        
        return false;
    }
    
    var buzzermanagerApi = {
        computePlayerEstimatedSalary: function(player) {
            var api = 'http://www.buzzer-manager.com/api/getEstimatedSalary.php?';
            
            var skills = {
                "potential" :	getSkillValue(player, "potential"),
                "JumpShot" :	getSkillValue(player, "JumpShot"),
                "JumpRange" :	getSkillValue(player, "JumpRange"),
                "perimDef" :	getSkillValue(player, "perimDef"),
                "handling" :	getSkillValue(player, "handling"),
                "driving" :		getSkillValue(player, "driving"),
                "passing" :		getSkillValue(player, "passing"),
                "insideShot" :	getSkillValue(player, "insideShot"),
                "insideDef" :	getSkillValue(player, "insideDef"),
                "rebound" :		getSkillValue(player, "rebound"),
                "shotBlock" :	getSkillValue(player, "shotBlock")
            };
            
            for(var skill in skills) {
                api += skill + '=' + skills[skill] + '&';
            }
            
            GM_xmlhttpRequest({
                method: "GET",
                url: api,
                onload: function(response) {
                    var data = eval('('+response.responseText+')');
                    if(data.errorCode == 0) {
                        //insertEstimatedSalary(player, Math.round(data.results.estimatedSalary));
                        //insertPotentialLimits(player, data.results.potentialLimLow, data.results.potentialLimHigh);
                        insertEvaluation(player, data.results.evaluation);
                    }
                },
                onerror: function(response) {
                    console.debug(response.status, ":", response.statusText, ":", response.responseHeaders);
  				}
            });
        }
    }
    
    var players = new Array();
    
    players.push.apply(players, document.getElementsByClassName('widebox'));
    players.push.apply(players, document.getElementsByClassName('oldbox'));
    
    for(var i=0; i<players.length; i++) {
        var player = players[i];
        
        if(player.id === 'playerbox') {
            if(isSalaryComputable(player)){
                buzzermanagerApi.computePlayerEstimatedSalary(player);
            }
        }
    }
    
})(document);
