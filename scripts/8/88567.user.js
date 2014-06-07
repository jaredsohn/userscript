// ==UserScript==
// @name           Extreme Redeemer Pro!
// @namespace      Vali202(fab_74 from talkprizes)
// @description    The script that does almost everything for you on a redemption! This is script is include in Extreme Redeemer pro version.
// @include        *ptzplace.lockerz.com*
// @include        *redeemquick*
// @include              *freecandy*
// @include 	http://tutudragon3.info/*
// @include 	http://mylockerzalerter.com/web/*
// @exclude            http://talkprizes.com/*
// @author         Vali202(fab_74 from talkprizes)
// @version        4.10
// @license        Extreme Redeemer
// @unwrap
// ==/UserScript==
/*

This Script Is Part Of Extreme Redeemer Although You Don't Get The Pro Alerter You May
Still Access An Alerter That Checks At 1 Second At http://mylockerzalerter.com/web

*/
// Configuration
// Your personal data is here.
var Email = "tracktorist13@gmail.com";
var Combination = "tracktor92";
// Concept de Mode : US pour les us, CA pour les canadiens, toutes les autres valeurs : international.
var Mode = "US";
var FirstName = "Aleksej";
var LastName = "Lagodin";
var Address1 = "25 Walpole Park South";
var Address2 = "#4-EB92999";
var Phone = "+79164084702"; //International Only Full Number
var Phone1 = "123"; //123
var Phone2 = "456"; //456
var Phone3 = "789"; //7890
var Country = "United States of America (USA)";
var State = "MA"; //2 Letter Code Only
var Zip = "02081";
var City = "Walpole";
var Product1 = "New iPod Touch 8 GB"; // Product Selection List!
var Product2 = "New iPod 16 GB Nano - Black";
var Product3 = "New iPod 16 GB Nano - Black";
var Product4 = "New iPod Touch 64 Gb";
var Product5 = "x";
var Product6 = "";
var Product7 = "";
var Product8 = "";
var Product9 = "";
var Product10 = "";
var Product11 = "";
var Product12 = "";
var Product13 = "";
var Product14 = "";
var Product15 = "";
var Product16 = "";
var Product17 = "";
var Product18 = "";
var Product19 = "";
var Product20 = "";
var skip_details = ""; // DO NOT TOUCH
var select_random = "oui"; // DO NOT TOUCH
var ScrollHorizontal = ""; // DO NOT TOUCH
var ScrollVertical = ""; // DO NOT TOUCH
var Timer = 4; //Login Timer Codes To Prevent Anti-Bot Detection Official By Lockerz_Hacker
var Running = true; //Change To False If You Do Not Want The Timer Running

//Commencer l'encryptage.
//Commencer l'encryptage.
//Commencer l'encryptage.
// ^-
GM_registerMenuCommand("Get trained on Extreme Redeemer official simulator!", function () {
    GM_openInTab("http://sim.extreme-redeemer.com")
});
GM_registerMenuCommand("Do you think you're the best redeemer? Compare with other people!", function () {
    GM_openInTab("http://tutudragon3.info/")
});
GM_registerMenuCommand("Want candies? Here's the place!", function () {
    GM_openInTab("http://freecandy.tk")
});


var version = '4.10';
if (GM_getValue('update', 'no') == version) {
    GM_setValue('update', 'no');
};

function scrollWindow(_0x87e4x3, _0x87e4x4) {
    window.scrollBy(_0x87e4x3, _0x87e4x4);
};

function getElementsByRegExpId(_0x87e4x6, _0x87e4x7, _0x87e4x8) {
    _0x87e4x7 = _0x87e4x7 === undefined ? document : _0x87e4x7;
    _0x87e4x8 = _0x87e4x8 === undefined ? '*' : _0x87e4x8;
    if (_0x87e4x6 == null) {
        alert('Error in the script, please send a mail to fab@extreme-redeemer.com with this code : -1593');
    };
    var _0x87e4x9 = [];
    var _0x87e4xa = 0;
    for (var _0x87e4xb = 0, _0x87e4xc = _0x87e4x7.getElementsByTagName(_0x87e4x8).length; _0x87e4xb < _0x87e4xc; _0x87e4xb++) {
        if (_0x87e4x7.getElementsByTagName(_0x87e4x8).item(_0x87e4xb).id && _0x87e4x7.getElementsByTagName(_0x87e4x8).item(_0x87e4xb).id.match(_0x87e4x6)) {
            _0x87e4x9[_0x87e4xa] = _0x87e4x7.getElementsByTagName(_0x87e4x8).item(_0x87e4xb);
            _0x87e4xa++;
        };
    };
    return _0x87e4x9;
};

