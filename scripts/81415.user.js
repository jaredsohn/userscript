// ==UserScript==
// @name           Filmtipset add movie helper.
// @namespace      http://userscripts.org/users/121410
// @description    Adds an input to load information from IMDb on filmtipsets add movie page.
// @include        http://nyheter24.se/filmtipset/addmovie.cgi
// @include        http://filmtipset.se/addmovie.cgi
// ==/UserScript==

/**
 * Add css style to the document.
 */
function addStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    try {
        style.innerHTML = css;
    } catch(err) {
        style.innerText = css;
    }
    head.appendChild(style);
}

addStyle(
    '.translateBox {padding: 3px 0}' +
    '.translateBox strong {display: block}' +
    '.summaryBox {background: #C5E4B7; padding: 2px}' +
    '.imdbLoadBox {background: #F3F4E7; padding: 10px;}' +
    '.imdbLoadBox h2 {margin: 0; padding: 0 0 10px 0;}' +
    '.imdbLoadBox input[type="text"] {width: 300px; padding: 2px;}'
);

/**
 * Peform a get xmlhttpRequest with a callback function
 */
function get(url, callBack)
{
     GM_xmlhttpRequest({
     method: "GET",
     url: url,
     onload: function(xhr) { callBack(xhr.responseText); }
    });
}

/**
 * Parse the html source of imdb-movies.
 */
function IMDb(imdbMovieContents)
{
    var imdbDOM = document.createElement("DIV");
    imdbDOM.innerHTML = imdbMovieContents;

    var getElementByXpath = function(xpath)
    {
        return document.evaluate(
            xpath,
            imdbDOM,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null
        ).snapshotItem(0);
    }

    var getElementsByXpath = function(xpath)
    {
        var els = document.evaluate(
            xpath,
            imdbDOM,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null
        );
        var ret = [];
        for(var i = 0; i < els.snapshotLength; i++) {
            ret.push(els.snapshotItem(i));
        }
        return ret;
    }

    var buildStringArrayFromNodes = function(nodes)
    {
        var ret = [];
        for(var i in nodes) {
            ret.push(nodes[i].innerHTML);
        }
        return ret;
    }

    this.getTitle = function()
    {
        var title = getElementByXpath("//title").innerHTML;
        return title.substring(0, title.length - 7);
    }

    this.getYear = function()
    {
        return getElementByXpath("//title").innerHTML.substr(-5,4);
    }

    this.getDirectors = function()
    {
        var xpath = '//div[@class="info"]/h5[contains(., "Director")]/../div[1]/a';
        var directors = getElementsByXpath(xpath);
        return buildStringArrayFromNodes(directors);
    }

    this.getWriters = function()
    {
        var writers = getElementByXpath('//h5[contains(., "Writer")]/..');
        if(!writers)
            return [];

        var returnValue = [];
        writers.innerHTML.replace(
            />(.*?)<\/a> \((screenplay|story|written by|original story|writer)\)/gm,
            function(m, n) {returnValue.push(n)}
        );
        return returnValue;
    }

    this.getCast = function()
    {
        xpath = '//table[contains(@class, "cast")]/tbody/tr/td[@class = "nm"]/a';
        var cast = getElementsByXpath(xpath);
        return buildStringArrayFromNodes(cast);
    }

    this.getCountries = function()
    {
        xpath = '//h5[.="Country:"]/../div[1]/a[contains(@href, "/Sections/Countries/")]';
        var countries = getElementsByXpath(xpath);
        return buildStringArrayFromNodes(countries);
    }

    this.getAKA = function()
    {
        xpath = '//h5[. = "Also Known As:"]/../div[1]';
        var aka = getElementByXpath(xpath);
        if(!aka)
            return [];

        var returnValue = [];
        aka.innerHTML.replace(/"(.*?)" -/gm, function(m, n) {returnValue.push(n)});
        return returnValue;
    }

    this.getRuntime = function()
    {
        xpath = '//h5[.="Runtime:"]/../div[1]';
        return getElementByXpath(xpath).innerHTML.match(/\d+/);
    }

    this.getSummary = function()
    {
        xpath = '//h5[.="Plot:"]/../div[1]';
        var summary = getElementByXpath(xpath);
        if(!summary)
            return "";

        return summary.innerHTML.substring(0, summary.innerHTML.indexOf('<'));
    }

    this.getId = function()
    {
        var xpath = '//a[contains(@href, "title/tt")]';
        return getElementByXpath(xpath).href.match(/\d{5,100}/);
    }
}

/**
 * Wrapper for filmtipset add movie form/page.
 */
