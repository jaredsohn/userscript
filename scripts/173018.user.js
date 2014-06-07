// ==UserScript==
// @name          Sahibinden - İlan Gez
// @description   Sahibinden - İlan Gez, gezilen ilanları farklı şekilde renklendirir ve ilana not ekleme imkanı sağlar
// @include       http://www.sahibinden.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require       http://ajax.cdnjs.com/ajax/libs/json2/20110223/json2.min.js
// @version       0.2b
// @author        ugureski@me.com
// ==/UserScript==


$(document).ready(function(){


  // gezilen ilanları sıfırla
  $(document).on('click', '#ilanlariTemizle', function() {
    var keys = GM_listValues();
    for (var i=0, key=null; key=keys[i]; i++) {
      GM_deleteValue(key);
    }
    console.log('temizlendi');
    alert('Gezdiğiniz ilanlar sıfırlandı. Sayfa yenilenicek.');
    location.reload();
  });


  // ilana not ekle
  $(document).on('click', '#ilanaNotEkle', function() {
    var ilanNo = trim($('.adNumber').html());
    ilanNot = ilanNotGetir(ilanNo);

    var not = prompt("Not Giriniz:", ilanNot);
    var ilanNo = "ilan_"+trim($('.adNumber').html());
    eval("var ilanDetay = { "+ilanNo+": { not: \""+not+"\", gezildimi: \"evet\" } }");

    ilanKayitEt(ilanDetay);

    // dive yaz
    $('#notDiv').html(not);


  });
});


// ilan sayfasında ise
if ($('.adNumber').length > 0) {
  var ilanNo = trim($('.adNumber').html());

  tumIlanlar = tumIlanlariGetir();
  eval("var ilan = tumIlanlar.ilan_"+ilanNo+";");

  // ilan gezilmemis
  if (typeof ilan != "object") {
    console.log('gezilmemis');
    // gezilen ilan kaydet
    eval("var ilanDetay = { ilan_"+ilanNo+": { gezildimi: \"evet\" } };");

    // gezilen ilanı kayıt et
    ilanKayitEt(ilanDetay);
  }
  else {
    console.log('gezilmis');
  }

  ilanNot = ilanNotGetir(ilanNo);

  var notDiv = "<div style=\"color: red; font-size: 11px; border: 1px black solid; padding: 3px; width: 235px; overflow: auto;\" id=\"notDiv\">"+ilanNot+"</div>";
  $('.briefPrice').append(notDiv);

  var notButon = "<div style=\"float: left;\"><a href=\"javascript:void(0);\" id=\"ilanaNotEkle\">Not Ekle</a></div>";
  $('.briefPrice').append(notButon);

}
// ilan listesinde ise
else if ($('.searchResultsRight').length > 0) {
  console.log('liste');

  var tumIlanlar = tumIlanlariGetir();

  var ilanListesi = $('.searchResultsItem .searchResultsTitleValue');

  $.each(ilanListesi, function(index, value) {
    var ilanHref = $(this).find('.classifiedTitle').attr('href');
    var arr = ilanHref.split("-");
    var ilanNo = parseInt(arr.slice(-1)[0]);

    eval("var ilan = tumIlanlar.ilan_"+ilanNo+";");

    // ilan gezildi ise
    if (typeof ilan == "object") {
        if (typeof ilan.not != "undefined") {
          var notDiv = "<div style=\"color: yellow; font-size: 11px; width: 438px; overflow: auto;\">"+ilan.not+"</div>"
          $(this).append(notDiv);
        }

        $(this).closest('.searchResultsItem').css('background-color', 'gray');
    }

  });

  var temizleButon = "<div class=\"menuItem\" style=\"float: right; background-color: yellow;\"><a href=\"javascript:void(0);\" id=\"ilanlariTemizle\">Gezilen İlanları Sıfırla</a></li>";
  $('.infoSearchResults').append(temizleButon);
}
else {
  console.log('baska bi sayfa');
}


function ilanNotGetir(ilanNo) {
  var tumIlanlar = tumIlanlariGetir();
  eval("var ilan = tumIlanlar.ilan_"+ilanNo+";");

  if (typeof ilan.not == "undefined") {
    ilan.not = "";
  }

  return ilan.not;
}

function tumIlanlariGetir() {
  return JSON.parse(GM_getValue('ilanlar', "{}"));
}

function ilanKayitEt(ilanDetay) {
  var tumIlanlar = tumIlanlariGetir();
  tumIlanlar = $.extend(tumIlanlar, ilanDetay);

  GM_setValue('ilanlar', JSON.stringify(tumIlanlar));

  return true;
}


function deserialize(name, def) {
  return eval(GM_getValue(name, (def || '({})')));
}

function serialize(name, val) {
  GM_setValue(name, uneval(val));
}


function trim (str, charlist) {

  var whitespace, l = 0,
    i = 0;
  str += '';

  if (!charlist) {
    // default list
    whitespace = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
  } else {
    // preg_quote custom list
    charlist += '';
    whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
  }

  l = str.length;
  for (i = 0; i < l; i++) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(i);
      break;
    }
  }

  l = str.length;
  for (i = l - 1; i >= 0; i--) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(0, i + 1);
      break;
    }
  }

  return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}



function empty (mixed_var) {

  var undef, key, i, len;
  var emptyValues = [undef, null, false, 0, "", "0"];

  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixed_var === emptyValues[i]) {
      return true;
    }
  }

  if (typeof mixed_var === "object") {
    for (key in mixed_var) {
      // TODO: should we check for own properties only?
      //if (mixed_var.hasOwnProperty(key)) {
      return false;
      //}
    }
    return true;
  }

  return false;
}
