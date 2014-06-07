// ==UserScript==
// @name           JV - Split
// @namespace      Naptu
// @description    Il suffit de cliquer sur le topic de votre choix pour que votre message se poste, magique ! Peut éventellement être utile en cas de split.
// @include        http://www.jeuxvideo.com/forums/0-*-0-1-0-1-0-*.htm
// ==/UserScript==
 
function JVSplit() {
 
    if(!localStorage.message_jvsplit) localStorage.setItem('message_jvsplit', 'Entrez votre message ici.');
 
    // On met le textarea à la place du bloc vidéo à la une, dont l'utilité avoisine la valeur 0, et on lui met la dernière valeur rentrée
    document.querySelector('#bloc_forums_img').innerHTML        = 'JV Split';
    document.querySelectorAll('#col2 .bloc_inner')[0].innerHTML = '<div id="attention" style="padding: 3px 0;font: 12px arial;text-align: justify;">\
                                                                      Attention, JV Split est actif. Cliquer sur un topic revient donc à y poster le message contenu dans le champ de texte ci-dessous.\
                                                                  </div>\
                                                                  <textarea id="jvsplit" style="width:98%!important;max-width:98%;height:141px;font:12px Arial;">'+ localStorage.message_jvsplit +'</textarea>\
                                                                  <div id="reception"></div>';
 
    // On crée la série de paramètres nécessaires à l'envoi du message
    function obtenir_donnees() {
        var input   = document.querySelectorAll('#post input'),
            donnees = '';
        for(var i = 0; input.length>i; i++) {
            donnees += input[i].name + '=' + input[i].value + '&';
        }
        return donnees.replace(/mode=2/, 'mode=5').replace(/&newsujet=.+/, '');
    }
   
    // Pour mettre à jour la valeur des inputs session2, Dargor, 544d4f44df44d4cd55machin, et 45d1f1d5445s4d54e887ebidule, afin d'être en capacité de reposter un message
    function maj_donnees() {
        var form = document.querySelector('#post'),
            xhr  = new XMLHttpRequest();
        with(xhr) {
            open('GET', location);
            onreadystatechange = function() {
                if(this.status == 200 && this.readyState == 4) form.innerHTML = this.responseText.split('(this,\'1\')">')[1].split('</form>')[0];
            }
            send(null);
        }
    }
   
    // On stocke dans le localStorage la valeur de #jvsplit (blur car keypress/down/up ne retient pas le dernier caractère apparemment)
    document.querySelector('#jvsplit').addEventListener('blur', function() {
        localStorage.setItem('message_jvsplit', this.value);    
    },  false);
   
    // On récupére l'id du topic au clic sur celui-ci et on laisse AJAX faire son travail, tout en mettant à jour #reception en fonction de la réponse
    for(var i = 0, topics = document.querySelectorAll('.ltopic'); topics.length>i; i++) {
        topics[i].addEventListener('click', function(e) {
            e.preventDefault();
            var id_topic  = parseInt(this.name.replace(/topic_/, '')),
                nom_topic = this.textContent,
                jvsplit   = document.querySelector('#jvsplit').value,
                reception = document.querySelector('#reception'),
                xhr       = new XMLHttpRequest();
            with(xhr) {
                open('POST', 'http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi');
                setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                onreadystatechange = function() {
                    if(this.status == 200 && this.readyState == 4) {
                        if(this.responseText.indexOf('form_err') == -1) {
                            reception.innerHTML = 'Le message : <br><br> <b>« '+ jvsplit +' »</b> <br><br>... a été correctement envoyé au topic : <br><br> <b>« '+ nom_topic +' »</b>.';
                            reception.setAttribute('style', 'border: 1px solid #069E00;padding: 10px;background: #9EFF86;color: #046300;margin-top: 5px');
                            reception.previousSibling.previousSibling.value = '';
                        } else {
                            reception.innerHTML = 'Erreur. <br><br>Vous avez peut-être besoin d\'un code de confirmation, mais le script ne les gère pas encore. Veuillez réessayer dans quelques minutes.';
                            reception.setAttribute('style', 'border: 1px solid #FF5F5F;padding: 10px;background: #FFCBCB;color: #F22;margin-top: 5px');
                        }
                    }
                }
                send('yournewmessage='+ encodeURIComponent(jvsplit) +'&'+ obtenir_donnees().replace(/topic=0/, 'topic='+ id_topic));
            }
            maj_donnees();
        },  false);
    }
}
 
JVSplit();