// ==UserScript==
// @name        DimeMenu for dindebat.dk
// @namespace   dime.jubii
// @include     http://dindebat.dk/*
// @version     5
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant    GM_addStyle
// ==/UserScript==



//Farveskeamet ændres en smule hvis denne er "true" (bruger standard farver hvis den er "false")
var DoColorChange = true;

//Menu i højre side hvis "true" og i venstre side hvis "false"
var MenuRight = false;







document.getElementById('jubii-header').remove();

var profilelink = '';
var li_profile = document.getElementById('user_profile');

if(li_profile){
    var pro_a = li_profile.getElementsByTagName('a');
    for(var j=0;j<pro_a.length;j++){
        if (pro_a[j].title == 'Din profil') {
            profilelink = pro_a[j].href;
        }
         
    }
}


if (DoColorChange) {

    //Baggrund
    GM_addStyle ("  \
       #content{  \
           background:#E4F3FF !important;  \
       } " );
    
    //Baggrund i søgning-oversigt på ulæste rækker
    GM_addStyle ("  \
       .unread{  \
           background:#E4F3FF !important;  \
       } " );
    
    //baggrundsfarve i kriterie-boks
    GM_addStyle ("  \
       .ipsBox_container{  \
           background-color:#ECF4FF !important;  \
       } " );

    //Baggrund på hver enkelt post
    GM_addStyle ("  \
       .post_block{  \
             background:#ECF4FF !important;  \
       } " );

    //Baggrund på hver enkelt post's Header (hvor debattør-navn står osv)
    GM_addStyle ("  \
       .post_block h3{  \
          background:#DCEBFF !important;  \
       } " );

    //sideskift baggrunds-farve
    GM_addStyle ("  \
       .pagination{  \
          background-color:#E4F0FF !important;  \
       } " );

    //sideskift baggrunds-farve og tekst-farve når musen er over
    GM_addStyle ("  \
        .pagination .back a:hover, .pagination .forward a:hover{  \
          background:#528CBC  !important;  \
          color:#fff !important;  \
       } " );

    //Tekst farve i hver enkelt post
    GM_addStyle ("  \
       .post_body .post{  \
          color:#000000 !important;  \
       } " )

    //Den hysteriske lilla farve i "Nyt indhold" til at highlight'e de valgte kriterier
    GM_addStyle ("  \
       .ipsSideMenu ul li.active a{  \
          background-color:#528CBC !important;  \
       } " );
}


//Debattens størrelse og position
if (MenuRight) {
    GM_addStyle ("  \
       #jubiiwrapper {  \
           position:absolute !important;  \
          left:2% !important;  \
          width: 80% !important;  \
          max-width: 80% !important;  \
       } " );
} else {
    GM_addStyle ("  \
       #jubiiwrapper {  \
           position:absolute !important;  \
          right:2% !important;  \
          width: 80% !important;  \
          max-width: 80% !important;  \
       } " );
};
    
    
//rykker debatten den smule op som gik tabt da vi fjernede den statiske jubii-linie
GM_addStyle ("  \
    .jubii-header-fixed-container{  \
       padding-top:10px !important;  \
    } " );


