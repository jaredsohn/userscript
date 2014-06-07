// ==UserScript==
// @name          eRepublik IHA Napiparancs
// @version       2.3
// @releasedate   20100515
// @description   eRepublik script for Indo-Hungarians' Alliance v2.3
// @author        daniferi
// @namespace     indohun.host22.com
// @include       http://*.erepublik.com/*
// @include       http://erepublik.com/*
// @exclude       http://ads*.erepublik.com/*
// @require       http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// ==/UserScript==

/*
Változások
2.3
-- Ha php hiba miatt nem megy az IHA oldala, akkor nem a féloldalas
--- hibaüzenet jelenik meg (szétcseszve ezt a szép scriptet), hanem
--- csak egy rövid információ arról, hogy az oldal nem elérhető.
2.21
-- JQuery visszarakva régebbi változatra, hogy ismét működjön a script
2.2
-- A napiparancs már az új oldalról veszi az adatokat, valamint az
--- IHA oldal linkje is már oda mutat
2.1
-- Bekerült a Latest Eventsbe is a napiparancs, bár még nem tökéletes,
--- mert ha rámész az egyik tabra, elfelejti ezt a tudást, de 
--- rajta vagyok az ügyön :)
2.0
-- Teljesen újraírtam az egészet, kisebb és gyorsabb lett
-- Mindegy, milyen nyelven használod az erepet, a script működőképes
-- Készült egy menü a fontosabb linkekkel
1.3
-- Amíg nincs kapott adat, addig csak a logó látszik
-- Ha megjött az adat, akkor slide effekttel nyílik ki a menü
-- Figyeli a lehetséges frissítéseket, ha van, akkor jelez
1.2 
-- Kicseréltem a logót a hivatalosra
-- Lecseréltem a gombot (thx to DecsiDani) 
-- Teljesen átírtam a scriptet is, hogy áttekinthetőbb legyen
-- Utánaigazítottam az IHA oldalán lévő új napiparancshoz
1.1 
-- Belekerült a támadási célpont neve is a "Fight" gomb fölé
*/

CurrentReleaseDate = "20100515"; 

//==================================================================
//======================== IMAGE FILES =============================
//==================================================================
icon_iha = 'data:image/png;base64,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';

logojpg = 'data:image/jpg;base64,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';
	
button1="data:image/gif;base64,R0lGODlhNwAUAHAAACH5BAEAANMALAAAAAA3ABQAhwAAAFaDyG6a23Cb3HGc3HCb23Cc3G2Z2nun59/r/+jx/+ry/+fw/9no/1F9v4ay8uLt/+Hs/97q/3ik5FSBwnml5ZrC/5jB/5fA/1aDxHKe3oez84i09G6a2lqGxnOf34Wx8YSw8IaclCUAAAAAQ1Kc8V6Kynai4oi0tz4AAAAAb2a19Ym19T6H9D6F84ielSYAAAAARFOe9GOPz3yo6Iu39425+Yy4+I25u0AAAECJ+GlUAAAzmHq394y4uT+J94u3uT8AAIyhlwAARVWh+Hej42iU04Cs7I+7+5C8/JG9/Y+7vEEAAEGN/H9yRgAAcmq7+5C8vAAAc2y8/JC83Vk1AEFymigAAAAARlmk/GuX1pO//5W//5O/v0QAAEOP/29XAABXv0Q1nIO//4N0SAA1nIG//0MAAESP/5OonCkAAAAASFqo/wAAdG+//5W/v1uo/5K+/oGt7XGd24q29pvD/5vDv0YAAF6q/5urnCsAAHTD/0aS/1+r/4h3SABZv5vD4F82AEaR/3aj4I66+qDG/6HH/6DGv0oAAEmU/6GvnCwAAEqV/415SHjG/6HHv2Kv/3hbACx54Hqn5KbJ/6TJ/6jK/6bJv0wAAEuX/6bJ4GU5AC574JJ7SAA5nJLJ/6axnC8AAH7K/0yX/6ixnGWx/3xcAABcv36r56zN/6vM/6vMv04AAE6Z/6y0nIFeAABev67O/6yZdILO/6zN4Gg5AGk5ADEAAGm0/6u0nFCa/4Ow7LLR/7HQ/6/P/6/Pv1EAAFGc/7HQvwA6SDIAAIXQ/7KddFGd/7GcdFF/nGu1/53E/4Wy76PI/7XT/7TS/7fU/4e08HGf0gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAj/AKcFOHCAAIGCBxMWXGjQIEOEDRlGdDgR4cJp02gkWMCxo8ePIEOKHPkxwQEHHBYkWMmypcuXMGPKfEkjAA0MOHPm/KSzp8+fQIPmPHkgxJgQRkNwWMoB6dGkRqMlfTpGKtWoUK9WzXogAAGkYMOKHUtWrIgRJEqULXtgBoGrOIgBmAtABRSwR5ciReEFgIsQOPr+PUsimFOpTcEmdkpgBlIMHABxeNO3yZgdAHiMwRACsucxgQFYRiHXspARMdhIJkTIM4YxrTm8Xtr4JgbWY97I/YHBT10ooeeqgASoCt3jc62gDZa7L4DCrAlt7oyTRtGelEVj2AQgDIY3Yjb7/9acvcn3yhjyoIZ0ug0UO15S/zz6FbvzuTEg8cTAU72KPfCJ9kmAiWBAynq+hfFJcaJR8lMIg4xBiYMTXtJXIqqoBwCGvtHVhiMBBqPKKhdmuF4kyAEgyYQsssjBIBhMqAolI5ZIC3eSdJLZJ7kQ8+EqwGyIAYkbqkIKMfmhGIYqTDLJYoyqYBDlTU0ySSSGuYwAQDCvdMeLLAC0UcyNW6pCJpZIQuFKmkxGgmGVTXL2CTSq0KmKMEEelwg0eM41jI/FQGMMXcEMOlcySELCZ55ziUgnNI9C80k0dUJq6aWYZqrpppxmOmMIlEBaaaWdkjoqpqRemuqpo1IK56uwxjgq66ywYmBETlEy+YmuquzqK6+9NvnrsLkSu6uUMkqJwTSbvYbTZs0+K22z1OoUrbPY5lQttM4GBAA7";

