// ==UserScript==
// @name            IT2-poducts-for-devs
// @namespace       de
// @description     Produktinformationen für Scriptentwickler
// @author          Antonio Estrela do Sul
// @include         http://www.itycoon2.de/product_info*
// @date            2011-11-06
// @version         0.2
// ==/UserScript==


var DatenIndex = "Index;Produktname;Produktkategorie;Produktion in;Volumen;Haltbarkeit;Ergibt;Maßeinheit;Produktionsdauer;6;Rind;Rohstoffe;Tierzucht;200;Ewig haltbar;1;Stck.;72;12;Schwein;Rohstoffe;Tierzucht;150;Sehr lange haltbar;1;Stck.;72;18;Huhn;Rohstoffe;Tierzucht;5;Sehr lange haltbar;25;Stck.;72;24;Biene;Rohstoffe;Tierzucht;0.02;Haltbar;500;Stck.;72;30;Weizen;Rohstoffe;Plantage;1;Ewig haltbar;50;kg;24;36;Roggen;Rohstoffe;Plantage;1;Sehr lange haltbar;50;kg;24;42;Gerste;Rohstoffe;Plantage;1;Lange haltbar;50;kg;24;48;Reis;Rohstoffe;Plantage;1;Sehr lange haltbar;50;kg;24;54;Sojabohnen;Rohstoffe;Plantage;1;Haltbar;50;kg;24;60;Erdnüsse;Verkaufbare Rohstoffe;Plantage;1;Lange haltbar;50;kg;24;66;Kartoffeln;Verkaufbare Rohstoffe;Plantage;1;Haltbar;50;kg;24;72;Zuckerrüben;Rohstoffe;Plantage;1;Leicht verderblich;50;kg;24;78;Gurke;Verkaufbare Rohstoffe;Plantage;1;Haltbar;50;kg;24;84;Karotten;Verkaufbare Rohstoffe;Plantage;1;Leicht verderblich;50;kg;24;90;Brokkoli;Verkaufbare Rohstoffe;Plantage;1;Leicht verderblich;50;kg;24;96;Blumenkohl;Verkaufbare Rohstoffe;Plantage;1;Leicht verderblich;50;kg;24;102;Tomate;Verkaufbare Rohstoffe;Plantage;1;Leicht verderblich;50;kg;24;108;Paprika;Verkaufbare Rohstoffe;Plantage;1;Leicht verderblich;50;kg;24;114;Apfel;Verkaufbare Rohstoffe;Plantage;1;Leicht verderblich;50;kg;24;120;Birne;Verkaufbare Rohstoffe;Plantage;1;Leicht verderblich;50;kg;24;126;Aprikose;Verkaufbare Rohstoffe;Plantage;1;Leicht verderblich;50;kg;24;132;Kirschen;Verkaufbare Rohstoffe;Plantage;1;Leicht verderblich;50;kg;24;138;Erdbeere;Verkaufbare Rohstoffe;Plantage;1;Leicht verderblich;50;kg;24;144;Ananas;Verkaufbare Rohstoffe;Plantage;1;Leicht verderblich;50;kg;24;150;Banane;Verkaufbare Rohstoffe;Plantage;1;Leicht verderblich;50;kg;24;156;Orange;Verkaufbare Rohstoffe;Plantage;1;Leicht verderblich;50;kg;24;162;Kaffeebohnen;Rohstoffe;Plantage;1;Lange haltbar;50;kg;24;168;Tabak;Rohstoffe;Plantage;1;Sehr lange haltbar;50;kg;24;174;Salz;Rohstoffe;Bergwerk;1;Ewig haltbar;20;kg;24;180;Kakaobohnen;Rohstoffe;Plantage;1;Lange haltbar;50;kg;24;186;Baum;Rohstoffe;Plantage;200;Ewig haltbar;1;Stck.;48;192;Erdöl;Rohstoffe;Förderturm;1;Ewig haltbar;20;l;6;198;Eisenerz;Rohstoffe;Bergwerk;1;Ewig haltbar;20;kg;6;204;Kupfererz;Rohstoffe;Bergwerk;1;Ewig haltbar;20;kg;6;210;Bauxit;Rohstoffe;Bergwerk;1;Ewig haltbar;20;kg;6;216;Quarz;Rohstoffe;Bergwerk;1;Ewig haltbar;20;kg;6;222;Stahl;Zwischenprodukte;Fabrik;1;Ewig haltbar;5;kg;3;228;Benzin;Verkaufsware;Fabrik;1;Ewig haltbar;10;l;3;234;Kunststoff;Zwischenprodukte;Fabrik;1;Ewig haltbar;5;kg;3;240;Weizenmehl;Zwischenprodukte;Fabrik;1;Sehr lange haltbar;10;kg;3;246;Brötchen;Verkaufsware;Fabrik;0.1;Leicht verderblich;10;Stck.;3;252;Milch;Zwischenprodukte;Tierzucht;1;Leicht verderblich;10;l;3;258;Karton;Zwischenprodukte;Fabrik;1;Ewig haltbar;5;kg;3;264;1l Milch;Verkaufsware;Fabrik;1;Haltbar;5;Stck.;3;270;Holz;Zwischenprodukte;Plantage;1;Ewig haltbar;200;kg;3;276;Kleine Kartonverpackung;Zwischenprodukte;Fabrik;0.1;Ewig haltbar;50;Stck.;3;282;Brot;Verkaufsware;Fabrik;1;Leicht verderblich;5;Stck.;3;288;Eier;Zwischenprodukte;Tierzucht;0.06;Leicht verderblich;10;Stck.;3;294;10 Eier;Verkaufsware;Fabrik;0.7;Leicht verderblich;1;Stck.;1;300;Kleine Kunststoffverpackung;Zwischenprodukte;Fabrik;0.1;Ewig haltbar;50;Stck.;3;306;1kg Weizenmehl;Verkaufsware;Fabrik;1;Sehr lange haltbar;5;Stck.;1;312;1kg Reis;Verkaufsware;Fabrik;1;Lange haltbar;5;Stck.;1;318;Eiernudeln;Zwischenprodukte;Fabrik;1;Haltbar;5;kg;3;324;1kg Eiernudeln;Verkaufsware;Fabrik;1;Lange haltbar;5;Stck.;1;330;Butter;Zwischenprodukte;Fabrik;1;Haltbar;5;kg;3;336;250g Butter;Verkaufsware;Fabrik;0.35;Haltbar;5;Stck.;1;342;Schweinefleisch;Zwischenprodukte;Tierzucht;1;Leicht verderblich;150;kg;3;348;1kg Schweinefleisch;Verkaufsware;Fabrik;1;Leicht verderblich;5;Stck.;1;354;Geflügelfleisch;Zwischenprodukte;Tierzucht;1;Leicht verderblich;5;kg;1;360;1kg Geflügel;Verkaufsware;Fabrik;1;Leicht verderblich;5;Stck.;1;366;Rindfleisch;Zwischenprodukte;Tierzucht;1;Leicht verderblich;200;kg;4;372;1kg Rindfleisch;Verkaufsware;Fabrik;1;Leicht verderblich;5;Stck.;1;378;Diesel;Verkaufsware;Fabrik;1;Ewig haltbar;10;l;3;384;Honig;Zwischenprodukte;Tierzucht;1;Leicht verderblich;5;kg;3;390;250ml Glasverpackung;Zwischenprodukte;Fabrik;0.25;Ewig haltbar;20;Stck.;3;396;250g Honig;Verkaufsware;Fabrik;0.25;Lange haltbar;5;Stck.;1;402;Büroschere;Verkaufsware;Fabrik;0.2;Ewig haltbar;1;Stck.;3;408;Papier;Zwischenprodukte;Fabrik;1;Ewig haltbar;5;kg;3;414;Kopierpapier A4 500 Blatt;Verkaufsware;Fabrik;4;Ewig haltbar;1;Stck.;1;420;Wasser;Rohstoffe;Förderturm;1;Sehr lange haltbar;50;l;6;426;1l Glasverpackung;Zwischenprodukte;Fabrik;1;Ewig haltbar;20;Stck.;3;432;1l Mineralwasser;Verkaufsware;Fabrik;1;Sehr lange haltbar;5;Stck.;3;438;Tofu;Zwischenprodukte;Fabrik;1;Leicht verderblich;5;kg;3;444;1kg Tofu;Verkaufsware;Fabrik;1;Lange haltbar;5;Stck.;1;450;Radiergummi;Zwischenprodukte;Fabrik;0.02;Ewig haltbar;50;Stck.;3;456;1kg Hackfleisch;Verkaufsware;Fabrik;1;Leicht verderblich;5;Stck.;1;462;1l Apfelsaft;Verkaufsware;Fabrik;1;Lange haltbar;5;Stck.;3;468;1l Apfelschorle;Verkaufsware;Fabrik;1;Lange haltbar;5;Stck.;3;474;Zigarette;Zwischenprodukte;Fabrik;0.001;Sehr lange haltbar;25;Stck.;3;480;20er Packung Zigaretten;Verkaufsware;Fabrik;0.2;Sehr lange haltbar;1;Stck.;1;486;1kg Pommes-Frites;Verkaufsware;Fabrik;1;Sehr lange haltbar;5;Stck.;1;492;1l Sojamilch;Verkaufsware;Fabrik;1;Haltbar;5;Stck.;3;498;250g Kartoffel-Chips;Verkaufsware;Fabrik;0.35;Lange haltbar;5;Stck.;1;504;5er Set Radiergummis;Verkaufsware;Fabrik;0.3;Ewig haltbar;1;Stck.;1;510;Anspitzer;Zwischenprodukte;Fabrik;0.02;Ewig haltbar;50;Stck.;4;516;5er Set Anspitzer;Verkaufsware;Fabrik;0.3;Ewig haltbar;1;Stck.;1;522;Hopfen;Rohstoffe;Plantage;1;Lange haltbar;50;kg;24;528;Bier;Zwischenprodukte;Fabrik;1;Sehr lange haltbar;5;l;4;534;0,5l Glasverpackung;Zwischenprodukte;Fabrik;0.5;Ewig haltbar;20;Stck.;3;540;0,5l Flaschenbier;Verkaufsware;Fabrik;0.5;Sehr lange haltbar;5;Stck.;3;546;Hund;Verkaufbare Rohstoffe;Tierzucht;25;Ewig haltbar;1;Stck.;72;552;Katze;Verkaufbare Rohstoffe;Tierzucht;10;Ewig haltbar;1;Stck.;72;558;Wellensittich;Verkaufbare Rohstoffe;Tierzucht;0.2;Ewig haltbar;1;Stck.;72;564;Apfelsaft;Zwischenprodukte;Fabrik;1;Haltbar;5;l;3;570;Büroset;Verkaufsware;Fabrik;0.4;Ewig haltbar;1;Stck.;1;576;Orangensaft;Zwischenprodukte;Fabrik;1;Haltbar;5;l;3;582;1l Orangensaft;Verkaufsware;Fabrik;1;Lange haltbar;5;Stck.;3;588;Kirschsaft;Zwischenprodukte;Fabrik;1;Haltbar;5;l;3;594;Karottensaft;Zwischenprodukte;Fabrik;1;Haltbar;5;l;3;600;1l Karottensaft;Verkaufsware;Fabrik;1;Lange haltbar;5;Stck.;3;606;1l Kirschsaft;Verkaufsware;Fabrik;1;Lange haltbar;5;Stck.;3;612;0,5l Dosenverpackung;Zwischenprodukte;Fabrik;0.5;Ewig haltbar;50;Stck.;3;618;0,5l Dosenbier;Verkaufsware;Fabrik;0.5;Ewig haltbar;5;Stck.;3;624;0,5l Mineralwasser;Verkaufsware;Fabrik;0.5;Sehr lange haltbar;5;Stck.;3;630;Baumwolle;Rohstoffe;Plantage;1;Ewig haltbar;50;kg;24;636;Stoff;Zwischenprodukte;Fabrik;1;Ewig haltbar;5;m;3;642;Hosenknopf;Zwischenprodukte;Fabrik;0.03;Ewig haltbar;25;Stck.;3;648;Reißverschluß;Zwischenprodukte;Fabrik;0.1;Ewig haltbar;10;Stck.;3;654;T-Shirt;Verkaufsware;Fabrik;0.2;Ewig haltbar;1;Stck.;3;660;Pullover;Verkaufsware;Fabrik;0.5;Ewig haltbar;1;Stck.;3;666;Jeans;Verkaufsware;Fabrik;1;Ewig haltbar;1;Stck.;3;672;500g Kaffee;Verkaufsware;Fabrik;0.5;Sehr lange haltbar;5;Stck.;1;678;Schrauben;Zwischenprodukte;Fabrik;0.01;Ewig haltbar;100;Stck.;4;684;Einfacher Holztisch;Verkaufsware;Fabrik;10;Ewig haltbar;1;Stck.;4;690;Einfacher Holzstuhl;Verkaufsware;Fabrik;5;Ewig haltbar;1;Stck.;3;696;Klebstoff;Zwischenprodukte;Fabrik;1;Ewig haltbar;10;l;3;702;Bücherregal;Verkaufsware;Fabrik;8;Ewig haltbar;1;Stck.;4;708;Zucker;Zwischenprodukte;Fabrik;1;Sehr lange haltbar;5;kg;3;714;Apfelkuchen;Verkaufsware;Fabrik;1;Leicht verderblich;5;Stck.;3;720;1kg Zucker;Verkaufsware;Fabrik;1;Sehr lange haltbar;5;Stck.;1;726;Silizium;Zwischenprodukte;Fabrik;1;Ewig haltbar;5;kg;3;732;0,5l Multivitaminsaft;Verkaufsware;Fabrik;0.5;Sehr lange haltbar;5;Stck.;3;738;Zigarre;Zwischenprodukte;Fabrik;0.2;Ewig haltbar;5;Stck.;3;744;0,5l Apfelsaft;Verkaufsware;Fabrik;0.5;Sehr lange haltbar;5;Stck.;3;750;Büroklammern;Zwischenprodukte;Fabrik;0.01;Ewig haltbar;150;Stck.;4;756;Hammer;Verkaufsware;Fabrik;0.5;Ewig haltbar;1;Stck.;3;762;Leder;Zwischenprodukte;Tierzucht;1;Ewig haltbar;10;m;3;768;Nylon;Zwischenprodukte;Fabrik;1;Ewig haltbar;5;m;3;774;Teddybär;Verkaufsware;Fabrik;3;Ewig haltbar;1;Stck.;3;780;500g Kakao;Verkaufsware;Fabrik;0.5;Sehr lange haltbar;5;Stck.;1;786;Benzinfeuerzeug;Verkaufsware;Fabrik;0.04;Sehr lange haltbar;10;Stck.;3;792;Stoffsofa;Verkaufsware;Fabrik;25;Ewig haltbar;1;Stck.;5;798;Holzeisenbahn;Verkaufsware;Fabrik;3;Ewig haltbar;1;Stck.;3;804;Kakaopulver;Zwischenprodukte;Fabrik;1;Sehr lange haltbar;5;kg;3;810;Bürostuhl;Verkaufsware;Fabrik;4.5;Ewig haltbar;1;Stck.;4;816;5er Packung Zigarren;Verkaufsware;Fabrik;1;Sehr lange haltbar;1;Stck.;1;822;Aluminium;Zwischenprodukte;Fabrik;1;Ewig haltbar;5;kg;3;828;Alu-Leiter;Verkaufsware;Fabrik;1;Ewig haltbar;1;Stck.;3;834;250g gesalzene Erdnüsse;Verkaufsware;Fabrik;0.3;Sehr lange haltbar;5;Stck.;3;840;Nägel;Zwischenprodukte;Fabrik;0.001;Sehr lange haltbar;500;Stck.;4;846;gesalzene Erdnüsse;Zwischenprodukte;Fabrik;1;Sehr lange haltbar;10;kg;4;852;100er Pack Nägel;Verkaufsware;Fabrik;1;Ewig haltbar;5;Stck.;3;858;Schraubenzieher;Verkaufsware;Fabrik;1;Ewig haltbar;5;Stck.;4;864;Croissants;Verkaufsware;Fabrik;0.2;Leicht verderblich;5;Stck.;4;870;Roggenmehl;Zwischenprodukte;Fabrik;1;Sehr lange haltbar;10;kg;4;876;Tortelini;Zwischenprodukte;Fabrik;1;Lange haltbar;5;kg;4;882;Sahne;Zwischenprodukte;Fabrik;1;Haltbar;5;l;4;888;Weizengrieß;Zwischenprodukte;Fabrik;1;Sehr lange haltbar;5;kg;4;894;Spaghetti;Zwischenprodukte;Fabrik;1;Sehr lange haltbar;5;kg;4;900;Pizzateig;Zwischenprodukte;Fabrik;1;Lange haltbar;5;kg;4;906;200ml Plastikbecher;Zwischenprodukte;Fabrik;0.2;Ewig haltbar;50;Stck.;4;912;Briefumschlag;Zwischenprodukte;Fabrik;0.005;Ewig haltbar;500;Stck.;4;918;Visitenkarte;Zwischenprodukte;Fabrik;0.001;Ewig haltbar;200;Stck.;4;924;Kartoffel Kroketten;Zwischenprodukte;Fabrik;1;Lange haltbar;5;kg;4;930;Kordel;Zwischenprodukte;Fabrik;0.1;Ewig haltbar;50;Stck.;4;936;Roggenbrot;Verkaufsware;Fabrik;0.9;Haltbar;5;Stck.;3;942;Käsesahnetorte;Verkaufsware;Fabrik;1;Leicht verderblich;5;Stck.;3;948;Quark;Zwischenprodukte;Fabrik;1;Haltbar;5;kg;4;954;200ml Sahne;Verkaufsware;Fabrik;0.25;Haltbar;5;Stck.;3;960;Käse;Zwischenprodukte;Fabrik;1;Leicht verderblich;5;kg;4;966;500g Käse;Verkaufsware;Fabrik;0.55;Haltbar;5;Stck.;3;972;500g Tofuschnitzel;Verkaufsware;Fabrik;1;Haltbar;2;Stck.;3;978;Erdbeerbonbons;Zwischenprodukte;Fabrik;1;Sehr lange haltbar;5;kg;4;984;Sahnebonbons;Zwischenprodukte;Fabrik;1;Sehr lange haltbar;5;kg;4;990;Schokolade;Zwischenprodukte;Fabrik;1;Sehr lange haltbar;5;kg;4;996;250g Erdbeerbonbons;Verkaufsware;Fabrik;0.3;Sehr lange haltbar;5;Stck.;3;1002;250g Sahnebonbons;Verkaufsware;Fabrik;0.25;Lange haltbar;5;Stck.;3;1008;100g Schokolade;Verkaufsware;Fabrik;0.15;Sehr lange haltbar;5;Stck.;3;1014;1kg Tiefkühlgemüse;Verkaufsware;Fabrik;1;Sehr lange haltbar;1;Stck.;1;1020;Tomatensauce;Zwischenprodukte;Fabrik;1;Lange haltbar;5;l;4;1026;Pizza Margherita;Verkaufsware;Fabrik;0.4;Sehr lange haltbar;5;Stck.;3;1032;Pizza Schinken;Verkaufsware;Fabrik;0.4;Lange haltbar;5;Stck.;4;1038;Kommode;Verkaufsware;Fabrik;10;Ewig haltbar;1;Stck.;4;1044;Stoffsessel;Verkaufsware;Fabrik;8;Ewig haltbar;1;Stck.;4;1050;Wandschrank;Verkaufsware;Fabrik;28;Ewig haltbar;1;Stck.;4;1056;Esstisch;Verkaufsware;Fabrik;8;Ewig haltbar;1;Stck.;4;1062;Schreibtisch;Verkaufsware;Fabrik;9;Ewig haltbar;1;Stck.;4;1068;Bauklötze;Verkaufsware;Fabrik;2;Ewig haltbar;1;Stck.;3;1074;Schaukelpferd;Verkaufsware;Fabrik;5;Ewig haltbar;1;Stck.;3;1080;Bermudashorts;Verkaufsware;Fabrik;0.8;Ewig haltbar;1;Stck.;3;1086;Lederjacke;Verkaufsware;Fabrik;1;Ewig haltbar;1;Stck.;3;1092;Kugelschreiber;Zwischenprodukte;Fabrik;0.005;Sehr lange haltbar;400;Stck.;4;1098;Jacke;Verkaufsware;Fabrik;1;Ewig haltbar;1;Stck.;3;1104;Kapuzenpullover;Verkaufsware;Fabrik;0.7;Ewig haltbar;1;Stck.;3;1110;50er Pack Kugelschreiber;Verkaufsware;Fabrik;0.2;Ewig haltbar;1;Stck.;3;1116;Stempel;Verkaufsware;Fabrik;0.04;Ewig haltbar;5;Stck.;3;1122;500er Pack Briefumschläge;Verkaufsware;Fabrik;0.55;Ewig haltbar;1;Stck.;3;1128;250er Pack Visitenkarten;Verkaufsware;Fabrik;0.25;Ewig haltbar;1;Stck.;3;1134;Lederschuh;Verkaufsware;Fabrik;1;Ewig haltbar;1;Stck.;4;1140;750g Kroketten;Verkaufsware;Fabrik;0.8;Sehr lange haltbar;5;Stck.;3;1146;1kg Tortelini;Verkaufsware;Fabrik;1;Lange haltbar;5;Stck.;1;1152;1kg Spaghetti;Verkaufsware;Fabrik;1;Lange haltbar;5;Stck.;1;1158;Schwarzwälder-Kirsch-Torte;Verkaufsware;Fabrik;1;Leicht verderblich;5;Stck.;4;1164;Turnschuhe;Verkaufsware;Fabrik;0.7;Sehr lange haltbar;1;Stck.;3;1170;500g Plastikbecher;Zwischenprodukte;Fabrik;0.5;Sehr lange haltbar;35;Stck.;4;1176;500g Quark;Verkaufsware;Fabrik;0.55;Haltbar;5;Stck.;3;1182;Roggenbrötchen;Verkaufsware;Fabrik;0.11;Leicht verderblich;10;Stck.;3;1188;Locher;Verkaufsware;Fabrik;0.3;Ewig haltbar;5;Stck.;3;1194;100er Pack Büroklammern;Verkaufsware;Fabrik;0.6;Ewig haltbar;1;Stck.;1;1200;500g Salz;Verkaufsware;Fabrik;0.55;Sehr lange haltbar;5;Stck.;1;1206;Cordon Bleu;Zwischenprodukte;Fabrik;0.25;Leicht verderblich;4;Stck.;4;1212;500g Cordon Bleu;Verkaufsware;Fabrik;0.55;Leicht verderblich;1;Stck.;1;1218;Kupferdraht;Zwischenprodukte;Fabrik;1;Ewig haltbar;5;m;5;1224;Kupferleitung;Zwischenprodukte;Fabrik;1;Ewig haltbar;1;m;2;1230;Elektromotor;Zwischenprodukte;Fabrik;0.2;Ewig haltbar;10;Stck.;6;1236;Bohrer;Zwischenprodukte;Fabrik;0.05;Sehr lange haltbar;10;Stck.;3;1242;Bohrer Set;Verkaufsware;Fabrik;1;Ewig haltbar;1;Stck.;1;1248;Bohrfutterschlüssel;Zwischenprodukte;Fabrik;0.12;Ewig haltbar;5;Stck.;4;1254;Reifen;Zwischenprodukte;Fabrik;3;Ewig haltbar;5;Stck.;5;1260;Alu-Felgen;Zwischenprodukte;Fabrik;1;Ewig haltbar;5;Stck.;4;1266;Felgen;Zwischenprodukte;Fabrik;2;Ewig haltbar;5;Stck.;4;1272;Fahrzeugmotor;Zwischenprodukte;Fabrik;12;Ewig haltbar;2;Stck.;6;1278;Auto-Karosserie;Zwischenprodukte;Fabrik;220;Ewig haltbar;2;Stck.;8;1284;Auto;Verkaufsware;Fabrik;400;Ewig haltbar;1;Stck.;48;1290;Autoscheibensatz;Zwischenprodukte;Fabrik;12;Ewig haltbar;1;Stck.;5;1296;Außenspiegel;Zwischenprodukte;Fabrik;0.6;Ewig haltbar;4;Stck.;3;1302;Heckbeleuchtung;Zwischenprodukte;Fabrik;1;Ewig haltbar;1;Stck.;4;1308;Frontbeleuchtung;Zwischenprodukte;Fabrik;1;Ewig haltbar;1;Stck.;4;1314;Bohrmaschine;Verkaufsware;Fabrik;1;Ewig haltbar;1;Stck.;5;1320;Kautschuk;Rohstoffe;Plantage;1;Ewig haltbar;30;l;24;1326;Gummi;Zwischenprodukte;Fabrik;1;Ewig haltbar;5;kg;4;1332;Nylonstrümpfe;Zwischenprodukte;Fabrik;0.15;Ewig haltbar;20;Stck.;4;1338;10 Paar Nylonstrümpfe;Verkaufsware;Fabrik;1;Ewig haltbar;1;Stck.;1;1344;Erdbeerkonfitüre;Zwischenprodukte;Fabrik;1;Haltbar;2;kg;4;1350;250g Erdbeerkonfitüre;Verkaufsware;Fabrik;0.25;Lange haltbar;4;Stck.;1;1356;Autositz;Zwischenprodukte;Fabrik;10;Ewig haltbar;4;Stck.;5;1362;Getriebe;Zwischenprodukte;Fabrik;13;Ewig haltbar;2;Stck.;6;1368;Schaumstoff;Zwischenprodukte;Fabrik;3;Ewig haltbar;5;kg;5;1374;Unterhemden;Zwischenprodukte;Fabrik;0.4;Ewig haltbar;10;Stck.;4;1380;5er Packung Unterhemden;Verkaufsware;Fabrik;1;Ewig haltbar;2;Stck.;1;1386;Unterhosen;Zwischenprodukte;Fabrik;0.2;Ewig haltbar;10;Stck.;4;1392;10er Packung Unterhosen;Verkaufsware;Fabrik;1;Ewig haltbar;2;Stck.;2;1398;Armaturenbrett;Zwischenprodukte;Fabrik;1;Ewig haltbar;1;Stck.;6;1404;Analoger Tacho;Zwischenprodukte;Fabrik;1;Ewig haltbar;2;Stck.;6;1410;Lenkrad;Zwischenprodukte;Fabrik;1;Ewig haltbar;2;Stck.;6;";

