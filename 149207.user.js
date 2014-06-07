// ==UserScript==
// @name        websitemaster admin
// @namespace   http://admin.websitemaster.com
// @include     http://admin.websitemaster.com/*
// @version     2013.05.30 16:00
// ==/UserScript==

// Replace elements
(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
    // Insert all elements
    "lértesítened": "l értesítened",
    "eoldal@sanomamedia.hu sorting eoldal": "Moderátor",
    "attila.virag@sanomabp.hu ": "Virág Attila",
    " tartalom": "",
    "Hirdetésre alkalmatlan": "Banner KI",
    "Banner kényszerítés": "Banner BE",
    "Keresés a teljes listában:": "Keresés:",
    "Keresés ebben:": "Szűkítés:",
    "MENU_samples": "Mintaoldalak",
    "STATS_blocked": "Blokkolt",
    "Stáhnout seznam adres": "Adatbázis letöltése",
    "Szűrési feltételek:": "Szűrési feltételek",
    "logname": "",
    "Inaktív blocked": "Inaktív",
    "Próbaidős blocked": "Próbaidős",
    "Ingyenes blocked": "Ingyenes",
    "Plusz blocked": "Plusz",
    "Üzleti blocked": "Üzleti",
    "0000-00-00 00:00:00": "",
    "0/0": "",
    "USERS_notes_repeat": "Újraellenőrzés:",
    "--vybrat--": "--válassz--",
    "za týden": "7 nap múlva",
    "za měsíc": "30 nap múlva",
    "za půl roku": "182 nap múlva",
    "za rok": "365 nap múlva",
    "comMiel": "com Miel",
    "user not entry data": "A felhasználónak még nincsenek rendelései",
    "» detail": "» Adatlap",
    "» notes": "» Feljegyzések",
    "» domains": "» Domainnév",
    "» payments": "» Rendelések",
    "» rights": "» Jogosultságok",
    "username:": "E-mail: ",
    "password:": "Jelszó: ",
    "Remember me": "Megjegyezzem",
    "Forgot your password": "Elfelejtetted a jelszavad",
    "domain has own paysystem, it isn't possible to get invoice data": "nem kérhetők le a számlaadatok ehhez a domainhez",
    "Üres használat": "Üres",
    "Havi látogatás": "Havi",
    "Tegnapi látogatás": "Tegnapi",
    "Címke a/f": "a/f",
    "Osztályozó munkatárs": "Munkatárs",
    "Nyelvi változat": "Nyelv",
    "Nem aktivált": "Inaktív",
    "Próbaidőszak": "Próbaidős",
    "Érdekes oldalak": "Érdekes",
    "Létrehozás dátuma": "Regisztráció",
    "Utolsó bejelentkezés": "Bejelentkezés",
    "E-mailcím": "E-mail",
    "upravit": "átírás",
    "Tömeges e-mailek": "E-mail lista",
    "Weboldalak": "Főoldal",
    "žádné aktivní služby": "Nincs aktív szolgáltatás...",
    "USERS_domains_extdomain": "Külső",
    "download XML orders": "(OPK XML letöltése)",
    "there is no other user for sorting": "Nincs több moderálni való, csinálj valami mást! :)",
    "tipus: storno": "SZÁMLA: SZTORNÓZVA!!!",
    "payed: yes": "SZÁMLA: lezárt",
    "payed: no": "SZÁMLA: befizetésre vár...",
    "fizetesmodkod: ut": "FIZETÉSI MÓD: banki átutalás",
    "fizetesmodkod: cs": "FIZETÉSI MÓD: csekkes",
    "fizetesmodkod: ot": "FIZETÉSI MÓD: bankkártyás",
    "statusz: kesz": "STÁTUSZ: kész",
    "date: ": "DÁTUM: ",
    "szamlaszam: ": "SZÁMLASZÁM: ",
    "---bank transfer---":  "[--- Fizetési mód választása ---]",
    "---bank transfer2---": "[--- Számlakészítés ------------]",
    "---bank transfer3---": "[--- Számlaküldés --------------]",
    "---storno---":         "[--- Számlatörlés --------------]",
    "---payment---":        "[--- Banki visszaigazolás ------]",
    "idegenpartnerid: ": "Oldalkód: ",
    "vasarol_kid: ": "Rendelési azonosító: ",
    "vasarolid: ": "Jóváírás lekérése: ",
    "rendelesszam: ": "Rendelésszám: ",
    "t_cikkszam: ": "Cikkszám: ",
    "siker: 1": "Nyomtatható: igen",
    "siker: 0": "Nyomtatható: nem",
    "bks_vykcy@hotmail.com": "►►►ALERT!◄◄◄ bks_vykcy@hotmail.com ►►►ALERT!◄◄◄ Üzleti tartalmú oldalakat gyárt tömegesen!",
    "matrix11@t-online.hu": "►►►FYI!◄◄◄ matrix11@t-online.hu ►►►FYI!◄◄◄ Több oldala is van, volt, amit üzleti moderálni kellett.",
    "drtgere@freemail.hu": "►►►FYI!◄◄◄ drtgere@freemail.hu ►►►FYI!◄◄◄ Több oldala is van, volt, amit üzleti moderálni kellett.",
    "doktortg@gmail.com": "►►►FYI!◄◄◄ doktortg@gmail.com ►►►FYI!◄◄◄ Több oldala is van, volt, amit üzleti moderálni kellett.",
    "@nokiamail.com": "►►►ALERT!◄◄◄ @nokiamail.com ►►►ALERT!◄◄◄ Bot támadás egyszerre több címről is!",
    "prokaisandor@citromail.hu" : "►►►FYI!◄◄◄ prokaisandor@citromail.hu ►►►FYI!◄◄◄ Csak körültekintően! Több oldala is van, volt, amit üzleti moderálni kellett, vagy zárolni.",
    "macki.nix-kay@freemail.hu" : "►►►ALERT!◄◄◄ macki.nix-kay@freemail.hu ►►►ALERT!◄◄◄ Visszaélt a 30 napos próbaidőszakkal, eladta a termékét, és nem rendelt Üzelti csomagot.",
    
                    
    };

regex = {}; 
for (key in replacements) { 
    regex[key] = new RegExp(key, 'g'); 
} 

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes.snapshotLength; i++) { 
    node = textnodes.snapshotItem(i); 
    s = node.data; 
    for (key in replacements) { 
        s = s.replace(regex[key], replacements[key]); 
    } 
    node.data = s; 
} 

})();
