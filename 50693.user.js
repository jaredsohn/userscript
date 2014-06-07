// ==UserScript==
// @name           The Family
// @namespace      GLB
// @include        http://goallineblitz.com/game/forum*
// ==/UserScript==

// You must update this value whenever you add or remove family members!
var FAMILY_SIZE = 298;      // FYI: Throg420 is last entry
var family = new Array(FAMILY_SIZE*2);
var ctr = 0;

family[ctr++] = '1';        // Bort
family[ctr++] = 'Flex Overlord';

family[ctr++] = '143852';   // GmanV2
family[ctr++] = 'The Don';
family[ctr++] = '254450';   // Jocebabe
family[ctr++] = 'The Don\'s Dame';

family[ctr++] = '106109';   // Ben Sanderson
family[ctr++] = 'Special F\'ing Rank';
family[ctr++] = '15678';    // Brutus Buckeye
family[ctr++] = 'SA Council';
family[ctr++] = '160751';   // fordfan98
family[ctr++] = 'SA Council';
family[ctr++] = '26951';    // IAMNH
family[ctr++] = 'SA Council';
family[ctr++] = '47254';    // Mat McBriar
family[ctr++] = 'SA Council';
family[ctr++] = '147831';   // Stonewall
family[ctr++] = 'SA Council';
family[ctr++] = '96785';    // trentw
family[ctr++] = 'The Original Addict';
family[ctr++] = '113328';   // valakar
family[ctr++] = 'SA Council';

family[ctr++] = '106877';   // a49erfan77
family[ctr++] = 'UnderDon, IAC';
family[ctr++] = '82630';    // animusmax
family[ctr++] = 'UnderDon';
family[ctr++] = '86149';    // BadgerPhil
family[ctr++] = 'UnderDon';
family[ctr++] = '82459';    // Beeerad37
family[ctr++] = 'UnderDon';
family[ctr++] = '119434';   // Cutbait
family[ctr++] = 'UnderDon';
family[ctr++] = '35471';    // DAWG
family[ctr++] = 'UnderDon';
family[ctr++] = '39385';    // grandavenue
family[ctr++] = 'UD, HOF, SAC';
family[ctr++] = '92757';    // jmorgalis
family[ctr++] = 'UnderDon';
family[ctr++] = '164503';   // jonnyGoBlue
family[ctr++] = 'UnderDon, IAC';
family[ctr++] = '182188';   // mcnastasty
family[ctr++] = 'UnderDon';
family[ctr++] = '228269';   // reddogrw
family[ctr++] = 'Money Launderer';
family[ctr++] = '8921';     // robbnva
family[ctr++] = 'UD, IAC, Admiss.';
family[ctr++] = '175464';   // Roger6363
family[ctr++] = 'UnderDon, IAC, XO';
family[ctr++] = '22003';    // Stumaloo
family[ctr++] = 'UnderDon, Europe';
family[ctr++] = '27617';    // superpunk
family[ctr++] = 'UnderDon';
family[ctr++] = '112707';   // Tareton
family[ctr++] = 'UnderDon';
family[ctr++] = '51291';    // Vitamin Water
family[ctr++] = 'UnderDon, IAC';

