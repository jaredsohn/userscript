// ==UserScript==
// @name        iMuzgo+
// @author      LEMULOT <mulotmail@gmail.com>
// @version     1.052
// @include     http://apps.facebook.com/i-muzgo/*
/*
**  Cree pour l'aliance GTM
**  Merci de ne pas plagier ni voler ce script
*/
// ==/UserScript==


/*
**  TODO
**
** Arrosage 'auto' en fonction de la hauteur de barre
** k auto
*/

(function()
{
GM_registerMenuCommand("Imuzgo+ config", configureScript);
const VERSION=1.052

var alli_mbrs = [1581378041,734553185,1160687288,799507507,794464840,812243292,1547178677,656375697,100000061025434,1747235237,1812885526,583690186,1478212160,1095541731,1046971533,
                699539783,1568881218,1534809389,1068751589,1403690653,1582327000,1604664436,1477496355,1534906742,1213204797,1231000035,1036067900,1122006746,1179885716,778091114,
                1323364169,1151988682,1294820009,1385093633,576322875,1604415743,1706885955,1450906336,1218280042,585994834,1485303119,1448955834,1320370896,1848194553,644364164,
                1660820568,675198820,764123485,1801192881,1442230391,1351143660,1556821867,1076796193,678070710,612279375,639299207,1196225101,1450159096,1141928440,604626228];

/*=========================================================*/ 
    function setGMArray(array, key){
        for (i=0; i<array.length; i++){
            GM_setValue(key+i , array[i]);
        }
    };
   
    function countGMArray(key){ // utility function{
        var dummy;
        var j=0; 
        while(dummy = GM_getValue(key+j)){
            j++;
        }
        return j;
    };
        
    function getGMArray(key){
        var extracted = [];
        var k=0;
        var count = countGMArray(key);
        for(k;k<count;k++){
            extracted[k] = GM_getValue(key+k);
        }
        return extracted;
    };
/*========================================================*/
    function html_insert_it(doc, element, id, new_html) {
        var new_element;
        new_element = doc.createElement("DIV");
        new_element.id = id;
        new_element.innerHTML = new_html;
        element.parentNode.insertBefore(new_element, element);
    };
   /*   ^
   **   |--- before after en fonction dune variable !
   */
    function configureScript(e){
        function removeDiv(){
            //GM_log("removeDiv ok");
            div = document.getElementById("conf_box");
            div.parentNode.removeChild(div);
        };
        
        function save_config(){
            //GM_log("save_mzg: "+mzg);
            for(var i=0;i<10;i++){
                mzg[i] = document.getElementById("muzgo"+i).value;
                //GM_log("muzgo"+i+" | "+document.getElementById("muzgo"+i).value)
            };
            //GM_log("save_mzg: "+mzg);
            setGMArray(mzg, 'imuzgo');
            k[0] = document.getElementById("k0").value;
            k[1] = document.getElementById("k1").value;
            setGMArray(k, 'k');
            removeDiv();
        };
        
        if (!document.getElementById("conf_box")){
            var mzg = getGMArray('imuzgo');
            var k = getGMArray('k');
            html_insert_it(window.document, document.getElementById('app51612744833_content'), "conf_box",'<table style="margin: 0px 10px 10px; background-image:url(&quot;http://91.121.136.191/iMuzgo/images/bar_ok_f.jpg&quot;);"><tr><td><img src="http://91.121.136.191/iMuzgo/images/bar_ok_t.jpg" style="display: block;" /></td></tr><tr><td style="padding: 0px 10px; background-image:url(&quot;http://91.121.136.191/iMuzgo/images/bar_ok_m.jpg&quot;); height: 17px; background-repeat: no-repeat; color: #76a860;">'+
           "<table border='0' width='100%' cellpadding='3' cellspacing='3' align='center'><tr>"+
            "<td colspan='2'>Votre version est: <b>"+VERSION+"</b></td></tr><tr>"+
            "<td colspan='2'>Inscriver les ids de vos muzgos. Metter 0 pour ceux que vous n'avez pas.</td></tr><tr>"+
            "<td>Muzgo 1: <input type='text' id='muzgo0' value='"+mzg[0]+"'></td>"+
            "<td>Muzgo 2: <input type='text' id='muzgo1' value='"+mzg[1]+"'></td></tr><tr>"+
            "<td>Muzgo 3: <input type='text' id='muzgo2' value='"+mzg[2]+"'></td>"+
            "<td>Muzgo 4: <input type='text' id='muzgo3' value='"+mzg[3]+"'></td></tr><tr>"+
            "<td>Muzgo 5: <input type='text' id='muzgo4' value='"+mzg[4]+"'></td>"+
            "<td>Muzgo 6: <input type='text' id='muzgo5' value='"+mzg[5]+"'></td></tr><tr>"+
            "<td>Muzgo 7: <input type='text' id='muzgo6' value='"+mzg[6]+"'></td>"+
            "<td>Muzgo 8: <input type='text' id='muzgo7' value='"+mzg[7]+"'></td></tr><tr>"+
            "<td>Muzgo 9: <input type='text' id='muzgo8' value='"+mzg[8]+"'></td>"+
            "<td>Muzgo 10: <input type='text' id='muzgo9' value='"+mzg[9]+"'></td></tr><tr>"+
            "<td colspan='2'></td></tr><tr>"+
            "<td colspan='2'>configuration facultative. Utile pour plus tard :p</td></tr><tr>"+
            "<td>k_user: <input type='text' id='k0' value='"+k[0]+"'></td>"+
            "<td>k_sercret: <input type='text' id='k1' value='"+k[1]+"'></td></tr><tr>"+
            "<td><input type='button' value='Valider' id='save_mzg'></td>"+
            "<td><input type='button' value='Annuler' id='removeDiv'></td></tr></table>"+
            '</td></tr><tr><td><img src="http://91.121.136.191/iMuzgo/images/bar_ok_b.jpg" style="display: block;" /></td></tr></table>');
            document.getElementById("save_mzg").addEventListener("click", save_config, false);
            document.getElementById("removeDiv").addEventListener("click", removeDiv, false);
            }
    };

    function food_n_wash(){  
        var imuzgo = getGMArray('imuzgo');
        var ok = 0;
        for(var i=0; i < imuzgo.length; i++)
            {
            var current_muzgo = imuzgo[i];
            if (current_muzgo != "0"){
                GM_xmlhttpRequest({ 
                    method: 'GET', 
                    headers: {
                        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                        'Accept': 'application/atom+xml,application/xml,text/xml',
                            },
                    url: 'http://apps.facebook.com/i-muzgo/index.php?current=enclos&food='+current_muzgo,
                    onload: function (responseDetails){
                        ok = ok + 1;
                    }
                    });
                }
            }
            if (document.getElementById('inp_prom').checked){
                for(var i=0; i < imuzgo.length; i++){
                    var current_muzgo = imuzgo[i];
                    if (current_muzgo != "0"){
                        GM_xmlhttpRequest({ 
                            method: 'GET', 
                            headers: {
                                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                                'Accept': 'application/atom+xml,application/xml,text/xml',
                                    },
                            url: 'http://apps.facebook.com/i-muzgo/index.php?current=run&id='+current_muzgo,
                            onload: function (responseDetails){
                                ok = ok + 1;
                            }
                            });
                        }
                    }
                }
            for(var i=0; i < imuzgo.length; i++){
                var current_muzgo = imuzgo[i];
                if (current_muzgo != "0"){
                    GM_xmlhttpRequest({ 
                        method: 'GET', 
                        headers: {
                            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                            'Accept': 'application/atom+xml,application/xml,text/xml',
                                },
                        url: 'http://apps.facebook.com/i-muzgo/index.php?current=enclos&wash='+current_muzgo,
                        onload: function (responseDetails){
                            ok = ok + 1;
                        }
                        });
                    }
                }
        GM_log("ok :"+ok);
        alert("Muzgos nourris,laves et promenes");
        location.reload();
        };
        

       
var page = "";
page = document.location;
/*
**  Mettre une box de confirmation sur le EventListener
*/  
if (page == "http://apps.facebook.com/i-muzgo/index.php?current=enclos"){
        var k = getGMArray('k')
        if (!k[0]){ // !k[0]
            var pleinsdek = document.getElementById('app51612744833_content').innerHTML;
            pos1 = pleinsdek.indexOf("k_user=");
            pos2 = pleinsdek.indexOf("&", pos1);
            k[0] = pleinsdek.substring((pos1+7), pos2);
            GM_log("k_user: "+k[0]);
            k[1] = pleinsdek.substring((pos2+14), (pos2+64));
            GM_log("k_secret: "+k[1]);
            setGMArray(k, 'k');
        }
        html_insert_it(window.document,document.getElementById('app51612744833_content'),'food_n_wash','<table style="margin: 0px 10px 10px; background-image:url(&quot;http://91.121.136.191/iMuzgo/images/bar_ok_f.jpg&quot;);"><tr><td><img src="http://91.121.136.191/iMuzgo/images/bar_ok_t.jpg" style="display: block;" /></td></tr><tr><td style="padding: 0px 10px; background-image:url(&quot;http://91.121.136.191/iMuzgo/images/bar_ok_m.jpg&quot;); height: 17px; background-repeat: no-repeat; color: #76a860;">'+
        '<table border="0" width="100%" cellpadding="3" cellspacing="3" align="center"><tr><td>'+
        '<a href="#" id="nfp">Nourrir, nettoyer et promener  tout mes Muzgos</a></td></tr><td>'+
        '<input type="checkbox" checked="checked" id="inp_prom"> Promenade</td></tr></table>'+
        '</td></tr><tr><td><img src="http://91.121.136.191/iMuzgo/images/bar_ok_b.jpg" style="display: block;" /></td></tr></table>'); 
        document.getElementById('nfp').addEventListener("click", food_n_wash, false);
     }
if (page == "http://apps.facebook.com/i-muzgo/index.php?current=home" || page == "http://apps.facebook.com/i-muzgo/"){
        var update = new function(){
        var check = GM_getValue('checked');
            GM_log("check: "+check);
            if (!check || (new Date().getTime() - parseInt(check, 10) > 86400000)){//86400000ms = 1 jours
                GM_log("check version");
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: 'http://userscripts.org/scripts/source/56488.user.js',
                    headers: {
                        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                    },
                    onload: function(responseDetails) {
                        var version=/@version\s+(\d+\.\d+)/i.exec(responseDetails.responseText);
                        if (parseFloat(version[1])>VERSION){
                            GM_log("La version "+version[1]+" de iMuzgo+ est <a href='http://userscripts.org/scripts/show/56488'>disponible</a>")
                            html_insert_it(window.document,document.getElementById('app51612744833_content'),'update','<table style="margin: 0px 10px 10px; background-image:url(&quot;http://91.121.136.191/iMuzgo/images/bar_ok_f.jpg&quot;);"><tr><td><img src="http://91.121.136.191/iMuzgo/images/bar_ok_t.jpg" style="display: block;" /></td></tr><tr><td style="padding: 0px 10px; background-image:url(&quot;http://91.121.136.191/iMuzgo/images/bar_ok_m.jpg&quot;); height: 17px; background-repeat: no-repeat; color: #76a860;">'+
                            'La version <b>'+version[1]+'</b> de iMuzgo+ est <a href="http://userscripts.org/scripts/show/56488">disponible</a>, cliquer <a href="http://userscripts.org/scripts/source/56488.user.js">ici pour l\'installer</a>'+
                            '</td></tr><tr><td><img src="http://91.121.136.191/iMuzgo/images/bar_ok_b.jpg" style="display: block;" /></td></tr></table>'); 
                        }                        
                    },
                    onerror: function(){
                            GM_log("erreur GM_xmlhttpRequest")
                        }
                });
                GM_setValue('checked', new Date().getTime() + '');
            }
        };
        html_insert_it(window.document,document.getElementById('app51612744833_content'),'forum','<table style="margin: 0px 10px 10px; background-image:url(&quot;http://91.121.136.191/iMuzgo/images/bar_ok_f.jpg&quot;);"><tr><td><img src="http://91.121.136.191/iMuzgo/images/bar_ok_t.jpg" style="display: block;" /></td></tr><tr><td style="padding: 0px 10px; background-image:url(&quot;http://91.121.136.191/iMuzgo/images/bar_ok_m.jpg&quot;); height: 17px; background-repeat: no-repeat; color: #76a860;">'+
        '<a href="http://apps.facebook.com/i-muzgo/index.php?current=forum_team">Forum de l\'Alliance</a></td></tr>'+
        '<tr><td style="padding: 0px 10px; background-image:url(&quot;http://91.121.136.191/iMuzgo/images/bar_ok_m.jpg&quot;); height: 17px; background-repeat: no-repeat; color: #76a860;">'+
        '<a href="http://www.facebook.com/topic.php?app_id=51612744833&xid=imuzgo_team_5&c_url=http%253A%252F%252Fapps.facebook.com%252Fi-muzgo%252Findex.php%253Fcurrent%253Dforum_team&r_url=http%253A%252F%252Fapps.facebook.com%252Fi-muzgo%252Findex.php%253Fcurrent%253Dview_team%2526id%253D5&sig=d86075d9bd3e1324f7e0a4f009dee0ac&topic=487">Topic d\'iMuzgo+</a> N\'hesite pas a dire ce qu\'il ne va pas ainsi que vos idee d\'amelioration !'+
        '</td></tr><tr><td><img src="http://91.121.136.191/iMuzgo/images/bar_ok_b.jpg" style="display: block;" /></td></tr></table>'); 
    }
