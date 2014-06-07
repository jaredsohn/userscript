// ==UserScript==
// @name           Schulterglatze Autologin/Statusbox
// @namespace      http://www.schulterglatze.de/spenden/238851
// @description    Autologin/Statusbox fuer Schulterglatze.de
// @include        http://www.schulterglatze.tld/*
// @exclude        http://www.schulterglatze.tld/#logout
// ==/UserScript==

//Update Check
var SUC_script_num = 74505;

try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var local_version, remote_version, rt, script_name;

						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1)
						{
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version)
							{
								if(confirm('Es ist ein Update fuer das Greasemonkey Script "'+script_name+'." vorhanden.\nWillst du weitergeleitet werden zur Installation?'))
								{
									GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
									GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (forced)
								alert('Kein Update fuer "'+script_name+'." vorhanden.');
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err)
			{
				if (forced)
					alert('Error beim UpdateCheck:\n'+err);
			}
		}
	}
	GM_registerMenuCommand('Manueller Update Check', function()
	{
		updateCheck(true);
	});
	updateCheck(false);
}
catch(err)
{}

//Script beginnt hier

//Menue registrieren
GM_registerMenuCommand(('Logout'),function() {logout();});
GM_registerMenuCommand(('Login'),function() {login();});


//Variablen registrieren
var formular = document.forms[0];
var timer = 1000;
var path = window.location.pathname;

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

    var spendenzeit = parseInt($.cookie('spenden_zeit'));
    var now = new Date().getTime();

    if($.cookie('spenden_zeit') === null)
    {
        spendenzeit = 0;
    }
    //Kameraden spenden
    if(path == '/stammakte/kameraden')
    {
        if((spendenzeit + 2400000) <= now)
        {
            //Name und Button erstellen und anzeigen
            $("div.box_content table tr:first").after('<tr name="greasemonkey"><td></td><td>Alle Spenden</td><td class="mitte"><a href="javascript:;" id="sg_spende"><img src="img/content/spende.png" alt="Spenden" /></a></td><td class="mitte" id="msg_all"></td><td class="mitte"></td></tr>');

            //Button mit Funktion belegen
            $("div.box_content table tr a:first").click(function()
            {
                var anzahl = $("div.box_content a[href*=spenden]").size()-1;
                //Alle Kameraden durchsuchen und automatisch im Hintgrund spenden

                //Bildschirm abdunkeln
                loader();

                $.cookie("spenden_zeit", now, { path: '/' });

                for (var i = 0; i <= anzahl; i++)
                {
                    var adresse = $("div.box_content a[href*=spenden]").eq(i);
                        adresse.css("display","none");

                    $.ajax({
                    url: adresse.attr('href')
                    });
                }
            });
        }
        else
        {
            //Name und Button erstellen und anzeigen
            $("div.box_content table tr:first").after('<tr name="greasemonkey"><td></td><td>Alle Spenden</td><td class="mitte spendenzeit"></td><td class="mitte" id="msg_all"></td><td class="mitte"></td></tr>');

            //Spendenbild ersetzen
            $('div.box_content a[href*=spenden]').html('<span class="spendenzeit"></span>');
            //Spendenlink ersetzen
            $('div.box_content span').unwrap();
            //Spendenzeit berechnen
            var time =(40 - ((now - spendenzeit)/1000/60))*60;
            //Anzeige der Dauer ab wann wieder gespendet werden kann
            $('.spendenzeit').countdown({until: time, format: 'MS', compact: true});
        }

        var msgzeit = parseInt($.cookie('msg_zeit'));

        if($.cookie('msg_zeit') === null)
        {
            msgzeit = 0;
        }

        if((msgzeit + 3600000) <= now)
        {
            //Button erstellen
            $('#msg_all').html('<img id="massen_pic" src="/img/content/sendmail.png" title="Massenmail" />');

            $('#massen_pic').css('cursor', 'pointer');

            $('#massen_pic').click(function()
            {

                //Anzahl Kamderande (-1 um bei 0 zu starten)
                var kameraden = $("div.box_content a[href*=schreiben/user/]").length;

                for(var i = 0; i < kameraden; i++)
                {
                    //Username extrahieren
                    var user = $("a[href*='profil/user/']").eq(i).html().split(' ');
                    //Rang entfernen
                    user.shift();
                    //Array  umwandeln
                    var own = user.join(" ");

                    //Checkbox erstellen
                    $('img[alt*="Nachricht schreiben"]').eq(i).before('<input type="checkbox" name="alle" value="'+ own +'" title="'+ own +'"/>');
                    //Verlinkung entfernen
                    $('img[alt*="Nachricht schreiben"]').eq(i).unwrap();
                    //Bild ausblenden
                    $('img[alt*="Nachricht schreiben"]').eq(i).css('display', 'none');
                }

                //Checkbox erstellen und anzeigen um alle auf einmal anzuklicken
                $(this).before('<input type="checkbox" id="alle" value="0"/>');
                //Checkbox mit Funktion belegen
                $("#alle").click(function()
                {
                    if($(this).val()==0)
                    {
                        $(this).parents("table")
                        .find("input:checkbox")
                        .attr("checked","checked");
                        $(this).val(1);
                    }
                    else
                    {
                        $(this).parents("table")
                        .find("input:checkbox")
                        .attr("checked","");
                        $(this).val(0);
                    }
                });
                //Bild entfernen fuer Massenfunktion
                $(this).remove();

                //Felder Betreff und Nachricht stellen sowie Button zum Senden
                $('#content .item_main_box .statistik_box').append('<h3>Massenmail an deine Kameraden</h3><div class="feldpost_form"><label for="betreff">Betreff:</label><input type="text" size="40" name="betreff" id="betreff" value="" /><label for="nachricht">Nachricht:</label><textarea id="nachricht" rows="6" cols="60" name="text" ></textarea><img src="/img/content/senden.png" alt="" id="sendall" style="border:none; margin-left:20px;" /></div>');

                $('#sendall').css('cursor', 'pointer');

                //Sendebutton mit Funktion belegen
                $('#sendall').click(function()
                {
                    //Betreff Inhalt und Check ob voll
                    var betreff = $('#betreff').val();

                    if(betreff !== '')
                    {
                        //Nachrichten Inhalt und check ob voll
                        var nachricht = $('#nachricht').val();
                        
                        if(nachricht !== '')
                        {
                            //Anzahl Kameraden und check ob vorhanden (-1 um bei 0 zu starten)
                            var id = $("input[name='alle']:checked").length -1;

                            if(id !== -1)
                            {
                                //Cookie setzen
                                $.cookie("msg_zeit", now, { path: '/' });
                                //Loader aktivieren
                                loader();
                                //Jede Nachricht versenden
                                for (i = 0; i <= id; i++)
                                {
                                    //Name fuer Nachricht suchen
                                    var name = $("input[name='alle']:checked").eq(i).val();
                                    //String aufbauen damit er versendet werden kann
                                    var dataString = 'betreff='+ betreff + '&switch=msgInsert&text='+ nachricht +'&name=' + name;

                                    $.ajax({
                                        type: "POST",
                                        processData: false,
                                        url: "/stammakte/feldpost/schreiben",
                                        data: dataString
                                    });
                                }
                            }
                            else
                            {
                                //Wenn kein Kameraden ausgesucht Abbruch!
                                alert('Bitte Kameraden aussuchen!');
                            }
                        }
                        else
                        {
                            //Wenn keine Nachricht erstellt wurde Abbruch!
                            alert('Bitte eine Nachricht eingeben!');
                        }
                    }
                    else
                    {
                        //Wenn kein Betreff definiert wurde Abbruch!
                        alert('Der Betreff ist leer!');
                    }
                });
            });
        }
        else
        {
            //MSG Zeit berechnen
            var msg =(60 - ((now - msgzeit)/1000/60))*60;
            //Anzeige der Dauer ab wann wieder eine Mail geschrieben werden kann
            $('#msg_all').countdown({until: msg, format: 'MS', compact: true});
        }
    }

    //Alle Nachrichten loeschen in der Feldpost
    if(path.search('/stammakte/feldpost') != -1)
    {
        //Checkbox erstellen und anzeigen
        $("div.box_content input[name|=switch]").before('<input type="checkbox" name="alle" value="0"/>');
        //Checkbox mit Funktion belegen
        $("div.box_content input[name|=alle]").click(function()
        {
            if($(this).val()==0)
            {
                $(this).parents("table")
                .find("input:checkbox")
                .attr("checked","checked");
                $(this).val(1);

            }
            else
            {
                $(this).parents("table")
                .find("input:checkbox")
                .attr("checked","");
                $(this).val(0);
            }
        });
    }

    //Logout-Button bearbeiten damit nicht wieder sofort ein Login stattfindet
    $("div.logout > a").click(function()
    {
        $.ajax({
        url: '/logout.php',
        beforeSend: loader('/#logout')
        });

        return FALSE;

    });

    //Check ob Box anzeigt werden soll
   if(path == '/index.php' || path == '/stammakte')
   {
       //Box Settings setzen
       var user_daten = $("div.userprofil_daten").html();
       GM_setValue('user_daten', user_daten );
   }

    //Box erstellen und anzeigen
    $("div#smallProfil").after('<div id="status_box"><span>Status</span>'+GM_getValue( 'user_daten', '' )+'</div>');

    $('div#status_box table td').eq(0).html('<a href ="/stammakte/kameraden"><img src="img/content/spende.png" alt="Spende" title="Kameradenspende"/></a>');
    $('div#status_box table td').eq(1).attr('id', 'status_spenden');

    var spende =(40 - ((now - spendenzeit)/1000/60))*60;
    $('#status_spenden').countdown({until: spende, format: 'MS', compact: true});

    //Unwichtige Inhalen entfernen
    $("div#status_box tr:contains('Letzter Login:')").remove();
    $("div#status_box tr:contains('Kameraden online:')").remove();
    $("div#status_box tr:contains('Registriert seit:')").remove();
    $("div#status_box tr:contains('Truppe:')").remove();
    $("div#status_box tr:contains('Position:')").remove();
    $("div#status_box tr:contains('Spezialisierung:')").remove();
    //Inhalt bearbeiten
    $("div#status_box td:contains('Versicherungsbetrag:')").html('<a href="/kaserne"><img src="img/content/dienst.png" alt="Versicherungsbetrag" title="Dein Versicherungsbetrag"/></a>');
    $('img[alt|=Angriff]').wrap('<a href="/stammakte/waffen" />');
    $('img[alt|=Verteidigung]').wrap('<a href="/stammakte/kleidung" />');
    $('img[alt|=Geschwindigkeit]').wrap('<a href="/stammakte/fahrzeuge" />');
    $('img[alt|=Moral]').wrap('<a href="/stammakte/extras" />');
    $('img[alt|=Orden]').wrap('<a href="/stammakte/orden" />');

    //Spielinterner Tooltip
    $('div#status_box img').addClass('tTip');

    $("div#status_box").css({
        'font-weight' : 'bolder',
        'text-align' : 'left',
        'float': 'left',
        'width': '240px',
        'height': '210px',
        'margin': '7px 0 0 6px',
        'padding' : '10px 0 0 0',
        'font-size':' 85%',
        'background':'url(../img/profil_box.png) no-repeat'
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

    function loader(site)
    {
        $('div:first').before('<div style="position:fixed;z-index:9999;background-color:black;opacity:0.4;width:'+$(window).width()+'px; height:'+$(window).height()+'px;"><img src="/img/lightbox/lightbox-ico-loading.gif" /></div>');

        $('div:first img').css({
                        position:'absolute',
                        left: ($(window).width() - $('div:first img').outerWidth())/2,
                        top: ($(window).height() - $('div:first img').outerHeight())/2,
                        opacity: '1.0'
                });
        //wenn alle Request fertig dann soll ein Reload erfolgen
        $('#sysmsg').ajaxStop(function()
        {
            if(site === undefined)
            {
                location.reload();
            }
            else
            {
                location.href = site;
            }
        });
    }

    if(path == '/stammakte/orden')
    {
        var ordenzeit = parseInt($.cookie('orden_zeit'));

        //NOW wurde bereits definiert---------------var now = new Date().getTime();

        if($.cookie('orden_zeit') === null)
        {
            ordenzeit = 0;
        }

        $('.item_box:first').before('<div id="alle_orden"></div>');

        var div = $('div#alle_orden');

        if((ordenzeit + 600000) <= now)
        {
            div.html('<div class="item_box"><div class="box_content"><div class="item_bild"><img src="img/orden/orden.png" /></div><div class="item_text">Hier kannst Du alle Orden auf einen Schlag De-/Aktivieren.</div><div class="clearing"></div><div class="item_schalter"></div></div><div class="headline">Orden</div><div class="box_head_left"></div> <div class="box_head_right"></div><div class="box_left"></div><div class="box_right"></div><div class="box_bottom_left"></div> <div class="box_bottom_right"></div></div>');

            var check = 0;

            if($(".box_content input[alt=deaktivieren]").val() !== undefined)
            {
                $('div#alle_orden .item_box .item_schalter').html('<img src="http://image.schulterglatze.de/img/orden/orden_inaktiv.png" alt="" id="gm_deaktiv" />');
                check = check+1;

                
            }

            if ($(".box_content input[alt=aktivieren]").val() !== undefined)
            {
                 $('div#alle_orden .item_box .item_schalter').html('<img src="http://www.schulterglatze.de/img/orden/orden.png" alt="" id="gm_aktiv" />');
                 check = check+1;
            }

            if(check === 2)
            {
                $('div#alle_orden .item_box .item_schalter').html('<img src="http://www.schulterglatze.de/img/orden/orden.png" alt="" id="gm_aktiv" /><img src="http://image.schulterglatze.de/img/orden/orden_inaktiv.png" alt="" id="gm_deaktiv" />');
            }

            var anzahl = $('.item_main_box form').length-1;
            $('div#alle_orden .item_schalter img').css('cursor', 'pointer');

            $('#gm_deaktiv').click(function()
            {
                //Cookie setzen fuer Zeit
                $.cookie("orden_zeit", now, { path: '/' });

                //Bildschirm abdunkeln
                loader();

                for (var i = 0; i <= anzahl; i++)
                {
                    var orden = $(".item_main_box form:eq(" + i + ") input:first").val();

                    var dataString = 'deaktivorden='+ orden + '&switch=deaktivorden';

                    $.ajax({
                        type: "POST",
                        processData: false,
                        url: "/stammakte/orden",
                        data: dataString
                    });
                }
            });

            $('#gm_aktiv').click(function()
            {
                //Cookie setzen fuer Zeit
                $.cookie("orden_zeit", now, { path: '/' });

                //Bildschirm abdunkeln
                loader();

                for (var i = 0; i <= anzahl; i++)
                {
                    var orden = $(".item_main_box form:eq(" + i + ") input:first").val();

                    var dataString = 'aktivorden='+ orden + '&switch=aktivorden';

                    $.ajax({
                        type: "POST",
                        processData: false,
                        url: "/stammakte/orden",
                        data: dataString
                    });
                }
            });
        }
        else
        {
            div.html('<div class="item_box"><div class="box_content"><div class="item_bild"><img src="img/orden/orden.png" /></div><div class="item_text">Hier kannst Du alle Orden auf einen Schlag De-/Aktivieren.<br/>Um den Server nicht zu sehr zu belasten, kannst Du erst wieder nach einer gewissen Zeit deine Orden De-/Aktivieren.</div><div class="clearing"></div><div class="item_schalter"></div></div><div class="headline">Orden</div><div class="box_head_left"></div> <div class="box_head_right"></div><div class="box_left"></div><div class="box_right"></div><div class="box_bottom_left"></div> <div class="box_bottom_right"></div></div>');
            //Spendenzeit berechnen
            var orden =(10 - ((now - ordenzeit)/1000/60))*60;
            //Anzeige der Dauer ab wann wieder gespendet werden kann
            $('.item_schalter:first').countdown({until: orden, format: 'MS', compact: true});
        }
    }
}