// ==UserScript==
// @name         Ds7.0 Berichteformatierer
// @namespace     userscripts.org/users/caeser99
// @description   Formatiert Kampfberichte für das interne Forum
// @include      http://*.die-staemme.de/game.php?village=*&screen=report&mode=all&view*


// ==/UserScript==


//Allgemein
betreff = document.getElementById("labelText").firstChild.nodeValue;
datum = document.getElementsByTagName("td")[68].innerHTML;
gewinner = document.getElementsByTagName("h3")[0].innerHTML;
glueck_anfang = document.getElementById("attack_luck").getElementsByTagName("td")[0].innerHTML;
glueck = glueck_anfang.substring(3,glueck_anfang.length-4);
moral = document.getElementsByTagName("h4")[1].innerHTML;

//Angreifer
angreifer = document.getElementById("attack_info_att").getElementsByTagName("a")[0].innerHTML;
herkunft = document.getElementById("attack_info_att").getElementsByTagName("a")[1].innerHTML;
angreifertruppen_speer = document.getElementById("attack_info_att_units").getElementsByTagName("td")[14].innerHTML;
angreifertruppen_schwert = document.getElementById("attack_info_att_units").getElementsByTagName("td")[15].innerHTML;
angreifertruppen_axt = document.getElementById("attack_info_att_units").getElementsByTagName("td")[16].innerHTML;
angreifertruppen_bogen = document.getElementById("attack_info_att_units").getElementsByTagName("td")[17].innerHTML;
angreifertruppen_spaeher = document.getElementById("attack_info_att_units").getElementsByTagName("td")[18].innerHTML;
angreifertruppen_lkav = document.getElementById("attack_info_att_units").getElementsByTagName("td")[19].innerHTML;
angreifertruppen_ber_bogen = document.getElementById("attack_info_att_units").getElementsByTagName("td")[20].innerHTML;
angreifertruppen_skav = document.getElementById("attack_info_att_units").getElementsByTagName("td")[21].innerHTML;
angreifertruppen_ramme = document.getElementById("attack_info_att_units").getElementsByTagName("td")[22].innerHTML;
angreifertruppen_kata = document.getElementById("attack_info_att_units").getElementsByTagName("td")[23].innerHTML;
angreifertruppen_paladin = document.getElementById("attack_info_att_units").getElementsByTagName("td")[24].innerHTML;
angreifertruppen_ag = document.getElementById("attack_info_att_units").getElementsByTagName("td")[25].innerHTML;


angreifertruppen_speer_verluste = document.getElementById("attack_info_att_units").getElementsByTagName("td")[27].innerHTML;
angreifertruppen_schwert_verluste = document.getElementById("attack_info_att_units").getElementsByTagName("td")[28].innerHTML;
angreifertruppen_axt_verluste = document.getElementById("attack_info_att_units").getElementsByTagName("td")[29].innerHTML;
angreifertruppen_bogen_verluste = document.getElementById("attack_info_att_units").getElementsByTagName("td")[30].innerHTML;
angreifertruppen_spaeher_verluste = document.getElementById("attack_info_att_units").getElementsByTagName("td")[31].innerHTML;
angreifertruppen_lkav_verluste = document.getElementById("attack_info_att_units").getElementsByTagName("td")[32].innerHTML;
angreifertruppen_ber_bogen_verluste = document.getElementById("attack_info_att_units").getElementsByTagName("td")[33].innerHTML;
angreifertruppen_skav_verluste = document.getElementById("attack_info_att_units").getElementsByTagName("td")[34].innerHTML;
angreifertruppen_ramme_verluste = document.getElementById("attack_info_att_units").getElementsByTagName("td")[35].innerHTML;
angreifertruppen_kata_verluste = document.getElementById("attack_info_att_units").getElementsByTagName("td")[36].innerHTML;
angreifertruppen_paladin_verluste = document.getElementById("attack_info_att_units").getElementsByTagName("td")[37].innerHTML;
angreifertruppen_ag_verluste = document.getElementById("attack_info_att_units").getElementsByTagName("td")[38].innerHTML;

if (angreifertruppen_paladin != 0)
{
paladin_gegenstand_anfang = document.getElementById("attack_info_att").getElementsByTagName("td")[42].innerHTML;
paladin_gegenstand = paladin_gegenstand_anfang.substring(19,paladin_gegenstand_anfang.length);
}

