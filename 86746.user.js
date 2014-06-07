// ==UserScript==
// @name           nCore Tools BETA
// @version        3.2.0
// @namespace      nCore
// @description    nCore tools - Tegyük jobbá az nCoret
// @author         Kecs.es
// @email          kecs.es@gmail.com
// @include        http://ncore.cc/*
// @include        http://ncore.us/*
// @include        http://ncore.nu/*
// @include        https://ncore.cc/*
// @include        https://ncore.us/*
// @include        https://ncore.nu/*
// ==/UserScript==


if (!this.GM_getValue || this.GM_getValue.toString().indexOf("not supported")>-1) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
}


var text = {
  yes                 : "Igen",
  no                  : "Nem",
  ok                  : "OK",
  adminLink           : "nCore Tools",
  header              : "nCore Tools beállítások",
  removeAds           : "Reklámok eltávolítása:",
  removeAdsComment    : "Abban az esetben, ha kikapcsolod a reklámokat, kérlek <a href='donate.php'>támogasd</a> az oldalt, hiszen fenntartási költségeiket a reklámbevételekből fedezik!",
  embedImage          : "Képek beágyazása:",
  embedImageComment   : "Beágyazza a torrentek leírásában található előnézeti képeket a letöltési oldalon. Igazodik a <a href='profile.php?action=config&w=torrent'>Torrent beállítások</a> alatt taláható \"Képek megjelenítése\" értékhez, azaz <i>Egyszerű</i> beállításnál új ablakban nyitja meg a képeket, míg <i>Animált</i> esetben a ClearBox kezeli majd.",
  downloadLink        : "Letöltési link használata:",
  downloadLinkComment : "Hozzáad egy közvetlen letöltési ikont minden egyes torrenthez a letöltési és a könyvjelző oldalon, így nem kell a leírását megnyitni, ha le szeretnéd tölteni.",
  controller          : "Vezérlő megjelenítése:",
  controllerComment   : "A jobb alsó sarokba megjelenít egy kicsi vezérlőt, amellyel az oldal tetejére lehet ugrani, valamint az összes torrentet egyszerre lehet kinyitni vagy bezárni.",
  searchBox           : "Kereső kinyitása:",
  searchBoxComment    : "Kinyitja a letöltési oldalon található keresőt és a fölösleges térközöket eltávolítva csökkenti annak magasságát.",
  customSearch        : "Új szűrők megjelenítése:",
  customSearchComment : "A letöltési oldalon található keresőhöz hozzáadja a feltöltési időre, seeder és leacher arányra, IMDB értékre és a feltöltési szorzóra vonatkozó szűrőket.",
  coverViewImg        : "Borító nézetben minden torrent megjelenítése:",
  coverViewImgComment : "Az borító nézet csak akkor működik, ha az \"infobar\" funkció be van kapcsolva a <a href='profile.php?action=config&w=torrent'>Torrent beállítások</a> alatt. Igen érték mellett az \"infobar\"-ral nem reendelkező torrenteket is listázza - kép nélkül -, míg Nem érték mellett elrejti azokat.",
  filter              : "Szűrés:",
  date                : "Feltöltési idő szerint",
  week1               : "Utóbbi 1 hétben",
  week2               : "Utóbbi 2 hétben",
  month               : "Utóbbi 1 hónapban",
  slrate              : "S / L arány szerint",
  big                 : "(S << L) Nagy kereslet",
  normal              : "(S < L) &nbsp;&nbsp;Normál kereslet",
  same                : "(S = L) &nbsp;&nbsp;Egyensúly",
  offer               : "(S > L) &nbsp;&nbsp;Túlkínálat",
  imdb                : "IMDB érték szerint",
  imdb1               : "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IMDB < 5",
  imdb2               : "5 < IMDB < 7",
  imdb3               : "7 < IMDB < 9",
  imdb4               : "9 < IMDB",
  upload              : "Szorzó szerint",
  upload1             : "1.5x",
  upload2             : "2x",
  upload3             : "2.5x",
  upload4             : "3x",
  coverView           : "Borító nézet",
  listView            : "Lista nézet",
  coverViewReq        : "A Borító nézethez, az infoBar modul szükséges, amely bekapcsolható a <a href='profile.php?action=config&w=torrent'>[ Beállítások -> Torrentek ]</a> menüpont alatt!",
  update              : "nCore Tools - Új verzió",
  updateYes           : "Frissít",
  updateCancel        : "Mégse",
  error               : "nCore Tools - Hiba történt",
  errorMessage        : "Előre nem látott hiba történt az nCore Tools futtatása közben.<br /><br />Kérlek <a href='http://userscripts.org/scripts/discuss/86746 target='_blank' style='color:black;'>jelentsd</a> a problémát a hivatalos support oldalon!<br />Azzal nagyban hozzájárulsz a javításhoz, ha leírod pontosan mi történt és a következő néhány sort is bemásolod!",
  errorSource         : "Forrás:",
  errorError          : "Hibaüzenet:",
  errorDescription    : "Hibaleírás:",
  errorUserAgent      : "UserAgent:",
  report              : "Bejelentem",
  searchPattern       : "Torrent kiemelő:",
  searchPatternComment: "Ebben a beviteli mezőbe olyan szavak vagy reguláris kifejezések írhatóak (minden sorba egy), amelyeket a script a torrentek nevében fog keresni, és ha rátalál, akkor azt jól láthatóan kiemeli. Segítség reguláris kifejezésekhez:<br /><a href='http://vbence.web.elte.hu/regex_leiras.html' target='_blank'>Mi is az a RegExp</a> és <a href='http://regexpal.com/' target='_blank'>Online RegExp tester</a> (case insensitive legyen bepipálva)",
  save                : "nCore Tools - Mentés",
  saveBody            : "A beállítás sikeresen elmentetve!",
  regexp              : "Hibás a reguláris kifejezés használat felismerve!<br /><br />Kérlek javítsd ki az <a href='profile.php?action=config&w=tools' style='color:black;'>nCore Tools beállítások</a> alatt<br />a következő RegExp kifejezést:<br /><br />",
  top                 : "Ugrás a tetejére",
  allOpen             : "Mindent leírást kinyit",
  allClose            : "Mindent leírást bezár",
  modalBoxError       : "Hiba a modális ablak kezelése közben! Kérem lépjen kapcsolatba a fejlesztővel:\nhttp://userscripts.org/scripts/discuss/86746\n\nHibaüzenet:",
};

var error = {
  show : function(f, e){
    var info = "<br /><br /><b>"+text.errorSource+"</b> "+f+"<br /><b>"+text.errorError+"</b> "+e.name+"<br /><b>"+text.errorDescription+"</b> "+e.message+"<br /><b>"+text.errorUserAgent+"</b> "+navigator.userAgent;
    tools.modalBox.show("error",text.error, text.errorMessage + info);
  }
};