family[ctr++] = '76408';    // Ahoda
family[ctr++] = 'Forum Czar';
family[ctr++] = '258177';   // batsboy
family[ctr++] = 'Boss';
family[ctr++] = '28791';    // blazzinken
family[ctr++] = 'Boss';
family[ctr++] = '84137';    // briano32
family[ctr++] = 'Boss';
family[ctr++] = '89016';    // ChuckMo26
family[ctr++] = 'Boss';
family[ctr++] = '611';      // coachviking
family[ctr++] = 'Boss';
family[ctr++] = '164382';   // CoolChuck
family[ctr++] = 'Boss';
family[ctr++] = '85948';    // CTGuyton
family[ctr++] = 'Draft Boss, IAC';
family[ctr++] = '18490';    // ddcunderground
family[ctr++] = 'Boss';
family[ctr++] = '138364';   // Drewsky
family[ctr++] = 'Boss';
family[ctr++] = '64270';    // fbfan18
family[ctr++] = 'Boss';
family[ctr++] = '180858';   // gocincinnati
family[ctr++] = 'Boss, IAC';
family[ctr++] = '109966';   // Illig INC
family[ctr++] = 'Boss';
family[ctr++] = '56875';    // joecabezuela
family[ctr++] = 'Boss';
family[ctr++] = '7286';     // Kevin71
family[ctr++] = 'Boss';
family[ctr++] = '114140';   // King of Bling!
family[ctr++] = 'Boss';
family[ctr++] = '94190';    // klite_98
family[ctr++] = 'Boss';
family[ctr++] = '172509';   // Maddencoach
family[ctr++] = 'Boss';
family[ctr++] = '28621';    // NSab
family[ctr++] = 'Boss';
family[ctr++] = '32647';    // numone
family[ctr++] = 'Boss';
family[ctr++] = '91676';    // QueenBee
family[ctr++] = 'Boss';
family[ctr++] = '375';      // rjssob
family[ctr++] = 'Boss';
family[ctr++] = '180398';   // STEEL CURTA1N
family[ctr++] = 'Boss';
family[ctr++] = '81931';    // SyedAshrafulla
family[ctr++] = 'Boss';
family[ctr++] = '55471';    // thechief58831
family[ctr++] = 'Boss';
family[ctr++] = '28103';    // turkishkamel
family[ctr++] = 'Boss';
family[ctr++] = '122583';   // Vallic
family[ctr++] = 'Boss';

family[ctr++] = '114567';   // BillSaidSux
family[ctr++] = 'UnderBoss';
family[ctr++] = '72719';    // Blitz_Inc.
family[ctr++] = 'UnderBoss';
family[ctr++] = '17770';    // Bone Saw
family[ctr++] = 'UnderBoss';
family[ctr++] = '124867';   // CaptainUniverse
family[ctr++] = 'UnderBoss';
family[ctr++] = '120125';   // Chivas
family[ctr++] = 'UnderBoss';
family[ctr++] = '94225';    // Darwood
family[ctr++] = 'UnderBoss';
family[ctr++] = '77165';    // DisfrigginGuy
family[ctr++] = 'UnderBoss';
family[ctr++] = '169008';   // DL24
family[ctr++] = 'UnderBoss';
family[ctr++] = '206676';   // drake262
family[ctr++] = 'UnderBoss';
family[ctr++] = '161809';   // dyehardfan
family[ctr++] = 'UnderBoss';
family[ctr++] = '34305';    // FondestMemory
family[ctr++] = 'UnderBoss';
family[ctr++] = '127498';   // havefun
family[ctr++] = 'UnderBoss';
family[ctr++] = '172644';   // Hays23
family[ctr++] = 'UnderBoss';
family[ctr++] = '99309';    // James128
family[ctr++] = 'UnderBoss';
family[ctr++] = '293038';   // Jimmy Hoffa
family[ctr++] = 'UnderBoss';
family[ctr++] = '257709';   // Max Zorin
family[ctr++] = 'UnderBoss';
family[ctr++] = '114340';   // Mickyt1985
family[ctr++] = 'UnderBoss';
family[ctr++] = '26502';    // Milanese
family[ctr++] = 'UnderBoss';
family[ctr++] = '140069';   // mingo23
family[ctr++] = 'UnderBoss';
family[ctr++] = '317820';   // MumblesSteel
family[ctr++] = 'UnderBoss';
family[ctr++] = '130052';   // outsiderrule
family[ctr++] = 'UnderBoss';
family[ctr++] = '221391';   // patbruegg
family[ctr++] = 'UnderBoss';
family[ctr++] = '70474';    // pjkuchta
family[ctr++] = 'UnderBoss';
family[ctr++] = '81337';    // Pnocida
family[ctr++] = 'UnderBoss';
family[ctr++] = '83070';    // RandomBeast
family[ctr++] = 'UnderBoss';
family[ctr++] = '64915';    // Shalubis
family[ctr++] = 'UnderBoss';
family[ctr++] = '128521';   // slappdogg
family[ctr++] = 'UnderBoss';
family[ctr++] = '116880';   // Speedcat622
family[ctr++] = 'UnderBoss';
family[ctr++] = '4939';     // Stobie
family[ctr++] = 'UnderBoss';
family[ctr++] = '138266';   // Tackleb0x
family[ctr++] = 'UnderBoss';
family[ctr++] = '73834';    // Talon
family[ctr++] = 'UnderBoss';
family[ctr++] = '7934';     // The_Burning_Bush
family[ctr++] = 'UnderBoss';
family[ctr++] = '83813';    // timthorn
family[ctr++] = 'UnderBoss';
family[ctr++] = '68894';    // TokenFlexican
family[ctr++] = 'UnderBoss';
family[ctr++] = '73112';    // TuNice
family[ctr++] = 'UnderBoss';
family[ctr++] = '79654';    // Ubasstards
family[ctr++] = 'UnderBoss';
family[ctr++] = '120963';   // USCGuardsmen
family[ctr++] = 'UnderBoss';
family[ctr++] = '121279';   // WalterManning
family[ctr++] = 'WalterManning';
family[ctr++] = '36086';    // Whipsnard
family[ctr++] = 'UnderBoss';
family[ctr++] = '41240';    // youngJP90
family[ctr++] = 'UnderBoss';
family[ctr++] = '77180';    // Zoblefu
family[ctr++] = 'UnderBoss';

