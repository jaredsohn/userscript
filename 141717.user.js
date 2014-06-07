// ==UserScript==
// @name       Nxtgn Dark Theme
// @version    4.5.1
// @description  Nxtgn Dark Theme nu som Userscript
// @match      http://nxtgn.org/*
// @match      https://nxtgn.org/*
// @resource customCSS http://antipirat.hostoi.com/nxtgn.css
// @require  http://antipirat.hostoi.com/jquery.min.js
// @copyright  2012+, Paaskeharen og Digtokiller
// ==/UserScript==

 var cssTxt  = GM_getResourceText("customCSS");
 GM_addStyle (cssTxt);

var headID = document.getElementsByTagName("head")[0];         
var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.src = 'http://antipirat.hostoi.com/bonus.js';
headID.appendChild(newScript);

var style = document.createElement( "style" );

// Replace http://domain.com/style.css with the location of your stylesheet
style.appendChild( document.createTextNode("@import url( http://antipirat.hostoi.com/nxtgn.css );") );

document.getElementsByTagName("head").item(0).appendChild( style );


if (location.href.indexOf("forums.php") != -1)
{
    $('tr.highlight:first').parent().parent().attr('id', 'forum');
    $('.colhead[width="100%"]').parent().parent().parent().attr('id', 'forum');
    
    /* Henter URL-parametre og deler dem op, fx. topidid=xxx, page=xxx */
    var urlparam=window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');var params=[],curparam;
    for(var i=0; i < urlparam.length; i++){curparam=urlparam[i].split('=');params.push(curparam[0]);params[curparam[0]]=curparam[1];}
    
    /* Tjekker om den aktuelle side er en tråd inden i forummet */
	if(params['action']=='viewtopic'&&params['topicid']){
        
        /* Vælg hvor mange tal der skal være synlige i linjen med sidetal. Det første er tal fra det første og det sidste tal. Det andet er fra det midterste*/ 
        var visip_end=5,visip_mid=5;
        
        /* Fanger alle sidetal-telementerne (linksene) */
        var topicpages=$('body center p[align=center]:last b');
        
        /* Inkluderer hvis der søges på noget tekst, og tæller hvor mange sider der er, og finder den aktuelle side */ 
        var pageview='',uhl=params['highlight']?'&highlight='+params['highlight']:'',countpages=topicpages.length-2;
        curpage=params['page']&&params['page']<=countpages&&params['page']>=1?params['page']:(params['page']<1?1:countpages);
        
        /* Udregner hvor mange tal der skal vises */
        var cvpl=parseFloat(curpage)-visip_mid,cvpr=parseFloat(curpage)+visip_mid;
        
        /* Vælger teksten til de to knapper, forrige og næste */
        var lpt='&lt;&lt;&nbsp;<b>Forrige</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',npt='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Næste</b>&nbsp;&gt;&gt;',apdots;
        
        /* Hvis det er første side, skal forrige-linket deaktiveres, eller skal det aktiveres - og det samme med sidste side og Næste-linket */
        lpt=curpage==1?lpt:'<a href="/forums.php?action=viewtopic&topicid='+params['topicid']+uhl+'&page='+(parseFloat(curpage)-1)+'">'+lpt+'</a>';
        npt=curpage==countpages?npt:'<a href="/forums.php?action=viewtopic&topicid='+params['topicid']+uhl+'&page='+(parseFloat(curpage)+1)+'">'+npt+'</a>';
        
        /* Gå igennem hvert side-tal */
        topicpages.each(function(i, elem){
            
            /* Hvis sidetallet er indenfor den gruppe af tal vi ønsker at vise, forsæt */
            if(i<=visip_end||i>=cvpl&&i<=cvpr||i>=countpages-visip_end+1){
                
                /* Udregner om den skal vise første/sidste-side-link, sidetals-link eller aktuel-sidetal */
                pageview+=i==0?lpt:(i==(countpages+1)?npt:(i==curpage?'<b>['+i+']</b>':'<a href="/forums.php?action=viewtopic&topicid='+params['topicid']+uhl+'&page='+i+'"><b>'+i+'</b></a>'));if(apdots==1)apdots=0;pageview+=' ';}else{
                    
                    /* Hvis der ikke skal vises sidetal, skal der vises tre punktummer, og de skal kun vises én gang - derfor vi tjekker med variablen apdots */
                    if(apdots!=1){apdots=1;pageview+='&nbsp;...&nbsp;&nbsp;';}
                }
        });
        
        /* Her overskriver vi de sidetal der allerede står der, og indsætter de nye
Man kan nemt tilføje en sætning der også tilføjer variablen pageview til et element i toppen af siden
*/
        $('body center p[align=center]:last').html(pageview);
	}
}

