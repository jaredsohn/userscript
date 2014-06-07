// ==UserScript==
// @name        Blacklist
// @namespace   Blacklist
// @description Blacklist
// @include     http://192.168.1.1/*
// @version     1
// @grant       none
// ==/UserScript==

var t_fixe = new Array("2C", "B0", "5D", "58", "A4", "00", "Fixe Thomas");
var bureau = new Array("08", "11", "96", "66", "11", "88", "Pc bureau");
var l_tab = new Array("DC", "85", "DE", "1D", "2F", "90", "Liloo tab");
var t_iphone = new Array("18", "9E", "FC", "9B", "C4", "7C", "iPhone Thomas");
var t_portable = new Array("60", "67", "20", "07", "0B", "7C", "Pc Port. Thomas");
var m_fixe = new Array ("00", "13", "F7", "AA", "0C", "22", "Pc Marion");
var m_tel = new Array("00", "0C", "E7", "01", "A7", "46", "Portable Marion");
var md_portable = new Array("0C", "84", "DC", "3B", "BB", "02", "Pc Port. Maxime");
var c_portable = new Array("00", "08", "CA", "CF", "70", "3F", "Pc Célia");

mac_list = new Array(t_fixe, bureau, l_tab, t_iphone, t_portable, m_fixe, m_tel, md_portable, c_portable);


function trim (myString)
{
return myString.replace(/^\s+/g,'').replace(/\s+$/g,'')
}

function check_matching(pag, mac, divs) {
    var str = mac[0];
    for (k = 1; k < 6; k++) {
        str += ":"+mac[k]
    }
    if (str == pag) {
        divs.innerHTML += " => "+mac[6];
        return (1);
    } else {
        return (0);
    }
}

window.add_mac = function (list) {
    if (list == null)
        return (0);
//    alert(list.toString);
    list = list.toString().split(',');
	for (i = 0; i < 6; i++) {
		divs = document.getElementById("mac_address_p"+i);
		divs.value = list[i];
	}
	//document.getElementById('form_mac_addresses_list').name = 'form_mac_addresses_list';
	//document.form_mac_addresses_list.submit();
}

function parse_page() {
    document.getElementById('form_mac_filtering_activation').parentNode.onclick = function () {alert('Attention le changement de ce paramètre peut entrainer la coupure de l\'accès au wifi.\nMerci de prévenir les gens susceptibles de ne pas être content avant de valider.\nMerci')};
    //document.getElementById('mac_filtering_off').disabled = true;
    //document.getElementById('mac_filtering_whitelist').disabled = true;
    //document.getElementById('mac_filtering_activation').title = "Désactivé, pour le réactiver faut contacter grand Jean-Bab";
    divs = document.getElementById('mac_address_list').childNodes[3].childNodes;
    for (i = 1; i < divs.length - 2; i+=2) {
        var mac = trim(divs[i].childNodes[3].innerHTML);
        //alert("New mac ("+i+") : "+mac);
        bl = 0;
        for (j = 0; j < mac_list.length; j++) {
            if (check_matching(mac, mac_list[j], divs[i].childNodes[3]))
                bl = 1;
        }
        if (bl == 0)
            divs[i].childNodes[3].innerHTML += " => Inconnu";
    }
    tab = document.getElementById('title_maclist');
    new_div = "<h1>Raccourcis adresse MAC</h1><div class='content'><table id='short_mac'><thead><tr><th>#</th><th>Raccourcis adresse MAC</th><th></th></tr></thead>";
    for (w = 0; w < mac_list.length; w++) {
        new_div += "<tr><td>"+(1+w)+"</td><td>"+mac_list[w][0];
        for (k = 0; k < 6; k++) {
            new_div += ":"+mac_list[w][k];
        }
        new_div += " => "+mac_list[w][6]+"</td><td><button class='button_add' onclick='add_mac(\""+mac_list[w]+"\")'></td></tr>";
    }
    new_div += "</table></div><h1>Adresses MAC autorisées</h1>";
    //alert(new_div);
    tab.innerHTML = new_div;
}
add_mac(null);
parse_page();
//document.onload = setTimeout(parse_page, 1000);