family[ctr++] = '66005';    // Guppy, Inc
family[ctr++] = 'Admiral';

family[ctr++] = '50143';    // adamczyk
family[ctr++] = 'Capo';
family[ctr++] = '214935';   // atomicrooster
family[ctr++] = 'Capo';
family[ctr++] = '68372';    // atom871
family[ctr++] = 'Capo';
family[ctr++] = '70612';    // Batman540
family[ctr++] = 'Capo';
family[ctr++] = '1105';     // bhayesp
family[ctr++] = 'Capo';
family[ctr++] = '60598';    // blln4lyf
family[ctr++] = 'Capo';
family[ctr++] = '77554';    // bluto
family[ctr++] = 'Capo';
family[ctr++] = '272145';   // B-Raz
family[ctr++] = 'Capo';
family[ctr++] = '104251';   // BubbaBeans
family[ctr++] = 'Capo';
family[ctr++] = '161968';   // buck n rut
family[ctr++] = 'Capo';
family[ctr++] = '129130';   // Buer
family[ctr++] = 'Capo';
family[ctr++] = '121888';   // Cadillac24
family[ctr++] = 'Capo';
family[ctr++] = '101928';   // cowcards
family[ctr++] = 'Capo';
family[ctr++] = '240281';   // Cryptotich
family[ctr++] = 'Capo';
family[ctr++] = '169411';   // cwisler
family[ctr++] = 'Capo';
family[ctr++] = '173081';   // dzer13
family[ctr++] = 'Capo';
family[ctr++] = '5565';     // Ewiv
family[ctr++] = 'Capo';
family[ctr++] = '170057';   // f3arfire
family[ctr++] = 'Capo';
family[ctr++] = '59348';    // Firenze
family[ctr++] = 'Capo';
family[ctr++] = '105725';   // fixxxer101
family[ctr++] = 'Capo';
family[ctr++] = '279537';   // Flowing Willow
family[ctr++] = 'Capo';
family[ctr++] = '160435';   // The Garbone
family[ctr++] = 'Capo';
family[ctr++] = '144427';   // geturembedder
family[ctr++] = 'Capo';
family[ctr++] = '2512';     // hairic
family[ctr++] = 'Capo';
family[ctr++] = '122735';   // Hate Sighed
family[ctr++] = 'Capo';
family[ctr++] = '62549';    // Hobo
family[ctr++] = 'Capo';
family[ctr++] = '10499';    // jallowe
family[ctr++] = 'Capo';
family[ctr++] = '8959';     // jimmyhoffa
family[ctr++] = 'Capo';
family[ctr++] = '182183';   // JTsNiners
family[ctr++] = 'Capo';
family[ctr++] = '139976';   // JustinFoster
family[ctr++] = 'Capo';
family[ctr++] = '146348';   // Kegstand317
family[ctr++] = 'Capo';
family[ctr++] = '172443';   // KINGOFOKC
family[ctr++] = 'Capo';
family[ctr++] = '69';       // Lava124
family[ctr++] = 'Capo';
family[ctr++] = '60761';    // lemdog
family[ctr++] = 'Capo';
family[ctr++] = '220482';   // liteup1
family[ctr++] = 'Capo';
family[ctr++] = '40328';    // lizrdgizrd
family[ctr++] = 'Capo';
family[ctr++] = '137118';   // MeauxJeaux
family[ctr++] = 'Capo';
family[ctr++] = '79768';    // Modok
family[ctr++] = 'Capo';
family[ctr++] = '175513';   // Mr Yakov
family[ctr++] = 'Capo';
family[ctr++] = '15760';    // muck dawgs
family[ctr++] = 'Capo';
family[ctr++] = '161589';   // otterpop
family[ctr++] = 'Capo';
family[ctr++] = '70176';    // PackMan97
family[ctr++] = 'Capo';
family[ctr++] = '43594';    // r8
family[ctr++] = 'Capo';
family[ctr++] = '123597';   // Remi78
family[ctr++] = 'Capo';
family[ctr++] = '44567';    // rip_city
family[ctr++] = 'Capo';
family[ctr++] = '65381';    // Seric
family[ctr++] = 'Capo';
family[ctr++] = '152420';   // SGTSCHU
family[ctr++] = 'Capo';
family[ctr++] = '22160';    // ShakeNBake
family[ctr++] = 'Capo';
family[ctr++] = '5327';     // Sir Snootch
family[ctr++] = 'Capo';
family[ctr++] = '71910';    // ssupermans
family[ctr++] = 'Capo';
family[ctr++] = '231957';   // steve6787
family[ctr++] = 'Capo';
family[ctr++] = '31592';    // StiffarmSteve
family[ctr++] = 'Capo';
family[ctr++] = '57644';    // Stumanroo
family[ctr++] = 'Capo';
family[ctr++] = '206666';   // The Avenger
family[ctr++] = 'Capo';
family[ctr++] = '19744';    // The Sandman
family[ctr++] = 'Capo';
family[ctr++] = '4843';     // UCLABUCSFAN
family[ctr++] = 'Capo';
family[ctr++] = '9299';     // Virgin Goldstandard
family[ctr++] = 'Capo';
family[ctr++] = '140740';   // Xero00
family[ctr++] = 'Capo';

