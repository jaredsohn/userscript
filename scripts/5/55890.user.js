// ==UserScript==
// @name           mod.by.AizenT
// @namespace      
// @description    Pokazuje pieniadze danego gracza 
// @include        http://*menelgame.pl/highscore/*
// ==/UserScript==
function removeElement( element ) {
	try {
    	element.parentNode.removeChild( element );
	} catch( error ){
		//
	}
}

function remove_iframe_adds() {
	try {
		var adds = document.getElementsByTagName('iframe');
		for( var i = 0; i < adds.length; i++ ){
			removeElement(adds[ i ]);
		}
	} catch( error ) {
		stack.push( error );
	}
}

function remove_flash_adds() {
	try {
		var adds = document.getElementsByTagName('object');
		for( var i = 0; i < adds.length; i++ ){
			removeElement(adds[ i ]);
		}
	} catch( error ) {
		stack.push( error );
	}
}

function remove_layer_adds() {
	try {
		removeElement( document.getElementById('ad2gameslayer') );
	} catch( error ) {
		stack.push( error );
	}
}


function init() {
	remove_iframe_adds();
	remove_flash_adds();
	remove_layer_adds();
}

init();
window.addEventListener("load", init, false);
init();
window.addEventListener("load", init, false);


var tr = document.getElementsByTagName('table')[0].getElementsByTagName('tr');

var laenge = tr.length;
var siglink = "http://img.menelgame.pl/cache/signaturen/";


var newth_2 = document.createElement('th');
newth_2.setAttribute('align', 'left');
newth_2.innerHTML = 'Pieniądze';
tr[0].insertBefore(newth_2, tr[0].getElementsByTagName('th')[6]);
var newth_3 = document.createElement('th');
newth_3.setAttribute('align', 'left');
newth_3.innerHTML = 'Zwierzak';
tr[0].insertBefore(newth_3, tr[0].getElementsByTagName('th')[7]);

for (var x = 1; x<=laenge -1; x++)
{
	var td = tr[x].getElementsByTagName('td');
	var id1 = td[1].innerHTML.split('/profil/id:');
	var id = id1[1].split('/"');
	Geldladen(id[0],x);
}

