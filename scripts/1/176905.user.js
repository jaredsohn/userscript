// ==UserScript==
// @name           Partis Admin Extended
// @version        0.60
// @description    Luksuz funkcije
// @author         NoBody
// @include        *.partis.si/*
// @updateURL	   http://userscripts.org/scripts/source/176905.user.js
// ==/UserScript==

var localpath = window.location.pathname;
var profil1 = new RegExp("/uporabnik/*");
var profil2 = new RegExp("/profil/prikazi/*");
var usertabela1 = new RegExp("/torrent/accounts/*");
var usertabela2 = new RegExp("/torrent/latest/*");
var dllist1 = new RegExp("/torrent/last50/*");
var dllist2 = new RegExp("/torrent/seznami*");
var cheatlist = new RegExp("/torrent/cheaters/*");
var comment1 = new RegExp("/torrent/podrobno/*");
var comment2 = new RegExp("/clanek/*");
var forum1 = new RegExp("/forums/*")
var forum2 = new RegExp("/topics/*")
var commentid = new RegExp("cdiv*");
var jokeid = new RegExp("jdiv*");


function addlinklist(hylink, besedilo, slika, isli) {
    
	if(profil1.test(localpath) || profil2.test(localpath)) {
    
		var el = document.getElementById("pollholder").getElementsByClassName("linklist")[0];
         
		var li = document.createElement("li");
		li.classList.add("linklistli");
		li.innerHTML = "<a href='" + hylink + "'><img src='" + slika + "' alt='Link'>" + besedilo + "</a>"; 
        if(isli==true) {
            var getbefore = document.getElementById("pollholder").getElementsByClassName("linklistli")[0];
        	li.innerHTML =  "<a href='javascript:void(0)'><img src='" + slika + "' alt='Link'>" + besedilo + "</a>"; 
        	el.insertBefore(li,getbefore);
            li.addEventListener("click", quickmsg, false);
    	} else {
			el.appendChild(li);
    	} 

    }
}

function addmenuitem(hylink, besedilo, meni) {
    
    try{
		var el = document.getElementById("menu").getElementsByClassName(meni)[0];
        
		var li = document.createElement("li");
		li.style.width = '158px';
		li.innerHTML = "<a href='" + hylink + "'>" + besedilo + "</a>"; // "<a href='" + hylink + "'>" + besedilo + "</a>";
		el.appendChild(li);
    } catch(err) { }
}

function addmenuscript(action, besedilo, meni) {

    try{
		var el = document.getElementById("menu").getElementsByClassName(meni)[0];

		var li = document.createElement("li");
		li.style.width = '158px';
    	li.innerHTML = "<a href='javascript:void(0)' onclick='" + action + "'>" + besedilo + "</a>";
		el.appendChild(li);
    } catch(err) { }
}



function editip() {
    
	if(usertabela1.test(localpath) || usertabela2.test(localpath)) {
        
		var elem = document.getElementById("leechseedlist").getElementsByClassName("tabelcatd");
    
    	for (var i = 8; i <= elem.length - 1; i += 5)
		{
            if(elem[i].innerHTML != "" ){
				elem[i].innerHTML = "<a href=\"http://www.partis.si/ip?ip=" + elem[i].innerHTML + '\"/>' + elem[i].innerHTML + "</a>" + ' <a href=\"http://www.webyield.net/ip/index.php?ip=' + elem[i].innerHTML + '\" target=\"_blank\"><img src=\"http://saveotic.com/images/2013/09/27/dzZgj.png\" width="13" height="13"></a>';
            }
		}
    }
}

function editclosebutton(id) {
    
	if(dllist1.test(localpath) || usertabela1.test(localpath)  || cheatlist.test(localpath)) {
        
		var elem = document.getElementById("Login");
		elem.value = "                               Nazaj na uporabnika                               ";
        elem.setAttribute("onclick", "window.location=\"http://www.partis.si/uporabnik/" + id + "\"");
        elem.setAttribute("id","Login1");
        
        var elem2 = document.getElementById("Login");
		elem2.value = "                               Nazaj na uporabnika                               ";
        elem2.setAttribute("onclick", "window.location=\"http://www.partis.si/uporabnik/" + id + "\"");
                           
    }
	else if(dllist2.test(localpath)) {
        
        var elem = document.getElementById("Login");
		elem.value = "                               Nazaj na torrent                               ";
        elem.setAttribute("onclick", "window.location=\"http://www.partis.si/torrent/podrobno/" + id + "\"");
        elem.setAttribute("id","Login1");
        
        var elem2 = document.getElementById("Login");
		elem2.value = "                               Nazaj na torrent                               ";
        elem2.setAttribute("onclick", "window.location=\"http://www.partis.si/torrent/podrobno/" + id + "\"");
    }
}

