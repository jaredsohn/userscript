// ==UserScript==
// @name        OGFirmasIlegales
// @namespace   http://www.userscripts.org
// @description Marcador de Firmas Ilegales para OGame.com.es.
// @version     1.4
// @date        2010-02-23
// @include     http://board.ogame.*
// @author      HuMoR 
// @Mod.		Kastey
// ==/UserScript==

// Historial de cambios
// 18/08/09
// -Fix: Arreglado el problema de cache de Mozilla que no ponÃ­a los bordes correspondientes
// a la imagen.

// 05/09/09
// -Fix: Modificado el tag id que traÃ­a algunos problemas, aunque sigue fallando con ciertos dominios.
// -Fix: Ahora marca las firmas en los MP.

// 08/09/09
// -ReconstrucciÃ³n total del cÃ³digo.
// -Added: EnvÃ­o de MP al usuario infractor.
// -Added: Posteo en el hilo correspondiente de Firmas.

//09/09/09
// -Fix: ImportantÃ­simo fix en la expresiÃ³n regular para la firma.
// -Added: License Creative Commons.

//12/09/09
// -Fix: Quitado el ? que aparecÃ­a en la firma al reportar.
// -Fix: Link al perfil de usuario arreglado.

function searchIlegalSign (){

function sendMP(MP,user) {
var url = 'http://board.ogame.com.es/index.php?form=PMNew';
        http = new XMLHttpRequest();
        http.open("GET",url,true);
        http.setRequestHeader('Host','board.ogame.com.es');
        http.setRequestHeader('User-agent','Mozilla/4.0 (compatible) Greasemonkey');
        http.setRequestHeader('Accept','application/atom+xml,application/xml,text/xml,text/html');
        http.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        var resp = this.responseText;
                        idHash = resp.split('idHash" value="',-1);
                        idHash= idHash[1].split('" />',1);
                        session = resp.split('"s" value="',-1);
                        session = session[1].split('" />',1);
                        makePost(idHash,session,user);  
                    }
                }
        }
        http.send('');  
        function makePost (idHash,session,user) {
        var url = 'http://board.ogame.com.es/index.php?form=PMNew';
        var boundary = (new Date).getTime();
        var sep = String("---------------------------");
        var sep2 = String("--");
        var post = sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="recipients"\n\n';
        post += user;
        post += '\n' + sep + sep2 + boundary + '\n';      
        post += 'Content-Disposition: form-data; name="blindCopies"\n\n';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="subject"\n\n';
        post += 'Firma Ilegal';
        post += '\n' + sep + sep2 + boundary + '\n';        
        post += 'Content-Disposition: form-data; name="text"\n\n';
        post += MP;
        post += '\n' + sep + sep2 + boundary + '\n';        
        post += 'Content-Disposition: form-data; name="mce_editor_0_fontNameSelect"\n\n';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="mce_editor_0_fontSizeSelect"\n\n';
        post += '0';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="wysiwygEditorHeight"\n\n';
        post += '241';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="wysiwygEditorMode"\n\n';
        post += '1';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="parseURL"\n\n';
        post += '1';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="enableSmilies"\n\n';
        post += '1';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="enableBBCodes"\n\n';
        post += '1';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="showSignature"\n\n';
        post += '1';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="upload[]"; filename=""\n';
        post += 'Content-Type: application/octet-stream\n\n';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="activeTab"\n\n';
        post += 'smiles';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="send"\n\n';
        post += 'Enviar';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="pmID"\n\n';
        post += '0';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="forwarding"\n\n';
        post += '0';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="reply"\n\n';
        post += '0';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="replyToAll"\n\n';
        post += '0';
        if (session != 'Enviar') {
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="s"\n\n';
        post += session;
        }
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="idHash"\n\n';
        post += idHash;
        post += '\n' + sep + sep2 + boundary + sep2;
        var http = new XMLHttpRequest();
        http.open("POST",url,true);
        http.setRequestHeader('Host','board.ogame.com.es');
        http.setRequestHeader('User-agent', 'Mozilla/5.0 (Windows; U; Windows NT 5.1; es-ES; rv:1.9.1.2) Gecko/20090729 Firefox/3.5.2 (.NET CLR 3.5.30729)');
        http.setRequestHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8');
        http.setRequestHeader('Accept-Language','es,es-es;q=0.8,en-us;q=0.5,en;q=0.3');
        http.setRequestHeader('Accept-Encoding','gzip,deflate');
        http.setRequestHeader('Accept-Charset','ISO-8859-1,utf-8;q=0.7,*;q=0.7'); 
        http.setRequestHeader('Keep-Alive','300');
        http.setRequestHeader('Connection','keep-alive');
        http.setRequestHeader('Cookie',document.cookie);
        http.setRequestHeader('Content-type', 'multipart/form-data; boundary=' + sep + boundary);
        http.setRequestHeader('Content-length', post.length);
        http.send(post);
        http.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 302) {
                        alert('Mp Enviado');
                    }
                    if (this.status != 200) {
                        alert("AddPost GMScript: Error " + this.status + " cargando " + url);
                    }
                    else {
                        alert('Mp Enviado');
                    }
                }
        }    
       }
}


