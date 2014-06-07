    // ==UserScript==
    // @name           F5 Saver
    // @namespace      F5LovesScript
    // @description    Rafraichi la page des tablettes HP sans les mains
    // @include        http://www.cdiscount.com/informatique/tablettes-tactiles-ebooks/tablette-tactile/choix-par-marque/hp/l-10798010220.html
    // ==/UserScript==
    var Time = '30';
    if (Time > 0) setTimeout("location.reload(true);",Time*1000);