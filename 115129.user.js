// ==UserScript==
// @name           Allegro.pl: Tweaks
// @version        1.9
// @namespace      userscripts.org/users/411336
// @description    Zbiór poprawek/usprawnień do Allegro.pl
// @include        http*://*allegro.pl/*
// @require        http://sizzlemctwizzle.com/updater.php?id=115129
// ==/UserScript==

var PRE_HEADER_ID = 'preHeader';
var COMMENT_CHECKBOX_NAME_STARTSWITH = 'item_id_array[';
var DEFAULT_BLANK_COMMENT_KEY = '(domyślny)';

var DEFAULT_MINI_KEY = 'domyslnieMiniaturkiKey';
var DEFAULT_TRANSFER_KEY = 'domyslnieNaKontoKey';
var DEFAULT_CENNIK_KEY = 'domyslnyCennikKey';
var DEFAULT_REMINDER_KEY = 'domyslnePrzypomnienieKey';
var DEFAULT_DURATION_KEY = 'domyslnyCzasTrwaniaKey';
var DEFAULT_MULTICOMMENTS_KEY = 'domyslnyWylaczoneKomentarzeKey';
var DEFAULT_SELLING_LIST_KEY = 'domyslnaListaSprzedawanychKey';
var DEFAULT_COMMENT_KEY = 'domyslnyKomentarzKey';
var DEFAULT_HIDING_ZEROS_KEY = 'domyslneUkrywanieZerKey';

var FEEDBACK_URL = 'feedbacks/add.php/addMulti'
var SELLING_LIST_URL = '/myaccount/sell.php'
var LIST_ITEM_URL = 'new_item.php'
var REMINDER_FORM_URL = '/myaccount/refund.php/reminderForm2'

// za: http://devign.me/greasemonkey-gm_getvaluegm_setvalue-functions-for-google-chrome/
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported") > -1)) {
    this.GM_getValue = function (key, def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key, value) {
        return localStorage[key] = value;
    };
    this.GM_deleteValue = function (key) {
        return delete localStorage[key];
    };
}

(function() {
    addControlPanel();
    checkCennik();
    checkDomyslnieNaKonto();
    checkReminder();
    checkDuration();
    checkMultiComments();
    checkSellListColumns();
    checkDomyslnyKomentarz();
})();



function checkDomyslnyKomentarz() {
  // akcja tylko na stronie wystawiania komentarza
  if (window.location.href.indexOf(FEEDBACK_URL) == -1) {
    return;
  }

  document.getElementById('radioPos').addEventListener('click', function() {checkDomyslnyKomentarz();}, true);
  document.getElementById('radioNeu').addEventListener('click', function() {document.getElementById('feedback_text').value = '';}, true);
  document.getElementById('radioNeg').addEventListener('click', function() {document.getElementById('feedback_text').value = '';}, true);

  
  if (!document.getElementById('radioPos').checked) {
    return;
  }
  var domyslnyKomentarz = GM_getValue(DEFAULT_COMMENT_KEY);

  if (domyslnyKomentarz == DEFAULT_BLANK_COMMENT_KEY) {
    return;
  }
  
  if (domyslnyKomentarz.replace(/\s/g,"") === "") {
    domyslnyKomentarz = '';
  }
  
  var commentArea = document.getElementById('feedback_text');
  commentArea.value = domyslnyKomentarz;
}

