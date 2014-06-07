// ==UserScript==
// @name       AstroPad_ArmadaMushRooms
// @version    0.4.1
// @grant      GM_xmlhttpRequest
// @match      http://mush.vg/*
// @match      http://mush.vg/#
// @match      http://mush.twinoid.com/*
// @match      http://mush.twinoid.com/#
// @match      http://mush.twinoid.es/*
// @match      http://mush.twinoid.es/#
// @copyright  2012+, Sunsky (inspiration Skildor' scripts)[Modif by Ravenor]
// @updateurl  http://userscripts.org/scripts/source/178215.user.js
// ==/UserScript==
// @require http://code.jquery.com/jquery-latest.js

/* TODO
 * EVOL : Cacher le contenu de la piece (clic sur le nom ?) => tout cacher / tout devoiler
 * BUG FIX : recherche item prend en compte les datas autres dans le nom "(x3)..."
 * 
 */

var $ = unsafeWindow.jQuery;
var Main = unsafeWindow.Main;
var now;
var url_astro="http://astropad.sunsky.fr/api.py"
HERONAMES= new Array('jin su','frieda','kuan ti','janice','roland','hua','paola','chao','finola','stephen','ian','chun','raluca','gioele','eleesha','terrence')

if (window.location.href.indexOf('mush.twinoid.com')!=-1) {
    language='en';
    URL_MUSH="mush.twinoid.com"
    READ_EFFECT=0
    var ROOMNAMES=new Array(
        'Bridge','Alpha Bay','Bravo Bay','Alpha Bay 2','Nexus','Medlab','Laboratory','Refectory','Hydroponic Garden','Engine Room',
        'Front Alpha Turret','Centre Alpha Turret','Rear Alpha Turret','Front Bravo Turret','Centre Bravo Turret','Rear Bravo Turret',
        'Patrol Ship Tomorrowland','Patrol Ship Olive Grove','Patrol Ship Yasmin','Patrol Ship Wolf','Patrol Ship E-Street','Patrol Ship Eponine','Patrol Ship Carpe Diem','Pasiphae',
        'Front Corridor','Central Corridor','Rear Corridor','Planet','Icarus Bay','Alpha Dorm','Bravo Dorm',
        'Front Storage','Centre Alpha Storage','Rear Alpha Storage','Centre Bravo Storage','Rear Bravo Storage','Outer Space infini','Limbo'
    );
    TXT_DESC="Inventory Manager developed by Sunsky."
    TXT_CAMERA="Camera"
    TXT_DRONE="Drone"
    TXT_INTOX="Food Poisoning"
    TXT_HIDDEN="namey6:Hiddeng"
    TXT_BROKEN="namey6:Brokeng"
    TXT_BROKEN2="Broken"
    TXT_EFFECT="Effects"
    TXT_IMPERISHABLE="Imperishable"
    TXT_HEAL="Cures"
    TXT_CHEF="Chef"
    TXT_SATISFACTION="satisfaction"
    TXT_THIRSTY="thirsty"
    TXT_DRY="dry"
    TXT_DISEASED="diseased"
    
    TXT_BY="by"
    TXT_THE="the"
    TXT_AT="at"
    TXT_EMPTY="Void"
    TXT_INVENTORY="INVENTORY"
    TXT_SUBMIT="Synchronize"
    TXT_REFRESH="Refresh"
    TXT_LIST="Text Format"
    TXT_SHOW="Show"
    TXT_HELP="Help"
    TXT_NEW="New"
    TXT_EXIT="Exit"
    
                
    TXT_UPDATEEFFECT="Do you want to update the effects ?\n\n(Cancel = update but without the effects)"
    TXT_HELP_1="Here is the text that you should send to your teammates in order to share your AstroPad:"
    TXT_HELP_2 ="    **I suggest using AstroPad for inventory tracking**<br/>";
    TXT_HELP_2+="This is a script that works with Firefox and Chrome:<br/>";
    TXT_HELP_2+=" - for firefox, install GreaseMonkey<br/>"
    TXT_HELP_2+="//https://addons.mozilla.org/en/firefox/addon/greasemonkey//<br/>";
    TXT_HELP_2+=" - for  Chrome, install TamperMonkey<br/>"
    TXT_HELP_2+="//https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en//<br/>";
    TXT_HELP_2+=" <br/>";
    TXT_HELP_2+="Then follow this link to install the script:<br/>";
    TXT_HELP_2+="//http://astropad.sunsky.fr/astropad.user.js//<br/>";
    TXT_HELP_2+=" <br/>";
    TXT_HELP_2+="Then follow this link to join this game's AstroPad:<br/>";
    TXT_HELP_3="Thank you for your attention"
    TXT_LINK_1="Do you want to bind Astropad #"
    TXT_LINK_2="of which the key is"
    TXT_LINK_3="to this game"
    TXT_UNLINK_1="Do you really want to delete the link between AstroPad #"
    TXT_UNLINK_2=" and this game?\nIf you lose the Astropad Key, you cannot get it back."
    
} else if (window.location.href.indexOf('mush.twinoid.es')!=-1) {
    language='es';
    URL_MUSH="mush.twinoid.es"
    READ_EFFECT=-1
    var ROOMNAMES=new Array(
        'Puente de mando','Plataforma Alpha','Plataforma Beta','Plataforma Alpha 2','Nexus','Enfermería','Laboratorio','Comedor','Jardín Hidropónico','Sala de motores',
        'Cañón Alpha delantero','Cañón Alpha central','Cañón Alpha trasero','Cañón Beta delantero','Cañón Beta central','Cañón Beta trasero',
        'Patrullero Longane','Patrullero Jujube','Patrullero Tamarindo','Patrullero Sócrates','Patrullero Epicuro','Patrullero Platón','Patrullero Wallis','Pasiphae',
        'Pasillo delantero','Pasillo central','Pasillo trasero','Planeta','Icarus','Dormitorio Alpha','Dormitorio Beta',
        'Almacén delantero','Almacén Alpha central','Almacén Alpha trasero','Almacén Beta central','Almacén Beta trasero','Espacio infinito','El limbo'
    );
    TXT_DESC="Gestor de inventario desarrollado por Sunsky. Traducción xxbrut0xx."
    TXT_CAMERA="Cámara"
    TXT_DRONE="Dron"
    TXT_INTOX="Intoxicación Alimentaria"
    TXT_HIDDEN="y4:namey6:Ocultog"
    TXT_BROKEN="namey4:Rotog"
    TXT_BROKEN2="Roto"
    TXT_EFFECT="Efectos"
    TXT_IMPERISHABLE="No perecible"
    TXT_HEAL="Cura la enfermedad"
    TXT_CHEF="Chef"
    TXT_SATISFACTION="satisfaction"
    TXT_THIRSTY="thirsty"
    TXT_DRY="dry"
    TXT_DISEASED="diseased"
    
    TXT_BY="por"
    TXT_THE="el"
    TXT_AT="a las"
    TXT_EMPTY="Vacío"
    TXT_INVENTORY="INVENTARIO"
    TXT_SUBMIT="Sincronizar "
    TXT_REFRESH="Actualizar"
    TXT_LIST="Formato Texto"
    TXT_SHOW="Visualizar"
    TXT_HELP="Ayuda"
    TXT_NEW="Nuevo"
    TXT_EXIT="Quitar"
    
    TXT_UPDATEEFFECT="¿Desea actualizar los efectos? \n\n (Cancelar=actualizadas pero sin los efectos)"
    TXT_HELP_1="Aqui está la prueba a ofrecer a vuestros compañeros de equipo para compartir vuestro AstroPad :"
    TXT_HELP_2 ="    **Le sugiero usar AstroPad para el inventario**<br/>";
    TXT_HELP_2+="Este es un script que funciona con Firefox y Chrome:<br/>";
    TXT_HELP_2+=" - Sobre Firefox, instalar GreaseMonkey<br/>"
    TXT_HELP_2+="//https://addons.mozilla.org/es/firefox/addon/greasemonkey//<br/>";
    TXT_HELP_2+=" - Sobre Chrome, instalar TamperMonkey<br/>"
    TXT_HELP_2+="//https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=es//<br/>";
    TXT_HELP_2+=" <br/>";
    TXT_HELP_2+="A continuación, vaya al siguiente enlace para instalar el script<br/>";
    TXT_HELP_2+="//http://astropad.sunsky.fr/astropad.user.js//<br/>";
    TXT_HELP_2+=" <br/>";
    TXT_HELP_2+="A continuación, vaya al siguiente enlace para unirse el inventario de esta partida:<br/>";
    TXT_HELP_3="Gracias por su atención"
    TXT_LINK_1="¿Deseas vincular el AstroPad n°"
    TXT_LINK_2="cuya clave es"
    TXT_LINK_3="a la partida"
    TXT_UNLINK_1="¿Estás seguro que quieres eliminar el enlace entre el AstroPad n°"
    TXT_UNLINK_2=" y la partida ?\nSi pierde la clave relativa a su partida, no será capaz de encontrarla."
    
} else {
    language='';
    URL_MUSH="mush.vg"
    READ_EFFECT=0
    var ROOMNAMES=new Array(
        'Pont','Baie Alpha','Baie Beta','Baie Alpha 2','Nexus','Infirmerie','Laboratoire','Réfectoire','Jardin Hydroponique','Salle des moteurs',
        'Tourelle Alpha avant','Tourelle Alpha centre','Tourelle Alpha arrière','Tourelle Beta avant','Tourelle Beta centre','Tourelle Beta arrière',
        'Patrouilleur Longane','Patrouilleur Jujube','Patrouilleur Tamarin','Patrouilleur Socrate','Patrouilleur Epicure','Patrouilleur Planton','Patrouilleur Wallis','Pasiphae',
        'Couloir avant','Couloir central','Couloir arrière','Planète','Baie Icarus','Dortoir Alpha','Dortoir Beta',
        'Stockage Avant','Stockage Alpha centre','Stockage Alpha arrière','Stockage Beta centre','Stockage Beta arrière','Espace infini','Les Limbes'
    );
    TXT_DESC="Gestionnaire d'inventaire développé par Sunsky."
    TXT_CAMERA="Caméra"
    TXT_DRONE="Drone"
    TXT_INTOX="Intoxication Alimentaire"
    TXT_HIDDEN="namey10:Cach%C3%A9g"
    TXT_BROKEN="namey10:Cass%C3%A9g"
    TXT_BROKEN2="Cassé(e)"
    TXT_EFFECT="Effets"
    TXT_IMPERISHABLE="Impérissable"
    TXT_HEAL="Guérie"
    TXT_CHEF="Cuistot"
    TXT_SATISFACTION="satiété"
    TXT_THIRSTY="assoiffé"
    TXT_DRY="desseché"
    TXT_DISEASED="malade"
    
    TXT_BY="par"
    TXT_THE="le"
    TXT_AT="à"
    TXT_EMPTY="Vide"
    TXT_INVENTORY="INVENTAIRE"
    TXT_SUBMIT="Synchroniser"
    TXT_REFRESH="Raffraichir"
    TXT_LIST="Format Texte"
    TXT_SHOW="Visualiser"
    TXT_HELP="Aide"
    TXT_NEW="Nouveau"
    TXT_EXIT="Quitter"
    
    TXT_UPDATEEFFECT="Voulez-vous mettre à jour les effets ?\n\n(Annuler = mise à jour quand même mais sans les effets)"
    TXT_HELP_1="Voici le texte à fournir à vos coéquipiers pour partager votre AstroPad :"
    TXT_HELP_2 ="    **Je vous propose l'AstroPad pour l'inventaire**<br/>";
    TXT_HELP_2+="Il s'agit d'un script qui fonctionne avec Firefox et Chrome :<br/>";
    TXT_HELP_2+=" - Sur firefox, installer GreaseMonkey<br/>"
    TXT_HELP_2+="//https://addons.mozilla.org/fr/firefox/addon/greasemonkey//<br/>";
    TXT_HELP_2+=" - Sur Chrome, installer TamperMonkey<br/>"
    TXT_HELP_2+="//https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=fr//<br/>";
    TXT_HELP_2+=" <br/>";
    TXT_HELP_2+="Aller ensuite sur le lien suivant pour installer le script<br/>";
    TXT_HELP_2+="//http://astropad.sunsky.fr/astropad.user.js//<br/>";
    TXT_HELP_2+=" <br/>";
    TXT_HELP_2+="Aller ensuite sur le lien suivant pour rejoindre l'inventaire de cette partie :<br/>";
    TXT_HELP_3="Merci de votre attention"
    TXT_LINK_1="Voulez-vous lier l'AstroPad n°"
    TXT_LINK_2="dont la clé est"
    TXT_LINK_3="à cette partie"
    TXT_UNLINK_1="Voulez-vous vraiment supprimer le lien entre l'AstroPad n°"
    TXT_UNLINK_2=" et cette partie ?\nSi vous perdez la clé relative à votre partie, vous ne serez plus en mesure de la retrouver."
}

