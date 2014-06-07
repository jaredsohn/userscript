// ==UserScript==
// @name           Partis Friends
// @version        0.29
// @description    Shrani si prijatelje na partisu
// @author         NoBody
// @include        *.partis.si/*
// @updateURL	   http://userscripts.org/scripts/source/181084.user.js
// ==/UserScript==

var id = document.URL.replace(/.*\//, '').replace(/\D/g, "").toString();
var localpath = window.location.pathname;
var profil1 = new RegExp("/uporabnik/*");
var profil2 = new RegExp("/profil/prikazi/*");

try{
    var a = readCookie("partisfriendlist");
    if (a == null) {
        createCookie("partisfriendlist","",20*365);
    }
} catch(err) {
    createCookie("partisfriendlist","",20*365); 
}


var elem1 = document.getElementsByClassName("newimggalone");
if(elem1.length > 3) {
    
    var elem = elem1[3];
	
    elem.setAttribute('alt',"Prijatelji");
	elem.setAttribute('src',"http://www.partis.si/img/icons/user.png");
    elem.parentNode.setAttribute("href","http://www.partis.si/profil/prijatelji");
	elem.parentNode.innerHTML = elem.parentNode.innerHTML.replace("Donacije","Prijatelji");
}


if(localpath == "/profil/prijatelji") {
    var b = readCookie("partisfriendcat");
    if (b == null){
        createCookie("partisfriendcat","",20*365);
    }
    
    var getcontent3 = document.getElementsByClassName("contentt3")[0];
    getcontent3.innerHTML = '<div class="r1"></div><div class="r3">Nerazvrščeno</div><div class="r2"></div>';
    var newztit2 = document.getElementsByClassName("newztit2")[0];
    newztit2.textContent = 'Moji prijatelji ';
    
	var li = document.createElement("a");
    li.innerHTML =  "<a href='javascript:void(0)'><img src='/img/icons/pencil.png'></a>"; 
    li.setAttribute("id","editcategory");
    newztit2.appendChild(li);
   	li.addEventListener("click", editmode, false);
    var li2 = document.createElement("a");
    li2.innerHTML =  " <a href='javascript:void(0)'><img src='http://saveotic.com/images/2013/10/30/jW0lq.png'></a>";
    li2.setAttribute("id","addcategory");
    newztit2.appendChild(li2);
   	li2.addEventListener("click", addcat, false);
    
    
    var linklist = document.createElement("ul");
    linklist.classList.add("linklist");
    getcontent3.appendChild(linklist);

    var fromcookie = readCookie("partisfriendlist");
    var splitcookie = fromcookie.split("##");
    
    for (var i = 0; i < splitcookie.length - 1; i++) {  
    
        var splituser = splitcookie[i].split("{{");
        var splituser1 = splituser[1].split(",");
        var fulluserid = splituser1[0];
        
        var splitusername = splitcookie[i].split(",");
        var splitusername1 = splitusername[1].split("}}");
        var fullusename = decodeURIComponent(splitusername1[0]);
        
        //alert(fulluserid + "  " + fullusename);
        
        var userlink = document.createElement("li");
		userlink.classList.add("linklistli2");
        userlink.innerHTML = '<a href="/uporabnik/' + fulluserid + '"><img src="/img/icons/user.png" alt="Link">' + fullusename + '</a>';

        linklist.appendChild(userlink);
        
    }

    
    var fromcookie2 = readCookie("partisfriendcat");
    //alert(readCookie("partisfriendcat"));
    var splitcookie2 = fromcookie2.split("##");
    for (var i = 0; i < splitcookie2.length - 1; i++) {
        var splitcat = splitcookie2[i].split("{{");
        var splitcat1 = splitcat[1].split("}}");
        var fullcat = decodeURIComponent(splitcat1[0]);
  		
        var cathead = document.createElement("div");
        cathead.innerHTML = '<br><div class="r1"></div><div class="r3">' + fullcat + '</div><div class="r2"></div>';
        getcontent3.appendChild(cathead);
        
    }
    
}

function confirmEdited() {
    if(confirm("Shranim spremembe?")) {
		
        
        
    	location.reload();
    }
}

function addcat(){
    var newcat = prompt("Vpiši ime nove kategorije");
    if(newcat != null && newcat != "") {
        var alll = readCookie("partisfriendcat");
        if(alll.indexOf(newcat) == -1){
            var encodednewcat = encodeURIComponent($.trim(newcat));
        	var newinput = "{{" + encodednewcat + "}}##";
			createCookie("partisfriendcat", alll + newinput, 20*365);
        	
        	location.reload();
            
        } else { alert("Kategorija že obstaja"); }
    }
}

function editmode(){
    var editbutton = document.getElementById("editcategory");
    editbutton.removeEventListener("click", editmode, false);
    editbutton.addEventListener("click", confirmEdited, false);
    editbutton.innerHTML = editbutton.innerHTML.replace("pencil.png","accept.png");
    
    var hidecat = document.getElementById("addcategory");
    hidecat.setAttribute("style","visibility:hidden");
    
    var friend = document.getElementsByClassName("linklistli2");
    
	for(var i = 0; i < friend.length; i++) {
        var catselect = document.createElement("select");
        catselect.setAttribute("id", friend[i].childNodes[0].getAttribute("href").replace(/[^0-9.]/g, ""));
        catselect.setAttribute("style",'margin: 0 0 5px 15px; width: 150px;');
                 
        var op = new Option();
		op.value = 1;
		op.text = "Nerazvrščeno";
		catselect.options.add(op);
        
        var fromcookie2 = readCookie("partisfriendcat");
    	var splitcookie2 = fromcookie2.split("##");
    	for (var i2 = 0; i2 < splitcookie2.length - 1; i2++) {
        	var splitcat = splitcookie2[i2].split("{{");
        	var splitcat1 = splitcat[1].split("}}");
        	var fullcat = decodeURIComponent(splitcat1[0]);
            
            var opt = new Option();
			opt.value = 1;
			opt.text = fullcat;
			catselect.options.add(opt);
    	}
        
		friend[i].appendChild(catselect);
	}
    
}


function delfriend(){
                                   
    var fromcookie = readCookie("partisfriendlist");
    var splitcookie = fromcookie.split("##");
    //alert(fromcookie);
    for (var i = 0; i < splitcookie.length; i++) {  
    
        var splituser = splitcookie[i].split("{{");
        var splituser1 = splituser[1].split(",");
        var fulluserid = splituser1[0];
        
        var splitusername = splitcookie[i].split(",");
        var splitusername1 = splitusername[1].split("}}");
        var fullusename = decodeURIComponent(splitusername1[0]);
        
        if(fulluserid == id){
            var userdeleted = fromcookie.replace("{{" + id + "," + encodeURIComponent(fullusename) + "}}##","");
            createCookie("partisfriendlist", userdeleted,20*365);
            location.reload();
        }
    }
}

function addfriend(){
    var alll = readCookie("partisfriendlist");
    var el = document.getElementsByClassName("q4")[0].getElementsByClassName("q1")[2].getElementsByClassName("q3")[0];
    var usern = encodeURIComponent($.trim(el.innerHTML));
    var newuser = "{{" + id + "," + usern + "}}##";
    
	if (alll + newuser > 4040) {
        alert("Vaša lista prijateljev je polna");
    } else {
    	if(alll.indexOf(id) == -1){
    		createCookie("partisfriendlist", alll + newuser,20*365);
        	location.reload();
    	}
    }
}

function addlinklist(hylink, besedilo, slika, isadd) {
    if(localpath != "/skupnost/uporabniki"){
	if(profil1.test(localpath) || profil2.test(localpath)) {
		var el = document.getElementById("pollholder").getElementsByClassName("linklist")[0];     
		var li = document.createElement("li");
		li.classList.add("linklistli");
		var getbefore = document.getElementById("pollholder").getElementsByClassName("linklistli")[2];
        li.innerHTML =  "<a href='javascript:void(0)'><img src='" + slika + "' alt='Link'>" + besedilo + "</a>"; 
        el.insertBefore(li,getbefore);
        
        if(isadd == true) {
        	li.addEventListener("click", addfriend, false);
        } else {
            li.addEventListener("click", delfriend, false);
        }
    }
    }
}

if(readCookie("partisfriendlist").indexOf(id) == -1) {
	addlinklist("", "Dodaj prijatelja", "http://saveotic.com/images/2013/10/29/4OWRI.png", true);
} else {
    addlinklist("", "Odstrani prijatelja", "http://saveotic.com/images/2013/10/29/gJ7b.png", false);
}




function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {
    createCookie(name,"",-1);
}