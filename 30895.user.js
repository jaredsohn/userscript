// ==UserScript==
// @name                sans_accents
// @namespace           http://userscripts.org/scripts/show/30895
// @description         Remplace chaque caractère accentué (àâäãçéèêëìîïòôöõùûüñ)
//			situé dans un des champs d'adresses de gmail par leur caractère
//			sans accent correspondant via CTRL+E
// @include       	http://mail.google.com/mail/*
// @include       	https://mail.google.com/mail/*
// ==/UserScript==

GM_log("execution");

// Remplace chaque caractère du champ par son équivalent non accentué
correct = function(field) {
    var words = field.value;
    words = String(words).replace(/à/g,'a').replace(/â/g,'a').replace(/ä/g,'a')
                         .replace(/ã/g,'a').replace(/ç/g,'c').replace(/é/g,'e')
                         .replace(/è/g,'e').replace(/ê/g,'e').replace(/ë/g,'e')
                         .replace(/ì/g,'i').replace(/î/g,'i').replace(/ï/g,'i')
                         .replace(/ò/g,'o').replace(/ô/g,'o').replace(/ö/g,'o')
                         .replace(/õ/g,'o').replace(/ù/g,'u').replace(/û/g,'u')
                         .replace(/ü/g,'u').replace(/ñ/g,'n');
    field.value = words;
}

// Applique les changements aux trois champs d'adresses de gmail
fields_correct = function() {
    correct(document.getElementsByName("to")[0]);
    correct(document.getElementsByName("cc")[0]);
    correct(document.getElementsByName("bcc")[0]);
    alert("Accents retirés !");
}

// Lance la routine via CTRL + E
checkShortcut = function(e){
    if(e.ctrlKey && e.keyCode == 69){ // Ctrl+e
        fields_correct();
    }
}

document.addEventListener("keydown",checkShortcut,false);