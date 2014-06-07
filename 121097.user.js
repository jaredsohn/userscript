// ==UserScript==
// @name		Underfoule bricoleur
// @version		1.4
// @description	Répare la traduction et permet d'étendre les fils en l'absence de www
// @match       http://www.underfoule.net/*
// @match		http://underfoule.net/*
// @include		http://www.underfoule.net/*
// @include		http://underfoule.net/*
// @author		Anon
// @license		Tu apprécies ? Paye-moi une bière à une DLVV.
// ==/UserScript==
// Soupe Anon ?

addEventListener('load', function (e) {

var balls = document.getElementsByClassName("polandball");

for(i in balls) {
    var ball = balls[i];
    var parent = ball.parentNode;

    if(parent == undefined)
        continue;       //Arrive trois fois : une fois lorsque que ce code est charge, et deux fois a la fin quand i == "length" puis i == item(). Ce langage est une blague.

    var siblings = parent.childNodes;
    var numero = siblings[siblings.length - (parent instanceof HTMLDivElement ? 4 : 2)].id; //Dépend de nouveau poste ou réponse

    ball.childNodes[0].onclick = (function(num) { return function () { traduire(num, true); } })(numero);       //Une fonction anonyme qui balance une closure. Riz.
}

language = (function() {
    var lang = navigator.appName == 'Microsoft Internet Explorer' ? navigator.browserLanguage : navigator.language;
    return lang.substring(0,lang.indexOf("-"))
})();

function traduire(id, notify) {
        var p = document.getElementById(id);

        if (p == undefined) {
                alert("Element doesn't exist");
        } else if (p.translated == undefined) {
            p.translated = p.innerHTML;

            var appId = "425C085C7974CD363FCD924A08DA6DDE4561915A";
            var from = "";
            
            /*
            Bing translate ne gere pas les balises HTML.
            Il faut donc que je separe le texte et que je ne traduise que les elements qui sont du texte brut.
            */
            var elements = p.childNodes;
            var aTraduire = [];     //va contenir le texte brut
            var indexes = [];       //va contenir les index auxquels il faudra mettre les traductions dans elements
            for(i in elements)
                if(i != "length" && i != "item" && elements[i].tagName == undefined && elements[i].data.trim() != "") {  //Texte brut, non vide
                    aTraduire.push('"' + elements[i].data + '"');
                    indexes.push(i);    //On garde la position de l'élément qu'on va traduire
                }

            var aTraduireStr = "[" + aTraduire + "]";       //Les crochets sont necessaires, comme les précédents guillemets.
            var source = "http://api.microsofttranslator.com/V2/Ajax.svc/TranslateArray?oncomplete=callback&appId=" + appId + "&from=" + from + "&to=" + language + "&texts=" + aTraduireStr;

            //Et maintenant on requiert la page, et on parse le contenu
            var rappel = function(reponse) { 
                var callback = function(traduction) {

                    //On met les éléments à jour
                    var j = 0;
                    for(i in traduction)
                        elements[indexes[j++]].data = traduction[i].TranslatedText

                    if (notify) {
                        //On insère un petit message :3
                        var div = document.createElement("div");
                        div.setAttribute("style", "color: #2f4f4f; font-weight: bold; margin-bottom: 6px");
                        div.textContent = "Language: " + traduction[0].From + " -> " + language;
                        p.insertBefore(div, elements[0]);   //Rappel : p est le parent d'elements
                    }
                }
                eval(reponse);
            };

            //BON PTIT XHR
            var xmlhttp = window.XMLHttpRequest ? xmlhttp=new XMLHttpRequest() : xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                    rappel(xmlhttp.responseText);
                }
            }
            xmlhttp.open("GET", source, true);
            xmlhttp.send();

        } else {
            //Traduction -> original
            p.innerHTML = p.translated
            p.translated = undefined
        }
};




//Changer ku_boardspath pour régler le problème d'expansion des fils en l'absence de www
//De plus, il y a un probleme similaire dans le chemin du fichier des traductions
//Enfin, la variable gettext a déjà été initialisée à ce moment -> il faut la réinitialiser
var script = document.createElement("script");
script.type = "text/javascript";
script.textContent = "ku_boardspath = 'http://' + window.location.host; " +
"var trad = document.getElementsByTagName('link')[1]; " +
"trad.href = ku_boardspath + trad.href.substring(26); " +
"gt = new Gettext({ 'domain' : 'kusaba' });";

document.getElementsByTagName('head')[0].appendChild(script);

}, false);