function calcbytes() {
    if(localpath == "/torrent/announce") {
        
		var elem = document.getElementById("leechseedlist").getElementsByClassName("tabelcatd");
        
    	for (var i = 12; i <= elem.length - 1; i += 8) {
            var stev = elem[i].textContent;
            stev = stev / 1024 / 1024 / 1024;
            elem[i].innerHTML = elem[i].innerHTML.replace(elem[i].textContent, Math.round(stev) + " GB");
		}
        
    	for (var i = 13; i <= elem.length - 1; i += 8) {
            var stev = elem[i].textContent;
            stev = stev / 1024 / 1024 / 1024;
            elem[i].innerHTML = elem[i].innerHTML.replace(elem[i].textContent, Math.round(stev) + " GB");
		}
	}
    else if(cheatlist.test(localpath)) {
    	var elem = document.getElementById("leechseedlist").getElementsByClassName("tabelcatd");
    	for (var i = 7; i <= elem.length - 1; i += 3) {
            var stev = elem[i].textContent;
            stev = stev / 1024 / 1024;
            elem[i].innerHTML = elem[i].innerHTML.replace(elem[i].textContent, Math.round(stev * 100) / 100 + " MB");

		}
    }
}

function newdelbutton(torrentid) {
    if(comment1.test(localpath) || comment2.test(localpath)) {
		setTimeout(function () {
			var allele = document.getElementsByTagName("*");      
            for (var i = 0; i < allele.length; i++) {  
               	if(allele[i].innerHTML.indexOf("Brišem komentar") != -1) {
                	if(commentid.test(allele[i].getAttribute('id')) || jokeid.test(allele[i].getAttribute('id'))) {
                        
                  		var currcomid = allele[i].getAttribute('id').replace("cdiv","");
                    	var getcomment = document.getElementById("c" + currcomid).getElementsByClassName("komentarcontent")[0];                 
                    	var getheader = document.getElementById("c" + currcomid).getElementsByClassName("komentarstatus")[0];
                    	var reasontxt = $.trim(getheader.textContent.replace("[  briši  ]","").replace(/'/g,"&#39;").replace(/"/g,'\\"')) + " :   " + $.trim(getcomment.textContent.replace(/'/g,"&#39;").replace(/"/g,'\\"'));
                    	var getcomuser = document.getElementById("c" + currcomid).getElementsByClassName("komentarlevo")[0];   
                    
						var reg = new RegExp("<a href=['\"]([^'\"]+)['\"]>");
						var hrefarray = reg.exec(getcomuser.innerHTML);
						var comuserid = hrefarray[0].replace(/[^0-9.]/g, "")
                    
                    	var actionnn = '$.post("http://www.partis.si/comment/delete/' + currcomid + '",{offset:\"0\",torrent_id:\"' + torrentid + '\"}); this.style.visibility=\"hidden\";';
                    	if(comment2.test(localpath)){ actionnn = '$.post("http://www.partis.si/comment/delete/' + currcomid + '",{offset:\"0\",article_id:\"' + torrentid + '\"}); this.style.visibility=\"hidden\";';}
                                                 
                    	var besedilo = '<img src=\"http://saveotic.com/images/2013/10/02/9uXGQ.png\"/>';
                      
                    	var action2 = '$.post(\"http://www.partis.si/user/warn/' + comuserid + '\",{time:\"240\",msg:\"' + reasontxt + '\"}); this.style.visibility=\"hidden\";';
                    	var besedilo2 = '<img src=\"http://www.partis.si/img/icons/exclamation.png\"/>';
                    	var action3 = 'if (confirm(\"Opozorim uporabnika? || ' + reasontxt.replace(/(\r\n|\n|\r)/gm,"") + '\")) { ' + action2 + ' }'
                         
                        //alert(allele[i].innerHTML + "\n" + "<a href='javascript:void(0)' onclick='" + actionnn + "'>" + besedilo + "</a>");
                    	allele[i].innerHTML = "<a href='javascript:void(0)' onclick='" + action3 + "'>" + besedilo2 + "</a><a href='javascript:void(0)' onclick='" + actionnn + "'>  " + besedilo + "</a>";
                	}
                }
			}
    	}, 1000);

    } else if(localpath == "/skupnost/sale") {
		setTimeout(function () {
			var allele = document.getElementsByTagName("*");      
            for (var i = 0; i < allele.length; i++) {  
               	if(allele[i].innerHTML.indexOf("Brišem šalo") != -1) {
                	if(commentid.test(allele[i].getAttribute('id')) || jokeid.test(allele[i].getAttribute('id'))) {
                        
                  		var currcomid = allele[i].getAttribute('id').replace("jdiv","");
                    	var getcomment = document.getElementById("c" + currcomid).getElementsByClassName("komentarcontent")[0];                 
                    	var getheader = document.getElementById("c" + currcomid).getElementsByClassName("komentarstatus")[0];
                    	var reasontxt = $.trim(getheader.textContent.replace("[  briši  ]","").replace(/'/g,"&#39;").replace(/"/g,'\\"')) + " :   " + $.trim(getcomment.textContent.replace(/'/g,"&#39;").replace(/"/g,'\\"'));
                    	var getcomuser = document.getElementById("c" + currcomid).getElementsByClassName("komentarlevo")[0];   
                    
						var reg = new RegExp("<a href=['\"]([^'\"]+)['\"]>");
						var hrefarray = reg.exec(getcomuser.innerHTML);
						var comuserid = hrefarray[0].replace(/[^0-9.]/g, "")
                    
                    	var actionnn = '$.post("http://www.partis.si/skupnost/delete_joke/' + currcomid + '",{offset:\"0\"}); this.style.visibility=\"hidden\";';                         
                    	var besedilo = '<img src=\"http://saveotic.com/images/2013/10/02/9uXGQ.png\"/>';
                      
                    	var action2 = '$.post(\"http://www.partis.si/user/warn/' + comuserid + '\",{time:\"240\",msg:\"' + reasontxt + '\"}); this.style.visibility=\"hidden\";';
                    	var besedilo2 = '<img src=\"http://www.partis.si/img/icons/exclamation.png\"/>';
                    	var action3 = 'if (confirm(\"Opozorim uporabnika? || ' + reasontxt.replace(/(\r\n|\n|\r)/gm,"") + '\")) { ' + action2 + ' }'
                         
                        //alert(allele[i].innerHTML + "\n" + "<a href='javascript:void(0)' onclick='" + actionnn + "'>" + besedilo + "</a>");
                    	allele[i].innerHTML = "<a href='javascript:void(0)' onclick='" + action3 + "'>" + besedilo2 + "</a><a href='javascript:void(0)' onclick='" + actionnn + "'>  " + besedilo + "</a>";
                	}
                }
			}
    	}, 1000);

    }
}

function addConfirm() {
	if(profil1.test(localpath) || profil2.test(localpath)) {
    
		var el = document.getElementById("pollholder").getElementsByClassName("linklistli");
  
		for (var i = 0; i < el.length; i++) {  
            
            if (el[i].innerHTML.indexOf("window.location=") != -1) {
				if (el[i].children.length <= 2) {
                	var opozorilotxt = el[i].children[0].textContent;
                	if($.trim(el[i].children[0].textContent) == "") { opozorilotxt = "Dodeli upload"; }
                    
                	el[i].children[0].setAttribute("original",el[i].children[0].getAttribute("onclick"));
                	el[i].children[0].setAttribute("onclick","window.location=");
                    el[i].children[0].setAttribute("opozorilo",opozorilotxt);
                    
                    el[i].addEventListener("click", prenovifunkcijo, false);
                }
                if (el[i].children.length == 2) {
                	var opozorilotxt = el[i].children[1].textContent;
                	if($.trim(el[i].children[1].textContent) == "") { opozorilotxt = "Dodeli upload"; }
                    
                    el[i].children[1].setAttribute("original",el[i].children[0].getAttribute("onclick"));               
                	el[i].children[1].setAttribute("onclick","window.location=");
                    el[i].children[1].setAttribute("opozorilo",opozorilotxt);
                    
                    el[i].addEventListener("click", prenovifunkcijo, false); 
                }
            
            } else if (el[i].innerHTML.indexOf("/user/del_comments/") != -1) {
                
                var oldhref = el[i].children[0].getAttribute("href");
                var newoc = 'window.location=\"' + oldhref + '\"';
                var opozorilotxt = el[i].children[0].textContent + " ?";
                var changedoc = 'if(confirm(\"' + opozorilotxt + '\")) { ' + newoc + ' }';
                
                el[i].children[0].setAttribute("href","javascript:void(0)");
                el[i].children[0].setAttribute("onclick",changedoc); 
            }
        }
    }
}

function prenovifunkcijo(){
	var opozorilo = $(this.innerHTML).attr('opozorilo');
    var originalsc = $(this.innerHTML).attr('original');
    var id = document.URL.replace(/.*\//, '').replace(/\D/g, "").toString();
            
	if(opozorilo.indexOf("Opozorilo (") != -1){
        var reason = prompt(opozorilo + ": vpiši razlog");
    	if(confirm(opozorilo + " ?\n\nRazlog: " + reason)){ 
            if(opozorilo.indexOf("24") != -1) {
    			window.location.href = "http://www.partis.si/user/warn/" + id + "?time=24&msg=" + reason;
            } else if (opozorilo.indexOf("48") != -1) {
                window.location.href = "http://www.partis.si/user/warn/" + id + "?time=48&msg=" + reason;
            } else if (opozorilo.indexOf("1 teden") != -1) {
                window.location.href = "http://www.partis.si/user/warn/" + id + "?time=168&msg=" + reason;
            } else if (opozorilo.indexOf("14 dni") != -1) {
                window.location.href = "http://www.partis.si/user/warn/" + id + "?time=336&msg=" + reason;
            } else if (opozorilo.indexOf("1 mesec") != -1) {
                window.location.href = "http://www.partis.si/user/warn/" + id + "?time=720&msg=" + reason;
            } else if (opozorilo.indexOf("2 meseca") != -1) {
                window.location.href = "http://www.partis.si/user/warn/" + id + "?time=1440&msg=" + reason;
            }   
    	}
    } else if (opozorilo.indexOf("Opozorilo za") != -1) {
        var reason = prompt(opozorilo + ": vpiši torrent");
    	if(confirm(opozorilo + " ?\n\nTorrent: " + reason)){
    		window.location.href = "http://www.partis.si/user/warn_hr/" + id + "?time=24&msg=" + reason;
    	}
    } else if (opozorilo.indexOf("Odstrani warn") != -1) {
        var reason = prompt(opozorilo + ": vpiši razlog");
    	if(confirm(opozorilo + " ?\n\nRazlog: " + reason)){
    		window.location.href = "http://www.partis.si/user/delwarn/" + id + "?msg=" + reason;
    	}
    } else if (opozorilo.indexOf("Ban uporabnika") != -1) {
        var reason = prompt(opozorilo + ": vpiši razlog");
    	if(confirm(opozorilo + " ?\n\nRazlog: " + reason)){
    		window.location.href = "http://www.partis.si/user/addban/" + id + "?msg=" + reason;
    	}
    } else if (opozorilo.indexOf("Dodeli upload") != -1 && this.innerHTML.indexOf("Dodeli download" ) == -1) {
        var amount1 = prompt(opozorilo + ": količina v GB");
        var reason = prompt(opozorilo + ": vpiši razlog");
        if(confirm(opozorilo + " ?\n\nKoličina: " + amount1 + " GB (" + Math.round(amount1 / 1024 * 100) / 100 + " TB)\nRazlog: " + reason)){
    		window.location.href = "http://www.partis.si/user/addupload/" + id + "?upload=" + amount1 + "&msg=" + reason;
    	}
    } else if (this.innerHTML.indexOf("Dodeli download") != -1) { //
        var amount1 = prompt("Dodeli download: količina v GB");
        var reason = prompt("Dodeli download: vpiši razlog");
        if(confirm("Dodeli download ?\n\nKoličina: " + amount1 + " GB (" + Math.round(amount1 / 1024 * 100) / 100 + " TB)\nRazlog: " + reason)){
    		window.location.href = "http://www.partis.si/user/adddownload/" + id + "?download=" + amount1 + "&msg=" + reason;
    	}
    } else if (opozorilo.indexOf("donacijo") != -1) {
        var amount1 = prompt(opozorilo + ": doniran znesek");
        var reason = prompt(opozorilo + ": način donacije");
        if(confirm(opozorilo + " ?\n\nZnesek: " + amount1 + " €\nNačin: " + reason)){
    		window.location.href = "http://www.partis.si/user/donation/" + id + "?amount=" + amount1 + "&msg=" + reason;
        }
    } else if (opozorilo.indexOf("Odstrani ban") != -1) {
        var reason = prompt(opozorilo + ": vpiši razlog");
    	if(confirm(opozorilo + " ?\n\nRazlog: " + reason)){
            var unbanid = originalsc.replace(/\D/g, "");
    		window.location.href = "http://www.partis.si/user/delban/" + unbanid + "?msg=" + reason;
    	}
    }
}


function quickmsg(){
    var el = document.getElementsByClassName("q4")[0].getElementsByClassName("q3")[0];
    var usern = $.trim(el.textContent);
    
    var msg1 = prompt("Sporočilo:");
    if(confirm("Zadeva: Sporočilo administratorja \n_____________________________\nSporočilo:\n" + msg1 + "\n_____________________________\nPošljem?")){
		$.post("http://www.partis.si/profil/sendmsg", {to: usern, subject: "Sporočilo administratorja", msg: msg1} );
	}
	
}

function fixizgled() {
    if(forum1.test(localpath) || forum2.test(localpath) || localpath == "/skupnost/forum") {
		document.getElementsByClassName("newz")[0].style.height="50px";
		document.getElementsByClassName("newztit2")[0].style.margin="25px 0 0 0";
	}
}

if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1){
	fixizgled();
}


function nastavbuttongmail() {
	if(localpath == "/torrent/latest") {
		var elema = document.getElementById("Login");
		elema.value = "Bris popularne domene";
        elema.addEventListener("click", brisdomene, false);
        
        elema.setAttribute("id","Login1");
        var elem2 = document.getElementById("Login");
		elem2.value = "          partis.si          ";
        elem2.setAttribute("onclick", "window.location=\"http://www.partis.si/\"");
	}
}

function brisdomene(){
    
	var elem = document.getElementById("leechseedlist").getElementsByClassName("tabelcatd");
	for (var i = 7; i <= elem.length - 1; i += 5)
	{
		if(elem[i].innerHTML.indexOf("gmail.com") != -1
           || elem[i].innerHTML.indexOf("hotmail.com") != -1
           || elem[i].innerHTML.indexOf("siol.net") != -1
           || elem[i].innerHTML.indexOf("yahoo.com") != -1
           || elem[i].innerHTML.indexOf("net.hr") != -1
           || elem[i].innerHTML.indexOf("outlook.com") != -1
           || elem[i].innerHTML.indexOf("amis.net") != -1
           || elem[i].innerHTML.indexOf("email.com") != -1
           || elem[i].innerHTML.indexOf("guest.arnes.si") != -1
           || elem[i].innerHTML.indexOf("t-2.net") != -1
           || elem[i].innerHTML.indexOf("volja.net") != -1
           || elem[i].innerHTML.indexOf("live.com") != -1) {
		elem[i].innerHTML = "";
		}
	}
}




nastavbuttongmail();

addConfirm();
                      
var id = document.URL.replace(/.*\//, '');
addlinklist("", "Hitro sporočilo", "http://www.partis.si/img/icons/email_go.png",true);
addlinklist("http://www.partis.si/torrent/accounts/" + id, "Seznam računov", "http://saveotic.com/images/2013/09/27/D5niz.png",false);
addlinklist("http://www.partis.si/torrent/cheaters/" + id, "Goljufanje", "http://saveotic.com/images/2013/09/27/Ifx7.png",false);

calcbytes();
editip();
editclosebutton(id);


if(comment1.test(localpath) || comment2.test(localpath) || localpath == "/skupnost/sale") {
$(document).ready(function(){    
    setInterval( function(){ newdelbutton(id); }, 2000);    
}); 
}

addmenuitem("http://www.partis.si/torrent/latest", "Novi uporabniki", "skupnost");
addmenuitem("http://www.partis.si/torrent/announce", "Cheaters", "skupnost");
addmenuscript("window.location=\"http://www.partis.si/ip?ip=\" + prompt(\"Vnesi IP naslov:\");", "Preveri IP naslov", "partis");
