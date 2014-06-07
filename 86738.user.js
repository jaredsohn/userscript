// ==UserScript==
// @name           THE WEST RO - sortare inventar
// @description    Sorteaza inventarul
// @include        http://ro*.the-west.*/game.php*
// ==/UserScript==


var twsortinvent = 'active';


// Bildervorlader

var ImgArray = new Array();
ImgArray[0] = "http://twknight.bplaced.net/TW/TWSortInvent/images/inactiv/off.png";
ImgArray[1] = "http://twknight.bplaced.net/TW/TWSortInvent/images/inactiv/body.png";
ImgArray[2] = "http://twknight.bplaced.net/TW/TWSortInvent/images/inactiv/rightarm.png";
ImgArray[3] = "http://twknight.bplaced.net/TW/TWSortInvent/images/inactiv/leftarm.png";
ImgArray[4] = "http://twknight.bplaced.net/TW/TWSortInvent/images/inactiv/foot.png";
ImgArray[5] = "http://twknight.bplaced.net/TW/TWSortInvent/images/inactiv/head.png";
ImgArray[6] = "http://twknight.bplaced.net/TW/TWSortInvent/images/inactiv/neck.png";
ImgArray[7] = "http://twknight.bplaced.net/TW/TWSortInvent/images/inactiv/yield.png";
ImgArray[8] = "http://twknight.bplaced.net/TW/TWSortInvent/images/inactiv/animals.png";

ImgArray[9] = "http://twknight.bplaced.net/TW/TWSortInvent/images/off_small.png";
ImgArray[10] = "http://twknight.bplaced.net/TW/TWSortInvent/images/body_small.png";
ImgArray[11] = "http://twknight.bplaced.net/TW/TWSortInvent/images/rightarm_small.png";
ImgArray[12] = "http://twknight.bplaced.net/TW/TWSortInvent/images/leftarm_small.png";
ImgArray[13] = "http://twknight.bplaced.net/TW/TWSortInvent/images/foot_small.png";
ImgArray[14] = "http://twknight.bplaced.net/TW/TWSortInvent/images/head_small.png";
ImgArray[15] = "http://twknight.bplaced.net/TW/TWSortInvent/images/neck_small.png";
ImgArray[16] = "http://twknight.bplaced.net/TW/TWSortInvent/images/yield_small.png";
ImgArray[17] = "http://twknight.bplaced.net/TW/TWSortInvent/images/animals_small.png";


function PreloadImages() {
  for (i = 0; i < ImgArray.length; i++) {
    Image[i] = new Image();
    Image[i].src = ImgArray[i];
  }
}

PreloadImages();


// Waffen entfernen

function removeWeapons_right() {
    getIMG = document.getElementById('bag').getElementsByTagName('img');
    for (var i = 0; i <= getIMG.length-1; i++) {
     if(getIMG[i].src.indexOf('right_arm') > -1) {
        getIMG[i].parentNode.setAttribute('style', 'display: none;');
     }
    }
} 

function removeWeapons_left() {
    getIMG = document.getElementById('bag').getElementsByTagName('img');
    for (var i = 0; i <= getIMG.length-1; i++) {
     if(getIMG[i].src.indexOf('left_arm') > -1) {
        getIMG[i].parentNode.setAttribute('style', 'display: none;');
     }
    }
} 

// Waffen anzeigen

function showWeapons_right() {
    getIMG = document.getElementById('bag').getElementsByTagName('img');
    for (var i = 0; i <= getIMG.length-1; i++) {
     if(getIMG[i].src.indexOf('right_arm') > -1) {
        getIMG[i].parentNode.removeAttribute('style');
     }
    }
} 

function showWeapons_left() {
    getIMG = document.getElementById('bag').getElementsByTagName('img');
    for (var i = 0; i <= getIMG.length-1; i++) {
     if(getIMG[i].src.indexOf('left_arm') > -1) {
        getIMG[i].parentNode.removeAttribute('style');
     }
    }
} 


// Bekleidung entfernen

function removeBodyItems() {
    getIMG = document.getElementById('bag').getElementsByTagName('img');
    for (var i = 0; i <= getIMG.length-1; i++) {
     if(getIMG[i].src.indexOf('body') > -1) {
        getIMG[i].parentNode.setAttribute('style', 'display: none;');
     }
    }
} 


// Bekleidung anzeigen

function showBodyItems() {
    getIMG = document.getElementById('bag').getElementsByTagName('img');
    for (var i = 0; i <= getIMG.length-1; i++) {
     if(getIMG[i].src.indexOf('body') > -1) {
        getIMG[i].parentNode.removeAttribute('style');
     }
    }
} 


// Schuhe anzeigen

function showFootItems() {
    getIMG = document.getElementById('bag').getElementsByTagName('img');
    for (var i = 0; i <= getIMG.length-1; i++) {
     if(getIMG[i].src.indexOf('foot') > -1) {
        getIMG[i].parentNode.removeAttribute('style');
     }
    }
} 


// Schuhe entfernen

function removeFootItems() {
    getIMG = document.getElementById('bag').getElementsByTagName('img');
    for (var i = 0; i <= getIMG.length-1; i++) {
     if(getIMG[i].src.indexOf('foot') > -1) {
        getIMG[i].parentNode.setAttribute('style', 'display: none;');
     }
    }
} 



// Kopfbedeckungen entfernen

function removeHeadItems() {
    getIMG = document.getElementById('bag').getElementsByTagName('img');
    for (var i = 0; i <= getIMG.length-1; i++) {
     if(getIMG[i].src.indexOf('head') > -1) {
        getIMG[i].parentNode.setAttribute('style', 'display: none;');
     }
    }
} 


// Kopfbedeckungen anzeigen

function showHeadItems() {
    getIMG = document.getElementById('bag').getElementsByTagName('img');
    for (var i = 0; i <= getIMG.length-1; i++) {
     if(getIMG[i].src.indexOf('head') > -1) {
        getIMG[i].parentNode.removeAttribute('style');
     }
    }
} 


// Halsbänder entfernen

function removeNeckItems() {
    getIMG = document.getElementById('bag').getElementsByTagName('img');
    for (var i = 0; i <= getIMG.length-1; i++) {
     if(getIMG[i].src.indexOf('neck/') > -1) {
        getIMG[i].parentNode.setAttribute('style', 'display: none;');
     }
    }
} 