function addPost(MP,postit) {  
    var url = 'http://board.ogame.com.es/index.php?form=PostAdd&threadID=1089094';
    http = new XMLHttpRequest();
    http.open("GET",url,true);
    http.setRequestHeader('Host','board.ogame.com.es');
    http.setRequestHeader('User-agent','Mozilla/4.0 (compatible) Greasemonkey');
    http.setRequestHeader('Accept','application/atom+xml,application/xml,text/xml,text/html');
    http.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        var resp = this.responseText;
                        idHash = resp.split('idHash" value="',-1);
                        idHash= idHash[1].split('" />',1);
                        session = resp.split('"s" value="',-1);
                        session = session[1].split('" />',1);
                        makePost(idHash,session);  
                    }
                }
        }
    http.send('');  
    function makePost (idHash,session) {
        var boundary = (new Date).getTime();
        var sep = String("---------------------------");
        var sep2 = String("--");
        var post = sep + boundary + '\n';
        post += 'Content-Disposition: form-data; name="subject"\n\n';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="text"\n\n';
        post += postit;
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="mce_editor_0_fontNameSelect"\n\n';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="mce_editor_0_fontSizeSelect"\n\n';
        post += '0';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="wysiwygEditorHeight"\n\n';
        post += '241';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="wysiwygEditorMode"\n\n';
        post += '1';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="parseURL"\n\n';
        post += '1';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="enableSmilies"\n\n';
        post += '1';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="enableBBCodes"\n\n';
        post += '1';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="showSignature"\n\n';
        post += '1';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="subscription"\n\n';
        post += '1';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="upload[]"; filename=""\n';
        post += 'Content-Type: application/octet-stream\n\n';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="pollQuestion"\n\n';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="pollOptions"\n\n';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="endTimeDay"\n\n';
        post += '0';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="endTimeMonth"\n\n';
        post += '0';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="endTimeYear"\n\n';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="endTimeHour"\n\n';
        post += '0';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="endTimeMinutes"\n\n';
        post += '0';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="choiceCount"\n\n';
        post += '1';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="activeTab"\n\n';
        post += 'smilies';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="send"\n\n';
        post += 'Enviar';
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="postID"\n\n';
        post += '0';
        if (session != 'Enviar') {  
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="s"\n\n';
        post += session;
        }
        post += '\n' + sep + sep2 + boundary + '\n';
        post += 'Content-Disposition: form-data; name="idHash"\n\n';
        post += idHash;
        post += '\n' + sep + sep2 + boundary + sep2;
        var http = new XMLHttpRequest();
        http.open("POST",url,true);
        http.setRequestHeader('Host','board.ogame.com.es');
        http.setRequestHeader('User-agent', 'Mozilla/5.0 (Windows; U; Windows NT 5.1; es-ES; rv:1.9.1.2) Gecko/20090729 Firefox/3.5.2 (.NET CLR 3.5.30729)');
        http.setRequestHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8');
        http.setRequestHeader('Accept-Language','es,es-es;q=0.8,en-us;q=0.5,en;q=0.3');
        http.setRequestHeader('Accept-Encoding','gzip,deflate');
        http.setRequestHeader('Accept-Charset','ISO-8859-1,utf-8;q=0.7,*;q=0.7'); 
        http.setRequestHeader('Keep-Alive','300');
        http.setRequestHeader('Connection','keep-alive');
        http.setRequestHeader('Cookie',document.cookie);
        http.setRequestHeader('Content-type', 'multipart/form-data; boundary=' + sep + boundary);
        http.setRequestHeader('Content-length', post.length);
        http.send(post);
        http.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 302) {
                        alert('El post ha sido exitoso');
                    }
                    if (this.status != 200) {
                        alert("AddPost GMScript: Error " + this.status + " cargando " + url);
                    }
                    else {
                        alert('Post Publicado');
                    }
                }
        }    
    }
}

