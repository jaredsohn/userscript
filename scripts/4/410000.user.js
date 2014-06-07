// ==UserScript==
// @name        PayDay 2 skilltree Translator
// @namespace   http://www.pd2skills.info/*
// @description http://www.pd2skills.info/
// @include     http://www.pd2skills.info/*
// @version     1.01
// @grant       none
// @require     http://underscorejs.org/underscore-min.js
// ==/UserScript==
var $ = unsafeWindow.jQuery,
    allowConentChange = true,
    trees = {
        mastermind : [
            {
                id : 'skill-id-104842',
                nameEng : 'Unlocking the Mastermind',
                name : 'Mastermind Freischalten',
                basic : {
                   text : 'Der Mastermind ist ein manipulativer Anführer, der sich\n' +
                          'dadurch auszeichnet, jede Situation zu beherrschen.\n\n' +
                          'Der erste Punkt im Mastermind-Fertigkeitenbaum schaltet die\n'+
                          'Fähigkeit frei, die Arzttasche einzusetzen. Mit Hilfe der Arzttasche\n' +
                          'regeneriert sich die Gesundheit.\n\n' +
                          'Die Arzttasche verfügt über <strong>2</strong> ladungen'
                },
                ace : {},
                tier : {}
            },
            {
                id : 'skill-id-103472',
                nameEng : 'Cable Guy',
                name : 'Kabelmann',
                basic : {
                   text : 'Du fesselst Geiseln <strong>75%</strong> schneller.'
                },
                ace : {
                   text : 'Erhöht deinen Vorrat an Kablebindern um <strong>4</strong>.'
                },
                tier : {
                   text : 'Du interagierst mit der Arzttasche <strong>20%</strong> schneller.'
                }
            },
            {
                id : 'skill-id-103473',
                nameEng : 'Combat Medic',
                name : 'Sanitäter',
                basic : {
                   text : 'Für das Widerbeleben eines Crewmitgliedes verursachst du für <strong>10</strong> Sekunden <strong>25%</strong> mehr Schaden.'
                },
                ace : {
                   text : 'Wenn Du ein Crewmitglied wiederbelebst, gibst Du <strong>30%</strong> mehr\nGesundheit'
                },
                tier : {
                   text : 'Du interagierst mit der Arzttasche <strong>20%</strong> schneller.'
                }
            },
            {
                id : 'skill-id-104847',
                nameEng : 'Endurance',
                name : 'Durchhaltevermögen',
                basic : {
                   text : 'Erhöht deine Ausdauer um <strong>100%</strong>.',
                   skill : { 
                      skillName : 'health',
                      value : 100,
                      type : '%',
                      affected : 'you'
                   }
                },
                ace : {
                   text : 'Erhöht deine Ausdauer und die deiner Crew um <strong>50%</strong>.',
                    skill : { 
                       skillName : 'health',
                       value : 50,
                       type : '%',
                       affected : 'group'
                    }
                },
                tier : {
                   text : 'Du interagierst mit der Arzttasche <strong>20%</strong> schneller.'
                }
            },
            {
                id : 'skill-id-103479',
                nameEng : 'Inside Man',
                name : 'Inside Man',
                basic : {
                   text : 'Reduziert die Kosten für Gegenstände im Job-Überblick-Menü\num <strong>50%</strong>'
                },
                ace : {
                   text : 'Schaltet kaufbare Insider-Gegenstände im Job-Übersicht-Menü\nfrei,'
                },
                tier : {
                   text : 'Ausdauer für dich und deine Crew um <strong>15%</strong> erhöht.'
                }
            },
            {
                id : 'skill-id-103490',
                nameEng : 'Fast Learner',
                name : 'Schnellmerker',
                basic : {
                   text : 'Du erhälst <strong>15%</strong> mehr Erfahrung für das Abschließen von Tagen und Jobs.'
                },
                ace : {
                   text : 'Dein Team erhält <strong>20%</strong> mehr Erfahrung für das Abschließen von\nTagen und Jobs'
                },
                tier : {
                   text : 'Ausdauer für dich und deine Crew um <strong>15%</strong> erhöht.'
                }
            },
            {
                id : 'skill-id-103482',
                nameEng : 'Leadership',
                name : 'Führung',
                basic : {
                   text : 'Die Stabilität von Pistolen erhöht sich für dich und deine Crew um <strong>25%</strong>.'
                },
                ace : {
                   text : 'Die Stabilität aller Waffen erhöht sich für dich und Crew um <strong>50%</strong>'
                },
                tier : {
                   text : 'Ausdauer für dich und deine Crew um <strong>15%</strong> erhöht.'
                }
            },
            {
                id : 'skill-id-103483',
                nameEng : 'Smooth Talker',
                name : 'Schwätzer',
                basic : {
                   text : 'Du kannst jetzt erfolgreich <strong>4</strong> Pager anstelle von <strong>2</strong> beantworten.'
                },
                ace : {
                   text : 'Von dir gekennzeichnete Spezial-Gegner erleiden <strong>15%</strong> mehr\nSchaden'
                },
                tier : {
                   text : 'Erhöht Deine Schreireichweite um <strong>25%</strong>.'
                }
            },
            {
                id : 'skill-id-103484',
                nameEng : 'Equilibrium',
                name : 'Equilibrium',
                basic : {
                   text : 'Erhöht deine Genauigkeit deiner Pistole um <strong>10%</strong> und Du kannst\n' +
                          'Pistolen <strong>50%</strong> schneller ziehen und wegstecken.'
                },
                ace : {
                   text : 'Erhöht die Feuerrate deiner Pistole um <strong>100%</strong>.'
                },
                tier : {
                   text : 'Erhöht Deine Schreireichweite um <strong>25%</strong>.'
                }
            },
            {
                id : 'skill-id-104849',
                nameEng : 'Dominator',
                name : 'Bezwinger',
                basic : {
                   text : 'Du kannst einen Gegner einschüchtern. Kein Spezialgegner.' +
                          'Schwache Gegner ergeben sich leichter.'
                },
                ace : {
                   text : 'Macht und Reichweite diner Einschüchterung erhöhen sich um\n<strong>50%</strong>.'
                },
                tier : {
                   text : 'Erhöht Deine Schreireichweite um <strong>25%</strong>.'
                }
            },
            {
                id : 'skill-id-104851',
                nameEng : 'Stockholm Syndrome',
                name : 'Stockholm-Syndrom',
                basic : {
                   text : 'Zivilisten in deiner Nähe haben die Chance, dich wiederzubeleben,\n wenn du mit ihnen interagierst.'
                },
                ace : {
                   text : 'Zivilisten, die dich wiederbeleben, haben eine Chance dir Munition zu geben.'
                },
                tier : {
                   text : 'Erhöht die Gesundheit für dich und deine Crew um <strong>10%</strong>.'
                }
            },
            {
                id : 'skill-id-104852',
                nameEng : 'Combat Doctor',
                name : 'Feldarzt',
                basic : {
                   text : 'Du kannst jetzt <strong>2</strong> Arzttaschen hinlegen statt nur einer.'
                },
                ace : {
                   text : 'Deine Arzttaschen haben <strong>2</strong> mehr Ladungen'
                },
                tier : {
                   text : 'Erhöht die Gesundheit für dich und deine Crew um <strong>10%</strong>.'
                }
            },
            {
                id : 'skill-id-103485',
                nameEng : 'Joker',
                name : 'Joker',
                basic : {
                   text : 'Du kannst einen Gegner umdrehen, so dass er die Seite\n' +
                          'wechselt. Keine Spezialgegner.\n' +
                          'Vor dem Umdrehen muss er sich ergeben haben.'
                },
                ace : {
                   text : 'Der umgedrehte Gegner erhält <strong>55%</strong> mehr Gesundheit und\n' +
                          'verursacht <strong>45%</strong> mehr Schaden.'
                },
                tier : {
                   text : 'Erhöht die Gesundheit für dich und deine Crew um <strong>10%</strong>.'
                }
            },
            {
                id : 'skill-id-103487',
                nameEng : 'Black Marketeer',
                name : 'Schwartzmarkthändler',
                basic : {
                   text : 'Reduziert die Kosten aller deiner Einkäufe um <strong>10%</strong>.'
                },
                ace : {
                   text : 'Reduziert die Kosten aller deiner Einkäufe um <strong>40%</strong>. Auch Verkäufe\n' +
                          'sind jetzt <strong>25%</strong> lukrativer.'
                },
                tier : {
                   text : 'Du kannst Gegner <strong>65%</strong>. schneller umdrehen'
                }
            },
            {
                id : 'skill-id-103481',
                nameEng : 'Gunslinger',
                name : 'Revolverheld',
                basic : {
                   text : 'Du lädst <strong>50%</strong> schneller nach.'
                },
                ace : {
                   text : 'Deine Pistolen verursachen <strong>50%</strong> mehr Schaden.'
                },
                tier : {
                   text : 'Du kannst Gegner <strong>65%</strong> schneller umdrehen.'
                }
            },
            {
                id : 'skill-id-103491',
                nameEng : 'Kilmer',
                name : 'Kilmer',
                basic : {
                   text : 'Erhöht die Nachlade-Geschwindigkeit von Sturmgewehren um\n<strong>25%</strong>.'
                },
                ace : {
                   text : 'Deine Waffengenauigkeit mit Sturmgewehren in der Bewegung wird erhöht um <strong>50%</strong>.\n\n' +
                          'Rennen und nachladen - du kannst jetzt deine Waffe unterm Rennen nachladen.'
                },
                tier : {
                   text : 'Du kannst Gegner <strong>65%</strong> schneller umdrehen.'
                }
            },
            {
                id : 'skill-id-103477',
                nameEng : 'Control Freak',
                name : 'KontrollFreak',
                basic : {
                   text : 'Von dir erzeugter Lärm schüchtert Zivilisten ein.'
                },
                ace : {
                   text : 'Zivilisten bleiben <strong>50%</strong> länger eingeschüchtert.'
                },
                tier : {
                   text : 'Die Macht deiner Einschüchterung beim Schreien erhöht sich\n' + 
                          'um <strong>200%</strong>. Reduziert die Kosten der Vorteile im Jobübersichtsmenü um <strong>50%</strong>.'
                }
            },
            {
                id : 'skill-id-103478',
                nameEng : 'Pistol Messiah',
                name : 'Pistolen-Messias',
                basic : {
                   text : 'Während Du verblutest, wirst du sofort wiederbelebt, wenn du\n' +
                          'einen Gegner mit deiner Pistole tötest.  Du hast nir <strong>1</strong> Ladung(en)\n' +
                          'Deine Ladung wirt erneuert, wenn du aus der Haft entlassen\nwirst.'
                },
                ace : {
                   text : 'Du erhälst <strong>2</strong> weitere Ladungen. Deine Ladungen werden\n' +
                          'erneuert, wenn du aus der Haft entlassen wirst.'
                },
                tier : {
                   text : 'Die Macht deiner Einschüchterung beim Schreien erhöht sich\n' +
                          'um <strong>20%</strong>. reduziert die Kosten der Vorteile im\n' +
                          'Jobübersichtsmenü um <strong>50%</strong>'
                }
            },
            {
                nameEng : 'Inspire',
                name : 'Anfeuern',
                basic : {
                   text : 'Du kannst Crewmitglieder <strong>50%</strong> schneller wiederbeleben. Wenn\n' +
                          'du deine Crewmitglieder anschreist, bewegen sie sich <strong>10</strong>\n' +
                          'Sekunden <strong>20%</strong> schneller.'
                },
                ace : {
                   text : 'Du kannst Deine Crewmitglieder mit <strong>75%</strong> Wahrscheinlichkeit\n' +
                          'durch Anschreien aus der Entfernung wiederbeleben.'
                },
                tier : {
                   text : 'Die Macht deiner Einschüchterung beim Schreien erhöht sich\n' +
                          'um <strong>20%</strong>. reduziert die Kosten der Vorteile im\n' +
                          'Jobübersichtsmenü um <strong>50%</strong>'
                }
            }
        ],
        enforcer : [
            {
                id : 'skill-id-104864',
                nameEng : 'Unlocking the Enforcer',
                name : 'Vollstrecker Freischalten',
                basic : {
                   text : 'Der Vollstrecker ist ein rücksichtsloser Krimineller, der für\n' +
                          'gewöhnlich von Verbrechersyndikaten für Jobs angeheuert\n' +
                          'wird, die sonst niemand durchführen kann.\n\n' +
                          'Der erste Punkt im Vollstrecker-Fertigkeitenbaum schaltet die\n' +
                          'Möglichkeit frei, die Munitionstasche zu plazieren. Die\n' + 
                          'Munitionstasche kann dafür verwendet werden, sich Munition zu\n' +
                          'verschaffen.'
                },
                ace : {
                   text : ''
                },
                tier : {
                   text : ''
                }
            },
            {
                id : 'skill-id-103501',
                nameEng : 'Oppressor',
                name : 'Unterdrücker',
                basic : {
                   text : 'Deine Waffen bedroht Gegner <strong>25%</strong> mehr.'
                },
                ace : {
                   text : 'Deine Waffen bedrohen Gegner <strong>50%</strong> mehr.'
                },
                tier : {
                   text : 'Du bedrohst Gegner <strong>10%</strong> leichter.'
                }
            },
            {
                id : 'skill-id-103508',
                nameEng : 'Bullet Storm',
                name : 'Kugelhagel',
                basic : {
                   text : 'Wenn Du eine Munitionstasche hinlegst, kannst du <strong>5</strong> Sekunden\n' +
                          'lang schießen, ohne Munition zu verbrauchen.'
                },
                ace : {
                   text : 'Du kannst weiter <strong>5</strong> Sekunden schießen, ohne Munition zu\nverbrauchen.'
                },
                tier : {
                   text : 'Du bedrohst Gegner <strong>10%</strong> leichter.'
                }
            },
            {
                id : 'skill-id-104858',
                nameEng : 'Transporter',
                name : 'Transporter',
                basic : {
                   text : 'Du kannst dich beim Tragen von Taschen <strong>50%</strong> schneller bewegen.'
                },
                ace : {
                   text : 'Du kannst Taschen <strong>50%</strong> weiter werfen.'
                },
                tier : {
                   text : 'Du bedrohst Gegner <strong>10%</strong> leichter'
                }
            },
            {
                id : 'skill-id-103505',
                nameEng : 'Die Hard',
                name : 'Stirb Langsam',
                basic : {
                   text : 'Du aknnst beim Verbluten deine Primärwaffe benutzen.'
                },
                ace : {
                   text : 'Deine Panzerung erholt sich <strong>50%</strong> schneller.'
                },
                tier : {
                   text : 'Du erhälst <strong>10%</strong> mehr Gesundheit.'
                }
            },
            {
                id : 'skill-id-103527',
                nameEng : 'Underdog',
                name : 'Underdog',
                basic : {
                   text : 'Wenn du von mindestenz drei Gegnern umzingelt bist,' +
                          'verursachst Du <strong>15%</strong> mehr Schaden.'
                },
                ace : {
                   text : 'Wenn du von mindestenz drei Gegnern umzingelt bist, erleidest\n' +
                          'du <strong>15%</strong> weniger Schaden.'
                },
                tier : {
                   text : 'Du erhälst <strong>10%</strong> mehr Gesundheit.'
                }
            },
            {
                id : 'skill-id-103509',
                nameEng : 'Pumping Iron',
                name : 'Pumping Iron',
                basic : {
                   text : 'Deine Nahkampfangriffe verursachen <strong>50%</strong> mehr Schaden. Außer\nSpezialgegner.'
                },
                ace : {
                   text : 'Deine Nahkampfangriffe verursachen auch bei Spezialgegnern\n' +
                          '<strong>50%</strong> mehr Schaden.'
                },
                tier : {
                   text : 'Du erhälst <strong>10%</strong> mehr Gesundheit.'
                }
            },
            {
                id : 'skill-id-103511',
                nameEng : 'Shotgun Impact',
                name : 'Flinten-Einschlag',
                basic : {
                   text : 'Die Stabilität Deiner Flinte erhöht sich um <strong>25%</strong>.'
                },
                ace : {
                   text : 'Deine Flinten verursachen <strong>35%</strong> mehr Schaden.'
                },
                tier : {
                   text : 'Du bedrohst Gegner <strong>10%</strong> leichter.'
                }
            },
            {
                id : 'skill-id-103503',
                nameEng : 'Stun Resistance',
                name : 'Blend-Resistenz',
                basic : {
                   text : 'Reduziert den visuellen Effekt von Blendgranaten um <strong>25%</strong>.'
                },
                ace : {
                   text : 'Reduziert den visuellen Effekt von Blendgranaten um weitere\n<strong>50%</strong>.'
                },
                tier : {
                   text : 'Du bedrohst Gegner <strong>10%</strong> leichter.'
                }
            },
            {
                id : 'skill-id-104859',
                nameEng : 'Tough Guy',
                name : 'Harter Kerl',
                basic : {
                   text : 'Das Kamerwackeln bei Verletzunge durch Feindesbeschuss\n' +
                          'verringert sich um <strong>50%</strong>.'
                },
                ace : {
                   text : 'Deine Verblutungsgesundheit erhöht sich um <strong>25%</strong>.'
                },
                tier : {
                   text : 'Du bedrohst Gegner <strong>10%</strong> leichter.'
                }
            },
            {
                id : 'skill-id-103524',
                nameEng : 'Shotgun CQB',
                name : 'Flinten-Nahkampf',
                basic : {
                   text : 'Nachladen deiner Flinte ist <strong>50%</strong> schneller.'
                },
                ace : {
                   text : 'Wechseln zur Zielvorrichtung Deiner Flinte ist <strong>125%</strong> schneller.'
                },
                tier : {
                   text : 'Du erhälst <strong>10%</strong> mehr Gesundheit.'
                }
            },
            {
                id : 'skill-id-103525',
                nameEng : 'Ammunition Specialist',
                name : 'Speziallist für Munition',
                basic : {
                   text : 'Du kannst jetzt <strong>2</strong> Munitionstaschen hinlegen statt nur einer.'
                },
                ace : {
                   text : 'Deine Munitionstaschen haben <strong>200%</strong> mehr Munition.'
                },
                tier : {
                   text : 'Du erhälst <strong>10%</strong> mehr Gesundheit.'
                }
            },
            {
                id : 'skill-id-103519',
                nameEng : 'Berserker',
                name : 'Berserker',
                basic : {
                   text : 'Wenn deine Gesundheit niedriger als <strong>25%</strong> ist, verursachen Deine\n' +
                          'Säge und Nahkampfangriffe max. <strong>250%</strong> mehr Schaden. Je\n' +
                          'niedriger deine Gesundheit, desto größer der Bonus.'
                },
                ace : {
                   text : 'Wenn deine Gesundheit niedriger als <strong>25%</strong> ist, verursachen Deine\n' + 
                          'Distanzwaffen max. <strong>100%</strong> mehr Schaden.'
                },
                tier : {
                   text : 'Du erhälst <strong>10%</strong> mehr Gesundheit.'
                }
            },
            {
                id : 'skill-id-103502',
                nameEng : 'Hard Boiled',
                name : 'Abgetrübt',
                basic : {
                   text : 'Die Genauigkeit Deiner Flinte beim Schießen aus der Hüfte\n' +
                          'erhöht sich um <strong>20%</strong>.'
                },
                ace : {
                   text : 'Die Genauigkeit aus der Hüfte aller Deiner Waffen erhöht sich um\n<strong>20%</strong>.'
                },
                tier : {
                   text : 'Du verursachst <strong>5%</strong> mehr Schaden.'
                }
            },
            {
                id : 'skill-id-103516',
                nameEng : 'Fully Loaded',
                name : 'Vollgeladen',
                basic : {
                   text : 'Munition ges deiner Waffen erhöht sich um <strong>52%</strong>.'
                },
                ace : {
                   text : 'Tote Gegner droppen <strong>75%</strong> mehr Munition für dich.'
                },
                tier : {
                   text : 'Du verursachst <strong>5%</strong> mehr Schaden.'
                }
            },
            {
                id : 'skill-id-104862',
                nameEng : 'Portable Saw',
                name : 'Kreissäge',
                basic : {
                   text : 'Schaltet die OVE9000-Handkreissäge für dich frei.'
                },
                ace : {
                   text : 'Erhöht die Anzahl deiner Sägeblätter um <strong>1</strong>.'
                },
                tier : {
                   text : 'Du verursachst <strong>5%</strong> mehr Schaden.'
                }
            },
            {
                id : 'skill-id-103506',
                nameEng : 'Overkill',
                name : 'Overkill',
                basic : {
                   text : 'Tötest Du einen Gegner mit einer Flinte oder Säge,\n' +
                          'verursachst Du mit dieser Waffe <strong>5</strong> Sekunden lang <strong>75%</strong> mehr\nSchaden.'
                },
                ace : {
                   text : 'Der Schadensbonus gilt jetzt für alle Waffen. Fertigkeit muss\n' +
                          'durch eine Flinte oder Säge ausgelöst werden.'
                },
                tier : {
                   text : 'Du erhälst <strong>30%</strong> mehr Gesundheit.'
                }
            },
            {
                id : 'skill-id-104906',
                nameEng : 'Iron Man',
                name : 'Iron Man',
                basic : {
                   text : 'Du kannst jetzt die verbesserte taktische Panzerwest tragen.'
                },
                ace : {
                   text : 'Deine Nahkampfangriff stößt durch seine schiere Wucht\n' +
                          'Schild-Gegner zurück.\n\n' +
                          'rennen und Schießen - du kannst jetzt beim Rennen aus der Hüfte schießen.'
                },
                tier : {
                   text : 'Du erhälst <strong>30%</strong> mehr Gesundheit.'
                }
            },
            {
                id : 'skill-id-103523',
                nameEng : 'Carbon Blade',
                name : 'Karbonsägeblatt',
                basic : {
                   text : 'Der Einsatz von Karbon-Sägeblättern erhöht die Effizienz Deiner\n' +
                          'Säge um <strong>20%</strong>.'
                },
                ace : {
                   text : 'Beim Angreifen von Gegnern nutzt sich Deine OVE9000\n' +
                          'Handkreissäge <strong>50%</strong> weniger ab. Die Sägewirkung erhöht sich um\n<strong>20%</strong>.'
                },
                tier : {
                   text : 'Du erhälst <strong>30%</strong> mehr Gesundheit.'
                }
            }
        ],
        technicain : [
            {
                id : 'skill-id-104865',
                nameEng : 'Unlocking the Technician',
                name : 'Techniker Freischalten',
                basic : {
                   text : 'Der Techniker ist Fachmann für die praktische Seite der\n' +
                          'Kriminalwissenschaft und freut sich über alles, was BUMM!\nmacht.\n\n' +
                          'Der erste Punkt im Techniker-Fertigkeitsbaum schaltet die\n' +
                          'Fähigkeit frei, Stolperminen zu legen. Sie können verwendet\n' +
                          'werden um Dinge in die Luft zu jagen, seien es Menschen oder\nTresore.\n\n' +
                          '<strong>2</strong> Stoplerminen werden deinem Inventar hinzugefügt.'
                },
                ace : {
                   text : ''
                },
                tier : {
                   text : ''
                }
            },
            {
                id : 'skill-id-104866',
                nameEng : 'Rifleman',
                name : 'Gewehrschütze',
                basic : {
                   text : 'Wechseln zur Zielvorrichtung Deiner Sturmgewehre ist <strong>100%</strong>\nschneller.'
                },
                ace : {
                   text : 'Dein Zoom-Faktor bei Sturmgewehren erhöht sich um <strong>25%</strong>.'
                },
                tier : {
                   text : 'Die Kosten für Waffen- und Maskenherstellung reduzieren sich\n' +
                          'um <strong>17%</strong>.'
                }
            },
            {
                id : 'skill-id-104867',
                nameEng : 'Demolition Man',
                name : 'Demolition Man',
                basic : {
                   text : 'Fügt deinem Inventar <strong>1</strong> weitere Stolpermine hinzu.'
                },
                ace : {
                   text : 'Du plazierst Deine Stolpermine <strong>20%</strong> schneller.'
                },
                tier : {
                   text : 'Die Kosten für Waffen- und Maskenherstellung reduzieren sich\n' +
                          'um <strong>17%</strong>.'
                }
            },
            {
                id : 'skill-id-104868',
                nameEng : 'Nerves of Steel',
                name : 'Nerven aus Stahl',
                basic : {
                   text : 'Du nimmst <strong>50%</strong> weniger Schaden, wenn du mit Objekten\ninteragierst.'
                },
                ace : {
                   text : 'Du kannst beim Verbluten jetzt die Zielvorrichtung verwenden.'
                },
                tier : {
                   text : 'Die Kosten für Waffen- und Maskenherstellung reduzieren sich\n' +
                          'um <strong>17%</strong>.'
                }
            },
            {
                id : 'skill-id-104869',
                nameEng : 'Sharpshooter',
                name : 'Scharfschütze',
                basic : {
                   text : 'Die Genauigkeit Deiner Einzelschusswaffen erhöht sich um <strong>20%</strong>.'
                },
                ace : {
                   text : 'Die Stabilität Deiner Gewehre erhöht sich um <strong>25%</strong>.'
                },
                tier : {
                   text : 'Die Stabilität aller Deiner Waffen erhöht sich um <strong>5%</strong>.'
                }
            },
            {
                id : 'skill-id-104870',
                nameEng : 'Combat Engineer',
                name : 'Pionier',
                basic : {
                   text : 'Du kannst Stolperminen ein- und ausschalten.'
                },
                ace : {
                   text : 'Deine Stolperminen erhalten einen Sensormodus.'
                },
                tier : {
                   text : 'Die Stabilität aller Deiner Waffen erhöht sich um <strong>5%</strong>.'
                }
            },
            {
                id : 'skill-id-104871',
                nameEng : 'Hardware Expert',
                name : 'Mechantroniker',
                basic : {
                   text : 'Du kannst den Bohrer <strong>25%</strong> schneller auslegen.'
                },
                ace : {
                   text : 'Es besteht die <strong>20%</strong> Chance, dass der Bohrer nach einem\n' +
                          'Versagen automatisch neu startet. Außerdem kannst du die\n' +
                          'Sentry Gun <strong>50%</strong> schneller einsetzen'
                },
                tier : {
                   text : 'Die Stabilität aller Deiner Waffen erhöht sich um <strong>5%</strong>.'
                },
            },
            {
                id : 'skill-id-104872',
                nameEng : 'Sentry Gun',
                name : 'Sentry Gun',
                basic : {
                   text : 'Schaltet die Sentry Gun für Dich frei.'
                },
                ace : {
                   text : 'Die Gesundheit Deiner Sentry Gun erhöht sich um <strong>150%</strong>.'
                },
                tier : {
                   text : 'Die Kosten für Waffen- und Maskenherstellung reduzieren sich\num <strong>3%</strong>.'
                }
            },
            {
                id : 'skill-id-104873',
                nameEng : 'Improved Crafting',
                name : 'Verbesserte Fertigung',
                basic : {
                   text : 'Reduziert Kosten bei der Waffenfertigung um <strong>10%</strong>.'
                },
                ace : {
                   text : 'Reduziert Kosten bei der Maskenfertigung um <strong>10%</strong>.'
                },
                tier : {
                   text : 'Die Kosten für Waffen- und Maskenherstellung reduzieren sich\num <strong>3%</strong>.'
                }
            },
            {
                id : 'skill-id-104874',
                nameEng : 'Drill Sergeant',
                name : 'Und er hat doch gebohrt!',
                basic : {
                   text : 'Erhöht die Effizienz deines Bohrers um <strong>15%</strong>.'
                },
                ace : {
                   text : 'Erhöht die Bohreffizienz um weitere <strong>15%</strong>.'
                },
                tier : {
                   text : 'Die Kosten für Waffen- und Maskenherstellung reduzieren sich\num <strong>3%</strong>.'
                }
            },
            {
                id : 'skill-id-104876',
                nameEng : 'Sentry Targeting Package',
                name : 'Sentry-Zielbündelung',
                basic : {
                   text : 'Die Genauigkeit Deiner Sentry Gun erhöht sich um <strong>100%</strong>.'
                },
                ace : {
                   text : 'Deine Sentry Gun dreht sich <strong>150%</strong> schneller.'
                },
                tier : {
                   text : 'Du verursachst mit Kopfschüssen <strong>25%</strong> mehr Schaden'
                }
            },
            {
                id : 'skill-id-104877',
                nameEng : 'Blast Radius',
                name : 'Explosionsradius',
                basic : {
                   text : 'Der Explosionsradius deiner Minen erhöht sich um <strong>25%</strong>.'
                },
                ace : {
                   text : 'Der Radius erhöht sich um weitere <strong>75%</strong>.'
                },
                tier : {
                   text : 'Du verursachst mit Kopfschüssen <strong>25%</strong> mehr Schaden'
                }
            },
            {
                id : 'skill-id-104878',
                nameEng : 'Silent Drilling',
                name : 'Leises Bohren',
                basic : {
                   text : 'Dein Bohrer macht <strong>65%</strong> weniger Lärm. Es ist weniger\n' +
                          'wahrscheinlich, dass Zivilisten oder Wachen Deinen Bohrer\n' +
                          'höhren und Alarm schlagen.'
                },
                ace : {
                   text : 'Dein bohrer ist geräuschlos. Zivilisten und Wachen müssen ihn\n' +
                          'sehen um Alarm zu schlagen.'
                },
                tier : {
                   text : 'Du verursachst mit Kopfschüssen <strong>25%</strong> mehr Schaden'
                }
            },
            {
                id : 'skill-id-104879',
                nameEng : 'Sentry Combat Upgrade',
                name : 'Sentry-Kampf-Upgrade',
                basic : {
                   text : 'Deine Sentry Gun erhählt <strong>50%</strong> mehr Munition.'
                },
                ace : {
                   text : 'Deine Sentry Gun erhählt einen Schutzschild.'
                },
                tier : {
                   text : 'Die Kosten für Waffen- und Maskenherstellung reduzieren sich\num <strong>5%</strong>.'
                }
            },
            {
                id : 'skill-id-104880',
                nameEng : 'Shaped Charge',
                name : 'Hohlladung',
                basic : {
                   text : 'Fügt deinem Inventar <strong>3</strong> Stolperminen hinzu.'
                },
                ace : {
                   text : 'Stolperminen können jetzt zu Hohlladungen umfunktioniert\n' +
                          'werden, um bestimmte Tresore und Türen aufzusprengen.'
                },
                tier : {
                   text : 'Die Kosten für Waffen- und Maskenherstellung reduzieren sich\num <strong>5%</strong>.'
                }
            },
            {
                id : 'skill-id-104881',
                nameEng : 'Shockproof',
                name : 'Schocksicher',
                basic : {
                   text : 'Taser-Angriffe auf dich gehen nach hinten los und stoßen den\nTaser zurück'
                },
                ace : {
                   text : 'Interagieren mit einem Taser, der dich unter Strom setzt, setzt\n' +
                          'ihn selbst unter Strom und fügt seiner Gesundheit <strong>50%</strong> Schaden\nzu.'
                },
                tier : {
                   text : 'Die Kosten für Waffen- und Maskenherstellung reduzieren sich\num <strong>5%</strong>.'
                }
            },
            {
                id : 'skill-id-104882',
                nameEng : 'Sentry Tower Defense',
                name : 'Sentry-Turmabwehr',
                basic : {
                   text : 'Du kannst jetzt <strong>2</strong> Sentry Guns aufstellen statt nur einer.'
                },
                ace : {
                   text : 'Deine Sentry Gun verursacht <strong>300%</strong> mehr Schaden.'
                },
                tier : {
                   text : 'Die Stabilität aller Deiner Waffen erhöht sich um <strong>5%</strong>. Du erhälst\n' +
                          '<strong>10%</strong> mehr Panzerung. Die Panzerung erholt sich <strong>10%</strong> schneller\n' +
                          'für dich und deine Crew.'
                }
            },
            {
                id : 'skill-id-104884',
                nameEng : 'Mag Plus',
                name : 'Größeres Magazin',
                basic : {
                   text : 'Die Kapazität Deiner Magazine erhöht sich um <strong>5</strong> Patronen.'
                },
                ace : {
                   text : 'Die Kapazität deiner Magazine erhöht sich um weitere <strong>10</strong>\nPatronen.'
                },
                tier : {
                   text : 'Die Stabilität aller Deiner Waffen erhöht sich um <strong>5%</strong>. Du erhälst\n' +
                          '<strong>10%</strong> mehr Panzerung. Die Panzerung erholt sich <strong>10%</strong> schneller\n' +
                          'für dich und deine Crew.'
                }
            },
            {
                id : 'skill-id-104885',
                nameEng : 'Bulletproof',
                name : 'Kugelsicher',
                basic : {
                   text : 'Verstärkt deine Panzerung um <strong>50%</strong>.'
                },
                ace : {
                   text : 'Die Panzerung erhohlt sich <strong>25%</strong> schneller für Dich und Deine\nCrew.'
                },
                tier : {
                   text : 'Die Stabilität aller Deiner Waffen erhöht sich um <strong>5%</strong>. Du erhälst\n' +
                          '<strong>10%</strong> mehr Panzerung. Die Panzerung erholt sich <strong>10%</strong> schneller\n' +
                          'für dich und deine Crew.'
                }
            }
        ],
        ghost : [
            {
                id : 'skill-id-104886',
                nameEng : 'Unlocking the Ghost',
                name : 'Geist Freischalten',
                basic : {
                   text : 'Der Geist ist ein Stealth-Künstler, der selbst große Diebstähle\n' +
                          'ohne Aufsehen gewaltlos durchführt.\n\n' +
                          'Der erste Punkt im Geist-Fertigkeitsbaum schaltet die Fähigkeit\n' +
                          'frei, elektronische Gegenmaßnahmen einzusetzen - acuh\n' +
                          'ECM-Störsender gennant -, die vorübergehend elektronische\n' +
                          'Geräte wie Handys und Kameras lahmlegen können.\n\n' +
                          '<strong>1</strong> ECM-Störsender werden deinem Inventar hinzugefügt. Ein\n' +
                          'ECM-Störsender hält <strong>20</strong> Sekunden.'
                },
                ace : {
                   text : ''
                },
                tier : {
                   text : ''
                }
            },
            {
                id : 'skill-id-104887',
                nameEng : 'Dead Presidents',
                name : 'Dead Presidents',
                basic : {
                   text : 'Erhöht den Wert von eingesammelter Beute um <strong>10%</strong>.'
                },
                ace : {
                   text : 'Erhöht den Wert von eingesammelter Beute um <strong>20%</strong>.'
                },
                tier : {
                   text : 'Deine Chance, auszuweichen, erhöht sich um <strong>5%</strong>.'
                }
            },
            {
                id : 'skill-id-104888',
                nameEng : 'Sprinter',
                name : 'Sprinter',
                basic : {
                   text : 'Die Zeit, bevor Ausdauer sich regeneriert wird um <strong>5%</strong>\n' +
                          'verringert, die Regenerationsrate um <strong>25%</strong> erhöht.'
                },
                ace : {
                   text : 'Du rennst <strong>25%</strong> schneller. Wenn du rennst, ist Deine Chance\n' +
                          'auszuweichen um <strong>25%</strong> erhöht.'
                },
                tier : {
                   text : 'Deine Chance, auszuweichen, erhöht sich um <strong>5%</strong>.'
                }
            },
            {
                id : 'skill-id-104889',
                nameEng : 'Cat Burglar',
                name : 'Fassadenkletterer',
                basic : {
                   text : 'Dein Sturzschaden verringert sich um <strong>75%</strong>. Gilt nicht bei\n' +
                          'tödlicher Höhe.'
                },
                ace : {
                   text : 'Sturzschaden geht nur auf deine Panzerung. Gilt nicht bei\n' +
                          'tödlicher Höhe. Deine Zeit in Haft reduziert sich um <strong>50%</strong>.'
                },
                tier : {
                   text : 'Deine Chance, auszuweichen, erhöht sich um <strong>5%</strong>.'
                }
            },
            {
                id : 'skill-id-104890',
                nameEng : 'Fast Hands',
                name : 'Schnell Finger',
                basic : {
                   text : 'Du kannst Beutetaschen <strong>25%</strong> schneller füllen und greifen.'
                },
                ace : {
                   text : 'Du kannst Beutetaschen weitere <strong>50%</strong> schneller füllen und\ngreifen.'
                },
                tier : {
                   text : 'Du wechselst die Waffen <strong>20%</strong> schneller.'
                }
            },
            {
                id : 'skill-id-104891',
                nameEng : 'Chameleon',
                name : 'Chamäleon',
                basic : {
                   text : 'Im Erkennungsmodus ist Deine Tarnung um <strong>25%</strong> erhöht.'
                },
                ace : {
                   text : 'In der Nähe Deiner Crewmitglieder verringert sich die Chance,\n' +
                          'dass Gegner auf die zielen, um <strong>15%</strong>.'
                },
                tier : {
                   text : 'Du wechselst die Waffen <strong>20%</strong> schneller.'
                }
            },
            {
                id : 'skill-id-104892',
                nameEng : 'Cleaner',
                name : 'Saubermann',
                basic : {
                   text : 'Du fügst Spezial-Gegnern <strong>5%</strong> mehr Schaden zu.'
                },
                ace : {
                   text : 'Du kannst maximal <strong>2</strong> Leichen einsacken.'
                },
                tier : {
                   text : 'Du wechselst die Waffen <strong>20%</strong> schneller.'
                }
            },
            {
                id : 'skill-id-104893',
                nameEng : 'Shinobi',
                name : 'Shinobi',
                basic : {
                   text : 'Du gehst <strong>25%</strong> schneller. Und geduckt bewegst du dich <strong>10%</strong>\schneller.'
                },
                ace : {
                   text : 'Gegner machen <strong>95%</strong> weniger Lärm, wenn Du sie erschießt oder\n' +
                          'mit einer Nahkampfwaffe tötest.'
                },
                tier : {
                   text : 'Deine Chance, auszuweichen, erhöht sich um <strong>10%</strong>.'
                }
            },
            {
                id : 'skill-id-104894',
                nameEng : 'Martial Arts',
                name : 'Kampfsport',
                basic : {
                   text : 'Deine Chance Gegner im Nahkampf umzu hauen erhöht sich um\n <strong>50%</strong>.'
                },
                ace : {
                   text : 'Dein erlittener Nahkampfschaden verringert sich durch Training\n um <strong>50%</strong>.'
                },
                tier : {
                   text : 'Deine Chance, auszuweichen, erhöht sich um <strong>10%</strong>.'
                }
            },
            {
                id : 'skill-id-104895',
                nameEng : 'SMG Specialist',
                name : 'MP Spezialist',
                basic : {
                   text : 'Erhöht deine Nachladegeschwindigkeit bei Maschinpistolen\n um <strong>35%</strong>.'
                },
                ace : {
                   text : 'Erhöht die Feuerrate von Maschienenpistolen um <strong>20%</strong>.'
                },
                tier : {
                   text : 'Deine Chance, auszuweichen, erhöht sich um <strong>10%</strong>.'
                }
            },
            {
                id : 'skill-id-104897',
                nameEng : 'Nine Lives',
                name : 'Neun Leben',
                basic : {
                   text : 'Du kannst <strong>1</strong> Mal mehr verbluten, bevor du in Haft kommst.'
                },
                ace : {
                   text : 'Wenn du verblutest besteht die <strong>10%</strong> Chance, dass du direkt\nwieder austehst.'
                },
                tier : {
                   text : 'Deine Tarnung erhöht sich um <strong>+5</strong>. Beim Tragen einer Panzerung\n' +
                          'wird deine Bewegungsgeschwindigkeit <strong>15%</strong> weniger\n beeinträchtigt.'
                }
            },
            {
                id : 'skill-id-104898',
                nameEng : 'ECM Specialist',
                name : 'ECM-Specialist',
                basic : {
                   text : 'Du kannst jetzt <strong>2</strong> anstatt nur einen ECM-Störsender plazieren.'
                },
                ace : {
                   text : 'Der ECM-Störsender hält <strong>25%</strong> und die ECM-Rückkopplung <strong>25%</strong>\n' +
                          'länger. Der ECM-Störsender unterdrückt die\n' +
                          'Pagerbeantwortung, solange er aktive ist.'
                },
                tier : {
                   text : 'Deine Tarnung erhöht sich um <strong>+5</strong>. Beim Tragen einer Panzerung\n' +
                          'wird deine Bewegungsgeschwindigkeit <strong>15%</strong> weniger\n beeinträchtigt.'
                }
            },
            {
                id : 'skill-id-104899',
                nameEng : 'Silent Killer',
                name : 'Lautloser Killer',
                basic : {
                   text : 'Deine Schalldämpfer verursachen <strong>15%</strong> mehr schaden.'
                },
                ace : {
                   text : 'Deine Schalldämpfer verursachen <strong>15%</strong> mehr Schaden und haben\n' +
                          'eine <strong>15%</strong> Chance, Panzerungen zu durchdringen.'
                },
                tier : {
                   text : 'Deine Tarnung erhöht sich um <strong>+5</strong>. Beim Tragen einer Panzerung\n' +
                          'wird deine Bewegungsgeschwindigkeit <strong>15%</strong> weniger\n beeinträchtigt.'
                }
            },
            {
                id : 'skill-id-104900',
                nameEng : 'Lockpicking Expert',
                name : 'Experte für Schlüsserknacken',
                basic : {
                   text : 'Du knackst Schlösser <strong>25%</strong> schneller.'
                },
                ace : {
                   text : 'Du kannst jetzt Tresore lautlos per Hand knacken.\n\n' +
                          'Du knackst Schlösser weitere <strong>25%</strong> schneller.'
                },
                tier : {
                   text : 'Du wechselst die Waffen <strong>80%</strong> schneller.'
                }
            },
            {
                id : 'skill-id-104901',
                nameEng : 'ECM Overdrive',
                name : 'ECM-Overdrive',
                basic : {
                   text : 'Die Dauer Deines ECM-Störsenders erhöht sich um <strong>25%</strong>.'
                },
                ace : {
                   text : 'Dein ECM-Störsender kann nun bestimmte Türen öffnen.'
                },
                tier : {
                   text : 'Du wechselst die Waffen <strong>80%</strong> schneller.'
                }
            },
            {
                id : 'skill-id-104902',
                nameEng : 'The Professional',
                name : 'Der Profi',
                basic : {
                   text : 'Die Stabilität Deiner schallgedämpften Waffen erhöht sich um\n<strong>50%</strong>.'
                },
                ace : {
                   text : 'Die Genauigkeit Deiner schallgedämpften Waffen erhöht sich um\n' +
                          '<strong>50%</strong> und der Wechsel zur Zielvorrichting ist <strong>100%</strong> schneller.'
                },
                tier : {
                   text : 'Du wechselst die Waffen <strong>80%</strong> schneller.'
                }
            },
            {
                id : 'skill-id-104903',
                nameEng : 'Lucky Charm',
                name : 'Glücksbringer',
                basic : {
                   text : 'Deine Chance am PAYDAY einen höherwertigen Gegenstand zu\n' +
                          'erhalten, erhöht sich um <strong>50%</strong>.'
                },
                ace : {
                   text : 'Deine Chance erhöht sich um weitere <strong>200%</strong>.'
                },
                tier : {
                   text : 'Die Chance am PAYDAY einen besseren Gegenstand zu erhalten,\n' +
                          'erhöht sich um <strong>10%</strong>. Waffen haben eine <strong>15%</strong> Chance die\n' +
                          'Panzerung des Gegners zu durchdringen.'
                }
            },
            {
                id : 'skill-id-104904',
                nameEng : 'ECM Feedback',
                name : 'ECM-Feedback',
                basic : {
                   text : 'Interagiere mir Deinem ECM-Storsendern, um eine\n' +
                          'Rückkopplung zu erzeugen. Es besteht die <strong>50%-100%</strong> Chance,\n' +
                          'Feinde innerhalb von <strong>25</strong> Metern alle <strong>1.5</strong> Sek. außer Gefecht zu setzen.' +
                          'ECM-Rückkopplungen halten <strong>15-20</strong> Sek an.'
                },
                ace : {
                   text : 'Interagiere sofort mit ECM-Störsendern. Dauer der\n' +
                          'ECM-Rückkopplung erhöht sich um <strong>25%</strong>.'
                },
                tier : {
                   text : 'Die Chance am PAYDAY einen besseren Gegenstand zu erhalten,\n' +
                          'erhöht sich um <strong>10%</strong>. Waffen haben eine <strong>15%</strong> Chance die\n' +
                          'Panzerung des Gegners zu durchdringen.'
                }
            },
            {
                id : 'skill-id-104905',
                nameEng : 'Moving Target',
                name : 'Bewegtes Ziel',
                basic : {
                   text : 'Du kannst jetzt seitwärts rennen.'
                },
                ace : {
                   text : 'Du kannst jetzt in jede Richtung rennen.'
                },
                tier : {
                   text : 'Die Chance am PAYDAY einen besseren Gegenstand zu erhalten,\n' +
                          'erhöht sich um <strong>10%</strong>. Waffen haben eine <strong>15%</strong> Chance die\n' +
                          'Panzerung des Gegners zu durchdringen.'
                }
            }
        ]
    };