// Halsbänder anzeigen

function showNeckItems() {
    getIMG = document.getElementById('bag').getElementsByTagName('img');
    for (var i = 0; i <= getIMG.length-1; i++) {
     if(getIMG[i].src.indexOf('neck/') > -1) {
        getIMG[i].parentNode.removeAttribute('style');
     }
    }
}

// Produkte entfernen

function removeItems() {
    getIMG = document.getElementById('bag').getElementsByTagName('img');
    for (var i = 0; i <= getIMG.length-1; i++) {
     if(getIMG[i].src.indexOf('yield') > -1) {
        getIMG[i].parentNode.setAttribute('style', 'display: none;');
     }
    }
} 


// Produkte anzeigen

function showItems() {
    getIMG = document.getElementById('bag').getElementsByTagName('img');
    for (var i = 0; i <= getIMG.length-1; i++) {
     if(getIMG[i].src.indexOf('yield') > -1) {
        getIMG[i].parentNode.removeAttribute('style');
     }
    }
}

// Tiere entfernen

function removeAnimals() {
    getIMG = document.getElementById('bag').getElementsByTagName('img');
    for (var i = 0; i <= getIMG.length-1; i++) {
     if(getIMG[i].src.indexOf('animal') > -1) {
        getIMG[i].parentNode.setAttribute('style', 'display: none;');
     }
    }
} 


// Tiere anzeigen

function showAnimals() {
    getIMG = document.getElementById('bag').getElementsByTagName('img');
    for (var i = 0; i <= getIMG.length-1; i++) {
     if(getIMG[i].src.indexOf('animal') > -1) {
        getIMG[i].parentNode.removeAttribute('style');
     }
    }
}




// Fügt Buttons ein

var img_div_sort = document.createElement('div');
img_div_sort.id = 'sort_invent_div';

var img_div_sort_down = document.createElement('div');
img_div_sort_down.id = 'sort_invent_div_bottom';

var no_sort = document.createElement('img');
no_sort.src = 'http://twknight.bplaced.net/TW/TWSortInvent/images/inactiv/off.png';
no_sort.id = 'sort_invent_off';
no_sort.setAttribute('style', 'float: left;');
no_sort.setAttribute('title', 'Alles anzeigen');

var sort_weapons_right = document.createElement('img');
sort_weapons_right.src = 'http://twknight.bplaced.net/TW/TWSortInvent/images/rightarm_small.png';
sort_weapons_right.id = 'sort_invent_weapons_right';
sort_weapons_right.setAttribute('onclick', 'show_weapons_right();');
sort_weapons_right.setAttribute('style', 'position: relative; bottom: -3px; cursor: pointer; float: left;');
sort_weapons_right.setAttribute('title', 'Duellwaffen anzeigen');

var sort_weapons_left = document.createElement('img');
sort_weapons_left.src = 'http://twknight.bplaced.net/TW/TWSortInvent/images/leftarm_small.png';
sort_weapons_left.id = 'sort_invent_weapons_left';
sort_weapons_left.setAttribute('onclick', 'show_weapons_left();');
sort_weapons_left.setAttribute('style', 'position: relative; bottom: -3px; cursor: pointer; float: left;');
sort_weapons_left.setAttribute('title', 'Fortkampfwaffen anzeigen');

var sort_body = document.createElement('img');
sort_body.src = 'http://twknight.bplaced.net/TW/TWSortInvent/images/body_small.png';
sort_body.id = 'sort_invent_body';
sort_body.setAttribute('onclick', 'show_body();');
sort_body.setAttribute('style', 'position: relative; bottom: -3px; cursor: pointer; float: left;');
sort_body.setAttribute('title', 'Bekleidung anzeigen');

var sort_foot = document.createElement('img');
sort_foot.src = 'http://twknight.bplaced.net/TW/TWSortInvent/images/foot_small.png';
sort_foot.id = 'sort_invent_foot';
sort_foot.setAttribute('onclick', 'show_foot();');
sort_foot.setAttribute('style', 'position: relative; bottom: -3px; cursor: pointer; float: left;');
sort_foot.setAttribute('title', 'Schuhe anzeigen');

var sort_head = document.createElement('img');
sort_head.src = 'http://twknight.bplaced.net/TW/TWSortInvent/images/head_small.png';
sort_head.id = 'sort_invent_head';
sort_head.setAttribute('onclick', 'show_head();');
sort_head.setAttribute('style', 'position: relative; bottom: -3px; cursor: pointer; float: left;');
sort_head.setAttribute('title', 'Kopfbedeckungen anzeigen');

var sort_neck = document.createElement('img');
sort_neck.src = 'http://twknight.bplaced.net/TW/TWSortInvent/images/neck_small.png';
sort_neck.id = 'sort_invent_neck';
sort_neck.setAttribute('onclick', 'show_neck();');
sort_neck.setAttribute('style', 'cursor: pointer; float: left;');
sort_neck.setAttribute('title', 'Halsb&auml;nder anzeigen');

var sort_yield = document.createElement('img');
sort_yield.src = 'http://twknight.bplaced.net/TW/TWSortInvent/images/yield_small.png';
sort_yield.id = 'sort_invent_yield';
sort_yield.setAttribute('onclick', 'show_yield();');
sort_yield.setAttribute('style', 'cursor: pointer; float: left;');
sort_yield.setAttribute('title', 'Produkte anzeigen');

var sort_animals = document.createElement('img');
sort_animals.src = 'http://twknight.bplaced.net/TW/TWSortInvent/images/animals_small.png';
sort_animals.id = 'sort_invent_animals';
sort_animals.setAttribute('onclick', 'show_animals();');
sort_animals.setAttribute('style', 'cursor: pointer; float: left;');
sort_animals.setAttribute('title', 'Tiere anzeigen');

