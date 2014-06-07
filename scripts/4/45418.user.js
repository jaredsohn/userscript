// ==UserScript==
// @name           Kraland forum lien direct
// @namespace      ki
// @version        1.0
// @description    Ajoute un lien direct vers chaque message des forums kraland
// @include        http://www.kraland.org/main.php?page=4;*
// ==/UserScript==

var link_post = function(ev)
{
    var posts = document.getElementsByClassName("post_foot");
    if (posts == null) {alert("Erf"); return 0;}
    
    for (var i=0; i<posts.length; i++)
    {
        var reg = /<a href="main.php\?page=4;(\d*;\d*;\d*;)(\d*)&amp;p0=3">Répondre<\/a>/;
        var result = reg.exec(posts[i].innerHTML);
        if (result)
        {
            var direct_link = document.createElement('a');
            direct_link.href = 'main.php?page=4;' + result[1] + result[2] + '#msg' + result[2] + '';
            direct_link.appendChild(document.createTextNode("Message"));
            
            posts[i].insertBefore(document.createTextNode(" - "), posts[i].firstChild);
            posts[i].insertBefore(direct_link, posts[i].firstChild);
        }
    }
}

window.addEventListener('load', link_post, true) ;

aaus_45418={
i:'45418', // Script id on Userscripts.org
d:3, // Days to wait between update checks
n:'Kraland forum lien direct',v:'10',t:new Date().getTime()|0,ca:function(r){GM_xmlhttpRequest({method:'GET',url:'https://userscripts.org/scripts/source/'+this.i+'.meta.js',onload:function(x){aaus_45418.co(x,r)}})},co:function(x,r){this.xv=/\/\/\s*@version\s+(.*)\s*\n/i.exec(x.responseText);this.xn=/\/\/\s*@name\s+(.*)\s*\n/i.exec(x.responseText);if(this.xv&&this.xn[1]==this.n){this.xv=this.xv[1].replace(/\./g, '');this.xn=this.xn[1];}else{if(x.responseText.match('Uh-oh! The page could not be found!')||this.xn[1]!=this.n)GM_setValue('updated', 'off');return false;}if(this.xv>this.v&&confirm('A new version of the '+this.xn+' user script is available. Do you want to update?')){GM_setValue('updated',this.t);GM_openInTab('http://userscripts.org/scripts/source/'+this.i+'.user.js')}else if(this.xv&&this.xv>this.v){if(confirm('Do you want to turn off auto updating for this script?')){GM_setValue('updated','off');GM_registerMenuCommand("Auto Update "+this.n,function(){GM_setValue('updated',new Date().getTime()|0);aaus_45418.ca('return')});alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.')}else{GM_setValue('updated',this.t)}}else{if(r)alert('No updates available for '+this.n);GM_setValue('updated',this.t)}},ch:function(){if(GM_getValue('updated',0)==0)GM_setValue('updated',this.t);if(GM_getValue('updated',0)!='off'&&+this.t>+GM_getValue('updated',0)+86400000*this.d){this.ca()}else if(GM_getValue('updated',0)=='off'){GM_registerMenuCommand("Enable "+this.n+" updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_45418.ca(true)})}else{GM_registerMenuCommand("Check "+this.n+" for updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_45418.ca(true)})}}};if(self.location==top.location&&GM_xmlhttpRequest)aaus_45418.ch();