button2="data:image/gif;base64,R0lGODlhNwAUAHAAACH5BAEAALIALAAAAAA3ABQAhwAAAFGAxWSQ0WWR0mOP0XWh4cbd/9Hj/9Pk/8La/2yY2FF+wIm19fP3//X4//L2//D1/3ml5VWCw4Gt7bfU/7XT/7TS/3ai4liExXyo6JvD/5rC/3Of31uHyJfA/5jB/5W//5ep/ykA/wAA/1yp/3Sg4GCMzH6q6kYA/3PC/0aR/0WQ/5qq/ysA/12q/3ik5GSR0YKu7p3E/57F/6DG/0gA/0mU/3Za/wA3/4rE/0iS/6Cu/ywA/2Ct/32p6WmV1Ii09KHH/6PI/6TJ/0oA/0qW/455/3rI/2Q5/0p6/y4A/2Ov/2Sx/26a2Yy4+KjK/6nL/00A/02X/35c/wBc/005/5PK/5R8/wA5/0wA/0yX/6my/y8A/2ax/6ix/37K/6bJ/4ez83Ke3ZG9/a7O/6zN/04A/2q1/661/zEA/4LO/1Ca/1AA/06Z/5h+/wBe/2k5/4u393il4rLR/1EA/1Gd/7K4/zIA/5yA/4XR/2y4/4Vf/zKA/4+7+3yp57nU/1QA/1Oe/3E7/zOC/6OC/wA7/6PU/7e6/zMA/4nU/1Se/3G6/4lh/wBh/3+t6bzW/73X/1UA/1ah/729/zUA/1Wg/45i/wBi/72h/43W/3I7/3M8/7y8/3K8/3O9/4Sx7sDZ/1cA/1mk/wA8/zYA/4/Z/8Ci/1eF/3W+/4e08MPb/8Xc/4u38q/P/6vM/7rV/3Wj1pO//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAj/AGUFUGCCoMGCCA8qTMhwocOGBQnIkiXGgAEEBy5ezIjxIoKNBz5i5IhAJEeOHjduHKnRgIIFfRw4aCCzpk2bDXLe3MmTp06cPjr4gOQK0p+jRZP+SUq0KdOiS40yPbqUatSoUIuKCeDDgxUPYL2C/Sp2bFiyaM2WXat27VcxQsPKnUu3bl0WIkaQsGtXjImuc1GMGDwYFV8PgleATewBr97DdH2YiGEFjRVXlQUXcXVjBI48ll15EE1ac+YRRTx4ybuk8mXXpEfLthJDAZDLmF25Mm1k8JHdhEccsYIkuPEkrHULHtw69OjLaGr30e0KjXLUrvaMoKK7yuUrni9r/76+GQ3r1cKB66HO3gorMaPZAw++nj0aRCPyuIo0Yo1u/uXhpwd43P1RnH/y6daHHB5U5Yohf/C3BiT3oQYJeMHl8YdgE0LCIYUCamccHw4i9UcfXVEFyYoArqjJCIMQ4pkhnOCXByQA/oGjhTWOgAoj2624olVEeuADVEatKBgJkPS4BpCXQILJYKVAUhyTVurVJH6o9KjHint0OOSQRhYlJCQG8BccCRapiQN+pRhgCmEkzDnYKVyiqeZgbJ4ppCusuGLRoGgOSqihhhaK6KKMGqAooYCa6SialDpqKaWVForppZlyeumnRE1nFJFWjXrUmKSSauqpOq5Kqiuw4BSW4KzUyUrrrbjWKgtkvPbqq1wBAQA7"