$("body").append ( '                                                      \
    <div id="dimebox">                                                    \
        <p><h1>Dimes Menu</h1></p>                                        \
        <br>                                                              \
        <p><h2>Indhold</h2></p>                                           \
        <ul>                                                              \
            <li><a href="http://dindebat.dk/index.php?app=core&module=search&do=viewNewContent&search_app=forums&change=1&period=unread&followedItemsOnly=1">Indhold jeg følger (Ulæst)</a></li>    \
            <li><a href="http://dindebat.dk/index.php?app=core&module=search&do=viewNewContent&search_app=forums&change=1&period=lastvisit&followedItemsOnly=1">Indhold jeg følger</a></li>                                                        \
            <li><a href="http://dindebat.dk/index.php?app=core&module=search&do=viewNewContent&search_app=forums&change=1&period=lastvisit&followedItemsOnly=0">Nyeste indhold</a></li>                                    \
        </ul>                                                             \
        <br>                                                              \
        <p><h2>Community</h2></p>                                         \
        <ul>                                                              \
            <li><a href="http://dindebat.dk/statuses/all/">Status opdateringer</a></li>  \
        </ul>                                                             \
        <br>                                                              \
        <p><h2>Profil</h2></p>                                            \
        <ul>  '
        + '<li><a href="' + profilelink + '">Min profil</a></li> '
        + '<li><a href="http://dindebat.dk/index.php?app=members&module=messaging">Indbakke</a></li> \
        <li><a href="' + profilelink + '?tab=reputation">Likes</a></li>   \
        <li><a href="' + profilelink + '?tab=friends">Venner</a></li>     \
        </ul>                                                             \
        </p>                                                              \
    </div>                                                                \
' );

var boxpos = 'left';
if (MenuRight) {
    boxpos = 'right';
};

GM_addStyle ( "                                                     \
    #dimebox{                                                       \
        position:               fixed;                              \
        top:                    0;                                  \
        " + boxpos + ":                   2%;                                 \
        margin:                 1ex;                                \
        padding:                1em;                                \
        background:             white;                              \
        z-index:                6666;                               \
        opacity:                0.5;                                \
        float: right;                                               \
        height: 95%;                                                \
        width: 12%;                                                 \
        margin-top: 10px;                                           \
        -moz-border-radius: 15px;                                   \
        border-radius: 15px;                                        \
        background:#F4F4F4;                                         \
        background:linear-gradient(top,#FFF,#F4F4F4);               \
        background:-moz-linear-gradient(top,#FFF,#F4F4F4);          \
        background:-o-linear-gradient(#FFF,#F4F4F4);                \
        background:-webkit-gradient(linear,left top,left bottom,from(#FFF),to(#F4F4F4));  \
        box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.21);                \
        filter: progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#CCCCCC');  \
    }                                                               \
    #dimebox ul{                                                    \
        list-style-type: none;                                      \
        margin: 0;                                                  \
        padding: 0;                                                 \
    }                                                               \
    #dimebox li{                                                    \
        font: 200 12px/1.5 Helvetica,Arial,sans-serif;              \
        margin-left:2px;                                            \
        margin-right:2px;                                           \
        border-bottom: 1px solid #ccc;                              \
        list-style-type: none;                                      \
        padding-left:8px;                                           \
    }                                                               \
    #dimebox li:last-child{                                         \
        border: none;                                               \
    }                                                               \
    #dimebox ul li a{                                               \
        text-decoration: none;                                      \
        color: #225985;                                             \
        display: block;                                             \
        width: 100%;                                                \
    }                                                               \
    #dimebox ul li a:hover{                                         \
        background: #DBEFFF;                                        \
    }                                                               \
    #dimebox h1{                                                    \
        text-decoration:none;                                       \
        color: #0F3854;                                             \
        border-bottom: 2px dotted #0F3854;                          \
        padding-bottom:4px;                                         \
        padding-top:0px;                                            \
        padding-left:0px;                                           \
        padding-right:4px;                                          \
        text-align:left;                                            \
        font-weight:bold;                                           \
        margin:2px;                                                 \
        font: 400 18px/1.5 Helvetica,Arial,sans-serif;              \
    }                                                               \
    #dimebox h2{                                                    \
        text-decoration:none;                                       \
        color: #0F3854;                                             \
        border-bottom: 1px dotted #0F3854;                          \
        padding-bottom:4px;                                         \
        padding-top:0px;                                            \
        padding-left:0px;                                           \
        padding-right:0px;                                          \
        text-align:left;                                            \
        font-weight:bold;                                           \
        margin:2px;                                                 \
        font: 400 16px/1.5 Helvetica,Arial,sans-serif;              \
    }                                                               \
" );