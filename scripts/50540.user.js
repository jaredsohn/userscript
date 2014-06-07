// ==UserScript==
// @name           Kraland sans bannière
// @namespace      ki
// @version        1.0
// @description    Retire le bandeau en haut de chaque page de Kraland.org et ajoute dans les liens le defkra actuel
// @include        http://www.kraland.org/*
// ==/UserScript==

var add_defkra = function()
{
    var bottom = document.getElementsByClassName('bottom');
    var subtop = document.getElementsByClassName('subtop');
    if (subtop.length != 0)
    {
        var code_defkra = 1;
                
        if (bottom[0] != null)
        {
            var defkra = bottom[0].innerHTML.match(/DefKra (\d)/);
            if (defkra) code_defkra = defkra[1];
        }
        
        var backcolor_defkra = new Array("#EBEBEB","#FDD5D9","#FDDE9F","LemonChiffon","");
        var color_defkra = new Array("black","#CD0000","DarkOrange ","gold","");
        subtop[0].innerHTML = '<div class="navlist" style="float: left; background-color:' +backcolor_defkra[code_defkra-1]+ ';"><a href="help.php?help=defkra" style="color:' +color_defkra[code_defkra-1]+ ';"><b>Defkra ' + code_defkra + '</b></a></div>' + subtop[0].innerHTML;
    }
    
    var node_list = document.getElementsByClassName('top');
    if (node_list[0] != null) node_list[0].style.display = 'none' ;
}

add_defkra();

aaus_50540={
i:'50540', // Script id on Userscripts.org
d:3, // Days to wait between update checks
n:'Kraland sans bannière',v:'10',t:new Date().getTime()|0,ca:function(r){GM_xmlhttpRequest({method:'GET',url:'https://userscripts.org/scripts/source/'+this.i+'.meta.js',onload:function(x){aaus_50540.co(x,r)}})},co:function(x,r){this.xv=/\/\/\s*@version\s+(.*)\s*\n/i.exec(x.responseText);this.xn=/\/\/\s*@name\s+(.*)\s*\n/i.exec(x.responseText);if(this.xv&&this.xn[1]==this.n){this.xv=this.xv[1].replace(/\./g, '');this.xn=this.xn[1];}else{if(x.responseText.match('Uh-oh! The page could not be found!')||this.xn[1]!=this.n)GM_setValue('updated', 'off');return false;}if(this.xv>this.v&&confirm('A new version of the '+this.xn+' user script is available. Do you want to update?')){GM_setValue('updated',this.t);GM_openInTab('http://userscripts.org/scripts/source/'+this.i+'.user.js')}else if(this.xv&&this.xv>this.v){if(confirm('Do you want to turn off auto updating for this script?')){GM_setValue('updated','off');GM_registerMenuCommand("Auto Update "+this.n,function(){GM_setValue('updated',new Date().getTime()|0);aaus_50540.ca('return')});alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.')}else{GM_setValue('updated',this.t)}}else{if(r)alert('No updates available for '+this.n);GM_setValue('updated',this.t)}},ch:function(){if(GM_getValue('updated',0)==0)GM_setValue('updated',this.t);if(GM_getValue('updated',0)!='off'&&+this.t>+GM_getValue('updated',0)+86400000*this.d){this.ca()}else if(GM_getValue('updated',0)=='off'){GM_registerMenuCommand("Enable "+this.n+" updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_50540.ca(true)})}else{GM_registerMenuCommand("Check "+this.n+" for updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_50540.ca(true)})}}};if(self.location==top.location&&GM_xmlhttpRequest)aaus_50540.ch();