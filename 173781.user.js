// ==UserScript==
//
// @name        :   Comanche.dk TW Chatcodes
// @namespace   :   comanche_tw_chatcodes
// @version     :   1.0
// @description :   
// @author      :   René Juul
// @website     :   http://comanche.dk
// @license     :   
// @downloadURL :   http://comanche.dk/userscripts/download/
// @updateURL   :   http://comanche.dk/userscripts/update/
// @include     :   http://dk5.the-west.dk/*
//
// @history     :   1.0 : Dansk sprog, kun tilgængelig for comanche medlemmer og kun produkter.
// @history     :   1.1 : + hovedbeklædning, halsbånd og beklædning.
// @history     :   1.2 : + sko, bukser, bælter og duelvåben.
// @history     :   1.3 : + skydevåben, heste, ekstra genstande og sidst nye.
// @history     :   1.4 : + jobs til produkter.
// @history     :   1.5 : Tilgængelig for TW spillere i Arizona og Briscoe.
//
// ==/UserScript==


    var approved_1 = "http://dk5.the-west.dk";
    var approved_2 = "Arizona";
    var approved_3 = 235;
    var kontrol = "";

    if(Game.gameURL==approved_1 && Game.worldName==approved_2 && Game.homeTown.town_id==approved_3)
    {
        kontrol = "Godkendt";    
    }
    else
    {
        kontrol = "Ikke godkendt";
    };
    

alert("Alle data er : "+kontrol);