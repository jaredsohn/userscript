// ==UserScript==
// @name       Spiegel: Samstags Bundesliga News verstecken
// @namespace  Spiegel Bundesliga
// @version    0.1
// @description Versteckt Samstags den Bundesliga Liveticker um Ergebnisse nicht vorzeitig zu verraten
// @match      http://www.spiegel.de/
// @copyright  2012+, me
// ==/UserScript==

function forEach(array, fn) {
  for (i = 0; i < array.length; i++)
    fn(array[i], i);
}

function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}

var today = new Date();
var isSaturday = today.getDay() == 6;
if(!isSaturday){
  return;
}

var matchHeadlines = ['+++ Bundesliga-Liveticker +++', 'Fußball-Bundesliga'];
var headlines = document.querySelectorAll('.teaser span.headline-intro');
var href ='';


if(headlines){
    forEach(headlines, function(item, i){
        if(inArray(item.innerText, matchHeadlines)) {
            href = item.parentNode.getAttribute('href');
            item.parentNode.parentNode.parentNode.innerHTML = '<h2><a href="'+ href +'"><span class="headline">Versteckt: ' + item.innerText + '</span></a></h2>';
        }
     });
}