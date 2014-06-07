// ==UserScript==
// @name            C&C: HF BASE INFO
// @author          k37z3r
// @version         1.6.5
// @copyright       Creative Commons Namensnennung - Nicht-kommerziell - Weitergabe unter gleichen Bedingungen 3.0 Unported Lizenz (CC-BY-NC-SA 3.0)
// @license         http://creativecommons.org/licenses/by-nc-sa/3.0/deed.de/
// @namespace          http*://prodgame07.alliances.commandandconquer.com/264/index.aspx
// @include         http*://prodgame07.alliances.commandandconquer.com/264/index.aspx
// @require         http://usocheckup.redirectme.net/174412.js
// @contributor     k37z3r (http://userscripts.org/users/513321)
// @icon             data:image/png;base64,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
// @description     Basis auf optimale Werte prüfen. So kann man im Spiel feststellen wo man weiter ausbauen muss um niergenswo ins MINUS zu gelangen.
// @description     Dieses Script ist auf Deutsch und für die Allianz HF auf Welt 35 optimiert
// @downloadURL     https://userscripts.org/scripts/source/174412.user.js
// @updateURL       https://userscripts.org/scripts/source/174412.meta.js
// @grant           GM_getValue
// @grant           GM_log
// @grant           GM_openInTab
// @grant           GM_registerMenuCommand
// @grant           GM_setValue
// @grant           GM_xmlhttpRequest
// ==/UserScript==
(function () {
    var ATI_main = function () {
        function formatNumbersCompact(value, decimals) {
            if (decimals == undefined)
                decimals = 2;
            var valueStr;
            var unit = "";
            if (value < 1000)
                valueStr = value.toString();
            else if (value < 1000 * 1000) {
                valueStr = (value / 1000).toString();
                unit = "k";
            }
            else if (value < 1000 * 1000 * 1000) {
                valueStr = (value / 1000000).toString();
                unit = "M";
            }
            else {
                valueStr = (value / 1000000000).toString();
                unit = "G";
            }
            if (valueStr.indexOf(".") >= 0) {
                var whole = valueStr.substring(0, valueStr.indexOf("."));
                if (decimals === 0)
                    valueStr = whole;
                else {
                    var fraction = valueStr.substring(valueStr.indexOf(".") + 1);
                    if (fraction.length > decimals)
                        fraction = fraction.substring(0, decimals);
                    valueStr = whole + "." + fraction;
                }
            }
            valueStr = valueStr + unit;
            return valueStr;
        }
        function transformtime(t) {
            d = Math.floor(t/(60*60*24));
            h = Math.floor(t/(60*60)) % 24;
            m = Math.floor(t/60) % 60;
            s = t % 60;
            d = (d >  0) ? d + ":":"";
            h = (h < 10) ? "0" + h + ":" : h + ":";
            m = (m < 10) ? "0" + m + ":" : m + ":";
            s = (s < 10) ? "0" + s : s;
            strZeit =d + h + m + s;
            return strZeit;
        }
        function SET_CLR(MINI, MAXI){
            if (((MINI) + 2) < MAXI)
                return "FF0000";
            else if (((MINI) + 1) < MAXI)
                return "FFBB00";
            else
                return "00AA00";
        }
        function SET_TIME_CLR(OBJECT_TIME, TIME1, TIME2){
            if (TIME2 == undefined)
                TIMER2 = 21600;
            else
                TIMER2 = TIME2;
            if (TIME1 == undefined)
                TIMER1 = 21600;
            else
                TIMER1 = TIME1;
            if ((OBJECT_TIME) > TIMER2)
                return "FF0000";
            else if ((OBJECT_TIME) > TIMER1)
                return "FFBB00";
            else
                return "00AA00";
        }
        function GET_MAX_CLR(MAXI, RESSI){
            if (MAXI/RESSI < 24)
                return "FF0000";
            else if (MAXI/RESSI > 72)
                return "00AA00";
            else
                return "FFBB00";
        }
        function GET_FAK_CLR(FAKTOR1, FAKTOR2, VAR1, VAR2){
            FAKTOR = parseInt(FAKTOR1)/parseInt(FAKTOR2)
            if (FAKTOR > (VAR1/100))
                return "00AA00";
            else if (FAKTOR > (VAR2/100))
                return "FFBB00";
            else
                return "FF0000";
        }
        function createInstance() {
            qx.Class.define("ATI", {
                type : "singleton",
                extend : qx.core.Object,
                construct: function () {
                    window.addEventListener("click", this.onClick, false);
                    window.addEventListener("keyup", this.onKey, false);
                    window.addEventListener("mouseover", this.onMouseOver, false);
                    console.log("BaseInfo geladen...");
                    ATIVERSION = '1.6.5';
                    ATIAUTHOR = 'k37z3r';
                    ATICLASS = 'HF-BaseInfo';
                },
                members : {
                    BasenwerteFenster: null,
                    BasenwerteTab: null,
                    BasenwertePage: null,
                    BasenwerteVBox: null,
                    BasenwerteButton: null,
                    basentxt: null,
                    app: null,
                    initialize : function () {
                        this.BasenwerteFenster = new qx.ui.window.Window(ATICLASS + " " + ATIVERSION,"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QcVECQFKjdotQAABHVJREFUOMuFlHtMU2cYxp/T9pzejoXWAq0yZAWdMid4gYKJUEcpF5ngYA41gUWM/6zOZdk1zoQtc0vMjFOZmxkbXufmNLJBxmaq1qHDalYRpwlsIpoigmi5FHrantNvf9CDhIz4/vfl/eX98n3v8zzAU6q0SF/Wdobmrp2h/aVF+tKn8dR0DavVQvGBe6aT+7v/qf+JdQoChOpXfbn5lbrZ7raB3skcADkACYCwbJphEgBRhTne2s4uevSLb9W2np5esiKdGSy0hHa721AxmQMgBSAAGJT8zzApAAOAGS9ZfblHG1S1PT29PADh+5/V+8uLxkqmcgAYAEMOh5MAAFblxRW2nJYPh7pBiAfkcpN8tG6Xpp14QLIyjM+Jl2WmG+YTD8i+HazrcpN8lHhAQt0gLaflw8W2mQUTf3j2hNzb2UV3u29q6hiGaPTa4AtZi0dt+TnczLZbNFd/gj1AUWHqtVfGNqelhBTnWxWDLVfZ33v7aXffw1CXLZv7MCmBT7Ct43QyABjzSwIPH9Pdd3rnNQLgO+6iLxi8dghAoVJBZHtqvFsB4A+XfNjZqgxcua681OJe+BaAPofDKaTMjSo36IVYRDaDpnPKrzavGy7Rsp4kETLGCnPzczhdvJFX27drd75Ro/s8MV5QW7L8UXotnyBymemG+faqkbW/OJS7JxaRnb1c9eMB9d2LDfKRpWnGZ97fEn0wcAfk2JfqrpQF8bqMpcakstXJK8zmZQtPf6f2BO6AvPN6VP2SNGPCpQZm5PBeVScAymq1UFRkY4oh703FjrdHbpsXB7S+UQkZ8VHCwZPs8Qsu1Ue/He79l6JAVb9nyklOeLSpqsxXoZkRlqpVhGr9i3ls3642JZoW+QAwomwCw0NhYcxPBQGAC4CQcQFglkE1W3xJ/4DvASHjPT9HkXFWElKzKkT0KJEAgMPhxPY3/W0ztWH1ixWGOd8cn3HUNIenM9JCuZ6+aO/Gd5NyrOsNyQ8f0QOLFgSzTXN4+utj7JGVFYbEGJ3AbrMP3hAEQQogDACoXq/94L5bIpiX6ZNF0Yo6vOuS8fZq3U77Rt3O239KeeIB2fsJ6xK5tWuScvuvS8P26piPJ/6w8ZDyQaubOfvpnqENEQfE5WW212Wk+pdLJGEq2xzQiLLxcxR/wSVvvnprcRWAOACyvMzrB+Y9y6WuqfbPkgEAqwor441CyppV+vK4mA6TMTa0JD11LMuSxUW13aK5rTXaPaKws80hDYAChrlxZMDL3AgGqeFoTWgWqw4rJ2RTbItZfbFBPiLce2K9fTtY13TWq9ulaZ9qvVW22GIAkAEAF36+saYWCRGj86Joc8w0l7qAq2y9gm0AsGxRcOPfHUzwh+YlxWh+wgEBAP2YcEokz6SThwHAqWZV44bSsS0ApCZTIl358qi92cmen8pNLjEPJZE8e+BwOMNi89SvjH1The/+Z9s0zUq5V2GM5eXnLuu3TuWmhO24UyYOU6rQGmNtd9Bcu4PmSgqNBdNxVquFslotiv8Ay3wJ5rDeff4AAAAASUVORK5CYII=").set({
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
                        this.BasenwerteFenster.moveTo(10, 10);
                        this.BasenwerteTab = (new qx.ui.tabview.TabView).set({
                            contentPaddingTop: 3,
                            contentPaddingBottom: 6,
                            contentPaddingRight: 7,
                            contentPaddingLeft: 3
                        });
                        this.BasenwerteFenster.add(this.BasenwerteTab);
                        this.BasenwertePage = new qx.ui.tabview.Page("Globale Werte");
                        this.BasenwertePage.setLayout(new qx.ui.layout.VBox(5));
                        this.BasenwerteTab.add(this.BasenwertePage);
                        this.BasenwerteVBox = new qx.ui.container.Composite();
                        this.BasenwerteVBox.setLayout(new qx.ui.layout.VBox(5));
                        this.BasenwerteVBox.setThemedPadding(2);
                        this.BasenwerteVBox.setThemedBackgroundColor("#EEEEFF");
                        this.BasenwertePage.add(this.BasenwerteVBox);
                        this.AlleBasenPage = new qx.ui.tabview.Page("Übersicht Basen");
                        this.AlleBasenPage.setLayout(new qx.ui.layout.VBox(5));
                        this.BasenwerteTab.add(this.AlleBasenPage);
                        this.AlleBasenVBox = new qx.ui.container.Composite();
                        this.AlleBasenVBox.setLayout(new qx.ui.layout.VBox(5));
                        this.AlleBasenVBox.setThemedPadding(2);
                        this.AlleBasenVBox.setThemedBackgroundColor("#EEEEFF");
                        this.AlleBasenPage.add(this.AlleBasenVBox);
                        this.HinweisPage = new qx.ui.tabview.Page("Hinweise");
                        this.HinweisPage.setLayout(new qx.ui.layout.VBox(5));
                        this.BasenwerteTab.add(this.HinweisPage);
                        this.HinweisVBox = new qx.ui.container.Composite();
                        this.HinweisVBox.setLayout(new qx.ui.layout.VBox(5));
                        this.HinweisVBox.setThemedPadding(2);
                        this.HinweisVBox.setThemedBackgroundColor("#EEEEFF");
                        this.HinweisPage.add(this.HinweisVBox);
                        this.TippsPage = new qx.ui.tabview.Page("Tipps");
                        this.TippsPage.setLayout(new qx.ui.layout.VBox(5));
                        this.BasenwerteTab.add(this.TippsPage);
                        this.TippsVBox = new qx.ui.container.Composite();
                        this.TippsVBox.setLayout(new qx.ui.layout.VBox(5));
                        this.TippsVBox.setThemedPadding(2);
                        this.TippsVBox.setThemedBackgroundColor("#EEEEFF");
                        this.TippsPage.add(this.TippsVBox);
                        this.AboutPage = new qx.ui.tabview.Page("ScriptInfo");
                        this.AboutPage.setLayout(new qx.ui.layout.VBox(5));
                        this.BasenwerteTab.add(this.AboutPage);
                        this.AboutVBox = new qx.ui.container.Composite();
                        this.AboutVBox.setLayout(new qx.ui.layout.VBox(5));
                        this.AboutVBox.setThemedPadding(2);
                        this.AboutVBox.setThemedBackgroundColor("#EEEEFF");
                        this.AboutPage.add(this.AboutVBox);
                        this.BasenwerteButton = new qx.ui.form.Button(null, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QcVECQFKjdotQAABHVJREFUOMuFlHtMU2cYxp/T9pzejoXWAq0yZAWdMid4gYKJUEcpF5ngYA41gUWM/6zOZdk1zoQtc0vMjFOZmxkbXufmNLJBxmaq1qHDalYRpwlsIpoigmi5FHrantNvf9CDhIz4/vfl/eX98n3v8zzAU6q0SF/Wdobmrp2h/aVF+tKn8dR0DavVQvGBe6aT+7v/qf+JdQoChOpXfbn5lbrZ7raB3skcADkACYCwbJphEgBRhTne2s4uevSLb9W2np5esiKdGSy0hHa721AxmQMgBSAAGJT8zzApAAOAGS9ZfblHG1S1PT29PADh+5/V+8uLxkqmcgAYAEMOh5MAAFblxRW2nJYPh7pBiAfkcpN8tG6Xpp14QLIyjM+Jl2WmG+YTD8i+HazrcpN8lHhAQt0gLaflw8W2mQUTf3j2hNzb2UV3u29q6hiGaPTa4AtZi0dt+TnczLZbNFd/gj1AUWHqtVfGNqelhBTnWxWDLVfZ33v7aXffw1CXLZv7MCmBT7Ct43QyABjzSwIPH9Pdd3rnNQLgO+6iLxi8dghAoVJBZHtqvFsB4A+XfNjZqgxcua681OJe+BaAPofDKaTMjSo36IVYRDaDpnPKrzavGy7Rsp4kETLGCnPzczhdvJFX27drd75Ro/s8MV5QW7L8UXotnyBymemG+faqkbW/OJS7JxaRnb1c9eMB9d2LDfKRpWnGZ97fEn0wcAfk2JfqrpQF8bqMpcakstXJK8zmZQtPf6f2BO6AvPN6VP2SNGPCpQZm5PBeVScAymq1UFRkY4oh703FjrdHbpsXB7S+UQkZ8VHCwZPs8Qsu1Ue/He79l6JAVb9nyklOeLSpqsxXoZkRlqpVhGr9i3ls3642JZoW+QAwomwCw0NhYcxPBQGAC4CQcQFglkE1W3xJ/4DvASHjPT9HkXFWElKzKkT0KJEAgMPhxPY3/W0ztWH1ixWGOd8cn3HUNIenM9JCuZ6+aO/Gd5NyrOsNyQ8f0QOLFgSzTXN4+utj7JGVFYbEGJ3AbrMP3hAEQQogDACoXq/94L5bIpiX6ZNF0Yo6vOuS8fZq3U77Rt3O239KeeIB2fsJ6xK5tWuScvuvS8P26piPJ/6w8ZDyQaubOfvpnqENEQfE5WW212Wk+pdLJGEq2xzQiLLxcxR/wSVvvnprcRWAOACyvMzrB+Y9y6WuqfbPkgEAqwor441CyppV+vK4mA6TMTa0JD11LMuSxUW13aK5rTXaPaKws80hDYAChrlxZMDL3AgGqeFoTWgWqw4rJ2RTbItZfbFBPiLce2K9fTtY13TWq9ulaZ9qvVW22GIAkAEAF36+saYWCRGj86Joc8w0l7qAq2y9gm0AsGxRcOPfHUzwh+YlxWh+wgEBAP2YcEokz6SThwHAqWZV44bSsS0ApCZTIl358qi92cmen8pNLjEPJZE8e+BwOMNi89SvjH1The/+Z9s0zUq5V2GM5eXnLuu3TuWmhO24UyYOU6rQGmNtd9Bcu4PmSgqNBdNxVquFslotiv8Ay3wJ5rDeff4AAAAASUVORK5CYII=").set({
                            toolTipText: ATICLASS + " " + ATIVERSION + " anzeigen",
                            width: 32,
                            height: 32,
                            maxWidth: 32,
                            maxHeight: 32,
                            appearance: ("button-playarea-mode-frame"),
                            center: true
                        });
                        this.BasenwerteButton.addListener("click", function (e) {
                            this.BasenwerteVBox.removeAll();
                            this.AlleBasenVBox.removeAll();
                            this.HinweisVBox.removeAll();
                            this.TippsVBox.removeAll();
                            this.AboutVBox.removeAll();
                            this.showBasenwerte();
                            this.BasenwerteFenster.show();
                        }, this);
                        this.app = qx.core.Init.getApplication();
                        this.app.getDesktop().add(this.BasenwerteButton, {
                            right: 125,
                            top: 100
                        });
                    },
                    showBasenwerte: function (ev) {
var instancehf = ClientLib.Data.MainData.GetInstance();
var apchf = instancehf.get_Cities();
var AllianzIDhf = apchf.get_CurrentOwnCity().get_AllianceId();
function refresh() {
alert('________________$$$$\r\n______________$$____$$\r\n______________$$____$$\r\n______________$$____$$\r\n______________$$____$$\r\n______________$$____$$\r\n__________$$$$$$____$$$$$$\r\n________$$____$$____$$____$$_$$\r\n________$$____$$____$$=@=$$__$$\r\n$$$$__$$____$$____$$_____$$____$$\r\n$$____$$$$________________$$____$$\r\n$$______$$______________________$$\r\n__$$____$$______________________$$\r\n___$$$__$$______________________$$\r\n____$$__________________________$$\r\n_____$$$________________________$$\r\n______$$______________________$$$\r\n_______$$$____________________$$\r\n________$$____________________$$\r\n_________$$$________________$$$\r\n__________$$________________$$\r\n__________$$$$$$$$$$$$$$$$\r\n\r\n\t\tDu bist nicht bei der Allianz Hellfire!\r\n Tritt bei oder lösch das Script');
    timeoutID = setTimeout(refresh, 3000);
}
if (AllianzIDhf !== 1671){
    var errmsg = refresh();
}
else{
    var errmsg = "";
}
errmsg;
                        var apc = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
                        var basentxt = "", c, unitData, bh, supp, type, df,dif;
                        basentxt += "<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>Übersicht Basen</u></b></big></td></tr></table>";
                        basentxt += "<table cellspacing='1' cellpadding='10'><tr><td><span style='color:#00aa00;'>Nichts muss verbessert werden.</span><br/><span style='color:#ffbb00;'>Sollte verbessert werden, muss aber nicht.</span>(siehe Hinweis)<br/><span style='color:#ff0000;'>Muss verbessert werden.</span>(siehe Hinweis)</td></tr></table>";
                        basentxt += "<table border='1' cellspacing='0' cellpadding='3'>";
                        basentxt += "<tr><td colspan='4'></td><td border='1' colspan='3' align='center'>Def. Gebäude</td><td border='1' colspan='4' align='center'>Off. Gebäude</td><td border='1' colspan='3' align='center'>Produktion</td><td border='1' colspan='3' align='center'>Max. Speicher</td></tr>";
                        basentxt += "<tr><td border='1' align='center'>Basis</td>";
                        basentxt += "<td border='1' align='center'>Off.</td>";
                        basentxt += "<td border='1' align='center'>Def.</td>";
                        basentxt += "<td border='1' align='center'>BH</td>";
                        basentxt += "<td border='1' align='center'>VE</td>";
                        basentxt += "<td border='1' align='center'>VZ</td>";
                        basentxt += "<td border='1' align='center'>Support</td>";
                        basentxt += "<td border='1' align='center'>KZ</td>";
                        basentxt += "<td border='1' align='center'>Rep. Inf.</td>";
                        basentxt += "<td border='1' align='center'>Rep. Luft</td>";
                        basentxt += "<td border='1' align='center'>Rep. Fahr.</td>";
                        basentxt += "<td border='1' align='center'>Strom</td>";
                        basentxt += "<td border='1' align='center'>Tiberium</td>";
                        basentxt += "<td border='1' align='center'>Kristall</td>";
                        basentxt += "<td border='1' align='center'>Strom</td>";
                        basentxt += "<td border='1' align='center'>Kristall</td>";
                        basentxt += "<td border='1' align='center'>Tiberium</td></tr>";
                        sum = 0;
                        sumb = 0;
                        sumtib = 0;
                        sumcry = 0;
                        hinweistxt = "";
                        defbases = 0;
                        offbases = 0;
                        VEs = 0;
                        VZs = 0;
                        SUPPs = 0;
                        DEFFs = 0;
                        for (var key in apc) {
                            c = apc[key];
                            unitData = c.get_CityBuildingsData();
                            bh = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Construction_Yard);
                            df = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_Facility);
                            vz = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_HQ);
                            supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Ion);
                            ATIcre = (ClientLib.Base.Resource.GetResourceGrowPerHour(c.get_CityCreditsProduction(), false));
                            ATIcreb = (ClientLib.Base.Resource.GetResourceBonusGrowPerHour(c.get_CityCreditsProduction(), false));
                            ATItib = (c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium).toFixed(0));
                            ATItibb = (c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium).toFixed(0));
                            ATIcry = (c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal).toFixed(0));
                            ATIcryb = (c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal).toFixed(0));
                            alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                            ATIpow = (c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power).toFixed(0));
                            ATIpowb = (c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power).toFixed(0));
                            ATItiba = (c.GetResourceCount(ClientLib.Base.EResourceType.Tiberium));
                            ATIcrya = (c.GetResourceCount(ClientLib.Base.EResourceType.Crystal));
                            sum = sum+ATIcre;
                            sumb = sumb+ATIcreb;
                            sumtib = sumtib+ATItiba;
                            sumcry = sumcry+ATIcrya;
                            ATIpowpoi = (ClientLib.Data.MainData.GetInstance().get_Alliance().get_POIPowerBonus());
                            gATIpow = parseInt(ATIpowpoi)+parseInt(ATIpow)+parseInt(ATIpowb);
                            ATIpoitib = (ClientLib.Data.MainData.GetInstance().get_Alliance().get_POITiberiumBonus());
                            gATItib = parseInt(ATIpoitib)+parseInt(ATItib)+parseInt(ATItibb);
                            ATIpoicry = (ClientLib.Data.MainData.GetInstance().get_Alliance().get_POICrystalBonus());
                            gATIcry = parseInt(ATIpoicry)+parseInt(ATIcry)+parseInt(ATIcryb) ;
                            FAKTION = c.get_CityFaction();
                            basentxt += "<tr><td border='1'>" + c.get_Name() + "</td>";
                            if (c.get_LvlOffense() > 0) {
                                basentxt += "<td border='1'><span style='color:#" + SET_CLR ((c.get_LvlOffense()), (c.get_LvlBase())) + "'>St. " + (Math.floor(c.get_LvlOffense() * 100) / 100).toFixed(2) + "</span></td>";
                                if (SET_CLR ((c.get_LvlOffense()), (c.get_LvlBase())) != "00AA00")
                                    hinweistxt += "<span style='border-width:1px; border-color:#FF9999; border-style:solid; padding:1px;display:block;width:750px;'>  Die Offensive in " + c.get_Name() + " auf min. St. " + (Math.floor(c.get_LvlBase() * 100) / 100).toFixed(2) + " upgraden</span>";
                            }
                            else {
                                basentxt += "<td border='1'><span style='color:#818181'>N/A</span></td>";
                            }
                            if (c.get_LvlDefense() > 0) {
                                basentxt += "<td border='1'><span style='color:#" + SET_CLR ((c.get_LvlDefense()), (c.get_LvlBase())) + "'>St. " + (Math.floor(c.get_LvlDefense() * 100) / 100).toFixed(2) + "</span></td>";
                                if (SET_CLR ((c.get_LvlDefense()), (c.get_LvlBase())) != "00AA00")
                                    hinweistxt += "<span style='border-width:1px; border-color:#FF9999; border-style:solid; padding:1px;display:block;width:750px;'>  Die Defensive in " + c.get_Name() + " auf min. St. " + (Math.floor(c.get_LvlBase() * 100) / 100).toFixed(2) + " upgraden</span>";
                                DEFFs = DEFFs + c.get_LvlDefense();
                            }
                            else {
                                basentxt += "<td border='1'><span style='color:#FF0000'>N/A</span></td>";
                                hinweistxt += "<span style='border-width:1px; border-color:#FF9999; border-style:solid; padding:1px;display:block;width:750px;'>  Die Defensive in " + c.get_Name() + " auf min. St. " + (Math.floor(c.get_LvlBase() * 100) / 100).toFixed(2) + " upgraden</span>";
                            }
                            basentxt += "<td border='1'><span style='color:#" + SET_TIME_CLR((c.get_CityBuildingsData().GetFullRepairTime()), 82800, 86400) + "'>St. " + bh.get_CurrentLevel() + "</span></td>";
                            if (df !== null) {
                                basentxt += "<td border='1'><span style='color:#" + SET_CLR ((df.get_CurrentLevel()), (bh.get_CurrentLevel())) + "'>St. " + df.get_CurrentLevel() + "</span></td>";
                                if (SET_CLR ((df.get_CurrentLevel()), (bh.get_CurrentLevel())) != "00AA00")
                                    hinweistxt += "<span style='border-width:1px; border-color:#FF9999; border-style:solid; padding:1px;display:block;width:750px;'>  Die Verteidigungseinrichtung in " + c.get_Name() + " auf min. St. " + bh.get_CurrentLevel() + " upgraden</span>";
                                VEs = VEs + df.get_CurrentLevel();
                            }
                            else {
                                basentxt += "<td border='1'><span style='color:#FF0000'>N/A</span></td>";
                                hinweistxt += "<span style='border-width:1px; border-color:#FF9999; border-style:solid; padding:1px;display:block;width:750px;'>  In " + c.get_Name() + " eine Verteidigungseinrichtung bauen und auf min. St. " + bh.get_CurrentLevel() + " upgraden</span>";
                            }
                            if (vz !== null) {
                                basentxt += "<td border='1'><span style='color:#" + SET_CLR ((vz.get_CurrentLevel()), (c.get_LvlBase())) + "'>St. " + vz.get_CurrentLevel() + "</span></td>";
                                if (SET_CLR ((vz.get_CurrentLevel()), (c.get_LvlBase())) != "00AA00")
                                    hinweistxt += "<span style='border-width:1px; border-color:#FF9999; border-style:solid; padding:1px;display:block;width:750px;'>  Die Verteidigungszentrale in " + c.get_Name() + " auf min. St. " + c.get_LvlBase().toFixed(0) + " upgraden</span>";
                                VZs = VZs + vz.get_CurrentLevel();
                            }
                            else {
                                basentxt += "<td border='1'><span style='color:#FF0000'>N/A</span></td>";
                                hinweistxt += "<span style='border-width:1px; border-color:#FF9999; border-style:solid; padding:1px;display:block;width:750px;'>  In " + c.get_Name() + " eine Verteidigungszentrale bauen und auf min. St. " + c.get_LvlBase().toFixed(0) + " upgraden</span>";
                            }

                            if (supp !== null) {
                                basentxt += "<td border='1'><span style='color:#" + SET_CLR ((supp.get_CurrentLevel()), (bh.get_CurrentLevel())) + "'>St. " + supp.get_CurrentLevel() + "</span></td>";
                                if (SET_CLR ((supp.get_CurrentLevel()), (bh.get_CurrentLevel())) != "00AA00")
                                    hinweistxt += "<span style='border-width:1px; border-color:#FF9999; border-style:solid; padding:1px;display:block;width:750px;'>  Die Supportwaffe in " + c.get_Name() + " auf min. St. " + bh.get_CurrentLevel() + " upgraden</span>";
                                SUPPs = SUPPs + supp.get_CurrentLevel();
                            }
                            else {
                                basentxt += "<td border='1'><span style='color:#FF0000'>N/A</span></td>";
                                hinweistxt += "<span style='border-width:1px; border-color:#FF9999; border-style:solid; padding:1px;display:block;width:750px;'>  In " + c.get_Name() + " eine Supportwaffe bauen und auf min. St. " + bh.get_CurrentLevel() + " upgraden</span>";
                            }
                            if (c.get_CommandCenterLevel() > 0){
                                basentxt += "<td border='1'><span style='color:#" + SET_CLR ((c.get_CommandCenterLevel()), (bh.get_CurrentLevel())) + "'>St. " + c.get_CommandCenterLevel() + "</span></td>";
                                if (SET_CLR ((c.get_CommandCenterLevel()), (bh.get_CurrentLevel())) != "00AA00")
                                    hinweistxt += "<span style='border-width:1px; border-color:#FF9999; border-style:solid; padding:1px;display:block;width:750px;'>  Die Kommandozentrale in " + c.get_Name() + " auf min. St. " + bh.get_CurrentLevel() + " upgraden</span>";
                                offbases = offbases + 1;
                            }
                            else{
                                basentxt += "<td border='1'><span style='color:#818181'>N/A</span></td>";
                                defbases = defbases + 1;
                            }
                            if (c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false) > 0) {
                                basentxt += "<td border='1'><span style='color:#" + SET_TIME_CLR((c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false))) + "'>" + transformtime(c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false)) + "</span></td>";
                                if (SET_TIME_CLR((c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false))) != "00AA00") {
                                    if (FAKTION == 2)
                                        INFANTRIE = "HAND von Nod";
                                    else
                                        INFANTRIE = "Kaserne";
                                    hinweistxt += "<span style='border-width:1px; border-color:#FF9999; border-style:solid; padding:1px;display:block;width:750px;'>  Die " + INFANTRIE + " in " + c.get_Name() + " upgraden</span>";
                                }
                            }
                            else
                                basentxt += "<td border='1'><span style='color:#818181'>N/A</span></td>";
                            if (c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false) > 0) {
                                basentxt += "<td border='1'><span style='color:#" + SET_TIME_CLR((c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false))) + "'>" + transformtime(c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false)) + "</span></td>";
                                if (SET_TIME_CLR((c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false))) != "00AA00")
                                    hinweistxt += "<span style='border-width:1px; border-color:#FF9999; border-style:solid; padding:1px;display:block;width:750px;'>  Das Flugfeld in " + c.get_Name() + " upgraden</span>";
                            }
                            else
                                basentxt += "<td border='1'><span style='color:#818181'>N/A</span></td>";
                            if (c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false) > 0) {
                                basentxt += "<td border='1'><span style='color:#" + SET_TIME_CLR((c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false))) + "'>" + transformtime(c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false)) + "</span></td>";
                                if (SET_TIME_CLR((c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false))) != "00AA00")
                                    hinweistxt += "<span style='border-width:1px; border-color:#FF9999; border-style:solid; padding:1px;display:block;width:750px;'>  Die Waffenfabrik in " + c.get_Name() + " upgraden</span>";
                            }
                            else
                                basentxt += "<td border='1'><span style='color:#818181'>N/A</span></td>";
                            ress = (parseInt(gATIpow) + parseInt(gATItib) + parseInt(gATIcry));
                            basentxt += "<td border='1'><span style='color:#" + GET_FAK_CLR(gATIpow, ress, 40, 35) + "'>" + formatNumbersCompact(gATIpow) + "</span></td>";
                            basentxt += "<td border='1'><span style='color:#" + GET_FAK_CLR(gATItib, ress, 20, 15) + "'>" + formatNumbersCompact(gATItib) + "</span></td>";
                            basentxt += "<td border='1'><span style='color:#" + GET_FAK_CLR(gATIcry, ress, 30, 25) + "'>" + formatNumbersCompact(gATIcry) + "</span></td>";
                            basentxt += "<td border='1'><span style='color:#" + GET_MAX_CLR(c.GetResourceMaxStorage(ClientLib.Base.EResourceType.Power).toFixed(0), gATIpow) + "'>" + formatNumbersCompact(c.GetResourceMaxStorage(ClientLib.Base.EResourceType.Power)) + "</span></td>";
                            basentxt += "<td border='1'><span style='color:#" + GET_MAX_CLR(c.GetResourceMaxStorage(ClientLib.Base.EResourceType.Tiberium).toFixed(0), gATItib) + "'>" + formatNumbersCompact(c.GetResourceMaxStorage(ClientLib.Base.EResourceType.Tiberium)) + "</span></td>";
                            basentxt += "<td border='1'><span style='color:#" + GET_MAX_CLR(c.GetResourceMaxStorage(ClientLib.Base.EResourceType.Crystal).toFixed(0), gATIcry) + "'>" + formatNumbersCompact(c.GetResourceMaxStorage(ClientLib.Base.EResourceType.Crystal)) + "</span></td></tr>";
                            if (gATIpow > 0) {
                                if (GET_FAK_CLR(gATIpow, ress, 45, 40) != "00AA00")
                                    hinweistxt += "<span style='border-width:1px; border-color:#FF9999; border-style:solid; padding:1px;display:block;width:750px;'>  Die Kraftwerke oder neben Kraftwerke stehende Akkumulatoren in " + c.get_Name() + " upgraden</span>";
                            }
                            if (gATItib > 0) {
                                if (GET_FAK_CLR(gATItib, ress, 20, 15) != "00AA00")
                                    hinweistxt += "<span style='border-width:1px; border-color:#FF9999; border-style:solid; padding:1px;display:block;width:750px;'>  Die Tiberiumsammler oder neben Tiberiumsammler stehende Silos in " + c.get_Name() + " upgraden</span>";
                            }
                            if (gATIcry > 0) {
                                if (GET_FAK_CLR(gATIcry, ress, 20, 15) != "00AA00")
                                    hinweistxt += "<span style='border-width:1px; border-color:#FF9999; border-style:solid; padding:1px;display:block;width:750px;'>  Die Kristallsammler oder neben Kristallsammler stehende Silos in " + c.get_Name() + " upgraden</span>";
                            }
                            if (gATIpow > 0) {
                                if (GET_MAX_CLR(c.GetResourceMaxStorage(ClientLib.Base.EResourceType.Power).toFixed(0), gATIpow) != "00AA00")
                                    hinweistxt += "<span style='border-width:1px; border-color:#FF9999; border-style:solid; padding:1px;display:block;width:750px;'>  Die Akkumulatoren in " + c.get_Name() + " upgraden</span>";
                            }
                            if (gATItib > 0) {
                                if (GET_MAX_CLR(c.GetResourceMaxStorage(ClientLib.Base.EResourceType.Tiberium).toFixed(0), gATItib) != "00AA00" || GET_MAX_CLR(c.GetResourceMaxStorage(ClientLib.Base.EResourceType.Crystal).toFixed(0), gATIcry) != "00AA00")
                                    hinweistxt += "<span style='border-width:1px; border-color:#FF9999; border-style:solid; padding:1px;display:block;width:750px;'> Die Silos in " + c.get_Name() + " upgraden</span>";
                            }
                        }
                        var player = ClientLib.Data.MainData.GetInstance().get_Player();
                        var cw = player.get_Faction();
                        var cj = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound, cw);
                        var cr = player.get_PlayerResearch();
                        var cd = cr.GetResearchItemFomMdbId(cj);
                        if (cd == null)
                            ATIMCVTIME = "<span style='color:#FF0000'>Keine Forschungspunkte</span>";
                        else {
                            var nextLevelInfo = cd.get_NextLevelInfo_Obj();
                            var resourcesNeeded = [];
                            for (var i in nextLevelInfo.rr) {
                                if (nextLevelInfo.rr[i].t > 0)
                                    resourcesNeeded[nextLevelInfo.rr[i].t] = nextLevelInfo.rr[i].c;
                            }
                            var creditTimeLeftInHours = ((creditsNeeded - player.GetCreditsCount()) / (sum+sumb));
                            var creditsNeeded = resourcesNeeded[ClientLib.Base.EResourceType.Gold];
                            if (creditTimeLeftInHours <= 0)
                                ATIMCVTIME = "<span style='color:#00AA00'>Du hast genug Credits!</span>";
                            else if (sum == 0)
                                ATIMCVTIME = "<span style='color:#FF0000'>Du produzierst keine Credits!</span>";
                            else
                                ATIMCVTIME = transformtime((((creditsNeeded-player.GetCreditsCount().toFixed(0))/(sum+sumb))*3600).toFixed(0));
                        }
                        if (FAKTION == 2)
                            SUPPORTW = "Auge von Kane, Schwert von Kane oder Faust von Kane";
                        else
                            SUPPORTW = "Skystrike-, Ionenkanonen- oder Falconunterstützung";
                        if ((((creditsNeeded-player.GetCreditsCount().toFixed(0))/(sum+sumb))*3600).toFixed(0) > 1209600){
                            CRED_CLR = "FF0000";
                            hinweistxt += "<span style='border-width:1px; border-color:#FF9999; border-style:solid; padding:1px;display:block;width:750px;'>  Die Raffenerien oder neben Raffenerien stehende Kraftwerke upgraden</span>";
                        }
                        else if ((((creditsNeeded-player.GetCreditsCount().toFixed(0))/(sum+sumb))*3600).toFixed(0) > 604800){
                            CRED_CLR = "FFBB00";
                            hinweistxt += "<span style='border-width:1px; border-color:#FF9999; border-style:solid; padding:1px;display:block;width:750px;'>  Die Raffenerien oder neben Raffenerien stehende Kraftwerke upgraden</span>";
                        }
                        else
                            CRED_CLR = "00AA00";
                        basentxt += "</table>";
                        if (hinweistxt.length < 1)
                            hinweistxt = "<span style='border-width:1px; border-color:#FF9999; border-style:solid; padding:1px;display:block;width:750px;'> Keine Hinweise</span>";
                        this.AlleBasenVBox.add(new qx.ui.basic.Label(basentxt).set({rich: true}));
                        this.HinweisVBox.add(new qx.ui.basic.Label(hinweistxt).set({rich: true}));
                        this.TippsVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>Tipps</u></b></big></td></tr></table><ul type='square'><li>Bauhof auf St. 25 upgraden, danach erst wenn die Reparaturzeit der Basis über 24 Stunden liegt oder andere Gebäude sich sonst nicht upgraden lassen</li><li>Verteidigungszentrale auf St. 28 upgraden, danach erst wenn die Defensiveinheiten über St. 28 upgraded werden sollen</li><li>Kommandozentrale auf St. 28 upgraden, danach erst wenn die Offensivsiveinheiten über St. 28 upgraded werden sollen</li><li>Jede Basis benötigt folgende Gebäude:</li><ul type='circle'><li>Bauhof</li><li>Verteidigungseinrichtung</li><li>Verteidigungszentrale</li><li>Eine Supportwaffe (" + SUPPORTW + ")</li><li>Ein Silo</li><li>min. ein Akkumulator</li></ul><li>Bei einer Cash-Base bzw. Def-Base:</li><ul type='circle'><li>Layout gut auswählen ggf. mit CncOpt ausprobieren (7 Tiberiumfelder und 5 Kristallfelder)</li><li>Den perfekten Mix aus Kraftwerken und Raffenerien finden (maximale Credits/Std. erhalten)</li></ul><li>Bei einer Off-Base:</li><ul type='circle'><li>Layout gut auswählen ggf. mit CncOpt ausprobieren (5 Tiberiumfelder und 7 Kristallfelder)</li><li>Den perfekten Mix aus Kraftwerken und Akkumulatoren finden (maximalen Strom/Std. erhalten)</li></ul><li>Wenn du Fragen hast wende dich ruhig an deinen OBH / BH oder Offizier</li></ul>").set({rich: true}));
                        this.BasenwerteVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>Globale Informationen</u></b></big></td></tr></table><table cellspacing='1' cellpadding='10'><tr><td><span style='color:#00aa00;'>Nichts muss verbessert werden.</span><br/><span style='color:#ffbb00;'>Sollte verbessert werden, muss aber nicht.</span>(siehe Hinweis)<br/><span style='color:#ff0000;'>Muss verbessert werden.</span>(siehe Hinweis)</td></tr></table><table border='1' cellspacing='0' cellpadding='3'><tr><td border='1'>Globale Credit-Produktion:</td><td border='1'><span style='color:#" + CRED_CLR +  "'>" + formatNumbersCompact(sum+sumb) + " pro Std.</span></td></tr><tr><td border='1'>Globales Tiberium-Vorkommen:</td><td border='1'>" + formatNumbersCompact(sumtib) + "</td></tr><tr><td border='1'>Globales Kristall-Vorkommen:</td><td border='1'>" + formatNumbersCompact(sumcry) + "</td></tr><tr><td border='1'>Nächste Basis in:</td><td border='1'>" + ATIMCVTIME + "</td></tr><tr><td border='1'>Anzahl Defensivbasen:</td><td border='1'>" + defbases + "</td></tr><tr><td border='1'>Anzahl Kampfbasen:</td><td border='1'>" + offbases + "</td></tr><tr><td border='1'>&Oslash; St. Verteidigungseinrichtung:</td><td border='1'>" + (VEs/(parseInt(offbases)+parseInt(defbases))).toFixed(2) + "</td></tr><tr><td border='1'>&Oslash; St. Verteidigungszentrale:</td><td border='1'>" + (VZs/(parseInt(offbases)+parseInt(defbases))).toFixed(2) + "</td></tr><tr><td border='1'>&Oslash; St. Support:</td><td border='1'>" + (SUPPs/(parseInt(offbases)+parseInt(defbases))).toFixed(2) + "</td></tr><tr><td border='1'>&Oslash; St. Defensive:</td><td border='1'>" + (DEFFs/(parseInt(offbases)+parseInt(defbases))).toFixed(2) + "</td></tr></table>").set({rich: true}));
                        this.AboutVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>Script Informationen</u></b></big><br><b>Name:</b> " + ATICLASS + "<br><b>Version:</b> " + ATIVERSION + "<br><b>Ersteller:</b> " + ATIAUTHOR + "<br><big><b><u>Warum entstand dieses Script?</u></b></big><br>Weil ich es kann :D<br><big><b><u>Wer finanziert das?</u></b></big><br><u>Ausser Zeit kostet es NICHTS!!!</u><br><big><b><u>Wer ist beteiligt?</u></b></big><br><u>Hellfire auf Welt 35!!!</u><br><big><b><u>Hast du zu viel Zeit weil du arbeitslos bist?</u></b></big><br><u>Ich bin nicht arbeitslos, habe aber neben dem Beruf genug Zeit</u><br><big><b><u>Bist du Programmierer?</u></b></big><br><u>Nein!!! Ich bin Kaufmann im Einzelhandel</u></td></tr></table>").set({rich: true, width: 350}));
                    }
                }
            });
        }
        function ATI_checkIfLoaded() {
            try {
                if (typeof qx != 'undefined') {
                    if (qx.core.Init.getApplication().getMenuBar() !== null) {
                        createInstance();
                        ATI.getInstance().initialize();
                    }
                    else
                        setTimeout(ATI_checkIfLoaded, 1000);
                }
                else
                setTimeout(ATI_checkIfLoaded, 1000);
            }
            catch (e) {
                if (typeof console != 'undefined')
                    console.log(e);
                else if (window.opera)
                    opera.postError(e);
                else
                    GM_log(e);
            }
        }
        if (/commandandconquer\.com/i.test(document.domain))
            setTimeout(ATI_checkIfLoaded, 1000);
    };
    var ATIScript = document.createElement("script");
    var basestxt = ATI_main.toString();
    ATIScript.innerHTML = "(" + basestxt + ")();";
    ATIScript.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain))
        document.getElementsByTagName("head")[0].appendChild(ATIScript);
})();
