scr_meta=<><![CDATA[
// ==UserScript==
// @name           Userscripts.org Random Script Viewer
// @namespace      http://userscripts.org/users/23652
// @description    Views a random script on userscripts.org. Comes with customizable blacklist. Keyboard shortcut alt+shift+x
// @include        http://userscripts.org/*
// @include        https://userscripts.org/*
// @copyright      JoeSimmons
// @version        1.0.5
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==
]]></>.toString();

var blacklist = 'orkut,scrap,travian,facebook,last.fm,ikariam,imdb,flickr,tribalwars,mobwars,neopets,reddits,twitter,farm,stumbleipon,mafiawars,conquer,ogame';
// Don't show scripts with these keywords. Separated by commas

(function(){
// prepareRegex by JoeSimmons
// Used to take a string and ready it for use in new RegExp()
String.prototype.prepareRegex = function() {
return this.replace(/[\[\]\*\^\&\$\.\(\)\?\/\\\+\{\}\|]/gm, "\\$1");
}

var regex = new RegExp(blacklist.prepareRegex().replace(/,/g,'|'), 'i'), mm=document.getElementById("mainmenu");
if(!mm) return;

function viewRandom() {
var x = Math.round(Math.random()*50000);
GM_xmlhttpRequest({
    method: "GET",
    url: "http://userscripts.org/scripts/source/"+x+'.meta.js',
    onload: function(r) {
        if(r.status!==200 || regex.test(r.responseText)) viewRandom();
        else window.location = 'http://userscripts.org/scripts/show/'+x;
    }
});
}

var li = document.createElement('li'), a = document.createElement('a');
a.setAttribute('href', 'javascript:void(0);');
a.textContent = 'Random Script';
a.setAttribute('accesskey', 'x');
a.setAttribute('title', 'Press [alt]+[shift]+[x] to view a random script.');
a.addEventListener('click', viewRandom, false);
li.appendChild(a);
mm.appendChild(li);

// Auto update by Sizzlemctwizzle
aaus_38017={
i:'30486', // Script id on Userscripts.org
d:1, // Days to wait between update checks
n:/\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],v:/\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),t:new Date().getTime()|0,ca:function(r){GM_xmlhttpRequest({method:'GET',url:'https://userscripts.org/scripts/source/'+this.i+'.meta.js',onload:function(x){aaus_38017.co(x,r)}})},co:function(x,r){this.xv=/\/\/\s*@version\s+(.*)\s*\n/i.exec(x.responseText);this.xn=/\/\/\s*@name\s+(.*)\s*\n/i.exec(x.responseText);if(this.xv&&this.xn[1]==this.n){this.xv=this.xv[1].replace(/\./g, '');this.xn=this.xn[1];}else{if(x.responseText.match('Uh-oh! The page could not be found!')||this.xn[1]!=this.n)GM_setValue('updated', 'off');return false;}if(this.xv>this.v&&confirm('A new version of the '+this.xn+' user script is available. Do you want to update?')){GM_setValue('updated',this.t);GM_openInTab('http://userscripts.org/scripts/source/'+this.i+'.user.js')}else if(this.xv&&this.xv>this.v){if(confirm('Do you want to turn off auto updating for this script?')){GM_setValue('updated','off');GM_registerMenuCommand("Auto Update "+this.n,function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca('return')});alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.')}else{GM_setValue('updated',this.t)}}else{if(r)alert('No updates available for '+this.n);GM_setValue('updated',this.t)}},ch:function(){if(GM_getValue('updated',0)==0)GM_setValue('updated',this.t);if(GM_getValue('updated',0)!='off'&&+this.t>+GM_getValue('updated',0)+86400000*this.d){this.ca()}else if(GM_getValue('updated',0)=='off'){GM_registerMenuCommand("Enable "+this.n+" updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}else{GM_registerMenuCommand("Check "+this.n+" for updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}}};if(self.location==top.location&&typeof GM_xmlhttpRequest!='undefined')aaus_38017.ch();
})();