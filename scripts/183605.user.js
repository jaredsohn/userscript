// ==UserScript==
// @name       AstroPad for mush.twinoid.com
// @version    0.16
// @grant      GM_xmlhttpRequest
// @match      http://mush.twinoid.com/*
// @match      http://mush.twinoid.com/#
// @copyright  2012+, Sunsky (inspiration Skildor' scripts)
// @updateurl http://astropad.sunsky.fr/astropad.user.js
// ==/UserScript==
// @require http://code.jquery.com/jquery-latest.js
var $ = unsafeWindow.jQuery;
var Main = unsafeWindow.Main;
var now;
var url_asto="http://astropad.sunsky.fr/api.py"
var cqfd=0;
HERONAMES= new Array('jin su','frieda','kuan ti','janice','roland','hua','paola','chao','finola','stephen','ian','chun','raluca','gioele','eleesha','terrence')

var ROOMNAMES=new Array(
    'Pont','Baie Alpha','Baie Beta','Baie Alpha 2','Nexus','Infirmerie','Laboratoire','RÃ©fectoire','Jardin Hydroponique','Salle des moteurs',
    'Tourelle Alpha avant','Tourelle Alpha centre','Tourelle Alpha arriÃ¨re','Tourelle Beta avant','Tourelle Beta centre','Tourelle Beta arriÃ¨re',
    'Patrouilleur Longane','Patrouilleur Jujube','Patrouilleur Tamarin','Patrouilleur Socrate','Patrouilleur Epicure','Patrouilleur Planton','Patrouilleur Wallis','Pasiphae',
    'Couloir avant','Couloir central','Couloir arriÃ¨re','PlanÃ¨te','Baie Icarus','Dortoir Alpha','Dortoir Beta',
    'Stockage Avant','Stockage Alpha centre','Stockage Alpha arriÃ¨re','Stockage Beta centre','Stockage Beta arriÃ¨re','Espace infini','Les Limbes'
);
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
    var chk= "";
    while( $it0.hasNext() ) {
        var st1 = $it0.next();
        chk+= ALPHABET[parseInt(st1.id)];   
    }
    return chk; 
}