var ROOMCONNECT=[[10,13,24],[11,25,32,29,3],[14,25,34,30,26],[1,26,12,9],[26],[6,24,14],[24,5],[25],[24,31],[28,15,12,33,35,3],[0,24],[31,1],[3,9],[0,24],[5,2],[28,9],[1],[1],[1],[2],[2],[2],[3],[3],[0,10,13,6,5,8,31,25],[2,24,7,1],[2,29,30,4,3,28,33,35],[],[26,35,9],[1,26],[2,26],[24,8,11],[1],[26,9],[2],[26,9],[],[],]
var ALPHABET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function capitalize(str) { 
   return str.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
}

function getRoomIdForAstroPad() {
    var rname=$("#input").attr('d_name');
    return ROOMNAMES.indexOf(rname);
}

function getCheckForAstroPad() {
    var $it0 = Main.heroes.iterator();
    var chk = "";
    while( $it0.hasNext() ) {
        var st1 = $it0.next();
        chk += ALPHABET[parseInt(st1.id)];   
    }
    return chk; 
}

function getHname() {
    var nodes, node;
    nodes = document.evaluate("//td//h1[@class='h1 who']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (nodes.snapshotLength != 0) {
        node = nodes.snapshotItem(0);
        return node.innerHTML.trim();
    }
    return "";
}

