// ==UserScript==
// @name           2minmanXtended
// @namespace      http://userscripts.org/users/aaki
// @version        0.1.13 (Testphase)
// @description    Extended teamview and other tweaks for 2minman.com.
// @include        http://*.2minman.com/select.php?select=*
// @include        http://2minman.com/select.php?select=*
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
// @require        http://code.jquery.com/jquery-1.8.0.min.js
// @require        https://raw.github.com/ericmmartin/simplemodal/master/src/jquery.simplemodal.js
// @run-at         document-end
// @copyright      2012+, Achim Sperling (achim.sperling@gmail.com)
// @maintainer     Since incl. v. 0.1.13: Sebastian Pohl (info@it-service.sebastian-pohl-berlin.de)
// @licence        Creative Commons BY 3.0
// ==/UserScript==

var _this = this,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

(function() {
  var $helpLink, $mainMenu, Constants, Helper, StrongnessOverview, Teammate, TeammateList, XtendTeam, baseUrl, css, heads, helpContent, node, type, uicss, xTend, xtMenuContainer, _ref;
  Constants = (function() {

    function Constants() {}

    Constants.ashuerden = [0, 0, 0, 0, 0, 5.0, 5.0, 4.0, 1.0, 0, 100];

    Constants.spielerBewertung = ["katastrophal", "katastrophal", "katastrophal", "katastrophal", "sehr-schwach", "sehr-schwach", "sehr-schwach", "sehr-schwach", "schwach", "schwach", "maessig", "maessig", "maessig", "maessig", "durchschnittlich", "durchschnittlich", "durchschnittlich", "durchschnittlich", "durchschnittlich", "durchschnittlich", "okay", "okay", "okay", "okay", "okay", "okay", "okay", "gut", "gut", "gut", "gut", "gut", "gut", "gut", "sehr-gut", "sehr-gut", "sehr-gut", "sehr-gut", "sehr-gut", "sehr-gut", "herausragend", "herausragend", "herausragend", "herausragend", "herausragend", "herausragend", "herausragend", "herausragend"];

    Constants.positions = {
      "T": "Tor",
      "A": "Abwehr",
      "M": "Mittelfeld",
      "S": "Sturm"
    };

    Constants.headerRow = '<tr class="xt-header-row"><th colspan="12">XXX</th></tr>';

    Constants.erfahrungGewinn = [0, 0.5875, 0.356025, 0.235, 0.1175, 0.0705, 0.047, 0.0235, 0.01175, 0.0005];

    Constants.erfahrungAlter = function(alter) {
      alter = parseInt(alter, 10);
      if (alter >= 30 || alter < 17) {
        return 0;
      }
      switch (alter) {
        case 17:
          return 0.2;
        case 18:
          return 0.4;
        case 19:
          return 0.6;
        case 20:
          return 0.8;
        case 28:
          return 0.75;
        case 29:
          return 0.5;
        default:
          return 1;
      }
    };

    Constants.maxStaerkeValues = {
      "Torwart": 40 * 1.2,
      "Abwehr": 200 * 1.2,
      "Mittelfeld": 200 * 1.2,
      "Sturm": 120 * 1.2,
      "Gesamt": 440 * 1.2,
      "Eingespieltheit": 100,
      "Moral": 50,
      "Taktiker": 440 * 1.2 * 0.05,
      "Taktgeber": 440 * 1.2 * 0.05
    };

    Constants.StaerkeRegExp = {
      "type": /([A-Z]{1}[a-z]+)[\:]?/,
      "Torwart": /([0-9]+(\.[0-9]+)?)\s\((\w.+)\)/,
      "Abwehr": /([0-9]+(\.[0-9]+)?)\s\((\w.+)\)/,
      "Mittelfeld": /([0-9]+(\.[0-9]+)?)\s\((\w.+)\)/,
      "Sturm": /([0-9]+(\.[0-9]+)?)\s\((\w.+)\)/,
      "Gesamt": /([0-9]+(\.[0-9]+)?)\s\((\w.+)\)/,
      "Eingespieltheit": /([0-9]+)(%)\s\((\w.+)\)/,
      "Moral": /\+ ([0-9]+(.[0-9]+)?)/,
      "Taktgeber": /\+ ([0-9]+(.[0-9]+)?)/,
      "Taktiker": /\+ ([0-9]+(.[0-9]+)?)/
    };

    Constants.helpContents = {
      trainingslager: {
        title: 'Trainingslager',
        content: '<table id="xt-help-trainingslager" class="xt-table xt-help">' + '<thead><tr><th>Ort</th><th>Energie</th><th>Form</th><th>Dauer</th></tr><thead>' + '<tbody><tr><td>Trier</td><td>+1</td><td>+1</td><td>2 Tage</td></tr>' + '<tr><td>Ohlsbach</td><td>+2</td><td>+1</td><td>3 Tage</td></tr>' + '<tr><td>Offenburg</td><td>+1</td><td>+2</td><td>3 Tage</td></tr>' + '<tr><td>Überlingen</td><td>+2</td><td>+2</td><td>4 Tage</td></tr>' + '<tr><td>Moskow</td><td>+3</td><td>+2</td><td>5 Tage</td></tr>' + '<tr><td>Roma</td><td>+2</td><td>+3</td><td>5 Tage</td></tr>' + '<tr><td>Mexiko</td><td>+3</td><td>+3</td><td>6 Tage</td></tr>' + '<tr><td>New-Zealand</td><td>+4</td><td>+4</td><td>6 Tage</td></tr></tbody>' + '</table>'
      },
      erfahrungszuwachs: {
        title: 'Erfahrungszuwachs',
        content: '<p>Ab 30 ist kein Stärkeaufstieg mehr möglich, ab 32 fällt die Spielstärke jedes Jahr um 1!</p>' + '<p>Wenn die Werte für Energie/Form unter 15/15 sind, gibt es keinen Erfahrungszuwachs.</p>' + '<table id="xt-help-erfahrungszuwachs" class="xt-table xt-help">' + '<thead><tr><th colspan="8">Erfahrungszuwachs nach Alter/Stärke</th></tr></thead>' + '<tbody>' + '<tr><th></th><th>17</th><th>18</th><th>19</th><th>20</th><th>21-27</th><th>28</th><th>29</th></tr>' + '<tr><td>1</td><td>0,1175%</td><td>0,2350%</td><td>0,3525%</td><td>0,4700%</td><td>0,5875%</td><td>0,4406%</td><td>0,3750%</td></tr>' + '<tr><td>2</td><td>0,0712%</td><td>0,1424%</td><td>0,2136%</td><td>0,2848%</td><td>0,3560%</td><td>0,2670%</td><td>0,1780%</td></tr>' + '<tr><td>3</td><td>0,0470%</td><td>0,0940%</td><td>0,1410%</td><td>0,1880%</td><td>0,2350%</td><td>0,1762%</td><td>0,1175%</td></tr>' + '<tr><td>4</td><td>0,0235%</td><td>0,0470%</td><td>0,0705%</td><td>0,0940%</td><td>0,1175%</td><td>0,0881%</td><td>0,0587%</td></tr>' + '<tr><td>5</td><td>0,0141%</td><td>0,0282%</td><td>0,0423%</td><td>0,0564%</td><td>0,0705%</td><td>0,0528%</td><td>0,0352%</td></tr>' + '<tr><td>6</td><td>0,0094%</td><td>0,0188%</td><td>0,0282%</td><td>0,0376%</td><td>0,0470%</td><td>0,0352%</td><td>0,0235%</td></tr>' + '<tr><td>7</td><td>0,0047%</td><td>0,0094%</td><td>0,0141%</td><td>0,0188%</td><td>0,0235%</td><td>0,0176%</td><td>0,0117%</td></tr>' + '<tr><td>8</td><td>0,0023%</td><td>0,0047%</td><td>0,0070%</td><td>0,0094%</td><td>0,0117%</td><td>0,0088%</td><td>0,0058%</td></tr>' + '<tr><td>9</td><td>0,0001%</td><td>0,0002%</td><td>0,0003%</td><td>0,0004%</td><td>0,0005%</td><td>0,0004%</td><td>0,0003%</td></tr>' + '</tbody>' + '</table>'
      },
      stadionausbau: {
        title: 'Stadionausbau',
        content: '<div style="width: 420px"><table id="xt-help-stadionausbau-a" class="xt-table xt-help" style="float: left; width: 200px; margin-right: 20px;">' + '<thead><tr><th>Dauer (Tage)</th><th>Anzahl Plätze</th></tr><thead>' + '<tbody><tr><td> 1</td><td>1    - 199  </td></tr>' + '<tr><td> 2</td><td>200  - 599  </td></tr>' + '<tr><td> 3</td><td>600  - 999  </td></tr>' + '<tr><td> 4</td><td>1000 - 1399 </td></tr>' + '<tr><td> 5</td><td>1400 - 1799 </td></tr>' + '<tr><td> 6</td><td>1800 - 2199 </td></tr>' + '<tr><td> 7</td><td>2200 - 2599 </td></tr>' + '<tr><td> 8</td><td>2600 - 2999 </td></tr>' + '<tr><td> 9</td><td>3000 - 3399 </td></tr>' + '<tr><td>10</td><td>3400 - 3799 </td></tr>' + '<tr><td>11</td><td>3800 - 4199 </td></tr>' + '<tr><td>12</td><td>4200 - 4599 </td></tr>' + '<tr><td>13</td><td>4600 - 4999 </td></tr>' + '</tbody></table>' + '<table id="xt-help-stadionausbau-b" class="xt-table xt-help" style="float: left; width: 200px;">' + '<thead><tr><th>Dauer (Tage)</th><th>Anzahl Plätze</th></tr><thead>' + '<tr><td>14</td><td>5000 - 5399 </td></tr>' + '<tr><td>15</td><td>5400 - 5799 </td></tr>' + '<tr><td>16</td><td>5800 - 6199 </td></tr>' + '<tr><td>17</td><td>6200 - 6599 </td></tr>' + '<tr><td>18</td><td>6600 - 6999 </td></tr>' + '<tr><td>19</td><td>7000 - 7399 </td></tr>' + '<tr><td>20</td><td>7400 - 7799 </td></tr>' + '<tr><td>21</td><td>7800 - 8199 </td></tr>' + '<tr><td>22</td><td>8200 - 8599 </td></tr>' + '<tr><td>23</td><td>8600 - 8999 </td></tr>' + '<tr><td>24</td><td>9000 - 9399 </td></tr>' + '<tr><td>25</td><td>9400 - 9799 </td></tr>' + '<tr><td>26</td><td>9800 - 10000</td></tr></tbody>' + '</table></div><div style="clear: left; heihgt: 1px;"></div>'
      },
      spielerbewertung: {
        title: 'Spielerbewertung',
        content: '<p>Die Spielerbewertung errechnet sich wie folgt:<br/>' + '<strong>Stärke * (Formpunkte + Energiepunkte) / 10</strong></p>' + '<p><strong>Beispiel:</strong> Ein 6er mit 15 Energiepunkten und 17 Formpunkten hat eine Bewertung von <strong>6*(15 + 17)/10 = 19,2</strong></p>' + '<p>Aus folgender Tabelle kann man nun ablesen, welche Bewertung der Spieler hat. Das gleiche ist natürlich auch umgekehrt möglich, d. h. dass man anhand der Bewertung ungefähr die Form- und Energiewerte des/der Spieler/s herausfinden kann.</p>' + '<table class="xt-table xt-help">' + '<thead><tr><th>Punkte</th><th>Bewertung</th></tr><thead>' + '<tbody><tr><td>03</td><td>katastrophal</td></tr>' + '<tr><td>07</td><td>sehr schwach</td></tr>' + '<tr><td>09</td><td>schwach</td></tr>' + '<tr><td>13</td><td>mäßig</td></tr>' + '<tr><td>19</td><td>durchschnittlich</td></tr>' + '<tr><td>26</td><td>okay</td></tr>' + '<tr><td>33</td><td>gut</td></tr>' + '<tr><td>37</td><td>sehr gut</td></tr>' + '<tr><td>41</td><td>hervorragend</td></tr>' + '<tr><td>50</td><td>Weltklasse</td></tr>' + '</tbody><table>'
      },
      spielbenotung: {
        title: 'Spielbenotung',
        content: '<table class="xt-table xt-help"><thead><tr><th></th><th colspan="9">Einsatzpunkte</th></tr>' + '<tr><th>Anzahl Tore</th><th>+4</th><th>+3</th><th>+2</th><th>+1</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><tr></thead>' + '<tbody><tr><td>0</td><td>2-</td><td>3+</td><td>3</td><td>3-</td><td>4+</td><td>4</td><td>5</td><td>5-</td><td>6</td>' + '<tr><td>1</td><td>2</td><td>2-</td><td>3+</td><td>3</td><td>3-</td><td>4+</td><td>4-</td><td>5</td><td>6+</td>' + '<tr><td>2</td><td>2+</td><td>2</td><td>2-</td><td>3+</td><td>3</td><td>3-</td><td>4</td><td>5+</td><td>5-</td>' + '<tr><td>3</td><td>1-</td><td>2+</td><td>2</td><td>2-</td><td>3+</td><td>3</td><td>4+</td><td>4-</td><td>5</td>' + '<tr><td>4</td><td>1</td><td>1-</td><td>2+</td><td>2</td><td>2-</td><td>3+</td><td>3-</td><td>4</td><td>5+</td>' + '<tr><td>5</td><td>1+</td><td>1-</td><td>1.5</td><td>2+</td><td>2-</td><td>2.5</td><td>3-</td><td>4+</td><td>4.5</td>' + '<tr><td>6+</td><td>1+</td><td>1</td><td>1-</td><td>2+</td><td>2</td><td>2-</td><td>3</td><td>4+</td><td>4-</td>'
      }
    };

    return Constants;

  })();
  Helper = (function() {

    function Helper() {}

    Helper.addTooltips = function(selector) {
      var elements;
      elements = $(selector);
      elements.mouseover(function(e) {
        var tip;
        tip = $(this).attr('title');
        $(this).attr('title', '');
        $(this).closest("td").append('<div id="xt-tooltip"><div class="xt-tooltip-inner">' + tip + '</div></div>');
        $('#xt-tooltip').css('top', e.pageY + 10);
        $('#xt-tooltip').css('left', e.pageX - 90);
        return $('#xt-tooltip').fadeIn('500');
      });
      elements.mousemove(function(e) {
        $('#xt-tooltip').css('top', e.pageY + 10);
        return $('#xt-tooltip').css('left', e.pageX - 90);
      });
      return elements.mouseout(function() {
        var thisTooltip;
        thisTooltip = $(this).closest("td").find('div#xt-tooltip');
        $(this).attr('title', thisTooltip.find('.xt-tooltip-inner').html());
        return thisTooltip.remove();
      });
    };

    Helper.addBarBg = function(dom, text, percentage, width) {
      var balken, container, height, wert;
      if (percentage > 1) {
        percentage = percentage / 100;
      }
      $(dom).addClass("xt-bar").html("");
      height = 26;
      if (!width) {
        width = $(dom).width();
      }
      container = document.createElement("div");
      $(container).addClass("xt-bar-container");
      balken = document.createElement("div");
      $(balken).addClass("xt-bar-balken");
      balken.style.width = (percentage * width) + "px";
      balken.style.height = height + "px";
      $(container).append(balken);
      wert = document.createElement("div");
      $(wert).addClass("xt-bar-wert");
      wert.style.width = width + "px";
      wert.style.height = height + "px";
      wert.style.lineHeight = height + "px";
      $(wert).append(text);
      $(container).append(wert);
      return $(dom).append(container);
    };

    Helper.round = function(n) {
      return Math.round(n * 100 + ((n * 1000) % 10 > 4 ? 1 : 0)) / 100;
    };

    return Helper;

  })();
  Teammate = (function() {

    function Teammate(dom) {
      var index, item, tds, _i, _len;
      this.dom = dom;
      _this.toString = __bind(_this.toString, this);

      _this.getEffektiveStaerke = __bind(_this.getEffektiveStaerke, this);

      _this.alterDom = __bind(_this.alterDom, this);

      _this.alterErfahrungTD = __bind(_this.alterErfahrungTD, this);

      _this.alterStatusTD = __bind(_this.alterStatusTD, this);

      _this.calcMinAnzahlTrainingBisAufstieg = __bind(_this.calcMinAnzahlTrainingBisAufstieg, this);

      tds = $(this.dom).find("td");
      for (index = _i = 0, _len = tds.length; _i < _len; index = ++_i) {
        item = tds[index];
        switch (index) {
          case 1:
            this.position = $(item).text().replace(/^\s+|\s+$/g, "");
            break;
          case 2:
            this.name = $(item).text().replace(/^\s+|\s+$/g, "");
            break;
          case 3:
            this.alter = parseInt($(item).text().replace(/^\s+|\s+$/g, ""), 10);
            break;
          case 4:
            this.staerke = parseInt($(item).text().replace(/^\s+|\s+$/g, ""), 10);
            break;
          case 5:
            this.energie = parseInt($(item).text().replace(/^\s+|\s+$/g, ""), 10);
            break;
          case 6:
            this.form = parseInt($(item).text().replace(/^\s+|\s+$/g, ""), 10);
            break;
          case 7:
            this.gk = parseInt($(item).text().replace(/^\s+|\s+$/g, ""), 10);
            Helper.addBarBg(item, this.gk, this.gk / 5, 25);
            break;
          case 8:
            this.erfahrung = parseFloat($(item).text().replace(/^\s+|\s+$/g, "").replace(/\(|\)|\%/g, ""));
            this.erfahrungTD = item;
            break;
          case 9:
            this.spiele = parseInt($(item).text().replace(/^\s+|\s+$/g, ""), 10);
            break;
          case 10:
            this.nation = $(item).text().replace(/^\s+|\s+$/g, "");
            break;
          case 11:
            this.status = $(item).text().replace(/^\s+|\s+$/g, "");
            this.statusTD = item;
        }
      }
      this.effStaerke = this.getEffektiveStaerke();
      this.alterStatusTD(this.statusTD);
      this.alterErfahrungTD(this.erfahrungTD);
      this.aufstiegsberechtigt = false;
      this.alterDom();
    }

    Teammate.isTeammate = function(dom) {
      return $(dom).find("td").length >= 12;
    };

    Teammate.prototype.calcMinAnzahlTrainingBisAufstieg = function() {
      if (this.erfahrung > Constants.ashuerden[this.staerke]) {
        return 0;
      }
      return Math.floor((Constants.ashuerden[this.staerke] - this.erfahrung) / (Constants.erfahrungAlter(this.alter) * Constants.erfahrungGewinn[this.staerke]));
    };

    Teammate.prototype.alterStatusTD = function(dom) {
      var alpha, maxStaerke;
      $(dom).addClass("status");
      if (this.status === "Ok.") {
        maxStaerke = 40;
        alpha = this.effStaerke >= maxStaerke ? 1 : Math.floor(this.effStaerke / maxStaerke * 100) / 100;
        dom.style.backgroundColor = "rgba(0,0,255," + alpha + ")";
        if (alpha > 0.6) {
          dom.style.color = "#eeeeee";
        }
        return $(dom).html(this.effStaerke);
      }
    };

    Teammate.prototype.alterErfahrungTD = function(dom) {
      var anzahl, container, div, title, width, widthMax;
      widthMax = 60;
      width = this.erfahrung >= Constants.ashuerden[this.staerke] ? widthMax : parseInt(this.erfahrung / Constants.ashuerden[this.staerke] * widthMax, 10);
      $(dom).addClass("erfahrung");
      if (width === widthMax) {
        $(dom).addClass("aufstieg");
      }
      if (this.alter >= 30) {
        $(dom).addClass("zu-alt");
      }
      width = width + "px";
      div = document.createElement("div");
      div.style.width = width;
      $(div).addClass("balken");
      $(dom).html("");
      container = document.createElement("div");
      $(container).addClass("container");
      $(container).append(div);
      if (this.alter > 29) {
        title = "Nie wieder aufstiegsberechtigt";
      } else if (this.erfahrung >= Constants.ashuerden[this.staerke]) {
        /* Beginn: Deactivated, spohl, 02.05.2014: */
        /*
        if (this.spiele >= 5) {
        */
        /* End: Deactivated, spohl, 02.05.2014. */
          this.aufstiegsberechtigt = true;
          title = "Aufstiegsberechtigt";
        /* Beginn: Deactivated, spohl, 02.05.2014: */  
        /*
        } else {
          title = "Aufstiegsberechtigt, aber noch nicht genügend Spiele in dieser Saison.";
        }
        */
        /* End: Deactivated, spohl, 02.05.2014. */
      } else {
        anzahl = this.calcMinAnzahlTrainingBisAufstieg();
      title = "Noch " + (anzahl === 0 ? "" : "mindestens") + " <strong>" + (anzahl > 0 ? anzahl : 1) + "</strong> Tag" + (anzahl > 0 ? "e" : "") + " (Training/Spiele) bis <strong>" + this.name + "</strong> aufstiegsberechtigt ist.<sup>1</sup>";
      }
      $(container).append('<div class="wert" title="' + title + '">' + this.erfahrung + '%</div>');
      return $(dom).append(container);
    };

    Teammate.prototype.alterDom = function() {
      var effStaerkeRounded, formClass;
      if (this.status.match(/Rot/g)) {
        $(this.dom).addClass("statrot");
      } else if (this.status.match(/Gelb/g)) {
        $(this.dom).addClass("statgelb");
      } else if (this.status.match(/Verl/g)) {
        $(this.dom).addClass("statverl");
      } else if (this.status.match(/TL/g)) {
        $(this.dom).addClass("stattl");
      }
      if (this.status.match(/Ok/g)) {
        $(this.dom).addClass("ok");
      } else {
        $(this.dom).addClass("verhindert");
      }
      formClass = 0;
      if (this.form >= 12 && this.energie >= 12) {
        formClass++;
        if (this.form >= 15 && this.energie >= 15) {
          formClass++;
          if (this.form >= 17 && this.energie >= 17) {
            formClass++;
            if (this.form >= 19 && this.energie >= 19) {
              formClass++;
            }
          }
        }
      }
      $(this.dom).addClass("form" + formClass);
      effStaerkeRounded = Math.ceil(this.effStaerke);
      $(this.dom).addClass(Constants.spielerBewertung[effStaerkeRounded]);
      return true;
    };

    Teammate.prototype.getEffektiveStaerke = function() {
      return Helper.round(this.staerke * (this.energie + this.form) / 10);
    };

    Teammate.prototype.toString = function() {
      return this.position + " | " + this.name + " | " + this.alter + " | " + this.staerke + " | " + this.energie + " | " + this.form + " | " + this.gk + " | " + this.erfahrung + " | " + this.spiele + " | " + this.nation + " | " + this.status;
    };

    return Teammate;

  })();
  TeammateList = (function() {

    function TeammateList() {
      _this.getStatisic = __bind(_this.getStatisic, this);

      _this.remove = __bind(_this.remove, this);

      _this.add = __bind(_this.add, this);

      var pos, _i, _len, _ref;
      this.list = [];
      this.total = {
        staerke: 0,
        effStaerke: 0,
        alter: 0,
        energie: 0,
        form: 0,
        count: 0,
        aufstieg: 0
      };
      _ref = ["T", "A", "M", "S"];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        pos = _ref[_i];
        this.total[pos] = {
          staerke: 0,
          effStaerke: 0,
          alter: 0,
          energie: 0,
          form: 0,
          count: 0,
          aufstieg: 0
        };
      }
      this.averages = jQuery.extend(true, {}, this.total);
    }

    TeammateList.prototype.add = function(teammate) {
      var effStaerke;
      this.list.push(teammate);
      this.total.staerke += teammate.staerke;
      this.total[teammate.position].staerke += teammate.staerke;
      effStaerke = teammate.getEffektiveStaerke();
      this.total.effStaerke += effStaerke;
      this.total[teammate.position].effStaerke += effStaerke;
      this.total.alter += teammate.alter;
      this.total[teammate.position].alter += teammate.alter;
      this.total.energie += teammate.energie;
      this.total[teammate.position].energie += teammate.energie;
      this.total.form += teammate.form;
      this.total[teammate.position].form += teammate.form;
      this.total.count++;
      this.total[teammate.position].count++;
      if (teammate.aufstiegsberechtigt === true) {
        this.total.aufstieg++;
        return this.total[teammate.position].aufstieg++;
      }
    };

    TeammateList.prototype.remove = function(teammate) {
      var index, item, _i, _len, _ref;
      _ref = this.list;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        item = _ref[index];
        if (teammate === item) {
          this.list.splice(index, 1);
          return true;
        }
      }
      return false;
    };

    TeammateList.prototype.getStatisic = function() {
      var pos, _i, _len, _ref;
      this.total.effStaerke = Helper.round(this.total.effStaerke);
      this.averages.staerke = Helper.round(this.total.staerke / this.list.length);
      this.averages.effStaerke = Helper.round(this.total.effStaerke / this.list.length);
      this.averages.alter = Helper.round(this.total.alter / this.list.length);
      this.averages.energie = Helper.round(this.total.energie / this.list.length);
      this.averages.form = Helper.round(this.total.form / this.list.length);
      _ref = ["T", "A", "M", "S"];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        pos = _ref[_i];
        this.total[pos].effStaerke = Helper.round(this.total[pos].effStaerke);
        this.averages[pos].staerke = Helper.round(this.total[pos].staerke / this.total[pos].count);
        this.averages[pos].effStaerke = Helper.round(this.total[pos].effStaerke / this.total[pos].count);
        this.averages[pos].alter = Helper.round(this.total[pos].alter / this.total[pos].count);
        this.averages[pos].energie = Helper.round(this.total[pos].energie / this.total[pos].count);
        this.averages[pos].form = Helper.round(this.total[pos].form / this.total[pos].count);
      }
      return {
        total: this.total,
        averages: this.averages,
        counts: this.counts
      };
    };

    return TeammateList;

  })();
  StrongnessOverview = (function() {

    function StrongnessOverview(dom) {
      var beschriftung, bewertung, counter, index, item, maxValue, percentage, tds, trs, typeTd, typeTxt, value, valueTd, _i, _len;
      this.dom = dom;
      trs = $(this.dom).find("tr");
      counter = 0;
      for (index = _i = 0, _len = trs.length; _i < _len; index = ++_i) {
        item = trs[index];
        tds = $(item).find("td");
        if (tds.length !== 2) {
          continue;
        }
        typeTd = tds[0];
        Constants.StaerkeRegExp["type"].exec($(typeTd).text());
        typeTxt = RegExp.$1;
        valueTd = tds[1];
        Constants.StaerkeRegExp[typeTxt].exec($(valueTd).text());
        value = RegExp.$1;
        bewertung = RegExp.$3;
        beschriftung = bewertung === "" ? "+ " : "";
        beschriftung += value;
        if (bewertung !== "") {
          beschriftung += (RegExp.S2 === "%" ? "% – " : " – ") + bewertung;
        }
        maxValue = Constants.maxStaerkeValues[typeTxt];
        percentage = parseInt(value / maxValue * 100, 10) / 100;
        if (percentage > 1) {
          percentage = 1;
        }
        valueTd.style.backgroundColor = typeTd.style.backgroundColor = "rgba(0,0,255," + percentage + ")";
        if (percentage > 0.3) {
          typeTd.style.color = valueTd.style.color = "#eeeeee";
        }
        Helper.addBarBg(valueTd, beschriftung, percentage);
      }
    }

    return StrongnessOverview;

  })();
  XtendTeam = (function() {

    function XtendTeam() {
      _this.buildStatistic = __bind(_this.buildStatistic, this);

      _this.buildLegend = __bind(_this.buildLegend, this);

      _this.buildTMList = __bind(_this.buildTMList, this);

      var $infoTables;
      this.teammates = new TeammateList();
      this.table = $(".content_main > form > table")[0];
      this.table.id = "teammates";
      $(this.table).addClass("teammates xt-table");
      this.rows = $(this.table).find("tr");
      this.buildTMList();
      this.buildLegend();
      Helper.addTooltips('.erfahrung .wert');
      $infoTables = $("#info_content table");
      if ($infoTables.length === 3) {
        this.strongnessTable = $infoTables[0];
      } else {
        this.strongnessTable = $infoTables[1];
      }
      $(this.strongnessTable).addClass("xt-table xt-table-strongness");
      this.strongnessOV = new StrongnessOverview(this.strongnessTable);
      this.buildStatistic();
    }

    XtendTeam.prototype.buildTMList = function() {
      var header, index, item, pos, tm, _i, _len, _ref;
      pos = "X";
      header = $(this.table).find("tr")[0];
      $(header).addClass("xt-spaltenbeschriftung");
      _ref = this.rows;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        item = _ref[index];
        if (index !== 0 && index !== this.rows.length - 1 && Teammate.isTeammate(item)) {
          tm = new Teammate(item);
          if (tm.position !== pos) {
            pos = tm.position;
            $(item).before(Constants.headerRow.replace(/XXX/, Constants.positions[pos]));
            $(item).before($(header).clone(true));
          }
          this.teammates.add(tm);
          $(item).addClass("teammate");
        }
      }
      return $(header).remove();
    };

    XtendTeam.prototype.buildLegend = function() {
      var alpha, color, container, fitness, footnote, form, num, textFitness, _i, _j;
      container = document.createElement("div");
      $(container).addClass("xt-legende");
      form = document.createElement("div");
      $(form).addClass("xt-legende-form");
      $(container).append(form);
      fitness = document.createElement("div");
      $(fitness).addClass("xt-legende-fitness");
      $(container).append(fitness);
      footnote = document.createElement("div");
      $(footnote).addClass("xt-legende-footnote");
      $(footnote).append('<p><sup>1</sup> Die Berechnung der verbleibenden Tage bis zur Aufstiegsberechtigung beruht auf dem momentanen Alter des Spielers. Steigt dessen Alter in dieser Zeit erhöht sich die Anzahl der Tage unter Umständen.</p>');
      $(container).append(footnote);
      for (num = _i = 1; _i < 11; num = ++_i) {
        alpha = num / 10;
        color = alpha > 0.6 ? "#eeeeee" : "black";
        $(form).append('<div style="color: ' + color + '; background-color: rgba(0,0,255,' + alpha + ');">' + (alpha < 1 ? alpha * 40 : "40+" + '</div>'));
      }
      $(form).append('<p><strong>Status:</strong> Je höher die effektive Stärke, je dunkler das Blau. Grau, wenn verhindert.</p>');
      textFitness = ["min. eins unter 12", "jew. über 12", "jew. über 15", "jew. über 17", "jew. über 19"];
      for (num = _j = 0; _j < 5; num = ++_j) {
        $(fitness).append('<div class="form' + num + '">' + textFitness[num] + '</div>');
      }
      $(fitness).append('<p><strong>Energie/Form:</strong> Grün: aufstellbar, rot: Trainingslager?</p>');
      return $(this.table).after(container);
    };

    XtendTeam.prototype.buildStatistic = function() {
      var container, content, createRow, statistic, topic;
      statistic = this.teammates.getStatisic();
      container = document.createElement("div");
      $(container).addClass("xt-statistic");
      topic = document.createElement("div");
      $(topic).addClass("info_topic closed");
      $(topic).append('<span class="open">▼ </span><span class="closed">▶ </span>Statistik');
      $(container).append(topic);
      content = document.createElement("div");
      content.id = "xt-statistic-content";
      content.style.display = "none";
      $(container).append(content);
      createRow = function(header, cols, className, percentage) {
        var col, ret, _i, _len;
        percentage = Helper.round(percentage * 100);
        if (percentage > 100) {
          percentage = 100;
        }
        ret = '<tr class="' + className + ' xt-header-row"><th colspan="' + cols.length + '">' + '<div class="xt-bg" style="width: ' + percentage + '%;">' + '<div class="xt-value">' + header + '</div>' + '</div>' + '</th></tr>' + '<tr class="' + className + '">';
        for (_i = 0, _len = cols.length; _i < _len; _i++) {
          col = cols[_i];
          ret += '<td>' + col + '</td>';
        }
        ret += '</tr>';
        return ret;
      };
      $(content).append('<table class="xt-table">' + '<thead>' + '<tr><th>T</th><th>A</th><th>M</th><th>S</th><th>G</th></tr>' + '</thead>' + '<tbody>' + createRow("Anzahl Spieler", [statistic.total.T.count, statistic.total.A.count, statistic.total.M.count, statistic.total.S.count, statistic.total.count], "even", statistic.total.count / 24) + createRow("Stärke", [statistic.total.T.staerke, statistic.total.A.staerke, statistic.total.M.staerke, statistic.total.S.staerke, statistic.total.staerke], "odd", statistic.total.staerke / (10 * statistic.total.count)) + createRow("Eff. Stärke", [statistic.total.T.effStaerke, statistic.total.A.effStaerke, statistic.total.M.effStaerke, statistic.total.S.effStaerke, statistic.total.effStaerke], "even", statistic.total.effStaerke / (statistic.total.staerke * 4)) + createRow("Eff. Stärke Ø", [statistic.averages.T.effStaerke, statistic.averages.A.effStaerke, statistic.averages.M.effStaerke, statistic.averages.S.effStaerke, statistic.averages.effStaerke], "odd", statistic.averages.effStaerke / (statistic.averages.staerke * 4)) + createRow("Energie Ø", [statistic.averages.T.energie, statistic.averages.A.energie, statistic.averages.M.energie, statistic.averages.S.energie, statistic.averages.energie], "even", statistic.averages.energie / 20) + createRow("Form Ø", [statistic.averages.T.form, statistic.averages.A.form, statistic.averages.M.form, statistic.averages.S.form, statistic.averages.form], "odd", statistic.averages.form / 20) + createRow("Alter Ø", [statistic.averages.T.alter, statistic.averages.A.alter, statistic.averages.M.alter, statistic.averages.S.alter, statistic.averages.alter], "even", (statistic.averages.alter - 17) / 32) + '</tbody>' + '</table>');
      $($("#info_content .info_topic")[2]).before(container);
      $(topic).click(function(e) {
        $("#xt-statistic-content").toggle(300);
        return $(e.target).toggleClass("closed").toggleClass("open");
      });
      return true;
    };

    return XtendTeam;

  })();
  $mainMenu = $('#menu');
  xtMenuContainer = document.createElement('div');
  xtMenuContainer.id = 'xt-menu';
  $mainMenu.append(xtMenuContainer);
  $(xtMenuContainer).append('<h3 class="xt-headline">Hilfe</h3>');
  _ref = Constants.helpContents;
  for (type in _ref) {
    helpContent = _ref[type];
    $helpLink = $('<a href="#" class="xt-link" rel="xt-dialog-modal-' + type + '">' + helpContent.title + '</a>');
    $('body').append('<div style="display: none;" id="xt-dialog-modal-' + type + '" class="xt-dialog-modal"><h2>Hilfe – ' + helpContent.title + '</h2>' + helpContent.content + '</div>');
    $(xtMenuContainer).append($helpLink);
    $helpLink.click(function() {
      $("#" + $(this).attr('rel')).modal({
        overlayClose: true
      });
      return false;
    });
  }
  if (location.href.match(/select=team/) && !location.href.match(/select=team&ac=1/)) {
    xTend = new XtendTeam();
  } else if (location.href.match(/select=bericht&vereinnr=[0-9]+&details=4/)) {
    baseUrl = location.href.split("?")[0];
    GM_xmlhttpRequest({
      method: 'GET',
      url: baseUrl + '?select=finanzen&stadion=1',
      overrideMimeType: "text/html; charset=ISO-8859-1",
      onload: function(responseDetails) {
        var $content, $table, content, holder, table, tables, _i, _len;
        holder = document.createElement('div');
        holder.innerHTML = responseDetails.responseText.split('<div id=\'content\'>')[1].split('<div id="info">')[0];
        tables = $(holder).find(".content_main table");
        content = document.createElement("div");
        $content = $(content);
        for (_i = 0, _len = tables.length; _i < _len; _i++) {
          table = tables[_i];
          $table = $(table);
          $content.append("<h3 class=\"xt-headline\">" + $($(table).find("tr")[0]).text() + "</h3>");
          $($table.addClass("xt-table").find("tr")[0]).remove();
          $content.append(table);
        }
        $(content).addClass("content_main xt-stadion");
        return $('#content').append('<div class="content_icon"><img src="img/tab_logo.png"></div><div class="content_topic">Stadion<p class="content_subtopic">Eintrittspreise festlegen</p></div>', content);
      }
    });
  }
  css = ".content_main { margin: 50px 0 20px 0; }" + "#content table.teammates tr:last-child td { padding: 15px 0 0 0; }" + "table.teammates tr:last-child td img { display: none; }" + "table.teammates tr:last-child td input { line-height: 20px; border: 0 none; padding: 3px 10px; cursor: pointer; }" + "table.teammates font { color: black; } " + "table.teammates td:last-child { border-width: 1px 1px 1px 7px; }" + ".xt-table { border-collapse: collapse; background: 0 none; font-size: 11px; font-family: Calibri, 'Trebuchet MS'; }" + ".xt-table td, .xt-table th { border: 1px solid #E8F6E7; padding: 3px; height: 20px; line-height: 20px; }" + ".xt-table .xt-header-row th { padding-top: 15px; font-size: 15px; text-shadow: 1px 1px 0px white; text-align: left; vertical-align: bottom;  }" + ".form0 td, div.form0 { background-color: #c30 }" + ".form1 td, div.form1 { background-color: #FF7953 }" + ".form2 td, div.form2 { background-color: #FBFF64 }" + ".form3 td, div.form3 { background-color: #72FF42 }" + ".form4 td, div.form4 { background-color: #31C400 }" + "table.teammates tr.statrot > td:last-child," + "table.teammates tr.statgelb > td:last-child," + "table.teammates tr.statverl > td:last-child," + "table.teammates tr.stattl > td:last-child { background-color: grey; font-weight: bold; padding: 0 3px; }" + "table.teammates td.xt-bar { padding: 0; }" + "#content #teammates td.erfahrung { width: 60px; height: 26px; padding: 0; }" + "td.erfahrung .container { position: relative; width: 60px; height: 26px; }" + "td.erfahrung div.balken, td.erfahrung div.wert { top: 0; left: 0; position: absolute; height: 26px; line-height: 26px; z-index: 0 }" + "td.erfahrung div.wert { width: 60px; z-index: 100; cursor: pointer; }" + "td.erfahrung div.balken { background-color: rgba(0,0,0,0.25); }" + "td.erfahrung.aufstieg div.wert, td.erfahrung.zu-alt div.wert { color: #eeeeee; font-weight: bold; }" + "td.erfahrung.zu-alt { background-color: #700; }" + "td.erfahrung.aufstieg div.balken { background-color: rgba(0,0,0,0.9); }" + ".xt-bar { padding: 0; margin: 0 }" + ".xt-bar .xt-bar-container { position: relative; height: 26px; }" + ".xt-bar .xt-bar-container .xt-bar-balken, .xt-bar .xt-bar-container .xt-bar-wert { position: absolute; top: 0; left: 0; }" + ".xt-bar .xt-bar-container .xt-bar-balken { background: rgba(0,0,0,0.25); z-index: 0 }" + ".xt-bar .xt-bar-container .xt-bar-wert { font-weight: bold; z-index: 100 }" + "#info td.xt-bar { padding: 0; }" + ".xt-table-strongness td { background-color: grey }" + ".xt-table-strongness .xt-bar-wert { text-indent: 6px }" + ".xt-legende { padding: 20px 0; margin-left: 10px; }" + ".xt-legende .xt-legende-form { }" + ".xt-legende .xt-legende-fitness, .xt-legende .xt-legende-footnote { clear: left; padding-top: 15px; font-style: italic; }" + ".xt-legende .xt-legende-form div, .xt-legende .xt-legende-fitness div { height: 26px; line-height: 26px; text-align: center; width: 10%; float: left; }" + ".xt-legende .xt-legende-fitness div { width: 20%; }" + ".xt-legende .xt-legende-form p, .xt-legende .xt-legende-fitness p { font-style: italic; clear: left; line-height: 26px; }" + ".xt-statistic .info_topic { cursor: pointer; }" + ".xt-statistic span.closed, .xt-statistic span.open { float: left; width: 12px; font-size: .8em; }" + ".xt-statistic span.open { margin-top: 1px; }" + ".xt-statistic .closed .closed { display: block; }" + ".xt-statistic .closed .open { display: none; }" + ".xt-statistic .open .closed { display: none; }" + ".xt-statistic .open .open { display: block; }" + ".xt-statistic .xt-table { width: 100%; }" + ".xt-statistic .xt-table td, .xt-statistic .xt-table th { background-color: #C1DCB5; text-align: center; }" + ".xt-statistic .xt-table td:last-child { font-weight: bold; background-color: #B2CBA8; }" + ".xt-statistic .xt-table tbody th { text-align: left; padding: 0; }" + ".xt-statistic .xt-table .xt-bg { background-color: #B2CBA8; padding: 3px 0; text-indent: 3px; }" + ".xt-statistic .xt-table .xt-value { width: 150px; }" + ".xt-statistic .xt-table thead th { background-color: transparent; padding: 0; height: auto; line-height: 11px; }" + ".xt-statistic .xt-table .xt-header-row th { font-size: 11px; padding-top: 0; line-height: 11px; background-color: transparent; }" + ".xt-trigger { margin: 10px 0 5px 0; cursor: pointer }" + ".xt-help { margin-left: 0 }" + ".xt-help.xt-table td { background-color: #C1DCB5; }" + ".xt-help.xt-table td:first-child, .xt-help.xt-table th { font-weight: bold; background-color: #B2CBA8; text-shadow: 1px 1px 0px white; }" + ".xt-stadion .xt-table td { text-align: left; background-color: #C1DCB5; }" + ".xt-stadion .xt-table td:first-child { font-weight: bold; text-shadow: 1px 1px 0px white; }" + "#xt-tooltip { position:absolute; z-index:9999; width:180px; background-color: rgba(0,0,0,0.8); border: 1px solid rgb(51,51,51); -webkit-border-radius: 10px; border-radius: 10px; }" + "#xt-tooltip .xt-tooltip-inner { color:#eeeeee; font-size: 11px; font-family: Calibri, 'Trebuchet MS'; padding:5px; }" + "#content .xt-headline, #menu .xt-headline { margin: 10px 0 5px 10px; height: auto; text-shadow: 1px 1px 0px white; font-size: 13px; }" + "#menu .vlogo_size { border: 0 none; }" + "#menu .xt-headline { margin: 20px 0 5px 15px; }" + "#menu .xt-link { display: block; margin: 5px 0 5px 15px; }" + ".content_icon img { width: 30px; margin-top: 3px; }" + ".xt-dialog-modal { padding-bottom: 20px; }" + ".xt-dialog-modal p { margin: 5px 0; width: 400px; }" + "#simplemodal-overlay { background-color: #000; }" + "#simplemodal-container { background-color: #E8F6E7; border: 8px solid #999; padding: 20px; -webkit-border-radius: 10px; -moz-border-radius: 10px; border-radius: 10px; }" + "#simplemodal-container h2 { font-size: 16px; height: auto; text-shadow: 1px 1px 0px white; margin: 0 0 15px; }" + "@media (min-width: 990px) {" + "#window_ads { display: none; }" + "#window_2mm { position: realtive; margin-top: -7px; }" + "#header_bg {position: fixed; z-index: 10000; width: 986px; }" + "#content {margin-left: 179px; margin-top: 97px; }" + "#menu { position: fixed; top: 77px; background-color: rgba(232, 246, 231, .9); z-index: 1000; }" + "#info { margin-top: 57px; }" + "}";
  css = css.replace(/; /g, ' !important;');
  if (typeof GM_addStyle !== "undefined") {
    return GM_addStyle(css);
  } else if (typeof PRO_addStyle !== "undefined") {
    return PRO_addStyle(css);
  } else if (typeof addStyle !== "undefined") {
    return addStyle(css);
  } else {
    heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
      node = document.createElement("style");
      node.type = "text/css";
      node.appendChild(document.createTextNode(css));
      return heads[0].appendChild(node);
    }
  }
})();