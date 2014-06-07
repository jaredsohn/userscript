// ==UserScript==
// @name           BATracer Car and Track Renamer
// @include        http://batracer.com/
// @include        http://batracer.com/-uH
// @include        http://batracer.com/-uw
// @include        http://batracer.com/-uR
// @include        http://batracer.com/-uL
// @include        http://batracer.com/-cj*
// @include        http://batracer.com/-cM
// @include        http://batracer.com/-uP
// @include        http://batracer.com/-ui
// @include        http://batracer.com/-us
// @include        http://batracer.com/-cn
// @include        http://batracer.com/-ci
// @include        http://batracer.com/-cI
// @include        http://batracer.com/-cc
// @include        http://batracer.com/-cd
// @include        http://batracer.com/-cq
// @include        http://batracer.com/-cs
// @include        http://batracer.com/-cr*
// @include        http://batracer.com/-cr?d&0
// @include        http://batracer.com/-ct*
// @include        http://batracer.com/-cm
// @include        http://batracer.com/-cW
// @include        http://batracer.com/-cC
// ==/UserScript==
// Written by Peter Read

var txt = [


//Cars
//Bat7
'Rotherham','Caterham',
'Wheatfield','Westfield',
'MAX Whoosh','DAX Rush',
'Lion','Tiger',
'Streaker','Striker',
'Loroast','Locost',
'Gherkin','Birkin',
'Donkeycourt','Donkervoort',
//British Tourers
'Oldhall Astrid','Vauxhall Astra',
'NG ZS','MG ZS',
'Photon Pimpian','Proton Impian',
'Hinda Civil','Honda Civic',
'Pogo 486','Peugeot 406',
'Reno Leo','Renault Clio',
'Alda Rodeo 156','Alfa Romeo 156',
'Hinda Accordian','Honda Accord',
'Pogo 386','Peugeot 306',
'Bavarian 320i','BMW 320i',
//Champion Cars
'Kaynard','Reynard',
'Peskie','Penske',
'Loller','Lola',
//Formula Nations
'Xitech','Zytek',
//V8S 2010
'Golden Race Team','Holden Racing Team',
'Blotto Racing','Rod Nash Racing',
'Triple Rate Racing','Triple Eight Race Engineering',
'Rock Bros Racing','Stone Brothers Racing',
'Wolsin Security Racing','Wilson Security Racing',
'Bradley James Racing','Brad Jones Racing',
'Graham Rodgers Racing','Garry Rodgers Motorsport',
'Ffordd Performance Racing','Ford Performance Racing',
'Danielle Jack Racing','Jack Daniels Racing',
'Richard Johnson Racing','Dick Johnson Racing',
'Peter Minor Motorsport','Paul Morris Motorsport',
'Mummy Racing','Mother Racing',
'Kalli Racing','Kelly Racing',
'Sensor Racing','Centuar Racing',
'Benderbug Black Racing','Bundaberg Red Racing',
'Rain Dunkim Racing','Britek Motorsports',
'Luke Dumbreck Motorsport','Lucas Dumbrell Motorsports',
'Triple S Racing','Triple F Racing',
//GP 2010
'Red Bell','Red Bull',
'McLewis','McLaren',
'Team Wales','Ferrari',
'Mernandez','Mercedes',
'Wallace','Williams',
'Reno','Renault',
'Fierce Indians','Force India',
'Roro Torso','Toro Rosso',
'Sotul','Lotus',
'Iberia Racing Team','Hispania Racing Team',
'Bauber','BMW Sauber',
'Maiden','Virgin Racing',
//GP 2009
'Toyoma','Toyota',
'Brown Grand Prix','Brawn GP',
'Bavarian Bauber','BMW Sauber',
//GP 1997
'Jodran','Jordan',
'Rinaldi','Minardi',
'Beleton','Benetton',
'Dart','Arrows',
'Rytell','Tyrrell',
'posRT','Prost',
'STEWA','Stewart',
'Loller','Lola',
//GP 1986
'Ligar','Ligier',
'RamAm','Brabham',
'Rinaldi','Minardi',
'ASG','AGS',
'Olla','Osella',
//DTM
'2007 Odee O4 DT','2007 Audi A4 DTM',
'2006 Odee O4 DT','2006 Audi A4 DTM',
'2005 Odee O4 DT','2005 Audi A4 DTM',
'2007 Mernandez C Class DT','2007 Mercedes C Class DTM',
'2006 Mernandez C Class DT','2006 Mercedes C Class DTM',
'2005 Mernandez C Class DT','2005 Mercedes C Class DTM',
'DT','DTM',
//MSGT
'Retro Vet D6-R','Chevy Corvette C6.R',
'Arson Merlin GBR19','Aston Martin DBR9',
'Masterati MV12R','Maserati MC12R',
'Salom SR7-R','Saleen S7-R',
'Ffordd 44GT-R','Matech-Ford GT1',
'Porca GG7 PT3 RSR','Porsche 997 GT3 RSR',
'Bavarian B3 GT2','BMW M3 GT2',
'Trevor 44R','TVR 440R',
'Masler M955R','Mosler M900R',
'Retro Vet D6-R GT2','Chevy Corvette C6.R GT2',
//
//
//
//Tyres
'Afon','Avon',
'GF Woodrich','BF Goodrich',
'Rockbridge','Bridgestone',
'Coventry','Cooper',
'Donelap','Dunlop',
'Firebug','Firestone',
'Greatyear','Goodyear',
'Coco','Kumho',
'Mitchell Inn','Michelin',
'Llanelli','Pirelli',
'Yokouno','Yokohama',
//
//
//
//Engines
//Bat7
'Toyota V8 1.6','Toyota 1.6',
//British Tourers
'Egotec 2.0','Ecotec 2.0',
'Peugeot 306 2.0','Peugeot 2.0',
'Twin Start','Twin Spark',
'twin-start','twin-spark',
'Retro 305ci','Chevrolet 305ci',
'Photon 2ltr','Proton 2ltr',
'Hinda 2.0','Honda 2.0',
//Champion Cars
'Ffordd','Ford',
'Mernandez','Mercedes',
//GP 2010
'Mernandez 180','Mercedes FO 108X',
'Welsh 650',' Ferrari 056',
'Reno RS09','Renault RS27-2010',
'Crossworx','Cosworth CA2010',
//GP 2009
'Toyota T09','Toyota RVX-09',
'Bavarian B90','BMW P86/9',
//GP 1997
'Reno RS9 3.0 V10','Renault RS9 3.0 V10',
'Yahama OX11A 3.0 V10','Yamaha OX11A 3.0 V10',
'Welsh 0/2 3.0 V10','Ferrari 046/2 3.0 V10',
'Mernandez FO110F 3.0 V10','Mercedes FO110F 3.0 V10',
'Pogo A14 3.0 V10','Peugeot A14 3.0 V10',
'Bart 830 AV7 3.0 V8','Hart 830 AV7 3.0 V8',
'Retrogas SPE-01 3.0 V10','Petronas SPE-01 3.0 V10',
'Ffordd ED5 3.0 V8','Ford ED5 3.0 V8',
'Moogun-Hinda MF-301HB 3.0 V10','Mugen-Honda MF-301HB 3.0 V10',
'Ffordd VJ Zed-Tec-R 3.0 V10','Ford ECA Zetec-R 3.0 V8',
//GP 2005
'Mernandez FO 110R','Mercedes FO110R',
'Toyoma RVX-05','Toyota RVX-05',
'Crossworx TJ2005','Cosworth TJ2005',
'Hinda RA005E','Honda RA005E',
'Bavarian P84/5','BMW P84/5',
'Reno RS25','Renault RS25',
'Petronas SPE 05A','Petronas 05A',
//MSGT
'Arson Merlin Racing V12','Prodrive 6L V12',
'Ffordd 5.5L V8','Matech-Ford 5.5L V8',
'General Mofos LS1 7.0 V8','GM LS1 7L V8',
'Masterati 6.0L V12','Maserati 6L V12',
'Porca Flat 6','Porsche Flat 6',
'Bavarian V8','BMW V8',
'Trevor Six','TVR Straight 6',
'General Mofos 5.5 V8','GM 5.5L V8',
//V8S 2010
'Golden','Holden',
'Ffordd','Ford',
//DTM
'Odee','Audi',
'Mernandez','Mercedes',
//
//
//
//Set Renames
'GP 2009','F1 2009',
'GP 2008','F1 2008',
'GP 2007','F1 2007',
'GP 2005','F1 2005',
'GP Two','GP2',
'Classic 86','F1 1986',
'Classic 97','F1 1997',
'Formula 3','Formula 3 World Series',
'German Tourers','DTM',
'Formula Nations','A1GP',
'Mid-Engined World Series','MR2 World Series',
'Champion Cars v2.0','Champcar v2.0',
'Champion Cars','Champcar Generic Championship',
'Classic All-American Series','Classic Trans-Am Series',
'British Tourers','BTCC Generic Championship',
'V8S','V8 Supercars',
'LMES v2.0','Le Mans Endurance Series v2.0',
'MS GT Challenge','FIA GT Championship',
//end Set Renames
];

function oldBATthanks(node) {
    node = node || document.body;
    if(node.nodeType == 3) {
		var x = 0;

		for(x; x<txt.length-1; x=x+2)
		{
			node.nodeValue = node.nodeValue.split(txt[x]).join(txt[x+1]);
		}
    } else {
        var nodes = node.childNodes;
        if(nodes) {
            var i = nodes.length;
            while(i--) oldBATthanks(nodes[i]);
        }
    }
}

oldBATthanks();