var DISplit = DatenIndex.split(";");
var Produkt = new Array(9);
var Split = 0;
for (var i = 0; i < Produkt.length; ++i)
  {Produkt[i] = new Array(235);}

//for (var i = 0; i < DISplit.length; ++i)
for (var i = 0; i <= 235; ++i) {
	for (var z = 0; z <= 8; ++z) {
	Split = (i+1)*9+z;
	Produkt[z][i] = DISplit[Split];	} }


// Ausgabe auf Seite
var Ausgabe = new Array(9);

// Anfang
for (var z = 0; z <= 8; ++z) 
	{	
	if ((z == 4) || (z == 6) || (z == 8)) {
		Ausgabe[z] = Produkt[z][0] + ", "; //ohne " "
		} else {
		Ausgabe[z] = "\"" + Produkt[z][0] + "\", "; //mit " "
		}
	}

// Mittelteil
for (var i = 1; i <= Produkt[0].length -3; ++i) {
	for (var z = 0; z <= 8; ++z) 
		{	if ((z == 4) || (z == 6) || (z == 8)) {
				Ausgabe[z] = Ausgabe[z] + "" + Produkt[z][i] + ", "; //ohne " "
				} else {
				Ausgabe[z] = Ausgabe[z] + "\"" + Produkt[z][i] + "\", "; //mit " "
				}
		}
	}

