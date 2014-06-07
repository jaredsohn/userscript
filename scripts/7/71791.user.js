// ==UserScript==
// @name           FillItIn
// @namespace      http://schoolsux.tz/
// @description    Checks no on surveys, just enable whenever you need it; you should edit the @include.
// @include           http://www.eltpath.com/*
// @include           http://*.smileymedia.com/*
// @include           http://lgn*.coolsavings.com/*
// @include           http://lnktrckr.com/*
// @include           http://*quizjungle.com/?act_id=*
// @include           http://www.quizjumper.com/*
// @include           http://www.modpath.com/*
// @include           http://www.tnmtechnology.com/*
// @include           http://www.brandarama.com/*
// @include           http://www.topconsumergifts.com/*
// @include           http://offers.slwpath.com/*
// @include           http://us.quizrocket.com/*
// @include           http://www*.recipe4living.com/default*
// @include           http://www.premiumproductsonline.com/*
// @include           https://mysmokingrewards.com/*
// @include           http://www.eversave.com/*
// @include           http://www.thelaptopsaver.com/*
// ==/UserScript==

        // yahoo

 alert (’starting’);

    var yahoo_id = your_yahoo_id_goes_here ;

    if ( url.match (”login.yahoo.com”) != null )
    {
    alert (’Welcome to yahoo..’);
    document.getElementById (’username’).value = yahoo_id ;
    document.getElementById (’passwd’).focus();
    }

    // blogger
    if (url.match ( “blogger.com “) != null)
    {
    //alert (’welcome to blogger’);
    document.getElementById (’f-username’).value = gmail_id;
    document.getElementById (’f-password’).focus();
    }