family[ctr++] = '71930';    // 49ers4life52
family[ctr++] = 'Captain';
family[ctr++] = '135086';   // aces250
family[ctr++] = 'Captain';
family[ctr++] = '173017';   // Alex2544
family[ctr++] = 'Captain';
family[ctr++] = '87662';    // Argonut
family[ctr++] = 'Captain';
family[ctr++] = '81382';    // beachsand
family[ctr++] = 'Captain';
family[ctr++] = '17379';    // BellyCheck
family[ctr++] = 'Captain';
family[ctr++] = '48966';    // bigfatguy64
family[ctr++] = 'Captain';
family[ctr++] = '206653';   // bodhisfattva
family[ctr++] = 'Captain';
family[ctr++] = '278206';   // Bogleg
family[ctr++] = 'Captain';
family[ctr++] = '8142';     // Boomer82
family[ctr++] = 'Captain';
family[ctr++] = '215822';   // bovnok
family[ctr++] = 'Captain';
family[ctr++] = '315517';   // bree29
family[ctr++] = 'Captain';
family[ctr++] = '157496';   // CandaceParker3
family[ctr++] = 'Captain';
family[ctr++] = '31528';    // carbene
family[ctr++] = 'Captain';
family[ctr++] = '280946';   // chinchillas sword
family[ctr++] = 'Captain';
family[ctr++] = '14645';    // cincredfan
family[ctr++] = 'Captain';
family[ctr++] = '195997';   // coachingubigr
family[ctr++] = 'Captain';
family[ctr++] = '112050';   // creeker22
family[ctr++] = 'Captain';
family[ctr++] = '47749';    // Darren Sanders
family[ctr++] = 'Captain, IAC';
family[ctr++] = '39876';    // Daydreamer
family[ctr++] = 'Captain';
family[ctr++] = '229238';   // FIRExAxNxT
family[ctr++] = 'Captain';
family[ctr++] = '26830';    // Gazeruth
family[ctr++] = 'Captain';
family[ctr++] = '150784';   // glwarriors
family[ctr++] = 'Captain';
family[ctr++] = '125744';   // Its Orange Baby
family[ctr++] = 'Captain';
family[ctr++] = '196327';   // JcWildcat
family[ctr++] = 'Captain';
family[ctr++] = '152129';   // JefT@nk
family[ctr++] = 'Captain';
family[ctr++] = '202276';   // jesusbong
family[ctr++] = 'Captain';
family[ctr++] = '250371';   // jesusmp2000
family[ctr++] = 'Captain';
family[ctr++] = '108903';   // josh5
family[ctr++] = 'Captain';
family[ctr++] = '10040';    // jpjn94
family[ctr++] = 'Captain';
family[ctr++] = '14800';    // jrry32
family[ctr++] = 'Captain';
family[ctr++] = '143352';   // kzak58
family[ctr++] = 'Captain';
family[ctr++] = '10570';    // Larry Roadgrader
family[ctr++] = 'Captain';
family[ctr++] = '53936';    // LionsFan0513
family[ctr++] = 'Captain';
family[ctr++] = '158847';   // Mo_The_Man
family[ctr++] = 'Captain';
family[ctr++] = '5025';     // ms4351
family[ctr++] = 'Captain';
family[ctr++] = '170095';   // NickS
family[ctr++] = 'Captain';
family[ctr++] = '167722';   // OSshane
family[ctr++] = 'Captain';
family[ctr++] = '32652';    // Outlaw Dogs
family[ctr++] = 'Captain';
family[ctr++] = '19744';    // PeaceAndLove
family[ctr++] = 'Captain';
family[ctr++] = '121877';   // phrog
family[ctr++] = 'Captain';
family[ctr++] = '191550';   // Quas
family[ctr++] = 'Captain';
family[ctr++] = '271943';   // Rayzerx
family[ctr++] = 'Captain';
family[ctr++] = '70959';    // Ruleslawyer
family[ctr++] = 'Captain';
family[ctr++] = '7114';     // Sabataged DTD
family[ctr++] = 'Captain';
family[ctr++] = '108046';   // Silvablitz
family[ctr++] = 'Captain';
family[ctr++] = '83528';    // skeetersmif
family[ctr++] = 'Captain';
family[ctr++] = '78077';    // Slipknaught
family[ctr++] = 'Captain';
family[ctr++] = '186014';   // Spicy McHaggis
family[ctr++] = 'Captain';
family[ctr++] = '226593';   // Sweet Jesus
family[ctr++] = 'Captain';
family[ctr++] = '153804';   // T3muJin
family[ctr++] = 'Captain';
family[ctr++] = '32277';    // TG
family[ctr++] = 'Captain';
family[ctr++] = '165667';   // therussells24
family[ctr++] = 'Captain';
family[ctr++] = '127909';   // TyrannyVaunt
family[ctr++] = 'Captain';
family[ctr++] = '105170';   // vinman
family[ctr++] = 'Captain';
family[ctr++] = '214043';   // wrw47
family[ctr++] = 'Captain';