if (page == "http://apps.facebook.com/i-muzgo/index.php?current=mail"){
        function alli_msg(){
            function envoi_alli_msg(){
                var k = getGMArray('k');
                GM_log("verif k: "+k[0]+" et "+k[1]);
                var dest = "";
                for (i=0; i < alli_mbrs.length; i++){
                    dest += "&dest_"+alli_mbrs[i]+"="+alli_mbrs[i];
                }
                var sujet = "[GTM]"+escape(document.getElementById('sujet').value);
                var text = escape(document.getElementById('text').value);
                GM_log("avant envoi: sujet->"+sujet+" text->"+text+" dest->"+dest);
                if (sujet && text){
                    GM_xmlhttpRequest({ 
                        method: 'POST', 
                        headers: {
                            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                            'Accept': 'application/atom+xml,application/xml,text/xml',
                            'content-Type' : 'application/x-www-form-urlencoded',
                                },
                        url: 'http://91.121.136.191/iMuzgo/messagerie_new_message.php?k_user='+k[0]+'&k_secret='+k[1]+'&k_lang=fr',
                        data: "word=&sujet="+sujet+"&message="+text+dest,
                        onload: function (responseDetails){
                            alert('message envoye !');
                            Location.reload();
                        }
                        });
                    }
                    else{
                        alert("message vide ...");
                    }
            };

            if (!document.getElementById("alli_msg_text")){
                document.getElementById("b_alli_msg").disabled=true;
                html_insert_it(window.document,document.getElementById('b_alli_msg'),'alli_msg_text','<table><tr>'+
                '<td>Sujet: <input type="input" id="sujet"></td></tr><tr>'+
                '<td>Texte: <textarea cols=100 rows=10 id="text"></textarea></td></tr><tr>'+
                '<td><input type="button" value="envoyer" id="envoi_alli_msg"></td></tr></table>');
                document.getElementById("envoi_alli_msg").addEventListener("click", envoi_alli_msg, false);
            }
            else{
                div = document.getElementById("alli_msg_text");
                div.parentNode.removeChild(div);
            }
        };
        var k = getGMArray('k');
        if (k[0] == 2507 || k[0] == 9){
            html_insert_it(window.document,document.getElementById('app51612744833_content'),'alli_msg','<table style="margin: 0px 10px 10px; background-image:url(&quot;http://91.121.136.191/iMuzgo/images/bar_ok_f.jpg&quot;);"><tr><td><img src="http://91.121.136.191/iMuzgo/images/bar_ok_t.jpg" style="display: block;" /></td></tr><tr><td style="padding: 0px 10px; background-image:url(&quot;http://91.121.136.191/iMuzgo/images/bar_ok_m.jpg&quot;); height: 17px; background-repeat: no-repeat; color: #76a860;">'+
            '<input type="button" value="Envoyer un message a toute la GTM" id="b_alli_msg">'+
            '</td></tr><tr><td><img src="http://91.121.136.191/iMuzgo/images/bar_ok_b.jpg" style="display: block;" /></td></tr></table>');
            document.getElementById("b_alli_msg").addEventListener("click", alli_msg, false);
        }
    }
})();