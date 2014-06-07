// ==UserScript==
// @name           MyT411
// @description    Script pour personnaliser T411.me 
// @namespace      www.t411.me
// @version        16
// @icon		   http://s3.amazonaws.com/uso_ss/icon/154715/large.png
// @include        http*://www.t411.me/
// @include        http*://www.t411.me/top/*
// @include        http*://www.t411.me/torrents/*
// @include        http*://www.t411.me/cloud/*
// @include        http*://www.t411.me/requests/*

// @require		   http://code.jquery.com/jquery-latest.min.js
// @require        http://tablesorter.com/__jquery.tablesorter.min.js
// @require        http://tablesorter.com/addons/pager/jquery.tablesorter.pager.js

// @require        http://userscripts.org/scripts/source/159301.user.js
// @resource  meta http://userscripts.org/scripts/source/154715.meta.js
// @versioninfo	   Bug V15 sur la page de recherche
// @interval       1
// ==/UserScript==

/*
History:

todo - A suivre...

V16 - 11/05/2013
 -- Bug de la V15 sur la page de recherche.

V15 - 08/05/2013
 -- BP pour Afficher/Masquer les lignes déjà vu. On ne voit que ce qu'on à pas vu.

V14 - 24/04/2013
 -- Mise à jour design de la V13
 
V13 - 24/04/2013
 -- Mise à jour code et disposition du Menu Rapide MyT411
 -- Menu Rapide sur liste des torrent, sous forme d'image au lieu de de texte
 -- Menu T411 bloqué pour la apge d'accueil, de recherche, de liste des torrent et du détail d'un torrent

V12 - 18/04/2013
 -- [Sur une idée de "pleindidee"] - Menu de raccourcie vers les sous catégories de torrent (Musique, Comics... Film, Séries...)
 -- Menu de raccourcie sur une page de détal d'un torrent
 
V11 - 28/03/2013
 -- Icone
 -- [Sur une idée de "pleindidee"] - Changement de couleur TR au passage de la sourie
 -- Mettre lien de raccoucie DétailTorrent dans le titre du torrent en haut de page
 -- BP DL disparait quand click
 
V10 - 23/03/2013
 -- Amélioration/réduction du code
 -- Affichage de la date de derniére visite en haut de page à cote de "Torrent du xxx" ainsi que du temps passé sans T411
 -- Cleaner et inclusion de la page d'accueil T411
 -- Cleaner et inclusion de la page d'un Détail de Torrent
 --- Sur cette page, ajout d'un raccourci (à coté de Bon, Mauvais, Infecté en haut) pour aller directement au détail du torrent et donc au BP DL
 
V9 - 22/03/2013
 -- [Sur une idée de "pleindidee"] - Dans la page de recherche, Copier-coller en haut de page de la barre de pagination.
 -- Nom du torrent dans l'attribut "tittle" sur l'icone DL et css :hover pour faire beau.
 
V8 - 20/03/2013
 -- Amélioration du code
 -- jQuery TableSorting mis à jour pour les tableaux de torrent. Tri par défaut sur l'AGE et le NOM DU TORRENT.
 
V7 - 13/03/2013
 -- Mémorise l'effet de masquer une sous catégorie de torrent. Vous pourrez masquer definitivement la catégorie de dessins animé par exemple.
 -- Page de recherche: Lorsque l'on change une catégorie de recherche, le filtre s'affiche tout seul.
 
V6 - 10/03/2013
 -- Ne mémorise pas la date de visite sur la page de recherche, et ne pas mettre en gris les torrent vus (puisqu'on les recherches...)
 
V5 - 03/03/2013
 -- Amélioration code
 -- gestion de la DateHeure du dernier passage et coloration 
 des torrent déjà vus
 -- effet jquery fadeIn() et fadeOut() plus beau
V4 - 28/02/2013
 -- Afficher/Masquer les sous liste de torrent en cliquant sur les titres
 
V3 - 27/12/2012
 -- Ajout de Afficher/Masquer le filtre de recherche sur la page search
 
V2 - 23/12/2012
 -- Agrandissement du tableau des torrent et centrage de celui-ci
 
V1 - 22/12/2012 
 -- Création avec récupération de quelques script existants
             - T411Ratios - http://userscripts.org/scripts/show/153371 (Ajoute 2 colonnes de ratio leech et seed - modifié)
			 - T411 Cleaner - http://userscripts.org/scripts/show/82686 (supprime des cadres - modifié)
			 - Get T411 - http://userscripts.org/scripts/show/150844 (ajoute une colonne de DL dans le tableau des torrent)
			 - torrent411 - http://userscripts.org/scripts/show/75591 (modifier apparence [titre...] - modifié)
			 - J'agrandi le tableau principale en largeur
*/