family[ctr++] = '16849';    // |40niners1
family[ctr++] = 'Soldier';
family[ctr++] = '146504';   // Adam Allison
family[ctr++] = 'Soldier';
family[ctr++] = '300829';   // agr383
family[ctr++] = 'Soldier';
family[ctr++] = '145677';   // asknoquarter21
family[ctr++] = 'Soldier';
family[ctr++] = '124969';   // BarroomHeroes
family[ctr++] = 'Soldier';
family[ctr++] = '19443';    // BayouBobby
family[ctr++] = 'Soldier';
family[ctr++] = '24146';    // bear4life21
family[ctr++] = 'Soldier';
family[ctr++] = '38910';    // BigNugg
family[ctr++] = 'Soldier';
family[ctr++] = '164803';   // bleedsorangeandblue
family[ctr++] = 'Soldier';
family[ctr++] = '250831';   // BlitZxSiN
family[ctr++] = 'Soldier';
family[ctr++] = '109874';   // bobdakota
family[ctr++] = 'Soldier';
family[ctr++] = '73056';    // bpkcchiefs
family[ctr++] = 'Soldier';
family[ctr++] = '143099';   // Browner389
family[ctr++] = 'Soldier';
family[ctr++] = '27416';    // CableJelly
family[ctr++] = 'Soldier';
family[ctr++] = '121597';   // cashpath
family[ctr++] = 'Soldier';
family[ctr++] = '105449';   // Charles Fridholm
family[ctr++] = 'Soldier';
family[ctr++] = '8937';     // Clutch24
family[ctr++] = 'Soldier';
family[ctr++] = '105378';   // conanrex
family[ctr++] = 'Soldier';
family[ctr++] = '254591';   // CrimsonTide4Life
family[ctr++] = 'Soldier';
family[ctr++] = '140814';   // curtishall06
family[ctr++] = 'Soldier';
family[ctr++] = '71429';    // DavidD458
family[ctr++] = 'Soldier';
family[ctr++] = '2518';     // daynje
family[ctr++] = 'Soldier';
family[ctr++] = '314549';   // deernturkey16
family[ctr++] = 'Soldier';
family[ctr++] = '27035';    // Derek McFadden
family[ctr++] = 'Soldier';
family[ctr++] = '77165';    // DisFrigginGuy
family[ctr++] = 'Soldier';
family[ctr++] = '114424';   // Dr. Acula
family[ctr++] = 'Soldier';
family[ctr++] = '108261';   // Dr. Showtime
family[ctr++] = 'Soldier';
family[ctr++] = '20595';    // epictetus
family[ctr++] = 'Soldier';
family[ctr++] = '50718';    // ericarnold86
family[ctr++] = 'Soldier';
family[ctr++] = '97025';    // FREZ
family[ctr++] = 'Soldier';
family[ctr++] = '246239';   // goldielax25
family[ctr++] = 'Soldier';
family[ctr++] = '208477';   // griffin8r
family[ctr++] = 'Soldier';
family[ctr++] = '93220';    // heavyd
family[ctr++] = 'Soldier';
family[ctr++] = '10871';    // Herman Moore
family[ctr++] = 'Soldier';
family[ctr++] = '185161';   // Himura
family[ctr++] = 'Soldier';
family[ctr++] = '78759';    // HTFC
family[ctr++] = 'Soldier';
family[ctr++] = '16099';    // imnotthatstupid
family[ctr++] = 'Soldier';
family[ctr++] = '12039';    // IrishEyes
family[ctr++] = 'Soldier';
family[ctr++] = '279522';   // JackBeQuick
family[ctr++] = 'Soldier';
family[ctr++] = '80450';    // Jack the Wolf
family[ctr++] = 'Soldier';
family[ctr++] = '317106';   // jaybird77
family[ctr++] = 'Soldier';
family[ctr++] = '195641';   // KangarWhoDey
family[ctr++] = 'Soldier';
family[ctr++] = '260367';   // Kenshinzen
family[ctr++] = 'Soldier';
family[ctr++] = '94067';    // Knick
family[ctr++] = 'Soldier';
family[ctr++] = '127345';   // kswass
family[ctr++] = 'Soldier';
family[ctr++] = '141666';   // Loco Moco
family[ctr++] = 'Soldier';
family[ctr++] = '258383';   // Loonzilla
family[ctr++] = 'Soldier';
family[ctr++] = '179774';   // mad beaver
family[ctr++] = 'Soldier';
family[ctr++] = '137118';   // MeauxJeaux
family[ctr++] = 'Soldier';
family[ctr++] = '226006';   // MG81
family[ctr++] = 'Soldier';
family[ctr++] = '104460';   // midgensa
family[ctr++] = 'Soldier';
family[ctr++] = '170319';   // mlbtrader
family[ctr++] = 'Soldier';
family[ctr++] = '6970';     // MunkeeWired
family[ctr++] = 'Soldier';
family[ctr++] = '76813';    // nightstar289
family[ctr++] = 'Soldier';
family[ctr++] = '11977';    // NSchmidt10
family[ctr++] = 'Soldier';
family[ctr++] = '60022';    // popo1010
family[ctr++] = 'Soldier';
family[ctr++] = '274926';   // purpleandgold
family[ctr++] = 'Soldier';
family[ctr++] = '211004';   // Randolf
family[ctr++] = 'Soldier';
family[ctr++] = '62586';    // rimfalk
family[ctr++] = 'Soldier';
family[ctr++] = '67465';    // Roctronic
family[ctr++] = 'Soldier';
family[ctr++] = '12352';    // Rube
family[ctr++] = 'Soldier';
family[ctr++] = '15355';    // rutgar
family[ctr++] = 'Soldier';
family[ctr++] = '110096';   // ryan_grant-25
family[ctr++] = 'Soldier';
family[ctr++] = '48780';    // sdspawn
family[ctr++] = 'Soldier';
family[ctr++] = '140580';   // Seth0194
family[ctr++] = 'Soldier';
family[ctr++] = '196999';   // shepster
family[ctr++] = 'Soldier';
family[ctr++] = '85976';    // shellfishdiver
family[ctr++] = 'Soldier';
family[ctr++] = '14554';    // Sik Wit It
family[ctr++] = 'Soldier';
family[ctr++] = '21619';    // Skarie1523
family[ctr++] = 'Soldier';
family[ctr++] = '110236';   // stormstarhammer DTD
family[ctr++] = 'Soldier';
family[ctr++] = '162133';   // Talcion
family[ctr++] = 'Soldier';
family[ctr++] = '109848';   // tfishbone70
family[ctr++] = 'Soldier';
family[ctr++] = '85721';    // theodore327
family[ctr++] = 'Soldier';
family[ctr++] = '133578';   // Thorhammer
family[ctr++] = 'Soldier';
family[ctr++] = '228497';   // Tigam
family[ctr++] = 'Soldier';
family[ctr++] = '124505';   // Tigroklaws
family[ctr++] = 'Soldier';
family[ctr++] = '149384';   // tjanderson321
family[ctr++] = 'Soldier';
family[ctr++] = '90055';    // Toriq
family[ctr++] = 'Soldier';
family[ctr++] = '43892';    // tsimp93
family[ctr++] = 'Soldier';
family[ctr++] = '156633';   // trazer
family[ctr++] = 'Soldier';
family[ctr++] = '119599';   // Tyler King
family[ctr++] = 'Soldier';
family[ctr++] = '180646';   // walker1
family[ctr++] = 'Soldier';
family[ctr++] = '65732';    // Wei Wu Wei
family[ctr++] = 'Soldier';
family[ctr++] = '75418';    // White21
family[ctr++] = 'Soldier';



