// ==UserScript==
// @name       Bifrost - IMD/PURE
// @namespace  https://humtek.hum.au.dk/opgaver/
// @version    0.2
// @description  enter something useful
// @match      https://humtek.hum.au.dk/opgaver/opgavevisning.php*
// @copyright  2012+, You
// @resource customCSS http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css
// @require http://code.jquery.com/jquery-1.9.1.js
// @require http://code.jquery.com/ui/1.10.2/jquery-ui.js
// ==/UserScript==

var newCSS = GM_getResourceText("customCSS");
GM_addStyle(newCSS);

var history = $("#reltable");
history.hide('highlight', {}, 0);


if($("#emne").val().indexOf("IDM/PURE") !== -1){        
    doCoolStuff();
}

function doCoolStuff(){
    history.append($("<div></div>").attr("id", "dialogTextBox"));
    var beskrivelseHTML = $("#Beskrivelse").val();
    $("#dialogTextBox").html(beskrivelseHTML.replace(/\n/g, '<br />')).css("font-size : 5px;");
    var urlArray = getUrlVars();
    var OpgaveNummer = urlArray['Opgnr'];
    var brugeren;
    if(beskrivelseHTML.indexOf("NEDLUKNING AF VISNINGDATA") !== -1){
        brugeren = beskrivelseHTML.substring(beskrivelseHTML.indexOf("Bruger: ")+8, beskrivelseHTML.indexOf("Cprnr:")-1);
    }else{
    	brugeren = beskrivelseHTML.substring(beskrivelseHTML.indexOf("Navn: ")+6, beskrivelseHTML.indexOf("Cprnr:")-1);
    }
    var indsender = $("#navn").val();
    var taskID = determineTaskID(beskrivelseHTML);
    
    
    $("#dialogTextBox").dialog({
        model : true,
        autoOpen : true,
        height : 800,
        width : 1000,
        buttons : {
            "Standard mail" : function(){
            	window.open('nymail.php?Opgnr='+OpgaveNummer+'&redaktor='+encodeURIComponent(indsender)+'&brugeren='+encodeURIComponent(brugeren)+'&taskID='+encodeURIComponent(taskID), '_blank', 'width=800,height=900');
                $(this).dialog('close');
            },
            "Tom mail" : function(){
            	window.open('nymail.php?Opgnr='+OpgaveNummer, '_blank', 'width=800,height=900');
            },
            "Luk" : function(){
            	$(this).dialog('close');
            }
        },
        position : {
        	my: "center center", 
            at: "center center", 
            of: window
        }
    }); 
    
}

function determineTaskID(beHTML){
    if(beHTML.indexOf("NEDLUKNING AF VISNINGDATA / MEDARBEJDERFORHOLD") !== -1){
        return 2;
    }else{
    	return 1;
    }
}

function getUrlVars(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}