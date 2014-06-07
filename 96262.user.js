// ==UserScript==
// @name 	Kick-o-matic
// @description Ускоряет процесс раздачи погон
// @author  	Macabre2077 (script, RU)
// @author  	tw81 (Italian translation)
// @author  	pepe100 (Spanish translation)
// @author  	Tanais (Dutch and English translations)
// @author  	jccwest (Portuguese localisation)
// @author  	Surge (Slovak localisation)
// @author  	Darius II  (Polish localisation)
// @version 	1.6
// @include 	http://*.the-west.*/game.php*
// @namespace   http://forum.the-west.ru/showthread.php?t=18398

// @history		1.6 2.03 version compatibility
// @history		1.5 Polish translation
// @history		1.44 Italian translation
// @history		1.43 Multiple forts support
// @history		1.40 The West 2.0 compatibility
// @history		1.39 Disabling script before fixing bugs caused by 2.0
// @history		1.38 Slovak translation
// @history		1.37 Portuguese localisation
// @history		1.36 1.36 version bugfix
// @history		1.32 Translations: Spanish and Italian
// @history		1.3 Translations: english, dutch!
// @history		1.3 Bugfix: selected player stays highlighted
// @history		1.2 old popup redesign,added compact version of popup,  weapon accordance, intro
// @history		1.18 bugfix
// @history		1.15 fixed bug when one player`s data can`t be shown
// @history		1.15 prevents too long loading
// @history		1.1 new design
// @history		1.1 force chat to show ranks
// @history		1.1 bug fixes
// @history		1.000 players` hp (without lists) and town name
// @history		0.995 lists without {}
// @history		0.995 update hp list button
// @history		0.992 small bugfix
// @history		0.99 players` hp
// @history		0.98 player`s position is being highlihted when popup is shown
// @history		0.97 ally`s name is shown
// @history		0.96 new script`s name,added namespace
// @history		0.95 new feature fully completed
// @history		0.94 testing new feature - showing name of sector instead of numeric fort position
// @history		0.93 fixed bug caused by empty fort weapon
// @history		0.92 fixed mulitply battles error
// ==/UserScript==

/* Todo:
 Any good ideas?
 */


function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
}