function FilmtipsetFormHandler()
{
    var getElementByXpath = function(xpath)
    {
        return document.evaluate(
            xpath,
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null
        ).snapshotItem(0);
    }

    var getElementsByXpath = function(xpath)
    {
        var els = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null
        );
        var ret = [];
        for(var i = 0; i < els.snapshotLength; i++) {
            ret.push(els.snapshotItem(i));
        }
        return ret;
    }

    this.setTitle = function(title)
    {
        getElementByXpath('//input[@name="name"]').value = title;
    }

    this.setDirectors = function(directors)
    {
        getElementByXpath('//input[@name="director"]').value = directors;
    }

    this.setYear = function(year)
    {
        getElementByXpath('//input[@name="year"]').value = year;
    }

    this.setAKA = function(arTitles)
    {
        getElementByXpath('//textarea[@name="alt_titles"]').value = arTitles.join("\n");
    }

    this.setWriters = function(writers)
    {
        getElementByXpath('//input[@name="writer"]').value = writers;
    }

    this.setRuntime = function(time)
    {
        getElementByXpath('//input[@name="length"]').value = time;
    }

    this.setCast = function(cast)
    {
        getElementByXpath('//textarea[@name="actors"]').value = cast;
    }

    this.setOriginalTitle = function(name)
    {
        getElementByXpath('//input[@name="orgname"]').value = name;
    }

    this.setImdbId = function(id)
    {
        getElementByXpath('//input[@name="imdbnr"]').value = id;
    }

    this.setCountries = function(countries)
    {
        getElementByXpath('//input[@name="country"]').value = countries;
    }

    this.addCountry = function(country)
    {
        var input = getElementByXpath('//input[@name="country"]');
        if(input.value == '')
            input.value = country;
        else
            input.value += ', ' + country;
    }

    this.setSummary = function(summary)
    {
        var div = document.createElement('div');
        div.innerHTML = summary;
        div.className = 'summaryBox';
        var input = getElementByXpath('//textarea[@name="info"]');
        input.parentNode.insertBefore(div, input);
    }

    this.addTranslateInput = function(eng)
    {
        var div = document.createElement('div');
        var label = document.createElement('label');
        var input = document.createElement('input');
        var button = document.createElement('input');
        var countries = getElementByXpath('//input[@name="country"]');
        getElementByXpath('//select[@name="country"]').style.display = 'none';
        div.className = 'translateBox';
        label.innerHTML = '<strong>Översätt ' + eng + '</strong>';
        label.title = 'Skriv in svensk översättning av ' +
                       eng +
                       ', var noga med stavningen.';
        button.type = 'button';
        button.value = 'Ok';
        input.type = 'text';
        countries.parentNode.insertBefore(div, countries);
        label.appendChild(input);
        div.appendChild(label);
        div.appendChild(button);
        div.style.display = 'none';
        return {'button' : button, 'input' : input};
    }

    this.addImdbInput = function()
    {
        var div = document.createElement('div');
        var input = document.createElement('input');
        var button = document.createElement('input');
        var h1 = document.getElementsByTagName('h1')[0];
        h1.parentNode.appendChild(div, h1);
        div.innerHTML = '<h2>IMDb</h2><span>IMDb-url: </span>';
        div.className = 'imdbLoadBox';
        button.type = 'button';
        button.value = 'Ladda information från IMDb';
        input.type = 'text';
        div.appendChild(input);
        div.appendChild(button);
        return {'button' : button, 'input' : input};
    }
}

/**
 * Translates English country names to Swedish.
 */
function Translator(english, formHandler)
{
    var baseurl = 'http://filmtipset.powha.net/country/?'
    var english = english;
    var elements = formHandler.addTranslateInput(english);

    var showTranslateInput = function()
    {
        elements.button.parentNode.style.display = 'block';
    }

    var hideTranslateInput = function()
    {
        elements.button.parentNode.style.display = 'none';
    }

    var checkStatus = function(data)
    {
        GM_log('Translation added: ' + data);
    }

    var changeStatus = function(data)
    {
        var json = JSON.parse(data);
        if(!json)
            GM_log('Failed to parse translate JSON');

        if(json.notfound.length > 0) {
            elements.button.addEventListener("click", addTranslation, false);
            showTranslateInput();
        } else {
            formHandler.addCountry(json.swedish[0]);
            status = 'Translated';
        }
    }

    var addTranslation = function()
    {
        var swedish = elements.input.value;
        var url = baseurl + 'swedish[]=' + swedish + '&english[]=' + english;
        get(url, checkStatus);
        formHandler.addCountry(swedish);
        hideTranslateInput();
    }

    this.translate = function()
    {
        var url = baseurl + 'english[]='+english;
        get(url, changeStatus);
    }
}

/**
 * General setup/launcher
 */
function GeneralSetup()
{
    var form = new FilmtipsetFormHandler();
    var elements = form.addImdbInput();

    var callImdb = function()
    {
        var url = elements.input.value;
        get(url, initImdb);
    }

    elements.button.addEventListener('click', callImdb, false);

    var initImdb = function(data)
    {
        GM_log('initImdb')
        var imdb = new IMDb(data);
        GM_log('Title: '     + imdb.getTitle());
        GM_log('Year: '      + imdb.getYear());
        GM_log('AKA: '       + imdb.getAKA());
        GM_log('Directors: ' + imdb.getDirectors());
        GM_log('Writers: '   + imdb.getWriters());
        GM_log('Countries: ' + imdb.getCountries());
        GM_log('Cast: '      + imdb.getCast());
        GM_log('Summary: '   + imdb.getSummary());
        GM_log('Runtime: '   + imdb.getRuntime());
        GM_log('IMDd id: '   + imdb.getId());
        form.setTitle(imdb.getTitle());
        form.setDirectors(imdb.getDirectors());
        form.setAKA(imdb.getAKA());
        form.setYear(imdb.getYear());
        form.setOriginalTitle(imdb.getTitle());
        form.setCast(imdb.getCast());
        form.setWriters(imdb.getWriters());
        form.setRuntime(imdb.getRuntime());
        form.setSummary(imdb.getSummary());
        form.setImdbId(imdb.getId());

        var countries = imdb.getCountries();
        for(var i in countries) {
            var trans = new Translator(countries[i], form);
            trans.translate();
        }
    }
}

/* Init the turd */
GeneralSetup();
