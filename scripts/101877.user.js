// ==UserScript==
// @name DS Assistent
// @description Version 1.1.2 DS-Assistent
// @author Hypix
// @namespace http://hypix.de/
// @include http://de*.die-staemme.de/game.php*
// @include http://de*.die-staemme.de/groups.php*
// @include http://de*.die-staemme.de/forum.php*
// @include http://de*.die-staemme.de/help2.php?article=points
// @include http://de*.die-staemme.de/sid_wrong.php*
// @include http://ch*.staemme.ch/game.php*
// @include http://ch*.staemme.ch/groups.php*
// @include http://ch*.staemme.ch/public_report/*
// @include http://ch*.staemme.ch/forum.php*
// @include http://ch*.staemme.ch/sid_wrong.php*
// @include http://ch*.staemme.ch/help2.php?article=points
// @include http://zz*.beta.tribalwars.net/game.php*
// @include http://zz*.beta.tribalwars.net/groups.php*
// @include http://zz*.beta.tribalwars.net/public_report/*
// @include http://zz*.beta.tribalwars.net/forum.php*
// @include http://zz*.beta.tribalwars.net/help2.php?article=points
// @include http://zz*.beta.tribalwars.net/sid_wrong.php*
// ==/UserScript==

(function() {
var start = new Date().getTime();
var msg = "";
var ownPid,curVillage;
var version = "1.1.2";
var texts = {
  de: {
    unit: {
      spear: "Speerträger",
      sword: "Schwertkämpfer",
      axe: "Axtkämpfer",
      archer: "Bogenschütze",
      spy: "Späher",
      light: "Leichte Kavallerie",
      marcher: "Berittener Bogenschütze",
      heavy: "Schwere Kavallerie",
      ram: "Rammbock",
      catapult: "Katapult",
      knight: "Paladin",
      snob: "Adelsgeschlecht"
    },
    units: {
      spear: "Speerträger",
      sword: "Schwertkämpfer",
      axe: "Axtkämpfer",
      archer: "Bogenschützen",
      spy: "Späher",
      light: "Leichte Kavallerie",
      marcher: "Berittene Bogenschützen",
      heavy: "Schwere Kavallerie",
      ram: "Rammböcke",
      catapult: "Katapulte",
      knight: "Paladin",
      snob: "Adelsgeschlechter"
    },
    resources: {
      wood: "Holz",
      stone: "Lehm",
      iron: "Eisen"
    },
    gui: {
      title: "DS-Assistent",
      settings: {
        titles: { map: "Karte", place: "Platz", hotKeys: "Hotkeys", units: "Einheiten", prod: "Produktionsübersicht", storage: "Speicherstände", report: "Berichte", buildAssist: "Dorfausbau", recruit: "Rekrutierung", sounds: "Sounds", misc: "Sonstiges"},
        colRangeTitle: { 
          resource:"Farben für Speicherfüllstände",
          farm:"Farben für Bauernhofbelegung",
          defense:"Farben für defensive Kampfkraft",
        },
        map: {
          villageGroups: "Liste der Spieler und Stämme im sichtbaren Kartenbereich anzeigen",
          vgShowAlly: " - In der Spielerliste den Stammnamen anhängen",
          rememberPos: "Kartenpositionen wiederherstellen",
          redirActive: "\"Klick auf Dorf\"-Umleitungen aktiviert",
          sumHours: ["Beute der letzten ", "  Stunden addieren" ],
          minAgeTransparency: ["Overlay ab","Tagen Berichtalter langsam ausblenden"],
          opacityMin: "Min. Deckkraft der Farminfos (0-100)",
          opacityMaxRes: "Min. erwartete Ressourcen für volle Deckkraft",
          showRessis: "Aktuell erwartete Rohstoffe anzeigen",
          playerColored: "Rohstoffe bei Spielerdörfern farbig",
          showBars: "Speicherfüllstandsgrafik anzeigen",
          showWall: "Wall/Truppen anzeigen",
          showPoints: "Punkte fremder Dörfer anzeigen",
          groupsOnTopo: "Farben der ersten Dorfgruppen eines Dorfes auf der Übersichtskarte anzeigen",
          shadowTopo: " - Alle anderen Dörfer etwas abdunkeln",
          topoBorderOwn: " - Eigenen Dörfern einen gelben Rahmen geben",
          defense: "Allgemeiner Kampfwert für höchste Wertung",
          defense_cavalry: "Kampfwert gegen Kavallerie für höchste Wertung",
          defense_archer: "Kampfwert gegen Bögen für höchste Wertung",
          defTitle: "Defstärke für die Def-Bewertung",
        },
        popup: {
          showRessis: "Aktuell erwartete Rohstoffe anzeigen",
          minReportAge: ["Berichtalter anzeigen ab", "Stunden"],
          showBuildings: "Gebäudestufen anzeigen",
          showBuildingChange: "Gebäudestufenänderungen anzeigen",
          showMining: "Förderung und Speichergröße anzeigen",
          showUnitsIn: "Einheiten im Dorf anzeigen",
          showUnitsOut: "Einheiten außerhalb anzeigen",
          showLoyalty: "Zustimmung anzeigen",
        },
        place: {
          minRamWall: ["Rammen mitschicken, wenn Wall min. auf Stufe", "ist"],
          minRamsNeeded: "Rammen nur mitschicken, wenn genug Rammen vorhanden sind, um den Wall zu zerstören",
          minKataLevel: ["Katapulte mitschicken, wenn ein Gebäude mindestens Level", "hat"],
          minKatasNeeded: "Katapulte nur mitschicken, wenn genug Katapulte vorhanden sind, um das Gebäude zu zerstören",
          kataOrderTitle: ["Reihenfolge der Gebäude für Katapultbeschuss","Priorität","Gebäude","Beschiessen"],
          noReportLoad: ["Einheiten mit", "Ladekapazität einfügen, wenn kein Bericht vorhanden" ],
          showRessis: "Erwartete Rohstoffe anzeigen",
          showUnitsIn: "Einheiten im Dorf anzeigen",
          showUnitsOut: "Einheiten ausserhalb anzeigen",
          showBuildings: ["Gebäude anzeigen", "Nein", "Nur den Wall", "Alle"],
          showBuildingChange: " - Gebäudestufenänderungen anzeigen",
          showCatas: " - Benötigte Katapulte um Gebäude zu zerstören anzeigen",
          okOnPlayer: ["Ok-Button auf der Bestätigungsseite bei Angriff auf ein Spieler- oder reserviertes Dorf", "belassen", "Rot färben", "deaktivieren", "deaktivieren und Dorf sperren" ],
          disableOnUnits: "Angriff-Button deaktivieren, wenn im angegriffenen Dorf Einheiten erspäht wurden",
          minLoad: "Angriff-Button deaktivieren, wenn die Einheiten weniger als die Mindestmenge tragen können",
          farmlist: ["Farmliste", "Farmen mit den meissten Rohstoffen über", "im Umkreis von","Feldern"],
          maxAttAge: "max. Alter der Angriffsmarker in Stunden",
          minEQ: "Minimaler Erfolgsquotient",
          unitStates: ["Farben für den Verwendungsstatus der Einheiten","Status","Rand","Hintergrund"],
          confirmTitle: "Bestätigungsseite:",
          confirmTitleBgColor: ["Hintergrundfarbe der Überschrift","bei Angriff","bei Unterstützung"],
          spyNoReport: "Farmen, für die keine Gebäudeinformationen vorliegen, nur Spähen",
          showCarry: "Tragkapazität anzeigen",
          showRunTime: "Laufzeit anzeigen",
          showArrivalTime: "Ankunftszeit anzeigen",
        },
        storage: {
          titleHead: "Kopfzeile",
          titleResColored: "Rohstoffe in der Kopfzeile je nach Füllstand farblich hinterlegen",
          titleFarmColored: "Bauernhofplätze in der Kopfzeile je nach Belegung farblich hinterlegen",
          titleCoins: "Münzen prägen",
          modSnob: "Rohstoffspalte beim Münzen prägen aufteilen",
          snobResColored: " - Rohstoffe je nach Füllstand farblich hinterlegen",
          resourceColorTitle: "Farben für Rohstofffüllstände:",
          farmColorTitle: "Farben für Bauernhofbelegung:",
        },
        report: {
          enableReorder: "Umgruppierung der Berichtsgruppen aktivieren",
          showBPs: "Bashpoints anzeigen",
          showSurvivors: "Überlebende Einheiten anzeigen",
          showLostCost: "Kosten für verlorene Einheiten anzeigen",
        },
        recruit: {
          drillQueueMode: ["Ausbildungswarteschlange zusammenfassen","nein","mittel","stark"],
          shrinkRecruitmentMode: ["Rekrutierungssymbole in der Übersicht zusammenfassen","nein","mittel","stark"],
          showRecruitSums: "Summe aller im Bau befindlichen Einheiten anzeigen",
          showRecruitTotal: "Anzahl der nach der Ausbildung vorhandenen Truppen anzeigen",          
          shrinkSmallOnly: "Nur die minimierte Ausbildungswarteschlange zusammenfassen",
        },
        misc: {
          reportMaxAge: "Maximales Berichtalter in Tagen",
          modGroupPopup: "Gruppenauswahlbox in Dorfauswahlliste fixieren und Größe anpassen",
          coordSelector: "Koordinaten-Auswahl aktivieren",
          slSwitcher: ["Schnellleiste","immer anzeigen","ein-/ausblendbar machen","automatisch ausblenden"],
          useHotKeys: "Hotkeys benutzen",
          navBarSwitcher: "Obere Menüzeile automatisch ausblenden",
          newLineSort: "Sortierpfeile in den Tabellentitelzeilen in eine neue Zeile schreiben",
          runTimeToolTips: "Laufzeitentooltips anzeigen",
          rtttDelay: [ " - ab ", " Sekunden anzeigen" ],
        },
        prod: {
          runtimeCol: "Entfernungsspalte zu eingebbaren Koordinaten einfügen",
          runtimeTT: " - Tooltip mit Laufzeiten anzeigen",
          resColored: "Rohstoffe je nach Füllstand farblich hinterlegen",
          farmColored: "Bauernhofplätze je nach Belegung farblich hinterlegen",
          farmTotal: "Bauernhofgröße anzeigen",
          showSums: "Summen anzeigen",
          removeBuildTime: "Fertigstellungszeit aus Bauauftragsspalte entfernen",
          shrinkRecruitmentMode: ["Rekrutierungssymbole zusammenfassen","nein","mittel","stark","Verbleibende Zeit bis Fertigstellung","Fertigstellungszeit"],
          showRecruitSums: "Summe aller im Bau befindlichen Einheiten anzeigen",
        },
        sounds: {
          active: "Sounds aktivieren",
          volume: "Lautstärke",
          url: "URL",
          loop: "Schleife",
          attOwnAcc: "Angriff eigener Account",
          attUVAccs: "Angriff UV-Accounts",
          attDone: "Angriff angekommen",
          report: "Neuer Bericht",
          igm: "IGM",
          forum: "Forum",
          session: "Sitzung abgelaufen",
        },
      },
      colorEditTitles:  [ "Prozent", "Farbe" ],
      hotKeyLabels: { common: { title: "Allgemein",
                                hks: { place: "gehe zu Versammlungsplatz", map: "gehe zur Karte", market: "gehe zum Marktplatz", nextVillage: "nächstes Dorf", prevVillage: "vorheriges Dorf", lastVillage: "zurück in vorhergehendes Dorf", close: "Popup schliessen", ok: "OK drücken" }
                              },
                      map: { title: "Karte",
                                hks: { title0: "Aktion bei \"Klick auf Dorf\" auswählen:", villageinfo: "Dorfinfos", sendunits: "Truppen schicken", getunits: "Truppen holen", market: "Rohstoffe schicken", getress: "Rohstoffe holen", centermap: "Karte zentzrieren", removeinfo: "Infos löschen", selectvillage: "Dort auswählen", togglenofarm: "Farmlistensperre ändern", coordlist: "Koordinatenliste", 
                                       title1: "Overlay für eigene Dörfer auswählen:", ownNone: "Nichts", ownUnits: "Einheiten", ownGroups: "Gruppen", ownCoords: "Koordinaten", ownName: "Name", ownPoints: "Punkte", ownResource: "Rohstoffe", ownDef: "Def-Bewertung",
                                       title2: "Overlay für fremde Dörfer auswählen:", otherNone: "Nichts", otherFarmInfo: "Farminfos", otherPlayer: "Spieler", otherCoords: "Koordinaten", otherName: "Name", otherPoints: "Punkte", /*otherMoral: "Moral",*/ otherAlly: "Stamm",
                                       title3: "Sonstiges", eq: "Erfolgsquotienten berücksichtigen", addbb2fl: "Barbarendörfer zur Farmliste hinzufügen", stats: "Rohstoffe der letzen x Stunden anzeigen" },
                              },
                      place: { title: "Versammlungsplatz",
                                hks: { allUnits: "Alle Einheiten einfügen", insertUnits: "Benötigte Einheiten einfügen", farmList: "Farmliste öffnen", getAtts: "Laufende Angriffe einlesen", eq: "Erfolgsquotienten berücksichtigen", attack: "Angreifen", support: "Unterstützen", "unitSelect": "Einheitenauswahl ändern", "lastTarget": "Zu letzt angegriffenes Ziel eintragen", "lastUnits": "Einheiten des letzen Angriffs einfügen", enableAttack: "Angriff freigeben", title0: "* die Farmlisteneinträge 1-10 haben die Hotkeys 1-0" }
                              },
                      reports: { title: "Berichte",
                                hks: { forward: "Weiterleiten", move: "Verschieben", del: "Löschen", next: "nächster Bericht", prev: "vorheriger Bericht"}
                              }
                    },
      reportGroups: {
        attack_luck:      "Glück",
        attack_moral:     "Moral",
        attack_info_att:  "Angreifer-Truppen",
        attack_info_def:  "Verteidiger-Truppen",
        attack_spy:       "Spionage",
        attack_results:   "Ergebnisse",
        attack_away_units: "Einheiten auswärts",
        attack_running_units: "Einheiten unterwegs",
      },
      redir_context: "Kontextmenü",
      redir_villageinfo: "Dorfinfos",
      redir_sendunits: "Truppen schicken",
      redir_getunits: "Truppen holen",
      redir_market: "Rohstoffe schicken",
      redir_centermap: "Karte zentrieren",
      redir_removeinfo: "Infos löschen",
      redir_selectvillage: "Dorf auswählen",
      redir_togglenofarm: "Farmlistensperre ändern",
      redir_getress: "Rohstoffe holen",
      redir_coordlist: "Koordinatenliste",
      delinfos: "Farmmanager-Infos löschen",
      confirm_delinfos: "Die Farmmanager-Infos wirklich löschen?",
      delattmark: "Angriffsmarker löschen",
      addfarmlist: "Farmlistensperre aufheben",
      sum: "Summe",
      unitsin: "Erspähte Truppen",
      unitsout: "Truppen ausserhalb",
      buildings: "Gebäude",
      load: "Soll-Ladekapazität",
      insertunits: "Einheiten einfügen",
      farmlist: "Farmliste",
      delfromfarmlist: "Für Farmliste sperren",
      resources: "Rohstoffe",
      spy: "erspäht",
      current: "aktuell",
      atArrival: "bei Ankunft",
      coords: "x|y",
      dist: "Entf.",
      redirTitle: "Klick auf Dorf",
      statsTitle: ["Rohstoffe der letzten ", "h"],
      addbb2fl: "BB-Dörfer zur Farmliste hinzufügen",
      reports: "Berichte",
      close: "Schliessen",
      infoTitle: "DS-Farmmanager-Infos",
      noInfos: "Keine Infos vorhanden",
      mining: "Förderung/Speicher",
      loyalty: "Zustimmung",
      confirm_delinfosxy: ["Daten für Dorf "," löschen?"],
      catas: "Katas",
      level: "Stufe",
      age: "Alter",
      days: ["Tag", "Tage"],
      hours: "h",
      minutes: "min",
      stateTitle: "Farmmanager Info",
      ownVillage: "Eigenes Dorf",
      oldReport: "Dieser Bericht ist veraltet",
      reportRead: "Bericht eingelesen",
      reportKnown: "Dieser Bericht wurde bereits eingelesen",
      confirm_delAll: "Wirklich alle Daten der aktuellen Welt löschen?",
      allDataDeleted: "Alle Daten der aktuellen Welt wurden gelöscht!",
      useHotKeys: "Hotkeys aktivieren",
      overlayTitle: "Overlays bei Farminfo",
      popupTitle: "Dorf-Popup",
      hotkeySettings: "Hotkeys",
      savebutton: "Speichern",
      importbutton: "Daten importieren",
      exportbutton: "Daten exportieren",
      deletebutton: "Daten löschen",
      startimport: "Importieren",
      importTitle: "Import",
      exportTitle: "Export",
      exportGroups: { title: "Welche Daten exportieren?", 
                      serverCfg: "Serverkonfiguration", 
                      settings: "Einstellungen", 
                      farmUnits: "Einheitenkonfiguration", 
                      colors: "Farben", 
                      hotkeys: "Hotkeys", 
                      userGroups: "Gruppen", 
                      variants: "Ausbauvarianten",
                      ownVillage: "Daten eigener Dörfer", 
                      farminfos: "Farminfos" ,
                      churches: "Simulierte Kirchen"
                    },
      importDone: "Die Daten wurden importiert",
      unknowVersion: "Unbekannte Version",
      wrongFormat: "Falsches Format",
      settingsSaved: "DS-Farmmanager-Einstellungen wurden gespeichert!",
      farmUnitsConfig: "Einheiten",
      priority: "Priorität",
      groupName: "Gruppenname",
      higherPrio: "Höhere Priorität",
      lowerPrio: "Niedriegere Priorität",
      enableAttack: "Angriff freigeben",
      attackAgain: "Nochmal angreifen",
      quotient: "Erfolgsquotient",
      usequotient: "Erfolgsquotient berücksichtigen",
      incompleteExp: "Die Daten scheinen nicht vollständig zu sein (Endekennung fehlt)!",
      reportStates: ["Bericht bekannt", "Bericht veraltet", "Bericht unbekannt" ],
      loadServerCfg: "Serverkonfiguration wird ermittelt...",
      serverCfgKnown: "Serverkonfiguration wurde ermittelt",
      loadServerCfg: "Serverkonfiguration wird ermittelt...",
      serverCfgKnown: "Serverkonfiguration wurde ermittelt",
      loadUnitInfo: "Einheiten werden ermittelt...",
      unitInfoKnown: "Einheiten wurden ermittelt",
      error: "Fehler",
      ok: "Ok",
      fl_sum: "&sum;",
      fl_eq: "EQ",
      ok_btn: "Ok",
      cancel_btn: "Abbrechen",
      all: "Alle",
      unsupportedVersion: "Das Datenformat dieser Version wird nicht unterstützt",
      unknownBaseConfig: "Unbekannte Konfiguration!",
      getatts: "Laufende Angriffe einlesen",
      attsparsed: "Laufende Angriffe wurden eingelesen",
      unitGroups: "Einheitengruppen",
      delGroup: "Gruppe löschen",
      newGroup: "Neue Gruppe",
      minUnits: "Mindestmenge der Einheiten",
      stayOrderTitle: "Einheitenpriorität / Einheiten im Dorf lassen ",
      stayUnits: "stehen lassen",
      unit: "Einheit",
      unitSelect: ["Einheitenauswahl","Automatisch","Manuell"],
      wrongworld: "Die Daten sind für von einem anderem Server",
      attackOwnVillage: "Wirklich den Angriff auf ein eigenes Dorf freigeben?",
      unitStates: ["Keine Einheiten vorhanden", "Einheit wird benutzt", "Zu wenige Einheiten vorhanden", "Die Einheit wäre länger als erlaubt unterwegs", "Einheit ist nicht in der aktuellen Gruppe", "Einheit wird nicht benötigt"],
      maxTime: "Max. Laufzeit",
      unitColor: "Farbe",
      unitMax: "100%",
      keys: [], // Key-Texte s.u.
      ovlSelect: "(nichts)",
      ovlGroups: "Gruppen",
      ovlPoints: "Punkte",
      ovlName: "Name",
      ovlResource: "Rohstoffe",
      ovlUnits: "Einheiten",
      ovlCoords: "Koordinaten",
      ovlAlly: "Stamm",
      ovlFarmInfo: "Farminfos",
      ovlPlayer: "Spieler",
//      ovlMoral: "Moral",
      ovlDef: "Def-Bewertung",
      otherVillage: "Fremdes Dorf",
      unitsHome: "eigene",
      unitsThere: "im Dorf",
      unitsAway: "auswärts",
      unitsMoving: "unterwegs",
      delHokey: "Hotkey löschen",
      ownUnits: "Angreifer:",
      lastOwnAttackPage: "Ältester unbekannter eigener Angriff auf Seite:",
      bbcode: "BB-Code",
      note: "Notiz",
      remove: "Löschen",
      edit: "Bearbeiten",
      insert: "Anfügen",
      fgCol: "Textfarbe",
      bgCol: "Hintergrundfarbe:",
      icon: "Symbol",
      confirm_delNote: "Notiz löschen?",
      recruitment: "Rekrutierung",
      overview: "Übersicht",
      saveOrderLink: "Dorfliste für Dorfwechsel verwenden",
      gotoFirstGroupVillage: "Zum ersten Gruppendorf",
      resetVillageOrder: "Standardreihenfolge wiederherstellen",
      destVillage: "Zielfdorf",
      freeRes: "frei",
      arrival: "Ankunft",
      startTime: "Startzeit",
      runtime: "Laufzeit",
      runtimes: "Laufzeiten",
      capture: "Beute",
      nightbonus: "(Nachtbonus aktiv)",
      returnTitle: "Rückkehr",
      returnAtCancel: "Rückkehr bei Abbruch",
      lastTarget: "Letztes Ziel",
      lastUnits: "Letzte Einheiten",
      of: "von",
      promptPercent: "Prozentwert",
      survivors: "Überlebende",
      lostCost: "Verlustkosten",
      bpTitle: ["BP Angreifer","BP Verteidiger"],
      order: "Reihenfolge",
      allys: "Stämme",
      player: "Spieler",
      name: "Name",
      villages: "Dörfer",
      points: "Punkte",
      cancelDrill: "Ausbildung abbrechen",
      restore: "Wiederherstellen",
      minimize: "Minimieren",
      showRow: "Zeile einblenden",
      showOwnGroups: " Eigene Gruppen anzeigen",
      moveOwnUnits: "Eigene Truppen bewegen",
      unitGroup: "Gruppe",
      cataTarget: "Katapultziel",
      valueError: "Fehlerhafter Wert, verwendete Default-Einstellungen",
      cancel: "abbrechen",
      loadBuildingInfo: "Gebäude werden ermittelt...",
      buildingInfoKnown: "Gebäude wurden ermittelt",
      setGroups: "Gruppen setzen",
      allGroups: "alle",
      selectGroup: "Gruppe wählen",
      offersVil: [" Angebote aus ", " Dörfern"],
      unitsTitle: "da/Aktuell/Gesamt",
      
      getPoints: "Punkte jetzt ermitteln",
      pointsKnown: "Punkte wurden ermittelt",
      selectVariantOption: "(Auswählen)",
      needs: "Bedarf",
      buildOption: "Bauoption",
      buildingCompleted: "Gebäude fertig ausgebaut",
      buildingMaxLevel: "Gebäude vollständig ausgebaut",
      destroyLevel: "Abriss um eine Stufe",
      buildingOverbuild: "Gebäude zu weit ausgebaut",
      resTitle: [ "Holz", "Lehm", "Eisen", "Arbeiter" ],
      buildingLevelUp: ["Ausbau auf Stufe ",""],
      building: "Gebäude",
      level: "Stufe",
      points: "Punkte",
      population: "BH-Plätze",
      targetPoints: "Gewünschte Punktezahl",
      resAvailable: "Rohstoffe ausreichend verfügbar",
      resAvailableAt: "Rohstoffe verfügbar ",
      farmToSmall: "Der Bauernhof ist zu klein",
      storageToSmall: "Der Speicher ist zu klein",
      buildTime: "Bauzeit (hh:mm:ss)",
      required: "Benötigt:",
      showAllBuildings: "Alle Gebäude einblenden.",
      hideCompletedBuildings: "Komplett ausgebaute Gebäude verstecken",
      noDestroy: "Abriss nicht möglich",
      destroyQueueFull: "Die Abrissschleife ist voll",
      confirmQueue: "Aufträge in der Bauschleife kosten extra. Dennoch bauen?",
      variantName: "Name",
      edit: "Bearbeiten",
      delVariant: "Variante löschen",
      addVariant: "Variante hinzufügen",
      confirmDeleteVariant: "Variante wirklich löschen ?",
      missingRes: "Summe der markierten fehlenden Rohstoffe",
      buildQueueTitle: "Bauaufträge",
      destroy: "Abriß:",
      queueCost: "Zusatzkosten",
      workers: "Arbeiter",
      enterInRange: ["Bitte einen Wert von ", " bis ", " eingeben!"],
      enterName: "Bitte einen Namen eingeben!",
      nameExists: "Der Name ist bereits vergeben!",
      recruDone: "Truppenanzahl erreicht",
      freePop: "Frei",
      maxPop: "Nicht genug Bauernhofplätze frei",
      fillIn: "Ausfüllen",
      recruit: "Rekrutieren",
      confirmAssignUnitVariant: "Diese Truppenkonfiguration für alle Dörfer dieser Gruppe festlegen?",
      colFloating: "Farbverlauf zwischen den Stufen",
      slOn: "Schnelleiste einblenden",
      slOff: "Schnelleiste ausblenden",
      slTitle: "SL ",
      donate: "Entwicklung des DS-Assistenten mit einer Spende ünterstützen",
      timespan: ["Ankunftszeit:", "Tag: ", " Monat: ", " von: ", " bis: ", " Uhr Laufzeit: "],
      unitFilter: "Truppenfilter:",
      filterBtn: "Filtern",
      topo: "Minimap",
      optionsSuffix: " - Optionen",
      errorGetPoints: "Die Punkte konnten nicht ermittelt werden. Das Script ist so leider nicht einsatzfähig!",
      simChurches: " Kirchen simulieren",
      churches: ["Kirche", "Erste Kirche", "Kirche 1", "Kirche 2", "Kirche 3"],
      color: "Farbe",
      errorCoords: "Fehlerhafte Koordinaten",
    },
    regex: {
      reportTitle: /<[Hh]3>Der Angreifer|Verteidiger hat gewonnen<\/[Hh]3>/,
      reportSupport: /unterstützt/,
      villageLink: /\((\d{1,3})\|(\d{1,3})\) K(\d+)$/, // hier ist eigentlich nur das "K" für Kontintent anzupassen
      datetime: /(\d{2})\.(\d{2})\.(\d{2}) (\d{2}):(\d{2})/,
      sendDate: /Gesendet<\/[tT][dD]><[Tt][Dd]>(\d{2})\.(\d{2})\.(\d{2}) (\d{2}):(\d{2})/,
      loyaltyChange: /esunken von <[Bb]>\d+<\/[Bb]> auf <[Bb]>(-?\d+)/,
      attack: /Angriff/,
      spy: /Spionage/,
      spyres: /Erspähte Rohstoffe/,
      building: /Gebäude/,
      buildinglevel: /\s*([^\)]*)\(Stufe (\d+)\)/,
      defunits: /Einheiten außerhalb:/,
      beute: /Beute:/,
      settings: /Einstellungen/,
      damage: /[^>]+>(.+) beschädigt von Level <[Bb]>\d+<\/[Bb]> auf Level <[Bb]>(\d+)/,
      arrivalTitle: /Ankunft/,
      durationTitle: /Dauer:/,
      completion: /Fertigstellung/,
      queueCost: /Zusatzkosten/,
      resAvailable: /Rohstoffe verfügbar/,
      buildDestroy: /([^\(]+)\(Stufe ([^\)]+|abreißen)\)/,
      reserved: /Achtung.+reserviert!$/,
      loyalty: /Zustimmung/,
    },
    locale: {
      date2MS: function(res) { return new Date( 2000 + parseInt(res[3],10), parseInt(res[2],10)-1, parseInt(res[1],10), parseInt(res[4],10), parseInt(res[5],10), 0 ).getTime() }, // Funtion um aus dem match-Result von "regex.sendDate" den Timestamp zu erhalten
      nrgroupsign: ".",
      timeStr2Sec: function(str) {
        var res = str.match(/(am (\d{2})\.(\d{2})\.|morgen|heute) um (\d{2}):(\d{2}):?(\d{2})? Uhr/);
        if( !res )
          res = str.match(/((\d{2})\.(\d{2})\.) (\d{2}):(\d{2}):?(\d{2})?/);
        sec = 0;
        if( res ) {
          if( typeof( res[2] ) == "undefined" ) {
            var today = lib.serverTime.getTime() / 1000;
            today = today - today % 86400;
            today += lib.serverTime.getTimezoneOffset()*60;
            sec = today + res[4] * 3600 + res[5] * 60;
            if( res[1] == "morgen" )
              sec += 86400;
          }
          else {
            var dt = new Date( lib.serverTime.getFullYear(), res[3]-1, res[2], res[4], res[5],0 );
            if( dt < lib.serverTime )
              dt = new Date( lib.serverTime.getFullYear()+1, res[3]-1, res[2], res[4], res[5],0 );
            sec = dt.getTime() / 1000;
          }
        }
        return sec;
      },
      date2timeStr : function(date,small,secs) {
        var ret;
        if( small === true ) {
          ret = lib.padLeft(date.getDate(),"0",2) + "." + lib.padLeft(date.getMonth()+1,"0",2)+". " + lib.padLeft(date.getHours(),0,2) + ":" + lib.padLeft(date.getMinutes(),0,2);
          if( secs == true )
            ret += ":" + lib.padLeft(date.getSeconds(),0,2)
        }
        else {
          var today = new Date(lib.getTime()* 1000);
          var tomorrow = new Date(today.getTime() + 86400000);
          var v;
          if( date.getDate() == today.getDate() && date.getMonth() == today.getMonth() )
            ret = "heute";
          else if( date.getDate() == tomorrow.getDate() && date.getMonth() == tomorrow.getMonth() )
            ret = "morgen";
          else {
            v = date.getDate();
            ret = "am " + (v < 10 ? "0"+v : v);
            v = date.getMonth()+1;
            ret += "." + (v < 10 ? "0"+v : v);
            ret += "."; // + showTime.getFullYear();
          }
          v = date.getHours();
          ret += " um " + (v < 10 ? "0"+v : v);
          v = date.getMinutes();
          ret += ":" + (v < 10 ? "0"+v : v);
          v = date.getSeconds();
          ret += ":" + (v < 10 ? "0"+v : v);
          ret += " Uhr";
        }
        return ret;
      },
      formatDuration : function(time,showdays) {
        if( isNaN(time))
          time = 0;
        var days = 0;
        var hours = Math.floor(time / 3600);
        if( showdays && hours > 23 ) {
          days = parseInt(hours / 24,10);
          hours = hours % 24;
          time -= days * 86400;
        }
        var minutes = Math.floor(time/60) - (hours * 60);
        var seconds = Math.round(time  % 60,0);
        var ret = ""
        if( days || hours || minutes || seconds ) {
          if( days > 0 ) {
            ret = days + " ";
            if( days == 1 )
              ret += "Tag ";
            else
              ret += "Tage ";
          }
          ret += hours + ':' + (minutes < 10 ? '0'+minutes : minutes) + ':' + (seconds < 10 ? '0'+seconds : seconds);
        }
        else
          ret = "---";
        return ret;
      },
      parseDuration : function(str) {
        var s = 0;
        var res = str.match(/((\d+)[^\d]+)?(\d+):(\d+):(\d+)/);
        if( res ) {
          s = res[2] * 86400;
          if( isNaN(s) )
            s = 0;
          s += parseInt(res[3],10)*3600+parseInt(res[4],10)*60+parseInt(res[5],10);
        }
        return s;
      },
    }
  },
  ch: {
    unit: {
      spear: "Speerträger",
      sword: "Schwärtkämpfer",
      axe: "Axtkämpfer",
      archer: "Bogeschütz",
      spy: "Späher",
      light: "Liechti Kavallerie",
      marcher: "Berittnig Bogenschütz",
      heavy: "Schwäri Kavallerie",
      ram: "Rammbock",
      catapult: "Katapult",
      knight: "Paladin",
      snob: "Adusgschlächt"
    },
    units: {
      spear: "Speerträger",
      sword: "Schwärtkämpfer",
      axe: "Axtkämpfer",
      archer: "Bogeschütz",
      spy: "Späher",
      light: "Liechti Kavallerie ",
      marcher: "Berittnig Bogenschütz",
      heavy: "Schwäri Kavallerie",
      ram: "Rammböck",
      catapult: "Katapult",
      knight: "Paladin",
      snob: "Adusgschlächt"
    },
    buildings: {
      main: "Houptgeböide",
      barracks: "Kasärne",
      stable: "Stau",
      garage: "Wärkstatt",
      church: "Chiuche",
      church_f1: "Erschti Chiuche",
      snob: "Adushof",
      smith: "Schmied",
      place: "Vrsammligsplatz",
      statue: "Statue",
      market: "Marktplatz",
      wood: "Houzfäuer",
      stone: "Lehmgruebe",
      iron: "Isemine",
      farm: "Burehof",
      storage: "Spicher",
      hide: "Vrsteck",
      wall: "Wall"
    },
    resources: {
      wood: "Houz",
      stone: "Lehm",
      iron: "Isä"
    },
    gui: {},
    regex: {
      reportTitle: /<h3>Dr Agrifer|Vrteidiger het gwunne<\/h3>/,
      villageLink: /\((\d{1,3})\|(\d{1,3})\) K(\d+)$/, // hier ist eigentlich nur das /K/ für Kontintent anzupassen
      loyaltyChange: /Zuestimmig gsunke vo <b>\d+<\/b> uf <b>(-?\d+)/,
      sendDate: /Gsändet<\/td><td>(\d{2})\.(\d{2})\.(\d{2}) (\d{2}):(\d{2})/,
      datetime: /(\d{2})\.(\d{2})\.(\d{2}) (\d{2}):(\d{2})/,
      attack: /An?griff/,
      spy: /Spionage/,
      spyres: /Erspähti Rohstoff/,
      building: /Geböide/,
      buildinglevel: /\s*([^\)]*)\(Stufe (\d+)\)/,
      defunits: /Truppe des Verteidiger/,
      beute: /Büti:/,
      settings: /Istellige/,
      damage: /[^>]+>(.+) beschädiget vo Level <[Bb]>\d+<\/[Bb]> uf Level <[Bb]>(\d+)/,
      arrivalTitle: /Akunft/,
      durationTitle: /Dur:/,
      completion: /Fertigsteuig/,
      queueCost: /Zuesätzlichi choschte/,
      resAvailable: /Rohstoff vrfüegbar/,
      buildDestroy: /([^\(]+)\(Stuefe ([^\)]+|abrisse)\)/,
      reserved: /Achtung.+reserviert!$/,
      loyalty: /Zuestimmig/,
    },
    locale: {
      date2MS: function(res) { return new Date( 2000 + parseInt(res[3],10), parseInt(res[2],10)-1, parseInt(res[1],10), parseInt(res[4],10), parseInt(res[5],10), 0 ).getTime() },
      nrgroupsign: ".",
      timeStr2Sec: function(str) {
        var res = str.match(/(am (\d{2})\.(\d{2})\.|morn|hüt) um (\d{2}):(\d{2}):?(\d{2})? Uhr/);
        sec = 0;
        if( res ) {
          if( typeof( res[2] ) == "undefined" ) {
            var today = lib.serverTime.getTime() / 1000;
            today = today - today % 86400;
            today += lib.serverTime.getTimezoneOffset()*60;
            sec = today + res[4] * 3600 + res[5] * 60;
            if( res[1] == "morn" )
              sec += 86400;
          }
          else {
            var dt = new Date( lib.serverTime.getFullYear(), res[3]-1, res[2], res[4], res[5],0 );
            GM_log(dt);
            if( dt < lib.serverTime )
              dt = new Date( lib.serverTime.getFullYear()+1, res[3]-1, res[2], res[4], res[5],0 );
            sec = dt.getTime() / 1000;
          }
        }
        return sec;
      },
      date2timeStr : function(date,small,secs) {
        var ret;
        if( small === true ) {
          ret = lib.padLeft(date.getDate(),"0",2) + "." + lib.padLeft(date.getMonth()+1,"0",2)+". " + lib.padLeft(date.getHours(),0,2) + ":" + lib.padLeft(date.getMinutes(),0,2);
          if( secs )
            ret += ":" + lib.padLeft(date.getSeconds(),0,2)
        }
        else {
          var today = new Date(lib.getTime()* 1000);
          var tomorrow = new Date(today.getTime() + 86400000);
          var v;
          if( date.getDate() == today.getDate() && date.getMonth() == today.getMonth() )
            ret = "heute";
          else if( date.getDate() == tomorrow.getDate() && date.getMonth() == tomorrow.getMonth() )
            ret = "morgen";
          else {
            v = date.getDate();
            ret = "am " + (v < 10 ? "0"+v : v);
            v = date.getMonth()+1;
            ret += "." + (v < 10 ? "0"+v : v);
            ret += "."; // + showTime.getFullYear();
          }
          v = date.getHours();
          ret += " um " + (v < 10 ? "0"+v : v);
          v = date.getMinutes();
          ret += ":" + (v < 10 ? "0"+v : v);
          v = date.getSeconds();
          ret += ":" + (v < 10 ? "0"+v : v);
          ret += " Uhr";
        }
        return ret;
      },
      formatDuration : function(time,showdays) {
        if( isNaN(time))
          time = 0;
        var days = 0;
        var hours = Math.floor(time / 3600);
        if( showdays && hours > 23 ) {
          days = parseInt(hours / 24,10);
          hours = hours % 24;
          time -= days * 86400;
        }
        var minutes = Math.floor(time/60) - (hours * 60);
        var seconds = Math.round(time  % 60,0);
        var ret = ""
        if( days || hours || minutes || seconds ) {
          if( days > 0 ) {
            ret = days + " ";
            if( days == 1 )
              ret += "Tag ";
            else
              ret += "Tage ";
          }
          ret += hours + ':' + (minutes < 10 ? '0'+minutes : minutes) + ':' + (seconds < 10 ? '0'+seconds : seconds);
        }
        else
          ret = "---";
        return ret;
      },
      parseDuration : function(str) {
        var s = 0;
        var res = str.match(/((\d+)[^\d]+)?(\d+):(\d+):(\d+)/);
        if( res ) {
          s = res[2] * 86400;
          if( isNaN(s) )
            s = 0;
          s += parseInt(res[3],10)*3600+parseInt(res[4],10)*60+parseInt(res[5],10);
        }
        return s;
      },
    }
  },
  en: {
    unit: {
      spear: "Spear fighter",
      sword: "Swordsman",
      axe: "Axeman",
      archer: "Archer",
      spy: "Scout",
      light: "Light cavalrye",
      marcher: "Mounted archer",
      heavy: "Heavy cavalry",
      ram: "Ram",
      catapult: "Catapult",
      knight: "Paladin",
      snob: "Nobleman"
    },
    units: {
      spear: "Spear fighters",
      sword: "Swordsmen",
      axe: "Axemen",
      archer: "Archers",
      spy: "Scouts",
      light: "Light cavalry",
      marcher: "Mounted archers",
      heavy: "Heavy cavalry",
      ram: "Rams",
      catapult: "Catapults",
      knight: "Paladin",
      snob: "Nobleman"
    },
    resources: {
      wood: "Wood",
      stone: "Clay",
      iron: "Iron"
    },
    regex: {
      reportTitle: /<[Hh]3>The attacker|defender has won<\/[Hh]3>/,
      reportSupport: /unterstützt/,
      villageLink: /\((\d{1,3})\|(\d{1,3})\) K(\d+)$/, // hier ist eigentlich nur das "K" für Kontintent anzupassen
      datetime: /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{2}),\s{0,2}(\d{4})\s+(\d{2}):(\d{2}):?(\d{2})?:?(\d{3})?/,
      sendDate: /Sent<\/[tT][dD]><[Tt][Dd]>(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{2}), (\d{4})  (\d{2}):(\d{2}):(\d{2})/,
      loyaltyChange: /Dropped from <[Bb]>\d+<\/[Bb]> to <[Bb]>(-?\d+)/,
      attack: /Attack/,
      spy: /Espionage/,
      spyres: /Resources scouted/,
      building: /Buildings/,
      buildinglevel: /\s*([^\)]*)\(Level (\d+)\)/,
      defunits: /Units outside of village:/,
      beute: /Haul:/,
      settings: /Settings/,
      damage: /[^>]+>The (.+) has been damaged and downgraded from level <[Bb]>\d+<\/[Bb]> to level <[Bb]>(\d+)/,
      arrivalTitle: /Arrival:/,
      durationTitle: /Duration:/,
      completion: /Completion/,
      queueCost: /Additional cost/,
      resAvailable: /Resources available/,
      buildDestroy: /([^\(]+)\([Level|demolish]+ ([^\)]+)/,
      reserved: /Warning.+noble claim/,
      loyalty: /Loyalty/,
    },
    locale: {
      date2MS: function(res) { 
        var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        var ms = new Date( parseInt(res[3],10), month.indexOf(res[1]), parseInt(res[2],10), parseInt(res[4],10), parseInt(res[5],10), parseInt(res[6],10) ).getTime();
        if( res[7] )
         ms += parseInt(res[7],10);
         return ms;
      }, // Funtion um aus dem match-Result von "regex.sendDate" den Timestamp zu erhalten
      nrgroupsign: ".",
      timeStr2Sec: function(str) {
        var res = str.match(/(on (\d{2})\.(\d{2})\.|tomorrow|today) at (\d{2}):(\d{2}):?(\d{2})?:?(\d{3})? o'clock?/);
        sec = 0;
        if( res ) {
          if( typeof( res[2] ) == "undefined" ) {
            var today = lib.serverTime.getTime() / 1000;
            today = today - today % 86400;
            today += lib.serverTime.getTimezoneOffset()*60;
            sec = today + res[4] * 3600 + res[5] * 60;
            if( res[1] == "tomorrow" )
              sec += 86400;
          }
          else {
            var dt = new Date( lib.serverTime.getFullYear(), res[3]-1, res[2], res[4], res[5],0 );
            if( dt < lib.serverTime )
              dt = new Date( lib.serverTime.getFullYear()+1, res[3]-1, res[2], res[4], res[5],0 );
            sec = dt.getTime() / 1000;
          }
        }
        return sec;
      },
      date2timeStr : function(date,small,secs) {
        var ret;
        if( small === true ) {
          ret = lib.padLeft(date.getDate(),"0",2) + "." + lib.padLeft(date.getMonth()+1,"0",2)+". " + lib.padLeft(date.getHours(),0,2) + ":" + lib.padLeft(date.getMinutes(),0,2);
          if( secs == true )
            ret += ":" + lib.padLeft(date.getSeconds(),0,2)
        }
        else {
          var today = new Date(lib.getTime()* 1000);
          var tomorrow = new Date(today.getTime() + 86400000);
          var v;
          var ret;
          if( date.getDate() == today.getDate() && date.getMonth() == today.getMonth() )
            ret = "heute";
          else if( date.getDate() == tomorrow.getDate() && date.getMonth() == tomorrow.getMonth() )
            ret = "morgen";
          else {
            v = date.getDate();
            ret = "am " + (v < 10 ? "0"+v : v);
            v = date.getMonth()+1;
            ret += "." + (v < 10 ? "0"+v : v);
            ret += "."; // + showTime.getFullYear();
          }
          v = date.getHours();
          ret += " um " + (v < 10 ? "0"+v : v);
          v = date.getMinutes();
          ret += ":" + (v < 10 ? "0"+v : v);
          v = date.getSeconds();
          ret += ":" + (v < 10 ? "0"+v : v);
        }
        return ret;
      },
      formatDuration : function(time) {
        if( isNaN(time))
          time = 0;
        var hours = Math.floor(time / 3600);
        var minutes = Math.floor(time/60) - (hours * 60);
        var seconds = Math.round(time  % 60,0);
        var ret = "---";
        if( hours || minutes || seconds )
          ret = hours + ':' + (minutes < 10 ? '0'+minutes : minutes) + ':' + (seconds < 10 ? '0'+seconds : seconds);
        return ret;
      },
      parseDuration : function(str) {
        var s = 0;
        var res = str.match(/((\d+)[^\d]+)?(\d+):(\d+):(\d+)/);
        if( res ) {
          s = res[2] * 86400;
          if( isNaN(s) )
            s = 0;
          s += parseInt(res[3],10)*3600+parseInt(res[4],10)*60+parseInt(res[5],10);
        }
        return s;
      },
    }
  },
};
{ // Key-Texte
texts.de.gui.keys[8] = "⇐"; // &lArr; (Backspace)
texts.de.gui.keys[9] = "⇔"; // &hArr; (Tab)
texts.de.gui.keys[13] = "↵"; // &crarr; Enter
texts.de.gui.keys[16] = "⇑"; // &uArr;(Shift)
texts.de.gui.keys[17] = "Strg";
texts.de.gui.keys[18] = "Alt";
texts.de.gui.keys[19] = "Pause";
texts.de.gui.keys[27] = "Esc";
texts.de.gui.keys[32] = "Leertaste";
texts.de.gui.keys[33] = "Bild ↑"; // &uarr;
texts.de.gui.keys[34] = "Bild ↓"; // &darr;
texts.de.gui.keys[35] = "Ende";
texts.de.gui.keys[36] = "Pos1";
texts.de.gui.keys[37] = "←"; // &larr;
texts.de.gui.keys[38] = "↑"; // &uarr;
texts.de.gui.keys[39] = "→"; // &rarr;
texts.de.gui.keys[40] = "↓"; // &darr;
texts.de.gui.keys[45] = "Einfg";
texts.de.gui.keys[46] = "Entf";
texts.de.gui.keys[96] = "Num 0";
texts.de.gui.keys[97] = "Num 1";
texts.de.gui.keys[98] = "Num 2";
texts.de.gui.keys[99] = "Num 3";
texts.de.gui.keys[100] = "Num 4";
texts.de.gui.keys[101] = "Num 5";
texts.de.gui.keys[102] = "Num 6";
texts.de.gui.keys[103] = "Num 7";
texts.de.gui.keys[104] = "Num 8";
texts.de.gui.keys[105] = "Num 9";
texts.de.gui.keys[110] = "Num ,";
texts.de.gui.keys[112] = "F1";
texts.de.gui.keys[113] = "F2";
texts.de.gui.keys[114] = "F3";
texts.de.gui.keys[115] = "F4";
texts.de.gui.keys[116] = "F5";
texts.de.gui.keys[117] = "F6";
texts.de.gui.keys[118] = "F7";
texts.de.gui.keys[119] = "F8";
texts.de.gui.keys[120] = "F9";
texts.de.gui.keys[121] = "F10";
texts.de.gui.keys[122] = "F11";
texts.de.gui.keys[123] = "F12";
texts.de.gui.keys[145] = "Rollen";
}
texts.ch.gui = texts.de.gui;
texts.en.gui = texts.de.gui;

var lib = new HypixDSLib("hpxdsfm",true,true);
if( lib.game_data ) {
  var res = lib.game_data.version.match(/\d+ (\d+)\.(\d+)/);
  if( res && res[1] < 7) 
    return;
}
if( typeof(texts[lib.lang]) == "undefined" ) {
  alert( "DS-Farmmanager:\nLanguage not supported!" );
  return;
}

var win = typeof(unsafeWindow) != "undefined" ? unsafeWindow : window;
var boni = { "none": 0, "wood": 1, "stone": 2, "iron": 3, "farm": 4, "barracks": 5, "stable": 6, "garage": 7, "all": 8, "storage": 9 };
var colBgColor = ['rgb(248, 244, 232)', 'rgb(222, 211, 185)' ];

Array.prototype.indexOf = function(val) {
	for(var i=0; i<this.length; i++){
		if(this[i] === val)
			return i;
	}
	return -1;
}

var atts = lib.storage.getValue( "atts","");
var isUV = !isNaN(parseInt(lib.params.t,10));

var Village = function(coords) {
  this.load = function() {
    var vKey = this.coords.x + "_" + this.coords.y;
    var data = lib.storage.getValue(vKey,"NaN,;100;0,0;0,0,100;0,0,0,0,0;0,0,;0,0,;0,0,");
    this.fromString(data);
    return this;
  };
  this.fromString = function(str) {
    var ts = lib.getTime();
    var minTS = ts - Settings.settings.misc.reportMaxAge * 86400;
    var data = str.split(";");
    var parts = data[0].split(",");
    this.bonus = parseInt(parts[0],10);
    this.color = parts[1];
    this.eq = parseInt(data[1],10);
    if( this.eq > 100 )
      this.eq = 100;
    parts = data[2].split(",");
    this.lastreport.rid = parseInt(parts[0],10);
    this.lastreport.timestamp = parseInt(parts[1],10);
    parts = data[3].split(",");
    this.loyalty.rid = parseInt(parts[0],10);
    this.loyalty.timestamp = parseInt(parts[1],10);
    this.loyalty.value = parseInt(parts[2],10);
    parts = data[4].split(",");
    this.res.rid = parseInt(parts[0],10);
    var ts = parseInt(parts[1],10);
    this.res.timestamp = ts < minTS ? 0 : ts;
    this.res.wood = parseInt(parts[2],10);
    this.res.stone = parseInt(parts[3],10);
    this.res.iron = parseInt(parts[4],10);
    parts = data[5].split(",");
    this.buildings.rid = parseInt(parts[0],10);
    ts = parseInt(parts[1],10);
    this.buildings.timestamp = ts < minTS ? 0 : ts;
    var save = false;
    if( parts.length == 38 && !serverInfo.buildingInfo.church ) {
      parts = parts.splice(10,4);
      save = true;
    }
    var i = 0;
    for( var key in serverInfo.buildingInfo ) {
      var level = parseInt(parts[i*2+2],10);
      this.buildings[key] = { level: isNaN(level) ? 0 : level, change: parseInt(parts[i*2+3],10) };
      i++;
    }
    parts = data[6].split(",");
    this.unitsin.rid = parseInt(parts[0],10);
    ts = parseInt(parts[1],10);
    this.unitsin.timestamp = ts < minTS ? 0 : ts;
    i = 2;
    for( var key in serverInfo.unitInfo ) {
      var val = parseInt(parts[i++]);
      this.unitsin[key] = isNaN(val) ? 0 : val;
      if( this.unitsin[key] > 0 )
        this.unitsin.hasUnits = this.unitsin.timestamp > 0;
    }
    parts = data[7].split(",");
    this.unitsout.rid = parseInt(parts[0],10);
    ts = parseInt(parts[1],10);
    this.unitsout.timestamp = ts < minTS ? 0 : ts;
    i = 2;
    for( var key in serverInfo.unitInfo ) {
      var val = parseInt(parts[i++]);
      this.unitsout[key] = isNaN(val) ? 0 : val;
      if( this.unitsout[key] > 0 )
        this.unitsout.hasUnits = this.unitsout.timestamp > 0;
    }
    if( save )
      this.save();
    return this;
  };

  this.toString = function(str) {
    if( this.eq > 100 )
      this.eq = 100;
    var str = this.bonus+","+this.color+";"+this.eq+";"+this.lastreport.rid+","+this.lastreport.timestamp+";";
    str += this.loyalty.rid + "," + this.loyalty.timestamp + ","  + this.loyalty.value + ";";
    str += this.res.rid + "," + this.res.timestamp + ",";
    str += this.res.wood + ",";
    str += this.res.stone + ",";
    str += this.res.iron + ";";
    str += this.buildings.rid + "," + this.buildings.timestamp + ",";
    if( this.buildings.timestamp > 0 ) {
      var i = 0;
      for( var key in serverInfo.buildingInfo ) {
        if( i > 0 )
          str += ",";
        str += this.buildings[key].level + "," + this.buildings[key].change;
        i++;
      }
    }
    str += ";";
    str += this.unitsin.rid + "," + this.unitsin.timestamp + ",";
    if( this.unitsin.timestamp > 0 ) {
      var units = "";
      for( var key in serverInfo.unitInfo )
        units += "," + this.unitsin[key];
      str += units.substring(1);
    }
    str += ";";
    str += this.unitsout.rid + "," + this.unitsout.timestamp + ",";
    if( this.unitsout.timestamp > 0 ) {
      var units = "";
      for( var key in serverInfo.unitInfo )
        units += "," + this.unitsout[key];
      str += units.substring(1);
    }
    return str;
  };

  this.save = function() {
    lib.storage.setValue(this.coords.x+"_"+this.coords.y, this.toString());
    return this;
  };

  this.merge = function(vil) {
    if( this.lastreport.timestamp < vil.lastreport.timestamp ) {
      this.bonus = vil.bonus;
      this.color = vil.color;
      this.lastreport = vil.lastreport;
      this.eq = vil.eq;
    }
    if( this.loyalty.timestamp < vil.loyalty.timestamp )
      this.loyalty = vil.loyalty;
    if( this.res.timestamp < vil.res.timestamp )
      this.res = vil.res;
    if( this.buildings.timestamp < vil.buildings.timestamp )
      this.buildings = vil.buildings;
    if( this.unitsin.timestamp < vil.unitsin.timestamp )
      this.unitsin = vil.unitsin;
    if( this.unitsout.timestamp < vil.unitsout.timestamp )
      this.unitsout = vil.unitsout;
    return this;
  };

  this.updateMapData = function(bonus,color) {
    var modified = false;
    if( this.bonus != bonus ) {
      this.bonus = bonus;
      modified = true;
    }
    if( color == "" )
      color = "rgb(150,150,150)";
    if( this.color != color ) {
      this.color = color;
      modified = true;
    }
    if( this.lastreport.timestamp > 0 && modified )
      this.save();
    return this;
  }

  var value;
  if( typeof(coords) == "string" ) {
    coords = coords.split("_");
    x = parseInt(coords[0],10);
    if( coords.length == 1 ) {
      if( arguments.length > 1 ) {
        y = parseInt(arguments[1],10);
        if( arguments.length == 3 )
          value = arguments[2];
      }
      else
        throw("Village: Invalid Coordinates");
    }
    else {
      y = parseInt(coords[1],10);
      if( arguments.length == 2 )
        value = arguments[1];
    }
  }
  else {
    x = parseInt(coords,10);
    y = parseInt(arguments[1],10);
    if( arguments.length == 3 )
      value = arguments[2];
  }
  if( isNaN(x) || isNaN(y) )
    throw("Village: Invalid Coordinates");

  this.coords = { x: x, y: y };
  this.bonus = Number.NaN;
  this.color = "";
  this.eq = 100;
  this.lastreport = {rid : 0, timestamp: 0};
  this.loyalty = { rid: 0, timestamp: 0, value: 100 };
  this.res = { rid: 0, timestamp: 0 };
  this.buildings = { rid: 0, timestamp: 0 };
  this.unitsin = { rid: 0, timestamp: 0, hasUnits: false };
  this.unitsout = { rid: 0, timestamp: 0, hasUnits: false };
  if( value )
    this.fromString(value);
  else
    this.load();
}
var MyVillage = function(id,value) {
  this.load = function() {
    var data = lib.storage.getValue("vil"+this.id, "0;0,NaN,NaN,NaN,NaN,NaN,NaN;0,NaN,NaN;0|;NaN,NaN");
    this.fromString(data);
    return this;
  }
  this.save = function() {
    var str = this.toString();
    lib.storage.setValue("vil"+this.id,str);
    return this;
  }
  // Einheiten
  // 1291923792,2814,2628,0,2312,66,0,0,358,0,117,0,0,0,2814,2628,0,2312,66,0,0,358,0,117,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0;
  // Ressis
  // 1291978631,187526,248164,131660,400000,23594,24000;
  // Map x|y
  // 0,NaN,NaN;
  // Gruppen
  // 1291750960|Def, Kirche;
  // Coords
  // 555,501
  
  this.fromString = function(str) {
    var ts = lib.getTime();
    var minTS = ts - 864000; // max. 10 Tage alt
    var data = str.split(";");
    var parts = data[0].split(",");
    ts = parseInt(parts[0],10);
    this.units.timestamp = ts < minTS ? 0 : ts;
    if( parts.length > 1 ) {
      var i = 0;
      for( var key in serverInfo.unitInfo ) {
        i++;
        this.units.home[key] = parseInt(parts[i],10);
        this.units.there[key] = parseInt(parts[i+serverInfo.unitAnz],10);
        this.units.away[key] = parseInt(parts[i+serverInfo.unitAnz*2],10);
        this.units.moving[key] = parseInt(parts[i+serverInfo.unitAnz*3],10);
      }
    }
    parts = data[1].split(",");
    ts = parseInt(parts[0],10);
    this.res.timestamp = ts < minTS ? 0 : ts;
    this.res.wood = parseInt(parts[1],10);
    this.res.stone = parseInt(parts[2],10);
    this.res.iron = parseInt(parts[3],10);
    this.res.storage = parseInt(parts[4],10);
    this.res.pop = { current: parseInt(parts[5],10), max: parseInt(parts[6],10) };
    parts = data[2].split(",");
    ts = parseInt(parts[0],10);
    this.map.timestamp = ts < minTS ? 0 : ts;
    this.map.x = parseInt(parts[1],10);
    this.map.y = parseInt(parts[2],10);
    if( data.length > 3 ) {
      parts = data[3].split("|");
      this.groups.timestamp = parseInt(parts[0],10);
      this.groups.list = parts[1].split(", ");
    }
    if( data.length > 4 ) {
      parts = data[4].split(",");
      this.coords.x = parseInt(parts[0],10);
      this.coords.y = parseInt(parts[1],10);
    }
    if( data.length > 5 ) {
      parts = data[5].split(",");
      this.loyalty.timestamp = parseInt(parts[0],10);
      this.loyalty.value = parseInt(parts[1],10);
    }
  }
  this.toString = function() {
    var str = "";
    str += this.units.timestamp;
    var home = "";
    var there = "";
    var away = "";
    var moving = "";
    for( var key in serverInfo.unitInfo ) {
      home += "," + parseInt(this.units.home[key],10);
      there += "," + parseInt(this.units.there[key],10);
      away += "," + parseInt(this.units.away[key],10);
      moving += "," + parseInt(this.units.moving[key],10);
    }
    str += home + there + away + moving + ";";
    str += this.res.timestamp + ",";
    str += this.res.wood+",";
    str += this.res.stone+",";
    str += this.res.iron+",";
    str += this.res.storage+",";
    str += this.res.pop.current+","
    str += this.res.pop.max+";"
    str += this.map.timestamp + ",";
    str += this.map.x + ",";
    str += this.map.y + ";";
    str += this.groups.timestamp + "|";
    str += this.groups.list.join(", ") + ";";
    str += this.coords.x + "," + this.coords.y + ";";
    str += this.loyalty.timestamp + "," + this.loyalty.value;
    return str;
  }
  this.merge = function(vil) {
    if( this.units.timestamp < vil.units.timestamp )
      this.units = vil.units;
    if( this.res.timestamp < vil.res.timestamp )
      this.res = vil.res;
    if( this.map.timestamp < vil.map.timestamp )
      this.map = vil.map;
    if( this.groups.timestamp < vil.groups.timestamp )
      this.groups = vil.groups;
    if( this.loyalty.timestamp < vil.loyalty.timestamp )
      this.loyalty = vil.loyalty;
  }
  this.getUnitSum = function(unit,unitSum) {
    var val = 0;
    if( unitSum & 1 )
      val += this.units.home[unit];
    if( unitSum & 2 )
      val += this.units.there[unit];
    if( unitSum & 4 )
      val += this.units.away[unit];
    if( unitSum & 8 )
      val += this.units.moving[unit];
    return val;
  }
  this.id = parseInt(id,10);
  this.units = { timestamp: 0, home: { }, there: {}, away: { }, moving: { } };
  this.res = { timestamp: 0, wood: Number.NaN, stone: Number.NaN, iron: Number.NaN, storage: Number.NaN };
  this.groups = { timestamp: 0, list: [] };
  this.map = { timestamp: 0 };
  this.coords = { x: NaN, y: NaN };
  this.loyalty = { timestamp: 0, value: 0 };
  if( value )
    this.fromString(value);
  else
    this.load();
}
var ContextMenu = function(id,callBack) {
  this.addMenuItem = function(mi) {
    var row = THIS.menutab.insertRow(THIS.menutab.rows.length);
    var hasId = typeof(mi.id) != "undefined";
    var type = hasId || mi.href ? "td" : "th";
    var cell = row.appendChild(ce(type));
    if( mi === null ) {
      cell.colSpan = 2;
      cell.appendChild(ce("hr"));
    }
    else {
      if( mi.icon )
        cell.appendChild(ce("img")).src = mi.icon;
      if( mi.text ) {
        cell = row.appendChild(ce(type));
        var el = cell;
        if( hasId || mi.href ) {
          el = cell.appendChild(ce("a"));
          el.href = mi.href ? mi.href : "javascript:;";
          if( hasId && THIS.callBack )
            el.addEventListener("click", THIS.onMenuItemClicked, false );
        }
        el.appendChild(document.createTextNode(mi.text));
      }
      unwrap(row).ctxData = mi;
    }
    return row;
  }
  this.removeMenuItem = function(id) {
    for( var i = 1; i < THIS.menutab.rows.length; i++ ) {
      var row = unwrap(THIS.menutab.rows[i]);
      if( row.ctxData && row.ctxData.id && row.ctxData.id == id ) {
        THIS.menutab.tBodies[0].removeChild(row);
        return;
      }
    }
  }
  this.addTarget = function(target,title,data) {
    this.targets.push( { node: target, title: title, data: data });
  }
  this.onContextMenu = function(e) {
    for( var i = 0; i < THIS.targets.length; i++ ) {
      if( THIS.targets[i].node == e.target ) {
        THIS.show(e.pageX,e.pageY,THIS.targets[i].title, THIS.targets[i].data);
        e.preventDefault();
        return false;
      }
    }
    if( THIS.callBack ) {
      var res = THIS.callBack(THIS.id, "show", e );
      if( res ) {
        THIS.show(e.pageX,e.pageY,res.title,res.data);
        e.preventDefault();
        return false;
      }
    }
  }
  this.show = function(x,y,title,targetData) {
    THIS.targetData = targetData;
    for( var j = 1; j < THIS.menutab.rows.length; j++ ) {
      var ctxData = unwrap(THIS.menutab.rows[j]).ctxData;
      var hasId = ctxData && typeof(ctxData.id) != "undefined";
      if( ctxData && hasId ) {
        var a = THIS.menutab.rows[j].cells[1].firstChild;
        if( hasId && THIS.callBack ) {
          var href = THIS.callBack(THIS.id, "modHref", ctxData, targetData);
          if( href )
            a.href = href;
          else if( ctxData.href )
            a.href = ctxData.href
          else
            a.href = "javascript:;"
        }
        else
          a.href = ctxData.href;
        a.style.color = a.href == "" ? "#999999":"";
      }
    }
    document.body.appendChild(THIS.menu);
    var tp = [x,y]
    var ts = [0, 0]
    var vp = [window.pageXOffset, window.pageYOffset]; // view pos
    var vs = [window.innerWidth, window.innerHeight]; // view size
    var ms = [ THIS.menutab.offsetWidth, THIS.menutab.offsetHeight ];
    var l = (ts[1]+ms[1])/2;
    var mp = [
      -vp[0]+tp[0]+ms[0] > vs[0] ?
        (-vp[0]+tp[0]+ts[0]/2 > vs[0]/2 && tp[0]+ts[0]-ms[0] >= 0 ? tp[0]+ts[0]-ms[0] : tp[0]) :
        tp[0],
      -vp[1]+tp[1]+ts[1]+ms[1]-l+l > vs[1] ?
        (-vp[1]+tp[1]+ts[1]/2 > vs[1]/2 && tp[1]+ts[1]-l-l >= 0 ? tp[1]+ts[1]-l-l : tp[1]+ts[1]-l+l) :
        (tp[1]+ts[1]-l+l >= 0 ? tp[1]+ts[1]-l+l : tp[1]+ts[1]-l-l)
    ];
    THIS.menu.style.left = mp[0] + "px";
    THIS.menu.style.top = mp[1] + "px";
    THIS.menutab.rows[0].cells[0].innerHTML = title;
    var res = title.match(/(\d{1,3})\|(\d{1,3})/);
    if( res ) {
      var cell = THIS.menutab.rows[0].cells[0];
      cell.setAttribute("coords", res[1]+"_"+res[2]);
      RunTimes.createToolTip(cell);
    }
    document.body.addEventListener("mousedown", THIS.onMouseDown, false );
  }
  this.onMouseDown = function(e) {
    if(!THIS.mouseOverMenu) {
      THIS.hide();
      e.preventDefault();
      return false;
    }
  }
  this.onMenuItemClicked = function(e) {
    THIS.hide();
    THIS.callBack(THIS.id, "click", unwrap(this.parentNode.parentNode).ctxData, THIS.targetData);
    return false;
  }
  this.hide = function() {
    document.body.removeEventListener("mousedown", THIS.onMouseDown, false );
    document.body.removeChild(THIS.menu);
  }
  var THIS = this;
  this.callBack = callBack;
  this.id = id;
  this.targets = [];
  this.mouseOverMenu = false;
  document.body.addEventListener("contextmenu", this.onContextMenu, false);
  this.menu = ce("div");
  this.menu.addEventListener("mouseover", function(e) { THIS.mouseOverMenu = true; }, false );
  this.menu.addEventListener("mouseout", function(e) { THIS.mouseOverMenu = false; }, false );
  this.menu.style.zIndex = 10000;
  this.menu.style.position = "absolute";
  this.menu.style.width = "100px";
  this.menu.style.height = "100px";
  this.menu.style.whiteSpace = "nowrap";
  this.menutab = this.menu.appendChild(ce("table"));
  this.menutab.className = "popup_content";
  this.menutab.style.border = "2px solid #804000";
  this.menutab.insertRow(0).appendChild(ce("th")).colSpan=2;
  this.targetData = null;
}
var TableSorter = function(tab,evenClass,oddClass,bodySorter,fnIsGroupStart) {
  var THIS = this;
  var up = String.fromCharCode(9650);
  var down = String.fromCharCode(9660);

  var header = 0;
  if( typeof( evenClass ) == "undefined" )
    evenClass = "";
  if( typeof( oddClass ) == "undefined" )
    oddClass = "";
  var classes = [evenClass,oddClass];
  var cnre = new RegExp( classes[0] + "|" + classes[1] );
  var hasCallback = typeof(fnIsGroupStart) != "undefined";

  this.addSortColumn = function(idx,compareFn,sorted,getValueCellFn) {
    var cell = unwrap(tab.tHead.rows[header].cells[idx]);
    cell.compareFn = compareFn;
    if( typeof(getValueCellFn) == "undefined" )
      if( bodySorter )
        cell.getValueCellFn = function(body,idx) { return body.rows[0].cells[idx]; };
      else
        cell.getValueCellFn = function(row,idx) { return row.cells[idx]; };
    else
      cell.getValueCellFn = getValueCellFn;
    if( Settings.settings.misc.newLineSort ) 
      tab.tHead.rows[header].cells[idx].appendChild(ce("br"));
    tab.tHead.rows[header].cells[idx].appendChild(document.createTextNode(String.fromCharCode(160)));
    var a = tab.tHead.rows[header].cells[idx].appendChild(ce("a"));
    a.style.color = sorted == 1 ? "black" : "grey";
    a.innerHTML = up;
    a.href = "javascript:;";
    a.addEventListener("click",this.sort,false);
    a = tab.tHead.rows[header].cells[idx].appendChild(ce("a"));
    a.style.color = sorted == -1 ? "black" : "grey";
    a.innerHTML = down;
    a.href = "javascript:;";
    a.addEventListener("click",this.sort,false);
    
//    tab.tHead.rows[header].cells[idx].addEventListener("click", this.sort, false);
//    tab.tHead.rows[header].cells[idx].style.cursor = "pointer";
//    tab.tHead.rows[header].cells[idx].appendChild(document.createTextNode(!sorted ? no : sorted > 0 ? up : down));
    if( sorted )
      sortCol = (idx+1)*sorted;
  }
  this.setSortMarker = function(col,dir) {
    if(col != 0 ) {
      col = Math.abs(col)-1;
      var nodes = tab.tHead.rows[header].cells[col].childNodes.length;
      var aUp = tab.tHead.rows[header].cells[col].childNodes[nodes-2];
      var aDn = tab.tHead.rows[header].cells[col].childNodes[nodes-1];
      aUp.style.color = dir <= 0 ? "grey" : "black";
      aDn.style.color = dir >= 0 ? "grey" : "black";
    }
  },
  this.sort = function(e) {
    var start = new Date().getTime();
    var idx = this.parentNode.cellIndex;
    var toSort = (idx+1) * (this.textContent == down ? -1 : 1);
    if( toSort != sortCol ) {
      if( toSort == -sortCol ) {
        rows.reverse();
      }
      else {
        THIS.setSortMarker(sortCol,0);
        rows.sort(function(a,b) {
            var cellHead = unwrap(tab.tHead.rows[header].cells[idx]); 
            var ret = 0; 
            if( cellHead.getValueCellFn ) 
              ret = cellHead.compareFn(cellHead.getValueCellFn(a,idx),cellHead.getValueCellFn(b,idx)); 
            else 
              ret = cellHead.compareFn(a.cells[idx],b.cells[idx]); 
            if( toSort < 0 ) 
              ret *= -1; 
            return ret;
          });
        lib.debug.log("Sort: " + (new Date().getTime()-start) + " ms");
      }
      for( var i = 0; i < rows.length; i++ ) {
        var rowIdx = rows[i].rowIndex;
        THIS.modClassName(tab.appendChild(rows[i]), i&1 );
        if( hasCallback ) {
          while( !fnIsGroupStart(tab.rows[rowIdx]) ) {
            THIS.modClassName(tab.appendChild(tab.rows[rowIdx]), i&1);
          }
        }
      }
      THIS.setSortMarker(toSort,toSort);
      sortCol = toSort;
    }
    lib.debug.log("Table sorted in " + (new Date().getTime()-start) + " ms");
  }
  this.modClassName = function(row,odd) {
//    row.className = row.className.replace(classes[0],"").replace(classes[1],"");
    row.className = row.className.replace(cnre,"");
    row.className = classes[odd] + " " + row.className;
  }

  if( tab.tHead === null ) {
    tab.insertBefore(ce("thead"),tab.tBodies[0]);
    tab.tHead.appendChild(tab.tBodies[0].rows[0]);
    for( var i = 0; i < tab.tBodies.length; i++ ) {
      if( tab.tBodies[i].rows.length == 0 )
        tab.removeChild(tBodies[i--]);
    }
  }
  for( header = 0; header < tab.tHead.rows.length; header++ ) {
    if( tab.tHead.rows[header].cells[0].nodeName.toUpperCase() == "TH" )
      break;
  }

  tab.tHead.rows[header].style.whiteSpace = "nowrap";
  var rows = [];
  var sortCol = 0;
  if( bodySorter ) {
    for( var i = 0; i < tab.tBodies.length; i++ )
      rows.push(tab.tBodies[i]);
  }
  else {
    for( var i = 0; i < tab.tBodies[0].rows.length; i++ ) {
      if( !hasCallback || fnIsGroupStart(tab.tBodies[0].rows[i]) )
        rows.push(tab.tBodies[0].rows[i]);
    }
  }
}
var Color = function() {
  var THIS = this;
  this.r = 0;
  this.g = 0;
  this.b = 0;
  this.fromString = function(str) {
    var res = str.match( /rgb\((\d+), (\d+), (\d+)\)/);
    if( res ) {
      this.r = res[1];
      this.g = res[2];
      this.b = res[3];
    }
    else {
      var off = str[0] == "#" ? 1 : 0;
      if( str.length == off+3 ) {
        this.r = parseInt(str.substring(off,1+off),16);
        this.g = parseInt(str.substring(1+off,2+off),16);
        this.b = parseInt(str.substring(2+off),16);
      }
      else if( str.length == off+6 ) {
        this.r = parseInt(str.substring(off,2+off),16);
        this.g = parseInt(str.substring(2+off,4+off),16);
        this.b = parseInt(str.substring(4+off),16);
      }
    }
    return this;
  }
  this.toString = function(rgb,a) {
    if( rgb ) {
      if( a === undefined )
        return "rgb("+this.r+", "+this.g+", "+this.b+")";
      else
        return "rgba("+this.r+", "+this.g+", "+this.b+", " + a + ")";
    }
    else
      return "#" + (0x100 | this.r).toString(16).substr(1) + (0x100 | this.g).toString(16).substr(1) + (0x100 | this.b).toString(16).substr(1);
  }
  this.invert = function() {
    this.r = Math.abs(255-this.r);
    this.g = Math.abs(255-this.g);
    this.b = Math.abs(255-this.b);
    return this;
  }
  this.getContrastColor = function() {
    return 0.213 * this.r + 0.715 * this.g + 0.072 * this.b < 128 ? new Color(255,255,255) : new Color(0,0,0);
  }
  this.fadeTo = function(p,color) {
    if( p < 0 ) p = 0;
    if( p > 100 ) p = 100;
      return new Color( Math.round(this.r+(color.r-this.r)*p), Math.round(this.g+(color.g-this.g)*p), Math.round(this.b+(color.b-this.b)*p) );
  }
  switch( arguments.length ) {
    case 0:
      break;
    case 1:
      this.fromString(arguments[0]);
      break;
    case 3:
      this.r = arguments[0];
      this.g = arguments[1];
      this.b = arguments[2];
      break;
    default:
      throw( "Color: invalid parameters" );
  }
}
var DrillQueue = function(tab)  {
  var ctxMenu = [];
  var cancelLnks = [];
  this.cancel = function(e) {
    var idx = parseInt(this.getAttribute("idx"),10);
    if( cancelLnks[idx].length == 1 )
      location.href = cancelLnks[idx][0].href;
    else {
      if(!ctxMenu[idx]) {
        var id = cancelLnks[idx][0].href.match(/id=(\d+)/)[1];
        ctxMenu[idx] = new ContextMenu();
        var unit = this.getAttribute("unit");
        for( var i = 0; i < cancelLnks[idx].length; i++ )
          ctxMenu[idx].addMenuItem({ href: cancelLnks[idx][i].href, text: cancelLnks[idx][i].count + " " + (cancelLnks[idx][i].count == 1 ? texts[lib.lang].unit[unit] : texts[lib.lang].units[unit])});
      }
      ctxMenu[idx].show(e.pageX,e.pageY,texts[lib.lang].gui.cancelDrill);
    }
  }
  this.show = function(mode) {
    THIS.completionTab.style.display = mode == 1 ? "none" : "";
    THIS.queue.style.display = THIS.completionTab.style.display;
    THIS.smallQueue.style.display = mode == 0 ? "none" : "";
    lib.storage.setValue("drillqueuemode"+ownPid,mode);
  }
  this.createSmallQueue = function()  {
    this.smallQueue = this.completionTab.parentNode.insertBefore(ce("table"),this.completionTab);
    this.smallQueue.className = "vis";
    var row = this.smallQueue.insertRow(-1);
    var cell = row.appendChild(ce("th"));
    cell.appendChild(document.createTextNode(this.queue.rows[0].cells[0].innerHTML+" "));
    var a = cell.appendChild(ce("a"));
    a.href = "javascript:;";
    a.addEventListener("click", function() { THIS.show(0); }, false);
    var img = a.appendChild(ce("img"));
    img.src = "graphic/map/map_s.png";
    img.title = texts[lib.lang].gui.restore;
    cell.appendChild(document.createTextNode(" "));
    var span = cell.appendChild(ce("span"));
    span.innerHTML = this.completionTab.rows[0].cells[1].firstChild.innerHTML;
    row.appendChild(ce("th")).innerHTML = this.queue.rows[this.queue.rows.length-1].cells[2].innerHTML;
    setInterval(function() { span.innerHTML = THIS.completionTab.rows[0].cells[1].firstChild.innerHTML; }, 1000);
    row = this.smallQueue.insertRow(-1);
    cell = row.insertCell(-1);
    cell.colSpan = 2;
    var curUnit = "";
    var sum = 0;
    var idx = 0;
    var unitLnks = {};
    var rows = this.queue.rows.length;
    for( var i = 1; i < rows; i++ ) {
      var vals = this.queue.rows[i].cells[0].innerHTML.match(/(\d+) (.*)/);
      for( var key in texts[lib.lang].unit ) {
        if( texts[lib.lang].unit[key] == vals[2] || texts[lib.lang].units[key] == vals[2] ) {
          var a;
          if( curUnit != key ) {
            if( Settings.settings.recruit.drillQueueMode < 2 || unitLnks[key] == null ) {
              a = cell.appendChild(ce("a"));
              a.href = "javascript:;";
              var img = a.appendChild(ce("img"));
              img.src = "graphic/unit/unit_"+key+".png";
              sum = 0;
              cancelLnks.push([]);
              if( Settings.settings.recruit.drillQueueMode == 1 )
                curUnit = key;
              var idx = cancelLnks.length-1
              a.setAttribute("idx",idx);
              a.setAttribute("unit",key);
              a.addEventListener("click", this.cancel, false);
              var queueRow = null;
              if( Settings.settings.recruit.drillQueueMode > 0 && !Settings.settings.recruit.shrinkSmallOnly) {
                queueRow = this.queue.insertRow(-1);
                queueRow.className = "nowrap";
                queueRow.insertCell(-1);
                queueRow.insertCell(-1);
                var cancelCell = queueRow.insertCell(-1);
                var aText = cancelCell.appendChild(ce("a"));
                aText.href = "javascript:;";
                aText.innerHTML = texts[lib.lang].gui.cancel;
                aText.setAttribute("idx",idx);
                aText.setAttribute("unit",key);
                aText.addEventListener("click", this.cancel, false);
              }
              unitLnks[key] = { a: a, row: queueRow, sum: 0, idx: idx };
            }
          }
          var count = parseInt(vals[1],10);
          unitLnks[key].sum += count;
          Recruitment.unitSum[key] += count;
          cancelLnks[unitLnks[key].idx].push( { count: count, href: this.queue.rows[i].cells[3].getElementsByTagName("a")[0].href } );
          unitLnks[key].a.title = unitLnks[key].sum + " " + (unitLnks[key].sum == 1 ? texts[lib.lang].unit[key] : texts[lib.lang].units[key]);
          if( cancelLnks[unitLnks[key].idx].length > 1 )
            unitLnks[key].a.title += " (" + cancelLnks[unitLnks[key].idx].length + ")";
          if( unitLnks[key].row )
            unitLnks[key].row.cells[0].innerHTML = unitLnks[key].a.title;
          unitLnks[key].a.title += " - " + this.queue.rows[i].cells[2].innerHTML;
          if( unitLnks[key].row )
            unitLnks[key].row.cells[1].innerHTML = this.queue.rows[i].cells[2].innerHTML;
        }
      }
      if( Settings.settings.recruit.drillQueueMode > 0 && !Settings.settings.recruit.shrinkSmallOnly )
        this.queue.rows[i].style.display = "none";
    }
    this.queue.rows[0].cells[0].appendChild(document.createTextNode(" "));
    a = this.queue.rows[0].cells[0].appendChild(ce("a"));
    a.addEventListener("click", function() { THIS.show(1); }, false);
    img = a.appendChild(ce("img"));
    img.src = "graphic/map/map_n.png";
    img.title = texts[lib.lang].gui.minimize;
    if( Settings.settings.recruit.drillQueueMode > 0 )
      this.queue.rows[0].removeChild(this.queue.rows[0].cells[1]);
  }

  var THIS = this;
  this.completionTab = tab;
  this.queue = getByTagName(getByTagName(tab,"div","nextSibling"),"table","firstChild");
  this.createSmallQueue();
  this.show(lib.storage.getValue("drillqueuemode"+ownPid,1));
}

var VariantEdit = function(parent,fields,fieldWidth,varKey,calcedCols,calcFn) {
  var THIS = this;
  this.insertHeadCol = function(obj) {
    cell = row.appendChild(ce("th"));
    if( obj.img ) {
      var img = cell.appendChild(ce("img"));
      img.src = obj.img;
      img.alt = obj.title;
      img.title = obj.title;
      cell.style.textAlign = "center";
    }
    else
      cell.innerHTML = obj.title;
  }
  this.insertRow = function(variant) {
    var name = "";
    if( !variant ) {
      var title = texts[lib.lang].gui.enterName;
      for(;;) {
        name = prompt(title);
        if( name === null )
          return;
        if( name.length > 0 ) {
          for( var i = 1; i < tab.rows.length; i++ ) {
            if( tab.rows[i].cells[0].lastChild.value == name ) {
              title = texts[lib.lang].gui.nameExists;
              break;
            }
          }
          if( i == tab.rows.length )
            break;
        }
        else
          title = texts[lib.lang].gui.enterName;
      }
    }
    else
      name = variant.name;
    row = tab.insertRow(-1);
    if( variant )
      row.id = "dsfm_"+varKey+"_"+(row.rowIndex-1);
    row.style.whiteSpace = "nowrap";
    cell = row.insertCell(-1);
    if( hasDefVar ) {
      input = cell.appendChild(ce("input"));
      input.type = "radio";
      input.name = varKey+"Default";
      if( variant ) {
        input.checked = Settings[varKey].defVar == variant.id;
        input.value = variant.id;
      }
      else
        input.value = 10000 + row.rowIndex;
      input.addEventListener("click",function(e) { 
          var val = parseInt(this.value,10);
          if(  val == Settings[varKey].defVar ) {
            this.checked = false;
            val = 0;
          }
          Settings[varKey].defVar = val;
        }, false );
    }
    input = cell.appendChild(ce("input"));
    input.type = "text";
    input.style.width = "60px";
    input.value = name;
    input.addEventListener("change", function(e) {
        if( this.value.length == 0 ) {
          alert( texts[lib.lang].gui.enterName );
          return false;
        }
        var tab = getByTagName(this,"table","parentNode");
        var row = getByTagName(this,"tr","parentNode");
        for( var i = 1; i < tab.rows.length; i++ ) {
          if( row.rowIndex != i && this.value == tab.rows[i].cells[0].lastChild.value ) {
            alert( texts[lib.lang].gui.nameExists );
          }
        }        
      }, false );
    if( !variant )
      input.focus();
    for( j = 0; j < fields.length; j++ ) {
      cell = row.insertCell(-1);
      cell.style.width = fieldWidth;
      input = ce("input");
      input.type = "text";
      input.name = fields[j].key;
      input.value = variant ? variant[fields[j].key] : fields[j].newVal;
      cell.appendChild(input);
      input.addEventListener("change",function(e){ 
        var idx = this.parentNode.cellIndex-1;
        var val = parseInt(this.value,10); 
        if( val < fields[idx].minVal || val > fields[idx].maxVal ) {
          alert(texts[lib.lang].gui.enterInRange[0] + fields[idx].minVal + texts[lib.lang].gui.enterInRange[1] + fields[idx].maxVal + texts[lib.lang].gui.enterInRange[2] );
          return false;
        }
        if( calcFn )
          calcFn(getByTagName(this,"tr","parentNode")); 
      },false);
      input.style.width = fieldWidth;
    }
    if( calcedCols ) {
      for( var j = 0; j < calcedCols.length; j++ )
        row.insertCell(-1).style.textAlign = "right";
    }
    
    cell = row.insertCell(row.cells.length);
    a = cell.appendChild(ce("a"));
    a.innerHTML = "X";
    a.style.color = "#FF0000";
    a.href = "javascript:;";
    a.title = texts[lib.lang].gui.delVariant;
    a.addEventListener("click", THIS.deleteVariant, false);
    
    if( calcFn )
      calcFn(row);
  }
  this.deleteVariant = function(e) {
    var row = getByTagName(e.target,"tr","parentNode");
    if( row.id != "" ) {
      var idx = row.id.split("_");
      idx = parseInt(idx[idx.length-1],10);
      Settings[varKey].assigns = Settings[varKey].assigns.replace(new RegExp(";\\d+,"+Settings[varKey].variants[idx].id+";"),";");
    }
    row.parentNode.removeChild(row);
    Settings[varKey].variants.splice(idx,1);
  }
  this.save = function() {
    var nextId = 1;
    for( var i = 0; i < Settings[varKey].variants.length; i++ ) {
      if( Settings[varKey].variants[i].id >= nextId )
        nextId = Settings[varKey].variants[i].id + 1;
    }
    for( var i = 1; i < tab.rows.length; i++ ) {
      if( i-1 == Settings[varKey].variants.length )
        Settings[varKey].variants.push( {id: nextId++ } );
      Settings[varKey].variants[i-1].name = tab.rows[i].cells[0].lastChild.value;
      for( var j = 0; j < fields.length; j++ )
        Settings[varKey].variants[i-1][fields[j].key] = parseInt(tab.rows[i].cells[j+1].firstChild.value,10);
      if( hasDefVar && tab.rows[i].cells[0].firstChild.checked )
        Settings[varKey].defVar = Settings[varKey].variants[i-1].id;
      for( var j = 0; j < calcedCols.length; j++ ) {
        if( calcedCols[j].propName )
          Settings[varKey].variants[i-1][calcedCols[j].propName] = parseInt(tab.rows[i].cells[fields.length+j+1].innerHTML.replace(/<[^>]+>|\./g,""),10);
      }
    }
    Settings[varKey].variants.sort(function(a,b) { return compare(a.name,b.name); });
    lib.storage.setValue(varKey+ownPid,Settings[varKey]);
  }
  
  var tab = parent.appendChild(ce("table"));
  tab.className = "vis";
  var row = tab.insertRow(-1);
  row.style.whiteSpace = "nowrap";
  cell = row.appendChild(ce("th"));
  cell.innerHTML = texts[lib.lang].gui.variantName;
  
  for( var i = 0; i < fields.length; i++ )
    this.insertHeadCol(fields[i]);
  if( calcedCols ) {
    for( i = 0; i < calcedCols.length; i++ )
      this.insertHeadCol(calcedCols[i]);
  }
  cell = row.appendChild(document.createElement("th"));
  cell.innerHTML = "X";
  cell.style.color = "#FF0000";

  var input;
  var hasDefVar = typeof(Settings[varKey].defVar) != "undefined";
  for( i = 0;  i < Settings[varKey].variants.length; i++ )
    this.insertRow(Settings[varKey].variants[i]);
  var a = parent.appendChild(ce("a"));
  a.href = "javascript:;";
  a.innerHTML = "&raquo; " + texts[lib.lang].gui.addVariant;
  a.addEventListener("click", function(e) { THIS.insertRow(); }, false );
}

var Settings = {
  keyPress : "",
  keyDown : 0,
  settings: {},
  defSettings : {
    "misc": {
      "reportMaxAge":5,
      "useHotKeys":true,
      "coordSelector":true,
      "modGroupPopup":true,
      confirmQueue: true,
      slSwitcher: 2,
      navBarSwitcher: true,
      newLineSort: true,
      runTimeToolTips: true,
      rtttDelay: 0,
    },
    "map": {
      "villageGroups":true,
      "vgShowAlly":true,
      "rememberPos":true,
      "sumHours":24,
      "opacityMin":40,
      "opacityMaxRes":2000,
      "ageTransparency":1,
      "minAgeTransparency":1,
      "showBars":true,
      "showRessis":true,
      "playerColored":true,
      "showWall":true,
      "redirActive":true,
      "showPoints":true,
      "groupsOnTopo":true,
      "shadowTopo": true,
      "topoBorderOwn": true,
      "defense": 100000,
      "defense_cavalry": 100000,
      "defense_archer": 100000,
    },
    "popup": {
      "minReportAge":24,
      "showRessis":true,
      "showReportAge":true,
      "showBuildings":true,
      "showMining":true,
      "showUnitsIn":true,
      "showUnitsOut":true,
      "showLoyalty":true,
      "showBuildingChange":true,
    },
    "place": {
      "showRessis":true,
      "showUnitsIn":true,
      "showUnitsOut":true,
      "showBuildings":2,
      "showCatas":true,
      "noReportLoad":500,
      "maxFarms":10,
      "farmDist":20,
      "okOnPlayer":2,
      "incRangeRes":500,
      "showBuildingChange":true,
      "minLoad":true,
      "minRamWall":1,
      "minKataLevel":1,
      "minRamsNeeded":false,
      "minKatasNeeded":false,
      "maxAttAge":24,
      "spyNoReport":true,
      showCarry: true,
      showRunTime: true,
      showArrivalTime: true,
      minEQ: 30,
      disableOnUnits: true,
    },
    "storage": {
      titleResColored: true,
      titleFarmColored: true,
      modSnob: true,
      snobResColored: true,
//      resourceColFloating: true,
//      farmColFloating: true,
    },
    "report": {
      showBPs: true,
      showSurvivors: true,
      showLostCost: true,
      enableReorder: true,
    },
    "recruit": {
      "drillQueueMode":2,
      "shrinkSmallOnly":false,
      "shrinkRecruitmentMode":2,
      showRecruitSums: true,
      showRecruitTotal: true,
    },
    "prod": {
      runtimeCol: true,
      runtimeTT: true,
      resColored: true,
      farmColored: true,
      farmTotal: true,
      showSums: true,
      removeBuildTime: true,
      shrinkRecruitmentMode: 2,
      showRecruitSums: true,
    },
  },
  colors: { range:   { resource:        [ true, { val: 0, color: "#00FF00" }, { val: 75, color: "#FFFF00" }, { val:100, color: "#FF0000" } ],
                       farm:            [ true, { val: 0, color: "#00FF00" }, { val: 75, color: "#FFFF00" }, { val:100, color: "#FF0000" } ], 
                       defense:         [ true, {val: 0, color: "#FF0000"}, {val: 75, color: "#FFFF00"}, { val:100, color: "#00FF00" } ],
                       defense_cavalry: [ true, {val: 0, color: "#FF0000"}, {val: 75, color: "#FFFF00"}, { val:100, color: "#00FF00" } ],
                       defense_archer:  [ true, {val: 0, color: "#FF0000"}, {val: 75, color: "#FFFF00"}, { val:100, color: "#00FF00" } ] },
            place:   { unitStates: [ {background: "#CFCFCF", border: "#808080"}, 
                                     {background: "#D6FF5B", border: "#008000"}, 
                                     {background: "#FFFC7A", border: "#FF0000"}, 
                                     {background: "#FFD36D", border: "#FF0000"},
                                     {background: "#FFBC9E", border: "#FF0000"},
                                     {background: "#D6FF5B", border: "#FF0000"} ],
                        confirmTitle: {attack: "#FF0000", support: "#00FF00"} },
          },
  defHotKeys : {
    "common": {
      "place": {"keyCode":80,"text":" [P]","modifier":0},
      "map": {"keyCode":75,"text":" [K]","modifier":0},
      "market": {"keyCode":77,"text":" [M]","modifier":0},
      "nextVillage": {"keyCode":107,"text":" [+]","modifier":0},
      "prevVillage": {"keyCode":109,"text":" [-]","modifier":0},
      "lastVillage": {keyCode:106, text:" [*]", modifier:0},
      "close": {"keyCode":27,"text":" [Esc]","modifier":0},
      "ok": {"keyCode":13,"text":" [↵]","modifier":0}},
    "map": {
      "villageinfo": {"keyCode":73,"text":" [I]","modifier":0},
      "sendunits": {"keyCode":84,"text":" [T]","modifier":0},
      "getunits": {"keyCode":83,"text":" [S]","modifier":0},
      "market": {"keyCode":82,"text":" [R]","modifier":0},
      "getress": {"keyCode":72,"text":" [H]","modifier":0},
      "centermap": {"keyCode":90,"text":" [Z]","modifier":0},
      "removeinfo": {"keyCode":88,"text":" [X]","modifier":0},
      "selectvillage": {"keyCode":65,"text":" [A]","modifier":0},
      "togglenofarm": {"keyCode":70,"text":" [F]","modifier":0},
      "coordlist": {"keyCode":76,"text":" [L]","modifier":0},
      "eq": {"keyCode":81,"text":" [Q]","modifier":0},
      "stats": {"keyCode":191,"text":" [#]","modifier":0},
      "addbb2fl": {"keyCode":66,"text":" [B]","modifier":0},
      "ownNone": {"keyCode":32,"text":" [Leertaste]","modifier":0},
      "ownUnits": {"keyCode":69,"text":" [E]","modifier":0},
      "ownGroups": {"keyCode":71,"text":" [G]","modifier":0},
      "ownCoords": {"keyCode":67,"text":" [C]","modifier":0},
      "ownName": {"keyCode":78,"text":" [N]","modifier":0},
      "ownPoints": {"keyCode":85,"text":" [U]","modifier":0},
      "ownResource": {"keyCode":79,"text":" [O]","modifier":0},
      "ownDef": {"keyCode":68,"text":" [D]","modifier":0},
      "otherNone": {"keyCode":32,"text":" [⇑ + Leertaste]","modifier":3},
      "otherFarmInfo": {"keyCode":73,"text":" [⇑ + I]","modifier":3},
      "otherPlayer": {"keyCode":83,"text":" [⇑ + S]","modifier":3},
      "otherCoords": {"keyCode":67,"text":" [⇑ + C]","modifier":3},
      "otherName": {"keyCode":78,"text":" [⇑ + N]","modifier":3},
      "otherPoints": {"keyCode":85,"text":" [⇑ + U]","modifier":3},
//      "otherMoral": {"keyCode":77,"text":" [⇑ + M]","modifier":3},
      "otherAlly": {"keyCode":79,"text":" [⇑ + O]","modifier":3}
    },
    "place": {
      "allUnits": {"keyCode":65,"text":" [A]","modifier":0},
      "insertUnits": {"keyCode":69,"text":" [E]","modifier":0},
      "farmList": {"keyCode":70,"text":" [F]","modifier":0},
      "getAtts": {"keyCode":76,"text":" [L]","modifier":0},
      "eq": {"keyCode":81,"text":" [Q]","modifier":0},
      "attack": {"keyCode":13,"text":" [↵]","modifier":0},
      "support": {"keyCode":83,"text":" [S]","modifier":0},
      "unitSelect": {"keyCode":87,"text":" [W]","modifier":0},
      "lastTarget": {"keyCode":67,"text":" [C]","modifier":0},
      "lastUnits": {"keyCode":85,"text":" [U]","modifier":0},
      "enableAttack": {"keyCode":79,"text":" [O]","modifier":0},
    },
    "reports": {
      "forward": {"keyCode":87,"text":" [W]","modifier":0},
      "move": {"keyCode":86,"text":" [V]","modifier":0},
      "del": {"keyCode":76,"text":" [L]","modifier":0},
      "next": {"keyCode":37,"text":" [←]","modifier":0},
      "prev": {"keyCode":39,"text":" [→]","modifier":0}
    }
  },
  sounds : { 
    attOwnAcc: { active: true, volume: 100, url: "http://www.mediacollege.com/downloads/sound-effects/star-trek/tos/tos-redalert.wav", loop: true },
    attUVAccs: { active: true, volume: 75, url: "http://www.mediacollege.com/downloads/sound-effects/vehicle/siren/firetrucks-01.wav", loop: true },
    attDone:   { active: true, volume: 75, url: "http://www.mediacollege.com/downloads/sound-effects/weapons/bulletricochet-01.wav", loop: false },
    igm:       { active: true, volume: 75, url: "http://www.mediacollege.com/downloads/sound-effects/star-trek/tng/tng-worf-incomingmessage.wav", loop: false },
    report:    { active: true, volume: 75, url: "http://www.mediacollege.com/downloads/sound-effects/audience/kids-cheer-01.wav", loop: false },
    forum:     { active: true, volume: 75, url: "http://www.mediacollege.com/downloads/sound-effects/star-trek/tng/tng-doorbell.wav", loop: false },
    session:   { active: true, volume: 75, url: "http://www.mediacollege.com/downloads/sound-effects/star-trek/voy/voy-comp-01.wav", loop: false },
  },
  kataOrder : null,
  farmUnitCfg : null,
  userGroups : null,
  impExpPopup : null,
  exportPopup : null,
  defUnitColor : { spear: "#3E2C1A", sword: "#ABA3A0", axe: "#D5C5D3", archer: "#5B1B14", spy: "#DDDDDD", light: "#98612E", marcher: "#7E6F50", heavy: "#111111", ram: "#524A44", catapult: "#6C4224", knight: "#010175", snob: "#A69671" },
  exportGroups : { serverCfg: "addBuildingInfo|buildinginfo|unitinfo|svrcfg", settings: "coordlist\\d+|exportGroups\\d+|settings\\d+|kataOrder\\d+|checkedUnits\\d+|drillqueueMode\\d+|dst\\d+|farmsort\\d+|groupsOnTopo\\d+|otherOvl\\d+|ownOvl\\d+|redirTarget\\d+|reportorder\\d+|smallQueue\\d+|unitSelect\\d+|unitSum\\d+|useeq\\d+|vilgrp\\d+|villageorder\\d+|bbcode\\d+|topo\\d+|mapopts\\d+|unitFilter\\d+", colors: "colors", hotkeys: "hotKeys", farmUnits: "farmUnitCfg\\d+", userGroups: "userGroups\\d+", ownVillage: "vil\\d+$", farminfos: "\\d+_\\d+|atts|beute|nofarms\\d+|rids", variants: "buildAssist\\d+|recruAssist\\d+", churches: "churches\\d+", },
  buildAssist: { variants:[], assigns: "", defVar: 0 },
  recruAssist: { variants:[], assigns: "" },
  variantEdit : { buildAssist: null, recruAssist: null },
  doIt : function() {
    Settings.settings = lib.storage.getValue("settings"+ownPid,Settings.defSettings);
    Settings.userGroups = lib.storage.getValue("userGroups"+ownPid, []);
    Settings.sounds = lib.storage.getValue("sounds",Settings.sounds);
    Settings.hotKeys = lib.storage.getValue("hotKeys",Settings.defHotKeys);
    Settings.colors = lib.storage.getValue("colors",Settings.colors);
    if( typeof( Settings.colors.units ) == "undefined" ) {
      Settings.colors.units = {};
      var i = 0;
      for( var key in serverInfo.unitInfo ) {
        Settings.colors.units[key] = Settings.defUnitColor[key];
        i++;
      }
      if( i > 0 )
        lib.storage.setValue("colors",Settings.colors);
    }
    Settings.kataOrder = lib.storage.getValue("kataOrder"+ownPid,[]);
    if( Settings.kataOrder.length == 0 ) {
      var i = 1;
      for( var key in serverInfo.buildingInfo ) {
        if( !isOneOf(key,"church","church_f","hide","statue") ) {
          var data = { key: key, isTarget: !isOneOf(key, "storage","wood","stone","iron") };
          if( key == "wall" )
            Settings.kataOrder.splice(0,0,data);
          else
            Settings.kataOrder.push( data );
        }
      }
      lib.storage.setValue("kataOrder"+ownPid,Settings.kataOrder);
    }
    
    Settings.buildAssist = lib.storage.getValue("buildAssist"+ownPid, Settings.buildAssist);
    Settings.recruAssist = lib.storage.getValue("recruAssist"+ownPid, Settings.recruAssist);
    
    serverInfo.unitAnz = 0;
    var bit = 1;
    for( var key in serverInfo.unitInfo ) {
      serverInfo.unitAnz++;
      if( key != "snob" && key != "militia" ) {
        serverInfo.unitInfo[key].bit = bit;
        bit <<= 1;
      }
      else
        serverInfo.unitInfo[key].bit = 0;
      if( typeof Settings.settings.map[key] == "undefined" )
        Settings.settings.map[key]="";
    }
    if( serverInfo.config ) {
      switch( serverInfo.config.game_base_config ) {
        case 1:
          serverInfo.getMining = function(level) { return Math.round((level == 0 ? 5 : Math.round(15 * Math.pow(1.1849979,(level-1)))) * serverInfo.config.speed) };
          serverInfo.getStorageSize = function(village) { var ret = 1000*Math.pow(1.23,village.buildings.storage.level-1); if( village.bonus == 9 ) ret *= 1.5; return Math.round(ret); };
          serverInfo.getHideSize = function(level) { return level == 0 ? 0 : Math.round(100*Math.pow(1.3511,level-1)); };
          serverInfo.getMaxPop = function(level) { return Math.round(240*Math.pow(1.17,level-1)); };
          break;
        case 3:
          serverInfo.getMining = function(level) { return Math.round((level == 0 ? 5 : Math.round(30 * Math.pow(1.149999,(level-1)))) * serverInfo.config.speed); };
          serverInfo.getStorageSize = function(village) { var ret = 1000*Math.pow(1.23,village.buildings.storage.level-1); if( village.bonus == 9 ) ret *= 1.5; return Math.round(ret); };
          serverInfo.getHideSize = function(level) { return level == 0 ? 0 : Math.round(100*Math.pow(1.3511,level-1)); };
          serverInfo.getMaxPop = function(level) { return Math.round(240*Math.pow(1.17,level-1)); };
          break;
        case 4:
        case 5:
        case 6:
          serverInfo.getMining = function(level) { return Math.round((level == 0 ? 5 : Math.round(30 * Math.pow(1.163118,(level-1)))) * serverInfo.config.speed) };
          serverInfo.getStorageSize = function(village) { var ret = 1000*Math.pow(1.2294934,village.buildings.storage.level-1); if( village.bonus == 9 ) ret *= 1.5; return Math.round(ret); };
          serverInfo.getHideSize = function(level) { return level == 0 ? 0 : Math.round(150*Math.pow(1.3335,level-1)); };
          serverInfo.getMaxPop = function(level) { return level == 0 ? 0 : Math.round(240*Math.pow(1.1721024,level-1)); };
          break;
        default:
          alert( texts[lib.lang].gui.unknownBaseConfig );
          return;
          break;
      }
      serverInfo.getRessource = function(village, name, ts) {
        if( village.buildings.timestamp > 0 ) {
          if( !ts )
            ts = lib.getTime();
          var mins = (ts - village.buildings.timestamp) / 60;
          var max = serverInfo.getStorageSize(village) - serverInfo.getHideSize(village.buildings.hide.level);
          var factor = 1;
          if( village["bonus"] == resInfos[name].bonus )
            factor = 2;
          else if( village["bonus"] == 8 )
            factor = 1.30;
          var minprod = serverInfo.getMining(village.buildings[name].level) / 60.0 * factor;
          return Math.min(max, Math.floor(village.res[name] + minprod * mins));
        }
        return -1;
      }
    }
    Settings.farmUnitCfg = Settings.loadFarmUnitConfig();
    
    if( lib.storage.getValue("version"+ownPid,"") != version ) {
      Settings.updateSettings();
    }
    
    if( lib.params.screen == "settings" && lib.params.mode == "settings" ) {
      var val = Settings.settings.misc.confirmQueue;
      var chk = document.getElementsByName("confirm_queue")[0];
      if( chk )
        Settings.settings.misc.confirmQueue = chk.checked;
      if( val != Settings.settings.misc.confirmQueue )
        lib.storage.setValue("settings"+ownPid,Settings.settings);
      Settings.showSettings();
      bindColorPicker();
    }
  },
  updateSettings : function() {
    for( var grp in Settings.defSettings ) {
      if( typeof Settings.settings[grp] == "undefined" )
        Settings.settings[grp] = {};
      for( var key in Settings.defSettings[grp] ) {
        if( typeof Settings.settings[grp][key] == "undefined" )
          Settings.settings[grp][key] = Settings.defSettings[grp][key];
      }
    }
    for( var grp in Settings.defHotKeys ) {
      if( typeof Settings.hotKeys[grp] == "undefined" )
        Settings.hotKeys[grp] = {};
      for( var key in Settings.defHotKeys[grp] ) {
        if( typeof Settings.hotKeys[grp][key] == "undefined" ) {
          Settings.hotKeys[grp][key] = { keyCode:0,text:"",modifier:0};
        }
      }
    }
    lib.storage.setValue("version"+ownPid,version);
    lib.storage.setValue("settings"+ownPid, Settings.settings);
    lib.storage.setValue("hotKeys", Settings.hotKeys);
  },
  showSettings : function() {
    var e = document.getElementsByTagName("h3");
    for( var i = 0; i < e.length; e++ ) {
      if( texts[lib.lang].regex.settings.test(e[i].innerHTML) ) {
        e = e[i].parentNode;
        break;
      }
    }
    var p = e.appendChild(ce("p"));
    e = p.appendChild(ce("form"));
    e.name="dsfm_settingsFrm";
    e.action = "javascript:;";
    e = e.appendChild(ce("table"));
    e.style.border = "1px solid rgb(222, 211, 185)";
    e.className = "vis";
    e.style.width = "100%";
    var row = e.insertRow(e.rows.length);
    var cell = row.appendChild(ce("th"));
    var a = cell.appendChild(ce("a"));
    a.href = "http://forum.die-staemme.de/showthread.php?t=147650";
    a.textContent = texts[lib.lang].gui.title + " " + version;
    a.target = "_blank";
    cell.colSpan = 2;

    row = e.insertRow(e.rows.length);
    var tabsCell = row.insertCell(0);

    row = e.insertRow(e.rows.length);
    var divCell = row.insertCell(0);
    divCell.style.verticalAlign = "top";

    for( var key in texts[lib.lang].gui.settings.titles ) {
      var span = tabsCell.appendChild(ce("span"));
      span.style.paddingRight = "20px";
      var a = span.appendChild(ce("a"));
      a.href = "javascript:;";
      a.id = "dsfm_"+key;
      a.innerHTML = texts[lib.lang].gui.settings.titles[key];
      a.addEventListener("click", Settings.showTab, false);
      var tab = divCell.appendChild(ce("table"));
      tab.id = "dsfm_"+key+"_tab";
      tab.className="vis";
      tab.style.width = "100%";
      tab.style.display = "none";
      Settings["create_"+key+"Form"]();
    }

    row = e.insertRow(e.rows.length);
    cell = row.insertCell(0);
    cell.colSpan = 5;
    var input = cell.appendChild(ce("input"));
    input.type = "button";
    input.value = texts[lib.lang].gui.savebutton;
    input.name = "dsfm_save";
    input.addEventListener("click", Settings.save, false);
    input = cell.appendChild(ce("input"));
    input.type = "button";
    input.value = texts[lib.lang].gui.exportbutton;
    input.name = "dsfm_export";
    input.addEventListener("click", function() { Settings.exportPopup.show(); }, false);

    input = cell.appendChild(ce("input"));
    input.type = "button";
    input.value = texts[lib.lang].gui.importbutton;
    input.name = "dsfm_import";
    input.addEventListener("click", function() { Settings.showImpExpForm(true) }, false);
    input = cell.appendChild(ce("input"));
    input.type = "button";
    input.value = texts[lib.lang].gui.deletebutton;
    input.name = "dsfm_delete";
    input.addEventListener("click", function() { clearAllInfos(); }, false);
    
    a = cell.appendChild(ce("a"));
    a.href = "http://hypix.de/staemme/wiki/doku.php?id=ds-assistent";
    a.innerHTML = "&raquo; Wiki";
    a.target = "_blank";
    
    Settings.impExpPopup = new lib.Popup("impexp_popup","",true,600,400);
    html = '<table style="width:600px; height:400px;">';
    html += '<tr height="100%"><td><textarea onclick="this.select()" id="dsfm_impexp_report" style="width:595px; height:100%;"></textarea></td></tr>';
    html += '<tr><td id="dsfm_impexp_desc"></td></tr>';
    html += '<tr id="dsfm_impbtn_row"><td style="text-align:center"><input id="dsfm_import_btn" type="button" value="'+texts[lib.lang].gui.startimport+'"/></td></tr>';
    html += '</table>';
    Settings.impExpPopup.content.innerHTML = html;
    $("dsfm_import_btn").addEventListener("click", Settings.importData, false);

    tab = p.appendChild(document.createElement("table"));
    row = tab.insertRow(-1);
    row.insertCell(-1).innerHTML = '<a href="http://hypix.de/staemme/spenden.html" target="_blank">'+texts[lib.lang].gui.donate+'</a>';

    lib.fireEvent($("dsfm_"+lib.storage.getValue("settingsTab"+ownPid,"map")),"click");
    
    Settings.exportPopup = new lib.Popup("exportGroups",texts[lib.lang].gui.exportGroups.title,true,400,300);
    var tab = Settings.exportPopup.content.appendChild(ce("table"));
    var exportGroups = lib.storage.getValue("exportGroups"+ownPid,"serverCfg,settings,colors,hotkeys,farmUnits,userGroups,ownVillage,farminfos,variants,churches");
    for( var key in Settings.exportGroups ) {
      if( key != "churches" || serverInfo.buildingInfo.church ) {
        row = tab.insertRow(-1);
        cell = row.insertCell(-1);
        input = cell.appendChild(ce("input"));
        input.type = "checkbox";
        input.value = key;
        input.checked = exportGroups.indexOf(key+",")>-1;
        cell.appendChild(document.createTextNode(texts[lib.lang].gui.exportGroups[key]));
      }
    }
    row = tab.insertRow(-1);
    cell = row.insertCell(-1);
    input = cell.appendChild(ce("input"));
    input.type = "button";
    input.value = texts[lib.lang].gui.exportbutton;
    input.addEventListener("click",Settings.exportData,false);
  },
  create_mapForm : function() {
    var tab = $("dsfm_map_tab");
   
    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    Settings.insertCheckBox(cell,"map","rememberPos");
    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    Settings.insertCheckBox(cell,"map","redirActive");
    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    Settings.insertInput(cell,"misc","reportMaxAge",1);
    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    Settings.insertInput(cell,"map","sumHours",2);
    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    Settings.insertCheckBox(cell,"map","villageGroups");
    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    Settings.insertCheckBox(cell,"map","vgShowAlly");
    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    Settings.insertCheckBox(cell,"map","groupsOnTopo");
    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    Settings.insertCheckBox(cell,"map","shadowTopo");
    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    Settings.insertCheckBox(cell,"map","topoBorderOwn");

    row = tab.insertRow(-1);
    row.insertCell(-1).appendChild(ce("b")).appendChild(document.createTextNode(texts[lib.lang].gui.overlayTitle));
    row.insertCell(-1).appendChild(ce("b")).appendChild(document.createTextNode(texts[lib.lang].gui.popupTitle));

    row = tab.insertRow(-1);
    Settings.insertCheckedInput(row.insertCell(-1),"map","ageTransparency","minAgeTransparency",1);
    Settings.insertCheckBox(row.insertCell(-1),"popup","showRessis");

    row = tab.insertRow(-1);
    Settings.insertInput(row.insertCell(-1),"map","opacityMin",4);
    Settings.insertCheckBox(row.insertCell(-1),"popup","showMining");

    row = tab.insertRow(-1);
    Settings.insertInput(row.insertCell(-1),"map","opacityMaxRes",5);
    Settings.insertCheckBox(row.insertCell(-1),"popup","showBuildings");

    row = tab.insertRow(-1);
    Settings.insertCheckBox(row.insertCell(-1),"map","showRessis");
    Settings.insertCheckBox(row.insertCell(-1),"popup","showBuildingChange",true);

    row = tab.insertRow(-1);
    Settings.insertCheckBox(row.insertCell(-1),"map","playerColored");
    Settings.insertCheckBox(row.insertCell(-1),"popup","showLoyalty");

    row = tab.insertRow(-1);
    Settings.insertCheckBox(row.insertCell(-1),"map","showBars");
    Settings.insertCheckBox(row.insertCell(-1),"popup","showUnitsIn");

    row = tab.insertRow(-1);
    Settings.insertCheckBox(row.insertCell(-1),"map","showWall");
    Settings.insertCheckBox(row.insertCell(-1),"popup","showUnitsOut");

    row = tab.insertRow(-1);
    Settings.insertCheckBox(row.insertCell(-1),"map","showPoints");
    Settings.insertCheckedInput(row.insertCell(-1),"popup","showReportAge","minReportAge",2);

    
    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    cell.innerHTML = "<b>"+texts[lib.lang].gui.settings.map.defTitle+"</b>";
    
    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    var unitTab = cell.appendChild(ce("table"));
    var rowTitle = unitTab.insertRow(-1);
    row = unitTab.insertRow(-1);
    for( var key in serverInfo.unitInfo ) {
      cell = rowTitle.appendChild(ce("th"));
      cell.style.textAlign = "center";
      var img = cell.appendChild(ce("img"));
      img.title = texts[lib.lang].units[key];
      img.src = "/graphic/unit/unit_"+key+".png";
      cell = row.insertCell(-1);
      var input = cell.appendChild(ce("input"));
      input.type = "text";
      input.size = "5";
      if( !isNaN(Settings.settings.map[key]) )
        input.value = Settings.settings.map[key];
      input.name=key;
      input.id = "dsfm_map"+key;
      input.addEventListener("change", function() {
          var def = { defense: 0, defense_cavalry: 0, defense_archer: 0 };
          var inputs = this.parentNode.parentNode.getElementsByTagName("input");
          for( var i = 0; i < inputs.length; i++ ) {
            var anz = parseInt(inputs[i].value,10);
            if( isNaN(anz) ) {
              inputs[i].value = 0;
              anz = 0;
            }
            for( var key in def )
              def[key] += anz * serverInfo.unitInfo[inputs[i].name][key];
          }
          for( var key in def )
            $("dsfm_map"+key).value = def[key];
        }, false );
    }
    
    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    Settings.insertInput(cell,"map","defense");

    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    Settings.insertInput(cell,"map","defense_cavalry");

    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    Settings.insertInput(cell,"map","defense_archer");

    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    Settings.createColorEdit("defense",cell);
  },
  create_placeForm  : function() {
    var tab = $("dsfm_place_tab");

    Settings.insertInput(tab.insertRow(-1).insertCell(-1),"place","minRamWall",2);
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"place","minRamsNeeded");
    
    Settings.insertInput(tab.insertRow(-1).insertCell(-1),"place","minKataLevel",2);
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"place","minKatasNeeded");
    
    var bTab = tab.insertRow(-1).insertCell(-1).appendChild(ce("table"));
    bTab.id = "dsfm_kataOrder";
    var row = bTab.insertRow(-1);
    var cell = row.appendChild(ce("th"));
    cell.colSpan = 3;
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.settings.place.kataOrderTitle[0]));
    row = bTab.insertRow(-1);
    row.appendChild(ce("th")).appendChild(document.createTextNode(texts[lib.lang].gui.settings.place.kataOrderTitle[1]));
    row.appendChild(ce("th")).appendChild(document.createTextNode(texts[lib.lang].gui.settings.place.kataOrderTitle[2]));
    row.appendChild(ce("th")).appendChild(document.createTextNode(texts[lib.lang].gui.settings.place.kataOrderTitle[3]));
    
    for( var i = 0; i < Settings.kataOrder.length; i++ ) {
      row = bTab.insertRow(-1);
      row.insertCell(-1);
      row.insertCell(-1).appendChild(document.createTextNode(serverInfo.addBuildingInfo[Settings.kataOrder[i].key].name));
      var input = row.insertCell(-1).appendChild(ce("input"));
      input.type = "checkbox";
      input.value = Settings.kataOrder[i].key;
      input.checked = Settings.kataOrder[i].isTarget;
    }
    createPrioLinks(bTab,2,0,0);

    tab.insertRow(-1).insertCell(-1).appendChild(ce("hr"));
    Settings.insertInput(tab.insertRow(-1).insertCell(-1),"place","noReportLoad",5);
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"place","disableOnUnits");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"place","spyNoReport");

    tab.insertRow(-1).insertCell(-1).appendChild(ce("hr"));
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"place","showCarry");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"place","showRunTime");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"place","showArrivalTime");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"place","showRessis");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"place","showUnitsIn");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"place","showUnitsOut");
    Settings.insertCombo(tab.insertRow(-1).insertCell(-1),"place","showBuildings");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"place","showBuildingChange");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"place","showCatas");
    
    tab.insertRow(-1).insertCell(-1).appendChild(ce("hr"));
    var colTab = tab.insertRow(-1).insertCell(-1).appendChild(ce("table"));
    cell = colTab.insertRow(-1).appendChild(ce("th"));
    cell.colSpan = 3;
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.settings.place.unitStates[0]));
    row = colTab.insertRow(-1);
    row.appendChild(ce("th")).appendChild(document.createTextNode(texts[lib.lang].gui.settings.place.unitStates[1]));
    row.appendChild(ce("th")).appendChild(document.createTextNode(texts[lib.lang].gui.settings.place.unitStates[2]));
    row.appendChild(ce("th")).appendChild(document.createTextNode(texts[lib.lang].gui.settings.place.unitStates[3]));
    for( var i = 0; i < 5; i++ ) {
      row = colTab.insertRow(-1);
      row.insertCell(-1).appendChild(document.createTextNode(texts[lib.lang].gui.unitStates[i]));
      var input = row.insertCell(-1).appendChild(ce("input"));
      input.type = "text";
      input.id = "dsfm_placeUnitStateBorder"+i;
      input.size = 8;
      input.className = "dsfm_color {required:false}";
      input.value = Settings.colors.place.unitStates[i].border;

      input = row.insertCell(-1).appendChild(ce("input"));
      input.type = "text";
      input.id = "dsfm_placeUnitStateBg"+i;
      input.size = 8;
      input.className = "dsfm_color {required:false}";
      input.value = Settings.colors.place.unitStates[i].background;
    }
    tab.insertRow(-1).insertCell(-1).appendChild(ce("hr"));
    tab.insertRow(-1).insertCell(-1).appendChild(ce("b")).appendChild(document.createTextNode(texts[lib.lang].gui.settings.place.farmlist[0]+':'));
    cell = tab.insertRow(-1).insertCell(-1);
    input = cell.appendChild(ce("input"));
    input.type="text";
    input.id = "dsfm_placemaxFarms";
    input.size = 2;
    input.value = Settings.settings.place.maxFarms;
    cell.appendChild(document.createTextNode(" "+texts[lib.lang].gui.settings.place.farmlist[1]+" "));
    input = cell.appendChild(ce("input"));
    input.type="text";
    input.id = "dsfm_placeincRangeRes";
    input.size = 5;
    input.value = Settings.settings.place.incRangeRes;
    cell.appendChild(document.createTextNode(" "+texts[lib.lang].gui.settings.place.farmlist[2]+" "));
    input = cell.appendChild(ce("input"));
    input.type="text";
    input.id = "dsfm_placefarmDist";
    input.size = 2;
    input.value = Settings.settings.place.farmDist;
    cell.appendChild(document.createTextNode(" "+texts[lib.lang].gui.settings.place.farmlist[3]));
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"place","minLoad");
    Settings.insertInput(tab.insertRow(-1).insertCell(-1),"place","maxAttAge",2);
    Settings.insertInput(tab.insertRow(-1).insertCell(-1),"place","minEQ",2);
    
    tab.insertRow(-1).insertCell(-1).appendChild(ce("hr"));
    tab.insertRow(-1).insertCell(-1).appendChild(ce("b")).appendChild(document.createTextNode(texts[lib.lang].gui.settings.place.confirmTitle));
    Settings.insertCombo(tab.insertRow(-1).insertCell(-1),"place","okOnPlayer");
    row = tab.insertRow(-1);
    cell = row.insertCell(-1);
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.settings.place.confirmTitleBgColor[0]+" "));
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.settings.place.confirmTitleBgColor[1]+": "));
    input = cell.appendChild(ce("input"));
    input.type = "text";
    input.id = "dsfm_placeConfirmBgAttack";
    input.size = 8;
    input.className = "dsfm_color {required:false}";
    input.value = Settings.colors.place.confirmTitle.attack;
    cell.appendChild(document.createTextNode(" "+texts[lib.lang].gui.settings.place.confirmTitleBgColor[2]+": "));
    input = cell.appendChild(ce("input"));
    input.type = "text";
    input.id = "dsfm_placeConfirmBgSupport";
    input.size = 8;
    input.className = "dsfm_color {required:false}";
    input.value = Settings.colors.place.confirmTitle.support;
  },
  create_hotKeysForm : function() {
    var tab = $("dsfm_hotKeys_tab");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"misc","useHotKeys");
    for( var grp in texts[lib.lang].gui.hotKeyLabels ) {
      var row = tab.insertRow(tab.rows.length);
      var cell = row.appendChild(ce("th"));
      cell.colSpan = 4;
      cell.innerHTML = texts[lib.lang].gui.hotKeyLabels[grp].title;
      for( var hk in texts[lib.lang].gui.hotKeyLabels[grp].hks ) {
        row = tab.insertRow(tab.rows.length);
        cell = row.insertCell(0);
        if( hk.substring(0,5) == "title" ) {
          cell.colSpan = 4;
          cell.innerHTML = texts[lib.lang].gui.hotKeyLabels[grp].hks[hk];
          cell.style.fontWeight = "bold";
        }
        else {
          var input = cell.appendChild(ce("input"));
          input.id = "dsfm_hk_"+grp+"_"+hk;
          input.type = "text";
          input.size = 20;
          input.value = Settings.hotKeys[grp][hk].text;
          input.addEventListener("keypress",Settings.keyPressHandler,false);
          input.addEventListener("keyup",Settings.keyUpHandler,false);
          input.addEventListener("keydown",Settings.keyDownHandler,false);

          input = cell.appendChild(ce("input"));
          input.id = "dsfm_hk_"+grp+"_"+hk+"_modifier";
          input.type = "hidden";
          input.value = Settings.hotKeys[grp][hk].modifier;
          input = cell.appendChild(ce("input"));
          input.id = "dsfm_hk_"+grp+"_"+hk+"_keyCode";
          input.type = "hidden";
          input.value = Settings.hotKeys[grp][hk].keyCode;
          input = cell.appendChild(ce("a"));
          input.href = "javascript:;";
          input.innerHTML = "X";
          input.style.color = "red";
          input.style.fontWeight = "bold";
          input.title = texts[lib.lang].gui.delHotkey;
          input.addEventListener("click",function() { var inputs = this.parentNode.getElementsByTagName("input"); inputs[0].value = ""; input[1].value = 0; input[2].value = 0; }, false);
          cell = row.insertCell(1);
          cell.colSpan = 3;
          cell.innerHTML = texts[lib.lang].gui.hotKeyLabels[grp].hks[hk];
        }
      }
    }
  },
  create_unitsForm : function() {
    var anz = 0;
    for( var key in serverInfo.unitInfo )
      if( serverInfo.unitInfo[key].bit > 0 )
        anz++;
    var tabCfg = $("dsfm_units_tab");
    tabCfg.className="vis";
    tabCfg.style.width = "100%";
    var row = tabCfg.insertRow(tabCfg.rows.length);
    var cell = row.appendChild(ce("th"));
    cell.innerHTML = texts[lib.lang].gui.unitGroups;

    row = tabCfg.insertRow(tabCfg.rows.length);
    cell = row.insertCell(0);
    tab = cell.appendChild(ce("table"));
    tab.id="dsfm_unitgrpconfig";
    tab.style.width = "100%";
    row = tab.insertRow(tab.rows.length);
    cell = row.appendChild(ce("th"));
    cell.innerHTML = texts[lib.lang].gui.priority;
    cell = row.appendChild(ce("th"));
    cell.innerHTML = texts[lib.lang].gui.groupName;
    for( var key in serverInfo.unitInfo ) {
      if( serverInfo.unitInfo[key].bit > 0 && key != "spy") {
        cell = row.appendChild(ce("th"));
        cell.style.textAlign = "center";
        cell.innerHTML = '<img src="graphic/unit/unit_'+key+'.png" alt="'+texts[lib.lang].units[key]+'" title="'+texts[lib.lang].units[key]+'"/>';
      }
    }
    cell = row.appendChild(ce("th"));
    cell.innerHTML = "X";
    cell.style.fontWeight = "bold";
    cell.style.color = "red";
    row = tab.insertRow(tab.rows.length);
    cell = row.insertCell(0);
    cell.colSpan = anz + 3;
    cell.style.textAlign="center";
    input = cell.appendChild(ce("input"));
    input.type = "button";
    input.value = texts[lib.lang].gui.newGroup;
    input.addEventListener("click", function() { var tab = this.parentNode.parentNode.parentNode; Settings.appendGroup(tab,texts[lib.lang].gui.newGroup,0); createPrioLinks(tab,1,1,0); }, false );

    for( var i = 0; i < Settings.farmUnitCfg.groups.length; i++ ) {
      Settings.appendGroup(tab,Settings.farmUnitCfg.groups[i].name,Settings.farmUnitCfg.groups[i].units);
    }
    createPrioLinks(tab,1,1,0);

    row = tabCfg.insertRow(tabCfg.rows.length);
    cell = row.appendChild(ce("th"));
    cell.innerHTML = texts[lib.lang].gui.minUnits;

    row = tabCfg.insertRow(-1);
    cell = row.insertCell(0);
    tab = cell.appendChild(ce("table"));
    tab.id="dsfm_minunits";
    tab.style.width = "100%";
    var rowTitle = tab.insertRow(-1);
    row = tab.insertRow(-1);
    for( var key in Settings.farmUnitCfg.minUnits ) {
      if( key.indexOf("_") == -1 ) {
        cell = rowTitle.appendChild(ce("th"));
        cell.style.textAlign = "center";
        var img = cell.appendChild(ce("img"));
        img.src = "graphic/unit/unit_"+key+".png";
        img.alt = texts[lib.lang].units[key];
        img.title = texts[lib.lang].units[key];
        cell = row.insertCell(row.cells.length);
        cell.style.textAlign = "center";
        input = cell.appendChild(ce("input"));
        input.type = "text";
        input.name=key;
        input.style.width = "30px";
        input.value = Settings.farmUnitCfg.minUnits[key];
      }
    }
    for( var key in Settings.farmUnitCfg.minUnits ) {
      if( key.indexOf("_" ) > -1 ) {
        cell = row.insertCell(row.cells.length);
        cell.style.textAlign = "center";
        input = cell.appendChild(ce("input"));
        input.type = "text";
        input.name=key;
        input.size = 4;
        input.value = Settings.farmUnitCfg.minUnits[key];
        cell = rowTitle.appendChild(ce("th"));
        cell.style.textAlign = "center";
        var units = key.split("_");
        for( var i = 0; i < units.length; i++ ) {
          var img = cell.appendChild(ce("img"));
          img.src = "graphic/unit/unit_"+units[i]+".png";
          img.alt = texts[lib.lang].units[units[i]];
          img.title = texts[lib.lang].units[units[i]];
        }
      }
    }

    row = tabCfg.insertRow(tabCfg.rows.length);
    cell = row.appendChild(ce("th"));
    cell.innerHTML = texts[lib.lang].gui.stayOrderTitle;
    row = tabCfg.insertRow(tabCfg.rows.length);
    cell = row.insertCell(0);
    tab = cell.appendChild(ce("table"));
    tab.id="dsfm_stayNOrder";
    tab.style.width = "100%";
    row = tab.insertRow(tab.rows.length);
    cell = row.appendChild(ce("th"));
    cell.innerHTML = texts[lib.lang].gui.priority;
    cell = row.appendChild(ce("th"));
    cell.innerHTML = texts[lib.lang].gui.unit;
    cell = row.appendChild(ce("th"));
    cell.innerHTML = texts[lib.lang].gui.stayUnits;
    cell = row.appendChild(ce("th"));
    cell.innerHTML = texts[lib.lang].gui.maxTime;
    cell = row.appendChild(ce("th"));
    cell.innerHTML = texts[lib.lang].gui.unitColor;
    cell = row.appendChild(ce("th"));
    cell.innerHTML = texts[lib.lang].gui.unitMax;

    var withload = 1;
    for( var key in Settings.farmUnitCfg.stayNOrder) {
      var idx = tab.rows.length;
      if( serverInfo.unitInfo[key].bit > 0 && serverInfo.unitInfo[key].carry > 0 )
        idx = withload++;
      row = tab.insertRow(idx);
      Settings.createConfigRow(row,key);
    }
    row = tab.insertRow(tab.rows.length);
    Settings.createConfigRow(row,"snob");
    createPrioLinks(tab,1,tab.rows.length-withload,0);
  },
  create_storageForm : function() {
    var tab = $("dsfm_storage_tab");
    tab.insertRow(-1).insertCell(-1).appendChild(ce("b")).appendChild(document.createTextNode(texts[lib.lang].gui.settings.storage.titleHead));
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"storage","titleResColored");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"storage","titleFarmColored");
    tab.insertRow(-1).insertCell(-1).appendChild(ce("b")).appendChild(document.createTextNode(texts[lib.lang].gui.settings.storage.titleCoins));
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"storage","modSnob");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"storage","snobResColored");
    var row = tab.insertRow(-1);
    var cell = row.insertCell(0);
    Settings.createColorEdit("resource",cell);
    row = tab.insertRow(-1);
    cell = row.insertCell(0);
    Settings.createColorEdit("farm",cell);
  },
  create_reportForm : function() {
    var tab = $("dsfm_report_tab");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"report","enableReorder");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"report","showBPs");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"report","showSurvivors");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"report","showLostCost");
  },
  create_miscForm : function() {
    var tab = $("dsfm_misc_tab");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"misc","coordSelector");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"misc","newLineSort");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"misc","navBarSwitcher");
    Settings.insertCombo(tab.insertRow(-1).insertCell(-1),"misc","slSwitcher");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"misc","runTimeToolTips");
    Settings.insertInput(tab.insertRow(-1).insertCell(-1),"misc","rtttDelay",1);
  },
  create_prodForm : function() {
    var tab = $("dsfm_prod_tab");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"prod","runtimeCol");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"prod","runtimeTT");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"prod","resColored");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"prod","farmColored");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"prod","farmTotal");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"prod","removeBuildTime");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"prod","showSums");
    Settings.insertCombo(tab.insertRow(-1).insertCell(-1),"prod","shrinkRecruitmentMode");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"prod","showRecruitSums");
  },
  create_buildAssistForm : function() {
    var tab = $("dsfm_buildAssist_tab");
    var fields = [];
    for( var key in serverInfo.buildingInfo )
      fields.push( { img: "graphic/buildings/" + key.replace("_f", "") + ".png", 
                     title: serverInfo.addBuildingInfo[key].name, 
                     key: key, 
                     minVal: serverInfo.buildingInfo[key].min_level, 
                     maxVal: serverInfo.buildingInfo[key].max_level, 
                     newVal: serverInfo.buildingInfo[key].max_level } );
    var calcedFields = [ {title: texts[lib.lang].gui.points, propName: "points"}, {title:texts[lib.lang].gui.population,propName:"pop"} ];
    Settings.variantEdit.buildAssist = new VariantEdit(tab,fields,"25px","buildAssist",calcedFields,BuildAssist.updateVariantValues);
  },
  create_recruitForm : function() {
    var tab = $("dsfm_recruit_tab");

    Settings.insertCombo(tab.insertRow(-1).insertCell(-1),"recruit","drillQueueMode");
    Settings.insertCombo(tab.insertRow(-1).insertCell(-1),"recruit","shrinkRecruitmentMode");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"recruit","shrinkSmallOnly");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"recruit","showRecruitSums");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"recruit","showRecruitTotal");

    var fields = [];
    for( var key in serverInfo.unitInfo ) {
      if( key != "snob" && key != "knight" && key != "militia" ) {
        fields.push( { img: "graphic/unit/unit_" + key + ".png", 
                       title: texts[lib.lang].units[key],
                       key: key, 
                       minVal: 0, 
                       maxVal: 999999, 
                       newVal: 0 } );
      }
    }
    fields.push( { title: texts[lib.lang].gui.freePop, key: "freePop", minVal: 0 , maxVal: 24000, newVal: 0 } );
    fields.push( { title: texts[lib.lang].resources.wood, key: "keepWood", minVal: 0 , maxVal: 999999, newVal: 0 } );
    fields.push( { title: texts[lib.lang].resources.stone, key: "keepStone", minVal: 0 , maxVal: 999999, newVal: 0 } );
    fields.push( { title: texts[lib.lang].resources.iron, key: "keepIron", minVal: 0 , maxVal: 999999, newVal: 0 } );
    var calcedFields = [ {title:texts[lib.lang].gui.population,propName:"pop"} ];
    Settings.variantEdit.recruAssist = new VariantEdit(tab,fields,"40px","recruAssist",calcedFields,Recruitment.updateVariantValues);
  },
  create_soundsForm : function() {
    var stest = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAANuSURBVHjaXNO9bxtlAMfx3z3P2Wf77MTUzvklidOXNAMgRUqcCqQGMbEwgIqqspS5XVgQ4l9gQJUYKgESExKIDgy8DEBUoENTSOIEpbYDJE5qR+f4bN+de8nd47t77mEoE9/t+wd8pM8+/QQAEAYh/DB4aczYbd/3rzDG0pZpGn/vNdca9cd3K3Pn28+/8CLCMIQQAmEYgHMOGQAkSYIA3g2D4KNCoRDLZDIYj8c46XZnCsXi0kxl7p3Dg/33hRBPADgR53UhRAAAMqUUYcivy5R8vLq6CsYYnKcO8vkpLC4uolFvgHNeVBTli5gsY2JyMgJQOzps3eKcb8myLGeDILizvLSM2nYNRq+HicksEgkFqVQK1eoKEkkFD357AMs0cWl+nnDOq6qqfrO1ufEyYYy9deH8hZnd3V0YhoGZ2VmUyyWUyiWcy+Ww8cfvmL+8gIsXLyESApZlIa4oKBaLlVwuf5tQQl6HBHSOOygWS8hMZJBOp5HNPgdZlqHrXTx6uI6VKytQVRW9kxPk83mEnKM8XX6NJJPJBdseIRaLI5lKQokrSKkqkskUurqO6koVrueCUgpN0+A4DszhEJ12G5Zll2RCaYaxMSRCceYyREKCRGXE4wp2ajV0dR17zSYWLi9A0zTsbNewubkBSihc1x2RwPd9QinGAcfY9xGPx5BOq8jlctA0DV9/9SX+3N7CaGRDSSTAeQTbsjAa2TB6J2uy4zi6VijOJ2IUU+eySCoKLMtGRk3j+o0bgCThr2YDE5OT0HUdnIfwXBeMeX3P9e7IpmU9LE9Pv0IpgWU/xcAaQZvKw/fHcBwJb167BqN3Fel0GsedDjzXg9E7MSMh3qaEdIjv+/e6uh6VymV0e32ISECJybBtG8PhEO0nbXiei8Ggj+PjYwz6xg5j7FVCyH1JkkA459sHrdY9SQhMl4oYe2cwLQu2baPfN2CaQ2haAb/+ch+Dfj80zeHNKIp2wyBAEAQgnuuCc/7eo/X1QyVGUKnMIgo5GGNIqSrm5ubww/ffoVFvoNM5+lAI8TgIApydnsJxHNDq8hKiKHI45z/v7/+z6p6dFVRVhUwp+oaBtZ9+RKNeR/vo8O7IHn1AKRV4JhCSJD3T+N83JIlcbR20bu01m2+EYVjxXM8/PXXqg77xOWPet5RS/L9/BwDYGsraJJa3swAAAABJRU5ErkJggg==';
    document.body.appendChild(ce("audio")).id="dsfm_audio";
    var tab = $("dsfm_sounds_tab");
    
    tab = tab.insertRow(-1).insertCell(-1).appendChild(ce("table"));
    tab.id = "dsfm_sounds_vals";
    var row = tab.insertRow(-1);
    cell = row.appendChild(ce("th"));
    row.appendChild(ce("th")).innerHTML = texts[lib.lang].gui.settings.sounds.url;
    row.appendChild(ce("th")).innerHTML = texts[lib.lang].gui.settings.sounds.volume;
    row.appendChild(ce("th")).innerHTML = texts[lib.lang].gui.settings.sounds.loop;
    
    for( var key in Settings.sounds ) {
      row = tab.insertRow(-1);    
      cell = row.insertCell(-1);
      input = cell.appendChild(ce("input"));
      input.type = "checkbox"
      input.checked = Settings.sounds[key].active;
      cell.appendChild(document.createTextNode(texts[lib.lang].gui.settings.sounds[key]));
      cell = row.insertCell(-1);
      input = cell.appendChild(ce("input"));
      input.type = "text";
      input.value = Settings.sounds[key].url;
      input.size=10;
      input = cell.appendChild(ce("a"));
      input.href = "javascript:;";
      input.appendChild(ce("img")).src = stest;
      input.addEventListener("click",function(e) { var inputs = this.parentNode.parentNode.getElementsByTagName("input"); var audio = new Audio(); audio.src=inputs[1].value; audio.volume = Math.min(parseInt(inputs[2].value)/100,1); audio.play(); }, false );
      cell = row.insertCell(-1);
      input = cell.appendChild(ce("input"));
      input.type = "text";
      input.size = "4";
      input.value = Settings.sounds[key].volume;
      cell = row.insertCell(-1);
      input = cell.appendChild(ce("input"));
      input.type = "checkbox";
      input.checked = Settings.sounds[key].loop;
    }
  },
  insertCheckBox : function(parent,grp,key) {
    var input = parent.appendChild(ce("input"));
    input.type = "checkbox";
    input.id = "dsfm_"+grp+key;
    input.checked = Settings.settings[grp][key];
    parent.appendChild(document.createTextNode(texts[lib.lang].gui.settings[grp][key]));
  },
  insertInput : function(parent,grp,key,size) {
    var input = ce("input");
    input.type = "text";
    input.id = "dsfm_"+grp+key;
    if( size )
      input.size = size;
    input.value = Settings.settings[grp][key];
    if( typeof( texts[lib.lang].gui.settings[grp][key] ) == "string" ) {
      parent.appendChild(document.createTextNode(texts[lib.lang].gui.settings[grp][key]+" "));
      parent.appendChild(input);
    }
    else {
      parent.appendChild(document.createTextNode(texts[lib.lang].gui.settings[grp][key][0]+" "));
      parent.appendChild(input);
      parent.appendChild(document.createTextNode(" " + texts[lib.lang].gui.settings[grp][key][1]));
    }
  },
  insertCheckedInput : function(parent,grp,keyChk,keyVal,size) {
    var input = parent.appendChild(ce("input"));
    input.type = "checkbox";
    input.id = "dsfm_"+grp+keyChk;
    input.checked = Settings.settings[grp][keyChk];
    Settings.insertInput(parent,grp,keyVal,size);
  },
  insertCombo : function(parent,grp,key) {
    parent.appendChild(document.createTextNode(texts[lib.lang].gui.settings[grp][key][0] + ': '));
    var select = parent.appendChild(ce("select"));
    select.id = "dsfm_"+grp+key;
    select.size = 1;
    for( var i = 0; i < texts[lib.lang].gui.settings[grp][key].length-1; i++ )
      select.options[i] = new Option(texts[lib.lang].gui.settings[grp][key][i+1], i, false, false);
    select.value = Settings.settings[grp][key];
  },
  keyDownHandler : function(e) {
    Settings.keyDown = 0;
    if( !(e.keyCode >= 16 && e.keyCode <= 18))
      Settings.keyDown = e.keyCode;
    Settings.keyPress = "";
    //e.stopPropagation();
    //e.preventDefault();
  },
  keyPressHandler : function(e) {
    Settings.keyPress = "";
    if( e.charCode > 0 )
      Settings.keyPress = String.fromCharCode(e.charCode).toUpperCase();
    e.stopPropagation();
    e.preventDefault();
  },
  keyUpHandler : function(e) {
    if( !(e.keyCode >= 16 && e.keyCode <= 18) && e.keyCode == Settings.keyDown ) {
      var mod = HotKeys.getModifierKeys(e);
      var modInput = $(this.id+"_modifier");
      var kcInput = $(this.id+"_keyCode");
      modInput.value = mod.val;
      kcInput.value = e.keyCode;
      if( Settings.keyPress.length == 0 || texts[lib.lang].gui.keys[e.keyCode]) {
        if( texts[lib.lang].gui.keys[e.keyCode] )
          this.value = " [" + mod.text + texts[lib.lang].gui.keys[e.keyCode] +"]";
        else {
          this.value = "";
          modInput.value = 0;
          kcInput.value = 0;
        }
      }
      else
        this.value = " ["+mod.text + Settings.keyPress+"]";
      if( this.value != "0" ) {
        var parts = this.id.split("_");
        for( var hk in Settings.hotKeys[parts[2]] ) {
          if( hk != parts[3] ) {
            var modInputHK = $("dsfm_hk_"+parts[2]+"_"+hk+"_modifier");
            var kcInputHK = $("dsfm_hk_"+parts[2]+"_"+hk+"_keyCode");
            if( modInputHK.value == modInput.value && kcInputHK.value == kcInput.value ) {
              modInputHK.value = 0;
              kcInputHK.value = 0;
              $("dsfm_hk_"+parts[2]+"_"+hk).value = "";
            }
          }
        }
      }
    }
    Settings.keyDown = 0;
    Settings.keyPress = "";
    e.stopPropagation();
    e.preventDefault();
  },
  showTab : function() {
    var tab = this.parentNode.parentNode.parentNode.parentNode;
    var curTab = tab.getElementsByClassName("selected")[0];
    if( curTab )
      curTab = curTab.firstChild;
    if( !curTab || this.id != curTab.id ) {
      if( curTab ) {
        curTab.parentNode.className = "";
        $(curTab.id+"_tab").style.display = "none";
      }
      this.parentNode.className = "selected";
      $(this.id+"_tab").style.display = "";
      lib.storage.setValue("settingsTab"+ownPid,this.id.substr(5));
    }
  },
  showImpExpForm : function(isImport) {
    Settings.impExpPopup.setTitle(texts[lib.lang].gui.title + " - " + (isImport ? texts[lib.lang].gui.importTitle : texts[lib.lang].gui.exportTitle));
    $("dsfm_impexp_report").innerHTML = "";
    $("dsfm_impbtn_row").style.display = isImport ? "" : "none";
    Settings.impExpPopup.show();
  },
  importData : function() {
    var lines = $("dsfm_impexp_report").value.replace(/\r\n/g,"\n").replace(/\n\r/g,"\n").split("\n");
    if( lines[0] == "hpxdsasexp" ) {
      if( parseInt(lines[1].split(".")[0],10) == 1 ) {
        if( lines[2] == lib.server ) {
          if( lines[lines.length-1] != "hpxdsasexp" )
            alert(texts[lib.lang].gui.incompleteExp);
          for( var i = 2; i < lines.length; i++ ) {
            var parts = lines[i].split(":");
            if( parts.length > 1 ) {
              var name = parts[0];
              parts = parts.splice( 1 );
              var value = parts.join(":");
              if( /\d{1,3}_\d{1,3}/.test(name) ) {
                var curVil = new Village(name);
                var impVil = new Village(name,value);
                impVil.fromString(value);
                curVil.merge(impVil);
                curVil.save();
              }
              else if( /^vil\d+$/.test(name) ) {
                var id = name.substring(3);
                var curVil = new MyVillage(id);
                var impVil = new MyVillage(id,value);
                curVil.merge(impVil);
                curVil.save();
              }
              else if( name == "rids" ) {
                var cur = lib.storage.getValue(name,"");
                var imp = value.split(";");
                for( var j = 0; j < imp.length; j++ ) {
                  if( cur.indexOf(imp[j]) == -1 )
                    cur += imp[j]+";";
                }
                lib.storage.setValue(name,cur);
              }
              else
                lib.storage.setString(name,value);
            }
          }
          alert( texts[lib.lang].gui.importDone );
          $("dsfm_impexp_div").style.display="none";
          $("dsfm_shadow_div").style.display="none";
        }
        else
          alert(texts[lib.lang].gui.wrongworld);
      }
      else
        alert( texts[lib.lang].gui.unsupportedVersion );
    }
    else {
      alert( texts[lib.lang].gui.wrongFormat );
    }
  },
  exportData : function() {
    var str = "hpxdsasexp\n"+version+"\n"+lib.server+"\n";
    var inputs = Settings.exportPopup.content.getElementsByTagName("input");
    var re = "";
    var groups = "";
    for( var i = 0;  i < inputs.length - 1; i++ ) {
      if( inputs[i].checked ) {
        if( re.length > 0 )
          re+= "|";
        re += Settings.exportGroups[inputs[i].value];
        groups += inputs[i].value+",";
      }
    }
    lib.storage.setValue("exportGroups"+ownPid,groups);
    Settings.exportPopup.hide();
    var vals = lib.storage.listValues("^"+re+"$");
    for(var i = 0; i < vals.length; i++ )
      str += vals[i]+":"+lib.storage.getString(vals[i])+"\n";
    str += "hpxdsasexp";
    var div = $("dsfm_impexp_div");
    Settings.showImpExpForm(false);
    $("dsfm_impexp_report").value = str;
  },
  save : function() {
    Settings.saveSettings();
    Settings.saveFarmUnitConfig();
    Settings.variantEdit.buildAssist.save();
    Settings.variantEdit.recruAssist.save();
    alert( texts[lib.lang].gui.settingsSaved );
  },
  saveSettings : function() {
    for( var grp in Settings.settings ) {
      if( grp != "hotKeys" ) {
        for( var key in Settings.settings[grp] ) {
          var input = $("dsfm_"+grp+key);
          if( !input ) {
            if( !(grp == "storage" && key == "colors") )
              delete Settings.settings[grp][key];
          }
          else {
            if( input.type == "checkbox" )
              Settings.settings[grp][key] = input.checked;
            else {
              Settings.settings[grp][key] = parseInt(input.value, 10);
              if( isNaN(Settings.settings[grp][key]) )
                Settings.settings[grp][key] = 0;
            }
          }
        }
      }
    }
    var tab = $("dsfm_sounds_vals");
    var row = 1;
    for( var key in Settings.sounds ) {
      if( key != "active" ) {
        var inputs = tab.rows[row++].getElementsByTagName("input");
        Settings.sounds[key].active = inputs[0].checked;
        Settings.sounds[key].url = inputs[1].value;
        Settings.sounds[key].volume = Math.min(parseInt(inputs[2].value,10),100);
        Settings.sounds[key].loop = inputs[3].checked;
      }
    }
    for( var grp in Settings.hotKeys ) {
      for( var hk in Settings.hotKeys[grp] ) {
        var input = $("dsfm_hk_"+grp+"_"+hk);
        if( input ) {
          Settings.hotKeys[grp][hk].text = input.value;
          Settings.hotKeys[grp][hk].keyCode = parseInt($("dsfm_hk_"+grp+"_"+hk+"_keyCode").value,10);
          Settings.hotKeys[grp][hk].modifier = parseInt($("dsfm_hk_"+grp+"_"+hk+"_modifier").value,10);
        }
      }
    }
    Settings.colors.range.defense_cavalry = Settings.colors.range.defense;
    Settings.colors.range.defense_archer = Settings.colors.range.defense;
    lib.storage.setValue("settings"+ownPid,Settings.settings);
    lib.storage.setValue("sounds",Settings.sounds);
    lib.storage.setValue("hotKeys",Settings.hotKeys);
    for( var i = 0; i < 5; i++ ) {
      Settings.colors.place.unitStates[i].border = $("dsfm_placeUnitStateBorder"+i).value;
      Settings.colors.place.unitStates[i].background = $("dsfm_placeUnitStateBg"+i).value;
    }
    Settings.colors.place.confirmTitle.attack = $("dsfm_placeConfirmBgAttack").value;
    Settings.colors.place.confirmTitle.support = $("dsfm_placeConfirmBgSupport").value;
    lib.storage.setValue("colors",Settings.colors);
    var tab = $("dsfm_kataOrder");
    Settings.kataOrder = [];
    for( var i = 2; i < tab.rows.length; i++ ) {
      var input = tab.rows[i].cells[2].firstChild;
      Settings.kataOrder.push( { key: input.value, isTarget: input.checked } );
    }
    lib.storage.setValue("kataOrder"+ownPid,Settings.kataOrder);
  },
  loadFarmUnitConfig : function() {
    var farmUnitCfg = lib.storage.getValue("farmUnitCfg"+ownPid);
    if( !farmUnitCfg ) {
      var defGraphMax = { spear: 5000, sword: 5000, axe: 5000, archer: 5000, spy: 500, light: 3000, marcher:  500, heavy: 1000,  ram: 300, catapult:  200, knight: 1, snob: 4 };
      farmUnitCfg = { groups: [], minUnits: {}, stayNOrder: {}, graphMax: {} };
      var bits = 0;
      for( var key in serverInfo.unitInfo )
        bits |= serverInfo.unitInfo[key].bit;
      farmUnitCfg.groups.push( { name: texts[lib.lang].gui.all, units: bits } );

      var units = [];
      for( var key in serverInfo.unitInfo ) {
        if( serverInfo.unitInfo[key].bit > 0 )
          units.push( { name: key, speed: serverInfo.unitInfo[key].speed, carry: serverInfo.unitInfo[key].carry } );
        farmUnitCfg.graphMax[key] = defGraphMax[key];
      }
      var speed = 0;
      var key = "";
      units.sort( function(a,b) { return b.speed-a.speed; } );
      for( var i = 0; i < units.length; i++ ) {
        if( speed != units[i].speed ) {
          if( speed > 0 )
            farmUnitCfg.minUnits[key] = 0;
          speed = units[i].speed;
          key = "";
        }
        if( key.length > 0 )
          key += "_";
        key += units[i].name;
        farmUnitCfg.minUnits[units[i].name] = 0;
      }
      if( key.indexOf("_") > -1 )
        farmUnitCfg.minUnits[key] = 0;
      for( i = 0; i < units.length; i++ )
        farmUnitCfg.stayNOrder[units[i].name] = { stay: 0, maxTime: 0 };
    }
    if( farmUnitCfg.minUnits.spy == 0 )
      farmUnitCfg.minUnits.spy = 1;
    return farmUnitCfg;
  },
  saveFarmUnitConfig : function() {
    var tab = $("dsfm_unitgrpconfig");
    Settings.farmUnitCfg = { groups: [], minUnits: {}, stayNOrder: {}, graphMax: {} };
    for( var i = 1; i < tab.rows.length-1; i++ ) {
      var units = 0;
      for( var c = 2; c < tab.rows[i].cells.length-1; c++ ) {
        var chk = tab.rows[i].cells[c].firstChild;
        if( chk.checked )
          units |= parseInt(chk.value,10);
      }
      if( serverInfo.unitInfo.spy )
        units |= serverInfo.unitInfo.spy.bit;
      Settings.farmUnitCfg.groups.push( { name: tab.rows[i].cells[1].firstChild.value.replace(/\\/g, "\\\\") .replace(/"/g,"\\\""), units: units } );
    }
    tab = $("dsfm_minunits");
    for( var i = 0; i < tab.rows[1].cells.length; i++ ) {
      var input = tab.rows[1].cells[i].firstChild;
      var val = parseInt(input.value,10);
      if( isNaN(val) )
        val = 0;
      Settings.farmUnitCfg.minUnits[input.name] = val;
    }
    tab = $("dsfm_stayNOrder");
    for( var i = 1; i < tab.rows.length; i++ ) {
      var input = tab.rows[i].cells[2].firstChild;
      if( input ) {
        var stay = parseInt(input.value,10);
        if( isNaN(stay) )
          stay = 0;
      }
      input = tab.rows[i].cells[3].firstChild;
      if( input ) {
        var maxTime = 0;
        var parts = input.value.split(":");
        maxTime = parseInt(parts[0],10)*60;
        maxTime += parseInt(parts[1],10);
        if( isNaN(maxTime) )
          maxTime = 0;
        Settings.farmUnitCfg.stayNOrder[input.name] = { stay: stay, maxTime: maxTime }
      }
      var inputCol = tab.rows[i].cells[4].firstChild;
      var inputMax = tab.rows[i].cells[5].firstChild;
      Settings.farmUnitCfg.graphMax[inputCol.name] = parseInt(inputMax.value,10);
      Settings.colors.units[inputCol.name] = inputCol.value;
    }
    lib.storage.setValue("farmUnitCfg"+ownPid,Settings.farmUnitCfg);
  },
  createConfigRow : function(row,key) {
    var cell = row.insertCell(row.cells.length);
    cell = row.insertCell(row.cells.length);
    var img = cell.appendChild(ce("img"));
    img.src = "graphic/unit/unit_"+key+".png";
    img.alt = texts[lib.lang].units[key];
    img.title = texts[lib.lang].units[key];
    cell.appendChild(document.createTextNode(texts[lib.lang].units[key]));
    cell = row.insertCell(row.cells.length);
    if( Settings.farmUnitCfg.stayNOrder[key] ) {
      input = cell.appendChild(ce("input"));
      input.name = key;
      input.type = "text";
      input.size = 4;
      input.value = Settings.farmUnitCfg.stayNOrder[key].stay;
    }
    cell = row.insertCell(row.cells.length);
    if( Settings.farmUnitCfg.stayNOrder[key] ) {
      input = cell.appendChild(ce("input"));
      input.name = key;
      input.type = "text";
      input.size = 4;
      var val = "";
      if( Settings.farmUnitCfg.stayNOrder[key].maxTime > 0 ) {
        var h = Math.floor(Settings.farmUnitCfg.stayNOrder[key].maxTime / 60);
        var min = Settings.farmUnitCfg.stayNOrder[key].maxTime % 60;
        val = h + ":" + (min<10?"0":"")+min;
      }
      input.value = val;
      input.addEventListener("change",Settings.maxTimeChanged,false);
    }

    cell = row.insertCell(row.cells.length);
    input = cell.appendChild(ce("input"));
    input.name = key;
    input.type = "text";
    input.size = 8;
    input.value = Settings.colors.units[key];
    input.className = "dsfm_color";

    cell = row.insertCell(row.cells.length);
    input = cell.appendChild(ce("input"));
    input.name = key;
    input.type = "text";
    input.size = 4;
    input.value = Settings.farmUnitCfg.graphMax[key];
  },
  maxTimeChanged : function() {
    var parts = this.value.split(":");
    var maxTime = 0;
    if( parts.length == 1 )
      maxTime = parseInt(parts[0],10);
    else {
      maxTime = parseInt(parts[0],10)*60;
      maxTime += parseInt(parts[1],10);
    }
    if( isNaN(maxTime) || maxTime < 0 )
      maxTime = 0;
    if( maxTime > 0 ) {
      var h = Math.floor(maxTime / 60);
      var min = maxTime % 60;
      this.value = h + ":" + (min<10?"0":"")+min;
    }
    else
      this.value = "";
  },
  createColorEdit : function(type,parent) {
    var tab = parent.appendChild(ce("table"));
    var row = tab.insertRow(-1);
    var cell = row.insertCell(0);
    cell.innerHTML = '<b>'+texts[lib.lang].gui.settings.colRangeTitle[type] +'</b>';
    row = tab.insertRow(-1);
    cell = row.insertCell(0);

    var input = cell.appendChild(ce("input"));
    input.type = "checkbox";
    input.id = "dsfm_"+type+"_floating";
    input.checked = Settings.colors.range[type][0];
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.colFloating));
    input.addEventListener("click", function(e) { Settings.colors.range[type][0] = e.target.checked; Settings.updateColorBar(type); }, false);
    row = tab.insertRow(-1);
    var colTab = row.insertCell(0).appendChild(ce("table"));
    colTab.id = "dsfm_color_tab_"+type;
    row = colTab.insertRow(-1);
    row.appendChild(ce("th")).innerHTML = texts[lib.lang].gui.colorEditTitles[0];
    row.appendChild(ce("th")).innerHTML = texts[lib.lang].gui.colorEditTitles[1];
    cell = row.appendChild(ce("th"));
    cell.innerHTML = "+";
    cell.style.color = "#009900";
    cell.style.fontWeight = "bold";
    cell = row.appendChild(ce("th"));
    cell.innerHTML = "X";
    cell.style.color = "#FF0000";
    cell.style.fontWeight = "bold";

    for( var i = 1; i < Settings.colors.range[type].length; i++ )
      Settings.insertColorRow(type,colTab,i);

    row = tab.insertRow(-1);
    colTab = row.insertCell(0).appendChild(ce("table"));
    colTab.setAttribute( "cellspacing", 0 );
    colTab.setAttribute( "cellpadding", 0 );
    colTab.id = "dsfm_colorbar_"+type;
    colTab.style.border = "1px solid #804000";
    colTab.style.borderSpacing = "0";
    row = colTab.insertRow(0);
    row.style.height = "20px";
    for( var i = 0; i <= 100; i++ ) {
      cell = row.insertCell(i);
      cell.style.padding = "0px";
      cell.innerHTML = "&sdot;";
      cell.style.fontSize = "small";
      cell.style.fontWeight = "bold";
      Storage.getColors(type,i,cell);
    }
  },
  insertColorRow : function(type,tab,i) {
    var row = tab.insertRow(i);
    cell = row.insertCell(0);
    cell.innerHTML = Settings.colors.range[type][i].val;
    cell.style.textAlign = "right";
    input = row.insertCell(1).appendChild(ce("input"));
    input.size = "7";
    input.value = Settings.colors.range[type][i].color;
    input.color = new ColorPicker(input);
    input.addEventListener("change", Settings.colorChanged, false);
    cell = row.insertCell(2);
    if( i < Settings.colors.range[type].length - 1 && Settings.colors.range[type][i].val < Settings.colors.range[type][i+1].val - 1) {
      var a = cell.appendChild(ce("a"));
      a.href = "javascript:;";
      a.innerHTML = "+";
      a.style.color = "#009900";
      a.style.fontWeight = "bold";
      a.title = texts[lib.lang].gui.insert;
      a.addEventListener("click", Settings.addColor, false );
    }
    cell = row.insertCell(3);
    if( i > 1 && i < Settings.colors.range[type].length - 1 ) {
      var a = cell.appendChild(ce("a"));
      a.href = "javascript:;";
      a.innerHTML = "X";
      a.style.color = "#FF0000";
      a.style.fontWeight = "bold";
      a.title = texts[lib.lang].gui.remove;
      a.addEventListener("click", Settings.removeColor, false );
    }
  },
  colorChanged : function(e) {
    var type = getByTagName(this,"table","parentNode").id.split("_")[3];
    Settings.colors.range[type][e.target.parentNode.parentNode.rowIndex].color = e.target.value;
    Settings.updateColorBar(type);
  },
  addColor : function(e) {
    var type = getByTagName(this,"table","parentNode").id.split("_")[3];
    var row = e.target.parentNode.parentNode;
    var min = parseInt(row.cells[0].innerHTML,10)+1;
    var max = parseInt(row.nextSibling.cells[0].innerHTML,10)-1;
    var val = 0;
    while( isNaN(val) || val < min || val > max ) {
      val = prompt(texts[lib.lang].gui.promptPercent + " (" + min + " - " + max + ")", Math.round(min + (max-min) / 2));
      if( val ===  null )
        return
      val = parseInt(val,10);
    }
    var idx = row.rowIndex+1;
    var colMin = new Color(row.cells[1].firstChild.value);
    var colMax = new Color(row.nextSibling.cells[1].firstChild.value);
    var p = (val-min)/(max-min);
    var color = colMin.fadeTo(p,colMax).toString();
    Settings.colors.range[type].splice(idx,0, {val: val, color: color} );
    Settings.insertColorRow(type,row.parentNode,idx);
    Settings.updateColorBar(type);
  },
  removeColor : function(e) {
    var type = getByTagName(this,"table","parentNode").id.split("_")[3];
    var row = e.target.parentNode.parentNode;
    Settings.colors.range[type].splice(row.rowIndex,1);
    row.parentNode.removeChild(row);
    Settings.updateColorBar(type);
  },
  updateColorBar : function(type) {
    Storage.colors[type] = [];
    var tab = $("dsfm_colorbar_"+type);
    for( var i = 0; i <= 100; i++ )
      Storage.getColors(type,i,tab.rows[0].cells[i]);
  },
  appendGroup : function(tab,name,units) {
    var row = tab.insertRow(tab.rows.length-1);
    var cell = row.insertCell(0);
    cell = row.insertCell(1);
    var input = cell.appendChild(ce("input"));
    input.type = "text";
    input.length = 10;
    input.value = name;

    for( var key in serverInfo.unitInfo ) {
      if( serverInfo.unitInfo[key].bit > 0 && key != "spy") {
        cell = row.insertCell(row.cells.length);
        cell.style.textAlign = "center";
        input = cell.appendChild(ce("input"));
        input.type = "checkbox";
        input.checked = (units & serverInfo.unitInfo[key].bit) > 0;
        input.value = serverInfo.unitInfo[key].bit;
      }
    }
    cell = row.insertCell(row.cells.length);
    input = cell.appendChild(ce("a"));
    input.innerHTML = "X";
    input.style.fontWeight = "bold";
    input.style.color = "red";
    input.href = "javascript:;";
    input.title = texts[lib.lang].gui.delGroup;
    input.addEventListener( "click", function() { var tab = this.parentNode.parentNode.parentNode; tab.removeChild(this.parentNode.parentNode); createPrioLinks(tab,1,1,0); }, false );
  },
  getPointsAndNames : function() {
    var total = /&total/.test(document.location);
    try {
      var tab = document.getElementsByClassName("vis")[1];
      var addBuildingInfo = {}
      for( var i = 1; i < tab.rows[0].cells.length; i++ ) {
        var building = tab.rows[0].cells[i].innerHTML.match(/\?building=([^']+)/)[1];
        var title = tab.rows[0].cells[i].innerHTML.match(/title="([^"]+)/)[1];
        addBuildingInfo[building] = {};
        addBuildingInfo[building].name = title;
        addBuildingInfo[building].points = [0];
        for( var j = 1; j < tab.rows.length; j++ ) {
          var val = parseInt(tab.rows[j].cells[i].innerHTML,10);
          if( isNaN(val) )
            break;
          if( !total )
            val += addBuildingInfo[building].points[j-1];
          addBuildingInfo[building].points.push(val);
        }
      }
    }
    catch(e) {
      alert( texts[lib.lang].gui.getPointsError );
    }
    return addBuildingInfo;
  },
  getVariantIdxById : function(key,id) {
    for( var i = 0; i < Settings[key].variants.length; i++ )
      if( Settings[key].variants[i].id == id )
        return i;
    return -1;
  },
}
var Place = {
  katasNeeded : { destroy: [0,2,6,10,15,21,28,36,45,56,68,82,98,115,136,159,185,215,248,286,328,376,430,490,558,634,720,815,922,1041,1175],
                  reduce: [0,2,2,3,4,4,4,4,4,4,4,4,5,5,6,6,6,7,8,8,9,10,10,11,12,13,15,16,17,19,20] },
  ramsNeeded : { destroy: [0,2,4,7,10,14,19,24,30,37,46,55,65,77,91,106,124,143,166,191,219],
                 reduce: [0,2,2,2,2,2,2,2,2,3,3,3,3,4,4,4,4,5,5,6,6] },
  placeSubmits : [],
  farmlist : [],
  userLoad : false,
  village : null,
  placeX : Number.NaN,
  placeY : Number.NaN,
  dist : Number.NaN,
  fs : 0,
  groupInfo : null,
  curFarmDist : 0,
  duration : 0,
  capture: null,
  runtime: null,
  arrivalTime: null,
  returnTime: null,
  showNightbonus: false,
  farmlistSort : 0,

  doIt : function() {
    if( lib.params.screen == "place" ) {
      switch(lib.params.get("mode","command")) {
        case "command":
          if( $("inputx") )
            Place.initPlace();
          else if( lib.params["try"] == "confirm" )
            Place.initConfirm();
          break;
        case "units":
          Place.modUnits();
          break;
        case "neighbor":
          Place.modNeighbor();
          break;
      }
    }
  },
  initPlace : function() {
    Place.showNightbonus = true;
    Place.userLoad = false;
    Place.loadFarmList();
    cleanUp();
    var e = $("units_form");
    var input = e.parentNode.getElementsByTagName("input");
    units = { };
    for( var i = 0; i < input.length; i++ ) {
      if( input[i].className=="unitsInput" ) {
        //input[i].id = "dsfm_"+input[i].name;
        input[i].parentNode.className="nowrap";
        input[i].addEventListener("keyup", Place.updatePlace, false );
        var chk = ce("input");
        chk.type="checkbox";
        chk.id="dsfm_"+input[i].name+"_use";
        chk.value = serverInfo.unitInfo[input[i].name].bit;
        chk.disabled = input[i].parentNode.textContent.match(/\((\d+)\)/)[1] == 0;
        if( chk.disabled ) {
          input[i].style.backgroundColor = Settings.colors.place.unitStates[0].background;
          if( Settings.colors.place.unitStates[0].border )
            input[i].style.border = "1px solid "+Settings.colors.place.unitStates[0].border;
        }
        chk.addEventListener("click", Place.checkUnits, false );
        input[i].parentNode.insertBefore(chk,input[i]);
        i++; // Die eingefügte Checkbox ist direkt in input[] vorhanden und ist am aktuellen index, also überspringen, damit wir wieder auf dem Eingabefeld sind
      }
      else if( input[i].name == "attack" ) {
        Place.placeSubmits[0] = input[i];
        input[i].value = input[i].value + HotKeys.add( "place", "attack", function(e,mod) { Place.placeSubmits[0].click(); } );
      }
      else if( input[i].name == "support" ) {
        Place.placeSubmits[1] = input[i];
        input[i].value = input[i].value + HotKeys.add( "place", "support", function(e,mod) { Place.placeSubmits[1].click(); } );
        var row = input[i].parentNode.parentNode;
        var cell = row.insertCell(row.cells.length);
        var a = cell.appendChild(ce("a"));
        a.style.display = "none";
        a.href = "javascript:;";
        a.id = "dsfm_enableattack";
        a.addEventListener("click", Place.enableAttack, false );
        a.innerHTML = "&raquo; "+ texts[lib.lang].gui.enableAttack + HotKeys.add( "place", "enableAttack", "dsfm_enableattack", "click" );
      }
    }
    
    if( lib.params.get("target",0) == 0 && lib.params.get("x",-1)>-1 ) {
      $("inputx").value = lib.params.x;
      $("inputy").value = lib.params.y;
    }
    
    var tab = e.parentNode.insertBefore(ce("table"),e.nextSibling);
    tab.id = "dsfm_tab";
    tab.style.border = "1px solid rgb(222, 211, 185)";
    tab.className="nowrap";
    tab.style.width = "630px";
    var row = tab.insertRow(tab.rows.length);
    var cell = row.appendChild(ce("th"));
    cell.colSpan = 5;
    cell.innerHTML = texts[lib.lang].gui.title;
    row = tab.insertRow(tab.rows.length);
    if( Settings.settings.place.showCarry ) {
      cell = row.insertCell(0);
      cell.innerHTML = texts[lib.lang].gui.capture +":";
      Place.capture = row.insertCell(1);
    }
    if( Settings.settings.place.showRunTime ) {
      row = tab.insertRow(tab.rows.length);
      cell = row.insertCell(0);
      cell.innerHTML = texts[lib.lang].gui.runtime + ":";
      Place.runtime = row.insertCell(1);
    }
    if( Settings.settings.place.showArrivalTime ) {
      row = tab.insertRow(tab.rows.length);
      cell = row.insertCell(0);
      cell.innerHTML = texts[lib.lang].gui.arrival + ":";
      Place.arrivalTime = row.insertCell(1);
      Place.arrivalTime.colSpan = 2;
    }
    row = tab.insertRow(tab.rows.length);
    row.id = "dsfm_row_ress";
    row.style.display = "none";
    cell = row.insertCell(0);
    cell.innerHTML = '<span id="dsfm_title"></span><br/><span style="display:none; font-size:xx-small;" id="dsfm_resources_age"></span>';
    cell = row.insertCell(1);
    cell.colSpan = 3;
    var html = '<table cellspacing="0" cellpadding="0"><tr><td><img src="graphic/holz.png" style="border: 0 none;" alt="'+texts[lib.lang].resources.wood+'" title="'+texts[lib.lang].resources.wood+'"/></td><td id="dsfm_wood" style="padding-right:20px; font-weight:bold;"></td>';
    html += '<td><img src="graphic/lehm.png" style="border: 0 none;" alt="'+texts[lib.lang].resources.stone+'" title="'+texts[lib.lang].resources.stone+'"/></td><td id="dsfm_stone" style="padding-right:20px; font-weight:bold;"></td>';
    html += '<td><img src="graphic/eisen.png" style="border: 0 none;" alt="'+texts[lib.lang].resources.iron+'" title="'+texts[lib.lang].resources.iron+'"/></td><td id="dsfm_iron" style="padding-right:20px; font-weight:bold;"></td>';
    html += '<td><img src="graphic/res.png" style="border: 0 none;" alt="'+texts[lib.lang].gui.sum+'" title="'+texts[lib.lang].gui.sum+'"/></td><td style="padding-right: 20px; font-weight:bold;"><span id="dsfm_cur_load"></span> / <span id="dsfm_sum"></span></td>';
    html += '<td style="font-weight: bold;"><span title="'+texts[lib.lang].gui.quotient+'">&#216; </span><span id="dsfm_eq"></span>%</td></tr></table>';
    cell.innerHTML = html;
    row = tab.insertRow(tab.rows.length);
    row.id = "dsfm_row_unitsin";
    row.style.display = "none";
    cell = row.insertCell(0);
    cell.innerHTML = texts[lib.lang].gui.unitsin+':<br/><span style="display:none; font-size:xx-small;" id="dsfm_unitsin_age"></span>';
    cell = row.insertCell(1);
    cell.colSpan=4;
    cell.id = "dsfm_unitsin";
    row = tab.insertRow(tab.rows.length);
    row.id = "dsfm_row_unitsout";
    row.style.display = "none";
    cell = row.insertCell(0);
    cell.innerHTML = texts[lib.lang].gui.unitsout+':<br/><span style="display:none; font-size:xx-small;" id="dsfm_unitsout_age"></span>';
    cell = row.insertCell(1);
    cell.colSpan=4;
    cell.id = "dsfm_unitsout";
    row = tab.insertRow(tab.rows.length);
    row.id = "dsfm_row_buildings";
    row.style.display = "none";
    cell = row.insertCell(0);
    cell.innerHTML = texts[lib.lang].gui.buildings+':<br/><span style="display:none; font-size:xx-small;" id="dsfm_buildings_age"></span>';;
    cell = row.insertCell(1);
    cell.colSpan=4;
    cell.id = "dsfm_buildings";
    row = tab.insertRow(tab.rows.length);
    cell = row.insertCell(0);
    cell.innerHTML = texts[lib.lang].gui.load+":";
    cell = row.insertCell(1);
    cell.colSpan=2;

    input = cell.appendChild(ce("input"));
    input.id = "dsfm_load";
    input.size = 5;
    input.value = Settings.settings.place.noReportLoad;
    input.addEventListener("keydown", function() { if( this.value.length > 0 ) {Place.userLoad=true}else {Place.userLoad=false; Place.updatePlace(); }}, false );
    input = cell.appendChild( ce("input"));
    input.type = "checkbox";
    input.id = "dsfm_useeq";
    input.checked = useeq;
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.usequotient + HotKeys.add("place", "eq", "dsfm_useeq", "click")));
    input.addEventListener("click", function() { useeq = this.checked; lib.storage.setValue( "useeq"+ownPid, useeq ); Place.loadFarmList(); Place.updateTarget(true); var chk = $("dsfm_fl_useeq"); if(chk) chk.checked = useeq; if( $("inline_popup").style.display == "block" ) Place.showFarmList(); }, false );
    row = tab.insertRow(tab.rows.length);
    cell = row.insertCell(0);
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.unitSelect[0] + HotKeys.add("place","unitSelect", function() { var sel = $("dsfm_unitSelect"); var val = parseInt(sel.value,10) + 1; if( val >= sel.options.length ) val = 0; sel.value = val; Place.onUnitSelectChanged();} ) + ": "));
    cell = row.insertCell(1);

    input = cell.appendChild(ce("select"));
    input.size = 1;
    input.id = "dsfm_unitSelect";
    input.options[0] = new Option(texts[lib.lang].gui.unitSelect[1],0,false,false);
    input.options[1] = new Option(texts[lib.lang].gui.unitSelect[2],1,false,false);
    for( var i = 0; i < Settings.farmUnitCfg.groups.length; i++ )
      input.options[i+2] = new Option(Settings.farmUnitCfg.groups[i].name,i+2,false,false);
    input.addEventListener("change", Place.onUnitSelectChanged, false );
    input.value = lib.storage.getValue("unitSelect"+ownPid, 0);
    cell.appendChild(ce("span")).id = "dsfm_selectInfo";
    row = tab.insertRow(tab.rows.length);
    cell = row.insertCell(0);
    var a = cell.appendChild(ce("a"));
    a.innerHTML = "&raquo; " + texts[lib.lang].gui.insertunits + HotKeys.add( "place", "insertUnits", Place.insertUnits );
    a.style.fontWeight = "bold";
    a.style.color = "grey";
    a.id = "dsfm_insertUnits";
    a.addEventListener("click", Place.insertUnits, false );
    cell = row.insertCell(1);
    a = cell.appendChild(ce("a"));
    a.href = "javascript:;";
    a.id = "dsfm_getatts";
    html = "&raquo; " + texts[lib.lang].gui.getatts;
    html += HotKeys.add( "place", "getAtts", OV.getAtts );
    a.innerHTML = html;
    a.addEventListener("click", OV.getAtts, false );
    cell = row.insertCell(2);
    a = cell.appendChild(ce("a"));
    a.id = "dsfm_show_list";
    html = "&raquo; " + texts[lib.lang].gui.farmlist + HotKeys.add( "place", "farmList", Place.showFarmList );
    if( Settings.settings.misc.useHotKeys ) {
      HotKeys.add( "common", "close", function(e,mod) { $("inline_popup").style.display = "none"; } );
      for( var i = 0; i < 10; i++ ) {
        HotKeys.add( i+48, 0, function(e,mod) { var idx = e.which == 48 ? 9 : e.which - 49; if( Place.farmlist[idx] ) Place.selectTarget(Place.farmlist[idx]["dst"]["x"]+"|"+Place.farmlist[idx]["dst"]["y"]);} );
        HotKeys.add( i+96, 0, function(e,mod) { var idx = e.which == 96 ? 9 : e.which - 97; if( Place.farmlist[idx] ) Place.selectTarget(Place.farmlist[idx]["dst"]["x"]+"|"+Place.farmlist[idx]["dst"]["y"]);} );
      }
    }
    a.innerHTML = html;
    a.href = "javascript:;";
    a.addEventListener("click", Place.showFarmList, false );

    a = e.parentNode.getElementsByTagName("a");
    for( var i = 0; i < a.length; i++ ) {
      if( /insertUnit/.test(a[i].href) )
        a[i].addEventListener("click", function() { window.setTimeout( Place.updatePlace, 100 ); }, false);
    }
    a = $("selectAllUnits");
    var txt;
    txt = HotKeys.add( "place", "allUnits", function() { win.selectAllUnits(true); } );
    a.innerHTML += txt;

    setInterval( Place.updateTarget, 1000 );

    $("units_form").addEventListener("submit",Place.saveLast,false);
    var td = a.parentNode.parentNode.insertCell(-1);
    td.valign = "top";
    var a = td.appendChild(ce("a"));
    a.href = "javascript:;";
    a.id = "dsfm_lastTarget";
    a.innerHTML = "&raquo; " + texts[lib.lang].gui.lastTarget + HotKeys.add( "place", "lastTarget", Place.insertLastTarget );
    a.addEventListener("click", Place.insertLastTarget, false);
    td = td.parentNode.insertCell(-1);
    a = td.appendChild(ce("a"));
    a.href = "javascript:;";
    a.id = "dsfm_lastUnits";
    a.innerHTML = "&raquo; " + texts[lib.lang].gui.lastUnits + HotKeys.add( "place", "lastUnits", Place.insertLastUnits );
    a.addEventListener("click", Place.insertLastUnits, false);
    Place.updateTarget();
  },
  saveLast : function(e) {
    var data = { x: $("inputx").value, y: $("inputy").value };
    var input = document.getElementsByClassName("unitsInput");
    var units = 0;
    for( var i = 0; i < input.length; i++ ) {
      var key = input[i].id.substring(5);
      var val = parseInt(input[i].value,10);
      if( !isNaN(val) )
        units += val;
      data[key] = val;
    }
    if( !isNaN(data.x) && !isNaN(data.y) && units > 0 ) {
      lib.storage.setValue("lastcmd"+ownPid, data);
      return true;
    }
    else {
      e.preventDefault();
      return false;
    }
  },
  insertLastTarget : function(e) {
    var last = lib.storage.getValue("lastcmd"+ownPid);
    if( last ) {
      var x = $("inputx");
      var y = $("inputy");
      x.value = last.x;
      y.value = last.y;
    }
  },
  insertLastUnits : function(e) {
    var last = lib.storage.getValue("lastcmd"+ownPid);
    if( last ) {
      var input = document.getElementsByClassName("unitsInput");
      for( var i = 0; i < input.length; i++ ) {
        var key = input[i].id.substring(5);
        var max = input[i].parentNode.textContent.match(/\((\d+)\)/)[1];
        var count = isNaN(last[key])?"":last[key];
        if( count > max )
          count = max;
        input[i].value = count;
      }
    }
  },
  onUnitSelectChanged : function() {
    var val = $("dsfm_unitSelect").value;
    lib.storage.setValue("unitSelect"+ownPid,parseInt(val,10));
    if( !isNaN(Place.placeX) && ! isNaN(Place.placeY) )
      Place.findUnitGroup();
  },
  findUnitGroup : function() {
    var mode = lib.storage.getValue("unitSelect"+ownPid, 0);
    Place.groupInfo = { idx: 0, load: -1, units: {}, maxTime: 0 };
    var infoText = "";
    switch( mode ) {
      case 0: // Auto
        for( var i = 0; i < Settings.farmUnitCfg.groups.length; i++ ) {
          curgrp = Place.getGroupUnits(i);
          if( curgrp.load >= Settings.settings.place.incRangeRes ) {
            Place.groupInfo = curgrp;
            break;
          }
          if( curgrp.load > Place.groupInfo.load )
            Place.groupInfo = curgrp;
        }
        infoText = texts[lib.lang].gui.unitGroup + ": " + Settings.farmUnitCfg.groups[Place.groupInfo.idx].name;
        if( Place.groupInfo.cataTarget != "" )
          infoText += ", ";
        break;
      case 1: // Manuell
        Place.groupInfo = Place.getGroupUnits(-1,lib.storage.getValue("checkedunits"+ownPid,0));
        break;
      default: // Gruppe
        Place.groupInfo = Place.getGroupUnits(parseInt($("dsfm_unitSelect").value)-2);
        break;
    }
    if( Place.groupInfo.cataTarget != "" )
      infoText += texts[lib.lang].gui.cataTarget+ ": " + serverInfo.addBuildingInfo[Place.groupInfo.cataTarget].name;
    $("dsfm_selectInfo").innerHTML = " " + infoText;
    Place.markUnitFields();
  },
  getGroupUnits : function(idx) {
    // State: 0 => keine da;  1 => benutzen, 2 => zu wenig, 3 => zu lang unterwegs,  4  nicht in gruppe, 5 nicht benötigt
    var slowest = 0;
    var groupInfo = { idx: idx, load: 0, units: {}, cataTarget: "" };
    var units;
    if( idx > -1 )
      units = Settings.farmUnitCfg.groups[idx].units;
    else if( arguments.length == 1 ) {
      units = 0;
      for( var key in serverInfo.unitInfo ) {
        var chk = $("dsfm_"+key+"_use");
        if( chk && chk.checked )
          units |= serverInfo.unitInfo[key].bit;
      }
      lib.storage.setValue("checkedunits"+ownPid,units);
    }
    else {
      units = arguments[1];
    }

    for( var key in Settings.farmUnitCfg.stayNOrder ) {
      groupInfo.units[key] = { count: $("unit_input_"+key).parentNode.textContent.match(/\((\d+)\)/)[1], used: 0, state: 0 };
      if( groupInfo.units[key].count > 0 ) {
        if( (units & serverInfo.unitInfo[key].bit) > 0 ) {
          if( idx > -1 ) {
            if( Settings.farmUnitCfg.stayNOrder[key] ) {
              groupInfo.units[key].count -= Settings.farmUnitCfg.stayNOrder[key].stay;
              if( groupInfo.units[key].count <= 0 ) {
                groupInfo.units[key].count = 0;
                groupInfo.units[key].used = 0;
                groupInfo.units[key].state = 2;
              }
              else if( Settings.farmUnitCfg.stayNOrder[key].maxTime > 0 && Settings.farmUnitCfg.stayNOrder[key].maxTime * 60 <= serverInfo.unitInfo[key].speed * Place.fs ) {
                groupInfo.units[key].used = 0;
                groupInfo.units[key].state = 3;
              }
              else {
                groupInfo.units[key].state = 1;
                groupInfo.units[key].used = 0;
              }
            }
          }
          else {
            groupInfo.units[key].state = 1;
            groupInfo.units[key].used = 0;
          }
        }
        else {
          if( serverInfo.unitInfo[key].bit > 0 ) {
            groupInfo.units[key].state = 4;
          }
        }
      }
    }
    if( Place.village.buildings.timestamp > 0 ) {
      if(groupInfo.units.ram.state == 1) {
        if((idx == -1 || Place.village.buildings.wall.level >= Settings.settings.place.minRamWall) &&
           (idx == -1 || Settings.farmUnitCfg.stayNOrder.ram.maxTime == 0 || Settings.farmUnitCfg.stayNOrder.ram.maxTime * 60 >= Place.fs * serverInfo.unitInfo.ram.speed)) {
          if( groupInfo.units.ram.count >= Place.ramsNeeded.reduce[Place.village.buildings.wall.level] &&
              (idx == -1 || !Settings.settings.place.minRamsNeeded || groupInfo.units.ram.count >= Place.ramsNeeded.destroy[Place.village.buildings.wall.level]) )
            groupInfo.units.ram.used = Math.min(groupInfo.units.ram.count, Place.ramsNeeded.destroy[Place.village.buildings.wall.level]);
          else {
            groupInfo.units.ram.used = 0;
            groupInfo.units.ram.state = 2;
          }
        }
        else {
          groupInfo.units.ram.used = 0;
          groupInfo.units.ram.state = 5;
        }
      }

      var minKatas = false;
      if(groupInfo.units.catapult.state == 1) {
        for( var i = 0; i < Settings.kataOrder.length; i++ ) {
          if( Settings.kataOrder[i].isTarget ) {
            var key = Settings.kataOrder[i].key;
            if( (Place.village.buildings[key].level > serverInfo.buildingInfo[key].min_level) && ((idx == -1 || Place.village.buildings[key].level >= Settings.settings.place.minKataLevel) &&
                ((groupInfo.units.ram.used == 0 && Place.village.buildings.wall.level >= Settings.settings.place.minRamWall) || key != "wall") &&
                (idx == -1 || Settings.farmUnitCfg.stayNOrder.catapult.maxTime == 0 || Settings.farmUnitCfg.stayNOrder.catapult.maxTime * 60 >= Place.fs * serverInfo.unitInfo.catapult.speed))) {
              if( groupInfo.units.catapult.count >= Place.katasNeeded.reduce[Place.village.buildings[key].level] &&
                  (idx == -1 || !Settings.settings.place.minKatasNeeded || groupInfo.units.catapult.count >= Place.katasNeeded.destroy[Place.village.buildings[key].level])) {
                groupInfo.cataTarget = key;
                groupInfo.units.catapult.used = Math.min(groupInfo.units.catapult.count, Place.katasNeeded.destroy[Place.village.buildings[key].level]);
                break;
              }
              else {
                minKatas = true;
              }
            }
          }
        }
        if( groupInfo.cataTarget == "" ) {
          groupInfo.units.catapult.used = 0;
          groupInfo.units.catapult.state = minKatas ? 2 : 5;
        }
      }
    }
    else if( Settings.settings.place.spyNoReport ) {
      for( var key in groupInfo ) {
        if( key != "spy" ) {
          groupInfo.state = 5;
          groupInfo.used = 0;
        }
      }
      return groupInfo;
    }

    var f = useeq ? Math.max(Settings.settings.place.minEQ,Place.village.eq) / 100 : 1;
    do {
      var restart = false;
      var sum = 0;
      groupInfo.load = 0;
      for( var key in groupInfo.units ) {
        if( groupInfo.units[key].used > 0 && serverInfo.unitInfo[key].speed > slowest )
          slowest = serverInfo.unitInfo[key].speed;
      }
      var duration = Place.fs * slowest;
      ts = lib.getTime() + duration;
      if( Place.village.buildings.timestamp > 0 ) {
        sum = 0;
        for( var res in resInfos )
          sum += Math.round(serverInfo.getRessource(Place.village, res, ts)*f);
      }
      else
        sum = parseInt($("dsfm_load").value, 10);

      for( var key in groupInfo.units ) {
        if( groupInfo.units[key].state == 3 && serverInfo.unitInfo[key].carry > 0 ) {
          if( idx == -1 || duration <= Settings.farmUnitCfg.stayNOrder[key].maxTime * 60 )
            groupInfo.units[key].state = 1;
        }
        if( groupInfo.units[key].state == 5 && key != "ram" && key != "catapult" )
          groupInfo.units[key].state = 1;
        if( groupInfo.units[key].state == 1 && serverInfo.unitInfo[key].carry > 0 ) {
          if( idx != -1 && Settings.farmUnitCfg.stayNOrder[key].maxTime > 0 && duration > Settings.farmUnitCfg.stayNOrder[key].maxTime * 60) {
            groupInfo.units[key].state = 3;
            groupInfo.units[key].used = 0;
          }
          else {
            if( groupInfo.load > sum ) {
              groupInfo.units[key].state = 5;
              groupInfo.units[key].used = 0;
            }
            else {
              var needed = Math.min(groupInfo.units[key].count, Math.ceil((sum-groupInfo.load)/serverInfo.unitInfo[key].carry));
              groupInfo.units[key].used = needed;
              groupInfo.load += needed * serverInfo.unitInfo[key].carry;
              if( serverInfo.unitInfo[key].speed > slowest ) {
                slowest = serverInfo.unitInfo[key].speed;
                restart = true;
                break;
              }
            }
          }
        }
      }
      if( !restart ) {
        for( var key in Settings.farmUnitCfg.minUnits ) {
          var parts = key.split("_");
          var sum = 0;
          for( var i = 0; i < parts.length; i++ )
            sum += groupInfo.units[parts[i]].used;
          if( sum > 0 && sum < Settings.farmUnitCfg.minUnits[key] ) {
            slowest = 0;
            restart = true;
            for( var i = 0; i < parts.length; i++ ) {
              if( groupInfo.units[parts[i]].used > 0 ) {
                groupInfo.units[parts[i]].state = 2;
                groupInfo.units[parts[i]].used = 0;
              }
            }
          }
        }
      }
    } while( restart );
    return groupInfo;
  },
  markUnitFields : function() {
    for( var key in Place.groupInfo.units ) {
      $("dsfm_"+key+"_use").checked = Place.groupInfo.units[key].state == 1 || Place.groupInfo.units[key].state == 5;
      var input = $("unit_input_"+key);
      // State: 0 => keine da;  1 => benutzen, 2 => zu wenig da, 3 => zu lang unterwegs,  4  nicht in gruppe, 5 nicht benötigt
      input.title = texts[lib.lang].gui.unitStates[Place.groupInfo.units[key].state];
      if( Settings.colors.place.unitStates[Place.groupInfo.units[key].state].border )
        input.style.border = "1px solid " + Settings.colors.place.unitStates[Place.groupInfo.units[key].state].border;
      input.style.backgroundColor = Settings.colors.place.unitStates[Place.groupInfo.units[key].state].background;
    }
  },
  selectTarget : function(coords) {
    var xy = coords.split("|");
    $("inputx").value = xy[0];
    $("inputy").value = xy[1];
    $("inline_popup").style.display = "none";
    Place.updateTarget();
    Place.insertUnits();
  },
  updateTarget : function(force) {
    var x = parseInt($("inputx").value, 10);
    var y = parseInt($("inputy").value, 10);
    var a = $("dsfm_insertUnits");
    if( !isNaN(x) && !isNaN(y) ) {
      if( x != Place.placeX || y != Place.placeY || force == true ) {
        Place.placeX = x;
        Place.placeY = y;
        Place.dist = Math.sqrt(Math.pow(curVillage.coords.x - x, 2) + Math.pow(curVillage.coords.y - y, 2));
        Place.fs = Place.dist * RunTimes.speed * 60;
        a.href = "javascript:;";
        a.style.color = "";
        var key = "" + x + "_" + y;
        $("dsfm_row_ress").style.display = "none";
        $("dsfm_row_unitsin").style.display = "none";
        $("dsfm_row_unitsout").style.display = "none";
        $("dsfm_row_buildings").style.display = "none";
        Place.village = new Village(key);
        var f = useeq ? Math.max(Settings.settings.place.minEQ,Place.village.eq) / 100 : 1;
        if( Place.village.res.timestamp > 0 ) {
          var cell = $("dsfm_title").innerHTML = texts[lib.lang].gui.resources+' ('+(Place.village.buildings.timestamp>0?texts[lib.lang].gui.current:texts[lib.lang].gui.spy)+'):';
          if( Place.village.buildings.timestamp > 0 )
            showReportAge(Place.village.buildings.timestamp, "resources");
          else {
            showReportAge(Place.village.res.timestamp, "resources");
            var sum = 0;
            for( var res in resInfos ) {
              var val = Math.round(Place.village.res[res]*f);
              sum += val;
              $("dsfm_"+res).innerHTML = val;
            }
            $("dsfm_sum").innerHTML = sum;
            if( !Place.userLoad )
              $("dsfm_load").value = sum;
          }
          if( Settings.settings.place.showRessis )
            $("dsfm_row_ress").style.display = "";
          Place.updatePlace();
          $("dsfm_eq").innerHTML = Math.max(Settings.settings.place.minEQ,Place.village.eq);
        }
        else {
          if( !Place.userLoad )
            $("dsfm_load").value = Settings.settings.place.noReportLoad;
          $("dsfm_row_ress").style.display = "none";
        }
        if( !force )
          Place.findUnitGroup();
        if( Settings.settings.place.disableOnUnits && !Place.placeSubmits[0].disabled)
          Place.enableAttack(!(Place.village.unitsin.hasUnits || Place.village.unitsout.hasUnits));
      }
      if( Place.village.unitsin.hasUnits && Settings.settings.place.showUnitsIn) {
        $("dsfm_unitsin").innerHTML = getUnitsTab(Place.village.unitsin);
        $("dsfm_row_unitsin").style.display = "";
        showReportAge(Place.village.unitsin.timestamp, "unitsin");
      }
      if( Place.village.unitsout.hasUnits && Settings.settings.place.showUnitsOut) {
        $("dsfm_unitsout").innerHTML = getUnitsTab(Place.village.unitsout);
        $("dsfm_row_unitsout").style.display = "";
        showReportAge(Place.village.unitsout.timestamp, "unitsout");
      }
      if( Place.village.buildings.timestamp > 0 && Settings.settings.place.showBuildings > 0 ) {
        cell = $("dsfm_buildings");
        if( Settings.settings.place.showBuildings == 1 )
          cell.innerHTML = '<img src="graphic/buildings/wall.png" alt="'+serverInfo.addBuildingInfo.wall.name+':" border="0"/>'+Place.village.buildings.wall.level;
        else
          cell.innerHTML = getBuildingsTab(Place.village.buildings,1,Settings.settings.place.showCatas);
        showReportAge(Place.village.buildings.timestamp, "buildings");
        $("dsfm_row_buildings").style.display="";
      }
    }
    else {
      a.href = "";
      a.style.color = "grey";
    }
    Place.updatePlace();
  },
  loadFarmList : function() {
    var hide = lib.storage.getValue( "atts","") + lib.storage.getValue( "nofarms"+ownPid, "");
    var vals = lib.storage.listValues("^\\d{1,3}_\\d{1,3}$");
    Place.farmlist = [];
    for(var i = 0; i < vals.length; i++ ) {
      var coords = vals[i][0]; 
      if( !new RegExp(coords).test(hide) ) {
        coords = coords.split("_");
        coords[0] = parseInt(coords[0],10);
        coords[1] = parseInt(coords[1],10);
        var dist = Math.sqrt(Math.pow(curVillage.coords.x - coords[0], 2) + Math.pow(curVillage.coords.y - coords[1], 2));
        if( dist < Settings.settings.place.farmDist ) {
          var village = new Village(vals[i][0]);
          if( village.res.timestamp > 0 ) {
            var color = 0;
            if( village.buildings.timestamp > 0 ) {
              var max = serverInfo.getStorageSize(village)-serverInfo.getHideSize(village.buildings.hide.level);
              var sum = 0;
              var entry = { "dst": {x: coords[0], y:coords[1]}, "dist": dist, "eq": Math.max(Settings.settings.place.minEQ,village.eq), "color": village.color, "wood": 0, "woodcolor": 0, "stone": 0, "stonecolor":0, "iron": 0, "ironcolor": 0, "sum": 0, "storage": max, "sumcolor": 0, wall: village.buildings.wall.level };
              var f = useeq ? Math.max(Settings.settings.place.minEQ,village.eq) / 100 : 1;
              for( var res in resInfos ) {
                var val = Math.round(serverInfo.getRessource(village, res) * f);
                entry[res] = val;
                if( val >= max )
                  entry[res+"color"] = 2;
                else if( val >= max*0.75 && entry[res+"color"] < 2)
                  entry[res+"color"] = 1;
                entry.sum += val;
                entry.sumcolor = Math.max(entry.sumcolor, entry[res+"color"]);
              }

              if( entry.sum >= Settings.settings.place.incRangeRes )
                Place.farmlist.push( entry );
            }
            else {
              var sum = 0;
              var entry = { "dst": {x: coords[0], y:coords[1]}, "dist": dist, "eq": Math.max(Settings.settings.place.minEQ,village.eq), "color": village.color, "wood": 0, "woodcolor": 3, "stone": 0, "stonecolor":3, "iron": 0, "ironcolor": 3, "sum": 0, "storage": max, "sumcolor": 3, wall: "?" }
              for( var res in resInfos ) {
                entry[res] = village.res[res];
                entry.sum += village.res[res];
              }
              if( entry.sum >= Settings.settings.place.incRangeRes )
                Place.farmlist.push( entry );
            }
          }
        }
      }
    }
    Place.farmlistSort = parseInt(lib.storage.getValue("farmsort"+ownPid,0),10);
    Place.curFarmDist = 1;

    if( Place.farmlist.length > 0 ) {
      var count = Math.min( Settings.settings.place.maxFarms, Place.farmlist.length );
      do {
        Place.farmlist.sort(Place.compareFarms1);
        for( i = 0; i < count; i++ ) {
          if( Place.farmlist[i].sum < Settings.settings.place.incRangeRes || Place.farmlist[i].dist > Place.curFarmDist ) {
            Place.curFarmDist++;
            break;
          }
        }
        if( i == count || Place.curFarmDist > Settings.settings.place.farmDist )
          break;
      } while( true );
      Place.farmlist = Place.farmlist.slice(0,Settings.settings.place.maxFarms);
      if( Place.farmlistSort != 0 )
        Place.farmlist.sort(Place.compareFarms2);
    }
  },
  showFarmList : function(event) {
    Place.farmlist.sort(Place.compareFarms2);
    var colors = [ "#000", "#FF6A00", "#FF0000", "rgb(0,38,255)" ];
    var popup = $("inline_popup");
    popup.style.width="450px";
    var content = $("inline_popup_main");
    content.style.width="444px";
    content = $("inline_popup_content");
    content.style.width="100%";
    content.innerHTML = "";
    var input = content.appendChild( ce("input"));
    input.type = "checkbox";
    input.checked = useeq;
    input.id = "dsfm_fl_useeq";
    content.appendChild(document.createTextNode(texts[lib.lang].gui.usequotient + (Settings.settings.misc.useHotKeys?Settings.hotKeys.place.eq.text:"")));
    input.addEventListener("click", function() { lib.fireEvent($("dsfm_useeq"),"click"); }, false );
    var tab = content.appendChild(ce("table"));
    tab.className = "vis";
    tab.style.width = "100%";
    var row = tab.insertRow(0);
    var cell = row.appendChild(ce("th"));
    cell.innerHTML = texts[lib.lang].gui.coords;
    cell.colSpan=2;
    cell = row.appendChild(ce("th"));
    var a = cell.appendChild(ce("a"));
    a.href = "javascript:;";
    a.name = "2";
    a.innerHTML = '<img src="/graphic/holz.png" alt="'+texts[lib.lang].resources.wood+'" title="'+texts[lib.lang].resources.wood+'"/>';
    a.addEventListener("click", Place.setFLSort, false );
    cell.style.textAlign = "center";
    cell = row.appendChild(ce("th"));
    a = cell.appendChild(ce("a"));
    a.href = "javascript:;";
    a.name = "3";
    a.innerHTML = '<img src="/graphic/lehm.png" alt="'+texts[lib.lang].resources.stone+'" title="'+texts[lib.lang].resources.stone+'"/>';
    a.addEventListener("click", Place.setFLSort, false );
    cell.style.textAlign = "center";
    cell = row.appendChild(ce("th"));
    a = cell.appendChild(ce("a"));
    a.href = "javascript:;";
    a.innerHTML = '<img src="/graphic/eisen.png" alt="'+texts[lib.lang].resources.iron+'" title="'+texts[lib.lang].resources.iron+'"/>';
    a.name = "4";
    a.addEventListener("click", Place.setFLSort, false );
    cell.style.textAlign = "center";
    cell = row.appendChild(ce("th"));
    a = cell.appendChild(ce("a"));
    a.href = "javascript:;";
    a.innerHTML = texts[lib.lang].gui.fl_sum;
    a.name = "0";
    cell = row.appendChild(ce("th"));
    cell.style.textAlign = "center";
    cell.innerHTML = texts[lib.lang].gui.fl_eq;
    a.addEventListener("click", Place.setFLSort, false );
    cell.style.textAlign = "right";
    cell = row.appendChild(ce("th"));
    cell.style.textAlign = "right";
    a = cell.appendChild(ce("a"));
    a.href = "javascript:;";
    a.name = "1";
    a.innerHTML = texts[lib.lang].gui.dist;
    a.addEventListener("click", Place.setFLSort, false );
    cell = row.appendChild(ce("th"));
    cell.style.textAlign = "right";
    a = cell.appendChild(ce("a"));
    a.href = "javascript:;";
    a.name = "5";
    a.innerHTML = '<img src="graphic/buildings/wall.png"/>';
    a.addEventListener("click", Place.setFLSort, false );
    cell = row.appendChild(ce("th"));
    cell.innerHTML = "X";
    cell.style.textAlign = "center";

    for( i = 0; i < Place.farmlist.length; i++ ) {
      row = tab.insertRow(tab.rows.length);
      cell = row.insertCell(0);
      if( Place.farmlist[i].color.length > 0 ) {
        var div = cell.appendChild(ce("div"));
        div.style.width="5px";
        div.style.height="5px";
        div.style.backgroundColor=Place.farmlist[i].color;
        div.style.border="1px solid black";
      }
      else
        cell.innerHTML = "?";
      cell = row.insertCell(1);
      cell.style.whiteSpace="nowrap";
      var a = cell.appendChild(ce("a"));
      a.id = "dsfm_fl_" + i;
      a.href = "javascript:;";
      a.innerHTML = Place.farmlist[i].dst["x"]+'|'+Place.farmlist[i].dst["y"];
      a.addEventListener("click", function(e) {Place.selectTarget(e.target.innerHTML);}, false );
      if( i < 10 )
        cell.appendChild(document.createTextNode(i < 9 ? " ("+(i+1)+")" : " (0)"));;
      cell = row.insertCell(row.cells.length);
      cell.innerHTML = Place.farmlist[i].wood;
      cell.style.textAlign = "right";
      cell.style.color = colors[Place.farmlist[i].woodcolor];
      cell = row.insertCell(row.cells.length);
      cell.innerHTML = Place.farmlist[i].stone;
      cell.style.textAlign = "right";
      cell.style.color = colors[Place.farmlist[i].stonecolor];
      cell = row.insertCell(row.cells.length);
      cell.innerHTML = Place.farmlist[i].iron;
      cell.style.textAlign = "right";
      cell.style.color = colors[Place.farmlist[i].ironcolor];
      cell = row.insertCell(row.cells.length);
      cell.innerHTML = Place.farmlist[i].sum;
      cell.style.textAlign = "right";
      cell.style.color = colors[Place.farmlist[i].sumcolor];
      cell = row.insertCell(row.cells.length);
      cell.style.textAlign = "right";
      cell.innerHTML = Place.farmlist[i].eq + "%";
      cell = row.insertCell(row.cells.length);
      cell.innerHTML = Math.round(Place.farmlist[i].dist*100)/100
      cell.style.textAlign = "right";
      cell = row.insertCell(row.cells.length);
      cell.style.textAlign = "right";
      cell.textContent = Place.farmlist[i].wall;
      cell = row.insertCell(row.cells.length);
      cell.style.textAlign = "center";
      cell.style.fontWeight = "bold";
      a = cell.appendChild(ce("a"));
      a.href = "javascript:;";
      a.innerHTML = "X";
      a.style.color = "red";
      a.title = texts[lib.lang].gui.delfromfarmlist;
      a.addEventListener("click", function(e) { var coords = e.target.parentNode.parentNode.cells[1].firstChild.innerHTML.replace(/\|/,"_"); lib.storage.setValue("nofarms"+ownPid,lib.storage.getValue("nofarms"+ownPid,"")+coords+";"); Place.loadFarmList(); Place.showFarmList(); }, false );
    }
    popup.style.display = "block";
    popup.style.left = Math.round(Math.max(0,self.pageXOffset + (self.innerWidth-popup.offsetWidth)/2)) +"px";
    popup.style.top = Math.round(Math.max(0,self.pageYOffset + (self.innerHeight-popup.offsetHeight)/2)) + "px";
  },
  setFLSort: function(e) {
    Place.farmlistSort = parseInt(this.name,10); 
    lib.storage.setValue("farmsort"+ownPid, Place.farmlistSort); 
    Place.showFarmList();
  },
  compareFarms1 : function(a,b) {
    var vars = ["sum","sum","wood","stone","iron","wall"];
    var ret = 0;
    if( a.dist <= Place.curFarmDist && b.dist <= Place.curFarmDist )
      ret = b[vars[Place.farmlistSort]]-a[vars[Place.farmlistSort]];
    else if( a.dist > Place.curFarmDist && b.dist <= Place.curFarmDist )
      ret = 1;
    else if( b.dist > Place.curFarmDist && a.dist <= Place.curFarmDist )
      ret = -1;
    return ret;
  },
  compareFarms2 : function(a,b) {
    if( Place.farmlistSort == 1 ) {
      if( a.dist == b.dist )
        return b.sum-a.sum;
      else
        return a.dist-b.dist;
    }
    else
      return Place.compareFarms1(a,b);
  },
  updatePlace : function() {
    var selUnitsInfo = Place.getSelectedUnitsInfo();
    if( Place.capture )
      Place.capture.innerHTML = lib.formatNumber(selUnitsInfo.load,true,true) + " / " + lib.formatNumber(selUnitsInfo.total,true,true)
    var dist = 0;
    if(!isNaN(Place.placeX) && !isNaN(Place.placeY))
      dist = Math.sqrt(Math.pow(curVillage.coords.x - Place.placeX, 2) + Math.pow(curVillage.coords.y - Place.placeY, 2));
    Place.duration = selUnitsInfo.slowest * dist * RunTimes.speed;
    if( Place.runtime )
      Place.runtime.innerHTML = texts[lib.lang].locale.formatDuration(Math.round(Place.duration*60));
    Place.duration *= 60000;
    Place.updateTimes();
    if( Place.village ) {
      if( Place.village.res.timestamp > 0 ) {
        if( Place.village.buildings.timestamp > 0 ) {
          var ts = lib.getTime();
          var title = $("dsfm_title");
          if( selUnitsInfo.slowest > 0 ) {
            ts += Place.fs * selUnitsInfo.slowest;
            if( title ) title.innerHTML = texts[lib.lang].gui.resources + " ("+texts[lib.lang].gui.atArrival+")";
          }
          else
            if( title ) title.innerHTML = texts[lib.lang].gui.resources + " ("+texts[lib.lang].gui.current+")";;
          var f = useeq ? Math.max(Settings.settings.place.minEQ,Place.village.eq) / 100 : 1;
          var sum = 0;
          for( var res in resInfos ) {
            var val = Math.round(serverInfo.getRessource(Place.village, res, ts)*f);
            sum += val;
            $("dsfm_"+res).innerHTML = lib.formatNumber(val,true,true);
          }
          $("dsfm_cur_load").innerHTML = lib.formatNumber(selUnitsInfo.load,true,true);
          $("dsfm_sum").innerHTML = lib.formatNumber(sum,true,true);
          if( !Place.userLoad )
            $("dsfm_load").value = sum;
        }
        else {
          $("dsfm_cur_load").innerHTML = lib.formatNumber(selUnitsInfo.load,true,true);
        }
      }
    }
  },
  updateTimes : function() {
    if( Place.duration && Place.arrivalTime ) {
      var ts = lib.getTime();
      if( Place.duration > 0 ) {
        var arrivalTime = new Date(ts*1000 + Place.duration);
        var html = texts[lib.lang].locale.date2timeStr(arrivalTime);
        if( Place.showNightbonus && serverInfo.config.night_active ) {
          var h = arrivalTime.getHours();
          if( h >= serverInfo.config.night_start_hour && h < serverInfo.config.night_end_hour )
            html += ' <span class="warn">'+texts[lib.lang].gui.nightbonus+'</span>';
        }
        Place.arrivalTime.innerHTML = html;
        if( Place.returnTime ) {
          var returnTime = new Date(ts*1000 + 2 * Place.duration);
          Place.returnTime.innerHTML = texts[lib.lang].locale.date2timeStr(returnTime);
        }
      }
      else {
        Place.arrivalTime.innerHTML = "---";
        if( Place.returnTime )
          Place.returnTime.innerHTML = "---";
      }
    }
  },
  enableAttack : function(enable) {
    if( arguments.length == 0 || enable ) {
      $("dsfm_enableattack").style.display="none";
      Place.placeSubmits[0].disabled=false;
    }
    else {
      $("dsfm_enableattack").style.display="";
      Place.placeSubmits[0].disabled=true;
    }
  },
  getSelectedUnitsInfo : function() {
    var e = $("units_form");
    var input = e.getElementsByTagName("input");
    var ret = { slowest: 0, load: 0, total: 0 };
    for( var i = 0; i < input.length; i++ ) {
      if( input[i].className == "unitsInput" ) {
        var val = parseInt(input[i].value, 10);
        if( isNaN(val) )
          val = 0;
        var unit = input[i].id.substring(11);
        var maxunits = input[i].parentNode.textContent.match(/\((\d+)\)/)[1];
        if( isNaN(maxunits) )
          maxunits = 0;
        ret.load += val * serverInfo.unitInfo[unit].carry;
        ret.total += maxunits * serverInfo.unitInfo[unit].carry;
        if( val > 0 && serverInfo.unitInfo[unit].speed > ret.slowest )
          ret.slowest = serverInfo.unitInfo[unit].speed;
      }
    }
    return ret;
  },
  insertUnits : function() {
    var units = 0;
    for( var key in Place.groupInfo.units ) {
      if( Place.groupInfo.units[key].used > 0 ) {
        units |= serverInfo.unitInfo[key].bit;
        $("unit_input_"+key ).value = Place.groupInfo.units[key].used;
      }
      else
        $("unit_input_"+key ).value = "";
    }
    
    if( $("dsfm_spy_use").checked && Place.groupInfo.units.spy.count >= Settings.farmUnitCfg.minUnits.spy )
      $("unit_input_spy").value = Settings.farmUnitCfg.minUnits.spy;
    Place.enableAttack( !(Settings.settings.place.disableOnUnits && (Place.village.unitsin.hasUnits || Place.village.unitsout.hasUnits)) && (!Settings.settings.place.minLoad || Place.groupInfo.load >= Settings.settings.place.incRangeRes || (units == 0 && Place.village.buildings.timestamp==0 && $("unit_input_spy").value > 0)));
    Place.updatePlace();
    lib.storage.setValue("cataTarget"+ownPid,Place.groupInfo.cataTarget);
  },
  checkUnits : function(e) {
    //this.checked = !this.checked;
    $("dsfm_unitSelect").value = 1;
    lib.storage.setValue("unitSelect"+ownPid,1);
    if( Place.village ) {
      Place.groupInfo = Place.getGroupUnits(-1);
      Place.markUnitFields();
    }
  },
  initConfirm : function() {
    var form = document.getElementsByTagName("form")[0];
    var input = $("troop_confirm_go");
//    var inputs = form.getElementsByTagName("input");
    var select = form.getElementsByTagName("select");
    var h3 = document.getElementsByTagName("h3");
    var reserved = false;
    if( h3.length > 0 )
      reserved = texts[lib.lang].regex.reserved.test(h3[0].textContent);
    for( var i = 0; i < select.length; i++ ) {
      if( select[i].name == "building" ) {
        var cataTarget = lib.storage.getValue("cataTarget"+ownPid,"");
        if(cataTarget != "")
          select[i].value = cataTarget;
        lib.storage.deleteValue("cataTarget"+ownPid);
      }
    }
    Place.placeSubmits = [input];
    Place.duration = 0;
    input.value += HotKeys.add("common","ok", function(e,mod) { Place.placeSubmits[0].click(); } );
    var node = document.getElementsByTagName("h2")[0];
    var isAtt = texts[lib.lang].regex.attack.test( node.innerHTML );
    node.style.backgroundColor = isAtt ? Settings.colors.place.confirmTitle.attack : Settings.colors.place.confirmTitle.support;
    while( node.nodeName.toUpperCase() != "TABLE" )
      node = node.nextSibling;
    var owner = 0;
    for( var i = 0; i < node.rows.length; i++ ) {
      if( node.rows[i].cells.length > 1 ) {
        if( /info_player/.test(node.rows[i].cells[1].innerHTML) )
          owner = parseInt(node.rows[i].cells[1].innerHTML.match(/id=(\d+)/)[1],10);
        else if( texts[lib.lang].regex.durationTitle.test(node.rows[i].cells[0].innerHTML) ) {
          Place.duration = texts[lib.lang].locale.parseDuration(node.rows[i].cells[1].textContent)*1000;
        }
        else if( texts[lib.lang].regex.arrivalTitle.test(node.rows[i].cells[0].innerHTML) ) {
          Place.arrivalTime = node.rows[i].cells[1];
          if( isAtt ) {
            var row = node.insertRow(i+1);
            row.insertCell(0).innerHTML = texts[lib.lang].gui.returnTitle;
            Place.returnTime = row.insertCell(1);
          }
        }
      }
    }
    var inputs = form.getElementsByTagName("input");
    var x = 0;
    var y = 0;
    var coords = "";
    for( var i= 0; i < inputs.length; i++ ) {
      switch(inputs[i].name) {
        case "x":
          x = inputs[i].value;
          coords += x +"_";
          break;
        case "y":
          y = inputs[i].value;
          coords += y;
          break;
        case "submit":
          if((reserved || owner > 0) && isAtt) {
            Place.showNightbonus = true;
            if( owner == ownPid ) {
              deleteVillageInfos(coords);
              Place.placeSubmits[0].disabled=true;
              inputs[i].parentNode.appendChild(ce("br"));
              var a = inputs[i].parentNode.appendChild(ce("a"));
              a.href = "javascript:;";
              a.id = "dsfm_enableattack";
              a.style.fontSize = "xx-small";
              a.innerHTML = "&raquo; "+ texts[lib.lang].gui.enableAttack + HotKeys.add( "place", "enableAttack", "dsfm_enableattack", "click" );
              a.addEventListener("click", function() { if(confirm(texts[lib.lang].gui.attackOwnVillage)) { Place.enableAttack(); Place.placeSubmits[0].style.backgroundColor = "#FF0000"; Place.placeSubmits[0].style.color = "#FFFFFF";} }, false );
            }
            else {
              if( Settings.settings.place.showUnitsIn || Settings.settings.place.showUnitsOut ) {
                var v = new Village(coords);
                if( v.unitsin.hasUnits || v.unitsout.hasUnits ) {
                  var tabs = form.getElementsByTagName("table");
                  for( var j = 1; j < tabs.length; j++ ) {
                    if( /unit\/unit_/.test(tabs[j].rows[0].cells[0].innerHTML) ) {
                      break;
                    }
                  }
                  if( j < tabs.length ) {
                    var tab = tabs[j];
                    tab.rows[0].insertBefore(ce("th"),tab.rows[0].cells[0]);
                    tab.rows[1].insertCell(0).textContent = texts[lib.lang].gui.ownUnits;
                    var rowIn, rowOut;
                    if( Settings.settings.place.showUnitsIn && v.unitsin.hasUnits ) {
                      rowIn = tab.insertRow(-1);
                      rowIn.insertCell(0).textContent = texts[lib.lang].gui.unitsin;
                      
                    }
                    if( Settings.settings.place.showUnitsOut && v.unitsout.hasUnits ) {
                      rowOut = tab.insertRow(-1);
                      rowOut.insertCell(0).textContent = texts[lib.lang].gui.unitsout;
                    }
                    if( serverInfo.unitInfo.militia ) {
                      var cell = tab.rows[0].appendChild(ce("th"));
                      cell.width = 50;
                      cell.style.textAlign = "center";
                      var img = cell.appendChild(ce("img"));
                      img.src = "/graphic/unit/unit_militia.png";
                      img.title = texts[lib.lang].gui.unit.militia;
                      cell = tab.rows[1].insertCell(-1);
                      cell.className = "hidden";
                      cell.textContent = "---";
                    }
                    for( var j = 1; j < tab.rows[0].cells.length; j++ ) {
                      var unit = tab.rows[0].cells[j].innerHTML.match(/unit\/unit_([^\.]+)\./)[1];
                      if( Settings.settings.place.showUnitsIn && v.unitsin.hasUnits ) {
                        var cell = rowIn.insertCell(-1);
                        if( v.unitsin[unit] == 0 )
                          cell.className = "hidden";
                        cell.textContent = v.unitsin[unit];
                      }
                      if( Settings.settings.place.showUnitsOut && v.unitsout.hasUnits ) {
                        var cell = rowOut.insertCell(-1);
                        if( v.unitsin[unit] == 0 )
                          cell.className = "hidden";
                        cell.textContent = v.unitsin[unit];
                      }
                    }
                  }
                }
              }
              switch( Settings.settings.place.okOnPlayer ) {
                case 1:
                  inputs[i].style.backgroundColor = "#FF0000";
                  inputs[i].style.color = "#FFFFFF";
                  break;
                case 2:
                case 3:
                  Place.placeSubmits[0].disabled=true;
                  inputs[i].parentNode.appendChild(ce("br"));
                  var a = inputs[i].parentNode.appendChild(ce("a"));
                  a.href = "javascript:;";
                  a.id = "dsfm_enableattack";
                  a.addEventListener("click", Place.enableAttack, false );
                  a.innerHTML = "&raquo; "+ texts[lib.lang].gui.enableAttack + HotKeys.add( "place", "enableAttack", "dsfm_enableattack", "click" );
                  if( Settings.settings.place.okOnPlayer == 3 )
                    lib.storage.setValue("nofarms"+ownPid,lib.storage.getValue("nofarms"+ownPid,"")+coords+";");
                  break;
              }

              if( !new RegExp(coords+";").test(lib.storage.getValue("nofarms"+ownPid,"")) ) {
                inputs[i].parentNode.appendChild(ce("br"));
                var a = inputs[i].parentNode.appendChild(ce("a"));
                a.href = "javascript:;";
                a.id = "dsfm_remove";
                a.innerHTML = "&raquo; " + texts[lib.lang].gui.delfromfarmlist;
                a.addEventListener("click", function(e) { lib.storage.setValue("nofarms"+ownPid,lib.storage.getValue("nofarms"+ownPid,"")+coords+";"); e.target.parentNode.removeChild(e.target); }, false );
              }
            }
          }
          break;
      }
    }
    setInterval(Place.updateTimes, 250);
    form.addEventListener("submit", function(e) { var ts = Math.round(lib.getTime()); var att = ts + "," + ownPid + "," + coords+","+(ts+Place.duration/1000)+";"; atts = lib.storage.getValue("atts",""); atts += att; lib.storage.setValue("atts",atts); }, false );
  },
  modUnits : function() {
    var tabs = document.getElementById("content_value").getElementsByTagName("table");
    var tab = tabs[3];
    var idxExternal = 4;
    if( tab.rows.length > 3 ) {
      idxExternal++;
      var footLines = tab.rows.length == 4 ? 1 : 2;
      if( tab.tFoot === null ) {
        tab.appendChild(ce("tfoot"));
        for( var i = 0; i < footLines; i++ )
          tab.tFoot.appendChild(tab.rows[tab.rows.length-footLines]);
      }
      var cell = tab.rows[0].insertBefore(ce("th"),tab.rows[0].cells[1]);
      cell.innerHTML = texts[lib.lang].gui.dist;
      cell = tab.rows[1].insertCell(1);
      cell.innerHTML = '<span class="grey">0</span>';
      cell.style.textAlign = "right";
      for( var i = 2; i < tab.rows.length - footLines; i++ ) {
        tab.rows[i].cells[0].setAttribute("dsfm_order",i);
        tab.rows[i].insertCell(1);
        RunTimes.insertDist(tab.rows[i],0,1);
      }
      if( footLines == 2 )
        tab.rows[tab.rows.length-2].cells[0].colSpan=2;
      tab.rows[tab.rows.length-1].cells[0].colSpan=2;
      var sorter = new TableSorter(tab);
      sorter.addSortColumn(0,compareOrderCell,1);
      sorter.addSortColumn(1,compareNumericCell);
      for( var i = 0; i < serverInfo.unitAnz; i++ )
        sorter.addSortColumn(i+2,compareNumericCell);
    }
    if( tabs.length > idxExternal ) {
      tab = tabs[idxExternal];
      cell = tab.rows[0].insertBefore(ce("th"),tab.rows[0].cells[1]);
      cell.innerHTML = texts[lib.lang].gui.dist;
	  for( var i = 1; i < tab.rows.length - 1; i++ ) {
        if( tab.rows[i].cells.length > 0 ) {
			tab.rows[i].cells[0].setAttribute("dsfm_order",i);
			tab.rows[i].insertCell(1);
			RunTimes.insertDist(tab.rows[i],2,1);
		}
		else
			tab.deleteRow(i--);
      }
	  tab.rows[i].cells[0].colSpan++;
      var sorter = new TableSorter(tab);
      sorter.addSortColumn(0,compareOrderCell,1);
      sorter.addSortColumn(1,compareNumericCell);
      for( var i = 0; i < serverInfo.unitAnz; i++ )
        sorter.addSortColumn(i+2,compareNumericCell);
    }
  },
  modNeighbor : function() {
    var tab = document.getElementById("content_value").getElementsByTagName("table")[3];
    for( var i = 1; i < tab.rows.length; i++ )
      RunTimes.insertDist(tab.rows[i],0,1);
    var sorter = new TableSorter(tab);
    sorter.addSortColumn(0,compareStringCell);
    sorter.addSortColumn(1,compareNumericCell,1);
  },
}
var Map = {
  nofarmpng : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAAAA7wsK9wMG9wQD9gUE9wQF9wQH9AYE9QYF9QYJ8ggG9gsM9wwO9g4P+wEC+QMA+gIB+gIC+QID+gIE+AMF+AQC+AQD+AYF/QAA/QAB/QAC/AIB+AgJ+AsN8xAP8xER9BAQ9BMS9BIT9RQV9RYV8hoa9RsZ9hob9hse9h8i8iAd9CAi8S4s71BQ81RS8F9e7GFe62Nh6mNj62Nl62dk62Zl7GFg7WBh7GNg7WJi7mRg7WVh7WZg7mRm7m9w7W9x7W9y63J07HNy7Hd17Hd373h38GNh8GVk82hm8XVz8XZ38Xx79Ht754aG6YWH6YaF6IqK6oyI7IuK7YyL8oOF8oaG8ouJ85GT8pWX9JmW9JqW9Z+d85+g9aei96io9Kqt9K2t9a6u86+w8rGu9LKv9rSv8rOx8bK29LKx9LSz9bq39bq7+Li598zM9dTT99zaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH1mncAAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjQ+jcx2AAAAzElEQVQYV2P4DwS+BuZmZmZ+ICYDEDsKCUhKSUkJ2UP4TqJSUpJAICHiAOI7igqAeEC+hJDdfwZ/dnVxBWUlMU1uIV45Fn8GS8+McI98b/2kFM7c+FBTBotIXS2hHKFYxSjtZMZMEwYjlQgfID+RI0wnL93WhsFQjyubI0s0Tj5aNU1Y2prBOCQxhi2VyS0pnitBWNKKIYBDTVyQR1BIQ0ZaVlA4iOG/Mys/xH5JSSFXkPtcmMHOleIT9oK4H6oCKAvh/w+0dQeCYBATAHESSVaqgfK6AAAAAElFTkSuQmCC",
  attentionpng : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAAvlI+tlhDu1pHt2JTs2xfvHNbtX1xyDEK0isIy0Uux1Ax3kcm3lIt5Uce5Ukp5FAo6VEp5V0/4GM+6GM701xI0mFB22dL12pR0nhf3Hln6GpO63ZV6XJZ73Fb1ol23ol47Ixv5YBy7Yd6h4eDgImEioqKmp6ltYuAt5aOqaeirKyltbW1tLix1J2M25OB2ZiG25+P2quZ27Gn4ZeK4ZqO7JOB5Z2U46eZ4ame7aiW7bOp5bex4MK86sjF6srI8M/D8d7Z997b7ODb9eHe9OLe7e/37vL09eTl9e7z9vHw9vT89fj79Pr79vr8+vv3+fn4+fn5+Pr4+v35+/37+/z8+Pz+/P76/Pz8/f78////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKNkz+QAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjQ+jcx2AAAAiklEQVQYV2P4jwoYcPH1IBIweUVlU2S+uJCDqzFC3kDGzMvdEsEXlnNUV3UxhOkXE7Dy1lbxN4fyjQSlPUJ11MKd9CHm84pY+0ZGRUUGAa0A8iX5ZD1DInS1IoKd5UF8Dn5bnzC/qKjAADclIJ+Nk8fezsbCREFKQpQbJM/ExcjMwsquoYnsXpi3AEDdknMUSj+yAAAAAElFTkSuQmCC",
  wallpng : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAMAAADXT/YiAAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZ3bsYwAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjQ+jcx2AAAAJ0lEQVQYV2P4//8/IyMjkGQAMkAcEAvEADEZIAwgEysLoQ5JL8w8ALK7PNjpoF2NAAAAAElFTkSuQmCC",
  unitspng : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAMAAADXT/YiAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAszD0iAAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjQ+jcx2AAAAKUlEQVQYV2P4//8/AwMDiAQzQEwGIAMsDJWBS0DUgiUhuuDqkPTCzAMA4dos1Ep3neEAAAAASUVORK5CYII=",
  redirTargets : ["villageinfo","sendunits","getunits","market","getress","centermap","removeinfo","selectvillage","togglenofarm","coordlist"],
  redirTarget : "villageinfo",
  coordlist : "",
  timer : null,
  bbs: [],
  queue: [],
  minBarMax : 0,
  twmap: null,
  lnk: null,
  redirHref: "",
  bbcode : false,
  addEvents : true,
  villageOwners: null,
  villageGroups: null,
  villageGroup : 0,
  flashItem: null,
  toFlash: null,
  flashTimer: null,
  flashOdd: false,
  statsPopup: null,
  busy: false,
  mocX : 0,
  mocY : 0,
  myVillages: {},
  groupsOnTopo: true,
  doIt : function() {
    if( lib.params.screen == "map" ) {
      Map.redirTarget = lib.storage.getValue("redirTarget"+ownPid, "villageinfo");
      Map.coordlist = lib.storage.getValue("coordlist"+ownPid, "");
      Map.bbcode = lib.storage.getValue("bbcode"+ownPid,false);
      Map.groupsOnTopo = lib.storage.getValue("groupsOnTopo"+ownPid, true);
      cleanUp();
      Map.init();
    }
  },
  init : function() {
    var villages = lib.storage.listValues( /^vil(\d+)$/ );
    for( var i = 0; i < villages.length; i++ ) {
      var v = new MyVillage(villages[i][1]);
      Map.myVillages[v.id] = v;
    }
    Map.simChurches = lib.storage.getValue("simChurches",true);
    Map.churches = lib.storage.getValue("churches",[]); 
    Map.twmap = win.TWMap;
    Map.twmap.mapHandler.fmSpawnSector = Map.twmap.mapHandler.spawnSector;
    Map.twmap.mapHandler.spawnSector = Map.spawnSector;
    Map.twmap.popup.fmHandleMouseMove = Map.twmap.popup.handleMouseMove;
    Map.twmap.popup.handleMouseMove = Map.handleMouseMove;
    if( Settings.settings.map.groupsOnTopo ) {
      Map.twmap.minimapHandler.fmLoadSector = Map.twmap.minimapHandler.loadSector;
      Map.twmap.minimapHandler.loadSector = Map.mmLoadSector;
    }
    Map.otherOvl = lib.storage.getValue("otherOvl"+ownPid,"");
    Map.ownOvl = lib.storage.getValue("ownOvl"+ownPid);
    
    Map.lnk = $("map");
    Map.lnk.addEventListener("contextmenu", Map.onContextMenu, false);
    Map.lnk.addEventListener("click", Map.redirectLink, false);

    Map.moveForms();
    var container = $("map_topo");
    var tab = $("dsfm_topo_container");
    if( serverInfo.buildingInfo.church ) {
      tab.rows[2].cells[0].appendChild(ce("br"));
      var input = tab.rows[2].cells[0].appendChild(ce("input"));
      input.type = "checkbox";
      input.checked = lib.storage.getValue("simChurches",true);
      input.addEventListener("click", Map.toggleChurches, false);
      input.id = "dsfm_simchurches";
      var a = tab.rows[2].cells[0].appendChild(ce("a"));
      a.href = "#";
      a.textContent = texts[lib.lang].gui.simChurches;
      a.addEventListener("click", Map.showChurches, false);
    }
    var tab = container.insertBefore(ce("table"),tab.nextSibling);
    tab.width = "100%";
    tab.id="dsfm_options";
    var row;
    var cell;
    var thead = tab.appendChild(ce("thead"));
    row = thead.insertRow(0);
    cell = row.appendChild(ce("th"));
    cell.colSpan = 2;
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.title + texts[lib.lang].gui.optionsSuffix));
    var a = cell.appendChild(ce("a"));
    a.href = "#";
    a.textContent = String.fromCharCode(160,9650);
    a.name = "mapopts";
    a.addEventListener("click", Map.toggleTable, false );
    var body = tab.appendChild(ce("tbody"));
    if( !lib.storage.getValue("mapopts"+ownPid,true) )
      lib.fireEvent(a,"click");
    row = thead.insertRow(-1);
    cell = row.insertCell(0);
    cell.innerHTML = texts[lib.lang].gui.ovlCoords;
    cell.style.verticalAlign="top";
    cell = row.insertCell(1);
  //  cell.innerHTML = ' <input type="text" id="dsfm_coords" readOnly="readOnly" onkeyup="this.select();" style="border:0; background-color:inherit;"/>'; // width:0; height:0; border:0;
    var input = cell.appendChild(ce("input"));
    input.id = "dsfm_coords";
    input.readOnly = true;
    input.style.border = 0;
    input.style.backgroundColor = "inherit";
    if( Settings.settings.map.redirActive ) {
      var div = cell.appendChild(ce("div"));
      div.id = "dsfm_coordlist_div";
      div.style.width = "200px";
      div.style.border = "1px solid #804000";
      div.style.display = Map.redirTarget == "coordlist" ? "" : "none";
      var input = div.appendChild(ce("textarea"));
      input.value = Map.coordlist.replace(";","\n");
      input.style.height = Math.max(12,Map.coordlist.split("\n").length*12)+"px";
      div.height = input.style.height;
      input.id = "dsfm_coordlist";
      input.setAttribute("onfocus","this.select();");
      input.readOnly = true;
      input.style.width = "180px";
      input.style.fontSize = "xx-small";
      input.style.border = "0";
      input.style.backgroundColor = "inherit";
      var a = div.appendChild(ce("a"));
      a.href = "javascript:;";
      a.style.fontWeight = "bold";
      a.style.color = "red";
      a.style.verticalAlign = "top";
      a.innerHTML = "X";
      a.addEventListener("click", function() { 
          var coordlist = lib.storage.getValue("coordlist"+ownPid,"");
          lib.storage.deleteValue("coordlist"+ownPid); 
          var ta = $("dsfm_coordlist"); 
          ta.value = ""; 
          ta.style.height = "12px"; 
          var res = coordlist.match(/\d{1,3}\|\d{1,3}/g);
          for( var i = 0; i < res.length; i++ ) {
            var coords = res[i].split("|");
            $("dsfm_overlay_"+coords[0]+"_"+coords[1]).style.backgroundColor = "";
          }
        }, false );
      input = cell.appendChild(ce("input"));
      input.type="checkbox";
      input.id="dsfm_bbcode";
      input.checked = Map.bbcode;
      input.addEventListener("click",Map.toggleBBCode, false);
      cell.appendChild(document.createTextNode(texts[lib.lang].gui.bbcode));
      row = body.insertRow(-1);
      cell = row.insertCell(0);
      cell.innerHTML = texts[lib.lang].gui.redirTitle;
      cell = row.insertCell(1);
      var select = cell.appendChild(ce("select"));
      select.id = "dsfm_redirTarget";
      for( var i = 0; i < Map.redirTargets.length; i++ ) {
        var txt = texts[lib.lang].gui["redir_"+Map.redirTargets[i]] + HotKeys.add("map",Map.redirTargets[i], Map.redirTargetChanged);
        select.options[i] = new Option(txt,Map.redirTargets[i],false,false);
      }
      select.value = Map.redirTarget;
      select.addEventListener("change", Map.redirTargetChanged, false );
    }

    row = body.insertRow(-1);
    cell = row.insertCell(0);
    cell.innerHTML = texts[lib.lang].gui.ownVillage;
    cell = row.insertCell(1);
    select = cell.appendChild(ce("select"));
    select.id = "dsfm_ownOvl";
    var val = lib.storage.getValue("ownOvl"+ownPid,"None");
    var options = ["Groups","Points","Name","Resource","Units","Coords","Def"];
    options.sort(Map.compareOvlOpt);
    select.options[0] = new Option(texts[lib.lang].gui["ovlSelect"] + HotKeys.add( "map", "ownNone", Map.ownOvlChanged ),"None", false, false );
    for( var i = 0; i < options.length; i++ )
      select.options[i+1] = new Option(texts[lib.lang].gui["ovl"+options[i]]+HotKeys.add( "map", "own"+options[i], Map.ownOvlChanged ), options[i], false, false);
    select.value = val;
    select.addEventListener("change", Map.ownOvlChanged, false);
    row = body.insertRow(-1);
    row.id = "dsfm_unitOptions";
    cell = row.insertCell(0);
    cell.style.verticalAlign = "top";
    cell.innerHTML = texts[lib.lang].gui.ovlUnits;
    cell = row.insertCell(1);
    var unitSum = lib.storage.getValue("unitSum"+ownPid,1);
    input = cell.appendChild(ce("input"));
    input.type="checkbox";
    input.checked = unitSum & 1;
    input.value = 1;
    input.addEventListener("click",Map.updateUnitDivs,false);
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.unitsHome));
    cell.appendChild(ce("br"));
    input = cell.appendChild(ce("input"));
    input.type="checkbox";
    input.value = 2;
    input.checked = unitSum & 2;
    input.addEventListener("click",Map.updateUnitDivs,false);
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.unitsThere));
    cell.appendChild(ce("br"));
    input = cell.appendChild(ce("input"));
    input.type="checkbox";
    input.value = 4;
    input.checked = unitSum & 4;
    input.addEventListener("click",Map.updateUnitDivs,false);
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.unitsAway));
    cell.appendChild(ce("br"));
    input = cell.appendChild(ce("input"));
    input.type="checkbox";
    input.value = 8;
    input.checked = unitSum & 8;
    input.addEventListener("click",Map.updateUnitDivs,false);
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.unitsMoving));

    var ownOvl = lib.storage.getValue("ownOvl"+ownPid,"None");
    var otherOvl = lib.storage.getValue("otherOvl"+ownPid,"None");
    $("dsfm_unitOptions").style.display = $("dsfm_ownOvl").value == "Units" ? "":"none";
    
    row = body.insertRow(-1);
    cell = row.insertCell(0);
    cell.innerHTML = texts[lib.lang].gui.otherVillage;
    cell = row.insertCell(1);
    select = cell.appendChild(ce("select"));
    select.id = "dsfm_otherOvl";
    options = [ "Points","Name","Ally","FarmInfo","Coords","Player"];
    select.options[0] = new Option(texts[lib.lang].gui["ovlSelect"]+HotKeys.add("map","otherNone",Map.otherOvlChanged),"None",false,false);
    options.sort(Map.compareOvlOpt);
    for( var i = 0; i < options.length; i++ )
      select.options[i+1] = new Option(texts[lib.lang].gui["ovl"+options[i]]+HotKeys.add("map","other"+options[i], Map.otherOvlChanged),options[i],false,false);
    select.value = otherOvl;
    select.addEventListener("change", Map.otherOvlChanged, false);
    row = body.insertRow(-1);
    cell = row.insertCell(0);
    cell.colSpan = 2;
    input = cell.appendChild(ce("input"));
    input.type = "checkbox";
    input.checked = useeq;
    input.id = "dsfm_useeq";
    input.addEventListener("click", function() { useeq = this.checked; lib.storage.setValue("useeq"+ownPid,useeq); Map.reCreateOverlays(false);  }, false );
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.usequotient+HotKeys.add("map","eq", "dsfm_useeq", "click")));

    row = body.insertRow(-1);
    cell = row.insertCell(0);
    cell.colSpan = 2;
    input = cell.appendChild(ce("a"));
    input.id = "dsfm_stats";
    input.href = "javascript:;";
    input.innerHTML = "&raquo; " + texts[lib.lang].gui.statsTitle[0] + Settings.settings.map.sumHours + texts[lib.lang].gui.statsTitle[1] + HotKeys.add("map","stats","dsfm_stats","click");
    input.addEventListener("click", Map.showStats, false );
    row = body.insertRow(-1);
    cell = row.insertCell(0);
    cell.colSpan = 2;
    input = cell.appendChild(ce("a"));
    input.href = "javascript:;";
    input.id = "dsfm_addbb2fl";
    input.innerHTML = "&raquo; " + texts[lib.lang].gui.addbb2fl + HotKeys.add("map","addbb2fl","dsfm_addbb2fl","click");
    input.addEventListener("click", Map.addbb2fl, false );

    Map.statsPopup = new lib.Popup("statspopup",texts[lib.lang].gui.statsTitle[0] + Settings.settings.map.sumHours + texts[lib.lang].gui.statsTitle[1],true,300,200);
    var html = '<table class="vis" style="width:100%;">';
    html += '<tr><td><img src="graphic/holz.png" border="0" alt=""/> '+texts[lib.lang].resources.wood+':</td><td id="dsfm_sumwood" style="text-align:right;"></td></tr>';
    html += '<tr><td><img src="graphic/lehm.png" border="0" alt=""/> '+texts[lib.lang].resources.stone+':</td><td id="dsfm_sumstone" style="text-align:right;"></td></tr>';
    html += '<tr><td><img src="graphic/eisen.png" border="0" alt=""/> '+texts[lib.lang].resources.iron+':</td><td id="dsfm_sumiron" style="text-align:right;"></td></tr>';
    html += '<tr><td colspan="2"><div style="width:100%; height:2px; border-top:1px solid black; border-bottom:1px solid black"/></td></tr>';
    html += '<tr><td><img src="graphic/res.png" border="0" alt=""/> '+texts[lib.lang].gui.sum+':</td><td id="dsfm_sumtotal" style="text-align:right;"></td></tr>';
    html += '<tr><td colspan="2" style="text-align:right"><span id="dsfm_sumreports"></span> '+texts[lib.lang].gui.reports+'</td></tr>';
    HotKeys.add("common", "close", Map.statsPopup.hide);
    Map.statsPopup.content.innerHTML = html;

//    $("info").style.zIndex = 100;
    container = $("info_content");
    var row = container.insertRow(container.rows.length);
    row.id = "dsfm_popupinfo_row";
    var cell = row.insertCell(0)
    cell.colSpan=3;
    container = cell.appendChild(ce("table"));
    container.style.width="100%";
    container.style.border = "1px solid rgb(222, 211, 185)";
    container.className="vis";
    container.id="dsfm_popupinfos";

    row = container.insertRow(0);
    var cell = row.appendChild(ce("th"));
    cell.colSpan=2;
    cell.innerHTML = texts[lib.lang].gui.infoTitle;

    var popupLines = [ "resources", "mining", "buildings", "unitsin", "unitsout", "loyalty" ];
    for( i = 0; i < popupLines.length; i++ ) {
      row = container.insertRow(container.rows.length);
      row.style.display = "none";
      row.id = "dsfm_"+popupLines[i]+"_row";
      cell = row.insertCell(0)
      cell.style.whiteSpace="nowrap";
      cell.appendChild(document.createTextNode(texts[lib.lang].gui[popupLines[i]]));
      cell.appendChild(ce("br"));
      var age = cell.appendChild(ce("span"));
      age.style.fontSize="xx-small";
      age.id = "dsfm_"+popupLines[i]+"_age";
      age.style.display = "none";
      row.insertCell(1).id="dsfm_"+popupLines[i];
    }
    
    if( Settings.settings.map.groupsOnTopo ) {
      var before = $("politicalmap").parentNode;
      input = before.parentNode.insertBefore(ce("input"),before);
      input.checked = lib.storage.getValue("groupsOnTopo"+ownPid, true);
      input.type = "checkbox";
      input.addEventListener("click", Map.toggleTopo, false );
      before.parentNode.insertBefore(document.createTextNode(texts[lib.lang].gui.showOwnGroups),before);
      before.parentNode.insertBefore(ce("br"),before);
    }

    Map.addVillageGroups();
    Map.addOwnGroupEdit();
    bindColorPicker();
    setInterval(Map.watchMap,1000);
  },
  moveForms : function() {
    var content = $("content_value");
    var h2 = content.getElementsByTagName("h2")[0];
    if( h2 ) {
      // Kontinent - Überschrift in Tabele verfrachten
      var ktab = content.insertBefore(ce("table"),h2);
      var row = ktab.insertRow(-1);
      row.style.verticalAlign="top";
      var cell = row.insertCell(-1);
      cell.appendChild(h2);
      cell.style.verticalAlign = "bottom";
      // Karte zentrieren-Tab hinter in K-Tabelle
      content = $("map_topo");
      var form = content.getElementsByTagName("form")[0];
      cell = row.insertCell(-1);
      cell.appendChild(form);
      // Tabelle einzeilig machen
      var tab = form.getElementsByTagName("table")[0];
      tab.rows[0].appendChild(tab.rows[1].cells[0]);
      tab.rows[0].appendChild(tab.rows[1].cells[0]);
      tab.deleteRow(1);
      // Neue Tabelle für Minimap erstellen
      tab = content.insertBefore(ce("table"),content.firstChild);
      tab.className = "vis";
      tab.id = "dsfm_topo_container";
      //tab.style.border = "1px solid #804000";
      tab.style.width = "100%";
      var head = tab.appendChild(ce("thead"));
      row = head.insertRow(-1);
      cell = row.appendChild(ce("th"));
      cell.appendChild(document.createTextNode(texts[lib.lang].gui.topo));
      var a = cell.appendChild(ce("a"));
      a.href = "#";
      a.textContent = String.fromCharCode(160,9650);
      a.addEventListener("click", Map.toggleTable, false );
      a.name = "topo";
      var body = tab.appendChild(ce("tbody"));
      if( !lib.storage.getValue("topo"+ownPid,true) )
        lib.fireEvent(a,"click");
      row = body.insertRow(-1);
      cell = row.insertCell(-1);
      cell.appendChild(content.getElementsByTagName("div")[0]);
      row = body.insertRow(-1);
      cell = row.insertCell(-1);
      var node = tab.nextSibling;
      while( node.nodeName.toUpperCase() != "TABLE" ) {
        var nextNode = node.nextSibling;
        cell.appendChild(node);
        node = nextNode;
      }
     
      // Kartengröße in K-Tab
      ktab.rows[0].appendChild(node.rows[1].cells[0]);
      content.removeChild(node);

      node = cell.lastChild;
      while( node.nodeName.toUpperCase() != "LABEL" ) {
        nextNode = node.previousSibling;
        cell.removeChild(node);
        node = nextNode;
      }
    }
  },
  toggleTable : function(e) {
    var disp = "";
    if( this.textContent == String.fromCharCode(160,9650) ) {
      this.textContent = String.fromCharCode(160,9660);
      disp = "none";
    }
    else
      this.textContent = String.fromCharCode(160,9650);
    lib.storage.setValue(this.name+ownPid,disp == "" ? true : false);
    getByTagName(this,"table","parentNode").tBodies[0].style.display = disp;
  },
  handleMouseMove : function(e) {
    var pos = Map.twmap.map.coordByEvent(e);
    var x = pos[0];
    var y = pos[1];
    Map.twmap.popup.fmHandleMouseMove(e);
    Map.lnk.href = Map.redirHref;
    if( x != Map.mocX || y != Map.mocY ) {
      var input = $("dsfm_coords"); 
      var coordidx = x*1000+y;
      var village = Map.twmap.villages[coordidx];
      if( village ) {
        switch( Map.redirTarget ) {
          case "villageinfo":
            Map.lnk.href =  lib.createLink("info_village", "id", village.id, false);
            break;
          case "sendunits":
            Map.lnk.href = lib.createLink("place", "mode", "command", "target", village.id, false);
            break;
          case "getunits":
            var href = lib.createLink("place", "mode", "command", "target", curVillage.id, false);
            Map.lnk.href = href.replace("village="+curVillage.id,"village="+village.id);
            break;
          case "market":
            Map.lnk.href = lib.createLink("market", "mode", "send", "target", village.id, false);
            break;
          case "getress":
            var href = lib.createLink("market", "mode", "send", "target", curVillage.id, false);
            Map.lnk.href = href.replace("village="+curVillage.id,"village="+village.id);
            break;
          case "centermap":
            Map.lnk.href = lib.createLink("map", "x", x, "y", y, false);
            break;
          case "removeinfo":
            Map.lnk.href = "javascript:;";
            break;
          case "selectvillage":
            var href = lib.createLink("map", "x", x, "y", y, false);
            Map.lnk.href = href.replace("village="+curVillage.id,"village="+village.id);
            break;
          case "coordlist":
            $("dsfm_coordlist_div").style.display = "block";
          case "togglenofarm":
          case "delattmark":
            Map.lnk.href = "javascript:;"
            break;
        }
        Map.redirHref = Map.lnk.href;
        input.value = x+"|"+y; 
        if( Map.bbcode ) 
          input.value = "[coord]"+input.value+"[/coord]"; 
        input.select();
        setTimeout(function() { Map.setPopupInfos(pos); }, 0);
      }
      else {
        input.value = "";
        Map.lnk.href = "#";
      }
      Map.mocX = x;
      Map.mocY = y;
    }
  },
  ownOvlChanged : function() {
    var select = $("dsfm_ownOvl");
    if( arguments.length == 2 ) {
      for( var hk in Settings.hotKeys.map ) {
        if( Settings.hotKeys.map[hk].keyCode == arguments[0].keyCode && Settings.hotKeys.map[hk].modifier == arguments[1].val )
          select.value = hk.substring(3);
      }
    }
    lib.storage.setValue("ownOvl"+ownPid,select.value);
    Map.ownOvl = select.value;
    $("dsfm_unitOptions").style.display = select.value == "Units" ? "":"none";
    Map.reCreateOverlays(true);
  },
  otherOvlChanged : function() {
    var select = $("dsfm_otherOvl");
    if( arguments.length == 2 ) {
      for( var hk in Settings.hotKeys.map ) {
        if( Settings.hotKeys.map[hk].keyCode == arguments[0].keyCode && Settings.hotKeys.map[hk].modifier == arguments[1].val )
          select.value = hk.substring(5);
      }
    }
    lib.storage.setValue("otherOvl"+ownPid,select.value);
    Map.otherOvl = select.value;
    Map.reCreateOverlays(false);
  },
  reCreateOverlays : function(own) {
    var start = new Date().getTime();
    for( var idx in Map.twmap.villages ) {
      var village = Map.twmap.villages[idx];
      if( (own && village.owner == ownPid) || (!own && village.owner != ownPid) ) {
        var y = idx % 1000;
        var x = ( idx - y ) / 1000;
        Map.createOverlay(x,y);
      }
    }
  },
  createOverlays : function() {
    var start = new Date().getTime();
    Map.ts = lib.getTime();
    lib.debug.log( "createOverlays:" + Map.queue.length );
    while( Map.queue.length > 0 ) {
      var tile = Map.queue.shift();
      Map.createOverlay(tile.x,tile.y);
    }
    Map.busy = false;
    lib.debug.log( "Overlays created in " + (new Date().getTime() - start) + "ms" );
    Map.updateVillageGroups();
    if( Settings.settings.map.rememberPos && curVillage.id ) {
      curVillage.map.timestamp = Map.ts;
      curVillage.map.x = Map.twmap.pos[0];
      curVillage.map.y = Map.twmap.pos[1];
      curVillage.save();
    }
  },
  createOverlay : function(x,y) {
    var village = Map.twmap.villages[x*1000+y];
    var el = $("dsfm_overlay_"+x+"_"+y);
    if( Map.coordlist.indexOf(x+"|"+y) > -1 )
      el.style.backgroundColor = "rgba(127,255,255,0.4)";
    if( el ) {
      el.innerHTML = "";
      if( village.owner == ownPid ) {
        var data = Map.myVillages[village.id];
        switch( Map.ownOvl ) {
          case "Groups":
            var div = el.appendChild(ce("div"));
            div.style.position = "absolute";
            div.style.width = Map.twmap.map.scale[0]+"px";
            div.style.height = (Map.twmap.map.scale[1]-10)+"px"
            div.style.top = "10px";
            div.style.left = "0px";
            div.style.overflow = "hidden";
            for( var g = 0; g < Settings.userGroups.length; g++ ) {
              for( var l = 0; l < data.groups.list.length; l++ ) {
                if( Settings.userGroups[g].name == data.groups.list[l] ) {
                  if( Settings.userGroups[g].show ) {
                    var img = div.appendChild(ce("img"));
                    img.src = Settings.userGroups[g].icon?Settings.userGroups[g].icon:'graphic/map/emtpy.png';
                    img.style.border = "0px solid black";
                    img.style.backgroundColor = Settings.userGroups[g].color;
                    img.style.width = "14px";
                    img.style.height = "14px";
                    div.appendChild(ce("wbr"));
                  }
                  break;
                }
              }
            }
            break;
          case "Points":
            el.appendChild(Map.createSingleTextOverlay(village.points,"white"));
            break;
          case "Name":
              if( village.owner > 0 )
                el.appendChild(Map.createMultiTextOverlay(village.name,"rgb(240,200,0)"));
            break;
          case "Coords":
            el.appendChild(Map.createSingleTextOverlay(x+"|"+y,"white",""));
            break;
          case "Resource":
            if( data.res.timestamp > 0 ) {
              var age = (Map.ts - data.res.timestamp) / 3600;
              var ageOpacity = 1;
              if( age > 24 )
                ageOpacity = 1-(age/48);
              var size = [ 0, 0, 0 ];
              var barMax = Math.max(data.res.storage, Map.minBarMax);
              var barWidth = Map.twmap.map.scale[0] - 10;
              var r = 0;
              for( var res in resInfos )
                size[r++] = Math.floor(barWidth * data.res[res] / barMax);
              el.appendChild(Map.createResBarDiv(size));
            }
            break;
          case "Units":
            if( data.units.timestamp > 0 ) {
              var unitSum = lib.storage.getValue("unitSum"+ownPid,1);
              var age = (Map.ts - data.units.timestamp) / 3600;
              var ageOpacity = 1;
              if( age > 24 )
                ageOpacity = 1-(age/48);
              var html = '<div style="position:absolute; border: 1px solid #804000; width:'+(Map.twmap.map.scale[0])+'px; height:'+(Map.twmap.map.scale[1]-14)+'px; top:10px; left:0px; background-color:rgba(255,255,255,0.2); opacity:'+ageOpacity+'">';
              var anz = serverInfo.unitAnz;
              if( serverInfo.unitInfo.militia )
                anz--;
              var barWidth = Math.floor((Map.twmap.map.scale[0] - 2) / anz);
              var left = Math.floor(((Map.twmap.map.scale[0]-2) - barWidth * anz) / 2);
              var height = Map.twmap.map.scale[1]-16;
              for( var unit in serverInfo.unitInfo ) {
                if( unit != "militia" ) {
                  var h = Math.floor(height * Math.min(data.getUnitSum(unit,unitSum),Settings.farmUnitCfg.graphMax[unit]) / Settings.farmUnitCfg.graphMax[unit]);
                  html += '<div style="position:absolute; left:'+left+'px; width:'+(barWidth-2)+'px; background-color:'+Settings.colors.units[unit]+'; height:'+h+'px; border:1px solid white; top:'+(height-h)+'px;" title="'+unit+'"></div>';
                  left += barWidth;
                }
              }
              html += "</div>";
              el.innerHTML = html;
            }
            break;
          case "Def":
            var def = {defense: 0, defense_cavalry: 0, defense_archer: 0 };
            var html = "";
            for( var unit in serverInfo.unitInfo ) {
              for( var key in def ) {
                def[key] += data.units.there[unit] * serverInfo.unitInfo[unit][key];
              }
            }
            for( var key in def ) {
              var p = Math.min(def[key]*100/Settings.settings.map[key],100);
              Settings.settings.storage[key+"ColFloating"] = true;
              var cols = Storage.getColors(key,p)
              html += '<div style="position:relative; text-align:right; font-size:xx-small; font-weight:bold; top:0px; left:10px; background-color:' + cols.background.toString(true,0.4) + '; color:'+cols.text+'; width:'+(Map.twmap.map.scale[0]-12)+'px;">';
              html += lib.formatNumber(def[key],true,true,2) + "</div>";
            }
            el.innerHTML = html;
            break;
        }
      }
      else {
        var coords = x+"_"+y;
        var data = new Village( coords );
        var img = $("map_village_"+village.id);
        var bonus = 0;
        if( village.bonus ) {
          bonus = village.bonus[1].match(/bonus\/([^\.]+)\.png/);
          if( bonus )
            bonus = boni[bonus[1]];
        }
        color = "#969696";
        if( img.style.backgroundColor )
          color = new Color(img.style.backgroundColor).toString();
        data.updateMapData(bonus,color);
        var re = new RegExp(coords);
        var hasAtt = re.test(atts);
        var isNoFarm = re.test(nofarms);
        if( isNoFarm ) {
          var img = el.appendChild(ce("img"));
          img.id = "dsfm_stop_"+x+"_"+y;
          img.style.position = "absolute";
          img.style.left = ((Map.twmap.map.scale[0] - 15) / 2)+"px";
          img.style.top = ((Map.twmap.map.scale[1] - 15) / 2)+"px";
          img.src = Map.nofarmpng;
          //img.style.zIndex = "6";
        }
        if( hasAtt ) {
          var icon = Map.twmap.commandIcons[village.id];
          if( !icon || ( icon.length == 1 && icon[0].img == "return" ) ) {
            var img = el.appendChild(ce("img"));
            img.id = "dsfm_att_"+x+"_"+y;
            img.style.position = "absolute";
            img.style.left = ((Map.twmap.map.scale[0] - 15) / 2)+"px";
            img.style.top = ((Map.twmap.map.scale[1] - 15) / 2)+"px";
            img.src = Map.attentionpng;
            img.style.zIndex = "7";
          }
        }
        switch( Map.otherOvl ) {
          case "Points":
            el.appendChild(Map.createSingleTextOverlay(village.points,"white"));
            break;
          case "Mood":
            el.appendChild(Map.createSingleTextOverlay(village.mood+"%","white"));
            break;
          case "Name":
              if( village.owner > 0 )
                el.appendChild(Map.createMultiTextOverlay(village.name,"rgb(240,200,0)"));
            break;
          case "Ally":
            if( village.owner > 0 && Map.twmap.players[village.owner].ally > 0 )
                el.appendChild(Map.createMultiTextOverlay(Map.twmap.allies[Map.twmap.players[village.owner].ally].name,"rgb(240,200,0)"));
            break;
          case "Coords":
            el.appendChild(Map.createSingleTextOverlay(x+"|"+y,"white",""));
            break;
          case "Player":
            if( village.owner > 0 )
              el.appendChild(Map.createMultiTextOverlay(Map.twmap.players[village.owner].name,"rgb(240,200,0)"));
            break;
          case "FarmInfo":
            if( Settings.settings.map.showPoints ) {
              var div = el.appendChild(ce("div"));
              div.style.position = "relative";
              div.style.top = "0px";
              div.style.left = "10px";
              div.style.color = "rgb(240,240,240)";
              div.style.width = (Map.twmap.map.scale[0]-10)+"px";
              div.style.height = "5px";
              div.style.fontSize = "xx-small";
              div.innerHTML = lib.formatNumber(village.points,true,true);
            }
            var age = (Map.ts - (data.lastreport.timestamp == 0 ? data.res.timestamp : data.lastreport.timestamp) ) / 3600;
            var ageOpacity = 1;
            if( age > Settings.settings.map.minAgeTransparency )
              ageOpacity = 1-(age/(Settings.settings.misc.reportMaxAge*24));
            if( ageOpacity < 0.2 )
              ageOpacity = 0.2;
            div = el.appendChild(ce("div"));
            div.style.position = "relative";
            div.style.top = "-5px";
            div.style.left = "0px";
            div.style.color = "rgb(240,240,240)";
            div.style.width = (Map.twmap.map.scale[0])+"px";
            div.style.height = (Map.twmap.map.scale[1])+"px";
            div.style.fontSize = "xx-small";
            div.style.opacity = ageOpacity;
            if( Settings.settings.map.showWall && (data.buildings.timestamp>0 && data.buildings.wall.level > 0 || data.unitsin.hasUnits || data.unitsout.hasUnits) ) {
              var img = div.appendChild(ce("img"));
              img.style.position = "relative";
              if( data.unitsin.hasUnits || data.unitsout.hasUnits )
                img.src = Map.unitspng;
              else
                img.src = Map.wallpng;
            }
            if( data.res.timestamp > 0 && (Settings.settings.map.showRessis || Settings.settings.map.showBars) ) {
              var color;
              var barWidth = Map.twmap.map.scale[0] - 10;
              if( data.buildings.timestamp > 0 ) {
                var size = new Array( 0, 0, 0, 0 );
                var f = useeq ? Math.max(Settings.settings.place.minEQ,data.eq) / 100 : 1;
                var max = serverInfo.getStorageSize(data) - serverInfo.getHideSize(data.buildings.hide.level);
                var barMax = Math.max(max, Map.minBarMax);
                var cur = Math.round(serverInfo.getRessource(data, "wood")*f);
                var sum = cur;
                size[0] = Math.floor(barWidth * cur / barMax);
                cur = Math.round(serverInfo.getRessource(data, "stone")*f);
                sum += cur;
                size[1] = Math.floor(barWidth * cur / barMax);
                cur = Math.round(serverInfo.getRessource(data, "iron" )*f);
                sum += cur;
                size[2] = Math.floor(barWidth * cur / barMax);
                var sumOpacity = Settings.settings.map.opacityMin / 100.0;
                var sumOpacity =  Math.min(sumOpacity + (1.0 - sumOpacity/100) * (sum / Settings.settings.map.opacityMaxRes), 1);
                if( sum > 1000 )
                  sum = Math.round(sum / 100) / 10 + "k";
                if( Settings.settings.map.playerColored && village.owner > 0 )
                  color = "rgba(255,100,100,"+sumOpacity+")";
                else
                  color = "rgba(255,255,255,"+sumOpacity+")";
                size[3] = Math.floor((Map.twmap.map.scale[0]-8) * Math.max(Settings.settings.place.minEQ,data.eq) / 100);
              }
              else if( data.res.timestamp > 0 ) {
                var sum = data.res["wood"] + data.res["stone"] + data.res["iron"];
                var sumOpacity = Settings.settings.map.opacityMin / 100.0;
                var sumOpacity =  Math.min(sumOpacity + (1.0 - sumOpacity/100) * (sum / Settings.settings.map.opacityMaxRes), 1);
                if( sum > 1000 )
                  sum = Math.round(sum / 100) / 10 + "k";
                if( Settings.settings.map.playerColored && village.owner > 0 )
                  color = "rgba(255,128,255,"+sumOpacity+")";
                else
                  color = "rgba(81,236,255,"+sumOpacity+")";
              }
              if( Settings.settings.map.showRessis ) {
                var resDiv = div.appendChild(ce("div"));
                resDiv.style.position = "absolute";
                resDiv.style.width = Map.twmap.map.scale[0]+"px";
                resDiv.style.height = "5px";
                resDiv.style.top = "10px";
                resDiv.style.fontSize = "xx-small";
                resDiv.style.fontWidht = "bold";
                resDiv.style.color = color;
                resDiv.innerHTML = sum;
              }
              if( Settings.settings.map.showBars && data.buildings.timestamp > 0 )
                div.appendChild(Map.createResBarDiv( size ));
            }
            break;
        }
        delete v;
      }    
    }
  },
  spawnSector : function(data, sector) {
    Map.twmap.mapHandler.fmSpawnSector(data,sector);
    var beginX = sector.x - data.x;
    var endX = beginX + Map.twmap.mapSubSectorSize;
    
    var beginY = sector.y - data.y;
    var endY = beginY + Map.twmap.mapSubSectorSize;

    for(var x in data.tiles) {
      x = parseInt(x);
      
      if( x < beginX || x >= endX )
        continue;
      for(var y in data.tiles[x]) {
        y = parseInt(y);
        if( y < beginY || y >= endY )
          continue;
        
        var xx = data.x+x;
        var yy = data.y+y;
        var v = Map.twmap.villages[(xx)*1000+yy];
        if( v ) {
          var el = document.createElement('div');
          el.style.position = 'absolute';
          el.style.zIndex = '5';
          el.id = "dsfm_overlay_"+xx+"_"+yy;
          el.style.width = Map.twmap.map.scale[0]+"px";
          el.style.height = Map.twmap.map.scale[1]+"px";
          Map.queue.push( { x: xx, y: yy, el: el, village: v } );
          sector.appendElement(el, x-beginX, y-beginY);
        } 
      }
    }
    if( !Map.busy ) {
      Map.busy = true;
      setTimeout(Map.createOverlays,0);       
    }
  },
  mmLoadSector : function(sector) {
    Map.twmap.minimapHandler.fmLoadSector(sector);
    var end_x = sector.x + Map.twmap.minimap.sectorSize;
    var end_y = sector.y + Map.twmap.minimap.sectorSize;
    if( serverInfo.buildingInfo.church ) {
      var canvas = ce("canvas");
      canvas.style.position = "absolute";
      canvas.width = "225";
      canvas.height = "225";
      canvas.style.zIndex = 11;
      canvas.className = "dsfm_topo_canvas";
      canvas.style.display = Map.simChurches ? "":"none";
      canvas.id = "dsfm_topo_canvas_"+sector.sx+"_"+sector.sy;
      setTimeout(function() { Map.createTopoChurchOverlay(canvas,sector); },0);
      sector.appendElement(canvas,0,0);
    }
    
    var div = ce("div");
    div.style.position = "absolute";
    div.style.width = "225px";
    div.style.height = "225px";
    div.style.zIndex = 10;
    div.className = "dsfm_topo_overlay";
    if( !Map.groupsOnTopo ) 
      div.style.display = "none";
    if( Settings.settings.map.shadowTopo )
      div.style.backgroundColor = "rgba(0,0,0,0.4)";
    sector.appendElement(div,0,0);
    setTimeout(function() { Map.createTopoGroupOverlay(div,sector); },0);
  },
  createTopoGroupOverlay : function(divGroups, sector) {
    var groupColors = { };
    for( var g = 0; g < Settings.userGroups.length; g++ ) {
      if( Settings.userGroups[g].show ) {
        groupColors[Settings.userGroups[g].name] = Settings.userGroups[g].color;
      }
    }
    for( var key in Map.myVillages ) {
      var village = Map.myVillages[key];
      if( village.coords.x >= sector.x && village.coords.x <= sector.x + Map.twmap.minimap.sectorSize && village.coords.y >= sector.y && village.coords.y <= sector.y + Map.twmap.minimap.sectorSize ) {
        for( var group in groupColors ) {
          if( village.groups.list.indexOf(group) > -1 ) {
            var div = divGroups.appendChild(ce("div"));
            div.style.position = "absolute";
            var left = ((village.coords.x - sector.x) * 5 + 1);
            var top = ((village.coords.y - sector.y) * 5 + 1);
            var size = 4;
            if( Settings.settings.map.topoBorderOwn ) {
              div.style.border = "1px solid yellow";
              left--;
              top--;
            }
            div.style.left = left + "px";
            div.style.top = top + "px";
            div.style.width = size + "px";
            div.style.height = size + "px";
            div.style.backgroundColor = groupColors[group];
            break;
          }
        }
      }
    }
  },
  createTopoChurchOverlay : function(canvas,sector) {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.lineWidth = 3;
    ctx.lineCap = "butt";
    ctx.lineJoin = "round";
    var churchOffs = [
      [0,-4,1,-4,1,-3,2,-3,3,-3,3,-2,4,-2,4,-1,4,0,5,0,5,1,4,1,4,2,4,3,3,3,3,4,2,4,1,4,1,5,0,5,0,4,-1,4,-2,4,-2,3,-3,3,-3,2,-3,1,-4,1,-4,0,-3,0,-3,-1,-3,-2,-2,-2,-2,-3,-1,-3,0,-3,0,-4],
      [0,-6,1,-6,1,-5,2,-5,3,-5,4,-5,4,-4,5,-4,5,-3,6,-3,6,-2,6,-1,6,0,7,0,7,1,6,1,6,2,6,3,6,4,5,4,5,5,4,5,4,6,3,6,2,6,1,6,1,7,0,7,0,6,-1,6,-2,6,-3,6,-3,5,-4,5,-4,4,-5,4,-5,3,-5,2,-5,1,-6,1,-6,0,-5,0,-5,-1,-5,-2,-5,-3,-4,-3,-4,-4,-3,-4,-3,-5,-2,-5,-1,-5,0,-5,0,-6],
      [0,-8,1,-8,1,-7,2,-7,3,-7,4,-7,4,-6,5,-6,6,-6,6,-5,7,-5,7,-4,7,-3,8,-3,8,-2,8,-1,8,0,9,0,9,1,8,1,8,2,8,3,8,4,7,4,7,5,7,6,6,6,6,7,5,7,4,7,4,8,3,8,2,8,1,8,1,9,0,9,0,8,-1,8,-2,8,-3,8,-3,7,-4,7,-5,7,-5,6,-6,6,-6,5,-6,4,-7,4,-7,3,-7,2,-7,1,-8,1,-8,0,-7,0,-7,-1,-7,-2,-7,-3,-6,-3,-6,-4,-6,-5,-5,-5,-5,-6,-4,-6,-3,-6,-3,-7,-2,-7,-1,-7,0,-7]
    ];
    for( var i = 0; i < Map.churches.length; i++ ) {
      var x = sector.x - 8;
      var y = sector.y - 8;
      var ex = sector.x + Map.twmap.minimap.sectorSize + 8;
      var ey = sector.y + Map.twmap.minimap.sectorSize + 8;
      if( Map.churches[i].x >= x && Map.churches[i].x <= ex && Map.churches[i].y >= y && Map.churches[i].y <= ey ) {
        ctx.strokeStyle = Map.churches[i].color;
        var x = (Map.churches[i].x - sector.x) * 5 + 0.5;
        var y = (Map.churches[i].y - sector.y) * 5 + 0.5;
        ctx.beginPath();
        ctx.moveTo(x+churchOffs[Map.churches[i].radius][0]*5,y+churchOffs[Map.churches[i].radius][1]*5);
        for( var j = 2; j < churchOffs[Map.churches[i].radius].length; j += 2)
          ctx.lineTo(x+churchOffs[Map.churches[i].radius][j]*5,y+churchOffs[Map.churches[i].radius][j+1]*5);
        ctx.closePath();
        ctx.stroke();
      }
    }
  },
  reCreateTopoOverlays : function() {
    for( var key in Map.twmap.minimap._loadedSectors ) {
      var canvas = $("dsfm_topo_canvas_"+ Map.twmap.minimap._loadedSectors[key].sx + "_" + Map.twmap.minimap._loadedSectors[key].sy);
      Map.createTopoChurchOverlay(canvas,Map.twmap.minimap._loadedSectors[key]);
    }
  },
  createSingleTextOverlay : function(text,color) {
    var div = ce("div");
    div.style.position = "relative";
    div.style.width = Map.twmap.map.scale[0]+"px";
    div.style.height = "10px";
    div.style.top = (Map.twmap.map.scale[1] / 2 - 5)+"px";
    div.style.overlay = "hidden";
    div.style.fontSize = "xx-small";
    div.style.fontWeight = "bold";
    div.style.color = color;
    div.style.textAlign = "center";
    div.style.verticalAlign = "middle";
    div.innerHTML = text;
    return div;
  },
  createMultiTextOverlay : function(text,color) {
    var div = ce("div");
    div.style.position = "relative";
    div.style.width = (Map.twmap.map.scale[0]-10)+"px";
    div.style.height = Map.twmap.map.scale[1]+"px";
    div.style.left = "10px";
    div.style.overlay = "hidden";
    div.style.fontSize = "xx-small";
    div.style.color = color;
    div.innerHTML = escapeHTML(text,"<wbr/>");
    return div;
  },
  createResBarDiv : function(size) {
    var div = ce("div");
    div.style.position = "absolute";
    div.style.width = (Map.twmap.map.scale[0]-6)+"px";
    div.style.height = (Map.twmap.map.scale[1]-24)+"px";
    div.style.top = "22px";
    div.style.left = "3px";
    div.style.border = "1px solid #804000";
    div.style.backgroundColor = "rgba(255,255,255,0.2)";
    var colors = ["#9E733F", "#963306", "#8E8787" ]
    for( var i = 0; i < 3; i++ ) {
      var row = div.appendChild(ce("div"));
      row.style.position = "relative";
      row.style.border = "1px solid rgba(255,255,255,0.6)";
      row.style.top = "1px";
      row.style.left = "1px";
      row.style.width = size[i]+"px";
      row.style.height = "2px";
      row.style.backgroundColor = colors[i];
    }
    if( size.length == 4 )  {
      row = div.appendChild(ce("div"));
      row.style.position = "absolute";
      row.style.top = "0px";
      row.style.left = size[3]+"px";
      row.style.width = "1px";
      row.style.height = "14px";
      row.style.backgroundColor = "#00EE00";
    }
    return div;
  },
  showStats : function() {
    var minTS = lib.getTime();
    minTS -= Settings.settings.map.sumHours * 3600;
    var beute = doCleanUp("beute",minTS).split(";");
    var sums = [ 0, 0, 0, 0 ];
    for(var i = 0; i < beute.length; i++ ) {
      var vals = beute[i].split(",");
      if( ownPid == vals[1] ) {
        sums[0] += parseInt(vals[2],10);
        sums[1] += parseInt(vals[3],10);
        sums[2] += parseInt(vals[4],10);
        sums[3]++;
      }
    }
    //alert( "Holz: " + sums[0] +"\n" + "Lehm: " + sums[1] +"\n" + "Eisen: " + sums[2] +"\n" + "Summe: " + (sums[0]+sums[1]+sums[2]) +"\nAtts:" + sums[3]);
    $("dsfm_sumwood").innerHTML = lib.formatNumber(sums[0],true,true);
    $("dsfm_sumstone").innerHTML = lib.formatNumber(sums[1],true,true);
    $("dsfm_sumiron").innerHTML = lib.formatNumber(sums[2],true,true);
    $("dsfm_sumtotal").innerHTML = lib.formatNumber(sums[0]+sums[1]+sums[2],true,true);
    $("dsfm_sumreports").innerHTML = lib.formatNumber(sums[3],true,true);
    Map.statsPopup.show();
  },
  setPopupInfos : function(coords) {
    var village = new Village(coords[0],coords[1]);
    var hasInfos = false;
    var infoTab = $("dsfm_popupinfos");
    var row = infoTab.rows[0];
    while(row = row.nextSibling)
      row.style.display="none";
    var html = "";
    var f = useeq ? Math.max(Settings.settings.place.minEQ,village.eq) / 100 : 1;
    if( village.res.timestamp > 0 && Settings.settings.popup.showRessis ) {
      html = '<table style="white-space: nowrap;"><tr>';
      if( village.buildings.timestamp > 0 ) {
        var max = serverInfo.getStorageSize(village)-serverInfo.getHideSize(village.buildings.hide.level);
        var sum = 0;
        for( var res in resInfos ) {
          var val = Math.round(serverInfo.getRessource(village, res) * f);
          if( val < 0 )
            val = 0;
          var txt = lib.formatNumber(val,true,true);
          sum += val;
          var color = "#000";
          if( val >= max )
            color = "#FF0000";
          else if( val >= max*0.75 )
            color ="#FF6A00";
          else if( village["bonus"] == resInfos[res].bonus || village["bonus"] == 8)
            color = "#00A012";
          html += '<td><img src="graphic/'+resInfos[res].img+'" border="0" alt=""/></td><td style="padding-right:20px; color:'+color+'">'+txt+'</td>';
        }
        if( sum >= 0 )
          html += '<td><img src="graphic/res.png" border="0" alt=""/></td><td>'+lib.formatNumber(sum,true,true)+'</td>';

        html += '<td>&#216; ' + Math.max(Settings.settings.place.minEQ,village.eq) + '%</td>'

        showReportAge(village.buildings.timestamp, "resources");
      }
      else if( village.res.timestamp > 0 ) {
        var sum = 0;
        for( var res in resInfos ) {
          var val = village.res[res];
          sum += val;
          var color = "rgb(0,38,255)";
          html += '<td><img src="graphic/'+resInfos[res].img+'" border="0" alt=""/></td><td style="padding-right:20px; color:'+color+';">'+lib.formatNumber(val,true,true)+'</td>';
        }
        if( sum >= 0 )
          html += '<td><img src="graphic/res.png" border="0" alt=""/></td><td>'+lib.formatNumber(sum,true,true)+'</td>';
        showReportAge(village.res.timestamp, "resources");
      }
      html += '</tr></table>';
      $("dsfm_resources").innerHTML = html;
      $("dsfm_resources_row").style.display = '';
      hasInfos = true;
    }
    if( village.buildings.timestamp > 0 ) {
      if( Settings.settings.popup.showBuildings ) {
        $("dsfm_buildings_row").style.display = '';
        $("dsfm_buildings").innerHTML = getBuildingsTab(village.buildings, Settings.settings.popup.showBuildingChange, 0);
        showReportAge(village.buildings.timestamp, "buildings");
        hasInfos = true;
      }
      if( Settings.settings.popup.showMining && village.buildings.storage.level > 0) {
        $("dsfm_mining_row").style.display = '';
        html = '<table><tr>';
        var val;
        var color;
        for( var res in resInfos ) {
          val = serverInfo.getMining(village.buildings[res].level);
          color = "#000";
          if( village["bonus"] == 8 ) {
            val = Math.round(val * 1.3);
            color = "#00A012";
          }
          else if( village["bonus"] == resInfos[res].bonus ) {
            val = Math.round(val * 2);
            color = "#00A012";
          }
          html += '<td><img src="graphic/'+resInfos[res].img+'" border="0" alt=""/></td><td style="padding-right:20px; color:'+color+'">'+lib.formatNumber(val,true,true)+'</td>';
        }
        val = serverInfo.getStorageSize(village);
        color = "#000";
        if( village["bonus"] == 9)
          color = "#00A012";
        html += '<td><img src="graphic/res.png" border="0" alt=""/></td><td style="padding-right:20px; color:'+color+'">'+lib.formatNumber(val,true,true)+'</td>';
        html += '<td><img src="graphic/buildings/hide.png" border="0" alt=""/></td><td>'+lib.formatNumber(serverInfo.getHideSize(village.buildings.hide.level),true,true)+'</td>';
        html += '</tr></table>';
        $("dsfm_mining").innerHTML = html;
        showReportAge(village.buildings.timestamp, "resources");
        hasInfos = true;
      }
    }
    if( village.unitsin.hasUnits && Settings.settings.popup.showUnitsIn ) {
      $("dsfm_unitsin_row").style.display = '';
      $("dsfm_unitsin").innerHTML = getUnitsTab(village.unitsin);
      showReportAge(village.unitsin.timestamp, "unitsin");
      hasInfos = true;
    }
    if( village.unitsout.hasUnits && Settings.settings.popup.showUnitsOut ) {
      $("dsfm_unitsout_row").style.display = '';
      $("dsfm_unitsout").innerHTML = getUnitsTab(village.unitsout);
      showReportAge(village.unitsout.timestamp, "unitsout");
      hasInfos = true;
    }
    if( village["loyalty"] && Settings.settings.popup.showLoyalty ) {
      var loyalty = village["loyalty"]["value"];
      var h = Math.round((lib.getTime() - village["loyalty"].timestamp) / 3600);
      loyalty += Math.round(h * serverInfo.config.speed * serverInfo.config.snob_factor);
      if( loyalty < 100 ) {
        $("dsfm_loyalty_row").style.display = '';
        $("dsfm_loyalty").innerHTML = loyalty;
        hasInfos = true;
      }
    }
    $("dsfm_popupinfo_row").style.display = hasInfos ? "table-row" : "none";
    //Groups.modMapPopup();
  },
  toggleBBCode : function() {
    Map.bbcode = this.checked;
    lib.storage.setValue("bbcode"+ownPid,Map.bbcode);
    var input1 = $("dsfm_coords");
    var input2 = $("dsfm_coordlist");
    if( Map.bbcode ) {
      input1.value = input1.value.replace(/(\d+\|\d+)/g,"[coord]$1[/coord]");
      input2.value = input2.value.replace(/(\d+\|\d+)/g,"[coord]$1[/coord]");
    }
    else {
      input1.value = input1.value.replace(/\[coord\](\d+\|\d+)\[\/coord\]/g,"$1");
      input2.value = input2.value.replace(/\[coord\](\d+\|\d+)\[\/coord\]/g,"$1");
    }
    lib.storage.setValue("coordlist"+ownPid,input.value.replace("\n",";").replace("\r",""));
  },
  compareOvlOpt : function(a,b) {

    a = texts[lib.lang].gui["ovl"+a];
    b = texts[lib.lang].gui["ovl"+b];
    compare(a,b);
  },
  addVillageGroups : function() {
    if( Settings.settings.map.villageGroups ) {
      container = document.getElementById("map_topo");
      if( container ) {
        var tabHead = container.insertBefore(ce("table"),$("dsfm_options").nextSibling);
        tabHead.className="vis";
        var row = tabHead.insertRow(0);
        var cell = row.insertCell(0);
        var a = cell.appendChild(ce("a"));
        a.href = "javascript:;";
        a.innerHTML = texts[lib.lang].gui.allys;
        a.addEventListener("click", Map.toggleVillageGroup, false );
        cell = row.insertCell(1);
        a = cell.appendChild(ce("a"));
        a.href = "javascript:;";
        a.innerHTML = texts[lib.lang].gui.player;
        a.addEventListener("click", Map.toggleVillageGroup, false );

        var div = container.insertBefore(ce("div"),tabHead.nextSibling);
        div.style.margin = "0 auto";
        div.style.width = "300px";
        div.style.height = "300px";
        div.style.overflow = "auto";
        for( var i = 0; i < 2; i++ ) {
          var tab = div.appendChild(ce("table"));
          tab.className="vis overview_table";
          tab.width="100%";
          tab.id = "dsfm_vilgrp"+i;
          var head = tab.appendChild(ce("thead"));
          row = head.insertRow(0);
          cell = row.appendChild(ce("th"));
          cell.innerHTML = texts[lib.lang].gui.name;
          cell = row.appendChild(ce("th"));
          cell.innerHTML = texts[lib.lang].gui.villages;
          cell.style.textAlign = "right";
          cell = row.appendChild(ce("th"));
          cell.innerHTML = texts[lib.lang].gui.points;
          cell.style.textAlign = "right";
          tab.appendChild(ce("tbody"));
        }
        Map.villageGroup = lib.storage.getValue("vilgrp"+ownPid,0);
        lib.fireEvent(tabHead.rows[0].cells[Map.villageGroup].firstChild,"click");
      }
    }
  },
  toggleVillageGroup : function (e) {
    var row = e.target.parentNode.parentNode;
    for( var i = 0; i < row.cells.length; i++ ) {
      if( row.cells[i] == e.target.parentNode ) {
        Map.villageGroup = i;
        lib.storage.setValue("vilgrp"+ownPid,i);
        row.cells[i].className = "selected";
        $("dsfm_vilgrp"+i).style.display="";
      }
      else {
        row.cells[i].className = "";
        $("dsfm_vilgrp"+i).style.display="none";
      }
    }
  },
  updateVillageGroups : function() {
    Map.stopFlash();
    var start = new Date().getTime();
    var screen = [ "info_ally", "info_player" ];
    var x0 = parseInt(Map.twmap.map.pos[0] / Map.twmap.map.scale[0]);
    var y0 = parseInt(Map.twmap.map.pos[1] / Map.twmap.map.scale[1]);
    var xx = x0+Map.twmap.map.size[0] / Map.twmap.map.scale[0];
    var yy = y0+Map.twmap.map.size[1] / Map.twmap.map.scale[1];
    if( xx > 999 )
      xx = 999;
    if( yy > 999 )
      yy = 999;
    Map.villageOwners = [[],[]];
    Map.villageGroups = [[],[]];
    for( var x = x0; x < xx; x++ ) {
      for( var y = y0; y < yy; y++ ) {
        var v = Map.twmap.villages[x*1000+y];
        if( v && v.owner > 0 ) {
          var np = [];
          var points = parseInt(v.points.replace(/\./g,""),10);
          if( Map.twmap.players[v.owner].ally > 0 ) {
            np[0] = { name: Map.twmap.allies[Map.twmap.players[v.owner].ally].name, id: Map.twmap.players[v.owner].ally, points: parseInt(Map.twmap.allies[Map.twmap.players[v.owner].ally].points.replace(/\./g,""),10) };
          }
          np[1] = { name: Map.twmap.players[v.owner].name, id: v.owner, points: parseInt(Map.twmap.players[v.owner].points.replace(/\./g,""),10) };
          if( np[0] && np[1] && Settings.settings.map.vgShowAlly )
            np[1].name += " - " + np[0].name;
          for( var g = 0; g < 2; g++ ) {
            if( np[g] ) {
              if( Map.villageGroups[g][np[g].name] ) {
                Map.villageGroups[g][np[g].name].count++;
                Map.villageGroups[g][np[g].name].imgs.push($("map_village_"+v.id));
                Map.villageGroups[g][np[g].name].points += points;
              }
              else {
                Map.villageGroups[g][np[g].name] = { name: np[g].name, count: 1, imgs: [$("map_village_"+v.id)], points: points, totalPoints: np[g].points };
                Map.villageOwners[g].push( { name: np[g].name, id: np[g].id, sortname: np[g].name.replace(/[^\w]/g, "").replace(/_/,"").toUpperCase() } );
              }
            }
          }
        }
      }
    }
    
    var count = 0;
    for( var g = 0; g < 2; g++ ) {
      Map.villageOwners[g].sort(function(a,b) { return compare(a.sortname,b.sortname); });
      var list = $("dsfm_vilgrp"+g);
      list.tBodies[0].innerHTML = "";
      var rowClass = [ "row_a", "row_b" ];
      for( i = 0; i < Map.villageOwners[g].length; i++ ) {
        count++;
        var row = list.tBodies[0].insertRow(i);
        row.className = rowClass[i&1];
        var cell = row.insertCell(0);
        var a = cell.appendChild(ce("a"));
        a.innerHTML = Map.villageOwners[g][i]["name"];
        a.href = lib.createLink(screen[g], "id", Map.villageOwners[g][i]["id"], false);
        cell = row.insertCell(1);
        cell.style.textAlign = "right";
        a = cell.appendChild(ce("a"));
        a.innerHTML = Map.villageGroups[g][Map.villageOwners[g][i].name].count;
        a.href = "javascript:;";
        a.addEventListener("click", Map.startFlash, false );
        cell = row.insertCell(2);
        cell.style.textAlign = "right";
        cell.innerHTML = lib.formatNumber(Map.villageGroups[g][Map.villageOwners[g][i].name].points,true,true,2)+"/"+lib.formatNumber(Map.villageGroups[g][Map.villageOwners[g][i].name].totalPoints,true,true,2);
        cell.title = lib.formatNumber(Map.villageGroups[g][Map.villageOwners[g][i].name].points,true,false)+"/"+lib.formatNumber(Map.villageGroups[g][Map.villageOwners[g][i].name].totalPoints,true,false);
      }
    }
    lib.debug.log( "Player/Ally-List created in " + (new Date().getTime()-start) + "ms");
    return count;
  },
  watchMap : function() {
    var x = Map.twmap.map.pos[0];
    var y = Map.twmap.map.pos[1];
    if( !Map.twmap.scrolling && (Map.mopX != x || Map.mopY != y) ) {
      if( Map.updateVillageGroups() > 0 ) {
        Map.mopX = x;
        Map.mopY = y;
      }
      if( Map.twmap.pos[0] != curVillage.map.x || Map.twmap.pos[1] != Map.twmap.pos[1] ) {
        curVillage.map.timestamp = lib.getTime();
        curVillage.map.x = Map.twmap.pos[0];
        curVillage.map.y = Map.twmap.pos[1];
        curVillage.save();
      }
    }
  },
  startFlash : function (e) {
    if(Map.flashItem != e.target.parentNode.parentNode) {
      Map.stopFlash();
      Map.flashItem = e.target.parentNode.parentNode;
      Map.flashItem.className = "selected";
      Map.toFlash = Map.villageGroups[Map.villageGroup][Map.flashItem.cells[0].firstChild.innerHTML].imgs;
      Map.flashTimer = setInterval(Map.flash, 500);
    }
    else
      Map.stopFlash();
  },
  flash : function() {
    if( Map.toFlash ) {
      for( var i = 0; i < Map.toFlash.length; i++ )
        Map.toFlash[i].style.display = Map.flashOdd ? "none" : "";
      Map.flashOdd = !Map.flashOdd;
    }
  },
  stopFlash : function() {
    clearInterval(Map.flashTimer);
    if( Map.flashItem )
      Map.flashItem.className="";
    if( Map.toFlash ) {
      for( var i = 0; i < Map.toFlash.length; i++ )
        Map.toFlash[i].style.display = "";
      Map.flashOdd = false;
    }
    Map.toFlash = null;
    Map.flashItem = null;
  },
  onContextMenu : function(e) {
    var pos = Map.twmap.map.coordByEvent(e);
    var x = pos[0];
    var y = pos[1];
    var v = Map.twmap.villages[x*1000+y];
    if( v ) {
      if( v.owner == ownPid )
        Common.contextMenuOwn.show(e.pageX,e.pageY,x+"|"+y, { id: v.id, x: x, y: y });
      else
        Common.contextMenuOther.show(e.pageX,e.pageY,x+"|"+y, { id: v.id, x: x, y: y });
      e.preventDefault();
    }
  },
  redirectLink : function(e) {
    var pos = Map.twmap.map.coordByEvent(e);
    var x = pos[0];
    var y = pos[1];
    var v = Map.twmap.villages[x*1000+y];
    if( v ) {
      switch( Map.redirTarget ) {
        case "removeinfo":
          if( confirm( texts[lib.lang].gui.confirm_delinfosxy[0]+" "+x+"|"+y+" "+texts[lib.lang].gui.confirm_delinfosxy[1] ) ) {
            deleteVillageInfos(x+"_"+y);
            var infos = $("dsfm_overlay_"+x+"_"+y);
            if( infos )
              infos.innerHTML = "";
            Map.createOverlay(x,y);
          }
          break;
        case "togglenofarm":
          nofarms = lib.storage.getValue("nofarms"+ownPid,"");
          var re =  new RegExp(x+"_"+y+";" )
          if( re.test(nofarms) )
            nofarms = nofarms.replace(new RegExp(x+"_"+y+";","g"), "");
          else
            nofarms += x+"_"+y+";"
          Map.createOverlay(x,y);
          lib.storage.setValue("nofarms"+ownPid,nofarms);
          break;
        case "coordlist":
          var input = $("dsfm_coordlist");
          var coords = x+"|"+y;
          if( Map.bbcode )
            coords = "[coord]"+coords+"[/coord]";
          if( input.value.indexOf(coords) == -1  ) {
            input.value += coords + "\n";
            $("dsfm_overlay_"+x+"_"+y).style.backgroundColor = "rgba(127,255,255,0.4)";
          }
          else {
            input.value = input.value.replace(coords+"\n","");
            $("dsfm_overlay_"+x+"_"+y).style.backgroundColor = "";
          }
          input.style.height = (input.value.split("\n").length*12)+"px";
          Map.coordlist = input.value.replace("\n",";").replace("\r","");
          lib.storage.setValue("coordlist"+ownPid,Map.coordlist);
          break;
      }
    }
    return false;
  },
  redirTargetChanged : function() {
    var select = $("dsfm_redirTarget");
    Map.mocX = 0;
    Map.mocY = 0;
    if( arguments.length == 2 ) {
      for( var hk in Settings.hotKeys.map ) {
        if( Settings.hotKeys.map[hk].keyCode == arguments[0].keyCode && Settings.hotKeys.map[hk].modifier == arguments[1].val )
          select.value = hk;
      }
    }
    Map.redirTarget = select.value;
    $("dsfm_coordlist_div").style.display = select.value == "coordlist" ? "" : "none";
    lib.storage.setValue("redirTarget"+ownPid, Map.redirTarget);
  },
  addbb2fl : function() {
    var ts = lib.getTime();
    var minTS = ts - Settings.settings.misc.reportMaxAge * 86400;
    var anz = Math.round(Settings.settings.place.noReportLoad / 3);
    var x0 = parseInt(Map.twmap.map.pos[0] / Map.twmap.map.scale[0]);
    var y0 = parseInt(Map.twmap.map.pos[1] / Map.twmap.map.scale[1]);
    var xx = x0+Map.twmap.map.size[0] / Map.twmap.map.scale[0];
    var yy = y0+Map.twmap.map.size[1] / Map.twmap.map.scale[1];
    if( xx > 999 )
      xx = 999;
    if( yy > 999 )
      yy = 999;
    for( var x = x0; x < xx; x++ ) {
      for( var y = y0; y < yy; y++ ) {
        var idx = x*1000+y;
        var v = Map.twmap.villages[idx];
        if( v ) {
          if( v.owner == 0 ) {
            var village = new Village(x,y);
            if( village.lastreport.timestamp < minTS ) {
              village.lastreport.timestamp = ts;
              village.res.timestamp = ts;
              village.res.wood = anz;
              village.res.stone = anz;
              village.res.iron = anz;
              village.save();
              Map.createOverlay(x,y);
            }
          }
        }
      }
    }
  },
  toggleTopo : function() {
    lib.storage.setValue("groupsOnTopo"+ownPid, this.checked);
    var divs = document.getElementsByClassName("dsfm_topo_overlay");
    for( var i = 0; i < divs.length; i++ )
      divs[i].style.display = this.checked ? "" : "none";
  },
  addOwnGroupEdit : function () {
    var div = $("village_colors");
    var tab = div.firstChild.nextSibling;
    var td = tab.rows[0].cells[0];
    var newLnk = td.childNodes[td.childNodes.length-2];
    //td.removeChild(newLnk);
    var select = document.getElementsByName("add_group")[0];
    if( select ) {
      Groups.getGroupsFromSelect(select);
      Groups.modGroupSelect(select);
      Groups.addGroupEdit(td);
    }
  },
  updateUnitDivs : function() {
    var unitDivs = document.getElementsByName("dsfm_unitsDiv");
    var chks = $("dsfm_unitOptions").getElementsByTagName("input");
    var unitSum = 0;
    for( var i = 0; i < chks.length; i++ ) {
      if(chks[i].checked)
        unitSum |= parseInt(chks[i].value,10);
    }
    lib.storage.setValue("unitSum"+ownPid,unitSum);
    Map.reCreateOverlays(true);
  },
  showChurches : function() {
    if( typeof Map.churchPopup == "undefined" ) {
      Map.churchPopup = new lib.Popup("dsfm_simChurches", texts[lib.lang].gui.simChurches, true, 300, 200);
      var div = Map.churchPopup.content.appendChild(ce("div"));
      div.style.width = "290px";
      div.style.height = "200px";
      div.style.overflow = "auto";
      div.style.border = "1px solid #804000";
      var tab = div.appendChild(ce("table"));
      tab.className = "vis";
      tab.id = "dsfm_churches";
      tab.style.width = "100%";
      var row = tab.insertRow(-1);
      var cell = row.appendChild(ce("th"));
      cell.textContent = "X";
      cell = row.appendChild(ce("th"));
      cell.textContent = "Y";
      cell = row.appendChild(ce("th"));
      cell.textContent = texts[lib.lang].gui.churches[0];
      cell = row.appendChild(ce("th"));
      cell.textContent = texts[lib.lang].gui.color;
      cell = row.appendChild(ce("th"));
      var input = Map.churchPopup.content.appendChild(ce("input"));
      input.type = "button";
      input.value = texts[lib.lang].gui.savebutton;
      input.addEventListener("click",Map.saveChurches,false);
      input = Map.churchPopup.content.appendChild(ce("input"));
      input.type = "button";
      input.value = texts[lib.lang].gui.cancel;
      input.addEventListener("click",function() {Map.churchPopup.hide();}, false);
    }
    else {
      tab = $("dsfm_churches");
      while( tab.rows.length > 1 )
        tab.deleteRow(1);
    }
    for( var i = 0; i < Map.churches.length; i++ )
      Map.insertChurchRow(tab, Map.churches[i]);
    Map.insertChurchRow(tab);
    Map.churchPopup.show();
  },
  insertChurchRow : function(tab, church) {
    var x = true;
    if( typeof church == "undefined" ) {
      church = { x:"", y:"", radius:0, color: "#FFFFFF" };
      x = false;
    }
    var row = tab.insertRow(-1);
    var cell = row.insertCell(-1);
    var input = cell.appendChild(ce("input"));
    input.type = "text";
    input.size = 3;
    input.value = church.x;
    input.addEventListener("keyup",function(e) {
        var xInput = e.target;
        var yInput = xInput.parentNode.nextSibling.firstChild;
        if( xInput.value.indexOf("|") > -1 ) {
          var coords = xInput.value.split("|");
          xInput.value = coords[0];
          yInput.value = coords[1];
        }
        if( xInput.value.length == 3 && yInput.value.length == 0 ) {
          yInput.focus();
          yInput.select();
        }
      }, false);
    
    cell = row.insertCell(-1);
    input = cell.appendChild(ce("input"));
    input.type = "text";
    input.size = 3;
    input.value = church.y;
    
    cell = row.insertCell(-1);
    input = cell.appendChild(ce("select"));
    input.size = 1;
    input.options[0] = new Option(texts[lib.lang].gui.churches[1],1,false,false);
    input.options[1] = new Option(texts[lib.lang].gui.churches[2],0,false,false);
    input.options[2] = new Option(texts[lib.lang].gui.churches[3],1,false,false);
    input.options[3] = new Option(texts[lib.lang].gui.churches[4],2,false,false);
    input.value = church.radius;
    
    cell = row.insertCell(-1);
    input = cell.appendChild(ce("input"));
    input.type = "text";
    input.size = 6;
    input.value = church.color;
    input.color = new ColorPicker(input);
    
    cell = row.insertCell(-1);
    var a = cell.appendChild(ce("a"));
    a.href = "#";
    a.style.textWeight = "bold";
    if( x ) {
      a.textContent = " X";
      a.style.color = "red";
      a.tilte = texts[lib.lang].gui.remove;
      a.addEventListener("click", Map.removeChurch, false );
    }
    else {
      a.textContent = " +";
      a.style.color = "green";
      a.tilte = texts[lib.lang].gui.add;
      a.addEventListener("click", Map.applyChurch, false );
    }
  },
  applyChurch : function(e) {
    var row = this.parentNode.parentNode;
    var x = parseInt(row.cells[0].firstChild.value,10);
    var y = parseInt(row.cells[1].firstChild.value,10);
    if( !isNaN(x) && !isNaN(y) && x>=0 && x <= 999 && y >= 0 && y <= 999 ) {
      var a = row.cells[4].firstChild;
      a.removeEventListener("click",Map.applyChurch,false);
      a.addEventListener("click",Map.removeChurch,false);
      a.style.color = "red";
      a.textContent = "X";
      Map.insertChurchRow(row.parentNode.parentNode);
    }
    else {
      alert( texts[lib.lang].gui.errorCoords );
    }
  },
  removeChurch : function() {
    var row = this.parentNode.parentNode;
    row.parentNode.removeChild(row);
  },
  saveChurches : function(e) {
    var tab = $("dsfm_churches");
    var churches = [];
    for( var i = 1; i < tab.rows.length-1; i++ ) {
      var church = { 
        x: parseInt(tab.rows[i].cells[0].firstChild.value,10), 
        y: parseInt(tab.rows[i].cells[1].firstChild.value,10),
        radius: parseInt(tab.rows[i].cells[2].firstChild.value,10),
        color: tab.rows[i].cells[3].firstChild.value
      };
      if( isNaN(church.x) || church.x < 0 || church.x > 999 ) {
        alert(texts[lib.lang].gui.errorCoords);
        tab.rows[i].cells[0].firstChild.focus();
        return false;
      }
      else if( isNaN(church.x) || church.x < 0 || church.x > 999 ) {
        alert(texts[lib.lang].gui.errorCoords);
        tab.rows[i].cells[1].firstChild.focus();
        return false;
      }
      churches.push(church);
    }
    Map.churches = churches;
    lib.storage.setValue("churches",churches);
    Map.churchPopup.hide();
    Map.reCreateTopoOverlays();
    return false;
  },
  toggleChurches : function() {
    Map.simChurches = this.checked;
    lib.storage.setValue("simChurches",this.checked);
    var canvas = document.getElementsByClassName("dsfm_topo_canvas");
    for( var i = 0; i < canvas.length; i++ )
      canvas[i].style.display = this.checked ? "":"none";
  },
}
var BuildAssist = {
  requirements : { 
    barracks: { main: 3 }, 
    stable: { main: 10, barracks: 5, smith: 5 }, 
    garage: { main: 10, smith: 10 }, 
    snob: { main: 20, smith: 20, market: 10 },
    smith: { main: 5, barracks: 1 },
    market: { main: 3, storage: 2 },
    wall: {barracks: 1}
  },
	mining : { wood: 0, stone: 0, iron: 0 },
	curRessis : { wood: 0, stone: 0, iron : 0},
	storageSize : 0,
	queue : { builds: {}, destroys: {}, totalDestroys: 0, cost: false },
	pop : 0,
  vilVar : "",
  variants : [],
  popup : null,
  doIt : function() {
    if( lib.params.screen == "main" ) {
      BuildAssist.pop = { current: parseInt(document.getElementById("pop_current").innerHTML,10), max: parseInt(document.getElementById("pop_max").innerHTML,10) };
      BuildAssist.storageSize = parseInt(document.getElementById("storage").innerHTML,10);
      for( var key in resInfos ) {
        var span = document.getElementById(key);
        BuildAssist.mining[key] = parseInt(span.title,10);
        BuildAssist.curRessis[key] = parseInt(span.innerHTML);
      }

      var buildDestroy = document.getElementsByClassName("selected")[0];
      if( buildDestroy )
        buildDestroy.parentNode.id="dsfm_builddestroy";
      
      var id = Settings.buildAssist.assigns.match(";"+lib.game_data.village.id+",(\\d+);");
      if( id )
        id = id[1];
      else
        id = Settings.buildAssist.defVar;
      var tab = BuildAssist.getBuildingTab();
      tab.rows[0].cells[0].innerHTML = tab.rows[0].cells[0].innerHTML + " ";
      var input = tab.rows[0].cells[0].appendChild(ce("select"));
      input.id = "dsfm_build_variant";
      input.options[0] = new Option(texts[lib.lang].gui.selectVariantOption,0,true,Settings.buildAssist.defVar==0);
      for( var i = 0; i < Settings.buildAssist.variants.length; i++ )
        input.options[i+1] = new Option(Settings.buildAssist.variants[i].name,Settings.buildAssist.variants[i].id,false,id==Settings.buildAssist.variants[i].id);
      input.addEventListener("change", BuildAssist.onVariantChanged, false );
      
      var a = tab.rows[0].cells[0].appendChild(ce("a"));
      a.href = "javascript:;";
      a.innerHTML = ' <img alt="#" src="graphic/rename.png"/>';
      a.addEventListener("click", function(e) { lib.storage.setValue("settingsTab"+ownPid,"buildAssist"); location.href = lib.createLink("settings","mode","settings",false); }, false);

      var qTab = document.getElementById("build_queue");
      if( qTab ) {
        var a = qTab.rows[0].cells[0].appendChild(ce("a"));
        a.href = "javascript:;";
        a.addEventListener("click", function() { document.getElementById("dsfm_build_queue").style.display=""; document.getElementById("build_queue").style.display="none"; lib.storage.setValue("smallQueue"+ownPid,1); }, false );
        a.innerHTML = ' <img src="graphic/map/map_n.png" alt="'+texts[lib.lang].gui.minimize+'" title="'+texts[lib.lang].gui.minimize+'"/>';
        var sqTab = qTab.parentNode.insertBefore(ce("table"),qTab);
        sqTab.id = "dsfm_build_queue";
        sqTab.className = "vis";
        row = sqTab.insertRow(0);
        cell = row.appendChild(ce("th"));
        cell.colSpan = qTab.rows.length-1;
        var idx = qTab.rows.length-1;
        if( qTab.rows[idx].cells[0].colSpan > 1 )
          idx--;
        cell.appendChild(document.createTextNode(texts[lib.lang].gui.buildQueueTitle + " - " + qTab.rows[idx].cells[2].textContent + " "));
        a = cell.appendChild(ce("a"));
        a.href = "javascript:;";
        a.addEventListener("click", function() { document.getElementById("dsfm_build_queue").style.display="none"; document.getElementById("build_queue").style.display=""; lib.storage.setValue("smallQueue"+ownPid,0); }, false );
        a.innerHTML = '<img src="graphic/map/map_s.png" alt="'+texts[lib.lang].gui.restore+'" title="'+texts[lib.lang].gui.restore+'"/>';
        if( lib.storage.getValue("smallQueue"+ownPid,1) )
          qTab.style.display = "none";
        else
          sqTab.style.display = "none";
        row = sqTab.insertRow(1);
        row.className = "nowrap";
        for( var i = 1; i < qTab.rows.length; i++ ) {
          var res = qTab.rows[i].cells[0].innerHTML.match( texts[lib.lang].regex.buildDestroy );
          if( res ) {
            var level = parseInt(res[2],10);
            var name = res[1];
            name = name.substring(0,name.length-1);
            for( var key in serverInfo.buildingInfo ) {
              if( serverInfo.addBuildingInfo[key].name == name )
                break;
            }
            var a = qTab.rows[i].cells[3].firstChild;
            cell = row.insertCell(i-1);
            //cell.style.textAlign = "center";
            var html = '<a href="'+a.href+'">';
            if( !isNaN(level) ) {
              if( i == 1 )
                cell.title = name + " " + level + " - " + qTab.rows[i].cells[2].innerHTML;
              else
                cell.title = name + " " + level + " - " + qTab.rows[i].cells[1].innerHTML.replace(/<[^>]+>/g,"") + "- " + qTab.rows[i].cells[2].innerHTML;
              BuildAssist.queue.builds[key] = level;
            }
            else {
              if( i == 1 )
                cell.title = texts[lib.lang].gui.destroy + name + " - " + qTab.rows[i].cells[2].innerHTML;
              else
                cell.title = texts[lib.lang].gui.destroy + name + " - " + qTab.rows[i].cells[1].innerHTML.replace(/<[^>]+>/g,"") + "- " + qTab.rows[i].cells[2].innerHTML;
              html += '<img src="graphic/overview/down.png" alt="'+texts[lib.lang].gui.destroy+'"/>';
              BuildAssist.queue.totalDestroys++;
              if( BuildAssist.queue.destroys[key] )
                BuildAssist.queue.destroys[key]++
              else
                BuildAssist.queue.destroys[key] = 1;
            }
            html += '<img src="graphic/buildings/'+key+'.png" alt="'+name+'"/></a>';
            if( i == 1 ) {
              html += '<span style="font-size:xx-small;font-weight:bold;" id="dsfm_curtime">'+qTab.rows[1].cells[1].innerHTML+'</span>';
              setInterval( function() { document.getElementById("dsfm_curtime").innerHTML = document.getElementById("build_queue").rows[1].cells[1].innerHTML; }, 1000 );
            }
            cell.innerHTML = html;
            cell.style.width = "0";
          }
          else if( texts[lib.lang].regex.queueCost.test(qTab.rows[i].cells[0].innerHTML ) ) {
            var cost = qTab.rows[i].cells[0].innerHTML.match( /<b>([^<]+)</ )[1];
            cell = sqTab.rows[0].appendChild(ce("th"));
            sqTab.rows[0].cells[0].colSpan--;
            cell.innerHTML = '<img src="graphic/gold.png" alt="'+texts[lib.lang].gui.queueCost+'"/>';
            cell.title = texts[lib.lang].gui.queueCost;
            BuildAssist.queue.cost = true;
            cell = row.insertCell(i-1);
            cell.innerHTML = "<b>"+cost+"</b>";
          }
        }
        sqTab.rows[0].cells[0].colSpan++;
        sqTab.rows[1].insertCell(sqTab.rows[0].cells.length == 2 ? i - 2 : i - 1);
      }
      BuildAssist.updateMain(id);
    }
    else if( lib.params.screen == "overview" ) {
      BuildAssist.getLoyalty();
    }
  },
  getBuildingTab : function() {
    var tab = document.getElementById("buildinginfo");
    if( !tab ) {
      tab = document.getElementById("content_value").getElementsByTagName("table");
      for( var i = 0; i < tab.length; i++ ) {
        if( texts[lib.lang].regex.building.test(tab[i].rows[0].cells[0].innerHTML) ) {
          tab = tab[i]
          tab.id = "buildinginfo";
          break;
        }
      }
    }
    return tab;
  },
  onVariantChanged : function() {
    var id = parseInt(document.getElementById("dsfm_build_variant").value,10);
    Settings.buildAssist.assigns = Settings.buildAssist.assigns.replace(new RegExp(";"+lib.game_data.village.id+",\\d+;"),"");
    Settings.buildAssist.assigns += ";" + lib.game_data.village.id+","+id+";";
    lib.storage.setValue("buildAssist"+ownPid,Settings.buildAssist);
    if( id == 0 )
      document.location.reload();    
    else
      BuildAssist.updateMain(id);
  },
  updateVariantValues : function(row) {
    var pts = 0;
    var bh = 0;
    for( var i = 1; i < row.cells.length-3; i++ ) {
      var input = row.cells[i].firstChild;
      var level = parseInt(input.value,10);
      pts += serverInfo.addBuildingInfo[input.name].points[level];
      if( level > 0 )
        bh += Math.round(serverInfo.buildingInfo[input.name].pop*Math.pow(serverInfo.buildingInfo[input.name].pop_factor,level-1));
    }
    var cell = row.cells[row.cells.length-3];
    cell.innerHTML = lib.formatNumber(pts,true,true);
    cell.style.textAlign = "right";
    cell = row.cells[row.cells.length-2];
    cell.innerHTML = lib.formatNumber(bh,true,true);;
    cell.style.textAlign = "right";
  },
  updateMain : function(id) {
    var variant = Settings.buildAssist.variants[Settings.getVariantIdxById("buildAssist",id)];
    var buildDestroy = document.getElementById("dsfm_builddestroy");
    var loyalty = 100;
    if( curVillage.loyalty.timestamp > 0 ) {
      var h = Math.round((lib.getTime() - curVillage.loyalty.timestamp) / 3600);
      loyalty = curVillage.loyalty.value + Math.round(h * serverInfo.config.speed * serverInfo.config.snob_factor);
      if( loyalty < 100 ) {
        buildDestroy.className = "nowrap";
        buildDestroy.cells[1].style.color = "red";
        buildDestroy.cells[1].style.fontSize = "xx-small";
        buildDestroy.cells[1].style.fontWeight = "bold";
        buildDestroy.cells[1].textContent = texts[lib.lang].gui.loyalty+": " + loyalty + "%"
      }
      else {
        loyalty = 100;
        curVillage.loyalty = { timestamp: 0, value: 0 };
        curVillage.save();
      }
    }
    
    var tab = BuildAssist.getBuildingTab();

    if( variant ) {
      if( buildDestroy ) {
        buildDestroy.style.display = "none";
        buildDestroy = true;
      }
      build = lib.params.get("mode","build") == "build";
      if( !build && tab.rows[0].cells.length == 3) {
        var cell = tab.rows[0].insertBefore(ce("th"),tab.rows[0].cells[1]);
        cell.innerHTML = texts[lib.lang].gui.needs;
        cell.colSpan = 4;
      }
      tab.rows[0].cells[2].innerHTML = texts[lib.lang].gui.buildTime;
      tab.rows[0].cells[3].innerHTML = texts[lib.lang].gui.buildOption;
      var append = [];
      for( var i = 1; i < tab.rows.length; i++ ) {
        var state = 0;
        var building = tab.rows[i].cells[0].innerHTML.match(/screen=([^"&]+)/);
        if( building ) {
          building = building[1];
          var level = parseInt(lib.game_data.village.buildings[building],10);
          if( BuildAssist.queue.builds[building] )
            level = BuildAssist.queue.builds[building];
          if( !BuildAssist.queue.destroys[building] )
            BuildAssist.queue.destroys[building] = 0;
          if( level == serverInfo.buildingInfo[building].max_level )
            state = 2;
          if( level - BuildAssist.queue.destroys[building] == variant[building] && level < serverInfo.buildingInfo[building].max_level) {
            state = 1;
            while( tab.rows[i].cells.length > 2 )
              tab.rows[i].deleteCell(2);
            tab.rows[i].cells[1].innerHTML = texts[lib.lang].gui.buildingCompleted;
            tab.rows[i].cells[1].style.color = "";
            tab.rows[i].cells[1].className = "inactive";
            tab.rows[i].cells[1].style.textAlign = "center";
            tab.rows[i].cells[1].colSpan = 6;
          }
          else if( level - BuildAssist.queue.destroys[building] > variant[building] ) {
            state = 3;
            while( tab.rows[i].cells.length > 2 )
              tab.rows[i].deleteCell(2);
            tab.rows[i].cells[1].innerHTML = texts[lib.lang].gui.buildingOverbuild;
            tab.rows[i].cells[1].style.color = "#FF0000";
            tab.rows[i].cells[1].style.textAlign = "center";
            tab.rows[i].cells[1].colSpan = 4;
            var cell = tab.rows[i].insertCell(2);
            var val = Math.round(serverInfo.buildingInfo[building].build_time * Math.pow(serverInfo.buildingInfo[building].build_time_factor, level-1-BuildAssist.queue.destroys[building]) * Math.pow(0.952381,parseInt(lib.game_data.village.buildings.main,10)));
            cell.innerHTML = texts[lib.lang].locale.formatDuration(val);
            cell = tab.rows[i].insertCell(3);
            if( buildDestroy ) {
              if( loyalty >= 100 ) {
                if( BuildAssist.queue.totalDestroys < 5 ) {
                  var a = cell.appendChild(ce("a"));
                  a.href = lib.createLink("main","action","destroy","h",lib.game_data.csrf,"building_id",building,false);
                  a.innerHTML = texts[lib.lang].gui.destroyLevel;
                }
                else {
                  cell.innerHTML = texts[lib.lang].gui.destroyQueueFull;
                  cell.className="inactive";
                }
              }
              else {
                cell.innerHTML = texts[lib.lang].gui.loyalty + ": " + loyalty + "%";
                cell.className="inactive";
              }
            }
            else {
              cell.innerHTML = texts[lib.lang].gui.noDestroy;
              cell.className="inactive";
            }
          }
          else if( tab.rows[i].cells.length < 7 ) {
            var hasRequired = true;
            if( BuildAssist.requirements[building] ) {
              html = texts[lib.lang].gui.required + ' ';
              for( var key in BuildAssist.requirements[building] ) {
                if( parseInt(lib.game_data.village.buildings[key],10) < BuildAssist.requirements[building][key] )
                  hasRequired = false;
                html += '<img alt="" src="/graphic/buildings/'+key+'.png"> ';
                html += serverInfo.addBuildingInfo[key].name + ' (Stufe ' + BuildAssist.requirements[building][key] + ') ';
              }
              if( !hasRequired ) {
                while( tab.rows[i].cells.length > 2 )
                  tab.rows[i].deleteCell(2);
                tab.rows[i].cells[1].innerHTML = html;
                tab.rows[i].className="_toggle";
                tab.rows[i].cells[1].style.textAlign = "center";
                tab.rows[i].cells[1].colSpan = 6;
                tab.rows[i].cells[1].className="";
                append.push(tab.rows[i].innerHTML);
                tab.deleteRow(i);
                i--;
              }
            }
            if( hasRequired ) {
              if( level - BuildAssist.queue.destroys[building] < variant[building] && parseInt(lib.game_data.village.buildings[building],10) < serverInfo.buildingInfo[building].max_level ) {
                var resoktime = 0;
                var storageSizeOk = true;
                var popok = true;
                while( tab.rows[i].cells.length > 1 )
                  tab.rows[i].deleteCell(1);
                var r = 0;
                for( var key in resInfos ) {
                  var html = '<img title="'+texts[lib.lang].resources[key]+'" src="graphic/'+resInfos[key].img+'"/> ';
                  var val = Math.round(serverInfo.buildingInfo[building][key] * Math.pow(serverInfo.buildingInfo[building][key+"_factor"], level));
                  if( BuildAssist.curRessis[key] < val ) {
                    var dif = val - BuildAssist.curRessis[key];
                    var time = dif / (BuildAssist.mining[key] / 3600);
                    if( time > resoktime )
                      resoktime = time;
                    if( val > BuildAssist.storageSize )
                      storageSizeOk = false;
                  }
                  var cell = tab.rows[i].insertCell(++r);
                  cell.innerHTML = html + val;
                }
                html = '<img title="'+texts[lib.lang].gui.workers+'" src="graphic/face.png"/> ';
                var workers = Math.round(serverInfo.buildingInfo[building].pop * Math.pow(serverInfo.buildingInfo[building].pop_factor, level));
                if( level > 0)
                  workers -= Math.round(serverInfo.buildingInfo[building].pop * Math.pow(serverInfo.buildingInfo[building].pop_factor, level-1));
                var cell = tab.rows[i].insertCell(4);
                cell.style.whiteSpace = "nowrap";
                cell.innerHTML = html + workers;

                val = Math.round(serverInfo.buildingInfo[building].build_time * Math.pow(serverInfo.buildingInfo[building].build_time_factor, level) * Math.pow(0.952381,parseInt(lib.game_data.village.buildings.main,10)));
                tab.rows[i].insertCell(5).innerHTML = texts[lib.lang].locale.formatDuration(val);
                cell = tab.rows[i].insertCell(6);
                if( BuildAssist.pop.max - BuildAssist.pop.current < workers ) {
                  cell.innerHTML = texts[lib.lang].gui.farmToSmall;
                  cell.className = "inactive";
                }
                else if( !storageSizeOk ) { 
                  cell.innerHTML = texts[lib.lang].gui.storageToSmall;
                  cell.className = "inactive";
                }
                else if( resoktime > 0 ) {
                  cell.innerHTML = texts[lib.lang].gui.resAvailableAt + texts[lib.lang].locale.date2timeStr(new Date((lib.getTime()+resoktime)*1000));
                  cell.className = "inactive";
                }
                else if( lib.hasPA || !qTab || qTab.rows.length < 3) {
                  html = '<a href="'+lib.createLink("main","action","build","h",lib.game_data.csrf,"id",building,"force","",true)+'"';
                  if( Settings.settings.misc.confirmQueue && BuildAssist.queue.cost )
                    html += ' onclick="return confirm(\'' + texts[lib.lang].gui.confirmQueue + '\')"';
                  html += '>'+texts[lib.lang].gui.buildingLevelUp[0]+(level+1)+texts[lib.lang].gui.buildingLevelUp[1]+'</a>';
                  cell.innerHTML = html;
                }
                else {
                  cell.innerHTML = texts[lib.lang].gui.resAvailable;
                  cell.className = "inactive";
                }
              }
              else if( level == variant[building] ) {
                state = 2;
                while( tab.rows[i].cells.length > 2 )
                  tab.rows[i].deleteCell(2);
                tab.rows[i].cells[1].innerHTML = texts[lib.lang].gui.buildingMaxLevel;
                tab.rows[i].cells[1].style.color = "";
                tab.rows[i].cells[1].className = "inactive";
                tab.rows[i].cells[1].style.textAlign = "center";
                tab.rows[i].cells[1].colSpan = 6;
              }
              else if( level - BuildAssist.queue.destroys[building] == variant[building] ) {
                state = 1;
                while( tab.rows[i].cells.length > 2 )
                  tab.rows[i].deleteCell(2);
                tab.rows[i].cells[1].innerHTML = texts[lib.lang].gui.buildingCompleted;
                tab.rows[i].cells[1].style.color = "";
                tab.rows[i].cells[1].className = "inactive";
                tab.rows[i].cells[1].style.textAlign = "center";
                tab.rows[i].cells[1].colSpan = 6;            
              }
            }
          }
          tab.rows[i].cells[0].setAttribute("state",state);
        }
      }
      for( var i = 0; i < append.length; i++ ) {
        var row = tab.insertRow(tab.rows.length);
        row.className = "_toggle";
        row.innerHTML = append[i];
        row.style.display = "none";
      }
      var label;
      if( append.length > 0 ) {
        var chk = document.getElementById("toggle_reqs");
        if( chk )
          label = chk.parentNode;
        else {
          label = tab.parentNode.insertBefore(ce("label"),tab.nextSibling);
          label.innerHTML =  '<input type="checkbox" name="toggle_reqs" id="toggle_reqs" onclick="toggle_visibility_by_class(\'toggle\',\'table-row\')" />' + texts[lib.lang].gui.showAllBuidlings;
        }
      }
      var input = document.getElementById("hide_completed");
      if( input ) {
        if( !input.checked ) {
          input.setAttribute("onclick", "");
          input.addEventListener("click", BuildAssist.hideCompleted, false);
          input.checked = lib.storage.getValue("hideCompleted"+ownPid, 0) == 1;
          if( input.checked )
            BuildAssist.hideCompleted();
        }
      }
      else {
        var p = tab.parentNode.insertBefore(ce("p"),append.length > 0 ? label.nextSibling : tab.nextSibling );
        var input = p.appendChild(ce("input"));
        input.type = "checkbox";
        input.id = "hide_completed";
        input.checked = lib.storage.getValue("hideCompleted"+ownPid,0) == 1;
        if( input.checked )
          BuildAssist.hideCompleted();
        input.addEventListener("click", BuildAssist.hideCompleted, false);
        label = p.appendChild(ce("label"));
        label["for"] = "hide_completed";
        label.innerHTML = texts[lib.lang].gui.hideCompletedBuildings;
      }
    }

    for( var i = 1; i < tab.rows.length - 1; i++ ) {
      var r = 0;
      if( tab.rows[i].cells.length == 7 && texts[lib.lang].regex.resAvailable.test(tab.rows[i].cells[6].innerHTML) ) {
        for( var key in resInfos ) {
          var val = parseInt(tab.rows[i].cells[1+r].innerHTML.replace(/<[^>]+>|\./g, ""),10);
          var dif = val - BuildAssist.curRessis[key];
          tab.rows[i].cells[1+r].style.whiteSpace="nowrap";
          if( dif > 0 )
            tab.rows[i].cells[1+r].innerHTML = '<img src="graphic/'+resInfos[key].img+'" alt="" title="'+texts[lib.lang].resources[key]+'"/> '+ val + ' <span style="color:red;">('+ dif + ')</span>';
          else
            tab.rows[i].cells[1+r].innerHTML = '<img src="graphic/'+resInfos[key].img+'" alt="" title="'+texts[lib.lang].resources[key]+'"/> '+ val + ' <span class="inactive">(0)</span>';
          r++;
        }
        tab.rows[i].cells[4].style.whiteSpace="nowrap";
      }
    }
  },
  hideCompleted : function () {
    var checked = document.getElementById("hide_completed").checked;
    lib.storage.setValue("hideCompleted"+ownPid, checked ? 1 : 0 );
    var tab = BuildAssist.getBuildingTab();
    for( var i = 1; i < tab.rows.length; i++ ) {
      var state = parseInt(tab.rows[i].cells[0].getAttribute("state"),10);
      if( state == 1 || state == 2 )
        tab.rows[i].style.display = (checked ? "none":"");
    }
  },
  getLoyalty : function() {
    var tabs = $("content_value").getElementsByTagName("table")[1].getElementsByTagName("table");
    var loyalty = 100;
    for( var i = 0; i < tabs.length; i++ ) {
      if( texts[lib.lang].regex.loyalty.test(tabs[i].rows[0].cells[0].textContent) ) {
        loyalty = parseInt( tabs[i].rows[0].cells[1].textContent,10);
        break;
      }
    }
    curVillage.loyalty.timestamp = lib.getTime();
    curVillage.loyalty.value = loyalty;
    curVillage.save();
  },
}
var Report = {
  bashPoints : { spear: [4,1], sword: [5,2], axe: [1,4], archer: [5,2], spy: [1,2], light: [5,13], marcher: [6,12], heavy: [23,15], ram: [4,8], catapult: [12,10], knight: [40,20], snob: [200,200], militia: [4,0] },
  groups : {
    attack_luck: { hasTitle: true,  hasSpacer: false },
    attack_moral: { hasTitle: false, hasSpacer: false },
    attack_info_att: { hasTitle: false, hasSpacer: true  },
    attack_info_def: { hasTitle: false, hasSpacer: true  },
    attack_spy: { hasTitle: true,  hasSpacer: true  },
    attack_away_units: { hasTitle: true,  hasSpacer: false },
    attack_running_units: { hasTitle: true,  hasSpacer: false },
    attack_results: { hasTitle: false, hasSpacer: true  }
  },
  order : [],
  doIt: function() {
    if( lib.params.screen == "report" ) {
      if( lib.params.get("view",0) == 0 )
        Report.initOverview();
      else {
        Report.setHotKeys();
        Report.modReport();
        Report.parse(false);
      }
    }
  },
  modReport : function() {
    if( Settings.settings.report.showSurvivors || Settings.settings.report.showBPs || Settings.settings.report.showLostCost ) {
      Report.modUnitsTab("attack_info_att",1);
      Report.modUnitsTab("attack_info_def",0);
    }
    var table = document.getElementsByClassName("vis")[3];
    if( texts[lib.lang].regex.reportTitle.test(table.innerHTML) ) {
      var lnks = table.rows[table.rows.length-1].cells[0].getElementsByTagName("a");
      if( lnks.length > 5 ) {
        var lnk = lnks[lnks.length-2];
        var before = lnk.nextSibling;
        var parent = lnk.parentNode;
        
        parent.insertBefore(ce("br"), before);
        var idx = 2;
        if( !/info_village/.test(lnks[idx]) )
          idx++;
        var vids = [lnks[1].href.match(/id=(\d+)/)[1],lnks[idx].href.match(/id=(\d+)/)[1]];
        var a = parent.insertBefore(ce("a"), before);
        a.href = lib.createLink("place", "mode", "command", "target", vids[1], false ).replace(/village=\d+/,"village="+vids[0]);
        a.innerHTML = "&raquo; " + texts[lib.lang].gui.attackAgain;
      }
    }
    if( Settings.settings.report.enableReorder ) {
      var defValue = [];
      for( var key in Report.groups )
        defValue.push({key: key, show: true});
      Report.order = lib.storage.getValue("reportorder"+ownPid,defValue);
      Report.reorder();
    }
  },
  modUnitsTab : function(id,mode) {
    var tab = $(id+"_units");
    if( tab ) {
      var data = { wood: 0, stone: 0, iron: 0, bps: 0 };
      if( Settings.settings.report.showSurvivors ) {
        var row = tab.insertRow(-1);
        row.className = "center";
        var cell = row.insertCell(0);
        cell.innerHTML = texts[lib.lang].gui.survivors+":";
      }
      for( var i = 1; i < tab.rows[0].cells.length; i++ ) {
        var unit = tab.rows[0].cells[i].innerHTML.match(/unit\/unit_([^\.]+)\.png/)[1];
        var count = parseInt(tab.rows[1].cells[i].innerHTML,10);
        var lost  = parseInt(tab.rows[2].cells[i].innerHTML,10);
        if( Settings.settings.report.showSurvivors ) {
          var cell = row.insertCell(-1);
          var s = count - lost;
          if( s == 0 )
            cell.className = "hidden";
          cell.innerHTML = s;
        }
        data.bps += lost * Report.getBPs(unit,mode);
        for( var key in resInfos )
          data[key] += lost * serverInfo.unitInfo[unit][key];
      }
      if( Settings.settings.report.showSurvivors && data.wood == 0 )
        tab.tBodies[0].removeChild(row);
      var tab = $(id);
      if( Settings.settings.report.showLostCost && data.wood > 0 ) {
        row = tab.insertRow(-1);
        cell = row.insertCell(0);
        cell.innerHTML = texts[lib.lang].gui.lostCost+":";
        cell = row.insertCell(1);
        var html = "";
        for( var key in resInfos )
          html += ' <img src="graphic/'+resInfos[key].img+'" alt="'+texts[lib.lang].resources[key]+'" title="'+texts[lib.lang].resources[key]+'"/> ' + lib.formatNumber(data[key], true, true);
        cell.innerHTML = html;
      }
      if( Settings.settings.report.showBPs && data.bps > 0) {
        row = tab.insertRow(-1);
        cell = row.insertCell(0);
        cell.innerHTML = texts[lib.lang].gui.bpTitle[mode] + ":";
        row.insertCell(1).innerHTML = lib.formatNumber(data.bps,true,true);
      }
    }
  },
  reorder : function() {
    var td = $("dsfm_report_content");
    var head = document.getElementsByTagName("h3")[0];
    if( !td ) {
      if( !head )
        return;
      td = head.parentNode;
      if( td === null )
        return;
      td.id = "dsfm_report_content";
      var el = $("attack_luck");
      el = getByTagName(el,"h4","nextSibling");
      el.id = "attack_moral";
    }
    
    var html = '<table style="width:100%"><tr><td style="width:100%"><h3>'+head.textContent+'</h3></td>';
    html += '<td style="text-align:right; vertical-align:top;"><a href="#" onclick="document.getElementById(\'dsfm_report_settings\').style.display=\'block\';return false;">'+texts[lib.lang].gui.order+'</a>';
    html += '<div id="dsfm_report_settings" style="position:absolute; width: 250px; height: 100px; display:none;">';
    html += '<table class="popup_content" id="dsfm_reorder_tab" style="text-align:left; border: 2px solid #804000;">';
    for( var i = 0; i < Report.order.length; i++ ) {
      html += '<tr><td/><td><input type="checkbox" ';
      if( Report.order[i].show )
        html += 'checked="checked" ';
      html += 'name="'+Report.order[i].key+'"/><span>'+texts[lib.lang].gui.reportGroups[Report.order[i].key]+"</span></td></tr>";
    }
    html += '<tr><td colspan="2"><input type="button" value="'+texts[lib.lang].gui.ok_btn+'"/ id="dsfm_submit_order"></td></tr></table></div></td></tr></table>';

    for( var i = 0; i < Report.order.length; i++ ) {
      var el = $(Report.order[i].key);
      if( el ) {
        if( Report.groups[Report.order[i].key].hasTitle ) {
          var title = el;
          while( (title = title.previousSibling).nodeType == 3 );
          html += outerHTML(title,Report.order[i].show?"":"none");
        }
        html += outerHTML(el,Report.order[i].show?"":"none");
        if( Report.groups[Report.order[i].key].hasSpacer )
          html += "<br/>";
      }
    }

    var el = $("dsfm_report_links");
    if( el )
      html += outerHTML(el);
    else {
      html += '<div id="dsfm_report_links">';
      el = $("attack_results");
      while( el = el.nextSibling ) {
        if( el.nodeType != 3 )
          html += outerHTML(el);
      }
      html += "</div>";
    }
    td.innerHTML = html;
    $("dsfm_submit_order").addEventListener("click", Report.submitOrder, false);
    createPrioLinks($("dsfm_reorder_tab"),0,1,0);
  },
  submitOrder : function() {
    $("dsfm_report_settings").style.display="none";
    var tab = $("dsfm_reorder_tab");
    Report.order = [];
    for( var i = 0; i < tab.rows.length-1; i++ ) {
      var chk = getByTagName(tab.rows[i].cells[1], "input", "firstChild");
      var span = getByTagName(chk, "span", "nextSibling");
      Report.order.push( { key: chk.name, show: chk.checked } );
    }
    lib.storage.setValue("reportorder"+ownPid,Report.order);
    Report.reorder();
  },
  getBPs : function(unit,mode) {
    if( serverInfo.misc_kill_ranking == 1 )
      return serverInfo.unitInfo[unit].pop;
    else
      return Report.bashPoints[unit][mode];
  },
  setHotKeys : function() {
    if( Settings.settings.misc.useHotKeys ) {
      var tables = document.getElementsByClassName("vis");
      var table;
      
      var tableTop = tables[2];
      var tableBottom = getByTagName(tables[2], "table", "nextSibling",2);
      var a = [ tableTop.getElementsByTagName("a"), tableBottom.getElementsByTagName("a") ];
      tableTop.style.whiteSpace="nowrap";
      tableBottom.style.whiteSpace="nowrap";

      for( var i = 0; i < a[0].length; i++ ) {
        var hk;
        if( /mode=forward/.test(a[0][i].href) )
          hk = "forward";
        else if( /mode=move/.test(a[0][i].href) )
          hk = "move";
        else if( /action=del_one/.test(a[0][i].href) )
          hk = "del";
        else if( a[0][i].innerHTML == "&lt;&lt;" )
          hk = "next";
        else if( a[0][i].innerHTML == "&gt;&gt;" )
          hk = "prev";

        if( hk ) {
          var txt = HotKeys.add("reports",hk,a[0][i].href);
          a[0][i].innerHTML += txt;
          a[1][i].innerHTML += txt;
        }
      }
    }
  },
  initOverview : function() {
    var frm = document.getElementsByTagName("form");
    var tab = getByTagName(frm[0],"table", "previousSibling");
    var row = tab.insertRow(tab.rows.length);
    var cell = row.insertCell(0);
    cell.colSpan = 2;
    var atts = lib.storage.getValue("atts","").split(";");
    var attsDone = 0;
    var ts = lib.getTime();
    for( var i = 0; i < atts.length; i++ ) {
      var parts = atts[i].split(",");
      if( parseInt(parts[3],10) <= ts )
        attsDone++;
    }
    var page_size = frm[1].getElementsByTagName("input")[0].value;
    var page = Math.floor(attsDone / page_size);
    var from = page_size * page;
    page++;
    cell.innerHTML = texts[lib.lang].gui.lastOwnAttackPage + ' <a href="' + lib.createLink("report","mode","attack","from",from,false) + '">['+page+']</a>';
    var e = getByTagName(frm[0],"table","firstChild");
    if( e ) {
      e.rows[0].appendChild(ce("th")).innerHTML = "FM";
      e.rows[e.rows.length-1].appendChild(ce("th"));
      var lnks = e.getElementsByTagName("a");
      var row = 1;
      var maxAge = Settings.settings.misc.reportMaxAge * 24 * 60 * 60;
      var states = ["green","yellow","red"];
      var rids = lib.storage.getValue("rids","");
      for( var i = 0; i < lnks.length; i++ ) {
        var id = lnks[i].href.match(/view=(\d+)/);
        if( id ) {
          var hasReport = new RegExp("\\d+,"+id[1]+";").test(rids);
          var state = 0;
          if( !hasReport ) {
            var ts = texts[lib.lang].locale.date2MS(e.rows[row].cells[1].innerHTML.match(texts[lib.lang].regex.datetime))/1000;
            if( lib.getTime() - ts > maxAge )
              state = 1;
            else
              state = 2;
          }
          e.rows[row++].appendChild(ce("td")).innerHTML = '<img src="/graphic/dots/' + states[state] + '.png" alt="" title="' + texts[lib.lang].gui.reportStates[state] + '"/>';
        }
      }
    }
  },
  parse : function(isPublicReport) {
    var rid;
    var tables = document.getElementsByClassName("vis");
    rid = parseInt(location.href.match( /view=(\d+)/ )[1], 10);
    var table;
    var table = tables[3];
    var res = table.innerHTML.match(texts[lib.lang].regex.sendDate);
    var ts = texts[lib.lang].locale.date2MS(res)/1000;
    var age = (lib.getTime() - ts) / 3600;
    var rids = lib.storage.getValue("rids","");
    var ridre = new RegExp( "\\d+,"+rid+";" );
    var known = ridre.test(rids);
    if( texts[lib.lang].regex.reportTitle.test(table.innerHTML) ) {
      var msgRow = table.insertRow(1);
      msgRow.insertCell(0).innerHTML = texts[lib.lang].gui.stateTitle;
      var msg = msgRow.insertCell(1);

      var playerids = [0,0];

      var tab = $("attack_info_att");
      res = tab.rows[0].cells[1].innerHTML.match( /id=(\d+)/ );
      if( res )
        playerids[0] = parseInt(res[1],10);
      res = tab.rows[1].cells[1].textContent.match( texts[lib.lang].regex.villageLink );
      if( res ) {
        tab.rows[1].cells[1].setAttribute("coords",res[1]+"_"+res[2]);
        RunTimes.createToolTip(tab.rows[1].cells[1]);
      }
      tab = $("attack_info_def");
      res = tab.rows[0].cells[1].innerHTML.match( /id=(\d+)/ );
      if( res )
        playerids[1] = parseInt(res[1],10);
      res = tab.rows[1].cells[1].textContent.match( texts[lib.lang].regex.villageLink );
      if( res ) {
        tab.rows[1].cells[1].setAttribute("coords",res[1]+"_"+res[2]);
        RunTimes.createToolTip(tab.rows[1].cells[1]);
      }

      var vid = parseInt(tab.rows[1].cells[1].innerHTML.match( /id=(\d+)/ )[1],10);
      var dstCoords = tab.rows[1].cells[1].textContent.match(texts[lib.lang].regex.villageLink);
      var vKey = dstCoords[1]+"_"+dstCoords[2];
      if( known )
        msg.innerHTML = texts[lib.lang].gui.reportKnown;
      else {
        var restab = $("attack_results");
        var loy = 100;
        if( restab ) {
          var res = restab.innerHTML.match(texts[lib.lang].regex.loyaltyChange);
          if( res )
            loy = parseInt(res[1], 10);
        }
        if( playerids[1] == ownPid || playerids[0] == ownPid && loy <= 0 ) {
          deleteVillageInfos(dstCoords[1]+"_"+dstCoords[2]);
          msg.innerHTML = texts[lib.lang].gui.ownVillage;
        }
        else {
          var villageInfo = new Village( vKey );
          if( villageInfo.lastreport.timestamp < ts || villageInfo.lastreport.rid < rid ) {
            villageInfo.lastreport.rid = rid;
            villageInfo.lastreport.timestamp = ts;
          }
          if( loy < 100 && (villageInfo.loyalty.timestamp < ts || villageInfo.loyalty.rid < rid) ) {
            villageInfo.loyalty.rid = rid;
            villageInfo.loyalty.timestamp = ts;
            villageInfo.loyalty.value = loy;
          }

          atts = lib.storage.getValue( "atts","");
          atts = atts.replace(new RegExp("\\d+,"+playerids[0]+","+dstCoords[1]+"_"+dstCoords[2]+",\\d+;"),"");
          lib.storage.setValue("atts",atts);
          if( age > Settings.settings.misc.reportMaxAge * 24 )
            msg.innerHTML = texts[lib.lang].gui.oldReport;
          else {
            if( restab && restab.rows.length > 0 && age < Settings.settings.map.sumHours ) {
              if( texts[lib.lang].regex.beute.test(restab.rows[0].cells[0].innerHTML) ) {
                var beute = {"wood":0, "stone":0, "iron":0};
                var imgs = restab.rows[0].cells[1].getElementsByTagName("img");
                var res = restab.rows[0].cells[1].innerHTML.replace(/<[^>]+>/g, "").replace(/\./g,"").split(" ");
                var load = restab.rows[0].cells[2].innerHTML.replace(/<[^>]+>/g, "").replace(/\./g,"").split("/");
                load[0] = parseInt(load[0],10);
                load[1] = parseInt(load[1],10);
                if( load[1] > 0 )
                  villageInfo.eq = Math.round((villageInfo.eq + (load[0] * 100 / load[1]))/2);
                for( var b = 0; b < imgs.length; b++ )
                  beute[resKey[imgs[b].title]] = res[b];
                var beuten = lib.storage.getValue("beute","");
                if( !new RegExp(","+rid+";").test(beuten) )
                  lib.storage.setValue("beute", beuten + ts + "," + playerids[0] + "," + beute["wood"]+","+beute["stone"]+","+beute["iron"]+","+rid+";");
              }
            }

            tab = $("attack_spy");
            if( tab ) {
              if( texts[lib.lang].regex.spyres.test(tab.rows[0].cells[0].innerHTML) ) {
                var imgs = tab.rows[0].cells[1].getElementsByTagName("img");
                res = tab.rows[0].cells[1].innerHTML.replace(/<[^>]+>/g, "").replace(/\./g,"").split(" ");
                if( villageInfo.res.timestamp < ts || villageInfo.res.rid < rid ) {
                  villageInfo.res.rid = rid;
                  villageInfo.res.timestamp = ts;
                  for( i = 0; i < imgs.length; i++ )
                    villageInfo.res[resKey[imgs[i].title]] = res[i];
                }
              }
              if( tab.rows.length > 1 && texts[lib.lang].regex.building.test( tab.rows[1].cells[0].innerHTML ) ) {
                if( villageInfo.buildings.timestamp < ts || villageInfo.buildings.rid < rid ) {
                  var buildings = tab.rows[1].cells[1].innerHTML.replace(/<[^>]+>/g,"").split("\n");
                  var levels = { };
                  for( var key in buildingKeys )
                    levels[buildingKeys[key]] = 0;
                  for( i = 0; i < buildings.length; i++ ) {
                    res = buildings[i].match(new RegExp( texts[lib.lang].regex.buildinglevel ));
                    if( res )
                      levels[buildingKeys[res[1].substring(0,res[1].length-1)]] = parseInt(res[2],10);
                  }
                  for( var key in levels ) {
                    var change = levels[key] - villageInfo.buildings[key].level;
                    villageInfo.buildings[key].level = levels[key];
                    if( villageInfo.buildings.rid > 0 )
                      villageInfo.buildings[key].change = change;
                  }
                  villageInfo.buildings.rid = rid;
                  villageInfo.buildings.timestamp = ts;
                }
              }
              if( tab.rows.length > 2 && texts[lib.lang].regex.defunits.test(tab.rows[tab.rows.length-2].cells[0].innerHTML) ) {
                if( villageInfo.unitsout.timestamp < ts || villageInfo.unitsout.rid < rid ) {
                  var unittab = tab.rows[tab.rows.length-1].cells[0].getElementsByTagName("table")[0];
                  villageInfo.unitsout.rid = rid;
                  villageInfo.unitsout.timestamp = ts;
                  for( var i = 0; i < unittab.rows[0].cells.length; i++ ) {
                    res = unittab.rows[0].cells[i].innerHTML.match(/unit\/unit_([^\.]+)\.png/);
                    villageInfo.unitsout[res[1]] = parseInt(unittab.rows[1].cells[i].innerHTML, 10);
                  }
                }
              }
            }
            else if( villageInfo.res.timestamp < ts || villageInfo.res.rid < rid ) {
              villageInfo.res.rid = rid;
              villageInfo.res.timestamp = ts;
              if( load && load[0] == load[1] ) {
                for( var res in resInfos ) {
                  villageInfo.res[res] -= beute[res];
                  if( villageInfo.res[res] < 0 )
                    villageInfo.res[res] = 0;
                }
              }
              else {
                villageInfo.res.wood = 0;
                villageInfo.res.stone = 0;
                villageInfo.res.iron = 0;
              }
            }
            if( villageInfo.buildings.rid != rid ) {
              var re = texts[lib.lang].regex.damage.toString();
              var re = new RegExp(re.substring(1,re.length-1),"g");
              res = restab.innerHTML.match(re);
              if( res ) {
                for( var i = 0; i < res.length; i++ ) {
                  var vals = res[i].match(texts[lib.lang].regex.damage);
                  if( vals ) {
                    var level = parseInt( vals[2], 10 );
                    villageInfo.buildings[buildingKeys[vals[1]]].change = level - villageInfo.buildings[buildingKeys[vals[1]]].level;
                    villageInfo.buildings[buildingKeys[vals[1]]].level = level;
                  }
                }
              }
            }
            var unittab = $("attack_info_def_units");
            if( unittab && (villageInfo.unitsin.timestamp < ts || villageInfo.unitsin.rid < rid) ) {
              villageInfo.unitsin.rid = rid;
              villageInfo.unitsin.timestamp = ts;
              var units = {};
              for( var i = 1; i < unittab.rows[0].cells.length; i++ ) {
                res = unittab.rows[0].cells[i].innerHTML.match(/unit\/unit_([^\.]+)\.png/);
                villageInfo.unitsin[res[1]] = parseInt(unittab.rows[1].cells[i].innerHTML, 10) - parseInt(unittab.rows[2].cells[i].innerHTML, 10);
              }
            }

            msg.innerHTML = texts[lib.lang].gui.reportRead;
            villageInfo.save();
          }
        }
      }
    }
    else if( texts[lib.lang].regex.reportSupport.test(table.innerHTML) ) {
      var tab = table.rows[2].cells[0].getElementsByTagName("TABLE")[0];
      var vid = 0;
      if( tab.rows[0].cells[1].innerHTML.match(/id=(\d+)/)[1] == ownPid )
        vid = tab.rows[1].cells[1].innerHTML.match(/id=(\d+)/)[1];
      else if( tab.rows[2].cells[1].innerHTML.match(/id=(\d+)/)[1] == ownPid )
        vid = tab.rows[3].cells[3].innerHTML.match(/id=(\d+)/)[1];
      if( vid > 0 ) {
        table.rows[2].cells[0].appendChild(ce("br"));
        var a = table.rows[2].cells[0].appendChild(ce("a"));
        a.href = lib.createLink("place","mode","units",false).replace(/village=\d+/,"village="+vid);
        a.innerHTML = "&raquo; " + texts[lib.lang].gui.moveOwnUnits;
      }
    }
    if( age < Settings.settings.misc.reportMaxAge * 24 && !known ) {
      rids += ts + "," + rid + ";"
      lib.storage.setValue("rids",rids);
    }
  },
}
var InfoVillage = {
  doIt : function() {
    if( lib.params.screen == "info_village" ) {
      var tab = $("content_value").getElementsByTagName("table")[1];
      var coords = tab.rows[1].cells[1].innerHTML.split("|");
      var key = coords[0]+"_"+coords[1];
      var hasData = lib.storage.getValue(key);
      if( hasData ) {
        var row = tab.insertRow(tab.rows.length);
        var cell = row.insertCell(0);
        cell.colSpan=2;
        var a = cell.appendChild(ce("a"));
        a.href = "javascript:;";
        a.innerHTML = "&raquo; "+texts[lib.lang].gui.delinfos;
        a.addEventListener("click", function(e) { if( confirm(texts[lib.lang].gui.confirm_delinfos) ) {  deleteVillageInfos(key); e.target.parentNode.parentNode.removeChild(e.target.parentNode);} }, false );
      }
      var row = tab.insertRow(tab.rows.length);
      var cell = row.insertCell(0);
      cell.colSpan=2;
      var input = cell.appendChild(ce("input"));
      cell.appendChild(document.createTextNode(texts[lib.lang].gui.delfromfarmlist));
      input.type="checkbox";
      input.checked = new RegExp(key+";").test(lib.storage.getValue("nofarms"+ownPid,""));
      input.addEventListener("click", function(e) { if( this.checked ) lib.storage.setValue("nofarms"+ownPid,lib.storage.getValue("nofarms"+ownPid)+key+";"); else lib.storage.setValue("nofarms"+ownPid,lib.storage.getValue("nofarms"+ownPid,"").replace(new RegExp(key+";","g"),"")); }, false );

      row = tab.insertRow(tab.rows.length);
      cell = row.insertCell(0);
      cell.colSpan = 2;
      var dist = Math.sqrt(Math.pow(parseInt(coords[0],10) - curVillage.coords.x, 2) + Math.pow(parseInt(coords[1],10) - curVillage.coords.y, 2));
      if( dist > 0 )
        RunTimes.insertTable(cell,dist);
    }
  },
}
var OV = { // OverviewVillages
  tab : null,
  ctxMenu : null,
  distCol : 1,
  doIt : function() {
    if( lib.params.screen == "overview_villages" ) {
      var mode = $('overview').value;
      switch( mode ) {
        case "combined":
          OV.setTable("combined_table");
          OV.addControls(true,true);
          OV.tab.tHead.rows[0].cells[OV.distCol-1].innerHTML += " (" + OV.tab.tBodies[0].rows.length + ")";
          var sorter = new TableSorter(OV.tab,"row_a","row_b");
          OV.tab.tHead.rows[0].insertBefore(ce("th"),OV.tab.tHead.rows[0].cells[OV.distCol]).innerHTML = texts[lib.lang].gui.dist;
          OV.insertHideHead();
          var rows = OV.tab.tBodies[0].rows;
          for( var i = 0; i < rows.length; i++ ) {
            rows[i].cells[OV.distCol-1].setAttribute("dsfm_order",i);
            OV.insertDistCol(rows[i]);
            OV.insertHideCol(rows[i],1);
          }
          i = OV.distCol-1;
          sorter.addSortColumn(i++,compareOrderCell,1);
          sorter.addSortColumn(i++,RunTimes.compareDistCell);
          sorter.addSortColumn(i++,OV.compareCombinedProdCell);
          sorter.addSortColumn(i++,OV.compareCombinedProdCell);
          sorter.addSortColumn(i++,OV.compareCombinedProdCell);
          sorter.addSortColumn(i++,OV.compareCombinedProdCell);
          sorter.addSortColumn(i++,OV.compareCombinedProdCell);
          if( serverInfo.buildingInfo.church )
            i++;
          sorter.addSortColumn(i++,compareNumericCell);
          for( var i = 2; i < serverInfo.unitAnz+3; i++ )
            sorter.addSortColumn(OV.tab.tHead.rows[0].cells.length-i,compareNumericCell);
          OV.updateDest();
          break;
        case "commands":
          OV.setTable("commands_table");
          OV.tab.tHead.rows[0].className += " nowrap";
          OV.getCommands();
          for( var i = 0; i < OV.tab.tBodies[0].rows.length; i++ ) {
            OV.tab.tBodies[0].rows[i].cells[2].setAttribute("dsfm_order",i);
          }
          OV.tab.tHead.rows[0].cells[0].innerHTML += " (" + i + ")";
          var sorter = new TableSorter(OV.tab,"row_a","row_b");
          sorter.addSortColumn(0,compareStringCell,0);
          sorter.addSortColumn(1,compareStringCell,0);
          sorter.addSortColumn(2,compareOrderCell,1);
          var idx = 3;
          for( var key in serverInfo.unitInfo ) {
            if( key != "militia" )
              sorter.addSortColumn(idx++,compareNumericCell,0);
          }
          break;
        case "units":
          OV.setTable("units_table");
          OV.addControls(true,true);
          OV.tab.tHead.rows[0].insertBefore(ce("th"),OV.tab.tHead.rows[0].cells[OV.distCol]).innerHTML = texts[lib.lang].gui.dist;
          OV.insertHideHead();
          var type = document.getElementsByClassName("selected")[1].innerHTML.match(/type=([^&"]+)/);
          if( type ) {
            type = type[1];
            var callback = function(row) { return row.cells[0].rowSpan > 1; }
            switch( type ) {
              case "complete":
                OV.doUnitsComplete();
                break;
              case "own_home":
                OV.addRunTimeFilter();
              case "there":
              case "away":
              case "moving":
                OV.doUnitsVillage();
                break;
              case "support_detail":
              case "away_detail":
                OV.doUnitsDetail();
                break;
            }
          }
          break;
        case "prod":
          OV.setTable("production_table");
          OV.addControls(Settings.settings.prod.runtimeCol,true);
          OV.doProd();
          break;
        case "groups":
          OV.getGroups();
          break;
        case "incomings":
          break;
          OV.setTable("incomings_table");
          OV.tab.appendChild(ce("tfoot"));
          OV.tab.tFoot.appendChild(OV.tab.tBodies[0].rows[OV.tab.tBodies[0].rows.length-1]);
          for( var i = 0; i < OV.tab.tBodies[0].rows.length; i++ ) {
            OV.tab.tBodies[0].rows[i].cells[3].setAttribute("dsfm_order",i);
          }
          OV.tab.tHead.rows[0].cells[0].innerHTML += " (" + i + ")";
          var sorter = new TableSorter(OV.tab,"row_a","row_b");
          sorter.addSortColumn(0,compareStringCell,0);
          sorter.addSortColumn(1,compareStringCell,0);
          sorter.addSortColumn(2,compareStringCell,0);
          sorter.addSortColumn(3,compareOrderCell,1);
          break;
      }
    }
  },
  setTable : function(id) {
    OV.tab = $(id);
    if( OV.tab && OV.tab.tHead === null ) {
      OV.tab.insertBefore(ce("thead"),OV.tab.tBodies[0]);
      OV.tab.tHead.appendChild(OV.tab.tBodies[0].rows[0]);
      for( var i = 0; i < OV.tab.tBodies.length; i++ ) {
        if( OV.tab.tBodies[i].rows.length == 0 )
          OV.tab.removeChild(OV.tab.tBodies[i--]);
      }
    }
    if( /overview\/note\.png/.test(OV.tab.tHead.rows[0].cells[0].innerHTML) )
      OV.distCol++;
	var sel = document.getElementsByClassName("selected");
    if( sel.length == 3 ) {
      var href = sel[1].getElementsByTagName("a")[0].href;
      var type = href.match(/.*&(.*)type=([^&"]+)/);
      var a = $("paged_view_content").getElementsByTagName("table")[0].getElementsByTagName("a");
      for( var i = 0; i < a.length; i++ )
        a[i].href += "&"+type[1]+"type="+type[2];
    }
  },
  getCommands : function() {
    var func = OV.getAtts;
    var get = lib.storage.getValue("getatts"+ownPid,false);
    if( lib.params.group == 0 && lib.params.type=="attack" && lib.params.page==-1 ) {
      if( get ) {
        OV.parseAtts();
        return;
      }
      else
        func = OV.parseAtts;
    }
    if( !get ) {
      var tab = $("commands_table");
      var a = tab.parentNode.insertBefore(ce("a"),tab);
      a.innerHTML = "&raquo; " + texts[lib.lang].gui.getatts + HotKeys.add( "place", "getAtts", func );
      a.href = "javascript:;";
      a.id = "dsfm_getatts";
      a.addEventListener("click", func, false );
    }
  },
  doProd : function() {
    var ts = lib.getTime();
    var cols = [];
    var sum = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
    var x, y, valid = false;
    if( Settings.settings.prod.runtimeCol ) {
      x = parseInt($("dsfm_dst_x").value,10);
      y = parseInt($("dsfm_dst_y").value,10);
      valid = !isNaN(x) && x >= 0 && x <= 999 && !isNaN(y) && y >= 0 && y <= 999;
    }
    //OV.tab.style.display = "none";
    var row = OV.tab.tHead.rows[0];
    var cell;
    Storage.modResHeader(row,OV.distCol+1);
    OV.insertHideHead();
    if( Settings.settings.prod.runtimeCol ) {
      cell = row.insertBefore(ce("th"),row.cells[OV.distCol]);
      cell.innerHTML = texts[lib.lang].gui.dist;
    }
    var rows = OV.tab.tBodies[0].rows;
    for( var i = 0; i < rows.length; i++ ) {
      if( Settings.settings.prod.removeBuildTime )
        rows[i].cells[OV.distCol+5].innerHTML = rows[i].cells[OV.distCol+5].innerHTML.replace(/[^<]+<br\/?>/i,"");
      var id = rows[i].cells[OV.distCol-1].innerHTML.match(/village=(\d+)/)[1];
      var coords = rows[i].cells[OV.distCol-1].innerHTML.match(/\((\d+)\|(\d+)\) K\d+</);
      var village = new MyVillage(id);
      village.coords.x = coords[1];
      village.coords.y = coords[2];
      var res = rows[i].cells[OV.distCol+1].textContent.replace(/\./g, "" ).split(" ");
      var idx = 0;
      var cur = 0;
      var max = parseInt(rows[i].cells[OV.distCol+2].innerHTML, 10);
      //var imgs = rows[i].cells[OV.distCol+1].getElementsByClassName("res");
      rows[i].cells[OV.distCol-1].setAttribute("dsfm_order",i);
      rows[i].cells[OV.distCol-1].setAttribute("coords",coords[1]+"_"+coords[2]);

      if( Settings.settings.prod.shrinkRecruitmentMode > 0 || Settings.settings.prod.showRecruitSums )
        Recruitment.shrinkDrillImgList(rows[i].cells[OV.distCol+7],Settings.settings.prod.shrinkRecruitmentMode);

      var off = OV.distCol;
      rows[i].insertCell(OV.distCol+1);
      rows[i].insertCell(OV.distCol+1);
      off += 2;
      rows[i].cells[OV.distCol+1].style.textAlign = "right";

      // Trader
      cell = rows[i].cells[off+3];
      cell.style.textAlign = "right";
      cur = cell.textContent.split("/");
      max = parseInt(cur[1], 10);
      cur = parseInt(cur[0], 10);
      sum[4] += cur;
      sum[6] += max;
      // Farm
      cell = rows[i].cells[off+4];
      cell.style.textAlign = "right";
      cur = cell.textContent.split("/");
      max = parseInt(cur[1], 10);
      cur = parseInt(cur[0], 10);
      percent = Math.round(cur * 100 / max);
      sum[5] += cur;
      sum[7] += max;
      var html = lib.formatNumber(cur,true,true);
      if( Settings.settings.prod.farmTotal )
        html += "/" + lib.formatNumber(max,true,true);
      village.res.pop.current = cur;
      village.res.pop.max = max;
      cell.innerHTML = html;
      if( Settings.settings.prod.farmColored )
        Storage.getColors("farm",percent,cell);
      // Storage
      cell = rows[i].cells[off+2];
      cell.style.textAlign = "right";
      max = parseInt(cell.textContent.replace(/\./g, "" ),10);
      sum[3] += max;
      cell.innerHTML = lib.formatNumber(max,true,true);

      village.res.storage = max;
      village.res.timestamp = ts;
      var c = OV.distCol+1;
      
      for( var key in resInfos ) {
        var cur = parseInt(res[idx],10);
        village.res[key] = cur;
        sum[idx++] += cur;
        var percent = Math.round( cur * 100 / max );
        cell = rows[i].cells[c++];
        cell.style.textAlign = "right";
        cell.style.cursor = "default";
        cell.style.paddingLeft = "5px";
        cell.style.paddingRight = "5px";
        cell.title = lib.formatNumber( max - cur, true, false ) + " " + texts[lib.lang].gui.freeRes;
        cell.innerHTML = lib.formatNumber(cur, true, true);
//          var div = cell.appendChild(ce("div"));
//          div.innerHTML = lib.formatNumber(cur, true, true);
        if( Settings.settings.prod.resColored )
          Storage.getColors("resource",percent,cell);
      }
      village.save();
      if( Settings.settings.prod.runtimeCol ) {
        cell = rows[i].insertCell(OV.distCol);
        cell.className = "dsfm_dist";
        cell.style.cursor = "default";
        cell.style.textAlign = "right";
        RunTimes.createToolTip(cell);
        if( valid ) {
          var dist = Math.sqrt(Math.pow(coords[1] - x, 2) + Math.pow(coords[2] - y, 2));
          cell.innerHTML = Math.round(dist*100)/100;
          cell.setAttribute('dist', dist);
        }
      }
      OV.insertHideCol(rows[i],1);
    }
    if( Settings.settings.prod.showSums ) {
      var foot = OV.tab.appendChild(ce("tfoot"));
      foot.className = "nowrap";
      row = foot.insertRow(0);
      cell = row.appendChild(ce("th"));
      cell.colSpan = OV.distCol + (Settings.settings.prod.runtimeCol ? 2 : 1);
      cell.style.textAlign = "right";
      cell.innerHTML = texts[lib.lang].gui.sum;
      var i = 0;
      for( ; i < 6; i++ ) {
        cell = row.appendChild(ce("th"));
        cell.style.textAlign = "right";
        if( i < 4 )
          cell.innerHTML = lib.formatNumber(sum[i],true,true,1);
        else
          cell.innerHTML = lib.formatNumber(sum[i],true,true,1) + "<br/>"+texts[lib.lang].gui.of+" "+lib.formatNumber(sum[i+2],true,true,1);
      }
      cell = row.appendChild(ce("th"));
      cell.colSpan = 4;
    }
    if( Settings.settings.prod.showRecruitSums )
      Recruitment.createSumTable(OV.tab.parentNode,OV.tab.nextSibling);
    var sorter = new TableSorter(OV.tab,"row_a","row_b");
    var cell = OV.distCol-1;
    OV.tab.tHead.rows[0].cells[OV.distCol-1].innerHTML += " ("+OV.tab.tBodies[0].rows.length+")";
    sorter.addSortColumn(cell++,compareOrderCell,1);
    if( Settings.settings.prod.runtimeCol )
      sorter.addSortColumn(cell++,RunTimes.compareDistCell);
    sorter.addSortColumn(cell++,compareNumericCell);
    sorter.addSortColumn(cell++,compareNumericCell);
    sorter.addSortColumn(cell++,compareNumericCell);
    sorter.addSortColumn(cell++,compareNumericCell);
    sorter.addSortColumn(cell++,compareNumericCell);
    sorter.addSortColumn(cell++,compareNumericCell);
    sorter.addSortColumn(cell++,compareNumericCell);
    sorter.addSortColumn(cell++,OV.compareProdCell);
    sorter.addSortColumn(cell++,OV.compareProdCell);
    sorter.addSortColumn(cell++,OV.compareProdCell);
    OV.tab.style.display = "";
  },
  addControls : function(coords,saveList) {
    var tab = OV.tab.parentNode.insertBefore(ce("table"),OV.tab);
    tab.id = "dsfm_controls";
    var row = tab.insertRow(0);
    if( coords ) {
      var dst = lib.storage.getValue("dst"+ownPid,"|").split("|");
      var cell = row.appendChild(ce("th"));
      cell.innerHTML = texts[lib.lang].gui.destVillage;
      cell = row.insertCell(-1);
      cell.appendChild(document.createTextNode("x:"));
      var input = cell.appendChild(ce("input"));
      input.size = 4;
      input.id = "dsfm_dst_x";
      input.value = dst[0];
      input.addEventListener("keyup", OV.updateDest, false );

      cell = row.insertCell(-1);
      cell.appendChild(document.createTextNode("y:"));
      input = cell.appendChild(ce("input"));
      input.size = 4;
      input.id = "dsfm_dst_y";
      input.value = dst[1];
      input.addEventListener("keyup", OV.updateDest, false );
    }
    if( saveList ) {
      var cell = row.insertCell(-1);
      var a = cell.appendChild(ce("a"));
      a.href = "javascript:;";
      a.innerHTML = "&raquo; " + texts[lib.lang].gui.saveOrderLink;
      a.addEventListener("click", OV.saveOrder, false );
    }
  },
  getAtts : function() {
    lib.storage.setValue("getatts"+ownPid, 1);
    location.href = lib.createLink("overview_villages", "mode", "commands", "group", 0, "type", "attack", "page", -1, false);
  },
  parseAtts : function () {
    lib.storage.setValue( "getatts"+ownPid, 0 );
    var tab = $("commands_table");
    var atts = lib.storage.getValue("atts","").replace(new RegExp("\\d+,"+ownPid+",\\d+_\\d+,\\d+;","g"),"");
    var ts = lib.getTime();
    var today = ts - ts%86400 + new Date().getTimezoneOffset()*60;
    var arrivalCol = 0;
    for( var i = 0; i < tab.rows[0].cells.length; i++ ) {
      if( texts[lib.lang].regex.arrivalTitle.test(tab.rows[0].cells[i].innerHTML) ) {
        arrivalCol = i;
        break;
      }
    }
    for( var i = 1; i < tab.rows.length; i++ ) {
      var res = $("labelText["+(i-1)+"]").innerHTML.match( texts[lib.lang].regex.villageLink );
      if( res ) {
        atts += ts + "," + ownPid + "," + res[1] + "_" + res[2] + ",";
        arrivalTime = texts[lib.lang].locale.timeStr2Sec(tab.rows[i].cells[arrivalCol].innerHTML);
        atts += arrivalTime+";"
      }
    }
    lib.storage.setValue( "atts", atts );
    var a = $("dsfm_getatts");
    if( a )
      a.parentNode.removeChild(a);
    alert( texts[lib.lang].gui.attsparsed );
  },
  getGroups : function() {
    var ts = lib.getTime();
    var tab = $("group_assign_table");
    for( var i = 1; i < tab.rows.length-1; i+=2 ) {
      var id = tab.rows[i].cells[0].innerHTML.match(/village=(\d+)/)[1];
      var coords = tab.rows[i].cells[0].innerHTML.match(/ \((\d+)\|(\d+)\) K\d+</);
      var village = new MyVillage(id);
      village.coords.x = coords[1];
      village.coords.y = coords[2];
      village.groups.timestamp = ts;
      var groups = tab.rows[i].cells[3].innerHTML;
      if( /class="grey"/.test(groups) )
        village.groups.list = [];
      else
        village.groups.list = groups.split("; ");
      village.save();
    }
  },
  doUnitsComplete : function() {
    var ts = lib.getTime();
    var units = [];
    var sum = { 
      home: { },
      there: { },
      away: { },
      moving: { },
    };
    for( var c = OV.distCol+2; c < OV.tab.rows[0].cells.length - 2; c++ ) {
      var unit = OV.tab.rows[0].cells[c].innerHTML.match(/unit\/unit_([^\.]+)\.png/)[1];
      units.push(unit);
      sum.home[unit] = 0;
      sum.there[unit] = 0;
      sum.away[unit] = 0;
      sum.moving[unit] = 0;
    }
    OV.tab.rows[0].cells[OV.distCol-1].innerHTML += " (" + OV.tab.tBodies.length + ")";
    for( var i = 0; i < OV.tab.tBodies.length; i++ ) {
      var row = 0;
      var id = OV.tab.tBodies[i].rows[0].cells[OV.distCol-1].innerHTML.match(/village=(\d+)/);
      if( id ) {
        id = id[1];
        var coords = OV.tab.tBodies[i].rows[0].cells[OV.distCol-1].innerHTML.match(/ \((\d+)\|(\d+)\) K\d+</);
        OV.tab.tBodies[i].rows[0].cells[OV.distCol-1].setAttribute("dsfm_order",i);
        var village = new MyVillage(id);
        village.coords.x = coords[1];
        village.coords.y = coords[2];
        for( var key in sum ) {
          var off = row == 0 ? 2 : 1;
          off += OV.distCol-1;
          for( var col = 0; col < units.length; col++ ) {
            var val = parseInt(OV.tab.tBodies[i].rows[row].cells[col+off].textContent,10);
            sum[key][units[col]] += val;
            village.units[key][units[col]] = val;
          }
          row++;
        }
        OV.insertDistCol(OV.tab.tBodies[i].rows[0],coords).rowSpan=5;
        OV.insertHideCol(OV.tab.tBodies[i].rows[0],5);
        village.units.timestamp = ts;
        village.save();
      }
    }

    var sorter = new TableSorter(OV.tab,"row_a","row_b",true);
    sorter.addSortColumn(0,compareOrderCell,1);
    sorter.addSortColumn(1,RunTimes.compareDistCell,0);
    var tfoot = OV.tab.appendChild(ce("tfoot"));
    var row = tfoot.appendChild(ce("tr"));
    var cell = row.appendChild(ce("th"));
    cell.rowSpan = OV.tab.tBodies[0].rows[0].rowSpan+1;
    cell.colSpan = 2;
    cell.innerHTML = texts[lib.lang].gui.sum;
    cell.style.textAlign = "right";
    cell.style.verticalAlign = "top";
    var r = 0;
    for( var key in sum ) {
      row = tfoot.appendChild(ce("tr"));
      cell = row.appendChild(ce("th"));
      cell.innerHTML = OV.tab.tBodies[0].rows[r].cells[r++==0?2:0].innerHTML;
      cell.style.textAlign = "right";
      cell.style.fontWeight = "normal";
      var rowSum  = 0;
      for( var unit in sum[key] ) {
        cell = row.appendChild(ce("th"));
        cell.style.textAlign = "right";
        cell.style.fontWeight = "normal";
        rowSum += sum[key][unit];
        cell.innerHTML = lib.formatNumber(sum[key][unit],true,true,2);
        cell.title = lib.formatNumber(sum[key][unit],true,false);
      }
      cell = row.appendChild(ce("th"));
      cell.style.textAlign = "right";
      cell.style.fontWeight = "normal";
      cell.innerHTML = lib.formatNumber(rowSum,true,true,2);
      cell.title = lib.formatNumber(rowSum,true,false);
    }
    row = tfoot.appendChild(ce("tr"));
    cell = row.appendChild(ce("th"));
    rowSum = 0;
    for( var i = 0; i < units.length; i++ ) {
      cell = row.appendChild(ce("th"));
      cell.style.textAlign = "right";
      cell.style.fontWeight = "normal";
      var colSum = sum.home[units[i]]+sum.away[units[i]]+sum.moving[units[i]];
      rowSum += colSum;
      cell.innerHTML = lib.formatNumber(colSum,true,true,2);
      cell.title = lib.formatNumber(colSum,true,false);
    }
    cell = row.appendChild(ce("th"));
    cell.style.textAlign = "right";
    cell.style.fontWeight = "normal";
    cell.innerHTML = lib.formatNumber(rowSum,true,true,2);
      cell.title = lib.formatNumber(rowSum,true,false);
    OV.updateDest();
  },
  doUnitsVillage : function() {
    var sum = [];
    for( var i = 0; i < serverInfo.unitAnz; i++ )
      sum[i] = 0;
    var off = OV.distCol+2;
    for( var i = 0; i < OV.tab.tBodies.length; i++ ) {
      OV.insertDistCol(OV.tab.tBodies[i].rows[0]);
      for( var col = off; col < serverInfo.unitAnz+off; col++ )
        sum[col-off] += parseInt(OV.tab.tBodies[i].rows[0].cells[col].textContent,10);
      OV.tab.tBodies[i].rows[0].cells[OV.distCol-1].setAttribute("dsfm_order", i);
      OV.insertHideCol(OV.tab.tBodies[i].rows[0],1);
    }
    OV.updateDest();
    OV.tab.tHead.rows[0].cells[OV.distCol-1].innerHTML += " (" + OV.tab.tBodies.length + ")";
    
    var sorter = new TableSorter(OV.tab,"row_a","row_b",true);
    var col = OV.distCol-1;
    sorter.addSortColumn(col++, compareOrderCell, 1);
    sorter.addSortColumn(col++, RunTimes.compareDistCell,0);
    for( col++; col < OV.tab.rows[0].cells.length - 2; col++ )
      sorter.addSortColumn(col, compareNumericCell, 0);
     
    var tFoot = OV.tab.appendChild(ce("tfoot"));
    var row = tFoot.insertRow(-1);
    var cell = row.appendChild(ce("th"));
    cell.colSpan = OV.distCol + 2;
    cell.textContent = texts[lib.lang].gui.sum;
    for( var i = 0; i < sum.length; i++ )
      row.appendChild(ce("th")).textContent = sum[i];
    cell = row.appendChild(ce("th"));
    cell.colSpan = 2;
  },
  doUnitsDetail : function() {
    var tFoot = OV.tab.appendChild(ce("tfoot"));
    tFoot.appendChild(OV.tab.rows[OV.tab.rows.length-1]);
    tFoot.rows[0].cells[tFoot.rows[0].cells.length-1].colSpan++;
    var anz = serverInfo.unitAnz;
    if( serverInfo.unitInfo.militia )
      anz--;
    var sum = [];
    for( var i = 0; i < anz; i++ )
      sum[i] = 0;

    var off = OV.distCol+1;
    var coords;
    var count = 0;
    for( var i = 0; i < OV.tab.tBodies[0].rows.length; i++ ) {
      var row = OV.tab.tBodies[0].rows[i];
      if( /units_away/.test(row.className) ) {
        row.cells[OV.distCol-1].setAttribute("dsfm_order",i);
        coords = row.cells[OV.distCol-1].innerHTML.match(/ \((\d+)\|(\d+)\) K\d+</);
        OV.insertDistCol(row,coords);
        count++;
        for( var j = i+1; j < OV.tab.tBodies[0].rows.length; j++ ) {
          if( /units_away/.test(OV.tab.tBodies[0].rows[j].className) )
            break;
        }
        OV.insertHideCol(OV.tab.tBodies[0].rows[i], j-i);
      }
      else {
        //row.cells[OV.distCol-1].colSpan = 1;
        var cell = row.insertCell(1);
        var coords2 = row.cells[OV.distCol-1].innerHTML.match(/ \((\d+)\|(\d+)\) K\d+</);
        var dist = Math.sqrt(Math.pow(coords[1] - coords2[1], 2) + Math.pow(coords[2] - coords2[2], 2));
        cell.innerHTML = Math.round(dist*100)/100;
        cell.style.textAlign = "right";
        RunTimes.createToolTip(cell,dist);
        for( var c = off; c < off+anz; c++ )
          sum[c-off] += parseInt(row.cells[c].textContent,10);
      }
    }
    OV.updateDest();
    OV.tab.tHead.rows[0].cells[OV.distCol-1].innerHTML += " (" + count + ")";
    
    var sorter = new TableSorter(OV.tab,"","",false,function(row){return /units_away/.test(row.className);});    
    var col = OV.distCol-1;
    sorter.addSortColumn(col++, compareOrderCell, 1);
    sorter.addSortColumn(col++, RunTimes.compareDistCell,0);
    for( col++; col < OV.tab.rows[0].cells.length - 2; col++ )
      sorter.addSortColumn(col, compareNumericCell, 0);
     
    var row = tFoot.insertRow(0);
    var cell = row.appendChild(ce("th"));
    cell.colSpan = OV.distCol + 2;
    cell.textContent = texts[lib.lang].gui.sum;
    for( var i = 0; i < sum.length; i++ )
      row.appendChild(ce("th")).textContent = sum[i];
    cell = row.appendChild(ce("th"));
    cell.colSpan = 2;
  },
  addRunTimeFilter: function() {
    var filterVals = lib.storage.getValue("unitFilter"+ownPid,{day:"",month:"",from:"",to:"",speed:0});
    var tab = $("dsfm_controls");
    var row = tab.insertRow(-1);
    row.id = "dsfm_timeFilter";
    var cell = row.appendChild(ce("th"));
    cell.textContent = texts[lib.lang].gui.timespan[0];
    cell = row.insertCell(-1);
    cell.colSpan = 3;
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.timespan[1]));
    
    var input = cell.appendChild(ce("input"));
    input.type = "text";
    input.size = 2;
    input.id="dsfm_filterDay";
    input.value = filterVals.day;
    
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.timespan[2]));
    input = cell.appendChild(ce("input"));
    input.type = "text";
    input.size = 2;
    input.id="dsfm_filterMonth";
    if( !isNaN(parseInt(filterVals.month)) )
      input.value = filterVals.month+1;
    
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.timespan[3]));
    input = cell.appendChild(ce("input"));
    input.type = "text";
    input.size = 2;
    input.id="dsfm_filterFrom";
    input.value = filterVals.from;

    cell.appendChild(document.createTextNode(texts[lib.lang].gui.timespan[4]));
    input = cell.appendChild(ce("input"));
    input.type = "text";
    input.size = 2;
    input.id="dsfm_filterTo";
    input.value = filterVals.to;

    cell.appendChild(document.createTextNode(texts[lib.lang].gui.timespan[5]));
    var select = cell.appendChild(ce("select"));
    select.size = 1;
    select.id = "dsfm_filterSpeed";
    
    row = OV.tab.tHead.insertRow(-1);
    row.className = "nowrap";
    row.id = "dsfm_unitFilter";
    cell = row.insertCell(-1);
    cell.colSpan = OV.distCol + 2;
    cell.textContent = texts[lib.lang].gui.unitFilter;
    var i = 0;
    for( var key in serverInfo.unitInfo ) {
      var speed = Math.round(serverInfo.unitInfo[key].speed);
      if( speed > 0 )
        select.options[i++] = new Option(texts[lib.lang].units[key] + " ("+speed+")",speed,true,false);
      cell = row.insertCell(-1);
      input = cell.appendChild(ce("input"));
      input.type = "text";
      input.size = 4;
      input.name = key;
      if( filterVals[key] )
        input.value = filterVals[key]
    }
    select.selectedIndex = filterVals.speed;
    
    cell = row.insertCell(-1);
    cell.colSpan = 2;
    input = cell.appendChild(ce("input"));
    input.type = "button";
    input.value = texts[lib.lang].gui.filterBtn;
    input.addEventListener("click", OV.filterUnits, false);

    input = cell.appendChild(ce("input"));
    input.type = "button";
    input.value = "X"
    input.id = "dsfm_clearfilter";
    input.addEventListener("click", OV.clearFilter, false);
  },
  filterUnits : function() {
    var filterVals = {day:"", month:"", from:"", to:"", speed:0};
    var date = new Date(lib.getTime()*1000);
    var day = parseInt($("dsfm_filterDay").value,10);
    var noDate = false;
    var noTime = false;
    if( isNaN(day) ) {
      day = date.getDate();
      noDate = true;
    }
    else
      filterVals.day = day;

    var month = parseInt($("dsfm_filterMonth").value,10)-1;
    if( isNaN(month) || month < 0 || month > 11 )
      month = date.getMonth();
    else
      filterVals.month = month;
    var year = date.getYear() + 1900;
    if( month < date.getMonth() )
      year++;
    var from = parseInt($("dsfm_filterFrom").value,10);
    if( isNaN(from) || from < 0 || from > 23 ) {
      from = 0;
      noTime = true;
    }
    else
      filterVals.from = from;
    var to = parseInt($("dsfm_filterTo").value,10);
    if( isNaN(to) || to < 0 || to  > 23 )
      to = 23;
    else
      filterVals.to = to;
    var select = $("dsfm_filterSpeed");
    filterVals.speed = select.selectedIndex;
    var speed = parseInt(select.value,10);
    var inputs = $("dsfm_unitFilter").getElementsByTagName("input");
    var units = [];
    for( var i = 0; i < inputs.length - 1; i++ ) {
      var val = parseInt(inputs[i].value,10);
      if( isNaN(val) ) {
        val = 0;
        filterVals[inputs[i].name] = "";
      }
      else
        filterVals[inputs[i].name] = val;
      units.push(val);
    }
    var distMin = 0;
    var distMax = 9999;
    if( !noDate || !noTime ) {
      var arrivalFrom = new Date(year, month, day, from, 0);
      var arrivalTo = new Date(year, month, day, to, 0);
      if( to < from )
        arrivalTo = new Date( arrivalTo.getTime()+86400000 );
      distMin = (arrivalFrom.getTime() - date.getTime()) / (speed*60000);
      distMax = (arrivalTo.getTime() - date.getTime()) / (speed*60000);
      if( distMin < 0 )
        distMin = 0;
    }
    lib.storage.setValue("unitFilter"+ownPid,filterVals);
    var col = OV.distCol + 2;
    var b = OV.tab.tBodies;
    var ts = date.getTime();
    for( var i = 0; i < b.length; i++ ) {
      var dist = parseFloat(b[i].rows[0].cells[OV.distCol].getAttribute("dist"));
      var show = true;
      if( dist < distMin || dist > distMax )
        show = false;
      else {
        for( var j = 0; j < serverInfo.unitAnz; j++ ) {
          var val = parseInt(b[i].rows[0].cells[j+col].textContent,10);
          if( val < units[j] ) {
            show = false;
            break;
          }
        }
      }
      if( show ) {
        b[i].style.display = "";
        b[i].rows[0].cells[OV.distCol].innerHTML = "";
        var a = b[i].rows[0].cells[OV.distCol].appendChild(ce("a"));
        var id = b[i].rows[0].cells[OV.distCol-1].innerHTML.match(/village=(\d+)/)[1];
        var dst = lib.storage.getValue("dst"+ownPid,"|").split("|");
        a.href = lib.createLink("place","mode","command", "x", dst[0], "y", dst[1], false).replace(/village=(\d+)/,"village="+id);
        a.textContent = texts[lib.lang].locale.date2timeStr(new Date(ts + speed * dist * 60000),true,true);
        b[i].rows[0].cells[b[i].rows[0].cells.length-2].firstChild.href += "&x="+dst[0]+"&y="+dst[1];
      }
      else
        b[i].style.display = "none";
    }
    OV.updateTimer = setInterval(OV.updateArrival,1000);
  },
  clearFilter : function() {
    clearInterval(OV.updateTimer);
    for( var i = 0; i < OV.tab.tBodies.length; i++ ) {
      OV.tab.tBodies[i].style.display=""; 
      var dist = OV.tab.tBodies[i].rows[0].cells[OV.distCol].getAttribute("dist");
      OV.tab.tBodies[i].rows[0].cells[OV.distCol].innerHTML = parseInt(dist*100)/100;
    }
  },
  insertHideHead : function() {
    var cell = OV.tab.tHead.rows[0].appendChild(ce("th"));
    cell.innerHTML = '<span style="font-weight:bold; color:red;">X</span> ';
    var span = cell.appendChild(ce("span"));
    span.style.cursor="pointer";
    span.addEventListener("click", function(e) { var row = OV.tab.tHead.rows[0]; var cell = row.cells[row.cells.length-1]; var res = cell.lastChild.innerHTML.match(/\((\d+)\)/); if( res && res[1] > 0 ) OV.ctxMenu.show(e.pageX,e.pageY,texts[lib.lang].gui.showRow); }, false );
    OV.ctxMenu = new ContextMenu("dsfm_hiddenRows",OV.ctxCallBack);
  },
  insertHideCol : function(row,rowspan) {
    var cell = row.insertCell(-1);
    cell.rowSpan = rowspan;
    cell.style.verticalAlign = "top";
    var a = cell.appendChild(ce("a"));
    a.href = "javascript:;";
    a.innerHTML = "X";
    a.style.fontWeigth = "bold";
    a.style.color = "red";
    a.addEventListener("click", OV.onHideRows, false );
  },
  insertDistCol : function(row,coords) {
    var cell = row.insertCell(OV.distCol);
    cell.innerHTML = "---";
    cell.style.textAlign = "right";
    cell.style.verticalAlign = "top";
    cell.rowSpan = row.cells[0].rowSpan;
    if( !coords )
      coords = row.cells[OV.distCol-1].innerHTML.match(/ \((\d+)\|(\d+)\) K\d+</);
    if( coords ) {
      row.cells[OV.distCol-1].setAttribute("coords",coords[1]+"_"+coords[2]);
      RunTimes.createToolTip(cell);
    }
    return cell;
  },
  showRows : function(cell,show) {
    var row = cell.parentNode;
    var off = row.rowIndex;
    var count = cell.rowSpan;
    if( off > 1 && OV.tab.rows[off-1].cells[0].rowSpan == cell.rowSpan + 1 ) {
      off--;
      count++;
    }
    for( var i = 0; i < count; i++ )
      OV.tab.rows[off+i].style.display = show ? "" : "none";

    row = OV.tab.tHead.rows[0];
    head = row.cells[row.cells.length-1].lastChild;
    var hidden = head.innerHTML.match(/\((\d+)\)/);
    if(hidden)
      hidden = hidden[1];
    else
      hidden = 0;
    if( show )
      hidden--;
    else
      hidden++;
    if( hidden > 0 )
      head.innerHTML = "("+hidden+")";
    else
      head.innerHTML = "";
  },
  onHideRows : function(e) {
    OV.showRows(this.parentNode,false);
    var cell = this.parentNode;
    var row = cell.parentNode;
    var col = OV.distCol-1;
    var id = row.cells[col].innerHTML.match(/village=(\d+)/);
    var text = "";
    if( id === null ) {
      id = OV.tab.rows[row.rowIndex-1].cells[col].innerHTML.match(/village=(\d+)/);
      text = OV.tab.rows[row.rowIndex-1].cells[col].textContent;
    }
    else
      text = row.cells[col].textContent;
    id = id[1];
    OV.ctxMenu.addMenuItem( { id: id, text: text, cell: cell } );
  },
  ctxCallBack : function(id,type) {
    if( type == "click" ) {
      var data = arguments[2];
      OV.ctxMenu.removeMenuItem(data.id);
      OV.showRows(data.cell,true);
    }
  },
  saveOrder : function() {
    if( OV.tab ) {
      var list = [];
      for( var i = 1; i < OV.tab.rows.length; i++ ) {
        if( OV.tab.rows[i].style.display != "none" && OV.tab.rows[i].parentNode.style.display != "none" ) {
          village = OV.tab.rows[i].cells[OV.distCol-1].innerHTML.match(/village=(\d+)/);
          if( village )
            list.push(parseInt(village[1]));
        }
      }
      lib.storage.setValue("villageorder"+ownPid,list);
      Common.modNav();
    }
  },
  updateDest : function() {
    var btn = $("clearFilter");
    if( btn )
      OV.clearFilter();
    var xInput = $("dsfm_dst_x");
    var yInput = $("dsfm_dst_y");

    if( xInput.value.indexOf("|") > -1 ) {
      var coords = xInput.value.split("|");
      xInput.value = coords[0];
      yInput.value = coords[1];
    }
    if( xInput.value.length == 3 && yInput.value.length == 0 ) {
      yInput.focus();
      yInput.select();
    }
    var x = parseInt(xInput.value);
    var y = parseInt(yInput.value);

    var valid = !isNaN(x) && x >= 0 && x <= 999 && !isNaN(y) && y >= 0 && y <= 999;
    lib.storage.setValue("dst"+ownPid, valid ? (x + "|" + y) : "|" );

    var tBodies = OV.tab.tBodies.length;
    var step = 1;
    if( tBodies > 1 )
      step = OV.tab.tBodies[0].rows.length;
    var unitsAway = lib.params.type == "away_detail";
    for( var i = 1; i < OV.tab.rows.length; i+=step ) {
      var coords = OV.tab.rows[i].cells[OV.distCol-1].getAttribute("coords");
      if( coords ) {
        coords = coords.split("_");
        cell = OV.tab.rows[i].cells[OV.distCol];
        var dist = Math.sqrt(Math.pow(coords[0] - x, 2) + Math.pow(coords[1] - y, 2));
        if( valid ) {
          cell.innerHTML = Math.round(dist*100)/100;
          cell.setAttribute('dist', dist);
          cell.style.cursor = "default";
          if( !cell.rttt )
            RunTimes.createToolTip(cell);
        }
        else {
          cell.innerHTML = '<span class="grey">---</span>';
          cell.setAttribute('dist', '');
          cell.style.cursor = "";
        }
      }
    }
  },
  updateArrival : function() {
    var speed = $("dsfm_filterSpeed").value;
    var ts = lib.getTime()*1000;
    for( var i = 0; i < OV.tab.tBodies.length; i++ ) {
      if( OV.tab.tBodies[i].style.display == "" ) {
        var dist = OV.tab.tBodies[i].rows[0].cells[OV.distCol].getAttribute("dist");
        OV.tab.tBodies[i].rows[0].cells[OV.distCol].firstChild.textContent = texts[lib.lang].locale.date2timeStr(new Date(ts + speed * dist * 60000),true,true);
      }
    }
  },
  compareProdCell : function(a,b) {
    return compare(OV.getMaxTime(a),OV.getMaxTime(b));
  },
  getMaxTime : function(cell) {
    var maxTime = 0;
    var time = 0;
    switch( Settings.settings.prod.shrinkRecruitmentMode ) {
      case 0:
      case 1:
      case 2:
        var imgs = cell.getElementsByTagName("img");
        if( imgs && imgs.length > 0 ) {
          for( var i = 0; i < imgs.length; i++ ) {
            time = imgs[i].title;
            time = time.substr(time.indexOf(" - ")+3);
            time = texts[lib.lang].locale.timeStr2Sec(time);
            if( time > maxTime )
              maxTime = time;
          }
        }
        break;
      case 3:
        maxTime = texts[lib.lang].locale.parseDuration(cell.textContent);
        break;
      case 4:
        maxTime = texts[lib.lang].locale.timeStr2Sec(cell.textContent);
        break;
    }
    return maxTime;
  },
  compareCombinedProdCell : function(a,b) {
    var prodImg = ["impossible","avail","running","finish"];
    var aImg = a.getElementsByTagName("a")[0];
    var bImg = b.getElementsByTagName("a")[0]
    var aVal = prodImg.indexOf(aImg.className);
    var bVal = prodImg.indexOf(bImg.className);
    var dif = aVal-bVal;
    if( dif == 0 && aVal == 2 ) {
      var idx = aImg.title.indexOf(" - ");
      if( idx > -1 ) {
        aTime = texts[lib.lang].locale.timeStr2Sec(aImg.title.substr(idx+3));
        bTime = texts[lib.lang].locale.timeStr2Sec(bImg.title.substr(bImg.title.indexOf(" - ")+3));
        dif = aTime - bTime;
      }
    }
    return dif;
  },
}
var InfoPlayer = {
  doIt : function() {
    if( lib.params.screen == "info_player" ) {
      var tab = $("content_value").getElementsByClassName("vis")[1];
      if( tab ) {
        tab.rows[0].cells[0].innerHTML += " (" + (tab.rows.length-1) + ")";
        var sorter = new TableSorter(tab);
        sorter.addSortColumn(0,compareStringCell,1);
        sorter.addSortColumn(1,RunTimes.compareDistCell);
        sorter.addSortColumn(2,compareNumericCell);
        RunTimes.convertCoordCol(tab,1);
      }
    }
  }
}
var Common = {
  contextMenuOwn : null,
  contextMenuOther : null,
  lastVillage: null,
  doIt : function() {
    Common.createContextMenus();
    Common.modNav();
    Common.modGroupList();
    Common.lastVillage = lib.storage.getValue("lastVillage"+ownPid,[curVillage.id,lib.params.screen,curVillage.id,lib.params.screen]);
    if( curVillage.id != Common.lastVillage[0] ) {
      Common.lastVillage[2] = Common.lastVillage[0];
      Common.lastVillage[3] = Common.lastVillage[1];
      Common.lastVillage[0] = curVillage.id;
    }
    Common.lastVillage[1] = lib.params.screen;
    HotKeys.add( "common","lastVillage",lib.createLink(Common.lastVillage[3],false).replace(/village=[jnp]?\d+/,"village="+Common.lastVillage[2]));
    lib.storage.setValue("lastVillage"+ownPid,Common.lastVillage);
  },
  modGroupList : function() {
    if( Settings.settings.misc.modGroupPopup ) {
    }
  },
  modNav : function() {
    var row = $("menu_row2");
    var a = $("menu_map_link");
    if( curVillage.map.timestamp > 0 ) {
      if( lib.params.screen != "map" && Settings.settings.map.rememberPos )
        a.href += "&x=" + curVillage.map.x + "&y=" + curVillage.map.y;
    }
    if( Settings.settings.misc.useHotKeys ) {
      HotKeys.add( "common", "map", a.href );
      HotKeys.add( "common", "place", lib.createLink( "place", true ) );
      HotKeys.add( "common", "market", lib.createLink( "market", true ) );
    }
    var list = lib.storage.getValue("villageorder"+ownPid);
    if( list ) {
      while( /arrowCell/.test(row.cells[1].className) )
        row.deleteCell(1);
      var jump = false;
      var next = 0;
      var prev = list.length-1;
      for( var i = 0 ; i < list.length; i++ ) {
        if( list[i] == curVillage.id ) {
          prev = i == 0 ? list.length-1 : i - 1;
          next = i == list.length-1 ? 0 : i + 1;
          break;
        }
      }
      jump = i == list.length;

      i = 1;
      var cell = row.insertCell(i++);
      cell.className = "icon-box arrowCell";
      var a = cell.appendChild(ce("a"));
      a.href = "javascript:;";
      a.innerHTML = " X ";
      a.style.fontWeight = "bold";
      a.style.color = "red";
      a.alt = texts[lib.lang].gui.resetVillageOrder;
      a.title = texts[lib.lang].gui.resetVillageOrder;
      a.addEventListener("click", function() { lib.storage.deleteValue("villageorder"+ownPid); document.location.reload(); }, false );
      
      if( jump ) {
        cell = row.insertCell(i++);
        cell.className = "icon-box arrowCell";
        a = cell.appendChild(ce("a"));
        a.href = location.href.replace(/village=[pnj]?\d+/,"village="+list[0]);
        a.title = texts[lib.lang].gui.gotoFirstGroupVillage;
        a.className = "jump_link";
        div = a.appendChild(ce("span"));
        div.className = "groupJump";
      }
      cell = row.insertCell(i++);
      cell.className = "icon-box arrowCell";
      a = cell.appendChild(ce("a"));
      a.accessKey = "a";
      a.href = location.href.replace(/village=[pnj]?\d+/,"village="+list[prev]);
      a.className = "village_switch_link";
      div = a.appendChild(ce("span"));
      div.className = "arrowLeft";
      
      cell = row.insertCell(i++);
      cell.className = "icon-box arrowCell";
      a = cell.appendChild(ce("a"));
      a.accessKey = "d";
      a.href = location.href.replace(/village=[pnj]?\d+/,"village="+list[next]);
      a.className = "village_switch_link";
      div = a.appendChild(ce("span"));
      div.className = "arrowRight";
    }
    if( Settings.settings.misc.useHotKeys ) {
      var a = row.getElementsByTagName("a");
      for( var j = 0; j < a.length; j++ ) {
        if( a[j].accessKey == "a" )
          HotKeys.add( "common", "prevVillage", a[j].href );
        else if( a[j].accessKey == "d" )
          HotKeys.add( "common", "nextVillage", a[j].href );
      }
    }
  },
  contextCallBack : function(id,type) {
    switch( type ) {
      case "modHref":
        var href = "";
        var itemid = arguments[2].id;
        var data = arguments[3];
        switch( itemid ) {
          case "info_village":
            return lib.createLink(itemid,"id",data.id,false);
          case "overview":
          case "main":
          case "train":
          case "place":
          case "market":
          case "snob":
            return lib.createLink(itemid,false).replace("village="+curVillage.id,"village="+data.id);
          case "redir_sendunits":
            return lib.createLink("place","mode","command","target",data.id,false);
          case "redir_getunits":
            return lib.createLink("place","mode","command","target",curVillage.id, false).replace("village="+curVillage.id,"village="+data.id);
          case "sendres":
            return lib.createLink("market","mode","send","target",data.id, false);
          case "getress":
            return lib.createLink("market","mode","send","target",curVillage.id, false).replace("village="+curVillage.id,"village="+data.id);
          case "center":
            return lib.createLink("map","x",data.x,"y",data.y, false);
          case "selectvillage":
            return location.href.replace(/village=\d+/,"village="+data.id);
        }
        return "";
      case "click":
        break;
      case "show":
        var event = arguments[2];
        var el = event.target;
        while( el && el.nodeName.toUpperCase() != "A" )
          el = el.parentNode;
        if( el ) {
          if(id == "dsfm_ctxOwn") {
            var p = lib.parseParams(el.href);
            var jsSelector = el.href.match(/selectVillage\((\d+)/);
            if( jsSelector || p.screen == "overview" || p.screen == "info_village" ) {
              if( jsSelector ) {
                $("group_popup_menu").style.zIndex = 1000;
                $("group_popup").style.zIndex = 1000;
              }
              var vid = jsSelector ? jsSelector[1] : p.get("id",0)>0 ? p.id : p.village;
              var coords = el.textContent.match(/\((\d{1,3})\|(\d{1,3})\) K\d+/);
              if( !coords && el.parentNode && el.parentNode.nodeName.toUpperCase() == "TD" ) {
                var cel = getByTagName(el.parentNode,"td","nextSibling");
                if( cel ) 
                  coords = cel.textContent.match(/(\d{1,3})\|(\d{1,3})/);
              }
              if( coords )
                return { title: coords[1]+"|"+coords[2], data: { id: vid, x: coords[1], y: coords[2] } };
            }
          }
        }
        break;
    }
  },
  createContextMenus : function() {
    Common.contextMenuOwn = new ContextMenu("dsfm_ctxOwn",Common.contextCallBack);
    Common.contextMenuOwn.addMenuItem({ text: texts[lib.lang].gui.overview, id: "overview" });
    Common.contextMenuOwn.addMenuItem({ text: texts[lib.lang].gui.redir_villageinfo, id: "info_village" });
    Common.contextMenuOwn.addMenuItem({ icon: "graphic/map_center.png", text: texts[lib.lang].gui.redir_centermap, id: "center" });
    Common.contextMenuOwn.addMenuItem({ icon: "graphic/command/attack.png", text: texts[lib.lang].gui.redir_sendunits, id: "redir_sendunits" });
    Common.contextMenuOwn.addMenuItem({ icon: "graphic/command/return.png", text: texts[lib.lang].gui.redir_getunits, id: "redir_getunits" });
    Common.contextMenuOwn.addMenuItem({ icon: "graphic/buildings/market.png", text: texts[lib.lang].gui.redir_market, id: "sendres" });
    Common.contextMenuOwn.addMenuItem({ icon: "graphic/buildings/market.png", text: texts[lib.lang].gui.redir_getress, id: "getress" });
    Common.contextMenuOwn.addMenuItem({ text: texts[lib.lang].gui.redir_selectvillage, id: "selectvillage" });
    Common.contextMenuOwn.addMenuItem({ text: texts[lib.lang].gui.buildings });
    Common.contextMenuOwn.addMenuItem({ icon: "graphic/buildings/main.png", text: serverInfo.addBuildingInfo.main.name, id: "main" });
    Common.contextMenuOwn.addMenuItem({ icon: "graphic/buildings/barracks.png", text: texts[lib.lang].gui.recruitment, id: "train" });
    Common.contextMenuOwn.addMenuItem({ icon: "graphic/buildings/place.png", text: serverInfo.addBuildingInfo.place.name, id: "place" });
    Common.contextMenuOwn.addMenuItem({ icon: "graphic/buildings/market.png", text: serverInfo.addBuildingInfo.market.name, id: "market" });
    Common.contextMenuOwn.addMenuItem({ icon: "graphic/buildings/snob.png", text: serverInfo.addBuildingInfo.snob.name, id: "snob" });
    Common.contextMenuOther = new ContextMenu("dsfm_ctxOther",Common.contextCallBack);
    Common.contextMenuOther.addMenuItem({ text: texts[lib.lang].gui.redir_villageinfo, id: "info_village" });
    Common.contextMenuOther.addMenuItem({ icon: "graphic/map_center.png", text: texts[lib.lang].gui.redir_centermap, id: "center" });
    Common.contextMenuOther.addMenuItem({ icon: "graphic/command/attack.png", text: texts[lib.lang].gui.redir_sendunits, id: "redir_sendunits" });
    Common.contextMenuOther.addMenuItem({ icon: "graphic/buildings/market.png", text: texts[lib.lang].gui.redir_market, id: "sendres" });
  },
}
var Groups = {
  actionValue : null,
  ctxMenu : null,
  ctxSelectData : [],
  doIt : function() {
    if( lib.params.screen == "overview" ) 
      Groups.modGroupTable("edit");
    if( lib.params.screen == "main" || lib.params.screen == "snob" || lib.params.screen == "barracks" || lib.params.screen == "stable" || lib.params.screen == "garage" || lib.params.screen == "train" || lib.params.screen == "market" || lib.params.screen == "smith" || lib.params.screen == "place" || lib.params.screen == "overview")
      Groups.showGroupIcons();
    $("open_groups").addEventListener("click",Groups.modVillagePopup,false);
    Groups.addGroupSelect();
    if( lib.params.screen == "overview_villages" ) {
      Groups.modGroupsTitle();
      if( lib.params.get("edit_group",0) !== 0 )
        getByTagName($("edit_group_membership_form"),"p","lastChild").getElementsByTagName("input")[0].addEventListener("click",Groups.submitEditGroup,false);
    }
    if( lib.params.screen == "train" && lib.params.mode == "mass" )
      Groups.modGroupsTitle();
  },
  addGroupSelect : function() {
    var row = $("menu_row2");
    var cell = row.insertCell(-1);
    var a = cell.appendChild(ce("a"));
    var group = Groups.getGroupById(lib.game_data.village.group);
    Groups.insertGroupImg(group,a);
    a.title = group.name;
    a.href = "javascript:;";
    a.addEventListener("click",function(e) { Groups.ctxMenu.show(e.pageX,e.pageY,texts[lib.lang].gui.selectGroup,"title"); },false );
    Groups.createCtxMenu();
  },
  showGroupIcons : function() {
    var title = $("content_value").getElementsByTagName("h2")[0];
    if( title ) {
      title.parentNode.style.verticalAlign = "top";
      var tab = title.parentNode.insertBefore(ce("table"),title);
      tab.style.width = "100%";
      var row = tab.insertRow(0);
      var cell = row.insertCell(0);
      cell.appendChild(title); //innerHTML = "<h2>" + title.innerHTML + "</h2>";
      cell = row.insertCell(1);
      cell.style.textAlign = "right";
      cell.style.verticalAlign = "top";
      for( var i = 0; i < Settings.userGroups.length; i++ ) {
        for( var g = 0; g < curVillage.groups.list.length; g++ ) {
          if( Settings.userGroups[i].name == curVillage.groups.list[g] ) {
            Groups.insertGroupImg(Settings.userGroups[i],cell);
            break;
          }
        }
      }
    }
  },
  showGroupForm : function() {
    var title = $("content_value").getElementsByTagName("h2")[0];
    if( title ) {
      title.parentNode.style.verticalAlign = "top";
      var village = new MyVillage(lib.game_data.village.id);
      if( lib.params.screen == "overview" ) {
        var p = $("group_assigment").getElementsByClassName("p_groups");
        village.groups.timestamp = lib.getTime();
        village.groups.list = [];
        for( var i = 0; i < p.length; i++ )
          village.groups.list.push(p[i].innerHTML);
        var coords = lib.game_data.village.coord.split("|");
        village.coords.x = coords[0];
        village.coords.y = coords[1];
        village.save();
      }
      var tab = title.parentNode.insertBefore(ce("table"),title);
      var form = ce("form");
      form.id = "dsfm_reassign_village_to_groups_form_group_assigment";
      form.action = "/game.php?village="+curVillage.id+"&screen=groups&ajax=village";
      form.method = "post";
      var input = form.appendChild(ce("input"));
      input.type = "hidden";
      input.name="village_id";
      input.value = curVillage.id;
      input = form.appendChild(ce("input"));
      input.type = "hidden";
      input.name="mode";
      input.value = "village";
      
      tab.style.width = "100%";
      var row = tab.insertRow(0);
      var cell = row.insertCell(0);
      cell.appendChild(title); //innerHTML = "<h2>" + title.innerHTML + "</h2>";
      cell = row.insertCell(1);
      cell.style.textAlign = "right";
      cell.style.verticalAlign = "top";
      for( var i = 0; i < Settings.userGroups.length; i++ ) {
        var a = cell.appendChild(ce("a"));
        a.href = "javascript:;";
        a.addEventListener("click",Groups.toggleGroup,false);
        a.id="dsfm_group"+Settings.userGroups[i].id;
        var img = a.appendChild(ce("img"));
        var chk = form.appendChild(ce("input"));
        chk.className="check";
        chk.type="checkbox";
        chk.value=Settings.userGroups[i].id;
        chk.name="groups[]";
        chk.style.display="none";
        chk.id="dsfm_groupCheck"+Settings.userGroups[i].id;
        img.style.backgroundColor = Settings.userGroups[i].color;
        img.src = Settings.userGroups[i].icon;
        img.title = Settings.userGroups[i].name;
        img.style.border = "1px solid black";
        img.style.width = "16px";
        img.style.height = "16px";
        if( village.groups.list.indexOf(Settings.userGroups[i].name) == -1 )
          img.style.opacity = 0.2;
        else
          chk.checked = true;
      }
      var btn = form.appendChild(ce("input"));
      btn.type="submit";
      btn.value=texts[lib.lang].gui.setGroups;
      btn.style.display = "none";
      btn.id = "dsfm_setGroups";
      
      cell.appendChild(form);
    }
  },
  toggleGroup : function(e) {
    var id = parseInt(this.id.substr(10),10);
    var chk = $("dsfm_groupCheck"+id);
    chk.checked = !chk.checked;
    this.firstChild.style.opacity = chk.checked ? 1 : 0.3;
    $("dsfm_setGroups").style.display="";
  },
  modGroupTable : function(mode) {
    var tab;
    var form;
    if( mode == "groups" ) {
      form = document.getElementsByTagName("form")[0];
      tab = form.getElementsByTagName("table")[0];
    }
    else {
      tab = $("group_table");
      form = document.getElementById("reassign_village_to_groups_form_group_assigment");
    }
    var editLnk;
    var loaded = false;
    switch(mode) {
      case "set":
        if( form )
          loaded = true;
        break;
      case "edit":
        try {
          editLnk = getByTagName(tab,"table","nextSibling").getElementsByTagName("a")[0];
          loaded = true;
        }
        catch(e) {
        }
        break;
      default:
        loaded = true;
    }
    if( loaded ) {
      var rows = [];
      var saveGroups = false;
      curVillage.groups.timestamp = lib.getTime();
      curVillage.groups.list = [];
      
      for( var i = 1; i < tab.rows.length; i++ ) {
        var p = tab.rows[i].cells[0].getElementsByClassName("p_groups")[0];
        var inputs = tab.rows[i].cells[0].getElementsByTagName("input");
        var name;
        if( p )
          name = p.textContent;
        else {
          p = inputs[0].nextSibling;
          name = tab.rows[i].cells[0].textContent;
        }
        if( !inputs[0] || inputs[0].checked )
          curVillage.groups.list.push(name);
        var group = Groups.getGroupByName(name);
        if( group.id == 0 ) {
          var inputs = tab.rows[i].cells[0].getElementsByTagName("input");
          var id = 0;
          if( inputs && inputs.length > 0 ) {
            saveGroups = true;
            group.id = parseInt(inputs[0].value);
          }
        }
        rows.push({row: tab.rows[i], group: group});
        var img = p.parentNode.insertBefore(ce("img"),p);
        img.src = group.icon ? group.icon : "graphic/map/empty.png";
        img.style.width = "16px";
        img.style.height = "16px";
        img.style.backgroundColor = group.color;
        img.style.border = "1px solid black";
        img.style.marginRight = "5px";
      }
      curVillage.save();
      rows.sort(function(a,b){return a.group.sort-b.group.sort;});
      for( var i = 0; i < rows.length; i++ ) 
        tab.tBodies[0].appendChild(rows[i].row);
      if( form ) {
        if( rows.length < Settings.userGroups.length ) {
          Groups.removeMissingGroups(rows);
          saveGroups = true;
        }
        if( mode == "edit" )
          form.addEventListener("submit", function() { Groups.modGroupTable("edit") }, false);
        form.addEventListener("submit", function() { 
            curVillage.groups.timestamp = lib.getTime(); 
            curVillage.groups.list = []; 
            var inputs = form.getElementsByTagName("input");
            for( var i = 0; i < inputs.length; i++ ) {
              if( inputs[i].checked ) {
                var group = Groups.getGroupById(inputs[i].value);
                curVillage.groups.list.push(group.name);
              }
            }
            curVillage.save();
            Groups.modGroupTable("edit");
          }, false );
      }
      else
        editLnk.addEventListener("click", function() { Groups.modGroupTable("set"); }, false);
      if( saveGroups ) {
        Groups.updateGroupSort();
        lib.storage.setValue("userGroups"+ownPid,Settings.userGroups);
      }
    }
    else
      setTimeout(function() { Groups.modGroupTable(mode); }, 100);
  },
  modGroupSelect : function(select) {
    var idx = parseInt(select.getAttribute("dsfm_idx"),10);
    if( isNaN(idx) ) {
      select.setAttribute("dsfm_idx",Groups.ctxSelectData.length);
      var group = Groups.getGroupById(select.value);
      select.style.display = "none";
      var parent = select.parentNode;
      //var div = parent.insertBefore(ce("div"),select);
      var tab = parent.insertBefore(ce("table"),select);
      tab.style.padding = "0";
      tab.style.margin = "0";
      tab.setAttribute("cellspacing",0);
      tab.setAttribute("cellpadding",0);
      tab.style.border = "1px solid #804000";
      var row = tab.insertRow(-1);
      var img = Groups.insertGroupImg(group,row.insertCell(-1));
      var a = row.insertCell(-1).appendChild(ce("a"));
      a.href = "javascript:;";
      a.addEventListener("click", function(e) { Groups.ctxMenu.show(e.pageX,e.pageY,texts[lib.lang].gui.selectGroup,e); }, false );
      a.innerHTML = group.name + " " + String.fromCharCode(160,9660);
      a.setAttribute("dsfm_idx",Groups.ctxSelectData.length);
//      parent.insertBefore(ce("div"),select).style.clear = "both";
      Groups.ctxSelectData.push({ select: select, img: img, a: a });
    }
  },
  getGroupsFromSelect : function(select) {
    var saveGroups = false;
    for( var i = 0; i < select.options.length; i++ ) {
      var group = Groups.getGroupByName(select.options[i].text);
      if( group.id == 0 ) {
        group.id = parseInt(select.options[i].value,10);;
        saveGroups = true;
      }
    }
    if(saveGroups)
      lib.storage.setValue("userGroups"+ownPid,Settings.userGroups);
  },
  modGroupsTitle : function() {
    var editLnk = $("edit_group_href");
    if( editLnk )
      editLnk.addEventListener("click",Groups.modGroupEdit,false);
    var isEdit = lib.params.get("edit_group",0) !== 0;
    var tab = getByTagName($("paged_view_content"),"table","firstChild");
    var cell = tab.rows[0].cells[0];
    var e = cell.firstChild;
    var groups = [];
    var count = 0;
    var saveGroups = false;
    while( e ) {
      var id = 0;
      var name = "";
      var curId = parseInt(lib.game_data.village.group,10);
      var nodeName = e.nodeName.toUpperCase();
      if( nodeName == "A" ) {
        id = parseInt(lib.parseParams(e.href).group,10);
        name = e.innerHTML;
        if( !isEdit )
          name = name.substr(2,e.innerHTML.length-4);
        count++;
      }
      else if(nodeName == "STRONG") {
        if( e.innerHTML.indexOf("&gt;") > -1 ) {
          id = curId;
          name = e.innerHTML.substr(5,e.innerHTML.length-10);
        }
      }
      else {
        e = e.nextSibling;
        continue;
      }
      if( id > 0 ) {
        var group = Groups.getGroupById(id);
        if( group.name != name ) {
          group.name = name;
          saveGroups = true;
        }
        e.innerHTML = "";
        if( id != curId )
          e.appendChild(document.createTextNode(" ["));
        else if( !isEdit ) 
          e.appendChild(document.createTextNode(" >"));
        if( group.icon )
          Groups.insertGroupImg(group,e);
        e.appendChild(document.createTextNode(" "+group.name));
        if( id != curId )
          e.appendChild(document.createTextNode("] "));
        else if( !isEdit ) {
          e.appendChild(document.createTextNode("< "));
        }
      }
      else
        group = {sort:999};
      groups.push( { e: e, group: group } );
      e = e.nextSibling;
    }
    if( !isEdit ) {
      if( groups.length-1 < Settings.userGroups.length ) {
        Groups.removeMissingGroups(groups);
        saveGroups = true;
      }
      groups.sort(function(a,b){return a.group.sort-b.group.sort;});
      for( var i = 0; i < groups.length; i++ )
        cell.appendChild(groups[i].e);
    }
    if( saveGroups ) {
      Groups.updateGroupSort();
      lib.storage.setValue("userGroups"+ownPid,Settings.userGroups);
    }
  },
  modGroupEdit : function() {
    var div = $("group_config");
    if( div.style.display == "none" ) {
      setTimeout(Groups.modGroupEdit,100);
    }
    else {
      $("edit_group_href").removeEventListener("click",Groups.modGroupEdit,false);
      var form = $("add_group_form").addEventListener("submit",Groups.onNewGroup,false);
      var tab = $("group_table");
      tab.rows[0].cells[0].colSpan=7;
      var rows = [];
      for( var i = 1; i < tab.rows.length - 1; i++ ) {
        var id = parseInt(tab.rows[i].id.substr(8),10);
        var group = Groups.getGroupById(id);
        if( group.name == "" ) {
          group.name = a[0].innerHTML;
          lib.storage.setValue("userGroups"+ownPid,Settings.userGroups);
        }
        tab.rows[i].getElementsByTagName("a")[2].addEventListener("click", Groups.onDeleteGroup,false);
        tab.rows[i].cells[1].getElementsByTagName("form")[0].addEventListener("submit",Groups.onRenameGroup,false);
        var cell = tab.rows[i].insertCell(0);
        var input = cell.appendChild(ce("input"));
        input.type="checkbox";
        input.checked = group.show;
        input.value = group.id;
        tab.rows[i].insertCell(1);
        Groups.insertGroupImg(group,tab.rows[i].insertCell(2));
        cell = tab.rows[i].insertCell(6);
        input = cell.appendChild(ce("input"));
        input.type="text";
        input.size = 8;
        input.value = group.color;
        input.setAttribute("onchange","this.parentNode.parentNode.cells[2].firstChild.style.backgroundColor=this.value");
        input.color = new ColorPicker(input);
        input.color.required = false;
        cell = tab.rows[i].insertCell(7);
        input = cell.appendChild(ce("input"));
        input.type = "text";
        input.setAttribute("onchange","this.parentNode.parentNode.cells[2].firstChild.src=this.value");
        input.value = group.icon;
        input.icon = new IconPicker(input);
        rows.push( { row: tab.rows[i], group: group } );
      }
      tab.rows[i].insertCell(0).colSpan=3;
      cell = tab.insertRow(-1).insertCell(0);
      cell.colSpan = 7;
      input = cell.appendChild(ce("input"));
      input.type = "button";
      input.value = texts[lib.lang].gui.savebutton;
      input.addEventListener("click",Groups.saveUserGroups,false);
      rows.sort(function(a,b){return a.group.sort-b.group.sort;});
      var lastRow = tab.rows[i];
      for( var i = 0; i < rows.length; i++ )
        tab.tBodies[0].insertBefore(rows[i].row,lastRow);
      createPrioLinks(tab,1,2,1,true);
    }
  },
  insertGroupImg : function(group,parent,force,beforeNode) {
    if( typeof( group ) == "Number" )
      group = Settings.userGroups[group];
    var img = ce("img");
    img.src = group.icon == "" ? "graphic/map/empty.png" : group.icon;
    img.style.backgroundColor = group.color;
    img.style.width = "16px";
    img.style.height = "16px";
    img.style.border = "1px solid black";
    img.title = group.name;
    if( beforeNode )
      parent.insertBefore(img,beforeNode);
    else
      parent.appendChild(img);
    return img;
  },
  addGroupEdit : function(parent) {
    //td.removeChild(newLnk);
    tab = parent.appendChild(ce("table"));
    for( var i = 0; i < Settings.userGroups.length; i++ ) {
      var row = tab.insertRow(tab.rows.length);
      var cell = row.insertCell(row.cells.length);
      var input = cell.appendChild(ce("input"));
      input.type="checkbox";
      input.checked = Settings.userGroups[i].show;
      input.value = Settings.userGroups[i].id;
      cell = row.insertCell(row.cells.length);
      if( i > 0 ) {
        var a = cell.appendChild(ce("a"));
        a.href = "javascript:;";
        a.addEventListener("click", function(e) { moveTabRow(e,-1,1); }, false);
        var img = a.appendChild(ce("img"));
        img.src = "graphic/map/map_n.png";
      }
      if( i < Settings.userGroups.length-1 ) {
        var a = cell.appendChild(ce("a"));
        a.href = "javascript:;";
        a.addEventListener("click", function(e) { moveTabRow(e,1,1); }, false);
        var img = a.appendChild(ce("img"));
        img.src = "graphic/map/map_s.png";
      }
      cell = row.insertCell(row.cells.length);
      var img = cell.appendChild(ce("img"));
      if( Settings.userGroups[i].icon )
        img.src = Settings.userGroups[i].icon;
      else
        img.src = "graphic/map/empty.png";
      img.style.backgroundColor = Settings.userGroups[i].color;
      img.style.width = "16px";
      img.style.height = "16px";
      img.style.border = "1px solid black";
      cell = row.insertCell(row.cells.length);
      cell.innerHTML = Settings.userGroups[i].name;
      cell = row.insertCell(row.cells.length);
      input = cell.appendChild(ce("input"));
      input.type = "text";
      input.className = "dsfm_color {required:false}";
      input.value = new Color(img.style.backgroundColor).toString();
      input.size = 8;
      input.setAttribute("onchange","this.parentNode.parentNode.cells[2].firstChild.style.backgroundColor=this.value");
      cell = row.insertCell(row.cells.length);
      input = cell.appendChild(ce("input"));
      input.type = "text";
      input.setAttribute("onchange","this.parentNode.parentNode.cells[2].firstChild.src=this.value");
      input.value = Settings.userGroups[i].icon;
      input.icon = new IconPicker(input);
    }
    row = tab.insertRow(tab.rows.length);
    cell = row.insertCell(0);
    cell.colSpan = 6;
    input = cell.appendChild(ce("input"));
    input.type = "button";
    input.value = texts[lib.lang].gui.savebutton;
    input.setAttribute("onclick","toggle_village_colors();");
    input.addEventListener("click",Groups.saveUserGroups,false);
  },
  saveUserGroups : function() {
    var tab = this.parentNode.parentNode.parentNode;
    Settings.userGroups = [];
    var start = 0;
    var end = tab.rows.length - 1;
    var sort = 0;
    var idx = { color: 4, icon: 5 };
    if( tab.rows[0].cells[0].colSpan > 1 ) {
      start++;
      end--;
      idx.color+=2;
      idx.icon+=2;
    }
    for( var i = start; i < end; i++ ) {
      if( tab.rows[i].style.display != "none" ) {
        var group = {};
        var check = tab.rows[i].cells[0].firstChild;
        group.id = check.value;
        if( start == 0 )
          group.name = tab.rows[i].cells[3].innerHTML;
        else
          group.name = tab.rows[i].cells[3].getElementsByTagName("a")[0].innerHTML;
        group.color = tab.rows[i].cells[idx.color].firstChild.value;
        group.icon = tab.rows[i].cells[idx.icon].firstChild.value;
        group.show = check.checked;
        group.sort = sort++;
        Settings.userGroups.push( group );
      }
    }
    lib.storage.setValue("userGroups"+ownPid,Settings.userGroups);
    var sel = $("dsfm_ownOvl");
    if( sel && sel.value == "Groups" )
      Map.createOverlays();
  },
  getGroupById : function(id) {
    var group;
    if( id == 0 )
      return { id: 0, name: texts[lib.lang].gui.allGroups, icon: "", color:"", sort: 999 };
    else {
      var maxSort = 0;
      for( var i = 0; i < Settings.userGroups.length; i++ ) {
        if( Settings.userGroups[i].id == id )
          return Settings.userGroups[i];
        if( Settings.userGroups[i].sort > maxSort )
          maxSort = Settings.userGroups[i].sort;
      }
      group = { id: id, name: null, icon: "", color: "", sort: maxSort+1 };
      Settings.userGroups.push( group );
    }
    return group;
  },
  getGroupByName : function(name) {
    var maxSort = 0;
    for( var i = 0; i < Settings.userGroups.length; i++ ) {
      if( Settings.userGroups[i].name == name )
        return Settings.userGroups[i];
      if( Settings.userGroups[i].sort > maxSort )
        maxSort = Settings.userGroups[i].sort;
    }
    var group = { id: 0, name: name, icon: "", color: "", sort: maxSort+1 };
    Settings.userGroups.push( group );
    return group;
  },
  removeMissingGroups : function(list) {
    for( var i = 0; i < Settings.userGroups.length; i++ ) {
      for( var j = 0; j < list.length; j++ ) {
        if( list[j].group.id == Settings.userGroups[i].id )
          break;
      }
      if( j == list.length )
        Settings.userGroups.splice(i,1);
    }
  },
  getGroupId : function(e) {
    var row = getByTagName(e.target, "tr", "parentNode");
    return parseInt(row.id.substr(8),10);
  },
  updateGroupSort : function() {
    for( var i = 0; i < Settings.userGroups.length; i++ )
      Settings.userGroups[i].sort = i;
  },
  onDeleteGroup : function(e) {
    var id = Groups.getGroupId(e);
    for( var i = 0; i < Settings.userGroups.length; i++ ) {
      if( Settings.userGroups[i].id == id ) {
        Settings.userGroups.splice(i,1);
        break;
      }
    }
    Groups.updateGroupSort();
    lib.storage.setValue("userGroups"+ownPid,Settings.userGroups);
  },
  onRenameGroup : function(e) {
    Groups.actionValue = Groups.getGroupId(e);
    Groups.waitForRename();
  },
  waitForRename : function() {
    var cell = $("show_group"+Groups.actionValue);
    if( cell.style.display == "none" && Groups.actionValue > 0 )
      setTimeout(Groups.waitForRename,100);
    else {
      var group = Groups.getGroupById(Groups.actionValue);
      var a = getByTagName(cell,"a","firstChild");
      group.name = a.innerHTML;
      cell.parentNode.cells[1].style.display="";
      cell.parentNode.cells[4].style.display="none";
      lib.storage.setValue("userGroups"+ownPid,Settings.userGroups);
      Groups.actionValue = null;
    }
  },
  onNewGroup : function(e) {
    Groups.actionValue = this.getElementsByTagName("input")[2].value;
    Groups.waitForNewGroup();
  },
  waitForNewGroup : function() {
    var tab = $("group_table");
    if( tab.rows[0].cells[0].colSpan == 1 )
      Groups.modGroupEdit();
    else
      setTimeout(Groups.waitForNewGroup,100);
  },
  modMapPopup : function() {
    var td = $("info_village_groups");
    td.style.verticalAlign = "middle";
    var groups = td.innerHTML.split(", ");
    
    for(var i = 0; i < groups.length; i++ )
      groups[i] = Groups.getGroupByName(groups[i]);
    groups.sort(function(a,b){return a.sort-b.sort});
    td.innerHTML = "";
    for( var i = 0; i < groups.length; i++ ) {
      if( i > 0 )
        td.appendChild(document.createTextNode(", "));
      Groups.insertGroupImg(groups[i],td);
      td.appendChild(document.createTextNode(" "+groups[i].name));
    }
  },
  modVillagePopup : function() {
    var select = $("group_id");
    if( select ) {
      $("group_popup").style.zIndex = 100;
      Groups.modGroupSelect(select);
    }
    else
      setTimeout(Groups.modVillagePopup,100);
  },
  submitEditGroup : function() {
    var ts = lib.getTime();
    var inputs = document.getElementsByName("group[]");
    var group = Groups.getGroupById(lib.params.edit_group);
    for( var i = 0; i < inputs.length; i++ ) {
      var village = new MyVillage(inputs[i].value);
      var idx = village.groups.list.indexOf(group.name);
      if( inputs[i].checked ) {
        if( idx == -1 ) {
          village.groups.list.push(group.name);
          village.groups.timestamp = ts;
          village.save();
        }
      }
      else {
        if( idx != -1 ) {
          village.groups.list.splice(idx,1);
          village.groups.timestamp = ts;
          village.save();
        }
      }
    }
  },
  createCtxMenu : function() {
    Groups.ctxMenu = new ContextMenu("dsfm_groupsCtx",Groups.ctxCallback);
    for( var i = 0; i < Settings.userGroups.length; i++ ) 
      Groups.ctxMenu.addMenuItem( { icon: Settings.userGroups[i].icon == "" ? "graphic/map/emtpy.png" : Settings.userGroups[i].icon, text: Settings.userGroups[i].name, id: Settings.userGroups[i].id } ).cells[0].firstChild.style.backgroundColor = Settings.userGroups[i].color;
    Groups.ctxMenu.addMenuItem( { icon: "graphic/map/emtpy.png", text: texts[lib.lang].gui.allGroups, id: 0 } ).cells[0].firstChild.style.backgroundColor = "";
  },
  ctxCallback : function(id,type,data,target) {
    if( type == "modHref" && target == "title" ) {
      var href = location.href + "&group=" + data.id;
      return href.replace( /village=(\d+)/, "village=j$1" );
    }
    else if( type == "click" && target != "title" ) {
      var idx = parseInt(target.target.getAttribute("dsfm_idx"),10);
      var group = Groups.getGroupById(data.id);
      Groups.ctxSelectData[idx].img.src = group.icon == "" ? "graphic/map/empty.png" : group.icon;
      Groups.ctxSelectData[idx].img.style.backgroundColor = group.color;
      Groups.ctxSelectData[idx].a.innerHTML = group.name + " " + String.fromCharCode(160,9660);
      Groups.ctxSelectData[idx].select.value = data.id;
      lib.fireEvent(Groups.ctxSelectData[idx].select,"change");
    }
  },
}
var RunTimes = {
  // TODO: Trader
  curVillage : { id: 0, x: 0, y: 0 },
  speed : 0, 
  unitCols : { spear: 0, sword: 0, axe: 0, archer: 0, spy: 1, light: 1, marcher: 1, heavy: 1, ram: 2, catapult: 2, knight: 3, snob: 3, trader: 2 },
  ToolTip : function(target) {
    var THIS = this;
    this.timeOut = 0;
    this.show = function(e) {
      var dist;
      if( !isNaN(THIS.dist) )
        dist = THIS.dist;
      else {
        dist = parseFloat(target.getAttribute("dist"));
        if( isNaN(dist) ) {
          var coords = target.getAttribute("coords");
          if( coords ) {
            coords = coords.split("_");
            dist = Math.sqrt(Math.pow(RunTimes.curVillage.x - coords[0], 2) + Math.pow(RunTimes.curVillage.y - coords[1], 2));
          }
        }
      }
      if( !isNaN(dist) ) {
        THIS.div.style.display='block';
        THIS.move(e);
        var startTime=new Date(lib.getTime() * 1000);
        var key;
        var idx = 0;
        for(key in serverInfo.unitInfo) {
          idx++;
          var cell = THIS.div.firstChild.rows[1].cells[idx];
          if( cell ) {
            var time = serverInfo.unitInfo[key].speed*dist*RunTimes.speed;
            cell.innerHTML = RunTimes.formatTime(time);
            cell.style.color = (key=='snob'&&dist>serverInfo.config.snob_max_dist)?'#999999':'#000000';
            if( THIS.div.firstChild.rows.length > 2 ) {
              cell=THIS.div.firstChild.rows[2].cells[idx];
              var arrivalTime = new Date(startTime.getTime() + time*60000);
              cell.innerHTML=RunTimes.formatDate(arrivalTime,true);
              var h=arrivalTime.getHours();
              cell.style.color=(key=='snob'&&dist>serverInfo.config.snob_max_dist)?'#999999':(h>=0&&h<8)?'#FF0000':'#000000';
            }
          }
        }
        if( THIS.div.firstChild.rows.length > 3 )
          THIS.div.firstChild.rows[3].cells[1].innerHTML=RunTimes.formatDate(startTime,false);
      }
    }
    this.hide = function(e) {
      THIS.div.style.display = "none";
    }
    this.move = function(event) {
      var size= { x: THIS.div.offsetWidth, y: THIS.div.offsetHeight };
      if(window.pageYOffset)
        scrollY = window.pageYOffset;
      else
        scrollY = document.body.scrollTop;
      var x = event.clientX+10;
      if(x+size.x>document.body.clientWidth)
        x = document.body.clientWidth-size.x;
      THIS.div.style.left=x+'px';
      THIS.div.style.top=scrollY+event.clientY-size.y-10+'px';
    }
    this.getTTDiv = function() {
      var div = $("dsfm_runtimes");
      if( !div )
        div = THIS.create();
      return div;
    }
    this.create = function() {
      var showArrivalTime = true;
      var i;
      var div = document.body.appendChild( ce('div'));
      div.id = 'dsfm_runtimes';
      div.style.position = "absolute";
      div.style.top = "0px";
      div.style.left = "0px";
      div.style.zIndex = 1000;
      div.style.display = 'none';
      div.style.border='1px solid #804000';
      div.style.backgroundColor = '#F6EAC4';
      div.style.padding = "5px";
      var tab = div.appendChild(ce('table'));
      tab.style.border='1px solid rgb(222, 211, 185)';
      tab.cellSpacing=0;
      tab.cellPadding=0;
      tab.insertRow(0);
      tab.insertRow(1);
      i = 0;
      var col = 0;
      if( showArrivalTime ) {
        i=1;
        var cell = tab.rows[0].insertCell(0);
        cell.style.backgroundColor = colBgColor[1];
        cell.style.padding = '2px';
        cell.style.textAlign = 'right';
        cell.style.fontSize = '9px';
        cell.style.fontWeight = "bold";
        cell.innerHTML = texts[lib.lang].gui.unit;
        cell = tab.rows[1].insertCell(0);
        cell.style.backgroundColor = colBgColor[1];
        cell.style.padding = '2px';
        cell.style.textAlign = 'right';
        cell.style.fontSize = '9px';
        cell.style.fontWeight = "bold";
        cell.innerHTML = texts[lib.lang].gui.runtime;
        tab.insertRow(2);
        cell = tab.rows[2].insertCell(0);
        cell.style.backgroundColor = colBgColor[1];
        cell.style.padding = '2px';
        cell.style.textAlign = 'right';
        cell.style.fontSize = '9px';
        cell.style.fontWeight = "bold";
        cell.innerHTML = texts[lib.lang].gui.arrival;
        tab.insertRow(3);
        cell = tab.rows[3].insertCell(0);
        cell.style.padding = '2px';
        cell.style.textAlign = 'right';
        cell.style.fontSize = '9px';
        cell.style.fontWeight = "bold";
        cell.innerHTML = texts[lib.lang].gui.startTime;
        cell = tab.rows[3].insertCell(1);
        cell.style.padding = '2px';
        cell.style.fontSize = '9px';
        cell.colSpan=3;
        cell.id = "dspi_start";
      }
      for( var key in serverInfo.unitInfo ) {
        if( Math.round(serverInfo.unitInfo[key].speed) > 0 ) {
          cell = tab.rows[0].insertCell(i);
          var img = cell.appendChild(ce('img'));
          cell.style.backgroundColor = colBgColor[col];
          cell.style.padding = '2px';
          cell.style.textAlign = 'center';
          if( key == "trader" )
            img.src = 'graphic/buildings/market.png';
          else
            img.src = 'graphic/unit/unit_'+key+'.png';
          img.alt = '';
          cell = tab.rows[1].insertCell(i);
          cell.style.backgroundColor = colBgColor[col];
          cell.style.padding = '2px';
          cell.style.textAlign = 'center';
          cell.style.fontSize = '9px';
          if( showArrivalTime ) {
            cell = tab.rows[2].insertCell(i);
            cell.style.backgroundColor = colBgColor[col];
            cell.style.padding = '2px';
            cell.style.textAlign = 'center';
            cell.style.fontSize = '9px';
          }
          i++;
          col ^= 1;
        }
      }
      return div;
    }
    this.div = this.getTTDiv();
    if( arguments.length == 2 )
      this.dist = arguments[1];
    else
      this.dist = Number.NaN;
    target.addEventListener("mouseover", function() { THIS.timeOut = setTimeout(THIS.show,Settings.settings.misc.rtttDelay*1000); }, false );
    target.addEventListener("mouseout", function() { if( THIS.timeOut ) clearTimeout(THIS.timeOut); THIS.hide(); THIS.timeOut=0; }, false );
    target.addEventListener("mousemove", THIS.move, false );
  },
  createToolTip : function(target,dist) {
    if( Settings.settings.misc.runTimeToolTips ) {
      if( target.rttt )
        delete target.rttt;
      target.rttt = new RunTimes.ToolTip(target,dist);
    }
  },
  formatTime : function(time) {
    if( isNaN(time)) time=0;
      time=Math.round(time*60);
    var hours = Math.floor(time / 3600);
    var minutes = Math.floor(time/60) - (hours * 60);
    var seconds = Math.round(time % 60,0);
    var ret = hours + ':' + (minutes < 10 ? '0'+minutes : minutes) + ':' + (seconds < 10 ? '0'+seconds : seconds);
    return ret;
  },
  formatDate : function(date,br) {
    var v=date.getDate();
    var ret = (v < 10 ? '0'+v : v)+'.';
    v = date.getMonth()+1;
    ret += (v < 10 ? '0'+v : v)+'.';
    ret+=br?'\n<br/>':' ';
    v = date.getHours();
    ret += (v < 10 ? '0'+v : v)+':';
    v = date.getMinutes();
    ret += (v < 10 ? '0'+v : v)+':';
    v = date.getSeconds();
    ret += (v < 10 ? '0'+v : v);
    return ret;
  },
  doIt : function() {
    if( lib.game_data ) {
      RunTimes.curVillage.id = parseInt(lib.game_data.village.id,10);
      var coords = lib.game_data.village.coord.split("|");
      RunTimes.curVillage.x = parseInt(coords[0]);
      RunTimes.curVillage.y = parseInt(coords[1]);
      lib.storage.setValue("curvil",RunTimes.curVillage);
    }
    else {
      RunTimes.curVillage = lib.storage.getValue("curvil",RunTimes.curVillage);
    }
    RunTimes.speed = 1; //serverInfo.config.unit_speed * serverInfo.config.speed;
    if( lib.params.screen=="market" )
      RunTimes.modMarket();
    else if( /forum\.php/.test(location.href) || (lib.params.screen == "mail" && lib.params.get("mode") == "view"))
      RunTimes.modForumMail();
    else if( /screen=memo/.test(location.href) ) {
      var e = document.getElementsByClassName("show_row");
	  for( var i = 0; i < e.length; i++ )
		RunTimes.addMouseEvents(e[i]);
	}
    else if( lib.params.screen == "info_command" && lib.params.type == "own" )
      RunTimes.modCommand();
  },
  addMouseEvents : function(node) {
    if(node.parentNode.nodeName.toUpperCase() != "A" ) {
      if( node.parentNode.nodeName.toUpperCase() != "TEXTAREA" ) {
        if( node.nodeValue ) {
          var res = node.nodeValue.match(/(\d+)\|(\d+)/);
          var pos = 0;
          if( res ) {
            var cp = node.nodeValue.indexOf(res[0]);
            var oldValue = node.nodeValue;
            node.nodeValue = node.nodeValue.substr(pos, cp);
            var lnk = ce('a');
            var dist = Math.sqrt(Math.pow(RunTimes.curVillage.x - res[1], 2) + Math.pow(RunTimes.curVillage.y - res[2], 2));
            lnk.tooltip = new RunTimes.ToolTip(lnk,dist);
            lnk.innerHTML = res[0];
            lnk.href = 'game.php?' +(isUV?'t='+lib.params.t+'&':'') + 'village='+RunTimes.curVillage.id+'&screen=map&x='+res[1]+'&y='+res[2];
            if( node.nextSibling )
              node.parentNode.insertBefore( lnk, node.nextSibling );
            else
              node.parentNode.appendChild( lnk );
            var rest = ce('span');
            rest.innerHTML = oldValue.substr(cp+res[0].length);
            if( lnk.nextSibling )
              node.parentNode.insertBefore( rest, lnk.nextSibling );
            else
              node.parentNode.appendChild(rest);
          }
        }
      }
    }
    else {
      if( node.nodeValue ) {
        var res = node.nodeValue.match(/(\d+)\|(\d+)/);
        if( res ) {
          var dist = Math.sqrt(Math.pow(RunTimes.curVillage.x - res[1], 2) + Math.pow(RunTimes.curVillage.y - res[2], 2));
          node.tooltip = new RunTimes.ToolTip(node.parentNode,dist);
        }
      }
    }
    var child = node.firstChild;
    while (child != null) {
        RunTimes.addMouseEvents(child);
        child = child.nextSibling;
    }
  },
  convertCoordCol : function(tab,col) {
    var rows = tab.tBodies[0].rows;
    for( var i = 0; i < rows.length; i++ ) {
      var cell = rows[i].cells[col];
      var dstCoords = cell.innerHTML.match(/(\d+)\|(\d+)/);
      if( dstCoords ) {
        var dist = Math.sqrt(Math.pow(RunTimes.curVillage.x - dstCoords[1], 2) + Math.pow(RunTimes.curVillage.y - dstCoords[2], 2));
        cell.innerHTML = '<a href="'+lib.createLink("map","x",dstCoords[1],"y",dstCoords[2],false)+'">'+cell.innerHTML+'</a>';
        cell.setAttribute("dist",dist);
        var tt = new RunTimes.ToolTip(cell,dist);
      }
    }
  },
  compareDistCell : function(a,b) {
    return parseFloat(a.getAttribute("dist"))-parseFloat(b.getAttribute("dist"));
  },
  insertTable : function(parent,dist) {
    var showArrivalTime = true;
    var col = [];
    var row = 0;
    // Anzahl der Zeilen ermitteln
    for( var key in serverInfo.unitInfo ) {
      if( Math.round(serverInfo.unitInfo[key].speed) > 0 ) {
        if( isNaN(col[RunTimes.unitCols[key]]) )
          col[RunTimes.unitCols[key]] = 1;
        else
          col[RunTimes.unitCols[key]]++;
        if( col[RunTimes.unitCols[key]] > row )
          row = col[RunTimes.unitCols[key]];
      }
    }
    var tab = parent.appendChild(ce('table'));
    tab.cellSpacing=0;
    tab.cellPadding=0;
    var bgcolidx = 0;
    for( i = 0; i < row; i++ )
      tab.insertRow(i);
    var cell = tab.insertRow(0).appendChild(ce('th'));
    cell.colSpan=col.length*2;
    cell.innerHTML = texts[lib.lang].gui.runtimes;

    // Laufzeiten einfügen
    var startTime=new Date(lib.getTime()*1000 + 120000);
    for( i = 0; i < col.length; i++ ) {
      var bgcolidx=0;
      row = 1;
      for( key in serverInfo.unitInfo ) {
        if( RunTimes.unitCols[key] == i ) {
          cell = tab.rows[row].insertCell(i*2);
          cell.style.backgroundColor=colBgColor[bgcolidx];
          var img = cell.appendChild(ce('img'));
          if( key == "trader" )
            img.src = 'graphic/buildings/market.png';
          else
            img.src = 'graphic/unit/unit_'+key+'.png';
          img.border = "0";
          img.alt = "";
          cell = tab.rows[row].insertCell(i*2+1);
          var time = serverInfo.unitInfo[key].speed*dist*RunTimes.speed;
          cell.style.fontSize = "9px";
          cell.style.padding="2px";
          cell.style.textAlign="center";
          cell.style.backgroundColor=colBgColor[bgcolidx];
          var color = (key=='snob'&&dist>serverInfo.config.snob_max_dist)?'#999999':'#000000';
          var html = '<span style="color:'+color+';">' + texts[lib.lang].locale.formatDuration(Math.round(time*60)) + '</span>';
          if( showArrivalTime ) {
            var arrivalTime = new Date(startTime.getTime() + time*60000);
            var h=arrivalTime.getHours();
            color=(key=='snob'&&dist>serverInfo.config.snob_max_dist)?'#999999':(h>=serverInfo.config.night_start_hour&&h<serverInfo.config.night_end_hour)?'#FF0000':'#000000';
            html += '<br/><span style="color:'+color+'">'+RunTimes.formatDate(arrivalTime,true)+'</span>';
          }
          cell.innerHTML=html;
          row++;
          bgcolidx ^= 1;
        }
      }
    }
    if( showArrivalTime ) {
      row = tab.insertRow(tab.rows.length);
      cell = row.insertCell(0);
      cell.colSpan=8;
      cell.style.fontSize="9px";
      cell.innerHTML = "<b>"+texts[lib.lang].gui.startTime+":</b> "+RunTimes.formatDate(startTime,false);
    }
  },
  modMarket : function() {
    var select = $("inputx");
    if( select )  {
      select = select.parentNode.getElementsByTagName("select")[0];
      if( select ) {
        var html = "<option>"+select.options[0].innerHTML+"</option>";
        for( var i = 1; i < select.options.length; i++ ) {
          var coords = select.options[i].value.split("|");
          var dist = Math.sqrt(Math.pow(RunTimes.curVillage.x - parseInt(coords[0],10), 2) + Math.pow(RunTimes.curVillage.y - parseInt(coords[1],10), 2));
          var duration = dist * 6 / serverInfo.config.speed;
          html += '<option value="'+select.options[i].value+'">'+select.options[i].innerHTML + " => " + texts[lib.lang].locale.formatDuration(Math.round(duration*60))+"</option>";
        }
        select.innerHTML = html;
      }
    }
  },
  modForumMail : function() {
    var tab = document.getElementsByTagName('table');
    for( var i = 0; i < tab.length; i++ ) {
      if( tab[i].className=="main" )
        break;
    }
    tab = tab[i];
    RunTimes.addMouseEvents(tab);
  },
  modCommand : function() {
    if( texts[lib.lang].regex.attack.test(document.getElementsByTagName("h2")[0].innerHTML) ) {
      var tab = document.getElementById("content_value").getElementsByTagName('table')[0];
      for( var i = 0; i < tab.rows.length; i++ ) {
        if( texts[lib.lang].regex.durationTitle.test(tab.rows[i].cells[0].innerHTML) ) {
          duration = tab.rows[i].cells[1];
          duration = duration.innerHTML.split(':');
          duration = (parseInt(duration[0],10)*3600+parseInt(duration[1],10)*60+parseInt(duration[2],10))*1000;
        }
        else if( texts[lib.lang].regex.arrivalTitle.test(tab.rows[i].cells[0].innerHTML) ) {
          var cell = tab.rows[i].cells[1];
          var res = cell.textContent.match(texts[lib.lang].regex.datetime);
          var time = texts[lib.lang].locale.date2MS(res);
          var row = tab.insertRow(i+1);
          var cell = row.insertCell(0);
          cell.colSpan=2;
          cell.innerHTML = texts[lib.lang].gui.returnTitle+":";
          tab.rows[i+1].insertCell(1).innerHTML = texts[lib.lang].locale.date2timeStr(new Date(time+duration));
          if( /action=cancel/.test(tab.innerHTML) ) {
            row = tab.insertRow(i+2);
            cell = row.insertCell(0);
            cell.colSpan=2;
            cell.innerHTML = texts[lib.lang].gui.returnAtCancel+":";
            cell = tab.rows[i+2].insertCell(1);
            cell.innerHTML = texts[lib.lang].locale.date2timeStr(new Date(time+duration));
            cell.id = "dsfm_cancelreturn";
            window.setInterval(function() { var parts = document.getElementsByClassName("timer")[0].innerHTML.split(":"); var ms = duration - (parseInt(parts[0],10)*3600+parseInt(parts[1],10)*60+parseInt(parts[2],10))*1000; document.getElementById("dsfm_cancelreturn").innerHTML = texts[lib.lang].locale.date2timeStr(new Date(time-duration+ms*2)); }, 250 );
          }
          i = tab.rows.length;
        }
      }
    }
  },
  insertDist : function(row, colCoords, colDist) {
    var coords = row.cells[colCoords].innerHTML.match(/ \((\d+)\|(\d+)\) K\d+</);
    var cell = row.cells[colDist];
    cell.style.textAlign = "right";
    if( coords ) {
      var dist = Math.sqrt(Math.pow(RunTimes.curVillage.x - coords[1], 2) + Math.pow(RunTimes.curVillage.y - coords[2], 2));
      cell.dsfmtt = new RunTimes.ToolTip(cell,dist);
      cell.innerHTML = Math.round(dist*100)/100;
    }
    else
      cell.innerHTML = "---";
  },
}
var Storage = {
  colors : {},
  wood : [],
  stone : [],
  iron : [],
  storage : 1,
  doIt : function() {
    Storage.doResources();
    if( lib.params.screen == "market" && lib.params.mode == "all_own_offer" )
      Storage.modAllOwnOffer();
    if( lib.params.screen == "snob" && lib.params.mode=="coin" && Settings.settings.storage.modSnob )
      Storage.modSnob();
  },
  getColors : function(type, p,el) {
    if( Storage.colors[type] === undefined )
      Storage.colors[type] = [];
    var p = Math.round(p);
    if( p < 0 )
      p = 0;
    if( p > 100 )
      p = 100;
    if( Storage.colors[type][p] === undefined ) {
      var rgb = null;
      for( var i = 2; i < Settings.colors.range[type].length && Settings.colors.range[type][i].val < p; i++ );
      var color = new Color(Settings.colors.range[type][i-1].color);
      if( Settings.colors.range[type][0] ) {
        var f = (p-Settings.colors.range[type][i-1].val)/(Settings.colors.range[type][i].val-Settings.colors.range[type][i-1].val);
        color = color.fadeTo(f, new Color(Settings.colors.range[type][i].color));
      }
      else {
        if( Settings.colors.range[type][i].val == p )
          color = new Color(Settings.colors.range[type][i].color);
        else
          color = new Color(Settings.colors.range[type][i-1].color);
      }
      Storage.colors[type][p] = { background: color, text: color.getContrastColor() };
    }
    if( el != null ) {
      el.style.backgroundColor = Storage.colors[type][p].background;
      el.style.color = Storage.colors[type][p].text;
    }
    return Storage.colors[type][p];
  },
  doResources : function() {
    Storage.wood[0] = $("wood");
    Storage.stone[0] = $("stone");
    Storage.iron[0] = $("iron");
    Storage.wood[1] = $("wood");
    Storage.stone[1] = $("stone");
    Storage.iron[1] = $("iron");
    var storage = $("storage");
    var pop_current = $("pop_current");
    var pop_current_label = $("pop_current_label");
    var pop_max = $("pop_max");
    var pop_max_label = $("pop_max_label");
    if( Settings.settings.storage.titleResColored ) {
      var div = document.body.appendChild(ce("div"));
      div.style.display = "none";
      Storage.wood[1] = div.appendChild(ce("span"));
      Storage.wood[0].id = "";
      Storage.wood[1].id = "wood";
      Storage.wood[1].title = Storage.wood[0].title;
      Storage.wood[1].innerHTML = Storage.wood[0].innerHTML;
      Storage.stone[1] = div.appendChild(ce("span"));
      Storage.stone[0].id = "";
      Storage.stone[1].id = "stone";
      Storage.stone[1].title = Storage.stone[0].title;
      Storage.stone[1].innerHTML = Storage.stone[0].innerHTML;
      Storage.iron[1] = div.appendChild(ce("span"));
      Storage.iron[0].id = "";
      Storage.iron[1].id = "iron";
      Storage.iron[1].title = Storage.iron[0].title;
      Storage.iron[1].innerHTML = Storage.iron[0].innerHTML;
      var span = div.appendChild(ce("span"));
      storage.id = "";
      span.id = "storage";
      span.innerHTML = storage.innerHTML;
      Storage.storage = parseInt(storage.innerHTML,10);
      storage.innerHTML = lib.formatNumber(Storage.storage,true,true);
      setInterval(Storage.updateRes, 1000);
      Storage.updateRes();
    }

    var popCurrent = parseInt(pop_current.innerHTML,10);
//      pop_current.innerHTML = lib.formatNumber(popCurrent,true,true);

    if( Settings.settings.storage.titleFarmColored ) {
      var popMax = parseInt(pop_max.innerHTML,10);
//        pop_max.innerHTML = lib.formatNumber(popMax,true,true);
      Storage.getColors( "farm", popCurrent * 100 / popMax,pop_current_label );
    }
    pop_current_label.parentNode.title = lib.formatNumber(popMax-popCurrent,true,false) + " " + texts[lib.lang].gui.freeRes;
    curVillage.res.wood = parseInt(Storage.wood[1].innerHTML,10);
    curVillage.res.stone = parseInt(Storage.stone[1].innerHTML,10);
    curVillage.res.iron = parseInt(Storage.iron[1].innerHTML,10);
    curVillage.res.storage = parseInt($("storage").innerHTML,10);
    curVillage.res.pop.current = popCurrent;
    curVillage.res.pop.max = popMax;
    curVillage.res.timestamp = lib.getTime();
    curVillage.save();
  },
  updateRes : function() {
    for( var key in resInfos ) {
      var val = parseInt(Storage[key][1].textContent.replace(/\./g,""),10);
      Storage[key][0].innerHTML = lib.formatNumber(val,true,true);
      if( Settings.settings.storage.titleResColored )
        Storage.getColors( "resource", val * 100 / Storage.storage, Storage[key][0] );
    }
  },
  modResHeader : function(row,col) {
    cell = row.insertBefore(ce("th"),row.cells[col]);
    cell.innerHTML = '<img alt="" src="graphic/holz.png"/> '+texts[lib.lang].resources.wood;
    cell.style.whiteSpace = "nowrap";
    cell = row.insertBefore(ce("th"),cell.nextSibling);
    cell.innerHTML = '<img alt="" src="graphic/lehm.png"/> '+texts[lib.lang].resources.stone;
    cell.style.whiteSpace = "nowrap";
    cell = cell.nextSibling;
    cell.innerHTML = '<img alt="" src="graphic/eisen.png"/> '+texts[lib.lang].resources.iron;
    cell.style.whiteSpace = "nowrap";
  },
  modResColumn : function(row,col,colored) {
    var imgs = row.cells[col].getElementsByTagName("img");
    var res = row.cells[col].innerHTML.replace(/<[^>]+>|\./g, "" ).split(" ");
    var cell = row.cells[col+1];
    res[3] = parseInt(cell.innerHTML,10);
    cell.style.textAlign = "right";
    cell.innerHTML = lib.formatNumber(res[3],true,true);
    row.insertCell(col);
    row.insertCell(col);
    var c = col;
    var idx = 0;
    for( var key in resInfos ) {
      var cur = 0;
      if( imgs[idx].src.indexOf(resInfos[key].img) > -1 )
        cur = parseInt(res[idx++],10);
      var percent = Math.round( cur * 100 / res[3] );
      cell = row.cells[c++];
      cell.style.textAlign = "right";
      cell.style.cursor = "default";
      cell.style.paddingLeft = "5px";
      cell.style.paddingRight = "5px";
      cell.title = lib.formatNumber( res[3] - cur, true, false ) + " " + texts[lib.lang].gui.freeRes;
      if( colored )
        Storage.getColors( "resource", percent, cell );
      cell.innerHTML = lib.formatNumber(cur, true, true);
    }
  },
  modSnob : function() {
    var tab = $("coin_overview_table");
    tab.rows[0].cells[0].colSpan = 5;
    //tab.rows[tab.rows.length-1].cells[0].colSpan = 5;
    tab.insertBefore(ce("thead"),tab.tBodies[0]);
    tab.tHead.appendChild(tab.tBodies[0].rows[0]);
    tab.tHead.appendChild(tab.tBodies[0].rows[0]);
    //tab.appendChild(ce("tfoot"));
    //tab.tFoot.appendChild(tab.tBodies[0].rows[tab.tBodies[0].rows.length-1]);
    if( Settings.settings.storage.modSnob )
      Storage.modResHeader(tab.rows[1],1);
    for( var i = 0; i < tab.tBodies[0].rows.length; i++ ) {
      tab.tBodies[0].rows[i].cells[0].setAttribute("dsfm_order",i);
      if( Settings.settings.storage.modSnob )
        Storage.modResColumn(tab.tBodies[0].rows[i],1, Settings.settings.storage.snobResColored);
    }
    var sorter = new TableSorter(tab);
    sorter.addSortColumn(0,compareOrderCell,1);
    sorter.addSortColumn(1,compareNumericCell);
    sorter.addSortColumn(2,compareNumericCell);
    sorter.addSortColumn(3,compareNumericCell);
    sorter.addSortColumn(4,compareNumericCell);
  },
  modAllOwnOffer : function() {
    var tab = getByTagName(document.getElementsByTagName("h3")[0],"table","nextSibling");
    if( tab ) {
      tab.tBodies[0].removeChild(tab.rows[tab.rows.length-1]);
      var img2key = { holz: "wood", lehm: "stone", eisen: "iron" };
      var sum = [ 0, { wood: 0, stone: 0, iron: 0 }, { wood: 0, stone: 0, iron: 0 }, 0, 0, 0 ];
      for( var i = 1; i < tab.rows.length-1; i++ ) {
        if( tab.rows[i].cells.length == 5 ) {
          tab.rows[i].insertCell(0).innerHTML = tab.rows[i-1].cells[0].innerHTML;
        }
        else {
          sum[4]++;
          tab.rows[i].cells[0].rowSpan = 1;
        }
        
        var count = parseInt(tab.rows[i].cells[3].innerHTML,10);
        sum[3] += count;
        sum[0]++;
        for( var c = 1 ; c < 3; c++ ) {
          try {
            var key = img2key[tab.rows[i].cells[c].getElementsByTagName("img")[0].src.match(/\/graphic\/([^\.]+)\.png/)[1]];
            var val = parseInt(tab.rows[i].cells[c].innerHTML.replace(/<[^>]+>|\./g,""),10);
            sum[c][key] += val * count;
          } catch(e) {}
        }
      }
      var row = tab.appendChild(ce("tfoot")).insertRow(-1);
      var cell = row.appendChild(ce("th"));
      cell.style.textAlign = "right";
      cell.style.verticalAlign = "top";
      cell = row.appendChild(ce("th"));
      cell.style.textAlign = "right";
      cell.style.verticalAlign = "top";
      var tabs = [];
      tabs.push(cell.appendChild(ce("table")));
      cell = row.appendChild(ce("th"));
      cell.style.textAlign = "right";
      cell.style.verticalAlign = "top";
      tabs.push(cell.appendChild(ce("table")));
      
      for( var i = 1; i < 3; i++ ) {
        for( var key in resInfos ) {
          var rowsum = tabs[i-1].insertRow(-1);
          var cell = rowsum.appendChild(ce("th"));
          var img = cell.appendChild(ce("img"));
          img.src = "graphic/"+resInfos[key].img;
          img.title = texts[lib.lang].resources[key];
          cell = rowsum.appendChild(ce("th"));
          cell.style.textAlign = "right";
          cell.innerHTML = lib.formatNumber(sum[i][key],true,true,2);
          cell.title = lib.formatNumber(sum[i][key],true,false)
        }
        rowsum = tabs[i-1].insertRow(-1);
        cell = rowsum.appendChild(ce("th"));
        img = cell.appendChild(ce("img"));
        img.src = "graphic/res.png"
        img.title = texts[lib.lang].resources[key];
        cell = rowsum.appendChild(ce("th"));
        cell.style.textAlign = "right";
        var val = sum[i].wood + sum[i].stone + sum[i].iron;
        cell.innerHTML = lib.formatNumber(val,true,true,2);
        cell.title = lib.formatNumber(val,true,false)
      }
      cell = row.appendChild(ce("th"));
      cell.style.textAlign = "right";
      cell.style.verticalAlign = "top";
      cell.innerHTML = lib.formatNumber(sum[3],true,true);
      cell = row.appendChild(ce("th"));
      cell.colSpan=2;
      cell.style.verticalAlign = "top";
      cell.innerHTML = sum[4] + texts[lib.lang].gui.offersVil[0] + sum[0] + texts[lib.lang].gui.offersVil[1];
      var sorter = new TableSorter(tab);
      sorter.addSortColumn(0,compareStringCell,0);
      sorter.addSortColumn(1,Storage.compareResType,0);
      sorter.addSortColumn(2,Storage.compareResType,0);
      sorter.addSortColumn(3,compareNumericCell,0);
      sorter.addSortColumn(4,compareTimeCell,0);
      sorter.addSortColumn(5,compareNumericCell,0);
    }
  },
  compareResType : function(a,b) {
    var val = [ a.getElementsByTagName("img")[0].title, b.getElementsByTagName("img")[0].title ];
    var ret = compare(val[0],val[1]);
    if( ret == 0 )
      ret = parseInt(a.innerHTML.replace(/<[^>]+>|\./g,""),10) - parseInt(b.innerHTML.replace(/<[^>]+>|\./g,""),10)
    return ret;
  },
}
var Recruitment = {
  drillQueues : null,
  unitSum : null,
  fillInButton : null,
  massRecSumTab : null,
  variantCombo : null,
  toBuild : {},
  res : {},
  variant : null,
  maxPop : 24000,
  unitTab: null,
  doIt : function() {
    Recruitment.unitSum = {};
    for( var key in serverInfo.unitInfo )
      Recruitment.unitSum[key] = 0;

    if( isOneOf(lib.params.screen,"train","barracks","stable","garage" ) ) {
      Recruitment.drillQueues = [];
      var content = $("content_value");
      var tabs = content.getElementsByClassName("vis");
      for( var i = 0; i < tabs.length-1; i++ ) {
        if( tabs[i].rows && tabs[i].rows.length > 0 && tabs[i].rows[0].cells.length > 0 && texts[lib.lang].regex.completion.test(tabs[i].rows[0].cells[0].innerHTML) ) {
          Recruitment.drillQueues.push(new DrillQueue(tabs[i++]));
        }
      }
      if( lib.params.mode != "mass" ) {
        Recruitment.unitTab = tabs[i];
        Recruitment.modUnitTab();
        if( Settings.settings.recruit.showRecruitSums )
          Recruitment.createSumTable(document.getElementsByTagName("form")[0]);
      }
      else {
        Recruitment.doMass();
      }
    }
    else if( lib.params.screen == "overview" ) {
      var tab = $("content_value").getElementsByClassName("vis")[0];
      if( texts[lib.lang].regex.building.test(tab.rows[0].cells[0].innerHTML) ) {
        for( var i = 1; i < tab.rows.length; i++ ) {
          var key = tab.rows[i].cells[1].getElementsByTagName("img")[0].src.match(/buildings\/([^\.]+).png/)[1];
          if( isOneOf(key,"barracks","stable","garage","snob") )
            Recruitment.shrinkDrillImgList( tab.rows[i].cells[2], Settings.settings.recruit.shrinkRecruitmentMode );
        }
      }
      if( Settings.settings.recruit.showRecruitSums )
        Recruitment.createSumTable(tab.parentNode); //,document.getElementsByTagName("form")[0]);
    }
  },
  shrinkDrillImgList : function(el,mode) {
    if( el.firstChild ) {
      var imgs = el.getElementsByTagName("img");
      var sum = 0;
      var idx = 0;
      var curUnit = "";
      var units = [];
      for( var i = 0; i < imgs.length; i++ ) {
        var vals = imgs[i].title.split(" - ");
        var key = imgs[i].src.match(/unit_([^\.]+)\.png/)[1];
        units.push( { count: parseInt(vals[0],10), key: key, end: vals[1] } );
      }

/*      var strong = el.getElementsByTagName("strong");
      if( strong.length == 1 )
        el.innerHTML = "<strong>"+strong[0].innerHTML+"</strong><br/>";
      else
        el.innerHTML = "";        
*/
      switch( mode ) {
        case 0:
        case 1:
        case 2:
          el.innerHTML = "";
          var unitImgs = {};
          for( var i = 0; i < units.length; i++ ) {
          if( curUnit != units[i].key ) {
            if( mode < 2 || unitImgs[units[i].key] == null ) {
            var img = el.appendChild(ce("img"));
            img.src = "graphic/unit/unit_"+units[i].key+".png";
            sum = 0;
            if( mode == 1 )
              curUnit = units[i].key;
            unitImgs[units[i].key] = { img: img, sum: 0 };
            }
          }
          unitImgs[units[i].key].sum += units[i].count;
          Recruitment.unitSum[units[i].key] += units[i].count;
          unitImgs[units[i].key].img.title = unitImgs[units[i].key].sum;
          if( units[i].end )
            unitImgs[units[i].key].img.title += " - " + units[i].end;
          }
          break;
        case 3:
          el.innerHTML = texts[lib.lang].locale.formatDuration(texts[lib.lang].locale.timeStr2Sec(units[units.length-1].end)-lib.getTime(),true);
          el.style.textAlign="right";
          break;
        case 4:
          el.innerHTML = texts[lib.lang].locale.date2timeStr(new Date(texts[lib.lang].locale.timeStr2Sec(units[units.length-1].end)*1000),true,false);
          el.style.textAlign="right";
          break;
      }
    }
  },
  createSumTable : function(parent,before) {
    var tab = ce("table");
    tab.className = "vis";
    var rowTitle = tab.insertRow(-1);
    var rowSum = tab.insertRow(-1);
    var hasUnits = false;
    for( var key in Recruitment.unitSum ) {
      if( Recruitment.unitSum[key] > 0 ) {
        hasUnits = true;
        var cell = rowTitle.appendChild(ce("th"));
        var img = cell.appendChild(ce("img"));
        img.src = "graphic/unit/unit_"+key+".png";
        img.title = texts[lib.lang].units[key];
        cell.style.textAlign = "center";
        cell = rowSum.insertCell(-1);
        cell.style.paddingLeft = "5px";
        cell.innerHTML = lib.formatNumber(Recruitment.unitSum[key],true,true);
      }
    }
    if( hasUnits ) {
      if( before )
        parent.insertBefore(tab,before);
      else
        parent.appendChild(tab);
    }
  },
  modUnitTab : function() {
    var tab = Recruitment.unitTab;
    tab.rows[0].cells[0].innerHTML += " ";
    var id = Recruitment.insertVariantCombo(tab.rows[0].cells[0],lib.game_data.village.id,true);
    var a = tab.rows[0].cells[0].appendChild(ce("a"));
    a.href = "javascript:;";
    a.innerHTML = ' <img alt="#" src="graphic/rename.png"/>';
    a.addEventListener("click", function(e) { lib.storage.setValue("settingsTab"+ownPid,"recruAssist"); location.href = lib.createLink("settings","mode","settings",false); }, false);
    
    tab.rows[0].cells[3].innerHTML = texts[lib.lang].gui.unitsTitle;
    if( id > 0 ) {
      Recruitment.variant = Settings.recruAssist.variants[Settings.getVariantIdxById("recruAssist",id)];
      Recruitment.res = { wood: Math.max(0,curVillage.res.wood-Recruitment.variant.keepWood), stone: Math.max(0,curVillage.res.stone-Recruitment.variant.keepStone), iron: Math.max(0,curVillage.res.iron-Recruitment.variant.keepIron), pop: 0 };    
      Recruitment.maxPop = Math.max(curVillage.res.pop.max-curVillage.res.pop.current-Recruitment.variant.freePop,0);
    }
    Recruitment.toBuild = { };
    for( var i = 1; i < tab.rows.length-1; i++ ) {
      var unit = tab.rows[i].cells[0].innerHTML.match(/unit_([^\.|_]+)(_60)?\.png/)[1];
      var input = $(unit+"_0");
      if( input ) {
        input.addEventListener("change",Recruitment.onChange,false);
        input.value = "";
      }
      var vals = tab.rows[i].cells[6].innerHTML.split("/");
      var cur = parseInt(vals[1],10)+Recruitment.unitSum[unit];
      if( Settings.settings.recruit.showRecruitTotal )
        tab.rows[i].cells[6].innerHTML += "/"+cur;
      if( id > 0 ) {
        if( cur >= Recruitment.variant[unit] ) {
          tab.rows[i].cells[7].innerHTML = texts[lib.lang].gui.recruDone;
          tab.rows[i].cells[7].className = "inactive";
        }
        else
          Recruitment.toBuild[unit] = Recruitment.variant[unit]-cur;
      }
    }
    if( id > 0 ) {
      var cell = tab.rows[i].cells[0];
      var recruBtn = getByTagName(cell,"input","lastChild");
      var input = cell.insertBefore(ce("input"),recruBtn);
      input.type = "button";
      input.style.fontSize = recruBtn.style.fontSize;
      input.value = texts[lib.lang].gui.fillIn;
      var resAvailable = { wood: Recruitment.res.wood, stone: Recruitment.res.stone, iron: Recruitment.res.iron, pop: Recruitment.maxPop };
      input.addEventListener("click",function() {
          var units = Recruitment.getBuildUnits(resAvailable,Recruitment.toBuild);
          for( var key in units ) {
            var input = $(key+"_0");
            if( input )
              input.value = units[key];
          }
          Recruitment.onChange();
        }, false);
      Recruitment.onChange();
    }
  },
  insertUnits : function(e) {
    var unit = this.id.substring(0,this.id.length-2);
    var anz = parseInt(this.textContent.match(/\((\d+)\)/)[1],10);
    var input = $(unit);
    if( anz == 0 )
      input.value = "";
    else {
      var val = parseInt(input.value,10);
      if( isNaN(val) )
        val = 0;
      input.value = val + anz;
    }
    Recruitment.onChange();
  },
  onChange : function(e) {
    var tab = Recruitment.unitTab;
    Recruitment.res = { wood: Math.max(0,curVillage.res.wood-Recruitment.variant.keepWood), stone: Math.max(0,curVillage.res.stone-Recruitment.variant.keepStone), iron: Math.max(0,curVillage.res.iron-Recruitment.variant.keepIron), pop: Recruitment.maxPop };    
    for( var i = 1; i < tab.rows.length-1; i++ ) {
      var unit = tab.rows[i].cells[0].innerHTML.match(/unit_([^\.|_]+)(_60)?\.png/)[1];
      var input = $(unit+"_0");
      if( input ) {
        input.style.color = "";
        var val = parseInt(input.value,10);
        if( isNaN(val) ) {
          val = 0;
          input.value = "";
        }
        else if( val > 0 ) {
          if( val > Recruitment.toBuild[unit] )
            input.style.color = "#FF8914";
          for( var key in Recruitment.res ) {
            Recruitment.res[key] -= serverInfo.unitInfo[unit][key] * val;
            if( Recruitment.res[key] < 0 )
              input.style.color = "red";
          }
        }
      }
    }
    var maxUnits;
    var maxPop = Recruitment.res.pop;
    for( var i = 1; i < tab.rows.length-1; i++ ) {
      var vals = tab.rows[i].cells[6].innerHTML.split("/");
      var unit = tab.rows[i].cells[0].innerHTML.match(/unit_([^\.|_]+)(_60)?\.png/)[1];
      var cur = parseInt(vals[2],10);
      if( cur < Recruitment.variant[unit] ) {
        Recruitment.res.pop = Math.min(maxPop,serverInfo.unitInfo[unit].pop*(Recruitment.variant[unit]-cur));
        maxUnits = 24000;
        for( var key in Recruitment.res ) {
          var val = Math.floor(Recruitment.res[key]/serverInfo.unitInfo[unit][key]);
          if( val < maxUnits )
            maxUnits = val;
        }
        if( maxUnits >= 0 ) {
          var a = $(unit+"_0_a");
          if( a ) {
            a.textContent = "("+maxUnits+")";
            a.href = "javascript:;";
            a.addEventListener("click",Recruitment.insertUnits,false);
          }
        }
      }
    }
    if( e ) {
      e.stopPropagation = true;
      e.preventDefault();
    }
    return false;
  },
  updateVariantValues : function(row) { 
    var bh = 0;
    for( var i = 1; i < row.cells.length - 6; i++ )
      bh += serverInfo.unitInfo[row.cells[i].firstChild.name].pop*parseInt(row.cells[i].firstChild.value,10);
    row.cells[i+4].innerHTML = lib.formatNumber(bh,true,true);
  },
  onVariantChanged : function(e) {
    var id = parseInt(this.value,10);
    var vid = parseInt(this.id.split("_")[2],10);
    Settings.recruAssist.assigns = Settings.recruAssist.assigns.replace(new RegExp(";"+vid+",\\d+;"),"");
    Settings.recruAssist.assigns += ";" + vid +","+id+";";
    lib.storage.setValue("recruAssist"+ownPid,Settings.recruAssist);
  },
  getBuildUnits : function(resAvailable,toBuild) {
    var resNeeded = { wood: 0, stone: 0, iron: 0, pop: 0 };
    var minfactor = 1;
    for( var res in resNeeded )
      for( var unit in toBuild ) {
        resNeeded[res] += serverInfo.unitInfo[unit][res] * toBuild[unit];
      factor = resAvailable[res] / resNeeded[res];
      if( factor < minfactor ) 
        minfactor = factor;
    }
    for( var unit in toBuild )
      toBuild[unit] = Math.floor(toBuild[unit]*minfactor);
    return toBuild;
  },
  doMass : function() {
    var tab = getByTagName($("mass_train_form"),"table","previousSibling");
    var row = tab.rows[0];
    var cell = row.insertCell(-1);
    var input = cell.appendChild(ce("input"));
    input.type = "button";
    input.value = texts[lib.lang].gui.fillIn;
    input.addEventListener("click",Recruitment.doMassFillIn,false);
    Recruitment.fillInButton = input;
    input = cell.appendChild(ce("input"));
    input.type = "button";
    input.value = texts[lib.lang].gui.recruit;
    input.addEventListener("click",function() {$("mass_train_form").submit();},false);    
    tab = $("mass_train_table");
    var select = Recruitment.insertVariantCombo(tab.rows[0].appendChild(ce("th")),0);
    //return;
    select.addEventListener("change", function(e) {
        if(confirm(texts[lib.lang].gui.confirmAssignUnitVariant)) {
          var idx = tab.rows[0].cells.length-1;
          for( var i = 1; i < tab.rows.length; i++ ) {
            var select = tab.rows[i].cells[idx].firstChild;
            select.value = this.value;
            lib.fireEvent(select,"change");
          }
          this.value = 0;
        }
      }, false );
    for( var i = 1; i < tab.rows.length; i++ ) {
      var cell = tab.rows[i].insertCell(-1);
      var id = tab.rows[i].cells[0].innerHTML.match(/village=(\d+)/)[1];
      Recruitment.insertVariantCombo(cell,id);
    }
  },
  doMassFillIn : function() {
    Recruitment.fillInButton.disabled = true;
    var tab = $("mass_train_table");
    var units = [];
    var sums = { villages: 0 };
    for( var i = 3; i < tab.rows[0].cells.length-1; i++ ) {
      var unit = tab.rows[0].cells[i].innerHTML.match(/\/unit_([^\.]+)\.png/)[1];
      units.push( unit );
      sums[unit] = 0;
    }
    for( var i = 1; i < tab.rows.length; i++ ) {
      var id = tab.rows[i].cells[0].innerHTML.match(/village=(\d+)/)[1];
      var re = new RegExp(";"+id+",(\\d+);");
      var rVar = Settings.recruAssist.assigns.match(re);
      if( rVar !== null )
        rVar = parseInt(rVar[1],10);
      else
        rVar = 0;
      var bVar = Settings.buildAssist.assigns.match(re);
      if( bVar !== null )
        bVar = parseInt(rVar[1],10);
      else
        bVar = Settings.buildAssist.defVar;
      var bhmax = 0;
      if( bVar > 0 ) {
        bVar = Settings.buildAssist.variants[Settings.getVariantIdxById("buildAssist",bVar)];
      }
      var count = false;
      if( rVar > 0 ) {
        rVar = Settings.recruAssist.variants[Settings.getVariantIdxById("recruAssist",rVar)];
        if( rVar ) {
          var resAvailable = { wood: 0, stone: 0, iron: 0, pop: 0 };
          var res = tab.rows[i].cells[1].innerHTML.replace(/<br[^>]*>/g," ").replace(/<[^>]+>|\./g, "").split(" ");
          resAvailable.wood = Math.max(0,parseInt(res[0],10)-rVar.keepWood);
          resAvailable.stone = Math.max(0,parseInt(res[1],10)-rVar.keepStone);
          resAvailable.iron = Math.max(0,parseInt(res[2],10)-rVar.keepIron);
          res = tab.rows[i].cells[2].innerHTML.split("/");
          resAvailable.pop = Math.max(0,parseInt(res[1],10)-parseInt(res[0],10)-rVar.freePop);
          
          var toBuild = { };
          for( j = 3; j < tab.rows[i].cells.length; j++ ) {
            var idx = j-3;
            var img = tab.rows[i].cells[j].getElementsByTagName("img")[0];
            if( img ) {
              var cur = parseInt(img.parentNode.parentNode.textContent,10);
              if( img.title )
                cur += parseInt(img.title,10);
              toBuild[units[idx]] = Math.max(0,rVar[units[idx]]-cur);
            }
          }
          toBuild = Recruitment.getBuildUnits(resAvailable,toBuild);
          for( var key in toBuild ) {
            if( toBuild[key] > 0 ) {
              $(key+"_"+id).value = toBuild[key];
              sums[key] += toBuild[key];
              count = true;
            }
          }
          if( count )
            sums.villages++;
        }
      }
      tab.rows[i].parentNode.style.display = count ? "" : "none";
    }
    Recruitment.fillInButton.disabled = false;
    if( !Recruitment.massRecSumTab ) {
      tab = tab.parentNode.insertBefore(ce("table"),tab);
      var rowTitle = tab.insertRow(-1);
      var rowVal = tab.insertRow(-1);
      for( var key in sums ) {
        var cell = rowTitle.appendChild(ce("th"));
        cell.style.textAlign = "center";
        cell.style.width = "60px";
        cell.innerHTML = key == "villages" ? texts[lib.lang].gui.villages : '<img src="graphic/unit/unit_'+key+'.png" title="'+texts[lib.lang].units[key]+'"/>';
        cell = rowVal.insertCell(-1);
        cell.style.textAlign = "right";
      }
      Recruitment.massRecSumTab = tab;
    }
    else
      tab = Recruitment.massRecSumTab;
    var idx = 0;
    for( var key in sums )
      tab.rows[1].cells[idx++].innerHTML = lib.formatNumber(sums[key],true,true);
  },
  insertVariantCombo : function(parent,vid,reload) {
    var id = Settings.recruAssist.assigns.match(";"+vid+",(\\d+);");
    if( id )
      id = id[1];
    else if( vid > 0 )
      id = Settings.recruAssist.defVar;
    else
      id = 0;
    var select;
    if( Recruitment.variantCombo === null ) {
      select = ce("select");
      select.size = 1;
      select.id = "dsfm_recruvar_"+vid;
      select.options[0] = new Option(texts[lib.lang].gui.selectVariantOption,0,true,false);
      for( var i = 0; i < Settings.recruAssist.variants.length; i++ )
        select.options[i+1] = new Option(Settings.recruAssist.variants[i].name,Settings.recruAssist.variants[i].id,false,false);
      Recruitment.variantCombo = select;
    }
    select = Recruitment.variantCombo.cloneNode(true);
    select.id = "dsfm_recruvar_"+vid;
    select.value = id;
    parent.appendChild(select);
    if( vid > 0 ) {
      select.addEventListener("change", Recruitment.onVariantChanged, false );
      if( reload )
        select.addEventListener("change", function(e) {document.location.reload();}, false );
    }
    return vid == 0 ? select : id;
  },
}
var HotKeys = {
  hotKeys: [],
  doIt : function() {
    window.addEventListener("keydown", HotKeys.keyDownHandler, false );
    window.addEventListener("keyup", HotKeys.keyUpHandler, false );
  },
  keyDownHandler : function(e) {
    CoordSelector.keyDown(e);
  },
  keyUpHandler : function(e) {
    CoordSelector.keyUp(e);
    var name = e.target.nodeName.toUpperCase();
    if( Settings && Settings.settings.misc.useHotKeys ) {
      if( name == "INPUT" && isOneOf(e.target.type.toUpperCase(),"TEXT","PASSWORD") && e.target.id != "dsfm_coords")
        return;
      if( name != "TEXTAREA" ) {
        var mod = HotKeys.getModifierKeys(e);
        for( var i = 0; i < HotKeys.hotKeys.length; i++ ) {
          if( HotKeys.hotKeys[i].key.modifier == mod.val && HotKeys.hotKeys[i].key.keyCode == e.keyCode ) {
            if( HotKeys.hotKeys[i].func )
              HotKeys.hotKeys[i].func(e,mod);
            if( HotKeys.hotKeys[i].href )
              location.href = HotKeys.hotKeys[i].href;
            if( HotKeys.hotKeys[i].event ) {
              lib.fireEvent( $(HotKeys.hotKeys[i].event.id), HotKeys.hotKeys[i].event.event );
            }
          }
        }
      }
    }
  },
  getModifierKeys : function(e) {
    var mod = { text: "", val: 0 };
    if( e.ctrlKey ) {
      mod.text += texts[lib.lang].gui.keys[17] + " + ";
      mod.val |= 1;
    }
    if( e.altKey ) {
      mod.text += texts[lib.lang].gui.keys[18] + " + ";
      mod.val |= 2;
    }
    if( e.shiftKey ) {
      mod.text += texts[lib.lang].gui.keys[16] + " + ";
      mod.val |= 3;
    }
    return mod;
  },
  add : function(grp,key,action) {
    var hk, txt = "";
    if( Settings.settings.misc.useHotKeys ) {
      if( typeof(grp) == "string" && Settings.hotKeys[grp] && Settings.hotKeys[grp][key] )
        hk = Settings.hotKeys[grp][key];
      else {
        hk = { keyCode: grp, modifier: key, text: arguments[3] };
      }
      if( hk.keyCode > 0 ) {
        if( typeof( action ) == "string" ) {
          if( arguments.length == 4 )
            HotKeys.hotKeys.push( { key: hk, event: { id: action, event: arguments[3] } } );
          else
            HotKeys.hotKeys.push( { key: hk, href: action } );
        }
        else
          HotKeys.hotKeys.push( { key: hk, func: action } );
        txt = hk.text;
      }
    }
    return txt;
  },
}
var Sounds = {
  doIt : function() {
    var key = isUV ? "attUVAccs" : "attOwnAcc";
    var markers = lib.storage.getValue("markers"+ownPid,{incs:0,report:false,igm:false,forum:false});
    var curIncs = 0;
    if( Settings.sounds[key].active ) {
      var headerInfo = $("header_info");
      if( headerInfo ) {
        var el = headerInfo.rows[0].cells[headerInfo.rows[0].cells.length-1];
        if( /unit\/att\.png/.test(el.innerHTML) ) {
          el = el.getElementsByTagName("table")[1].rows[0];
          curIncs = el.cells[1].textContent.match(/\((\d+)\)/)[1];
          if( curIncs > markers.incs ) {
            Sounds.play(key);
          }
        }
      }
    }
    if( Settings.sounds.attDone.active && curIncs < markers.incs ) {
      Sounds.play("attDone");
    }
    markers.incs = curIncs;
    var row = $("menu_row");
    if( row && Settings.sounds.report.active ) {
      if( /new_report/.test(row.innerHTML) ) {
        if( !markers.report ) {
          Sounds.play("report");
          markers.report = true;
        }
      }
      else if( markers.report )
        markers.report = false;
    }
    if( row && Settings.sounds.igm.active ) {
      if( /new_mail/.test(row.innerHTML) ) {
        if( !markers.igm ) {
          Sounds.play("igm");
          markers.igm = true;
        }
      }
      else if( markers.igm )
        markers.igm = false;
    }
    if( row && Settings.sounds.forum.active ) {
      if( /new_post/.test(row.innerHTML) ) {
        if( !markers.forum ) {
          Sounds.play("forum");
          markers.forum = true;
        }
      }
      else if( markers.forum )
        markers.forum = false;
    }
    if( Settings.sounds.session.active ) {
      if( /input name=\"sid_refresh_password/.test(document.body.innerHTML) || /sid_wrong\.php/.test(document.location.href)) {
        Sounds.play("session");
      }
    }
    if( ownPid )
      lib.storage.setValue("markers"+ownPid,markers);
  },
  play : function(key) {
    var audio = new Audio(); // document.body.appendChild(ce("audio"));
    audio.src = Settings.sounds[key].url;
    audio.volume = Settings.sounds[key].volume/100;
    audio.play();
    if( Settings.sounds[key].loop )
      audio.addEventListener("ended",function() { audio.play(); } ,false);
  },
}
var SLSwitcher = {
  sl : null,
  cell : null,
  span : null,
  moDiv : null,
  doIt : function() {
    SLSwitcher.sl = $("quickbar_outer");
    if( SLSwitcher.sl ) {
      switch( Settings.settings.misc.slSwitcher ) {
        case 1:
          var row = $ ("menu_row");
          SLSwitcher.cell = row.insertCell(-1);
          var a = SLSwitcher.cell.appendChild(ce("a"));
          a.href = "javascript:;";
          a.appendChild(document.createTextNode(texts[lib.lang].gui.slTitle));
          SLSwitcher.span = a.appendChild(ce("span"));
          SLSwitcher.set(lib.storage.getValue("sl"+ownPid,true));
          a.addEventListener("click", SLSwitcher.toggle, false );
          break;
        case 2:
          SLSwitcher.moDiv = SLSwitcher.sl.parentNode.insertBefore(ce("div"),$("header_info"));
          SLSwitcher.moDiv.style.position = "relative";
          SLSwitcher.moDiv.style.width = "200px"; //SLSwitcher.moDiv.parentNode.offsetWidth+"px";
          SLSwitcher.moDiv.style.top = "-2px";
          SLSwitcher.moDiv.style.left = ((SLSwitcher.moDiv.parentNode.offsetWidth-200)/2)+"px";
          SLSwitcher.moDiv.style.height = "4px";
          SLSwitcher.moDiv.style.border = "1px solid rgba(128,64,0,0.4)";
          SLSwitcher.moDiv.style.backgroundColor = "rgba(241,235,221,0.4)";
          SLSwitcher.moDiv.style.display = "none";
          SLSwitcher.moDiv.addEventListener("mouseover", function() { SLSwitcher.show(true); }, false);
          SLSwitcher.show(false);
          break;
      }
    }
  },
  toggle : function(e) {
    var on = !lib.storage.getValue("sl"+ownPid,true);
    SLSwitcher.set(on);
    lib.storage.setValue("sl"+ownPid,on);
  },
  show : function(show) {
    if( show ) {
      SLSwitcher.moDiv.style.display = "none";
      SLSwitcher.sl.style.display = "";
      setTimeout(function(){document.body.addEventListener("mousemove",SLSwitcher.onMouseMove,false)},0);
    }
    else {
      SLSwitcher.sl.style.display = "none";
      SLSwitcher.moDiv.style.display = "";
      document.body.removeEventListener("mousemove",SLSwitcher.onMouseMove,false);
    }
  },
  set : function(on) {
    if( on ) {
      SLSwitcher.span.textContent = String.fromCharCode(9650);
      SLSwitcher.cell.title = texts[lib.lang].gui.slOff;
      SLSwitcher.sl.style.display = "";
    }
    else {
      SLSwitcher.span.textContent = String.fromCharCode(9660);
      SLSwitcher.cell.title = texts[lib.lang].gui.slOn;
      SLSwitcher.sl.style.display = "none";
    }
  },
  onMouseMove: function(e) {
    var el = SLSwitcher.sl;
    var pos = lib.getElementPos(SLSwitcher.sl);
    var y = e.clientY + self.pageYOffset;
    var x = e.clientX + self.pageXOffset;
    if( y < pos[1] || y > pos[1] + SLSwitcher.sl.offsetHeight || x < pos[0] || x > pos[0]+SLSwitcher.sl.offsetWidth) {
      SLSwitcher.show(false);
    }
  }
}
var CoordSelector = {
  ctrlDown : false,
  coordRange : false,
  curElement : null,
  addCoordSpans : function(node) {
    if( node.parentNode.nodeName.toUpperCase() != "TEXTAREA" ) {
      if( node.nodeType == 3 && node.nodeValue ) {
        var res = node.nodeValue.match(/\d{1,3}\|\d{1,3}/g);
        var pos = 0;
        if( res && (res.length > 1 || node.parentNode.firstChild != node) ) {
          var cp = node.nodeValue.indexOf(res[0]);
          var oldValue = node.nodeValue;
          node.nodeValue = node.nodeValue.substr(pos, cp);
          var span = ce('span');
          span.innerHTML = res[0];
          if( node.nextSibling )
            node.parentNode.insertBefore( span, node.nextSibling );
          else
            node.parentNode.appendChild( span );
          var rest = document.createTextNode(oldValue.substr(cp+res[0].length));
          if( span.nextSibling )
            node.parentNode.insertBefore( rest, span.nextSibling );
          else
            node.parentNode.appendChild(rest);
        }
      }
    }
    var child = node.firstChild;
    while (child != null) {
        addCoordSpans(child);
        child = child.nextSibling;
    }
  },
  selectCoords : function(e) {
    if( CoordSelector.ctrlDown ) {
      var el = document.elementFromPoint(e.pageX - document.documentElement.scrollLeft,e.pageY - document.documentElement.scrollTop);
      if( el != CoordSelector.curElement ) {
        var sel = window.getSelection();
        if( CoordSelector.coordRange ) {
          sel.removeAllRanges();
          CoordSelector.coordRange = false;
        }
        CoordSelector.curElement = el;
        el = el.firstChild;
        while( el && el.nodeType != 3 )
          el = el.nextSibling;
        if( el && el.nodeValue ) {
          var res = el.nodeValue.match(/(\d{1,3}\|\d{1,3})/g);
          if( res ) {
            if( res.length == 1 ) {
              var idx = el.nodeValue.indexOf(res[0]);
              var range = document.createRange();
              range.setStart(el,idx);
              range.setEnd(el,idx+res[0].length);
              sel.removeAllRanges();
              sel.addRange(range);
              CoordSelector.coordRange = true;
            }
            else
              CoordSelector.addCoordSpans(curElement);
          }
        }
      }
    }
  },
  keyDown : function(e) {
    if( e.keyCode == 17 )
      CoordSelector.ctrlDown = true;
  },
  keyUp : function(e) {
    if( e.keyCode == 17 ) {
      CoordSelector.ctrlDown = false;
      if( CoordSelector.coordRange ) {
        window.getSelection().removeAllRanges();
        CoordSelector.coordRange = false;
      }
    }
  }
}
var NavBarSwitcher = {
  topBar: null,
  topBarShadow: null,
  topContainer: null,
  menuRow: null,
  footerDiv: null,
  moDiv: null,
  doIt: function() {
    if( Settings.settings.misc.navBarSwitcher ) {
      NavBarSwitcher.moDiv = document.body.appendChild(ce("div"));
      NavBarSwitcher.moDiv.style.position ="fixed";
      NavBarSwitcher.moDiv.style.top = "0px";
      NavBarSwitcher.moDiv.style.left = "0px";
      NavBarSwitcher.moDiv.style.width = "100%";
      NavBarSwitcher.moDiv.style.height = "4px";
      NavBarSwitcher.moDiv.style.zIndex = "10000";
      NavBarSwitcher.moDiv.addEventListener("mouseover", function() { NavBarSwitcher.show(true); }, false);
      
      var footer = $("footer_left");
      NavBarSwitcher.topContainer = $("topContainer");
      NavBarSwitcher.topBar = document.getElementsByClassName("top_bar")[0];
      NavBarSwitcher.shadowBar = document.getElementsByClassName("top_shadow")[0];
      NavBarSwitcher.menuRow =  document.getElementsByClassName("main_layout")[0].rows[0];

      var icons = NavBarSwitcher.topContainer.getElementsByClassName("icon header");
      var before = footer.firstChild;
      var a = footer.insertBefore(ce("a"),before);
      var td = $("topdisplay");
      a.textContent = td.getElementsByClassName("rank")[0].textContent + " - ";
      a.href = td.getElementsByTagName("a")[0].href;
      for( var i = 0; i < icons.length; i++ ) {
        var lnk = getByTagName(icons[i],"a","parentNode"); 
        a = footer.insertBefore(ce("a"),before);
        a.href = lnk.href;
        a.title = lnk.title;
        a.appendChild(icons[i].cloneNode(true));
      }
      if( icons.length > 0 ) 
        footer.insertBefore(document.createTextNode(" - "),before);
      NavBarSwitcher.show(false);
    }
  },
  show : function(show) {
    if( show ) {
      NavBarSwitcher.shadowBar.style.display = "";
      NavBarSwitcher.menuRow.style.display = "";
      NavBarSwitcher.topBar.style.top = "0px";
      document.body.addEventListener("mousemove", NavBarSwitcher.onMouseMove, false);
    }
    else {
      document.body.removeEventListener("mousemove", NavBarSwitcher.onMouseMove, false);
      NavBarSwitcher.shadowBar.style.display = "none";
      NavBarSwitcher.menuRow.style.display = "none";
      NavBarSwitcher.topBar.style.top = "-44px";
    }
  },
  onMouseMove: function(e) {
    var el = e.target;
    if( el != NavBarSwitcher.moDiv && el != NavBarSwitcher.topBar && !isChildOf(el, NavBarSwitcher.topContainer.parentNode.parentNode)) {
      NavBarSwitcher.show(false);
    }
  }
}

var sites = [ { key:"addBuildingInfo", href: 'http://'+location.host+'/help2.php?article=points', linkText: texts[lib.lang].gui.getPoints, visitedText: texts[lib.lang].gui.pointsKnown, siteHandler: Settings.getPointsAndNames } ];
var serverInfo = new lib.ServerInfo("speed,unit_speed,game/base_config,game/tech,snob/max_dist,snob/factor,night/active,night/start_hour,night/end_hour,misc/kill_ranking",true,true,sites);

var buildingKeys = {};
var resKey = {};
var resInfos = { wood: { img: "holz.png", bonus: 1},
                 stone: { img: "lehm.png", bonus: 2 },
                 iron: { img: "eisen.png", bonus: 3} };

if( lib.game_data ) {
  ownPid = parseInt(lib.game_data.player.id,10);
}
if( isUV )
  ownPid = parseInt(lib.params.t,10);

var nofarms = lib.storage.getValue( "nofarms"+ownPid, "");
var useeq = lib.storage.getValue( "useeq"+ownPid, true );

Settings.doIt();
if( lib.game_data ) {
  curVillage = new MyVillage(lib.game_data.village.id);
  coords = lib.game_data.village.coord.split("|");
  if( isNaN(curVillage.coords.x) ) {
    curVillage.coords.x = parseInt(coords[0],10);
    curVillage.coords.y = parseInt(coords[1],10);
    curVillage.save();
  }
}
for( var key in resInfos )
  resKey[texts[lib.lang].resources[key]] = key;
for( var key in serverInfo.addBuildingInfo )
  buildingKeys[serverInfo.addBuildingInfo[key].name] = key;
if( Settings.settings.misc.coordSelector )
  window.addEventListener("mousemove", CoordSelector.selectCoords, false);

run();
showTime();

function run() {
  Sounds.doIt();
  RunTimes.doIt();
  if( !lib.game_data )
    return;
  HotKeys.doIt();
  if( /groups.php/.test(location.href) )
    Groups.modGroupTable("groups");
  if( !lib.hasPA )
    return;

  Common.doIt();
  Storage.doIt();
  Recruitment.doIt();
  Place.doIt();
  Map.doIt();
  Report.doIt();
  InfoVillage.doIt();
  OV.doIt();
  InfoPlayer.doIt();
  Groups.doIt();
  BuildAssist.doIt();
  SLSwitcher.doIt();
  NavBarSwitcher.doIt();
  if( lib.params.screen == "ally" && lib.params.mode == "members" ) {
    var tab = $("ally_content").getElementsByTagName("table")[0];
    var sorter = new TableSorter(tab);
    sorter.addSortColumn(0,compareStringCell);
    sorter.addSortColumn(1,compareNumericCell,1);
    sorter.addSortColumn(3,compareNumericCell);
  }
}
function showTime() {
  var e = $('serverTime');
  if( e ) {
    var span = e.parentNode.appendChild(ce("span"));
    if( msg ) {
      span.style.color = "red";
      span.title = msg;
    }
    span.appendChild(document.createTextNode("DA: " + (new Date().getTime()-start) + "ms"));
  }
}

function cleanUp() {
  var last = lib.storage.getValue("lastcleanup",0);
  var ts = lib.getTime();
  if( ts - last > 3600 ) {
    lib.storage.setValue( "lastcleanup", ts );
    atts = doCleanUp("atts", ts - Settings.settings.place.maxAttAge * 3600);
    doCleanUp("rids", ts - Settings.settings.misc.reportMaxAge * 86400);
    doCleanUp("beute", ts - Settings.settings.map.sumHours * 3600);
    var keys = lib.storage.listValues("^vil\\d+$");
    for( var i = 0; i < keys.length; i++ ) {
      village = new MyVillage(keys[i].input.substring(3));
      if( village.units.timestamp == 0 && village.res.timestamp == 0 && village.map.timestamp == 0 )
        lib.storage.deleteValue(keys[i]);
    }
  }
}
function doCleanUp(key,minTS) {
  var data = lib.storage.getValue(key);
  var newData = "";
  if( data ) {
    lib.debug.log( "cleanUp "+"" + key + ": " + minTS );
    data = data.split(";");
    var del = 0;
    for( var i = 0; i < data.length; i++ ) {
      var parts = data[i].split(",");
      if( parseInt(parts[0],10) > minTS )
        newData += data[i] + ";";
      else
        del++;
    }
    lib.debug.log( del + "/" + data.length + " deleted" );
  }
  lib.storage.setValue(key,newData);
  return newData;
}
function clearAllInfos() {
  if( confirm( texts[lib.lang].gui.confirm_delAll ) ) {
    lib.storage.clear();
    alert( texts[lib.lang].gui.allDataDeleted );
  }
}
function deleteVillageInfos(coords) {
  lib.storage.deleteValue(coords);
  atts = lib.storage.getValue("atts", "").replace(new RegExp("\\d+,\\d+,"+coords+"\\d+;","g"), "");
  lib.storage.setValue("atts",atts);
  nofarms = lib.storage.getValue("nofarms"+ownPid,"").replace(new RegExp(coords+";","g"), "");
  lib.storage.setValue("nofarms"+ownPid,nofarms);
}

function isOneOf(val) {
  if( arguments.length > 1 )  {
    for( var i = 1; i < arguments.length; i++ )
      if( arguments[i] == val )
        return true;
  }
  return false;
}
function compareStringCell(a,b) {
  return compare(a.textContent,b.textContent);
}
function compareNumericCell(a,b) {
  var a = parseFloat(a.innerHTML.replace(/<[^>]+>|\./g, ""));
  var b = parseFloat(b.innerHTML.replace(/<[^>]+>|\./g, ""));
  return compare(a,b);
}
function compareOrderCell(a,b) {
  return parseInt(a.getAttribute("dsfm_order"))-parseInt(b.getAttribute("dsfm_order"));
}
function compareTimeCell(a,b) {
  return texts[lib.lang].locale.timeStr2Sec(a.innerHTML) - texts[lib.lang].locale.timeStr2Sec(b.innerHTML);
}
function compare(a,b) {
  if( a > b )
    return 1;
  else if( a < b )
    return -1;
  return 0;
}

function getBuildingsTab(buildings, change, katas ) {
  var rows = ['','','',''];
  var colidx = 0;
  var i = 0;
  for( var key in serverInfo.addBuildingInfo ) {
    if( buildings[key].level > 0 ) {
      rows[0] += '<td style="background-color:'+colBgColor[colidx]+'; text-align:center; width:25px"><img src="graphic/buildings/'+key.replace("_f1","")+'.png"/></td>';
      rows[1] += '<td style="background-color:'+colBgColor[colidx]+'; text-align:center;">'+buildings[key].level+'</td>';
      rows[2] += '<td style="background-color:'+colBgColor[colidx]+'; text-align:center; color:';
      if( isNaN(buildings[key].change))
        rows[2] += 'grey;">---';
      else if( buildings[key].change < 0 )
        rows[2] += 'red;">' + buildings[key].change;
      else if(buildings[key].change > 0 )
        rows[2] += 'green;">+' + buildings[key].change;
      else
        rows[2] += 'grey;">0';
      rows[2] += '</td>';
      rows[3] += '<td style="background-color:'+colBgColor[colidx]+'; text-align:center;">'+Place.katasNeeded.destroy[buildings[key].level]+'</td>';
      colidx ^= 1;
    }
  }
  var html = '<table cellspacing="0" style="border: 1px solid rgb(222, 211, 185);"><tr>'+rows[0]+'<td/></tr><tr>'+rows[1];
  if( change || katas )
    html += '<td>'+texts[lib.lang].gui.level+'</td>';
  if(change)
    html += '</tr><tr>'+rows[2]+'<td><b style="color: green">+</b><b style="color:red">-</b></td>';

  if(katas)
    html += '</tr><tr>'+rows[3]+'<td><img src="graphic/unit/unit_catapult.png" border="0" alt'+texts[lib.lang].gui.catas+'"/></td>';
  html += '</tr></table>';
  return html;
}
function getUnitsTab(units) {
  if( typeof(units["spear"]) == "undefined" )
    return "Keine";

  var colidx = 0;
  var row = ["",""];
  for( var key in serverInfo.unitInfo ) {
    if( units[key] > 0 ) {
      row[0] += '<td style="background-color:'+colBgColor[colidx]+'; text-align:center"><img src="graphic/unit/unit_'+key+'.png" border="0"/></td>';
      row[1] += '<td style="background-color:'+colBgColor[colidx]+'; text-align:center">'+units[key]+'</td>';
      colidx ^= 1;
    }
  }
  return '<table cellspacing="0" style="border: 1px solid rgb(222, 211, 185);"><tr>'+row[0]+'</tr><tr>'+row[1]+'</tr></table>';
}
function showReportAge(ts, key) {
  var span = $( "dsfm_"+key+"_age" );
  span.style.display = "none";
  if( Settings.settings.popup.showReportAge ) {
    var age = (lib.getTime() - ts);
    if( age / 3600 > Settings.settings.popup.minReportAge ) {
      var str = "";
      var val = Math.floor(age / 86400);
      if( val > 0 )
        str += val + " " + texts[lib.lang].gui.days[val==1?0:1] + " ";
      age %= 86400;
      if( age > 0 ) {
        val = Math.floor(age / 3600);
        if( val > 0 )
          str += val + texts[lib.lang].gui.hours + " ";
        age %= 3600;
        if( age > 0 ) {
          val = Math.floor(age / 60);
          if( val > 0 )
            str += val + texts[lib.lang].gui.minutes;
        }
      }
      span.innerHTML = texts[lib.lang].gui.age + ": " + str;
      span.style.display="";
    }
  }
}
function createPrioLinks(tab,headlines,footlines,col,noCounter) {
  var order = 1;
  for( var i = headlines; i < tab.rows.length - footlines; i++ ) {
    var cell = tab.rows[i].cells[col];
    if( !noCounter )
      cell.innerHTML = order + " ";
    if( order > 1 ) {
      var a = cell.appendChild(ce("a"));
      a.href = "javascript:;";
      a.innerHTML = '<img src="graphic/map/map_n.png" border="0" alt="+" title="'+texts[lib.lang].gui.higherPrio+'"/>';
      a.addEventListener("click", function(e) { moveTabRow(e,-1,col); }, false );
//      input.addEventListener("click", function(e) { reorderTable(this.parentNode.parentNode, -1, col); }, false );
    }
    if( order < tab.rows.length-headlines-footlines ) {
      var a = cell.appendChild(ce("a"));
      a.href = "javascript:;";
      a.innerHTML = '<img src="graphic/map/map_s.png" border="0" alt="-" title="'+texts[lib.lang].gui.lowerPrio+'"/>';
      a.addEventListener("click", function(e) { moveTabRow(e, 1, col); }, false );
    }
    order++;
  }
}
function moveTabRow(e,dir,prioCol) {
  var a = e.target.parentNode.parentNode.parentNode;
  var b = dir == 1 ? a.nextSibling :  a.previousSibling;
  for( var i = 0; i < a.cells.length; i++ ) {
    if( i != prioCol ) {
      var tmp = a.cells[i];
      a.replaceChild(b.cells[i],tmp);
      b.insertCell(i);
      b.replaceChild(tmp,b.cells[i]);
    }
  }
}

function $(id) {
  return document.getElementById(id);
}
function ce(name) {
  return document.createElement(name);
}
function getByTagName(node,nodeName,what,count) {
  if( typeof count == "undefined" )
    count = 1;
  nodeName = nodeName.toUpperCase();
  node = node[what];
  if( what == "firstChild" )
    what = "nextSibling";
  else if( what == "lastChild" )
    what = "previousSibling";
  while( node && node.nodeName.toUpperCase() != nodeName )
    node = node[what];
  if( count == 1 )
    return node;
  else
    return getByTagName(node,nodeName,what,count-1);
}
function isChildOf(child,parent) {
  do {
    child = child.parentNode;
  } while( child != document.body && child != parent );
  return child == parent;
}

function escapeHTML(str,sep) {
  var ret = "";
  if ( str ) {
    if ( !sep ) sep ="";
    for(var i = 0; i < str.length; i++) {
      var c = str.charAt(i);
      switch (c) {
        case '&':
          ret += "&amp;";
          break;
        case '<':
          ret += "&lt;";
          break;
        case '>':
          ret += "&gt;";
          break;
        default:
          ret += c+sep;
      }
    }
  }
  return ret;
}
function outerHTML(el,display) {
  var html = "<" + el.nodeName;
  var style = false;
  for( var i = 0; i < el.attributes.length; i++ ) {
    var val = el.attributes[i].value;
    if( arguments.length == 2 && el.attributes[i].name == "style" ) {
      if( /display/.test(val) )
        val = val.replace(/display:\s*[^;]+;/,"display:"+arguments[1]+";");
      else
        val += " display:" + arguments[1] + ";";
      style = true;
    }
    html += " " + el.attributes[i].name + '="' + val + '"';
  }
  if( !style && arguments.length == 2 )
    html += ' style="display:' + display +';"';
  html += ">" + el.innerHTML + "</" + el.nodeName +">";
  return html;
}
function unwrap(obj) {
  return (obj && obj.wrappedJSObject) ? obj.wrappedJSObject : obj;
}

function bindColorPicker() {
  var matchClass = new RegExp('(^|\\s)(dsfm_color)\\s*(\\{[^}]*\\})?', 'i');
  var e = document.getElementsByTagName('input');
  for(var i=0; i<e.length; i+=1) {
    var m;
    if(!e[i].color && e[i].className && (m = e[i].className.match(matchClass))) {
      var prop = {};
      if(m[3]) {
        try {
          eval('prop='+m[3]);
        } catch(eInvalidProp) {}
      }
      e[i].color = new ColorPicker(e[i], prop);
    }
  }
}
// ColorPicker based on jscolor from http://jscolor.com
function ColorPicker(target, prop) {
  var THIS = this;
  this.images = { pad : [ 181, 101 ], sld : [ 16, 101 ], cross : [ 15, 15 ], arrow : [ 7, 11 ] };
  this.required = true; // refuse empty values?
  this.adjust = true; // adjust value to uniform notation?
  this.hash = true; // prefix color with # symbol?
  this.caps = true; // uppercase?
  this.valueElement = target; // value holder
  this.styleElement = target; // where to reflect current color
  this.hsv = [0, 0, 1]; // read-only  0-6, 0-1, 0-1
  this.rgb = [1, 1, 1]; // read-only  0-1, 0-1, 0-1
  this.pickerOnfocus = true; // display picker on focus?
  this.pickerMode = 'HSV'; // HSV | HVS
  this.pickerPosition = 'bottom'; // left | right | top | bottom
  this.pickerFace = 10; // px
  this.pickerFaceColor = '#F7EED3'; // CSS color
  this.pickerBorder = 2; // px
  this.pickerBorderColor = '#804000'; // CSS color
  this.pickerInset = 1; // px
  this.pickerInsetColor = 'ThreeDShadow ThreeDHighlight ThreeDHighlight ThreeDShadow'; // CSS color
  this.pickerZIndex = 10000;
  this.picker = null;
  for(var p in prop) {
    if(prop.hasOwnProperty(p)) {
      this[p] = prop[p];
    }
  }
  this.hidePicker = function() {
    if(isPickerOwner()) {
      removePicker();
    }
  };
  this.showPicker = function() {
    if(!isPickerOwner()) {
      var tp = lib.getElementPos(target); // target pos
      var ts = [target.offsetWidth, target.offsetHeight]
      var vp = [window.pageXOffset, window.pageYOffset]; // view pos
      var vs = [window.innerWidth, window.innerHeight]; // view size
      var ps = [ // picker size
        2*this.pickerBorder + 4*this.pickerInset + 2*this.pickerFace + THIS.images.pad[0] + 2*THIS.images.arrow[0] + THIS.images.sld[0],
        2*this.pickerBorder + 2*this.pickerInset + 2*this.pickerFace + THIS.images.pad[1]
      ];
      var a, b, c;
      switch(this.pickerPosition.toLowerCase()) {
        case 'left': a=1; b=0; c=-1; break;
        case 'right':a=1; b=0; c=1; break;
        case 'top':  a=0; b=1; c=-1; break;
        default:     a=0; b=1; c=1; break;
      }
      var l = (ts[b]+ps[b])/2;
      var pp = [ // picker pos
        -vp[a]+tp[a]+ps[a] > vs[a] ?
          (-vp[a]+tp[a]+ts[a]/2 > vs[a]/2 && tp[a]+ts[a]-ps[a] >= 0 ? tp[a]+ts[a]-ps[a] : tp[a]) :
          tp[a],
        -vp[b]+tp[b]+ts[b]+ps[b]-l+l*c > vs[b] ?
          (-vp[b]+tp[b]+ts[b]/2 > vs[b]/2 && tp[b]+ts[b]-l-l*c >= 0 ? tp[b]+ts[b]-l-l*c : tp[b]+ts[b]-l+l*c) :
          (tp[b]+ts[b]-l+l*c >= 0 ? tp[b]+ts[b]-l+l*c : tp[b]+ts[b]-l-l*c)
      ];
      drawPicker(pp[a], pp[b]);
    }
  };
  this.importColor = function() {
    if(!THIS.valueElement) {
      this.exportColor();
    } else {
      if(!this.adjust) {
        if(!this.fromString(THIS.valueElement.value, leaveValue)) {
          THIS.styleElement.style.backgroundColor = THIS.styleElement.jscStyle.backgroundColor;
          THIS.styleElement.style.color = THIS.styleElement.jscStyle.color;
          this.exportColor(leaveValue | leaveStyle);
        }
      } else if(!this.required && /^\s*$/.test(THIS.valueElement.value)) {
        THIS.valueElement.value = '';
        THIS.styleElement.style.backgroundColor = THIS.styleElement.jscStyle.backgroundColor;
        THIS.styleElement.style.color = THIS.styleElement.jscStyle.color;
        this.exportColor(leaveValue | leaveStyle);
      } else if(this.fromString(THIS.valueElement.value)) {
        // OK
      } else {
        this.exportColor();
      }
    }
  };
  this.exportColor = function(flags) {
    if(!(flags & leaveValue) && THIS.valueElement) {
      var value = this.toString();
      if(this.caps) { value = value.toUpperCase(); }
      if(this.hash) { value = '#'+value; }
      THIS.valueElement.value = value;
    }
    if(!(flags & leaveStyle) && THIS.styleElement) {
      THIS.styleElement.style.backgroundColor =
        '#'+this.toString();
      THIS.styleElement.style.color =
        0.213 * this.rgb[0] +
        0.715 * this.rgb[1] +
        0.072 * this.rgb[2]
        < 0.5 ? '#FFF' : '#000';
    }
    if(!(flags & leavePad) && isPickerOwner()) {
      redrawPad();
    }
    if(!(flags & leaveSld) && isPickerOwner()) {
      redrawSld();
    }
  };
  this.fromHSV = function(h, s, v, flags) { // null = don't change
    h<0 && (h=0) || h>6 && (h=6);
    s<0 && (s=0) || s>1 && (s=1);
    v<0 && (v=0) || v>1 && (v=1);
    this.rgb = HSV_RGB(
      h===null ? this.hsv[0] : (this.hsv[0]=h),
      s===null ? this.hsv[1] : (this.hsv[1]=s),
      v===null ? this.hsv[2] : (this.hsv[2]=v)
    );
    this.exportColor(flags);
  };
  this.fromRGB = function(r, g, b, flags) { // null = don't change
    r<0 && (r=0) || r>1 && (r=1);
    g<0 && (g=0) || g>1 && (g=1);
    b<0 && (b=0) || b>1 && (b=1);
    var hsv = RGB_HSV(
      r===null ? this.rgb[0] : (this.rgb[0]=r),
      g===null ? this.rgb[1] : (this.rgb[1]=g),
      b===null ? this.rgb[2] : (this.rgb[2]=b)
    );
    if(hsv[0] !== null) {
      this.hsv[0] = hsv[0];
    }
    if(hsv[2] !== 0) {
      this.hsv[1] = hsv[1];
    }
    this.hsv[2] = hsv[2];
    this.exportColor(flags);
  };
  this.fromString = function(hex, flags) {
    var m = hex.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i);
    if(!m) {
      return false;
    } else {
      if(m[1].length === 6) { // 6-char notation
        this.fromRGB(
          parseInt(m[1].substr(0,2),16) / 255,
          parseInt(m[1].substr(2,2),16) / 255,
          parseInt(m[1].substr(4,2),16) / 255,
          flags
        );
      } else { // 3-char notation
        this.fromRGB(
          parseInt(m[1].charAt(0)+m[1].charAt(0),16) / 255,
          parseInt(m[1].charAt(1)+m[1].charAt(1),16) / 255,
          parseInt(m[1].charAt(2)+m[1].charAt(2),16) / 255,
          flags
        );
      }
      return true;
    }
  };
  this.toString = function() {
    return (
      (0x100 | Math.round(255*this.rgb[0])).toString(16).substr(1) +
      (0x100 | Math.round(255*this.rgb[1])).toString(16).substr(1) +
      (0x100 | Math.round(255*this.rgb[2])).toString(16).substr(1)
    );
  };
  function RGB_HSV(r, g, b) {
    var n = Math.min(Math.min(r,g),b);
    var v = Math.max(Math.max(r,g),b);
    var m = v - n;
    if(m === 0) { return [ null, 0, v ]; }
    var h = r===n ? 3+(b-g)/m : (g===n ? 5+(r-b)/m : 1+(g-r)/m);
    return [ h===6?0:h, m/v, v ];
  }
  function HSV_RGB(h, s, v) {
    if(h === null) { return [ v, v, v ]; }
    var i = Math.floor(h);
    var f = i%2 ? h-i : 1-(h-i);
    var m = v * (1 - s);
    var n = v * (1 - s*f);
    switch(i) {
      case 6:
      case 0: return [v,n,m];
      case 1: return [n,v,m];
      case 2: return [m,v,n];
      case 3: return [m,n,v];
      case 4: return [n,m,v];
      case 5: return [v,m,n];
    }
  }
  function removePicker() {
    delete THIS.picker.owner;
    document.getElementsByTagName('body')[0].removeChild(THIS.picker.boxB);
  }
  function drawPicker(x, y) {
    if(!THIS.picker) {
      THIS.picker = {
        box : ce('div'),
        boxB : ce('div'),
        pad : ce('div'),
        padB : ce('div'),
        padM : ce('div'),
        sld : ce('div'),
        sldB : ce('div'),
        sldM : ce('div')
      };
      for(var i=0,segSize=4; i<THIS.images.sld[1]; i+=segSize) {
        var seg = ce('div');
        seg.style.height = segSize+'px';
        seg.style.fontSize = '1px';
        seg.style.lineHeight = '0';
        THIS.picker.sld.appendChild(seg);
      }
      THIS.picker.sldB.appendChild(THIS.picker.sld);
      THIS.picker.box.appendChild(THIS.picker.sldB);
      THIS.picker.box.appendChild(THIS.picker.sldM);
      THIS.picker.padB.appendChild(THIS.picker.pad);
      THIS.picker.box.appendChild(THIS.picker.padB);
      THIS.picker.box.appendChild(THIS.picker.padM);
      THIS.picker.boxB.appendChild(THIS.picker.box);
    }
    var p = THIS.picker;
    // recompute controls positions
    posPad = [
      x+THIS.pickerBorder+THIS.pickerFace+THIS.pickerInset,
      y+THIS.pickerBorder+THIS.pickerFace+THIS.pickerInset ];
    posSld = [
      null,
      y+THIS.pickerBorder+THIS.pickerFace+THIS.pickerInset ];
    // controls interaction

    p.box.addEventListener( "mouseup", function() { target.focus(); }, false );
    p.box.addEventListener( "mouseout", function() { target.focus(); }, false );
    p.box.addEventListener( "mousedown", function() { abortBlur=true; } , false );
    p.box.addEventListener( "mousemove", function(e) { holdPad && setPad(e); holdSld && setSld(e); }, false );
    p.padM.addEventListener( "mouseup", function() { if(holdPad) { holdPad=false; lib.fireEvent(THIS.valueElement,'change'); } }, false )
    p.padM.addEventListener( "mouseout", function() { if(holdPad) { holdPad=false; lib.fireEvent(THIS.valueElement,'change'); } }, false );
    p.padM.addEventListener( "mousedown", function(e) { holdPad=true; setPad(e); }, false );

    p.sldM.addEventListener( "mouseup", function() { if(holdSld) { holdSld=false; lib.fireEvent(THIS.valueElement,'change'); } }, false );
    p.sldM.addEventListener( "mouseout", function() { if(holdSld) { holdSld=false; lib.fireEvent(THIS.valueElement,'change'); } }, false );
    p.sldM.addEventListener( "mousedown", function(e) { holdSld=true; setSld(e); }, false );
    // picker
    p.box.style.width = 4*THIS.pickerInset + 2*THIS.pickerFace + THIS.images.pad[0] + 2*THIS.images.arrow[0] + THIS.images.sld[0] + 'px';
    p.box.style.height = 2*THIS.pickerInset + 2*THIS.pickerFace + THIS.images.pad[1] + 'px';
    // picker border
    p.boxB.style.position = 'absolute';
    p.boxB.style.clear = 'both';
    p.boxB.style.left = x+'px';
    p.boxB.style.top = y+'px';
    p.boxB.style.zIndex = THIS.pickerZIndex;
    p.boxB.style.border = THIS.pickerBorder+'px solid';
    p.boxB.style.borderColor = THIS.pickerBorderColor;
    p.boxB.style.background = THIS.pickerFaceColor;
    // pad image
    p.pad.style.width = THIS.images.pad[0]+'px';
    p.pad.style.height = THIS.images.pad[1]+'px';
    // pad border
    p.padB.style.position = 'absolute';
    p.padB.style.left = THIS.pickerFace+'px';
    p.padB.style.top = THIS.pickerFace+'px';
    p.padB.style.border = THIS.pickerInset+'px solid';
    p.padB.style.borderColor = THIS.pickerInsetColor;
    // pad mouse area
    p.padM.style.position = 'absolute';
    p.padM.style.left = '0';
    p.padM.style.top = '0';
    p.padM.style.width = THIS.pickerFace + 2*THIS.pickerInset + THIS.images.pad[0] + THIS.images.arrow[0] + 'px';
    p.padM.style.height = p.box.style.height;
    p.padM.style.cursor = 'crosshair';
    // slider image
    p.sld.style.overflow = 'hidden';
    p.sld.style.width = THIS.images.sld[0]+'px';
    p.sld.style.height = THIS.images.sld[1]+'px';
    // slider border
    p.sldB.style.position = 'absolute';
    p.sldB.style.right = THIS.pickerFace+'px';
    p.sldB.style.top = THIS.pickerFace+'px';
    p.sldB.style.border = THIS.pickerInset+'px solid';
    p.sldB.style.borderColor = THIS.pickerInsetColor;
    // slider mouse area
    p.sldM.style.position = 'absolute';
    p.sldM.style.right = '0';
    p.sldM.style.top = '0';
    p.sldM.style.width = THIS.images.sld[0] + THIS.images.arrow[0] + THIS.pickerFace + 2*THIS.pickerInset + 'px';
    p.sldM.style.height = p.box.style.height;
    try {
      p.sldM.style.cursor = 'pointer';
    } catch(eOldIE) {
      p.sldM.style.cursor = 'hand';
    }
    // load images in optimal order
    switch(modeID) {
      case 0:
        p.pad.style.background = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALUAAABlCAIAAACEDzXRAAAKQ0lEQVR42u2d23IjKwxFBeRh5v8/9uQlzXlI2gGELoCEm6pxubp6PI69WoV3C20uIQPAH4A/AH/p41/pDcTxP4BPGDtq3vYJGPpv8craeRdo/fyTI8ZhHnodOGgcV/3rnx8QI0SABO2xfAbiCfVR8Wj+CD8jenbRJNyGOxLoAaH1iLu4EUEHAv1+MsQ4zLE4AiIOcpibv4u9OET6+cP4ASnJ1JH4/G60A9km+GbBxLlpKAkADoR2JnaBrvWD/x1GCZn9EYLEHqVfI6Efx0D7E9tDF/rBSJ54l8FqTUse0J+EvxPrdK0fD4aOLXQi7zyGxMaRvvWjjH2U8o9I44OKnf+wyCpHoR/Phk6d/COq8481YrNI3/qR2B+kMl1Fl6J8o/JrU/GEA6HdiB2ha/0YBVx7rFwNHAj9JuIl6EI/qKyJug4Yvg7xA0QEpB8nQe8itoQu9EOT8M3mTsqUSUzykH6cBO1PbA9d91+ShDzV9xrtcgW21IT6L0yfcS90FKCdw+wS6Q9ISWjVfLTVVT2mdiPGGRduFKWm7dBStWlLmI0j/QExdgp7gT5qCu2BLKiLqtc94hI7PB8auQP4KuyIvSJ960fUqXWcd2F48Khr1bHSj2dDp/afmg7tMrFxpG/9mHMFuqrH3spFw0s0Bgr9OAzamdgFutaPpMuqo6WVEXWJdSL14xhof2J76MKfS2yXWGOVB1WXXGOVdxFSx587CXoLsTE0689RH7VW4RMLeKI9wPpzz4XeS2wDzdbXR52AWStjwiSAA6HdiB2h1f6cqT0whzzuzz0LejuxATTy90Xt40v7CzdGRvKS4O/zQ0AiXaRW5x/dv4vS4A/a308LYR5pFquRRvlHIrKWoCj5woCVId4eR/KPNDjURg2tdEC7rSQN5B9DYR70X5YivVxft7AyrOvrD4V2JnaBJurr+qpemLEywlRhT6qvPx16C7ExdK0fSjcj0maAzsqgBt7rfIxGP46B9iT2gi70I842bNj0U4wd/WAG/L5VP3p0W4iNoYv6Oh6eoJmSMW5laIzF8iT1TtgeV9RZoZ7QvdEUzsQu0CP+HOMKDFoZvDFg6s89CNqf2B5a4e8Hts84W0pgeohBtspBXYp8H3Tk/H23MBtHuvbn5mp7dlU9TUkP+XNJMabzHdCIbnuYDSItzZ+bdgUWrAwNPhwInRxw1/wXuYGj+4vo7flboRpjEQ6EjgojYK9/K04NFfNTauEBypXQWQLAfqQoHl9CfvpQ6C3ExtC9/q2YW2u6X1JWzfsYFPKX3L99LrQ/sT10XR+jKh+UN2AxlDOyXfLQaxxf/fkvT4d2JnaBZv258M6h4IFu2Em7/sezoLcQG0Mjfy6xrqLnVBLGWHw1i69WP5LCCn0TNEL3DLNXpCV/n5oo5jAVLY5Em6i8Pwm6uSNuCrNxpNX+nDira20qqyZriv384xhoZ2IX6Lr/wg8eiwpXYGQqPEgjsBrX+er3X46B9ie2h6bX/4i6IfcLS2mIY++7TfoCuLj6hwgN89CwBJ3Gx8rOVsn0kQ48tDS/4X1L8SzMb3BbkGdtwsD05AbP9YOU8xui+uljZei/P/3qx2HQbsSO0Ar/lveHLZYCVK4GeN1P5N+eAb2R2Aya9ueUY+8dlhLtdhWvgfEfz4AeGf9hR2wcaeTPpacvRdzLTx8J/Qq1Ij995PrJ3/mp0p8LO5YyF0s215g/9yxoZ2IXaLo+FiwtgTlvIAznp4+G3khsBk3Pf5mYvqOwMqZnNnw3i9cRDoT2JPaCZuvreskDuXkHxfQMvfbBgdBbiI2hC/3QLCg6lESZZkrfJ7nSj3gWNEMcRkYJsf5L0BXENBl1WV8/aquMLM9/eSJ0UtxZmFGGg4MigZ75ovHnvsOcUX09zRbzjCrU/K/Rev0gT2i2vu4cZrNI1+sH2e49Yb3lRC6e9fSS9ETohjj7hdkx0rQ/57/rxIrhBQdCv494Hlrtz1lo30Qjz1z+cRh02ndTNIMm1j8NxtmePs+76i+/esJHrH/6dGh/YntoRf9l2RtQWgJXzY4bdtbqx0OhnYldoHv7I79jf4+rOGGaRWr14yToLcTG0Ky/v32rjAsdX9S5vgI4ENqT2Asa7Z/9vq0yStiGNNVHkOe/RGmqwBQ0jEDHFpoJ85BLN+jPaRoHGWl2/2yx3msxVRHjZ0Td4GfV/Bf9bCM1dBiBfrHeJ1HR6dKEedDf5yPdBLilp/efC3Ribb1VxlUHGQe8iTb0598+Hdqf2B6a3b9SOerezsoIBWaJ3IBn1fp0j4PeQmwMzc5/idLK3UZWRkmKX2zA4Vc/DoPeSGwGrdvfY24RpKmVjrLuCQdCuxE7Qkv64TZ3Z44dVPrxUOh3EK9C1/lHGpz7ZzpVsYTF7K8Hyj+Ogd5FbAk9uL9H9LIyYg821sjo13gYtD+xPbRU/9Ds/b1sZTTIr5OStMGHA6GdiV2gUf2UmQcfJdUbXOoe6HoN1A0b2uQD4EBosXJqQTwKnXvXAEX+oZlfGaS9ewetDGCLeV1exH4e9Mr+2TDpv2iggYFW+LdBsTbngv/yUroGH0jleEX7MOgtxMbQ7PzKoMuajKyM8pYIiB194HnQzsQu0Gp/LvpulVHylsgK/TgG2p/YHrqXf6T3bJUBhfxFWUDPg95CbAytm/+ycasM9WOxWu0PnTniLWE2iLRi/4Z3bJXRvY76s0+Arl93I3aMNOHPBce2PdSkL7Kpnwe9l9gGutCPoFgkUtytXAGbex0vKCznSOs00o+ToLcQG0N/QErCrG6jrTIynVUDwo896vCzssPrNnAYtD+xPfR9fwmKeu/CVhm5OAn1STPkvhxBW1KXjeP60Y/DoJ2JXaAL/RCPy+PXc80L9d7OV294dVPbC/fb4EDoLcTG0IV+TCDrrIxMHIFg512BWj9OgvYk9oK+9SMoZG55q/JMiGS40/sLjacu28T3MVfd0Aha+u3QJXr+0Q//MBtHutaPQOzh3H0RBoZS5OJ/MjqJ9x2vQb7qgSuvX0StH0+FLptzrvTDh9gl0oV+iAbi2lAsqNmbK3yBAyLNdbRzW8Y6Btqf2B76A2IURE2zZY16KGfZlwqofJSL4feABka+xCNX+ekx0LuILaFr/Zit7s4ZA7y5Qg2sDr/t4zDodxCvQt/6occctDKGriMPzH85D9qN2BG61g/QwcLSVDSGl78C6LePY6A3EptBf0BKcjWWH/GqyJqoxKnMufEVBLJxAJwJ7U9sDH3fX0CxnIB4orMyuilTyRh6g+0bfDgQ2p/YHrrQD+jV6qb/SdRrMit8TRWwyEabxgFwJrQnsQt0rR+LR3VqFNiGHRBv73ge9EZiM+haPyicuRcVmIxzAMTMl9wfi3sGtBuxF3ShH92C29yJTteU+ohbRrZk3Qe9hdgY+tYPnOqanA+mTN33ZGKE06HQbsQu0LV+MF8+94rU5dK8B8/KyJaI+6D9ie2hC/3Q12QnSnYLn5p9P/6d0D7EltAh5wz/Hv8exON/LUjHOuz5CksAAAAASUVORK5CYII=') 0 0 no-repeat";
        break;
      case 1:
        p.pad.style.background = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALUAAABlCAIAAACEDzXRAAAK+ElEQVR42u2d7ZLkrA2FD55N5d2q3P+tZv8A+fFu92JAXyD1mCRdXS6Pd7bnsQqrhY4EqQL4C/gL+Ekff0q/QBz/DfyC7aj5tV8YoX82V/bOp0D757844tHMpuvgoEe76q//+pExe9X7scyO3TtPjtPL3bv74Dr8cd2r/X/tu9zPp/T5ds7gtp8xfnyH0BmTJQZhh6mlR5NLNi4zm5Th709M3oyPytq5DoOjStRZRi6EUabWrtxAPgY6gBgIg/5RMBvpDH6RnsaGk/cZhX4Ix+ewcp7jMGhvYiAMevh+qQP+lL1I7q95FMsMv8689Qg+emvWVXtDlyjoHeLcEwNhlr77D9DIhcAfzNteoZALwVtodnUI4gqdY6HXiEd7IszSPzIzgKs6UhoN/noUM7gHkr8JdrSfBx1GDIRBE/6DH+TqG1qm236dB70zbhAGPZvfUuELRVrJsZ3ZSSJ1E1ix/HnQfsRAGPQwf9FETWKQd38UNQHfRrR3HrQ3MRAGPeQ/9LOuyqaa7lOBLPGuzhYXoMs6dHGADjAzEGbp2fyWYhftPORuihQyMeBSZmwZuq5DVzdoVzMDYZZ+fb/U2ZHP7VE2b1J5Y1aP+QAmq0ek28+DdiEeJYvZNR9o2n9AQc3PyjP3j0UBDrP/OAZ6h3i8Ad2EdgW6iU+rTiFQagOvR3FNEpi6PCn+OAM6gBgIg777DyZ2KrrYOs8fxawLqYuz/vJQaG9iIAx6yI9Vi1Q+Hd65l7oy++saqbxqUwnHQLsSA2HQRP0HFDk8USHIshggpvo8kpCPhvYgBsKgfxS9MGDXCbxkgA395UHQYcRAGDTtP7BKbZS6vAWN86C3iZX63Ao0HX8wcy/G66n1/SoVJmBRygAtZVTVFFcZ6hU2Q70XNPFmzoK+nx0tTcxfNLm9QiSZFPVBVRIGYNNfxG9zZpRYoKtOzVBXnq6Z2Rh/bFnaor98Nr/upL88DjqAeDO/zuovhREG6lJuj01V61N6dVF/OQPalVhZn7wC/fIfVToWs45BtQqIHybisGrGo6FjiKn+Bgdou/+w+D69y/sm/5Fl6Pws/zGlQxg0EX+IuZvxJE9OqH+pdMPRdEKg1l+gG9FsQUVRNEdp6mx0+osHMRAGzfa/8NqAn9TFSAJ2/eUAaG9ivT5nhib6X/iSSGVuL2tTepraSEv+4wDoHeIs6PvZEZqtX7dm9XKfx5tdMyT2XPOnz4XeSZ4O+txaCpWvX68B2oCuFe3j+ssedNmCrgHQUn5s19Ib+q1CWxSbFD+u3+5BV39o5WjgJVyEWZqt/wDbkye6vy+bvyusmqGWMs6AdiUGwqDZ+rGqm+KO1F/CVFEzud2Yvzwd2ptY7H9Zh1bXnxZ2Vl5n1F/azMcoDDjVnz4ROoAYCIPerl+v9NjOqlUpvqN+/fuhXYmV63/s1K/rGzOqQjj6uj2KeSO/7tT/8hRoF+KGtfMf/LpYK9D2/jlGfu68Xp4n1wv9SWH9c4+D3iG2+I9daCL+qIrEjRhbf6n0ObGla7v/9lnQAcRAGPQwfxG1AbGE7JpMBcTiMVESMPbvPxramxgIg57l103JPCpwurhUQp2x79X8Kutm96D5JBNs0HozV4EYCLM0W7+un6TvSV1PWoonbyXXY6C3+2831w/ybcZoxna2/I8w/eUp0GHEQBi0Zf1C5WqA1+tdBFVR8xe21y98NLQTsajfrkNvrH9adl21UnV2Xf/0KdA7xPk1LHT1H1vQrusnv8FfwzsTqYQnrZ/8DdCO6ydff75fotdP1i8MLmZtLoPUJbYaOa2//hToAGKlPrcCTccfenmg2kK96qm8nA3tRAyEQRP9L2stO2/e11HcdWJtbSydeZ8IHUMMhEET/S/wcX/7/g6qB/I8aFdiIAz6Hn8ou3Y0UZP0VV43lueUusiXWJH++I8C1SqoS9BKMxddOE3EH5mW+DXpsmqc3xbjrOtva6c+qrZOvALmt2K1bxJaSSL39yhGfe5lZihq7fkqQ7LEUJ0f216KJ69m8vzS6h9cPyiSuMt/FLn/ZR1anV9XJnvT7Z1jNp7wHA08dPaE9t3co4VGmKUV+3tsCF7ftLnHqdDLoydOTlTs76EhTeRX+ae89XnQfsRKfW4Feml/jwJcd/xr5vvKSslK2P4eD4L2JgbCoO37e1x3/HFsJ9Wj6KRmnAcdQAyEQbPrw4CmvljefHsU14QBv/rkJ0K7Emvyp6v7e2Rr4f2b+prdQbrdhDLT+5H9PR4BHUMMhEHT/kPP3iE3Y9u6rbp9ZSm92SlcC3SxSF3VwG0ycx6ObP/LlqXp9aVE3/fm7cAbdjFPrXR5VRV/gLXzG3pqbR20fv1TKf6oG2YeB4pifctFS1v29+iMPBq8s7a6zqYE7u/xRGhv4kBoYn0HTUl1Gqg79iSvmqYUizz0l2dBuxJr1qdbhCb6G0TY8WLHDnnVtKprz9heauW50E7EgdBL+3tMYWdv93r7jfWlvh86jBgIg5b6o9bwFaM6skXqPOg94kBoqb8SLO+I/37dv8qzsfEPW/rLGdB+xEAYtKI/e6TueMsdvLmD5f09XPWXDegSAr1JjJ440NKW9R066vcJBvDXiWlL+LD9PTagsz+0C/GAHmVpdn0YKneTBuT2R/SjWtxVsUguz74+/9OhTcRpdgPQQtcdaMX+HhT1FPmOXzaEAWzt7/FQ6GVicMTQzVxWoNX6y9vZdXcAckiLqmJVLMy5tz7dc6FdiQOhJf2Fj50w4N9toNl1Qi8creovz4IOINbkTxehjft7tMgttfQoWmcD8Nzf43HQ3sSB0Pb9PTr3Bxq8GpJ5wft7oOEuwkcVabWEj+zvYSEGwqDt+3uoCt4nUdNCes81FUlxJw7ac6sMN+INS394f4/xVu7X3feb8Njf49ugHYmHRz4KmvYfplF9za+LiwB6P43nQXsQB0LT8Ueazb3QqM6F9tP3R7EqFoksPvt7HAPtSgyEQQ/6S6IDawx3MI1P6+8lB1C5VnRNS4Z6/pIGm8dAF2l5N/X8xWTmOpu/NMRAmKXv+ktqTjpTd1X3bflsC95SX+QGAlS9/dL+HiN0u9vwB6HV+Q+rmTEIRXdiIMzSs++XdEcGbfDW2mnAr6oNocWuHV3+9DBoV2IgDLrZ3yMRRxD4vDDQPIoLvGr95TDoGGIgDJr2H9NUMO7UU/y/kdPvR5HZXUKT9TX6j2Ogd4jfbuP68yFKVvv+6vP4Aw1+uiNjoL6avOrVPBQXuWlzYS/CVv9xGPQ+cTtQUu8/nKFn/S+JjrDe7Bhg093azaNYFdn0vfqxw6C9iYEwaKL+tJ0A1iETk5oKfAy1ke9RnQSPptmvxlJ/ehi0HzEQBq2oX+ez/lRtdf1t6r0k+rIEcxj0HjEQBv3qfzHdStK+TYx2/eUw6DBiq/H2+18qi8zfBCamhg4Tu/1zwdCmO/EjnkJjPj6cLU3UJ6cBvxJG7tjRN2nwKWS+TFcRnJ4KbSVOAnEU9FA/Np17TUdyndXb3++AArSeqPWXM6C9iYEw6Hv9aWKRp+LBPUzqqEGk+Hd+pPNMZ0DHEEdB0+snd7lfPq9NpH/55K3+aAnpToJ2InbBnUOnf3Vad5r9uHyRSB5vXhwE+pOgY4ijoGf9L2nwgxoXOWtVrAT78okiBDkD2pXYkbUHSf+kipO8zof43OX8aOgY4hDo9A8ef+9KVcz41678F0AnzytR0OnSxFHJ6Xd0oZvTavfnQfsRf9bS/3/9z77+A2DdeCv3ceV0AAAAAElFTkSuQmCC') 0 0 no-repeat";
        break;
    }
    p.padM.style.background = "url('data:image/gif;base64,R0lGODlhDwAPAKEBAAAAAP///////////yH5BAEKAAIALAAAAAAPAA8AAAIklB8Qx53b4otSUWcvyiz4/4AeQJbmKY4p1HHapBlwPL/uVRsFADs=') no-repeat";
    p.sldM.style.background = "url('data:image/gif;base64,R0lGODlhBwALAKECAAAAAP///6g8eKg8eCH5BAEKAAIALAAAAAAHAAsAAAITTIQYcLnsgGxvijrxqdQq6DRJAQA7') no-repeat";
    // place pointers
    redrawPad();
    redrawSld();
    THIS.picker.owner = THIS;
    document.getElementsByTagName('body')[0].appendChild(p.boxB);
  }
  function redrawPad() {
    // redraw the pad pointer
    switch(modeID) {
      case 0: var yComponent = 1; break;
      case 1: var yComponent = 2; break;
    }
    var x = Math.round((THIS.hsv[0]/6) * (THIS.images.pad[0]-1));
    var y = Math.round((1-THIS.hsv[yComponent]) * (THIS.images.pad[1]-1));
    THIS.picker.padM.style.backgroundPosition =
      (THIS.pickerFace+THIS.pickerInset+x - Math.floor(THIS.images.cross[0]/2)) + 'px ' +
      (THIS.pickerFace+THIS.pickerInset+y - Math.floor(THIS.images.cross[1]/2)) + 'px';
    // redraw the slider image
    var seg = THIS.picker.sld.childNodes;
    switch(modeID) {
      case 0:
        var rgb = HSV_RGB(THIS.hsv[0], THIS.hsv[1], 1);
        for(var i=0; i<seg.length; i+=1) {
          seg[i].style.backgroundColor = 'rgb('+
            (rgb[0]*(1-i/seg.length)*100)+'%,'+
            (rgb[1]*(1-i/seg.length)*100)+'%,'+
            (rgb[2]*(1-i/seg.length)*100)+'%)';
        }
        break;
      case 1:
        var rgb, s, c = [ THIS.hsv[2], 0, 0 ];
        var i = Math.floor(THIS.hsv[0]);
        var f = i%2 ? THIS.hsv[0]-i : 1-(THIS.hsv[0]-i);
        switch(i) {
          case 6:
          case 0: rgb=[0,1,2]; break;
          case 1: rgb=[1,0,2]; break;
          case 2: rgb=[2,0,1]; break;
          case 3: rgb=[2,1,0]; break;
          case 4: rgb=[1,2,0]; break;
          case 5: rgb=[0,2,1]; break;
        }
        for(var i=0; i<seg.length; i+=1) {
          s = 1 - 1/(seg.length-1)*i;
          c[1] = c[0] * (1 - s*f);
          c[2] = c[0] * (1 - s);
          seg[i].style.backgroundColor = 'rgb('+
            (c[rgb[0]]*100)+'%,'+
            (c[rgb[1]]*100)+'%,'+
            (c[rgb[2]]*100)+'%)';
        }
        break;
    }
  }
  function redrawSld() {
    // redraw the slider pointer
    switch(modeID) {
      case 0: var yComponent = 2; break;
      case 1: var yComponent = 1; break;
    }
    var y = Math.round((1-THIS.hsv[yComponent]) * (THIS.images.sld[1]-1));
    THIS.picker.sldM.style.backgroundPosition =
      '0 ' + (THIS.pickerFace+THIS.pickerInset+y - Math.floor(THIS.images.arrow[1]/2)) + 'px';
  }
  function isPickerOwner() {
    return THIS.picker && THIS.picker.owner === THIS;
  }
  function blurTarget() {
    if(THIS.valueElement === target) {
      THIS.importColor();
    }
    if(THIS.pickerOnfocus) {
      THIS.hidePicker();
    }
  }
  function blurValue() {
    if(THIS.valueElement !== target) {
      THIS.importColor();
    }
  }
  function setPad(e) {
    var posM = [e.pageX, e.pageY];
    var x = posM[0]-posPad[0];
    var y = posM[1]-posPad[1];
    switch(modeID) {
      case 0: THIS.fromHSV(x*(6/(THIS.images.pad[0]-1)), 1 - y/(THIS.images.pad[1]-1), null, leaveSld); break;
      case 1: THIS.fromHSV(x*(6/(THIS.images.pad[0]-1)), null, 1 - y/(THIS.images.pad[1]-1), leaveSld); break;
    }
  }
  function setSld(e) {
    var posM = [e.pageX, e.pageY];
    var y = posM[1]-posPad[1];
    switch(modeID) {
      case 0: THIS.fromHSV(null, null, 1 - y/(THIS.images.sld[1]-1), leavePad); break;
      case 1: THIS.fromHSV(null, 1 - y/(THIS.images.sld[1]-1), null, leavePad); break;
    }
  }
  var modeID = this.pickerMode.toLowerCase()==='hvs' ? 1 : 0;
  var abortBlur = false;
  var
    holdPad = false,
    holdSld = false;
  var
    posPad,
    posSld;
  var
    leaveValue = 1<<0,
    leaveStyle = 1<<1,
    leavePad = 1<<2,
    leaveSld = 1<<3;
  // target
  target.addEventListener('focus', function() { if(THIS.pickerOnfocus) { THIS.showPicker(); } }, false );
  target.addEventListener('blur', function() { if(!abortBlur) { window.setTimeout(function() { abortBlur || blurTarget(); abortBlur=false; }, 0); } else { abortBlur = false; }}, false);
  // valueElement
  if(THIS.valueElement) {
    var updateField = function() {
      THIS.fromString(valueElement.value, leaveValue);
    };
    THIS.valueElement.addEventListener('keyup', updateField, false);
    THIS.valueElement.addEventListener('input', updateField, false);
    THIS.valueElement.addEventListener('blur', blurValue, false);
    THIS.valueElement.setAttribute('autocomplete', 'off');
  }
  // THIS.styleElement
  if(THIS.styleElement) {
    THIS.styleElement.jscStyle = {
      backgroundColor : THIS.styleElement.style.backgroundColor,
      color : THIS.styleElement.style.color
    };
  }
  this.importColor();
}
function IconPicker(target) {
  var THIS = this;
  this.valueElement = target;
  this.picker = null;
  this.abortBlur = false;
  this.skipHost = location.protocol+"//"+location.hostname + "/";
  var icons = [ "/rgraphic/unit/unit_*.png", "spear", "sword", "axe", "archer", "spy", "light", "marcher", "heavy", "ram", "catapult", "knight", "snob", "/rgraphic/command/*.png","attack", "back", "cancel", "return", "support", "/n",
                "/rgraphic/buildings/*.png", "main", "barracks", "stable", "garage", "church", "snob", "smith", "place", "statue", "market", "wood", "stone", "iron", "farm", "storage", "hide", "wall", "/n",
                "/rgraphic/ally_rights/*.png", "diplomacy", "forum_mod", "found", "internal_forum", "invite", "lead", "mass_mail", "trusted_member",  
                "/pgraphic/forum/forum_admin_unread.png", "/rgraphic/forum/thread_*.png", "close", "closed", "delete", "move", "open", "read", "/n",
                "/rgraphic/*.png", "holz", "lehm", "eisen", "res", "/rgraphic/dots/*.png","blue", "brown", "green", "grey", "red", "yellow",
                "/rgraphic/map/*.png", "map_n", "map_ne", "map_e", "map_se", "map_s", "map_sw", "map_w", "map_nw"
              ];
  this.createPicker = function() {
    THIS.picker = document.body.appendChild(ce("div"));
    THIS.picker.id = "dsfm_iconpicker";
    THIS.picker.style.position = "absolute";
    THIS.picker.style.display = "none";
    THIS.picker.style.zIndex = 10000;
    THIS.picker.addEventListener("mouseover", function() {THIS.abortBlur=true;}, false );
    THIS.picker.addEventListener("mouseout", function() { THIS.abortBlur=false;}, false );
    var tab = THIS.picker.appendChild(ce("table"));
    tab.className = "main";
    tab.style.border = "2px solid #804000";
    var row = tab.insertRow(tab.rows.length);
    var replace = "";
    for( var i = 0; i < icons.length; i++ ) {
      var src;
      if( icons[i][0] == "/" ) {
        switch( icons[i][1] ) {
          case "r":
            replace = icons[i].substr(2);
            continue;
          case "n":
            row = tab.insertRow(tab.rows.length);
            continue;
          case "p":
            src = icons[i].substr(2);
            break;
        }
      }
      else {
        src = replace.replace("*",icons[i]);
      }
      cell = row.insertCell(row.cells.length);
      var a = cell.appendChild(ce("a"));
      a.href = "javascript:;";
      a.addEventListener("click", THIS.selectIcon, false );
      a.appendChild(ce("img")).src = src;
    }
  }
  this.showPicker = function() {
    if( !THIS.picker )
      THIS.createPicker();
    var pos = lib.getElementPos(target);
    THIS.picker.style.left = pos[0] + "px";
    THIS.picker.style.top = (pos[1] + target.offsetHeight) + "px";
    THIS.picker.style.display = "block";
  }

  this.hidePicker = function() {
    if( THIS.picker )
      THIS.picker.style.display = "none";
  }
  this.selectIcon = function(e) {
    var value = e.target.src;
    if( value.length > THIS.skipHost.length && value.substring(0,THIS.skipHost.length) == THIS.skipHost )
      value = value.substring(THIS.skipHost.length);

    THIS.valueElement.value = value;
    lib.fireEvent(THIS.valueElement,"change");
    THIS.valueElement.focus();
  }
  THIS.valueElement.addEventListener("focus", THIS.showPicker, false);
  THIS.valueElement.addEventListener("blur", function() { if( THIS.abortBlur ) { THIS.valueElement.focus(); THIS.abortBlur=false; } else THIS.hidePicker(); }, false );
}
function HypixDSLib(prefix,forceGM,useIdx) {
  var lib = this;
  this.prefix = prefix;
  this.Debug = function() {
    this.log = function(msg) {
      if( typeof(GM_log) == "function" )
        GM_log(msg);
      else if( opera )
        opera.postError(msg);
      else if( console )
        console.log(msg);
      else
        alert(msg);
    }

    this.dumpObj = function(obj) {
      var str = "\n {";
      for( var key in obj ) {
        if( typeof( obj[key] ) == "object" ) {
          str += "\n" + key + ":";
          str += this.dumpObj(obj[key],true)
        }
        else
          str += "\n" + key + ": " + obj[key];
      }
      str += "\n}";
      if( arguments.length == 1 || !arguments[1] )
        this.log(str);
      return str;
    }
  }
  this.ServerInfo = function(cfgVals,needUnitInfo,needBuildingInfo,sites) {
    var cfg = this;
    if( lib.world == -1 )
      return;
    if( typeof(sites) == "undefined" )
      sites = [];
    var allData = true;
    var ajaxReq = 0;
    var ajaxLoaded = 0;
    this.config = lib.storage.getValue("svrcfg");
    if( cfgVals.length > 0 && typeof(this.config) == "undefined" )
      allData = false;
    this.buildingInfo = lib.storage.getValue("buildinginfo");
    if( needBuildingInfo && typeof(this.buildingInfo) == "undefined" )
      allData = false;
    this.unitInfo = lib.storage.getValue("unitInfo");
    if( needUnitInfo && typeof(this.unitInfo) == "undefined" )
      allData = false;
    for( var i = 0; i < sites.length; i++ ) {
      this[sites[i].key] = lib.storage.getValue(sites[i].key);
      if( typeof(this[sites[i].key]) == "undefined" )
        allData = false;
    }
    if( !allData ) {
      var popup = new lib.Popup("loadcfg",texts[lib.lang].gui.title+" "+version,true,0,0);
      var html = '<table style="width:100%;">';
      if( cfgVals.length > 0 ) {
        ajaxReq++;
        html += '<tr><td>';
        if( typeof( this.config ) == "undefined" ) {
          html += texts[lib.lang].gui.loadServerCfg+'<span id="'+lib.prefix+'_svrcfg"/>';
          loadServerCfg(cfgVals.split(","));
        }
        else {
          html += '<span style="color:green;">'+texts[lib.lang].gui.serverCfgKnown+'</span>';
          ajaxLoaded++;
        }
        html += '</td></tr>';
      }
      if( needUnitInfo ) {
        ajaxReq++;
        html += '<tr><td>';
        if( typeof( this.unitInfo ) == "undefined" ) {
          html += texts[lib.lang].gui.loadUnitInfo+'<span id="'+lib.prefix+'_unitinfo"/>';
          loadUnitInfo();
        }
        else {
          html += '<span style="color:green;">'+texts[lib.lang].gui.unitInfoKnown+'</span>';
          ajaxLoaded++;
        }
       html += '</td></tr>';
      }
      if( needBuildingInfo ) {
        ajaxReq++;
        html += '<tr><td>';
        if( typeof( this.buildingInfo ) == "undefined" ) {
          html += texts[lib.lang].gui.loadBuildingInfo+'<span id="'+lib.prefix+'_buildinginfo"/>';
          loadBuildingInfo();
        }
        else {
          html += '<span style="color:green;">'+texts[lib.lang].gui.buildingInfoKnown+'</span>';
          ajaxLoaded++;
        }
       html += '</td></tr>';
      }
      html += '</table><table id="'+lib.prefix+'_sites"';
      if( ajaxLoaded < ajaxReq )
        html += ' style="display:none"';
      else {
        for( var i = 0; i < sites.length; i++ ) {
          if( location.href == sites[i].href ) {
            try {
              this[sites[i].key] = sites[i].siteHandler();
              lib.storage.setValue(sites[i].key,this[sites[i].key]);
            }
            catch(e) {
              lib.debug.log(sites[i].key + ": " + e.message);
            }
            break;
          }
        }
      }
      html += ">";
      for( var i = 0; i < sites.length; i++ ) {
        html += '<tr><td>';
        if( typeof(this[sites[i].key]) == "undefined" )
          html += '<a href="'+sites[i].href+'">'+sites[i].linkText+'</a>';
        else
          html += '<span style="color:green;">'+sites[i].visitedText+'</span>';
        html += '</td></tr>';
      }
      html += "</table>";
      popup.content.innerHTML = html;
      popup.setSize(300);
      popup.show();
    }

    function loadServerCfg(cfgVals) {
      var req = new XMLHttpRequest();
      if (req == null)
        alert("Error creating request object!");

      req.open("GET", "/interface.php?func=get_config", true);
      req.onreadystatechange =
      function() {

        if( req.readyState == 4 ) {
          var span = $(lib.prefix+"_svrcfg");
          if(req.status!=200) {
            span.innerHTML = texts[lib.lang].gui.error + req.status;
            span.style.color = "red";
          }
          else {

            cfg.config = {};
            var xml = req.responseXML;
            for( var i = 0; i < cfgVals.length; i++ ) {
              var path = cfgVals[i].split("/");
              var name = "";
              var e = xml;
              for( var j = 0; j < path.length; j++ ) {
                e = e.getElementsByTagName(path[j]);
                var len = e.length;
                e = e[0];
                if( len > 0 ) {
                  if( j > 0 )
                    name += "_";
                  name += path[j];
                }
                else
                  break;
              }
              var val = null;
              if( e )
                cfg.config[name] = parseFloat(e.firstChild.nodeValue);
              else
                lib.debug.log( cfgVals[i] + " not found" );
            }
            lib.storage.setValue( "svrcfg", cfg.config );
            span.style.color = "green";
            span.innerHTML = texts[lib.lang].gui.ok;
            ajaxLoaded++;
            if( ajaxLoaded == ajaxReq && sites.length > 0 ) {
              $(lib.prefix+"_sites").style.display = "";
              popup.setSize(300);
            }
          }
        }
      }
      req.setRequestHeader('If-Modified-Since', 'Sat, 1 Jan 2000 00:00:00 GMT');
      req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      req.send(null);
    }

    function loadUnitInfo() {
      var req = new XMLHttpRequest();
      if (req == null)
        alert("Error creating request object!");

      req.open("GET", "/interface.php?func=get_unit_info", true);
      req.onreadystatechange =
      function() {

        if( req.readyState == 4 ) {
          var span = $(lib.prefix+"_unitinfo");
          if(req.status!=200) {
            span.innerHTML = texts[lib.lang].gui.error + req.status;
            span.style.color = "red";
          }
          else {

            var xml = req.responseXML;
            cfg.unitInfo = {};
            var e = xml.firstChild;
            var bit = 1;
            for( var i = 0; i < e.childNodes.length; i++ ) {
              var unitnode = e.childNodes[i];
              if( unitnode.nodeType != 3 ) {
                cfg.unitInfo[unitnode.nodeName] = {};
                for( var c = 0; c < unitnode.childNodes.length; c++ ) {
                  var node = unitnode.childNodes[c];
                  if( node.nodeName != "#text" )
                    cfg.unitInfo[unitnode.nodeName][node.nodeName] =  parseFloat(node.firstChild.nodeValue);
                }
              }
            }
            lib.storage.setValue( "unitInfo", cfg.unitInfo );
            span.style.color = "green";
            span.innerHTML = texts[lib.lang].gui.ok;
            ajaxLoaded++;
            if( ajaxLoaded == ajaxReq && sites.length > 0 ) {
              $(lib.prefix+"_sites").style.display="";
              popup.setSize(300);
            }
          }
        }
      }
      req.setRequestHeader('If-Modified-Since', 'Sat, 1 Jan 2000 00:00:00 GMT');
      req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      req.send(null);
    }
    function loadBuildingInfo() {
      var req = new XMLHttpRequest();
      if (req == null)
        alert("Error creating request object!");

      req.open("GET", "/interface.php?func=get_building_info", true);
      req.onreadystatechange =
      function() {

        if( req.readyState == 4 ) {
          var span = $(lib.prefix+"_buildinginfo");
          if(req.status!=200) {
            span.innerHTML = texts[lib.lang].gui.error + req.status;
            span.style.color = "red";
          }
          else {

            var xml = req.responseXML;
            cfg.buildingInfo = {};
            var e = xml.firstChild;
            for( var i = 0; i < e.childNodes.length; i++ ) {
              var buildingnode = e.childNodes[i];
              if( buildingnode.nodeType != 3 ) {
                cfg.buildingInfo[buildingnode.nodeName] = {};
                for( var c = 0; c < buildingnode.childNodes.length; c++ ) {
                  var node = buildingnode.childNodes[c];
                  if( node.nodeType != 3 )
                    cfg.buildingInfo[buildingnode.nodeName][node.nodeName] =  parseFloat(node.firstChild.nodeValue);
                }
              }
            }
            lib.storage.setValue( "buildinginfo", cfg.buildingInfo );
            span.style.color = "green";
            span.innerHTML = texts[lib.lang].gui.ok;
            ajaxLoaded++;
            if( ajaxLoaded == ajaxReq && sites.length > 0) {
              $(lib.prefix+"_sites").style.display = "";
              popup.setSize(300);
            }
          }
        }
      }
      req.setRequestHeader('If-Modified-Since', 'Sat, 1 Jan 2000 00:00:00 GMT');
      req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      req.send(null);
    }
  }
  this.StorageHandler = function(forceGM,useIdx) {
    var gm = typeof(unsafeWindow) != "undefined" && navigator.userAgent.indexOf("Firefox")>-1;
    var win = gm ? unsafeWindow : window;
    var ls = false;
    var intGetValue;
    var intSetValue;
    var prefix = lib.prefix;
    try {ls = typeof(win.localStorage) != "undefined";} catch(e) {lib.log(e.message);}
    var setIdx = function(key,inIdx) {
      if( typeof(inIdx) == "undefined" )
        inIdx = true;
      if( useIdx && inIdx ) {
        var idx = intGetValue("idx",";");
        if( !new RegExp(";"+key+";").test(idx) )
          intSetValue("idx",idx+key+";",false);
      }
    }
    var delIdx = function(key) {
      if( useIdx ) {
        var idx = intGetValue("idx",";");
        idx = idx.replace(new RegExp(";"+key+";","g"), ";");
        intSetValue("idx",idx,false);
      }
    }
    var idxListValues = function(re) {
        var allkeys = intGetValue("idx",";").split(";");
        var serverKeys = [];
        if( typeof(re) != "undefined" )
          var reKey = new RegExp(re);
        for( var i = 1; i < allkeys.length-1; i++ ) {
          if( reKey ) {
            res = res[1].match(reKey);
            if( res )
              serverKeys.push(res);
          }
          else
            serverKeys.push(res[1]);
        }
        return serverKeys;
    }
    if( forceGM && gm || !ls) {
      if( gm ) {
        prefix = prefix + "_" + document.location.host.split('.')[0];
        intSetValue = function(key,value,inIdx) {
          setIdx(key,inIdx);
          GM_setValue(prefix+"_"+key,value);
        };
        intGetValue = function(key,defaultValue) {
          return GM_getValue(prefix+"_" + key, defaultValue);
        }
        this.deleteValue = function(key) {
          delIdx(key);
          GM_deleteValue(prefix+"_"+key);
        }
        if( this.useIdx )
          this.listValues = idxListValues;
        else
          this.listValues = function(re) {
            var allkeys = GM_listValues();
            var serverKeys = [];
            var rePrefix = new RegExp("^"+prefix+"_(.*)$");
            if( typeof(re) != "undefined" )
              var reKey = new RegExp(re);
            for( var i = 0; i < allkeys.length; i++ ) {
              var res = allkeys[i].match(rePrefix);
              if( res ) {
                if( reKey ) {
                  res = res[1].match(reKey);
                  if( res )
                    serverKeys.push(res);
                }
                else
                  serverKeys.push(res[1]);
              }
            }
            return serverKeys;
          }
      }
      else {
        alert( "Keine geeignete Speichermöglichkeit gefunden!");
        end;
      }
    }
    else if( ls ) {
      intSetValue = function(key,value,inIdx) {
        if( useIdx )
          setIdx(key,inIdx);
        localStorage.setItem(prefix+"_"+key, value );
      };
      intGetValue = function(key,defaultValue) {
        var value = localStorage.getItem(prefix+"_"+key);
        if( value )
          return value;
        else
          return defaultValue;
      };
      this.deleteValue = function(key) {
        delIdx(key);
        localStorage.removeItem(prefix+"_"+key);
      }
      if( this.useIdx )
        this.listValues = idxListValues;
      else
        this.listValues = function(re) {
          if( this.useIdx ) {
            return idxListValues(intGetValue("idx","").split(";"));
          }
          else {
            var keys = [];
            var rePrefix = new RegExp("^"+prefix+"_(.*)$");
            if( typeof(re) != "undefined")
              var reKey = new RegExp(re);
            for( var i = 0; i < win.localStorage.length; i++ ) {
              var res = localStorage.key(i).match(rePrefix);
              if( res ) {
                if( reKey ) {
                  res = res[1].match(reKey);
                  if( res )
                    keys.push(res);
                }
                else
                  keys.push(res[1]);
              }
            }
            return keys;
          }
        }
    }
    else {
      alert( "Keine geeignete Speichermöglichkeit gefunden!");
      end;
    }
    this.clear = function(re) {
      var keys = this.listValues(re);
      for( var i = 0; i < keys.length; i++ )
        this.deleteValue(keys[i]);
    }
    this.setValue = function(key,value) {
      switch( typeof(value) ) {
        case "object":
        case "function":
          intSetValue(key,"j"+JSON.stringify(value));
          break;
        case "number":
          intSetValue(key,"n"+value);
          break;
        case "boolean":
          intSetValue(key,"b" + (value ? 1 : 0));
          break;
        case "string":
          intSetValue(key,"s" + value );
          break;
        case "undefined":
          intSetValue(key,"u");
          break;
      }
    }
    this.getValue = function(key,defaultValue) {
      var str = intGetValue(key);
      if( typeof(str) != "undefined" ) {
        switch( str[0] ) {
          case "j":
            try {
              return JSON.parse(str.substring(1));
            }
            catch(e) {
              alert( key + ": " + texts[lib.lang].gui.valueError );
              return defaultValue;
            }
          case "n":
            return parseFloat(str.substring(1));
          case "b":
            return str[1] == "1";
          case "s":
            return str.substring(1);
          default:
            this.deleteValue(key);
        }
      }
      return defaultValue;
    }
    this.getString = function(key) {
      return intGetValue(key);
    }
    this.setString = function(key,value) {
      intSetValue(key,value);
    }
  }
  this.Popup = function(id,title,close,width,height) {
    var THIS = this;
    id = lib.prefix+"_"+id;
    this.div = $(id);
    this.shadowDiv = $("hpx_shadow_div");
    if( this.shadowDiv === null ) {
      this.shadowDiv = document.body.appendChild(ce("div"));
      this.shadowDiv.id = "hpx_shadow_div";
      this.shadowDiv.style.position = "fixed";
      this.shadowDiv.style.left = "0px";
      this.shadowDiv.style.top = "0px";
      this.shadowDiv.style.backgroundColor = "rgba(0,0,0,0.7)";
      this.shadowDiv.style.zIndex = 999;
      this.shadowDiv.style.display = "none";
    }
    this.prevShadowDisplay = this.shadowDiv.style.display;
    if( this.div === null ) {
      this.div = document.body.appendChild(ce("div"));
      this.div.id = id;
      this.div.style.position = "absolute";
      this.div.style.zIndex = 1000;
      this.div.style.display = "none";
    }
    this.div.innerHTML = "";
    var tab = this.div.appendChild(ce("table"));
    tab.className = "popup_content";
    tab.style.border = "2px solid #804000";
    var row = tab.insertRow(0);
    var cell = row.appendChild(ce("th"));
    if( close ) {
      var titleTab = cell.appendChild(ce("table"));
      titleTab.style.width = "100%";
      row = titleTab.insertRow(0);
      this.titleCell = row.insertCell(0);
      this.titleCell.appendChild(document.createTextNode(title));
      cell = row.insertCell(1);
      cell.style.textAlign = "right";
      var a = cell.appendChild(ce("a"));
      a.id = id+"_close";
      a.href = "javascript:;";
      a.appendChild(document.createTextNode(texts[lib.lang].gui.close));
      a.addEventListener("click", function() { THIS.hide(); }, false);
    }
    else {
      this.titleCell = cell;
      cell.appendChild(document.createTextNode(title));
    }
    this.content = tab.insertRow(1).insertCell(0);
    this.resize = function() {
      THIS.shadowDiv.style.width = self.innerWidth + "px";
      THIS.shadowDiv.style.height =  self.innerHeight + "px";
  //    THIS.center();
    }
    this.center = function() {
      THIS.div.style.left = Math.round(Math.max(0,self.pageXOffset + (self.innerWidth-THIS.div.offsetWidth)/2)) +"px";
      THIS.div.style.top = Math.round(Math.max(0,self.pageYOffset + (self.innerHeight-THIS.div.offsetHeight)/2)) + "px";
    }
    this.show = function() {
      var show = arguments.length == 0 || arguments[0] == true;
      THIS.shadowDiv.style.display = show ? "block" : this.prevShadowDisplay;
      THIS.div.style.display = show ? "block" : "none";
      if( show ) {
        window.addEventListener("resize", THIS.resize, false);
        THIS.resize();
        THIS.center();
  //      window.addEventListener("scroll", this.center, false);
      }
      else {
        window.removeEventListener("resize", this.resize, false);
  //      window.removeEventListener("scroll", this.center, false);
      }
    }
    this.hide = function() {
      THIS.show(false);
    }
    this.setSize = function(width,height) {
      var display = THIS.div.style.display;
      THIS.div.style.display = "block";
      if( typeof(width) == "undefined" )
        width = tab.offsetWidth;
      if( typeof(height) == "undefined" )
        height = tab.offsetHeight;
      THIS.div.style.display = display;
      THIS.div.style.width = width + "px";
      THIS.div.style.height = height + "px";
      THIS.content.parentNode.parentNode.parentNode.style.width = Math.max(0,width - 8) +"px";
      THIS.content.parentNode.parentNode.parentNode.style.height = Math.max(0,height - 50) + "px";
      THIS.center();
    }
    this.setSize(width,height);
    this.setTitle = function(title) {
      THIS.titleCell.innerHTML = "";
      THIS.titleCell.appendChild(document.createTextNode(title));
    }
  }
  this.parseParams = function(url) {
    url = url.substring(url.indexOf("?")+1);
    url = url.replace( /&amp;/g, "&" );
    var hash = url.indexOf("#");
    if( hash > -1 )
      url = url.substring(0,hash-1);
    url = url.split("&");
    var params = { get: function(name,def) { if(typeof(this[name]) == "undefined") return def; else return this[name]; }, };
    for( var i = 0; i < url.length; i++ ) {
      var param = url[i].split("=");
      params[param[0]] = param[1];
    }
    return params;
  }
  this.getGameData = function() {
    var game_data;
    if(typeof(unsafeWindow) != 'undefined' && navigator.userAgent.indexOf("Firefox")>-1) {
      game_data = unsafeWindow.game_data;
    }
    if(!game_data) {
      var script = ce("script");
      script.type = "application/javascript";
      script.textContent = 	"var input=document.createElement('input');" +
                  "input.type='hidden';" +
                  "input.value=JSON.stringify(game_data);"  +
                  "input.id='game_data';" +
                  "document.body.appendChild(input);";
      document.body.appendChild(script);
      var input = $("game_data");
      if( input )
        eval("game_data=" + input.value + ";");
      document.body.removeChild(script);
    }
    if( game_data )
      game_data.link_base = game_data.link_base.replace(/&amp;/g,"&");
    return game_data;
  }
  this.createLink = function(screen) {
    var lnk = this.game_data.link_base.replace("screen=","screen="+screen);
    var len = arguments.length - 1;
    for( var i = 1; i < len; i++ ) {
      lnk += "&" + arguments[i] + "=";
      i++;
      if( i < len )
        lnk += arguments[i];
    }
    if( arguments[len] == true)
      lnk.replace( /&/g, "&amp;" );
    return lnk;
  }
  this.fireEvent = function(node,evt) {
    if( node.nodeName.toUpperCase() == "INPUT" && node.type.toUpperCase() == "CHECKBOX" )
      node.checked = !node.checked;
    var evObj = document.createEvent('HTMLEvents');
    evObj.initEvent( evt, true, true );
    node.dispatchEvent(evObj);
  }
  this.getElementPos = function(e) {
    var e1=e, e2=e;
    var x=0, y=0;
    if(e1.offsetParent) {
      do {
        x += e1.offsetLeft;
        y += e1.offsetTop;
      } while(e1 = e1.offsetParent);
    }
    while((e2 = e2.parentNode) && e2.nodeName.toUpperCase() !== 'BODY') {
      x -= e2.scrollLeft;
      y -= e2.scrollTop;
    }
    return [x, y];
  }
  this.getServerTime = function() {
    try {
      var span = $("serverTime");
      var hms = span.firstChild.nodeValue.split(":");
      span = $("serverDate");
      var dmy = span.firstChild.nodeValue.split("/");
      return new Date( parseInt(dmy[2], 10), parseInt(dmy[1], 10) - 1, parseInt(dmy[0], 10), parseInt(hms[0], 10), parseInt(hms[1], 10), parseInt( hms[2], 10 ));
    }
    catch(e) {
      return new Date();
    }
  }
  this.getTimeDiff = function() {
    return this.serverTime.getTime() / 1000 - new Date().getTime() / 1000;
  }
  this.getTime = function() {
    return parseInt(new Date().getTime() / 1000 + this.timeDiff, 10);
  }
  this.padLeft = function(str,chr,len) {
    var ret = str.toString();
    var pad = len - ret.length;
    for( var i = 0; i < pad; i++ )
      ret = chr + ret;
    return ret;
  }
  this.formatNumber = function(nr,dotted,greyspan,shortMode) {
    var ret = "";
    if( nr == 0 )
      return "0";
    if( shortMode > 0 && nr > 999999 ) {
      var tmp = Math.round(nr / 10000);
      var tmp2 = tmp % 100;
      ret = lib.formatNumber( Math.floor(tmp / 100), dotted, greyspan ) + (greyspan ? '<span class="grey">,</span>' : ',') + (tmp2 < 10?'0':'') + tmp2 + ' Mio';
    }
    else if( shortMode == 2 && nr > 999 ) {
      var tmp = Math.round( nr / 100);
      var tmp2 = tmp % 10;
      ret = lib.formatNumber( Math.floor(tmp/10), dotted, greyspan ) + (greyspan ? '<span class="grey">,</span>' : ',') + tmp2 + 'k';
    }
    else if( dotted ) {
      nr = nr.toString();
      var len = nr.length;
      for( var i = 0; i < len; i++ ) {
        ret += nr[i];
        var j = len-i;
        if( j == 10 || j == 7 || j == 4 ) { //i < len-1 && (len-i-1) % 3 == 0 )
          if( greyspan )
            ret += '<span class="grey">.</span>';
          else
            ret += '.';
        }
      }
    }
    else
      ret = nr;
    return ret;
  }
  this.serverTime = this.getServerTime();
  this.timeDiff = this.getTimeDiff();
  this.debug = new this.Debug();
  this.storage = new this.StorageHandler(forceGM,useIdx);
  this.params = this.parseParams(location.href);
  this.server = document.location.host.split('.')[0];
  var res = this.server.match(/^([a-z]+)(\d+)/);
  if( res ) {
    this.lang = res[1];
    this.world = parseInt(res[2], 10);
    if( this.lang == "des" || (this.lang == "ch" && this.world < 4) || this.lang == "chs" )
      this.lang = "de";
    else if( this.lang == "zz" )
      this.lang = "en";
  }
  else {
    this.lang = "de";
    this.world = -1;
  }
  this.hasPA = false;
   var menu = $("menu_row")
   if( menu && /screen=memo/.test(menu.innerHTML) )
    this.hasPA = true;
  if( this.params.screen )
    this.game_data = this.getGameData();
}
})();