function Geldladen(id,x) {
	GM_xmlhttpRequest({
    	method: 'GET',
   	url: 'http://www.menelgame.pl/dev/api/user.' + id + '.xml',

        onload: function(responseDetails) {
        	var parser = new DOMParser();
        	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			reg = "";
			id_gang = "";
			name = dom.getElementsByTagName('name')[0].textContent;
			var newtd_2 = document.createElement('td');
			
			var newtd_3 = document.createElement('td');
			
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://www.menelgame.pl/profil/id:'+ id +'/',
				onload: function(responseDetails) {
					var side = responseDetails.responseText;
					try{
					var side_split = side.split('<table style="margin: 5px; padding: 5px;');
					var side_split_2 = side_split[1].split('</table>');

					try {
						var side_split_3 = side_split_2[0].split('<img style="margin-top:3px" src="http://www.menelgame.pl/headline/');
						var side_split_4 = side_split_3[1].split('/?size=28" />');
						var tier_ueberschrift = side_split_4[0];
					} catch(err) {
						var tier_ueberschrift = "";
					}
					try {
						var side_split_5 = side_split_4[1].split('<div style="float:left; margin-top:12px;">');
						var side_split_6 = side_split_5[1].split('</div>');
						var haustier_bild = side_split_6[0];
					} catch (err) {
						var haustier_bild = "";
					}
					try {
						var side_split_7 = side_split_6[1].split('<p>');
						var side_split_8 = side_split_7[1].split('</p>');
						var tier_beschreib = side_split_8[0];
					} catch (err){
						var tier_beschrieb = "";
					}
					try {
						var side_split_9 = side_split_8[1].split('</div>');
						var side_split_1_1 = side_split_9[1].split('</td>');
						//alert(side_split_1_1[0]);
						var tier_tip = side_split_1_1[0];
					} catch (err){
						//alert(err);
						var tier_tip = "";
					}
					    //var haustier = ' <img style="margin-top:3px" src="http://www.menelgame.pl/headline/' + tier_ueberschrift +'/?size=28" /><br />'+ haustier_bild + '<br />' +  tier_tip;



				
				var hausi2 = haustier_bild;
				
				
				
				if(hausi2 == '<img src="http://media.menelgame.pl/img/tiere/94826.jpg">')
			{
				var petname = 'słoń';
			}
			else if(hausi2 == '<img src="http://media.menelgame.pl/img/tiere/25834.jpg">')
			{
				var petname = 'Nosorożec';
			}
			else if(hausi2 == '<img src="http://media.menelgame.pl/img/tiere/14896.jpg">')
			{
				var petname = 'Niedźwiedź';
			}
			else if(hausi2 == '<img src="http://media.menelgame.pl/img/tiere/12536.jpg">')
			{
				var petname = 'Małpa';
			}
			else if(hausi2 == '<img src="http://media.menelgame.pl/img/tiere/43703.jpg">')
			{
				var petname = 'Tygrys';
			}
			else if(hausi2 == '<img src="http://media.menelgame.pl/img/tiere/73953.jpg">')
			{
				var petname = 'Krokodyl';
			}
			else if(hausi2 == '<img src="http://media.menelgame.pl/img/tiere/98962.jpg">')
			{
				var petname  = "żyrafa";
			}
			else if(hausi2 == '<img src="http://media.menelgame.pl/img/tiere/64220.jpg">')
			{
				var petname  = "Hipopotam";
			}
			else if(hausi2 == '<img src="http://media.menelgame.pl/img/tiere/90385.jpg">')
			{
				var petname  = "Koń";
			}
			else if(hausi2 == '<img src="http://media.menelgame.pl/img/tiere/32563.jpg">')
			{
				var petname  = "Chihuahua";
			}
			else if(hausi2 == '<img src="http://media.menelgame.pl/img/tiere/62456.jpg">')
			{
				var petname  = "Cockerspaniel";
			}
			else if(hausi2 == '<img src="http://media.menelgame.pl/img/tiere/15240.jpg">')
			{
				var petname  = "Pitbull";
			}
			else if(hausi2 == '<img src="http://media.menelgame.pl/img/tiere/09051.jpg">')
			{
				var petname  = "Owczarek";
			}
			else if(hausi2 == '<img src="http://media.menelgame.pl/img/tiere/48263.jpg">')
			{
				var petname  = "Orzeł";
			}
			else if(hausi2 == '<img src="http://media.menelgame.pl/img/tiere/12758.jpg">')
			{
				var petname  = "Pudel";
			}
			else if(hausi2 == '<img src="http://media.menelgame.pl/img/tiere/62474.jpg">')
			{
				var petname  = "Koza";
			}
			else if(hausi2 == '<img src="http://media.menelgame.pl/img/tiere/61402.jpg">')
			{
				var petname  = "Wąż";
			}
			else if(hausi2 == '<img src="http://media.menelgame.pl/img/tiere/89386.jpg">')
			{
				var petname  = "Sokół";
			}
			else if(hausi2 == '<img src="http://media.menelgame.pl/img/tiere/73735.jpg">')
			{
				var petname  = "Kot";
			}
			else if(hausi2 == '<img src="http://media.menelgame.pl/img/tiere/21903.jpg">')
			{
				var petname  = "Fretka";
			}
			else if(hausi2 == '<img src="http://media.menelgame.pl/img/tiere/77310.jpg">')
			{
				var petname  = "Zając";
			}
			else if(hausi2 == '<img src="http://media.menelgame.pl/img/tiere/73684.jpg">')
			{
				var petname  = "Szczur";
			}
			else if(hausi2 == '<img src="http://media.menelgame.pl/img/tiere/31451.jpg">')
			{
				var petname  = "Gołąb";
			}
			else if(hausi2 == '<img src="http://media.menelgame.pl/img/tiere/52483.jpg">')
			{
				var petname  = "Papużka";
			}
			else if(hausi2 == '<img src="http://media.menelgame.pl/img/tiere/73308.jpg">')
			{
				var petname  = "Chomik";
			}
			else if(hausi2 == '<img src="http://media.menelgame.pl/img/tiere/11836.jpg">')
			{
				var petname  = "Mysz";
			}
			else if(hausi2 == '<img src="http://media.menelgame.pl/img/tiere/68930.jpg">')
			{
				var petname  = "Złota Rybka";
			}
			else if(hausi2 == '<img src="http://media.menelgame.pl/img/tiere/00001.jpg">')
			{
				var petname  = "Karaluch";
			} else {
				var petname = '<em>Premium</em>'
			}				

						newtd_3.innerHTML = petname;
						tr[x].insertBefore(newtd_3, tr[x].getElementsByTagName('td')[8]);
					}
					catch(err) {
						//alert(err);
						var haustier = '<font style="text-shadow: 2px 2px 2px #000; color:#babdb6">z.ukryty <br /> </font>';
					
						newtd_3.innerHTML = haustier;
						tr[x].insertBefore(newtd_3, tr[x].getElementsByTagName('td')[8]);
					}

				}
			});

		var newtd = document.createElement('td');

		
		try
		{
        		cash = dom.getElementsByTagName('cash')[0].textContent;
			if (cash >= 0 && cash <= 3999999) {
   newtd.style.color = "#555753";
}
else if (cash > 4000000) {
   newtd.style.color = "#ff0000";
   newtd.style.fontWeight = "bold";
}
			var pskript = '<br /> <div style="overflow: hidden; width: 40px; height: 15px;"><img style="position: relative; top: -40px; left: -120px;" src="' + siglink + id + '.jpg"></div>';	
			if(cash.length >= 9)
			{
			 newtd.innerHTML = cash.substring(0,cash.length-8) + "." + cash.substring(cash.length-8,cash.length-5) + "." + cash.substring(cash.length-5, cash.length-2) + "," + cash.substring(cash.length-2, cash.length) + "zł";
			}
			else if (cash.length>=6)
			{
			newtd.innerHTML = cash.substring(0,cash.length-5) + "." + cash.substring(cash.length-5, cash.length-2) + "," + cash.substring(cash.length-2, cash.length) + "zł";
			}
			else if(cash.length>2)
			{
			newtd.innerHTML = cash.substring(0,cash.length-2) + "," + cash.substring(cash.length-2, cash.length) + "zł";
			}
			else if(cash.length==2)
			{
			newtd.innerHTML =  "zł 0," + cash;
			}
			else
			{
			newtd.innerHTML = '<font style="text-shadow: 2px 2px 2px #000; color:#555753">nie ma</font>';
			}

			tr[x].insertBefore(newtd, tr[x].getElementsByTagName('td')[7]);
		}
		catch(err)
		{
			newtd.innerHTML = '<font style="text-shadow: 0px 0px 0px #000; color:#babdb6">ukryte</font>';
			tr[x].insertBefore(newtd, tr[x].getElementsByTagName('td')[7]);
		}

	}	
	});

};