function insert_sort_invent() {
    document.getElementById('bag').setAttribute('class', 'twsort_inventbag');
    document.getElementsByClassName('twsort_inventbag')[0].parentNode.parentNode.parentNode.parentNode.setAttribute('id', 'twsort_inventtable');
    document.getElementById('twsort_inventtable').parentNode.setAttribute('id', 'twsort_inventparentdiv');
    if(navigator.userAgent.indexOf('Opera') != -1) {
       document.getElementById('twsort_inventparentdiv').style.width = '348px';
    }
    var s = 0;
    var getTWHead = document.getElementsByTagName('head')[0];
    var getHeadScripts = getTWHead.getElementsByTagName('script');
    var getHeadCSSData = getTWHead.getElementsByTagName('link');
    var OperaDone = false;
    for(i = 0; i < getHeadCSSData.length; i++) {
        if(getHeadCSSData[i].href == 'http://twknight.bplaced.net/TW/TWSmallInventPics/css/smallstyle.css' || getHeadCSSData[i].href == 'http://twknight.bplaced.net/TW/TWSmallInventPics/css/bigstyle.css') {
             var BagHeight = document.getElementById('bag').offsetHeight;
             var newBagHeight = BagHeight - 27;
             document.getElementById('bag').setAttribute('style', 'height: ' + newBagHeight + 'px;');
             if(navigator.userAgent.indexOf('Opera') != -1 && OperaDone == false) {
                document.getElementById('twsort_inventparentdiv').style.width = '525px';
                OperaDone = true;
             }
             break;
        } else {
             s++;
        }
        if(s == getHeadCSSData.length) {
             var BagHeight = document.getElementById('bag').offsetHeight;
             var newBagHeight = BagHeight - 13;
             document.getElementById('bag').setAttribute('style', 'height: ' + newBagHeight + 'px;');
        }
    }

    for(i = 0; i < getHeadScripts.length; i++) {
        if(getHeadScripts[i].src == 'http://twknight.tw.funpic.de/tw/inventar/twsmallinventpic.js') {
             var BagHeight = document.getElementById('bag').offsetHeight;
             var newBagHeight = BagHeight - 27;
             document.getElementById('bag').setAttribute('style', 'height: ' + newBagHeight + 'px;');
             s--;
        } else {
             s++;
        }

        if(s == getHeadScripts.length) {
             var BagHeight = document.getElementById('bag').offsetHeight;
             var newBagHeight = BagHeight - 13;
             document.getElementById('bag').setAttribute('style', 'height: ' + newBagHeight + 'px;');
        }
    }

    var gABS = document.getElementsByTagName('body')[0].getElementsByTagName('script');
    for(var i = 0; i < gABS.length; i++) {
        if(gABS[i].src == 'http://www.tribetool.nl/thewest/twpro.js' && document.getElementById('bag').getAttribute('style') == 'height: 416px;') {
             var newBagHeight = 390;
             document.getElementById('bag').setAttribute('style', 'height: ' + newBagHeight + 'px;');
             document.getElementById('twpro_clothingfilter').style.marginTop = '527px';
             document.getElementById('twpro_clothingfilter').style.left = '650px';
             document.getElementById('twpro_clothingfilter').previousSibling.previousSibling.style.marginTop = '523px';
             document.getElementById('twpro_clothingfilter').previousSibling.previousSibling.style.left = '677px';
             document.getElementById('twpro_clothingfilter').previousSibling.previousSibling.previousSibling.style.marginTop = '523px';
             break;
        } else if(gABS[i].src == 'http://www.tribetool.nl/thewest/twpro.js') {
             var newBagHeight = 259;
             document.getElementById('bag').setAttribute('style', 'height: ' + newBagHeight + 'px;');
             break;
        }
    }


    document.getElementById('twsort_inventparentdiv').insertBefore(img_div_sort, document.getElementById('twsort_inventtable'));
    document.getElementById('twsort_inventparentdiv').appendChild(img_div_sort_down);
    var BagWidth = document.getElementById('twsort_inventtable').offsetWidth;

    for(i = 0; i < getHeadScripts.length; i++) {
        if(getHeadScripts[i].src == 'http://twknight.tw.funpic.de/tw/inventar/twsmallinventpic.js') {
             document.getElementById('sort_invent_div').setAttribute('style', 'width: ' + BagWidth + 'px; margin-left: 4px;');
             document.getElementById('sort_invent_div_bottom').setAttribute('style', 'width: ' + BagWidth + 'px; margin-left: 4px;');
             break;
        } else {
             s++;
        }

        if(s == getHeadScripts.length) {
             document.getElementById('sort_invent_div').setAttribute('style', 'width: ' + BagWidth + 'px;');
        }
    }

    for(i = 0; i < getHeadCSSData.length; i++) {
        if(getHeadCSSData[i].href == 'http://twknight.bplaced.net/TW/TWSmallInventPics/css/smallstyle.css' || getHeadCSSData[i].href == 'http://twknight.bplaced.net/TW/TWSmallInventPics/css/bigstyle.css') {
             document.getElementById('sort_invent_div').setAttribute('style', 'width: ' + BagWidth + 'px; margin-left: 4px;');
             document.getElementById('sort_invent_div_bottom').setAttribute('style', 'width: ' + BagWidth + 'px; margin-left: 4px;');
             break;
        } else {
        s++;
        }
        if(s == getHeadCSSData.length) {
             document.getElementById('sort_invent_div').setAttribute('style', 'width: ' + BagWidth + 'px;');
        }
    }

    document.getElementById('sort_invent_div_bottom').appendChild(sort_neck);
    document.getElementById('sort_invent_div_bottom').appendChild(sort_yield);
    document.getElementById('sort_invent_div_bottom').appendChild(sort_animals);
    document.getElementById('sort_invent_div').appendChild(no_sort);
    document.getElementById('sort_invent_div').appendChild(sort_weapons_right);
    document.getElementById('sort_invent_div').appendChild(sort_weapons_left);
    document.getElementById('sort_invent_div').appendChild(sort_body);
    document.getElementById('sort_invent_div').appendChild(sort_foot);
    document.getElementById('sort_invent_div').appendChild(sort_head);

    var ImgWidthUnX6 = document.getElementById('sort_invent_weapons_right').offsetWidth;
    var ImgWidth = ImgWidthUnX6  * 6;
    var MarginUnDivided = BagWidth - ImgWidth;
    var Margin = MarginUnDivided / 5;

    var ImgWidthBottom = ImgWidthUnX6  * 3;
    var MarginUnDividedBottom = BagWidth - ImgWidthBottom;
    var BottomDivMargin = MarginUnDividedBottom / 2;



    document.getElementById('sort_invent_off').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'float: left;');
    document.getElementById('sort_invent_weapons_right').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'position: relative; bottom: -3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_weapons_left').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'position: relative; bottom: -3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_body').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'position: relative; bottom: -3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_foot').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'position: relative; bottom: -3px; cursor: pointer; float: left;');

    document.getElementById('sort_invent_neck').setAttribute('style', 'margin-right: ' + BottomDivMargin + 'px; ' + 'cursor: pointer; float: left;');
    document.getElementById('sort_invent_yield').setAttribute('style', 'margin-right: ' + BottomDivMargin + 'px; ' + 'cursor: pointer; float: left;');

    document.getElementById('sort_invent_off').setAttribute('title', 'Alles anzeigen');
    document.getElementById('sort_invent_weapons_right').setAttribute('title', 'Duellwaffen anzeigen');
    document.getElementById('sort_invent_weapons_left').setAttribute('title', 'Fortkampfwaffen anzeigen');
    document.getElementById('sort_invent_body').setAttribute('title', 'Bekleidung anzeigen');
    document.getElementById('sort_invent_foot').setAttribute('title', 'Schuhe anzeigen');
    document.getElementById('sort_invent_head').setAttribute('title', 'Kopfbedeckungen anzeigen');
    document.getElementById('sort_invent_neck').setAttribute('title', 'Halsb&auml;nder anzeigen');
    document.getElementById('sort_invent_yield').setAttribute('title', 'Produkte anzeigen');
    document.getElementById('sort_invent_animals').setAttribute('title', 'Tiere anzeigen');

    document.getElementById('sort_invent_off').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/inactiv/off.png');
    document.getElementById('sort_invent_weapons_right').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/rightarm_small.png');
    document.getElementById('sort_invent_weapons_left').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/leftarm_small.png');
    document.getElementById('sort_invent_body').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/body_small.png');
    document.getElementById('sort_invent_foot').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/foot_small.png');
    document.getElementById('sort_invent_head').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/head_small.png');
    document.getElementById('sort_invent_neck').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/neck_small.png');
    document.getElementById('sort_invent_yield').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/yield_small.png');
    document.getElementById('sort_invent_animals').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/animals_small.png');

    document.getElementById('sort_invent_off').removeAttribute('onclick');
    document.getElementById('sort_invent_weapons_right').setAttribute('onclick', 'show_weapons_right();');
    document.getElementById('sort_invent_weapons_left').setAttribute('onclick', 'show_weapons_left();');
    document.getElementById('sort_invent_body').setAttribute('onclick', 'show_body();');
    document.getElementById('sort_invent_foot').setAttribute('onclick', 'show_foot();');
    document.getElementById('sort_invent_head').setAttribute('onclick', 'show_head();');
    document.getElementById('sort_invent_neck').setAttribute('onclick', 'show_neck();');
    document.getElementById('sort_invent_yield').setAttribute('onclick', 'show_yield();');
    document.getElementById('sort_invent_animals').setAttribute('onclick', 'show_animals();');
}


