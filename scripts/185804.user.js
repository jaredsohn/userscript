// ==UserScript==
// @name           e-Sim SUNA Motivator
// @description    With this script you can get easy +5 food limits.
// @version        1.0.0
// @include        http://suna.e-sim.org/*
// @exclude        http://suna.e-sim.org/battle.html*
// ==/UserScript==

function getId() {
var patt1 = /[0-9]+/i;
var txt = $("#userName").attr("href");
var strtxt = txt.match(patt1);
return strtxt;
}


function loadXMLDoc()
    {
        if (window.XMLHttpRequest)
        {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp=new XMLHttpRequest();
        }
        else
        {// code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
				//alert(xmlhttp.responseText);
                html=xmlhttp.responseText;
				//alert(html);
				//prompt("asd",html);
				//alert("megy")
				
				html = html.split("class=\"dataTable \"");
				
				//alert(html[1]);
				//prompt("asd",html[1]);
				
				ids = html[1].match(/[0-9]{4,8}/g);
				names = html[1].match(/">(.*)<\/a>/g)
				
				names1 = names[0].substr(2,names[0].length - 6);
				names2 = names[2].substr(2,names[2].length - 6);
				names3 = names[4].substr(2,names[4].length - 6);
                                                                        names4 = names[6].substr(2,names[6].length - 6);
				names5 = names[8].substr(2,names[8].length - 6);
				
				if(names1.length>4){names1.substr(0,4);names1+="..."}
				if(names2.length>4){names2.substr(0,4);names2+="..."}
				if(names3.length>4){names3.substr(0,4);names3+="..."}
				if(names4.length>4){names4.substr(0,4);names4+="..."}
				if(names5.length>4){names4.substr(0,4);names4+="..."}
				//prompt("asd",names2);
				
				$("<h4  class=\"smallHeaderSecond\" style=\"color:#f2f2f2;padding-top:0;\" >New players</h4><div  class='panelPlate' style='width: 100%'><div id='ud_mot' style='width:48px; margin:auto'><img src='http://db.tt/Cg9BG2DR'/></div><div style=\"height:200px;\" class=\"switch foundation-style\" id='flip_mot' ></div></div><hr class=\"foundation-divider\"><script>$(document).ready(function(){$('#ud_mot').click(function(){$('#flip_mot').slideToggle('slow');});});</script>").insertBefore($("#userMenu div h4:eq(3)"));
				
				$('#flip_mot').slideToggle(1);
				
				//Motivation package sent succesfully!
				
				document.getElementById("flip_mot").innerHTML="<table align=\"center\" border=\"0\" cellpadding=\"1\" cellspacing=\"1\" style=\"width: 100%;\"><thead><tr><th scope=\"col\">Player</th><th scope=\"col\">Wep</th><th scope=\"col\">Food</th><th scope=\"col\">Gift</th></tr></thead><tbody><tr><td><a href=\"profile.html?id="+ids[0]+"\">"+names1+"</a></td><td><img style=\"cursor:pointer\" onclick='$.post(\"http://suna.e-sim.org/motivateCitizen.html?id="+ids[0]+"\", { type: 1, id: "+ids[0]+" },function(data) {var patt=/Motivation package sent/g;var result=patt.test(data);if(result){alert(\"OK! You got +1 food limit.\");}else{alert(\"Something is wrong! :(\");}} );' id='w1' src='http://db.tt/jSRlurQw'></td><td><img style=\"cursor:pointer\" onclick='$.post(\"http://suna.e-sim.org/motivateCitizen.html?id="+ids[0]+"\", { type: 2, id: "+ids[0]+" },function(data) {var patt=/Motivation package sent/g;var result=patt.test(data);if(result){alert(\"OK! You got +1 food limit.\");}else{alert(\"Something is wrong! :(\");}} );' id='f1' src='http://db.tt/vKoWmJps'></td><td><img style=\"cursor:pointer\" onclick='$.post(\"http://suna.e-sim.org/motivateCitizen.html?id="+ids[0]+"\", { type: 3, id: "+ids[0]+" },function(data) {var patt=/Motivation package sent/g;var result=patt.test(data);if(result){alert(\"OK! You got +1 food limit.\");}else{alert(\"Something is wrong! :(\");}} );' id='g1' src='http://db.tt/JS3wRGnQ'></td></tr><tr><td><a href=\"profile.html?id="+ids[1]+"\">"+names2+"</a></td><td><img style=\"cursor:pointer\" onclick='$.post(\"http://suna.e-sim.org/motivateCitizen.html?id="+ids[1]+"\", { type: 1, id: "+ids[1]+" },function(data) {var patt=/Motivation package sent/g;var result=patt.test(data);if(result){alert(\"OK! You got +1 food limit.\");}else{alert(\"Something is wrong! :(\");}} );' id='w2' src='http://db.tt/jSRlurQw'></td><td><img style=\"cursor:pointer\" onclick='$.post(\"http://primera.e-sim.org/motivateCitizen.html?id="+ids[1]+"\", { type: 2, id: "+ids[1]+" },function(data) {var patt=/Motivation package sent/g;var result=patt.test(data);if(result){alert(\"OK! You got +1 food limit.\");}else{alert(\"Something is wrong! :(\");}} );' id='f2' src='http://db.tt/vKoWmJps'></td><td><img style=\"cursor:pointer\" onclick='$.post(\"http://suna.e-sim.org/motivateCitizen.html?id="+ids[1]+"\", { type: 3, id: "+ids[1]+" },function(data) {var patt=/Motivation package sent/g;var result=patt.test(data);if(result){alert(\"OK! You got +1 food limit.\");}else{alert(\"Something is wrong! :(\");}} );' id='g2' src='http://db.tt/JS3wRGnQ'></td></tr><tr><td><a href=\"profile.html?id="+ids[2]+"\">"+names3+"</a></td><td><img style=\"cursor:pointer\" onclick='$.post(\"http://suna.e-sim.org/motivateCitizen.html?id="+ids[2]+"\", { type: 1, id: "+ids[2]+" },function(data) {var patt=/Motivation package sent/g;var result=patt.test(data);if(result){alert(\"OK! You got +1 food limit.\");}else{alert(\"Something is wrong! :(\");}} );' id='w3' src='http://db.tt/jSRlurQw'></td><td><img style=\"cursor:pointer\" onclick='$.post(\"http://suna.e-sim.org/motivateCitizen.html?id="+ids[2]+"\", { type: 2, id: "+ids[2]+" },function(data) {var patt=/Motivation package sent/g;var result=patt.test(data);if(result){alert(\"OK! You got +1 food limit.\");}else{alert(\"Something is wrong! :(\");}} );' id='f3' src='http://db.tt/vKoWmJps'></td><td><img style=\"cursor:pointer\" onclick='$.post(\"http://suna.e-sim.org/motivateCitizen.html?id="+ids[2]+"\", { type: 3, id: "+ids[2]+" },function(data) {var patt=/Motivation package sent/g;var result=patt.test(data);if(result){alert(\"OK! You got +1 food limit.\");}else{alert(\"Something is wrong! :(\");}} );' id='g3' src='http://db.tt/JS3wRGnQ'></td></tr><tr><td><a href=\"profile.html?id="+ids[3]+"\">"+names4+"</a></td><td><img style=\"cursor:pointer\" onclick='$.post(\"http://suna.e-sim.org/motivateCitizen.html?id="+ids[3]+"\", { type: 1, id: "+ids[3]+" },function(data) {var patt=/Motivation package sent/g;var result=patt.test(data);if(result){alert(\"OK! You got +1 food limit.\");}else{alert(\"Something is wrong! :(\");}} );' id='w4' src='http://db.tt/jSRlurQw'></td><td><img style=\"cursor:pointer\" onclick='$.post(\"http://suna.e-sim.org/motivateCitizen.html?id="+ids[3]+"\", { type: 2, id: "+ids[3]+" },function(data) {var patt=/Motivation package sent/g;var result=patt.test(data);if(result){alert(\"OK! You got +1 food limit.\");}else{alert(\"Something is wrong! :(\");}} );' id='f4' src='http://db.tt/vKoWmJps'></td><td><img style=\"cursor:pointer\" onclick='$.post(\"http://suna.e-sim.org/motivateCitizen.html?id="+ids[3]+"\", { type: 3, id: "+ids[3]+" },function(data) {var patt=/Motivation package sent/g;var result=patt.test(data);if(result){alert(\"OK! You got +1 food limit.\");}else{alert(\"Something is wrong! :(\");}} );' id='g4' src='http://db.tt/JS3wRGnQ'></td></tr><tr><td><a href=\"profile.html?id="+ids[4]+"\">"+names5+"</a></td><td><img style=\"cursor:pointer\" onclick='$.post(\"http://suna.e-sim.org/motivateCitizen.html?id="+ids[4]+"\", { type: 1, id: "+ids[4]+" },function(data) {var patt=/Motivation package sent/g;var result=patt.test(data);if(result){alert(\"OK! You got +1 food limit.\");}else{alert(\"Something is wrong! :(\");}} );' id='w5' src='http://db.tt/jSRlurQw'></td><td><img style=\"cursor:pointer\" onclick='$.post(\"http://suna.e-sim.org/motivateCitizen.html?id="+ids[4]+"\", { type: 2, id: "+ids[4]+" },function(data) {var patt=/Motivation package sent/g;var result=patt.test(data);if(result){alert(\"OK! You got +1 food limit.\");}else{alert(\"Something is wrong! :(\");}} );' id='f5' src='http://db.tt/vKoWmJps'></td><td><img style=\"cursor:pointer\" onclick='$.post(\"http://suna.e-sim.org/motivateCitizen.html?id="+ids[4]+"\", { type: 3, id: "+ids[4]+" },function(data) {var patt=/Motivation package sent/g;var result=patt.test(data);if(result){alert(\"OK! You got +1 food limit.\");}else{alert(\"Something is wrong! :(\");}} );' id='g5' src='http://db.tt/JS3wRGnQ'></td></tr></tbody></table><div><a href=\"http://suna.e-sim.org/newCitizens.html?countryId=0\">More newbies</a></div>"
				
			}
        }
        xmlhttp.open("GET","http://suna.e-sim.org/newCitizens.html?countryId=0",true);
        xmlhttp.send();
    }

$(document).ready(function() {

	var id=getId();
	loadXMLDoc();

});