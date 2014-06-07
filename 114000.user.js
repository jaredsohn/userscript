// ==UserScript==
// @name           CSFD ignorelist 2
// @namespace      daemonicky
// @include http://www.csfd.cz/*
// @include http://www.new.csfd.cz/*
// @include http://stara.csfd.cz/*
// @require       http://code.jquery.com/jquery-1.7.min.js
// ==/UserScript==

// blbnul http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js


// 1. jmena uzivatelu pis do bloku mezi =========
// 2. oddeluj jmena uzivatelu carkami
// 3. jestli ma jmeno mezery, tak je dodrz


// Následující uživatelé byli mezi prvními a demonstrují vlastnosti skriptu (jména s mezerami, jména s hvězdičkami ...). Případně poškozeným se omlouvám.
// kazdy protoze

var ignorelist = function IGNORE_LIST()
/* ======= Od následujícího řádku piš jména uživatelů ============ */ {/*
           golfista         ,
                                       gr8 escape ,
                                       Bluntman , kleopatra,
            J*A*S*M ,

*/} /* ==== Od tohot řádku (včetně) už nepiš jména uživatelů ===== */
.toString().replace(/^.*\/\*/,'').replace(/\*\/\}$/,'');

function Remove(what,from){var r=[]; for(i=0;i<from.length;i++) if(what!=from[i]) r.push(from[i]); return r;}
function Trim(where)      {var r=[]; for(i=0;i<where.length;i++) r.push(where[i].trim()); return r;}
//function Words(text)      {return Remove('',Trim(text.split(',')));} //text.split(/\s+/);}
function In(word,words)   {for(i=0;i<words.length;i++) if(word==words[i]) return 1; return 0;}
var ignorelist2 = Remove('',Trim(ignorelist.split(',')));

/*****************************************************************************/
$(".received").each(function(){

// http://www.csfd.cz/diskuze
    var username = $(this).find(".author a").text();
//    console.log('diskuze:' + username);
    if(username) {
//        console.log(username);
        if(In(username,ignorelist2)){
            $(this).css({"display":"none"});
        }
    }
    
// http://www.csfd.cz/posta
    var username = $(this).find(".nick strong a").text();
//    console.log('posta:' + username);
    if(username) {
//        console.log(username);
        if(In(username,ignorelist2)){
            $(this).css({"display":"none"});
        }
    }    
});

/*****************************************************************************/
// http://www.csfd.cz/uzivatele/
// nejoblibenejsi dle kraje
$("#users-by-region tr").each(function(){ 
        var username=$(this).find("a").text(); 
    // console.log(username); 
        if(In(username,ignorelist2)){
            $(this).css({"display":"none"});
        }
});



// http://www.csfd.cz/uzivatele/
// top uzivatele
$("#top-users .ui-image-list li").each(function(){ 
        var username=$(this).find(".content .subject a").text(); 
    //console.log(username); 
        if(In(username,ignorelist2)){
            $(this).css({"display":"none"});
        }
});

// nejaktivnejsi
$("#most-active .content li").each(function(){ 
        var username=$(this).find("p a").text(); 
    // console.log(username); 
        if(In(username,ignorelist2)){
            $(this).css({"display":"none"});
        }
});

// Komentáře nových uživatelů
$("#comments.ct-general.th-0 .ui-posts-list li").each(function(){ 
        var username=$(this).find(".author a").text(); 
    // console.log(username); 
        if(In(username,ignorelist2)){
            $(this).css({"display":"none"});
        }
});

/***************************************************************************/
// http://www.csfd.cz/uzivatele/prehled/
$(".overview #list .content .ui-table-list tr").each(function(){ 
        var username=$(this).find(".nick a").text(); 
    // console.log(username); 
        if(In(username,ignorelist2)){
            $(this).css({"display":"none"});
        }
});

/***************************************************************************/
// http://www.csfd.cz/filmoteky/
$("#pg-web-collection .ui-table-list tbody tr").each(function(){ 
        var username=$(this).find("td a").eq(1).text(); 
     // console.log(username + ':' + $(this).find("td a").length ); 
        if(In(username,ignorelist2)){
            $(this).css({"display":"none"});
        }
});

/***************************************************************************/
// http://www.csfd.cz/filmoteky/
$("#pg-web-collection .ui-table-list tbody tr").each(function(){ 
        var username=$(this).find("td a").eq(1).text(); 
     // console.log(username + ':' + $(this).find("td a").length ); 
        if(In(username,ignorelist2)){
            $(this).css({"display":"none"});
        }
});

// film / hodnoceni uzivatelu

$("#sidebar #ratings li").each(function(){ 
        var username=$(this).find("a").eq(0).text();
     // console.log(username + ':' + $(this).find("td a").length ); 
        if(In(username,ignorelist2)){
            $(this).css({"display":"none"});
        }
});

// film / fanklub filmu

$("#sidebar #fanclub li").each(function(){ 
        var username=$(this).find("a").eq(0).text();
     // console.log(username + ':' + $(this).find("td a").length ); 
        if(In(username,ignorelist2)){
            $(this).css({"display":"none"});
        }
});

// profil / fanklub

$("#fanclub .users li").each(function(){ 
        var username=$(this).find("a").eq(0).text();
     // console.log(username + ':' + $(this).find("td a").length ); 
        if(In(username,ignorelist2)){
            $(this).css({"display":"none"});
        }
});


/*
TODO:

ignorelist
rozklik otevre/zavre
<ul>
<li>
    <input type=text>uziv jmeno
    <button>zviditelni/zneviditelni
    <button>odstran
    pridej
        napovedabox s temi na strance
</li>

u uzivatele tlacitko - ignoruj
po kliku se prispevek zabali
po kliku ignorelist zablika

$(".ui-posts-action-list").each(
    username 
    $(".author").css({"border":"red 1px solid"});
    je ignorovan
            tak display:none
*/