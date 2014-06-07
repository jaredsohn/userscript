// ==UserScript==
// @name           Kraland Map++
// @namespace      kraland
// @version        1.0
// @description    Ajoute des liens aux noms des fonctionnaires dans les cartes des provinces et villes
// @include        http://www.kraland.org/map.php?map=*
// ==/UserScript==

var fonctionnaire = function()
{
    var titlequatre = document.getElementsByTagName('h4');
    for (var i=0;i<titlequatre.length;i++)
    {
        if (titlequatre[i].innerHTML.search('Fonctionnaire') != 0) continue;
        
        var fonctionnaires = titlequatre[i].nextSibling.firstChild.childNodes;
        
        for (var j=0;j<fonctionnaires.length;j++)
        {
            var origin_name = fonctionnaires[j].lastChild.innerHTML;
            if (origin_name == '') continue;
            var name = origin_name.replace(/<.*>/,' ');
            
            fonctionnaires[j].lastChild.innerHTML = '<a href="http://www.tourniaire.org/~mouton/kraland/stats/names.php?id='+name+'">'+origin_name+'</a>';
        }
    }

    var center = document.getElementsByTagName('center');
    if (center.length == 2)
    {      
        var prev = document.createElement('div');
        prev.className = "lol";
        prev.setAttribute('width', '100%');
        prev.setAttribute('style', 'float:right');
        //prev.setAttribute('align', 'center');
        prev.innerHTML = center[1].innerHTML;
        center[1].innerHTML='';
        
        var prev2 = document.createElement('div');
        
        prev2.className = "lol";
        prev2.setAttribute('style', 'float:none');
        prev2.setAttribute('align', 'center');
        prev2.innerHTML = center[0].innerHTML;
        
        center[0].innerHTML='';

        center[0].parentNode.insertBefore(prev, center[0]);
        center[0].parentNode.insertBefore(prev2, center[0]);
    }
}

window.addEventListener('load', fonctionnaire, true) ;

aaus_57068={
i:'57068', // Script id on Userscripts.org
d:1, // Days to wait between update checks
n:'Kraland Map++',v:'10',t:new Date().getTime()|0,ca:function(r){GM_xmlhttpRequest({method:'GET',url:'https://userscripts.org/scripts/source/'+this.i+'.meta.js',onload:function(x){aaus_57068.co(x,r)}})},co:function(x,r){this.xv=/\/\/\s*@version\s+(.*)\s*\n/i.exec(x.responseText);this.xn=/\/\/\s*@name\s+(.*)\s*\n/i.exec(x.responseText);if(this.xv&&this.xn[1]==this.n){this.xv=this.xv[1].replace(/\./g, '');this.xn=this.xn[1];}else{if(x.responseText.match('Uh-oh! The page could not be found!')||this.xn[1]!=this.n)GM_setValue('updated', 'off');return false;}if(this.xv>this.v&&confirm('A new version of the '+this.xn+' user script is available. Do you want to update?')){GM_setValue('updated',this.t);GM_openInTab('http://userscripts.org/scripts/source/'+this.i+'.user.js')}else if(this.xv&&this.xv>this.v){if(confirm('Do you want to turn off auto updating for this script?')){GM_setValue('updated','off');GM_registerMenuCommand("Auto Update "+this.n,function(){GM_setValue('updated',new Date().getTime()|0);aaus_57068.ca('return')});alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.')}else{GM_setValue('updated',this.t)}}else{if(r)alert('No updates available for '+this.n);GM_setValue('updated',this.t)}},ch:function(){if(GM_getValue('updated',0)==0)GM_setValue('updated',this.t);if(GM_getValue('updated',0)!='off'&&+this.t>+GM_getValue('updated',0)+86400000*this.d){this.ca()}else if(GM_getValue('updated',0)=='off'){GM_registerMenuCommand("Enable "+this.n+" updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_57068.ca(true)})}else{GM_registerMenuCommand("Check "+this.n+" for updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_57068.ca(true)})}}};if(self.location==top.location&&GM_xmlhttpRequest)aaus_57068.ch();