// Button-OnClick-Funktionen

function show_all() {
    getIMG = document.getElementById('bag').getElementsByTagName('img');
    for (var i = 0; i <= getIMG.length-1; i++) {
       if(getIMG[i].parentNode.getAttribute('style') == 'display: none;') {
           getIMG[i].parentNode.removeAttribute('style');
       }
    }

    document.getElementById('sort_invent_off').removeAttribute('onclick');
    document.getElementById('sort_invent_weapons_right').setAttribute('onclick', 'show_weapons_right();');
    document.getElementById('sort_invent_weapons_left').setAttribute('onclick', 'show_weapons_left();');
    document.getElementById('sort_invent_body').setAttribute('onclick', 'show_body();');
    document.getElementById('sort_invent_foot').setAttribute('onclick', 'show_foot();');
    document.getElementById('sort_invent_head').setAttribute('onclick', 'show_head();');
    document.getElementById('sort_invent_neck').setAttribute('onclick', 'show_neck();');
    document.getElementById('sort_invent_yield').setAttribute('onclick', 'show_yield();');
    document.getElementById('sort_invent_animals').setAttribute('onclick', 'show_animals();');

    document.getElementById('sort_invent_off').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/inactiv/off.png');
    document.getElementById('sort_invent_weapons_right').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/rightarm_small.png');
    document.getElementById('sort_invent_weapons_left').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/leftarm_small.png');
    document.getElementById('sort_invent_body').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/body_small.png');
    document.getElementById('sort_invent_foot').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/foot_small.png');
    document.getElementById('sort_invent_head').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/head_small.png');

    document.getElementById('sort_invent_neck').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/neck_small.png');
    document.getElementById('sort_invent_yield').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/yield_small.png');
    document.getElementById('sort_invent_animals').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/animals_small.png');


    var BagWidth = document.getElementById('twsort_inventtable').offsetWidth;
    var ImgWidthUnX6 = document.getElementById('sort_invent_weapons_right').offsetWidth;
    var ImgWidth = ImgWidthUnX6  * 6;
    var MarginUnDivided = BagWidth - ImgWidth;
    var Margin = MarginUnDivided / 5;

    var ImgWidthBottom = ImgWidthUnX6  * 3;
    var MarginUnDividedBottom = BagWidth - ImgWidthBottom;
    var BottomDivMargin = MarginUnDividedBottom / 2;



    document.getElementById('sort_invent_head').setAttribute('style', 'position: relative; bottom: -3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_animals').setAttribute('style', 'cursor: pointer; float: left;');

    document.getElementById('sort_invent_off').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'float: left;');
    document.getElementById('sort_invent_weapons_right').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'position: relative; bottom: -3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_weapons_left').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'position: relative; bottom: -3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_body').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'position: relative; bottom: -3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_foot').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'position: relative; bottom: -3px; cursor: pointer; float: left;');

    document.getElementById('sort_invent_neck').setAttribute('style', 'margin-right: ' + BottomDivMargin + 'px; ' + 'cursor: pointer; float: left;');
    document.getElementById('sort_invent_yield').setAttribute('style', 'margin-right: ' + BottomDivMargin + 'px; ' + 'cursor: pointer; float: left;');
}    
        