//Verteidiger
verteidiger = document.getElementById("attack_info_def").getElementsByTagName("a")[0].innerHTML;
//ziel = document.getElementById("attack_info_def").getElementsByTagName("a")[1].innerHTML;
verteidigertruppen_speer = document.getElementById("attack_info_def_units").getElementsByTagName("td")[15].innerHTML;
verteidigertruppen_schwert = document.getElementById("attack_info_def_units").getElementsByTagName("td")[16].innerHTML;
verteidigertruppen_axt = document.getElementById("attack_info_def_units").getElementsByTagName("td")[17].innerHTML;
verteidigertruppen_bogen = document.getElementById("attack_info_def_units").getElementsByTagName("td")[18].innerHTML;
verteidigertruppen_spaeher = document.getElementById("attack_info_def_units").getElementsByTagName("td")[19].innerHTML;
verteidigertruppen_lkav = document.getElementById("attack_info_def_units").getElementsByTagName("td")[20].innerHTML;
verteidigertruppen_ber_bogen = document.getElementById("attack_info_def_units").getElementsByTagName("td")[21].innerHTML;
verteidigertruppen_skav = document.getElementById("attack_info_def_units").getElementsByTagName("td")[22].innerHTML;
verteidigertruppen_ramme = document.getElementById("attack_info_def_units").getElementsByTagName("td")[23].innerHTML;
verteidigertruppen_kata = document.getElementById("attack_info_def_units").getElementsByTagName("td")[24].innerHTML;
verteidigertruppen_paladin = document.getElementById("attack_info_def_units").getElementsByTagName("td")[25].innerHTML;
verteidigertruppen_ag = document.getElementById("attack_info_def_units").getElementsByTagName("td")[26].innerHTML;
verteidigertruppen_miliz = document.getElementById("attack_info_def_units").getElementsByTagName("td")[27].innerHTML;


verteidigertruppen_speer_verluste = document.getElementById("attack_info_def_units").getElementsByTagName("td")[29].innerHTML;
verteidigertruppen_schwert_verluste = document.getElementById("attack_info_def_units").getElementsByTagName("td")[30].innerHTML;
verteidigertruppen_axt_verluste = document.getElementById("attack_info_def_units").getElementsByTagName("td")[31].innerHTML;
verteidigertruppen_bogen_verluste = document.getElementById("attack_info_def_units").getElementsByTagName("td")[32].innerHTML;
verteidigertruppen_spaeher_verluste = document.getElementById("attack_info_def_units").getElementsByTagName("td")[33].innerHTML;
verteidigertruppen_lkav_verluste = document.getElementById("attack_info_def_units").getElementsByTagName("td")[34].innerHTML;
verteidigertruppen_ber_bogen_verluste = document.getElementById("attack_info_def_units").getElementsByTagName("td")[35].innerHTML;
verteidigertruppen_skav_verluste = document.getElementById("attack_info_def_units").getElementsByTagName("td")[36].innerHTML;
verteidigertruppen_ramme_verluste = document.getElementById("attack_info_def_units").getElementsByTagName("td")[37].innerHTML;
verteidigertruppen_kata_verluste = document.getElementById("attack_info_def_units").getElementsByTagName("td")[38].innerHTML;
verteidigertruppen_paladin_verluste = document.getElementById("attack_info_def_units").getElementsByTagName("td")[39].innerHTML;
verteidigertruppen_ag_verluste = document.getElementById("attack_info_def_units").getElementsByTagName("td")[40].innerHTML;
verteidigertruppen_miliz_verluste = document.getElementById("attack_info_def_units").getElementsByTagName("td")[41].innerHTML;

//Beute
//beute_holz = document.getElementById("attack_results").getElementsByTagName("td")[0].innerHTML;
//beute_lehm = document.getElementById("attack_results").getElementsByTagName("td")[1].innerHTML;
//beute_eisen = document.getElementById("attack_results").getElementsByTagName("td")[2].innerHTML;
//beute_gesamt = document.getElementById("attack_results").getElementsByTagName("td")[3].innerHTML;
//alert(beute_holz);


