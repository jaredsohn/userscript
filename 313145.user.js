// ==UserScript==
// @name       U20 Cup Eligibility Script
// @namespace  http://playerx.hitwicket.com/
// @version    1.0
// @description  Script to show player's eligibility for u20 Cup
// @include      http://*hitwicket.com/transfer/index*
// @include	   http://*hitwicket.com/premium/players/index*
// @include	   http://*hitwicket.com/players/index*
// @copyright  2012+, PlayerX
// ==/UserScript==



function interceptAjax () {
    
    function getDisplayMessage(year) {
        return "<span class='eligibility' style='align:right;padding:5px;margin:2px;color:white;background-color:green;font-weight:bold;font-size:14px;'>Eligible for U20-" + year + "</span>"
    }
    
    function calc_age(player_age_year,player_age_days)
    {
        var u20cutoffdate = new Date(2014,01,20); //Feb 20 2014
        var u20versionOffset = 5; //version for the above u20cutoffdate
        var oneDay = 24*60*60*1000;
        var oneYear = oneDay * 70; //70days in a year in hw
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth(); //January is 0!
        var i=0;
        var isRunningU20VersionFound = false;
        var runningU20Version;
        while(!isRunningU20VersionFound) {
            //old u20 cutoff date?? 
            if(u20cutoffdate.getTime() < today.getTime()) {
                u20cutoffdate = new Date(u20cutoffdate.getTime() + oneYear);
                u20versionOffset++;
            }
            else {
                isRunningU20VersionFound = true;
            }
        }
        var fno="<span class='eligibility'></span>";
        var yyyy = today.getFullYear();
        var todaysDate = new Date(yyyy,mm,dd);        
        var diffDays = Math.abs((todaysDate.getTime() - u20cutoffdate.getTime())/(oneDay));
        var c,d,e,t;
        c=player_age_days+diffDays;
        d=c/70;e=c%70;
        t=player_age_year+d;t=parseInt(t);
        if(t<=17){return getDisplayMessage(u20versionOffset)+getDisplayMessage(u20versionOffset+1)+getDisplayMessage(u20versionOffset+2)+"<br/>"};
        if(t<=18){return getDisplayMessage(u20versionOffset)+getDisplayMessage(u20versionOffset+1)+"<br/>"};
        if(t<=19){if(e<=69) return getDisplayMessage(u20versionOffset)+"<br/>"; else return fno;} else return fno;
    }

    function updateEligibilityInfo() {
        $( "div.player_info2" ).each(function() {
        if($(this).find("span.eligibility").size() > 0) {
            return;
        }
        var ageFull;
        if($(this).find("p.transfer").size() > 0) {
         	ageFull = $($(this).find("strong").get(1)).text();   
        }
        else {
            ageFull = $(this).find("strong").first().text();  
        }
        var ageAsArr = ageFull.split(" ");
         $(this).prepend(calc_age(parseInt(ageAsArr[0]),parseInt(ageAsArr[2])));  	
        }); 
    }
    
    $('body').ajaxSuccess (
        function (event, requestData)
        {
            updateEligibilityInfo();           
        }
    );
    updateEligibilityInfo(); 
}

function addJS_Node (text, s_URL, funcToRun) {
    var D                                   = document;
    var scriptNode                          = D.createElement ('script');
    scriptNode.type                         = "text/javascript";
    if (text)       scriptNode.textContent  = text;
    if (s_URL)      scriptNode.src          = s_URL;
    if (funcToRun)  scriptNode.textContent  = '(' + funcToRun.toString() + ')()';

    var targ    = D.getElementsByTagName('head')[0] || D.body || D.documentElement;
    targ.appendChild (scriptNode);
}

addJS_Node ("updateEligibilityInfo", null, interceptAjax);
interceptAjax();
