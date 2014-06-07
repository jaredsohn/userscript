// ==UserScript==
// @name        suicidal banner
// @namespace   aga
// @include     http://klavogonki.ru/*
// @version     1.3
// @grant       none
// ==/UserScript==


function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.$j=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

//image hosted by aQuatic


function addButton() {
    $j('.banner-content').append("<div class='suicide-button'></div>");

    var style={
        width: 202,
        height: 70,
        background: "url(http://udezogonki.ucoz.ru/1488.png)",
        position: "absolute",
        left: "746px",
        top: "11px",
        "background-position": "0px 0px",
    };
    
    var hover={
        "background-position": "0px  -70px",
    }
    
    $j(".suicide-button").css(style).hover(
        function(){$j(this).css(hover);},
        function(){$j(this).css(style);}
    );

    function changeButton() {
        $j(".tank-up").css("background-image", "url(http://udezogonki.ucoz.ru/1488.png)");    
    }
    
    setTimeout(changeButton, 1000);
}

addJQuery(addButton);