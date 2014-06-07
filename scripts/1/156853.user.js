// ==UserScript==
// @name           SdZ Extend
// @namespace      sdz
// @include        http://www.siteduzero.com/*
// @version        1.98
// ==/UserScript==
  
function addJQuery(callback)
{
    // tinyMce utilise une iframe, on veut l'exclure
    if (window.top != window.self)
        return;
 
    var script = document.createElement("script");

    script.textContent = "window.$=jQuery.noConflict(false);(" + callback.toString() + ")();";
    document.body.appendChild(script);
}
  
function UserPrefs()
{
    var version = "1.98";

    // Settings p1
    // ===========
    var carry = [
        "speedbar",
        "nopubs",
        "fullscreen",
        "logobeta",
        "librairie",
        "emploi",
        "boutique_accueil",
        "forufull",
        "v3foru",
        "foru_spb",
        "tutofull",
        "staticmenu"
    ];
        localStorage['follow_forum'] = {};

    console.log("zdesign == "+localStorage['zdesign']);
    if (localStorage['zdesign'] == undefined) {
        for (var i = carry.length - 1; i >= 0; i--) {
            var n = carry[i];
            localStorage[n] = "yes";
        }
        localStorage['zdesign'] = "";

        localStorage['follow_forum'] = {};
    };

    // Suivre un sujet
    // ===============
    $("#notFollow").bind("click", function() {
        var name = $("#mainSection h1:first").text();
        localStorage['follow_forum'][name] = window.location;

        alert(name+" = "+localStorage["follow_forum"][name]);
    });

    // Customiser le userscript (utilisation du LocalStorage => Google)
    // ================================================================
    var f = $("#mainFooter");
    f.prepend("<div class='containerSdz' id='custom'>LOADING ...</div><div style='clear:both;'></div>");
    $("#custom").html([
        "<div class='container container-fluid'>",
            "<div class='page-header'>",
                "<h3><a id='deroule'><img src=\"http://bits.wikimedia.org/static-1.21wmf7/extensions/MobileFrontend/stylesheets/modules/images/show.png?2013-01-18T01:38:20Z\" alt=\"Afficher\"> Customisez votre userscript !</a> <a class='btn btn-primary btn-medium' href='http://userscripts.org/scripts/source/156853.user.js' target='us_Sdz'>Mettre à jour votre userscript</a></h1>",
            "</div>",
            "<div id='div_custom'>",
                "<form id='form'>",
                    "<div class='row-fluid'>",
                        "<div class='span6'>",
                            "<h4>Fonctionnalités</h4>",
                            "<label for='speedbar'>Speedbar : </label>",
                            "<input type='checkbox' id='speedbar' /><br>",
                             
                            "<label for='nopubs'>Pas de pubs :</label>",
                            "<input type='checkbox' id='nopubs' /><br>",
                             
                            "<label for='fullscreen'>Tutoriels en plein écran :</label>",
                            "<input type='checkbox' id='fullscreen' /><br>",
     
                            "<label for='staticmenu'>Menu Statique</label>",
                            "<input type='checkbox' id='staticmenu' /><br>",
                        "</div>",
                        "<div class='span6'>",
                            "<h4>Modifier des éléments</h4>",
                            "<label for='logobeta'>Retirer le logo bêta : </label>",
                            "<input type='checkbox' id='logobeta' /><br>",
                             
                            "<label for='librairie'>Retirer l'onglet Librairie :</label>",
                            "<input type='checkbox' id='librairie' /><br>",
                             
                            "<label for='emploi'>Retirer l'onglet Emploi :</label>",
                            "<input type='checkbox' id='emploi' /><br>",
     
                            "<label for='boutique_accueil'>Retirer les livres de l'accueil</label>",
                            "<input type='checkbox' id='boutique_accueil' /><br>",
                        "</div>",
                    "</div>",
                    "<div class='row-fluid'>",
                        "<div class='span6'>",
                            "<h4>Options Forum</h4>",
                            "<label for='forufull'>Plein écran :</label>",
                            "<input type='checkbox' id='forufull' /><br>",
     
                            "<label for='v3foru'>Design v3 pour la présentation</label>",
                            "<input type='checkbox' id='v3foru' /><br>",
                            "<!-- Pour la prochaine version, chuttt !",
                            "<label for='foru_spb'>Bouton 'ajouter dans la speedbar'</label>",
                            "<input type='checkbox' id='foru_spb' /><br>",
                            "-->",
                        "</div>",
                        "<div class='span6'>",
                            "<h4>Options Tutoriels</h4>",
                            "<label for='tutofull'>Afficher dynamiquement les sous-parties</label>",
                            "<input type='checkbox' id='tutofull' /><br>",
                        "</div>",
                    "</div>",
                    "<div class='row-fluid'>",
                        "<div class='span6'>",
                            "<h4>zDesign</h4>",
                            "<label for='boutique_accueil'>Copier/coller l'url du zDesign distant</label>",
                            "<input type='textfield' id='zdesignurl' value='"+localStorage['zdesign']+"' /><br>",
                            "<p><a href='http://www.siteduzero.com/forum/sujet/zdesign-retour-du-zdesign'>Comment ça marche ?</a></p>",
                        "</div>",
                    "</div>",
                    "<div class='row-fluid'>",
                        "<div class='span12'>",
                            "<input type='submit' class='btn btn-primary btn-medium' value='Enregistrer'/>",
                        "</div>",
                    "</div>",
                "</form>",
                "<p>Votre userscript est actuellent en version v"+version+"</p>",
                "<p><strong>UserScript réalisé par Théo (tete31) et Xavinou pour tous les Zéros ! -> <a href='http://www.siteduzero.com/forum/sujet/userscript-firefox-chrome-sdz-extend'>Voir topic</a></strong></p>",
            "</div>",
        "</div>"
    ].join(""));
    var form = $("#form");
    $("#div_custom").slideToggle();
     
    $("#deroule").bind("click", function() {
        $("#div_custom").slideToggle();
    });

    form.submit(function()
    {
        localStorage['zdesign'] = $("#zdesignurl").val();
        console.log("zdesign = "+localStorage['zdesign']);

        for (var i = carry.length - 1; i >= 0; i--) {
            var n = carry[i];

            if ($("#"+n).is(":checked")) {
                localStorage[n] = "yes";
            } else {
                localStorage[n] = "no";
            }
        };

        window.location.reload();
    });

    // Settings loading
    // ================
    for (var i = carry.length - 1; i >= 0; i--) {
        var n = carry[i];
        var l = localStorage[n];

        if (l == "yes") {
            $("#"+n).attr("checked", true);
        } else {
            $("#"+n).attr("checked", false);
        }
    };

    function is(n) {
        return $("#"+n).is(":checked");
    }
    var speedbar            = is("speedbar");            // affiche la speedbar d'accès rapide aux principaux tutoriels
    var nopubs              = is("nopubs");              // suppression des pubs
    var fullscreenTuto      = is("fullscreen");          // tutoriels en plein écran
    var logobeta            = is("logobeta");            // suppression du logo "béta"
    var librairie           = is("librairie");           // suppression du lien "Librairie" de la speedbar
    var emploi              = is("emploi");              // suppression du lien "Emploi" de la speedbar
    var forufull            = is("forufull");            // forums en plein écran
    var v3forum             = is("v3foru");              // affichage des différents forums comme sur la v3 (un forum par ligne)
    var tutofull            = is("tutofull");            // chargement des sous-parties d'un tutoriel automatique
    var book                = is("boutique_accueil");    // suppression de la zone "Livres et eBook de la communauté" sur la page d'accueil  
    var zdesign             = localStorage['zdesign'];   // URL du CSS distant
    var staticmenu          = is("staticmenu");          // Menu statique qui suit l'utilisateur

    var isTuto = false;
    var isForum = false;
    if (document.location.href.substring(0, 38) == "http://www.siteduzero.com/forum/sujet/") {
        isForum = true;
    }
    if (document.location.href.substring(0, 49) == "http://www.siteduzero.com/informatique/tutoriels/") {
        isTuto = true;
    }

      
      
    // généralités
    if (document.location.href.substring(0, 25) == "http://www.siteduzero.com")
    {
        // Stocké sur Dropbox pour éviter de surcharger le code.
        $(' <link href="https://dl.dropbox.com/u/47402784/userscript-files/sdz_ban.css" rel="stylesheet" type="text/css" />').appendTo('head');
        $(' <link href="https://dl.dropbox.com/u/47402784/userscript-files/extension.css" rel="stylesheet" type="text/css" />').appendTo('head');

        // Ajout du zDesign !
        if (localStorage['zdesign'] != "" && localStorage['zdesign'] != undefined) {
            $(' <link href="'+localStorage['zdesign']+'" rel="stylesheet" type="text/css" media="all"/>').appendTo('head');
        }
          
        if(nopubs) {
            $(".pavement").css("display", "none");
            $(".adBan").css("display", "none");
  
            // Page d'accueil
            $("#headerPub").css("display", "none");
            if (window.location.href == "http://www.siteduzero.com/") {
                $("#mainContent").css("margin-top", (100+(staticmenu?100:0))+"px");
            }
        }

        if (staticmenu) {
            $("#headerTop")
            .css("position", "fixed");

            if (document.location.href == "http://www.siteduzero.com/" || document.location.href == "http://www.siteduzero.com/?") {
                // Correction du bug de la page index
                var m = $("#headerTop");
                m
                .css("z-index", "999999")
                .css("width", "100%")
                .css("top", "0px");
                $(".headGradient:first").css("display","none");
            } else {
                $("#headerMiddle").css("padding-top", "60px");

                // Style pour le menu
                $(' <link href="https://dl.dropbox.com/u/47402784/userscript-files/staticmenu.css" rel="stylesheet" type="text/css" />').appendTo('head');
            }
        }
  
        if(logobeta) {
            $("#beta").css("display", "none");
        }
        if(librairie) {
            $(".bookstoreLink").css("display","none");
        }
  
        if (emploi || librairie) {
           var w = (50+(emploi?100:0)+(librairie?100:0));
           $(".sep").css("display", "none");
           $("input[type=search]").css("width", w+"px");
           $("input[type=search]").css("margin-left", (-w+100)+"px");
        }
  
        if(emploi) {
            $(".jobLink").css("display","none");
        }
        if(book) {
            $(".shopContent").css("display", "none");
        }
  
        if (speedbar) {
            // Speedbar JS
            $("#mainHeader").append("<div id='speedb'></div>");
  
            var sp = $("#speedb");
  
            //Construction HTML, NE PAS OUBLIER LES VIRGULES
            var html = [
                "<div style='height: 370px;max-width: 900px;margin:auto;'>",
                    "<div class='row row-fluid sp-container'>",
                        "<div class='span3 tutoriels'>",
                            "<h3>Tutoriels à la une</h3>",
                            "<h5><img src='http://sdz-upload.s3.amazonaws.com/prod/categories/icons/5.png' style='height: 20px;'/> Site Web</h4>",
                            "<ul>",
                                "<li><a href='http://www.siteduzero.com/informatique/tutoriels/apprenez-a-creer-votre-site-web-avec-html5-et-css3'>HTML / CSS</a></li>",
                                "<li><a href='http://www.siteduzero.com/informatique/tutoriels/concevez-votre-site-web-avec-php-et-mysql'>PHP / MySql</a></li>",
                                "<li><a href='http://www.siteduzero.com/informatique/tutoriels/concevez-votre-site-web-avec-php-et-mysql/la-programmation-orientee-objet'>PHP POO</a></li>",
                                "<li><a href='http://www.siteduzero.com/informatique/tutoriels/dynamisez-vos-sites-web-avec-javascript'>Javascript</a></li>",
                                "<li><a href='http://www.siteduzero.com/informatique/tutoriels/simplifiez-vos-developpements-javascript-avec-jquery'>JQuery</a></li>",
                                "<li><a href='http://www.siteduzero.com/informatique/tutoriels/symfony2-un-tutoriel-pour-debuter-avec-le-framework-symfony2'>Symfony</a></li>",
                            "</ul>",
                            "<h5><img src='http://sdz-upload.s3.amazonaws.com/prod/categories/icons/46.png' style='height: 20px;'/> Programmation</h4>",
                            "<ul>",
                                "<li><a href='http://www.siteduzero.com/informatique/tutoriels/apprenez-a-programmer-en-c'>Langage C</a></li>",
                                "<li><a href='http://www.siteduzero.com/informatique/tutoriels/programmez-avec-le-langage-c'>Langage C++</a></li>",
                                "<li><a href='http://www.siteduzero.com/informatique/tutoriels/apprenez-a-programmer-en-java'>Java</a></li>",
                                "<li><a href='http://www.siteduzero.com/informatique/tutoriels/apprenez-a-programmer-en-python'>Python</a></li>",
                            "</ul>",
                        "</div>",
                        "<div class='span3 tutoriels' style='padding-top:30px;'>",
                            "<ul>",
                                "<li><a href='http://www.siteduzero.com/informatique/tutoriels/apprenez-a-developper-en-c'>C#</a></li>",
                                "<li><a href='http://www.siteduzero.com/informatique/tutoriels/visual-basic-net'>VB .net</a></li>",
                                "<li><a href='http://www.siteduzero.com/informatique/tutoriels/creez-votre-application-web-avec-java-ee'>Jave EE</a></li>",
                                "<li><a href='http://www.siteduzero.com/informatique/tutoriels/apprenez-a-programmer-en-perl'>Perl</a></li>",
                                "<li><a href='http://www.siteduzero.com/informatique/tutoriels/apprenez-a-programmer-en-actionscript-3'>ActionScript 3</a></li>",
                            "</ul>",
                            "<h5><img src='http://sdz-upload.s3.amazonaws.com/prod/categories/icons/dev_mobile.png' style='height: 20px;'/> Mobile</h4>",
                            "<ul>",
                                "<li><a href='http://www.siteduzero.com/informatique/tutoriels/creez-des-applications-pour-windows-phone'>Windows Phone</a></li>",
                                "<li><a href='http://www.siteduzero.com/informatique/tutoriels/creez-des-applications-pour-iphone-ipad-et-ipod-touch'>IOS</a></li>",
                                "<li><a href='http://www.siteduzero.com/informatique/tutoriels/creez-des-applications-pour-android'>Android</a></li>",
                            "</ul>",
                            "<h5><img src='http://sdz-upload.s3.amazonaws.com/prod/categories/icons/demande_config.png' style='height: 20px;'/> Matériel</h4>",
                            "<ul>",
                                "<li><a href='http://www.siteduzero.com/informatique/tutoriels/apprenez-a-monter-votre-ordinateur'>Monter votre ordinateur</a></li>",
                            "</ul>",
                        "</div>",
                        "<div class='span3 forums'>",
                            "<h3>Forums</h3>",
                            "<h5><img src='http://sdz-upload.s3.amazonaws.com/prod/categories/icons/5.png' style='height: 20px;'/> Site Web</h4>",
                            "<ul>",
                                "<li><a href='http://www.siteduzero.com/forum/categorie/html-css'>HTML & CSS</a></li>",
                                "<li><a href='http://www.siteduzero.com/forum/categorie/javascript'>Javascript</a></li>",
                                "<li><a href='http://www.siteduzero.com/forum/categorie/php'>PHP</a></li>",
                            "</ul>",
                            "<h5><img src='http://sdz-upload.s3.amazonaws.com/prod/categories/icons/8.png' style='height: 20px;'/> Programmation</h4>",
                            "<ul>",
                                "<li><a href='http://www.siteduzero.com/forum/categorie/langage-c'>Langage C</a></li>",
                                "<li><a href='http://www.siteduzero.com/forum/categorie/langage-c-1'>Langage C++</a></li>",
                                "<li><a href='http://www.siteduzero.com/forum/categorie/c-net-vb-net'>C# .NET & VB .NET</a></li>",
                                "<li><a href='http://www.siteduzero.com/forum/categorie/langage-java'>Java</a></li>",
                                "<li><a href='http://www.siteduzero.com/forum/categorie/langage-python'>Python</a></li>",
                                "<li><a href='http://www.siteduzero.com/forum/categorie/base-de-donnees'>Base de données</a></li>",
                                "<li><a href='http://www.siteduzero.com/forum/categorie/mobile'>Mobile</a></li>",
                            "</ul>",
                        "</div>",
                        "<div style='padding-top:30px;' class='span3 forums'>",
                            "<ul>",
                                "<li><a href='http://www.siteduzero.com/forum/categorie/autres-langages'>Autres langages</a></li>",
                            "</ul>",
                            "<h5><img src='http://sdz-upload.s3.amazonaws.com/prod/categories/icons/48.png' style='height: 20px;'/> Infographie</h4>",
                            "<ul>",
                                "<li><a href='http://www.siteduzero.com/forum/categorie/graphisme-2d'>Graphisme 2D</a></li>",
                                "<li><a href='http://www.siteduzero.com/forum/categorie/graphisme-3d'>Graphisme 3D</a></li>",
                            "</ul>",
                            "<h5><img src='http://sdz-upload.s3.amazonaws.com/prod/categories/icons/30.png' style='height: 20px;'/> Communauté</h4>",
                            "<ul>",
                                "<li><a href='http://www.siteduzero.com/forum/categorie/recrutement-pour-vos-projets'>Recrutement pour vos projets</a></li>",
                                "<li><a href='http://www.siteduzero.com/forum/categorie/presentation-de-vos-projets'>Présentation de vos projets</a></li>",
                                "<li><a href='http://www.siteduzero.com/forum/categorie/questions-sur-les-tutoriels'>Questions sur les tutoriels</a></li>",
                                "<li><a href='http://www.siteduzero.com/forum/categorie/discussions-generales'>Discussions générales</a></li>",
                            "</ul>",
                            "<h5><img src='http://www.siteduzero.com/bundles/thread/images/default.png?20130118155814' style='height: 20px;'/> UserScript</h4>",
                            "<ul>",
                                "<li><a href='http://www.siteduzero.com/forum/sujet/userscript-firefox-chrome-sdz-extend'>Topic UserScript</a></li>",
                                "<li>Topic <a href='http://www.siteduzero.com/forum/sujet/zdesign-retour-du-zdesign'>zDesign 1</a>, <a href='http://www.siteduzero.com/forum/sujet/zdesign-retour-du-zdesign-1'>zDesign 2</a></li>",
                            "</ul>",
                        "</div>",
                    "</div>",
                "</div>",
                "<div class='headGradient' style='margin-top:310px;'>",
                    "<div></div>",
                    "<div></div>",
                "</div>",
            ].join("");
  
            sp.html(html);

            $(".tutorialLink").bind("mouseenter", function() {
                $("#speedb").fadeIn(200);
                $(".tutoriels").css("display", "block");
                $(".forums").css("display", "none");
            });

            $(".forumLink").bind("mouseenter", function() {
                $("#speedb").fadeIn(200);
                $(".tutoriels").css("display", "none");
                $(".forums").css("display", "block");
            });

            // Enter or leave
            $("#mainHeader").bind("mouseleave", function() {
                $("#speedb").fadeOut(1000);
            });
  
            sp.fadeOut(0);

            if (staticmenu) {
                sp.css("position", "fixed");
            }
        }
        $("body").css("visibility", "visible");     
    }  



      
    // forum
      
    if (window.location.href.substring(0, 31) == "http://www.siteduzero.com/forum")
    {
        if(forufull)  {
            $("#mainFooter").css("padding", "50px 50px 50px 50px");
            $(".uservoice").css("display", "none");
            $(".containerSdz").css("width", "auto");
            $('.container').css('width', "auto");
            $("#mainMenu").css("margin-left", "20px").css("width", "100%");
            $("#headerTop").css("width", "100%").css("z-index", "99999999");
            $("#headerMiddle").css("margin-left", "20px");
            $("#breadcrumbtrail").css("margin-left", "20px");
            //$(' <link href="sdz.css" rel="stylesheet" type="text/css" />').appendTo('head');
  
            $(".message").css("margin", "0");
            $(".message").css("max-width", "none");


            // Style pour le menu
            $(' <link href="https://dl.dropbox.com/u/47402784/userscript-files/fullscreenmenu.css" rel="stylesheet" type="text/css" />').appendTo('head');
        }
  
        if (v3forum) {
            $("section#mainContent .categoryForum")
                .css("height", "53px")
                .css("display", "block")
                .css("width", "100%")
                .css("padding-top", "10px");
            $("section#mainContent .categoryForum .name")
                .css("display", "inline");
            $(".imgCategoryForum img")
                .css("width", "45px");
            $("section#mainContent .categoryForum .contentCategory")
                .css("display", "inline");
            $("section#mainContent .categoryForum .name + .lastMessage")
                .css("margin-left", "200px");
            $("section#mainContent .categoryForum .name + .lastMessage .lastMessage")
                .css("width", "100%");
            $("section#mainContent .categoryForum .name .rightContentCategoryForum")
                .css("width", "300px");
            $(".pavement")
                .css("display", "none");

            $("section#mainContent .categoryForum .name + .lastMessage").find("hr").remove();
        }
  
        $("html").css("display", "block");
  
    }
      
      
      
      
      
      
    // tutoriels
    if (window.location.href.substring(0, 49) == "http://www.siteduzero.com/informatique/tutoriels/" || window.location.href.substring(0, 45) == "http://www.siteduzero.com/sciences/tutoriels/")
    {
        if(fullscreenTuto)  {
            $("#mainFooter").css("padding", "50px 50px 50px 50px");
            $(".uservoice").css("display", "none");
            $(".containerSdz").css("width", "auto");
            $('.container').css('width', "auto");
  
            //$(' <link href="sdz.css" rel="stylesheet" type="text/css" />').appendTo('head');
  
            // Title
            $(".dashboard").css('float', "right").css("display", "inline");
            $(".tutorial").css("clear", "none");
            // HOME = .content, TUTO = #content
            $(".tutorial #content").css("display", "block");
            $(".tutorial .content").css("display", "block");
            $(".tutorial .clear").css("display", "none");
  
            // TUTO MAIN
            $(".tutorial #content, .tutorial .content").css("width", "auto").css("padding", "50px 50px 50px 30px");


            // Style pour le menu
            $(' <link href="https://dl.dropbox.com/u/47402784/userscript-files/fullscreenmenu.css" rel="stylesheet" type="text/css" />').appendTo('head');
        }
  
        if (tutofull) {
            $( ".courseSummary > li > a" ).each(function( index ) {
              $(this).html("<strong> <img src='http://www.laneaviation.com/wp-content/themes/laneaviation/images/loading.gif' style='width:20px;'/> LOADING :</strong> "+$(this).html());
            });
  
            // Code par Xavinou, merci à toi!
                 
            // ne rien faire sur l'accueil d'un big tuto
            if ($(".chapterContainer").length > 0)
                return;
                    
            var tab = new Array();
            var nb = 0;
            var total = $(".courseSummary").find('a').length;
                
            $(".courseSummary").find('a').each(function(index) {
             
                $.ajax({
                    url: $(this).attr('href'),
                    error: function() {
                        tab[index] = "<section class=\"tutorial\"><div id=\"content\"><a href=\"" + this.url + "\" style='color:red;'>Erreur 500 lors du chargement. Veuillez recharger la page.</a><br /></div></section>";
                        nb++;
                            
                        if (total == nb)
                        {
                            var insert = "";
            
                            for (i = 0; i < tab.length; i++)
                                insert += tab[i];
                                    
                            $(".summary").html(insert);
                        }
                    },
                    success: function(result) {
                        tab[index] = "<section class=\"tutorial\"><div id=\"content\"><h4><a href=\"" + this.url + "\">" + $(result).find(".tutoTitle").find("h1").text().trim() + "</a></h4><br />" + $(result).find(".tutorial").find("#content").html() + "</div></section>";
                        nb++;
                            
                        if (total == nb)
                        {
                            var insert = "";
            
                            for (i = 0; i < tab.length; i++)
                                insert += tab[i];
                                    
                            $(".summary").html(insert);
                        }
                    }
                });
             
            });
              
        }
    }

    // Bug de la notif fantome
    // =======================
    var html = $(".nbNotif").html();
    if (html != 0) {
        // Bud detecté
        var l = $("#lastNotifications > li").length - 1;
        if ( l == 0)
        {
            $(".nbNotif").remove();
            $("#notifications").removeClass("fullOpacity");
        }
        else if (l != html) {
            $(".nbNotif").html(l);
        }
    }
}
  
  
if (document.location.href.substring(0, 25) == "http://www.siteduzero.com") {
    addJQuery(UserPrefs);
}