function getElementsByClass(_0x87e4xe, _0x87e4xf, _0x87e4x10) {
    if (_0x87e4xf == null) {
        _0x87e4xf = document;
    };
    if (_0x87e4x10 == null) {
        _0x87e4x10 = '*';
    };
    if (_0x87e4xe == null) {
        alert('Error in the script, please send a mail to fab@extreme-redeemer.com with this code : -1592');
    };
    var _0x87e4x11 = new Array();
    var _0x87e4x12 = _0x87e4xf.getElementsByTagName(_0x87e4x10);
    var _0x87e4x13 = ' ' + _0x87e4xe + ' ';
    var _0x87e4x14 = 0;
    for (i = 0; i < _0x87e4x12.length; i++) {
        var test = ' ' + _0x87e4x12[i].className + ' ';
        if (test.indexOf(_0x87e4x13) != -1) {
            _0x87e4x11[_0x87e4x14++] = _0x87e4x12[i];
        };
    };
    return _0x87e4x11;
};

function fo() {
    return test[i].focus();
};

function goToHref(_0x87e4x18) {
    if (_0x87e4x18 == null) {
        alert('Error in the script, please send a mail to fab@extreme-redeemer.com with this code : -1594');
    };
    if (_0x87e4x18.indexOf('http') < 0) {
        if (location.href.lastIndexOf('/') != -1) {
            var _0x87e4x19 = location.href.lastIndexOf('/') + 1;
            var _0x87e4x1a = location.href.substring(0, _0x87e4x19);
            window.location = _0x87e4x1a + _0x87e4x18;
        };
    } else {
        window.location = _0x87e4x18;
    };
};

function KeyCheck(_0x87e4x1c) {
    if (_0x87e4x1c.keyCode == 13) {
        if (getElementsByClass('btnRedeem')[0]) {
            if (document.getElementById('shippingForm')) {
                window.location = 'javascript:document.forms[0].submit();';
            } else {
                if (document.getElementById('maths_problem')) {
                    GM_setValue('reponse_maths', document.getElementById('contenu_case_math').value);
                    goToHref(document.getElementsByClassName('btnRedeem')[0].href);
                };
            };
        } else {
            if (test[0]) {
                window.location = 'javascript:doLogin();';
            };
        };
    };
};




function quiPourraitTrouverCeNom(_0x87e4x22) {
    var _0x87e4x23 = eval('Product' + _0x87e4x22);
    var _0x87e4x24 = new RegExp(_0x87e4x23, 'gi');
    var _0x87e4x25 = document.getElementsByTagName('span');
    var _0x87e4x26 = null;
    var _0x87e4x27 = 0;
    for (var _0x87e4x28 = 0; _0x87e4x28 < _0x87e4x25.length; _0x87e4x28++) {
        if (_0x87e4x25[_0x87e4x28].firstChild != null) {
            var _0x87e4x29 = _0x87e4x25[_0x87e4x28].firstChild;
        };
        if (_0x87e4x29.nodeType == 3) {
            if (_0x87e4x29.nodeValue.match(_0x87e4x24) && !_0x87e4x29.nodeValue.match(/PTZ/ig)) {
                aPere = _0x87e4x29.parentNode.parentNode.parentNode;
                _0x87e4x26 = aPere.getAttribute('href');
                if (_0x87e4x26 != null && _0x87e4x27 == 0 && !_0x87e4x26.match(/shop/)) {
                    goToHref(_0x87e4x26);
                    _0x87e4x27++;
                    break;
                };
            };
        };
    };
    if (_0x87e4x27 == 0) {
        GM_setValue('freshout', _0x87e4x22);
    };
};

