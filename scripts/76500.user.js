// ==UserScript==
// @name           comdirect Kontoübersicht+
// @namespace      comdirect
// @include        https://*.comdirect.de/*
// ==/UserScript==

var $       = unsafeWindow.jQuery;
var console = unsafeWindow.console;

if (typeof $ == "function") {
  $("td.fTableHeader:contains(Buchungstag)").closest("table").each( function() {
    var $thisTable  = $(this);
    var $kontostand = $thisTable.prevAll("div:contains('Aktueller Kontostand'):first").children("div:eq(1)");
    var kontostand  = parseFloatDE($kontostand.text());
    var hasKontostand = isNumeric(kontostand);

    $(this).find("tr").each( function(rowNum) {
      var $thisRow  = $(this);

      if (hasKontostand) {
        if (rowNum == 0)
          $thisRow.children("td:last").before("<td class='fTableHeader alignRight'>Übertrag</td>");
        else if ($thisRow.children("td").length == 1)
          $thisRow.children("td[colspan]").each( function() { this.colSpan++; } );
        else
          $thisRow.children("td:last").before("<td class='alignRight'></td>");
      }
        
      var $tds   = $thisRow.children("td");
      var umsatz = parseFloatDE( $thisRow.children("td:last").text() );

      if (isNumeric(umsatz)) {
        $thisRow.css("border-top", "1px solid silver");
        $tds.css("background-color", umsatz > 0 ? "#B1FF9C" : "#F9DCFF");

        // rollierenden Kontostand berechnen
        if (hasKontostand) {
          kontostand += -1*umsatz;
          $tds.eq(4).text(formatFloatDE(kontostand)).addClass(kontostand >= 0 ? "fcGreen" : "fcRed" );
        }

        // Buchungstext formatieren
        $tds.eq(3).contents().filter( function() {
          switch ($.trim(this.nodeValue)) {
            case "Auftraggeber:":
            case "Empfänger:":
            case "Buchungstext:":
              return true; break;
            default:
              return false;
          }
        }).each( function() {
          this.nodeValue = $.trim(this.nodeValue.replace(/\xA0/g, ""));
        }).wrap("<b style='text-decoration: underline;'></b>");

      }
    });
  });
}

function parseFloatDE(text){
  if (typeof text == "string")
    return parseFloat( text.replace(/[+.\s]/g, "").replace(/,/, ".") );
  return parseFloat("NaN");
}

function formatFloatDE(num) {
  if (typeof num.toFixed == "function")
    return num.toFixed(2).toString(10).replace(/\./, ",");
  return num;
}

function isNumeric(val) {
  return typeof val == "number" && !isNaN(val);
}