function show_weapons_right() {
    showWeapons_right();
    removeWeapons_left();
    removeBodyItems();
    removeFootItems();
    removeHeadItems();
    removeNeckItems();
    removeItems();
    removeAnimals();
     
    document.getElementById('sort_invent_weapons_right').removeAttribute('onclick');
    document.getElementById('sort_invent_off').setAttribute('onclick', 'show_all();');
    document.getElementById('sort_invent_weapons_left').setAttribute('onclick', 'show_weapons_left();');
    document.getElementById('sort_invent_body').setAttribute('onclick', 'show_body();');
    document.getElementById('sort_invent_foot').setAttribute('onclick', 'show_foot();');
    document.getElementById('sort_invent_head').setAttribute('onclick', 'show_head();');
    document.getElementById('sort_invent_neck').setAttribute('onclick', 'show_neck();');
    document.getElementById('sort_invent_yield').setAttribute('onclick', 'show_yield();');
    document.getElementById('sort_invent_animals').setAttribute('onclick', 'show_animals();');

    document.getElementById('sort_invent_weapons_right').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/inactiv/rightarm.png');
    document.getElementById('sort_invent_off').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/off_small.png');
    document.getElementById('sort_invent_weapons_left').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/leftarm_small.png');
    document.getElementById('sort_invent_body').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/body_small.png');
    document.getElementById('sort_invent_foot').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/foot_small.png');
    document.getElementById('sort_invent_head').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/head_small.png');

    document.getElementById('sort_invent_neck').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/neck_small.png');
    document.getElementById('sort_invent_yield').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/yield_small.png');
    document.getElementById('sort_invent_animals').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/animals_small.png');


    var BagWidth = document.getElementById('twsort_inventtable').offsetWidth;
    var ImgWidthUnX6 = document.getElementById('sort_invent_weapons_right').offsetWidth;
    var ImgWidth = ImgWidthUnX6  * 6;
    var MarginUnDivided = BagWidth - ImgWidth;
    var Margin = MarginUnDivided / 5;

    var ImgWidthBottom = ImgWidthUnX6  * 3;
    var MarginUnDividedBottom = BagWidth - ImgWidthBottom;
    var BottomDivMargin = MarginUnDividedBottom / 2;



    document.getElementById('sort_invent_head').setAttribute('style', 'position: relative; bottom: -3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_animals').setAttribute('style', 'cursor: pointer; float: left;');

    document.getElementById('sort_invent_off').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'position: relative; bottom: -3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_weapons_right').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'float: left;');
    document.getElementById('sort_invent_weapons_left').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'position: relative; bottom: -3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_body').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'position: relative; bottom: -3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_foot').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'position: relative; bottom: -3px; cursor: pointer; float: left;');

    document.getElementById('sort_invent_neck').setAttribute('style', 'margin-right: ' + BottomDivMargin + 'px; ' + 'cursor: pointer; float: left;');
    document.getElementById('sort_invent_yield').setAttribute('style', 'margin-right: ' + BottomDivMargin + 'px; ' + 'cursor: pointer; float: left;');
}

function show_weapons_left() {
    showWeapons_left();
    removeWeapons_right();
    removeBodyItems();
    removeFootItems();
    removeHeadItems();
    removeNeckItems();
    removeItems();
    removeAnimals();
     
    document.getElementById('sort_invent_weapons_left').removeAttribute('onclick');
    document.getElementById('sort_invent_off').setAttribute('onclick', 'show_all();');
    document.getElementById('sort_invent_weapons_right').setAttribute('onclick', 'show_weapons_right();');
    document.getElementById('sort_invent_body').setAttribute('onclick', 'show_body();');
    document.getElementById('sort_invent_foot').setAttribute('onclick', 'show_foot();');
    document.getElementById('sort_invent_head').setAttribute('onclick', 'show_head();');
    document.getElementById('sort_invent_neck').setAttribute('onclick', 'show_neck();');
    document.getElementById('sort_invent_yield').setAttribute('onclick', 'show_yield();');
    document.getElementById('sort_invent_animals').setAttribute('onclick', 'show_animals();');

    document.getElementById('sort_invent_weapons_left').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/inactiv/leftarm.png');
    document.getElementById('sort_invent_off').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/off_small.png');
    document.getElementById('sort_invent_weapons_right').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/rightarm_small.png');
    document.getElementById('sort_invent_body').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/body_small.png');
    document.getElementById('sort_invent_foot').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/foot_small.png');
    document.getElementById('sort_invent_head').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/head_small.png');

    document.getElementById('sort_invent_neck').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/neck_small.png');
    document.getElementById('sort_invent_yield').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/yield_small.png');
    document.getElementById('sort_invent_animals').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/animals_small.png');


    var BagWidth = document.getElementById('twsort_inventtable').offsetWidth;
    var ImgWidthUnX6 = document.getElementById('sort_invent_weapons_right').offsetWidth;
    var ImgWidth = ImgWidthUnX6  * 6;
    var MarginUnDivided = BagWidth - ImgWidth;
    var Margin = MarginUnDivided / 5;

    var ImgWidthBottom = ImgWidthUnX6  * 3;
    var MarginUnDividedBottom = BagWidth - ImgWidthBottom;
    var BottomDivMargin = MarginUnDividedBottom / 2;



    document.getElementById('sort_invent_head').setAttribute('style', 'position: relative; bottom: -3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_animals').setAttribute('style', 'cursor: pointer; float: left;');

    document.getElementById('sort_invent_off').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'position: relative; bottom: -3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_weapons_right').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'position: relative; bottom: -3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_weapons_left').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'float: left;');
    document.getElementById('sort_invent_body').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'position: relative; bottom: -3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_foot').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'position: relative; bottom: -3px; cursor: pointer; float: left;');

    document.getElementById('sort_invent_neck').setAttribute('style', 'margin-right: ' + BottomDivMargin + 'px; ' + 'cursor: pointer; float: left;');
    document.getElementById('sort_invent_yield').setAttribute('style', 'margin-right: ' + BottomDivMargin + 'px; ' + 'cursor: pointer; float: left;');
}