var renderPage = true;
var uploader=false;
var searchBarVal = "Search for torrents...";

var COLOR_UL = "#B9FB73";
var COLOR_DL = "#FE0002";
var BUFFER_COLOR = "#005D8D";

var AMOUNT_UL = "";
var AMOUNT_DL = "";

var BYTE_UL = 0.0;
var BYTE_DL = 0.0;

var BUFFER = 0.0;

var kilobyte = 1024;
var megabyte = kilobyte * 1024;
var gigabyte = megabyte * 1024;
var terabyte = gigabyte * 1024;
var petabyte = terabyte * 1024;

var precision = 3;

var table=document.body.getElementsByTagName("table")[1];

function sizeToBytes(amount) {
    var fAmount = parseFloat(amount);
    if (amount.indexOf("PB") != -1) {
        return Math.round(fAmount*petabyte*100000)/100000;
    }
    else if (amount.indexOf("TB") != -1) {
        return Math.round(fAmount*terabyte*100000)/100000;
    }
    else if (amount.indexOf("GB") != -1) {
        return Math.round(fAmount*gigabyte*100000)/100000;
    }
    else if (amount.indexOf("MB") != -1) {
        return Math.round(fAmount*megabyte*100000)/100000;
    } 
    else if (amount.indexOf("KB") != -1) {
        return Math.round(fAmount*kilobyte*100000)/100000;
    }
    else if (amount.indexOf("B") != -1) {
        return fAmount;
    }
}

function bytesToSize(bytes)
{  
    if ((bytes >= 0) && (bytes < kilobyte)) {
        return bytes + ' B';
        
    } else if ((bytes >= kilobyte) && (bytes < megabyte)) {
        return (bytes / kilobyte).toFixed(precision) + ' KB';
        
    } else if ((bytes >= megabyte) && (bytes < gigabyte)) {
        return (bytes / megabyte).toFixed(precision) + ' MB';
        
    } else if ((bytes >= gigabyte) && (bytes < terabyte)) {
        return (bytes / gigabyte).toFixed(precision) + ' GB';
        
    } else if ((bytes >= terabyte) && (bytes < petabyte)) {
        return (bytes / terabyte).toFixed(precision) + ' TB';
        
    } else if (bytes >= petabyte) {
        return (bytes / petabyte).toFixed(precision) + ' PB';
        
    } else {
        return bytes + ' B';
    }
}

tags = table.getElementsByTagName("font");

for (var i=0; i<tags.length; i++)
{
    if (tags[i].color == COLOR_UL)
        AMOUNT_UL = tags[i+1].innerHTML;
    if (tags[i].color == COLOR_DL) {
        AMOUNT_DL = tags[i+1].innerHTML;
        var referenceNode = tags[i+2];
    }
}

BYTE_UL = sizeToBytes(AMOUNT_UL);
BYTE_DL = sizeToBytes(AMOUNT_DL);

BUFFER = BYTE_UL - BYTE_DL;

var buffer_text = "0 KB";
if (BUFFER > 0) {
    buffer_text = bytesToSize(BUFFER);
}

if (location.href.indexOf("forums.php") != -1)
{
    $('tr.highlight:first').parent().parent().attr('id', 'forum');
    $('.colhead[width="100%"]').parent().parent().parent().attr('id', 'forum');
}
else if (location.href.indexOf("details.php?id=") != -1)
{
    $('p.sub:first').parent().attr('id', 'comments');
	
	
}
else if (location.href.indexOf("moresmilies.php") != -1 ||
         location.href.indexOf("login.php") != -1 ||
         location.href.indexOf("signup.php") != -1 ||
         location.href.indexOf("redir.php") != -1 ||
         location.href.indexOf("recover.php") != -1)
{
    renderPage = false;
    /* add unique id to these pages */
    $('body').attr('id', 'not-logged-in');
}