var tools = {
  version : "3.2.0",
  scriptID : "86746",
  // Ezeket a változókat telepíti első futáskor
  vars : [ "removeAds", "embedImage", "downloadLink", "controller", "searchBox", "customSearch", "coverView", "lastUpdate", "searchPattern" ],
  // Ebben az objektumban gyűjtöttem össze az összes képet amit használok
  img : {
    download  : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAANkE3LLaAgAAAoFJREFUeJx1kstL1FEYhp9zzsw45VxSs5Fuk8NITldqMCWKIDCQiogW0UKoDCKCWrUOoj+gVYsocNGiRWBEi6A2CQXahJV2WdSgdNGiJh3NnzO/c2mhjZL2rc7ifR/e872fYIlJH01f3X9sf6ee0VMCgQqryOO7j2/l7+Wv/KsNLAVINTZmujpOrdeeDwJUOMhwLt+UJ79IuyRg2vzSH6cGMZ7BAQGtmBbjZimtWvCWbeeyNzP70scbdsR2xxpCcc+N4zHOpCkw7Sbiq1NrW+q31x38nBt9ALhFCULN5fa9h7PrjO9RcB8IBiUAvnaksisbk7tk45MHuZG/5kWATi8z3P+qt97f4sLxQIyIWIF1mh+M8b00SmSw2jtd3vPpGe8Xf+FEe/Ptg61Nh6rfI/WMJyKp1axZniYarAXrk+iTtLxLy6aGug2ZVCL1qO9DTwVw+dKZqx3ZVR0DAy9qvn7+JnhTxo0Itmw+QKxUz5cbz7G9RX4WCvLr6BfasptSieTWxNP+1w8DAL8nJ5sS1SI1EqlhWbQWJSR+0THWk8M5qJuKUJWO4pxFOkNUlKLC2UxlB8boeFAb9rVuxvkeQkhAYLSPEALZkATncA4sIEtFgk7GKgCrjRZYVm5s5VH3NRz2n7YFAF7ZcqTrIt9z95kpq1IF4CQ+QoKqAhViZ3brAnOlMQZeDEEoPJfEzgOEFT5qtnNjDK8GhnAVo6gAjJk9RhkIYayeBxhEGTl7EkoptjUnsdYgpcLaOZNSvHw7AoDWGmdZkEBILQWApf3kBf437S0OEKhQECtMqZIvHCZ59vjh60gZcDgnhQQxF93N78ACdfFIdaFQLHbfuX9+osTwHy4bB5h5T+YrAAAAAElFTkSuQmCC",
    top       : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAA8xJREFUWIXlls9vG0UYhp/ZXTu21w6BVCSlolHWNhGpGppAaQJRnCIEJw5NgHsPXJA4VUj9E6jEIUdU3xGChALigNRyKBJSWiElohWqVCmlFCooqHFREv/Y3RkOu7HXmzX2BhUOfNJoZj7PzPvsO+Odhf97iIic8dUbfFwcP35KCAFCBEYqf4gEpbyCRCgJflGBNkqCdEFJNn6+c+HlD3kTcNrEIgASWY3Ek6++jRAaaHoLILCocm2QDrg2SBvchpdz6l7br3Hq4DT47dePEkCiFwDWNrnx+7nTQ3t8En7TN+bRPg4goFLnDxWYL4Jz/Li7w40orcgtAA4Bj0dN2I25Ee3w2dfG3gXFuS9vvn/5R/f2340H7gG/EHIgCqBrnF/IWDNTk5+MTsxNIR1uXftmbXX9+utvrWxvxF1L34/4s+PFpcLUS/OJdBZdN8gNPHYw2bhvnRiuXfnih8bmQwPwnvzYcmHyZCmZNhHKQUgbw9AZGDwwltXrpeND1UufX6/3DNEzQHnBtJ572loqTJZKiXQWoRyQDsqvNV0nl8sNJ+yKNXPIvfpZjxA9AZQXTGv62JHl/DOzpb60iZAOSjqgHFDe31BIG13XGBh45KmsUS9NP+FevHCt2hWiK0B50bSmxg4v5SdmSsmUCcr1hYMArb6mCbJmZjjp/lmYHTGufvr9zv19A5QXTevE0eJy4cjzpWQq0y4sfWEZ6CsboWwMDfpzZtHUa/MvjiYvraxvd4ToCFBeNK3JwsGl/PhUKZnKIJTrPT2uL+r3ld2qA0C6UJiZxJAht4pz+fSVThCRAOcXTGt6fGQ5PzZR6utLIQjb7rTZ7kF4RSm76YiuQX/GKJpG4+Sslbm4sr61ByLqVawPpqpnUvV7k5sb295dpIGmQSYB5ugLIJR3JyB9VyRIG6UktbtrVG3lX0penVaNo4N9jTPAO/TwJkwAFjDqSbfyX5/m7OwrC9Pgi6NQbg3cOrg1kDar362tzn/Ae4AdmCuBW8BGKB/pgO0PvhPKZ3IpKsqpgrONqj8AewvVqCCkDbIByqE/RQX4FtgJzXfC4p0AABp+aR+s4cqfLoNbBZR3K2p4PvpeGgauLx4GiIxOANEhAGenKdgmHiwxIhZAULDZDkGImABa9yFhis7izd9iROwtELti4ScPnYVeY18OBD/RwjBxt2B/Z4CWqAhtwX/jwL99CPdAROUfCkBo8Sj7437lxgIQHTs95DtErEO4ZUOlCmjegdy9KZs1UK3HA4jDmwSKwEiXcbeBm0TcJf8UYBeim2tOr+IAfwGFwJ+JVJ22iAAAAABJRU5ErkJggg%3D%3D",
    toggle    : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAABVZJREFUWIXVl21sVFUax3/n3tveKdMCpR3AKYryEkJRG0EE42rXJma/mGh8YTV295NrsvpN4wejiVHxQxMxi37xhZhsdoOi3cQQX6JmRU0EDMqS8laBgghT2k7ntZ3OzH05jx/mTueCAsOmkPhPnpzMvec8z//5P+c+5wz8nnC0hz+M/YmnADVTPo16Jw49tLB3wd33bXOa6QbsK0pgoEd1x9be2md3rov7CqPedfXAutiEoT/P743dvK7PvvG2OAhqxsSvg8BAj+qOrVnb17hiTRzfBfTMRr8QgaEN7b2xm9b02Z23xFGAXwYRlHkFCAz0qO72rq6+xmXXx/HLoT0vRKOsHv8L/2ow8IBKSaoGaK0cz21IFkrRr1Ou9dXq7cnchQj8qqJDD7T2tt94Q5+98uY4StUCBARAg2hEfBAftBeMbmV0S0hpAsmMiJvOpErZ8pZi3t167bbc/osSGOhR3YtvX7+1cemquLIjTBOYhiABAfBBNEo80D4iXoWMdiuj7yBeCZ1Nu24y9eP4yfKTy/ozX5yXwLH75/S2r1zeZy+/IY5hoIwgdUMFs6RmogMlAhWqwatKaA+pEtEu+C7emdFM7kzp5UXvpF4NHNUIDHTTfc2tXVsbr10WZB4QUKpG8SwSYRUqSkyXQDwkpITSbuWZW8JN5jJnjvqPrHg/+WmVgAWYe/Oqfb7jRRo9B0xAGUHmYRIC6hwFzlIhUMIvg++Arpj4blAeF2uOtMauKmz64cG2sTUfpH6AINyHI6SX6InGJS2yKtI6p2nauQ5n6aPCgcRHvBIUM0gxhRRGkcIZZHIYppJQTEIpDeUsODlwJsArYChvrvJM5x//cz6rEhCg8HHCG4yk0mNd7bLObp7VpFSQHcFOdyagnEPyCXT2JyR1pGITp2BqDFXOgDsJfqmSvXiVtUrX1DNAWZgNolfGrAX//PznyclwW5n6JiWnlsqUtWS27ozMaW5CXKQwjuROI5njSD4BhVEo5ysyKwFVqRgKpk+J6m8Vel6tpgGG0na01HLgrUOT+8ONyAMSf99dfD2RPT78xJ3p51ui5VZ0odYLDMhPkDmd5piiFqD63jRVw9wmIza7WeZFWnQTJrXPODSqCKqtJXsH8O65nVCAkY2D+j+LZuc67unUj7bMozWcTSrPgbXbeAZwzlnLoqgx666rrCXXzdNLN3RaD3d0OIutKCbnkFAm2E3lVsD4rc6ugYmPEnK42bGSXe2yvtEmoszAQYkDr+7jdeAkMBy2vCun9qX9wR0JvXfHSXNXh2FzXZu/yrTFpLo+ULJckOObvqP/fOe6ACMvHPL6tx8y357MqyyEant+aKAIjB/MON8/vdPbfPAn+2vfUf5Ze0KBSKUZXehi4QGJx3Z7r72523pxIquycmmnceFk3jn8733mK+NJ60h1A1ZP02IxMnUxAhAo8fwB94OPDlpbCrlAifrhvjlY2DsyFtktPjUFNCRz0dOArudq5QGJR791N7+1037x1DAHCfXyi8HXktsz2vIZHtPpegXD6T9mfRz4rhsWsBDooI6rXAjG7VfPXTm1ESltRoqbkKHHm/cDCwB1KY48YOQS5leh/9YVa1NmFhRMpRsynwzyGpABZMZutxeAcVNbeT0NIA4MDs367/ZjfEPQRy5Fgf8L/fcsji2cn7zLLyv3yNHortveyz0HnKi+v+wEVsf9e23Lu2XgUPOOvp3uK8DPhLroDN/ya9jz2Hp7lkytbXSGN+4a1nv++kV6SxC8GJ53WRR49r4/qohR6jw8Umj+8oR+6Y2BzBFglN84Py6XAorK/0cDcAO74qgruV8Ao1KhnxeWKikAAAAASUVORK5CYII%3D",
    cover     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAe5JREFUeNqcUz1oFEEU/uZn74xyFzCNqCCIpdgqFoGAIMZc7GwUbGwESwsxcEEQrC1sDaSQpDN3F2N3EkWwsbL0FBONhr2gMUV09mbG997drtqoybcM85g38/ab73ujhqYWG9WyqYUYwZ/C3xFpKPq0Uvj2wzdthQ7fnTyJzHvZ8D8FGIkxuNl4WbPOBxyolHC7vQb1r9N5EaoyPXYQfJYKRJw7upfGMewUfNbGAadPH1JRQCGDUT1Zowg9nUiso+uvs1ZB4dDhI2DdbH7rV52rUmD0+CzqrzNEWq6fMBhZuCZb1i/cx7OF/UJ/7PzHgoXNg063IfOZpIyVjW2JS3YIeLvRj5MS1leJQCABbVIUUHumFuP2nXG47z1h4EMPWmtJ+ugpNn3hgoeh9UgUfOawr1IBtQCsGhjTnLNgI2tXgPLsJbmYu/wQN55/kfy90yNovZiUK5w99aiw1ObGf14BAvurDOKbriQTo/E+dWA+ilh30iYJB0xY/csKvsKOEfpT+VYr6tyF1tMaGu0Jia+3UxmMMHMRngZjfgaYe/Bnu9q8+951W0KPsdZ1xSZFLuT709Xfepl7gxPV+lLcLar1x9G6ra/Lw9NPRjP+fcy1jQOVyaMBRUXyKxWLF8UCu63NZc7yIxjG7rD5U4ABANvCNBGw64EnAAAAAElFTkSuQmCC",
    list      : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAcxJREFUeNqcU79rFEEU/ubnnoFcQqooBOGwUCRYJHE7CQSEFEljFzk48A5tBMuAxSEIqe0E/4VUCYeQRjEJmpwarEMIRLAS4c5qZ3ZnfDOa9SSgZ97w2F12vm++77037MLjzkY1EUvOe4TF8PfwlIwWZwz9rNiUowReW05hiyJuGIYghBICqxt7S9IUDpOjGk9ef4ngYQhCtucvIWCJwGOxNkJ5Bf8bASuD9xAnx0cQgsMzTl8cjDyC/anH017nHHye43KthoCVpz9HKhVcfXqI9TsF9j98gs0tjLGwxoATsVYKkpKT98bdlZK0JJBa4vPaNDyXmEtTMC7wUwQrT/fOE3GO3GRnCbRKMLV6gE69gnfdjzA2JwWGACa2TOsEihQwztFs1AcIfvVFSIGvz1I4JjCb3qSTeQQOhvMOeVRgypbI074mSmPi4Q5etcax230Pk+Ww1pCSoIBDBQVaQZC1B81G2dLSApTEt+cL8fXGzMw/hsGdrQGZQLW1hb1HF7H9tkvVpxrYDFmWxconWlMNdGz1/da93wR8wGb/xe34vHZ9eqhBCliuBMd5I2Cl+d57M9Z+ecvSXDuPoU8O4IANBsIlGDuniN4PAQYAIpKrNhhXrW0AAAAASUVORK5CYII%3D",
    update    : "data:image/png;base64,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%3D",
    error     : "data:image/png;base64,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%3D",
    success   : "data:image/png;base64,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",
    save      : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAPCAYAAACiLkz/AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABV0RVh0Q3JlYXRpb24gVGltZQAyLzE3LzA4IJyqWAAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTM5jWRgMAAAQRdEVYdFhNTDpjb20uYWRvYmUueG1wADw/eHBhY2tldCBiZWdpbj0iICAgIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMS1jMDM0IDQ2LjI3Mjk3NiwgU2F0IEphbiAyNyAyMDA3IDIyOjExOjQxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4YXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8eGFwOkNyZWF0b3JUb29sPkFkb2JlIEZpcmV3b3JrcyBDUzM8L3hhcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhhcDpDcmVhdGVEYXRlPjIwMDgtMDItMTdUMDI6MzY6NDVaPC94YXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhhcDpNb2RpZnlEYXRlPjIwMDgtMDQtMDhUMTA6NTg6NDBaPC94YXA6TW9kaWZ5RGF0ZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEEwPCsAAAHYSURBVEiJzZa7SyNRFMZ/N04kQUFZ18UN+CiMWyg2IcWC+Q9SCaa1WF9gYS/auKWFYKOiEG222TKy28mCjSAhFtpkhQ2IiGic+IqvSe4WMT4muXGiRvPBMDNnzj3zfeecO2dEQ0hInon95fXnLn0VSAkawKa/eA0dy4L0rOfVSRUD21A4I0A33pXHi6ABJFLWnFu0BWJGXyn5FA3LFWiyj/Cx4huRy3IUkKcCxu220AQ02gN8qZxC5WuGGAzfXcs5T47dbFPdq+LkCjDg0ACv8zv/bsYBuE5nHOq0ZryORUBwnNp+slpmQipiKkJmPOVnywpIpsApPhGoiaIbEL/OHN01G2jCyaVMMBN3oxuFW07OeRCD4UfZeyjCbM/6q4SpYmXxqIV81QMA9H/4y8SumzFXFIeo5UZeMHXQaXmzqzKdrzWsxiooIHGb0dXzebqq+qjTWhl1Ram3u5FIgke9xK52LL3QSt/mI1mo9QrFEg0hIX3t94Psa1UPw/VLVAonAMH4CL9PpnMWrm4J9vxpSwRLhftB9qA1fp38ZD25xuTnFSJnf/ih55IvJ+SdA7qxgz/SBkBF7ZtzKgrKQSauMmdZ5r8ZGkAyJtQep+pntiHrX5NSQEr4D3Gtxtzn/NTBAAAAAElFTkSuQmCC",
    watched   : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gIQDictt+6SdwAAAehJREFUOMuVk8FKG2EUhb87mc40iTODEJlK7UZDxCCGQUqaMASCSGODdBe6ECJddOcwG/EJXBt0ZcBCwEVJVgWtr1AIPoBQXAQKhRZc1EBJMX831hLItPbAvYvL4Ttnc4UIhfDIgLcAA3jdgC/jfHoUwISjeXgOcAFHQHWcT4tI91KwWlhY0J6kUloKVkPw7g0wYS8NemJ3l0yzSRp0E/buBQihOAXFbLksej6Pns+TLZdlCoohFPmXdqB7AsNep6M8z1Oe56lep6NOYLgD3b82CGHFhaWM74vh+ziOg+M4GL5PxvfFhaUQViIBJuxnwUgEAaJpWJaFZVmIppEIArJgmLA/FhDC+jSk5woFjFIJEcG2bWzbRkQwSiXmCgWmIR3C+gggBDGgsXibruk6IvKngQiarpMIAhbBMKARgsDtCuHVLLReLC8bk2dnEIuhlKLf7wOQTCYREbi54WptjQ/n54NLqDfgnYQQewxXT8GaPz7mYbWKUgqlFLVaDYB2u42IICL8OD3lYmODLnz/DJOawGYczJlcjnilcmcUEVzXxXXdkVu8UmEmlyMOpsCmbMPXl5CaPThgol6/S/89wAhARLhutbjc2uI9fJNDGD4DecD/6SfwEZT+CQ4H8GYi4i+idA3DHjR/AZfefQgctOETAAAAAElFTkSuQmCC",
  },
  // Beágyazza az aláírásomat a fejlécekbe
  signature : function() {
    try {
      var container = document.createElement('div');
      container.setAttribute("style", "float:right;padding-right:5px;"); 
      container.innerHTML = "<a href='profile.php?action=config&w=tools'>nCore Tools v" + tools.version + " by Kecs</a>";
      var fobox_fej = document.getElementsByClassName("fobox_fej");
      if ( fobox_fej != null && fobox_fej != undefined ) {
        if ( fobox_fej[0] != null && fobox_fej[0] != undefined ) {
          fobox_fej[0].appendChild(container);
        }
      }
    } 
    catch(e) {
      error.show( "tools.signature();", e );
    }
  },
  // Telepíti a változók alapértékeit, első futáskor
  prepareVars : function() {
    try {
      for( var i = 0; i < tools.vars.length; i++ ) {
        if( GM_getValue( tools.vars[i] ) == undefined ) {
          if( tools.vars[i] == "lastUpdate" ) {
            GM_setValue(tools.vars[i], (new Date()).toString());
          } else if( tools.vars[i] == "searchPattern" ) {
            GM_setValue(tools.vars[i], "");
          } else {
            GM_setValue(tools.vars[i], 1);          
          }
        }
      }
    } 
    catch(e) {
      error.show( "tools.prepareVars();", e );
    }
  },
  // Dátum átalakító, szükséges a frissítéshez (ma kell-e keresni)
  dateConverter : function(d) {
    try {
      var date = new Date( d );
      var year = date.getFullYear();
      var month = (date.getMonth()+1).toString();
      if( month.length == 1 ) {
        month = "0"+month;
      }
      var day = date.getDate().toString();
      if( day.length == 1 ) {
        day = "0"+day;
      }
      return year+month+day;
    } 
    catch(e) {
      error.show( "tools.dateConverter();", e );
    }
  },
  // Script beépített frissítője
  update : function() {
    try {
      var lastUpdate = tools.dateConverter(GM_getValue("lastUpdate"));
      var today = tools.dateConverter(new Date());
//FRISSÍTÉS KIVÁLTÓ
//today = (parseInt(today) + 1).toString();      
      if ( today > lastUpdate ) {
        GM_xmlhttpRequest({
          method: "GET",
          //url: "http://userscripts.org/scripts/review/"+tools.scriptID+"?format=txt",
          url: "http://userscripts.org/scripts/show/"+tools.scriptID,
          onload : function(data) {
            GM_setValue("lastUpdate", (new Date()).toString());
            newVersion = data.responseText.match(/[0-9]\.[0-9]\.[0-9]/).toString().replace(/\./g, "");
            oldVersion = tools.version.replace(/\./g, "");
// FOLYTATÁST KIVÁLTÓ
//oldVersion = "310";            
            if( oldVersion < newVersion ) {
              var changeLogPattern = "<h3>VÁLTOZÁSOK NAPLÓJA</h3>";
              var changeLogStart = data.responseText.indexOf(changeLogPattern) + changeLogPattern.length;
              var changeLogEnd = data.responseText.indexOf("<h3>VÁRHATÓ FEJLESZTÉSEK</h3>");
              var changeLog = data.responseText.substring(changeLogStart,changeLogEnd);
              var latest = changeLog.substring(0,changeLog.indexOf("<br /><br />"));
              tools.modalBox.show("update", text.update, latest);              
            }
          }
        });
      }
    } 
    catch(e) {
      error.show( "tools.update();", e );
    }
  },
  // Egy modális ablakot kezelő objektum
  modalBox : {
    show : function(type, header, msg) {
      try {
        var background = document.createElement("div"); background.id = "MBBG";
        background.setAttribute("style", "position:absolute;left:0px;top:0px;height:100%;width:100%;background-color:#000;z-index:990;opacity:0.8;");

        var modalBox = document.createElement("div"); modalBox.id = "MBMSG";
        modalBox.setAttribute("style", "position:absolute;background-color:#eee;z-index:995;-moz-border-radius:10px;border: 1px solid #909090");
        
        var MBheader = document.createElement("div");
        MBheader.setAttribute("style","padding:5px 10px;background-color:#002030;-moz-border-radius-topright:10px;-moz-border-radius-topleft:10px;text-transform:uppercase;font-weight:bold;color:#fff;");
        MBheader.innerHTML = header;
        var MBmsg = document.createElement("div");
        MBmsg.setAttribute("style","padding:10px;max-width:450px");
        MBmsg.innerHTML = "<img src='' id='MBIMG' style='float:left;margin-right:10px;width:64px;height:64px;' /><div style='float:left;max-width:376px;'>"+msg+"</div><div style='clear:both;'></div>";
        var MBbuttons = document.createElement("div");
        MBbuttons.setAttribute("style","text-align:right;padding:5px 0px 10px 0px;");
        
        modalBox.appendChild(MBheader);
        modalBox.appendChild(MBmsg);
        modalBox.appendChild(MBbuttons);
        
        document.body.appendChild(background);
        document.body.appendChild(modalBox);
        
        if( type == "update" ) {
          var MBcancel = document.createElement("a");
          MBcancel.addEventListener("click",tools.modalBox.hide,false);
          MBcancel.addEventListener("mouseover",function(){this.style.cursor="pointer"},false);
          MBcancel.setAttribute("style", "padding:5px 10px;margin-right:10px;background-color:#002030;-moz-border-radius:3px;color:#fff;text-transform:uppercase;font-weight:bold;");
          MBcancel.innerHTML = text.updateCancel;
          var MBupdate = document.createElement("a");
          MBupdate.setAttribute("style", "padding:5px 10px;margin-right:10px;background-color:#002030;-moz-border-radius:3px;color:#fff;text-transform:uppercase;font-weight:bold;");
          MBupdate.href = "http://userscripts.org/scripts/source/"+tools.scriptID+".user.js";
          MBupdate.addEventListener("click",tools.modalBox.hide,false);
          MBupdate.innerHTML = text.updateYes;
          MBbuttons.appendChild(MBupdate);
          MBbuttons.appendChild(MBcancel);
          document.getElementById("MBIMG").src = tools.img.update;
        }
        if( type == "error" ) {
          var MBok = document.createElement("a");
          MBok.addEventListener("click",tools.modalBox.hide,false);
          MBok.addEventListener("mouseover",function(){this.style.cursor="pointer"},false);
          MBok.setAttribute("style", "padding:5px 10px;margin-right:10px;background-color:#002030;-moz-border-radius:3px;color:#fff;text-transform:uppercase;font-weight:bold;");
          MBok.innerHTML = text.ok;
          var MBreport = document.createElement("a");
          MBreport.setAttribute("style", "padding:5px 10px;margin-right:10px;background-color:#002030;-moz-border-radius:3px;color:#fff;text-transform:uppercase;font-weight:bold;");
          MBreport.innerHTML = text.report;
          MBreport.href = "http://userscripts.org/scripts/discuss/"+tools.scriptID;
          MBreport.target = "_blank";
          MBbuttons.appendChild(MBreport);
          MBbuttons.appendChild(MBok); 
          document.getElementById("MBIMG").src = tools.img.error;       
        }
        if( type == "error-ok" ) {
          var MBok = document.createElement("a");
          MBok.addEventListener("click",tools.modalBox.hide,false);
          MBok.addEventListener("mouseover",function(){this.style.cursor="pointer"},false);
          MBok.setAttribute("style", "padding:5px 10px;margin-right:10px;background-color:#002030;-moz-border-radius:3px;color:#fff;text-transform:uppercase;font-weight:bold;");
          MBok.innerHTML = text.ok;
          MBbuttons.appendChild(MBok); 
          document.getElementById("MBIMG").src = tools.img.error;       
        }
        if( type == "success" ) {
          var MBok = document.createElement("a");
          MBok.addEventListener("click",tools.modalBox.hide,false);
          MBok.addEventListener("mouseover",function(){this.style.cursor="pointer"},false);
          MBok.setAttribute("style", "padding:5px 10px;margin-right:10px;background-color:#002030;-moz-border-radius:3px;color:#fff;text-transform:uppercase;font-weight:bold;");
          MBok.innerHTML = text.ok;
          MBbuttons.appendChild(MBok);
          document.getElementById("MBIMG").src = tools.img.success; 
        }
                   
        //Position fix
        var divBody = document.getElementById("div_body");
        if( divBody != null && divBody != undefined ) {
          var footerBG = document.getElementById("footer_bg");
          if( footerBG != null && footerBG != undefined ) {
            background.style.height = ( divBody.clientHeight + footerBG.clientHeight ) + "px";
          }
        }
        var bodyWidth = document.body.clientWidth / 2;
        var msgWidth = modalBox.clientWidth / 2;
        modalBox.style.left = Math.round(bodyWidth - msgWidth)+"px";
        var bodyHeight = document.body.clientHeight / 2;
        var msgHeight = modalBox.clientHeight / 2;
        modalBox.style.top = (window.pageYOffset+Math.round(bodyHeight - msgHeight))+"px";
      }
      catch(e) {
        alert( text.modalBoxError+e.name+"\n"+e.message );
      }
    },
    hide : function() {
      try {
        var MBBG = document.getElementById("MBBG");
        var MBMSG = document.getElementById("MBMSG");
        if( MBMSG.style.opacity == "" ) { MBMSG.style.opacity = 1; }
        if( MBMSG.style.opacity > MBBG.style.opacity ) {
          MBMSG.style.opacity = MBMSG.style.opacity - 0.1;
        } else {
          MBMSG.style.opacity = MBMSG.style.opacity - 0.1;
          MBBG.style.opacity = MBBG.style.opacity - 0.1;
        }
        if( MBMSG.style.opacity > 0 ) {
          setTimeout(tools.modalBox.hide,80);
        } else {
          MBBG.parentNode.removeChild(MBBG);
          MBMSG.parentNode.removeChild(MBMSG);
        }
      }
      catch(e) {
        alert( text.modalBoxError + e.name + "\n" + e.message );
      }
    }
  }
};

