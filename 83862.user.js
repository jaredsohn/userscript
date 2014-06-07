// ==UserScript==
// @name         Filmstarts 2 OTR
// @author       joergber
// @copyright    2010+, joergber
// @namespace    filmstarts.de, OTR
// @description  Provides search-links for http://www.otrkeyfinder.com and http://www.otr-search.com
// @include      http://www.filmstarts.de/serien/*
// @version      0.0.1
// ==/UserScript==


// enable jQuery (is allready loaded with filmstarts.de)
$ = unsafeWindow.jQuery

// show jQuery-version
// alert($().jquery);

var name = $($($('.titlebar')[0]).children()[0]).text().split(">")[0].replace(/\s+$/,"").replace(/^\s+/, "");
name = name.replace(/,/, ""); // Kommas aus dem namen entfernen
name = name.replace(/-/, " "); // - durch " " ersetzen

var _year = $("#datemonthbox").text().match(/\d\d$/);
var _month = $("#datemonthbox").text().replace(/\s\d+/,"");
var _day = "";

switch(_month) {
  case "Januar":
    _month = "01";
    break;
  case "Februar":
    _month = "02";
    break;
  case "M�rz":
    _month = "03";
    break;
  case "April":
    _month = "04";
    break;
  case "Mai":
    _month = "05";
    break;
  case "Juni":
    _month = "06";
    break;
  case "Juli":
    _month = "07";
    break;
  case "August":
    _month = "08";
    break;
  case "September":
    _month = "09";
    break;
  case "Oktober":
    _month = "10";
    break;
  case "November":
    _month = "11";
    break;
  case "Dezember":
    _month = "12";
    break;
}

$('.seasontvshowdata tbody tr').each(function(){
  if (/.+,\s\d\d\.\s.+/.test($(this).text())) {
    $(this).text().replace(/\s+$/,"").replace(/^\s+/, "");
    _day = $(this).text().replace(/^\s+.+,\s/, "").replace(/\.\s.+\s+$/, "");
    _date = _year + '.' + _month + '.' + _day;
  }
  else if(/Sender/.test($(this).text())) {
    _time = $(this).text().match(/\d\d\.\d\d/) + ''
    all=_date + ' ' + _time.replace(/\./, "-");
    $(this).append('<td><a class="joergber" href="http://www.otrkeyfinder.com/?search=' + name + ' ' + all + '" target="_blank" title="Diese Folge auf http://www.otrkeyfinder.com suchen ..."><img height="16" src="http://www.otrkeyfinder.com/images/favicon.ico"></a></td>');
    $(this).append('<td><a class="joergber" href="http://www.otr-search.com/suche/' + name + ' ' + all + '" target="_blank" title="Diese Folge auf http://www.otr-search.com suchen ..."><img height="16" src="http://www.otr-search.com/favicon.ico"></a></td>');
  }
});