function translate( target ) {
    //console.log( target.text() );
    
    var skill;
    skill = _.findWhere( trees.mastermind, { nameEng : target.text() });
    
    if( !skill )
        skill = _.findWhere( trees.enforcer, { nameEng : target.text() });
    if( !skill )
       skill = _.findWhere( trees.technicain, { nameEng : target.text() });
    if( !skill )
       skill = _.findWhere( trees.ghost, { nameEng : target.text() });

    if( skill ) {
        $('.p-sd-heading').text( skill.name );
        //$('.p-sd-panel-messages').text('ERROR');
        
        ///$('.p-sd-panel-basic').text('Basic - Skillpoint / Cost');
        $('.p-sd-basic-description').html( skill.basic.text );
        
        //$('.p-sd-panel-ace').text('ACE - Skillpoint / Cost');
        $('.p-sd-ace-description').html( skill.ace.text );
        
        //$('.p-sd-tier-bonus-heading').text('TierBonus');
        $('.p-sd-tier-bonus').html( skill.tier.text );
    }
}

function calcValues() {
    _.each( trees, function( tree ){
        _.each( tree, function( skill ){
            if( $( '.' + skill.id ).hasClass( 'aced' ) ){
                console.log( skill.name + ' = ACE + Tier' );
            } else if ( $( '.' + skill.id ).hasClass( 'basic' ) ) {
                console.log( skill.name + ' = Basic only' );
            } else {
                //console.log( skill );
                console.log( skill.name + ' = Not skilled!' );
            }
       });
    });
}