button3="data:image/gif;base64,R0lGODlhNwAUAHAAACH5BAEAAOIALAAAAAA3ABQAhwAAAC5YlShTkidSkSZRkSpWlitXlylVlS1ZmT1pqT9rq0ZyskVxsUdzs0JurlF9vWKOzmOPz2GNzUx4uFiExHai4nWh4VSAwEt3tlyIyHml5Xqm5nik5HqStiIAgAAAk0qR5U56un6q6n+r636qyToAgAAAgAAApl6q6n2p6X2pyDqA6n6WuCMAgAAAlE2W6l2JyVJ+vWeT04Ku7oOv74OvzTsAgDuC7mJQgAAxu3Ku7oKuzDuE74OauyUAgAAAlVCY7oGt7VeDwWyY2Iez84i09Iezzz4AgD6F83dtlgAAqmWz84i00Iay4VMygD5uviYAgAAAllOd81Oe9GaS0luHxXGd3Yu394u30z8AgD+J92hTgABT0z8zwHq393pvlwAzwIugwAAAl1Wg94yhwAAAq2i394y4+GuX11+LyZC8/JG9/Y+7+4+71UEAgFmk/JCkwigAgAAArWy8/JC81kGN/EGM+39ylwBV1o+76Fk1gGKOy3un55fA/5W//5W/2EQAgESP/5WoxCkAgIV1lwAAr2+//5fA2EUAgFuo/3BXgCl07GeT0ICs7J3E/5vD/5vD2EYAgEiS/57F/5vD7GA2gCx47Ip4lwA2xIrE/52sxCwAgHbF/0gAgJ3E2EaS/2Cs/3VagABa2GqX04Wx8aHH/6PI/6HH2EoAgEqW/6TJ/6GvxC4AgEuX/3pbgABb2KOWr3rJ/6PI7GM3gEqV/6HH7GI3gKOvxGKv/3hbgG+c14q29qvM/6nL/6jK/6jK2E0AgE6Z/6nL2EwAgAA5ly8AgH7K/6mXr02X/6iXr0x7xGax/4Sw8HCd2Y25+a7O/6/P/3Wi3ZK+/rXT/7fU/7TS/3yp5Nno/9fn/3Oi1azN/8Pb/8Xc/8La/6bJ/7LR/7nU/7HQ/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAj/AMUdIDCQIAGDCAsqPLgwIcOHDh0eECfwgMWLGDNq3MixI8cEChhMUDCBgUiSJ0eqJMlSZUqTImO6TIly5QSQDyTo3Mmzp8+fQIP+nDAhQzQrOpAeTZoUqdKnOpZCtQL1KIelWKfqeFBUB4evX71+bcLBCg2zaM+qtUJW7FkWHkwgoRFNR4q0eNVylcChCY2/NQCZGGxCCQoONDjo+KuYhgrBlnSQEbxCRw8PYoBE+5uCRufFiPvSWJwh59/TNYrJpYHDRI7Fp2OnNrGCxuzal00Ei827Nw0JD6wUkS2YB5tchVEEJmy4iRPC0Ac/wQykyOzBQHz/lZDBCpsifWj0/2EiGAmbLSbwjO/ipYgr12zIyx1fvs9lMYngYJ5DXkwwSuAFGJ4VEnjXBxts0AedfwceOIkgHijBn2B2sHEIhWwIUgx+7+HBBiXPVdhHgAj2QaAOfaSY4oUm2PFgXHb0cQl0ShjiCYV9HKJajBCakEgo0ZmwiIpEmigBDd4QeaMJqUxCySxCzphDJrdEGMuSqfQhDIW8aCgGKEDiMcmYvBRJpA6MINkHL7xMsiWTXaqWSpi8wFJYLLJAmQovT8LpJShVftlmKHuyyYs3h3qjlqFsvgndno4SYyUvxxCWSqWDPbDhHLw4Otiea3ojKptnscEom+AYmuqqvLCaqqqoxmbaKqqvznqqoXSxAc6uvKbaTTe8ACvsrMN2802xwSbLa7DgANvrs2zowAs22FxjbbXXUFstttZ26+234F6bLbXijktuH9kE++u67Lbr7rvwxvsuL+K0umuyyBa7bL749suvs8vyEhAAOw==";
//==================================================================