function show_body() {
    showBodyItems();
    removeWeapons_left();
    removeWeapons_right();
    removeFootItems();
    removeHeadItems();
    removeNeckItems();
    removeItems();
    removeAnimals();
     
    document.getElementById('sort_invent_body').removeAttribute('onclick');
    document.getElementById('sort_invent_off').setAttribute('onclick', 'show_all();');
    document.getElementById('sort_invent_weapons_right').setAttribute('onclick', 'show_weapons_right();');
    document.getElementById('sort_invent_weapons_left').setAttribute('onclick', 'show_weapons_left();');
    document.getElementById('sort_invent_foot').setAttribute('onclick', 'show_foot();');
    document.getElementById('sort_invent_head').setAttribute('onclick', 'show_head();');
    document.getElementById('sort_invent_neck').setAttribute('onclick', 'show_neck();');
    document.getElementById('sort_invent_yield').setAttribute('onclick', 'show_yield();');
    document.getElementById('sort_invent_animals').setAttribute('onclick', 'show_animals();');

    document.getElementById('sort_invent_body').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/inactiv/body.png');
    document.getElementById('sort_invent_off').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/off_small.png');
    document.getElementById('sort_invent_weapons_right').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/rightarm_small.png');
    document.getElementById('sort_invent_weapons_left').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/leftarm_small.png');
    document.getElementById('sort_invent_foot').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/foot_small.png');
    document.getElementById('sort_invent_head').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/head_small.png');

    document.getElementById('sort_invent_neck').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/neck_small.png');
    document.getElementById('sort_invent_yield').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/yield_small.png');
    document.getElementById('sort_invent_animals').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/animals_small.png');


    var BagWidth = document.getElementById('twsort_inventtable').offsetWidth;
    var ImgWidthUnX6 = document.getElementById('sort_invent_weapons_right').offsetWidth;
    var ImgWidth = ImgWidthUnX6  * 6;
    var MarginUnDivided = BagWidth - ImgWidth;
    var Margin = MarginUnDivided / 5;

    var ImgWidthBottom = ImgWidthUnX6  * 3;
    var MarginUnDividedBottom = BagWidth - ImgWidthBottom;
    var BottomDivMargin = MarginUnDividedBottom / 2;



    document.getElementById('sort_invent_head').setAttribute('style', 'position: relative; bottom: -3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_animals').setAttribute('style', 'cursor: pointer; float: left;');

    document.getElementById('sort_invent_off').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'position: relative; bottom: -3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_weapons_right').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'position: relative; bottom: -3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_weapons_left').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'position: relative; bottom: -3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_body').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'float: left;');
    document.getElementById('sort_invent_foot').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'position: relative; bottom: -3px; cursor: pointer; float: left;');

    document.getElementById('sort_invent_neck').setAttribute('style', 'margin-right: ' + BottomDivMargin + 'px; ' + 'cursor: pointer; float: left;');
    document.getElementById('sort_invent_yield').setAttribute('style', 'margin-right: ' + BottomDivMargin + 'px; ' + 'cursor: pointer; float: left;');
}

function show_foot() {
    showFootItems();
    removeBodyItems();
    removeWeapons_left();
    removeWeapons_right();
    removeHeadItems();
    removeNeckItems();
    removeItems();
    removeAnimals();
     
    document.getElementById('sort_invent_foot').removeAttribute('onclick');
    document.getElementById('sort_invent_off').setAttribute('onclick', 'show_all();');
    document.getElementById('sort_invent_weapons_right').setAttribute('onclick', 'show_weapons_right();');
    document.getElementById('sort_invent_weapons_left').setAttribute('onclick', 'show_weapons_left();');
    document.getElementById('sort_invent_body').setAttribute('onclick', 'show_body();');
    document.getElementById('sort_invent_head').setAttribute('onclick', 'show_head();');
    document.getElementById('sort_invent_neck').setAttribute('onclick', 'show_neck();');
    document.getElementById('sort_invent_yield').setAttribute('onclick', 'show_yield();');
    document.getElementById('sort_invent_animals').setAttribute('onclick', 'show_animals();');

    document.getElementById('sort_invent_foot').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/inactiv/foot.png');
    document.getElementById('sort_invent_off').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/off_small.png');
    document.getElementById('sort_invent_weapons_right').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/rightarm_small.png');
    document.getElementById('sort_invent_weapons_left').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/leftarm_small.png');
    document.getElementById('sort_invent_body').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/body_small.png');
    document.getElementById('sort_invent_head').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/head_small.png');

    document.getElementById('sort_invent_neck').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/neck_small.png');
    document.getElementById('sort_invent_yield').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/yield_small.png');
    document.getElementById('sort_invent_animals').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/animals_small.png');


    var BagWidth = document.getElementById('twsort_inventtable').offsetWidth;
    var ImgWidthUnX6 = document.getElementById('sort_invent_weapons_right').offsetWidth;
    var ImgWidth = ImgWidthUnX6  * 6;
    var MarginUnDivided = BagWidth - ImgWidth;
    var Margin = MarginUnDivided / 5;

    var ImgWidthBottom = ImgWidthUnX6  * 3;
    var MarginUnDividedBottom = BagWidth - ImgWidthBottom;
    var BottomDivMargin = MarginUnDividedBottom / 2;



    document.getElementById('sort_invent_head').setAttribute('style', 'position: relative; bottom: -3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_animals').setAttribute('style', 'cursor: pointer; float: left;');

    document.getElementById('sort_invent_off').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'position: relative; bottom: -3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_weapons_right').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'position: relative; bottom: -3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_weapons_left').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'position: relative; bottom: -3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_body').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'position: relative; bottom: -3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_foot').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'float: left;');

    document.getElementById('sort_invent_neck').setAttribute('style', 'margin-right: ' + BottomDivMargin + 'px; ' + 'cursor: pointer; float: left;');
    document.getElementById('sort_invent_yield').setAttribute('style', 'margin-right: ' + BottomDivMargin + 'px; ' + 'cursor: pointer; float: left;');
}

