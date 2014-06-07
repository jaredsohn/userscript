// ==UserScript==
// @name        GOL forum PLUS
// @namespace   http://www.gry-online.pl/forum_user_info.asp?ID=671384
// @include     http://www.gry-online.pl/S043.asp*
// @include     http://www.gry-online.pl/S050k.asp*
// @version     1.4
// @author      kaszanka9
// @grant       none
// @homepage      https://userscripts.org/scripts/show/173370
// @updateURL     https://userscripts.org/scripts/source/173370.meta.js
// @downloadURL   https://userscripts.org/scripts/source/173370.user.js
// @icon data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAAHnlligAAAACXBIWXMAAAsSAAALEgHS3X78AAAAYUlEQVR42pVQQQ7AIAjj4f6Ex7JN0ExCx0rqoZZaUIbIjeeYmQSzWXEJyIboUtSJc83KWGJCCN7VCD+eKlG3H8PvOgToePtqRxbqjHoqtGBvsM+CBjoBpREJjYHYgfglChdgkDXUcCPEuAAAAABJRU5ErkJggg==
// ==/UserScript==

var inject = function () {

 var execStartMS = (new Date().getTime());

 var GFP = {
   name: "GOL forum PLUS ver ",
   ver: "1.4",
   config: {
    prefix: "GFP_",
    baseUrlTopic: "http://www.gry-online.pl/S043.asp?ID=",
    baseUrlList: "http://www.gry-online.pl/S008.asp",
    baseUrlReply: "http://www.gry-online.pl/S050k.asp?ID=",
    canReply: true,
    skin: 1,
    currentUrl: "",
    page: 0,
    topicID: 0,
    style: '\
    .p6 a { color: #B5B5B5; border: 1px solid #5F5F5F; background-color: transparent;\
     font-weight: bold; border-radius: 4px 4px 4px 4px; padding: 1px 3px; }\
     .add { margin:0 auto; width:800px; position: relative; }\
     .options { margin-left: 140px; position: relative; top: -1px;}\
     .options a { background-color: #404040; border: 1px solid #585858; border-radius: 4px;\
     color: #B1B1B1; font-size: 11px; cursor: pointer; padding: 2px; text-decoration: none;}\
     .options a:hover {background-color: #515151; color: #E4E4E4; }\
     .im { width:100% }\
     .imgview { max-width: 94%; display: table; background-color: #373737; padding:2px; }\
     .imgview a { font-size: 10px; padding: 2px;}\
     .spoil2 p { display:none; font-family: monospace, sans-serif !important; }\
     .showSpoil { margin-left: 140px; background-color: #4F4F4F; padding:2px; color: #C9C9C9;  }\
     .ignore { font-size:11px !important; }\
     .myMenu { font-size: 12px; font-weight: bold; color: #196CBA; margin-left: 40px; }\
     .myMenu a { background: none; }\
     .pst3 .options { display:none; } .pst { transition: background-color 400ms linear; }\
     #settingsForm { display:none; padding: 30px; width: 600px;border-radius: 5px; }\
     #settingsForm legend { background-color: #FFFFFF;border: 1px solid #C8CCD0;border-radius: 5px;color: #556677; font-size: 20px; padding: 10px 40px; }\
     #settingsForm fieldset { background-color: #F1F2F3;border: 1px solid #556677;border-radius: 10px;display: block;padding: 10px 20px 20px 40px; }\
     #settingsForm p, #settingsForm .l { font-size:12px; margin: 4px 0 4px 4px }\
     #overlay { position: fixed; z-index:100; top: 0px; left: 0px;height:100%;width:100%;background: #000; display: none; }\
     #jumpa { left: -80px; position: absolute; top: 130px; display:none; }\
     .highL { background: #024F69 !important; }',
    template: {
     odpLink: "<a class='odp' href='#' data-id={0}>Odpowiedz</a>",
     ignoreLink: "<a data-id='{0}' class='ignore p7'>ignoruj</a>"
    }
   },
   tex: null,
   init: function () {

    this.name += this.ver;

    log("Start " + this.name);

    this.loadSettings();

    logTime("loadSettings");

    if (this.settings.instantPost) {
     if (location.href.indexOf(this.config.baseUrlReply) === -1) {
      if (location.href.indexOf("http://www.gry-online.pl/S050k.asp") === 0) {
       var jel = document.createElement('script');
       jel.text = "window.alert = function () { console.log.apply(console, arguments); };";
       document.body.appendChild(jel);
       return;
      }
     }
    }

    this.loadIgnored(); // load ignored from loc and rebuild UI

    logTime("loadIgnored");

    this.sels.$body = $("body"); // get body

    this.sels.$divs = this.sels.$body.find("#v9").children(); // post divs

    this.sels.$a = this.sels.$divs.find("a");

    if (document.cookie.indexOf("Skin=2") !== -1) {
     this.config.skin = 2; // style
    }

    if (this.config.skin == 1) {
     this.addStyle
      ('\
      .p6 a { border-color: #DADADA; color: #929292; }\
      .options a:hover { background-color: #D9EAF9; color: #1A4A70; }\
      .options a {  background-color: #FFFFFF; border-color: #E6E6E6; color: #6387B3; }\
      .imgview { background-color: #F4F7FB; }\
      .highL { background: #EFC910 !important;  }'
      );
    }

    this.initPageParams(); // page params

    logTime("initPageParams");

    this.initSettingsPanel(); // script menu

    logTime("initSettingsPanel");

    this.buildItems(); // post items data

    logTime("buildItems");

    if (this.settings.quickReply) {

     this.canReply(); // can reply topic?
     logTime("canReply");

     if (this.config.canReply) {

      if (this.settings.reply) {

       this.initOptions();
       logTime("initOptions");

       this.initReply();
       logTime("initReply");

      }

      if (this.settings.newForm) {

       this.addStyle('.inp-tit { background: #FFD200;font: 16px/20px Arial;margin-bottom: 10px;margin-top: 10px;padding: 10px 15px 10px 20px;}' +
        '.finp1 {background-color: #FFFFFF;border: 1px solid #BEBEBE;border-radius: 5px;box-shadow: 1px 1px 3px #D4D4D4;font-family: Verdana; font-size: 12px; line-height: 15px; margin-bottom: 5px; margin-left: 15px;padding: 4px 4px 4px 7px; width: 740px;}' +
        '.smiles-c {background: url("../im/smiles/smiles-compact12.png") no-repeat scroll left top transparent;float: left; padding: 5px 5px 5px 0;width: 480px; }' +
        '.smiles-c input { margin: 25px 0 0;padding: 0;text-align: center;width: 28px; }' +
        '.inp-emoti {border-bottom: 1px dotted #BEBEBE; margin-bottom: 5px; margin-left: 15px; padding-bottom: 2px;padding-left: 20px; padding-top: 2px;width: 730px; }' +
        '.inp-dis p { background: #BCBCBC; border-radius: 5px 5px 0 0;color: #FFFFFF;display: inline-block;font-family: tahoma; font-size: 11px; line-height: 11px;padding: 3px 7px;}' +
        '.but4, .but3 { background: -moz-linear-gradient(center top , #FFFFFF 0%, #EDEDED 74%, #EDEDED 99%, #FFFFFF 100%) transparent; border-color: #B0B0B0 #B0B0B0 #9A9A9A; border-radius: 4px;border-style: solid; border-width: 1px; box-shadow: 1px 1px 4px #C1C1C1; color: #1A1A1A;margin-left: 2px;margin-right: 2px; text-align: center;text-decoration: none; cursor: pointer; display: inline-block; }' +
        '.inp-dis {padding-left: 22px;}' +
        '.but4 { font: bold 16px/30px Arial;height: 30px;padding-left: 15px;padding-right: 15px;}' +
        '.but3 { font: bold 13px Arial; height: 20px;padding-left: 5px;padding-right: 5px; }' +
        '.inp-txt, .inp-txt2 { color: #A0A0A0;font-size: 13px; margin-left: 15px;}' +
        '.but4:hover, .but3:hover {background: -moz-linear-gradient(center top , #FFC600 0%, #FFD648 21%, #FFC600 69%, #FFB500 100%) transparent;border: 1px solid #BA8C00;box-shadow: 0 0 0 #6E6E6E;color: #000;text-decoration: none;}'
        +
        '.ocena-ocz .ocena-post, .ocena-gra .ocena-post { background: #D1D1D1;border-radius: 5pxx;font-size: 12px;padding: 5px; } .ocena-post-c {float: left;width: 240px;} .ocena-ocz .ocena-post p, .ocena-gra .ocena-post p {padding-left: 72px;} .ocena-ocz .ocena-post-select, .ocena-gra .ocena-post-select {color: #000;  font-size: 15px; padding: 4px; } .ocena-post-select {border-radius: 5px;color: #000; float: left;font-size: 15px; margin-right: 10px;padding: 3px; }'

       );

       this.initNewForm();
       logTime("initNewForm");
      }
      else {
       this.initAnswer();
       logTime("initAnswer");
      }

     }
    }

    this.initLinkJump();
    logTime("initLinkJump");

    if (this.settings.numbers) {
     this.initNumbers();
     logTime("initNumbers");
    }

    this.initNormalLink();
    logTime("initNormalLink");

    if (this.settings.alterColor) {
     this.addStyle('\
     .odd1 {  background-color: #FEFAE7; } .odd1 .spoil p { color: #FEFAE7 } .odd1 .spoil:hover p { color: #2F2F2F;}\
    .odd2 {  background-color: #404040; } .odd2 .spoil p { color: #404040 } .odd2 .spoil:hover p { color: #DEDCC7;}');
     this.initAlternativeRows();
     logTime("initAlternativeRows");

    }

    if (this.settings.img) {
     this.initImgLink();
     logTime("initImgLink");
    }

    if (this.settings.spoil) {
     this.initSpoil();
     logTime("initSpoil");
    }

    this.initIgnoreUI();
    logTime("initIgnoreUI");

    this.injectStyle(); //style

    logTime("injectStyle");

    if (this.settings.highLight) {

     window.onhashchange = function () {
      var hash = location.hash;

      var elm = $.grep(GFP.items, function (el, idx) {
       return ("#" + el.id) == hash;
      });

      if (elm.length == 1 && ("#" + elm[0].id) == hash) {
       GFP.highLightItem(hash);
      }
     };
     setTimeout(function () {
      window.onhashchange();
     }, 1000);

    }

   },
   buildItems: function () {
    for (var i = 0; i < this.sels.$divs.length; i++) {
     var item = this.sels.$divs[i],
      _n = item.querySelector(".p6"),
      _p = item.querySelector(".p8"),
      obj = {
       id: item.id,
       ref: item,
       name: _p.childNodes[0].innerHTML,
       p: _p,
       nitem: _n,
       n: _n.innerHTML,
       pos: i
      };
     this.items.push(obj);
    }
   },
   initReply: function () {
    $(".odp").click(function (e) {
     e.preventDefault();
     var id = $(this).attr("data-id"), item = GFP.items[id], text = '', rest = '', isLast = false, lastID = false;

     if (GFP.state.lastCommented == item.name) {
      isLast = true;
     }
     GFP.state.lastCommented = item.name;

     if (GFP.state.lastID == id) {
      lastID = true;
     }

     GFP.state.lastID = id;

     GFP.sels.$jumpa.show();

     var skip = 0;
     if (GFP.settings.skipQuote) {
      if (item.pos >= (GFP.items.length - GFP.settings.skipNum)) {
       if (GFP.settings.aMode !== 2) {
        skip = 1;
       }
      }
     }

     if ((GFP.settings.aMode + skip) == 0) {
      rest = " [" + item.n + "] " + GFP.config.currentUrl + item.id;
     }
     else if ((GFP.settings.aMode + skip) == 1) {
      rest = " [" + item.n + "]";
     }

     text = "[b]" + item.name + "[/b]" + rest + "\n\n";

     if (lastID) {
      text = "\n\n";
     }

     if (GFP.settings.quote) {
      var sel = window.getSelection();
      var sval = sel.toString();
      if (sval && sval.length > 0) {

       var t = isLast && lastID ? "[i]" + sval + "[/i]" : text + "[i]" + sval + "[/i]";

       sel.removeAllRanges();

       GFP.tex.insertAtCaret(t + "\n\n");

      }
      else {
       GFP.tex.insertAtCaret(text);
      }
     }
     else {
      GFP.tex.insertAtCaret(text);
     }

    });
   },
   initCite: function () {
    this.sels.$jumpa = this.sels.$body.find("#jumpa");
    this.sels.$jumpa.click(function (ev) {
     ev.preventDefault();
     this.style.display = "none";
     var it = GFP.items[GFP.state.lastID];
     window.scrollTo(0, it.ref.offsetTop - Math.max(100, ( window.innerHeight - it.ref.clientHeight ) / 2));

     if (GFP.settings.highLight) {
      GFP.highLightItem("#" + it.id);
     }
    });
   },
   highLightItem: function (id) {
    $(id).toggleClass("highL").animate({bg: null}, 800, function () {
     $(id).toggleClass("highL");
    });
   },
   initIgnoreUI: function () {
    for (var i = 0; i < this.items.length; i++) {
     var obj = this.items[i];
     var frag = document.createDocumentFragment();
     var href = document.createElement("a");
     href.innerHTML = f(GFP.config.template.ignoreLink, i);
     frag.appendChild(href);
     obj.ref.insertBefore(frag, obj.p);
    }

    this.sels.$divs.find('.ignore').click(function () {
     var t = $(this).data('id');
     GFP.reIgnore(GFP.items[t].name);
    });
   },
   initOptions: function () {
    for (var i = 0; i < this.items.length; i++) {

     var obj = this.items[i];

     var dive = document.createElement("div");
     dive.className = "options";
     dive.innerHTML = f(this.config.template.odpLink, i);
     var fragment = document.createDocumentFragment();
     fragment.appendChild(dive);
     obj.ref.appendChild(fragment);
    }

   },
   initNumbers: function () {
    for (var i = 0; i < this.items.length; i++) {
     var obj = this.items[i];
     obj.nitem.innerHTML = '<a href="' + GFP.config.currentUrl + obj.id + '" title="' + "Link do postu nr " + obj.n + '" >' + obj.n + '</a>';
    }
   },
   initAlternativeRows: function () {
    var className = this.config.skin === 1 ? "odd1" : "odd2";
    for (var i = 0; i < this.items.length; i++) {
     if (i % 2 === 0) {
      this.items[i].ref.classList.add(className);
     }
    }
   },
   initNormalLink: function () {
    this.sels.$a.attr("target", "_self");
   },
   initImgLink: function () {
    this.sels.$a.filter(function (i, el) {
     return el.href.match(/\.(jpg|png|gif)/i);
    }).each(function (i, el) {
      el.outerHTML = "<div class='imgview'><img class='im' src=" + el.href + " /><a href='" + el.href + "'>Link do obrazka</a></div>";
     });
   },
   initSpoil: function () {
    this.sels.$divs.find(".spoiltx").remove();
    this.sels.$divs.find(".spoil").toggleClass("spoil spoil2").prepend('<a class="showSpoil">pokaż spoiler</a>');
    $(".showSpoil").click(function () {
     $(this).hide().next("p").show();
    });

   },
   initSettingsPanel: function () {

    var htmlForm = [ '<form id="settingsForm">'
     , '<fieldset><legend>Ustawienia GOL forum PLUS</legend>'
     , '<p>Skrypt modyfikacji forum GOL Wersja ' + this.ver + '</p>'
     , '<div class="main_data">'
     , '<input type="checkbox" name="reply" value="reply" id="reply" />'
     , '<label for="reply"> Pole odpowiedzi</label></br>'
     , '<p>Dodaje pole odpowiedzi pod postami.</p>'
     , '<input type="checkbox" name="quickReply" value="quickReply" id="quickReply" />'
     , '<label for="quickReply"> Szybka odpowiedź</label></br>'
     , '<p>Dodaje przycisk "Odpowiedz" przy każdym poście, wymaga aktywnej funkcji "Pole odpowiedzi".</p>'
     , '<input type="checkbox" name="instantPost" value="instantPost" id="instantPost" />'
     , '<label for="instantPost"> Przeładowanie po odpowiedzi</label></br>'
     , '<p>Przeładowuje automatycznie stronę po odpowiedzi. Nigdy więcej klikania.</p>'
     , '<label>Tryb odpowiedzi</label>'
     , '<div class="l"><input type="radio" name="aMode" value="0"> Nick + numer postu + link do postu<br>',
     '<input type="radio" name="aMode" value="1"> Nick + numer postu<br>',
     '<input type="radio" name="aMode" value="2"> Nick</div>',
     , '<p>Umożliwia wybranie trybu odpowiedzi przy pierwszej odpowiedzi lub cytowaniu. UWAGA. Wybranie innej opcji niż nr 1 uniemożliwia szybkie śledzenie wypowiedzi!</p>'
     , '<input type="checkbox" name="quote" value="quote" id="quote" />'
     , '<label for="quote"> Cytowanie selektywne</label></br>'
     , '<p>Umożliwia zaznaczanie fragmentów wypowiedzi w celu cytowania.</p>'
     , '<input type="checkbox" name="skipQuote" value="skipQuote" id="skipQuote" />'
     , '<label for="skipQuote">Pomiń linki dla bliskich postów Ilość:</label> <input type="text" name="skipNum" id="skipNum" value="" /></br>'
     , '<p>Pomija dodawanie linku do postu, jeżeli jest on blisko własnej odpowiedzi, w praktyce zwiększa chwilowo tryb o 1.</p>'
     , '<input type="checkbox" name="alterColor" value="alterColor" id="alterColor" />'
     , '<label for="alterColor"> Alternatywne kolory</label></br>'
     , '<p>Dodaje naprzemienne kolorowanie postów.</p>',
     , '<input type="checkbox" name="numbers" value="numbers" id="numbers" />'
     , '<label for="numbers"> Linki do postów</label></br>'
     , '<p>Zamienia numery postów w linki do tych postów.</p>'
     , '<input type="checkbox" name="img" value="img" id="img" />'
     , '<label for="img"> Obrazki w postach</label></br>'
     , '<p>Zamienia linki do plików jpg/png/gif na obrazki.</p>'
     , '<input type="checkbox" name="spoil" value="spoil" id="spoil" />'
     , '<label for="spoil"> Nowy spolier</label></br>'
     , '<p>Zamienia spoiler na nowy.</p>'
     , '</div><div class="butts"><input type="submit" value="Zapisz" />'
     , '</div></br><p>Wątek wsparcia <a href="http://www.gry-online.pl/S043.asp?ID=12800089&N=1">http://www.gry-online.pl/S043.asp?ID=12800089&N=1</a></br>Aktualna wersja skryptu <a href="http://userscripts.org/scripts/show/173370">http://userscripts.org/scripts/show/173370</a></p></fieldset></form>'];

    var hdata = htmlForm.join("");

    this.sels.$body.find('.topshad').after(hdata);
    this.sels.$settingsForm = $("#settingsForm");

    var elems = GFP.sels.$settingsForm[0].elements;

    elems['reply'].checked = GFP.settings.reply;
    elems['quickReply'].checked = GFP.settings.quickReply;
    elems['img'].checked = GFP.settings.img;
    elems['numbers'].checked = GFP.settings.numbers;
    elems['alterColor'].checked = GFP.settings.alterColor;
    elems['spoil'].checked = GFP.settings.spoil;
    elems['quote'].checked = GFP.settings.quote;
    elems['aMode'][GFP.settings.aMode].checked = true;
    //    elems['ajaxFresh'].checked = GFP.settings.ajaxFresh;
    elems['instantPost'].checked = GFP.settings.instantPost;
    elems['skipQuote'].checked = GFP.settings.skipQuote;
    elems['skipNum'].value = GFP.settings.skipNum;

    this.sels.$settingsForm.find("#reply").change(function (ev) {
     if (!elems['reply'].checked) {
      elems['quickReply'].checked = false;
      elems['instantPost'].checked = false;
      elems['quote'].checked = false;
     }
    });

    this.sels.$settingsForm.find("#quickReply").change(function (ev) {
     if (!elems['reply'].checked) {
      elems['quickReply'].checked = false;
     }
    });
    this.sels.$settingsForm.find("#instantPost").change(function (ev) {
     if (!elems['reply'].checked) {
      elems['instantPost'].checked = false;
     }
    });
    this.sels.$settingsForm.find("#quote").change(function (ev) {
     if (!elems['reply'].checked) {
      elems['quote'].checked = false;
     }
    });

    this.sels.$body.append('<div id="overlay"></div>');
    this.sels.$over = $("#overlay");

    this.sels.$over.click(function () {
     GFP.sels.$over.fadeOut(200);
     GFP.sels.$settingsForm.hide();
    });

    this.sels.$settingsForm.submit(function (ev) {
     ev.preventDefault();
     var newsetts = {};
     GFP.sels.$settingsForm.find(":checkbox").each(function (i, el) {
      var settingName = el.name, settingValue = el.checked;
      newsetts[settingName] = settingValue;
     });

     newsetts.aMode = GFP.sels.$settingsForm[0].querySelector('input[name="aMode"]:checked').value;
     newsetts.skipNum = elems['skipNum'].value;

     $.extend(GFP.settings, newsetts);

     localStorage.setItem(GFP.config.prefix + "_settings", JSON.stringify(GFP.settings));

     GFP.sels.$over.click();

    });

    $(".gmd ul").append("<li class='myMenu'>" + this.name + "<a>Opcje</a></li>");

    $(".myMenu a").click(function () {

     GFP.sels.$over.fadeTo(200, 0.7);

     var modal_height = GFP.sels.$settingsForm.outerHeight();
     var modal_width = GFP.sels.$settingsForm.outerWidth();

     GFP.sels.$settingsForm.css({

      'display': 'block',
      'position': 'absolute',
      'opacity': 0,
      'z-index': 1000,
      'left': 50 + '%',
      'margin-left': -(modal_width / 2) + "px",
      'top': "100px"

     });

     GFP.sels.$settingsForm.fadeTo(200, 1);
    });
   },
   initAnswer: function () {
    setTimeout(function () {

     var answer = $('[id="v8"]')[1];

     var inElem = $('<div class="add"><a id="jumpa" class="butt4">Do góry</a><iframe height="525" width="800" frameborder=0 id="ifr"></iframe></div>');

     inElem.insertAfter(answer);

     GFP.initCite();

     var fr = $("#ifr");
     fr.attr("src", GFP.config.baseUrlReply + GFP.config.topicID);
     fr.load(function () {
      var con = fr.contents();
      GFP.tex = con.find('textarea[name="FORUM_TRESC"]');
      var bd = con.find("body");
      bd.css("background-color", "transparent");

      if (bd[0].getAttribute("onload") === "showPopup(1)") {
       if (GFP.settings.ajaxFresh) {
        GFP.tex.value = "";
       }
       else {
        location.reload();
       }

      }
     });

    }, 1);
   },
   initNewForm: function () {
    var answer = $('[id="v8"]')[1];

    var inElem = $('<div class="add"><a id="jumpa" class="butt4">Do góry</a>' +
      '<div id="Hform"></div>'
      + '</div>'
     )
     ;

    inElem.insertAfter(answer);

    $("#Hform").load(this.config.baseUrlReply + this.config.topicID + " #FORUM");

    GFP.initCite();
   },
   initLinkJump: function () {
    this.sels.$divs.find('a[href*="#post0-"]').text("Skocz do postu");
   },
   initPageParams: function () {
    var step1 = $("link[rel=canonical]").attr("href").split("ID=")[1],
     urlID = "",
     pagE = "",
     step2 = step1.split("&PAGE=");

    if (step2.length > 1) {
     urlID = step2[0];
     pagE = step2[1];

     this.config.page = pagE;

     pagE = "&PAGE=" + pagE;
    }
    else {
     urlID = step1;
    }

    this.config.topicID = urlID;
    this.config.currentUrl = this.config.baseUrlTopic + urlID + pagE + "&N=1#";

   },
   injectStyle: function () {
    var head = document.getElementsByTagName('body')[0];
    if (!head) {
     return;
    }
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = this.config.style;
    head.appendChild(style);
   },
   loadSettings: function () {

    var val = localStorage.getItem(this.config.prefix + "_settings");
    if (val !== null) {
     $.extend(this.settings, JSON.parse(val));
    }
   },
   loadIgnored: function () {
    var val = localStorage.getItem(this.config.prefix + "_ignored");
    if (val !== null) {
     this.ignored = JSON.parse(val);
    }
    if (this.ignored !== null && this.ignored.length > 0) {
     for (var i = 0; i < this.items.length; i++) {
      if (this.ignored.indexOf(this.items[i].name) !== -1) {
       this.items[i].ref.classList.add("pst3");
      }
     }
    }
   },
   reIgnore: function (name) {
    var idx = this.ignored.indexOf(name);
    if (idx == -1) {
     this.ignored.push(name);
    }
    else {
     this.ignored.splice(idx, 1);
    }
    for (var i = 0; i < this.items.length; i++) {
     if (this.items[i].name == name) {
      if (idx == -1) {
       this.items[i].ref.classList.add("pst3");
      }
      else {
       this.items[i].ref.classList.remove("pst3")
      }
     }
    }

    localStorage.setItem(this.config.prefix + "_ignored", JSON.stringify(this.ignored));
   },
   canReply: function () {
    this.config.canReply = this.sels.$body.find("#moderuj-odpowiedz")[0].style.display !== "none";
   },
   addStyle: function (style) {
    this.config.style += style;
   },
   log: function (obj) {
    console.log(obj);
   },

   sels: {}, ignored: [], items: [], settings: {
    quickReply: true, reply: true, alterColor: true, img: true, spoil: true, numbers: true, quote: true, aMode: 0,
    ajaxFresh: false, newForm: false, highLight: true, instantPost: true, skipQuote: true, skipNum: 5
   },
   state: {
    lastCommented: null, lastID: null
   }
  }
  ;

 GFP.init();

 logTime("Ready");

// log(GFP);

 $.fn.insertAtCaret = function (text) {
  return this.each(function () {
   if (document.selection && this.tagName === 'TEXTAREA') {
    this.focus();
    var sel = document.selection.createRange();
    sel.text = text;
    this.focus();
   } else if (this.selectionStart || this.selectionStart === '0') {
    var startPos = this.selectionStart;
    var endPos = this.selectionEnd;
    var scrollTop = this.scrollTop;
    this.value = this.value.substring(0, startPos) + text + this.value.substring(endPos, this.value.length);
    this.focus();
    this.selectionStart = startPos + text.length;
    this.selectionEnd = startPos + text.length;
    this.scrollTop = scrollTop;
   } else {
    this.value += text;
    this.focus();
    this.value = this.value;
   }
  });
 };

 function log(input) {
  console.log(input);
 }

 function logTime(text) {
  //log(text + ": " + ((new Date().getTime()) - execStartMS) + "ms");
 }

 function f(s) {
  var args = Array.prototype.slice.call(arguments, 1);
  var i = args.length;
  while (i--) {
   s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), args[i]);
  }
  return s;
 }

};

var script = document.createElement('script');
script.type = "text/javascript";
script.charset = "utf-8";
script.textContent = '(' + inject.toString() + ')();';
document.body.appendChild(script);