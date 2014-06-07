// ==UserScript==
// @name       PayPal Billionaire
// @namespace  http://www.idolpx.com/greasemonkey
// @version    0.1
// @description  Dynamically adjusts your PayPal balance
// @match      https://www.paypal.com/us/cgi-bin/webscr*
// @copyright  2012+, Jaime Idolpx
// ==/UserScript==

var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js", function() {
    
    function formatCurrency(num) {
        num = num.toString().replace(/\$|\,/g,'');
        if(isNaN(num))
            num = "0";
        sign = (num == (num = Math.abs(num)));
        num = Math.floor(num*100+0.50000000001);
        cents = num%100;
        num = Math.floor(num/100).toString();
        if(cents<10)
            cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
            num = num.substring(0,num.length-(4*i+3))+','+
        num.substring(num.length-(4*i+3));
        return (((sign)?'':'-') + '$' + num + '.' + cents);
    }
    
    var numRand = Math.floor(Math.random()*2000000000) + parseFloat(1000000000);
    $("span.balance").html("&nbsp;<strong>"+formatCurrency(numRand)+" USD</strong>");
});