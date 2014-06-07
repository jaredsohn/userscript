// ==UserScript==
// @name           Histogramy u vsech terminu WISu
// @description    Zobrazi histogramy hodnoceni i u terminu, kde je nekdo skryl
// @include        https://wis.fit.vutbr.cz/FIT/st/course-sl.php*
// ==/UserScript==


function elementText(el)
{
    if (el) {
        if (el.textContent)
            return el.textContent;
        else
            return el.innerText;
    }
}


function buildElement(source)
{
    var wrapper= document.createElement('div');
    wrapper.innerHTML= source;
    return wrapper.firstChild;
}


function fetchGetParams()
{
    var prmstr = window.location.search.substr(1);
    var prmarr = prmstr.split ("&");
    var params = {};

    for (var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }

    return params;
}


function appendHistogram()
{
    // get params
    var params = fetchGetParams();

    if (!params.item) {
        console.log('no item in GET');
        return;
    }

    var itemId = params.item;

    // does the histogram already exist?
    var imgs = document.getElementsByTagName('img');
    for (var i = 0; i < imgs.length; i++) {
        var img = imgs[i];
        console.log(img.src);
        if (img.src.indexOf('/course-sg.php?id=' + itemId) >= 0) {
            console.log('exists!');
            return;
        }
    }

    // append histogram


    // find correct position on page
    var nonprintables = document.getElementsByClassName('noprint');
    var divnoprint = null;
    if (!nonprintables.length) {
        console.log('nonprintables not found!');
        return;
    }

    for (var i = 0; i < nonprintables.length; i++) {
        var noprint = nonprintables[i];
        console.log(noprint.tagName);
        if (noprint.tagName === 'DIV') {
            divnoprint = noprint;
            break;
        }
    }

    if (!divnoprint) {
        console.log('div.noprint not found!');
        return;
    }

    console.log(divnoprint);
    console.log(divnoprint.htmlContent);

    var target = divnoprint.parentNode;

    var newelement =
        '<table cellpadding="4" width="100%" height="75%" bgcolor="white" border="0" bordercolor="#808080">' +
        '<tbody><tr><td>' +
        '<h4>Histogram</h4>' +
        '<img src="course-sg.php?id=' + itemId + '">';

    target.insertBefore(buildElement(newelement), divnoprint);
}


appendHistogram();

