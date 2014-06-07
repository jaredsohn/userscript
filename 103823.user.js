// ==UserScript==
// @name					Illuminations for Developers Keygen
// @namespace				Illuminations Keygen
// @id						Illuminations Keygen
// @description				Keygen for Illuminations For developers Addon for Firefox
// @include					*
// ==/UserScript==

var defaultname="C001H4ck3r";function makeLicense(){var obj={};if(!confirm("HI!\nThe protection is TOO BAD, so even a lamer can crack it by hisself.\nIt is really very easy!!!\nDo you really wanna to use this crack?\nIF YOU WANNA, YOU ARE LIABLE FOR EVERETHING AND FOR THIS ACTION TOO.THE AUTHOR OF THE CRACK IS NOT LIABLE FOR EVERYTHING (INCLUDING COPYRIGHT BREAKAGES)"))return;obj.name=prompt("What is your name?",defaultname);if(obj.name==defaultname){alert("If you are a "+defaultname+" you will break it by yourself :>\n");return;}
if(!obj.name){alert("fill the name");return;}
obj.domainid=prompt("Input domain you want",(obj.name+".com"));if(!obj.domainid){alert("fill the domain");return}
obj.accountid=prompt("Input your username",obj.name);if(!obj.accountid){alert("fill the username");return}
obj.expiration=prompt("Input expiration unix time or date in format MM/DD/YY:YY hh:mm",new Date().getTime()+100*24*356*3600);if(obj.expiration.match(/\d+/)){obj.expiration=parseInt(obj.expiration);}else{obj.expiration=Date.parse(obj.expiration);}
if(!obj.expiration){alert("fill in the correct date");return;}
var crcstr="return:"+obj.name+":"+obj.expiration+":"+obj.accountid+":"+obj.domainid;obj.h2=GM_cryptoHash(crcstr);var license=JSON.stringify(obj);try{GM_setClipboard(license);alert("License is copyed to your clipboard. Place it to file called \"Illumination-License.json\" in \"firebug\" subfolder in your profile folder\n");}catch(e){alert("License is:\n"+license+"\nCopy it to your clipboard and place it to file called \"Illumination-License.json\" in \"firebug\" subfolder in your profile folder\n");}}
GM_registerMenuCommand("Make Illuminations License",makeLicense);