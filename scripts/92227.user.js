// ==UserScript==
// @name           Facebook Boso Jowo oleh Yusella Rangga Jempoldism
// @namespace      http://picharagift.blogspot.com
// @description    Ber Facebookj Ria dengan bahasa Jawa, BOSO JOWO FACEBOOK
// @include        http://www.facebook.com/*
// @include        http://facebook.com/*
// @include        http://*.facebook.com/
// @copyright      Yusella Rangga jempoldism
// @date 20100820
// @time 0436
// @version 2010.08.20.0436
// ==/UserScript==
// Based on http://userscripts.org/scripts/show/41369
// Syntax: 'Search word' : 'Replace word',
//303 /461/620
var words={"Home":"Omah","News Feed":"Pawartos","Top News":"Pawartos Populer","Most Recent":"Pawartos Anyar","Profile":"Propil kula","Find":"Golek","Friend":"Konco","Friends":"Konco","Welcome":"Sugeng Rawuh"," Edit":"Ganti","Notification":"Pangerten","Notifications":"Pangerten","People":"Uwong-Uwong","You":"Kowe","what":"Opo","on":"sing","your mind":"Pikiranmu","comment":"bacoti","commented":"mbacoti","mutual friends":"konco sing podo","messages":"Pesen","message":"Pesen","Account":"Akun","See":"Delok","All":"Kabeh","add":"Tambahke","as":"dadi","and":"lan","others":"wong liyo","like":"seneng","view":"delok","hours","jam","minutes":"menit","seconds":"detik","group":"grup","event":"acara","events":"acara","applications":"dolanan","application":"dolanan","facebook":"fesbuk","chat":"omong-omongan","create":"gawe","sponsored":"reklame","sponsor":"reklame","via":"lewat","more":"maneh","game":"dolanan","games":dolanan","person":"uwong","who":"sopo","on":"nang","find":"goleki","search":"goleki","invite":"di jak i","Track":"lacak","here":"nang kene","because":"soale","connect":"sambung","try":"jajal","the":" ","write":"tulis","English":"Jowo","older posts":"kiriman lawas","options":"pilihan","about":"tentang","advertising":"ngiklan","developer","pembantu","careers":"karir","privacy:"tata tertib","terms":"sing bener","help":"tulung","":""};
//JoeSimmons prepareRegex //
String.prototype.prepareRegex=function(){return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g,"\\$1")};function isOkTag(a){return("a, address, area, b, bdo, big, blockquote, body, button, caption, cite, code, dd, dfn, div, dl, dt, em, fieldset, form, h1 to h6, hr, i, img, input, kbd, label, legend, li, map, object, ol, p, pre, samp, select, small, span, strong, sub, sup, table, tbody, td, textarea, tfoot, th, thead, tr, tt, ul, var ".indexOf(","+a)==-1)}var regexs=new Array(),replacements=new Array();for(var word in words){if(word!=""){regexs.push(new RegExp("\\b"+word.prepareRegex().replace(/\*/g,'[^ ]*')+"\\b",'gi'));replacements.push(words[word])}}var texts=document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null),text="";for(var i=0,l=texts.snapshotLength;(this_text=texts.snapshotItem(i));i++){if(isOkTag(this_text.parentNode.tagName.toLowerCase())&&(text=this_text.textContent)){for(var x=0,l=regexs.length;x<l;x++){text=text.replace(regexs[x],replacements[x]);this_text.textContent=text}}}