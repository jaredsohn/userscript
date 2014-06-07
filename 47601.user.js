/* Google Web Search Redesign Halo 3 v2 - for web & images (dec 2008)
                                        
                                        - Author    : Manozkri  
                                        - Created   : April 27, 2009
                                        - Usage     : Use with Stylish chrome extension (http://userscripts.org/)
                                        
                                        ------------------------------------------------------------------------- */
                                       // ==UserScript==
                                       // @name          Manozkri google
                                     // @include       http://images.google*
                                    // @include       http://www.google*
                                   // ==/UserScript==
                        
                                        @namespace url(http://www.w3.org/1999/xhtml);
                                        
                                        @-moz-document url-prefix("http://www.google"),
                                        url-prefix("https://www.google"),
                                        url-prefix("http://images.google")
                                         {
                                        
                                        #gsr #res .g .s {
                                        max-width:100% !important;
                                        }
                                        
                                        
                                        html {
                                        background: #000000 url("http://i284.photobucket.com/albums/ll8/manozkri/Google_Wallpaper.jpg") top left repeat !important;
                                        background-attachment: fixed !important;
                                        }
                                        
                                        body {
                                        display: block;
                                        -moz-border-radius: 8px !important;
                                        border: 3px solid #585858 !important;
                                        opacity:0.85;
                                        width: 84% !important;
                                        min-width: 815px !important;
                                        padding: 8px 1.2% 0px 1.2% !important;
                                        margin: 51px auto 30px auto !important;
                                        background: #111111 !important;
                                        font-family: Verdana, Tahoma, Helvetica, Times !important;
                                        font-weight: bold !important;
                                        color: #ffffff !important;
                                        }
                                        
                                        
                                        /* Couleur du texte général */
                                        div, td, font[color="#000000"] { color: #fff !important; }
                                        
                                        /* Couleur du texte solution images */
                                        font[color="#224499"] {
                                        color: #116DA6 !important;
                                        }
                                        
                                        
                                        /* Logos */
                                        a#logo[title*="Google Home"]{
                                        font-size: 0 !important;
                                        width:95px !important;
                                        height:45px !important;
                                        text-indent:-999px !important;
                                        padding:45px 95px 0 0 !important;
                                        float:right !important;
                                        background:transparent url(http://lh3.ggpht.com/nitevish/SMEp7sY7d3I/AAAAAAAAAJU/YkAEgv5nlaA/google_minin.png) left top no-repeat !important;
                                        }
                                        
                                        
                                        
                                        /* Zone de recherche */
                                        input[type=text], input[name=q] {
                                        -moz-appearance: none !important;
                                        border: solid 1px #585858 !important;
                                        -moz-border-radius: 6px !important;
                                        background: #292a2b !important;
                                        padding-top: 29px !important;
                                        padding-bottom: 2px !important;
                                        padding-left: 12px !important;
                                        padding-right: 12px !important;
                                        font-weight: bold !important;
                                        font-family: Verdana, Tahoma, Helvetica, Times !important;
                                        color: #f5f5f5 !important;
                                        }
                                        
                                        
                                        
                                        /* liens  */
                                        a:link, a, p { color: #ffffff !important;
                                        font-family: Verdana, Tahoma, Helvetica, Times !important;
                                        text-decoration:none; }
                                        a:visited { color: #c6c6c6 !important;
                                        font-family: Verdana, Tahoma, Helvetica, Times !important;
                                        text-decoration:none; }
                                        a:hover{ color: #a2a2a2 !important;
                                        font-family: Verdana, Tahoma, Helvetica, Times !important;}
                                        
                                        #header {
                                        padding-top: 0;
                                        }
                                        
                                        .gbh {
                                        display: none !important;
                                        }
                                        
                                        tr[valign="top"] td table{
                                        width: 100% !important;
                                        }
                                        tr[valign="top"] td table input[type='text']{
                                        width: 50% !important;
                                        }
                                        input[name='q']{
                                        outline: none;
                                        padding:2px !important;
                                        -moz-border-radius: 4px;
                                        border: 1px solid #ccc !important;
                                        }
                                        
                                        
                                        
                                        /*barre du haut en dessous de la recherche */
                                        .t, table [bgcolor="#e5ecf9"], table [bgcolor="#d5ddf3"], .hd, td.ttb, td.rsb, td.bts, h4, .page-title, td#headerText, #ssb {
                                        background: #111111 !important;
                                        }
                                        
                                        
                                        
                                        
                                        /* boutons web, images, etc */
                                        #gbar{
                                        background-color: #292a2b;
                                        border-bottom: 1px solid #5a5a5a;
                                        }
                                        
                                        
                                        
                                        /* menu actif */
                                        #gbar b.gb1{
                                        -moz-border-radius-topright: 4px !important;
                                        -moz-border-radius-topleft: 4px !important;
                                        border: 1px solid #57BEEA !important;
                                        border-bottom: 0px none !important;
                                        font-family: Verdana, Tahoma, Helvetica, Times;
                                        color: #ffffff;
                                        font-weight: 700;
                                        background-color: #07638C;
                                        }
                                        
                                        
                                        
                                        /* suite du menu */
                                        #gbar a.gb1, a.gb2 {
                                        font-weight: 700 !important;
                                        font-family: Verdana, Tahoma, Helvetica, Times;
                                        color: #a7a7a8 !important;
                                        }
                                        #gbar a.gb1:hover, a.gb2:hover {
                                        -moz-border-radius-topright: 4px !important;
                                        -moz-border-radius-topleft: 4px !important;
                                        color: #ffffff! important;
                                        font-family: Verdana, Tahoma, Helvetica, Times;
                                        background-color: #07638C;
                                        border: 1px solid #57BEEA !important;
                                        border-bottom: 0px none !important;
                                        }
                                        #gbar .gb1, .gb2 {
                                        font-family: Verdana, Tahoma, Helvetica, Times;
                                        line-height: 20px;
                                        font-size: 12px;
                                        border: 1px solid transparent;
                                        border-bottom: 0px none;
                                        display: block;
                                        text-decoration: none;
                                        float: left;
                                        padding: 0px 5px 0px 5px;
                                        }
                                        
                                        
                                        
                                        /* plus */
                                        #gbar a.gb3 {
                                        font-weight: 700 !important;
                                        font-family: Verdana, Tahoma, Helvetica, Times;
                                        color: #a7a7a8 !important;
                                        }
                                        #gbar a.gb3:hover {
                                        -moz-border-radius-topright: 4px !important;
                                        -moz-border-radius-topleft: 4px !important;
                                        color: #ffffff! important;
                                        font-family: Verdana, Tahoma, Helvetica, Times;
                                        background-color: #07638C;
                                        border: 1px solid #57BEEA !important;
                                        border-bottom: 0px none !important;
                                        }
                                        #gbar .gb3 {
                                        font-family: Verdana, Tahoma, Helvetica, Times;
                                        line-height: 20px;
                                        font-size: 12px;
                                        border: 1px solid transparent;
                                        border-bottom: 0px none;
                                        display: block;
                                        text-decoration: none;
                                        float: left;
                                        padding: 0px 5px 0px 5px;
                                        }
                                        
                                        
                                        
                                        /* connexion web */
                                        #gb a {
                                        -moz-border-radius: 4px !important;
                                        background-color: #111111;
                                        border: 1px solid #111111 !important;
                                        font-weight: 700;
                                        font-family: Verdana, Tahoma, Helvetica, Times;
                                        color: #a7a7a8 !important;
                                        font-size: 95%;
                                        padding: 3px 4px 4px 4px;
                                        }
                                        
                                        #gb a:visited {
                                        color: #c6c6c6 !important;
                                        }
                                        
                                        #gb a:hover{
                                        color: #ffffff !important;
                                        font-family: Verdana, Tahoma, Helvetica, Times !important;
                                        -moz-border-radius: 4px !important;
                                        background-color: #07638C;
                                        border: 1px solid #57BEEA !important;
                                        padding: 3px 4px 4px 4px;
                                        }
                                        
                                        
                                        
                                        /* connexion image */
                                        #guser a {
                                        -moz-border-radius: 4px !important;
                                        background-color: #111111;
                                        border: 1px solid #111111 !important;
                                        font-weight: bold;
                                        font-family: Verdana, Tahoma, Helvetica, Times;
                                        color: #a7a7a8 !important;
                                        font-size: 95%;
                                        padding: 3px 4px 4px 4px;
                                        }
                                        
                                        #guser a:visited {
                                        color: #c6c6c6 !important;
                                        }
                                        
                                        #guser a:hover{
                                        color: #ffffff !important;
                                        font-family: Verdana, Tahoma, Helvetica, Times !important;
                                        -moz-border-radius: 4px !important;
                                        font-weight: bold;
                                        background-color: #07638C;
                                        border: 1px solid #57BEEA !important;
                                        padding: 3px 4px 4px 4px;
                                        }
                                        
                                        
                                        
                                        td.tc a, td a, p.a {
                                        background-color: #111111;
                                        font-weight: 700;
                                        font-family: Verdana, Tahoma, Helvetica, Times;
                                        color: #a7a7a8 !important;
                                        font-size: 90%;
                                        }
                                        
                                        td.tc a:visited, td a:visited, p.a:visited { color: #c6c6c6 !important; }
                                        
                                        td.tc a:hover, td a:hover, p.a:hover { color: #ffffff !important;
                                        font-family: Verdana, Tahoma, Helvetica, Times !important;
                                        background-color: #111111;
                                        }
                                        
                                        
                                        
                                        /* résultat de recherche web */
                                        .g, div.e{
                                        overflow: hidden;
                                        padding:10px 10px 7px 12px !important;
                                        color: white !important;
                                        border: 1px solid #585858;
                                        background-color: #1F2122;
                                        -moz-border-radius: 8px;
                                        }
                                        
                                        #tads{
                                        width: 110px;
                                        height: 19px;
                                        margin-top:5px;
                                        margin-bottom:-8px;
                                        margin-right: 1.2em;
                                        overflow: hidden;
                                        padding: 0px 10px!important;
                                        border: 1px solid #D5DDF3;
                                        -moz-border-radius: 8px;
                                        }
                                        
                                        #tads a, #tads li{
                                        font-size: 12px !important;
                                        padding: 0 !important;
                                        }
                                        
                                        #tads h2{
                                        padding: 0 !important;
                                        font-size: 11px !important;
                                        float: none !important;
                                        }
                                        
                                        #tads h2:after{
                                        content: ' ▼';
                                        }
                                        
                                        #tads:hover{
                                        width: auto !important;
                                        height: auto !important;
                                        }
                                        
                                        .g:hover, div.e:hover{
                                        background-color: #1b1d1e !important;
                                        border: 1px solid #464646 !important;
                                        }
                                        
                                        .g:hover h3.r a{
                                        color: #a7a7a8 !important;
                                        font-weight: bold !important;
                                        font-family: Verdana, Tahoma, Helvetica, Times !important;
                                        }
                                        
                                        .g h3.r a{
                                        color: #ffffff !important;
                                        font-weight: bold !important;
                                        font-family: Verdana, Tahoma, Helvetica, Times !important;
                                        }
                                        
                                        a:link, .w, #prs a:visited, #prs a:active, .q:active, .q:visited {
                                        color:#ffffff !important;
                                        font-family: Verdana, Tahoma, Helvetica, Times !important;
                                        }
                                        
                                        
                                        
                                        /* Annonces commerciales */
                                        #rhsline{
                                        border: none !important;
                                        }
                                        
                                        #mbEnd{
                                        margin-top:-34px;
                                        position: relative;
                                        display: block;
                                        -moz-border-radius: 6px;
                                        overflow: hidden !important;
                                        height: 18px !important;
                                        border: 1px solid #D5DDF3 !important;
                                        background-color: #F7FFFF;
                                        margin-right:1.5%;
                                        }
                                        
                                        #mbEnd:hover{
                                        -moz-border-radius: 6px;
                                        overflow: hidden !important;
                                        height: auto !important;
                                        border: 1px solid #6B90DA !important;
                                        background-color: #F7FFFF;
                                        }
                                        
                                        #rhsline h2:after{
                                        content: ' ▼';
                                        }
                                        
                                        
                                        
                                        /* zone bleu en dessous de la description */
                                        .g div.s cite{
                                        font-weight: bold;
                                        font-size: 11px;
                                        color: #2293c3 !important;
                                        letter-spacing: 1px;
                                        }
                                        
                                        .g div.s table.slk tr td div a{
                                        background: none;
                                        }
                                        
                                        .g div.s table.slk tr td a.fl{
                                        background: none;
                                        }
                                        
                                        
                                        #res a.l:visited { 
                                        color: #c6c6c6 !important;
                                        text-decoration:line-through;
                                        }
                                        
                                        #res a.l:visited:after{
                                        color: #c6c6c6;
                                        }
                                        
                                        #res li:hover a.l:after{
                                        font-weight: bold;
                                        color:#0F3AB8;
                                        }
                                        
                                        #ssb{
                                        border:1px solid #6B90DA;
                                        margin-right:1.1em !important;
                                        -moz-border-radius: 4px !important;
                                        overflow:hidden;
                                        font-size: 11px !important;
                                        }
                                        
                                        font.med, #res p a.p, div.s{
                                        font-size: 12px !important;
                                        color: white !important;
                                        }
                                        
                                        #prs{
                                        padding:4px 5px 0 10px !important;
                                        }
                                        
                                        font.p{
                                        font-size: 13px;
                                        color: white !important;
                                        }
                                        
                                        
                                        
                                        #ImgContent table{
                                        position: relative;
                                        width: 99%!important;
                                        }
                                        
                                        #imgContent img {
                                        border: none !important
                                        }
                                        
                                        
                                        
                                        /* Résultats images */
                                        
                                        /* thumbnail border */
                                        img[style*="border: 1px solid"] { border: none !important;
                                        font-size: 80% !important;}
                                        
                                        /* Image search term(s) */
                                        td[id^="tDataText"] b { color: #fff !important;
                                        font-size: 80% !important;}
                                        
                                        /* Image description */
                                        td[id^="tDataText"] { color: #bbb !important;
                                        font-size: 80% !important;}
                                        
                                        /* Image's web page */
                                        td[id^="tDataText"] font[color="#008000"] { color: #777 !important;
                                        font-size: 80% !important;}
                                        
                                        /* Notice */
                                        span[style*="background: rgb(255, 255, 153)"] { background: #111111 !important; }
                                        
                                        /* LOGOS */
                                        /* Cacher le texte du logo */
                                        a#logo { font-size: 0 !important; }
                                        
                                        
                                        /* remplacement gros logo */
                                        
                                        img[src*="/logos/"][width="276"], img[src$="logo.gif"], div[style*="logo_plain.png"], img[src$="logo_google_suggest.gif"],img[src$="images_hp.gif"] {
                                        margin-top: 3em !important;
                                        width: 0 !important;
                                        height: 159px !important;
                                        padding-left: 450px !important;
                                        background-image: url("http://i284.photobucket.com/albums/ll8/manozkri/1.png") !important;
                                        }
                                        
                                        
                                        /* remplacement petit logo image */
                                        
                                        #logo > img, #logo span, img[src$="logo_sm.gif"], img[src$="google_sm.gif"], img[src$="logo_google_suggest_sm.gif"] {
                                          width: 0 !important;
                                          height: 51px !important;
                                          padding-left: 135px !important;
                                         background-position: 0 0 !important;
                                         top: 0 !important;
                                        background-image: url("data:image/png;base64,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") !important;
                                        }
                                        
                                        img[src$="images_res.gif"], img[src$="logo_sm.gif"] {
                                        width: 0 !important;
                                        height: 61px !important;
                                        padding-left: 136px !important;
                                        }
                                        
                                        /* cadre et bordure du dessous */
                                        #ssb, #bsf { border: none !important; }
                                        #bsf { background: none !important;
                                         margin-top: -40px !important;} 
                                        td.k { background-color: transparent !important; }
                                        table.ft.t.bb.bt, #footer { background: none !important; }
                                        .bb, .bt, div#footer { border: none !important; }
                                        
                                        }
                                        
                                        
                                        
                                        
                                        /* Changer "Gooooooooooogle" en simple texte por les résultats web*/
                                        #nav > tbody > tr > td span { background: none !important; }
                                        #nav { font-size: 120% !important; margin-top: -30px !important; }
                                        #nav .cur { font-size: 120% !important; margin-top: -40px !important; }
                                        #nav td { vertical-align: bottom !important; padding: 0.15em !important; }
                                        
                                        
                                        /* Changer "Gooooooooooogle" en simple texte pour les résultats images */
                                        #navbar img { visibility: hidden !important; }
                                        #navbar * { background-image: none !important;
                                        vertical-align: bottom !important; padding: 0.10em !important; }
                                        
                                        
                                        #navbar .i {
                                        color: white !important;
                                        font-weight: bold !important;
                                        font-size: 1.2em !important;
                                        font-family: Verdana, Tahoma, Helvetica, Times !important;
                                        }
                                        
                                        #navbar a {
                                        font-size: 120% !important;
                                        font-size: 0.9em !important;
                                        font-weight: bold !important;
                                        font-family: Verdana, Tahoma, Helvetica, Times !important;
                                        }
                                        
                                        /* les liens */
                                        #navbar a:hover {
                                        color: #a2a2a2 !important; 
                                        font-family: Verdana, Tahoma, Helvetica, Times !important;
                                        }
                                        
                                        #navbar a:visited {
                                        color: #c6c6c6 !important; 
                                        font-family: Verdana, Tahoma, Helvetica, Times !important;
                                        }
                                        
                                        /* aligner les numéros */
                                        #navbar br { display: none !important; }
                                        
                                        
                                        
                                        
                                        /* Recherche avancée de Google  */
                                        @-moz-document url-prefix("http://www.google"),
                                        url-prefix("https://www.google"),
                                        url-prefix("http://images.google")
                                         {
                                        
                                        body {
                                        display: block;
                                        -moz-border-radius: 8px !important;
                                        border: 3px solid #585858 !important;
                                        opacity:0.85;
                                        width: 84% !important;
                                        min-width: 815px !important;
                                        padding: 8px 1.2% 0px 1.2% !important;
                                        margin: 51px auto 30px auto!important;
                                        background: #111111 !important;
                                        font-family: Verdana, Tahoma, Helvetica, Times !important;
                                        color: #ffffff;
                                        }
                                        
                                        td[bgcolor="#d5ddf3"] {
                                        background: #111111 !important;
                                        }
                                        
                                        tr[bgcolor="#cbdced"] {
                                        background: #111111 !important;
                                        }
                                        
                                        tr[bgcolor="#bbcced"] {
                                        background: #111111 !important;
                                        }
                                        
                                        tr[bgcolor="#ffffff"] {
                                        background: #111111 !important;
                                        }
                                        
                                        
                                        }
                                        
                                        
                                        /* Préférences de recherche de Google  */
                                        @-moz-document url-prefix("http://www.google"),
                                        url-prefix("https://www.google"),
                                        url-prefix("http://images.google")
                                         {
                                        
                                        body {
                                        display: block;
                                        -moz-border-radius: 8px !important;
                                        border: 3px solid #585858 !important;
                                        opacity:0.85;
                                        width: 84% !important;
                                        min-width: 815px !important;
                                        padding: 8px 1.2% 0px 1.2% !important;
                                        margin: 51px auto 30px auto!important;
                                        background: #111111 !important;
                                        font-family: Verdana, Tahoma, Helvetica, Times !important;
                                        color: #ffffff;
                                        }
                                        
                                        
                                        /* couleur de la barre du haut et du bas */
                                        tr[bgcolor="#E5ECF9"] {
                                        background: #111111 !important;
                                        opacity: 0.95 !important;
                                        }
                                        
                                        /* tables */
                                        form p table[width="100%"][cellspacing="0"][cellpadding="0"][border="0"] {
                                        background: #111111 !important;
                                        opacity: 0.95 !important;
                                        border: 3px solid #585858 !important;
                                        margin: 3px !important;
                                        }
                                        
                                        /* left columns of the form tables */
                                        form p table[width="100%"][cellspacing="0"][cellpadding="0"][border="0"] td[width="175"] {
                                        background: #111111 !important;
                                        opacity: 0.95 !important;
                                        border-right: 1em solid #585858 !important;
                                        }
                                        
                                        /* hide form table borders */
                                        form p table td[bgcolor="#cbdced"] {
                                        display: none !important;
                                        }
                                        
                                        
                                        }
                                        
                                        
                                        /* Outils linguistiques */ 
                                        @-moz-document url-prefix("http://www.google"),
                                        url-prefix("https://www.google"),
                                        url-prefix("http://images.google")
                                         {
                                         
                                        body {
                                        display: block;
                                        -moz-border-radius: 8px !important;
                                        border: 3px solid #585858 !important;
                                        opacity:0.85;
                                        width: 84% !important;
                                        min-width: 815px !important;
                                        padding: 8px 1.2% 0px 1.2% !important;
                                        margin: 51px auto 30px auto!important;
                                        background: #111111 !important;
                                        font-family: Verdana, Tahoma, Helvetica, Times !important;
                                        color: #ffffff;
                                        }
                                        
                                        table[bgcolor="#ffffff"] {
                                        background: #111111 !important;
                                        opacity: 0.95 !important;
                                        }
                                        
                                        tr[bgcolor="#ffffff"] {
                                        background: #111111 !important;
                                        opacity: 0.95 !important;
                                        }
                                        
                                        tr[bgcolor="#cbdced"] { background: #111111 !important;
                                        opacity: 0.95 !important;
                                        }
                                        
                                        h4 { 
                                        background: #111111 !important;
                                        opacity: 0.95 !important;
                                        }
                                        
                                        p > table > tbody > tr:first-child {
                                        background: #111111 !important;
                                        }
                                        
                                        }