$("#maildisplay").after("<div id='Napiparancs'></div>");
$("#Napiparancs").each(function(){
    $(this).append("<a href='#' onclick='return false;' target='blank'></a>");
    $(this).css({position:'relative',float:'left',clear:'both',marginBottom:'15px',backgroundColor:'#F0F8FF',zIndex:'2'});
    $(this).children("a").append("<img id='ihalogo' style='width:69px'></img>");
    $(this).children("a").children("img").attr("src",logojpg);
    $(this).append("<div id='kisdoboz' style='padding-bottom:10px;'></div>");
    $(this).append("<div id='nagydoboz' style='float:left;clear:right;background-color:#FFFFCC;border: 1px solid #3399FF'></div>");
    $(this).children("div").css({textAlign:'center',color:'black'})
})
$("#kisdoboz").each(function(){
    $(this).append("<p id='T_region'></p>");
    $(this).append("<p id='T_order'></p>");
    $(this).append("<a id='T_target></a>");
    $(this).children("a").append("<img id='gomb' style='display:block;position:relative;margin:0 auto;'></img>");
    $(this).children("a").children("img").attr("src",button1);
    $(this).append("<p id='T_time></p>");
    $(this).append("<p id='T_commander></p>");
    $(this).append("<a id='T_info target=_blank>[-- INFO --]</a>");
    $(this).append("<div id='UpdateYesNo></div>");
    $(this).hide();
})
$("#nagydoboz").each(function(){
    $(this).append("<div class='cimke'>I H A</div>");
    $(this).append("<div class='ugras'><a href='http://iha.hostei.com/' target='_blank'>IHA oldala</a></div>");
    $(this).append("<div class='ugras'><a href='http://www.erepublik.com/en/organization/1434543'>IHA ORG</a></div>");
    $(this).append("<div class='ugras'><a href='http://picasaweb.google.hu/indohunorg/ABERI#' target='_blank'>IHA avatar galéria</a></div>");
    $(this).append("<div class='cimke'>E R E P U B L I K</div>");
    $(this).append("<div class='ugras'><a href='http://www.egobba.de' target='_blank'>eGobba térkép</a></div>");
    $(this).append("<div class='ugras'><a href='http://www.ereptools.net' target='_blank'>eRepTools</a></div>");
    $(this).append("<div class='ugras'><a href='http://www.erepmarket.co.cc/' target='_blank'>eRepMarket</a></div>");
    $(this).append("<div class='ugras'><a href='http://www.erepstats.com/hu' target='_blank'>eRepStats</a></div>");
    $(this).append("<div class='ugras'><a href='http://userscripts.org/scripts/show/49247' target='_blank'>eRepublik Plus</a></div>");
    $(this).append("<div class='cimke'>Ú J S Á G O K</div>");
    $(this).append("<div class='ugras'><a href='http://www.erepublik.com/en/newspaper/iha-riporter-188632/1'>IHA Riporter</a></div>");
    $(this).append("<div class='ugras'><a href='http://www.erepublik.com/en/newspaper/hadugyi-kozlony-177586/1'>Magyar Hadügyi Közlöny</a></div>");
    $(this).append("<div class='ugras'><a href='http://www.erepublik.com/en/newspaper/-s-e-r-i--32721/1'>Indonéz Hadügyi Közlöny</a></div>");
    $(this).append("<div class='cimke'>O R G O K</div>");
    $(this).append("<div class='ugras'><a href='http://www.erepublik.com/en/organization/1583386'>Utolsó Védvonal Alapítvány</a></div>");
    $(this).append("<div class='ugras'><a href='http://www.erepublik.com/en/organization/1541705'>Hungarian Takeover Unit</a></div>");
    $(this).hide();
})