function getMushStatus() {
    hname=getHname().toLowerCase();
    var $it0 = Main.heroes.iterator();
    while( $it0.hasNext() ) {
        var st1 = $it0.next();
        if (st1.skills == null) continue;
        if (hname!=st1.surname.toLowerCase()) continue;
        // Status loop
        var $it1 = st1.statuses.iterator();
        while( $it1.hasNext() ) {
            if ($it1.next().img=="mush")
                return true;
        }
    }
    return false;
}

function canReadMedic() {
    hname=getHname().toLowerCase();
    var $it0 = Main.heroes.iterator();
    while( $it0.hasNext() ) {
        var st1 = $it0.next();
        if (st1.skills == null) continue;
        if (hname!=st1.surname.toLowerCase()) continue;
        var $it1 = st1.skills.iterator();
        while( $it1.hasNext() ) {
            img=$it1.next().img;
            if (img=="biologist") return true;
            if (img=="first_aid") return true;
            if (img=="medic") return true;
        }
    }
    return false;
}

function canReadFood() {
    hname=getHname().toLowerCase();
    var $it0 = Main.heroes.iterator();
    while( $it0.hasNext() ) {
        var st1 = $it0.next();
        if (st1.skills == null) continue;
        if (hname!=st1.surname.toLowerCase()) continue;
        var $it1 = st1.skills.iterator();
        while( $it1.hasNext() ) {
            if ($it1.next().img=="cook") return true;
        }
    }
    return false;
}
function getUserInfoForAstroPad() {
    var tid = 0, hid = 0, nodes, node, hname, rname, rid;
    nodes=document.evaluate("//a[@id='tid_openRight']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (nodes.snapshotLength != 0) {
        node=nodes.snapshotItem(0);
        tid=node.getAttribute('href').replace(new RegExp("http://twinoid.com/user/(.*)", 'gi'),'$1');
    }
    nodes=document.evaluate("//a[@id='tid_openRight']//span[@class='tid_name']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (nodes.snapshotLength != 0) {
        node=nodes.snapshotItem(0);
        uname=node.innerHTML;
    }
    hid=HERONAMES.indexOf(getHname().toLowerCase());
    return 'tid='+tid+'&hid='+hid;
}

function getDataForAstroPad() {
    var chk=getCheckForAstroPad();
    var data=getUserInfoForAstroPad();
    var gid=localStorage['ASTROPAD_'+language+'gid'];
    var gkey=localStorage['ASTROPAD_'+language+'gkey'];
    return data+'&gid='+gid+'&gkey='+gkey+'&chk='+chk;
}

var inventoryIcon = {
    "diseased" : ":plant_diseased:",
    "dry" : ":plant_dry:",
    "thirsty" : ":plant_thirsty:",
    "youngling" : ":plant_youngling:",
}

function AstroTabTip (e) {
    var tgt = (e || event).target;
    var title = "AstroPad";
    var desc = TXT_DESC
    Main.showTip(tgt,
        "<div class='tiptop' ><div class='tipbottom'><div class='tipbg'><div class='tipcontent'>" +
        (title ? "<h1>" + title + "</h1>" : "") +
        (desc ? "<p>" + desc.replace("\r\n", "") + "</p>" : "") +
        "</div></div></div></div>"
    );
}

function SelectTab(el) {
    if (el.getAttribute('data-tab')!=undefined) {
        $("#astrotab").removeClass("tabon").addClass("taboff");
        $("#astrotab_content").css("display", "none");
        fill_astrotab("");
        return Main.selChat(el.getAttribute('data-tab'));
    }
    
    // Select tab
    $("#cdTabsChat li").removeClass("tabon").addClass("taboff");
    $("#astrotab").removeClass("taboff").addClass("tabon");
    
    // Display content
    $("#localChannel").css("display", "none");
    $("#mushChannel").css("display", "none");
    $(".objective").css("display", "none");
    $("#cdStdWall").css("display", "none");
    $("#cdFavWall").css("display", "none");
    for (var i=0; i<3; i++)
        $("#cdPrivate"+i).css("display", "none");
    $("#privateform").css("display", "none");
    $("#wall").css("display", "none"); 
    $("#astrotab_content").css("display", "block");
    astro_get_inventaire();
}

