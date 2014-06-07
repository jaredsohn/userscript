// ==UserScript==
// @name           Generic BATracer Renamer
// @namespace      http://lolsaurus.rex
// @include        http://batracer.com/*
// @exclude        http://batracer.com/-cx
// @exclude        http://batracer.com/-cr?d*
// @exclude        http://batracer.com/-us*
// @exclude        http://batracer.com/-ua*
// ==/UserScript==
//written by gtpsharky (http://batracer.com/-us?4u1) with contributions from Stefan van Renselaar, Maxiaxia Malinovskiy, Ed Greenhalgh and Shridutt N. V

var txt = [
// locations
'Dartford','Beeswax',
//end locations
//
//tyres
'Yokouno','Yokohama',
'Greatyear','Goodyear',
'Llanelli','Pirelli',
'Donelap','Dunlop',
'Coco','Kumho',
'Mitchell Inn','Michelin',
'Rockbridge','Bridgestone',
'Coventry','Cooper',
'GF Woodrich','BF Goodrich',
'Afon','Avon',
'Firebug','Firestone',
//end tyres
//
//F186
//chassis
'Zakslow','Zakspeed',
'RamAm','Brabham',
'Olla','Osella',
'ASG','AGS',
//end F186
//
//F107
//chassis
'Hyper Oguri','Super Aguri',
'Spike','Spyker',
'Renu','Renault',
//end F107
//
//F109
//chassis
'Toyoma','Toyota',
'Brown Grand Prix','Brawn GP',
'Red Bell','Red Bull',
'Fierce Indians','Force India',
'Roro Torso','Toro Rosso',
'Bavarian Bauber','BMW Sauber',
//engines
'Mernandez 180','Mercedes-Benz FO108W',
'Welsh 650',' Ferrari 056',
'Toyota T09',' Toyota RVX-09',
'Reno RS09','Renault RS27',
'Bavarian B90','BMW P86/9',
//end F109
//
////F110
//chassis
'Sotul','Lotus',
'Iberia','Hispania',
'Maiden','Virgin Racing',
//engines
'Crossworx','Cosworth',
//end F110
//
//BTCC
//chassis
'Fleat','Fiat',
'Alda Rodeo','Alfa Romeo',
'Alda','Alfa',
'NG ZS','MG ZS',
'Reno','Renault',
'Leo','Clio',
'Photon','Proton',
'Hinda','Honda',
'Bavarian','BMW',
'Oldhall Astrid','Vauxhall Astra',
'Hinda Civil','Honda Civic',
'Honda Accordian','Honda Accord',
//engines
'Honda Civil','Honda Civic',
'Egotec 2.0','Ecotec 2.0',
'Proton Pimpian','Proton Impian',
'Peugeot 306 2.0','Peugeot 2.0',
'Twin Start','Twin Spark',
//tidyups
'Febspeed','Janspeed',
'twin-start','twin-spark',
//end BTCC
//
//LMES 
//chassis
'Leicester Torn LMP','Lister Storm LMP',
'Loller B01/60 / NG EX257','Lola B01/60 / MG EX257',
'Dallama LMP','Dallara LMP',
'Retro Vet D5-R','Corvette C5-R',
'Xitech 3ES','Zytek 03S',
'Danos LMP','Panoz LMP07',
'Helter Racing LMP','Welter Racing LMP',
'Bavarian B3 GTR 2003','BMW M3 GTR 2003',
'Xitech 4ES','Zytek 04S',
'Arson Merlin GBR19','Aston Martin DBR9',
'Tetley Race 8','Bentley Speed 8',
'Lantorino Embargo R-GT','Lamborghini Murcielago R-GT',
'Toy Yoda Trooper','Toyota Supra',
'Bavarian B3 GTR 2004','BMW M3 GTR 2004',
'Tillgreen DT93','Pilbeam MP93',
'Odee K8','Audi R8',
'Lodge Fighter GTS-R','Dodge Viper GTS-R',
'Porca GG6 PT3 RSR','Porsche GT3 996 RSR',
'Gunnage C65','Courage C65',
'Monte Carlo Gunnage C60','Pescarolo Courage C60',
'Trevor 44R','TVR 440R',
'Lantorino Tomato','Lamborghini Gallardo',
'Bavarian B3 GTR','BMW M3 GTR',
//engines
'Odee 3.6L V8','Audi 3.6L V8',
'Tetley 3.6L V8','Bentley 3.6L V8',
'Xitech 4L V8','Zytek 4L V8',
'Jude GV4','Judd GV4',
'Jude KV675','Judd KV675',
'AIR P07 I4','AER P07 I4',
'Pogo ES9J4S','Peugeot ES9J4S',
'Toy Yoda','Toyota V8',
'Lodge V10','Dodge V10',
'Bavarian V8','BMW V8',
'Trevor Six','TVR Straight Six',
'Porka Flat 6','Porsche Flat 6',
'Lantorino V12','Lamborghini V12',
'Lantorino','Lamborghini V10',
//tidyups
'Dallama','Dallara',
'Monte Carlo','Pescarolo',
'Race 8','Speed 8',
'was built for NG in 2001','was built for MG in 2001',
'team as the NG EX.257','team as the MG EX.257',
'Loller','Lola',
'DT93','MP93',
'HR was one','WR was one',
'GBR19','DBR9',
'The D5-R was based on the D5 road car','The C5-R was based on the C5 road car',
'Lodge Fighter','Dodge Viper',
'The Trooper is a successfull race car','The Supra is a successful race car',
'Embargo','Murcielago',
'Arson Merlin','Aston Martin',
'Odee','Audi',
'Gunnage','Courage',
'Xitech','Zytek',
'Bavarian Motorsport originally','BMW Motorsport originally',
'2004 spec B3 GTR','2004 spec M3 GTR',
'The Tomato is the smaller','The Gallardo is the smaller',
'Porca','Porsche',
'competition PT3, the PT3 RSR','competition GT3, the GT3 RSR',
'Porka\'s','Porsches',
'- the GB19 -','- the DB9 -',
'GB19','DB9',
'marque it\'s','marque its',
'Danos','Panoz',
'excells','excels',
'Pogo L4','Peugeot L4',
'Mantra 13J','Mazda 13J',
'Moogun','Mugen',
'Jude GV5','Judd GV5',
'Mope-R','Mopar',
'General Mofos LS1 V8','General Motors LS1 V8',
'Mylar','Chrysler',
'the prototype racer again proved','the four-ringed prototype racer again proved',
'Bankrupt Kaynard company','bankrupt Reynard company',
'440 BHP','440 bhp',
'Writer Engineering','Reiter Engineering',
'Engineering Company Zytek','Engineering company Zytek',
'Lamborghini V10 developed the','Lamborghini developed the',
//end LMES
//
//GP2
'Reno V8','Renault V8',
'GP Two','GP2',
//end GP2
//
//DTM
'O4 DT','A4 DTM',
'O4. Codenamed','A4. Codenamed',
'O4. Internally','A4. Internally',
'Mernandez C Class DT','Mercedes-Benz C Class DTM',
//end DTM
//
//Bat7
'Donkeycourt','Donkervoort',
'Gherkin','Birkin',
'Ffordd','Ford',
'Loroast','Locost',
'Sushi','Suzuki',
'Bover','Rover',
'Streaker','Striker',
'Cowarati','Kawasaki',
'Lion','Tiger',
'MAX Whoosh','DAX Rush',
'Codworth','Cosworth',
'Wheatfield','Westfield',
'Rotherham','Caterham',
'Zed-Tech','Zetec',
'Toyota V8 1.6','Toyota 1.6',
//end Bat7
//
//F3
'ZLC','SLC',
'Monkswagon','Volkswagen',
'Mywhale','Mygale',
'CartTek','ArtTech',
'CartTech','ArtTech',
//end F3
//
//Champcar
'Kaynard','Reynard',
'Peskie','Penske',
'Loller','Lola',
//end Champcar
//
//V8SC
'Holder 8 setup parameters.','Holden 8 setup parameters.',
//end V8SC
//
//CTA
//chassis
'Macadam','Mercury',
'ABC','AMC',
'Pugworth','Plymouth',
'Ponytrap','Pontiac',
'AMC Spear','AMC Javelin',
'Mustard GT350R','Mustang GT350R',
'Retro Congo','Chevrolet Camaro',
'Ford Tango','Ford Torino',
'Pontiac Firegoose','Pontiac Firebird',
'Mustard Boss','Mustang Boss',
'Plymouth Barrichello','Plymouth Barracuda',
'Mercury Cheetah','Mercury Cougar',
'Pontiac Cross-Am','Pontiac Trans-Am',
'Lodge Hustler','Dodge Challenger',
'Ford Mustard','Ford Mustang',
//engines
'Retro 305ci','Chevrolet 305ci',
//misc tidyups
'General Mofos','General Motors',
'Lodge was the','Dodge was the',
'the Hustler. The Hustler','the Challenger. The Challenger',
'The Firegoose was','The Firebird was',
'for Tango.','for the Torino.',
'said the Tango','said the Torino',
'Mach 1 Mustard','Mach 1 Mustang',
'Congo/Firegoose','Camaro/Firebird',
'The new Spears','The new Javelin',
'The Spear won','The Javelin won',
'the Congo could','the Camaro could',
'the Mustard','the Mustang',
'population.The','population. The',
'Cross Am','Trans Am',
'small-bock Mustard','small-block Mustang',
'short-desck','short-deck',
//end CTA
//
//F1 97
//chassis
'Wallace','Williams',
'Dart','Arrows',
'Team Wales','Ferrari',
'Beleton','Benetton',
'McLewis','McLaren',
'Jodran','Jordan',
'posRT','Prost',
'Bauber','Sauber',
'Rytell','Tyrrell',
'Rinaldi','Minardi',
'STEWA','Stewart',
//engines
'Retrogas','Petrobras',
'Zed-Tec-R','Zetec-R',
'Yahama','Yamaha',
'Welsh 0/2','Ferrari 052',
'Bart 830','Hart 830',
//descrips
'Ligar','Ligier',
'Mistresscard','Mastercard',
'Freddie Jordan','Eddie Jordan',
'Bravio Minotauri','Flavio Briatore',
'John Simms','Jackie Stewart',
'Todd Warburton','Tom Walkinshaw',
'rebadged Welsh engines','rebadged Ferrari engines',
'GP \'97','F1 1997',
//end 97
//
//globals
'Mernandez','Mercedes',
'Hinda','Honda',
'Pogo','Peugeot',
' Iii','',
' Ii','',
' Iv','',
//end globals
//
//set renames
'GP 2010','F1 2010',
'GP 2009','F1 2009',
'GP 2008','F1 2008',
'GP 2007','F1 2007',
'Classic 86','F1 1986',
'Classic 97','F1 1997',
'German Tourers','DTM',
'Formula Nations','A1GP',
'Mid-Engined World Series','MR2 World Series',
'Champion Cars v2.0','Champcar Generic Championship v2.0',
'Champion Cars','Champcar Generic Championship',
'Classic All-American Series','Classic Trans-Am',
'British Tourers','BTCC Generic Championship',
'V8S','V8 Supercars',
'LMES v2.0','Le Mans Endurance Series v2.0',
//end set renames
//
//various final renames
'Peugeot/Sodemo 386','Peugeot 306',
'Peugeot/Sodemo 486','Peugeot 406',
'Peugeot 486','Peugeot 406',
'Peugeot 386','Peugeot 306',
'NB Rover','MG Rover',
'Beeswax','Dartford'
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