if (renderPage) {
    /* pull the damn user information ! hella nasty, nothing's got names or anything */
    var objects = $('body center table:nth-of-type(2) tbody tr td:nth-of-type(3) font');
    
    var username = "";
    var profile_url = "";
    var ratio = "";
    var upload = "";
    var download = "";
    var bonus = "";
    var isaf = "";
    var invites = "";
    var flsinbox= "";
    var FLS = false;
    
    
    /* this will most likely fuck up if they add or change anything */
    objects.each(function(i, elem) {
        if (i === 0) {
			url=$(elem).html().split('"');
			profile_url=url[1];
		}
        else if (i === 1)
            username = elem.innerHTML;
        else if (i === 2) {
            if (elem.innerHTML.substring(30,31)>0 || elem.innerHTML.substring(3,6)=="FLS") {
                if (elem.innerHTML.substring(30,31)>0) {
                    flsinbox=elem.innerHTML.substring(30,31); 
                }
                FLS=true; 
                if (objects[3].innerHTML.substring(20,21)>0) {
                    invites=objects[3].innerHTML.substring(20,21);
                }
                else {
                    invites=objects[3].innerHTML.substring(10,11);
                }
            }
            else if (elem.innerHTML.substring(20,21)>0) {
                invites=elem.innerHTML.substring(20,21);
            }
            else {
                invites=elem.innerHTML.substring(10,11);
            }
        }
        else if (i === 5 && elem.innerHTML == "Mine Uploads")  {
            uploader = true;
            isaf=objects[19].innerHTML;
        }
        else if (i === 6 && elem.innerHTML == "Mine Uploads")  {
            uploader = true;
            isaf=objects[20].innerHTML;
        }
        else if (elem.innerHTML == "<strong>Ratio:</strong>") {
            /* infinite ratio fucks up otherwise! */
            var tr = objects[i+1].innerHTML;
            if (tr == "Inf.")
                ratio = tr;
            else
                ratio = objects[i+2].innerHTML;
        }
        else if (elem.innerHTML == "<strong>UL</strong>")
            upload = objects[i+1].innerHTML;
        else if (elem.innerHTML == "<strong>DL</strong>")
            download = objects[i+1].innerHTML;
        else if (elem.innerHTML == "<strong>Bonus</strong>")
            bonus = objects[i+1].innerHTML; 
        else if (i == 18 && isaf=="")
            isaf = objects[i].innerHTML;
    });
    var UPLOAD_LINE = uploader ? '<li><a href="/upload.php">Upload</a></li><li><a href="/mytorrents.php">Mine Uploads</a></li>' : '';
    var FLS_LINE = FLS ? '<li><a href="/staff.php">Staff</a></li><li><a href="/users.php">Brugere</a></li>' : '';
    if (FLS==true) {
        FLS_INBOX='<a href="/flsbox.php">FLS Inbox ('+flsinbox+')</a> - ';
    }
    else {
        FLS_INBOX=''; 
    }
    
    if (location.href.indexOf("bonus.php") != -1) {
        var fundet = $('body center table:nth-of-type(4) tbody tr td center table:nth-of-type(1) tbody tr td:nth-of-type(4)');
        fundet.each(function(i, elem) {
            if (i==1) {
                elem.innerHTML='<input class="button" type="button" name="submit" value="Shop!" style="background-color: #00F200;" onclick="bonuspost(6);">';
            }
            if (i==2) {
                elem.innerHTML='<input class="button" type="button" name="submit" value="Shop!" style="background-color: #00F200;" onclick="bonuspost(1);">';
            }
            if (i==3) {
                elem.innerHTML='<input class="button" type="button" name="submit" value="Shop!" style="background-color: #00F200;" onclick="bonuspost(5);">';
            }
            if (i==4) {
                elem.innerHTML='<input class="button" type="button" name="submit" value="Shop!" style="background-color: #00F200;" onclick="bonuspost(12);">';
            }
            if (i==5) {
                elem.innerHTML='<input class="button" type="button" name="submit" value="Shop!" style="background-color: #00F200;" onclick="bonuspost(2);">';
            }
            if (i==6) {
                elem.innerHTML='<input class="button" type="button" name="submit" value="Shop!" style="background-color: #00F200;" onclick="bonuspost(30);">';
            }
            if (i==7) {
                elem.innerHTML='<input class="button" type="button" name="submit" value="Shop!" style="background-color: #00F200;" onclick="bonuspost(3);">';
            }
        })
	}
    var body = '<div id="header">'
        + '   <div id="logo"></div>'
        + '   <div id="lancount">'+$('#lancount').html()+'</div>'
        + '   <div id="userbar">'
        + '     <div class="ratio"><span class="icon"></span><span>'+ratio+'</span></div>'
        + '     <div class="up"><span class="icon"></span><span>'+upload+'</span></div>'
        + '     <div class="down"><span class="icon"></span><span>'+download+'</span></div>'
        + '     <div class="down"><span class=""></span><span>Buf '+buffer_text+'</span></div>'
        + '     <div class="bonus"><a href="/bonus.php"><span class="icon">+</span>'+bonus+'</a></div>'
        + '     <div class="isaf"><a href="/'+profile_url+'"><span class="icon"></span>'+isaf+'</a></div>'
        + '     <div class="invite"><a href="/invite.php"><span class="icon"></span>'+invites+'</a></div>'
        + '     <div class="bookmarks"><a href="/bookmarks.php" class="icon"></a></div>'
        + '     <div class="login">'
        + '       <div class="name"><a href="/'+profile_url+'">'+username+'</a></div>'
        + '       <div class="menu">'+FLS_INBOX
        + '<a href="/inbox.php">Inbox</a> - <a href="/my.php">Edit</a> - <a href="/logout.php">Log out</a></div>'
        + '     </div>'
        + '   </div>'
        + ' </div>'
        
        + ' <div id="navigation">'
        + '   <ul>'
        + '     <li><a href="/">Home</a></li>'
        + '     <li><a href="/browse.php">Torrents</a></li>'
        + '     <li><a href="/forums.php">Forums</a></li>'
        + '     <li><a href="/viewrequests.php">Requests</a></li>'
        + UPLOAD_LINE
        + '     <li><a href="/chat.php">Chat</a></li>'
        + '     <li><a href="/donate.php">Donate</a></li>'
        + '     <li><a href="/rules.php">Rules</a></li>'
        + '     <li><a href="/faq.php">FAQ</a></li>'
        + '     <li><a href="/guides.php">Guides</a></li>'
        + '     <li><a href="/contactstaff.php">Support</a></li>'
        + FLS_LINE
        + '   </ul>'
        + ''
        + '   <div id="search">'
        + '     <form action="browse.php" method="get">'
        + '       <span class="input"><input id="search-bar" type="search" name="search" autocomplete="off" value="'+searchBarVal+'" /></span>'
        + '       <span class="submit"><input type="image" src="http://antipirat.hostoi.com/nxtgnimg/blank.gif" class="submit" alt="submit" /></span>'
        + '     </form>'
        + '   </div>'
        + ' </div>'
        + $('body').html();
    body = body.replace(/<img src="http:\/\/nxtgn\.org\/pic\/forumicons\/unlocked\.gif">/g, '<span class="forum-unlocked"></span>');
    body = body.replace(/<img src="http:\/\/nxtgn\.org\/pic\/forumicons\/unlockednew\.gif">/g, '<span class="forum-unlockednew"></span>');
    $('body').html(body);
    if (location.href.indexOf("flxbox.php") != -1) {
        document.body.innerHTML=document.body.innerHTML.replace("<h1 align=center>FLS PM's</h1>",'<center><h1 align="center">FLS PM</h1>');
        document.body.innerHTML=document.body.innerHTML.replace('<h1 align=center>FLS PM'+"'"+'s</h1>','<center><h1 align="center">FLS PM</h1>');
    }
	if (navigator.userAgent.indexOf("Firefox")!=-1) {
		if (location.href.indexOf("/details.php?id=") != -1) {
			if (document.forms[1].innerHTML.substring(1,61).indexOf("disabled")==-1) {
				document.forms[1].innerHTML='<input type="submit" value="Tak!" name="submit" style="cursor:pointer">'+document.forms[1].innerHTML.substring(50,200);
			}
			else {
				document.forms[1].innerHTML='<input type="button" value="Du har allerede takket!" name="submit" style="cursor:not-allowed">'+document.forms[1].innerHTML.substring(69,200);
			}
			document.forms[2].innerHTML='<input type="submit" value="Giv et hjerte!" name="submit" style="cursor:pointer">\n'+document.forms[2].innerHTML.substring(62,300)
		}
	}
	else {
		if (location.href.indexOf("/details.php?id=") != -1) {
			if (document.forms[1].innerHTML.substring(1,61).indexOf("disabled")==-1) {
				document.forms[1].innerHTML='<input type="submit" value="Tak!" name="submit" style="cursor:pointer">'+document.forms[1].innerHTML.substring(61,200);
			}
			else {
				document.forms[1].innerHTML='<input type="button" value="Du har allerede takket!" name="submit" style="cursor:not-allowed">'+document.forms[1].innerHTML.substring(61,200);
			}
			document.forms[2].innerHTML='<input type="submit" value="Giv et hjerte!" name="submit" style="cursor:pointer">\n'+document.forms[2].innerHTML.substring(62,300)
		}
	}
	if (location.href.indexOf("/reqdetails.php?id=") != -1) {
		var obj = $('body center table:nth-of-type(4) tbody tr td center table tbody tr:nth-of-type(6) td:nth-of-type(2) input');
		var obj2 = $('body center table:nth-of-type(4) tbody tr td center table tbody tr:nth-of-type(7) td:nth-of-type(2) input');
		obj[1].outerHTML='<input type="button" style="height:22px" value="Udfyld Request" onclick="fyldrequest()">';
		obj2[0].outerHTML='<input type="button" style="height:22px" value="Send PM" onclick="sendrequestpm()">';

	}
    $('#search-bar').blur(function() {
        if($(this).val() == '') {
            $(this).val(searchBarVal);
        }
    });
    
    $('#search-bar').focus(function() {
        if($(this).val() == searchBarVal) {
            $(this).val('');
        }
    });
}