$("#T_region").css({fontSize:'11px',fontWeight:'800',color:'blue'});
$("#T_order").css({fontSize:'9px',fontWeight:'600',marginBottom:'5px'});
$("#T_time").css({fontSize:'10px',fontWeight:'500',marginTop:'5px'});
$("#T_commander").css({fontSize:'9px',fontWeight:'400'});
$("#T_info").css({fontSize:'9px',fontWeight:'600',marginTop:'2px'});
$(".cimke").css({clear:'both',backgroundColor:'#3399FF',textAlign:'center',fontSize:'12px',fontWeight:'600',padding:'2px',marginBottom:'4px'});
$(".ugras").css({float:'left',textAlign:'center',fontSize:'10px',fontWeight:'600',paddingBottom:'4px',width:'150px'});

$("#gomb").mouseover(function(){
        $(this).attr("src",button2);
    }).mouseout(function(){
        $(this).attr("src",button1);
    }).mousedown(function(){
        $(this).attr("src",button3);
})

$("#ihalogo").click(function(){
    if( $("#kisdoboz").is(":visible") ) {
        $("#kisdoboz").slideUp();
        $("#nagydoboz").slideDown();
        $("#nagydoboz").animate( { width:"452px"}, 600 );
    } else {
        $("#nagydoboz").animate( { width:"70px"}, 600 ).slideUp();
        $("#kisdoboz").slideDown();
    }
});


var loadData = function (){
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://iha.hostei.com/napiparancs/',
        onload:function(responseDetails){
            var responseText = responseDetails.responseText;
            var tags = responseText.split('|');
            var hiba=/PHP\sError\sMessage/mi;
            if (tags[0].match(hiba)!="PHP Error Message") {
            $("#T_target").attr("href",tags[2]);
            $("#T_info").attr("href",tags[3]);
            $("#T_region").append(tags[1]);
            $("#T_order").append(tags[0]);
            $("#T_time").append(tags[4]);
            $("#T_commander").append('('+tags[5]+')');}
            else { $("#T_order").append("<u>HIBA</u><br>Az oldal jelenleg nem elérhető."); }
            $("#kisdoboz").show();
            eventInsert(tags);
            updateCheck();
        }
    });
}

var updateCheck = function (){
    if (document.getElementById("latestnews"))
    { 
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://userscripts.org/scripts/source/57608.meta.js',
            onload:function(updateDetails){
                var updateText = updateDetails.responseText.match(/@releasedate\s*\d+/);
                if (updateText[0].match(/\d+/) > CurrentReleaseDate) {
                    var updatehere = '<br><hr><a href="http://userscripts.org/scripts/show/57608" target="_blank">';
                    var updatehere = updatehere +'<center><strong>UPDATE!</strong></center></a><hr>';
                    document.getElementById("UpdateYesNo").innerHTML = updatehere;
                }
            }
        });
    }
    else { return true };
}

var eventInsert = function (tags){
    if (document.getElementById("latestnews")){
        $("#latest_events > div:first-child").before("<div id='IHAevent' class='item elem'><div class='iconholder'></div><div class='holder'></div></div>");
        $("#IHAevent > .iconholder").append("<img class='test'/>");
        $("#IHAevent > .iconholder > .test").attr("src",icon_iha);
        var hiba=/PHP\sError\sMessage/mi;
        if (tags[0].match(hiba)!="PHP Error Message") {
         $("#IHAevent > .holder").append("<p><a href=''></a></p><p></p>");
         $("#IHAevent > .holder > p:first-child > a").attr("href",tags[2]);
         $("#IHAevent > .holder > p:first-child > a").append(tags[0] +'('+tags[1]+')');
         $("#IHAevent > .holder > p:last-child").append(tags[5] +', '+tags[4]);
        } else { 
         $("#IHAevent > .holder").append("<p>HIBA: Az oldal jelenleg nem elérhető.</p><p></p>");
        }
//        var elemToCheck = document.getElementById ("item_link");
//        elemToCheck.addEventListener ('DOMAttrModified', OnAttrModified, true); 

    }
}


// var OnAttrModified = function(event){
//    if ( event.attrName == "style" ) {
//        var stilus = $("#item_link").attr("style");
//        alert(stilus);
//    }
//}

loadData();

