// ==UserScript==
// @name           Canales7
// @namespace      Cans7
// @include        http://www.entutele.com/programacion/favoritos/*
// @include        http://www.entutele.com/programacion/todos/*
// ==/UserScript==


alert("INICIO7");

var alltags=document.getElementsByTagName("*"); 
for (i=0; i<alltags.length; i++) { 
 //Pick out the tags with our class name 
   if (alltags[i].className=="chsprmedium canalimg") { 
      var temp1=alltags[i].parentNode;
      var temp2=temp1.innerHTML;
      var temp3=temp2.split("/span>")[1].split("<span")[0];
      var temp3=temp3.substring(1);
      var canal="";
      if (temp3=="A&amp;E ") canal="115";
      else if (temp3=="AXN ") canal="108";
      else if (temp3=="Boomerang ") canal="152";
      else if (temp3=="Canal 5 ") canal="205";
      else if (temp3=="Canal 52MX ") canal="215";
      else if (temp3=="Casa Club ") canal="124";
      else if (temp3=="Cine Latino ") canal="426";
      else if (temp3=="Cinecanal (W) ") canal="431";
      else if (temp3=="Cinemax (O) ") canal="NE";
      else if (temp3=="Cinemax (W) ") canal="NE";
      else if (temp3=="Comedy Central ") canal="119";
      else if (temp3=="De Película ") canal="418";
      else if (temp3=="Discovery Kids ") canal="158";
      else if (temp3=="Disney Channel ") canal="160";
      else if (temp3=="Disney Jr ") canal="151";
      else if (temp3=="Disney XD ") canal="154";
      else if (temp3=="Eurochannel ") canal="422";
      else if (temp3=="Europa Europa ") canal="425";
      else if (temp3=="Fox ") canal="102";
      else if (temp3=="FX ") canal="104";
      else if (temp3=="Galavisión ") canal="209";
      else if (temp3=="Golden ") canal="412";
      else if (temp3=="Golden Edge ") canal="414";
      else if (temp3=="HBO 2 ") canal="442";
      else if (temp3=="HBO Family (E) ") canal="450";
      else if (temp3=="HBO Plus (E) ") canal="446";
      else if (temp3=="HBO Plus (W) ") canal="444";
      else if (temp3=="HBO Signature ") canal="448";
      else if (temp3=="HBO (W) ") canal="440";
      else if (temp3=="I.Sat ") canal="129";
      else if (temp3=="LIV ") canal="113";
      else if (temp3=="MAX ") canal="452";
      else if (temp3=="Max HD ") canal="454";
      else if (temp3=="Max Prime (E) ") canal="458";
      else if (temp3=="Max Prime (W) ") canal="456";
      else if (temp3=="MGM ") canal="406 y 407";
      else if (temp3=="Moviecity Action (E) ") canal="474";
      else if (temp3=="Moviecity Action (W) ") canal="476";
      else if (temp3=="Moviecity Classics ") canal="486";
      else if (temp3=="Moviecity Family (E) ") canal="478";
      else if (temp3=="Moviecity Family (W) ") canal="480";
      else if (temp3=="Moviecity Hollywood ") canal="482";
      else if (temp3=="Moviecity Premieres (E) ") canal="470";
      else if (temp3=="Moviecity Premieres (W) ") canal="472";
      else if (temp3=="Multicinema ") canal="428";
      else if (temp3=="Multipremier ") canal="430";
      else if (temp3=="Pánico ") canal="403 y 404";
      else if (temp3=="Reality TV ") canal="131";
      else if (temp3=="Sony ") canal="110";
      else if (temp3=="Sony Spin ") canal="128";
      else if (temp3=="Space ") canal="130";
      else if (temp3=="Studio Universal ") canal="408";
      else if (temp3=="SyFy ") canal="114";
      else if (temp3=="TCM ") canal="424";
      else if (temp3=="Telemundo ") canal="136";
      else if (temp3=="The Film Zone (W) ") canal="421";
      else if (temp3=="TNT ") canal="410";
      else if (temp3=="TruTV ") canal="133";
      else if (temp3=="TVC Cine Mexicano ") canal="419 y 420";
      else if (temp3=="TVC Platino ") canal="401 y 402";
      else if (temp3=="Unicable ") canal="118";
      else if (temp3=="Universal Channel ") canal="106";
      else if (temp3=="Utilisima ") canal="105";
      else if (temp3=="VH1 ") canal="612";
      else if (temp3=="Warner Channel ") canal="112";


      if (canal != ""){
       temp2 = '<span class="numcanal" style="font-size:125%;font-weight:bold;">MEGA: '+canal+'</span>';
       alltags[i].parentNode.innerHTML=alltags[i].parentNode.innerHTML + temp2;
      }
   }
}