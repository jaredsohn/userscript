// ==UserScript==
// @name        Report_Tool
// @namespace   Report By Evaelis
// @description Ajoute un bouton de report qui poste dans le post poubelle
// @include     *.cheat-gam3.com/*
// @exclude     *.cheat-gam3.com/archives/*
// @exclude     *.cheat-gam3.com/redaction-de-news/*
// @exclude     *.cheat-gam3.com/annonce-de-lequipe/*
// @exclude     *.cheat-gam3.com/reglement-du-forum/*
// @exclude     *.cheat-gam3.com/nos-partenaires/*
// @exclude     *.cheat-gam3.com/*/index*.html
// @version     1.4
// ==/UserScript==
reg=new RegExp('<.[^>]*>', 'gi'); name=document.getElementsByClassName('bigusername')[0].innerHTML.replace(reg, '' ); document.getElementById('poststop').innerHTML = "<img src=\"http://image.noelshack.com/fichiers/2013/26/1372500214-report.png\" alt=\"Report\" border=\"0\" style=\"position:absolute;padding-left:100px;\" onClick=\"reg=new RegExp('<.[^>]*>', 'gi'); $.post('newreply.php?do=postreply&t=13531', { message : '" + name + " => [URL]" + window.location.href + "[/URL]', signature : '1', securitytoken: SECURITYTOKEN, do:'postreply'},function(data) {serializer = new XMLSerializer(); serialized = serializer.serializeToString(data);serialized=serialized.replace(reg, '' ); if(serialized.indexOf('import') != -1) { alert('Report effectué') } else { alert(serialized); }});\"/>";