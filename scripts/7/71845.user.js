// ==UserScript==
// @name			Shows and Stores CN information
// @author			Sjors Pals
// @namespace		CNGM
// @include			http*://www.cybernations.net*
// @match			http*://www.cybernations.net*
// @version			0.1.2
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-03-18
// @lastupdated		2010-06-03
// @description		This userscript removes a large amount of known ads from usatoday.com. It doesn't get them all, but it removes a few.
// ==/UserScript==
//var vals = GM_listValues().map(GM_deleteValue);
var debug = '';
    GM_addStyle((<><![CDATA[
    .overview {
	    width: 700px;
	    padding: 0;
	    margin: 0;
	    font: normal 11px auto "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
	    color: #4f6b72;
	    background: #E6EAE9;	
    }

    .overview a {
	    color: #c75f3e;
    }

    .overview caption {
	    padding: 0 0 5px 0;
	    width: 700px;	 
	    font: italic 11px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
	    text-align: right;
    }

    .overview th {
	    font: bold 11px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
	    color: #4f6b72;
	    border-right: 1px solid #C1DAD7;
	    border-bottom: 1px solid #C1DAD7;
	    border-top: 1px solid #C1DAD7;
	    letter-spacing: 2px;
	    text-transform: uppercase;
	    text-align: left;
	    padding: 6px 6px 6px 12px;
	    background: #CAE8EA;
    }

    .overview th.nobg {
	    border-top: 0;
	    border-left: 0;
	    border-right: 1px solid #C1DAD7;
	    background: none;
    }

    .overview td {
	    border-right: 1px solid #C1DAD7;
	    border-bottom: 1px solid #C1DAD7;
	    background: #fff;
	    padding: 6px 6px 6px 12px;
	    color: #4f6b72;
    }


    .overview td.alt {
	    background: #F5FAFA;
	    color: #797268;
    }

    .overview th.spec {
	    border-left: 1px solid #C1DAD7;
	    border-top: 0;
	    background: #fff no-repeat;
	    font: bold 10px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
    }

    .overview th.specalt {
	    border-left: 1px solid #C1DAD7;
	    border-top: 0;
	    background: #f5fafa no-repeat;
	    font: bold 10px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
	    color: #797268;
    }
]]></>).toString());

    var e = document.getElementsByTagName("td");
    var wonders = '';
    var ruler = '';
    var alliance = '';
    var has_aad =0;
    var has_sdi = 0;
    var has_fab = 0;
    var has_snoeken_aquarium = 0;
    var has_mhp = 0;
    var has_pentagon = 0;
    var has_wrc = 0;
    var nr_nukes = 0
    var nr_inra = 0
    var nr_tech = 0
    var nr_land = 0
    var nr_attacking = 0
    var nr_defending = 0
    var all_seniority = 0
    var defcon =5;
    var ns=0;
    var resources
    var c_resources=0
    
    for (var i = 0; i < e.length; i++) {
    if (e[i].width == '35%' && e[i].textContent.indexOf("Nuclear") != -1) {
        nr_nukes = (e[i].parentNode.childNodes[3].textContent);
    }
    if (e[i].width == '35%' && e[i].textContent.indexOf("Infrastructure") != -1) {
        nr_inra = (e[i].parentNode.childNodes[3].textContent);
    }
    if (e[i].width == '35%' && e[i].textContent.indexOf("Technology") != -1) {
        nr_tech = (e[i].parentNode.childNodes[3].textContent);
    }
    if (e[i].width == '35%' && e[i].textContent.indexOf("Nation Strength") != -1) {
        ns = e[i].parentNode.childNodes[3].textContent.split(' ')[0].split('(')[0];
        
    }
    if (e[i].width == '35%' && ( e[i].textContent.indexOf("Resources") != -1) && c_resources==0) {
        resources = (e[i].parentNode.childNodes[3].innerHTML);
        c_resources++;
        
    }
    
    
    
     
    
    if (e[i].width == '35%' && e[i].textContent.indexOf("Affiliation:") != -1) {
        alliance = e[i].parentNode.childNodes[3].firstChild.textContent;
    }
    if (e[i].width == '35%' && e[i].textContent.indexOf("Alliance Seniority:") != -1) {
        arr_sen = e[i].parentNode.childNodes[3].textContent.split(' ')
        all_seniority = arr_sen[3].replace('(','');
    }
    
    
    if (e[i].width == '35%' && e[i].textContent.indexOf("Lost in All Wars.") != -1) {
        arr_soldiers = e[i].parentNode.childNodes[3].textContent.split(' ');
        nr_attacking = arr_soldiers[0];
        nr_defending = arr_soldiers[3];
    }
    
    if (e[i].width == '35%' && e[i].textContent.indexOf("Area of Influence") != -1) {
        arr_land = e[i].parentNode.childNodes[3].textContent.split('.');
        nr_land = arr_land[0];
    }
    if (e[i].width == '35%' && e[i].textContent.indexOf("DEFCON Level") != -1) {
        defcon= e[i].parentNode.childNodes[3].innerHTML.split('"')[3].split(' ')[1];
    }
    
    
    
    if (e[i].width == '35%' && e[i].textContent.indexOf("Wonder") != -1) {
            wonders = e[i].parentNode.childNodes[3].textContent;
            if (wonders.indexOf("Anti-Air") != -1) {
                has_aad = 1;
            }
            if (wonders.indexOf("Strategic") != -1) {
                has_sdi = 1;
            }
            if (wonders.indexOf("Foreign") != -1) {
                has_fab = 1;
            }
            if (wonders.indexOf("Hidden") != -1) {
                has_snoeken_aquarium = 1;
            }
            if (wonders.indexOf("Manhattan") != -1) {
                has_mhp = 1;
            }
            if (wonders.indexOf("Pentagon") != -1) {
                has_pentagon = 1;
            }
            if (wonders.indexOf("Weapons Research Complex") != -1) {
                has_wrc = 1;
            }
            wonders = has_aad + '_' + has_sdi + '_' + has_fab + '_' + has_snoeken_aquarium + '_' + has_mhp + '_' + has_pentagon + '_' + has_wrc;
        }
        
        if (e[i].width == '35%' && e[i].textContent.indexOf("Ruler") == 0) {
            ruler = e[i].parentNode.childNodes[3].firstChild.textContent;
            
        }
    }
    GM_setValue(ruler, wonders + '_' + nr_nukes + '_' + nr_inra + '_' + nr_tech + '_' + nr_land + '_' + alliance + '_' + nr_attacking + '_' + nr_defending + '_' + nr_attacking + nr_defending + '_' + all_seniority+ '_' + defcon+ '_' + ns + '_' + resources);
    
    saves = GM_listValues();

    function ShowImage(value){
        if(value == '1'){
            return '<img src="/images/vote.png"/';
        }
        else{
            return '<img src="/images/message_report.png"/>';
        }
    }
    function ShowStats(){
        var information = document.createElement("div");
        innerHTML = '<div class="overview"' +
        
        '<table><tr><th scope="col" class="nobg">Ruler</th><th scope="col">Resources</th><th scope="col">All.</th><th scope="col">Sen.</th><th scope="col">AAD</th><th scope="col">SDI</th><th scope="col">FAB</th><th scope="col">HNS</th><th scope="col">MHP</th><th scope="col">Pen</th><th scope="col">WRC</th><th scope="col">Nukes</th><th scope="col">NS</th><th scope="col">Infra</th><th scope="col">Tech</th><th scope="col">Land</th><th scope="col">Attacking</th><th scope="col">Defending</th><th scope="col">Defcon</th></tr>' +
        '';


        for (i = 0; i < saves.length; i++) {
             arr_wonders = GM_getValue(saves[i]).split('_');
             if (saves[i]){
                innerHTML += '<tr><th>'+ saves[i] + '</th><td>'+ (arr_wonders[18]) + '</td><td>'+ (arr_wonders[11]) + '</td><td>'+ (arr_wonders[15]) + '</td><td>'+ ShowImage(arr_wonders[0]) + '</td><td>'+ ShowImage(arr_wonders[1]) + '</td><td>'+ ShowImage(arr_wonders[2]) + '</td><td>'+ ShowImage(arr_wonders[3]) + '</td><td>'+ ShowImage(arr_wonders[4]) + '</td><td>'+ ShowImage(arr_wonders[5]) + '</td><td>'+ ShowImage(arr_wonders[6]) + '</td><td>'+ arr_wonders[7] + '</td><td>'+ arr_wonders[17] + '</td><td>'+ arr_wonders[8] + '</td><td>'+ arr_wonders[9] + '</td><td>'+ arr_wonders[10] + '</td><td>'+ arr_wonders[12] + '</td><td>'+ arr_wonders[13] + '</td><td>'+ arr_wonders[16] + '</td></tr>';
             }
             //GM_deleteValue(saves[i]);  

             
        }
        innerHTML += '</table></div>'
        information.innerHTML = innerHTML;
        document.body.insertBefore(information, document.body.firstChild);
    }

    function RemoveStats(){
        for (i = 0; i < saves.length; i++) {
             GM_deleteValue(saves[i]);  
        }
        location.reload(true);
     }


    var showStats = document.createElement("div");
    showStats.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
        'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
        'font-size: small; background-color: #000000; ' +
        'color: #ffffff;"><p style="margin: 2px 0 1px 0;"> ' +
        'Click to show stats ' +
        '</p></div>';
    showStats.addEventListener(
        'click',
            function (evt) {
                ShowStats();
                evt.preventDefault();
                return false;
            },
            false);

    document.body.insertBefore(showStats, document.body.firstChild);
    
    
    var removeStats = document.createElement("div");
    removeStats.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
        'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
        'font-size: small; background-color: #000000; ' +
        'color: #ffffff;"><p style="margin: 2px 0 1px 0;"> ' +
        'Click to clear stats ' +
        '</p></div>';
    removeStats.addEventListener(
        'click',
            function (evt) {
                RemoveStats();
                evt.preventDefault();
                return false;
            },
            false);

    document.body.insertBefore(removeStats,showStats);