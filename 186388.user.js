// ==UserScript==
// @name        MathJax for arxivsorter
// @namespace   http://userscripts.org/users/2850
// @description Use MathJax to render math on arxivsorter
// @include     http://arxivsorter.org/
// @version     1
// ==/UserScript==


(function () {
    var script = document.createElement("script");
    script.type = "text/x-mathjax-config";
    script.text = "MathJax.Hub.Config({" +
                  "extensions: [" +
                  "'tex2jax.js', " + 
                  "'TeX/AMSmath.js', " + 
                  "'TeX/AMSsymbols.js', " + 
                  "'TeX/noErrors.js'], " + 
                  "  tex2jax: {" +
                  "    inlineMath: [ ['$', '$' ] ]," +
                  "processEscapes: true, " +
                  "ignoreClass: 'authors|sub_box|abs|metadata|submission-history|extra-services|dateline|leftcolumn|mlabel|mvalue|ignore_mathjax'," +
                  "processClass: 'mathjax'," +
                  "  }," +
                  "TeX: { " +
                  "  noErrors: {" +
                  "    inlineDelimiters: ['$','$'], " +
                  "    multiLine: false, " +
                  "    style: {" +
                  "      'font-size': '100%'," +
                  "      'color': 'black'," +
                  "      'padding': '0px 0px'," +
                  "      'border': ''" +
                  "    }" +
                  "  }" +
                  "}" +
                  "});";
    document.getElementsByTagName("head")[0].appendChild(script);
    
    script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML";
    document.getElementsByTagName("head")[0].appendChild(script);
    
    script = document.createElement("script");
    script.type = "text/javascript";
    script.text = "MathJax.Hub.Startup.onload();"
    document.getElementsByTagName("head")[0].appendChild(script);    
})();