exec(function() {

    Grander = {
        "scriptName": "Kick-o-Matic",
        "scriptId": "96262",
        "version": 1.6,
        "checkFileUrl": "http://macabre2077.koding.com/userscripts/the-west/kickomatic/getVersion.php",
        "scriptSite": "http://userscripts.org/scripts/show/96262",
        "loading": false,
        "fortsCapacity": [[50, 42], [100, 84], [140, 120]],
        "betaFortsCapacity": [[25, 21], [50, 42], [70, 60]],
        weapons: []
    };
    Grander.consoleError = function(error) {
        try {
            throw new Error(error);
        } catch (e) {
            console.log(e.stack);
        }
    };
    Grander.checkEnemies = function() {
        if (window.location.href.match("ru1") && [67, 634].indexOf(Chat.MyClient.allianceId) >= 0) {
            new UserMessage("verification failed", {type: "fail"}).show();
            window.Grander = undefined;
        }
    };
    Grander.intro = function() {
// localStorage.setItem('KoM.version' , 0.998);
        if (localStorage.getItem('KoM.version') >= Grander.version)
            return;
        localStorage.setItem('KoM.version', Grander.version);
        var title = 'Kick-o-Matic, ' + Grander.lang.version + ' ' + Grander.version;
        var text = Grander.lang.changelist + ':<br/><ul>';
        switch (Grander.getLocale()) {
            case "ru_RU":
                text += '<li>Совместимость с версией 2.03</li>';
                text += '<li><small>Так же может заинтересовать:</small> <a href="http://userscripts.org/scripts/show/154884" target="_blank">TW Gold Jobs Finder - поиск золотых и сереряных работ</a></li>';
                break;
            default:
                text += '<li>2.03 compatibility</li>';
                text += '<li>Check this out: <a href="http://userscripts.org/scripts/show/154884" target="_blank">TW Gold Jobs Finder</a></li>';
                break;
        }
        text += '</ul>';
        Grander.mb = new west.gui.Dialog(title).addButton("ОК").setId('GranderUpdated');
        Grander.mb.setText(text).show();
    };
    Grander.init = function() {
        Grander.coords = {"attack": {0: 0, 1: 0, 2: 0, 34: 0, 35: 0, 36: 0, 68: 0, 69: 0, 70: 0, 102: 0, 103: 0, 104: 0, 136: 0, 137: 0, 138: 0, 170: 0, 171: 0, 172: 0, 204: 0, 205: 0, 206: 0, 238: 0, 239: 0, 240: 0, 272: 0, 273: 0, 274: 0, 306: 0, 307: 0, 308: 0, 340: 0, 341: 0, 342: 0, 374: 1, 375: 1, 376: 1, 408: 1, 409: 1, 410: 1, 442: 1, 443: 1, 444: 1, 476: 1, 477: 1, 478: 1, 510: 1, 511: 1, 512: 1, 544: 1, 545: 1, 546: 1, 578: 1, 579: 1, 580: 1, 612: 1, 613: 1, 614: 1, 646: 1, 647: 1, 648: 1, 680: 1, 681: 1, 682: 1, 714: 2, 748: 2, 782: 2, 715: 2, 749: 2, 783: 2, 716: 2, 750: 2, 784: 2, 717: 2, 751: 2, 785: 2, 718: 2, 752: 2, 786: 2, 719: 2, 753: 2, 787: 2, 720: 2, 754: 2, 788: 2, 721: 2, 755: 2, 789: 2, 722: 2, 756: 2, 790: 2, 723: 2, 757: 2, 791: 2, 724: 2, 758: 2, 792: 2, 725: 3, 759: 3, 793: 3, 726: 3, 760: 3, 794: 3, 727: 3, 761: 3, 795: 3, 728: 3, 762: 3, 796: 3, 729: 3, 763: 3, 797: 3, 730: 3, 764: 3, 798: 3, 731: 3, 765: 3, 799: 3, 732: 3, 766: 3, 800: 3, 733: 3, 767: 3, 801: 3, 734: 3, 768: 3, 802: 3, 735: 3, 769: 3, 803: 3, 736: 4, 770: 4, 804: 4, 737: 4, 771: 4, 805: 4, 738: 4, 772: 4, 806: 4, 739: 4, 773: 4, 807: 4, 740: 4, 774: 4, 808: 4, 741: 4, 775: 4, 809: 4, 742: 4, 776: 4, 810: 4, 743: 4, 777: 4, 811: 4, 744: 4, 778: 4, 812: 4, 745: 4, 779: 4, 813: 4, 746: 4, 747: 4, 780: 4, 781: 4, 814: 4, 815: 4, 405: 5, 406: 5, 407: 5, 439: 5, 440: 5, 441: 5, 473: 5, 474: 5, 475: 5, 507: 5, 508: 5, 509: 5, 541: 5, 542: 5, 543: 5, 575: 5, 576: 5, 577: 5, 609: 5, 610: 5, 611: 5, 643: 5, 644: 5, 645: 5, 677: 5, 678: 5, 679: 5, 711: 5, 712: 5, 713: 5, 31: 6, 32: 6, 33: 6, 65: 6, 66: 6, 67: 6, 99: 6, 100: 6, 101: 6, 133: 6, 134: 6, 135: 6, 167: 6, 168: 6, 169: 6, 201: 6, 202: 6, 203: 6, 235: 6, 236: 6, 237: 6, 269: 6, 270: 6, 271: 6, 303: 6, 304: 6, 305: 6, 337: 6, 338: 6, 339: 6, 371: 6, 372: 6, 373: 6}, 0: {178: 7, 179: 7, 180: 7, 212: 7, 213: 7, 214: 7, 246: 7, 247: 7, 248: 7, 193: 8, 194: 8, 195: 8, 227: 8, 228: 8, 229: 8, 261: 8, 262: 8, 263: 8, 450: 9, 451: 9, 452: 9, 484: 9, 485: 9, 486: 9, 518: 9, 519: 9, 520: 9, 465: 10, 466: 10, 467: 10, 499: 10, 500: 10, 501: 10, 533: 10, 534: 10, 535: 10, 291: 11, 292: 11, 293: 11, 325: 11, 326: 11, 327: 11, 393: 13, 394: 13, 395: 13, 427: 13, 428: 13, 429: 13, 318: 12, 319: 12, 352: 12, 353: 12, 386: 12, 387: 12, 215: 14, 216: 14, 217: 14, 218: 14, 219: 14, 220: 14, 221: 14, 222: 14, 223: 14, 224: 14, 225: 14, 226: 14, 487: 15, 488: 15, 489: 15, 490: 15, 491: 15, 494: 15, 495: 15, 496: 15, 497: 15, 498: 15, 281: 16, 315: 16, 349: 16, 383: 16, 417: 16, 296: 17, 330: 17, 364: 17, 398: 17, 432: 17, 492: 18, 493: 18, 287: 19, 288: 19, 289: 19, 290: 19, 321: 19, 322: 19, 323: 19, 324: 19, 355: 19, 356: 19, 357: 19, 358: 19, 389: 19, 390: 19, 391: 19, 392: 19}, 1: {143: 7, 144: 7, 145: 7, 177: 7, 178: 7, 179: 7, 211: 7, 212: 7, 213: 7, 160: 8, 161: 8, 162: 8, 194: 8, 195: 8, 196: 8, 228: 8, 229: 8, 230: 8, 483: 9, 484: 9, 485: 9, 517: 9, 518: 9, 519: 9, 551: 9, 552: 9, 553: 9, 500: 10, 501: 10, 502: 10, 534: 10, 535: 10, 536: 10, 568: 10, 569: 10, 570: 10, 326: 11, 327: 11, 328: 11, 360: 11, 361: 11, 362: 11, 385: 13, 386: 13, 387: 13, 419: 13, 420: 13, 421: 13, 250: 12, 251: 12, 284: 12, 285: 12, 318: 12, 319: 12, 180: 14, 181: 14, 182: 14, 183: 14, 184: 14, 185: 14, 186: 14, 187: 14, 188: 14, 189: 14, 190: 14, 191: 14, 192: 14, 193: 14, 520: 15, 521: 15, 522: 15, 523: 15, 524: 15, 525: 15, 528: 15, 529: 15, 530: 15, 531: 15, 532: 15, 533: 15, 246: 16, 280: 16, 314: 16, 348: 16, 382: 16, 416: 16, 450: 16, 263: 17, 297: 17, 331: 17, 365: 17, 399: 17, 433: 17, 467: 17, 526: 18, 527: 18, 287: 19, 288: 19, 289: 19, 290: 19, 321: 19, 322: 19, 323: 19, 324: 19, 355: 19, 356: 19, 357: 19, 358: 19, 389: 19, 390: 19, 391: 19, 392: 19}, 2: {108: 7, 109: 7, 110: 7, 142: 7, 143: 7, 144: 7, 176: 7, 177: 7, 178: 7, 127: 8, 128: 8, 129: 8, 161: 8, 162: 8, 163: 8, 195: 8, 196: 8, 197: 8, 516: 9, 517: 9, 518: 9, 550: 9, 551: 9, 552: 9, 584: 9, 585: 9, 586: 9, 535: 10, 536: 10, 537: 10, 569: 10, 570: 10, 571: 10, 603: 10, 604: 10, 605: 10, 258: 12, 259: 12, 292: 12, 293: 12, 326: 12, 327: 12, 395: 11, 396: 11, 429: 11, 430: 11, 463: 11, 464: 11, 384: 13, 385: 13, 386: 13, 418: 13, 419: 13, 420: 13, 145: 14, 146: 14, 147: 14, 148: 14, 149: 14, 150: 14, 151: 14, 152: 14, 153: 14, 154: 14, 155: 14, 156: 14, 157: 14, 158: 14, 159: 14, 160: 14, 553: 15, 554: 15, 555: 15, 556: 15, 557: 15, 558: 15, 559: 15, 562: 15, 563: 15, 564: 15, 565: 15, 566: 15, 567: 15, 568: 15, 211: 16, 245: 16, 279: 16, 313: 16, 347: 16, 381: 16, 415: 16, 449: 16, 483: 16, 230: 17, 264: 17, 298: 17, 332: 17, 366: 17, 400: 17, 434: 17, 468: 17, 502: 17, 560: 18, 561: 18, 287: 19, 288: 19, 289: 19, 290: 19, 321: 19, 322: 19, 323: 19, 324: 19, 355: 19, 356: 19, 357: 19, 358: 19, 389: 19, 390: 19, 391: 19, 392: 19}};
        Grander.langs = {
            "ru_RU": {
                "success": "Лычка дана!",
                "error": "Произошла ошибка",
                "cancel": "Отмена",
                "showPlayerOnMap": "Показать игрока на карте",
                "showTown": "Посмотреть город",
                "nodata": "Информация о званиях не загружена для данного форта!",
                "getData": "Пытаемся загрузить данные о званиях",
                "errorTimeout": "Загрузка происходит слишком долго",
                "ascpt": "Произвести в капитаны",
                "asprivate": "Назначить рядовым",
                "asrecruit": "Взять в рекруты",
                "asreservist": "Записать в резерв",
                "astraitor": "Обвинить в предательстве",
                "youcant": "<br/>Ты не можешь понизить старшего<br/> или равного по званию.",
                "position": "Позиция:",
                "pos_undefined": "не установлена",
                "noally": "Без альянса",
                "flag": "Флаг",
                "inside": "Внутри форта",
                "classes": {
                    "soldier": "Солдат",
                    "duelist": "Дуэлянт",
                    "adventurer": "Авантюрист",
                    "worker": "Трудяга",
                    "greenhorn": "Чечако"
                },
                "ranks": {
                    "traitor": "Предатель",
                    "reservist": "Резервист",
                    "recruit": "Рекрут",
                    "private_": "Рядовой",
                    "captain": "Капитан",
                    "general": "Генерал"
                },
                "sectors": {
                    "undefined": "Не назначена",
                    0: "Левый верхний сектор",
                    1: "Левый нижний сектор",
                    2: "Левый южный сектор",
                    3: "Центральный южный сектор",
                    4: "Правый южный сектор",
                    5: "Правый нижний сектор",
                    6: "Правый верхний сектор", /* attack */
                    7: "Башня авантов",
                    8: "Башня дуэлянтов",
                    9: "Башня солдат",
                    10: "Башня трудяг",
                    11: "Казарма",
                    12: "Склад",
                    13: "Штаб",
                    14: "Северная стена",
                    15: "Южная стена",
                    16: "Западная стена",
                    17: "Восточная стена",
                    18: "Ворота",
                    19: "Флаг",
                    20: "Внутри форта"
                },
                "damage": "урон",
                "version": "версия",
                "changelist": "Список изменений",
                // new in 1.40
                "update_available": "Доступна новая версия скрипта Kick-o-Matic",
                "update_question": "Вы можете скачать новую версию с сайта userscripts.org. Перейти?"
            },
            "nl_NL": {
                "success": "Rang wordt gegeven!",
                "error": "Er is een fout opgetreden",
                "cancel": "Annuleren",
                "showPlayerOnMap": "Laat speler zien op de map",
                "showTown": "Bekijk stad",
                "nodata": "Informatie over rangen is niet gegeven voor het fort!",
                "getData": "Ranginformatie aan het laden",
                "errorTimeout": "Het downloaden duurde te lang",
                "ascpt": "Tot kapitein bevorderen",
                "asprivate": "Tot soldaat benoemen",
                "asrecruit": "Tot rekruut benoemen",
                "asreservist": "Tot reservist benoemen",
                "astraitor": "Markeren als verrader",
                "youcant": "Je kan geen spelers met dezelfde of een hogere rang rekruteren.",
                "position": "Positie:",
                "pos_undefined": "Geen startpositie",
                "noally": "Geen alliantie",
                "flag": "Vlag",
                "inside": "Binnen het fort",
                "classes": {
                    "soldier": "Soldaat",
                    "duelist": "Duellant",
                    "adventurer": "Avonturier",
                    "worker": "Arbeider",
                    "greenhorn": "Greenhorn"
                },
                "ranks": {
                    "traitor": "Verrader",
                    "reservist": "Reservist",
                    "recruit": "Rekruut",
                    "private_": "Soldaat",
                    "captain": "Kapitein",
                    "general": "Generaal"
                },
                "sectors": {
                    "undefined": "Geen startpositie",
                    0: "De sector links boven",
                    1: "De centraal linker sector",
                    2: "De sector linksonder",
                    3: "De sector midden onder",
                    4: "De sector rechtsonder",
                    5: "De centraal rechter sector",
                    6: "De sector rechtsboven", /* attack */
                    7: "Avonturierstoren",
                    8: "Duellantentoren",
                    9: "Soldatentoren",
                    10: "Arbeiderstoren",
                    11: "Kazerne",
                    12: "Opslagplaats",
                    13: "Hoofdgebouw",
                    14: "Bovenmuur",
                    15: "Ondermuur",
                    16: "Linkermuur",
                    17: "Rechtermuur",
                    18: "Poort",
                    19: "Vlag",
                    20: "In het fort"
                },
                "damage": "schade",
                "version": "versie",
                "changelist": "Lijst van wijzigingen",
                // new in 1.40
                "update_available": "Kick-o-Matic update available",
                "update_question": "You can download the lastest version from userscripts.org. Visit the site?"
            },
            "en_US": {
                "success": "Rank is given!",
                "error": "An error has occured",
                "cancel": "Cancel",
                "showPlayerOnMap": "Show player on map",
                "showTown": "View town",
                "nodata": "Couldn't load rank information for the fort",
                "getData": "Loading rank information",
                "errorTimeout": "The loading took too much time",
                "ascpt": "Promote to captain",
                "asprivate": "Appoint as private",
                "asrecruit": "Appoint as recruit",
                "asreservist": "Appoint as reservist",
                "astraitor": "Mark as traitor",
                "youcant": "You can't demote fighters of the same or higher rank.",
                "position": "Position:",
                "pos_undefined": "No starting position",
                "noally": "No alliance",
                "flag": "Flag",
                "inside": "Inside the fort",
                "classes": {
                    "soldier": "Soldier",
                    "duelist": "Dueller",
                    "adventurer": "Adventurer",
                    "worker": "Worker",
                    "greenhorn": "Greenhorn"
                },
                "ranks": {
                    "traitor": "Traitor",
                    "reservist": "Reservist",
                    "recruit": "Recruit",
                    "private_": "Soldier",
                    "captain": "Captain",
                    "general": "General"
                },
                "sectors": {
                    "undefined": "No starting position",
                    0: "The upper-left sector",
                    1: "The lower-left sector",
                    2: "The central left sector",
                    3: "The lower central sector",
                    4: "The central right sector",
                    5: "The lower-right sector",
                    6: "The upper-right sector", /* attack */
                    7: "Adventurer's tower",
                    8: "Dueller's tower",
                    9: "Soldier's tower",
                    10: "Worker's tower",
                    11: "Barracks",
                    12: "Resource stock",
                    13: "Headquarters",
                    14: "North wall",
                    15: "South wall",
                    16: "West wall",
                    17: "East wall",
                    18: "Gate",
                    19: "Flag",
                    20: "Inside the fort"
                },
                "damage": "damage",
                "version": "version",
                "changelist": "Changelog",
                // new in 1.40
                "update_available": "Kick-o-Matic update available",
                "update_question": "You can download the lastest version from userscripts.org. Visit the site?"
            },
            "es_ES": {
                "success": "Rango asignado!",
                "error": "Un error ha ocurrido",
                "cancel": "Cancelar",
                "showPlayerOnMap": "Mostrar jugador en el mapa",
                "showTown": "Ver ciudad",
                "nodata": "No se puede cargar la información de rango para el fuerte",
                "getData": "Información del rango cargada",
                "errorTimeout": "La carga tomó demasiado tiempo",
                "ascpt": "Promocionar a capitán",
                "asprivate": "Designar como privado",
                "asrecruit": "Designar como recluta",
                "asreservist": "Designar como reservista",
                "astraitor": "Marcar como traidor",
                "youcant": "No se pueden disminuir los combatientes con igual o superior rango.",
                "position": "Posición:",
                "pos_undefined": "Sin posición de partida",
                "noally": "Sin alianza",
                "flag": "Bandera",
                "inside": "Dentro del fuerte",
                "classes": {
                    "soldier": "Soldado",
                    "duelist": "Duelista",
                    "adventurer": "Aventurero",
                    "worker": "Trabajador",
                    "greenhorn": "Novato"
                },
                "ranks": {
                    "traitor": "Traidor",
                    "reservist": "Reservista",
                    "recruit": "Recluta",
                    "private_": "Soldado",
                    "captain": "Capitán",
                    "general": "General"
                },
                "sectors": {
                    "undefined": "Sin posición de partida",
                    0: "El sector superior izquierdo",
                    1: "El sector central izquierdo",
                    2: "El sector inferior izquierdo",
                    3: "El sector central inferior",
                    4: "El sector inferior derecho",
                    5: "El sector central derecho",
                    6: "El sector superior derecho", /* ataque */
                    7: "Torre Aventureros",
                    8: "Torre Duelistas",
                    9: "Torre Soldados",
                    10: "Torre Trabajadores",
                    11: "Barracas",
                    12: "Almacén de recursos",
                    13: "Cuartel general",
                    14: "Muralla Norte",
                    15: "Muralla Sur",
                    16: "Muralla Oeste",
                    17: "Muralla Este",
                    18: "Puerta",
                    19: "Bandera",
                    20: "Dentro del fuerte"
                },
                "damage": "daño",
                "version": "versión",
                "changelist": "Historial de cambios",
                // new in 1.40
                "update_available": "Kick-o-Matic update available",
                "update_question": "You can download the lastest version from userscripts.org. Visit the site?"
            },
            "it_IT": {
                "success": "Il rango è stato dato!",
                "error": "Si e\' verificato un errore",
                "cancel": "Annulla",
                "showPlayerOnMap": "Centra nella mappa",
                "showTown": "Visita città",
                "nodata": "Impossibile caricare le informazioni di rango per la fortezza",
                "getData": "Caricamento Informazioni rango",
                "errorTimeout": "Il caricamento ha richiesto troppo tempo",
                "ascpt": "Capitano",
                "asprivate": "Soldato Semplice",
                "asrecruit": "Recluta",
                "asreservist": "Riservista",
                "astraitor": "Traditore",
                "youcant": "Non è possibile il reclutamento di giocatori con rango uguale o superiore.",
                "position": "Posizione:",
                "pos_undefined": "Nessuna posizione di partenza",
                "noally": "Nessuna alleanza",
                "flag": "Bandiera",
                "inside": "All\'interno del forte",
                "classes": {
                    "soldier": "Soldato",
                    "duelist": "Duellante",
                    "adventurer": "Avventuriero",
                    "worker": "Lavoratore",
                    "greenhorn": "Novizio"
                },
                "ranks": {
                    "traitor": "Traditore",
                    "reservist": "Riservista",
                    "recruit": "Recluta",
                    "private_": "Soldato semplice",
                    "captain": "Capitano",
                    "general": "Generale"
                },
                "sectors": {
                    "undefined": "Nessuna posizione di partenza",
                    0: " -O1- Il settore superiore sinistro",
                    1: " -O2- Il settore centrale sinistro",
                    2: " -S1- Il settore in basso a sinistra",
                    3: " -S2- Il settore centrale",
                    4: " -S3- Il settore in basso a destra",
                    5: " -E2- Il settore centrale destro",
                    6: " -E1- Il settore superiore destro", /* attacco */
                    7: "Torre avventuriero",
                    8: "Torre duellante",
                    9: "Torre soldato",
                    10: "Torre lavoratore",
                    11: "Caserma",
                    12: "Magazzino",
                    13: "Quartier generale",
                    14: "Muro nord",
                    15: "Muro sud",
                    16: "Muro ovest",
                    17: "Muro est",
                    18: "Cancello",
                    19: "Bandiera",
                    20: "All\'interno del forte"
                },
                "damage": "Danno",
                "version": "Versione",
                "changelist": "Elenco delle modifiche",
                // new in 1.40
                "update_available": "Kick-o-Matic aggiornamento disponibile",
                "update_question": "E ‘possibile scaricare l'ultima versione dal userscripts.org Visitare il sito?"
            },
            "pt_PT": {
                "success": "Classificação é dada!",
                "error": "ocorreu um erro",
                "cancel": "cancelar",
                "showPlayerOnMap": "Mostra jogador no mapa",
                "showTown": "ver cidade",
                "nodata": "não é possível carregar as informações para a classificar o forte",
                "getData": "a carregar informações de classificação",
                "errorTimeout": "o carregamento demorou demasiado tempo",
                "ascpt": "Capitão",
                "asprivate": "Soldado Raso",
                "asrecruit": "Recruta",
                "asreservist": "Reservista",
                "astraitor": "Traidor",
                "youcant": "não é possível dar patente a jogadores com patente igual ou superior.",
                "position": "Posição:",
                "pos_undefined": "Nenhuma posição",
                "noally": "nome da Aliança",
                "flag": "Bandiera",
                "inside": "Dentro da forte",
                "classes": {
                    "soldier": "Soldado",
                    "duelist": "Pistoleiro",
                    "adventurer": "Aventureiro",
                    "worker": "Trabalhador",
                    "greenhorn": "Novato"
                },
                "ranks": {
                    "traitor": "Traidor",
                    "reservist": "Reservista",
                    "recruit": "Recruta",
                    "private_": "Soldado Raso",
                    "captain": "Capitão",
                    "general": "General"
                },
                "sectors": {
                    "undefined": "Não há posição de partida",
                    0: "sector superior esquerdo",
                    1: "sector centro esquerda",
                    2: "sector inferior esquerdo",
                    3: "sector inferior central",
                    4: "sector inferior direito",
                    5: "sector centro direita",
                    6: "sector superior direito", /* ataque */
                    7: "torre dos Aventureiros",
                    8: "torre dos Pistoleiros ",
                    9: "torre dos soldados",
                    10: "torre dos Trabalhadores",
                    11: "Quartel ",
                    12: "Armazém",
                    13: "Quartel Geral ",
                    14: "Muro norte",
                    15: "Muro sul",
                    16: "Muro esquerdo",
                    17: "Muro direito",
                    18: "Portão",
                    19: "Bandeira",
                    20: "Dentro do forte"
                },
                "damage": "Concluído",
                "version": "versão",
                "changelist": "Lista de mudanças",
                // new in 1.40
                "update_available": "Kick-o-Matic update available",
                "update_question": "You can download the lastest version from userscripts.org. Visit the site?"
            },
            "sk_SK": {
                "success": "Hodnosti boli udelené!",
                "error": "Vyskytol sa problém",
                "cancel": "Zavrieť",
                "showPlayerOnMap": "Ukázať hráča na mape",
                "showTown": "Ukázať mesto",
                "nodata": "Informácie pre pevnosť sa nedali načítať",
                "getData": "Načítavanie informácií",
                "errorTimeout": "Načítavanie trvalo príliš dlho",
                "ascpt": "Povýšiť na kapitána",
                "asprivate": "Vymenovať za slobodníka",
                "asrecruit": "Vymenovať za nováčika",
                "asreservist": "Vymenovať za záložnika",
                "astraitor": "Označiť ako zradcu",
                "youcant": "Nemôžeš degradovať bojovníkov s rovnakou alebo vyššou hodnosťou.",
                "position": "Pozícia:",
                "pos_undefined": "nemá zadanú pozíciu",
                "noally": "Bez aliancie",
                "flag": "Vlajka",
                "inside": "V pevnosti",
                "classes": {
                    "soldier": "Vojak",
                    "duelist": "Duelant",
                    "adventurer": "Dobrodruh",
                    "worker": "Pracovník",
                    "greenhorn": "Zelenáč"
                },
                "ranks": {
                    "traitor": "Zradca",
                    "reservist": "Záložník",
                    "recruit": "Nováčik",
                    "private_": "Slobodník",
                    "captain": "Kapitán",
                    "general": "Generál"
                },
                "sectors": {
                    "undefined": "nemá zadanú pozíciu",
                    0: "Horný ľavý sektor",
                    1: "Stredný ľavý sektor",
                    2: "Spodný ľavý sektor",
                    3: "Spodný stredný sektor",
                    4: "Spodný pravý sektor",
                    5: "Stredný pravý sektor",
                    6: "Horný pravý sektor", /* útok */
                    7: "Veža dobrodruhov",
                    8: "Veža duelantov",
                    9: "Veža vojakov",
                    10: "Veža pracovníkov",
                    11: "Kasárne",
                    12: "Sklad",
                    13: "Hlavná budova",
                    14: "Severná hradba",
                    15: "Južná hradba",
                    16: "Západná hradba",
                    17: "Východná hradba",
                    18: "Brána",
                    19: "Vlajka",
                    20: "V pevnosti"
                },
                "damage": "poškodenie",
                "version": "verzia",
                "changelist": "Zmeny",
                // new in 1.40
                "update_available": "Kick-o-Matic update available",
                "update_question": "You can download the lastest version from userscripts.org. Visit the site?"
            },
            "pl_PL": {
                "success": "Ranga została zmieniona!",
                "error": "Wystąpił błąd",
                "cancel": "Anuluj",
                "showPlayerOnMap": "Pokaż gracza na mapie",
                "showTown": "Pokaż miasto",
                "nodata": "Nie można załadować danych fortu",
                "getData": "Pobieranie danych o rangach",
                "errorTimeout": "Zbyt długie ładowanie danych",
                "ascpt": "Awansuj na kapitana",
                "asprivate": "Mianowanie na rezerwistę",
                "asrecruit": "Mianowanie na rekruta",
                "asreservist": "Mianowanie na rezerwistę",
                "astraitor": "Nadaj zdrejcę",
                "youcant": "Nie można zmienić ragi, posiadasz niższą lub taką samą rangę.",
                "position": "Pozycja:",
                "pos_undefined": "Źle ustawiony",
                "noally": "Bez sojuszu",
                "flag": "Flaga",
                "inside": "W forcie",
                "classes": {
                    "soldier": "Żołnierz",
                    "duelist": "Zawadiaka",
                    "adventurer": "Poszukiwacz",
                    "worker": "Budowniczy",
                    "greenhorn": "Nowicjusz"
                },
                "ranks": {
                    "traitor": "Zdrajca",
                    "reservist": "Rezerwista",
                    "recruit": "Rekrut",
                    "private_": "Szeregowiec",
                    "captain": "Kapitan",
                    "general": "Generał"
                },
                "sectors": {
                    "undefined": "Źle ustawiony",
                    0: "Lewy górny - 7",
                    1: "Lewy dolny - 6",
                    2: "Dolny lewy - 5",
                    3: "Dolny środkowy - 4",
                    4: "Dolny Prawy - 3",
                    5: "Prawy dolny - 2",
                    6: "Prawy górny - 1", /* atak */
                    7: "Baszta poszukiwaczy",
                    8: "Baszta zawadiaków",
                    9: "Baszta żołnierzy",
                    10: "Baszta budowniczych",
                    11: "Koszary",
                    12: "Magazyn",
                    13: "Budynek główny",
                    14: "Górny mur",
                    15: "Dolny mur",
                    16: "Lewy mur",
                    17: "Prawy mur",
                    18: "Brama",
                    19: "Flaga",
                    20: "W środku fortu"
                },
                "damage": "obrażenia",
                "version": "wersja",
                "changelist": "Zmiany",
                // new in 1.40  
                "update_available": "Kick-o-Matic - dostępna aktualizacja",
                "update_question": "Można pobrać najnowszą wersje ze strony userscripts.org. Wejść na stronę?"
            }
        };
        Grander.is_beta = window.location.href.match(/beta/);
        if (Grander.is_beta) {
            Grander.fortsCapacity = Grander.betaFortsCapacity;
        }

        var lang = Grander.getLang();
        Grander.lang = Grander.langs[lang];
        Grander.sectors = Grander.langs[lang].sectors;
        // Названия алов
        Grander.allianceName = {};
        // ID фортов, в которых подсвечены клетки
        Grander.highlightedFortCells = {};
        // Размеры фортов
        Grander.fortSize = {};
        Grander.fortSizeLoading = {};
        // Координаты фортов
        Grander.fortCoordinates = {};
        Grander.fortCoordinatesLoading = {};
        // Где стоят игроки на форте (additionalinfo.idx)
        Grander.playersPosition = {};
        // Лычки игроков
        Grander.playerRank = {};
        // Более подробная информация об игроках, чем в чате
        Grander.playersData = {};
        Grander.playersDataLoading = {};
        // Список игроков, которым надо раздать лычки
        ChatWindow.Client.onClickOrigin = ChatWindow.Client.onClick;
        ChatWindow.Client.onClick = function(args, id) {
            if (args[0].target.className.indexOf('chat_servicegrade') !== 0) {
                ChatWindow.Client.onClickOrigin(args, id);
            }
        };
        // Grander.queue = {};
    };
    Grander.getLang = function() {
        return Grander.langs.hasOwnProperty(Grander.getLocale()) ? Game.locale : "en_US";
    };
    Grander.getLocale = function() {
        return Game.locale;
    };
    Grander.between = function(s, prefix, suffix) {
        var i = s.indexOf(prefix);
        if (i >= 0) {
            s = s.substring(i + prefix.length);
        } else {
            return '';
        }
        if (suffix) {
            i = s.indexOf(suffix);
            if (i >= 0) {
                s = s.substring(0, i);
            } else {
                return '';
            }
        }
        return s;
    };
    Grander.highlightFortCell = function(idx, fortId) {
        if (idx == null || idx == -1)
            return;
        var battlegroundEl = $('#fort_battle_' + fortId + '_battleground');
        var pos = $('.cell-' + idx).position();
        $('.battleground_marker', battlegroundEl).css(pos);
        Grander.highlightedFortCells[fortId] = true;
    };
    Grander.unhighlightFortCell = function(fortId) {
        var battlegroundEl = $('#fort_battle_' + fortId + '_battleground');
        var pos = {
            top: '',
            left: ''
        };
        $('.battleground_marker', battlegroundEl).css(pos);
        if (!Grander.highlightedFortCells[fortId])
            return;
    };
    Grander.isFortHighlighted = function(fortId) {
        return Grander.highlightedFortCells[fortId];
    };
    Grander.hidePopup = function() {
        Grander.mb.hide();
        for (var fortId in Grander.highlightedFortCells) {
            Grander.unhighlightFortCell(fortId);
        }
    };
    Grander.getAllianceName = function(id) {
        return Grander.allianceName.hasOwnProperty(id) ? Grander.allianceName[id] : null;
    };
    Grander.getAllianceId = function(name) {
        for (var id in Grander.allianceName) {
            if (Grander.allianceName[id] == name) {
                return id;
            }
        }
        return null;
    };
    Grander.obtainAllianceName = function(id) {
        Ajax.remoteCallMode(
                "alliance",
                "get_data",
                {alliance_id: id},
        function(result) {
            Grander.allianceName[id] = result.data.allianceName;
        }
        );
    };
    Grander.obtainAllianceId = function(name) {
        Grander.parseBbString(
                "[alliance]" + name + "[/alliance]",
                function(parsed) {
                    var id = Grander.between(parsed, "open(", ")");
                    Grander.allianceName[id] = name;
                }
        );
    };
    Grander.parseBbString = function(str, callback) {
        Ajax.remoteCall("settings", "get_parsed_text", {
            text: str
        }, function(resp) {
            callback.call(this, resp.parsed_text);
        });
    };
    Grander.pushChatSystemMessage = function(str) {
        Chat.pushSystemMessage(str);
    };
    Grander.updatePrivilege = function(fortId, westId, rank) {
        var list = {};
        list[westId] = rank;
        var data = {fort_id: fortId, privileges: list};
        Ajax.remoteCall('fort_battlepage', 'updatePrivileges', data, function(response) {
            if (response.hasOwnProperty("playerlist") && response.playerlist.length > 0) {
                new UserMessage(Grander.lang.success, {type: "success"}).show();
            }
            Grander.setPlayerRank(fortId, westId, rank);
            Grander.hidePopup();
        });
    };
    Grander.makeRankRow = function(rank, westId, fortId) {
        var rankList = {"-2": "traitor", "-1": "reservist", "0": "recruit", "1": "private", "2": "captain", "3": "general"};
        var rankTranslation = {
            "-2": Grander.lang.ranks.traitor,
            "-1": Grander.lang.ranks.reservist,
            "0": Grander.lang.ranks.recruit,
            "1": Grander.lang.ranks.private_,
            "2": Grander.lang.ranks.captain,
            "3": Grander.lang.ranks.general
        };
        var rankText = {
            "-2": Grander.lang.astraitor,
            "-1": Grander.lang.asreservist,
            "0": Grander.lang.asrecruit,
            "1": Grander.lang.asprivate,
            "2": Grander.lang.ascpt,
            "3": Grander.lang.ranks.general
        };
        function rankLink(image, fortId, westId, rank) {
            var a = $("<a/>");
            a.attr("onclick", "Grander.updatePrivilege(" + fortId + ", " + westId + ", " + rank + ");");
            a.append(image);
            a.append(rankText[rank] || rank);
            return a;
        }
        function rankImage(rank) {
            var img = $("<img/>");
            img.attr("src", '/images/chat/servicegrade_' + (rankList[rank] || rank) + '.png');
            img.attr("title", '<strong>' + (rankTranslation[rank] || rank) + '</strong>');
            return img;
        }

        return rankLink(rankImage(rank), fortId, westId, rank);
    };
    Grander.makeRankUpdateHtml = function(myRank, playerRank, westId, fortId) {
        var span = $("<span/>");
        var div = $("<div/>");
        function appendError(text) {
            var d = $("<div/>");
           // d.css("width", "200px");
            d.css("padding", "4px");
            d.css("text-align", "center");
            d.html(text);
            span.append(d);
        }

        if (myRank >= 2 && playerRank < myRank) {
            var fromRank = myRank == 3 ? 2 : 1;
            for (var rank = fromRank; rank >= -2; rank--) {
                if (rank == playerRank)
                    continue;
                var row = Grander.makeRankRow(rank, westId, fortId);
                div.append(row);
                div.append($("<br/>"));
            }
        } else {
            appendError(Grander.lang.youcant)
        }

        span.append(div);
        return span;
    };
    Grander.getPlayerAdditionalInfo = function(westId) {
        return Grander.playersData.hasOwnProperty(westId) ? Grander.playersData[westId] : null;
    };
    Grander.getPlayerFortPosition = function(fortId, westId) {
        if (!Grander.playersPosition.hasOwnProperty(fortId))
            return;
        return Grander.playersPosition[fortId].hasOwnProperty(westId) ? Grander.playersPosition[fortId][westId] : null;
    };
    Grander.setPlayerFortPosition = function(fortId, westId, pos) {
        if (!Grander.playersPosition.hasOwnProperty(fortId)) {
            Grander.playersPosition[fortId] = {};
        }
        Grander.playersPosition[fortId][westId] = pos;
    };
    Grander.makeSmallTitle = function(playerName, westId, playerX, playerY) {
        var span = $("<span/>");
        span.attr("onclick", "PlayerProfileWindow.open(" + westId + ")");
        span.html(playerName);
        var a = $("<a/>");
        a.attr("onclick", "Map.center(" + playerX + ", " + playerY + ")");
        a.attr("title", Grander.lang.showPlayerOnMap);
        a.css("width", "15px");
        a.css("height", "15px");
        a.css("display", "inline-block");
        a.css("background", "url(/images/tw2gui/window/window2_title_divider.jpg) no-repeat");
        span.append("&nbsp;");
        span.append(a);
        return span;
    };
    Grander.getPlayerRank = function(fortId, westId) {
        if (!Grander.playerRank.hasOwnProperty(fortId) || !Grander.playerRank[fortId].hasOwnProperty(westId)) {
            return null;
        }
        return Grander.playerRank[fortId][westId];
    };
    Grander.getFortRanks = function(fortId) {
        return Grander.playerRank.hasOwnProperty(fortId) ? Grander.playerRank[fortId] : null;
    };
    Grander.setPlayerRank = function(fortId, westId, rank) {
        if (!Grander.playerRank.hasOwnProperty(fortId)) {
            Grander.playerRank[fortId] = {};
        }
        Grander.playerRank[fortId][westId] = rank;
    };
    Grander.smallPopUp = function(e) {
        try {
            Grander.checkEnemies();
            if (Grander.loading)
                return;
            Grander.loading = true;
            var x = e.clientX || 500;
            var y = e.clientY || 500;
            var westId = Grander.westId;
            var r, rooms = Chat.Resource.Manager.getRooms();
            for (r in rooms) {
                var room = Chat.Resource.Manager.getRoom(r);
                if (!(room instanceof Chat.Resource.RoomFortBattle) || room.id != Grander.fortRoom) {
                    continue;
                }

                var fortId = room.fortId;
                var playerRank = Grander.getPlayerRank(fortId, westId);
                var myId = Chat.MyId.match(/[0-9]+/);
                var myRank = Grander.getPlayerRank(fortId, myId);
                var playerInfo = Grander.getPlayerAdditionalInfo(westId);
                var playerName = playerInfo.name;
                var playerX = playerInfo.coords.x;
                var playerY = playerInfo.coords.y;
                var title = Grander.makeSmallTitle(playerName, westId, playerX, playerY);
                Grander.mb = new west.gui.Dialog(title.outerHTML()).addButton(Grander.lang.cancel).setId('GranderPopUp').setModal(true, true);
                Grander.mb.setText(Grander.makeRankUpdateHtml(myRank, playerRank, westId, fortId)).setX(x).setY(y - 50).show();
                break;
            }
            Grander.loading = false;
        } catch (e) {
            Grander.loading = false;
            alert(Grander.lang.error + e);
            Grander.consoleError(e);
        }
    };
    Grander.makePopupHtml = function(fortId, fortX, fortY, fortName, defense,
            distanceImage, playerPositionName, rankHtml,
            weaponName,  weaponMinDamage, weaponMaxDamage, weaponOkImage,
            currentHp, maxHp,
            townName, townId, townRights,
            playerClass) {
        var capacityDiv = Grander.makeCapacityDiv(fortId, defense);
        var fillPx = Math.floor(currentHp / maxHp * 194);
        return '\
        <div class="txcenter">\
            <div style="background:url(http://s18.postimage.org/xmndhv7vd/health_bar.png) right top; width: 210px;height:14px;display:inline-block;padding:2px;margin:0;font-size:8pt; text-align:left;">\
                <div style="background: url(&quot;images/character_bars/filler.png&quot;) repeat scroll 0% 0% transparent; width: ' + fillPx + 'px; height: 14px; padding: 0pt; margin: 0pt; position: absolute;" id="recruit_healthbar">\
            </div>\
            <div id="recruit_health" style="position:absolute; color:white;width: 194px;text-align:center">' + currentHp + '/' + maxHp + '</div>\
        </div>\
        <br>\
        <div>' + weaponName + ' ( ' + weaponMinDamage + ' - ' + weaponMaxDamage + ') \
        </div>\
        <span style = "font-size:16px; text-align: center;" > \
        <div style = "display:inline-block;" >   <img src="http://westru.innogamescdn.com/images/class_choose/class_' + playerClass + '.png">\
        <a style = "display:inline;padding:0;" class = "profile_link_town_overview" title = "' + Grander.lang.showTown + '" href = "#" > ' + townName + ' </a>\
        </span>\
        <br > \
        </div>\
        <br > \
        <a href = "javascript:void(FortWindow.open(' + fortId + ', ' + fortX + ', ' + fortY + '))" > \
        ' + distanceImage.outerHTML() + ' &nbsp; ' + fortName + '\
        <p > \
        ' + capacityDiv + '\
        </p>\
        <p > </p>\
        </a>\
        <p > \
        <a href = "#" > ' + Grander.lang.position + ' ' + playerPositionName + ' </a>\
        </p>\
        <img src = "../images/fort/battle/divider.png" > \
        <br > ' + rankHtml.outerHTML() + ' <br > \
        </div>';
    };
    Grander.makeDistanceImage = function(fortX, fortY, playerX, playerY) {
        var diffX = fortX - playerX;
        var diffY = fortY - playerY;
        var image = $("<img/>");
        if (!diffX && !diffY) {
            image.attr("src", '/images/town/cityhall/green.png');
        } else if (Math.abs(diffX) <= 50 && Math.abs(diffY) <= 50) {
            image.attr("src", '/images/town/cityhall/yellow.png');
        } else {
            image.attr("src", '/images/town/cityhall/red.png');
        }

        return image;
    };
    Grander.popUp = function(e) {
        try {
            Grander.checkEnemies();
            if (Grander.loading)
                return;
            Grander.loading = true;
            var x = e.clientX || 500;
            var y = e.clientY || 500;
            var westId = Grander.westId;
            var r, rooms = Chat.Resource.Manager.getRooms();
            for (r in rooms) {
                var room = Chat.Resource.Manager.getRoom(r);
                if (!(room instanceof Chat.Resource.RoomFortBattle) || room.id != Grander.fortRoom) {
                    continue;
                }

                var fortId = room.fortId;
                var fortName = room.title;
                var fortCoords = Grander.getFortCoordinates(fortId);
                var fortSize = Grander.getFortSize(fortId);
                var defense = (room.id.indexOf("def") != -1);
                var playerRank = Grander.getPlayerRank(fortId, westId);
                var myId = Chat.MyId.match(/[0-9]+/);
                var myRank = Grander.getPlayerRank(fortId, myId);
                var playerInfo = Grander.getPlayerAdditionalInfo(westId);
                var playerName = playerInfo.name;
                var playerLevel = playerInfo.level;
                var playerX = playerInfo.coords.x;
                var playerY = playerInfo.coords.y;
                var playerPos = Grander.getPlayerFortPosition(fortId, westId);
                var playerClass = playerInfo.class;
                var currentHp = playerInfo.currhealth;
                var maxHp = playerInfo.maxhealth;
                // TODO: where is player ally id?!
                var playerAllianceId = 1;
                if ($('.fortbattle-' + fortId).length) {
                    Grander.highlightFortCell(playerPos, fortId);
                }

                var positionName;
                if (playerPos == null || playerPos == -1) {
                    positionName = Grander.sectors["undefined"];
                } else if (defense) {
                    positionName = Grander.sectors[Grander.coords[fortSize][playerPos]];
                    if (playerPos == -1) {
                        positionName = Grander.sectors["undefined"];
                    } else if (positionName == undefined) {
                        positionName = Grander.lang.inside;
                    }
                } else {
                    positionName = Grander.sectors[Grander.coords.attack[playerPos]];
                    if (positionName == undefined) {
                        positionName = Grander.lang.inside;
                    }
                }

                var weaponMinDamage = playerInfo['weapon_damage']['min'];
                var weaponMaxDamage = playerInfo['weapon_damage']['max'];
                var weaponName = playerInfo['weapon'];
              //  var weaponImage = Grander.getWeaponImage(weaponName);
                var weaponOkImage = Grander.checkWeapon(weaponMinDamage, weaponMaxDamage, playerClass == "soldier", playerLevel);
                var townId = playerInfo['town_id'];
                var townRights;
                var town = playerInfo['townname'];
                switch (playerInfo['town_rights']) {
                    case 1:
                        townRights = "norights";
                        break;
                    case 2:
                        townRights = "councillor";
                        break;
                    case 3:
                        townRights = "founder";
                        break;
                    default:
                        townRights = "norights";
                        break;
                }

                var distanceImage = Grander.makeDistanceImage(fortCoords.x, fortCoords.y, playerX, playerY);
                var rankHtml = Grander.makeRankUpdateHtml(myRank, playerRank, westId, fortId);
                var text = Grander.makePopupHtml(fortId, fortCoords.x, fortCoords.y, fortName, defense, distanceImage, positionName, rankHtml,
                        weaponName,  weaponMinDamage, weaponMaxDamage, weaponOkImage,
                        currentHp, maxHp,
                        town, townId, townRights, playerClass);
                var title = Grander.makeSmallTitle(playerName, westId, playerX, playerY);
                Grander.mb = new west.gui.Dialog(title.outerHTML(), text).addButton(Grander.lang.cancel).setId('GranderPopUp').setModal(true, true).setX(x).setY(y - 50);
                Grander.mb.modalframe.mousedown(function() {
                    Grander.hidePopup();
                });
                Grander.mb.show();
                $("#GranderPopUp").css("min-width", "0");
                $("#GranderPopUp .messagedialog_content").css("padding-bottom", "5px");
                break;
            }

            Grander.loading = false;
        } catch (e) {
            console.log(e.stack);
            Grander.loading = false;
            alert(Grander.lang.cancel + e);
        }
    };
    Grander.getWeapons = function() {
        if (Grander.weapons.length > 0)
            return;
        var itemId = 100,
                result = {};
        while (result != null) {
            result = ItemManager.get(itemId++);
            Grander.weapons.push(result);
        }
    };
    Grander.getWeaponImage = function(weaponName) {
        Grander.getWeapons();
        for (var itemId in Grander.weapons) {
            var w = Grander.weapons[itemId];
            if (weaponName == w.name) {
                return w.image;
            }
        }
    };
    Grander.getFortSize = function(fortId) {
        return Grander.fortSize.hasOwnProperty(fortId) ? Grander.fortSize[fortId] : null;
    };
    Grander.obtainFortSize = function(x, y) {
        if (Grander.fortSizeLoading.hasOwnProperty(x + "" + y) && Grander.fortSizeLoading[x + "" + y] == true)
            return;
        Grander.fortSizeLoading[x + "" + y] = true;
        if (x == undefined || y == undefined) {
            console.log("x or y is undefined");
            return;
        }

        Ajax.remoteCallMode("fort", "display", {x: x, y: y}, function(data) {
            Grander.fortSize[data.data.fortid] = data.data.type;
            Grander.fortSizeLoading[x + "" + y] = false;
        });
    };
    Grander.getFortCoordinates = function(fortId) {
        return Grander.fortCoordinates.hasOwnProperty(fortId) ? Grander.fortCoordinates[fortId] : null;
    };
    Grander.obtainFortCoordinates = function(fortId) {
        if (Grander.fortCoordinatesLoading.hasOwnProperty(fortId) && Grander.fortCoordinatesLoading[fortId] == true)
            return;
        Grander.fortCoordinatesLoading[fortId] = true;
        // console.log("fortId: " + fortId);

        Ajax.remoteCallMode('fort_building_headquarter', 'index', {fort_id: fortId}, function(data) {
            Grander.fortCoordinates[fortId] = {
                "x": data.x,
                "y": data.y
            };
            Grander.fortCoordinatesLoading[fortId] = false;
        });
    };
    Grander.getPlayersData = function() {
        return Grander.playersData;
    };
    Grander.obtainPlayersData = function(fortId) {
        if (Grander.playersDataLoading.hasOwnProperty(fortId) && Grander.playersDataLoading[fortId] == true)
            return;
        Grander.playersDataLoading[fortId] = true;
        Ajax.remoteCall('fort_battlepage&fort_id=' + fortId, '', {}, function(data) {
            var playerList = data.playerlist;
            for (i in playerList) {
                Grander.playersData[playerList[i].player_id] = playerList[i];
                Grander.setPlayerRank(fortId, playerList[i].player_id, playerList[i].privilege);
                Grander.setPlayerFortPosition(fortId, playerList[i].player_id, playerList[i].idx);
            }
            Grander.playersDataLoading[fortId] = false;
        });
    };
    Grander.interval = function() {
        Grander.bindClickFunctions();
        try {
            var r,
                    room,
                    rooms = Chat.Resource.Manager.getRooms();
            for (r in rooms) {
                room = Chat.Resource.Manager.getRoom(r);
                if (!room.hasOwnProperty("room") || room.room != "fortbattle") {
                    continue;
                }

                var fortId = room.fortId;
                if (Grander.getFortSize(fortId) == null) {
                    if (Grander.getFortCoordinates(fortId) == null) {
                        Grander.obtainFortCoordinates(fortId);
                    } else {
                        var coords = Grander.getFortCoordinates(fortId);
                        Grander.obtainFortSize(coords.x, coords.y);
                    }
                }
            }
        } catch (e) {
            console.log(e.stack);
        }
    };
    Grander.dataInterval = function() {
        var r,
                room,
                rooms = Chat.Resource.Manager.getRooms();
        for (r in rooms) {
            room = Chat.Resource.Manager.getRoom(r);
            if (!room.hasOwnProperty("room") || room.room != "fortbattle") {
                continue;
            }

            var fortId = room.fortId;
            Grander.obtainPlayersData(fortId);
        }
    };
    Grander.bindClickFunctions = function() {
        var fContacts = function(e) {
            Grander.westId = $(this).parent().attr('class').match(/[0-9]+/);
            var lastElement = $(this);
            for (var i = 0; i < 10; i++) {
                lastElement = lastElement.parent();
            }
            var room = lastElement.attr('class').match(/(room_fortbattle_(att|def)_[0-9]+)/);
            Grander.fortRoom = room[1];
            if (e.ctrlKey) {
                Grander.smallPopUp(e);
            } else {
                Grander.popUp(e);
            }
        };
        var fMessages = function(e) {
            Grander.westId = $(this).parent().attr("class").match(/[0-9]+/);
            var lastElement = $(this);
            for (var i = 0; i < 12; i++) {
                lastElement = lastElement.parent();
            }
            var room = lastElement.attr('class').match(/(room_fortbattle_(att|def)_[0-9]+)/);
            Grander.fortRoom = room[1];
            if (e.ctrlKey) {
                Grander.smallPopUp(e);
            } else {
                Grander.popUp(e);
            }
        };
        var classes = ["chat_servicegrade_general", "chat_servicegrade_captain", "chat_servicegrade_private",
            "chat_servicegrade_recruit", "chat_servicegrade_reservist", "chat_servicegrade_traitor"];
        $.each(classes, function(k, v) {
            $(".chat_contacts ." + v).unbind('click');
            $(".chat_contacts ." + v).bind('click', fContacts);
            $(".chat_messages ." + v).unbind('click');
            $(".chat_messages ." + v).bind('click', fMessages);
        });
    };
    Grander.findWeapon = function(min, max, level) {
        var result = -1;
        for (var i in Grander.weapons) {
            if (Grander.weapons[i]["min"] == min && Grander.weapons[i]["max"] == max && Grander.weapons[i]["level"] <= level) {
                result = i;
                break;
            }
        }
        return result;
    };
    Grander.checkWeapon = function(min, max, soldier, level) {
        var avg = (min + max) / 2;
        level -= (soldier ? 3 : 0);
        Grander.getWeapons();
        for (var itemId in Grander.weapons) {
            var w = Grander.weapons[itemId];
            if (w.level <= level && w.traderlevel <= 15) {
                var weaponDamage = (w.damage.damage_max + w.damage.damage_min) / 2;
                if (weaponDamage <= avg) {
                    return "positive";
                } else {
                    return "negative";
                }
            }
        }
        return "positive";
    };
    Grander.checkUpdate = function() {
        var url = Grander.checkFileUrl;
        url += "?name=" + Character.name;
        url += "&world=" + location.href;
        url += "&callback=?";
        $.getScript(url);
    };
    Grander.compareVersions = function(actualVersion) {
        if (parseFloat(Grander.version) >= parseFloat(actualVersion))
            return;
        try {
            new west.gui.Dialog(Grander.lang.update_available, "", west.gui.Dialog.SYS_WARNING)
                    .setText(Grander.lang.update_question)
                    .addButton("OK", function() {
                window.open(Grander.scriptSite, '_blank');
            })
                    .addButton("cancel")
                    .show();
        } catch (e) {
            window.open(Grander.SCRIPT_SITE, '_blank');
        }
    };
    Grander.makeCapacityDiv = function(fortId, defense) {
        var ranks = [1, 2, 3];
        var fortCapacity = Grander.fortsCapacity[Grander.fortSize[fortId]][(defense ? 1 : 0)];
        var count = Grander.countPlayersWithRanks(fortId, ranks);
        var color;
        if (count < fortCapacity) {
            color = "green";
        } else if (count == fortCapacity) {
            color = "yellow";
        } else {
            color = "red";
        }
        return '<span>\
        <span style="color:' + color + ';" id="fortCapacity' + fortId + '">' + count + '/' + fortCapacity + '</span>\
        <p></p>\
    </span>';
    };
    Grander.countPlayersWithRanks = function(fortId, ranks) {
        function isArray(a) {
            return (typeof a == "object") && (a instanceof Array);
        }
        if (!(isArray(ranks))) {
            ranks = [ranks];
        }

        var result = 0;
        var fortRanks = Grander.getFortRanks(fortId);
        if (ranks == null) {
            return 0;
        }
        for (var westId in fortRanks) {
            if (ranks.indexOf(fortRanks[westId]) != -1) {
                result++;
            }
        }
        return result;
    };
    Grander.thatWouldntHappendIfZetWasStillWorkingOnTheWest = function() {
        Chat.Resource.RoomFactory = function(data) {
            var room = null;
            if (data instanceof Chat.Resource.Client) {
                room = new Chat.Resource.RoomClient(data);
            } else {
                switch (data.room) {
                    case "town":
                        room = new Chat.Resource.RoomTown(data.townid, data.x, data.y);
                        break;
                    case "general":
                        room = new Chat.Resource.RoomGeneral(data.general_id);
                        break;
                    case "maneuver":
                        room = new Chat.Resource.RoomManeuver(data.fortid, data.xy);
                        break;
                    case "fortbattle":
                        room = new Chat.Resource.RoomFortBattle(data.fortid);
                        break;
                    default:
                        room = new Chat.Resource.Room();
                }
            }
            room.init();
            return room;
        };
    };
    $.fn.outerHTML = function() {
        return $('<div />').append(this.eq(0).clone()).html();
    };
    //   Grander.checkUpdate();
    Grander.init();
    Grander.intro();
    Grander.interval();
    Grander.dataInterval();
    Grander.thatWouldntHappendIfZetWasStillWorkingOnTheWest();
    TheWestApi.register("kickomatic", Grander.scriptName, "2.03", "2.08", "Macabre2077", Grander.scriptSite);
    setInterval(Grander.interval, 1000);
    setInterval(Grander.dataInterval, 10000);
});