function getHname() {
    var nodes,node
    nodes =document.evaluate("//td//h1[@class='h1 who']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (nodes.snapshotLength != 0) {
        node=nodes.snapshotItem(0);
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
    if (cqfd) return true;
    hname=getHname().toLowerCase();
    var $it0 = Main.heroes.iterator();
    while( $it0.hasNext() ) {
        var st1 = $it0.next();
        if (st1.skills == null) continue;
        if (hname!=st1.surname.toLowerCase()) continue;
        var $it1 = st1.skills.iterator();
        while( $it1.hasNext() ) {
            if ($it1.next().img=="biologist") return true;
            //if ($it1.next().img=="first_aid") return true;
        }
    }
    return false;
}

function getUserInfoForAstroPad() {
    var tid=0,hid=0,nodes,node,hname,rname,rid;
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
    var gid=localStorage['ASTROPAD_gid'];
    var gkey=localStorage['ASTROPAD_gkey'];
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
    var desc = "Gestionnaire d'inventaire dÃ©veloppÃ© par Sunsky."
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
    if (!localStorage['ASTROPAD_gid'] || !localStorage['ASTROPAD_gkey']) return;
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
    $("#astrotab_content").parent().css('height','500px');
    $("#astrotab").on("mouseover", AstroTabTip);
    $("#astrotab").on("mouseout", Main.hideTip);
    $("#cdTabsChat li").on("click", function() { SelectTab(this); });
}

function astro_maj_inventaire() {
    var url=url_asto+"/addItems";
    var text ="";
    var data=getDataForAstroPad()+'&data=';
    var rid =getRoomIdForAstroPad();
    var conso=""
    
    var readEffect=canReadMedic();
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
            data+=rid+"|Drone|help_drone|"+inb_drone+"|"+$it.serial+"|Â§";
        }
    }
    if (inb_cam>0)
        data+=rid+"|CamÃ©ra|camera|"+inb_cam+"||Â§";
    /*if (inb_drone>0)
        data+=rid+"|Drone|help_drone|"+inb_drone+"||Â§";
    */  
    var allNpc = Main.npc;
    var $it2 = allNpc.iterator();
    var inb_cat=0
   while( $it2.hasNext() ){ 
        $it2.next()
        //if ($it2.next().id == "263")
        inb_cat++;
    }
    if (inb_cat>0)
        data+=rid+"|SchrÃ¶dinger|body_cat|"+inb_cat+"||Â§";
    
    var childs = $("#room").children(':not(.cdEmptySlot)');
    if (childs.size() > 0) {
        childs.each(function() {
            var li = $(this);
            var datatip = li.attr('data-tip');
            var dataName = li.attr('data-name');
            var iimg = li.find("td").css('background-image').replace('url(','').replace(/[)"]/g,'');
            var iid=iimg.replace('.jpg','').replace(/\\/g,'/').replace( /.*\//, '' );
            var idetail="";
            var desc = li.attr("data-desc");
            //console.log(desc);
            if(desc.indexOf("Effets") != -1 && readEffect) {
                idetail = desc.substring(desc.indexOf("</em>")+5,desc.length);
                if (idetail.indexOf("Ã‰tat")!=-1)
                    idetail = idetail.substring(0,idetail.indexOf("Ã‰tat"));
                intox=idetail.indexOf("Intoxication Alimentaire");
                if (intox!=-1) {
                    deb=idetail.substring(0,intox);
                    deb=deb.substring(0,deb.lastIndexOf("<p>"));
                    end=idetail.substring(intox,idetail.length);
                    end=end.substring(end.indexOf("</p>")+4,end.length);
                    idetail = deb+end;
                }
                idetail = idetail.replace(/DonnÃ©es sur les effets :/g,":hp:");
                idetail = idetail.replace(/Effets : /g,"");
                idetail = idetail.replace(/(\t|\\r|\\n)/g,"").replace(/(\\|<p>|<\/?div>)/g,'').replace(/<\/p>$/g,'').replace(/<\/p>/g,', ');
                idetail = idetail.replace(/<img class='paslot' src='\/img\/icons\/ui\/pa_slot1.png' alt='pa' \/>/g,":pa:");
                idetail = idetail.replace(/<img src='\/img\/icons\/ui\/moral.png' alt='moral' \/>/g,":moral:");
                idetail = idetail.replace(/<img class='paslot' src='\/img\/icons\/ui\/pa_slot2.png' alt='pm'\/>/g,":pm:");
                idetail = idetail.replace(/<img src='\/img\/icons\/ui\/lp.png' alt='hp' \/>/g,":hp:");
                idetail = idetail.replace(/satiÃ©tÃ©/g,":pa_cook:");
                idetail = idetail.replace(/ImpÃ©rissable, /g,"");
                idetail = idetail.replace(/, ImpÃ©rissable/g,"");
                idetail = idetail.replace(/Cuisinable, /g,"");
                //idetail = .replace(/, <br\/>/g,', ');
                conso+=iid+"|"+idetail+"Â§";
                idetail="";
            } else if(desc.indexOf("DonnÃ©es sur les effets :") != -1) {
                idetail = desc.substring(desc.indexOf("</em>")+5,desc.length);
                idetail = idetail.replace(/DonnÃ©es sur les effets :/g,"");
                idetail = idetail.replace(/(\t|\\r|\\n)/g,"").replace(/(\\|<p>|<\/?div>)/g,'').replace(/<\/p>$/g,'').replace(/<\/p>/g,', ');
                idetail = idetail.replace(/<img class='paslot' src='\/img\/icons\/ui\/pa_slot1.png' alt='pa' \/>/g,":pa:");
                idetail = idetail.replace(/<img src='\/img\/icons\/ui\/moral.png' alt='moral' \/>/g,":moral:");
                idetail = idetail.replace(/<img class='paslot' src='\/img\/icons\/ui\/pa_slot2.png' alt='pm'\/>/g,":pm:");
                idetail = idetail.replace(/<img src='\/img\/icons\/ui\/lp.png' alt='hp' \/>/g,":hp:");
                idetail = idetail.replace(/satiÃ©tÃ©/g,":pa_cook:");
                idetail = idetail.replace(/ImpÃ©rissable, /g,"");
                idetail = idetail.replace(/, ImpÃ©rissable/g,"");
                idetail = idetail.replace(/Cuisinable, /g,"");
            }
            
            if(dataName.indexOf('namey10:Cach%C3%A9g') ==-1) {
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
                
                if(dataName.indexOf('namey12:Congel%C3%A9g') !=-1) {
                    iname+=" CongelÃ©";
                }
                if (readEffect) {
                    if (desc.indexOf('AvariÃ©e') !=-1) {
                        iname+=" AvariÃ©e";
                    }
                    if (desc.indexOf('Instable') !=-1) {
                        iname+=" Instable";
                    }
                    if (desc.indexOf(' DÃ©composition') !=-1) {
                        iname+="  DÃ©composition";
                    }
                }
                
                if(dataName.indexOf('namey10:Cass%C3%A9g') !=-1) {
                    iname+=" CassÃ©(e)";
                }
                icharge=dataName.indexOf('namey7:Chargesg')
                if(icharge !=-1) {
                    a=dataName.indexOf('>x',icharge);
                    b=dataName.length
                    console.log((a+2)+" "+b+" "+dataName.substring(a+2,b));
                    idetail+=dataName.substring(a+2,b)+" charges"
                }
                if(parseInt(qte.text().trim())) 
                    inb = parseInt(qte.text().trim());
                else
                    inb = 1;
                /*for(var name in inventoryIcon) {
                    if (dataName.indexOf(name) != -1) {
                        idetail = inventoryIcon[name];
                    }
                }*/
                if (dataName.indexOf("thirsty") != -1) 
                    iname+=' assoiffÃ©'
                else if (dataName.indexOf("dry") != -1)
                    iname+=' dessechÃ©'
                if (dataName.indexOf("diseased") != -1)
                    iname+=' malade'
                var iday=0;
                
                data+=rid+"|"+iname+"|"+iid+"|"+inb+"|"+idetail+"|"+iday+"Â§";
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
                //console.log("> "+responseDetails.responseText);
                alert('Mise Ã  jour effectuÃ©e');
                astro_get_inventaire();
            }
        });
    }, 0);
}