family[ctr++] = '16376';    // obijuan74
family[ctr++] = 'da Vinci';
family[ctr++] = '94649';    // babayoko DTD
family[ctr++] = 'Head Monkeeh';
family[ctr++] = '206676';   // Drake262
family[ctr++] = 'LOLDrake';
family[ctr++] = '91893';    // Jayadamo DTD
family[ctr++] = 'Reformed Soldier';
family[ctr++] = '106483';   // Throg420 DTD
family[ctr++] = 'Kingpin';




var NUM_HIT_LIST = 27;  // changing to 24 (updated 9/29/09)
var hit_list = new Array(NUM_HIT_LIST);
var hlctr = 0;

hit_list[hlctr++] = '70812';  // kgarlett
hit_list[hlctr++] = '63611';  // Veg
hit_list[hlctr++] = '82223';  // djmtott
hit_list[hlctr++] = '87775';  // H0wie Dewum
hit_list[hlctr++] = '59159';  // 321niloctaf
hit_list[hlctr++] = '148863'; // Ken-SHAMWOW
hit_list[hlctr++] = '39519';  // Cruzi
hit_list[hlctr++] = '19045';  // Himewad
hit_list[hlctr++] = '98671';  // jokerpac32
hit_list[hlctr++] = '100886'; // mccaskeyfootball
hit_list[hlctr++] = '5906';   // drrdutko
hit_list[hlctr++] = '14050';  // Mr. AdamZona
hit_list[hlctr++] = '181985'; // Mightyhalo
hit_list[hlctr++] = '105214'; // jlrock
hit_list[hlctr++] = '126930'; // getmoreho
hit_list[hlctr++] = '2027';   // The Strategy Expert
hit_list[hlctr++] = '77609';  // quzur(footballerhere)
hit_list[hlctr++] = '11608';  // Iruleall15
hit_list[hlctr++] = '90958';  // AZCowboysFan
hit_list[hlctr++] = '309275'; // FatAlbert69
hit_list[hlctr++] = '5910';   // dunkonyou88
hit_list[hlctr++] = '16229';  // voodoovos
hit_list[hlctr++] = '245106'; // BDean9217
hit_list[hlctr++] = '13773';  // Shadow0682(Vortex3D)
hit_list[hlctr++] = '130017'; // raiders4life23
hit_list[hlctr++] = '27481';  // meathead013
hit_list[hlctr++] = '224827'; // David Stern (aka DPRIDE)
hit_list[hlctr++] = '264750'; // coastiemike