function createViewToShowAllSkills(){
    var style = 'clear:both; padding: 9.5px; background-color: #F5F5F5; border: 1px solid rgba(0, 0, 0, 0.15); border-radius: 4px; font-size: 13px; line-height: 20px; margin: 0 0 10px; color: #333333;';
    $( '.main' ).append( '<div id="allSkillView" style="' + style + '"><button class="btn btn-inverse btn-small" style="float:left;">Berechnen</button></div>' );
    $( '#allSkillView' ).append( '<div id="calced" style="margin-left:100px;">Noch nicht berechnet!</div>' );
    
    addButtonListener();
}

 
function addButtonListener(){
    var button = document.getElementById("allSkillView");
    button.addEventListener( 'click', calcValues, true );
}

function helper() {//
    setTimeout( function(){
        var skills = $( '.st-skill' );
        $.each( skills, function( index, item ){
            var classList = $(item).attr('class').split(/\s+/);
            console.log( classList[ 2 ] + ' = ' + classList[ 1 ] );
        });
        console.log( 'ENDE' );
    }, 2000);
}

$( document ).ready(function() {    
     $('#panel_skill_details').bind( 'DOMNodeInserted', function( e ){
         var target = $( e.target );
         
         if( allowConentChange && $( target ).attr( 'class' ) === 'p-sd-heading' && $( target ).text() !== '' ) {
             allowConentChange = false;
             setTimeout( function(){
                translate( target );
                allowConentChange = true;
             }, 1 );
         }
    } );
    
    //createViewToShowAllSkills();
    //helper();
});