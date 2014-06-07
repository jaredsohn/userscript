// ==UserScript==
// @name			Vojska eSrbije
// @author                      SerbianWolf
// @namespace		        http://www.ejahan.com/profile-14255.html
// @description		        Obavestenja i naredjenja za regrutnu vojsku eSrbije
// @version			1.0
// @include			http://ejahan.com/index.html
// ==/UserScript==


GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://2ejahan.t35.com/naredjenja.html',
	onload:function(response){

		var order_string = response.responseText.match('class="naredjenje".*?#');
		order_string = order_string.join("");   //Array->string
		order_string = order_string.substring(order_string.indexOf('>')+1,order_string.length-1)

		var tags = order_string.split('|');
		var naslov = tags[0];
		var tekst = tags[1];
		var nazivNecega = tags[2];
		var linkDoNecega = tags[3];
		var vreme = tags[4];

		params1 = document.createElement("div");
		params1.textContent = naslov;
		params1.setAttribute("style","padding:5px 0 5px 0; font-family:Tahoma; font-size:16px; color:steelblue; font-weight:bold");

		params2 = document.createElement("h2");
		params2.textContent = tekst;
                params2.setAttribute("style","padding:5px 0 5px 0; font-family:Tahoma; font-size:12px; color:black; font-weight:bold");

		
		if(nazivNecega.length > 1 && linkDoNecega.length < 3)
		{					
			params3 = document.createElement("h2");
			params3.textContent = nazivNecega;
		}

		if(nazivNecega.length > 1 && linkDoNecega.length > 2)
		{		
			params3 = document.createElement("a"); 
			params3.setAttribute('href',linkDoNecega);
			params3.setAttribute('target',"_blank");
			params3.innerHTML = nazivNecega
		}
		
		params4 = document.createElement("p");
		params4.textContent = 'Objavljeno : '+vreme;

		slika = document.createElement("img"); 
		slika.setAttribute('src',"http://i45.tinypic.com/2h6r76v.jpg");
		slika.setAttribute('alt',"Vojska eSrbije");
		slika.setAttribute('title',"Skripta Vojske eSrbije - by SerbianWolf :)");
		
		br1 = document.createElement("br");
		br2 = document.createElement("br");
		br3 = document.createElement("br");
		br4 = document.createElement("br");
		hr1 = document.createElement("hr");
		
		span1 = document.createElement("span");
		span1.innerHTML = " | ";
		
		span2 = document.createElement("span");
		span2.innerHTML = " | ";

		span3 = document.createElement("span");
		span3.innerHTML = " | ";



		chat = document.createElement("a"); 
		chat.setAttribute('href',"http://wbe01.mibbit.com/?settings=e0bf7bb0d20c741731d4208e5662a0ec&channel=%23ejahan_srb");
		chat.setAttribute('target',"_blank");
		chat.setAttribute('title',"Zvanican Chat kanal vojske eSrbije");
		chat.innerHTML = "Chat";

		izvestaj = document.createElement("a"); 
		izvestaj.setAttribute('href',"http://spreadsheets.google.com/viewform?formkey=dDdRcUUzcEN3X0pSa0RJMzMya1dLNFE6MA");
		izvestaj.setAttribute('target',"_blank");
		izvestaj.setAttribute('title',"Izvestaj regrutne vojske!");
		izvestaj.innerHTML = "Izvestaj";

		novine = document.createElement("a"); 
		novine.setAttribute('href',"http://www.ejahan.com/newspaper-723.html");
		novine.setAttribute('target',"_blank");
		novine.setAttribute('title',"Zvanicne novine vojske eSrbije");
		novine.innerHTML = "Novine";


		org = document.createElement("a"); 
		org.setAttribute('href',"http://www.ejahan.com/profile-5500.html");
		org.setAttribute('target',"_blank");
		org.setAttribute('title',"Organizacija vojske eSrbije");
		org.innerHTML = "Org";


		/*---------------------------------*/

		latest=document.getElementById('lastNews');

		if(order_string.length) {

			latest.parentNode.insertBefore(slika, latest);

			latest.parentNode.insertBefore(br1, latest);
			
			latest.parentNode.insertBefore(chat, latest);
			latest.parentNode.insertBefore(span1, latest);
			latest.parentNode.insertBefore(izvestaj, latest);
			latest.parentNode.insertBefore(span2, latest);
			latest.parentNode.insertBefore(novine, latest);
			latest.parentNode.insertBefore(span3, latest);
			latest.parentNode.insertBefore(org, latest);

			latest.parentNode.insertBefore(br3, latest);
			latest.parentNode.insertBefore(params1, latest);
			latest.parentNode.insertBefore(params2, latest);
			if(nazivNecega.length > 1)
				latest.parentNode.insertBefore(params3, latest);
			if(vreme.length > 1)
				latest.parentNode.insertBefore(params4, latest);

			latest.parentNode.insertBefore(br4, latest);
			latest.parentNode.insertBefore(hr1, latest);
		}
	}	
});