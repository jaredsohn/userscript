// ==UserScript==
// @name           Schulterglatze Autologin/Statusbox
// @description    Autologin/Statusbox fuer Schulterglatze.de
// @include        http://*schulterglatze.tld/*
// @include        http://schulterglatze.tld/*
// @exclude        http://*schulterglatze.tld/#logout
// @exclude        http://schulterglatze.tld/#logout
// ==/UserScript==

//Script beginnt hier

//Menue registrieren
GM_registerMenuCommand(('Logout'),function() {logout();});
GM_registerMenuCommand(('Login'),function() {login();});


//Variablen registrieren
var formular = document.forms[0];
var timer = 1000;
var path = window.location.pathname;
var domain = window.location.hostname;

function login()
{
    if((formular.elements[0].value.length > 0)&&(formular.elements[1].name.length > 0))
    {
        formular.submit();
    }
    else
    {
        window.setTimeout(login, timer);
    }
}

if(formular != undefined)
{
    var detail = formular.elements[2];
    if(detail != undefined && detail.value == 'login')
    {
        login();
    }
}

// Jquery Check
function GM_wait()
{
    if(typeof unsafeWindow.jQuery == 'undefined')
    {
        window.setTimeout(GM_wait,timer);
    }
    else
    {
        $ = unsafeWindow.jQuery;
        letsJQuery();
    }
}

GM_wait();

function letsJQuery()
{
    //Funtion um mit Cookies zu arbeiten
        $.cookie = function(name, value, options)
        {
            if (typeof value != 'undefined')
            { // name and value given, set cookie
                options = options || {};
                if (value === null)
                {
                    value = '';
                    options.expires = -1;
                }
                var expires = '';
                if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString))
                {
                    var date;
                    if (typeof options.expires == 'number')
                    {
                        date = new Date();
                        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                    }
                    else
                    {
                        date = options.expires;
                    }
                    expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
                }
                var path = options.path ? '; path=' + (options.path) : '';
                var domain = options.domain ? '; domain=' + (options.domain) : '';
                var secure = options.secure ? '; secure' : '';
                document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
            }
            else
            { // only name given, get cookie
                var cookieValue = null;
                if (document.cookie && document.cookie != '')
                {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++)
                    {
                        var cookie = $.trim(cookies[i]);
                        // Does this cookie string begin with the name we want?
                        if (cookie.substring(0, name.length + 1) == (name + '='))
                        {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            }
        };

    //Logout-Button bearbeiten damit nicht wieder sofort ein Login stattfindet
    $("div.logout > a").click(function()
    {
        $.ajax({
        url: '/logout.php',
        beforeSend: loader('/#logout')
        });

        return FALSE;

    });

    var cookie_name = domain;
    
    //Check ob Box anzeigt werden soll
    if(path == '/index.php'|| path == '/masterfile') {
        //Box Settings setzen
        var user_daten = $("div.userprofil_daten").html();
        GM_setValue(cookie_name, user_daten );
    };

    //Box erstellen und anzeigen
    $("div#smallProfil").after('<div id="status_box"><span>Status</span>'+GM_getValue(cookie_name, '' )+'</div>');

    //Unwichtige Inhalte entfernen
    $("div#status_box tr:contains('Registriert seit:')").remove();
    $("div#status_box tr:contains('Truppe:')").remove();
    $("div#status_box tr:contains('Position:')").remove();
    $("div#status_box tr:contains('Spezialisierung:')").remove();
    //Inhalt bearbeiten
    $('div#status_box img[alt=Angriff]').wrap("<a href=\"/equipment\">");
    $('div#status_box img[alt=Verteidigung]').wrap("<a href=\"/equipment\">");
    $('div#status_box img[alt=Moral]').wrap("<a href=\"/equipment\">");
    $('div#status_box img[alt=Orden]').wrap("<a href=\"/medals\">");
    $("div#status_box td:contains('Versicherungsbetrag:')").html('<a href="/barracks"><img src="http://image3.unikatmedia.de/sg/core/content/icons/ic0013.png" alt="Versicherungsbetrag" title="Dein Versicherungsbetrag"/></a>');
    $('div#status_box img[alt=Auszahlung]').attr("src", "http://image3.unikatmedia.de/sg/core/content/icons/ic0023.png");
    $("div#status_box td:contains('Kameraden online:')").html('<a href="/masterfile/comrades"><img src="http://image3.unikatmedia.de/sg/core/content/icons/ic0027.png" alt="Kameraden" title="Kameraden online"/></a>');

    //Spielinterner Tooltip
    $('div#status_box img').addClass('tTip');

    $("div#status_box").css({
        'font-weight' : 'bolder',
        'text-align' : 'left',
        'float': 'left',
        'width': '240px',
        'height': '204px',
        'margin': '7px 0 0 6px',
        'padding' : '10px 0 0 0',
        'font-size':' 85%',
        'background':'url(http://image.unikatmedia.de/sg/de_DE_v1/content/profil_box.png) no-repeat'
    });
    $("div#status_box > span").css({
        'position' : 'relative',
        'top' : '-7px',
        'left' : '18px',
        'font-size':' 90%'
    });
    $("div#status_box > table").css({
        'width' : '224px',
        'margin-left' : '8px',
        'margin-top' : '0'
    });

   //Bug behebung von doppelter Anzeige
    $("div#status_box").eq(1).remove();
    $("div.box_content input[name|=alle]").eq(1).remove();
    $("div.box_content table tr[name|=greasemonkey]").eq(1).remove();

}