function getElementsByClassName(classname, par){
   var a=[];
   var re = new RegExp('\\b' + classname + '\\b');
   var els = par.getElementsByTagName("*");
   for(var i=0,j=els.length; i<j; i++){
      if(re.test(els[i].className)){
         a.push(els[i]);
      }
   }
   return a;
};

function findNameOfFamily(test)
{
   var ValidChars = "0123456789";
   var userString = '/game/home.pl?user_id=';

   for( var i = 0; i < family.length; i += 2 )
   {
      if( (test.innerHTML.indexOf(userString + family[i], 0) >= 0) &&
          (ValidChars.indexOf(
            test.innerHTML.charAt(
             parseInt(test.innerHTML.indexOf(userString + family[i], 0)) + userString.length + family[i].length)) == -1) )
      {
         return i;
      }
   }

   return -1;
}

function findNameOfHitList(test)
{
   var ValidChars = "0123456789";
   var userString = '/game/home.pl?user_id=';
   for( var i=0; i < hit_list.length; i++ )
   {
      if( (test.innerHTML.indexOf(userString + hit_list[i], 0) >= 0) &&
          (ValidChars.indexOf(
            test.innerHTML.charAt(
             parseInt(test.innerHTML.indexOf(userString + hit_list[i], 0)) + userString.length + hit_list[i].length)) == -1) )
      {
         return i;
      }
   }

   return -1;
}

