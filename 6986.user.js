// ==UserScript==
// @name           Googleanonymous
// @author         Ajnasz
// @namespace      http://ajnasz.hu/googleanonymous
// @description    Add an anonymizer (http://anonym.to) link to the google results
// @include        *.google.*/search*
// ==/UserScript==


(function () {
    /**
     * Get the links from the page
     * @return {Array} out
     */
    var getLinks = function () {
        var links = document.getElementsByTagName('a'), linksl = links.length, i, out = [];
        for (i = 0; i < linksl; i += 1) {
            if (links[i].className === 'l') {
                out.push(links[i]);
            }
        }
        return out;
    },

    /**
     * Append the link to anonym.to
     */
    anonym = document.createElement('a'),
        sp = document.createTextNode(' '),
        anoImg = document.createElement('img'),
        links = getLinks(),
        linksl = links.length,
        i, a, s, ai, link;

    anonym.setAttribute('style',
      'font-family:monospace;font-weight:normal;text-decoration:none;');

    anoImg.setAttribute('alt', '*8|');
    anoImg.setAttribute('title', 'anonimize');
    anoImg.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAAN' +
      'SUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAoNJREFUOI1' +
      '9kz1MU1EUx38t7xKltFQIBdLKhx8BExESk0ZjDCFEIrgoJLCIXXQkmo7OOjjYwd' +
      'EBA4TBoY2DsDUsmEhjQkHFIlptBdFWUV4LDbzLew6PVqGJJ7nLvTn/8zvn/o/FM' +
      'AyDAxEM+A9eAdDvDxTdWf4VyCcufd0gI1wArKwk8XjqqREZjjpLi4QKAsGAn9ef' +
      '0myXe5iPziGE4GM8Tom1hLa2VhYXY1zq7qaudBN3hVIQsRiGYQQDfuaW15heSCC' +
      'EYDEZZctQi3BPuJsp3bFzved8QUTJP+46G9G0DwBsGSqzz99Q53JhGAaGrqPrOs' +
      'cuuBns9LG2Y8PNNgBKMOBndjHB1MsY6+u/8HjcANRVV2PoOg3naom/WEXXdQCkl' +
      'KS+f+PJbAzwmwTB6TmEIqiqrERqEgBd18nPV9/dZXvbrKhpErBQ09QCgBVgYGAQ' +
      'TWqFkxfIV81ms6TS6QKBJjVcrlqzBYDR0VFyuS2qKqsKA3sfj9Pk8RB5FiWVSrG' +
      'hqnsEZoFk4jPJhS8mgc/no+xwGZrUkFJSXuLk8tBFmjub8F5tJ5VO83N93RTYo6' +
      'xvaKSvy2sSbCbn2VBVKiocgIWs9TcjD56iqip37t/i7dISuVzObEGTWLBQIdOEw' +
      'jGs/f4AHWdbGB4eRkqJlOYQM5kMTrudR3cf47DZOOJwFFo43XqGk3UOJiZn/vog' +
      'k4iSyWSx2+2UKjZu37tZZCSHqETTNA5trRIKx+n3H7Dy9Kt32BvaGRkZQQgFRRE' +
      'IoSCEQAhBb+8VFDVB+/Ha/VbOV8gv08OxKTp6rjE+PsbQ0A3zW38s4z1VTygcYW' +
      'JypkBl+d86h8IR+rq8hMIRgH2J+fgDTnM7f7eRJ30AAAAASUVORK5CYII=');
    anoImg.setAttribute('style', 'width:16px;height:16px;border:0;');

    for (i = 0; i < linksl; i += 1) {
        a = anonym.cloneNode(true);
        ai = anoImg.cloneNode(true);
        s = sp.cloneNode(true);
        link = links[i];
        a.href = 'http://anonym.to/?' + link.href;
        a.appendChild(s);
        a.appendChild(ai);
        link.parentNode.appendChild(a);
    }

})();