function show_head() {
    showHeadItems();
    removeBodyItems();
    removeWeapons_left();
    removeWeapons_right();
    removeFootItems();
    removeNeckItems();
    removeItems();
    removeAnimals();
     
    document.getElementById('sort_invent_head').removeAttribute('onclick');
    document.getElementById('sort_invent_off').setAttribute('onclick', 'show_all();');
    document.getElementById('sort_invent_weapons_right').setAttribute('onclick', 'show_weapons_right();');
    document.getElementById('sort_invent_weapons_left').setAttribute('onclick', 'show_weapons_left();');
    document.getElementById('sort_invent_body').setAttribute('onclick', 'show_body();');
    document.getElementById('sort_invent_foot').setAttribute('onclick', 'show_foot();');
    document.getElementById('sort_invent_neck').setAttribute('onclick', 'show_neck();');
    document.getElementById('sort_invent_yield').setAttribute('onclick', 'show_yield();');
    document.getElementById('sort_invent_animals').setAttribute('onclick', 'show_animals();');

    document.getElementById('sort_invent_head').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/inactiv/head.png');
    document.getElementById('sort_invent_off').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/off_small.png');
    document.getElementById('sort_invent_weapons_right').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/rightarm_small.png');
    document.getElementById('sort_invent_weapons_left').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/leftarm_small.png');
    document.getElementById('sort_invent_body').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/body_small.png');
    document.getElementById('sort_invent_foot').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/foot_small.png');

    document.getElementById('sort_invent_neck').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/neck_small.png');
    document.getElementById('sort_invent_yield').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/yield_small.png');
    document.getElementById('sort_invent_animals').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/animals_small.png');


    var BagWidth = document.getElementById('twsort_inventtable').offsetWidth;
    var ImgWidthUnX6 = document.getElementById('sort_invent_weapons_right').offsetWidth;
    var ImgWidth = ImgWidthUnX6  * 6;
    var MarginUnDivided = BagWidth - ImgWidth;
    var Margin = MarginUnDivided / 5;

    var ImgWidthBottom = ImgWidthUnX6  * 3;
    var MarginUnDividedBottom = BagWidth - ImgWidthBottom;
    var BottomDivMargin = MarginUnDividedBottom / 2;


    document.getElementById('sort_invent_head').setAttribute('style', 'float: left;');
    document.getElementById('sort_invent_animals').setAttribute('style', 'cursor: pointer; float: left;');

    document.getElementById('sort_invent_off').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'position: relative; bottom: -3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_weapons_right').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'position: relative; bottom: -3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_weapons_left').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'position: relative; bottom: -3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_body').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'position: relative; bottom: -3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_foot').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'position: relative; bottom: -3px; cursor: pointer; float: left;');

    document.getElementById('sort_invent_neck').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'position: relative; bottom: -3px; cursor: pointer; float: left;');

//    document.getElementById('sort_invent_neck').setAttribute('style', 'margin-right: ' + BottomDivMargin + 'px; ' + 'cursor: pointer; float: left;');
    document.getElementById('sort_invent_yield').setAttribute('style', 'margin-right: ' + BottomDivMargin + 'px; ' + 'cursor: pointer; float: left;');


//666
}

function show_neck() {
    showNeckItems();
    removeBodyItems();
    removeWeapons_left();
    removeWeapons_right();
    removeFootItems();
    removeHeadItems();
    removeItems();
    removeAnimals();
     
    document.getElementById('sort_invent_neck').removeAttribute('onclick');
    document.getElementById('sort_invent_off').setAttribute('onclick', 'show_all();');
    document.getElementById('sort_invent_weapons_right').setAttribute('onclick', 'show_weapons_right();');
    document.getElementById('sort_invent_weapons_left').setAttribute('onclick', 'show_weapons_left();');
    document.getElementById('sort_invent_body').setAttribute('onclick', 'show_body();');
    document.getElementById('sort_invent_foot').setAttribute('onclick', 'show_foot();');
    document.getElementById('sort_invent_head').setAttribute('onclick', 'show_head();');
    document.getElementById('sort_invent_yield').setAttribute('onclick', 'show_yield();');
    document.getElementById('sort_invent_animals').setAttribute('onclick', 'show_animals();');

    document.getElementById('sort_invent_neck').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/inactiv/neck.png');
    document.getElementById('sort_invent_yield').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/yield_small.png');
    document.getElementById('sort_invent_animals').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/animals_small.png');

    document.getElementById('sort_invent_head').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/head_small.png');
    document.getElementById('sort_invent_off').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/off_small.png');
    document.getElementById('sort_invent_weapons_right').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/rightarm_small.png');
    document.getElementById('sort_invent_weapons_left').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/leftarm_small.png');
    document.getElementById('sort_invent_body').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/body_small.png');
    document.getElementById('sort_invent_foot').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/foot_small.png');


    var BagWidth = document.getElementById('twsort_inventtable').offsetWidth;
    var ImgWidthUnX6 = document.getElementById('sort_invent_weapons_right').offsetWidth;
    var ImgWidth = ImgWidthUnX6  * 6;
    var MarginUnDivided = BagWidth - ImgWidth;
    var Margin = MarginUnDivided / 5;

    var ImgWidthBottom = ImgWidthUnX6  * 3;
    var MarginUnDividedBottom = BagWidth - ImgWidthBottom;
    var BottomDivMargin = MarginUnDividedBottom / 2;



    document.getElementById('sort_invent_head').setAttribute('style', 'margin-top: 3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_animals').setAttribute('style', 'cursor: pointer; float: left;');

    document.getElementById('sort_invent_off').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'margin-top: 3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_weapons_right').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'margin-top: 3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_weapons_left').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'margin-top: 3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_body').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'margin-top: 3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_foot').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'margin-top: 3px; ursor: pointer; float: left;');

    document.getElementById('sort_invent_neck').setAttribute('style', 'margin-right: ' + BottomDivMargin + 'px; ' + 'float: left;');
    document.getElementById('sort_invent_yield').setAttribute('style', 'margin-right: ' + BottomDivMargin + 'px; ' + 'cursor: pointer; float: left;');
}

