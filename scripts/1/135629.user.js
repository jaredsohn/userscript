// ==UserScript==
// @name		Medizinstudium.at Fragensammlung Karteihelfer
// @description	Fügt einen link hinzu, der die Frage an den Bildschirmoberrand holt und einen weiteren, der diese ausgraut, also als gelernt markiert. Die "gelernten" Fragen werden im Browser gespeichert. Außerdem wird der Text und der Bereich für die Fragen vergrößert (die Navigationsleiste rechts wird ja nur selten gebraucht).
// @namespace   jakov@gmx.at
// @include	 http://www.medizinstudium.at/fragensammlung-n202/*
// @version	 1.3
// @require	 http://code.jquery.com/jquery-1.7.js
// @require	 https://jquery-json.googlecode.com/files/jquery.json-2.2.js
// ==/UserScript==
$(document).ready(main);

function main() {
    // http://hungred.com/how-to/tutorial-create-simple-vibrate-effect-form-box-jquery/
    // adapted for horizontal buzz only, added topPos = 0;
    // A minor modification by Kishore Nallan (kishore.nc [(at)] gmail . com)
    // See Line 47
    /**
     * Vibrate 1.0
     *
     * Makes an element vibrate
     *
     * Usage: jQuery('#my-annoying-ad').vibrate();
     *
     * @class vibrate
     * @param {Object} conf, custom config-object
     *
     * Copyright (c) 2008 Andreas Lagerkvist (andreaslagerkvist.com)
     * Released under a GNU General Public License v3 (http://creativecommons.org/licenses/by/3.0/)
     */
    jQuery.fn.vibrate = function (conf) {
        var config = jQuery.extend({
            speed: 30,
            duration: 2000,
            frequency: 10000,
            spread: 3
        }, conf);
        return this.each(function () {
            var t = jQuery(this);
            var vibrate = function () {
                    var topPos = Math.floor(Math.random() * config.spread) - ((config.spread - 1) / 2);
                    topPos = 0;
                    var leftPos = Math.floor(Math.random() * config.spread) - ((config.spread - 1) / 2);
                    var rotate = Math.floor(Math.random() * config.spread - (config.spread - 1) / 2); // cheers to erik@birdy.nu for the rotation-idea
                    t.css({
                        position: 'relative',
                        left: leftPos + 'px',
                        top: topPos + 'px',
                        WebkitTransform: 'rotate(' + rotate + 'deg)'
                    });
                };
            var doVibration = function () {
                    var vibrationInterval = setInterval(vibrate, config.speed);
                    var stopVibration = function () {
                            clearInterval(vibrationInterval);
                            t.css({
                                position: 'static'
                            });
                        };
                    setTimeout(stopVibration, config.duration);
                };
            /*
Mofication by Kishore - I am commenting out the following line as it calls the vibration function repeatedly.
We need to call it only once. So, instead I make a call to doVibration() directly.
*/
            //setInterval(doVibration, config.frequency);
            doVibration();
        });
    };

    vibrate_conf = {
        frequency: 5000,
        spread: 5,
        duration: 600
    };

    // Konsolenzeug
    console = unsafeWindow.console;
    GM_log = console.log;

    // Standardvariablen setzen
    default_questions = {};
    //default_questions = {"45516":true,"45511":true,"45510":true,"45512":true,"45519":true,"45518":true,"45517":false,"45515":false,"45514":true,"45513":false,"45509":true,"45508":true,"45506":true,"45505":true,"45504":true,"45503":true,"45502":true,"45501":true,"45500":true,"45499":true,"45498":true,"45497":true,"45496":true,"45151":true,"45148":true,"45147":true,"45146":true,"45145":true,"45142":true,"45141":true,"45140":true,"45139":false,"45138":true,"45137":true,"45136":true,"45135":true,"45134":true,"45133":false,"45129":true,"45128":true,"45127":true,"45126":true,"5592":true,"5591":true,"5590":true,"45125":true,"45124":true,"45122":true,"45002":true,"45001":true,"44999":true,"44998":true,"44997":true,"44995":true,"44994":true,"44993":true,"44992":true,"44991":true,"44990":true,"47873":true,"47872":true,"44989":true,"44988":true,"44987":true,"44986":true,"44985":true,"44983":true,"44982":true,"44981":true,"44980":true,"44979":true,"44978":true,"44977":true,"44976":true,"44975":true,"44974":true,"44973":true,"41494":true,"41493":true,"41492":true,"41490":true,"41489":true,"41488":true,"41486":true,"41485":true,"41484":true,"41483":true,"41482":true,"41479":true,"41478":true,"41477":true,"41476":true,"41475":true,"41474":true,"41473":true,"41472":true,"41471":true,"41468":true,"41467":true,"41466":true,"41465":true,"40984":true,"40983":true,"40982":true,"40981":true,"40980":true,"40979":true,"40978":true,"40977":true,"40976":true,"40974":true,"40973":true,"40972":true,"40971":true,"40970":true,"40969":true,"40968":true,"40967":true,"40966":true,"40965":true,"40964":true,"40963":true,"40962":true,"40961":true,"40960":true,"40959":true,"40956":true,"40955":true,"24473":true,"24472":true,"24471":true,"24470":true,"24469":true,"24468":true,"24467":true,"24466":true,"24465":true,"24464":true,"24463":true,"24462":true,"24461":true,"24460":true,"24459":true,"24458":true,"24457":true,"24456":true,"24455":true,"24454":true,"24453":true,"24452":true,"24451":true,"24450":true,"24449":true,"5596":true,"24448":true,"24447":true,"24446":true,"8369":true,"7258":true,"8361":true,"8377":true,"8362":true,"8378":true,"8363":true,"8379":true,"8364":true,"8380":true,"8365":true,"8366":true,"8382":true,"8383":true,"8368":true,"8354":true,"8370":true,"8355":true,"8371":true,"8356":true,"8372":true,"8357":true,"8373":true,"8358":true,"8374":true,"8359":true,"8360":true,"8376":true,"7249":true,"7240":true,"5598":true,"7255":true,"7256":true,"7241":true,"7257":true,"7242":true,"7243":true,"7259":true,"7244":true,"7260":true,"7261":true,"7246":true,"7262":true,"7247":true,"7263":true,"7248":true,"7250":true,"7251":true,"7252":true,"7254":true,"5617":true,"5616":true,"5615":true,"5614":true,"5613":true,"5612":true,"5610":true,"5609":true,"5608":true,"5607":true,"5606":true,"5605":true,"5604":true,"5603":true,"5602":true,"5601":true,"5600":true,"5595":true,"5594":true,"5593":true,"47994":true,"47991":true,"47983":true,"47981":true,"47977":true,"47974":true,"47973":true,"47972":true,"47970":true,"47969":true,"47968":true,"47967":true,"47966":true,"47965":true,"47963":true,"47962":true,"47961":true,"47959":true,"47958":true,"47956":true,"47955":true,"47954":true,"47953":true,"47952":true,"47950":true,"47949":true,"47948":true,"48025":true,"48024":true,"48023":true,"48022":true,"48020":true,"48019":true,"48018":true,"48016":true,"48015":true,"48014":true,"48013":true,"48012":true,"48008":true,"48006":true,"48005":true,"48004":true,"48003":true,"48002":true,"48001":true,"48000":true,"47998":true,"47997":true,"47875":true,"47871":true,"47869":true,"47868":true,"47867":true,"47865":true,"47864":true,"47863":true,"47862":true,"47860":true,"47859":true,"47858":true,"47857":true,"47856":true,"47855":true,"47854":true,"47852":true,"48083":true,"48082":true,"48080":true,"48079":true,"48078":true,"48077":true,"48076":true,"48075":true,"48074":true,"48073":true,"48072":true,"48071":true,"48070":true,"48069":true,"48067":true,"48068":true,"48065":true,"48064":true,"48063":true,"48062":true,"48061":true,"48059":true,"48058":true,"48056":true,"48055":true,"48054":true,"48052":true,"48051":true,"48050":true,"48049":false,"48047":true,"48046":true,"48044":true,"48045":true,"48043":true,"48042":true,"48040":true,"48039":true,"48038":true,"48037":true,"48036":true,"48035":true,"48034":true,"48032":true,"48031":true,"48030":true,"48029":true,"48028":true,"48027":true,"48026":true,"47928":true,"47927":true,"47926":true,"47925":true,"47921":true,"47918":true,"47917":false,"47916":true,"47913":true,"47912":true,"47910":true,"47909":true,"47908":true,"47907":true,"47904":true,"47903":true,"47899":false,"47898":true,"47896":true,"47892":true,"47891":true,"47890":true,"47889":true,"47888":true,"47887":true,"47884":true,"47883":true,"47881":true,"47880":true,"47879":false,"47878":true,"47877":true,"45569":true,"45568":true,"45566":true,"45567":true,"45528":true,"45527":true,"45526":true,"45565":true,"45563":true,"45562":true,"45561":true,"45558":true,"45557":true,"45553":true,"45552":true,"45551":true,"45525":true,"45523":true,"45522":true,"45521":true,"45520":true,"45210":true,"45209":true,"45208":true,"45207":true,"45550":true,"45549":true,"45548":true,"45547":true,"45546":true,"45544":true,"45543":true,"45542":true,"45540":true,"45537":true,"45536":true,"45532":true,"45531":true,"45529":true,"45206":true,"45205":true,"45204":true,"45203":false,"45202":true,"45201":true,"45200":true,"45199":true,"45198":true,"45197":true,"45196":true,"45195":true,"45194":true,"45193":true,"45192":true,"45190":true,"45187":true,"45185":false,"45183":true,"45181":true,"45180":true,"45179":true,"45178":true,"45177":true,"45176":true,"45174":true,"45173":true,"45172":true,"45171":true,"45169":true,"45168":true,"45166":true,"41529":true,"41528":false,"41527":true,"41523":true,"41521":true,"41520":true,"41519":true,"41518":true,"41517":true,"41516":true,"41515":true,"41513":true,"45164":true,"45163":true,"45162":true,"45161":true,"45159":true,"45157":true,"45156":true,"45155":true,"45154":true,"45153":true,"45152":true,"45062":true,"45061":true,"45060":true,"45059":true,"45058":true,"45057":true,"45056":true,"45055":true,"45054":true,"45052":true,"45051":false,"45050":true,"45049":true,"45048":true,"45047":true,"45046":false,"45045":true,"45044":true,"45043":true,"45041":true,"45040":true,"45038":true,"45037":true,"45035":true,"45034":true,"45033":true,"45032":true,"45031":true,"45030":true,"45029":true,"45028":true,"45027":true,"45026":true,"45025":true,"45024":false,"45023":true,"45022":true,"45021":true,"45020":true,"45019":true,"45018":true,"45017":true,"45016":true,"45015":true,"5548":true,"5547":true,"5543":true,"5542":true,"5540":true,"5539":true,"5538":false,"5537":true,"5536":true,"5581":true,"5580":true,"5579":true,"5577":true,"5576":true,"5575":true,"5574":true,"45014":true,"45013":true,"45012":true,"45011":true,"45010":true,"45009":true,"45008":true,"45007":true,"45006":true,"45005":true,"45004":true,"45003":true,"41552":true,"41549":true,"41548":true,"41547":true,"41546":false,"41545":true,"41512":true,"41511":true,"41510":true,"41509":true,"41508":true,"41507":true,"41506":true,"41544":true,"41543":true,"41542":false,"41541":true,"41539":false,"41538":true,"41537":true,"41535":true,"41532":true,"41531":true,"41503":true,"41502":true,"41500":true,"41499":true,"41498":true,"41497":true,"41496":true,"41495":true,"41040":true,"41039":true,"41038":true,"41037":true,"41036":true,"41035":true,"41034":true,"41033":true,"41032":false,"41031":true,"41030":true,"41029":true,"41027":true,"41025":true,"41023":true,"41022":true,"41020":true,"41019":true,"41017":true,"41016":true,"41015":true,"41014":true,"41013":true,"41012":true,"41011":true,"41010":true,"41009":true,"41008":true,"41007":true,"41006":true,"41005":true,"41004":true,"41003":true,"41002":true,"40999":true,"40998":true,"40997":true,"40996":true,"40995":true,"40994":true,"40993":true,"40992":true,"40991":true,"40990":true,"40989":false,"40988":true,"40987":true,"40986":true,"40985":true,"24531":true,"24530":true,"24529":true,"24528":true,"24527":true,"24526":true,"24525":true,"24523":true,"5619":true,"5618":true,"5650":true,"5649":true,"5648":true,"5647":true,"5646":true,"5644":false,"5642":true,"5640":true,"5639":true,"5638":true,"5635":true,"5633":true,"5631":true,"5629":true,"5628":false,"5627":true,"5626":true,"5625":false,"5624":true,"5623":true,"5622":true,"7275":true,"7276":true,"7219":true,"7277":true,"5630":true,"5645":true,"5451":true,"5669":true,"5668":true,"5667":true,"5666":true,"5665":true,"5664":true,"5662":true,"5659":true,"5658":true,"5657":true,"5656":true,"5655":true,"5654":true,"5653":true,"5652":true,"5651":true,"7278":true,"7221":true,"7279":true,"7264":true,"7280":true,"7281":true,"7266":true,"7282":true,"7267":false,"7268":true,"7284":true,"7285":true,"7212":true,"7270":true,"7286":true,"7213":true,"7271":true,"7287":true,"7214":true,"8387":true,"7272":true,"7215":true,"7273":true,"7216":true,"7274":true,"8403":true,"8435":true,"8388":true,"8404":true,"8419":true,"8427":true,"8420":true,"8436":true,"5636":true,"5637":true,"7283":true,"5661":true,"7265":true,"7218":true,"5621":true,"7295":true,"7294":true,"7293":true,"7292":true,"7291":true,"7290":true,"7289":true,"7288":true,"7269":true,"8396":true,"8412":true,"8428":true,"8397":true,"8413":true,"8429":false,"8398":true,"8414":true,"8430":true,"8399":true,"8415":true,"8431":true,"8384":true,"8400":false,"8416":false,"8432":true,"8385":true,"8401":true,"8417":true,"8433":false,"24522":true,"undefined":false,"24521":true,"24520":true,"24519":true,"24518":true,"24516":true,"24515":true,"24513":true,"24512":true,"24511":true,"24510":false,"24509":true,"24508":true,"24507":true,"24506":true,"24505":true,"24503":true,"24502":false,"24501":true,"24500":true,"24499":true,"24498":true,"41440":false,"41439":true,"41437":true,"41436":true,"41435":true,"41434":true,"41433":true,"41432":true,"41431":true,"41430":true,"41429":true,"41427":true,"41426":false,"41424":true,"41423":true,"41422":false,"41421":true,"41420":true,"41419":true,"41417":false,"44914":false,"44913":true,"41464":true,"41463":true,"41462":true,"41461":true,"41460":true,"41459":true,"41458":true,"41457":true,"41456":true,"41455":true,"41454":true,"41453":true,"41452":true,"41451":true,"41450":true,"41449":true,"41448":true,"41447":true,"41446":true,"41445":true,"41443":true,"41442":true,"41441":true,"44939":true,"44938":true,"44937":true,"44936":true,"44935":true,"44931":true,"44930":true,"44929":true,"44928":true,"44927":true,"44926":true,"44925":true,"44924":false,"44923":true,"44922":true,"44921":true,"44920":true,"44918":true,"44916":true,"44915":true,"44964":true,"44963":true,"44962":true,"44961":true,"44960":true,"44959":true,"44958":true,"44957":true,"44956":true,"44955":true,"44954":true,"44953":true,"44952":false,"44951":true,"44950":false,"44949":true,"44946":true,"44945":true,"44944":true,"44943":true,"44942":true,"44941":true,"44940":true,"45079":true,"45078":true,"45077":true,"45076":true,"45075":true,"45074":true,"45073":true,"45072":true,"45071":true,"45070":true,"45069":true,"45068":true,"45067":true,"45066":false,"45065":true,"45063":true,"44972":true,"44971":true,"44969":true,"44968":true,"44967":true,"44966":true,"44965":true,"45104":true,"45103":true,"45102":false,"45101":true,"45100":false,"45099":true,"45098":true,"45096":true,"45094":true,"45093":true,"45092":true,"45091":true,"45090":true,"45088":true,"45087":true,"45089":true,"45086":true,"45085":true,"45084":true,"45083":true,"45082":true,"45081":true,"45080":true,"45453":true,"45452":true,"45450":true,"45449":true,"45448":true,"45447":true,"45446":true,"45121":true,"45120":true,"45119":true,"45118":true,"45117":true,"45116":true,"45115":true,"45114":true,"45113":true,"45112":true,"45111":true,"45110":true,"45109":true,"45108":true,"45107":true,"45106":true,"45105":true,"45478":true,"45477":true,"45475":true,"45474":true,"45473":true,"45472":true,"45471":true,"45470":true,"45469":true,"45468":true,"45466":true,"45465":true,"45464":true,"45463":true,"45462":true,"45461":true,"45460":true,"45459":true,"45458":true,"45457":true,"45456":true,"45455":true,"45454":true,"47810":true,"47809":true,"47808":true,"47807":true,"47806":true,"47805":true,"47804":true,"47803":true,"45495":true,"45494":true,"45493":true,"45492":true,"45491":true,"45490":true,"45489":true,"45488":false,"45487":true,"45486":true,"45485":true,"45484":true,"45483":true,"45482":false,"45480":true,"45479":true,"47835":true,"47834":true,"47832":true,"47831":true,"47829":true,"47828":true,"47827":true,"47826":true,"47825":true,"47824":true,"47823":true,"47822":true,"47821":true,"47820":true,"47819":true,"47818":true,"47817":true,"47816":true,"47815":true,"47814":true,"47813":false,"47812":false,"47811":true,"47946":false,"47945":true,"47943":true,"47942":false,"47940":true,"47939":true,"47938":true,"47851":true,"47850":true,"47848":true,"47847":true,"47846":true,"47845":true,"47844":true,"47843":true,"47842":true,"47841":true,"47840":true,"47839":true,"47838":true,"47837":true,"47836":true,"48011":false,"48021":true,"48017":true,"48009":true,"45150":true,"48007":true,"47861":true,"47876":true,"47853":true,"45507":true,"7245":true,"45143":true,"45132":true,"45130":true,"45000":true,"41491":true,"41480":true,"41470":true,"41469":true,"40957":true,"8367":true,"8375":true,"7253":true,"5611":true,"5599":true,"47993":true,"47995":true,"47992":true,"47990":true,"47989":true,"47988":true,"47987":true,"47986":true,"47985":false,"47984":true,"47982":true,"47980":true,"47979":false,"47978":true,"47976":true,"47975":true,"47964":true,"47960":true,"47947":true};
    default_questions = $.toJSON(default_questions);

    // gespeicherte Variablen auslesen
    // questions = false;
    questions = GM_getValue('questions');
    questions = questions || default_questions;
    questions = $.evalJSON(questions);
    console.log('questions: ' + $.toJSON(questions));

    // Zustand speichern (eventuell erstmalig)
    GM_setValue('questions', $.toJSON(questions));
    // console.log(questions);

    // gelernte Fragen werden ausgegraut
    css = "\n\
	.disabled { color: grey !important; background-color: lightGray !important; } \n\
	.disabled a { color: darkGray !important; } \n\
	.helferleiste a, .helferleiste span { opacity: 0.0; transition: opacity 0.5s ease-in-out 5s; -webkit-transition: opacity 0.5s ease-in-out 5s; -moz-transition: opacity 0.5s ease-in-out 5s; -ms-transition: opacity 0.5s ease-in-out 5s; -o-transition: opacity 0.5s ease-in-out 5s; } /* http://matthewlein.com/ceaser/ */ \n\
	.helferleiste:hover a, .helferleiste:hover span { opacity: 1.0 !important; transition: opacity 0.5s ease-in-out 0s; -webkit-transition: opacity 0.5s ease-in-out 0s; -moz-transition: opacity 0.5s ease-in-out 0s; -ms-transition: opacity 0.5s ease-in-out 0s; -o-transition: opacity 0.5s ease-in-out 0s; } \n\
	.helferleiste a:hover { text-decoration:underline !important; } \n\
	.helferleiste.original a.number_link, .helferleiste.klon a.answer_link:not(.nocomment), .helferleiste.klon a.answer_comments_link:not(.nocomment), .helferleiste.klon a.comments_link:not(.nocomment) { opacity: 1.0 !important; } \n\
	";
    // funktioniert nur mit Greasemonkey
    // GM_addStyle(css);
    // so ist es unabhängiger von Greasemonkey 
    style = $('<style type="text/css"></style>');
    style.text(css);
    $('head').append(style);

    active = false;
    last = false;

    $('body').keydown(function (evt) {
        console.log(evt.keyCode);
        if (evt.keyCode == "109" || evt.keyCode == "32" || evt.keyCode == "74") { // -, space, j
            $(answer_comments_link[active]).click();
            evt.preventDefault();
        } else if (evt.keyCode == "72") { // h
            $(answer_link[active]).click();
            evt.preventDefault();
        } else if (evt.keyCode == "85") { // u
            $(comments_link[active]).click();
            evt.preventDefault();
        } else if (evt.keyCode == "75") { // k
            $(learned_link[active]).click();
            evt.preventDefault();
        } else if (evt.keyCode == "13" || evt.keyCode == "73") { // enter, i
            $(learned_nextnonlearned_link[active]).click();
            evt.preventDefault();
        } else if (evt.keyCode == "188" || evt.keyCode == "0" || evt.keyCode == "37") { // ö ← ,
            $(previous_link[active]).click();
            evt.preventDefault();
        } else if (evt.keyCode == "190" || evt.keyCode == "76" || evt.keyCode == "39") { // l → .
            $(next_link[active]).click();
            evt.preventDefault();
        } else if (evt.keyCode == "79") { // o
            $(next_nonlearned_link[active]).click();
            evt.preventDefault();
        } else if (evt.keyCode == "80") { // p
            $(previous_nonlearned_link[active]).click();
            evt.preventDefault();
        }
    });

    helferleiste = {};
    helferklon = {};
    number_link = {};
    answer_link = {};
    answer_comments_link = {};
    comments_link = {};
    next_link = {};
    learned_nextnonlearned_link = {};
    learned_link = {};
    previous_link = {};
    next_nonlearned_link = {};
    previous_nonlearned_link = {};

    global_previous_number = false;

    $('.node-type-sip-frage').each(function () {
        // Nummer der Frage
        number = $(this).attr('id').replace(/node-/, '');
        next_number = ($(this).parent().next().children('div').attr('id') + '').replace(/node-/, '');
        //global_previous_number = global_previous_number | number;
        // Anker setzen
        //$(this).parent().attr('id', number);

        // Link, der die Frage zum Bildschirmoberrand bringt 
        number_link[number] = $(' <a href="#' + number + '" class="number_link">' + number + '</a> ').click(function (evt) {
            number = $(this).data('number');
            active = number;
            GM_log(active);
            $('html, body').animate({
                scrollTop: $(this).parents('.views-row').offset().top
            }, 600, function () {
                document.title = document.title.replace(/(.* \| MEDIZINSTUDIUM\.at)(.*)/, '$1 #' + number);
                document.location = '#' + number;
            });
            evt.preventDefault();
        });

        // gelernte Fragen ausgrauen
        if (questions[number] == true) {
            $(this).parent().addClass('disabled');
        }

        learned_link[number] = $(' <a href="#' + number + '" title="k" class="learned_link">gelernt</a> ').click(function (evt) {
            number = $(this).data('number');
            console.log(number);
            // gespeicherte Variablen auslesen
            // hier wird jedes Mal ausgelesen,
            // sodass auch in mehreren Tabs gearbeitet werden kann!
            questions = GM_getValue('questions');
            questions = $.evalJSON(questions);
            // zustand ändern
            console.log(questions[number + '']);
            questions[number + ''] = (!questions[number + '']);
            console.log(questions[number + '']);

            // linktext je nach zustand ändern
            // $(this).text((questions[number] == true ? 'wiederholen' : 'gelernt'));

            // Zustand für alle speichern
            GM_setValue('questions', $.toJSON(questions));
            questions = GM_getValue('questions');
            questions = $.evalJSON(questions);
            console.log(questions[number + '']);

            // zwischen ausgegraut und normal wechseln
            $(this).parents('.views-row').toggleClass('disabled');
            evt.preventDefault();
        });

        next_link[number] = $(' <a href="#' + next_number + '" title="l, →, ," class="next_link">weiter</a> ').click(function (evt) {
            next_number = $(this).data('next_number');
            if (next_number != 'undefined') {
                $(number_link[next_number]).click();
            } else {
                $(helferleiste[number]).add(helferklon[number]).vibrate(vibrate_conf);
            }
            //evt.preventDefault();
        });

        learned_nextnonlearned_link[number] = $(' <a href="#' + number + '" title="i, enter" class="learned_nextnonlearned_link"> & </a> ').click(function (evt) {
            number = $(this).data('number');
            console.log(number);
            learned_link[number].click();
            next_nonlearned_link[number].click();
        });

        previous_link[number] = $(' <a href="#' + global_previous_number + '" title="ö, ←, ." class="previous_link">zurück</a> ').click(function (evt) {
            previous_number = $(this).data('previous_number');
            if (!(previous_number == false || previous_number == 'undefined')) {
                $(number_link[previous_number]).click();
            } else {
                $(helferleiste[number]).add(helferklon[number]).vibrate(vibrate_conf);
            }
            //evt.preventDefault();
        });

        next_nonlearned_link[number] = $(' <a href="' + number + '" title="o" class="next_nonlearned_link">nächste</a> ').click(function (evt) {
            number = $(this).data('number');
            target = $(this).parents('.views-row').nextAll(':not(.disabled):first');
            if (target.length > 0) {
                last = $(this).parents('.views-row');
                target_number = target.data('number');
                number_link[target_number].click();
            } else {
                $(helferleiste[number]).add(helferklon[number]).vibrate(vibrate_conf);
            }
            evt.preventDefault();
        });

        previous_nonlearned_link[number] = $(' <a href="' + number + '" title="p" class="previous_nonlearned_link">vorherige</a> ').click(function (evt) {
            number = $(this).data('number');
            if (last != false && last.data('number') != number) {
                target = last;
                last = false;
            } else {
                target = $(this).parents('.views-row').prevAll(':not(.disabled):first');
            }
            if (target.length > 0) {
                target_number = target.data('number');
                number_link[target_number].click();
            } else {
                $(helferleiste[number]).add(helferklon[number]).vibrate(vibrate_conf);
            }
            evt.preventDefault();
        });

        // tell the links about the data
        $(this).add($(this).parents('.views-row')).add(number_link[number]).add(learned_link[number]).add(learned_nextnonlearned_link[number]).add(next_link[number]).add(next_link[number]).add(previous_link[number]).add(next_nonlearned_link[number]).add(previous_nonlearned_link[number]).data('previous_number', global_previous_number).data('number', number).data('next_number', next_number);

        answer_link[number] = $(' <a href="#' + number + '" title="h" class="answer_link">Antwort</a> ').click(function (evt) {
            number = $(this).data('number');
            target = $(this).parents('.views-row');
            if (target.find('.field-field-antwort .field-items').is(':hidden')) {
                //target.find('.field-field-antwort a').text(target.find('.field-field-antwort a').text().replace('einblenden', 'ausblenden'));
                target.find('.field-field-antwort .field-items').show('slide');
            } else {
                //target.find('.field-field-antwort a').text(target.find('.field-field-antwort a').text().replace('ausblenden', 'einblenden'));
                target.find('.field-field-antwort .field-items').hide('slide');
            }
            evt.preventDefault();
        });

        answer_comments_link[number] = $(' <a href="#' + number + '" title="j, space, -" class="answer_comments_link"> & </a> ').click(function (evt) {
            number = $(this).data('number');
            target = $(this).parents('.views-row');

            if (target.find('.field-field-antwort .field-items').is(':hidden') || target.find('.comments').is(':hidden')) {
                //target.find('.field-field-antwort a').text(target.find('.field-field-antwort a').text().replace('einblenden', 'ausblenden'));
                target.find('.commentcount').text(target.find('.commentcount').text().replace('einblenden', 'ausblenden'));
                target.find('.field-field-antwort .field-items').show('slide');
                target.find('.comments').show('slide');
            } else {
                //target.find('.field-field-antwort a').text(target.find('.field-field-antwort a').text().replace('ausblenden', 'einblenden'));
                target.find('.field-field-antwort .field-items').hide('slide');
                target.find('.commentcount').text(target.find('.commentcount').text().replace('ausblenden', 'einblenden'));
                target.find('.comments').hide('slide');
            }
            evt.preventDefault();
        });

        comments_link[number] = $(' <a href="#' + number + '" title="u" class="comments_link">Kommentare</a> ').click(function (evt) {
            number = $(this).data('number');
            //target = $(this).parent().parent();
            target = $(this).parents('.views-row');
            if (target.find('.comments').length > 0) {
                if (target.find('.comments').is(':hidden')) {
                    target.find('.commentcount').text(target.find('.commentcount').text().replace('einblenden', 'ausblenden'));
                    target.find('.comments').show('slide');
                } else {
                    target.find('.commentcount').text(target.find('.commentcount').text().replace('ausblenden', 'einblenden'));
                    target.find('.comments').hide('slide');
                }
            } else {
                $(helferleiste[number]).add(helferklon[number]).vibrate(vibrate_conf);
            }
            evt.preventDefault();
        });

        // die links vorne anfügen
        helferleiste[number] = $('<div class="helferleiste"></div>');
        $(this).prepend(helferleiste[number]);
        helferleiste[number].append(number_link[number]).append('<span>,</span> ');
        helferleiste[number].append(answer_link[number]);
        helferleiste[number].append(answer_comments_link[number]);
        helferleiste[number].append(comments_link[number]).append('<span>,</span> ');
        helferleiste[number].append(learned_link[number]);
        helferleiste[number].append(learned_nextnonlearned_link[number]);
        helferleiste[number].append(next_nonlearned_link[number]).append('<span>,</span> ');
        helferleiste[number].append(previous_nonlearned_link[number]).append('<span>,</span> ');
        helferleiste[number].append(next_link[number]).append('<span>,</span> ');
        helferleiste[number].append(previous_link[number]);

        target = $(this).parents('.views-row');
        if (target.find('.comments').length == 0) {
            helferleiste[number].find('.answer_comments_link, .comments_link').addClass('nocomment');
        }

        // ersetze das "Richtige Antwort einblenden"-Feld mit einer zweiten Navigationsleiste
        helferklon[number] = helferleiste[number].clone(true);
        $(this).find('.field-label').replaceWith(helferklon[number]);
        helferleiste[number].addClass('original');
        helferklon[number].addClass('klon');

        // die jetzige Nummer wird im nächsten durchgang die vorherige sein
        global_previous_number = number;
    });

    // Layout-Verbesserungen für größere Schrift und breiteren Textbereich zum besseren Lernen!
    ///*
    $('.sidebar-right #content').css({
        'width': '100%',
        'font-size': '2em',
        'line-height': '1.2em'
    });

    // damit man die links die jetzt nach rechts gerutscht sind wieder anclicken kann
    $('#ad_skyscraper').remove();

    //*/


    if (document.location.hash == "") {
        if ($('.views-row:not(.disabled) a[href^="#"]:first').length > 0) {
            // gehe zur ersten unbeantworteten Frage
            $('.views-row:not(.disabled) a[href^="#"]:first').click();
        } else {
            // gehe zum letzten element
			$('a.number_link:last').click();
        }
    } else {
        // gehe zum Element, welches über die URL angepeilt wurde
        $('a[href=' + document.location.hash + ']:first').click();
    }

    // Alle Fragen auf der Seite umkehren
    inverter = $('<a id="inverter" href="#">Alle fragen umkehren</a>');
    $('.sip-showall').after(inverter);
    inverter.click(function (evt) {
        $('.node-type-sip-frage').each(function () {
            // Nummer der Frage
            number = $(this).attr('id').replace(/node-/, '');

            // gespeicherte Variablen auslesen
            // hier wird jedes Mal neu ausgelesen,
            // sodass auch in mehreren Tabs gearbeitet werden kann!
            questions = GM_getValue('questions');
            questions = $.evalJSON(questions);
            // zustand ändern
            questions[number + ''] = (!questions[number + '']);

            $(this).parent().toggleClass('disabled');

            // Zustand für alle speichern
            GM_setValue('questions', $.toJSON(questions));
            questions = GM_getValue('questions');
            questions = $.evalJSON(questions);
            console.log(questions[number + '']);
        });
        evt.preventDefault();
    });
    /*
    $.expr[':']['nth-of-type'] = function(elem, i, match) {
  	  var parts = match[3].split("+");
    	return (i + 1 - (parts[1] || 0)) % parseInt(parts[0], 10) === 0;
	};
	$('.views-row:has(.comments) .field-field-antwort a').filter(':nth-child(4), :nth-child(5)').css('opacity','1');
	*/
}