// ==UserScript==
// @name           SG_TOOLS
// @namespace      Vieoli
// @description    Tools for origins-return / sgu-addons et ajoute quelques outils pratiques
// @include        http://*.origins-return.fr/*
// @include        http://www.origins-return.fr/
// @include        http://www.origins-return.com/
// @include        http://uni3.origins-return.fr/
// ==/UserScript==

(function() {
    // Verif que la commande existe
    if (!GM_xmlhttpRequest) {
        alert('Please upgrade to the latest version of Greasemonkey.');
        return;
    }
    
    /**
     * VARIABLES
    **/
    var loc = location.href;
    var base_url = loc.substr(0,loc.indexOf('/',25)+1); //Get url on which we will add our parameters
    var divuniq = 0;
    var tottr = document.getElementsByTagName("tr");
    var initOK = false; // pour vérifier l'activation de affinfo !
    var jaune = '#FAFDCE', vert = '#EAFFEA', rose = '#FFE6E6', bluem = '#A4B6CA';
    var timeID;

    /**
     * INIT
    **/
    var global_log = getinfo("ident_sglog");
    var global_pass = getinfo("ident_sgpass");
    var global_uni = getinfo("ident_sguni");
    
    var autoLogin = getinfo("config.autologin");
    var autoScan = getinfo("config.autoscan");
    var autoRapport = getinfo("config.autorapport");
    var autoPoints = getinfo("config.autopoints");
    var autoPlace = getinfo("config.autoplace");
    var autoMili = getinfo("config.automili");
    var autoProd = getinfo("config.autoprod");
    var autoEmpire = getinfo("config.autoempire");
    var autoActu = getinfo("config.autoactu");
    var autoMacro = getinfo("config.automacro");
    var autoReste = getinfo("config.autoreste");
    //var autoGala = getinfo("config.autogala");
    var autoMoins = getinfo("config.automoins");
    var autoNextFight = getinfo("config.autonextfight");
    var autoCoord = getinfo("config.autocoord");
    var autoAttaque = getinfo("config.autoattaque");
    var autoPorte = getinfo("config.autoporte");
    var autoTransp = getinfo("config.autotransp");
    
    var autoFret = getinfo("config.autofret");
    var autoFretNom = getinfo("config.autofret.nom");
    var autoFretPlace = getinfo("config.autofret.place");
    var autoFretEquip = getinfo("config.autofret.equip");
    var autoFretNom2 = getinfo("config.autofret.nom2");
    var autoFretPlace2 = getinfo("config.autofret.place2");
    var autoFretEquip2 = getinfo("config.autofret.equip2");
    
    var rapportMenu = getinfo("config.menurapport");
    var empireMenu = getinfo("config.menuempire");
    var devMenu = getinfo("Etat_Mnu");
    var lastMaj = getinfo("lastmaj");
    if (lastMaj != false)
      lastMaj = parseInt(lastMaj.split("_")[0]);

    var debugmode = getinfo("config.debugmode");

    /**
     * Preparing visual style for script's GUI
    **/
    var cssStyle = "";
    cssStyle +="#FBMonstersMenu { font-size: 10px; position:fixed; top:2px; right:2px; border:1px solid #B22222; background:#333333; color:#cccccc; padding:2px; font-weight:bold; z-index: 1000;}";
    cssStyle +="#FBMonstersMenu div.monsterSection { text-align:center; padding-top:2px;}";
    cssStyle +="#FBMonstersMenu div.monsterHeading { font-size: 12px; text-align:center; background: #B22222; color: #4DDDDD; }";
    cssStyle +="#FBMonstersMenu a { color: #B22222; text-decoration:none; }";
    cssStyle +="#FBMonstersMenu a:hover { text-decoration:underline; }";
    cssStyle +="#FBMonstersMenu td { font-size: 9px; }";
    GM_addStyle(cssStyle);

    /**
     * EXTEND TOOLS
    **/
    var URLtool = getinfo("urltool");

    /**
     * FUNCTIONS
    **/
    String.prototype.trim = function () {
       return this.replace(/^\s*|\s*$/,"");
    }
    String.prototype.simplify = function () {
       //return this.replace(/\s+/g," ");
       return this.replace(/\s+/g,"");
    }

    function $(el){
      return document.getElementById(el);
    }
    
    function $N(el){
      return document.getElementsByName(el);
    }
    
    function $$(el){
        return document.getElementsByTagName(el);
    }

    function do_modify_html_it(doc, element, match_re, replace_string) {
      match_re = new RegExp(match_re);
      if (element.innerHTML) {
        element.innerHTML = element.innerHTML.replace(match_re, replace_string);
      }
    }

    //unsafeWindow.loadBuilding = function(planet) {
    //}

    //===========================
    // Pour debug d'un tableau
    //===========================
    function debugtab(elemtab, inner){
      if (inner == 0 ||inner == null){
        for (var a=0 ; a<elemtab.length ; a++ ){
            alert(a + ":" + elemtab[a]);
        }
      }else{
        for (var a=0 ; a<elemtab.length ; a++ ){
            alert(a + ":" + elemtab[a].innerHTML);
        }
      }
    }
    function putmenu(){
      var infomnu = new Array("apercu", "galaxi", "atk_porte", "flotte_aller",
                              "flotte_espio", "flotte_ruines", "flotte_transport");
      var liena;
      var bontr = tottr[4];
      var newbr = document.createElement("br");
      var newtr = document.createElement("tr");
      var newtd1 = document.createElement("td");
      var newtd = document.createElement("td");
      newtd.setAttribute("colspan", "6");

      for (var nummenu = 0; nummenu < infomnu.length; nummenu++){
        liena = document.createElement('a');
        if (document.baseURI.indexOf(infomnu[nummenu]) != -1){
          liena.style['color'] = 'grey';
        }else
          liena.href = infomnu[nummenu] + ".php.htm";
        liena.title = infomnu[nummenu];
        liena.innerHTML = '&#187;' + infomnu[nummenu] + " ";
        newtd.appendChild(liena);
        if (nummenu == 4)
          newtd.appendChild(newbr);
      }
      var btnclose = document.createElement("input");
      btnclose.type = 'button';
      btnclose.style['border'] = '0px';
      btnclose.value = 'Close Menu';
      btnclose.addEventListener('click',function() { toggleconfig("Etat_Mnu"); },false); // true
      newtd.appendChild(btnclose);
      newtr.appendChild(newtd);
      insertAfter(newtr, bontr);
    }
    function toggleconfig(elem){
        window.setTimeout(toggleconfig1, 0, elem);
    }
    function toggleconfig1(quoi){
        var etat = GM_getValue(quoi);
        etat = etat ? false : true;
        GM_setValue(quoi, etat);
        /*
        window.setTimeout(function() {
            
        }, 0);*/
        document.location.reload();
        return true;
    }
    function getinfo(clevaleur){
        var retour = GM_getValue(clevaleur);
        if (!retour) return false;
        return retour;
    }
    function setinfo(clevaleur, quoi){
        window.setTimeout(function() {
            GM_setValue(clevaleur, quoi);
          }, 0);
        //window.setTimeout(GM_setValue, 0, 'status_' + valid_id, 0);
        //window.setTimeout(GM_setValue, quoi, clevaleur, 0);
        //GM_setValue(clevaleur, quoi);
        return true;
    }
    function delinfo(clevaleur){
        GM_deleteValue(clevaleur);
    }

    //===========================
    // Ajoute un lien vers liensrc de label lientitle
    //===========================
    function addlien(liensrc, lientitle){
        var totdiv = document.getElementsByTagName('div') ;
        for (var a=0 ; a<totdiv.length ; a++ ){
            if (totdiv[a].className == "menuc"){ // cherche la premiere div de menu
                var newdiv = document.createElement("div");
                newdiv.setAttribute("class", "menu");
                newdiv.innerHTML = "&#187; ";
                
                var liena = document.createElement('a');
                liena.style['cursor'] = 'pointer';
                liena.title = lientitle;
                liena.innerHTML = lientitle;
                liena.addEventListener('click', function() { eval(liensrc); }, false);
                newdiv.appendChild(liena);

                totdiv[a].appendChild(newdiv);
                break;
            }
        }
    }

    function addlien_dur(liensrc, lientitle){
        var totdiv = document.getElementsByTagName('div') ;
        for (var a=0 ; a<totdiv.length ; a++ ){
            if (totdiv[a].className == "menuc"){ // cherche la premiere div de menu
                var newdiv = document.createElement("div");
                newdiv.setAttribute("class", "menu");
                newdiv.innerHTML = '&#187; <a href="'+ liensrc +'">'+ lientitle +'</a>\n';
                totdiv[a].appendChild(newdiv);
                break;
            }
        }
    }
    
    //===========================
    // Asigne une valeur a un element de name versou
    //===========================
    function addcoord(versou, valeur){
        var gala = $N(versou)[0];
        gala.value = valeur;
    }

    //===========================
    // Place les coord de mes planetes
    //===========================
    function testcoord(nom){
      var gala = 0;
      var syst = 0;
      var posi = 0;

      var selplanete = $N('idcolo')[0];
      var str1 = '';
      var planete = '';

      for (var a = 0; a < selplanete.options.length; a++){
        str1 = selplanete.options[a].innerHTML;
        str1 = str1.split('\&nbsp;\&nbsp;');
        plane = str1[0];
        if (nom == planete){
          var elem = str1[1].split(":");
          gala = elem[0];
          syst = elem[1];
          posi = elem[2];
          break;
        }
      }

      if (gala.substring(0, 1) == "[")
        gala = gala.substring(1, gala.length);
      if (posi.length == 2)
        posi = posi.substring(0, 1);

      var i = $N('galaxie')[0];
      i.value = gala;
      i = $N('systeme')[0];
      i.value = syst;
      i = $N('position')[0];
      i.value = posi;
    }

    //===========================
    // Ajoute les boutons de coordonnees rapides
    //===========================
    function putdiv(){
      var x = document.createElement('tr');
      x.appendChild(document.createElement('td'));

        var x2 = document.createElement('td');
        x2.style.textAlign='center';
        x2.setAttribute('colspan', '3');

      if ($N('idcolo') == null) return;

      var selplanete = $N('idcolo')[0];
      var str1 = '';
      var y = '';

      for (var a = 0; a < selplanete.options.length; a++){
        str1 = selplanete.options[a].innerHTML;
        str1 = str1.split('\&nbsp;\&nbsp;');

        y = document.createElement('input');
      	y.setAttribute('type','button');
      	y.value = str1[0];
      	y.addEventListener('click',function() { testcoord(this.value); },true);
      	x2.appendChild(y);
      	if (a == 4)
          x2.appendChild(document.createElement('br'));
      }

  	  x.appendChild(x2);

  	  if (tottr == null) return;
  	  if (tottr.length < 7) return;
  	  var bontr = tottr.length - 7;

      tottr[bontr].parentNode.insertBefore(x, tottr[bontr].nextSibling);
      return true;
    }

    //===========================
    // return l'element id de la liste du select retourn array(nom planete, coord planete) !
    //===========================
    function getplanete(id){
      if ($N('idcolo') == null) return false;
      var selplanete = $N('idcolo')[0];
      if (!selplanete) return false;
      var planete = selplanete.options[id].innerHTML;
      
      var str1 = planete.split('\&nbsp;\&nbsp;');
      var nomplanete = str1[0];
      var elem = str1[1].split(":");
      var coord = "";

      if (elem[0].substring(0, 1) == "[")
        coord = elem[0].substring(1, elem[0].length);
      else
        coord = elem[0];

      coord += "." + elem[1] + ".";

      if (elem[2].length == 2)
        coord += elem[2].substring(0, 1);
      else
        coord += elem[2];
      
      return new Array(nomplanete, coord);
    }
    //===========================
    // return l'id du vaisseau
    // (nom de champ recherché "Transit_case_0")
    //===========================
    function getidvaisseau(nomvaisseau){
      if (tottr == null) return false;
      var retour = "", span = "";
      var bontd = document.createElement("td");
      
      // les vaisseaux commencent au tr[8] et s'arrete au innerHTML <hr>
      if (tottr.length < 8) return false;
      for (var i = 8; i < (tottr.length); i++){
        bontd = tottr[i].getElementsByTagName('td'); //maxvaisseau(0);
        if (bontd == null) return false;
        span = bontd[0].getElementsByTagName('span')[0];

        if (!span) continue;
        
        if (span.innerHTML == "<hr />")
          break;
        if (span.innerHTML == nomvaisseau){
          var idvaisseau = bontd[4].getElementsByTagName('input')[0];
          return idvaisseau.id;
          //var newid = idvaisseau.name.split("_");
          //return parseInt(newid[2]);
        }
        retour += "<br />" + i + ":" + bontd[0].innerHTML + " ->nb:" + bontd[1].innerHTML + "<br />";
      }
      // si pas trouvé
      //alert ("id pas trouvé\n" + retour);
      return 0;
    }
    //===========================
    // return le nombre de vaisseaux "nomvaisseau" dispo
    //===========================
    function getnbvaisseau(nomvaisseau){
      if (tottr == null) return 0;
      var retour = "", span = "";
      var bontd = document.createElement("td");
      // les vaisseaux commencent au tr[8] et s'arete au innerHTML <hr>
      for (var i = 8; i< (tottr.length); i++){
        bontd = tottr[i].getElementsByTagName('td'); //maxvaisseau(0);
        span = bontd[0].getElementsByTagName('span')[0];
        
        if (!span) continue;
        if (span.innerHTML == "<hr>")
          break;
          
        if (span.innerHTML == nomvaisseau){
            var nbvaiss = bontd[1].innerHTML.toString();
            nbvaiss = Remplace(nbvaiss, ".", "");
            return parseInt(nbvaiss); // retour nombre de vaisseau
        }
        if (bontd[1])
            retour += "<br />" + i + ":" + bontd[0].innerHTML + " ->nb:" + bontd[1].innerHTML;
        else
            retour += "<br />" + i + ":" + bontd[0].innerHTML + " ->nb: XX";
      }
      // si pas trouvé
      //affinfo ("Vaisseau (" + nomvaisseau + ") non trouv&eacute;" + retour, null, null);
      affinfo ("Vaisseau (" + nomvaisseau + ") non trouv&eacute;", null, null);
      return 0;
    }

    function getress(quoi){
      var nbfin = 0;
      var str1 = '';
      var limite = 0;
      switch (quoi){
        case "fer":
        case "or":
        case "cristal":
        case "naquadah":
          var indice = 0;
          if (quoi == "or") indice = 1;
          if (quoi == "cristal") indice = 2;
          if (quoi == "naquadah"){
            indice = 3;
            limite = $('moinsnaq');
            limite = parseInt(limite.value) * 1000;
          }

          var restr = tottr[4];
          var res1 = restr.getElementsByTagName('div');
          var resF = res1[indice].innerHTML;
          nbfin = parseInt(resF.simplify());
          break;
        case "militaire":
          for (var i=5; i< tottr.length; i++){
            str1 = tottr[i].innerHTML;
            if (str1.indexOf("Militaires",0) != -1){
              var bontr = tottr[i].getElementsByTagName('td');
              var str2 = bontr[1].innerHTML;
              nbfin = parseInt(str2.simplify());

              limite = $('moinsmili');
              if (autoFretEquip)
                  limite = parseInt(limite.value) * parseInt(autoFretEquip);
              break;
            }
          }
          break;
      }
      var ressretour = nbfin - limite;
      return ressretour;
    }

    function putmax(quoi){
      switch (quoi){
        case "fuite":
          putmax("fer");
          putmax("or");
          putmax("cristal");
          putmax("naquadah");
          putmax("militaire");
          fretauto();
          putmax("naquadah"); // après au cas ou change avec fretauto
          putmax("militaire");
          return true;
          break;
        case "ferorcris":
          putmax("fer");
          putmax("or");
          putmax("cristal");
          fretauto();
          return true;
          break;
        case "ferorcrisnaq":
          putmax("fer");
          putmax("or");
          putmax("cristal");
          putmax("naquadah");
          fretauto();
          return true;
          break;
        default:
          break;
      }
      var totoF = $N(quoi)[0]; // la ou mettre les valeurs
      var paszero = getress(quoi);
      if (paszero < 0) paszero = 0;
      totoF.value = paszero;
      fretauto();
      return;
    }

    function insertmax(){
      var elem = $N('fer')[0];
      if (!elem) return false;
      var a = document.createElement('a');
			a.style['cursor']='pointer';
			a.title='Max';
			a.innerHTML = ' Max';
			a.addEventListener('click',function() { putmax('fer'); }, false);
      //elem.parentNode.insertBefore(a, elem.nextSibling);

      elem = $N('or')[0];
      a = document.createElement('a');
			a.style['cursor']='pointer';
			a.title='Max';
			a.innerHTML = ' Max';
			a.addEventListener('click',function() { putmax('or'); }, false);
      //elem.parentNode.insertBefore(a, elem.nextSibling);

      elem = $N('cristal')[0];
      a = document.createElement('a');
			a.style['cursor']='pointer';
			a.title='Max';
			a.innerHTML = ' Max';
			a.addEventListener('click',function() { putmax('cristal'); }, false);
      //elem.parentNode.insertBefore(a, elem.nextSibling);

      elem = $N('naquadah')[0];
      var span1 = document.createElement('span');
      a = document.createElement('a');
			a.style['cursor']='pointer';
			a.title='Max';
			a.innerHTML = ' Max ';
			a.addEventListener('click',function() { putmax('naquadah'); }, false);
      //span1.appendChild(a);
      a = document.createElement('input');
      a.setAttribute("type", "text");
      a.setAttribute("size", "2");
      a.setAttribute("id", "moinsnaq");
			a.value='3';
			span1.appendChild(a);
      elem.parentNode.insertBefore(span1, elem.nextSibling);

      elem = $N('militaire')[0];
      span1 = document.createElement('span');
      a = document.createElement('a');
			a.style['cursor']='pointer';
			a.title='Max';
			a.innerHTML = ' Max ';
			a.addEventListener('click',function() { putmax('militaire'); }, false);
      //span1.appendChild(a);
      a = document.createElement('input');
      a.setAttribute("type", "text");
      a.setAttribute("size", "2");
      a.setAttribute("id", "moinsmili");
			a.value='3';
			span1.appendChild(a);
      elem.parentNode.insertBefore(span1, elem.nextSibling);

      // Fer Or Cristal & Naquadah & fuite
      var bontr = tottr.length - 2;
      elem = tottr[bontr].getElementsByTagName('td')[3];
      span1 = document.createElement('span');
      a = document.createElement('a');
			a.style['cursor']='pointer';
			a.title='Max';
			a.innerHTML = ' Max ';
			a.addEventListener('click',function() { putmax('ferorcris'); }, false);
			span1.appendChild(a);
			a = document.createElement('a');
			a.style['cursor']='pointer';
			a.title='Max';
			a.innerHTML = ' & Max+ ';
			a.addEventListener('click',function() { putmax('ferorcrisnaq'); }, false);
			span1.appendChild(a);
			a = document.createElement('a');
			a.style['cursor']='pointer';
			a.title='Max';
			a.innerHTML = ' & Fuite ';
			a.addEventListener('click',function() { putmax('fuite'); }, false);
			span1.appendChild(a);
			span1.appendChild(document.createElement("br"));
			a = document.createElement('a');
			a.style['cursor']='pointer';
			a.title='Max';
			a.innerHTML = ' & FretAuto ';
			a.addEventListener('click',function() { fretauto(); }, false);
			span1.appendChild(a);
			a = document.createElement('a');
			a.style['cursor']='pointer';
			a.title='Max';
			a.innerHTML = ' & Mili ';
			a.addEventListener('click',function() { putmax('militaire');fretauto(); }, false);
			span1.appendChild(a);
      elem.appendChild(span1);

			bontr = tottr.length - 3;
			elem = tottr[bontr].getElementsByTagName('td')[3];
			elem.innerHTML = "<b>Fer+Or+Cristal & +Naquadah</b>";
    }

    function fretauto(){
      // a mettre aussi sur le onChange="restefret();"
      var limite = $('moinsmili');
      if (autoFretNom == false || autoFretPlace == false) {alert("Informations de fret non definies"); return;}
      
      var nbfret1 = getnbvaisseau(autoFretNom);

      var nbfret2 = 0;
      if (autoFretNom2 !== false && autoFretPlace2 !== false){
          nbfret2 = getnbvaisseau(autoFretNom2);
      }
      if (nbfret1 == 0 && nbfret2 == 0) return;
      
      limite.value = nbfret1;
      var nomchamp = "Transit_case_" + getidvaisseau(autoFretNom);
      //var nomchamp2 = "Transit_case_" + getidvaisseau(autoFretNom2);
      
      // la ou mettre les valeurs
      var nbvaiss = $N(nomchamp)[0];
      //var nbvaiss2 = $N(nomchamp2)[0];
      
      // calcul du nombre de fret necessaire
      var totoF = $N("fer")[0]; // la ou mettre les valeurs
      var nbress = parseInt(totoF.value * 1);
      var totres = getress("fer");
      if (nbress > totres) nbress = totres;

      totoF = $N("or")[0]; // la ou mettre les valeurs
      totres = getress("or");
      if (parseInt(totoF.value * 1) > totres) nbress += totres;
      else nbress += parseInt(totoF.value * 1);

      totoF = $N("cristal")[0]; // la ou mettre les valeurs
      totres = getress("cristal");
      if (parseInt(totoF.value * 1) > totres) nbress += totres;
      else nbress += parseInt(totoF.value * 1);

      totoF = $N("naquadah")[0]; // la ou mettre les valeurs
      totres = getress("naquadah");
      if (totres < 0) totres = 0;
      if (parseInt(totoF.value * 1) > totres) nbress += totres;
      else nbress += parseInt(totoF.value * 1);

      totoF = $N("militaire")[0]; // la ou mettre les valeurs
      totres = getress("militaire");
      if (parseInt(totoF.value * 1) > totres) nbress += totres;
      else nbress += parseInt(totoF.value * 1);

      if (nbress == 0) return;
      
      // var pour capacite fret
      var capafret = autoFretPlace; //149188;
      // var fretextend pour la limite a partir de qd ajouter + 1
      var fretextend = 30000;

      var nbteo = (nbress / capafret);

      if ((nbteo - parseInt(nbteo)) * capafret > fretextend)
        nbteo = parseInt(nbteo) + 1;

      if (nbteo > nbfret1) nbteo = nbfret1;
      nbteo = (nbteo > 1) ? parseInt(nbteo) : 1;

      nbvaiss.value = nbteo;
      limite.value = nbteo;

      var limitenaq = $('moinsnaq');
      limitenaq.value = nbteo;
    }

    function insertfretauto(){
      var totoF = $N("fer")[0]; // la ou mettre les valeurs
      totoF.addEventListener('change', function (){ fretauto();}, false);

      totoF = $N("or")[0]; // la ou mettre les valeurs
      totoF.addEventListener('change', function (){ fretauto();}, false);

      totoF = $N("cristal")[0]; // la ou mettre les valeurs
      totoF.addEventListener('change', function (){ fretauto();}, false);

      totoF = $N("naquadah")[0]; // la ou mettre les valeurs
      totoF.addEventListener('change', function (){ fretauto();}, false);

      totoF = $N("militaire")[0]; // la ou mettre les valeurs
      totoF.addEventListener('change', function (){ fretauto();}, false);
    }
    
    function insertbtnporteauto(){
        // xpath tableau coordonnées
        var xpath1 = "/html/body/div[5]/div/div[2]/div[2]/div/div[2]/div/div/form[2]/table/tbody/tr[22]/td/table";
        var tablecoord = $x1(xpath1, document);
        if (tablecoord){
            var otr = document.createElement("tr");
            var otd = document.createElement("td");
            otd.setAttribute("colspan", "3");
            otd.setAttribute("text-align", "center");
            /*
            var lienspec = createLien("<span style=\"color: white;width: 120px\">Transp ALL</span>",
                  "insertporteauto();");
            otd.appendChild(lienspec);
            */
            var a2 = document.createElement("a");
            a2.innerHTML = 'TranspAuto';
            a2.href = "javascript:SetMax('ada');SetMax('orr');SetMax('fer');SetMax('ura');SetMax('mili_nbre');";
            otd.appendChild(a2);
            
            otr.appendChild(otd);
            tablecoord.appendChild(otr);
        }
    }
    function insertporteauto() {
        // xpath de max fer
        var xpath1 = "/html/body/div[5]/div/div[2]/div[2]/div/div[2]/div/div/form[2]/table/tbody/tr[16]/td/table/tbody/tr/td[2]/a";
        var btn = $x1(xpath1, document);
        if (btn){

            affinfo("btn.value:" + btn.value + " - onclick:" + btn.getAttribute("onclick"), null, true);
            btn.click();
        }
        // xpath de max or
        xpath1 = "/html/body/div[5]/div/div[2]/div[2]/div/div[2]/div/div/form[2]/table/tbody/tr[16]/td/table/tbody/tr/td[4]/a";
        btn = $x1(xpath1, document);
        if (btn) btn.click();
        // xpath de max cristal
        xpath1 = "/html/body/div[5]/div/div[2]/div[2]/div/div[2]/div/div/form[2]/table/tbody/tr[16]/td/table/tbody/tr[2]/td[2]/a";
        btn = $x1(xpath1, document);
        if (btn) btn.click();
        // xpath de max naquadah
        xpath1 = "/html/body/div[5]/div/div[2]/div[2]/div/div[2]/div/div/form[2]/table/tbody/tr[16]/td/table/tbody/tr[2]/td[4]/a";
        btn = $x1(xpath1, document);
        if (btn) btn.click();
        // xpath de max mili
        xpath1 = "/html/body/div[5]/div/div[2]/div[2]/div/div[2]/div/div/form[2]/table/tbody/tr[19]/td/table/tbody/tr/td[4]/a";
        btn = $x1(xpath1, document);
        if (btn) btn.click();
    }

    /**
     *******************************************************************************
     ****************************  FARMER TOOLS  ***********************************
     *******************************************************************************
    **/
    function FARM(){
        var self = this;
        this.currentfarm = getinfo('farm.active'); //getcurrentfarm();
        //this.ifarm = this.currentfarm.substring(0, 1);
        this.currentfarmer = getcurrentfarmer();
        this.nbmaxfarm = 70;
        this.tabfarm = [];
        
        // gestion farm
        function getcurrentfarm(){
            var farm = getinfo('farm.active');
            if (farm == false) farm = setcurrentfarm();
            return farm;
        }
        function setcurrentfarm(){
            var defaultnom = getinfo('farm.active');
            if (defaultnom == false) defaultnom = "Farm 1";
            var reponse = prompt("New farm:", defaultnom);
            setinfo('farm.active', reponse);
            self.currentfarmer = '';
        }
        // gestion farmer
        function getcurrentfarmer(){
            var farm = getinfo('farmer.active');
            if (farm == false) farm = setcurrentfarmer();
            return farm;
        }
        
        function setcurrentfarmer(){
            var defaultnom = getinfo('farmer.active');
            if (defaultnom == false) defaultnom = "Farmer 1";
            var reponse = prompt("New farmer:", defaultnom);
            setinfo('farmer.active', reponse);
            return reponse;
        }
        this.getfarmer = function(){
            var nomfarm, farm, a;
            for (var x = 0; x <= this.nbmaxfarm; x++){
                if (x < 10) farm = getinfo("farm0" + x);
                else farm = getinfo("farm" + x);
                if (farm == false)
                    continue;
                a = farm.indexOf(";");
                if (a == -1)
                    nomfarm = farm; // list vide
                else
                    nomfarm = farm.substring(0, a);
                if (self.currentfarm == nomfarm){
                    //affinfo(nomfarm, null, true);
                    if (a == -1) return new Array(nomfarm);
                    else{
                        var tabfarm = farm.split(";");
                        return tabfarm;
                    }
                }
            }
            return new Array();
        }
        this.getlistfarm = function(){
            var tabfarm = new Array();
            var farm, a;
            for (var x = 0; x <= this.nbmaxfarm; x++){
                if (x < 10) farm = getinfo("farm0" + x);
                else farm = getinfo("farm" + x);
                if (farm == false)
                    continue;
                a = farm.indexOf(";");
                if (a != -1)
                    tabfarm[x] = farm.substring(0, a);
                else
                    tabfarm[x] = farm;
            }
            return tabfarm;
        }
        this.getnextfarm = function (){
            var tabfarm = this.getlistfarm();
            var actfarm = this.currentfarm;
            var farm = '';
            var ok = false;
            for (var i = 0; i < tabfarm.length; i++){
            //for (farm in tabfarm){
                if (ok){
                    //affdebug(tabfarm[i]);
                    return tabfarm[i]; // envoie de la farm suivante
                }
                if (tabfarm[i] == actfarm)
                    ok = true;
                //affinfo(tabfarm[i]+'<br />', null, true);
            }
            return false;
        }
        this.addfarmer = function (elem){
            //traitement d'ajout de farmer
            var nom = self.currentfarm;
            var old = self.getfarmer();
            var a = old.length;
            old[a] = elem;
            var nouveau = old.join(";");
            setinfo('farm'+nom.substring(0, 2), nouveau);
            //alert("elem:"+elem+"\n\nnom:"+nom+"\nold:"+old+"\na:"+a + "\n\nNOUVEAU:" + nouveau);
            return true;
        }
        this.suppfarmer = function (elem){
            // traitement de suppression de farmer
            var nom = self.currentfarm;
            var tabfarm = self.getfarmer();
            var ret = new Array();
            elem = elem * 1;
            var nbelem = tabfarm.length;
            if (nbelem == 2){
                setinfo('farm'+nom.substring(0, 2), tabfarm[0]);
            }else{
                for(var i=0; i<nbelem; i++){
                    if (tabfarm[i] != '' && elem == i){
                        tabfarm.splice(i,1);
                        affinfo("farmer "+i+" supprim&eacute;", null, true);
                        break;
                    }
                }
                setinfo('farm'+nom.substring(0, 2), tabfarm.join(";"));
            }
            //alert("numéro de farmer à supp\n"+elem);
            return true;
        }
        this.setnewfarm = function (){
            var newfarm = prompt("Nom de la farm", "Farm ex");
            // last num farm
            for (var i = 1; i <= this.nbmaxfarm; i++){
                if (i < 10) farm = getinfo("farm0" + i);
                else farm = getinfo("farm" + i);
                if (farm == false)
                    break;
            }
            if (i == this.nbmaxfarm && farm != false){
                affinfo("Blem... ajout de farm", null, null);
                return false;
            }
            
            var lastfarm = i;
            setinfo('farm'+lastfarm, lastfarm + "-" + newfarm);
            return lastfarm + "-" + newfarm + " crée !";
        }
        
        this.totoElem = "toto";
        this.totoOn = "On";

        this.getinterface = function(){

            var label = document.createElement('label');
            //label.innerHTML = "";
                var checkbox = document.createElement('input');
                    checkbox.type = "checkbox";
                    checkbox.title = "Activate: " + ((self.totoOn) ? "On" : "Off");
                    checkbox.defaultChecked = self.totoOn;
                    /*
                    checkbox.addEventListener('click', function() {
                        self.VKI_deadkeysOn = this.checked;
                        this.title = "Activate: " + ((this.checked) ? "On" : "Off");
                        self.VKI_modify("");
                        return true;
                    }, false);
                    */
                label.appendChild(self.totoElem = checkbox);
            checkbox.checked = self.totoOn;

            affinfo(label, true, true);
            affinfo("Gestion des farms<br />", true, true);
        }
        
    }
    function afffarm(){
        $("divfarm").style.display = "block";
    }
    function addfarm(){
        //alert("elem:"+elem);
        window.setTimeout(addfarm1, 0);
    }
    function addfarm1(){
        var ofarm = new FARM;
        var newfarm = ofarm.setnewfarm();
        affinfo(newfarm, null, true);
    }
    // test de la classe FARM !!!!
    function gofarm(){
        var ofarm = new FARM;
        ofarm.getinterface(); //var listfarm =
    }
    GM_registerMenuCommand('Test farm', gofarm);
    
    // retour le nombre de 'farm' enregistré
    function getnbfarmer(){
    	var idplanete = "";
    	var retour = 0;
    	var numplanete = "";
        for (var x = 1; x <= 30; x++){
            numplanete = getinfo("farm" + x);
            if (numplanete == false)
            	break;
            retour++;
        }
        return retour;
    }
    
    

    function addfarmer() {
        var nbfarmer = getnbfarmer();
        
        if (nbfarmer < 30){
          for (var nbf = 1; nbf < 11; nbf++){
              ligne = getfarmer(nbf);
              if (ligne == ""){
                  var gala = $('sgala').value;
                  var syst = $('ssyst').value;
                  var posi = $('sposi').value;
                  var nom = $('snom').value;
                  setinfo("farm" + nbf, gala + "-" + syst + "-" + posi + "-" + nom);
                  if ($('odiv')) $('odiv').style.display = 'none';
                  affinfo("Farmer : " + nom + " (" + gala + ", " + syst + ", " + posi + ") ajout&eacute;");
                  break;
              }
          }
          return true;
        }else{
          affinfo ("addfarmer num " + nbfarmer + "<br />Trop de farmer enregistr&eacute;.");
          return false;
      }
    }

    function addautofarmer(oelem){
        var ofarm = new FARM;
        
        var tabpos = getpos(oelem);
        // filtre sur le nom
        var nom = tabpos[3] + "";
        nom = nom.trim();
        var ret = ofarm.addfarmer("0:" + tabpos[0] + "-" + tabpos[1] + "-" + tabpos[2] + ":" + nom);
        if (ret){
            affinfo ("addfarmer<br />" + tabpos[0] + "-" + tabpos[1] + "-" + tabpos[2] + ":" + nom);
            return true;
        }else return false;
    }
    
    function addautofarmer2(oelem){
        var ofarm = new FARM;

        var tabpos = getpos(oelem);
        // filtre sur le nom
        var nom = tabpos[3] + "";
        nom = nom.trim();
        //var ret = ofarm.addfarmer("0:" + tabpos[0] + "-" + tabpos[1] + "-" + tabpos[2] + ":" + nom + "-<span style=\'color:yellow;\'>*</span>");
        var ret = ofarm.addfarmer("0:" + tabpos[0] + "-" + tabpos[1] + "-" + tabpos[2] + ":**" + nom);
        if (ret){
            affinfo ("addfarmer<br />" + tabpos[0] + "-" + tabpos[1] + "-" + tabpos[2] + ":" + nom + "-<span style=\'color:yellow;\'>*</span>");
            return true;
        }else return false;
    /*
      var tabpos = getpos(oelem);
      // filtre sur le nom
      var nom = tabpos[3];
      nom = nom.trim();
      
      var nbfarmer = getnbfarmer();
      if (nbfarmer < 30){
        nbfarmer++;
        setinfo("farm" + nbfarmer, tabpos[0] + "-" + tabpos[1] + "-" + tabpos[2] + "-<span style=\'color:yellow;\'>*</span> " + nom);
        affinfo ("addfarmer<br />" + tabpos[0] + "-" + tabpos[1] + "-" + tabpos[2] + "-<span style=\'color:yellow;\'>*</span> " + nom);
        return true;
      }else{
        affinfo ("addautofarmer BLEM<br /><span style=\'color: red;font-weight: bold;\'>Trop de farmer enregistr&eacute;</span>.");
        return false;
      }
    */
    }
    
    function addautofarmer3(oelem){
        var ofarm = new FARM;

        var tabpos = getpos(oelem);
        // filtre sur le nom
        var nom = tabpos[3] + "";
        nom = nom.trim();
        var ret = ofarm.addfarmer("0:" + tabpos[0] + "-" + tabpos[1] + "-" + tabpos[2] + ":**" + nom + "**");
        if (ret){
            affinfo ("addfarmer<br />" + tabpos[0] + "-" + tabpos[1] + "-" + tabpos[2] + ":-<span style=\'color:white;\'>" + nom + "</span>");
            return true;
        }else return false;
    /*
      var tabpos = getpos(oelem);
      // filtre sur le nom
      var nom = tabpos[3];
      nom = nom.trim();

      var nbfarmer = getnbfarmer();
      if (nbfarmer < 30){
        nbfarmer++;
        setinfo("farm" + nbfarmer, tabpos[0] + "-" + tabpos[1] + "-" + tabpos[2] + "-<span style=\'color:white;\'>" + nom + "</span>");
        affinfo ("addfarmer num " + nbfarmer + "<br />" + gala + "-" + syst + "-" + posi + "-" + nom);
        return true;
      }else{
        affinfo ("addautofarmer num " + nbfarmer + "<br /><span style=\"color: red;font-weight: bold;\">Trop de farmer enregistr&eacute;</span>.");
        return false;
      }
      */
    }
    
    function suppfarmer(numfarm){
        var ofarm = new FARM;
        var monid = numfarm.id.split("_");
        monid = monid[1];
        var ret = ofarm.suppfarmer(monid);
        if (ret){
            affinfo ("Supp farmer num " + monid);
            return true;
        }else{
            affinfo ("erreur suppression farmer ...");
            return false;
        }
    }

    function getfarmer(idfarm){
    	var infofarm = getinfo("farm" + idfarm);
    	return infofarm;
    }

    function getallfarm(){
      var nbfarmer = getnbfarmer();
      var ret = new Array();
      for (var i=1; i < nbfarmer + 1; i++) ret.push(getfarmer(i)); //ret[i] = getfarmer(i);
      return ret;
    }

    function changefarm(quoi){
        if (quoi == "none") quoi = false;
        setinfo("farm.active", quoi);
        affinfo("Farm active : " + quoi, null, null);
        /*window.setTimeout(function (){
            document.location.reload();
        }, 500);*/
        return true;
    }

    /**
     *******************************************************************************
     ****************************  AUTO  TRANSP  ***********************************
     *******************************************************************************
    **/
    function TRANSP(){
        var self = this;
        var nbfret = 0;
        //this.currentfarm = getinfo('farm.active'); //getcurrentfarm();
        //this.ifarm = this.currentfarm.substring(0, 1);
        //this.currentfarmer = getcurrentfarmer();
        //this.nbmaxfarm = 70;
        //this.tabfarm = [];
        this.totoOn = "On";
        
        // gestion farm
        function getcurrentfarm(){
            var farm = getinfo('farm.active');
            if (farm == false) farm = setcurrentfarm();
            return farm;
        }
        
        this.getfarmer = function(){
            var nomfarm, farm, a;
            for (var x = 0; x <= this.nbmaxfarm; x++){
                if (x < 10) farm = getinfo("farm0" + x);
                else farm = getinfo("farm" + x);
                if (farm == false)
                    continue;
                a = farm.indexOf(";");
                if (a == -1)
                    nomfarm = farm; // list vide
                else
                    nomfarm = farm.substring(0, a);
                if (self.currentfarm == nomfarm){
                    //affinfo(nomfarm, null, true);
                    if (a == -1) return new Array(nomfarm);
                    else{
                        var tabfarm = farm.split(";");
                        return tabfarm;
                    }
                }
            }
            return new Array();
        }
        this.getinterface = function(){
            var ret = document.createElement('div');
                // div HEAD
                var divh = createDiv("", "", "divh");
                    var tablien = new Array();
                    tablien = [['ADD', "alert(\'addvaiss\');"],
                        ['DEL', "alert(\'delvaiss\');"],
                        ['MODIFY', "alert(\'modvaiss\');"]];
                    var nblien = tablien.length;
                    var lien;
                    for (var i = 0; i < nblien; i++){
                        if (i != 0) divh.appendChild(document.createTextNode(" - "));
                        lien = createLien(tablien[i][0], tablien[i][1]);
                        divh.appendChild(lien);
                    }
                ret.appendChild(divh);

                // div CORP
                var divc = createDiv("", "", "divc");
                    var tabvaiss = new Array();
                    tabvaiss = [['yOuPi', '64064500, 91964300, 20019750, 2880000'],
                                ['Boom', '45782000, 45776800, 10401000, 75500'],
                                ['Fret Nine', '127250, 142050, 59900, 43000'],
                                ['Remorqueur', '10000, 7500, 5000, 2500'],
                                ['VR', '30000, 30000, 40000, 110000']];
                    var nbvaiss = tabvaiss.length;
                    for (var j = 0; j < nbvaiss; j++){
                        if (j != 0) divc.appendChild(document.createTextNode(" - "));
                        var liena = document.createElement('a');
                        liena.style['cursor'] = 'pointer';
                        liena.innerHTML = tabvaiss[j][0];
                        liena.title = tabvaiss[j][1];
                        liena.addEventListener('click', function() {
                            var tabvaiss = this.title.split(',');
                            var combien = prompt ("Combien de " + this.innerHTML + " à préparer :", "1");
                            var nbfret = getnbvaisseau("Fret Nine");
                            if (nbfret){ // 499 445 ress
                                var totress = parseInt(tabvaiss[0]) + parseInt(tabvaiss[1]);
                                totress += parseInt(tabvaiss[2]) + parseInt(tabvaiss[3]);
                                totress = totress * combien;
                                var nomchamp = getidvaisseau("Fret Nine"); // la ou mettre les valeurs
                                var nbvaiss = $N(nomchamp)[0];
                                var nb = parseInt(totress / 499455)+1;
                                nb += parseInt(nb * 5000 / 499445);
                                nbvaiss.value = nb;
                            }
                            var ress = $x1('//*[@id="fer"]');
                            if (ress) ress.value = tabvaiss[0] * combien;
                            ress = $x1('//*[@id="orr"]');
                            if (ress) ress.value = tabvaiss[1] * combien;
                            ress = $x1('//*[@id="ada"]');
                            if (ress) ress.value = tabvaiss[2] * combien;
                            ress = $x1('//*[@id="ura"]');
                            if (ress) ress.value = tabvaiss[3] * combien;

                        }, false);
                        divc.appendChild(liena);
                    }
                    
                ret.appendChild(divc);

                // pour le dev -----------------------------------------------------------
                var btntransp = createLien("Re Vaisseaux", "document.location.reload();");
                ret.appendChild(btntransp);
                
                var label = document.createElement('label');
                    var checkbox = document.createElement('input');
                    checkbox.type = "checkbox";
                    checkbox.title = "Activate: " + ((self.totoOn) ? "On" : "Off");
                    checkbox.defaultChecked = self.totoOn;
                    /*
                    checkbox.addEventListener('click', function() {
                        self.VKI_deadkeysOn = this.checked;
                        this.title = "Activate: " + ((this.checked) ? "On" : "Off");
                        self.VKI_modify("");
                        return true;
                    }, false);
                    */
                    checkbox.checked = self.totoOn;
                    label.appendChild(self.totoElem = checkbox);
                //ret.appendChild(label);
            return ret;
        }
    }
    
    function getlisttransp(){
        affinfo("ouverture autoTransp", null, null);
        var tdhead = $x1("/html/body/div[5]/div/div[2]/div[2]/div/div[2]/div/div/form[2]/table/tbody/tr[8]/td");
        if (tdhead){
            tdhead.innerHTML = '';
            var otransp = new TRANSP;
            tdhead.appendChild(otransp.getinterface());
            //tdhead.appendChild(document.createTextNode("F I N"));
        }else affinfo("Probl&egraveme detection du tr", null, null);
        return;
    }

    /**
     *******************************************************************************
     ******************************  VAISSEAU  *************************************
     *******************************************************************************
    **/
    function VAISSEAU() {
        var self = this;
        this.nom = this.getnom();
        
        this.totoOn = "On";

        // gestion farm
        function getcurrentfarm(){
            var farm = getinfo('farm.active');
            if (farm == false) farm = setcurrentfarm();
            return farm;
        }
        
        this.getinterface = function(){
            var ret = document.createElement('div');
            return ret;
            //affinfo(label, true, true);
        }
    }

    function makefarm(){
    	var odiv = document.createElement('div');
    	odiv.style['position'] = 'absolute';
    	odiv.style['top'] = '50px';
    	odiv.style['left'] = '200px';
    	odiv.style['width'] = '200px';
    	odiv.style['height'] = '220px';
    	odiv.style['border'] = '3px solid green';
    	odiv.style['backgroundColor'] = 'black';
    	odiv.style['color'] = 'white';
    	odiv.style['textAlign'] = 'center';
    	odiv.setAttribute('id','odiv');

    	var btgala = document.createElement('input');
      btgala.setAttribute('type', 'text');
    	btgala.setAttribute('value', '');
    	btgala.setAttribute('id', 'sgala');

    	odiv.appendChild(createLbl("sgala", "Galaxie"));
    	odiv.appendChild(btgala);

    	var btsyst = document.createElement('input');
      btsyst.setAttribute('type', 'text');
      btsyst.setAttribute('value', '');
      btsyst.setAttribute('id', 'ssyst');

	    odiv.appendChild(createLbl("ssyst", "Systeme"));
    	odiv.appendChild(btsyst);

    	var btposi = document.createElement('input');
      btposi.setAttribute('type', 'text');
      btposi.setAttribute('value', '');
      btposi.setAttribute('id', 'sposi');

	    odiv.appendChild(createLbl("sposi", "Position"));
    	odiv.appendChild(btposi);
    	odiv.appendChild(document.createElement("br"));

    	var btnom = document.createElement('input');
      btnom.setAttribute('type', 'text');
      btnom.setAttribute('value', '');
      btnom.setAttribute('id', 'snom');

	    odiv.appendChild(createLbl("snom", "Nom"));
    	odiv.appendChild(btnom);

    	var btadd = document.createElement('input');
    	btadd.setAttribute('type', 'button');
    	btadd.setAttribute('value', 'A D D');
    	btadd.addEventListener('click',function() { this.value="En cours";addfarmer(); },true);

    	odiv.appendChild(btadd);

    	// insertion dans le document
    	var obody = document.getElementsByTagName('div');
    	if (!obody) { alert("Pas de div"); return false; }
    	var derdiv = obody.length - 1;
    	var goodobj = obody[derdiv];
    	goodobj.appendChild(odiv);

    }

    function getident(quoi){
        if (global_log == false)
            setident();

        if (quoi == "sg")
            global_uni = "http://uni" + global_uni + ".origins-return.fr/uni" + global_uni + "/login_action.php";
        else if (quoi == "sgadd")
            global_uni = "http://uni" + global_uni + ".origins-return.fr/uni" + global_uni + "/";
    }

    function setident(){
        makedivsign();
    }

    function saveident(){
        var newlog = $('slog').value;
        setinfo("ident_sglog", newlog);
        var newpass = $('spass').value;
        setinfo("ident_sgpass", newpass);
        var newuni = $('suni').value;
        setinfo("ident_sguni", newuni);
        if ($('odiv')) $('odiv').style.display = 'none';
    }

    function resetident(){
        setinfo("ident_sglog", "");
        setinfo("ident_sgpass", "");
        setinfo("ident_sguni", "");
    }

    function do_login() {
        var login_field = $N("login");
        var pass_field = $N("password");
        var uni_field = $("univers");
        
        //var submit_btn = $N("Submit");
        var submit_btn = $("ok");

        var champok = false;
        //alert(global_log + "\n" + global_pass + "\n" + global_uni);
        if (login_field[0] && pass_field[0] && uni_field){ // rempli les champs
            //uni_field.value = global_uni; // temp pour changement serveur
            //uni_field.value = "http://ns354121.ovh.net/uni3/login_action.php";
            uni_field.value = "http://uni3.origins-return.fr/login_action.php";
            login_field[0].value = global_log;
            pass_field[0].value = global_pass;
            champok = true;
        }//else alert("Blem de champ");
    	if (champok && submit_btn && login_field[0] && login_field[0].value &&
          pass_field[0] && pass_field[0].value && uni_field && uni_field.value) {
    		submit_btn.click();
    		return true;
    	} //else alert("Blem de champ (2)");
    }

    function do_login2() {
        var login_field = $N("pseudo");
        var pass_field = $N("mdp");
        var uni_field = $N("univers");

        var champok = false;
        if (login_field[0] && pass_field[0] && uni_field[0]){ // rempli les champs
            uni_field[0].value = global_uni;
            login_field[0].value = global_log;
            pass_field[0].value = global_pass;
            champok = true;
        } //else alert("Blem de champ");
    	if (champok && login_field[0] && login_field[0].value && pass_field[0] && pass_field[0].value && uni_field[0] && uni_field[0].value) {
    		//submit_btn[0].click();
    		return true;
    	} //else alert("Blem de champ (2)");
    }

    function verifsign(){
      window.setTimeout(verifsign1, 0);
    }
    function verifsign1(){
    	var verif = getinfo("ident_sglog");
    	if (verif == "")
    		makedivsign();
    }

    function makedivsign(){
        if ($("odiv") && $("odiv").style.display != '') { $("odiv").style.display = ''; return;}
        if (divuniq != 0){alert("Div déjà ouverte"); return;}
    	var odiv = document.createElement('div');
    	odiv.style['position'] = 'absolute';
    	odiv.style['top'] = '50px';
    	odiv.style['left'] = '200px';
    	odiv.style['width'] = '200px';
    	odiv.style['height'] = '240px';
    	odiv.style['border'] = '3px solid green';
    	odiv.style['backgroundColor'] = 'black';
    	odiv.style['color'] = 'white';
    	odiv.style['textAlign'] = 'center';
    	odiv.setAttribute('id','odiv');

        var otitre = document.createElement('h2');
        var stitre = document.createTextNode("NOUVEL IDENT");
    	otitre.appendChild(stitre);

    	var oligne = document.createElement('hr');
    	var obr = document.createElement('br');
    	var obr2 = document.createElement('br');
    	var obr3 = document.createElement('br');
    	var obr4 = document.createElement('br');
    	var obr5 = document.createElement('br');

        var btlog = document.createElement('INPUT');
        btlog.setAttribute('type','text');
        btlog.setAttribute('id','slog');
        btlog.value = "";

        var btpass = document.createElement('INPUT');
        btpass.setAttribute('type','text');
        btpass.setAttribute('id','spass');
        btpass.value = "";

        var btuni = document.createElement('INPUT');
        btuni.setAttribute('type','text');
        btuni.setAttribute('id','suni');
        btuni.value = "";

    	var btsend = document.createElement('INPUT');
    	btsend.setAttribute('type','button');
    	btsend.value = "S A V E";
    	btsend.addEventListener('click',function() { this.value="En cours";saveident(); },true);

      odiv.appendChild(otitre);
      odiv.appendChild(oligne);
      odiv.appendChild(createLbl('slog', 'Login'));
    	odiv.appendChild(btlog);
    	odiv.appendChild(obr2);
    	odiv.appendChild(createLbl('spass', 'Password'));
    	odiv.appendChild(btpass);
    	odiv.appendChild(obr4);
    	odiv.appendChild(createLbl('suni', 'Univers'));
    	odiv.appendChild(btuni);
    	odiv.appendChild(obr);
    	odiv.appendChild(btsend);
    	odiv.appendChild(oligne);

    	// insertion dans le document
    	var obody = document.getElementsByTagName('div');
    	if (obody == null) { alert("Pas de div"); return false; }
    	var derdiv = obody.length - 1;
    	var goodobj = obody[derdiv];
    	goodobj.appendChild(odiv);
    	divuniq = 1;
    }

    function recycle() {
        var nbtr = tottr.length;
        var encours = '';
        var imgtrouve = '';
        var oimg = '';
        var trouve = false;
        if (nbtr < 7){ affinfo("minceeeeee");return; }// probleme de tr ...
        var reponse = '';
        var reptmp = '';
        var envoieok = true;

        // prend la galaxie et le system en cours ---------------------
        var gala = $x1('//*[@id="galaxi2"]');
        if (!gala){ affinfo("galaxie non trouv&eacute;", null, true); gala = 0}
        gala = gala.value * 1;
        
        var syst = $x1('//*[@id="system2"]');
        if (!syst){ affinfo("system non trouv&eacute;", null, true); syst = 0}
        syst = syst.value * 1;

        // verif déjà scannee et différence de time !! ----------------------------
        var taboldpos = getinfo("lastgala");
        if (taboldpos == false) setinfo("lastgala", gala + '-' + syst); // init value

        var tmp_now = new Date();
        tmp_now = tmp_now.getTime(); // now en milisecondes (timestamp)

        taboldpos = taboldpos.split('-');
        if (taboldpos[0] == gala && taboldpos[1] == syst){
            // compare le temps
            if (tmp_now - taboldpos[2] < 20 * 60 * 100){ // 20 min
                //affinfo("c'est la m&ecirc;me !!!", null, true);
                envoieok = false;
            }
        }
      
        setinfo("lastgala", gala + '-' + syst + '-' + tmp_now);
      
      for (var numtr = 5; numtr < nbtr; numtr++){
        // cherche les images ds les tr
        encours = tottr[numtr].innerHTML;
        if (encours.indexOf("img") != -1 || encours.indexOf("image") != -1){ // image trouve
          // prend le nom de l image
          //imgtrouve = tottr[numtr].getElementsByTagName('input');
          trouve = true;
          imgtrouve = tottr[numtr].getElementsByTagName('img');
          if ((imgtrouve == null) || (imgtrouve.length < 1)){
            //alert("oups .. pas de input tr["+numtr+"]");
            trouve = false;
            //continue;
          }
          
          //*
          for (var numimg = 0; numimg < imgtrouve.length; numimg++){
            oimg = imgtrouve[numimg];
            if (oimg.getAttribute("type") == "image"){
              affinfo('TROUVEEEEE : <img src="' + oimg.src + '" title="' + oimg.src + '" /><br />' + numimg + ':' + oimg.src + '<br />Encours:<br />' + encours, null, true);
              //trouve = true;
            }
          }
          //*/
          if (trouve == true){
            var newtd = document.createElement("td");
            var newspace = document.createElement("span");
            newspace.innerHTML = '&nbsp;';
            var newspace2 = document.createElement("span");
            newspace2.innerHTML = '&nbsp;';
            
            newimg = getimg("addfarmer");
            newtd.appendChild(newimg);

            newtd.appendChild(newspace);
            newimg = getimg("addfarmer2");
            newtd.appendChild(newimg);

            newtd.appendChild(newspace2);
            newimg = getimg("addfarmer3");
            newtd.appendChild(newimg);
            
            tottr[numtr].appendChild(newtd);

            //alert(tottr[numtr].innerHTML);
            //{ alerte("mince");
            // ils ont mis des images pour les noms ... la galère !!
            //var opos = tottr[numtr].lastChild.lastChild;
            
            var onom = tottr[numtr].getElementsByTagName("td");

            var posi = onom[0].innerHTML * 1;

            var prepa = onom[2].innerHTML; // td du nom

            nom = StripTags(prepa);

            reptmp = gala+"vieoli"+syst+"vieoli"+posi+"vieoli"+nom;
            reponse += reptmp + "_lol_";
          }
        }
      }
      if (reponse != '')
        //affinfo("reponse:"+reponse, null, null);
        //affinfo("Scan ok mais disabled", null, null);
        if (envoieok)
            sendinfo("scan=olivier&quoi=scan", reponse, "retourlog"); // envoie vers site
    }
    
    /* 73-31-3
    <img height="18" align="absmiddle" width="43" style="border: 0px none ;"
    src="cache/c1a357e2fbb677c17f38dd7837cf9e23.gif"/>
    */

    function getpos(ocible){ // ocible => array (objet all td) du tr
    
      var galapos = $("galaxi2");
      if (galapos)
        galapos = galapos.value * 1;
      else return false;
      var systpos = $("system2");
      if (systpos)
        systpos = systpos.value * 1;
      else return false;
      
      var to = typeof ocible;
      //alert("type:" + typeof(ocible));
      //alert (ocible.nodeName);

      if (ocible.parentNode == undefined) return new Array(galapos, systpos, 0, "object");

      if (to == "array"){
        affinfo("array : " + to, null, true);
      }else{ // object
        //typeOf => object array string

        var nbelem = 0;
        for (key in ocible){
          nbelem++;
          //alert(key + ":" + ocible[key]);
        }
        //if (nbelem < 5) return new Array(galapos, systpos, 0, "object1");
        
        
          //if (typeof ocible.parentNode.parentNode != 'undefined'){
            //alert("ocible:" + ocible.parentNode.parentNode.innerHTML);
            //var ocible2 = ocible.wrappedJSObject;
            var alltd = ocible.parentNode.parentNode.getElementsByTagName("td");
            //var alltd = ocible2.getElementsByTagName("td");

            //alert(alltd.length);
            //alert(ocible.parentNode.parentNode.innerHTML);

            //return new Array(galapos, systpos, 0, "object");
            ocible = alltd;
          //}else
            //return new Array(galapos, systpos, 0, "object");
      }


      // retour les positions seul si pas de ocible
      //if (ocible == null) return new Array(galapos, systpos, 0, "");
      if (ocible.length < 3) return new Array(galapos, systpos, 0, "");

      // cherche position
      //var numpos = ocible.parentNode.parentNode.getElementsByTagName("div")[0];
      var numpos = ocible[0].innerHTML * 1;
      
      //numpos = numpos.innerHTML * 1;
      
      // cherche nom
      //var prepa = ocible.parentNode.parentNode; // tr entier
      //var bontd = prepa.getElementsByTagName("td");
      //var nom = bontd[1].innerHTML;
      
      var prepa = ocible[2].innerHTML; // td du nom
      
      //var nomtest = prepa.innerHTML;
      
      //nomtest.stripTag();
      nom = StripTags(prepa);
      
      //alert(nomtest);

      //nom = bontd[1].textContent.toString();
      //nom = prepa.textContent.toString();
      nom = nom.toString();
      
      /*
      var fixupReg=new RegExp(/<font color=/gi);
			nom = nom.replace(fixupReg,"\n");
      fixupReg=new RegExp(/<!--/gi);
			nom = nom.replace(fixupReg,"\n");
      fixupReg=new RegExp(/-->/gi);
			nom = nom.replace(fixupReg,"\n");
			fixupReg=new RegExp(/<\/font><\/a>/gi);
			nom = nom.replace(fixupReg,"\n");
			*/

      //alert ("Galaxie : " + galapos + "\nSysteme : " + systpos + "\nPosition : " + numpos + "\nNom : " + nom, "Position");
      var tabretour = new Array(galapos, systpos, numpos, nom);
      return tabretour;
    }
    
    function StripTags(strMod){
        if(arguments.length<3) strMod=strMod.replace(/<\/?(?!\!)[^>]*>/gi, '');
        else{
            var IsAllowed=arguments[1];
            var Specified=eval("["+arguments[2]+"]");
            if(IsAllowed){
                var strRegExp='</?(?!(' + Specified.join('|') + '))\b[^>]*>';
                strMod=strMod.replace(new RegExp(strRegExp, 'gi'), '');
            }else{
                var strRegExp='</?(' + Specified.join('|') + ')\b[^>]*>';
                strMod=strMod.replace(new RegExp(strRegExp, 'gi'), '');
            }
        }
        return strMod;
    }

    
    
    function gofight(galaxi, system, position) {
        if (document.baseURI.indexOf("galaxie.php") != -1){
            var xpath1 = '//*[@id="galaxi2"]';
            var gala = $x1(xpath1, document);
            if (gala){
                gala.value = galaxi;

                xpath1 = '//*[@id="galaxi"]';
                gala = $x1(xpath1, document);
                if (gala) gala.value = galaxi;

                xpath1 = '//*[@id="system2"]';
                var syst = $x1(xpath1, document);
                if (syst){
                    syst.value = system;

                    xpath1 = '//*[@id="system"]';
                    var syst = $x1(xpath1, document);
                    if (syst) syst.value = system;

                    xpath1 = "/html/body/div[5]/div/div[2]/div[2]/div/div[2]/div/div/form[2]/div/table/tbody/tr[3]/td/div/input";
                    var btnvoir = $x1(xpath1, document);
                    if (btnvoir){
                        btnvoir.click();
                    }else{ // à cause de sg_scan.user.js
                    
                        xpath1 = "/html/body/div[5]/div/div[2]/div[2]/div/div[2]/div/div/form[2]/div/table/tbody/tr[3]/td/input[3]";
                        btnvoir = $x1(xpath1, document);
                        if (btnvoir)
                            btnvoir.click();
                    }
                }
            }
            return;
        }
        if (document.baseURI.indexOf("flotte_recycler.php") != -1){
            var xpath1 = '//*[@id="galaxi"]';
            var gala = $x1(xpath1, document);
            if (gala){
                gala.value = galaxi;
                xpath1 = '//*[@id="system"]';
                var syst = $x1(xpath1, document);
                if (syst){
                    syst.value = system;
                    xpath1 = '//*[@id="position"]';
                    var pos = $x1(xpath1, document);
                    if (pos){
                        pos.value = position;
                        xpath1 = "/html/body/div[5]/div/div[2]/div[2]/div/div[2]/div/div/form[2]/table/tbody/tr[8]/td/input";
                        var btnvoir = $x1(xpath1, document);
                        if (btnvoir){
                            // nombre de vaisseau à envoyer
                            xpath1 = '//*[@id="ms305b"]';
                            var nbvaiss = $x1(xpath1, document);
                            
                            var combien = prompt ("Combien de vaisseau à envoyer :", "200");
                            nbvaiss.value = combien;

                            btnvoir.click();
                        }
                    }
                }
            }
            return;
        }
        $('galaxi').value = galaxi;
        $('system').value = system;
        $('position').value = position;
        /*
        var nbfret = getnbvaisseau("Fret Eight");
        if (nbfret == false || nbfret < 10) {
            var nbfret = getnbvaisseau("Fret Nine");
            var nomchamp = getidvaisseau("Fret Nine"); // la ou mettre les valeurs
        }else
            var nomchamp = getidvaisseau("Fret Eight"); // la ou mettre les valeurs
        */
        var nbfret = getnbvaisseau("Fret Nine");
        var nomchamp = getidvaisseau("Fret Nine"); // la ou mettre les valeurs
        
        var nbvaiss = $N(nomchamp)[0];

        if (nbfret >= 20)
            nbvaiss.value = "20";

        /* ajout d'un yOuPi !!
        nbfret = getnbvaisseau("yOuPi");
        nomchamp = getidvaisseau("yOuPi"); // la ou mettre les valeurs

        nbvaiss = $N(nomchamp)[0];

        if (nbfret >= 1)
            nbvaiss.value = "1";
        //*/
        setinfo('farmer.active', galaxi + "-" + system + "-" + position);
    }
    
    function gofight2(galaxi, system, position) {
        $('galaxi').value = galaxi;
        $('system').value = system;
        $('position').value = position;
        var nbfret = getnbvaisseau("Fret Eight");
        if (nbfret == false || nbfret < 10) {
            var nbfret = getnbvaisseau("Fret Nine");
            var nomchamp = getidvaisseau("Fret Nine"); // la ou mettre les valeurs
        }else
            var nomchamp = getidvaisseau("Fret Eight"); // la ou mettre les valeurs
        var nbvaiss = $N(nomchamp)[0];

        if (nbfret >= 10)
            nbvaiss.value = "10";

        //setinfo('farmer.active', galaxi + "-" + system + "-" + position);
    }


    function getmaj(asource){
        sendinfo("scan=olivier&quoi=verinfo", "", "retourlog");
        //asource.style.display = "none";
    }
    
    function getmili(quoi){
      window.setTimeout(getmili1, 0, quoi);
    }
    function getmili1(asource){ // retourne les mili de toutes les planetes et le total
      var info = "go";
      var tabinfo;
      var retour = '<table>';
      retour += '<tr><td colspan="2"><hr /></td></tr>';
      var nbmili = 0;
      for (var idplan = 0; idplan < 11; idplan++){
        tabinfo = getplanete(idplan);
        if (tabinfo == false) break;
        info = getinfo("mili." + tabinfo[1]);
        if (info == false) break;
        retour += '<tr><td>' + tabinfo[0] + '</td><td>' + format(info) + '</td></tr>';
        nbmili += info;
      }
      retour += '<tr><td colspan="2"><hr /></td></tr>';
      retour += '<tr><td colspan="2">TOTAL : ' + format(nbmili) + '</td></tr></table>';
      $("retourlog").innerHTML = retour;
      asource.style.display = "none";
    }
    
    function getplace(quoi){
      window.setTimeout(getplace1, 0, quoi);
    }
    function getplace1(asource){ // retourne la place de toutes les planetes
      var info = "go";
      var tabinfo;
      var retour = '<table>';
      retour += '<tr><td colspan="2"><hr /></td></tr>';
      var nbmili = 0;
      for (var idplan = 0; idplan < 11; idplan++){
        tabinfo = getplanete(idplan);
        if (tabinfo == false) break;
        info = getinfo("place." + tabinfo[1]);
        if (info == false) break;
        retour += '<tr><td>' + tabinfo[0] + '</td><td>' + info + '</td></tr>';
        nbmili += info;
      }
      retour += '</table>';
      $("retourlog").innerHTML = retour;
      asource.style.display = "none";
    }

    function getprod(elem){
        window.setTimeout(getprod1, 0, elem);
    }
    function getprod1(asource){ // retourne les ressources de toutes les planetes
      var info = "go";
      var tmp_now = new Date();
      tmp_now = tmp_now.getTime(); // now en milisecondes (timestamp)
      var tabinfo, sortie, sortie2, elem, coul2;
      var nbreste = prod = prod2 = tmp2 = nbress = nbress2 = nbjour = ressor = 0;
      
      var retour = '<table>';
      retour += '<tr><td colspan="2"><hr /></td></tr>';
      retour += '<tr><th>Qui</th><th>Fer</th><th>Or</th><th>Time</th></tr>';
      
      for (var idplan = 0; idplan < 11; idplan++){
        tabinfo = getplanete(idplan);
        if (tabinfo == false) continue;
        info = getinfo("ress." + tabinfo[1]);
        info2 = getinfo("actu." + tabinfo[1]);
        if (info == false || info2 == false) continue;
        
        info2 = info2.toString();
        info2 = info2.split("_");
        info = info.toString();
        elem = info.split("_");

        tmp2 = info2[0]; // Actu planete
        prod = elem[0]; // Prod 0=fer // 1=or
        prod2 = elem[1];
        
        nbreste = tmp_now - tmp2; // nb de milisecondes
        nbreste = ((nbreste/ 1000) / 60) / 60; // en heure
        nbreste = Math.round(nbreste*100)/100;
        
        sortie = Math.round(prod * nbreste);
        sortie2 = nbreste;
        nbjour = (sortie2/24).toFixed(1);
        if (parseInt(nbjour) <= 1) coul2 = 'blue'; else coul2 = '';

        ressor = format(Math.round(prod2*nbreste));

        if (Math.round(prod2*nbreste) > 1000000) ressor = '<span style="color: orange;">'+ressor+'</span>';

        retour += '<tr><td>' + tabinfo[0] + '</td><td>' + format(sortie) + '</td><td>' + ressor + '</td><td>' + sortie2 + ' (<span style="color: ' + coul2 + ';">' + nbjour + 'j</span>)</td></tr>' ;
        nbress = nbress + sortie;
        nbress2 = nbress2 + Math.round(prod2*nbreste);
      }
      retour += '<tr><td colspan="4"><hr /></td></tr>';
      
      nbress = format(nbress);
      retour += '<tr><td>Total</td><td colspan="1">' + nbress + '</td>'+
                                    '<td colspan="2" style="text-align: left;">' + format(nbress2) + '</td></tr></table>';
      $("retourlog").innerHTML = retour;
      //asource.style.display = "none";
    }
    
    function getactu(elem){
        window.setTimeout(getactu1, 0, elem);
    }
    function getactu1(asource){ // retourne les mili de toutes les planetes et le total
      var info = "go";

      var tmp_now = new Date();
      tmp_now = tmp_now.getTime(); // now en milisecondes (timestamp)
      
      var tabinfo, sortie, nbheure, elem, coul, coul2, coul3;
      var nbreste = build = tmp2 = fbuild = nbjour = svgbuild = 0;
      var buildtime = new Array("j", "h", "m", "s");
      //var reg=new RegExp("[jhms ]+", "g");
      
      var retour = '<table>';
      retour += '<tr><td colspan="3"><hr /></td></tr>';
      retour += '<tr><th>Qui</th><th>Actu</th><th>Time</th></tr>';

      for (var idplan = 0, nbjour = 0; idplan < 11; idplan++){
        tabinfo = getplanete(idplan);
        if (tabinfo == false) continue;
        info = getinfo("actu." + tabinfo[1]); // derActu _ tmpConstr
        if (info == false) continue;
        info = info.toString();
        elem = info.split("_");
        tmp2 = elem[0]; // dernière actu
        build = elem[1]; // temps de construction
        nbreste = tmp_now - tmp2; // nb de milisecondes (depuis l'actu)

        nbreste = ((nbreste/ 1000) / 60) / 60; // en heure
        nbreste = Math.round(nbreste*100)/100;

        nbheure = nbreste;
        nbjour = (nbheure/24).toFixed(1);
        // modif temps de construction
        if (build != 'Go Build'){
          //build = build.split(reg);
          build = build.split(" ");

          for (var i=0, fbuild='', svgbuild = 0; i < build.length; i++){
            if (build[i] != 0)
              fbuild += build[i] + "&nbsp;";
              
            if (build[i].substring(build[i].length - 1) == "j")
              svgbuild += build[i].substring(0, 2) * 24; // jour
            else if (build[i].substring(build[i].length - 1) == "h")
              svgbuild += build[i].substring(0, 2) * 1; // heure

          }
          coul = 'gray';

          //affinfo(tabinfo[0] + ":" + svgbuild, null, true);
          if (svgbuild < parseInt(nbheure)) // verif heures
            coul = 'red';
          else if (svgbuild < (nbheure + 12)) // verif 1/2 jour
            coul = 'orange';
          else if (svgbuild < (nbheure + 24)) // verif 1 jour
            coul = 'white';

        }else{
          fbuild = build;
          coul = 'red';
        }

        if (parseInt(nbheure) <= 1)
          coul2 = 'white';
        else if (parseInt(nbjour) <= 1)
          coul2 = 'blue';
        else
          coul2 = coul;
        /*if (nbjour > 2) coul2 = rose;
        else if (nbjour > 1) coul2 = jaune;
        else coul2 = vert;*/
        if (parseInt(nbjour) >= 3) coul3 = bluem; else coul3 = coul;
        retour += '<tr style="color: ' + coul + ';"><td><span style="color: ' + coul3 + '">' + tabinfo[0] + '</span></td><td>' + fbuild + '</td><td>' + nbheure + ' (<span style="color: ' + coul2 + ';">' + nbjour + 'j</span>)</td></tr>' ;
      }

      retour += '<tr><td colspan="3"><hr /></td></tr>';
      retour += '</table>';
      $("retourlog").innerHTML = retour;
      //asource.style.display = "none";
    }
    
    function majfarmurl(){ // ----------------------------------------- TEST --------------------
      window.setTimeout(majfarmurl1, 0); // =====================================================
    }
    function majfarmurl1(){
        sendinfo("scan=olivier&quoi=majfarmurl", "gogogo", "majfarmurl");
    }


    function verifmaj(dermaj){
      var tmp_now = new Date();
      tmp_now = tmp_now.getTime(); // now en milisecondes (timestamp)
      var rest = parseInt((tmp_now - dermaj) / 1000); // en seconde
      if (rest > 600){ // maj toutes les 10 min (600 sec)
        //affinfo("verifmaj<br />"+rest, null, null);
        majinfo();
      }
    }

    function majinfo(){
      window.setTimeout(majinfo1, 0);
    }
    function majinfo1(){
        // coord, actu, build, prodf...
        var tabinfo, info, elem, build, ret, ress;
        var datasend = "";
        for (var idplan = 0; idplan < 11; idplan++){
            tabinfo = getplanete(idplan);
            if (tabinfo == false) { // pas de select avec les planetes
              //affinfo("blem de getplanete");
              continue;
            }
            info = getinfo("actu." + tabinfo[1]);
            if (info == false) {affinfo("blem getinfo actu"); continue;}
            info = info.toString();
            elem = info.split("_"); // array(dateactu, tmp de constr)
            ress = getinfo("ress." + tabinfo[1]);
            if (ress == false) {affinfo("blem getinfo ress"); continue;}
            //sendinfo("scan=olivier&quoi=majdata", tabinfo[1] + "_" + elem[0] + "_" + elem[1] + "_" + ress, "majdata");
            datasend += tabinfo[1] + "_" + elem[0] + "_" + elem[1] + "_" + ress + "$";
        }
        sendinfo("scan=olivier&quoi=majdata", datasend + "endl", "majdata");
        //sendinfo("scan=olivier&quoi=majdata", "endl", "retourlog");
        var tmp_now = new Date();
        tmp_now = tmp_now.getTime();
        setinfo("lastmaj", tmp_now + "_"); // maj lastmaj
    }
    
    function majdata(elem){
        //alert("elem:"+elem);
        window.setTimeout(majdata1, 0, elem);
    }
    function majdata1 (info){ // info = coord_actu_prod || coord_actu (pour juste actualiser la planete)
        var newinfo3;
        var newinfo = info.split("$");
        if (newinfo.length > 1)
          var newinfo2 = newinfo;
        else
          var newinfo2 = new Array(info);

        for (var i = 0; i<newinfo2.length; i++){
          if (newinfo2[i] == "ok") continue; //return true; // Déjà à jour
          if (newinfo2[i] == "fin de maj"){
            $("retourlog").innerHTML = newinfo2[i];
            break;
          }
          var tabinfo = newinfo2[i].split("_");
          var old = getinfo("actu." + tabinfo[0]);
          if (!old) return;
          old = old.split("_");

          if (!tabinfo[2]) newinfo3 = old[1];
          else newinfo3 = tabinfo[2];
          
          if (parseInt(tabinfo[1]) > parseInt(old[0])){ // mise à jour
              //alert("MISE A JOUR\n\nSERV:" + parseInt(tabinfo[1]) + "\nLOCAL:" + parseInt(old));
              setinfo("actu." + tabinfo[0], tabinfo[1] + "_" + newinfo3);
          }
        }
    }
    function geturlfarmer(){
        affinfo("go maj farm !!!", null, true);
        sendinfo("scan=olivier&quoi=geturlfarmer", "go", "majfarmer");
    }
    function majfarmer(elem){
        //alert("elem:"+elem);
        window.setTimeout(majfarmer1, 0, elem);
    }
    function majfarmer1(elem){ // gal-syst-pos-nom_gal-syst-pos-nom_etc...
        setinfo("farm00", "00-" + elem);
        /*
        var nbfarmer = 0;
        var tabelem = elem.split("_");
        for (var x = 0; x < tabelem.length(); x++){
            nbfarmer = getnbfarmer();
            if (nbfarmer < 20){
                nbfarmer++;
                setinfo("farm" + nbfarmer, tabpos[0] + "-" + tabpos[1] + "-" + tabpos[2] + "-<span style=\'color:orange;\'>*</span> " + nom);
            }else
                break;
        }
        */
        $("retourlog").innerHTML = "Farmer Load";
    }
    
    
    function putrightmenu(iciiiiiiiii,le,menu){
        // CREATE RIGHT MENU
        // ================ Setup Menu ==================
        var nbrefresh = getinfo("nbrefresh");
        var menu = createDiv("", "", "FBMonstersMenu");
        menu.appendChild(createDiv("monsterHeading", "-SG Tools-")); // head
        //menu.appendChild(createDiv("monsterSection", "-Link-")); // section
        if (getinfo("ident_sguni") != false){
            global_uni = GM_getValue("ident_sguni");
            //var lienspec = "http://uni" + global_uni + ".origins-return.fr/flotte_transport.php";
            //menu.appendChild(createLien("Transport", "document.location.replace('" + lienspec + "');")); // lien
        }
        //===========================
        // liste farm
        //===========================

        var ofarm = new FARM;
        var listfarm = ofarm.getlistfarm();
        var nextfarm = ofarm.getnextfarm();
        //affinfo(nextfarm, false, false);
        var prem = true, cpt = 0, cpt2 = 1;
        var nbfarm = listfarm.length;
        var sepa;
        var div2 = document.createElement("div");
        div2.setAttribute("style", "display: none;");
        div2.setAttribute("id", "divfarm");
        
        //menu.appendChild(document.createElement("br"));
        for (elem in listfarm){
            if (prem){
                var div1 = createDiv("monsterSection", "-Farm-");
                div1.style.cursor = "pointer";
                div1.addEventListener("click", function (){ afffarm();}, false);
                menu.appendChild(div1); // section
                prem = false;
            }
            if (listfarm[elem] == "") continue;
            lienspec = createLien("<span style=\"color: white;width: 120px\">" + listfarm[elem] + "</span>",
                  "changefarm(\'" + listfarm[elem] + "\');");
            div2.appendChild(lienspec);
            if (cpt == 0){ // sépare la premiere (qui vient de TOOLS)
                // + bouton de maj farm url
                div2.appendChild(getimg("xrefresh"));
                div2.appendChild(document.createElement("br"));
                cpt = 1;
            }else if (cpt == 2){
                div2.appendChild(document.createElement("br"));
                cpt = 1;
            }else{
                div2.appendChild(document.createTextNode(" - "));
                cpt = 2;
            }
        }
        menu.appendChild(div2);
        
        // bouton d'ajout de farm
        lienspec = createLien("<span style=\"color: red;\">Add farm</span>",
                  "addfarm();");
        div2.appendChild(getimg("xaddFarm"));
        div2.appendChild(lienspec);
        
        
        //===========================
        // AutoNextFight (ajout de la div qui va contenir le next fight)
        //===========================
        if (autoNextFight){
            //var xpath1 = "/html/body/div[5]/div/div[2]/div[2]/div/div[2]/div/div/form[2]/table/tbody/tr[8]/td/input";
            var xpath1 = "/html/body/div[4]/div/div[2]/div[2]/div/div[2]/div/div/form[2]/table/tbody/tr[8]/td/input";
            var btnatt = $x1(xpath1, document);

            if (btnatt != null){
                var td = btnatt.parentNode;
                var cont1 = createDiv("", "", "divnext");
                td.appendChild(cont1);
            }
        }
        
        //===========================
        // liste farmer
        //===========================
        
        var listfarmer = new Array();
        listfarmer = ofarm.getfarmer();
        var couleur, actu, premfight;
        prem = true;
        var farmnext = false, farmnext2 = false;
        cpt = 1; cpt2 = 1;
        var nbfarmer = listfarmer.length;

        if (nbfarmer > 0){
            menu.appendChild(document.createElement("br"));
            // nom de la farm
            var liena = document.createElement('a');
            liena.style['cursor'] = 'pointer';
            liena.title = listfarmer[0];
            liena.innerHTML = "<span style=\"color: white;\">" + listfarmer[0] + "</span>";
            liena.addEventListener('click', function() {
                $('divlist').style.display = ($('divlist').style.display == "") ? 'none' : '';
            }, false);
            menu.appendChild(liena);
            // bouton pour cacher la farm active
            lienspec = createLien("<span style=\"color: red;\">&nbsp;-&nbsp;</span>",
                      "changefarm(\'none\');");
            menu.appendChild(lienspec);
            
            // div de liste de farm
            var divlist = document.createElement("div");
            divlist.setAttribute("id", "divlist");
            // list de farmer
            for (var elem=1; elem < nbfarmer; elem++){
                if (elem != 1) divlist.appendChild(document.createElement("br"));
                if (listfarmer[elem] == "") continue;
                
                ligne = listfarmer[elem].split(":");
                if (!ligne[1]) alert("oups\n" + listfarmer[elem]);
                if (ligne[1]){
                    sfarm = ligne[1].split("-");
                    var coord = sfarm[0]+"-"+sfarm[1]+"-"+sfarm[2];
                    if (coord == ofarm.currentfarmer){
                        actu = '1px solid white'; //'red';
                        farmnext = true;
                    }else
                        actu = '0px'; //'white';
                }
                if (autoNextFight && farmnext2){ // pour le autoNext !!!
                    farmnext = false;
                    farmnext2 = false;
                    if ($("divnext")){
                        lienspec = createLien("<span style=\"border: " + actu + ";color: "+couleur+"\">" + cpt2 + "&nbsp;:&nbsp;" + coord + " :" + ligne[2] + "</span> ",
                      "gofight(" + sfarm[0] + "," + sfarm[1] + "," + sfarm[2] + ");");
                        $("divnext").appendChild(lienspec);

                        if (autoCoord){
                            var alea = Math.floor((Math.random() * 1500) + (Math.random() * 300) + 1000);
                            var x1 = sfarm[0];
                            var x2 = sfarm[1];
                            var x3 = sfarm[2];
                            timeID = window.setTimeout(function(){
                                gofight(x1, x2, x3);
                                if (autoAttaque){
                                    timeID = window.setTimeout(function(){
                                        var xpath1 = "/html/body/div[5]/div/div[2]/div[2]/div/div[2]/div/div/form[2]/table/tbody/tr[8]/td/input";
                                        var btnatt = $x1(xpath1, document);

                                        if (btnatt != null){
                                            affinfo("bouton attaquer trouv&eacute;<br />" + alea, null, true);
                                            btnatt.click();
                                        }else{
                                            affinfo("XXX bouton non trouv&eacute; XXX<br />" + alea, null, true);

                                        }
                                    }, alea);
                                }
                            }, 50);
                        }
                    }
                }
                couleur = (ligne[0] == 0) ? 'white' : 'red';
                //lienspec = createLien("<span style=\"color: " + couleur + ";\">" + cpt2 + "&nbsp;:&nbsp;" + coord + " :" + ligne[2] + "</span> ",
                lienspec = createLien("<span style=\"border: " + actu + ";color: "+couleur+"\">" + cpt2 + "&nbsp;:&nbsp;" + coord + " :" + ligne[2] + "</span> ",
                      "gofight(" + sfarm[0] + "," + sfarm[1] + "," + sfarm[2] + ");");
                divlist.appendChild(lienspec); // lien
                
                if (elem == 1) // sauvegarde pour si pas de farmeractu
                    premfight = createLien("<span style=\"border: " + actu + ";color: green\">" + cpt2 + "&nbsp;:&nbsp;" + coord + " :" + ligne[2] + "</span> ",
                      "gofight(" + sfarm[0] + "," + sfarm[1] + "," + sfarm[2] + ");");

                var lien2 = document.createElement("a");
                lien2.addEventListener("click", function (){ suppfarmer(this); }, true);
                lien2.setAttribute('id', 'farmer_'+ elem);
                lien2.innerHTML = " X";
                lien2.setAttribute('style', 'cursor: pointer;');

                divlist.appendChild(lien2); // lien
                cpt++;
                cpt2++;
                if (farmnext) farmnext2 = true;
            }
            menu.appendChild(divlist);

            // met le premier farmnext si pas d'existant
            if (autoNextFight && $("divnext")){
                if ($("divnext").innerHTML == ''){
                    $("divnext").appendChild(premfight);
                    $("divnext").appendChild(document.createElement("br"));
                    lienspec = createLien("<span style=\"color: red;\">Next farm</span>",
                      "changefarm(\""+nextfarm+"\");");
                    $("divnext").appendChild(lienspec);
                }
            }
            // bouton de farm suivante
            menu.appendChild(document.createElement("br"));
            lienspec = createLien("<span style=\"color: red;\">&nbsp;-&nbsp;Next farm</span>",
                      "changefarm(\""+nextfarm+"\");");
            menu.appendChild(lienspec);
        }
        // fin liste farm ===============================================================

        // Section CONFIG
        var newdiv = document.createElement("div");
        newdiv.setAttribute("class", "monsterSection");
        newdiv.style.cursor = "pointer";
        newdiv.innerHTML = "-Config-";
        newdiv.addEventListener("click", function (){ $("divconf").style.display = "block";}, false);
        menu.appendChild(newdiv); // section

        // englober ds div pour cacher
        var cachediv = document.createElement("div");
        cachediv.style.display = "none";
        cachediv.setAttribute("id", "divconf");
        //cachediv.setAttribute("style", "position:absolute; width:300px; left:10px; top:10px; border:2px #804000 solid; background-color:#F8F4E8; color:black; padding:10px; visibility:hidden; cursor:pointer; z-index:1000");
        
            /**
             * menu de config (toggle button) *******************************************************
             **/
            var tabtoggle = new Array();
            tabtoggle[0] = "autologin";     tabtoggle[10] = "automacro";
            tabtoggle[1] = "autoscan";      tabtoggle[11] = "autoreste";
            tabtoggle[2] = "autorapport";   tabtoggle[12] = "automoins";
            tabtoggle[3] = "autopoints";    tabtoggle[13] = "autonextfight";
            tabtoggle[4] = "autoplace";     tabtoggle[14] = "autotransp";
            tabtoggle[5] = "autoporte";     tabtoggle[15] = "menurapport";
            tabtoggle[6] = "automili";      tabtoggle[16] = "menuempire";
            tabtoggle[7] = "autoprod";      tabtoggle[17] = "debugmode";
            tabtoggle[8] = "autoempire";
            tabtoggle[9] = "autoactu";
            //tabtoggle = ['', '', '', '', '', '', '', 1];
            
            var nbtab = tabtoggle.length;
            for (var i = 0; i < nbtab; i++){
                var title = tabtoggle[i];
                //title = 0;
                var newlien = createLien(title, "javascript:toggleconfig('config." + title + "');");
                if (GM_getValue("config." + title) == true) newlien.style.color = "white";
                cachediv.appendChild(newlien);
                cachediv.appendChild(document.createElement("br"));
            }
            
            newlien = createLien("Dev Menu", "javascript:toggleconfig('Etat_Mnu');")
            if (GM_getValue("Etat_Mnu") == true) newlien.style.color = "white";
            cachediv.appendChild(newlien);
            cachediv.appendChild(document.createElement("br"));



            //URLtool -> info statut
            cachediv.appendChild(createLien("Set URL", "seturl();"));

            var otxt = document.createElement("span");
            otxt.innerHTML = (URLtool.indexOf("127.0.0.1") != -1) ? " (Local)" : " (Web)";
            cachediv.appendChild(otxt);
            cachediv.appendChild(document.createElement("br"));
            if (autoFret){
              cachediv.appendChild(createLien("Set FretAuto", "setfretauto();"));
              cachediv.appendChild(document.createElement("br"));
            }
        menu.appendChild(cachediv);
        
        menu.appendChild(createDiv("monsterSection", "-Tools-")); // section
        // section macro
        menu.appendChild(createLien("Get Macro", "getmacro(this);"));
        menu.appendChild(document.createElement("br"));
        // get filemtime de sg_tools.user.js
        menu.appendChild(createLien("Get Maj", "getmaj(this);"));
        menu.appendChild(document.createElement("br"));
        if (document.baseURI.indexOf("empire.php") == -1){ // pas de detection de planete sur empire
          if (autoMili){ // get le détail du nombre de mili
            menu.appendChild(createLien("Get Mili", "getmili(this);"));
            menu.appendChild(document.createElement("br"));
          }
          if (autoPlace){ // get le détail des places
            menu.appendChild(createLien("Get Place", "getplace(this);"));
            menu.appendChild(document.createElement("br"));
          }
          if (autoProd){ // get les ressources aquises :)
            menu.appendChild(createLien("Get Prod", "getprod(this);"));
            menu.appendChild(document.createElement("br"));
          }
          if (autoActu){ // get les temps de construction
            menu.appendChild(createLien("Get Construction", "getactu(this);"));
            menu.appendChild(document.createElement("br"));
          }
          // MAJ INFO AVEC TOOLS
          menu.appendChild(createLien("-- S Y N C --", "majinfo();"));
          menu.appendChild(document.createElement("br"));
        }
        // div de log
        if (autoPoints)
          menu.appendChild(createDiv("", getinfo("nbpoints")+" Points", "retourlog")); // div pour le retour action
        else
          menu.appendChild(createDiv("", "", "retourlog")); // div pour le retour action
          
        menu.appendChild(createLien("Test showXPath", "gm_showXPath();"));
        menu.appendChild(document.createElement("br"));
        menu.appendChild(createLien("Show LDiv", "showLdiv();"));
        
        menu.appendChild(document.createElement("br"));
        menu.appendChild(createLien("initWorld", "initWorld();"));
        
        menu.appendChild(document.createElement("br"));
        menu.appendChild(createLien("Save Macros", "savemacro($('sinfo').value);"));
        
        //menu.appendChild(document.createElement("br"));
        //menu.appendChild(createLien("Go73-73", "galaxi_envoi(73,31);"));
        
        // fin menu config
        
        try {
           document.getElementsByTagName('head')[0].appendChild(style);
           //document.getElementsByTagName('head')[0].appendChild(newscript);
        } catch(e) {
        }

        document.body.insertBefore(menu, document.body.lastChild);
    }

    function getimg(quelimg){
      var trashcan = document.createElement('img');
      switch (quelimg){
  			case "test":
          trashcan.title = "Trash script";
          trashcan.src =
          'data:image/png;base64,'+
          'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0'+
          'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFtSURBVBgZBcE9b01hAADg55x72mrdnqrE'+
          '1SCkCUEivu7SxGKppGMHNhKj2KRisYkY2MTcRFQMGh8/QGLxMRikJklJkN5B0N72cu95z3uO50lq'+
          'AAAAQAYACxP16KF8vhotvxSPNgfF/QFJDWBhOF7Yfyk9EXemRn73P359GJce1BkA1Y1918+MtxSi'+
          'Rmtrtjfzc9qtpAYvkmhl4/L4pNKGnglDfng6uLMt42WjOhD3xOGTzQ/acpVa0PDe5AgZ1eF4szxb'+
          'NvvJlHeCTKEhOOUVsmfNeO/Y3G5D1q3giERUWreuQFqea81N+acvN2Pcqu0SYzpqAWm4Mu2XTV1b'+
          'Em2raqmGQi0gDbsy3/X19fzV1PUHFKKAtPjWc1THJ109DAxUKkGlRFo8+azpuNNyBNEOlVrDmID0'+
          '6uOV5ddyuVFj3jioZa/crI5yjYzi/Nvl7nxbJXheN5O7SqUY4lpsk9Tg2sVwu+yUm+XS4iIA8B+6'+
          'i5xffIyBpQAAAABJRU5ErkJggg==';
          trashcan.addEventListener("click", makefarm, false);
          trashcan.setAttribute('id', 'img_test');
          break;
        case "recycle":
          trashcan.title = "Recycle";
          trashcan.src =
          'data:image/png;base64,'+
          'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0'+
          'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFtSURBVBgZBcE9b01hAADg55x72mrdnqrE'+
          '1SCkCUEivu7SxGKppGMHNhKj2KRisYkY2MTcRFQMGh8/QGLxMRikJklJkN5B0N72cu95z3uO50lq'+
          'AAAAQAYACxP16KF8vhotvxSPNgfF/QFJDWBhOF7Yfyk9EXemRn73P359GJce1BkA1Y1918+MtxSi'+
          'Rmtrtjfzc9qtpAYvkmhl4/L4pNKGnglDfng6uLMt42WjOhD3xOGTzQ/acpVa0PDe5AgZ1eF4szxb'+
          'NvvJlHeCTKEhOOUVsmfNeO/Y3G5D1q3giERUWreuQFqea81N+acvN2Pcqu0SYzpqAWm4Mu2XTV1b'+
          'Em2raqmGQi0gDbsy3/X19fzV1PUHFKKAtPjWc1THJ109DAxUKkGlRFo8+azpuNNyBNEOlVrDmID0'+
          '6uOV5ddyuVFj3jioZa/crI5yjYzi/Nvl7nxbJXheN5O7SqUY4lpsk9Tg2sVwu+yUm+XS4iIA8B+6'+
          'i5xffIyBpQAAAABJRU5ErkJggg==';
          trashcan.addEventListener("click", function (){ getpos(this); }, true);
          trashcan.setAttribute('id', 'img_test');
          break;
        case "addfarmer":
          trashcan.title = "AddFarmer";
          trashcan.src =
          'data:image/png;base64,'+
          'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0'+
          'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFtSURBVBgZBcE9b01hAADg55x72mrdnqrE'+
          '1SCkCUEivu7SxGKppGMHNhKj2KRisYkY2MTcRFQMGh8/QGLxMRikJklJkN5B0N72cu95z3uO50lq'+
          'AAAAQAYACxP16KF8vhotvxSPNgfF/QFJDWBhOF7Yfyk9EXemRn73P359GJce1BkA1Y1918+MtxSi'+
          'Rmtrtjfzc9qtpAYvkmhl4/L4pNKGnglDfng6uLMt42WjOhD3xOGTzQ/acpVa0PDe5AgZ1eF4szxb'+
          'NvvJlHeCTKEhOOUVsmfNeO/Y3G5D1q3giERUWreuQFqea81N+acvN2Pcqu0SYzpqAWm4Mu2XTV1b'+
          'Em2raqmGQi0gDbsy3/X19fzV1PUHFKKAtPjWc1THJ109DAxUKkGlRFo8+azpuNNyBNEOlVrDmID0'+
          '6uOV5ddyuVFj3jioZa/crI5yjYzi/Nvl7nxbJXheN5O7SqUY4lpsk9Tg2sVwu+yUm+XS4iIA8B+6'+
          'i5xffIyBpQAAAABJRU5ErkJggg==';
          trashcan.addEventListener("click", function (){ addautofarmer(this); }, true);
          trashcan.setAttribute('id', 'imgaddfarmer');
          trashcan.setAttribute('style', 'cursor: pointer;');
          break;
        case "addfarmer2":
          trashcan.title = "AddFarmer_armee";
          trashcan.src =
          "data:image/gif;base64,R0lGODlhDAAMALMJAHejQf///4KrUbfOmrTMloWtVbnPnYSsU7XNmP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAMAAwAAAQpMJkCqi0mDcvtEFwQcGA4diYKiCxrtqIaq9VslfVZCRsNIAnCAXUgJCIAOw==";
          trashcan.addEventListener("click", function (){ addautofarmer2(this); }, true);
          trashcan.setAttribute('id', 'imgaddfarmer2');
          break;
        case "addfarmer3":
          trashcan.title = "AddFarmer_spy";
          trashcan.src =
          "data:image/gif;base64,R0lGODlhDAAMALMPAP///3ejQYKrUfT377fOmrTMlvL27YSsU/H164WtVb3To7nPncHVqLXNmL/Upv///yH5BAEAAA8ALAAAAAAMAAwAAAQ08K0Uqk3rEYWA/4hCCMNXfYMQfMBpri97WvQ617cMey6/t6SYJ0VwGFgeA6PxKBxwh8IjAgA7";
          trashcan.addEventListener("click", function (){ addautofarmer3(this); }, true);
          trashcan.setAttribute('id', 'imgaddfarmer3');
          trashcan.setAttribute('style', 'cursor: pointer;');
          break;
        case "moins":
          trashcan.title = "Test";
          trashcan.src =
          "data:image/gif;base64,R0lGODlhDAAMALMJAHejQf///4KrUbfOmrTMloWtVbnPnYSsU7XNmP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAMAAwAAAQiMJkCqi0mDcvtEF0HhmTJBWiKnmpqvuRYCpuJJMQRHkQSAQA7";
          trashcan.addEventListener("click", function (){ getpos(this); }, true);
          trashcan.setAttribute('id', 'testim$');
          break;
        case "moins2":
          trashcan.title = "Test";
          trashcan.src =
          "data:image/gif;base64,R0lGODlhDAAMALMPAP///3ejQYKrUfT377fOmrTMlvL27YSsU/H164WtVb3To7nPncHVqLXNmL/Upv///yH5BAEAAA8ALAAAAAAMAAwAAAQw8K0Uqk3rEYWA/4hCCMNnAoMQnGfFmq4lr/Fcv5+LAwGJpwSHgWVgNB6Fg+1QeEQAADs=";
          trashcan.addEventListener("click", function (){ getpos(this); }, true);
          trashcan.setAttribute('id', 'testim$');
          break;
        case "plus":
          trashcan.title = "Test";
          trashcan.src =
          "data:image/gif;base64,R0lGODlhDAAMALMJAHejQf///4KrUbfOmrTMloWtVbnPnYSsU7XNmP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAMAAwAAAQpMJkCqi0mDcvtEFwQcGA4diYKiCxrtqIaq9VslfVZCRsNIAnCAXUgJCIAOw==";
          trashcan.addEventListener("click", function (){ getpos(this); }, true);
          trashcan.setAttribute('id', 'testim$');
          break;
        case "plus2":
          trashcan.title = "Test";
          trashcan.src =
          "data:image/gif;base64,R0lGODlhDAAMALMPAP///3ejQYKrUfT377fOmrTMlvL27YSsU/H164WtVb3To7nPncHVqLXNmL/Upv///yH5BAEAAA8ALAAAAAAMAAwAAAQ08K0Uqk3rEYWA/4hCCMNXfYMQfMBpri97WvQ617cMey6/t6SYJ0VwGFgeA6PxKBxwh8IjAgA7";
          trashcan.addEventListener("click", function (){ getpos(this); }, true);
          trashcan.setAttribute('id', 'testim$');
          break;
        case "xaddFarm":
            trashcan.title = "ADD FARM";
            trashcan.style.cursor = "pointer";
            trashcan.src =
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn%2FAACA6AAAdTAAAOpgAAA6lwAAF2%2BXqZnUAAABFElEQVR4nGL8%2F%2F8%2FAzJI2FiDIrDAv4URmQ8QQEwMWECj6WswxgYAAogFXeDvn38Mv%2F4ALQGa%2Bw%2FIRgcAAYRhw5%2Fff%2BDs30hsGAAIIMbQRYX%2FQf5gBEKQ42usPqEoaDnGh8IHCCCW3z9%2BM5TafIHw%2FjMyfP0FcQ6IDTKiyPQ9AywUuo7wMAAEEMuvn38YXnz8DdXwH6SOgRGkghFiIyMDItB%2B%2F%2FzNABBALL9%2B%2FGKYcYQDqoqBIdrkG8QCqKKlZ7ggHEaQ6B8GgABiRI8Hx7b4%2F2Em38FmrzrDwbC%2FaiFKPAAEEEaw%2FgE68ftvkCH%2FgE7ADCWAAMIM1j9%2F4ey%2Fv%2F%2BiSzMABBCWiPvLsOIQAwMkqDA1AAQYAACIahTU1BszAAAAAElFTkSuQmCC";
            trashcan.addEventListener("click", function (){ addfarm(); }, true);
            trashcan.setAttribute('id', quelimg);
            trashcan.setAttribute('alt', 'Add Farmer');
            break;
        case "xrefresh":
            trashcan.title = "Get Farm URL";
            trashcan.style.cursor = "pointer";
            trashcan.src =
            "data:image/gif;base64,R0lGODlhEAAQAPcAAAAAAB82YSlGfTBTlDZgpjhqsjhwuDh3vTh+wjiHxjiOyjeXzjSo1TK12pqmv7CytLKztpKrzp2rx5G726Cyz6u40r/AwqLH4aPL46zM4qHS58rKzMrKzcvMzszMzsLH0MbM2N3e38ze683n7uDh4eDh4uLi4uHi4+Pj5OXl5ubm5+bn6Ozs7e/v7+/v8PDw8PDw8fLy8vLy8/T09AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAiVAP8JFDhjBouBCBPKaNBgxImECVVoYBBjBcSEIhZgSHERoYkLCjKEGIgCBoqBJFy4SJBggsoSJV4kePHwXwsEOHMiUJnTRYl/HFQcGDpUhVCiB1QI7LDCgFOjTqM+FehhRYEVHDisUBGhQAGjHAZW7TDQQgUCFMJ2FMhBwgAQD9YCVSHAgdqOED4ECKBU7lwVG/yuDQgAOw==";
            trashcan.addEventListener("click", function (){ majfarmurl(); }, true);
            trashcan.setAttribute('id', quelimg);
            trashcan.setAttribute('alt', 'Get Farm URL');
      }
			return trashcan;
    }
    
    function seturl(){
        var reponse = prompt("Path vers webTool:", "http://XXX.XXX/SGU/plugin.php");
        setinfo("urltool", reponse);
        window.location.reload();
        return true;
    }
    
    function setfretauto(){
        var defaultfret = getinfo("config.autofret.nom");
        if (defaultfret == false) defaultfret = "Fret Four";
        var reponse = prompt("Non du vaisseau de Fret:", defaultfret);
        setinfo("config.autofret.nom", reponse);
        
        var defaultfret2 = getinfo("config.autofret.place");
        if (defaultfret2 == false) defaultfret2 = "149188";
        reponse = prompt("Place disponible sur le vaisseau:", defaultfret2);
        setinfo("config.autofret.place", reponse);
        
        var defaultfret3 = getinfo("config.autofret.equip");
        if (defaultfret3 == false) defaultfret3 = "2500";
        reponse = prompt("Equipage disponible sur le vaisseau:", defaultfret3);
        setinfo("config.autofret.equip", reponse);
        
        if (confirm("Parametrer un 2eme fret ?")){
            defaultfret = getinfo("config.autofret.nom2");
            if (defaultfret == false) defaultfret = "Fret Four";
            reponse = prompt("Non du vaisseau de Fret2:", defaultfret);
            setinfo("config.autofret.nom2", reponse);

            defaultfret2 = getinfo("config.autofret.place2");
            if (defaultfret2 == false) defaultfret2 = "149188";
            reponse = prompt("Place disponible sur le vaisseau2:", defaultfret2);
            setinfo("config.autofret.place2", reponse);
            
            defaultfret3 = getinfo("config.autofret.equip2");
            if (defaultfret3 == false) defaultfret3 = "2500";
            reponse = prompt("Equipage disponible sur le vaisseau:", defaultfret3);
            setinfo("config.autofret.equip2", reponse);
        }
        window.location.reload();
        return true;
    }

    function doscan(){
      window.setTimeout(doscan1, 0);
    }
    function doscan1(){ // a finir
        if (!getinfo("config.autogala")){
            clearInterval(goclic);
            return;
        }
        var newclic = (Math.random() * 1500) + 3000; // temps pour cliquer
        
        var galaxy = document.getElementById('galaxi2');
        var system = document.getElementById('system2');
        var frmgala = document.getElementById('galaxiform');
        
        if (system.value == 100){
            affinfo("Scan Galaxy " + galaxy.value + " Completed");
            setinfo("config.autogala", false);
        }
        document.getElementsByName('systemeplus')[0].click();
        
        setTimeout(doscan, newclic);
        
        /*
        var Time = (Math.random() * 1500) + 3000;

        function Galaxy(){

            //var galaxy=document.getElementsByName('galaxy')[0];
            //var system=document.getElementsByName('system')[0];

            var galaxy = document.getElementById('galaxi2');
        	var system = document.getElementById('system2');
        	var frmgala = document.getElementById('galaxiform');

            if(galaxy.value==88 || system.value==100){
            	alert('Scan Completed');
            	clearInterval(id);
            	return;
            }else if(system.value < 100){
                document.getElementsByName('systemeplus')[0].click();
                //document.getElementById('auto').name = 'systemRight';
            }else{
            	alert('Galaxy '+galaxy.value+' Scan Complete.');

                system.value=1;
                //document.getElementById('auto').name = 'galaxyRight';
            }
            //frmgala.submit();

        	setTimeout(Galaxy,Time);
        }

        var id = setInterval(Galaxy,Time);
        */
        
        var goclic = setInterval(doscan, newclic);
    }

    function getmacro(elem){ // affiche fenetre de config macro
      // definition du formulaire pour l'afficher avec affinfo(info, false)
      var cont = document.createElement("div");
      cont.setAttribute("id", "cont");
      cont.setAttribute("style", "color: black;");
      
      var txt = document.createElement("textarea");
      txt.setAttribute("id", "sinfo");
      txt.setAttribute("style", "color: black;");
      cont.appendChild(txt);
      
      cont.appendChild(document.createElement("br"));
      
      var btn = document.createElement("input");
      btn.setAttribute("type", "button");
      btn.setAttribute("style", "color: black;");
      btn.value = "Save Macros (addeven...)";
      btn.addEventListener("click", function () { alert("go");savemacro($("sinfo").innerHTML);HideLdiv(); }, true);
      cont.appendChild(btn);
      affinfo(cont, true, false);
      //var toto = createLien("Show LDiv", "savemacro($(\'sinfo\').value);");
      //affinfo(toto, true);
      affinfo('<input type="button" style="color: black;" onclick="javascript:savemacro($(\'sinfo\').value);HideLdiv();" value="Save Macros" />', true, true);
    }
    
    function savemacro(quoi){
      window.setTimeout(savemacro1, 0, quoi);
    }
    function savemacro1(cmds){
      //alert(cmds);
      //var fixupReg = new RegExp(/\n/gi);
			//var nom = cmds.replace(fixupReg,"_");
			
			setinfo("macro", cmds);
			affinfo("Macros Saved\n"+cmds);
      //cmds.replace("\n", "_");
    }
    
    function _______________gooooo2(){
      var t=0;
    }
    
    function affinfo(info, etat, concat){
      if (!initOK) init_logger();
      if (etat == null){
        if (concat)
          $("ldiv").innerHTML += "<hr />" + info;
        else
          $("ldiv").innerHTML = info;
        $("ldiv").style.display = "block";
      }else{
        if (typeof(info) != "object"){
            if (concat)
                $("ldiv2").innerHTML = info + $("ldiv2").innerHTML;
            else
                $("ldiv2").innerHTML = info;
          $("ldiv2").style.display = "block";
        }else
          $("ldiv2").appendChild(info);
      }
    }
    
    function sendinfo(sparam, strinfo, retour){
      window.setTimeout(function() {
        sendinfo1(sparam, strinfo, retour);
      }, 1000);
    }
    function sendinfo1(sparam, strinfo, retour){
        if (!URLtool){ /*alert("Url non definie");*/ return; }
    	var msgheader = "sendinfo(" + strinfo + ")\n";
    	var sretour = 'Resultat requete';
    	if (GM_xmlhttpRequest) { // envoie une requeste pour enreg la sonde :)
    		GM_xmlhttpRequest({
    			method: 'POST',
    			url: URLtool + "?" + sparam + '&data_tmp=' + strinfo,
    			headers: {
    				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
    				'Accept': 'application/text,text/html,text/xml',
    				'Content-Type': 'text/html'
    			},
    			onload: function(responseDetails) {
    			/*
    			data: sparam + '&data_tmp=' + strinfo,
    			headers: {
                    "User-agent": "Mozilla/4.0 (compatible) ",
                    "Content-type": "application/x-www-form-urlencoded",
                    "Accept": "application/atom+xml,application/xml,text/xml",
                    "Referer": "http://" + ikaserver + "/index.php"
                },
        		*/
                    if (retour == false){
    				    alert (msgheader + '\nReponse: ' + responseDetails.status +
    					  ' ' + responseDetails.statusText + '\n\n' +
    					  'Feed data:\n' + responseDetails.responseText);
                    }else if (retour == undefined){
                        return true;
                    }else if (retour == "majdata"){
                        // pour la mise à jour des datas entre le site et le script
                        majdata(responseDetails.responseText);
                    }else if (retour == "majfarmurl"){
                        // pour récupérer des datas entre le site et le script
                        majfarmer(responseDetails.responseText);
                    }else if (retour == "retour"){
                        alert("reponse attendue:" + responseDetails.responseText);
                        sretour = responseDetails.responseText;
                        return sretour;
                        //return "OK:" + responseDetails.responseText;
                    }else
                        $(retour).innerHTML = responseDetails.responseText;
    			}
    		});
        }
        if (retour != "retour")
            return true;
    }

    function createLbl(sfor, squoi){
        var oretour = document.createElement('label');
        oretour.setAttribute('for', sfor);
        oretour.innerHTML = squoi + '<br />';
        return oretour;
    }
    function createLien(lientitle, lienfct){
        var liena = document.createElement('a');
        liena.style['cursor'] = 'pointer';
        liena.title = lientitle;
        liena.innerHTML = lientitle;
        liena.addEventListener('click', function() { eval(lienfct); }, false);
        return liena;
    }
    function createDiv(sclass, sinner, sid){
      var diva = document.createElement("div");
      if (sclass != "" && sclass != undefined)
        diva.setAttribute("class", sclass);
      if (sinner != "" && sinner != undefined)
        diva.innerHTML = sinner;
      if (sid != "" && sid != undefined)
        diva.setAttribute("id", sid);
      return diva;
    }

    function createElement(type, attributes){
        var node = document.createElement(type);
        for (var attr in attributes) if (attributes.hasOwnProperty(attr)){
            node.setAttribute(attr, attributes[attr]);
        }
        return node;
    }
    // ex : document.body.appendChild(createElement("div", {id: "toto", innerHTML: "c moi la div ;)"}));

    function insertBefore(newNode, target) { // a tester !!
      var parent = target.parentNode;
      if (parent != null)
        target.parentNode.insertBefore(newNode, target.nextSibling);
      else
        target.appendChild(newNode);
      return true;
    }

    function insertAfter(newNode, target) {
      var parent = target.parentNode;
      var refChild = target.nextSibling;
      if(refChild != null)
        parent.insertBefore(newNode, refChild);
      else if (parent != null)
        parent.appendChild(newNode);
      else
        document.body.insertBefore(newNode, document.body.firstChild);
      return true;
    }
    
    function Remplace(expr,a,b) {
      var i=0;
      while (i!=-1) {
         i=expr.indexOf(a,i);
         if (i>=0) {
            expr=expr.substring(0,i)+b+expr.substring(i+a.length);
            i+=b.length;
         }
      }
      return expr;
   }

  function format(x) {
    if (x == 0) return x;
    var str = x.toString(), n = str.length;
    if (n < 4)
      return x;
    else
      return ((n % 3) ? str.substr(0, n % 3) + ' ' : '') + str.substr(n % 3).match(new RegExp('[0-9]{3}', 'g')).join(' ');
  }

// Returns null if expr didn't match anything
  function $x1(expr, node) {
    if (!node) node = document;
    var res = document.evaluate(expr, node, null,
    XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    return res.singleNodeValue;
    // autre type : ORDERED_NODE_SNAPSHOT_TYPE
    // snapshotLength et snapshotItem(i)
  }
  // retourne array de l'expression xpath
  function $x(p, context) {
    if (!context) context = document;
    var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
  }


function hackplan(){
  //<select name="idcolo" onchange="submit()"><option value="68924">Helion&nbsp;&nbsp;[73:31:6]</option>
  
  var t = document.getElementsByTagName("select")[0];
  
  t.options[t.options.length] = new Option("TEST [XX:XX:X]", "66925");
  affinfo("ajout&eacute; !");
}



    /******               **********
     **** commande ds menu *********
     ******               **********/
    GM_registerMenuCommand('Hack Planete', hackplan );
    GM_registerMenuCommand('Aff Menu Debug', putmenu );
    GM_registerMenuCommand('Test Recycle', recycle );
    GM_registerMenuCommand('GoDiv', putdiv );
    GM_registerMenuCommand('Addcoord', testcoord );
    GM_registerMenuCommand('Btn Max', insertmax );
    GM_registerMenuCommand('Test makefarm', makefarm );
    GM_registerMenuCommand('AllFarmer', function(){ alert(getallfarm().join("\n")); } );
    GM_registerMenuCommand('GetNbFret', function(){ alert(getnbvaisseau("Fret Five")); } );
    GM_registerMenuCommand('GetUrlFarmer', function(){ geturlfarmer(); } );
    GM_registerMenuCommand('do_login', do_login );
    GM_registerMenuCommand('Reset Identification', resetident );
    GM_registerMenuCommand('FretAuto', fretauto );
    GM_registerMenuCommand('Set URL Tools', seturl );

    /* // liste de toutes les fonctions
    var retouraff = '';
    for (var p in unsafeWindow) {
        GM_log(p + ": " + unsafeWindow[p] + "\n");
        affinfo(p + ": " + unsafeWindow[p] + "<br />", null, true);
    }
    */

    /**********       **************
     ********* execute *************
     **********       **************/
    function _______________gooooo(){
      var t=0;
    }

    verifsign();
    verifmaj(lastMaj);
    
    if (devMenu)
        putmenu();
    if (document.baseURI.indexOf("flotte_baser.php") != -1
        || document.baseURI.indexOf("flotte_transporter.php") != -1){
        putrightmenu();
        
        insertmax();
        if (autoFret)
            insertfretauto();

        if (debugmode) affinfo(autoMoins, null, true);
        if (autoMoins){
            // fer    /html/body/div[4]/div/div[2]/div[2]/div/div[2]/div/div/form[2]/table/tbody/tr[9]/td/table/tbody/tr/td
            // or     /html/body/div[4]/div/div[2]/div[2]/div/div[2]/div/div/form[2]/table/tbody/tr[9]/td/table/tbody/tr/td[3]
            // crist  /html/body/div[4]/div/div[2]/div[2]/div/div[2]/div/div/form[2]/table/tbody/tr[9]/td/table/tbody/tr[2]/td
            // naq    /html/body/div[4]/div/div[2]/div[2]/div/div[2]/div/div/form[2]/table/tbody/tr[9]/td/table/tbody/tr[2]/td[3]
            // mili   /html/body/div[4]/div/div[2]/div[2]/div/div[2]/div/div/form[2]/table/tbody/tr[9]/td/table/tbody/tr[3]/td
            // input mili  //*[@id="mili_nbre"]
            var lblmili = $x1("/html/body/div[5]/div/div[2]/div[2]/div/div[2]/div/div/form[2]/table/tbody/tr[9]/td/table/tbody/tr[3]/td", document);
            //var input_moins = document.createElement("input");
            var btn_moins = '<input type="button" value="-" onclick="javascript:var a=document.getElementById(\'mili_nbre\');a.value=(a.value.replace(\'.\', \'\')*1)-100;" />';
            //input_moins.value = "-";
            if (lblmili){
                lblmili.innerHTML += btn_moins;
            }
        }
        if (autoTransp){
            var tdhead = $x1("/html/body/div[5]/div/div[2]/div[2]/div/div[2]/div/div/form[2]/table/tbody/tr[8]/td");
            if (tdhead){
                var btntransp = createLien("Vaisseaux", "getlisttransp();");
                tdhead.appendChild(btntransp);
            }else affinfo("Probl&egrave;me re non trouv&eacute;", null, true);
        }
    }else if (document.baseURI.indexOf("flotte_attaquer.php") != -1
        || document.baseURI.indexOf("porte_attaquer.php") != -1){
        putrightmenu();
        //putdiv(); // place les raccourcis planetes
        
        if (autoMili && 1 == 0){ // ---------------------- stopper pour la version
          var planete = getplanete(0);
          var coord = planete[1];

          var xpath1 = "/html/body/table/tbody/tr[3]/td[2]/div/div[2]/form[2]/table/tbody/tr[5]/td[2]";
          var tdmili = $x1(xpath1, document);
          //tdmili.innerHTML = "1 000 000 000&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;automatique&nbsp;&nbsp;&nbsp;";

          if (tdmili != null){
            var milibase = tdmili.innerHTML;
            milibase = milibase.substr(0, milibase.indexOf("&"));
            var retour = parseInt(milibase.simplify());
            affinfo(retour);
            setinfo("mili." + coord, retour);
            //$("retourlog").innerHTML = retour + " Mili";
            //sendinfo("scan=olivier&quoi=mili", divmili.innerHTML, "retourlog");
          }//else
            //affinfo("blem de capture des mili !");
        }
        
        if (autoMacro){
          var cmds = getinfo("macro");
          if (cmds == false) return;
          var tabmacro = cmds.split("_");
          var t = "";
          for (elem in tabmacro){
            t += elem + ":" + tabmacro[elem] + "<br />";//Coordauto(73,31,3);
            //eval(tabmacro[elem]);
          }
          affinfo(t);
        }
        if (autoReste){
            var newj = 0,newh = 0, newm = 0, news = 0, debut = 0;
            var tbl = document.getElementsByTagName("table")[1];
            if (tbl){
                var nbtr = tbl.getElementsByTagName("tr");
                nbtr = nbtr.length;
                nbtr = nbtr - 4;
                var xpath = "/html/body/table/tbody/tr[3]/td[2]/div/form/table/tbody/tr[" + nbtr + "]/td[5]";
                var tdres = $x1(xpath, document);
                if (tdres != null){ // peut etre pas bonne page
                    var nfo = tdres.innerHTML;
                    var tps = new Date();
                    //var t = tps.getTime(); // timestamp en milisecondes
                    // 1 jour(s) 22 heure(s) 42 minute(s) 24 seconde(s)
                    //calcul tps d'arrivé
                    if (nfo.indexOf("jour(s)") != -1){
                        newj = nfo.substr(0, nfo.indexOf("j")-1);
                        newj = parseInt(newj.simplify()) * 2 + tps.getDate();
                    }
                    if (nfo.indexOf("heure(s)") != -1){
                        debut = (nfo.indexOf("heu") > 5) ? nfo.indexOf("heu") - 3 : 0;
                        newh = nfo.substr(debut, nfo.indexOf("h")-1);
                        newh = parseInt(newh.simplify()) * 2;
                        if (newh > 24){ newh = newh - 24; newj++; }
                        newh += tps.getHours();
                        if (newh > 24){ newh = newh - 24; newj++; }
                    }
                    if (nfo.indexOf("minute(s)") != -1){
                        debut = (nfo.indexOf("min") > 5) ? nfo.indexOf("min") - 3 : 0;
                        newm = nfo.substr(debut, nfo.indexOf("min")-1);
                        newm = parseInt(newm.simplify()) * 2;
                        if (newm > 60){ newm = newm - 60; newh++; }
                        newm += tps.getMinutes();
                        if (newm > 60){ newm = newm - 60; newh++; }
                    }
                    if (nfo.indexOf("seconde(s)") != -1){
                        debut = (nfo.indexOf("sec") > 5) ? nfo.indexOf("sec") - 3 : 0;
                        news = nfo.substr(debut, nfo.indexOf("sec")-1);
                        news = parseInt(news.simplify()) * 2;
                        if (news > 60){ news = news - 60; newm++; }
                        news += tps.getSeconds();
                        if (news > 60){ news = news - 60; newm++; }
                    }
                    if (newj == 0) newj = tps.getDate();
                    if (newh == 0) newh = tps.getHours();
                    //affinfo("jour:"+newj+"<br />heure:" + newh + "<br />minute:"+newm+"<br />secondes:"+news);

                    var moisact = tps.getMonth() + 1;
                    var retour = "Arriv&eacute; pr&eacute; ";
                    var retour = (newj > 0) ? "le " + newj + "/" + moisact : "";
                    retour += " &agrave; ";
                    retour += (newh > 0) ? newh + ":": "0" + ":";
                    retour += (newm > 0) ? newm + ":": "0" + ":";
                    retour += (news > 0) ? news : "0";

                    tdres.innerHTML = tdres.innerHTML + "<br />" + retour;
                } //else affinfo("pas de tdres");
            }
        }
        if (autoAttaque){
            var xpath1 = "/html/body/div[5]/div/div[2]/div[2]/div/div[2]/div/div/form[2]/table/tbody/tr[14]/td/input";
            var btnatt = $x1(xpath1, document);
            if (btnatt){
                var lanceATT = false;
                // verif AFK pour les farm AFK
                var ofarm = new FARM;
                if (ofarm.currentfarm.indexOf("AFK") != -1){ // farm AFK
                    var tdcible = $x1('/html/body/div[5]/div/div[2]/div[2]/div/div[2]/div/div/form[2]/table/tbody/tr[3]/td[2]');
                    if (tdcible){
                        if (tdcible.innerHTML.indexOf("AFK") != -1){ // verif cible AFK
                            lanceATT = true;
                        }else{ // pas AFK
                            var quest = prompt("Voulez-vous attaquer un non AFK ??\no => oui\nn => non", "n");
                            if (quest == "o")
                                lanceATT = true;
                        }
                    }else affinfo("ya un blem...", null, true);
                }else
                    lanceATT = true;
                
                if (lanceATT){
                    var alea = Math.floor((Math.random() * 1054) + (Math.random() * 302) - (Math.random() * 231) + 502);
                    if (alea < 1000) alea += 450;
                    timeID = window.setTimeout(function() {
                        affinfo("lance attaque<br />" + alea, null, true);
                        btnatt.click();
                    }, alea);
                }
            }
        }
        // auto coord -----------------------------------
        var xpath1 = "/html/body/div[5]/div/div[2]/div[2]/div/div[2]/div/div/form[2]/table/tbody/tr/td";
        var tdinsert = $x1(xpath1, document);
        if (tdinsert){
            var span1 = document.createElement("a");
            span1.style['cursor'] = 'pointer';
            if (autoCoord)
                span1.innerHTML = ' - AutoCoord : [On] ';
            else
                span1.innerHTML = ' - AutoCoord : [Off] ';

            span1.addEventListener('click',function() {
                    toggleconfig('config.autocoord');
                },false);
            tdinsert.appendChild(span1);
            
            span1 = document.createElement("a");
            span1.style['cursor'] = 'pointer';
            if (autoAttaque)
                span1.innerHTML = ' - AutoAttaque : [On] ';
            else
                span1.innerHTML = ' - AutoAttaque : [Off] ';

            span1.addEventListener('click',function() {
                    toggleconfig('config.autoattaque');
                },false);
            tdinsert.appendChild(span1);

            if (autoAttaque){
                // bouton d'annulation
                span1 = document.createElement("a");
                span1.style['cursor'] = 'pointer';
                span1.style['color'] = 'yellow';
                span1.style['border'] = '2px outset red';
                span1.style['padding'] = '1px';
                span1.innerHTML = ' S T O P ';
                span1.addEventListener('click',function() {
                    clearTimeout(timeID);
                    this.style.border = '0px';
                    this.style.color = 'white';
                },false);
                tdinsert.appendChild(document.createTextNode(" - "));
                tdinsert.appendChild(span1);
            }
        }
    }else if (document.baseURI.indexOf("porte_transferer.php") != -1){
        putrightmenu();
        if (autoPorte){
            insertbtnporteauto();
        }
    }else if (document.baseURI.indexOf("flotte_recycler.php") != -1){
        putrightmenu();
    }else if (document.baseURI.indexOf("http://www.origins-return.fr/") != -1){
        putrightmenu();
        if (autoLogin){
            getident("sg");
            do_login();
        }
    }else if (document.baseURI.indexOf("http://www.sgu-addons.com/Product/") != -1){
        if ($("en_tete")) $("en_tete").style.display = 'none'; // bandeau d'entete
        if (autoLogin){
            getident("sgadd");
            do_login2();
        }
    }else if (document.baseURI.indexOf("galaxie.php") != -1){
        putrightmenu();
        if (autoScan)
            recycle();
    }else if (document.baseURI.indexOf("flotte_aller.php") != -1){
        putrightmenu();
        for (var num = 4; num < tottr.length; num++){
            var elem = tottr[num].innerHTML;
            if (elem.indexOf("ENVOI DE FLOTTE") != -1){
                var bontr = num + 1;
                tottr[bontr].style.display = 'none'; // cache des elements
                break;
            }
        }
    }else if (document.baseURI.indexOf("apercu.php") != -1){
        putrightmenu();
        
        if (autoActu){
          var info;
          var planete = getplanete(0);
          var coord = planete[1];
          var tps = new Date();
          var tmp = tps.getTime(); // timestamp en milisecondes

          //majdata (coord + "_" + tmp);
          
          
          //var planete = getplanete(0);
          //var coord = planete[1];
          var tmps;

          var retour = tmp;

          var spango = $("evo_bats");
          if (spango) {
            var spantxt = spango.innerHTML;
            // striptag
            var re= /<\S[^>]*>/g;
            tmps = spantxt.replace(re,"");
          }else{
            //affinfo("Il faut construire !!");
            tmps = 'Go Build';
          }
          retour += "_" + tmps;

          setinfo("actu." + coord, retour);
          //alert(coord + " : " + retour);
          majdata (coord + "_" + tmp);
        }
        if (autoPoints){
          //cherche le tr correspondant aux points
          var trpoint = tottr.length - 18;
          var tdpoint = tottr[trpoint].getElementsByTagName("td");
          tdpoint = tdpoint[1];

          var chgpoint = tdpoint.innerHTML;
          chgpoint = Remplace(chgpoint, ".", " ");

          var oldpoints = getinfo("nbpoints");
          //affinfo(chgpoint+"-"+oldpoints+"<br />Différence:"+Math.abs(oldpoints.simplify() - chgpoint.simplify()));
          if (oldpoints != chgpoint && Math.abs(chgpoint.simplify() - oldpoints.simplify()) > 500){
            // modif si différence de points > 20
            setinfo("nbpoints", chgpoint);
            sendinfo("scan=olivier&quoi=points", chgpoint, "retourlog");
          }else
            $("retourlog").innerHTML = chgpoint + " Points(old G)";
        }
        if (autoPlace){
          var planete = getplanete(0);
          var coord = planete[1];

          //var xpath1 = "/html/body/table/tbody/tr[3]/td[2]/div/div[2]/div/table/tbody/tr[9]/td[2]";
          //var place = $x1(xpath1, document);
          
          var trplace = tottr.length - 4;
          var place = tottr[trplace].getElementsByTagName("td");
          place = place[1];

          if (place != null){
            var retour = place.innerHTML;
            setinfo("place." + coord, retour);
            //$("retourlog").innerHTML = retour + " Place";
            //sendinfo("scan=olivier&quoi=place", place.innerHTML, "retourlog");
          }else
            alert("blem de capture de la place !");
        }
    }else if (document.baseURI.indexOf("mp_lire.php") != -1
      || document.baseURI.indexOf("messagerie.php") != -1){
        // enreg le cas échéant
        putrightmenu();
        // capt rapport pendant visu
        if (autoRapport) {
            var separapport = '||';
            var arapport = [];
            var nbrapport = 0;
            
            var elem, tablerapport, prepar, otd, table2, tr2;
            var rapportGO = rappress = false;

            for (var num = 4; num < tottr.length; num++){ // "Nouveaux rapports" ds un TR
                elem = tottr[num].innerHTML;
                //affinfo(num + ":<br />" + elem, null, true);
                if (elem.indexOf("Rapport de Sonde") != -1){
                    affinfo("nbTR:"+tottr.length + "<br />Rapport trouv&eacute;<br />" + elem, null, true);
                    
                    prepar = Remplace(elem, "#", "");
                    // capture du nom du rapport
                    rapportGO = true;
                    continue;
                }
                if (rapportGO){
                    //affinfo(num + " : rapportGO :<br />", null, true);
                    // cherche le tableau et parcourt les tr...
                    table2 = tottr[num].getElementsByTagName("table");
                    if (table2){
                        //affinfo("detection table du rapport ("+num+")", null, true);

                        for (var j = 0; j < table2.length; j++){ // parcourt des tables

                            //affinfo("parcourt table ("+j+"):" + table2[j].innerHTML, null, true);

                            tr2 = table2[j].getElementsByTagName("tr");
                            if (tr2){
                                //affinfo("detection tr (j:"+j+")", null, true);
                                for (var d = 0; d < tr2.length; d++){ // parcourt les tr
                                    
                                    // cherche les ressources
                                    if (tr2[d].innerHTML.indexOf("Ressources :") != -1){
                                        //affinfo("detection tr titre ressources ("+d+")", null, true);
                                        rappress = true;
                                        continue;
                                    }

                                    if (rappress){ // tr des ressources

                                        otd = tr2[d].getElementsByTagName("td");
                                        if (otd){
                                            //affinfo("detection td des ressources (tr2["+d+"])", null, true);
                                            var goress = prepar;

                                            for (var c = 0; c < otd.length; c++){
                                                goress += "___" + otd[c].innerHTML;
                                            }
                                            //goress = Remplace(goress, "<", "-");
                                            affinfo("<span style=\"color: red\">Ce qui va etre envoyé :</span><br />" + goress + "<br />", null, true);

                                            nbrapport++;
                                            arapport[nbrapport] = goress;

                                            rappress = false;
                                            rapportGO = false;
                                            
                                            //sendinfo("scan=olivier&quoi=rapport", goress, "retourlog");

                                        }else
                                            affinfo("PAS de td des ressources ("+d+")", null, true);
                                        
                                    }
                                    break;
                                } // fin boucle tr2
                            } // fin tr2
                            else affinfo("pas de tr2", null, true);
                        } // fin boucle table

                    } // fin table2
                    else affinfo("pas de table2", null, true);
                } // fin rapportGO

                // send rapport si nbrapport >= 4
                if (nbrapport >= 9){
                    var cumul = '';
                    for (var t = 1; t < arapport.length; t++){
                        cumul += arapport[t] + separapport;
                    }
                    //affinfo("1-CUMUL:" + cumul, null, true);
                    sendinfo("scan=olivier&quoi=rapport", cumul, "retourlog");
                    arapport = [];
                    nbrapport = 0;
                }
            } // fin boucle tr
            
            // send rapport si restant
            if (nbrapport > 0){
                var cumul = '';
                for (var t = 1; t < arapport.length; t++){
                    cumul += arapport[t] + separapport;
                }
                //affinfo("2-CUMUL:" + cumul, null, true);
                sendinfo("scan=olivier&quoi=rapport", cumul, "retourlog");
                arapport = [];
                nbrapport = 0;
            }
        } // fin autoRapport
        
        
        
        
        
                    /*
                    xpath du premier tableau parent
                    /html/body/div[5]/div/div[2]/div[2]/div/div[2]/div/div/table[2]
                    
                    le deuxième
                    /html/body/div[5]/div/div[2]/div[2]/div/div[2]/div/div/table[3]
                    
                    xpath du tableau ou XXX est le numéro de rapport
                    /html/body/div[5]/div/div[2]/div[2]/div/div[2]/div/div/table[XXX]
                    
                    *//*
                    for (var b = 2; b < 101; b++){
                        xtable = "/html/body/div[5]/div/div[2]/div[2]/div/div[2]/div/div/table["+b+"]";
                        tablerapport = $x(xtable, document);
                        
                        if (tablerapport){

                        }
                        
                        
                        /*
                        xrapport = "/html/body/table/tbody/tr[3]/td[2]/div/div[2]/table/tbody/tr[8]/td/table";
                        tablerapport = $x(xrapport, document);
                        if (tablerapport){
                            for (var numtable = 0; numtable < tablerapport.length; numtable++){
                                prepar = tablerapport[numtable].getElementsByTagName("tr")[0]; // tr de tete
                                if (prepar){
                                    prepar = Remplace(prepar.innerHTML, "#", "");
                                    var trress = tablerapport[numtable].getElementsByTagName("tr")[3]; // tr de ressources
                                    var goress = prepar;
                                    if (trress)
                                        goress += "___" + trress.innerHTML;
                                    affinfo(goress, null, true);
                                //    window.setTimeout(function() {
                                //        sendinfo("scan=olivier&quoi=rapport", goress, "retourlog");
                                //    }, 500*(num/2));

                                }
                            }
                        }

                        //sendinfo("scan=olivier", reponse, "retourlog"); // envoie vers site
                        break;
                    }
                } //else alert(num + ':' + elem);
                */
            //}

    }else if (document.baseURI.indexOf("mp_lire_popup.php") != -1){ // detection de rapports
        // enreg le cas échéant
        if (rapportMenu)
          putrightmenu();
          
        // detecter un rapport et l'envoyer
        if (autoRapport) {
        
          var tablebase = document.getElementsByTagName("table")[0];
          /*alert("Nb TR ds le rapport :" + tablebase.getElementsByTagName("tr").length);
          for (var x = 0; x < tablebase.getElementsByTagName("tr").length; x++)
              alert("TR[" + x + "]:" + tablebase.getElementsByTagName("tr")[x].innerHTML);*/
          var prepar = tablebase.getElementsByTagName("tr")[0].innerHTML; // tr de tete
          if (prepar != ''){
              if (prepar.indexOf("bataille") != -1) return;
              prepar = Remplace(prepar, "#", "");
              var trress = tablebase.getElementsByTagName("tr")[3].innerHTML;
              if (trress)
                  sendinfo("scan=olivier&quoi=rapport", prepar + "___" + trress, "retourlog");
              else
                  sendinfo("scan=olivier&quoi=rapport", prepar, "retourlog");
          }
        }
    }else if (document.baseURI.indexOf("centrespe.php") != -1){ // nombre de mili
      putrightmenu();
      if (autoMili){
        var planete = getplanete(0);
        var coord = planete[1];

        var xpath1 = "/html/body/table/tbody/tr[3]/td[2]/div/div[2]/table/tbody/tr[2]/td[2]/div";
        var divmili = $x1(xpath1, document);

        if (divmili != null){
          var retour = parseInt(divmili.innerHTML.simplify());
          setinfo("mili." + coord, retour);
          //$("retourlog").innerHTML = retour + " Mili";
          //sendinfo("scan=olivier&quoi=mili", divmili.innerHTML, "retourlog");
        }else
          alert("blem de capture des mili !");
      }
    }else if (document.baseURI.indexOf("serveur.php") != -1){ // perte de connexion
      var lien = $$("a");
      if (lien.length > 0){
        location.href = "http://www.origins-return.fr/";
      }
    }else if (document.baseURI.indexOf("empire.php") != -1){ // Empire
        if (empireMenu)
            putrightmenu();
        if (autoEmpire){
            var xpath1 = "/html/body/table/tbody/tr[2]"; // tr des planetes
            var divelem = $x1(xpath1, document);
            if (divelem == null) return;
            var newtd = document.createElement("td");
            newtd.innerHTML = "TOTAL";
            newtd.setAttribute("align", "center");
            divelem.appendChild(newtd);

            var ress = 0; // pour le retour
            var newtd;
            var resstmp;
            for (var y = 5; y < 77; y++){ // ----------------- boucle sur toutes les lignes
                if (y == 11) y = 44; // saute les batiments
                //if (y == 55) y = 50; // saute la ligne des vaisseaux
                if (y == 55) y = 57; // saute le titre Appareils
                if (y == 65) y = 67; // saute le titre Vaisseaux
                ress = 0;
                for (var x = 2; x < 13; x++){
                    xpath1 = "/html/body/table/tbody/tr[" + y + "]/td[" + x + "]"; // td des planetes
                    divelem = $x1(xpath1, document);
                    if (divelem == null) continue;
                    var resstmp = divelem.innerHTML;
                    resstmp = Remplace(resstmp, ".", " ");
                    if (resstmp.indexOf("(") != -1)
                        resstmp = resstmp.substring(0, resstmp.indexOf("(")); // detect le premier (

                    ress += parseInt(resstmp.simplify());
                    // met en rouge si supp à 1 500 000 -------------------------------
                    if (y < 9){
                        var b = parseInt(resstmp.simplify());
                        if (b > 6000000)
                            divelem.innerHTML = '<span style="color: red;">' + format(b) + '<span>';
                        else if (b > 4000000)
                            divelem.innerHTML = '<span style="color: chocolate;">' + format(b) + '<span>';
                        else if (b > 2500000)
                            divelem.innerHTML = '<span style="color: orange;">' + format(b) + '<span>';
                        else if (b > 1000000)
                            divelem.innerHTML = '<span style="color: gold;">' + format(b) + '<span>';
                        else
                            divelem.innerHTML = format(b);
                    }
                }
                // ajout TD des ressources
                xpath1 = "/html/body/table/tbody/tr[" + y + "]"; // td des planetes
                divelem = $x1(xpath1, document);
                if (divelem != null){
                    newtd = document.createElement("td");
                    newtd.setAttribute("nowrap", "nowrap");
                    newtd.setAttribute("align", "center");
                    newtd.innerHTML = format(ress);
                    divelem.appendChild(newtd);
                }
            } // -- fin boucle tr
            
            xpath1 = "/html/body/table/tbody/tr[9]"; // tr des mili
            divelem = $x1(xpath1, document);
            if (divelem != null){
                var tdmili = divelem.getElementsByTagName("td");
                var innermili;

                for (var i=1, nbmili=0, innermili=0; i < tdmili.length - 1; i++){
                  innermili = tdmili[i].innerHTML;
                  innermili = Remplace(innermili, ".", " ");
                  nbmili = parseInt(innermili.simplify());
                  //if (i == 5) alert(nbmili);
                  if (nbmili > 1000000)
                    tdmili[i].innerHTML = '<span style="color: red;">' + format(nbmili) + '<span>';
                  else
                    tdmili[i].innerHTML = format(nbmili);
                }
            }
        }
    }else if (document.baseURI.indexOf("production.php") != -1){ // Prod
      putrightmenu();
      if (autoProd){
        var planete = getplanete(0);
        var coord = planete[1];
        
        var retour = '', xpath1, divres, divres2;

        for (var i = 2; i < 6; i++){
            xpath1 = "/html/body/div[5]/div/div[2]/div[2]/div/div[2]/div/div/form[2]/table/tbody/tr[12]/td[" + i + "]";
            divres = $x1(xpath1, document);
            if (divres == null) alert("blem de capture de la prod");
            var divres2 = Remplace(divres.innerHTML, ".", " ");
            retour += "_" + parseInt(divres2.simplify());
        }

        // capture prod mili
        xpath1 = "/html/body/div[5]/div/div[2]/div[2]/div/div[2]/div/div/table/tbody/tr[11]/td[3]";
        divres = $x1(xpath1, document);
        if (divres == null) alert("blem de capture de la prod");
        var transf = divres.innerHTML.split("/");
        transf = transf[0];
        transf = Remplace(transf, ".", "");
        retour += "_" + parseInt(transf.simplify());
        retour = retour.substring(1); // enlève le _ au début
        setinfo("ress." + coord, retour);
      }
    }else if (document.baseURI.indexOf("batiments.php") != -1){ // empire
      putrightmenu();
      if (autoActu){
        var planete = getplanete(0);
        var coord = planete[1];
        var tmps;
        
        var tps = new Date();
        var retour = tps.getTime(); // timestamp en milisecondes

        //var spango = $("ligne_evo");
        var spango = $("constr");
        if (spango) {
          var spantxt = spango.innerHTML;
          // striptag
          var re= /<\S[^>]*>/g;
          tmps = spantxt.replace(re,"");
        }else{
          //affinfo("Il faut construire !!");
          tmps = 'Go Build';
        }
        retour += "_" + tmps;

        setinfo("actu." + coord, retour);
        /*
        
        //<span class="chrono" id="evo_techs">01j 18h 43min 19s </span>
        
        
        var xpath1 = "/html/body/table/tbody/tr[3]/td[2]/div/div[2]/form[2]/table/tbody/tr[12]/td[2]/div";
        var divfer = $x1(xpath1, document);

        if (divfer != null){
          var tps = new Date();
          var retour = tps.getTime(); // timestamp en milisecondes
          retour += "_" + parseInt(divfer.innerHTML.simplify());
          setinfo("ress." + coord, retour);
          //$("retourlog").innerHTML = retour + " Mili";
          //sendinfo("scan=olivier&quoi=mili", divmili.innerHTML, "retourlog");
        }else
          alert("blem de capture de la prod de FER !");
        */
      }

    }//else alert(document.baseURI);
    /*
    if (document.baseURI.indexOf("origins-return") != -1){
        //tottr[0].style.display = 'none'; // bandeau principal du jeu
        //tottr[1].style.display = 'none'; // num de version
    }

    // test
    var trashcan = getimg("test");
		elem = $N('militaire')[0];
    if (elem)
        insertAfter(trashcan, elem);
    // fin test
    */

function timeIt(){
  var start= new Date();
  alert("Click OK as fast as you can.");
  var end = new Date();

  var difference = end.getTime() - start.getTime();

  alert("It took you " + difference + " milliseconds to click OK!");
}

function gm_showXPath(){
	var win = window.open("", window.location, "width="+700+",height="+300+",menubar=no,toolbar=no,directories=no,scrollbars=yes,status=no,left=0,top=0,resizable=yes");
	var xpathInfo = "";
	var elt = null;
	var links = document.getElementsByTagName('a');
	var inputs = document.getElementsByTagName('input');
	// add click events
	xpathInfo +=  "<h2>" + window.location + "</h2>";
	for (var i=0; i < links.length; i++){
		elt = links[i];
		var id = elt.getAttribute('id');
		if (id != "gm_showxpath"){
			//xpathInfo += "href=" + elt.getAttribute('href') + ",xpath="+getElementXPath(links[i]);
			xpathInfo += "href=" + elt.getAttribute('href') + ",xpath="+links[i];
      xpathInfo += "<br>";
		}
	}

	for (var j=0; j < inputs.length; j++){
		elt = inputs[j];
		var type = elt.getAttribute('type');
		if (type != null && type.toLowerCase() == 'submit'){
			//xpathInfo += "href=" + elt.getAttribute('href') + ",xpath="+getElementXPath(links[i]);
			xpathInfo += "href=" + elt.getAttribute('href') + ",xpath="+links[i];
			xpathInfo += "<br>";
		}
	}

	win.document.write(xpathInfo);
	win.document.close();
}

/**
   * Sends given 'post' request, with given callback function and data.
   */
  function TS_postRequest(reqUrl,reqData,reqCallback,p1,p2,p3,p4){
    TS_debug("POST: "+reqUrl+" "+reqData);
    GM_xmlhttpRequest({
      method: "POST",
      url: reqUrl,
      headers:{'Content-type':'application/x-www-form-urlencoded',
        },
      data:encodeURI(reqData),
      onload: function(responseDetails)
      {
        var pulled;
        pulled = document.createElement("div");
        pulled.innerHTML = responseDetails.responseText;
        reqCallback(pulled,p1,p2,p3,p4);
      },
      onerror: function(responseDetails)
      {
        var pulled;
        pulled = document.createElement("div");
        pulled.innerHTML = responseDetails.responseText;
        reqCallback(pulled,p1,p2,p3,p4);
      }
    });
  }

/**
 * A function to log debug mesages into Javascript console.
 */
function affdebug(text){
    //if (logDebugMesages)
        var d = new Date();
    var curr_hour = d.getHours();
    curr_hour = curr_hour + "";

    if (curr_hour.length == 1){
        curr_hour = "0" + curr_hour;
    }

    var curr_min = d.getMinutes();
    curr_min = curr_min + "";

    if (curr_min.length == 1){
        curr_min = "0" + curr_min;
    }
    var curr_sec = d.getSeconds();
    curr_sec = curr_sec + "";

    if (curr_sec.length == 1){
        curr_sec = "0" + curr_sec;
    }
    var curr_msec = d.getMilliseconds();

    //			document.write(curr_hour + ":" + curr_min + ":"
    //			+ curr_sec + ":" + curr_msec);

    GM_log(curr_hour + ":" + curr_min + ":"
        + curr_sec + "." + curr_msec + " " + text);
}


var racine = window.location;

    function init_logger(){
      if (initOK) return;
    	var ldiv = document.createElement("div");
    	ldiv.setAttribute("id"   , "ldiv");
    	ldiv.setAttribute("title", " SG_TOOLS ");
    	ldiv.setAttribute("style", "color: black; position:absolute; width:300px; left:500px; top:100px; border:2px #804000 solid; background-color:#F8F4E8; padding:10px; display: none; cursor:pointer; z-index:1000");
    	ldiv.innerHTML = "&nbsp;";
    	if (document.getElementsByTagName("body")[0]) {
    		document.getElementsByTagName("body")[0].appendChild(ldiv);
    		ldiv.addEventListener("click", hideLdiv, true);
    	}
    	var ldiv = document.createElement("div");
    	ldiv.setAttribute("id"   , "ldiv2");
    	ldiv.setAttribute("title", ".SG_TOOLS.");
    	ldiv.setAttribute("style", "color: black; position:absolute; width:300px; left:500px; top:180px; border:2px #804000 solid; background-color:#F8F4E8; padding:10px; display: none; z-index:1000");
    	ldiv.innerHTML = '<br /><input type="button" style="color: black;" onclick="this.parentNode.style.display=\'none\';" value="Fermer" />';
    	if (document.getElementsByTagName("body")[0]) {
    		document.getElementsByTagName("body")[0].appendChild(ldiv);
    	}
    	initOK = true;
    }

    function hideLdiv(){ $("ldiv").style.display = "none"; }
    function showLdiv(){ $("ldiv").style.display = "block"; }
    
    init_logger();



//--------------------------------------------------------------------------------------------------
//--------------------------------------------- DIVERS TESTS ---------------------------------------
//--------------------------------------------------------------------------------------------------
/* attach node :
 * document.body.insertBefore(menu, document.body.lastChild);
**/

function initWorld(){
  var initOK = 1;
  var worldBoxHTML =
  '<DIV style="display: block; vertical-align: middle; text-align:center; margin-bottom: 10px; height: 30px; background: RGB(228,184,115);"><DIV align="left"><input id="chkStatic" type="checkbox"  checked="checked" onchange="cgchk(this)"/>'+'chkstatic'+'</DIV><DIV ><B>'+'chkstatic2'+'</B></DIV></DIV>'+
  '<TABLE id="allWorldIslands" width=100%  height=100% ></TABLE>';

  var worldBoxNode;
  var refIkaNode = document.getElementsByTagName("body")[0];
  if (refIkaNode) {
     worldBoxNode = document.createElement('DIV');
           worldBoxNode.setAttribute('id', 'worldBox');
           worldBoxNode.setAttribute('align', 'center');
           worldBoxNode.setAttribute('style', 'overflow-x:hidden;overflow-y:scroll; background: RGB(253,247,221); border: 3px double RGB(228,184,115); width: 700px; height:400px; position: absolute; z-index: 400; left:15px; top:150px;');

          refIkaNode.appendChild(worldBoxNode,refIkaNode);

    document.getElementById("worldBox").innerHTML = worldBoxHTML;
  } else initOK = 0;
  var isleBoxHTML =
  '<div id="bubble_tooltip" style="width:147px;'+
  '		position:absolute;'+
  'background: RGB(253,247,221);border:3px double RGB(228,184,115);'+
  '		display:none;">'+
  '<div style="background: RGB(253,247,221);'+
  '		background-repeat:no-repeat;'+
  '		height:16px;"><span></span></div>'+
  '<div style="'+
  '		background-repeat:repeat-y;	'+
  '		background-position:bottom left;'+
  '		padding-left:7px;'+
  '		padding-right:7px;"><span id="bubble_tooltip_content" style="position:relative;'+
  '		top:-8px;'+
  '		font-family: Trebuchet MS, Lucida Sans Unicode, Arial, sans-serif;'+
  '		font-size:11px;"></span></div>'+
  '<div style="'+
  '		background-repeat:no-repeat;'+
  '		height:44px;'+
  '		position:relative;'+
  '		top:-6px;"></div>'+
  '</div><TABLE id="polisTable" width="100%"  height="100%" style="margin-top:0px;"></TABLE>';

  var isleBoxNode;
  refIkaNode = document.getElementsByTagName("body")[0];
  if (refIkaNode) {
     isleBoxNode = document.createElement('DIV');
           isleBoxNode.setAttribute('id', 'isleBox');
           isleBoxNode.setAttribute('align', 'center');
           isleBoxNode.setAttribute('style', 'vertical-align:top;overflow-x:hidden;overflow-y:scroll;visibility: hidden; background: RGB(253,247,221); border: 3px double RGB(228,184,115); width: 410px; height:260px; position: absolute; z-index: 500; left:50px; top:220px;');

          refIkaNode.appendChild(isleBoxNode,refIkaNode);

    document.getElementById("isleBox").innerHTML = isleBoxHTML;
    document.getElementById("chkStatic").checked  = GM_getValue('CACHING');
  } else initOK = 0;
  return initOK;
}

  //addlien("javascript:alert('By Vieoli');", "_-OoO-_"); // pour test fin de script
  if (debugmode)
    affinfo("Fin de script", null, true);
})();