function build_astrotab() {
    if ($("#astrotab").length>0) return;
    //astrotab
    var rbg = $("#chatBlock");
    $("<div>").addClass("cdAstroTab").attr("id", "astrotab_content").appendTo(rbg);
    $("#astrotab").attr("_title", "AstroPad").attr("_desc", "Affiche l'inventaire.");
       
    var tabschat = $("#cdTabsChat");
    var tabs = $("<li>").addClass("tab taboff").attr("id", "astrotab").appendTo(tabschat);
    $("<img>").attr("src", "/img/icons/ui/pa_comp.png").appendTo(tabs);
    fill_astrotab("");
    $("#astrotab_content").css("display", "none");
    $("#astrotab").on("mouseover", AstroTabTip);
    $("#astrotab").on("mouseout", Main.hideTip);
    $("#cdTabsChat li").on("click", function() { SelectTab(this); });
}

function astro_maj_inventaire() {
    var url=url_astro+"/addItems";
    var text ="";
    var data=getDataForAstroPad()+'&data=';
    var rid =getRoomIdForAstroPad();
    var conso=""
    
    var readMedicEffect=canReadMedic();
    var readFoodEffect=canReadFood();
    var allItems = Main.items;
    var $it1 = allItems.iterator();
    var inb_cam=0;
    var inb_drone=0;
    while( $it1.hasNext() ) {
        $it=$it1.next();
        if ($it.iid == "CAMERA")
            inb_cam++;
        if ($it.iid == "HELP_DRONE") {
            inb_drone++;
            data+=rid+"|"+TXT_DRONE+"|help_drone|"+inb_drone+"|"+$it.serial+"|§";
        }
    }
    if (inb_cam>0)
        data+=rid+"|"+TXT_CAMERA+"|camera|"+inb_cam+"||§";
    var allNpc = Main.npc;
    var $it2 = allNpc.iterator();
    var inb_cat=0
   while( $it2.hasNext() ){ 
        $it2.next()
        inb_cat++;
    }
    if (inb_cat>0)
        data+=rid+"|Schrödinger|body_cat|"+inb_cat+"||§";
    
    var childs = $("#room").children(':not(.cdEmptySlot)');
    if (childs.size() > 0) {
        ok=0;
        childs.each(function() {
            var li = $(this);
            var datatip = li.attr('data-tip');
            var dataName = li.attr('data-name');
            var iimg = li.find("td").css('background-image').replace('url(','').replace(/[)"]/g,'');
            var iid=iimg.replace('.jpg','').replace(/\\/g,'/').replace( /.*\//, '' );
            var idetail="";
            var desc = li.attr("data-desc");
            
            if (iid == "camera") return;
            if(desc.indexOf(TXT_EFFECT) != -1) {
                //TODO a adapter pour les autres langues 
                if (ok==2 || ok==-2) {
                } else if (READ_EFFECT==0) {
                    if (desc.indexOf(TXT_CHEF) != -1 && readFoodEffect) {
                        ok=1
                    } 
                    if (desc.indexOf(TXT_CHEF) == -1 && readMedicEffect) {
                        ok=1;
                    }
                    if (ok)
                        if (confirm(TXT_UPDATEEFFECT))
                            ok=2;
                        else
                            ok=-2;
                } else if (READ_EFFECT==1) {
                    ok=1;
                } else {
                    ok=0;
                }
                if (ok>0) {
                    idetail = desc.substring(desc.indexOf("</em>")+5,desc.length);
                    if (idetail.indexOf("État")!=-1)
                        idetail = idetail.substring(0,idetail.indexOf("État"));
                    intox=idetail.indexOf(TXT_INTOX);
                    if (intox!=-1) {
                        deb=idetail.substring(0,intox);
                        deb=deb.substring(0,deb.lastIndexOf("<p>"));
                        end=idetail.substring(intox,idetail.length);
                        end=end.substring(end.indexOf("</p>")+4,end.length);
                        idetail = deb+end;
                    }
                    idetail = idetail.replace(/Données sur les effets :/g,":hp:");
                    idetail = idetail.replace(new RegExp(TXT_EFFECT+"[^:]*:","g"),"");
                    idetail = idetail.replace(/(\t|\\r|\\n)/g,"").replace(/(\\|<p>|<\/?div>)/g,'').replace(/<\/p>$/g,'').replace(/<\/p>/g,', ');
                    idetail = idetail.replace(/<img class='paslot' src='\/img\/icons\/ui\/pa_slot1.png' alt='pa' \/>/g,":pa:");
                    idetail = idetail.replace(/<img src='\/img\/icons\/ui\/moral.png' alt='moral' \/>/g,":moral:");
                    idetail = idetail.replace(/<img class='paslot' src='\/img\/icons\/ui\/pa_slot2.png' alt='pm'\/>/g,":pm:");
                    idetail = idetail.replace(/<img src='\/img\/icons\/ui\/lp.png' alt='hp' \/>/g,":hp:");
                    idetail = idetail.replace(new RegExp(TXT_SATISFACTION,"g"),":pa_cook:");
                    idetail = idetail.replace(/Cuisinable, /g,"");
                    idetail = idetail.replace(new RegExp(TXT_IMPERISHABLE+", ","g"),"");
                    idetail = idetail.replace(new RegExp(", "+TXT_IMPERISHABLE,"g"),"");
                    conso+=iid+"|"+idetail+"§";
                    idetail="";
                }
            }
            
            if(dataName.indexOf(TXT_HIDDEN) ==-1) {
                var qte = li.children('.qty:first');
                //var iname=unserialize(datatip,'name')
                iname='item';
                a=datatip.indexOf('y4:namey') 
                if (a!=-1) {
                    b=datatip.indexOf(':',a+8)

                    v=datatip.substring(a+8,b);
                    v=parseInt(v);
                    iname=datatip.substring(b+1,b+1+v);
                }
                
                var iserial = li.attr('serial');
                var inb;
                
                //TODO a adapter pour les autres langues
                if(dataName.indexOf('namey12:Congel%C3%A9g') !=-1) {
                    iname+=" Congelé";
                }
                //TODO a adapter pour les autres langues
                if (readFoodEffect) {
                    if (desc.indexOf('Avariée') !=-1) {
                        iname+=" Avariée";
                    }
                    if (desc.indexOf('Instable') !=-1) {
                        iname+=" Instable";
                    }
                    if (desc.indexOf(' Décomposition') !=-1) {
                        iname+="  Décomposition";
                    }
                }
                if(dataName.indexOf(TXT_BROKEN) !=-1) {
                    iname+=" "+TXT_BROKEN2;
                }
                //TODO a adapter pour les autres langues
                icharge=dataName.indexOf('namey7:Chargesg')
                if(icharge !=-1) {
                    a=dataName.indexOf('>x',icharge);
                    b=dataName.length
                    idetail+=dataName.substring(a+2,b)+" charges"
                }
                if(parseInt(qte.text().trim())) 
                    inb = parseInt(qte.text().trim());
                else
                    inb = 1;
                //TODO a adapter pour les autres langues
                if (dataName.indexOf("thirsty") != -1) 
                    iname+=' '+TXT_THIRSTY
                else if (dataName.indexOf("dry") != -1)
                    iname+=' '+TXT_DRY
                if (dataName.indexOf("diseased") != -1)
                    iname+=' '+TXT_DISEASED
                var iday=0;
                
                data+=rid+"|"+iname+"|"+iid+"|"+inb+"|"+idetail+"|"+iday+"§";
            }
        });
        data = data.substring(0,data.length-1);
    } else if ((inb_cam+inb_drone+inb_cat)==0) {
        data+=rid+"||empty|0||";
    }
    
    data+="&conso="+conso;
    text+=url+'?'+data;
    console.log(text);
    
    //return;
    setTimeout(function() {
        GM_xmlhttpRequest({
            method: 'POST',url: url,data: data,headers:{'Content-type':'application/x-www-form-urlencoded'},
            onload: function(responseDetails) {
                //console.log(responseDetails.responseText);
                astro_get_inventaire();
            }
        });
    }, 0);
}

function astro_reset() {
    if (confirm(TXT_UNLINK_1+gid+TXT_UNLINK_2)) {
        localStorage.removeItem('ASTROPAD_'+language+'gid');
        localStorage.removeItem('ASTROPAD_'+language+'gkey');
		//$("#astrotab").css("display", "none");
        //$("#astrotab_content").css("display", "none");        
		fill_astrotab("");
    }
}

function astro_test() {
    var rid =getRoomIdForAstroPad();
    rooms=ROOMCONNECT[rid];
    txt ="Salle : "+rid+"<br>";
    for (var i=0; i<rooms.length; i++) {
        rid=rooms[i];
        rname=ROOMNAMES[rid];
        url="http://"+URL_MUSH+"/?fa=81&fp="+rid
        txt+="Se déplacer : <a href='"+url+"'>"+rname+"</a><br>";;
    }
    fill_astrotab(txt);
}

function astro_configuration() {
    var gid=localStorage['ASTROPAD_'+language+'gid'];
    var gkey=localStorage['ASTROPAD_'+language+'gkey'];

    url1="http://"+URL_MUSH+"/?astroId="+gid+"&astroKey="+gkey;
    contenttxt ="<div class='cdMushLog  cdChatLine'>";
    contenttxt+="    <div class='bubble bubble2 tid_editorContent'>";
    contenttxt+="        <img src='/img/design/pixel.gif' class='char' style='background:url(http://imgup.motion-twin.com/twinoid/0/1/d9869944_14716.jpg)!important;height:42px'>";
    contenttxt+="        <div class='talks'>";
    contenttxt+="            <div class='triangleright'></div>";
    contenttxt+="            <span class='buddy'> Sunsky :</span>";
    contenttxt+="            <p>"+TXT_HELP_1+"</p>";
    contenttxt+="            <div class='clear'></div>";
    contenttxt+="        </div>";
    contenttxt+="    </div>";
    contenttxt+="</div>";

    contenttxt+="<div class='cdMushLog  cdChatLine'>";
    contenttxt+="    <div class='bubble  tid_editorContent'>";
    contenttxt+="        <img src='/img/design/pixel.gif' class='char' style='background:url(http://imgup.motion-twin.com/twinoid/6/7/4f22b23f_14716.jpg)!important;height:42px'>";
    contenttxt+="        <div class='talks'>";
    contenttxt+="            <div class='triangleleft'></div>";
    //contenttxt+="            <span class='buddy'> Sunsky :</span>";
    contenttxt+="            <p style='font-size:10px'>";
    contenttxt+=TXT_HELP_2;
    contenttxt+="//<a href='"+url1+"'>"+url1+"</a>//<br/> <br/>"+TXT_HELP_3+".";
    contenttxt+="            </p><div class='clear'></div>";
    contenttxt+="        </div>";
    contenttxt+="    </div>";
    contenttxt+="</div>";

    fill_astrotab(contenttxt);
    
    //$('#astro_get_inventaire_txt').bind('click', astro_get_inventaire_txt);
}

function astro_view_inventaire() {
    var gid=localStorage['ASTROPAD_'+language+'gid'];
    var gkey=localStorage['ASTROPAD_'+language+'gkey'];
    var rkey=localStorage['ASTROPAD_'+language+'rkey'];
    if (!rkey) rkey=gkey;
    
    url2="http://astropad.sunsky.fr/?gid="+gid+"&rkey="+rkey+"&language="+language;
    window.open(url2,'_blank');
    
    //fill_astrotab(url2);
}
function astro_new() {
    var url=url_astro+"/newInv";
    var text ="";
    var data="api=1";
    text=url+'?'+data;
    console.log(text);
    setTimeout(function() {
        GM_xmlhttpRequest({
            method: 'GET',url: url+"?"+data,
            onload: function(responseDetails) {
                res=responseDetails.responseText.replace(/\n/g,'').replace(/\r/g,'');
                data=res.split('|');
                if (data.length!=2)
                    return;
                gid=data[0];
                gkey=data[1];
                if (confirm(TXT_LINK_1+gid+" "+TXT_LINK_2+" "+gkey+" "+TXT_LINK_3+" ?")) {
                    localStorage['ASTROPAD_'+language+'gid']=gid;
                    localStorage['ASTROPAD_'+language+'gkey']=gkey;
                    astro_get_inventaire();
                }
            }
        })
    },0);
}
    
function astro_get_inventaire() {
    if (!localStorage['ASTROPAD_'+language+'gid'] || !localStorage['ASTROPAD_'+language+'gkey']) return;
    var url=url_astro+"/getItems";
    var text ="";
    var data=getDataForAstroPad();
    
    text=url+'?'+data;
    console.log(text);
    setTimeout(function() {
        GM_xmlhttpRequest({
            method: 'GET',url: url+"?"+data,
            onload: function(responseDetails) {
                res=responseDetails.responseText
                //console.log(res);
                contenttxt="";
                rooms=res.split('#');
                rooms_size=rooms.length;
                infos=rooms[0].split('|')
                rkey=infos[0];
                
                localStorage['ASTROPAD_'+language+'rkey']=rkey;
                for(var j=1;j<rooms_size;j++) {
                    items=rooms[j].split('\n');
                    items_size=items.length;
                    roomid=parseInt(items[0]);
                    contenttxt+="<div class='roomTitle astro_rid_"+roomid+"' id='astro_rid_"+roomid+"'><b>"+ROOMNAMES[roomid]+"</b></div>";
                    if (items_size>2) 
                        contenttxt+="<div class='what_happened'><table class='table' >";
                    for(var i=1;i<items_size-1;i++) {
                        parts=items[i].split('|');
                        iname=parts[0];
                        iid=parts[1];
                        date=parts[6];
                        heroid=parts[7];
                        iname=capitalize(iname);//.charAt(0).toUpperCase() + iname.slice(1);
                        footer=TXT_BY+" "+capitalize(HERONAMES[heroid])+"<br>"+TXT_THE+" "+date.substring(6,8)+" "+TXT_AT+" "+date.substring(8,10)+":"+date.substring(10,12);
                        if (iid=="empty") {
                            contenttxt+="<tr  ><td style='width:35px;height:35px;border-spacing: 0;padding: 0;'>"+TXT_EMPTY+"</td><td style='text-align:left;border-spacing: 0;padding: 0;'></td>";
                            contenttxt+="<td style='font-size:10px;text-align:right;vertical-align:bottom;width:75px'>"+footer+'</td></tr>';
                            continue;
                        }
                        iimg="<img src='http://"+URL_MUSH+"/img/icons/items/"+iid+".jpg' height=35 width=35;"
                        
                        inb=parts[2];
                        if (parts[4])
                            idetail=parts[4]
                        else
                            idetail=parts[3]
                        
                        
                        if (idetail) {
                            idetail = idetail.replace(/ :pa:/g,"<img class='paslot' src='\/img\/icons\/ui\/pa_slot1.png' alt='pa' \/>");
                            idetail = idetail.replace(/ :moral:/g,"<img src='\/img\/icons\/ui\/moral.png' alt='moral' \/>");
                            idetail = idetail.replace(/ :pm:/g,"<img class='paslot' src='\/img\/icons\/ui\/pa_slot2.png' alt='pm'\/>");
                            idetail = idetail.replace(/ :hp:/g,"<img src='\/img\/icons\/ui\/lp.png' alt='hp' \/>");
                            idetail = idetail.replace(/:plant_thirsty:/g,"<img src='\/img\/icons\/ui\/plant_thirsty.png' alt='soif' title='Soif'\/>");
                            idetail = idetail.replace(/:plant_dry:/g,"<img src='\/img\/icons\/ui\/plant_dry.png' alt='desséché' title='Deséché'\/>");
                            idetail = idetail.replace(/:plant_thirsty:/g,"<img src='\/img\/icons\/ui\/plant_thirsty.png' alt='Malade' title='Malade'\/>");
                            //TODO a adapter pour les autres langues 
                            idetail = idetail.replace(new RegExp(TXT_SATISFACTION,"g"),"<img src='\/img\/icons\/ui\/pa_cook.png' alt='"+TXT_SATISFACTION+"' title='"+TXT_SATISFACTION+"'\/>");
                            idetail = idetail.replace(/ :pa_cook:/g,"<img src='\/img\/icons\/ui\/pa_cook.png' alt='"+TXT_SATISFACTION+"' title='"+TXT_SATISFACTION+"'\/>");
                            idetail = idetail.replace(/Cuisinable, /g,"");
                            idetail = idetail.replace(/ charges/g,"<img src='\/img\/icons\/ui\/charge.png' alt='charge' \/>");
                            //
                            idetail = idetail.replace(new RegExp(TXT_HEAL,"g"),"<img src='\/img\/icons\/ui\/pa_heal.png' alt='heal' \/>");
                            idetail = idetail.replace(new RegExp(TXT_IMPERISHABLE+", ","g"),"");
                            idetail = idetail.replace(new RegExp(", "+TXT_IMPERISHABLE,"g"),"");
                            idetail = idetail.replace(new RegExp(TXT_EFFECT+"[^:]*:","g"),"");
                            idetail=" : <i>"+idetail+"</i>";
                        }
                        if (inb!="1")
                            inb=" (x"+inb+")";
                        else
                            inb="";
                            
                        contenttxt+="<tr  ><td style='width:35px;height:35px;border-spacing: 0;padding: 0;'>"+iimg+"</td><td style='text-align:left;border-spacing: 0;'><b>"+iname+inb+"</b>"+idetail+"</td>";
                        contenttxt+="<td style='font-size:10px;text-align:right;vertical-align:bottom;width:75px'>"+footer+'</td></tr>';
                        
                    }
                    contenttxt+="</table></div>";
                }
                fill_astrotab(contenttxt,"#astro_rid_"+getRoomIdForAstroPad());
            }
        });
    }, 0);
}

function astro_get_inventaire_txt() {
    if (!localStorage['ASTROPAD_'+language+'gid'] || !localStorage['ASTROPAD_'+language+'gkey']) return;
    var url=url_astro+"/getItems";
    var text ="";
    var data=getDataForAstroPad();
    
    text=url+'?'+data;
    console.log(text);
    setTimeout(function() {
        GM_xmlhttpRequest({
            method: 'GET',url: url+"?"+data,
            onload: function(responseDetails) {
                res=responseDetails.responseText
                contenttxt="**//"+TXT_INVENTORY+"//**\n";
                rooms=res.split('#');
                rooms_size=rooms.length;
                rkey=rooms[0];
                localStorage['ASTROPAD_'+language+'rkey']=rkey;
                for(var j=1;j<rooms_size;j++) {
                    items=rooms[j].split('\n');
                    items_size=items.length;
                    roomid=parseInt(items[0]);
                    contenttxt+="**"+ROOMNAMES[roomid]+"**";
                    for(var i=1;i<items_size-1;i++) {
                        parts=items[i].split('|');
                        iname=parts[0];
                        iid=parts[1];
                        date=parts[6];
                        heroid=parts[7];
                        iname=capitalize(iname);
                        if (i==1) contenttxt+=" //"+TXT_BY+" "+capitalize(HERONAMES[heroid])+" "+TXT_THE+" "+date.substring(6,8)+" "+TXT_AT+" "+date.substring(8,10)+":"+date.substring(10,12)+"//\n";
                        if (iid=="empty") {
                            contenttxt+="- "+TXT_EMPTY+"\n";
                            continue;
                        }
                        inb=parts[2];
                        idetail=parts[4];
                        
                        if (idetail) {
                            //TODO a adapter pour les autres langues 
                            idetail = idetail.replace(/Cuisinable, /g,"");
                            idetail = idetail.replace(new RegExp(TXT_SATISFACTION,"g"),":pa_cook:");
                            idetail = idetail.replace(new RegExp(TXT_HEAL,"g"),":pa_heal:");
                            idetail = idetail.replace(new RegExp(TXT_IMPERISHABLE+", ","g"),"");
                            idetail = idetail.replace(new RegExp(", "+TXT_IMPERISHABLE,"g"),"");
                            idetail = idetail.replace(new RegExp(TXT_EFFECT+"[^:]*:","g"),"");
                        }
                        if (inb!="1")
                            inb=" (x"+inb+" )";
                        else
                            inb="";
                        contenttxt+="- "+iname+inb
                        if (idetail)
                            contenttxt+=" //"+idetail+" //";
                        contenttxt+="\n";
                    }
                }
                fill_astrotab("<textarea style='font-size:8pt;color:black;width:100%;height:100%'>"+contenttxt+"</textarea>");
            }
        });
    }, 0);
}

function astro_options(){
    if($("#astro_opt_content").hasClass("show")){
        $("#astro_opt_content").animate({"height":"0px"}).removeClass("show");
        $("#astro_scrollpanel").animate({"margin-top":"-=42"});
    } else {
        $("#astro_opt_content").animate({"height":"42px"}).addClass("show");
        $("#astro_scrollpanel").animate({"margin-top":"+=42"});
    }
}

function fill_astrotab(content,gotoelemid) {
    gid=localStorage['ASTROPAD_'+language+'gid'];
    var tab = $("#astrotab_content").empty();
    
    var divheader = $("<div>").addClass("fixedHeader");
    
    var divobj = $("<div>").addClass("objtitle");
    divobj.append($("<img>").attr("src","/img/icons/ui/pa_comp.png"));
    divobj.append("AstroPad (n°"+gid+")");
    divobj.append($("<img>").attr("src","/img/icons/ui/pa_comp.png"));
    divobj.appendTo(divheader);
    
    var divbutton = $("<div>").addClass("replybuttons");
    $("<a>").addClass("butmini").attr("href","#").attr("id","astro_maj_inventaire").append($("<img>").attr("src","/img/icons/ui/projects_done.png")).append("<span>Sync & List</span>").appendTo(divbutton);
    $("<a>").addClass("butmini").attr("href","#").attr("id","astro_get_inventaire").append($("<img>").attr("src","http://twinoid.com/img/icons/refresh.png").attr("title","Raffraichir")).appendTo(divbutton);
    $("<a>").addClass("butmini").attr("href","#").attr("id","astro_get_inventaire_txt").append($("<img>").attr("src","http://www.twinpedia.com/_media/hordes/objets/item_rp_manual.gif").attr("title","Listing format texte")).appendTo(divbutton);
    $("<a>").addClass("butmini").attr("href","#").attr("id","astro_view_inventaire").append($("<img>").attr("src","http://www.hordes.fr/gfx/forum/smiley/h_exploration.gif")).append("<span>Visu</span>").appendTo(divbutton);
    $("<a>").addClass("butmini").attr("href","#").attr("id","astro_configuration").append($("<img>").attr("src","/img/icons/ui/guide.png")).append("<span>Aide</span>").appendTo(divbutton);
    $("<a>").addClass("butmini").attr("href","#").attr("id","astro_new").append($("<img>").attr("src","/img/icons/ui/recent.png")).append("<span>Nouveau</span>").appendTo(divbutton);
    $("<a>").addClass("butmini").attr("href","#").attr("id","astro_reset").append($("<img>").attr("src","/img/icons/ui/close.png")).appendTo(divbutton);
    divbutton.append("<br/>");
    $("<a>").addClass("butmini").attr("href","#").attr("id","astro_options").append($("<img>").attr("src","img/icons/ui/pam.png")).append("<span>Options</span>").appendTo(divbutton);
    divbutton.appendTo(divheader);
    
    /*
     * options
     */
    var divoptcontent = $("<div>").attr("id","astro_opt_content").addClass("astroopt").appendTo(divheader);
    // Option filtre sur la piece en cours
    var checkmyroom = $("<input>").attr("type","checkbox").attr("id","myroom").addClass("checkbox").appendTo(divoptcontent);
    checkmyroom.change(filterOnMyRoom);
    $("<label>").attr("for","myroom").html("Afficher ma salle uniquement").appendTo(divoptcontent);
    // option de recherche d'un objet
    var divSearch = $("<div>");
    $("<span>").html("Rechercher un objet : ").appendTo(divSearch);
    var checkItem = $("<input>").attr("type","text").attr("id","itemSearch").appendTo(divSearch);
    checkItem.keyup(searchItem);
    divSearch.appendTo(divoptcontent);
    /*
     * end options
     */
    
    $("<div>").attr("id","astroTabAllContent").append(divheader).append("<div id='astro_scrollpanel'>"+content+"</div>").css("color", "rgb(9, 10, 97)").appendTo(tab);
    $("#astroTabAllContent").css("height",$("#chatBlock").css("height"));
    
    $('#astro_get_inventaire').bind('click', astro_get_inventaire);
    $('#astro_get_inventaire_txt').bind('click', astro_get_inventaire_txt);
    $('#astro_view_inventaire').bind('click', astro_view_inventaire);
    $('#astro_maj_inventaire').bind('click', astro_maj_inventaire);
    $('#astro_configuration').bind('click', astro_configuration);
    $('#astro_reset').bind('click', astro_reset);
	$('#astro_new').bind('click', astro_new);
    $("#astro_options").bind('click', astro_options);
    
    if (gotoelemid){
    	scroll=$("#astro_scrollpanel");
    	room=$(gotoelemid);
    	//room=$("#astro_maj_inventaire");
    	room.css("display","block");
    	if (room.offset())
    		scroll.scrollTop(scroll.scrollTop() + room.offset().top-scroll.offset().top);
    }
}

function filterOnMyRoom(){
    $("#astro_scrollpanel div").each(function(){
            $(this).show();
        });
    if(this.checked){
        $("#itemSearch").attr("disabled",true);
        var rname = $("#input").attr('d_name');
        $("#astro_scrollpanel div").each(function(index){
            if(index%2 == 0 && $(this).text() != rname){
                $(this).next().hide();
                $(this).hide();
            }
        });
    } else {
        $("#itemSearch").attr("disabled",false);
    }
    $("#chatBlock").scrollTop(0);
    $("#itemSearch").val("");
}

function searchItem(){
    var val = $(this).val().trim().toUpperCase();
    $("#astro_scrollpanel .what_happened").each(function(index){
        var itemName = $("td:nth-child(2)",$(this)).text().trim().toUpperCase();
        if(itemName.indexOf(val) != -1){
            $(this).prev().css("display","block");
            $(this).css("display","block");
        } else {
            $(this).prev().css("display","none");
            $(this).css("display","none");
        }
    });
}

function unserialize(buffer,valueName) {
    //var new haxe.Unserializer(buffer).unserialize();
    //var data = unsafeWindow.haxe.Unserializer.run(buffer);
    //return data[valueName];
}
function replaceURLWithHTMLLinks(text) {
    var exp = /\[link\=([^\]]*)\]([^\[]*)\[\/?link\]/i;
    var text2=text.replace(exp,"<a href='$1' target='_blank'>$2</a> ( <a href='$1' target='_blank'>$1</a> )"); 
    if (text2!=text) return text2;
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
    text=text.replace(exp,"<a href='$1' target='_blank'>$1</a>"); 
    return text;
}

function startScript() {
    pattern1=/astroId=([0123456789]*)/g
    pattern2=/astroKey=([0123456789abcdef]*)/g
    gid=pattern1.exec(window.location.href);
    gkey=pattern2.exec(window.location.href);
    
    if (gid && gkey) {
        gid=gid[1];
        gkey=gkey[1];
        if (confirm(TXT_LINK_1+gid+" "+TXT_LINK_2+" "+gkey+" "+TXT_LINK_3+" ?")) {
            localStorage['ASTROPAD_'+language+'gid']=gid;
            localStorage['ASTROPAD_'+language+'gkey']=gkey;
        }
    }

    if($("#input").length == 0) {
        return;
    }
    //console.log('Start AstroPad');
    
    var currentDate = new Date();
    
    build_astrotab();
    now = $("#input").attr('now');
    setInterval(function() {
            var gameNow = $("#input").attr('now');
            if(gameNow != now) {
                now = gameNow;
            }
            build_astrotab();
        }, 1000);

    if($(".kmenu").length > 0){
        $("<style>").attr("type", "text/css").html("\
        .fixedHeader{\
            position: absolute;\
            top: 0px;\
            width: 94%;\
            margin-left: 4px;\
            padding-bottom: 4px;\
            padding-top: 4px;\
            background: rgb(194, 243, 252);\
            border-bottom: 1px solid #1d3f6d;\
        }\
        ").appendTo("head");
    } else {
        $("<style>").attr("type", "text/css").html("\
        .fixedHeader{\
            position: absolute;\
            top: 64px;\
            width: 36%;\
            margin-left: 4px;\
            padding-bottom: 4px;\
            padding-top: 4px;\
            background: rgb(194, 243, 252);\
            border-bottom: 1px solid #1d3f6d;\
        }\
        ").appendTo("head");
    }
}

window.addEventListener('load', startScript, false);

$("<style>").attr("type", "text/css").html("\
	.replybuttons .butmini span {\
		margin-left: 3px;\
	}\
    .replybuttons .butmini{\
    	margin-left: 3px;\
		padding-bottom: 2px;\
		margin-right: 0px;\
		margin-bottom: 1px;\
    }\
	.replybuttons {\
		width: 99%;\
    	text-align: center;\
    }\
    .roomTitle {\
        text-align: center;\
        margin-top: 8px;\
    }\
    table.table td{\
    	overflow: inherit;\
    }\
	#astro_scrollpanel{\
        margin-top: 76px;\
    }\
    #astrotab_options{\
        width: 95%;\
        height: 100%;\
        position: absolute;\
        top: 70px;\
        margin-left: 5px;\
	}\
    #astrotab_optionsContent{\
        width: 100%;\
	}\
    .astroopt{\
    	height: 0px;\
		overflow: hidden;\
		resize: none;\
    }\
    .checkbox{\
    	top: 2px;\
    	position: relative;\
    }\
    #itemSearch{\
    	width: 63%;\
		color: #222976;\
    }\
	").appendTo("head");