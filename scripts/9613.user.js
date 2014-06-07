// ==UserScript==
// @name            Google Image Type Recognition
// @namespace       http://loucypher.wordpress.com/
// @include         http://*.google.*/images?*
// @description     Adds image type selections to Google Image search
// ==/UserScript==

// Last updated: 2008-03-18

(function() {
  var form;
  if (typeof unsafeWindow == "object") {
    form = unsafeWindow.document.gs;
  } else {
    form = document.gs;
  }
  if (!form) return;

  var yellowbar = document.evaluate("//span[contains(@style, " +
                                    "'rgb(255, 255, 153)')]/parent::center",
                                    document, null, 0, null).iterateNext();
  if (yellowbar) yellowbar.parentNode.removeChild(yellowbar);

  var imgtype;
  if (form.imgtype != undefined) {
    imgtype = form.imgtype.value;
  } else {
    try {
      imgtype = location.href.match(/imgtype\=(\w+)/)[1];
    } catch(ex) {
      imgtype = "";
    }
    var inp = form.appendChild(document.createElement("input"));
    inp.type = "hidden";
    inp.name = "imgtype";
    inp.value = imgtype;
  }

  /*var xpath = "//select[@name='imagesize']/parent::* | //span[@id='sd']/parent::*";
  var bluebar = document.evaluate(xpath, document, null, 0, null).iterateNext();
  if (!bluebar) return;*/
  var elm = document.getElementsByName("imagesize")[0] ||
            document.getElementById("sd");
  if (!elm) return;
  var bluebar = elm.parentNode;

  var menu = bluebar.appendChild(document.createElement("select"));
  menu.name = "imgtype";
  menu.style.margin = "2px 0pt";
  menu.addEventListener("change", function(e) {
    form.imgtype.value = this.options[this.selectedIndex].value;
    form.submit();
  }, false);

  var language = form.hl.value;
  var text;

  switch (language) {
    case "id":  // Indonesian; contributed by W.J.S. Purwadarminta
    case "ms":  // Malay; merge with ID til I get the translations
      text = ["Semua jenis gambar", "Wajah", "Berita"];
      break;

    case "jw":  // Javanese; contributed by Pak Raden
      text = ["Sedoyo jenis gambar", "Wajah", "Kabar"];
      break;

    case "su":  // Sundanese; contributed by Asep Sunarya
      text = ["Sakab\u00e9h jenis gambar", "Muka", "Beja"];
      break;

    case "nl":  // Dutch; contributed by Deathstar-NL
      text = ["Alle afbeelding types", "Gezichten", "Nieuws"];
      break;

    case "fr":  // French; contributed by Mortimer
      text = ["Tous les types d\'image", "Figures", "Actualit\u00e9s"];
      break;

    case "de":  // German; generated with psyched
      text = ["Alle Bildtypen", "Gesichter", "Neuigkeiten"];
      break;

    case "it":  // Italian; generated with Google Translator
      text = ["Tutti i tipi di immagine", "Facce", "Notizie"];
      break;

    case "eu":  // Basque; -----+
    case "gl":  // Galician; ---+ merge with ES til I get the translations
    case "es":  // Spanish
      text = ["Todos los tipos de la imagen", "Caras", "Noticias"];
      break;

    case "ca":  // Catalan; contributed by Aljullu
      text = ["Tots els tipus d\'imatges", "Cares", "Not\u00edcies"];
      break;

    case "pt-BR":  // Portuguese (Brazil); contributed by Bruno 'ReX' Barbieri
      text = ["Todos tipos de imagem", "Rostos", "Notícias"];
      break;

    case "pt-PT":  // Portuguese (Portugal); contributed by vOidSenses
      text = ["Todos os tipos da imagem", "Caras", "Noticia"];
      break;

    case "xx-elmer":  // Elmer Fudd; contwib. by himsewf
      text = ["Aww image types", "Faces", "News"];
      break;

    case "xx-piglatin": // Pig Latin; contributed by Arcusmay Ulliustay Icerocay
      text = ["Allay imageway ypestay", "Acesfay", "Ewsnay"];
      break;

    case "xx-hacker":  // Hacker; contributed by 4(1|)|3|_||2|\|
      text = ["4|| 1/\\/\\463 +yP3z", "P|-|4(3z", "|\\|3\\/\\/5"];
      break;

    case "th":  // Thai; contributed by tz
      text = ["\u0e17\u0e38\u0e01\u0e23\u0e39\u0e1b\u0e20\u0e32\u0e1e",
              "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32",
              "\u0e02\u0e48\u0e32\u0e27"];
      break;

    case "fi":  // Finnish; contributed by kenmooda
      text = ["Kaikki kuvatyypit", "Kasvokuvat", "Uutiskuvat"];
      break;

    case "hr":  // Croatian
    case "sr":  // Serbian; contributed by ferjah, corrected by sanja
      text = ["Svi tipovi slika", "Lica", "Vijesti"];
      break;

    case "sv":  // Swedish; contributed by Alessandro Coletti
      text = ["Alla slags bilder", "Ansikten", "Nyheter"];
      break;

    case "hi":  // Hindi; contributed by Vikas Pandey
      text = ["\u0924\u0938\u094d\u0935\u0940\u0930 " +
              "\u0915\u0947 \u0938\u092d\u0940 " +
              "\u092a\u094d\u0930\u0915\u093e\u0930",
              "\u091a\u0947\u0939\u0930\u0947",
              "\u0959\u092c\u0930\u0947\u0902"];
      break;

    case "sk":  // Slovak; contributed by DanielF
      text = ["Vsetky typy obrazkov", "Tvare", "Spravy"];
      break;

    case "da":  // Danish; contributed by Napzter
      text = ["Alle billed typer", "Ansigter", "Nyheder"];
      break;

    case "pl":  // Polish; contributed by RomanX
      text = ["Wszystkie typy obrazów", "Twarze", "Wiadomosci"];
      break;

    case "mt":  // Maltese; contributed by Edward Grech
      text = ["Kull tip ta’ stampa", "U\u010bu\u0127", "A\u0127barijiet"];
      break;

    case "hu":  // Hungarian; contributed by Archeorbiter
      text = ["Minden k\u00e9pt\u00edpus", "Arcok", "H\u00edrek"];
      break;

    case "eo":  // Esperanto; contributed by Jordon Kalilich
      text = ["\u0108iuj bildtipoj", "Viza\u011doj", "Nova\u0135oj"];
      break;

    case "tr":  // Turkish; contributed by KaraGarga
      text = ["T\u00fcm\u00fc", "Y\u00fczler", "Haberler"];
      break;

    case "iw":  // Hebrew; contributed by KaraGarga
      text = ["\u05db\u05dc \u05e1\u05d5\u05d2\u05d9 " +
              "\u05d4\u05ea\u05de\u05d5\u05e0\u05d5\u05ea",
              "\u05e4\u05e8\u05e6\u05d5\u05e4\u05d9\u05dd",
              "\u05d7\u05d3\u05e9\u05d5\u05ea"];
      break;

    case "el":  // Greek; contributed by hosts
      text = ["\u03bf\u03c0\u03bf\u03b9\u03bf\u03b4\u03ae\u03c0" +
              "\u03bf\u03c4\u03b5 \u03b1\u03c1\u03c7\u03b5\u03af\u03bf",
              "\u03c6\u03b1\u03c4\u03c3\u03bf\u03cd\u03bb\u03b5\u03c2",
              "\u03c0\u03b5\u03c1\u03b9\u03b5\u03c7\u03cc\u03bc" +
              "\u03b5\u03bd\u03bf \u03b5\u03b9\u03b4\u03ae\u03c3" +
              "\u03b5\u03c9\u03bd"];
      break;

    case "ru":  // Russian; contributed by Daniel Abramov
      text = ["\u0412\u0441\u0435 \u0438\u0437\u043e\u0431\u0440\u0430" +
              "\u0436\u0435\u043d\u0438\u044f",
              "\u041b\u0438\u0446\u0430",
              "\u041d\u043e\u0432\u043e\u0441\u0442\u0438"];
      break;

    case "uk":  // Ukrainian; contributed by Eugene Schava
      text = ["\u0423\u0441i \u0437\u043e\u0431\u0440\u0430\u0436\u0435" +
              "\u043d\u043d\u044f",
              "\u041e\u0431\u043b\u0438\u0447\u0447\u044f",
              "\u041d\u043e\u0432\u0438\u043d\u0438"];
      break;

    case "ar":  // Arabic; contributed by abdelmotaleb
      text = ["\u062C\u0645\u064A\u0639 \u0627\u0644\u0635\u0648\u0631",
              "\u0627\u0644\u0648\u062C\u0648\u0647",
              "\u0627\u0644\u0627\u062E\u0628\u0627\u0631"];
      break;

    case "af":  // Afrikaans
    case "sq":  // Albanian
    case "am":  // Amharic
    case "hy":  // Armenian
    case "az":  // Azerbaijani
    case "be":  // Belarusian
    case "bn":  // Bengali
    case "bh":  // Bihari
    case "xx-bork":  // Bork, bork, bork!
    case "bs":  // Bosnian
    case "br":  // Breton
    case "bg":  // Bulgarian
    case "km":  // Cambodian
    case "zh-CN":  // Chinese (Simplified)
    case "zh-TW":  // Chinese (Traditional)
    case "co":  // Corsican
    case "cs":  // Czech
    case "et":  // Estonian
    case "fo":  // Faroese
    case "tl":  // Filipino
    case "fy":  // Frisian
    case "ka":  // Georgian
    case "gn":  // Guarani
    case "gu":  // Gujarati
    case "is":  // Icelandic
    case "ia":  // Interlingua
    case "ga":  // Irish
    case "ja":  // Japanese
    case "kn":  // Kannada
    case "kk":  // Kazakh
    case "xx-klingon":  // Klingon
    case "ko":  // Korean
    case "ku":  // Kurdish
    case "ky":  // Kyrgyz
    case "lo":  // Laothian
    case "la":  // Latin
    case "lv":  // Latvian
    case "ln":  // Lingala
    case "lt":  // Lithuanian
    case "mk":  // Macedonian
    case "ml":  // Malayalam
    case "mr":  // Marathi
    case "mo":  // Moldavian
    case "mn":  // Mongolian
    case "ne":  // Nepali
    case "no":  // Norwegian
    case "nn":  // Norwegian (Nynorsk)
    case "oc":  // Occitan
    case "or":  // Oriya
    case "ps":  // Pashto
    case "fa":  // Persian
    case "pa":  // Punjabi
    case "qu":  // Quechua
    case "ro":  // Romanian
    case "rm":  // Romansh
    case "gd":  // Scots Gaelic
    case "sh":  // Serbo-Croatian
    case "st":  // Sesotho
    case "sn":  // Shona
    case "sd":  // Sindhi
    case "si":  // Sinhalese
    case "sl":  // Slovenian
    case "so":  // Somali
    case "sw":  // Swahili
    case "tg":  // Tajik
    case "ta":  // Tamil
    case "tt":  // Tatar
    case "te":  // Telugu
    case "ti":  // Tigrinya
    case "to":  // Tonga
    case "tk":  // Turkmen
    case "tw":  // Twi
    case "ug":  // Uighur
    case "ur":  // Urdu
    case "uz":  // Uzbek
    case "vi":  // Vietnamese
    case "cy":  // Welsh
    case "xh":  // Xhosa
    case "yi":  // Yiddish
    case "yo":  // Yoruba
    case "zu":  // Zulu
    case "en":  // English
    default:
      text = ["All image types", "Faces", "News"];
  }

  var opt, values = ["", "face", "news"];

  for (var i in values) {
    opt = menu.appendChild(document.createElement("option"));
    opt.appendChild(document.createTextNode(text[i]));
    opt.value = values[i];
    if (values[i] == imgtype) {
      opt.selected = true;
    }
  }

})()