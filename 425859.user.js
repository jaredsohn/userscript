// ==UserScript==
// @name        DimeTheme for DinDebat.dk
// @namespace   dime.jubii
// @include     http://dindebat.dk/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant       GM_addStyle
// ==/UserScript==


//Farver - lys til mørk
var color1 = "#FFFFFF";
var color2 = "#CCCCCC";
var color3 = "#C8C8C8";
var color4 = "#C0C0C0";
var color5 = "#AAAAAA";
var color6 = "#3E3E3E";
var color7 = "#333333";
var color8 = "#000000";




//  Template and code below here (only fiddle with it if you know what you're doing) :-)


var csstemplate = "  \
    .cke_skin_ips .cke_wrapper {  \
        background-color: [[COLOR-1]] !important;  \
        border: 1px solid [[COLOR-4]] !important;  \
    }  \
      \
    .cke_top {  \
        background: repeat-x scroll 0% 0% [[COLOR-1]] !important;  \
    }  \
      \
    body#ipboard_body fieldset.submit, body#ipboard_body p.submit {  \
        background-color: [[COLOR-1]] ;  \
    }  \
      \
    /* Fjerner jubii-bar */  \
    #jubii-header {  \
        display:none;  \
    }  \
      \
    /* rykker debatten opad igen */  \
    .jubii-header-fixed-container{    \
       padding-top:10px;   \
    }  \
      \
    /* tilpasser debattens bredde */  \
    #jubiiwrapper {    \
        position:absolute;   \
        width: 70%;    \
        left: 15%;  \
        max-width: 80%;    \
    }   \
      \
    .desc, .desc.blend_links a, p.posted_info {  \
       font-size: 12px;  \
       color: [[COLOR-6]];  \
    }  \
      \
    .desc.lighter, .desc.lighter.blend_links a {  \
       color: [[COLOR-6]];  \
    }  \
      \
    /* Side Baggrund */  \
    html, body {  \
       background-color: [[COLOR-1]];  \
       color: [[COLOR-5]];  \
    }  \
      \
    a {  \
        color: [[COLOR-6]];  \
    }  \
      \
    /* Debat Baggrund */  \
    #content{    \
       background:[[COLOR-1]]   \
    }  \
      \
    tr {    \
       background:[[COLOR-1]]   \
    }  \
      \
    /* Baggrund i søgning-oversigt på ulæste rækker */  \
    .unread{    \
       background:[[COLOR-1]]   \
    }  \
      \
    /* Cirkel/Stjerne sektion til venstre */  \
    .unread .altrow {  \
       background-color: [[COLOR-1]];  \
    }  \
      \
    .no_messages {  \
        background-color: [[COLOR-1]];          \
        padding: 15px 10px;  \
    }  \
      \
    /* Ramme farve */  \
    .ipsBox {  \
       background: [[COLOR-1]];  \
    }  \
      \
    .ipsBox_container {  \
       border: 1px solid [[COLOR-4]];  \
    }  \
      \
    .ipsSideMenu ul {  \
       border-top: 1px solid [[COLOR-4]];  \
    }  \
      \
    .ipsSideMenu ul li {  \
       border-bottom: 1px solid [[COLOR-4]];  \
    }  \
      \
    table.ipb_table td {  \
        border-bottom: 1px solid [[COLOR-4]];  \
    }  \
      \
    /* baggrundsfarve i kriterie-boks */  \
    .ipsBox_container {    \
       background-color:[[COLOR-3]];  \
       border: 1px solid [[COLOR-4]];  \
    }  \
      \
    .general_box {  \
        background: none repeat scroll 0% 0% [[COLOR-3]];  \
        border: 1px solid [[COLOR-4]];  \
        border-radius: 4px 4px 0px 0px;  \
    }  \
      \
    /* Baggrund på hver enkelt post */  \
    .post_block{    \
       background:[[COLOR-1]]   \
    }  \
      \
    /* Baggrund på hver enkelt post's Header (hvor debattør-navn står osv) */  \
    .post_block h3{    \
       background:[[COLOR-3]]   \
    }  \
      \
    p.citation {  \
        background: -moz-linear-gradient(center top , [[COLOR-3]] 0%, [[COLOR-1]] 100%) repeat scroll 0% 0% transparent;  \
    }  \
      \
    blockquote.ipsBlockquote {  \
        background: none repeat scroll 0% 0% [[COLOR-2]];  \
    }  \
      \
    /* sideskift baggrunds-farve */  \
    .pagination{    \
       background-color:[[COLOR-1]]   \
    }  \
      \
    /* sideskift baggrunds-farve og tekst-farve når musen er over */  \
    .pagination .back a:hover, .pagination .forward a:hover{    \
       background:[[COLOR-4]];  \
       color:[[COLOR-WHITE]];  \
    }  \
      \
    .pagination .pages li.active {  \
        background: none repeat scroll 0% 0% [[COLOR-4]];  \
    }  \
      \
    /* Tekst farve i hver enkelt post */  \
    .post_body .post{   \
       color:[[COLOR-BLACK]];  \
    }        \
      \
    /* Den hysteriske lilla farve i Nyt indhold til at highlighte de valgte kriterier */  \
    .ipsSideMenu ul li.active a{    \
       background-color:[[COLOR-4]]   \
    }  \
      \
    .status_update {  \
       background: [[COLOR-4]];  \
    }  \
      \
    .general_box h3 {  \
       background: [[COLOR-4]];  \
       color: [[COLOR-BLACK]];  \
       border-radius: 4px 4px 0px 0px;  \
    }  \
      \
    .ipsSideBlock {  \
       background: [[COLOR-1]];  \
    }  \
      \
    .ipsSideBlock h3 {  \
       color: [[COLOR-BLACK]];  \
       background: [[COLOR-4]];  \
    }  \
      \
    #folder_list .total {  \
       background-color: [[COLOR-4]];  \
    }  \
      \
    .ipsVerticalTabbed_tabs > ul  {  \
       border-top: [[COLOR-4]];  \
       border-left: [[COLOR-4]];  \
    }  \
      \
    .ipsVerticalTabbed_tabs li {  \
       background: [[COLOR-4]];  \
       color: [[COLOR-BLACK]];  \
       border-bottom: 0px solid [[COLOR-3]];  \
       font-size: 13px;  \
       border-radius: 4px 0px 0px 4px;  \
       margin-bottom: 4px;  \
        margin-right: 0px;  \
    }  \
          \
    .ipsVerticalTabbed_tabs li a {         \
       color: [[COLOR-6]];  \
       border-right:0px solid [[COLOR-4]] !important;  \
       border-left:1px solid [[COLOR-4]] !important;  \
       border-top:1px solid [[COLOR-4]] !important;  \
       border-bottom:1px solid [[COLOR-4]] !important;  \
    }  \
      \
    .ipsVerticalTabbed_tabs li.active a {  \
       background: [[COLOR-3]];  \
       color: [[COLOR-6]];  \
    }  \
      \
    .ipsVerticalTabbed_tabs li a:hover {  \
       background: [[COLOR-4]];  \
       color: [[COLOR-WHITE]];  \
    }  \
      \
    .input_submit.alt {  \
       background: [[COLOR-1]];  \
       border-color: [[COLOR-3]];  \
       color: [[COLOR-6]];  \
       box-shadow: 0px 1px 0px 0px [[COLOR-1]] inset, 0px 2px 3px rgba(0, 0, 0, 0.2);  \
    }  \
      \
    .maintitle {  \
        background: [[COLOR-4]];  \
        color: [[COLOR-WHITE]];  \
        padding: 10px 10px 11px;  \
        font-size: 16px;  \
        font-weight: 300;  \
        border-radius: 4px 4px 4px 4px;  \
        box-shadow: 0px 1px 0px [[COLOR-4]] inset;  \
        border-width: 1px 1px 0px;  \
        border-color: [[COLOR-4]];  \
        border-style: solid;  \
    }  \
      \
    .row2, .post_block.row2 {  \
       background-color: [[COLOR-1]];  \
       border-radius: 4px 4px 4px 4px;  \
       box-shadow: 0px 0px 0px [[COLOR-4]] inset;  \
       border-width: 0px 0px 0px;  \
       border-color: [[COLOR-4]];  \
       border-style: solid;  \
    }  \
      \
    #announcements td {  \
       border-bottom: 0px solid [[COLOR-WHITE]];  \
    }  \
      \
    #branding {  \
       background-color: [[COLOR-3]];  \
       border-bottom: 1px solid [[COLOR-3]];  \
    }  \
      \
    #primary_nav {  \
        background: none repeat scroll 0% 0% [[COLOR-3]];  \
        font-size: 13px;  \
        padding: 4px 0px 0px;  \
    }  \
      \
    #community_app_menu > li > a {  \
        color: #0B5794;  \
        background: none repeat scroll 0% 0% [[COLOR-3]];  \
        display: block;  \
        border-radius: 4px 4px 0px 0px;  \
        padding: 6px 15px 8px;  \
        text-shadow: 0px 0px 0px rgba(0, 0, 0, 0.9);  \
    }  \
      \
    #community_app_menu > li.active > a {  \
       background: none repeat scroll 0% 0% [[COLOR-1]];  \
       color: [[COLOR-6]];  \
    }  \
      \
    #community_app_menu > li > a:hover, #community_app_menu > li > a.menu_active {  \
        background: none repeat scroll 0% 0% [[COLOR-4]];  \
        color: [[COLOR-WHITE]];  \
    }  \
      \
    #community_app_menu > li > a {          \
        background: none repeat scroll 0% 0% [[COLOR-4]];  \
        color: [[COLOR-6]];  \
        display: block;  \
        padding: 6px 15px 8px;  \
        text-shadow: 0px 0px 0px rgba(0, 0, 0, 0.5);  \
    }  \
     \
    #more_apps_menucontent, .submenu_container {  \
        background: none repeat scroll 0% 0% [[COLOR-4]];  \
        font-size: 12px;  \
        border: 0px none;  \
        min-width: 140px;  \
        text-shadow: 0px 0px 0px rgba(0, 0, 0, 0.5);  \
    }  \
      \
    #more_apps_menucontent a, .submenu_container a {  \
        text-shadow: 0px 0px 0px rgba(0, 0, 0, 0.5);  \
    }  \
      \
    #search .submit_input {  \
        background: url('http://dindebat.dk/public/style_images/master/search_icon.png') no-repeat scroll 50% center [[COLOR-4]];  \
        text-indent: -3000em;  \
        padding: 0px;  \
        border: 1px solid [[COLOR-4]];  \
        display: block;  \
        width: 26px;  \
        height: 26px;  \
        position: absolute;  \
        right: 0px;  \
        top: 0px;  \
        bottom: 0px;  \
        border-radius: 0px 3px 3px 0px;  \
        box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.2) inset;  \
    }";


csstemplate = csstemplate.split("[[COLOR-WHITE]]").join(color1);
csstemplate = csstemplate.split("[[COLOR-1]]").join(color2);
csstemplate = csstemplate.split("[[COLOR-2]]").join(color3);
csstemplate = csstemplate.split("[[COLOR-3]]").join(color4);
csstemplate = csstemplate.split("[[COLOR-4]]").join(color5);
csstemplate = csstemplate.split("[[COLOR-5]]").join(color6);
csstemplate = csstemplate.split("[[COLOR-6]]").join(color7);
csstemplate = csstemplate.split("[[COLOR-BLACK]]").join(color8);



GM_addStyle (csstemplate);
