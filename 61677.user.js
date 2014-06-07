// ==UserScript==
// @name            Annihilator - extended
// @namespace       dw.js.gm
// @description     Skrypt dodaje kilka udogodnień do gry
// @include         http://annihilation.pl/mal.php?*
// @require         http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==


$.fn.textNodes = function() {
    return $(this).contents().filter(function(){
        return this.nodeType == 3 || this.nodeName == "BR" ;
    });
}

$.fn.egrep = function(pat) {
    var out = [];
    var textNodes = function(n) {
        if (n.nodeType == Node.TEXT_NODE) {
            var t = typeof pat == 'string' ?
            n.nodeValue.indexOf(pat) != -1 :
            pat.test(n.nodeValue);
            if (t) {
                out.push(n.parentNode);
            }
        }
        else {
            $.each(n.childNodes, function(a, b) {
                textNodes(b);
            });
        }
    };
    this.each(function() {
        textNodes(this);
    });
    return out;
};


(function() {
//    GM_log("start");
    if (checkParam("a","eq")) {
        plecak();
    } else if (checkParam("a","guild")){
        if(checkParam("opt","city")){
            skrytka();
        }
    }
//    GM_log("end");
}());

function checkParam(param, value){
    if(gup(param) == value){
        return true;
    } else{
        return false;
    }
}

function gup( name ) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.top.location.search);
    if( results == null )
        return "";
    else
        return unescape(results[1]);
}

function plecak(){
    $("fieldset.desc").each(function(i){
        var string = $(this).html();
        var a = string.indexOf("ib('", 0) + 4;
        var b = string.indexOf("', HAUTO", 0);
        if (b == -1){ //bierzacy ekwipunek
            b = string.indexOf("');", 0);
        }
        string = string.substring(a, b);

        $(this).append("<div class='item'>"
            +"<span class='show' style='color: #3434EE; font-size: 10pt;'>Poka\u017c<br/></span>"
            +"<div class='sitem'>" + string + "</div>"
            +"</div>");
    });

    $("div.sitem").toggle();

    $("div.item").each(function(){
        var t = $('div',this);
        $(".show",this).click(function(){
            t.toggle();
        });
    });
}


function skrytka(){
    //dodaj przycisk max
    $("form").each(function(i){
        $(this).attr("name","form_" + i);
    });
    var xx = $("div.header div:contains('Z\u0142oto')").textNodes();

    //pobieranie złota
    var x = xx.get(1);
    var zl = x.nodeValue.substr(2, x.nodeValue.length-2);

    //pobieranie złota w skrytce
    x = xx.get(4);
    var zl_s = x.nodeValue.substr(2, x.nodeValue.length-2);

    $("form[name='form_0']").append(createButton("form_0","wplac",zl));
    $("form[name='form_1']").append(createButton("form_1","wloz",zl));
    $("form[name='form_2']").append(createButton("form_2","wez",zl_s));
}

function createButton(formName, text, value){
    var input  = document.createElement("input");
    input.setAttribute("class", "submit");
    input.setAttribute("type", "button");
    input.setAttribute("value", value);
    input.setAttribute("onclick", "document."+formName+"."+text+".value = value;");
    return input;
}