function Hide_Filtre(){var b="";0<$(".terms-wrapper").length&&("none"===$(".terms-wrapper").css("display")?($(".terms-wrapper").fadeIn(),b="Masquer"):($(".terms-wrapper").fadeOut(),b="Afficher"),$("#bp_display_search").attr("value",b+" crit\u00e8res de recherche"))} function Hide_Filtre_FUNCTION(){var b;b="function Hide_Filtre(){\tvar text = '';\tif($('.terms-wrapper').length > 0){";b+="\t\tif($('.terms-wrapper').css('display') === 'none'){";b+="\t\t\t$('.terms-wrapper').fadeIn(); text = 'Masquer';";b+="\t\t}";b+="\t\telse{";b+="\t\t\t$('.terms-wrapper').fadeOut(); text = 'Afficher';";b+="\t\t}";b+="\t\t$('#bp_display_search').attr('value',text+' crit\u00e8res de recherche');";b+="\t}";return b+="}"} function DateNow_String_GM(b){var c=new Date;return c.getFullYear().toString()+"/"+(10>c.getMonth()?"0":"")+c.getMonth().toString()+"/"+(10>c.getDate()?"0":"")+c.getDate().toString()+"/"+(10>c.getHours()?"0":"")+c.getHours().toString()+"/"+(10>c.getMinutes()?"0":"")+(b?c.getMinutes()+10:c.getMinutes().toString())+"/"+(10>c.getSeconds()?"0":"")+c.getSeconds().toString()} function Indiquer_Date_DerniereVisite(b){b=b.split("/");var c=new Date;c.setFullYear(b[0]);c.setMonth(b[1]);c.setDate(b[2]);c.setHours(b[3]);c.setMinutes(b[4]);var j=(new Date-c)/1E3,c=Math.floor(j/86400),h=Math.floor((j-86400*c)/3600),k=Math.floor((j-(86400*c+3600*h))/60),j=Math.floor(j-(86400*c+3600*h+60*k)),l="et",a="jours",g="heures",e="minutes",f="secondes";0==c?c=a="":1==c&&(a="jour");0==h?h=g="":1==h&&(g="heure");0==k?k=e="":1==k&&(e="minute");0==j?j=f=l="":1==j&&(f="seconde");0==k&&(0==h&& 0==c)&&(l="");c=c+" "+a+" "+h+" "+g+" "+k+" "+e+" "+l+" "+j+" "+f;$("h2:eq(0) span").html($("h2:eq(0) span").html()+" - Derni\u00e8re visite le "+b[2]+"/"+b[1]+"/"+b[0]+" "+b[3]+"h"+b[4]+":"+b[5]+(""==c?"":" - Il y a "+c))}function injectCSS(b){head=document.getElementsByTagName("head")[0];style=document.createElement("style");style.setAttribute("type","text/css");style.innerHTML=b;head.appendChild(style)} function injectSCRIPT(b){head=document.getElementsByTagName("head")[0];style=document.createElement("script");style.setAttribute("language","javascript");style.innerHTML=b;head.appendChild(style)}function Menu_T411_fixed(b){var c;""==b&&(c=0);"DETAIL"==b&&(c=33);"LISTE"==b&&(c=48);b=0+c;injectCSS("body{margin-top: "+(104+c)+"px;");injectCSS(".headerPlace{position: fixed;width:100%;top:"+b+"px;right:0;z-index:95;}")} function T411_Home(){$("div #right, div #left").each(function(){$(this).remove()});$("div .content").each(function(){$(this).css("width","85%");$(this).css("margin","auto")});Menu_T411_fixed("")} function Liste_Torrent(){$("div #right, div #left, div #contentWrapper").each(function(){$(this).remove()});var b=GM_getValue("T411-DateVisite",DateNow_String_GM(!0));0<document.location.href.indexOf("/top/")&&Indiquer_Date_DerniereVisite(b);var c=[],j=[],h=[],k="";if(0<$(".results").length&&($(".results tbody tr").each(function(){var a=$(this);k!=$("td:eq(0) a.category:eq(0)",a).html()&&(j.push($("td:eq(0) a.category:eq(0) img",a).attr("alt")),c.push($("td:eq(0) a.category:eq(0)",a).html()));k=$("td:eq(0) a.category:eq(0)", a).html();var g=$("td:eq(1) a",a).attr("title"),e=$("a.nfo",a).attr("href").replace("nfo","download"),f=$('<td align="center"></td>');void 0!=e&&e.match(/id=[0-9]+/)&&$('<a href="'+e+'"><img src="http://thepiratebay.se/static/img/dl.gif" alt="DL" title="DL: '+g+'" class="img_dl" width="9px" height="11px"/></a>').appendTo(f);f.insertBefore($("a.nfo",a).parent());var g=parseInt(a.children("td.up").html(),10),e=parseInt(a.children("td.down").html(),10),d=f=0,h="red";0!=g&&0!=e&&(f=Math.round(100*(e/ g))/100,d=Math.round(100*(g/e))/100);0.2<=f&&0.5>=f&&(h="orange");0.5<=f&&1>=f&&(h="green");1<=f&&(h="#00E522");a.append('<td style="font-weight:bold;color:'+h+';background-color:lightgrey;" align="center">'+f+"</td>");(1<=f&&0.5<=d||1<=f&&25<=e&&10<=g)&&a.css("background-color","#BBFFAD");if(0>=document.location.href.indexOf("torrents/search/")&&0>=document.location.href.indexOf("torrents/needseed/")&&(g=new Date,g.setFullYear(b.split("/")[0]),g.setMonth(b.split("/")[1]),g.setDate(b.split("/")[2]), g.setHours(b.split("/")[3]),g.setMinutes(b.split("/")[4]),g<(new Date).getTime())){f=a.children("td:nth-child(6)").html();e=f.split(" ")[0];f=f.split(" ")[1];d=new Date;switch(f){case "seconde":d.setTime(d.getTime()-1E3*e);break;case "secondes":d.setTime(d.getTime()-1E3*e);break;case "minute":d.setTime(d.getTime()-6E4*e);break;case "minutes":d.setTime(d.getTime()-6E4*e);break;case "heure":d.setTime(d.getTime()-36E5*e);break;case "heures":d.setTime(d.getTime()-36E5*e);break;case "jour":d.setTime(d.getTime()- 864E5*e);break;case "jours":d.setTime(d.getTime()-864E5*e);break;case "semaine":d.setTime(d.getTime()-6048E5*e);break;case "semaines":d.setTime(d.getTime()-6048E5*e);break;case "mois":d.setTime(d.getTime()-2592E6*e);break;case "an":d.setTime(d.getTime()-31536E6*e);break;case "ans":d.setTime(d.getTime()-31536E6*e);break;default:alert("duree:"+e+" - type:"+f+" - DateItem/DateVisite : "+d+"/"+g)}d<g?(a.css("color","grey"),a.css("font-weight","normal"),0>=document.location.href.indexOf("torrents/search/")&& 0>=document.location.href.indexOf("torrents/needseed/")&&a.attr("class","MyT411_Old")):a.css("font-weight","bold")}}),$(".MyT411_Old").fadeOut(),$('<th align="center">DL</th>').insertBefore($("th:contains(NFO)")),$(".results thead tr").append('<th width="50px">Seed (ratio)</th>'),0>=document.location.href.indexOf("torrents/search/")&&GM_setValue("T411-DateVisite",DateNow_String_GM()),$(".results thead tr").each(function(){var a=$(this);a.css("color","grey");$("th:eq(1)",a).html("Nom du Torrent"); $("th:eq(2)",a).css("width","20px");$("th:eq(3)",a).html("Nfo");$("th:eq(3)",a).css("width","20px");$("th:eq(4)",a).html("Com.");$("th:eq(4)",a).css("width","20px");$("th:eq(5)",a).css("width","50px");$("th:eq(7)",a).html("Complet");$("th:eq(7)",a).css("width","30px");$("th:eq(8)",a).html("UP (seed)");$("th:eq(8)",a).css("width","50px");$("th:eq(9)",a).html("DL (leech)");$("th:eq(9)",a).css("width","50px");$("th:eq(10)",a).html("Ratio UP");$("th:eq(10)",a).css("width","50px")}),$("div .content").each(function(){$(this).css("width", "85%");$(this).css("margin","auto");$(".img_dl").hover(function(){$(this).data("ImgDl_Width",$(this).css("width")).css("width","13px");$(this).data("ImgDl_Height",$(this).css("height")).css("height","14px")},function(){$(this).css("width",$(this).data("ImgDl_Width"));$(this).css("height",$(this).data("ImgDl_Height"))});$(".img_dl").click(function(){$(this).remove()});$("tbody tr").hover(function(){$(this).data("bgcolor",$(this).css("background-color")).css("background-color","lightblue")},function(){$(this).css("background-color", $(this).data("bgcolor"))})}),$(function(){$.tablesorter.addParser({id:"size",is:function(){return!1},format:function(a){return a.match(/GB/i)?1048576*parseFloat(a):a.match(/MB/i)?1024*parseFloat(a):a.match(/KB/i)?parseFloat(a):a},type:"numeric"});$.tablesorter.addParser({id:"unixts",is:function(){return!1},format:function(a){return a.match(/seconde/i)?parseFloat(a):a.match(/minute/i)?60*parseFloat(a):a.match(/heure/i)?3600*parseFloat(a):a.match(/jour/i)?86400*parseFloat(a):a.match(/semaine/i)?604800* parseFloat(a):a.match(/moi/i)?2592E3*parseFloat(a):a.match(/an/i)?31536E3*parseFloat(a):a},type:"numeric"});$.tablesorter.addParser({id:"tag",is:function(){return!1},format:function(a){a=a.split("\n").splice(1,1);return a=(new String(a)).replace(/(^\s+)|(\s+$)/g,"")},type:"text"});$.tablesorter.defaults.sortList=[[5,0],[1,0]];$("table").tablesorter({headers:{"0":{sorter:!1},1:{sorter:"tag"},2:{sorter:!1},3:{sorter:!1},4:{sorter:"unixts"},5:{sorter:"unixts"},6:{sorter:"size"},7:{sorter:"unixts"},8:{sorter:"unixts"}, 9:{sorter:"unixts"},10:{sorter:"unixts"}}})}),$("h3").each(function(){h.push("MyT411-"+$(this).html().replace(" ",""));$(this).append('<a id="MyT411-'+$(this).html().replace(" ","")+'" class="v-offset">&nbsp;</a>');!1==GM_getValue("T411-"+$(this).html(),!0)&&$(this).next(".results").attr("style","display:none");this.addEventListener("click",function(){"none"===$(this).next(".results").css("display")?($(this).next(".results").fadeIn(),GM_setValue("T411-"+$(this).html(),!0)):($(this).next(".results").fadeOut(), GM_setValue("T411-"+$(this).html(),!1))},!1)}),injectCSS("h3{cursor:pointer;}"),0>=document.location.href.indexOf("torrents/search/")&&0>=document.location.href.indexOf("torrents/needseed/")&&0>=document.location.href.indexOf("torrents/presentation/"))){$("body").prepend('<div id="MenuMyT411"><a href="#" onclick="return false;" class="alignleft" id="VoirCacher">voir</a></h2>');for(var l in h)Math.round(h.length/1.8)==l&&$("#MenuMyT411").html($("#MenuMyT411").html()+"<br />"),$("#MenuMyT411").html($("#MenuMyT411").html()+ '<a class="category ImgMyT411" title="'+j[l]+'" href="#'+h[l]+'">'+c[l]+"</a>");injectCSS("#MenuMyT411{background: url('http://www.t411.me/themes/blue/images/login-bar-bg.png') repeat-x scroll left bottom #d4d4d4;height: 48px;width:100%;vertical-align:middle;text-align:center;color: #36414B;font-size: 12px;position:fixed;top:0;right:0;z-index:95;");Menu_T411_fixed("LISTE");injectCSS(".v-offset{position: relative;top: -148px;}");injectCSS("#VoirCacher{position:absolute;z-index:99;top:14px;left:5px;}"); $("#VoirCacher").each(function(){this.addEventListener("click",function(){"voir"===$(this).html()?($(this).html("cacher"),$(".MyT411_Old").fadeIn()):($(this).html("voir"),$(".MyT411_Old").fadeOut())},!1)})}} function Detail_Torrent(){$("div #right, div #left, div .navigation, div .ads, div .share, div .bottomads").each(function(){$(this).remove()});$("div .description, div .votes").each(function(){$(this).attr("style","text-align:center")});$("div .content").each(function(){$(this).css("width","85%");$(this).css("margin","auto")});$("body").prepend('<div id="MenuMyT411"></h2>');$("#MenuMyT411").html('<a title="Haut de page" href="#">&uArr;</a> '+$("h2:eq(0) span").html().replace("URL Raccourcie","")+ ' <a title="Bas de page" href="#footer">&dArr;</a><br /><a title="Description Torrent" href="#Description">Description</a>, <a title="BP T\u00e9l\u00e9charger / Dire Merci / Signaler" href="#Download">Download</a>, <a title="D\u00e9tails Torrent" href="#Details">D\u00e9tails</a>, <a title="Ajouter un Commentaire" href="#Commentaire">Commentaire</a>');$(".stats dd:last-child").append('<a id="footer" class="v-offset">&nbsp;</a>');$("h2:eq(0) span").append('<a id="Description" class="v-offset">&nbsp;</a>'); $(".details th:eq(0)").append('<a id="Download" class="v-offset">&nbsp;</a>');$(".accordion h3:eq(0)").append('<a id="Details" class="v-offset">&nbsp;</a>');$("h2:eq(1) span").append('<a id="Commentaire" class="v-offset">&nbsp;</a>');injectCSS("#MenuMyT411{background: url('http://www.t411.me/themes/blue/images/login-bar-bg.png') repeat-x scroll left top transparent;height: 33px;width:100%;text-align:center;color: #36414B;font-size: 12px;position:fixed;top:0;right:0;z-index:95;");injectCSS(".v-offset{position: relative;top: -137px;}"); Menu_T411_fixed("DETAIL")} function Recherche_Torrent(){if(0<$(".terms-wrapper").length){var b=document.createElement("span").appendChild(document.createElement("input"));b.setAttribute("type","button");b.setAttribute("id","bp_display_search");b.setAttribute("value","Afficher/Masquer");b.setAttribute("style","background: -moz-linear-gradient(center top , #113366, #001A30) repeat scroll 0 0 transparent;border: 1px solid #111133;border-radius: 4px 4px 4px 4px;box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);color: #FFFFFF;cursor: pointer;display: block;font-size: 13px;font-weight: 700;width:250px;padding: 4px 6px;text-align: center;");b.setAttribute("onclick", "Hide_Filtre();");$(b).insertBefore(".btn");Hide_Filtre();injectSCRIPT(Hide_Filtre_FUNCTION());$("#search-cat").each(function(){this.addEventListener("change",function(){""!=$(" > option:selected",this).attr("value")?($(".terms-wrapper").fadeIn(),$("#bp_display_search").attr("value","Masquer crit\u00e8res de recherche")):($(".terms-wrapper").fadeOut(),$("#bp_display_search").attr("value","Afficher crit\u00e8res de recherche"))},!1)})}0<$(".pagebar").length&&($(".pagebar").parent().attr("colspan", "11"),$(".results").parent().prepend($(".pagebar").clone().css("text-align","center")));Menu_T411_fixed("")}var t411="t411.me/",dlh=document.location.href;(0<dlh.indexOf("torrents/upload-step-1/")||0<dlh.indexOf("torrents/needseed/")||0<dlh.indexOf("torrents/presentation/")||0<dlh.indexOf("cloud/")||0<dlh.indexOf("requests/"))&&Menu_T411_fixed("");dlh.substr(dlh.length-t411.length,t411.length)==t411&&T411_Home(); (0<dlh.indexOf("top/")||0<dlh.indexOf("torrents/search/")||0<dlh.indexOf("torrents/needseed/"))&&Liste_Torrent();0<dlh.indexOf("torrents/search/")&&Recherche_Torrent();0<dlh.indexOf("torrents/")&&(0>=dlh.indexOf("torrents/search/")&&0>=dlh.indexOf("torrents/needseed/")&&0>=dlh.indexOf("torrents/upload-step-1/")&&0>=dlh.indexOf("torrents/presentation/"))&&Detail_Torrent();