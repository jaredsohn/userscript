// ==UserScript==
// @name         Liens caractéristiques
// @namespace    ki
// @version      1.0
// @description  Ajoute des liens aux indicateurs de caractéristique et de PdV de la boite personnage sur la page Action.
// @include      http://www.kraland.org/main.php?page=*
// @exclude      http://www.kraland.org/main.php?page=4;*
// ==/UserScript==

var caracs = function(ev)
{
    var perso = document.getElementsByClassName("gametdcomp");
    if (perso == null) {alert("Erf"); return 0;}
    
    var CARACS = new Array ();
        CARACS[1] = 'FOR';  CARACS[2] = 'VOL';
        CARACS[3] = 'CHA';  CARACS[4] = 'GES';
        CARACS[5] = 'INT';  CARACS[6] = 'PER';
    
    for (var i=0; i<perso.length; i++)
    {
        for (j in CARACS)
        {
            if (perso[i].innerHTML.indexOf(CARACS[j]) == 0)
            {
                perso[i].innerHTML = '<a href="order.php?p1=1000&amp;p2=' + j + '"'
                       + ' onclick="javascript:OpenOrder(\'1000\',\'' + j
                       + '\');return false;">' + perso[i].innerHTML + '</a>';
                break;
             }
        }
        if (perso[i].innerHTML.indexOf("PdV") != -1)
        {
            perso[i].innerHTML = '<a href="order.php?p1=1003&amp;p2=0"'
                    + ' onclick="javascript:OpenOrder(\'1003\',\'0\');'
                    + 'return false;">'
                    + perso[i].innerHTML
                    + '</a>';
        }
    }
}

window.addEventListener('load', caracs, true) ;

aaus_50124={
i:'50124', // Script id on Userscripts.org
d:3, // Days to wait between update checks
n:'Liens caractéristiques',v:'10',t:new Date().getTime()|0,ca:function(r){GM_xmlhttpRequest({method:'GET',url:'https://userscripts.org/scripts/source/'+this.i+'.meta.js',onload:function(x){aaus_50124.co(x,r)}})},co:function(x,r){this.xv=/\/\/\s*@version\s+(.*)\s*\n/i.exec(x.responseText);this.xn=/\/\/\s*@name\s+(.*)\s*\n/i.exec(x.responseText);if(this.xv&&this.xn[1]==this.n){this.xv=this.xv[1].replace(/\./g, '');this.xn=this.xn[1];}else{if(x.responseText.match('Uh-oh! The page could not be found!')||this.xn[1]!=this.n)GM_setValue('updated', 'off');return false;}if(this.xv>this.v&&confirm('A new version of the '+this.xn+' user script is available. Do you want to update?')){GM_setValue('updated',this.t);GM_openInTab('http://userscripts.org/scripts/source/'+this.i+'.user.js')}else if(this.xv&&this.xv>this.v){if(confirm('Do you want to turn off auto updating for this script?')){GM_setValue('updated','off');GM_registerMenuCommand("Auto Update "+this.n,function(){GM_setValue('updated',new Date().getTime()|0);aaus_50124.ca('return')});alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.')}else{GM_setValue('updated',this.t)}}else{if(r)alert('No updates available for '+this.n);GM_setValue('updated',this.t)}},ch:function(){if(GM_getValue('updated',0)==0)GM_setValue('updated',this.t);if(GM_getValue('updated',0)!='off'&&+this.t>+GM_getValue('updated',0)+86400000*this.d){this.ca()}else if(GM_getValue('updated',0)=='off'){GM_registerMenuCommand("Enable "+this.n+" updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_50124.ca(true)})}else{GM_registerMenuCommand("Check "+this.n+" for updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_50124.ca(true)})}}};if(self.location==top.location&&GM_xmlhttpRequest)aaus_50124.ch();