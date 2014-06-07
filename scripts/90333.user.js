
// ==UserScript==
// @name           Auto voto
// @namespace      none
// @include        http://www.sondaggi.rai.it/index.php*
// ==/UserScript==

var ripetizioni = 0;
var conn_compl = 0;
var sessID_update = 100;


function GetSessId(){
GM_xmlhttpRequest({ 
  method: "POST",
  url: "http://temi.repubblica.it/ilcentro-sondaggio/?pollId=2272",
onload: function(response){

j=response.responseHeaders;
var x = j.indexOf('Set-Cookie: ');
var y = j.indexOf(";", x);    
m = j.slice(x + 12, y);

StartVote(m)

}
});

}





function StartVote(sess_id){
data=sess_id+"&fieldnames=19313X174X173&19313X174X173=2&java19313X174X173=2&display19313X174X173=&move=movesubmit&move2.x=48&move2.y=13&mandatory=19313X174X173&mandatoryfn=19313X174X173&thisstep=1&sid=19313&token=";


        xml = new XMLHttpRequest();
        xml.open("POST", "http://temi.repubblica.it/ilcentro-sondaggio/?pollId=2272&cmd=risultato&votato=false", false);
        xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xml.setRequestHeader("Pragma", "no-cache");
        xml.setRequestHeader("Cache", "no-cache");
	xml.send(data);
xml.abort;
conn_compl+=1;
p=(conn_compl/ripetizioni)*100;
document.getElementById("counter").innerHTML = conn_compl + " voti completati (" + Math.floor(p) + "%)";
if(conn_compl==ripetizioni){document.body.innerHTML += "<br>FINITO. Aggiornare la pagina per ripetere l'operazione";return;}
else{GetSessId();}

}



ripetizioni = prompt("Numero di ripetizioni", "100");

if(!ripetizioni==0){
document.body.innerHTML += "SONDAGGIO PER LA FILOVIA<br>";
document.body.innerHTML += "Questo programma vota automaticamente SI a questo vergognoso sondaggio. VIVA FILO'!<br><br>";
document.body.innerHTML += "<div id=\"counter\">0</div>";
GetSessId();
}