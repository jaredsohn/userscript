// Ortalama Hesaplayıcı
// 12.02.2009
// Copyleft Onur Ulusu, Beytun Özkan
//  görüş ve öneri: onurulusu@gmail.com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ChangeLog
// version 1.2
// 1.2   12.02.2009
// tekrar edilen derslerle ilgili problem düzeltildi..
// TODO benim türk dili patlak..
// 1.1    31.01.2009
// ortalama gösteren kısım adama döndürüldü, kırmızıyla gösterilip kullanıcının gözüne sokuldu.. 
// TODO: hala ff ya da fd dersi olmayan, ya da olup da tekrarında verebilen başarılı çalışkan öğrencilerde doğru çalışıyor..
// 1.0    28.01.2009
// şimdilik hiç dersi kalmayanlarda doğru çalışıyor..
// --------------------------------------------------------------------
// ==UserScript==
// @name			ortalama hesaplayıcı
// @description		  std.ege.edu.tr'de olmayan ortalama fasilitesini ekler
// @author		    	Onur Ulusu, Beytun Özkan
// @version		    1.2
// @include 		    http://std.ege.edu.tr/*

// ==/UserScript==

var dersNoList = new Array();
var sayiNotList = new Array();
var krediList = new Array();
var ortalama;

function parseHarfNotToSayi(not, i)
{
	if(not == "AA")
		sayiNotList[i] = parseFloat(4);
	else if(not == "BA")
		sayiNotList[i] = parseFloat(3.5);
	else if(not == "BB")
		sayiNotList[i] = parseFloat(3);
	else if(not == "CB")
		sayiNotList[i] = parseFloat(2.5);
	else if(not == "CC")
		sayiNotList[i] = parseFloat(2);
	else if(not == "DC")
		sayiNotList[i] = parseFloat(1.5);
	else if(not == "DD")
		sayiNotList[i] = parseFloat(1);
	else if(not == "FD")
		sayiNotList[i] = parseFloat(0.5);
	else if(not == "FF")
		sayiNotList[i] = parseFloat(0);
}

function kredileriSayiyaCevir(kredi, i)
{
	var krediParts = kredi.split(",");
	krediList[i] = parseFloat(krediParts[0] + "." + krediParts[1]);
}

window.addEventListener(
	'load',
	function() {
		var dersSayisi = 0;
		var toplam = 0;
		var krediSayisi = 0;
		var tekrar = false;
		var j=0;
		var x=document.getElementById('ctl00_MainContent_ctl01_grd_ders')
		for (i = 1; i < x.rows.length; i++){
			tekrar = false;
			j = 0;
			for (j = 0; j < dersSayisi; j++){
				if(dersNoList[j] == x.rows[i].cells[0].innerHTML){
					tekrar = true;
					break;
				}
			}
			if (tekrar == false && x.rows[i].cells[2].innerHTML != "  "){
				dersNoList[dersSayisi] = x.rows[i].cells[0].innerHTML;
				parseHarfNotToSayi(x.rows[i].cells[2].innerHTML , (dersSayisi));
				kredileriSayiyaCevir(x.rows[i].cells[8].innerHTML,(dersSayisi));
				toplam = toplam + (sayiNotList[dersSayisi] * krediList[dersSayisi]);
				krediSayisi = krediSayisi + krediList[dersSayisi];
				dersSayisi = dersSayisi + 1;
				
			} else if(x.rows[i].cells[2].innerHTML != "  "){
				toplam = toplam - (sayiNotList[j] * krediList[j]);
				parseHarfNotToSayi(x.rows[i].cells[2].innerHTML , (j));
				kredileriSayiyaCevir(x.rows[i].cells[8].innerHTML,(j));
				toplam = toplam + (sayiNotList[j] * krediList[j]);
			}
		}
		ortalama = toplam/krediSayisi;
		//alert(ortalama);
		
		ekle();
	}, false);

function ekle()
{

table = document.getElementById('ctl00_MainContent_ctl00_dv_ogrbilgileri2');

if (table) {		
		var tr=document.createElement('tr');  	
		
		var td=document.createElement('td');
		td.setAttribute("style", "background-color:#ff0000;color:White;width:150px;");
		var tdText=document.createTextNode('Ortalama:');  
		td.appendChild(tdText);  		
		
		var td2=document.createElement('td');
		td2.setAttribute("style", "color:#000000;background-color: rgb(238, 238, 238);font-family:tahoma,verdana,helvetica;font-size:11px;");
		var tdText2=document.createTextNode(ortalama); 
		td2.appendChild(tdText2);  
		
		tr.appendChild(td); 						
		tr.appendChild(td2); 						
		table.appendChild(tr); 					
		}
}