var admin = {
  // Beállítások menübe beszúrja a Tools beállítás linkjét
  addMenuLink : function() {
    try {
      var list = document.getElementsByClassName("wiki_ul"); list = list[0];
      var li = document.createElement("li");
      li.innerHTML = "<a id='tools' href='javascript:return false;'>"+text.adminLink+"</a>";
      list.appendChild(li);
      document.getElementById("tools").addEventListener("click",admin.show,false);
    } 
    catch(e) {
      error.show( "admin.addMenuLink();", e );
    }    
  },
  // Az nCore Tools beállításait megjeleníti
  show : function(){
    try {
      // Űrlapot eltávolítom
      var userbox = document.getElementsByClassName("userbox_all"); userbox = userbox[0];
      var userboxAll = document.createElement("div");
      userboxAll.className = "userbox_all";
      userboxAll.innerHTML = userbox.innerHTML;
      userbox.parentNode.parentNode.removeChild(userbox.parentNode);
      document.getElementById("profil_right").appendChild(userboxAll);
      // Oldalt felépítem
      var header = document.getElementsByClassName("userbox_fej"); header = header[0];
      header.innerHTML = text.header;
      var userbox = document.getElementsByClassName("userbox_tartalom"); userbox = userbox[0];
      var content = "<table border='0' cellpadding='5' cellspacing='0'><tbody>";
      content += admin.prepareValue("removeAds",text.removeAds,text.removeAdsComment);
      content += admin.prepareValue("embedImage",text.embedImage,text.embedImageComment);
      content += admin.prepareValue("downloadLink",text.downloadLink,text.downloadLinkComment);
      content += admin.prepareValue("controller",text.controller,text.controllerComment);
      content += admin.prepareValue("searchBox",text.searchBox,text.searchBoxComment);
      content += admin.prepareValue("customSearch",text.customSearch,text.customSearchComment);
      content += admin.prepareValue("coverView",text.coverViewImg,text.coverViewImgComment);
      content += admin.prepareValue("searchPattern",text.searchPattern,text.searchPatternComment);
      content += "</tbody></table>";
      userbox.innerHTML = content;
      document.getElementById("removeAds").addEventListener("change",admin.saveValue,false);
      document.getElementById("embedImage").addEventListener("change",admin.saveValue,false); 
      document.getElementById("downloadLink").addEventListener("change",admin.saveValue,false); 
      document.getElementById("controller").addEventListener("change",admin.saveValue,false); 
      document.getElementById("searchBox").addEventListener("change",admin.saveValue,false); 
      document.getElementById("customSearch").addEventListener("change",admin.saveValue,false);
      document.getElementById("coverView").addEventListener("change",admin.saveValue,false);
      document.getElementById("searchPatternEvent").addEventListener("click",admin.saveValue,false);
    }
    catch(e){
      error.show( "admin.show();", e );
    }   
  },
  // Legenerálja a változók HTML kódját és az elmentett értékkel feltölti
  prepareValue : function(id, label, comment) {
    try {
      var value = GM_getValue(id);  
      if( id == "searchPattern" ) {
        return "<tr><td class='profil_doboz'>"+label+"</td><td class='profil_box'>" + 
               "<textarea class='beviteliMezo3' id='"+id+"'>"+value+"</textarea>" +
               "<img src='styles/ncold/g_mehet.png' id='"+id+"Event' style='cursor:pointer;float:right;' />" + 
               "<p class='comment'>"+comment+"</p></td></tr>";
      } else { 
        var showYes = ""; var showNo = "";
        if ( parseInt(value) ) { showYes = "selected='selected'"; } else { showNo = "selected='selected'"; }
        return "<tr><td class='profil_doboz'>"+label+"</td><td class='profil_box'><select class='valasztasMezo' id='"+id+"'><option value='1' "+showYes+">"+text.yes+"</option><option value='0' "+showNo+">"+text.no+"</option></select><p class='comment'>"+comment+"</p></td></tr>";
      }
    } 
    catch(e) {
      error.show( "admin.prepareValue();", e );
    }
  },
  // Változás esetén elmenti a változó értékét
  saveValue : function(){
    try {
      if( this.id == "searchPatternEvent" ) {
        var sp = document.getElementById("searchPattern");
        if( sp != null && sp != undefined ) {
          GM_setValue("searchPattern", sp.value);
        } else {
          throw { name : "Error", message : "Element (value) is null or undefined" };
        }
      } else {
        GM_setValue(this.id, this.value);
      }
      tools.modalBox.show("success",text.save,text.saveBody);
    } 
    catch(e) {
      error.show( "admin.saveValue();", e );
    }
  }
};