function checkSellListColumns() {
  // akcja tylko na stronie listy przedmiotów
  if (window.location.href.indexOf(SELLING_LIST_URL) == -1) {
    return;
  }
  if (isTrue(GM_getValue(DEFAULT_SELLING_LIST_KEY, false))) {
    var listingTable = document.getElementById('listingMyAccount');
    var rows = listingTable.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    var firstRow = rows[0];
    headers = firstRow.getElementsByTagName('th');
    headers[2].colSpan = 4;
    headers[3].colSpan = 3;
    headers[4].colSpan = 3;
    
    for (var i = 2; i < rows.length; i += 3) {
        // rozszerz wiersz z opcjami i paskiem oddzielającym żeby były do końca prawej strony
        rows[i-1].getElementsByTagName('td')[1].colSpan = 11;
        rows[i+1].getElementsByTagName('td')[0].colSpan = 12;
        
        var columns = rows[i].getElementsByTagName('td');
        var colSztukT = columns[1];
        var colSztukV = columns[2];
        var colObserT = columns[3];
        var colObserV = columns[4];
        
        var sztuk = colSztukV.childNodes[1].childNodes[0].innerHTML;  
        var ofert = colSztukV.childNodes[3].childNodes[0].innerHTML;  
        var obser = colObserV.childNodes[1].childNodes[0].innerHTML;  
        var wysw = colObserV.childNodes[3].childNodes[0].innerHTML;  
        
        colSztukV.removeChild(colSztukV.childNodes[1]);
        colSztukT.removeChild(colSztukT.childNodes[1]);
        colObserV.removeChild(colObserV.childNodes[1]);
        colObserT.removeChild(colObserT.childNodes[1]);
        
        var sztukTd = document.createElement('td');
        var sztukTdT = document.createElement('td');
        var obsTd = document.createElement('td');
        var obsTdT = document.createElement('td');
        
          if (sztuk < 2 && isTrue(GM_getValue(DEFAULT_HIDING_ZEROS_KEY, false))) {
            sztukTd.innerHTML = '<td class="toleft tobottom nowrap"><p></p></td>';
            sztukTdT.innerHTML = '<td class="toleft tobottom nowrap"><p></p></td>';
          } else {
            sztukTd.innerHTML = '<td class="toleft tobottom nowrap"><p>Sztuk: </p></td>';
            sztukTdT.innerHTML = '<td class="toleft tobottom nowrap"><p>' + sztuk+'</p></td>';
          }
          
          if (obser == 0 && isTrue(GM_getValue(DEFAULT_HIDING_ZEROS_KEY, false))) {
            obsTd.innerHTML = '<td class="toleft tobottom nowrap"><p></p></td>';
            obsTdT.innerHTML = '<td class="toleft tobottom nowrap"><p></p></td>';
          } else {
            obsTd.innerHTML = '<td class="toleft tobottom nowrap"><p>Obs: </p></td>';
            obsTdT.innerHTML = '<td class="toleft tobottom nowrap"><p>' + obser+'</p></td>';
          }
          
        rows[i].insertBefore(sztukTdT, columns[1]);
        rows[i].insertBefore(sztukTd, columns[1]);
        rows[i].insertBefore(obsTdT, columns[3]);
        rows[i].insertBefore(obsTd, columns[3]);
        if (isTrue(GM_getValue(DEFAULT_HIDING_ZEROS_KEY, false))) {
          if (ofert == 0) {
            columns[5].innerHTML = '';
            columns[6].innerHTML = '';
          }
          
          if (wysw == 0) {
            columns[7].innerHTML = '';
            columns[8].innerHTML = '';
          }
        }
    }
  }
}

function checkMultiComments() {
  // akcja tylko na stronie wystawiania komentarza
  if (window.location.href.indexOf(FEEDBACK_URL) == -1) {
    return;
  }
  var checkboxes = Array();
  
  if (isTrue(GM_getValue(DEFAULT_MULTICOMMENTS_KEY, false))) {
    var inputs = document.getElementsByTagName("input");
    
    /*
     * Ponieważ wystawiania komentarzy do jedno/wieloprzedmiotowych na tej samej stronie i bezsensowne byłoby odznaczanie na tej pierwszej
     * najpierw zobacz ile checkboxów...
     */ 
    for (var i = 0; i < inputs.length; i++) {
       if (inputs[i].type == 'checkbox' && inputs[i].name.indexOf(COMMENT_CHECKBOX_NAME_STARTSWITH ) == 0 && inputs[i].checked) {
         checkboxes.push(inputs[i].name);
      }
    }
    
    /*
     *  ...i odznaczaj tylko jeśli więcej niż jeden.
     */ 
    if (checkboxes.length > 1) {
      for (var i = 0; i < checkboxes.length; i++) {
        document.getElementsByName(checkboxes[i])[0].checked = false;
      }
    }
    
   }
}