function sendMPAndPost(i,link) {
    //regex de usuario e ID
    var regex3 = '.*/user/(.*)" title="Ver perfil de  Â»(.*)Â«".*'; 
    //usuarios
    var posters = document.getElementsByClassName('messageInner messageFramedLeft dividers container-3'); 
    //panel izquierdo
    var panel = posters[i].childNodes[3]; 
    var user = panel.getElementsByClassName('userName')[0].innerHTML.match(regex3)[2];
    var motivo = prompt("Â¿Por quÃ© motivo reportas la firma de " + user + "?\nEl motivo que ingreses abajo serÃ¡ enviado al MP del usuario.\nPara no reportar la firma, haz click en cancelar","Sobrepasa las medidas mÃ¡ximas: 450px. x 150px. Peso: 35KB's"); 
    if (motivo) {
    //usuario
    var yo = document.getElementById('userNote').innerHTML.match('.*Registrado como  <a href=".*">(.*)</a>.*')[1]; 
    //panel derecho e inferior
    var panel2 = posters[i].childNodes[5]; 
    //regex de imÃ¡genes
    var regex2 = '.*<img( style="border: 15px solid (yellow|red|cyan);")? src="(.*)\?ogfi=.*" class="resizeImage".*';
    var sign = panel2.getElementsByClassName('signature')[0].innerHTML.match(regex2)[3];
    sign = sign.replace("\?","");
    var userID = panel.getElementsByClassName('userName')[0].innerHTML.match(regex3)[1];
    var MP = 'Hola, ' + user + '. Este MP es para notificarte de que tu firma es ilegal.\n';
    MP += 'Motivo: ' + motivo + '\n';
    MP += 'Tienes 48 horas para modificarla antes de que lo haga un miembro del team.\n';
    MP += 'Gracias.\n';
    MP += 'Atte. ' + yo + '.';
    var postit = '[u]User[/u]: [url=http://board.ogame.com.es/user/' + userID + ']' + user + '[/url]\n';
    postit += '[u]Motivo[/u]: ' + motivo + '.\n';
    postit += '[u]Link[/u]: http://board.ogame.com.es/' + link + '#post' + link + '\n';
    postit += '[u]MP[/u]:\n';
    postit += '[quote]' + MP + '[/quote]\n\n';
    postit += '[u]Firma[/u]: [img]' + sign + '[/img]\n';
    postit += '\nReportado mediante OGFirmasIlegales v 1.3 Â©CopyRight by HuMoR - Modificado by vjrus.';
    sendMP(MP,user);
    addPost(MP,postit);
    }
}

//Escribo las funciones
var script = document.createElement("script");
script.type = "application/javascript";
script.innerHTML = sendMPAndPost;
document.body.appendChild(script);
//Fin escritura de una funciÃ¯Â¿Â½n
var script = document.createElement("script");
script.type = "application/javascript";
script.innerHTML = addPost;
document.body.appendChild(script);
//Fin escritura de una funciÃ¯Â¿Â½n
var script = document.createElement("script");
script.type = "application/javascript";
script.innerHTML = sendMP;
document.body.appendChild(script);
//Fin funciones.