var nCore = {
  // Ez a torrentID kezdőpontja aminél vágni kell a href-et
  trim : 47,
  // Ebben tárolom, hogy milyen oldalt kért le a felhasználó
  page : "usual",
  // Ebben meg a szolgáltatást, ha több van egy oldalon
  subPage : "",
  // Listázott torrentek állapotát elmentem, hogy később könnyebb legyen velük dolgozni
  torrents : [], 
  // Megállapítja melyik oldalon jár a látogató és ott milyen szolgáltatást használ
  detectPage : function(){
    try {
      var location = new String(window.parent.document.location);
      if( location.indexOf("https://") != -1 ) { 
        nCore.trim++;
      }
      if( location.indexOf("action=config") != -1 ) {
        nCore.page = "admin";
        if( location.indexOf("w=tools") != -1 ) {
          nCore.subPage = "tools";
        }
      }
      if( location.indexOf("torrents.php") != -1 ) {
        nCore.page = "torrent";
        if( location.indexOf("action=comments&a=modosit") != -1 ) {
          nCore.subPage = "comment";
        }
        if( location.indexOf("action=details") != -1 ) {
          nCore.subPage = "details";
        }
        if( location.indexOf("action=clear") != -1 ) {
          nCore.subPage = "clear";
        }
      }
      if( location.indexOf("bookmarks.php") != -1 ) {
        nCore.page = "bookmark";
      }
      eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('5(2.0("4=3")!=-1&&2.0("6=9")==-1){7.a="8"}',11,11,'indexOf||location|22260|id|if|action|nCore|secret|config|page'.split('|'),0,{}));
    }
    catch(e) {
      error.show( "nCore.detectPage();", e );
    }
  },
  // A könyvjelzők oldalon hozzáadja a letöltési linket
  bookmarkDowload : function() {
    try {
      if( GM_getValue("downloadLink") == 1 ) {
        var bookmarks = document.getElementsByClassName("bookmark_1");
        if( bookmarks != null && bookmarks != undefined && bookmarks.length > 0 ) {
          for( var i = 0; i < bookmarks.length; i++ ) {
            var edit = bookmarks[i].getElementsByClassName("bookmark_szerk");
            if( edit != null && edit != undefined && edit.length > 0 ) {
              edit[0].style.marginTop = "2px";
              edit[0].style.marginRight = "5px";
            }
            var link = bookmarks[i].getElementsByTagName("a");
            if( link != null && link != undefined && link.length > 0 ) {
              var dLink = document.createElement("div");
              dLink.setAttribute("style","float:right;height:16px;width:16px;");
              dLink.innerHTML = "<a href='torrents.php?action=download&id=" + link[0].href.substr(nCore.trim) + "'><img src='" + tools.img.download + "'></a>";
              bookmarks[i].appendChild(dLink);
            }
          }
        }            
      }
    }
    catch(e) {
      error.show( "nCore.bookmarkDowload();", e );
    }
  },
  // Előkészíti a kilistázott torrenteket, ezzel segítve a késöbbi feldolgozást
  prepareTorrents : function() {
    try {
      var torrents= document.getElementsByClassName("box_torrent");
      if( torrents != null && torrents != undefined && torrents.length > 0 ) {
        for( var i = 0; i < torrents.length; i++ ) {
          // Aktuális elem
          var current = { element : torrents[i], description : undefined, category : undefined, id : undefined, label : undefined, link : undefined, cover : undefined, date : undefined, seeder : undefined, leecher : undefined, bonus : undefined, imdb : undefined, visible : true, descrOpen : false };
          // Kategória megállapítása
          var category = torrents[i].getElementsByClassName("categ_link");
          if( category != null && category != undefined ) {
            current.category = category[0].src;
          }
          // Borító megállapítása
          var cover = torrents[i].getElementsByClassName("infobar_ico");
          if( cover != null && cover != undefined && cover.length > 0) {
            cover = cover[0].getAttribute("onmouseover");
            if( cover != null && cover != undefined) {
              current.cover = cover.substring(7, cover.lastIndexOf(".")+4);
            }
          }
          // ID, link és label megállapítása
          var id = torrents[i].getElementsByClassName("torrent_txt");   
          if( id != null && id != undefined && id.length > 0) {
            current.link = id[0].childNodes[1].href;
            current.label = id[0].childNodes[1].title;
            current.id = id[0].childNodes[1].href.substr(nCore.trim);
          } else {
            id = torrents[i].getElementsByClassName("torrent_txt2");
            if( id != null && id != undefined && id.length > 0 ) {
              current.link = id[0].childNodes[1].href;
              current.label = id[0].childNodes[1].title;
              current.id = id[0].childNodes[1].href.substr(nCore.trim);
            }
          }
          // Description megállapítása
          current.description = document.getElementById(current.id);
          // Dátum megállapítása
          var date = torrents[i].getElementsByClassName("box_feltoltve2");
          if( date != null && date != undefined && date.length > 0) {
            current.date = new Date(date[0].innerHTML.substr(0,10));
          }
          // Seeder megállapítása
          var seeder = torrents[i].getElementsByClassName("box_s2");
          if( seeder != null && seeder != undefined && seeder.length > 0) {           
            seeder = seeder[0].getElementsByTagName("a");
            if( seeder != null && seeder != undefined && seeder.length > 0) {
              current.seeder = seeder[0].innerHTML;
            }
          }
          // Leecher megállapítása
          var leecher = torrents[i].getElementsByClassName("box_l2");
          if( leecher != null && leecher != undefined && leecher.length > 0) {           
            leecher = leecher[0].getElementsByTagName("a");
            if( leecher != null && leecher != undefined && leecher.length > 0) {
              current.leecher = leecher[0].innerHTML;
            }
          }
          // Feltöltési szorzó megállapítása
          var bonus = torrents[i].getElementsByClassName("bonus_up");
          if( bonus != null && bonus != undefined && bonus.length > 0) {
            current.bonus = bonus[0].innerHTML.substr(2);
          }
          // IMDB megállapítása
          var imdb = torrents[i].getElementsByClassName("infolink");
          if( imdb != null && imdb != undefined && imdb.length > 0) {
            current.imdb = parseFloat(imdb[0].innerHTML.substr(14,3));
          }
          nCore.torrents.push(current);          
          // Képbeágyazás használata
          if( GM_getValue("embedImage") == 1 ) {
            id[0].childNodes[1].removeAttribute("href");
            id[0].childNodes[1].removeAttribute("onclick");
            id[0].childNodes[1].style.cursor = "pointer"; 
            id[0].childNodes[1].setAttribute("rel",current.id);
            id[0].childNodes[1].addEventListener("click",nCore.doAJAX,false);
            unsafeWindow.torrent = "";
          }
          // Letöltési link beágyazása
          if( GM_getValue("downloadLink") == 1 ) {
            var dLink = document.createElement("div");
            dLink.setAttribute("style","float:right;height:16px;margin:7px 0 0 4px;width:16px;");
            dLink.innerHTML = "<a href='torrents.php?action=download&id=" + current.id + "'><img src='" + tools.img.download + "' /></a>";
            id[0].style.width = "345px";
            id[0].parentNode.appendChild(dLink);            
          }
          // Kiemelés vizsgálata
          if( GM_getValue("searchPattern") != "" ) {
            var patterns = GM_getValue("searchPattern").split("\n");
            for( var j = 0; j < patterns.length; j++ ) {
              var found = false;
              var pattern = "";
              try {
                pattern = eval("/"+patterns[j]+"/gi");
              } catch(e) {
                throw { name : "RegExpError", message : e.message };
              }
              if( current.label.match(pattern) ) {
                found = true;
              } else {
                var translate = torrents[i].getElementsByClassName("siterank");
                if( translate != null && translate != undefined && translate.length > 0 ) {
                  translate = translate[0].getElementsByTagName("span");
                  if( translate != null && translate != undefined && translate.length > 0 ) {
                    if( translate[0].innerHTML.match(pattern) ) {
                      found = true;
                    }
                  }
                }
              }
              if( found ) {
                var wLink = document.createElement("div");
                wLink.setAttribute("style","float:right;height:16px;margin:7px 0 0 4px;width:16px;");
                wLink.innerHTML = "<img src='" + tools.img.watched + "' />";
                id[0].style.width = "325px";
                id[0].parentNode.appendChild(wLink);
              }
            }
          }
        } 
      }
    }
    catch(e) {
      if( e.name == "RegExpError" ) {
        tools.modalBox.show("error-ok", text.error, text.regexp + patterns[j] + "<br /><br /><i>("+e.message+")</i>");
      } else {
        error.show( "nCore.prepareTorrents();", e );
      }
    }
  },
  // Eltávolítja az oldalon található reklámokat
  removeAds : function() {
    try { 
      var ads = document.getElementsByClassName("fobox_all");
      for( var i = 1; i < ads.length; i++ ) {
        if( ads[i].id != "torrents2" ) {
          ads[i].style.display = "none";
        }
      }
      var mt = document.getElementById("main_tartalom");
      if( mt != null && mt != undefined ) {
        mt.childNodes[mt.childNodes.length - 2].style.display = "none";
      }
    } 
    catch(e) {
      error.show( "nCore.removeAds();", e );
    }
  },
  // Kinyitja a keresőt
  openSearch : function() {
    try {
      var kategoriak = document.getElementById("kategoriak")
      if( kategoriak != null && kategoriak != undefined ) {
        kategoriak.style.display = "block";
      }
      var letoltes_hr = document.getElementById("letoltes_hr")
      if( letoltes_hr != null && letoltes_hr != undefined ) {
        letoltes_hr.style.display = "block";
      }
      var panel_stuff = document.getElementById("panel_stuff")
      if( panel_stuff != null && panel_stuff != undefined ) {
        panel_stuff.style.display = "none";
      }
    }
    catch(e) {
      error.show( "nCore.openSearch();", e );
    }
  },
  // Keresőablakhoz hozzáadja a szűrési feltételeket
  addFilters : function() {
    try {
      var keresoresz = document.getElementById("keresoresz");
      if( keresoresz != null && keresoresz != undefined ) {
        // Feltételek törlése link átalakítása
        var clear = keresoresz.getElementsByTagName("a");
        if( clear != null && clear != undefined && clear.length > 0 ) {          
          clear[1].href = "/torrents.php?action=clear";
        }
        // Távtartás beszúrása
        var td = document.createElement("td");
        td.colSpan = "9";
        var tr = document.createElement("tr");
        tr.style.height = "5px";
        tr.appendChild(td);
        keresoresz.childNodes[1].insertBefore( tr, keresoresz.childNodes[1].childNodes[4] );
        // Filterek beszúrása
        var filter = document.createElement("td");
        filter.setAttribute("style", "text-align:left;");
        filter.innerHTML = text.filter;
        var date = document.createElement("td");
        var select11, select12, select13, select14 = "";
        if( GM_getValue("fDate") != undefined ) {
          switch( GM_getValue("fDate") )
          { 
            case "---": 
              select11 = "selected='selected'"; 
              break;  
            case "week1": 
              select12 = "selected='selected'"; 
              break; 
            case "week2": 
              select13 = "selected='selected'"; 
              break; 
            case "month": 
              select14 = "selected='selected'"; 
              break;          
          }
        }        
        date.innerHTML = "<select class='valasztasMezo' id='fDate' style='width:152px;'>" + 
                         "<option value='---' "+select11+">" + text.date + "</option>" + 
                         "<option value='week1'"+select12+">" + text.week1 + "</option>" + 
                         "<option value='week2'"+select13+">" + text.week2 + "</option>" + 
                         "<option value='month'"+select14+">" + text.month + "</option>" +
                         "</select>";
        var dash1 = document.createElement("td");
        dash1.setAttribute("style", "text-align:center;");
        dash1.innerHTML = "-";
        var imdb = document.createElement("td");
        var select21, select22, select23, select24, select25 = "";
        if( GM_getValue("fImdb") != undefined ) {
          switch( GM_getValue("fImdb") )
          { 
            case "---": 
              select21 = "selected='selected'"; 
              break; 
            case "imdb1": 
              select22 = "selected='selected'"; 
              break;   
            case "imdb2": 
              select23 = "selected='selected'"; 
              break; 
            case "imdb3": 
              select24 = "selected='selected'"; 
              break; 
            case "imdb4": 
              select25 = "selected='selected'"; 
              break;          
          }
        }        
        imdb.innerHTML = "<select class='valasztasMezo' id='fImdb' style='width:130px;'>" + 
                           "<option value='---' "+select21+">" + text.imdb + "</option>" + 
                           "<option value='imdb1' "+select22+">" + text.imdb1 + "</option>" + 
                           "<option value='imdb2' "+select23+">" + text.imdb2 + "</option>" + 
                           "<option value='imdb3' "+select24+">" + text.imdb3 + "</option>" +
                           "<option value='imdb4' "+select25+">" + text.imdb4 + "</option>" +
                           "</select>";
        var dash2 = document.createElement("td");
        dash2.setAttribute("style", "text-align:center;");
        dash2.innerHTML = "-";
        var slrate = document.createElement("td");
        var select31, select32, select33, select34, select35 = "";
        if( GM_getValue("fSLrate") != undefined ) {
          switch( GM_getValue("fSLrate") )
          { 
            case "---": 
              select31 = "selected='selected'"; 
              break; 
            case "big": 
              select32 = "selected='selected'"; 
              break;   
            case "normal": 
              select33 = "selected='selected'"; 
              break; 
            case "same": 
              select34 = "selected='selected'"; 
              break; 
            case "offer": 
              select35 = "selected='selected'"; 
              break;          
          }
        } 
        slrate.innerHTML = "<select class='valasztasMezo' id='fSLrate' style='width:150px;'>" + 
                           "<option value='---' "+select31+">" + text.slrate + "</option>" + 
                           "<option value='big' "+select32+">" + text.big + "</option>" + 
                           "<option value='normal' "+select33+">" + text.normal + "</option>" + 
                           "<option value='same' "+select34+">" + text.same + "</option>" +
                           "<option value='offer' "+select35+">" + text.offer + "</option>" +
                           "</select>";
        var dash3 = document.createElement("td");
        dash3.setAttribute("style", "text-align:center;");
        dash3.innerHTML = "-";
        var upload = document.createElement("td");
        var select41, select42, select43, select44, select45 = "";
        if( GM_getValue("fBonus") != undefined ) {
          switch( GM_getValue("fBonus") )
          { 
            case "---": 
              select41 = "selected='selected'"; 
              break; 
            case "upload1": 
              select42 = "selected='selected'"; 
              break;   
            case "upload2": 
              select43 = "selected='selected'"; 
              break; 
            case "upload3": 
              select44 = "selected='selected'"; 
              break; 
            case "upload4": 
              select45 = "selected='selected'"; 
              break;          
          }
        }
        upload.innerHTML = "<select class='valasztasMezo' id='fBonus' style='width:130px;'>" + 
                           "<option value='---' "+select41+">" + text.upload + "</option>" + 
                           "<option value='1.5x' "+select42+">" + text.upload1 + "</option>" + 
                           "<option value='2x' "+select43+">" + text.upload2 + "</option>" + 
                           "<option value='2.5x' "+select44+">" + text.upload3 + "</option>" +
                           "<option value='3x' "+select45+">" + text.upload4 + "</option>" +
                           "</select>";
        var tr = document.createElement("tr");
        tr.appendChild(filter);
        tr.appendChild(date);
        tr.appendChild(dash1);
        tr.appendChild(imdb);
        tr.appendChild(dash2);
        tr.appendChild(slrate);
        tr.appendChild(dash3);
        tr.appendChild(upload);
        
        keresoresz.childNodes[1].insertBefore( tr, keresoresz.childNodes[1].childNodes[4] );
        
        document.getElementById("fDate").addEventListener("change",nCore.filterChanged,false);
        document.getElementById("fImdb").addEventListener("change",nCore.filterChanged,false);
        document.getElementById("fSLrate").addEventListener("change",nCore.filterChanged,false);
        document.getElementById("fBonus").addEventListener("change",nCore.filterChanged,false);
      }
    }
    catch(e) {
      error.show( "nCore.addFilters();", e );
    }
  },
  // Ha változott a szűrés frissíteni kell az oldalt
  filterChanged : function() {
    try{
      GM_setValue(this.id, this.value);
      nCore.showTorrents();
      nCore.torrentListing();
    }
    catch(e) {
      error.show( "nCore.filterChanged();", e );
    }
  },
  // A szűrési feltételeknek megfelelően kiszámolja, hogy az adott torrent megjeleníthető-e
  // A torrent értékeit frissíti, majd a végén még a sorszínezést is beállítja
  showTorrents : function() {
    try {
      // Feltöltési dátum szűrés beállítása
      var today = new Date();
      var dateFilter = new Date();
      switch(GM_getValue("fDate")) {
        case "week1":
          dateFilter.setDate(today.getDate() - 7);
          break;
        case "week2":
          dateFilter.setDate(today.getDate() - 14);
          break;
        case "month":
          dateFilter.setDate(today.getDate() - 30);
          break;
        default:
          dateFilter.setDate(today.getDate() - 3650);
          break;
      }
      // IMDB szűrés beállítása
      var imdbLow = 0;
      var imdbHigh = 10;
      var fImdb = false;
      switch(GM_getValue("fImdb")) {
        case "imdb1":
          imdbLow = 0; imdbHigh = 5; fImdb = true;
          break;
        case "imdb2":
          imdbLow = 5; imdbHigh = 7; fImdb = true;
          break;
        case "imdb3":
          imdbLow = 7; imdbHigh = 9; fImdb = true;
          break;
        case "imdb4":
          imdbLow = 9; imdbHigh = 10; fImdb = true;
          break;
        default:
          fImdb = false;
          break;
      }
      // S / L szűrés beállítása
      var slLow = 0;
      var slHigh = 99999;
      switch(GM_getValue("fSLrate")) {
        case "big":
          slLow = 0; slHigh = 0.25;
          break;
        case "normal":
          slLow = 0.25; slHigh = 0.75;
          break;
        case "same":
          slLow = 0.75; slHigh = 1.3;
          break;
        case "offer":
          slLow = 1.3; slHigh = 99999;
          break;
      }
      // Feltöltési szorzó beállítása
      var fBonus = GM_getValue("fBonus");
      if( fBonus == "---" ) {
        fBonus = false;
      }
      // Sorkorrekcióhoz
      var j = 0;
      for( var i = 0; i < nCore.torrents.length; i++ ) {
        // Elrejtem az elemet
        nCore.torrents[i].description.style.display = "none";
        nCore.torrents[i].element.style.display = "none";
        nCore.torrents[i].visible = false;
        // Szükséges előkészítés
        var ratio = nCore.torrents[i].seeder / nCore.torrents[i].leecher;
        if( nCore.torrents[i].seeder == 0 && nCore.torrents[i].leecher == 0 ) {
          ratio = 1;
        } else if ( nCore.torrents[i].leecher == 0 ) {
          ratio = 1.3;
        }
        // Kiszámítás, hogy megjeleníthető-e
        if( ( nCore.torrents[i].date > dateFilter ) && ( !fImdb || ( fImdb && ( imdbLow <= nCore.torrents[i].imdb && nCore.torrents[i].imdb < imdbHigh ) ) ) && ( slLow <= ratio && ratio < slHigh ) && ( !fBonus || ( nCore.torrents[i].bonus == fBonus ) ) ) {
          nCore.torrents[i].element.style.display = "block";

          if( nCore.torrents[i].descrOpen ) {
            nCore.torrents[i].description.style.display = "block"; 
          }

          nCore.torrents[i].visible = true;
          // Sor színezés korrekció
          if( (j % 2) == 0 ) {
            nCore.torrents[i].element.childNodes[3].className = "box_nagy2";
          } else {
            nCore.torrents[i].element.childNodes[3].className = "box_nagy";
          }
          j++;
        }      
      }
    }
    catch(e) {
      error.show( "nCore.showTorrents();", e );
    }
  },    
  // Hozzáadja a borító nézet vezérlőt
  addCoverViewController : function() {
    try {
      var container = document.createElement("div");
      container.setAttribute("style", "float:right;padding:0px 4px 0px 0px;cursor:pointer;");
      var image = document.createElement("img");
      image.id = "CoverViewIcon";
      image.setAttribute("style", "display:block;float:left;height:16px;");
      var label = document.createElement("div");
      label.setAttribute("style", "float:left;height:16px;padding: 1px 0px 0px 5px;");
      label.id = "CoverViewText";
      if( GM_getValue("listMode") == "cover" ) {        
        label.innerHTML = text.listView;
        image.src = tools.img.list;
      } else {
        label.innerHTML = text.coverView;
        image.src = tools.img.cover;
      }
      container.appendChild(image);
      container.appendChild(label);
      container.addEventListener("click", nCore.changeListMode, false);
      var listaFej = document.getElementsByClassName("lista_fej");
      if( listaFej != null && listaFej != undefined && listaFej.length > 0 ) {
        listaFej[0].appendChild(container);
      }
    }
    catch(e) {
      error.show( "nCore.addCoverViewController();", e );
    }
  },
  // Vált a listás és borító nézet között
  changeListMode : function() {
    try {
      var cvi = document.getElementById("CoverViewIcon");
      var cvt = document.getElementById("CoverViewText");
      if( GM_getValue("listMode") == "cover" || GM_getValue("listMode") == undefined ) {
        cvi.src = tools.img.cover;
        cvt.innerHTML = text.coverView;
        GM_setValue("listMode", "list"); 
      } else if ( GM_getValue("listMode") == "list" ) {
        cvi.src = tools.img.list;
        cvt.innerHTML = text.listView;
        GM_setValue("listMode", "cover");    
      } 
      nCore.torrentListing();
    }
    catch(e) {
      error.show( "nCore.changeListMode();", e );
    }
  },
  // Eldönti, hogy listás vagy borító nézetben kell-e megjeleníteni a torrenteket
  // Majd annak megfelelően megjelenít
  torrentListing : function() {
    try {
      var boxAlcimek = document.getElementsByClassName("box_alcimek_all");
      var boxTorrent = document.getElementsByClassName("box_torrent_all");
      var listaLab = document.getElementsByClassName("lista_lab");
      var coverView = document.getElementById("torrentCoverView");
      if( coverView != null && coverView != undefined ) {
        var coverViewFix = document.getElementById("torrentCoverViewFix");
        coverView.parentNode.removeChild(coverView);
        coverViewFix.parentNode.removeChild(coverViewFix); 
      }    
      if( GM_getValue("listMode") == "cover") {
        if( boxAlcimek != null && boxAlcimek != undefined && boxAlcimek.length > 0 ) {
          boxAlcimek[0].style.display = "none";
        }
        if( boxAlcimek != null && boxAlcimek != undefined && boxAlcimek.length > 0 ) {
          boxTorrent[0].style.display = "none";
        }
        if( boxAlcimek != null && boxAlcimek != undefined && boxAlcimek.length > 0 ) {
          listaLab[0].style.display = "none";
        }
        var container = document.createElement("div");
        container.id = "torrentCoverView";
        container.setAttribute("style", "width:900px;");
        var clearFix = document.createElement("div");
        clearFix.id = "torrentCoverViewFix";
        clearFix.setAttribute("style", "clear:both;");
        var listaAll = document.getElementsByClassName("lista_all");
        if( listaAll != null && listaAll != undefined && listaAll.length > 0 ) {
          listaAll[0].appendChild(container);
          listaAll[0].appendChild(clearFix);
        }
        for( var i = 0; i < nCore.torrents.length; i++ ) {
          if( nCore.torrents[i].visible ) {
            if( nCore.torrents[i].cover != undefined || GM_getValue("coverView") == 1 ) {
              container.appendChild(nCore.torrentCoverBox(nCore.torrents[i]));
            }
          }
        }
        if( container.innerHTML == "" ) {
          container.innerHTML = "<div style='padding:10px;text-align:center;background-color:#616161;border: 1px solid #828282;margin-top:2px;'>"+text.coverViewReq+"</div>";
        }
      } else {
        if( boxAlcimek != null && boxAlcimek != undefined && boxAlcimek.length > 0 ) {
          boxAlcimek[0].style.display = "block";
        }
        if( boxAlcimek != null && boxAlcimek != undefined && boxAlcimek.length > 0 ) {
          boxTorrent[0].style.display = "block";
        }
        if( boxAlcimek != null && boxAlcimek != undefined && boxAlcimek.length > 0 ) {
          listaLab[0].style.display = "block";
        }
      }
    }
    catch(e) {
      error.show( "nCore.torrentListing();", e );
    }
  },
  // Létrehozza a borító nézethez szükséges HTML kódot
  torrentCoverBox : function(current) {
    try {
      var container = document.createElement("div");
      container.setAttribute("style", "float:left;width:176px;height:290px;margin:5px 2px 0px 0px; background-color:#616161;border:1px solid #828282;");
      var link = document.createElement("a");
      link.href = current.link;
      link.setAttribute("style", "line-height:10px;font-size:10px;");
      link.title = current.label;
      var header = document.createElement("div");
      header.setAttribute("style", "width:166px;height:32px;margin:5px;");
      var category = document.createElement("img");
      category.src = current.category;
      category.setAttribute("style", "float:left;margin:0px 5px 0px 0px;border:1px solid #828282;");
      var name = document.createElement("div");
      name.setAttribute("style", "float:left;width:108px;height:32px;overflow:hidden;word-wrap:break-word;text-align:left;border-bottom:1px solid #828282;");
      name.innerHTML = current.label;
      var body = document.createElement("div");
      body.setAttribute("style", "width:166px;height:245px;padding:0px 5px 5px 5px;text-align:center;");
      var cover = document.createElement("img");
      cover.setAttribute("style", "max-height:245px;max-width:166px;");
      cover.src = current.cover;
      
      header.appendChild(category);
      header.appendChild(name);
      body.appendChild(cover);
      link.appendChild(header);
      link.appendChild(body);
      container.appendChild(link);
      return container;
    }
    catch(e) {
      error.show( "nCore.torrentCoverBox();", e );
    }
  },
  // Ezzel az AJAX kéréssel tölti le a torrent leírását tartalmazó HTML kódot
  // Használja a click és a mindent nyitó-záró is
  doAJAX : function(id) {
    try {
      if( typeof id == "object" ) {
        id = this.rel;
      }
      var element = document.getElementById(id);
      var loading = "<div class=\"torrent_lenyilo_lehetoseg\"><div class=\"lehetosegek\">Lehet\u0151s\xE9geid:</div><div class=\"letoltve\"><a href=\"torrents.php?action=download&id="+id+"\"><img src=\"styles/div_link.gif\" class=\"torr_reszletek_btn\"></a></div><div class=\"letoltve_txt\"><a href=\"torrents.php?action=download&id="+id+"\">Torrent let\xF6lt\xE9se</a></div></div><div class=\"torrent_lenyilo_tartalom\"><div style=\"margin:10px 0;text-align:center\"><img src=\"styles/ajax.gif\" title=\"T\xF6lt\xE9s...\" /></div></div><div class=\"torrent_lenyilo_lab\"></div>";
      if (element.innerHTML == "" || element.innerHTML == loading) {
        element.innerHTML = loading;
        element.style.display = element.style.display == "none" ? "block" : "none";
        $.get('ajax.php?action=torrent_drop&id='+id,function(data){
          //e.html(data);
          nCore.embedImages(element, data);
          $('#'+id+' .fancy_groups').fancybox({
            'titleShow'   :false,
            'titleFormat' :false,
            'transitionIn'	:	'elastic',
        		'transitionOut'	:	'elastic',
        		'speedIn'		  :	500, 
        		'speedOut'		:	300, 
        		'overlayShow'	:	true,
        		'overlayColor': '#000',
        		'overlayOpacity': 0.5
          });
        });
        /*
        GM_xmlhttpRequest({
          method: "GET",
          url : "ajax.php?action=torrent_drop&id="+id,
          onload: function(result) {
            nCore.embedImages(element, result.responseText);
          },
          onerror: function(result) {
            throw { name : "AJAX Error", message : "URL: "+result.finalUrl+"<br />Response status: "+result.status+" "+result.statusText };
          }
        });
        */
      } else {
        element.style.display = element.style.display == "none" ? "block" : "none";
      }
      for( var i = 0; i < nCore.torrents.length; i++ ) {
        if( nCore.torrents[i].id == id ) {
          nCore.torrents[i].descrOpen = element.style.display == "block" ? true : false;
          break;
        }
      }
    }
    catch(e) {
      error.show( "nCore.doAJAX();", e );
    }
  },   
  // Betölti a leírást, majd megkeresi a képeket, és beágyazza őket
  embedImages : function(e, html) {
    try {
      e.innerHTML = html;
      // Előnézeti képek kezelése
      var content = e.childNodes[2];
      var images = content.getElementsByTagName("img");
      if( images != null && images != undefined && images.length > 0 ) {
        for( var i = 0; i < images.length; i++ ) {
          var container = images[i].parentNode.parentNode;
          if( container.tagName == "DIV" && container.className == "torrent_kep_ico2" ) {
            container.style.width = "auto";
            container.style.height = "auto";
            container.style.background = "transparent";
            var url = images[i].parentNode.href;
            if( images[i].parentNode.className == "fancy_groups" ) {
              images[i].parentNode.innerHTML = "<img src='"+url+"' style='border:0px;max-width:280px;max-height:500px;' />";
            } else {
              nCore.embedImagesAJAX(container, url);
            }
          } 
          else if( container.tagName == "TD" ) {
            container.parentNode.parentNode.parentNode.style.width = "100%";
            container.style.width = "100%";
            container.style.textAlign = "center";
            var url = images[i].parentNode.href;
            if( url.match(/https?\:\/\/(www.)*kepfeltoltes\.hu\/view\//i) ) {
              url = url.replace("/view/","/");
            }
            container.innerHTML = "<a href='"+url+"' target='_blank' rel='clearbox[gallery="+e.id+"]'><img src='"+url+"' style='border:0px;max-width:800px;max-height:1500px;' /></a>";
            var unwanted = container.parentNode.childNodes[3];
            unwanted.innerHTML = "";
            unwanted.style.display = "none";
          }
        }
        var prevtxt = content.getElementsByClassName("kepmeret_txt");
        if( prevtxt != null && prevtxt != undefined && prevtxt.length > 0 ) {
          for( var i = 0; i < prevtxt.length; i++ ) {
            prevtxt[i].style.textAlign = "center";  
          }
        }   
      }
      // sima linkként hivatkozott kép
      /*
      var links = content.getElementsByClassName("bb-url");
      if( links != null && links != undefined && links.length > 0 ) {
        for( var i = 0; i < links.length; i++ ) {
          var url = links[i].href;
          if( url.match(/\.(jpe?g|png|gif)/i) ) {
            url = url.substring(22);
            links[i].href = url;
            links[i].setAttribute("rel","clearbox[gallery="+e.id+"]");
            links[i].innerHTML = "<img src='"+url+"' style='border:0px;max-width:800px;max-height:1500px;' /><br />"+url;
          }
        }
      }      
      if( unsafeWindow.CB_Init != undefined ) {
        unsafeWindow.CB_Init();
      }
      */
    } catch(e) {
      error.show( "nCore.embedImages();", e );
    }
  }, 
  // Egyszerű képmegjelenítésnél ki kell kerülni az nCore átirányítását
  // Mert nem a képet linkeli, hanem a képet és Analytics kódot tartalmazó HTML oldalt
  embedImagesAJAX : function(element, url) {
    try {
      $.get(url,function(data){
        var imgURL = data.substring(10,data.indexOf("\" border=\"0\" alt=\"\" />"));
        element.innerHTML = "<a href='"+imgURL+"' target='_blank'><img src='"+imgURL+"' style='border:0px;max-width:280px;max-height:500px;' /></a>";
      });
      /*
      GM_xmlhttpRequest({
        method: "GET",
        url: url,
        onload: function(response) {
          var imgURL = response.responseText.substring(10,response.responseText.indexOf("\" border=\"0\" alt=\"\" />"));
          element.innerHTML = "<a href='"+imgURL+"' target='_blank'><img src='"+imgURL+"' style='border:0px;max-width:280px;max-height:500px;' /></a>";
        }
      });
      */
    } catch(e) {
      error.show( "nCore.embedImagesAJAX();", e );
    }     
  }, 
  // A saját vezérlőt hozzáadja a jobb alsó sarokba
  // A minimal verzió csak a tetőre ugrást tudja
  addController : function(mode) {
    try {         
      
      var image = document.createElement('img');
      image.src = tools.img.top;
      image.setAttribute("style","cursor:pointer;opacity:0.6;");
      image.title = text.top;
      image.addEventListener("click",nCore.scrollUP,false);
      var controller = document.createElement('div');
      controller.setAttribute("style", "position:fixed;bottom:10px;right:10px;");
      controller.appendChild(image);      
      
      if( mode != "minimal" ) {
        var toggleImage = document.createElement('img');
        toggleImage.src = tools.img.toggle;
        toggleImage.setAttribute("style","opacity:0.6;-moz-transform: rotate(180deg);");
        toggleImage.title = text.allOpen;
        var toggle = document.createElement('div');
        toggle.setAttribute("style","margin-top:5px;cursor:pointer;");
        toggle.className = "open";
        toggle.id = "iToggle";
        toggle.addEventListener("click",nCore.toggle,false);
        toggle.appendChild(toggleImage);
        controller.appendChild(toggle);        
      }
      
      document.getElementById("div_body").appendChild(controller);
    }
    catch(e) {
      error.show( "nCore.addController();", e );
    }
  },
  // Ez a mindent nyit-zár vezérlő kódja
  toggle : function() {
    try {
      switch(this.className) {
        case "open":
          for( var i = 0; i < nCore.torrents.length; i++ ) {
            if( nCore.torrents[i].visible ) {
              nCore.doAJAX(nCore.torrents[i].id);
            }
          }
          this.childNodes[0].setAttribute("style","opacity:0.6;-moz-transform:rotate(0deg);");
          this.className = "close"; 
          break;
        case "close":
          for( var i = 0; i < nCore.torrents.length; i++ ) {
            var description = document.getElementById(nCore.torrents[i].id);
            description.style.display = "none";
          }
          this.childNodes[0].setAttribute("style","opacity:0.6;-moz-transform:rotate(180deg);");
          this.className = "open";
          break;
      }
    }
    catch(e) {
      error.show( "nCore.toggle();", e );
    }    
  },
  // Az oldal tetejére görget
  scrollUP : function() {
    try {
      if( window.pageYOffset > 0 ) {
        scroll(window.pageXOffset,window.pageYOffset-200);
        setTimeout(nCore.scrollUP,10);
      }
    }
    catch(e) {
      error.show( "nCore.scrollUP();", e );
    }
  },  
  // Ezen a ponton indul a feldolgozás
  init : function() {
    try {
      // GM változók előkészítése, ha szükséges
      tools.prepareVars();
      // Aláírás beágyazása
      tools.signature();
      // Frissítés ellenőrzése
      tools.update();
      // Aktuális oldal érzékelése
      nCore.detectPage();
      // A Tools admin felületéhez szükséges módosítás
      if( nCore.page == "admin" ) {
        admin.addMenuLink();
        if ( nCore.subPage == "tools" ) {
          admin.show();
        }
      }
      // A könyvjelzők oldalhoz szükséges módosítások
      if( nCore.page == "bookmark" ) {
        nCore.bookmarkDowload();
      }
      // A Tools torrent felletéhez szükséges módosítás
      if( nCore.page == "torrent" ) {
        // Szűrést törölni kell
        if( nCore.subPage == "clear" ) {
          GM_setValue("fDate","---");
          GM_setValue("fImdb","---");
          GM_setValue("fSLrate","---");
          GM_setValue("fBonus","---");
          nCore.subPage = "";
        }
        if( nCore.subPage == "" ) {
          // Reklámok eltávolítása a listázó oldalakon
          if( GM_getValue("removeAds") == 1 ) {
            nCore.removeAds(); 
          }
          // Kereső kinyitása a listázó oldalakon
          if( GM_getValue("searchBox") == 1 ) {
            nCore.openSearch(); 
          }
          // Szűrő hozzáadása a listázó oldalakon
          if( GM_getValue("customSearch") == 1 ) {
            nCore.addFilters(); 
          }
          // Saját vezérlő hozzáadása a listázó oldalakon
          if( GM_getValue("controller") == 1 ) {
            nCore.addController(); 
          }
          // Torrentek előkészítése
          nCore.prepareTorrents();
          // Torrentek megjelenítése szűrésnek megfelelően
          nCore.showTorrents();
          // Borító nézet beágyazása
          nCore.addCoverViewController();
          // Nézet futtatása
          nCore.torrentListing();
        } else {
          // Saját (minimál) vezérlő hozzáadása a torrentekkel foglalkozó oldalakon
          if( GM_getValue("controller") == 1 ) {
            nCore.addController("minimal"); 
          }
        }
      }
      // Privát védelem
      eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('2(a.b=="c"){9 1=8.4("5");2(1!=7&&1!=d&&1.e>0){1[0].l="<3 j=\'i\'>f g h m 6 k.</3>"}}',23,23,'|boxTorrents|if|div|getElementsByClassName|box_torrent_all_mini|torrentet|null|document|var|nCore|page|secret|undefined|length|Jelenleg|nem|futtat|lista_mini_error|class|sem|innerHTML|egyetlen'.split('|'),0,{}));
      // jQuery
      $ = unsafeWindow.jQuery.noConflict(true);
    } 
    catch(e) {
      error.show( "nCore.init();", e );
    }
  }
};

nCore.init();