function checkDuration() {
   // akcja tylko na stronie wystawiania przedmiotu
   if (window.location.href.indexOf(LIST_ITEM_URL) == -1) {
     return;
   }
    
   var lengthMappings = new Array();
   lengthMappings['3'] = 0;
   lengthMappings['5'] = 1;
   lengthMappings['7'] = 2;
   lengthMappings['10'] = 3;
   lengthMappings['14'] = 4;
    
   if (GM_getValue(DEFAULT_DURATION_KEY, 0) !== 0 ) {
      var selectAuctionLength = document.getElementsByName('auction_duration')[0];
      selectAuctionLength[lengthMappings[GM_getValue(DEFAULT_DURATION_KEY)]].selected = true;
   }   
}

function checkDomyslnieNaKonto(){
   // akcja tylko na stronie wystawiania przedmiotu
   if (window.location.href.indexOf(LIST_ITEM_URL) == -1) {
     return;
   }

   if (isTrue(GM_getValue(DEFAULT_TRANSFER_KEY, true))) {
     var przelewCheckbox = document.getElementById("wire_transfer");
     przelewCheckbox.checked = true;
   }
}

function checkMiniaturka() {
   // akcja tylko na stronie wystawiania przedmiotu
    if (window.location.href.indexOf(LIST_ITEM_URL) == -1) {
      return;
    }
    
    if (isTrue(GM_getValue(DEFAULT_MINI_KEY, true))) {
      var thumbCheckbox = document.getElementById("listing_thumb");
      thumbCheckbox.checked = true;
    }
}

function checkReminder() {
   // akcja tylko na stronie wysyłania przypomnienia
   if (window.location.href.indexOf(REMINDER_FORM_URL) == -1) {
      return;
   }
   
   var domyslnePrzypomnienie = GM_getValue(DEFAULT_REMINDER_KEY);
   if (domyslnePrzypomnienie.replace(/\s/g,"") === "") {
      return;
   }
    
   var reminderTextField = document.getElementsByName('reminder_content')[0];
   reminderTextField.value = domyslnePrzypomnienie;
}

function checkCennik(){
   // akcja tylko na stronie wystawiania przedmiotu
   if (window.location.href.indexOf(LIST_ITEM_URL) == -1) {
      return;
   }
  
   var domyslnyCennik = GM_getValue(DEFAULT_CENNIK_KEY);
   if (typeof(domyslnyCennik) === "undefined" || domyslnyCennik.replace(/\s/g,"") === "") {
      return;
   }
  
   var selectScheme = document.getElementById('scheme_id');
   var found = false;
   for (var i = 0; i < selectScheme.options.length; i++) {
      if (selectScheme.options[i].text == domyslnyCennik) {
        var previouslySelected = selectScheme.options[i].selected;
        if (previouslySelected) {
            // żeby się nie zapętliło
            return;
        }
        
        selectScheme.options[i].selected = true;
        unsafeWindow.SetAndSubmitForm('postscheme_submit');
        found = true;
        break;
      }
  }
  
  if (!found) {
      alert("Nie masz takiego cennika: " + domyslnyCennik);
  }
}

function genericClickHandler(key, value) {
  GM_setValue(key, value);
}

