// ==UserScript==
// @name          TW Change Background by TVE
// @description   Aendert den Hindergrund in ein x belibiges Bild
// @namespace     TVE
// @include       http://*.the-west.*
// @exclude       http://*.the-west.de/forum*
// @exclude       http://wiki.the-west.de
// @exclude       http://forum.the-west.*


// ==/UserScript==
ScriptUpdater.check(93022, '0.01');

    function addGlobalStyle(css)
    {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) {return;}
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    addGlobalStyle('#shadow_top                 {display:       none;}');
    addGlobalStyle('#shadow_left_top            {display:       none;}');
    addGlobalStyle('#shadow_right_top           {display:       none;}');
    addGlobalStyle('#shadow_left_wing           {display:       none;}');
    addGlobalStyle('#shadow_right_wing          {display:       none;}');
    addGlobalStyle('#shadow_left_wing_bottom    {display:       none;}');
    addGlobalStyle('#shadow_right_wing_bottom   {display:       none;}');
    addGlobalStyle('#shadow_left_side           {display:       none;}');
    addGlobalStyle('#shadow_right_side          {display:       none;}');
    addGlobalStyle('#shadow_left_corner         {display:       none;}');
    addGlobalStyle('#shadow_right_corner        {display:       none;}');
    addGlobalStyle('#workbar_left               {background:    url(http://malo.redio.de/the-west/workbar_left.png) repeat scroll right bottom transparent;}');
    addGlobalStyle('#workbar_right              {background:    url(http://malo.redio.de/the-west/workbar_right.png) repeat scroll left bottom transparent}');



    // erster Tag ist aussrichtung in der senkrechte: top, center, bottom, der zweite Tag ist die aussrichtung in der waagrechte: left, center, right
    addGlobalStyle('body {background-position:      top center ;}');
    //repeat das Bild wird waagrecht und senkrecht wiederholt. / repeat-x das Bild wird waagrecht wiederholt. / repeat-y das Bild wird senkrecht wiederholt. / no-repeat das Bild wird nicht wiederholt.
    addGlobalStyle('body {background-repeat:        repeat;}');
    //hier könnt ihr die hintergrundfarbe angeben. Hier könnt ihr eine Farbe auswählen: http://2createawebsite.com/build/hex-colors.html  dort wo hex steht den Inhalt kompieren. Ihr könnt auch den Englishen Farb nahmen nehmen.
    addGlobalStyle('body {background-color:         transparent;}');
    //url(???) dort kommt der Link zu deinem Bild rein. Wenn ihr nur eine Farbe wollt dann lasst ihr es leer..
    addGlobalStyle('body {background-image:         url(http://forum.the-west.de/images/gradients/sand1.jpg);}');