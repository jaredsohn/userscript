// ==UserScript==
// @name       Userscripts Malware Defender
// @version    140303
// @description  Scans userscripts for common malicious/scam patterns before you install them
// @match      http://userscripts.org/scripts/show/*
// @grant      none
// ==/UserScript==

function scam(p,m){
    this.pattern = p;
    this.message = m;
}

var scams = [
    /*new scam(/==UserScript==((?!(@match|@include)(.*\S.*)\n)[\s\S])*?==\/UserScript==/i,
             "Nonexistent @match or @include metadata:"),*/
    new scam(/&action\=subscribe/i,
             "A url subscribe token:"),
    new scam(/\/ajax\/friends\/lists\/subscribe/i,
             "Facebook ajax subscribe code:"),
    new scam(/\/ajax\/follow\/follow_profile\.php/i,
             "Facebook ajax profile follow code:"),
    new scam(/p,a,c,k,e,(d|r)/i,
             "Obfuscated code that may be malicious:"),
    new scam(/facebook.com\/plugins\/(like|follow)\.php?href\=/i,
             "A Facebook \"like\" reference to specific pages:"),
    new scam(/(&|\?)action\=add_friend/i,
             "A Facebook friend add token for a specific user:"),
    new scam(/document\.getElementById\('MobileNos_'\)/i,
             "Ultoo.com code that may procure points for one particular mobile number:"),
    new scam(/document\.getElementsByName\('PollUserName'\)\[0\]/i,
             "Ultoo.com code that may procure points for one particular username:"),
    new scam(/\/ajax\/groups\/members\/add_post.php/i,
             "Ajax post code that may post to a specific Facebook page:"),
    new scam(/iframe.*facebook\.com/i,
             "Possible spam/misleading Facebook iFrames or \"Like\" buttons:"),
    new scam(/ask\.fm\/likes.*\/add/i,
             "Code that may automatically add or follow specific Ask.fm pages:"),
    new scam(/(facebook|twitter)\.com.*target\=/i,
             "Code that is likely duplicated from another script to contain a new author's spam links:"),
    new scam(/(ask\.fm.*(ask|preguntame|pergunt(e|a)s?))|(href\='Skype)/i,
             "Code that is likely duplicated from another script to contain a new author's spam links:")
];

var installLink = document.getElementById("install_script").firstElementChild;

function clickHandler(e){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", e.target.getAttribute("href"), false);
    xhr.onload = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                var matches = undefined;
                var scamDetected = false;
                var msg = "Warning! This script contains suspicious code!\n";
                for(var i = 0; i < scams.length; i++){
                    if(matches = xhr.responseText.match(scams[i].pattern)){
                        scamDetected = true;
                        msg += "\n" + scams[i].message + "\n" + matches[0] + "\n";
                    }
                }
                msg += "\nAre you sure you want to install this script?"
                if(scamDetected){
                    if(!confirm(msg)){
                        e.preventDefault();
                    }
                }
            }
            else{
                console.error(xhr.statusText);
            }
        }
    };
    xhr.onerror = function(){
        console.error(xhr.statusText);
    };
    xhr.send(null);
}
installLink.addEventListener("click", clickHandler, false);