//usuarios
var posters = document.getElementsByClassName('messageInner messageFramedLeft dividers container-3'); 
//regex del # post
var regex = '/*#post*'; 
//cantidad
var n = posters.length; 
//recorro todos los usuarios y para cada uno...
for (i = 0; i < n; i++) { 
    //panel derecho e inferior
    var panel2 = posters[i].childNodes[5]; 
    //Link al post
    var link = panel2.getElementsByClassName('messageCount')[0].innerHTML.match(regex)[1];
    var list = panel2.getElementsByClassName('smallButtons')[0].getElementsByTagName('ul')[0];
    var nuevo = document.createElement('li');
    nuevo.innerHTML = '<a href="#post' + link + '" onClick="sendMPAndPost(' + i + ',' + link + ');"><img src="icon/postReportS.png" alt="Reportar Firma Ilegal" /> <span>Firma Ilegal</span></a>';
    list.appendChild(nuevo, list.firstChild);
}
}
//})();

function getSizeImg(objectIMG) {
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://compactador.com.ar/FIsizeIMG.php?url=' + objectIMG.src,
    headers: {
        'User-agent': 'GreaseMonkey',
        'Accept': 'text/html',
    },
    onreadystatechange: function(resDet) {
    if (resDet.readyState == 4) {
        kb = resDet.responseText;
        wh = objectIMG.width;
        ht = objectIMG.height;
        var med,pes;
        al = new Date();
        al = al.getTime();
        if ((wh > 450) || (ht > 150)) {
            med = 1;
        }
        if (kb > 35) {
            pes = 1;    
        }        
        if ((med) && (pes)) {
            objectIMG.style.border = '15px solid cyan';
            objectIMG.src = objectIMG.src + "?ogfi=" + al + ".jpg";
        }
        else if (med) {
            objectIMG.style.border = '15px solid red';
            objectIMG.src = objectIMG.src + "?ogfi=" + al + ".jpg";
            }
            else if (pes) {
                objectIMG.style.border = '15px solid yellow';
                objectIMG.src = objectIMG.src + "?ogfi=" + al + ".jpg";
                }
    }
}
});

}

function checkSig() {
    c = document.evaluate('//img', document, null, 6, null);
    for (j=0; j < c.snapshotLength; j++) { 
        img = c.snapshotItem(j);
        path = img.src;
        board = path.substr(0, 21)
        if ((board != "http://board.ogame.co") && (board != "http://nw.gameforge.d")) {
            getSizeImg(img);
        }
    }
}
//FunciÃ¯Â¿Â½n Autoupdate de http://userscripts.org/scripts/review/25734
var GM_update = function(title, version, updateUrl, versionUrl) {
            var title = title;
            var today = new Date();
            today = today.getDate();
            var last = GM_getValue(title);
            var current;
            var answer;
            var updateUrl = updateUrl;
            var versionUrl = versionUrl;
            this.init = function() {
                if(last != undefined) {
                    if(today - last >= 3 || today - last <= -24) {
                        GM_setValue(title, today);
                        this.check();
                    }
                }
                else {
                    GM_setValue(title, today);
                    this.check();
                }
            }
            this.check = function() {
                GM_xmlhttpRequest({
                    method:"GET",
                    url:versionUrl,
                    onreadystatechange:this.finish
                });
            }
            this.finish = function(o) {
                if(o.readyState == 4) {
                    current = o.responseText;
                    current = current.split(".");
                    version = version.split(".");
                    if(version[0] < current[0]) {
                        answer = confirm("Â¿Actualizar " + title + " a su versiÃ³n " + current.join(".") + "?");
                        if(answer) { GM_openInTab(updateUrl); }
                    }
                    else if(version[1] < current[1]) {
                        answer = confirm("Â¿Actualizar " + title + " a su versiÃ³n" + current.join(".") + "?");
                        if(answer) { GM_openInTab(updateUrl); }
                    }
                    else if(version[2] < current[2]) {
                        answer = confirm("Â¿Actualizar " + title + " a su versiÃ³n " + current.join(".") + "?");
                        if(answer) { GM_openInTab(updateUrl); }
                    }
                    else {
                        // up to date
                    }
                }
            }
        //start
        this.init();
        }
GM_update('OGFirmasIlegales', '1.3', 'http://userscripts.org/scripts/source/55762.user.js', 'http://www.compactador.com.ar/OGFIversion.txt');
var loc = document.location.href;
var pattern = '.*page=(.*)&(thread|post|mp)ID.*';
var matches = loc.match(pattern);
if (matches) {
    if ((matches[1] == 'Thread') || (matches[1] == 'PMView')) {
        checkSig();
        searchIlegalSign();
    }
}