function show_yield() {
    showItems();
    removeBodyItems();
    removeWeapons_left();
    removeWeapons_right();
    removeFootItems();
    removeHeadItems();
    removeNeckItems();
    removeAnimals();
     
    document.getElementById('sort_invent_yield').removeAttribute('onclick');
    document.getElementById('sort_invent_off').setAttribute('onclick', 'show_all();');
    document.getElementById('sort_invent_weapons_right').setAttribute('onclick', 'show_weapons_right();');
    document.getElementById('sort_invent_weapons_left').setAttribute('onclick', 'show_weapons_left();');
    document.getElementById('sort_invent_body').setAttribute('onclick', 'show_body();');
    document.getElementById('sort_invent_foot').setAttribute('onclick', 'show_foot();');
    document.getElementById('sort_invent_head').setAttribute('onclick', 'show_head();');
    document.getElementById('sort_invent_neck').setAttribute('onclick', 'show_neck();');
    document.getElementById('sort_invent_animals').setAttribute('onclick', 'show_animals();');

    document.getElementById('sort_invent_yield').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/inactiv/yield.png');
    document.getElementById('sort_invent_neck').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/neck_small.png');
    document.getElementById('sort_invent_animals').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/animals_small.png');

    document.getElementById('sort_invent_head').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/head_small.png');
    document.getElementById('sort_invent_off').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/off_small.png');
    document.getElementById('sort_invent_weapons_right').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/rightarm_small.png');
    document.getElementById('sort_invent_weapons_left').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/leftarm_small.png');
    document.getElementById('sort_invent_body').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/body_small.png');
    document.getElementById('sort_invent_foot').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/foot_small.png');


    var BagWidth = document.getElementById('twsort_inventtable').offsetWidth;
    var ImgWidthUnX6 = document.getElementById('sort_invent_weapons_right').offsetWidth;
    var ImgWidth = ImgWidthUnX6  * 6;
    var MarginUnDivided = BagWidth - ImgWidth;
    var Margin = MarginUnDivided / 5;

    var ImgWidthBottom = ImgWidthUnX6  * 3;
    var MarginUnDividedBottom = BagWidth - ImgWidthBottom;
    var BottomDivMargin = MarginUnDividedBottom / 2;



    document.getElementById('sort_invent_head').setAttribute('style', 'margin-top: 3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_animals').setAttribute('style', 'cursor: pointer; float: left;');

    document.getElementById('sort_invent_off').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'margin-top: 3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_weapons_right').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'margin-top: 3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_weapons_left').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'margin-top: 3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_body').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'margin-top: 3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_foot').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'margin-top: 3px; cursor: pointer; float: left;');

    document.getElementById('sort_invent_neck').setAttribute('style', 'margin-right: ' + BottomDivMargin + 'px; ' + 'cursor: pointer; float: left;');
    document.getElementById('sort_invent_yield').setAttribute('style', 'margin-right: ' + BottomDivMargin + 'px; ' + 'float: left;');
}


function show_animals() {
    showAnimals();
    removeBodyItems();
    removeWeapons_left();
    removeWeapons_right();
    removeFootItems();
    removeHeadItems();
    removeNeckItems();
    removeItems();
     
    document.getElementById('sort_invent_animals').removeAttribute('onclick');
    document.getElementById('sort_invent_off').setAttribute('onclick', 'show_all();');
    document.getElementById('sort_invent_weapons_right').setAttribute('onclick', 'show_weapons_right();');
    document.getElementById('sort_invent_weapons_left').setAttribute('onclick', 'show_weapons_left();');
    document.getElementById('sort_invent_body').setAttribute('onclick', 'show_body();');
    document.getElementById('sort_invent_foot').setAttribute('onclick', 'show_foot();');
    document.getElementById('sort_invent_head').setAttribute('onclick', 'show_head();');
    document.getElementById('sort_invent_neck').setAttribute('onclick', 'show_neck();');
    document.getElementById('sort_invent_yield').setAttribute('onclick', 'show_yield();');

    document.getElementById('sort_invent_animals').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/inactiv/animals.png');
    document.getElementById('sort_invent_neck').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/neck_small.png');
    document.getElementById('sort_invent_yield').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/yield_small.png');

    document.getElementById('sort_invent_head').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/head_small.png');
    document.getElementById('sort_invent_off').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/off_small.png');
    document.getElementById('sort_invent_weapons_right').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/rightarm_small.png');
    document.getElementById('sort_invent_weapons_left').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/leftarm_small.png');
    document.getElementById('sort_invent_body').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/body_small.png');
    document.getElementById('sort_invent_foot').setAttribute('src', 'http://twknight.bplaced.net/TW/TWSortInvent/images/foot_small.png');


    var BagWidth = document.getElementById('twsort_inventtable').offsetWidth;
    var ImgWidthUnX6 = document.getElementById('sort_invent_weapons_right').offsetWidth;
    var ImgWidth = ImgWidthUnX6  * 6;
    var MarginUnDivided = BagWidth - ImgWidth;
    var Margin = MarginUnDivided / 5;

    var ImgWidthBottom = ImgWidthUnX6  * 3;
    var MarginUnDividedBottom = BagWidth - ImgWidthBottom;
    var BottomDivMargin = MarginUnDividedBottom / 2;



    document.getElementById('sort_invent_head').setAttribute('style', 'margin-top: 3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_animals').setAttribute('style', 'float: left;');

    document.getElementById('sort_invent_off').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'margin-top: 3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_weapons_right').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'margin-top: 3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_weapons_left').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'margin-top: 3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_body').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'margin-top: 3px; cursor: pointer; float: left;');
    document.getElementById('sort_invent_foot').setAttribute('style', 'margin-right: ' + Margin + 'px; ' + 'margin-top: 3px; cursor: pointer; float: left;');

//    document.getElementById('sort_invent_neck').setAttribute('style', 'margin-right: ' + BottomDivMargin + 'px; ' + 'cursor: pointer; float: left;');

    document.getElementById('sort_invent_neck').setAttribute('style', 'margin-top: 3px; cursor: pointer; float: left;');

//666
    document.getElementById('sort_invent_yield').setAttribute('style', 'margin-right: ' + BottomDivMargin + 'px; ' + 'cursor: pointer; float: left;');
}



// Erstellt Intervalle für Fensterprüfung


function check_for_window() {
    if(document.getElementById('bag')) {
        insert_sort_invent();
        toggleInterval('visibilityOff');
        toggleInterval('invisibility');
    }
}

function checkForWindowInvisibility() {
     if(!document.getElementById('bag')) {
        toggleInterval('invisibilityOff');
        toggleInterval('visibility');
     }
}

function toggleInterval(thisIntervalAndFunction) {
     if(thisIntervalAndFunction == 'invisibility') {
        checkInvisibilityInterval = window.setInterval('checkForWindowInvisibility()', 10);
     } else if(thisIntervalAndFunction == 'visibility') {
        checkInterval = window.setInterval('check_for_window()', 10);
     } else if(thisIntervalAndFunction == 'invisibilityOff') {
        clearInterval(checkInvisibilityInterval);
     } else if(thisIntervalAndFunction == 'visibilityOff') {
        clearInterval(checkInterval);
     }
}

var checkInterval = window.setInterval('check_for_window()', 10);
var checkInvisibilityInterval = '';