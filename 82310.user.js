// ==UserScript==
// @author         jzaikovs
// @name           Draugiem Extra
// @namespace      Draugiem_Extra
// @include        http://*.draugiem.lv/*
// @match          http://*.draugiem.lv/*
// @version        6.1
// @run-at         document-end
// ==/UserScript==
//
//TODO: jāpievieno draugiem.lv versijas pārbaude, lai skripts netiktu palaists tad ja ir jauna draugiem.lv versija
//

//skripts tiek palaist tikai tad ja nav atrast autorizācijas forma
if (document.getElementById('loginForm') === null) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + draugiem.toString() + ")(jQuery)";
    document.body.appendChild(script);
}

//galvenā funkcija
function draugiem() {
    //pieliekam informāciju par pašreizējo versiju
    $('#logo').children().attr('title', 'www.draugiem.lv + Draugiem Extra');

    //noņemam reklāmas
    $('*[class="adWindow"]').remove();
    $('*[class*="adv"]').remove();
    $('*[class*="Ads"]').remove();
    $('*[id*="adv"]').remove();
    $('*[id*="Ads"]').remove();
    $('*[id*="banner"]').remove();
    $('#marquee').remove();

    var delay = 500; //laiks ms pirms paslēpt popup
    var timer = null; //taimeris kas uzņem popup paslēpšanas laiku
    var outermost = $('#outermost');

    //popup css stils
    var style = $('<style>.dep{ border:1px solid rgb(170, 170, 170);background-color:white;display:inline-block;min-width:180px;border-radius:4px 4px 4px 4px;padding:3px;position:absolute;z-index:9999;text-align:center;} #dep_i { max-width:180px;max-height:250px;} .dep_btn a { display:inline-block;width:25px;vertical-align:middle;}</style>');
    //popup html kods
    var popup = $('<div class="dep"><a href=""style="display:block;text-align:center;"id="dep_l"><img alt=""id="dep_i"src="/i/loading/loading.gif"/></a><div class="dep_btn"><a href=""id="dep_m"title="Jauna vēstule"><img alt=""src="/i/icons/messagesCreate.png"/></a><a href=""id="dep_g"title="Galerija"><img alt=""src="/i/icons/pictures.png"/></a><a href=""id="dep_s"title="Runā!"><img alt=""src="/i/icons/say.png"/></a><a href=""id="dep_z"title="Palielināt"><img alt=""src="/i/icons/search.png"/></a></div></div>');

    //ja ejam prom no popup tad atstatam sākotnējā stavoklī
    popup.mouseleave(function () {
        Reset();
    });

    //ja no bildes dodamies uz popup, sledzam arā taimeri, lai netiktu paslēps popup uz drauga bildes mouseleave eventu
    popup.mouseover(function () {
        if (timer) clearTimeout(timer);
    });

    $('head').append(style);
    $('body').append(popup);
    $('body').ajaxSuccess(SetTriger); //veicam trigeru piesaisti arī tad kad visi ajax ielādēti

    //sakotnējais stavoklis, ja popup html izmainīts, lai nesanāk kļūdas
    Reset();
    SetTriger();

    //funckija paradā popup ar padatorajiem parametriem
    function Popup(caller, uid, src) {
        Reset();

        if (isNaN(uid) || uid < 0 || src.legth === 0)
            return;

        //ja bilde sastāv no frāzes 'no_pic' tātad nav bildes, jāattēlo speciāla bilde
        if (src.indexOf("no_pic") >= 0) {
            src = "http://ifrype.com/i/profile/sm_no_pic.png";
            $('#dep_z', popup).hide();
        } else
            $('#dep_z', popup).show();

        $('#dep_l', popup).attr('href', '/user/' + uid + '/');
        $('#dep_i', popup).attr('src', src);
        //tiek izmantoti ceļi kuri neizmanto 'user' kontrolieri tapēc viņu uzspiezšana neatzīmējas statistikā
        $('#dep_m', popup).attr('href', '/messages/?tab=new&fid=' + uid);
        $('#dep_g', popup).attr('href', '/gallery/?fid=' + uid);
        //16.04.2011: pievienota jauna poga
        $('#dep_s', popup).attr('href', '/user/' + uid + '/say/');
        $('#dep_z', popup).attr('href', src.replace('/m_', '/l_'));

        var top = $(caller).offset().top - 16 + outermost.scrollTop();
        var left = $(caller).offset().left + ($(caller).width() / 2) - 90;

        popup.css({
            'left': left,
            'top': top
        });
        popup.show();
    }

    //funkcija atstata popup sakotnējā stāvoklī
    function Reset() {
        popup.hide();
        $('#dep_i', popup).attr('src', 'http://ifrype.com/i/loading/loading.gif');
    }

    //funkcija, kas tiek izsaukta kad pele no popup vai drauga bildes pazudusi
    function Leave(caller) {
        if (timer)
            clearTimeout(timer);

        timer = setTimeout(function () {
            Reset();
        }, delay);
    }

    //Piesaistam pareizājām bildēm popup veidošanu
    function SetTriger() {
        //bildes kuras rādās galvenajā lapā, draugu lapā, meklēšanā u.c.
        $('.userPicture').each(function () {
            var uid = $(this).attr('href').match(/user\/(\d+)\//);
            var src = $('img', this).last().attr('src');
            //11.04.2011: salabota kļūda - ja href links nesatur lietotāja id, bet gan personalizēto url
            if (uid === null)
                uid = src.match(/\/sm_(\d+)\.[jpg|png]+$/)[1];
            else
                uid = uid[1];

            $(this).hover(function () {
                Popup(this, uid, src.replace(/\/(sm|i)_/, "/m_"));
            }, function () {
                Leave(this);
            });
        });

        //bildes kuras rādās "runā", komentāros
        $('.profileImage,.profileSmallIcon').each(function () {
            if ($(this).css('background-image') != 'none') {
                var bg = $(this).css('background-image');
                var uid = bg.match(/\/i_(\d+)\./);
                //16.04.2011: pievienota pārbaude, ja bilde nesatur lietotāja id
                if (uid === null) uid = 0;
                else uid = uid[1];
                var src = bg.match(/(http(.*?)\.[jpg|png]+)/)[0].replace(/\/(sm|i)_/, "/m_");

                $(this).hover(function () {
                    Popup(this, uid, src);
                }, function () {
                    Leave(this);
                });
            }
        });
    }
}