var els = getElementsByClassName('user_name', document);

for( var i=0,j=els.length; i < j; i++ )
{
   var fam_index = findNameOfFamily(els[i]);
   if( fam_index != -1 )
   {
      var online = getElementsByClassName('online', els[i])
      var offline = getElementsByClassName('offline', els[i])
      if( online.length > 0 )
      {
         els[i].removeChild(online[0])
      }
      if( offline.length > 0 )
      {
         els[i].removeChild(offline[0])
      }

//      els[i].innerHTML = els[i].innerHTML + '<b>' + family[fam_index+1] + '</b><br/>'
      els[i].innerHTML = els[i].innerHTML + '<b style="color:blue">' + family[fam_index+1] + '</b><br/>'
      if( online.length > 0 )
      {
         els[i].appendChild(online[0])
      }
      if( offline.length > 0 )
      {
         els[i].appendChild(offline[0])
      }
   }

   var hl_index = findNameOfHitList(els[i]);
   if( hl_index != -1 )
   {
      var online = getElementsByClassName('online', els[i])
      var offline = getElementsByClassName('offline', els[i])
      if( online.length > 0 )
      {
         els[i].removeChild(online[0])
      }
      if( offline.length > 0 )
      {
         els[i].removeChild(offline[0])
      }

      els[i].innerHTML = els[i].innerHTML + '<b>' + '---HIT LIST---' + '</b><br/>'

      if( online.length > 0 )
      {
         els[i].appendChild(online[0])
      }
      if( offline.length > 0 )
      {
         els[i].appendChild(offline[0])
      }
   }
}