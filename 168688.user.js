// ==UserScript==
// @name        _Dodatker
// @match       http://*.wykop.pl/*
// @match       https://*.wykop.pl/*
// @include     http://*wykop.pl*
// @include     https://*wykop.pl*
// @version     BETA
// @description Dodatek, który ułatwia tworzenie dodatków oraz zarządzanie nimi
// @namespace   MS
// ==/UserScript==
/*jslint nomen:true, continue: true, regexp: true, browser: true*/

var dodatkerCreator = function ($) {
    "use strict";

    var
        //obiekt bedacy zbiorem zarejestrowanych dodatkow
        addonsList = {},

        //obiekt, ktory bedzie reprezentowac Dodatkera na zewnatrz
        Dodatker,

        //a tu obiekt, ktory bedzie sercem Dodatkera w srodku tej funkcji,
        //czyli zbior modulow z ktorych zostanie potem wybrane publiczne API
        _core = {},

        //usprawniony typeof, ktory korzysta z [[Class]] bo przeciez ten wbudowany to nieporozumienie
        type,

        //sprawdzenie czy funkcja wykonuje sie w poprawnym kontekscie
        contextCheck,

        //klucz pod ktorym bedzie zapisywanie rzeczy do pamieci
        STORAGE_KEY = "DodatkerStorage",

        //obiekt reprezentujacy Dodatker jako addon
        dodatker,

        //ikonka Dodatkera, podziękowania dla @mikebo (wersja dla Wykop) i @mielon (wersja dla Strims), podziękowania takze dla @white_duck. Dzieki, chlopaki!
        dodatkerImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QUYESsUTne1AgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAADUElEQVQ4y6WVT0xcVRTGf+CAUYqlaZDGP0Wx2kaxGFJCbNpMjbOQ2A0JLIwb2OCCmNFF187abti4IBjAhURZkExUosEodEcNU1OYdKh0UiHQwRnhDcI83ps393PzpqHjDG3qSe7m3nN/777vfudcqBDxeLxW0hVJ140xWUlRSSf5P5FKpeqMMbMqCWPMVjqdPvfY4Hw+f1WScrlcenR09NNQKPT++vr6NUmybfvPzs7OZx4LLCkuSUNDQx8B54Bjvb29R4wxdyWpr6/vPaDqMEa1pCbbti8dHIAL0Nra2gLcBrbHxsZeBo5LUkdHx6nNzc2Q67rth50upQpRKBQKg4ODzQDGmGvlcpaXly+U4waAJoBMJnOjjNY7k5OTJ4ENSd/u7u4edxzHAWhoaHg1EAgcmZ2dbQNiQK70xJKkYDDYFQ6HLwOtJePMAT1PAGeBVsuyfpOkiYmJK1NTU22SniwLPmCpn3O53POPcMG/luxbeUDz4oLrujuu6+5Ikud5K9FotP5RwJ7n2blcLuXD/0kkEqeLCV+m0+nrwWCwq6enp8u27aQkzc/PR4DqSuBCofBxNpu91d/f39PY2Hgxk8n8JEkbGxs/ALXFvFeAN4Eax3E+kKS1tbVfgBceosgJoB2ocxznjP/n28Br1YlEol7S38AikA8EAi0AjuNsA3WViJFIJJBKpYzviD1jzHMAtm1bwFGMMbeNMRnbti9JuiwpJ0kjIyOfAKcO0fgrY4zrOM6Hks4aY1YkKRaLjQDtlDP9nTt3vgfOLyws9Hme94Wk7/L5fETSU5VcIUlbW1s3m5ub3wFe5MDkjWw2uzwzM/N5fX39xWQyGS1jxVtFKxbBlmUlLMv6Ix6Pf9PS0vKu7/Pq+2DgvH+Bby0uLl71Szq/tLT0dTQa/Wxvb29Nkvb392NAbRE8PDw86MPafOlqHvCxD67x+8JNSYpGoxHgbeCl8fHxN4wxliQNDAxcKAH/p43e92koFDoWi8UaU6nUs8Xutrq6+hewAtzt7u6+V1VVtQ+QTCaPuq779MNKs2K4rrsTDoeb/LzJcjkVTyzpx0of9TzPnp6ePg08AVhl1nfn5ubuldtb7FqvAw2VXiq/CAp+hTaVVjfwO+AcnPwXtJQbI0SNXwUAAAAASUVORK5CYII=",
        dodatkerImg2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QUYETAI80Ai1wAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAADb0lEQVQ4y72UX2jbVRTHv+f8fr8kW/rPuiXIoA8LbXWbCI7pumZLwIEi0idb2UPdBDe3mc0Ha2etQqROyeqDD1XbQvFBKswymYI4mdg/i6uinSAOpjAdk4kxo92mSdrk9zvHhyRdJWkbfPDAhd89v3s/9/A9934Jy8Tm9qir3ud+jtRsV0YzqUxITo/Eh1+8igqCyiX9nV3eptr1nzI4tDQvInM5m3Z/Pdx9YTUwl0s2VfuiDA6Jyu9ZZB/J3Uz5RfRjZr7D7cKH4XDU/E9gYnoUAOA4HdMDvZ+ffz/652wy3QGRKwAFZJN512pgc8vTL/nrPGvu+RdYNAsmANgE4CsAqPF7miG8TgSqrIFgpC9gZ923lpOFQpHYHwD7yx4rcOZvuuu/GT16a1ckNkXgnSWA3MK2iaGXvyupuAgVyGTJJqLZv7Oz83lZ9KQSPMqSzmvI9wGog2VULVNxvwIAZVPrbcNdE3+355dKrlPo2f5xEMIQp81RvRi/4r2Gz44ulDRPXd6kYZiXdx6OfdFysHcDKg02PjEM83IoMH9x+4ET95eARWROROaY+SHLrBlvaW9fUwlXRNICuQpQwG3SZPDQGxsBgB04I6pyNm1nmtK2vRmiPxG40brzgSdXBJLzEYAZVbl3NpFpFNVTYFQxG31lX17wmRN7DIs+AHRscqC7o1JFWg/1NZuG55JCklMDx3zc2tZdHd4XrVtcYelGAFBQciVQOBw1d3RGfcW5odiwdJ9pNKybUdX6YKTvccd2VxGoN38/5fSKUmxZO2II7QlG+vfRPH4kU4cL2p4EAJNAjSCCAc+4UXAAR/FefOjY2dbI620GrIdJpUFJZnKJC7HpsbEMAJBSAzEsAKPw5FUVwXn7+rf9hQdS7C6miFENG0PxS6mRUCQ2DPD+gnmAwI+5fNueaDnYtHt68Pi1JcXPQGGCnC9//uv6K4nCwYvgc++8sGiRwSNvPg/V/SLIseItR/R7tvRVIr7bNOpOAdh+23ftrom3eybKPOkyd16cvSAGif3U5GDPKADsOvxaHOz+gQkPbj1wfHV3K34s7TARZ/Ottn4r5nJJO+XyWwsAw53JOWK6XEwV+LFV600UB4CtAKDqnPZ3dnkBwOVfO1g0LKvWm2DGjpWNXvTMsj8ZqdszvVFmyY1sxvkV/2f8A9m7WkHDISSLAAAAAElFTkSuQmCC",

        //style Dodatkera
        style = $("<style />", {
            type: "text/css",
            html: (function (nightMode) {
                var style = ".DodatkerNoBorder {border: none !important;} .DodatkerError {color: #C91414;}\n" +
                    ".DodatkerNoPadding {padding: 0 !important;}\n" +
                    "#addonsNotificationsBtn > span.icon { background-image: url(" + dodatkerImg + "); width: 23px; height: 23px;}\n";

                if (!nightMode) {
                    style += " #addonsNotificationsBtn:hover > span.icon, #addonsNotificationsBtn.active > span.icon {background-image: url(" + dodatkerImg2 + ");}";
                }

                return style;
            }(window.nightmode))
        }).appendTo($("head"));

    //przyszedl czas na bebechy Dodatkera

    //modul uzytkowy
    _core.utils = {
        //usprawniony typeof
        getTypeOf: function (obj) {
            return Object.prototype.toString.call(obj).match(/\[Object ([A-Za-z]+)\]/i)[1].toLowerCase();
        },
        //funkcja sprawdzajaca czy przekazany obiekt zawiera wszystkie okreslone
        //wlasciwosci i czy sa one dobrego typu. Zwraca true/false, w przypadku
        //niepowodzenia ustawia wynik w this.fieldsCheckResult
        fieldsCheck: function (obj, fields, protoProps) {
            /*jslint forin: true*/
            var i,
                res = {};

            protoProps = protoProps || false;

            if (_core.utils.getTypeOf(obj) !== "object") {
                return false;
            }

            for (i in fields) {
                //jesli nie szukamy w lancuchu prototypow i obiekt nie ma wlasnosci i, przejdz dalej
                //JSLint bedzie na pewno o to jeczec, no ale trudno :> (dodano potem: jednak nie bedzie :>)
                if (protoProps === false && !fields.hasOwnProperty(i)) {
                    continue;
                }

                if (type(obj[i]) !== fields[i]) {
                    //w razie gdyby czegos obiektowi brakowalo, ustaw wynik sprawdzenia w this.fieldsCheckResult
                    res.fieldName = i;
                    res.givenType = type(obj[i]);
                    res.properType = fields[i];

                    this.fieldsCheckResult = res;

                    return false;
                }
            }
            return true;
        },
        fieldsCheckResult: null,
        //wzorce dla poszczegolnych podstron
        pagesPatterns: {
            glowna: /\.pl(\/(najnowsze|aktywne|))?$/,
            ustawienia: /\.pl\/ludzie\/(ustawienia|edytuj|zmien-haslo|zmien-email|zmien-avatar|sesje|czarne-listy|listy-ulubionych)\/\w+(\/(#\w*)?)?$/,
            mikro: /\.pl\/mikroblog(\/(#\w*)?)/,
            mirko: /\.pl\/mikroblog(\/(#\w*)?)/, //( ͡° ͜ʖ ͡°)
            mikroblog: /\.pl\/mikroblog(\/(#\w*)?)/,
            wpis: /\.pl\/wpis\/\d+(\/(#\w*)?)/,
            tag: /\.pl\/tag(\/(#\w*)?)/,
            profil: /\.pl\/ludzie\/\w+(\/(#\w*)?)/,
            wykopalisko: /\.pl\/wykopalisko(\/(#\w*)?)/,
            ramka: /\.pl\/ramka\/\d+(\/(#\w*)?)/,
            link: /\.pl\/link\/\d+(\/(#\w*)?)/,
            hity: /\.pl\/hity(\/(#\w*)?)/,
            powiadomienia: /\.pl\/powiadomienia\/do-mnie(\/(#\w*)?)/,
            powiadomienia_domnie: /\.pl\/powiadomienia\/do-mnie(\/(#\w*)?)/,
            powiadomienia_wszystkie: /\.pl\/powiadomienia(\/(#\w*)?)$/,
            powiadomienia_tagi: /\.pl\/powiadomienia\/tagi(\/(#\w*)?)/,
            powiadomienia_kanaly: /\.pl\/powiadomienia\/channels(\/(#\w*)?)/,
            pw: /\.pl\/wiadomosc-prywatna(\/(#\w*)?)/,
            dodatki: /\.pl\/dodatki(\/(#\w*)?)/,
            ulubione: /\.pl\/ulubione(\/(#\w*)?)/,
            ranking: /\.pl\/ranking(\/(#\w*)?)/,
            gorace: /\.pl\/mikroblog\/hot(\/(#\w*)?)/,
            dodaj: /\.pl\/dodaj(\/(#\w*)?)/,
            szukaj: /\.pl\/szukaj(\/(#\w*)?)/
        },
        //sprawdza czy obiekt obj moze byc zarejestrowany w tablicy objArray pod identyfikatorem objID
        //sprawdzenie odbywa sie rowniez pod katem obowiazkowych pol requiredFields. Jesli cos jest nie tak,
        //funkcja rzuca wyjatek
        registerObject: function (obj, objArray, objID, requiredFields) {
            var res;
            if (type(obj) !== "object") {
                _core.utils.error("Parametr powinien być obiektem");
            }

            if (!this.fieldsCheck(obj, requiredFields)) {
                res = this.fieldsCheckResult;
                _core.utils.error("Obiekt wymaga własności {0} typu {1}. Przekazano {2}.".format(res.fieldName, res.properType, res.givenType));
            }

            if (type(objArray[objID]) !== "undefined") {
                _core.utils.error("Obiekt o identyfikatorze '{0}' już istnieje!".format(objID));
            }
        },
        //funkcja zwracajaca true/false jako odpowiedz na pytanie czy znajdujemy sie obecnie w czesci serwisu page
        //lista stron dostepna w _core.utils.pagesPatterns lub w dokumentacji
        isPage: function (page) {
            /*jslint white: true*/
            //^ bo VS2012 inaczej formatuje switch niz by jslint chcial
            var
                //lista czesci serwisu do sprawdzenia
                pages,

                //znaleziono?
                found = false,

                //zeby ciagle nie zmuszac silnika do przeszukiwania zasiegow ;)
                address = window.location.href,
                patterns = _core.utils.pagesPatterns;

            //sprawdzamy czy jestesmy w danej czesci serwisu. Jesli przekazane jako array to
            //Dodatker sprawdzi czy znajdujemy sie w ktorejkolwiek z przekazanych czesci

            switch (type(page)) {
                case "array":
                    pages = page;
                    break;

                case "string":
                    pages = [page];
                    break;

                default:
                    _core.utils.error("Argument musi byc stringiem lub tablica");
                    break;
            }

            //dla kazdej strony przekazanej w argumencie
            try {
                $.each(pages, function (index, page) {
                    //sprawdz czy wyrazenie regularne pasuje
                    if (type(patterns[page]) === "regexp") {
                        if (patterns[page].test(address)) {
                            found = true;

                            //zakonczenie dalszego sprawdzania
                            throw {};
                        }
                    }
                });
            } catch (e) {

            }

            //zwroc rezultat
            return found;
        },
        //exception handler, poki co troche bidny, zobaczymy, moze kiedys jakis popup sie zrobi?
        error: function (msg) {
            throw new Error(msg);
        },
        //sprawdza czy that jest instancja constructor (domyslnie Dodatkera)
        contextCheck: function (that, constructor) {
            constructor = constructor || Dodatker;

            if (!(that instanceof constructor)) {
                this.error("Próba wywołania funkcji w nieodpowiednim kontekście");
            }
        },
        //zwraca nick uzytkownika
        getUsr: (function ($) {
            var selector = $("div.quickpoint").has("img.imgavatar"),
                nick;

            //pobierz nick, jesli niezalogowany to pusty
            if (selector.length === 0) {
                nick = "";
            } else {
                nick = selector.children("a").attr("title");
            }

            //skorzystaj z domkniecia, zeby zaden zlosliwy dodatek nie mogl podmienic nicku
            return function () {
                return nick;
            };
        }($))
    };

    //maly shorthand
    type = _core.utils.getTypeOf;

    //i kolejny
    contextCheck = $.proxy(_core.utils.contextCheck, _core.utils);

    if (type(String.prototype.format) === "undefined") {
        //formatowanie stringow, zamiana {n} na n-ty argument
        String.prototype.format = function () {
            var args = arguments;
            //modyfikowanie wbudowanego prototypu, zuoooooooo
            //dzieci, nie robcie tego w domu!
            return this.replace(/\{(\d+)\}/g, function (match, number) {
                return (args[number] !== undefined) ? args[number] : match;
            });
        };
    }

    //modul uzywany do zarzadzania danymi zapisywanymi przez Dodatker w pamieci podrecznej
    _core.storage = (function () {
        var
            //odwzorowanie local storage'a
            storageObj = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
                //domyslny local storage
                config: {},
                notifications: {
                    unread: 0,
                    list: []
                }
            },

            //setter i getter storage'a
            storage = function (where, val) {
                var
                    //tablica ze sciezka
                    path,

                    //aktualna lokalizacja, zaczynamy od korzenia
                    location = storageObj,

                    //element nadrzedny aktualnej lokalizacji
                    locationSuper,

                    //dlugosc tablicy path
                    len,

                    //zmienna iterujaca
                    i;

                //pierwszym parametrem musi byc string - sciezka do obiektu w storage
                if (type(where) !== "string") {
                    //dev:
                    /*if (arguments.length === 0) {
                        return JSON.parse(JSON.stringify(storageObj));
                    }*/

                    _core.utils.error("Uzycie funkcji z niewlasciwym argumentem");
                }

                path = where.split(".");
                len = path.length;

                if (len === 0) {
                    return null;
                }

                //dla kazdego wezla w sciezce
                for (i = 0; i < len; i += 1) {
                    if (type(location[path[i]]) === "undefined") {
                        //jesli wezel nie istnieje, a tylko odczytujemy zwroc null
                        if (arguments.length === 1) {
                            return null;
                        }

                        //w przeciwnym wypadku (kiedy zapisujemy) utworz wezel
                        location[path[i]] = {};
                    }

                    //zapisz odwolanie do nowego wezla i do jego rodzica
                    locationSuper = location;
                    location = location[path[i]];
                }

                //jesli setter
                if (arguments.length > 1) {
                    locationSuper[path[i - 1]] = val;
                    storage.save();
                }

                //zwroc wynik
                return JSON.parse(JSON.stringify(locationSuper[path[i - 1]]));
            };

        //zapisuje odwzorowanie storage'a
        storage.save = function () {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(storageObj));
        };

        //odswieza odwzrorowanie storage'a
        storage.refresh = function () {
            storageObj = JSON.parse(localStorage.getItem(STORAGE_KEY));
        };

        //obsluga eventu zmiany storage'a
        $(window).on("storage", function (e) {
            var ev = e.originalEvent;

            //interesuja nas tylko zmiany zwiazane z Dodatkerem
            if (ev.key === STORAGE_KEY) {
                storage.refresh();
                _core.notifications.getUnreadNotificationsCount();
            }
        });

        return storage;
    }());

    //modul do obslugi ustawien dodatkow
    _core.config = (function () {
        var
            //dodaje widget do listy widgetow danego dodatku
            setWidget,

            //dodaje widget do listy widgetow danego dodatku, przyjmuje jako argument tablice widgetow
            setWidgets,

            //generuje nazwe widgetu
            genName = function (name) {
                return Math.random().toString().split('.')[1] + "_" + name;
            },

            //lista widgetow
            widgets = {},

            //rejestracja nowego widgetu
            registerWidget,

            //fabryka widgetow
            widgetFactory,

            //wyswietlanie menu konfiguracji
            displayConfig,

            //pobranie opcji
            getOpt = function (optname, defval) {
                //to,co zostanie zwrocone
                var ret;

                //sprawdz kontekst wywolania
                contextCheck(this);

                //pobierz opcje ze storage'a
                ret = _core.storage("config.{0}.{1}".format(this.name, optname));
                if (ret === null && type(defval) !== "undefined") {
                    //jesli nic nie znaleziono, a przekazano wartosc domyslna, ustaw ja do zwrotu
                    ret = defval;
                }

                //zwroc wartosc
                return ret;
            },

            //ustawienie opcji
            setOpt = function (optname, val) {
                //sprawdz kontekst wywolania
                contextCheck(this);

                //ustaw opcje i zwroc ustawiona wartosc
                return _core.storage("config.{0}.{1}".format(this.name, optname), val);
            };

        //jesli jestesmy na stronie ustawien przygotuj wszystko do obslugi konfiguracji
        if (_core.utils.isPage("ustawienia")) {
            setWidget = function (widget, params, defval) {
                //sprawdz kontekst wywolania
                contextCheck(this);

                //zabezpiecz przed niepoprawnym wywolaniem
                if (type(widget) !== "string") {
                    _core.utils.error("Należy wybrać widget! (parametr widget)");
                }

                if (type(widgets[widget]) === "undefined") {
                    _core.utils.error("Widget o nazwie {0} nie istnieje!".format(widget));
                }

                //dodaj widget do listy
                this.widgetsArray.push({
                    widget: widget,
                    params: params || null
                });

                //jesli przekazano domyslna wartosc widgetu, a jego odwzorowanie nie istnieje
                //w storage, wrzuc tam domyslna wartosc
                if (type(defval) !== "undefined" && this.getOpt(params.name) === null) {
                    this.setOpt(params.name, defval);
                }
            };

            setWidgets = function (widgetsArray) {
                var that = this;

                //sprawdz poprawnosc wywolania
                if (type(widgetsArray) !== "array") {
                    return;
                }

                //dla kazdego widgetu wywolaj setWidget()
                $.each(widgetsArray, function (index, widget) {
                    setWidget.call(that, widget.widget, widget.params, widget.defval);
                });
            };

            registerWidget = function (name, Widget, prototype) {
                //zabezpiecz przed niepoprawnym wywolaniem
                if (type(Widget) !== "function") {
                    _core.utils.error("Zmienna Widget musi być funkcją konstruującą");
                }

                if (type(widgets[name]) !== "undefined") {
                    _core.utils.error("Widget o nazwie {0} został już zarejestrowany".format(name));
                }

                if (type(prototype) === "object") {
                    Widget.prototype = prototype;
                }

                //jesli wszystko ok, zarejestruj widget
                widgets[name] = Widget;
            };

            widgetFactory = function (widgetName, params, actualConfig) {
                var
                    //widget ktory bedzie zwrocony
                    retWidget,

                    //obowiazkowe pola widgetow
                    requiredFields = {
                        name: "string",
                        html: "object",
                        getVal: "function",
                        invalid: "string"
                    };

                //sprawdz, czy istnieje funkcja, ktora utworzy widget
                if (type(widgets[widgetName]) !== "function") {
                    _core.utils.error("Nie znaleziono widgetu {0}".format(widgetName));
                }

                //utworz
                retWidget = new widgets[widgetName](params, actualConfig);

                //zabezpieczenie przed niepoprawnymi customowymi widgetami - instancje widgetow musza miec wlasciwosci zawarte w requiredFields
                //dodatkowo html musi byc instancja jQuery
                if (!_core.utils.fieldsCheck(retWidget, requiredFields, true) || !(retWidget.html instanceof $)) {
                    _core.utils.error("Błąd po utworzeniu widgetu - widget nie zawiera obowiązkowych pól lub są one niepoprawne");
                }

                return retWidget;
            };

            displayConfig = function () {
                //div calosci konfiguracji
                var mainDiv = $("<div />", {
                    "class": "bgfa brbotte8 pding10"
                });

                $(".filters")
                    .children()
                    //zmien przycisk na pogrubiony
                    .removeClass("fbold")
                    .last().addClass("fbold")
                    .end()
                    .end()
                    .siblings()
                    //usun cala zawartosc oryginalnego diva
                    .each(function () {
                        $(this).remove();
                    });
                //maindiv.html("");
                mainDiv.append($("<h3 />", {
                    "class": "xx-large lheight20",
                    html: "Dodatki obsługujące ustawienia:"
                }));

                //dorzuc ustawienia dodatkow
                $.each(addonsList, function (index, addon) {
                    var addonDiv,
                        configDiv,
                        renderedWidgets = [];

                    //jesli dodatek nie ma ustawionych widgetow - pomin
                    if (addon.widgetsArray.length === 0) {
                        return;
                    }

                    //utworz html konfiguracji dodatku
                    addonDiv = $("<div />", {
                        "class": "fblock margin10_0 marginbott20",
                        html: $("<fieldset />", {
                            "class": "bgf6f6f6 pding5",
                            html: $("<div />", {
                                "class": "fleft DodatkerNoBorder",
                                html: $("<h3 />", {
                                    "class": "large fbold",
                                    html: addon.name
                                })
                                    .add($("<br />"))
                                    .add("<span />", {
                                        "class": "marginleft5",
                                        html: "Autor: {0}".format(addon.author)
                                    })
                                    .add($("<br />"))
                                    .add("<span />", {
                                        "class": "marginleft5",
                                        html: "Wersja: {0}".format(addon.version)
                                    })
                            })
                        })
                    });

                    //panel konfiguracji dodatku
                    configDiv = $("<div />", {
                        "class": "fleft"
                    });

                    $.each(addon.widgetsArray, function (index, widget) {
                        //kazdy zapisany widget utworz...
                        var newWidget = widgetFactory(widget.widget, widget.params, _core.storage("config.{0}.{1}".format(addon.name, widget.params.name)));

                        //...dopisz do listy...
                        renderedWidgets.push(newWidget);

                        //...i wyrenderuj
                        configDiv.append(newWidget.html).append("<br />").append("<br />");
                    });

                    //przycisk "zapisz"
                    configDiv.append($("<input />", {
                        type: "button",
                        value: "Zapisz"
                    }).on('click', function () {
                        var
                            //zbior wartosci
                            vals = {},

                            //przycisk "Zapisz"
                            submitBtn = configDiv.find("input[value='Zapisz']"),

                            //flaga mowiaca czy formularz jest poprawny
                            formValid = true,

                            //zbior niepoprawnych widgetow
                            invalidWidgets = [],

                            //element html odpowiadajacy za wyswietlenie bledu
                            error,

                            //zabezpieczenie przed dziwnymi nazwami dodatkow

                            errDivId = function (name) {
                                return "{0}{1}-errors".format(name).replace(/([^\w\-])/g, '');
                            };

                        //zbierz wartosci z wszystkich widgetow
                        $.each(renderedWidgets, function (index, widget) {
                            var valueIsValid;

                            if (type(widget.validate) === "function") {
                                valueIsValid = widget.validate();
                            } else {
                                valueIsValid = true;
                            }

                            //jesli wartosc niepoprawna, zapisz sobie widget, zajmiemy sie nim pozniej
                            if (!valueIsValid) {
                                invalidWidgets.push(widget);
                            }

                            vals[widget.name] = widget.getVal();
                            formValid = formValid && valueIsValid;
                        });

                        //jesli formularz poprawny
                        if (formValid) {
                            //usun powiadomienie o bledach
                            error = $("#{0}".format(errDivId(addon.name)));
                            if (error.length > 0) {
                                error.remove();
                            }
                            //zapisz w storage'u
                            _core.storage("config.{0}".format(addon.name), vals);

                            //poinformuj ze zapisano
                            submitBtn
                                .attr("value", "\u2714 Zapisano")
                                .attr("disabled", "disabled");

                            //ustaw mozliwosc ponownego zapisu na za 2 sekundy
                            setTimeout(function () {
                                submitBtn
                                    .attr("value", "Zapisz")
                                    .removeAttr("disabled");
                            }, 2000);
                            //jesli formularz niepoprawny
                        } else {
                            //usun istniejace powiadomienie o bledach
                            error = $("#{0}".format(errDivId(addon.name)));
                            if (error.length > 0) {
                                error.remove();
                            }

                            //utworz nowe
                            error = $("<div />", {
                                id: errDivId(addon.name),
                                "class": "DodatkerNoBorder DodatkerError DodatkerNoPadding",
                                html: $("<br />").add(
                                    $("<span />", {
                                        html: "Wystąpiły następujące błędy:"
                                    })
                                ).add("<ul />")
                            });

                            //wypelnij je bledami
                            $.each(invalidWidgets, function (index, invalidWidget) {
                                var li = $("<li />");

                                li.html("{0}: {1}".format(invalidWidget.dispName, invalidWidget.invalid));
                                error.find("ul").append(li);
                            });

                            submitBtn.after(error);
                        }
                    }));

                    //dorzuc konfiguracje dodatku
                    addonDiv.find("fieldset").append(configDiv);
                    mainDiv.append(addonDiv);
                });

                $(".filters").after(mainDiv);
            };

            //todo: wykombinowac jak to zrobic, zeby dodatki mogly sie ustawiac i jednoczesnie zeby mozna bylo wejsc przez #addons
            /*
            //problemem w tym kodzie jest fakt, ze wchodzimy na strone ustawien dodatkow, Dodatker automatycznie chce ja renderowac
            //tymczasem przeciez nie ma jeszcze zadnych zarejestrowanych dodatkow, bo Dodatker wykonuje sie pierwszy ;_;
            if (window.location.hash === "#addons") {
                $(".filters").append($("<a />", {
                    "class": "fleft marginleft10",
                    href: "#addons",
                    html: "Dodatki"
                }));
                displayConfig();
            } else {
                $(".filters").append($("<a />", {
                    "class": "fleft marginleft10",
                    href: "#addons",
                    html: "Dodatki"
                }).one("click", displayConfig));
            }
            */

            //poki co - wejscie tylko przez link
            $(".filters").append($("<a />", {
                "class": "fleft marginleft10",
                href: "#addons",
                html: "Dodatki"
            }).one("click", displayConfig));

        } else {
            //nie jestesmy na stronie ustawien - a na co to komu potrzebne, a dlaczego?
            widgetFactory = registerWidget = setWidget = setWidgets = function () { };
        }

        return {
            setWidget: setWidget,
            setWidgets: setWidgets,
            widgetFactory: widgetFactory,
            registerWidget: registerWidget,
            getOpt: getOpt,
            setOpt: setOpt,
            genName: genName
        };
    }());

    //rejestracja domyslnych widgetow
    //szczegoly widgetow w dokumentacji
    _core.config.registerWidget(
        "TextInput",
        function (params, actualValue) {
            //widget musi miec nazwe
            var requiredFields = {
                name: "string"
            };

            if (!(_core.utils.fieldsCheck(params, requiredFields))) {
                return;
            }

            //jesli nie przekazano typu walidacji, zaakceptuj wszystko
            if (type(params.validation) === "regexp") {
                this.validation = params.validation;
            } else {
                this.validation = /^.*$/;
            }

            //nazwa widgetu
            this.name = params.name;

            //label
            this.dispName = (type(params.dispName) !== "string") ? this.name : params.dispName;

            //id
            this.id = _core.config.genName(params.name);

            //tekst wyswietlany jesli widget dostanie niepoprawna wartosc
            this.invalid = (type(params.invalid) !== "undefined") ? params.invalid : this.invalid;

            //szablon widgetu
            this.html = $("<span />", {
                "class": "fbold",
                html: "{0}: ".format(this.dispName)
            }).add($('<input />', {
                type: 'text',
                id: this.id,
                value: actualValue || ""
            }));
        },
        {
            //zwraca value widgetu
            getVal: function () {
                return this.html.eq(1).val();
            },
            //sprawdza czy tekst wpisany w pole jest poprawny
            validate: function () {
                return this.validation.test(this.getVal());
            },
            invalid: "Wartość pola niepoprawna"
        }
    );

    _core.config.registerWidget(
        "ChoiceInput",
        function (params, actualConfig) {
            //obowiazkowe pola
            var requiredFields = {
                name: "string",
                choices: "array"
            };

            if (!_core.utils.fieldsCheck(params, requiredFields)) {
                return;
            }

            //te 2 parametry ustala typ widgetu
            this.multiple = (type(params.multiple) === "boolean") ? params.multiple : false;
            this.expanded = (type(params.expanded) === "boolean") ? params.expanded : false;

            //tablica wyborow
            this.choices = params.choices;

            //nazwa
            this.name = params.name;

            //label
            this.dispName = (type(params.dispName) !== "string") ? this.name : params.dispName;

            //id
            this.htmlName = _core.config.genName(params.name);

            //tekst wyswietlany jesli widget bedzie niepoprawnie uzupelniony
            this.invalid = (type(params.invalid) !== "undefined") ? params.invalid : this.invalid;

            //flaga decydujaca czy musi byc przynajmniej jedna opcja zaznaczona
            this.atLeastOne = (type(params.atLeastOne) === "boolean") ? params.atLeastOne : false;

            //musi byc taki zapis z call, bo chce miec to w jednym miejscu, a that juz uzywam
            //JSLint placze, no ale co poradze
            this.html = (function () {
                var element,
                    that = this;

                if (this.expanded === false) {
                    //lista rozwijana
                    element = $("<select />", {
                        name: this.htmlName
                    });

                    if (this.multiple) {
                        element.attr("multiple", "multiple");
                    }

                    //wrzuc opcje do listy
                    $.each(this.choices, function (index, choice) {
                        var option;

                        //opcja musi miec przynajmniej pole value
                        if (type(choice.value) === "undefined") {
                            _core.utils.error("Obiekt powinien miec własność value");
                        }

                        option = $("<option />", {
                            value: choice.value,
                            //jak nie ma labela, to bierzemy go z value
                            html: (type(choice.label) !== "string") ? choice.value : choice.label
                        });

                        //zaznaczamy jesli odpowiedz istnieje w local storage'u
                        if ($.inArray(choice.value, actualConfig) !== -1) {
                            option.attr("selected", "selected");
                        }

                        element.append(option);
                    });
                } else {
                    //lista przyciskow
                    element = $("<ul />");

                    //wrzuc przyciski do listy
                    $.each(this.choices, function (index, choice) {
                        var li = $('<li />'),
                            button;

                        //opcja musi miec przynajmniej pole value
                        if (type(choice.value) === "undefined") {
                            _core.utils.error("Obiekt powinien miec własność value");
                        }

                        //tworzymy input
                        button = $("<input />", {
                            type: (that.multiple === true) ? "checkbox" : "radio",
                            id: that.htmlName + "_" + choice.value,
                            value: choice.value
                        });

                        //zaznacz jesli trzeba
                        if ($.inArray(choice.value, actualConfig) !== -1) {
                            button.attr("checked", "checked");
                        }

                        li.append(button);

                        //dodaj label
                        li.append($("<label />", {
                            "for": that.htmlName + "_" + choice.value,
                            //jak nie przekazano labela, to wykorzystaj value
                            html: " {0}".format((type(choice.label) !== "string") ? choice.value : choice.label)
                        }));

                        element.append(li);
                    });
                }

                //zwroc element
                return $("<span />", {
                    "class": "fbold",
                    html: "{0}: ".format(this.dispName)
                })
                    .add("<br />")
                    .add(element);

            }).call(this);
        },
        {
            //zwraca tablice zaznaczonych
            getVal: function () {
                var
                    //selektor dla zaznaczonych elementow
                    selector = (this.expanded) ? ":checked" : ":selected",

                    //tablica zaznaczonych wartosci
                    ret = this.html
                    .find(selector)
                    .map(function () {
                        return this.value;
                    }).get();

                return ret;
            },
            //sprawdza czy zaznaczone wartosci sa poprawne
            validate: function () {
                var val = this.getVal(),
                    that = this,
                    arr = [];

                //wartosc jest niepoprawna albo kiedy trzeba zaznaczyc co najmniej 1 a nie ma nic...
                if (this.atLeastOne && val.length === 0) {
                    return false;
                }
                //...albo kiedy nie ma jej w this.choices

                $.each(this.choices, function (index, choice) {
                    arr.push(choice.value);
                });

                try {
                    $.each(val, function (index, value) {
                        if ($.inArray(value, arr) === -1) {
                            throw {};
                        }
                    });
                } catch (e) {
                    return false;
                }

                return true;
            },
            invalid: "Wartość niepoprawna lub nic nie wybrano, a trzeba"
        }
    );

    //obsluga powiadomien od dodatkow
    _core.notifications = (function () {
        var
            //przycisk do wyswietlania powiadomien z dodatkow
            newButton,

            //kontener (div) na powiadomienia
            container,

            notificationsShown = false,

            //wyswietl licznik nieprzeczytanych powiadomien
            getUnreadNotificationsCount = function () {
                var
                    //liczba nieprzeczytanych powiadomien
                    count = _core.storage("notifications.unread"),

                    //spany ktore sa w ikonce - jak jest tylko 1 to znaczy, ze licznik powiadomien sie nie wyswietla
                    span = $("#addonsNotificationsBtn").find("span.count");

                if (count !== 0) {
                    //jesli sa powiadomienia
                    if (span.length !== 0) {
                        //jesli licznik wyswietlony - uaktualnij
                        span.eq(1).html(count);
                    } else {
                        //w przeciwnym wypadku dolacz licznik do strony
                        $("#addonsNotificationsBtn").append($("<span />", {
                            "class": "abs count x-small br3",
                            html: count
                        }));
                    }
                } else {
                    //jesli brak powiadomien
                    if (span.length !== 0) {
                        //jesli licznik wyswietlony, to go wywal w cholere
                        span.eq(0).remove();
                    }
                }
            },

            //wczytuje powiadomienia do kontenera
            loadNotifications = function () {
                var
                    //odwzorowanie powiadomien z local storage'a
                    notifications = _core.storage("notifications"),

                    //ul z powiadomieniami
                    ul,

                    //liczba nieprzeczytanych powiadomien
                    unread = notifications.unread,

                    //po ilu dniach mamy usuwac powiadomienia [s]
                    deleteAfter = _core.storage("config.Dodatker.notifExpirationTime") * 86400 * 1000,

                    //aktualny timestamp
                    now = (new Date()).getTime(),

                    //powiadomienia ktore nie beda usuniete
                    freshNotifs;

                if (notifications.list.length === 0) {
                    //jesli brak powiadomien - napisz
                    container.addClass("tcenter");
                    container.html($("<span />", {
                        "class": "small c999",
                        html: "Brak powiadomień z dodatków."
                    }));
                } else {
                    //w przeciwnym wypadku wyswietl kazde powiadomienie
                    container.removeClass("tcenter");
                    ul = $("<ul />", {
                        "class": "small showclose"
                    });
                    $.each(notifications.list, function (index, notification) {
                        var
                            //sprawdz czy powiadomienia powinny byc podswietlone czy nie
                            liclass = (function () {
                                if (unread > 0) {
                                    unread -= 1;
                                    return "bgfbfbd3 brbotte8 rel";
                                }

                                return "brbotte8 rel";
                            }()),

                            //pojedyncze powiadomienie
                            li = $("<li />", {
                                "class": liclass,
                                html: $("<p />", {
                                    "class": "c999 margin5_0",
                                    html: $("<span />", {
                                        "class": "color-5",
                                        html: notification.from + ": "
                                    }).add("<span />", {
                                        html: notification.text
                                    }).add("<br />", {
                                    }).add($("<span />", {
                                        "class": "fright",
                                        html: (new Date(notification.date)).toLocaleString()
                                    })).add("<div />", {
                                        "class": "clr"
                                    })
                                })
                            });

                        //dodaj powiadomienie
                        ul.append(li);
                    });

                    //zalacz cala liste powiadomien
                    container.html(ul);

                    //ustaw wszystkie na przeczytane
                    _core.storage("notifications.unread", 0);

                    //odswiez licznik
                    getUnreadNotificationsCount();

                    //skasuj wszystkie, ktore zostaly przeczytane wczesniej niz x dni temu
                    freshNotifs = $.grep(notifications.list, function (notification) {
                        return now - notification.date < deleteAfter;
                    });

                    //usun stare powiadomienia (= zapisz tylko nowe)
                    _core.storage("notifications.list", freshNotifs);
                }
            },

            //wysyla powiadomienie
            sendNotification = function (text) {
                var
                    //obiekt reprezentujacy nowe powiadomienie
                    notification = {},

                    //aktualny stan powiadomien
                    actualNotifications;

                //sprawdz kontekst
                contextCheck(this);

                //sprawdz argument
                if (type(text) !== "string" || text.length === 0) {
                    _core.utils.error("Błąd podczas wysyłania powiadomienia - niepoprawny argument");
                }

                //uzupelnij dane
                notification.from = this.name;
                notification.text = text;
                notification.date = (new Date()).getTime();

                //pobierz aktualne powiadomienia
                actualNotifications = _core.storage("notifications");

                //zwieksz licznik nieprzeczytanych
                actualNotifications.unread += 1;

                //wrzuc powiadomienie na liste
                actualNotifications.list.splice(0, 0, notification);

                //zapisz w storage'u
                _core.storage("notifications", actualNotifications);

                //odswiez licznik
                getUnreadNotificationsCount();
            };

        if ($("#notificationsBtn").length > 0) {
            //jestesmy na stronie gdzie jest belka z ikonkami - mozna sie podpiac

            //nowy przycisk na belce
            newButton = $("<div />", {
                "class": "quickpoint fright rel scaledrop miniwall",
                html: $("<a />", {
                    id: "addonsNotificationsBtn",
                    "class": "fright cfff tdnone quickicon tcenter zi2 rel",
                    title: "Powiadomienia z dodatków",
                    href: "#",
                    html: $("<span />", {
                        "class": "icon inlblk",
                        html: $("<span />", {
                            html: "Powiadomienia z dodatków"
                        })
                    })
                })
            });

            newButton.append($("<div />", {
                "class": "abs bgfff shadow dnone pding10 layer",
                style: "right: -124px; top: 33px; width: 280px;",
                html: $("<div />", {
                    id: "addonNotificationsContainer",
                    "class": "fblock overa h100",
                    style: "max-height: 342px;"
                })
            }));

            //dorzuc nowy przycisk do strony
            newButton.insertBefore($("#notificationsBtn").parent());

            //zapisz referencje na div z tresciami powiadomien
            container = $("#addonNotificationsContainer");

            //ustaw odpowiedni event
            $("#addonsNotificationsBtn").on("click", function (e) {
                //kod zerzniety zywcem z Wykopu, podziekowania dla @maciejkiner i ogólnie Wykopu za pozwolenie jego uzycia :)
                //ale przerobilem go tak, zeby byl pojedynczy var :P
                //Opera sie tez wreszcie na cos przydala, bo dzieki temu ze formatuje minifikowany JS moglem ten kod latwo znalezc
                //...i tak jej nie znosze.

                //kod ma za zadanie wyswietlic/schowac powiadomienia z dodatkow
                var $this = $(this).parent(),
                    layer = $(this).next('.layer'),
                    $other,
                    viewPort,
                    offsetModerBottom,
                    heightAdd,
                    height;

                $('body').on('click.hidemenu', function (e) {
                    if ($this.is('.shadow') && $this.has($(e.target)).length == 0) {
                        $this.find('a.quickicon').removeClass('active');
                        $this.removeClass('shadow');
                        $this.find('.layer').addClass('dnone');
                        $('body').off('click.hidemenu');
                    }
                });

                $(this).trigger('quickicon');

                e.stopPropagation();
                e.preventDefault();

                $(this).toggleClass('active');
                $(this).parent().toggleClass('shadow');

                if ($(this).hasClass("texticon")) {
                    $("#alert.closelinkcontainer a.closelink").trigger('click');
                }

                if (!layer.is(':visible')) {
                    layer.removeClass('dnone');
                    $other = $(this).parent().siblings('.shadow');
                    $other.removeClass('shadow');
                    $other.find('.quickicon').removeClass('active');
                    $other.find('.layer').addClass('dnone');
                } else {
                    layer.addClass('dnone');
                }

                if ($(this).parent().hasClass("scaledrop")) {
                    viewPort = $(window).height();
                    offsetModerBottom = $(this).next().position().top + $(this).next().height();
                    heightAdd = viewPort - offsetModerBottom;
                    height = $(this).next().height();
                    $(this).next().find(".overa").css("maxHeight", height + heightAdd - 90);
                }

                if ($(this).parent().hasClass("search")) {
                    $(this).next().find('input[type="text"]').focus();
                    if ($(this).next().find('input[type="text"]').val().length > 0) {
                        if ($('#quickSearch').hasClass("dnone")) {
                            $('#quickSearch').submit();
                        }
                    }
                }

                notificationsShown = !notificationsShown;

                if (notificationsShown) {
                    loadNotifications();
                }
            });

            //dodaj skrot do panelu zarzadzania dodatkami
            //zmieniono - na razie bez sensu, preblem ten sam co w displayConfig w _core.config
            //todo: wykombinowac jak to zrobic, zeby dodatki mogly sie ustawiac i jednoczesnie zeby mozna bylo wejsc przez #addons
            /*container.parent().append($("<p />", {
                "class": "tcenter bgf6 small",
                html: $("<a />", {
                    href: "http://wykop.pl/ludzie/ustawienia/" + _core.utils.getUsr() + "/#addons",
                    html: "Przejdź do ustawień dodatków"
                })
            }));*/

            //zaladuj powiadomienia
            getUnreadNotificationsCount();

        }

        return {
            sendNotification: sendNotification,
            getUnreadNotificationsCount: getUnreadNotificationsCount
        };
    }());

    //publiczne API do rzeczy siedzacych w _core
    //przy okazji funkcja konstruujaca uzywana do tworzenia obiektow dodatkow
    Dodatker = function (newAddon) {
        var requiredFields,
            i;

        if (!(this instanceof Dodatker)) {
            return new Dodatker(newAddon);
        }

        if (type(newAddon) !== "object") {
            _core.utils.error("Błąd, przekazano zmienną niewłaściwego typu");
        }

        requiredFields = {
            name: "string",
            author: "string",
            version: "string"
        };

        _core.utils.registerObject(newAddon, addonsList, newAddon.name, requiredFields);

        //niestety poniewaz JS ssie jesli chodzi o prywatnosc pol, musialem sie zdecydowac miedzy
        //a) zapewnieniem enkapsulacji i jednoczesnie marnowaniem pamieci przez wrzucanie funkcji do instancji
        //b) rezygnacja z enkapsulacji, ale mozliwoscia wrzucenia funkcji do prototypu
        //wybralem wersje 2 bo jak dodatki bedzie pisac ktos ogarniety to instancje Dodatkera i tak
        //trafia do jakiejs funkcji jako zmienne lokalne i zaden szerzacy zlo i destrukcje dodatek ich nie pozmienia
        for (i in newAddon) {
            if (newAddon.hasOwnProperty(i)) {
                this[i] = newAddon[i];
            }
        }
        this.widgetsArray = [];

        //rejestrujemy dodatek w tablicy dodatkow
        addonsList[this.name] = this;

        if (_core.storage("config.{0}".format(this.name)) === null) {
            _core.storage("config.{0}".format(this.name), {});
        }

    };

    //dodajemy metody i wlasciwosci statyczne
    $.extend(Dodatker, {
        isPage: _core.utils.isPage,
        registerWidget: _core.config.registerWidget,
        getUsr: _core.utils.getUsr,
        version: "BETA"
    });

    //metody i wlasciwosci prototypu
    Dodatker.prototype = {
        constructor: Dodatker,
        setWidget: _core.config.setWidget,
        setWidgets: _core.config.setWidgets,
        sendNotification: _core.notifications.sendNotification,
        getOpt: _core.config.getOpt,
        setOpt: _core.config.setOpt
    };

    //udostepnij Dodatker na zewnatrz
    window.Dodatker = Dodatker;

    //stworz addon reprezentujacy Dodatker
    dodatker = new Dodatker({
        name: "Dodatker",
        author: "Marmite",
        version: Dodatker.version
    });

    //ustaw widgety dodatkera
    dodatker.setWidget("ChoiceInput", {
        name: "updateCheck",
        dispName: "Automatyczne aktualizacje",
        choices: [{
            value: "true",
            label: "Sprawdzaj i powiadamiaj"
        }],
        multiple: true,
        expanded: true
    }, ["true"]);

    dodatker.setWidget("TextInput", {
        name: "notifExpirationTime",
        dispName: "Usuwaj powiadomienia starsze niż [dni]",
        validation: /^[0-9]+$/,
        invalid: "W to pole można wpisać wyłącznie liczby"
    }, 1);

    //sprawdz uaktualnienia
    if (dodatker.getOpt("updateCheck") !== null && dodatker.getOpt("updateCheck")[0] === "true") {
        console.log("Sprawdzanie aktualizacji...");
        Dodatker.checkUpdate = function (newVer) {
            if (this.version !== newVer && dodatker.getOpt("lastUpdateNotif") !== newVer) {
                dodatker.sendNotification("Dostępna jest nowa wersja Dodatkera, {0}! Sprawdź w dziale 'Dodatki'".format(newVer));
                dodatker.setOpt("lastUpdateNotif", newVer);
            }

            delete Dodatker.checkUpdate;
        };

        $.ajax({
            url: "http://kjagoda.linuxpl.info/Wypok/Dodatker/DodatkerVer.js",
            dataType: "jsonp"
        });
    }
};

(function () {
    "use strict";
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.textContent = "(" + dodatkerCreator.toString() + "(window.$ || window.jQuery));";
    document.getElementsByTagName("head")[0].appendChild(script);
}());