if (angreifertruppen_paladin != 0)
{ausgabe_allgemein_angreifer = "Betreff: " + betreff +"\n" + "Datum: " + datum +"\n" + gewinner  +"\n" + "Glück (aus Sicht des Angreifers): " + glueck +"\n"  +  moral +"\n" +"\n"   + "Angreifer: " + angreifer +"\n"  + "Herkunft: " + herkunft  +"\n" +"\n"  + "Anzahl:" +"\n"  + angreifertruppen_speer + " Speer" +"\n" + angreifertruppen_schwert +" Schwert" +"\n"  + angreifertruppen_axt + " Axt" +"\n"  + angreifertruppen_bogen + " Bogen" + "\n"  + angreifertruppen_spaeher +" Späher" +"\n"  + angreifertruppen_lkav +" leichte Kav." +"\n"  + angreifertruppen_ber_bogen +" ber. Bogen" +"\n"  + angreifertruppen_skav +" schwere Kav." +"\n"  + angreifertruppen_ramme + " Rammböcke" +"\n"  + angreifertruppen_kata + " Katapult" +"\n"  + angreifertruppen_paladin +" Paladin"  +"\n" + angreifertruppen_ag + " Adelsgeschlecht" + "\n\n" + paladin_gegenstand;
ausgabe_verluste = "Verluste:" +"\n"  + angreifertruppen_speer_verluste + " Speer" +"\n" + angreifertruppen_schwert_verluste +" Schwert" +"\n"  + angreifertruppen_axt_verluste + " Axt" +"\n"  + angreifertruppen_bogen_verluste + " Bogen" + "\n"  + angreifertruppen_spaeher_verluste +" Späher" +"\n"  + angreifertruppen_lkav_verluste +" leichte Kav." +"\n"  + angreifertruppen_ber_bogen_verluste +" ber. Bogen" +"\n"  + angreifertruppen_skav_verluste +" schwere Kav." +"\n"  + angreifertruppen_ramme_verluste + " Rammböcke" +"\n"  + angreifertruppen_kata_verluste + " Katapult" +"\n"  + angreifertruppen_paladin_verluste +" Paladin"  +"\n" + angreifertruppen_ag_verluste + " Adelsgeschlecht";
ausgabe= ausgabe_allgemein_angreifer + "\n" + ausgabe_verluste
alert(ausgabe);
}
else
{
ausgabe_allgemein_angreifer = "Betreff: " + betreff +"\n" + "Datum: " + datum +"\n" + gewinner  +"\n" + "Glück (aus Sicht des Angreifers): " + glueck +"\n"  +  moral +"\n" +"\n"   + "Angreifer: " + angreifer +"\n"  + "Herkunft: " + herkunft  +"\n" +"\n"  + "Anzahl:" +"\n"  + angreifertruppen_speer + " Speer" +"\n" + angreifertruppen_schwert +" Schwert" +"\n"  + angreifertruppen_axt + " Axt" +"\n"  + angreifertruppen_bogen + " Bogen" + "\n"  + angreifertruppen_spaeher +" Späher" +"\n"  + angreifertruppen_lkav +" leichte Kav." +"\n"  + angreifertruppen_ber_bogen +" ber. Bogen" +"\n"  + angreifertruppen_skav +" schwere Kav." +"\n"  + angreifertruppen_ramme + " Rammböcke" +"\n"  + angreifertruppen_kata + " Katapult" +"\n"  + angreifertruppen_paladin +" Paladin"  +"\n" + angreifertruppen_ag + " Adelsgeschlecht";
ausgabe_verluste = "Verluste:" +"\n"  + angreifertruppen_speer_verluste + " Speer" +"\n" + angreifertruppen_schwert_verluste +" Schwert" +"\n"  + angreifertruppen_axt_verluste + " Axt" +"\n"  + angreifertruppen_bogen_verluste + " Bogen" + "\n"  + angreifertruppen_spaeher_verluste +" Späher" +"\n"  + angreifertruppen_lkav_verluste +" leichte Kav." +"\n"  + angreifertruppen_ber_bogen_verluste +" ber. Bogen" +"\n"  + angreifertruppen_skav_verluste +" schwere Kav." +"\n"  + angreifertruppen_ramme_verluste + " Rammböcke" +"\n"  + angreifertruppen_kata_verluste + " Katapult" +"\n"  + angreifertruppen_paladin_verluste +" Paladin"  +"\n" + angreifertruppen_ag_verluste + " Adelsgeschlecht";
ausgabe= ausgabe_allgemein_angreifer + "\n" + ausgabe_verluste
alert(ausgabe);
}

//ausgabe_allgemein_angreifer2 = "Betreff: " + betreff +"\n" + "Datum: " + datum +"\n" + gewinner  +"\n" + "Glück (aus Sicht des Angreifers): " + glueck +"\n"  +  moral +"\n" +"\n"   + "Angreifer: " + angreifer +"\n"  + "Herkunft: " + herkunft  +"\n" +"\n"  + "Anzahl:" + "\t\t\t\t\t" + "Verluste" +"\n"  + angreifertruppen_speer + " Speer" + "\t\t\t\t\t" + angreifertruppen_speer_verluste +"\n" + angreifertruppen_schwert +" Schwert" + "\t\t\t\t" + angreifertruppen_schwert_verluste +"\n"  + angreifertruppen_axt + " Axt" + "\t\t\t\t\t" + angreifertruppen_axt_verluste +"\n" + angreifertruppen_bogen + " Bogen" + "\t\t\t\t\t" + angreifertruppen_bogen_verluste + "\n"  + angreifertruppen_spaeher +" Späher" + "\t\t\t\t\t" + angreifertruppen_spaeher_verluste +"\n"  + angreifertruppen_lkav +" leichte Kav." + "\t\t\t\t" + angreifertruppen_lkav_verluste +"\n"  + angreifertruppen_ber_bogen +" ber. Bogen" + "\t\t\t\t" + angreifertruppen_ber_bogen_verluste;
//ausgabe_allgemein_angreifer3 = "\n" + angreifertruppen_skav +" schwere Kav." + "\t\t\t" + angreifertruppen_skav_verluste+"\n"  + angreifertruppen_ramme + " Rammböcke" + "\t\t\t" + angreifertruppen_ramme_verluste+"\n"  + angreifertruppen_kata + " Katapult" + "\t\t\t\t" + angreifertruppen_kata_verluste+"\n"  + angreifertruppen_paladin +" Paladin" + "\t\t\t\t" + angreifertruppen_paladin_verluste +"\n" + angreifertruppen_ag + " Adelsgeschlecht" + "\t\t\t" + angreifertruppen_ag_verluste;
//ausgabe2 = ausgabe_allgemein_angreifer2 + ausgabe_allgemein_angreifer3;
//alert(ausgabe2);