function addControlPanel() {
  if(null === document.getElementById( 'tweaksSettingsWindow')) {
      var nodeControlPanel = document.createElement("span");
      nodeControlPanel.id = 'tweaksSettingsWindowOuter';
      nodeControlPanel.innerHTML =
      '<div id="tweaksSettingsWindow" style="position:absolute; z-index:1000; top:100px; left:30%; width:880px; margin-left:-175px; display:none; background-color:white; border:solid 1px #000000; padding:3px">'+
      '<div height="30px" style="position:absolute; right:0px"><a href="#" onclick="document.getElementById( \'tweaksSettingsWindow\').style.display=\'none\';">zapisz i zamknij (X)</a></div>' + 
      '<div><b style="color:#FF5a00">Allegro.pl Tweaks</b></div>'+
      
      '<div><b>USTAWIENIA OGÓLNE</b></div>' +
      '<div><input id="default_multicomments" type="checkbox" ' + (isTrue(GM_getValue(DEFAULT_MULTICOMMENTS_KEY, false)) ? "checked=\"true\"" : "") + '"/><label for="default_multicomments">Domyślne odznaczanie wszystkich Kupujących przy komentarzu do aukcji wieloprzedmiotowej</label></div>' +
      '<br/><div><label for="default_comment">Tekst domyślnego komentarza pozytywnego <i>(zostaw puste pole jeśli nie chcesz żadnego, wpisz <b>' + DEFAULT_BLANK_COMMENT_KEY + '</b> żeby zostawić domyślny z Allegro)</i></label>'+
      '<br/><textarea id="default_comment" cols="100" rows="2">' + GM_getValue(DEFAULT_COMMENT_KEY, DEFAULT_BLANK_COMMENT_KEY) + '</textarea>'+
      '</div>' +
      '<div><label for="default_reminder">Tekst domyślnego przypomnienia <i>(zostaw puste jeśli nie chcesz zmieniać domyślnego)</i>:</label><br/>'+
      '<textarea id="default_reminder" cols="100" rows="5">' + GM_getValue(DEFAULT_REMINDER_KEY, '') + '</textarea></div>' +
      
      '<br/>'+
      '<div><b>USTAWIENIA SPRZEDAŻY</b></div>' +
      '<div><input id="default_miniaturki" type="checkbox" ' + (isTrue(GM_getValue(DEFAULT_MINI_KEY, false)) ? "checked=\"true\"" : "") +'"/><label for="default_miniaturki">Domyślnie zaznaczona miniaturka przy wystawianiu</label></div>' +
      '<div><input id="default_transfer" type="checkbox" ' + (isTrue(GM_getValue(DEFAULT_TRANSFER_KEY, false)) ? "checked=\"true\"" : "") + '"/><label for="default_transfer">Domyślnie zaznaczona opcja "przelew" przy wystawianiu</label></div>' +
      '<div><input id="default_selling_list_columns" type="checkbox" ' + (isTrue(GM_getValue(DEFAULT_SELLING_LIST_KEY, false)) ? "checked=\"true\"" : "") + '"/><label for="default_selling_list_columns">Wyświetlenia/obserwują na liście sprzedawanych przedmiotów w kolumnach</label></div>' +
      '<div style="margin-left:20px"><input id="default_hide_zeros" type="checkbox" ' + (isTrue(GM_getValue(DEFAULT_HIDING_ZEROS_KEY, false)) ? "checked=\"true\"" : "") + ' ' + (isTrue(GM_getValue(DEFAULT_SELLING_LIST_KEY, false)) ? "" : "disabled=\"true\"") + '"/><label style="color: '+getDisabledColor(!isTrue(GM_getValue(DEFAULT_SELLING_LIST_KEY, false)))+'" id="default_hide_label" for="default_hide_zeros">Ukrywaj nieistotne wartości </label></div>' +
      '<br/><div><input id="default_cennik" type="text" value="' + GM_getValue(DEFAULT_CENNIK_KEY, '')  + '"></input><label for="default_cennik">Nazwa domyślnego cennika dostawy <i>(zostaw puste pole jeśli nie chcesz żadnego)</i></label></div>' +
      '<br/><div>'+
      '<select id="auction_duration_setting">'+
      '<option value="0"' + (GM_getValue(DEFAULT_DURATION_KEY) == 0 ? "selected=\"selected\"" : "")+'>---</option>'+
      '<option value="3"' + (GM_getValue(DEFAULT_DURATION_KEY) == 3 ? "selected=\"selected\"" : "")+'>3</option>'+
      '<option value="5"' + (GM_getValue(DEFAULT_DURATION_KEY) == 5 ? "selected=\"selected\"" : "")+'>5</option>'+
      '<option value="7"' + (GM_getValue(DEFAULT_DURATION_KEY) == 7 ? "selected=\"selected\"" : "")+'>7</option>'+
      '<option value="10"' + (GM_getValue(DEFAULT_DURATION_KEY) == 10 ? "selected=\"selected\"" : "")+'>10</option>'+
      '<option value="14"' + (GM_getValue(DEFAULT_DURATION_KEY) == 14 ? "selected=\"selected\"" : "")+'>14</option>'+
      '</select> '+
      '<label for="auction_duration_setting">Domyślna długość aukcji</label></div>' +
      
      
      
      '</div>';
      //divs = document.body.getElementsByTagName('div');
      document.getElementById('headerBox').appendChild(nodeControlPanel);
      
      // Listeners
      document.getElementById( 'default_miniaturki').addEventListener( 'click', function() { genericClickHandler(DEFAULT_MINI_KEY, this.checked); }, true);
      document.getElementById( 'default_transfer').addEventListener( 'click', function() { genericClickHandler(DEFAULT_TRANSFER_KEY, this.checked); }, true);
      document.getElementById( 'default_cennik').addEventListener( 'change', function() { genericClickHandler(DEFAULT_CENNIK_KEY, this.value); }, true);
      document.getElementById( 'default_comment').addEventListener( 'change', function() { genericClickHandler(DEFAULT_COMMENT_KEY, this.value); }, true);
      document.getElementById( 'default_reminder').addEventListener( 'change', function() { genericClickHandler(DEFAULT_REMINDER_KEY, this.value); }, true);
      document.getElementById( 'default_multicomments').addEventListener( 'change', function() { genericClickHandler(DEFAULT_MULTICOMMENTS_KEY, this.checked); }, true);
      document.getElementById( 'default_selling_list_columns').addEventListener( 'change', function() { genericClickHandler(DEFAULT_SELLING_LIST_KEY, this.checked); document.getElementById('default_hide_zeros').disabled = !this.checked; document.getElementById('default_hide_label').style.color = getDisabledColor(!this.checked);}, true);
      document.getElementById( 'default_hide_zeros').addEventListener( 'change', function() { genericClickHandler(DEFAULT_HIDING_ZEROS_KEY, this.checked); }, true);
  
      document.getElementById( 'auction_duration_setting').addEventListener( 'change', function() {
         var val = '11 dni';
         for (var i = 0; i < this.options.length ; i++ ) {
            if (this.options[i].selected === true) {
                val = this.options[i].text;
            }
         }
         genericClickHandler(DEFAULT_DURATION_KEY, val); 
      }, true);
  }

  var openLink = document.createElement("div");
  openLink.innerHTML = '<div><a id="tweakSettings" href="javascript:document.getElementById(\'tweaksSettingsWindow\').style.display=\'block\';void(0);">Tweaks</a></div>';
  var topMenu = document.getElementById(PRE_HEADER_ID);
  topMenu.appendChild(openLink);
}

function getDisabledColor(checked) {
  if (checked) {
    return '#aaa';
  } else {
    return '#000';
  }
}


function isTrue(value) {
   if (value === 'true' || value === true) {
      return true;
   } else if (value === 'false' || value === false) {
      return false;
   } else {
      // ....
   }
}