function astro_reset() {
    if (confirm("Voulez-vous vraiment supprimer le lien entre la partie "+gid +" et l'AstroPad ?\nSi vous perdez la clÃ© relative Ã  votre partie, vous ne serez plus en mesure de la retrouver.")) {
        Main.selChat(0);
        localStorage.removeItem('ASTROPAD_gid');
        localStorage.removeItem('ASTROPAD_gkey');
        $("#astrotab").css("display", "none");
        $("#astrotab_content").css("display", "none");
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
        url="http://mush.twinoid.com/?fa=81&fp="+rid
        txt+="Se dÃ©placer : <a href='"+url+"'>"+rname+"</a><br>";;
    }
    fill_astrotab(txt);
    
    
}
function astro_configuration() {
    
    var gid=localStorage['ASTROPAD_gid'];
    var gkey=localStorage['ASTROPAD_gkey'];
    //var rkey=localStorage['ASTROPAD_rkey'];
    //if (!rkey) rkey=gkey;
    
    url1="http://mush.twinoid.com/?astroId="+gid+"&astroKey="+gkey;
    //url2="http://astropad.sunsky.fr/?gid="+gid+"&rkey="+rkey;
    
    /*contenttxt ="<div class='cdMushLog  cdChatLine'>";
    contenttxt+="    <div class='bubble bubble2 tid_editorContent'>";
    contenttxt+="        <img src='/img/design/pixel.gif' class='char' style='background:url(http://imgup.motion-twin.com/twinoid/0/1/d9869944_14716.jpg)!important;height:42px'>";
    contenttxt+="        <div class='talks'>";
    contenttxt+="            <div class='triangleright'></div>";
    contenttxt+="            <span class='buddy'> Sunsky :</span>";
    contenttxt+="            <p>Voici le lien pour visualiser votre vaisseau  : <a href='"+url2+"'>"+url2+"</a></p>";
    contenttxt+="            <div class='clear'></div>";
    contenttxt+="        </div>";
    contenttxt+="    </div>";
    contenttxt+="</div>";
    */
    contenttxt ="<div class='cdMushLog  cdChatLine'>";
    contenttxt+="    <div class='bubble bubble2 tid_editorContent'>";
    contenttxt+="        <img src='/img/design/pixel.gif' class='char' style='background:url(http://imgup.motion-twin.com/twinoid/0/1/d9869944_14716.jpg)!important;height:42px'>";
    contenttxt+="        <div class='talks'>";
    contenttxt+="            <div class='triangleright'></div>";
    contenttxt+="            <span class='buddy'> Sunsky :</span>";
    contenttxt+="            <p>Voici le test Ã  fournir Ã  vos coÃ©quipiers pour partager votre AstroPad : </p>";
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
    contenttxt+="    **Je vous propose l'AstroPad pour l'inventaire**<br/>";
    contenttxt+="Il s'agit d'un script qui fonctionne avec Firefox et Chrome :<br/>";
    contenttxt+=" - Sur firefox, installer GreaseMonkey<br/>"
    contenttxt+="//https://addons.mozilla.org/fr/firefox/addon/greasemonkey//<br/>";
    contenttxt+=" - Sur Chrome, installer TamperMonkey<br/>"
    contenttxt+="//https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=fr//<br/>";
    contenttxt+="Â <br/>";
    contenttxt+="Aller ensuite sur le lien suivant pour installer le script<br/>";
    contenttxt+="//http://astropad.sunsky.fr/astropad.user.js//<br/>";
    contenttxt+="Â <br/>";
    contenttxt+="Aller ensuite sur le lien suivant pour rejoindre l'inventaire de cette partie :<br/>";
    contenttxt+="//<a href='"+url1+"'>"+url1+"</a>//<br/>Â <br/>Merci de votre attention.";
    contenttxt+="            </p><div class='clear'></div>";
    contenttxt+="        </div>";
    contenttxt+="    </div>";
    contenttxt+="</div>";
    
    /*contenttxt+="<div class='cdMushLog  cdChatLine'>";
    contenttxt+="    <div class='bubble bubble2 tid_editorContent'>";
    contenttxt+="        <img src='/img/design/pixel.gif' class='char' style='background:url(http://imgup.motion-twin.com/twinoid/0/1/d9869944_14716.jpg)!important;height:42px'>";
    contenttxt+="        <div class='talks'>";
    contenttxt+="            <div class='triangleright'></div>";
    contenttxt+="            <span class='buddy'> Sunsky :</span>";
    contenttxt+="            <p>Voici l'inventaire en format texte : <a class='butmini' href='#' id='astro_get_inventaire_txt' ><img src='/img/icons/ui/awake.png'>Lister</a></p>";
    contenttxt+="            <div class='clear'></div>";
    contenttxt+="        </div>";
    contenttxt+="    </div>";
    contenttxt+="</div>";
    */
    
    
    
    fill_astrotab(contenttxt);
    
    //$('#astro_get_inventaire_txt').bind('click', astro_get_inventaire_txt);
}

