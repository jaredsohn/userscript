

// ==UserScript==
// @name            Inceputul
// @description     Compilatatie de scripturi pentru C&C Tiberium Alliances 
// @namespace       Inceputul
// @include         *tiberiumalliances.com*
// @include         https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include         http*://*.cncopt.com/*
// @include         http*://cncopt.com/*
// @author          Flory_n24
/* @description     Pachet de scripturi utilizate in Tiberium Aliances.
- 0l.     57   For NameLater - mhShortcuts,Easy Login                              ver. 1.8.2
- 02.     85   KRS Infernal Wrapper                                                ver. 0.390737.5c
- 03.    228   Maelstrom Tool                                                      ver. 0.1.3.2
- 04.   3738   Maelstrom Tool Basescanner addon                                    ver. 1.8.4
- 05.   3758   Command & Conquer TA POIs Analyser                                  ver. 2.0.1
- 06.   4805   Tiberium Alliances Zoom                                             ver. 0.0.2 FLORIN
- 07.   4902   C&C:Tiberium Alliances Coords Button - All                          ver. 2.0.1
- 08.   5011   C&C: Tiberium Alliances Chat Helper Enhanced                        ver. 3.1.6
- 09.   5576   AllianceMemberOnline                                                ver. 0.1.3.0
- 10.   5889   DailyStats                                                          ver. 0.1.0.0
- 11.   6152   C&C:TA Compass Movable                                              ver. 1.1.0
- l2.   6332   PluginsLib - mhShortcuts - Tiberium Alliances                       ver. 1.83
- l3.   6969   WarChiefs - Tiberium Alliances Upgrade Base/Defense/Army            ver. 13.10.30
- l4.   7786   C&C:TA CNCOpt Link Button                                           ver. 1.7.6
- l5.   8505   WarChiefs - Tiberium Alliances Combat Simulator                     ver. 13.09.26
- 16.  11324   C&C Multi Session                                                   ver. 0.5
- 17.  11442   C&C:TA Dev AddonMainMenu                                            ver. 0.2
- 18.  11607   C&C Tiberium Alliances Navigate                                     ver. 1.1
- l9.  11769   Insert new script here, Under not compatible with Firefox/Chrome    ver. 0.0.0 FLORIN
- 20.  11780   C&C: Tiberium Alliances Map (Elda-Mod)                              ver. 2.0
- 21.  12672   Tiberium Alliances - New Resource Trade Window                      ver. 1.4.7
- 22.  13472   Tiberium Alliances PvP/PvE Player Info Mod                          ver. 1.2
- 23.  13689   Tiberium Alliances Info Sticker                                     ver. 1.11.06
- 24.  15000   BaseInfo                                                            ver. 2.6.0
- 25.  15538   Tiberium Alliances BaseNavBar Reorderer                             ver. 1.0
- 26.
- 27.
- 28.
- 29.
- 30.
*/
// @version     1.0.1
// @updateURL   http://userscripts.org/scripts/source/183624.meta.js
// @downloadURL http://userscripts.org/scripts/source/183624.user.js
// @grant       none
// ==/UserScript==










// ==UserScript==
// @name           For NameLater - mhShortcuts - Tiberium Alliances
// @description    Easy login to C&C from https://www.tiberiumalliances.com/login/auth
// @grant          none 
// @version        1.8.2
// ==/UserScript==
var Logins = [ //"email","password" table
// Replace your apccounts details here. Maximum of apccounts is 9.
    "change.your@email.and","PASSword.manualy.inside.the.script",
    "email 2","password 2",
    "email 3", "password 3",
    "email 4", "password 4",
    "email 5", "password 5",
    "email 6", "password 6",
    "email 7", "password 7",
    "email 8", "password 8",
    "email 9", "password 9"
    ];










// ==UserScript==
// @name KRS Infernal Wrapper
// @description supplies some wrapper functions for public use 
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version 0.390737.5c
// @updateURL   https://userscripts.org/scripts/source/162554.meta.js
// @downloadURL https://userscripts.org/scripts/source/162554.user.js
// ==/UserScript==


(function () {
    var CCTAWrapper_main = function () {
        try {
            _log = function () {
                if (typeof console != 'undefined') console.log(arguments);
                else if (window.opera) opera.postError(arguments);
                else GM_log(arguments);
            }

            function createCCTAWrapper() {
                console.log('CCTAWrapper loaded');
                _log('wrapper loading' + PerforceChangelist);
                System = $I;
                SharedLib = $I;
                var strFunction;
                
                // SharedLib.Combat.CbtSimulation.prototype.DoStep
                for (var x in $I) {
                    for (var key in $I[x].prototype) {
                        if ($I[x].prototype.hasOwnProperty(key) && typeof($I[x].prototype[key]) === 'function') {  // reduced iterations from 20K to 12K
                            strFunction = $I[x].prototype[key].toString();
                            if (strFunction.indexOf("().l;var b;for (var d = 0 ; d < c.length ; d++){b = c[d];if((b.") > -1) {
                                $I[x].prototype.DoStep = $I[x].prototype[key];
                                console.log("SharedLib.Combat.CbtSimulation.prototype.DoStep = $I." + x + ".prototype." + key);
                                break;
                            }
                        }
                    }
                }

                // ClientLib.Data.CityRepair.prototype.CanRepair
                for (var key in ClientLib.Data.CityRepair.prototype) {
                    if (typeof ClientLib.Data.CityRepair.prototype[key] === 'function') {
                        strFunction = ClientLib.Data.CityRepair.prototype[key].toString();
                        if (strFunction.indexOf("DefenseSetup") > -1 && strFunction.indexOf("DamagedEntity") > -1) {  // order important to reduce iterations
                            ClientLib.Data.CityRepair.prototype.CanRepair = ClientLib.Data.CityRepair.prototype[key];
                            console.log("ClientLib.Data.CityRepair.prototype.CanRepair = ClientLib.Data.CityRepair.prototype." + key);
                            break;
                        }
                    }
                }

                // ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost
                for (var key in ClientLib.Data.CityRepair.prototype) {
                    if (typeof ClientLib.Data.CityRepair.prototype[key] === 'function') {
                        strFunction = ClientLib.Data.CityRepair.prototype[key].toString();
                        if (strFunction.indexOf("Type==7") > -1 && strFunction.indexOf("var a=0;if") > -1) {  // order important to reduce iterations
                            ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost = ClientLib.Data.CityRepair.prototype[key];
                            console.log("ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost = ClientLib.Data.CityRepair.prototype." + key);
                            break;
                        }
                    }
                }

                // ClientLib.Data.CityUnits.prototype.get_OffenseUnits
                strFunction = ClientLib.Data.CityUnits.prototype.HasUnitMdbId.toString();
                var searchString = "for (var b in {d:this.";
                var startPos = strFunction.indexOf(searchString) + searchString.length;
                var fn_name = strFunction.slice(startPos, startPos + 6);
                strFunction = "var $createHelper;return this." + fn_name + ";";
                var fn = Function('', strFunction);
                ClientLib.Data.CityUnits.prototype.get_OffenseUnits = fn;
                console.log("ClientLib.Data.CityUnits.prototype.get_OffenseUnits = function(){var $createHelper;return this." + fn_name + ";}");

                // ClientLib.Data.CityUnits.prototype.get_DefenseUnits
                strFunction = ClientLib.Data.CityUnits.prototype.HasUnitMdbId.toString();
                searchString = "for (var c in {d:this.";
                startPos = strFunction.indexOf(searchString) + searchString.length;
                fn_name = strFunction.slice(startPos, startPos + 6);
                strFunction = "var $createHelper;return this." + fn_name + ";";
                fn = Function('', strFunction);
                ClientLib.Data.CityUnits.prototype.get_DefenseUnits = fn;
                console.log("ClientLib.Data.CityUnits.prototype.get_DefenseUnits = function(){var $createHelper;return this." + fn_name + ";}");

                // ClientLib.Vis.Battleground.Battleground.prototype.get_Simulation
                strFunction = ClientLib.Vis.Battleground.Battleground.prototype.StartBattle.toString();
                searchString = "=0;for(var a=0; (a<9); a++){this.";
                startPos = strFunction.indexOf(searchString) + searchString.length;
                fn_name = strFunction.slice(startPos, startPos + 6);
                strFunction = "return this." + fn_name + ";";
                fn = Function('', strFunction);
                ClientLib.Vis.Battleground.Battleground.prototype.get_Simulation = fn;
                console.log("ClientLib.Vis.Battleground.Battleground.prototype.get_Simulation = function(){return this." + fn_name + ";}");

                // GetNerfBoostModifier
                if (typeof ClientLib.Vis.Battleground.Battleground.prototype.GetNerfAndBoostModifier == 'undefined') ClientLib.Vis.Battleground.Battleground.prototype.GetNerfAndBoostModifier = ClientLib.Base.Util.GetNerfAndBoostModifier;

                _log('wrapper loaded');
            }
        } catch (e) {
            console.log("createCCTAWrapper: ", e);
        }

        function CCTAWrapper_checkIfLoaded() {
            try {
                if (typeof qx !== 'undefined') {
                    createCCTAWrapper();
                } else {
                    window.setTimeout(CCTAWrapper_checkIfLoaded, 1000);
                }
            } catch (e) {
                CCTAWrapper_IsInstalled = false;
                console.log("CCTAWrapper_checkIfLoaded: ", e);
            }
        }

        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(CCTAWrapper_checkIfLoaded, 1000);
        }
    }

    try {
        var CCTAWrapper = document.createElement("script");
        CCTAWrapper.innerHTML = "var CCTAWrapper_IsInstalled = true; (" + CCTAWrapper_main.toString() + ")();";
        CCTAWrapper.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName("head")[0].appendChild(CCTAWrapper);
        }
    } catch (e) {
        console.log("CCTAWrapper: init error: ", e);
    }
})();











// ==UserScript==
// @name        MaelstromTools Dev
// @namespace   MaelstromTools
// @description Just a set of statistics & summaries about repair time and base resources. Mainly for internal use, but you are free to test and comment it.
// @version     0.1.3.2
// @author      Maelstrom, HuffyLuf, KRS_L and Krisan
// ==/UserScript==
//var offense_units = own_city.get_CityArmyFormationsManager().GetFormationByTargetBaseId(current_city.get_Id()).get_ArmyUnits().l;
//System.Int64 GetForumIdByType (ClientLib.Data.Forum.EForumType eForumType)
//static ClientLib.Data.Forum.EForumType NormalForum
//System.Collections.Generic.List$1 get_ForumsAlliance ()
//System.Void CreateThread (System.Int64 forumId ,System.String threadTitle ,System.String threadPost ,System.Boolean autoSubscribe)
//System.Void CreatePost (System.Int64 forumId ,System.Int64 threadId ,System.String postMessage)
//System.Void StartGetForumThreadData (System.Int64 forumId ,System.Int32 skip ,System.Int32 take)
//System.Void OnForumThreadDataReceived (System.Object context ,System.Object result)
//System.Void add_ThreadsFetched (ClientLib.Data.ForumThreadsFetched value)
//System.Void MarkThreadsAsRead (System.Int64 forumId ,System.Int64[] threadIds)
//
//var score = ClientLib.Base.PointOfInterestTypes.GetScoreByLevel(lvl);
//var scoreNext = ClientLib.Base.PointOfInterestTypes.GetNextScore(score);
//var resBonus = ClientLib.Base.PointOfInterestTypes.GetBonusByType(ClientLib.Base.EPOIType.TiberiumBonus, score);
//var unitBonus = ClientLib.Base.PointOfInterestTypes.GetBonusByType(ClientLib.Base.EPOIType.InfanteryBonus, score);
//console.log("POI lvl" + lvl + "gives " + score + "points, next lvl at " + scoreNext + " points. Resource bonus: " + resBonus + " Unit bonus: " + unitBonus + "%");
/*
 ClientLib.Data.Player
 get_ResearchPoints
 GetCreditsCount
 GetCreditsGrowth
ClientLib.Data.PlayerResearch get_PlayerResearch ()
ClientLib.Data.PlayerResearchItem GetResearchItemFomMdbId (System.Int32 _mdbId)
ClientLib.Data.PlayerResearchItem.System.Object get_NextLevelInfo_Obj ()

var cw=ClientLib.Data.MainData.GetInstance().get_Player().get_Faction();
var cj=ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound,cw);
var cd=cr.GetResearchItemFomMdbId(cj);
 */
(function () {
  var MaelstromTools_main = function () {
    try {
      function CCTAWrapperIsInstalled() {
        return (typeof (CCTAWrapper_IsInstalled) != 'undefined' && CCTAWrapper_IsInstalled);
      }

      function createMaelstromTools() {
        console.log('MaelstromTools loaded');

        qx.Class.define("MaelstromTools.Language", {
          type: "singleton",
          extend: qx.core.Object,
          construct: function (language) {
            this.Languages = ['de', 'pt', 'fr', 'tr']; // en is default, not needed in here!
            if (language != null) {
              this.MyLanguage = language;
            }
          },
          members: {
            MyLanguage: "en",
            Languages: null,
            Data: null,

            loadData: function (language) {
              var l = this.Languages.indexOf(language);

              if (l < 0) {
                this.Data = null;
                return;
              }

              this.Data = new Object();
              this.Data["Collect all packages"] = ["Alle Pakete einsammeln", "Recolher todos os pacotes", "Récupérez tous les paquets", "Tüm paketleri topla"][l];
              this.Data["Overall production"] = ["Produktionsübersicht", "Produção global", "La production globale", "Genel üretim"][l];
              this.Data["Army overview"] = ["Truppenübersicht", "Vista Geral de Exército", "Armée aperçu", "Ordu önizlemesi"][l];
              this.Data["Base resources"] = ["Basis Ressourcen", "Recursos base", "ressources de base", "Üs önizlemesi"][l];
              this.Data["Main menu"] = ["Hauptmenü", "Menu Principal", "menu principal", "Ana menü"][l];
              this.Data["Repair all units"] = ["Alle Einheiten reparieren", "Reparar todas as unidades", "Réparer toutes les unités", "Tüm üniteleri onar"][l];
              this.Data["Repair all defense buildings"] = ["Alle Verteidigungsgebäude reparieren", "Reparar todos os edifícios de defesa", "Réparer tous les bâtiments de défense", "Tüm savunma binalarını onar"][l];
              this.Data["Repair all buildings"] = ["Alle Gebäurde reparieren", "Reparar todos os edifícios", "Réparer tous les bâtiments", "Tüm binaları onar"][l];
              this.Data["Base status overview"] = ["Basisübersicht", "Estado geral da base", "aperçu de l'état de base", "Üs durumu önizlemesi"][l];
              this.Data["Upgrade priority overview"] = ["Upgrade Übersicht", "Prioridade de upgrades", "aperçu des priorités de mise à niveau", "Yükseltme önceliği önizlemesi"][l];
              this.Data["MaelstromTools Preferences"] = ["MaelstromTools Einstellungen", "Preferências de MaelstromTools", "Préférences MaelstromTools", "MaelstromTools Ayarları"][l];
              this.Data["Options"] = ["Einstellungen", "Opções", "Options", "Seçenekler"][l];
              this.Data["Target out of range, no resource calculation possible"] = ["Ziel nicht in Reichweite, kann die plünderbaren Ressourcen nicht berechnen", "Alvo fora do alcance, não é possivel calcular os recursos", "Cible hors de portée, pas de calcul de ressources possible",
              "Hedef menzil dışında, kaynak hesaplaması olanaksız"][l];
              this.Data["Lootable resources"] = ["Plünderbare Ressourcen", "Recursos roubáveis", "Ressources à piller", "Yağmalanabilir kaynaklar"][l];
              this.Data["per CP"] = ["pro KP", "por PC", "par PC", "KP başına"][l];
              this.Data["2nd run"] = ["2. Angriff", "2º ataque", "2° attaque", "2. saldırı"][l];
              this.Data["3rd run"] = ["3. Angriff", "3º ataque", "3° attaque", "3. saldırı"][l];
              this.Data["Calculating resources..."] = ["Berechne plünderbare Ressourcen...", "A calcular recursos...", "calcul de ressources ...", "Kaynaklar hesaplanıyor..."][l];
              this.Data["Next MCV"] = ["MBF", "MCV", "VCM"][l];
              this.Data["Show time to next MCV"] = ["Zeige Zeit bis zum nächsten MBF", "Mostrar tempo restante até ao próximo MCV", "Afficher l'heure pour le prochain VCM ", "Sırdaki MCV için gereken süreyi göster"][l];
              this.Data["Show lootable resources (restart required)"] = ["Zeige plünderbare Ressourcen (Neustart nötig)", "Mostrar recursos roubáveis (é necessário reiniciar)", "Afficher les ressources fouiller (redémarrage nécessaire)", "Yağmalanabilir kaynakları göster (yeniden başlatma gerekli)"][l];
              this.Data["Use dedicated Main Menu (restart required)"] = ["Verwende extra Hauptmenü (Neustart nötig)", "Usar botão para o Menu Principal (é necessário reiniciar)", "Utiliser dédiée du menu principal (redémarrage nécessaire)", "Ana menü tuşunu kullan (yeniden başlatma gerekli)"][l];
              this.Data["Autocollect packages"] = ["Sammle Pakete automatisch", "Auto recolher pacotes", "paquets autocollecté", "Paketleri otomatik topla"][l];
              this.Data["Autorepair units"] = ["Repariere Einheiten automatisch", "Auto reparar o exército", "unités autoréparé", "Üniteleri otomatik onar"][l];
              this.Data["Autorepair defense (higher prio than buildings)"] = ["Repariere Verteidigung automatisch (höhere Prio als Gebäude)", "Auto reparar defesa (maior prioridade do que os edifícios)", "réparation automatique la défense (priorité plus élevé que les bâtiments) ", "Savunmayı otomatik onar (binalardan daha yüksek öncelikli olarak)"][l];
              this.Data["Autorepair buildings"] = ["Repariere Gebäude automatisch", "Auto reparar edifícios", "bâtiments autoréparé", "Binaları otomatik onar"][l];
              this.Data["Automatic interval in minutes"] = ["Auto-Intervall in Minuten", "Intervalo de tempo automático (em minutos)", "intervalle automatique en quelques minutes", "Otomatik toplama aralığı (dk)"][l];
              this.Data["Apply changes"] = ["Speichern", "Confirmar", "Appliquer changements", "Uygula"][l];
              this.Data["Discard changes"] = ["Abbrechen", "Cancelar", "Annuler changements", "İptal"][l];
              this.Data["Reset to default"] = ["Auf Standard zurücksetzen", "Definições padrão", "Réinitialiser", "Sıfırla"][l];
              this.Data["Continuous"] = ["Kontinuierlich", "Contínua", "continue", "Sürekli"][l];
              this.Data["Bonus"] = ["Pakete", "Bónus", "Bonus", "Bonus"][l];
              this.Data["POI"] = ["POI", "POI", "POI", "POI"][l];
              this.Data["Total / h"] = ["Gesamt / h", "Total / h", "Total / h", "Toplam / sa."][l];
              this.Data["Repaircharges"] = ["Reparaturzeiten", "Custo de reparação", "frais de réparation", "Onarım maliyeti"][l];
              this.Data["Repairtime"] = ["Max. verfügbar", "Tempo de reparação", "Temps de réparation", "Onarım süresi"][l];
              this.Data["Attacks"] = ["Angriffe", "Ataques", "Attaques", "Saldırılar"][l];
              this.Data[MaelstromTools.Statics.Infantry] = ["Infanterie", "Infantaria", "Infanterie", "Piyade"][l];
              this.Data[MaelstromTools.Statics.Vehicle] = ["Fahrzeuge", "Veículos", "Vehicule", "Motorlu B."][l];
              this.Data[MaelstromTools.Statics.Aircraft] = ["Flugzeuge", "Aeronaves", "Aviation", "Hava A."][l];
              this.Data[MaelstromTools.Statics.Tiberium] = ["Tiberium", "Tibério", "Tiberium", "Tiberium"][l];
              this.Data[MaelstromTools.Statics.Crystal] = ["Kristalle", "Cristal", "Cristal", "Kristal"][l];
              this.Data[MaelstromTools.Statics.Power] = ["Strom", "Potência", "Energie", "Güç"][l];
              this.Data[MaelstromTools.Statics.Dollar] = ["Credits", "Créditos", "Crédit", "Kredi"][l];
              this.Data[MaelstromTools.Statics.Research] = ["Forschung", "Investigação", "Recherche", "Araştırma"][l];
              this.Data["Base"] = ["Basis", "Base", "Base", "Üs"][l];
              this.Data["Defense"] = ["Verteidigung", "Defesa", "Défense", "Savunma"][l];
              this.Data["Army"] = ["Armee", "Exército", "Armée", "Ordu"][l];
              this.Data["Level"] = ["Stufe", "Nível", "Niveau", "Seviye"][l];
              this.Data["Buildings"] = ["Gebäude", "Edifícios", "Bâtiments", "Binalar"][l];
              this.Data["Health"] = ["Leben", "Vida", "Santé", "Sağlık"][l];
              this.Data["Units"] = ["Einheiten", "Unidades", "Unités", "Üniteler"][l];
              this.Data["Hide Mission Tracker"] = ["Missionsfenster ausblenden", "Esconder janela das Missões", "Cacher la fenêtre de mission", "Görev İzleyicisini Gizle"][l];
              this.Data["none"] = ["keine", "nenhum", "aucun", "hiçbiri"][l];
              this.Data["Cooldown"] = ["Cooldown", "Relocalização", "Recharge", "Cooldown"][l];
              this.Data["Protection"] = ["Geschützt bis", "Protecção", "Protection", "Koruma"][l];
              this.Data["Available weapon"] = ["Verfügbare Artillerie", "Apoio disponível", "arme disponible", "Mevcut silah"][l];
              this.Data["Calibrated on"] = ["Kalibriert auf", "Calibrado em", "Calibré sur ", "Kalibreli"][l];
              this.Data["Total resources"] = ["Gesamt", "Total de recursos", "Ressources totales", "Toplam kaynaklar"][l];
              this.Data["Max. storage"] = ["Max. Kapazität", "Armazenamento Máx.", "Max. de stockage", "Maks. Depo"][l];
              this.Data["Storage full!"] = ["Lager voll!", "Armazenamento cheio!", "Stockage plein", "Depo dolu!"][l];
              this.Data["Storage"] = ["Lagerstand", "Armazenamento", "Stockage", "Depo"][l];
              this.Data["display only top buildings"] = ["Nur Top-Gebäude anzeigen", "Mostrar apenas melhores edifícios", "afficher uniquement les bâtiments principaux", "yalnızca en iyi binaları göster"][l];
              this.Data["display only affordable buildings"] = ["Nur einsetzbare Gebäude anzeigen", "Mostrar apenas edíficios acessíveis", "afficher uniquement les bâtiments abordables", "yalnızca satın alınabilir binaları göster"][l];
              this.Data["City"] = ["Stadt", "Base", "Base", "Şehir"][l];
              this.Data["Type (coord)"] = ["Typ (Koord.)", "Escrever (coord)", "Type (coord)", "Tip (koord.)"][l];
              this.Data["to Level"] = ["Auf Stufe", "para nível", "à Niveau ", "Seviye için"][l];
              this.Data["Gain/h"] = ["Zuwachs/h", "Melhoria/h", "Gain / h", "Kazanç / sa."][l];
              this.Data["Factor"] = ["Faktor", "Factor", "Facteur", "Faktör"][l];
              this.Data["Tib/gain"] = ["Tib./Zuwachs", "Tib/melhoria", "Tib / gain", "Tib/Kazanç"][l];
              this.Data["Pow/gain"] = ["Strom/Zuwachs", "Potencia/melhoria", "Puissance / Gain", "Güç/Kazanç"][l];
              this.Data["ETA"] = ["Verfügbar in", "Tempo restante", "Temps restant", "Kalan Zaman"][l];
              this.Data["Upgrade"] = ["Aufrüsten", "Upgrade", "Upgrade", "Yükselt"][l];
              this.Data["Powerplant"] = ["Kratfwerk", "Central de Energia", "Centrale", "Güç Santrali"][l];
              this.Data["Refinery"] = ["Raffinerie", "Refinaria", "Raffinerie", "Rafineri"][l];
              this.Data["Harvester"] = ["Sammler", "Harvester", "Collecteur", "Biçerdöver"][l];
              this.Data["Silo"] = ["Silo", "Silo", "Silo", "Silo"][l];
              this.Data["Accumulator"] = ["Akkumulator", "Acumulador", "Accumulateur", "Akümülatör"][l];
              this.Data["Calibrate support"] = ["Artillerie kalibrieren", "Calibrar apoio", "Calibrer soutien", "Takviyeyi kalibre et"][l];
              this.Data["Access"] = ["Öffne", "Aceder", "Accès ", "Aç"][l];
              this.Data["Focus on"] = ["Zentriere auf", "Concentrar em", "Centré sur", "Odaklan"][l];
              this.Data["Possible attacks from this base (available CP)"] = ["Mögliche Angriffe (verfügbare KP)", "Possible attacks from this base (available CP)","Possible attacks from this base (available CP)", "Bu üsten yapılması mümkün olan saldırılar (mevcut KP)"][l];
              //this.Data[""] = [""][l];
            },
            get: function (ident) {
              return this.gt(ident);
            },
            gt: function (ident) {
              if (!this.Data || !this.Data[ident]) {
                /*if(!parseInt(ident.substr(0, 1), 10) && ident != "0") {
                  console.log("missing language data: " + ident);
                }*/
                return ident;
              }
              return this.Data[ident];
            }
          }
        }),

        // define Base
        qx.Class.define("MaelstromTools.Base", {
          type: "singleton",
          extend: qx.core.Object,
          members: {
            /* Desktop */
            timerInterval: 1500,
            mainTimerInterval: 5000,
            lootStatusInfoInterval: null,
            images: null,
            mWindows: null,
            mainMenuWindow: null,

            itemsOnDesktop: null,
            itemsOnDesktopCount: null,
            itemsInMainMenu: null,
            itemsInMainMenuCount: null,
            buttonCollectAllResources: null,
            buttonRepairAllUnits: null,
            buttonRepairAllBuildings: null,

            lootWidget: null,

            initialize: function () {
              try {
                //console.log(qx.locale.Manager.getInstance().getLocale());
                Lang.loadData(qx.locale.Manager.getInstance().getLocale());
                //console.log("Client version: " + MaelstromTools.Wrapper.GetClientVersion());
                this.itemsOnDesktopCount = new Array();
                this.itemsOnDesktop = new Object();
                this.itemsInMainMenuCount = new Array();
                this.itemsInMainMenu = new Object();

                var fileManager = ClientLib.File.FileManager.GetInstance();
                //ui/icons/icon_mainui_defense_button
                //ui/icons/icon_mainui_base_button
                //ui/icons/icon_army_points
                //icon_def_army_points
                var factionText = ClientLib.Base.Util.GetFactionGuiPatchText();
                this.createNewImage(MaelstromTools.Statics.Tiberium, "ui/common/icn_res_tiberium.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Crystal, "ui/common/icn_res_chrystal.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Power, "ui/common/icn_res_power.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Dollar, "ui/common/icn_res_dollar.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Research, "ui/common/icn_res_research.png", fileManager);
                this.createNewImage("Sum", "ui/common/icn_build_slots.png", fileManager);
                this.createNewImage("AccessBase", "ui/" + factionText + "/icons/icon_mainui_enterbase.png", fileManager);
                this.createNewImage("FocusBase", "ui/" + factionText + "/icons/icon_mainui_focusbase.png", fileManager);
                this.createNewImage("Packages", "ui/" + factionText + "/icons/icon_collect_packages.png", fileManager);
                this.createNewImage("RepairAllUnits", "ui/" + factionText + "/icons/icon_army_points.png", fileManager);
                this.createNewImage("RepairAllBuildings", "ui/" + factionText + "/icons/icn_build_slots.png", fileManager);
                this.createNewImage("ResourceOverviewMenu", "ui/common/icn_res_chrystal.png", fileManager);
                this.createNewImage("ProductionMenu", "ui/" + factionText + "/icons/icn_build_slots.png", fileManager);
                this.createNewImage("RepairTimeMenu", "ui/" + factionText + "/icons/icon_repair_all_button.png", fileManager);
                this.createNewImage("Crosshair", "ui/icons/icon_support_tnk_white.png", fileManager);
                this.createNewImage("UpgradeBuilding", "ui/" + factionText + "/icons/icon_building_detail_upgrade.png", fileManager);

                this.createNewWindow("MainMenu", "R", 125, 140, 120, 100, "B");
                this.createNewWindow("Production", "L", 120, 60, 340, 140);
                this.createNewWindow("RepairTime", "L", 120, 60, 340, 140);
                this.createNewWindow("ResourceOverview", "L", 120, 60, 340, 140);
                this.createNewWindow("BaseStatusOverview", "L", 120, 60, 340, 140);
                this.createNewWindow("Preferences", "L", 120, 60, 440, 140);
                this.createNewWindow("UpgradePriority", "L", 120, 60, 870, 400);

                if (!this.mainMenuWindow) {
                  this.mainMenuWindow = new qx.ui.popup.Popup(new qx.ui.layout.Canvas()).set({
                    //backgroundColor: "#303030",
                    padding: 5,
                    paddingRight: 0
                  });
                  if (MT_Preferences.Settings.useDedicatedMainMenu) {
                    this.mainMenuWindow.setPlaceMethod("mouse");
                    this.mainMenuWindow.setPosition("top-left");
                  } else {
                    this.mainMenuWindow.setPlaceMethod("widget");
                    this.mainMenuWindow.setPosition("bottom-right");
                    this.mainMenuWindow.setAutoHide(false);
                    this.mainMenuWindow.setBackgroundColor("transparent");
                    this.mainMenuWindow.setShadow(null);
                    this.mainMenuWindow.setDecorator(new qx.ui.decoration.Background());
                  }
                }

                var desktopPositionModifier = 0;

                this.buttonCollectAllResources = this.createDesktopButton(Lang.gt("Collect all packages"), "Packages", true, this.desktopPosition(desktopPositionModifier));
                this.buttonCollectAllResources.addListener("execute", this.collectAllPackages, this);

                var openProductionWindowButton = this.createDesktopButton(Lang.gt("Overall production"), "ProductionMenu", false, this.desktopPosition(desktopPositionModifier));
                openProductionWindowButton.addListener("execute", function () {
                  window.MaelstromTools.Production.getInstance().openWindow("Production", Lang.gt("Overall production"));
                }, this);

                var openResourceOverviewWindowButton = this.createDesktopButton(Lang.gt("Base resources"), "ResourceOverviewMenu", false, this.desktopPosition(desktopPositionModifier));
                openResourceOverviewWindowButton.addListener("execute", function () {
                  window.MaelstromTools.ResourceOverview.getInstance().openWindow("ResourceOverview", Lang.gt("Base resources"));
                }, this);

                desktopPositionModifier++;
                var openMainMenuButton = this.createDesktopButton(Lang.gt("Main menu"), "ProductionMenu", false, this.desktopPosition(desktopPositionModifier));
                openMainMenuButton.addListener("click", function (e) {
                  this.mainMenuWindow.placeToMouse(e);
                  this.mainMenuWindow.show();
                }, this);

                this.buttonRepairAllUnits = this.createDesktopButton(Lang.gt("Repair all units"), "RepairAllUnits", true, this.desktopPosition(desktopPositionModifier));
                this.buttonRepairAllUnits.addListener("execute", this.repairAllUnits, this);

                this.buttonRepairAllBuildings = this.createDesktopButton(Lang.gt("Repair all buildings"), "RepairAllBuildings", true, this.desktopPosition(desktopPositionModifier));
                this.buttonRepairAllBuildings.addListener("execute", this.repairAllBuildings, this);

                var openRepairTimeWindowButton = this.createDesktopButton(Lang.gt("Army overview"), "RepairTimeMenu", false, this.desktopPosition(desktopPositionModifier));
                openRepairTimeWindowButton.addListener("execute", function () {
                  window.MaelstromTools.RepairTime.getInstance().openWindow("RepairTime", Lang.gt("Army overview"));
                }, this);

                var openBaseStatusOverview = this.createDesktopButton(Lang.gt("Base status overview"), "Crosshair", false, this.desktopPosition(desktopPositionModifier));
                openBaseStatusOverview.addListener("execute", function () {
                  window.MaelstromTools.BaseStatus.getInstance().openWindow("BaseStatusOverview", Lang.gt("Base status overview"));
                }, this);

                desktopPositionModifier++;
                var openHuffyUpgradeOverview = this.createDesktopButton(Lang.gt("Upgrade priority overview"), "UpgradeBuilding", false, this.desktopPosition(desktopPositionModifier));
                openHuffyUpgradeOverview.addListener("execute", function () {
                  window.HuffyTools.UpgradePriorityGUI.getInstance().openWindow("UpgradePriority", Lang.gt("Upgrade priority overview"));
                }, this);

                desktopPositionModifier++;
                var preferencesButton = new qx.ui.form.Button(Lang.gt("Options")).set({
                  appearance: "button-text-small",
                  width: 100,
                  minWidth: 100,
                  maxWidth: 100
                });
                preferencesButton.setUserData("desktopPosition", this.desktopPosition(desktopPositionModifier));
                preferencesButton.addListener("execute", function () {
                  window.MaelstromTools.Preferences.getInstance().openWindow("Preferences", Lang.gt("MaelstromTools Preferences"), true);
                }, this);

                if (MT_Preferences.Settings.useDedicatedMainMenu) {
                  this.addToDesktop("MainMenu", openMainMenuButton);
                }
                this.addToMainMenu("ResourceOverviewMenu", openResourceOverviewWindowButton);
                this.addToMainMenu("ProductionMenu", openProductionWindowButton);
                this.addToMainMenu("BaseStatusMenu", openBaseStatusOverview);
                this.addToMainMenu("RepairTimeMenu", openRepairTimeWindowButton);
                this.addToMainMenu("UpgradeBuilding", openHuffyUpgradeOverview);

                this.addToMainMenu("PreferencesMenu", preferencesButton);

                if (!MT_Preferences.Settings.useDedicatedMainMenu) {
                  this.mainMenuWindow.show();
                  var target = qx.core.Init.getApplication().getOptionsBar(); //getServerBar(); //qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_APPOINTMENTS);
                  this.mainMenuWindow.placeToWidget(target, true);
                }

                webfrontend.gui.chat.ChatWidget.recvbufsize = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.CHATHISTORYLENGTH, 64);
                this.runSecondlyTimer();
                this.runMainTimer();
                this.runAutoCollectTimer();
              } catch (e) {
                console.log("MaelstromTools.initialize: ", e);
              }
            },

            desktopPosition: function (modifier) {
              if (!modifier) modifier = 0;
              return modifier;
            },

            createDesktopButton: function (title, imageName, isNotification, desktopPosition) {
              try {
                if (!isNotification) {
                  isNotification = false;
                }
                if (!desktopPosition) {
                  desktopPosition = this.desktopPosition();
                }
                var desktopButton = new qx.ui.form.Button(null, this.images[imageName]).set({
                  toolTipText: title,
                  width: 50,
                  height: 40,
                  maxWidth: 50,
                  maxHeight: 40,
                  appearance: (isNotification ? "button-standard-nod" : "button-playarea-mode-frame"), //"button-standard-"+factionText), button-playarea-mode-red-frame
                  center: true
                });

                desktopButton.setUserData("isNotification", isNotification);
                desktopButton.setUserData("desktopPosition", desktopPosition);
                return desktopButton;
              } catch (e) {
                console.log("MaelstromTools.createDesktopButton: ", e);
              }
            },

            createNewImage: function (name, path, fileManager) {
              try {
                if (!this.images) {
                  this.images = new Object();
                }
                if (!fileManager) {
                  return;
                }

                this.images[name] = fileManager.GetPhysicalPath(path);
              } catch (e) {
                console.log("MaelstromTools.createNewImage: ", e);
              }
            },

            createNewWindow: function (name, align, x, y, w, h, alignV) {
              try {
                if (!this.mWindows) {
                  this.mWindows = new Object();
                }
                this.mWindows[name] = new Object();
                this.mWindows[name]["Align"] = align;
                this.mWindows[name]["AlignV"] = alignV;
                this.mWindows[name]["x"] = x;
                this.mWindows[name]["y"] = y;
                this.mWindows[name]["w"] = w;
                this.mWindows[name]["h"] = h;
              } catch (e) {
                console.log("MaelstromTools.createNewWindow: ", e);
              }
            },

            addToMainMenu: function (name, button) {
              try {
                /*if(!this.useDedicatedMainMenu) {
                  return;
                }*/
                if (this.itemsInMainMenu[name] != null) {
                  return;
                }
                var desktopPosition = button.getUserData("desktopPosition");
                var isNotification = button.getUserData("isNotification");
                if (!desktopPosition) {
                  desktopPosition = this.desktopPosition();
                }
                if (!isNotification) {
                  isNotification = false;
                }

                if (isNotification && MT_Preferences.Settings.useDedicatedMainMenu) {
                  this.addToDesktop(name, button);
                } else {
                  if (!this.itemsInMainMenuCount[desktopPosition]) {
                    this.itemsInMainMenuCount[desktopPosition] = 0;
                  }
                  this.mainMenuWindow.add(button, {
                    right: 5 + (52 * this.itemsInMainMenuCount[desktopPosition]),
                    top: 0 + (42 * (desktopPosition)) //bottom: 0 - (42 * (desktopPosition - 1))
                  });

                  this.itemsInMainMenu[name] = button;
                  this.itemsInMainMenuCount[desktopPosition]++;
                }
              } catch (e) {
                console.log("MaelstromTools.addToMainMenu: ", e);
              }
            },

            removeFromMainMenu: function (name, rearrange) {
              try {
                if (rearrange == null) {
                  rearrange = true;
                }
                if (this.itemsOnDesktop[name] != null) {
                  var isNotification = this.itemsOnDesktop[name].getUserData("isNotification");
                  if (!isNotification) {
                    isNotification = false;
                  }
                  if (isNotification && MT_Preferences.Settings.useDedicatedMainMenu) {
                    this.removeFromDesktop(name, rearrange);
                  }
                } else if (this.itemsInMainMenu[name] != null) {
                  var desktopPosition = this.itemsInMainMenu[name].getUserData("desktopPosition");
                  var isNotification = this.itemsInMainMenu[name].getUserData("isNotification");
                  if (!desktopPosition) {
                    desktopPosition = this.desktopPosition();
                  }
                  if (!isNotification) {
                    isNotification = false;
                  }

                  this.mainMenuWindow.remove(this.itemsInMainMenu[name]);
                  this.itemsInMainMenu[name] = null;
                  this.itemsInMainMenuCount[desktopPosition]--;

                  if (rearrange && this.itemsInMainMenu[desktopPosition] > 1) {
                    var tmpItems = new Object();
                    // remove notifications 
                    for (var itemName in this.itemsOnDesktop) {
                      if (this.itemsInMainMenu[itemName] == null) {
                        continue;
                      }
                      if (!isNotification) {
                        continue;
                      }
                      tmpItems[itemName] = this.itemsInMainMenu[itemName];
                      this.removeFromMainMenu(itemName, false);
                    }
                    // rearrange notifications
                    for (var itemName2 in tmpItems) {
                      var tmp = tmpItems[itemName2];
                      if (tmp == null) {
                        continue;
                      }
                      this.addToMainMenu(itemName2, tmp);
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.removeFromDesktop: ", e);
              }
            },

            addToDesktop: function (name, button) {
              try {
                if (this.itemsOnDesktop[name] != null) {
                  return;
                }
                var desktopPosition = button.getUserData("desktopPosition");
                if (!desktopPosition) {
                  desktopPosition = this.desktopPosition();
                }

                if (!this.itemsOnDesktopCount[desktopPosition]) {
                  this.itemsOnDesktopCount[desktopPosition] = 0;
                }

                var app = qx.core.Init.getApplication();
                //var navBar = app.getNavigationBar();

                // console.log("add to Desktop at pos: " + this.itemsOnDesktopCount);
                app.getDesktop().add(button, {
                  //right: navBar.getBounds().width + (52 * this.itemsOnDesktopCount[desktopPosition]),
                  //top: 42 * (desktopPosition - 1)
                  right: 5 + (52 * this.itemsOnDesktopCount[desktopPosition]),
                  //top: this.initialAppointmentBarHeight + 125 + (42 * (desktopPosition - 1))
                  bottom: 140 - (42 * (desktopPosition - 1))
                });

                this.itemsOnDesktop[name] = button;
                this.itemsOnDesktopCount[desktopPosition]++;
              } catch (e) {
                console.log("MaelstromTools.addToDesktop: ", e);
              }
            },

            removeFromDesktop: function (name, rearrange) {
              try {
                if (rearrange == null) {
                  rearrange = true;
                }
                var app = qx.core.Init.getApplication();

                if (this.itemsOnDesktop[name] != null) {
                  var desktopPosition = this.itemsOnDesktop[name].getUserData("desktopPosition");
                  var isNotification = this.itemsOnDesktop[name].getUserData("isNotification");
                  if (!desktopPosition) {
                    desktopPosition = this.desktopPosition();
                  }
                  if (!isNotification) {
                    isNotification = false;
                  }

                  app.getDesktop().remove(this.itemsOnDesktop[name]);
                  this.itemsOnDesktop[name] = null;
                  this.itemsOnDesktopCount[desktopPosition]--;

                  if (rearrange && this.itemsOnDesktopCount[desktopPosition] > 1) {
                    var tmpItems = new Object();
                    // remove notifications 
                    for (var itemName in this.itemsOnDesktop) {
                      if (this.itemsOnDesktop[itemName] == null) {
                        continue;
                      }
                      if (!this.itemsOnDesktop[itemName].getUserData("isNotification")) {
                        continue;
                      }
                      tmpItems[itemName] = this.itemsOnDesktop[itemName];
                      this.removeFromDesktop(itemName, false);
                    }
                    // rearrange notifications
                    for (var itemName2 in tmpItems) {
                      var tmp = tmpItems[itemName2];
                      if (tmp == null) {
                        continue;
                      }
                      this.addToMainMenu(itemName2, tmp);
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.removeFromDesktop: ", e);
              }
            },

            runSecondlyTimer: function () {
              try {
                this.calculateCostsForNextMCV();

                var self = this;
                window.setTimeout(function () {
                  self.runSecondlyTimer();
                }, 1000);
              } catch (e) {
                console.log("MaelstromTools.runSecondlyTimer: ", e);
              }
            },

            runMainTimer: function () {
              try {
                this.checkForPackages();
                if (CCTAWrapperIsInstalled()) {
                  this.checkRepairAllUnits();
                  this.checkRepairAllBuildings();
                }

                var missionTracker = typeof (qx.core.Init.getApplication().getMissionsBar) === 'function' ? qx.core.Init.getApplication().getMissionsBar() : qx.core.Init.getApplication().getMissionTracker(); //fix for PerforceChangelist>=376877
                if (MT_Preferences.Settings.autoHideMissionTracker) {
                  if (missionTracker.isVisible()) {
                    missionTracker.hide();
                  }
                  if (typeof (qx.core.Init.getApplication().getMissionsBar) === 'function') {
                    if (qx.core.Init.getApplication().getMissionsBar().getSizeHint().height != 0) {
                      qx.core.Init.getApplication().getMissionsBar().getSizeHint().height = 0;
                      qx.core.Init.getApplication().triggerDesktopResize();
                    }
                  }
                } else {
                  if (!missionTracker.isVisible()) {
                    missionTracker.show();
                    if (typeof (qx.core.Init.getApplication().getMissionsBar) === 'function') {
                      qx.core.Init.getApplication().getMissionsBar().initHeight();
                      qx.core.Init.getApplication().triggerDesktopResize();
                    }
                  }
                }
                
                var self = this;
                window.setTimeout(function () {
                  self.runMainTimer();
                }, this.mainTimerInterval);
              } catch (e) {
                console.log("MaelstromTools.runMainTimer: ", e);
              }
            },

            runAutoCollectTimer: function () {
              try {
                //console.log("runAutoCollectTimer ", MT_Preferences.Settings.AutoCollectTimer);
                if (!CCTAWrapperIsInstalled()) return; // run timer only then wrapper is running
                if (this.checkForPackages() && MT_Preferences.Settings.autoCollectPackages) {
                  this.collectAllPackages();
                }
                if (this.checkRepairAllUnits() && MT_Preferences.Settings.autoRepairUnits) {
                  this.repairAllUnits();
                }
                if (this.checkRepairAllBuildings() && MT_Preferences.Settings.autoRepairBuildings) {
                  this.repairAllBuildings();
                }

                var self = this;
                window.setTimeout(function () {
                  self.runAutoCollectTimer();
                }, MT_Preferences.Settings.AutoCollectTimer * 60000);
              } catch (e) {
                console.log("MaelstromTools.runMainTimer: ", e);
              }
            },

            openWindow: function (windowObj, windowName, skipMoveWindow) {
              try {
                if (!windowObj.isVisible()) {
                  if (windowName == "MainMenu") {
                    windowObj.show();
                  } else {
                    if (!skipMoveWindow) {
                      this.moveWindow(windowObj, windowName);
                    }
                    windowObj.open();
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.openWindow: ", e);
              }
            },

            moveWindow: function (windowObj, windowName) {
              try {
                var x = this.mWindows[windowName]["x"];
                var y = this.mWindows[windowName]["y"];
                if (this.mWindows[windowName]["Align"] == "R") {
                  x = qx.bom.Viewport.getWidth(window) - this.mWindows[windowName]["x"];
                }
                if (this.mWindows[windowName]["AlignV"] == "B") {
                  y = qx.bom.Viewport.getHeight(window) - this.mWindows[windowName]["y"] - windowObj.height;
                }
                windowObj.moveTo(x, y);
                if (windowName != "MainMenu") {
                  windowObj.setHeight(this.mWindows[windowName]["h"]);
                  windowObj.setWidth(this.mWindows[windowName]["w"]);
                }
              } catch (e) {
                console.log("MaelstromTools.moveWindow: ", e);
              }
            },

            checkForPackages: function () {
              try {
                MT_Cache.updateCityCache();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (ncity.get_CityBuildingsData().get_HasCollectableBuildings()) {
                    this.addToMainMenu("CollectAllResources", this.buttonCollectAllResources);
                    return true;
                  }
                }
                this.removeFromMainMenu("CollectAllResources");
                return false;
              } catch (e) {
                console.log("MaelstromTools.checkForPackages: ", e);
                return false;
              }
            },

            collectAllPackages: function () {
              try {
                MT_Cache.updateCityCache();
                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (ncity.get_CityBuildingsData().get_HasCollectableBuildings()) {
                    if (MT_Cache.CityCount <= 1) {
                      var buildings = ncity.get_Buildings().d;
                      for (var x in buildings) {
                        var building = buildings[x];
                        if (building.get_ProducesPackages() && building.get_ReadyToCollect()) {
                          ClientLib.Net.CommunicationManager.GetInstance().SendCommand("CollectResource",{cityid:ncity.get_Id(), posX:building.get_CoordX(),posY:building.get_CoordY()}, null, null, true);
                        }
                      }
                    } else {
                      ncity.CollectAllResources();
                    }
                  }
                }
                this.removeFromMainMenu("CollectAllResources");
              } catch (e) {
                console.log("MaelstromTools.collectAllPackages: ", e);
              }
            },

            checkRepairAll: function (visMode, buttonName, button) {
              try {
                MT_Cache.updateCityCache();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (MaelstromTools.Wrapper.CanRepairAll(ncity, visMode)) {
                    this.addToMainMenu(buttonName, button);
                    return true;
                  }
                }

                this.removeFromMainMenu(buttonName);
                return false;
              } catch (e) {
                console.log("MaelstromTools.checkRepairAll: ", e);
                return false;
              }
            },

            checkRepairAllUnits: function () {
              return this.checkRepairAll(ClientLib.Vis.Mode.ArmySetup, "RepairAllUnits", this.buttonRepairAllUnits);
            },

            checkRepairAllBuildings: function () {
              return this.checkRepairAll(ClientLib.Vis.Mode.City, "RepairAllBuildings", this.buttonRepairAllBuildings);
            },

            repairAll: function (visMode, buttonName) {
              try {
                MT_Cache.updateCityCache();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (MaelstromTools.Wrapper.CanRepairAll(ncity, visMode)) {
                    MaelstromTools.Wrapper.RepairAll(ncity, visMode);
                  }

                }
                this.removeFromMainMenu(buttonName);
              } catch (e) {
                console.log("MaelstromTools.repairAll: ", e);
              }
            },

            //ClientLib.Data.City.prototype.get_CityRepairData
            //ClientLib.Data.CityRepair.prototype.CanRepairAll
            //ClientLib.Data.CityRepair.prototype.RepairAll
            repairAllUnits: function () {
              try {
                this.repairAll(ClientLib.Vis.Mode.ArmySetup, "RepairAllUnits");
              } catch (e) {
                console.log("MaelstromTools.repairAllUnits: ", e);
              }
            },

            repairAllBuildings: function () {
              try {
                this.repairAll(ClientLib.Vis.Mode.City, "RepairAllBuildings");
              } catch (e) {
                console.log("MaelstromTools.repairAllBuildings: ", e);
              }
            },

            updateLoot: function (ident, visCity, widget) {
              try {
                clearInterval(this.lootStatusInfoInterval);
                if (!MT_Preferences.Settings.showLoot) {
                  if (this.lootWidget[ident]) {
                    this.lootWidget[ident].removeAll();
                  }
                  return;
                }

                var baseLoadState = MT_Cache.updateLoot(visCity);
                if (baseLoadState == -2) { // base already cached and base not changed
                  return;
                }

                if (!this.lootWidget) {
                  this.lootWidget = new Object();
                }
                if (!this.lootWidget[ident]) {
                  this.lootWidget[ident] = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                  this.lootWidget[ident].setTextColor("white");
                  widget.add(this.lootWidget[ident]);
                }
                var lootWidget = this.lootWidget[ident];

                var rowIdx = 1;
                var colIdx = 1;
                lootWidget.removeAll();
                switch (baseLoadState) {
                  case -1:
                    {
                      MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, "Target out of range, no resource calculation possible", null, null, 'bold', null);
                      break;
                    }
                  case 1:
                    {
                      var Resources = MT_Cache.SelectedBaseResources;
                      this.createResourceLabels(lootWidget, ++rowIdx, "Possible attacks from this base (available CP)", Resources, - 1);
                      this.createResourceLabels(lootWidget, ++rowIdx, "Lootable resources", Resources, 1);
                      this.createResourceLabels(lootWidget, ++rowIdx, "per CP", Resources, 1 * Resources.CPNeeded);
                      this.createResourceLabels(lootWidget, ++rowIdx, "2nd run", Resources, 2 * Resources.CPNeeded);
                      this.createResourceLabels(lootWidget, ++rowIdx, "3rd run", Resources, 3 * Resources.CPNeeded);
                      break;
                    }
                  default:
                    {
                      MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, "Calculating resources...", null, null, 'bold', null);
                      this.lootStatusInfoInterval = setInterval(function () {
                        MaelstromTools.Base.getInstance().updateLoot(ident, visCity, widget);
                      }, 100);
                      break;
                    }
                }
              } catch (e) {
                console.log("MaelstromTools.updateLoot: ", e);
              }
            },

            createResourceLabels: function (lootWidget, rowIdx, Label, Resources, Modifier) {
              var colIdx = 1;
              var font = (Modifier > 1 ? null : 'bold');

              if (Modifier == -1 && Resources.CPNeeded > 0) {
                Label = Lang.gt(Label) + ": " + Math.floor(ClientLib.Data.MainData.GetInstance().get_Player().GetCommandPointCount() / Resources.CPNeeded);
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, Label, null, 'left', font, null, 9);
                return;
              }
              colIdx = 1;
              if (Modifier > 0) {
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, Lang.gt(Label) + ":", null, null, font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Research));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Research] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Tiberium));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Tiberium] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Crystal));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Crystal] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Dollar));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Dollar] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage("Sum"));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources["Total"] / Modifier), 50, 'right', font);
              }
            },

            mcvPopup: null,
            mcvPopupX : 0,
            mcvPopupY : 0,
            mcvTimerLabel: null,
            calculateCostsForNextMCV: function () {
              try {
                if (!MT_Preferences.Settings.showCostsForNextMCV) {
                  if (this.mcvPopup) {
                    this.mcvPopup.close();
                  }
                  return;
                }
                var player = ClientLib.Data.MainData.GetInstance().get_Player();
                var cw = player.get_Faction();
                var cj = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound, cw);
                var cr = player.get_PlayerResearch();
                var cd = cr.GetResearchItemFomMdbId(cj);
                if (cd == null) {
                  if (this.mcvPopup) {
                    this.mcvPopup.close();
                  }
                  return;
                }

                if (!this.mcvPopup) {
                  this.mcvPopup = new qx.ui.window.Window("").set({
                    contentPadding : 0,
                    showMinimize : false,
                    showMaximize : false,
                    showClose : false,
                    resizable : false
                  });
                  this.mcvPopup.setLayout(new qx.ui.layout.VBox());
                  this.mcvPopup.addListener("move", function (e) {
                    var base = MaelstromTools.Base.getInstance();
                    var size = qx.core.Init.getApplication().getRoot().getBounds();
                    var value = size.width - e.getData().left;
                    base.mcvPopupX = value < 0 ? 150 : value;
                    value = size.height - e.getData().top;
                    base.mcvPopupY = value < 0 ? 70 : value;
                    MaelstromTools.LocalStorage.set("mcvPopup", {
                      x : base.mcvPopupX,
                      y : base.mcvPopupY
                    });
                  });
                  var font = qx.bom.Font.fromString('bold').set({
                    size: 20
                  });

                  this.mcvTimerLabel = new qx.ui.basic.Label().set({
                    font: font,
                    textColor: 'red',
                    width: 155,
                    textAlign: 'center',
                    marginBottom : 5
                  });
                  this.mcvPopup.add(this.mcvTimerLabel);
                  var serverBar = qx.core.Init.getApplication().getServerBar().getBounds();
                  var pos = MaelstromTools.LocalStorage.get("mcvPopup", {
                      x : serverBar.width + 150,
                      y : 70
                    });
                  this.mcvPopupX = pos.x;
                  this.mcvPopupY = pos.y;
                  this.mcvPopup.open();
                }
                var size = qx.core.Init.getApplication().getRoot().getBounds();
                this.mcvPopup.moveTo(size.width - this.mcvPopupX, size.height - this.mcvPopupY);

                var nextLevelInfo = cd.get_NextLevelInfo_Obj();
                var resourcesNeeded = new Array();
                for (var i in nextLevelInfo.rr) {
                  if (nextLevelInfo.rr[i].t > 0) {
                    resourcesNeeded[nextLevelInfo.rr[i].t] = nextLevelInfo.rr[i].c;
                  }
                }
                //var researchNeeded = resourcesNeeded[ClientLib.Base.EResourceType.ResearchPoints];
                //var currentResearchPoints = player.get_ResearchPoints();

                var creditsNeeded = resourcesNeeded[ClientLib.Base.EResourceType.Gold];
                var creditsResourceData = player.get_Credits();
                var creditGrowthPerHour = (creditsResourceData.Delta + creditsResourceData.ExtraBonusDelta) * ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
                var creditTimeLeftInHours = (creditsNeeded - player.GetCreditsCount()) / creditGrowthPerHour;

                if (creditGrowthPerHour == 0 || creditTimeLeftInHours <= 0) {
                  if (this.mcvPopup) {
                    this.mcvPopup.close();
                  }
                  return;
                }

                this.mcvPopup.setCaption(Lang.gt("Next MCV") + " ($ " + MaelstromTools.Wrapper.FormatNumbersCompact(creditsNeeded) + ")");
                this.mcvTimerLabel.setValue(MaelstromTools.Wrapper.FormatTimespan(creditTimeLeftInHours * 60 * 60));

                if (!this.mcvPopup.isVisible()) {
                  this.mcvPopup.open();
                }
              } catch (e) {
                console.log("calculateCostsForNextMCV", e);
              }
            }
          }
        });

        // define Preferences
        qx.Class.define("MaelstromTools.Preferences", {
          type: "singleton",
          extend: qx.core.Object,

          statics: {
            USEDEDICATEDMAINMENU: "useDedicatedMainMenu",
            AUTOCOLLECTPACKAGES: "autoCollectPackages",
            AUTOREPAIRUNITS: "autoRepairUnits",
            AUTOREPAIRBUILDINGS: "autoRepairBuildings",
            AUTOHIDEMISSIONTRACKER: "autoHideMissionTracker",
            AUTOCOLLECTTIMER: "AutoCollectTimer",
            SHOWLOOT: "showLoot",
            SHOWCOSTSFORNEXTMCV: "showCostsForNextMCV",
            CHATHISTORYLENGTH: "ChatHistoryLength"
          },

          members: {
            Window: null,
            Widget: null,
            Settings: null,
            FormElements: null,

            readOptions: function () {
              try {
                if (!this.Settings) {
                  this.Settings = new Object();
                }

                /*
                if(MaelstromTools.LocalStorage.get("useDedicatedMainMenu") == null) {
                  if(qx.bom.Viewport.getWidth(window) > 1800) {
                    this.Settings["useDedicatedMainMenu"] = false;
                  }
                } else {
                  this.Settings["useDedicatedMainMenu"] = (MaelstromTools.LocalStorage.get("useDedicatedMainMenu", 1) == 1);
                }*/
                this.Settings[MaelstromTools.Preferences.USEDEDICATEDMAINMENU] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.USEDEDICATEDMAINMENU, 1) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOCOLLECTPACKAGES] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOCOLLECTPACKAGES, 0) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOREPAIRUNITS] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOREPAIRUNITS, 0) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOREPAIRBUILDINGS] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOREPAIRBUILDINGS, 0) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER, 0) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOCOLLECTTIMER] = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOCOLLECTTIMER, 60);
                this.Settings[MaelstromTools.Preferences.SHOWLOOT] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.SHOWLOOT, 1) == 1);
                this.Settings[MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV, 1) == 1);
                this.Settings[MaelstromTools.Preferences.CHATHISTORYLENGTH] = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.CHATHISTORYLENGTH, 64);

                if (!CCTAWrapperIsInstalled()) {
                  this.Settings[MaelstromTools.Preferences.AUTOREPAIRUNITS] = false;
                  this.Settings[MaelstromTools.Preferences.AUTOREPAIRBUILDINGS] = false;
                  //this.Settings[MaelstromTools.Preferences.SHOWLOOT] = false;
                }
                //console.log(this.Settings);

              } catch (e) {
                console.log("MaelstromTools.Preferences.readOptions: ", e);
              }
            },

            openWindow: function (WindowName, WindowTitle) {
              try {
                if (!this.Window) {
                  //this.Window = new qx.ui.window.Window(WindowTitle).set({
                  this.Window = new webfrontend.gui.OverlayWindow().set({
                    autoHide: false,
                    title: WindowTitle,
                    minHeight: 350

                    //resizable: false,
                    //showMaximize:false,
                    //showMinimize:false,
                    //allowMaximize:false,
                    //allowMinimize:false,
                    //showStatusbar: false
                  });
                  this.Window.clientArea.setPadding(10);
                  this.Window.clientArea.setLayout(new qx.ui.layout.VBox(3));

                  this.Widget = new qx.ui.container.Composite(new qx.ui.layout.Grid().set({
                    spacingX: 5,
                    spacingY: 5
                  }));

                  //this.Widget.setTextColor("white");

                  this.Window.clientArea.add(this.Widget);
                }

                if (this.Window.isVisible()) {
                  this.Window.close();
                } else {
                  MT_Base.openWindow(this.Window, WindowName);
                  this.setWidgetLabels();
                }
              } catch (e) {
                console.log("MaelstromTools.Preferences.openWindow: ", e);
              }
            },

            addFormElement: function (name, element) {
              this.FormElements[name] = element;
            },

            setWidgetLabels: function () {
              try {
                this.readOptions();

                this.FormElements = new Object();
                this.Widget.removeAll();
                var rowIdx = 1;
                var colIdx = 1;

                var chkAutoHideMissionTracker = new qx.ui.form.CheckBox(Lang.gt("Hide Mission Tracker")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER] == 1
                });
                var chkUseDedicatedMainMenu = new qx.ui.form.CheckBox(Lang.gt("Use dedicated Main Menu (restart required)")).set({
                  value: this.Settings[MaelstromTools.Preferences.USEDEDICATEDMAINMENU] == 1
                });
                var chkShowLoot = new qx.ui.form.CheckBox(Lang.gt("Show lootable resources (restart required)")).set({
                  value: this.Settings[MaelstromTools.Preferences.SHOWLOOT] == 1/*,
                  enabled: CCTAWrapperIsInstalled()*/
                });
                var chkCostsNextMCV = new qx.ui.form.CheckBox(Lang.gt("Show time to next MCV")).set({
                  value: this.Settings[MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV] == 1
                });
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoHideMissionTracker, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkUseDedicatedMainMenu, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkShowLoot, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkCostsNextMCV, 2);

                var chkAutoCollectPackages = new qx.ui.form.CheckBox(Lang.gt("Autocollect packages")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOCOLLECTPACKAGES] == 1
                });
                var chkAutoRepairUnits = new qx.ui.form.CheckBox(Lang.gt("Autorepair units")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOREPAIRUNITS] == 1,
                  enabled: CCTAWrapperIsInstalled()
                });
                var chkAutoRepairBuildings = new qx.ui.form.CheckBox(Lang.gt("Autorepair buildings")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOREPAIRBUILDINGS] == 1,
                  enabled: CCTAWrapperIsInstalled()
                });

                var spinnerChatHistoryLength = new qx.ui.form.Spinner().set({
                  minimum: 64,
                  maximum: 512,
                  value: this.Settings[MaelstromTools.Preferences.CHATHISTORYLENGTH]
                });

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, Lang.gt("Chat history length") + " (" + spinnerChatHistoryLength.getMinimum() + " - " + spinnerChatHistoryLength.getMaximum() + ")");
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx + 1, spinnerChatHistoryLength);

                var spinnerAutoCollectTimer = new qx.ui.form.Spinner().set({
                  minimum: 5,
                  maximum: 60 * 6,
                  value: this.Settings[MaelstromTools.Preferences.AUTOCOLLECTTIMER]
                });

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, Lang.gt("Automatic interval in minutes") + " (" + spinnerAutoCollectTimer.getMinimum() + " - " + spinnerAutoCollectTimer.getMaximum() + ")");
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx + 1, spinnerAutoCollectTimer);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoCollectPackages, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoRepairUnits, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoRepairBuildings, 2);

                var applyButton = new qx.ui.form.Button(Lang.gt("Apply changes")).set({
                  appearance: "button-detailview-small",
                  width: 120,
                  minWidth: 120,
                  maxWidth: 120
                });
                applyButton.addListener("execute", this.applyChanges, this);

                var cancelButton = new qx.ui.form.Button(Lang.gt("Discard changes")).set({
                  appearance: "button-detailview-small",
                  width: 120,
                  minWidth: 120,
                  maxWidth: 120
                });
                cancelButton.addListener("execute", function () {
                  this.Window.close();
                }, this);

                var resetButton = new qx.ui.form.Button(Lang.gt("Reset to default")).set({
                  appearance: "button-detailview-small",
                  width: 120,
                  minWidth: 120,
                  maxWidth: 120
                });
                resetButton.addListener("execute", this.resetToDefault, this);

                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, resetButton);
                colIdx = 1;
                MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, cancelButton);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, applyButton);

                this.addFormElement(MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER, chkAutoHideMissionTracker);
                this.addFormElement(MaelstromTools.Preferences.USEDEDICATEDMAINMENU, chkUseDedicatedMainMenu);
                this.addFormElement(MaelstromTools.Preferences.SHOWLOOT, chkShowLoot);
                this.addFormElement(MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV, chkCostsNextMCV);
                this.addFormElement(MaelstromTools.Preferences.AUTOCOLLECTPACKAGES, chkAutoCollectPackages);
                this.addFormElement(MaelstromTools.Preferences.AUTOREPAIRUNITS, chkAutoRepairUnits);
                this.addFormElement(MaelstromTools.Preferences.AUTOREPAIRBUILDINGS, chkAutoRepairBuildings);
                this.addFormElement(MaelstromTools.Preferences.AUTOCOLLECTTIMER, spinnerAutoCollectTimer);
                this.addFormElement(MaelstromTools.Preferences.CHATHISTORYLENGTH, spinnerChatHistoryLength);
              } catch (e) {
                console.log("MaelstromTools.Preferences.setWidgetLabels: ", e);
              }
            },

            applyChanges: function () {
              try {
                var autoRunNeeded = false;
                for (var idx in this.FormElements) {
                  var element = this.FormElements[idx];
                  if (idx == MaelstromTools.Preferences.AUTOCOLLECTTIMER) {
                    autoRunNeeded = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOCOLLECTTIMER, 0) != element.getValue());
                  }
                  if (idx == MaelstromTools.Preferences.CHATHISTORYLENGTH) {
                    webfrontend.gui.chat.ChatWidget.recvbufsize = element.getValue();
                  }
                  MaelstromTools.LocalStorage.set(idx, element.getValue());
                }
                this.readOptions();
                if (autoRunNeeded) {
                  MT_Base.runAutoCollectTimer();
                }
                this.Window.close();
              } catch (e) {
                console.log("MaelstromTools.Preferences.applyChanges: ", e);
              }
            },

            resetToDefault: function () {
              try {
                MaelstromTools.LocalStorage.clearAll();
                this.setWidgetLabels();
              } catch (e) {
                console.log("MaelstromTools.Preferences.resetToDefault: ", e);
              }
            }
          }
        });

        // define DefaultObject
        qx.Class.define("MaelstromTools.DefaultObject", {
          type: "abstract",
          extend: qx.core.Object,
          members: {
            Window: null,
            Widget: null,
            Cache: {}, //k null
            IsTimerEnabled: true,

            calc: function () {
              try {
                if (this.Window.isVisible()) {
                  this.updateCache();
                  this.setWidgetLabels();
                  if (this.IsTimerEnabled) {
                    var self = this;
                    window.setTimeout(function () {
                      self.calc();
                    }, MT_Base.timerInterval);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.DefaultObject.calc: ", e);
              }
            },

            openWindow: function (WindowName, WindowTitle) {
              try {
                if (!this.Window) {
                  this.Window = new qx.ui.window.Window(WindowTitle).set({
                    resizable: false,
                    showMaximize: false,
                    showMinimize: false,
                    allowMaximize: false,
                    allowMinimize: false,
                    showStatusbar: false
                  });
                  this.Window.setPadding(10);
                  this.Window.setLayout(new qx.ui.layout.VBox(3));

                  this.Widget = new qx.ui.container.Composite(new qx.ui.layout.Grid());
                  this.Widget.setTextColor("white");

                  this.Window.add(this.Widget);
                }

                if (this.Window.isVisible()) {
                  this.Window.close();
                } else {
                  MT_Base.openWindow(this.Window, WindowName);
                  this.calc();
                }
              } catch (e) {
                console.log("MaelstromTools.DefaultObject.openWindow: ", e);
              }
            }
          }
        });

        // define Production
        qx.Class.define("MaelstromTools.Production", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            updateCache: function (onlyForCity) {
              try {
                MT_Cache.updateCityCache();
                var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                //this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  if (onlyForCity != null && onlyForCity != cname) {
                    continue;
                  }
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (typeof (this.Cache[cname]) !== 'object') this.Cache[cname] = {};
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Tiberium]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Tiberium] = {}; // all have to be checked, 
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Crystal]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Crystal] = {}; // this.Cache[cname] can be created inside different namespaces
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Power]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Power] = {}; // like the RepairTime etc... without those objs
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Dollar]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Dollar] = {};

                  this.Cache[cname]["ProductionStopped"] = ncity.get_IsGhostMode();
                  this.Cache[cname]["PackagesStopped"] = (ncity.get_hasCooldown() || ncity.get_IsGhostMode());
                  this.Cache[cname][MaelstromTools.Statics.Tiberium]["Delta"] = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, false, false); // (production.d[ClientLib.Base.EResourceType.Tiberium]['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Tiberium]["ExtraBonusDelta"] = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium); //(production.d[ClientLib.Base.EResourceType.Tiberium]['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Tiberium]["POI"] = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Tiberium);
                  this.Cache[cname][MaelstromTools.Statics.Crystal]["Delta"] = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, false, false); //(production.d[ClientLib.Base.EResourceType.Crystal]['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Crystal]["ExtraBonusDelta"] = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal); //(production.d[ClientLib.Base.EResourceType.Crystal]['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Crystal]["POI"] = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Crystal);
                  this.Cache[cname][MaelstromTools.Statics.Power]["Delta"] = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false); //(production.d[ClientLib.Base.EResourceType.Power]['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Power]["ExtraBonusDelta"] = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power); // (production.d[ClientLib.Base.EResourceType.Power]['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Power]["POI"] = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
                  this.Cache[cname][MaelstromTools.Statics.Dollar]["Delta"] = ClientLib.Base.Resource.GetResourceGrowPerHour(ncity.get_CityCreditsProduction(), false); // (ncity.get_CityCreditsProduction()['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Dollar]["ExtraBonusDelta"] = ClientLib.Base.Resource.GetResourceBonusGrowPerHour(ncity.get_CityCreditsProduction(), false); // (ncity.get_CityCreditsProduction()['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Dollar]["POI"] = 0;
                  this.Cache[cname]["BaseLevel"] = MaelstromTools.Wrapper.GetBaseLevel(ncity);
                  if (onlyForCity != null && onlyForCity == cname) return this.Cache[cname];
                }
              } catch (e) {
                console.log("MaelstromTools.Production.updateCache: ", e);
              }
            },

            createProductionLabels2: function (rowIdx, colIdx, cityName, resourceType) {
              try {
                if (cityName == "-Total-") {
                  var Totals = Object();
                  Totals["Delta"] = 0;
                  Totals["ExtraBonusDelta"] = 0;
                  Totals["POI"] = 0;
                  Totals["Total"] = 0;

                  for (var cname in this.Cache) {
                    Totals["Delta"] += this.Cache[cname][resourceType]['Delta'];
                    Totals["ExtraBonusDelta"] += this.Cache[cname][resourceType]['ExtraBonusDelta'];
                    Totals["POI"] += this.Cache[cname][resourceType]['POI'];
                  }
                  Totals["Total"] = Totals['Delta'] + Totals['ExtraBonusDelta'] + Totals['POI'];

                  rowIdx++;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['Delta']), 80, 'right', 'bold');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['ExtraBonusDelta']), 80, 'right', 'bold');
                  if (resourceType != MaelstromTools.Statics.Dollar) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['POI']), 80, 'right', 'bold');
                  } else {
                    rowIdx++;
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['Total']), 80, 'right', 'bold');
                } else if (cityName == "-Labels-") {
                  MaelstromTools.Util.addImage(this.Widget, rowIdx++, colIdx, MaelstromTools.Util.getImage(resourceType));
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Continuous", 100, 'left');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Bonus", 100, 'left');
                  if (resourceType != MaelstromTools.Statics.Dollar) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "POI", 100, 'left');
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Total / BaseLevel", 100, 'left');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Total / h", 100, 'left');
                } else {
                  var cityCache = this.Cache[cityName];
                  if (rowIdx > 2) {
                    rowIdx++;
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['Delta']), 80, 'right', null, ((cityCache["ProductionStopped"] || cityCache[resourceType]['Delta'] == 0) ? "red" : "white"));
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['ExtraBonusDelta']), 80, 'right', null, ((cityCache["PackagesStopped"] || cityCache[resourceType]['ExtraBonusDelta'] == 0) ? "red" : "white"));
                  if (resourceType != MaelstromTools.Statics.Dollar) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['POI']), 80, 'right', null, (cityCache[resourceType]['POI'] == 0 ? "red" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact((cityCache[resourceType]['Delta'] + cityCache[resourceType]['ExtraBonusDelta'] + cityCache[resourceType]['POI']) / cityCache["BaseLevel"]), 80, 'right');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['Delta'] + cityCache[resourceType]['ExtraBonusDelta'] + cityCache[resourceType]['POI']), 80, 'right', 'bold');
                }
                return rowIdx;
              } catch (e) {
                console.log("MaelstromTools.Production.createProductionLabels2: ", e);
              }
            },

            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();

                var rowIdx = 1;
                var colIdx = 1;

                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Tiberium);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Crystal);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Power);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Dollar);

                colIdx++;
                for (var cityName in this.Cache) {
                  rowIdx = 1;
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, cityName, 80, 'right');

                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Tiberium);
                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Crystal);
                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Power);
                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Dollar);

                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                }

                rowIdx = 1;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Total / h", 80, 'right', 'bold');

                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Tiberium);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Crystal);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Power);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Dollar);
              } catch (e) {
                console.log("MaelstromTools.Production.setWidgetLabels: ", e);
              }
            }
          }
        });

        // define RepairTime
        qx.Class.define("MaelstromTools.RepairTime", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {

            updateCache: function () {
              try {
                MT_Cache.updateCityCache();
                this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  var RepLargest = '';

                  this.Cache[cname] = Object();
                  this.Cache[cname]["RepairTime"] = Object();
                  this.Cache[cname]["Repaircharge"] = Object();
                  this.Cache[cname]["Repaircharge"]["Smallest"] = 999999999;
                  this.Cache[cname]["RepairTime"]["Largest"] = 0;

                  this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Infantry] = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
                  this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Vehicle] = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
                  this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Aircraft] = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
                  this.Cache[cname]["RepairTime"]["Maximum"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.RepairChargeInf);
                  this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Infantry] = ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf);
                  this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Vehicle] = ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh);
                  this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Aircraft] = ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir);

                  if (this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Infantry] < this.Cache[cname]["Repaircharge"]["Smallest"]) {
                    this.Cache[cname]["Repaircharge"]["Smallest"] = this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Infantry];
                  }
                  if (this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Vehicle] < this.Cache[cname]["Repaircharge"]["Smallest"]) {
                    this.Cache[cname]["Repaircharge"]["Smallest"] = this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Vehicle];
                  }
                  if (this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Aircraft] < this.Cache[cname]["Repaircharge"]["Smallest"]) {
                    this.Cache[cname]["Repaircharge"]["Smallest"] = this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Aircraft];
                  }

                  if (this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Infantry] > this.Cache[cname]["RepairTime"]["Largest"]) {
                    this.Cache[cname]["RepairTime"]["Largest"] = this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Infantry];
                    RepLargest = "Infantry";
                  }
                  if (this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Vehicle] > this.Cache[cname]["RepairTime"]["Largest"]) {
                    this.Cache[cname]["RepairTime"]["Largest"] = this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Vehicle];
                    RepLargest = "Vehicle";
                  }
                  if (this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Aircraft] > this.Cache[cname]["RepairTime"]["Largest"]) {
                    this.Cache[cname]["RepairTime"]["Largest"] = this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Aircraft];
                    RepLargest = "Aircraft";
                  }

                  //PossibleAttacks and MaxAttacks fixes
                  var offHealth = ncity.GetOffenseConditionInPercent();
                  if (RepLargest !== '') {
                    this.Cache[cname]["RepairTime"]["LargestDiv"] = this.Cache[cname]["RepairTime"][RepLargest];
                    var i = Math.ceil(this.Cache[cname]["Repaircharge"].Smallest / this.Cache[cname]["RepairTime"].LargestDiv); //fix
                    var j = this.Cache[cname]["Repaircharge"].Smallest / this.Cache[cname]["RepairTime"].LargestDiv;
                    if (offHealth !== 100) { i--; i += '*';} // Decrease number of attacks by 1 when unit unhealthy. Additional visual info: asterisk when units aren't healthy
                    this.Cache[cname]["RepairTime"]["PossibleAttacks"] = i;
                    var k = this.Cache[cname]["RepairTime"].Maximum / this.Cache[cname]["RepairTime"].LargestDiv;
                    this.Cache[cname]["RepairTime"]["MaxAttacks"] = Math.ceil(k); //fix
                  } else {
                    this.Cache[cname]["RepairTime"]["LargestDiv"] = 0;
                    this.Cache[cname]["RepairTime"]["PossibleAttacks"] = 0;
                    this.Cache[cname]["RepairTime"]["MaxAttacks"] = 0;
                  }

                  var unitsData = ncity.get_CityUnitsData();
                  this.Cache[cname]["Base"] = Object();
                  this.Cache[cname]["Base"]["Level"] = MaelstromTools.Wrapper.GetBaseLevel(ncity);
                  this.Cache[cname]["Base"]["UnitLimit"] = ncity.GetBuildingSlotLimit(); //ncity.GetNumBuildings();
                  this.Cache[cname]["Base"]["TotalHeadCount"] = ncity.GetBuildingSlotCount();
                  this.Cache[cname]["Base"]["FreeHeadCount"] = this.Cache[cname]["Base"]["UnitLimit"] - this.Cache[cname]["Base"]["TotalHeadCount"];
                  this.Cache[cname]["Base"]["HealthInPercent"] = ncity.GetBuildingsConditionInPercent();

                  this.Cache[cname]["Offense"] = Object();
                  this.Cache[cname]["Offense"]["Level"] = (Math.floor(ncity.get_LvlOffense() * 100) / 100).toFixed(2);
                  this.Cache[cname]["Offense"]["UnitLimit"] = unitsData.get_UnitLimitOffense();
                  this.Cache[cname]["Offense"]["TotalHeadCount"] = unitsData.get_TotalOffenseHeadCount();
                  this.Cache[cname]["Offense"]["FreeHeadCount"] = unitsData.get_FreeOffenseHeadCount();
                  this.Cache[cname]["Offense"]["HealthInPercent"] = offHealth > 0 ? offHealth : 0;

                  this.Cache[cname]["Defense"] = Object();
                  this.Cache[cname]["Defense"]["Level"] = (Math.floor(ncity.get_LvlDefense() * 100) / 100).toFixed(2);
                  this.Cache[cname]["Defense"]["UnitLimit"] = unitsData.get_UnitLimitDefense();
                  this.Cache[cname]["Defense"]["TotalHeadCount"] = unitsData.get_TotalDefenseHeadCount();
                  this.Cache[cname]["Defense"]["FreeHeadCount"] = unitsData.get_FreeDefenseHeadCount();
                  this.Cache[cname]["Defense"]["HealthInPercent"] = ncity.GetDefenseConditionInPercent() > 0 ? ncity.GetDefenseConditionInPercent() : 0;

                  //console.log(ncity.get_CityUnitsData().get_UnitLimitOffense() + " / " + ncity.get_CityUnitsData().get_TotalOffenseHeadCount() + " = " + ncity.get_CityUnitsData().get_FreeOffenseHeadCount());
                  //console.log(ncity.get_CityUnitsData().get_UnitLimitDefense() + " / " + ncity.get_CityUnitsData().get_TotalDefenseHeadCount() + " = " + ncity.get_CityUnitsData().get_FreeDefenseHeadCount());
                }
              } catch (e) {
                console.log("MaelstromTools.RepairTime.updateCache: ", e);
              }
            },

            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();
                var rowIdx = 1;

                rowIdx = this.createOverviewLabels(rowIdx);
                rowIdx = this.createRepairchargeLabels(rowIdx);
              } catch (e) {
                console.log("MaelstromTools.RepairTime.setWidgetLabels: ", e);
              }
            },

            createRepairchargeLabels: function (rowIdx) {
              try {
                var colIdx = 2;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx++, "Repaircharges", null, 'left', null, null, 3);
                colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Statics.Infantry, 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Statics.Vehicle, 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Statics.Aircraft, 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Repairtime", 80, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Attacks", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Next at", 80, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Max+1 at", 80, 'right');

                rowIdx++;
                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  if (cityCache.Offense.UnitLimit == 0) {
                    continue;
                  }
                  colIdx = 1;
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 80, 'left');

                  // Skip bases with no armies
                  if (cityCache.Offense.UnitLimit > 0) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.RepairTime.Infantry), 60, 'right', null, (cityCache.RepairTime.Infantry == cityCache.RepairTime.LargestDiv ? "yellow" : "white"));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.RepairTime.Vehicle), 60, 'right', null, (cityCache.RepairTime.Vehicle == cityCache.RepairTime.LargestDiv ? "yellow" : "white"));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.RepairTime.Aircraft), 60, 'right', null, (cityCache.RepairTime.Aircraft == cityCache.RepairTime.LargestDiv ? "yellow" : "white"));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.Repaircharge.Smallest), 80, 'right');
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.RepairTime.PossibleAttacks + " / " + cityCache.RepairTime.MaxAttacks, 60, 'right', null, (cityCache.Offense.HealthInPercent !== 100 ? 'red' : null)); // mark red when unhealthy
                    var i = cityCache.RepairTime.LargestDiv * cityCache.RepairTime.PossibleAttacks;
                    var j = cityCache.RepairTime.LargestDiv * cityCache.RepairTime.MaxAttacks;
                    (i>0) ? MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(i), 80, 'right', null, (i > cityCache.RepairTime.Maximum ? "yellow" : "white")) : colIdx++; /// yellow if more than Maximum RT
                    (j>0) ? MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(j), 80, 'right') : colIdx++;
                  } else {
                    colIdx += 7;
                  }

                  colIdx += 4;
                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName, PerforceChangelist >= 376877 ? ClientLib.Data.PlayerAreaViewMode.pavmPlayerOffense : webfrontend.gui.PlayArea.PlayArea.modes.EMode_PlayerOffense));
                  rowIdx += 2;
                }

                return rowIdx;
              } catch (e) {
                console.log("MaelstromTools.RepairTime.createRepairchargeLabels: ", e);
              }
            },

            createOverviewLabels: function (rowIdx) {
              try {
                var colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Base", 60, 'right');
                colIdx += 3;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Defense", 60, 'right');
                colIdx += 3;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Army", 60, 'right');

                rowIdx++;
                colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Level", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Buildings", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Health", 60, 'right');

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Level", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Buildings", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Health", 60, 'right');

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Level", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Units", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Health", 60, 'right');

                rowIdx++;
                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  colIdx = 1;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 80, 'left');

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Base.Level, 60, 'right');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Base.TotalHeadCount + " / " + cityCache.Base.UnitLimit, 60, 'right', null, (cityCache.Base.FreeHeadCount >= 1 ? "red" : "white"));
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Base.HealthInPercent + "%", 60, 'right', null, (cityCache.Base.HealthInPercent < 25 ? "red" : (cityCache.Base.HealthInPercent < 100 ? "yellow" : "white")));

                  if (cityCache.Defense.UnitLimit > 0) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Defense.Level, 60, 'right');
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Defense.TotalHeadCount + " / " + cityCache.Defense.UnitLimit, 60, 'right', null, (cityCache.Defense.FreeHeadCount >= 5 ? "red" : (cityCache.Defense.FreeHeadCount >= 3 ? "yellow" : "white")));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Defense.HealthInPercent + "%", 60, 'right', null, (cityCache.Defense.HealthInPercent < 25 ? "red" : (cityCache.Defense.HealthInPercent < 100 ? "yellow" : "white")));
                  } else {
                    colIdx += 3;
                  }

                  // Skip bases with no armies
                  if (cityCache.Offense.UnitLimit > 0) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Offense.Level, 60, 'right');
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Offense.TotalHeadCount + " / " + cityCache.Offense.UnitLimit, 60, 'right', null, (cityCache.Offense.FreeHeadCount >= 10 ? "red" : (cityCache.Offense.FreeHeadCount >= 5 ? "yellow" : "white")));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Offense.HealthInPercent + "%", 60, 'right', null, (cityCache.Offense.HealthInPercent < 25 ? "red" : (cityCache.Offense.HealthInPercent < 100 ? "yellow" : "white")));
                  } else {
                    colIdx += 3;
                  }

                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                  rowIdx += 2;
                }
                return rowIdx;
              } catch (e) {
                console.log("MaelstromTools.RepairTime.createOverviewLabels: ", e);
              }
            }

          }
        });

        // define ResourceOverview
        qx.Class.define("MaelstromTools.ResourceOverview", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            Table: null,
            Model: null,

            updateCache: function () {
              try {
                MT_Cache.updateCityCache();
                this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  var mtime = ClientLib.Data.MainData.GetInstance().get_Time();

                  this.Cache[cname] = Object();
                  this.Cache[cname][MaelstromTools.Statics.Tiberium] = ncity.GetResourceCount(ClientLib.Base.EResourceType.Tiberium);
                  this.Cache[cname][MaelstromTools.Statics.Tiberium + "Max"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Tiberium);
                  this.Cache[cname][MaelstromTools.Statics.Tiberium + "Full"] = mtime.GetJSStepTime(ncity.GetResourceStorageFullStep(ClientLib.Base.EResourceType.Tiberium));
                  this.Cache[cname][MaelstromTools.Statics.Crystal] = ncity.GetResourceCount(ClientLib.Base.EResourceType.Crystal);
                  this.Cache[cname][MaelstromTools.Statics.Crystal + "Max"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Crystal);
                  this.Cache[cname][MaelstromTools.Statics.Crystal + "Full"] = mtime.GetJSStepTime(ncity.GetResourceStorageFullStep(ClientLib.Base.EResourceType.Crystal));
                  this.Cache[cname][MaelstromTools.Statics.Power] = ncity.GetResourceCount(ClientLib.Base.EResourceType.Power);
                  this.Cache[cname][MaelstromTools.Statics.Power + "Max"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Power);
                  this.Cache[cname][MaelstromTools.Statics.Power + "Full"] = mtime.GetJSStepTime(ncity.GetResourceStorageFullStep(ClientLib.Base.EResourceType.Power));
                }

              } catch (e) {
                console.log("MaelstromTools.ResourceOverview.updateCache: ", e);
              }
            },
/*
            setWidgetLabelsTable: function () {
              try {
                if (!this.Table) {
                  this.Widget.setLayout(new qx.ui.layout.HBox());

                  this.Model = new qx.ui.table.model.Simple();
                  this.Model.setColumns(["City", "Tib. Storage", "Tiberium", "Full", "Crystal", "Full", "Power", "Storage", "Full"]);
                  this.Table = new qx.ui.table.Table(this.Model);
                  this.Widget.add(this.Table, {
                    flex: 1
                  });
                }

                var Totals = Object();
                Totals[MaelstromTools.Statics.Tiberium] = 0;
                Totals[MaelstromTools.Statics.Crystal] = 0;
                Totals[MaelstromTools.Statics.Power] = 0;
                Totals[MaelstromTools.Statics.Tiberium + "Max"] = 0;
                Totals[MaelstromTools.Statics.Power + "Max"] = 0;

                var rowData = [];

                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];

                  Totals[MaelstromTools.Statics.Tiberium] += cityCache[MaelstromTools.Statics.Tiberium];
                  Totals[MaelstromTools.Statics.Crystal] += cityCache[MaelstromTools.Statics.Crystal];
                  Totals[MaelstromTools.Statics.Power] += cityCache[MaelstromTools.Statics.Power];
                  Totals[MaelstromTools.Statics.Tiberium + "Max"] += cityCache[MaelstromTools.Statics.Tiberium + 'Max'];
                  Totals[MaelstromTools.Statics.Power + "Max"] += cityCache[MaelstromTools.Statics.Power + 'Max'];

                  rowData.push([
                    cityName,
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium + 'Max']),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium]),
                    MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Tiberium + 'Full']),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Crystal]),
                    MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Crystal + 'Full']),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power]),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power + 'Max']),
                    MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Power + 'Full'])
                    ]);
                }
                rowData.push([
                  'Total resources',
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium + 'Max']),
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium]),
                  '',
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Crystal]),
                  '',
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power]),
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power + 'Max']),
                  ''
                  ]);

                this.Model.setData(rowData);
              } catch (e) {
                console.log("MaelstromTools.ResourceOverview.setWidgetLabels: ", e);
              }
            },

            */
            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();

                var first = true;
                var rowIdx = 2;
                var Totals = Object();
                var colIdx = 1;
                Totals[MaelstromTools.Statics.Tiberium] = 0;
                Totals[MaelstromTools.Statics.Crystal] = 0;
                Totals[MaelstromTools.Statics.Power] = 0;
                Totals[MaelstromTools.Statics.Tiberium + "Max"] = 0;
                Totals[MaelstromTools.Statics.Power + "Max"] = 0;

                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  Totals[MaelstromTools.Statics.Tiberium] += cityCache[MaelstromTools.Statics.Tiberium];
                  Totals[MaelstromTools.Statics.Crystal] += cityCache[MaelstromTools.Statics.Crystal];
                  Totals[MaelstromTools.Statics.Power] += cityCache[MaelstromTools.Statics.Power];
                  Totals[MaelstromTools.Statics.Tiberium + "Max"] += cityCache[MaelstromTools.Statics.Tiberium + 'Max'];
                  Totals[MaelstromTools.Statics.Power + "Max"] += cityCache[MaelstromTools.Statics.Power + 'Max'];

                  colIdx = 1;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 100, 'left');
                  if (first) {
                    MaelstromTools.Util.addLabel(this.Widget, 1, colIdx, 'Max. storage', 80, 'left');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium + 'Max']), 80, 'right');

                  if (first) {
                    MaelstromTools.Util.addImage(this.Widget, 1, colIdx, MaelstromTools.Util.getImage(MaelstromTools.Statics.Tiberium));
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium]), 60, 'right', null, (cityCache[MaelstromTools.Statics.Tiberium] >= cityCache[MaelstromTools.Statics.Tiberium + 'Max'] ? "red" : (cityCache[MaelstromTools.Statics.Tiberium] >= (0.75 * cityCache[MaelstromTools.Statics.Tiberium + 'Max']) ? "yellow" : "white")));

                  if (cityCache[MaelstromTools.Statics.Tiberium] < cityCache[MaelstromTools.Statics.Tiberium + 'Max']) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Tiberium + 'Full']), 100, 'right', null, (cityCache[MaelstromTools.Statics.Tiberium] >= (0.75 * cityCache[MaelstromTools.Statics.Tiberium + 'Max']) ? "yellow" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Storage full!", 100, 'right', null, "red");
                  }
                  if (first) {
                    MaelstromTools.Util.addImage(this.Widget, 1, colIdx, MaelstromTools.Util.getImage(MaelstromTools.Statics.Crystal));
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Crystal]), 60, 'right', null, (cityCache[MaelstromTools.Statics.Crystal] >= cityCache[MaelstromTools.Statics.Crystal + 'Max'] ? "red" : (cityCache[MaelstromTools.Statics.Crystal] >= (0.75 * cityCache[MaelstromTools.Statics.Crystal + 'Max']) ? "yellow" : "white")));

                  if (cityCache[MaelstromTools.Statics.Crystal] < cityCache[MaelstromTools.Statics.Crystal + 'Max']) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Crystal + 'Full']), 100, 'right', null, (cityCache[MaelstromTools.Statics.Crystal] >= (0.75 * cityCache[MaelstromTools.Statics.Crystal + 'Max']) ? "yellow" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Storage full!", 100, 'right', null, "red");
                  }

                  if (first) {
                    MaelstromTools.Util.addImage(this.Widget, 1, colIdx, MaelstromTools.Util.getImage(MaelstromTools.Statics.Power));
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power]), 60, 'right', null, (cityCache[MaelstromTools.Statics.Power] >= cityCache[MaelstromTools.Statics.Power + 'Max'] ? "red" : (cityCache[MaelstromTools.Statics.Power] >= (0.75 * cityCache[MaelstromTools.Statics.Power + 'Max']) ? "yellow" : "white")));

                  if (first) {
                    MaelstromTools.Util.addLabel(this.Widget, 1, colIdx, 'Storage', 80, 'left');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power + 'Max']), 80, 'right');

                  if (cityCache[MaelstromTools.Statics.Power] < cityCache[MaelstromTools.Statics.Power + 'Max']) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Power + 'Full']), 100, 'right', null, (cityCache[MaelstromTools.Statics.Power] >= (0.75 * cityCache[MaelstromTools.Statics.Power + 'Max']) ? "yellow" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Storage full!", 100, 'right', null, "red");
                  }


                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                  rowIdx++;
                  first = false;
                }

                colIdx = 1;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Total resources", 100, 'left', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium + 'Max']), 80, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium]), 60, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, Math.round(Totals[MaelstromTools.Statics.Tiberium] / Totals[MaelstromTools.Statics.Tiberium + 'Max'] * 100) + '%', 100, 'center', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Crystal]), 60, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, Math.round(Totals[MaelstromTools.Statics.Crystal] / Totals[MaelstromTools.Statics.Tiberium + 'Max'] * 100) + '%', 100, 'center', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power]), 60, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power + 'Max']), 80, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, Math.round(Totals[MaelstromTools.Statics.Power] / Totals[MaelstromTools.Statics.Power + 'Max'] * 100) + '%', 100, 'center', 'bold');
              } catch (e) {
                console.log("MaelstromTools.ResourceOverview.setWidgetLabels: ", e);
              }
            }
          }
        });

        // define BaseStatus
        qx.Class.define("MaelstromTools.BaseStatus", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            CityMenuButtons: null,

            //City.SetDedicatedSupport
            //City.RecallDedicatedSupport
            //City.get_SupportDedicatedBaseId
            //System.String get_SupportDedicatedBaseName ()
            updateCache: function () {
              try {
                MT_Cache.updateCityCache();
                this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  var player = ClientLib.Data.MainData.GetInstance().get_Player();
                  var supportData = ncity.get_SupportData();
                  //System.String get_PlayerName ()
                  this.Cache[cname] = Object();
                  // Movement lock
                  this.Cache[cname]["HasCooldown"] = ncity.get_hasCooldown();
                  this.Cache[cname]["CooldownEnd"] = Math.max(ncity.get_MoveCooldownEndStep(), ncity.get_MoveRestictionEndStep());
                  this.Cache[cname]["MoveCooldownEnd"] = ncity.get_MoveCooldownEndStep();
                  this.Cache[cname]["MoveLockdownEnd"] = ncity.get_MoveRestictionEndStep();
                  this.Cache[cname]["IsProtected"] = ncity.get_isProtected();
                  this.Cache[cname]["ProtectionEnd"] = ncity.get_ProtectionEndStep();
                  this.Cache[cname]["IsProtected"] = ncity.get_ProtectionEndStep();
                  this.Cache[cname]["IsAlerted"] = ncity.get_isAlerted();

                  // Supportweapon
                  if (supportData == null) {
                    this.Cache[cname]["HasSupportWeapon"] = false;
                  } else {
                    this.Cache[cname]["HasSupportWeapon"] = true;
                    if (ncity.get_SupportDedicatedBaseId() > 0) {
                      this.Cache[cname]["SupportedCityId"] = ncity.get_SupportDedicatedBaseId();
                      this.Cache[cname]["SupportedCityName"] = ncity.get_SupportDedicatedBaseName();
                      var coordId = ncity.get_SupportDedicatedBaseCoordId();
                      this.Cache[cname]["SupportedCityX"] = (coordId & 0xffff);
                      this.Cache[cname]["SupportedCityY"] = ((coordId >> 0x10) & 0xffff);
                      /*
                      var cityX = ncity.get_PosX();
                      var cityY = ncity.get_PosY();
                      
                      var mainData = ClientLib.Data.MainData.GetInstance();
                      var visRegion = ClientLib.Vis.VisMain.GetInstance().get_Region();

                      var gridW = visRegion.get_GridWidth();
                      var gridH = visRegion.get_GridHeight();
                      //console.log(cname);
                      //console.log("x: " + cityX + " y: " + cityY);

                      var worldObj = visRegion.GetObjectFromPosition((this.Cache[cname]["SupportedCityX"]*gridW), (this.Cache[cname]["SupportedCityY"]*gridH));
                      
                      //ClientLib.Vis.Region.RegionCity
                      if (worldObj == null) {
                        this.Cache[cname]["SupportTime"] = "";
                      } else {
                        console.log(cname);
                        //console.log(worldObj.CalibrationSupportDuration());
                        var weaponState = worldObj.get_SupportWeaponStatus();
                        
                        //console.log(this.calcDuration(ncity, worldObj));
                        var cities = ClientLib.Data.MainData.GetInstance().get_Cities();
                        cities.set_CurrentOwnCityId(ncity.get_Id());
                        var status = worldObj.get_SupportWeaponStatus();
                        var server = mainData.get_Server();
                        //console.log(worldObj.CalculateSupportCalibrationEndStep(worldObj.get_SupportData(), worldObj.get_SupportWeapon()));
                        console.log(status);
                        console.log(currStep);
                        this.Cache[cname]["SupportTime"] = mainData.get_Time().GetTimespanString(worldObj.CalculateSupportCalibrationEndStep(worldObj.get_SupportData(), worldObj.get_SupportWeapon()), currStep);
                        //status.Status&ClientLib.Vis.Region.ESupportWeaponStatus.Calibrating)==ClientLib.Vis.Region.ESupportWeaponStatus.Calibrating
                        var currStep = ClientLib.Data.MainData.GetInstance().get_Time().GetServerStep();
                        //this.Cache[cname]["SupportTime"] = webfrontend.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(Math.max(0, status.CalibrationEndStep) - currStep), false);
                        //this.Cache[cname]["SupportTime"] = ClientLib.Data.MainData.GetInstance().get_Time().GetTimespanString(weaponState.CalibrationEndStep, currStep);
                        //this.Cache[cname]["SupportTime"] = webfrontend.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(Math.max(0, worldObj.CalculateSupportCalibrationEndStep(worldObj.get_SupportData(), worldObj.get_SupportWeapon()) - currStep)), false);
                      //console.log(this.Cache[cname]["SupportTime"]);
                      }
                       */
                    } else { // prevent reference to undefined property ReferenceError
                      this.Cache[cname]["SupportedCityId"] = null;
                      this.Cache[cname]["SupportedCityName"] = null;
                      this.Cache[cname]["SupportedCityX"] = null;
                      this.Cache[cname]["SupportedCityY"] = null;
                    }
                    this.Cache[cname]["SupportRange"] = MaelstromTools.Wrapper.GetSupportWeaponRange(ncity.get_SupportWeapon());
                    var techName = ClientLib.Base.Tech.GetTechNameFromTechId(supportData.get_Type(), player.get_Faction());
                    this.Cache[cname]["SupportName"] = ClientLib.Base.Tech.GetProductionBuildingNameFromFaction(techName, player.get_Faction());
                    this.Cache[cname]["SupportLevel"] = supportData.get_Level();
                    //this.Cache[cname]["SupportBuilding"] = ncity.get_CityBuildingsData().GetUniqueBuildingByTechName(techName);
                    //console.log(this.Cache[cname]["SupportBuilding"]);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.BaseStatus.updateCache: ", e);
              }
            },
            /*
            calcDuration: function(currOwnCity, regionCity) {
              var targetCity = MaelstromTools.Wrapper.GetCity(regionCity.get_Id());
              
              var supportBase=regionCity.get_SupportData();
              if(supportBase == null)
              {
                return -1;
              }
              var weapon=regionCity.get_SupportWeapon();
              if(weapon == null)
              {
                return -1;
              }
              if(currOwnCity.get_Id() == regionCity.get_Id())
              {
                if(supportBase.get_Magnitude() == 0) {
                  return -1;
                }
                return 0;
              }
              var dx=(currOwnCity.get_X() - targetCity.get_PosX());
              var dy=(currOwnCity.get_Y() - targetCity.get_PosY());
              var distance=((dx * dx) + (dy * dy));
              return Math.floor((weapon.pt + (weapon.tpf * Math.floor((Math.sqrt(distance) + 0.5)))));
            },*/

            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();
                var rowIdx = 1;
                var colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Cooldown", 85, 'left');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Protection", 85, 'left');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Available weapon", 140, 'left');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Calibrated on", 140, 'left');

                //colIdx++;
                var rowIdxRecall = rowIdx;
                var colIdxRecall = 0;
                var supportWeaponCount = 0;

                rowIdx++;
                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  colIdx = 1;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 100, 'left', null, (cityCache.IsAlerted ? 'red' : null));

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetStepTime(cityCache.CooldownEnd), 70, 'right');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetStepTime(cityCache.ProtectionEnd), 70, 'right');

                  if (!cityCache.HasSupportWeapon) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "none", 140, 'left');
                    colIdx += 2;
                  } else {
                    supportWeaponCount++;
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.SupportName + " (" + cityCache.SupportLevel + ")", 140, 'left');

                    if (cityCache.SupportedCityId > 0) {
                      MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.SupportedCityName, 140, 'left');
                      colIdxRecall = colIdx;
                      MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, this.getRecallButton(cityName));
                    } else {
                      colIdx += 2;
                    }
                  }

                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getFocusBaseButton(cityName));

                  rowIdx++;
                }

                if (supportWeaponCount > 0 && colIdxRecall > 0) {
                  MaelstromTools.Util.addElement(this.Widget, rowIdxRecall, colIdxRecall, this.getRecallAllButton());
                }
              } catch (e) {
                console.log("MaelstromTools.BaseStatus.setWidgetLabels: ", e);
              }
            },

            getRecallAllButton: function () {
              var button = new qx.ui.form.Button("Recall all").set({
                appearance: "button-text-small",
                toolTipText: "Recall all support weapons",
                width: 100,
                height: 20
              });
              button.addListener("execute", function (e) {
                MaelstromTools.Util.recallAllSupport();
              }, this);
              return button;
            },

            getRecallButton: function (cityName) {
              var button = new qx.ui.form.Button("Recall").set({
                appearance: "button-text-small",
                toolTipText: "Recall support to " + cityName,
                width: 100,
                height: 20
              });
              button.addListener("execute", function (e) {
                MaelstromTools.Util.recallSupport(cityName);
              }, this);
              return button;
            }
            /*
            getCalibrateAllOnSelectedBaseButton: function() {
              var button = new qx.ui.form.Button("Calibrate all weapons on selected base").set({
                appearance: "button-text-small",
                toolTipText: "Calibrate all weapons",
                width: 100,
                height: 20
              });
              button.addListener("execute", function(e){
                Util.calibrateWholeSupport(ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId());
              }, this);
              return button;
            }*/


          }
        });

        // define Statics
        qx.Class.define("MaelstromTools.Statics", {
          type: "static",
          statics: {
            Tiberium: 'Tiberium',
            Crystal: 'Crystal',
            Power: 'Power',
            Dollar: 'Dollar',
            Research: 'Research',
            Vehicle: "Vehicle",
            Aircraft: "Aircraft",
            Infantry: "Infantry",

            LootTypeName: function (ltype) {
              switch (ltype) {
                case ClientLib.Base.EResourceType.Tiberium:
                  return MaelstromTools.Statics.Tiberium;
                  break;
                case ClientLib.Base.EResourceType.Crystal:
                  return MaelstromTools.Statics.Crystal;
                  break;
                case ClientLib.Base.EResourceType.Power:
                  return MaelstromTools.Statics.Power;
                  break;
                case ClientLib.Base.EResourceType.Gold:
                  return MaelstromTools.Statics.Dollar;
                  break;
                default:
                  return "";
                  break;
              }
            }
          }
        });

        // define Util
        //ClientLib.Data.Cities.prototype.GetCityByCoord
        //ClientLib.Data.City.prototype.get_HasIncommingAttack
        qx.Class.define("MaelstromTools.Util", {
          type: "static",
          statics: {
            ArrayUnique: function (array) {
              var o = {};
              var l = array.length;
              r = [];
              for (var i = 0; i < l; i++) o[array[i]] = array[i];
              for (var i in o) r.push(o[i]);
              return r;
            },

            ArraySize: function (array) {
              var size = 0;
              for (var key in array)
              if (array.hasOwnProperty(key)) size++;
              return size;
            },

            addLabel: function (widget, rowIdx, colIdx, value, width, textAlign, font, color, colSpan) {
              try {
                var label = new qx.ui.basic.Label().set({
                  value: Lang.gt(value)
                });
                if (width) {
                  label.setWidth(width);
                }
                if (textAlign) {
                  label.setTextAlign(textAlign);
                }
                if (color) {
                  label.setTextColor(color);
                }
                if (font) {
                  label.setFont(font);
                }
                if (!colSpan || colSpan == 0) {
                  colSpan = 1;
                }

                widget.add(label, {
                  row: rowIdx,
                  column: colIdx,
                  colSpan: colSpan
                });
              } catch (e) {
                console.log("MaelstromTools.Util.addLabel: ", e);
              }
            },

            addElement: function (widget, rowIdx, colIdx, element, colSpan) {
              try {
                if (!colSpan || colSpan == 0) {
                  colSpan = 1;
                }
                widget.add(element, {
                  row: rowIdx,
                  column: colIdx,
                  colSpan: colSpan
                });
              } catch (e) {
                console.log("MaelstromTools.Util.addElement: ", e);
              }
            },

            addImage: function (widget, rowIdx, colIdx, image) {
              try {
                widget.add(image, {
                  row: rowIdx,
                  column: colIdx
                });
              } catch (e) {
                console.log("MaelstromTools.Util.addImage: ", e);
              }
            },

            getImage: function (name) {
              var image = new qx.ui.basic.Image(MT_Base.images[name]);
              image.setScale(true);
              image.setWidth(20);
              image.setHeight(20);
              return image;
            },

            getAccessBaseButton: function (cityName, viewMode) {
              try {
                var cityButton = new qx.ui.form.Button(null, MT_Base.images["AccessBase"]).set({
                  appearance: "button-detailview-small",
                  toolTipText: Lang.gt("Access") + " " + cityName,
                  width: 20,
                  height: 20,
                  marginLeft: 5
                });
                cityButton.setUserData("cityId", MT_Cache.Cities[cityName].ID);
                cityButton.setUserData("viewMode", viewMode);
                cityButton.addListener("execute", function (e) {
                  MaelstromTools.Util.accessBase(e.getTarget().getUserData("cityId"), e.getTarget().getUserData("viewMode"));
                }, this);
                return cityButton;
              } catch (e) {
                console.log("MaelstromTools.Util.getAccessBaseButton: ", e);
              }
            },

            getFocusBaseButton: function (cityName) {
              try {
                var cityButton = new qx.ui.form.Button(null, MT_Base.images["FocusBase"]).set({
                  appearance: "button-detailview-small",
                  toolTipText: Lang.gt("Focus on") + " " + cityName,
                  width: 20,
                  height: 20,
                  marginLeft: 5
                });
                cityButton.setUserData("cityId", MT_Cache.Cities[cityName].ID);
                cityButton.addListener("execute", function (e) {
                  MaelstromTools.Util.focusBase(e.getTarget().getUserData("cityId"));
                }, this);
                return cityButton;
              } catch (e) {
                console.log("MaelstromTools.Util.getFocusBaseButton: ", e);
              }
            },

            accessBase: function (cityId, viewMode) {
              try {
                if (cityId > 0) {
                  var ncity = MaelstromTools.Wrapper.GetCity(cityId);

                  if (ncity != null && !ncity.get_IsGhostMode()) {
                    if (viewMode) {
                      webfrontend.gui.UtilView.openVisModeInMainWindow(viewMode, cityId, false);
                    } else {
                      webfrontend.gui.UtilView.openCityInMainWindow(cityId);
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.Util.accessBase: ", e);
              }
            },
            focusBase: function (cityId) {
              try {
                if (cityId > 0) {
                  var ncity = MaelstromTools.Wrapper.GetCity(cityId);

                  if (ncity != null && !ncity.get_IsGhostMode()) {
                    webfrontend.gui.UtilView.centerCityOnRegionViewWindow(cityId);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.Util.focusBase: ", e);
              }
            },

            recallSupport: function (cityName) {
              try {
                var ncity = MT_Cache.Cities[cityName]["Object"];
                ncity.RecallDedicatedSupport();
              } catch (e) {
                console.log("MaelstromTools.Util.recallSupport: ", e);
              }
            },

            recallAllSupport: function () {
              try {
                MT_Cache.updateCityCache();
                for (var cityName in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cityName]["Object"];
                  ncity.RecallDedicatedSupport();
                }
              } catch (e) {
                console.log("MaelstromTools.Util.recallAllSupport: ", e);
              }
            },

            checkIfSupportIsAllowed: function (selectedBase) {
              try {
                if (selectedBase.get_VisObjectType() != ClientLib.Vis.VisObject.EObjectType.RegionCityType) {
                  return false;
                }
                if (selectedBase.get_Type() != ClientLib.Vis.Region.RegionCity.ERegionCityType.Own && selectedBase.get_Type() != ClientLib.Vis.Region.RegionCity.ERegionCityType.Alliance) {
                  return false;
                }
                return true;
              } catch (e) {
                console.log("MaelstromTools.Util.checkIfSupportIsAllowed: ", e);
                return false;
              }
            },

            calibrateWholeSupportOnSelectedBase: function () {
              if (this.checkIfSupportIsAllowed(MT_Cache.SelectedBaseForMenu)) {
                this.calibrateWholeSupport(MT_Cache.SelectedBaseForMenu);
              }
            },

            calibrateWholeSupport: function (targetRegionCity) {
              try {
                MT_Cache.updateCityCache();
                for (var cityName in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cityName]["Object"];
                  //var targetCity = MaelstromTools.Wrapper.GetCity(targetCityId);
                  var weapon = ncity.get_SupportWeapon();

                  //console.log("checking support weapon for " + ncity.get_Name() + " calibrating on " + targetRegionCity.get_Name());

                  if (targetRegionCity != null && weapon != null) {
                    //console.log("city at " + ncity.get_X() + " / " + ncity.get_Y());
                    //console.log("targetRegionCity at " + targetRegionCity.get_RawX() + " / " + targetRegionCity.get_RawY());
                    //var distance = ClientLib.Base.Util.CalculateDistance(ncity.get_X(), ncity.get_Y(), targetRegionCity.get_RawX(), targetRegionCity.get_RawY());
                    var dx = (ncity.get_X() - targetRegionCity.get_RawX());
                    var dy = (ncity.get_Y() - targetRegionCity.get_RawY());
                    var distance = ((dx * dx) + (dy * dy));
                    var range = MaelstromTools.Wrapper.GetSupportWeaponRange(weapon);
                    //console.log("distance is " + distance);
                    //console.log("range isy " + range*range);
                    if (distance <= (range * range)) {
                      ncity.SetDedicatedSupport(targetRegionCity.get_Id());
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.Util.calibrateWholeSupport: ", e);
              }
            },

            // visCity : ClientLib.Vis.Region.RegionObject
            getResources: function (visCity) { // to verifier against PerforceChangelist>=376877
              try {
                var loot = new Object();
                if (visCity.get_X() < 0 || visCity.get_Y() < 0) {
                  loot["LoadState"] = 0;
                  return loot;
                }
                var currentOwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();

                var distance = ClientLib.Base.Util.CalculateDistance(currentOwnCity.get_X(), currentOwnCity.get_Y(), visCity.get_RawX(), visCity.get_RawY());
                var maxAttackDistance = ClientLib.Data.MainData.GetInstance().get_Server().get_MaxAttackDistance();
                if (distance > maxAttackDistance) {
                  loot["LoadState"] = -1;
                  return loot;
                }

                var ncity = MaelstromTools.Wrapper.GetCity(visCity.get_Id());
                /* ClientLib.Data.CityBuildings */
                //var cityBuildings = ncity.get_CityBuildingsData();
                var cityUnits = ncity.get_CityUnitsData();

                //var buildings = MaelstromTools.Wrapper.GetBuildings(cityBuildings);
                var buildings = ncity.get_Buildings().d;
                var defenseUnits = MaelstromTools.Wrapper.GetDefenseUnits(cityUnits);
                //var defenseUnits = MaelstromTools.Wrapper.GetDefenseUnits();

                /*for(var u in buildings) {
              console.log(buildings[u].get_MdbBuildingId());
              console.log("----------------");
            }*/

                var buildingLoot = MaelstromTools.Util.getResourcesPart(buildings);
                //var buildingLoot2 = MaelstromTools.Util.getResourcesPart(this.collectBuildings(ncity));

                var unitLoot = MaelstromTools.Util.getResourcesPart(defenseUnits);

                loot[MaelstromTools.Statics.Tiberium] = buildingLoot[ClientLib.Base.EResourceType.Tiberium] + unitLoot[ClientLib.Base.EResourceType.Tiberium];
                loot[MaelstromTools.Statics.Crystal] = buildingLoot[ClientLib.Base.EResourceType.Crystal] + unitLoot[ClientLib.Base.EResourceType.Crystal];
                loot[MaelstromTools.Statics.Dollar] = buildingLoot[ClientLib.Base.EResourceType.Gold] + unitLoot[ClientLib.Base.EResourceType.Gold];
                loot[MaelstromTools.Statics.Research] = buildingLoot[ClientLib.Base.EResourceType.ResearchPoints] + unitLoot[ClientLib.Base.EResourceType.ResearchPoints];
                loot["Factor"] = loot[MaelstromTools.Statics.Tiberium] + loot[MaelstromTools.Statics.Crystal] + loot[MaelstromTools.Statics.Dollar] + loot[MaelstromTools.Statics.Research];
                loot["CPNeeded"] = currentOwnCity.CalculateAttackCommandPointCostToCoord(ncity.get_X(), ncity.get_Y());
                loot["LoadState"] = (loot["Factor"] > 0 ? 1 : 0);
                loot["Total"] = loot[MaelstromTools.Statics.Research] + loot[MaelstromTools.Statics.Tiberium] + loot[MaelstromTools.Statics.Crystal] + loot[MaelstromTools.Statics.Dollar];

                /*console.log("Building loot");
                console.log( buildingLoot[ClientLib.Base.EResourceType.Tiberium] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.Tiberium]);
                console.log( buildingLoot[ClientLib.Base.EResourceType.Crystal] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.Crystal]);
                console.log( buildingLoot[ClientLib.Base.EResourceType.Gold] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.Gold]);
                console.log( buildingLoot[ClientLib.Base.EResourceType.ResearchPoints] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.ResearchPoints]);
                console.log("-------------");*/
                return loot;
              } catch (e) {
                console.log("MaelstromTools.Util.getResources", e);
              }
            },
            /*
            collectBuildings: function(ncity) {
              var cityBuildings = ncity.get_CityBuildingsData();
              var buildings = new Array();
              var count = 0;
              // ncity.GetNumBuildings()
              for(var i = 0; i < 100000; i++) {
                var building = cityBuildings.GetBuildingByMDBId(i);
                if(!building) {
                  continue;
                }
                
                //console.log(building.get_TechName() + " - " + ncity.get_CityFaction() + " - " + ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(building.get_TechName(), ncity.get_CityFaction()) + " at lvl " + building.get_CurrentLevel());
                buildings.push(building);
              //buildings[count++] = building;
              }
              return buildings; //MaelstromTools.Util.ArrayUnique(buildings);
            },*/

            getResourcesPart: function (cityEntities) {
              try {
                var loot = [0, 0, 0, 0, 0, 0, 0, 0];
                if (cityEntities == null) {
                  return loot;
                }

                var objcityEntities = [];
                if (PerforceChangelist >= 376877) { //new
                  for (var o in cityEntities) objcityEntities.push(cityEntities[o]);
                } else { //old
                  for (var i = 0; i < cityEntities.length; i++) objcityEntities.push(cityEntities[i]);
                }

                for (var i = 0; i < objcityEntities.length; i++) {
                  var cityEntity = objcityEntities[i];
                  var unitLevelRequirements = MaelstromTools.Wrapper.GetUnitLevelRequirements(cityEntity);

                  for (var x = 0; x < unitLevelRequirements.length; x++) {
                    loot[unitLevelRequirements[x].Type] += unitLevelRequirements[x].Count * cityEntity.get_HitpointsPercent();
                    if (cityEntity.get_HitpointsPercent() < 1.0) {
                      // destroyed

                    }
                  }
                }

                return loot;
              } catch (e) {
                console.log("MaelstromTools.Util.getResourcesPart", e);
              }
            }

            /*
            findBuildings: function(city) {
              for (var k in city) {
                if ((typeof(city[k]) == "object") && city[k] && city[k] && 0 in city[k]) {
                  if ((typeof(city[k][0]) == "object")  && city[k][0] && "BuildingDBId" in city[k][0]) {
                    return city[k];
                  }
                }
              }
              return [];
            }*/
          }
        });

        // define Wrapper
        qx.Class.define("MaelstromTools.Wrapper", {
          type: "static",
          statics: {
            GetStepTime: function (step, defaultString) {
              if (!defaultString) {
                defaultString = "";
              }
              var endTime = ClientLib.Data.MainData.GetInstance().get_Time().GetTimespanString(step, ClientLib.Data.MainData.GetInstance().get_Time().GetServerStep());
              if (endTime == "00:00") {
                return defaultString;
              }
              return endTime;
            },

            FormatNumbersCompact: function (value) {
              if (PerforceChangelist >= 387751) { //new
                return phe.cnc.gui.util.Numbers.formatNumbersCompact(value);
              } else { //old
                return webfrontend.gui.Util.formatNumbersCompact(value);
              }
            },

            GetDateTimeString: function (value) {
                return phe.cnc.Util.getDateTimeString(value);
            },

            FormatTimespan: function (value) {
              return ClientLib.Vis.VisMain.FormatTimespan(value);
            },

            GetSupportWeaponRange: function (weapon) {
              return weapon.r;
            },

            GetCity: function (cityId) {
              return ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(cityId);
            },

            RepairAll: function (ncity, visMode) {
              var oldMode = ClientLib.Vis.VisMain.GetInstance().get_Mode();
              ClientLib.Vis.VisMain.GetInstance().set_Mode(visMode);
              ncity.RepairAll();
              ClientLib.Vis.VisMain.GetInstance().set_Mode(oldMode);
            },

            CanRepairAll: function (ncity, viewMode) {
              try {
                /*var oldMode = ClientLib.Vis.VisMain.GetInstance().get_Mode();
                ClientLib.Vis.VisMain.GetInstance().set_Mode(visMode);
                var retVal = ncity.CanRepairAll();
                ClientLib.Vis.VisMain.GetInstance().set_Mode(oldMode);
                return retVal;*/

                var repairData = ncity.get_CityRepairData();
                var myRepair = repairData.CanRepair(0, viewMode);
                repairData.UpdateCachedFullRepairAllCost(viewMode);
                return ((myRepair != null) && (!ncity.get_IsLocked() || (viewMode != ClientLib.Vis.Mode.ArmySetup)));

                return false;
              } catch (e) {
                console.log("MaelstromTools.Wrapper.CanRepairAll: ", e);
                return false;
              }
            },
            /*GetBuildings: function (cityBuildings) {
              if (PerforceChangelist >= 376877) { //new
                return (cityBuildings.get_Buildings() != null ? cityBuildings.get_Buildings().d : null);
              } else { //old
                return (cityBuildings.get_Buildings() != null ? cityBuildings.get_Buildings().l : null);
              }
            },*/
            GetDefenseUnits: function (cityUnits) {
            //GetDefenseUnits: function () {
              if (PerforceChangelist >= 392583) { //endgame patch
                return (cityUnits.get_DefenseUnits() != null ? cityUnits.get_DefenseUnits().d : null);
              } else { //old
                var defenseObjects = [];
                for (var x = 0; x < 9; x++) {
                  for (var y = 0; y < 8; y++) {
                    var defenseObject = ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().GetDefenseObjectFromPosition((x * ClientLib.Vis.VisMain.GetInstance().get_City().get_GridWidth()),(y * ClientLib.Vis.VisMain.GetInstance().get_City().get_GridHeight()));
                    if (defenseObject !== null && defenseObject.get_CityEntity() !== null) {
                      defenseObjects.push(defenseObject.get_UnitDetails());
                    }
                  }
                }
                return defenseObjects;
              }
            },
            GetUnitLevelRequirements: function (cityEntity) {
              if (PerforceChangelist >= 376877) { //new
                return (cityEntity.get_UnitLevelRepairRequirements() != null ? cityEntity.get_UnitLevelRepairRequirements() : null);
              } else { //old
                return (cityEntity.get_UnitLevelRequirements() != null ? cityEntity.get_UnitLevelRequirements() : null);
              }
            },

            GetBaseLevel: function (ncity) {
              return (Math.floor(ncity.get_LvlBase() * 100) / 100).toFixed(2);
            }
            /*,
            
            GetPointsByLevelWithThresholds: function (_levelThresholds,_levelFactors,_iLevel) {
              var result=0;
              var lastLevel=_iLevel;
              if(_levelThresholds.length != _levelFactors.length) {
                return 0;
              }
              for (var i=(_levelThresholds.length - 1); (i >= 0); i--) {
                var threshold=(_levelThresholds[i] - 1);
                if(lastLevel >= threshold) {
                  result += ((lastLevel - threshold) * _levelFactors[i]);
                  lastLevel=threshold;
                }
              }
              return result;
            },
            GetArmyPoints: function(_iLevel) {
              var server = ClientLib.Data.MainData.GetInstance().get_Server();
              var m_iArmyPointsPerLevelThresholds = server.get_ArmyPointsPerLevelThresholds();
              var m_fArmyPointsPerLevel = server.get_ArmyPointsPerLevel();
              _iLevel += 4;
              var armyPoints = MaelstromTools.Wrapper.GetPointsByLevelWithThresholds(m_iArmyPointsPerLevelThresholds, m_fArmyPointsPerLevel, _iLevel);
              return Math.min(armyPoints, server.get_MaxArmyPoints());
            },
            
            GetBuilding: function(ncity, techName) {
              return ncity.get_CityBuildingsData().GetUniqueBuildingByTechName(techName)
            },
            
            GetCommandCenter: function(ncity) {
              //var techName = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Command_Center, ClientLib.Data.MainData.GetInstance().get_Player().get_Faction());

              return MaelstromTools.Wrapper.GetBuilding(ncity, ClientLib.Base.ETechName.Command_Center);
            // conyard return this.GetBuildingCondition$0(ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction$0(0, ClientLib.Data.MainData.GetInstance$9().get_Player$2().get_Faction$2()));
            // ClientLib.Data.City.prototype.GetOffenseConditionInPercent=ClientLib.Data.City.prototype.GetOffenseConditionInPercent$0;
            }*/
          }
        });

        // define LocalStorage
        qx.Class.define("MaelstromTools.LocalStorage", {
          type: "static",
          statics: {
            isSupported: function () {
              return typeof (Storage) !== "undefined";
            },
            set: function (key, value) {
              try {
                if (MaelstromTools.LocalStorage.isSupported()) {
                  localStorage["CCTA_MaelstromTools_" + key] = JSON.stringify(value);
                }
              } catch (e) {
                console.log("MaelstromTools.LocalStorage.set: ", e);
              }
            },
            get: function (key, defaultValueIfNotSet) {
              try {
                if (MaelstromTools.LocalStorage.isSupported()) {
                  if (localStorage["CCTA_MaelstromTools_" + key] != null && localStorage["CCTA_MaelstromTools_" + key] != 'undefined') {
                    return JSON.parse(localStorage["CCTA_MaelstromTools_" + key]);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.LocalStorage.get: ", e);
              }
              return defaultValueIfNotSet;
            },
            clearAll: function () {
              try {
                if (!MaelstromTools.LocalStorage.isSupported()) {
                  return;
                }
                for (var key in localStorage) {
                  if (key.indexOf("CCTA_MaelstromTools_") == 0) {
                    localStorage.removeItem(key);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.LocalStorage.clearAll: ", e);
              }
            }
          }
        });

        // define Cache
        qx.Class.define("MaelstromTools.Cache", {
          type: "singleton",
          extend: qx.core.Object,
          members: {
            CityCount: 0,
            Cities: null,
            SelectedBaseForMenu: null,
            SelectedBaseResources: null,
            SelectedBaseForLoot: null,

            updateCityCache: function () {
              try {
                this.CityCount = 0;
                this.Cities = Object();

                var cities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities();
                for (var cindex in cities.d) {
                  this.CityCount++;
                  var ncity = MaelstromTools.Wrapper.GetCity(cindex);
                  var ncityName = ncity.get_Name();
                  this.Cities[ncityName] = Object();
                  this.Cities[ncityName]["ID"] = cindex;
                  this.Cities[ncityName]["Object"] = ncity;
                }
              } catch (e) {
                console.log("MaelstromTools.Cache.updateCityCache: ", e);
              }
            },

            updateLoot: function (visCity) {
              var cityId = visCity.get_Id();

              if (this.SelectedBaseForLoot != null && cityId == this.SelectedBaseForLoot.get_Id() && this.SelectedBaseResources != null && this.SelectedBaseResources["LoadState"] > 0) {
                return -2;
              }
              this.SelectedBaseForLoot = visCity;
              this.SelectedBaseResources = MaelstromTools.Util.getResources(visCity);
              return this.SelectedBaseResources["LoadState"];
            }
          }
        });

        // define HuffyTools.ImageRender
        qx.Class.define("HuffyTools.ImageRender", {
          extend: qx.ui.table.cellrenderer.AbstractImage,
          construct: function (width, height) {
            this.base(arguments);
            if (width) {
              this.__imageWidth = width;
            }
            if (height) {
              this.__imageHeight = height;
            }
            this.__am = qx.util.AliasManager.getInstance();
          },
          members: {
            __am: null,
            __imageHeight: 16,
            __imageWidth: 16,
            // overridden
            _identifyImage: function (cellInfo) {
              var imageHints = {
                imageWidth: this.__imageWidth,
                imageHeight: this.__imageHeight
              };
              if (cellInfo.value == "") {
                imageHints.url = null;
              } else {
                imageHints.url = this.__am.resolve(cellInfo.value);
              }
              imageHints.tooltip = cellInfo.tooltip;
              return imageHints;
            }
          },
          destruct: function () {
            this.__am = null;
          }
        });

        // define HuffyTools.ReplaceRender
        qx.Class.define("HuffyTools.ReplaceRender", {
          extend: qx.ui.table.cellrenderer.Default,
          properties: {
            replaceFunction: {
              check: "Function",
              nullable: true,
              init: null
            }
          },
          members: {
            // overridden
            _getContentHtml: function (cellInfo) {
              var value = cellInfo.value;
              var replaceFunc = this.getReplaceFunction();
              // use function
              if (replaceFunc) {
                cellInfo.value = replaceFunc(value);
              }
              return qx.bom.String.escape(this._formatValue(cellInfo));
            }
          }
        });

        qx.Class.define("HuffyTools.CityCheckBox", {
          extend: qx.ui.form.CheckBox,
          members: {
            HT_CityID: null
          }
        });

        // define HuffyTools.UpgradePriorityGUI
        qx.Class.define("HuffyTools.UpgradePriorityGUI", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            HT_TabView: null,
            HT_Options: null,
            HT_ShowOnlyTopBuildings: null,
            HT_ShowOnlyAffordableBuildings: null,
            HT_CityBuildings: null,
            HT_Pages: null,
            HT_Tables: null,
            HT_Models: null,
            HT_SelectedResourceType: null,
            BuildingList: null,
            upgradeInProgress: null,
            init: function () {
              /*
              Done:
              - Added cost per gain to the lists
              - Added building coordinates to the lists
              - Only display the top affordable and not affordable building
              - Persistent filter by city, top and affordable per resource type
              - Reload onTabChange for speed optimization
              - Estimated time until upgrade is affordable
              
              ToDo:
              - let the user decide to sort by colums he like i.e. timefactor or cost/gain and save it in the configuration
              - integrate buttons to transfer resources ?

               */
              try {
                this.HT_SelectedResourceType = -1;
                this.IsTimerEnabled = false;
                this.upgradeInProgress = false;

                this.HT_TabView = new qx.ui.tabview.TabView();
                this.HT_TabView.set({
                  contentPadding: 0,
                  appearance: "tabview",
                  margin: 5,
                  barPosition: 'left'
                });
                this.Widget = new qx.ui.tabview.Page("UpgradePriority");
                this.Widget.setPadding(0);
                this.Widget.setMargin(0);
                this.Widget.setBackgroundColor("#BEC8CF");
                this.Widget.setLayout(new qx.ui.layout.VBox(2));
                //this.Widget.add(this.HT_Options);
                this.Widget.add(this.HT_TabView, {
                  flex: 1
                });
                this.Window.setPadding(0);
                this.Window.set({
                  resizable: true
                });

                this.Window.removeAll();
                this.Window.add(this.Widget);

                this.BuildingList = new Array;
                this.HT_Models = new Array;
                this.HT_Tables = new Array;
                this.HT_Pages = new Array;

                this.createTabPage(ClientLib.Base.EResourceType.Tiberium);
                this.createTable(ClientLib.Base.EResourceType.Tiberium);
                this.HT_Tables[ClientLib.Base.EResourceType.Tiberium].addListener("cellClick", function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Tiberium);
                }, this);


                this.createTabPage(ClientLib.Base.EResourceType.Crystal);
                this.createTable(ClientLib.Base.EResourceType.Crystal);
                this.HT_Tables[ClientLib.Base.EResourceType.Crystal].addListener("cellClick", function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Crystal);
                }, this);

                this.createTabPage(ClientLib.Base.EResourceType.Power);
                this.createTable(ClientLib.Base.EResourceType.Power);
                this.HT_Tables[ClientLib.Base.EResourceType.Power].addListener("cellClick", function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Power);
                }, this);

                this.createTabPage(ClientLib.Base.EResourceType.Gold);
                this.createTable(ClientLib.Base.EResourceType.Gold);
                this.HT_Tables[ClientLib.Base.EResourceType.Gold].addListener("cellClick", function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Gold);
                }, this);


                MT_Cache.updateCityCache();
                this.HT_Options = new Array();
                this.HT_ShowOnlyTopBuildings = new Array();
                this.HT_ShowOnlyAffordableBuildings = new Array();
                this.HT_CityBuildings = new Array();
                for (var mPage in this.HT_Pages) {
                  this.createOptions(mPage);
                  this.HT_Pages[mPage].add(this.HT_Options[mPage]);
                  this.HT_Pages[mPage].add(this.HT_Tables[mPage], {
                    flex: 1
                  });
                  this.HT_TabView.add(this.HT_Pages[mPage]);
                }

                // Zeigen wir Dollars an !
                this.HT_TabView.setSelection([this.HT_TabView.getChildren()[2]]);
                this.HT_SelectedResourceType = ClientLib.Base.EResourceType.Gold;
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.init: ", e);
              }
            },
            createOptions: function (eType) {
              var oBox = new qx.ui.layout.Flow();
              var oOptions = new qx.ui.container.Composite(oBox);
              oOptions.setMargin(5);
              this.HT_ShowOnlyTopBuildings[eType] = new qx.ui.form.CheckBox(Lang.gt("display only top buildings"));
              this.HT_ShowOnlyTopBuildings[eType].setMargin(5);
              this.HT_ShowOnlyTopBuildings[eType].setValue(MaelstromTools.LocalStorage.get("UGL_TOPBUILDINGS_" + eType, true));
              this.HT_ShowOnlyTopBuildings[eType].addListener("execute", this.CBChanged, this);
              oOptions.add(this.HT_ShowOnlyTopBuildings[eType], {
                left: 10,
                top: 10
              });
              this.HT_ShowOnlyAffordableBuildings[eType] = new qx.ui.form.CheckBox(Lang.gt("display only affordable buildings"));
              this.HT_ShowOnlyAffordableBuildings[eType].setMargin(5);
              this.HT_ShowOnlyAffordableBuildings[eType].setValue(MaelstromTools.LocalStorage.get("UGL_AFFORDABLE_" + eType, true));
              this.HT_ShowOnlyAffordableBuildings[eType].addListener("execute", this.CBChanged, this);
              oOptions.add(this.HT_ShowOnlyAffordableBuildings[eType], {
                left: 10,
                top: 10,
                lineBreak: true
              });
              this.HT_CityBuildings[eType] = new Array();
              for (var cname in MT_Cache.Cities) {
                var oCity = MT_Cache.Cities[cname].Object;
                var oCityBuildings = new HuffyTools.CityCheckBox(cname);
                oCityBuildings.HT_CityID = oCity.get_Id();
                oCityBuildings.setMargin(5);
                oCityBuildings.setValue(MaelstromTools.LocalStorage.get("UGL_CITYFILTER_" + eType + "_" + oCity.get_Id(), true));
                oCityBuildings.addListener("execute", this.CBChanged, this);
                oOptions.add(oCityBuildings, {
                  left: 10,
                  top: 10
                });
                this.HT_CityBuildings[eType][cname] = oCityBuildings;
              }
              this.HT_Options[eType] = oOptions;
            },
            createTable: function (eType) {
              try {
                this.HT_Models[eType] = new qx.ui.table.model.Simple();
                this.HT_Models[eType].setColumns(["ID", Lang.gt("City"), Lang.gt("Type (coord)"), Lang.gt("to Level"), Lang.gt("Gain/h"), Lang.gt("Factor"), Lang.gt("Tiberium"), Lang.gt("Power"), Lang.gt("Tib/gain"), Lang.gt("Pow/gain"), Lang.gt("ETA"), Lang.gt("Upgrade"), "State"]);
                this.HT_Tables[eType] = new qx.ui.table.Table(this.HT_Models[eType]);
                this.HT_Tables[eType].setColumnVisibilityButtonVisible(false);
                this.HT_Tables[eType].setColumnWidth(0, 0);
                this.HT_Tables[eType].setColumnWidth(1, 90);
                this.HT_Tables[eType].setColumnWidth(2, 120);
                this.HT_Tables[eType].setColumnWidth(3, 55);
                this.HT_Tables[eType].setColumnWidth(4, 70);
                this.HT_Tables[eType].setColumnWidth(5, 60);
                this.HT_Tables[eType].setColumnWidth(6, 70);
                this.HT_Tables[eType].setColumnWidth(7, 70);
                this.HT_Tables[eType].setColumnWidth(8, 70);
                this.HT_Tables[eType].setColumnWidth(9, 70);
                this.HT_Tables[eType].setColumnWidth(10, 70);
                this.HT_Tables[eType].setColumnWidth(11, 40);
                this.HT_Tables[eType].setColumnWidth(12, 0);
                var tcm = this.HT_Tables[eType].getTableColumnModel();
                tcm.setColumnVisible(0, false);
                tcm.setColumnVisible(12, false);
                tcm.setDataCellRenderer(4, new qx.ui.table.cellrenderer.Number().set({
                  numberFormat: new qx.util.format.NumberFormat().set({
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2
                  })
                }));
                tcm.setDataCellRenderer(5, new qx.ui.table.cellrenderer.Number().set({
                  numberFormat: new qx.util.format.NumberFormat().set({
                    maximumFractionDigits: 5,
                    minimumFractionDigits: 5
                  })
                }));
                tcm.setDataCellRenderer(6, new HuffyTools.ReplaceRender().set({
                  ReplaceFunction: this.formatTiberiumAndPower
                }));
                tcm.setDataCellRenderer(7, new HuffyTools.ReplaceRender().set({
                  ReplaceFunction: this.formatTiberiumAndPower
                }));
                tcm.setDataCellRenderer(11, new HuffyTools.ImageRender(40, 20));
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.createTable: ", e);
              }
            },
            createTabPage: function (resource_type) {
              try {
                var sName = MaelstromTools.Statics.LootTypeName(resource_type);
                var oRes = new qx.ui.tabview.Page(Lang.gt(sName), MT_Base.images[sName]);
                oRes.setLayout(new qx.ui.layout.VBox(2));
                oRes.setPadding(5);
                var btnTab = oRes.getChildControl("button");
                btnTab.resetWidth();
                btnTab.resetHeight();
                btnTab.set({
                  show: "icon",
                  margin: 0,
                  padding: 0,
                  toolTipText: sName
                });
                btnTab.addListener("execute", this.TabChanged, [this, resource_type]);
                this.HT_Pages[resource_type] = oRes;
                return oRes;
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.createTabPage: ", e);
              }
            },

            TabChanged: function (e) {
              try {
                this[0].HT_SelectedResourceType = this[1];
                this[0].UpgradeCompleted(null, null);
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.TabChanged: ", e);
              }
            },

            upgradeBuilding: function (e, eResourceType) {
              if (this.upgradeInProgress == true) {
                console.log("upgradeBuilding:", "upgrade in progress !");
                return;
              }
              try {
                if (e.getColumn() == 11) {
                  var buildingID = this.HT_Models[eResourceType].getValue(0, e.getRow());
                  var iState = parseInt(this.HT_Models[eResourceType].getValue(12, e.getRow()));
                  if (iState != 1) {
                    return;
                  }
                  if (buildingID in this.BuildingList) {
                    this.upgradeInProgress = true;
                    if (PerforceChangelist >= 382917) { //new
                      ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", this.BuildingList[buildingID], phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, this.UpgradeCompleted), null, true);
                    } else { //old
                      ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", this.BuildingList[buildingID], webfrontend.Util.createEventDelegate(ClientLib.Net.CommandResult, this, this.UpgradeCompleted), null, true);
                    }
                  }
                }
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.upgradeBuilding: ", e);
              }
            },
            UpgradeCompleted: function (context, result) {
              var self = this;
              window.setTimeout(function () {
                self.calc();
              }, 1000);
              this.upgradeInProgress = false;
            },
            CBChanged: function (e) {
              this.UpgradeCompleted(null, null);
            },
            formatTiberiumAndPower: function (oValue) {
              if (PerforceChangelist >= 387751) { //new
                return phe.cnc.gui.util.Numbers.formatNumbersCompact(oValue);
              } else { //old
                return webfrontend.gui.Util.formatNumbersCompact(oValue);
              }
            },
            updateCache: function () {
              try {
                if (!this.HT_TabView) {
                  this.init();
                }
                var eType = this.HT_SelectedResourceType;
                var bTop = this.HT_ShowOnlyTopBuildings[eType].getValue();
                MaelstromTools.LocalStorage.set("UGL_TOPBUILDINGS_" + eType, bTop);
                var bAffordable = this.HT_ShowOnlyAffordableBuildings[eType].getValue();
                MaelstromTools.LocalStorage.set("UGL_AFFORDABLE_" + eType, bAffordable);
                var oCityFilter = new Array();
                for (var cname in this.HT_CityBuildings[eType]) {
                  var oCityBuildings = this.HT_CityBuildings[eType][cname];
                  var bFilterBuilding = oCityBuildings.getValue();
                  MaelstromTools.LocalStorage.set("UGL_CITYFILTER_" + eType + "_" + oCityBuildings.HT_CityID, bFilterBuilding);
                  oCityFilter[cname] = bFilterBuilding;
                }
                window.HuffyTools.UpgradePriority.getInstance().collectData(bTop, bAffordable, oCityFilter, eType);
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.updateCache: ", e);
              }
            },
            setWidgetLabels: function () {
              try {
                var HuffyCalc = window.HuffyTools.UpgradePriority.getInstance();
                var UpgradeList = HuffyCalc.Cache;

                for (var eResourceType in UpgradeList) {
                  //var eResourceType = MaelstromTools.Statics.LootTypeName(eResourceName);
                  var rowData = [];

                  this.HT_Models[eResourceType].setData([]);

                  for (var mCity in UpgradeList[eResourceType]) {
                    for (var mBuilding in UpgradeList[eResourceType][mCity]) {
                      var UpItem = UpgradeList[eResourceType][mCity][mBuilding];
                      if (typeof (UpItem.Type) == "undefined") {
                        continue;
                      }
                      if (!(mBuilding in this.BuildingList)) {
                        this.BuildingList[UpItem.ID] = UpItem.Building;
                      }
                      var iTiberiumCosts = 0;
                      if (ClientLib.Base.EResourceType.Tiberium in UpItem.Costs) {
                        iTiberiumCosts = UpItem.Costs[ClientLib.Base.EResourceType.Tiberium];
                      }
                      var iTiberiumPerGain = 0;
                      if (ClientLib.Base.EResourceType.Tiberium in UpItem.Costs) {
                        iTiberiumPerGain = UpItem.Costs[ClientLib.Base.EResourceType.Tiberium] / UpItem.GainPerHour;
                      }
                      var iPowerCosts = 0;
                      if (ClientLib.Base.EResourceType.Power in UpItem.Costs) {
                        iPowerCosts = UpItem.Costs[ClientLib.Base.EResourceType.Power];
                      }
                      var iPowerPerGain = 0;
                      if (ClientLib.Base.EResourceType.Power in UpItem.Costs) {
                        iPowerPerGain = UpItem.Costs[ClientLib.Base.EResourceType.Power] / UpItem.GainPerHour;
                      }
                      var img = MT_Base.images["UpgradeBuilding"];
                      if (UpItem.Affordable == false) {
                        img = "";
                      }
                      var sType = UpItem.Type;
                      sType = sType + "(" + UpItem.PosX + ":" + UpItem.PosY + ")";
                      var iETA = 0;
                      if (UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Tiberium] > 0) {
                        iETA = UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Tiberium];
                      }
                      if (UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Power] > iETA) {
                        iETA = UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Power];
                      }
                      var sETA = "";
                      if (iETA > 0) {
                        sETA = ClientLib.Vis.VisMain.FormatTimespan(iETA);
                      }
                      var iState = 0;
                      if (UpItem.Affordable == true) {
                        iState = 1;
                      } else if (UpItem.AffordableByTransfer == true) {
                        iState = 2;
                      } else {
                        iState = 3;
                      }
                      rowData.push([UpItem.ID, mCity, sType, UpItem.Level, UpItem.GainPerHour, UpItem.Ticks, iTiberiumCosts, iPowerCosts, iTiberiumPerGain, iPowerPerGain, sETA, img, iState]);
                    }
                  }
                  this.HT_Models[eResourceType].setData(rowData);
                }
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.setWidgetLabels: ", e);
              }
            }
          }
        });

        // define HuffyTools.UpgradePriority
        qx.Class.define("HuffyTools.UpgradePriority", {
          type: "singleton",
          extend: qx.core.Object,
          members: {
            list_units: null,
            list_buildings: null,

            comparePrio: function (elem1, elem2) {
              if (elem1.Ticks < elem2.Ticks) return -1;
              if (elem1.Ticks > elem2.Ticks) return 1;
              return 0;
            },
            getPrioList: function (city, arTechtypes, eModPackageSize, eModProduction, bOnlyTopBuildings, bOnlyAffordableBuildings) {
              try {
                var RSI = window.MaelstromTools.ResourceOverview.getInstance();
                RSI.updateCache();
                var TotalTiberium = 0;

                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  var i = cityCache[MaelstromTools.Statics.Tiberium];
                  if (typeof (i) !== 'undefined') {
                    TotalTiberium += i;
                    //but never goes here during test.... // to optimize - to do
                  }
                }
                var resAll = new Array();
                var prod = MaelstromTools.Production.getInstance().updateCache(city.get_Name());
                //var buildings = MaelstromTools.Wrapper.GetBuildings(city.get_CityBuildingsData());
                var buildings = city.get_Buildings().d;

                // 376877 & old fixes 
                var objbuildings = [];
                if (PerforceChangelist >= 376877) { //new
                  for (var o in buildings) objbuildings.push(buildings[o]);
                } else { //old
                  for (var i = 0; i < buildings.length; i++) objbuildings.push(buildings[i]);
                }


                for (var i = 0; i < objbuildings.length; i++) {
                  var city_building = objbuildings[i];

                  // TODO: check for destroyed building

                  var iTechType = city_building.get_TechName();
                  var bSkip = true;
                  for (var iTypeKey in arTechtypes) {
                    if (arTechtypes[iTypeKey] == iTechType) {
                      bSkip = false;
                      break;
                    }
                  }
                  if (bSkip == true) {
                    continue;
                  }
                  var city_buildingdetailview = city.GetBuildingDetailViewInfo(city_building);
                  if (city_buildingdetailview == null) {
                    continue;
                  }
                  var bindex = city_building.get_Id();
                  var resbuilding = new Array();
                  resbuilding["ID"] = bindex;
                  resbuilding["Type"] = this.TechTypeName(parseInt(iTechType, 10));
                  resbuilding["PosX"] = city_building.get_CoordX();
                  resbuilding["PosY"] = city_building.get_CoordY();

                  resbuilding["Building"] = {
                    cityid: city.get_Id(),
                    posX: resbuilding["PosX"],
                    posY: resbuilding["PosY"],
                    isPaid: true
                  };

                  resbuilding["GainPerHour"] = 0;
                  resbuilding["Level"] = city_building.get_CurrentLevel() + 1;
                  for (var ModifierType in city_buildingdetailview.OwnProdModifiers.d) {
                    switch (parseInt(ModifierType, 10)) {
                      case eModPackageSize:
                        {
                          var ModOj = city_buildingdetailview.OwnProdModifiers.d[city_building.get_MainModifierTypeId()];
                          var Mod = (ModOj.TotalValue + ModOj.NewLvlDelta) / ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
                          resbuilding["GainPerHour"] += (city_buildingdetailview.OwnProdModifiers.d[ModifierType].NewLvlDelta / Mod);
                          break;
                        }
                      case eModProduction:
                        {
                          resbuilding["GainPerHour"] += city_buildingdetailview.OwnProdModifiers.d[ModifierType].NewLvlDelta;
                          break;
                        }
                    }
                  }
                  // Nutzen ins VerhÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¤ltnis zu den Kosten setzten
                  var TechLevelData = ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(city_building.get_CurrentLevel() + 1, city_building.get_TechGameData_Obj());
                  var RatioPerCostType = new Object();
                  var sRatio = "";
                  var sCosts = "";
                  var lTicks = 0;
                  var bHasPower = true;
                  var bHasTiberium = true;
                  var bAffordableByTransfer = true;
                  var oCosts = new Array();
                  var oTimes = new Array();
                  for (var costtype in TechLevelData) {
                    if (typeof (TechLevelData[costtype]) == "function") {
                      continue;
                    }
                    if (TechLevelData[costtype].Type == "0") {
                      continue;
                    }

                    oCosts[TechLevelData[costtype].Type] = TechLevelData[costtype].Count;
                    if (parseInt(TechLevelData[costtype].Count) <= 0) {
                      continue;
                    }
                    RatioPerCostType[costtype] = TechLevelData[costtype].Count / resbuilding["GainPerHour"];
                    if (sCosts.length > 0) {
                      sCosts = sCosts + ", ";
                    }
                    sCosts = sCosts + MaelstromTools.Wrapper.FormatNumbersCompact(TechLevelData[costtype].Count) + " " + MaelstromTools.Statics.LootTypeName(TechLevelData[costtype].Type);
                    if (sRatio.length > 0) {
                      sRatio = sRatio + ", ";
                    }
                    // Upgrade affordable ?
                    if (city.GetResourceCount(TechLevelData[costtype].Type) < TechLevelData[costtype].Count) {
                      switch (TechLevelData[costtype].Type) {
                        case ClientLib.Base.EResourceType.Tiberium:
                          {
                            bHasTiberium = false;
                            if (TotalTiberium < TechLevelData[costtype].Count) {
                              bAffordableByTransfer = false;
                            }
                          }
                          break;
                        case ClientLib.Base.EResourceType.Power:
                          {
                            bHasPower = false;
                          }
                          break;
                      }
                    }
                    sRatio = sRatio + MaelstromTools.Wrapper.FormatNumbersCompact(RatioPerCostType[costtype]);

                    var techlevelData = MaelstromTools.Statics.LootTypeName(TechLevelData[costtype].Type);

                    var dCityProduction = prod[techlevelData].Delta + prod[techlevelData].ExtraBonusDelta + prod[techlevelData].POI;
                    if (dCityProduction > 0) {
                      if (lTicks < (3600 * RatioPerCostType[costtype] / dCityProduction)) {
                        lTicks = (3600 * RatioPerCostType[costtype] / dCityProduction);
                      }
                    }
                    oTimes[TechLevelData[costtype].Type] = 0;
                    if (oCosts[TechLevelData[costtype].Type] > city.GetResourceCount(TechLevelData[costtype].Type)) {
                      oTimes[TechLevelData[costtype].Type] = (3600 * (oCosts[TechLevelData[costtype].Type] - city.GetResourceCount(TechLevelData[costtype].Type))) / dCityProduction;
                    }
                  }
                  resbuilding["Ticks"] = lTicks;
                  resbuilding["Time"] = ClientLib.Vis.VisMain.FormatTimespan(lTicks);
                  resbuilding["Costtext"] = sCosts;
                  resbuilding["Costs"] = oCosts;
                  resbuilding["TimeTillUpgradable"] = oTimes;
                  resbuilding["Ratio"] = sRatio;
                  resbuilding["Affordable"] = bHasTiberium && bHasPower;
                  resbuilding["AffordableByTransfer"] = bHasPower && bAffordableByTransfer;
                  if (resbuilding["GainPerHour"] > 0 && (bOnlyAffordableBuildings == false || resbuilding["Affordable"] == true)) {
                    resAll[bindex] = resbuilding;
                  }
                }


                resAll = resAll.sort(this.comparePrio);
                if (!bOnlyTopBuildings) {
                  return resAll;
                }
                var res2 = new Array();
                if (MaelstromTools.Util.ArraySize(resAll) > 0) {
                  var iTopNotAffordable = -1;
                  var iTopAffordable = -1;
                  var iNextNotAffordable = -1;
                  var iLastIndex = -1;
                  for (var iNewIndex in resAll) {
                    if (resAll[iNewIndex].Affordable == true) {
                      if (iTopAffordable == -1) {
                        iTopAffordable = iNewIndex;
                        iNextNotAffordable = iLastIndex;
                      }
                    } else {
                      if (iTopNotAffordable == -1) {
                        iTopNotAffordable = iNewIndex;
                      }
                    }
                    iLastIndex = iNewIndex;
                  }
                  if (iTopAffordable == -1) {
                    iNextNotAffordable = iLastIndex;
                  }
                  var iIndex = 0;
                  if (iTopNotAffordable != -1) {
                    res2[iIndex++] = resAll[iTopNotAffordable];
                  }
                  if (iNextNotAffordable != -1) {
                    res2[iIndex++] = resAll[iNextNotAffordable];
                  }
                  if (iTopAffordable != -1) {
                    res2[iIndex++] = resAll[iTopAffordable];
                  }
                }
                res2 = res2.sort(this.comparePrio);
                return res2;
              } catch (e) {
                console.log("HuffyTools.getPrioList: ", e);
              }
            },
            TechTypeName: function (iTechType) {
              switch (iTechType) {
                case ClientLib.Base.ETechName.PowerPlant:
                  {
                    return Lang.gt("Powerplant");
                    break;
                  }
                case ClientLib.Base.ETechName.Refinery:
                  {
                    return Lang.gt("Refinery");
                    break;
                  }
                case ClientLib.Base.ETechName.Harvester_Crystal:
                  {
                    return Lang.gt("Harvester");
                    break;
                  }
                case ClientLib.Base.ETechName.Harvester:
                  {
                    return Lang.gt("Harvester");
                    break;
                  }
                case ClientLib.Base.ETechName.Silo:
                  {
                    return Lang.gt("Silo");
                    break;
                  }
                case ClientLib.Base.ETechName.Accumulator:
                  {
                    return Lang.gt("Accumulator");
                    break;
                  }
              }
              return "?";
            },
            collectData: function (bOnlyTopBuildings, bOnlyAffordableBuildings, oCityFilter, eSelectedResourceType) {
              try {
                MT_Cache.updateCityCache();
                this.Cache = new Object();
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Tiberium) {
                  this.Cache[ClientLib.Base.EResourceType.Tiberium] = new Object();
                }
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Crystal) {
                  this.Cache[ClientLib.Base.EResourceType.Crystal] = new Object();
                }
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Power) {
                  this.Cache[ClientLib.Base.EResourceType.Power] = new Object();
                }
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Gold) {
                  this.Cache[ClientLib.Base.EResourceType.Gold] = new Object();
                }
                for (var cname in MT_Cache.Cities) {
                  var city = MT_Cache.Cities[cname].Object;
                  if (oCityFilter[cname] == false) {
                    continue;
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Tiberium) {
                    this.Cache[ClientLib.Base.EResourceType.Tiberium][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.Harvester, ClientLib.Base.ETechName.Silo], ClientLib.Base.EModifierType.TiberiumPackageSize, ClientLib.Base.EModifierType.TiberiumProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Crystal) {
                    this.Cache[ClientLib.Base.EResourceType.Crystal][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.Harvester, ClientLib.Base.ETechName.Silo], ClientLib.Base.EModifierType.CrystalPackageSize, ClientLib.Base.EModifierType.CrystalProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Power) {
                    this.Cache[ClientLib.Base.EResourceType.Power][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.PowerPlant, ClientLib.Base.ETechName.Accumulator], ClientLib.Base.EModifierType.PowerPackageSize, ClientLib.Base.EModifierType.PowerProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Gold) {
                    this.Cache[ClientLib.Base.EResourceType.Gold][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.Refinery, ClientLib.Base.ETechName.PowerPlant], ClientLib.Base.EModifierType.CreditsPackageSize, ClientLib.Base.EModifierType.CreditsProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                }
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.collectData: ", e);
              }
            }
          }
        });

        var __MTCity_initialized = false; //k undeclared

        var Lang = window.MaelstromTools.Language.getInstance();
        var MT_Cache = window.MaelstromTools.Cache.getInstance();
        var MT_Base = window.MaelstromTools.Base.getInstance();
        var MT_Preferences = window.MaelstromTools.Preferences.getInstance();
        MT_Preferences.readOptions();

        if (!webfrontend.gui.region.RegionCityMenu.prototype.__MTCity_showMenu) {
          webfrontend.gui.region.RegionCityMenu.prototype.__MTCity_showMenu = webfrontend.gui.region.RegionCityMenu.prototype.showMenu;
        }
        webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function (selectedVisObject) {

          MT_Cache.SelectedBaseForMenu = selectedVisObject;
          var baseStatusOverview = window.MaelstromTools.BaseStatus.getInstance();

          if (__MTCity_initialized == false) {
            //console.log(selectedBase.get_Name());
            __MTCity_initialized = true;
            baseStatusOverview.CityMenuButtons = new Array();

            for (var k in this) {
              try {
                if (this.hasOwnProperty(k)) {
                  if (this[k] && this[k].basename == "Composite") {
                    var button = new qx.ui.form.Button(Lang.gt("Calibrate support"));
                    button.addListener("execute", function (e) {
                      MaelstromTools.Util.calibrateWholeSupportOnSelectedBase();
                    }, this);

                    this[k].add(button);
                    baseStatusOverview.CityMenuButtons.push(button);
                  }
                }
              } catch (e) {
                console.log("webfrontend.gui.region.RegionCityMenu.prototype.showMenu: ", e);
              }
            }
          }

          var isAllowed = MaelstromTools.Util.checkIfSupportIsAllowed(MT_Cache.SelectedBaseForMenu);

          for (var x = 0; x < baseStatusOverview.CityMenuButtons.length; ++x) {
            baseStatusOverview.CityMenuButtons[x].setVisibility(isAllowed ? 'visible' : 'excluded');
          }
          this.__MTCity_showMenu(selectedVisObject);
        };

        if (MT_Preferences.Settings.showLoot) {
          // Wrap onCitiesChange method
          if (!webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__MTCity_NPCCamp) {
            webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__MTCity_NPCCamp = webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange;
          }
          webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange = function () {
            MT_Base.updateLoot(1, ClientLib.Vis.VisMain.GetInstance().get_SelectedObject(), webfrontend.gui.region.RegionNPCCampStatusInfo.getInstance());
            return this.__MTCity_NPCCamp();
          };

          if (!webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.__MTCity_NPCBase) {
            webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.__MTCity_NPCBase = webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange;
          }
          webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange = function () {
            MT_Base.updateLoot(2, ClientLib.Vis.VisMain.GetInstance().get_SelectedObject(), webfrontend.gui.region.RegionNPCBaseStatusInfo.getInstance());
            //MT_Base.updateLoot(2, ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(), webfrontend.gui.region.RegionNPCBaseStatusInfo.getInstance());
            return this.__MTCity_NPCBase();
          };

          if (!webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.__MTCity_City) {
            webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.__MTCity_City = webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange;
          }
          webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange = function () {
            MT_Base.updateLoot(3, ClientLib.Vis.VisMain.GetInstance().get_SelectedObject(), webfrontend.gui.region.RegionCityStatusInfoEnemy.getInstance());
            //MT_Base.updateLoot(3, ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(), webfrontend.gui.region.RegionCityStatusInfoEnemy.getInstance());
            return this.__MTCity_City();
          };
        }

      }
    } catch (e) {
      console.log("createMaelstromTools: ", e);
    }

    function MaelstromTools_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
          createMaelstromTools();
          window.MaelstromTools.Base.getInstance().initialize();
        } else {
          window.setTimeout(MaelstromTools_checkIfLoaded, 1000);
        }
      } catch (e) {
        console.log("MaelstromTools_checkIfLoaded: ", e);
      }
    }

    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(MaelstromTools_checkIfLoaded, 1000);
    }
  };

  try {
    var MaelstromScript = document.createElement("script");
    MaelstromScript.innerHTML = "(" + MaelstromTools_main.toString() + ")();";
    MaelstromScript.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain)) {
      document.getElementsByTagName("head")[0].appendChild(MaelstromScript);
    }
  } catch (e) {
    console.log("MaelstromTools: init error: ", e);
  }
})();










// ==UserScript==
// @name        Maelstrom ADDON Basescanner
// @namespace   http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @description Maelstrom ADDON Basescanner
// @version     1.8.4
// @author      BlinDManX
// @grant       none
// @copyright   2012+, Claus Neumann
// ==/UserScript==
(function(){var b=function(){var e=["__msbs_version","1.8.4","Addons.BaseScannerGUI","singleton","Window","window","ui","base","Addons.BaseScannerGUI ","info","T","getInstance","Language","setWidth","setHeight","setContentPadding","setShowMinimize","setShowMaximize","setShowClose","setResizable","setAllowMaximize","setAllowMinimize","setAllowClose","setShowStatusbar","setDecorator","setPadding","layout","setLayout","src","stats","http://goo.gl/DrJ2x","ZE","removeAll","add","setData","ZL","Addons.BaseScannerGUI.construct: ","debug","img","createElement","setCaption","isVisible","close","updateCityCache","Cache","MaelstromTools","ZC","Cities","form","Basescanner_LastCityID","getserver","LocalStorage","get_Id","Object","setSelection","open","moveTo","MaelstromTools.DefaultObject.openWindow: ","log","model","table","ID","LoadState","City","get","Location","Level","Tiberium","Crystal","Dollar","Research","Crystalfields","Tiberiumfields","Building state","Defense state","CP","Def.HP/Off.HP","Sum Tib+Cry+Cre","(Tib+Cry+Cre)/CP","CY","DF","base set up at","setColumns","YY","get_Player","MainData","Data","ZN","setColumnVisibilityButtonVisible","setColumnWidth","Basescanner_ColWidth_2","Basescanner_ColWidth_3","Basescanner_ColWidth_4","Basescanner_ColWidth_5","Basescanner_ColWidth_6","Basescanner_ColWidth_7","Basescanner_ColWidth_8","Basescanner_ColWidth_9","Basescanner_ColWidth_10","Basescanner_ColWidth_11","Basescanner_ColWidth_12","Basescanner_ColWidth_13","Basescanner_ColWidth_14","Basescanner_ColWidth_15","Basescanner_ColWidth_16","Basescanner_ColWidth_17","Basescanner_ColWidth_18","Basescanner_ColWidth_19","getTableColumnModel","getColumnCount","Basescanner_Column_","setColumnVisible","Statics","images","headerrenderer","setHeaderCellRenderer","FA","set","cellrenderer","setDataCellRenderer","cellDblclick","BaseScannerGUI","addListener","widthChanged","col","getData","newWidth","Basescanner_ColWidth_","setserver","Addons.BaseScannerGUI.FI: ","getRow","length",":","split","VisMain","Vis","getValue","ZK","getApplication","Init","core","closeCityInfo","getBackgroundArea","pavmCombatSetupDefense","PlayerAreaViewMode","setView","getPlayArea","get_CurrentOwnCity","get_Cities","set_CurrentTargetBaseId","get_CityArmyFormationsManager","Addons.BaseScannerGUI FB error: ","Scan","setLabel","ZG","ZH","format","util","setGroupingUsed","setMaximumFractionDigits","abs","floor","k","M","G","container","setMargin","changeSelection","CP Limit","white","basic","ZQ","Basescanner_Cplimiter","","min Level","Basescanner_minLevel","1","ZY","Player","setTextColor","Basescanner_Show0","setValue","changeValue","Bases","Basescanner_Show1","Outpost","Basescanner_Show2","Camp","Basescanner_Show3","execute","solid","blue","decoration","ZV","red","ZU","green","ZX","center","YZ","clear Cache","ZZ","Only center on World","ZJ","7 "," 5 ","6 "," 6 ","5 "," 7 ","ZD","Get Layouts","BaseScannerLayout","Addons","BaseScanner Layout","openWindow","setEnabled","ZB","Loader","gui","ZR","getColumnName","isColumnVisible","index","ZO","+","ZI","addAfter","-","remove","right","setAlignX","ZF","Addons.BaseScannerGUI.createOptions: ","\x3Ca href=\x22https://sites.google.com/site/blindmanxdonate\x22 target=\x22_blank\x22\x3ESupport Development of BlinDManX Addons\x3C/a\x3E","ZP","getModel","getSelection","get_PosX","get_PosY","set_CurrentCityId","ZT","prototype","WorldObjectCity","WorldSector","$ctor","ClientLib.Data.WorldSector.WorldObjectCity","getLevel","Error - ClientLib.Data.WorldSector.WorldObjectCity.Level undefined","error","getID","Error - ClientLib.Data.WorldSector.WorldObjectCity.ID undefined","WorldObjectNPCBase","ClientLib.Data.WorldSector.WorldObjectNPCBase","Error - ClientLib.Data.WorldSector.WorldObjectNPCBase.Level undefined","Error - ClientLib.Data.WorldSector.WorldObjectNPCBase.ID undefined","WorldObjectNPCCamp","ClientLib.Data.WorldSector.WorldObjectNPCCamp","Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.Level undefined","getCampType","Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.CampType undefined","Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.ID undefined","Pause","window.Addons.BaseScannerGUI.getInstance().FJ()","setTimeout","window.Addons.BaseScannerGUI.getInstance().FG()","/","ZM","get_World","Scanning from: ","get_Name","get_MaxAttackDistance","get_Server","sqrt","Type","function","push","sortByColumn","name","DR01D","Maelstrom_Basescanner FJ error: ","data null: ","warn","data[i] null: ","get_PlayerId","get_AllianceId","get_IsGhostMode","get_CityUnitsData","d","get_Buildings","get_DefenseUnits","get_OffenseUnits","EResourceType","Base","Gold","ResearchPoints","ZA","get_Health","get_MdbUnitId","get_CoordY","HPRecord"," finish","countlastidchecked"," on "," removed (GetBuildingsConditionInPercent == 0)","splice"," removed (IsGhostMode)","lastid"," removed (found no data)","MaelstromTools_Basescanner getResources","ZS","define","Class","Addons.BaseScannerLayout","Addons.BaseScannerLayout ","ZW","Addons.BaseScannerLayout.construct: ","Addons.BaseScannerLayout.openWindow: ","ZE null: ","\x3Ctable border=\x222\x22 cellspacing=\x220\x22 cellpadding=\x220\x22\x3E"," - ","\x3Ctr\x3E\x3Ctd colspan=\x229\x22\x3E\x3Cfont color=\x22#FFF\x22\x3E","\x3C/font\x3E\x3C/td\x3E\x3C/tr\x3E","\x3Ctr\x3E","\x3Cimg width=\x2214\x22 height=\x2214\x22 src=\x22","\x22\x3E","Emptypixels","\x3Ctd\x3E","\x3C/td\x3E","\x3C/tr\x3E","\x3C/table\x3E","#303030","cid","click","setReturnValue","Addons.LocalStorage","static","undefined","isSupported","stringify","Addons.LocalStorage.setglobal: ","isdefined","parse","Addons.LocalStorage.getglobal: ","object","LocalStorage data from server not null, but not object","LocalStorage data from server not null, but parsererror","Addons.LocalStorage.setserver: ","isdefineddata","Addons.LocalStorage.getserver: ","Addons.Language","main","hasOwnProperty","Translate Added ","Addons.Language.addtranslateobj main not define","getLocale","Manager","locale","_","Addons.Language.get "," not translate for locale ","qx.ui.table.cellrenderer.Replace","Default","Function","value","getReplaceMap","getReplaceFunction","escape","String","bom","Maelstrom_Basescanner initalisiert","Point","Position","addtranslateobj","BaseScanner Overview","Basescanner Übersicht","Visão geral do scanner de base","Aperçu du scanner de base","Scannen","Esquadrinhar","Balayer","Lage","localização","Emplacement","Spieler","Jogador","Joueur","Camp,Outpost","Lager,Vorposten","Camp,posto avançado","Camp,avant-poste","Lager","Vorposten","posto avançado","avant-poste","Layout da Base de Dados de Scanner","Mise scanner de base","Show Layouts","Layouts anzeigen","Mostrar Layouts","Voir Layouts","Gebäudezustand","construção do Estado","construction de l\x27État","Verteidigungszustand","de Defesa do Estado","défense de l\x27Etat","KP","KP begrenzen","CP limitar","CP limiter","min. Level","nível mínimo","niveau minimum","Cache leeren","limpar cache","vider le cache","Nur auf Welt zentrieren","Único centro no Mundial","Seul centre sur World","Basis errichtbar","base de configurar a","mis en place à la base","Infantry","Infanterie","Infantaria","Vehicle","Fahrzeuge","Veículos","Vehicule","Aircraft","Flugzeuge","Aeronaves","Aviation","Tibério","Kristalle","Cristal","Power","Strom","Potência","Energie","Credits","Créditos","Crédit","Forschung","Investigação","Recherche","-----","--","FileManager","File","BaseScanner","ui/icons/icon_item.png","createNewImage","ui/menues/main_menu/misc_empty_pixel.png","version ","desktopPosition","createDesktopButton"," version ","addToMainMenu","AddonMainMenu","Basescanner","ALT+B","Wrapper","Count","get_HitpointsPercent","MaelstromTools_Basescanner getResourcesPart","replace","match","Error - ","not found","MaelstromTools_Basescanner_checkIfLoaded: ","domain","test"];window[e[0]]=e[1];function j(){qx[e[312]][e[311]](e[2],{type:e[3],extend:qx[e[6]][e[5]][e[4]],construct:function(){try{this[e[7]](arguments);console[e[9]](e[8]+window[e[0]]);this[e[10]]=Addons[e[12]][e[11]]();this[e[13]](820);this[e[14]](400);this[e[15]](10);this[e[16]](true);this[e[17]](true);this[e[18]](true);this[e[19]](true);this[e[20]](true);this[e[21]](true);this[e[22]](true);this[e[23]](false);this[e[24]](null);this[e[25]](5);this[e[27]](new qx[e[6]][e[26]].VBox(3));this[e[29]][e[28]]=e[30];this.FI();this.FH();this.FD();if(this[e[31]]==null){this[e[31]]=[];}this[e[25]](0);this[e[32]]();this[e[33]](this.ZF);this[e[33]](this.ZN);this[e[33]](this.ZP);this[e[35]][e[34]](this.ZE);}catch(t){console[e[37]](e[36],t);}},members:{stats:document[e[39]](e[38]),T:null,ZA:0,ZB:null,ZC:null,ZD:null,ZE:null,ZF:null,ZG:null,ZH:false,ZI:true,ZJ:null,ZK:null,ZL:null,ZM:null,ZN:null,ZO:null,ZP:null,ZQ:null,ZR:[],ZT:true,ZU:null,ZV:null,ZX:null,ZY:null,ZZ:[],ZS:{},YZ:null,YY:null,openWindow:function(w){try{this[e[40]](w);if(this[e[41]]()){this[e[42]]();}else{q[e[43]]();q=window[e[45]][e[44]][e[11]]();var v;this[e[46]][e[32]]();for(v in q[e[47]]){var u=new qx[e[6]][e[48]].ListItem(v,null,q[e[47]][v].Object);this[e[46]][e[33]](u);if(Addons[e[51]][e[50]](e[49])==q[e[47]][v][e[53]][e[52]]()){this[e[46]][e[54]]([u]);}}this[e[55]]();this[e[56]](100,100);}}catch(t){console[e[58]](e[57],t);}},FI:function(){try{this[e[35]]=new qx[e[6]][e[60]][e[59]].Simple();this[e[35]][e[82]]([e[61],e[62],this[e[10]][e[64]](e[63]),this[e[10]][e[64]](e[65]),this[e[10]][e[64]](e[66]),this[e[10]][e[64]](e[67]),this[e[10]][e[64]](e[68]),this[e[10]][e[64]](e[69]),this[e[10]][e[64]](e[70]),e[71],e[72],this[e[10]][e[64]](e[73]),this[e[10]][e[64]](e[74]),this[e[10]][e[64]](e[75]),e[76],e[77],e[78],e[79],e[80],this[e[10]][e[64]](e[81])]);this[e[83]]=ClientLib[e[86]][e[85]].GetInstance()[e[84]]();this[e[87]]=new qx[e[6]][e[60]].Table(this.ZL);this[e[87]][e[88]](false);this[e[87]][e[89]](0,0);this[e[87]][e[89]](1,0);this[e[87]][e[89]](2,Addons[e[51]][e[50]](e[90],120));this[e[87]][e[89]](3,Addons[e[51]][e[50]](e[91],60));this[e[87]][e[89]](4,Addons[e[51]][e[50]](e[92],50));this[e[87]][e[89]](5,Addons[e[51]][e[50]](e[93],60));this[e[87]][e[89]](6,Addons[e[51]][e[50]](e[94],60));this[e[87]][e[89]](7,Addons[e[51]][e[50]](e[95],60));this[e[87]][e[89]](8,Addons[e[51]][e[50]](e[96],60));this[e[87]][e[89]](9,Addons[e[51]][e[50]](e[97],30));this[e[87]][e[89]](10,Addons[e[51]][e[50]](e[98],30));this[e[87]][e[89]](11,Addons[e[51]][e[50]](e[99],50));this[e[87]][e[89]](12,Addons[e[51]][e[50]](e[100],50));this[e[87]][e[89]](13,Addons[e[51]][e[50]](e[101],30));this[e[87]][e[89]](14,Addons[e[51]][e[50]](e[102],60));this[e[87]][e[89]](15,Addons[e[51]][e[50]](e[103],60));this[e[87]][e[89]](16,Addons[e[51]][e[50]](e[104],60));this[e[87]][e[89]](17,Addons[e[51]][e[50]](e[105],50));this[e[87]][e[89]](18,Addons[e[51]][e[50]](e[106],50));this[e[87]][e[89]](19,Addons[e[51]][e[50]](e[107],40));var u=0;var t=this[e[87]][e[108]]();for(u=0;u<this[e[35]][e[109]]();u++){if(u==0||u==1||u==11||u==12){t[e[111]](u,Addons[e[51]][e[50]](e[110]+u,false));}else{t[e[111]](u,Addons[e[51]][e[50]](e[110]+u,true));}}t[e[111]](1,false);t[e[115]](9,new qx[e[6]][e[60]][e[114]].Icon(p[e[113]][MaelstromTools[e[112]][e[68]]]),e[71]);t[e[115]](10,new qx[e[6]][e[60]][e[114]].Icon(p[e[113]][MaelstromTools[e[112]][e[67]]],e[72]));t[e[119]](5,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](6,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](7,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](8,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](15,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](16,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](19,new qx[e[6]][e[60]][e[118]].Boolean());this[e[87]][e[122]](e[120],function(w){Addons[e[121]][e[11]]().FB(w);},this);t[e[122]](e[123],function(y){var x=y[e[125]]()[e[124]];var w=y[e[125]]()[e[126]];Addons[e[51]][e[128]](e[127]+x,w);},t);}catch(v){console[e[37]](e[129],v);}},FB:function(y){try{var A=this[e[31]][y[e[130]]()][0];var z=this[e[31]][y[e[130]]()][3];if(z!=null&&z[e[133]](e[132])[e[131]]==2){var x=parseInt(z[e[133]](e[132])[0]);var w=parseInt(z[e[133]](e[132])[1]);ClientLib[e[135]][e[134]].GetInstance().CenterGridPosition(x,w);}if(A&&!(this[e[137]][4][e[136]]())){var u=qx[e[140]][e[139]][e[138]]();u[e[142]]()[e[141]]();u[e[146]]()[e[145]](ClientLib[e[86]][e[144]][e[143]],A,0,0);}var t=ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[147]]();if(t!=null){t[e[150]]()[e[149]](A);}}catch(v){console[e[37]](e[151],v);}},FN:function(t){this[e[154]][e[153]](this[e[10]][e[64]](e[152]));this[e[155]]=false;},CBChanged:function(t){this[e[155]]=false;},FA:function(t){var u=new qx[e[157]][e[156]].NumberFormat();u[e[158]](true);u[e[159]](3);if(!isNaN(t)){if(Math[e[160]](t)<100000){t=u[e[156]](Math[e[161]](t));}else{if(Math[e[160]](t)>=100000&&Math[e[160]](t)<1000000){t=u[e[156]](Math[e[161]](t/100)/10)+e[162];}else{if(Math[e[160]](t)>=1000000&&Math[e[160]](t)<10000000){t=u[e[156]](Math[e[161]](t/1000)/1000)+e[163];}else{if(Math[e[160]](t)>=10000000&&Math[e[160]](t)<100000000){t=u[e[156]](Math[e[161]](t/10000)/100)+e[163];}else{if(Math[e[160]](t)>=100000000&&Math[e[160]](t)<1000000000){t=u[e[156]](Math[e[161]](t/100000)/10)+e[163];}else{if(Math[e[160]](t)>=1000000000&&Math[e[160]](t)<10000000000){t=u[e[156]](Math[e[161]](t/1000000)/1000)+e[164];}else{if(Math[e[160]](t)>=10000000000&&Math[e[160]](t)<100000000000){t=u[e[156]](Math[e[161]](t/10000000)/100)+e[164];}else{if(Math[e[160]](t)>=100000000000&&Math[e[160]](t)<1000000000000){t=u[e[156]](Math[e[161]](t/100000000)/10)+e[164];}else{if(Math[e[160]](t)>=1000000000000&&Math[e[160]](t)<10000000000000){t=u[e[156]](Math[e[161]](t/1000000000)/1000)+e[10];}else{if(Math[e[160]](t)>=10000000000000&&Math[e[160]](t)<100000000000000){t=u[e[156]](Math[e[161]](t/10000000000)/100)+e[10];}else{if(Math[e[160]](t)>=100000000000000&&Math[e[160]](t)<1000000000000000){t=u[e[156]](Math[e[161]](t/100000000000)/10)+e[10];}else{if(Math[e[160]](t)>=1000000000000000){t=u[e[156]](Math[e[161]](t/1000000000000))+e[10];}}}}}}}}}}}}}return t.toString();},FH:function(){try{var D=new qx[e[6]][e[26]].Flow();var C=new qx[e[6]][e[165]].Composite(D);this[e[46]]=new qx[e[6]][e[48]].SelectBox();this[e[46]][e[14]](25);this[e[46]][e[166]](5);q[e[43]]();q=window[e[45]][e[44]][e[11]]();var G;for(G in q[e[47]]){var F=new qx[e[6]][e[48]].ListItem(G,null,q[e[47]][G].Object);this[e[46]][e[33]](F);if(Addons[e[51]][e[50]](e[49])==q[e[47]][G][e[53]][e[52]]()){this[e[46]][e[54]]([F]);}}this[e[46]][e[122]](e[167],function(H){this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this.ZC);var B=new qx[e[6]][e[170]].Label()[e[117]]({value:this[e[10]][e[64]](e[168]),textColor:e[169],margin:5});C[e[33]](B);this[e[171]]=new qx[e[6]][e[48]].SelectBox();this[e[171]][e[13]](50);this[e[171]][e[14]](25);this[e[171]][e[166]](5);var z=Addons[e[51]][e[50]](e[172],25);for(var x=11;x<41;x+=1){F=new qx[e[6]][e[48]].ListItem(e[173]+x,null,x);this[e[171]][e[33]](F);if(z==x){this[e[171]][e[54]]([F]);}}this[e[171]][e[122]](e[167],function(H){this[e[31]]=[];this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this.ZQ);var v=new qx[e[6]][e[170]].Label()[e[117]]({value:this[e[10]][e[64]](e[174]),textColor:e[169],margin:5});C[e[33]](v);var u=Addons[e[51]][e[50]](e[175],e[176]);this[e[177]]=new qx[e[6]][e[48]].TextField(u)[e[117]]({width:50});C[e[33]](this.ZY);this[e[137]]=[];this[e[137]][0]=new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[178]));this[e[137]][0][e[166]](5);this[e[137]][0][e[179]](e[169]);this[e[137]][0][e[181]](Addons[e[51]][e[50]](e[180],false));this[e[137]][0][e[122]](e[182],function(H){this[e[31]]=[];this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this[e[137]][0]);this[e[137]][1]=new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[183]));this[e[137]][1][e[166]](5);this[e[137]][1][e[179]](e[169]);this[e[137]][1][e[181]](Addons[e[51]][e[50]](e[184],false));this[e[137]][1][e[122]](e[182],function(H){this[e[31]]=[];this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this[e[137]][1]);this[e[137]][2]=new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[185]));this[e[137]][2][e[166]](5);this[e[137]][2][e[179]](e[169]);this[e[137]][2][e[181]](Addons[e[51]][e[50]](e[186],false));this[e[137]][2][e[122]](e[182],function(H){this[e[31]]=[];this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this[e[137]][2]);this[e[137]][3]=new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[187]));this[e[137]][3][e[166]](5);this[e[137]][3][e[179]](e[169]);this[e[137]][3][e[181]](Addons[e[51]][e[50]](e[188],true));this[e[137]][3][e[122]](e[182],function(H){this[e[31]]=[];this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this[e[137]][3],{lineBreak:true});this[e[154]]=new qx[e[6]][e[48]].Button(this[e[10]][e[64]](e[152]))[e[117]]({width:100,minWidth:100,maxWidth:100,height:25,margin:5});this[e[154]][e[122]](e[189],function(){this.FE();},this);C[e[33]](this.ZG);var t=new qx[e[6]][e[192]].Single(2,e[190],e[191]);this[e[193]]=new qx[e[6]][e[165]].Composite(new qx[e[6]][e[26]].Basic())[e[117]]({decorator:t,backgroundColor:e[194],allowGrowX:false,height:20,width:200});this[e[195]]=new qx[e[6]][e[140]].Widget()[e[117]]({decorator:null,backgroundColor:e[196],width:0});this[e[193]][e[33]](this.ZU);this[e[197]]=new qx[e[6]][e[170]].Label(e[173])[e[117]]({decorator:null,textAlign:e[198],width:200});this[e[193]][e[33]](this.ZX,{left:0,top:-3});C[e[33]](this.ZV);this[e[199]]=new qx[e[6]][e[48]].Button(this[e[10]][e[64]](e[200]))[e[117]]({minWidth:100,height:25,margin:5});this[e[199]][e[122]](e[189],function(){this[e[201]]=[];},this);C[e[33]](this.YZ);this[e[137]][4]=new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[202]));this[e[137]][4][e[166]](5);this[e[137]][4][e[179]](e[169]);C[e[33]](this[e[137]][4],{lineBreak:true});this[e[203]]=new qx[e[6]][e[48]].SelectBox();this[e[203]][e[13]](150);this[e[203]][e[14]](25);this[e[203]][e[166]](5);var F=new qx[e[6]][e[48]].ListItem(e[204]+this[e[10]][e[64]](MaelstromTools[e[112]].Tiberium)+e[205]+this[e[10]][e[64]](MaelstromTools[e[112]].Crystal),null,7);this[e[203]][e[33]](F);F=new qx[e[6]][e[48]].ListItem(e[206]+this[e[10]][e[64]](MaelstromTools[e[112]].Tiberium)+e[207]+this[e[10]][e[64]](MaelstromTools[e[112]].Crystal),null,6);this[e[203]][e[33]](F);F=new qx[e[6]][e[48]].ListItem(e[208]+this[e[10]][e[64]](MaelstromTools[e[112]].Tiberium)+e[209]+this[e[10]][e[64]](MaelstromTools[e[112]].Crystal),null,5);this[e[203]][e[33]](F);C[e[33]](this.ZJ);this[e[210]]=new qx[e[6]][e[48]].Button(this[e[10]][e[64]](e[211]))[e[117]]({width:120,minWidth:120,maxWidth:120,height:25,margin:5});this[e[210]][e[122]](e[189],function(){var H=window[e[213]][e[212]][e[11]]();H[e[215]](this[e[10]][e[64]](e[214]));},this);this[e[210]][e[216]](false);C[e[33]](this.ZD);this[e[217]]=new qx[e[6]][e[165]].Composite();this[e[217]][e[27]](new qx[e[6]][e[26]].Flow());this[e[217]][e[13]](750);var A=webfrontend[e[219]][e[26]][e[218]][e[11]]();var y=2;for(y=2;y<this[e[35]][e[109]]();y++){var w=y-2;this[e[220]][w]=new qx[e[6]][e[48]].CheckBox(this[e[35]][e[221]](y));this[e[220]][w][e[181]](this[e[87]][e[108]]()[e[222]](y));this[e[220]][w][e[179]](e[169]);this[e[220]][w][e[223]]=y;this[e[220]][w][e[60]]=this[e[87]];this[e[220]][w][e[122]](e[182],function(H){var I=this[e[60]][e[108]]();I[e[111]](this[e[223]],H[e[125]]());Addons[e[51]][e[128]](e[110]+this[e[223]],H[e[125]]());});this[e[217]][e[33]](this[e[220]][w]);}this[e[224]]=new qx[e[6]][e[48]].Button(e[225])[e[117]]({margin:5});this[e[224]][e[122]](e[189],function(){if(this[e[226]]){C[e[227]](this.ZB,this.ZO);this[e[224]][e[153]](e[228]);}else{C[e[229]](this.ZB);this[e[224]][e[153]](e[225]);}this[e[226]]=!this[e[226]];},this);this[e[224]][e[231]](e[230]);C[e[33]](this.ZO,{lineBreak:true});this[e[232]]=C;}catch(E){console[e[37]](e[233],E);}},FD:function(){var v=ClientLib[e[86]][e[85]].GetInstance()[e[148]]();var t=v[e[147]]();var u=e[234];var w=new qx[e[6]][e[170]].Label()[e[117]]({value:u,rich:true,width:800});this[e[235]]=w;},FE:function(){var u=this[e[46]][e[237]]()[0][e[236]]();ClientLib[e[135]][e[134]].GetInstance().CenterGridPosition(u[e[238]](),u[e[239]]());ClientLib[e[135]][e[134]].GetInstance().Update();ClientLib[e[135]][e[134]].GetInstance().ViewUpdate();ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[240]](u[e[52]]());if(this[e[241]]){var t=ClientLib[e[86]][e[244]][e[243]][e[242]];var y=g(t[e[245]],/this\.(.{6})=\(?\(?g>>8\)?\&.*d\+=f;this\.(.{6})=\(/,e[246],2);if(y!=null&&y[1][e[131]]==6){t[e[247]]=function(){return this[y[1]];};}else{console[e[249]](e[248]);}if(y!=null&&y[2][e[131]]==6){t[e[250]]=function(){return this[y[2]];};}else{console[e[249]](e[251]);}t=ClientLib[e[86]][e[244]][e[252]][e[242]];var x=g(t[e[245]],/100\){0,1};this\.(.{6})=Math.floor.*d\+=f;this\.(.{6})=\(/,e[253],2);if(x!=null&&x[1][e[131]]==6){t[e[247]]=function(){return this[x[1]];};}else{console[e[249]](e[254]);}if(x!=null&&x[2][e[131]]==6){t[e[250]]=function(){return this[x[2]];};}else{console[e[249]](e[255]);}t=ClientLib[e[86]][e[244]][e[256]][e[242]];var w=g(t[e[245]],/100\){0,1};this\.(.{6})=Math.floor.*this\.(.{6})=\(*g\>\>(22|0x16)\)*\&.*=-1;\}this\.(.{6})=\(/,e[257],4);if(w!=null&&w[1][e[131]]==6){t[e[247]]=function(){return this[w[1]];};}else{console[e[249]](e[258]);}if(w!=null&&w[2][e[131]]==6){t[e[259]]=function(){return this[w[2]];};}else{console[e[249]](e[260]);}if(w!=null&&w[4][e[131]]==6){t[e[250]]=function(){return this[w[4]];};}else{console[e[249]](e[261]);}this[e[241]]=false;}if(this[e[31]]==null){this[e[155]]=false;this[e[154]][e[153]](e[262]);this[e[210]][e[216]](false);window[e[264]](e[263],1000);return;}var v=0;for(i=0;i<this[e[31]][e[131]];i++){if(this[e[31]][i][1]==-1){v++;}}if(!this[e[155]]){this[e[154]][e[153]](e[262]);this[e[210]][e[216]](false);if(v>0){this[e[155]]=true;window[e[264]](e[265],1000);return;}else{this[e[155]]=false;window[e[264]](e[263],1000);}}else{this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));}},FP:function(v,u,t){if(this[e[195]]!=null&&this[e[197]]!=null){this[e[195]][e[13]](parseInt(v/u*t,10));this[e[197]][e[181]](v+e[266]+u);}},FJ:function(){try{this[e[267]]={};this[e[31]]=[];var N=this[e[46]][e[237]]()[0][e[236]]();Addons[e[51]][e[128]](e[49],N[e[52]]());var G=this[e[171]][e[237]]()[0][e[236]]();Addons[e[51]][e[128]](e[172],G);Addons[e[51]][e[128]](e[175],this[e[177]][e[136]]());var M=this[e[137]][0][e[136]]();var L=this[e[137]][1][e[136]]();var K=this[e[137]][2][e[136]]();var J=this[e[137]][3][e[136]]();var I=parseInt(this[e[177]][e[136]](),10);Addons[e[51]][e[128]](e[180],M);Addons[e[51]][e[128]](e[184],L);Addons[e[51]][e[128]](e[186],K);Addons[e[51]][e[128]](e[188],J);var F=N[e[238]]();var E=N[e[239]]();var H=0;var C=0;var B=ClientLib[e[86]][e[85]].GetInstance()[e[268]]();console[e[9]](e[269]+N[e[270]]());var A=true;var y=true;var w=true;var u=ClientLib[e[86]][e[85]].GetInstance()[e[272]]()[e[271]]();for(C=E-Math[e[161]](u+1);C<=E+Math[e[161]](u+1);C++){for(H=F-Math[e[161]](u+1);H<=F+Math[e[161]](u+1);H++){var t=Math[e[160]](F-H);var R=Math[e[160]](E-C);var Q=Math[e[273]]((t*t)+(R*R));if(Q<=u){var P=B.GetObjectFromPosition(H,C);var z={};if(P){if(P[e[274]]==1&&A){}if(P[e[274]]==2&&y){}if(P[e[274]]==3&&w){}if(P[e[274]]==3){if(I<=parseInt(P[e[247]](),10)){}}var x=N.CalculateAttackCommandPointCostToCoord(H,C);if(x<=G&&typeof P[e[247]]==e[275]){if(I<=parseInt(P[e[247]](),10)){var v=this.FL(P[e[250]](),0);var D=this.FL(P[e[250]](),1);if(D!=null){this[e[267]][P[e[250]]()]=D;}if(P[e[274]]==1&&M){if(v!=null){this[e[31]][e[276]](v);}else{this[e[31]][e[276]]([P[e[250]](),-1,this[e[10]][e[64]](e[178]),H+e[132]+C,P[e[247]](),0,0,0,0,0,0,0,0,x,0,0,0,0]);}}if(P[e[274]]==2&&L){if(v!=null){this[e[31]][e[276]](v);}else{this[e[31]][e[276]]([P[e[250]](),-1,this[e[10]][e[64]](e[183]),H+e[132]+C,P[e[247]](),0,0,0,0,0,0,0,0,x,0,0,0,0]);}}if(P[e[274]]==3&&(K||J)){if(v!=null){if(P[e[259]]()==2&&J){this[e[31]][e[276]](v);}if(P[e[259]]()==3&&K){this[e[31]][e[276]](v);}}else{if(P[e[259]]()==2&&J){this[e[31]][e[276]]([P[e[250]](),-1,this[e[10]][e[64]](e[187]),H+e[132]+C,P[e[247]](),0,0,0,0,0,0,0,0,x,0,0,0,0]);}if(P[e[259]]()==3&&K){this[e[31]][e[276]]([P[e[250]](),-1,this[e[10]][e[64]](e[185]),H+e[132]+C,P[e[247]](),0,0,0,0,0,0,0,0,x,0,0,0,0]);}}}}}}}}}this[e[155]]=true;this[e[35]][e[34]](this.ZE);this.FP(0,this[e[31]][e[131]],200);this[e[35]][e[277]](4,false);if(this[e[83]][e[278]]!=e[279]){window[e[264]](e[265],50);}}catch(O){console[e[37]](e[280],O);}},FG:function(){try{var u=false;var t=0;var X=10;var y=0;var R=150;while(!u){var Q=null;var O=0;var M=0;if(this[e[31]]==null){console[e[282]](e[281]);this[e[155]]=false;break;}for(y=0;y<this[e[31]][e[131]];y++){if(this[e[31]][y][1]==-1){break;}}if(y==this[e[31]][e[131]]){this[e[155]]=false;}this.FP(y,this[e[31]][e[131]],200);if(this[e[31]][y]==null){console[e[282]](e[283]);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));this[e[210]][e[216]](true);break;}posData=this[e[31]][y][3];if(posData!=null&&posData[e[133]](e[132])[e[131]]==2){posX=parseInt(posData[e[133]](e[132])[0]);posY=parseInt(posData[e[133]](e[132])[1]);var K=ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[147]]();var v=ClientLib[e[86]][e[85]].GetInstance()[e[268]]();var I=v.CheckFoundBase(posX,posY,K[e[284]](),K[e[285]]());this[e[31]][y][19]=(I==0)?true:false;M=this[e[31]][y][0];ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[240]](M);Q=ClientLib[e[86]][e[85]].GetInstance()[e[148]]().GetCity(M);if(Q!=null){if(!Q[e[286]]()){var E=Q[e[287]]();if(E!=null){var T=this[e[46]][e[237]]()[0][e[236]]();var C=Q[e[289]]()[e[288]];var z=E[e[290]]()[e[288]];var w=T[e[287]]()[e[291]]()[e[288]];if(C!=null){var P=d(C);var L=d(z);this[e[31]][y][2]=Q[e[270]]();this[e[31]][y][5]=P[ClientLib[e[293]][e[292]][e[67]]]+L[ClientLib[e[293]][e[292]][e[67]]];this[e[31]][y][6]=P[ClientLib[e[293]][e[292]][e[68]]]+L[ClientLib[e[293]][e[292]][e[68]]];this[e[31]][y][7]=P[ClientLib[e[293]][e[292]][e[294]]]+L[ClientLib[e[293]][e[292]][e[294]]];this[e[31]][y][8]=P[ClientLib[e[293]][e[292]][e[295]]]+L[ClientLib[e[293]][e[292]][e[295]]];if(Q.GetBuildingsConditionInPercent()!=0){this[e[296]]=0;if(this[e[31]][y][5]!=0){var S=0;var J=0;var B=0;var H=0;var G=0;this[e[267]][M]=new Array(9);for(B=0;B<9;B++){this[e[267]][M][B]=new Array(8);}for(H=0;H<9;H++){for(G=0;G<8;G++){switch(Q.GetResourceType(H,G)){case 1:this[e[267]][M][H][G]=1;S++;break;case 2:this[e[267]][M][H][G]=2;J++;break;default:break;}}}this[e[31]][y][9]=S;this[e[31]][y][10]=J;this[e[31]][y][11]=Q.GetBuildingsConditionInPercent();this[e[31]][y][12]=Q.GetDefenseConditionInPercent();try{var F=w;var D=0;var A=0;for(var V in F){D+=F[V][e[297]]();}F=z;for(var V in F){A+=F[V][e[297]]();}F=C;for(var V in F){var U=F[V][e[298]]();if(U==158||U==131||U==195){this[e[31]][y][18]=8-F[V][e[299]]();}if(U==112||U==151||U==177){this[e[31]][y][17]=8-F[V][e[299]]();}}}catch(N){console[e[37]](e[300],N);}this[e[31]][y][14]=(A/D);this[e[31]][y][15]=this[e[31]][y][5]+this[e[31]][y][6]+this[e[31]][y][7];this[e[31]][y][16]=this[e[31]][y][15]/this[e[31]][y][13];this[e[31]][y][1]=0;u=true;console[e[9]](Q[e[270]](),e[301]);this[e[296]]=0;this[e[302]]=0;this.FK(this[e[31]][y],this[e[267]][M],M);this[e[35]][e[34]](this.ZE);}}else{if(this[e[296]]>250){console[e[9]](this[e[31]][y][2],e[303],posX,posY,e[304]);this[e[31]][e[305]](y,1);this[e[296]]=0;this[e[302]]=0;break;}this[e[296]]++;}}}}else{console[e[9]](this[e[31]][y][2],e[303],posX,posY,e[306]);this[e[31]][e[305]](y,1);break;}}}t++;if(t>=X){u=true;break;}}if(this[e[307]]!=y){this[e[307]]=y;this[e[302]]=0;this[e[296]]=0;}else{if(this[e[302]]>16){console[e[9]](this[e[31]][y][2],e[303],posX,posY,e[308]);this[e[31]][e[305]](y,1);this[e[302]]=0;}else{if(this[e[302]]>10){R=500;}else{if(this[e[302]]>4){R=250;}}}this[e[302]]++;}if(this[e[155]]&&Addons[e[121]][e[11]]()[e[41]]()){window[e[264]](e[265],R);}else{this[e[154]][e[153]](this[e[10]][e[64]](e[152]));this[e[155]]=false;}}catch(W){console[e[37]](e[309],W);}},FK:function(v,u,t){this[e[201]][e[276]](v);this[e[310]][t]=u;},FL:function(u,v){if(v==0){for(var t=0;t<this[e[201]][e[131]];t++){if(this[e[201]][t][0]==u){return this[e[201]][t];}}}else{if(this[e[310]][u]){return this[e[310]][u];}}return null;}}});qx[e[312]][e[311]](e[313],{type:e[3],extend:qx[e[6]][e[5]][e[4]],construct:function(){try{this[e[7]](arguments);console[e[9]](e[314]+window[e[0]]);this[e[13]](820);this[e[14]](400);this[e[15]](10);this[e[16]](false);this[e[17]](true);this[e[18]](true);this[e[19]](true);this[e[20]](true);this[e[21]](false);this[e[22]](true);this[e[23]](false);this[e[24]](null);this[e[25]](10);this[e[27]](new qx[e[6]][e[26]].Grow());this[e[315]]=[];this[e[32]]();this[e[201]]=new qx[e[6]][e[165]].Scroll();this[e[177]]=new qx[e[6]][e[165]].Composite(new qx[e[6]][e[26]].Flow());this[e[33]](this.ZZ,{flex:3});this[e[201]][e[33]](this.ZY);}catch(t){console[e[37]](e[316],t);}},members:{ZW:null,ZZ:null,ZY:null,ZX:null,openWindow:function(u){try{this[e[40]](u);if(this[e[41]]()){this[e[42]]();}else{this[e[55]]();this[e[56]](100,100);this.FO();}}catch(t){console[e[58]](e[317],t);}},FO:function(){var H=window[e[213]][e[121]][e[11]]()[e[267]];var F=window[e[213]][e[121]][e[11]]()[e[31]];this[e[197]]=[];var D=window[e[213]][e[121]][e[11]]()[e[203]][e[237]]()[0][e[236]]();var B=null;if(F==null){console[e[9]](e[318]);return;}this[e[315]]=[];var w;var u;var z;var y;var I;for(w in H){for(u=0;u<F[e[131]];u++){if(F[u][0]==w){B=F[u];}}if(B==null){continue;}if(D>4&&D<8){if(D!=B[10]){continue;}}else{continue;}posData=B[3];if(posData!=null&&posData[e[133]](e[132])[e[131]]==2){posX=parseInt(posData[e[133]](e[132])[0]);posY=parseInt(posData[e[133]](e[132])[1]);}var t=e[319];var G=B[2]+e[320]+B[3];t=t+e[321]+G+e[322];for(y=0;y<8;y++){t=t+e[323];for(z=0;z<9;z++){var E=e[173];var C=H[w][z][y];switch(C==undefined?0:C){case 2:E=e[324]+p[e[113]][MaelstromTools[e[112]][e[67]]]+e[325];break;case 1:E=e[324]+p[e[113]][MaelstromTools[e[112]][e[68]]]+e[325];break;default:E=e[324]+p[e[113]][e[326]]+e[325];break;}t=t+e[327]+E+e[328];}t=t+e[329];}t=t+e[330];var v=new qx[e[6]][e[170]].Label()[e[117]]({backgroundColor:e[331],value:t,rich:true});v[e[332]]=w;this[e[197]][e[276]](w);v[e[122]](e[333],function(L){var K=qx[e[140]][e[139]][e[138]]();K[e[142]]()[e[141]]();K[e[146]]()[e[145]](ClientLib[e[86]][e[144]][e[143]],this[e[332]],0,0);var J=ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[147]]();if(J!=null){J[e[150]]()[e[149]](this[e[332]]);}});v[e[334]]=w;this[e[315]][e[276]](v);}this[e[177]][e[32]]();var A=0;var x=0;for(I=0;I<this[e[315]][e[131]];I++){this[e[177]][e[33]](this[e[315]][I],{row:A,column:x});x++;if(x>4){x=0;A++;}}}}});qx[e[312]][e[311]](e[335],{type:e[336],extend:qx[e[140]][e[53]],statics:{isSupported:function(){return typeof(localStorage)!==e[337];},isdefined:function(t){return(localStorage[t]!==e[337]&&localStorage[t]!=null);},isdefineddata:function(u,t){return(u[t]!==e[337]&&u[t]!=null);},setglobal:function(v,t){try{if(Addons[e[51]][e[338]]()){localStorage[v]=JSON[e[339]](t);}}catch(u){console[e[37]](e[340],u);}},getglobal:function(v,u){try{if(Addons[e[51]][e[338]]()){if(Addons[e[51]][e[341]](v)){return JSON[e[342]](localStorage[v]);}}}catch(t){console[e[58]](e[343],t);}return u;},setserver:function(w,t){try{if(Addons[e[51]][e[338]]()){var v=ClientLib[e[86]][e[85]].GetInstance()[e[272]]()[e[270]]();var x;if(Addons[e[51]][e[341]](v)){try{x=JSON[e[342]](localStorage[v]);if(!(typeof x===e[344])){x={};console[e[37]](e[345]);}}catch(u){console[e[37]](e[346],u);x={};}}else{x={};}x[w]=t;localStorage[v]=JSON[e[339]](x);}}catch(u){console[e[37]](e[347],u);}},getserver:function(w,v){try{if(Addons[e[51]][e[338]]()){var u=ClientLib[e[86]][e[85]].GetInstance()[e[272]]()[e[270]]();if(Addons[e[51]][e[341]](u)){var x=JSON[e[342]](localStorage[u]);if(Addons[e[51]][e[348]](x,w)){return x[w];}}}}catch(t){console[e[58]](e[349],t);}return v;}}});if(typeof Addons[e[12]]===e[337]){qx[e[312]][e[311]](e[350],{type:e[3],extend:qx[e[140]][e[53]],members:{d:{},debug:false,addtranslateobj:function(t){if(t[e[352]](e[351])){this[e[288]][t[e[351]].toString()]=t;if(this[e[37]]){console[e[58]](e[353],t[e[351]].toString());}delete t[e[351]];}else{console[e[37]](e[354]);}},get:function(v){var u=qx[e[357]][e[356]][e[11]]()[e[355]]();var t=u[e[133]](e[358])[0];if(this[e[288]][e[352]](v)){if(this[e[288]][v][e[352]](t)){return this[e[288]][v][t];}}if(this[e[37]]){console[e[37]](e[359],v,e[360],t);}return v;}}});}qx[e[312]][e[311]](e[361],{extend:qx[e[6]][e[60]][e[118]][e[362]],properties:{replaceMap:{check:e[53],nullable:true,init:null},replaceFunction:{check:e[363],nullable:true,init:null}},members:{_getContentHtml:function(w){var x=w[e[364]];var v=this[e[365]]();var u=this[e[366]]();var t;if(v){t=v[x];if(typeof t!=e[337]){w[e[364]]=t;return qx[e[369]][e[368]][e[367]](this._formatValue(w));}}if(u){w[e[364]]=u(x);}return qx[e[369]][e[368]][e[367]](this._formatValue(w));},addReversedReplaceMap:function(){var t=this[e[365]]();for(var v in t){var u=t[v];t[u]=v;}return true;}}});console[e[9]](e[370]);var s=Addons[e[12]][e[11]]();s[e[37]]=false;s[e[373]]({main:e[371],de:e[372],pt:e[372],fr:e[372]});s[e[373]]({main:e[374],de:e[375],pt:e[376],fr:e[377]});s[e[373]]({main:e[152],de:e[378],pt:e[379],fr:e[380]});s[e[373]]({main:e[65],de:e[381],pt:e[382],fr:e[383]});s[e[373]]({main:e[178],de:e[384],pt:e[385],fr:e[386]});s[e[373]]({main:e[183],de:e[183],pt:e[183],fr:e[183]});s[e[373]]({main:e[387],de:e[388],pt:e[389],fr:e[390]});s[e[373]]({main:e[187],de:e[391],pt:e[187],fr:e[187]});s[e[373]]({main:e[185],de:e[392],pt:e[393],fr:e[394]});s[e[373]]({main:e[214],de:e[214],pt:e[395],fr:e[396]});s[e[373]]({main:e[397],de:e[398],pt:e[399],fr:e[400]});s[e[373]]({main:e[73],de:e[401],pt:e[402],fr:e[403]});s[e[373]]({main:e[74],de:e[404],pt:e[405],fr:e[406]});s[e[373]]({main:e[75],de:e[407],pt:e[75],fr:e[75]});s[e[373]]({main:e[168],de:e[408],pt:e[409],fr:e[410]});s[e[373]]({main:e[174],de:e[411],pt:e[412],fr:e[413]});s[e[373]]({main:e[200],de:e[414],pt:e[415],fr:e[416]});s[e[373]]({main:e[202],de:e[417],pt:e[418],fr:e[419]});s[e[373]]({main:e[81],de:e[420],pt:e[421],fr:e[422]});s[e[373]]({main:e[423],de:e[424],pt:e[425],fr:e[424]});s[e[373]]({main:e[426],de:e[427],pt:e[428],fr:e[429]});s[e[373]]({main:e[430],de:e[431],pt:e[432],fr:e[433]});s[e[373]]({main:e[67],de:e[67],pt:e[434],fr:e[67]});s[e[373]]({main:e[68],de:e[435],pt:e[436],fr:e[436]});s[e[373]]({main:e[437],de:e[438],pt:e[439],fr:e[440]});s[e[373]]({main:e[69],de:e[441],pt:e[442],fr:e[443]});s[e[373]]({main:e[70],de:e[444],pt:e[445],fr:e[446]});s[e[373]]({main:e[447],de:e[448],pt:e[448],fr:e[448]});var r=null;var q=null;var p=null;var o=null;var n=0;var m=0;o=ClientLib[e[450]][e[449]].GetInstance();r=window[e[45]][e[12]][e[11]]();q=window[e[45]][e[44]][e[11]]();p=window[e[45]][e[293]][e[11]]();p[e[453]](e[451],e[452],o);p[e[453]](e[326],e[454],o);var l=p[e[457]](s[e[64]](e[374])+e[455]+window[e[0]],e[451],false,p[e[456]](2));l[e[122]](e[189],function(){Addons[e[121]][e[11]]()[e[215]](s[e[64]](e[374])+e[458]+window[e[0]]);},this);Addons[e[121]][e[11]]()[e[122]](e[42],Addons[e[121]][e[11]]().FN,Addons[e[121]][e[11]]());p[e[459]](e[451],l);if(typeof Addons[e[460]]!==e[337]){var k=Addons[e[460]][e[11]]();k.AddMainMenu(e[461],function(){Addons[e[121]][e[11]]()[e[215]](s[e[64]](e[374])+e[458]+window[e[0]]);},e[462]);}}function d(o){try{var q=[0,0,0,0,0,0,0,0];if(o==null){return q;}for(var l in o){var n=o[l];var m=MaelstromTools[e[463]].GetUnitLevelRequirements(n);for(var k=0;k<m[e[131]];k++){q[m[k][e[274]]]+=m[k][e[464]]*n[e[465]]();if(n[e[465]]()<1){}}}return q;}catch(p){console[e[37]](e[466],p);}}function f(k){var m;for(m in k){if(typeof(k[m])==e[275]){var l=k[m].toString();console[e[37]](m,l);}}}function g(k,r,q,m){var p=[];var o=k.toString();var n=o[e[467]](/\s/gim,e[173]);p=n[e[468]](r);var l;for(l=1;l<(m+1);l++){if(p!=null&&p[l][e[131]]==6){console[e[37]](q,l,p[l]);}else{if(p!=null&&p[l][e[131]]>0){console[e[282]](q,l,p[l]);}else{console[e[249]](e[469],q,l,e[470]);console[e[282]](q,n);}}}return p;}function h(){try{if(typeof qx!=e[337]&&typeof MaelstromTools!=e[337]){j();}else{window[e[264]](h,1000);}}catch(k){console[e[37]](e[471],k);}}if(/commandandconquer\.com/i[e[473]](document[e[472]])){window[e[264]](h,10000);}};try{var a=document.createElement("script");a.innerHTML="("+b.toString()+")();";a.type="text/javascript";if(/commandandconquer\.com/i.test(document.domain)){document.getElementsByTagName("head")[0].appendChild(a);}}catch(c){console.debug("MaelstromTools_Basescanner: init error: ",c);}})();










// ==UserScript==
// @name        Command & Conquer TA POIs Analyser
// @description Display alliance's POIs scores and next tier requirements.
// @namespace   https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     2.0.1
// @grant none
// @author zdoom
// ==/UserScript==

(function()
{    
    var injectScript = function()
    {
        function create_ccta_pa_class()
        {
            qx.Class.define('ccta_pa',
            {
                type: 'singleton',
                extend: qx.ui.tabview.Page,
                
                construct: function()
                {
                    try
                    {
                        this.base(arguments);
                        this.set({layout: new qx.ui.layout.Grow(), label: "Alliance POIs", padding: 10});
                        var root = this;
                        var footerLayout = new qx.ui.layout.Grid();
                        footerLayout.setColumnFlex(1,1);
                        var footer = new qx.ui.container.Composite(footerLayout).set({font: "font_size_13", padding: [5, 10], marginTop: 5, decorator: "pane-light-opaque"});
                        var label = new qx.ui.basic.Label().set({textColor: "text-value", font: "font_size_13", padding: 10, alignX: 'right'});
                        var checkBox = new qx.ui.form.CheckBox('Show/Hide image and alliance appreviation.')
                        checkBox.set({textColor: webfrontend.gui.util.BBCode.clrLink, font: "font_size_13"});
                        var abr = new qx.ui.basic.Label().set({alignX: 'center', marginTop: 30, font: 'font_size_14', textColor: 'black'});
                        var manager = qx.theme.manager.Font.getInstance();
                        var defaultFont = manager.resolve(abr.getFont());
                        var newFont = defaultFont.clone();
                        newFont.setSize(32);
                        abr.setFont(newFont);
                        var instance = ClientLib.Data.MainData.GetInstance();
                        var apc = instance.get_Cities();
                        var name = apc.get_CurrentOwnCity().get_AllianceName();
                        

      if (name == "Enter Alliance Name here")
      {
        var deco = new qx.ui.decoration.Background().set({backgroundImage: "Enter Link to Alliance Logo Here."});
      }
        else
      {
        var deco = new qx.ui.decoration.Background().set({backgroundImage: "http://archeikhmeri.co.uk/images/fop2.png"});
      }
                        var imgCont = new qx.ui.container.Composite(new qx.ui.layout.VBox());
                        imgCont.set({minWidth: 363, minHeight: 356, maxWidth: 363, maxHeight: 356, decorator: deco, alignX: 'center'});
                        var scrl = new qx.ui.container.Scroll();
                        var cont = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({allowGrowY: true, padding: 10});
                        var gb = new qx.ui.groupbox.GroupBox("Statistics").set({layout: new qx.ui.layout.VBox(), marginLeft: 2});
                        var lgb = new webfrontend.gui.GroupBoxLarge().set({layout: new qx.ui.layout.Canvas()});
                        var lgbc = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({padding: [50,10,20,10]});
                        var widget = new qx.ui.core.Widget().set({minWidth: 628, minHeight: 335});
                        var html = new qx.html.Element('div', null, {id: "graph"});
                        var info = new qx.ui.groupbox.GroupBox("Additional Information").set({layout: new qx.ui.layout.VBox(), marginTop: 10});
                        var buttonCont = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({marginTop: 10});
                        var tableCont = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({minWidth: 500});
                        var grid = new qx.ui.container.Composite(new qx.ui.layout.Grid(2,1));
                        grid.add(buttonCont, {row: 1, column: 1});
                        grid.add(tableCont, {row: 1, column: 2});
                        var noAllianceLabel = new qx.ui.basic.Label('No Alliance found, please create or join an alliance.').set({maxHeight: 30});
                        
                        var data = ClientLib.Data.MainData.GetInstance();
                        var alliance = data.get_Alliance();
                        var exists = alliance.get_Exists();
                        var allianceName = alliance.get_Name();
                        var allianceAbbr = alliance.get_Abbreviation();
                        var faction = ClientLib.Base.Util.GetFactionGuiPatchText();
                        var fileManager = ClientLib.File.FileManager.GetInstance();
                        var opois = alliance.get_OwnedPOIs();
                        var poiUtil = ClientLib.Base.PointOfInterestTypes;
                        var getScore = poiUtil.GetScoreByLevel;
                        var getMultiplier = poiUtil.GetBoostModifierByRank;
                        var getBonus = poiUtil.GetBonusByType;
                        var getNextScore = poiUtil.GetNextScore;
                        var startRank = ClientLib.Base.EPOIType.RankedTypeBegin;
                        var endRank = ClientLib.Base.EPOIType.RankedTypeEnd;
                        var maxPoiLevel = ClientLib.Data.MainData.GetInstance().get_Server().get_MaxCenterLevel();
                        var poiInfo = phe.cnc.gui.util.Text.getPoiInfosByType;
                        var startRank = ClientLib.Base.EPOIType.RankedTypeBegin;
                        
                        var tiersData = [], scoreData = [], bonusData = [], tiers = [];
                        for (var i = 0; i < 50; i++)
                        {
                            var previousScore = (i == 0) ? 0 : bonusData[i - 1][1];
                            var score = getNextScore(previousScore);
                            var bonus = getBonus(startRank, score);
                            var percent = getBonus(endRank - 1, score);
                            if (score != previousScore)
                            {
                                bonusData[i] = [i + 1, score, bonus, percent + '%'];
                                tiers[i] = [i, previousScore, score];
                            }
                            else break;
                        }
                        for (var i = 1; i <= maxPoiLevel; i++)
                        {
                            if (getScore(i + 1) == 1) continue;
                            scoreData.push([i, getScore(i)]);
                        }
                        for (var i = 1; i < 41; i++) tiersData.push([i, '+' + getMultiplier(i) + '%']);
                        
                        var createTable = function()
                        {
                            
                            var columns = [["POI Level", "Score"], ["Tier", "Score Required", "Bonus", "Percentage"], ["Rank", "Multiplier"]];
                            var rows = [scoreData, bonusData, tiersData];
                            
                            var make = function(n)
                            {
                                var model = new qx.ui.table.model.Simple().set({columns: columns[n], data: rows[n]});
                                var table = new qx.ui.table.Table(model).set({
                                    columnVisibilityButtonVisible: false,
                                    headerCellHeight: 25,
                                    marginTop: 20,
                                    minWidth: 500,
                                    height: 400});
                                var renderer = new qx.ui.table.cellrenderer.Default().set({useAutoAlign: false});
                                for (i = 0; i < columns[n].length; i++) table.getTableColumnModel().setDataCellRenderer(i, renderer);
                                return table;
                            };
                            this.Scores = make(0);
                            this.Tiers = make(1);
                            this.Multiplier = make(2);
                        };
                        var tables = new createTable();
                        
                        ['Scores', 'Multiplier', 'Tiers'].map(function(key)
                        {
                            var table = tables[key];
                            var button = new qx.ui.form.Button(key).set({width: 100, margin: [10, 10, 0, 10]}) ;
                            button.addListener('execute', function()
                            {
                                tableCont.removeAll();
                                tableCont.add(table)
                                scrl.scrollChildIntoViewY(tableCont, 'top');
                            }, this);
                            buttonCont.add(button);
                        });

                        info.add(grid);
                        
                        var tabview = new qx.ui.tabview.TabView().set({marginTop: 20, maxWidth: 500, maxHeight: 500});
                        var coordsButton = new qx.ui.form.Button('Coords').set({width: 100, margin: [10, 10, 0, 10]});
                        coordsButton.addListener('execute', function()
                        {
                            tableCont.removeAll();
                            tableCont.add(tabview);
                            scrl.scrollChildIntoViewY(tableCont, 'top');
                        }, this);
                        var res = 
                        [
                            "ui/common/icn_res_tiberium.png",
                            "ui/common/icn_res_chrystal.png",
                            "ui/common/icn_res_power.png",
                            "ui/" + faction + "/icons/icon_arsnl_off_squad.png",
                            "ui/" + faction + "/icons/icon_arsnl_off_vehicle.png",
                            "ui/" + faction + "/icons/icon_arsnl_off_plane.png",
                            "ui/" + faction + "/icons/icon_def_army_points.png"
                        ];
                        var columns = ['Coords', 'Level', 'Score'], models = [], pages = [];
                        for (var i = 0; i < 7; i++)
                        {
                            var page = new qx.ui.tabview.Page().set({layout: new qx.ui.layout.VBox()});
                            page.setIcon(fileManager.GetPhysicalPath(res[i]));
                            var model = new qx.ui.table.model.Simple().set({columns: columns});
                            model.sortByColumn(1, false);
                            var table = new qx.ui.table.Table(model)
                            table.set({columnVisibilityButtonVisible: false, headerCellHeight: 25, marginTop: 10, minWidth: 470, showCellFocusIndicator: false, height: 320});
                            var renderer = new qx.ui.table.cellrenderer.Default().set({useAutoAlign: false});
                            for (var n = 0; n < columns.length; n++)
                            {
                                if (n == 0) renderer = new qx.ui.table.cellrenderer.Html();
                                table.getTableColumnModel().setDataCellRenderer(n, renderer);
                            }
                            page.add(table);
                            tabview.add(page);
                            models.push(model);
                            pages.push(page);
                        }
                        this.__poisCoordsPages = pages;
                        
                    //Simulator
                        var wrapper = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({decorator: 'tabview-pane-clear', padding: [10, 14, 13, 10], marginTop: 20});
                        var header = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({decorator: 'pane-light-opaque', padding: [8, 12]});
                        var initValCont = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({padding: [5,0], marginLeft: 20});
                        var initVals = ['Score:', 'Tier: ', 'Rank:', 'Bonus:'], valueLabels = [];
                        for (var i = 0; i < 4; i++)
                        {
                            var initCont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
                            var ln = new qx.ui.basic.Label(initVals[i]).set({textColor: webfrontend.gui.util.BBCode.clrLink, font: 'font_size_11'});
                            var lv = new qx.ui.basic.Label().set({font: 'font_size_11', paddingLeft: 5, paddingRight: 10});
                            initCont.add(ln);
                            initCont.add(lv);
                            initValCont.add(initCont, {flex: 1});
                            valueLabels.push(lv);
                        }
                        var mainCont = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({maxWidth: 480});
                        var modifierCont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
                        
                        var rankingModel = new qx.ui.table.model.Simple().set({columns: ['Rank', 'Name', 'Score', 'Multiplier', 'Total Bonus']});
                        var custom =
                        {
                            tableColumnModel : function(obj)
                            {
                                return new qx.ui.table.columnmodel.Resize(obj);
                            }
                        };
                        var rankingTable = new qx.ui.table.Table(rankingModel, custom);
                        rankingTable.set({
                            columnVisibilityButtonVisible: false, 
                            headerCellHeight: 25, 
                            marginTop: 3, 
                            showCellFocusIndicator: false, 
                            statusBarVisible: false,
                            keepFirstVisibleRowComplete: false, 
                            height: 105});
                        for (var n = 0; n < 5; n++)
                        {
                            if (n == 1) rankingTable.getTableColumnModel().setDataCellRenderer(n, new qx.ui.table.cellrenderer.Html());
                            else rankingTable.getTableColumnModel().setDataCellRenderer(n, new qx.ui.table.cellrenderer.Default().set({useAutoAlign: false}));
                        }
                        var rankingTableColumnModel = rankingTable.getTableColumnModel();
                        var rankingTableResizeBehavior = rankingTableColumnModel.getBehavior();
                        rankingTableResizeBehavior.setWidth(0, 50);
                        rankingTableResizeBehavior.setWidth(1, "2*");
                        rankingTableResizeBehavior.setWidth(2, 100);
                        rankingTableResizeBehavior.setWidth(3, 70);
                        rankingTableResizeBehavior.setWidth(4, 100);
                        
                        var resultsModel = new qx.ui.table.model.Simple().set({columns: ['Property', 'Value']});
                        var resultsTable = new qx.ui.table.Table(resultsModel, custom);
                        var resultsTableColumnModel = resultsTable.getTableColumnModel();
                        var resultsTableResizeBehavior = resultsTableColumnModel.getBehavior();
                        resultsTableResizeBehavior.setWidth(0, 100);
                        resultsTableResizeBehavior.setWidth(1, "2*");
                        resultsTable.set({
                            columnVisibilityButtonVisible: false, 
                            headerCellHeight: 25, 
                            marginTop: 5, 
                            width: 210, 
                            maxWidth: 210, 
                            showCellFocusIndicator: false, 
                            height: 300});
                        resultsTable.getTableColumnModel().setDataCellRenderer(0, new qx.ui.table.cellrenderer.Html());
                        resultsTable.getTableColumnModel().setDataCellRenderer(1, new qx.ui.table.cellrenderer.Html());
                        var codeToString = function(s){ return String.fromCharCode(s).toLowerCase() };
                        label.setValue(String.fromCharCode(77) + [65,68,69,32,66,89,32,90,68,79,79,77].map(codeToString).join().replace(/,/g, ''));
                        
                        var poisColumns = ['Coords', 'Level', 'Score', 'Enabled'];
                        var poisModel = new qx.ui.table.model.Simple().set({columns: poisColumns  });
                        var poisTable = new qx.ui.table.Table(poisModel, custom);
                        poisTable.set({
                            columnVisibilityButtonVisible: false, 
                            headerCellHeight: 25, 
                            marginTop: 5, 
                            marginLeft: 5,
                            showCellFocusIndicator: false,
                            height: 300});
                        for (var n = 0; n < 4; n++)
                        {
                            if (n == 0) poisTable.getTableColumnModel().setDataCellRenderer(n, new qx.ui.table.cellrenderer.Html());
                            else if (n == 3) poisTable.getTableColumnModel().setDataCellRenderer(n, new qx.ui.table.cellrenderer.Boolean())
                            else poisTable.getTableColumnModel().setDataCellRenderer(n, new qx.ui.table.cellrenderer.Default().set({useAutoAlign: false}));
                        }
                        var poisTableColumnModel = poisTable.getTableColumnModel();
                        var poisTableResizeBehavior = poisTableColumnModel.getBehavior();
                        poisTableResizeBehavior.setWidth(0, 70);
                        poisTableResizeBehavior.setWidth(1, 50);
                        poisTableResizeBehavior.setWidth(2, "2*");
                        poisTableResizeBehavior.setWidth(3, 60);
                        var selectionModel = poisTable.getSelectionManager().getSelectionModel();
                        selectionModel.setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION_TOGGLE);
                        poisTable.getSelectionModel().addListener('changeSelection', function(e)
                        {
                            var table = this.__poisTable;
                            var tableModel = table.getTableModel();
                            var data = tableModel.getDataAsMapArray();
                            var score = 0;
                            for (var i = 0; i < data.length; i++)
                            {
                                var isSelected = selectionModel.isSelectedIndex(i);
                                var level = tableModel.getValue(1, i);
                                tableModel.setValue(3, i, !isSelected);
                                if (!isSelected) score += getScore(parseInt(level, 10));
                            }
                            this.__setResultsRows(score);
                            this.__setRankingRows(score);
                            table.setUserData('score', score);
                        }, this);
                    
                        var addRowCont = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({decorator: 'pane-light-opaque', padding: [8, 12], marginTop: 5});
                        var selectPoiLabelCont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
                        var selectPoiLabel = new qx.ui.basic.Label('Select POI\'s Level').set({margin: [5, 10], font: 'font_size_11'});
                        var selectLevel = new qx.ui.form.SelectBox().set({padding: [5, 15]});
                        for (var i = 12; i <= maxPoiLevel; i++) selectLevel.add(new qx.ui.form.ListItem('Level ' + i, null, i));
                        var addButton = new qx.ui.form.Button('Add POI').set({padding: [5, 20]});
                        var resetButton = new qx.ui.form.Button('Reset').set({padding: [5, 20], marginLeft: 5});
                        addButton.addListener('execute', function()
                        {
                            var level = selectLevel.getSelection()[0].getModel();
                            var score = getScore(parseInt(level, 10));
                            var originalScore = poisTable.getUserData('score');
                            poisModel.addRows([['<p style="padding:0; margin:0; color:' + webfrontend.gui.util.BBCode.clrLink + '">New</p>', level, this.__format(score), true]]);
                            var newScore = originalScore + score;
                            this.__setResultsRows(newScore);
                            this.__setRankingRows(newScore);
                            poisTable.setUserData('score', newScore);
                        }, this);
                        resetButton.addListener('execute', this.__initSim, this);
                        mainCont.add(rankingTable, {flex: 1});
                        modifierCont.add(resultsTable);
                        modifierCont.add(poisTable, {flex: 1});
                        mainCont.add(modifierCont);
                        selectPoiLabelCont.add(selectPoiLabel);
                        addRowCont.add(selectLevel);
                        addRowCont.add(selectPoiLabelCont, {flex: 1});
                        addRowCont.add(addButton);
                        addRowCont.add(resetButton);
                        mainCont.add(addRowCont);
                        
                        var selectBox = new qx.ui.form.SelectBox().set({padding: [5,20]});
                        for (var i = 0; i < 7; i++)
                        {
                            var type = poiInfo(i + startRank).type;
                            var listItem = new qx.ui.form.ListItem(type, null, type);
                            selectBox.add(listItem);
                        }
                        selectBox.addListener('changeSelection', function(e)
                        {
                            if (!e.getData()[0]) return;
                            var type = e.getData()[0].getModel();
                            this.__selectedSimPoi = type;
                            this.__initSim();
                        }, this);
                        
                        header.add(selectBox);
                        header.add(initValCont, {flex: 1});
                        wrapper.add(header);
                        wrapper.add(mainCont);
                        
                        this.__simLabels = valueLabels;
                        this.__rankingModel = rankingModel;
                        this.__resultsModel = resultsModel;
                        this.__poisModel = poisModel;
                        this.__poisTable = poisTable;
                        this.__selectPoiLevel = selectLevel;
                        this.__simCont = wrapper;
                        this.__selectedSimPoi = poiInfo(startRank).type;
                        
                        var simulatorButton = new qx.ui.form.Button('Simulator').set({width: 100, margin: [10, 10, 0, 10]});
                        simulatorButton.addListener('execute', function()
                        {
                            scrl.scrollChildIntoViewY(tableCont, 'top');
                            tableCont.removeAll();
                            tableCont.add(wrapper);
                        }, this);
                        ////////////////////////////////////////////////////////////////////////////////////////////////////////
                        
                        
                        var showImage = true;
                        if (typeof localStorage.ccta_pa == 'undefined')
                        {
                            localStorage.ccta_pa = JSON.stringify({'showImage': true});
                        }
                        else showImage = JSON.parse(localStorage.ccta_pa).showImage;
                        checkBox.setValue(showImage);
                        
                        var toggleImage = function()
                        {
                            var isChecked = checkBox.getValue();
                            localStorage.ccta_pa = JSON.stringify({'showImage': isChecked});
                            if (!isChecked) cont.remove(imgCont);
                            else cont.addAt(imgCont, 0);
                        };
                        checkBox.addListener('changeValue', toggleImage, this);
                        
                        footer.add(checkBox, {row: 0, column: 0});
                        footer.add(label, {row: 0, column: 1});
                        scrl.add(cont);
                        imgCont.add(abr);
                        if (showImage) cont.add(imgCont);
                        cont.add(lgb);
                        lgb.add(lgbc);
                        lgbc.add(gb);
                        lgbc.add(info);
                        lgbc.add(footer);
                        widget.getContentElement().add(html);
                        this.add(scrl);

                        if (exists)
                        {
                            gb.add(widget);
                            buttonCont.addAt(coordsButton, 0);
                            buttonCont.addAt(simulatorButton, 1);
                            tableCont.add(tabview);
                            abr.setValue(allianceAbbr);
                            this.__allianceName = allianceName;
                            this.__allianceAbbr = allianceAbbr;
                        }
                        else
                        {
                            gb.add(noAllianceLabel);
                            tableCont.add(tables.Scores);
                            noAllianceLabel.setValue('No Alliance found, please create or join an alliance.');
                            this.__isReset = true;
                        }
                        
                        this.__models = models;    
                        this.__tableCont = tableCont;                        
                        this.__timer = new qx.event.Timer(1000);
                        this.__tiers = tiers;
                        this.__timer.addListener('interval', this.__update, this);
                        this.addListener('appear', function()
                        {
                            try
                            {
                                var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                                var allianceName = alliance.get_Name();
                                var allianceAbbr = alliance.get_Abbreviation();
                                var exists = alliance.get_Exists();
                                if (!exists && !this.__isReset)
                                {
                                    console.log('No alliance found');
                                    gb.removeAll();
                                    gb.add(noAllianceLabel);
                                    buttonCont.remove(coordsButton);
                                    buttonCont.remove(simulatorButton);
                                    tableCont.removeAll();
                                    tableCont.add(tables.Scores);
                                    abr.setValue('');
                                    this.__allianceName = '';
                                    this.__allianceAbbr = '';
                                    this.__pois = {};
                                    this.__isReset = true;
                                }
                                else if (exists)
                                {
                                    if (this.__isReset)
                                    {
                                        gb.removeAll();
                                        gb.add(widget);
                                        buttonCont.addAt(coordsButton, 0);
                                        buttonCont.addAt(simulatorButton, 1);
                                        abr.setValue(allianceAbbr);
                                        this.__isReset = false;
                                        this.__allianceName = allianceName;
                                        this.__allianceAbbr = allianceAbbr;
                                    }
                                    tableCont.removeAll();
                                    tableCont.add(tabview);
                                    this.__update();
                                }
                            }
                            catch(e)
                            {
                                console.log(e.toString())
                            }
                        }, this);
                        
                        var overlay = webfrontend.gui.alliance.AllianceOverlay.getInstance();
                        var mainTabview = overlay.getChildren()[12].getChildren()[0];
                            mainTabview.addAt(this, 0);
                            mainTabview.setSelection([this]);
                    }
                    catch(e)
                    {
                        console.log(e.toString());
                    }
                },
                destruct: function(){},
                members:
                {
                    __isReset: false,
                    __timer: null,
                    __allianceName: null,
                    __allianceAbbr: null,
                    __pois: null,
                    __tiers: null,
                    __ranks: {},
                    __models: null,
                    __poisCoordsPages: null,
                    __tableCont: null,
                    __simCont: null,
                    __selectedSimPoi: null,
                    __isolatedRanks: null,
                    __simLabels: [],
                    __rankingModel: null,
                    __resultsModel: null,
                    __poisModel: null,
                    __poisTable: null,
                    __selectPoi: null,
                    __style:
                    {
                        "table": {"margin": "5px", "borderTop": "1px solid #333", "borderBottom": "1px solid #333", "fontFamily": "Verdana, Geneva, sans-serif"},
                        "graph":
                        {
                            "td": {"width": "68px", "verticalAlign": "bottom", "textAlign": "center"},
                            "div": {"width": "24px", "margin": "0 auto -1px auto", "border": "3px solid #333", "borderBottom": "none"}
                        },
                        "icon":
                        {
                            "ul": {"listStyleType": "none", "margin": 0, "padding": 0},
                            "div": {"padding": "6px", "marginRight": "6px", "display": "inline-block", "border": "1px solid #000"},
                            "p": {"display": "inline", "fontSize": "10px", "color": "#555"},
                            "li": {"height": "15px", "padding": "2px", "marginLeft": "10px"}
                        },
                        "cell":
                        {
                            "data": {"width": "68px", "textAlign": "center", "color": "#555", "padding": "3px 2px"},
                            "header": {"color": "#416d96", "padding": "3px 2px"}
                        },
                        "rows":
                        {
                            "graph": {"borderBottom": "3px solid #333", "height": "200px"},
                            "tr": {"fontSize": "11px", "borderBottom": "1px solid #333",  "backgroundColor": "#d6dde1"}
                        }      
                    },
                    
                    __element: function(tag)
                    {
                        var elm = document.createElement(tag), root = this;
                        this.css = function(a)
                        {
                            for (var b in a)
                            {
                                root.elm.style[b] = a[b];
                                root.__style[b] = a[b];
                            }
                        }
                        this.set = function(a)
                        {
                            for (var b in a) root.elm[b] = a[b];
                        }
                        this.append = function()
                        {
                            for (var i in arguments)
                            {
                                if (arguments[i].__instanceof == 'element') root.elm.appendChild(arguments[i].elm);
                                else if (arguments[i] instanceof Element) root.elm.appendChild(arguments[i]);
                                else console.log(arguments[i] + ' is not an element');
                            }
                        }
                        this.text = function(str)
                        {
                            var node = document.createTextNode(str);
                            root.elm.appendChild(node);
                        }
                        this.elm = elm;
                        this.__style = {};
                        this.__instanceof = 'element';
                    },
                    
                    __format: function(n)
                    {
                        var f = "", n = n.toString();
                        if (n.length < 3) return n;
                        for (var i = 0; i < n.length; i++)
                        {
                            (((n.length - i) % 3 === 0) && (i !== 0)) ? f += "," + n[i] : f += n[i];
                        }
                        return f;
                    },
                    
                    __update: function()
                    {
                        this.__timer.stop();
                        var div = document.getElementById('graph');
                        if (!div)
                        {
                            this.__timer.start();
                            console.log('Waiting for div dom element to be loaded');
                        }
                        if (div)
                        {
                            console.log('Reloading graph');
                            div.innerHTML = "";
                            this.__updatePOIList();
                            this.__updateGraph();
                            this.__updateRanks();
                        }
                    },
                    
                    __updatePOIList: function()
                    {
                        var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                        var opois = alliance.get_OwnedPOIs();
                        var startRank = ClientLib.Base.EPOIType.RankedTypeBegin;
                        var getScore = ClientLib.Base.PointOfInterestTypes.GetScoreByLevel;
                        var models = this.__models, format = this.__format, pages = this.__poisCoordsPages;
                        for (var i = 0; i < 7; i++)
                        {
                            var rows = [];
                            opois.map(function(poi)
                            {
                                if (poi.t - startRank === i)
                                {
                                    var a  = webfrontend.gui.util.BBCode.createCoordsLinkText((poi.x + ':' + poi.y), poi.x, poi.y);
                                    rows.push([a, poi.l, format(getScore(poi.l))]);
                                }
                            });
                            models[i].setData(rows);
                            models[i].sortByColumn(1, false);
                            pages[i].setLabel(rows.length);
                        }
                    },
                    
                    __updateRanks: function()
                    {
                        this.__ranks = {}, this.__isolatedRanks = {}, root = this, allianceName = this.__allianceName;
                        var getPoiRankType = ClientLib.Base.PointOfInterestTypes.GetPOITypeFromPOIRanking;
                        var poiInfo = phe.cnc.gui.util.Text.getPoiInfosByType, startRank;
                        for (var i = 0; i < 20; i++) if (getPoiRankType(i) > 0) { startRank = i; break; };
                        var getPoiRanks = function(type, poiType, increment)
                        {
                            ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("RankingGetData",
                            {'ascending': true, 'firstIndex': 0, 'lastIndex': 100, 'rankingType': poiType, 'sortColumn': 200 + increment, 'view': 1}, 
                            phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, root, function(context, data)
                            {
                                if (data !== null)
                                {
                                    var skip = 1, arr = [];
                                    for (var i = 0; i < data.a.length; i++)
                                    {
                                        var alliance = data.a[i], name = alliance.an, score = (alliance.pois || 0);
                                        if (name == allianceName)
                                        {
                                            skip = 0;
                                            continue;
                                        }
                                        alliance.r = i + skip;
                                        arr.push(alliance);
                                    }
                                    this.__isolatedRanks[type] = arr;
                                    this.__ranks[type] = data.a;
                                    if (this.__selectedSimPoi == type) this.__initSim();
                                }
                            }), null);
                        };
                        if (startRank) for (var n = 0; n < 7; n++) getPoiRanks(poiInfo(getPoiRankType(n + startRank)).type, n + startRank, n);
                    },
                    
                    __setSimLabels: function()
                    {
                        var labels = this.__simLabels, pois = this.__pois, type = this.__selectedSimPoi, format = this.__format;
                        if (pois[type])
                        {
                            labels[0].setValue(pois[type].s);
                            labels[1].setValue((pois[type].tier == 0) ? "0" : pois[type].tier);
                            labels[2].setValue((pois[type].rank == 0) ? "0" : pois[type].rank);
                            labels[3].setValue(pois[type].tb);
                        }
                    },
                    
                    __setRankingRows: function(score)
                    {
                        var isolatedRanks = this.__isolatedRanks, format = this.__format, allianceName = this.__allianceName, type = this.__selectedSimPoi, pois = this.__pois;
                        var poiUtil = ClientLib.Base.PointOfInterestTypes;
                        var getMultiplier = poiUtil.GetBoostModifierByRank;
                        var getBonus = poiUtil.GetBonusByType;
                        var getRankingData = function(i, type, nr)
                        {
                            var x = isolatedRanks[type][i], score = (x.pois || 0), name = webfrontend.gui.util.BBCode.createAllianceLinkText(x.an);
                            var bonus = getBonus(pois[type].index, score), multiplier = getMultiplier(nr), totalBonus = bonus + (bonus * multiplier / 100);
                            totalBonus = (pois[type].bonusType == 1) ? format(Math.round(totalBonus)) : Math.round(totalBonus * 100) / 100 + '%';
                            return [nr, name, format(score), '+' + multiplier + '%',  totalBonus] 
                        };
                        getMyRanking = function(s, i, p)
                        {
                            var b = getBonus(pois[p].index, s);
                            var m = getMultiplier(i);
                            var tb = b + (b * m / 100);
                            tb = (pois[p].bonusType == 1) ? format(Math.round(tb)) : Math.round(tb * 100) / 100 + '%';
                            var n = webfrontend.gui.util.BBCode.createAllianceLinkText(allianceName);
                            return [i, n, format(s), '+' + m + '%',  tb]; 
                        };
                        var getRankingRows = function(s, type)
                        {
                            var rows;
                            for (var i = 0; i < isolatedRanks[type].length; i++)
                            {
                                if (s >= (isolatedRanks[type][i].pois || 0))
                                {
                                    var matched = getRankingData(i, type, i + 2);
                                    var nextMatched = getRankingData(i + 1, type, i + 3);
                                    var preMatched = (i > 0) ? getRankingData(i - 1, type, i) : null;
                                    if (i == 0) rows = [getMyRanking(s, i + 1, type), matched, nextMatched];
                                    else rows = [preMatched, getMyRanking(s, i + 1, type), matched];
                                    break;
                                }
                            }
                            return rows;
                        }
                        var rankingRows = getRankingRows(score, type);
                        if (rankingRows) this.__rankingModel.setData(rankingRows);
                    },
                                
                    __setResultsRows: function(score)
                    {
                        var pois = this.__pois, tiers = this.__tiers, format = this.__format, type = this.__selectedSimPoi, ranks = this.__isolatedRanks;
                        var poiUtil = ClientLib.Base.PointOfInterestTypes;
                        var getScore = poiUtil.GetScoreByLevel;
                        var getMultiplier = poiUtil.GetBoostModifierByRank;
                        var getBonus = poiUtil.GetBonusByType;
                        var getTier = function(s)
                        {
                            if (s == 0) return "0";
                            else for (var i = 0; i < tiers.length; i++) if (s >= tiers[i][1] && s < tiers[i][2]) return tiers[i][0];
                        };
                        var getNextTier = function(s)
                        {
                            for (var i = 0; i < tiers.length; i++) if (s >= tiers[i][1] && s < tiers[i][2]) return (tiers[i][2] - s);
                        };
                        var getPreviousTier = function(s)
                        {
                            for (var i = 0; i < tiers.length; i++) if (s >= tiers[i][1] && s < tiers[i][2]) return (s - tiers[i][1]);
                        };
                        var getRank = function(s, t)
                        {
                            for (var i = 0; i < ranks[t].length; i++) if (s >= (ranks[t][i].pois || 0)) return i + 1;
                        };
                        var getNextRank = function(s, t)
                        {
                            for (var i = 0; i < ranks[t].length; i++) if (s >= (ranks[t][i].pois || 0)) return (ranks[t][i-1]) ? ranks[t][i-1].pois : s;
                        };
                        var getPreviousRank = function(s, t)
                        {
                            for (var i = 0; i < ranks[t].length; i++) if (s >= (ranks[t][i].pois || 0)) return (ranks[t][i].pois || 0);
                        };
                        var getSimulatedData = function(s, p)
                        {
                            var ot = pois[p].tier;
                            var or = pois[p].rank;
                            var ob = pois[p].bonus;
                            var otb = pois[p].totalBonus;
                            var pp = pois[p].bonusType;
                            var t = getTier(s);
                            var r = getRank(s, p);
                            var ps = getPreviousRank(s, p);
                            var ns = getNextRank(s, p);
                            var pr = s - ps;
                            var nr = ns - s;
                            var nt = getNextTier(s);
                            var pt = getPreviousTier(s);
                            var b = getBonus(pois[p].index, s);
                            var m = getMultiplier(r);
                            var f = format;
                            var tb = b + (b * m / 100);
                            var sc = function(val, org, poiType, fac)
                            {
                                var cs = [webfrontend.gui.util.BBCode.clrLink, '#41a921', '#e23636'];
                                var st = function(c){return '<p style="padding: 0; margin: 0; color: ' + c + '">'}, et = '</p>';
                                if (val == undefined) return null;
                                if (org == undefined) return st(cs[0]) + val + et;
                                else if (org != undefined && poiType == null) return ((val-org)*fac > 0) ? st(cs[1])+val+et : ((val-org)* fac < 0) ? st(cs[2])+val+et : val;
                                else
                                {
                                    var fv = (poiType == 1) ? format(Math.round(val)) : Math.round(val * 100) / 100 + '%';
                                    return ((val - org) * fac > 0) ? st(cs[1]) + fv + et : ((val - org) * fac < 0) ? st(cs[2]) + fv + et : fv;
                                }
                            };
                            var rows = ['Score', 'Tier', 'Rank', 'Multiplier', 'Previous Rank', 'Next Rank', 'Previous Tier', 'Next Tier', 'Bonus', 'Total Bonus'];
                            var data = [f(s), sc(t,ot,null,1), sc(r,or,null,-1), '+'+m+'%', '+'+f(pr), '-'+f(nr), '+'+f(pt), '-'+f(nt), sc(b,ob,pp,1), sc(tb,otb,pp,1)];
                            var results = [];
                            for (var i = 0; i < rows.length; i++) results.push([sc(rows[i]), data[i]]);
                            return results;
                        };
                        var resultsRows = getSimulatedData(score, type);
                        if (resultsRows) this.__resultsModel.setData(resultsRows);
                    },
                    
                    __setPoisRows: function()
                    {
                        var poiUtil = ClientLib.Base.PointOfInterestTypes;
                        var getScore = poiUtil.GetScoreByLevel; //poi level
                        var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                        var opois = alliance.get_OwnedPOIs();
                        var poiInfo = phe.cnc.gui.util.Text.getPoiInfosByType;
                        var poisRows = [], type = this.__selectedSimPoi;
                        opois.map(function(poi)
                        {
                            if (poiInfo(poi.t).type == type)
                            {
                                var a  = webfrontend.gui.util.BBCode.createCoordsLinkText((poi.x + ':' + poi.y), poi.x, poi.y);
                                poisRows.push([a, poi.l, getScore(poi.l), true]);
                            }
                        });
                        if (poisRows) this.__poisModel.setData(poisRows);
                    },
                    
                    __initSim: function()
                    {
                        var score = this.__pois[this.__selectedSimPoi].score;
                        this.__setSimLabels();
                        this.__setRankingRows(score);
                        this.__setResultsRows(score);
                        this.__setPoisRows();
                        this.__poisTable.setUserData('score', score);
                        this.__poisTable.resetSelection();
                        this.__selectPoiLevel.setSelection([this.__selectPoiLevel.getSelectables()[0]]);
                    },
            
                    __updateGraph: function()
                    {
                        try
                        {
                            var data = ClientLib.Data.MainData.GetInstance();
                            var alliance = data.get_Alliance();
                            var ranks = alliance.get_POIRankScore();
                            var poiUtil = ClientLib.Base.PointOfInterestTypes;
                            var getScore = poiUtil.GetScoreByLevel;
                            var getMultiplier = poiUtil.GetBoostModifierByRank;
                            var getBonus = poiUtil.GetBonusByType;
                            var getNextScore = poiUtil.GetNextScore;
                            var startRank = ClientLib.Base.EPOIType.RankedTypeBegin;
                            var endRank = ClientLib.Base.EPOIType.RankedTypeEnd;
                            var poiInfo = phe.cnc.gui.util.Text.getPoiInfosByType;

                            var pois = {}, format = this.__format, tiers = this.__tiers;
                            var colors = ["#8dc186", "#5b9dcb", "#8cc1c7", "#d7d49c", "#dbb476", "#c47f76", "#928195"];
                            var getTier = function(s)
                            {
                                for (var i = 0; i < tiers.length; i++) if (s >= tiers[i][1] && s < tiers[i][2]) return tiers[i][0];
                            };
                            var getHeight = function(s)
                            {
                                if (s == 0) return 0;
                                for (var i = 0; i < tiers.length; i++)
                                    if (s >= tiers[i][1] && s < tiers[i][2]) return Math.round((s - tiers[i][1]) / (tiers[i][2] - tiers[i][1]) * 100);
                            };

                            var colors = ["#8dc186", "#5b9dcb", "#8cc1c7", "#d7d49c", "#dbb476", "#c47f76", "#928195"];
                            for (var i = 0; i < ranks.length; i++)
                            {
                                var type = i + startRank;
                                var name = poiInfo(type).type;
                                var rank = ranks[i].r;
                                var multiplier = getMultiplier(rank);
                                var score = ranks[i].s;
                                var bonus = getBonus(type, score);
                                var nextScore = getNextScore(score);
                                var nextBonus = getBonus(type, nextScore);
                                var totalBonus = bonus + (bonus * multiplier / 100);
                                var nextTotalBonus = nextBonus + (nextBonus * multiplier / 100);
                                var nextTier = format(nextScore - score);
                                var poiType = (i > 2) ? 2 : 1;
                                var color = colors[i];
                                var tier = getTier(ranks[i].s);
                                var height = getHeight(ranks[i].s);
                                var f_score = format(score);
                                var f_rank = rank + ' (' + multiplier + '%)';
                                var f_totalBonus = (poiType == 1) ? format(totalBonus) : Math.round(totalBonus * 100) / 100 + ' %';
                                nextTotalBonus = (poiType == 1) ? format(nextTotalBonus) : Math.round(nextTotalBonus * 100) / 100 + ' %';
                                pois[name] = 
                                {
                                    'score': score,
                                    'tier': tier,
                                    'bonus': bonus,
                                    'totalBonus': totalBonus,
                                    'index': type,
                                    'bonusType': poiType,
                                    'rank': rank,
                                    'multiplier': multiplier,
                                    't': tier, 
                                    's': f_score, 
                                    'r': f_rank, 
                                    'nt': nextTier, 
                                    'tb': f_totalBonus, 
                                    'ntb': nextTotalBonus, 
                                    'c': color, 
                                    'h': height
                                };
                            }                            
                            console.log('data ready')
                            this.__pois = pois;
                            this.__graph.call(this);
                        }
                        catch(e)
                        {
                            console.log(e.toString());
                        }
                    },
                    
                    __graph: function()
                    {
                        console.log('creating graph');
                        var root = this, pois = this.__pois, style = this.__style;
                        var create = function(a, b)
                        {
                            var elm = new root.__element(a);
                            if (b instanceof Object) elm.css(b);
                            return elm;
                        };
                        var addRow = function(title, arr, table, selected)
                        {
                            var row = create('tr', style.rows.tr), header = create('td', style.cell.header);
                            row.elm.onclick = function()
                            {
                                var tr = table.elm.getElementsByTagName('tr');
                                for (var i = 1; i < tr.length; i++)
                                {
                                    tr[i].style.backgroundColor = '#d6dde1';
                                }
                                this.style.backgroundColor ='#ecf6fc';
                            };
                            if (selected == 1) row.css({'backgroundColor': '#ecf6fc'});
                            header.text(title);
                            row.append(header);
                            for (var key in arr)
                            {
                                var td = create('td', style.cell.data);
                                td.text(arr[key]);
                                row.append(td);
                            }
                            table.append(row); 
                        };
                    
                        var table = create('table', style.table);
                        var    gc = create('tr', style.rows.graph);
                        var    gh = create('td');
                        var    ul = create('ul', style.icon.ul);
                        table.set({"id": "data", "cell-spacing": 0, "cell-padding": 0, "rules": "groups", "width": "100%"});
                        gh.append(ul);
                        gc.append(gh);
                        table.append(gc);
                        
                        var score = [], tier = [], nextTier = [], bns = [], nextBns = [], poiRank = [], m = 0;
                        for (var key in pois)
                        {
                            var color = pois[key].c,
                                name  = key,
                                h     = pois[key].h,
                                td    = create('td', style.graph.td),
                                div   = create('div', style.graph.div),
                                li    = create('li', style.icon.li),
                                icon  = create('div', style.icon.div),
                                p     = create('p', style.icon.p);
                                
                                bns[m]      = pois[key].tb;
                                poiRank[m]  = pois[key].r;
                                score[m]    = pois[key].s;
                                tier[m]     = pois[key].t;
                                nextTier[m] = pois[key].nt;
                                nextBns[m]  = pois[key].ntb;
                    
                            div.css({'backgroundColor': color, 'height': h * 2 - 3 + 'px'});
                            td.append(div);
                            gc.append(td);
                            icon.css({'backgroundColor': color});
                            p.text(name);
                            li.append(icon);
                            li.append(p);
                            ul.append(li);
                            m++;
                        }
                        
                        addRow('Tier', tier, table, 0);
                        addRow('Alliance Rank', poiRank, table, 0);        
                        addRow('Score', score, table);
                        addRow('Next Tier Requires', nextTier, table, 0);
                        addRow('Bonus', bns, table, 1);
                        addRow('Next Tier Bonus', nextBns, table, 0);
                        document.getElementById('graph').appendChild(table.elm);
                    }        
                }
            });
        }
        
        function initialize_ccta_pa() 
        {
            console.log('poiAnalyser: ' + 'POIs Analyser retrying...');
            if (typeof qx != 'undefined' && typeof qx.core != 'undefined' && typeof qx.core.Init != 'undefined' && typeof ClientLib != 'undefined' && typeof webfrontend != 'undefined' && typeof phe != 'undefined') 
            {
                var app = qx.core.Init.getApplication();
                if (app.initDone == true) 
                {
                    try
                    {
                        var isDefined = function(a){return (typeof a == 'undefined') ? false : true};
                        var data = ClientLib.Data.MainData.GetInstance();
                        var net = ClientLib.Net.CommunicationManager.GetInstance();
                        if (isDefined(data) && isDefined(net))
                        {
                            var alliance = data.get_Alliance();
                            var player = data.get_Player();
                            var poiUtil = ClientLib.Base.PointOfInterestTypes;
                            var poiInfo = phe.cnc.gui.util.Text.getPoiInfosByType;
                            if (isDefined(alliance) && isDefined(player) && isDefined(alliance.get_Exists()) && isDefined(player.get_Name()) && player.get_Name() != '' && isDefined(poiUtil) && isDefined(poiInfo))
                            {
                                try
                                {
                                    console.log('poiAnalyser: ' + 'initializing POIs Analyser');
                                    create_ccta_pa_class();
                                    ccta_pa.getInstance();
                                }
                                catch(e)
                                {
                                    console.log('poiAnalyser: ' + "POIs Analyser script init error:");
                                    console.log('poiAnalyser: ' + e.toString());
                                }
                            }
                            else window.setTimeout(initialize_ccta_pa, 10000);
                        }
                        else window.setTimeout(initialize_ccta_pa, 10000);
                    }
                    catch(e)
                    {
                        console.log('poiAnalyser: ' + e.toString());
                    }
                } 
                else window.setTimeout(initialize_ccta_pa, 10000);
            } 
            else window.setTimeout(initialize_ccta_pa, 10000);
        };
        window.setTimeout(initialize_ccta_pa, 10000);  
    };
    
    function inject()
    {
        var script = document.createElement("script");
            script.innerHTML = "(" + injectScript.toString() + ")();";
            script.type = "text/javascript";
            if (/commandandconquer\.com/i.test(document.domain)) {
                document.getElementsByTagName("head")[0].appendChild(script);
                console.log('injected');
            }
    };
    inject();
    
})();










// ==UserScript==
// @name           Tiberium Alliances Zoom
// @description    Allows you to zoom out further
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx* 
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        
// @author         Panavia, fix  all
// @require        
// ==/UserScript==

(function (){
  var tazoom_main = function() {
    function initialize() {
      console.log("Zoom Loaded");
      
      var zoomMin = 2.0;    // Larger number means able to zoom in closer.
      var zoomMax = 0.1;    // Smaller number means able to zoom out further.
      var zoomInc = 0.08;    // Larger number for faster zooming, Smaller number for slower zooming.
      
      webfrontend.gui.BackgroundArea.prototype.onHotKeyPress = function(be) {
        if(!this.active || be.getTarget() != this.mapContainer)
          return;
        var bh = be.getKeyIdentifier();
        var bf = ClientLib.Vis.VisMain.GetInstance();
        switch(bh) {
          case "+":
            var bg = bf.get_Region().get_ZoomFactor() + zoomInc;
            bf.get_Region().set_ZoomFactor(Math.min(zoomMin, Math.max(zoomMax, bg)));
            break;
          case "-":
            var bg = bf.get_Region().get_ZoomFactor() - zoomInc;
            bf.get_Region().set_ZoomFactor(Math.min(zoomMin, Math.max(zoomMax, bg)));
            break;
        }
        this.closeCityInfo();
        this.closeCityList();
      }

      var backgroundArea = qx.core.Init.getApplication().getBackgroundArea();
      qx.bom.Element.removeListener(backgroundArea.mapContainer, "mousewheel", backgroundArea._onMouseWheel, backgroundArea);
      qx.bom.Element.removeListener(backgroundArea.mapBlocker, "mousewheel", backgroundArea._onMouseWheel, backgroundArea);
      webfrontend.gui.BackgroundArea.prototype._onMouseWheel = function(e) {
        if(this.activeSceneView == null)
          return;
        var bz = e.getWheelDelta();
        var by = this.activeSceneView.get_ZoomFactor();
        by += bz > 0 ? -zoomInc : zoomInc;
        by = Math.min(zoomMin, Math.max(zoomMax, by));
        this.activeSceneView.set_ZoomFactor(by);
        e.stop();
      }
      qx.bom.Element.addListener(backgroundArea.mapContainer, "mousewheel", backgroundArea._onMouseWheel, backgroundArea);
      qx.bom.Element.addListener(backgroundArea.mapBlocker, "mousewheel", backgroundArea._onMouseWheel, backgroundArea); 
    }
 
    function tazoom_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined') {
          a = qx.core.Init.getApplication(); // application
          mb = qx.core.Init.getApplication().getMenuBar();
          if (a && mb) {
            initialize();
          } else
            window.setTimeout(tazoom_checkIfLoaded, 1000);
        } else {
          window.setTimeout(tazoom_checkIfLoaded, 1000);
        }
      } catch (e) {
        if (typeof console != 'undefined') console.log(e);
        else if (window.opera) opera.postError(e);
        else GM_log(e);
      }
    }
    
    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(tazoom_checkIfLoaded, 1000);
    }
  }

  // injecting, because there seem to be problems when creating game interface with unsafeWindow
  var tazoomScript = document.createElement("script");
  tazoomScript.innerHTML = "(" + tazoom_main.toString() + ")();";
  tazoomScript.type = "text/javascript";
  if (/commandandconquer\.com/i.test(document.domain)) {
    document.getElementsByTagName("head")[0].appendChild(tazoomScript);
  }
})();
 
 
 
 
 
 
 
 
 
  
// ==UserScript==
// @name        C&C:Tiberium Alliances Coords Button - All
// @namespace   CNCTACoordsButtonAll
// @description Copy & Paste selected world object coords to chat message
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     2.0.1
// @author Bruce Doan, Chiantii
// @updateURL   https://userscripts.org/scripts/source/167957.meta.js
// @downloadURL https://userscripts.org/scripts/source/167957.user.js
// ==/UserScript==
(function () {
  var CNCTACoordsButtonAll_main = function () {
    try {
      function createCoordsButton() {
        console.log('C&C:Tiberium Alliances Coords Button All loaded.');
 
        /*
        $a = qx.core.Init.getApplication(); // Application
        $c = $a.getChat(); // ChatWindow
        $w = $c.getChatWidget(); // ChatWidget
        $i = $cw.getEditable(); // Input
        $d = $i.getContentElement().getDomElement(); // Input DOM Element
        */
 
        var coordsButton = {
          selectedBase: null,
          pasteCoords: function(){
            var $i = qx.core.Init.getApplication().getChat().getChatWidget().getEditable(); // Input
            var $d = $i.getContentElement().getDomElement(); // Input DOM Element
 
            var result = new Array();
            result.push($d.value.substring(0,$d.selectionStart)); // start
 
            result.push('[coords]' + coordsButton.selectedBase.get_RawX() + ':' + coordsButton.selectedBase.get_RawY() + '[/coords]');
 
            result.push($d.value.substring($d.selectionEnd, $d.value.length)); // end
 
            $i.setValue(result.join(' '));
          }
        };
 
        if (!webfrontend.gui.region.RegionCityMenu.prototype.__coordsButton_showMenu) {
          webfrontend.gui.region.RegionCityMenu.prototype.__coordsButton_showMenu = webfrontend.gui.region.RegionCityMenu.prototype.showMenu;
       
          webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function (selectedVisObject) {
            coordsButton.selectedBase = selectedVisObject;
            if (this.__coordsButton_initialized != 1) {
              this.__coordsButton_initialized = 1;
              this.__newComposite = new qx.ui.container.Composite(new qx.ui.layout.VBox(0)).set({
                padding: 2
              });
              for(i in this) {
                if(this[i] && this[i].basename == "Composite") {
                  var button = new qx.ui.form.Button("Paste Coords");
                  button.addListener("execute", function () {
                    coordsButton.pasteCoords();
                  });            
                  this[i].add(button);
                }
              }
            }
            this.__coordsButton_showMenu(selectedVisObject);
            switch (selectedVisObject.get_VisObjectType()) {
              case ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest:
              case ClientLib.Vis.VisObject.EObjectType.RegionRuin:
              case ClientLib.Vis.VisObject.EObjectType.RegionHubControl:
              case ClientLib.Vis.VisObject.EObjectType.RegionHubServer:
                this.add(this.__newComposite);
                break;
            }
          }
        }
      }    
    } catch (e) {
      console.log("createCoordsButton: ", e);
    }
 
    function CNCTACoordsButtonAll_checkIfLoaded() {
      try {
        if (typeof qx !== 'undefined') {
          createCoordsButton();
        } else {
          window.setTimeout(CNCTACoordsButtonAll_checkIfLoaded, 1000);
        }
      } catch (e) {
        console.log("CNCTACoordsButtonAll_checkIfLoaded: ", e);
      }
    }
  window.setTimeout(CNCTACoordsButtonAll_checkIfLoaded, 1000);
  };
  try {
    var CNCTACoordsButtonAll = document.createElement("script");
    CNCTACoordsButtonAll.innerHTML = "(" + CNCTACoordsButtonAll_main.toString() + ")();";
    CNCTACoordsButtonAll.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(CNCTACoordsButtonAll);
  } catch (e) {
    console.log("CNCTACoordsButtonAll: init error: ", e);
  }
})();










// ==UserScript==
// @name        C&C: Tiberium Alliances Chat Helper Enhanced
// @namespace   https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @description Automates the use of chat and message BB-Codes: [coords][url][player][alliance][b][i][s][u] - Contact list for whispering - Type /chelp <enter> in chat for help.
// @include     https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     3.1.6
// @grant       none
// ==/UserScript==

// type: /chelp in any text box and hit <enter> for a list of commands

// Please report urls that are not tagged properly

// window.chatHelper_suppressBrowserAltKeys suppresses normal browser menu keys [Alt+(a,p,b,i,u,s)] when you are in a textarea so that the menus don't open.

(function () {
    var chatHelper_main = function () {
        window.chatHelper_debug = 0; //initial debug level, top level for easy console access
        var chlog = function chlog(str,lvl){
            if (lvl > 0) { //lvl 1+
                if (window.chatHelper_debug == 1) { // lvl 1
                    console.log("ChatHelper_debug: "+str+"\n");
                }
                if (window.chatHelper_debug == 2) { // lvl 2
                    console.log("ChatHelper_debug: "+str+"\n");
                }
                
            } else { //lvl 0 or no arg passed to lvl
                console.log("ChatHelper_log: "+str+"\n");
            }
        };
        try {
            function createchatHelper() {
                var onkeyupDelay = 50; //ms to wait after a keyupevent before searching contacts list. Lower for faster searching. Higher for better performance.
                window.chatHelper_suppressBrowserAltKeys = true;
                window.chatHelper_version = "3.1.6";
                window.chatHelper_name = "C&C: Tiberium Alliances Chat Helper Enhanced";
                chlog(window.chatHelper_name + ' v' + window.chatHelper_version + ': loading.',0);
                var saveObj = {
                    saveObjVer : "3.1.6",
                    contacts : []
                }
                
                var validCharPatt = /[-\w\.]/;
                var isWhisp = false;
                var contacts = [];
                var timer;
                var _sub;

                
                function getCaretPos(obj) {
                    // getCaretPos from: http://userscripts.org/scripts/show/151099
                    obj.focus();
                    
                    if (obj.selectionStart) {
                        return obj.selectionStart; //Gecko
                    } else if (document.selection) //IE
                    {
                        var sel = document.selection.createRange();
                        var clone = sel.duplicate();
                        sel.collapse(true);
                        clone.moveToElementText(obj);
                        clone.setEndPoint('EndToEnd', sel);
                        return clone.text.length;
                    }
                    
                    return 0;
                }
                
                function moveCaret(inputObject, pos) {
                    // moveCaretPos from: http://userscripts.org/scripts/show/151099
                    if (inputObject.selectionStart) {
                        inputObject.setSelectionRange(pos, pos);
                        inputObject.focus();
                    }
                }
                
                function getCursorWordPos(inputField) {
                    var pos = getCaretPos(inputField);
                    var inText = inputField.value;
                    var lc = inText.charAt(pos - 1);
                    if (lc.match(validCharPatt) != null) {
                        var sPos = pos;
                        var ePos = pos;
                        var t = inputField.value;
                        while (sPos >= 0 && t.charAt(sPos - 1).match(validCharPatt) != null) {
                            sPos--;
                        }
                        while (ePos <= t.length && t.charAt(ePos).match(validCharPatt) != null) {
                            ePos++;
                        }
                        //inputField.setSelectionRange(sPos,ePos);
                        return [sPos, ePos];
                    }
                }
                
                function tagWith(tag, inputField) {
                    var eTag = tag.replace('[', '[/'); //closing tag
                    var tagLen = tag.length;
                    var eTagLen = eTag.length;
                    if (inputField != null) {
                        var pos = getCaretPos(inputField);
                        var inText = inputField.value;
                        //save scroll position
                        if (inputField.type === 'textarea')
                            var st = inputField.scrollTop;
                        //if there is selected text
                        if (inputField.selectionStart !== inputField.selectionEnd) {
                            var a = inText.slice(0, inputField.selectionStart);
                            var b = inText.slice(inputField.selectionStart, inputField.selectionEnd);
                            var c = inText.slice(inputField.selectionEnd, inText.length);
                            inputField.value = a + tag + b + eTag + c;
                            moveCaret(inputField, pos + tagLen + eTagLen + b.length);
                            //if ((input IS empty) OR (the last char was a space)) AND next char ISNOT a left sqbracket
                        } else if ((inText === "" || inText.charAt(pos - 1) === " ") && (inText.charAt(pos) !== '[')) {
                            inputField.value = inText.substr(0, pos) + tag + eTag + inText.substr(pos, inText.length);
                            moveCaret(inputField, pos + tagLen);
                            //if last character is a valid playername character
                        } else if (inText.charAt(pos - 1).match(validCharPatt) != null) {
                            var arr = getCursorWordPos(inputField); //
                            var s = arr[0];
                            var e = arr[1];
                            inputField.value = inText.slice(0, s) + tag + inText.slice(s, e) + eTag + inText.slice(e, inText.length);
                            moveCaret(inputField, e + tagLen + eTagLen);
                        }
                        //restore scroll position
                        if (inputField.type === 'textarea')
                            inputField.scrollTop = st;
                    }
                }
                
                function showHelp() {
                    alert("Type /chelp in any text box to show this message.\n\nEnter key in chat:\tsearches your chat string for Urls and Coords and wraps them before submission.\n\nAlt + 1\t:\tsearches for Urls and Coords in a message or forum post and tags accordingly. Cursor is moved to the beginning.\nAlt + 2\t:\tManual URL insertion popup window\nAlt + 0\t:\tclears all tags\n\nWord wraps: tags a selected word -or- tags the word where the cursor is (if chat is empty or you hit <space> empty tags are inserted).\nAttempts to preserve cursor and scroll position.\n|\tAlt + p or Alt + 3\t:\tplayer tags\n|\tAlt + a or Alt + 4\t:\talliance tags\n|\tAlt + b\t\t\t:\tbold tags\n|\tAlt + i\t\t\t:\titalic tags\n|\tAlt + u\t\t\t:\tunderline tags\n|__\tAlt + s\t\t\t:\tstrikethrough tags\n\nContact list commands:\n/list -or- /contacts\n/add\n/del\n/del all - wipes your whole contact list");
                }
                
                function saveData() {
                    saveObj.contacts = contacts;
                    var jString = JSON.stringify(saveObj);
                    chlog("saveJSON: "+jString, 1);
                    localStorage.setItem('chatHelper', jString);
                }

                function loadData() {
                    try{
                        if (localStorage.getItem('myContacts')) { //should be removed eventually
                            var dat = localStorage.getItem('myContacts');
                            dat = dat.split(',');
                            saveObj.contacts = dat;
                            
                            //unset old storage 
                            localStorage.removeItem('myContacts');
                        } else if (localStorage.getItem('chatHelper')) {
                            var saveObjTmp = JSON.parse(localStorage.getItem('chatHelper'));
                            if (saveObjTmp.saveObjVer != window.chatHelper_version){
                                //version changed
                                var va = saveObjTmp.saveObjVer.split('.');
                                var vb = window.chatHelper_version.split('.');
                                
                                if (va[0] != vb[0]){ //major version change
                                    chlog("ChatHelper: Major version change from v"+va[0]+"."+va[1]+"."+va[2]+" to v"+vb[0]+"."+vb[1]+"."+vb[2]);
                                } else {
                                    if (va[1] != vb[1]){ //minor version change
                                        chlog("ChatHelper: Minor version change from v"+va[0]+"."+va[1]+"."+va[2]+" to v"+vb[0]+"."+vb[1]+"."+vb[2]);
                                    } else {
                                        if (va[2] != vb[2]){ //patch release
                                            chlog("ChatHelper: Version Patched from v"+va[0]+"."+va[1]+"."+va[2]+" to v"+vb[0]+"."+vb[1]+"."+vb[2]);
                                        }
                                    }
                                }
                            } else {
                                //no version change
                                localStorage.getItem('chatHelper');
                            }
                            saveObj = saveObjTmp;
                        }
                        contacts = saveObj.contacts;
                        saveData();
                    }catch(err){
                        chlog(err);
                    }
                }
                
                if (!localStorage.myContacts) {
                    chlog("Deprecated contacts variable does not exist.",1);
                    loadData();
                } else {
                    //contacts = loadData();
                    loadData();
                    chlog("Contacts: " + contacts, 1);
                }
                
                function saveContact(fr) {
                    chlog("Number of contacts == "+contacts.length,1);
                    contacts.push(fr);
                    chlog(fr + " added to contacts list.",1);
                    saveData();
                }
                
                function caseInsensitiveSort(a, b) {
                    a = a.toLowerCase();
                    b = b.toLowerCase();
                    if (a > b)
                        return 1;
                    if (a < b)
                        return -1;
                    return 0;
                }
                
                function listContacts() {
                    var len = contacts.length;
                    var a = contacts.sort(caseInsensitiveSort);
                    if (len == 1) {
                        alert(len + " Contact:\n\n" + a.join("\n") + "\n");
                    } else if (len > 1) {
                        alert(len + " Contacts:\n\n" + a.join("\n") + "\n");
                    } else {
                        var p = prompt("Your contacts list is empty.\n\nType a name here to add a contact:\n", "");
                        if (p) {
                            saveContact(p);
                        }
                    }
                }
                
                function deleteContact(fr) {
                    if (fr === "all") {
                        contacts = [];
                        chlog("All contacts deleted",1);
                        saveData();
                    } else {
                        var ind = contacts.indexOf(fr);
                        if (ind > -1) {
                            saveObj.contacts = contacts.splice(ind, 1);
                            saveData();
                            chlog(contacts,1);
                            chlog(fr + " deleted from contacts list.");
                        }
                    }
                }
                function keyUpTimer(kEv) {
                    kEv = kEv || window.event;
                    if (kEv.target.type === "text" && kEv.target.value != '') {
                        var inputField = kEv.target;
                        var inText = inputField.value;
                        var len = inText.length;
                        var sub;
                        var kc = kEv.keyCode;
                        if (len >= 10 && inText.match(/^(\/whisper)/) != null) {
                            isWhisp = true;
                        }
                        if (isWhisp && len >= 10 && !kEv.altGraphKey && !kEv.ctrlKey && !kEv.altKey && kc > 47 && kc < 91) {
                            chlog("keyUpTimer keyCode =="+kEv.keyCode,1);
                            sub = inText.substr(9);
                            if (!sub.match(/\s/)) {
                                for (var i = 0; i < contacts.length; i++) {
                                    var slen = sub.length;
                                    if (contacts[i][slen - 1] === sub[slen - 1] && contacts[i].substr(0, slen) == sub) {
                                        inputField.value = "/whisper " + contacts[i] + " ";
                                        inputField.setSelectionRange(10 + slen - 1, 10 + contacts[i].length, "forward");
                                    }
                                }
                            } else {
                                isWhisp = false;
                            }
                        } else {
                            isWhisp = false;
                        }
                    }
                }
                
                document.onkeyup = function (kEv) {
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                            keyUpTimer(kEv);
                        }, onkeyupDelay);
                }
                
                function delayedConfirm() {
                    if (confirm("Add " + _sub + " to your contacts list?\n\nYou can see a list of your contacts by typing /list")) {
                        saveContact(_sub);
                    }
                }
                
                function autoTag(inputField, inText) {
                    var isUrl = false;
                    var lookBack;
                    //the code here is mostly from Bruce Doan: http://userscripts.org/scripts/show/151965
                    ////auto url
                    inText = inText.replace(/(\[url\])*(https?:\/\/)([\da-z\.-]+)(\.[a-z]{2,6})([\/\w\.\-\=\?\&\%\+\|#:;,~\*\(\)\$]*)*\/?(\[\/url\])*/gi, function () {
                            var result = new Array();
                            var protocol = arguments[2].match(/https?:\/\//);
                            for (var i in arguments){
                                chlog("autoTag url reg arg "+i + "= " + arguments[i],1);
                            }
                            result.push('[url]');
                            result.push(arguments[2]); // http[s]://
                            result.push(arguments[3]); // domain
                            result.push(arguments[4]); // ext
                            result.push(arguments[5]); // query string
                            result.push('[/url]');
                            if (protocol === null){
                                chlog("autotag url - no protocol",2);
                            } else {
                                isUrl = true;
                                chlog("bypassing coords tagging\n detected protocol = " + protocol,2);
                                
                            }
                            return result.join('');
                        });
                    ////auto coords
                    if (!isUrl) {
                        chlog("checking for coords",1);
                        lookBack = inText.replace(/(\[coords\])?([#])?([0-9]{3,4})[:.]([0-9]{3,4})([:.]\w+)?(\[\/coords\])?/gi, function () {
                                for (var i in arguments){
                                    chlog("autoTag coords reg arg " + i + " = " + arguments[i],1);
                                }
                                var hashBefore = arguments[2];
                                chlog("hashBefore "+hashBefore,1);
                                if (!hashBefore) {
                                    chlog("no hash returning");
                                    var result = new Array();
                                    result.push('[coords]');
                                    result.push(arguments[3]);
                                    result.push(':');
                                    result.push(arguments[4]);
                                    if (arguments[5] != undefined) {
                                        result.push(arguments[5].replace('.', ':'));
                                    }
                                    result.push('[/coords]');
                                    return result.join('');
                                } else {
                                    return arguments[0];
                                }
                            });
                        inText = lookBack;
                        chlog("lookedback",1);
                        chlog("LB string: "+lookBack,1);
                    }
                    // shorthand for player
                    inText = inText.replace(/\[p\]([a-z0-9_\-\s]+)\[\/p\]/gi, '[player]$1[/player]');
                    // shorthand for alliance
                    inText = inText.replace(/\[a\]([a-z0-9_\-\s]+)\[\/a\]/gi, '[alliance]$1[/alliance]');
                    
                    return inText;
                }
                
                document.onkeydown = function (kEv) {
                    kEv = kEv || window.event;
                    
                    /* Tab key
                    if (kEv.keyCode == 9){
                        chlog("Tab key pressed",1)
                        var input = qx.core.Init.getApplication().getChat().getChatWidget().getEditable(); // Input
                        kEv.preventDefault();
                        kEv.stopPropagation();
                    }
                     */
                    if (!kEv.shiftKey && kEv.keyCode === 13 && (kEv.target.type === "text" || kEv.target.type === "textarea")) {
                        var inputField = kEv.target;
                        var inText = inputField.value;
                        var add = inText.match(/^(\/add)/);
                        var del = inText.match(/^(\/del)/);
                        var showContacts = inText.match(/^((\/contacts)|(\/list))/);
                        var sub;
                        var cf;
                        if (inText.match(/^(\/whisper)/) != null || add != null) {
                            if (add != null) {
                                sub = inText.substr(5);
                            } else {
                                sub = inText.substr(9);
                            }
                            if (sub.match(/^(\w*)\s/)) {
                                //if space after player name (is a whisper or a typo)
                                var arr = sub.match(/^(\w*)/);
                                sub = arr[0].replace(/\s$/, "");
                                if (contacts.indexOf(sub) == -1) {
                                    //not in contacts list
                                    _sub = sub;
                                    setTimeout(delayedConfirm, 500);
                                }
                            } else if (contacts.indexOf(sub) == -1) {
                                //no message to send, not in contacts, promt to add, clear input
                                chlog("clearing input field",1);
                                inputField.focus(); //?necessary?
                                inputField.value = "";
                                var cf = confirm("Add " + sub + " to your contacts list?\n\nYou can see a list of your contacts by typing /list");
                                if (cf) {
                                    saveContact(sub);
                                    return false;
                                } else {
                                    return false;
                                }
                            } else if (sub && contacts.indexOf(sub) > -1) {
                                //not a whisper, reject duplicate contact
                                alert(sub + " is already in your contacts list.");
                            }
                        }
                        //remove contact(s)
                        if (del) {
                            sub = inText.substr(5);
                            chlog("clearing input field",1);
                            inputField.value = "";
                            if ((contacts.indexOf(sub) > -1 || sub == "all") && confirm("Really delete " + sub + " from your contacts?")) {
                                deleteContact(sub);
                            } else {
                                alert(sub + " is not in your contacts list.");
                            }
                            return false;
                        }
                        // show contacts list
                        if (showContacts) {
                            chlog("clearing input field",1);
                            inputField.value = "";
                            listContacts();
                            return false;
                            
                        }
                        // /chelp dialog
                        if (inText.length === 6 && inText.match(/^(\/chelp)/) != null) {
                            chlog("clearing input field",1);
                            inputField.value = "";
                            showHelp();
                            return false;
                        }
                        
                        if (inputField != null && inputField.type === "text" && inText !== "") {
                            chlog("onEnter auto-tagging",1);
                            
                            inText = autoTag(inputField, inText); //auto-tag
                            
                            if (inText !== inputField.value) {
                                inputField.value = inText;
                            }
                        }
                    }
                    
                    if (kEv.altKey && !kEv.shiftKey && !kEv.altGraphKey && !kEv.ctrlKey && kEv.target != null && (kEv.target.type === "textarea" || kEv.target.type === "text")) {
                        var inputField = kEv.target;
                        var inText = inputField.value;
                        // Alt key, not Ctrl or AltGr
                        if (kEv.altKey && !kEv.altGraphKey && !kEv.ctrlKey) {
                            var cc = kEv.charCode;
                            var kc = kEv.keyCode;
                            chlog("charCode == "+cc,1);
                            chlog("keyCode == "+kc,1);

                            /* Alt+1 for auto Coordinates/Urls in message body */
                            if (inputField.type === "textarea" && (cc === 49 || kc === 49)) {
                                var pos = getCaretPos(inputField);
                                chlog("attempting Alt+1 message auto-tag",1);
                                if (inputField != null) {
                                    var st = inputField.scrollTop;
                                    
                                    inText = autoTag(inputField, inText); //auto-tag
                                    
                                    if (inText !== "" || inText !== inputField.value) {
                                        inputField.value = inText;
                                        inputField.scrollTop = st;
                                        moveCaret(inputField, 0);
                                    }
                                }
                            }
                            /* Alt+2 for URLs fallback */
                            if (cc === 50 || kc === 50) {
                                if (inputField != null) {
                                    var url = prompt("Website (Syntax: google.com or www.google.com)", "");
                                    if (url != null) {
                                        inputField.value += '[url]' + url + '[/url]';
                                    }
                                }
                            }
                            /* Alt+3 or Alt+p for players */
                            if ((cc === 112 || kc === 80) || (cc === 51 || kc === 51)) {
                                tagWith('[player]', inputField);
                                if (window.chatHelper_suppressBrowserAltKeys)
                                    return false;
                            }
                            /* Alt+4 or Alt+a for alliances */
                            if ((cc === 97 || kc === 65) || (cc === 52 || kc === 52)) {
                                tagWith('[alliance]', inputField);
                                if (window.chatHelper_suppressBrowserAltKeys)
                                    return false;
                            }
                            /* Alt+0 to clear tags */
                            if (cc === 48 || kc === 48) {
                                if (inputField.type === 'textarea')
                                    var st = inputField.scrollTop;
                                if (inputField != null) {
                                    inText = inText.replace(/\[\/?coords\]/gi, '');
                                    inText = inText.replace(/\[\/?url\]/gi, '');
                                    inText = inText.replace(/\[\/?player\]/gi, '');
                                    inText = inText.replace(/\[\/?alliance\]/gi, '');
                                    inText = inText.replace(/\[\/?b\]/gi, '');
                                    inText = inText.replace(/\[\/?i\]/gi, '');
                                    inText = inText.replace(/\[\/?u\]/gi, '');
                                    inText = inText.replace(/\[\/?s\]/gi, '');
                                    inputField.value = inText;
                                }
                                if (inputField.type === 'textarea')
                                    inputField.scrollTop = st;
                            }
                            /* Alt+b for bold */
                            if (cc === 98 || kc === 66) {
                                tagWith('[b]', inputField);
                                if (window.chatHelper_suppressBrowserAltKeys)
                                    return false;
                            }
                            /* Alt+i for italics */
                            if (cc === 105 || kc === 73) {
                                tagWith('[i]', inputField);
                                if (window.chatHelper_suppressBrowserAltKeys)
                                    return false;
                            }
                            /* Alt+u for underline */
                            if (cc === 117 || kc === 85) {
                                tagWith('[u]', inputField);
                                if (window.chatHelper_suppressBrowserAltKeys)
                                    return false;
                            }
                            /* Alt+s for strikethrough */
                            if (cc === 115 || kc === 83) {
                                tagWith('[s]', inputField);
                                if (window.chatHelper_suppressBrowserAltKeys)
                                    return false;
                            }
                        }
                    }
                }
            }
        } catch (err) {
            chlog("createchatHelper: "+ err,1);
            console.error(err);
        }
        
        function chatHelper_checkIfLoaded() {
            try {
                if (typeof qx !== 'undefined') {
                    createchatHelper();
                } else {
                    window.setTimeout(chatHelper_checkIfLoaded, 1333);
                }
            } catch (err) {
                console.log("chatHelper_checkIfLoaded: ", err);
            }
        }
        window.setTimeout(chatHelper_checkIfLoaded, 1333);
    };
    try {
        var chatHelper = document.createElement("script");
        chatHelper.innerHTML = "(" + chatHelper_main.toString() + ")();";
        chatHelper.type = "text/javascript";
        document.getElementsByTagName("head")[0].appendChild(chatHelper);
    } catch (err) {
        console.log("chatHelper: init error: ", err);
    }
})();










// ==UserScript==
// @name        AllianceMemberOnline
// @namespace   AllianceMemberOnline
// @description Gives an overview of all online alliance members sorted by there member state.
// @version     0.1.3.0
// @author      InFlames2k (Patrick Schubert)
// @include     http*://*.alliances.commandandconquer.com/*
// @grant         GM_log
// @grant         GM_setValue
// @grant         GM_getValue
// @grant         GM_registerMenuCommand
// @grant         GM_xmlhttpRequest
// @grant         GM_updatingEnabled
// @grant         unsafeWindow
// @grant         metadata
// ==/UserScript==
(function(){
    var AllianceMemberOnline0 = function()
    {
        // create the main class
        function createClass()
        {
              console.log("Starting creation of classes");
            // define the memberoverview class
            qx.Class.define("AllianceMemberOnline.Main",
            {
                type: "singleton",
                extend: qx.core.Object,
                
                // constructor of the class
                construct: function()
                {
                    try
                    {                
                        console.log("Initializing AllianceMemberOnlineButton Button");
                        var AllianceMemberOnlineButton = new qx.ui.form.Button("Alliance Overview");
                        AllianceMemberOnlineButton.set(
                        {            
                            alignY: "middle",                            
                            width : 120,                            
                            toolTipText : "open AllianceMemberOnline window",
                            appearance: "button-text-small"
                        });
                                                
                        AllianceMemberOnlineButton.addListener("execute", this.__openAllianceMemberOnlineWindow, this);
        
                        console.log("Adding AllianceMemberOnlineButton to view");
                        var app = qx.core.Init.getApplication();
                        app.getDesktop().add(AllianceMemberOnlineButton, 
                        {
                            bottom: 0, 
                            right: 120
                        });
                        
                    //    var AllianceMemberOnlineWindow = AllianceMemberOnline.Window.getInstance();
                    //    AllianceMemberOnlineWindow.open();
                    }
                    catch(e)
                    {
                        console.log("Failed to initialize AllianceMemberOnline: ", e);
                    }
                    console.log("AllianceMemberOnline loaded");
                },
                
                // destructor of the class
                destruct: function()
                {
                },
                
                members:
                {                
                    // Method to show the window
                    __openAllianceMemberOnlineWindow: function()
                    {
                        var AllianceMemberOnlineWindow = AllianceMemberOnline.Window.getInstance();
                        
                        if(AllianceMemberOnlineWindow.isVisible())
                        {
                            console.log("closing AllianceMemberOnlineWindow");
                            AllianceMemberOnlineWindow.close();
                        }
                        else
                        {
                            console.log("opening AllianceMemberOnlineWindow");
                            AllianceMemberOnlineWindow.open();
                        }
                    }
                }
            });        
            
            qx.Class.define("AllianceMemberOnline.Window",
            {
                type: "singleton",
                extend: qx.ui.window.Window,
                
                // constructor of the class
                construct: function()
                {
                    try
                    {                
                        console.log("Creating AllianceMemberOnline.Window");
                        this.base(arguments);
                        this.setLayout(new qx.ui.layout.Canvas());
                        
                        this.set(
                        {                
                            width: 150,
                            caption: "Online Members",
                            allowMaximize: false,
                            showMaximize: false,
                            allowMinimize: false,
                            showMinimize: false,
                            resizable: true
                        });        
                        
                        this.model = new qx.ui.table.model.Simple();
                        this.model.setColumns(["Role", "Name", "OnlineState", "RoleText"]);
                        this.model.sortByColumn(1, true);                        
                        this.list = new qx.ui.table.Table(this.model);
                        this.list.setColumnVisibilityButtonVisible(false);
                        this.list.setColumnWidth(0, 0);
                        this.list.setColumnWidth(1, 130);                    
                        this.list.setColumnWidth(2, 0);
                        this.list.setColumnWidth(3, 0);    
                        this.list.set({ width: 130, minHeight: 250 });
                        var tModel = this.list.getTableColumnModel();
                        tModel.setColumnVisible(0, false);
                        tModel.setColumnVisible(2, false);
                        tModel.setColumnVisible(3, false);
                        this.list.setStatusBarVisible(false);
                        this.add(this.list, {
                            bottom: 0, 
                            left: 0
                        });
                        
                        this.list.addListener("mousemove", function(e)
                        {
                            var cell = this.getCellUnderMouse(this.list, e);
                            var row  = cell.row;
                            var col  = cell.col;
                            if((row >= 0) && (col >= 0))
                            {
                                if((this._curTtRow != row) || (this._curTtCol != col))
                                {
                                    this.list.setToolTipText("");
                                    var ttManager = qx.ui.tooltip.Manager.getInstance();
                                    ttManager.resetCurrent();
                                    var ttText = this._onGetToolTipText(this.list, row, col);
                                    if(ttText && (ttText != ""))
                                    {
                                        this.list.setToolTipText(ttText);
                                        ttManager.showToolTip(this.list);
                                    }
                                }
                            }
                            else
                            {
                                if((this._curTtRow >= 0) && (this._curTtCol >= 0))
                                {
                                    this.list.setToolTipText("");
                                    var ttManager = qx.ui.tooltip.Manager.getInstance();
                                    ttManager.resetCurrent();
                                }
                            }
                            this._curTtRow = row;
                            this._curTtCol = col;
                        }, this);
                        
                        try
                        {
                            var timer = qx.util.TimerManager.getInstance();
                        }
                        catch(e)
                        {
                            console.log("Failed to get timer");
                            throw e;
                        }
                        timer.start(function()
                        {
                                        console.log("Timer function running");
                                        // example getting player title icon
                                        // console.log(ClientLib.Data.MainData.GetInstance().get_Player().get_TitleIcon());
                                        console.log("Getting Members and members count");
                                        var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                                        alliance.RefreshMemberData();
                                        var members = alliance.get_MemberDataAsArray();
                        
                                        console.log("Creating model");
                                        var rowArr=[];                                    
                                    
                                        var iCounter = 0;
                                        for(i = 0; i < alliance.get_NumMembers(); i++)
                                        {
                                            var member = members[i];
                                            var name = member.Name;
                                            if(member.OnlineState == ClientLib.Data.EMemberOnlineState.Away)
                                                 name=">>" + name;
                                            if(member.OnlineState == ClientLib.Data.EMemberOnlineState.Online || member.OnlineState == ClientLib.Data.EMemberOnlineState.Away)
                                            {    
                                             
                                             //   var name = member.Name;
                                                rowArr.push([member.Role, name, member.OnlineState, member.RoleName]);
                                                console.log(member.Role + " - " + member.Name);
                                                console.log("AllianceMemberOnlineView: " + member.Name + " - " + member.OnlineState);
                                                iCounter++;
                                            }
                                        }
                        
                                        this.model.removeRows(0, this.model.getRowCount(), true)
                                        this.model.setData(rowArr);
                                        this.model.sortByColumn(0, true);
                        },
                        5000,
                        this,
                        null,
                        1000); 
                    }
                    catch(e)
                    {
                        console.log("Failed to initialize AllianceMemberOnline.Window");
                        console.log(e);
                    }
                    console.log("AllianceMemberOnline loaded");
                },
                
                // destructor of the class
                destruct: function()
                {
                },
                
                members:
                {            
                    model: null,
                    list: null,
                
                    getCellUnderMouse : function(table, mouseEvent)
                    {
                        var row = -1, col = -1;
                        if(table && mouseEvent)
                        {
                            var pageX = mouseEvent.getDocumentLeft();
                            var pageY = mouseEvent.getDocumentTop();                    
                            var sc = table.getTablePaneScrollerAtPageX(pageX);                    
                            if(sc)                    
                            {                    
                              row = sc._getRowForPagePos(pageX, pageY);                    
                              col = sc._getColumnForPageX(pageX);                    
                              if((row === null) || (row === undefined)) { row = -1; }                    
                              if((col === null) || (col === undefined)) { col = -1; }                    
                            }                    
                          }                    
                          return({ "row": row, "col": col });
                    },
                    
                    _onGetToolTipText : function(table, row, col)
                    {     
                      //  console.log(this.model.getValue(3, row));
                        return this.model.getValue(3, row);                          
                    } 
                }
            });
        }    
        
        
        // **************************************************************
        // Main Initialization
        function AllianceMemberOnline_checkIfLoaded() 
        {
            try 
            {
                if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible())
                {
                    createClass();
                    window.AllianceMemberOnline.Main.getInstance();            
                } else 
                {
                    window.setTimeout(AllianceMemberOnline_checkIfLoaded, 1000);
                }
            } catch (e) 
            {
                console.log("AllianceMemberOnline_checkIfLoaded: ", e);
            }
        }
        
        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(AllianceMemberOnline_checkIfLoaded, 1000);
        }
    };    
    
    try 
    {
        var script = document.createElement("script");
        script.innerHTML = "(" + AllianceMemberOnline0.toString() + ")();";
        script.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName("head")[0].appendChild(script);
        }
    } 
    catch (e) 
    {
        console.log("AllianceMemberOnline init error: ", e);
    }
})();










// ==UserScript==
// @name        DailyStats
// @namespace   DailyStats
// @description Script that opens 
// @version     0.1.0.0
// @author      InFlames2k (Patrick Schubert)
// @include     http*://*.alliances.commandandconquer.com/*
// ==/UserScript==
(function(){
    var DailyStats = function()
    {
        // create the main class
        function createClass()
        {
          
            qx.Class.define("DailyStats.Window",
            {
                type: "singleton",
                extend: qx.ui.window.Window,
                
                // constructor of the class
                construct: function()
                {
                    try
                    {        
                        console.log("DailyStats: Initializing");
                        var app = qx.core.Init.getApplication();
                        this.base(arguments);
                        
                        var layout = new qx.ui.layout.Grid(2, 2);
                        layout.setColumnAlign(0, "left", "top");
                        layout.setColumnAlign(1, "right", "top");
                        layout.setColumnWidth(0, 150);
                        layout.setColumnWidth(1, 100);
                        
                        this.setLayout(layout);
                        
                        this.set(
                        {                
                            width: 250,
                            height: 70,
                            caption: "Daily Stats",
                            allowMaximize: false,
                            showMaximize: false,
                            allowMinimize: false,
                            showMinimize: false,
                            showClose: true,
                            resizable: false                            
                        });        
                        
                        app.getDesktop().add(this);    
                        this.show();                    
                        
                        var parent = this.getLayoutParent();
                        if(parent)
                        {
                            var bounds = parent.getBounds();
                            var left = (bounds.width - 250) - 140;
                            var top = bounds.height - 100 - 30;
                            this.moveTo(left, top);
                        }                        
                        console.log("DailyStats: creating labels");
                        this.valueLabels = [];
                        var font = new qx.bom.Font();
                        font.set({ color: "#FF0000", bold: true, size: 15});
                        var labels = ["Punkte seit Login:", "Credits seit Login:"];
                        for (var i=0; i < labels.length; i++) 
                        {
                            var label = new qx.ui.basic.Label(labels[i]);
                            label.set({font: font, textColor: "#FFFFFF"});

                            this.valueLabels[i] = new qx.ui.basic.Label();
                            this.valueLabels[i].set({font: font, textColor: "#FFFFFF"});
                            
                            this.add(label, {row: i, column: 0 });    
                            this.add(this.valueLabels[i], {row: i, column: 1 });
                        }
                        
                        var player = ClientLib.Data.MainData.GetInstance().get_Player();
                        
                        this.valueLabels[0].setValue("0");
                        this.valueLabels[1].setValue("0");
                        //this.valueLabels[2].setValue("0");
                        
                        var timer = qx.util.TimerManager.getInstance();
                        timer.start(this.RunTimer, 1000,
                                                  this,
                                                  null,
                                                  3000);
                                                  
                        this.AddButton();
                    }
                    catch(e)
                    {
                        console.log(e);
                    }
                },
                
                // destructor of the class
                destruct: function()
                {
                },
                
                members:
                {
                    valueLabels: null,
                    startUpPoints: 0,
                    startUpCredits: 0,
                    options: null,

                    AddButton: function()
                    {
                        var DailyStatsButton = new qx.ui.form.Button("Daily Stats");
                        DailyStatsButton.set(
                        {            
                            alignY: "middle",                            
                            width : 120,                            
                            toolTipText : "open DailyStats window",
                            appearance: "button-text-small"
                        });
                                                
                        DailyStatsButton.addListener("execute", this.__openOpenDailyStatsWindow, this);
        
                        console.log("DailyStats: Adding DailyStatsButton to view");
                        var app = qx.core.Init.getApplication();
                        app.getDesktop().add(DailyStatsButton, 
                        {
                            bottom: 20, 
                            right: 120
                        });
                    },
                    
                    __openOpenDailyStatsWindow: function()
                    {
                        if(this.isVisible())
                        {
                            console.log("closing DailyStatsWindow");
                            this.close();
                        }
                        else
                        {
                            console.log("opening DailyStatsWindow");
                            this.open();
                        }
                    },
                    
                    RunTimer: function()
                    {
                        try
                        {
                            console.log("DailyStats: Timer elapsed");
                           // this.options = DailyStats.Preferences.getInstance();
                           // this.options.ReadSettings();    
                            //console.log("DailyStats: Timer elapsed");
                            //var currentDate = this.options.GetValueFromLocalStorage("CurrentDate", new Date());
                        
                            /*if(this.options.Settings[DailyStats.Preferences.LASTPLAYEDDATE] < currentDate)
                            {
                              this.options.SetValueToLocalStorage(DailyStats.Preferences.LASTPLAYEDDATE, currentDate);
                              this.options.SetValueToLocalStorage(DailyStats.Preferences.CURRENTSAVEDPOINTS, player.get_ScorePoints());
                            }*/
                        
                            var player = ClientLib.Data.MainData.GetInstance().get_Player();
                            
                            if(this.startUpPoints == 0)
                                this.startUpPoints = player.get_ScorePoints();
                            if(this.startUpCredits == 0)
                                this.startUpCredits = player.GetCreditsCount();
                            
                            var score = player.get_ScorePoints();
                            var credits = player.GetCreditsCount();
                         //   var dayScore = score;
                            score = score - this.startUpPoints;
                            credits = credits - this.startUpCredits;
                            
                         //   dayScore = dayScore - this.options.Settings[DailyStats.Preferences.CURRENTSAVEDPOINTS];
                        
                            this.valueLabels[0].setValue(this.formatNumber(score, 0, "", "."));
                            this.SetLabelColor(this.valueLabels[0], ""+score+"");        
                            this.valueLabels[1].setValue(this.formatNumber(credits, 0, "", "."));
                            this.SetLabelColor(this.valueLabels[1], ""+credits+"");
                          //  this.valueLabels[1].setValue(this.formatNumber(credits, 0, "", "."));
                          //  this.SetLabelColor(this.valueLabels[1], ""+credits+"");    
                            }
                            catch(e)
                            {
                                console.log("DailyStats: ", e);
                            }
                    },
                    
                   SetLabelColor: function(label, value)
                    {
                        if(value < 0)
                            label.set({ textColor: "#FF0000" });
                        else if(value == 0)
                            label.set({ textColor: "#FFFFFF" });
                        else
                            label.set({ textColor: "#00FF00" });
                    },
                    
                    formatNumber: function(num,dig,dec,sep)
                    {
                        x=new Array();
                        s=(num<0?"-":"");
                        num=Math.abs(num).toFixed(dig).split(".");
                        r=num[0].split("").reverse();
                        for(var i=1;i<=r.length;i++){x.unshift(r[i-1]);if(i%3==0&&i!=r.length)x.unshift(sep);}
                        return s+x.join("")+(num[1]?dec+num[1]:"");
                    }
                }
            });
        }    
        
        
        // **************************************************************
        // Main Initialization
        function DailyStats_checkIfLoaded() 
        {
            try 
            {
                if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible())
                {
                    createClass();
                    window.DailyStats.Window.getInstance();            
                } else 
                {
                    window.setTimeout(DailyStats_checkIfLoaded, 1000);
                }
            } catch (e) 
            {
                console.log("DailyStats_checkIfLoaded: ", e);
            }
        }
        
        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(DailyStats_checkIfLoaded, 1000);
        }
    };    
    
    try 
    {
        var script = document.createElement("script");
        script.innerHTML = "(" + DailyStats.toString() + ")();";
        script.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName("head")[0].appendChild(script);
        }
    } 
    catch (e) 
    {
        console.log("DailyStats init error: ", e);
    }
})();










// ==UserScript==
// @name        C&C:TA Compass Movable
// @namespace   http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @description Creates compass poiting to the currently selected base (compass points from itself).
// @version     1.1.0
// @author      Caine,BlinDManX
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// ==/UserScript==
(function () {
    var CompassMain = function () {
        try {
            function createCompass() {
                console.log('Compass loaded');
                qx.Class.define("Compass", {
                    extend: qx.ui.window.Window,
                    construct: function () {
                        this.base(arguments);
                        this.setWidth(54);
                        this.setHeight(90);
                        this.setContentPadding(0);
                        this.setShowMinimize(false);
                        this.setShowMaximize(false);
                        this.setShowClose(false);
                        this.setResizable(false);
                        this.setAllowMaximize(false);
                        this.setAllowMinimize(false);
                        this.setAllowClose(false);
                        this.setShowStatusbar(false);
                        this.setDecorator(null);                        
                        var title = this.getChildControl("title");
                        title.setTextAlign("center");
                        title.setTextColor("#FFF");
                        title.setRich(true);
                        title.setDecorator("tabview-chat-pane");
                        var captionBar = this.getChildControl("captionbar");
                        captionBar.setDecorator(null);
                        captionBar.remove(this.getChildControl("icon"));
                        captionBar.remove(this.getChildControl("minimize-button"));
                        captionBar.remove(this.getChildControl("restore-button"));
                        captionBar.remove(this.getChildControl("maximize-button"));
                        captionBar.remove(this.getChildControl("close-button"));
                        captionBar.setLayout(new qx.ui.layout.Grow());
                       
                        var pane = this.getChildControl("pane");
                        pane.setDecorator(null);
                        pane.setLayout(new qx.ui.layout.Grow());
                        this.setLayout(new qx.ui.layout.Canvas());
                      
                        var st = '<canvas id="compass" style="border:1px solid;position: absolute; top: 0px; left: 0px;" height="50" width="50"></canvas>';
                        var l = new qx.ui.basic.Label().set({
                            value: st,
                            rich: true
                        });
                        this.add(l);  
                        if (PerforceChangelist >= 382917) {
                            phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance().get_Region(), "PositionChange", ClientLib.Vis.PositionChange, this, this.displayCompass);
                        } else {
                            webfrontend.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance().get_Region(), "PositionChange", ClientLib.Vis.PositionChange, this, this.displayCompass);
                        }
                        this.addListener("move", function (e) {
                            this.displayCompass();
                        });
                        this.displayCompass();
                        
                    },
                    members: {
                        needle: null,                        
                        ec: null,
                        ctx: null,
                        halfsize: 25,
                        displayCompass: function () {
                            try {                                                              
                                if (this.ctx != null) {   
                                        var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity(); 
                                        var faction = currentCity.get_CityFaction();
                                        var winpos = this.getLayoutProperties();
                                        var ctx = this.ctx; 
                                        var cityCoordX = currentCity.get_PosX();
                                        var cityCoordY = currentCity.get_PosY();
                                        var region = ClientLib.Vis.VisMain.GetInstance().get_Region();
                                        var zoom = region.get_ZoomFactor();
                                        var targetCoordX = winpos.left + 34;
                                        var targetCoordY = winpos.top +  61;
                                        var gridW = region.get_GridWidth();
                                        var gridH = region.get_GridHeight();
                                        var viewCoordX = (region.get_PosX() + targetCoordX / zoom - zoom * gridW / 2) / gridW;
                                        var viewCoordY = (region.get_PosY() + targetCoordY / zoom - zoom * gridH / 2) / gridH;
                                        var dx = viewCoordX - cityCoordX;
                                        var dy = cityCoordY - viewCoordY;
                                        var distance = Math.sqrt(dx * dx + dy * dy);
                                        var dtext = Math.round(10 * distance) / 10;
                                        var t = qx.lang.String.pad(currentCity.get_Name(),7,"")+"<br>"+dtext;
                                        this.setCaption(t);
                                        
                                        
                                        ctx.clearRect(0, 0, 50, 50);
                                        ctx.save();
                                        ctx.globalAlpha = 0.5;
                                        ctx.fillStyle = '#000';
                                        ctx.fillRect(0, 0, 50, 50); // Mittelpunkt
                                        ctx.globalAlpha = 1.0;
                     
                                        ctx.translate(25, 25);
                                        ctx.rotate(dy > 0 ? Math.asin(dx / distance) : -Math.asin(dx / distance) + Math.PI); 
                                        ctx.beginPath();            
                                        ctx.moveTo(0, 20);            
                                        ctx.lineTo(17, -15);
                                        ctx.lineTo(-17, -15);
                                        ctx.closePath();
                                        ctx.moveTo(0, 0);            
                                        ctx.lineTo(10, -22);
                                        ctx.lineTo(-10, -22);
                                        ctx.closePath();            
                                        
                                        ctx.lineWidth =4.0;                                    
                                        ctx.fillStyle = faction == ClientLib.Base.EFactionType.GDIFaction ? "#00a" : "#a00"; 
                                        ctx.strokeStyle = "#000";
                                    
                                        ctx.fill();
                                        ctx.stroke();
                                        ctx.restore();
                                        //console.log(faction);
                                                                        
                                } else {                                    
                                    this.ec = document.getElementById("compass");
                                    if (this.ec != null){
                                        this.ctx = this.ec.getContext('2d');
                                        console.log("Compass ok");                                                                                                          
                                    } 
                                } 
                            } catch (e) {
                                console.log("displayCompass", e);
                            }
                        }
                    }
                });
                var win = new Compass();
                win.moveTo(140, 30);
                win.open();               
            }
        } catch (e) {
            console.log('createCompass: ', e);
        }
        function CompassCheckLoaded() {
            try {
                if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
                    window.setTimeout(createCompass, 5000);
                    
                } else {
                    window.setTimeout(CompassCheckLoaded, 1000);
                }
            } catch (e) {
                console.log('CompassCheckLoaded: ', e);
            }
        }
        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(CompassCheckLoaded, 5000);
        }
    }
    try {
        var CompassScript = document.createElement('script');
        CompassScript.innerHTML = "(" + CompassMain.toString() + ')();';
        CompassScript.type = 'text/javascript';
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName('head')[0].appendChild(CompassScript);
        }
    } catch (e) {
        console.log('Compass: init error: ', e);
    }
})();










// ==UserScript==
// @name           PluginsLib - mhShortcuts - Tiberium Alliances
// @author         MrHIDEn(game:PEEU)
// @description    Easy login to C&C from https://www.tiberiumalliances.com/login/auth
// @downloadURL    https://userscripts.org/scripts/source/135806.user.js
// @updateURL      https://userscripts.org/scripts/source/135806.meta.js
// @description    Get and plapce coordinates into a message with three useful keyboard shortcuts
// @description    Alt+A - popup window, Alt+S - insert [coords][/coords], 
// @description    Alt+P - popup window, insert [url][/url], 
// @description    Alt+X - magically insert [coords]x:y[/coords]. Earlier you must move  
// @description    your mouse cursor OVER the map "Coordinates".
// @description    Now it also make a sound when captured coordinates.
// @description    Alt+G - Collect all resource bonuses (anyway it will collect every 30sec).
// @description    Alt+I - Insert to message/chat/post all your bases/cities info 
// @description    Alt+B - Repair all.
// @description    Alt+V - Get back to attack (just after unfinished battle) or attack selected base. This do NOT repair.
// @description    Alt+; - EA Simulation.
// @description    Ctrl+SPACE - Get back to attack (just after unfinished battle) or attack selected base. This DO repair.
// @description    Shortcuts Alt+X,A,S for coordinates
// @grant          none 
// @include        http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        1.83
// ==/UserScript==

//** IMPORTANT **//
// For Login/Logout go to:
// http://userscripts.org/scripts/show/137955
// Code has been splited

(function () {
//var injectBody = function ()
function injectBody()
{  

  //TODO for debug purpose only. remove if you do not need.
  var ccl=console.log;var cci=console.info;var ccw=console.warn;var ccd=console.dir; var ccc=console.clear;
  var disable=0;if(disable){var f=function(){};ccl=f;cci=f;ccw=f;ccd=f;ccc=f;}

  var pluginName = "mhShortcuts";
  var created = false;
  //var spaceName = 'PluginsLib.mhShortcuts';
  function CreateClasses() {      
    // Classes
    //=======================================================      
    //Extending webfrontend.gui.options.OptionsPage with new ManagementOptionsPage
    function OptionsPage() {
      try {
        qx.Class.define("PluginsLib.mhOptionsPage", 
        {
          type: 'singleton',
          extend: webfrontend.gui.options.OptionsPage,
          construct: function() {
            console.log('Create PluginsLib.mhOptionsPage at Shortcuts');
            this.base(arguments);
            this.setLabel('PluginsLib');
            
            this.extendOptionsWindow();
            
            //Add Content
            var container = this.getContentContainer();
            this.tabView = new qx.ui.tabview.TabView();
            container.add(this.tabView);//, {left:40, top:40});
            
            this.removeButtons();
            this.addPageAbout();
            console.log('PluginsLib.OptionsPage loaded.'); 
          },
          statics: {
            VERSION: '1.0.0',
            AUTHOR: 'MrHIDEn',
            CLASS: 'OptionsPage'
          },
          members: {
            pageCreated: null,
            tabView: null,
            getTabView: function() {
              return this.tabView;
            },
            addPage: function(name) {
              var c = this.tabView.getChildren();
              this.tabView.remove(c[c.length-1]);//remove PageAbout
              var page = new qx.ui.tabview.Page(name);
              page.set({height:220});
              this.tabView.add(page);
              this.addPageAbout();
              return page;
            },
            addPageAbout: function() {
              var page = new qx.ui.tabview.Page("About");
              page.set({height:220});
              this.tabView.add(page);
              page.setLayout(new qx.ui.layout.VBox());
              page.add(new qx.ui.basic.Label("<b>MHTools</b>").set({rich: true}));//, textColor: red
              page.add(new qx.ui.basic.Label("Created: <span style='color:blue'>2012</span>").set({rich: true,marginLeft:10}));
              page.add(new qx.ui.basic.Label("Author: <span style='color:blue'><b>MrHIDEn</b></span>").set({rich: true,marginLeft:10}));
              page.add(new qx.ui.basic.Label("Email: <a href='mailto:mrhiden@outlook.com'>mrhiden@outlook.com</a>").set({rich: true,marginLeft:10}));
              page.add(new qx.ui.basic.Label("Public: <a href='https://userscripts.org/users/471241'>userscripts.org - MrHIDEn</a></br> ").set({rich: true,marginLeft:10}));
              page.add(new qx.ui.basic.Label("<b>Scripts:</b>").set({rich: true,marginTop:5}));
              page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/137978'>Aviable Loot +Info</a>").set({rich: true,marginLeft:10}));
              page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/135806'>Shortcuts +Coords</a>").set({rich: true,marginLeft:10}));
              page.add(new qx.ui.basic.Label("<b>Shorten Scripts:</b>").set({rich: true,marginTop:5}));
              page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/136743'>Coords 500:500</a>").set({rich: true,marginLeft:10}));
              page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/145657'>Pure Loot summary</a>").set({rich: true,marginLeft:10}));
              page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/137955'>Login x9 + Logout</a>").set({rich: true,marginLeft:10}));
            },
            removeButtons: function() {
              this.getChildren()[2].removeAll();
            },
            getContentContainer: function() {
                if(!this.contentCnt) {
                    this.contentCnt = this.getChildren()[0].getChildren()[0];
                }
                return this.contentCnt;
            },
            extendOptionsWindow: function() {
              var self = this;
              if(!webfrontend.gui.options.OptionsWidget.prototype.baseShow) {
                webfrontend.gui.options.OptionsWidget.prototype.baseShow = webfrontend.gui.options.OptionsWidget.prototype.show;
              }
              webfrontend.gui.options.OptionsWidget.prototype.show = function() {
                try {
                  var tabView = this.clientArea.getChildren()[0];
                  //console.log('B this.clientArea.getChildren()[0]',this.clientArea.getChildren()[0]);
                  tabView.add(self);
                  webfrontend.gui.options.OptionsWidget.prototype.show = webfrontend.gui.options.OptionsWidget.prototype.baseShow;
                  self.pageCreated = true;
                  this.show();
                } catch (e) {            
                  console.warn("PluginsLib.mhOptionsPage.extendOptionsWindow: ", e);
                }
              };
            }
          }
        });
      } catch (e) {
        console.warn("qx.Class.define(PluginsLib.mhOptionsPage: ", e);      
      }
    }
    //=======================================================
    // //Translation
    // qx.locale.Manager.getInstance().addTranslation('pl', {
    // 'Auto collect packages 1/30 sec.': 'Zbierz pakiety automatycznie 1/30 sec',
    // 'First, just move mouse cursor over some map coordinates numbers ex. 666:666': 'Wpierw przesun wskaźnik myszy nad współrzędne np. 666:666',
    // 'Replace coordinates. Ex. 500:500', 'Zamień współrzędne. Ex. 500:500',
    // 'Player: ', 'Gracz: '
    // });
    try {
      qx.Class.define("PluginsLib." + pluginName, //PluginsLib.mhShortcuts PluginsLib.mhShortcuts
      {
        type: "singleton",
        extend: qx.core.Object,
        statics : {
          NAME: 'Shortcuts',
          PLUGIN: 'MH Shortcuts',
          AUTHOR: 'MrHIDEn',
          VERSION: 1.83,
          REQUIRES: '',
          NEEDS: '',
          INFO: 'This script adds keyboard shortcuts to the game and allow you to quick login.',
          WWW: 'http://userscripts.org/scripts/show/135806',
          ONPLUGIN: null,
          ONOPTIONS: null,
          SIZE: 0
        },
        construct: function () {
          this.stats.src = 'http://goo.gl/i6mb1';//1.8.0
          //TODO: check with qooxdoo for better solution
          window.addEventListener("click", this.onClick, false);
          window.addEventListener("keyup", this.onKey, false);
          window.addEventListener("mouseover", this.onMouseOver, false);
          window.setInterval(this.getBonuses, 30000);
          console.log('this.addShortcutsPage();');
          this.addShortcutsPage();
          
          //REGISTER PLUGIN
          //this.constructor.ONPLUGIN = function(){this.constructor.getInstance().open();};
          //this.constructor.ONOPTIONS = function(){this.constructor.getInstance().open();};//test
          PluginsLib.Menu.getInstance().RegisterPlugin(this);
          
          //READY
          console.info("Plugin '"+pluginName+"' LOADED Part 2");
        },
        properties: {
        },
        members: {    
          stats: document.createElement('img'),      
          // setttings
          settings: {
            collectPackages:{v:true,  d:true,  l:'Auto collect packages 1/30 sec.'}
          },
          Coords: 'First, just move mouse cursor over some map coordinates numbers ex. 666:666',
          eaSimulator: function() {
            console.log('eaSimulator');
            try {
              var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
              var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
              ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
              ClientLib.Vis.VisMain.GetInstance().get_Battleground().SimulateBattle();
              var app = qx.core.Init.getApplication();
              app.getPlayArea().setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatReplay, city.get_Id(), 0, 0);
            } catch (e) {
              console.warn("PluginsLib.mhShortcuts.eaSimulator: ", e); 
            }
          },
          GetCaretPosition: function (ctrl) {
            var CaretPos = 0; // IE Support
            if (document.selection) {
              ctrl.focus();
              var Sel = document.selection.createRange();
              Sel.moveStart('character', -ctrl.value.length);
              CaretPos = Sel.text.length;
            }
            // Firefox support
            else if (ctrl.selectionStart || ctrl.selectionStart == '0') CaretPos = ctrl.selectionStart;
            return (CaretPos);
          },
          SetCaretPosition: function (ctrl, pos) {
            if (ctrl.setSelectionRange) {
              ctrl.focus();
              ctrl.setSelectionRange(pos, pos);
            } else if (ctrl.createTextRange) {
              var range = ctrl.createTextRange();
              range.collapse(true);
              range.moveEnd('character', pos);
              range.moveStart('character', pos);
              range.select();
            }
          },
          onKey: function (ev) {
            var s = String.fromCharCode(ev.keyCode);
            var tas = PluginsLib.mhShortcuts.getInstance();// ?=this

            // ALT+
            if (ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.shiftKey) {

              switch (s) {
              case "A":
                // coords by popup window
                var inputField = document.querySelector('input:focus, textarea:focus');
                if (inputField !== null) {
                  this.Coords = prompt('Replace coordinates. Ex. 500:500', "");
                  if (this.Coords !== null) {
                    var position = tas.GetCaretPosition(inputField);
                    var txt = inputField.value;
                    var insert = "[coords]" + this.Coords + "[/coords]";
                    inputField.value = txt.substring(0, position) + insert + txt.substring(position, txt.length);
                    tas.SetCaretPosition(inputField, position + insert.length);
                  }
                }
                break;
              case "X":
                // coords by moving mouse OVER map coordinates
                var inputField = document.querySelector('input:focus, textarea:focus');
                if (inputField != null) {
                  if (this.Coords != null) {
                    var position = tas.GetCaretPosition(inputField);
                    var txt = inputField.value;
                    var insert = "[coords]" + this.Coords + "[/coords]";
                    inputField.value = txt.substring(0, position) + insert + txt.substring(position, txt.length);
                    tas.SetCaretPosition(inputField, position + insert.length);
                  }
                }
                break;
              case "S":
                // coords by inserting [coords][/coords]
                var inputField = document.querySelector('input:focus, textarea:focus');
                if (inputField != null) {
                  var position = tas.GetCaretPosition(inputField);
                  var txt = inputField.value;
                  var insert = "[coords][/coords]";
                  inputField.value = txt.substring(0, position) + insert + txt.substring(position, txt.length);
                  tas.SetCaretPosition(inputField, position + ("[coords]").length);
                }
                break;
              case "I":
                // player bases info to share with others
                var serverName = ClientLib.Data.MainData.GetInstance().get_Server().get_Name();
                var inputField = document.querySelector('input:focus, textarea:focus');
                if (inputField != null) {
                  var apc = ClientLib.Data.MainData.GetInstance().get_Cities();//all player cities
                  var PlayerName = apc.get_CurrentOwnCity().get_PlayerName();
                  var txt = 'Player: ' + PlayerName + "\r\n";//----------------------------------\r\n";
                  var apcl = apc.get_AllCities().d;//all player cities list
                  for (var key in apcl) {
                    var c = apcl[key];
                    try {
                      var sd = c.get_SupportData();
                      var sn = '--';
                      var sl = '--';
                      if(sd !== null) {
                        sl = sd.get_Level().toString();
                        sn = c.get_SupportWeapon().dn; 
                      }                      
                      txt += "[b]" + c.get_Name() + "[/b]_________________________\r\n"; //m_Level
                      txt += "[u]Off: " + c.get_LvlOffense().toFixed(1).toString() + "[/u]  " + //"\r\n" +
                             "Def: " + c.get_LvlDefense().toFixed(1).toString() + "  " + "__" + //"\r\n" +
                             "Bas: " + c.get_LvlBase().toFixed(1).toString()    + "  " + //"\r\n" +
                             "[i]Sup: " + sl + " - " + sn + "[/i]\r\n";
                      //txt += "Distance to center: " + Math.round(ClientLib.Base.Util.CalculateDistance(ClientLib.Data.MainData.GetInstance().get_Server().get_ContinentWidth() / 2, ClientLib.Data.MainData.GetInstance().get_Server().get_ContinentHeight() / 2, c.get_PosX(), c.get_PosY())) + "\r\n";
                      //txt += "[coords]" + c.get_PosX() + ":" + c.get_PosY() + "[/coords]\r\n";
                    } catch (e) {
                      console.warn("PluginsLib.mhShortcuts.INFO exception: ", e); 
                    }
                    //txt += "----------------------------------\r\n";
                  }
                  inputField.value += txt;
                }
                break;
              case "G":
                // Collect all resources at once manualy
                // log("G");
                // why this. does not work here. Do you know?
                this.PluginsLib.mhShortcuts.getInstance().getBonuses();
                //this.getBonuses();
                break;
              case "B":
                // Repair all armies
                this.PluginsLib.mhShortcuts.getInstance().repairAllArmies();
                //this.repairAllArmies();
                break;
              case "V":
                // Go back to fight without repair
                this.PluginsLib.mhShortcuts.getInstance().goBackToFight();
                break;
              case "L":
              case ";":
                console.log('eaSim key:',s);
                this.PluginsLib.mhShortcuts.getInstance().eaSimulator();
                //this.eaSimulator();
                break;
              case "P":
                // URL by popup window
                var inputField = document.querySelector('input:focus, textarea:focus');
                if (inputField != null) {
                  this.Coords = prompt("Enter URL", "");
                  if (Coords != null) {
                    var position = tas.GetCaretPosition(inputField);
                    var txt = inputField.value;
                    var insert = "[url]" + this.Coords + "[/url]";
                    inputField.value = txt.substring(0, position) + insert + txt.substring(position, txt.length);
                    tas.SetCaretPosition(inputField, position + insert.length);
                  }
                }
                break;
              default:
                // Other letters
                //log("Other letter (" + s + ")");
                break;
              }
            } // CTRL+
            else if (!ev.altKey && ev.ctrlKey && !ev.shiftKey && !ev.altGraphKey) {              
              switch (s) {
              case " ":
                // Repair current army and go back to fight
                this.PluginsLib.mhShortcuts.getInstance().repairArmyAndBack();
                break;
              default:
                // Other letters
                //log("Other letter (" + s + ")");
              }
            }
          },
          onMouseOver: function (ev) {
            //log("onMouseOver");                        
            var tag = ev.target.tagName;
            if (tag == "B" || tag == "DIV" || tag == "A") {
              var s = ev.target.textContent;
              var semicolon = s.indexOf(":");
              if (semicolon > 0) {
                var n1 = s.substring(0, semicolon);
                var n2 = s.substring(semicolon + 1, s.length);
                if (isFinite(n1) && isFinite(n2)) {
                  if(s.length==5 && s[0]=="0") return;
                  this.Coords = s;
                  //ClientLib.Vis.VisMain.GetInstance().PlayUISound('sounds/Buttonclick');
                  ClientLib.Vis.VisMain.GetInstance().PlayUISound('sounds/CollectTiberium');
                }
              }
            }
          },
          //window.setInterval(this.getBonuses, 30000);
          getBonuses: function () {
            try {
              if(!PluginsLib.mhShortcuts) return;
              if(!PluginsLib.mhShortcuts.getInstance().settings['collectPackages'].v) return;
              
              var apc = ClientLib.Data.MainData.GetInstance().get_Cities();
              var apcl = apc.get_AllCities().d;
              var ps = false;
              for (var key in apcl) {
                apcl[key].CollectAllResources();
                
                // EA There is no API for this function. It is on API list but it is obfusticated.
                
                //ps |= apcl[key].get_CanCollectResources();
              }
              if(ps) {
                ClientLib.Vis.VisMain.GetInstance().PlayUISound('sounds/CollectCrystal');
              }
            } catch (e) {
              console.warn("PluginsLib.mhShortcuts.getBonuses: ", e); 
            }
          },//button Alt+V
          goBackToFight: function () {
            // GET BACK TO FIGTH == ATTACK
            try {    // NOTICE Under construction
              var pc = ClientLib.Data.MainData.GetInstance().get_Cities();//player cities
              var oci = pc.get_CurrentOwnCityId();
              var tci = pc.get_CurrentCityId();  
              if (oci > 0 && tci > 0 && oci != tci) {// add timer
                var tc = pc.get_CurrentCity();         
                if( tc.get_PosX() > 0 && tc.get_PosY() > 0) {
                  webfrontend.gui.UtilView.openVisModeInMainWindow(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense, tci, false);
                  ClientLib.Vis.VisMain.GetInstance().PlayUISound('sounds/Buttonclick');
                }
              }                           
            } catch (e) {
              console.warn("PluginsLib.mhShortcuts.goBackToFight: ", e);
            }
          },
          //button Alt+B
          repairAllArmies: function () {
            //console.log('repairAllArmies');
            // REPAIR ALL OWN ARMIES
            try {    // NOTICE Under construction
              //var pc = ClientLib.Data.MainData.GetInstance().get_Cities();//player cities
              var cx = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
              console.log('cx',cx);
              for(var key in cx) {
                var oc = cx[key];
                console.log('key',key);
                oc.RepairAllOffense();
              }                   
              ClientLib.Vis.VisMain.GetInstance().PlayVoiceSound("FactionUI/sounds/Repairing");         
            } catch (e) {
              console.warn("PluginsLib.mhShortcuts.repairAllArmies: ", e);
            }
          },
          //button Ctrl+SPACE
          repairArmyAndBack: function () {
            // REPAIR CURRENT ARMY AND GET BACK TO FIGTH
            try {    // NOTICE Under construction
              var pc = ClientLib.Data.MainData.GetInstance().get_Cities();//player cities
              var oci = pc.get_CurrentOwnCityId();//own city                
              if (oci > 0 ) {
                //var c = pc.GetCity(oci);//works, it could be useful with JSON + storage
                var oc = pc.get_CurrentOwnCity();
                if(oc.CanRepairAllOffense()) {
                  oc.RepairAllOffense();
                  ClientLib.Vis.VisMain.GetInstance().PlayVoiceSound("FactionUI/sounds/Repairing");
                }
                var tci = pc.get_CurrentCityId();//target city -1 non selected, tci=oci you are in your base, tci>0 you are watching on other base
                if (tci > 0 && oci != tci) {// add timer           
                  var tc = pc.get_CurrentCity();         
                  if( tc.get_PosX() > 0 && tc.get_PosY() > 0) {
                    webfrontend.gui.UtilView.openVisModeInMainWindow(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense, tci, false);
                  }
                }  
              }                            
            } catch (e) {
              console.warn("PluginsLib.mhShortcuts.repairArmyAndBack: ", e);
            }
          },
          // NOTE
          /*
          //#use(qx.event.handler.Keyboard)
          var find = new qx.ui.core.Command("Alt+L");
          find.addListener("execute", _onFind, this);
          function _onFind() {  console.log('Find');}
          */
          
          // OPTIONS
          optionsTab: null,
          optionsPage: null,
          btnApply: null,
          //rebuild with new approach
          optionsStoreName: 'mhShortcutsOptions',
          addShortcutsPage: function() {            
            console.log('addShortcutsPage');
            try {
              if(!PluginsLib.mhOptionsPage) OptionsPage();
              
              if(!this.optionsTab) {
                //Create Tab
                this.optionsTab = PluginsLib.mhOptionsPage.getInstance();
              }       
          //console.log('this.optionsTab',this.optionsTab);
              this.optionsPage = this.optionsTab.addPage("Shortcuts");
              this.optionsPage.setLayout(new qx.ui.layout.VBox());
              this.optionsPage.add(new qx.ui.basic.Label("<b>Options:</b></br>").set({rich: true}));//, textColor: red
              this.settings['collectPackages'].obj = new qx.ui.form.CheckBox(this.settings['collectPackages'].l).set({
                value: this.settings['collectPackages'].v,
                marginLeft: 10
              });
              this.settings['collectPackages'].obj.addListener("execute", this.optionsChanged, this);

              this.optionsPage.add(this.settings['collectPackages'].obj);//, {row:1+i++, column:3}); 
              
              this.loadOptions();
              this.addButtons();              
            } catch (e) {
              console.warn("PluginsLib.mhShortcuts.addShortcutsPage: ", e);
            }
          },
          optionsChanged: function() {
            var c = false;
            for(var k in this.settings) {
              c = c || (this.settings[k].v != this.settings[k].obj.getValue());
            }
            this.btnApply.setEnabled(c);
          },
          addButtons: function() {
            try {
              this.btnApply = new qx.ui.form.Button("Apply");
              this.btnApply.set({ width:150, height:30, toolTipText: "Apply changes.", allowGrowX:false, enabled:false});//, marginTop:20});
              
              var c = new qx.ui.container.Composite(new qx.ui.layout.HBox(0,'right'));
              c.setMarginTop(20);
              c.add(this.btnApply);
              this.optionsPage.add(c);
              
              this.btnApply.addListener("execute", this.applyOptions, this); 
              this.btnApply.setEnabled(false);
            } catch (e) {
              console.warn("PluginsLib.mhShortcuts.addButtons: ", e);
            }
          },
          applyOptions: function(e) {
            //console.log("applyOptions e:",e);
            this.saveOptions();
            this.btnApply.setEnabled(false); 
          },
          saveOptions: function() {   
            //PluginsLib.mhShortcuts.getInstance().settings['collectPackages'].obj.basename == "CheckBox"
            var c = {};
            var i = 0;
            for(var k in this.settings) {
              c[k] = this.settings[k].obj.getValue();
              this.settings[k].v = c[k];
            }
            var S = ClientLib.Base.LocalStorage;
            if (S.get_IsSupported()) S.SetItem(this.optionsStoreName, c);
          },
          loadOptions: function() {
            try {
              var c = {};            
              var S = ClientLib.Base.LocalStorage;
              if (S.get_IsSupported()) c = S.GetItem(this.optionsStoreName);
              //console.log('loadOptions c:',c);
              if(c===null) c = {};
              var i = 0;              
              for(var k in this.settings) {
                if(typeof(c[k])!='undefined') {
                  this.settings[k].obj.setValue(c[k]);
                  this.settings[k].v = c[k];
                } else {
                  this.settings[k].obj.setValue(this.settings[k].d);
                  this.settings[k].v = this.settings[k].d;
                }
              }             
            } catch (e) {
                console.warn("PluginsLib.mhShortcuts.loadOptions: ", e);
            }
          }
        } // members
      });          
    } catch (e) {
      console.warn("qx.Class.define(PluginsLib.mhShortcuts: ", e);      
    }
    //=======================================================
    // START
    PluginsLib.mhShortcuts.getInstance();
  }//CreateClasses()
  // Loading
  function WaitForGame() {
    try
    {
      if (typeof(qx) != 'undefined' && typeof(qx.core) != 'undefined' && typeof(qx.core.Init) != 'undefined')
      {
        var app = qx.core.Init.getApplication();
        if (app.initDone===true)
        {
          if(!created) CreateClasses();
          
          var plugin = PluginsLib[pluginName];
          var ready = true;
          if(plugin.REQUIRES.length > 0) {
            var req = plugin.REQUIRES.split(',');
            //check all requires
            for(var i in req) {
              //cci(req[i]);
              if(typeof(PluginsLib[req[i]])=='undefined') {
                console.log(pluginName,'.WaitForGame.REQUIRES ',req[i],typeof(PluginsLib[req[i]]));
                ready = false;
                break;//WAIT
              }
            }
          }
          if(ready) {
            plugin.getInstance();
            plugin.SIZE = scriptSize;
            console.info("Plugin '"+plugin.getInstance().basename+"' READY");
            return;//DONE
          }
        }
      }
    } catch (e) {
      console.error('PluginsLib.'+pluginName,'.WaitForGame: ', e);
    }
    window.setTimeout(WaitForGame, 2000);
  }
  window.setTimeout(WaitForGame, 2000);
}

// Injecting
function Inject() {
  if (window.location.pathname != "/login/auth") {
    var script = document.createElement('script');
    var txt = injectBody.toString();
    txt = txt.replace('{','{\r\n  var scriptSize='+(txt.length+22).toString()+';');
    script.innerHTML = '(' + txt + ')();';
    script.type = 'text/javascript';
    document.head.appendChild(script);
  }
}    
Inject();
})();










// ==UserScript==
// @name            WarChiefs - Tiberium Alliances Upgrade Base/Defense/Army
// @description     Upgrade your Base,Defense Army to a specific Level.
// @author          Eistee
// @version         13.10.30
// @namespace       http*://*.alliances.commandandconquer.com/*
// @include         http*://*.alliances.commandandconquer.com/*
// @require         http://usocheckup.redirectme.net/167564.js
// @icon            http://s3.amazonaws.com/uso_ss/icon/167564/large.png
// @updateURL       https://userscripts.org/scripts/source/167564.meta.js
// @downloadURL     https://userscripts.org/scripts/source/167564.user.js
// @grant           GM_getValue
// @grant           GM_log
// @grant           GM_openInTab
// @grant           GM_registerMenuCommand
// @grant           GM_setValue
// @grant           GM_xmlhttpRequest
// ==/UserScript==
/**
 *  License: CC-BY-NC-SA 3.0
 *
 *  thx to TheStriker for his API knowledge.
 *
 */
(function () {
    var injectFunction = function () {
        function createClasses() {
            qx.Class.define("Upgrade", {
                type: "singleton",
                extend: qx.core.Object,
                construct: function () {
                    try {
                        var qxApp = qx.core.Init.getApplication();

                        var stats = document.createElement('img')
                        stats.src = "http://goo.gl/BuvwKs"; // http://goo.gl/#analytics/goo.gl/BuvwKs/all_time

                        var btnUpgrade = new qx.ui.form.Button(qxApp.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png").set({
                            toolTipText: qxApp.tr("tnf:toggle upgrade mode"),
                            alignY: "middle",
                            show: "icon",
                            width : 60,
                            allowGrowX : false,
                            allowGrowY : false,
                            appearance : "button"
                        });
                        btnUpgrade.addListener("click", this.toggleWindow, this);

                        var btnTrade = qx.core.Init.getApplication().getPlayArea().getHUD().getUIItem(ClientLib.Data.Missions.PATH.WDG_TRADE);
                        btnTrade.getLayoutParent().addAfter(btnUpgrade, btnTrade);
                    } catch (e) {
                        console.log("Error setting up Upgrade Constructor: ");
                        console.log(e.toString());
                    }
                },
                destruct: function () {},
                members: {
                    toggleWindow: function () {
                        if (Upgrade.Window.getInstance().isVisible()) Upgrade.Window.getInstance().close();
                        else Upgrade.Window.getInstance().open();
                    }
                }
            });
            qx.Class.define("Upgrade.Window", {
                type: "singleton",
                extend: qx.ui.window.Window,
                construct: function () {
                    try {
                        this.base(arguments);
                        this.set({
                            layout: new qx.ui.layout.VBox().set({ spacing: 0 }),
                            contentPadding: 5,
                            contentPaddingTop: 0,
                            allowMaximize: false,
                            showMaximize: false,
                            allowMinimize: false,
                            showMinimize: false,
                            resizable: false
                        });
                        this.moveTo(124, 31);
                        this.getChildControl("icon").set({ width : 18, height : 18, scale : true, alignY : "middle" });

                        this.add(new Upgrade.Current());
                        this.add(new Upgrade.All());
                        this.add(new Upgrade.Repairtime());

                        this.addListener("appear", this.onOpen, this);
                        this.addListener("close", this.onClose, this);
                    } catch (e) {
                        console.log("Error setting up Upgrade.Window Constructor: ");
                        console.log(e.toString());
                    }
                },
                destruct: function () {},
                members: {
                    onOpen: function () {
                        phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this.onViewModeChanged);
                        this.onViewModeChanged(null, ClientLib.Vis.VisMain.GetInstance().get_Mode());
                    },
                    onClose: function () {
                        phe.cnc.Util.detachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this.onViewModeChanged);
                    },
                    onViewModeChanged: function (oldMode, newMode) {
                        if (oldMode !== newMode) {
                            var qxApp = qx.core.Init.getApplication();
                            switch (newMode) {
                            case ClientLib.Vis.Mode.City:
                                this.setCaption(qxApp.tr("tnf:toggle upgrade mode") + ": " + qxApp.tr("tnf:base"));
                                this.setIcon("FactionUI/icons/icon_arsnl_base_buildings.png");
                                break;
                            case ClientLib.Vis.Mode.DefenseSetup:
                                this.setCaption(qxApp.tr("tnf:toggle upgrade mode") + ": " + qxApp.tr("tnf:defense"));
                                this.setIcon("FactionUI/icons/icon_def_army_points.png");
                                break;
                            case ClientLib.Vis.Mode.ArmySetup:
                                this.setCaption(qxApp.tr("tnf:toggle upgrade mode") + ": " + qxApp.tr("tnf:offense"));
                                this.setIcon("FactionUI/icons/icon_army_points.png");
                                break;
                            default:
                                this.close();
                                break;
                            }
                        }
                    },
                }
            });
            qx.Class.define("Upgrade.All", {
                extend: qx.ui.container.Composite,
                construct: function () {
                    try {
                        qx.ui.container.Composite.call(this);
                        this.set({
                            layout : new qx.ui.layout.VBox(5),
                            padding: 5,
                            decorator: "pane-light-opaque"
                        });
                        this.add(this.title = new qx.ui.basic.Label("").set({ alignX: "center", font: "font_size_14_bold" }));

                        var level = new qx.ui.container.Composite(new qx.ui.layout.HBox(5))
                        level.add(new qx.ui.basic.Label(this.tr("tnf:level:")).set({ alignY: "middle" }));
                        level.add(this.txtLevel = new qx.ui.form.Spinner(1).set({ maximum: 150, minimum: 1 }));
                        this.txtLevel.addListener("changeValue", this.onInput, this);
                        level.add(this.btnLevel = new qx.ui.form.Button(this.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png"));
                        this.btnLevel.addListener("execute", this.onUpgrade, this);
                        this.add(level);

                        var requires = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                        requires.add(new qx.ui.basic.Label(this.tr("tnf:requires:")));
                        var resource = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
                        resource.add(this.resTiberium = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_tiberium.png"));
                        this.resTiberium.setToolTipIcon("webfrontend/ui/common/icn_res_tiberium.png");
                        this.resTiberium.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
                        resource.add(this.resChrystal = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_chrystal.png"));
                        this.resChrystal.setToolTipIcon("webfrontend/ui/common/icn_res_chrystal.png");
                        this.resChrystal.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
                        resource.add(this.resPower = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_power.png"));
                        this.resPower.setToolTipIcon("webfrontend/ui/common/icn_res_power.png");
                        this.resPower.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
                        requires.add(resource);
                        this.add(requires);

                        this.addListener("appear", this.onAppear, this);
                        this.addListener("disappear", this.onDisappear, this);
                    } catch (e) {
                        console.log("Error setting up Upgrade.All Constructor: ");
                        console.log(e.toString());
                    }
                },
                destruct: function () {},
                members: {
                    title: null,
                    txtLevel: null,
                    btnLevel: null,
                    resTiberium: null,
                    resChrystal: null,
                    resPower: null,
                    onAppear: function () {
                        phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this.onViewModeChanged);
                        phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.onCurrentCityChange);
                        phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentChange", ClientLib.Data.CurrentCityChange, this, this.onCurrentCityChange);
                        phe.cnc.base.Timer.getInstance().addListener("uiTick", this.onTick, this);
                        this.onViewModeChanged(null, ClientLib.Vis.VisMain.GetInstance().get_Mode());
                    },
                    onDisappear: function () {
                        phe.cnc.Util.detachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this.onViewModeChanged);
                        phe.cnc.Util.detachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.onCurrentCityChange);
                        phe.cnc.Util.detachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentChange", ClientLib.Data.CurrentCityChange, this, this.onCurrentCityChange);
                        phe.cnc.base.Timer.getInstance().removeListener("uiTick", this.onTick, this);
                    },
                    onViewModeChanged: function (oldViewMode, newViewMode) {
                        if (oldViewMode !== newViewMode) {
                            switch (newViewMode) {
                            case ClientLib.Vis.Mode.City:
                                this.title.setValue(this.tr("All buildings"));
                                this.reset();
                                break;
                            case ClientLib.Vis.Mode.DefenseSetup:
                                this.title.setValue(this.tr("All defense units"));
                                this.reset();
                                break;
                            case ClientLib.Vis.Mode.ArmySetup:
                                this.title.setValue(this.tr("All army units"));
                                this.reset();
                                break;
                            }
                        }
                    },
                    onCurrentCityChange: function (oldCurrentCity, newCurrentCity) {
                        if (oldCurrentCity !== newCurrentCity) {
                            this.reset();
                        }
                    },
                    getResTime: function (need, type) {
                        var CurrentOwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                        var Alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                        need -= CurrentOwnCity.GetResourceCount(type);
                        need = Math.max(0, need);
                        var Con = CurrentOwnCity.GetResourceGrowPerHour(type);
                        var Bonus = CurrentOwnCity.get_hasCooldown() ? 0 : CurrentOwnCity.GetResourceBonusGrowPerHour(type);
                        var POI = CurrentOwnCity.get_IsGhostMode() ? 0 : Alliance.GetPOIBonusFromResourceType(type);
                        return (need <= 0 ? 0 : need / (Con + Bonus + POI) * 3600);
                    },
                    getUpgradeCostsToLevel: function (newLevel) {
                        if (newLevel > 0) {
                            switch (ClientLib.Vis.VisMain.GetInstance().get_Mode()) {
                            case ClientLib.Vis.Mode.City:
                                return ClientLib.API.City.GetInstance().GetUpgradeCostsForAllBuildingsToLevel(newLevel);
                            case ClientLib.Vis.Mode.DefenseSetup:
                                return ClientLib.API.Defense.GetInstance().GetUpgradeCostsForAllUnitsToLevel(newLevel);
                            case ClientLib.Vis.Mode.ArmySetup:
                                return ClientLib.API.Army.GetInstance().GetUpgradeCostsForAllUnitsToLevel(newLevel);
                            }
                        }
                        return null;
                    },
                    getLowLevel: function () {
                        for (var newLevel = 1, Tib = 0, Cry = 0, Pow = 0; Tib === 0 && Cry === 0 && Pow === 0 && newLevel < 1000; newLevel++) {
                            var costs = this.getUpgradeCostsToLevel(newLevel);
                            if (costs !== null) {
                                for (var i = 0; i < costs.length; i++) {
                                    var uCosts = costs[i];
                                    var cType = parseInt(uCosts.Type, 10);
                                    switch (cType) {
                                    case ClientLib.Base.EResourceType.Tiberium:
                                        Tib += uCosts.Count;
                                        break;
                                    case ClientLib.Base.EResourceType.Crystal:
                                        Cry += uCosts.Count;
                                        break;
                                    case ClientLib.Base.EResourceType.Power:
                                        Pow += uCosts.Count;
                                        break;
                                    }
                                }
                            }
                        }
                        return (newLevel === 1000?0:(newLevel - 1));
                    },
                    reset: function () {
                        var LowLevel = this.getLowLevel();
                        if (LowLevel > 0) {
                            this.txtLevel.setMinimum(LowLevel);
                            this.txtLevel.setMaximum(LowLevel + 50);
                            this.txtLevel.setValue(LowLevel);
                            this.txtLevel.setEnabled(true);
                            this.btnLevel.setEnabled(true);
                        } else {
                            this.txtLevel.setMinimum(0);
                            this.txtLevel.setMaximum(0);
                            this.txtLevel.resetValue();
                            this.txtLevel.setEnabled(false);
                            this.btnLevel.setEnabled(false);
                        }
                        this.onInput();
                    },
                    onTick: function () {
                        this.onInput();
                    },
                    onInput: function () {
                        var newLevel = parseInt(this.txtLevel.getValue(), 10);
                        var costs = this.getUpgradeCostsToLevel(newLevel);
                        if (newLevel > 0 && costs !== null) {
                            for (var i = 0, Tib = 0, Cry = 0, Pow = 0, TibTime = 0, CryTime = 0, PowTime = 0; i < costs.length; i++) {
                                var uCosts = costs[i];
                                switch (parseInt(uCosts.Type, 10)) {
                                case ClientLib.Base.EResourceType.Tiberium:
                                    Tib += uCosts.Count;
                                    TibTime += this.getResTime(uCosts.Count, ClientLib.Base.EResourceType.Tiberium);
                                    break;
                                case ClientLib.Base.EResourceType.Crystal:
                                    Cry += uCosts.Count;
                                    CryTime += this.getResTime(uCosts.Count, ClientLib.Base.EResourceType.Crystal);
                                    break;
                                case ClientLib.Base.EResourceType.Power:
                                    Pow += uCosts.Count;
                                    PowTime += this.getResTime(uCosts.Count, ClientLib.Base.EResourceType.Power);
                                    break;
                                }
                            }
                            this.resTiberium.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Tib) + (TibTime > 0 ? " @ " + phe.cnc.Util.getTimespanString(TibTime) : ""));
                            this.resTiberium.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Tib));
                            if (Tib === 0) this.resTiberium.exclude();
                            else this.resTiberium.show();
                            this.resChrystal.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Cry) + (CryTime > 0 ? " @ " + phe.cnc.Util.getTimespanString(CryTime) : ""));
                            this.resChrystal.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Cry));
                            if (Cry === 0) this.resChrystal.exclude();
                            else this.resChrystal.show();
                            this.resPower.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Pow) + (PowTime > 0 ? " @ " + phe.cnc.Util.getTimespanString(PowTime) : ""));
                            this.resPower.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Pow));
                            if (Pow === 0) this.resPower.exclude();
                            else this.resPower.show();
                        } else {
                            this.resTiberium.setLabel("-");
                            this.resTiberium.resetToolTipText();
                            this.resTiberium.show();
                            this.resChrystal.setLabel("-");
                            this.resChrystal.resetToolTipText();
                            this.resChrystal.show();
                            this.resPower.setLabel("-");
                            this.resPower.resetToolTipText();
                            this.resPower.show();
                        }
                    },
                    onUpgrade: function () {
                        var newLevel = parseInt(this.txtLevel.getValue(), 10);
                        if (newLevel > 0) {
                            switch (ClientLib.Vis.VisMain.GetInstance().get_Mode()) {
                            case ClientLib.Vis.Mode.City:
                                ClientLib.API.City.GetInstance().UpgradeAllBuildingsToLevel(newLevel);
                                this.reset()
                                break;
                            case ClientLib.Vis.Mode.DefenseSetup:
                                ClientLib.API.Defense.GetInstance().UpgradeAllUnitsToLevel(newLevel);
                                this.reset()
                                break;
                            case ClientLib.Vis.Mode.ArmySetup:
                                ClientLib.API.Army.GetInstance().UpgradeAllUnitsToLevel(newLevel);
                                this.reset()
                                break;
                            }
                        }
                    }
                }
            });
            qx.Class.define("Upgrade.Current", {
                extend: qx.ui.container.Composite,
                construct: function () {
                    try {
                        qx.ui.container.Composite.call(this);
                        this.set({
                            layout : new qx.ui.layout.VBox(5),
                            padding: 5,
                            decorator: "pane-light-opaque"
                        });
                        this.add(this.title = new qx.ui.basic.Label("").set({ alignX: "center", font: "font_size_14_bold" }));
                        this.add(this.txtSelected = new qx.ui.basic.Label("").set({ alignX: "center" }));

                        var level = new qx.ui.container.Composite(new qx.ui.layout.HBox(5))
                        level.add(new qx.ui.basic.Label(this.tr("tnf:level:")).set({ alignY: "middle" }));
                        level.add(this.txtLevel = new qx.ui.form.Spinner(1).set({ maximum: 150, minimum: 1 }));
                        this.txtLevel.addListener("changeValue", this.onInput, this);
                        level.add(this.btnLevel = new qx.ui.form.Button(this.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png"));
                        this.btnLevel.addListener("execute", this.onUpgrade, this);
                        this.add(level);

                        var requires = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                        requires.add(new qx.ui.basic.Label(this.tr("tnf:requires:")));
                        var resource = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
                        resource.add(this.resTiberium = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_tiberium.png"));
                        this.resTiberium.setToolTipIcon("webfrontend/ui/common/icn_res_tiberium.png");
                        this.resTiberium.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
                        resource.add(this.resChrystal = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_chrystal.png"));
                        this.resChrystal.setToolTipIcon("webfrontend/ui/common/icn_res_chrystal.png");
                        this.resChrystal.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
                        resource.add(this.resPower = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_power.png"));
                        this.resPower.setToolTipIcon("webfrontend/ui/common/icn_res_power.png");
                        this.resPower.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
                        requires.add(resource);
                        this.add(requires);

                        this.addListener("appear", this.onAppear, this);
                        this.addListener("disappear", this.onDisappear, this);
                    } catch (e) {
                        console.log("Error setting up Upgrade.Current Constructor: ");
                        console.log(e.toString());
                    }
                },
                destruct: function () {},
                members: {
                    title: null,
                    txtSelected: null,
                    txtLevel: null,
                    btnLevel: null,
                    resTiberium: null,
                    resChrystal: null,
                    resPower: null,
                    Selection: null,
                    onAppear: function () {
                        phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this.onViewModeChanged);
                        phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange);
                        phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.onCurrentCityChange);
                        phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentChange", ClientLib.Data.CurrentCityChange, this, this.onCurrentCityChange);
                        phe.cnc.base.Timer.getInstance().addListener("uiTick", this.onTick, this);
                        this.onViewModeChanged(null, ClientLib.Vis.VisMain.GetInstance().get_Mode());
                    },
                    onDisappear: function () {
                        phe.cnc.Util.detachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this.onViewModeChanged);
                        phe.cnc.Util.detachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange);
                        phe.cnc.Util.detachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.onCurrentCityChange);
                        phe.cnc.Util.detachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentChange", ClientLib.Data.CurrentCityChange, this, this.onCurrentCityChange);
                        phe.cnc.base.Timer.getInstance().removeListener("uiTick", this.onTick, this);
                    },
                    onViewModeChanged: function (oldViewMode, newViewMode) {
                        if (oldViewMode !== newViewMode) {
                            switch (newViewMode) {
                            case ClientLib.Vis.Mode.City:
                                this.title.setValue(this.tr("Selected building"));
                                this.reset();
                                break;
                            case ClientLib.Vis.Mode.DefenseSetup:
                                this.title.setValue(this.tr("Selected defense unit"));
                                this.reset();
                                break;
                            case ClientLib.Vis.Mode.ArmySetup:
                                this.title.setValue(this.tr("Selected army unit"));
                                this.reset();
                                break;
                            }
                        }
                    },
                    onSelectionChange: function (oldSelection, newSelection) {
                        if (newSelection != null) {
                            switch (newSelection.get_VisObjectType()) {
                            case ClientLib.Vis.VisObject.EObjectType.CityBuildingType:
                                this.Selection = newSelection;
                                var name = newSelection.get_BuildingName();
                                var level = newSelection.get_BuildingLevel();
                                this.txtSelected.setValue(name + " (" + level + ")");
                                this.txtLevel.setMinimum(level + 1);
                                this.txtLevel.setMaximum(level + 51);
                                this.txtLevel.setValue(level + 1);
                                this.txtLevel.setEnabled(true);
                                this.btnLevel.setEnabled(true);
                                this.onInput();
                                break;
                            case ClientLib.Vis.VisObject.EObjectType.DefenseUnitType:
                            case ClientLib.Vis.VisObject.EObjectType.ArmyUnitType:
                                this.Selection = newSelection;
                                var name = newSelection.get_UnitName();
                                var level = newSelection.get_UnitLevel();
                                this.txtSelected.setValue(name + " (" + level + ")");
                                this.txtLevel.setMinimum(level + 1);
                                this.txtLevel.setMaximum(level + 51);
                                this.txtLevel.setValue(level + 1);
                                this.txtLevel.setEnabled(true);
                                this.btnLevel.setEnabled(true);
                                this.onInput();
                                break;
                            }
                        }
                    },
                    onCurrentCityChange: function (oldCurrentCity, newCurrentCity) {
                        if (oldCurrentCity !== newCurrentCity) {
                            this.reset();
                        }
                    },
                    getResTime: function (need, type) {
                        var CurrentOwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                        var Alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                        need -= CurrentOwnCity.GetResourceCount(type);
                        need = Math.max(0, need);
                        var Con = CurrentOwnCity.GetResourceGrowPerHour(type);
                        var Bonus = CurrentOwnCity.get_hasCooldown() ? 0 : CurrentOwnCity.GetResourceBonusGrowPerHour(type);
                        var POI = CurrentOwnCity.get_IsGhostMode() ? 0 : Alliance.GetPOIBonusFromResourceType(type);
                        return (need <= 0 ? 0 : need / (Con + Bonus + POI) * 3600);
                    },
                    getUpgradeCostsToLevel: function (unit, newLevel) {
                        var costs = null;
                        if (unit !== null && newLevel > 0) {
                            switch (unit.get_VisObjectType()) {
                            case ClientLib.Vis.VisObject.EObjectType.CityBuildingType:
                                if (newLevel > unit.get_BuildingLevel())
                                    costs = ClientLib.API.City.GetInstance().GetUpgradeCostsForBuildingToLevel(unit.get_BuildingDetails(), newLevel);
                                break;
                            case ClientLib.Vis.VisObject.EObjectType.DefenseUnitType:
                                if (newLevel > unit.get_UnitLevel())
                                    costs = ClientLib.API.Defense.GetInstance().GetUpgradeCostsForUnitToLevel(unit.get_UnitDetails(), newLevel);
                                break;
                            case ClientLib.Vis.VisObject.EObjectType.ArmyUnitType:
                                if (newLevel > unit.get_UnitLevel())
                                    costs = ClientLib.API.Army.GetInstance().GetUpgradeCostsForUnitToLevel(unit.get_UnitDetails(), newLevel);
                                break;
                            }
                        }
                        return costs;
                    },
                    reset: function () {
                        this.Selection = null;
                        this.txtSelected.setValue("-");
                        this.txtLevel.setMinimum(0);
                        this.txtLevel.setMaximum(0);
                        this.txtLevel.resetValue();
                        this.txtLevel.setEnabled(false);
                        this.btnLevel.setEnabled(false);
                        this.onInput();
                    },
                    onTick: function () {
                        this.onInput();
                    },
                    onInput: function () {
                        var costs = this.getUpgradeCostsToLevel(this.Selection, parseInt(this.txtLevel.getValue(), 10));
                        if (costs !== null) {
                            for (var i = 0, Tib = 0, Cry = 0, Pow = 0, TibTime = 0, CryTime = 0, PowTime = 0; i < costs.length; i++) {
                                var uCosts = costs[i];
                                switch (parseInt(uCosts.Type, 10)) {
                                case ClientLib.Base.EResourceType.Tiberium:
                                    Tib += uCosts.Count;
                                    TibTime += this.getResTime(uCosts.Count, ClientLib.Base.EResourceType.Tiberium);
                                    break;
                                case ClientLib.Base.EResourceType.Crystal:
                                    Cry += uCosts.Count;
                                    CryTime += this.getResTime(uCosts.Count, ClientLib.Base.EResourceType.Crystal);
                                    break;
                                case ClientLib.Base.EResourceType.Power:
                                    Pow += uCosts.Count;
                                    PowTime += this.getResTime(uCosts.Count, ClientLib.Base.EResourceType.Power);
                                    break;
                                }
                            }
                            this.resTiberium.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Tib) + (TibTime > 0 ? " @ " + phe.cnc.Util.getTimespanString(TibTime) : ""));
                            this.resTiberium.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Tib));
                            if (Tib === 0) this.resTiberium.exclude();
                            else this.resTiberium.show();
                            this.resChrystal.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Cry) + (CryTime > 0 ? " @ " + phe.cnc.Util.getTimespanString(CryTime) : ""));
                            this.resChrystal.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Cry));
                            if (Cry === 0) this.resChrystal.exclude();
                            else this.resChrystal.show();
                            this.resPower.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Pow) + (PowTime > 0 ? " @ " + phe.cnc.Util.getTimespanString(PowTime) : ""));
                            this.resPower.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Pow));
                            if (Pow === 0) this.resPower.exclude();
                            else this.resPower.show();
                        } else {
                            this.resTiberium.setLabel("-");
                            this.resTiberium.resetToolTipText();
                            this.resTiberium.show();
                            this.resChrystal.setLabel("-");
                            this.resChrystal.resetToolTipText();
                            this.resChrystal.show();
                            this.resPower.setLabel("-");
                            this.resPower.resetToolTipText();
                            this.resPower.show();
                        }
                    },
                    onUpgrade: function() {
                        var newLevel = parseInt(this.txtLevel.getValue(), 10);
                        if (newLevel > 0 && this.Selection !== null) {
                            switch (this.Selection.get_VisObjectType()) {
                            case ClientLib.Vis.VisObject.EObjectType.CityBuildingType:
                                if (newLevel > this.Selection.get_BuildingLevel()) {
                                    ClientLib.API.City.GetInstance().UpgradeBuildingToLevel(this.Selection.get_BuildingDetails(), newLevel);
                                    this.onSelectionChange(null, this.Selection);
                                }
                                break;
                            case ClientLib.Vis.VisObject.EObjectType.DefenseUnitType:
                                if (newLevel > this.Selection.get_UnitLevel()) {
                                    ClientLib.API.Defense.GetInstance().UpgradeUnitToLevel(this.Selection.get_UnitDetails(), newLevel);
                                    this.onSelectionChange(null, this.Selection);
                                }
                                break;
                            case ClientLib.Vis.VisObject.EObjectType.ArmyUnitType:
                                if (newLevel > this.Selection.get_UnitLevel()) {
                                    ClientLib.API.Army.GetInstance().UpgradeUnitToLevel(this.Selection.get_UnitDetails(), newLevel);
                                    this.onSelectionChange(null, this.Selection);
                                }
                                break;
                            }
                        }
                    }
                }
            });
            qx.Class.define("Upgrade.Repairtime", {
                extend: qx.ui.container.Composite,
                construct: function () {
                    try {
                        qx.ui.container.Composite.call(this);
                        this.set({
                            layout : new qx.ui.layout.VBox(5),
                            padding: 5,
                            decorator: "pane-light-opaque"
                        });
                        this.add(this.title = new qx.ui.basic.Label(this.tr("tnf:repair points")).set({ alignX: "center", font: "font_size_14_bold" }));
                        this.add(this.grid = new qx.ui.container.Composite(new qx.ui.layout.Grid()));

                        this.grid.add(this.basRT = new qx.ui.basic.Atom("", "FactionUI/icons/icon_arsnl_base_buildings.png").set({toolTipText: this.tr("tnf:base")}), {row: 0, column: 0});
                        this.basRT.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
                        this.grid.add(new qx.ui.basic.Label("").set({ alignX: "right", alignY: "middle" }), {row: 0, column: 2});
                        this.grid.add(new qx.ui.basic.Label("").set({ alignX: "right", alignY: "middle" }), {row: 0, column: 4});
                        this.grid.add(this.btnBuildings = new qx.ui.form.Button(null, "FactionUI/icons/icon_building_detail_upgrade.png").set({toolTipText: this.tr("tnf:toggle upgrade mode"), width: 25, maxHeight: 17, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints"}), {row: 0, column: 6});
                        this.btnBuildings.getChildControl("icon").set({width: 14, height: 14, scale: true});
                        this.btnBuildings.addListener("execute", function (e) { this.upgradeBuilding(ClientLib.Base.ETechName.Construction_Yard); }, this);

                        this.grid.add(this.infRT = new qx.ui.basic.Atom("", "FactionUI/icons/icon_arsnl_off_squad.png").set({toolTipText: this.tr("tnf:infantry repair title")}), {row: 1, column: 0});
                        this.infRT.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
                        this.grid.add(new qx.ui.basic.Label("").set({ alignX: "right", alignY: "middle" }), {row: 1, column: 2});
                        this.grid.add(new qx.ui.basic.Label("").set({ alignX: "right", alignY: "middle" }), {row: 1, column: 4});
                        this.grid.add(this.btnInfantry = new qx.ui.form.Button(null, "FactionUI/icons/icon_building_detail_upgrade.png").set({toolTipText: this.tr("tnf:toggle upgrade mode"), width: 25, maxHeight: 17, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints"}), {row: 1, column: 6});
                        this.btnInfantry.getChildControl("icon").set({width: 14, height: 14, scale: true});
                        this.btnInfantry.addListener("execute", function (e) { this.upgradeBuilding(ClientLib.Base.ETechName.Barracks); }, this);

                        this.grid.add(this.vehRT = new qx.ui.basic.Atom("", "FactionUI/icons/icon_arsnl_off_vehicle.png").set({toolTipText: this.tr("tnf:vehicle repair title")}), {row: 2, column: 0});
                        this.vehRT.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
                        this.grid.add(new qx.ui.basic.Label("").set({ alignX: "right", alignY: "middle" }), {row: 2, column: 2});
                        this.grid.add(new qx.ui.basic.Label("").set({ alignX: "right", alignY: "middle" }), {row: 2, column: 4});
                        this.grid.add(this.btnVehicle = new qx.ui.form.Button(null, "FactionUI/icons/icon_building_detail_upgrade.png").set({toolTipText: this.tr("tnf:toggle upgrade mode"), width: 25, maxHeight: 17, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints"}), {row: 2, column: 6});
                        this.btnVehicle.getChildControl("icon").set({width: 14, height: 14, scale: true});
                        this.btnVehicle.addListener("execute", function (e) { this.upgradeBuilding(ClientLib.Base.ETechName.Factory); }, this);

                        this.grid.add(this.airRT = new qx.ui.basic.Atom("", "FactionUI/icons/icon_arsnl_off_plane.png").set({toolTipText: this.tr("tnf:aircraft repair title")}), {row: 3, column: 0});
                        this.airRT.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
                        this.grid.add(new qx.ui.basic.Label("").set({ alignX: "right", alignY: "middle" }), {row: 3, column: 2});
                        this.grid.add(new qx.ui.basic.Label("").set({ alignX: "right", alignY: "middle" }), {row: 3, column: 4});
                        this.grid.add(this.btnAircraft = new qx.ui.form.Button(null, "FactionUI/icons/icon_building_detail_upgrade.png").set({toolTipText: this.tr("tnf:toggle upgrade mode"), width: 25, maxHeight: 17, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints"}), {row: 3, column: 6});
                        this.btnAircraft.getChildControl("icon").set({width: 14, height: 14, scale: true});
                        this.btnAircraft.addListener("execute", function (e) { this.upgradeBuilding(ClientLib.Base.ETechName.Airport); }, this);

                        this.grid.getLayout().setRowFlex(0, 0);
                        this.grid.getLayout().setRowFlex(1, 0);
                        this.grid.getLayout().setRowFlex(2, 0);
                        this.grid.getLayout().setRowFlex(3, 0);
                        this.grid.getLayout().setColumnFlex(1, 200);
                        this.grid.getLayout().setColumnFlex(3, 200);
                        this.grid.getLayout().setColumnFlex(5, 200);

                        this.addListener("appear", this.onAppear, this);
                        this.addListener("disappear", this.onDisappear, this);
                    } catch (e) {
                        console.log("Error setting up Upgrade.Repairtime Constructor: ");
                        console.log(e.toString());
                    }
                },
                destruct: function () {},
                members: {
                    title: null,
                    grid: null,
                    btnBuildings: null,
                    btnInfantry: null,
                    btnVehicle: null,
                    btnAircraft: null,
                    onAppear: function () {
                        phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.onCurrentCityChange);
                        phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentChange", ClientLib.Data.CurrentCityChange, this, this.onCurrentCityChange);
                        phe.cnc.base.Timer.getInstance().addListener("uiTick", this.onTick, this);
                        this.getInfo();
                    },
                    onDisappear: function () {
                        phe.cnc.Util.detachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.onCurrentCityChange);
                        phe.cnc.Util.detachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentChange", ClientLib.Data.CurrentCityChange, this, this.onCurrentCityChange);
                        phe.cnc.base.Timer.getInstance().removeListener("uiTick", this.onTick, this);
                    },
                    onTick: function () {
                        this.getInfo();
                    },
                    onCurrentCityChange: function (oldCurrentCity, newCurrentCity) {
                        if (oldCurrentCity !== newCurrentCity) {
                            this.getInfo();
                        }
                    },
                    canUpgradeBuilding: function (ETechName) {
                        var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                        var building = city.get_CityBuildingsData().GetUniqueBuildingByTechName(ETechName);
                        if (building) {
                            var ResourceRequirements_Obj = ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(building.get_CurrentLevel() + 1, building.get_UnitGameData_Obj())
                            return (building.get_CurrentDamage() == 0 && !city.get_IsLocked() && city.HasEnoughResources(ResourceRequirements_Obj));
                        } else return false;
                    },
                    upgradeBuilding: function (ETechName) {
                        var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                        var building = city.get_CityBuildingsData().GetUniqueBuildingByTechName(ETechName);
                        if (building) {
                            ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", {
                                cityid : city.get_Id(),
                                posX : building.get_CoordX(),
                                posY : building.get_CoordY()
                            }, null, null, true);
                        }
                    },
                    getInfo: function () {
                        try {
                            var lvl, win, city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();

                            lvl = city.get_CityBuildingsData().GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Construction_Yard).get_CurrentLevel();
                            win = (city.get_CityBuildingsData().GetFullRepairTime(true) - city.get_CityBuildingsData().GetFullRepairTime(false)) * -1;
                            this.grid.getLayout().getCellWidget(0, 0).setLabel("("+ lvl +")");
                            this.grid.getLayout().getCellWidget(0, 2).setValue(phe.cnc.Util.getTimespanString(city.get_CityBuildingsData().GetFullRepairTime()));
                            this.grid.getLayout().getCellWidget(0, 4).setValue("-"+ phe.cnc.Util.getTimespanString(win));

                            if (city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false) > 0) {
                                lvl = city.get_CityBuildingsData().GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Barracks).get_CurrentLevel();
                                win = (city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, true) - city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false)) * -1;
                                this.grid.getLayout().getCellWidget(1, 0).setLabel("("+ lvl +")");
                                this.grid.getLayout().getCellWidget(1, 2).setValue(phe.cnc.Util.getTimespanString(city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false)));
                                this.grid.getLayout().getCellWidget(1, 4).setValue("-"+ phe.cnc.Util.getTimespanString(win));
                                this.grid.getLayout().setRowHeight(1, 18);
                            } else {
                                this.grid.getLayout().setRowHeight(1, 0);
                            }

                            if (city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false) > 0) {
                                lvl = city.get_CityBuildingsData().GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Factory).get_CurrentLevel();
                                win = (city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, true) - city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false)) * -1;
                                this.grid.getLayout().getCellWidget(2, 0).setLabel("("+ lvl +")");
                                this.grid.getLayout().getCellWidget(2, 2).setValue(phe.cnc.Util.getTimespanString(city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false)));
                                this.grid.getLayout().getCellWidget(2, 4).setValue("-"+ phe.cnc.Util.getTimespanString(win));
                                this.grid.getLayout().setRowHeight(2, 18);
                            } else {
                                this.grid.getLayout().setRowHeight(2, 0);
                            }

                            if (city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false) > 0) {
                                lvl = city.get_CityBuildingsData().GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Airport).get_CurrentLevel();
                                win = (city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, true) - city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false)) * -1;
                                this.grid.getLayout().getCellWidget(3, 0).setLabel("("+ lvl +")");
                                this.grid.getLayout().getCellWidget(3, 2).setValue(phe.cnc.Util.getTimespanString(city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false)));
                                this.grid.getLayout().getCellWidget(3, 4).setValue("-"+ phe.cnc.Util.getTimespanString(win));
                                this.grid.getLayout().setRowHeight(3, 18);
                            } else {
                                this.grid.getLayout().setRowHeight(3, 0);
                            }

                            if (this.canUpgradeBuilding(ClientLib.Base.ETechName.Construction_Yard)) this.btnBuildings.setEnabled(true);
                            else this.btnBuildings.setEnabled(false);
                            if (this.canUpgradeBuilding(ClientLib.Base.ETechName.Barracks)) this.btnInfantry.setEnabled(true);
                            else this.btnInfantry.setEnabled(false);
                            if (this.canUpgradeBuilding(ClientLib.Base.ETechName.Factory)) this.btnVehicle.setEnabled(true);
                            else this.btnVehicle.setEnabled(false);
                            if (this.canUpgradeBuilding(ClientLib.Base.ETechName.Airport)) this.btnAircraft.setEnabled(true);
                            else this.btnAircraft.setEnabled(false);
                        } catch (e) {
                            console.log("Error in Upgrade.Repairtime.getInfo: ");
                            console.log(e.toString());
                        }
                    }
                }
            });

        }
        function translation() {
            var localeManager = qx.locale.Manager.getInstance();

            // Default language is english (en)
            // Available Languages are: ar,ce,cs,da,de,en,es,fi,fr,hu,id,it,nb,nl,pl,pt,ro,ru,sk,sv,ta,tr,uk
            // You can send me translations so i can include them in the Script.

            // German
            localeManager.addTranslation("de", {
                "Selected building": "Markiertes Gebäude",
                "All buildings": "Alle Gebäude",
                "Selected defense unit": "Markierte Abwehrstellung",
                "All defense units": "Alle Abwehrstellungen",
                "Selected army unit": "Markierte Armee-Einheit",
                "All army units": "Alle Armee-Einheiten"
            });

            // Hungarian
            localeManager.addTranslation("hu", {
                "Selected building": "Kiválasztott létesítmény",
                "All buildings": "Összes létesítmény",
                "Selected defense unit": "Kiválasztott védelmi egység",
                "All defense units": "Minden védelmi egység",
                "Selected army unit": "Kiválasztott katonai egység",
                "All army units": "Minden katonai egység"
            });
        }
        function waitForGame() {
            try {
                if (typeof qx != 'undefined' && typeof qx.core != 'undfined' && typeof qx.core.Init != 'undefined') {
                    var app = qx.core.Init.getApplication();
                    if (app.initDone == true) {
                        try {
                            console.log("WarChiefs - Tiberium Alliances Upgrade Base/Defense/Army: Loading");
                            translation();
                            createClasses();
                            Upgrade.getInstance();
                            console.log("WarChiefs - Tiberium Alliances Upgrade Base/Defense/Army: Loaded");
                        } catch (e) {
                            console.log(e);
                        }
                    } else {
                        window.setTimeout(waitForGame, 1000);
                    }
                } else {
                    window.setTimeout(waitForGame, 1000);
                }
            } catch (e) {
                console.log(e);
            }
        }
        window.setTimeout(waitForGame, 1000);
    };

    var script = document.createElement("script");
    var txt = injectFunction.toString();
    script.innerHTML = "(" + txt + ")();";
    script.type = "text/javascript";

    document.getElementsByTagName("head")[0].appendChild(script);
})();










// ==UserScript==
// @version       1.7.6
// @name          C&C:TA CNCOpt Link Button
// @namespace     http://cncopt.com/
// @description   Creates a "CNCOpt" button when selecting a base in Command & Conquer: Tiberium Alliances. The share button takes you to http://cncopt.com/ and fills in the selected base information so you can analyze or share the base.
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @grant         GM_log
// @grant         GM_setValue
// @grant         GM_getValue
// @grant         GM_registerMenuCommand
// @grant         GM_xmlhttpRequest
// @grant         GM_updatingEnabled
// @grant         unsafeWindow
// @contributor   PythEch (http://http://userscripts.org/users/220246)
// @contributor   jerbri (http://userscripts.org/users/507954)
// ==/UserScript==
/* 

2013-03-03: Special thanks to jerbri for fixing this up so it worked again!
2012-11-25: Special thanks to PythEch for fixing this up so it worked again!

*/
var scity = null;
var tcity = null;
var tbase = null;
try {
  unsafeWindow.__cncopt_version = "1.7.6";
  (function () {
    var cncopt_main = function () {

      var defense_unit_map = {
        /* GDI Defense Units */"GDI_Wall": "w",
        "GDI_Cannon": "c",
        "GDI_Antitank Barrier": "t",
        "GDI_Barbwire": "b",
        "GDI_Turret": "m",
        "GDI_Flak": "f",
        "GDI_Art Inf": "r",
        "GDI_Art Air": "e",
        "GDI_Art Tank": "a",
        "GDI_Def_APC Guardian": "g",
        "GDI_Def_Missile Squad": "q",
        "GDI_Def_Pitbull": "p",
        "GDI_Def_Predator": "d",
        "GDI_Def_Sniper": "s",
        "GDI_Def_Zone Trooper": "z",
        /* Nod Defense Units */"NOD_Def_Antitank Barrier": "t",
        "NOD_Def_Art Air": "e",
        "NOD_Def_Art Inf": "r",
        "NOD_Def_Art Tank": "a",
        "NOD_Def_Attack Bike": "p",
        "NOD_Def_Barbwire": "b",
        "NOD_Def_Black Hand": "z",
        "NOD_Def_Cannon": "c",
        "NOD_Def_Confessor": "s",
        "NOD_Def_Flak": "f",
        "NOD_Def_MG Nest": "m",
        "NOD_Def_Militant Rocket Soldiers": "q",
        "NOD_Def_Reckoner": "g",
        "NOD_Def_Scorpion Tank": "d",
        "NOD_Def_Wall": "w",

        /* Forgotten Defense Units */"FOR_Wall": "w",
        "FOR_Barbwire_VS_Inf": "b",
        "FOR_Barrier_VS_Veh": "t",
        "FOR_Inf_VS_Inf": "g",
        "FOR_Inf_VS_Veh": "r",
        "FOR_Inf_VS_Air": "q",
        "FOR_Sniper": "n",
        "FOR_Mammoth": "y",
        "FOR_Veh_VS_Inf": "o",
        "FOR_Veh_VS_Veh": "s",
        "FOR_Veh_VS_Air": "u",
        "FOR_Turret_VS_Inf": "m",
        "FOR_Turret_VS_Inf_ranged": "a",
        "FOR_Turret_VS_Veh": "v",
        "FOR_Turret_VS_Veh_ranged": "d",
        "FOR_Turret_VS_Air": "f",
        "FOR_Turret_VS_Air_ranged": "e",
        "": ""
      };

      var offense_unit_map = {
        /* GDI Offense Units */"GDI_APC Guardian": "g",
        "GDI_Commando": "c",
        "GDI_Firehawk": "f",
        "GDI_Juggernaut": "j",
        "GDI_Kodiak": "k",
        "GDI_Mammoth": "m",
        "GDI_Missile Squad": "q",
        "GDI_Orca": "o",
        "GDI_Paladin": "a",
        "GDI_Pitbull": "p",
        "GDI_Predator": "d",
        "GDI_Riflemen": "r",
        "GDI_Sniper Team": "s",
        "GDI_Zone Trooper": "z",

        /* Nod Offense Units */"NOD_Attack Bike": "b",
        "NOD_Avatar": "a",
        "NOD_Black Hand": "z",
        "NOD_Cobra": "r",
        "NOD_Commando": "c",
        "NOD_Confessor": "s",
        "NOD_Militant Rocket Soldiers": "q",
        "NOD_Militants": "m",
        "NOD_Reckoner": "k",
        "NOD_Salamander": "l",
        "NOD_Scorpion Tank": "o",
        "NOD_Specter Artilery": "p",
        "NOD_Venom": "v",
        "NOD_Vertigo": "t",
        "": ""
      };


      function findTechLayout(city) {
        for (var k in city) {
          //console.log(typeof(city[k]), "1.city[", k, "]", city[k])
          if ((typeof (city[k]) == "object") && city[k] && 0 in city[k] && 8 in city[k]) {
            if ((typeof (city[k][0]) == "object") && city[k][0] && city[k][0] && 0 in city[k][0] && 15 in city[k][0]) {
              if ((typeof (city[k][0][0]) == "object") && city[k][0][0] && "BuildingIndex" in city[k][0][0]) {
                return city[k];
              }
            }
          }
        }
        return null;
      }

      function findBuildings(city) {
        var cityBuildings = city.get_CityBuildingsData();
        for (var k in cityBuildings) {
          if (PerforceChangelist >= 376877) {
            if ((typeof (cityBuildings[k]) === "object") && cityBuildings[k] && "d" in cityBuildings[k] && "c" in cityBuildings[k] && cityBuildings[k].c > 0) {
              return cityBuildings[k].d;
            }
          } else {
            if ((typeof (cityBuildings[k]) === "object") && cityBuildings[k] && "l" in cityBuildings[k]) {
              return cityBuildings[k].l;
            }
          }
        }
      }

      function isOffenseUnit(unit) {
        return (unit.get_UnitGameData_Obj().n in offense_unit_map);
      }

      function isDefenseUnit(unit) {
        return (unit.get_UnitGameData_Obj().n in defense_unit_map);
      }

      function getUnitArrays(city) {
        var ret = [];
        for (var k in city) {
          if ((typeof (city[k]) == "object") && city[k]) {
            for (var k2 in city[k]) {
              if (PerforceChangelist >= 376877) {
                if ((typeof (city[k][k2]) == "object") && city[k][k2] && "d" in city[k][k2]) {
                  var lst = city[k][k2].d;
                  if ((typeof (lst) == "object") && lst) {
                    for (var i in lst) {
                      if (typeof (lst[i]) == "object" && lst[i] && "get_CurrentLevel" in lst[i]) {
                        ret.push(lst);
                      }
                    }
                  }
                }
              } else {
                if ((typeof (city[k][k2]) == "object") && city[k][k2] && "l" in city[k][k2]) {
                  var lst = city[k][k2].l;
                  if ((typeof (lst) == "object") && lst) {
                    for (var i in lst) {
                      if (typeof (lst[i]) == "object" && lst[i] && "get_CurrentLevel" in lst[i]) {
                        ret.push(lst);
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return ret;
      }

      function getDefenseUnits(city) {
        var arr = getUnitArrays(city);
        for (var i = 0; i < arr.length; ++i) {
          for (var j in arr[i]) {
            if (isDefenseUnit(arr[i][j])) {
              return arr[i];
            }
          }
        }
        return [];
      }

      function getOffenseUnits(city) {
        var arr = getUnitArrays(city);
        for (var i = 0; i < arr.length; ++i) {
          for (var j in arr[i]) {
            if (isOffenseUnit(arr[i][j])) {
              return arr[i];
            }
          }
        }
        return [];
      }


      function cncopt_create() {
        console.log("CNCOpt Link Button v" + window.__cncopt_version + " loaded");
        var cncopt = {
          selected_base: null,
          keymap: {
            /* GDI Buildings */"GDI_Accumulator": "a",
            "GDI_Refinery": "r",
            "GDI_Trade Center": "u",
            "GDI_Silo": "s",
            "GDI_Power Plant": "p",
            "GDI_Construction Yard": "y",
            "GDI_Airport": "d",
            "GDI_Barracks": "b",
            "GDI_Factory": "f",
            "GDI_Defense HQ": "q",
            "GDI_Defense Facility": "w",
            "GDI_Command Center": "e",
            "GDI_Support_Art": "z",
            "GDI_Support_Air": "x",
            "GDI_Support_Ion": "i",
            /* Forgotten Buildings */"FOR_Silo": "s",
            "FOR_Refinery": "r",
            "FOR_Tiberium Booster": "b",
            "FOR_Crystal Booster": "v",
            "FOR_Trade Center": "u",
            "FOR_Defense Facility": "w",
            "FOR_Construction Yard": "y",
            "FOR_Harvester_Tiberium": "h",
            "FOR_Defense HQ": "q",
            "FOR_Harvester_Crystal": "n",
            /* Nod Buildings */"NOD_Refinery": "r",
            "NOD_Power Plant": "p",
            "NOD_Harvester": "h",
            "NOD_Construction Yard": "y",
            "NOD_Airport": "d",
            "NOD_Trade Center": "u",
            "NOD_Defense HQ": "q",
            "NOD_Barracks": "b",
            "NOD_Silo": "s",
            "NOD_Factory": "f",
            "NOD_Harvester_Crystal": "n",
            "NOD_Command Post": "e",
            "NOD_Support_Art": "z",
            "NOD_Support_Ion": "i",
            "NOD_Accumulator": "a",
            "NOD_Support_Air": "x",
            "NOD_Defense Facility": "w",
            //"NOD_Tech Lab": "",
            //"NOD_Recruitment Hub": "X",
            //"NOD_Temple of Nod": "X",

            /* GDI Defense Units */"GDI_Wall": "w",
            "GDI_Cannon": "c",
            "GDI_Antitank Barrier": "t",
            "GDI_Barbwire": "b",
            "GDI_Turret": "m",
            "GDI_Flak": "f",
            "GDI_Art Inf": "r",
            "GDI_Art Air": "e",
            "GDI_Art Tank": "a",
            "GDI_Def_APC Guardian": "g",
            "GDI_Def_Missile Squad": "q",
            "GDI_Def_Pitbull": "p",
            "GDI_Def_Predator": "d",
            "GDI_Def_Sniper": "s",
            "GDI_Def_Zone Trooper": "z",
            /* Nod Defense Units */"NOD_Def_Antitank Barrier": "t",
            "NOD_Def_Art Air": "e",
            "NOD_Def_Art Inf": "r",
            "NOD_Def_Art Tank": "a",
            "NOD_Def_Attack Bike": "p",
            "NOD_Def_Barbwire": "b",
            "NOD_Def_Black Hand": "z",
            "NOD_Def_Cannon": "c",
            "NOD_Def_Confessor": "s",
            "NOD_Def_Flak": "f",
            "NOD_Def_MG Nest": "m",
            "NOD_Def_Militant Rocket Soldiers": "q",
            "NOD_Def_Reckoner": "g",
            "NOD_Def_Scorpion Tank": "d",
            "NOD_Def_Wall": "w",

            /* Forgotten Defense Units */"FOR_Wall": "w",
            "FOR_Barbwire_VS_Inf": "b",
            "FOR_Barrier_VS_Veh": "t",
            "FOR_Inf_VS_Inf": "g",
            "FOR_Inf_VS_Veh": "r",
            "FOR_Inf_VS_Air": "q",
            "FOR_Sniper": "n",
            "FOR_Mammoth": "y",
            "FOR_Veh_VS_Inf": "o",
            "FOR_Veh_VS_Veh": "s",
            "FOR_Veh_VS_Air": "u",
            "FOR_Turret_VS_Inf": "m",
            "FOR_Turret_VS_Inf_ranged": "a",
            "FOR_Turret_VS_Veh": "v",
            "FOR_Turret_VS_Veh_ranged": "d",
            "FOR_Turret_VS_Air": "f",
            "FOR_Turret_VS_Air_ranged": "e",

            /* GDI Offense Units */"GDI_APC Guardian": "g",
            "GDI_Commando": "c",
            "GDI_Firehawk": "f",
            "GDI_Juggernaut": "j",
            "GDI_Kodiak": "k",
            "GDI_Mammoth": "m",
            "GDI_Missile Squad": "q",
            "GDI_Orca": "o",
            "GDI_Paladin": "a",
            "GDI_Pitbull": "p",
            "GDI_Predator": "d",
            "GDI_Riflemen": "r",
            "GDI_Sniper Team": "s",
            "GDI_Zone Trooper": "z",

            /* Nod Offense Units */"NOD_Attack Bike": "b",
            "NOD_Avatar": "a",
            "NOD_Black Hand": "z",
            "NOD_Cobra": "r",
            "NOD_Commando": "c",
            "NOD_Confessor": "s",
            "NOD_Militant Rocket Soldiers": "q",
            "NOD_Militants": "m",
            "NOD_Reckoner": "k",
            "NOD_Salamander": "l",
            "NOD_Scorpion Tank": "o",
            "NOD_Specter Artilery": "p",
            "NOD_Venom": "v",
            "NOD_Vertigo": "t",

            "<last>": "."
          },
          make_sharelink: function () {
            try {
              var selected_base = cncopt.selected_base;
              var city_id = selected_base.get_Id();
              var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(city_id);
              var own_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
              var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
              var server = ClientLib.Data.MainData.GetInstance().get_Server();
              tbase = selected_base;
              tcity = city;
              scity = own_city;
              //console.log("Target City: ", city);
              //console.log("Own City: ", own_city);
              var link = "http://cncopt.com/?map=";
              link += "3|"; /* link version */
              switch (city.get_CityFaction()) {
                case 1:
                  /* GDI */
                  link += "G|";
                  break;
                case 2:
                  /* NOD */
                  link += "N|";
                  break;
                case 3:
                  /* FOR faction - unseen, but in GAMEDATA */
                case 4:
                  /* Forgotten Bases */
                case 5:
                  /* Forgotten Camps */
                case 6:
                  /* Forgotten Outposts */
                  link += "F|";
                  break;
                default:
                  console.log("cncopt: Unknown faction: " + city.get_CityFaction());
                  link += "E|";
                  break;
              }
              switch (own_city.get_CityFaction()) {
                case 1:
                  /* GDI */
                  link += "G|";
                  break;
                case 2:
                  /* NOD */
                  link += "N|";
                  break;
                case 3:
                  /* FOR faction - unseen, but in GAMEDATA */
                case 4:
                  /* Forgotten Bases */
                case 5:
                  /* Forgotten Camps */
                case 6:
                  /* Forgotten Outposts */
                  link += "F|";
                  break;
                default:
                  console.log("cncopt: Unknown faction: " + own_city.get_CityFaction());
                  link += "E|";
                  break;
              }
              link += city.get_Name() + "|";
              defense_units = []
              for (var i = 0; i < 20; ++i) {
                var col = [];
                for (var j = 0; j < 9; ++j) {
                  col.push(null);
                }
                defense_units.push(col)
              }
              var defense_unit_list = getDefenseUnits(city);
              if (PerforceChangelist >= 376877) {
                for (var i in defense_unit_list) {
                  var unit = defense_unit_list[i];
                  defense_units[unit.get_CoordX()][unit.get_CoordY() + 8] = unit;
                }
              } else {
                for (var i = 0; i < defense_unit_list.length; ++i) {
                  var unit = defense_unit_list[i];
                  defense_units[unit.get_CoordX()][unit.get_CoordY() + 8] = unit;
                }
              }

              offense_units = []
              for (var i = 0; i < 20; ++i) {
                var col = [];
                for (var j = 0; j < 9; ++j) {
                  col.push(null);
                }
                offense_units.push(col)
              }

              var offense_unit_list = getOffenseUnits(own_city);
              if (PerforceChangelist >= 376877) {
                for (var i in offense_unit_list) {
                  var unit = offense_unit_list[i];
                  offense_units[unit.get_CoordX()][unit.get_CoordY() + 16] = unit;
                }
              } else {
                for (var i = 0; i < offense_unit_list.length; ++i) {
                  var unit = offense_unit_list[i];
                  offense_units[unit.get_CoordX()][unit.get_CoordY() + 16] = unit;
                }
              }

              var techLayout = findTechLayout(city);
              var buildings = findBuildings(city);
              for (var i = 0; i < 20; ++i) {
                row = [];
                for (var j = 0; j < 9; ++j) {
                  var spot = i > 16 ? null : techLayout[j][i];
                  var level = 0;
                  var building = null;
                  if (spot && spot.BuildingIndex >= 0) {
                    building = buildings[spot.BuildingIndex];
                    level = building.get_CurrentLevel();
                  }
                  var defense_unit = defense_units[j][i];
                  if (defense_unit) {
                    level = defense_unit.get_CurrentLevel();
                  }
                  var offense_unit = offense_units[j][i];
                  if (offense_unit) {
                    level = offense_unit.get_CurrentLevel();
                  }
                  if (level > 1) {
                    link += level;
                  }

                  switch (i > 16 ? 0 : city.GetResourceType(j, i)) {
                    case 0:
                      if (building) {
                        var techId = building.get_MdbBuildingId();
                        if (GAMEDATA.Tech[techId].n in cncopt.keymap) {
                          link += cncopt.keymap[GAMEDATA.Tech[techId].n];
                        } else {
                          console.log("cncopt [5]: Unhandled building: " + techId, building);
                          link += ".";
                        }
                      } else if (defense_unit) {
                        if (defense_unit.get_UnitGameData_Obj().n in cncopt.keymap) {
                          link += cncopt.keymap[defense_unit.get_UnitGameData_Obj().n];
                        } else {
                          console.log("cncopt [5]: Unhandled unit: " + defense_unit.get_UnitGameData_Obj().n);
                          link += ".";
                        }
                      } else if (offense_unit) {
                        if (offense_unit.get_UnitGameData_Obj().n in cncopt.keymap) {
                          link += cncopt.keymap[offense_unit.get_UnitGameData_Obj().n];
                        } else {
                          console.log("cncopt [5]: Unhandled unit: " + offense_unit.get_UnitGameData_Obj().n);
                          link += ".";
                        }
                      } else {
                        link += ".";
                      }
                      break;
                    case 1:
                      /* Crystal */
                      if (spot.BuildingIndex < 0) link += "c";
                      else link += "n";
                      break;
                    case 2:
                      /* Tiberium */
                      if (spot.BuildingIndex < 0) link += "t";
                      else link += "h";
                      break;
                    case 4:
                      /* Woods */
                      link += "j";
                      break;
                    case 5:
                      /* Scrub */
                      link += "h";
                      break;
                    case 6:
                      /* Oil */
                      link += "l";
                      break;
                    case 7:
                      /* Swamp */
                      link += "k";
                      break;
                    default:
                      console.log("cncopt [4]: Unhandled resource type: " + city.GetResourceType(j, i));
                      link += ".";
                      break;
                  }
                }
              }
              /* Tack on our alliance bonuses */
              if (alliance && scity.get_AllianceId() == tcity.get_AllianceId()) {
                link += "|" + alliance.get_POITiberiumBonus();
                link += "|" + alliance.get_POICrystalBonus();
                link += "|" + alliance.get_POIPowerBonus();
                link += "|" + alliance.get_POIInfantryBonus();
                link += "|" + alliance.get_POIVehicleBonus();
                link += "|" + alliance.get_POIAirBonus();
                link += "|" + alliance.get_POIDefenseBonus();
              }
              if (server.get_TechLevelUpgradeFactorBonusAmount() != 1.20) {
                  link += "|newEconomy";
              }

              //console.log(link);
              window.open(link, "_blank");
            } catch (e) {
              console.log("cncopt [1]: ", e);
            }
          }
        };
        if (!webfrontend.gui.region.RegionCityMenu.prototype.__cncopt_real_showMenu) {
          webfrontend.gui.region.RegionCityMenu.prototype.__cncopt_real_showMenu = webfrontend.gui.region.RegionCityMenu.prototype.showMenu;
        }

        var check_ct = 0;
        var check_timer = null;
        var button_enabled = 123456;
        /* Wrap showMenu so we can inject our Sharelink at the end of menus and
         * sync Base object to our cncopt.selected_base variable  */
        webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function (selected_base) {
          try {
            var self = this;
            //console.log(selected_base);
            cncopt.selected_base = selected_base;
            if (this.__cncopt_initialized != 1) {
              this.__cncopt_initialized = 1;
              this.__cncopt_links = [];
              for (var i in this) {
                try {
                  if (this[i] && this[i].basename == "Composite") {
                    var link = new qx.ui.form.Button("CNCOpt", "http://cncopt.com/favicon.ico");
                    link.addListener("execute", function () {
                      var bt = qx.core.Init.getApplication();
                      bt.getBackgroundArea().closeCityInfo();
                      cncopt.make_sharelink();
                    });
                    this[i].add(link);
                    this.__cncopt_links.push(link)
                  }
                } catch (e) {
                  console.log("cncopt [2]: ", e);
                }
              }
            }
            var tf = false;
            switch (selected_base.get_VisObjectType()) {
              case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                switch (selected_base.get_Type()) {
                  case ClientLib.Vis.Region.RegionCity.ERegionCityType.Own:
                    tf = true;
                    break;
                  case ClientLib.Vis.Region.RegionCity.ERegionCityType.Alliance:
                  case ClientLib.Vis.Region.RegionCity.ERegionCityType.Enemy:
                    tf = true;
                    break;
                }
                break;
              case ClientLib.Vis.VisObject.EObjectType.RegionGhostCity:
                tf = false;
                console.log("cncopt: Ghost City selected.. ignoring because we don't know what to do here");
                break;
              case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                tf = true;
                break;
              case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                tf = true;
                break;
            }

            var orig_tf = tf;

            function check_if_button_should_be_enabled() {
              try {
                tf = orig_tf;
                var selected_base = cncopt.selected_base;
                var still_loading = false;
                if (check_timer != null) {
                  clearTimeout(check_timer);
                }

                /* When a city is selected, the data for the city is loaded in the background.. once the 
                 * data arrives, this method is called again with these fields set, but until it does
                 * we can't actually generate the link.. so this section of the code grays out the button
                 * until the data is ready, then it'll light up. */
                if (selected_base && selected_base.get_Id) {
                  var city_id = selected_base.get_Id();
                  var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(city_id);
                  //if (!city || !city.m_CityUnits || !city.m_CityUnits.m_DefenseUnits) {
                  //console.log("City", city);
                  //console.log("get_OwnerId", city.get_OwnerId());
                  if (!city || city.get_OwnerId() == 0) {
                    still_loading = true;
                    tf = false;
                  }
                } else {
                  tf = false;
                }
                if (tf != button_enabled) {
                  button_enabled = tf;
                  for (var i = 0; i < self.__cncopt_links.length; ++i) {
                    self.__cncopt_links[i].setEnabled(tf);
                  }
                }
                if (!still_loading) {
                  check_ct = 0;
                } else {
                  if (check_ct > 0) {
                    check_ct--;
                    check_timer = setTimeout(check_if_button_should_be_enabled, 100);
                  } else {
                    check_timer = null;
                  }
                }
              } catch (e) {
                console.log("cncopt [3]: ", e);
                tf = false;
              }
            }

            check_ct = 50;
            check_if_button_should_be_enabled();
          } catch (e) {
            console.log("cncopt [3]: ", e);
          }
          this.__cncopt_real_showMenu(selected_base);
        }
      }


      /* Nice load check (ripped from AmpliDude's LoU Tweak script) */
      function cnc_check_if_loaded() {
        try {
          if (typeof qx != 'undefined') {
            a = qx.core.Init.getApplication(); // application
            if (a) {
              cncopt_create();
            } else {
              window.setTimeout(cnc_check_if_loaded, 1000);
            }
          } else {
            window.setTimeout(cnc_check_if_loaded, 1000);
          }
        } catch (e) {
          if (typeof console != 'undefined') console.log(e);
          else if (window.opera) opera.postError(e);
          else GM_log(e);
        }
      }
      if (/commandandconquer\.com/i.test(document.domain)) window.setTimeout(cnc_check_if_loaded, 1000);
    }

    // injecting because we can't seem to hook into the game interface via unsafeWindow 
    //   (Ripped from AmpliDude's LoU Tweak script)
    var script_block = document.createElement("script");
    txt = cncopt_main.toString();
    script_block.innerHTML = "(" + txt + ")();";
    script_block.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain)) document.getElementsByTagName("head")[0].appendChild(script_block);
  })();
} catch (e) {
  GM_log(e);
};










// ==UserScript==
// @name            WarChiefs - Tiberium Alliances Combat Simulator
// @description     Combat Simulator used to plan and strategize attack before going into battle.
// @author          Eistee
// @version         13.09.26
// @namespace       http*://*.alliances.commandandconquer.com/*
// @include         http*://*.alliances.commandandconquer.com/*
// @require         http://usocheckup.redirectme.net/165888.js
// @icon            http://s3.amazonaws.com/uso_ss/icon/165888/large.png
// @updateURL       https://userscripts.org/scripts/source/165888.meta.js
// @downloadURL     https://userscripts.org/scripts/source/165888.user.js
// @grant           GM_getValue
// @grant           GM_log
// @grant           GM_openInTab
// @grant           GM_registerMenuCommand
// @grant           GM_setValue
// @grant           GM_xmlhttpRequest
// ==/UserScript==
/**
 *  License: CC-BY-NC-SA 3.0
 *
 *  Although I am the author of this script, I want to also give credit to other authors who's methods and ideas are or might appear in this script.
 *  Credits: Topper42, Eferz98, PythEch, MrHIDEn, Panavia2, Deyhak, CodeEcho, Matthias Fuchs, Enceladus, TheLuminary, Da Xue, Quor, WildKatana, Peluski17, Elda1990, TheStriker, JDuarteDJ, null
 */
(function () {
    var injectFunction = function () {
        function createClasses() {
            qx.Class.define("Simulator", {
                type: "singleton",
                extend: qx.core.Object,
                construct: function () {
                    try {
                        var qxApp = qx.core.Init.getApplication();
                        this.armyBar = qx.core.Init.getApplication().getArmySetupAttackBar();
                        this.playArea = qx.core.Init.getApplication().getMainOverlay();
                        this.replayBar = qx.core.Init.getApplication().getReportReplayOverlay();
                        this.isSimButtonDisabled = false;
                        this.armyTempFormations = [];
                        this.armyTempIdx = 0;
                        this.isSimulation = false;
                        this.hideArmyTooltips();

                        /**
                         *   Setup Images
                         */

                        var i, img = {
                            Arrows: {
                                Up: "webfrontend/theme/arrows/up.png",
                                Down: "webfrontend/theme/arrows/down.png",
                                Left: "webfrontend/theme/arrows/left.png",
                                Right: "webfrontend/theme/arrows/right.png"
                            },
                            Flip: {
                                H: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOvgAADr4B6kKxwAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAACo0lEQVQ4T2PABkJq+rjmH7nUdPrV119nXn/9s+7S/R1NCzc4rTx1a8ay41c7WuYsl5WRkWGEKicM4honSux7+Pb42Tdf/4LwwacfP7Wv3pOz8sydVavO3lk5f9cx15jCGhaocsJgys7jAUeffXiGZODn1lW7Claeub16xelb64C4Ma+lnx+qHD/wySpjXnnqeifQq79RDFy5qxBq4PqVp25Ombxmhw4QQHXhAdH1fWL77r++DDToD04Dz9xeteDAuajc1gn4ve0UkciU3zvT4vTrb79ghmEzEOTtNefvL8pomyrExsYG1Y0FxNT18my4dH8KKGYJGLgeGDkrJqzeoR9ZWMMM1Y4Jercctjr46N1NZMNwGQhy5YpTN/PzWvu5oNpRgUdGGdOc/WfST736guJdPAauX3HiekfH4vXyUCNQQVhtn8D2W8+2nEGKDEIGgrw9a+cxeyUlJdRE7pldxZjcOlXj6LOPj9ENw2cgkL9m2dHL2TGljZxQoyAgrKaHdfmZWxVA734jxUAQXnXm9tS6yXMlTG2doKYBQWrrZIHNVx4sBWrG8C4I4zNw5enbi+ftPuGSVNGMiO2edXstjz3/9BabYSBMwMC1y09cr2pbvFEIbJh/RinrlI1744CRAc9q6BifgSC8+tzdpT1rdmuAE3l80yTZ/UglCzZMyECQ+MID58NiyprYGGbuO5t1/MWn99gMgmFCBoLwytO3Wir6ZggzLDpycQJyyYINH3r66WP7mj25wPDCZ+DsSRv2WTAsPHCmChgh7068/PwTGz4OlFtz+npX7/p9LstP3WwA4hZseMXp2w3Td56wYyho6lSdsfNY6YzdJydM330CBYPEQHIVnROVIzMLOIvb+oVq+meIVPVOQ8EgsYqeqUJJpfWcAKWymA2EsiGlAAAAAElFTkSuQmCC",
                                V: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOvgAADr4B6kKxwAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAClklEQVQ4T2MgB/iVd7CH1/SI9G3YF7D4+JUlR59/+nH61dff8w6cnQBVgh+EN01hjGqZxpY9eYlI39YjNvMOni888Ojd0aNP3z8+8/rr77Nvvv498+brn/n7T0+HasEOIlpnMIc1TBIJq+vX3HjtSd/ma4/WnHj59TtQM9gQZAwycO7ekzOhWhHAo6CRKaymh6d69krVWfvOpO19+O700WcfYS75g24QDGMYCPQWS1TzFKmktmkmO26/XLHv3sujwHD5CVSM0xBkDDcwqLJLcMHxa/FLT17rOPz04/PTb779wqaBEIYbOHv/2ZxjLz6/BglgU0gshhu44MDZaUABigwDYbCB+07NZJi29WDFvrsvLu+78/waDnwdixgmBpoxbduhMgav6ETZyNxSm+j8creoPPJwdH4FkC6z9o1NlWaYsnGf0ZpzdyeuOnt3GSUYZMZUoFkMk7ceDV555s6KFadvrQPi9eRioBmrpu44EcLQvHijweJDFzJWnrrRu/LM7VVASbIMBupdPWX78TAGt8Bw1oSsfL6qCbMUp2855Lvk+LXGFaduTgcpACpci64RF4YbCALe3t6MLi4uTC6BEZwhqXnC3Us3ms7acSxi+YlrLaDwgRqO1SAYRjEQGYAMB2JmN08v9vCMAuGWafPVFu4/E7H8+NWaVWduz11x+vYakgyEAaChDEBXM3r5+rOGJmVwlzZ1Svav2m656NDFghWnbk0FGrAEaBAoSMBhTtBAdAByuZOrO4t7eDxfWlWz7IztR70WHDiXA3T1jFVn76wE4hVTtx8PhionDoBc7eDgwODq4ckcFJPEHp9TJNA0e5n6tPU77ZcfvZLaNnupClQpeQDkaktLS2Y3Hz9Ov8h4XltnV3YAMTRvewY5T1wAAAAASUVORK5CYII="
                            },
                            DisableUnit: "FactionUI/icons/icon_disable_unit.png",
                            Undo: "FactionUI/icons/icon_refresh_funds.png"
                        };

                         /**
                         *   Setup Buttons
                         */

                        //Simulation Button//
                        this.simBtn = new qx.ui.form.Button(qxApp.tr("Simulate")).set({toolTipText: qxApp.tr("Opens Simulation Screen."), width: 60, height: 28, alignY: "middle", appearance: "button-text-small"});
                        this.simBtn.addListener("click", function () { this.__openSimulatorWindow(); }, this);
                        this.armyBar.add(this.simBtn, {left: null, right: 58, bottom: 119});

                        //Simulator Stats Button//
                        this.statBtn = new qx.ui.form.Button(qxApp.tr("Stats")).set({toolTipText: qxApp.tr("Opens Simulator Stats Window."), width: 60, height: 28, alignY: "middle", appearance: "button-text-small"});
                        this.statBtn.addListener("click", function () { this.__openStatWindow(); }, this);
                        this.armyBar.add(this.statBtn, {left: null, right: 58, bottom: 81});

                        //Simulator Options Button//
                        this.optionBtn = new qx.ui.form.Button(qxApp.tr("Options")).set({toolTipText: qxApp.tr("Opens Simulator Options."), width: 60, height: 28, alignY: "middle", appearance: "button-text-small"});
                        this.optionBtn.addListener("click", function () { this.__openOptionWindow(); }, this);
                        this.armyBar.add(this.optionBtn, {left: null, right: 58, bottom: 43});

                        //Simulator Layout Button//
                        this.layoutBtn = new qx.ui.form.Button(qxApp.tr("Layout")).set({toolTipText: qxApp.tr("Save/Load/Delete Unit Formations for current city."), width: 60, height: 28, alignY: "middle", appearance: "button-text-small"});
                        this.layoutBtn.addListener("click", function () { this.__openLayoutWindow(); }, this);
                        this.armyBar.add(this.layoutBtn, {left: null, right: 58, bottom: 6});

                        //Simulator Unlock Combat Button//
                        this.unlockCmtBtn = new qx.ui.form.Button(qxApp.tr("Unlock")).set({toolTipText: qxApp.tr("Unlock Combat Button."), width: 44, height: 44, opacity: 0.4, padding : 0, alignY: "middle", appearance: "button-text-small"});
                        this.unlockCmtBtn.addListener("click", function () { this.timeoutCmtBtn(); }, this);
                        this.armyBar.add(this.unlockCmtBtn, {left: null, right: 10, bottom: 8});

                        //Simulator Unlock Repair Time Button//
                        this.unlockRTBtn = new qx.ui.form.Button(qxApp.tr("Unlock")).set({toolTipText: qxApp.tr("Unlock Repair Button."), width: 44, height: 44, opacity: 0.4, padding : 0, alignY: "middle", appearance: "button-text-small"});
                        this.unlockRTBtn.addListener("click", function () { this.timeoutRTBtn(); }, this);
                        this.armyBar.add(this.unlockRTBtn, {left: null, right: 10, bottom: 100});

                        //Formation Shift Buttons//
                        this.shiftUpBtn = new qx.ui.form.Button("", img.Arrows.Up).set({toolTipText: qxApp.tr("Shifts units one space up."), width: 30, height: 20, alignY: "middle", appearance: "button-text-small", gap: 0, iconPosition: "top", show: "icon"});
                        this.shiftUpBtn.addListener("click", function () { this.shiftFormation("u"); }, this);
                        this.shiftUpBtn.hide();
                        this.playArea.add(this.shiftUpBtn, {left: null, right: 75, bottom: 113});

                        this.shiftDownBtn = new qx.ui.form.Button("", img.Arrows.Down).set({toolTipText: qxApp.tr("Shifts units one space down."), width: 30, height: 20, alignY: "middle", appearance: "button-text-small", gap: 0, iconPosition: "top", show: "icon"});
                        this.shiftDownBtn.addListener("click", function () { this.shiftFormation("d"); }, this);
                        this.shiftDownBtn.hide();
                        this.playArea.add(this.shiftDownBtn, {left: null, right: 75, bottom: 73});

                        this.shiftLeftBtn = new qx.ui.form.Button("", img.Arrows.Left).set({toolTipText: qxApp.tr("Shifts units one space left."), width: 30, height: 20, alignY: "middle", appearance: "button-text-small", gap: 0, iconPosition: "top", show: "icon"});
                        this.shiftLeftBtn.addListener("click", function () { this.shiftFormation("l"); }, this);
                        this.shiftLeftBtn.hide();
                        this.playArea.add(this.shiftLeftBtn, {left: null, right: 95, bottom: 93});

                        this.shiftRightBtn = new qx.ui.form.Button("", img.Arrows.Right).set({toolTipText: qxApp.tr("Shifts units one space right."), width: 30, height: 20, alignY: "middle", appearance: "button-text-small", gap: 0, iconPosition: "top", show: "icon"});
                        this.shiftRightBtn.addListener("click", function () { this.shiftFormation("r"); }, this);
                        this.shiftRightBtn.hide();
                        this.playArea.add(this.shiftRightBtn, {left: null, right: 55, bottom: 93});

                        for (i = 0; i < ClientLib.Base.Util.get_ArmyMaxSlotCountY(); i++) {
                            var btnMirrorH = new qx.ui.form.Button(i, img.Flip.H).set({toolTipText: qxApp.tr("Mirrors units horizontally."), width: 19, maxHeight: 25, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints"});
                            btnMirrorH.addListener("click", function (e) { this.mirrorFormation("h", parseInt(e.getTarget().getLabel(), 10)); }, this);
                            btnMirrorH.getChildControl("icon").set({width: 16, height: 16, scale: true});
                            var shiftLeftBtn = new qx.ui.form.Button(i, img.Arrows.Left).set({toolTipText: qxApp.tr("Shifts units one space left."), width: 20, maxHeight: 25, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints"});
                            shiftLeftBtn.addListener("click", function (e) { this.shiftFormation("l", parseInt(e.getTarget().getLabel(), 10)); }, this);
                            var shiftRightBtn = new qx.ui.form.Button(i, img.Arrows.Right).set({toolTipText: qxApp.tr("Shifts units one space right."), width: 20, maxHeight: 25, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints"});
                            shiftRightBtn.addListener("click", function (e) { this.shiftFormation("r", parseInt(e.getTarget().getLabel(), 10)); }, this);

                            var cntWave = this.armyBar.getMainContainer().getChildren()[(i+4)];
                            cntWave.removeAll();
                            cntWave.setLayout(new qx.ui.layout.HBox());
                            cntWave.add(btnMirrorH);
                            cntWave.add(new qx.ui.core.Spacer(), {flex: 1});
                            cntWave.add(shiftLeftBtn);
                            cntWave.add(shiftRightBtn);
                        }
                        var formation = this.armyBar.getMainContainer().getChildren()[1].getChildren()[0];
                        var btnHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox());
                        var btnHBoxouter = new qx.ui.container.Composite(new qx.ui.layout.HBox());
                        btnHBoxouter.add(new qx.ui.core.Spacer(), {flex: 1});
                        btnHBoxouter.add(btnHBox);
                        btnHBoxouter.add(new qx.ui.core.Spacer(), {flex: 1});
                        this.armyBar.add(btnHBoxouter, { left : 16, top : 7, right : 0});
                        formation.bind("changeWidth", btnHBox, "width");

                        for (i = 0; i < ClientLib.Base.Util.get_ArmyMaxSlotCountX(); i++) {
                            var btnMirrorV = new qx.ui.form.Button(i, img.Flip.V).set({toolTipText: qxApp.tr("Mirrors units vertically."), width: 25, maxHeight: 19, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints", opacity: 0.3});
                            btnMirrorV.addListener("click", function (e) { this.mirrorFormation("v", parseInt(e.getTarget().getLabel(), 10)); }, this);
                            btnMirrorV.addListener("mouseover", function (e) { e.getTarget().set({opacity: 1.0}); }, this);
                            btnMirrorV.addListener("mouseout", function (e) { e.getTarget().set({opacity: 0.3}); }, this);
                            btnMirrorV.getChildControl("icon").set({width: 14, height: 14, scale: true});
                            var btnShiftUp = new qx.ui.form.Button(i, img.Arrows.Up).set({toolTipText: qxApp.tr("Shifts units one space up."), width: 25, maxHeight: 19, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints", opacity: 0.3});
                            btnShiftUp.addListener("click", function (e) { this.shiftFormation("u", parseInt(e.getTarget().getLabel(), 10)); }, this);
                            btnShiftUp.addListener("mouseover", function (e) { e.getTarget().set({opacity: 1.0}); }, this);
                            btnShiftUp.addListener("mouseout", function (e) { e.getTarget().set({opacity: 0.3}); }, this);
                            var btnShiftDown = new qx.ui.form.Button(i, img.Arrows.Down).set({toolTipText: qxApp.tr("Shifts units one space down."), width: 25, maxHeight: 19, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints", opacity: 0.3});
                            btnShiftDown.addListener("click", function (e) { this.shiftFormation("d", parseInt(e.getTarget().getLabel(), 10)); }, this);
                            btnShiftDown.addListener("mouseover", function (e) { e.getTarget().set({opacity: 1.0}); }, this);
                            btnShiftDown.addListener("mouseout", function (e) { e.getTarget().set({opacity: 0.3}); }, this);
                            btnHBox.add(new qx.ui.core.Spacer(), {flex: 1});
                            btnHBox.add(btnMirrorV);
                            btnHBox.add(new qx.ui.core.Spacer().set({ width: 2 }));
                            btnHBox.add(btnShiftUp);
                            btnHBox.add(btnShiftDown);
                            btnHBox.add(new qx.ui.core.Spacer(), {flex: 1});
                        }

                        //Formation Mirror Buttons//
                        this.mirrorBtnH = new qx.ui.form.Button("", img.Flip.H).set({toolTipText: qxApp.tr("Mirrors units horizontally."), show: "icon", width: 35, height: 35, center: true, alignY: "middle", appearance: "button-text-small"});
                        this.mirrorBtnH.getChildControl("icon").set({width: 20, height: 20, scale: true});
                        this.mirrorBtnH.addListener("click", function () { this.mirrorFormation("h"); }, this);
                        this.mirrorBtnH.hide();
                        this.playArea.add(this.mirrorBtnH, {left: null, right: 6, bottom: 160});

                        this.mirrorBtnV = new qx.ui.form.Button("", img.Flip.V).set({toolTipText: qxApp.tr("Mirrors units vertically."), show: "icon", width: 35, height: 35, center: true, alignY: "middle", appearance: "button-text-small"});
                        this.mirrorBtnV.getChildControl("icon").set({width: 20, height: 20, scale: true});
                        this.mirrorBtnV.addListener("click", function () { this.mirrorFormation("v"); }, this);
                        this.mirrorBtnV.hide();
                        this.playArea.add(this.mirrorBtnV, {left: null, right: 46, bottom: 160});

                        //Disable all Units Button//
                        this.disableAllUnitsBtn = new qx.ui.form.Button("", img.DisableUnit).set({toolTipText: qxApp.tr("Enables/Disables all units."), show: "icon", width: 35, height: 35, center: true, alignY: "middle", appearance: "button-text-small"});
                        this.disableAllUnitsBtn.getChildControl("icon").set({width: 20, height: 20, scale: true});
                        this.disableAllUnitsBtn.addListener("click", function () { this.shiftFormation("n"); }, this);
                        this.disableAllUnitsBtn.hide();
                        this.playArea.add(this.disableAllUnitsBtn, {left: null, right: 6, bottom: 120});

                        //Undo Button//
                        this.armyUndoBtn = new qx.ui.form.Button("", img.Undo).set({toolTipText: qxApp.tr("Undo's formation to previous saved formation.<br>Save formations by hitting<br>the Update or Simulate button."), show: "icon", width: 35, height: 35, center: true, alignY: "middle", appearance: "button-text-small"});
                        this.armyUndoBtn.getChildControl("icon").set({width: 20, height: 20, scale: true});
                        this.armyUndoBtn.addListener("click", function () { this.undoCurrentFormation(); }, this);
                        this.armyUndoBtn.setEnabled(false);
                        this.armyUndoBtn.hide();
                        this.playArea.add(this.armyUndoBtn, {left: null, right: 6, bottom: 200});

                        //Quick Save Button//
                        this.quickSaveBtn = new qx.ui.form.Button(qxApp.tr("QS")).set({toolTipText: qxApp.tr("Saves the current layout<br>without having to open<br>the Formation Saver window.<br>Does not make persistent."), width: 35, height: 35, alignY: "middle", appearance: "button-text-small"});
                        this.quickSaveBtn.addListener("click", function () { Simulator.LayoutWindow.getInstance().saveNewLayout(true); }, this);
                        this.quickSaveBtn.hide();
                        this.playArea.add(this.quickSaveBtn, {left: null, right: 6, bottom: 240});

                        //Simulator Back Button//
                        this.backBtn = new qx.ui.form.Button(qxApp.tr("Back")).set({toolTipText: qxApp.tr("Return to Combat Setup."), width: 50, height: 24, appearance: "button-text-small"});
                        this.backBtn.addListener("click", function () { this.backToCombatSetup(); }, this);
                        this.replayBar.add(this.backBtn, {top: 37, left: 255});

                        this.replayStatBtn = new qx.ui.form.Button(qxApp.tr("Stats")).set({toolTipText: qxApp.tr("Opens Simulator Stats Window."), width: 50, height: 24, appearance: "button-text-small"});
                        this.replayStatBtn.addListener("click", function () { this.__openStatWindow(); }, this);
                        this.replayBar.add(this.replayStatBtn, {top: 7, left: 255});

                        phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this._onViewChanged);
                    } catch (e) {
                        console.log("Error setting up Simulator Constructor: ");
                        console.log(e.toString());
                    }
                },
                destruct: function () {},
                members: {
                    armyBar: null,
                    playArea: null,
                    replayBar: null,
                    isSimButtonDisabled: null,
                    armyTempFormations: null,
                    armyTempIdx: null,
                    isSimulation: null,
                    simBtn: null,
                    optionBtn: null,
                    statBtn: null,
                    layoutBtn: null,
                    unlockCmtBtn: null,
                    unlockRTBtn: null,
                    shiftUpBtn: null,
                    shiftDownBtn: null,
                    shiftLeftBtn: null,
                    shiftRightBtn: null,
                    disableAllUnitsBtn: null,
                    armyUndoBtn: null,
                    quickSaveBtn: null,
                    backBtn: null,
                    replayStatBtn: null,
                    _onViewChanged: function (oldMode, newMode) {
                        try {
                            if (newMode != ClientLib.Vis.Mode.CombatSetup && newMode != ClientLib.Vis.Mode.Battleground) {
                                Simulator.getInstance().armyTempFormations = [];
                                Simulator.getInstance().armyTempIdx = 0;
                                Simulator.getInstance().armyUndoBtn.setEnabled(false);
                                Simulator.getInstance().isSimulation = false;
                                localStorage['allUnitsDisabled'] = "no";
                            } else if (newMode == ClientLib.Vis.Mode.CombatSetup && oldMode != ClientLib.Vis.Mode.Battleground) {
                                Simulator.getInstance().saveTempFormation();
                            }

                            var cityId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Id();
                            var ownCityId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_Id();
                            if (ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity() !== null) {
                                if (newMode == ClientLib.Vis.Mode.Battleground || cityId == ownCityId) {
                                    Simulator.getInstance().shiftUpBtn.hide();
                                    Simulator.getInstance().shiftDownBtn.hide();
                                    Simulator.getInstance().shiftLeftBtn.hide();
                                    Simulator.getInstance().shiftRightBtn.hide();
                                    Simulator.getInstance().disableAllUnitsBtn.hide();
                                    Simulator.getInstance().mirrorBtnH.hide();
                                    Simulator.getInstance().mirrorBtnV.hide();
                                    Simulator.getInstance().armyUndoBtn.hide();
                                    Simulator.getInstance().quickSaveBtn.hide();
                                } else if (cityId != ownCityId) {
                                    Simulator.getInstance().shiftUpBtn.show();
                                    Simulator.getInstance().shiftDownBtn.show();
                                    Simulator.getInstance().shiftLeftBtn.show();
                                    Simulator.getInstance().shiftRightBtn.show();
                                    Simulator.getInstance().disableAllUnitsBtn.show();
                                    Simulator.getInstance().mirrorBtnH.show();
                                    Simulator.getInstance().mirrorBtnV.show();
                                    Simulator.getInstance().armyUndoBtn.show();
                                    Simulator.getInstance().quickSaveBtn.show();
                                }
                            }
                        } catch (e) {
                            console.log("Error closing windows or hiding buttons on view change");
                            console.log(e.toString());
                        }
                    },
                    __openSimulatorWindow: function () {
                        var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
                        if (city != null) {
                            var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();

                            this.isSimulation = true;
                            this.saveTempFormation();

                            localStorage.ta_sim_last_city = city.get_Id();

                            ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
                            ClientLib.API.Battleground.GetInstance().SimulateBattle();
                            var app = qx.core.Init.getApplication();

                            app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay, city.get_Id(), 0, 0);

                            var autoSim = localStorage['autoSimulate'];

                            if (autoSim !== undefined) {
                                if (autoSim == "yes") {
                                    var speed = localStorage['simulateSpeed'];
                                    setTimeout(function () {
                                        var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
                                        battleground.RestartReplay();
                                        battleground.set_ReplaySpeed(parseInt(speed, 10));
                                    }, 1000);
                                }
                            }

                            if (this.isSimButtonDisabled == false) {
                                this.disableSimulateButtonTimer(10000);
                                if (typeof Simulator.StatWindow.getInstance().disableSimulateStatButtonTimer === "function") {
                                    Simulator.StatWindow.getInstance().disableSimulateStatButtonTimer(10000);
                                }
                            }

                            if (Simulator.StatWindow.getInstance().simReplayBtn.getEnabled() == false) {
                                Simulator.StatWindow.getInstance().simReplayBtn.setEnabled(true);
                            }
                        }
                    },
                    __openOptionWindow: function () {
                        try {
                            if (Simulator.OptionWindow.getInstance().isVisible()) {
                                console.log("Closing Option Window");
                                Simulator.OptionWindow.getInstance().close();
                            } else {
                                console.log("Opening Option Window");
                                Simulator.OptionWindow.getInstance().open();
                            }
                        } catch (e) {
                            console.log("Error Opening or Closing Option Window");
                            console.log(e.toString());
                        }
                    },
                    __openStatWindow: function () {
                        try {
                            if (Simulator.StatWindow.getInstance().isVisible()) {
                                console.log("Closing Stat Window");
                                Simulator.StatWindow.getInstance().close();
                            } else {
                                console.log("Opening Stat Window");
                                Simulator.StatWindow.getInstance().open();
                            }
                        } catch (e) {
                            console.log("Error Opening or Closing Stat Window");
                            console.log(e.toString());
                        }
                    },
                    __openLayoutWindow: function () {
                        try {
                            if (Simulator.LayoutWindow.getInstance().isVisible()) {
                                console.log("Closing Layout Window");
                                Simulator.LayoutWindow.getInstance().close();
                            } else {
                                console.log("Opening LayoutWindow");
                                Simulator.LayoutWindow.getInstance().updateLayoutList();
                                Simulator.LayoutWindow.getInstance().layoutTextBox.setValue("");
                                Simulator.LayoutWindow.getInstance().persistentCheck.setValue(false);
                                Simulator.LayoutWindow.getInstance().open();
                            }
                        } catch (e) {
                            console.log("Error Opening or Closing Layout Window");
                            console.log(e.toString());
                        }
                    },
                    saveTempFormation: function () {
                        try {
                            var units = this.getCityPreArmyUnits().get_ArmyUnits().l;
                            if (this.armyTempFormations.length != 0) {
                                for (var i = 0; i < units.length; i++) {
                                    var lastForm = this.armyTempFormations[this.armyTempIdx][i];
                                    if ((units[i].get_CoordX() != lastForm.x) || (units[i].get_CoordY() != lastForm.y)) {
                                        break;
                                    } else if ((i + 1) == units.length) {
                                        return;
                                    }
                                }
                            }

                            var formation = new Array();

                            for (var i = 0; i < units.length; i++) {
                                var unit = units[i];
                                var unitInfo = {};
                                unitInfo.x = unit.get_CoordX();
                                unitInfo.y = unit.get_CoordY();
                                unitInfo.id = unit.get_Id();
                                unitInfo.enabled = unit.get_Enabled();

                                formation.push(unitInfo);
                            }

                            this.armyTempFormations.push(formation);
                            this.armyTempIdx = this.armyTempFormations.length - 1;
                            if (this.armyTempFormations.length > 1)
                                this.armyUndoBtn.setEnabled(true);
                        } catch (e) {
                            console.log("Error Saving Temp Formation");
                            console.log(e.toString());
                        }
                    },
                    undoCurrentFormation: function () {
                        try {
                            this.restoreFormation(this.armyTempFormations[(this.armyTempIdx - 1)]);

                            //get rid of last element now that we have undone it.
                            this.armyTempFormations.splice(this.armyTempIdx, 1);
                            this.armyTempIdx--;

                            if (this.armyTempFormations.length == 1)
                                this.armyUndoBtn.setEnabled(false);
                        } catch (e) {
                            console.log("Error undoing formation");
                            console.log(e.toString());
                        }
                    },
                    mirrorFormation: function (direction, sel) {
                        try {
                            console.log("Shifting Unit Formation");

                            var units = this.getCityPreArmyUnits().get_ArmyUnits().l;

                            var newLayout = [];
                            for (var i = 0; i < units.length; i++) {
                                var unit = units[i],
                                    armyUnit = {},
                                    x = unit.get_CoordX(),
                                    y = unit.get_CoordY();
                                if (direction == "h") x = Math.abs(x - 8);
                                if (direction == "v") y = Math.abs(y - 3);
                                if (sel !== undefined && unit.get_CoordY() != sel && direction == "h") armyUnit.x = unit.get_CoordX();
                                else armyUnit.x = x;
                                if (sel !== undefined && unit.get_CoordX() != sel && direction == "v") armyUnit.y = unit.get_CoordY();
                                else armyUnit.y = y;
                                armyUnit.id = unit.get_Id();
                                armyUnit.enabled = unit.get_Enabled();
                                newLayout.push(armyUnit);
                            }
                            this.restoreFormation(newLayout);
                        } catch (e) {
                            console.log("Error Mirroring Formation");
                            console.log(e.toString());
                        }
                    },
                    shiftFormation: function (direction, sel) {
                        try {
                            var v_shift = 0;
                            var h_shift = 0;

                            if (direction == "u") var v_shift = -1;
                            if (direction == "d") var v_shift = 1;
                            if (direction == "l") var h_shift = -1;
                            if (direction == "r") var h_shift = 1;

                            if (v_shift == 0 && h_shift == 0 && direction != "n")
                                return;

                            var units = this.getCityPreArmyUnits().get_ArmyUnits().l;

                            var newLayout = [];
                            for (var i = 0; i < units.length; i++) {
                                var unit = units[i];
                                var armyUnit = {};
                                var x = unit.get_CoordX() + h_shift;
                                switch (x) {
                                case 9:
                                    x = 0;
                                    break;
                                case -1:
                                    x = 8;
                                    break;
                                }
                                var y = unit.get_CoordY() + v_shift;
                                switch (y) {
                                case 4:
                                    y = 0;
                                    break;
                                case -1:
                                    y = 3;
                                    break;
                                }
                                if (sel !== undefined && unit.get_CoordY() != sel && (direction == "l" || direction == "r")) armyUnit.x = unit.get_CoordX();
                                else armyUnit.x = x;
                                if (sel !== undefined && unit.get_CoordX() != sel && (direction == "u" || direction == "d")) armyUnit.y = unit.get_CoordY();
                                else armyUnit.y = y;
                                armyUnit.id = unit.get_Id();

                                if (direction == "n") {
                                    if (localStorage['allUnitsDisabled'] !== undefined) {
                                        if (localStorage['allUnitsDisabled'] == "yes") {
                                            armyUnit.enabled = unit.set_Enabled(true);
                                        } else {
                                            armyUnit.enabled = unit.set_Enabled(false);
                                        }
                                    } else {
                                        armyUnit.enabled = unit.set_Enabled(false);
                                    }
                                }
                                armyUnit.enabled = unit.get_Enabled();
                                newLayout.push(armyUnit);
                            }
                            if (direction == "n") {
                                if (localStorage['allUnitsDisabled'] == "yes")
                                    localStorage['allUnitsDisabled'] = "no";
                                else
                                    localStorage['allUnitsDisabled'] = "yes";
                            }
                            this.restoreFormation(newLayout);
                        } catch (e) {
                            console.log("Error Shifting Units");
                            console.log(e.toString());
                        }
                    },
                    restoreFormation: function (layout) {
                        try {
                            var sUnits = layout;

                            var units = this.getCityPreArmyUnits();
                            var units_list = units.get_ArmyUnits().l;

                            for (var idx = 0; idx < sUnits.length; idx++)
                            {
                                var saved_unit = sUnits[idx];
                                var uid = saved_unit.id;
                                for (var i = 0; i < units_list.length; i++)
                                {
                                    if (units_list[i].get_Id() === uid)
                                    {
                                        units_list[i].MoveBattleUnit(saved_unit.x, saved_unit.y);
                                        if (saved_unit.enabled === undefined)
                                            units_list[i].set_Enabled(true);
                                        else
                                            units_list[i].set_Enabled(saved_unit.enabled);
                                    }
                                }
                            }
                            units.UpdateFormation(true);
                        } catch (e) {
                            console.log("Error Restoring Formation");
                            console.log(e.toString());
                        }
                    },
                    getCityPreArmyUnits: function () {
                        var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
                        var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                        var formationManager = ownCity.get_CityArmyFormationsManager();
                        formationManager.set_CurrentTargetBaseId(city.get_Id());
                        return formationManager.GetFormationByTargetBaseId(formationManager.get_CurrentTargetBaseId());
                    },
                    timeoutCmtBtn: function () {
                        this.unlockCmtBtn.exclude();
                        setTimeout(function () {
                            Simulator.getInstance().unlockCmtBtn.show();
                        }, 3000);
                    },
                    timeoutRTBtn: function () {
                        this.unlockRTBtn.exclude();
                        setTimeout(function () {
                            Simulator.getInstance().unlockRTBtn.show();
                        }, 3000);
                    },
                    backToCombatSetup: function () {
                        try {
                            var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
                            if (city != null) {
                                var app = qx.core.Init.getApplication();
                                app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense, city.get_Id(), 0, 0);
                            }
                        } catch (e) {
                            console.log("Error closing Simulation Window");
                            console.log(e.toString());
                        }
                    },
                    disableSimulateButtonTimer: function (timer) {
                        try {
                            if (timer >= 1000) {
                                this.isSimButtonDisabled = true;
                                this.simBtn.setEnabled(false);
                                this.simBtn.setLabel(Math.floor(timer / 1000));
                                timer -= 1000;
                                setTimeout(function () {
                                    Simulator.getInstance().disableSimulateButtonTimer(timer);
                                }, 1000);
                            } else {
                                setTimeout(function () {
                                    var qxApp = qx.core.Init.getApplication();
                                    Simulator.getInstance().simBtn.setEnabled(true);
                                    if (Simulator.OptionWindow.getInstance()._buttonSizeCB.getValue())
                                        Simulator.getInstance().simBtn.setLabel(qxApp.tr("Simulate"));
                                    else
                                        Simulator.getInstance().simBtn.setLabel(qxApp.tr("S"));
                                }, timer);
                                this.isSimButtonDisabled = false;
                            }
                        } catch (e) {
                            console.log("Error disabling simulator button");
                            console.log(e.toString());
                        }
                    },
                    hideArmyTooltips: function () {
                        try {
                            if (localStorage["ArmyUnitTooltipDisabled"] === undefined) localStorage["ArmyUnitTooltipDisabled"] = "yes";
                            var Baseview = ClientLib.Vis.BaseView.BaseView.prototype;
                            for (var i in Baseview) {
                                if (typeof Baseview[i] === "function" && Baseview[i] === Baseview.ShowToolTip) {
                                    Baseview.ShowToolTip2 = Baseview[i];
                                    Baseview[i] = function (a) {
                                        if (ClientLib.Vis.VisMain.GetInstance().get_Mode() == ClientLib.Vis.Mode.CombatSetup && localStorage['ArmyUnitTooltipDisabled'] == 'yes') return;
                                        else this.ShowToolTip2(a);
                                    };
                                    break;
                                }
                            }
                            var ArmyUnitTooltipOverlay = qx.core.Init.getApplication().getArmyUnitTooltipOverlay();
                            ArmyUnitTooltipOverlay.setVisibility2 = ArmyUnitTooltipOverlay.setVisibility;
                            ArmyUnitTooltipOverlay.setVisibility = function (a) {
                                if (localStorage["ArmyUnitTooltipDisabled"] == "yes") this.setVisibility2(false);
                                else this.setVisibility2(a);
                            };
                        } catch (e) {
                            console.log("Error hideArmyTooltips()");
                            console.log(e.toString());
                        }
                    }
                }
            });
            qx.Class.define("Simulator.StatWindow", {
                type: "singleton",
                extend: qx.ui.window.Window,
                construct: function () {
                    try {
                        var qxApp = qx.core.Init.getApplication();
                        this.base(arguments);

                        this.set({
                            layout: new qx.ui.layout.VBox().set({
                                spacing: 0
                            }),
                            caption: qxApp.tr("Simulator") + " - " + qxApp.tr("Stats"),
                            icon: "FactionUI/icons/icon_res_plinfo_command_points.png",
                            contentPadding: 5,
                            contentPaddingTop: 0,
                            allowMaximize: false,
                            showMaximize: false,
                            allowMinimize: false,
                            showMinimize: false,
                            resizable: true,
                            resizableTop: false,
                            resizableBottom: false
                        });
                        this.getChildControl("icon").set({ width : 18, height : 18, scale : true, alignY : "middle" });

                        if (localStorage['statWindowPosLeft'] !== undefined) {
                            var left = parseInt(localStorage['statWindowPosLeft'], 10);
                            var top = parseInt(localStorage['statWindowPosTop'], 10);
                            this.moveTo(left, top);
                        } else {
                            this.moveTo(124, 31);
                        }

                        if (localStorage['simViews'] !== undefined) {
                            this.simViews = parseInt(localStorage['simViews'], 10);
                        } else {
                            this.simViews = 3;
                        }

                        this.isSimStatButtonDisabled = false;

                        /**
                         *   Setup Images
                         */

                        var img = {
                            Enemy: {
                                All: "FactionUI/icons/icon_arsnl_show_all.png",
                                Base: "FactionUI/icons/icon_arsnl_base_buildings.png",
                                Defense: "FactionUI/icons/icon_def_army_points.png"
                            },
                            Defense: {
                                Infantry: "FactionUI/icons/icon_arsnl_def_squad.png",
                                Vehicle: "FactionUI/icons/icon_arsnl_def_vehicle.png",
                                Building: "FactionUI/icons/icon_arsnl_def_building.png"
                            },
                            Offense: {
                                Infantry: "FactionUI/icons/icon_arsnl_off_squad.png",
                                Vehicle: "FactionUI/icons/icon_arsnl_off_vehicle.png",
                                Aircraft: "FactionUI/icons/icon_arsnl_off_plane.png"
                            },
                            Repair: {
                                Storage: "webfrontend/ui/icons/icn_repair_points.png",
                                Overall: "webfrontend/ui/icons/icn_repair_off_points.png",
                                Infantry: "webfrontend/ui/icons/icon_res_repair_inf.png",
                                Vehicle: "webfrontend/ui/icons/icon_res_repair_tnk.png",
                                Aircraft: "webfrontend/ui/icons/icon_res_repair_air.png"
                            },
                            Loot: {
                                Tiberium: "webfrontend/ui/common/icn_res_tiberium.png",
                                Crystal: "webfrontend/ui/common/icn_res_chrystal.png",
                                Credits: "webfrontend/ui/common/icn_res_dollar.png",
                                RP: "webfrontend/ui/common/icn_res_research_mission.png",
                                Total: "FactionUI/icons/icon_transfer_resource.png"
                            }
                        };

                        /**
                         *   Setup Stats Window
                         */

                        //Battle Section//
                        this.Battle = new qx.ui.container.Composite(new qx.ui.layout.HBox(-3)).set({decorator: "pane-light-plain", allowGrowX: true, marginLeft: 0, marginRight: 0});
                        var BattleLables = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({width: 29, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0});

                        var BattleOutcome = new qx.ui.basic.Label("O").set({toolTipText: qxApp.tr("tnf:combat report"), alignX: "center", alignY: "middle"});
                        var BattleDuration = new qx.ui.basic.Label("D").set({toolTipText: qxApp.tr("tnf:combat timer npc: %1", ""), alignX: "center", alignY: "middle"});
                        var BattleOwnCity = new qx.ui.basic.Label("B").set({toolTipText: qxApp.tr("tnf:base"), alignX: "center", alignY: "middle"});

                        BattleLables.add(BattleOutcome);
                        BattleLables.add(BattleDuration);
                        BattleLables.add(BattleOwnCity);
                        this.Battle.add(BattleLables);
                        this.add(this.Battle);

                        //Enemy Health Section//
                        var EnemyHealthHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({decorator: "pane-light-opaque"});
                        EnemyHealthHeader.add(new qx.ui.basic.Label(qxApp.tr("tnf:combat target")).set({alignX: "center", alignY: "middle", paddingBottom: 5, font: "font_size_13_bold"}));
                        this.add(EnemyHealthHeader);

                        this.EnemyHealth = new qx.ui.container.Composite(new qx.ui.layout.HBox(-3)).set({decorator: "pane-light-plain", allowGrowX: true, marginLeft: 0, marginRight: 0});
                        var EnemyHealthLabels = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({width: 29, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0});

                        var EnemyHealthLabelOverall = new qx.ui.basic.Atom(null, img.Enemy.All).set({toolTipText: qxApp.tr("tnf:total"), toolTipIcon: img.Enemy.All, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var EnemyHealthLabelBase = new qx.ui.basic.Atom(null, img.Enemy.Base).set({toolTipText: qxApp.tr("tnf:base"), toolTipIcon: img.Enemy.Base, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var EnemyHealthLabelDefense = new qx.ui.basic.Atom(null, img.Enemy.Defense).set({toolTipText: qxApp.tr("tnf:defense"), toolTipIcon: img.Enemy.Defense, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var EnemyHealthLabelCY = new qx.ui.basic.Label("CY").set({toolTipText: GAMEDATA.Tech[1].dn, alignX: "center", alignY: "middle"});
                        var EnemyHealthLabelDF = new qx.ui.basic.Label("DF").set({toolTipText: GAMEDATA.Tech[42].dn, alignX: "center", alignY: "middle"});
                        var EnemyHealthLabelCC = new qx.ui.basic.Label("CC").set({toolTipText: GAMEDATA.Tech[24].dn, alignX: "center", alignY: "middle"});

                        EnemyHealthLabelOverall.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        EnemyHealthLabelBase.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        EnemyHealthLabelDefense.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});

                        EnemyHealthLabels.add(EnemyHealthLabelOverall);
                        EnemyHealthLabels.add(EnemyHealthLabelBase);
                        EnemyHealthLabels.add(EnemyHealthLabelDefense);
                        EnemyHealthLabels.add(EnemyHealthLabelCY);
                        EnemyHealthLabels.add(EnemyHealthLabelDF);
                        EnemyHealthLabels.add(EnemyHealthLabelCC);
                        this.EnemyHealth.add(EnemyHealthLabels);
                        this.add(this.EnemyHealth);

                        //Repair Section//
                        var RepairHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({decorator: "pane-light-opaque"});
                        RepairHeader.add(new qx.ui.basic.Label(qxApp.tr("tnf:own repair cost")).set({alignX: "center", alignY: "middle", paddingBottom: 5, font: "font_size_13_bold"}));
                        this.add(RepairHeader);

                        this.Repair = new qx.ui.container.Composite(new qx.ui.layout.HBox(-3)).set({decorator: "pane-light-plain", allowGrowX: true, marginLeft: 0, marginRight: 0});
                        var RepairLabels = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({width: 29, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0});

                        var pRLabelStorage = new qx.ui.basic.Atom(null, img.Repair.Storage).set({toolTipText: qxApp.tr("tnf:offense repair time"), toolTipIcon: img.Repair.Storage, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var pRLabelOverall = new qx.ui.basic.Atom(null, img.Repair.Overall).set({toolTipText: qxApp.tr("tnf:repair points"), toolTipIcon: img.Repair.Overall, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var pRLabelInf = new qx.ui.basic.Atom(null, img.Repair.Infantry).set({toolTipText: qxApp.tr("tnf:infantry repair title"), toolTipIcon: img.Repair.Infantry, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var pRLabelVehi = new qx.ui.basic.Atom(null, img.Repair.Vehicle).set({toolTipText: qxApp.tr("tnf:vehicle repair title"), toolTipIcon: img.Repair.Vehicle, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var pRLabelAir = new qx.ui.basic.Atom(null, img.Repair.Aircraft).set({toolTipText: qxApp.tr("tnf:aircraft repair title"), toolTipIcon: img.Repair.Aircraft, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});

                        pRLabelStorage.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        pRLabelOverall.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        pRLabelInf.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        pRLabelVehi.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        pRLabelAir.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});

                        RepairLabels.add(pRLabelStorage);
                        RepairLabels.add(pRLabelOverall);
                        RepairLabels.add(pRLabelInf);
                        RepairLabels.add(pRLabelVehi);
                        RepairLabels.add(pRLabelAir);
                        this.Repair.add(RepairLabels);
                        this.add(this.Repair);

                        //Loot Section//
                        var LootHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({decorator: "pane-light-opaque"});
                        LootHeader.add(new qx.ui.basic.Label(qxApp.tr("tnf:lootable resources:")).set({alignX: "center", alignY: "middle", paddingBottom: 5, font: "font_size_13_bold"}));
                        this.add(LootHeader);

                        this.Loot = new qx.ui.container.Composite(new qx.ui.layout.HBox(-3)).set({decorator: "pane-light-plain", allowGrowX: true, marginLeft: 0, marginRight: 0});
                        var LootLabels = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({width: 29, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0});

                        var LootLabelTib = new qx.ui.basic.Atom(null, img.Loot.Tiberium).set({toolTipText: qxApp.tr("tnf:tiberium"), toolTipIcon: img.Loot.Tiberium, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var LootLabelCry = new qx.ui.basic.Atom(null, img.Loot.Crystal).set({toolTipText: qxApp.tr("tnf:crystals"), toolTipIcon: img.Loot.Crystal, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var LootLabelCred = new qx.ui.basic.Atom(null, img.Loot.Credits).set({toolTipText: qxApp.tr("tnf:credits"), toolTipIcon: img.Loot.Credits, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var LootLabelRP = new qx.ui.basic.Atom(null, img.Loot.RP).set({toolTipText: qxApp.tr("tnf:research points"), toolTipIcon: img.Loot.RP, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var LootLabelTotal = new qx.ui.basic.Atom(null, img.Loot.Total).set({toolTipText: qxApp.tr("tnf:total") + " " + qxApp.tr("tnf:loot"), toolTipIcon: img.Loot.Total, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});

                        LootLabelTib.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        LootLabelCry.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        LootLabelCred.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        LootLabelRP.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        LootLabelTotal.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});

                        LootLabels.add(LootLabelTib);
                        LootLabels.add(LootLabelCry);
                        LootLabels.add(LootLabelCred);
                        LootLabels.add(LootLabelRP);
                        LootLabels.add(LootLabelTotal);
                        this.Loot.add(LootLabels);
                        this.add(this.Loot);

                        //Simulate Button//
                        var simButton = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({decorator: "pane-light-opaque", allowGrowX: true, marginLeft: 0, marginRight: 0, padding: 5});
                        this.add(simButton);

                        this.simStatBtn = new qx.ui.form.Button(qxApp.tr("tnf:update")).set({allowGrowX: false});
                        this.simStatBtn.setToolTipText(qxApp.tr("Updates Simulation Stats."));
                        this.simStatBtn.addListener("click", this.simulateStats, this);

                        this.simReplayBtn = new qx.ui.form.Button(qxApp.tr("tnf:show combat")).set({allowGrowX: false});
                        this.simReplayBtn.setToolTipText(qxApp.tr("tnf:show battle replay"));
                        this.simReplayBtn.addListener("click", this.doSimReplay, this);

                        this.simReplayBtn.setEnabled(false);

                        simButton.add(this.simStatBtn, {width: "50%"});
                        simButton.add(this.simReplayBtn, {width: "50%"});

                        //Add Header Events//
                        EnemyHealthHeader.addListener("click", function () {
                            if (this.EnemyHealth.isVisible()) this.EnemyHealth.exclude();
                            else this.EnemyHealth.show();
                        }, this);

                        RepairHeader.addListener("click", function () {
                            if (this.Repair.isVisible()) this.Repair.exclude();
                            else this.Repair.show();
                        }, this);

                        LootHeader.addListener("click", function () {
                            if (this.Loot.isVisible()) this.Loot.exclude();
                            else this.Loot.show();
                        }, this);

                        //Hide Sections
                        if (localStorage['hideHealth'] !== undefined) {
                            if (localStorage['hideHealth'] == "yes") this.EnemyHealth.exclude();
                        }

                        if (localStorage['hideRepair'] !== undefined) {
                            if (localStorage['hideRepair'] == "yes") this.Repair.exclude();
                        }

                        if (localStorage['hideLoot'] !== undefined) {
                            if (localStorage['hideLoot'] == "yes") this.Loot.exclude();
                        }

                        /**
                         *   Setup Simulation Storage
                         */
                        for (var i = 0; i < this.simViews; i++) {
                            this.sim[i] = new this.Simulation(i);
                            this.sim[i].Select(this.simSelected);
                            this.Battle.add(this.sim[i].Label.Battle.container, { flex : 1 });
                            this.EnemyHealth.add(this.sim[i].Label.EnemyHealth.container, { flex : 1 });
                            this.Repair.add(this.sim[i].Label.Repair.container, { flex : 1 });
                            this.Loot.add(this.sim[i].Label.Loot.container, { flex : 1 });
                        }


                        //Events
                        phe.cnc.Util.attachNetEvent(ClientLib.API.Battleground.GetInstance(), "OnSimulateBattleFinished", ClientLib.API.OnSimulateBattleFinished, this, this.__OnSimulateBattleFinished);
                        phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this._onViewChanged);
                        phe.cnc.base.Timer.getInstance().addListener("uiTick", this._onTick, this);
                    } catch (e) {
                        console.log("Error setting up Simulator.StatWindow Constructor: ");
                        console.log(e.toString());
                    }
                },
                destruct: function () {},
                members: {
                    Battle: null,
                    EnemyHealth: null,
                    Repair: null,
                    Loot: null,
                    simStatBtn: null,
                    simReplayBtn: null,
                    isSimStatButtonDisabled: null,
                    simSelected: 0,
                    simViews: 3,
                    sim: [],
                    Simulation: function (instance) {
                        try {
                            var simulated = false;
                            this.TargetCity = null;
                            this.OwnCity = null;
                            var Formation = null;
                            this.Result = null;
                            this.Label = {
                                Battle: {
                                    container: new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({width: 65, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0, decorator: "pane-light-opaque"}),
                                    Outcome:   new qx.ui.basic.Atom("-", null).set({alignX: "center", alignY: "middle", gap: 0, iconPosition: "top", show: "label"}),
                                    Duration:  new qx.ui.basic.Label("-:--").set({alignX: "center", alignY: "middle"}),
                                    OwnCity:   new qx.ui.basic.Label("-").set({alignX: "center", alignY: "middle"})
                                },
                                EnemyHealth: {
                                    container: new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({width: 65, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0, decorator: "pane-light-opaque"}),
                                    Overall:   new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                    Base:      new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                    Defense:   new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                    CY:        new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                    DF:        new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                    CC:        new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"})
                                },
                                Repair: {
                                    container: new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({width: 65, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0, decorator: "pane-light-opaque"}),
                                    Storage:   new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                    Overall:   new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle", rich: true}),
                                    Inf:       new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                    Vehi:      new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                    Air:       new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"})
                                },
                                Loot: {
                                    container: new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({width: 65, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0, decorator: "pane-light-opaque"}),
                                    Tib:       new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                    Cry:       new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                    Cred:      new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                    RP:        new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                    Overall:   new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"})
                                }
                            };
                            var _StatsUnit = function () {
                                    this.StartHealth = 0;
                                    this.EndHealth = 0;
                                    this.MaxHealth = 0;
                                    this.Tib = 0;
                                    this.Cry = 0;
                                    this.RT = 0;
                                    this.getHP = function () {
                                        if (this.EndHealth == 0 && this.StartHealth == 0) return 0;
                                        else if (this.MaxHealth == 0) return 100;
                                        else return (this.EndHealth / this.MaxHealth) * 100;
                                    };
                                    this.getHPrel = function () {
                                        if (this.StartHealth == 0) return 0;
                                        else if (this.MaxHealth == 0) return -100;
                                        else return ((this.StartHealth - this.EndHealth) / this.MaxHealth) * -100;
                                    };
                            };
                            var _StatsLoot = function () {
                                    this.Base = 0;
                                    this.Battle = 0;
                            };
                            this.Stats = {
                                Battle: {
                                    Outcome:   0,
                                    Duration:  0,
                                    OwnCity:  ""
                                },
                                EnemyHealth: {
                                    Overall:   new _StatsUnit(),
                                    Base:      new _StatsUnit(),
                                    Defense:   new _StatsUnit(),
                                    CY:        new _StatsUnit(),
                                    DF:        new _StatsUnit(),
                                    CC:        new _StatsUnit()
                                },
                                Repair: {
                                    Storage:   0,
                                    Overall:   new _StatsUnit(),
                                    Inf:       new _StatsUnit(),
                                    Vehi:      new _StatsUnit(),
                                    Air:       new _StatsUnit()
                                },
                                Loot: {
                                    Tib:       new _StatsLoot(),
                                    Cry:       new _StatsLoot(),
                                    Cred:      new _StatsLoot(),
                                    RP:        new _StatsLoot(),
                                    Overall:   new _StatsLoot()
                                }
                            };
                            this.getLootFromCurrentCity = function () {
                                try {
                                    this.Stats.Loot.Tib.Base = 0;
                                    this.Stats.Loot.Cry.Base = 0;
                                    this.Stats.Loot.Cred.Base = 0;
                                    this.Stats.Loot.RP.Base = 0;
                                    this.Stats.Loot.Overall.Base = 0;
                                    var loot = ClientLib.API.Battleground.GetInstance().GetLootFromCurrentCity();
                                    for (var i = 0; i < loot.length; i++) {
                                        this.Stats.Loot.Overall.Base += loot[i].Count;
                                        switch (parseInt(loot[i].Type, 10)) {
                                        case ClientLib.Base.EResourceType.Tiberium:
                                            this.Stats.Loot.Tib.Base += loot[i].Count;
                                            break;
                                        case ClientLib.Base.EResourceType.Crystal:
                                            this.Stats.Loot.Cry.Base += loot[i].Count;
                                            break;
                                        case ClientLib.Base.EResourceType.Gold:
                                            this.Stats.Loot.Cred.Base += loot[i].Count;
                                            break;
                                        case ClientLib.Base.EResourceType.ResearchPoints:
                                            this.Stats.Loot.RP.Base += loot[i].Count;
                                            break;
                                        }
                                    }
                                } catch (e) {
                                    console.log("Error Getting Loot from Current City");
                                    console.log(e.toString());
                                }
                            };
                            this.setSimulation = function (data) {
                                simulated = true;
                                this.OwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                                this.Stats.Battle.OwnCity = this.OwnCity.get_Name();
                                this.saveFormation();
                                this.Result = [];
                                for (var i = 0; i < data.length; i++) this.Result.push(data[i].Value);
                            };
                            this.UpdateLabels = function () {
                                var qxApp = qx.core.Init.getApplication();
                                var formatTime = function (time) {
                                    return phe.cnc.Util.getTimespanString(time);
                                };
                                var setRTLabelColor = function (label, number) {
                                    if (number < 25) label.setTextColor("red");
                                    else if (number < 75) label.setTextColor("orangered");
                                    else label.setTextColor("darkgreen");
                                };
                                var setEHLabelColor = function (label, number) {
                                    if (number < 25) label.setTextColor("darkgreen");
                                    else if (number < 75) label.setTextColor("orangered");
                                    else label.setTextColor("red");
                                };

                                if (simulated) {
                                    //Battle.Outcome
                                    switch (this.Stats.Battle.Outcome) {
                                    case 1:
                                        this.Label.Battle.Outcome.resetLabel();
                                        this.Label.Battle.Outcome.set({ show: "icon" });
                                        this.Label.Battle.Outcome.setIcon("FactionUI/icons/icon_reports_total_defeat.png");
                                        this.Label.Battle.Outcome.setToolTipIcon("FactionUI/icons/icon_reports_total_defeat.png");
                                        this.Label.Battle.Outcome.setToolTipText(qxApp.tr("tnf:total defeat"));
                                        break;
                                    case 2:
                                        this.Label.Battle.Outcome.resetLabel();
                                        this.Label.Battle.Outcome.set({ show: "icon" });
                                        this.Label.Battle.Outcome.setIcon("FactionUI/icons/icon_reports_victory.png");
                                        this.Label.Battle.Outcome.setToolTipIcon("FactionUI/icons/icon_reports_victory.png");
                                        this.Label.Battle.Outcome.setToolTipText(qxApp.tr("tnf:victory"));
                                        break;
                                    case 3:
                                        this.Label.Battle.Outcome.resetLabel();
                                        this.Label.Battle.Outcome.set({ show: "icon" });
                                        this.Label.Battle.Outcome.setIcon("FactionUI/icons/icon_reports_total_victory.png");
                                        this.Label.Battle.Outcome.setToolTipIcon("FactionUI/icons/icon_reports_total_victory.png");
                                        this.Label.Battle.Outcome.setToolTipText(qxApp.tr("tnf:total victory"));
                                        break;
                                    }
                                    //Battle.Duration
                                    this.Label.Battle.Duration.setValue(formatTime(this.Stats.Battle.Duration/1000));
                                    //Battle.OwnCity
                                    if (this.OwnCity != null) this.Stats.Battle.OwnCity = this.OwnCity.get_Name();
                                    this.Label.Battle.OwnCity.setValue(this.Stats.Battle.OwnCity);

                                    switch (localStorage['getEHSelection']) {
                                    case "hp rel":
                                        //EnemyHealth.Overall
                                        this.Label.EnemyHealth.Overall.setValue(this.Stats.EnemyHealth.Overall.getHPrel().toFixed(2) + "%");
                                        this.Label.EnemyHealth.Overall.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.EnemyHealth.Overall.RT) + "<br>" + qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Overall.Tib) + "<br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Overall.Cry));
                                        //EnemyHealth.Base
                                        this.Label.EnemyHealth.Base.setValue(this.Stats.EnemyHealth.Base.getHPrel().toFixed(2) + "%");
                                        this.Label.EnemyHealth.Base.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.EnemyHealth.Base.RT) + "<br>" + qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Base.Tib));
                                        //EnemyHealth.Defense
                                        this.Label.EnemyHealth.Defense.setValue(this.Stats.EnemyHealth.Defense.getHPrel().toFixed(2) + "%");
                                        this.Label.EnemyHealth.Defense.setToolTipText(qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Defense.Tib) + "<br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Defense.Cry));
                                        //EnemyHealth.CY
                                        this.Label.EnemyHealth.CY.setValue(this.Stats.EnemyHealth.CY.getHPrel().toFixed(2) + "%");
                                        this.Label.EnemyHealth.CY.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.EnemyHealth.CY.RT) + "<br>" + qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.CY.Tib));
                                        //EnemyHealth.DF
                                        this.Label.EnemyHealth.DF.setValue(this.Stats.EnemyHealth.DF.getHPrel().toFixed(2) + "%");
                                        this.Label.EnemyHealth.DF.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.EnemyHealth.DF.RT) + "<br>" + qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.DF.Tib));
                                        //EnemyHealth.CC
                                        this.Label.EnemyHealth.CC.setValue(this.Stats.EnemyHealth.CC.getHPrel().toFixed(2) + "%");
                                        this.Label.EnemyHealth.CC.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.EnemyHealth.CC.RT) + "<br>" + qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.CC.Tib));
                                        break;
                                    default: //"hp"
                                        //EnemyHealth.Overall
                                        this.Label.EnemyHealth.Overall.setValue(this.Stats.EnemyHealth.Overall.getHP().toFixed(2) + "%");
                                        this.Label.EnemyHealth.Overall.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.EnemyHealth.Overall.RT) + "<br>" + qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Overall.Tib) + "<br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Overall.Cry));
                                        //EnemyHealth.Base
                                        this.Label.EnemyHealth.Base.setValue(this.Stats.EnemyHealth.Base.getHP().toFixed(2) + "%");
                                        this.Label.EnemyHealth.Base.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.EnemyHealth.Base.RT) + "<br>" + qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Base.Tib));
                                        //EnemyHealth.Defense
                                        this.Label.EnemyHealth.Defense.setValue(this.Stats.EnemyHealth.Defense.getHP().toFixed(2) + "%");
                                        this.Label.EnemyHealth.Defense.setToolTipText(qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Defense.Tib) + "<br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Defense.Cry));
                                        //EnemyHealth.CY
                                        this.Label.EnemyHealth.CY.setValue(this.Stats.EnemyHealth.CY.getHP().toFixed(2) + "%");
                                        this.Label.EnemyHealth.CY.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.EnemyHealth.CY.RT) + "<br>" + qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.CY.Tib));
                                        //EnemyHealth.DF
                                        this.Label.EnemyHealth.DF.setValue(this.Stats.EnemyHealth.DF.getHP().toFixed(2) + "%");
                                        this.Label.EnemyHealth.DF.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.EnemyHealth.DF.RT) + "<br>" + qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.DF.Tib));
                                        //EnemyHealth.CC
                                        this.Label.EnemyHealth.CC.setValue(this.Stats.EnemyHealth.CC.getHP().toFixed(2) + "%");
                                        this.Label.EnemyHealth.CC.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.EnemyHealth.CC.RT) + "<br>" + qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.CC.Tib));
                                        break;
                                    }
                                    //EnemyHealth.Overall
                                    setEHLabelColor(this.Label.EnemyHealth.Overall, this.Stats.EnemyHealth.Overall.getHP());
                                    //EnemyHealth.Base
                                    setEHLabelColor(this.Label.EnemyHealth.Base, this.Stats.EnemyHealth.Base.getHP());
                                    //EnemyHealth.Defense
                                    setEHLabelColor(this.Label.EnemyHealth.Defense, this.Stats.EnemyHealth.Defense.getHP());
                                    //EnemyHealth.CY
                                    setEHLabelColor(this.Label.EnemyHealth.CY, this.Stats.EnemyHealth.CY.getHP());
                                    //EnemyHealth.DF
                                    setEHLabelColor(this.Label.EnemyHealth.DF, this.Stats.EnemyHealth.DF.getHP());
                                    //EnemyHealth.CC
                                    setEHLabelColor(this.Label.EnemyHealth.CC, this.Stats.EnemyHealth.CC.getHP());

                                    //Repair.Storage
                                    if (this.OwnCity != null) this.Stats.Repair.Storage = Math.min(this.OwnCity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf), this.OwnCity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh), this.OwnCity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir));
                                    this.Label.Repair.Storage.setValue(phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(this.Stats.Repair.Storage)));
                                    this.Label.Repair.Storage.setTextColor(this.Stats.Repair.Storage > this.Stats.Repair.Overall.RT ? "darkgreen" : "red");
                                    //Repair
                                    switch (localStorage['getRTSelection']) {
                                    case "cry":
                                        //Repair.Overall
                                        this.Label.Repair.Overall.setValue("<span style=\"text-shadow: 0 0 3pt;\">" + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Overall.Cry) + "</span>");
                                        this.Label.Repair.Overall.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Overall.RT) + "</br>" + qxApp.tr("tnf:health") + ": " + this.Stats.Repair.Overall.getHP().toFixed(2) + "%");
                                        //Repair.Inf
                                        this.Label.Repair.Inf.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Inf.Cry));
                                        this.Label.Repair.Inf.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Inf.RT) + "</br>" + qxApp.tr("tnf:health") + ": " + this.Stats.Repair.Inf.getHP().toFixed(2) + "%");
                                        //Repair.Vehi
                                        this.Label.Repair.Vehi.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Vehi.Cry));
                                        this.Label.Repair.Vehi.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Vehi.RT) + "</br>" + qxApp.tr("tnf:health") + ": " + this.Stats.Repair.Vehi.getHP().toFixed(2) + "%");
                                        //Repair.Air
                                        this.Label.Repair.Air.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Air.Cry));
                                        this.Label.Repair.Air.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Air.RT) + "</br>" + qxApp.tr("tnf:health") + ": " + this.Stats.Repair.Air.getHP().toFixed(2) + "%");
                                        break;
                                    case "hp":
                                        //Repair.Overall
                                        this.Label.Repair.Overall.setValue("<span style=\"text-shadow: 0 0 3pt;\">" + this.Stats.Repair.Overall.getHP().toFixed(2) + "%</span>");
                                        this.Label.Repair.Overall.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Overall.RT) + "</br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Overall.Cry));
                                        //Repair.Inf
                                        this.Label.Repair.Inf.setValue(this.Stats.Repair.Inf.getHP().toFixed(2) + "%");
                                        this.Label.Repair.Inf.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Inf.RT) + "</br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Inf.Cry));
                                        //Repair.Vehi
                                        this.Label.Repair.Vehi.setValue(this.Stats.Repair.Vehi.getHP().toFixed(2) + "%");
                                        this.Label.Repair.Vehi.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Vehi.RT) + "</br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Vehi.Cry));
                                        //Repair.Air
                                        this.Label.Repair.Air.setValue(this.Stats.Repair.Air.getHP().toFixed(2) + "%");
                                        this.Label.Repair.Air.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Air.RT) + "</br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Air.Cry));
                                        break;
                                    case "hp rel":
                                        //Repair.Overall
                                        this.Label.Repair.Overall.setValue("<span style=\"text-shadow: 0 0 3pt;\">" + this.Stats.Repair.Overall.getHPrel().toFixed(2) + "%</span>");
                                        this.Label.Repair.Overall.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Overall.RT) + "</br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Overall.Cry));
                                        //Repair.Inf
                                        this.Label.Repair.Inf.setValue(this.Stats.Repair.Inf.getHPrel().toFixed(2) + "%");
                                        this.Label.Repair.Inf.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Inf.RT) + "</br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Inf.Cry));
                                        //Repair.Vehi
                                        this.Label.Repair.Vehi.setValue(this.Stats.Repair.Vehi.getHPrel().toFixed(2) + "%");
                                        this.Label.Repair.Vehi.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Vehi.RT) + "</br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Vehi.Cry));
                                        //Repair.Air
                                        this.Label.Repair.Air.setValue(this.Stats.Repair.Air.getHPrel().toFixed(2) + "%");
                                        this.Label.Repair.Air.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Air.RT) + "</br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Air.Cry));
                                        break;
                                    default: //"rt"
                                        //Repair.Overall
                                        this.Label.Repair.Overall.setValue("<span style=\"text-shadow: 0 0 3pt;\">" + formatTime(this.Stats.Repair.Overall.RT) + "</span>");
                                        this.Label.Repair.Overall.setToolTipText(qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Overall.Cry) + "</br>" + qxApp.tr("tnf:health") + ": " + this.Stats.Repair.Overall.getHP().toFixed(2) + "%");
                                        //Repair.Inf
                                        this.Label.Repair.Inf.setValue(formatTime(this.Stats.Repair.Inf.RT));
                                        this.Label.Repair.Inf.setToolTipText(qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Inf.Cry) + "</br>" + qxApp.tr("tnf:health") + ": " + this.Stats.Repair.Inf.getHP().toFixed(2) + "%");
                                        //Repair.Vehi
                                        this.Label.Repair.Vehi.setValue(formatTime(this.Stats.Repair.Vehi.RT));
                                        this.Label.Repair.Vehi.setToolTipText(qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Vehi.Cry) + "</br>" + qxApp.tr("tnf:health") + ": " + this.Stats.Repair.Vehi.getHP().toFixed(2) + "%");
                                        //Repair.Air
                                        this.Label.Repair.Air.setValue(formatTime(this.Stats.Repair.Air.RT));
                                        this.Label.Repair.Air.setToolTipText(qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Air.Cry) + "</br>" + qxApp.tr("tnf:health") + ": " + this.Stats.Repair.Air.getHP().toFixed(2) + "%");
                                        break;
                                    }

                                    //Repair.Overall
                                    setRTLabelColor(this.Label.Repair.Overall, this.Stats.Repair.Overall.getHP());
                                    //Repair.Inf
                                    setRTLabelColor(this.Label.Repair.Inf, this.Stats.Repair.Inf.getHP());
                                    if (this.Stats.Repair.Inf.RT === this.Stats.Repair.Overall.RT && this.Stats.Repair.Inf.getHP() < 100) this.Label.Repair.Inf.setTextColor("black");
                                    //Repair.Vehi
                                    setRTLabelColor(this.Label.Repair.Vehi, this.Stats.Repair.Vehi.getHP());
                                    if (this.Stats.Repair.Vehi.RT === this.Stats.Repair.Overall.RT && this.Stats.Repair.Vehi.getHP() < 100) this.Label.Repair.Vehi.setTextColor("black");
                                    //Repair.Air
                                    setRTLabelColor(this.Label.Repair.Air, this.Stats.Repair.Air.getHP());
                                    if (this.Stats.Repair.Air.RT === this.Stats.Repair.Overall.RT && this.Stats.Repair.Air.getHP() < 100) this.Label.Repair.Air.setTextColor("black");

                                    //Loot.Tib
                                    this.Label.Loot.Tib.setToolTipText((this.Stats.Loot.Tib.Battle / this.Stats.Loot.Tib.Base * 100).toFixed(2) + "%<br>" + qxApp.tr("tnf:base") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Tib.Base));
                                    this.Label.Loot.Tib.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Tib.Battle));
                                    //Loot.Cry
                                    this.Label.Loot.Cry.setToolTipText((this.Stats.Loot.Cry.Battle / this.Stats.Loot.Cry.Base * 100).toFixed(2) + "%<br>" + qxApp.tr("tnf:base") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cry.Base));
                                    this.Label.Loot.Cry.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cry.Battle));
                                    //Loot.Cred
                                    this.Label.Loot.Cred.setToolTipText((this.Stats.Loot.Cred.Battle / this.Stats.Loot.Cred.Base * 100).toFixed(2) + "%<br>" + qxApp.tr("tnf:base") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cred.Base));
                                    this.Label.Loot.Cred.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cred.Battle));
                                    //Loot.RP
                                    this.Label.Loot.RP.setToolTipText((this.Stats.Loot.RP.Battle / this.Stats.Loot.RP.Base * 100).toFixed(2) + "%<br>" + qxApp.tr("tnf:base") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.RP.Base));
                                    this.Label.Loot.RP.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.RP.Battle));
                                    //Loot.Overall
                                    this.Label.Loot.Overall.setToolTipText((this.Stats.Loot.Overall.Battle / this.Stats.Loot.Overall.Base * 100).toFixed(2) + "%<br>" + qxApp.tr("tnf:base") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Overall.Base));
                                    this.Label.Loot.Overall.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Overall.Battle));
                                } else {
                                    if (this.Stats.Loot.Tib.Base > 0 || this.Stats.Loot.Cry.Base > 0 || this.Stats.Loot.Cred.Base > 0 || this.Stats.Loot.RP.Base > 0 || this.Stats.Loot.Overall.Base > 0) {
                                        //Loot.Tib
                                        this.Label.Loot.Tib.resetToolTipText();
                                        this.Label.Loot.Tib.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Tib.Base));
                                        //Loot.Cry
                                        this.Label.Loot.Cry.resetToolTipText();
                                        this.Label.Loot.Cry.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cry.Base));
                                        //Loot.Cred
                                        this.Label.Loot.Cred.resetToolTipText();
                                        this.Label.Loot.Cred.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cred.Base));
                                        //Loot.RP
                                        this.Label.Loot.RP.resetToolTipText();
                                        this.Label.Loot.RP.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.RP.Base));
                                        //Loot.Overall
                                        this.Label.Loot.Overall.resetToolTipText();
                                        this.Label.Loot.Overall.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Overall.Base));
                                    }
                                }
                            };
                            this.ResetStats = function () {
                                this.Stats.Battle.Outcome = 0;
                                this.Stats.Battle.Duration = 0;
                                this.Stats.Battle.OwnCity = "";
                                this.Stats.EnemyHealth.Overall = new _StatsUnit();
                                this.Stats.EnemyHealth.Base = new _StatsUnit();
                                this.Stats.EnemyHealth.Defense = new _StatsUnit();
                                this.Stats.EnemyHealth.CY = new _StatsUnit();
                                this.Stats.EnemyHealth.DF = new _StatsUnit();
                                this.Stats.EnemyHealth.CC = new _StatsUnit();
                                this.Stats.Repair.Storage = 0;
                                this.Stats.Repair.Overall = new _StatsUnit();
                                this.Stats.Repair.Inf = new _StatsUnit();
                                this.Stats.Repair.Vehi = new _StatsUnit();
                                this.Stats.Repair.Air = new _StatsUnit();
                                this.Stats.Loot.Tib.Battle = 0;
                                this.Stats.Loot.Cry.Battle = 0;
                                this.Stats.Loot.Cred.Battle = 0;
                                this.Stats.Loot.RP.Battle = 0;
                                this.Stats.Loot.Overall.Battle = 0;
                            };
                            this.ResetLabels = function () {
                                this.Label.Battle.Outcome.resetIcon();
                                this.Label.Battle.Outcome.resetToolTipIcon();
                                this.Label.Battle.Outcome.resetToolTipText();
                                this.Label.Battle.Outcome.setShow("label");
                                this.Label.Battle.Outcome.setLabel("-");
                                this.Label.Battle.Duration.setValue("-:--");
                                this.Label.Battle.OwnCity.setValue("-");
                                this.Label.EnemyHealth.Overall.setValue("-");
                                this.Label.EnemyHealth.Overall.resetToolTipText();
                                this.Label.EnemyHealth.Overall.resetTextColor();
                                this.Label.EnemyHealth.Base.setValue("-");
                                this.Label.EnemyHealth.Base.resetToolTipText();
                                this.Label.EnemyHealth.Base.resetTextColor();
                                this.Label.EnemyHealth.Defense.setValue("-");
                                this.Label.EnemyHealth.Defense.resetToolTipText();
                                this.Label.EnemyHealth.Defense.resetTextColor();
                                this.Label.EnemyHealth.CY.setValue("-");
                                this.Label.EnemyHealth.CY.resetToolTipText();
                                this.Label.EnemyHealth.CY.resetTextColor();
                                this.Label.EnemyHealth.DF.setValue("-");
                                this.Label.EnemyHealth.DF.resetToolTipText();
                                this.Label.EnemyHealth.DF.resetTextColor();
                                this.Label.EnemyHealth.CC.setValue("-");
                                this.Label.EnemyHealth.CC.resetToolTipText();
                                this.Label.EnemyHealth.CC.resetTextColor();
                                this.Label.Repair.Storage.setValue("-");
                                this.Label.Repair.Storage.resetToolTipText();
                                this.Label.Repair.Storage.resetTextColor();
                                this.Label.Repair.Overall.setValue("-");
                                this.Label.Repair.Overall.resetToolTipText();
                                this.Label.Repair.Overall.resetTextColor();
                                this.Label.Repair.Inf.setValue("-");
                                this.Label.Repair.Inf.resetToolTipText();
                                this.Label.Repair.Inf.resetTextColor();
                                this.Label.Repair.Vehi.setValue("-");
                                this.Label.Repair.Vehi.resetToolTipText();
                                this.Label.Repair.Vehi.resetTextColor();
                                this.Label.Repair.Air.setValue("-");
                                this.Label.Repair.Air.resetToolTipText();
                                this.Label.Repair.Air.resetTextColor();
                                this.Label.Loot.Tib.setValue("-");
                                this.Label.Loot.Tib.resetToolTipText();
                                this.Label.Loot.Tib.resetTextColor();
                                this.Label.Loot.Cry.setValue("-");
                                this.Label.Loot.Cry.resetToolTipText();
                                this.Label.Loot.Cry.resetTextColor();
                                this.Label.Loot.Cred.setValue("-");
                                this.Label.Loot.Cred.resetToolTipText();
                                this.Label.Loot.Cred.resetTextColor();
                                this.Label.Loot.RP.setValue("-");
                                this.Label.Loot.RP.resetToolTipText();
                                this.Label.Loot.RP.resetTextColor();
                                this.Label.Loot.Overall.setValue("-");
                                this.Label.Loot.Overall.resetToolTipText();
                                this.Label.Loot.Overall.resetTextColor();
                            };
                            this.Reset = function () {
                                var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                                if (this.TargetCity === null || ownCity.get_CityArmyFormationsManager().get_CurrentTargetBaseId() != this.TargetCity.get_Id()) {
                                    simulated = false;
                                    this.OwnCity = null;
                                    this.TargetCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
                                    ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(this.TargetCity.get_Id());
                                    this.ResetStats();
                                    this.ResetLabels();
//                                    this.getLootFromCurrentCity();
                                }
                            };
                            this.Select = function (selected) {
                                if (selected == instance) {
                                    var j = "pane-light-opaque";
                                    var k = 1;
                                } else {
                                    var j = "pane-light-plain";
                                    var k = 0.6;
                                }
                                this.Label.Battle.container.set({ decorator: j, opacity: k });
                                this.Label.EnemyHealth.container.set({ decorator: j, opacity: k });
                                this.Label.Repair.container.set({ decorator: j, opacity: k });
                                this.Label.Loot.container.set({ decorator: j, opacity: k });
                            };
                            this.saveFormation = function () {
                                try {
                                    Formation = [];
                                    var unitList = Simulator.getInstance().getCityPreArmyUnits().get_ArmyUnits().l;

                                    for (var i = 0; i < unitList.length; i++) {
                                        var unit = unitList[i];
                                        var unitInfo = {};
                                        unitInfo.x = unit.get_CoordX();
                                        unitInfo.y = unit.get_CoordY();
                                        unitInfo.id = unit.get_Id();
                                        unitInfo.enabled = unit.get_Enabled();

                                        Formation.push(unitInfo);
                                    }
                                } catch (e) {
                                    console.log("Error Saving Stat Formation");
                                    console.log(e.toString());
                                }
                            };
                            this.loadFormation = function () {
                                try {
                                    var cities = ClientLib.Data.MainData.GetInstance().get_Cities();
                                    cities.set_CurrentOwnCityId(this.OwnCity.get_Id());
                                    Simulator.getInstance().restoreFormation(Formation);
                                } catch (e) {
                                    console.log("Error loading Stat Formation");
                                    console.log(e.toString());
                                }
                            };

                            // Setup icons
                            this.Label.Battle.Outcome.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});

                            // Setup containers
                            this.Label.Battle.container.add(this.Label.Battle.Outcome);
                            this.Label.Battle.container.add(this.Label.Battle.Duration);
                            this.Label.Battle.container.add(this.Label.Battle.OwnCity);
                            this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.Overall);
                            this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.Base);
                            this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.Defense);
                            this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.CY);
                            this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.DF);
                            this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.CC);
                            this.Label.Repair.container.add(this.Label.Repair.Storage);
                            this.Label.Repair.container.add(this.Label.Repair.Overall);
                            this.Label.Repair.container.add(this.Label.Repair.Inf);
                            this.Label.Repair.container.add(this.Label.Repair.Vehi);
                            this.Label.Repair.container.add(this.Label.Repair.Air);
                            this.Label.Loot.container.add(this.Label.Loot.Tib);
                            this.Label.Loot.container.add(this.Label.Loot.Cry);
                            this.Label.Loot.container.add(this.Label.Loot.Cred);
                            this.Label.Loot.container.add(this.Label.Loot.RP);
                            this.Label.Loot.container.add(this.Label.Loot.Overall);

                            // Setup Events
                            this.Label.Battle.container.addListener("click", function () { Simulator.StatWindow.getInstance().simSelected = instance; for (var i = 0; i < Simulator.StatWindow.getInstance().sim.length; i++) { Simulator.StatWindow.getInstance().sim[i].Select(instance); } }, this);
                            this.Label.EnemyHealth.container.addListener("click", function () { Simulator.StatWindow.getInstance().simSelected = instance; for (var i = 0; i < Simulator.StatWindow.getInstance().sim.length; i++) { Simulator.StatWindow.getInstance().sim[i].Select(instance); } }, this);
                            this.Label.Repair.container.addListener("click", function () { Simulator.StatWindow.getInstance().simSelected = instance; for (var i = 0; i < Simulator.StatWindow.getInstance().sim.length; i++) { Simulator.StatWindow.getInstance().sim[i].Select(instance); } }, this);
                            this.Label.Loot.container.addListener("click", function () { Simulator.StatWindow.getInstance().simSelected = instance; for (var i = 0; i < Simulator.StatWindow.getInstance().sim.length; i++) { Simulator.StatWindow.getInstance().sim[i].Select(instance); } }, this);
                            this.Label.Battle.container.addListener("dblclick", function () { this.loadFormation(); }, this);
                            this.Label.EnemyHealth.container.addListener("dblclick", function () { this.loadFormation(); }, this);
                            this.Label.Repair.container.addListener("dblclick", function () { this.loadFormation(); }, this);
                            this.Label.Loot.container.addListener("dblclick", function () { this.loadFormation(); }, this);
                            this.Label.EnemyHealth.container.addListener("contextmenu", function () {
                                if (localStorage['getEHSelection'] == "hp rel") localStorage['getEHSelection'] = "hp";
                                else localStorage['getEHSelection'] = "hp rel";
                            }, this);
                            this.Label.Repair.container.addListener("contextmenu", function () {
                                if (localStorage['getRTSelection'] == "cry") localStorage['getRTSelection'] = "rt";
                                else if (localStorage['getRTSelection'] == "hp") localStorage['getRTSelection'] = "hp rel";
                                else if (localStorage['getRTSelection'] == "hp rel") localStorage['getRTSelection'] = "cry";
                                else localStorage['getRTSelection'] = "hp";
                            }, this);
                        } catch (e) {
                            console.log("Error init Simulation");
                            console.log(e.toString());
                        }
                    },
                    simulateStats: function () {
                        var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
                        if (city != null) {
                            ClientLib.Vis.VisMain.GetInstance().get_Battleground().Reset();
                            Simulator.getInstance().isSimulation = true;
                            Simulator.getInstance().saveTempFormation();
                            localStorage['ta_sim_last_city'] = city.get_Id();
                            var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                            ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
                            ClientLib.API.Battleground.GetInstance().SimulateBattle();
                        }
                    },
                    doSimReplay: function () {
                        try {
                            Simulator.getInstance().isSimulation = true;
                            var app = qx.core.Init.getApplication();
                            app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay, localStorage['ta_sim_last_city'], 0, 0);

                            if (localStorage['autoSimulate'] !== undefined) {
                                if (localStorage['autoSimulate'] == "yes") {
                                    var speed = localStorage['simulateSpeed'];
                                    setTimeout(function () {
                                        var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
                                        battleground.RestartReplay();
                                        battleground.set_ReplaySpeed(parseInt(speed, 10));
                                    }, 1000);
                                }
                            }
                        } catch (e) {
                            console.log("Error attempting to show Simulation Replay");
                            console.log(e.toString());
                        }
                    },
                    calculateRepairCosts: function (id, level, sHealth, eHealth, mHealth) {
                        var repairCosts = { RT: 0, Cry: 0, Tib: 0 };
                        var dmgRatio = 1;
                        if (sHealth != eHealth) {
                            dmgRatio = (sHealth - eHealth) / mHealth;
                            var costs = ClientLib.API.Util.GetUnitRepairCosts(level, id, dmgRatio);

                            for (var idx = 0; idx < costs.length; idx++) {
                                var uCosts = costs[idx];
                                var cType = parseInt(uCosts.Type, 10);
                                switch (cType) {
                                case ClientLib.Base.EResourceType.Tiberium:
                                    repairCosts.Tib += uCosts.Count;
                                    break;
                                case ClientLib.Base.EResourceType.Crystal:
                                    repairCosts.Cry += uCosts.Count;
                                    break;
                                case ClientLib.Base.EResourceType.RepairChargeBase:
                                case ClientLib.Base.EResourceType.RepairChargeInf:
                                case ClientLib.Base.EResourceType.RepairChargeVeh:
                                case ClientLib.Base.EResourceType.RepairChargeAir:
                                    repairCosts.RT += uCosts.Count;
                                    break;
                                }
                            }

                            // Fix Repairtime for Forgotten
                            switch (ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_CityFaction()) {
                            case ClientLib.Base.EFactionType.GDIFaction:
                            case ClientLib.Base.EFactionType.NODFaction:
                                break;
                            default:
                                repairCosts.RT = dmgRatio * 3600;
                                break;
                            }

                        }
                        return repairCosts;
                    },
                    _onTick: function () {
                        for (var i = 0; i < this.sim.length; i++) this.sim[i].UpdateLabels();
                    },
                    _onViewChanged: function (oldMode, newMode) {
                        if (newMode == ClientLib.Vis.Mode.CombatSetup && oldMode != ClientLib.Vis.Mode.Battleground) {
                            this.getLootFromCurrentCity();
                            // Auto open StatWindow
                            if (localStorage['autoOpenStat'] !== undefined && localStorage['autoOpenStat'] == "yes") this.open();
                            else {
                                this.open();
                                localStorage['autoOpenStat'] = "yes"; // Default
                            }
                        } else if (newMode != ClientLib.Vis.Mode.CombatSetup && newMode != ClientLib.Vis.Mode.Battleground) {
                            this.close();
                        }
                    },
                    __OnSimulateBattleFinished: function (data) {
                        //Disable Simulate Button
                        if (this.isSimStatButtonDisabled == false) {
                            this.disableSimulateStatButtonTimer(10000);
                            if (typeof Simulator.getInstance().disableSimulateButtonTimer === "function") {
                                Simulator.getInstance().disableSimulateButtonTimer(10000);
                            }
                        }
                        if (this.simReplayBtn.getEnabled() == false) this.simReplayBtn.setEnabled(true);

                        this.sim[this.simSelected].setSimulation(data);
                        this.calcHealth(this.sim[this.simSelected]);
                        this.calcLoot(this.sim[this.simSelected]);
                        this.getBattleDuration(this.sim[this.simSelected]);
                    },
                    calcHealth: function (sim) {
                        try {
                            sim.ResetStats();
                            var costs = {};
                            var targetunits = [];
                            var ownunits = [];
                            for (var i = 0; i < sim.Result.length; i++) {
                                var unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(sim.Result[i].t);
                                switch (unit.pt) {
                                case ClientLib.Base.EPlacementType.Structure:
                                case ClientLib.Base.EPlacementType.Defense:
                                    targetunits.push(sim.Result[i]);
                                    break;
                                case ClientLib.Base.EPlacementType.Offense:
                                    ownunits.push(sim.Result[i]);
                                    break;
                                }
                            }
                            ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(sim.TargetCity.get_Id());
                            for (var i = 0; i < targetunits.length; i++) {
                                var unitData = targetunits[i];
                                var unitMDBID = unitData.t;
                                var unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(unitMDBID);
                                var unitLevel = unitData.l;
                                var unitStartHealth = Math.floor(unitData.sh);
                                var unitEndHealth = Math.floor(unitData.h);
                                var unitMaxHealth = Math.floor((ClientLib.API.Util.GetUnitMaxHealthByLevel(unitLevel, unit, false)) * 16);
                                var unitPlacementType = unit.pt; // ClientLib.Base.EPlacementType
                                var unitMovementType = unit.mt; // ClientLib.Base.EUnitMovementType
                                switch (sim.TargetCity.get_CityFaction()) {
                                case ClientLib.Base.EFactionType.GDIFaction:
                                case ClientLib.Base.EFactionType.NODFaction:
                                    unitMaxHealth = Math.floor((ClientLib.API.Util.GetUnitMaxHealthByLevel(unitLevel, unit, true)) * 16);
                                    break;
                                }
                                costs = this.calculateRepairCosts(unitMDBID, unitLevel, unitStartHealth, unitEndHealth, unitMaxHealth);

                                switch (unitPlacementType) {
                                case ClientLib.Base.EPlacementType.Structure:
                                    sim.Stats.EnemyHealth.Overall.StartHealth += unitStartHealth;
                                    sim.Stats.EnemyHealth.Overall.EndHealth += unitEndHealth;
                                    sim.Stats.EnemyHealth.Overall.MaxHealth += unitMaxHealth;
                                    sim.Stats.EnemyHealth.Overall.RT += costs.RT;
                                    sim.Stats.EnemyHealth.Overall.Tib += costs.Tib;
                                    sim.Stats.EnemyHealth.Overall.Cry += costs.Cry;
                                    sim.Stats.EnemyHealth.Base.StartHealth += unitStartHealth;
                                    sim.Stats.EnemyHealth.Base.EndHealth += unitEndHealth;
                                    sim.Stats.EnemyHealth.Base.MaxHealth += unitMaxHealth;
                                    sim.Stats.EnemyHealth.Base.RT += costs.RT;
                                    sim.Stats.EnemyHealth.Base.Tib += costs.Tib;
                                    sim.Stats.EnemyHealth.Base.Cry += costs.Cry;
                                    switch (unitMDBID) {
                                    case 112: // GDI_Construction Yard
                                    case 151: // NOD_Construction Yard
                                    case 177: // FOR_Construction Yard
                                    case 233: // FOR_Fortress_BASE_Construction Yard
                                        sim.Stats.EnemyHealth.CY.StartHealth += unitStartHealth;
                                        sim.Stats.EnemyHealth.CY.EndHealth += unitEndHealth;
                                        sim.Stats.EnemyHealth.CY.MaxHealth += unitMaxHealth;
                                        sim.Stats.EnemyHealth.CY.RT += costs.RT;
                                        sim.Stats.EnemyHealth.CY.Tib += costs.Tib;
                                        sim.Stats.EnemyHealth.CY.Cry += costs.Cry;
                                        break;
                                    case 131: // GDI_Defense Facility
                                    case 158: // NOD_Defense Facility
                                    case 195: // FOR_Defense Facility
                                        sim.Stats.EnemyHealth.DF.StartHealth += unitStartHealth;
                                        sim.Stats.EnemyHealth.DF.EndHealth += unitEndHealth;
                                        sim.Stats.EnemyHealth.DF.MaxHealth += unitMaxHealth;
                                        sim.Stats.EnemyHealth.DF.RT += costs.RT;
                                        sim.Stats.EnemyHealth.DF.Tib += costs.Tib;
                                        sim.Stats.EnemyHealth.DF.Cry += costs.Cry;
                                        break;
                                    case 111: // GDI_Command Center
                                    case 159: // NOD_Command Post
                                        sim.Stats.EnemyHealth.CC.StartHealth += unitStartHealth;
                                        sim.Stats.EnemyHealth.CC.EndHealth += unitEndHealth;
                                        sim.Stats.EnemyHealth.CC.MaxHealth += unitMaxHealth;
                                        sim.Stats.EnemyHealth.CC.RT += costs.RT;
                                        sim.Stats.EnemyHealth.CC.Tib += costs.Tib;
                                        sim.Stats.EnemyHealth.CC.Cry += costs.Cry;
                                        break;
                                    }
                                    break;
                                case ClientLib.Base.EPlacementType.Defense:
                                    sim.Stats.EnemyHealth.Overall.StartHealth += unitStartHealth;
                                    sim.Stats.EnemyHealth.Overall.EndHealth += unitEndHealth;
                                    sim.Stats.EnemyHealth.Overall.MaxHealth += unitMaxHealth;
                                    sim.Stats.EnemyHealth.Overall.Tib += costs.Tib;
                                    sim.Stats.EnemyHealth.Overall.Cry += costs.Cry;
                                    sim.Stats.EnemyHealth.Defense.StartHealth += unitStartHealth;
                                    sim.Stats.EnemyHealth.Defense.EndHealth += unitEndHealth;
                                    sim.Stats.EnemyHealth.Defense.MaxHealth += unitMaxHealth;
                                    sim.Stats.EnemyHealth.Defense.Tib += costs.Tib;
                                    sim.Stats.EnemyHealth.Defense.Cry += costs.Cry;
                                    break;
                                }
                            }
                            ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(sim.OwnCity.get_Id());
                            for (var i = 0; i < ownunits.length; i++) {
                                var unitData = ownunits[i];
                                var unitMDBID = unitData.t;
                                var unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(unitMDBID);
                                var unitLevel = unitData.l;
                                var unitStartHealth = Math.floor(unitData.sh);
                                var unitEndHealth = Math.floor(unitData.h);
                                var unitMaxHealth = Math.floor((ClientLib.API.Util.GetUnitMaxHealthByLevel(unitLevel, unit, false)) * 16);
                                var unitPlacementType = unit.pt; // ClientLib.Base.EPlacementType
                                var unitMovementType = unit.mt; // ClientLib.Base.EUnitMovementType
                                costs = this.calculateRepairCosts(unitMDBID, unitLevel, unitStartHealth, unitEndHealth, unitMaxHealth);

                                switch (unitPlacementType) {
                                case ClientLib.Base.EPlacementType.Offense:
                                    sim.Stats.Repair.Overall.StartHealth += unitStartHealth;
                                    sim.Stats.Repair.Overall.EndHealth += unitEndHealth;
                                    sim.Stats.Repair.Overall.MaxHealth += unitMaxHealth;
                                    sim.Stats.Repair.Overall.Tib += costs.Tib;
                                    sim.Stats.Repair.Overall.Cry += costs.Cry;
                                    switch (unitMovementType) {
                                    case ClientLib.Base.EUnitMovementType.Feet:
                                        sim.Stats.Repair.Inf.StartHealth += unitStartHealth;
                                        sim.Stats.Repair.Inf.EndHealth += unitEndHealth;
                                        sim.Stats.Repair.Inf.MaxHealth += unitMaxHealth;
                                        sim.Stats.Repair.Inf.RT += costs.RT;
                                        sim.Stats.Repair.Inf.Tib += costs.Tib;
                                        sim.Stats.Repair.Inf.Cry += costs.Cry;
                                        break;
                                    case ClientLib.Base.EUnitMovementType.Wheel:
                                    case ClientLib.Base.EUnitMovementType.Track:
                                        sim.Stats.Repair.Vehi.StartHealth += unitStartHealth;
                                        sim.Stats.Repair.Vehi.EndHealth += unitEndHealth;
                                        sim.Stats.Repair.Vehi.MaxHealth += unitMaxHealth;
                                        sim.Stats.Repair.Vehi.RT += costs.RT;
                                        sim.Stats.Repair.Vehi.Tib += costs.Tib;
                                        sim.Stats.Repair.Vehi.Cry += costs.Cry;
                                        break;
                                    case ClientLib.Base.EUnitMovementType.Air:
                                    case ClientLib.Base.EUnitMovementType.Air2:
                                        sim.Stats.Repair.Air.StartHealth += unitStartHealth;
                                        sim.Stats.Repair.Air.EndHealth += unitEndHealth;
                                        sim.Stats.Repair.Air.MaxHealth += unitMaxHealth;
                                        sim.Stats.Repair.Air.RT += costs.RT;
                                        sim.Stats.Repair.Air.Tib += costs.Tib;
                                        sim.Stats.Repair.Air.Cry += costs.Cry;
                                        break;
                                    }
                                    break;
                                }
                            }
                            ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(sim.TargetCity.get_Id());

                            //Set Repair Overall RT
                            sim.Stats.Repair.Overall.RT = Math.max(sim.Stats.Repair.Inf.RT, sim.Stats.Repair.Vehi.RT, sim.Stats.Repair.Air.RT);

                            //Set Battle Outcome
                            if (sim.Stats.Repair.Overall.EndHealth === 0)  sim.Stats.Battle.Outcome = 1;
                            else if (sim.Stats.EnemyHealth.CY.EndHealth === 0) sim.Stats.Battle.Outcome = 3;
                            else sim.Stats.Battle.Outcome = 2;
                        } catch (e) {
                            console.log("Error Getting Player Unit Damage");
                            console.log(e.toString());
                        }
                    },
                    calcLoot: function (sim) {
                        try {
                            var Ents = (sim.Result);
                            var lootArray = { 1: 0, 2: 0, 3: 0, 6: 0 };
                            var i, x, y, unit, Entity , mod = -1, unitMaxHealth = 0;
                            for (y = 0; y < 16; y++) {
                                for (x = 8; x >= 0; x--) {
                                    if (y < 8) {
                                        var width = ClientLib.Vis.VisMain.GetInstance().get_City().get_GridWidth();
                                        var height = ClientLib.Vis.VisMain.GetInstance().get_City().get_GridHeight();
                                    } else {
                                        var width = ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().get_GridWidth();
                                        var height = ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().get_GridHeight();
                                    }
                                    Entity = ClientLib.Vis.VisMain.GetInstance().GetObjectFromPosition(((x * width) + (width / 2)), ((y * height) + (height / 2)));
                                    if (Entity !== null) {
                                        for (i = 0; i < Ents.length; i++) {
                                            unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(Ents[i].t);
                                            switch (sim.TargetCity.get_CityFaction()) {
                                            case ClientLib.Base.EFactionType.GDIFaction:
                                            case ClientLib.Base.EFactionType.NODFaction:
                                                unitMaxHealth = Math.floor((ClientLib.API.Util.GetUnitMaxHealthByLevel(Ents[i].l, unit, true)) * 16);
                                                break;
                                            default:
                                                unitMaxHealth = Math.floor((ClientLib.API.Util.GetUnitMaxHealthByLevel(Ents[i].l, unit, false)) * 16);
                                                break;
                                            }
                                            mod = (Ents[i].sh - Ents[i].h) / unitMaxHealth;
                                            if (Entity.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.CityBuildingType && Ents[i].t == Entity.get_BuildingDetails().get_MdbUnitId() && Ents[i].l == Entity.get_BuildingLevel()) {
                                                var reqs = Entity.get_BuildingDetails().get_UnitLevelRepairRequirements();
                                                for (i = 0; i < reqs.length; i++) lootArray[reqs[i].Type] += Math.floor(mod * reqs[i].Count);
                                                Ents.splice(i, 1);
                                                break;
                                            }
                                            if (Entity.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.DefenseUnitType && Ents[i].t == Entity.get_UnitDetails().get_MdbUnitId() && Ents[i].l == Entity.get_UnitLevel()) {
                                                var reqs = Entity.get_UnitDetails().get_UnitLevelRepairRequirements();
                                                for (i = 0; i < reqs.length; i++) lootArray[reqs[i].Type] += Math.floor(mod * reqs[i].Count);
                                                Ents.splice(i, 1);
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                            var totalLoot = lootArray[1] + lootArray[2] + lootArray[3] + lootArray[6];
                            if (sim.Stats.Battle.Outcome === 3) {
                                sim.Stats.Loot.Overall.Battle = sim.Stats.Loot.Overall.Base;
                                sim.Stats.Loot.Tib.Battle = sim.Stats.Loot.Tib.Base;
                                sim.Stats.Loot.Cry.Battle = sim.Stats.Loot.Cry.Base;
                                sim.Stats.Loot.Cred.Battle = sim.Stats.Loot.Cred.Base;
                                sim.Stats.Loot.RP.Battle = sim.Stats.Loot.RP.Base;
                            } else {
                                sim.Stats.Loot.Overall.Battle = totalLoot;
                                sim.Stats.Loot.Tib.Battle = lootArray[1];
                                sim.Stats.Loot.Cry.Battle = lootArray[2];
                                sim.Stats.Loot.Cred.Battle = lootArray[3];
                                sim.Stats.Loot.RP.Battle = lootArray[6];
                            }
                        } catch (e) {
                            console.log("Error Calculating Resources");
                            console.log(e);
                            console.log(e.name + " " + e.message);
                        }

                    },
                    getBattleDuration: function (sim) {
                        var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
                        if (battleground.get_Simulation() !== null) sim.Stats.Battle.Duration = battleground.get_Replay().m_CombatSteps * battleground.get_TimePerStep();
                        else setTimeout(function () {
                            Simulator.StatWindow.getInstance().getBattleDuration(sim);
                        }, 10);
                    },
                    getLootFromCurrentCity: function () {
                        try {
                            var lootArray = { 1: 0, 2: 0, 3: 0, 6: 0 };
                            var loot = ClientLib.API.Battleground.GetInstance().GetLootFromCurrentCity();
                            if (loot !== null && loot.length > 0) {
                                for (var i = 0; i < loot.length; i++) lootArray[parseInt(loot[i].Type, 10)] += loot[i].Count;
                                for (var i = 0; i < this.sim.length; i++) {
                                    this.sim[i].Reset();
                                    this.sim[i].Stats.Loot.Overall.Base = lootArray[1] + lootArray[2] + lootArray[3] + lootArray[6];
                                    this.sim[i].Stats.Loot.Tib.Base = lootArray[1];
                                    this.sim[i].Stats.Loot.Cry.Base = lootArray[2];
                                    this.sim[i].Stats.Loot.Cred.Base = lootArray[3];
                                    this.sim[i].Stats.Loot.RP.Base = lootArray[6];
                                }
                            } else {
                                setTimeout(function () {
                                    Simulator.StatWindow.getInstance().getLootFromCurrentCity();
                                }, 100);
                            }
                        } catch (e) {
                            console.log("Error Getting Loot from Current City");
                            console.log(e.toString());
                        }
                    },
                    disableSimulateStatButtonTimer: function (timer) {
                        try {
                            if (timer >= 1000) {
                                this.isSimStatButtonDisabled = true;
                                this.simStatBtn.setEnabled(false);
                                this.simStatBtn.setLabel(Math.floor(timer / 1000));
                                timer -= 1000;
                                setTimeout(function () {
                                    Simulator.StatWindow.getInstance().disableSimulateStatButtonTimer(timer);
                                }, 1000);
                            } else {
                                setTimeout(function () {
                                    Simulator.StatWindow.getInstance().simStatBtn.setEnabled(true);
                                    Simulator.StatWindow.getInstance().simStatBtn.setLabel("Update");
                                }, timer);
                                this.isSimStatButtonDisabled = false;
                            }
                        } catch (e) {
                            console.log("Error disabling simulator button");
                            console.log(e.toString());
                        }
                    }
                }
            });
            qx.Class.define("Simulator.OptionWindow", {
                type: "singleton",
                extend: qx.ui.window.Window,

                construct: function () {
                    var qxApp = qx.core.Init.getApplication();
                    this.base(arguments);
                    this.setLayout(new qx.ui.layout.VBox(5));
                    this.addListener("resize", function () {
                        this.center();
                    }, this);

                    this.set({
                        caption: qxApp.tr("Simulator") + " - " + qxApp.tr("tnf:options"),
                        allowMaximize: false,
                        showMaximize: false,
                        allowMinimize: false,
                        showMinimize: false
                    });
                    var tabView = new qx.ui.tabview.TabView();
                    var genPage = new qx.ui.tabview.Page(qxApp.tr("tnf:general"));
                    genLayout = new qx.ui.layout.VBox(5);
                    genPage.setLayout(genLayout);

                    //Add General Page Items
                    var buttonsHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                    buttonsHeader.setThemedFont("bold");
                    var buttonsTitle = new qx.ui.basic.Label(qxApp.tr("Buttons:"));
                    buttonsHeader.add(buttonsTitle);
                    genPage.add(buttonsHeader);

                    var buttonsBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
                    this._buttonLocCB = new qx.ui.form.CheckBox(qxApp.tr("Right Side"));
                    this._buttonSizeCB = new qx.ui.form.CheckBox(qxApp.tr("Normal Size"));
                    this._buttonLocCB.addListener("changeValue", this._onButtonLocChange, this);
                    this._buttonSizeCB.addListener("changeValue", this._onButtonSizeChange, this);
                    if (localStorage['isBtnRight'] !== undefined) {
                        if (localStorage['isBtnRight'] == "yes")
                            this._buttonLocCB.setValue(true);
                        else
                            this._buttonLocCB.setValue(false);
                    }

                    if (localStorage['isBtnNorm'] !== undefined) {
                        if (localStorage['isBtnNorm'] == "yes")
                            this._buttonSizeCB.setValue(true);
                        else
                            this._buttonSizeCB.setValue(false);

                        //Need to do this
                        this.setButtonSize();
                    }

                    this._disableRTBtnCB = new qx.ui.form.CheckBox(qxApp.tr("Disable Repair Button"));
                    this._disableRTBtnCB.addListener("changeValue", this._onDisableRTBtnChange, this);
                    if (localStorage['isRTBtnDisabled'] !== undefined && localStorage['isRTBtnDisabled'] == "no") this._disableRTBtnCB.setValue(false);
                    else this._disableRTBtnCB.setValue(true);

                    this._disableCmtBtnCB = new qx.ui.form.CheckBox(qxApp.tr("Disable Combat Button"));
                    this._disableCmtBtnCB.addListener("changeValue", this._onDisableCmtBtnChange, this);
                    if (localStorage['isCmtBtnDisabled'] !== undefined && localStorage['isCmtBtnDisabled'] == "no") this._disableCmtBtnCB.setValue(false);
                    else this._disableCmtBtnCB.setValue(true);

                    this._ArmyUnitTooltip = new qx.ui.form.CheckBox(qxApp.tr("Disable Army Unit Tooltip"));
                    this._ArmyUnitTooltip.addListener("changeValue", this._onArmyUnitTooltipChange, this);
                    if (localStorage['ArmyUnitTooltipDisabled'] !== undefined) {
                        if (localStorage['ArmyUnitTooltipDisabled'] == "yes")
                            this._ArmyUnitTooltip.setValue(true);
                        else
                            this._ArmyUnitTooltip.setValue(false);
                    }

                    buttonsBox.add(this._buttonSizeCB);
                    buttonsBox.add(this._buttonLocCB);
                    buttonsBox.add(this._disableRTBtnCB);
                    buttonsBox.add(this._disableCmtBtnCB);
                    buttonsBox.add(this._ArmyUnitTooltip);
                    genPage.add(buttonsBox);



                    var simulatorHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({
                        marginTop: 10
                    });
                    simulatorHeader.setThemedFont("bold");
                    var simulatorTitle = new qx.ui.basic.Label(qxApp.tr("Simulator") + ":");
                    simulatorHeader.add(simulatorTitle);
                    genPage.add(simulatorHeader);

                    var simulatorBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
                    this._autoSimulateCB = new qx.ui.form.CheckBox(qxApp.tr("Auto Start Simulation"));

                    if (localStorage['autoSimulate'] !== undefined) {
                        if (localStorage['autoSimulate'] == "yes")
                            this._autoSimulateCB.setValue(true);
                    }

                    var simulatorBox2 = new qx.ui.container.Composite(new qx.ui.layout.Grid(5)).set({
                        marginLeft: 20
                    });
                    var simSpeedOpt1 = new qx.ui.form.RadioButton("x1");
                    var simSpeedOpt2 = new qx.ui.form.RadioButton("x2");
                    var simSpeedOpt4 = new qx.ui.form.RadioButton("x4");
                    this._simSpeedGroup = new qx.ui.form.RadioGroup(simSpeedOpt1, simSpeedOpt2, simSpeedOpt4);
                    this._simSpeedGroup.addListener("changeSelection", this._onSimSpeedChange, this);
                    this._autoSimulateCB.addListener("changeValue", this._onAutoSimulateChange, this);
                    if (localStorage['simulateSpeed'] !== undefined) {
                        var options = this._simSpeedGroup.getSelectables(false);

                        if (localStorage['simulateSpeed'] == "2")
                            options[1].setValue(true);
                        else if (localStorage['simulateSpeed'] == "4")
                            options[2].setValue(true);
                        else
                            options[0].setValue(true);
                    }
                    if (this._autoSimulateCB.getValue() == false) {
                        this._simSpeedGroup.setEnabled(false);
                    }

                    simulatorBox2.add(simSpeedOpt1, {row: 0, column: 0});
                    simulatorBox2.add(simSpeedOpt2, {row: 0, column: 1});
                    simulatorBox2.add(simSpeedOpt4, {row: 0, column: 2});
                    simulatorBox.add(this._autoSimulateCB);
                    simulatorBox.add(simulatorBox2);
                    genPage.add(simulatorBox);

                    var statsPage = new qx.ui.tabview.Page(qxApp.tr("Stats"));
                    statsLayout = new qx.ui.layout.VBox(5);
                    statsPage.setLayout(statsLayout);

                    var statWindowHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                    statWindowHeader.setThemedFont("bold");
                    var statWindowTitle = new qx.ui.basic.Label(qxApp.tr("Stats Window:"));
                    statWindowHeader.add(statWindowTitle);
                    statsPage.add(statWindowHeader);

                    var statWindowBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
                    this._autoOpenCB = new qx.ui.form.CheckBox(qxApp.tr("Auto Open"));
                    this._autoOpenCB.addListener("changeValue", this._onAutoOpenStatsChange, this);
                    if (localStorage['autoOpenStat'] !== undefined) {
                        if (localStorage['autoOpenStat'] == "yes")
                            this._autoOpenCB.setValue(true);
                        else
                            this._autoOpenCB.setValue(false);
                    }

                    statWindowBox.add(this._autoOpenCB);
                    statsPage.add(statWindowBox);

                    var EnemyHealthSecHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({
                        marginTop: 10
                    });
                    EnemyHealthSecHeader.setThemedFont("bold");
                    var EnemyHealthSecTitle = new qx.ui.basic.Label(qxApp.tr("tnf:combat target"));
                    EnemyHealthSecHeader.add(EnemyHealthSecTitle);
                    statsPage.add(EnemyHealthSecHeader);

                    var EnemyHealthSecBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                    var EnemyHealthDisplayOpt1 = new qx.ui.form.RadioButton("HP abs");
                    var EnemyHealthDisplayOpt2 = new qx.ui.form.RadioButton("HP rel");
                    this._EnemyHealthSecGroup = new qx.ui.form.RadioGroup(EnemyHealthDisplayOpt1, EnemyHealthDisplayOpt2);
                    this._EnemyHealthSecGroup.addListener("changeSelection", this._onEnemyHealthSelectionChange, this);
                    if (localStorage['getEHSelection'] !== undefined) {
                        var options = this._EnemyHealthSecGroup.getSelectables(false);

                        if (localStorage['getEHSelection'] == "hp")
                            options[0].setValue(true);
                        else if (localStorage['getEHSelection'] == "hp rel")
                            options[1].setValue(true);
                        else
                            options[0].setValue(true);
                    }
                    EnemyHealthSecBox.add(EnemyHealthDisplayOpt1);
                    EnemyHealthSecBox.add(EnemyHealthDisplayOpt2);
                    statsPage.add(EnemyHealthSecBox);

                    var repairSecHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({
                        marginTop: 10
                    });
                    repairSecHeader.setThemedFont("bold");
                    var repairSecTitle = new qx.ui.basic.Label(qxApp.tr("tnf:own repair cost"));
                    repairSecHeader.add(repairSecTitle);
                    statsPage.add(repairSecHeader);

                    var repairSecBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                    var repairDisplayOpt1 = new qx.ui.form.RadioButton("RT");
                    var repairDisplayOpt2 = new qx.ui.form.RadioButton("C");
                    var repairDisplayOpt3 = new qx.ui.form.RadioButton("HP abs");
                    var repairDisplayOpt4 = new qx.ui.form.RadioButton("HP rel");
                    this._repairSecGroup = new qx.ui.form.RadioGroup(repairDisplayOpt1, repairDisplayOpt2, repairDisplayOpt3, repairDisplayOpt4);
                    this._repairSecGroup.addListener("changeSelection", this._onRepairSelectionChange, this);
                    if (localStorage['getRTSelection'] !== undefined) {
                        var options = this._repairSecGroup.getSelectables(false);

                        if (localStorage['getRTSelection'] == "rt")
                            options[0].setValue(true);
                        else if (localStorage['getRTSelection'] == "cry")
                            options[1].setValue(true);
                        else if (localStorage['getRTSelection'] == "hp")
                            options[2].setValue(true);
                        else if (localStorage['getRTSelection'] == "hp rel")
                            options[3].setValue(true);
                        else
                            options[0].setValue(true);
                    }
                    repairSecBox.add(repairDisplayOpt1);
                    repairSecBox.add(repairDisplayOpt2);
                    repairSecBox.add(repairDisplayOpt3);
                    repairSecBox.add(repairDisplayOpt4);
                    statsPage.add(repairSecBox);

                    var simViewsHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({marginTop: 10});
                    simViewsHeader.setThemedFont("bold");
                    var simViewsTitle = new qx.ui.basic.Label(qxApp.tr("Simulations shown"));
                    simViewsHeader.add(simViewsTitle);
                    statsPage.add(simViewsHeader);

                    var simViewsBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
                    this._simViews = new qx.ui.form.Spinner().set({ minimum: 2 });
                    if (localStorage['simViews'] !== undefined) {
                        if (!isNaN(parseInt(localStorage['simViews'], 10))) this._simViews.setValue(parseInt(localStorage['simViews'], 10));
                        else this._simViews.setValue(Simulator.StatWindow.getInstance().simViews);
                    }
                    this._simViews.addListener("changeValue", this._onSimViewsChanged, this);
                    simViewsBox.add(this._simViews);
                    statsPage.add(simViewsBox);

                    var hideSecHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({marginTop: 10});
                    hideSecHeader.setThemedFont("bold");
                    var hideSecTitle = new qx.ui.basic.Label(qxApp.tr("Hide Sections (on Startup):"));
                    hideSecHeader.add(hideSecTitle);
                    statsPage.add(hideSecHeader);

                    var hideSecBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
                    this._hideHealthCB = new qx.ui.form.CheckBox(qxApp.tr("Health"));
                    this._hideRepairCB = new qx.ui.form.CheckBox(qxApp.tr("Repair"));
                    this._hideLootCB = new qx.ui.form.CheckBox(qxApp.tr("Loot"));
                    this._hideHealthCB.addListener("changeValue", this._onHideEHChange, this);
                    this._hideRepairCB.addListener("changeValue", this._onHideRTChange, this);
                    this._hideLootCB.addListener("changeValue", this._onHideLootChange, this);
                    if (localStorage['hideHealth'] !== undefined) {
                        if (localStorage['hideHealth'] == "yes")
                            this._hideHealthCB.setValue(true);
                        else
                            this._hideHealthCB.setValue(false);
                    }
                    if (localStorage['hideRepair'] !== undefined) {
                        if (localStorage['hideRepair'] == "yes")
                            this._hideRepairCB.setValue(true);
                        else
                            this._hideRepairCB.setValue(false);
                    }
                    if (localStorage['hideLoot'] !== undefined) {
                        if (localStorage['hideLoot'] == "yes")
                            this._hideLootCB.setValue(true);
                        else
                            this._hideLootCB.setValue(false);
                    }
                    hideSecBox.add(this._hideHealthCB);
                    hideSecBox.add(this._hideRepairCB);
                    hideSecBox.add(this._hideLootCB);
                    statsPage.add(hideSecBox);

                    var statPosHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({marginTop: 10});
                    var statPosTitle = new qx.ui.basic.Label(qxApp.tr("Set Stat Window Position:")).set({alignY: "middle"});
                    statPosTitle.setFont("bold");
                    var statPosBtn = new qx.ui.form.Button(qxApp.tr("Set")).set({allowGrowX: false, allowGrowY: false, height: 20});
                    statPosBtn.addListener("click", this._onSetStatWindowPositionChange, this);
                    statPosHeader.add(statPosTitle);
                    statPosHeader.add(statPosBtn);
                    statsPage.add(statPosHeader);

                    tabView.add(genPage);
                    tabView.add(statsPage);
                    this.add(tabView);
                    phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, function () { this.close(); });
                },

                destruct: function () {},

                members: {
                    _buttonSizeCB: null,
                    _buttonLocCB: null,
                    _disableRTBtnCB: null,
                    _disableCmtBtnCB: null,
                    _autoOpenCB: null,
                    _autoSimulateCB: null,
                    _simSpeedGroup: null,
                    _repairSecGroup: null,
                    _EnemyHealthSecGroup: null,
                    _simViews: null,
                    _hideHealthCB: null,
                    _hideRepairCB: null,
                    _hideLootCB: null,
                    _ArmyUnitTooltip: null,

                    _onButtonSizeChange: function () {
                        try {
                            var value = this._buttonSizeCB.getValue();

                            if (value == true)
                                localStorage['isBtnNorm'] = "yes";
                            else
                                localStorage['isBtnNorm'] = "no";

                            this.setButtonSize();
                        } catch (e) {
                            console.log("Error Button Size Change: " + e.toString());
                        }
                    },

                    _onButtonLocChange: function () {
                        try {
                            var value = this._buttonLocCB.getValue();

                            if (value == true)
                                localStorage['isBtnRight'] = "yes";
                            else
                                localStorage['isBtnRight'] = "no";

                            this.setButtonLoc();
                        } catch (e) {
                            console.log("Error Button Location Change: " + e.toString());
                        }
                    },

                    _onDisableRTBtnChange: function () {
                        try {
                            var value = this._disableRTBtnCB.getValue();

                            if (value == true)
                                localStorage['isRTBtnDisabled'] = "yes";
                            else
                                localStorage['isRTBtnDisabled'] = "no";

                            this.setRTBtn(value);
                        } catch (e) {
                            console.log("Error Disable RT Button Change: " + e.toString());
                        }
                    },

                    _onDisableCmtBtnChange: function () {
                        try {
                            var value = this._disableCmtBtnCB.getValue();

                            if (value == true)
                                localStorage['isCmtBtnDisabled'] = "yes";
                            else
                                localStorage['isCmtBtnDisabled'] = "no";

                            this.setCmtBtn(value);
                        } catch (e) {
                            console.log("Error Disable Cmt Button Change: " + e.toString());
                        }
                    },

                    _onEnemyHealthSelectionChange: function (selection) {
                        try {
                            var option = selection.getData()[0];
                            var label = option.getLabel();

                            if (label == "HP abs")
                                localStorage['getEHSelection'] = "hp";
                            else if (label == "HP rel")
                                localStorage['getEHSelection'] = "hp rel";
                            else
                                localStorage['getEHSelection'] = "hp";
                        } catch (e) {
                            console.log("Error Enemy Health Section Selection Change: " + e.toString());
                        }
                    },

                    _onRepairSelectionChange: function (selection) {
                        try {
                            var option = selection.getData()[0];
                            var label = option.getLabel();

                            if (label == "RT")
                                localStorage['getRTSelection'] = "rt";
                            else if (label == "HP abs")
                                localStorage['getRTSelection'] = "hp";
                            else if (label == "HP rel")
                                localStorage['getRTSelection'] = "hp rel";
                            else if (label == "C")
                                localStorage['getRTSelection'] = "cry";
                            else
                                localStorage['getRTSelection'] = "rt";
                        } catch (e) {
                            console.log("Error Repair Section Selection Change: " + e.toString());
                        }
                    },

                    _onAutoOpenStatsChange: function () {
                        try {
                            var value = this._autoOpenCB.getValue();

                            if (value == false)
                                localStorage['autoOpenStat'] = "no";
                            else
                                localStorage['autoOpenStat'] = "yes";
                        } catch (e) {
                            console.log("Error Auto Open Stats Change: " + e.toString());
                        }
                    },

                    _onArmyUnitTooltipChange: function () {
                        try {
                            var value = this._ArmyUnitTooltip.getValue();

                            if (value == false)
                                localStorage['ArmyUnitTooltipDisabled'] = "no";
                            else
                                localStorage['ArmyUnitTooltipDisabled'] = "yes";
                        } catch (e) {
                            console.log("Error Army Unit Tooltip Change: " + e.toString());
                        }
                    },

                    _onAutoSimulateChange: function () {
                        try {
                            var value = this._autoSimulateCB.getValue();
                            if (value == false) {
                                this._simSpeedGroup.setEnabled(false);
                                localStorage['autoSimulate'] = "no";
                            } else {
                                this._simSpeedGroup.setEnabled(true);
                                localStorage['autoSimulate'] = "yes";
                            }
                        } catch (e) {
                            console.log("Error Auto Simulate Change: " + e.toString());
                        }
                    },

                    _onSimSpeedChange: function (selection) {
                        try {
                            var option = selection.getData()[0];
                            var label = option.getLabel();

                            if (label == "x1")
                                localStorage['simulateSpeed'] = "1";
                            else if (label == "x2")
                                localStorage['simulateSpeed'] = "2";
                            else
                                localStorage['simulateSpeed'] = "4";
                        } catch (e) {
                            console.log("Error Sim Speed Change: " + e.toString());
                        }
                    },

                    _onSimViewsChanged: function () {
                        try {
                            var value = parseInt(this._simViews.getValue(), 10);
                            if (!isNaN(value)) {
                                if (value > 0) {
                                    localStorage['simViews'] = value.toString();
                                    Simulator.StatWindow.getInstance().simViews = value;

                                    // Remove Simulations from Stats Window
                                    for (var i = (Simulator.StatWindow.getInstance().sim.length-1); i >= 0; i--) {
                                        if (i > (value-1)) {
                                            Simulator.StatWindow.getInstance().Battle.remove(Simulator.StatWindow.getInstance().sim[i].Label.Battle.container);
                                            Simulator.StatWindow.getInstance().EnemyHealth.remove(Simulator.StatWindow.getInstance().sim[i].Label.EnemyHealth.container);
                                            Simulator.StatWindow.getInstance().Repair.remove(Simulator.StatWindow.getInstance().sim[i].Label.Repair.container);
                                            Simulator.StatWindow.getInstance().Loot.remove(Simulator.StatWindow.getInstance().sim[i].Label.Loot.container);
                                            Simulator.StatWindow.getInstance().sim.pop();
                                        }
                                    }

                                    // Create and add Simulations to Stats Window
                                    for (var i = 0; i < value; i++) {
                                        if (i == Simulator.StatWindow.getInstance().sim.length) {
                                            Simulator.StatWindow.getInstance().sim.push(new (Simulator.StatWindow.getInstance()).Simulation(i));
                                            Simulator.StatWindow.getInstance().Battle.add(Simulator.StatWindow.getInstance().sim[i].Label.Battle.container, { flex : 1 });
                                            Simulator.StatWindow.getInstance().EnemyHealth.add(Simulator.StatWindow.getInstance().sim[i].Label.EnemyHealth.container, { flex : 1 });
                                            Simulator.StatWindow.getInstance().Repair.add(Simulator.StatWindow.getInstance().sim[i].Label.Repair.container, { flex : 1 });
                                            Simulator.StatWindow.getInstance().Loot.add(Simulator.StatWindow.getInstance().sim[i].Label.Loot.container, { flex : 1 });
                                            Simulator.StatWindow.getInstance().sim[i].Select(Simulator.StatWindow.getInstance().simSelected);
                                        }
                                    }

                                    if ((value-1) < Simulator.StatWindow.getInstance().simSelected) {
                                        Simulator.StatWindow.getInstance().simSelected = 0;
                                        for (var i = 0; i < Simulator.StatWindow.getInstance().sim.length; i++) {
                                            Simulator.StatWindow.getInstance().sim[i].Select(0);
                                        }
                                    }
                                }
                            }
                        } catch (e) {
                            console.log("Error Simulation Views Change: " + e.toString());
                        }
                    },

                    _onHideEHChange: function () {
                        try {
                            var value = this._hideHealthCB.getValue();

                            if (value == true)
                                localStorage['hideHealth'] = "yes";
                            else
                                localStorage['hideHealth'] = "no";

                        } catch (e) {
                            console.log("Error Hide Enemy Base Health Change: " + e.toString());
                        }
                    },

                    _onHideRTChange: function () {
                        try {
                            var value = this._hideRepairCB.getValue();

                            if (value == true)
                                localStorage['hideRepair'] = "yes";
                            else
                                localStorage['hideRepair'] = "no";

                        } catch (e) {
                            console.log("Error Hide Repair Times Change: " + e.toString());
                        }
                    },

                    _onHideLootChange: function () {
                        try {
                            var value = this._hideLootCB.getValue();

                            if (value == true)
                                localStorage['hideLoot'] = "yes";
                            else
                                localStorage['hideLoot'] = "no";

                        } catch (e) {
                            console.log("Error Hide Loot Change: " + e.toString());
                        }
                    },

                    _onSetStatWindowPositionChange: function () {
                        try {
                            var props = Simulator.StatWindow.getInstance().getLayoutProperties();
                            localStorage['statWindowPosLeft'] = props["left"];
                            localStorage['statWindowPosTop'] = props["top"];
                        } catch (e) {
                            console.log("Error Stat Window Position Change: " + e.toString());
                        }
                    },

                    setRTBtn: function (value) {
                        if (value == true)
                            Simulator.getInstance().unlockRTBtn.show();
                        else
                            Simulator.getInstance().unlockRTBtn.hide();
                    },

                    setCmtBtn: function (value) {
                        if (value == true)
                            Simulator.getInstance().unlockCmtBtn.show();
                        else
                            Simulator.getInstance().unlockCmtBtn.hide();
                    },

                    setButtonLoc: function () {
                        try {
                            var value = this._buttonLocCB.getValue();
                            var size = this._buttonSizeCB.getValue();

                            if (value == true) //Right
                            {
                                var pLeft = null;
                                if (size == true) //Right Normal
                                    var pRight = 70;
                                else //Right Small
                                    var pRight = 70;

                                Simulator.getInstance().armyBar.add(Simulator.getInstance().simBtn, {left: pLeft, right: pRight, bottom: 119});
                                Simulator.getInstance().armyBar.add(Simulator.getInstance().statBtn, {left: pLeft, right: pRight, bottom: 81});
                                Simulator.getInstance().armyBar.add(Simulator.getInstance().optionBtn, {left: pLeft, right: pRight, bottom: 43});
                                Simulator.getInstance().armyBar.add(Simulator.getInstance().layoutBtn, {left: pLeft, right: pRight, bottom: 5});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftUpBtn, {left: pLeft, right: 75, bottom: 113});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftDownBtn, {left: pLeft, right: 75, bottom: 73});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftLeftBtn, {left: pLeft, right: 95, bottom: 93});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftRightBtn, {left: pLeft, right: 55, bottom: 93});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().disableAllUnitsBtn, {left: pLeft, right: 6, bottom: 120});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnH, {left: pLeft, right: 6, bottom: 160});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnV, {left: pLeft, right: 46, bottom: 160});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().armyUndoBtn, {left: pLeft, right: 6, bottom: 200});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().quickSaveBtn, {left: pLeft, right: 6, bottom: 240});
                            } else {
                                var pRight = null;
                                if (size == true) //Left Normal
                                    var pLeft = 87;
                                else
                                    var pLeft = 87;

                                Simulator.getInstance().armyBar.add(Simulator.getInstance().simBtn, {left: pLeft, right: pRight, bottom: 120});
                                Simulator.getInstance().armyBar.add(Simulator.getInstance().statBtn, {left: pLeft, right: pRight, bottom: 82});
                                Simulator.getInstance().armyBar.add(Simulator.getInstance().optionBtn, {left: pLeft, right: pRight, bottom: 44});
                                Simulator.getInstance().armyBar.add(Simulator.getInstance().layoutBtn, {left: pLeft, right: pRight, bottom: 6});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftUpBtn, {left: 80, right: pRight, bottom: 113});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftDownBtn, {left: 80, right: pRight, bottom: 73});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftLeftBtn, {left: 60, right: pRight, bottom: 93});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftRightBtn, {left: 100, right: pRight, bottom: 93});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().disableAllUnitsBtn, {left: 6, right: pRight, bottom: 120});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnH, {left: 6, right: pRight, bottom: 160});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnV, {left: 46, right: pRight, bottom: 160});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().armyUndoBtn, {left: 6, right: pRight, bottom: 200});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().quickSaveBtn, {left: 6, right: pRight, bottom: 240});
                            }
                        } catch (e) {
                            console.log("Error Setting Button Location: " + e.toString());
                        }
                    },

                    setButtonSize: function () {
                        try {
                            var qxApp = qx.core.Init.getApplication();
                            value = this._buttonSizeCB.getValue();

                            if (value == true) {
                                Simulator.getInstance().simBtn.setLabel(qxApp.tr("Simulate"));
                                Simulator.getInstance().simBtn.setWidth(60);

                                Simulator.getInstance().statBtn.setLabel(qxApp.tr("Stats"));
                                Simulator.getInstance().statBtn.setWidth(60);

                                Simulator.getInstance().optionBtn.setLabel(qxApp.tr("Options"));
                                Simulator.getInstance().optionBtn.setWidth(60);

                                Simulator.getInstance().layoutBtn.setLabel(qxApp.tr("Layout"));
                                Simulator.getInstance().layoutBtn.setWidth(60);
                            } else {
                                Simulator.getInstance().simBtn.setLabel(qxApp.tr("S"));
                                Simulator.getInstance().simBtn.setWidth(30);

                                Simulator.getInstance().statBtn.setLabel(qxApp.tr("I"));
                                Simulator.getInstance().statBtn.setWidth(30);

                                Simulator.getInstance().optionBtn.setLabel(qxApp.tr("O"));
                                Simulator.getInstance().optionBtn.setWidth(30);

                                Simulator.getInstance().layoutBtn.setLabel(qxApp.tr("L"));
                                Simulator.getInstance().layoutBtn.setWidth(30);
                            }

                            this.setButtonLoc();
                        } catch (e) {
                            console.log("Error Setting Button Size: " + e.toString());
                        }
                    }
                }
            });
            qx.Class.define("Simulator.LayoutWindow", {
                type: "singleton",
                extend: webfrontend.gui.CustomWindow,

                construct: function () {
                    var qxApp = qx.core.Init.getApplication();
                    this.base(arguments);
                    this.setLayout(new qx.ui.layout.VBox());

                    this.set({
                        width: 200,
                        caption: qxApp.tr("Simulator") + " - " + qxApp.tr("Layouts"),
                        padding: 2,
                        allowMaximize: false,
                        showMaximize: false,
                        allowMinimize: false,
                        showMinimize: false
                    });

                    var layoutListHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({
                        decorator: "pane-light-opaque"
                    });
                    var layoutListTitle = new qx.ui.basic.Label(qxApp.tr("Formation Saver")).set({alignX: "center", alignY: "top", font: "font_size_14_bold"});
                    layoutListHeader.add(layoutListTitle);
                    this.add(layoutListHeader);

                    this.layoutList = new qx.ui.form.List();
                    this.layoutList.set({selectionMode: "one", height: 100, width: 150, margin: 5});
                    this.add(this.layoutList);

                    var listButtonBox = new qx.ui.container.Composite();
                    var listButtonLayout = new qx.ui.layout.HBox(5, "center");
                    listButtonBox.setLayout(listButtonLayout);
                    var loadButton = new qx.ui.form.Button(qxApp.tr("Load"));
                    var deleteButton = new qx.ui.form.Button(qxApp.tr("Delete"));
                    loadButton.set({height: 15, width: 70, alignX: "center"});
                    loadButton.addListener("click", this.loadLayout, this);
                    deleteButton.set({height: 15, width: 70, alignX: "center"});
                    deleteButton.addListener("click", this.deleteLayout, this);
                    listButtonBox.add(loadButton);
                    listButtonBox.add(deleteButton);
                    this.add(listButtonBox);

                    var saveLayoutBox = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({spacing: 10})).set({marginTop: 20, marginLeft: 5});
                    this.layoutTextBox = new qx.ui.form.TextField("").set({width: 75, maxLength: 15});
                    var saveButton = new qx.ui.form.Button(qxApp.tr("Save"));
                    saveButton.set({height: 10, width: 70, alignX: "center"});
                    saveButton.addListener("click", this.saveNewLayout, this);
                    saveLayoutBox.add(this.layoutTextBox);
                    saveLayoutBox.add(saveButton);
                    this.add(saveLayoutBox);

                    var checkBox = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({spacing: 10})).set({marginTop: 10, marginLeft: 5});
                    this.persistentCheck = new qx.ui.form.CheckBox(qxApp.tr("Make Persistent"));
                    this.persistentCheck.setTextColor("white");
                    this.persistentCheck.setFont("bold");
                    this.persistentCheck.setToolTipText(qxApp.tr("If checked, formation will be saved and can be used by this city in any other city."));
                    checkBox.add(this.persistentCheck);
                    this.add(checkBox);

                    var clearAllLayoutsBox = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({alignX: "center", marginTop: 5, marginLeft: 5, allowGrowX: false});
                    var clearAllLayoutsBtn = new qx.ui.form.Button(qxApp.tr("Clear All")).set({alignX: "center", width: 70});
                    clearAllLayoutsBtn.addListener("click", this.clearAllLayouts, this);
                    clearAllLayoutsBox.add(clearAllLayoutsBtn);
                    this.add(clearAllLayoutsBox);

                    this.layoutsArray = [];
                    phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, function () { this.close(); });
                },

                destruct: function () {},

                members: {
                    layoutList: null,
                    layoutTextBox: null,
                    layoutsArray: null,
                    persistentCheck: null,

                    saveNewLayout: function (isQS) {
                        try {
                            console.log("Saving Layout");

                            if ((isQS !== undefined && isQS == true) || this.layoutTextBox.getValue() == "") {
                                var date = new Date();
                                var day = date.getDate();
                                var month = date.getMonth() + 1;
                                var hour = (date.getHours() < 10) ? "0" + date.getHours() : date.getHours();
                                var minute = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();
                                var second = (date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds();
                                var label = month + "/" + day + "@" + hour + ":" + minute + ":" + second;
                            } else {
                                var label = this.layoutTextBox.getValue();
                            }

                            var cityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                            var ownCityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
                            var model = ownCityID + "." + cityID + "." + label;

                            var children = this.layoutList.getChildren();
                            //Check for same layout name if so do NOT save
                            for (var item = 0; item < children.length; item++) {
                                thisItem = children[item].getModel();
                                if (thisItem == model) {
                                    alert("Save Failed: Duplicate Name");
                                    return;
                                }
                            }
                            var units = Simulator.getInstance().getCityPreArmyUnits().get_ArmyUnits().l;
                            units = this.prepareLayout(units);

                            var layoutInformation = {};
                            if (this.persistentCheck.getValue() == true) {
                                layoutInformation = {
                                    id: model,
                                    label: label,
                                    formation: units,
                                    pers: "yes"
                                };
                            } else {
                                layoutInformation = {
                                    id: model,
                                    label: label,
                                    formation: units,
                                    pers: "no"
                                };
                            }
                            this.layoutsArray.push(layoutInformation);
                            this.layoutList.add(new qx.ui.form.ListItem(layoutInformation.label, null, layoutInformation.id));
                            this.layoutTextBox.setValue("");
                            Simulator.getInstance().quickSaveBtn.setLabel("✔");
                            setTimeout(function () { Simulator.getInstance().quickSaveBtn.setLabel("QS"); }, 2000);
                            this.updateStorage();
                        } catch (e) {
                            console.log("Error Saving Layout");
                            console.log(e);
                        }
                    },

                    loadLayout: function () {
                        try {
                            console.log("Loading Layout");
                            var ownCityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();

                            var layout = this.layoutList.getSelection()[0].getModel();
                            for (var item in this.layoutsArray) {
                                var thisLayout = this.layoutsArray[item].id;

                                if (thisLayout == layout) {
                                    Simulator.getInstance().restoreFormation(this.layoutsArray[item].formation);
                                    break;
                                }
                            }
                        } catch (e) {
                            console.log("Error Loading Layout");
                            console.log(e);
                        }
                    },

                    deleteLayout: function () {
                        try {
                            console.log("Deleting Layout");
                            //Remove from our array too
                            var rUSure = confirm('Are you sure you want to delete this layout?');
                            if (!rUSure) {
                                return;
                            }
                            for (var item in this.layoutsArray) {
                                if (this.layoutsArray[item].id == this.layoutList.getSelection()[0].getModel()) {
                                    var isRemoved = this.layoutsArray.splice(item, 1);
                                    this.updateStorage();
                                }
                            }

                            //The update will remove all and repopulate so no need to delete individual ones.
                            this.updateLayoutList();
                        } catch (e) {
                            console.log("Error Deleting Layout");
                            console.log(e);
                        }
                    },

                    updateStorage: function () {
                        try {
                            console.log("Updating Storage");
                            localStorage['savedFormations'] = JSON.stringify(this.layoutsArray);
                        } catch (e) {
                            console.log("Error updating localStorage");
                            console.log(e);
                        }
                    },

                    updateLayoutList: function () {
                        try {
                            console.log("Updating Layout List");
                            var savedLayouts = localStorage['savedFormations'];
                            if (savedLayouts !== undefined) {
                                this.layoutsArray = JSON.parse(savedLayouts);
                            }
                            this.layoutList.removeAll(); //Clear List
                            var cityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                            var ownCityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
                            var model = ownCityID + "." + cityID;

                            for (var item in this.layoutsArray) {
                                var itemLabel = this.layoutsArray[item].label;
                                var itemModel = model + "." + itemLabel;
                                var pers = this.layoutsArray[item].pers;
                                var match = this.layoutsArray[item].id.match(ownCityID.toString());

                                if (itemModel == this.layoutsArray[item].id || ((pers !== undefined && pers == "yes") && match != null)) //Match!
                                {
                                    this.layoutList.add(new qx.ui.form.ListItem(itemLabel, null, this.layoutsArray[item].id));
                                }
                            }
                        } catch (e) {
                            console.log("Error Updating Layout List");
                            console.log(e);
                        }
                    },

                    //Function from C&C Tiberium Alliances Combat Simulator script. Works well and does exactly what I need!
                    //For authors see: http://userscripts.org/scripts/show/145717
                    prepareLayout: function (units) {
                        try {
                            console.log("Preparing Layout for Saving");
                            saved_units = [];
                            for (var i = 0; i < units.length; i++) {
                                var unit = units[i];
                                var armyUnit = {};
                                armyUnit.x = unit.get_CoordX();
                                armyUnit.y = unit.get_CoordY();
                                armyUnit.id = unit.get_Id();
                                armyUnit.enabled = unit.get_Enabled();
                                saved_units.push(armyUnit);
                            }
                            return saved_units;
                        } catch (e) {
                            console.log("Error Preparing Unit Layout");
                            console.log(e);
                        }
                    },

                    clearAllLayouts: function () {
                        try {
                            console.log("Clearing All Layouts");
                            var rUSure = confirm("Clicking OK will delete all of your saved layouts from every base!");

                            if (rUSure) {
                                localStorage.removeItem('savedFormations');
                                this.layoutsArray = [];
                                alert("All saved layouts have been deleted.");

                                this.updateLayoutList();
                            } else {
                                alert("No layouts were deleted.");
                            }
                        } catch (e) {
                            console.log("Error Clearing All Layouts");
                            console.log(e);
                        }
                    }
                }
            });
        }
        function translation() {
            var localeManager = qx.locale.Manager.getInstance();

            // Default language is english (en)
            // Available Languages are: ar,ce,cs,da,de,en,es,fi,fr,hu,id,it,nb,nl,pl,pt,ro,ru,sk,sv,ta,tr,uk
            // You can send me translations so i can include them in the Script.

            // German (incomplete)
            localeManager.addTranslation("de", {
                "Simulator": "Simulator",
                "S": "S",
                "Simulate": "Simulate",
                "Opens Simulation Screen.": "Startet die Simulation",
                "I": "I",
                "Stats": "Statistik",
                "Opens Simulator Stats Window.": "Öffnet das Statistikfenster.",
                "O": "O",
                "Options": "Options",
                "Opens Simulator Options.": "Öffnet das Optionsfenster.",
                "L": "L",
                "Layout": "Layout",
                "Save/Load/Delete Unit Formations for current city.": "Speichern/Laden/Löschen von Formationen für den aktuellen Gegner",
                "Unlock": "Unlock",
                "Unlock Combat Button.": "Entsperrt die Angriffsschaltfläche.",
                "Unlock Repair Button.": "Entsperrt die Reparaturschaltfläche.",
                "Shifts units one space up.": "Verschiebt Einheiten einen Platz nach oben.",
                "Shifts units one space down.": "Verschiebt die Einheiten einen Platz nach unten.",
                "Shifts units one space left.": "Verschiebt die Einheiten einen Platz nach links.",
                "Shifts units one space right.": "Verschiebt die Einheiten einen Platz nach rechts.",
                "Mirrors units horizontally.": "Spiegelt die Einheiten horizontal.",
                "Mirrors units vertically.": "Spiegelt die Einheiten vertikal.",
                "Enables/Disables all units.": "Alle Einheiten de-/aktivieren.",
                "Undo's formation to previous saved formation.<br>Save formations by hitting<br>the Update or Simulate button.": "Setzt die Formation auf die vorher gespeicherte zurück.<br>Formationen werden gespeichert,<br>wenn man auf Simulieren oder Aktualisieren drückt.",
                "QS": "QS",
                "Saves the current layout<br>without having to open<br>the Formation Saver window.<br>Does not make persistent.": "Speichert die aktuelle Formation,<br>ohne das das Formationsfenster<br>geöffnet werden muss.",
                "Back": "zurück",
                "Return to Combat Setup.": "Zurück zum Angriffsbildschirm.",
                "Updates Simulation Stats.": "Aktualisiert die Statistik.",
                "Buttons:": "Schaltflächen:",
                "Right Side": "Rechte Seite",
                "Normal Size": "Normale Größe",
                "Disable Repair Button": "Sperre Reparatur-Schaltfläche",
                "Disable Combat Button": "Sperre Angriffs-Schaltfläche",
                "Disable Army Unit Tooltip": "Deaktiviere Einheiten Tooltips",
                "Auto Start Simulation": "Simulation automatisch starten",
                "Stats Window:": "Statistik Fenster:",
                "Auto Open": "Automatisch öffnen",
                "Simulations shown": "Anzuzeigende Simulationen",
                "Hide Sections (on Startup):": "Verstecke Bereich (beim starten):",
                "Health": "Health",
                "Repair": "Repair",
                "Loot": "Loot",
                "Set Stat Window Position:": "Setze die Statistikfenster Position:",
                "Set": "setzen",
                "Layouts": "Layouts",
                "Formation Saver": "Formationen speichern",
                "Load": "Laden",
                "Delete": "Löschen",
                "Save": "Speichern",
                "Make Persistent": "Dauerhaft",
                "If checked, formation will be saved and can be used by this city in any other city.": "Wenn angewählt kann die Formation für andere Gegner verwendet werden.",
                "Clear All": "Lösche alle"
            });
        }
        function waitForGame() {
            try {
                if (typeof qx !== "undefined" && typeof qx.core !== "undefined" && typeof qx.core.Init !== "undefined" && typeof ClientLib !== "undefined" && typeof phe !== "undefined") {
                    var app = qx.core.Init.getApplication();
                    if (app.initDone == true) {
                        try {
                            console.log("WarChiefs - Tiberium Alliances Combat Simulator: Loading");
                            translation();
                            createClasses();
                            Simulator.getInstance();
                            Simulator.StatWindow.getInstance();
                            Simulator.OptionWindow.getInstance();
                            Simulator.LayoutWindow.getInstance();
                            console.log("WarChiefs - Tiberium Alliances Combat Simulator: Loaded");
                        } catch (e) {
                            console.log("WarChiefs - Tiberium Alliances Combat Simulator: initialization error:");
                            console.log(e);
                        }
                    } else
                        window.setTimeout(waitForGame, 1000);
                } else {
                    window.setTimeout(waitForGame, 1000);
                }
            } catch (e) {
                console.log(e);
            }
        }
        window.setTimeout(waitForGame, 1000);
    };
    var script = document.createElement("script");
    var txt = injectFunction.toString();
    script.innerHTML = "(" + txt + ")();";
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
})();










// ==UserScript==
// @name       C&C Multi Session
// @namespace  http://*tiberiumalliances.com/*
// @namespace  https://*tiberiumalliances.com/*
// @include  http://*tiberiumalliances.com/*
// @include  https://*tiberiumalliances.com/*
// @icon            https://prodgame13.alliances.commandandconquer.com/146/favicon.ico
// @version    0.5
// @description Open Multi C&C Session at one Browser
// @author        Elda1990
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

var $;

function log_it(e){
    if (typeof console != 'undefined') console.log('[Multi-Session] ', e);
    else if (window.opera) opera.postError('[Multi-Session] '+ e);
    else GM_log('[Multi-Session] '+ e);   
}

(function(){
    log_it("Wait for load....");
    cnc_ms_run1();   
})();

function cnc_ms_run1() {
    var head = document.getElementsByTagName('head')[0];
    if(!head)  {
        log_it("Wait for load....");
        window.setTimeout(cnc_ms_run1, 100);
    } else {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            log_it("No Jquery Load it....");
            
            var jQuery_js = unsafeWindow.document.createElement('script');
            
            jQuery_js.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js';
            jQuery_js.type = 'text/javascript';
            jQuery_js.async = true;
            
            
           // head.insertBefore(jQuery_js, head.firstChild);
               //head.appendChild(jQuery_js);
            
        }
        cnc_ms_run2();
    }
}



var wait_counter = 0;


function cnc_ms_run2() {
    if (typeof unsafeWindow.jQuery == 'undefined' ) {
        log_it("Wait for Jquery.... ");
        wait_counter = wait_counter + 1;
        window.setTimeout(cnc_ms_run2, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        log_it("Jquery.... Done");
        $('.p4fnav-block').prepend('<div style="display:block;float:left;cursor:pointer;"><div class="p4fnav-topnav-separator"></div><span name="new_session" class="p4fnav-url">New Session</span></div>');          
        $('.returned-user').append(' - <b><span name="new_session" class="change-server" style="cursor:pointer;">New Session</span></b>');  
        
        
        $('[name="new_session"]').live("click", function(){
              cncms_new_session();
        });
             
    }
}

  
function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}


function cncms_new_session() {
    eraseCookie("JSESSIONID");
    eraseCookie("Rememberme");
    eraseCookie("commandandconquer_remember_me");
    eraseCookie("commandandconquer_remember_me_success");
    window.location.reload();
}










// ==UserScript==
// @name        C&C:TA Dev AddonMainMenu
// @namespace   http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @description C&C:Tiberium Alliances Dev AddonMainMenu (AMM)
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     0.2
// @author      BlinDManX
// @grant       none
// @copyright   2012+, Claus Neumann
// @license     CC BY-NC-ND 3.0 - http://creativecommons.org/licenses/by-nc-nd/3.0/
// ==/UserScript==
(function () {
    var AMMinnerHTML = function () {
        function AMM() {
            qx.Class.define("Addons.AddonMainMenu",{
                type : "singleton",
                extend : qx.core.Object,
                construct: function () {                 
                    this.mainMenuContent = new qx.ui.menu.Menu();
                    this.mainMenuButton = new qx.ui.form.MenuButton("Addons", null , this.mainMenuContent);
                    this.mainMenuButton.set({
                        width : 80,
                        appearance : "button-bar-right",
                        toolTipText : "List of AddonCommands"
                    });
                    var mainBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_MENU);
                    var childs = mainBar.getChildren()[1].getChildren();
                    
                    for( var z = childs.length - 1; z>=0;z--){                           
                        if( typeof childs[z].setAppearance === "function"){                            
                            if( childs[z].getAppearance() == "button-bar-right"){
                                childs[z].setAppearance("button-bar-center");
                            }
                        }
                    }
                    
                    mainBar.getChildren()[1].add(this.mainMenuButton);                    
                    mainBar.getChildren()[0].setScale(true); //kosmetik
                    mainBar.getChildren()[0].setWidth(764 + 80 );    //kosmetik                
                    //console.log("Button added");
                    Addons_AddonMainMenu = "loaded";
                },
                members :
                {
                    mainMenuContent : null,
                    mainMenuButton : null,
                    AddMainMenu: function (name,command,key) {
                        if(name == null){
                            console.log("Addons.AddonMainMenu.AddSubMenu: name empty");
                            return;
                        }
                        if(command == null){
                            console.log("Addons.AddonMainMenu.AddMainMenu: command empty");
                            return;
                        }
                        if(key != null){
                            var newCommand = new qx.ui.core.Command(key);
                            newCommand.addListener("execute", command);
                            var button = new qx.ui.menu.Button(name, null, newCommand);
                        } else {
                            var button = new qx.ui.menu.Button(name);
                            button.addListener("execute", command);
                        }
                        
                        this.mainMenuContent.add(button);
                        
                    },
                    AddSubMainMenu: function (name) {    
                        if(name == null){
                            console.log("Addons.AddonMainMenu.AddSubMainMenu: name empty");
                            return;
                        }                    
                        var subMenu = new qx.ui.menu.Menu;
                        var button = new qx.ui.menu.Button(name, null, null, subMenu);
                        this.mainMenuContent.add(button);
                        return subMenu;
                    },
                    AddSubMenu: function (subMenu,name,command,key) {        
                        if(name == null){
                            console.log("Addons.AddonMainMenu.AddSubMenu: name empty");
                            return;
                        }
                        if(command == null){
                            console.log("Addons.AddonMainMenu.AddSubMenu: command empty");
                            return;
                        }                        
                        if(subMenu == null){
                            console.log("Addons.AddonMainMenu.AddSubMenu: subMenu empty");
                            return;
                        }
                        
                        if(key != null){
                            var newCommand = new qx.ui.core.Command(key);
                            newCommand.addListener("execute", command);
                            var button = new qx.ui.menu.Button(name, null, newCommand);
                        } else {
                            var button = new qx.ui.menu.Button(name);
                            button.addListener("execute", command);
                        }                        
                        subMenu.add(button);
                        
                        
                        
                        
                        var subMenu = new qx.ui.menu.Menu;
                        var actionsButton = new qx.ui.menu.Button(name, null, null, subMenu);
                        return subMenu;
                    }
                }
            });
            Addons.AddonMainMenu.getInstance();
            
            //-----TESTING------
            //var addonmenu  = Addons.AddonMainMenu.getInstance();        
            //addonmenu.AddMainMenu("TestMainButton",function(){debugfunction("1");},"ALT+J");
            //--SUBMENUS--
            //var submenu = addonmenu.AddSubMainMenu("TestSubMenu");
            //addonmenu.AddSubMenu(submenu,"TestSubButton 1",function(){debugfunction("2");},"ALT+L");
            //addonmenu.AddSubMenu(submenu,"TestSubButton 2",function(){debugfunction("3");});
            //addonmenu.AddSubMenu(submenu,"TestSubButton 3",function(){debugfunction("4");});
            
            //function debugfunction(k){
                //console.log("working key:" + k);
            //}
        }
        
        
        
        function AMM_checkIfLoaded() {
            try {
                if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
                    AMM();
                } else {
                    window.setTimeout(AMM_checkIfLoaded, 1000);
                }
            } catch (e) {
                console.log("AMM_checkIfLoaded: ", e);
            }
        }
        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(AMM_checkIfLoaded, 1000);
            Addons_AddonMainMenu = "install";
        }
    }
    try {
        var AMMS = document.createElement("script");
        AMMS.innerHTML = "(" + AMMinnerHTML.toString() + ")();";
        AMMS.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName("head")[0].appendChild(AMMS);
        }
    } catch (e) {
        console.log("AMMinnerHTML init error: ", e);
    }
})();










// ==UserScript==
// @name        C&C Tiberium Alliances Navigate
// @namespace   https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include       https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        1.1
// @date           2013-01-01
// @author         Elda1990
// @description C&C Tiberium Alliances Navigate To Coords
// @need         http://userscripts.org/scripts/source/155357.user.js
// @copyright      2012+, Elda1990
// ==/UserScript==

(function (){
    var nav_load_main = function() {  
        
        var navBox = null;
        var navBox_x = null;
        var navBox_y = null;
        
        function log_it(e){
            if (typeof console != 'undefined') console.log('[NAV] '+e);
            else if (window.opera) opera.postError('[NAV] '+e);
            else GM_log('[NAV] '+e);   
        }
        
        function closeNavigate(){
            navBox.close();
        }
        
        
        function doNavigate(){
            
            var x = navBox_x.getValue();
            var y = navBox_y.getValue();
            
            log_it(x+':'+y);
            try 
            {
                ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(x,y);
            }
            catch (ex)
            {   
                log_it('ERROR: '+ex);
            }
            
            closeNavigate();
        }
        
        
        function initialize() {
            console.log("Navigate Loaded...");     
            var addonmenu = Addons.AddonMainMenu.getInstance();    
            addonmenu.AddMainMenu("Navigate",function(){ navBox.open(); },"ALT+N"); 
            
            navBox = new qx.ui.window.Window("Map Navi");
            navBox.setPadding(1);
            navBox.setLayout(new qx.ui.layout.Grow());
            // this.navBox.setLayout(new qx.ui.layout.VBox());
            var layout = new qx.ui.layout.Grid();
            layout.setSpacing(5);
            layout.setColumnAlign(1,"left", "center");
            layout.setColumnAlign(0,"left", "bottom");
            navBox.setLayout(layout);
            navBox.setShowMaximize(false);
            navBox.setShowMinimize(false);
            navBox.moveTo(600, 100);
            navBox.setHeight(150);
            navBox.setWidth(110);
            navBox.setMinWidth(10);
            navBox.setMinHeight(10);
            // TextField
            navBox_x = new qx.ui.form.Spinner();
            navBox_y = new qx.ui.form.Spinner();
            
            navBox_x.setMinimum(0);
            navBox_x.setMaximum(1000);
            
            navBox_y.setMinimum(0);
            navBox_y.setMaximum(1000);
            
            navBox_x.setValue(500);
            navBox_y.setValue(500);
            
            
            navBox_x.addListener("keyup", function(e) {
                if(e.getKeyCode() == 13) {
                    doNavigate();
                }
            }, this);
            
            navBox_y.addListener("keyup", function(e) {
                if(e.getKeyCode() == 13) {
                    doNavigate();
                }
            }, this);
            
            
            var makeLbl = function(name) {
                var lbl =  new qx.ui.basic.Label(name);
                lbl.setTextColor("white");
                return lbl;
            }
            
            
            navBox.add(makeLbl("X:"), {row:0, column:0});
            navBox.add(navBox_x, {row:0, column:1});
            
            navBox.add(makeLbl("Y:"), {row:1, column:0});
            navBox.add(navBox_y, {row:1, column:1});
            
            var bt = new qx.ui.form.Button("Navigate");
            bt.set({
                appearance : "button-text-small",
                toolTipText : "Navigate to"
            });
            
            bt.addListener("click", function() { doNavigate(); }, this);
            navBox.add(bt,{row:2,column:1});
            
        }
        
        function nav_checkIfLoaded() {
            try {
                if (typeof qx != 'undefined' && typeof Addons != 'undefined') {
                    a = qx.core.Init.getApplication(); // application
                    mb = qx.core.Init.getApplication().getMenuBar();
                    addonmenu = Addons.AddonMainMenu.getInstance();
                    if (a && mb && addonmenu) {
                        initialize();
                    } else
                        window.setTimeout(nav_checkIfLoaded, 1000);
                } else {
                    window.setTimeout(nav_checkIfLoaded, 1000);
                }
            } catch (e) {
                log_it(e);
            }
        }
        
        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(nav_checkIfLoaded, 1000);
        }
    }
    
    // injecting, because there seem to be problems when creating game interface with unsafeWindow
    var navScript = document.createElement("script");
    navScript.innerHTML = "(" + nav_load_main.toString() + ")();";
    navScript.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain)) {
        document.getElementsByTagName("head")[0].appendChild(navScript);
    }
})();





















// ==UserScript== 
// @name           C&C: Tiberium Alliances Map (Elda-Mod)
// @description    Shows you the region map
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        2.0
// @author         KSX, Elda1990
// ==/UserScript==
//
// based on CnC: Tiberium Alliances Map (KSX-Mod) v1.5
// https://userscripts.org/scripts/show/149093
//
// based on Tiberium Alliances Map (Nolana Kane) v1.8 
// https://userscripts.org/scripts/show/135955
(function() {
    var TAMap_mainFunction = function() {
        function createMapTweak() {
            var TAMap = {};
            qx.Class.define("TAMap.main", {
                type : "singleton",
                extend : qx.core.Object,
                members : {
                    version        : "2.0",
                    buttonMap      : null,
                    mapBox         : null,
                    mapWidget      : null,
                    scroll         : null,
                    mapCanvas      : null,
                    settingsWnd    : null,
                    poiSelect      : null,
                    allianceSelect : null,
                    obfSectorName : null,
                    obfAllianceList : null,
                    obfAllianceId   : null,
                    obfAllianceName : null, 
                    colorFields: {},
                    visOptions: { colors: { 
                        cityColor           : "green"       , // type = 1
                        baseColor           : "navy"        , // type = 2
                        campColor           : "midnightblue", // type = 3, CampType=2
                        outpostColor        : "royalblue"   , // type = 3, CampType=3
                        poiColor            : "orange"      , // type = 4, POIType != 0
                        tunnelColor         : "forestgreen" , // type = 4, POIType = 0
                        enemyBaseColor      : "red",
                        allianceTerrainColor: "teal",
                        ownBaseColor        : "lime",
                        highlightColor      : "white"
                    }},
                    // Types: 1 = city
                    // 2 = Forgotten Base{Id, Level}
                    // 3 = Camp, Outpost {Id, CampType: 3 = Outpost, 2 = Camp}
                    // 4 = POI, Tunnel Exit {Id, Level, OwnerAllianceId, OwnerAllianceName, POIType:
                    // 6 = Aircraft (Off Air)
                    // 7 = Resonator (Def), 0 = Tunnel!
                    //     ...
                    //
                    zoomFactor : 3,
                    initialize : function() {
                        if (localStorage) {
                            var vo = localStorage["TAMap.visOptions"];
                            if (vo != null) {
                                this.visOptions = JSON.parse(vo);
                            }
                        }
                        // this.add_ViewModeChange = (new ClientLib.Vis.ViewModeChange).$ctor(this, this.onViewChange);
                     
                        console.log("Adding button");
                        
                        var addonmenu = Addons.AddonMainMenu.getInstance();    
                        addonmenu.AddMainMenu("Map",function() { window.TAMap.main.getInstance().showMap(); }, "ALT+M"); 
                        
                         /*
                        this.buttonMap = new qx.ui.form.Button("Map");
                        this.buttonMap.set({
                            width : 80,
                            appearance : "button-bar-center",
                            toolTipText : ""
                        });
                        this.buttonMap.addListener("click", this.showMap, this);
                        
                        
                       
                        var mainBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_MENU);
                        mainBar.getChildren()[1].addAt(this.buttonMap, 8, {
                            top : 0,
                            right : 0
                        });*/
                        console.log("Button added");
                        // The Map window
                        this.mapBox = new qx.ui.window.Window("Map  [v"+this.version+" Links-Mod]");
                        this.mapBox.setPadding(1);
                        this.mapBox.setLayout(new qx.ui.layout.Grow());
                        // this.mapBox.setLayout(new qx.ui.layout.VBox());
                        this.mapBox.setShowMaximize(false);
                        this.mapBox.setShowMinimize(false);
                        this.mapBox.moveTo(150, 50);
                        this.mapBox.setHeight(500);
                        this.mapBox.setWidth(500);
                        this.mapBox.setMinWidth(10);
                        this.mapBox.setMinHeight(10);
                        this.mapBox.setBackgroundColor("black");
                        this.mapWidget = new qx.html.Element("canvas", null, {
                            id : "map",
                            width : 3000,
                            height : 3000
                        });
                        this.mapWidget.addListener("appear", function() {
                            console.log("appeared:" + this.mapWidget.getDomElement());
                            var canvas = this.mapWidget.getDomElement();
                            if (this.mapCanvas == null) {
                                this.mapCanvas = canvas;
                                var _thisMap = this;
                                canvas.addEventListener("click", function(evt) {
                                    console.log("coords:" + evt.clientX + ":" + evt.clientY);
                                    console.log("offsets:" + canvas.offsetTop + "," + canvas.offsetLeft);
                                    // get canvas position
                                    var obj = canvas;
                                    var top = 0;
                                    var left = 0;
                                    while (obj && obj.tagName != 'BODY') {
                                        top += obj.offsetTop;
                                        left += obj.offsetLeft;
                                        obj = obj.offsetParent;
                                    }
                                    // return relative mouse position
                                    var mouseX = evt.clientX - left + window.pageXOffset + _thisMap.scroll.getScrollX();
                                    var mouseY = evt.clientY - top + window.pageYOffset + _thisMap.scroll.getScrollY();
                                    console.log("M:" + mouseX + "," + mouseY);
                                    var vm = ClientLib.Vis.VisMain.GetInstance();
                                    vm.CenterGridPosition(mouseX / _thisMap.zoomFactor, mouseY / _thisMap.zoomFactor);
                                    _thisMap.updateMap();
                                    setTimeout(function() {
                                        _thisMap.updateMap();
                                    }, 1000);
                                }, false);
                            }
                            this.updateMap();
                            //for (var x = 0; x < 1000; x++) {
                            //    for (var y = 0; y < 1000; y++) {
                            //        var obj = w.GetObjectFromPosition(x,y);
                            //        if (obj != null) {
                            //            ctx.fillRect(x,y,1,1);
                            //        }
                            //    }
                            // }
                            // vm = ClientLib.Vis.VisMain.GetInstance()
                            // vm.CenterGridPosition(535,142)
                            // vm.get_Region().get_PosY()/vm.get_Region().get_GridHeight()
                            // vm.get_Region().get_PosX()/vm.get_Region().get_GridWidth()
                        }, this);
                        // new qx.ui.basic.Label().set({
                        //            value: "debugOutput",
                        //            rich : true,
                        //            selectable: true
                        //          });
                        this.scroll = new qx.ui.container.Scroll().set({
                            width : 500,
                            height : 500
                        });
                        this.scroll.setMinWidth(10);
                        this.scroll.setMinHeight(10);
                        _thisMap = this;
                        this.mapBox.add(this.scroll);
                        var p = new qx.ui.core.Widget();
                        p.setMinHeight(3000);
                        p.setMinWidth(3000);
                        p.setHeight(3000);
                        p.setWidth(3000);
                        this.scroll.add(p);
                        p.getContentElement().add(this.mapWidget);
                        // select box for alliances
                        var selectBox = new qx.ui.form.SelectBox();
                        selectBox.addListener("changeSelection", function(e) {
                            if (e != null && e.getData() && e.getData().length > 0) {
                                this.visOptions.alliance = e.getData()[0].getModel(); // alliance ID or -1 for all
                                //console.log("Alliance selected: "+e.getData()[0] + " "+this.visOptions.alliance);
                                this.saveOptions();
                                this.updateMap();
                            }
                        }, this);
                        this.allianceSelect = selectBox;
                        // this.mapBox.add(selectBox);
                        
                        //
                        // Select box for POI Type
                        //
                        selectBox = new qx.ui.form.SelectBox();
                        var currentSelection = this.visOptions.poi||-1;
                        var makePoiItem = function(model, name) {
                            var item = new qx.ui.form.ListItem(name, null, model);
                            selectBox.add(item);
                            if (currentSelection == model) {
                                selectBox.setSelection([item]);
                            }
                        }
                        makePoiItem( -1                                   ,"<< None >>"              );
                        makePoiItem(ClientLib.Base.EPOIType.AirBonus      ,"Aircraft GNT (Off Air)"  );
                        makePoiItem(ClientLib.Base.EPOIType.CrystalBonus  ,"Crystal CNH"             );
                        makePoiItem(ClientLib.Base.EPOIType.DefenseBonus  ,"Resonator NT (Def)"      );
                        makePoiItem(ClientLib.Base.EPOIType.InfanteryBonus,"Tungsten C (Off Inf)"    );
                        makePoiItem(ClientLib.Base.EPOIType.PowerBonus    ,"Reactor (Power Bonus)"   );
                        makePoiItem(ClientLib.Base.EPOIType.TiberiumBonus ,"Tiberium CN"             );
                        makePoiItem(ClientLib.Base.EPOIType.VehicleBonus  ,"Uranium C (Off Vehicles)");
                        makePoiItem( -2                                   ,"<< All >>"               );
                        selectBox.addListener("changeSelection", function(e) {
                            if (e != null && e.getData() && e.getData().length > 0) {
                                this.visOptions.poi = e.getData()[0].getModel(); // POI ID or -1 for all
                                console.log("POI selected "+e.getData()[0].getModel());
                                this.saveOptions();
                                this.updateMap();
                            }
                        }, this);
                        this.poiSelect = selectBox;
                        
                        // Checkbox for alliance POIs
                        checkbox = new qx.ui.form.CheckBox();
                        checkbox.setValue(this.visOptions.showAlliancePois==true);
                        checkbox.addListener("changeValue", function(e) {
                            this.visOptions.showAlliancePois=e.getTarget().getValue();
                            this.saveOptions();
                            this.updateMap();
                        },this);
                        this.showAlliancePois = checkbox;
                        
                        // Checkbox for own bases
                        checkbox = new qx.ui.form.CheckBox();
                        checkbox.setValue(this.visOptions.showOwnCities==true);
                        checkbox.addListener("changeValue", function(e) {
                            this.visOptions.showOwnCities=e.getTarget().getValue();
                            this.saveOptions();
                            this.updateMap();
                        },this);
                        this.showOwnCities = checkbox;
                        // Checkbox for showSectionFrame
                        checkbox = new qx.ui.form.CheckBox();
                        checkbox.setValue(this.visOptions.showSectionFrame==true);
                        checkbox.addListener("changeValue", function(e) {
                            this.visOptions.showSectionFrame=e.getTarget().getValue();
                            this.saveOptions();
                            this.updateMap();
                        },this);
                        this.showSectionFrame = checkbox;
                        // Button "Settings"
                        var bt = new qx.ui.form.Button("Settings");
                        bt.set({
                            appearance : "button-text-small",
                            toolTipText : "Set filters for the map"
                        });
                        bt.addListener("click", function() {this.settingsWnd.open()}, this);
                        this.mapBox.getChildControl("captionbar").add(bt,{row:0,column:5}); // hack hack hack
                        
                        //
                        // Settings dialog
                        //
                        this.settingsWnd = new qx.ui.window.Window("Map Settings");
                        this.settingsWnd.setPadding(10);
                        //this.mapBox.setLayout(new qx.ui.layout.Grow());
                        var layout = new qx.ui.layout.Grid();
                        layout.setSpacing(5);
                        layout.setColumnAlign(1,"left", "center");
                        layout.setColumnAlign(0,"left", "bottom");
                        this.settingsWnd.setLayout(layout);
                        this.settingsWnd.setShowMaximize(false);
                        this.settingsWnd.setShowMinimize(false);
                        this.settingsWnd.moveTo(300, 13);
                        this.settingsWnd.setHeight(580);
                        this.settingsWnd.setWidth(300);
                        this.settingsWnd.setMinWidth(10);
                        this.settingsWnd.setMinHeight(10);
                        var makeLbl = function(name) {
                            var lbl =  new qx.ui.basic.Label(name);
                            lbl.setTextColor("white");
                            return lbl;
                        }
                        var _thisMap = this;
                        var makeTxt = function(option) {
                            var value = _thisMap.visOptions.colors[option];
                            var txtField = new qx.ui.form.TextField(value);
                            txtField.setTextColor("white");
                            _thisMap.colorFields[option] = txtField;
                            return txtField;
                        }
                        this.settingsWnd.add(makeLbl("- Highlight -"), {row:0, column:0});
                        this.settingsWnd.add(makeLbl("Alliance:"), {row:1,column:0});
                        this.settingsWnd.add(this.allianceSelect, {row:1, column:1});
                        this.settingsWnd.add(makeLbl("POIs:"), {row:2, column:0});
                        this.settingsWnd.add(this.poiSelect, {row:2, column:1});
                        this.settingsWnd.add(makeLbl("Alliance POIs:"), {row:3, column:0});
                        this.settingsWnd.add(this.showAlliancePois, {row:3, column:1});
                        this.settingsWnd.add(makeLbl("Own Cities:"), {row:4, column:0});
                        this.settingsWnd.add(this.showOwnCities, {row:4, column:1});
                        this.settingsWnd.add(makeLbl("Section Frame:"), {row:5, column:0});
                        this.settingsWnd.add(this.showSectionFrame, {row:5, column:1});
                        bt = makeLbl("- Colors -");
                        bt.set({
                            value: '<a href="http://www.w3schools.com/html/html_colornames.asp" target="_blank">- Colors -</a>',
                            rich : true,
                            selectable: true
                        });
                        this.settingsWnd.add(bt, {row:10, column:0});
                        // bt.addListener("click", function() { window.open("http://www.w3schools.com/html/html_colornames.asp") });
                        this.settingsWnd.add(makeLbl("Alliance Terrain:"), {row:11, column:0});
                        this.settingsWnd.add(makeTxt("allianceTerrainColor"), {row:11, column:1});
                        this.settingsWnd.add(makeLbl("Base:"), {row:12, column:0});
                        this.settingsWnd.add(makeTxt("baseColor"), {row:12, column:1});
                        this.settingsWnd.add(makeLbl("Camp:"), {row:13, column:0});
                        this.settingsWnd.add(makeTxt("campColor"), {row:13, column:1});
                        this.settingsWnd.add(makeLbl("City:"), {row:14, column:0});
                        this.settingsWnd.add(makeTxt("cityColor"), {row:14, column:1});
                        this.settingsWnd.add(makeLbl("Enemy:"), {row:15, column:0});
                        this.settingsWnd.add(makeTxt("enemyBaseColor"), {row:15, column:1});
                        this.settingsWnd.add(makeLbl("Outpost:"), {row:16, column:0});
                        this.settingsWnd.add(makeTxt("outpostColor"), {row:16, column:1});
                        this.settingsWnd.add(makeLbl("Own City:"), {row:17, column:0});
                        this.settingsWnd.add(makeTxt("ownBaseColor"), {row:17, column:1});
                        this.settingsWnd.add(makeLbl("POI:"), {row:18, column:0});
                        this.settingsWnd.add(makeTxt("poiColor"), {row:18, column:1});
                        this.settingsWnd.add(makeLbl("Tunnel:"), {row:19, column:0});
                        this.settingsWnd.add(makeTxt("tunnelColor"), {row:19, column:1});
                        var changeColor = new qx.ui.form.Button("Change");
                        changeColor.set({
                            appearance : "button-text-small",
                            toolTipText : "Save changes to colors"
                        });
                        this.settingsWnd.add(changeColor, {row:20, column:0});
                        changeColor.addListener("click", function() {
                            for (var option in this.visOptions.colors) {
                                if (this.colorFields[option]) {
                                    this.visOptions.colors[option] = this.colorFields[option].getValue();
                                }
                            }
                            this.saveOptions();
                            this.updateMap();
                        }, this);
                        this.settingsWnd.addListener("appear", function() {
                            this.updateFilter();
                        }, this);
                        //scroll.add(this.mapWidget);
                        // scroll.setBackgroundColor("#fff");
                        //var ele = scroll.getContainerElement();
                        //console.log("container scroll:" + ele);
                        //ele.getChild(0).add(this.mapWidget);
                        //
                        //this.mapBox.getApplicationRoot().set({
                        //                blockerColor: '#000000',
                        //                blockerOpacity: 0.6
                        //            });
                        // w.GetBaseOwner(x,y);
                        //var index=((y * this.m_WorldWidth) + x);
                        // return this.m_BaseOwner[index];
                        //
                        //var ruinPlayerID=this.GetWorldSectorByCoords$0(targetX, targetY).GetPlayerId$0(ruin.PlayerId);
                        //
                        // list players for (var i = 0; i < s.m_Players.c; i++) { var p = console.log(s.GetPlayer(i)); }
                        //
                        // for(i in s.m_Objects.d) { console.log(s.m_Objects.d[i].$type.m.n);}
                        // sample object:
                        //    {"Type":1,"SequenceId":3694,"isAttacked":false,"isLocked":false,"isProtected":false,"isAlerted":false,"hasCooldown":false,"Level":10,"Radius":2,"PlayerId":4,"ConditionBuildings":100,"ConditionDefense":100,"Id":76726,"Name":"Sepherian 1"}
                        // lientLib.Data.Cities.prototype.GetWorldSectorWithMostCities$0=function()
                        // >> w.GetOwner(534,139);
                        // >> w.GetObjectFromPosition
                        //w.GetObjectFromPosition(534,139)
                        // allianceId = 943 OtherAllianceId = 2049
                        // md.get_Alliance().GetAllianceRelationshipsByType(webfrontend.gui.alliance.DiplomacyPage.ERelationTypeEnemy,true)
                        //c=w.GetObjectFromPosition(524,145)
                        // s.GetPlayer(c.PlayerId)
                        //s.GetAlliance(p.Alliance) == OtherAllianceId
                    },
                    getSectors: function(w) {    // work around  obfuscated variable names
                        if (this.obfSectorName == null) {
                            // auto-detect sector name
                            Outer:
                            for (i in w) {             
                                if (w[i].d) {
                                    var maybeSector = w[i].d;
                                    for (j in maybeSector) {
                                    if (maybeSector[j].ConvertToWorldX) {
                                        this.obfSectorName = i;
                                        console.log("Sector field:" + i);
                                        break Outer;
                                    }
                                    break;
                                    }
                                }
                            }
                        }
                        if (this.obfSectorName == null) console.log("ERROR: getSectors(): obfuscated property not found!");
                        if (this.obfSectorName != null)    return w[this.obfSectorName].d;
            
                        if (w.KIH) {  // old june version
                            return w.KIH.d;
                        } else if (w.RBJXOL) { // july
                            return w.RBJXOL.d;
                        }  else if(w.IWEESP) {
                            return w.IWEESP.d;  // closed beta 2 world
                        } else if (w.HYMYNV) {  // mid july release
                            return w.HYMYNV.d;
                        } else if (w.ONQEIH) {  // july 18th
                            return w.ONQEIH.d;
                        }
                    },
                    getAlliances: function(sector) {// work around  obfuscated variable names. sector == current sector
                        if(typeof(sector)=="undefinied" || sector===null) {console.log("ERROR: getAlliances(sector): sector is not defined!");return null;}
                        if (this.obfAllianceList == null) {                    
                            // find alliance list dynamically
                            
                            Outer:
                            for (i in sector) {
                                if (sector[i].d) {
                                    var maybeAllianceList = sector[i].d;
                                    for (j in maybeAllianceList) {
                                        var maybeAlliance=maybeAllianceList[j];                                        
                                        var propnames=[]; for (p in maybeAlliance) propnames.push(p); 
                                        var stringpropcount=0;
                                        var stringpropname=null;
                                        if(propnames.length==13) {
                                            for(k=0;k<propnames.length;k++){
                                                if(typeof(maybeAlliance[propnames[k]])=="string"){
                                                    stringpropname=propnames[k];
                                                    stringpropcount++;
                                                }
                                            }
                                            if(stringpropcount==1){
                                                this.obfAllianceId       = propnames[1];//assuming this is allways the case :-)
                                                this.obfAllianceName     = stringpropname;
                                                this.obfAllianceList     = i;
                                                console.log("Alliances field:" + i);
                                                break Outer;
                                            }                                            
                                        }
                                        break;// test only the first member
                                    }
                                }
                            }
                        }
                        if (this.obfAllianceList == null) {
                            console.log("ERROR: getAlliances(): obfuscated member not found!");
                            return null;
                        } else
                        return sector[this.obfAllianceList].d;
/*                        if (sector.WGH) {// june
                            return sector.WGH.d;
                        } else if (sector.QEKQND) {//july
                            return sector.QEKQND.d;
                        } else if (sector.GGUPEV){  // closed beta 2 world
                            return sector.GGUPEV.d;
                        } else if(sector.UFVPYE) {
                            return sector.UFVPYE.d; // July 11, 2012
                        } else if(sector.UEQLAO) {
                            return sector.UEQLAO.d; // July 18th
                        } */
                    },
                    isEnemy : function(enemies, alliance, sector) {
                        if (alliance == null)
                            return false;
                        var enemy = enemies.l.filter(function(ele) {
                            return ele.OtherAllianceId == alliance.Id;
                        });
                        return enemy.length > 0;
                    },
                    listAllAlliances : function() {
                        var alliances = [];
                        var w = ClientLib.Data.MainData.GetInstance().get_World(); if(!w) console.log("ERROR: get_World() failed!");
                        var sectors = this.getSectors(w); if(!sectors) console.log("ERROR: getSectors() failed!");
                        for (var i in sectors) {  // m_sectors
                            var s = sectors[i];
                            var all = this.getAlliances(s); if(!all) console.log("ERROR: getAlliances() failed!");
                            for(var j in all) {  // m_alliances
                                var a = all[j];
                                alliances.push({id: a[this.obfAllianceId], name: a[this.obfAllianceName]});
                            }
                        }
                        alliances.sort(function(s1,s2) {
                            var name1 = s1.name.toLowerCase();
                            var name2 = s2.name.toLowerCase();
                            if (name1 < name2) return -1;
                            if (name1 > name2) return 1;
                            return 0;
                        });
                        var allianceMap = {};
                        alliances.forEach(function(it) {
                            allianceMap[it.id] = it;
                        });
                        return allianceMap;
                    },
                    updateFilter : function() {
                        var md = ClientLib.Data.MainData.GetInstance();
                        //var enemies = md.get_Alliance().GetAllianceRelationshipsByType(webfrontend.gui.alliance.DiplomacyPage.ERelationTypeEnemy, true);
                        this.allianceSelect.removeAll();
                        var alliances = this.listAllAlliances();  // quite expensive operation
                        var selected = new qx.ui.form.ListItem("<< None >>", null, -1);
                        this.allianceSelect.add(selected);
                        for (i in alliances) {
                            var a = alliances[i];
                            //enemies.l.forEach(function(it) {
                            var tempItem = new qx.ui.form.ListItem(a.name, null, a.id);
                            if (a.id == this.visOptions.alliance) {
                                selected = tempItem;
                            }
                            this.allianceSelect.add(tempItem);
                        }
                        this.allianceSelect.setSelection([selected]);
                    },
                    findAllianceById: function(s, id) {
                        var ra = null;
                        if (id != 0){
                            for (var x=1; s.GetAlliance(x) != null; x++){
                                var a = s.GetAlliance(x);
                                if (a.FGTNFZ == id)                                {
                                    ra = a;
                                }
                            }
                        }
                        return ra;
                    },
                    updateMap : function() {
                        // this.updateFilter(); - we assume that visOptions has all the visualisation options
                        var canvas = this.mapCanvas;
                        console.log("Canvas:" + canvas);
                        var ctx = canvas.getContext('2d');
                        var sc = this.zoomFactor;
                        var md = ClientLib.Data.MainData.GetInstance();
                        var alliance = md.get_Alliance();
                        //console.log(this.dump(alliance,"alliance",1,true));
                        var enemies = alliance.GetAllianceRelationshipsByType(webfrontend.gui.alliance.DiplomacyPage.ERelationTypeEnemy, true);
                        var w = md.get_World();
                        var vm = ClientLib.Vis.VisMain.GetInstance();
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.fillStyle = "rgb(200,0,0)";
                        var cx = 0;
                        var cy = 0;
                        var hilitePois = [];
                        var sectors = this.getSectors(w);
                        
                        if(!this.obfAllianceId) this.obfAllianceId=this.getMemberNameByType(alliance,"number",0);
                        if(!this.obfAllianceName) this.obfAllianceName=this.getMemberNameByType(alliance,"string",0);
                        
                        var allianceName=alliance[this.obfAllianceName];
                        //console.log("Alliance: "+allianceName);
                        
                        //console.log(this.dump(this.showAlliancePois,"chkbox",1,true));
                        
                        //ctx.fillStyle="#000000";
                        //ctx.fillRect(0,0,3000,3000);
                        
                        for (var i in sectors) {// m_Sectors = RBJXOL
                            var s = sectors[i];
//                            console.log("Sector "+s.get_Id()+"\n"+ this.dump(s,"sector",2));
//                            console.log("GetPlayer "+this.dump(s.GetPlayer(s.get_Id()),"*",1));
//                            console.log("GetPlayerAllianceId "+this.dump(s.GetPlayerAllianceId(3128),"*",1));
//                            console.log("findAllianceById "+this.dump(this.findAllianceById(s, 289),"*",1));
                            // console.log("Painting sector:" + s.m_Id);
                            for (var x = 0; x < 32; x++) {
                                for (var y = 0; y < 32; y++) {
                                    cx = s.ConvertToWorldX(x);
                                    cy = s.ConvertToWorldY(y);
                                    var obj = w.GetObjectFromPosition(cx, cy);
                                    if (obj != null) {
                                        // ctx.fillStyle = colors[obj.Type];
                                        switch (obj.Type) {
                                            case 1:  // player city
//                                                console.log("DEBUG player city at "+cx+","+cy+" "+obj.AUENVZ + "("+obj.LFQYDH+")");
//                                                console.log(this.dump(obj.OSKFZU.m,"obj",2,true));
                                                //var player = s.GetPlayer(obj.PlayerId); //NOT WORKING
                                                var player = s.GetPlayerId(obj); //NOT WORKING
                                                //var player = s.GetPlayer(obj.L);
//                                                console.log(this.dump(player,"player",1));
                                                if(!player) break; //
//                                                console.log("IEHUFP "+this.dump(s.GetPlayer(obj.IEHUFP),"player",1));
                                                //var alliance = s.GetAlliance(player.Alliance);
                                                var paid=s.GetPlayerAllianceId(obj.IEHUFP);
//                                                console.log("DEBUG GetPlayerAllianceId "+paid);
                                                var alliance = this.findAllianceById(s, paid);//TODO
                                                if (alliance != null && this.visOptions.alliance == alliance[obfAllianceId]) {
                                                    ctx.fillStyle = this.visOptions.colors.highlightColor;
                                                    ctx.fillRect(cx * sc, cy * sc, sc, sc);
                                                } else if (this.isEnemy(enemies, alliance, s)) {
                                                    // console.log("Enemy found" + obj);
                                                    ctx.fillStyle = this.visOptions.colors.enemyBaseColor;
                                                    ctx.fillRect(cx * sc, cy * sc, sc, sc);
                                                } else {
                                                    //if (w.GetTerritoryTypeByCoordinates(cx,cy) == ClientLib.Data.ETerritoryType.Own) { ctx.fillStyle = "rgb(255,255,255)"; }
                                                    // ClientLib.Data.MainData.GetInstance$9().get_BaseColors$0().GetMapAllianceColorType$0(this.get_AllianceId$1()));
                                                    if (obj.PlayerId && s.GetPlayer(obj.PlayerId).Id == md.get_Player().id) {
                                                        ctx.fillStyle = this.visOptions.colors.ownBaseColor;
                                                    } else {
                                                        ctx.fillStyle = this.visOptions.colors.cityColor;
                                                    }
                                                    ctx.fillRect(cx * sc, cy * sc, sc, sc);
                                                }
                                                break;
                                            case 2: // forgotten camp
                                                ctx.fillStyle = this.visOptions.colors.baseColor;
                                                ctx.fillRect(cx * sc, cy * sc, sc, sc);
                                                break;
                                            case 3: // Camp/Outpost
                                                ctx.fillStyle = (obj.CampType == 2) ? this.visOptions.colors.campColor : this.visOptions.colors.outpostColor;
                                                ctx.fillRect(cx * sc, cy * sc, sc, sc);
                                                break;
                                            case 4: // POI or tunnel
                                                /*
                                                Type:ClientLib.Data.WorldSector.WorldObjectPointOfInterest
                                                System.Int32 Id
                                                ClientLib.Data.WorldSector.WorldObjectPointOfInterest.EPOIType POIType
                                                System.Int32 Level
                                                System.Int64 OwnerAllianceId
                                                System.String OwnerAllianceName
                                                System.Void .ctor (ClientLib.Data.WorldSector.ObjectType type ,ClientLib.Data.World world ,System.String details ,System.Int32 pos)
                                                */
                                                /*
                                                obj: {} -->
                                                obj.Type: 4
                                                obj.SequenceId: 6805
                                                obj.BNDYIS: 39
                                                obj.MYTWLL: 1
                                                obj.ADKRPM: 8527
                                                obj.YQTUPE: 123
                                                obj.HIFKIQ: "Alliance Name"
                                                obj.LSVKAD: {} -->
                                                */
                                                //console.log("POI/Tunnel ("+cx+":"+cy+" POIType:"+obj[this.getNameByIdx(obj,3)]+"):\n"+this.dump(obj,"obj",1,true));
                                                if(!this.obfPOIType) {this.obfPOIType=this.getNameByIdx(obj,3);}
                                                if(!this.obfWorldObjectPointOfInterestAllianceName) {this.obfWorldObjectPointOfInterestAllianceName=this.getMemberNameByType(obj,"string",0);}
                                                if(!this.obfWorldObjectPointOfInterestAllianceId) {this.obfWorldObjectPointOfInterestAllianceId=this.getNameByIdx(obj,5);}
                                                
                                                if (obj[this.obfPOIType] == 0) {
                                                    // Tunnel
                                                    ctx.fillStyle = this.visOptions.colors.tunnelColor;
                                                } else {
                                                    // POI
                                                    ctx.fillStyle = this.visOptions.colors.poiColor;
                                                    
                                                    if(!this.visOptions.showAlliancePois) {
                                                        if(this.visOptions.poi==-2){
                                                            // Selected POI = << All >>
                                                            hilitePois.push([cx,cy]);
                                                        }else{                                                        
                                                            if (this.visOptions.poi && this.visOptions.poi == obj[this.obfPOIType] + 1) { 
                                                                // for some reasons, the constants in ClientLib are off by 1
                                                                hilitePois.push([cx,cy]);
                                                            }
                                                        }
                                                    } else {
                                                        if(this.visOptions.poi>=0){
                                                            if (
                                                                (this.visOptions.poi && this.visOptions.poi == obj[this.obfPOIType] + 1) &&
                                                                (obj[this.obfWorldObjectPointOfInterestAllianceId]==this.visOptions.alliance)
                                                            ) { // for some reasons, the constants in ClientLib are off by 1
                                                                hilitePois.push([cx,cy]);
                                                            }
                                                        }else if(this.visOptions.poi==-2){
                                                            // Selected POI = << All >>
                                                            if(obj[this.obfWorldObjectPointOfInterestAllianceId]==this.visOptions.alliance){
                                                                hilitePois.push([cx,cy]);
                                                            }
                                                        }                                                        
                                                    }
                                                    
                                                }
                                                ctx.fillRect(cx * sc, cy * sc, sc, sc);
                                                break;
                                        }
                                    } else {
                                        var terr = w.GetTerritoryTypeByCoordinates(cx, cy);
                                        switch (terr) {
                                            case ClientLib.Data.ETerritoryType.Alliance: {
                                                ctx.fillStyle = this.visOptions.colors.allianceTerrainColor;
                                                ctx.fillRect(cx * sc, cy * sc, sc, sc);
                                                break;
                                            }
                                            case ClientLib.Data.ETerritoryType.Enemy: {
                                                if (w.GetOwner(cx, cy) != 1610612736) {
                                                    ctx.fillStyle = "rgba(80,10,10,0.5)";
                                                    ctx.fillRect(cx * sc, cy * sc, sc, sc);
                                                }
                                                break;
                                            }
                                            case ClientLib.Data.ETerritoryType.Neutral: {
                                                //ctx.fillStyle = "rgb(210,210,210)";
                                                //ctx.fillRect(cx,cy,1,1);
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        
                        // paint home bases
                        if(this.visOptions.showOwnCities){
                            var ownCities = md.get_Cities().get_AllCities().d;
                            for (var i in ownCities) {
                                var city = ownCities[i];
                                var x = city.get_PosX() * sc;
                                var y = city.get_PosY() * sc;
                                ctx.fillStyle = null;
                                ctx.strokeStyle = "rgba(255,255,255,0.7)";
                                ctx.beginPath();
                                ctx.arc(x+sc/2,y+sc/2,sc,0*Math.PI,2*Math.PI);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.strokeStyle = "rgba(255,255,255,0.3)";
                                ctx.arc(x+sc/2,y+sc/2,sc*20,0*Math.PI,2*Math.PI);
                                ctx.stroke();
                            }
                        }
                        
                        // paint hilited pois
                        ctx.strokeStyle = "rgb(255,255,255)";
                        hilitePois.forEach(function(poi) {
                           ctx.strokeRect(poi[0] * sc - 2, poi[1] * sc - 2, sc+4, sc+4);
                        });
                        // m_Region == get_Region()
                        var topX = Math.floor(vm.get_Region().get_PosX() / vm.get_Region().get_GridWidth());
                        var topY = Math.floor(vm.get_Region().get_PosY() / vm.get_Region().get_GridHeight());
                        var width = vm.get_Region().get_ViewWidth() / vm.get_Region().get_ZoomFactor() / vm.get_Region().get_GridWidth();
                        var height = vm.get_Region().get_ViewHeight() / vm.get_Region().get_ZoomFactor() / vm.get_Region().get_GridHeight();
                        ctx.strokeStyle = "rgb(200,200,200)";
                        ctx.lineWidth = 1;
                        console.log("Selection:" + topX + "," + topY + "w:" + width + "," + height);
                        
                        if(this.visOptions.showSectionFrame){
                            ctx.strokeRect(topX * sc, topY * sc, width * sc, height * sc);
                        }
                        if (topX * sc < this.scroll.getScrollX() || topX * sc > this.scroll.getScrollX() + this.scroll.getWidth()) {
                            this.scroll.scrollToX(Math.max(0, topX * sc - 100));
                        }
                        if (topY * sc < this.scroll.getScrollY() || topY * sc > this.scroll.getScrollY() + this.scroll.getHeight()) {
                            this.scroll.scrollToY(Math.max(0, topY * sc - 100));
                        }
                    },
                    getMousePos : function(canvas, evt) {
                        // get canvas position
                        var obj = canvas;
                        var top = 0;
                        var left = 0;
                        while (obj && obj.tagName != 'BODY') {
                            top += obj.offsetTop;
                            left += obj.offsetLeft;
                            obj = obj.offsetParent;
                        }
                        // return relative mouse position
                        var mouseX = evt.clientX - left + window.pageXOffset;
                        var mouseY = evt.clientY - top + window.pageYOffset;
                        return {
                            x : mouseX,
                            y : mouseY
                        };
                    },
                    saveOptions : function() {
                        if (localStorage) {
                            localStorage["TAMap.visOptions"] = JSON.stringify(this.visOptions);
                        }
                    },
                    showMap : function() {
                        console.log("Show map");
                        this.mapBox.open();
                        var debugOutput = "";
                        var mainData = ClientLib.Data.MainData.GetInstance();
                        var player_cities = mainData.get_Cities();
                        var current_city = player_cities.get_CurrentOwnCity();
                        //var sector = mainData.get_World().GetWorldSectorByCoords(current_city.get_PosX(), current_city.get_PosY());
                        //for (i in sector.m_Objects.d) {
                        //    debugOutput += JSON.stringify(sector.m_Objects.d[i]) + "<br>";
                        //}
                        //console.log(debugOutput);
                        // this.mapWidget.setValue(debugOutput);
                        //var canvas = this.mapWidget.getDomElement();
                        //console.log("Canvas:" + canvas);
                        //var ctx = canvas.getContext('2d');
                        //console.log(ctx);
                        //ctx.fillStyle = "rgb(200,0,0)";
                        //ctx.fillRect (10, 10, 55, 50);
                    },
                    getNameByIdx: function (object, idx){
                        var i=0;
                        for(var n in object) {
                            if(i==idx) return n;
                            i++;
                        }
                        return null;
                    },
                    getMemberNameByType: function (object, type, idx){
                        var i=0;
                        for(var n in object) {
                            var valueType = typeof(object[n]);
                            //console.log(n+" "+valueType);
                            if(type==valueType) {
                                if(i==idx) return n;
                                i++;
                            }                            
                        }
                        return null;
                    },
                    dump: function (object,rootName,deep,includeFunction) {
                        //console.log("dump "+rootName);
                        var dumpInternal=function(obj, path) {
                            //console.log("DEBUG: dumpInternal(obj, "+path+") ind:"+ind+", deep:"+deep+", output.length:"+s.length);
                            if(obj===null) {
                                s += "" + path +": {null}" + "\n";
                                return;
                            } else if(obj===undefined){
                                s += "" + path +": {undefined}" + "\n";
                                return;
                            }
                            var valueType = typeof(obj);
                            switch (valueType) {
                                case "function": 
                                    return;
                                    // try{var fr=obj();}catch(ex){var  fr=ex;}
                                    // s+= "" + path +": "+ "{function} returns: "+fr + "\n";return;
                                case "object"  : s+= "" + path +": {} -->" /*+ propValue.toString().substr(0,20)*/ + "\n";break;
                                case "boolean" : s+= "" + path +": "+ obj.toString() + "\n";return;
                                case "number"  : s+= "" + path +": "+ obj.toString() + "\n";return;
                                case "string"  : s+= "" + path +": \""+ obj.toString() + "\"\n";return;
                                default:s += "" + path +" ("+ valueType +"): "+ obj.toString() + "\n";return;
                            }                        
                            
                            for (var o in objs) {
                                if(o===obj) {
                                    s+= "{!Recursion stoped!}\n";
                                    return;
                                } else objs.push(obj);
                            }
                            var members=[];for (var p in obj) members.push(p);
                            if(members.length>1000) {console.log("WARNING: dump() Too much members! "+members.length); return;} //TODO
                            if(deep>0 && ind>=deep) return;
                            if(/.GHPRYH$/.test()) return; //TODO
                            if(path.length>30) {console.log("WARNING: dump() Path too long!"); return;} //TODO
                            ind++;
                            for (var propName in obj) {dumpInternal(obj[propName], path+"."+propName);}
                            ind--;
                        }
                        var objs = [];
                        var ind = 0;
                        var s = "";
                        if(typeof(rootName)=='undefined')rootName="*";
                        if(typeof(deep)=='undefined')deep=1;
                        if(typeof(includeFunction)=='undefined')includeFunction=false;
                        try{dumpInternal(object,rootName);}catch(ex){console.log("ERROR: dump() > "+ex);}
                        return s;
                    }
                }
            });
        }
        function TAMap_checkIfLoaded() {
            try {
                if ( typeof qx != 'undefined' && typeof Addons != 'undefined') {
                    var a = qx.core.Init.getApplication();
                    // application
                    var mb = qx.core.Init.getApplication().getMenuBar();
                    var addonmenu = Addons.AddonMainMenu.getInstance();
                    if (a && mb && addonmenu) {
                        createMapTweak();
                        window.TAMap.main.getInstance().initialize();
                    } else
                        window.setTimeout(TAMap_checkIfLoaded, 1000);
                } else {
                    window.setTimeout(TAMap_checkIfLoaded, 1000);
                }
            } catch (e) {
                if ( typeof console != 'undefined')
                    console.log(e);
                else if (window.opera)
                    opera.postError(e);
                else
                    GM_log(e);
            }
        }
        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(TAMap_checkIfLoaded, 1000);
        }
    }
    // injecting, because there seem to be problems when creating game interface with unsafeWindow
    var TAMapScript = document.createElement("script");
    var txt = TAMap_mainFunction.toString();
    TAMapScript.innerHTML = "(" + txt + ")();";
    TAMapScript.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain)) {
        document.getElementsByTagName("head")[0].appendChild(TAMapScript);
    }
})();










// ==UserScript==
// @name Tiberium Alliances - New Resource Trade Window
// @description Implements a new TradeOverlay class, allowing you to select individual, multiple or all bases to transfer resources from
// @namespace NewTradeOverlay
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version 1.4.7
// @author Chiantii
// @updateURL https://userscripts.org/scripts/source/168297.meta.js
// @downloadURL https://userscripts.org/scripts/source/168297.user.js
// ==/UserScript==
(function () {
    var NewTradeOverlay_main = function () {
        console.log('NewTradeOverlay loaded');
        function CreateNewTradeOverlay() {
            qx.Class.undefine("webfrontend.gui.trade.TradeOverlay");
            qx.Class.define("webfrontend.gui.trade.TradeOverlay", {
                type : "singleton",
                extend : webfrontend.gui.OverlayWindow,
                construct : function () {
                    webfrontend.gui.OverlayWindow.call(this);
                    this.set({
                        autoHide : false
                    });
                    this.clientArea.setLayout(new qx.ui.layout.HBox());
                    this.clientArea.setMargin(0);
                    this.clientArea.setWidth(464);
                    this.setTitle(qx.locale.Manager.tr("tnf:trade window title"));
                    this.clientArea.add(new qx.ui.core.Spacer(), {
                        flex : 1
                    });
                    this.clientArea.add(this.tradeWindow());
                    this.clientArea.add(new qx.ui.core.Spacer(), {
                        flex : 1
                    });
                    this.tradeConfirmationWidget = new webfrontend.gui.widgets.confirmationWidgets.TradeConfirmationWidget();
                },
                members : {
                    activated : false,
                    transferWindowTableSelectedRows : null,
                    modifier : null,
                    tradeWindowTable : null,
                    tableColumnModel : null,
                    resourceTransferType : null,
                    transferAmountTextField : null,
                    largeTiberiumImage : null,
                    costToTradeLabel : null,
                    transferFromBaseLabel : null,
                    totalResourceAmount : null,
                    selectedRowData : null,
                    selectedRow : null,
                    tradeButton : null,
                    tenPercentButton : null,
                    twentyFivePercentButton : null,
                    fiftyPercentButton : null,
                    seventyFivePercentButton : null,
                    oneHundredPercentButton : null,
                    resourceSelectionRadioButtons : null,
                    selectAllNoneButton : null,
                    userDefinedMinimumAmount : -1,
                    userDefinedMaxDistance : -1,
                    tradeConfirmationWidget : null,
                    activate : function () {
                        if (!this.activated) {
                            ClientLib.Vis.VisMain.GetInstance().PlayUISound("audio/ui/OpenWindow");
                            phe.cnc.base.Timer.getInstance().addListener("uiTick", this._onTick, this);
                            this.selectedRowData = null;
                            this.selectedRow = null;
                            this.transferWindowTableSelectedRows = [];
                            this.transferAmountTextField.setValue("");
                            this.costToTradeLabel.setValue("0");
                            this.userDefinedMinimumAmount = -1;
                            this.userDefinedMaxDistance = -1;
                            this.resourceTransferType = ClientLib.Base.EResourceType.Tiberium;
                            this.tradeWindowTable.resetCellFocus();
                            this.tradeWindowTable.resetSelection();
                            this.transferFromBaseLabel.setValue(qx.locale.Manager.tr("tnf:select base for transfer"));
                            this.resourceSelectionRadioButtons.resetSelection();
                            this.largeTiberiumImage.setSource("webfrontend/ui/common/icon_res_large_tiberium.png");
                            this.TableRowFilter();
                            this.tableColumnModel.sortByColumn(2, true);
                            qx.locale.Manager.getInstance().addTranslation("en_US", {
                                "tnf:select all" : "Select All"
                            });
                            qx.locale.Manager.getInstance().addTranslation("en_US", {
                                "tnf:select none" : "Select None"
                            });
                            qx.locale.Manager.getInstance().addTranslation("en_US", {
                                "tnf:cannot manually modify" : "Cannot be modified with multiple rows selected"
                            });
                            qx.locale.Manager.getInstance().addTranslation("en_US", {
                                "tnf:trading with multiple bases" : "Trading with multiple bases"
                            });
                            qx.locale.Manager.getInstance().addTranslation("en_US", {
                                "tnf:percent buttons" : "Please use one of the Percent buttons"
                            });
                            this.activated = true;
                        }
                    },
                    deactivate : function () {
                        if (this.activated) {
                            phe.cnc.base.Timer.getInstance().removeListener("uiTick", this._onTick, this);
                            this.tradeWindowTable.resetSelection();
                            this.tradeWindowTable.resetCellFocus();
                            this.transferAmountTextField.setValue("");
                            this.transferWindowTableSelectedRows = [];
                            this.costToTradeLabel.setValue("");
                            this.selectedRow = null;
                            this.selectedRowData = null;
                            this.modifier = 1;
                            this.activated = false;
                        }
                    },
                    getFilterMinimimAmount : function () {
                        return this.userDefinedMinimumAmount;
                    },
                    getFilterDistanceLimit : function () {
                        return this.userDefinedMaxDistance;
                    },
                    tradeWindow : function () {
                        var tradeWindowContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox(2)).set({
                            marginTop : 10,
                            marginBottom : 10,
                            marginLeft : 4
                        });

                        tradeWindowContainer.add(new qx.ui.core.Spacer(), {
                            flex : 1
                        });

                        var selectResourcesLabel = new qx.ui.basic.Label(qx.locale.Manager.tr("tnf:select resources:")).set({
                            textColor : "text-label",
                            alignY : "middle",
                            font : "font_size_13"
                        });
                        var resourceSelectionContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({
                            height : 26
                        });
                        var tiberiumToggleButton = new qx.ui.form.ToggleButton(null, "webfrontend/ui/common/icon_res_large_tiberium.png").set({
                            appearance : "button-toggle",
                            width : 84
                        });
                        tiberiumToggleButton.setUserData("key", ClientLib.Base.EResourceType.Tiberium);
                        var tiberiumImage = new qx.ui.basic.Image("webfrontend/ui/common/icn_res_tiberium.png").set({
                            width : 24,
                            height : 24,
                            scale : true
                        });
                        var crystalToggleButton = new qx.ui.form.ToggleButton(null, "webfrontend/ui/common/icon_res_large_crystal.png").set({
                            appearance : "button-toggle",
                            width : 84
                        });
                        crystalToggleButton.setUserData("key", ClientLib.Base.EResourceType.Crystal);
                        var crystalImage = new qx.ui.basic.Image("webfrontend/ui/common/icn_res_chrystal.png").set({
                            width : 24,
                            height : 24,
                            scale : true
                        });
                        resourceSelectionContainer.add(new qx.ui.core.Spacer(), {
                            flex : 1
                        });
                        resourceSelectionContainer.add(selectResourcesLabel);
                        resourceSelectionContainer.add(tiberiumToggleButton);
                        resourceSelectionContainer.add(new qx.ui.core.Spacer().set({
                            width : 2
                        }));
                        resourceSelectionContainer.add(crystalToggleButton);
                        resourceSelectionContainer.add(new qx.ui.core.Spacer(), {
                            flex : 1
                        });
                        this.resourceSelectionRadioButtons = new qx.ui.form.RadioGroup(tiberiumToggleButton, crystalToggleButton);
                        this.resourceSelectionRadioButtons.addListener("changeSelection", this.ChangeResourceType, this);

                        tradeWindowContainer.add(resourceSelectionContainer);

                        var currentServer = ClientLib.Data.MainData.GetInstance().get_Server();
                        var tradeCostToolTip = qx.locale.Manager.tr("tnf:trade costs %1 (+%2 per field)", currentServer.get_TradeCostMinimum(), currentServer.get_TradeCostPerField());
                        var searchContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox(2));
                        var searchBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                        var minimumAmountLabel = new qx.ui.basic.Label(qx.locale.Manager.tr("tnf:minimum amount:")).set({
                            textColor : "text-label",
                            alignY : "middle",
                            font : "font_size_13"
                        });
                        this.minimumAmountTextField = new qx.ui.form.TextField("").set({
                            toolTipText : qx.locale.Manager.tr("tnf:only numbers allowed")
                        });
                        this.minimumAmountTextField.setFilter(/[0-9]/);
                        this.minimumAmountTextField.setMaxLength(12);
                        var maxDistanceLabel = new qx.ui.basic.Label(qx.locale.Manager.tr("tnf:distance limit:")).set({
                            textColor : "text-label",
                            alignY : "middle",
                            font : "font_size_13",
                            toolTipText : tradeCostToolTip
                        });
                        this.maxDistanceTextField = new qx.ui.form.TextField("").set({
                            toolTipText : qx.locale.Manager.tr("tnf:only numbers allowed")
                        });
                        this.maxDistanceTextField.setFilter(/[0-9]/);
                        this.maxDistanceTextField.setMaxLength(3);
                        searchBox.add(minimumAmountLabel);
                        searchBox.add(this.minimumAmountTextField);
                        searchBox.add(new qx.ui.core.Spacer(), {
                            flex : 1
                        });
                        searchBox.add(maxDistanceLabel);
                        searchBox.add(this.maxDistanceTextField);
                        searchBox.add(new qx.ui.core.Spacer(), {
                            flex : 2
                        });

                        searchContainer.add(searchBox);

                        var searchButton = new webfrontend.ui.SoundButton(qx.locale.Manager.tr("tnf:search")).set({
                            width : 300,
                            maxWidth : 300,
                            marginBottom : 8,
                            marginTop : 4,
                            alignX : "center"
                        });
                        searchButton.addListener("execute", this.TableRowFilter, this);
                        searchContainer.add(searchButton);

                        //tradeWindowContainer.add(searchContainer);

                        this.selectAllNoneButton = new webfrontend.ui.SoundButton(qx.locale.Manager.tr("tnf:select all")).set({
                            enabled : true,
                            //appearance: "button-forum-light",
                            //textColor: "text-label",
                            width : 160
                        });

                        this.selectAllNoneButton.addListener("click", this.SelectAllRows, this);

                        tradeWindowContainer.add(this.selectAllNoneButton);

                        this.tableColumnModel = new webfrontend.data.SimpleColFormattingDataModel();
                        this.tableColumnModel.setColumns([qx.locale.Manager.tr("tnf:base"), qx.locale.Manager.tr("tnf:distance"), qx.locale.Manager.tr("tnf:$ / 1000"), qx.locale.Manager.tr("tnf:amount"), "Amount", "Max", "ID"], ["Base", "Distance", "Credits", "AmountDesc", "Amount", "Max", "ID"]);
                        this.tableColumnModel.setColumnSortable(0, true);
                        this.tableColumnModel.setColumnSortable(1, true);
                        this.tableColumnModel.setColumnSortable(2, true);
                        this.tableColumnModel.setColumnSortable(3, true);
                        this.tableColumnModel.setSortMethods(3, this.AmountSort);
                        this.tradeWindowTable = new webfrontend.gui.trade.TradeBaseTable(this.tableColumnModel).set({
                            statusBarVisible : false,
                            columnVisibilityButtonVisible : false,
                            maxHeight : 300
                        });
                        this.tradeWindowTable.addListener("cellClick", this.TradeWindowTableCellClick, this);
                        this.tradeWindowTable.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);
                        this.tradeWindowTable.setDataRowRenderer(new webfrontend.gui.trade.TradeBaseTableRowRenderer(this.tradeWindowTable));
                        this.tradeWindowTable.showCellToolTip = true;
                        var tradeWindowTableColumnModel = this.tradeWindowTable.getTableColumnModel();
                        tradeWindowTableColumnModel.setDataCellRenderer(0, new qx.ui.table.cellrenderer.String());
                        tradeWindowTableColumnModel.setDataCellRenderer(1, new qx.ui.table.cellrenderer.Number());
                        tradeWindowTableColumnModel.setDataCellRenderer(2, new qx.ui.table.cellrenderer.Number());
                        tradeWindowTableColumnModel.setHeaderCellRenderer(2, new qx.ui.table.headerrenderer.Default());
                        tradeWindowTableColumnModel.getHeaderCellRenderer(2).setToolTip(tradeCostToolTip);
                        tradeWindowTableColumnModel.setDataCellRenderer(3, new webfrontend.gui.trade.TradeBaseTableCellRenderer());
                        tradeWindowTableColumnModel.setColumnWidth(0, 160);
                        tradeWindowTableColumnModel.setColumnWidth(1, 60);
                        tradeWindowTableColumnModel.setColumnWidth(2, 100);
                        tradeWindowTableColumnModel.setColumnVisible(4, false);
                        tradeWindowTableColumnModel.setColumnVisible(5, false);
                        tradeWindowTableColumnModel.setColumnVisible(6, false);
                        tradeWindowContainer.add(this.tradeWindowTable);

                        var transferAmountContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox());
                        var transferAmountBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(2)).set({
                            minHeight : 36
                        });
                        this.largeTiberiumImage = new qx.ui.basic.Image("webfrontend/ui/common/icon_res_large_tiberium.png").set({
                            alignY : "middle",
                            width : 22,
                            height : 20,
                            scale : true
                        });
                        this.transferFromBaseLabel = new qx.ui.basic.Label(qx.locale.Manager.tr("tnf:select base for transfer")).set({
                            rich : true,
                            textColor : "text-label",
                            marginBottom : 2,
                            alignY : "middle",
                            maxWidth : 182
                        });
                        this.transferAmountTextField = new qx.ui.form.TextField("").set({
                            toolTipText : qx.locale.Manager.tr("tnf:only numbers allowed"),
                            enabled : false,
                            width : 208,
                            marginRight : 1
                        });
                        this.transferAmountTextField.setFilter(/[0-9]/);
                        this.transferAmountTextField.setMaxLength(20);
                        this.transferAmountTextField.addListener("input", this.ResourceAmountChanged, this);
                        transferAmountBox.add(this.largeTiberiumImage);
                        transferAmountBox.add(this.transferFromBaseLabel);
                        var percentButtonsBox = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({
                            marginTop : 2
                        });
                        this.tenPercentButton = new webfrontend.ui.SoundButton("10%").set({
                            enabled : false,
                            appearance : "button-forum-light",
                            textColor : "text-label",
                            width : 42
                        });
                        this.tenPercentButton.addListener("execute", this.TenPercent, this);
                        this.twentyFivePercentButton = new webfrontend.ui.SoundButton("25%").set({
                            enabled : false,
                            appearance : "button-forum-light",
                            textColor : "text-label",
                            width : 42
                        });
                        this.twentyFivePercentButton.addListener("execute", this.TwentyFivePercent, this);
                        this.fiftyPercentButton = new webfrontend.ui.SoundButton("50%").set({
                            enabled : false,
                            appearance : "button-forum-light",
                            textColor : "text-label",
                            width : 42
                        });
                        this.fiftyPercentButton.addListener("execute", this.FiftyPercent, this);
                        this.seventyFivePercentButton = new webfrontend.ui.SoundButton("75%").set({
                            enabled : false,
                            appearance : "button-forum-light",
                            textColor : "text-label",
                            width : 42
                        });
                        this.seventyFivePercentButton.addListener("execute", this.SeventyFivePercent, this);
                        this.oneHundredPercentButton = new webfrontend.ui.SoundButton("100%").set({
                            enabled : false,
                            appearance : "button-forum-light",
                            textColor : "text-label",
                            width : 42
                        });
                        this.oneHundredPercentButton.addListener("execute", this.OneHundredPercent, this);
                        percentButtonsBox.add(this.tenPercentButton);
                        percentButtonsBox.add(this.twentyFivePercentButton);
                        percentButtonsBox.add(this.fiftyPercentButton);
                        percentButtonsBox.add(this.seventyFivePercentButton);
                        percentButtonsBox.add(this.oneHundredPercentButton);
                        transferAmountContainer.add(transferAmountBox);
                        transferAmountContainer.add(this.transferAmountTextField);
                        transferAmountContainer.add(percentButtonsBox);
                        var tradeCostContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
                            alignX : "center",
                            maxWidth : 148
                        });
                        var tradeCostLabel = new qx.ui.basic.Label(qx.locale.Manager.tr("tnf:costs:")).set({
                            textColor : "text-label",
                            marginBottom : 2,
                            font : "font_size_13_bold",
                            width : 148,
                            textAlign : "center"
                        });
                        var tradeCostBox = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({
                            alignX : "center",
                            allowGrowX : true,
                            marginTop : 10
                        });
                        this.costToTradeLabel = new qx.ui.basic.Label().set({
                            textColor : "text-value",
                            alignY : "middle",
                            font : "font_size_14_bold",
                            marginLeft : 3
                        });
                        var dollarImage = new qx.ui.basic.Image("webfrontend/ui/common/icon_res_large_credits.png").set({
                            width : 18,
                            height : 20,
                            scale : true,
                            AutoFlipH : false
                        });
                        tradeCostBox.add(new qx.ui.core.Spacer(), {
                            flex : 1
                        });
                        tradeCostBox.add(dollarImage);
                        tradeCostBox.add(this.costToTradeLabel);
                        tradeCostBox.add(new qx.ui.core.Spacer(), {
                            flex : 1
                        });
                        this.tradeButton = new webfrontend.ui.SoundButton(qx.locale.Manager.tr("tnf:trade")).set({
                            width : 196,
                            enabled : false
                        });
                        this.tradeButton.addListener("execute", this.TradeWithBases, this);
                        tradeCostContainer.add(tradeCostLabel);
                        tradeCostContainer.add(tradeCostBox);
                        tradeCostContainer.add(this.tradeButton);
                        var tradeWindowCanvas = new qx.ui.container.Composite(new qx.ui.layout.Canvas()).set({
                            decorator : new qx.ui.decoration.Background().set({
                                backgroundRepeat : 'no-repeat',
                                backgroundImage : "webfrontend/ui/menues/resource_transfer/bgr_restransfer_summary.png"
                            })
                        });
                        tradeWindowCanvas.add(transferAmountContainer, {
                            left : 50,
                            top : 5
                        });
                        tradeWindowCanvas.add(tradeCostContainer, {
                            left : 285,
                            top : 18
                        });
                        tradeWindowCanvas.add(this.tradeButton, {
                            left : 134,
                            top : 100
                        });
                        tradeWindowContainer.add(tradeWindowCanvas);
                        return tradeWindowContainer;
                    },
                    TableRowFilter : function () {
                        var tableArray = [];
                        var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                        if (currentCity != null) {
                            this.userDefinedMaxDistance = this.maxDistanceTextField.getValue() == "" ? -1 : parseInt(this.maxDistanceTextField.getValue(), 10);
                            this.userDefinedMinimumAmount = this.minimumAmountTextField.getValue() == "" ? -1 : parseInt(this.minimumAmountTextField.getValue(), 10);
                            var allCities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities();
                            for (var currentBase in allCities.d) {
                                if (currentCity.get_Id() != currentBase && allCities.d[currentBase].IsOwnBase()) {
                                    var otherCity = allCities.d[currentBase];
                                    var currentBaseID = currentBase;
                                    var otherCityName = otherCity.get_Name();
                                    var distance = ClientLib.Base.Util.CalculateDistance(currentCity.get_X(), currentCity.get_Y(), otherCity.get_X(), otherCity.get_Y());
                                    var costToTrade = currentCity.CalculateTradeCostToCoord(otherCity.get_X(), otherCity.get_Y(), 1000);
                                    var resourceAmount = Math.floor(otherCity.GetResourceCount(this.resourceTransferType));
                                    var maxResources = Math.floor(otherCity.GetResourceMaxStorage(this.resourceTransferType));
                                    var disqualifyDistance = false;
                                    var disqualifyAmount = false;
                                    if (this.userDefinedMaxDistance != -1 && this.userDefinedMaxDistance < distance)
                                        disqualifyDistance = true;
                                    if (this.userDefinedMinimumAmount != -1 && this.userDefinedMinimumAmount > resourceAmount)
                                        disqualifyAmount = true;
                                    if (!disqualifyDistance && !disqualifyAmount) {
                                        var formattedAmount = phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount);
                                        tableArray.push({
                                            Base : otherCityName,
                                            Distance : distance,
                                            Credits : costToTrade,
                                            AmountDesc : formattedAmount,
                                            Amount : resourceAmount,
                                            Max : maxResources.toString(),
                                            ID : currentBaseID
                                        });
                                    }
                                }
                            }
                            this.tableColumnModel.setDataAsMapArray(tableArray, true);
                            this.selectedRow = null;
                            this.selectedRowData = null;
                            this.tradeWindowTable.resetCellFocus();
                            this.MaintainTradeWindow();
                        }
                    },
                    SelectAllRows : function () {
                        if (this.tradeWindowTable.getSelectionModel().getSelectedCount() != this.tableColumnModel.getRowCount()) {
                            this.tradeWindowTable.getSelectionModel().setSelectionInterval(0, this.tableColumnModel.getRowCount() - 1);
                            this.transferAmountTextField.setValue("");
                            this.totalResourceAmount = 0;
                            this.costToTradeLabel.setValue("0");
                            this.selectAllNoneButton.setLabel(qx.locale.Manager.tr("tnf:select none"));
                            this.transferFromBaseLabel.setValue(qx.locale.Manager.tr("tnf:trading with multiple bases"));
                            this.UpdateSelectedRows(this.tableColumnModel.getRowData(0));
                            this.selectedRowData = this.tableColumnModel.getRowData(0);
                        } else {
                            this.tradeWindowTable.resetSelection();
                            this.tradeWindowTable.resetCellFocus();
                            this.transferAmountTextField.setValue("");
                            this.transferWindowTableSelectedRows = [];
                            this.SetCostLabel();
                            this.transferAmountTextField.setToolTipText(qx.locale.Manager.tr("tnf:only numbers allowed"));
                            this.transferFromBaseLabel.setValue(qx.locale.Manager.tr("tnf:select base for transfer"));
                            this.selectAllNoneButton.setLabel(qx.locale.Manager.tr("tnf:select all"));
                        }
                    },
                    AmountSort : function (bI, bJ) {
                        if (bI[4] < bJ[4])
                            return -1;
                        if (bI[4] > bJ[4])
                            return 1;
                        return 0;
                    },
                    UpdateSelectedRows : function (rowData) {
                        this.transferWindowTableSelectedRows = [];

                        var localRows = [];
                        var colModel = this.tableColumnModel;

                        this.tradeWindowTable.getSelectionModel().iterateSelection(function (index) {
                            var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(colModel.getRowData(index).ID);
                            if (city != null && city.CanTrade() == ClientLib.Data.ETradeError.None)
                                localRows.push(colModel.getRowData(index));
                        });
                        this.transferWindowTableSelectedRows = localRows;

                    },
                    TradeWindowTableCellClick : function (e) {

                        var rowData = this.tableColumnModel.getRowData(e.getRow());
                        var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(rowData.ID);

                        this.modifier = 0;
                        this.transferAmountTextField.setValue("");
                        this.SetCostLabel();

                        if (city != null && city.CanTrade() == ClientLib.Data.ETradeError.None) {
                            this.selectedRow = e.getRow();
                            this.selectedRowData = rowData;

                            this.UpdateSelectedRows();

                            if (this.transferWindowTableSelectedRows.length == 1)
                                this.transferFromBaseLabel.setValue(qx.locale.Manager.tr("tnf:trade with %1", "<b>" + rowData.Base + "</b>"));
                            if (this.transferWindowTableSelectedRows.length > 1)
                                this.transferFromBaseLabel.setValue(qx.locale.Manager.tr("tnf:trading with multiple bases"));

                        }

                        this.MaintainTradeWindow();

                    },
                    ChangeResourceType : function (e) {
                        var userObject = e.getData()[0];
                        this.transferAmountTextField.setValue("");
                        this.transferWindowTableSelectedRows = [];
                        this.SetCostLabel();
                        this.tradeWindowTable.resetSelection();
                        this.tradeWindowTable.resetCellFocus();
                        this.resourceTransferType = userObject.getUserData("key");
                        if (this.resourceTransferType == ClientLib.Base.EResourceType.Tiberium) {
                            this.largeTiberiumImage.setSource("webfrontend/ui/common/icon_res_large_tiberium.png");
                        } else {
                            this.largeTiberiumImage.setSource("webfrontend/ui/common/icon_res_large_crystal.png");
                        }
                        this.selectAllNoneButton.setLabel(qx.locale.Manager.tr("tnf:select all"));
                        this.MaintainTradeWindow();
                    },
                    ResourceAmountChanged : function () {
                        this.modifier = 1;
                        this.SetCostLabel();
                    },
                    CalculateTradeCost : function () {
                        this.totalTransferAmount = 0;

                        if (this.transferWindowTableSelectedRows.length > 0) {

                            var cities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
                            var selectedCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();

                            if (this.transferWindowTableSelectedRows.length > 1) {
                                for (var base in this.transferWindowTableSelectedRows) {
                                    this.totalTransferAmount += cities[this.transferWindowTableSelectedRows[base].ID].CalculateTradeCostToCoord(selectedCity.get_PosX(), selectedCity.get_PosY(), this.transferWindowTableSelectedRows[base].Amount * this.modifier);
                                }
                            } else {
                                this.totalTransferAmount += cities[this.selectedRowData.ID].CalculateTradeCostToCoord(selectedCity.get_PosX(), selectedCity.get_PosY(), parseInt(this.transferAmountTextField.getValue().replace(/[^0-9]/g, '')));
                            }
                            return this.totalTransferAmount;
                        }
                        return 0;
                    },
                    ModifyResourceAmount : function (modifier) {
                        this.totalResourceAmount = 0;

                        this.UpdateSelectedRows(this.selectedRowData);

                        if (this.transferWindowTableSelectedRows.length > 0) {
                            for (var base in this.transferWindowTableSelectedRows) {
                                this.totalResourceAmount += Math.floor(this.transferWindowTableSelectedRows[base].Amount * modifier);
                            }
                            return this.totalResourceAmount;
                        }
                        return 0;
                    },
                    SetCostLabel : function () {
                        var tradeCost = this.CalculateTradeCost();
                        if (this.transferAmountTextField.getValue() == "")
                            tradeCost = 0;
                        this.costToTradeLabel.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompactAfterMillion(tradeCost).toString());
                        this.costToTradeLabel.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(tradeCost).toString());
                        //this.MaintainTradeWindow();
                    },
                    TenPercent : function () {
                        this.modifier = 0.1;
                        var resourceAmount = this.ModifyResourceAmount(0.1);
                        this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
                        this.SetCostLabel();
                    },
                    TwentyFivePercent : function () {
                        this.modifier = 0.25;
                        var resourceAmount = this.ModifyResourceAmount(0.25);
                        this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
                        this.SetCostLabel();
                    },
                    FiftyPercent : function () {
                        this.modifier = 0.5;
                        var resourceAmount = this.ModifyResourceAmount(0.5);
                        this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
                        this.SetCostLabel();
                    },
                    SeventyFivePercent : function () {
                        this.modifier = 0.75;
                        var resourceAmount = this.ModifyResourceAmount(0.75);
                        this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
                        this.SetCostLabel();
                    },
                    OneHundredPercent : function () {
                        this.modifier = 1;
                        var resourceAmount = this.ModifyResourceAmount(1);
                        this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
                        this.SetCostLabel();
                    },
                    TradeWithBases : function () {
                        var transferAmount = 0;
                        var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                        if (this.transferWindowTableSelectedRows.length > 0) {
                            if (currentCity != null && this.transferAmountTextField.getValue() != "") {
                                for (var base in this.transferWindowTableSelectedRows) {
                                    var currentBase = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(this.transferWindowTableSelectedRows[base].ID);
                                    if (currentBase != null && currentBase.CanTrade() == ClientLib.Data.ETradeError.None && currentCity.CanTrade() == ClientLib.Data.ETradeError.None) {
                                        this.tradeButton.setEnabled(false);
                                        if (this.transferWindowTableSelectedRows.length == 1) {
                                            transferAmount = parseInt(this.transferAmountTextField.getValue().replace(/[^0-9]/g, ''));
                                        } else {
                                            transferAmount = parseInt(this.transferWindowTableSelectedRows[base].Amount * this.modifier, 10);
                                        }
                                        ClientLib.Data.MainData.GetInstance().get_Player().AddCredits(-currentCity.CalculateTradeCostToCoord(currentBase.get_X(), currentBase.get_Y(), transferAmount));
                                        currentCity.AddResources(this.resourceTransferType, transferAmount);
                                        currentBase.AddResources(this.resourceTransferType, -transferAmount);
                                        ClientLib.Net.CommunicationManager.GetInstance().SendCommand("SelfTrade", {
                                            targetCityId : currentCity.get_Id(),
                                            sourceCityId : currentBase.get_Id(),
                                            resourceType : this.resourceTransferType,
                                            amount : transferAmount
                                        }, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, this.TradeResult), null);
                                    }
                                }

                                this.tradeWindowTable.resetSelection();
                                this.tradeWindowTable.resetCellFocus();
                                this.transferWindowTableSelectedRows = [];
                                this.transferAmountTextField.setValue("");
                                this.selectAllNoneButton.setLabel(qx.locale.Manager.tr("tnf:select all"));
                                this.SetCostLabel();
                            }
                        }
                    },
                    TradeResult : function (ce, result) {
                        if (result != ClientLib.Base.EErrorCode.Success) {
                            var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(this.selectedRowData.ID);
                            this.tradeConfirmationWidget.showTradeError(this, null, city.get_Name());
                        } else {
                            this.SetCostLabel();
                        }
                        this.tradeButton.setEnabled(true);
                    },
                    UpdateTradeTableData : function () {
                        var updatedResourceCount = [];
                        var otherCity = null;
                        var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                        if (currentCity != null) {
                            var transferWindowsTableData = this.tableColumnModel.getDataAsMapArray();
                            for (var row in transferWindowsTableData) {
                                otherCity = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(transferWindowsTableData[row].ID);
                                if (otherCity != null && currentCity.get_Id() != otherCity.get_Id() && otherCity.IsOwnBase()) {
                                    var otherCityID = otherCity.get_Id();
                                    var otherCityName = otherCity.get_Name();
                                    var otherCityDistance = ClientLib.Base.Util.CalculateDistance(currentCity.get_X(), currentCity.get_Y(), otherCity.get_X(), otherCity.get_Y());
                                    var otherCityTradeCost = currentCity.CalculateTradeCostToCoord(otherCity.get_X(), otherCity.get_Y(), 1000);
                                    var otherCityResourceCount = Math.floor(otherCity.GetResourceCount(this.resourceTransferType));
                                    var otherCityMaxStorage = Math.floor(otherCity.GetResourceMaxStorage(this.resourceTransferType));
                                    var otherCityResourceCountFormatted = phe.cnc.gui.util.Numbers.formatNumbers(otherCityResourceCount);
                                    updatedResourceCount.push({
                                        Base : otherCityName,
                                        Distance : otherCityDistance,
                                        Credits : otherCityTradeCost,
                                        AmountDesc : otherCityResourceCountFormatted,
                                        Amount : otherCityResourceCount,
                                        Max : otherCityMaxStorage.toString(),
                                        ID : otherCityID
                                    });
                                } else {
                                    updatedResourceCount.push(transferWindowsTableData[row]);
                                }
                            }
                            this.tableColumnModel.setDataAsMapArray(updatedResourceCount, true, false);
                            if (this.selectedRow != null) {
                                var selectedRowData = this.tableColumnModel.getRowData(this.selectedRow);
                                otherCity = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(selectedRowData.ID);
                                if (otherCity != null && currentCity.get_Id() != otherCity.get_Id() && otherCity.IsOwnBase() && otherCity.CanTrade() != ClientLib.Data.ETradeError.None) {
                                    this.selectedRowData = null;
                                    this.selectedRow = null;
                                    this.tradeWindowTable.resetCellFocus();
                                } else {
                                    this.selectedRowData = selectedRowData;
                                }
                            }
                        }
                    },
                    MaintainTradeWindow : function () {

                        var hasEnoughtCredits = false;
                        var validResourceAmount = true;

                        if (this.transferWindowTableSelectedRows.length > 0) {

                            var resourcesInTextField = parseInt(this.transferAmountTextField.getValue().replace(/[^0-9]/g, ''));
                            var tradeCost = this.CalculateTradeCost();
                            var playerCreditCount = ClientLib.Data.MainData.GetInstance().get_Player().GetCreditsCount();

                            if (playerCreditCount < tradeCost) {
                                this.costToTradeLabel.setTextColor("text-error");
                            } else {
                                this.costToTradeLabel.resetTextColor();
                            }

                            var selectedBaseResourceAmount = parseInt(this.selectedRowData.Amount, 10);

                            if (this.transferAmountTextField.getValue() != "" && this.transferWindowTableSelectedRows.length > 1) {
                                //Automatically update the text field with the new resource amount each tick
                                var resourceAmount = this.ModifyResourceAmount(this.modifier);
                                this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
                                this.SetCostLabel();
                            }

                            if (this.transferWindowTableSelectedRows.length == 1) {
                                if (resourcesInTextField == 0 || selectedBaseResourceAmount < resourcesInTextField) {
                                    this.transferAmountTextField.setTextColor("text-error");
                                } else {
                                    this.transferAmountTextField.resetTextColor();
                                }
                                validResourceAmount = resourcesInTextField > 0 && resourcesInTextField <= selectedBaseResourceAmount;
                            }

                            hasEnoughtCredits = playerCreditCount >= tradeCost;

                        }

                        this.tradeButton.setEnabled(this.transferWindowTableSelectedRows.length > 0 && hasEnoughtCredits && validResourceAmount && this.transferAmountTextField.getValue() != "");
                        this.transferAmountTextField.setEnabled(this.transferWindowTableSelectedRows.length > 0);
                        this.tenPercentButton.setEnabled(this.transferWindowTableSelectedRows.length > 0);
                        this.twentyFivePercentButton.setEnabled(this.transferWindowTableSelectedRows.length > 0);
                        this.fiftyPercentButton.setEnabled(this.transferWindowTableSelectedRows.length > 0);
                        this.seventyFivePercentButton.setEnabled(this.transferWindowTableSelectedRows.length > 0);
                        this.oneHundredPercentButton.setEnabled(this.transferWindowTableSelectedRows.length > 0);

                        this.transferAmountTextField.setReadOnly(this.transferWindowTableSelectedRows.length > 1);

                        if (this.tradeWindowTable.getSelectionModel().getSelectedCount() > 1) {
                            this.transferAmountTextField.setToolTipText(qx.locale.Manager.tr("tnf:percent buttons"));
                        } else {
                            this.transferAmountTextField.setToolTipText(qx.locale.Manager.tr("tnf:only numbers allowed"));
                        }

                    },
                    _onTick : function () {
                        var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                        if (currentCity != null && currentCity.get_HasIncommingAttack()) {
                            this.onBtnClose();
                        }
                        this.UpdateTradeTableData();
                        this.MaintainTradeWindow();
                    }
                }
            });
        }

        function NewTradeOverlay_checkIfLoaded() {
            try {
                if (typeof qx !== 'undefined' && typeof qx.locale !== 'undefined' && typeof qx.locale.Manager !== 'undefined' && typeof webfrontend.gui.trade.TradeOverlay !== 'undefined') {
                    qx.Class.undefine("webfrontend.gui.trade.TradeOverlay");
                    CreateNewTradeOverlay();
                } else {
                    window.setTimeout(NewTradeOverlay_checkIfLoaded, 1000);
                }
            } catch (e) {
                console.log("NewTradeOverlay_checkIfLoaded: ", e);
            }
        }

        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(NewTradeOverlay_checkIfLoaded, 1000);
        }
    };

    try {
        var NewTradeOverlay = document.createElement("script");
        NewTradeOverlay.innerHTML = "(" + NewTradeOverlay_main.toString() + ")();";
        NewTradeOverlay.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName("head")[0].appendChild(NewTradeOverlay);
        }
    } catch (e) {
        console.log("NewTradeOverlay: init error: ", e);
    }

})();










// ==UserScript==
// @name Tiberium Alliances PvP/PvE Player Info Mod
// @description Separates the number of bases destroyed into PvP and PvE in the Player Info window. Now also includes a tab showing all the POI the player is holding.
// @namespace player_info_mod
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version 1.2
// @author KRS_L
// ==/UserScript==
(function () {
    var PlayerInfoMod_main = function () {
        var playerInfoWindow = null;
        var general = null;
        var pvpScoreLabel = null;
        var pveScoreLabel = null;
        var playerName = null;
        var tabView = null;
        var tableModel = null;
        var baseCoords = null;
        var rowData = null;

        function createPlayerInfoMod() {
            try {
                console.log('Player Info Mod loaded');
                var tr = qx.locale.Manager.tr;
                playerInfoWindow = webfrontend.gui.info.PlayerInfoWindow.getInstance();
                general = playerInfoWindow.getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[1].getChildren()[0];
                tabView = playerInfoWindow.getChildren()[0];
                playerName = general.getChildren()[1];

                var pvpLabel = new qx.ui.basic.Label("- PvP:");
                pvpScoreLabel = new qx.ui.basic.Label("").set({
                    textColor: "text-value",
                    font: "font_size_13_bold"
                });
                general.add(pvpLabel, {
                    row: 3,
                    column: 3
                });
                general.add(pvpScoreLabel, {
                    row: 3,
                    column: 4
                });

                var pveLabel = new qx.ui.basic.Label("- PvE:");
                pveScoreLabel = new qx.ui.basic.Label("").set({
                    textColor: "text-value",
                    font: "font_size_13_bold"
                });
                general.add(pveLabel, {
                    row: 4,
                    column: 3
                });
                general.add(pveScoreLabel, {
                    row: 4,
                    column: 4
                });

                var poiTab = new qx.ui.tabview.Page("POI");
                poiTab.setLayout(new qx.ui.layout.Canvas());
                poiTab.setPaddingTop(6);
                poiTab.setPaddingLeft(8);
                poiTab.setPaddingRight(10);
                poiTab.setPaddingBottom(8);

                tableModel = new webfrontend.data.SimpleColFormattingDataModel().set({
                    caseSensitiveSorting: false
                });

                tableModel.setColumns([tr("tnf:name"), tr("tnf:lvl"), tr("tnf:points"), tr("tnf:coordinates")], ["t", "l", "s", "c"]);
                tableModel.setColFormat(3, "<div style=\"cursor:pointer;color:" + webfrontend.gui.util.BBCode.clrLink + "\">", "</div>");
                var poiTable = new webfrontend.gui.widgets.CustomTable(tableModel);
                poiTable.addListener("cellClick", centerCoords, this);

                var columnModel = poiTable.getTableColumnModel();
                columnModel.setColumnWidth(0, 250);
                columnModel.setColumnWidth(1, 80);
                columnModel.setColumnWidth(2, 120);
                columnModel.setColumnWidth(3, 120);
                columnModel.setDataCellRenderer(3, new qx.ui.table.cellrenderer.Html());
                columnModel.getDataCellRenderer(2).setUseAutoAlign(false);
                poiTable.setStatusBarVisible(false);
                poiTable.setColumnVisibilityButtonVisible(false);
                poiTab.add(poiTable, {
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0
                });
                tabView.add(poiTab);

                playerInfoWindow.addListener("close", onPlayerInfoWindowClose, this);
                playerName.addListener("changeValue", onPlayerChanged, this);

            } catch (e) {
                console.log("createPlayerInfoMod: ", e);
            }
        }

        function centerCoords(e) {
            try {
                var poiCoord = tableModel.getRowData(e.getRow())[3].split(":");
                if (e.getColumn() == 3) webfrontend.gui.UtilView.centerCoordinatesOnRegionViewWindow(Number(poiCoord[0]), Number(poiCoord[1]));
            } catch (e) {
                console.log("centerCoords: ", e);
            }
        }

        function onPlayerInfo(context, data) {
            try {
                pvpScoreLabel.setValue((data.bd - data.bde).toString());
                pveScoreLabel.setValue(data.bde.toString());
                var bases = data.c;
                baseCoords = new Object;
                for (var i in bases) {
                    var base = bases[i];
                    baseCoords[i] = new Object();
                    baseCoords[i]["x"] = base.x;
                    baseCoords[i]["y"] = base.y;
                }
                ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicAllianceInfo", {
                    id: data.a
                }, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, onAllianceInfo), null);
            } catch (e) {
                console.log("onPlayerInfo: ", e);
            }
        }

        function onAllianceInfo(context, data) {
            try {
                rowData = [];
                var pois = data.opois;
                for (var i in pois) {
                    var poi = pois[i];
                    for (var j in baseCoords) {
                        var distanceX = Math.abs(baseCoords[j].x - poi.x);
                        var distanceY = Math.abs(baseCoords[j].y - poi.y);
                        if (distanceX > 2 || distanceY > 2) continue;
                        if (distanceX == 2 && distanceY == 2) continue;
                        var name = phe.cnc.gui.util.Text.getPoiInfosByType(poi.t).name;
                        var level = poi.l;
                        var score = ClientLib.Base.PointOfInterestTypes.GetScoreByLevel(poi.l);
                        var coords = phe.cnc.gui.util.Numbers.formatCoordinates(poi.x, poi.y);
                        rowData.push([name, level, score, coords]);
                        break;
                    }
                }
                tableModel.setData(rowData);
                tableModel.sortByColumn(0, true);
            } catch (e) {
                console.log("onAllianceInfo: ", e);
            }
        }

        function onPlayerChanged() {
            try {
                if (playerName.getValue().length > 0) {
                    ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicPlayerInfoByName", {
                        name: playerName.getValue()
                    }, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, onPlayerInfo), null);
                }
            } catch (e) {
                console.log("onPlayerChanged: ", e);
            }
        }

        function onPlayerInfoWindowClose() {
            try {
                pvpScoreLabel.setValue("");
                pveScoreLabel.setValue("");
                tableModel.setData([]);
            } catch (e) {
                console.log("onPlayerInfoWindowClose: ", e);
            }
        }

        function PlayerInfoMod_checkIfLoaded() {
            try {
                if (typeof qx !== 'undefined' && typeof qx.locale !== 'undefined' && typeof qx.locale.Manager !== 'undefined') {
                    if (ClientLib.Data.MainData.GetInstance().get_Alliance().get_FirstLeaders() !== null && ClientLib.Data.MainData.GetInstance().get_Alliance().get_FirstLeaders().l.length != 0) {
                        createPlayerInfoMod();
                    } else {
                        window.setTimeout(PlayerInfoMod_checkIfLoaded, 1000);
                    }
                } else {
                    window.setTimeout(PlayerInfoMod_checkIfLoaded, 1000);
                }
            } catch (e) {
                console.log("PlayerInfoMod_checkIfLoaded: ", e);
            }
        }

        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(PlayerInfoMod_checkIfLoaded, 1000);
        }
    }

    try {
        var PlayerInfoMod = document.createElement("script");
        PlayerInfoMod.innerHTML = "(" + PlayerInfoMod_main.toString() + ")();";
        PlayerInfoMod.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName("head")[0].appendChild(PlayerInfoMod);
        }
    } catch (e) {
        console.log("PlayerInfoMod: init error: ", e);
    }
})();










// ==UserScript==
// @name       Tiberium Alliances Info Sticker
// @namespace  TAInfoSticker
// @version    1.11.06
// @description  Based on Maelstrom Dev Tools. Modified MCV timer, repair time label, resource labels.
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @author unicode *edited by dbendure*
// ==/UserScript==
(function () {
    var InfoSticker_main = function () {
        try {
            function createInfoSticker() {
                console.log('InfoSticker loaded');
                // define Base
                qx.Class.define("InfoSticker.Base", {
                    type: "singleton",
                    extend: qx.core.Object,
                    members: {
                        /* Desktop */
                        dataTimerInterval: 1000,
                        positionInterval: 500,
                        tibIcon: null,
                        cryIcon: null,
                        powIcon: null,
                        creditIcon: null,
                        repairIcon: null,
                        hasStorage: false,

                        initialize: function () {
                            try {
                                this.hasStorage = 'localStorage' in window && window['localStorage'] !== null;
                            } catch (se) {}
                            try {
                                var fileManager = ClientLib.File.FileManager.GetInstance();
                                this.tibIcon = fileManager.GetPhysicalPath("ui/common/icn_res_tiberium.png");
                                this.cryIcon = fileManager.GetPhysicalPath("ui/common/icn_res_chrystal.png");
                                this.powIcon = fileManager.GetPhysicalPath("ui/common/icn_res_power.png");
                                this.creditIcon = fileManager.GetPhysicalPath("ui/common/icn_res_dollar.png");
                                this.repairIcon = fileManager.GetPhysicalPath("ui/icons/icn_repair_off_points.png");
                                
                                if (typeof phe.cnc.Util.attachNetEvent == 'undefined')
                                    this.attachEvent = webfrontend.gui.Util.attachNetEvent;
                                else
                                    this.attachEvent = phe.cnc.Util.attachNetEvent;
                                
                                this.runMainTimer();
                            } catch (e) {
                                console.log("InfoSticker.initialize: ", e.toString());
                            }
                        },
                        runMainTimer: function () {
                            try {
                                var self = this;
                                this.calculateInfoData();
                                window.setTimeout(function () {
                                    self.runMainTimer();
                                }, this.dataTimerInterval);
                            } catch (e) {
                                console.log("InfoSticker.runMainTimer: ", e.toString());
                            }
                        },
                        runPositionTimer: function () {
                            try {
                                var self = this;
                                this.repositionSticker();
                                window.setTimeout(function () {
                                    self.runPositionTimer();
                                }, this.positionInterval);
                            } catch (e) {
                                console.log("InfoSticker.runPositionTimer: ", e.toString());
                            }
                        },
                        infoSticker: null,
                        mcvPopup: null,
                        mcvTimerLabel: null,
                        mcvInfoLabel: null,
                        mcvPane: null,
                        
                        repairPopup: null,
                        repairTimerLabel: null,

                        resourcePane: null,
                        resourceHidden: false,
                        resourceTitleLabel: null,
                        resourceHideButton: null,
                        resourceLabel1: null,
                        resourceLabel2: null,
                        resourceLabel3: null,

                        resourceLabel1per: null,
                        resourceLabel2per: null,
                        resourceLabel3per: null,

                        productionTitleLabel: null,
                        productionLabelPower: null,
                        productionLabelCredit: null,

                        repairInfoLabel: null,

                        lastButton: null,

                        top_image: null,
                        bot_image: null,

                        toFlipH: [],

                        pinButton: null,
                        pinned: false,

                        pinTop: 130,
                        pinButtonDecoration: null,
                        pinPane: null,

                        pinIconFix: false,
                        
                        lockButton: null,
                        locked: false,

                        lockButtonDecoration: null,
                        lockPane: null,

                        lockIconFix: false,
                        
                        mcvHide: false,
                        repairHide: false,
                        resourceHide: false,
                        productionHide: false,
                        contProductionHide: false,
                        costHide: false,
                        DEFcostHide: false,
                        stickerBackground: null,
                        
                        mcvPane: null,
                        
                        pinLockPos: 0,
                        
                        attachEvent: function() {},
                        
                        isNull: function(e) {
                            return typeof e == "undefined" || e == null;
                        },
                        
                        getApp: function() {
                            return qx.core.Init.getApplication();
                        },
                        
                        getBaseListBar: function() {
                            var app = this.getApp();
                            var b;
                            if(!this.isNull(app)) {
                                b = app.getBaseNavigationBar();
                                if(!this.isNull(b)) {
                                    if(b.getChildren().length > 0) {
                                        b = b.getChildren()[0];
                                        if(b.getChildren().length > 0) {
                                            b = b.getChildren()[0];
                                            return b;
                                        }
                                    }
                                }
                            }
                            return null;
                        },
                        
                        repositionSticker: function () {
                            try {
                                var i;
                                
                                if (this.infoSticker && !this.mcvInfoLabel.isDisposed() && !this.mcvPopup.isDisposed()) {
                                    var dele;

                                    try {
                                        if (this.top_image != null) {
                                            dele = this.top_image.getContentElement().getDomElement();
                                            if (dele != null) {
                                                dele.style["-moz-transform"] = "scaleY(-1)";
                                                dele.style["-o-transform"] = "scaleY(-1)";
                                                dele.style["-webkit-transform"] = "scaleY(-1)";
                                                dele.style.transform = "scaleY(-1)";
                                                dele.style.filter = "FlipV";
                                                dele.style["-ms-filter"] = "FlipV";
                                                this.top_image = null;
                                            }
                                        }
                                        for (i = this.toFlipH.length - 1; i >= 0; i--) {
                                            var e = this.toFlipH[i];
                                            if(e.isDisposed()) this.toFlipH.splice(i, 1);
                                            else {
                                                dele = e.getDecoratorElement().getDomElement();
                                                if (dele != null) {
                                                    dele.style["-moz-transform"] = "scaleX(-1)";
                                                    dele.style["-o-transform"] = "scaleX(-1)";
                                                    dele.style["-webkit-transform"] = "scaleX(-1)";
                                                    dele.style.transform = "scaleX(-1)";
                                                    dele.style.filter = "FlipH";
                                                    dele.style["-ms-filter"] = "FlipH";
                                                    this.toFlipH.splice(i, 1);
                                                }
                                            }
                                        }
                                    } catch (e2) {
                                        console.log("Error flipping images.", e2.toString());
                                    }
                                    var baseListBar = this.getBaseListBar();
                                    if(baseListBar!=null) {
                                        var baseCont = baseListBar.getChildren();
                                        for (i = 0; i < baseCont.length; i++) {
                                            var baseButton = baseCont[i];
                                            if(typeof baseButton.getBaseId === 'function') {
                                                if(baseButton.getBaseId() == ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_Id()
                                                    && baseButton.getBounds() != null && baseButton.getBounds().top!=null) {
                                            //var baseButtonDecorator = baseButton.getDecorator();
                                            //if (baseButton!=this.mcvPopup && baseButtonDecorator != null && typeof baseButtonDecorator === "string" && baseButton.getBounds() != null && baseButton.getBounds().top!=null) {
                                                //if (baseButtonDecorator.indexOf("focused") >= 0 || baseButtonDecorator.indexOf("pressed") >= 0) {
                                                    if(this.locked) {
                                                        if(!this.pinned) {
                                                            if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                                                baseListBar.remove(this.mcvPopup);
                                                            }
                                                            this.pinLockPos = baseListBar.indexOf(baseButton)+1;
                                                            baseListBar.addAt(this.mcvPopup, this.pinLockPos);
                                                        } else if(baseListBar.indexOf(this.mcvPopup)<0) {
                                                            baseListBar.addAt(this.mcvPopup, Math.max(0, Math.min(this.pinLockPos, baseCont.length)));
                                                        }
                                                    } else {
                                                        if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                                            baseListBar.remove(this.mcvPopup);
                                                        }
                                                        if (!this.pinned) {
                                                            var top = baseButton.getBounds().top;
                                                            var infoTop;
                                                            try {
                                                                var stickerHeight = this.infoSticker.getContentElement().getDomElement().style.height;
                                                                stickerHeight = stickerHeight.substring(0, stickerHeight.indexOf("px"));
                                                                infoTop = Math.min(130 + top, Math.max(660, window.innerHeight) - parseInt(stickerHeight, 10) - 130);
                                                            } catch (heighterror) {
                                                                infoTop = 130 + top;
                                                            }
                                                            if(this.infoSticker.getContentElement().getDomElement()!=null)
                                                                this.infoSticker.setDomTop(infoTop);
                                                            
                                                            this.pinTop = infoTop;
                                                        }
                                                    }
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    
                                }
                            } catch (ex) {
                                console.log("InfoSticker.repositionSticker: ", ex.toString());
                            }
                        },
                        toLock: function (e) {
                            try {
                                this.locked = !this.locked;
                                if(!this.locked) {
                                    this.infoSticker.show();
                                    this.stickerBackground.add(this.mcvPopup);
                                }
                                else this.infoSticker.hide();
                                this.lockButton.setIcon(this.locked ? "FactionUI/icons/icn_thread_locked_active.png" : "FactionUI/icons/icn_thread_locked_inactive.png");
                                this.updateLockButtonDecoration();
                                if (this.hasStorage) {
                                    if (this.locked) {
                                        localStorage["infoSticker-locked"] = "true";
                                        if(this.pinned) localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                    } else {
                                        localStorage["infoSticker-locked"] = "false";
                                    }
                                }
                                if(this.locked && this.pinned) {
                                    this.menuUpButton.setEnabled(true);
                                    this.menuDownButton.setEnabled(true);
                                } else {
                                    this.menuUpButton.setEnabled(false);
                                    this.menuDownButton.setEnabled(false);
                                }
                                this.repositionSticker();
                            } catch(e) {
                                console.log("InfoSticker.toLock: ", e.toString());
                            }
                        },
                        updateLockButtonDecoration: function () {
                            var light = "#CDD9DF";
                            var mid = "#9CA4A8";
                            var dark = "#8C9499";
                            this.lockPane.setDecorator(null);
                            this.lockButtonDecoration = new qx.ui.decoration.Background();
                            this.lockButtonDecoration.setBackgroundColor(this.locked ? dark : light);
                            this.lockPane.setDecorator(this.lockButtonDecoration);
                        },
                        toPin: function (e) {
                            try {
                                this.pinned = !this.pinned;
                                this.pinButton.setIcon(this.pinned ? "FactionUI/icons/icn_thread_pin_active.png" : "FactionUI/icons/icn_thread_pin_inactive.png");
                                this.updatePinButtonDecoration();
                                if (this.hasStorage) {
                                    if (this.pinned) {
                                        localStorage["infoSticker-pinned"] = "true";
                                        localStorage["infoSticker-top"] = this.pinTop.toString();
                                        if(this.locked) {
                                            localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                        }
                                    } else {
                                        localStorage["infoSticker-pinned"] = "false";
                                    }
                                }
                                if(this.locked && this.pinned) {
                                    this.menuUpButton.setEnabled(true);
                                    this.menuDownButton.setEnabled(true);
                                } else {
                                    this.menuUpButton.setEnabled(false);
                                    this.menuDownButton.setEnabled(false);
                                }
                            } catch(e) {
                                console.log("InfoSticker.toPin: ", e.toString());
                            }
                        },
                        updatePinButtonDecoration: function () {
                            var light = "#CDD9DF";
                            var mid = "#9CA4A8";
                            var dark = "#8C9499";
                            this.pinPane.setDecorator(null);
                            this.pinButtonDecoration = new qx.ui.decoration.Background().set({
                                //innerOpacity: 0.5
                            });
                            //this.pinButtonDecoration.setInnerColor(this.pinned ? mid : light);
                            //this.pinButtonDecoration.setOuterColor(this.pinned ? light : mid);
                            this.pinButtonDecoration.setBackgroundColor(this.pinned ? dark : light);
                            this.pinPane.setDecorator(this.pinButtonDecoration);
                        },
                        hideResource: function () {
                            try {
                                //if(this.resourceHidden) 
                                if (this.resourcePane.isVisible()) {
                                    //this.resourcePane.hide();
                                    this.resourcePane.exclude();
                                    this.resourceHideButton.setLabel("+");
                                } else {
                                    this.resourcePane.show();
                                    this.resourceHideButton.setLabel("-");
                                }
                            } catch(e) {
                                console.log("InfoSticker.hideResource: ", e.toString());
                            }
                        },
                        lastPane: null,
                        createSection: function (parent, titleLabel, visible, visibilityStorageName) {
                            try {
                                var pane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
                                    padding: [5, 0, 5, 5],
                                    width: 124,
                                    decorator: new qx.ui.decoration.Background().set({
                                        backgroundImage: "decoration/pane_messaging_item/messaging_items_pane.png",
                                        backgroundRepeat: "scale",
                                    }),
                                    alignX: "right"
                                });
                                
                                var labelStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 12
                                    }),
                                    textColor: '#595969'
                                };
                                titleLabel.set(labelStyle);
                                
                                var hidePane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
                                    width: 124,
                                    alignX: "right"
                                });
                                
                                var hideButton = new qx.ui.form.Button("-").set({
                                    //decorator: new qx.ui.decoration.Single(1, "solid", "black"),
                                    maxWidth: 15,
                                    maxHeight: 10,
                                    //textColor: "black"
                                });
                                var self = this;
                                //resourceHideButton.addListener("execute", this.hideResource, this);
                                hideButton.addListener("execute", function () {
                                    if (hidePane.isVisible()) {
                                        hidePane.exclude();
                                        hideButton.setLabel("+");
                                    } else {
                                        hidePane.show();
                                        hideButton.setLabel("-");
                                    }
                                    if(self.hasStorage)
                                        localStorage["infoSticker-"+visibilityStorageName] = !hidePane.isVisible();
                                });

                                var titleBar = new qx.ui.container.Composite(new qx.ui.layout.HBox(0));
                                titleBar.add(hideButton);
                                titleBar.add(titleLabel);
                                pane.add(titleBar);
                                pane.add(hidePane);
                                
                                if(!visible) hidePane.exclude();
                                
                                this.toFlipH.push(pane);

                                this.lastPane = pane;
                                parent.add(pane);
                                
                                return hidePane;
                            } catch(e) {
                                console.log("InfoSticker.createSection: ", e.toString());
                                throw e;
                            }
                        },
                        createHBox: function (ele1, ele2, ele3) {
                            var cnt;
                            cnt = new qx.ui.container.Composite();
                            cnt.setLayout(new qx.ui.layout.HBox(0));
                            if (ele1 != null) {
                                cnt.add(ele1);
                                ele1.setAlignY("middle");
                            }
                            if (ele2 != null) {
                                cnt.add(ele2);
                                ele2.setAlignY("bottom");
                            }
                            if (ele3 != null) {
                                cnt.add(ele3);
                                ele3.setAlignY("bottom");
                            }

                            return cnt;
                        },
                        
                        formatCompactTime: function (time) {
                            var comps = time.split(":");
                            
                            var i = 0;
                            var value = Math.round(parseInt(comps[i], 10)).toString();
                            var len = comps.length;
                            while(value==0) {
                                value = Math.round(parseInt(comps[++i], 10)).toString();
                                len--;
                            }
                            var unit;
                            switch(len) {
                                case 1: unit = "s"; break;
                                case 2: unit = "m"; break;
                                case 3: unit = "h"; break;
                                case 4: unit = "d"; break;
                            }
                            return value+unit;
                        },
                        createImage: function(icon) {
                            var image = new qx.ui.basic.Image(icon);
                            image.setScale(true);
                            image.setWidth(20);
                            image.setHeight(20);
                            return image;
                        },

                        createMCVPane: function() {
                            try {
                                this.mcvInfoLabel = new qx.ui.basic.Label();
                                this.mcvTimerLabel = new qx.ui.basic.Label().set({
                                    font: qx.bom.Font.fromString('bold').set({
                                            size: 18
                                        }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 114,
                                    textAlign: 'center'
                                });
                                this.mcvTimerCreditProdLabel = new qx.ui.basic.Label().set({
                                    font: qx.bom.Font.fromString('normal').set({
                                        size: 12
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 114,
                                    textAlign: 'center',
                                    marginTop: 4,
                                    marginBottom: -4
                                });
                                var app = qx.core.Init.getApplication();
                                var b3 = app.getBaseNavigationBar().getChildren()[0].getChildren()[0];
                                
                                
                                var pane = this.createSection(b3, this.mcvInfoLabel, !this.mcvHide, "mcvHide");
                                pane.add(this.mcvTimerLabel);
                                pane.add(this.mcvTimerCreditProdLabel);
                                this.mcvPane = this.lastPane;
                                this.lastPane.setMarginLeft(7);
                                
                            } catch(e) {
                                console.log("InfoSticker.createMCVPopup", e.toString());
                            }
                        },
                        moveStickerUp: function() {
                            try {
                                var baseListBar = this.getBaseListBar();
                                this.pinLockPos=Math.max(0, this.pinLockPos-1);
                                if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                    baseListBar.remove(this.mcvPopup);
                                }
                                if (this.hasStorage) {
                                    localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                }
                            } catch(e) {
                                console.log("InfoSticker.moveStickerUp", e.toString());
                            }
                        },
                        moveStickerDown: function() {
                            try {
                                var baseListBar = this.getBaseListBar();
                                this.pinLockPos=Math.min(baseListBar.getChildren().length, this.pinLockPos+1);
                                if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                    baseListBar.remove(this.mcvPopup);
                                }
                                if (this.hasStorage) {
                                    localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                }
                            } catch(e) {
                                console.log("InfoSticker.moveStickerDown", e.toString());
                            }
                        },
                        menuUpButton: null,
                        menuDownButton: null,
                        createMCVPopup: function() {
                            try {
                                var self = this;
                                this.mcvPopup = new qx.ui.container.Composite(new qx.ui.layout.VBox().set({
                                    spacing: 3})).set({
                                    paddingLeft: 5,
                                    width: 105,
                                    decorator: new qx.ui.decoration.Background()
                                });
                                
                                var menu = new qx.ui.menu.Menu();
                                var menuPinButton = new qx.ui.menu.Button("Pin", "FactionUI/icons/icn_thread_pin_inactive.png");
                                menuPinButton.addListener("execute", this.toPin, this);
                                menu.add(menuPinButton);
                                var menuLockButton = new qx.ui.menu.Button("Lock", "FactionUI/icons/icn_thread_locked_inactive.png");
                                menuLockButton.addListener("execute", this.toLock, this);
                                menu.add(menuLockButton);
                                var fileManager = ClientLib.File.FileManager.GetInstance();
                                this.menuUpButton = new qx.ui.menu.Button("Move up", fileManager.GetPhysicalPath("ui/icons/icon_tracker_arrow_up.png"));
                                //ui/icons/icon_tracker_arrow_up.png ui/gdi/icons/cht_opt_arrow_down.png
                                this.menuUpButton.addListener("execute", this.moveStickerUp, this);
                                menu.add(this.menuUpButton);
                                this.menuDownButton = new qx.ui.menu.Button("Move down", fileManager.GetPhysicalPath("ui/icons/icon_tracker_arrow_down.png"));
                                this.menuDownButton.addListener("execute", this.moveStickerDown, this);
                                menu.add(this.menuDownButton);
                                this.mcvPopup.setContextMenu(menu);
                                if(!this.locked) {
                                    this.stickerBackground.add(this.mcvPopup);
                                }
    
    ////////////////////////////----------------------------------------------------------
                                this.pinButton = new webfrontend.ui.SoundButton().set({
                                    decorator: "button-forum-light",
                                    icon: this.pinned ? "FactionUI/icons/icn_thread_pin_active.png" : "FactionUI/icons/icn_thread_pin_inactive.png",
                                    iconPosition: "top",
                                    show: "icon",
                                    cursor: "pointer",
                                    height: 23,
                                    width: 50,
                                    //maxHeight: 25,
                                    maxWidth: 33,
                                    maxHeight: 19,
                                    alignX: "center"
                                });
                                this.pinButton.addListener("execute", this.toPin, this);
                                
                                this.pinPane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
                                    //width: 50,
                                    maxWidth: 37,
                                });
                                
                                this.updatePinButtonDecoration();
                                
                                this.pinPane.setDecorator(this.pinButtonDecoration);
                                this.pinPane.add(this.pinButton);
                                //this.mcvPopup.add(this.pinPane);
                                //this.toFlipH.push(this.pinPane);
                                
                                var icon = this.pinButton.getChildControl("icon");
                                icon.setWidth(15);
                                icon.setHeight(15);
                                icon.setScale(true);
    ////////////////////////////----------------------------------------------------------
                                this.lockButton = new webfrontend.ui.SoundButton().set({
                                    decorator: "button-forum-light",
                                    icon: this.pinned ? "FactionUI/icons/icn_thread_locked_active.png" : "FactionUI/icons/icn_thread_locked_inactive.png",
                                    iconPosition: "top",
                                    show: "icon",
                                    cursor: "pointer",
                                    height: 23,
                                    width: 50,
                                    //maxHeight: 25,
                                    maxWidth: 33,
                                    maxHeight: 19,
                                    alignX: "center"
                                });
                                this.lockButton.addListener("execute", this.toLock, this);
                                
                                this.lockPane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
                                    //width: 50,
                                    maxWidth: 37,
                                });
                                
                                this.updateLockButtonDecoration();
                                
                                this.lockPane.setDecorator(this.lockButtonDecoration);
                                this.lockPane.add(this.lockButton);
                                //this.mcvPopup.add(this.pinPane);
                                //this.toFlipH.push(this.pinPane);
                                
                                icon = this.lockButton.getChildControl("icon");
                                icon.setWidth(15);
                                icon.setHeight(15);
                                icon.setScale(true);
    ////////////////////////////----------------------------------------------------------
                                this.resourceTitleLabel = new qx.ui.basic.Label();
                                this.resourceTitleLabel.setValue("Base");
                                var resStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                            size: 14
                                        }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 65,
                                    marginLeft: -10,
                                    textAlign: 'right'
                                };
                                
                                this.resourceLabel1 = new qx.ui.basic.Label().set(resStyle);
                                this.resourceLabel2 = new qx.ui.basic.Label().set(resStyle);
                                this.resourceLabel3 = new qx.ui.basic.Label().set(resStyle);
                                
                                var perStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 9
                                    }),
                                    textColor: '#282828',
                                    height: 18,
                                    width: 33,
                                    textAlign: 'right'
                                };
                                this.resourceLabel1per = new qx.ui.basic.Label().set(perStyle);
                                this.resourceLabel2per = new qx.ui.basic.Label().set(perStyle);
                                this.resourceLabel3per = new qx.ui.basic.Label().set(perStyle);
                                
                                
                                var pane3 = this.createSection(this.mcvPopup, this.resourceTitleLabel, !this.resourceHide, "resourceHide");
                                
                                
                                this.repairTimerLabel = new qx.ui.basic.Label().set({
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 16
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 85,
                                    marginLeft: 0,
                                    textAlign: 'center'
                                });
                                pane3.add(this.createHBox(this.createImage(this.repairIcon), this.repairTimerLabel));
                                
                                pane3.add(this.createHBox(this.createImage(this.tibIcon), this.resourceLabel1, this.resourceLabel1per));
                                pane3.add(this.createHBox(this.createImage(this.cryIcon), this.resourceLabel2, this.resourceLabel2per));
                                pane3.add(this.createHBox(this.createImage(this.powIcon), this.resourceLabel3, this.resourceLabel3per));
                                
                                var mcvC = this.mcvPopup.getChildren();
                                mcvC[mcvC.length-1].getChildren()[0].add(this.pinPane);
                                mcvC[mcvC.length-1].getChildren()[0].add(this.lockPane);
    ////////////////////////////----------------------------------------------------------
    
                                this.productionTitleLabel = new qx.ui.basic.Label();
                                this.productionTitleLabel.setValue("db.Produce");
                                
                                var productionStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 13
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 85,
                                    textAlign: 'right',
                                    marginTop: 2,
                                    marginBottom: -2
                                };
                                this.productionLabelTiberium = new qx.ui.basic.Label().set(productionStyle);
                                this.productionLabelCrystal = new qx.ui.basic.Label().set(productionStyle);
                                
                                this.productionLabelPower1 = new qx.ui.basic.Label().set(productionStyle);
                                this.productionLabelCredit = new qx.ui.basic.Label().set(productionStyle);
                                
                                var pane4 = this.createSection(this.mcvPopup, this.productionTitleLabel, !this.productionHide, "productionHide");
                                pane4.add(this.createHBox(this.createImage(this.tibIcon), this.productionLabelTiberium));
                                pane4.add(this.createHBox(this.createImage(this.cryIcon), this.productionLabelCrystal));
                                
                                pane4.add(this.createHBox(this.createImage(this.powIcon), this.productionLabelPower1));
                                pane4.add(this.createHBox(this.createImage(this.creditIcon), this.productionLabelCredit));
    ////////////////////////////----------------------------------------------------------
    
                                this.contProductionTitleLabel = new qx.ui.basic.Label();
                                this.contProductionTitleLabel.setValue("Cont'+Ally");
                                
                                var contProductionStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 13
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 85,
                                    textAlign: 'right',
                                    marginTop: 2,
                                    marginBottom: -2
                                };
                                this.contProductionLabelTiberium = new qx.ui.basic.Label().set(contProductionStyle);
                                this.contProductionLabelCrystal = new qx.ui.basic.Label().set(contProductionStyle);
                                this.contProductionLabelPower = new qx.ui.basic.Label().set(contProductionStyle);
                                
                                this.contProductionLabelCredit = new qx.ui.basic.Label().set(contProductionStyle);
                                
                                var pane5 = this.createSection(this.mcvPopup, this.contProductionTitleLabel, !this.contProductionHide, "contProductionHide");
                                pane5.add(this.createHBox(this.createImage(this.tibIcon), this.contProductionLabelTiberium));
                                pane5.add(this.createHBox(this.createImage(this.cryIcon), this.contProductionLabelCrystal));
                                pane5.add(this.createHBox(this.createImage(this.powIcon), this.contProductionLabelPower));
                                pane5.add(this.createHBox(this.createImage(this.creditIcon), this.contProductionLabelCredit));
////////////////////////////----------------------------------------------------------                                
                                 this.repairTimeTitleLabel = new qx.ui.basic.Label();
                                 this.repairTimeTitleLabel.setValue("RepairTimes");
                                
                                this.repairTimeStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 13
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 85,
                                    textAlign: 'center',
                                    marginTop: 2,
                                    marginBottom: -2
                                };
                                
                                this.repairTimeLabel0 = new qx.ui.basic.Label().set(this.repairTimeStyle);
                                this.repairTimeLabel1 = new qx.ui.basic.Label().set(this.repairTimeStyle);
                                this.repairTimeLabel2 = new qx.ui.basic.Label().set(this.repairTimeStyle);
                                
                                var pane6 = this.createSection(this.mcvPopup, this.repairTimeTitleLabel.set(this.repairTimeStyle), !this.rtHide, "repairHide");
                                pane6.add(this.createHBox(this.createImage(this.repairIcon), this.repairTimeLabel0));
                                pane6.add(this.createHBox(this.createImage(this.repairIcon), this.repairTimeLabel1));
                                pane6.add(this.createHBox(this.createImage(this.repairIcon), this.repairTimeLabel2));
                                //pane6.add(this.createHBox(this.createImage(this.creditIcon), this.productionLabelCredit));
    ////////////////////////////----------------------------------------------------------
                                 
                                this.UnitCostTitleLabel = new qx.ui.basic.Label();
                                 this.UnitCostTitleLabel.setValue("OffUnitCost");
                                this.UnitCostStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 13
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 85,
                                    textAlign: 'center',
                                    marginTop: 2,
                                    marginBottom: -2
                                };
                               
                                
                                this.UnitCostLabel0 = new qx.ui.basic.Label().set(this.UnitCostStyle);
                                this.UnitCostLabel1 = new qx.ui.basic.Label().set(this.UnitCostStyle);
                                //this.UnitCostLabel2 = new qx.ui.basic.Label().set(this.UnitCostStyle);
                                
                                var pane7 = this.createSection(this.mcvPopup, this.UnitCostTitleLabel.set(this.UnitCostStyle), !this.costHide, "costHide");
                                pane7.add(this.createHBox(this.createImage(this.cryIcon), this.UnitCostLabel0));
                                pane7.add(this.createHBox(this.createImage(this.powIcon), this.UnitCostLabel1));
                                //pane7.add(this.createHBox(this.createImage(this.repairIcon), this.UnitCostLabel2));
                                //pane6.add(this.createHBox(this.createImage(this.creditIcon), this.productionLabelCredit));
    ////////////////////////////----------------------------------------------------------
                                this.DEFUnitCostTitleLabel = new qx.ui.basic.Label();
                                 this.DEFUnitCostTitleLabel.setValue("DefUnitCost");
                                
                                this.DEFUnitCostStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 13
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 85,
                                    textAlign: 'center',
                                    marginTop: 2,
                                    marginBottom: -2
                                };
                                
                                this.DEFUnitCostLabel0 = new qx.ui.basic.Label().set(this.DEFUnitCostStyle);
                                this.DEFUnitCostLabel1 = new qx.ui.basic.Label().set(this.DEFUnitCostStyle);
                                this.DEFUnitCostLabel2 = new qx.ui.basic.Label().set(this.DEFUnitCostStyle);
                                
                                var pane8 = this.createSection(this.mcvPopup, this.DEFUnitCostTitleLabel.set(this.DEFUnitCostStyle), !this.DEFcostHide, "DEFcostHide");
                                pane8.add(this.createHBox(this.createImage(this.tibIcon), this.DEFUnitCostLabel0));
                                pane8.add(this.createHBox(this.createImage(this.cryIcon), this.DEFUnitCostLabel1));
                                pane8.add(this.createHBox(this.createImage(this.powIcon), this.DEFUnitCostLabel2));
                                //pane7.add(this.createHBox(this.createImage(this.repairIcon), this.UnitCostLabel2));
                                //pane6.add(this.createHBox(this.createImage(this.creditIcon), this.productionLabelCredit));
    ////////////////////////////----------------------------------------------------------



                            } catch(e) {
                                console.log("InfoSticker: createMCVPopup", e.toString());
                            }
                        },
                        currentCityChange: function() {
                            this.calculateInfoData();
                            this.repositionSticker();
                        },
                        disposeRecover: function() {
                            
                            try {
                                if(this.mcvPane.isDisposed()) {
                                    this.createMCVPane();
                                }
                                
                                if(this.mcvPopup.isDisposed()) {
                                    this.createMCVPopup();
                                    
                                    this.repositionSticker();
                                }
                                this.waitingRecovery = false;
                            } catch(e) {
                                console.log("InfoSticker: disposeRecover", e.toString());
                            }
                            
                        },
                        waitingRecovery: false,
                        citiesChange: function() {
                            try {
                                var self = this;
                                var baseListBar = this.getBaseListBar();
                                this.disposeRecover();
                                
                                if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                    baseListBar.remove(this.mcvPopup);
                                    this.mcvPopup.dispose();
                                }
                                
                                if(baseListBar.indexOf(this.mcvPane)>=0) {
                                    baseListBar.remove(this.mcvPane);
                                    this.mcvPane.dispose();
                                }
                                if(!this.waitingRecovery) {
                                    this.waitingRecovery = true;
                                    window.setTimeout(function () {
                                        self.disposeRecover();
                                    }, 10);
                                }
                            } catch(e) {
                                console.log("InfoSticker: citiesChange", e.toString());
                            }
                        },
                        calculateInfoData: function () {
                            try {
                                var self = this;
                                var player = ClientLib.Data.MainData.GetInstance().get_Player();
                                var cw = player.get_Faction();
                                var cj = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound, cw);
                                var cr = player.get_PlayerResearch();
                                var cd = cr.GetResearchItemFomMdbId(cj);
                                
                                var app = qx.core.Init.getApplication();
                                var b3 = app.getBaseNavigationBar().getChildren()[0].getChildren()[0];
                                if(b3.getChildren().length==0) return;
                                if (!this.infoSticker) {
                                    this.infoSticker = new qx.ui.container.Composite(new qx.ui.layout.VBox().set({
                                        alignX: "right"
                                    })).set({
                                        width: 105,
                                    });

                                    var top = 130;
                                    if (this.hasStorage) {
                                        var l = localStorage["infoSticker-locked"] == "true";
                                        if (l != null) {
                                            this.locked = l;
                                            var pl = localStorage["infoSticker-pinLock"];
                                            if(pl!=null) {
                                                try {
                                                    this.pinLockPos = parseInt(pl, 10);
                                                } catch(etm) {}
                                            }
                                        }
                                        
                                        var p = localStorage["infoSticker-pinned"];
                                        var t = localStorage["infoSticker-top"];
                                        if (p != null && t != null) {
                                            var tn;
                                            try {
                                                this.pinned = p == "true";
                                                if (this.pinned) {
                                                    tn = parseInt(t, 10);
                                                    top = tn;
                                                }
                                            } catch (etn) {}
                                        }
                                        this.mcvHide = localStorage["infoSticker-mcvHide"] == "true";
                                        this.repairHide = localStorage["infoSticker-repairHide"] == "true";
                                        this.rtHide = localStorage["infoSticker-repairHide"] == "true";
                                        this.costHide = localStorage["infoSticker-costHide"] == "true";
                                        this.DEFcostHide = localStorage["infoSticker-DEFcostHide"] == "true";
                                        this.resourceHide = localStorage["infoSticker-resourceHide"] == "true";
                                        this.productionHide = localStorage["infoSticker-productionHide"] == "true";
                                        this.contProductionHide = localStorage["infoSticker-contProductionHide"] == "true";
                                    }
                                    
                                    
                                    app.getDesktop().add(this.infoSticker, {
                                        right: 124,
                                        top: top
                                    });
                                    if(this.locked) {
                                        this.infoSticker.hide();
                                    }

                                    this.stickerBackground = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
                                        //paddingLeft: 5,
                                        width: 105,
                                        decorator: new qx.ui.decoration.Background().set({
                                            backgroundImage: "webfrontend/ui/common/bgr_region_world_select_scaler.png",
                                            backgroundRepeat: "scale",
                                        })
                                    });
                                    
                                    this.createMCVPane();
                                    this.createMCVPopup();
                                    
                                    if(this.locked && this.pinned) {
                                        this.menuUpButton.setEnabled(true);
                                        this.menuDownButton.setEnabled(true);
                                    } else {
                                        this.menuUpButton.setEnabled(false);
                                        this.menuDownButton.setEnabled(false);
                                    }
                                    
                                    this.top_image = new qx.ui.basic.Image("webfrontend/ui/common/bgr_region_world_select_end.png");
                                    this.infoSticker.add(this.top_image);

                                    this.infoSticker.add(this.stickerBackground);
                                    //this.infoSticker.add(this.mcvPopup);

                                    this.bot_image = new qx.ui.basic.Image("webfrontend/ui/common/bgr_region_world_select_end.png");
                                    this.infoSticker.add(this.bot_image);

                                    this.runPositionTimer();

                                    try {
                                        this.attachEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.currentCityChange);
                                        this.attachEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "Change", ClientLib.Data.CitiesChange, this, this.citiesChange);
                                    } catch(eventError) {
                                        console.log("InfoSticker.EventAttach:", eventError);
                                        console.log("The script will continue to run, but with slower response speed.");
                                    }
                                }
                                this.disposeRecover();
                                
                                if (cd == null) {
                                    if (this.mcvPopup) {
                                        //this.mcvInfoLabel.setValue("MCV ($???)");
                                        this.mcvInfoLabel.setValue("MCV<br>$???");
                                        this.mcvTimerLabel.setValue("Loading");
                                    }
                                } else {
                                    var nextLevelInfo = cd.get_NextLevelInfo_Obj();
                                    var resourcesNeeded = [];
                                    for (var i in nextLevelInfo.rr) {
                                        if (nextLevelInfo.rr[i].t > 0) {
                                            resourcesNeeded[nextLevelInfo.rr[i].t] = nextLevelInfo.rr[i].c;
                                        }
                                    }
                                    //var researchNeeded = resourcesNeeded[ClientLib.Base.EResourceType.ResearchPoints];
                                    //var currentResearchPoints = player.get_ResearchPoints();
                                    var creditsNeeded = resourcesNeeded[ClientLib.Base.EResourceType.Gold];
                                    var creditsResourceData = player.get_Credits();
                                    var creditGrowthPerHour = (creditsResourceData.Delta + creditsResourceData.ExtraBonusDelta) * ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
                                    var creditTimeLeftInHours = (creditsNeeded - player.GetCreditsCount()) / creditGrowthPerHour;
                                    this.mcvInfoLabel.setValue("MCV ($ " + this.formatNumbersCompact(creditsNeeded) + ")");
                                    //this.mcvInfoLabel.setValue("MCV<br>$" + this.formatNumbersCompact(creditsNeeded));
                                    this.mcvTimerCreditProdLabel.setValue("at " + this.formatNumbersCompact(creditGrowthPerHour*24) + "/1d");
                                    if (creditTimeLeftInHours <= 0) {
                                        this.mcvTimerLabel.setValue("Ready");
                                    } else if (creditGrowthPerHour == 0) {
                                        this.mcvTimerLabel.setValue("Never");
                                    } else {
                                        if(creditTimeLeftInHours >= 24 * 100) {
                                            this.mcvTimerLabel.setValue("> 99 days");
                                        } else {
                                            this.mcvTimerLabel.setValue(this.FormatTimespan(creditTimeLeftInHours * 60 * 60));
                                        }
                                    }
                                }

                                var ncity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                                if (ncity == null) {
                                    if (this.mcvPopup) {
                                        this.repairTimerLabel.setValue("Select a base"); 
                                        this.repairTimeLabel0.setValue("Select a base");
                                        this.repairTimeLabel1.setValue("Select a base");
                                        this.repairTimeLabel2.setValue("Select a base");
                                        this.resourceLabel1.setValue("N/A");
                                        this.resourceLabel2.setValue("N/A");
                                        this.resourceLabel3.setValue("N/A");
                                        this.UnitCostLabel0.setValue("N/A");
                                        this.UnitCostLabel1.setValue("N/A");
                                        //this.UnitCostLabel2.setValue("N/A");
                                    }
                                } else {
                                //console.log(ncity.get_CommandCenterLevel());
                                    
                                    //var HQ = ncity.GetBuildingTypeMaxLvlByTechName(ClientLib.Base.ETechName.Defense_HQ);
                                    //console.log(ClientLib.API.Defense.GetInstance().GetUpgradeCostsForAllUnitsToLevel(ncity.GetBuildingTypeMaxLvlByTechName(ClientLib.Base.ETechName.Defense_HQ))[0].Type, ClientLib.Base.EResourceType.Tiberium, ClientLib.Base.EResourceType.Crystal, ClientLib.Base.EResourceType.Power );
                                    var DEFtibCost = 0;
                                    var DEFcryCost = 0;
                                    var DEFpowCost = 0;
                                    var cryCost = 0;
                                    var powCost = 0;
                                    var cost = ClientLib.API.Defense.GetInstance().GetUpgradeCostsForAllUnitsToLevel(ncity.GetBuildingTypeMaxLvlByTechName(ClientLib.Base.ETechName.Defense_HQ));
                                    if(cost != null ){
                                    //console.log(ClientLib.API.Defense.GetInstance().GetUpgradeCostsForAllUnitsToLevel(ncity.GetBuildingTypeMaxLvlByTechName(ClientLib.Base.ETechName.Defense_HQ))[0].Type, ClientLib.Base.EResourceType.Tiberium, ClientLib.Base.EResourceType.Crystal, ClientLib.Base.EResourceType.Power );
                                        
                                        
                                        if(cost[0].Type == ClientLib.Base.EResourceType.Crystal){
                                        DEFcryCost = cost[0].Count;
                                        //DEFpowCost = cost[1].Count;
                                        }else if(cost[0].Type == ClientLib.Base.EResourceType.Tiberium){
                                        DEFtibCost = cost[0].Count;
                                        DEFcryCost = cost[1].Count;
                                        
                                        }
                                        
                                        if(cost[1].Type == ClientLib.Base.EResourceType.Power){
                                        DEFpowCost = cost[1].Count;
                                        }
                                        else if(cost[2] !== undefined && cost[2].Type == ClientLib.Base.EResourceType.Power){
                                        DEFpowCost = cost[2].Count;
                                        }
                                    //console.log(HQ, ClientLib.API.Defense.GetInstance().GetUpgradeCostsForAllUnitsToLevel(ncity.GetBuildingTypeMaxLvlByTechName(ClientLib.Base.ETechName.Defense_HQ)), DEFpowCost);
                                    this.DEFUnitCostLabel0.setValue(this.formatNumbersCompact(DEFtibCost));
                                    this.DEFUnitCostLabel1.setValue(this.formatNumbersCompact(DEFcryCost));
                                    this.DEFUnitCostLabel2.setValue(this.formatNumbersCompact(DEFpowCost));
                                    }else{
                                    this.DEFUnitCostLabel0.setValue("Upgrade");
                                    this.DEFUnitCostLabel1.setValue("DEF");
                                    this.DEFUnitCostLabel2.setValue("HQ");
                                    }
                                    if(ClientLib.API.Army.GetInstance().GetUpgradeCostsForAllUnitsToLevel(ncity.get_CommandCenterLevel()) != null){
                                    cryCost = ClientLib.API.Army.GetInstance().GetUpgradeCostsForAllUnitsToLevel(ncity.get_CommandCenterLevel())[0].Count;
                                    powCost = ClientLib.API.Army.GetInstance().GetUpgradeCostsForAllUnitsToLevel(ncity.get_CommandCenterLevel())[1].Count;
                                    this.UnitCostLabel0.setValue(this.formatNumbersCompact(cryCost));
                                    this.UnitCostLabel1.setValue(this.formatNumbersCompact(powCost));
                                    }else{
                                    this.UnitCostLabel0.setValue("Upgrade");
                                    this.UnitCostLabel1.setValue("CC");
                                    }
                                    
                                    
                                    
                                    var rt = Math.min(ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf),
                                    ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh),
                                    ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir));
                                    if (ncity.get_CityUnitsData().get_UnitLimitOffense() == 0) {
                                        this.repairTimerLabel.setValue("No army");
                                    } else {
                                        this.repairTimerLabel.setValue(this.FormatTimespan(rt));
                                    }
                                    
                                    var airRT = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
                                    if (ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false) == 0) {
                                        this.repairTimeLabel0.setValue("No birds");
                                    } else {
                                        this.repairTimeLabel0.setValue(this.FormatTimespan(airRT) + " AIR");
                                    }
                                    
                                    var vehRT = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
                                    if (ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false) == 0) {
                                        this.repairTimeLabel1.setValue("No cars");
                                    } else {
                                        this.repairTimeLabel1.setValue(this.FormatTimespan(vehRT) + " VEH");
                                    }
                                    var infRT = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
                                    if (ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false) == 0) {
                                        this.repairTimeLabel2.setValue("No dudes");
                                    } else {
                                        this.repairTimeLabel2.setValue(this.FormatTimespan(infRT) + " INF");
                                    }
                                    //this.repairTimerLabel0.setValue(this.FormatTimespan(airRT));
                                    //this.repairTimerLabel1.setValue(this.FormatTimespan(vehRT));
                                    //this.repairTimerLabel2.setValue(this.FormatTimespan(infRT));

                                    var tib = ncity.GetResourceCount(ClientLib.Base.EResourceType.Tiberium);
                                    var tibMax = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Tiberium);
                                    var tibRatio = tib / tibMax;
                                    this.resourceLabel1.setTextColor(this.formatNumberColor(tib, tibMax));
                                    this.resourceLabel1.setValue(this.formatNumbersCompact(tib));
                                    this.resourceLabel1per.setValue(this.formatPercent(tibRatio));

                                    var cry = ncity.GetResourceCount(ClientLib.Base.EResourceType.Crystal);
                                    var cryMax = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Crystal);
                                    var cryRatio = cry / cryMax;
                                    this.resourceLabel2.setTextColor(this.formatNumberColor(cry, cryMax));
                                    this.resourceLabel2.setValue(this.formatNumbersCompact(cry));
                                    this.resourceLabel2per.setValue(this.formatPercent(cryRatio));

                                    var power = ncity.GetResourceCount(ClientLib.Base.EResourceType.Power);
                                    var powerMax = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Power);
                                    var powerRatio = power / powerMax;
                                    this.resourceLabel3.setTextColor(this.formatNumberColor(power, powerMax));
                                    this.resourceLabel3.setValue(this.formatNumbersCompact(power));
                                    this.resourceLabel3per.setValue(this.formatPercent(powerRatio));

                                    
                                    var powerCont = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false);
                                    var powerBonus = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power);
                                    var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                                    var powerAlly = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
                                    var powerProd = (powerCont + powerAlly);
                                    var powerPac = (powerCont + powerAlly + powerBonus)*6;
                                    if(powerRatio >= 1){
                                    powerProd = 0;
                                    powerPac = (powerBonus)*6;
                                    
                                    }
                                    
                                    
                                    var tiberiumCont = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, false, false);
                                    var tiberiumBonus = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium);
                                    //var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                                    var tiberiumAlly = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Tiberium);
                                    var tiberiumPac = (tiberiumCont + tiberiumAlly + tiberiumBonus)*6;
                                    var tiberiumProd = (tiberiumCont + tiberiumAlly);
                                    if(tibRatio >= 1){
                                    tiberiumProd = 0;
                                    tiberiumPac = (tiberiumBonus)*6;
                                    
                                    }
                                    
                                    var crystalCont = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, false, false);
                                    var crystalBonus = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal);
                                    //var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                                    var crystalAlly = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Crystal);
                                    var crystalPac = (crystalCont + crystalAlly + crystalBonus)*6;
                                    var crystalProd = (crystalCont + crystalAlly);
                                    
                                    if(cryRatio >= 1){
                                    crystalProd = 0;
                                    crystalPac = (crystalBonus)*6;
                                    
                                    }
                                    

                                    var creditCont = ClientLib.Base.Resource.GetResourceGrowPerHour(ncity.get_CityCreditsProduction(), false);
                                    var creditBonus = ClientLib.Base.Resource.GetResourceBonusGrowPerHour(ncity.get_CityCreditsProduction(), false);
                                    var creditProd = (creditCont + creditBonus)*6;
                                    
                                    if( ncity.get_hasCooldown() == true){
                                    
                                    powerPac = (powerCont + powerAlly)*6 ;
                                    creditProd = (creditCont)*6;
                                    crystalPac = (crystalCont + crystalAlly )*6;
                                    tiberiumPac = (tiberiumCont + tiberiumAlly)*6;
                                    }

                                    this.productionLabelTiberium.setValue(this.formatNumbersCompact(tiberiumPac) + "/6h");
                                    this.productionLabelCrystal.setValue(this.formatNumbersCompact(crystalPac) + "/6h");
                                    this.productionLabelPower1.setValue(this.formatNumbersCompact(powerPac) + "/6h");
                                    this.productionLabelCredit.setValue(this.formatNumbersCompact(creditProd) + "/6h");
                                    
                                    this.contProductionLabelTiberium.setValue(this.formatNumbersCompact(tiberiumProd) + "/h");
                                    this.contProductionLabelCrystal.setValue(this.formatNumbersCompact(crystalProd) + "/h");
                                    this.contProductionLabelPower.setValue(this.formatNumbersCompact(powerProd) + "/h");
                                    this.contProductionLabelCredit.setValue(this.formatNumbersCompact(creditCont) + "/h");
                                    
                                    
                                }
                            } catch (e) {
                                console.log("InfoSticker.calculateInfoData", e.toString());
                            }
                        },
                        formatPercent: function (value) {
                            return value > 999 / 100 ? ">999%" : this.formatNumbersCompact(value * 100, 0) + "%";
                            //return this.formatNumbersCompact(value*100, 0) + "%";
                        },
                        formatNumberColor: function (value, max) {
                            var ratio = value / max;

                            var color;
                            var black = [40, 180, 40];
                            var yellow = [181, 181, 0];
                            var red = [187, 43, 43];

                            if (ratio < 0.5) color = black;
                            else if (ratio < 0.75) color = this.interpolateColor(black, yellow, (ratio - 0.5) / 0.25);
                            else if (ratio < 1) color = this.interpolateColor(yellow, red, (ratio - 0.75) / 0.25);
                            else color = red;

                            //console.log(qx.util.ColorUtil.rgbToHexString(color));
                            return qx.util.ColorUtil.rgbToHexString(color);
                        },
                        interpolateColor: function (color1, color2, s) {
                            //console.log("interp "+s+ " " + color1[1]+" " +color2[1]+" " +(color1[1]+s*(color2[1]-color1[1])));
                            return [Math.floor(color1[0] + s * (color2[0] - color1[0])),
                            Math.floor(color1[1] + s * (color2[1] - color1[1])),
                            Math.floor(color1[2] + s * (color2[2] - color1[2]))];
                        },
                        formatNumbersCompact: function (value, decimals) {
                            if (decimals == undefined) decimals = 2;
                            var valueStr;
                            var unit = "";
                            if (value < 1000) valueStr = value.toString();
                            else if (value < 1000 * 1000) {
                                valueStr = (value / 1000).toString();
                                unit = "k";
                            } else if (value < 1000 * 1000 * 1000) {
                                valueStr = (value / 1000000).toString();
                                unit = "M";
                            } else {
                                valueStr = (value / 1000000000).toString();
                                unit = "G";
                            }
                            if (valueStr.indexOf(".") >= 0) {
                                var whole = valueStr.substring(0, valueStr.indexOf("."));
                                if (decimals === 0) {
                                    valueStr = whole;
                                } else {
                                    var fraction = valueStr.substring(valueStr.indexOf(".") + 1);
                                    if (fraction.length > decimals) fraction = fraction.substring(0, decimals);
                                    valueStr = whole + "." + fraction;
                                }
                            }

                            valueStr = valueStr + unit;
                            return valueStr;
                        },
                        FormatTimespan: function (value) {
                            var i;
                            var t = ClientLib.Vis.VisMain.FormatTimespan(value);
                            var colonCount = 0;
                            for (i = 0; i < t.length; i++) {
                                if (t.charAt(i) == ':') colonCount++;
                            }
                            var r = "";
                            for (i = 0; i < t.length; i++) {
                                if (t.charAt(i) == ':') {
                                    if (colonCount > 2) {
                                        r += "d ";
                                    } else {
                                        r += t.charAt(i);
                                    }
                                    colonCount--;
                                } else {
                                    r += t.charAt(i);
                                }
                            }
                            return r;
                        }
                    }
                });
            }
        } catch (e) {
            console.log("InfoSticker: createInfoSticker: ", e.toString());
        }

        function InfoSticker_checkIfLoaded() {
            try {
                if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
                    createInfoSticker();
                    window.InfoSticker.Base.getInstance().initialize();
                } else {
                    window.setTimeout(InfoSticker_checkIfLoaded, 1000);
                }
            } catch (e) {
                console.log("InfoSticker_checkIfLoaded: ", e.toString());
            }
        }
        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(InfoSticker_checkIfLoaded, 1000);
        }
    }
    try {
        var InfoStickerScript = document.createElement("script");
        InfoStickerScript.innerHTML = "(" + InfoSticker_main.toString() + ")();";
        InfoStickerScript.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName("head")[0].appendChild(InfoStickerScript);
        }
    } catch (e) {
        console.log("InfoSticker: init error: ", e.toString());
    }
})();










// ==UserScript== 15000
// @name           BaseInfo
// @author         Dooki
// @description    Basis Informationen zur Auswertung und Übergabe an die Allianz Befehlshaber. Rechts oberhalb des Spielfensters befindet sich ein neuer Button der das Script aufruft.
// @include        http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @require        http://www.php-gfx.net/Wrapper/update/144825
// @updateURL      http://www.php-gfx.net/Wrapper/update/144825
// @downloadURL    http://www.php-gfx.net/Wrapper/144825.user.js
// @version        2.6.0
// @icon           data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QEEEAcmURyr/AAACJBJREFUWMPVll2MXVUVx3/rnHPvPffOR2cKlCnt1OmUpnbaYqsIpUFbSSkVrFD6YIgmfsRoCEWRJzU8GGMioj4QNelDTZAEAyHS0BICrQrhwXZsC8UwkEhJh/nqfHS+7rnnnnPPOXsvH+4ZmH4g6ps3Wdn73rv3/v/2XmuvteH/8ZMkyRV/f/XVV//rtbz/ZNDAwAAbNmwAYGho6HNzc3Ofn5mZWee6bjsgxpgoy7LBOI5P7Nmz54UjR45kAEePHmXXrl3/+06Hh4cX2o6xsbHvTU9PZ0EQaBiGWq/Xbb1e19xsGIZaq9V0dnZWR0ZGDg4ODl63sM6JEyc+UkM+DmJ0dPS7lUrlUc/zOhzHQcRRcQpibQOhDliUEuK0gKqqzUTVkmVZEgTBc93d3ff9u/U/EuDAgQOyd+/eZ0ul0j7P8xC3iMbv4cQncfU8jtNAJJ+uBmsshg6suw7at4M6aq2RMAwHx8fHd2zevPn9jwVQVUSE559/XrZu3XrW9/1e13VBU3T0cSr2fZyu20G0aRfNBcGBcJBo5K/YdY8jxR6MMcRxzPj4+Nobbrjh7BtvvMGWLVuuDHDu3DlWr17N+Pj4c77v73XdgmoyIsVT36DYewfSvgLFNLUX9BXA5lCC4iBJgjn7DLVl+/DW7FeTRFKv1yeXL19+7ce6YHh4+IFyufzbYrGIbZzHO3YPLZv2oq1LESwYgQwwuWUJFDvAX4JmU+DGiOOBcbDHH2Pukw9R6NuPyTKq1erxY8eObdu4cSNbt269GGBwcBAR6SgWi4PlcnkJGJxnv0TbkgjW78kTABALNJp9TTNwO2DXDxDXw9bnkNOPIW0e6oBceJf01IsEX/kThaW3aBzX5cKFC5/p6+t7fUHXWej09PQAfLtQKCzBLVA/dYCWkTfRtjVQq8FMDSYDmKjCVBVmq8jMLCpXoY6LtRZ1fexYBONVZLYGxW4KFtzffZM0mRbP8yiXy88uPnHnIn+I/FJESOrnqfzhFzi4SFaE2QAuVGE6gGoAYQD1AE1CdOQtbK2KbcTUTr2CTE3AVK05fi5AtZUl8zXS48+AOFoqlXrPnDlzS39//4eZMI5jRkdHb2vec9Hk5MtyjXEgMTA7C56BKHeBAlZRkyJhHWdmCPvIfWhHhTY/wvErTeAIKBeQuQYkIC8/DTvuF9d1qVQq+zZv3nz8AwDf9zl79ux213WxOKKnX4EUiFwYG4L2nuZ3A6iFeoAsXY/e+XVYfzNSKGD+8BO8kdegoU3IBjDfgLkGRB7FgTdJGmOIdKrrulsuc4GIrAXUCriD7zTDs64wOdWMgShEGwHUJtFVtzBz+8NE167GOEKWJsS9N0I4A0kIcQi1EAbfbW4iUZZ4DnNv/Q0FEZGeywCstR2AGJvh1WfRIiACUQLn34MkRBqz2J6bmendRtuv7qZgYowxqCpm5B9QisGGYOswNw61KliBoiAVB8aHAUFV268E4FlrsdYgLkghd5DjQBZCOAJuwPzSa2g5dj/O2mVoVy+qioqLd/4otGZQCiGZgGgcHIECUFQoODiqqFqstc5l5dhaG6iqYh0xS9rQtI54Ao4FV6AQgRfR8f5vkKtC4jsfRUyGKoQTg7S7/WilA6k2moKtTjMQLc3k5VnMVVdjrWKtrV8GkGXZcJqmUnCLJCuuR4YmmvSeQEGhFWgHKjHGW0Z63U1I0gCnSPTafq5eEYMJm7CONHOcA6QKCdRdxV/7WYzJyLJs/DIXGGP+nqYpmFSTtTc307ynUFIoC1SAVkUqMenqexCbICKk4STXtP4FlnpoewPaFNpoti35XM8h7FmNW16FyTKyLHv7IgBVpaur64UoirDWiFn/BeKkGQuUBHyFEmixWQXT7q99kLzM7OuUyhmNdU8SJAZ8Cz5QBsqClpsVq37jHkiNxnFMkiQvXQQgInR1dVWttU+naUqxs5ehW++F1KCFZhTjgliDyVrJOm8iyzJUCuj5lzBrHmdq8DTtZQMqzStcVPCb3VAd0k/fizGpRFFk+vr6nrliKvY878dhGCZiUtVtDzPnL0cS/XBUaon9WzFpjIigpkFxy2MMDpzmuulfo0kFGg6ooo4DCia2DN/9I7zWbo3jGGPM/paWFntFgI0bN56r1+uHoyiSUrmdsTt+TjAvEIIaAeviT71GOPFPamHMdP/vsYc2sSZ6EidrRSKvWaozaYJPpwz1fpHimr2YtEEQBBccx3lCVT/yPSCA9vf3n+vs7Oxx3IJGoyfkE3/+IW3+LHQIFGJs1CDJwO8A/BIqJcQKGNBEkBCyaWVo1V1kt/0M16rOz89JEATbduzYcXyxoLtI2M1PxNu+fftLLS0tD5SKBSl1dDO9ZjfR8Nt0TI6BFqFQouD7gA+ZhzQEjUECQWahOlfi3G0/RTZ9CxfRIAhkamrqOzt37nwx15DFAE6eDzygBPiHDh0Kly1bdmTlypVfLhQKlVK5XeO1d8nE0k1EsaJT0ziTVdyqQeYzshlDVCsxU+nj/PVfZXb7I5Su3qzWGObn52VgYOChffv2/TFff/Gmm/G6SLyUX6AS4LuuWzp06NDBlStXbqhUKuI4rhqLpJqh6SR2bhRMhlQ6cNq6cZ1WPAcVVOI4Znp6ev6pp576/sGDB8/k9bFBMz8u9DNZJFjJrTW3FqAsIv7u3bvXPvjgg/uXL1++rFAo4HmeijiXvKgt1lrSNKVarWaHDx9+8sCBA68EQRAAMRACtdzquTUkFyrlbVtu7TlEJQcsAnbnzp3rd+3a9alVq1at6Ozs7PR93xcRSZIkCYKgOjY2NnHy5Ml3nnjiidP58yXLd1zPhatAkFu4AFDmw9y1APHBCeT/FWlWBjc3ueQGLX6kL7yX04VnbA6xcAIL4hEQe/ng5JIF4nxwKRdeLO4sApBF8xbMXgKR5v6OF8HEuab5F8JUZQbxrSgeAAAAAElFTkSuQmCC
// ==/UserScript==

function Ini() {
    console.log("BaseInfo initialisiert...");
};
Ini();
(function () {
    var BaseInfoMain = function () {
        function BaseInfoCreate()
            {
                try
                    {
                        qx.Class.define("BaseInfo", {
                            type: "singleton",
                            extend: qx.core.Object,
                            construct: function () {
                                window.addEventListener("click", this.onClick, false);
                                window.addEventListener("keyup", this.onKey, false);
                                window.addEventListener("mouseover", this.onMouseOver, false);
                                console.log("BaseInfo geladen...");
                                VERSION = '2.6.0';
                                AUTHOR = 'Dooki';
                                CLASS = 'BaseInfo';
                            },
                            members: {
                                BasenwerteFenster: null,
                                BasenwerteTab: null,
                                BasenwertePage: null,
                                BasenwerteVBox: null,
                                AusgabeTab: null,
                                AusgabePage: null,
                                AusgabeVBox: null,
                                BasenwerteButton: null,
                                app: null,
                                initialize: function () {
                                    this.BasenwerteFenster = new qx.ui.window.Window(CLASS + " " + VERSION,"http://ccta.php-gfx.net/images/info.png").set({
                                        padding: 5,
                                        paddingRight: 0,
                                        showMaximize:false,
                                        showMinimize:false,
                                        showClose:true,
                                        allowClose:true,
                                        resizable:false
                                    });
                                    this.BasenwerteFenster.setTextColor('black');
                                    this.BasenwerteFenster.setLayout(new qx.ui.layout.HBox); 
                                    this.BasenwerteFenster.moveTo(280, 60);
                                    
                                    // Tab Reihe
                                    this.BasenwerteTab = (new qx.ui.tabview.TabView).set({
                                        contentPaddingTop: 3,
                                        contentPaddingBottom: 6,
                                        contentPaddingRight: 7,
                                        contentPaddingLeft: 3
                                    });
                                    this.BasenwerteFenster.add(this.BasenwerteTab);
                                    
                                    // Tab 1
                                    this.BasenwertePage = new qx.ui.tabview.Page("Basenwerte");
                                    this.BasenwertePage.setLayout(new qx.ui.layout.VBox(5));
                                    this.BasenwerteTab.add(this.BasenwertePage);
                                    this.BasenwerteVBox = new qx.ui.container.Composite();
                                    this.BasenwerteVBox.setLayout(new qx.ui.layout.VBox(5));
                                    this.BasenwerteVBox.setThemedPadding(2);
                                    this.BasenwerteVBox.setThemedBackgroundColor("#eef");
                                    this.BasenwertePage.add(this.BasenwerteVBox);

                                    // Tab 2
                                    this.MembersPage = new qx.ui.tabview.Page("Mitglieder");
                                    this.MembersPage.setLayout(new qx.ui.layout.VBox(5));
                                    this.BasenwerteTab.add(this.MembersPage);
                                    this.MembersVBox = new qx.ui.container.Composite();
                                    this.MembersVBox.setLayout(new qx.ui.layout.VBox(5));
                                    this.MembersVBox.setThemedPadding(2);
                                    this.MembersVBox.setThemedBackgroundColor("#eef");
                                    this.MembersPage.add(this.MembersVBox);

                                    // Tab 3
                                    this.AboutPage = new qx.ui.tabview.Page("ScriptInfo");
                                    this.AboutPage.setLayout(new qx.ui.layout.VBox(5));
                                    this.BasenwerteTab.add(this.AboutPage);
                                    this.AboutVBox = new qx.ui.container.Composite();
                                    this.AboutVBox.setLayout(new qx.ui.layout.VBox(5));
                                    this.AboutVBox.setThemedPadding(2);
                                    this.AboutVBox.setThemedBackgroundColor("#eef");
                                    this.AboutPage.add(this.AboutVBox);

                                    this.BasenwerteButton = new qx.ui.form.Button(null, "http://ccta.php-gfx.net/images/info_small.png").set({
                                        toolTipText: CLASS + " " + VERSION + " anzeigen",
                                        width: 32,
                                        height: 32,
                                        maxWidth: 32,
                                        maxHeight: 32,
                                        appearance: ("button-playarea-mode-frame"),
                                        center: true
                                    });
                                    this.BasenwerteButton.addListener("click", function (e) {
                                        this.BasenwerteVBox.removeAll();
                                        this.AboutVBox.removeAll();
                                        this.MembersVBox.removeAll();
                                        this.showBasenwerte();
                                        this.BasenwerteFenster.show();
                                    }, this);
                                    this.app = qx.core.Init.getApplication();
                                    this.app.getDesktop().add(this.BasenwerteButton, {
                                        right: 125,
                                        top: 0
                                    });
                                },
                                showBasenwerte: function (ev) {
                                    var instance = ClientLib.Data.MainData.GetInstance();
                                    var alliance = instance.get_Alliance();
                                    var serverName = instance.get_Server().get_Name();
                                    var player = instance.get_Player();
                                    var faction1 = player.get_Faction();
                                    var playerRank = player.get_OverallRank();
                                    var aktuellesDatum = new Date();
                                    var Stunde = aktuellesDatum.getHours();
                                    var Minute = aktuellesDatum.getMinutes();
                                    var Monat = aktuellesDatum.getMonth()+1 ;
                                    var Tag = aktuellesDatum.getDate();
                                    var Jahr = aktuellesDatum.getFullYear();
                                    if(Stunde<10) Stunde = "0" + Stunde;
                                    if(Minute<10) Minute = "0" + Minute;
                                    if(Tag<10) Tag = "0" + Tag;
                                    if(Monat<10) Monat = "0" + Monat;
                                    var Datum = Tag + "." + Monat + "." + Jahr;
                                    var Uhrzeit = Stunde + ":" + Minute;
                                    var player_basen = 0;
                                    var support_gebaeude = 0;
                                    var v = 0;
                                    var offbasen = 0;
                                    var base1 = '';
                                    var base2 = '';
                                    var VE_durchschnitt = null;
                                    var VE_lvl = null;
                                    var support = 0;
                                    var supportlvl = null;
                                    var def_durchschnitt = null;
                                    var credit_durchschnitt = null;
                                    var repairMaxTime = null;
                                    var creditPerHour = 0;
                                    var creditsPerHour = 0;
                                    var TiberiumPerHour = 0;
                                    var TiberiumsPerHour = 0;
                                    var TiberiumProduction = 0;
                                    var TiberiumsProduction = 0;
                                    var CrystalPerHour = 0;
                                    var CrystalsPerHour = 0;
                                    var CrystalProduction = 0;
                                    var CrystalsProduction = 0;
                                    var credit_basen = '';
                                    var first_rep_flug = 0;
                                    var first_rep_fahr = 0;
                                    var first_rep_fuss = 0;
                                    var second_rep_flug = 0;
                                    var second_rep_fahr = 0;
                                    var second_rep_fuss = 0;
                                    var firstBaseName = '';
                                    var firstBaselvl = 0;
                                    var firstOfflvl = 0;
                                    var firstDeflvl = 0;
                                    var firstPowerProduction = 0;
                                    var firstRepairAir = null;
                                    var firstRepairVehicle = null;
                                    var firstRepairInfantry = null;
                                    var secondBaseName = '';
                                    var secondBaselvl = 0;
                                    var secondOfflvl = 0;
                                    var secondDeflvl = 0;
                                    var secondPowerProduction = 0;
                                    var secondRepairAir = null;
                                    var secondRepairVehicle = null;
                                    var secondRepairInfantry = null;
                                    var factionArt = new Array();
                                    factionArt[0] = "";
                                    factionArt[1] = "GDI";
                                    factionArt[2] = "NOD";
                                    var newAusgabe = new Array();
                                    var apc = instance.get_Cities();
                                    var PlayerName = apc.get_CurrentOwnCity().get_PlayerName();
                                    var PlayerID = apc.get_CurrentOwnCity().get_PlayerId();
                                    var AllianzName = apc.get_CurrentOwnCity().get_AllianceName();
                                    var AllianzID = apc.get_CurrentOwnCity().get_AllianceId();
                                    var apcl = apc.get_AllCities().d;
                                    var members = alliance.get_MemberData().d, member;
                                    var leaders = alliance.get_FirstLeaders();
                                    keys = Object.keys(members);
                                    len = keys.length;
                                    var AllianzRolle = new Array();
                                    var AllianzSpieler = new Array();
                                    var sd;
                                    var baseidforWorldmap = null;
                                    var coordsforWorldmap = '';
                                    var worldidforWorldmap = document.URL.split("/");
                                    while (len--)
                                        {
                                            member = members[keys[len]];
                                            AllianzRolle[member.Id] = member.RoleName;
                                            AllianzSpieler[member.Id] = member.Name;
                                        }
                                    var allBases = '';
                                    var aB_basename,aB_baselvl,aB_offlvl,aB_deflvl,aB_velvl,aB_vzlvl,aB_cclvl,aB_supportlvl,aB_credits,aB_strom,aB_tiberium,aB_crystal;
                                    for (var key in apcl)
                                        {
                                            player_basen++;
                                            var c = apcl[key];
                                            try
                                                {
                                                    sd = c.get_SupportData();
                                                    if(sd !== null)
                                                        {
                                                            support_gebaeude++;
                                                            support = sd.get_Level();
                                                            supportlvl = supportlvl+support;
                                                            
                                                        }
                                                    else
                                                        {
                                                            support = 0;
                                                        }
                                                    unitData = c.get_CityBuildingsData();
                                                    ve = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_Facility);
                                                    vz = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_HQ);
                                                    creditPerHour = ClientLib.Base.Resource.GetResourceGrowPerHour(c.get_CityCreditsProduction(), false) + ClientLib.Base.Resource.GetResourceBonusGrowPerHour(c.get_CityCreditsProduction(), false);
                                                    repairMaxTime = c.GetResourceMaxStorage(ClientLib.Base.EResourceType.RepairChargeInf);
                                                    commandpointsMaxStorage = c.GetResourceMaxStorage(ClientLib.Base.EResourceType.CommandPoints);
                                                    TiberiumPerHour = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Tiberium);
                                                    TiberiumProduction = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium);
                                                    CrystalPerHour = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Crystal);
                                                    CrystalProduction = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal);
                                                    creditsPerHour = creditsPerHour + creditPerHour;
                                                    TiberiumsPerHour = TiberiumsPerHour + TiberiumPerHour;
                                                    CrystalsPerHour = CrystalsPerHour + CrystalPerHour;
                                                    TiberiumsProduction = TiberiumsProduction + TiberiumProduction;
                                                    CrystalsProduction = CrystalsProduction + CrystalProduction;
                                                    
                                                    if(c.get_CommandCenterLevel() > 0)
                                                        {
                                                            if(firstOfflvl < c.get_LvlOffense())
                                                                {
                                                                    secondBaseName = firstBaseName;
                                                                    secondBaselvl = firstBaselvl;
                                                                    secondOfflvl = firstOfflvl;
                                                                    secondDeflvl = firstDeflvl;
                                                                    secondPowerProduction = firstPowerProduction;
                                                                    secondRepairInfantry = firstRepairInfantry;
                                                                    secondRepairVehicle = firstRepairVehicle;
                                                                    secondRepairAir = firstRepairAir;
                                                                    
                                                                    firstBaseName = c.get_Name();
                                                                    firstBaselvl = c.get_LvlBase();
                                                                    firstOfflvl = c.get_LvlOffense();
                                                                    firstDeflvl = c.get_LvlDefense();
                                                                    firstPowerProduction = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
                                                                    firstRepairInfantry = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
                                                                    firstRepairVehicle = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
                                                                    firstRepairAir = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
                                                                }
                                                            else if(c.get_LvlOffense() > secondOfflvl)
                                                                {
                                                                    secondBaseName = c.get_Name();
                                                                    secondBaselvl = c.get_LvlBase();
                                                                    secondOfflvl = c.get_LvlOffense();
                                                                    secondDeflvl = c.get_LvlDefense();
                                                                    secondPowerProduction = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
                                                                    secondRepairInfantry = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
                                                                    secondRepairVehicle = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
                                                                    secondRepairAir = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
                                                                }
                                                        }
                                                    if(c.get_CommandCenterLevel() > 0 && c.get_LvlOffense() > 0)
                                                        {
                                                            offbasen++;
                                                        }
                                                    if(ve !== null)
                                                        {
                                                            v++;
                                                            VE_lvl = VE_lvl+ve.get_CurrentLevel();
                                                        }
                                                    if(c.get_LvlDefense())
                                                        {
                                                            def_durchschnitt = def_durchschnitt + c.get_LvlDefense();
                                                        }
                                                    if(allBases != "")
                                                        {
                                                            allBases += ' |||| ';
                                                        }
                                                    if(ve !== null) { aB_velvl = ve.get_CurrentLevel().toString(); } else { aB_velvl = 0;}
                                                    if(vz !== null) { aB_vzlvl = vz.get_CurrentLevel().toString(); } else { aB_vzlvl = 0;}
                                                    if(c.get_CommandCenterLevel)  { aB_cclvl =  c.get_CommandCenterLevel().toString(); } else { aB_cclvl = 0;}
                                                    allBases += '' + c.get_Name().toString() + ' | ' + c.get_LvlBase().toFixed(2).toString() + ' | ' + c.get_LvlOffense().toFixed(2).toString() + ' | ' + c.get_LvlDefense().toFixed(2).toString() + ' | ' + aB_velvl + ' | ' + aB_vzlvl + ' | ' + aB_cclvl + ' | ' + support.toFixed(2).toString() + ' | ' + parseInt(creditPerHour) + ' | ' + parseInt(c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power)) + ' | ' + parseInt(c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Tiberium)) + ' | ' + parseInt(c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Crystal)) + ' | ' + key + '';
                                                    if(baseidforWorldmap == null)
                                                        {
                                                            baseidforWorldmap = key;
                                                            coordsforWorldmap = c.get_PosX() + ':' + c.get_PosY();
                                                        }
                                                }
                                            catch (e)
                                                {
                                                    console.warn("BaseInfo pro Base: ", e); 
                                                }
                                        }

                                    def_durchschnitt = def_durchschnitt / player_basen;
                                    newAusgabe["off_basen"] = offbasen;
                                    if(player_basen>0)
                                        {
                                            newAusgabe["def_durchschnitt"] = "" + def_durchschnitt.toFixed(2).toString() + "";
                                        }
                                    else
                                        {
                                            newAusgabe["def_durchschnitt"] = 0;
                                        }
                                    newAusgabe["support_basen"] = support_gebaeude;
                                    if(support_gebaeude>0)
                                        {
                                            supportlvl = supportlvl / support_gebaeude;
                                            newAusgabe["support_lvl"] = "" + supportlvl.toFixed(2).toString() + "";
                                        }
                                    else
                                        {
                                            newAusgabe["support_lvl"] = 0;
                                        }
                                    VE_durchschnitt = VE_lvl / v;
                                    if(v>0)
                                        {
                                            newAusgabe["ve"] = "" + VE_durchschnitt.toFixed(2).toString() + "";
                                        }
                                    else
                                        {
                                            newAusgabe["ve"] = 0;
                                        }
                                    first_rep_flug = ClientLib.Vis.VisMain.FormatTimespan(firstRepairAir);
                                    first_rep_fahr = ClientLib.Vis.VisMain.FormatTimespan(firstRepairVehicle);
                                    first_rep_fuss = ClientLib.Vis.VisMain.FormatTimespan(firstRepairInfantry);
                                    if(first_rep_flug.split(":").length < 3)
                                        {
                                            first_rep_flug = "0:" + first_rep_flug;
                                        }
                                    if(first_rep_flug.split(":").length < 4)
                                        {
                                            first_rep_flug = "0:" + first_rep_flug;
                                        }
                                    if(first_rep_fahr.split(":").length < 3)
                                        {
                                            first_rep_fahr = "0:" + first_rep_fahr;
                                        }
                                    if(first_rep_fahr.split(":").length < 4)
                                        {
                                            first_rep_fahr = "0:" + first_rep_fahr;
                                        }
                                    if(first_rep_fuss.split(":").length < 3)
                                        {
                                            first_rep_fuss = "0:" + first_rep_fuss;
                                        }
                                    if(first_rep_fuss.split(":").length < 4)
                                        {
                                            first_rep_fuss = "0:" + first_rep_fuss;
                                        }
                                    second_rep_flug = ClientLib.Vis.VisMain.FormatTimespan(secondRepairAir);
                                    second_rep_fahr = ClientLib.Vis.VisMain.FormatTimespan(secondRepairVehicle);
                                    second_rep_fuss = ClientLib.Vis.VisMain.FormatTimespan(secondRepairInfantry);
                                    if(second_rep_flug.split(":").length < 3)
                                        {
                                            second_rep_flug = "0:" + second_rep_flug;
                                        }
                                    if(second_rep_flug.split(":").length < 4)
                                        {
                                            second_rep_flug = "0:" + second_rep_flug;
                                        }
                                    if(second_rep_fahr.split(":").length < 3)
                                        {
                                            second_rep_fahr = "0:" + second_rep_fahr;
                                        }
                                    if(second_rep_fahr.split(":").length < 4)
                                        {
                                            second_rep_fahr = "0:" + second_rep_fahr;
                                        }
                                    if(second_rep_fuss.split(":").length < 3)
                                        {
                                            second_rep_fuss = "0:" + second_rep_fuss;
                                        }
                                    if(second_rep_fuss.split(":").length < 4)
                                        {
                                            second_rep_fuss = "0:" + second_rep_fuss;
                                        }
                                    
                                    newAusgabe["AllianzID"] = AllianzID;
                                    newAusgabe["AllianzName"] = AllianzName.toString();
                                    newAusgabe["AllianzRolle"] = AllianzRolle[PlayerID].toString();
                                    newAusgabe["ServerName"] = serverName.toString();
                                    newAusgabe["SpielerID"] = PlayerID;
                                    newAusgabe["Spieler"] = PlayerName;
                                    newAusgabe["Klasse"] = factionArt[faction1];
                                    newAusgabe["Datum"] = Datum;
                                    newAusgabe["Uhrzeit"] = Uhrzeit;
                                    newAusgabe["Rang"] = playerRank;
                                    newAusgabe["maxKP"] = commandpointsMaxStorage;
                                    newAusgabe["repZeit"] = repairMaxTime / 60 / 60;
                                    newAusgabe["Basen"] = player_basen;
                                    newAusgabe["Creditproduktion"] = parseInt(creditsPerHour);
                                    newAusgabe["Tiberiumproduktion"] = parseInt(TiberiumsPerHour);
                                    newAusgabe["Kristallproduktion"] = parseInt(CrystalsPerHour);
                                    newAusgabe["1st_Base"] = firstBaselvl.toFixed(2).toString();
                                    newAusgabe["1st_Def"] = firstDeflvl.toFixed(2).toString();
                                    newAusgabe["1st_Off"] = firstOfflvl.toFixed(2).toString();
                                    newAusgabe["1st_Stromproduktion"] = parseInt(firstPowerProduction);
                                    newAusgabe["1st_Flugzeuge"] = first_rep_flug;
                                    newAusgabe["1st_Fahrzeuge"] = first_rep_fahr;
                                    newAusgabe["1st_Fusstruppen"] = first_rep_fuss;
                                    newAusgabe["2nd_Base"] = secondBaselvl.toFixed(2).toString();
                                    newAusgabe["2nd_Def"] = secondDeflvl.toFixed(2).toString();
                                    newAusgabe["2nd_Off"] = secondOfflvl.toFixed(2).toString();
                                    newAusgabe["2nd_Stromproduktion"] = parseInt(secondPowerProduction);
                                    newAusgabe["2nd_Flugzeuge"] = second_rep_flug;
                                    newAusgabe["2nd_Fahrzeuge"] = second_rep_fahr;
                                    newAusgabe["2nd_Fusstruppen"] = second_rep_fuss;
                                    newAusgabe["Leaders"] = leaders.l[leaders.l.indexOf(PlayerID)];
                                    newAusgabe["WorldID"] = worldidforWorldmap[3];
                                    newAusgabe["CoordsforWorldmap"] = coordsforWorldmap;
                                    newAusgabe["ShowonWorldmap"] = baseidforWorldmap;
                                    newAusgabe["Version"] = VERSION;

                                    var usersubmit = '';
                                    for(var werte in newAusgabe)
                                        {
                                            usersubmit += "[" + werte + "] == " + newAusgabe[werte] + "\n";
                                        }

                                    // Tab 1 Basenwerte
                                    this.BasenwerteVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>Allgemeine Informationen</u></b></big><br><b>Allianz Rolle:</b> " + newAusgabe["AllianzRolle"] + "<br><b>Spielername:</b> " + newAusgabe["Spieler"] + "<br><b>Spielerklasse:</b> " + newAusgabe["Klasse"] + "<br><b>Aktuelle Uhrzeit:</b> " + newAusgabe["Uhrzeit"] + "Uhr - " + newAusgabe["Datum"] + "<br><b>Rang:</b> " + newAusgabe["Rang"] + "<br><b>Maximale KP:</b> " + newAusgabe["maxKP"] + "<br><b>Maximale Repzeit:</b> " + newAusgabe["repZeit"] + " Stunden<br><b>Basenanzahl:</b> " + newAusgabe["Basen"] + "<br><b>Offensiv Basen Anzahl:</b> " + newAusgabe["off_basen"] + "<br><b>Creditproduktion:</b> " + newAusgabe["Creditproduktion"] + "<b>/h</b><br><b>Tiberiumproduktion:</b> " + newAusgabe["Tiberiumproduktion"] + "<b>/h</b> (Ohne Bonus: " + parseInt(TiberiumsProduction) + "/h)<br><b>Kristallproduktion:</b> " + newAusgabe["Kristallproduktion"] + "<b>/h</b> (Ohne Bonus: " + parseInt(CrystalsProduction) + "/h)<br><b>Defensive Ø:</b> " + newAusgabe["def_durchschnitt"] + "<br><b>Supportgebäude Anzahl:</b> " + newAusgabe["support_basen"] + "<br><b>Supportgebäude Level Ø:</b> " + newAusgabe["support_lvl"] + "<br><b>VE Ø aller Basen:</b> " + newAusgabe["ve"] + "</td></tr></table>").set({rich: true}));
                                    // 1. und 2. Offensive
                                    this.BasenwerteVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>1. Offensiv Basis</u></b></big><br><b>Basis Name:</b> " + firstBaseName + "<br><b>Basis Level:</b> " + newAusgabe["1st_Base"] + "<br><b>Offensive:</b> " + newAusgabe["1st_Off"] + "<br><b>Defensive:</b> " + newAusgabe["1st_Def"] + "<br><b>Stromproduktion:</b> " + newAusgabe["1st_Stromproduktion"] + "<br><b>Rep. Flugzeuge:</b> " + newAusgabe["1st_Flugzeuge"] + "<br><b>Rep. Fahrzeuge:</b> " + newAusgabe["1st_Fahrzeuge"] + "<br><b>Rep. Fußtruppen:</b> " + newAusgabe["1st_Fusstruppen"] + "</td><td><big><b><u>2. Offensiv Basis</u></b></big><br><b>Basis Name:</b> " + secondBaseName + "<br><b>Basis Level:</b> " + newAusgabe["2nd_Base"] + "<br><b>Offensive:</b> " + newAusgabe["2nd_Off"] + "<br><b>Defensive:</b> " + newAusgabe["2nd_Def"] + "<br><b>Stromproduktion:</b> " + newAusgabe["2nd_Stromproduktion"] + "<br><b>Rep. Flugzeuge:</b> " + newAusgabe["2nd_Flugzeuge"] + "<br><b>Rep. Fahrzeuge:</b> " + newAusgabe["2nd_Fahrzeuge"] + "<br><b>Rep. Fußtruppen:</b> " + newAusgabe["2nd_Fusstruppen"] + "</td></tr></table>").set({rich: true}));
                                    // Werte übertragen + Worldmap Link
                                    this.BasenwerteVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><a href='http://ccta.php-gfx.net/baseinfo/index.php?usersubmit=" + escape(usersubmit) + "&amp;allBases=" + escape(allBases) + "' target='_blank'><button><b>&nbsp;&nbsp;Werte übertragen&nbsp;&nbsp;</b></button></a></td><td><a href='http://map.tiberium-alliances.com/map/"+worldidforWorldmap[3]+"#"+coordsforWorldmap+"|3|"+baseidforWorldmap+"|~' target='_blank'><button><b>&nbsp;&nbsp;Worldmap&nbsp;&nbsp;</b></button></a></td></tr></table>").set({rich: true}));
                                    
                                    // Tab 2 Mitglieder
                                    var keys = Object.keys(AllianzSpieler);
                                    var anzahl = keys.length;
                                    var len = keys.length;
                                    var member='',userreplace='',i=0;
                                    userreplace += newAusgabe["AllianzID"] + ',' + newAusgabe["AllianzName"] + ',' + newAusgabe["AllianzRolle"] + ',' + newAusgabe["ServerName"] + ',';
                                    while (len--)
                                        {
                                            i++;
                                            if(member != '')
                                                {
                                                    if(i == 5)
                                                        {
                                                            member += ',<br>';
                                                            i = 0;
                                                        }
                                                    else
                                                        {
                                                            member += ', ';
                                                        }
                                                    userreplace += ',';
                                                }
                                            member += AllianzSpieler[keys[len]];
                                            userreplace += AllianzSpieler[keys[len]];
                                        }
                                    this.MembersVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>Mitglieder Auflistung (" + anzahl + ")</u></b></big><br><br>" + member + "</td></tr></table>").set({rich: true}));
                                    if(leaders.l.indexOf(PlayerID) != "-1")
                                        {
                                            this.MembersVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><span style='color: #bb0000;'><u>Nur für OBH's sichtbar:</u></span></td></tr></table>").set({rich: true}));
                                            this.MembersVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>Mitglieder Anpassung</u></b></big><br>Mit diesem Button kannste du deine Mitglieder auf<br>der BaseInfo Seite anpassen, sollten ehemalige Mitglieder,<br>die z.Z. einer anderen Allianz angehören,<br>noch in der Auflistung angezeigt werden.</td></tr></table>").set({rich: true}));
                                            this.MembersVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><a href='http://ccta.php-gfx.net/baseinfo/index.php?userreplace=" + escape(userreplace) + "' target='_blank'><button><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mitglieder abgleichen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></button></a><br><span style='color: #bb0000;'><i>Du musst auf der " + CLASS + "-Seite eingeloggt sein</i></span></td></tr></table>").set({rich: true}));
                                        }

                                    // Tab 3 ScriptInfo
                                    this.AboutVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>Script Informationen</u></b></big><br><b>Name:</b> " + CLASS + "<br><b>Version:</b> " + VERSION + "<br><b>Ersteller:</b> " + AUTHOR + "<br><b>Homepage:</b> <a href='http://ccta.php-gfx.net/baseinfo' target='_blank'>ccta.php-gfx.net/baseinfo</a><br><br><big><b><u>Warum entstand dieses Script?</u></b></big><br>Es gibt ein paar Hauptgründe warum dieses Script entstand. Zum einen wollten Befehlshaber einen Überblick haben, über die einzelnen Werte ihrer Mitglieder, zum anderen sollten die Mitglieder selber sehen, wie ihre Werte sind.<br><br><big><b><u>Was bewirkt \"Werte übertragen\"?</u></b></big><br>Mit dem Button \"Werte übertragen\" können eure Basenwerte an eine Homepage übermittelt werden, wo sich OBH's anmelden können und ihre Allianz auswerten können. Die OBH's bekommen mit dem erstmaligen Übertragen ihrer eigenen Werte einen \"Befehlshaber Login\" angezeigt, welcher nur EINMAL sichtbar ist. Danach können sich Zugriffsberechtigte (diese Zugangsdaten sollten von diesem OBH an berechtigte Personen weitergegeben werden) ihre Allianz einsehen und diverse Einstellungen tätigen. Mitglieder bekommen mit dem übertragen ihrer Werte einen permanenten Link angezeigt welchen sie für ihre eigenen Werte nutzen können. Sie sehen dann ihre letzten 5 Einträge wo sie selbst auswerten können wo sie sich verbessert haben.</td></tr></table>").set({rich: true, width: 350}));
                                }
                            }
                        });          
                    }
                catch (e)
                    {
                        console.warn("qx.Class.define(BaseInfo: ", e);      
                    }
                BaseInfo.getInstance();
            }
        function LoadExtension()
            {
                try
                    {
                        if (typeof(qx)!='undefined')
                            {
                                if (!!qx.core.Init.getApplication().getMenuBar())
                                    {
                                        BaseInfoCreate();
                                        BaseInfo.getInstance().initialize();
                                        return;
                                    }
                            }
                    }
                catch (e)
                    {
                        if (console !== undefined) console.log(e);
                        else if (window.opera) opera.postError(e);
                        else GM_log(e);
                    }
                window.setTimeout(LoadExtension, 1000);
            }
        LoadExtension();
    }
    function Inject()
        {
            if (window.location.pathname != ("/login/auth"))
                {
                    var Script = document.createElement("script");
                    Script.innerHTML = "(" + BaseInfoMain.toString() + ")();";
                    Script.type = "text/javascript";        
                    document.getElementsByTagName("head")[0].appendChild(Script);
                }
        }
    Inject();
})();










// ==UserScript==
// @name Tiberium Alliances BaseNavBar Reorderer
// @description Allows you to set a custom order for your bases in the Base Navigation Bar.
// @namespace basenav_reorder
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version 1.0
// @author KRS_L
// ==/UserScript==
(function () {
    var BaseNavReorder_main = function () {
        var reorderWindow = null;
        var baseList = null;
        var bases = null;
        var myOrder = null;
        var reorderInterval = 500;
        function createBaseNavReorder() {
            try {
                console.log('Base Navigation Bar Reorderer loaded');
                var baseTimerBar = qx.core.Init.getApplication().getGlobalBaseTimerBar().getChildren()[1];
                var btnToggleWindow=new qx.ui.form.Button("").set({toolTipText:"Reorder Bases"});
                baseTimerBar.add(btnToggleWindow);
                reorderWindow = new qx.ui.window.Window("BaseNavBar Reorderer", "").set({
                    contentPaddingTop: 0,
                    contentPaddingBottom: 7,
                    contentPaddingRight: 7,
                    contentPaddingLeft: 7,
                    width: 200,
                    showMaximize: false,
                    showMinimize: false,
                    allowMaximize: false,
                    allowMinimize: false,
                    resizable: false
                });
                reorderWindow.setLayout(new qx.ui.layout.Canvas());

                baseList = new qx.ui.form.List;
                baseList.set({ height: 300, width: 150, selectionMode : "single" });
                var btnMoveUp=new qx.ui.form.Button("↑").set({height:40,toolTipText:"Move Up"});
                var btnMoveDown=new qx.ui.form.Button("↓").set({height:40,toolTipText:"Move Down"});

                reorderWindow.add(btnMoveUp, {
                    top: 105,
                    right: 3
                });
                reorderWindow.add(btnMoveDown, {
                    bottom: 110,
                    right: 3
                });

                reorderWindow.add(baseList);
                myOrder = localStorage.ta_basenavbar_baseorder;
                if (!myOrder) {
                    myOrder = getAllBases();
                    localStorage.ta_basenavbar_baseorder = JSON.stringify(myOrder);
                }
                btnToggleWindow.addListener("click", toggleReorderWindow, this);
                btnMoveUp.addListener("click", moveUp, this);    
                btnMoveDown.addListener("click", moveDown, this);
                reorder();
            } catch (e) {
                console.log("createBaseNavReorder: ", e);
            }
        }

        function moveUp() {
            try {
                if (baseList.getSelection()[0] !== null) {
                    var curIndex = baseList.indexOf(baseList.getSelection()[0]);
                    if (curIndex > 0) baseList.addAt(baseList.getSelection()[0],curIndex-1);
                    saveOrder();
                }
            } catch (e) {
                console.log(e);
            }
        }

        function moveDown() {
            try {
                if (baseList.getSelection()[0] !== null) {
                    var curIndex = baseList.indexOf(baseList.getSelection()[0]);
                    if (curIndex < baseList.getChildren().length) baseList.addAt(baseList.getSelection()[0],curIndex+1);
                    saveOrder();
                }
            } catch (e) {
                console.log(e);
            }
        }
    
        function saveOrder() {
            try {
                myOrder = [];
                for (var y in baseList.getChildren()) {
                    myOrder.push(translateNameToId(baseList.getChildren()[y].getLabel()));
                }
                localStorage.ta_basenavbar_baseorder = JSON.stringify(myOrder);
            } catch (e) {
                console.log(e);
            }
        }

        function toggleReorderWindow() {
            try {
                if (reorderWindow.isVisible()) {
                    reorderWindow.close();
                    baseList.removeAll();
                } else {
                    var reorderWindowLeft = qx.bom.Viewport.getWidth(window) - window.qx.core.Init.getApplication().getGlobalBaseTimerBar().getWidth() - reorderWindow.getWidth();
                    var reorderWindowTop = window.qx.core.Init.getApplication().getGlobalBaseTimerBar().getHeight();
                    reorderWindow.moveTo(reorderWindowLeft, reorderWindowTop);
                    var item;
                    myOrder = JSON.parse(localStorage.ta_basenavbar_baseorder);
                    var newBases = getAllBases(); 
                    for (var j in myOrder) {
                        for (var i in newBases) {
                            if (myOrder[j] === newBases[i]) {
                                newBases.splice(i, 1);
                                continue;
                            }
                        }
                    }
                    myOrder = myOrder.concat(newBases);
                    reorderWindow.open();
                    for (var x in myOrder) {
                        item = new qx.ui.form.ListItem(translateIdToName(myOrder[x]));
                        baseList.add(item);
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }

        function reorder() {
            try {
                var baseNavigationBar = qx.core.Init.getApplication().getBaseNavigationBar().getChildren()[0].getChildren()[0];
                var baseButtons = baseNavigationBar.getChildren();
                myOrder = JSON.parse(localStorage.ta_basenavbar_baseorder);

                for (var i = myOrder.length; i > -1 ; i--) {
                    for (var x in baseButtons) {
                        if (typeof baseButtons[x].getChildren()[1].getChildren === 'function') {
                            var navigationButton = baseButtons[x].getChildren()[1].getChildren()[0].getChildren()[2];
                            if (navigationButton.getValue() === translateIdToName(myOrder[i])) {
                                baseNavigationBar.addAt(baseButtons[x],0);
                            }
                        }
                    }
                }
                window.setTimeout(reorder, reorderInterval);
            } catch (e) {
                console.log(e);
            }
        }

        function getAllBases() {
            try {
                bases = [];
                var cities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
                for (var cityId in cities) {
                    bases.push(cityId);
                }
                return bases;
            } catch (e) {
                console.log(e);
            }
        }

        function translateIdToName(id) {
            try {
                var cities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
                for (var cityId in cities) {
                    if (cityId === id) {
                        return cities[cityId].get_Name();
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }

        function translateNameToId(name) {
            try {
                var cities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
                for (var city in cities) {
                    if (cities[city].get_Name() === name) {
                        return city;
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }
    
        function BaseNavReorder_checkIfLoaded() {
            try {
                if (typeof qx !== 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getGlobalBaseTimerBar() && qx.core.Init.getApplication().getBaseNavigationBar()) {
                    createBaseNavReorder();
                } else {
                    window.setTimeout(BaseNavReorder_checkIfLoaded, 1000);
                }
            } catch (e) {
                console.log("BaseNavReorder_checkIfLoaded: ", e);
            }
        }

        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(BaseNavReorder_checkIfLoaded, 1000);
        }
    }

    try {
        var BaseNavReorder = document.createElement("script");
        BaseNavReorder.innerHTML = "(" + BaseNavReorder_main.toString() + ")();";
        BaseNavReorder.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName("head")[0].appendChild(BaseNavReorder);
        }
    } catch (e) {
        console.log("BaseNavReorder: init error: ", e);
    }
})();

