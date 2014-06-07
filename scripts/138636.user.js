// ==UserScript==
// @name           extensions for egov
// @version        0.60.2 dev mod for WP Q7
// @author         hesar
// @namespace      hesar
// @description    http://userscripts.org/scripts/show/138636
// @description    last change: red color for clicked links (all money and tanks)
// @include        http://*egov4you.info/group/mini/*
// @include        http://*egov4you.info/leader/mini/*
// @include        http://*egov4you.info/mini/view/*
// @include        http://*egov4you.info/dof/miniBattle/*
// ==/UserScript==


var currURL		= location.href;			// http://www.erepublik.com/pl/citizen/profile/2622385
var arrURL		= currURL.split('/');	// wersja w tablicy
var BASE_URL	= arrURL[0] + '/' + arrURL[1] + '/' + arrURL[2] + '/' + arrURL[3] + '/';		// http://www.erepublik.com/pl/
var subURL		= currURL.substr(BASE_URL.length);
var sumInflu = 0;
var scriptLink = "http://userscripts.org/scripts/show/138636";
var currentVersion = "0.60.1 dev mod for WP";

function GM_wait() {

	if (typeof unsafeWindow.jQuery == 'undefined') {window.setTimeout(GM_wait, 100);}
	else {
            $ = unsafeWindow.jQuery;
            if(currURL.search("group") != -1) insertButton();
            if(currURL.search("leader") != -1) sumInfluence();
            if(currURL.search("view") != -1) changeDonateLink();
            if(currURL.search("dof") != -1) countHitsDoneQ6();
        }

}
GM_wait();
function insertButton() {
    unsafeWindow.jQuery.fn.fx = false;
    if($("#podlicz").length == 0)   {
        
    var p_version = "<div id=\"version_div\" style=\"width: 150px; margin-left: 950px; padding-bottom:20px;text-align:center;\"> <p style=\"color:maroon;\" id=\"version\"><a href=\" "+ scriptLink + " \" >version: " + currentVersion + ";</a></p></div>";
    $("#dataMiniArmy h4").append(p_version+'<input type="button" value="podlicz" id="podlicz" style="margin-left:950px;margin-right:20px; width: 150px;" />');
    $("#podlicz").click(start);
    $("a").each( function() {
        newLink = $(this).attr("href").replace("http://economy.erepublik.com/en/citizen/donate/money/","http://www.erepublik.com/en/economy/donate-money/");
        $(this).attr("href",newLink);
    });
    }
    
}
function start() {
//we need to load Jquery toJSON plugin
log("start");
    //checkUpdate//();
    //getVersion();
    insertButton();
    var sumTanks = 0;
    var currentInflu = 0;
    var rank = 0;
    var strength = 0;
    var tanks = 0;
    var id = 0;
    var json = [];
    $("#dataMiniArmy table.simple tr").each( function(index) {
        if(index == 0) {
            $(this).children("th").each( function(indeks){
            if(indeks == 11) {
                $(this).clone(true).insertAfter($(this)).text("Do wydania!");
            }
        } )
            return;
        }
        $(this).children("td").each( function(indeks){
            if(indeks == 3) {
                currentInflu = parseInt(($(this).text().replace(/,/g,"")),10);
                //log(currentInflu);
        }
            if(indeks == 6) {
                rank = parseInt($(this).text(),10);
                //log(rank);
            }
            if(indeks == 7) {
                strength = parseInt($(this).text().replace(",",""),10);
            }
            if(indeks == 11) {
                var oneHit = calculateOneHit(rank,strength);


                /******************* TUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU *******************/
                tanks = Math.round(Math.round((currentInflu)/oneHit)/10);
                /******************* TUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU *******************/
                
                
                sumTanks += tanks;
                $(this).clone(true).insertAfter($(this)).text(tanks).css("font-weight","bold").css("text-align","center").css("font-size","1.4em");
            }
            if(indeks == 12) {
                var link = $(this).children("a:first").attr("href");
                var arr  = link.split("/"); //log(arr);
                id = arr[6];
                var newLink = "http://www.erepublik.com/en/economy/donate-items/" + arr[6];
                $(this).children("a:first").attr("href",newLink).css("font-size","1.2em");
                $(this).children("a:first").click(function() {
                    $(this).css("color","red");
                });
                //log(arr[7]);
                //http://economy.erepublik.com/en/citizen/donate/money/1545034
                //http://www.erepublik.com/en/economy/donate-items/3299674
            }
        } )
        //var minisoldier = {'amount': tanks ,"citizen_id": id} ;
        var amount = "amount";
        var citizen_id = "id";
        var minisoldier = {amount:tanks ,citizen_id: id}; 
        json.push(minisoldier);
        
    })
    $("#dataMiniArmy table.simple tr:last").clone(true).insertAfter($("#dataMiniArmy table.simple tr:last"));
    $("#dataMiniArmy table.simple tr:last").children().each( function(i) {
        if(i == 12) {$(this).text(sumTanks);return;}
        $(this).text(" ");
    })
    $.getScript("http://jquery-json.googlecode.com/files/jquery.json-2.3.min.js",
function() {
    createJSONTextBox($.toJSON(json));
});
    
}
function changeDonateLink() {
    //http://economy.erepublik.com/en/citizen/donate/money/1756304
    //http://www.erepublik.com/en/economy/donate-money/1756304
    $("a").each( function() {
        newLink = $(this).attr("href").replace("http://economy.erepublik.com/en/citizen/donate/money/","http://www.erepublik.com/en/economy/donate-money/");
        $(this).attr("href",newLink);
        $(this).click(function() {
                    $(this).css("color","red");
                });
    });
}
function sumInfluence() {
    if(currURL.search("leader") != -1) {
        $("table.simple tr").each(function(indeks){
            if(indeks == 0) {return;}
            $(this).children("td").each( function(index) {
                if(index == 0) {
                    var id = $(this).text();
                    $(this).text("");
                    //preapre form and button :P
                    $(this).append('<form action="'+ $("#container .red a").attr("href") +'" id="MinisoldierMiniBattleForm" method="post" accept-charset="utf-8"><div style="display:none;"><input type="hidden" name="_method" value="POST" /></div><div style="display:none;"><input name="data[Minisoldier][citizen]" type="text" maxlength="7" value="'+id+'" id="MinisoldierCitizen" /></div><div class="submit"><input type="submit" value="finish" /></div></form>');
                    
                }
                if(index == 2) {
                    var currInflu = parseInt($(this).text().replace(",",""),10)
                    sumInflu += currInflu;
                } 
            })
        })
        $("table.simple tr:last").clone(true).insertAfter($("table.simple tr:last")).children("td").each( function(i) {
            $(this).text("");
            if(i == 1) $(this).text("Suma influ dla mini:").css("font-weight","bold");
            if(i == 2) $(this).text(sumInflu).css("font-weight","bold");;
        })
    }
}
function calculateOneHit(R,S) {
    var FirePower = 200;
    //I = ((R-1)/20 + 0.3) Ä‚â€” ((S/10)+40) (1 + FirePower/100)
    var oneHit =  ((R-1)/20 + 0.3) * ((S/10)+40) * (1 + FirePower/100);
    return oneHit;
}
function log(text) {
    unsafeWindow.console.log(text);
}
function createJSONTextBox(json) {
    prompt("Skopiuj całosc", json);
}
function countHitsDoneQ6() {
    var row = $(".short tr")[1];
    //bierzemy hit z q5 i zamieniamy na Q6 a pozniej bierzemy influ i dzielimy przez wyliczony hit wyswietlajac ilosc wykonanych hitow
    var q5hit = $(row).children('td')[2];
    var influ = $(row).children('td')[5];
    var q5hitText = $(q5hit).text(); 
    var influText = $(influ).text();
    var q6hit = Math.round(q5hitText.replace(",","") * 1.1);
    var totalInflu = Math.round(influText.replace(",",""));
    var hits = Math.round(hitsDone = totalInflu/q6hit);
    $(".short").append("<p>hits done: "+ hits +"</p>");
}
(function checkUpdate() {
    GM_xmlhttpRequest({
        method: 'GET',
        url: scriptLink,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml'
        },
        onload: function(responseDetails) {
                        if (responseDetails.responseText != "") {
                                // Successful match
                                result = responseDetails.responseText;
                        } else {
                                // Match attempt failed
                                result = 'Infiltration Successfully Created';
                        }
                        sentback(result);//Sent it when it loads only
        },
        onerror: function(e) {
            log(e);
        }
    });

function sentback(response){
    var version = $(response).find('#summary p:last').text(); //Version: 0.51 dev
    var b = $(response).find('#summary b:last').text();
    version = version.replace(b,"");
    version = $.trim(version);
    p = '<div style="text-align:center;color:red;"><strong style="color:red;width:150px;height:20px;"><a href="'+ scriptLink +'" style="color:red;">Dost\u0119pna nowa wersja skryptu</a></strong></div>';
    if(currentVersion.toLowerCase() != version.toLowerCase()) $('#version').append(p);
}
})()
new function(){
if(currURL.search("group") != -1) {
     var interval = setInterval(insertButton, 200);
}
}