function astro_view_inventaire() {
    var gid=localStorage['ASTROPAD_gid'];
    var gkey=localStorage['ASTROPAD_gkey'];
    var rkey=localStorage['ASTROPAD_rkey'];
    if (!rkey) rkey=gkey;
    
    url2="http://astropad.sunsky.fr/?gid="+gid+"&rkey="+rkey;
    window.open(url2,'_blank');
    
    //fill_astrotab(url2);
    
}
function astro_get_inventaire() {
    var url=url_asto+"/getItems";
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
                
                localStorage['ASTROPAD_rkey']=rkey;
                for(var j=1;j<rooms_size;j++) {
                    items=rooms[j].split('\n');
                    items_size=items.length;
                    roomid=parseInt(items[0]);
                    contenttxt+="<div class='astro_rid_"+roomid+"' id='astro_rid_"+roomid+"'><b>"+ROOMNAMES[roomid]+"</b></div>";
                    if (items_size>2) 
                        contenttxt+="<div class='what_happened'><table class='table' >";
                    for(var i=1;i<items_size-1;i++) {
                        parts=items[i].split('|');
                        iname=parts[0];
                        iid=parts[1];
                        date=parts[6];
                        heroid=parts[7];
                        iname=capitalize(iname);//.charAt(0).toUpperCase() + iname.slice(1);
                        footer="par "+capitalize(HERONAMES[heroid])+"<br>le "+date.substring(6,8)+" Ã  "+date.substring(8,10)+":"+date.substring(10,12);
                        if (iid=="empty") {
                            contenttxt+="<tr  ><td style='width:35px;height:35px;border-spacing: 0;padding: 0;'>Vide</td><td style='text-align:left;border-spacing: 0;padding: 0;'></td>";
                            contenttxt+="<td style='font-size:10px;text-align:right;vertical-align:bottom;width:75px'>"+footer+'</td></tr>';
                            continue;
                        }
                        iimg="<img src='http://mush.twinoid.com/img/icons/items/"+iid+".jpg' height=35 width=35;"
                        
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
                            idetail = idetail.replace(/ satiÃ©tÃ©/g,"<img src='\/img\/icons\/ui\/pa_cook.png' alt='satiÃ©tÃ©' title='SatiÃ©tÃ©'\/>");
                            idetail = idetail.replace(/ :pa_cook:/g,"<img src='\/img\/icons\/ui\/pa_cook.png' alt='satiÃ©tÃ©' title='SatiÃ©tÃ©'\/>");
                            idetail = idetail.replace(/:plant_thirsty:/g,"<img src='\/img\/icons\/ui\/plant_thirsty.png' alt='soif' title='Soif'\/>");
                            idetail = idetail.replace(/:plant_dry:/g,"<img src='\/img\/icons\/ui\/plant_dry.png' alt='dessÃ©chÃ©' title='DesÃ©chÃ©'\/>");
                            idetail = idetail.replace(/:plant_thirsty:/g,"<img src='\/img\/icons\/ui\/plant_thirsty.png' alt='Malade' title='Malade'\/>");
                            idetail = idetail.replace(/GuÃ©rie/g,"<img src='\/img\/icons\/ui\/pa_heal.png' alt='heal' \/>");
                            idetail = idetail.replace(/ charges/g,"<img src='\/img\/icons\/ui\/charge.png' alt='charge' \/>");
                            
                            idetail = idetail.replace(/ImpÃ©rissable, /g,"");
                            idetail = idetail.replace(/, ImpÃ©rissable/g,"");
                            idetail = idetail.replace(/Cuisinable, /g,"");
                            idetail = idetail.replace(/Effets : /g,"");
                            idetail=" : <i>"+idetail+"</i>";
                        }
                        if (inb!="1")
                            inb=" (x"+inb+")";
                        else
                            inb="";
                            
                        contenttxt+="<tr  ><td style='width:35px;height:35px;border-spacing: 0;padding: 0;'>"+iimg+"</td><td style='text-align:left;border-spacing: 0;padding: 0;'><b>"+iname+inb+"</b>"+idetail+"</td>";
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
    var url=url_asto+"/getItems";
    var text ="";
    var data=getDataForAstroPad();
    
    text=url+'?'+data;
    console.log(text);
    setTimeout(function() {
        GM_xmlhttpRequest({
            method: 'GET',url: url+"?"+data,
            onload: function(responseDetails) {
                res=responseDetails.responseText
                contenttxt="**//INVENTAIRE//**\n";
                rooms=res.split('#');
                rooms_size=rooms.length;
                rkey=rooms[0];
                localStorage['ASTROPAD_rkey']=rkey;
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
                        iname=capitalize(iname);//.charAt(0).toUpperCase() + iname.slice(1);
                        if (i==1) contenttxt+=" //par "+capitalize(HERONAMES[heroid])+" le "+date.substring(6,8)+" Ã  "+date.substring(8,10)+":"+date.substring(10,12)+"//\n";
                        if (iid=="empty") {
                            contenttxt+="- vide\n";
                            continue;
                        }
                        inb=parts[2];
                        idetail=parts[4];
                        
                        if (idetail) {
                            idetail = idetail.replace(/satiÃ©tÃ©/g,":pa_cook:");
                            idetail = idetail.replace(/GuÃ©rie/g,":pa_heal:");
                            idetail = idetail.replace(/ImpÃ©rissable, /g,"");
                            idetail = idetail.replace(/, ImpÃ©rissable/g,"");
                            idetail = idetail.replace(/Cuisinable, /g,"");
                            idetail = idetail.replace(/Effets : /g,"");
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
                //alert(contenttxt);
                /*
                'color':'black',
        
        'min-width':'200px',
        'min-height':'50px',
        'resize':'both',
        'width':localStorage['MAS_width'],
        'height':localStorage['MAS_height'],
        */
                fill_astrotab("<textarea style='font-size:8pt;color:black;width:100%;height:100%'>"+contenttxt+"</textarea>");//,"#astro_rid_"+getRoomIdForAstroPad());
            }
        });
    }, 0);
}

function fill_astrotab(content,gotoelemid) {
    gid=localStorage['ASTROPAD_gid'];
    var tab = $("#astrotab_content").empty();
    var header="<div class='objtitle'><img src='/img/icons/ui/pa_comp.png'> AstroPad (nÂ°"+gid+") <img src='/img/icons/ui/pa_comp.png'></div> &nbsp;<div class='replybuttons'>";
    header+=" <a class='butmini' href='#' id='astro_maj_inventaire' ><img src='/img/icons/ui/projects_done.png'>Synchroniser</a>";
    header+=" <a class='butmini' href='#' id='astro_get_inventaire' ><img src='http://twinoid.com/img/icons/refresh.png' title='Raffraichir'></a>";
    header+=" <a class='butmini' href='#' id='astro_get_inventaire_txt' ><img src='http://www.twinpedia.com/_media/hordes/objets/item_rp_manual.gif' title='Listing format texte'></a>";
    header+=" <a class='butmini' href='#' id='astro_view_inventaire' ><img src='http://www.hordes.fr/gfx/forum/smiley/h_exploration.gif'>Visualiser</a>";
    header+=" <a class='butmini' href='#' id='astro_configuration' ><img src='/img/icons/ui/guide.png'>Aide</a>";
    header+=" <a class='butmini' href='#' id='astro_reset' ><img src='/img/icons/ui/close.png'>Quitter</a>";
    //header+=" <a class='butmini' href='#' id='astro_test' ><img src='http://www.hordes.fr/img/icons/r_beta.gif'></a>";
    header+="</div>";
    $("<div>").html(header+"<br><div id='astro_scrollpanel' class='astro_scrollpanel' style='overflow:scroll;overflow-y;hidden;overflow : -moz-scrollbars-vertical;;height:400px'>"+content+"</div>").css("color", "rgb(9, 10, 97)").appendTo(tab);
    $('#astro_get_inventaire').bind('click', astro_get_inventaire);
    $('#astro_get_inventaire_txt').bind('click', astro_get_inventaire_txt);
    $('#astro_view_inventaire').bind('click', astro_view_inventaire);
    $('#astro_maj_inventaire').bind('click', astro_maj_inventaire);
    $('#astro_configuration').bind('click', astro_configuration);
    $('#astro_reset').bind('click', astro_reset);
    $('#astro_test').bind('click', astro_test);
    
    if (gotoelemid){
    	scroll=$("#astro_scrollpanel");
    	room=$(gotoelemid);
    	//room=$("#astro_maj_inventaire");
    	room.css("display","block");
    	if (room.offset())
    		scroll.scrollTop(scroll.scrollTop() + room.offset().top-scroll.offset().top);
    }
}

function unserialize(buffer,valueName) {
    //var new haxe.Unserializer(buffer).unserialize();
    //var data = unsafeWindow.haxe.Unserializer.run(buffer);
    //return data[valueName];
    return buffer;
}

function startScript() {
    pattern1=/astroId=([0123456789]*)/g
    pattern2=/astroKey=([0123456789abcdef]*)/g
    gid=pattern1.exec(window.location.href);
    gkey=pattern2.exec(window.location.href);
    
    if (gid && gkey) {
        gid=gid[1];
        gkey=gkey[1];
        if (confirm("Voulez-vous lier l'AstroPad Ã  la partie "+gid+"\ndont la clÃ© est "+gkey+" ?")) {
            localStorage['ASTROPAD_gid']=gid;
            localStorage['ASTROPAD_gkey']=gkey;
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
}

window.addEventListener('load', startScript, false);