function checkForUpdate() {
    GM_setValue('checkdate', d.getHours());
};
window.addEventListener('keydown', KeyCheck, true);
var d = new Date();
GM_setValue('update', 'no');
if (GM_getValue('checkdate', 'never') != d.getHours()) {
    checkForUpdate();
    checkCode(Hwid);
};
if (window.location.href.match(/extreme\-redeemer\.com\/redeemquick/)) {
    checkCode(Hwid);
    checkForUpdate();
};
var test = document.getElementsByTagName('input');

    
        if (document.getElementById('maths_problem')) {
            var input_maths = document.createElement('div');
            scrollWindow(ScrollVertical, ScrollHorizontal);
            input_maths.innerHTML = '<center><label style=\'color:red;\'>Solve the problem or just write the question and press enter !</label><br /><input id=\'contenu_case_math\' type=\'text\'/>';
            document.getElementsByClassName('pdPTZValue')[0].appendChild(input_maths);
            document.getElementById('contenu_case_math').focus();
        };
        if (getElementsByClass('btnRedeem')[0]) {
            if (test.length > 8) {
                unsafeWindow.shipping.js;
                if (Mode == 'US') {
                    window.setTimeout(function () {
                        getElementsByRegExpId(/phoneone/i)[0].value = Phone1;
                        getElementsByRegExpId(/phonetwo/i)[0].value = Phone2;
                        getElementsByRegExpId(/phonethree/i)[0].value = Phone3;
                    }, 70);
                } else {
                    if (Mode == 'CA') {
                        window.setTimeout(function () {
                            unsafeWindow.showCountries();
                            var _0x87e4x2f = document.getElementsByClassName('si');
                            i = 0;
                            for (i in _0x87e4x2f) {
                                if (_0x87e4x2f[i].innerHTML == Country) {
                                    var _0x87e4x30 = document.getElementsByClassName('si')[i].parentNode;
                                    var _0x87e4x31 = _0x87e4x2f[i].parentNode.getAttribute('onclick');
                                    CountryCode = _0x87e4x31.split('"');
                                    unsafeWindow.selectCountry(CountryCode[1], _0x87e4x30);
                                    break;
                                };
                            };
                        }, 50);
                        window.setTimeout(function () {
                            getElementsByRegExpId(/phoneone/i)[0].value = Phone1;
                            getElementsByRegExpId(/phonetwo/i)[0].value = Phone2;
                            getElementsByRegExpId(/phonethree/i)[0].value = Phone3;
                        }, 70);
                    } else {
                        window.setTimeout(function () {
                            unsafeWindow.showCountries();
                            var _0x87e4x2f = document.getElementsByClassName('si');
                            i = 0;
                            for (i in _0x87e4x2f) {
                                if (_0x87e4x2f[i].innerHTML == Country) {
                                    var _0x87e4x30 = document.getElementsByClassName('si')[i].parentNode;
                                    var _0x87e4x31 = _0x87e4x2f[i].parentNode.getAttribute('onclick');
                                    CountryCode = _0x87e4x31.split('"');
                                    unsafeWindow.selectCountry(CountryCode[1], _0x87e4x30);
                                    break;
                                };
                            };
                        }, 50);
                        window.setTimeout(function () {
                            getElementsByRegExpId(/phonewhole/i)[0].value = Phone;
                        }, 70);
                    };
                };
                var regexZip1 = new RegExp('top: (318|319|320|321|322|323|324|325|326|327|328|329|330|331|332|333|334|335|336|337|338|339|340|341|342|343)px;', 'ig');
                var regexZip2 = new RegExp('left: (460|461|462|463|464|465|466|467|468|469|470|471|472|473|474|475|476|477|478|479|480|481|482|483|484|485)px;', 'ig');
                var regexZip3 = new RegExp('width: (109|110|111|112)px;', 'ig');
                var regexCity1 = new RegExp('top: (318|319|320|321|322|323|324|325|326|327|328|329|330|331|332|333|334|335|336|337|338|339|340|341|342|343)px;', 'ig');
                var regexCity2 = new RegExp('left: (73|74|75|76|77|78|79|80|81|82|83|84|85|86|87|88|89|90|91|92|93|94|95|96|97|98)px;', 'ig');
                var regexCity3 = new RegExp('width: (220|221|222|223)px;', 'ig');
                var regexFN1 = new RegExp('top: (179|180|181|182|183|184|185|186|187|188|189|190|191|192|193|194|195|196|197|198|199|200|201|202|203|204)px;', 'ig');
                var regexFN2 = new RegExp('left: (73|74|75|76|77|78|79|80|81|82|83|84|85|86|87|88|89|90|91|92|93|94|95|96|97|98)px;', 'ig');
                var regexFN3 = new RegExp('width: (220|221|222|223)px;', 'ig');
                var regexA11 = new RegExp('top: (247|248|249|250|251|252|253|254|255|256|257|258|259|260|261|262|263|264|265|266|267|268|269|270|271|272)px;', 'ig');
                var regexA12 = new RegExp('left: (73|74|75|76|77|78|79|80|81|82|83|84|85|86|87|88|89|90|91|92|93|94|95|96|97|98)px;', 'ig');
                var regexA13 = new RegExp('width: (220|221|222|223)px;', 'ig');
                var regexA21 = new RegExp('top: (247|248|249|250|251|252|253|254|255|256|257|258|259|260|261|262|263|264|265|266|267|268|269|270|271|272)px;', 'ig');
                var regexA22 = new RegExp('left: (348|349|350|351|352|353|354|355|356|357|358|359|360|361|362|363|364|365|366|367|368|369|370|371|372|373)px;', 'ig');
                var regexA23 = new RegExp('width: (220|221|222|223)px;', 'ig');
                var regexLN1 = new RegExp('top: (179|180|181|182|183|184|185|186|187|188|189|190|191|192|193|194|195|196|197|198|199|200|201|202|203|204)px;', 'ig');
                var regexLN2 = new RegExp('left: (348|349|350|351|352|353|354|355|356|357|358|359|360|361|362|363|364|365|366|367|368|369|370|371|372|373)px;', 'ig');
                var regexLN3 = new RegExp('width: (220|221|222|223)px;', 'ig');
                var test = document.getElementsByTagName('input');
                window.setTimeout(function () {
                    for (i in test) {
                        if (test[i].getAttribute('style').match(regexFN1) && test[i].getAttribute('style').match(regexFN2) && test[i].getAttribute('style').match(regexFN3)) {
                            fo();
                            test[i].value = FirstName;
                        };
                        if (test[i].getAttribute('style').match(regexLN1) && test[i].getAttribute('style').match(regexLN2) && test[i].getAttribute('style').match(regexLN3)) {
                            fo();
                            test[i].value = LastName;
                        };
                        if (test[i].getAttribute('style').match(regexZip1) && test[i].getAttribute('style').match(regexZip2) && test[i].getAttribute('style').match(regexZip3)) {
                            fo();
                            test[i].value = Zip;
                        };
                        if (test[i].getAttribute('style').match(regexCity1) && test[i].getAttribute('style').match(regexCity2) && test[i].getAttribute('style').match(regexCity3)) {
                            fo();
                            test[i].value = City;
                        };
                        if (test[i].getAttribute('style').match(regexA11) && test[i].getAttribute('style').match(regexA12) && test[i].getAttribute('style').match(regexA13)) {
                            fo();
                            test[i].value = Address1;
                        };
                        if (test[i].getAttribute('style').match(regexA21) && test[i].getAttribute('style').match(regexA22) && test[i].getAttribute('style').match(regexA23)) {
                            fo();
                            test[i].value = Address2;
                        };
                        if (State != '') {
                            if (Mode == 'International') {
                                getElementsByRegExpId(/state/i, document, 'input')[0].value = State;
                            } else {
                                unsafeWindow.showStates();
                                var _0x87e4x2f = document.getElementsByClassName('si');
                                i = 0;
                                for (i in _0x87e4x2f) {
                                    if (_0x87e4x2f[i].innerHTML == State) {
                                        var _0x87e4x44 = document.getElementsByClassName('si')[i].parentNode;
                                        unsafeWindow.selectState(State, _0x87e4x44);
                                        break;
                                    };
                                };
                            };
                        };
                        document.getElementById('recaptcha_response_field').focus();
                        document.getElementById('users_ans').value = eval(GM_getValue('reponse_maths'));
                        scrollWindow(ScrollVertical, ScrollHorizontal);
                    };
                }, 100);
            };
        } else {
            if (getElementsByClass('productTitle')[0]) {
                if (document.getElementById('recaptcha_response_field')) {
                    document.getElementById('recaptcha_response_field').focus();
                } else {
                    GM_setValue('freshout', '0');
                    quiPourraitTrouverCeNom(1);
                    if (GM_getValue('freshout') == '1') {
                        quiPourraitTrouverCeNom(2);
                        if (GM_getValue('freshout') == '2') {
                            quiPourraitTrouverCeNom(3);
                            if (GM_getValue('freshout') == '3') {
                                quiPourraitTrouverCeNom(4);
                                if (GM_getValue('freshout') == '4') {
                                    quiPourraitTrouverCeNom(5);
                                    if (GM_getValue('freshout') == '5') {
                                        quiPourraitTrouverCeNom(6);
                                        if (GM_getValue('freshout') == '6') {
                                            quiPourraitTrouverCeNom(7);
                                            if (GM_getValue('freshout') == '7') {
                                                quiPourraitTrouverCeNom(8);
                                                if (GM_getValue('freshout') == '8') {
                                                    quiPourraitTrouverCeNom(9);
                                                    if (GM_getValue('freshout') == '9') {
                                                        quiPourraitTrouverCeNom(10);
                                                        if (GM_getValue('freshout') == '10') {
                                                            quiPourraitTrouverCeNom(11);
                                                            if (GM_getValue('freshout') == '11') {
                                                                quiPourraitTrouverCeNom(12);
                                                                if (GM_getValue('freshout') == '12') {
                                                                    quiPourraitTrouverCeNom(13);
                                                                    if (GM_getValue('freshout') == '13') {
                                                                        quiPourraitTrouverCeNom(14);
                                                                        if (GM_getValue('freshout') == '14') {
                                                                            quiPourraitTrouverCeNom(15);
                                                                            if (GM_getValue('freshout') == '15') {
                                                                                quiPourraitTrouverCeNom(16);
                                                                                if (GM_getValue('freshout') == '16') {
                                                                                    quiPourraitTrouverCeNom(17);
                                                                                    if (GM_getValue('freshout') == '17') {
                                                                                        quiPourraitTrouverCeNom(18);
                                                                                        if (GM_getValue('freshout') == '18') {
                                                                                            quiPourraitTrouverCeNom(19);
                                                                                            if (GM_getValue('freshout') == '19') {
                                                                                                quiPourraitTrouverCeNom(20);
                                                                                            };
                                                                                        };
                                                                                    };
                                                                                };
                                                                            };
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } else {
                if (getElementsByClass('boutiqueFrame')[0]) {
                    if (document.getElementById('recaptcha_response_field')) {
                        document.getElementById('recaptcha_response_field').focus();
                    };
                } else {
                    if (test.length < 8) {
                        window.clearTimeout(t);
                        if (document.getElementsByClassName('allset')[0] || document.getElementsByClassName('allSet')[0]) {
                            var timestop = (new Date()).getTime();
                            var timestart = GM_getValue('timestart');
                            var timemilli = timestop - timestart;
                            var timemilli = timemilli.toString();
                            var milli = timemilli.substring(timemilli.length - 3, timemilli.length);
                            var secondes = timemilli.substring(0, timemilli.length - 3);
                            var oldCode = document.getElementsByClassName('completeFields')[0].innerHTML;
                            document.getElementsByClassName('redNote')[0].innerHTML = '<div style="background-color:#fffac1;font-family:Tahoma;font-size:12px;border:2px solid #fff9b4;"> <center>Extreme Redeemer Cracked, version ' + version + ' is running.<br><b>Congratulations on redeeming your ' + document.getElementsByClassName('bcInner')[1].innerHTML + '! Please Take A Screen Shot And Send It To LockerzHacker On Userscripts!</b><br><br><span style="font-size:14px;font-family:arial;"><b>You redeemed your prize in ' + secondes + '.' + milli + ' seconds!</b></span></center></div> ';
                            document.getElementsByClassName('shipNote')[0].innerHTML = '';
                        } else {
                            GM_setValue('timestart', (new Date()).getTime().toString());
                            if (Running) {
                                loginTimeout(Timer);
                            };
                            var t = window.setTimeout(function () {
                                document.forms[0].elements[0].focus();
                                document.forms[0].elements[0].value = Email;
                                document.forms[0].elements[1].focus();
                                document.forms[0].elements[1].value = Combination;
                                if (document.getElementById('recaptcha_response_field')) {
                                    document.getElementById('recaptcha_response_field').focus();
                                };
                            }, 200);
                        };
                    };
                };
            };
		}
	

function loginTimeout(_0x87e4x28) {
    onche = '<center><div style=\'color:red;text-align:right;\'>Redeem in ' + Math.round(_0x87e4x28 * 100) / 100 + ' seconds...</div></center>';
    document.getElementById('errBox').innerHTML = onche;
    _0x87e4x28 = _0x87e4x28 - 0.1;
    if (_0x87e4x28 <= 0) {
        onche = '<center><div style=\'color:lime;text-align:right;text-decoration:blink;\'>Redeem now!</div></center>';
        document.getElementById('errBox').innerHTML = onche;
        window.clearTimeout(lT);
    };
    lT = window.setTimeout(function () {
        loginTimeout(_0x87e4x28);
    }, 100);
};
delete _0x5e5f;