// Endteil
var i = Produkt[0].length -2;
	for (var z = 0; z <= 8; ++z) 
		{	if ((z == 4) || (z == 6) || (z == 8)) {
				Ausgabe[z] = Ausgabe[z] + Produkt[z][i]; //ohne " "
				} else {
				Ausgabe[z] = Ausgabe[z] + "\"" + Produkt[z][i] + "\""; //mit " "
				}		
		}
		
// Ergänzung Array
for (var z = 0; z <= 8; ++z) 
	{	Ausgabe[z] = "new Array(" + Ausgabe[z] + ");";}

	//alert(Ausgabe);

var Ausgabenverkettung = "PDBIndex = " + Ausgabe[0] + " PDBProduktname = " + Ausgabe[1] + " PDBProduktkategorie = " + 
	Ausgabe[2] + " PDBProduktion_in = " + Ausgabe[3] + " PDBVolumen = " + Ausgabe[4] + " PDBHaltbarkeit = " + 
	Ausgabe[5] + " PDBErgibt = " + Ausgabe[6] + " PDBMasseinheit = " + Ausgabe[7] + " PDBProduktionsdauer = " + Ausgabe[8];
//Produktkategorie;Produktion_in;Volumen;Haltbarkeit;Ergibt;Maßeinheit;Produktionsdauer

		
		// fügt errechneten Wert in Tabelle ein
		var Einfügeposition = document.getElementById("footer");
		var neuB = document.createElement("p");
		var neuBText = document.createTextNode(Ausgabenverkettung);
		neuB.appendChild(neuBText);
		//var td = document.getElementsByTagName("tr")[i].getElementsByTagName("td")[j];
		//var td_a = td.getElementsByTagName("br")[anzahlBR];
		//td.insertBefore(neuB, td_a);
		Einfügeposition.appendChild(document.createElement("br"));
		Einfügeposition.appendChild(neuB);




	
	
/* 
var test = (DISplit.length-1)/9 -1;
alert(test +
 "\nDatensatz 0 " + Produkt[1][0] + " " + Produkt[8][0] +
 "\nDatensatz 1 " + Produkt[1][1] + " " + Produkt[8][1] +
 "\nDatensatz 2 " + Produkt[1][2] + " " + Produkt[8][2] +
 "\nDatensatz 3 " + Produkt[1][3] + " " + Produkt[8][3] +
 "\nDatensatz 233 " + Produkt[1][233] + " " + Produkt[8][233] + 
 "\nDatensatz 234 " + Produkt[1][234] + " " + Produkt[8][234] + 
 "\nDatensatz 235 " + Produkt[1][235] + " " + Produkt[8][235] +
 "\nDatensatz 236 " + Produkt[1][236] + " " + Produkt[8][236]);
*/